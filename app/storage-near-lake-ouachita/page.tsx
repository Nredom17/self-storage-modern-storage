// Storage Near Lake Ouachita — REWRITTEN 2026-06-05.
//
// Page previously positioned Modern Storage® Hot Springs as a
// boat / RV / trailer parking anchor for Lake Ouachita. That was
// wrong: Hot Springs offers household storage only — no boat or
// RV parking. The page now honestly splits the two intents:
//
//   1. Lake Ouachita households / lakehouse owners → Modern
//      Storage® Hot Springs (~25 min via Hwy 270) for climate-
//      controlled and drive-up household / seasonal storage.
//
//   2. Lake Ouachita boat / RV / trailer owners → Modern Storage®
//      Bryant (closest boat/RV facility) or Modern Storage®
//      Maumelle Blvd.
//
// URL preserved for SEO equity on "storage near Lake Ouachita"
// queries; content updated to match reality.
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/storage-near-lake-ouachita'
const HERO_IMAGE = '/images/modern-storage-hot-springs-facility-exterior.jpg'
const HERO_ALT =
  'Modern Storage® Hot Springs facility exterior — climate-controlled and drive-up self-storage for Lake Ouachita-area residents'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Near Lake Ouachita, AR | Climate-Controlled & Drive-Up | Modern Storage®',
  },
  description:
    'Climate-controlled and drive-up self-storage near Lake Ouachita — the largest lake in Arkansas. Modern Storage® Hot Springs is ~25 minutes from the lake for lakehouse seasonal storage and household overflow. Boat & RV parking at Modern Storage® Bryant.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Near Lake Ouachita, AR | Modern Storage® Hot Springs',
    description:
      'Climate-controlled and drive-up self-storage near Lake Ouachita — Modern Storage® Hot Springs.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Near Lake Ouachita, AR | Modern Storage®',
    description: 'Climate-controlled and drive-up self-storage near Lake Ouachita.',
    images: [HERO_IMAGE],
  },
}

const USE_CASES = [
  {
    title: 'Lake Ouachita lakehouse seasonal storage',
    body:
      'Lake Ouachita\'s second-home and lakehouse community uses climate-controlled units at Modern Storage® Hot Springs for off-season furniture, holiday decor, fishing gear, and items that don\'t belong in a humid lakehouse over winter.',
  },
  {
    title: 'Out-of-state lake regulars',
    body:
      'Lake Ouachita draws weekenders from Dallas-Fort Worth, Tulsa, and Memphis. Modern Storage® Hot Springs is a year-round drop point for furniture, supplies, and lakehouse items — climate-controlled options keep belongings protected between visits.',
  },
  {
    title: 'Hot Springs Village + Lake Ouachita households',
    body:
      'HSV residents and full-time Hot Springs area homeowners use Modern Storage® Hot Springs for indoor climate-controlled storage closer to town. Off-season decor, downsizing overflow, and renovation storage all fit.',
  },
  {
    title: 'Moving and downsizing',
    body:
      'Month-to-month rentals for residents between homes, retirees relocating to the Lake Ouachita area, and lake-area homeowners renovating or downsizing. The free moving truck program at participating Modern Storage® locations makes move-in easier.',
  },
  {
    title: 'Tournament gear and equipment',
    body:
      'Lake Ouachita hosts a year-round bass tournament scene. Climate-controlled storage at Modern Storage® Hot Springs keeps electronics, rods, reels, and gear at stable indoor temperatures between events.',
  },
  {
    title: 'Boat & RV parking (nearby option)',
    body:
      'Modern Storage® Hot Springs does not offer boat or RV parking. Lake Ouachita boat, RV, and trailer owners use Modern Storage® Bryant (about 75 minutes northeast via I-30) — the closest Modern Storage® facility with boat, RV, and trailer parking.',
  },
] as const

