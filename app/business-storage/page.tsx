import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL, BUSINESS_CONTACT_EMAIL } from '@/lib/site'
import { getLocations, getSiteSettings } from '@/lib/data'
import {
  BUSINESS_FEATURES,
  BUSINESS_USE_CASES,
  PARTNER_PROGRAMS,
  BUSINESS_FAQS,
} from '@/lib/business-storage'
import FaqAccordion from '@/components/FaqAccordion'
import BusinessContactForm from '@/components/BusinessContactForm'

export const revalidate = 60

const PAGE_PATH = '/business-storage'
const HERO_IMAGE = '/images/modern-storage-riverdale-business-conference.jpg'
const HERO_ALT =
  'Business storage and conference space at Modern Storage® Riverdale in Little Rock Arkansas'
const RIVERDALE_IMAGE = '/images/modern-storage-riverdale-facility-exterior.jpg'
const RIVERDALE_ALT =
  'Modern Storage® Riverdale facility exterior at sunset — lead business storage location in central Arkansas'

export const metadata: Metadata = {
  title: {
    absolute: 'Business Storage & Mini-Warehouse Space in Arkansas | Modern Storage®',
  },
  description:
    'Business storage and mini-warehouse space at Modern Storage® across Arkansas, led by Modern Storage® Riverdale. Loading docks, package acceptance, electricity in select units, and 24/7 access where available — for e-commerce, contractors, restoration, staging, movers, and document archives.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Business Storage & Mini-Warehouse Space in Arkansas | Modern Storage®',
    description:
      'Mini-warehouse and business storage at Modern Storage® in Arkansas — loading docks, package acceptance, electricity in select units, and 24/7 access where available.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Storage & Mini-Warehouse Space in Arkansas | Modern Storage®',
    description: 'Mini-warehouse and business storage led by Modern Storage® Riverdale.',
    images: [HERO_IMAGE],
  },
}

const TRUST_BULLETS = [
  'Business storage at all Modern Storage® locations',
  'Loading dock access at Modern Storage® Riverdale',
  'Package & freight acceptance at participating locations',
  'Climate-controlled options available',
  'Electricity in select units',
  'Extended & 24/7 access at select locations',
]

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Business Storage and Mini-Warehouse Space',
    name: 'Business Storage & Mini-Warehouse Space in Arkansas',
    description:
      'Mini-warehouse and business storage units at Modern Storage® across Arkansas, led by Modern Storage® Riverdale. Loading docks, package and freight acceptance, electricity in select units, and 24/7 access where available — for e-commerce sellers, contractors, restoration and disaster-response crews, stagers, moving companies, and document archive customers.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    // Repointed to sitewide #organization @id to avoid emitting a nested
    // SelfStorage with no PostalAddress (a Semrush markup-error trigger).
    // The full-address LocalBusiness for Riverdale (the flagship business
    // storage facility) is still emitted below this Service block.
    provider: { '@id': SITE_URL + '/#organization' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Storage Use Cases',
      itemListElement: BUSINESS_USE_CASES.map((u) => ({
        '@type': 'Offer',
        url: SITE_URL + PAGE_PATH + '#use-cases',
        itemOffered: {
          '@type': 'Service',
          name: `${u.title} mini-warehouse storage`,
          description: u.body,
        },
      })),
    },
  }

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_URL + PAGE_PATH + '#localbusiness',
    name: 'Modern Storage® Riverdale',
    url: SITE_URL + '/',
    telephone: phoneDisplay,
    image: SITE_URL + RIVERDALE_IMAGE,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2510 Cantrell Rd',
      addressLocality: 'Little Rock',
      addressRegion: 'AR',
      postalCode: '72202',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'State', name: 'Arkansas' },
    description:
      'Modern Storage® Riverdale is the lead business storage and mini-warehouse location for central Arkansas — loading dock access, climate-controlled mini-warehouse units, ground-floor access, and extended-hours availability.',
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Business Storage', item: SITE_URL + PAGE_PATH },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: BUSINESS_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [service, localBusiness, breadcrumb, faqPage]
}

