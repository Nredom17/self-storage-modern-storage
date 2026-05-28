import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/guides/moving-storage'
const HERO_IMAGE = '/images/modern-storage-free-moving-truck.jpg'
const HERO_ALT =
  'Modern Storage® free moving truck — used for between-leases storage, long-distance moves, and military relocation in Arkansas'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage During a Move in Arkansas | Modern Storage® Guide',
  },
  description:
    'Storage during a move in Arkansas — between leases, military PCS, long-distance relocation, renovation moves, and downsizing. Pair with the Modern Storage® free moving truck for one-trip move-in. Month-to-month rentals at 10 locations.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage During a Move in Arkansas | Modern Storage® Guide',
    description:
      'Moving storage guide — between leases, PCS, long-distance relocation, renovations, and downsizing. Free moving truck included with new rentals.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'article',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage During a Move in Arkansas | Modern Storage® Guide',
    description: 'Moving storage guide for Arkansas households.',
    images: [HERO_IMAGE],
  },
}

const MOVING_SCENARIOS = [
  {
    title: 'Between leases',
    body:
      'Old lease ends Saturday, new one starts the 15th. Modern Storage® month-to-month rentals bridge the gap — store the apartment or house for one or two months without committing to a long contract, then close out when the new place is ready.',
  },
  {
    title: 'Long-distance relocation',
    body:
      'Moving to or from Arkansas? Store your belongings on the destination side while you find the right house, then load directly from storage to the new address. Reduces hotel days, avoids rushed home-buying decisions, and protects items in climate-controlled units during the search.',
  },
  {
    title: 'Military PCS moves',
    body:
      'PCS orders arrive with tight timelines. Modern Storage® supports deployments and relocations from the Little Rock Air Force Base and Camp Robinson area — month-to-month rentals match unpredictable orders, climate-controlled units protect uniforms and electronics, and free moving truck access at participating locations helps move-in day.',
  },
  {
    title: 'Renovation moves',
    body:
      'Whole-home renovation, kitchen remodel, or floor replacement? Park furniture, appliances, rugs, and household contents in a Modern Storage® unit while contractors work. Climate-controlled protects items from construction dust and humidity; month-to-month means you only pay through the project.',
  },
  {
    title: 'Downsizing transitions',
    body:
      'Selling the big house, moving into something smaller. Store the heirlooms, holiday decor, and the furniture you can\'t bring with you — without rushing decisions about what to part with. Many downsizers keep a unit for 6-12 months and close it out as the new place takes shape.',
  },
  {
    title: 'Selling a home',
    body:
      'Staging the house? Move the personal items, the extra furniture, and the kid\'s art project tower into storage so the home shows well. Real estate agents often recommend a temporary Modern Storage® unit during the listing period to maximize buyer appeal.',
  },
] as const

const MOVE_PHASE_GUIDE = [
  {
    phase: '4–6 weeks before',
    actions: [
      'Reserve your Modern Storage® unit online and request the free moving truck for your move-in day at participating locations.',
      'Pick unit size based on what you\'re storing — a 10x10 fits a one-bedroom, a 10x15 fits a two-bedroom, a 10x20 fits a three-bedroom home.',
      'Start packing seasonal items, holiday decor, and out-of-season clothing first — these can go to storage early.',
    ],
  },
  {
    phase: '2 weeks before',
    actions: [
      'Confirm truck date and reservation specifics with the team at your Modern Storage® location.',
      'Pack room by room, labeling each box with the room and a one-line content note on the side (not the top).',
      'Disassemble bed frames, table legs, and modular shelving for flat-packing in the truck.',
    ],
  },
  {
    phase: 'Move-in day',
    actions: [
      'Pick up the truck with driver\'s license and proof of insurance — most customers are on the road within 15 minutes.',
      'Load heaviest items first against the cab, mattresses and couches next, boxes on top with heaviest at the bottom, fragile items last.',
      'Drive directly to the storage unit. Return the truck same-day with a full tank.',
    ],
  },
  {
    phase: 'After move-in',
    actions: [
      'Keep month-to-month for as long as you need — extend, downsize, or close out when your situation changes.',
      'Walk the unit periodically to check for moisture or pests (climate-controlled units stay drier than drive-up).',
      'When you close out, give the local team notice and return your keys/access code — no early-termination fees.',
    ],
  },
] as const

