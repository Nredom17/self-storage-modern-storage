import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/storage-near-beaver-lake'
const HERO_IMAGE = '/images/modern-storage-shackleford-rv-storage-unit.jpg'
const HERO_ALT =
  'Modern Storage® boat and RV storage in Northwest Arkansas — Beaver Lake, Lake Sequoyah, and Lake Maumelle area'

export const metadata: Metadata = {
  title: {
    absolute: 'Boat & RV Storage Near Beaver Lake | Modern Storage® Lowell & Bentonville',
  },
  description:
    'Boat, RV, and trailer storage near Beaver Lake in Northwest Arkansas. Modern Storage® Lowell sits on I-49 between Rogers and Springdale — minutes from Beaver Lake marinas, Lake Sequoyah, and Hobbs State Park.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Boat & RV Storage Near Beaver Lake | Modern Storage®',
    description:
      'Boat, RV, and trailer storage near Beaver Lake — Modern Storage® Lowell on I-49 between Rogers and Springdale.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boat & RV Storage Near Beaver Lake | Modern Storage®',
    description:
      'Boat, RV, and trailer storage minutes from Beaver Lake at Modern Storage® Lowell, NWA.',
    images: [HERO_IMAGE],
  },
}

const USE_CASES = [
  {
    title: 'Off-season boat storage',
    body:
      'Get the boat off your driveway from October through April. Stored safely outside of HOA-restricted neighborhoods and out of summer sun damage between seasons.',
  },
  {
    title: 'Year-round RV parking',
    body:
      'Travel trailers, motorhomes, and 5th-wheels sized for longer rigs that don\'t fit on a residential lot. Lock-and-leave between Beaver Lake camping trips.',
  },
  {
    title: 'Bass boats & pontoons',
    body:
      'Fishing boats, bass boats, ski boats, and pontoons — Beaver Lake families park them between weekends on the water without trailering home each Sunday.',
  },
  {
    title: 'Personal watercraft & trailers',
    body:
      'Jet skis, kayaks on trailers, and small utility trailers in a secured outdoor space. Easier than backing one more thing into the garage.',
  },
  {
    title: 'HOA-friendly alternative',
    body:
      'Many Rogers, Bentonville, and Cave Springs neighborhoods restrict boat/RV parking on residential property. Modern Storage® gives lake families an HOA-compliant option close to home.',
  },
  {
    title: 'Out-of-state second homes',
    body:
      'Beaver Lake has a strong base of out-of-state second-home owners. Modern Storage® Lowell is a year-round drop-off point for the boat while the house sits empty between visits.',
  },
] as const

const FAQS = [
  {
    q: 'Which Modern Storage® location is closest to Beaver Lake?',
    a: `Modern Storage® Lowell at 1407 W Monroe Avenue in Lowell, AR 72745 is the closest Modern Storage® facility to Beaver Lake. It sits on I-49 between Rogers and Springdale and offers boat, RV, trailer, and vehicle storage. Modern Storage® Bentonville is the next-closest option, with climate-controlled and business storage but no boat/RV. Lake Sequoyah and Hobbs State Park boaters also use Modern Storage® Lowell.`,
  },
  {
    q: 'Does Modern Storage® offer covered or indoor boat storage near Beaver Lake?',
    a: `Modern Storage® Lowell offers outdoor parking storage for boats, RVs, and trailers. Indoor or covered options for smaller boats or PWCs may be available depending on inventory — call 501-910-0096 or check the live reservation page to confirm what's available for your rig.`,
  },
  {
    q: 'How big a boat or RV can I store?',
    a: `Modern Storage® Lowell offers parking storage in spaces sized for typical bass boats, ski boats, pontoons, travel trailers, and small to mid-size RVs. Larger Class A motorhomes and longer 5th-wheels may have limited availability. Bring your overall length (with trailer) and the team can confirm a fit before you reserve.`,
  },
  {
    q: 'Can I store my boat year-round?',
    a: `Yes. Modern Storage® offers year-round boat storage in Northwest Arkansas, which is what most Beaver Lake families need — store the boat from October through April, pull it out for weekends through summer, and keep paying month-to-month while you use it. Off-season storage protects the hull, upholstery, and electronics from sun damage and freeze cycles.`,
  },
  {
    q: 'Do I need to winterize my boat before storing?',
    a: `Yes — best practice is to winterize before long-term storage. Drain the water system, change the oil, fog the engine, add fuel stabilizer, and disconnect the battery. Modern Storage® stores boats but doesn't winterize them — coordinate with your marina or service shop before bringing the boat to the storage facility for the off-season.`,
  },
  {
    q: 'What else can I store at Modern Storage® Lowell?',
    a: `Modern Storage® Lowell is one of the few NWA facilities that combines all three storage categories — boat/RV parking, climate-controlled indoor units for household goods, and business storage for inventory and records. Lake families often pair the boat space with a small climate-controlled unit for lake gear, life jackets, water sports equipment, and seasonal items that shouldn't sit in a hot garage all summer.`,
  },
  {
    q: 'How far is Modern Storage® Lowell from Beaver Lake marinas?',
    a: `Modern Storage® Lowell is roughly 15-25 minutes from most Beaver Lake access points depending on which marina you launch from — Rocky Branch, Prairie Creek, Lost Bridge, Indian Creek, and Beaver Town are all within reasonable trailering distance via Hwy 12, Hwy 264, or US-62. The I-49 location makes it the most central NWA option for lake-area boaters.`,
  },
  {
    q: 'How do I reserve boat or RV storage near Beaver Lake?',
    a: `Visit /locations/lowell to reserve at Modern Storage® Lowell directly, or call 501-910-0096 to confirm space length and current availability. The reservation page shows live availability and pricing. Boat/RV parking availability rotates seasonally — reserve early in spring if you want guaranteed off-season storage in fall.`,
  },
] as const

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Boat & RV Storage Near Beaver Lake',
    name: 'Boat, RV, and Trailer Storage Near Beaver Lake',
    description:
      'Outdoor boat, RV, and trailer storage near Beaver Lake in Northwest Arkansas. Modern Storage® Lowell on I-49 between Rogers and Springdale serves lake-area families with year-round parking storage.',
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
      { '@type': 'ListItem', position: 2, name: 'Boat & RV Storage Near Beaver Lake', item: SITE_URL + PAGE_PATH },
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

