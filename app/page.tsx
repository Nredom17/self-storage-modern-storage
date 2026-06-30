import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, type LucideIcon } from 'lucide-react'
import {
  SITE_URL,
  THEME_PAGES,
  UNIT_SIZES,
  WHY_US,
  HOME_FAQS,
  REVIEWS,
} from '@/lib/site'
import { getLocations, getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'
import LocationFinder from '@/components/LocationFinder'
import { buildLocationSchemaList, buildReviewsSchemaList } from '@/lib/schema'

export const revalidate = 60

const HERO_IMAGE = '/images/modern-storage-springdale-best-of-the-best-awards.png'
const HERO_ALT =
  'Modern Storage® Springdale facility with Best of the Best Self-Storage Awards 2023, 2024, 2025 winner and Best of Northwest Arkansas award seals'

const HOME_TITLE = 'Self Storage in Arkansas — 10 Locations | Modern Storage®'

export const metadata: Metadata = {
  title: HOME_TITLE,
  description:
    'Modern Storage® — 10 Arkansas self-storage locations with climate-controlled units, household storage, boat and RV parking, business storage, and a free moving truck with new rentals.',
  alternates: {
    canonical: SITE_URL + '/',
  },
  openGraph: {
    title: HOME_TITLE,
    description:
      'Modern Storage® operates 10 self-storage locations across Arkansas with climate-controlled, household, business, boat, RV, and vehicle storage — plus a free moving truck with new rentals.',
    url: SITE_URL + '/',
    siteName: 'Modern Storage®',
    type: 'website',
    images: [
      {
        url: HERO_IMAGE,
        width: 1600,
        height: 900,
        alt: HERO_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description:
      '10 Arkansas self-storage locations — climate-controlled, household, business, boat, RV, and vehicle storage with a free moving truck.',
    images: [HERO_IMAGE],
  },
}

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + '/#service',
    name: 'Self Storage in Arkansas',
    serviceType: 'Self Storage',
    description:
      'Modern Storage® operates 10 self-storage facilities across Arkansas with climate-controlled, household, business, boat, RV, and vehicle storage.',
    provider: { '@id': SITE_URL + '/#organization' },
    areaServed: { '@type': 'State', name: 'Arkansas' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Self Storage Options',
      itemListElement: THEME_PAGES.map((p) => ({
        '@type': 'Offer',
        url: SITE_URL + p.href,
        itemOffered: { '@type': 'Service', name: p.title, description: p.description },
      })),
    },
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [service, faqPage]
}

// Unique SVG icons for each WHY_US card (matches order in lib/site.ts)
const WHY_ICONS = [
  // Clean, well-kept facilities
  <svg key="clean" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>,
  // Climate-controlled
  <svg key="climate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
  </svg>,
  // Free moving truck
  <svg key="truck" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>,
  // Online reservations
  <svg key="online" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>,
  // Month-to-month
  <svg key="calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>,
  // Boat, RV, vehicle
  <svg key="rv" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-3"/><circle cx="9" cy="17" r="2"/><circle cx="20" cy="17" r="2"/>
  </svg>,
  // Business storage
  <svg key="business" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>,
  // Multiple locations
  <svg key="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
  </svg>,
]


const BUSINESS_TYPES = [
  { icon: '📦', label: 'E-Commerce & Retail' },
  { icon: '🔨', label: 'Contractors & Trades' },
  { icon: '🏥', label: 'Medical & Healthcare' },
  { icon: '📂', label: 'Office Records & Files' },
  { icon: '🔵', label: 'Inventory Management' },
  { icon: '🏪', label: 'Small Business Storage' },
]

const RESOURCES = [
  {
    icon: '📚',
    title: 'Storage Guides',
    body: '30+ expert guides covering unit sizes, climate control, moving, vehicle storage, and more.',
    href: '/guides',
    cta: 'Browse All Guides',
  },
  {
    icon: '🧩',
    title: 'Unit Size Calculator',
    body: 'Not sure what size you need? Our interactive size guide helps you find the right unit.',
    href: '/household-storage',
    cta: 'Find My Size',
  },
  {
    icon: '🎤',
    title: 'Modern Storage® Unpacked',
    body: 'A nationally ranked self-storage podcast covering industry trends, real estate, and operations.',
    href: 'https://podcast.modernstorage.com',
    cta: 'Listen Now',
    external: true,
  },
  {
    icon: '▶️',
    title: 'Storage Videos',
    body: 'Video walkthroughs, storage tips, and facility tours across our Arkansas locations.',
    href: '/guides',
    cta: 'Watch Videos',
  },
  {
    icon: '🚚',
    title: 'Moving Tips & Checklist',
    body: 'Step-by-step moving and packing guides to make your next move easier.',
    href: '/guides',
    cta: 'Read Moving Tips',
  },
]

export default async function HomePage() {
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()])
  const jsonLd = [
    ...buildJsonLd(),
    ...buildLocationSchemaList(locations, settings.phoneDisplay),
    ...buildReviewsSchemaList(REVIEWS),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">
            {/* Header text */}
            <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 lg:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                10 Locations
              </span>
              {/* Audience-split buttons above H1 — Tenant Support (white) routes existing
                  customers to the self-storage portal so they don't call the sales line.
                  Rent a Unit (red) dials the centralized sales number for new customers. */}
              <div className="flex flex-wrap gap-3 mb-5 lg:mb-6">
                <a
                  href="https://www.modernstorage.com/self-storage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tenant Support — manage your account at modernstorage.com"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-charcoal font-bold px-5 py-2.5 rounded-full transition-colors text-sm shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.949.684V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5z" />
                  </svg>
                  Tenant Support
                </a>
                <a
                  href={settings.phoneHref}
                  aria-label={`Rent a Unit — call ${settings.phoneDisplay}`}
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-5 py-2.5 rounded-full transition-colors text-sm shadow-md"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                  </svg>
                  Rent a Unit
                </a>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4 lg:mb-6">
                Self Storage in <span className="text-modern-red">Arkansas</span>
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-xl mb-5">
                Clean, secure storage units across Arkansas. Climate-controlled, drive-up, vehicle, and business storage available. Reserve online in minutes.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="flex items-center gap-1.5 text-sm text-gray-400">
                  <span className="text-yellow-400 tracking-tight">★★★★★</span> Google Reviews
                </span>
                <span className="text-white/20" aria-hidden="true">·</span>
                <span className="text-sm text-gray-400">Arkansas Owned</span>
                <span className="text-white/20" aria-hidden="true">·</span>
                <span className="text-sm text-gray-400">Award-Winning</span>
              </div>
            </div>

            {/* Hero image */}
            <figure className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] lg:aspect-[4/3] bg-gray-800 relative">
                <Image
                  src={HERO_IMAGE}
                  alt={HERO_ALT}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>

            {/* Trust signals below headline */}
            <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2">
              <ul className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white">
                <li className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-modern-red shrink-0" strokeWidth={2} aria-hidden="true" />
                  <span>10 Arkansas locations</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-modern-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Gated &amp; monitored 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-modern-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                  </svg>
                  <span>Climate-controlled available</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-modern-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/>
                  </svg>
                  <span>Month-to-month rentals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* ── STORAGE SOLUTIONS ─────────────────────────────────── */}
      <section id="storage-options" className="bg-white py-12 lg:py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Storage Solutions</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Choose the Right Storage Option
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              From climate-controlled household storage to boat, RV, and business storage &mdash; find the option built for what you need to store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {THEME_PAGES.map((opt) => (
              <Link
                key={opt.slug}
                href={opt.href}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-modern-red hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                  <Image
                    src={opt.image}
                    alt={opt.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black text-charcoal group-hover:text-modern-red transition-colors mb-3 tracking-tight">
                    {opt.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">{opt.description}</p>
                  <span className="inline-flex items-center gap-2 text-modern-red text-sm font-black">
                    {opt.cta}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ──────────────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Customer Reviews</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              What Customers Say About Modern Storage&#174;
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <figure
                key={r.author + r.location}
                className="bg-white rounded-2xl p-7 border border-gray-200 flex flex-col hover:border-modern-red hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-1 mb-5 text-modern-red" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.286 3.957c.3.922-.755 1.688-1.54 1.118l-3.367-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.784.57-1.838-.196-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-charcoal leading-relaxed mb-6 flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-black text-charcoal text-sm">{r.author}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.location}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-modern-red mt-2">{r.theme}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ARKANSAS CHOOSES MODERN STORAGE ──────────────── */}
      <section className="bg-white py-12 lg:py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why Us</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Why Arkansas Chooses Modern Storage&#174;
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((item, i) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-modern-red hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center mb-4">
                  {WHY_ICONS[i] ?? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <h3 className="font-black text-charcoal mb-2 leading-tight">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIT SIZE GUIDE ───────────────────────────────────── */}
      <section id="size-guide" className="bg-gray-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Size Guide</p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                What Size Storage Unit Do I Need?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                A quick visual reference for the most popular Modern Storage&#174; unit sizes. Climate-controlled and drive-up units available in most sizes.
              </p>
            </div>
            <Link
              href="/household-storage"
              className="inline-flex items-center gap-2 text-sm font-bold text-modern-red hover:text-modern-red-hover transition-colors"
            >
              See full size guide &#8594;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {UNIT_SIZES.map((unit) => (
              <article
                key={unit.size}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bebas text-4xl text-charcoal leading-none">{unit.size}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                    Unit
                  </span>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Best for</p>
                <p className="text-base font-bold text-charcoal mb-4">{unit.bestFor}</p>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">What fits</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{unit.fits}</p>
                <Link
                  href="/household-storage"
                  className="inline-flex items-center gap-2 text-sm font-bold text-charcoal hover:text-modern-red transition-colors"
                >
                  Compare Unit Sizes
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 bg-charcoal text-white rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-black text-lg">Storing sensitive belongings?</p>
              <p className="text-sm text-gray-400 mt-1">
                Climate-controlled units protect electronics, photos, documents, and furniture from Arkansas temperature swings.
              </p>
            </div>
            <Link
              href="/climate-controlled"
              className="bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors whitespace-nowrap"
            >
              Climate-Controlled Storage &#8594;
            </Link>
          </div>
        </div>
      </section>

      {/* ── BUSINESS STORAGE ──────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">For Business</p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
                Business Storage Solutions
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Modern Storage&#174; serves businesses of all sizes across Arkansas. From inventory overflow to document archiving, our facilities offer flexible, accessible, and affordable solutions for businesses that need reliable storage.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {BUSINESS_TYPES.map((b) => (
                  <div key={b.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-sm font-bold text-charcoal">{b.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/business-storage"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  Business Storage Solutions
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="#locations"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  Find a Location
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
              <Image
                src="/images/modern-storage-business-storage-solutions.jpg"
                alt="Modern Storage Arkansas business storage solutions for contractors, retail, and inventory"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE MOVING TRUCK ─────────────────────────────────── */}
      <section id="moving-truck" className="bg-charcoal text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
                <Image
                  src="/images/modern-storage-free-moving-truck.jpg"
                  alt="Modern Storage&#174; Riverdale free moving truck available with new self-storage rentals at participating Arkansas locations"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Free Moving Truck</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-5">
                Move In Easier with a Free Moving Truck
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Modern Storage&#174; offers a free moving truck with new rentals at participating locations, making move-in simpler and saving customers another truck rental.
              </p>
              <p className="text-sm text-gray-500 italic mb-8">
                Availability, requirements, and location participation may vary.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/free-moving-truck"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  See Moving Truck Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="#locations"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors border border-white/20 text-sm"
                >
                  Find a Storage Unit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEARN BEFORE YOU RENT ─────────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Resource Center</p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Learn Before You Rent
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe informed customers make better decisions. Our library of free storage resources helps you choose the right unit, pack efficiently, and get the most from your storage rental.
              </p>
            </div>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm font-bold text-modern-red hover:text-modern-red-hover transition-colors whitespace-nowrap"
            >
              Browse All Resources &#8594;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {RESOURCES.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-md transition-all flex flex-col"
              >
                <span className="text-3xl mb-4 block">{r.icon}</span>
                <h3 className="text-sm font-black text-charcoal group-hover:text-modern-red transition-colors mb-2 leading-tight">{r.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{r.body}</p>
                <span className="text-xs font-black text-modern-red inline-flex items-center gap-1">
                  {r.cta}
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ─────────────────────────────────────────── */}
      <section id="locations" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Locations</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Find a Modern Storage&#174; Location Near You
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              10 Modern Storage&#174; facilities serving Central Arkansas and Northwest Arkansas. Filter by region to find the closest location.
            </p>
          </div>
          <LocationFinder locations={locations} />

          {/* Static locations directory for SEO */}
          <div className="mt-12 pt-10 border-t border-gray-200">
            <h3 className="text-sm font-black uppercase tracking-widest text-charcoal mb-2">
              All Modern Storage&#174; Arkansas Locations
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-3xl">
              Quick directory of every Modern Storage&#174; facility in Arkansas with street address and a direct page for unit sizes, amenities, and reservations.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              {locations.map((loc) => (
                <li key={loc.slug} className="text-sm leading-relaxed">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="font-bold text-charcoal hover:text-modern-red transition-colors"
                  >
                    {loc.name}
                  </Link>
                  <div className="text-gray-600 mt-0.5">
                    {loc.streetAddress}, {loc.city}, {loc.state} {loc.zip}
                  </div>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <a
                      href={`tel:+1${(loc.phone || settings.phoneDisplay).replace(/\D/g, '')}`}
                      aria-label={`Call ${loc.name} at ${loc.phone || settings.phoneDisplay}`}
                      className="inline-flex items-center gap-1.5 bg-charcoal hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                      </svg>
                      {loc.phone || settings.phoneDisplay}
                    </a>
                    <span className="text-xs text-gray-500">{loc.region}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section id="faq" className="bg-gray-50 py-12 lg:py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Frequently Asked Questions
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Self Storage Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Quick answers to help you get started &mdash; unit sizes, climate-controlled storage, pricing, online reservations, the free moving truck, and finding the nearest Modern Storage&#174; location in Arkansas.
            </p>
          </div>
          <FaqAccordion items={HOME_FAQS} />
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-modern-red hover:text-modern-red-hover font-bold transition-colors"
            >
              See all storage FAQs &#8594;
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section id="reserve" className="bg-modern-red py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Find Your Modern Storage&#174; Unit Today
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Choose a nearby location, compare available unit sizes, and reserve online in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#locations"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Find a Unit Near You
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={settings.phoneHref}
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
              </svg>
              Call to Rent a Unit
            </a>
            <a
              href="https://www.modernstorage.com/self-storage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Existing customers &mdash; manage your Modern Storage&#174; account"
              className="bg-gray-200 text-charcoal font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.949.684V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5z" />
              </svg>
              Tenant Support
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
