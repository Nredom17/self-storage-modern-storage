import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/storage-near-table-rock-lake'
const HERO_IMAGE = '/images/modern-storage-bentonville-facility-exterior.jpg'
const HERO_ALT =
  'Modern Storage® Bentonville facility exterior — boat, RV, and trailer storage for Table Rock Lake area customers in Northwest Arkansas'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Near Table Rock Lake | Modern Storage® NWA',
  },
  description:
    'Boat, RV, and trailer storage near Table Rock Lake from the Arkansas side. Modern Storage® Bentonville and Lowell sit ~35 minutes from the AR-side Table Rock launch points — year-round parking for NWA-based lake families.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Near Table Rock Lake | Modern Storage® NWA',
    description:
      'Boat and RV storage near Table Rock Lake — Modern Storage® Bentonville and Lowell in Northwest Arkansas.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Near Table Rock Lake | Modern Storage®',
    description: 'Boat and RV storage near Table Rock Lake — Modern Storage® Bentonville and Lowell.',
    images: [HERO_IMAGE],
  },
}

const USE_CASES = [
  {
    title: 'AR-side Table Rock boaters',
    body:
      'Table Rock Lake straddles the AR-MO border. Arkansas-side boaters launching from Beaver Town, Eagle Rock, or south Branson area need NWA-based storage that\'s on the route home — Modern Storage® Bentonville and Lowell sit ~35 minutes from the AR-side access points.',
  },
  {
    title: 'NWA weekend regulars',
    body:
      'Bentonville, Rogers, Bella Vista, and Eureka Springs families head to Table Rock for weekends but don\'t want to tow the boat the full 35-45 minutes home each Sunday. Modern Storage® Bentonville or Lowell parks the boat between trips.',
  },
  {
    title: 'Tournament & bass fishing',
    body:
      'Table Rock hosts year-round bass tournaments and FLW events. NWA-based tournament anglers store their boats at Modern Storage® Lowell (on I-49 between Rogers and Springdale) for fast-launch staging.',
  },
  {
    title: 'Off-season RV storage',
    body:
      'Travel trailers and motorhomes used for Table Rock Lake camping season need somewhere to live between trips. Modern Storage® Bentonville and Lowell offer outdoor RV parking sized for typical mid-size rigs.',
  },
  {
    title: 'Eureka Springs / Bella Vista lakefront overflow',
    body:
      'Lakefront and near-lake homes in Eureka Springs, Bella Vista, and Holiday Island often lack room for a boat trailer + tow vehicle. NWA Modern Storage® locations give an HOA-compliant overflow option.',
  },
  {
    title: 'Eureka Springs second-home owners',
    body:
      'Eureka Springs has a strong base of weekend and seasonal residents. Modern Storage® Bentonville or Lowell is a logical between-visits drop point for boats, RVs, and gear that doesn\'t belong in a humid lakeside home over winter.',
  },
] as const

