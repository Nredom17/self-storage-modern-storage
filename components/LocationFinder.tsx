'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LOCATIONS, LOCATION_FILTERS } from '@/lib/site'

export default function LocationFinder() {
  const [activeFilter, setActiveFilter] = useState<string>('All Arkansas')

  const filtered =
    activeFilter === 'All Arkansas'
      ? LOCATIONS
      : LOCATIONS.filter((l) => l.region === activeFilter)

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {LOCATION_FILTERS.map((region) => {
          const isActive = activeFilter === region
          return (
            <button
              key={region}
              type="button"
              onClick={() => setActiveFilter(region)}
              className={`text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-modern-red text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-modern-red hover:text-white'
              }`}
              aria-pressed={isActive}
            >
              {region}
            </button>
          )
        })}
      </div>

      {/* Map placeholder */}
      <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal via-gray-800 to-charcoal border border-gray-200 mb-10">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="w-12 h-12 rounded-full bg-modern-red flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="font-black text-white text-lg">Interactive Arkansas map</p>
          <p className="text-gray-400 text-sm mt-1">10 Modern Storage locations across the state</p>
        </div>
        {/* Decorative map pins */}
        <span className="absolute top-[28%] left-[22%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
        <span className="absolute top-[20%] left-[28%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
        <span className="absolute top-[34%] left-[26%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
        <span className="absolute top-[58%] left-[48%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
        <span className="absolute top-[64%] left-[52%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
        <span className="absolute top-[60%] left-[56%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
        <span className="absolute top-[68%] left-[60%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
        <span className="absolute top-[72%] left-[44%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
        <span className="absolute top-[78%] left-[52%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
        <span className="absolute top-[80%] left-[64%] w-3 h-3 rounded-full bg-modern-red shadow-lg ring-4 ring-modern-red/30" aria-hidden="true" />
      </div>

      {/* Location cards */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No locations match this filter yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((loc) => (
            <article
              key={loc.name}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-gray-100">
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
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-black text-charcoal text-lg leading-tight mb-2">{loc.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{loc.address}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {loc.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <a
                  href="#reserve"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                >
                  See Available Units
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
