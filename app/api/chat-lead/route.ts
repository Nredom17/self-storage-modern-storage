// Captures chat widget activity and emails it to the team.
//
//  • When the visitor enters their name + email, we send a quick "new lead".
//  • When the visitor closes the chat (or leaves the page), we send the full
//    conversation transcript so the team can see what they asked.
//
// Recipient: info@modernstorage.com (override with the CHAT_LEAD_TO env var).
// Email only sends when RESEND_API_KEY is set in Vercel; otherwise we just log.
// Best-effort: never blocks the chat — the widget ignores the response.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Turn = { role?: unknown; text?: unknown }

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown; transcript?: unknown } = {}
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

  // Build a readable transcript, if one was sent.
  const turns = Array.isArray(body.transcript) ? (body.transcript as Turn[]) : []
  const transcript = turns
    .slice(0, 100)
    .map((t) => {
      const who = t.role === 'user' ? 'Visitor' : 'Bot'
      const line = String(t.text ?? '').replace(/\s+/g, ' ').trim().slice(0, 500)
      return line ? `${who}: ${line}` : ''
    })
    .filter(Boolean)
  const hasTranscript = transcript.length > 0

  console.log(
    `[CHAT ${hasTranscript ? 'TRANSCRIPT' : 'LEAD'}] name="${name}" email="${email}" turns=${transcript.length} at=${new Date().toISOString()}`,
  )

  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    const to = process.env.CHAT_LEAD_TO ?? 'info@modernstorage.com'
    const from =
      process.env.CHAT_LEAD_FROM ??
      process.env.BUSINESS_INQUIRY_FROM ??
      'Modern Storage Chat <onboarding@resend.dev>'

    const subject = hasTranscript
      ? `Chat conversation — ${name || 'website visitor'}`
      : `New chat lead — ${name || 'website visitor'}`

    const text = [
      `New Modern Storage® chatbot ${hasTranscript ? 'conversation' : 'lead'}`,
      '',
      `Name:  ${name || '(not given)'}`,
      `Email: ${email}`,
      `Time:  ${new Date().toISOString()}`,
      `Source: website chat widget`,
      ...(hasTranscript ? ['', 'Conversation:', ...transcript] : []),
    ].join('\n')

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [to], reply_to: email, subject, text }),
      })
    } catch (err) {
      console.warn('[CHAT LEAD] email send failed (non-fatal):', err)
    }
  }

  return NextResponse.json({ ok: true })
}
