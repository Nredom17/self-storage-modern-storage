import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/guides/apartment-storage'
const HERO_IMAGE = '/images/modern-storage-5x10-climate-controlled-unit.png'
const HERO_ALT =
  'Modern Storage® 5x10 storage unit — sized for apartment overflow and single-room storage in Arkansas'

export const metadata: Metadata = {
  title: {
    absolute: 'Apartment Storage in Arkansas | Modern Storage® Guide',
  },
  description:
    'Apartment storage guide for Arkansas renters — best unit sizes for small apartments, college storage between semesters, seasonal overflow, and how to pair Modern Storage® locations with your apartment community.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Apartment Storage in Arkansas | Modern Storage® Guide',
    description:
      'Apartment storage guide — best unit sizes, college storage, seasonal overflow, and how to choose a Modern Storage® location.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'article',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apartment Storage in Arkansas | Modern Storage® Guide',
    description: 'Apartment storage guide for Arkansas renters.',
    images: [HERO_IMAGE],
  },
}

const APARTMENT_USE_CASES = [
  {
    title: 'Small-apartment overflow',
    body:
      'Apartments under ~800 sq ft don\'t leave room for everything. A 5x5 or 5x10 Modern Storage® unit holds seasonal items, holiday decor, bikes, extra furniture, and the boxes you don\'t need every day — without sacrificing closet space at home.',
  },
  {
    title: 'College &amp; dorm storage',
    body:
      'Storing furniture, clothing, and dorm gear between semesters is far cheaper than hauling everything home each summer. A 5x5 unit covers a dorm room; a 5x10 covers an entire studio apartment. Month-to-month flexibility matches the academic calendar.',
  },
  {
    title: 'Between-leases storage',
    body:
      'Lease ending before the next one starts? Temporary apartment storage bridges the gap — pay for one or two months while you find the right next apartment, then close the unit out.',
  },
  {
    title: 'Roommate changes',
    body:
      'Roommate moves out, new one moves in, furniture gets shuffled. Storage gives you a place to park the extra couch, bed, or dining set during the transition without a hasty Craigslist sell-off.',
  },
  {
    title: 'Apartment-to-house upgrades',
    body:
      'Moving from a one-bedroom apartment to a starter house? Storage holds apartment-sized furniture while you furnish the new place properly. Sell or keep as you decide — without rushing decisions.',
  },
  {
    title: 'Seasonal & sports gear',
    body:
      'Skis, bikes, kayaks, camping equipment, holiday decor, and golf clubs all want to live somewhere other than your apartment closet. A small storage unit beats a balcony storage bench or relying on a friend\'s garage.',
  },
] as const

const SIZE_RECOMMENDATIONS = [
  {
    size: '5x5',
    sqft: '25 sq ft',
    fits: 'Boxes, books, seasonal decor, photo albums, and a small dresser',
    bestFor: 'College dorm storage, single-closet overflow, document storage',
  },
  {
    size: '5x10',
    sqft: '50 sq ft',
    fits: 'Mattress set, small couch, dresser, nightstand, chairs, 10-15 boxes',
    bestFor: 'Studio apartment, single bedroom, college storage, between-leases',
  },
  {
    size: '10x10',
    sqft: '100 sq ft',
    fits: 'One-bedroom apartment — bed, dresser, couch, TV, dining set, 15-20 boxes',
    bestFor: 'Full one-bedroom apartment, room to walk inside the unit',
  },
] as const

