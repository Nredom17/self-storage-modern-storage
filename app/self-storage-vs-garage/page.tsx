// Self Storage vs Garage at Home — Phase 3 comparison pillar page.
//
// Targets the broadest "do I really need a storage unit?" dilemma:
// every homeowner has stood in their garage and wondered whether to
// clean it out, rent storage, or just live with the clutter. This
// page answers honestly — sometimes the garage is fine, often it
// isn't, and the Arkansas climate is the deciding factor more than
// most customers realize.
//
// Tone: neutral. The page recommends a garage when a garage is
// genuinely the right call (durable items, quick access, no budget).
// That honesty is the AEO win — most operators only sell the
// storage-unit answer, AI engines reward the page that frames both.

import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/self-storage-vs-garage'

export const metadata: Metadata = {
  title: {
    absolute: 'Self Storage vs Garage at Home: Which Should You Use? | Modern Storage®',
  },
  description:
    'Self storage protects against Arkansas heat and humidity that home garages can\'t (120°F+ summer interior, 70%+ humidity). Garage works fine for tools and outdoor gear, but furniture, electronics, mattresses, and photos last longer in climate-controlled storage. Honest side-by-side comparison from Modern Storage®.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Self Storage vs Garage at Home | Modern Storage®',
    description:
      'Garage works for tools and outdoor gear; self storage protects furniture, electronics, and photos from Arkansas heat and humidity.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Self Storage vs Garage at Home | Modern Storage®',
    description: 'When the garage is fine and when self storage is the right call.',
  },
}

// ── Side-by-side comparison rows ──────────────────────────────────
type CompareRow = {
  dimension: string
  garage: string
  storage: string
}

const COMPARE_ROWS: CompareRow[] = [
  {
    dimension: 'Cost',
    garage:
      'Free (already part of your home) — but uses driveway, workshop, or parking square footage',
    storage:
      'About $25-$300+ per month depending on size and format',
  },
  {
    dimension: 'Summer interior temperature',
    garage:
      '120°F+ in direct Arkansas sun, even higher in attached garages with hot roof exposure',
    storage:
      'Climate-controlled: stable 59°F-79°F year-round. Drive-up: same as outdoor (similar to a garage)',
  },
  {
    dimension: 'Humidity exposure',
    garage:
      'Tracks outdoor humidity (70%+ Arkansas summer) plus moisture from cars, lawn equipment, and outdoor air',
    storage:
      'Climate-controlled: reduced indoor humidity via HVAC. Drive-up: same as outdoor garage',
  },
  {
    dimension: 'Pest exposure',
    garage:
      'Mice, roaches, spiders, and seasonal insect intrusion — garages are not sealed environments',
    storage:
      'Pest-managed facility with regular monitoring; sealed interior buildings for climate-controlled units',
  },
  {
    dimension: 'Vehicle parking',
    garage:
      'Best case: 2-car garage holds 2 vehicles plus light overflow — most don\'t',
    storage:
      'Storage doesn\'t affect home parking — frees up the garage for vehicles and active workshop use',
  },
  {
    dimension: 'Security',
    garage:
      'Garage door + home alarm; visible from the street; insurance coverage via homeowners policy',
    storage:
      'Gated facility with personal access codes, perimeter fencing, video surveillance, individual unit locks',
  },
  {
    dimension: 'Convenience',
    garage:
      'Always-on access — walk out and grab whatever you need',
    storage:
      '7-day gated access 6:00 AM - 10:00 PM; a short drive but no clutter at home',
  },
  {
    dimension: 'Space scalability',
    garage:
      'Fixed — whatever floor space you already have',
    storage:
      'Scalable — pick the unit size you need, scale up or down month to month',
  },
  {
    dimension: 'Move-out flexibility',
    garage:
      'N/A',
    storage:
      'Month-to-month, no early-termination fee, no long-term commitment',
  },
]

// ── Decision lists ────────────────────────────────────────────────
type DecisionEntry = { item: string; reason: string }