const FAQS = [
  {
    q: 'Is storage worth it during a move?',
    a: `For most household moves, yes. Storage gives you breathing room: store the apartment or house before a new lease starts, hold items during a long-distance search, park furniture during a renovation, or stage a home for sale without rushing decisions. The cost of one or two months of storage is usually small compared to the cost of bad decisions made under move-in-day pressure.`,
  },
  {
    q: 'How long can I keep a storage unit during a move?',
    a: `Modern Storage® rentals are month-to-month with no long-term contract. Rent for one month, six months, or as long as your move takes — and close out whenever the situation changes. Between-leases customers typically need 1-3 months. Long-distance relocators average 3-6 months. Downsizers and home-sellers often keep a unit for 6-12 months while the next chapter takes shape.`,
  },
  {
    q: 'Is there a free moving truck during the move?',
    a: `Yes — Modern Storage® offers a free moving truck with new household storage rentals at participating Arkansas locations. The truck makes move-in easier and eliminates the need for a separate U-Haul or Penske reservation. Most one-bedroom and two-bedroom moves fit in a single trip. Truck availability, mileage limits, and participation vary by location. See the free moving truck page for full details.`,
  },
  {
    q: 'What size storage unit do I need for a move?',
    a: `For a studio or single bedroom, a 5x10 (50 sq ft) is usually right. A one-bedroom apartment fits in a 10x10 (100 sq ft). A two-bedroom home fits in a 10x15 (150 sq ft). A three-bedroom home fits in a 10x20 (200 sq ft). Four-to-five-bedroom homes with garage contents need a 10x30 (300 sq ft) — availability varies by location. Use the AI Storage Size Finder for a personalized recommendation in under 30 seconds.`,
  },
  {
    q: 'Should I use climate-controlled storage during a move?',
    a: `Climate-controlled is the right call if your move spans more than a few weeks and includes wood furniture, leather, mattresses, electronics, photos, instruments, or anything sensitive to Arkansas heat and humidity. Drive-up storage is fine for short-term storage of tools, plastic bins, and durable garage-type items. For long-distance relocators and downsizers who plan to keep the unit for months, climate-controlled is the safer call.`,
  },
  {
    q: 'Do you offer storage for military PCS moves to or from Arkansas?',
    a: `Yes — Modern Storage® supports military PCS moves to and from Little Rock Air Force Base, Camp Robinson, and other Arkansas postings. Month-to-month rentals match unpredictable orders, climate-controlled units protect uniforms and electronics during long deployments, and locations across central Arkansas (Shackleford, North Little Rock, Maumelle, Bryant) sit within reasonable drive of base housing and rentals.`,
  },
  {
    q: 'Can I store everything from a renovation?',
    a: `Yes. Renovation storage is one of the most common Modern Storage® use cases. Move furniture, appliances, rugs, decor, and personal items into a unit before the contractor crew arrives. A 10x10 covers a typical kitchen or bath renovation; a 10x15 or 10x20 covers a whole-home remodel. Climate-controlled units are recommended — your belongings sit in stored conditions for months and benefit from stable indoor temperature.`,
  },
  {
    q: 'Which Modern Storage® location is best for my move?',
    a: `Pick the location closest to where the belongings are coming from OR where they\'re going to. For Little Rock area moves, options include Modern Storage® Shackleford, Riverdale, West Little Rock, North Little Rock, and Maumelle. Northwest Arkansas movers use Bentonville, Springdale, or Lowell. Bryant covers Saline County moves; Hot Springs serves Lake Hamilton and Hot Springs Village. The locations page has every facility with addresses and a reserve-online link.`,
  },
] as const

function buildJsonLd() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': SITE_URL + PAGE_PATH + '#article',
    headline: 'Storage During a Move in Arkansas — Modern Storage® Guide',
    description:
      'In-depth moving storage guide for Arkansas households covering between-leases storage, military PCS, long-distance relocation, renovation moves, and downsizing.',
    image: SITE_URL + HERO_IMAGE,
    author: { '@id': SITE_URL + '/#organization' },
    publisher: { '@id': SITE_URL + '/#organization' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL + PAGE_PATH },
    about: {
      '@type': 'Thing',
      name: 'Moving and Storage Services',
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: SITE_URL + '/guides' },
      { '@type': 'ListItem', position: 3, name: 'Storage During a Move', item: SITE_URL + PAGE_PATH },
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

