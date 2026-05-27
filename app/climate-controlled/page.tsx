import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getLocations, getSiteSettings } from '@/lib/data'

// Re-render every 60s to pick up Supabase edits.
export const revalidate = 60
import {
  CLIMATE_UNIT_SIZES,
  CLIMATE_CONCEPTS,
  WHAT_TO_STORE,
  ARKANSAS_CLIMATE_CONTEXT,
  ARKANSAS_CLIMATE_STATS,
  DO_YOU_NEED_CLIMATE,
  COMPARISON_ROWS,
  BUSINESS_USE_CASES,
  TRUST_SIGNALS,
  CLIMATE_FAQS,
  CLIMATE_REVIEWS,
} from '@/lib/climate-controlled'
import FaqAccordion from '@/components/FaqAccordion'
import LocationFinder from '@/components/LocationFinder'
import WhatToStoreShowcase from '@/components/WhatToStoreShowcase'
import { buildLocationSchemaList, buildReviewsSchemaList } from '@/lib/schema'

const PAGE_PATH = '/climate-controlled'
const HERO_IMAGE = '/images/modern-storage-bentonville-climate-controlled-hallway.jpg'
const HERO_ALT =
  'Climate-controlled indoor storage hallway at Modern Storage® Bentonville — temperature-controlled storage units near you'
const INTERIOR_IMAGE = '/images/modern-storage-bentonville-climate-controlled-hallway.jpg'
const INTERIOR_ALT =
  'Indoor climate-controlled corridor with numbered storage unit doors at Modern Storage®'

export const metadata: Metadata = {
  title: {
    absolute: 'Climate-Controlled Storage Units Near You in Arkansas | Modern Storage®',
  },
  description:
    'Indoor, climate-controlled storage units near you — Little Rock, Bentonville, Bryant, Springdale, Lowell, Hot Springs, and more. Temperature-controlled storage protects furniture, electronics, mattresses, photos, and long-term storage at Modern Storage®.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Climate-Controlled Storage Units Near You in Arkansas | Modern Storage®',
    description:
      'Indoor temperature-controlled storage at Modern Storage® locations near Little Rock, Bentonville, Bryant, Hot Springs, Springdale, and more. Protection for furniture, electronics, photos, and long-term storage.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [
      {
        url: HERO_IMAGE,
        width: 1600,
        height: 1066,
        alt: HERO_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climate-Controlled Storage Units Near You in Arkansas | Modern Storage®',
    description:
      'Indoor temperature-controlled storage near you — Modern Storage® locations across the central and Northwest regions.',
    images: [HERO_IMAGE],
  },
}

const TRUST_BULLETS = [
  'Climate-controlled at most locations',
  'Indoor, gated, surveilled access',
  'Best of the Best Self-Storage Awards',
  'Month-to-month rentals',
  'Free moving truck with new rentals',
]

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Climate-Controlled Self Storage',
    name: 'Climate-Controlled Storage Units Near You in Arkansas',
    description:
      'Indoor, temperature-controlled self-storage units at Modern Storage® locations across Arkansas. Helps protect furniture, mattresses, electronics, documents, photos, instruments, wine, antiques, and business inventory from outdoor temperature and humidity extremes. Long-term storage and year-round indoor access.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    provider: {
      '@type': 'SelfStorage',
      name: 'Modern Storage®',
      url: SITE_URL + '/',
      telephone: phoneDisplay,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Climate-Controlled Unit Sizes',
      itemListElement: CLIMATE_UNIT_SIZES.map((u) => ({
        '@type': 'Offer',
        url: SITE_URL + PAGE_PATH + '#size-' + u.sizeSlug,
        itemOffered: {
          '@type': 'Service',
          name: `${u.size} Climate-Controlled Storage Unit`,
          description: u.bestFor + '. ' + u.climateNote,
        },
      })),
    },
  }

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_URL + PAGE_PATH + '#localbusiness',
    name: 'Modern Storage®',
    url: SITE_URL + '/',
    telephone: phoneDisplay,
    image: SITE_URL + HERO_IMAGE,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', addressRegion: 'AR', addressCountry: 'US' },
    areaServed: { '@type': 'State', name: 'Arkansas' },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Climate-Controlled Storage',
        item: SITE_URL + PAGE_PATH,
      },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CLIMATE_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [service, localBusiness, breadcrumb, faqPage]
}

