import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getLocations, getSiteSettings } from '@/lib/data'
import {
  HOUSEHOLD_UNIT_SIZES,
  LIFE_TRANSITIONS,
  WHY_CHOOSE_MODERN,
  DRIVE_UP_VS_CLIMATE,
  HOUSEHOLD_FAQS,
} from '@/lib/household-storage'
import FaqAccordion from '@/components/FaqAccordion'
import LocationFinder from '@/components/LocationFinder'
import { buildLocationSchemaList } from '@/lib/schema'

export const revalidate = 60

const PAGE_PATH = '/household-storage'
// Hero swapped a second time, per design feedback (2026-05-30): the
// previous Riverdale handshake photo read as a customer-service /
// leasing-office image, which fought the page headline about moving,
// renovating, and extra space. The non-climate unit interior shows a
// packed household-storage scene — boxes, furniture, real stuff — so
// the image now ANSWERS the headline instead of competing with it.
//
// Source is 1254x1254 (square) — wired into aspect-[1/1] below so we
// render at native pixel density with no crop and no upscaling beyond
// the natural retina factor.
const HERO_IMAGE = '/images/Nonclimate-Storage-unit-Modern-Storage.png'
const HERO_ALT =
  'Modern Storage® non-climate drive-up unit packed with household furniture and boxes — Arkansas household storage for moves and renovation'
const TRUCK_IMAGE = '/images/modern-storage-free-moving-truck.jpg'
const TRUCK_ALT =
  'Modern Storage® free moving truck included with new household storage rentals at participating locations'

export const metadata: Metadata = {
  // Title trimmed from 79 to 53 chars to clear the Semrush "title too
  // long" flag and avoid Google SERP truncation. The full "Moving,
  // Renovating & Extra Space" framing stays in the H1 and meta
  // description where it isn't competing with the brand mark for space.
  title: {
    absolute: 'Household Storage Units in Arkansas | Modern Storage®',
  },
  description:
    'Household storage units for moving, renovating, downsizing, and everyday extra space. Flexible month-to-month rentals, drive-up and climate-controlled options, free moving truck with new rentals at 10 Modern Storage® locations.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Household Storage Units for Moving, Renovating & Extra Space | Modern Storage®',
    description:
      'Temporary household storage for moves, renovations, downsizing, and life transitions. Month-to-month rentals with a free moving truck — drive-up and climate-controlled options available.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Household Storage Units for Moving, Renovating & Extra Space | Modern Storage®',
    description:
      'Flexible household storage for moves, renovations, and life transitions — month-to-month at 10 Modern Storage® locations.',
    images: [HERO_IMAGE],
  },
}

