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
import { getServiceSupabaseClient } from '@/lib/supabase'
import {
  countWords,
  estimateReadingMinutes,
  slugify,
  type BlogPost,
  type BlogBlock,
} from '@/lib/blog'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data ?? [] })
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