const FAQS = [
  {
    q: 'What size storage unit is best for an apartment?',
    a: `For most apartment renters, a 5x10 storage unit (50 sq ft) is the sweet spot — it fits a mattress set, a small couch, a dresser, and 10-15 boxes. Studio apartment dwellers usually rent a 5x10. Renters in one-bedroom apartments who need to store entire rooms typically go with a 10x10 (100 sq ft). For seasonal overflow only — bikes, decor, sports gear — a 5x5 unit (25 sq ft) covers it. See the Modern Storage® size guide for the full breakdown.`,
  },
  {
    q: 'Do you offer college storage between semesters?',
    a: `Yes — Modern Storage® is a popular choice for University of Arkansas, Northwest Arkansas Community College, and central-Arkansas college students. Month-to-month rentals mean students aren\'t locked into a long lease, and convenient locations near campus make pickup and drop-off easy. Modern Storage® Springdale is the closest facility for U of A and NWA campuses; Modern Storage® Bryant, Shackleford, and Riverdale serve central-Arkansas colleges.`,
  },
  {
    q: 'Can I store an apartment\'s worth of furniture in a small unit?',
    a: `Yes — but plan to disassemble. Most studio and one-bedroom apartments fit in a 5x10 unit if you break down bed frames, table legs, and modular shelving before loading. The Modern Storage® free moving truck (at participating locations) makes this easier by giving you one trip from the apartment to the unit instead of stacking and re-stacking on a small driveway.`,
  },
  {
    q: 'What\'s the cheapest way to store apartment stuff?',
    a: `Cheap apartment storage usually means choosing a drive-up unit (slightly less than climate-controlled), picking the right size (don\'t over-rent), and reserving online to lock in any current move-in offers. Modern Storage® has six unit sizes from 5x5 to 10x30, so you can match the unit to what you\'re actually storing without paying for empty space. For long-term storage of furniture, electronics, or photos, climate-controlled is worth the small premium.`,
  },
  {
    q: 'Should I rent climate-controlled storage for apartment items?',
    a: `Climate-controlled is the right call if you\'re storing furniture (especially wood or leather), electronics, photos, instruments, mattresses, or anything you\'d hesitate to leave in a hot Arkansas garage for months. Drive-up storage is fine for plastic bins, sports gear, durable seasonal items, and bikes. Most apartment renters who store furniture choose climate-controlled — see the climate-controlled storage page for the full breakdown.`,
  },
  {
    q: 'Which Modern Storage® locations are closest to Arkansas apartment communities?',
    a: `Apartment renters in central Arkansas typically use Modern Storage® West Little Rock, Modern Storage® Shackleford, Modern Storage® Riverdale, or Modern Storage® North Little Rock — these locations sit close to the largest concentrations of apartment communities in the Little Rock metro. In Northwest Arkansas, Modern Storage® Springdale, Modern Storage® Bentonville, and Modern Storage® Lowell serve the dense apartment markets along the I-49 corridor. Bryant and Maumelle also serve growing apartment areas.`,
  },
  {
    q: 'Is month-to-month apartment storage really month-to-month?',
    a: `Yes — every Modern Storage® rental is month-to-month with no long-term contract. That\'s what makes self-storage practical for apartment renters whose plans often shift on a month\'s notice. Rent for one month, three months, or as long as you need, then close out when your situation changes. No early-termination fees.`,
  },
  {
    q: 'Can I store an apartment-sized refrigerator or washer?',
    a: `Yes — Modern Storage® units can hold apartment-sized refrigerators, washers, dryers, and other appliances. Clean and dry them thoroughly before move-in and prop doors open to prevent mold growth in seals. Climate-controlled storage is recommended for appliances stored more than a few weeks; the stable indoor environment protects rubber seals and electronics from humidity damage.`,
  },
] as const

function buildJsonLd() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': SITE_URL + PAGE_PATH + '#article',
    headline: 'Apartment Storage in Arkansas — Modern Storage® Guide',
    description:
      'In-depth apartment storage guide for Arkansas renters covering unit sizes, college storage, seasonal overflow, and Modern Storage® location selection.',
    image: SITE_URL + HERO_IMAGE,
    author: { '@id': SITE_URL + '/#organization' },
    publisher: { '@id': SITE_URL + '/#organization' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL + PAGE_PATH },
    about: {
      '@type': 'Thing',
      name: 'Apartment Self Storage',
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: SITE_URL + '/guides' },
      { '@type': 'ListItem', position: 3, name: 'Apartment Storage', item: SITE_URL + PAGE_PATH },
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

  return [article, breadcrumb, faqPage]
}

