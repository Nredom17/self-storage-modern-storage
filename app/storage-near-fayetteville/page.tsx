import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/storage-near-fayetteville'
const HERO_IMAGE = '/images/modern-storage-springdale-facility-with-sculpture.jpg'
const HERO_ALT =
  'Modern Storage® Springdale facility — closest self-storage option for Fayetteville, AR residents, U of A students, and Northwest Arkansas Mall area customers'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Near Fayetteville, AR | Student & Apartment Storage | Modern Storage®',
  },
  description:
    'Self storage and student storage near Fayetteville, AR. Modern Storage® Springdale and Lowell sit 10-20 minutes from the U of A campus and serve Fayetteville students, apartment renters, and Northwest Arkansas Mall area residents — climate-controlled and drive-up units, month-to-month rentals.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Near Fayetteville, AR | Modern Storage®',
    description:
      'Self storage and student storage close to Fayetteville at Modern Storage® Springdale and Lowell — 10-20 minutes from U of A and downtown Fayetteville.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Near Fayetteville, AR | Modern Storage®',
    description: 'Storage close to Fayetteville at Modern Storage® Springdale and Lowell.',
    images: [HERO_IMAGE],
  },
}

// Drive-time estimates from Fayetteville landmarks to the two closest
// Modern Storage® facilities. Reasonable rush-hour-padded ranges based on
// I-49 traffic patterns. All times one-way.
type DriveTime = {
  origin: string
  springdale: string
  lowell: string
  note?: string
}

const DRIVE_TIMES: DriveTime[] = [
  { origin: 'U of A campus (Old Main / Razorback Stadium)', springdale: '~10–15 min', lowell: '~15–20 min', note: 'I-49 north exit at Sunset / Don Tyson' },
  { origin: 'Fayetteville Downtown Square',                 springdale: '~10–12 min', lowell: '~15–18 min' },
  { origin: 'Northwest Arkansas Mall (north Fayetteville)',  springdale: '~5–8 min',   lowell: '~10–12 min', note: 'Closest NWA-side landmark' },
  { origin: 'Wedington corridor (west Fayetteville)',        springdale: '~12–18 min', lowell: '~18–22 min' },
  { origin: 'Johnson, AR (between Fayetteville & Springdale)', springdale: '~5–10 min', lowell: '~10–15 min' },
]

const STUDENT_USE_CASES = [
  {
    title: 'Summer storage between semesters',
    body:
      'U of A students who don\'t want to haul a dorm room or apartment home for summer. A 5x5 unit holds the contents of a dorm room; a 5x10 covers a full apartment bedroom. Month-to-month rentals match the May-to-August academic gap exactly.',
  },
  {
    title: 'Study abroad storage',
    body:
      'Students leaving for a semester or year abroad use Modern Storage® Springdale or Lowell to warehouse furniture, books, and apartment contents instead of paying rent on an empty Fayetteville apartment for the duration.',
  },
  {
    title: 'Graduation gap storage',
    body:
      'Recent grads bridging the gap between Fayetteville apartment lease-out and the move to a job in another city. Store the furniture and boxes month-to-month while you finalize the next step.',
  },
  {
    title: 'Apartment downsizing',
    body:
      'Fayetteville student rentals and starter apartments often have less closet space than what students brought with them. Off-load seasonal items, sports gear, and extra furniture instead of renting a bigger apartment.',
  },
  {
    title: 'Apartment-to-apartment moves',
    body:
      'Lease ending May 31st, new lease starting August 1st. A short-term Modern Storage® rental bridges the gap. Pair with the free moving truck (at participating locations) to keep move-in costs down.',
  },
  {
    title: 'Roommate transitions',
    body:
      'Roommate moves out, you keep the apartment, their furniture goes to storage temporarily — or vice versa. Modern Storage® Springdale and Lowell are close enough for weekly access if needed.',
  },
] as const

