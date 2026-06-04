// AI-powered FAQ suggestion endpoint for the Storage Tips editor.
//
// Takes the current post's title + intro + quick answer + body JSON,
// flattens the body into plain text, sends it to Claude with a tight
// system prompt, and returns 5-6 {q, a} suggestions. The editor UI
// then lets the writer accept individual suggestions into the FAQ
// section, edit them, or skip.
//
// Costs: ~$0.001-0.003 per call (Haiku tier). Anthropic API key is
// read from ANTHROPIC_API_KEY in Vercel. Sits behind middleware.ts
// HTTP Basic Auth like the rest of /api/admin/*.

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5'

// Flatten a body JSON array into a single plain-text article. Only
// text-bearing block types contribute — images/CTAs/etc. don't help
// the model understand what the article is actually about.
function flattenBody(body: unknown): string {
  if (!Array.isArray(body)) return ''
  const pieces: string[] = []
  for (const item of body) {
    if (!item || typeof item !== 'object') continue
    const b = item as Record<string, unknown>
    const type = typeof b.type === 'string' ? b.type : ''
    const text = typeof b.text === 'string' ? b.text : ''
    switch (type) {
      case 'heading':
        if (text) pieces.push('\n## ' + text + '\n')
        break
      case 'paragraph':
      case 'quote':
        if (text) pieces.push(text)
        break
      case 'callout':
        if (b.title && typeof b.title === 'string') pieces.push(b.title)
        if (text) pieces.push(text)
        break
      case 'list':
      case 'takeaways':
        if (Array.isArray(b.items)) {
          for (const it of b.items) if (typeof it === 'string' && it.trim()) pieces.push('- ' + it)
        }
        break
      case 'faq':
        if (Array.isArray(b.items)) {
          for (const it of b.items) {
            if (it && typeof it === 'object') {
              const q = (it as { q?: unknown }).q
              const a = (it as { a?: unknown }).a
              if (typeof q === 'string' && q.trim()) pieces.push('Q: ' + q)
              if (typeof a === 'string' && a.trim()) pieces.push('A: ' + a)
            }
          }
        }
        break
      case 'comparison':
        if (Array.isArray(b.rows)) {
          for (const r of b.rows) {
            if (r && typeof r === 'object') {
              const left = (r as { left?: unknown }).left
              const right = (r as { right?: unknown }).right
              if (typeof left === 'string' && typeof right === 'string') {
                pieces.push(left + ' vs ' + right)
              }
            }
          }
        }
        break
    }
  }
  return pieces.join('\n').trim()
}

const SYSTEM_PROMPT = `You generate FAQ question-and-answer pairs for self-storage blog posts on Modern Storage®, an Arkansas self-storage company operating 10 facilities.

Read the article and propose 5-6 questions a real customer would ask about this specific topic. For each, write a concise, factual answer (2-4 sentences) drawn directly from the article — do NOT invent facts, pricing, policies, or claims that aren't in the article.

Quality bar:
  - Questions sound natural ("How long can I store furniture in a climate-controlled unit?" not "What is climate control?")
  - Each question targets something a customer would actually type into Google
  - Answers are concrete and Modern Storage®-specific where the article supports it
  - Skip questions whose answer isn't in the article — quality beats quantity
  - Use "Modern Storage®" with the registered mark when the brand is named

Output ONLY a strict JSON array of objects with "q" and "a" fields. No markdown fence, no preamble, no commentary. Example output (do not copy this content):
[{"q":"How long can I rent a storage unit?","a":"Modern Storage® rentals are month-to-month..."}]`

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'ANTHROPIC_API_KEY is not configured in Vercel. Add it under Project Settings → Environment Variables and redeploy to enable AI FAQ suggestions.',
      },
      { status: 503 },
    )
  }

  let body: { title?: unknown; intro?: unknown; quickAnswer?: unknown; body?: unknown } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const intro = typeof body.intro === 'string' ? body.intro.trim() : ''
  const quickAnswer = typeof body.quickAnswer === 'string' ? body.quickAnswer.trim() : ''
  const bodyText = flattenBody(body.body)

  if (!title && !intro && !bodyText) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Add some content to the post first (title, intro, or body) before generating FAQ suggestions.',
      },
      { status: 400 },
    )
  }

  const article = [
    title ? `# ${title}` : '',
    intro,
    quickAnswer ? `Quick answer: ${quickAnswer}` : '',
    bodyText,
  ]
    .filter(Boolean)
    .join('\n\n')

  try {
    const r = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Article:\n\n${article}\n\nGenerate 5-6 FAQ suggestions in strict JSON array format.`,
          },
        ],
      }),
    })

    if (!r.ok) {
      const errText = await r.text()
      return NextResponse.json(
        {
          ok: false,
          error: `Anthropic API error (${r.status}). ${errText.slice(0, 200)}`,
        },
        { status: 502 },
      )
    }

    const data = (await r.json()) as { content?: { text?: string }[] }
    const text = data.content?.[0]?.text || ''

    // Strip a wrapping markdown code fence if the model added one
    // despite the system prompt asking for raw JSON.
    const cleaned = text
      .replace(/^\s*```(?:json)?\s*/i, '')
      .replace(/\s*```\s*$/, '')
      .trim()

    let items: { q: string; a: string }[] = []
    try {
      const parsed: unknown = JSON.parse(cleaned)
      if (Array.isArray(parsed)) {
        items = parsed
          .filter((i): i is Record<string, unknown> => Boolean(i) && typeof i === 'object')
          .map((i) => ({
            q: typeof i.q === 'string' ? i.q.trim() : '',
            a: typeof i.a === 'string' ? i.a.trim() : '',
          }))
          .filter((i) => i.q.length > 0 && i.a.length > 0)
      }
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: 'Could not parse AI response. Try again — sometimes the model adds extra text.',
          raw: text.slice(0, 500),
        },
        { status: 502 },
      )
    }

    if (items.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'AI returned no valid FAQ suggestions. Try again, or add more content to the post body first.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true, items, model: ANTHROPIC_MODEL })
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : 'Unknown error talking to Anthropic.',
      },
      { status: 500 },
    )
  }
}