const STORAGE_WINS: DecisionEntry[] = [
  {
    item: 'Furniture you want to keep nice — wood, leather, upholstered',
    reason:
      'Garage humidity (70%+ in Arkansas summer) and temperature swings warp wood, crack leather, and mildew upholstery.',
  },
  {
    item: 'Mattresses, bedding, photos, documents, books',
    reason:
      'Mattresses absorb humidity and grow internal mold. Paper yellows, curls, and mildews above ~70% humidity.',
  },
  {
    item: 'Electronics, TVs, computers, audio gear',
    reason:
      '120°F+ garage temperatures degrade capacitors and screens. Humidity corrodes circuit boards and connectors.',
  },
  {
    item: 'Anything sentimental or with significant resale value',
    reason:
      'Heat and humidity damage is gradual and often irreversible. Storage cost is small vs the loss.',
  },
  {
    item: 'You want your garage back for cars or a workshop',
    reason:
      'Most 2-car garages hold zero cars because they fill with overflow. Storage clears the space without throwing things away.',
  },
  {
    item: 'You\'re between homes, downsizing, or renovating',
    reason:
      'Short-to-medium-term needs (1-12 months) that don\'t justify expanding the garage. Storage is the elastic option.',
  },
  {
    item: 'Lakehouse or seasonal storage',
    reason:
      'Lakehouses sit empty between weekends in Arkansas humidity — climate-controlled storage protects seasonal items in a way a closed-up lake house can\'t.',
  },
  {
    item: 'Business inventory, samples, records',
    reason:
      'Inventory needs to arrive saleable. A garage isn\'t the right environment for products or paper records.',
  },
]

const GARAGE_WINS: DecisionEntry[] = [
  {
    item: 'Tools, lawn equipment, outdoor gear',
    reason:
      'Already built for outdoor use; you need quick access for yard work and projects.',
  },
  {
    item: 'Plastic storage bins of durable goods',
    reason:
      'Sealed bins protect contents from garage conditions reasonably well for short-to-medium-term storage.',
  },
  {
    item: 'Patio furniture and grills',
    reason:
      'Designed for outdoor weather; living in the garage is closer to use case than storage would be.',
  },
  {
    item: 'Construction tools and trade supplies',
    reason:
      'You\'re grabbing them at 6 AM for a jobsite — you don\'t want to make a stop on the way.',
  },
  {
    item: 'Seasonal sporting equipment you use weekly',
    reason:
      'Bikes, kayaks, golf bags — high-frequency use makes garage proximity worth more than condition protection.',
  },
  {
    item: 'Genuinely short-term storage (under 30 days)',
    reason:
      'Brief exposure to garage conditions rarely causes meaningful damage. Save the rent.',
  },
  {
    item: 'Items you\'re actively sorting to donate or discard',
    reason:
      'Don\'t pay to store things you\'re about to get rid of. Sort first, store what stays.',
  },
  {
    item: 'You have ample, dry, climate-controlled garage space',
    reason:
      'Insulated, conditioned attached garages with dehumidifiers approach storage-unit conditions — though most Arkansas garages don\'t.',
  },
]

// ── FAQs in concise→detailed→bullets format ──────────────────────
type FaqRow = { q: string; a: string; aHtml?: string }