export default async function BeaverLakePage() {
  const settings = await getSiteSettings()
  const jsonLd = buildJsonLd(settings.phoneDisplay)
  const PHONE_NUMBER_DISPLAY = settings.phoneDisplay
  const PHONE_NUMBER_HREF = settings.phoneHref

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Boat &amp; RV Storage Near Beaver Lake</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                NWA Lake Storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Boat &amp; RV Storage Near <span className="text-modern-red">Beaver Lake</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
                Off-season boat parking, year-round RV storage, and trailer spaces minutes from Beaver Lake marinas. Modern Storage® Lowell sits on I-49 between Rogers and Springdale — the most central NWA option for lake-area families.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/locations/lowell" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Reserve at Lowell
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/rv-boat-vehicle" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  All Boat &amp; RV Options
                </Link>
                <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  Call {PHONE_NUMBER_DISPLAY}
                </a>
              </div>
            </div>

            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
                <Image src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Boat & RV storage at Modern Storage® — Lowell location is closest to Beaver Lake.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why lake families use storage</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Beaver Lake Boat &amp; RV Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Beaver Lake has one of the largest active boat and RV populations in Northwest Arkansas — and many of those rigs don\'t fit on a residential driveway or in an HOA-restricted neighborhood. Modern Storage® offers <Link href="/rv-boat-vehicle" className="text-modern-red font-semibold hover:underline">boat and RV parking storage</Link> built for lake-area families.
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
              Closest Modern Storage® Locations to Beaver Lake
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Modern Storage® Lowell is the closest NWA facility for Beaver Lake area boat and RV storage. Modern Storage® Bentonville is the next-closest option for indoor and business storage (no boat/RV). Lake Maumelle and Hot Springs customers should see the locations finder for central-Arkansas options.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/locations/lowell" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Closest to Beaver Lake</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">
                Modern Storage® Lowell
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                1407 W Monroe Ave, Lowell, AR 72745. Boat/RV parking, climate-controlled, and business storage on I-49 between Rogers and Springdale. 15-25 minutes from most Beaver Lake marinas via Hwy 12 or US-62. The flagship NWA Modern Storage® location for lake families.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">
                See Lowell details →
              </span>
            </Link>
            <Link href="/locations/maumelle" className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Central AR lake option</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">
                Modern Storage® Maumelle Blvd
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                9100 Maumelle Blvd, North Little Rock, AR 72113. Boat/RV storage on Hwy 100 for Lake Maumelle and Lake Conway families. Not the right pick for Beaver Lake (NWA), but the central-Arkansas analog if you boat or camp closer to Little Rock.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">
                See Maumelle Blvd details →
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
              Beaver Lake Boat &amp; RV Storage FAQ
            </h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Boat or RV Parking Near Beaver Lake
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Modern Storage® Lowell — the closest NWA facility to Beaver Lake. Compare available space length, confirm seasonal availability, and reserve online in minutes.
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
