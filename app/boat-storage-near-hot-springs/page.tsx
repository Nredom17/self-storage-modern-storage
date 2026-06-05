// Boat Storage Near Hot Springs — REWRITTEN 2026-06-05.
//
// Page previously claimed Modern Storage® Hot Springs offered boat,
// RV, and trailer storage covering Lake Hamilton, Lake Ouachita,
// and Lake Catherine. That was wrong: Modern Storage® Hot Springs
// does NOT offer boat or RV parking.
//
// URL preserved for SEO equity on "boat storage near Hot Springs"
// queries. Page now honestly answers the searcher's intent: yes,
// boat storage is available within driving distance of Hot Springs
// — at Modern Storage® Bryant (about 50 min via I-30), the closest
// Modern Storage® facility with boat, RV, and trailer parking. The
// page also surfaces Modern Storage® Hot Springs for related needs
// (climate-controlled lakehouse seasonal storage, boat-area
// household overflow).
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/boat-storage-near-hot-springs'
const HERO_IMAGE = '/images/rv-truck-drive-up-storage.png'
const HERO_ALT =
  'Truck and travel trailer at Modern Storage® drive-up boat and RV storage — closest boat/RV facility to the Hot Springs area lakes is Modern Storage® Bryant'

export const metadata: Metadata = {
  title: {
    absolute: 'Boat & RV Storage Near Hot Springs, AR | Closest Modern Storage® Options',
  },
  description:
    'Looking for boat or RV storage near Hot Springs? Modern Storage® Hot Springs offers climate-controlled household storage only — the closest Modern Storage® boat, RV, and trailer parking is Modern Storage® Bryant (~50 min via I-30).',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Boat & RV Storage Near Hot Springs, AR | Modern Storage®',
    description:
      'Closest Modern Storage® boat and RV parking to Hot Springs is at Modern Storage® Bryant (~50 min via I-30).',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boat & RV Storage Near Hot Springs, AR | Modern Storage®',
    description: 'Closest Modern Storage® boat and RV parking to Hot Springs is at Modern Storage® Bryant.',
    images: [HERO_IMAGE],
  },
}

const FAQS = [
  {
    q: 'Does Modern Storage® Hot Springs offer boat or RV storage?',
    a: `No — Modern Storage® Hot Springs at 2138 Higdon Ferry Road offers climate-controlled and drive-up household self-storage but does not have boat, RV, or trailer parking. Lake Hamilton, Lake Catherine, and Lake Ouachita boat owners use Modern Storage® Bryant, which is the closest Modern Storage® facility with boat, RV, and trailer parking — about 50 minutes northeast via I-30.`,
  },
  {
    q: 'Where is the closest Modern Storage® boat storage to Hot Springs?',
    a: `Modern Storage® Bryant at 300 Dell Drive, Bryant, AR 72022 is the closest Modern Storage® facility with boat, RV, and trailer parking — approximately 50 minutes from Hot Springs via I-30. Modern Storage® Maumelle Blvd in North Little Rock is another option for customers willing to drive a bit farther. Bryant offers outdoor parking sized for typical bass boats, pontoons, ski boats, travel trailers, and mid-size RVs.`,
  },
  {
    q: 'Why does Modern Storage® Hot Springs not offer boat or RV parking?',
    a: `The Higdon Ferry Road facility is built for climate-controlled and drive-up household storage — it does not have outdoor parking spaces sized for boats, RVs, or trailers. The site's footprint and use mix are geared toward Hot Springs households, lakehouse owners, and Hot Springs Village residents storing seasonal items and household overflow. For boat or RV parking, Modern Storage® Bryant is the closest facility built for it.`,
  },
  {
    q: 'Can I store lakehouse household items at Modern Storage® Hot Springs?',
    a: `Yes — that's exactly what the Hot Springs facility is built for. Lake Hamilton, Lake Catherine, and Lake Ouachita lakehouse owners use climate-controlled storage at Modern Storage® Hot Springs for off-season furniture, holiday decor, water-sports gear, electronics, and anything that doesn't belong in a humid lakehouse over winter. A 5x10 covers a typical lakehouse seasonal load; a 10x10 covers larger second-home setups.`,
  },
  {
    q: 'Can I split storage — household at Hot Springs and boat at Bryant?',
    a: `Yes. Many Hot Springs-area lakehouse owners rent a climate-controlled unit at Modern Storage® Hot Springs for household and seasonal items and an outdoor parking space at Modern Storage® Bryant for the boat or RV. Both are month-to-month rentals with no long-term contract, so you can size each one to match your actual use.`,
  },
  {
    q: 'How do I reserve boat or RV storage near Hot Springs?',
    a: `For boat or RV parking, reserve at /locations/bryant — Modern Storage® Bryant is the closest Modern Storage® facility with boat, RV, and trailer parking. For household, climate-controlled, or drive-up storage in the Hot Springs area, reserve at /locations/hot-springs. Or call 501-910-0096 and the team will help you find the right unit at the right facility.`,
  },
] as const

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Boat and RV Storage Near Hot Springs',
    name: 'Boat & RV Storage Near Hot Springs — Closest Modern Storage® Options',
    description:
      'Closest Modern Storage® boat, RV, and trailer parking to Hot Springs is Modern Storage® Bryant (about 50 minutes via I-30). Modern Storage® Hot Springs offers climate-controlled and drive-up household storage but not boat or RV parking.',
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
      { '@type': 'ListItem', position: 2, name: 'Boat & RV Storage Near Hot Springs', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [service, breadcrumb, faqPage]
}

