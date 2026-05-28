// ─────────────────────────────────────────────────────────────────────────────
// Reviews data layer
//
// Two concerns live here:
//   1. ADMIN CONFIG — which facilities show on the Reviews pages, in what order,
//      each facility's verified Google Business Profile location ID, and its
//      public "Leave a Review" link. Editable in this file (source of truth +
//      fallback) OR in the Supabase `review_facilities` table (no code deploy
//      needed — DB rows override this file field-by-field).
//   2. CACHED REVIEW DATA — the rating, review count, and latest reviews pulled
//      from Google on a schedule (see app/api/cron/refresh-reviews) and stored
//      in the Supabase `facility_reviews` table. NEVER hand-entered.
//
// Until the Google credentials + per-facility location IDs are filled in, the
// pages render a graceful "reviews are being collected" state — nothing breaks.
// ─────────────────────────────────────────────────────────────────────────────

import { getSupabaseClient } from '@/lib/supabase'
import { LOCATIONS } from '@/lib/site'

// ── Types ────────────────────────────────────────────────────────────────────

export type ReviewFacilityConfig = {
  /** Matches the /locations/[slug] slug so internal links stay consistent. */
  slug: string
  /** Verified Google Business Profile location ID, e.g. "locations/1234567890". */
  googleLocationId: string
  /** Public Google "write a review" link for this facility. */
  googleReviewLink: string
  /** Lower numbers sort first on the Reviews landing page. */
  displayOrder: number
  /** Whether this facility appears on the Reviews pages at all. */
  visible: boolean
}

/** Config merged with the facility's display metadata (name/city/region). */
export type ReviewFacility = ReviewFacilityConfig & {
  name: string
  city: string
  region: string
}

/** One Google review, normalized from the GBP API response. */
export type GoogleReview = {
  author: string
  authorPhoto?: string
  /** 1–5 */
  rating: number
  text: string
  /** ISO timestamp the review was created. */
  createTime: string
}

/** Cached rating summary + latest reviews for one facility. */
export type FacilityReviewData = {
  slug: string
  /** Average star rating (null until first refresh). */
  rating: number | null
  /** Total number of Google reviews (null until first refresh). */
  reviewCount: number | null
  /** Latest reviews, newest first. Empty until first refresh. */
  reviews: GoogleReview[]
  /** ISO timestamp of the last successful refresh, or null. */
  updatedAt: string | null
}

// Supabase row shapes (mirror supabase/migrations/0003_reviews.sql).
type DbReviewFacility = {
  slug: string
  google_location_id: string | null
  google_review_link: string | null
  display_order: number
  visible: boolean
}
type DbFacilityReviews = {
  slug: string
  rating: number | null
  review_count: number | null
  reviews: GoogleReview[] | null
  updated_at: string | null
}

// ── ADMIN CONFIG (edit me, or manage via the Supabase table) ──────────────────
//
// HOW TO GO LIVE:
//   1. In Google Business Profile, get each facility's location ID and its
//      public review link ("Get more reviews" → share link).
//   2. Paste them below (or into the Supabase `review_facilities` table).
//   3. Add the Google API credentials to the environment (see
//      app/api/cron/refresh-reviews/route.ts). The daily cron does the rest.
//
// Leave googleLocationId/googleReviewLink as '' for any facility not ready yet —
// it will show a "reviews coming soon" state and hide the review buttons.
export const REVIEW_FACILITY_CONFIG: readonly ReviewFacilityConfig[] = [
  { slug: 'west-little-rock', googleLocationId: '', googleReviewLink: '', displayOrder: 1, visible: true },
  { slug: 'shackleford', googleLocationId: '', googleReviewLink: '', displayOrder: 2, visible: true },
  { slug: 'riverdale', googleLocationId: '', googleReviewLink: '', displayOrder: 3, visible: true },
  { slug: 'north-little-rock', googleLocationId: '', googleReviewLink: '', displayOrder: 4, visible: true },
  { slug: 'maumelle', googleLocationId: '', googleReviewLink: '', displayOrder: 5, visible: true },
  { slug: 'bryant', googleLocationId: '', googleReviewLink: '', displayOrder: 6, visible: true },
  { slug: 'hot-springs', googleLocationId: '', googleReviewLink: '', displayOrder: 7, visible: true },
  { slug: 'bentonville', googleLocationId: '', googleReviewLink: '', displayOrder: 8, visible: true },
  { slug: 'springdale', googleLocationId: '', googleReviewLink: '', displayOrder: 9, visible: true },
  { slug: 'lowell', googleLocationId: '', googleReviewLink: '', displayOrder: 10, visible: true },
] as const