const FAQS: FaqRow[] = [
  {
    q: 'When should I use self storage instead of my garage?',
    a: `Use self storage instead of your garage when the items are temperature- or humidity-sensitive, when you need garage space back for vehicles or workspace, or when storage is medium-to-long-term. Arkansas garages routinely hit 120°F+ in summer and track 70%+ outdoor humidity — conditions that warp wood furniture, crack leather, mildew mattresses, fade photos, and degrade electronics. For tools, outdoor gear, plastic bins, and durable items that already live happily in a hot garage, the garage is fine. For furniture, electronics, photos, mattresses, instruments, lakehouse seasonal items, and anything stored more than a few months, self storage — particularly climate-controlled — protects the contents and lets you reclaim the garage. Choose self storage over the garage when: storing furniture, electronics, photos, mattresses, instruments, or any humidity-sensitive items; items will sit more than a few months; you want garage space back for vehicles or a workshop; items have sentimental or significant resale value; you're between homes, downsizing, or renovating; storing lakehouse seasonal items or business inventory. Keep using the garage when: storing tools, lawn equipment, or outdoor gear you grab often; items live in sealed plastic bins for short periods; you have ample dry conditioned garage space; items are headed to donation or disposal anyway; storage is under 30 days.`,
    aHtml: `<p>Use self storage instead of your garage when the items are temperature- or humidity-sensitive, when you need garage space back for vehicles or workspace, or when storage is medium-to-long-term. Arkansas garages routinely hit <strong>120°F+ in summer</strong> and track <strong>70%+ outdoor humidity</strong> — conditions that warp wood furniture, crack leather, mildew mattresses, fade photos, and degrade electronics.</p><p>For tools, outdoor gear, plastic bins, and durable items that already live happily in a hot garage, the garage is fine. For furniture, electronics, photos, mattresses, instruments, lakehouse seasonal items, and anything stored more than a few months, self storage — particularly <a href="/climate-controlled">climate-controlled</a> — protects the contents and lets you reclaim the garage.</p><p><strong>Choose self storage over the garage when:</strong></p><ul><li>Storing furniture, electronics, photos, mattresses, instruments, or any humidity-sensitive items</li><li>Items will sit more than a few months</li><li>You want garage space back for vehicles or a workshop</li><li>Items have sentimental or significant resale value</li><li>You're between homes, downsizing, or renovating</li><li>Storing lakehouse seasonal items or business inventory</li></ul><p><strong>Keep using the garage when:</strong></p><ul><li>Storing tools, lawn equipment, or outdoor gear you grab often</li><li>Items live in sealed plastic bins for short periods</li><li>You have ample dry conditioned garage space</li><li>Items are headed to donation or disposal anyway</li><li>Storage is under 30 days</li></ul>`,
  },
  {
    q: 'Is a storage unit cheaper than expanding my garage?',
    a: `Yes — significantly cheaper, especially in the first several years. A garage addition or build-out in Arkansas typically runs $20,000 to $60,000+ depending on size, finish level, climate control, and permits. A climate-controlled storage unit at Modern Storage® runs about $110-$180 per month for a 10x10 (the most common size), which means you could rent for 9-10 years before matching the cost of a small garage addition. For most households, the storage need is temporary or seasonal anyway — between homes, renovation overflow, lakehouse storage, downsizing — and renting month-to-month at Modern Storage® avoids both the capital cost and the permanent footprint of a build-out. If you need permanent year-round expansion and the storage rental would exceed roughly $200/month long-term, a garage expansion may pencil eventually, but most situations don\'t reach that threshold.`,
  },
  {
    q: 'Will my garage damage furniture or electronics during Arkansas summer?',
    a: `Yes — over time. Arkansas garage interiors routinely exceed 110°F in direct summer sun, with 70%+ humidity tracking outdoor conditions. Those numbers gradually damage wood furniture (warping, cracked finishes), leather (drying, cracking), upholstered furniture (mildew), mattresses (absorbed moisture, internal mold growth), electronics (capacitor degradation, screen damage, corroded circuit boards), photos and documents (yellowing, curling, mildew), and musical instruments (cracked wood, warped joints). Damage is cumulative — a few weeks in summer is usually fine, but multi-month or multi-year garage storage of sensitive items adds up. Climate-controlled storage at Modern Storage® keeps the same items in a stable 59°F-79°F managed range, which prevents almost all of this damage.`,
  },
  {
    q: 'Can I park a car in a storage unit if my garage is full?',
    a: `Yes — Modern Storage® offers vehicle parking storage at select Arkansas locations. A 10x20 drive-up storage unit fits a typical car or motorcycle; a 10x30 fits a larger vehicle or a small boat. Outdoor parking spaces are available for vehicles you want stored under cover or behind a gate without occupying the unit floor. Vehicle storage frees up the home garage for an actively used workshop, secondary vehicle, or just a usable space again. See the boat, RV, and vehicle storage page for facility-by-facility availability. For collector cars or vehicles that need climate-controlled protection, indoor RV bays at Modern Storage® Shackleford in Little Rock are the closest fit.`,
  },
  {
    q: 'How much storage space do I actually need to clear out my garage?',
    a: `For an average 2-car garage of stored items (not vehicles), a 10x10 storage unit (100 sq ft, one-bedroom apartment equivalent) usually clears it out and leaves room for two cars again. For a packed 2-car garage with multiple bedroom sets, large appliances, and full-home overflow, a 10x15 or 10x20 is closer. For a 3-car garage or detached storage building consolidation, a 10x20 to 10x30 typically covers it. The AI Storage Size Finder runs the math in about 30 seconds based on what you're actually moving, and the size guide compares every Modern Storage® unit size with what fits.`,
  },
  {
    q: 'What if I only need storage temporarily during a move or renovation?',
    a: `Self storage is ideal for temporary needs. Modern Storage® rentals are month-to-month with no long-term contract, no minimum stay beyond the first month, and no early-termination fee. Most moves, renovations, and downsizing situations run 1-6 months — pay only for the months you actually need. The free moving truck program at participating Modern Storage® locations also helps with move-in if you need to consolidate from a garage or a previous home in one trip. See the move-out guide for the closeout process when your project wraps.`,
  },
  {
    q: 'Can I split storage between my garage and a self storage unit?',
    a: `Yes — that's exactly how most Modern Storage® household customers use the facility. Keep tools, lawn equipment, plastic bins, and outdoor gear in the garage where you grab them often. Move furniture, electronics, photos, mattresses, lakehouse seasonal items, and anything humidity-sensitive into climate-controlled storage. The home garage becomes a working space again, and the sensitive items get protected from Arkansas heat and humidity in a controlled environment.`,
  },
  {
    q: 'Is self storage safer than my garage from theft or damage?',
    a: `Self storage facilities have more dedicated security infrastructure than most home garages — Modern Storage® locations are gated with personal access codes per tenant, monitored by video surveillance, perimeter-fenced, exterior-lit, and have on-site management during business hours. Each unit has its own lock that only the tenant holds the key to. Home garages rely on the garage door, the home alarm, and the homeowner being present. For high-value items, business inventory, or anything you couldn't replace, self storage typically offers stronger protection. Insurance coverage applies at both — homeowners policy in the garage, tenant insurance or facility protection plan at storage.`,
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
        name: 'Self Storage vs Garage',
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
    headline: 'Self Storage vs Garage at Home: Which Should You Use?',
    description:
      'Honest side-by-side comparison of self storage and home garage storage for Arkansas households — when each one is the right call.',
    url: SITE_URL + PAGE_PATH,
    author: { '@id': SITE_URL + '/#organization' },
    publisher: { '@id': SITE_URL + '/#organization' },
    mainEntityOfPage: SITE_URL + PAGE_PATH,
  }
  return [breadcrumb, faqPage, article]
}

