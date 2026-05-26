import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { SITE_URL, LOCATIONS } from '@/lib/site'
import { getLocations, getSiteSettings } from '@/lib/data'
import { getLocationPageContent } from '@/lib/location-pages'
import { buildLocationSchema } from '@/lib/schema'
import { buildDirectionsUrl } from '@/lib/geo'
import FaqAccordion from '@/components/FaqAccordion'
import LocationMap from '@/components/LocationMap'

// Re-render every 60s to pick up Supabase edits.
export const revalidate = 60

/**
 * Statically generate one HTML page per location at build time. This is what
 * makes /locations/west-little-rock, /locations/shackleford, etc. each a real
 * indexable URL in the sitemap with its own meta tags + JSON-LD.
 */
export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }))
}

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loc = LOCATIONS.find((l) => l.slug === params.slug)
  if (!loc) return {}

  // loc.name already contains "Modern Storage®" so don't append it again here
  const title = `Self Storage in ${loc.city}, AR | ${loc.name}`
  const description = `${loc.name} at ${loc.streetAddress}, ${loc.city}, ${loc.state} ${loc.zip}. ${(loc.badges as readonly string[]).join(', ')}. Reserve online or call ${loc.phone}.`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: SITE_URL + '/locations/' + loc.slug },
    openGraph: {
      title,
      description,
      url: SITE_URL + '/locations/' + loc.slug,
      siteName: 'Modern Storage®',
      type: 'website',
      images: [
        {
          url: loc.image,
          width: 1600,
          height: 1000,
          alt: loc.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [loc.image],
    },
  }
}

export default async function LocationPage({ params }: Props) {
  // Resolve location from Supabase (with hardcoded fallback) so live edits flow.
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()])
  const loc = locations.find((l) => l.slug === params.slug)

  if (!loc) {
    notFound()
  }

  const content = getLocationPageContent(loc.slug)
  if (!content) {
    notFound()
  }

  // Find sibling locations in the same region for cross-linking
  const siblings = locations
    .filter((l) => l.region === loc.region && l.slug !== loc.slug)
    .slice(0, 3)

  const directionsUrl = buildDirectionsUrl(loc)

  // ── JSON-LD ──────────────────────────────────────────────
  const localBusiness = buildLocationSchema(loc, settings.phoneDisplay)
  // Augment with opening hours placeholder + URL pointing at this page
  const localBusinessFull = {
    ...localBusiness,
    url: SITE_URL + '/locations/' + loc.slug,
    hasMap: directionsUrl,
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: SITE_URL + '/locations' },
      {
        '@type': 'ListItem',
        position: 3,
        name: loc.name,
        item: SITE_URL + '/locations/' + loc.slug,
      },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const jsonLd = [localBusinessFull, breadcrumb, faqPage]

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
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/locations" className="hover:text-modern-red transition-colors">
                  Locations
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">{loc.city}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                {loc.region}
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
                Self Storage in <span className="text-modern-red">{loc.city}, AR</span>
              </h1>
              <p className="text-gray-300 text-xl font-bold mb-2">{loc.name}</p>
              <p className="text-gray-400 text-base leading-relaxed mb-6">{content.subtitle}</p>

              {/* NAP block — fully crawlable text */}
              <address className="not-italic text-sm text-gray-300 mb-8 space-y-1">
                <p className="font-bold text-white">{loc.streetAddress}</p>
                <p>
                  {loc.city}, {loc.state} {loc.zip}
                </p>
                <p>
                  <a href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`} className="text-white hover:text-modern-red transition-colors">
                    {loc.phone}
                  </a>
                </p>
              </address>

              <div className="flex flex-wrap gap-3">
                <a
                  href={loc.reservationUrl}
                  aria-label={`Reserve a unit at ${loc.name}`}
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
                >
                  See Available Units
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Get directions to ${loc.name}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  Get Directions
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`}
                  aria-label={`Call ${loc.name} at ${loc.phone}`}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold px-3 py-3 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                  </svg>
                  Call {loc.phone}
                </a>
              </div>
            </div>

            {/* Right — facility photo */}
            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] bg-gray-800 relative">
                <Image
                  src={loc.image}
                  alt={loc.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">{loc.alt}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── MAP + STORAGE OPTIONS ─────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Find us
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-4">
                {loc.name}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {loc.streetAddress}, {loc.city}, {loc.state} {loc.zip}. Click the pin on the map for
                quick links to reserve a unit or get driving directions.
              </p>
              <LocationMap location={loc} />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Storage options
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-6">
                What this facility offers
              </h2>
              <ul className="space-y-3 mb-8">
                {loc.badges.map((badge) => (
                  <li
                    key={badge}
                    className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 border border-gray-200"
                  >
                    <svg
                      className="w-5 h-5 text-modern-red shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-bold text-charcoal text-sm">{badge}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <a
                  href={loc.reservationUrl}
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                >
                  See Available Units →
                </a>
                <Link
                  href="/ai-storage-size-finder"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200"
                >
                  Find My Unit Size
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THIS LOCATION ──────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
            About this location
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-6">
            Self Storage in {loc.city}, Arkansas
          </h2>
          {content.needsLocalCopy && (
            <p className="text-xs font-bold uppercase tracking-widest text-modern-red/70 mb-4">
              [Replace with local copy before final review]
            </p>
          )}
          <div className="space-y-5 text-gray-700 leading-relaxed">
            {content.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {content.nearby.length > 0 && (
            <div className="mt-12">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
                Service area
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {content.nearby.map((item) => (
                  <div
                    key={item.label}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-100"
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <h3 className="font-black text-charcoal text-sm leading-tight">{item.label}</h3>
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-600 leading-relaxed ml-6">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── NEARBY MODERN STORAGE® LOCATIONS ─────────────── */}
      {siblings.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Also serving the area
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
                Other Modern Storage® locations in the {loc.region}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {siblings.map((sib) => (
                <article
                  key={sib.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-gray-100">
                    <Image
                      src={sib.image}
                      alt={sib.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-black text-charcoal text-lg leading-tight mb-1">{sib.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{sib.streetAddress}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {sib.city}, {sib.state} {sib.zip}
                    </p>
                    <Link
                      href={'/locations/' + sib.slug}
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-gray-800 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                    >
                      View {sib.city} location
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Frequently Asked Questions
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              {loc.name} FAQs
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Common questions about storage at Modern Storage® {loc.city}.
            </p>
          </div>
          <FaqAccordion items={content.faqs} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
                Reserve a Unit at {loc.name}
              </h2>
              <p className="text-red-100 text-lg leading-relaxed mb-3">
                Pick your unit size, check live pricing, and reserve online in a few minutes.
              </p>
              <p className="text-red-100/80 text-sm">
                {loc.streetAddress} · {loc.city}, {loc.state} {loc.zip} ·{' '}
                <a href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`} className="underline hover:text-white">
                  {loc.phone}
                </a>
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <a
                href={loc.reservationUrl}
                className="bg-white text-modern-red font-black px-6 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
              >
                See Available Units
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-charcoal text-white font-black px-6 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center justify-center gap-2"
              >
                Get Directions →
              </a>
              <Link
                href="/locations"
                className="text-white/90 hover:text-white font-bold text-sm text-center pt-2 transition-colors"
              >
                ← See all Modern Storage® locations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
