import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Lazy-init: only create the client if both env vars are present at build/runtime.
// All consumers must null-check; pages fall back to hardcoded data when this is null.
let _client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
  if (!url || !anonKey) return null
  if (!_client) {
    _client = createClient(url, anonKey, {
      auth: { persistSession: false },
      global: { headers: { 'x-application-name': 'modernstorage-self-storage' } },
    })
  }
  return _client
}

export const isSupabaseConfigured = Boolean(url && anonKey)

// Schema types — mirror the SQL migration in supabase/migrations/0001_init.sql.
export type DbLocation = {
  slug: string
  name: string
  city: string
  state: string
  zip: string | null
  region: string
  street_address: string | null
  phone: string | null
  lat: number
  lon: number
  image: string | null
  alt: string | null
  badges: string[]
  reservation_url: string | null
  sort_order: number
  active: boolean
  updated_at: string
}

export type DbSiteSettings = {
  id: number
  phone_display: string | null
  phone_href: string | null
  reservation_url: string | null
  updated_at: string
}
