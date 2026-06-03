import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/business-storage-bentonville'
const HERO_IMAGE = '/images/modern-storage-bentonville-facility-exterior.jpg'
const HERO_ALT =
  'Modern Storage® Bentonville facility — business and climate-controlled storage for Northwest Arkansas vendors, suppliers, and small businesses'

export const metadata: Metadata = {
  // Title trimmed from 65 to 53 chars to clear the Semrush "title too
  // long" flag (Semrush threshold = 60 incl. spaces). The "Supplier"
  // qualifier stays in the H1, body copy, and meta description — the
  // <title> leads with the broader "Business Storage in Bentonville"
  // phrase that has higher search volume.
  title: {
    absolute: 'Business Storage in Bentonville, AR | Modern Storage®',
  },
  description:
    'Supplier and business storage in Bentonville for Northwest Arkansas vendors, e-commerce sellers, contractors, and small businesses. Indoor climate-controlled units, ground-floor access, and month-to-month rentals at Modern Storage® Bentonville and Lowell.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Supplier & Business Storage in Bentonville, AR | Modern Storage®',
    description:
      'Indoor supplier and business storage in Bentonville for NWA vendors, e-commerce sellers, contractors, and small businesses — Modern Storage®.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supplier & Business Storage in Bentonville, AR | Modern Storage®',
    description:
      'Indoor supplier and business storage in Bentonville for NWA vendors, e-commerce sellers, and small businesses — Modern Storage®.',
    images: [HERO_IMAGE],
  },
}

// Use cases — written for Bentonville-area business storage in general, not
// targeted at a specific retailer's vendor base. Any descriptive references
// to the Home Office area are kept to geographic orientation, never
// affiliation, branding, or "official" language.
const USE_CASES = [
  {
    title: 'Product samples & prototypes',
    body:
      'Climate-controlled units protect retail samples, packaging mocks, and prototypes from Northwest Arkansas summer humidity. Stay meeting-ready year-round, whether you\'re prepping for a buyer review, a trade show, or a customer pitch.',
  },
  {
    title: 'Retail & e-commerce inventory',
    body:
      'Seasonal stock, slow-moving SKUs, and overflow inventory you don\'t want eating up shop or warehouse space — kept indoors and climate-stable close to your Bentonville operations.',
  },
  {
    title: 'Marketing & POP materials',
    body:
      'Endcaps, displays, signage, brochures, and trade-show booths kept ready for the next event. Indoor units protect printed materials from humidity damage between launches.',
  },
  {
    title: 'Office furniture & electronics',
    body:
      'Conference tables, monitors, networking gear, and AV equipment stored between office phases, relocations, or temporary downsizing.',
  },
  {
    title: 'Records & contracts',
    body:
      'Tax records, HR files, contracts, and operational documents stored in a stable indoor environment — without the cost of a commercial archive service.',
  },
  {
    title: 'Bentonville-area moves',
    body:
      'Relocating a small business or supplier office to Bentonville? Climate-controlled storage bridges the gap between move-out and the new lease\'s build-out completion.',
  },
] as const

