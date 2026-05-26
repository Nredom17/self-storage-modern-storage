'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { NAV_TREE } from '@/lib/site'

export default function Header({
  phoneDisplay,
  phoneHref,
}: {
  phoneDisplay: string
  phoneHref: string
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Set<string>>(new Set())
  const navRef = useRef<HTMLElement | null>(null)

  // Close any open desktop dropdown on outside click / Escape.
  useEffect(() => {
    if (!openDropdown) return
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [openDropdown])

  function toggleMobileDropdown(label: string) {
    setMobileExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  function closeAll() {
    setMenuOpen(false)
    setOpenDropdown(null)
  }

  return (
    <header className="sticky top-0 z-50 bg-charcoal border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          title="Modern Storage® — Self Storage Units in Arkansas"
          className="shrink-0 leading-none"
          onClick={closeAll}
        >
          <span className="font-bebas text-modern-red text-2xl tracking-wide leading-none">
            MODERN STORAGE
            <sup className="text-[0.55em] font-bold -top-[0.6em] relative ml-0.5">®</sup>
          </span>
        </Link>

        {/* Desktop nav — visible at xl breakpoint and up */}
        <nav ref={navRef} className="hidden xl:flex items-center gap-0.5 flex-1 justify-end">
          {NAV_TREE.map((item) => {
            if (item.type === 'link') {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors whitespace-nowrap"
                  onClick={() => setOpenDropdown(null)}
                >
                  {item.label}
                </Link>
              )
            }

            const isOpen = openDropdown === item.label
            return (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  className={`text-sm font-semibold px-3 py-2 rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap ${
                    isOpen ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    role="menu"
                    aria-label={item.label}
                    className="absolute left-0 top-full mt-2 w-64 bg-charcoal border border-white/10 rounded-xl shadow-2xl py-2 z-50"
                  >
                    {item.items.map((sub) =>
                      sub.external ? (
                        <a
                          key={sub.label + sub.href}
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <span>{sub.label}</span>
                          <svg
                            className="w-3 h-3 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          key={sub.label + sub.href}
                          href={sub.href}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {/* Right side — phone + red CTA */}
          <a
            href={phoneHref}
            className="ml-2 text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors whitespace-nowrap"
            onClick={() => setOpenDropdown(null)}
          >
            Call {phoneDisplay}
          </a>
          <Link
            href="/locations"
            className="ml-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2 rounded-full transition-colors whitespace-nowrap"
            onClick={() => setOpenDropdown(null)}
          >
            Find a Unit Near You
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="xl:hidden p-2 text-gray-300 hover:text-white transition-colors"
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
        <div className="xl:hidden bg-charcoal border-t border-white/10 px-4 py-4 flex flex-col gap-0.5 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {NAV_TREE.map((item) => {
            if (item.type === 'link') {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeAll}
                  className="text-sm font-semibold text-gray-200 hover:text-white px-3 py-3 rounded-md hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </Link>
              )
            }

            const isExpanded = mobileExpanded.has(item.label)
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => toggleMobileDropdown(item.label)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between text-sm font-semibold text-gray-200 hover:text-white px-3 py-3 rounded-md hover:bg-white/10 transition-colors"
                >
                  <span>{item.label}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="pl-3 mt-0.5 mb-2 border-l-2 border-modern-red/40 ml-3">
                    {item.items.map((sub) =>
                      sub.external ? (
                        <a
                          key={sub.label + sub.href}
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeAll}
                          className="flex items-center justify-between text-sm font-medium text-gray-300 hover:text-white px-3 py-2.5 rounded-md hover:bg-white/10 transition-colors"
                        >
                          <span>{sub.label}</span>
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          key={sub.label + sub.href}
                          href={sub.href}
                          onClick={closeAll}
                          className="block text-sm font-medium text-gray-300 hover:text-white px-3 py-2.5 rounded-md hover:bg-white/10 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            )
          })}
          <div className="h-px bg-white/10 my-2" aria-hidden="true" />
          <a
            href={phoneHref}
            onClick={closeAll}
            className="text-sm font-semibold text-gray-200 hover:text-white px-3 py-3 rounded-md hover:bg-white/10 transition-colors"
          >
            Call {phoneDisplay}
          </a>
          <Link
            href="/locations"
            onClick={closeAll}
            className="mt-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-3 rounded-full transition-colors text-center"
          >
            Find a Unit Near You
          </Link>
        </div>
      )}
    </header>
  )
}
