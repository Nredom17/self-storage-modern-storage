-- Modern Storage® — add the "How long can I rent for? / Is it month-to-month?"
-- chatbot Q&A to the live chat_faqs table.
--
-- Run in Supabase Studio: SQL Editor → New Query → paste → Run.
-- Idempotent: only inserts when a row with this exact question doesn't already
-- exist, so re-running won't create duplicates or clobber admin edits.

insert into public.chat_faqs (question, keywords, answer, button_label, button_url, sort_order, active)
select
  'How long can I rent for? / Is it month-to-month?',
  'how long, rent for, lease, contract, term, minimum, commitment, long term, short term, month to month, month-to-month, monthly',
  'Modern Storage® rentals are month-to-month, so there’s no long-term lease or contract. Rent for as long as you need — whether that’s one month or several years — and close out the unit when you’re done. Written notice may be required before move-out, and tenants are responsible for cleaning out the unit and removing their lock at the end of occupancy.',
  null,
  null,
  5,
  true
where not exists (
  select 1 from public.chat_faqs
  where question = 'How long can I rent for? / Is it month-to-month?'
);
