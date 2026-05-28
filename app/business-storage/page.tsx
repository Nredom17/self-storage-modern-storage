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
  'Mini-warehouse units led by Modern Storage® Riverdale',
  'Loading docks at select locations',
  'Package and freight acceptance',
  'Electricity in select units',
  '24/7 access where available',
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
    provider: {
      '@type': 'SelfStorage',
      name: 'Modern Storage®',
      url: SITE_URL + '/',
      telephone: phoneDisplay,
    },
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
                Mini-warehouse and business storage at Modern Storage® locations across Arkansas — led by Modern Storage® Riverdale. Loading docks, package and freight acceptance, electricity in select units, and 24/7 access where available.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="#contact"
                  aria-label="Get a business storage quote from Modern Storage®"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  Get a Business Storage Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href={PHONE_NUMBER_HREF}
                  aria-label={`Call for New Rentals at ${PHONE_NUMBER_DISPLAY}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors border border-white/20 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                  </svg>
                  Call for New Rentals
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
                Business-friendly space at Modern Storage® Riverdale.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── LEAD LOCATION: RIVERDALE ────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Lead business location
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
                Modern Storage® Riverdale — Central Arkansas&apos;s Mini-Warehouse Hub
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Modern Storage® Riverdale at 2510 Cantrell Rd in Little Rock is purpose-built for commercial customers. Climate-controlled mini-warehouse units, dock-height loading, ground-floor access, and extended-hours availability — all five minutes from downtown.
              </p>
              <ul className="space-y-2.5 mb-7">
                {[
                  'Loading dock access for pallets, freight, and box trucks',
                  'Package and freight receiving for e-commerce and contractors',
                  'Climate-controlled mini-warehouse units',
                  'Ground-floor access — no stairs or shared elevators',
                  'Extended access hours for active business use',
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
                  Request a Riverdale Quote
                </Link>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Modern%20Storage%C2%AE%20Riverdale%2C%202510%20Cantrell%20Rd%2C%20Little%20Rock%2C%20AR%2072202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Get Directions to Riverdale
                </a>
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
              Mini-warehouse units at Modern Storage® are configured for active commercial use, not long-term household storage. Availability of each feature varies by location — confirm in your inquiry.
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
              For organizations that need more than a single mini-warehouse — or recurring access across multiple Modern Storage® Arkansas locations — these structured programs replace ad-hoc rentals.
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
                <a
                  href={PHONE_NUMBER_HREF}
                  className="inline-flex items-center gap-2 text-charcoal font-black text-lg hover:text-modern-red transition-colors"
                >
                  <svg className="w-5 h-5 text-modern-red" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                  </svg>
                  {PHONE_NUMBER_DISPLAY}
                </a>
                <p className="text-xs text-gray-500 mt-3">
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
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Business Storage &amp; Mini-Warehouse FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Common questions about Modern Storage® mini-warehouse space — loading docks, package acceptance, electricity, 24/7 access, climate control, and partner programs for businesses across Arkansas.
            </p>
          </div>
          <FaqAccordion items={BUSINESS_FAQS} />
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
