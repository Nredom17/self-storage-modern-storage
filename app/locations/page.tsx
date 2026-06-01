import type { Metadata } from 'next'
import Link from 'next/link'
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

      {/* ── BROWSE BY REGION — compact accordion ─────────────────
          Replaces the previous full card grid (which duplicated the
          LocationFinder above). Uses native <details> for zero-JS,
          accessible, mobile-friendly expand/collapse. Each region
          opens to a lean list of facilities — name, address, direct
          phone (tap-to-call), and a link to the bespoke city page so
          SEO equity to /locations/[slug] is preserved. */}
      <section className="bg-white py-16 lg:py-20 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-8 lg:mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Browse by region
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Self Storage by City
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Tap a region to see the Modern Storage® locations there. Each facility links to its own city page with address, amenities, FAQs, and reservations.
            </p>
          </div>
          {/* Region groupings — explicit (not derived from loc.region)
              because Maumelle and North Little Rock currently share a
              region tag but display separately here. */}
          {(() => {
            const groups: { name: string; slugs: string[] }[] = [
              { name: 'Little Rock Area', slugs: ['west-little-rock', 'shackleford', 'riverdale', 'north-little-rock'] },
              { name: 'Northwest Arkansas', slugs: ['bentonville', 'springdale', 'lowell'] },
              { name: 'Maumelle', slugs: ['maumelle'] },
              { name: 'Bryant', slugs: ['bryant'] },
              { name: 'Hot Springs', slugs: ['hot-springs'] },
            ]
            return (
              <ul className="space-y-3">
                {groups.map((group) => {
                  const groupLocs = group.slugs
                    .map((s) => locations.find((l) => l.slug === s))
                    .filter((l): l is NonNullable<typeof l> => Boolean(l))
                  if (groupLocs.length === 0) return null
                  return (
                    <li key={group.name}>
                      <details className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden open:border-modern-red open:shadow-md transition-all">
                        <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-100 group-open:hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-modern-red/10 text-modern-red text-xs font-black">
                              {groupLocs.length}
                            </span>
                            <span className="font-black text-charcoal text-lg lg:text-xl tracking-tight">
                              {group.name}
                            </span>
                          </div>
                          <svg
                            className="w-5 h-5 text-charcoal/60 shrink-0 transition-transform group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="border-t border-gray-200 bg-white">
                          <ul className="divide-y divide-gray-100">
                            {groupLocs.map((loc) => (
                              <li key={loc.slug} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="min-w-0">
                                  <Link
                                    href={'/locations/' + loc.slug}
                                    className="font-black text-charcoal hover:text-modern-red transition-colors text-base leading-tight"
                                  >
                                    {loc.name}
                                  </Link>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {loc.streetAddress} · {loc.city}, {loc.state} {loc.zip}
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-2 shrink-0">
                                  <a
                                    href={`tel:+1${loc.phone.replace(/\D/g, '')}`}
                                    aria-label={`Call ${loc.name} at ${loc.phone}`}
                                    className="inline-flex items-center gap-1.5 bg-charcoal hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
                                  >
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                                    </svg>
                                    {loc.phone}
                                  </a>
                                  <Link
                                    href={'/locations/' + loc.slug}
                                    aria-label={`View ${loc.city} location page`}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-modern-red hover:text-modern-red-hover transition-colors px-2 py-1.5"
                                  >
                                    City page →
                                  </Link>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </li>
                  )
                })}
              </ul>
            )
          })()}
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
