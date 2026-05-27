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
  'Truck and travel trailer at Modern Storage® drive-up RV storage at sunset — boat, RV, and lake storage for Hot Springs area lakes including Lake Hamilton, Lake Ouachita, and Lake Catherine'

export const metadata: Metadata = {
  title: {
    absolute: 'Boat Storage Near Hot Springs, AR | Lake Hamilton, Ouachita & Catherine | Modern Storage®',
  },
  description:
    'Boat, RV, and trailer storage covering all three Hot Springs area lakes — Lake Hamilton, Lake Ouachita, and Lake Catherine. Modern Storage® Hot Springs serves the entire region from one central facility.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Boat Storage Near Hot Springs, AR | Modern Storage®',
    description:
      'Boat, RV, and lake storage for Lake Hamilton, Lake Ouachita, and Lake Catherine — Modern Storage® Hot Springs.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boat Storage Near Hot Springs, AR | Modern Storage®',
    description: 'Boat and RV storage covering Lake Hamilton, Lake Ouachita, and Lake Catherine.',
    images: [HERO_IMAGE],
  },
}

const FAQS = [
  {
    q: 'Which Modern Storage® facility serves the Hot Springs lakes?',
    a: `Modern Storage® Hot Springs at 2138 Higdon Ferry Road serves all three major Hot Springs-area lakes from one facility: Lake Hamilton (~5 minutes), Lake Catherine (~15 minutes), and Lake Ouachita (~25 minutes via Highway 270). It's the only Modern Storage® facility in the Hot Springs metro and the natural choice for boat/RV storage across the region.`,
  },
  {
    q: 'What\'s the difference between the three lakes?',
    a: `Lake Hamilton is the centerpiece of Hot Springs — busy, developed, lakefront homes, family-resort vibe. Lake Catherine is smaller and quieter, popular for fishing and PWCs. Lake Ouachita is the big-water lake — 40,000 acres, remote, deep clear water, houseboating, and bigger boats. Many Hot Springs boaters use multiple lakes depending on the season or activity.`,
  },
  {
    q: 'Can I store one boat that I use on multiple Hot Springs lakes?',
    a: `Yes — that's exactly how most Modern Storage® Hot Springs boat customers use the facility. Store one rig year-round, pull it for whichever lake you're hitting that weekend. Lake Hamilton on Saturday, Lake Ouachita on Sunday — same trailer, same storage spot.`,
  },
  {
    q: 'Do you offer storage for jet skis, kayaks, and PWCs?',
    a: `Yes. Modern Storage® Hot Springs accommodates personal watercraft on trailers, kayak trailers, and small utility trailers. Smaller PWCs and lake gear can also go in indoor climate-controlled units if you prefer indoor protection.`,
  },
  {
    q: 'Is climate-controlled storage available for lake gear?',
    a: `Yes. Modern Storage® Hot Springs offers indoor climate-controlled storage units alongside outdoor boat/RV parking. Lake gear that benefits from climate control includes wakeboards, water-ski equipment, electronics, life jackets, and seasonal lakehouse items. See the Modern Storage® climate-controlled storage page for the full breakdown.`,
  },
  {
    q: 'How do I reserve Hot Springs lake storage?',
    a: `Visit /locations/hot-springs to reserve directly, or pick the lake-specific guide that matches your primary lake: Storage Near Lake Hamilton, Storage Near Lake Ouachita. Each guide points to the same Hot Springs facility but covers the lake-specific use cases in depth. For boat/RV parking, call 501-910-0096 to confirm space length availability before reserving.`,
  },
] as const

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Boat Storage Near Hot Springs',
    name: 'Boat Storage Near Hot Springs — Lake Hamilton, Ouachita & Catherine',
    description:
      'Boat, RV, and trailer storage covering all three Hot Springs area lakes — Lake Hamilton, Lake Ouachita, and Lake Catherine — from Modern Storage® Hot Springs.',
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
      { '@type': 'ListItem', position: 2, name: 'Boat Storage Near Hot Springs', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [service, breadcrumb, faqPage]
}

const LAKES = [
  {
    href: '/storage-near-lake-hamilton',
    name: 'Lake Hamilton',
    distance: '~5 min from Modern Storage® Hot Springs',
    description: 'The centerpiece Hot Springs lake. Developed lakefront, family resort vibe, large second-home concentration. Most common Hot Springs boat-storage anchor.',
  },
  {
    href: '/storage-near-lake-ouachita',
    name: 'Lake Ouachita',
    distance: '~25 min via Hwy 270 West',
    description: 'Arkansas&apos;s largest lake at 40,000+ acres. Big water, deep clear water, sparse development. Tournament bass fishing, houseboating, and out-of-state weekend regulars.',
  },
  {
    href: '/locations/hot-springs',
    name: 'Lake Catherine',
    distance: '~15 min from Modern Storage® Hot Springs',
    description: 'Smaller, quieter Hot Springs-area lake. Popular for fishing, PWCs, and lakefront homes near Lake Catherine State Park. Same Hot Springs facility serves it.',
  },
] as const

export default async function HotSpringsRegionalPage() {
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
              <li className="text-gray-300">Boat Storage Near Hot Springs</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Hot Springs regional guide
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Boat Storage Near <span className="text-modern-red">Hot Springs</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                One facility, three lakes. Modern Storage® Hot Springs covers Lake Hamilton, Lake Ouachita, and Lake Catherine — boat, RV, and trailer storage for the entire Hot Springs lake region from a single Higdon Ferry Road location.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/locations/hot-springs" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Reserve at Hot Springs
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  Call {PHONE_NUMBER_DISPLAY}
                </a>
              </div>
            </div>
            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] lg:aspect-[4/3] bg-gray-800 relative">
                <Image src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Drive-up RV storage at Modern Storage® — Hot Springs facility serves all three lakes.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Three lakes, one facility</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Hot Springs Lake Storage Coverage
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The three major Hot Springs-area lakes have distinct character but share one Modern Storage® facility for boat, RV, and trailer parking. Pick the lake-specific guide that matches your primary water, or reserve directly at <Link href="/locations/hot-springs" className="text-modern-red font-semibold hover:underline">Modern Storage® Hot Springs</Link>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LAKES.map((lake) => (
              <Link key={lake.name} href={lake.href} className="group bg-gray-50 hover:bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">{lake.distance}</p>
                <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">{lake.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: lake.description }} />
                <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">Read guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">The anchor facility</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Modern Storage® Hot Springs Serves All Three Lakes
            </h2>
          </div>
          <Link href="/locations/hot-springs" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all block max-w-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Higdon Ferry Rd · 5–25 min to all three lakes</p>
            <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Hot Springs</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              2138 Higdon Ferry Rd, Hot Springs, AR 71913. Boat/RV/trailer parking, indoor climate-controlled units, drive-up access. The only Modern Storage® facility in the Hot Springs metro.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Hot Springs details →</span>
          </Link>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Hot Springs Lake Storage FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Boat Storage Near Hot Springs
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            One Modern Storage® facility covers Lake Hamilton, Lake Ouachita, and Lake Catherine. Month-to-month, no long-term lease.
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