export default async function HotSpringsRegionalPage() {
  const settings = await getSiteSettings()
  const jsonLd = buildJsonLd()
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
              <li className="text-gray-300">Boat &amp; RV Storage Near Hot Springs</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Closest Modern Storage® options
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Boat &amp; RV Storage Near <span className="text-modern-red">Hot Springs</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Modern Storage® Hot Springs offers climate-controlled and drive-up household storage but does not have boat or RV parking. The closest Modern Storage® facility with boat, RV, and trailer parking is Modern Storage® Bryant — about 50 minutes northeast via I-30.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/locations/bryant" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Boat &amp; RV at Bryant
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
                Drive-up RV storage at Modern Storage® Bryant — closest Modern Storage® boat/RV parking to Hot Springs.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── HEADLINE CALLOUT — the page's main answer, surfaced
          immediately so the searcher doesn't scroll. */}
      <section className="bg-amber-50 py-8 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-black text-charcoal text-base sm:text-lg leading-tight mb-1">
                Modern Storage® Hot Springs does not offer boat or RV parking.
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                The Higdon Ferry Road facility offers <strong>climate-controlled and drive-up household storage only</strong>. For boat, RV, or trailer parking near the Hot Springs lakes, use{' '}
                <Link href="/locations/bryant" className="text-modern-red font-bold hover:underline">
                  Modern Storage® Bryant
                </Link>
                {' '}(about 50 minutes northeast via I-30).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO-FACILITY GUIDE ─────────────────────────────────────
          Surfaces both the boat/RV facility (Bryant) and the
          climate-controlled household facility (Hot Springs) so the
          page serves both intents searchers arrive with. */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Two Modern Storage® facilities serve Hot Springs lake-area customers</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Pick the Facility That Matches Your Need
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Boat, RV, and trailer parking is at Modern Storage® Bryant. Climate-controlled and drive-up household storage is at Modern Storage® Hot Springs. Many Hot Springs-area lakehouse owners use both — household items in Hot Springs, the boat or RV at Bryant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/locations/bryant" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all block">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">For boat, RV &amp; trailer parking</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Bryant</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                300 Dell Dr, Bryant, AR 72022. ~50 minutes northeast of Hot Springs via I-30. <strong>Outdoor boat, RV, and trailer parking</strong> for bass boats, pontoons, ski boats, travel trailers, and mid-size RVs. Climate-controlled household units also available.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Bryant details →</span>
            </Link>
            <Link href="/locations/hot-springs" className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all block">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">For lakehouse household storage</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Hot Springs</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                2138 Higdon Ferry Rd, Hot Springs, AR 71913. Minutes from Lake Hamilton; ~25 minutes from Lake Ouachita. <strong>Climate-controlled and drive-up household storage</strong> for lakehouse seasonal items, furniture, decor, and overflow. <strong>No boat or RV parking.</strong>
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Hot Springs details →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Boat &amp; RV Storage Near Hot Springs — FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve the Right Storage Near Hot Springs
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Modern Storage® Bryant for boat, RV, and trailer parking. Modern Storage® Hot Springs for climate-controlled and drive-up household storage. Month-to-month, no long-term contracts at either.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/bryant" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Boat &amp; RV at Bryant
            </Link>
            <Link href="/locations/hot-springs" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              Household at Hot Springs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
