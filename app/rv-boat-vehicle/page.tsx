import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getLocations, getSiteSettings } from '@/lib/data'
import {
  BOAT_RV_FEATURED_SLUGS,
  BOAT_RV_LOCATION_COPY,
  VEHICLE_TYPE_CARDS,
  BOAT_RV_SIZING,
  BOAT_RV_FAQS,
  LAKE_WEEKEND_LOCATIONS,
  LONG_TERM_RV_LOCATIONS,
  CLASSIC_CAR_LOCATIONS,
  BY_THE_NUMBERS,
} from '@/lib/rv-boat-vehicle'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/rv-boat-vehicle'
const HERO_IMAGE = '/images/modern-storage-shackleford-rv-storage-unit.jpg'
const HERO_ALT =
  'RV stored in a Modern Storage® Shackleford indoor RV storage unit with red roll-up doors in Little Rock'
const HERO_CAPTION =
  'Indoor RV storage at Modern Storage® Shackleford in Little Rock.'

export const metadata: Metadata = {
  title: { absolute: 'Boat, RV & Vehicle Storage in Arkansas | Modern Storage®' },
  description:
    'Find secure boat, RV, and vehicle storage across Arkansas. Covered and uncovered options near Bentonville, Lowell, Little Rock, and Hot Springs.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Boat, RV & Vehicle Storage in Arkansas | Modern Storage®',
    description:
      'Find secure boat, RV, and vehicle storage across Arkansas. Covered and uncovered options near Bentonville, Lowell, Little Rock, and Hot Springs.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage® Self Storage',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boat, RV & Vehicle Storage in Arkansas | Modern Storage®',
    description:
      'Find secure boat, RV, and vehicle storage across Arkansas. Covered and uncovered options near Bentonville, Lowell, Little Rock, and Hot Springs.',
    images: [HERO_IMAGE],
  },
}

const TRUST_BULLETS = [
  'Outdoor, covered, and indoor options at select locations',
  'Near Beaver Lake, Lake Ouachita, Lake Maumelle, Greers Ferry',
  'Class A through travel-trailer sizes',
  'Gated, surveilled facilities',
  'Month-to-month rentals',
]

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Boat, RV, and Vehicle Storage',
    name: 'Boat, RV & Vehicle Storage in Arkansas',
    description:
      'Boat, RV, trailer, and vehicle storage at Modern Storage® locations across Arkansas. Outdoor, covered, and indoor options sized for bass boats, pontoons, Class A motorhomes, fifth wheels, travel trailers, work vans, classic cars, and motorcycles. Convenient to Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry.',
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
      name: 'Boat, RV, and Vehicle Storage Sizes',
      itemListElement: BOAT_RV_SIZING.map((s) => ({
        '@type': 'Offer',
        url: SITE_URL + PAGE_PATH + '#sizing',
        itemOffered: {
          '@type': 'Service',
          name: `${s.space} Boat, RV, or Vehicle Storage Space`,
          description: s.bestFor + '. ' + s.fits,
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
      { '@type': 'ListItem', position: 2, name: 'Boat and RV Storage', item: SITE_URL + PAGE_PATH },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: BOAT_RV_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [service, localBusiness, breadcrumb, faqPage]
}

function VehicleIcon({ name }: { name: string }) {
  const common = 'w-7 h-7'
  switch (name) {
    case 'boat':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15h18l-2 5H5l-2-5zM5 15l1-6h12l1 6M11 9V3l5 6" />
        </svg>
      )
    case 'rv':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2 7h14v9H2zM16 10h4l2 3v3h-6zM6 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4zM6 7V5h6v2" />
        </svg>
      )
    case 'car':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 11l2-5h10l2 5M3 17v-4a2 2 0 012-2h14a2 2 0 012 2v4h-3a2 2 0 11-4 0H10a2 2 0 11-4 0H3z" />
        </svg>
      )
    default:
      return null
  }
}

