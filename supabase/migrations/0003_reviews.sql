-- Modern Storage® — Reviews schema
-- Run in Supabase Studio: SQL Editor → New Query → paste → Run.
-- Safe to re-run (idempotent).
--
-- Two tables:
--   review_facilities — admin config: which facilities show on the Reviews
--     pages, their order, visibility, Google location ID, and review link.
--     (Mirrors lib/reviews.ts REVIEW_FACILITY_CONFIG; DB rows override the file.)
--   facility_reviews  — cached Google review data, written ONLY by the daily
--     refresh cron using the service role. Never hand-edited.

-- =====================================================================
-- 1. review_facilities — admin-manageable config
-- =====================================================================
create table if not exists public.review_facilities (
  slug                text         primary key,
  google_location_id  text,
  google_review_link  text,
  display_order       int          not null default 0,
  visible             boolean      not null default true,
  updated_at          timestamptz  not null default now()
);

-- =====================================================================
-- 2. facility_reviews — cached Google reviews (cron-written)
-- =====================================================================
create table if not exists public.facility_reviews (
  slug          text         primary key references public.review_facilities(slug) on delete cascade,
  rating        numeric(2,1),          -- average, e.g. 4.8
  review_count  int,                   -- total Google reviews
  reviews       jsonb        not null default '[]'::jsonb,  -- latest reviews, newest first
  updated_at    timestamptz  not null default now()
);

-- =====================================================================
-- 3. Row-Level Security — public can read, writes require service role
-- =====================================================================
alter table public.review_facilities enable row level security;
alter table public.facility_reviews  enable row level security;

drop policy if exists "public read review_facilities" on public.review_facilities;
create policy "public read review_facilities"
  on public.review_facilities
  for select
  to anon, authenticated
  using (true);

drop policy if exists "public read facility_reviews" on public.facility_reviews;
create policy "public read facility_reviews"
  on public.facility_reviews
  for select
  to anon, authenticated
  using (true);

-- Writes are intentionally NOT granted to anon/authenticated. The refresh cron
-- (app/api/cron/refresh-reviews) writes with SUPABASE_SERVICE_ROLE_KEY, which
-- bypasses RLS. Config edits happen in Supabase Studio (also service role).

-- =====================================================================
-- 4. Keep updated_at fresh (reuses public.set_updated_at from 0001_init)
-- =====================================================================
drop trigger if exists review_facilities_set_updated_at on public.review_facilities;
create trigger review_facilities_set_updated_at
  before update on public.review_facilities
  for each row execute function public.set_updated_at();

-- facility_reviews.updated_at is set explicitly by the cron on each upsert,
-- so no trigger is needed there.

-- =====================================================================
-- 5. Seed the 10 facilities (idempotent). Fill google_location_id and
--    google_review_link here or via Studio once you have them.
-- =====================================================================
insert into public.review_facilities (slug, google_location_id, google_review_link, display_order, visible) values
  ('west-little-rock',  null, null, 1,  true),
  ('shackleford',       null, null, 2,  true),
  ('riverdale',         null, null, 3,  true),
  ('north-little-rock', null, null, 4,  true),
  ('maumelle',          null, null, 5,  true),
  ('bryant',            null, null, 6,  true),
  ('hot-springs',       null, null, 7,  true),
  ('bentonville',       null, null, 8,  true),
  ('springdale',        null, null, 9,  true),
  ('lowell',            null, null, 10, true)
on conflict (slug) do nothing;
