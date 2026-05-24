'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS, STORAGE_OPTION_LINKS } from '@/lib/site'

export default function Header({
  phoneDisplay,
  phoneHref,
}: {
  phoneDisplay: string
  phoneHref: string
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [storageOpen, setStorageOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const PHONE_NUMBER_DISPLAY = phoneDisplay
  const PHONE_NUMBER_HREF = phoneHref

  // Close the desktop dropdown on outside click / Esc.
  useEffect(() => {
    if (!storageOpen) return
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setStorageOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setStorageOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [storageOpen])

  return (
    <header className="sticky top-0 z-50 bg-charcoal border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link
          href="/"
          title="Modern Storage® — Self Storage Units in Arkansas"
          className="shrink-0 leading-none"
        >
          <span className="font-bebas text-modern-red text-2xl tracking-wide leading-none">
            MODERN STORAGE<sup className="text-[0.55em] font-bold -top-[0.6em] relative ml-0.5">®</sup>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Storage Options dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setStorageOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={storageOpen}
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
            >
              Storage Options
              <svg
                className={`w-3.5 h-3.5 transition-transform ${storageOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {storageOpen && (
              <div
                role="menu"
                aria-label="Storage Options"
                className="absolute left-0 top-full mt-2 w-64 bg-charcoal border border-white/10 rounded-xl shadow-2xl py-2 z-50"
              >
                {STORAGE_OPTION_LINKS.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    onClick={() => setStorageOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href={PHONE_NUMBER_HREF}
            className="ml-2 text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Call {PHONE_NUMBER_DISPLAY}
          </a>
          <Link
            href="/#locations"
            className="ml-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2 rounded-full transition-colors whitespace-nowrap"
          >
            Find a Unit Near You
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-charcoal border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-3 pt-2 pb-1">
            Storage Options
          </p>
          {STORAGE_OPTION_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2.5 rounded-md hover:bg-white/10 transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" aria-hidden="true" />
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2.5 rounded-md hover:bg-white/10 transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href={PHONE_NUMBER_HREF}
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2.5 rounded-md hover:bg-white/10 transition-colors"
          >
            Call {PHONE_NUMBER_DISPLAY}
          </a>
          <Link
            href="/#locations"
            onClick={() => setMenuOpen(false)}
            className="mt-3 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors text-center"
          >
            Find a Unit Near You
          </Link>
        </div>
      )}
    </header>
  )
}
