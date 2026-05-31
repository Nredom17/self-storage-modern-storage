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
  'Modern Storage® Hot Springs facility exterior — boat, RV, and trailer storage for Lake Ouachita area customers in Arkansas'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Near Lake Ouachita, AR | Modern Storage® Hot Springs',
  },
  description:
    'Boat, RV, and trailer storage near Lake Ouachita — the largest lake in Arkansas. Modern Storage® Hot Springs is ~25 minutes from the lake, with year-round parking and climate-controlled options for lake-area boaters and second-home owners.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Near Lake Ouachita, AR | Modern Storage® Hot Springs',
    description:
      'Boat, RV, and trailer storage near Lake Ouachita — Modern Storage® Hot Springs.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Near Lake Ouachita, AR | Modern Storage®',
    description: 'Boat and RV storage near Lake Ouachita at Modern Storage® Hot Springs.',
    images: [HERO_IMAGE],
  },
}

const USE_CASES = [
  {
    title: 'Big-water boat storage',
    body:
      'Lake Ouachita is the largest lake in Arkansas — 40,000+ acres, deep clear water, sparse development. Boaters who run bigger rigs (24-30 ft) need parking sized for them between trips. Modern Storage® Hot Springs offers outdoor RV/boat parking sized to fit.',
  },
  {
    title: 'Off-season storage',
    body:
      'Lake Ouachita\'s boating season runs roughly April through October. Drop the boat at Modern Storage® Hot Springs in November, pull it back out in spring. Month-to-month rentals mean you only pay during the off-months you actually need the space.',
  },
  {
    title: 'Houseboat tender storage',
    body:
      'Lake Ouachita is one of the few Arkansas lakes where houseboating is a real subculture. Owners of bow-rider tender boats and PWCs that ride alongside the houseboat use Modern Storage® Hot Springs to park the small craft between weekends.',
  },
  {
    title: 'Bass boat storage',
    body:
      'Lake Ouachita hosts a year-round bass tournament scene. Tournament anglers store boats at Modern Storage® Hot Springs between weekends to avoid the trailer-in-the-driveway look or the HOA complaint cycle.',
  },
  {
    title: 'Camper / travel-trailer storage',
    body:
      'Many Lake Ouachita visitors stay in their travel trailers at Brady Mountain, Iron Mountain, or Crystal Springs. Modern Storage® Hot Springs is the natural between-trips parking spot if you don\'t live close enough to drop it home each weekend.',
  },
  {
    title: 'Out-of-state lake regulars',
    body:
      'Lake Ouachita draws weekenders from Dallas-Fort Worth, Tulsa, and Memphis. Modern Storage® Hot Springs is a year-round drop point — leave the boat or RV at the lake instead of hauling it back across state lines every trip.',
  },
] as const

