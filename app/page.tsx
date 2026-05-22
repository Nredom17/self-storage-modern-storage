import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  SITE_URL,
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_HREF,
  THEME_PAGES,
  UNIT_SIZES,
  WHY_US,
  FAQS,
  REVIEWS,
} from '@/lib/site'
import FaqAccordion from '@/components/FaqAccordion'
import LocationFinder from '@/components/LocationFinder'

const HERO_IMAGE = '/images/modern-storage-self-storage-units-arkansas.jpg'
const HERO_ALT = 'Modern Storage® self-storage facility in Arkansas with clean units and moving truck'

export const metadata: Metadata = {
  title: 'Self Storage Units in Arkansas | Modern Storage®',
  description:
    'Find self-storage units across Arkansas with Modern Storage®. Climate-controlled storage, household storage, boat and RV parking, business storage, and free moving truck options available.',
  alternates: {
    canonical: SITE_URL + '/',
  },
  openGraph: {
    title: 'Self Storage Units in Arkansas | Modern Storage®',
    description:
      'Find clean, convenient storage units across Arkansas at Modern Storage®, including climate-controlled, household, business, boat, RV, and vehicle storage.',
    url: SITE_URL + '/',
    siteName: 'Modern Storage® Self Storage',
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
    title: 'Self Storage Units in Arkansas | Modern Storage®',
    description:
      'Clean, convenient self-storage units across Arkansas — climate-controlled, household, business, boat, RV, and vehicle storage.',
    images: [HERO_IMAGE],
  },
}

const TRUST_STRIP = [
  '10 Arkansas locations',
  'Climate-controlled units available',
  'Boat, RV, and vehicle storage',
  'Free moving truck with new rentals',
  'Best of the Best 2023, 2024, 2025',
]

function buildJsonLd() {
  const selfStorage = {
    '@context': 'https://schema.org',
    '@type': 'SelfStorage',
    '@id': SITE_URL + '/#selfstorage',
    name: 'Modern Storage®',
    url: SITE_URL + '/',
    image: SITE_URL + HERO_IMAGE,
    telephone: PHONE_NUMBER_DISPLAY,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'AR',
      addressCountry: 'US',
    },
    description:
      'Modern Storage® operates 10 self-storage facilities across Arkansas with climate-controlled, household, business, boat, RV, and vehicle storage.',
    sameAs: [
      'https://www.modernstorage.com',
      'https://www.instagram.com/modern.storage',
      'https://www.facebook.com/modernstorage',
    ],
  }

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_URL + '/#localbusiness',
    name: 'Modern Storage®',
    url: SITE_URL + '/',
    telephone: PHONE_NUMBER_DISPLAY,
    image: SITE_URL + HERO_IMAGE,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'AR',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'State', name: 'Arkansas' },
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Self Storage',
    provider: { '@id': SITE_URL + '/#selfstorage' },
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

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [selfStorage, localBusiness, service, breadcrumb, faqPage]
}

export default function HomePage() {
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — headline + CTAs */}
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                10 Arkansas Locations
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Self Storage Units in <span className="text-modern-red">Arkansas</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                Find clean, convenient storage units across Arkansas, including climate-controlled storage, household storage, boat and RV parking, vehicle storage, and business storage.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="#locations"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  Find a Unit Near You
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="#storage-options"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors border border-white/20 text-sm"
                >
                  View Storage Options
                </Link>
              </div>

              {/* Trust strip */}
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-gray-400">
                {TRUST_STRIP.map((t) => (
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
              {/* Floating award badge */}
              <div className="absolute -bottom-5 -left-5 bg-modern-red text-white rounded-2xl px-5 py-3 shadow-xl hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-100">Best of the Best</p>
                <p className="text-lg font-black leading-none mt-0.5">2023 · 2024 · 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORAGE OPTIONS ──────────────────────────────────── */}
      <section id="storage-options" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Storage Options</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Choose the Right Storage Option
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              From climate-controlled household storage to boat, RV, and business storage — find the option built for what you need to store.
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

      {/* ── LOCATIONS ────────────────────────────────────────── */}
      <section id="locations" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Locations</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Find a Modern Storage® Location Near You
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              10 Modern Storage® facilities serving central Arkansas and Northwest Arkansas. Filter by region to find the closest location.
            </p>
          </div>
          <LocationFinder />
        </div>
      </section>

      {/* ── SIZE GUIDE PREVIEW ───────────────────────────────── */}
      <section id="size-guide" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Size Guide</p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                What Size Storage Unit Do I Need?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                A quick visual reference for the most popular Modern Storage® unit sizes. Climate-controlled and drive-up units available in most sizes.
              </p>
            </div>
            <Link
              href="/household-moving"
              className="inline-flex items-center gap-2 text-sm font-bold text-modern-red hover:text-modern-red-hover transition-colors"
            >
              See household storage guide →
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
                  href="/household-moving"
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
              Climate-Controlled Storage →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY MODERN STORAGE ───────────────────────────────── */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why Us</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Why People Choose Modern Storage®
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-modern-red transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-modern-red/10 text-modern-red flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-black text-charcoal mb-2 leading-tight">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE MOVING TRUCK ────────────────────────────────── */}
      <section id="moving-truck" className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
                <Image
                  src="/images/modern-storage-free-moving-truck.jpg"
                  alt="Modern Storage® Riverdale free moving truck available with new self-storage rentals at participating Arkansas locations"
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
                Modern Storage® offers a free moving truck with new rentals at participating locations, making move-in simpler and saving customers another truck rental.
              </p>
              <p className="text-sm text-gray-500 italic mb-8">
                Availability, requirements, and location participation may vary.
              </p>
              <Link
                href="#locations"
                className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
              >
                Find a Storage Unit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Reviews</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              What Customers Say About Modern Storage®
            </h2>
          </div>
          {/* Replace these with real Google reviews before launch. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <figure
                key={r.author + r.location}
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

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Frequently Asked Questions
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Self Storage Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Find answers to the most common self storage FAQs — unit sizes, climate-controlled storage, boat and RV storage, business storage, free moving truck, online reservations, and finding the nearest Modern Storage® location in Arkansas.
            </p>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section id="reserve" className="bg-modern-red py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Find Your Modern Storage® Unit Today
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
              href={PHONE_NUMBER_HREF}
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
              </svg>
              Call Modern Storage®
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
