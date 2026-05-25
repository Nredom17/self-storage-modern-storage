import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseClient } from '@/lib/supabase'

// Run on Node so the Resend SDK + (optional) Supabase server insert both work.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Override either env var in Vercel to redirect leads without a code deploy.
const TO_EMAIL = process.env.CHECKLIST_LEAD_TO ?? 'info@modernstorage.com'
const FROM_EMAIL =
  process.env.CHECKLIST_LEAD_FROM ??
  process.env.BUSINESS_INQUIRY_FROM ??
  'Modern Storage® Website <forms@modernstorage.com>'

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

  // Try a best-effort Supabase insert. The leads table ships as a migration
  // (supabase/migrations/0002_leads.sql) so once you point the project at a
  // configured Supabase, this just works. If the table or env vars aren't
  // present, we swallow the error and fall through to the email send.
  const supabase = getSupabaseClient()
  if (supabase) {
    try {
      await supabase.from('leads').insert({
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
    } catch (err) {
      console.warn('[checklist-lead] supabase insert failed (non-fatal):', err)
    }
  }

  // Email the lead to the team. This is the reliable storage path until
  // the CRM is wired up — info@modernstorage.com gets every lead in real
  // time, formatted for a quick scan.
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
  ].join('\n')

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Dev/preview fallback so the form round-trip is testable without a key.
    console.warn(
      '[checklist-lead] RESEND_API_KEY not set — logging lead instead of sending.',
    )
    console.log('---- MOVE-IN CHECKLIST LEAD (dev fallback) ----')
    console.log('To:     ', TO_EMAIL)
    console.log('Subject:', subject)
    console.log(text)
    console.log('-------------------------------------------------')
    return NextResponse.json({ ok: true, dev: true })
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
      console.error('[checklist-lead] Resend error:', result.error)
      // Even if email fails, the Supabase insert above may have succeeded.
      // Return success so the user gets their checklist — log the email
      // failure for ops to chase down separately.
      return NextResponse.json({ ok: true, emailWarning: true })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[checklist-lead] send failed:', err)
    return NextResponse.json({ ok: true, emailWarning: true })
  }
}
