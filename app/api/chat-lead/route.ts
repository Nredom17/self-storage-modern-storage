// Captures the name + email collected at the start of the chat widget.
// Best-effort: always logs; emails the team via Resend when RESEND_API_KEY is
// set. Never blocks the chat — the widget ignores the response.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown } = {}
  try {
    body = await req.json()
  } catch {
    /* ignore malformed body */
  }

  const name = String(body.name ?? '').slice(0, 120).trim()
  const email = String(body.email ?? '').slice(0, 200).trim()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'valid email required' }, { status: 400 })
  }

  console.log(`[CHAT LEAD] name="${name}" email="${email}" at=${new Date().toISOString()}`)

  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    const to = process.env.CHAT_LEAD_TO ?? process.env.CHECKLIST_LEAD_TO ?? 'info@modernstorage.com'
    const from =
      process.env.CHAT_LEAD_FROM ??
      process.env.BUSINESS_INQUIRY_FROM ??
      'Modern Storage Chat <onboarding@resend.dev>'
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `New chat lead — ${name || 'website visitor'}`,
          text: `New Modern Storage® chatbot lead\n\nName:  ${name || '(not given)'}\nEmail: ${email}\nTime:  ${new Date().toISOString()}\nSource: website chat widget`,
        }),
      })
    } catch (err) {
      console.warn('[CHAT LEAD] email send failed (non-fatal):', err)
    }
  }

  return NextResponse.json({ ok: true })
}