function ConceptIcon({ title }: { title: string }) {
  const common = 'w-6 h-6'
  switch (title) {
    case 'Indoor access':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 21V5a2 2 0 012-2h8a2 2 0 012 2v16M3 21h18M14 12h.01" />
        </svg>
      )
    case 'A more stable storage environment':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'Buffer against Arkansas heat and cold swings':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 13V5a2 2 0 114 0v8a4 4 0 11-4 0z" />
        </svg>
      )
    case 'Security and monitoring':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        </svg>
      )
    case 'Ground-floor access':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 11h2M13 11h2" />
        </svg>
      )
    case 'Temperature range':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 14.76V5a2 2 0 10-4 0v9.76a4 4 0 104 0zM12 8v6" />
        </svg>
      )
    default:
      return null
  }
}

export default async function ClimateControlledPage() {
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()])
  const jsonLd = [
    ...buildJsonLd(settings.phoneDisplay),
    ...buildLocationSchemaList(locations, settings.phoneDisplay),
    ...buildReviewsSchemaList(CLIMATE_REVIEWS),
  ]
  const PHONE_NUMBER_DISPLAY = settings.phoneDisplay
  const PHONE_NUMBER_HREF = settings.phoneHref

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── HERO — repositioned with near-me intent ──────────── */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Climate-Controlled Storage</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Climate-Controlled Storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                <span className="text-modern-red">Climate-Controlled</span> Storage Units Near You
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
                Indoor, temperature-controlled storage units near Little Rock, Bentonville, Bryant, Springdale, Lowell, and Hot Springs. Built for furniture, mattresses, electronics, photos, instruments, wine, business inventory, and long-term storage of items that deserve real protection.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="#locations"
                  aria-label="Find climate-controlled storage near you at a Modern Storage® location"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Find Climate Storage Near Me
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="#sizes"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  Check Unit Availability
                </Link>
                <a
                  href={PHONE_NUMBER_HREF}
                  aria-label={`Call Modern Storage® at ${PHONE_NUMBER_DISPLAY}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                  </svg>
                  Call {PHONE_NUMBER_DISPLAY}
                </a>
              </div>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-gray-400">
                {TRUST_BULLETS.map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-modern-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
                <Image
                  src={HERO_IMAGE}
                  alt={HERO_ALT}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-modern-red text-white rounded-xl px-3.5 py-2.5 shadow-lg w-44 sm:w-52"
                  aria-label="Winner of the Best of the Best Self-Storage Awards by the Arkansas Democrat Gazette and Best of Northwest Arkansas"
                >
                  <p className="text-[9px] font-black uppercase tracking-wider text-red-100 leading-tight">
                    Best of the Best
                  </p>
                  <p className="text-base sm:text-lg font-black leading-none my-1.5">
                    Self-Storage Awards
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-tight text-red-100/90 leading-tight">
                    Arkansas Democrat Gazette
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-tight text-red-100/90 leading-tight">
                    & Best of Northwest Arkansas
                  </p>
                </div>
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Indoor climate-controlled storage hallway at a Modern Storage® facility — temperature-controlled storage units near you.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS STRIP — moved high per audit ─────────── */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST_SIGNALS.map((t) => (
              <div key={t.headline} className="text-center sm:text-left">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">
                  {t.headline}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT CLIMATE-CONTROLLED STORAGE MEANS ────────────── */}
      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                What climate-controlled storage means
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
                Indoor protection for the things that matter most
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Climate-controlled storage at Modern Storage® means an indoor storage unit inside an enclosed, insulated building — accessed from interior hallways rather than from outside. The building is designed to provide a more stable indoor environment than a standard outdoor drive-up unit, with year-round temperature management and reduced humidity exposure. The specifics vary slightly by facility, but the result is the same: a far better home for anything sensitive to Arkansas heat, cold, or moisture.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-100 relative">
                <Image
                  src={INTERIOR_IMAGE}
                  alt={INTERIOR_ALT}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLIMATE_CONCEPTS.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl p-6 border border-gray-200 transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center mb-4">
                  <ConceptIcon title={c.title} />
                </div>
                <h3 className="font-black text-charcoal mb-2 leading-tight">{c.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT BELONGS IN CLIMATE-CONTROLLED — expanded ──────── */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              What belongs in climate-controlled
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              18 Things to Store in Climate-Controlled
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              If it&apos;s sensitive to heat, cold, or humidity, it belongs in indoor climate-controlled storage. Arkansas weather is the reason — these are the 18 categories where it matters most for everyday households, collectors, and long-term storage.
            </p>
          </div>
          {/* Interactive showcase: tabs on the left, large image with
              dynamic overlay on the right. Replaces the previous dense
              18-card grid per UX feedback that the section was too
              text-heavy. Uses the existing real Bentonville climate-
              controlled hallway photo as the anchor visual. */}
          <WhatToStoreShowcase
            items={WHAT_TO_STORE}
            imageUrl={INTERIOR_IMAGE}
            imageAlt={INTERIOR_ALT}
          />
        </div>
      </section>

      {/* ── WHY CLIMATE MATTERS IN ARKANSAS — NEW ──────────────
          Regional topical authority section. Auditor: "this could
          become one of the strongest parts of the page." Humidity,
          heat indexes, mold risk, garage heat, attic temperatures. */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Why climate matters
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Why Climate-Controlled Storage Matters in Arkansas
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {ARKANSAS_CLIMATE_CONTEXT.intro}
            </p>
          </div>

          {/* Big-number stat band — pulls the strongest data out of the
              factor-card paragraph bodies into scannable visual anchors.
              2-col on mobile, 4-col on sm+. Mobile users now read the
              headline numbers in under 5 seconds before reaching the
              detail cards below. */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-10 lg:mb-12">
            {ARKANSAS_CLIMATE_STATS.map((s) => (
              <div
                key={s.label}
                className="bg-modern-red/5 border border-modern-red/20 rounded-2xl p-5 sm:p-6 text-center"
              >
                <p className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-modern-red leading-none mb-1.5">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-charcoal/80 leading-tight uppercase tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ARKANSAS_CLIMATE_CONTEXT.factors.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 transition-colors"
              >
                <h3 className="font-black text-charcoal mb-2 leading-tight">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DO YOU ACTUALLY NEED CLIMATE-CONTROLLED — NEW ──────
          Auditor: "This would crush SEO and AI search… deserves a
          full content section." Two clear lists for fast scanning. */}
      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Is it worth it?
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Do You Actually Need Climate-Controlled Storage?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The honest answer: it depends on what you&apos;re storing. Climate-controlled is the right call for sensitive belongings and long-term storage. Standard drive-up is fine for durable, garage-type items. Here&apos;s how to tell which is which.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Worth-it card */}
            <div className="bg-white border-2 border-modern-red rounded-2xl p-7 shadow-lg">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Climate-Controlled</p>
              <h3 className="text-xl font-black text-charcoal mb-5 leading-tight">
                {DO_YOU_NEED_CLIMATE.worthIt.title}
              </h3>
              <ul className="space-y-2.5">
                {DO_YOU_NEED_CLIMATE.worthIt.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-charcoal">
                    <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Drive-up-fine card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Standard Drive-Up</p>
              <h3 className="text-xl font-black text-charcoal mb-5 leading-tight">
                {DO_YOU_NEED_CLIMATE.driveUpFine.title}
              </h3>
              <ul className="space-y-2.5">
                {DO_YOU_NEED_CLIMATE.driveUpFine.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-charcoal">
                    <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE — NEW ──────────────────────────────
          Auditor: "This page BEGS for a comparison chart…
          improves featured snippets, AI extraction, conversion
          clarity, SEO depth." */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Side-by-side
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              Climate-Controlled vs. Standard Storage
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Both have a place. Here&apos;s a direct comparison of how indoor climate-controlled storage and outdoor drive-up storage differ — and which works better for which use cases.
            </p>
          </div>
          {/* Desktop (lg+): full 3-column table — side-by-side
              comparison reads cleanly at wide widths. Mobile hides
              this and renders the same data as a stacked 2-card
              comparison below — each column gets full width and
              becomes readable without horizontal squeeze. Same
              COMPARISON_ROWS source, no SEO duplication. */}
          <div className="hidden lg:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-white/10">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs text-gray-400">
                    Aspect
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs text-modern-red">
                    Climate-Controlled
                  </th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs text-gray-400">
                    Standard Drive-Up
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.aspect}>
                    <th scope="row" className="px-4 sm:px-6 py-4 font-semibold text-white align-top">
                      {row.aspect}
                    </th>
                    <td className="px-4 sm:px-6 py-4 text-white font-semibold align-top">
                      <span className="inline-flex items-start gap-2">
                        <svg className="w-4 h-4 text-modern-red shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{row.climate}</span>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-400 align-top">{row.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile (< lg): stacked card pair. Same data, full readable
              width per side, no horizontal scroll. */}
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {/* Climate-Controlled side — emphasized with red border */}
            <div className="bg-white/5 border-2 border-modern-red rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-modern-red px-5 py-3">
                <p className="text-xs font-black uppercase tracking-widest text-white">
                  Climate-Controlled
                </p>
              </div>
              <ul className="divide-y divide-white/10">
                {COMPARISON_ROWS.map((row) => (
                  <li key={row.aspect} className="px-5 py-3.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                      {row.aspect}
                    </p>
                    <p className="text-sm text-white font-semibold flex items-start gap-2">
                      <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{row.climate}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {/* Standard Drive-Up side — neutral border, secondary emphasis */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-white/10 px-5 py-3">
                <p className="text-xs font-black uppercase tracking-widest text-gray-300">
                  Standard Drive-Up
                </p>
              </div>
              <ul className="divide-y divide-white/10">
                {COMPARISON_ROWS.map((row) => (
                  <li key={row.aspect} className="px-5 py-3.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                      {row.aspect}
                    </p>
                    <p className="text-sm text-gray-300">{row.standard}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNIT SIZE GUIDE ──────────────────────────────────── */}
      <section id="sizes" className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Unit sizes</p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Climate-Controlled Unit Sizes
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Six indoor sizes designed for everything from a closet of paperwork to a whole-home move with year-round climate protection. Availability varies by location — reserve online and we&apos;ll match you to the right size and facility. Not sure which size? Try the{' '}
                <Link href="/ai-storage-size-finder" className="text-modern-red font-bold hover:underline">
                  AI Storage Size Finder
                </Link>
                {' '}for a personalized recommendation in under 30 seconds.
              </p>
            </div>
            <Link
              href="#locations"
              className="inline-flex items-center gap-2 text-sm font-bold text-modern-red hover:text-modern-red-hover transition-colors whitespace-nowrap"
            >
              Check availability near you →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CLIMATE_UNIT_SIZES.map((u) => (
              <article
                id={`size-${u.sizeSlug}`}
                key={u.size}
                className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-modern-red hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-charcoal text-white px-2.5 py-1 rounded-full">
                    Climate-Controlled
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="flex items-baseline gap-3 mb-5 flex-wrap">
                    <span className="font-bebas text-6xl lg:text-7xl text-charcoal leading-none">{u.size}</span>
                    <span className="text-sm font-bold text-charcoal/80 leading-tight">
                      Climate-Controlled Storage Unit
                    </span>
                  </h3>

                  <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Best for</p>
                  <p className="text-base font-bold text-charcoal mb-5">{u.bestFor}</p>

                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">What fits</p>
                  <ul className="space-y-1.5 mb-5">
                    {u.fits.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-gray-600">
                        <span className="text-modern-red font-black shrink-0">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-charcoal/80 leading-relaxed mb-6 border-l-2 border-modern-red pl-3 italic">
                    {u.climateNote}
                  </p>

                  <div className="mt-auto">
                    <Link
                      href="#locations"
                      aria-label={`Find a Modern Storage® location with a ${u.size} climate-controlled storage unit near you`}
                      className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-5 py-3 rounded-full transition-colors w-full"
                    >
                      Find a {u.size} Near You
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIMATE-CONTROLLED STORAGE FOR BUSINESSES — NEW ─────
          Now anchored by the commercial-storage-large-unit-interior
          photo on the left of an intro band, with the 8 use case
          cards rendered in a tighter 2-col mobile grid below.
          Previously: no imagery + 1-col card stack on mobile = 8
          tall stacked text cards. */}
      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          {/* Intro band: photo + heading + intro paragraph in 2 cols.
              On mobile, photo stacks above text. */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 lg:mb-12">
            <figure className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100 relative">
                <Image
                  src="/images/commercial-storage-large-unit-interior-modern-storage.png"
                  alt="Interior view of a Modern Storage® large commercial storage unit with corrugated steel walls and bright LED lighting — climate-controlled storage for business inventory and equipment"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                For businesses
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Climate-Controlled Storage for Businesses
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {BUSINESS_USE_CASES.intro} See the{' '}
                <Link href="/business-storage" className="text-modern-red font-bold hover:underline">
                  business storage page
                </Link>
                {' '}for the full picture, or pick a use case below.
              </p>
            </div>
          </div>

          {/* 8 use case cards in a denser 2-col grid on mobile
              (was 1-col previously = 8 tall stacked cards). Cards
              themselves unchanged — same SEO copy, same labels. */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {BUSINESS_USE_CASES.uses.map((u) => (
              <div
                key={u.label}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 transition-colors"
              >
                <h3 className="font-black text-charcoal text-sm sm:text-base mb-2 leading-tight">{u.label}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Customer reviews</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              What Climate-Controlled Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIMATE_REVIEWS.map((r) => (
              <figure
                key={r.author + r.location + r.theme}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-200 flex flex-col"
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
                <figcaption className="flex items-center gap-3 border-t border-gray-100 pt-5">
                  <div className="w-10 h-10 rounded-full bg-charcoal text-white font-black text-sm flex items-center justify-center shrink-0" aria-hidden="true">
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-black text-charcoal text-sm">{r.author}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.location}</p>
                  </div>
                  <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-modern-red text-right">
                    {r.theme}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS — moved DOWN per audit ─────────────────────
          Now lives below the topical authority content rather than
          dominating the top of the page. Customers reach it after
          understanding what climate-controlled is, what belongs,
          why it matters in Arkansas, and the comparison. */}
      <section id="locations" className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Nearby locations</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Find Climate-Controlled Storage Near You
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Most Modern Storage® locations offer indoor climate-controlled units. Customers searching for climate-controlled storage near me, indoor storage units near me, or temperature-controlled storage near me will find a Modern Storage® facility in most central and Northwest regions — including locations near Little Rock, Bentonville, Bryant, Springdale, Lowell, and Hot Springs. Filter the map, click a pin for details, and reserve online from the nearest facility.
            </p>
          </div>
          <LocationFinder locations={locations} highlightBadge="Climate-Controlled" requireBadge="Climate-Controlled" />
        </div>
      </section>

      {/* ── FAQ — expanded to 22 questions ───────────────────── */}
      <section id="faq" className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Climate-Controlled Storage FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              22 of the most common questions about indoor climate-controlled storage — temperatures, mold prevention, mattresses, electronics, vinyl, antiques, wine, instruments, long-term storage, business inventory, near-me availability, and more.
            </p>
          </div>
          <FaqAccordion items={CLIMATE_FAQS} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
                Reserve Indoor Climate-Controlled Storage Near You
              </h2>
              <p className="text-red-100 text-lg leading-relaxed mb-6">
                Choose a nearby Modern Storage® location, pick an indoor unit size, and reserve online in minutes. Participating locations offer a free moving truck with new rentals to make move-in easier.
              </p>
              <p className="text-red-100/80 text-xs italic mb-8 lg:mb-0">
                Availability, requirements, and free moving truck participation vary by location.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <Link
                href="#locations"
                className="bg-white text-modern-red font-black px-6 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
              >
                Find Climate Storage Near Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={PHONE_NUMBER_HREF}
                className="bg-white/10 text-white font-bold px-6 py-3.5 rounded-full hover:bg-white/20 transition-colors text-sm border border-white/30 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                </svg>
                Call {PHONE_NUMBER_DISPLAY}
              </a>
              <Link
                href="/"
                className="text-white/90 hover:text-white font-bold text-sm text-center pt-2 transition-colors"
              >
                ← Back to all storage options
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
