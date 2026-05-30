// Admin CRUD for chatbot Q&A (public.chat_faqs).
//
// Protected by middleware.ts (HTTP Basic Auth on /api/admin/*). Writes use the
// service-role Supabase client, which bypasses RLS. Never call this from the
// public site — only from the /admin/chatbot editor.

import { NextResponse } from 'next/server'
import { getServiceSupabaseClient } from '@/lib/supabase'
import { CHAT_LOCATIONS } from '@/lib/chatbot'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const VALID_LOCATION_KEYS = new Set(CHAT_LOCATIONS.map((l) => l.key))

function noClient() {
  return NextResponse.json(
    {
      ok: false,
      error:
        'Supabase service role is not configured. Set SUPABASE_SERVICE_ROLE_KEY (and the NEXT_PUBLIC_SUPABASE_* vars) in Vercel, then run migration 0004_chat_faqs.sql.',
    },
    { status: 503 },
  )
}

// Coerce + sanitize an incoming FAQ payload into DB columns.
function sanitize(body: Record<string, unknown>) {
  const question = String(body.question ?? '').trim().slice(0, 300)
  const answer = String(body.answer ?? '').trim().slice(0, 4000)
  const keywords = String(body.keywords ?? '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .join(', ')
    .slice(0, 1000)
  const button_label = String(body.button_label ?? '').trim().slice(0, 120) || null
  const button_url = String(body.button_url ?? '').trim().slice(0, 500) || null
  const active = body.active === undefined ? true : Boolean(body.active)
  const sort_order = Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 0

  // location_answers: keep only known location keys with non-empty answers.
  const rawLA = (body.location_answers ?? {}) as Record<string, unknown>
  const location_answers: Record<string, string> = {}
  if (rawLA && typeof rawLA === 'object') {
    for (const [key, val] of Object.entries(rawLA)) {
      if (!VALID_LOCATION_KEYS.has(key)) continue
      const text = String(val ?? '').trim().slice(0, 4000)
      if (text) location_answers[key] = text
    }
  }

  return { question, answer, keywords, button_label, button_url, active, sort_order, location_answers }
}

export async function GET() {
  const client = getServiceSupabaseClient()
  if (!client) return noClient()
  const { data, error } = await client
    .from('chat_faqs')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false })
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, faqs: data ?? [] })
}

export async function POST(req: Request) {
  const client = getServiceSupabaseClient()
  if (!client) return noClient()
  let body: Record<string, unknown> = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }
  const row = sanitize(body)
  if (!row.question || !row.answer) {
    return NextResponse.json(
      { ok: false, error: 'Question and answer are required.' },
      { status: 400 },
    )
  }
  const { data, error } = await client.from('chat_faqs').insert(row).select('*').single()
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, faq: data })
}

export async function PUT(req: Request) {
  const client = getServiceSupabaseClient()
  if (!client) return noClient()
  let body: Record<string, unknown> = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }
  const id = String(body.id ?? '').trim()
  if (!id) return NextResponse.json({ ok: false, error: 'Missing id.' }, { status: 400 })
  const row = sanitize(body)
  if (!row.question || !row.answer) {
    return NextResponse.json(
      { ok: false, error: 'Question and answer are required.' },
      { status: 400 },
    )
  }
  const { data, error } = await client
    .from('chat_faqs')
    .update(row)
    .eq('id', id)
    .select('*')
    .single()
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, faq: data })
}

export async function DELETE(req: Request) {
  const client = getServiceSupabaseClient()
  if (!client) return noClient()
  const id = new URL(req.url).searchParams.get('id')?.trim()
  if (!id) return NextResponse.json({ ok: false, error: 'Missing id.' }, { status: 400 })
  const { error } = await client.from('chat_faqs').delete().eq('id', id)
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
