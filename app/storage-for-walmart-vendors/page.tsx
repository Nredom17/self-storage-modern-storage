import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/storage-for-walmart-vendors'
const HERO_IMAGE = '/images/modern-storage-bentonville-facility-exterior.jpg'
const HERO_ALT =
  'Modern Storage® Bentonville facility — climate-controlled storage and business storage for Walmart vendors and Northwest Arkansas suppliers'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage for Walmart Vendors & NWA Suppliers in Bentonville | Modern Storage®',
  },
  description:
    'Climate-controlled and business storage for Walmart suppliers, NWA vendors, and Northwest Arkansas small businesses. Indoor inventory protection, sample storage, and ground-floor access at Modern Storage® Bentonville and Lowell — just minutes from Walmart Home Office.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage for Walmart Vendors & NWA Suppliers in Bentonville | Modern Storage®',
    description:
      'Indoor climate-controlled and business storage for Walmart suppliers and NWA vendors — Bentonville and Lowell, minutes from Walmart Home Office.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage for Walmart Vendors & NWA Suppliers | Modern Storage®',
    description:
      'Indoor climate-controlled storage for Walmart suppliers in Bentonville and Lowell — Modern Storage®.',
    images: [HERO_IMAGE],
  },
}

const USE_CASES = [
  {
    title: 'Product samples & prototypes',
    body:
      'Climate-controlled units protect retail samples, packaging mocks, and prototypes from Northwest Arkansas summer heat and humidity. Stay meeting-ready year-round.',
  },
  {
    title: 'Retail inventory overflow',
    body:
      'Seasonal stock, line review inventory, and slow-moving SKUs you don\'t want eating up warehouse space — but still need indoor, climate-stable storage close to Bentonville.',
  },
  {
    title: 'Marketing & POP materials',
    body:
      'Endcaps, in-store displays, signage, brochures, and trade-show booths kept ready for the next pitch. Indoor units protect printed materials from humidity damage.',
  },
  {
    title: 'Office furniture & electronics',
    body:
      'Conference tables, monitors, networking gear, and AV equipment between project phases, office moves, or temporary downsizing at your supplier office.',
  },
  {
    title: 'Records & contracts',
    body:
      'Vendor contracts, tax records, and operational documents stored in a stable indoor environment — without the cost of a commercial archive service.',
  },
  {
    title: 'Bentonville-area moves',
    body:
      'Relocating a small business or supplier office to Bentonville from out of state? Climate-controlled storage bridges the gap between move-out and new lease build-out.',
  },
] as const

