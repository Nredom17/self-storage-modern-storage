import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/student-storage'
// Hero image — sunset aerial of an Arkansas university campus. Loaded
// as a 2-col hero so the image fills the right half on lg+ and stacks
// below the heading on mobile.
const HERO_IMAGE = '/images/student-storage-arkansas-universities-campus.png'
const HERO_ALT =
  'Arkansas university campus at sunset — student storage near University of Arkansas, NWACC, UALR, UCA, and other Arkansas colleges'

export const metadata: Metadata = {
  title: {
    absolute: 'Student Storage Near Arkansas Universities | Modern Storage®',
  },
  description:
    'College & student storage near Arkansas universities — University of Arkansas (Fayetteville), UA Little Rock, UA–Pulaski Tech, UCA, NWACC, and National Park College. Month-to-month dorm and apartment storage at the closest Modern Storage® location, with a free moving truck at participating locations.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Student Storage Near Arkansas Universities | Modern Storage®',
    description:
      'Month-to-month dorm and apartment storage near Arkansas campuses — find the closest Modern Storage® location to your university.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Storage Near Arkansas Universities | Modern Storage®',
    description: 'Dorm and apartment storage near Arkansas campuses, month-to-month.',
    images: [HERO_IMAGE],
  },
}

// Universities grouped by region, each mapped to the closest Modern Storage®
// location(s). Proximity is kept qualitative except where confirmed (U of A).
const CAMPUS_GROUPS = [
  {
    region: 'Northwest Arkansas',
    campuses: [
      {
        name: 'University of Arkansas (Fayetteville)',
        note: 'About 10–20 minutes via I‑49',
        stores: [
          { label: 'Springdale', slug: 'springdale' },
          { label: 'Lowell', slug: 'lowell' },
        ],
      },
      {
        name: 'NorthWest Arkansas Community College (Bentonville)',
        note: 'Minutes from the Bentonville facility',
        stores: [{ label: 'Bentonville', slug: 'bentonville' }],
      },
    ],
  },
  {
    region: 'Little Rock metro',
    campuses: [
      {
        name: 'University of Arkansas at Little Rock (UALR)',
        note: 'West Little Rock & midtown',
        stores: [
          { label: 'West Little Rock', slug: 'west-little-rock' },
          { label: 'Shackleford', slug: 'shackleford' },
          { label: 'Riverdale', slug: 'riverdale' },
        ],
      },
      {
        name: 'UAMS · Philander Smith University · Arkansas Baptist College',
        note: 'Downtown & midtown Little Rock',
        stores: [
          { label: 'Riverdale', slug: 'riverdale' },
          { label: 'Shackleford', slug: 'shackleford' },
        ],
      },
      {
        name: 'University of Arkansas – Pulaski Tech (UA‑PTC)',
        note: 'North Little Rock',
        stores: [
          { label: 'North Little Rock', slug: 'north-little-rock' },
          { label: 'Maumelle Blvd', slug: 'maumelle' },
        ],
      },
      {
        name: 'University of Central Arkansas (Conway)',
        note: 'About 30 minutes north of the metro',
        stores: [
          { label: 'Maumelle Blvd', slug: 'maumelle' },
          { label: 'North Little Rock', slug: 'north-little-rock' },
        ],
      },
      {
        name: 'Bryant & Saline County students',
        note: 'I‑30 corridor, south of Little Rock',
        stores: [{ label: 'Bryant', slug: 'bryant' }],
      },
    ],
  },
  {
    region: 'Hot Springs',
    campuses: [
      {
        name: 'National Park College',
        note: 'Hot Springs / Lake Hamilton area',
        stores: [{ label: 'Hot Springs', slug: 'hot-springs' }],
      },
    ],
  },
] as const

const USE_CASES = [
  { title: 'Summer break', body: 'Store dorm and apartment belongings over the summer instead of hauling everything home and back.' },
  { title: 'Study abroad', body: 'Keep your things safe for a semester or year overseas without paying for an empty apartment.' },
  { title: 'Between leases', body: 'Bridge the gap when your lease ends before the next one starts — month-to-month, no long-term commitment.' },
  { title: 'Internships & co-ops', body: 'Leaving town for a summer internship? Store the apartment and skip the double rent.' },
  { title: 'Dorm to apartment', body: 'Moving off campus? Stage your move and store extra furniture until the new place is ready.' },
  { title: 'Roommates splitting a unit', body: 'Share one unit between roommates to split the cost of summer storage.' },
] as const

