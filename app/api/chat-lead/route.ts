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
import { normalizePhone, formatPhone } from '@/lib/chatbot'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Turn = { role?: unknown; text?: unknown }

// ────────────────────────────────────────────────────────────────────────
//  HTML email rendering — iMessage-style chat bubbles
// ────────────────────────────────────────────────────────────────────────
// The plain-text email was just "Bot: ... / Visitor: ..." lines, which made
// it hard to tell who was who at a glance. We now render an HTML body with
// alternating bubbles — bot on the left in gray, visitor on the right in
// Modern Storage® red — modeled on iMessage. Plain text stays as the
// fallback for email clients that strip HTML (or for accessibility tools).
//
// Email-client compatibility notes:
//  • Outlook (Windows desktop) uses Word's HTML engine — no flex, limited
//    CSS, but border-radius degrades gracefully to square bubbles which
//    still read fine. We use <table> layout everywhere for that reason.
//  • bgcolor attribute is set alongside style:background-color to cover
//    older Outlook versions that ignore inline CSS background.
//  • Modern clients (Gmail, Apple Mail, Outlook.com) render rounded
//    bubbles correctly.

const COLOR_BOT_BG = '#E9E9EB' // iMessage system gray
const COLOR_BOT_FG = '#1A1A1A' // matches site charcoal
const COLOR_VISITOR_BG = '#F60001' // Modern Storage® red
const COLOR_VISITOR_FG = '#FFFFFF'
const COLOR_PAGE_BG = '#F5F5F7' // iMessage app background
const COLOR_CARD_BG = '#FFFFFF'
const COLOR_BORDER = '#E5E5EA'
const COLOR_MUTED = '#6E6E73'
const COLOR_TINY = '#86868B'

// HTML-escape free-text so a visitor typing "<script>" or "&" doesn't break
// the rendered email and doesn't execute. Plain text fallback is unaffected.
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

type BubbleTurn = { role: 'bot' | 'visitor'; text: string }

function renderBubble(turn: BubbleTurn, label: string, showLabel: boolean): string {
  const isVisitor = turn.role === 'visitor'
  const bg = isVisitor ? COLOR_VISITOR_BG : COLOR_BOT_BG
  const fg = isVisitor ? COLOR_VISITOR_FG : COLOR_BOT_FG
  const align = isVisitor ? 'right' : 'left'

  const labelHtml = showLabel
    ? `<div style="font-size:11px;color:${COLOR_TINY};margin:8px 4px 4px 4px;text-align:${align};font-weight:600;">${escapeHtml(label)}</div>`
    : ''

  // Outer table is 100% width with a spacer cell on the opposite side of
  // the bubble — that pushes the bubble to the correct edge without flex.
  const spacer = `<td width="20%" style="width:20%;">&nbsp;</td>`
  const bubbleCell = `
    <td align="${align}" valign="top" style="padding:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;">
        <tr>
          <td bgcolor="${bg}" style="background-color:${bg};color:${fg};padding:10px 14px;border-radius:18px;font-size:14px;line-height:1.45;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;mso-line-height-rule:exactly;">
            ${escapeHtml(turn.text)}
          </td>
        </tr>
      </table>
    </td>`

  return `
    ${labelHtml}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 4px 0;">
      <tr>
        ${isVisitor ? spacer : ''}
        ${bubbleCell}
        ${isVisitor ? '' : spacer}
      </tr>
    </table>`
}

