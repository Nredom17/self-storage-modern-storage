// Self Storage vs PODS / Mobile Storage — Phase 3 comparison
// pillar page.
//
// Targets the highest-volume competitor comparison in self-storage.
// PODS, U-Pack, 1-800-PACK-RAT and the other portable / mobile
// storage operators are the main alternative shoppers consider
// when they search "storage near me". This page frames the choice
// honestly — PODS makes real sense for some situations (one-shot
// moves, no time to drive to a facility), self storage makes
// sense for others (ongoing, frequent access, long-term, climate-
// sensitive items). The honest framing is the AEO win; AI engines
// pick the balanced page over the marketing-only competitor.
//
// Pricing language uses ranges and "industry-typical" qualifiers
// since portable-storage operators don't publish standardized
// rates — exact PODS pricing varies by market, container size, and
// service type. We don't fabricate specific PODS numbers; we
// describe the typical structure.

import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/self-storage-vs-pods'

export const metadata: Metadata = {
  title: {
    absolute: 'Self Storage vs PODS / Mobile Storage: Which Is Cheaper? | Modern Storage®',
  },
  description:
    'PODS and mobile storage cost more per month than traditional self storage but bring the container to you. Self storage is cheaper for ongoing or long-term storage and gives you in-and-out access. Honest side-by-side comparison from Modern Storage®.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Self Storage vs PODS / Mobile Storage | Modern Storage®',
    description:
      'PODS is convenient for one-time moves; self storage is cheaper for ongoing storage with frequent access.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Self Storage vs PODS / Mobile Storage | Modern Storage®',
    description: 'When PODS makes sense and when self storage is the better fit.',
  },
}

// ── Side-by-side comparison rows ──────────────────────────────────
type CompareRow = {
  dimension: string
  pods: string
  storage: string
}

const COMPARE_ROWS: CompareRow[] = [
  {
    dimension: 'How it works',
    pods:
      'Container delivered to your driveway. You load it. They pick it up and either drive it to your new home or move it to their warehouse.',
    storage:
      'You drive to the facility. You load and unload directly from your vehicle into the unit you rent.',
  },
  {
    dimension: 'Cost per month (ongoing storage)',
    pods:
      'Industry-typical $150 – $400+ per month at the warehouse, plus delivery, pickup, and re-delivery fees',
    storage:
      'About $25 – $300+ per month depending on size and format. No delivery fees — you drive there.',
  },
  {
    dimension: 'Best for',
    pods:
      'One-time moves, brief storage during a closing delay, situations where you can\'t get to a storage facility',
    storage:
      'Ongoing storage, frequent access, long-term needs, anything humidity-sensitive needing climate control',
  },
  {
    dimension: 'Access while in storage',
    pods:
      'Warehouse access is by appointment only; container has to be retrieved from racking. Not designed for frequent visits.',
    storage:
      '7-day gated access 6:00 AM – 10:00 PM. Walk in, get what you need, walk out. No appointment.',
  },
  {
    dimension: 'Climate control',
    pods:
      'Container sits in a warehouse — typically not actively climate-controlled. Outdoor exposure during driveway storage and transit.',
    storage:
      'Climate-controlled units at Modern Storage® stay 59°F – 79°F year-round in HVAC-managed indoor buildings.',
  },
  {
    dimension: 'Loading convenience',
    pods:
      'Container sits in your driveway — load on your own time, no driving. Single load, single unload at the destination.',
    storage:
      'Drive-up units let you pull a vehicle directly to the door. Free moving truck available at participating Modern Storage® locations.',
  },
  {
    dimension: 'Container vs unit sizing',
    pods:
      'Three or four fixed container sizes (typically 7\', 12\', 16\' lengths). What you can store is what fits in the container.',
    storage:
      'Six unit sizes from 5x5 (closet) to 10x30 (4-5 bedroom home / 2-car garage). Pick the right size, scale up or down month-to-month.',
  },
  {
    dimension: 'Security',
    pods:
      'Container has a lock. In your driveway, security is on you. At the warehouse, varies by operator.',
    storage:
      'Gated facility with personal access codes, video surveillance, perimeter fencing, individual unit locks.',
  },
  {
    dimension: 'Move-out flexibility',
    pods:
      'Multi-month minimums common. Cancellation, re-delivery, and pickup fees can add up.',
    storage:
      'Month-to-month. No long-term contract, no early-termination fee, no move-out fee.',
  },
]

