'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NAV_LINKS, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_HREF } from '@/lib/site'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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
            MODERN STORAGE® Self Storage
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
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
