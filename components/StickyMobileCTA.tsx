'use client'

// Mobile-only sticky bottom CTA bar.
//
// Behavior:
//   * Hidden by default until the user has scrolled past the hero
//     (~300px down). Avoids appearing immediately on page load and
//     covering hero content.
//   * Hide-on-scroll-down: when the user is reading and scrolling
//     down through content, the bar slides out of the way.
//   * Show-on-scroll-up: when the user reverses direction (signaling
//     intent to navigate or take action), the bar slides back in.
//   * Hide-when-near-bottom: when the user has scrolled within ~200px
//     of the document end, the bar hides. That avoids double-stacking
//     with the existing red CTA section at the bottom of every page.
//   * Mobile-only (lg:hidden) — desktop already has the header CTA +
//     in-page CTAs visible.
//   * Respects safe-area-inset-bottom for iPhone home-indicator area.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Phone, MapPin } from 'lucide-react'

export default function StickyMobileCTA({
  phoneDisplay,
  phoneHref,
}: {
  phoneDisplay: string
  phoneHref: string
}) {
  const [visible, setVisible] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    function update() {
      const currentY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight

      // Show only after the user has scrolled past the hero (~300px).
      const pastHero = currentY > 300

      // Hide when within 200px of the document bottom — the final red
      // CTA section is rendered there on most pages, so the sticky bar
      // and that CTA shouldn't double-stack.
      const nearBottom = currentY + viewportHeight > docHeight - 200

      // Scroll direction. Treat tiny movements as no-change so jitter
      // doesn't toggle the bar.
      const delta = currentY - lastScrollY.current
      const scrollingUp = delta < -2
      const scrollingDown = delta > 2

      if (!pastHero || nearBottom) {
        setVisible(false)
      } else if (scrollingUp) {
        setVisible(true)
      } else if (scrollingDown) {
        setVisible(false)
      }
      // If delta is within the dead-zone (-2 to 2), leave visibility
      // unchanged — prevents flicker on small touch-scroll adjustments.

      lastScrollY.current = currentY
      ticking.current = false
    }

    function onScroll() {
      // requestAnimationFrame throttle — runs at most once per frame.
      if (!ticking.current) {
        window.requestAnimationFrame(update)
        ticking.current = true
      }
    }

    // Set initial scroll baseline so first scroll event computes a
    // meaningful delta.
    lastScrollY.current = window.scrollY

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // aria-hidden + visibility-driven pointer-events keeps the offscreen
  // bar from being focusable or clickable by accessibility tools when
  // it's not visible.
  return (
    <div
      role="region"
      aria-label="Quick actions"
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden bg-charcoal/95 backdrop-blur-sm border-t border-white/10 shadow-[0_-8px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-2 gap-2 px-3 pt-3">
        <a
          href={phoneHref}
          aria-label={`Call for New Rentals at ${phoneDisplay}`}
          className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold py-3.5 rounded-full border border-white/20 transition-colors text-sm"
        >
          <Phone className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
          Call
        </a>
        <Link
          href="/locations"
          aria-label="Find a Modern Storage® unit near you"
          className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover active:bg-modern-red-hover text-white font-black py-3.5 rounded-full transition-colors text-sm"
        >
          <MapPin className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
          Find a Unit
        </Link>
      </div>
    </div>
  )
}
