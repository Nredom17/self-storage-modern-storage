import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/rv-boat-storage-northwest-arkansas'
const HERO_IMAGE = '/images/modern-storage-lowell-facility-night.jpg'
const HERO_ALT =
  'Modern Storage® Lowell facility at night — boat, RV, and trailer storage for Northwest Arkansas lake families serving Beaver Lake and Table Rock Lake'

export const metadata: Metadata = {
  title: {
    absolute: 'RV & Boat Storage in Northwest Arkansas | Beaver Lake & Table Rock | Modern Storage®',
  },
  description:
    'Boat, RV, and trailer storage across Northwest Arkansas. Modern Storage® Lowell, Bentonville, and Springdale serve Beaver Lake, Table Rock Lake, Lake Sequoyah, and the wider NWA lake region from facilities on the I-49 corridor.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'RV & Boat Storage in Northwest Arkansas | Modern Storage®',
    description:
      'Boat and RV storage across NWA — Modern Storage® Lowell, Bentonville, and Springdale serve Beaver Lake, Table Rock Lake, and the I-49 corridor.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RV & Boat Storage in Northwest Arkansas | Modern Storage®',
    description: 'Boat and RV storage across NWA at Modern Storage® Lowell, Bentonville, and Springdale.',
    images: [HERO_IMAGE],
  },
}

const FAQS = [
  {
    q: 'Which Northwest Arkansas Modern Storage® locations offer boat and RV storage?',
    a: `Modern Storage® Lowell (1407 W Monroe Ave) is the primary NWA boat/RV storage facility — it sits on I-49 between Rogers and Springdale and offers outdoor parking for boats, RVs, and trailers alongside climate-controlled and business storage. Modern Storage® Bentonville and Modern Storage® Springdale also serve NWA customers with indoor climate-controlled storage and other storage formats, though their boat/RV parking inventory is more limited than Lowell.`,
  },
  {
    q: 'Which NWA lakes does this cover?',
    a: `The NWA Modern Storage® locations are positioned for the major Northwest Arkansas lakes: Beaver Lake (15-25 min from Lowell), Table Rock Lake (~35 min from Bentonville or Lowell via Hwy 62), Lake Sequoyah (Fayetteville area), Lake Wedington, and Hobbs State Park lakes. Modern Storage® Lowell is the most central of the three for boat/RV customers using multiple NWA lakes.`,
  },
  {
    q: 'Where should I store if I lake at Beaver Lake?',
    a: `Modern Storage® Lowell is the closest NWA facility to Beaver Lake — 15-25 minutes from most Beaver Lake marinas via Hwy 12 or US-62. See the Storage Near Beaver Lake guide for the full breakdown including HOA-friendly framing, off-season storage, and which marinas the facility is closest to.`,
  },
  {
    q: 'Where should I store if I lake at Table Rock Lake?',
    a: `Modern Storage® Bentonville and Lowell are roughly equidistant from the Arkansas-side Table Rock Lake access points (~35 min via Hwy 62). Pick Bentonville if you live in Bella Vista, Centerton, or northern Benton County. Pick Lowell if you live in Rogers, Springdale, or along the central I-49 corridor. See the Storage Near Table Rock Lake guide for AR-side specifics.`,
  },
  {
    q: 'Can I store one boat that I use on multiple NWA lakes?',
    a: `Yes — Modern Storage® Lowell is the most flexible NWA option for boat owners who use both Beaver Lake and Table Rock Lake. The facility is roughly central to both lakes, so the same parking spot works for any NWA-area boat owner. Tow the boat to whichever lake you're hitting that weekend, store it at Lowell between trips.`,
  },
  {
    q: 'Is climate-controlled storage available at NWA Modern Storage® locations?',
    a: `Yes. All three NWA Modern Storage® locations (Bentonville, Springdale, Lowell) offer climate-controlled indoor storage for items that need stable temperature and humidity — wakeboards, electronics, life jackets, water-ski gear, lake-house seasonal items. See the Modern Storage® climate-controlled storage page for what belongs indoors.`,
  },
  {
    q: 'How do I reserve NWA boat or RV storage?',
    a: `Visit /locations/lowell, /locations/bentonville, or /locations/springdale to reserve at a specific facility. Each page shows available unit sizes and a direct reservation link. For boat/RV parking specifically, call 501-910-0096 first to confirm space length availability for your rig before completing the reservation.`,
  },
] as const

