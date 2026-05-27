import Link from 'next/link'
import { LOCATIONS as ALL_LOCATIONS, STORAGE_OPTION_LINKS } from '@/lib/site'

const STORAGE_OPTIONS = STORAGE_OPTION_LINKS

// Footer "Locations" column. Each entry links directly to the facility's own
// reservation URL on modernstorage.com — no more generic /#locations anchor.
// The display order and labels here are footer-specific (e.g., the
// Shackleford facility shows as just "Little Rock" because that's how
// customers in central AR search for it). Hrefs come from each LOCATIONS
// entry's reservationUrl so we keep a single source of truth.
const FOOTER_LOCATION_SPEC: Array<{ slug: string; label: string }> = [
  { slug: 'west-little-rock', label: 'West Little Rock' },
  { slug: 'shackleford', label: 'Little Rock' },
  { slug: 'north-little-rock', label: 'North Little Rock' },
  { slug: 'riverdale', label: 'Riverdale' },
  { slug: 'bentonville', label: 'Bentonville' },
  { slug: 'maumelle', label: 'Maumelle' },
  { slug: 'springdale', label: 'Springdale' },
  { slug: 'hot-springs', label: 'Hot Springs' },
  { slug: 'bryant', label: 'Bryant' },
  { slug: 'lowell', label: 'Lowell' },
]

const LOCATIONS: Array<{ label: string; href: string }> = FOOTER_LOCATION_SPEC.flatMap(
  (entry) => {
    const loc = ALL_LOCATIONS.find((l) => l.slug === entry.slug)
    return loc ? [{ label: entry.label, href: loc.reservationUrl }] : []
  },
)

const RESOURCES = [
  { label: 'AI Storage Size Finder', href: '/ai-storage-size-finder' },
  { label: 'Move-In Checklist', href: '/move-in-checklist' },
  { label: 'Free Moving Truck', href: '/free-moving-truck' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Storage Tips', href: 'https://www.modernstorage.com/blog' },
]

// Long-tail authority pages — surfaced in the footer so they’re not
// orphans. Each links into the main location pages it serves.
const GUIDES = [
  { label: 'Walmart Vendor Storage', href: '/storage-for-walmart-vendors' },
  { label: 'Storage Near Beaver Lake', href: '/storage-near-beaver-lake' },
  { label: 'Contractor Storage — Little Rock', href: '/contractor-storage-little-rock' },
  { label: 'Climate-Controlled & AR Humidity', href: '/climate-controlled-arkansas-humidity' },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/modern.storage' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@modernstorage' },
  { label: 'Facebook', href: 'https://www.facebook.com/modernstorage' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/modern-storage' },
  { label: 'YouTube', href: 'https://www.youtube.com/@modernstorage' },
]

export default function Footer({
  phoneDisplay,
  phoneHref,
}: {
  phoneDisplay: string
  phoneHref: string
}) {
  const PHONE_NUMBER_DISPLAY = phoneDisplay
  const PHONE_NUMBER_HREF = phoneHref
  return (
    <footer className="bg-charcoal text-white border-t border-white/10 mt-20">
      {/* Top CTA strip */}
      <div className="border-b border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-black text-white">Ready to find your storage unit?</p>
            <p className="text-sm text-gray-400 mt-0.5">Reserve online in minutes or talk to our team.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#locations"
              className="bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
            >
              Find a Unit Near You
            </Link>
            <a
              href={PHONE_NUMBER_HREF}
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-white/20"
            >
              Call {PHONE_NUMBER_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-5 leading-none">
              <span className="font-bebas text-modern-red text-2xl tracking-wide leading-none">
                MODERN STORAGE<sup className="text-[0.55em] font-bold -top-[0.6em] relative ml-0.5">®</sup>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Clean, convenient self-storage units across Arkansas — climate-controlled, household, business, boat, RV, and vehicle storage.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-5">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-modern-red transition-colors font-medium"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Storage Options */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Storage Options</h2>
            <nav className="flex flex-col gap-3">
              {STORAGE_OPTIONS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Locations — each links directly to the facility's reservation page */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Locations</h2>
            <nav className="flex flex-col gap-3">
              {LOCATIONS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  aria-label={`Reserve at Modern Storage® ${label}`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Resources</h2>
            <nav className="flex flex-col gap-3">
              {RESOURCES.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Contact</h2>
            <nav className="flex flex-col gap-3">
              <a
                href={PHONE_NUMBER_HREF}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {PHONE_NUMBER_DISPLAY}
              </a>
              <Link
                href="/#locations"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Reserve online
              </Link>
              <a
                href="https://www.modernstorage.com/payonline"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Pay bill
              </a>
            </nav>
          </div>
        </div>

        {/* Storage Guides — long-tail authority pages. Surfaced in the
            footer so they’re not orphans and so the link equity from the
            sitewide nav reaches them on every page. */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Storage Guides</h2>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {GUIDES.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Modern Storage®. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Self-storage facilities serving Arkansas.
          </p>
        </div>
      </div>
    </footer>
  )
}
