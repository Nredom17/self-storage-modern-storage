-- Modern Storage® — blog_posts table
--
-- Backs the Phase 1 blog template at /blog/[slug] and the admin editor at
-- /admin/blog. Stores all the SEO, content-structure, and conversion
-- fields the spec asked for, in a single denormalized row per post.
--
-- Auth model:
--   • Public reads (anonymous) — RLS policy below allows SELECT on
--     published rows only. Anything in draft / archived status is
--     invisible to the public.
--   • Admin writes (insert / update / delete) — done via the Supabase
--     SERVICE ROLE key from server-side routes under /api/admin/blog,
--     which the middleware HTTP Basic Auth already gates. The service
--     role bypasses RLS, so no insert/update policies are needed here.

create extension if not exists "pgcrypto";

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),

  -- ── Identity & status ────────────────────────────────────────────
  slug text not null unique,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- ── SEO meta ─────────────────────────────────────────────────────
  title text not null,                  -- <title> tag (max ~60 chars)
  h1 text not null,                     -- on-page <h1> (often == title but separable)
  meta_description text not null,       -- <meta name="description">
  canonical_url text,                   -- optional override of SITE_URL + /blog/<slug>
  primary_keyword text,
  secondary_keywords text[] default '{}',
  entity_keywords text[] default '{}',  -- people, places, brands, products mentioned

  -- ── Classification ───────────────────────────────────────────────
  category text,                        -- e.g. 'sizing' / 'security' / 'how-to' / 'comparison'
  tags text[] default '{}',
  search_intent text,                   -- 'informational' / 'commercial' / 'transactional'
  target_audience text,                 -- e.g. 'first-time renters' / 'business customers'
  funnel_stage text,                    -- 'awareness' / 'consideration' / 'decision'

  -- ── Authorship & legal ───────────────────────────────────────────
  author text default 'Modern Storage® Team',
  reviewer text,
  last_reviewed_at date,
  disclaimer text,

  -- ── Hero / featured image ────────────────────────────────────────
  hero_image text,                      -- /images/... or absolute URL
  hero_alt text,
  hero_caption text,
  og_image text,                        -- Open Graph override (defaults to hero_image)
  twitter_image text,                   -- Twitter card override

  -- ── Content (rendered in this order on the page) ─────────────────
  intro text,                           -- lead paragraph
  quick_answer text,                    -- answer-first block for PAA / AI Overview
  body jsonb default '[]',              -- array of BlogBlock structures (see lib/blog.ts)

  -- ── Conversion (per-post override of the default footer CTA) ─────
  cta_label text,
  cta_url text,
  related_service_url text,             -- internal link to a service page

  -- ── Reading metadata ─────────────────────────────────────────────
  reading_minutes int,
  word_count int
);

-- Indexes — read paths are slug lookups + published-list ordered by date.
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_published_idx
  on public.blog_posts (published_at desc nulls last)
  where status = 'published';
create index if not exists blog_posts_category_idx
  on public.blog_posts (category) where status = 'published';

-- Auto-bump updated_at on every UPDATE.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- RLS — public can read published posts; writes happen via service-role.
alter table public.blog_posts enable row level security;

drop policy if exists "anyone can read published blog posts" on public.blog_posts;
create policy "anyone can read published blog posts"
  on public.blog_posts for select
  using (status = 'published');