// ── Decision lists. When each option is the right call. ──────────
type DecisionEntry = { item: string; reason: string }

const STORAGE_WINS: DecisionEntry[] = [
  {
    item: 'Storage longer than a month or two',
    reason:
      'Monthly cost is significantly lower at a self-storage facility once the move-itself logistics aren\'t in play.',
  },
  {
    item: 'You need to access items frequently',
    reason:
      'Self-storage gates are open 7 days a week, 6 AM to 10 PM. PODS warehouse retrieval is by appointment with logistics overhead.',
  },
  {
    item: 'Anything humidity- or temperature-sensitive',
    reason:
      'Climate-controlled units at Modern Storage® stay 59°F-79°F year-round. PODS containers are not actively conditioned.',
  },
  {
    item: 'Furniture, electronics, photos, mattresses, instruments',
    reason:
      'Sensitive items benefit from indoor climate-controlled storage — particularly through Arkansas summer humidity.',
  },
  {
    item: 'You\'re willing to drive to the storage location',
    reason:
      'Direct facility access skips the per-delivery and per-pickup fees that mobile storage adds.',
  },
  {
    item: 'Business inventory you ship from regularly',
    reason:
      'Mini-warehouse units at Modern Storage® support active business use with loading docks (Riverdale) and 7-day access.',
  },
  {
    item: 'Scaling storage up or down based on the project phase',
    reason:
      'Switching unit sizes at a facility is a quick internal transfer. Switching container sizes with PODS means new delivery and pickup logistics.',
  },
  {
    item: 'You want clear month-to-month pricing without delivery fees',
    reason:
      'Self-storage has no delivery, no pickup, no re-delivery. The price on the reservation page is what you pay.',
  },
]

const PODS_WINS: DecisionEntry[] = [
  {
    item: 'One-time interstate or long-distance move',
    reason:
      'Container loads at origin, drives to destination — eliminates the truck-rental + multi-stop logistics.',
  },
  {
    item: 'Short bridge during a closing delay',
    reason:
      'If your new home isn\'t ready and you only need ~30 days, PODS handles the move + brief storage in one workflow.',
  },
  {
    item: 'You physically can\'t get to a storage facility',
    reason:
      'Medical situations, no vehicle, mobility limitations — having the container delivered solves the access problem.',
  },
  {
    item: 'You\'re moving and storing simultaneously',
    reason:
      'Loading once and unloading once at the destination is genuinely simpler than load → drive → unload → reload.',
  },
  {
    item: 'You have driveway space and HOA allows it',
    reason:
      'Container in the driveway = load on your own time without driving anywhere during the loading phase.',
  },
  {
    item: 'Brief renovation where you can\'t leave the property',
    reason:
      'Container on-site keeps belongings within reach without facility trips during the project.',
  },
]

// ── FAQs in concise→detailed→bullets format ──────────────────────
type FaqRow = { q: string; a: string; aHtml?: string }

