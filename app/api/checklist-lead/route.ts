import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseClient } from '@/lib/supabase'

/* ────────────────────────────────────────────────────────────────────────────
 *  /api/checklist-lead — ADMIN NOTES
 * ────────────────────────────────────────────────────────────────────────────
 *
 *  WHAT THIS ENDPOINT DOES
 *  -----------------------
 *  Accepts a POST from the lead-gate form on /move-in-checklist. Each lead
 *  is written to two destinations (best-effort + reliable) so the form keeps
 *  working even when one of them is misconfigured.
 *
 *  DESTINATIONS
 *  ------------
 *  1. EMAIL (primary, reliable) — Resend → info@modernstorage.com
 *     - Override the recipient with the CHECKLIST_LEAD_TO env var if needed.
 *     - The customer's email is set as Reply-To so the team can respond
 *       directly from their inbox.
 *     - If RESEND_API_KEY is missing, the lead is printed to the server
 *       console in a formatted block (dev fallback) — useful for local
 *       testing without a Resend key.
 *
 *  2. SUPABASE (best-effort, opportunistic) — public.leads table
 *     - Inserts via the supabase-js client returned by lib/supabase.ts.
 *     - The table schema lives in supabase/migrations/0002_leads.sql.
 *     - If env vars are missing, the table doesn't exist, or RLS blocks
 *       the write, the insert fails *silently* and we fall through to the
 *       email path. The lead is NEVER lost from this failure mode.
 *
 *  REQUIRED ENV VARS (for production)
 *  ---------------------------------
 *  - RESEND_API_KEY  — required for email delivery in production. Without
 *                       it, leads only print to server logs.
 *
 *  OPTIONAL ENV VARS
 *  -----------------
 *  - CHECKLIST_LEAD_TO       — override recipient (default info@modernstorage.com)
 *  - CHECKLIST_LEAD_FROM     — override sender (default forms@modernstorage.com)
 *  - BUSINESS_INQUIRY_FROM   — secondary fallback for CHECKLIST_LEAD_FROM
 *  - NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
 *                             — enable the opportunistic Supabase insert
 *  - SUPABASE_SERVICE_ROLE_KEY — *recommended* for production Supabase writes.
 *                               The current anon-key client cannot bypass
 *                               RLS, so inserts will fail without either a
 *                               service-role server client or an "allow
 *                               public insert" policy on public.leads. See
 *                               TODO at the supabase.from('leads') call.
 *
 *  WHAT HAPPENS IF SUPABASE FAILS
 *  ------------------------------
 *  Nothing user-facing. The error is logged with the [ADMIN] prefix below
 *  ("[ADMIN] checklist-lead: supabase insert failed (non-fatal)") and the
 *  endpoint moves on to send the Resend email. The user still gets their
 *  checklist; the team still gets the lead via email. The only impact is
 *  that the lead isn't in the leads table for SQL querying.
 *
 *  HOW TO MIGRATE OFF EMAIL ONTO A REAL CRM
 *  ----------------------------------------
 *  When you're ready to send leads to a CRM (HubSpot, Salesforce, etc.),
 *  add the API call below the Supabase block and above the Resend block.
 *  Keep the Resend send as a backstop until the CRM integration is proven.
 *
 *  HOW TO GREP THIS ENDPOINT'S LOGS IN VERCEL
 *  ------------------------------------------
 *  Every meaningful line is prefixed with [ADMIN] checklist-lead so you
 *  can filter the Vercel log stream by that string.
 * ────────────────────────────────────────────────────────────────────────────
 */

// Run on Node so the Resend SDK + (optional) Supabase server insert both work.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Email destination — info@modernstorage.com unless overridden by env.
const TO_EMAIL = process.env.CHECKLIST_LEAD_TO ?? 'info@modernstorage.com'

// Sender. Until the modernstorage.com domain is verified in Resend you can
// temporarily set CHECKLIST_LEAD_FROM (or BUSINESS_INQUIRY_FROM) to
// 'onboarding@resend.dev' in Vercel env to unblock sending.
const FROM_EMAIL =
  process.env.CHECKLIST_LEAD_FROM ??
  process.env.BUSINESS_INQUIRY_FROM ??
  'Modern Storage® Website <forms@modernstorage.com>'

// Supabase table name for lead storage. Schema lives in
// supabase/migrations/0002_leads.sql. If the table doesn't exist or RLS
// blocks the anon-key write, the insert below silently fails and the
// endpoint falls through to the Resend email path.
const LEADS_TABLE = 'leads'