export default async function ApartmentStoragePage() {
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
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/guides" className="hover:text-modern-red transition-colors">Guides</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Apartment Storage</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Residential storage guide
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                <span className="text-modern-red">Apartment Storage</span> in Arkansas
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
                Renting a small apartment in Arkansas? This guide covers the best unit sizes for apartment overflow, college storage between semesters, between-leases gaps, and which Modern Storage® locations are closest to the major apartment communities in Little Rock, Northwest Arkansas, and Bryant.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/locations" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Find a Nearby Location
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/size-guide" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  See Unit Sizes
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
                Modern Storage® 5x10 unit — the most-requested apartment storage size.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why apartment renters use storage</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              The Six Most Common Apartment Storage Use Cases
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Apartment storage rarely means "store everything I own." It usually means one specific situation — overflow, college timing, a roommate change, a between-leases gap. Modern Storage® offers <Link href="/household-storage" className="text-modern-red font-semibold hover:underline">household storage</Link> sized for each of these.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {APARTMENT_USE_CASES.map((c) => (
              <div key={c.title} className="bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 transition-colors">
                <h3 className="font-black text-charcoal mb-2 leading-tight" dangerouslySetInnerHTML={{ __html: c.title }} />
                <p className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Pick the right size</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Apartment Storage Sizes That Actually Fit
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Apartment renters rarely need more than 100 square feet of storage. Three sizes cover almost every scenario. See the full <Link href="/size-guide" className="text-modern-red font-semibold hover:underline">Modern Storage® unit size guide</Link> if you need something larger.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Size</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Square footage</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">What fits</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {SIZE_RECOMMENDATIONS.map((s) => (
                  <tr key={s.size} className="bg-white">
                    <th scope="row" className="px-4 sm:px-6 py-4 font-bebas text-3xl text-charcoal align-top">{s.size}</th>
                    <td className="px-4 sm:px-6 py-4 text-gray-700 align-top font-semibold">{s.sqft}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-700 align-top">{s.fits}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-700 align-top">{s.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Where to reserve</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Apartment Storage Locations Near You
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Pick the Modern Storage® facility closest to your apartment community. Each location page shows available unit sizes and a direct reserve-online link.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/locations/west-little-rock" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">West Little Rock</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® West Little Rock</h3>
              <p className="text-sm text-gray-600 mt-1">Convenient for apartments along Chenal, Markham, and the I-430 corridor.</p>
            </Link>
            <Link href="/locations/shackleford" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Little Rock</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Shackleford</h3>
              <p className="text-sm text-gray-600 mt-1">Close to apartments around Shackleford Crossings, Pleasant Valley, and west Little Rock.</p>
            </Link>
            <Link href="/locations/riverdale" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Downtown LR</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Riverdale</h3>
              <p className="text-sm text-gray-600 mt-1">Closest to downtown Little Rock, Hillcrest, the Heights, and Cantrell apartments.</p>
            </Link>
            <Link href="/locations/north-little-rock" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">NLR</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® North Little Rock</h3>
              <p className="text-sm text-gray-600 mt-1">Serves Lakewood, Park Hill, Indian Hills, and the McCain apartment corridor.</p>
            </Link>
            <Link href="/locations/bryant" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Bryant</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Bryant</h3>
              <p className="text-sm text-gray-600 mt-1">Fast-growing Bryant and Saline County apartment communities along the I-30 corridor.</p>
            </Link>
            <Link href="/locations/springdale" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Springdale</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Springdale</h3>
              <p className="text-sm text-gray-600 mt-1">Hwy 412 / I-49 corridor — popular for U of A student storage and NWA apartments.</p>
            </Link>
            <Link href="/locations/bentonville" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Bentonville</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Bentonville</h3>
              <p className="text-sm text-gray-600 mt-1">South Bentonville apartment communities, downtown square, Walmart Home Office area.</p>
            </Link>
            <Link href="/locations/lowell" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Lowell</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Lowell</h3>
              <p className="text-sm text-gray-600 mt-1">Central I-49 between Rogers and Springdale — flexible for NWA apartment renters.</p>
            </Link>
            <Link href="/locations/maumelle" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Maumelle</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Maumelle Blvd</h3>
              <p className="text-sm text-gray-600 mt-1">Hwy 100 corridor — serves Maumelle and west NLR apartment communities.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Pair with the truck</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-5">
                Move your apartment with one trip, not two
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                The <Link href="/free-moving-truck" className="text-modern-red font-semibold hover:underline">Modern Storage® free moving truck</Link> is included with new rentals at participating locations. For apartment renters with a 5x10 or 10x10 unit, that\'s usually enough capacity to move the whole apartment in a single load — no second rental, no second pickup line.
              </p>
              <Link href="/free-moving-truck" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                See Moving Truck Details
              </Link>
            </div>
            <div className="lg:col-span-5">
              <ul className="space-y-3">
                {['Free with new storage rentals', 'Same-day pickup and return', 'Full tank in, full tank out', 'Daily mileage allowance included', 'Participating locations only'].map((b) => (
                  <li key={b} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                    <svg className="w-5 h-5 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-200">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Apartment Storage FAQ
            </h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* ── APARTMENT LIVING & STORAGE — local SEO context ──────
          Natural, human-first paragraphs that strengthen the
          apartment-living + self-storage topical relationship and
          introduce real Arkansas apartment communities by name.
          Outbound links use branded anchor text only; no keyword
          stuffing, no promotional language. */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-6 leading-tight">
            Apartment Living and Storage Go Hand in Hand
          </h2>
          <div className="space-y-5 text-gray-700 leading-relaxed text-base sm:text-lg">
            <p>
              Apartment living in Arkansas comes with the same recurring storage challenges almost everywhere — small closets, limited garage space, and the constant churn of moves, lease transitions, roommate changes, and seasonal furniture rotation. Modern Storage® works alongside that reality every day, and a large share of our customers are renters from the apartment communities that anchor central Arkansas and Northwest Arkansas. Most use a nearby unit during a specific transition — between leases, during a downsize, or while staging a move — rather than as long-term overflow.
            </p>
            <p>
              In Little Rock, that includes residents from communities like{' '}
              <a
                href="https://www.bowmanpointe.com/"
                target="_blank"
                rel="noopener"
                className="text-modern-red font-semibold hover:underline"
              >
                Bowman Pointe Apartments
              </a>
              {' '}and{' '}
              <a
                href="https://www.pointebrodiecreek.com/"
                target="_blank"
                rel="noopener"
                className="text-modern-red font-semibold hover:underline"
              >
                Pointe Brodie Creek
              </a>
              , who often need somewhere convenient to store furniture during a move or hold seasonal items they don&apos;t need in a smaller floor plan. Across the river, residents of{' '}
              <a
                href="https://www.pointenorthhills.com/"
                target="_blank"
                rel="noopener"
                className="text-modern-red font-semibold hover:underline"
              >
                Pointe North Hills
              </a>
              {' '}in North Little Rock use Modern Storage® for the same kinds of transitions — downsizing into a more efficient layout, bridging the gap between leases, or simply freeing up a tight closet. In Hot Springs, residents of{' '}
              <a
                href="https://www.hamiltonhotsprings.com/"
                target="_blank"
                rel="noopener"
                className="text-modern-red font-semibold hover:underline"
              >
                Hamilton Hot Springs
              </a>
              {' '}lean on Modern Storage® for similar reasons, often combined with seasonal Lake Hamilton gear and out-of-season furniture.
            </p>
            <p>
              For most apartment renters, the practical answer isn&apos;t more apartment — it&apos;s a small, nearby storage unit that flexes month-to-month with whatever comes next. Furniture and electronics that won&apos;t fit in a smaller floor plan are usually safer in a{' '}
              <Link href="/climate-controlled" className="text-modern-red font-semibold hover:underline">
                climate-controlled unit
              </Link>
              {' '}than a hot garage or attic, and customers planning a move often pair an apartment storage unit with the{' '}
              <Link href="/guides/moving-storage" className="text-modern-red font-semibold hover:underline">
                Modern Storage® moving storage guide
              </Link>
              {' '}to time things cleanly. Whatever the transition, Modern Storage® has 10 Arkansas locations specifically positioned for the apartment-renter use case — including facilities convenient to each of the communities above.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Apartment Storage in Minutes
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Pick the Modern Storage® location closest to your apartment, choose a 5x5, 5x10, or 10x10 unit, and reserve online. Month-to-month — close the unit out anytime your situation changes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Find a Location
            </Link>
            <Link href="/size-guide" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              See Unit Sizes
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
