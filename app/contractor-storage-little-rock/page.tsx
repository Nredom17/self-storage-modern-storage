import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/contractor-storage-little-rock'
const HERO_IMAGE = '/images/modern-storage-riverdale-business-conference.jpg'
const HERO_ALT =
  'Modern Storage® Riverdale business storage in Little Rock — built for contractors, trades, and restoration crews'

export const metadata: Metadata = {
  // Title trimmed from 90 to 51 chars to clear the Semrush "title too
  // long" flag and stay inside Google's ~60-char SERP truncation budget.
  // The "Tools, Inventory & Jobsite Overflow" descriptor lives in the H1,
  // the meta description, and the page body — no need to repeat it in the
  // <title> at the cost of brand-mark truncation.
  title: {
    absolute: 'Contractor Storage in Little Rock | Modern Storage®',
  },
  description:
    'Contractor and trade storage in Little Rock — tools, equipment, jobsite overflow, and business inventory at Modern Storage® Riverdale, West Little Rock, and North Little Rock. Drive-up access, climate-controlled units, and month-to-month rentals.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Contractor Storage in Little Rock | Modern Storage®',
    description:
      'Tools, equipment, jobsite overflow, and trade inventory storage at Modern Storage® Riverdale, West Little Rock, and North Little Rock.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contractor Storage in Little Rock | Modern Storage®',
    description:
      'Contractor and trade storage in Little Rock at Modern Storage® — Riverdale, West Little Rock, and NLR.',
    images: [HERO_IMAGE],
  },
}

const USE_CASES = [
  {
    title: 'Tools & power equipment',
    body:
      'Compressors, saws, drills, ladders, and trade tools secured between jobs. Drive-up units let you load and unload from the truck without hauling everything through hallways.',
  },
  {
    title: 'Jobsite overflow',
    body:
      'Materials, fixtures, finishes, and pre-staged inventory for a specific build. Month-to-month rentals end when the project does — no long lease.',
  },
  {
    title: 'Restoration crew kits',
    body:
      'Dehumidifiers, air movers, generators, hand tools, and PPE staged near central Little Rock for fast deployment on flood, fire, and mold response calls.',
  },
  {
    title: 'Trade inventory & samples',
    body:
      'Flooring samples, fixtures, paint, tile, and trim stored climate-controlled so finishes stay client-ready year-round. Indoor units protect anything that humidity can damage.',
  },
  {
    title: 'Business records & contracts',
    body:
      'Project files, contracts, permits, and tax records in a stable indoor environment — without paying for a downtown office archive service.',
  },
  {
    title: 'Vehicle & trailer parking',
    body:
      'Some contractors store enclosed trailers, work vehicles, or specialty equipment that won\'t fit in a garage. Boat/RV-style parking is available at select Little Rock area Modern Storage® locations.',
  },
] as const

const FAQS = [
  {
    q: 'Which Modern Storage® locations are best for Little Rock contractors?',
    a: `Three Modern Storage® locations cover the Little Rock area for contractors. Modern Storage® Riverdale (2510 Cantrell Rd) is the flagship business storage location with ground-floor access — ideal for restoration crews, trade samples, and downtown-area projects. Modern Storage® West Little Rock (601 Autumn Rd) serves the I-430 corridor and Chenal-area builds. Modern Storage® North Little Rock (3100 North Hills Blvd) offers drive-up plus business storage for NLR and Sherwood-area contractors. Modern Storage® Shackleford also offers drive-up access ideal for tool-heavy crews.`,
  },
  {
    q: 'Do you offer drive-up storage for tools and equipment?',
    a: `Yes. Drive-up storage units at Modern Storage® West Little Rock, North Little Rock, and Shackleford let contractors pull a truck or trailer right up to the unit door for loading and unloading. Drive-up is the fastest format for heavy tools, compressors, ladders, and pre-staged materials. Modern Storage® Riverdale offers ground-floor access (climate-controlled) which works similarly for trade samples and equipment that needs indoor protection.`,
  },
  {
    q: 'Can I store flammable materials like fuel, paint, or solvents?',
    a: `No. Self-storage units, including Modern Storage® locations, can\'t hold flammable, hazardous, or perishable items. That includes gasoline (drain mowers and equipment before storage), propane tanks, paint solvents, fireworks, and ammunition. Tools, dry materials, finishes in original sealed containers within reason, and most trade supplies are fine. The team confirms a full prohibited-items list at move-in.`,
  },
  {
    q: 'Do Modern Storage® locations accept material deliveries for contractors?',
    a: `Many Modern Storage® locations accept business deliveries at customer units — useful for contractors receiving direct-shipped materials, fixtures, or pre-staged inventory ahead of a build. Acceptance policies, delivery hours, and signature requirements vary by location. Confirm with the specific Modern Storage® team before scheduling a freight delivery to your unit.`,
  },
  {
    q: 'Should I rent climate-controlled or drive-up for trade work?',
    a: `It depends on what you\'re storing. Climate-controlled is the right choice for flooring samples, wood trim, finishes, electronics, paint (for color stability), contracts, and anything heat-or-humidity-sensitive. Drive-up is faster and more affordable for tools, ladders, compressors, scaffolding, and durable jobsite equipment. Many contractors rent both — a climate-controlled unit for samples and records, and a drive-up unit for tools.`,
  },
  {
    q: 'How big a storage unit does a Little Rock contractor usually need?',
    a: `It varies by trade. A handyman or solo trade might rent a 5x10 (50 sq ft) for tools and basic gear. A small remodeling crew typically needs a 10x10 (100 sq ft) or 10x15 (150 sq ft) for tools, materials, and pre-staged inventory. Restoration crews and larger contractors often need a 10x20 (200 sq ft) or 10x30 (300 sq ft) to stage equipment, vehicles, and supplies for active projects. See the unit size guide for what fits in each.`,
  },
  {
    q: 'Is month-to-month storage available for contractors?',
    a: `Yes — every Modern Storage® rental is month-to-month with no long-term contract. That\'s the right structure for project-based trade work: rent through the duration of the build or restoration job, then close out the unit when the project wraps. No early-termination fees, no annual commitment.`,
  },
  {
    q: 'How do I reserve contractor storage in Little Rock?',
    a: `Visit /locations/riverdale, /locations/west-little-rock, or /locations/north-little-rock to reserve at a specific Modern Storage® facility. Each page shows available unit sizes and a direct reservation link. You can also call 501-910-0096 — the team can help compare locations based on which Little Rock area your jobsites are in and what mix of climate-controlled vs drive-up makes sense.`,
  },
] as const

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Contractor Storage in Little Rock',
    name: 'Contractor & Trade Storage in Little Rock',
    description:
      'Tools, equipment, jobsite overflow, restoration kits, and trade inventory storage at Modern Storage® Riverdale, West Little Rock, North Little Rock, and Shackleford. Drive-up access, climate-controlled units, and month-to-month rentals.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    // Repointed to sitewide #organization @id to avoid emitting a nested
    // SelfStorage with no PostalAddress (a Semrush markup-error trigger).
    provider: { '@id': SITE_URL + '/#organization' },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Contractor Storage in Little Rock', item: SITE_URL + PAGE_PATH },
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