export default async function StorageVsGaragePage() {
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
              <li className="text-gray-300">Self Storage vs Garage</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
              Storage comparison
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Self Storage vs <span className="text-modern-red">Garage</span> at Home
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Your garage works fine for tools, lawn equipment, and outdoor gear. For furniture, electronics, photos, and anything humidity-sensitive sitting through an Arkansas summer (120°F+ garage interior, 70%+ humidity), self storage protects what the garage can&apos;t.
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
            <strong>Keep using the garage</strong> for tools, lawn equipment, plastic bins of durable goods, and outdoor gear you grab often. <strong>Use self storage</strong> for furniture, electronics, photos, mattresses, instruments, lakehouse seasonal items, business inventory, and anything you want to keep nice through Arkansas heat and humidity. Splitting between the two is normal — most Modern Storage® household customers do exactly that.
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
              Garage vs Self Storage — Side by Side
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Nine dimensions where the two formats differ. Numbers (humidity, temperature, prices) mirror{' '}
              <Link href="/climate-controlled" className="text-modern-red font-semibold hover:underline">
                climate-controlled storage
              </Link>
              {' '}and{' '}
              <Link href="/pricing" className="text-modern-red font-semibold hover:underline">
                pricing
              </Link>
              .
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
                        Home garage
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
                        {row.garage}
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
              Item by item
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              What Belongs in Each
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Most households split between the two. Tools and outdoor gear stay in the garage where they get used; furniture, electronics, and humidity-sensitive items go to storage where the climate stays stable.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Self storage column */}
            <div className="bg-white rounded-2xl p-7 border-2 border-modern-red shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-modern-red" aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-widest text-modern-red">
                  Storage wins
                </p>
              </div>
              <h3 className="font-black text-charcoal text-xl mb-5 leading-tight">
                Use self storage for
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

            {/* Garage column */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-gray-400" aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                  Garage wins
                </p>
              </div>
              <h3 className="font-black text-charcoal text-xl mb-5 leading-tight">
                Keep using the garage for
              </h3>
              <ul className="space-y-3">
                {GARAGE_WINS.map((entry) => (
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

      {/* ── ARKANSAS FACTOR ─────────────────────────────────────
          Same stat band as /climate-controlled-vs-standard for
          visual + numerical consistency. */}
      <section className="bg-white py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Arkansas factor
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
              Why Arkansas Garages Damage Sensitive Items
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Garages in cooler, drier states can store furniture and electronics indefinitely without much damage. Arkansas garages can&apos;t — and the climate is the reason. Summer humidity routinely tops 70%, heat indexes exceed 100°F from May through September, and attached garages with hot roof exposure regularly hit 120°F+ inside. Multi-year storage of sensitive items in those conditions adds up to warping, mildew, and component degradation that&apos;s usually permanent.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              <div className="bg-modern-red/5 rounded-2xl p-5 border border-modern-red/20 text-center">
                <p className="text-3xl lg:text-4xl font-bebas text-modern-red leading-none mb-2">70%+</p>
                <p className="text-xs font-bold text-charcoal uppercase tracking-wide">Summer humidity</p>
              </div>
              <div className="bg-modern-red/5 rounded-2xl p-5 border border-modern-red/20 text-center">
                <p className="text-3xl lg:text-4xl font-bebas text-modern-red leading-none mb-2">120°F+</p>
                <p className="text-xs font-bold text-charcoal uppercase tracking-wide">Summer garage interior</p>
              </div>
              <div className="bg-modern-red/5 rounded-2xl p-5 border border-modern-red/20 text-center">
                <p className="text-3xl lg:text-4xl font-bebas text-modern-red leading-none mb-2">40°F</p>
                <p className="text-xs font-bold text-charcoal uppercase tracking-wide">Single-day winter swing</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              See{' '}
              <Link href="/climate-controlled-vs-standard" className="text-modern-red font-semibold hover:underline">
                climate-controlled vs standard storage
              </Link>
              {' '}for the breakdown between Modern Storage® indoor (climate-controlled, 59°F-79°F managed) and outdoor (drive-up, garage-equivalent conditions) — climate-controlled handles humidity-sensitive items the way a home garage can&apos;t.
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
              Self Storage vs Garage — FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              The questions Arkansas homeowners ask most when deciding between the garage and self storage.
            </p>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Ready to reclaim your garage?
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Pick the Modern Storage® location closest to you, see live pricing for climate-controlled and drive-up units, and reserve online in minutes. Month-to-month rentals, no long-term contract.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Find a Location
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/ai-storage-size-finder"
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Find My Unit Size
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
