// Storage Near Lake Hamilton — REWRITTEN 2026-06-05.
//
// Page previously positioned Modern Storage® Hot Springs as the
// boat/RV/lake-storage anchor for Lake Hamilton. That was wrong:
// Modern Storage® Hot Springs does NOT offer boat or RV storage.
// The page now honestly splits the two intents:
//
//   1. Lake Hamilton households / lakehouse owners / seasonal
//      residents → Modern Storage® Hot Springs (5 min from
//      lakefront) for climate-controlled + drive-up household
//      and seasonal storage.
//
//   2. Lake Hamilton boat / RV / trailer owners → Modern Storage®
//      Bryant (closest boat/RV facility, ~50 min via I-30) or
//      Modern Storage® Maumelle Blvd as a fallback.
//
// URL preserved for SEO equity on "storage near Lake Hamilton"
// queries; title and JSON-LD updated to match reality.
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/storage-near-lake-hamilton'
const HERO_IMAGE = '/images/modern-storage-hot-springs-facility-exterior.jpg'
const HERO_ALT =
  'Modern Storage® Hot Springs self-storage facility — climate-controlled and drive-up storage minutes from Lake Hamilton'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Near Lake Hamilton, AR | Climate-Controlled & Drive-Up | Modern Storage®',
  },
  description:
    'Climate-controlled and drive-up self-storage minutes from Lake Hamilton in Hot Springs, AR. Modern Storage® Hot Springs sits ~5 minutes from the lakefront for lakehouse seasonal storage, household overflow, and Hot Springs Village residents. Boat & RV parking available at Modern Storage® Bryant.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Near Lake Hamilton, AR | Modern Storage® Hot Springs',
    description:
      'Climate-controlled and drive-up self-storage minutes from Lake Hamilton — Modern Storage® Hot Springs.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Near Lake Hamilton, AR | Modern Storage®',
    description: 'Climate-controlled and drive-up self-storage minutes from Lake Hamilton.',
    images: [HERO_IMAGE],
  },
}

const USE_CASES = [
  {
    title: 'Lakehouse seasonal storage',
    body:
      'Lake Hamilton has one of the highest second-home concentrations in Arkansas. Owners use climate-controlled units at Modern Storage® Hot Springs for off-season furniture, holiday decor, water-sports gear, and items they don\'t want sitting in a humid lakehouse all winter.',
  },
  {
    title: 'Household overflow',
    body:
      'Garage, attic, and basement overflow for full-time Hot Springs and Lake Hamilton residents. Climate-controlled and drive-up units cover everything from furniture and electronics to outdoor gear and seasonal decor.',
  },
  {
    title: 'Out-of-state lakehouse owners',
    body:
      'Many Lake Hamilton lakehouses belong to Dallas, Memphis, and St. Louis-area families. Modern Storage® Hot Springs is a year-round drop point for furniture, supplies, and lakehouse items while the house sits empty between visits.',
  },
  {
    title: 'Hot Springs Village residents',
    body:
      'HSV residents who want indoor climate-controlled storage closer to town use Modern Storage® Hot Springs as a short-drive solution for household and lakehouse items.',
  },
  {
    title: 'Moving in or out',
    body:
      'Month-to-month rentals for residents between homes, retirees moving from out of state, and lake-area homeowners renovating or downsizing. The free moving truck program at participating Modern Storage® locations makes move-in straightforward.',
  },
  {
    title: 'Boat & RV parking (nearby option)',
    body:
      'Modern Storage® Hot Springs does not offer boat or RV parking. Lake Hamilton boat and RV owners use Modern Storage® Bryant (about 50 minutes northeast via I-30) — the closest Modern Storage® facility with boat, RV, and trailer parking.',
  },
] as const

const FAQS = [
  {
    q: 'How close is Modern Storage® to Lake Hamilton?',
    a: `Modern Storage® Hot Springs at 2138 Higdon Ferry Road is approximately 5 minutes from the Lake Hamilton lakefront. The facility serves customers across central Hot Springs, the Hot Springs Mall corridor, Lakeside, Pearcy, and the south-shore Lake Hamilton communities. It's the closest Modern Storage® location to Lake Hamilton.`,
  },
  {
    q: 'Does Modern Storage® Hot Springs offer boat or RV parking?',
    a: `No — Modern Storage® Hot Springs offers climate-controlled and drive-up household storage but does not have boat or RV parking. Lake Hamilton boat and RV owners typically use Modern Storage® Bryant, which is the closest Modern Storage® facility with boat, RV, and trailer parking (about 50 minutes northeast via I-30). Modern Storage® Maumelle Blvd is another option for Lake Hamilton-area customers willing to drive a bit farther.`,
  },
  {
    q: 'Do you offer storage for lakehouse seasonal items?',
    a: `Yes — climate-controlled storage at Modern Storage® Hot Springs is a popular option for Lake Hamilton lakehouse owners. Off-season furniture, holiday decor, water-sports equipment, and items you don't want sitting in a humid lakehouse over winter all benefit from indoor temperature-stable storage. Most lakehouse customers rent a 5x10 or 10x10 unit.`,
  },
  {
    q: 'Why is climate-controlled storage important near Lake Hamilton?',
    a: `Arkansas summer humidity routinely exceeds 70%, and a closed-up lakehouse over winter or summer can develop interior humidity high enough to mildew fabric, warp wood, and damage electronics. Climate-controlled storage at Modern Storage® Hot Springs keeps belongings in a stable 59°F to 79°F environment year-round — well worth it for furniture, photos, instruments, and anything stored more than a few weeks.`,
  },
  {
    q: 'What size unit should Lake Hamilton lakehouse owners rent?',
    a: `Most Lake Hamilton lakehouse owners rent a 5x10 (50 sq ft) for seasonal furniture, decor, and gear from a typical second-home setup. Owners with larger lakefront properties or multiple rooms of off-season storage step up to a 10x10 (100 sq ft) or 10x15. The size guide on this site walks through what fits in every Modern Storage® unit size.`,
  },
  {
    q: 'Do you have a free moving truck for new rentals?',
    a: `Yes — Modern Storage® Hot Springs is a participating location for the free moving truck program with new rentals. The free truck helps Lake Hamilton-area residents move household items from a lakehouse or full-time residence into storage without renting a second vehicle. Truck availability, mileage limits, and requirements vary — confirm before move-in.`,
  },
  {
    q: 'How do I reserve a unit?',
    a: `Visit /locations/hot-springs to reserve at Modern Storage® Hot Springs directly. You can compare unit sizes, climate-controlled availability, and current move-in offers from your phone or laptop. For boat or RV parking specifically, reserve at /locations/bryant instead — Modern Storage® Bryant is the closest Modern Storage® facility with boat/RV/trailer parking.`,
  },
] as const