const FAQS = [
  {
    q: 'Do you offer student storage near the University of Arkansas?',
    a: `Yes. Modern Storage® Springdale and Modern Storage® Lowell are the closest facilities to the University of Arkansas in Fayetteville — roughly 10–20 minutes away via I‑49. Both offer month-to-month rentals, so students can store over summer break, during a study-abroad term, or between leases without a long-term contract. Climate-controlled and drive-up units are available depending on the location.`,
    aHtml: `Yes. <a
                href="https://www.modernstorage.com/self-storage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Existing Customers — manage your account at modernstorage.com"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-modern-red font-bold px-6 py-3 rounded-full transition-colors text-sm shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.949.684V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5z" />
                </svg>
                Existing Customers
              </a>
              <a href="/locations/springdale">Modern Storage® Springdale</a> and <a href="/locations/lowell">Modern Storage® Lowell</a> are the closest facilities to the University of Arkansas in Fayetteville — roughly 10–20 minutes away via I‑49. Both offer month-to-month rentals, so students can store over summer break, during a study-abroad term, or between leases without a long-term contract. Climate-controlled and drive-up units are available depending on the location. See <a href="/storage-near-fayetteville">storage near Fayetteville</a> for details.`,
  },
  {
    q: 'What size storage unit do students usually need?',
    a: `It depends on how much you're storing. A 5x5 unit holds a dorm room's worth of boxes, a mini-fridge, and small furniture. A 5x10 fits the contents of an apartment bedroom or a studio. A 10x10 holds a full one-bedroom apartment. Roommates often share one unit to split the cost. Use the Size Guide or AI Storage Size Finder to pick the right size before you reserve.`,
    aHtml: `It depends on how much you're storing. A 5x5 unit holds a dorm room's worth of boxes, a mini-fridge, and small furniture. A 5x10 fits the contents of an apartment bedroom or a studio. A 10x10 holds a full one-bedroom apartment. Roommates often share one unit to split the cost. Use the <a href="/size-guide">Size Guide</a> or <a href="/ai-storage-size-finder">AI Storage Size Finder</a> to pick the right size before you reserve.`,
  },
  {
    q: 'Can I rent for the summer only?',
    a: `Yes. All Modern Storage® rentals are month-to-month with no long-term lease, so summer-only storage is easy — rent in May, move out in August, and pay only for the months you need. This is one of the most common reasons students use storage, along with study abroad and summer internships.`,
  },
  {
    q: 'Which Modern Storage® locations are closest to my campus?',
    a: `In Northwest Arkansas, Springdale and Lowell serve University of Arkansas students, and Bentonville serves NorthWest Arkansas Community College. In the Little Rock metro, West Little Rock, Shackleford, and Riverdale serve UA Little Rock, UAMS, Philander Smith, and Arkansas Baptist College, while North Little Rock and Maumelle Blvd serve UA–Pulaski Tech. National Park College students are served by Modern Storage® Hot Springs. Use the locations page to confirm the closest facility and reserve online.`,
    aHtml: `In Northwest Arkansas, <a href="/locations/springdale">Springdale</a> and <a href="/locations/lowell">Lowell</a> serve University of Arkansas students, and <a href="/locations/bentonville">Bentonville</a> serves NorthWest Arkansas Community College. In the Little Rock metro, <a href="/locations/west-little-rock">West Little Rock</a>, <a href="/locations/shackleford">Shackleford</a>, and <a href="/locations/riverdale">Riverdale</a> serve UA Little Rock and downtown campuses, while <a href="/locations/north-little-rock">North Little Rock</a> and <a href="/locations/maumelle">Maumelle Blvd</a> serve UA–Pulaski Tech. National Park College students are served by <a href="/locations/hot-springs">Modern Storage® Hot Springs</a>. See the <a href="/locations">locations page</a> to confirm the closest facility.`,
  },
  {
    q: 'Do you have climate-controlled units for electronics and books?',
    a: `Many Modern Storage® locations offer climate-controlled units, which help protect laptops, electronics, books, paper, and other temperature-sensitive items from Arkansas heat and humidity over a long summer. Availability varies by location — check the location you're storing at to confirm.`,
    aHtml: `Many Modern Storage® locations offer <a href="/climate-controlled">climate-controlled units</a>, which help protect laptops, electronics, books, paper, and other temperature-sensitive items from Arkansas heat and humidity over a long summer. Availability varies by location — check the location you're storing at to confirm.`,
  },
  {
    q: 'Is there a free moving truck for move-out?',
    a: `Modern Storage® offers a free moving truck with new rentals at participating Arkansas locations — handy for hauling a dorm or apartment to storage on move-out day. Availability, mileage, and terms vary by location.`,
    aHtml: `Modern Storage® offers a <a href="/free-moving-truck">free moving truck</a> with new rentals at participating Arkansas locations — handy for hauling a dorm or apartment to storage on move-out day. Availability, mileage, and terms vary by location.`,
  },
  {
    q: 'How do I reserve student storage?',
    a: `Choose the location closest to your campus on the locations page and reserve online in a few minutes, or call 501-910-0096 and the team will help you pick the right unit size. Reserve early in spring — student storage fills up fast around May move-out.`,
    aHtml: `Choose the location closest to your campus on the <a href="/locations">locations page</a> and reserve online in a few minutes, or call <a href="tel:+15019100096">501-910-0096</a> and the team will help you pick the right unit size. Reserve early in spring — student storage fills up fast around May move-out.`,
  },
  // ── Comparison-style entries (student alternatives) ──────────────────
  // Skipped: "What Size Storage Unit Do College Students Need?" — covered
  // by the existing "What size storage unit do students usually need?"
  {
    q: 'Student Storage vs Bringing Everything Home — which is better?',
    a: `Bringing everything home each semester can be time-consuming and expensive. Student storage provides a convenient solution for keeping belongings near campus between terms.`,
  },
  {
    q: 'Dorm Storage vs Storage Unit — which is better?',
    a: `Dorm storage is often limited and unavailable during breaks. Storage units provide additional room for furniture, clothing, electronics, and personal belongings.`,
  },
  {
    q: 'Shared Storage Unit vs Individual Storage Unit — which is better?',
    a: `Shared storage units help reduce costs by splitting expenses among roommates. Individual units provide greater privacy and control over access.`,
  },
  {
    q: 'College Storage vs Moving Everything Every Semester — which is better?',
    a: `Moving belongings every semester requires transportation, packing, and time. College storage simplifies transitions by keeping items stored until they are needed again.`,
  },
  {
    q: '5x5 vs 5x10 Storage Unit for College Students — which is better?',
    a: `A 5x5 unit is ideal for boxes, clothing, and small dorm items. A 5x10 unit provides additional room for mattresses, desks, mini-fridges, and larger furniture. Students moving out of apartments often find a 5x10 more practical.`,
  },
  {
    q: 'Shared Storage Unit vs Renting Multiple Units — which is better?',
    a: `Sharing a larger storage unit with roommates can reduce costs while keeping everyone's belongings in one location. Multiple units may provide better privacy but usually cost more.`,
  },
  {
    q: 'Storage Unit vs Leaving Items in a Dorm Room — which is better?',
    a: `Many schools require students to completely vacate dorm rooms during summer break. A storage unit provides a secure place to keep belongings until the next semester begins.`,
  },
  {
    q: "Storage Unit vs Moving Furniture Back to Parents' House — which is better?",
    a: `Transporting furniture home every semester can require truck rentals, extra labor, and long-distance travel. A nearby storage unit may be more convenient and cost-effective.`,
  },
  {
    q: 'Summer Storage vs Year-Round Storage — which should I choose?',
    a: `Students who only need storage during breaks may prefer short-term rentals. Year-round storage can be beneficial for students who frequently move between apartments or dorms.`,
  },
  {
    q: 'Best Storage Unit for College Students — how do I choose?',
    a: `The best option depends on the amount of belongings being stored, the length of storage needed, and whether the student is sharing space with roommates. Most students find a 5x5 or 5x10 unit provides sufficient space for summer storage.`,
  },
] as const

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Student & College Storage',
    name: 'Student Storage Near Arkansas Universities',
    description:
      'Month-to-month dorm and apartment storage for college students near Arkansas universities, with the closest Modern Storage® location mapped to each campus.',
    url: SITE_URL + PAGE_PATH,
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
      { '@type': 'ListItem', position: 2, name: 'Student Storage', item: SITE_URL + PAGE_PATH },
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

