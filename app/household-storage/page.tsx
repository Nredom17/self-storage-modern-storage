import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getLocations, getSiteSettings } from '@/lib/data'
import {
  HOUSEHOLD_UNIT_SIZES,
  LIFE_TRANSITIONS,
  HOUSEHOLD_FAQS,
} from '@/lib/household-storage'
import FaqAccordion from '@/components/FaqAccordion'
import LocationFinder from '@/components/LocationFinder'

export const revalidate = 60

const PAGE_PATH = '/household-storage'
const HERO_IMAGE = '/images/modern-storage-self-storage-units-arkansas.jpg'
const HERO_ALT =
  'Modern Storage® self-storage facility in Arkansas with clean drive-up units and a moving truck'
const TRUCK_IMAGE = '/images/modern-storage-free-moving-truck.jpg'
const TRUCK_ALT =
  'Modern Storage® free moving truck for new household storage rentals at participating Arkansas locations'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Units in Arkansas — 10 Locations | Modern Storage®',
  },
  description:
    'Household storage units across Arkansas at 10 Modern Storage® locations. Moving, downsizing, renovating, growing families, life transitions, and seasonal storage with a free moving truck.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Units in Arkansas — 10 Locations | Modern Storage®',
    description:
      'Find household storage units across Arkansas at 10 Modern Storage® locations. Climate-controlled and drive-up options, month-to-month rentals, and free moving truck with new rentals.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage® Self Storage',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Units in Arkansas — 10 Locations | Modern Storage®',
    description:
      'Household storage units across Arkansas at 10 Modern Storage® locations with a free moving truck for new rentals.',
    images: [HERO_IMAGE],
  },
}

const TRUST_BULLETS = [
  '10 Arkansas locations',
  'Free moving truck with new rentals',
  'Climate-controlled and drive-up units',
  'Month-to-month rentals',
  'Online reservations in minutes',
]

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Household Self Storage',
    name: 'Storage Units in Arkansas — 10 Locations',
    description:
      'Household self-storage at 10 Modern Storage® locations across Arkansas. Built for moving, downsizing, renovating, growing families, life transitions, and seasonal storage. Climate-controlled and drive-up options available, with a free moving truck at participating locations.',
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
      name: 'Household Storage Unit Sizes',
      itemListElement: HOUSEHOLD_UNIT_SIZES.map((u) => ({
        '@type': 'Offer',
        url: SITE_URL + PAGE_PATH + '#size-' + u.sizeSlug,
        itemOffered: {
          '@type': 'Service',
          name: `${u.size} Household Storage Unit`,
          description: u.bestFor + '. ' + u.moveNote,
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
        name: 'Household Storage',
        item: SITE_URL + PAGE_PATH,
      },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOUSEHOLD_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [service, localBusiness, breadcrumb, faqPage]
}

function LifeIcon({ name }: { name: string }) {
  const common = 'w-6 h-6'
  switch (name) {
    case 'truck':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7h11v9H3zM14 11h4l3 3v2h-7zM7 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      )
    case 'home':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 11l9-8 9 8M5 9.5V21h14V9.5M9 21v-6h6v6" />
        </svg>
      )
    case 'tools':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.7 6.3a4 4 0 015.5 5.5l-2 .5L8 22l-6-6L12.2 5.7l.5-2a4 4 0 012-1.4" />
        </svg>
      )
    case 'family':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 11a3 3 0 100-6 3 3 0 000 6zM17 11a3 3 0 100-6 3 3 0 000 6zM2 20v-2a4 4 0 014-4h2a4 4 0 014 4v2M14 20v-2a4 4 0 014-4h2a2 2 0 012 2v4" />
        </svg>
      )
    case 'heart':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.8 7.6a5 5 0 00-8.8-2 5 5 0 00-8.8 2c0 6 8.8 11 8.8 11s8.8-5 8.8-11z" />
        </svg>
      )
    case 'sun':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )
    default:
      return null
  }
}

