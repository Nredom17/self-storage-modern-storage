// Admin blog API — list / create / update / delete blog posts.
//
// Protected by middleware.ts (HTTP Basic Auth on /api/admin/:path*). All
// writes go through the Supabase service-role client, which bypasses RLS.
// Reads include drafts (the public reader at lib/blog.ts filters to
// published only).
//
// Endpoints:
//   GET    /api/admin/blog          → list every post (newest updated first)
//   POST   /api/admin/blog          → create a post (returns full row)
//   PATCH  /api/admin/blog?id=...   → update a post by id
//   DELETE /api/admin/blog?id=...   → delete a post by id
//
// Body shape for POST and PATCH is loose — any subset of column names. The
// route normalizes timestamps (sets published_at when status flips to
// 'published'), recomputes word_count + reading_minutes if unset, and
// strips unknown keys.

import { NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { getServiceSupabaseClient } from '@/lib/supabase'
import {
  countWords,
  estimateReadingMinutes,
  isStorageTipsPublic,
  slugify,
  type BlogPost,
  type BlogBlock,
} from '@/lib/blog'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// First-run guard: Supabase JS doesn't expose DDL, so the migration in
// supabase/migrations/0005_blog_posts.sql has to be run once by the
// editor in Supabase Studio. To make that painless, GET returns the
// migration SQL inline whenever the table is missing — the admin UI
// then renders a copy-paste card so the editor doesn't have to dig
// through the repo.
//
// We read the SQL from disk lazily and cache it across requests on the
// Node runtime. The file ships with the deployment under
// /supabase/migrations/0005_blog_posts.sql.
let _setupSqlCache: string | null = null
async function loadSetupSql(): Promise<string> {
  if (_setupSqlCache) return _setupSqlCache
  try {
    const p = path.join(process.cwd(), 'supabase', 'migrations', '0005_blog_posts.sql')
    _setupSqlCache = await fs.readFile(p, 'utf8')
  } catch {
    // Fall back to a minimal version if the file can't be read at runtime
    // (e.g. unexpected deployment trimming). Editors can still paste this
    // into Supabase and get a working table — admin features work the same.
    _setupSqlCache = MINIMAL_BLOG_POSTS_SQL
  }
  return _setupSqlCache
}

// Postgres returns SQLSTATE 42P01 (undefined_table) when a query references
// a relation that doesn't exist. Supabase JS surfaces it via error.code.
// PGRST205 is PostgREST's "schema cache" variant of the same condition.
function isMissingTableError(err: { code?: string; message?: string } | null | undefined): boolean {
  if (!err) return false
  if (err.code === '42P01' || err.code === 'PGRST205') return true
  const m = (err.message ?? '').toLowerCase()
  return m.includes('schema cache') || m.includes('does not exist')
}

// Whitelist of columns the admin form is allowed to write. Anything not on
// this list is silently dropped — defense in depth against accidental
// field smuggling.
const WRITE_COLUMNS = [
  'slug',
  'status',
  'published_at',
  'title',
  'h1',
  'meta_description',
  'canonical_url',
  'primary_keyword',
  'secondary_keywords',
  'entity_keywords',
  'category',
  'tags',
  'search_intent',
  'target_audience',
  'funnel_stage',
  'author',
  'reviewer',
  'last_reviewed_at',
  'disclaimer',
  'hero_image',
  'hero_alt',
  'hero_caption',
  'og_image',
  'twitter_image',
  'intro',
  'quick_answer',
  'body',
  'cta_label',
  'cta_url',
  'related_service_url',
  'reading_minutes',
  'word_count',
] as const

function pickWriteable(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const k of WRITE_COLUMNS) {
    if (k in input) out[k] = input[k]
  }
  return out
}

