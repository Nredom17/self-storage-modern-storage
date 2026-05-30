import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/storage-near-greers-ferry-lake'
const HERO_IMAGE = '/images/modern-storage-maumelle-facility-aerial.jpg'
const HERO_ALT =
  'Modern Storage® Maumelle Blvd facility aerial view — boat, RV, and trailer storage for central Arkansas customers driving to Greers Ferry Lake'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Near Greers Ferry Lake | Modern Storage® Maumelle Blvd',
  },
  description:
    'Boat and RV storage for central Arkansas customers who lake at Greers Ferry. Modern Storage® Maumelle Blvd is the closest Little Rock-area facility on the route between LR metro and Heber Springs / Greers Ferry Lake.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Near Greers Ferry Lake | Modern Storage® Maumelle Blvd',
    description:
      'Boat and RV storage for Little Rock-area customers headed to Greers Ferry Lake — Modern Storage® Maumelle Blvd.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Near Greers Ferry Lake | Modern Storage®',
    description: 'Boat and RV storage for central AR customers headed to Greers Ferry Lake.',
    images: [HERO_IMAGE],
  },
}

const USE_CASES = [
  {
    title: 'Central AR weekend boaters',
    body:
      'Little Rock, NLR, Maumelle, and Conway-area families who lake at Greers Ferry don\'t want to tow the boat the full 75-minute drive home each Sunday. Modern Storage® Maumelle Blvd is roughly on the route home from Heber Springs and works as a between-trips parking solution.',
  },
  {
    title: 'Off-season boat storage',
    body:
      'Greers Ferry\'s active boating season runs roughly April through October. Drop the boat at Modern Storage® Maumelle Blvd after the last trip, pull it back out when the lake warms. Month-to-month means you only pay during the months you actually need storage.',
  },
  {
    title: 'Maumelle & Conway-area lake families',
    body:
      'Maumelle Blvd is most convenient for customers in Maumelle, west NLR, Conway, and Mayflower who regularly tow a boat or trailer to Greers Ferry. The facility is on Highway 100 / I-40 corridor — the natural route between central AR and Heber Springs.',
  },
  {
    title: 'Striper & walleye fishing',
    body:
      'Greers Ferry is one of the top striper and walleye fisheries in the South. Year-round fishing means year-round storage — Modern Storage® Maumelle Blvd offers month-to-month parking so you can hold the boat through tournament season.',
  },
  {
    title: 'Travel-trailer camping at Greers Ferry',
    body:
      'Greers Ferry has several large Corps of Engineers campgrounds. Travel-trailer owners who store between camping trips use Modern Storage® Maumelle Blvd as central-Arkansas\'s closest RV parking on the route to Heber Springs.',
  },
  {
    title: 'Sugar Loaf Mountain & lakefront weekenders',
    body:
      'Boat owners with lakefront property near Sugar Loaf, Fairfield Bay, or Edgemont who keep a second boat or tow vehicle in central Arkansas use Modern Storage® Maumelle Blvd as the parking spot for that second rig.',
  },
] as const

