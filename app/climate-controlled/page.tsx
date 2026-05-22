import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  SITE_URL,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_HREF,
} from '@/lib/site'
import {
  CLIMATE_UNIT_SIZES,
  CLIMATE_CONCEPTS,
  WHAT_TO_STORE,
  CLIMATE_FAQS,
  CLIMATE_REVIEWS,
} from '@/lib/climate-controlled'
import FaqAccordion from '@/components/FaqAccordion'
import LocationFinder from '@/components/LocationFinder'

const PAGE_PATH = '/climate-controlled'
const HERO_IMAGE = '/images/modern-storage-climate-controlled-hallway-arkansas.jpg'
const HERO_ALT =
  'Modern Storage climate-controlled storage hallway in Arkansas with clean indoor units'
const INTERIOR_IMAGE = '/images/modern-storage-climate-controlled-interior-corridor.jpg'
const INTERIOR_ALT =
  'Climate-controlled indoor corridor at a Modern Storage Arkansas location'

export const metadata: Metadata = {
  title: {
    absolute: 'Climate-Controlled Storage Units in Arkansas | Modern Storage®',
  },
  description:
    'Protect furniture, electronics, documents, and valuables with climate-controlled storage units at Modern Storage® locations across Arkansas. Reserve online today.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Climate-Controlled Storage Units in Arkansas | Modern Storage®',
    description:
      'Climate-controlled self-storage units at Modern Storage locations across Arkansas. Indoor, temperature- and humidity-managed protection for furniture, electronics, documents, photos, and business inventory.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage® Self Storage',
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
    title: 'Climate-Controlled Storage Units in Arkansas | Modern Storage®',
    description:
      'Indoor, climate-controlled storage at Modern Storage locations across Arkansas.',
    images: [HERO_IMAGE],
  },
}

const TRUST_BULLETS = [
  'Climate-controlled at most Arkansas locations',
  'Indoor, gated, surveilled access',
  'Free moving truck with new rentals',
  'Month-to-month rentals',
  'Best of the Best 2023, 2024, 2025',
]

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Climate-Controlled Self Storage',
    name: 'Climate-Controlled Storage Units in Arkansas',
    description:
      'Indoor, temperature- and humidity-managed storage units at Modern Storage locations across Arkansas. Protects furniture, electronics, documents, photos, instruments, antiques, and business inventory.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    provider: {
      '@type': 'SelfStorage',
      name: 'Modern Storage',
      url: SITE_URL + '/',
      telephone: PHONE_NUMBER_DISPLAY,
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

  return [service, breadcrumb, faqPage]
}

// Inline icon set — keeps the page self-contained and matches existing stroke-icon style.
function StoreIcon({ name }: { name: string }) {
  const common = 'w-6 h-6'
  switch (name) {
    case 'Wood, leather & upholstered furniture':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 12V8a2 2 0 012-2h12a2 2 0 012 2v4M4 12h16M4 12v4a2 2 0 002 2h12a2 2 0 002-2v-4M6 18v2M18 18v2" />
        </svg>
      )
    case 'Electronics & screens':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 6.75A1.75 1.75 0 014.75 5h14.5A1.75 1.75 0 0121 6.75v8.5A1.75 1.75 0 0119.25 17H4.75A1.75 1.75 0 013 15.25v-8.5zM9 21h6M12 17v4" />
        </svg>
      )
    case 'Documents & business records':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 4h7l4 4v12a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1zM14 4v4h4M9 13h6M9 17h4" />
        </svg>
      )
    case 'Photos, albums & art':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5h16v14H4zM4 16l4-4 3 3 5-5 4 4" />
          <circle cx="9" cy="9" r="1.4" fill="currentColor" />
        </svg>
      )
    case 'Musical instruments':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 18a3 3 0 100-6 3 3 0 000 6zM12 15V4l8 2v3" />
        </svg>
      )
    case 'Antiques & collectibles':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 21h8M9 21v-3a3 3 0 016 0v3M7 4h10v3a5 5 0 01-10 0V4zM5 5v2a2 2 0 002 2M19 5v2a2 2 0 01-2 2" />
        </svg>
      )
    case 'Clothing & textiles':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 4l-4 4v3l3-1v9h10v-9l3 1V8l-4-4-2 2a2 2 0 11-4 0L8 4z" />
        </svg>
      )
    case 'Business inventory':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16l-1 13H5L4 7zM9 7V5a3 3 0 016 0v2M9 11v4M15 11v4" />
        </svg>
      )
    default:
      return null
  }
}

function ConceptIcon({ title }: { title: string }) {
  const common = 'w-6 h-6'
  switch (title) {
    case 'Controlled temperature range':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 13V5a2 2 0 114 0v8a4 4 0 11-4 0z" />
        </svg>
      )
    case 'Active humidity management':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3s5 6 5 10a5 5 0 11-10 0c0-4 5-10 5-10z" />
        </svg>
      )
    case 'Fully enclosed indoor space':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" />
        </svg>
      )
    case 'Secured access':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        </svg>
      )
    default:
      return null
  }
}