const FAQS = [
  {
    q: 'Is Modern Storage® Bentonville close to Walmart Home Office?',
    a: `Yes. Modern Storage® Bentonville is at 700 SW 14th Street in ZIP 72712, in south Bentonville and just minutes from Walmart Home Office, the downtown Bentonville square, and Crystal Bridges. The location is built for Walmart suppliers, NWA vendors, and small businesses serving the Northwest Arkansas economy.`,
  },
  {
    q: 'What kind of storage do Walmart vendors usually rent?',
    a: `Walmart suppliers and NWA vendors typically rent a mix of climate-controlled units (for product samples, electronics, and marketing materials) and standard business storage (for bulk inventory, displays, and supplies). Common sizes range from 5x10 for sample storage to 10x20 or 10x30 for seasonal inventory and POP material. Modern Storage® Bentonville and Modern Storage® Lowell both offer business storage with climate-controlled options.`,
  },
  {
    q: 'Why use Modern Storage® instead of a leased warehouse?',
    a: `Modern Storage® offers month-to-month business storage at a fraction of the cost of commercial warehouse space — with no long-term lease, no triple-net charges, and no build-out. For Walmart suppliers managing seasonal inventory swings, sample storage between line reviews, or temporary overflow during a move, month-to-month flexibility is a much better fit than a 3-year warehouse lease.`,
  },
  {
    q: 'Do Modern Storage® locations near Bentonville accept inventory deliveries?',
    a: `Many Modern Storage® locations accept business deliveries at customer units, including at Modern Storage® Bentonville and Modern Storage® Lowell. Acceptance policies, delivery hours, and signature requirements vary by location — confirm with the team before scheduling a shipment from a manufacturer or freight carrier.`,
  },
  {
    q: 'Which Modern Storage® locations serve the NWA supplier ecosystem?',
    a: `Modern Storage® Bentonville (south Bentonville, near Walmart Home Office) is the flagship for NWA vendors. Modern Storage® Lowell (on I-49 between Rogers and Springdale) is the most flexible option — it combines climate-controlled, business storage, and boat/RV in one facility. Modern Storage® Springdale also offers climate-controlled and drive-up storage convenient to Tyson HQ and the I-49 corridor.`,
  },
  {
    q: 'Can I store electronics and samples that need to stay temperature-stable?',
    a: `Yes. Modern Storage® Bentonville and other NWA locations offer climate-controlled storage units that stay in a stable indoor temperature range (~59°F to 79°F). That protects samples, electronics, prototypes, printed materials, and anything you wouldn't leave in a hot Northwest Arkansas warehouse during August. See the climate-controlled storage page for full details on what belongs indoors.`,
  },
  {
    q: 'How do I reserve a unit for my Walmart supplier business?',
    a: `Use the location finder or visit /locations/bentonville to reserve at Modern Storage® Bentonville directly. You can compare unit sizes, climate-controlled availability, and current move-in offers from your phone or computer. For inventory or business storage needs, call 501-910-0096 and the team can recommend the right unit size and location based on your supplier ops.`,
  },
] as const

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Business Storage for Walmart Vendors',
    name: 'Storage for Walmart Vendors & NWA Suppliers',
    description:
      'Climate-controlled and business storage for Walmart suppliers and Northwest Arkansas vendors. Indoor inventory protection, sample storage, marketing materials, electronics, and records at Modern Storage® Bentonville and Lowell.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    provider: {
      '@type': 'SelfStorage',
      name: 'Modern Storage®',
      url: SITE_URL + '/',
      telephone: phoneDisplay,
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Storage for Walmart Vendors', item: SITE_URL + PAGE_PATH },
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

export default async function WalmartVendorsPage() {
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
              <li className="text-gray-300">Storage for Walmart Vendors</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Bentonville & Lowell
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Storage for <span className="text-modern-red">Walmart Vendors</span> &amp; NWA Suppliers
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
                Climate-controlled and business storage for Walmart suppliers, line-review samples, and Northwest Arkansas vendors. Indoor inventory protection just minutes from Walmart Home Office, with month-to-month flexibility that beats a commercial warehouse lease.
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
                  Call {PHONE_NUMBER_DISPLAY}
                </a>
              </div>
            </div>

            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
                <Image src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Modern Storage® Bentonville — minutes from Walmart Home Office and Crystal Bridges.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Built for the NWA supplier ecosystem
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Why Walmart Suppliers Use Modern Storage®
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The Walmart Home Office ecosystem runs on samples, inventory, and meeting logistics — and Northwest Arkansas summer humidity is hard on every one of those. Modern Storage® offers <Link href="/climate-controlled" className="text-modern-red font-semibold hover:underline">climate-controlled storage</Link> and <Link href="/business-storage" className="text-modern-red font-semibold hover:underline">business storage</Link> built for vendors who need professional indoor space without leasing commercial warehouse square footage.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((c) => (
              <div key={c.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
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
              NWA Modern Storage® Locations for Vendors
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Two Modern Storage® locations are specifically positioned for Walmart suppliers and Northwest Arkansas vendors — pick the one closest to your office or supplier hub.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/locations/bentonville" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Flagship for suppliers</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">
                Modern Storage® Bentonville
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                700 SW 14th St, Bentonville, AR 72712. Climate-controlled, business storage, and ground-floor access. Minutes from Walmart Home Office, the downtown square, and Crystal Bridges. Built for Walmart suppliers, NWA small businesses, and the wider Bentonville supplier ecosystem.
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
                1407 W Monroe Ave, Lowell, AR 72745. Climate-controlled, business storage, and boat/RV storage at one facility on I-49 between Rogers and Springdale. The most flexible NWA Modern Storage® location for suppliers who also need inventory, samples, and personal storage in one place.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">
                See Lowell details →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Walmart Vendor &amp; NWA Supplier Storage FAQ
            </h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Indoor Business Storage Near Walmart Home Office
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Compare unit sizes and climate-controlled availability at Modern Storage® Bentonville and Lowell. Reserve online or call to talk through samples, inventory, or office storage logistics.
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