const FAQS = [
  {
    q: 'Which Modern Storage® locations serve Fayetteville?',
    a: `Modern Storage® Springdale (~10-15 minutes from the U of A campus via I-49) and Modern Storage® Lowell (~15-20 minutes via I-49) are the closest facilities to Fayetteville. Both serve U of A students, apartment renters, downtown Fayetteville residents, and Northwest Arkansas Mall area customers from the I-49 corridor north of the city. Springdale is closer to most Fayetteville landmarks; Lowell offers a wider mix of formats including boat/RV parking.`,
  },
  {
    q: 'Which is closer — Modern Storage® Springdale or Lowell?',
    a: `For Fayetteville and the U of A campus area, Modern Storage® Springdale at 4555 W Sunset Avenue is the closest (~10-15 min via I-49 / Sunset Avenue exit). Modern Storage® Lowell at 1407 W Monroe Avenue is a few minutes farther (~15-20 min) but offers a wider mix of storage formats including boat/RV parking. For most Fayetteville customers, Springdale is the natural first choice.`,
  },
  {
    q: 'Do you offer storage for U of A students?',
    a: `Yes. Modern Storage® Springdale is one of the most popular Northwest Arkansas locations for University of Arkansas student storage — summer storage between semesters, study-abroad storage, and apartment-move storage. Month-to-month rentals match the academic calendar with no long-term contract. A 5x5 unit covers a dorm room; a 5x10 covers an apartment bedroom; a 10x10 covers a full one-bedroom Fayetteville apartment.`,
  },
  {
    q: 'Is climate-controlled storage available?',
    a: `Yes. Both Modern Storage® Springdale and Modern Storage® Lowell offer indoor climate-controlled storage units. Recommended for furniture, electronics, mattresses, photos, books, and anything you don't want sitting in a hot Northwest Arkansas garage or apartment closet through summer. See the climate-controlled storage page for what belongs indoors.`,
  },
  {
    q: 'What size storage unit do Fayetteville students typically rent?',
    a: `Most U of A students use a 5x5 (dorm room contents) or 5x10 (apartment bedroom or studio). One-bedroom Fayetteville apartments fit in a 10x10. Two-bedroom apartments or shared houses need a 10x15. Use the AI Storage Size Finder for a personalized recommendation in under 30 seconds, or see the full size guide.`,
  },
  {
    q: 'Can I rent for just the summer?',
    a: `Yes. Every Modern Storage® rental is month-to-month with no long-term contract. Rent from late May when classes end through August when fall housing opens — typically 3-4 months for most student summer storage. Close out the unit when you move back, restart next May. No early-termination fees.`,
  },
  {
    q: 'Is there a free moving truck for the move?',
    a: `Yes — Modern Storage® offers a free moving truck with new household storage rentals at participating Arkansas locations, including Modern Storage® Springdale and Lowell. Useful for the May move-out from a Fayetteville apartment or dorm. Truck availability, mileage limits, and participation vary by facility — confirm when you reserve.`,
  },
  {
    q: 'How do I reserve?',
    a: `Visit /locations/springdale or /locations/lowell to reserve directly. Each page shows available unit sizes and a reservation link. For student storage and seasonal rentals, calling 501-910-0096 first lets the team match you to the right unit size and confirm any current move-in offers.`,
  },
] as const

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Storage Near Fayetteville',
    name: 'Storage Near Fayetteville, AR — Modern Storage® Springdale & Lowell',
    description:
      'Self storage and student storage near Fayetteville, AR. Modern Storage® Springdale and Lowell sit 10-20 minutes from the U of A campus on the I-49 corridor and serve Fayetteville students, apartment renters, and Northwest Arkansas Mall area customers with climate-controlled and drive-up units.',
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
      { '@type': 'ListItem', position: 2, name: 'Storage Near Fayetteville', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [service, breadcrumb, faqPage]
}

