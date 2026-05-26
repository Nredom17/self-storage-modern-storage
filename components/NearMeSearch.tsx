'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  geocode,
  getBrowserLocation,
  sortByDistance,
  formatMiles,
  type LocationWithDistance,
} from '@/lib/geo'
import type { Location } from '@/lib/data'

type State =
  | { kind: 'idle' }
  | { kind: 'loading'; query: string }
  | { kind: 'results'; query: string; from: string; results: LocationWithDistance<Location>[] }
  | { kind: 'error'; query: string; message: string }

export default function NearMeSearch({ locations }: { locations: Location[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState('')
  const [state, setState] = useState<State>({ kind: 'idle' })
  const ranInitialSearch = useRef(false)

  // Run search via Nominatim, set state.
  async function runSearch(query: string) {
    setState({ kind: 'loading', query })
    const geo = await geocode(query)
    if (!geo) {
      setState({
        kind: 'error',
        query,
        message: 'We could not find that location. Try a 5-digit ZIP or a city name.',
      })
      return
    }
    const sorted = sortByDistance(locations, geo.lat, geo.lon)
    setState({ kind: 'results', query, from: geo.displayName, results: sorted })
  }

  async function runBrowserLocation() {
    setState({ kind: 'loading', query: 'Your location' })
    try {
      const pos = await getBrowserLocation()
      const sorted = sortByDistance(locations, pos.lat, pos.lon)
      setState({ kind: 'results', query: 'Your location', from: 'Your current location', results: sorted })
      // Update URL with a sentinel so it's bookmarkable
      router.replace(`/locations?near=here`, { scroll: false })
    } catch (err) {
      const msg =
        err instanceof GeolocationPositionError && err.code === err.PERMISSION_DENIED
          ? 'Location permission was denied. Type a ZIP or address instead.'
          : 'Could not read your location. Type a ZIP or address instead.'
      setState({ kind: 'error', query: 'Your location', message: msg })
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    router.replace(`/locations?near=${encodeURIComponent(trimmed)}`, { scroll: false })
    runSearch(trimmed)
  }

  // Run search automatically if URL has ?near= on mount.
  useEffect(() => {
    if (ranInitialSearch.current) return
    ranInitialSearch.current = true
    const initial = searchParams?.get('near')
    if (!initial) return
    if (initial === 'here') {
      runBrowserLocation()
    } else {
      setValue(initial)
      runSearch(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
      <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
        Find Storage Near You
      </p>
      <h2 className="text-2xl sm:text-3xl font-black text-charcoal tracking-tight mb-2">
        Enter your ZIP or address
      </h2>
      <p className="text-gray-600 leading-relaxed mb-5">
        We&apos;ll sort our 10 Arkansas locations by distance from your search point.
      </p>

      <form onSubmit={handleSubmit} role="search" aria-label="Find Modern Storage® locations near you" className="flex flex-col sm:flex-row gap-3">
        <input
          id="locations-near-search"
          type="text"
          inputMode="text"
          autoComplete="postal-code"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. 72205 or 3400 S Shackleford Rd"
          aria-label="ZIP code or address"
          className="flex-1 min-w-0 text-base font-semibold text-charcoal bg-gray-50 border border-gray-200 rounded-full px-5 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-modern-red focus:border-modern-red"
        />
        <button
          type="submit"
          className="bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap inline-flex items-center justify-center gap-2"
        >
          Search
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={runBrowserLocation}
          aria-label="Use my current location to find nearest Modern Storage®"
          className="bg-gray-100 hover:bg-gray-200 text-charcoal font-bold px-5 py-3 rounded-full transition-colors text-sm whitespace-nowrap inline-flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 text-modern-red" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Use my location
        </button>
      </form>

      {/* States */}
      {state.kind === 'loading' && (
        <p className="mt-5 text-sm font-semibold text-gray-500" aria-live="polite">
          Finding closest locations to {state.query}…
        </p>
      )}

      {state.kind === 'error' && (
        <div
          role="alert"
          className="mt-5 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-charcoal"
        >
          <p className="font-bold text-modern-red mb-1">Couldn&apos;t locate that spot.</p>
          <p className="text-charcoal/80">{state.message}</p>
        </div>
      )}

      {state.kind === 'results' && state.results.length > 0 && (
        <div className="mt-7" aria-live="polite">
          <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
            Closest Modern Storage® locations to{' '}
            <span className="text-charcoal">{state.from}</span>
          </p>
          <ol className="space-y-2">
            {state.results.slice(0, 5).map((loc, idx) => (
              <li
                key={loc.slug}
                className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 border border-gray-100 transition-colors"
              >
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                    idx === 0 ? 'bg-modern-red text-white' : 'bg-white border border-gray-200 text-charcoal'
                  }`}
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="block font-black text-charcoal text-sm leading-tight hover:text-modern-red transition-colors"
                  >
                    {loc.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {loc.streetAddress}, {loc.city}, {loc.state} {loc.zip}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-black text-charcoal text-sm">{formatMiles(loc.distanceMiles)}</p>
                  <a
                    href={loc.reservationUrl}
                    aria-label={`See available units at ${loc.name}`}
                    className="text-xs font-bold text-modern-red hover:text-modern-red-hover transition-colors"
                  >
                    See Units →
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
