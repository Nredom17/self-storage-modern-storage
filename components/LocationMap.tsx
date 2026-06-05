'use client'

import dynamic from 'next/dynamic'
import type { Location } from '@/lib/data'

// Leaflet uses DOM globals; load only on the client.
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[260px] sm:h-[300px] lg:h-[360px] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Loading map…</p>
    </div>
  ),
})

/**
 * Single-pin embedded map for a /locations/[slug] page.
 *
 * Wraps MapClient with a 1-element locations array and selectedSlug
 * pre-set so the pin renders in the highlighted (larger) state. The
 * Leaflet on-map popup was removed 2026-06-05 — facility detail on
 * the [slug] page already lives directly above and below this map
 * (NAP block in the hero, full info section under it), so the popup
 * was redundant. The pin is non-interactive on this page; pinClick
 * is a no-op so the click target still satisfies map a11y but doesn't
 * change visible state.
 */
export default function LocationMap({ location }: { location: Location }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-gray-200"
      role="region"
      aria-label={`Map of ${location.name}`}
    >
      <MapClient
        locations={[location]}
        selectedSlug={location.slug}
        onPinClick={() => {}}
      />
    </div>
  )
}
