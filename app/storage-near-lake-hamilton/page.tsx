import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/storage-near-lake-hamilton'
const HERO_IMAGE = '/images/enclosed-rv-storage-trailer-unit-modern-storage.png'
const HERO_ALT =
  'Travel trailer inside a Modern Storage® enclosed unit — boat, RV, and seasonal storage minutes from Lake Hamilton in Hot Springs'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Near Lake Hamilton, AR | Modern Storage® Hot Springs',
  },
  description:
    'Boat, RV, and seasonal lake storage minutes from Lake Hamilton in Hot Springs. Modern Storage® Hot Springs sits ~5 minutes from the lakefront — off-season boat parking, RV storage, and climate-controlled units for lakehouse seasonal items.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Near Lake Hamilton, AR | Modern Storage® Hot Springs',
    description:
      'Boat, RV, and seasonal storage minutes from Lake Hamilton — Modern Storage® Hot Springs.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Near Lake Hamilton, AR | Modern Storage®',
    description: 'Boat, RV, and seasonal storage near Lake Hamilton at Modern Storage® Hot Springs.',
    images: [HERO_IMAGE],
  },
}

const USE_CASES = [
  {
    title: 'Off-season boat storage',
    body:
      'October through April most Lake Hamilton boats sit unused. Modern Storage® Hot Springs is ~5 minutes from the lakefront — drop the boat after the last trip of the season and pull it back out when the weather warms.',
  },
  {
    title: 'Lakehouse seasonal storage',
    body:
      'Lake Hamilton has one of the highest second-home concentrations in Arkansas. Owners use climate-controlled units for off-season furniture, holiday decor, and items they don\'t want sitting in a humid lakehouse all winter.',
  },
  {
    title: 'RV between trips',
    body:
      'Lake Hamilton RV owners who tow their rig between lake trips and other destinations use Modern Storage® Hot Springs for parking between weekends — no HOA enforcement, no driveway sun damage.',
  },
  {
    title: 'Out-of-state lakehouse owners',
    body:
      'Many Lake Hamilton lakehouses belong to Dallas, Memphis, and St. Louis-area families. Modern Storage® Hot Springs is a year-round drop point for boats, jet skis, and supplies while the house sits empty between visits.',
  },
  {
    title: 'Hot Springs Village residents',
    body:
      'HSV residents who want to keep a boat, RV, or trailer outside the village\'s HOA boundaries use Modern Storage® Hot Springs as a short-drive solution. Same lake access, no community parking restrictions.',
  },
  {
    title: 'Jet ski & PWC parking',
    body:
      'Personal watercraft sit on trailers that are awkward to store. A small parking space at Modern Storage® Hot Springs keeps PWCs trailer-ready for the next Lake Hamilton weekend.',
  },
] as const