export default function ClimateControlledPage() {
  const jsonLd = buildJsonLd()

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
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          {/* Breadcrumb */}
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
            {/* Left — headline + CTAs */}
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Climate-Controlled Storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Climate-Controlled Storage Units in <span className="text-modern-red">Arkansas</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                Indoor, temperature- and humidity-managed storage at Modern Storage locations across Arkansas. Built for furniture, electronics, documents, photos, instruments, and business inventory that deserve real protection.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="#locations"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  Reserve a Climate-Controlled Unit
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="#sizes"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors border border-white/20 text-sm"
                >
                  See Available Sizes
                </Link>
                <a
                  href={PHONE_NUMBER_HREF}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold px-3 py-3.5 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                  </svg>
                  Call {PHONE_NUMBER_DISPLAY}
                </a>
              </div>

              {/* Trust bullets */}
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

            {/* Right — hero image */}
            <div className="relative">
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
                </div>
                <figcaption className="text-xs text-gray-500 mt-3 italic">
                  Indoor climate-controlled hallway at a Modern Storage Arkansas facility.
                </figcaption>
              </figure>
              {/* Floating award badge */}
              <div className="absolute -bottom-2 -left-5 sm:-bottom-5 bg-modern-red text-white rounded-2xl px-5 py-3 shadow-xl hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-100">Best of the Best</p>
                <p className="text-lg font-black leading-none mt-0.5">2023 · 2024 · 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ────────────────────────────────────────── */}
      <section id="locations" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Locations</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Climate-Controlled Storage Across Arkansas
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Most Modern Storage locations offer climate-controlled units. Filter by region to find the closest one — climate-controlled availability and unit sizes vary by facility.
            </p>
          </div>
          <LocationFinder highlightBadge="Climate-Controlled" requireBadge="Climate-Controlled" />
        </div>
      </section>

      {/* ── WHAT CLIMATE CONTROL MEANS ───────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                What climate control actually means
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
                Indoor protection that actually does something
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                &ldquo;Climate-controlled&rdquo; gets used loosely in the storage industry. At Modern Storage it means a specific thing: indoor units inside a sealed, insulated building, with HVAC equipment actively managing temperature and humidity.
              </p>
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-100 relative">
                <Image
                  src={INTERIOR_IMAGE}
                  alt={INTERIOR_ALT}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-5">
                {CLIMATE_CONCEPTS.map((c) => (
                  <div
                    key={c.title}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-modern-red transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center mb-4">
                      <ConceptIcon title={c.title} />
                    </div>
                    <h3 className="font-black text-charcoal mb-2 leading-tight">{c.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNIT SIZE GUIDE ──────────────────────────────────── */}
      <section id="sizes" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Unit sizes</p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Climate-Controlled Unit Sizes
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Six sizes designed for everything from a closet of paperwork to a whole-home move. Availability varies by location — reserve online and we&apos;ll match you to the right size and facility.
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
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-modern-red hover:shadow-xl transition-all flex flex-col"
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
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-bebas text-5xl text-charcoal leading-none">{u.size}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Unit size
                    </span>
                  </div>
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

                  <div className="mt-auto flex flex-col gap-3">
                    <Link
                      href="#locations"
                      className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-5 py-3 rounded-full transition-colors"
                    >
                      Reserve a {u.size} Unit
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="#locations"
                      className="text-xs font-bold text-charcoal/70 hover:text-modern-red transition-colors text-center"
                    >
                      See locations with this size →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT SHOULD GO IN CLIMATE-CONTROLLED ─────────────── */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              What belongs in climate-controlled
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              What Should Go in a Climate-Controlled Unit
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              If it&apos;s sensitive to heat, cold, or humidity, it belongs in climate-controlled. Arkansas weather is the reason — these are the categories where it matters most.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHAT_TO_STORE.map((item) => (
              <div
                key={item.label}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-modern-red rounded-2xl p-6 transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-modern-red/15 text-modern-red flex items-center justify-center mb-4">
                  <StoreIcon name={item.label} />
                </div>
                <h3 className="font-black text-white mb-2 leading-tight">{item.label}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Customer reviews</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              What Climate-Controlled Customers Say
            </h2>
          </div>
          {/* Replace these with real Google reviews before launch. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIMATE_REVIEWS.map((r) => (
              <figure
                key={r.author + r.location + r.theme}
                className="bg-white rounded-2xl p-7 border border-gray-200 flex flex-col"
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

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Climate-Controlled Storage FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              The questions Arkansas customers ask us most about climate-controlled storage at Modern Storage.
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
                Reserve a Climate-Controlled Unit Today
              </h2>
              <p className="text-red-100 text-lg leading-relaxed mb-6">
                Choose your location, pick a size, and reserve online in minutes. New rentals at participating locations include a free moving truck to make move-in easier.
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
                Find a Climate-Controlled Unit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={PHONE_NUMBER_HREF}
                className="bg-charcoal text-white font-black px-6 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
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
