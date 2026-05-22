-- Modern Storage® — Self Storage Hub — initial schema
-- Run this in Supabase Studio: SQL Editor → New Query → paste → Run.
-- Safe to re-run (idempotent via IF NOT EXISTS / CREATE OR REPLACE).

-- =====================================================================
-- 1. site_settings — single-row table for sitewide values
-- =====================================================================
create table if not exists public.site_settings (
  id              int          primary key default 1,
  phone_display   text,
  phone_href      text,
  reservation_url text,
  updated_at      timestamptz  not null default now(),
  constraint site_settings_single_row check (id = 1)
);

-- =====================================================================
-- 2. locations — one row per facility
-- =====================================================================
create table if not exists public.locations (
  slug            text         primary key,
  name            text         not null,
  city            text         not null,
  state           text         not null default 'AR',
  zip             text,
  region          text         not null,
  street_address  text,
  phone           text,
  lat             double precision not null,
  lon             double precision not null,
  image           text,
  alt             text,
  badges          text[]       not null default '{}',
  reservation_url text,
  sort_order      int          not null default 0,
  active          boolean      not null default true,
  updated_at      timestamptz  not null default now()
);

create index if not exists locations_active_sort_idx
  on public.locations (active, sort_order);

-- =====================================================================
-- 3. Row-Level Security — anyone can read, no one can write without service role
-- =====================================================================
alter table public.site_settings enable row level security;
alter table public.locations     enable row level security;

drop policy if exists "public read site_settings" on public.site_settings;
create policy "public read site_settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

drop policy if exists "public read active locations" on public.locations;
create policy "public read active locations"
  on public.locations
  for select
  to anon, authenticated
  using (active = true);

-- Writes are intentionally NOT granted to anon/authenticated.
-- Editing happens via Supabase Studio (which uses the service role).

-- =====================================================================
-- 4. Keep updated_at fresh on every change
-- =====================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists locations_set_updated_at on public.locations;
create trigger locations_set_updated_at
  before update on public.locations
  for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();
