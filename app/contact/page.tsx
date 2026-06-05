import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import { getLocations, getSiteSettings } from '@/lib/data'
import { buildLocationSchemaList } from '@/lib/schema'
import { buildDirectionsUrl } from '@/lib/geo'
import BusinessContactForm from '@/components/BusinessContactForm'

export const revalidate = 60

const PAGE_PATH = '/contact'

export const metadata: Metadata = {
  title: { absolute: 'Contact Modern Storage® | Self Storage in Arkansas' },
  description:
    'Contact Modern Storage® — call, send a message, or visit one of 10 self-storage locations across Arkansas. Phone and addresses for West Little Rock, Shackleford, Riverdale, North Little Rock, Maumelle, Bryant, Hot Springs, Bentonville, Springdale, and Lowell.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Contact Modern Storage®',
    description:
      'Phone, contact form, and 10 Arkansas self-storage location addresses for Modern Storage®.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Modern Storage®',
    description: 'Phone, contact form, and 10 Arkansas self-storage location addresses.',
  },
}

export default async function ContactPage() {
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()])

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: SITE_URL + PAGE_PATH },
    ],
  }
  const locationSchemas = buildLocationSchemaList(locations, settings.phoneDisplay)
  const jsonLd = [breadcrumb, ...locationSchemas]

  // Group cities by region for the directory section.
  const regions = ['Little Rock Area', 'North Little Rock', 'Bryant', 'Hot Springs', 'Northwest Arkansas'] as const
  const grouped = regions
    .map((r) => ({ region: r, locations: locations.filter((l) => l.region === r) }))
    .filter((g) => g.locations.length > 0)

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
              <li className="text-gray-300">Contact</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
              Contact
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Contact Modern Storage<sup className="text-[0.55em] font-bold -top-[0.6em] relative ml-0.5">®</sup>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Call, send us a message, or stop by one of our 10 self-storage locations.
            </p>
          </div>
        </div>
      </section>

      {/* ── HERO CONTACT CARDS ──────────────────────────────── */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tenant Support — surfaced FIRST so tenants don't
                reflexively tap the prominent red phone card and end up
                dialing new-rentals sales when they actually need to
                manage their account. Opens the modernstorage.com tenant
                / self-storage portal. */}
            <a
              href="https://www.modernstorage.com/self-storage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tenant Support — manage your account at modernstorage.com"
              className="bg-charcoal hover:bg-gray-800 rounded-2xl p-8 border border-charcoal transition-all text-center flex flex-col items-center justify-center min-h-[180px] shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-white text-modern-red mb-4 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.949.684V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5z" />
                </svg>
              </div>
              <p className="text-xl font-black text-white">Tenant Support</p>
              <p className="text-xs font-semibold text-white/70 mt-1">Manage your account →</p>
            </a>

            {/* Rent a Unit — solid red card. Click-to-call the centralized
                line. Phone number lives in aria-label only — the card
                itself dials when tapped. */}
            <a
              href={settings.phoneHref}
              aria-label={`Rent a Unit — call ${settings.phoneDisplay}`}
              className="bg-modern-red hover:bg-modern-red-hover rounded-2xl p-8 border border-modern-red transition-all text-center flex flex-col items-center justify-center min-h-[180px] shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-white text-modern-red mb-4 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                </svg>
              </div>
              <p className="text-xl font-black text-white">Rent a Unit</p>
              <p className="text-xs font-semibold text-white/80 mt-1">Tap to call</p>
            </a>

            {/* Send a message — scrolls to the inquiry form below */}
            <a
              href="#message"
              aria-label="Scroll to the Modern Storage® contact form"
              className="group bg-gray-50 hover:bg-modern-red rounded-2xl p-8 border border-gray-200 hover:border-modern-red transition-all text-center flex flex-col items-center justify-center min-h-[180px]"
            >
              <div className="w-14 h-14 rounded-full bg-white text-modern-red mb-4 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.4-3.6A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-xl font-black text-charcoal group-hover:text-white">Send a Message</p>
            </a>

            {/* Find a location — navigates to the locations hub */}
            <Link
              href="/locations"
              aria-label="See all Modern Storage® locations"
              className="group bg-gray-50 hover:bg-modern-red rounded-2xl p-8 border border-gray-200 hover:border-modern-red transition-all text-center flex flex-col items-center justify-center min-h-[180px]"
            >
              <div className="w-14 h-14 rounded-full bg-white text-modern-red mb-4 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <p className="text-xl font-black text-charcoal group-hover:text-white">Find a Location</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────── */}
      <section id="message" className="bg-white py-20 border-b border-gray-200 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Send a message
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Get in touch with Modern Storage®
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Tell us what you&apos;re storing or what business need you&apos;re solving — we&apos;ll match you to the right facility, sizes, and pricing and reply during business hours.
            </p>
          </div>
          <BusinessContactForm inboxEmail="" />
        </div>
      </section>

      {/* ── ALL LOCATIONS NAP DIRECTORY ─────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Location directory
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              All 10 Modern Storage® Locations
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every facility&apos;s name, address, ZIP, and phone — all in one place.
            </p>
          </div>

          <div className="space-y-12">
            {grouped.map((g) => (
              <div key={g.region}>
                <h3 className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
                  {g.region}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {g.locations.map((loc) => (
                    <article
                      key={loc.slug}
                      className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-sm transition-all flex flex-col"
                    >
                      <h4 className="font-black text-charcoal text-base leading-tight mb-3">{loc.name}</h4>
                      <address className="not-italic text-sm text-gray-600 leading-relaxed mb-4 space-y-0.5">
                        <p>{loc.streetAddress}</p>
                        <p>
                          {loc.city}, {loc.state} {loc.zip}
                        </p>
                        {/* Tenant Support + Rent a Unit as equally-
                            sized pills, Tenant Support FIRST so tenants
                            don't reflexively dial Rent a Unit for
                            account help. Both buttons now dial the
                            facility's direct line (loc.phone) — same
                            numbers shown on modernstorage.com/self-storage.
                            On a per-location card it doesn't matter
                            which audience the visitor identifies as;
                            the right place to reach is THIS facility
                            either way. Labels still differentiate
                            audiences so the visitor self-routes. */}
                        <span className="flex flex-col gap-2 pt-2">
                          <a
                            href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`}
                            aria-label={`Tenant Support at ${loc.name} — call ${loc.phone}`}
                            className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-black text-white font-bold px-4 py-2 rounded-full transition-colors text-xs shadow-sm"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                            </svg>
                            Tenant Support
                          </a>
                          <a
                            href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`}
                            aria-label={`Rent a Unit at ${loc.name} — call ${loc.phone}`}
                            className="inline-flex items-center justify-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-4 py-2 rounded-full transition-colors text-xs shadow-sm"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                            </svg>
                            Rent a Unit
                          </a>
                        </span>
                      </address>
                      <div className="mt-auto flex flex-wrap gap-2">
                        <Link
                          href={`/locations/${loc.slug}`}
                          className="text-xs font-bold text-modern-red hover:text-modern-red-hover transition-colors"
                        >
                          View page →
                        </Link>
                        <a
                          href={buildDirectionsUrl(loc)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-charcoal/70 hover:text-modern-red transition-colors"
                        >
                          Directions ↗
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Ready to find your storage unit?
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Reserve online in minutes or pick the location nearest you to see live availability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md"
            >
              See All Locations
            </Link>
            <a
              href={settings.phoneHref}
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md"
            >
              Call to Rent a Unit
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