const FAQS: FaqRow[] = [
  {
    q: 'Is PODS cheaper than self storage?',
    a: `For ongoing or long-term storage, no — self storage is significantly cheaper per month than PODS or any portable storage operator. PODS pricing typically runs $150-$400+ per month for warehouse storage of the most common container sizes, plus delivery, pickup, and re-delivery fees on top. A comparable 10x10 self-storage unit at Modern Storage® runs about $80-$140 per month drive-up or $110-$180 climate-controlled in Arkansas, with no delivery fees. PODS becomes cost-competitive only during the move itself, where eliminating the truck-rental and multi-stop labor offsets the higher container price. For storage beyond about 30-60 days, self storage is the more affordable choice. Self storage vs PODS — cost comparison: PODS monthly warehouse storage — typically $150-$400+ per month plus delivery and pickup fees; self-storage 5x10 (50 sq ft) — about $45-$75 drive-up, $60-$95 climate-controlled; self-storage 10x10 (100 sq ft) — about $80-$140 drive-up, $110-$180 climate-controlled; self-storage 10x15 (150 sq ft) — about $110-$180 drive-up, $150-$230 climate-controlled; PODS one-time move + brief storage — can pencil if it eliminates a U-Haul rental, but not for ongoing storage; self-storage break-even — beats PODS within the first 1-2 months for ongoing storage.`,
    aHtml: `<p>For ongoing or long-term storage, no — <strong>self storage is significantly cheaper per month than PODS</strong> or any portable storage operator. PODS pricing typically runs <strong>$150-$400+ per month</strong> for warehouse storage of the most common container sizes, plus delivery, pickup, and re-delivery fees on top.</p><p>A comparable 10x10 self-storage unit at Modern Storage® runs about <strong>$80-$140 per month drive-up or $110-$180 climate-controlled</strong> in Arkansas, with no delivery fees. PODS becomes cost-competitive only during the move itself, where eliminating the truck-rental and multi-stop labor offsets the higher container price.</p><p><strong>Cost comparison — self storage vs PODS:</strong></p><ul><li><strong>PODS monthly warehouse storage</strong> — typically $150-$400+ per month plus delivery and pickup fees</li><li><strong>Self-storage 5x10 (50 sq ft)</strong> — about $45-$75 drive-up, $60-$95 climate-controlled</li><li><strong>Self-storage 10x10 (100 sq ft)</strong> — about $80-$140 drive-up, $110-$180 climate-controlled</li><li><strong>Self-storage 10x15 (150 sq ft)</strong> — about $110-$180 drive-up, $150-$230 climate-controlled</li><li><strong>PODS for one-time move + brief storage</strong> — can pencil if it eliminates a U-Haul rental; not for ongoing storage</li><li><strong>Self-storage break-even</strong> — beats PODS within the first 1-2 months for ongoing storage</li></ul>`,
  },
  {
    q: 'When does PODS make more sense than self storage?',
    a: `PODS makes more sense than self storage in three specific situations: a one-time interstate or long-distance move where loading the container once at origin and unloading once at destination eliminates a multi-day truck rental; a short bridge during a closing delay where you need both moving logistics and 30-60 days of storage handled in one workflow; or a situation where you physically can\'t get to a self-storage facility (medical limitations, no vehicle access, mobility issues). For any storage need beyond about two months, or anywhere you want frequent access to your belongings, self storage is the more practical and affordable choice. PODS is the right call when: you\'re moving interstate or long-distance and want to skip the truck-rental logistics; your new home isn\'t ready and you need ~30 days of bridge storage; you physically can\'t get to a self-storage facility; you have driveway space + HOA approval for a container; you\'re doing a brief renovation and want belongings on-site rather than at a facility. Self storage is the right call when: storage is ongoing or longer than ~2 months; you need to access items more than once or twice a month; you\'re storing humidity- or temperature-sensitive items; you want clear month-to-month pricing without delivery fees.`,
    aHtml: `<p>PODS makes more sense than self storage in three specific situations: <strong>a one-time interstate or long-distance move</strong> where loading the container once at origin and unloading once at destination eliminates a multi-day truck rental; <strong>a short bridge during a closing delay</strong> where you need both moving logistics and 30-60 days of storage handled in one workflow; or <strong>a situation where you physically can\'t get to a self-storage facility</strong> (medical limitations, no vehicle access, mobility issues).</p><p>For any storage need beyond about two months, or anywhere you want frequent access to your belongings, self storage is the more practical and affordable choice.</p><p><strong>PODS is the right call when:</strong></p><ul><li>You\'re moving interstate or long-distance and want to skip the truck-rental logistics</li><li>Your new home isn\'t ready and you need ~30 days of bridge storage</li><li>You physically can\'t get to a self-storage facility</li><li>You have driveway space + HOA approval for a container</li><li>You\'re doing a brief renovation and want belongings on-site</li></ul><p><strong>Self storage is the right call when:</strong></p><ul><li>Storage is ongoing or longer than ~2 months</li><li>You need to access items more than once or twice a month</li><li>You\'re storing humidity- or temperature-sensitive items</li><li>You want clear month-to-month pricing without delivery fees</li></ul>`,
  },
  {
    q: 'Can I access items inside a PODS container while it\'s in storage?',
    a: `Accessing items inside a PODS container at the warehouse typically requires scheduling an appointment in advance — the container has to be retrieved from racked storage before you can open it, and operators usually charge a fee for each access visit. This is the main practical difference vs self storage: a Modern Storage® unit is available 7 days a week from 6:00 AM to 10:00 PM with no appointment, so getting in and out is a 15-minute trip rather than a logistics request. If frequent access is part of your storage need — pulling holiday decorations, swapping seasonal items, checking on furniture — self storage is significantly more convenient than any portable storage operator.`,
  },
  {
    q: 'Does PODS protect items from Arkansas heat and humidity?',
    a: `Most PODS warehouses are not actively climate-controlled, and the container itself sits outdoors during driveway storage and in-transit periods. For furniture, electronics, photos, mattresses, instruments, or anything humidity-sensitive — particularly through Arkansas summer (70%+ humidity, 100°F+ heat indexes) — a PODS container is closer to garage-equivalent conditions than climate-controlled storage. Climate-controlled units at Modern Storage® stay in a managed 59°F to 79°F range year-round inside HVAC-conditioned buildings, which is the meaningful protection sensitive items need. If your storage need includes items that could be damaged by heat or humidity, climate-controlled self storage is the safer choice.`,
  },
  {
    q: 'Can I switch from PODS to self storage (or vice versa) later?',
    a: `Yes, but the transition involves real logistics either way. Switching from PODS to self storage means scheduling a final delivery to your home (or directly to a self-storage facility if the operator allows), then unloading the container into your storage unit. The container's contents become storage-unit contents in a single move. Switching from self storage to PODS means renting the container, loading from your unit, and arranging container destination. Most customers don\'t switch mid-stream — they pick the format that fits the situation from the start. The decision tree on this page covers when each option makes sense.`,
  },
  {
    q: 'Is a U-Haul trailer + self storage cheaper than PODS for a move?',
    a: `Usually yes — particularly for in-state or short-distance moves. A typical workflow: rent a U-Haul truck or trailer for one day (~$50-$200 depending on size), drive to your origin, load up, drive to a self-storage facility, unload into your rented unit, return the truck. Total: truck rental + the storage rental ($25-$300+ per month depending on size). A PODS workflow charges for the container, delivery to origin, pickup, transport, redelivery to destination, and pickup after unloading — typically adding up to several hundred dollars in service fees plus the monthly container rental. For interstate moves with significant distance, PODS becomes more competitive because eliminating the long-distance truck rental can offset the service fees. Modern Storage® offers a free moving truck at participating locations with new rentals, which removes the truck-rental cost from the self-storage workflow entirely. See the free-moving-truck page for details.`,
  },
  {
    q: 'What about other portable storage operators — U-Pack, 1-800-PACK-RAT, Zippy Shell?',
    a: `The portable storage operators (PODS, U-Pack ReloCubes, 1-800-PACK-RAT, Zippy Shell, and others) all use the same basic business model: deliver a container, you load it, they move and/or store it. Pricing structures and exact container sizes vary by operator, but the trade-offs vs traditional self storage are the same — convenient for one-time moves and brief storage, more expensive per month and harder to access for ongoing or long-term storage. The framework on this page applies to any portable storage comparison, not just PODS specifically.`,
  },
  {
    q: 'How do I decide if I should use self storage, PODS, or my garage?',
    a: `Three-question decision: how long, how often do you need access, and what are you storing? For under 30 days where you can\'t reach a facility, PODS or your garage. For ongoing or 60+ days, self storage. For frequent access, self storage. For humidity-sensitive items, climate-controlled self storage. Tools and outdoor gear can usually live in the garage. Furniture, electronics, photos, and anything you want to keep nice — climate-controlled self storage in Arkansas, regardless of duration. See self storage vs garage for the home-garage comparison, and climate-controlled vs standard storage for the indoor-vs-outdoor self-storage decision.`,
    aHtml: `<p>Three-question decision: <strong>how long, how often do you need access, and what are you storing?</strong></p><ul><li><strong>Under 30 days where you can\'t reach a facility</strong> — PODS or your garage</li><li><strong>Ongoing or 60+ days</strong> — self storage</li><li><strong>Frequent access needed</strong> — self storage</li><li><strong>Humidity-sensitive items</strong> — climate-controlled self storage</li><li><strong>Tools and outdoor gear</strong> — usually your garage</li><li><strong>Furniture, electronics, photos</strong> — climate-controlled self storage in Arkansas, regardless of duration</li></ul><p>See <a href="/self-storage-vs-garage">self storage vs garage</a> for the home-garage comparison, and <a href="/climate-controlled-vs-standard">climate-controlled vs standard storage</a> for the indoor-vs-outdoor self-storage decision.</p>`,
  },
]