const FAQS = [
  {
    q: 'How close is Modern Storage® to Lake Hamilton?',
    a: `Modern Storage® Hot Springs at 2138 Higdon Ferry Road is approximately 5 minutes from the Lake Hamilton lakefront. The facility serves customers across central Hot Springs, the Hot Springs Mall corridor, Lakeside, Pearcy, and the south-shore Lake Hamilton communities. It's the closest Modern Storage® location to Lake Hamilton, Lake Catherine, and Lake Ouachita.`,
  },
  {
    q: 'Can I store a boat for the off-season?',
    a: `Yes. Off-season boat storage is one of the most common Lake Hamilton use cases for Modern Storage® Hot Springs. Drop the boat after the last weekend of the season (typically October), close out the unit when you pull it back in spring. Climate-controlled units are also available for boats that include sensitive electronics, upholstery, or wood components that benefit from indoor protection.`,
  },
  {
    q: 'Do you offer storage for lakehouse seasonal items?',
    a: `Yes — climate-controlled storage at Modern Storage® Hot Springs is a popular option for Lake Hamilton lakehouse owners. Off-season furniture, holiday decor, water-sports equipment, and items you don't want sitting in a humid lakehouse over winter all benefit from indoor temperature-stable storage. Most lakehouse customers rent a 5x10 or 10x10 unit.`,
  },
  {
    q: 'How big a boat can I store?',
    a: `Modern Storage® Hot Springs offers outdoor parking storage and indoor climate-controlled units. Outdoor parking accommodates typical bass boats, ski boats, pontoons, and small to mid-size travel trailers. Larger Class A motorhomes or longer fifth-wheels may have limited availability — bring your overall length (including trailer) and the team can confirm a fit.`,
  },
  {
    q: 'Do you have RV storage for Lake Hamilton trips?',
    a: `Yes. Modern Storage® Hot Springs offers RV and trailer parking for customers who tow rigs between Lake Hamilton trips and other destinations. Month-to-month rentals match seasonal use patterns — keep the unit during boating season, close out in winter or vice versa.`,
  },
  {
    q: 'Is Modern Storage® Hot Springs near Lake Catherine and Lake Ouachita too?',
    a: `Yes — the same Modern Storage® Hot Springs facility serves customers across all three Hot Springs-area lakes: Lake Hamilton (~5 min), Lake Catherine (~15 min), and Lake Ouachita (~25 min). One facility, all three lakes within reasonable trailering distance. See the Boat Storage Near Hot Springs guide for the full regional setup.`,
  },
  {
    q: 'How do I reserve a unit?',
    a: `Visit /locations/hot-springs to reserve at Modern Storage® Hot Springs directly. You can compare unit sizes, climate-controlled availability, and current move-in offers from your phone or laptop. For boat or RV parking specifically, call 501-910-0096 first to confirm space length availability for your rig.`,
  },
] as const

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Storage Near Lake Hamilton',
    name: 'Storage Near Lake Hamilton — Modern Storage® Hot Springs',
    description:
      'Boat, RV, seasonal, and climate-controlled storage minutes from Lake Hamilton in Hot Springs, Arkansas. Modern Storage® Hot Springs is approximately 5 minutes from the Lake Hamilton lakefront and serves Lake Hamilton, Lake Catherine, and Lake Ouachita.',
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
      { '@type': 'ListItem', position: 2, name: 'Storage Near Lake Hamilton', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [service, breadcrumb, faqPage]
}

export default async function LakeHamiltonPage() {
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
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Storage Near Lake Hamilton</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Hot Springs lake storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Storage Near <span className="text-modern-red">Lake Hamilton</span>, AR
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Boat, RV, and seasonal lake storage minutes from Lake Hamilton in Hot Springs. Modern Storage® Hot Springs sits approximately 5 minutes from the lakefront — the closest Modern Storage® facility for Lake Hamilton, Lake Catherine, and Lake Ouachita boaters and lakehouse owners.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/locations/hot-springs" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Reserve at Hot Springs
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
                Indoor enclosed RV/boat storage at Modern Storage® — minutes from Lake Hamilton.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why Lake Hamilton families use storage</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Six Lake Hamilton Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Lake Hamilton has one of the largest active boat and lakehouse populations in Arkansas. Most boats sit unused October through April, lakehouses sit empty between weekends, and Hot Springs Village residents need parking outside HOA boundaries. Modern Storage® <Link href="/rv-boat-vehicle" className="text-modern-red font-semibold hover:underline">boat and RV storage</Link> fits each of these patterns.
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
              Closest Modern Storage® Location to Lake Hamilton
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              <Link href="/locations/hot-springs" className="text-modern-red font-semibold hover:underline">Modern Storage® Hot Springs</Link> is the closest facility — about 5 minutes from the Lake Hamilton lakefront and within 25 minutes of both Lake Catherine and Lake Ouachita. One facility, three lakes.
            </p>
          </div>
          <Link href="/locations/hot-springs" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all block max-w-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Hot Springs · 5 min from Lake Hamilton</p>
            <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Hot Springs</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              2138 Higdon Ferry Rd, Hot Springs, AR 71913. Climate-controlled, drive-up, and boat/RV/trailer parking storage. Serves Lake Hamilton, Lake Catherine, Lake Ouachita, Hot Springs Village, and Lakeside.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Hot Springs details →</span>
          </Link>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Lake Hamilton Storage FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Boat or RV Storage Near Lake Hamilton
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Modern Storage® Hot Springs — 5 minutes from the Lake Hamilton lakefront. Month-to-month rentals, climate-controlled and outdoor parking options, and seasonal flexibility for boat owners.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/hot-springs" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Reserve at Hot Springs
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