function FeatureIcon({ name }: { name: string }) {
  const common = 'w-6 h-6'
  switch (name) {
    case 'dock':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 17h18M3 17V9h12v8M15 13h4l2 4M7 21a2 2 0 100-4 2 2 0 000 4zM17 21a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      )
    case 'package':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" />
        </svg>
      )
    case 'bolt':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      )
    case 'clock':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 7v5l3 2" />
        </svg>
      )
    default:
      return null
  }
}

export default async function BusinessStoragePage() {
  const [, settings] = await Promise.all([getLocations(), getSiteSettings()])
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
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Business Storage</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Business &amp; Mini-Warehouse
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Business Storage &amp; Mini-Warehouse Space in <span className="text-modern-red">Arkansas</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                Business storage and mini-warehouse space is available at every Modern Storage® location across Arkansas — for inventory, contractor equipment, records, staging furniture, e-commerce products, tools, and operational overflow. Modern Storage® Riverdale is the lead commercial location, with dock-height loading and freight-friendly access for higher-volume businesses.
              </p>
              {/* Row 1 — audience-split pills (transactional intent first).
                  New Rentals (red) dials the centralized line; Existing
                  Customers (white with red text) opens the modernstorage.com
                  tenant portal. */}
              <div className="flex flex-wrap gap-3 mb-3">
                <a
                  href="https://www.modernstorage.com/self-storage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Existing Customers — manage your account at modernstorage.com"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-modern-red font-bold px-7 py-3.5 rounded-full transition-colors text-sm shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.949.684V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5z" />
                  </svg>
                  Existing Customers
                </a>
                <a
                  href={PHONE_NUMBER_HREF}
                  aria-label={`Call for New Rentals at ${PHONE_NUMBER_DISPLAY}`}
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm shadow-md"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                  </svg>
                  Call for New Rentals
                </a>
              </div>
              {/* Row 2 — browse / quote intent (transparent pill). */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="#contact"
                  aria-label="Get a business storage quote from Modern Storage®"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors border border-white/20 text-sm"
                >
                  Get a Business Storage Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
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
                Business-friendly space at Modern Storage® Riverdale.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Quick-answer summary — decision engine. Short direct answer,
          two "Choose X if" decision blocks, Arkansas context, and a
          single soft internal link. Optimized for AI extraction and
          for visitors making a real format decision. */}
      <section className="bg-modern-red/5 border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Quick answer</p>
          <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-4">
            What&apos;s the best storage type for business inventory or equipment?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            It comes down to <strong>what you&apos;re storing</strong> and <strong>how often you need access</strong>. Climate-controlled is the safer choice for records, electronics, and packaged inventory; drive-up is the practical pick for tools, contractor gear, and operations that load and unload from a truck.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Choose climate-controlled if:</p>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-outside ml-4">
                <li>You&apos;re storing records, paper files, or electronics</li>
                <li>You&apos;re holding packaged e-commerce inventory or samples</li>
                <li>Items would be impacted by Arkansas heat and humidity</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Choose drive-up if:</p>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-outside ml-4">
                <li>You&apos;re storing contractor tools, equipment, or building materials</li>
                <li>Frequent truck access matters more than environmental protection</li>
                <li>Items are durable and handle weather swings</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>In Arkansas:</strong> summer heat and humidity routinely damage cardboard, paperwork, labels, and electronics in unconditioned storage — which is why most businesses with active inventory default to climate-controlled, while drive-up serves trades and contractor operations on the I-30 / I-40 / I-49 corridors. All units are month-to-month, so storage scales up or down with seasonal cycles, project ramp-ups, or growth. Units are intended for storage, not as active workspaces.
          </p>
          <p>
            <Link href="/locations/riverdale" className="text-modern-red font-bold hover:underline">→ See business storage at Modern Storage® Riverdale (ground-floor, 26‑ft truck access, package acceptance)</Link>
          </p>
        </div>
      </section>

      {/* ── LEAD LOCATION: RIVERDALE ────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Business storage across Arkansas
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
                Modern Storage® Business Storage for Inventory, Equipment &amp; Operations
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Modern Storage® locations support business storage for inventory, contractor equipment, records, e-commerce products, staging furniture, tools, and overflow space.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Business amenities may include conference room access, business centers with computers and printers, package acceptance, smart locks, powered doors, electricity in select units, climate control, ground-floor access, 4-foot-wide standard doors, and roll-up warehouse doors on select units.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                For businesses that need dock-height loading, <strong>Modern Storage® Riverdale</strong> offers loading dock access for pallets, freight, and box trucks.
              </p>
              <ul className="space-y-2.5 mb-7">
                {[
                  'Business storage available at all Modern Storage® locations',
                  'Package acceptance at participating locations',
                  'Conference room and business center access at select locations',
                  'Smart locks, powered doors, and electricity in select units',
                  '4-foot-wide doors on standard storage units',
                  'Roll-up warehouse doors on select warehouse units',
                  'Dock-height loading available at Riverdale',
                ].map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-charcoal">
                    <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Get a Business Storage Quote
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold px-6 py-3 rounded-full transition-colors text-sm"
                >
                  View Business Amenities
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-100 relative">
                <Image
                  src={RIVERDALE_IMAGE}
                  alt={RIVERDALE_ALT}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUSINESS FEATURES ───────────────────────────────── */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Mini-warehouse features
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              What Sets Business Storage Apart
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Business storage at Modern Storage® is built for active commercial use rather than simple household storage. Features vary by location, but businesses across Arkansas use Modern Storage® for inventory, contractor equipment, records, operational overflow, and staging. Modern Storage® Riverdale offers the broadest set of commercial features, including loading dock access — confirm the specifics for your preferred location in your inquiry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BUSINESS_FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-modern-red hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center mb-4">
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 className="font-black text-charcoal mb-2 leading-tight">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS STORAGE BY LOCATION ────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Business storage by location
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Where Arkansas Businesses Store
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every Modern Storage® location supports business storage. These facilities are the most popular with commercial customers — each with its own strengths for inventory, equipment, and operations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                slug: 'riverdale',
                name: 'Modern Storage® Riverdale',
                tag: 'Loading docks + package acceptance',
                blurb:
                  'Our flagship dock-access location — dock-height loading for pallets, freight, and box trucks, plus package and freight receiving, five minutes from downtown Little Rock.',
              },
              {
                slug: 'shackleford',
                name: 'Modern Storage® Shackleford',
                tag: 'Corporate & premium',
                blurb:
                  'Premium business storage in west Little Rock for corporate inventory, records, and professional overflow near the Shackleford Crossings corridor.',
              },
              {
                slug: 'west-little-rock',
                name: 'Modern Storage® West Little Rock',
                tag: 'Professional',
                blurb:
                  'Professional and small-business storage along the I-430 corridor in west Little Rock, with climate-controlled and drive-up options.',
              },
              {
                slug: 'bentonville',
                name: 'Modern Storage® Bentonville',
                tag: 'NWA business hub',
                blurb:
                  'A Northwest Arkansas business hub for vendors, suppliers, and e-commerce sellers near the Walmart Home Office area.',
              },
              {
                slug: 'springdale',
                name: 'Modern Storage® Springdale',
                tag: 'NWA business hub',
                blurb:
                  'Business storage on the Hwy 412 / I-49 corridor — convenient for Northwest Arkansas operations and inventory.',
              },
            ].map((f) => (
              <Link
                key={f.slug}
                href={`/locations/${f.slug}`}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-modern-red mb-2">{f.tag}</p>
                <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors mb-2">
                  {f.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{f.blurb}</p>
                <span className="mt-4 text-xs font-bold text-modern-red inline-flex items-center gap-1">
                  View location →
                </span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-8 max-w-3xl">
            Don&apos;t see your area? All 10 Modern Storage® locations offer business storage —{' '}
            <Link href="/locations" className="text-modern-red font-semibold hover:underline">
              see every location
            </Link>{' '}
            or tell us where you operate in the inquiry below.
          </p>
        </div>
      </section>

      {/* ── USE CASES ───────────────────────────────────────── */}
      <section id="use-cases" className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Built for these teams
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              Who Uses Modern Storage® Mini-Warehouse Space
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              A mini-warehouse beats a full lease for any team that needs commercial-grade storage without a full commercial footprint. These are the use cases we see most across Arkansas.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUSINESS_USE_CASES.map((u) => (
              <div
                key={u.title}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-modern-red rounded-2xl p-6 transition-all"
              >
                <h3 className="font-black text-white mb-2 leading-tight">{u.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-base leading-relaxed mt-10 max-w-3xl [&_a]:text-modern-red [&_a]:font-semibold [&_a:hover]:underline">
            Modern Storage® supports{' '}
            <Link href="/contractor-storage-little-rock">contractors across Little Rock</Link>, Bentonville,
            Springdale, and Northwest Arkansas; staging companies serving central Arkansas real estate
            markets; and e-commerce businesses operating throughout Arkansas. Suppliers and vendors in
            the Bentonville area can also see{' '}
            <Link href="/business-storage-bentonville">supplier &amp; business storage in Bentonville</Link>.
            Tell us where your crews, inventory, or projects are active and we&apos;ll point you to the
            closest fit among our{' '}
            <Link href="/locations">10 Arkansas locations</Link>.
          </p>
        </div>
      </section>

      {/* ── PARTNER PROGRAMS ────────────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Partner programs
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Programs for Volume, Property, and Industry Partners
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              For organizations that need more than a single mini-warehouse — or recurring access across multiple Modern Storage® Arkansas locations — these structured programs replace ad-hoc rentals. Many businesses use multiple Modern Storage® locations simultaneously depending on where crews, inventory, or projects are active, and our team can help coordinate business storage across Arkansas under a single point of contact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PARTNER_PROGRAMS.map((p) => (
              <div
                key={p.title}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all"
              >
                <h3 className="font-black text-charcoal mb-2 text-lg leading-tight">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS CONTACT FORM ───────────────────────────── */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Business inquiry
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Get a Business Storage Quote
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Tell our team a little about what you need to store, your preferred Modern Storage® location, and any access or amenity requirements. We&apos;ll respond with mini-warehouse options that fit.
              </p>
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                  Prefer to talk?
                </p>
                {/* Phone digits hidden per design pass — replaced with a
                    solid red call button. tel: number and full digits live
                    in href + aria-label so the button still dials and
                    screen readers still read the number aloud. */}
                <a
                  href={PHONE_NUMBER_HREF}
                  aria-label={`Call Modern Storage® new rentals at ${PHONE_NUMBER_DISPLAY}`}
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-5 py-3 rounded-full transition-colors text-sm shadow-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                  </svg>
                  Call New Rentals
                </a>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  Call the centralized Modern Storage® line and ask for the business storage team.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <BusinessContactForm inboxEmail={BUSINESS_CONTACT_EMAIL} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section id="faq" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Business Storage &amp; Mini-Warehouse FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Common questions about Modern Storage® mini-warehouse space — loading docks, package acceptance, electricity, 24/7 access, climate control, and partner programs for businesses across Arkansas.
            </p>
          </div>
          <FaqAccordion items={BUSINESS_FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
                Ready for Mini-Warehouse Space That Fits?
              </h2>
              <p className="text-red-100 text-lg leading-relaxed mb-6">
                Submit a quick business inquiry and the Modern Storage® team will respond with the right mini-warehouse at the right Arkansas location.
              </p>
              <p className="text-red-100/80 text-xs italic mb-8 lg:mb-0">
                Feature availability — loading docks, electricity, 24/7 access, package receiving — varies by location.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <Link
                href="#contact"
                className="bg-white text-modern-red font-black px-6 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
              >
                Get a Business Storage Quote
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
                Call for New Rentals
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
