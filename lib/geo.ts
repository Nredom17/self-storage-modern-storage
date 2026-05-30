import type { Location } from '@/lib/data'

/**
 * Great-circle distance between two lat/lon points using Haversine.
 * Returns miles (Earth radius = 3958.8 mi).
 */
export function distanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 3958.8
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export type GeocodeResult = {
  lat: number
  lon: number
  displayName: string
}

// Cache geocoding lookups in localStorage to be a polite Nominatim citizen +
// give returning visitors instant results. Cache is keyed by normalized query.
const CACHE_KEY = 'modernstorage:geocode-v1'
const CACHE_MAX = 200

type CacheEntry = { ts: number; result: GeocodeResult }

function readCache(): Record<string, CacheEntry> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(CACHE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function writeCache(cache: Record<string, CacheEntry>) {
  if (typeof window === 'undefined') return
  try {
    // Evict oldest if we exceed cap.
    const entries = Object.entries(cache)
    if (entries.length > CACHE_MAX) {
      entries.sort((a, b) => b[1].ts - a[1].ts)
      const trimmed = Object.fromEntries(entries.slice(0, CACHE_MAX))
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(trimmed))
    } else {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
    }
  } catch {
    // Storage full or disabled — fall back to no cache, not an error.
  }
}

function normalize(query: string) {
  return query.trim().toLowerCase().replace(/\s+/g, ' ')
}

/**
 * Geocode a free-text query (ZIP, address, or city) to lat/lon.
 *
 * Uses OpenStreetMap's Nominatim service — free, no API key required, but
 * rate-limited (~1 req/sec). We cache successful lookups in localStorage so
 * repeat searches are instant and we minimize external calls.
 *
 * Returns null on failure (no results, network error, etc.) — caller should
 * surface a friendly message rather than throwing.
 */
export async function geocode(query: string): Promise<GeocodeResult | null> {
  const norm = normalize(query)
  if (!norm) return null

  const cache = readCache()
  const cached = cache[norm]
  if (cached) return cached.result

  // Bias toward Arkansas: bounded viewbox covers the state, but we don't
  // strictly enforce it (a Memphis ZIP should still resolve).
  const url =
    'https://nominatim.openstreetmap.org/search?' +
    new URLSearchParams({
      q: norm,
      format: 'json',
      addressdetails: '0',
      limit: '1',
      countrycodes: 'us',
      viewbox: '-94.62,36.5,-89.65,33.02', // AR bounding box
      bounded: '0',
      'accept-language': 'en',
    }).toString()

  try {
    const res = await fetch(url, {
      // Nominatim docs request a Referer or User-Agent; browsers send Referer
      // automatically. Adding accept-language as well.
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const json = (await res.json()) as { lat: string; lon: string; display_name: string }[]
    if (!Array.isArray(json) || json.length === 0) return null

    const top = json[0]
    const result: GeocodeResult = {
      lat: parseFloat(top.lat),
      lon: parseFloat(top.lon),
      displayName: top.display_name,
    }

    // Persist to cache
    cache[norm] = { ts: Date.now(), result }
    writeCache(cache)

    return result
  } catch {
    return null
  }
}

export type LocationWithDistance<T extends { lat: number; lon: number }> = T & {
  distanceMiles: number
}

/**
 * Sort locations by distance from a reference point. Adds a `distanceMiles`
 * field to each entry. Original array is not mutated.
 */
export function sortByDistance<T extends { lat: number; lon: number }>(
  locations: readonly T[],
  refLat: number,
  refLon: number,
): LocationWithDistance<T>[] {
  return locations
    .map((loc) => ({
      ...loc,
      distanceMiles: distanceMiles(refLat, refLon, loc.lat, loc.lon),
    }))
    .sort((a, b) => a.distanceMiles - b.distanceMiles)
}

/** Format a mile distance for human reading. */
export function formatMiles(miles: number): string {
  if (miles < 0.1) return '< 0.1 mi'
  if (miles < 10) return miles.toFixed(1) + ' mi'
  return Math.round(miles) + ' mi'
}

/**
 * Build a Google Maps directions deep link for a Modern Storage® facility.
 *
 * Uses the facility's real street address (not approximate lat/lon) — Google's
 * geocoder maps street addresses to the actual building entrance, while
 * approximate coords often resolve to a nearby civic landmark like City Hall.
 *
 * Placeholders ([Street address placeholder] / [ZIP]) are skipped so the URL
 * stays meaningful even before launch-final data lands.
 */
export function buildDirectionsUrl(loc: {
  name?: string
  streetAddress?: string | null
  city?: string
  state?: string
  zip?: string | null
}): string {
  const isPlaceholder = (s: string | null | undefined): boolean =>
    !s || s.includes('[')

  const parts: string[] = []
  if (loc.name) parts.push(loc.name)
  if (!isPlaceholder(loc.streetAddress)) parts.push(loc.streetAddress as string)
  if (loc.city && loc.state) {
    const zip = !isPlaceholder(loc.zip) ? ` ${loc.zip}` : ''
    parts.push(`${loc.city}, ${loc.state}${zip}`)
  }
  const destination = parts.join(', ')
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`
}

/** Browser geolocation as a Promise. Throws if denied/unavailable. */
export function getBrowserLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not available in this browser.'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 10_000 },
    )
  })
}

// Re-export the Location type so callers don't need a separate import.
export type { Location }