const FAQS = [
  {
    q: 'How far is Modern Storage® from Lake Ouachita?',
    a: `Modern Storage® Hot Springs at 2138 Higdon Ferry Road is approximately 25 minutes from the Lake Ouachita boat ramps via Highway 270 West. It's the closest Modern Storage® facility for Lake Ouachita lakehouse owners and full-time residents looking for climate-controlled or drive-up household storage.`,
  },
  {
    q: 'Does Modern Storage® Hot Springs offer boat or RV parking?',
    a: `No — Modern Storage® Hot Springs offers climate-controlled and drive-up household storage but does not have boat, RV, or trailer parking. Lake Ouachita boat and RV owners typically use Modern Storage® Bryant, which is the closest Modern Storage® facility with boat, RV, and trailer parking (about 75 minutes northeast via I-30). Modern Storage® Maumelle Blvd is another option for Lake Ouachita-area customers willing to drive a bit farther.`,
  },
  {
    q: 'Why is climate-controlled storage important near Lake Ouachita?',
    a: `Arkansas summer humidity routinely exceeds 70%, and a closed-up lakehouse can develop interior humidity high enough over winter or summer to mildew fabric, warp wood, and damage electronics. Climate-controlled storage at Modern Storage® Hot Springs keeps belongings in a stable 59°F to 79°F environment year-round — well worth it for furniture, photos, instruments, and anything stored more than a few weeks.`,
  },
  {
    q: 'Can I store year-round for tournament fishing gear?',
    a: `Yes. Modern Storage® rentals are month-to-month — keep the unit for the full year if you fish Lake Ouachita year-round, or rent only during specific months. No long-term contract, no annual commitment, no early-termination fees. Climate-controlled units protect rods, reels, electronics, and tackle from the heat and humidity that degrade gear.`,
  },
  {
    q: 'What size unit should a Lake Ouachita lakehouse owner rent?',
    a: `Most Lake Ouachita lakehouse owners rent a 5x10 (50 sq ft) for seasonal furniture, decor, and gear from a typical second-home setup. Owners with larger lakefront properties step up to a 10x10 (100 sq ft) or 10x15. The size guide on this site walks through what fits in every Modern Storage® unit size.`,
  },
  {
    q: 'Does Modern Storage® Hot Springs also serve Lake Hamilton and Lake Catherine?',
    a: `Yes — the same facility serves all three Hot Springs-area lakes for household storage: Lake Hamilton (~5 min), Lake Catherine (~15 min), and Lake Ouachita (~25 min). See the storage guides for each lake or visit /locations/hot-springs to reserve.`,
  },
  {
    q: 'How do I reserve a unit?',
    a: `Visit /locations/hot-springs to reserve at Modern Storage® Hot Springs directly for household and climate-controlled storage. For boat or RV parking, visit /locations/bryant — Modern Storage® Bryant is the closest Modern Storage® facility with boat/RV/trailer parking.`,
  },
] as const

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Storage Near Lake Ouachita',
    name: 'Storage Near Lake Ouachita — Modern Storage® Hot Springs',
    description:
      'Climate-controlled and drive-up self-storage near Lake Ouachita — the largest lake in Arkansas. Modern Storage® Hot Springs is approximately 25 minutes from the lake and serves Lake Ouachita lakehouse owners and full-time residents. Boat and RV parking are available at Modern Storage® Bryant.',
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
      { '@type': 'ListItem', position: 2, name: 'Storage Near Lake Ouachita', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [service, breadcrumb, faqPage]
}

export default async function LakeOuachitaPage() {
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
              <li className="text-gray-300">Storage Near Lake Ouachita</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Hot Springs lake storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Storage Near <span className="text-modern-red">Lake Ouachita</span>, AR
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Climate-controlled and drive-up self-storage near Lake Ouachita — Arkansas&apos;s largest lake at 40,000+ acres. Modern Storage® Hot Springs sits ~25 minutes from the Lake Ouachita boat ramps via Highway 270 West.
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
                Modern Storage® Hot Springs — 25 minutes from the Lake Ouachita boat ramps.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── HONEST BOAT/RV REDIRECT CALLOUT ─────────────────────────
          Surfaces the Hot Springs / boat-RV split prominently above
          the use cases. */}
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
                Looking for boat or RV parking near Lake Ouachita?
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Modern Storage® Hot Springs offers <strong>household storage only</strong> — no boat or RV parking. The closest Modern Storage® facility with boat, RV, and trailer parking is{' '}
                <Link href="/locations/bryant" className="text-modern-red font-bold hover:underline">
                  Modern Storage® Bryant
                </Link>
                {' '}(about 75 minutes northeast via I-30).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why Lake Ouachita residents use storage</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Lake Ouachita Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Lake Ouachita is Arkansas&apos;s big-water lake — 40,000+ acres, sparse development, a steady out-of-state weekender base, and a year-round tournament scene. Lakehouse owners, full-time residents, and HSV households all use Modern Storage® Hot Springs for climate-controlled and drive-up storage. See{' '}
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
              Closest Modern Storage® Locations for Lake Ouachita
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Two Modern Storage® locations serve the Lake Ouachita area — one for household and seasonal storage, one for boat and RV parking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <Link href="/locations/hot-springs" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all block">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Hot Springs · ~25 min from Lake Ouachita</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Hot Springs</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                2138 Higdon Ferry Rd, Hot Springs, AR 71913. <strong>Household storage:</strong> climate-controlled and drive-up units, free moving truck for new rentals. Serves Lake Ouachita, Lake Hamilton, Lake Catherine, and Hot Springs Village.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Hot Springs details →</span>
            </Link>
            <Link href="/locations/bryant" className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all block">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Bryant · ~75 min via I-30</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Bryant</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                300 Dell Dr, Bryant, AR 72022. <strong>Boat, RV, and trailer parking</strong> — closest Modern Storage® facility to Lake Ouachita with outdoor boat and RV storage. Climate-controlled household units also available.
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
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Lake Ouachita Storage FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Storage Near Lake Ouachita
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Modern Storage® Hot Springs — 25 minutes from Lake Ouachita. Climate-controlled and drive-up household storage, month-to-month rentals. Boat and RV parking at Modern Storage® Bryant.
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
