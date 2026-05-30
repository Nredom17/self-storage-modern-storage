// ─────────────────────────────────────────────────────────────────────────────
// Google Business Profile (GBP) reviews client — server-only.
//
// Pulls a facility's rating + reviews from the OWNER's verified Google Business
// Profile via the official API (NOT scraping, NOT the Places API). This is the
// compliant way to display your own listing's reviews on your own site.
//
// Requires these environment variables (set in Vercel → Project → Settings →
// Environment Variables). Until they're present, every function returns null
// and the site shows its graceful "reviews coming soon" state.
//
//   GOOGLE_GBP_CLIENT_ID        OAuth 2.0 client ID
//   GOOGLE_GBP_CLIENT_SECRET    OAuth 2.0 client secret
//   GOOGLE_GBP_REFRESH_TOKEN    refresh token for the Google account that
//                               MANAGES the listings (one-time consent)
//   GOOGLE_GBP_ACCOUNT_ID       the GBP account ID that owns the locations
//                               (e.g. "accounts/1234567890" or "1234567890")
//
// Getting access (one-time, done by the listing owner):
//   1. Create a Google Cloud project; enable the Business Profile APIs.
//   2. Request GBP API access (Google allowlists it — apply + wait for approval).
//   3. Create an OAuth client (type "Web"); complete the consent flow with the
//      business.manage scope to mint a refresh token.
//   4. Find each facility's location ID and paste it into the review_facilities
//      config (lib/reviews.ts or the Supabase table).
// ─────────────────────────────────────────────────────────────────────────────

import type { GoogleReview } from '@/lib/reviews'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
// Reviews live on the legacy v4 surface of the Business Profile API.
const GBP_BASE = 'https://mybusiness.googleapis.com/v4'

export type FetchedReviews = {
  rating: number | null
  reviewCount: number | null
  reviews: GoogleReview[]
}

function creds() {
  const clientId = process.env.GOOGLE_GBP_CLIENT_ID
  const clientSecret = process.env.GOOGLE_GBP_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_GBP_REFRESH_TOKEN
  const accountId = process.env.GOOGLE_GBP_ACCOUNT_ID
  if (!clientId || !clientSecret || !refreshToken || !accountId) return null
  return { clientId, clientSecret, refreshToken, accountId }
}

/** True when all GBP env vars are present. Pages/cron use this to decide whether to attempt a live fetch. */
export function isGoogleReviewsConfigured(): boolean {
  return creds() !== null
}

/** Exchange the long-lived refresh token for a short-lived access token. */
async function getAccessToken(): Promise<string | null> {
  const c = creds()
  if (!c) return null
  try {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: c.clientId,
        client_secret: c.clientSecret,
        refresh_token: c.refreshToken,
        grant_type: 'refresh_token',
      }),
      cache: 'no-store',
    })
    if (!res.ok) {
      console.warn('[reviews] GBP token exchange failed:', res.status)
      return null
    }
    const json = (await res.json()) as { access_token?: string }
    return json.access_token ?? null
  } catch (err) {
    console.warn('[reviews] GBP token exchange threw:', err)
    return null
  }
}

const STAR_WORD_TO_NUMBER: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
}

type GbpReview = {
  reviewId?: string
  reviewer?: { displayName?: string; profilePhotoUrl?: string }
  starRating?: string
  comment?: string
  createTime?: string
}

/** Build the full GBP resource name from the configured account + location ID. */
function buildLocationName(accountId: string, googleLocationId: string): string {
  // Accept "accounts/x/locations/y", "locations/y", or a bare ID.
  if (googleLocationId.startsWith('accounts/')) return googleLocationId
  const acct = accountId.startsWith('accounts/') ? accountId : `accounts/${accountId}`
  const loc = googleLocationId.startsWith('locations/')
    ? googleLocationId
    : `locations/${googleLocationId}`
  return `${acct}/${loc}`
}

/**
 * Fetch rating + latest reviews for one location. Returns null if not configured
 * or on error (caller keeps the previously cached data). `limit` caps how many
 * reviews we keep for display (newest first).
 */
export async function fetchFacilityReviews(
  googleLocationId: string,
  limit = 8,
): Promise<FetchedReviews | null> {
  const c = creds()
  if (!c || !googleLocationId) return null

  const token = await getAccessToken()
  if (!token) return null

  const name = buildLocationName(c.accountId, googleLocationId)
  const url = `${GBP_BASE}/${name}/reviews?pageSize=${Math.max(limit, 20)}&orderBy=updateTime%20desc`

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) {
      console.warn(`[reviews] GBP reviews fetch failed for ${name}:`, res.status)
      return null
    }
    const json = (await res.json()) as {
      reviews?: GbpReview[]
      averageRating?: number
      totalReviewCount?: number
    }

    const reviews: GoogleReview[] = (json.reviews ?? [])
      .map((r) => ({
        author: r.reviewer?.displayName?.trim() || 'Google user',
        authorPhoto: r.reviewer?.profilePhotoUrl,
        rating: STAR_WORD_TO_NUMBER[r.starRating ?? ''] ?? 0,
        text: (r.comment ?? '').trim(),
        createTime: r.createTime ?? new Date().toISOString(),
      }))
      // keep reviews that actually have written text for display
      .filter((r) => r.text.length > 0)
      .slice(0, limit)

    return {
      rating: typeof json.averageRating === 'number' ? json.averageRating : null,
      reviewCount: typeof json.totalReviewCount === 'number' ? json.totalReviewCount : null,
      reviews,
    }
  } catch (err) {
    console.warn(`[reviews] GBP reviews fetch threw for ${name}:`, err)
    return null
  }
}