const FACILITIES = [
  {
    href: '/locations/lowell',
    name: 'Modern Storage® Lowell',
    role: 'Primary NWA boat/RV facility',
    description: '1407 W Monroe Ave, Lowell, AR 72745. I-49 between Rogers and Springdale. Outdoor boat/RV/trailer parking + climate-controlled + business storage at one facility.',
    serves: 'Beaver Lake (15-25 min), Table Rock Lake (~35 min), Lake Sequoyah, Hobbs State Park',
  },
  {
    href: '/locations/bentonville',
    name: 'Modern Storage® Bentonville',
    role: 'Bella Vista & north Benton County',
    description: '700 SW 14th St, Bentonville, AR 72712. Climate-controlled, business storage, ground-floor access. Best for customers in Bella Vista, Centerton, and north Benton County.',
    serves: 'Table Rock Lake (~35 min), Beaver Lake (~30 min)',
  },
  {
    href: '/locations/springdale',
    name: 'Modern Storage® Springdale',
    role: 'Hwy 412 / I-49 corridor',
    description: '4555 W Sunset Ave, Springdale, AR 72762. Climate-controlled and drive-up storage along the Tyson HQ / Don Tyson Pkwy corridor.',
    serves: 'Beaver Lake (~30 min), Lake Sequoyah, University of Arkansas area',
  },
] as const

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'RV & Boat Storage in Northwest Arkansas',
    name: 'RV & Boat Storage in Northwest Arkansas — Modern Storage® NWA',
    description:
      'Boat, RV, and trailer storage across Northwest Arkansas. Modern Storage® Lowell, Bentonville, and Springdale serve Beaver Lake, Table Rock Lake, Lake Sequoyah, and the wider NWA lake region from facilities on the I-49 corridor.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    provider: { '@id': SITE_URL + '/#organization' },
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'RV & Boat Storage in Northwest Arkansas', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [service, breadcrumb, faqPage]
}

export default async function NWARegionalPage() {
  const settings = await getSiteSettings()
  const jsonLd = buildJsonLd()
  const PHONE_NUMBER_DISPLAY = settings.phoneDisplay
  const PHONE_NUMBER_HREF = settings.phoneHref

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">RV &amp; Boat Storage in Northwest Arkansas</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                NWA regional guide
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                RV &amp; Boat Storage in <span className="text-modern-red">Northwest Arkansas</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Three Modern Storage® facilities cover the NWA lake region — Lowell, Bentonville, and Springdale. Boat, RV, and trailer storage serving Beaver Lake, Table Rock Lake, Lake Sequoyah, and the wider I-49 corridor.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/locations/lowell" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Reserve at Lowell
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  New Rentals: {PHONE_NUMBER_DISPLAY}
                </a>
              </div>
            </div>
            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] lg:aspect-[4/3] bg-gray-800 relative">
                <Image src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Modern Storage® Lowell — the central NWA facility for boat and RV storage on the I-49 corridor.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">By lake</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Lake-Specific Guides for NWA Boaters
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Each major Northwest Arkansas lake has its own storage guide with HOA framing, distance from the closest Modern Storage® facility, and lake-specific use cases. Pick the lake that matches your primary boating water.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/storage-near-beaver-lake" className="group bg-gray-50 hover:bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Beaver Lake · 15-25 min from Lowell</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Storage Near Beaver Lake</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Off-season boat parking, year-round RV storage, and HOA-friendly options for Rogers, Bentonville, and Cave Springs lake families. Lowell is the closest NWA Modern Storage®.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">Read guide →</span>
            </Link>
            <Link href="/storage-near-table-rock-lake" className="group bg-gray-50 hover:bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Table Rock · ~35 min from Bentonville or Lowell</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Storage Near Table Rock Lake</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                AR-side Table Rock boaters, Bella Vista &amp; Eureka Springs second-home owners, tournament anglers. Modern Storage® Bentonville and Lowell serve the AR side.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">Read guide →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Three NWA facilities</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Modern Storage® Locations Across Northwest Arkansas
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Three facilities cover the NWA lake region. Pick by where you live or by which lake you primarily use.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FACILITIES.map((f) => (
              <Link key={f.name} href={f.href} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">{f.role}</p>
                <h3 className="text-lg font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">{f.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{f.description}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  <span className="font-bold uppercase tracking-wide">Serves:</span> {f.serves}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See location →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Northwest Arkansas Lake Storage FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve RV &amp; Boat Storage in NWA
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Three Modern Storage® facilities cover the NWA lake region. Lowell is the most central for boat/RV customers using multiple lakes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/lowell" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Reserve at Lowell
            </Link>
            <Link href="/rv-boat-vehicle" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              See All Boat &amp; RV Options
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