export default async function FayettevillePage() {
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
              <li className="text-gray-300">Storage Near Fayetteville</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                NWA / U of A area storage
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Storage Near <span className="text-modern-red">Fayetteville</span>, AR
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-lg">
                Modern Storage® Springdale and Modern Storage® Lowell serve the Fayetteville area from the I-49 corridor — 10 to 20 minutes from the U of A campus, downtown Fayetteville, and the Northwest Arkansas Mall area. Climate-controlled and drive-up units, month-to-month rentals, and the free moving truck program at participating locations.
              </p>
              <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg">
                Popular for U of A summer storage, apartment moves, study-abroad gaps, and NWA Mall area apartment overflow. See the drive-time table below for exact distances from your starting point.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/locations/springdale" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Reserve at Springdale
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/locations/lowell" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  Reserve at Lowell
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
                Modern Storage® Springdale — ~10-15 minutes from the U of A campus via I-49.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── DRIVE-TIME TABLE — honest distance from Fayetteville landmarks ── */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Drive times</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              How Far Is Modern Storage® from Fayetteville?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              One-way drive times from common Fayetteville landmarks. All routes use I-49 north. Times are rush-hour-padded ranges based on typical NWA traffic.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base">
                <thead className="bg-charcoal text-white">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">From</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs whitespace-nowrap">
                      <Link href="/locations/springdale" className="hover:text-modern-red transition-colors">Springdale →</Link>
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs whitespace-nowrap">
                      <Link href="/locations/lowell" className="hover:text-modern-red transition-colors">Lowell →</Link>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {DRIVE_TIMES.map((row) => (
                    <tr key={row.origin} className="bg-white">
                      <th scope="row" className="px-4 sm:px-6 py-4 align-top">
                        <p className="font-semibold text-charcoal leading-tight">{row.origin}</p>
                        {row.note && <p className="text-xs text-gray-500 italic mt-1">{row.note}</p>}
                      </th>
                      <td className="px-4 sm:px-6 py-4 text-charcoal align-top font-semibold whitespace-nowrap">{row.springdale}</td>
                      <td className="px-4 sm:px-6 py-4 text-charcoal align-top font-semibold whitespace-nowrap">{row.lowell}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic mt-4 leading-relaxed max-w-3xl">
            Drive times approximate. Real-world conditions vary with Razorback game-day traffic, I-49 construction, and time of day.
          </p>
        </div>
      </section>

      {/* ── STUDENT + APARTMENT USE CASES ─────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Who uses NWA storage from Fayetteville</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Student &amp; Apartment Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Most Fayetteville customers using Modern Storage® Springdale or Lowell are U of A students or apartment renters with a specific seasonal need. Six common scenarios — paired with our <Link href="/guides/apartment-storage" className="text-modern-red font-semibold hover:underline">apartment storage guide</Link> and <Link href="/guides/moving-storage" className="text-modern-red font-semibold hover:underline">moving storage guide</Link> for more depth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STUDENT_USE_CASES.map((c) => (
              <div key={c.title} className="bg-white hover:bg-gray-50 rounded-2xl p-6 border border-gray-200 transition-colors">
                <h3 className="font-black text-charcoal mb-2 leading-tight">{c.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSEST FACILITIES ─────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Where to reserve</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Closest Modern Storage® Locations to Fayetteville
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Two NWA facilities serve Fayetteville from the north. Pick based on what you&apos;re storing and which is on your route.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/locations/springdale" className="group bg-gray-50 rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Closest to Fayetteville · ~10-15 min from U of A</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Springdale</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                4555 W Sunset Ave, Springdale, AR 72762. On Hwy 412 / I-49 corridor, exit right off Sunset Avenue. Climate-controlled and drive-up storage with the free moving truck program at participating locations. Most popular NWA location for U of A student storage.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Springdale details →</span>
            </Link>
            <Link href="/locations/lowell" className="group bg-gray-50 rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Central NWA · ~15-20 min from U of A</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Lowell</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                1407 W Monroe Ave, Lowell, AR 72745. On I-49 between Rogers and Springdale. Climate-controlled, business storage, AND boat/RV parking at one facility — the most flexible NWA option if you also need vehicle parking.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Lowell details →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Fayetteville Storage FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Storage Near Fayetteville
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Modern Storage® Springdale (~10-15 min from U of A) and Modern Storage® Lowell (~15-20 min) — both serve Fayetteville students, apartment renters, and NWA Mall area customers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/springdale" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Reserve at Springdale
            </Link>
            <Link href="/locations/lowell" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              Reserve at Lowell
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
