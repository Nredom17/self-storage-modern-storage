import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import {
  SITE_URL,
  THEME_PAGES,
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
    images: [{ url: HERO_IMAGE, width: 1600, height: 900, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description:
      '10 Arkansas self-storage locations — climate-controlled, household, business, boat, RV, and vehicle storage with a free moving truck.',
    images: [HERO_IMAGE],
  },
}

// 5 homepage FAQs — AEO-optimized, paired with the Why Choose icons
const HOME_FAQS_5 = [
  {
    q: 'What storage unit sizes do you offer?',
    a: 'Modern Storage offers 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 units, plus vehicle, boat, and RV parking. A 5x5 holds closet overflow, a 10x10 fits a one-bedroom apartment, and a 10x20 or 10x30 handles a full home or business inventory.',
  },
  {
    q: 'Are your units climate-controlled?',
    a: 'Yes. Climate-controlled units are available at select Modern Storage locations across Arkansas to protect furniture, electronics, documents, and other temperature-sensitive items from heat and humidity.',
  },
  {
    q: 'Can I rent a storage unit online?',
    a: 'Yes. You can compare sizes, choose climate-controlled or drive-up, and reserve a unit online in minutes. Some rentals may require ID, payment, or signed documents before gate access.',
  },
  {
    q: 'Do you offer a free moving truck?',
    a: 'Yes. A free moving truck is included with qualifying new rentals at participating Modern Storage locations. Availability, mileage, and terms vary by location.',
  },
  {
    q: 'Where are your Arkansas locations?',
    a: 'Modern Storage has 10 locations across the Little Rock metro (Little Rock, North Little Rock, Maumelle, Bryant) and Northwest Arkansas (Bentonville, Springdale, Lowell), plus Hot Springs.',
  },
]

// Why Choose icons and links
const WHY_FEATURES = [
  {
    label: 'Climate-Controlled',
    href: '/climate-controlled',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
      </svg>
    ),
  },
  {
    label: 'Smart-Lock Access',
    href: '/business-storage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    label: 'Free Moving Truck',
    href: '/free-moving-truck',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Business Storage',
    href: '/business-storage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    label: 'Secure Facilities',
    href: '/household-storage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'Online Rentals',
    href: '/household-storage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
]

const FEATURED_RESOURCES = [
  { title: 'Storage Unit Size Guide', desc: 'Find the right unit for your belongings.', href: '/household-storage' },
  { title: 'Climate-Controlled Storage Guide', desc: 'What it protects and when you need it.', href: '/climate-controlled' },
  { title: 'Business Storage Solutions', desc: 'Storage for contractors, inventory, and records.', href: '/business-storage' },
  { title: 'Modern Storage® Unpacked Podcast', desc: 'Nationally ranked self-storage industry podcast.', href: 'https://podcast.modernstorage.com', external: true },
]

function buildJsonLd(locations: Awaited<ReturnType<typeof getLocations>>, phoneDisplay: string) {
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS_5.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const selfStorage = {
    '@context': 'https://schema.org',
    '@type': 'SelfStorage',
    name: 'Modern Storage',
    url: SITE_URL,
    areaServed: 'Arkansas',
    numberOfLocations: 10,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Climate-controlled units', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Smart-lock access', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Gated & surveilled', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free moving truck', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Month-to-month rentals', value: true },
    ],
  }

  const offer = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: 'Free Moving Truck with New Rentals',
    description: 'A free moving truck is included with qualifying new rentals at participating Modern Storage locations in Arkansas.',
    seller: { '@type': 'SelfStorage', name: 'Modern Storage' },
    areaServed: 'Arkansas',
  }

  return [faqPage, selfStorage, offer, ...buildLocationSchemaList(locations, phoneDisplay)]
}

