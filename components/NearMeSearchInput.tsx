'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

/**
 * Compact ZIP / address input for the Locations dropdown. On submit, navigates
 * to /locations?near=<query> — the /locations page handles the geocode + sort.
 */
export default function NearMeSearchInput({ onSubmit }: { onSubmit?: () => void }) {
  const [value, setValue] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    router.push(`/locations?near=${encodeURIComponent(trimmed)}`)
    onSubmit?.()
  }

  return (
    <form onSubmit={handleSubmit} className="px-3 pb-2 pt-1" role="search" aria-label="Find storage near you">
      <label
        htmlFor="locations-dropdown-near-input"
        className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5"
      >
        Find Storage Near You
      </label>
      <div className="flex items-stretch gap-1.5">
        <input
          id="locations-dropdown-near-input"
          type="text"
          inputMode="text"
          autoComplete="postal-code"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ZIP or address"
          aria-label="ZIP code or address"
          className="flex-1 min-w-0 text-sm font-semibold text-charcoal bg-gray-50 border border-gray-200 rounded-md px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-modern-red focus:border-modern-red"
        />
        <button
          type="submit"
          aria-label="Search for nearest Modern Storage® locations"
          className="shrink-0 bg-modern-red hover:bg-modern-red-hover text-white px-3 rounded-md transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  )
}
