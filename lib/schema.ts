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