export default async function HouseholdStoragePage() {
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()])
  const jsonLd = buildJsonLd(settings.phoneDisplay)
  const PHONE_NUMBER_DISPLAY = settings.phoneDisplay
  const PHONE_NUMBER_HREF = settings.phoneHref
  const RESERVATION_URL = settings.reservationUrl

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
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Household Storage</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Household Storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Storage Units in <span className="text-modern-red">Arkansas</span> — 10 Locations
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                Clean, convenient household storage for moving, downsizing, renovating, growing families, life transitions, and seasonal items. Climate-controlled and drive-up units across 10 Modern Storage® locations in Arkansas.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="#locations"
                  aria-label="Find a household storage unit near you at a Modern Storage® Arkansas location"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  Find a Unit Near You
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href={PHONE_NUMBER_HREF}
                  aria-label={`Call Modern Storage® at ${PHONE_NUMBER_DISPLAY}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors border border-white/20 text-sm"
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
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Household storage at a Modern Storage® Arkansas facility.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS (10 across Arkansas) ──────────────────── */}
      <section id="locations" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">10 Locations</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Find Household Storage Near You
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              10 Modern Storage® locations serve central Arkansas and Northwest Arkansas — Little Rock, West Little Rock, North Little Rock, Riverdale, Maumelle, Bryant, Hot Springs, Bentonville, Springdale, and Lowell. Filter by region, click a pin for details, and reserve online.
            </p>
          </div>
          <LocationFinder locations={locations} />
        </div>
      </section>

      {/* ── UNIT SIZE GUIDE ──────────────────────────────────── */}
      <section id="sizes" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Unit Sizes</p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Household Storage Unit Sizes
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Six sizes covering closet overflow through whole-home moves. Availability varies by Modern Storage® location — reserve online and the team will match you to the right unit at the right facility.
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
            {HOUSEHOLD_UNIT_SIZES.map((u) => (
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
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="flex items-baseline gap-3 mb-5 flex-wrap">
                    <span className="font-bebas text-5xl text-charcoal leading-none">{u.size}</span>
                    <span className="text-sm font-bold text-charcoal/80 leading-tight">
                      Household Storage Unit
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
                    {u.moveNote}
                  </p>

                  <div className="mt-auto flex flex-col gap-3">
                    <Link
                      href="#locations"
                      aria-label={`Find a ${u.size} household storage unit at a Modern Storage® Arkansas location`}
                      className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-5 py-3 rounded-full transition-colors"
                    >
                      Find a {u.size} Unit Near You
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a
                      href={RESERVATION_URL}
                      className="text-xs font-bold text-charcoal/70 hover:text-modern-red transition-colors text-center"
                    >
                      Reserve a {u.size} unit online →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFE TRANSITIONS ────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              When household storage helps
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Built for Every Household Transition
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Households across Arkansas use Modern Storage® for predictable life moments and unexpected ones alike. Month-to-month rentals make it easy to start, extend, or close out a unit on your schedule.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LIFE_TRANSITIONS.map((t) => (
              <div
                key={t.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-modern-red hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center mb-4">
                  <LifeIcon name={t.icon} />
                </div>
                <h3 className="font-black text-charcoal mb-2 leading-tight">{t.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE MOVING TRUCK ───────────────────────────────── */}
      <section id="moving-truck" className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
              <Image
                src={TRUCK_IMAGE}
                alt={TRUCK_ALT}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Free moving truck
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-5">
                Move Household Belongings In Without Booking a Second Rental
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Modern Storage® offers a free moving truck with new household storage rentals at participating Arkansas locations. Load furniture, appliances, and boxes directly to your unit on move-in day.
              </p>
              <p className="text-sm text-gray-500 italic mb-8">
                Truck availability, mileage limits, requirements, and location participation may vary.
              </p>
              <Link
                href="#locations"
                className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
              >
                Find a Unit Near You
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED STORAGE OPTIONS ─────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Need a different kind of storage?
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Other Modern Storage® Options in Arkansas
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Household isn&apos;t the only way customers use Modern Storage®. If you have a boat or RV, a business, or items that need a more stable indoor environment, start here.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/climate-controlled"
              className="group bg-gray-50 hover:bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Climate-Controlled</p>
              <h3 className="text-xl font-black text-charcoal group-hover:text-modern-red transition-colors mb-3">
                Climate-Controlled Storage
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Indoor protection for furniture, electronics, documents, photos, instruments, and other temperature-sensitive belongings.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">
                Explore climate-controlled →
              </span>
            </Link>
            <Link
              href="/boat-rv-storage"
              className="group bg-gray-50 hover:bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Boat & RV</p>
              <h3 className="text-xl font-black text-charcoal group-hover:text-modern-red transition-colors mb-3">
                Boat and RV Storage
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Boat, RV, trailer, and vehicle storage near Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">
                Explore boat and RV →
              </span>
            </Link>
            <Link
              href="/business-storage"
              className="group bg-gray-50 hover:bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Business</p>
              <h3 className="text-xl font-black text-charcoal group-hover:text-modern-red transition-colors mb-3">
                Business Storage
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Mini-warehouse and business storage led by Modern Storage® Riverdale for inventory, equipment, and records.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">
                Explore business storage →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Household Storage FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Answers to the most common questions about household storage units in Arkansas — unit sizes, climate-controlled options, the free moving truck, month-to-month rentals, and how to reserve a Modern Storage® unit online.
            </p>
          </div>
          <FaqAccordion items={HOUSEHOLD_FAQS} />
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
                Find a Household Storage Unit Near You
              </h2>
              <p className="text-red-100 text-lg leading-relaxed mb-6">
                Pick a Modern Storage® location, choose a size, and reserve online in minutes. Free moving truck available with new rentals at participating locations.
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
                Find a Unit Near You
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={RESERVATION_URL}
                className="bg-charcoal text-white font-black px-6 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
              >
                Reserve Online Now
              </a>
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
