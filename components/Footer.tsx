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
  { label: 'Storage Prices', href: '/pricing' },
  { label: 'AI Storage Size Finder', href: '/ai-storage-size-finder' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'Move-In Checklist', href: '/move-in-checklist' },
  { label: 'Free Moving Truck', href: '/free-moving-truck' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Storage Tips', href: 'https://www.modernstorage.com/blog' },
]

// Long-tail authority pages — surfaced in the footer so they’re not
// orphans. Each links into the main location pages it serves.
// Organized into 4 SEO clusters for clearer topical grouping and
// scannability. Render order in the footer matches array order.
const GUIDES_GROUPS = [
  {
    heading: 'Apartment & Moving',
    links: [
      { label: 'Apartment Storage', href: '/guides/apartment-storage' },
      { label: 'Storage During a Move', href: '/guides/moving-storage' },
      { label: 'Storage Near Fayetteville', href: '/storage-near-fayetteville' },
    ],
  },
  {
    heading: 'Business & Contractor',
    links: [
      { label: 'Supplier & Business — Bentonville', href: '/business-storage-bentonville' },
      { label: 'Contractor Storage — Little Rock', href: '/contractor-storage-little-rock' },
    ],
  },
  {
    heading: 'Lake & Boat Storage',
    links: [
      { label: 'Storage Near Beaver Lake', href: '/storage-near-beaver-lake' },
      { label: 'Storage Near Table Rock Lake', href: '/storage-near-table-rock-lake' },
      { label: 'Storage Near Lake Hamilton', href: '/storage-near-lake-hamilton' },
      { label: 'Storage Near Lake Ouachita', href: '/storage-near-lake-ouachita' },
      { label: 'Storage Near Greers Ferry Lake', href: '/storage-near-greers-ferry-lake' },
      { label: 'Boat Storage Near Hot Springs', href: '/boat-storage-near-hot-springs' },
      { label: 'RV & Boat Storage in NWA', href: '/rv-boat-storage-northwest-arkansas' },
    ],
  },
  {
    heading: 'Climate & Seasonal',
    links: [
      { label: 'Climate-Controlled & AR Humidity', href: '/climate-controlled-arkansas-humidity' },
    ],
  },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/modern.storage', icon: 'instagram' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@modernstorage', icon: 'tiktok' },
  { label: 'Facebook', href: 'https://www.facebook.com/modernstorage', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/modern-storage', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://www.youtube.com/@modernstorage', icon: 'youtube' },
] as const

// Brand glyphs as single-path SVGs (currentColor-filled, so they inherit the
// link's red text color). TikTok isn't in lucide-react, so all five use inline
// brand paths for a consistent solid-glyph look.
const SOCIAL_ICON_PATHS: Record<string, string> = {
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  tiktok:
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  facebook:
    'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
}

function SocialIcon({ name, className }: { name: string; className?: string }) {
  const d = SOCIAL_ICON_PATHS[name]
  if (!d) return null
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

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
              New Rentals: {PHONE_NUMBER_DISPLAY}
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
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Modern Storage® on ${label}`}
                  className="inline-flex items-center gap-2 text-sm text-modern-red hover:text-modern-red-hover transition-colors font-semibold"
                >
                  <SocialIcon name={icon} className="w-5 h-5 shrink-0" />
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

        {/* Storage Guides — long-tail authority pages, grouped into 4
            SEO clusters. 4 columns on lg+, 2 on sm-md, single column
            on mobile. Each cluster shows a small uppercase header so
            scanning is fast. "All Guides" link sits below as a single
            sweep to the curated hub. */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500">Storage Guides</h2>
            <Link
              href="/guides"
              className="text-xs font-bold text-modern-red hover:text-white transition-colors"
            >
              All guides →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {GUIDES_GROUPS.map((group) => (
              <div key={group.heading}>
                <p className="text-[10px] font-black uppercase tracking-widest text-modern-red mb-3">
                  {group.heading}
                </p>
                <nav className="flex flex-col gap-2">
                  {group.links.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-sm text-gray-400 hover:text-white transition-colors leading-snug"
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
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
