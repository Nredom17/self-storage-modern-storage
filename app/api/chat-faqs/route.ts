// Public endpoint that returns the current chatbot Q&A list.
//
// Used by the chat widget to refresh FAQs on every page load, so admin edits
// at /admin/chatbot go live within seconds rather than waiting on ISR cache.
// Also used by the embeddable widget.js on other Modern Storage® sites
// (modernstorage.com, podcast.modernstorage.com) — hence the CORS headers.
//
// Reads with the service-role client so the response is unaffected by RLS
// policies on the chat_faqs table. The response only includes ACTIVE rows
// and only the fields the widget needs (no internal IDs, no inactive drafts).
// FAQ content is public-facing — meant to be shown to website visitors — so
// returning it from a public endpoint is safe.

import { NextResponse } from 'next/server'
import { getServiceSupabaseClient } from '@/lib/supabase'
import { CHAT_FAQS, type ChatFaq } from '@/lib/chatbot'
import { mapDbChatFaq } from '@/lib/data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
  // Edge-cached for 60s so this isn't a fresh DB read on every visitor; the
  // widget refreshes client-side anyway, so a minute of staleness is fine.
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
}

type DbChatFaq = {
  id: string
  question: string
  keywords: string | null
  answer: string
  button_label: string | null
  button_url: string | null
  location_answers: Record<string, string> | null
  active: boolean
  sort_order: number
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET() {
  const client = getServiceSupabaseClient()
  // Service role missing → fall back to the static hardcoded list (only 5
  // entries; better than nothing for a never-configured deploy).
  if (!client) {
    return NextResponse.json(
      { ok: true, source: 'static', faqs: CHAT_FAQS },
      { headers: CORS_HEADERS },
    )
  }

  try {
    const { data, error } = await client
      .from('chat_faqs')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      return NextResponse.json(
        { ok: true, source: 'static', faqs: CHAT_FAQS, warning: error.message },
        { headers: CORS_HEADERS },
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { ok: true, source: 'static', faqs: CHAT_FAQS },
        { headers: CORS_HEADERS },
      )
    }

    // Merge code-side CHAT_FAQS into the Supabase set. The admin's
    // entries take priority — code-side entries are only added when
    // they don't duplicate an existing question (case-insensitive,
    // whitespace-collapsed match). This lets us ship targeted FAQs
    // (e.g. "How long can I rent for?") without overwriting anything
    // the admin manages, while still surfacing them through the same
    // single endpoint the widget reads from.
    const supabaseFaqs: ChatFaq[] = (data as DbChatFaq[]).map(mapDbChatFaq)
    const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()
    const seen = new Set(supabaseFaqs.map((f) => normalize(f.question)))
    const merged: ChatFaq[] = [
      ...supabaseFaqs,
      ...CHAT_FAQS.filter((f) => !seen.has(normalize(f.question))),
    ]
    return NextResponse.json(
      {
        ok: true,
        source: 'supabase+static',
        count: merged.length,
        supabaseCount: supabaseFaqs.length,
        staticAdded: merged.length - supabaseFaqs.length,
        faqs: merged,
      },
      { headers: CORS_HEADERS },
    )
  } catch (err) {
    return NextResponse.json(
      {
        ok: true,
        source: 'static',
        faqs: CHAT_FAQS,
        warning: err instanceof Error ? err.message : 'unknown error',
      },
      { headers: CORS_HEADERS },
    )
  }
}