// ── Helpers ───────────────────────────────────────────────────────────────────

const LOCATION_BY_SLUG = new Map<string, (typeof LOCATIONS)[number]>(
  LOCATIONS.map((l) => [l.slug, l]),
)

function withMetadata(cfg: ReviewFacilityConfig): ReviewFacility | null {
  const loc = LOCATION_BY_SLUG.get(cfg.slug)
  if (!loc) return null
  return { ...cfg, name: loc.name, city: loc.city, region: loc.region }
}

// ── Public data access ─────────────────────────────────────────────────────────

/**
 * Visible facilities for the Reviews pages, sorted by display order. Reads the
 * Supabase `review_facilities` table when configured and overlays it on the
 * static config (so DB edits win); otherwise uses the static config alone.
 */
export async function getReviewFacilities(): Promise<ReviewFacility[]> {
  const merged = new Map<string, ReviewFacilityConfig>(
    REVIEW_FACILITY_CONFIG.map((c) => [c.slug, { ...c }]),
  )

  const client = getSupabaseClient()
  if (client) {
    try {
      const { data, error } = await client
        .from('review_facilities')
        .select('slug, google_location_id, google_review_link, display_order, visible')
      if (!error && data) {
        for (const row of data as DbReviewFacility[]) {
          const base = merged.get(row.slug) ?? {
            slug: row.slug,
            googleLocationId: '',
            googleReviewLink: '',
            displayOrder: 999,
            visible: true,
          }
          merged.set(row.slug, {
            slug: row.slug,
            googleLocationId: row.google_location_id ?? base.googleLocationId,
            googleReviewLink: row.google_review_link ?? base.googleReviewLink,
            displayOrder: row.display_order ?? base.displayOrder,
            visible: row.visible ?? base.visible,
          })
        }
      }
    } catch {
      // fall through to static config
    }
  }

  return Array.from(merged.values())
    .map(withMetadata)
    .filter((f): f is ReviewFacility => f !== null && f.visible)
    .sort((a, b) => a.displayOrder - b.displayOrder)
}

/** A single visible facility by slug, or null. */
export async function getReviewFacility(slug: string): Promise<ReviewFacility | null> {
  const all = await getReviewFacilities()
  return all.find((f) => f.slug === slug) ?? null
}

const EMPTY_DATA = (slug: string): FacilityReviewData => ({
  slug,
  rating: null,
  reviewCount: null,
  reviews: [],
  updatedAt: null,
})

function mapReviewRow(row: DbFacilityReviews): FacilityReviewData {
  return {
    slug: row.slug,
    rating: row.rating,
    reviewCount: row.review_count,
    reviews: Array.isArray(row.reviews) ? row.reviews : [],
    updatedAt: row.updated_at,
  }
}

/** Cached review data for one facility (empty shape if none yet). */
export async function getFacilityReviewData(slug: string): Promise<FacilityReviewData> {
  const client = getSupabaseClient()
  if (!client) return EMPTY_DATA(slug)
  try {
    const { data, error } = await client
      .from('facility_reviews')
      .select('slug, rating, review_count, reviews, updated_at')
      .eq('slug', slug)
      .maybeSingle()
    if (error || !data) return EMPTY_DATA(slug)
    return mapReviewRow(data as DbFacilityReviews)
  } catch {
    return EMPTY_DATA(slug)
  }
}

/** Cached review data for every facility, keyed by slug. */
export async function getAllFacilityReviewData(): Promise<Map<string, FacilityReviewData>> {
  const out = new Map<string, FacilityReviewData>()
  const client = getSupabaseClient()
  if (!client) return out
  try {
    const { data, error } = await client
      .from('facility_reviews')
      .select('slug, rating, review_count, reviews, updated_at')
    if (!error && data) {
      for (const row of data as DbFacilityReviews[]) out.set(row.slug, mapReviewRow(row))
    }
  } catch {
    // return whatever we have (possibly empty)
  }
  return out
}

/** Brand-wide rolled-up rating across all facilities that have data. */
export function aggregateRating(all: FacilityReviewData[]): {
  rating: number | null
  reviewCount: number
} {
  let weighted = 0
  let count = 0
  for (const d of all) {
    if (d.rating != null && d.reviewCount) {
      weighted += d.rating * d.reviewCount
      count += d.reviewCount
    }
  }
  return { rating: count > 0 ? Math.round((weighted / count) * 10) / 10 : null, reviewCount: count }
}
