import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'
import {
  TRUCK_LOCATIONS,
  HOW_IT_WORKS,
  TRUCK_DETAILS,
  MOVING_TIPS,
  TRUCK_FAQS,
} from '@/lib/free-moving-truck'

export const revalidate = 60

const PAGE_PATH = '/free-moving-truck'
const HERO_IMAGE = '/images/modern-storage-free-moving-truck.jpg'
const HERO_ALT =
  'Modern Storage® branded free moving truck included with new storage unit rentals at participating Arkansas locations'

export const metadata: Metadata = {
  title: {
    absolute: 'Free Moving Truck with Storage in Arkansas | Modern Storage®',
  },
  description:
    'Free moving truck with new storage unit rentals at participating Modern Storage® Arkansas locations — Little Rock, North Little Rock, Springdale, Hot Springs, and more. Reserve your unit and truck together.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Free Moving Truck with Storage in Arkansas | Modern Storage®',
    description:
      'New storage rentals include a free moving truck at participating Modern Storage® Arkansas locations. Move-in day made easier — no second truck rental, no second trip.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Moving Truck with Storage in Arkansas | Modern Storage®',
    description:
      'Free moving truck with new Modern Storage® storage rentals at participating Arkansas locations.',
    images: [HERO_IMAGE],
  },
}

const TRUST_BULLETS = [
  'Free with new storage rentals',
  'Daily mileage allowance included',
  '5 participating Arkansas locations',
  'Same-day pickup and return',
  'No long-term commitment',
]

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Free Moving Truck with Self Storage Rental',
    name: 'Free Moving Truck with Modern Storage® Rentals',
    description:
      'Free moving truck included with new storage unit rentals at participating Modern Storage® Arkansas locations. Sized for one-bedroom to small-home moves. Daily mileage allowance, same-day pickup and return.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    provider: {
      '@type': 'SelfStorage',
      name: 'Modern Storage®',
      url: SITE_URL + '/',
      telephone: phoneDisplay,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description:
        'Included free with new Modern Storage® storage unit rentals at participating Arkansas locations.',
      availability: 'https://schema.org/InStock',
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Free Moving Truck', item: SITE_URL + PAGE_PATH },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TRUCK_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [service, breadcrumb, faqPage]
}

export default async function FreeMovingTruckPage() {
  const settings = await getSiteSettings()
  const jsonLd = buildJsonLd(settings.phoneDisplay)
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

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Free Moving Truck</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Move-in benefit
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Free Moving Truck with <span className="text-modern-red">Storage</span> in Arkansas
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                New Modern Storage® rentals at participating Arkansas locations include a free moving truck for move-in day. No second rental, no second trip — load your furniture, appliances, and boxes once and drive straight to your unit.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/#locations"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  Reserve a Unit with Truck
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href={PHONE_NUMBER_HREF}
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
                Modern Storage® branded moving truck — included with new rentals at participating locations.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">How the free truck works</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              How the Free Moving Truck Works
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The free moving truck is a move-in convenience tied to your new Modern Storage® storage unit rental. It is not a standalone truck rental — it is included with your unit so move-in day is one trip instead of two.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n} className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <div className="font-bebas text-5xl text-modern-red leading-none mb-3">{s.n}</div>
                <h3 className="font-black text-charcoal text-base mb-2 leading-tight">{s.t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTICIPATING LOCATIONS ──────────────────────────── */}
      <section id="locations" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Where to get the truck</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Participating Modern Storage® Locations
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The free moving truck is offered at participating Modern Storage® locations across Arkansas. Truck availability rotates by location and demand — confirm with your specific facility when you reserve your unit.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRUCK_LOCATIONS.map((loc) => (
              <div key={loc.name} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red transition-colors">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">{loc.area}</p>
                <h3 className="font-black text-charcoal text-lg leading-tight">{loc.name}</h3>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#locations"
              className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
            >
              See All 10 Locations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
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

      {/* ── DETAILS (reservation/driver/mileage/availability) ──────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">What to expect</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Reservation, Driver, Mileage &amp; Availability
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The specifics that customers ask about most. Exact terms vary by Modern Storage® location — the team confirms everything before you sign.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TRUCK_DETAILS.map((d) => (
              <div key={d.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="font-black text-charcoal text-lg mb-3 leading-tight">{d.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOVING TIPS ──────────────────────────────────────── */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Move-in day playbook</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              Moving Tips for Your Free Truck Day
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Four quick patterns that turn a one-truck move into a one-trip move. Customers who follow these load 30–40% more into the same truck.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOVING_TIPS.map((t) => (
              <div key={t.title} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-colors">
                <h3 className="font-black text-white mb-2 leading-tight">{t.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PAGES ────────────────────────────────────── */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Plan the rest of your storage</p>
          <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-8">
            Pair the Free Truck With the Right Unit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/household-storage" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Household</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Household storage at 10 locations →</p>
            </Link>
            <Link href="/climate-controlled" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Climate-Controlled</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Climate-controlled storage →</p>
            </Link>
            <Link href="/business-storage" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Business</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Business and mini-warehouse storage →</p>
            </Link>
            <Link href="/ai-storage-size-finder" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Size Finder</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">AI Storage Size Finder →</p>
            </Link>
            <Link href="/move-in-checklist" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Checklist</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Move-In Checklist →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Free Moving Truck FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Common questions about the free Modern Storage® moving truck — eligibility, locations, mileage, driver requirements, and how to reserve.
            </p>
          </div>
          <FaqAccordion items={TRUCK_FAQS} />
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve a Storage Unit and Lock in Your Free Moving Truck
          </h2>
          <p className="text-red-100 text-lg mb-3 max-w-2xl mx-auto leading-relaxed">
            Pick a Modern Storage® location near you, reserve a unit, and confirm the truck for your move-in day. Trucks fill quickly on weekends — earlier is better.
          </p>
          <p className="text-red-100/80 text-sm mb-10 max-w-2xl mx-auto leading-relaxed">
            Available at participating Modern Storage® locations in Little Rock, North Little Rock, Springdale, and Hot Springs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#locations"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Find a Location
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={PHONE_NUMBER_HREF}
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
              </svg>
              Call {PHONE_NUMBER_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
