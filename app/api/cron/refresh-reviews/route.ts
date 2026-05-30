// ─────────────────────────────────────────────────────────────────────────────
// Scheduled review refresh — pulls each facility's Google reviews via the
// Business Profile API and caches them in Supabase (facility_reviews).
//
// Triggered daily by Vercel Cron (see vercel.json). Can also be run manually:
//   curl -H "Authorization: Bearer $CRON_SECRET" \
//        https://self-storage.modernstorage.com/api/cron/refresh-reviews
//
// Safe no-op until configured: if the Google credentials or Supabase service
// key are missing, it skips gracefully and reports what it would have done.
//
// Env:
//   CRON_SECRET                 shared secret; Vercel Cron sends it as a Bearer
//                               token automatically when set.
//   SUPABASE_SERVICE_ROLE_KEY   service role for writes (bypasses RLS).
//   NEXT_PUBLIC_SUPABASE_URL    Supabase project URL (already used sitewide).
//   + the GOOGLE_GBP_* vars consumed by lib/google-reviews.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getReviewFacilities } from '@/lib/reviews'
import { fetchFacilityReviews, isGoogleReviewsConfigured } from '@/lib/google-reviews'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Allow up to ~60s — fetching 10 locations sequentially with token exchange.
export const maxDuration = 60

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  // If no secret is configured, allow (dev). In production, set CRON_SECRET.
  if (!secret) return true
  const auth = req.headers.get('authorization')
  if (auth === `Bearer ${secret}`) return true
  const url = new URL(req.url)
  return url.searchParams.get('secret') === secret
}

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  const googleReady = isGoogleReviewsConfigured()
  const db = adminClient()

  if (!googleReady || !db) {
    return NextResponse.json({
      ok: true,
      refreshed: 0,
      skipped: true,
      reason: !googleReady
        ? 'Google Business Profile credentials not configured (GOOGLE_GBP_*).'
        : 'Supabase service role not configured (SUPABASE_SERVICE_ROLE_KEY).',
    })
  }

  const facilities = await getReviewFacilities()
  const results: { slug: string; status: string; reviewCount?: number }[] = []

  for (const f of facilities) {
    if (!f.googleLocationId) {
      results.push({ slug: f.slug, status: 'no-location-id' })
      continue
    }
    const fetched = await fetchFacilityReviews(f.googleLocationId)
    if (!fetched) {
      results.push({ slug: f.slug, status: 'fetch-failed' })
      continue
    }
    const { error } = await db.from('facility_reviews').upsert(
      {
        slug: f.slug,
        rating: fetched.rating,
        review_count: fetched.reviewCount,
        reviews: fetched.reviews,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'slug' },
    )
    results.push({
      slug: f.slug,
      status: error ? `write-failed: ${error.message}` : 'ok',
      reviewCount: fetched.reviewCount ?? undefined,
    })
  }

  const refreshed = results.filter((r) => r.status === 'ok').length
  return NextResponse.json({ ok: true, refreshed, total: results.length, results })
}
