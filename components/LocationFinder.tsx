'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { LOCATION_FILTERS } from '@/lib/site'
import type { Location } from '@/lib/data'
import { getBadgeIcon } from '@/lib/badge-icons'

// Leaflet uses DOM globals; load only on the client.
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[360px] lg:h-[420px] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Loading map…</p>
    </div>
  ),
})

export default function LocationFinder({
  locations,
  highlightBadge,
  requireBadge,
}: {
  locations: Location[]
  highlightBadge?: string
  requireBadge?: string
}) {
  // Default to "All Arkansas" so the map opens with every facility pin
  // visible. Earlier we defaulted to the first specific region to make
  // the tabs read as interactive, but the design pass found that
  // landing on Little Rock implies the brand is Little Rock-only and
  // hides the Northwest Arkansas / Hot Springs / Bryant footprint.
  const [activeFilter, setActiveFilter] = useState<string>(LOCATION_FILTERS[0] ?? 'All Arkansas')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const cardRefs = useRef<Record<string, HTMLElement | null>>({})

  // Deep-link the filter via URL hash. Header nav uses /locations#little-rock-area
  // and /locations#northwest-arkansas — match those to the chip on mount and on
  // hashchange (so browser back/forward also activates the right chip).
  useEffect(() => {
    if (typeof window === 'undefined') return
    const applyHash = () => {
      const raw = window.location.hash.replace(/^#/, '').toLowerCase()
      if (!raw) return
      const matched = LOCATION_FILTERS.find(
        (r) => r.toLowerCase().replace(/\s+/g, '-') === raw,
      )
      if (matched) setActiveFilter(matched)
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const base = requireBadge
    ? locations.filter((l) => l.badges.includes(requireBadge))
    : locations

  const filtered: Location[] =
    activeFilter === 'All Arkansas' ? [...base] : base.filter((l) => l.region === activeFilter)

  // Scroll the matching card into view when a pin is selected.
  useEffect(() => {
    if (!selectedSlug) return
    const el = cardRefs.current[selectedSlug]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [selectedSlug])

  // Clear selection if it falls outside the new filter.
  useEffect(() => {
    if (selectedSlug && !filtered.some((l) => l.slug === selectedSlug)) {
      setSelectedSlug(null)
    }
  }, [activeFilter, filtered, selectedSlug])

  return (
    <div>
      {/* Pre-header — signals the chips are an action, not decoration */}
      <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
        Select your area
      </p>

      {/* Filter chips — horizontally scrollable on mobile. Unselected chips
          use a deeper gray (bg-gray-200 + text-charcoal) so they don't blend
          into the page background. */}
      <div
        className="-mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide mb-6"
        role="tablist"
        aria-label="Filter locations by region"
      >
        <div className="flex items-center gap-2 min-w-max">
          {LOCATION_FILTERS.map((region) => {
            const isActive = activeFilter === region
            return (
              <button
                key={region}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(region)}
                className={`text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-modern-red focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-modern-red text-white shadow-sm'
                    : 'bg-gray-200 text-charcoal hover:bg-modern-red hover:text-white'
                }`}
              >
                {region}
              </button>
            )
          })}
        </div>
      </div>

      {/* Map */}
      <div
        className="relative rounded-2xl overflow-hidden border border-gray-200 mb-10"
        role="region"
        aria-label="Interactive map of Modern Storage® locations in Arkansas"
      >
        <MapClient
          locations={filtered}
          selectedSlug={selectedSlug}
          onPinClick={(slug) => setSelectedSlug(slug)}
          onPopupClose={() => setSelectedSlug(null)}
        />
      </div>

      {/* Location cards */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No locations match this filter yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((loc) => {
            const isSelected = selectedSlug === loc.slug
            return (
              <article
                key={loc.slug}
                ref={(el) => {
                  cardRefs.current[loc.slug] = el
                }}
                aria-current={isSelected ? 'true' : undefined}
                className={`bg-white rounded-2xl overflow-hidden border transition-all flex flex-col scroll-mt-24 ${
                  isSelected
                    ? 'border-modern-red shadow-xl ring-2 ring-modern-red/40'
                    : 'border-gray-200 hover:border-modern-red hover:shadow-lg'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedSlug(isSelected ? null : loc.slug)}
                  aria-label={`Show ${loc.name} on the map`}
                  className="relative aspect-[16/10] bg-gray-100 block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-modern-red focus-visible:ring-inset"
                >
                  <Image
                    src={loc.image}
                    alt={loc.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-charcoal text-white px-2.5 py-1 rounded-full">
                    {loc.region}
                  </span>
                  {isSelected && (
                    <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest bg-modern-red text-white px-2.5 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      On Map
                    </span>
                  )}
                </button>
                <div className="p-6 flex flex-col flex-1">
                  {/* Facility name links to its local content page
                      (/locations/[slug]) — bespoke local copy, facility
                      FAQs, amenities, and its own Reserve CTA. Gives the
                      content pages internal link equity and lets shoppers
                      read local detail before converting. The red button
                      below still goes straight to live reservations. */}
                  <h3 className="font-black text-charcoal text-lg leading-tight mb-2">
                    <Link
                      href={`/locations/${loc.slug}`}
                      className="hover:text-modern-red transition-colors"
                    >
                      {loc.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{loc.streetAddress}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {loc.city}, {loc.state} {loc.zip}
                  </p>
                  {/* Tap-to-call: each card shows the facility's direct
                      phone. The tel: href dials that store, not the
                      central sales line. */}
                  <a
                    href={`tel:+1${loc.phone.replace(/\D/g, '')}`}
                    aria-label={`Call ${loc.name} at ${loc.phone}`}
                    className="inline-flex items-center gap-2 bg-charcoal hover:bg-black text-white text-sm font-bold px-4 py-2 rounded-full transition-colors mb-4 w-fit"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                    </svg>
                    {loc.phone}
                  </a>
                  {/* Amenities — icons only, spread horizontally. Per
                      Alexandra's direction (2026-06-05): text labels
                      were stacking the card vertically and added
                      visual noise; icons-only reads at a glance and
                      the title tooltip / aria-label still surfaces
                      the badge name for hover and screen readers.
                      Highlighted badge (when filtering by a specific
                      amenity) gets a charcoal background pill so the
                      filtered amenity stands out from the others. */}
                  <ul
                    className="flex flex-wrap items-center gap-3 mb-5"
                    aria-label={`Amenities at ${loc.name}`}
                  >
                    {loc.badges.map((badge) => {
                      const isHighlighted = highlightBadge && badge === highlightBadge
                      const Icon = getBadgeIcon(badge)
                      return (
                        <li key={badge}>
                          <span
                            title={badge}
                            aria-label={badge}
                            role="img"
                            className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                              isHighlighted
                                ? 'bg-modern-red text-white'
                                : 'bg-modern-red/10 text-modern-red'
                            }`}
                          >
                            <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                  {/* Dual CTA: primary reserves directly (fastest path
                      to convert); secondary opens the local content page
                      for shoppers who want details first. */}
                  <div className="mt-auto flex flex-col gap-2">
                    <a
                      href={loc.reservationUrl}
                      aria-label={`See available units at ${loc.name}`}
                      className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                    >
                      See Available Units
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <Link
                      href={`/locations/${loc.slug}`}
                      aria-label={`View location details for ${loc.name}`}
                      className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-charcoal/70 hover:text-modern-red transition-colors"
                    >
                      Location details
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