function buildJsonLd() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Self Storage vs PODS',
        item: SITE_URL + PAGE_PATH,
      },
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
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': SITE_URL + PAGE_PATH + '#article',
    headline: 'Self Storage vs PODS / Mobile Storage: Which Is Cheaper?',
    description:
      'Honest side-by-side comparison of self storage and PODS / mobile storage — when each format makes sense for an Arkansas household or business.',
    url: SITE_URL + PAGE_PATH,
    author: { '@id': SITE_URL + '/#organization' },
    publisher: { '@id': SITE_URL + '/#organization' },
    mainEntityOfPage: SITE_URL + PAGE_PATH,
  }
  return [breadcrumb, faqPage, article]
}

export default async function StorageVsPodsPage() {
  const jsonLd = buildJsonLd()

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Self Storage vs PODS</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
              Storage comparison
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Self Storage vs <span className="text-modern-red">PODS</span> / Mobile Storage
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              PODS and portable storage make real sense for one-time moves and short bridge storage. Traditional self storage is significantly cheaper per month for ongoing storage and gives you 7-day in-and-out access. Here&apos;s the honest framework for picking between them.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER ─────────────────────────────────────── */}
      <section className="bg-modern-red/5 py-10 border-b border-modern-red/20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
            Quick answer
          </p>
          <p className="text-charcoal text-lg leading-relaxed">
            <strong>Use PODS</strong> for one-time interstate or long-distance moves, brief bridge storage during a closing delay, or situations where you physically can&apos;t get to a self-storage facility. <strong>Use self storage</strong> for anything ongoing, anything humidity-sensitive, anything you need to access frequently, or any storage longer than about two months — it&apos;s significantly cheaper per month and the access is unrestricted within 6:00 AM – 10:00 PM gate hours.
          </p>
        </div>
      </section>

      {/* ── SIDE-BY-SIDE COMPARISON TABLE ─────────────────────── */}
      <section className="bg-white py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              At a glance
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              PODS vs Self Storage — Side by Side
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Nine dimensions where the two formats differ. Self-storage pricing references{' '}
              <Link href="/pricing" className="text-modern-red font-semibold hover:underline">
                /pricing
              </Link>
              {' '}for Modern Storage® Arkansas rates. PODS pricing is industry-typical since portable-storage operators don&apos;t publish standardized rates.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-charcoal text-white">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs w-1/5">
                      Dimension
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-gray-400" aria-hidden="true" />
                        PODS / portable
                      </span>
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-modern-red" aria-hidden="true" />
                        Self storage
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.dimension} className="bg-white align-top">
                      <th scope="row" className="px-4 sm:px-6 py-4 font-black text-charcoal text-sm leading-tight">
                        {row.dimension}
                      </th>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 leading-relaxed">
                        {row.pods}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 leading-relaxed">
                        {row.storage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── DECISION LISTS ─────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              When to pick each
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Pick the Format That Fits the Situation
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              PODS handles a specific job well — bringing a container to your driveway and either moving it or storing it for you. Self storage handles a different job — providing a low-cost facility you drive to whenever you need access. Match the format to the use case, not the marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Self storage column */}
            <div className="bg-white rounded-2xl p-7 border-2 border-modern-red shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-modern-red" aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-widest text-modern-red">
                  Self storage wins
                </p>
              </div>
              <h3 className="font-black text-charcoal text-xl mb-5 leading-tight">
                Choose self storage when
              </h3>
              <ul className="space-y-3">
                {STORAGE_WINS.map((entry) => (
                  <li key={entry.item} className="flex gap-3">
                    <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-charcoal leading-tight mb-0.5">
                        {entry.item}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">{entry.reason}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* PODS column */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-gray-400" aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                  PODS wins
                </p>
              </div>
              <h3 className="font-black text-charcoal text-xl mb-5 leading-tight">
                Choose PODS when
              </h3>
              <ul className="space-y-3">
                {PODS_WINS.map((entry) => (
                  <li key={entry.item} className="flex gap-3">
                    <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-charcoal leading-tight mb-0.5">
                        {entry.item}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">{entry.reason}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── COST COMPARISON CALLOUT ─────────────────────────────
          Highest-volume search-intent angle: cost. Surfaces the
          break-even framing in big readable text. */}
      <section className="bg-white py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Break-even
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
              When Self Storage Beats PODS on Cost
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              The PODS workflow is competitive when it eliminates a truck rental — moving day, basically. After that, ongoing monthly storage at the warehouse runs significantly higher than a comparable self-storage unit. The break-even usually hits within the first month or two of ongoing storage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                  Under 30 days
                </p>
                <p className="text-base font-bold text-charcoal mb-2">PODS often competitive</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Especially if you&apos;d need to rent a truck anyway, or if the move includes long distance.
                </p>
              </div>
              <div className="bg-modern-red/5 rounded-2xl p-6 border border-modern-red">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                  30 – 60 days
                </p>
                <p className="text-base font-bold text-charcoal mb-2">
                  Break-even — self storage starts winning
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Monthly self-storage cost drops below the equivalent PODS warehouse-storage rate.
                </p>
              </div>
              <div className="bg-modern-red/5 rounded-2xl p-6 border border-modern-red">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                  60+ days
                </p>
                <p className="text-base font-bold text-charcoal mb-2">
                  Self storage significantly cheaper
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Gap widens every month. Add climate-controlled benefits + 7-day access on top.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mt-8">
              Modern Storage® offers a{' '}
              <Link href="/free-moving-truck" className="text-modern-red font-semibold hover:underline">
                free moving truck
              </Link>
              {' '}at participating locations with new rentals — which removes the truck-rental cost from the self-storage workflow entirely, closing one of PODS&apos;s main advantages.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-16 lg:py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              FAQ
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Self Storage vs PODS — FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              The questions Arkansas customers ask most when deciding between portable storage and a traditional self-storage facility.
            </p>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Compare live pricing at your nearest Modern Storage®
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            See exact monthly rates for every unit size, climate-controlled and drive-up, at the Modern Storage® closest to you. Month-to-month, no delivery fees, no long-term contract.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              See Live Rates by Location
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/free-moving-truck"
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Free Moving Truck Details
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