function renderConversationHtml(
  turns: BubbleTurn[],
  visitorName: string,
  meta: { phone: string; email: string; time: string; subjectKind: 'lead' | 'transcript' | 'message'; message?: string },
): string {
  const headline =
    meta.subjectKind === 'message'
      ? 'New Modern Storage® chatbot message'
      : meta.subjectKind === 'transcript'
        ? 'New Modern Storage® chatbot conversation'
        : 'New Modern Storage® chatbot lead'

  // Show a label above each bubble only when the role changes (iMessage
  // style — consecutive bot messages share a single label).
  const bubbleHtml = turns
    .map((t, i) => {
      const prev = turns[i - 1]
      const showLabel = !prev || prev.role !== t.role
      // Label above the bubble. We dropped the explicit "bot" tag — the
      // brand-side label now reads cleanly as "Modern Storage®" so the
      // conversation looks like a normal customer-service exchange rather
      // than flagging the automated nature.
      const label = t.role === 'visitor' ? visitorName || 'Visitor' : 'Modern Storage®'
      return renderBubble(t, label, showLabel)
    })
    .join('\n')

  const messageBlock = meta.message
    ? `
      <tr>
        <td style="padding:16px 20px;border-top:1px solid ${COLOR_BORDER};">
          <div style="font-size:12px;color:${COLOR_MUTED};font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Typed message</div>
          <div style="background:${COLOR_BOT_BG};color:${COLOR_BOT_FG};padding:12px 14px;border-radius:12px;font-size:14px;line-height:1.5;white-space:pre-wrap;">${escapeHtml(meta.message)}</div>
        </td>
      </tr>`
    : ''

  const conversationBlock =
    turns.length > 0
      ? `
        <tr>
          <td style="padding:16px 20px 20px 20px;background:${COLOR_CARD_BG};">
            <div style="font-size:12px;color:${COLOR_MUTED};font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Conversation</div>
            ${bubbleHtml}
          </td>
        </tr>`
      : ''

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(headline)}</title>
</head>
<body style="margin:0;padding:0;background:${COLOR_PAGE_BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${COLOR_BOT_FG};">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${COLOR_PAGE_BG}" style="background:${COLOR_PAGE_BG};padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:${COLOR_CARD_BG};border-radius:14px;overflow:hidden;border:1px solid ${COLOR_BORDER};">

          <!-- Header strip with red brand bar -->
          <tr><td bgcolor="${COLOR_VISITOR_BG}" style="background:${COLOR_VISITOR_BG};height:4px;line-height:4px;font-size:0;">&nbsp;</td></tr>

          <!-- Headline + contact card -->
          <tr>
            <td style="padding:20px 20px 16px 20px;">
              <div style="font-size:11px;font-weight:700;color:${COLOR_VISITOR_BG};text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Modern Storage&reg; chat widget</div>
              <h1 style="margin:0 0 14px 0;font-size:20px;font-weight:800;color:${COLOR_BOT_FG};line-height:1.25;">${escapeHtml(headline)}</h1>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size:14px;color:${COLOR_BOT_FG};line-height:1.6;">
                <tr><td width="80" style="color:${COLOR_MUTED};font-weight:600;">Name</td><td>${escapeHtml(visitorName || '(not given)')}</td></tr>
                <tr><td style="color:${COLOR_MUTED};font-weight:600;">Phone</td><td>${meta.phone ? `<a href="tel:${escapeHtml(meta.phone.replace(/[^\d+]/g, ''))}" style="color:${COLOR_VISITOR_BG};text-decoration:none;">${escapeHtml(meta.phone)}</a>` : '(not given)'}</td></tr>
                ${meta.email ? `<tr><td style="color:${COLOR_MUTED};font-weight:600;">Email</td><td><a href="mailto:${escapeHtml(meta.email)}" style="color:${COLOR_VISITOR_BG};text-decoration:none;">${escapeHtml(meta.email)}</a></td></tr>` : ''}
                <tr><td style="color:${COLOR_MUTED};font-weight:600;">Time</td><td>${escapeHtml(meta.time)}</td></tr>
                <tr><td style="color:${COLOR_MUTED};font-weight:600;">Source</td><td>website chat widget</td></tr>
              </table>
            </td>
          </tr>

          ${messageBlock}
          ${conversationBlock}

          <!-- Footer -->
          <tr>
            <td style="padding:14px 20px 18px 20px;border-top:1px solid ${COLOR_BORDER};font-size:12px;color:${COLOR_TINY};line-height:1.5;">
              Sent automatically by the Modern Storage&reg; chat widget. Reply to this email to follow up directly with the visitor${meta.email ? '' : ' by phone'}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(req: Request) {
  let body: { name?: unknown; phone?: unknown; email?: unknown; transcript?: unknown; message?: unknown } = {}
  try {
    body = await req.json()
  } catch {
    /* ignore malformed body */
  }

  const name = String(body.name ?? '').slice(0, 120).trim()
  const email = String(body.email ?? '').slice(0, 200).trim()
  // The chat widget collects a 10-digit phone number as the contact field.
  const phoneDigits = normalizePhone(String(body.phone ?? ''))
  const phoneDisplay = phoneDigits ? formatPhone(phoneDigits) : ''
  // A free-typed "Send us a message" from the chat widget.
  const message = String(body.message ?? '').slice(0, 4000).trim()

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!phoneDigits && !validEmail) {
    return NextResponse.json({ ok: false, error: 'valid phone or email required' }, { status: 400 })
  }

  // Build a readable transcript, if one was sent.
  const turns = Array.isArray(body.transcript) ? (body.transcript as Turn[]) : []
  // Structured bubbles used for HTML rendering — preserves the role split so
  // the email can render left/right alignment per turn.
  const bubbleTurns: BubbleTurn[] = turns
    .slice(0, 100)
    .map((t) => {
      const role: 'bot' | 'visitor' = t.role === 'user' ? 'visitor' : 'bot'
      const text = String(t.text ?? '').replace(/\s+/g, ' ').trim().slice(0, 500)
      return { role, text }
    })
    .filter((t) => t.text.length > 0)

  // Plain-text version, kept as the fallback for clients that strip HTML.
  const transcript = bubbleTurns.map((t) => `${t.role === 'visitor' ? 'Visitor' : 'Bot'}: ${t.text}`)
  const hasTranscript = transcript.length > 0

  const kind = message ? 'MESSAGE' : hasTranscript ? 'TRANSCRIPT' : 'LEAD'
  console.log(
    `[CHAT ${kind}] name="${name}" phone="${phoneDisplay}" turns=${transcript.length} at=${new Date().toISOString()}`,
  )

  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    const to = process.env.CHAT_LEAD_TO ?? 'info@modernstorage.com'
    const from =
      process.env.CHAT_LEAD_FROM ??
      process.env.BUSINESS_INQUIRY_FROM ??
      'Modern Storage Chat <onboarding@resend.dev>'

    const subject = message
      ? `Chat message — ${name || 'website visitor'}`
      : hasTranscript
        ? `Chat conversation — ${name || 'website visitor'}`
        : `New chat lead — ${name || 'website visitor'}`

    const timeIso = new Date().toISOString()

    const text = [
      `New Modern Storage® chatbot ${message ? 'message' : hasTranscript ? 'conversation' : 'lead'}`,
      '',
      `Name:  ${name || '(not given)'}`,
      `Phone: ${phoneDisplay || '(not given)'}`,
      ...(validEmail ? [`Email: ${email}`] : []),
      `Time:  ${timeIso}`,
      `Source: website chat widget`,
      ...(message ? ['', 'Message:', message] : []),
      ...(hasTranscript ? ['', 'Conversation:', ...transcript] : []),
    ].join('\n')

    // HTML body — iMessage-style chat bubbles. Falls back to `text` above on
    // clients that strip HTML. Resend uses `html` as primary when both are set.
    const subjectKind: 'lead' | 'transcript' | 'message' = message
      ? 'message'
      : hasTranscript
        ? 'transcript'
        : 'lead'
    const html = renderConversationHtml(bubbleTurns, name, {
      phone: phoneDisplay,
      email: validEmail ? email : '',
      time: timeIso,
      subjectKind,
      message: message || undefined,
    })

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        // Only set reply_to when we actually have an email (phone-only leads omit it).
        body: JSON.stringify({ from, to: [to], ...(validEmail ? { reply_to: email } : {}), subject, text, html }),
      })
    } catch (err) {
      console.warn('[CHAT LEAD] email send failed (non-fatal):', err)
    }
  }

  return NextResponse.json({ ok: true })
}