// Apply auto-fields: published_at when status flips to 'published',
// word_count + reading_minutes when not explicitly provided.
function applyAutoFields(
  patch: Record<string, unknown>,
  existing: Record<string, unknown> | null,
): Record<string, unknown> {
  const merged = { ...(existing ?? {}), ...patch }

  // Stamp published_at the first time the post becomes 'published'.
  if (patch.status === 'published' && !merged.published_at) {
    patch.published_at = new Date().toISOString()
  }

  // Recompute word count / reading time from the merged content if either is
  // missing or zero.
  const needsWC = !merged.word_count
  const needsRM = !merged.reading_minutes
  if (needsWC || needsRM) {
    const dummy: BlogPost = {
      id: '',
      slug: String(merged.slug ?? ''),
      status: 'draft',
      publishedAt: null,
      createdAt: '',
      updatedAt: '',
      title: String(merged.title ?? ''),
      h1: String(merged.h1 ?? ''),
      metaDescription: String(merged.meta_description ?? ''),
      canonicalUrl: null,
      primaryKeyword: null,
      secondaryKeywords: [],
      entityKeywords: [],
      category: null,
      tags: [],
      searchIntent: null,
      targetAudience: null,
      funnelStage: null,
      author: 'Modern Storage® Team',
      reviewer: null,
      lastReviewedAt: null,
      disclaimer: null,
      heroImage: null,
      heroAlt: null,
      heroCaption: null,
      ogImage: null,
      twitterImage: null,
      intro: merged.intro ? String(merged.intro) : null,
      quickAnswer: merged.quick_answer ? String(merged.quick_answer) : null,
      body: (Array.isArray(merged.body) ? merged.body : []) as BlogBlock[],
      ctaLabel: null,
      ctaUrl: null,
      relatedServiceUrl: null,
      readingMinutes: null,
      wordCount: null,
    }
    const wc = countWords(dummy)
    if (needsWC) patch.word_count = wc
    if (needsRM) patch.reading_minutes = estimateReadingMinutes('x '.repeat(wc))
  }

  return patch
}

export async function GET() {
  const client = getServiceSupabaseClient()
  if (!client) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 })
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false })
  // First-run guard. If the table doesn't exist yet, return the migration
  // SQL alongside the empty post list so the admin UI can render the
  // copy-paste setup card.
  if (error && isMissingTableError(error)) {
    const setupSql = await loadSetupSql()
    return NextResponse.json({
      posts: [],
      publicEnabled: isStorageTipsPublic(),
      needsSetup: true,
      setupSql,
      setupError: error.message,
    })
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  // publicEnabled lets the admin UI render a clear "Live" vs "Private"
  // banner so editors know whether published posts are reaching the public.
  return NextResponse.json({ posts: data ?? [], publicEnabled: isStorageTipsPublic() })
}

export async function POST(req: Request) {
  const client = getServiceSupabaseClient()
  if (!client) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 })
  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }
  // Slug auto-derive from title if missing.
  if (!body.slug && body.title) body.slug = slugify(String(body.title))
  if (!body.title || !body.h1 || !body.meta_description || !body.slug) {
    return NextResponse.json(
      { error: 'title, h1, meta_description and slug are required' },
      { status: 400 },
    )
  }
  const writeable = pickWriteable(body)
  const withAuto = applyAutoFields(writeable, null)
  const { data, error } = await client.from('blog_posts').insert(withAuto).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data })
}

export async function PATCH(req: Request) {
  const client = getServiceSupabaseClient()
  if (!client) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 })
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id query param required' }, { status: 400 })

  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 })
  }
  const writeable = pickWriteable(body)

  // Pull the existing row so applyAutoFields can merge.
  const { data: existing, error: getErr } = await client
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (getErr) return NextResponse.json({ error: getErr.message }, { status: 500 })
  if (!existing) return NextResponse.json({ error: 'post not found' }, { status: 404 })

  const withAuto = applyAutoFields(writeable, existing as Record<string, unknown>)
  const { data, error } = await client
    .from('blog_posts')
    .update(withAuto)
    .eq('id', id)
    .select('*')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data })
}

export async function DELETE(req: Request) {
  const client = getServiceSupabaseClient()
  if (!client) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 })
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id query param required' }, { status: 400 })
  const { error } = await client.from('blog_posts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// Last-resort fallback SQL — used only if the migration file can't be read
// from disk at runtime. Keep it minimally sufficient to make the admin UI
// fully functional. The canonical version lives in
// supabase/migrations/0005_blog_posts.sql; update both if you change one.
const MINIMAL_BLOG_POSTS_SQL = `-- Minimal Modern Storage Tips schema (fallback)
create extension if not exists "pgcrypto";

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  h1 text not null,
  meta_description text not null,
  canonical_url text,
  primary_keyword text,
  secondary_keywords text[] default '{}',
  entity_keywords text[] default '{}',
  category text,
  tags text[] default '{}',
  search_intent text,
  target_audience text,
  funnel_stage text,
  author text default 'Modern Storage® Team',
  reviewer text,
  last_reviewed_at date,
  disclaimer text,
  hero_image text,
  hero_alt text,
  hero_caption text,
  og_image text,
  twitter_image text,
  intro text,
  quick_answer text,
  body jsonb default '[]',
  cta_label text,
  cta_url text,
  related_service_url text,
  reading_minutes int,
  word_count int
);

create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_published_idx on public.blog_posts (published_at desc nulls last) where status = 'published';

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
drop policy if exists "anyone can read published blog posts" on public.blog_posts;
create policy "anyone can read published blog posts" on public.blog_posts for select using (status = 'published');
`