const FAQS = [
  {
    q: 'How far is Modern Storage® from Lake Ouachita?',
    a: `Modern Storage® Hot Springs at 2138 Higdon Ferry Road is approximately 25 minutes from the Lake Ouachita boat ramps via Highway 270 West. It's the closest Modern Storage® facility for Lake Ouachita boaters, RV travelers, and lake-area second-home owners.`,
  },
  {
    q: 'Can Modern Storage® Hot Springs handle a bigger boat or RV?',
    a: `Modern Storage® Hot Springs offers outdoor parking storage for boats, RVs, and trailers. Typical bass boats, pontoons, ski boats, travel trailers, and mid-size motorhomes fit. Larger Class A rigs and longer fifth-wheels may have space-length constraints — call 501-910-0096 with your overall length (including trailer) and the team will confirm a fit before you reserve.`,
  },
  {
    q: 'Is there indoor or covered Lake Ouachita boat storage?',
    a: `Modern Storage® Hot Springs offers indoor climate-controlled storage units (best for smaller boats, PWCs, and lake gear) plus outdoor parking storage (best for larger boats and RVs). Covered outdoor parking may be available depending on inventory — confirm when you reserve. For full climate-controlled storage details, see the Modern Storage® climate-controlled storage page.`,
  },
  {
    q: 'Can I store year-round for tournament fishing?',
    a: `Yes. Modern Storage® rentals are month-to-month — keep the unit for the full year if you tournament-fish Lake Ouachita year-round, or rent only during specific months. No long-term contract, no annual commitment, no early-termination fees.`,
  },
  {
    q: 'Do I need to winterize before storing my boat?',
    a: `Yes — best practice for Arkansas off-season boat storage. Drain the water system, change the oil, fog the engine, add fuel stabilizer, and disconnect the battery before bringing the boat to Modern Storage®. Coordinate with your marina or service shop before drop-off.`,
  },
  {
    q: 'Does Modern Storage® Hot Springs also serve Lake Hamilton and Lake Catherine?',
    a: `Yes. The same Hot Springs facility serves all three lakes: Lake Hamilton (~5 min), Lake Catherine (~15 min), and Lake Ouachita (~25 min). See the Lake Hamilton storage guide for Hot Springs-area lakefront specifics, or the Boat Storage Near Hot Springs regional guide for the full three-lake picture.`,
  },
  {
    q: 'How do I reserve Lake Ouachita boat or RV storage?',
    a: `Visit /locations/hot-springs to reserve at Modern Storage® Hot Springs directly. Or call 501-910-0096 — for boat/RV parking specifically, calling ahead lets the team confirm space length availability for your rig before you drive over.`,
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
      'Boat, RV, trailer, and climate-controlled storage near Lake Ouachita — the largest lake in Arkansas. Modern Storage® Hot Springs is approximately 25 minutes from the lake and serves Lake Ouachita, Lake Hamilton, and Lake Catherine boaters.',
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
                Boat, RV, trailer, and seasonal storage near Lake Ouachita — Arkansas&apos;s largest lake at 40,000+ acres. Modern Storage® Hot Springs sits ~25 minutes from the Lake Ouachita boat ramps via Highway 270 West.
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
                Modern Storage® Hot Springs — 25 minutes from the Lake Ouachita boat ramps.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why Lake Ouachita boaters use storage</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Six Lake Ouachita Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Lake Ouachita is Arkansas&apos;s big-water lake — bigger boats, longer trips, tournament fishing, houseboating, and out-of-state weekend regulars. Modern Storage® <Link href="/rv-boat-vehicle" className="text-modern-red font-semibold hover:underline">boat and RV storage</Link> at Hot Springs is built for the rigs Lake Ouachita actually attracts.
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
              Closest Modern Storage® Location to Lake Ouachita
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              <Link href="/locations/hot-springs" className="text-modern-red font-semibold hover:underline">Modern Storage® Hot Springs</Link> is the closest facility — about 25 minutes from Lake Ouachita via Highway 270. The same facility also serves Lake Hamilton (~5 min) and Lake Catherine (~15 min) — see <Link href="/boat-storage-near-hot-springs" className="text-modern-red font-semibold hover:underline">Boat Storage Near Hot Springs</Link> for the regional setup.
            </p>
          </div>
          <Link href="/locations/hot-springs" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all block max-w-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Hot Springs · 25 min from Lake Ouachita</p>
            <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Hot Springs</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              2138 Higdon Ferry Rd, Hot Springs, AR 71913. Boat/RV parking, climate-controlled units, drive-up access. Serves all three Hot Springs-area lakes plus Hot Springs Village and Lakeside.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Hot Springs details →</span>
          </Link>
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
            Modern Storage® Hot Springs — 25 minutes from Lake Ouachita. Month-to-month rentals for boats, RVs, and trailers. Climate-controlled units for sensitive items.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/hot-springs" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Reserve at Hot Springs
            </Link>
            <Link href="/boat-storage-near-hot-springs" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              See Hot Springs Regional Lake Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