export default async function MovingStoragePage() {
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
              <li className="text-gray-300">Storage During a Move</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Moving storage guide
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                <span className="text-modern-red">Storage During a Move</span> in Arkansas
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
                Moving rarely lines up neatly. Modern Storage® month-to-month rentals bridge the gap between leases, support long-distance relocation, hold furniture during renovations, and stage homes for sale — paired with a free moving truck at participating Arkansas locations.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/locations" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  Find a Nearby Location
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/free-moving-truck" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  See Free Moving Truck
                </Link>
                <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                  New Rentals: {PHONE_NUMBER_DISPLAY}
                </a>
              </div>
            </div>

            <figure>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
                <Image src={HERO_IMAGE} alt={HERO_ALT} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="text-xs text-gray-500 mt-3 italic">
                Free moving truck with new Modern Storage® rentals — one-trip move-in for most apartments and homes.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why people use moving storage</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Six Moving Scenarios Where Storage Pays For Itself
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Moving storage isn\'t about storing forever — it\'s about buying yourself time to make good decisions during a specific transition. Modern Storage® <Link href="/household-storage" className="text-modern-red font-semibold hover:underline">household storage</Link> is built for exactly these six situations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOVING_SCENARIOS.map((s) => (
              <div key={s.title} className="bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 transition-colors">
                <h3 className="font-black text-charcoal mb-2 leading-tight">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Move-in timeline</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              The Modern Storage® Moving Storage Playbook
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Four phases from "we\'re moving" to "unit closed out." Use this checklist alongside the full <Link href="/move-in-checklist" className="text-modern-red font-semibold hover:underline">Modern Storage® move-in checklist</Link>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOVE_PHASE_GUIDE.map((p, i) => (
              <div key={p.phase} className="bg-white rounded-2xl p-6 border border-gray-200 transition-colors">
                <div className="font-bebas text-4xl text-modern-red leading-none mb-3">{i + 1}</div>
                <h3 className="font-black text-charcoal text-base mb-3 leading-tight">{p.phase}</h3>
                <ul className="space-y-2">
                  {p.actions.map((a, j) => (
                    <li key={j} className="text-sm text-gray-700 leading-relaxed flex gap-2">
                      <span className="text-modern-red font-black shrink-0">·</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Pick a location</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              Modern Storage® Locations for Your Move
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Ten facilities across central Arkansas and Northwest Arkansas. Pick the one closest to your origin or destination — both work, depending on which side of the move needs the storage.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { slug: 'shackleford', label: 'Modern Storage® Shackleford', note: 'West Little Rock, near I-630 / I-430' },
              { slug: 'west-little-rock', label: 'Modern Storage® West Little Rock', note: 'Chenal corridor, Se Habla Español' },
              { slug: 'riverdale', label: 'Modern Storage® Riverdale', note: 'Downtown LR, Hillcrest, the Heights' },
              { slug: 'north-little-rock', label: 'Modern Storage® North Little Rock', note: 'McCain corridor, Lakewood, Park Hill' },
              { slug: 'maumelle', label: 'Modern Storage® Maumelle Blvd', note: 'Hwy 100, Maumelle, west NLR' },
              { slug: 'bryant', label: 'Modern Storage® Bryant', note: 'Saline County, I-30 corridor' },
              { slug: 'hot-springs', label: 'Modern Storage® Hot Springs', note: 'Hot Springs, Lake Hamilton, HSV' },
              { slug: 'bentonville', label: 'Modern Storage® Bentonville', note: 'South Bentonville, downtown square' },
              { slug: 'springdale', label: 'Modern Storage® Springdale', note: 'Hwy 412 / I-49, University of Arkansas area' },
              { slug: 'lowell', label: 'Modern Storage® Lowell', note: 'I-49 between Rogers and Springdale' },
            ].map((loc) => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`} className="group bg-white/5 hover:bg-white/10 hover:border-modern-red rounded-2xl p-5 border border-white/10 transition-all">
                <h3 className="font-black text-white leading-tight group-hover:text-modern-red transition-colors text-sm">
                  {loc.label}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{loc.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Moving Storage FAQ
            </h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Moving Storage at Modern Storage®
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Month-to-month rentals at 10 Arkansas locations. Free moving truck included with new rentals at participating facilities. Close the unit out anytime your move wraps up.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Find a Location
            </Link>
            <Link href="/free-moving-truck" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              See Free Moving Truck Details
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
