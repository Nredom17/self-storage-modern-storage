-- Modern Storage® — leads table for /api/checklist-lead and any future
-- lead-capture endpoints (business-inquiry, free-truck reservation, etc.).
--
-- The API route in app/api/checklist-lead/route.ts performs a best-effort
-- insert against this table when Supabase env vars are present. If this
-- table doesn't exist or env vars are missing, the route falls back to
-- the Resend email path — no leads are lost either way.

create table if not exists public.leads (
  id           bigserial primary key,
  created_at   timestamptz not null default now(),

  -- Where the lead came from inside the site (e.g. /move-in-checklist,
  -- /business-storage, /free-moving-truck). Helps segment by funnel.
  source       text,

  -- The lead funnel itself: 'move-in-checklist', 'business-inquiry',
  -- 'free-truck', etc. Free-form so new funnels don't require a migration.
  lead_type    text,

  -- Contact fields submitted by the user.
  first_name   text,
  last_name    text,
  email        text,
  zip          text,
  phone        text,

  -- Preferred Modern Storage® facility (free-form so it can hold either a
  -- city label or a specific store name without enumerating).
  facility     text,

  -- Whether the user accepted the consent checkbox at the time of submit.
  consent      boolean not null default false,

  -- Move-in checklist context (nullable for non-checklist leads).
  checklist_type text,        -- household, business, vehicle, seasonal, renovation
  unit_size      text,        -- 5x5, 5x10, ..., 10x30
  move_date      text,        -- ISO yyyy-mm-dd; nullable

  -- Free-form bag for anything else the funnel wants to capture later
  -- (UTM tags, page variant, user agent, etc.) without another migration.
  metadata     jsonb
);

-- Most common queries: filter by recency + lead_type. Indexing both keeps
-- the admin leads view snappy as volume grows.
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_lead_type_idx  on public.leads (lead_type);
create index if not exists leads_email_idx      on public.leads (email);

-- Row Level Security: enable but don't grant any policy by default. The API
-- route inserts via the service-role key (SUPABASE_SERVICE_ROLE_KEY) and the
-- anon key cannot read or write. If you want admin UI access later, add a
-- role + policy in a follow-up migration.
alter table public.leads enable row level security;