export default async function HomePage() {
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()])
  const jsonLd = buildJsonLd(locations, settings.phoneDisplay)

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── 1. HERO ───────────────────────────────────────────── */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">

            {/* Block A — badge + audience buttons + headline + subhead + trust signals */}
            <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 lg:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                10 Locations
              </span>

              {/* Audience split — DO NOT MERGE these two buttons.
                  Tenant Support routes existing tenants away from the
                  sales line. Rent a Unit dials the centralized sales number. */}
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

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4 lg:mb-5">
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

            {/* Block B — Hero image */}
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

            {/* Block C — Primary CTA */}
            <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#locations"
                  className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  Find a Unit Near You
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="#storage-types"
                  className="hidden lg:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors border border-white/20 text-sm"
                >
                  View Storage Options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SEARCH BY LOCATION ─────────────────────────────── */}
      <section id="locations" className="bg-gray-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Find Storage Near You</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              10 Arkansas Locations
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Modern Storage&#174; serves Central Arkansas and Northwest Arkansas. Use the map or filter by region to find your nearest location.
            </p>
          </div>
          <LocationFinder locations={locations} />
        </div>
      </section>

      {/* ── 3. WHY CHOOSE ─────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why Us</p>
            <h2 className="text-3xl font-black text-charcoal tracking-tight">
              Why Choose Modern Storage&#174;
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {WHY_FEATURES.map((f) => (
              <Link
                key={f.label}
                href={f.href}
                className="group flex flex-col items-center text-center gap-3 bg-gray-50 rounded-2xl px-4 py-6 border border-gray-100 hover:border-modern-red hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center group-hover:bg-modern-red group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <span className="text-sm font-black text-charcoal group-hover:text-modern-red transition-colors leading-tight">
                  {f.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. STORAGE TYPES ──────────────────────────────────── */}
      <section id="storage-types" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Storage Types</p>
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

      {/* ── 5. REVIEWS ────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Customer Reviews</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              What Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((r) => (
              <figure
                key={r.author + r.location}
                className="bg-white rounded-2xl p-7 border border-gray-200 flex flex-col"
              >
                <div className="flex items-center gap-1 mb-5 text-modern-red" aria-label="5 out of 5 stars">
                  {[0,1,2,3,4].map((i) => (
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

      {/* ── 6. FEATURED RESOURCES ─────────────────────────────── */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Resources</p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-3">
                Learn Before You Rent
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Storage guides, size tools, and the Modern Storage&#174; Unpacked podcast &mdash; free resources to help you make the right decision.
              </p>
            </div>
            <Link href="/guides" className="text-sm font-bold text-modern-red hover:text-modern-red-hover transition-colors whitespace-nowrap">
              Browse All Resources &#8594;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_RESOURCES.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-modern-red hover:shadow-md transition-all flex flex-col"
              >
                <h3 className="text-sm font-black text-charcoal group-hover:text-modern-red transition-colors mb-2 leading-tight">{r.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{r.desc}</p>
                <span className="text-xs font-black text-modern-red inline-flex items-center gap-1">
                  Learn more
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. ABOUT ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">About Modern Storage&#174;</p>
          <h2 className="text-3xl font-black text-charcoal tracking-tight mb-6">
            Arkansas&#39; Self-Storage Company
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Modern Storage&#174; operates 10 self-storage locations across central and Northwest Arkansas, offering climate-controlled, household, business, boat, RV, and vehicle storage. We focus on clean, secure, well-maintained facilities with month-to-month rentals, online reservations, smart-lock access, and a free moving truck with new rentals at participating locations.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Whether you&#39;re moving, downsizing, storing seasonal gear, or managing business inventory, we make storage simple &mdash; reserve online in minutes or find the location nearest you.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-modern-red font-bold hover:text-modern-red-hover transition-colors"
          >
            Learn More about Modern Storage&#174; &#8594;
          </Link>
        </div>
      </section>

      {/* ── 8. FAQ ────────────────────────────────────────────── */}
      <section id="faq" className="bg-white py-12 lg:py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqAccordion items={HOME_FAQS_5} />
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

      {/* ── 9. FINAL CTA ──────────────────────────────────────── */}
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
              aria-label="Existing customers — manage your Modern Storage account"
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
