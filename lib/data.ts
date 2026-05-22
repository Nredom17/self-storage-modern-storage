import { getSupabaseClient, type DbLocation } from '@/lib/supabase'
import {
  LOCATIONS as STATIC_LOCATIONS,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_HREF,
  RESERVATION_URL,
} from '@/lib/site'

// Common Location shape — wide enough for both static literals (lib/site.ts) and
// Supabase rows. Components import this, not the readonly tuple type from lib/site.
export type Location = {
  slug: string
  name: string
  city: string
  state: string
  zip: string
  region: string
  streetAddress: string
  phone: string
  lat: number
  lon: number
  image: string
  alt: string
  badges: readonly string[]
  reservationUrl: string
}

export type SiteSettings = {
  phoneDisplay: string
  phoneHref: string
  reservationUrl: string
}

const STATIC_SETTINGS: SiteSettings = {
  phoneDisplay: PHONE_NUMBER_DISPLAY,
  phoneHref: PHONE_NUMBER_HREF,
  reservationUrl: RESERVATION_URL,
}

function mapDbLocation(row: DbLocation): Location {
  return {
    slug: row.slug,
    name: row.name,
    city: row.city,
    state: row.state,
    zip: row.zip ?? '[ZIP]',
    region: row.region,
    streetAddress: row.street_address ?? '[Street address placeholder]',
    phone: row.phone ?? PHONE_NUMBER_DISPLAY,
    lat: row.lat,
    lon: row.lon,
    image: row.image ?? '',
    alt: row.alt ?? '',
    badges: row.badges ?? [],
    reservationUrl: row.reservation_url ?? RESERVATION_URL,
  }
}

/** Fetch active locations from Supabase, falling back to the hardcoded array. */
export async function getLocations(): Promise<Location[]> {
  const client = getSupabaseClient()
  if (!client) return STATIC_LOCATIONS as unknown as Location[]

  try {
    const { data, error } = await client
      .from('locations')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return STATIC_LOCATIONS as unknown as Location[]
    }
    return (data as DbLocation[]).map(mapDbLocation)
  } catch {
    return STATIC_LOCATIONS as unknown as Location[]
  }
}

/** Fetch sitewide settings (phone, central reservation URL), falling back to static. */
export async function getSiteSettings(): Promise<SiteSettings> {
  const client = getSupabaseClient()
  if (!client) return STATIC_SETTINGS

  try {
    const { data, error } = await client
      .from('site_settings')
      .select('phone_display, phone_href, reservation_url')
      .eq('id', 1)
      .maybeSingle()

    if (error || !data) return STATIC_SETTINGS

    return {
      phoneDisplay: data.phone_display ?? STATIC_SETTINGS.phoneDisplay,
      phoneHref: data.phone_href ?? STATIC_SETTINGS.phoneHref,
      reservationUrl: data.reservation_url ?? STATIC_SETTINGS.reservationUrl,
    }
  } catch {
    return STATIC_SETTINGS
  }
}
