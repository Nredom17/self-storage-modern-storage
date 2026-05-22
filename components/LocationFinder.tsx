'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  LOCATIONS,
  LOCATION_FILTERS,
  AR_BOUNDS,
  ARKANSAS_OUTLINE_PATH,
  ARKANSAS_VIEWBOX,
} from '@/lib/site'

type Location = (typeof LOCATIONS)[number]

function project(lat: number, lon: number) {
  const xPct = ((lon - AR_BOUNDS.west) / (AR_BOUNDS.east - AR_BOUNDS.west)) * 100
  const yPct = ((AR_BOUNDS.north - lat) / (AR_BOUNDS.north - AR_BOUNDS.south)) * 100
  return { xPct, yPct }
}

export default function LocationFinder({
  highlightBadge,
  requireBadge,
}: {
  highlightBadge?: string
  requireBadge?: string
} = {}) {
  const [activeFilter, setActiveFilter] = useState<string>('All Arkansas')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const cardRefs = useRef<Record<string, HTMLElement | null>>({})
  const mapWrapRef = useRef<HTMLDivElement | null>(null)

  const base = requireBadge
    ? LOCATIONS.filter((l) => (l.badges as readonly string[]).includes(requireBadge))
    : LOCATIONS

  const filtered: Location[] =
    activeFilter === 'All Arkansas' ? [...base] : base.filter((l) => l.region === activeFilter)

  const selectedLoc = selectedSlug ? filtered.find((l) => l.slug === selectedSlug) ?? null : null

  // Scroll the matching card into view when a pin is selected.
  useEffect(() => {
    if (!selectedSlug) return
    const el = cardRefs.current[selectedSlug]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedSlug])

  // Reset selection when the filter chip changes if the selected slug is no longer visible.
  useEffect(() => {
    if (selectedSlug && !filtered.some((l) => l.slug === selectedSlug)) {
      setSelectedSlug(null)
    }
  }, [activeFilter, filtered, selectedSlug])

  // Close popup on Escape.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSlug(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div>
      {/* Filter chips — horizontally scrollable on mobile */}
      <div className="-mx-6 px-6 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide mb-8" role="tablist" aria-label="Filter locations by region">
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
                    ? 'bg-modern-red text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-modern-red hover:text-white'
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
        ref={mapWrapRef}
        className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal via-gray-900 to-charcoal border border-gray-200 mb-10"
        style={{ aspectRatio: `${ARKANSAS_VIEWBOX.w} / ${ARKANSAS_VIEWBOX.h}` }}
        role="region"
        aria-label="Map of Modern Storage locations in Arkansas"
      >
        {/* SVG: faint grid + Arkansas outline */}
        <svg
          viewBox={`0 0 ${ARKANSAS_VIEWBOX.w} ${ARKANSAS_VIEWBOX.h}`}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="ar-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="ar-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(246,0,1,0.05)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#ar-grid)" />
          <path
            d={ARKANSAS_OUTLINE_PATH}
            fill="url(#ar-fill)"
            stroke="rgba(246,0,1,0.45)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* State label, top-left */}
        <span
          aria-hidden="true"
          className="absolute top-3 left-4 font-bebas text-white/40 text-lg leading-none tracking-wider"
        >
          Arkansas
        </span>

        {/* Legend, bottom-right */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-modern-red" />
          Modern Storage location
        </span>

        {/* Pins — HTML buttons absolutely positioned over the SVG */}
        {filtered.map((loc) => {
          const { xPct, yPct } = project(loc.lat, loc.lon)
          const isSelected = selectedSlug === loc.slug
          return (
            <button
              key={loc.slug}
              type="button"
              aria-label={`${loc.name} in ${loc.city}, Arkansas`}
              aria-pressed={isSelected}
              onClick={() => setSelectedSlug(isSelected ? null : loc.slug)}
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal transition-transform ${
                isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-110'
              }`}
            >
              <span className="sr-only">
                {loc.name} in {loc.city}
              </span>
              {/* Pin dot */}
              <span
                aria-hidden="true"
                className={`relative block rounded-full shadow-lg ring-4 transition-all ${
                  isSelected
                    ? 'w-4 h-4 bg-white ring-modern-red/70'
                    : 'w-2.5 h-2.5 bg-modern-red ring-modern-red/30 group-hover:ring-modern-red/50'
                }`}
              >
                {isSelected && (
                  <span className="absolute inset-0 rounded-full bg-modern-red animate-ping opacity-60" />
                )}
              </span>
            </button>
          )
        })}

        {/* Popup card */}
        {selectedLoc &&
          (() => {
            const { xPct, yPct } = project(selectedLoc.lat, selectedLoc.lon)
            const popupAbove = yPct > 55
            const clampedX = Math.min(Math.max(xPct, 20), 80)
            return (
              <div
                role="dialog"
                aria-label={`${selectedLoc.name} details`}
                style={{
                  left: `${clampedX}%`,
                  top: popupAbove ? undefined : `calc(${yPct}% + 16px)`,
                  bottom: popupAbove ? `calc(${100 - yPct}% + 16px)` : undefined,
                  transform: 'translateX(-50%)',
                }}
                className="absolute z-30 w-60 sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-4"
              >
                <button
                  type="button"
                  onClick={() => setSelectedSlug(null)}
                  aria-label="Close location details"
                  className="absolute top-2 right-2 w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-modern-red"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <p className="text-[10px] font-black uppercase tracking-widest text-modern-red mb-1">
                  {selectedLoc.city}
                </p>
                <h3 className="font-black text-charcoal text-sm leading-tight mb-3 pr-6">
                  {selectedLoc.name.replace('Modern Storage — ', '')}
                </h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedLoc.badges.slice(0, 3).map((b) => (
                    <span
                      key={b}
                      className="text-[9px] font-bold uppercase tracking-wide bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <a
                  href={selectedLoc.reservationUrl}
                  className="block w-full text-center bg-modern-red hover:bg-modern-red-hover text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors"
                >
                  See Available Units
                </a>
              </div>
            )
          })()}
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
                  aria-label={`Highlight ${loc.name} on the map`}
                  className="relative aspect-[16/10] bg-gray-100 block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-modern-red focus-visible:ring-inset"
                >
                  <Image
                    src={loc.image}
                    alt={`${loc.name} self-storage facility`}
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
                  <h3 className="font-black text-charcoal text-lg leading-tight mb-2">{loc.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{loc.address}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {loc.badges.map((badge) => {
                      const isHighlighted = highlightBadge && badge === highlightBadge
                      return (
                        <span
                          key={badge}
                          className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                            isHighlighted
                              ? 'bg-modern-red text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {badge}
                        </span>
                      )
                    })}
                  </div>
                  <a
                    href={loc.reservationUrl}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                  >
                    See Available Units
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
