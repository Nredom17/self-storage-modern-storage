import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { SITE_URL } from '@/lib/site'
import { getLocations, getSiteSettings } from '@/lib/data'
import { buildLocationSchemaList } from '@/lib/schema'
import LocationFinder from '@/components/LocationFinder'
import NearMeSearch from '@/components/NearMeSearch'

export const revalidate = 60

const PAGE_PATH = '/locations'

export const metadata: Metadata = {
  title: { absolute: 'Modern Storage® Locations in Arkansas | Find Self Storage Near You' },
  description:
    'Find a Modern Storage® self-storage location in Arkansas. 10 facilities across West Little Rock, Shackleford, Riverdale, North Little Rock, Maumelle, Bryant, Hot Springs, Bentonville, Springdale, and Lowell. Reserve online.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Modern Storage® Locations in Arkansas',
    description:
      '10 Modern Storage® self-storage facilities across central and Northwest Arkansas. Climate-controlled, drive-up, boat/RV, and business storage options.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Storage® Locations in Arkansas',
    description: '10 Modern Storage® self-storage facilities across Arkansas.',
  },
}

export default async function LocationsHubPage() {
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()])

  // ── JSON-LD ─────────────────────────────────────────────
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: SITE_URL + PAGE_PATH },
    ],
  }

  // Itemized listing of every facility — each is a SelfStorage entity
  const locationSchemas = buildLocationSchemaList(locations, settings.phoneDisplay)

  const jsonLd = [breadcrumb, ...locationSchemas]

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
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Locations</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
              10 Locations
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Modern Storage® Locations in <span className="text-modern-red">Arkansas</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              10 Modern Storage® self-storage facilities serve central Arkansas and Northwest Arkansas — West Little Rock, Shackleford, Riverdale, North Little Rock, Maumelle Blvd, Bryant, Hot Springs, Bentonville, Springdale, and Lowell. Pick a location below to see its address, available storage options, photos, FAQs, and live reservation page.
            </p>
          </div>
        </div>
      </section>

      {/* ── NEAR-ME SEARCH ─────────────────────────────────── */}
      <section id="near-me" className="bg-gray-50 pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <Suspense
            fallback={
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                  Find Storage Near You
                </p>
                <div className="h-12 bg-gray-100 animate-pulse rounded-full" />
              </div>
            }
          >
            <NearMeSearch locations={locations} />
          </Suspense>
        </div>
      </section>

      {/* ── LOCATION FINDER ──────────────────────────────────── */}
      <section id="locations" className="bg-gray-50 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <LocationFinder locations={locations} />
        </div>
      </section>

      {/* ── ALL CITY PAGES ──────────────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              City pages
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Self Storage by City
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Each Modern Storage® location has its own page with address, available storage
              options, embedded map, FAQs, and a direct link to the live reservation page.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <article
                key={loc.slug}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-gray-100">
                  <Image
                    src={loc.image}
                    alt={loc.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-charcoal text-white px-2.5 py-1 rounded-full">
                    {loc.region}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-black text-charcoal text-lg leading-tight mb-1">{loc.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{loc.streetAddress}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {loc.city}, {loc.state} {loc.zip}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {loc.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[10px] font-bold uppercase tracking-wide bg-white text-gray-700 px-2.5 py-1 rounded-full border border-gray-200"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <Link
                      href={'/locations/' + loc.slug}
                      className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                    >
                      View {loc.city} location
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    {/* New Rentals = click-to-call; Existing Customers =
                        all-locations directory (account access / tenant portal). */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${settings.phoneDisplay.replace(/[^\d+]/g, '')}`}
                        aria-label={`Call for new rentals at ${loc.name} — ${settings.phoneDisplay}`}
                        className="inline-flex items-center justify-center gap-1.5 border border-gray-200 hover:border-modern-red text-charcoal hover:text-modern-red text-[11px] font-bold px-2 py-2 rounded-full transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                        </svg>
                        New Rentals
                      </a>
                      <a
                        href="https://www.modernstorage.com/self-storage"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Existing customers — see all Modern Storage® locations"
                        className="inline-flex items-center justify-center gap-1.5 border border-gray-200 hover:border-modern-red text-charcoal hover:text-modern-red text-[11px] font-bold px-2 py-2 rounded-full transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-3-6.65" />
                        </svg>
                        Existing
                      </a>
                    </div>
                    <a
                      href={loc.reservationUrl}
                      aria-label={`See available units at ${loc.name}`}
                      className="text-xs font-bold text-charcoal/70 hover:text-modern-red transition-colors text-center"
                    >
                      See available units →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Find Your Modern Storage® Location Today
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Pick the location nearest you, view live availability, and reserve online in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#locations"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Browse the Map
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={`tel:${settings.phoneDisplay.replace(/[^\d+]/g, '')}`}
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
              </svg>
              Call for New Rentals
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