function buildJsonLd(_phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Storage Near Lake Hamilton',
    name: 'Storage Near Lake Hamilton — Modern Storage® Hot Springs',
    description:
      'Climate-controlled and drive-up self-storage minutes from Lake Hamilton in Hot Springs, Arkansas. Modern Storage® Hot Springs is approximately 5 minutes from the Lake Hamilton lakefront and serves lakehouse owners, full-time residents, and Hot Springs Village customers. Boat and RV parking are available at Modern Storage® Bryant (~50 min via I-30).',
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
                Climate-controlled and drive-up self-storage minutes from Lake Hamilton. Modern Storage® Hot Springs sits approximately 5 minutes from the lakefront — the closest Modern Storage® facility for Lake Hamilton lakehouse owners, full-time residents, and Hot Springs Village customers.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/locations/hot-springs" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Reserve at Hot Springs
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  Call to Rent a Unit
                </a>
              </div>
            </div>
            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] lg:aspect-[4/3] bg-gray-800 relative">
                <Image src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Modern Storage® Hot Springs — climate-controlled and drive-up storage minutes from Lake Hamilton.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── HONEST BOAT/RV REDIRECT CALLOUT ─────────────────────────
          Surfaces the Hot Springs / boat-RV split prominently above
          the use cases so a boat-storage searcher doesn't scroll
          half the page before learning they need a different
          facility. */}
      <section className="bg-amber-50 py-8 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="font-black text-charcoal text-base sm:text-lg leading-tight mb-1">
                Looking for boat or RV parking near Lake Hamilton?
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Modern Storage® Hot Springs offers <strong>household storage only</strong> — no boat or RV parking. The closest Modern Storage® facility with boat, RV, and trailer parking is{' '}
                <Link href="/locations/bryant" className="text-modern-red font-bold hover:underline">
                  Modern Storage® Bryant
                </Link>
                {' '}(about 50 minutes northeast via I-30).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why Lake Hamilton residents use storage</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Lake Hamilton Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Lake Hamilton has one of the largest lakefront second-home populations in Arkansas. Most lakehouses sit empty between weekends, owners need off-season storage for furniture and gear, and full-time residents want indoor storage for everything from photos to seasonal decor. Modern Storage® Hot Springs fits each of these patterns — see{' '}
              <Link href="/climate-controlled" className="text-modern-red font-semibold hover:underline">climate-controlled storage</Link>
              {' '}for the full benefit breakdown.
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
              Closest Modern Storage® Locations for Lake Hamilton
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Two Modern Storage® locations serve Lake Hamilton — one for household and seasonal storage, one for boat and RV parking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Link href="/locations/hot-springs" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all block">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Hot Springs · ~5 min from Lake Hamilton</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Hot Springs</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                2138 Higdon Ferry Rd, Hot Springs, AR 71913. <strong>Household storage:</strong> climate-controlled and drive-up units, free moving truck for new rentals. Serves Lake Hamilton, Hot Springs Village, and Lakeside lakehouse owners.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Hot Springs details →</span>
            </Link>
            <Link href="/locations/bryant" className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all block">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Bryant · ~50 min via I-30</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Bryant</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                300 Dell Dr, Bryant, AR 72022. <strong>Boat, RV, and trailer parking</strong> — closest Modern Storage® facility to Lake Hamilton with outdoor boat and RV storage. Climate-controlled household units also available.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Bryant details →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Lake Hamilton Storage FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Storage Near Lake Hamilton
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Modern Storage® Hot Springs — 5 minutes from the Lake Hamilton lakefront, climate-controlled and drive-up household storage, month-to-month rentals. Boat and RV parking at Modern Storage® Bryant.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/hot-springs" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Reserve at Hot Springs
            </Link>
            <Link href="/locations/bryant" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              Boat &amp; RV at Bryant
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