const FAQS = [
  {
    q: 'Where is Modern Storage® Bentonville located?',
    a: `Modern Storage® Bentonville is located at 700 SW 14th Street in ZIP 72712, in south Bentonville and minutes from the downtown Bentonville square, Crystal Bridges Museum, and the Walmart Home Office area. The facility offers climate-controlled storage, business storage, and ground-floor access, making it convenient for Northwest Arkansas businesses, suppliers, inventory-heavy teams, and small businesses across Benton County.`,
  },
  {
    q: 'What kind of business storage do Northwest Arkansas vendors typically rent?',
    a: `NWA vendors and suppliers most commonly rent a mix of climate-controlled units (for samples, electronics, and marketing materials) and business storage units (for bulk inventory, displays, and supplies). Sizes range from 5x10 for sample storage to 10x20 or 10x30 for seasonal inventory and point-of-purchase material. Modern Storage® Bentonville and Modern Storage® Lowell both offer business storage with climate-controlled options.`,
  },
  {
    q: 'Why use self-storage instead of leasing a warehouse?',
    a: `Self-storage is month-to-month with no long-term lease, no triple-net charges, and no build-out costs. For Bentonville-area small businesses managing seasonal inventory swings, sample storage between buying cycles, or temporary overflow during a move, that flexibility is a much better fit than a multi-year commercial warehouse lease at a fraction of the monthly cost.`,
  },
  {
    q: 'Do you accept business deliveries at storage units?',
    a: `Many Modern Storage® locations accept business deliveries at customer units, including Modern Storage® Bentonville and Modern Storage® Lowell. Acceptance policies, delivery hours, and signature requirements vary by location — confirm with the local team before scheduling shipments from a manufacturer, distributor, or freight carrier.`,
  },
  {
    q: 'Which Modern Storage® locations serve Bentonville-area businesses?',
    a: `Modern Storage® Bentonville (700 SW 14th St) is the closest facility for downtown Bentonville and south Benton County operations. Modern Storage® Lowell (1407 W Monroe Ave, on I-49 between Rogers and Springdale) is the most flexible NWA option — it combines climate-controlled, business storage, and boat/RV at one facility. Modern Storage® Springdale also offers climate-controlled and drive-up storage along the Hwy 412 / I-49 corridor.`,
  },
  {
    q: 'Can I store electronics and samples that need to stay temperature-stable?',
    a: `Yes. Modern Storage® Bentonville and Lowell offer climate-controlled storage units that stay within a managed indoor temperature range (~59°F to 79°F). That protects samples, electronics, prototypes, printed marketing materials, and anything sensitive to Northwest Arkansas summer heat and humidity. See the climate-controlled storage page for full details on what belongs in an indoor unit.`,
  },
  {
    q: 'How do I reserve business storage in Bentonville?',
    a: `Visit /locations/bentonville to reserve at Modern Storage® Bentonville directly, or /locations/lowell to reserve at the Lowell facility. Both pages show available unit sizes and a direct reservation link. For tailored recommendations on unit size based on your inventory or operational needs, call 501-910-0096 and the team can walk through options.`,
  },
] as const

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Business Storage in Bentonville',
    name: 'Business Storage in Bentonville, AR',
    description:
      'Climate-controlled and business storage in Bentonville for Northwest Arkansas vendors, suppliers, e-commerce sellers, and small businesses. Ground-floor access, indoor temperature-stable units, and month-to-month rentals at Modern Storage® Bentonville and Lowell.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    // Repointed to sitewide #organization @id to avoid emitting a nested
    // SelfStorage with no PostalAddress (a Semrush markup-error trigger).
    provider: { '@id': SITE_URL + '/#organization' },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Business Storage in Bentonville', item: SITE_URL + PAGE_PATH },
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

  return [service, breadcrumb, faqPage]
}

export default async function BusinessStorageBentonvillePage() {
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

      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Business Storage in Bentonville</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Bentonville &amp; Lowell
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                <span className="text-modern-red">Supplier &amp; Business Storage</span> in Bentonville, AR
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
                Climate-controlled and business storage in Bentonville for Northwest Arkansas vendors, suppliers, e-commerce sellers, and small businesses. Convenient for operations near the downtown Bentonville square and the Walmart Home Office area, with month-to-month flexibility that beats a multi-year commercial warehouse lease.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/locations/bentonville"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Reserve at Bentonville
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/locations/lowell"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  Reserve at Lowell
                </Link>
                <a
                  href={PHONE_NUMBER_HREF}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  Call to Rent a Unit
                </a>
              </div>
            </div>

            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
                <Image src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Modern Storage® Bentonville — minutes from downtown Bentonville and Crystal Bridges.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Built for NWA business operations
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Why Bentonville-Area Businesses Use Modern Storage®
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Northwest Arkansas runs on samples, inventory, and meeting logistics — and NWA summer humidity is hard on every one of those. Modern Storage® offers <Link href="/climate-controlled" className="text-modern-red font-semibold hover:underline">climate-controlled storage</Link> and <Link href="/business-storage" className="text-modern-red font-semibold hover:underline">business storage</Link> built for vendors, suppliers, and small businesses that need professional indoor space without leasing commercial warehouse square footage.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((c) => (
              <div key={c.title} className="bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 transition-colors">
                <h3 className="font-black text-charcoal mb-2 leading-tight">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Where to reserve</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              NWA Modern Storage® Locations for Business Storage
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Two Modern Storage® locations are positioned for Bentonville-area vendors, suppliers, and small businesses — pick the one closest to your office or operation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/locations/bentonville" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Closest to downtown Bentonville</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">
                Modern Storage® Bentonville
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                700 SW 14th St, Bentonville, AR 72712. Climate-controlled, business storage, and ground-floor access. Minutes from the downtown Bentonville square, Crystal Bridges, and the Home Office corporate area. Convenient for vendors, suppliers, and Benton County small businesses.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">
                See Bentonville details →
              </span>
            </Link>
            <Link href="/locations/lowell" className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Central I-49 location</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">
                Modern Storage® Lowell
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                1407 W Monroe Ave, Lowell, AR 72745. Climate-controlled, business storage, and boat/RV storage at one facility on I-49 between Rogers and Springdale. The most flexible NWA Modern Storage® location for businesses needing inventory, samples, and personal storage in one place.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">
                See Lowell details →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Bentonville Supplier &amp; Business Storage FAQ
            </h2>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Supplier &amp; Business Storage in Bentonville
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Compare unit sizes and climate-controlled availability at Modern Storage® Bentonville and Lowell. Reserve online or call to talk through inventory, samples, or office storage logistics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/bentonville" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Reserve at Bentonville
            </Link>
            <Link href="/locations/lowell" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              Reserve at Lowell
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