export default async function BoatRvStoragePage() {
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()])
  const jsonLd = buildJsonLd(settings.phoneDisplay)
  const PHONE_NUMBER_DISPLAY = settings.phoneDisplay
  const PHONE_NUMBER_HREF = settings.phoneHref

  // Featured locations in the explicit order specified for this page,
  // joined with the per-location copy block.
  const featured = BOAT_RV_FEATURED_SLUGS
    .map((slug) => {
      const loc = locations.find((l) => l.slug === slug)
      if (!loc) return null
      return { ...loc, ...BOAT_RV_LOCATION_COPY[slug] }
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

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
              <li className="text-gray-300">Boat and RV Storage</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Boat, RV &amp; Vehicle Storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Boat, RV &amp; Vehicle Storage in <span className="text-modern-red">Arkansas</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                Park boats, RVs, travel trailers, motorcycles, and vehicles at Modern Storage® locations across Arkansas — including outdoor, covered, and select indoor options near Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="#featured-locations"
                  aria-label="Reserve boat storage at a Modern Storage® Arkansas location"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Reserve Boat Storage
                </Link>
                <Link
                  href="#featured-locations"
                  aria-label="Reserve RV storage at a Modern Storage® Arkansas location"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Reserve RV Storage
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
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">{HERO_CAPTION}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── HERO SEO COPY ────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
            Boat, RV &amp; vehicle storage across Arkansas
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-5">
            Where Arkansas Boaters, RV Owners, and Drivers Park Between Trips
          </h2>
          <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-4">
            Customers searching for boat storage near me, RV storage near me, or vehicle storage in Arkansas usually have one of two needs: a place to park between weekends on the lake, or a long-term home for an RV, classic car, or work trailer that doesn&apos;t fit in the driveway. Modern Storage® has both covered, with 10 self-storage locations across Arkansas and a focused boat, RV, and vehicle storage footprint in Little Rock, Bentonville, Lowell, Springdale, Maumelle, and Hot Springs.
          </p>
          <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-4">
            Northwest Arkansas customers near Bentonville, Lowell, and Springdale store boats and RVs within easy reach of Beaver Lake, then keep them moving the rest of the year for tournaments, family trips, and weekends away. Central Arkansas customers near Little Rock, Maumelle, and Shackleford store closer to Lake Maumelle and the Arkansas River. Hot Springs customers store within minutes of Lake Ouachita, and customers north of central Arkansas regularly use Modern Storage® on the way to and from Greers Ferry.
          </p>
          <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
            Indoor RV storage, covered parking, oversized outdoor spaces, and pull-through bays are available at select Modern Storage® locations. Month-to-month rentals mean you can store seasonally during the off-months and pause when the lake season starts again. If you also need household, business, or climate-controlled storage, see the{' '}
            <Link href="/climate-controlled" className="text-modern-red font-bold hover:underline">
              climate-controlled storage page
            </Link>
            ,{' '}
            <Link href="/household-storage" className="text-modern-red font-bold hover:underline">
              household storage page
            </Link>
            , or{' '}
            <Link href="/business-storage" className="text-modern-red font-bold hover:underline">
              business storage page
            </Link>{' '}
            for related options.
          </p>
        </div>
      </section>

      {/* ── BOAT / RV / VEHICLE CARDS ───────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Three ways to park</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Boat, RV &amp; Vehicle Storage Options
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Modern Storage® offers parking sized for everything from a bass boat to a Class A motorhome, with outdoor, covered, and select indoor options across Arkansas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VEHICLE_TYPE_CARDS.map((c) => (
              <article
                key={c.type}
                className="bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-xl transition-all flex flex-col"
              >
                <div className="w-12 h-12 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center mb-5">
                  <VehicleIcon name={c.icon} />
                </div>
                <h3 className="text-xl font-black text-charcoal mb-1 leading-tight">{c.type}</h3>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-4">{c.sub}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{c.body}</p>
                <ul className="space-y-2 mb-6">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#featured-locations"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-5 py-3 rounded-full transition-colors"
                >
                  {c.ctaLabel}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARKANSAS LAKES STRIP ────────────────────────────── */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Close to the water
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Built for Arkansas Lake Country
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Modern Storage® locations sit close to Arkansas&apos;s busiest boating lakes, so you can launch on Saturday morning and have your rig back in storage Sunday night without crossing the state.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Northwest Arkansas locations are convenient to <strong className="text-charcoal">Beaver Lake</strong>. Central Arkansas locations serve <strong className="text-charcoal">Lake Maumelle</strong> and the lower White River. Hot Springs is on the doorstep of <strong className="text-charcoal">Lake Ouachita</strong>, and central-state customers heading north regularly use Modern Storage® on the way to <strong className="text-charcoal">Greers Ferry</strong>.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {[
                { lake: 'Beaver Lake', region: 'Northwest Arkansas' },
                { lake: 'Lake Maumelle', region: 'Little Rock area' },
                { lake: 'Lake Ouachita', region: 'Hot Springs' },
                { lake: 'Greers Ferry', region: 'Central / North-central AR' },
              ].map((l) => (
                <div
                  key={l.lake}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                >
                  <p className="font-black text-charcoal text-sm leading-tight">{l.lake}</p>
                  <p className="text-xs text-gray-500 mt-1">{l.region}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ──────────────────────────────────── */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Modern Storage® by the numbers
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              An Arkansas Self Storage Network
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {BY_THE_NUMBERS.map((n) => (
              <div
                key={n.label}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-colors"
              >
                <p className="font-bebas text-4xl text-modern-red leading-none mb-2">{n.stat}</p>
                <p className="text-xs text-gray-300 leading-snug">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOPIC: LAKE WEEKENDS ────────────────────────────── */}
      <section id="lake-weekends" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Topic · lake weekends
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Storage for Arkansas Lake Weekends
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Weekend boaters, fishing families, ski-and-wake crews, and pontoon owners are the heart of Modern Storage®&apos;s boat program. The goal is simple: keep the boat close to the ramp, ready to roll on Friday afternoon, and back behind the gate Sunday night.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most lake-weekend customers store a bass boat, pontoon, ski boat, or jet ski on a trailer at one of the Modern Storage® lake-adjacent facilities. Fishing rods, life vests, skis, coolers, and tow gear typically live in a small adjacent household unit so you don&apos;t have to load and unload the truck every trip — see the{' '}
                <Link href="/household-storage" className="text-modern-red font-bold hover:underline">
                  household storage page
                </Link>{' '}
                for that side of the rental, or the{' '}
                <Link href="/climate-controlled" className="text-modern-red font-bold hover:underline">
                  climate-controlled storage page
                </Link>{' '}
                if any of the gear is heat-sensitive.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
                  Best Modern Storage® locations
                </p>
                <ul className="space-y-3">
                  {LAKE_WEEKEND_LOCATIONS.map((l) => (
                    <li key={l.name} className="flex gap-3">
                      <svg className="w-4 h-4 text-modern-red shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-charcoal">
                        <strong className="font-black">{l.name}</strong> — {l.detail}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#featured-locations"
                  className="mt-5 inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-5 py-2.5 rounded-full transition-colors"
                >
                  Reserve Boat Storage →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOPIC: LONG-TERM RV ─────────────────────────────── */}
      <section id="long-term-rv" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Topic · long-term RV
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Long-Term RV Storage
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Long-term RV storage at Modern Storage® serves full-time and seasonal RV owners between trips, snowbirds returning to Arkansas, and families parking a motorhome for the off-season. Class A motorhomes, Class C motorhomes, fifth wheels, travel trailers, and pop-up campers all fit somewhere across the Modern Storage® network — the right size depends on the rig and the location depends on where you keep it.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Indoor RV storage is available at Modern Storage® Shackleford in Little Rock for owners who want their rig out of the sun and weather. Oversized outdoor spaces at the Northwest Arkansas and central Arkansas locations cover Class A and fifth-wheel sizes that won&apos;t fit in a typical residential driveway. Month-to-month rentals make multi-season storage straightforward — check the centralized{' '}
                <Link href="/#size-guide" className="text-modern-red font-bold hover:underline">
                  Modern Storage® unit size guide
                </Link>{' '}
                if you&apos;re also planning to store household items alongside the RV.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
                  Best Modern Storage® locations
                </p>
                <ul className="space-y-3">
                  {LONG_TERM_RV_LOCATIONS.map((l) => (
                    <li key={l.name} className="flex gap-3">
                      <svg className="w-4 h-4 text-modern-red shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-charcoal">
                        <strong className="font-black">{l.name}</strong> — {l.detail}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#featured-locations"
                  className="mt-5 inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-5 py-2.5 rounded-full transition-colors"
                >
                  Reserve RV Storage →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOPIC: CLASSIC CARS ─────────────────────────────── */}
      <section id="classic-vehicles" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Topic · classic and collector
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Classic Car &amp; Collector Vehicle Storage
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Classic car and collector vehicle storage at Modern Storage® is for collectors, restoration projects, snowbird drivers with seasonal vehicles, and customers without a garage at home. Classic cars, motorcycles, project cars, convertibles, and weekend show vehicles all park here — and the right option depends on how much weather protection the vehicle needs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Indoor RV bays at Modern Storage® Shackleford are the closest equivalent for vehicles that benefit from being out of the sun. For parts, tools, and accessories that need a stable indoor environment, a climate-controlled household unit is usually the right call — see the{' '}
                <Link href="/climate-controlled" className="text-modern-red font-bold hover:underline">
                  climate-controlled storage page
                </Link>{' '}
                for the full guide. Restorers running a full project may also want a{' '}
                <Link href="/business-storage" className="text-modern-red font-bold hover:underline">
                  mini-warehouse business storage unit
                </Link>{' '}
                at Modern Storage® Riverdale.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
                  Best Modern Storage® locations
                </p>
                <ul className="space-y-3">
                  {CLASSIC_CAR_LOCATIONS.map((l) => (
                    <li key={l.name} className="flex gap-3">
                      <svg className="w-4 h-4 text-modern-red shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-charcoal">
                        <strong className="font-black">{l.name}</strong> — {l.detail}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#featured-locations"
                  className="mt-5 inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-5 py-2.5 rounded-full transition-colors"
                >
                  Check Vehicle Storage Availability →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED LOCATIONS (specific order, rich copy) ─── */}
      <section id="featured-locations" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Featured locations
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Modern Storage® Boat, RV &amp; Vehicle Locations
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              These six Modern Storage® facilities are the ones boaters, RV owners, and contractors ask about most. Each card below covers what the location is best for, the rigs it commonly stores, and the local lake or recreation area it serves.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map((loc, idx) => (
              <article
                key={loc.slug}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
              >
                <figure className="m-0">
                  <div className="relative aspect-[16/9] bg-gray-100">
                    <Image
                      src={loc.image}
                      alt={loc.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-modern-red text-white px-2.5 py-1 rounded-full">
                      #{idx + 1} Featured
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest bg-charcoal text-white px-2.5 py-1 rounded-full">
                      {loc.region}
                    </span>
                  </div>
                  <figcaption className="text-xs text-gray-500 italic px-6 pt-3">
                    {loc.caption}
                  </figcaption>
                </figure>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-modern-red mb-1.5">
                    {loc.tagline}
                  </p>
                  <h3 className="font-black text-charcoal text-xl leading-tight mb-2">{loc.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{loc.streetAddress}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {loc.city}, {loc.state} {loc.zip}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{loc.body}</p>

                  <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Best for</p>
                  <ul className="space-y-1.5 mb-5">
                    {loc.bestFor.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-modern-red font-black shrink-0">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {loc.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-gray-100 text-gray-700"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-2">
                    <a
                      href={loc.reservationUrl}
                      aria-label={`Reserve boat, RV, or vehicle storage at ${loc.name}`}
                      className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors flex-1"
                    >
                      Reserve at {loc.city}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <a
                      href={PHONE_NUMBER_HREF}
                      className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                    >
                      Call {PHONE_NUMBER_DISPLAY}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIZING REFERENCE TABLE ─────────────────────────── */}
      <section id="sizing" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Sizing reference
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Match Your Rig to the Right Space
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A starting point for choosing a boat, RV, or vehicle storage space at Modern Storage®. Measure your rig (including any rear ladder, hitch, and tongue extension) before reserving, and the team will confirm the right space at the right facility. For full household-storage sizes see the{' '}
              <Link href="/#size-guide" className="text-modern-red font-bold hover:underline">
                Modern Storage® unit size guide
              </Link>
              .
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-charcoal text-white text-xs uppercase tracking-widest">
                <tr>
                  <th scope="col" className="px-5 py-4 font-black">Space</th>
                  <th scope="col" className="px-5 py-4 font-black">Best for</th>
                  <th scope="col" className="px-5 py-4 font-black">What fits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {BOAT_RV_SIZING.map((row) => (
                  <tr key={row.space} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-bebas text-2xl text-charcoal leading-none whitespace-nowrap">
                      {row.space}
                    </td>
                    <td className="px-5 py-4 font-bold text-charcoal">{row.bestFor}</td>
                    <td className="px-5 py-4 text-gray-600">{row.fits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4 italic">
            Availability of each space size varies by Modern Storage® location. Indoor and covered options are limited and available at select locations only — call ahead to confirm.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#featured-locations"
              className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
            >
              Check Vehicle Storage Availability
            </Link>
            <a
              href={PHONE_NUMBER_HREF}
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Call {PHONE_NUMBER_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ── RELATED PAGES ──────────────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Related storage options
            </p>
            <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight">
              More from Modern Storage®
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/climate-controlled"
              className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Climate-Controlled</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Climate-controlled storage in Arkansas →</p>
            </Link>
            <Link
              href="/household-storage"
              className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Household</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Household storage at 10 locations →</p>
            </Link>
            <Link
              href="/business-storage"
              className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Business</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Business and mini-warehouse storage →</p>
            </Link>
            <Link
              href="/#moving-truck"
              className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Moving Truck</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Free moving truck details →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section id="faq" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Boat, RV &amp; Vehicle Storage FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Common questions about boat storage, RV storage, vehicle parking, sizing, climate-controlled vehicle storage, access hours, and reserving boat or RV storage at Modern Storage® locations across Arkansas.
            </p>
          </div>
          <FaqAccordion items={BOAT_RV_FAQS} />
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
                Reserve Boat, RV &amp; Vehicle Storage in Arkansas
              </h2>
              <p className="text-red-100 text-lg leading-relaxed mb-6">
                Pick a Modern Storage® location near your lake or route, choose the space that fits your rig, and reserve online — month-to-month, so you can store seasonally or year-round.
              </p>
              <p className="text-red-100/80 text-xs italic mb-8 lg:mb-0">
                Indoor, covered, and outdoor availability varies by Modern Storage® location.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <Link
                href="#featured-locations"
                className="bg-white text-modern-red font-black px-6 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
              >
                Reserve Boat Storage
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#featured-locations"
                className="bg-white text-modern-red font-black px-6 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
              >
                Reserve RV Storage
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#featured-locations"
                className="bg-charcoal text-white font-black px-6 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
              >
                Check Vehicle Storage Availability
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