export default async function ContractorPage() {
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
              <li className="text-gray-300">Contractor Storage in Little Rock</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                For trades &amp; contractors
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                <span className="text-modern-red">Contractor Storage</span> in Little Rock
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
                Tools, jobsite overflow, restoration kits, and trade inventory storage at four Little Rock area Modern Storage® facilities. Drive-up access, climate-controlled units, and month-to-month rentals built around how trade work actually runs.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/locations/riverdale" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Reserve at Riverdale
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/business-storage" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  All Business Storage Options
                </Link>
                <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  Call for New Rentals
                </a>
              </div>
            </div>

            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
                <Image src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Modern Storage® Riverdale — flagship business and contractor storage on Cantrell Rd in Little Rock.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Built for trade work</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Little Rock Contractor &amp; Trade Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Modern Storage® supports a wide range of Little Rock area trade businesses with <Link href="/business-storage" className="text-modern-red font-semibold hover:underline">business storage</Link> and <Link href="/climate-controlled" className="text-modern-red font-semibold hover:underline">climate-controlled storage</Link> options. Pick the format that matches what you store and how often you need access.
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

      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Where to reserve</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Little Rock Area Modern Storage® Locations for Contractors
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Pick the Modern Storage® facility closest to your jobsites or office. Riverdale serves downtown and west-of-Cantrell projects, West Little Rock covers the I-430 / Chenal corridor, North Little Rock handles NLR and Sherwood, and Shackleford serves west LR with drive-up tool access.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/locations/riverdale" className="group bg-white rounded-2xl p-7 border-2 border-modern-red shadow-lg hover:shadow-xl transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Flagship for businesses</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Riverdale</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                2510 Cantrell Rd, Little Rock, AR 72202. Climate-controlled, business storage, and ground-floor access. Best for restoration crews, downtown contractors, trade samples, and project records.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Riverdale details →</span>
            </Link>
            <Link href="/locations/west-little-rock" className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">I-430 / Chenal corridor</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® West Little Rock</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                601 Autumn Rd, Little Rock, AR 72211. Climate-controlled and drive-up units. Best for contractors working the I-430, Chenal Parkway, and west Little Rock build markets.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See West Little Rock details →</span>
            </Link>
            <Link href="/locations/north-little-rock" className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">NLR &amp; Sherwood</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® North Little Rock</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                3100 North Hills Blvd, North Little Rock, AR 72116. Climate-controlled, drive-up, and business storage. Best for trades working the I-40 corridor, McCain area, and Sherwood-area projects.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See NLR details →</span>
            </Link>
            <Link href="/locations/shackleford" className="group bg-white rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">West LR drive-up</p>
              <h3 className="text-xl font-black text-charcoal mb-3 group-hover:text-modern-red transition-colors">Modern Storage® Shackleford</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                3400 S Shackleford Rd, Little Rock, AR 72205. Climate-controlled and drive-up access. Practical for tool-heavy crews working between I-630 and I-430, and for vehicle storage of work trucks or trailers.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red">See Shackleford details →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Little Rock Contractor Storage FAQ
            </h2>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Contractor Storage in Little Rock
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Compare drive-up and climate-controlled units at four Little Rock area Modern Storage® locations. Month-to-month rentals, contractor-friendly access, no long lease.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations/riverdale" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">Reserve at Riverdale</Link>
            <Link href="/business-storage" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">See All Business Storage</Link>
          </div>
        </div>
      </section>
    </>
  )
}