type Payload = {
  // Required form fields
  firstName?: string
  email?: string
  zip?: string
  consent?: boolean
  // Optional form fields
  phone?: string
  facility?: string
  // Context from the checklist state
  checklistType?: string
  unitSize?: string
  moveDate?: string
  // Origin (sent by client; also recoverable from referer)
  source?: string
  // Honeypot
  website?: string
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

function isZip(s: string) {
  // US ZIP — 5 digits, or 5+4 with dash. Lenient so international zips don't
  // outright fail (lead is still useful to capture even if format is unusual).
  return s.length >= 3 && s.length <= 10
}

export async function POST(req: NextRequest) {
  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot: respond 200 so bots think they succeeded, but skip everything.
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const firstName = (body.firstName ?? '').trim()
  const email = (body.email ?? '').trim()
  const zip = (body.zip ?? '').trim()
  const consent = Boolean(body.consent)

  if (!firstName) {
    return NextResponse.json({ ok: false, error: 'Please enter your first name.' }, { status: 400 })
  }
  if (!email || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }
  if (!zip || !isZip(zip)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid ZIP code.' }, { status: 400 })
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: 'Please accept the consent box so we can email your checklist.' },
      { status: 400 },
    )
  }

  const phone = (body.phone ?? '').trim()
  const facility = (body.facility ?? '').trim()
  const checklistType = (body.checklistType ?? '').trim()
  const unitSize = (body.unitSize ?? '').trim()
  const moveDate = (body.moveDate ?? '').trim()
  const source = (body.source ?? '/move-in-checklist').trim()
  const submittedAt = new Date().toISOString()

  // ────────────────────────────────────────────────────────────────────────
  // STAGE 1: Supabase insert (best-effort, opportunistic)
  // ────────────────────────────────────────────────────────────────────────
  // Behavior matrix:
  //   - env vars missing       → getSupabaseClient() returns null → skipped
  //   - table missing          → insert error → swallowed, logged
  //   - RLS blocks anon write  → insert error → swallowed, logged
  //   - insert succeeds        → lead is in public.leads, queryable in SQL
  //
  // TODO for production Supabase writes: the current client uses the anon
  // key and the leads table has RLS enabled with no policies. Either:
  //   (a) add SUPABASE_SERVICE_ROLE_KEY to env and create a separate
  //       server-only client that uses it, OR
  //   (b) add a "for insert with check (true)" policy on public.leads.
  // Until one of those is done, the insert below is expected to fail and
  // the lead reaches the team via the Resend email path only.
  let supabaseStatus: 'skipped' | 'inserted' | 'failed' = 'skipped'
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      const { error } = await supabase.from(LEADS_TABLE).insert({
        source,
        lead_type: 'move-in-checklist',
        first_name: firstName,
        email,
        zip,
        phone: phone || null,
        facility: facility || null,
        consent,
        checklist_type: checklistType || null,
        unit_size: unitSize || null,
        move_date: moveDate || null,
        metadata: { submittedAt },
      })
      if (error) {
        supabaseStatus = 'failed'
        console.warn(
          `[ADMIN] checklist-lead: supabase insert failed (non-fatal) — table=${LEADS_TABLE}, code=${error.code}, message=${error.message}`,
        )
      } else {
        supabaseStatus = 'inserted'
      }
    } catch (err) {
      supabaseStatus = 'failed'
      console.warn(
        '[ADMIN] checklist-lead: supabase insert threw (non-fatal):',
        err,
      )
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // STAGE 2: Resend email to info@modernstorage.com (PRIMARY destination)
  // ────────────────────────────────────────────────────────────────────────
  // This is the reliable path. Every lead lands in the team inbox with the
  // customer's email as Reply-To so the team can respond directly. If
  // RESEND_API_KEY is missing, the lead is printed to stdout instead
  // (development/preview fallback) — see "Dev fallback" branch below.
  const subject = `Move-In Checklist Lead — ${firstName} (${zip})`
  const text = [
    'New lead from /move-in-checklist',
    '',
    `NAME:                ${firstName}`,
    `EMAIL:               ${email}`,
    `ZIP:                 ${zip}`,
    `PHONE:               ${phone || '—'}`,
    `PREFERRED FACILITY:  ${facility || '—'}`,
    '',
    'CHECKLIST CONTEXT',
    `- Storage type:      ${checklistType || '—'}`,
    `- Unit size:         ${unitSize || '—'}`,
    `- Move-in date:      ${moveDate || '—'}`,
    '',
    `Consent:             yes`,
    `Submitted:           ${submittedAt}`,
    `Source:              ${source}`,
    `Supabase storage:    ${supabaseStatus}`,
  ].join('\n')

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Dev/preview fallback so the form round-trip is testable without a key.
    // In production the deploy checklist should require RESEND_API_KEY; if
    // it's missing in prod the lead reaches Vercel function logs only.
    console.warn(
      '[ADMIN] checklist-lead: RESEND_API_KEY not set — logging lead to stdout instead of sending.',
    )
    console.log('---- MOVE-IN CHECKLIST LEAD (dev fallback) ----')
    console.log('To:     ', TO_EMAIL)
    console.log('Subject:', subject)
    console.log(text)
    console.log('-------------------------------------------------')
    console.log(
      `[ADMIN] checklist-lead: lead=logged, supabase=${supabaseStatus}, email=skipped(no-key)`,
    )
    return NextResponse.json({ ok: true, dev: true, supabase: supabaseStatus })
  }

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
    })
    if (result.error) {
      console.error(
        '[ADMIN] checklist-lead: Resend send error (lead may still be in Supabase):',
        result.error,
      )
      console.warn(
        `[ADMIN] checklist-lead: lead=partially-delivered, supabase=${supabaseStatus}, email=failed`,
      )
      // Email failed, but the user still gets their checklist and the
      // Supabase insert above may have succeeded. Return success and let
      // ops chase the email failure via logs.
      return NextResponse.json({
        ok: true,
        emailWarning: true,
        supabase: supabaseStatus,
      })
    }
    console.log(
      `[ADMIN] checklist-lead: lead=delivered, supabase=${supabaseStatus}, email=sent, to=${TO_EMAIL}`,
    )
    return NextResponse.json({ ok: true, supabase: supabaseStatus })
  } catch (err) {
    console.error('[ADMIN] checklist-lead: Resend send threw:', err)
    console.warn(
      `[ADMIN] checklist-lead: lead=partially-delivered, supabase=${supabaseStatus}, email=failed`,
    )
    return NextResponse.json({
      ok: true,
      emailWarning: true,
      supabase: supabaseStatus,
    })
  }
}