export default async function StudentStoragePage() {
  const settings = await getSiteSettings()
  const jsonLd = buildJsonLd()
  const PHONE_NUMBER_HREF = settings.phoneHref

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-charcoal text-white relative overflow-hidden">
        <div className="h-1 w-full bg-modern-red" />
        {/* Two-column hero: text on the left, full-bleed campus image on
            the right. The image is absolutely positioned on lg+ so it
            extends to the right edge of the viewport (echoing the design
            in the latest screenshot) while the text content stays
            constrained to the max-w-7xl container. On mobile the image
            is hidden and the text takes the full width. */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 z-0">
          <Image
            src={HERO_IMAGE}
            alt={HERO_ALT}
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          {/* Soft left-edge gradient so the image blends into the charcoal
              text panel instead of presenting a hard vertical seam. */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent" aria-hidden="true" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Student Storage</li>
            </ol>
          </nav>

          {/* Mobile image — shown only below lg so the text doesn't sit on
              top of the photo on small screens. Constrained to a 16:9
              card under the headline. */}
          <div className="lg:hidden mb-8 rounded-2xl overflow-hidden shadow-xl aspect-[16/9] bg-gray-800 relative">
            <Image
              src={HERO_IMAGE}
              alt={HERO_ALT}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-xl lg:max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              College & Student Storage
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Student Storage Near <span className="text-modern-red">Arkansas Universities</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              Store your dorm or apartment over summer break, study abroad, or between leases — month-to-month, with no long-term contract. Find the closest Modern Storage® location to your campus and reserve online in minutes.
            </p>
            {/* Row 1 — browse intents (transparent pills). */}
            <div className="flex flex-wrap gap-3 mb-3">
              <Link href="/#locations" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                Find a Location
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/size-guide" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                Size Guide
              </Link>
            </div>
            {/* Row 2 — audience-split pills with distinct colors.
                New Rentals (red) dials the centralized line; Existing
                Customers (white with red text — matches the recent
                niche-page treatment) opens the tenant portal. */}
            <div className="flex flex-wrap gap-3">
              <a
                href={PHONE_NUMBER_HREF}
                aria-label={`New Rentals — call ${settings.phoneDisplay}`}
                className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-6 py-3 rounded-full transition-colors text-sm shadow-md"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                </svg>
                New Rentals
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Campus → nearest location map */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Find your campus</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Universities &amp; the Closest Modern Storage® Location
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Pick your school below to see the nearest facility, then reserve online. Drive times are approximate and depend on traffic and campus location.
            </p>
          </div>

          <div className="space-y-12">
            {CAMPUS_GROUPS.map((group) => (
              <div key={group.region}>
                <h3 className="text-xs font-black uppercase tracking-widest text-modern-red mb-5">{group.region}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.campuses.map((c) => (
                    <div key={c.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <h4 className="font-black text-charcoal leading-tight mb-1">{c.name}</h4>
                      <p className="text-sm text-gray-500 mb-4">{c.note}</p>
                      <div className="flex flex-wrap gap-2">
                        {c.stores.map((s) => (
                          <Link
                            key={s.slug}
                            href={'/locations/' + s.slug}
                            className="inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:border-modern-red hover:text-modern-red text-charcoal text-sm font-bold px-3.5 py-2 rounded-full transition-colors"
                          >
                            {s.label} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why students store */}
      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why students use storage</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Made for the College Calendar
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Month-to-month rentals fit the way the school year actually works. Common ways Arkansas students use Modern Storage®:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((u) => (
              <div key={u.title} className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-black text-charcoal mb-2 leading-tight">{u.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed mt-8 max-w-3xl">
            Not sure what size you need? A 5x5 holds a dorm room, a 5x10 fits an apartment bedroom, and a 10x10 holds a one-bedroom apartment. Use the{' '}
            <Link href="/size-guide" className="text-modern-red font-semibold hover:underline">Size Guide</Link> or{' '}
            <Link href="/ai-storage-size-finder" className="text-modern-red font-semibold hover:underline">AI Storage Size Finder</Link>, and grab a{' '}
            <Link href="/free-moving-truck" className="text-modern-red font-semibold hover:underline">free moving truck</Link> at participating locations for move-out day.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Student Storage FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Student Storage Near Your Campus
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Month-to-month, reservable online in minutes. Find the closest Modern Storage® location to your university and lock in your unit before May move-out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#locations" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Find a Location
            </Link>
            <Link href="/storage-near-fayetteville" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              Storage Near Fayetteville
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
