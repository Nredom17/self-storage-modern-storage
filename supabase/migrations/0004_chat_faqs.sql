-- Modern Storage® — Chatbot Q&A schema
-- Run in Supabase Studio: SQL Editor → New Query → paste → Run.
-- Safe to re-run (idempotent).
--
-- One table, chat_faqs, holds the editable chatbot answers managed from
-- /admin/chatbot. The live chat widget reads ACTIVE rows (public read); the
-- admin editor reads/writes ALL rows using the service role (bypasses RLS).
-- When this table is empty or Supabase is unreachable, the widget falls back
-- to the hardcoded CHAT_FAQS list in lib/chatbot.ts.

-- =====================================================================
-- 0. Shared updated_at trigger function (create-or-replace is harmless).
-- =====================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================================
-- 1. chat_faqs — admin-managed chatbot questions & answers
-- =====================================================================
create table if not exists public.chat_faqs (
  id                uuid         primary key default gen_random_uuid(),
  question          text         not null,            -- for reference / admin list
  keywords          text         not null default '', -- comma-separated trigger words
  answer            text         not null,            -- the reply the bot gives
  button_label      text,                             -- optional button under the answer
  button_url        text,
  location_answers  jsonb        not null default '{}'::jsonb, -- { "springdale": "..." }
  active            boolean      not null default true,
  sort_order        int          not null default 0,
  updated_at        timestamptz  not null default now()
);

-- =====================================================================
-- 2. Row-Level Security — public reads ACTIVE rows; writes need service role
-- =====================================================================
alter table public.chat_faqs enable row level security;

drop policy if exists "public read active chat_faqs" on public.chat_faqs;
create policy "public read active chat_faqs"
  on public.chat_faqs
  for select
  to anon, authenticated
  using (active = true);

-- Inserts / updates / deletes are intentionally NOT granted to anon or
-- authenticated. The /api/admin/chatbot route writes with
-- SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.

-- =====================================================================
-- 3. Keep updated_at fresh
-- =====================================================================
drop trigger if exists chat_faqs_set_updated_at on public.chat_faqs;
create trigger chat_faqs_set_updated_at
  before update on public.chat_faqs
  for each row execute function public.set_updated_at();

-- =====================================================================
-- 4. Seed with the starter Q&A (mirrors lib/chatbot.ts CHAT_FAQS).
--    Only seeds when the table is empty, so re-running won't clobber your
--    edits or create duplicates.
-- =====================================================================
insert into public.chat_faqs (question, keywords, answer, button_label, button_url, sort_order)
select * from (values
  (
    'Do you have climate-controlled units?',
    'climate, climate controlled, temperature, air conditioned, air conditioning, heated, cooled',
    'Many Modern Storage® locations offer climate-controlled units, though availability and sizes vary by facility. You can learn more about climate-controlled storage below, or tell me which location you’re interested in.',
    'Climate-controlled storage',
    'https://self-storage.modernstorage.com/climate-controlled',
    1
  ),
  (
    'What size storage unit do I need?',
    'size, sizes, how big, how large, dimensions, what size, square feet',
    'Not sure what size you need? Our AI Storage Size Finder and Size Guide can help you choose the right unit.',
    'AI Storage Size Finder',
    'https://self-storage.modernstorage.com/ai-storage-size-finder',
    2
  ),
  (
    'How do I rent or reserve a unit?',
    'reserve, reservation, rent online, book, sign up, how do i rent',
    'You can view available units and reserve online for any Modern Storage® location. Tell me which location you’re interested in and I’ll send you the right link.',
    null,
    null,
    3
  ),
  (
    'How long can I rent for? / Is it month-to-month?',
    'how long, rent for, lease, contract, term, minimum, commitment, long term, short term, month to month, month-to-month, monthly',
    'Modern Storage® rentals are month-to-month, so there’s no long-term lease or contract. Rent for as long as you need — whether that’s one month or several years — and close out the unit when you’re done. Written notice may be required before move-out, and tenants are responsible for cleaning out the unit and removing their lock at the end of occupancy.',
    null,
    null,
    5
  ),
  (
    'Do you offer boat, RV, or vehicle storage?',
    'boat, rv, camper, vehicle, car storage, trailer, motorhome',
    'Select Modern Storage® locations offer boat, RV, and vehicle storage. Availability varies by facility — let me know which area you’re in and I can point you to the right location.',
    'Boat, RV & vehicle storage',
    'https://self-storage.modernstorage.com/rv-boat-vehicle',
    4
  )
) as seed(question, keywords, answer, button_label, button_url, sort_order)
where not exists (select 1 from public.chat_faqs);