const TRUST_BULLETS = [
  'Month-to-month rentals',
  '10 convenient locations',
  'Drive-up and indoor options',
  'Free moving truck with new rentals',
  'Online reservations in minutes',
]

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Household Self Storage',
    name: 'Household Storage Units for Moving, Renovating & Extra Space',
    description:
      'Residential and household self-storage at 10 Modern Storage® locations. Built for moving, renovating, downsizing, growing families, life transitions, and seasonal storage. Drive-up and climate-controlled options available, with a free moving truck at participating locations. Month-to-month, no long-term contract.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    // Repointed to sitewide #organization @id to avoid emitting a nested
    // SelfStorage with no PostalAddress (a Semrush markup-error trigger).
    provider: { '@id': SITE_URL + '/#organization' },
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

  // Brand-level LocalBusiness block removed: schema.org + Semrush flag
  // LocalBusiness nodes that lack a real PostalAddress. The brand entity
  // spans 10 physical locations and doesn't map to a single address. The
  // sitewide Organization block covers brand identity; per-facility
  // SelfStorage blocks emitted below carry full street addresses.

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

  return [service, breadcrumb, faqPage]
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
  const jsonLd = [
    ...buildJsonLd(),
    ...buildLocationSchemaList(locations, settings.phoneDisplay),
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

      {/* ── HERO — residential / transitional positioning ────────
          Repositioned per SEO audit: moving, extra space, renovating,
          life transitions. Climate-controlled is NOT in the headline
          and is mentioned as one of several available formats only.

          Hero layout tightened per design feedback (2026-05-30):
            - py reduced from 16/24 → 10/16 (~30%) so there's less
              charcoal padding above and below the content.
            - items-center → lg:items-stretch so the image card fills
              the full height of the text column instead of centering
              and feeling like an afterthought.
            - Image container went from aspect-[4/3] (short + wide) to
              aspect-[4/5] on mobile + flex-1 + min-h on desktop so the
              image fills from the headline down through the buttons.
            - Caption rewritten and upsized so it actually pulls weight. */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold text-gray-500">
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

          {/* Grid columns biased toward the image (~45/55 text/image)
              per design feedback note 4. Also reverted to lg:items-center
              so the image vertically aligns with the headline block
              instead of stretching alongside it — the prior items-stretch
              forced a portrait crop on a landscape source, which upscaled
              the cropped center region (~1.28× on retina) and softened
              the photo. With the native landscape aspect ratio below the
              image stays at native pixel density. */}
          <div className="grid lg:grid-cols-[5fr_6fr] gap-8 lg:gap-10 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Household Storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Household Storage Units for <span className="text-modern-red">Moving, Renovating</span> &amp; Everyday Extra Space
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Store furniture, boxes, seasonal items, and household belongings with flexible month-to-month storage at Modern Storage®. Drive-up and indoor storage options available depending on location.
              </p>
              {/* Row 1 — audience-split pills (transactional intent first).
                  New Rentals (red) dials the centralized line; Existing
                  Customers (white with red text) opens the modernstorage.com
                  tenant portal. Promoted ABOVE the browse CTAs because
                  call/portal are the higher-converting next actions. */}
              <div className="flex flex-wrap gap-3 mb-3">
                <a
                  href={PHONE_NUMBER_HREF}
                  aria-label={`Call for New Rentals at ${PHONE_NUMBER_DISPLAY}`}
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-6 py-3 rounded-full transition-colors text-sm shadow-md"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                  </svg>
                  Call for New Rentals
                </a>
                <a
                  href="https://www.modernstorage.com/self-storage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Existing Customers — manage your account at modernstorage.com"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-modern-red font-bold px-6 py-3 rounded-full transition-colors text-sm shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-3-6.65" />
                  </svg>
                  Existing Customers
                </a>
              </div>
              {/* Row 2 — browse intents (transparent pills). */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="#locations"
                  aria-label="Reserve a household storage unit at a Modern Storage® location near you"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  Reserve a Unit
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  Find a Nearby Location
                </Link>
                <Link
                  href="#sizes"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  Check Unit Availability
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

            {/* Hero image card. Container is aspect-[1/1] to match the
                new source photo's native 1254x1254 dimensions — no
                cropping, no aspect-ratio mismatch upscaling. The image
                shows a packed non-climate unit (boxes + household
                furniture) so it directly visually answers the headline
                about moving, renovating, and extra space.

                quality={90} (Next.js default is 75) keeps the WebP/AVIF
                re-encoder from softening the photo. */}
            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-800 relative aspect-[1/1]">
                <Image
                  src={HERO_IMAGE}
                  alt={HERO_ALT}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
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
            What kind of storage unit should I choose for moving or extra space?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Match the unit to <strong>what you&apos;re storing</strong> and <strong>how long</strong>. Climate-controlled is the safer choice for furniture, electronics, and anything you want to keep in livable condition; drive-up works for short moves, tools, and durable items you&apos;ll access often.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Choose climate-controlled if:</p>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-outside ml-4">
                <li>You&apos;re storing furniture, mattresses, electronics, or photos</li>
                <li>Storage is longer than ~2–3 months</li>
                <li>You&apos;re protecting items that warp, mildew, or fade in heat and humidity</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Choose drive-up if:</p>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-outside ml-4">
                <li>You&apos;re storing during a short-term move</li>
                <li>You&apos;re storing tools, seasonal items, or durable goods</li>
                <li>Easy truck access matters more than environmental protection</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>In Arkansas:</strong> summers regularly run 95–100°F+ with humidity in the 70–90% range, which over a few months damages wood furniture, mattresses, photos, and electronics stored in garages or outdoor units. Climate-controlled units reduce that exposure and keep household items in livable condition. Common renovation or downsizing scenarios — between leases, summer overflow, life transitions — usually call for climate-controlled if anything in the load is finish-, fabric-, or moisture-sensitive.
          </p>
          <p>
            <Link href="/size-guide" className="text-modern-red font-bold hover:underline">→ See the unit size guide to match a size to what you&apos;re storing</Link>
          </p>
        </div>
      </section>

      {/* ── LIFE TRANSITIONS — moved UP per SEO audit ────────────
          This was the strongest section on the page and now leads
          the body. Establishes WHY people need household storage
          before any directory or size grid. */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              When household storage helps
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Flexible Storage During Real-Life Transitions
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Households use Modern Storage® for predictable life moments and unexpected ones alike. Create extra space without making permanent decisions — month-to-month rentals make it easy to start, extend, or close out a unit on your schedule.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LIFE_TRANSITIONS.map((t) => (
              <div
                key={t.title}
                className="bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 transition-colors"
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

      {/* ── UNIT SIZE GUIDE ──────────────────────────────────── */}
      <section id="sizes" className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Unit Sizes</p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Household Storage Unit Sizes
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Six sizes covering closet overflow through whole-home moves. Availability varies by location — reserve online and the team will match you to the right unit at the right facility. Not sure which size? Try the{' '}
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
            {HOUSEHOLD_UNIT_SIZES.map((u) => (
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
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="flex items-baseline gap-3 mb-5 flex-wrap">
                    <span className="font-bebas text-6xl lg:text-7xl text-charcoal leading-none">{u.size}</span>
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

                  <div className="mt-auto">
                    <Link
                      href="#locations"
                      aria-label={`Find a ${u.size} household storage unit at a nearby Modern Storage® location`}
                      className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-5 py-3 rounded-full transition-colors w-full"
                    >
                      Find a {u.size} Unit Near You
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

      {/* ── WHY CHOOSE MODERN STORAGE® — NEW differentiator section
          The auditor flagged this as missing entirely. 8 quick
          differentiators help conversion by addressing "why this
          company over the one down the street?" */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Why customers choose us
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Why Choose Modern Storage® for Household Storage
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Storage is the easy part. Modern Storage® is built to make the rest of the move — reserving, paying, picking a size, getting to the unit — feel just as easy. Eight reasons households across the region keep choosing us.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE_MODERN.map((c) => (
              <div
                key={c.title}
                className="bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 transition-colors"
              >
                <h3 className="font-black text-charcoal mb-2 leading-tight">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRIVE-UP vs CLIMATE-CONTROLLED — NEW segmentation ────
          Auditor: "Right now the page blends both together. Add a
          short section…then link climate users to the dedicated
          climate page." */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Pick the right format
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              Drive-Up vs. Climate-Controlled Household Storage
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Two practical formats for two different use cases. Most Modern Storage® locations offer both, so you can pick what matches your belongings — not what matches the building.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Drive-Up card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Drive-up</p>
              <h3 className="text-2xl font-black text-white mb-3 leading-tight">
                {DRIVE_UP_VS_CLIMATE.driveUp.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-5">
                {DRIVE_UP_VS_CLIMATE.driveUp.intro}
              </p>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Best for</p>
              <ul className="space-y-2">
                {DRIVE_UP_VS_CLIMATE.driveUp.bestFor.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Climate-Controlled card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Climate-Controlled</p>
              <h3 className="text-2xl font-black text-white mb-3 leading-tight">
                {DRIVE_UP_VS_CLIMATE.climate.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-5">
                {DRIVE_UP_VS_CLIMATE.climate.intro}
              </p>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Best for</p>
              <ul className="space-y-2 mb-6">
                {DRIVE_UP_VS_CLIMATE.climate.bestFor.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={DRIVE_UP_VS_CLIMATE.climate.deepLink}
                className="inline-flex items-center gap-1 text-sm font-bold text-modern-red hover:text-white transition-colors"
              >
                {DRIVE_UP_VS_CLIMATE.climate.deepLinkLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE MOVING TRUCK ───────────────────────────────── */}
      <section id="moving-truck" className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-100 relative">
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
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
                Move In with One Trip — Not Two
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Modern Storage® offers a free moving truck with new household storage rentals at participating locations. Load your furniture, appliances, and boxes once, then drive straight to your unit. No second rental, no second trip, no second pickup line at the truck-rental counter.
              </p>
              <p className="text-sm text-gray-500 italic mb-8">
                Truck availability, mileage limits, requirements, and location participation may vary.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/free-moving-truck"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  See Free Moving Truck Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="#locations"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold px-7 py-3.5 rounded-full transition-colors text-sm"
                >
                  Reserve a Unit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS — moved DOWN per SEO audit ─────────────────
          Was second from the top. Now appears AFTER hero, life
          transitions, sizes, why-choose, drive-up-vs-climate, and
          free truck — so customers have understood the category
          before being asked to pick a facility. */}
      <section id="locations" className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">10 Locations</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Find Household Storage Near You
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Modern Storage® has 10 convenient locations across the central and Northwest regions — Little Rock, West Little Rock, North Little Rock, Riverdale, Maumelle, Bryant, Hot Springs, Bentonville, Springdale, and Lowell. Filter by region, click a pin for details, and reserve online from the nearest facility.
            </p>
          </div>
          <LocationFinder locations={locations} />
        </div>
      </section>

      {/* ── RELATED STORAGE OPTIONS ─────────────────────────── */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Need a different kind of storage?
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Other Modern Storage® Options
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
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
              href="/rv-boat-vehicle"
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Household Storage FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Answers to the most common questions about household and residential self-storage — unit sizes, temporary storage during moves and renovations, college storage, the free moving truck, online reservations, and how Modern Storage® compares.
            </p>
          </div>
          <FaqAccordion items={HOUSEHOLD_FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
                Reserve Your Household Storage Unit
              </h2>
              <p className="text-red-100 text-lg leading-relaxed mb-6">
                Pick a nearby Modern Storage® location, choose a size, and reserve online in minutes. Free moving truck available with new rentals at participating locations.
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
                href={PHONE_NUMBER_HREF}
                className="bg-white/10 text-white font-bold px-6 py-3.5 rounded-full hover:bg-white/20 transition-colors text-sm border border-white/30 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                </svg>
                Call for New Rentals
              </a>
              <a
                href="https://www.modernstorage.com/self-storage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Existing customers — see all Modern Storage® locations"
                className="bg-white/15 text-white font-bold px-6 py-3.5 rounded-full hover:bg-white/25 transition-colors text-sm border border-white/40 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-3-6.65" />
                </svg>
                Existing Customers
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
