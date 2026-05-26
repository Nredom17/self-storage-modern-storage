'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { Location } from '@/lib/data'

// Leaflet uses DOM globals; load only on the client.
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] sm:h-[420px] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Loading map…</p>
    </div>
  ),
})

/**
 * Single-pin embedded map for a /locations/[slug] page.
 *
 * Wraps MapClient with a 1-element locations array and the selectedSlug
 * pre-set so the popup is open by default. No filter chips, no card grid.
 */
export default function LocationMap({ location }: { location: Location }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(location.slug)

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-gray-200"
      role="region"
      aria-label={`Map of ${location.name}`}
    >
      <MapClient
        locations={[location]}
        selectedSlug={selectedSlug}
        onPinClick={(slug) => setSelectedSlug(slug)}
        onPopupClose={() => setSelectedSlug(null)}
      />
    </div>
  )
}