const FAQS = [
  {
    q: 'How far is Modern Storage® from Table Rock Lake?',
    a: `Modern Storage® Bentonville (700 SW 14th St) and Modern Storage® Lowell (1407 W Monroe Ave) are both approximately 35 minutes from the Arkansas-side Table Rock Lake access points via Highway 62 / Highway 23. Modern Storage® Bentonville is closer for Bella Vista and northern Benton County customers; Lowell is more central for Rogers and Springdale customers.`,
  },
  {
    q: 'Can I store a boat year-round?',
    a: `Yes. Modern Storage® offers year-round month-to-month boat storage. Most Table Rock boats see active use April through October — rent at Modern Storage® Bentonville or Lowell during off-season, or year-round if you tournament fish or visit Table Rock through the cooler months.`,
  },
  {
    q: 'Do you offer covered or indoor Table Rock Lake boat storage?',
    a: `Modern Storage® Lowell offers outdoor parking storage for boats, RVs, and trailers. Covered or indoor options for smaller boats may be available depending on inventory — call 501-910-0096 to confirm. Larger boats and RVs use outdoor parking spaces. Indoor climate-controlled units are available for sensitive electronics, lake gear, and accessories.`,
  },
  {
    q: 'Which is closer — Modern Storage® Bentonville or Lowell?',
    a: `Both are roughly the same distance to Table Rock Lake (~35 min via Highway 62). Pick based on where you live: Modern Storage® Bentonville for Bella Vista, Centerton, and northern Benton County customers; Modern Storage® Lowell for Rogers, Springdale, and customers on the central I-49 corridor. Both offer boat/RV parking; Lowell also offers indoor business storage at the same facility.`,
  },
  {
    q: 'How big a boat or RV can I store at the NWA facilities?',
    a: `Both NWA locations accommodate typical bass boats, ski boats, pontoons, travel trailers, and small to mid-size motorhomes. Larger Class A rigs and longer fifth-wheels may have space-length constraints — call ahead with your overall length (including trailer) and the team will confirm a fit before you reserve.`,
  },
  {
    q: 'Is there storage closer to Table Rock for Beaver Lake regulars?',
    a: `If you also boat Beaver Lake, see the Storage Near Beaver Lake guide — same NWA facilities serve both lakes since Table Rock and Beaver Lake are roughly 30 minutes apart on opposite sides of NWA. Modern Storage® Lowell is the most flexible NWA location for boaters using both lakes.`,
  },
  {
    q: 'How do I reserve storage near Table Rock Lake?',
    a: `Visit /locations/bentonville or /locations/lowell to reserve at the closest facility. Both pages show available unit sizes and a direct reserve-online link. For boat/RV parking, call 501-910-0096 first to confirm space length availability before completing the reservation.`,
  },
] as const

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Storage Near Table Rock Lake',
    name: 'Storage Near Table Rock Lake — Modern Storage® Bentonville & Lowell',
    description:
      'Boat, RV, trailer, and climate-controlled storage near the Arkansas side of Table Rock Lake. Modern Storage® Bentonville and Lowell sit approximately 35 minutes from AR-side Table Rock access points and serve NWA-based boaters and second-home owners.',
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
      { '@type': 'ListItem', position: 2, name: 'Storage Near Table Rock Lake', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [service, breadcrumb, faqPage]
}

export default async function TableRockLakePage() {
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
              <li className="text-gray-300">Storage Near Table Rock Lake</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                NWA lake storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Storage Near <span className="text-modern-red">Table Rock Lake</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Boat, RV, and trailer storage near the Arkansas side of Table Rock Lake. Modern Storage® Bentonville and Lowell sit ~35 minutes from AR-side access points — between-trips parking for NWA-based boaters, tournament anglers, and Eureka Springs / Bella Vista lake regulars.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/locations/bentonville" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Reserve at Bentonville
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/locations/lowell" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  Reserve at Lowell
                </Link>
                <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  Call for New Rentals
                </a>
              </div>
            </div>
            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] lg:aspect-[4/3] bg-gray-800 relative">
                <Image src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Modern Storage® Bentonville — 35 minutes from the AR-side Table Rock Lake access points.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why Table Rock boaters use NWA storage</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Six Table Rock Lake Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Table Rock straddles the AR-MO border. NWA-based boaters who launch from the Arkansas side or who live in Bella Vista, Eureka Springs, and Holiday Island use Modern Storage® <Link href="/rv-boat-vehicle" className="text-modern-red font-semibold hover:underline">boat and RV parking</Link> at Bentonville or Lowell as a year-round between-trips solution.
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

      <section className="bg-gray-50 py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Where to reserve</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              NWA Modern Storage® Locations for Table Rock Lake
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Two facilities are roughly the same distance from Table Rock Lake. Pick by where you live or work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/locations/bentonville" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Bentonville · 35 min from Table Rock</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Bentonville</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                700 SW 14th St, Bentonville, AR 72712. Best for Bella Vista, Centerton, and northern Benton County customers. Climate-controlled, business storage, and ground-floor access.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Bentonville details →</span>
            </Link>
            <Link href="/locations/lowell" className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Lowell · 35 min from Table Rock</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Lowell</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                1407 W Monroe Ave, Lowell, AR 72745. Best for Rogers, Springdale, and central I-49 customers. Boat/RV parking, climate-controlled, and business storage in one facility.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Lowell details →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Table Rock Lake Storage FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Storage Near Table Rock Lake
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Modern Storage® Bentonville and Lowell — both ~35 min from the AR-side Table Rock launch points. Month-to-month, no long-term lease.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/bentonville" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Reserve at Bentonville
            </Link>
            <Link href="/rv-boat-storage-northwest-arkansas" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              See NWA Regional Lake Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
