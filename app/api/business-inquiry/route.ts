import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Run on Node (not Edge) — Resend SDK is fine on either, but Node is the
// path of least surprise for future additions (file attachments, logging, etc.).
export const runtime = 'nodejs'
// This endpoint is dynamic per request.
export const dynamic = 'force-dynamic'

// Override either env var in Vercel to redirect inquiries without a code deploy.
const TO_EMAIL = process.env.BUSINESS_INQUIRY_TO ?? 'info@modernstorage.com'
const FROM_EMAIL =
  process.env.BUSINESS_INQUIRY_FROM ?? 'Modern Storage® Website <forms@modernstorage.com>'

type Payload = {
  name?: string
  company?: string
  email?: string
  phone?: string
  useCase?: string
  location?: string
  notes?: string
  // Honeypot — real users leave this empty; bots filling every input get caught here.
  website?: string
}

export async function POST(req: NextRequest) {
  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 },
    )
  }

  // Honeypot: respond 200 so bots think they succeeded and stop retrying,
  // but skip the actual send.
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: 'Name and email are required.' },
      { status: 400 },
    )
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const company = (body.company ?? '').trim()
  const phone = (body.phone ?? '').trim()
  const useCase = (body.useCase ?? '').trim()
  const location = (body.location ?? '').trim()
  const notes = (body.notes ?? '').trim()

  const subject = `Business Storage Inquiry — ${company || name}`
  const text = [
    `Name: ${name}`,
    `Company: ${company || '—'}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    `Use case: ${useCase || '—'}`,
    `Preferred location: ${location || '—'}`,
    '',
    'Notes / storage needs:',
    notes || '—',
    '',
    '— Submitted from self-storage.modernstorage.com/business-storage',
  ].join('\n')

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Dev/preview fallback so the form round-trip is testable without a key.
    // In production, missing the key would silently log instead of sending,
    // so this branch must never run there — the deploy checklist enforces it.
    console.warn(
      '[business-inquiry] RESEND_API_KEY not set — logging inquiry instead of sending.',
    )
    console.log('---- BUSINESS INQUIRY (dev fallback) ----')
    console.log('To:     ', TO_EMAIL)
    console.log('From:   ', FROM_EMAIL)
    console.log('Subject:', subject)
    console.log('Reply-To:', email)
    console.log(text)
    console.log('-----------------------------------------')
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
      console.error('[business-inquiry] Resend error:', result.error)
      return NextResponse.json(
        {
          ok: false,
          error: 'Could not send your inquiry right now. Please try again or call us.',
        },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[business-inquiry] send failed:', err)
    return NextResponse.json(
      {
        ok: false,
        error: 'Could not send your inquiry right now. Please try again or call us.',
      },
      { status: 500 },
    )
  }
}