const FAQS = [
  {
    q: 'How far is Modern Storage® Maumelle Blvd from Greers Ferry Lake?',
    a: `Modern Storage® Maumelle Blvd at 9100 Maumelle Boulevard is approximately 75 minutes from Heber Springs and the Greers Ferry Lake boat ramps via Highway 65 and Highway 25. It's the closest Modern Storage® facility to Greers Ferry — most of our Greers Ferry customers live in Little Rock metro and use Maumelle Blvd as their between-trips parking spot on the route home.`,
  },
  {
    q: 'Is it worth driving an hour-plus to store a boat?',
    a: `For many central Arkansas Greers Ferry boaters, yes. The alternative is towing a 25-foot boat through Little Rock traffic every weekend, or parking it on a driveway against HOA rules. Most customers drop the boat at Modern Storage® Maumelle Blvd after the last trip of the season and pull it back out a few months later — one round-trip vs. weekly tows. Tournament anglers and frequent users may prefer storage closer to the lake; everyone else finds Maumelle Blvd practical.`,
  },
  {
    q: 'What does Modern Storage® Maumelle Blvd offer?',
    a: `Modern Storage® Maumelle Blvd offers outdoor boat/RV/trailer parking, indoor climate-controlled units, and drive-up access. It's one of the Modern Storage® locations specifically positioned for boat and RV customers — the facility sits on Hwy 100 between west NLR and the city of Maumelle, the most natural route between central AR and Greers Ferry / Heber Springs.`,
  },
  {
    q: 'How big a boat or RV can I store?',
    a: `Modern Storage® Maumelle Blvd accommodates typical bass boats, ski boats, pontoons, travel trailers, and small to mid-size motorhomes. Larger Class A rigs may have space-length constraints — call 501-910-0096 with your overall length (including trailer) and the team will confirm a fit.`,
  },
  {
    q: 'Can I rent month-to-month for off-season only?',
    a: `Yes. Every Modern Storage® rental is month-to-month with no long-term contract. Rent for 4-6 months of off-season storage (November through April is the most common Greers Ferry off-season window), close out for the active season, restart for the next winter. No annual commitment, no early-termination fees.`,
  },
  {
    q: 'Are there closer options if I live near Greers Ferry?',
    a: `Modern Storage® doesn't currently have a facility in Heber Springs or the Greers Ferry area. If you live within 30 minutes of the lake itself, Maumelle Blvd may be too far — local options closer to Heber Springs may make more sense. For Little Rock metro customers (where Maumelle Blvd is roughly on the route home), this guide is the right starting point.`,
  },
  {
    q: 'How do I reserve at Modern Storage® Maumelle Blvd?',
    a: `Visit /locations/maumelle to reserve directly. The page shows available unit sizes and a reservation link. For boat/RV parking specifically, call 501-910-0096 to confirm space length availability before you reserve.`,
  },
] as const

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Storage Near Greers Ferry Lake',
    name: 'Storage Near Greers Ferry Lake — Modern Storage® Maumelle Blvd',
    description:
      'Boat, RV, and trailer storage for central Arkansas customers who lake at Greers Ferry. Modern Storage® Maumelle Blvd is the closest Little Rock-area facility on the route between LR metro and Heber Springs / Greers Ferry Lake.',
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
      { '@type': 'ListItem', position: 2, name: 'Storage Near Greers Ferry Lake', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [service, breadcrumb, faqPage]
}

export default async function GreersFerryPage() {
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
              <li className="text-gray-300">Storage Near Greers Ferry Lake</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Central AR lake storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Storage Near <span className="text-modern-red">Greers Ferry Lake</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Boat and RV storage for Little Rock-area customers who lake at Greers Ferry. Modern Storage® Maumelle Blvd is the closest central-Arkansas facility — roughly on the route home from Heber Springs to LR metro, with year-round parking for boats, RVs, and trailers.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/locations/maumelle" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Reserve at Maumelle Blvd
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
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
                Modern Storage® Maumelle Blvd — central Arkansas&apos;s closest boat/RV facility on the route to Greers Ferry.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why central AR boaters use Maumelle Blvd</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Six Greers Ferry Lake Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Greers Ferry Lake is a 75-minute drive from Little Rock metro — too far to tow weekly, close enough to visit often. Modern Storage® <Link href="/rv-boat-vehicle" className="text-modern-red font-semibold hover:underline">boat and RV parking</Link> at Maumelle Blvd splits the difference for central-Arkansas families.
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
              Closest Modern Storage® Location for Greers Ferry Boaters
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              <Link href="/locations/maumelle" className="text-modern-red font-semibold hover:underline">Modern Storage® Maumelle Blvd</Link> is the closest facility — on Hwy 100 between west NLR and the city of Maumelle, roughly on the route between Little Rock metro and Greers Ferry / Heber Springs.
            </p>
          </div>
          <Link href="/locations/maumelle" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all block max-w-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Maumelle Blvd · ~75 min to Greers Ferry</p>
            <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Maumelle Blvd</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              9100 Maumelle Blvd, North Little Rock, AR 72113. Outdoor boat/RV/trailer parking, indoor climate-controlled, drive-up access. Serves Maumelle, west NLR, Conway, and Mayflower lake families.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Maumelle Blvd details →</span>
          </Link>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Greers Ferry Lake Storage FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Storage Near Greers Ferry Lake
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Modern Storage® Maumelle Blvd — central Arkansas&apos;s closest boat/RV facility on the route to Heber Springs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/maumelle" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Reserve at Maumelle Blvd
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
