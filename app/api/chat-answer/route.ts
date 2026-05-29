// AI answer-router for the chat widget.
//
// SAFETY: this NEVER generates answer text. It sends the visitor's message plus
// the list of APPROVED Q&A topics (from Supabase / lib/chatbot.ts) to an LLM and
// asks it to return ONLY the number of the single best-matching topic, or 0 for
// none. The answer text returned to the browser is always one of your approved
// answers — so the bot still cannot invent pricing, policies, or legal claims.
//
// Set ONE of these in Vercel to enable it (otherwise it returns no match and the
// widget falls back to keyword matching):
//   OPENAI_API_KEY      → uses gpt-4o-mini (override with CHAT_AI_MODEL)
//   ANTHROPIC_API_KEY   → uses claude-3-5-haiku-latest (override with CHAT_AI_MODEL)

import { NextResponse } from 'next/server'
import { getChatFaqs } from '@/lib/data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function parseIndex(s: unknown): number | null {
  const m = String(s ?? '').match(/\d+/)
  return m ? parseInt(m[0], 10) : null
}

// Ask the configured LLM to pick the best topic number. Returns null on any
// failure or if no provider key is configured.
async function classify(system: string, user: string): Promise<number | null> {
  const openaiKey = process.env.OPENAI_API_KEY
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  try {
    if (openaiKey) {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: process.env.CHAT_AI_MODEL || 'gpt-4o-mini',
          temperature: 0,
          max_tokens: 4,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
        }),
      })
      const j = await r.json()
      return parseIndex(j?.choices?.[0]?.message?.content)
    }
    if (anthropicKey) {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.CHAT_AI_MODEL || 'claude-3-5-haiku-latest',
          max_tokens: 4,
          system,
          messages: [{ role: 'user', content: user }],
        }),
      })
      const j = await r.json()
      return parseIndex(j?.content?.[0]?.text)
    }
  } catch (err) {
    console.warn('[chat-answer] classify failed (non-fatal):', err)
  }
  return null
}

export async function POST(req: Request) {
  let message = ''
  try {
    message = String(((await req.json()) as { message?: unknown })?.message ?? '')
      .slice(0, 500)
      .trim()
  } catch {
    /* ignore */
  }
  if (!message) return NextResponse.json({ matched: false })

  const faqs = await getChatFaqs()
  if (faqs.length === 0) return NextResponse.json({ matched: false })

  const catalog = faqs
    .map((f, i) => `${i + 1}. ${f.question} — keywords: ${f.keywords.join(', ')}`)
    .join('\n')

  const system =
    'You are a strict router for a self-storage company help widget. You are given a customer message and a numbered list of approved help topics. Reply with ONLY the single number of the topic that best answers the message. If none is a clear, relevant match, reply with 0. Output just the number — no words, no punctuation, no explanation.'
  const user = `Customer message: "${message}"\n\nApproved topics:\n${catalog}\n\nBest topic number (or 0):`

  const idx = await classify(system, user)
  if (idx && idx >= 1 && idx <= faqs.length) {
    const f = faqs[idx - 1]
    return NextResponse.json({
      matched: true,
      question: f.question,
      answer: f.answer,
      links: f.links ?? null,
      locationAnswers: f.locationAnswers ?? null,
    })
  }
  return NextResponse.json({ matched: false })
}
