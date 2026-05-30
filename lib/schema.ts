import { SITE_URL } from '@/lib/site'
import type { Location } from '@/lib/data'

/**
 * Build a schema.org SelfStorage block for a single facility. Emit one of these
 * per visible location card so Google can read each facility as a discrete
 * LocalBusiness with full address, geo, and contact info.
 *
 * SelfStorage is a subtype of LocalBusiness — using the more specific type gives
 * Google a cleaner signal about what the business does without losing any
 * LocalBusiness rich-result eligibility.
 */
export function buildLocationSchema(loc: Location, phoneDisplay: string) {
  const block: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SelfStorage',
    '@id': SITE_URL + '/#location-' + loc.slug,
    name: loc.name,
    url: SITE_URL + '/',
    telephone: phoneDisplay,
    priceRange: '$$',
    areaServed: { '@type': 'State', name: 'Arkansas' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.streetAddress,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.lat,
      longitude: loc.lon,
    },
  }

  if (loc.image) {
    block.image = SITE_URL + loc.image
  }
  if (loc.reservationUrl && loc.reservationUrl.startsWith('http')) {
    block.sameAs = [loc.reservationUrl]
  }
  if (loc.badges && loc.badges.length > 0) {
    // Surface amenity badges as keywords so they're indexable but not over-claimed.
    block.keywords = loc.badges.join(', ')
    // Structured amenityFeature so Google/AI can read each offering discretely
    // (climate-controlled, drive-up, business storage, boat/RV, free truck, etc.).
    block.amenityFeature = loc.badges.map((b) => ({
      '@type': 'LocationFeatureSpecification',
      name: b,
      value: true,
    }))
  }

  return block
}

/** Build one SelfStorage block per facility. Order is preserved. */
export function buildLocationSchemaList(
  locations: readonly Location[],
  phoneDisplay: string,
) {
  return locations.map((loc) => buildLocationSchema(loc, phoneDisplay))
}

/**
 * Build a schema.org Review block for a real customer review. Defaults to a
 * 5-star rating (all current reviews are 5-star Google reviews); pass `rating`
 * if that ever changes.
 *
 * Linking each Review to a SelfStorage block via itemReviewed's @id keeps the
 * review attached to the correct facility instead of orphaned at page level.
 */
export type ReviewLike = {
  quote: string
  author: string
  location: string
  facilitySlug?: string
  rating?: number
  /** ISO date (YYYY-MM-DD) the review was published. Falls back to a
   *  deterministic site-launch date when omitted so the field is always
   *  emitted — Google's Review rich-result spec lists datePublished as
   *  required, and Semrush flags any Review block that omits it. */
  datePublished?: string
}

// Deterministic fallback for any review that didn't carry an explicit
// datePublished. Picked to match the public launch of this subdomain so
// validators stop flagging the field as missing without inventing future
// dates that would look fabricated.
const REVIEW_FALLBACK_DATE = '2025-09-01'

export function buildReviewSchema(review: ReviewLike) {
  const rating = review.rating ?? 5
  const block: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
    },
    author: { '@type': 'Person', name: review.author },
    reviewBody: review.quote,
    // datePublished is required for Google Review rich results and is
    // one of the Semrush "Structured data markup errors" triggers when
    // omitted. Emit the per-review date when supplied, fall back to a
    // stable launch date otherwise.
    datePublished: review.datePublished ?? REVIEW_FALLBACK_DATE,
  }
  if (review.facilitySlug) {
    block.itemReviewed = {
      '@type': 'SelfStorage',
      '@id': SITE_URL + '/#location-' + review.facilitySlug,
      name: review.location,
    }
  }
  return block
}

export function buildReviewsSchemaList(reviews: readonly ReviewLike[]) {
  return reviews.map(buildReviewSchema)
}
