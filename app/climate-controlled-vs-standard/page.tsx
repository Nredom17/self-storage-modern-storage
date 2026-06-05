// Climate-Controlled vs Standard Storage — Phase 3 SEO/AEO
// comparison pillar page.
//
// Targets the single highest-volume comparison search in
// self-storage: "climate-controlled vs standard storage", "is
// climate-controlled storage worth it", "do I need climate-
// controlled". Designed as a one-stop decision page — side-by-side
// table, decision-by-item lists, cost comparison, Arkansas-specific
// context, full FAQ. Pulls from the humidity / temperature data we
// already added in Phase 1 (/climate-controlled + /pricing) so the
// numbers stay consistent across the site.

import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/climate-controlled-vs-standard'

export const metadata: Metadata = {
  title: {
    absolute: 'Climate-Controlled vs Standard Storage: Which Should You Choose? | Modern Storage®',
  },
  description:
    'Climate-controlled storage runs ~25–50% more than standard drive-up storage. Climate-controlled is the right call for furniture, electronics, photos, instruments, and long-term storage. Standard drive-up works for tools, plastic bins, and durable items. Honest side-by-side comparison from Modern Storage®.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Climate-Controlled vs Standard Storage | Modern Storage®',
    description:
      'Honest side-by-side comparison of climate-controlled and standard drive-up storage — when to pay the premium and when standard is fine.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Climate-Controlled vs Standard Storage | Modern Storage®',
    description: 'When climate-controlled is worth it and when standard drive-up works fine.',
  },
}

// ── Side-by-side comparison rows. Each row is one dimension where
// the two formats differ; numbers and language mirror /climate-
// controlled and /pricing so the site stays self-consistent. ───────
type CompareRow = {
  dimension: string
  climate: string
  standard: string
}

const COMPARE_ROWS: CompareRow[] = [
  {
    dimension: 'Access',
    climate: 'Indoor hallways inside an enclosed, conditioned building',
    standard: 'Outdoor drive-up door — pull a vehicle or trailer to the unit',
  },
  {
    dimension: 'Temperature',
    climate: 'Managed indoor range, roughly 59°F – 79°F year-round',
    standard: 'Same as outdoor temperature — 110°F+ in Arkansas summer sun',
  },
  {
    dimension: 'Humidity exposure',
    climate: 'Reduced through enclosed indoor space + HVAC',
    standard: 'Full outdoor humidity (70%+ in Arkansas summer)',
  },
  {
    dimension: 'Best for',
    climate: 'Furniture, electronics, photos, instruments, long-term storage',
    standard: 'Tools, lawn equipment, plastic bins, patio furniture, short-term',
  },
  {
    dimension: 'Storage duration',
    climate: 'Excellent for long-term, year-round, multi-month storage',
    standard: 'Best for short-term moves and frequent-access items',
  },
  {
    dimension: 'Loading in bad weather',
    climate: 'Indoor — stays dry, no rain or snow exposure',
    standard: 'Outdoor — load and unload in whatever weather the day brings',
  },
  {
    dimension: 'Dust, pollen, pests',
    climate: 'Lower exposure — enclosed indoor environment',
    standard: 'Higher exposure — outdoor air, dust, pollen, insects',
  },
  {
    dimension: 'Cost',
    climate: 'Higher monthly rate (about 25–50% more)',
    standard: 'Lower monthly rate — the most affordable storage format',
  },
  {
    dimension: 'Typical price (10x10)',
    climate: '$110 – $180 per month in Arkansas',
    standard: '$80 – $140 per month in Arkansas',
  },
]

// ── Decision lists. Direct answer to "do I need climate-controlled".
type DecisionList = {
  title: string
  intro: string
  items: { item: string; reason: string }[]
}

const CHOOSE_CLIMATE: DecisionList = {
  title: 'Choose climate-controlled storage for',
  intro:
    'Sensitive items that lose value, warp, mildew, or crack when exposed to Arkansas heat and humidity.',
  items: [
    {
      item: 'Wood and leather furniture, antiques',
      reason: 'Wood swells and cracks; leather dries and grows mildew above ~70% humidity.',
    },
    {
      item: 'Electronics — TVs, computers, gaming systems',
      reason: 'Heat degrades capacitors and screens; humidity corrodes circuit boards.',
    },
    {
      item: 'Mattresses, bedding, upholstered furniture',
      reason: 'Mattresses absorb humidity and grow mold internally during long-term storage.',
    },
    {
      item: 'Family photos, documents, books, art',
      reason: 'Paper yellows, curls, and grows mold above ~70% humidity.',
    },
    {
      item: 'Musical instruments, vinyl, wine, collectibles',
      reason: 'Wood instruments crack; vinyl warps; wine spoils; trading cards damage permanently.',
    },
    {
      item: 'Clothing — wool, leather, silk, seasonal',
      reason: 'Fabrics absorb humidity, mildew, and develop musty odors.',
    },
    {
      item: 'Anything stored more than 3 months',
      reason: 'Cumulative damage from heat and humidity builds the longer items sit.',
    },
    {
      item: 'Business inventory, samples, records',
      reason: 'Inventory needs to arrive saleable; paper records need stable indoor conditions.',
    },
  ],
}

const CHOOSE_STANDARD: DecisionList = {
  title: 'Standard drive-up storage is fine for',
  intro:
    'Durable items that already tolerate temperature swings — they live happily in a hot garage today.',
  items: [
    {
      item: 'Garden tools, lawn equipment, outdoor gear',
      reason: 'Built for outdoor weather already; no benefit from climate control.',
    },
    {
      item: 'Patio furniture, grills, outdoor decor',
      reason: 'Designed for outdoor use; survives temperature swings without damage.',
    },
    {
      item: 'Plastic storage bins and totes',
      reason: 'Plastic tolerates heat well; contents inside stay isolated from humidity.',
    },
    {
      item: 'Durable sports equipment',
      reason: 'Metal, plastic, and hard goods (bikes, kayaks, golf bags) hold up fine.',
    },
    {
      item: 'Garage and basement overflow',
      reason: 'Items that already tolerated garage conditions transfer over cleanly.',
    },
    {
      item: 'Construction tools, trade supplies',
      reason: 'Tools live in trucks and garages already — drive-up access is faster anyway.',
    },
    {
      item: 'Short-term storage during a quick move',
      reason: 'Less than 30 days of exposure rarely causes meaningful damage.',
    },
    {
      item: 'Anything currently stored in a hot garage',
      reason: 'If garage conditions haven\'t damaged it yet, drive-up storage won\'t either.',
    },
  ],
}

// ── FAQs. Concise→detailed→bullets format for AEO extraction.
type FaqRow = { q: string; a: string; aHtml?: string }

const FAQS: FaqRow[] = [
  {
    q: 'What is the difference between climate-controlled and standard storage?',
    a: `Climate-controlled storage is indoor and temperature-regulated — at Modern Storage® managed within a roughly 59°F to 79°F range year-round. Standard drive-up storage is outdoor and exposed to whatever the weather is doing that day. Climate-controlled units sit inside an enclosed, insulated, HVAC-conditioned building, accessed from interior hallways. Standard drive-up units have an outdoor garage-style door you can pull a vehicle or trailer directly up to. Climate-controlled runs about 25-50% more per month, but protects furniture, electronics, photos, and anything humidity-sensitive. Standard drive-up is faster for loading heavy items and more affordable for durable goods. Climate-controlled vs standard storage at Modern Storage®: climate-controlled — indoor hallways, 59-79°F managed range, reduced humidity; standard — outdoor drive-up door, outside temperature, full humidity; climate-controlled best for — furniture, electronics, photos, instruments, long-term storage; standard best for — tools, lawn equipment, plastic bins, patio furniture, short-term; climate-controlled costs — about 25-50% more per month; loading bad weather — climate-controlled stays dry, standard is exposed; access speed — standard is faster (drive right up), climate-controlled requires walking from hallway entry.`,
    aHtml: `<p>Climate-controlled storage is indoor and temperature-regulated — at Modern Storage® managed within a roughly <strong>59°F to 79°F range</strong> year-round. Standard drive-up storage is outdoor and exposed to whatever the weather is doing that day.</p><p>Climate-controlled units sit inside an enclosed, insulated, HVAC-conditioned building, accessed from interior hallways. Standard drive-up units have an outdoor garage-style door you can pull a vehicle or trailer directly up to.</p><p><strong>Side-by-side comparison:</strong></p><ul><li><strong>Climate-controlled</strong> — indoor hallways, 59-79°F managed range, reduced humidity</li><li><strong>Standard</strong> — outdoor drive-up door, outside temperature, full humidity</li><li><strong>Best for climate-controlled</strong> — furniture, electronics, photos, instruments, long-term storage</li><li><strong>Best for standard</strong> — tools, lawn equipment, plastic bins, patio furniture, short-term</li><li><strong>Cost</strong> — climate-controlled runs about 25-50% more per month</li><li><strong>Loading in bad weather</strong> — climate-controlled stays dry, standard is exposed</li><li><strong>Access speed</strong> — standard is faster (drive right up); climate-controlled requires walking from a hallway entry</li></ul>`,
  },
  {
    q: 'Is climate-controlled storage worth the extra cost?',
    a: `For furniture, electronics, photos, instruments, mattresses, leather goods, business inventory, and any items stored more than three months — yes, climate-controlled storage is worth the roughly 25-50% premium. The cost of repair or replacement for items damaged by Arkansas summer humidity (70%+) and 110°F+ outdoor unit temperatures dwarfs the price difference. A single warped wood dresser, mildewed mattress, or fried TV is more than a year of the climate-controlled premium. For tools, plastic bins, patio furniture, and durable items that already live happily in a hot garage, climate-controlled is overkill — standard drive-up is the right call. When climate-controlled is worth the premium: storing more than a few months at a time; any item with sentimental, irreplaceable, or significant resale value; anything wood, leather, fabric, or paper-based; electronics, photos, instruments, wine, vinyl, collectibles; mattresses, upholstered furniture, antiques; Arkansas-specific situations — homes without garage space, lakehouse seasonal storage, business inventory. When standard drive-up is fine: tools, lawn equipment, outdoor sports gear; patio furniture and grills; plastic storage bins; short-term moves (less than ~60 days); items that already live in a hot garage with no damage.`,
    aHtml: `<p>For furniture, electronics, photos, instruments, mattresses, leather goods, business inventory, and any items stored more than three months — <strong>yes, climate-controlled storage is worth the roughly 25-50% premium</strong>. The cost of repair or replacement for items damaged by Arkansas summer humidity (70%+) and 110°F+ outdoor unit temperatures dwarfs the price difference.</p><p>A single warped wood dresser, mildewed mattress, or fried TV is more than a year of the climate-controlled premium. For tools, plastic bins, patio furniture, and durable items that already live happily in a hot garage, climate-controlled is overkill — standard drive-up is the right call.</p><p><strong>Climate-controlled is worth the premium when:</strong></p><ul><li>Storing more than a few months at a time</li><li>Any item with sentimental, irreplaceable, or significant resale value</li><li>Anything wood, leather, fabric, or paper-based</li><li>Electronics, photos, instruments, wine, vinyl, collectibles</li><li>Mattresses, upholstered furniture, antiques</li><li>Arkansas-specific situations — homes without garage space, lakehouse seasonal storage, business inventory</li></ul><p><strong>Standard drive-up is fine when:</strong></p><ul><li>Storing tools, lawn equipment, outdoor sports gear</li><li>Patio furniture, grills, outdoor decor</li><li>Plastic storage bins and totes</li><li>Short-term moves (less than ~60 days)</li><li>Items that already live in a hot garage with no damage</li></ul>`,
  },
  {
    q: 'How much more does climate-controlled storage cost?',
    a: `Climate-controlled storage at Modern Storage® typically costs about 25-50% more per month than equivalent standard drive-up units. For a 10x10 unit (one-bedroom apartment), that works out to roughly $80-$140 per month standard vs $110-$180 per month climate-controlled. For a 5x10 (studio apartment), standard runs about $45-$75 and climate-controlled is $60-$95. The premium reflects the cost of operating an enclosed, insulated, HVAC-conditioned building year-round. Exact pricing varies by location, current move-in offers, and unit availability — every Modern Storage® location's reservation page shows live rates for both formats so you can compare at the specific facility you'd rent from. Typical Arkansas pricing — climate-controlled vs standard drive-up: 5x5 — standard $25-$45, climate-controlled $35-$60; 5x10 — standard $45-$75, climate-controlled $60-$95; 10x10 — standard $80-$140, climate-controlled $110-$180; 10x15 — standard $110-$180, climate-controlled $150-$230; 10x20 — standard $150-$250, climate-controlled $200-$310; 10x30 — standard $200-$350, climate-controlled $270-$440.`,
    aHtml: `<p>Climate-controlled storage at Modern Storage® typically costs about <strong>25-50% more per month</strong> than equivalent standard drive-up units. For a 10x10 unit (one-bedroom apartment), that works out to roughly <strong>$80-$140 per month standard vs $110-$180 per month climate-controlled</strong>. For a 5x10 (studio apartment), standard runs about $45-$75 and climate-controlled is $60-$95.</p><p>The premium reflects the cost of operating an enclosed, insulated, HVAC-conditioned building year-round. Exact pricing varies by location, current move-in offers, and unit availability — every <a href="/locations">Modern Storage® location's reservation page</a> shows live rates for both formats so you can compare at the specific facility you'd rent from.</p><p><strong>Typical Arkansas pricing — standard drive-up vs climate-controlled:</strong></p><ul><li><strong>5x5</strong> — standard $25-$45, climate-controlled $35-$60</li><li><strong>5x10</strong> — standard $45-$75, climate-controlled $60-$95</li><li><strong>10x10</strong> — standard $80-$140, climate-controlled $110-$180</li><li><strong>10x15</strong> — standard $110-$180, climate-controlled $150-$230</li><li><strong>10x20</strong> — standard $150-$250, climate-controlled $200-$310</li><li><strong>10x30</strong> — standard $200-$350, climate-controlled $270-$440</li></ul>`,
  },
  {
    q: 'Can I store furniture in a non-climate-controlled storage unit?',
    a: `Yes — most furniture can be stored in a standard non-climate-controlled drive-up storage unit, but solid wood, leather, upholstered, antique, and electronics-containing pieces are safer in climate-controlled storage. Standard drive-up units in Arkansas track outdoor temperature and humidity, which over months can warp wood, crack leather, fade fabric, and encourage mildew. For short-term storage of one to three months, or for sturdier furniture like metal frames, plastic outdoor furniture, and flat-pack pieces, a drive-up unit is usually fine. For long-term storage, mattresses, leather couches, hardwood dressers, pianos, and pieces with sentimental or resale value, choose a climate-controlled unit at Modern Storage®.`,
  },
  {
    q: 'Will my items get damaged in standard storage during Arkansas summer?',
    a: `It depends on what you're storing and how long. Standard drive-up storage units in Arkansas track outdoor conditions — summer interior temperatures can hit 110°F+ in direct sun and humidity routinely exceeds 70%. Durable items (tools, plastic bins, patio furniture, garage overflow) handle those conditions fine, the same way they do in a hot home garage. Sensitive items (furniture, electronics, mattresses, photos, leather, instruments) accumulate damage from heat and humidity the longer they're stored — warping, mildew, fade, and component degradation build up over months. For sensitive items or anything stored long-term in Arkansas, climate-controlled storage is the protective choice. For durable items or short-term storage, standard drive-up is usually safe.`,
  },
  {
    q: 'Is climate-controlled storage necessary for short-term storage?',
    a: `For storage under about 60 days, climate-controlled is rarely necessary unless you're storing through peak Arkansas summer with humidity-sensitive items (wood furniture, leather, photos, electronics). Most short-term storage situations — apartment moves, between leases, home renovations — work fine with standard drive-up. Drive-up units are also faster to load and unload during a move because you can park right at the door. If your short-term storage will span July-September and includes sensitive items, climate-controlled becomes worth the upgrade.`,
  },
  {
    q: 'Can I switch from standard to climate-controlled later?',
    a: `Yes. Modern Storage® rentals are month-to-month, and if you start in a standard drive-up unit and decide you want climate-controlled (or vice versa), the team can transfer you to an available unit at the same facility. There's no early-termination fee, you only pay rent at the new format from the transfer date forward. Call your local Modern Storage® facility before your next billing date to coordinate the swap and confirm climate-controlled availability in the size you want.`,
  },
  {
    q: 'Do all Modern Storage® locations offer both climate-controlled and standard storage?',
    a: `Every Modern Storage® location across Arkansas offers climate-controlled storage. Most locations also offer standard drive-up access; specific availability of each format and unit size varies by facility. The fastest way to confirm both options at the location nearest you is the live reservation page for that facility, which shows current pricing and availability for every unit type. See the locations page to pick yours.`,
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
        name: 'Climate-Controlled vs Standard Storage',
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
    headline: 'Climate-Controlled vs Standard Storage: Which Should You Choose?',
    description:
      'Side-by-side comparison of climate-controlled and standard drive-up storage — when the climate-controlled premium is worth it and when standard drive-up is fine.',
    url: SITE_URL + PAGE_PATH,
    author: { '@id': SITE_URL + '/#organization' },
    publisher: { '@id': SITE_URL + '/#organization' },
    mainEntityOfPage: SITE_URL + PAGE_PATH,
  }
  return [breadcrumb, faqPage, article]
}

export default async function ClimateVsStandardPage() {
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
              <li className="text-gray-300">Climate-Controlled vs Standard</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
              Storage comparison
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              <span className="text-modern-red">Climate-Controlled</span> vs Standard Storage
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Climate-controlled storage runs about 25-50% more per month than standard drive-up. Worth the premium for furniture, electronics, photos, and long-term storage; overkill for tools, plastic bins, and short-term moves. Here&apos;s the honest, item-by-item breakdown.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER ─────────────────────────────────────────
          Answer-first aside so AI extractors and customers get the
          one-line verdict without scrolling. */}
      <section className="bg-modern-red/5 py-10 border-b border-modern-red/20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
            Quick answer
          </p>
          <p className="text-charcoal text-lg leading-relaxed">
            <strong>Climate-controlled storage is worth the ~25-50% premium</strong> for furniture, electronics, photos, mattresses, instruments, business inventory, and any items stored more than 3 months. <strong>Standard drive-up storage is the better choice</strong> for tools, plastic bins, patio furniture, durable items, and short-term storage of items already living happily in a hot garage.
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
              Climate-Controlled vs Standard — Side by Side
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Nine dimensions where the two formats differ at a Modern Storage® Arkansas location. Prices mirror the{' '}
              <Link href="/pricing" className="text-modern-red font-semibold hover:underline">
                pricing guide
              </Link>
              .
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-charcoal text-white">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs w-1/4">
                      Dimension
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-modern-red" aria-hidden="true" />
                        Climate-controlled
                      </span>
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-gray-400" aria-hidden="true" />
                        Standard drive-up
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
                        {row.climate}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 leading-relaxed">
                        {row.standard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── DECISION LISTS — by item ────────────────────────────
          Answers "do I need climate-controlled for X" head-on. */}
      <section className="bg-gray-50 py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Item by item
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              What Belongs in Which
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The rule of thumb: if you&apos;d hesitate to leave it in a hot garage for a year, climate-controlled is the safer choice. If it already lives happily in your garage today, standard drive-up storage will treat it the same way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Climate-controlled column */}
            <div className="bg-white rounded-2xl p-7 border-2 border-modern-red shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-modern-red" aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-widest text-modern-red">
                  Recommended
                </p>
              </div>
              <h3 className="font-black text-charcoal text-xl mb-3 leading-tight">
                {CHOOSE_CLIMATE.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-5">{CHOOSE_CLIMATE.intro}</p>
              <ul className="space-y-3">
                {CHOOSE_CLIMATE.items.map((entry) => (
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

            {/* Standard column */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-gray-400" aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                  More affordable
                </p>
              </div>
              <h3 className="font-black text-charcoal text-xl mb-3 leading-tight">
                {CHOOSE_STANDARD.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-5">{CHOOSE_STANDARD.intro}</p>
              <ul className="space-y-3">
                {CHOOSE_STANDARD.items.map((entry) => (
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

      {/* ── ARKANSAS CONTEXT — humidity callout ──────────────────
          Differentiator a national operator can't write
          authentically. Cross-links to /climate-controlled-
          arkansas-humidity for the deeper humidity explainer. */}
      <section className="bg-white py-16 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Arkansas factor
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
              Why This Matters More in Arkansas
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The climate-controlled vs standard decision plays out differently here than in cooler, drier states. Arkansas summer humidity routinely exceeds 70%, heat indexes top 100°F from May through September, and standard outdoor storage units track those conditions inside the unit. For sensitive items stored more than a few weeks, climate-controlled is a meaningfully bigger upgrade in Arkansas than it would be in, say, Denver or Phoenix.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              <div className="bg-modern-red/5 rounded-2xl p-5 border border-modern-red/20 text-center">
                <p className="text-3xl lg:text-4xl font-bebas text-modern-red leading-none mb-2">70%+</p>
                <p className="text-xs font-bold text-charcoal uppercase tracking-wide">Summer humidity</p>
              </div>
              <div className="bg-modern-red/5 rounded-2xl p-5 border border-modern-red/20 text-center">
                <p className="text-3xl lg:text-4xl font-bebas text-modern-red leading-none mb-2">110°F+</p>
                <p className="text-xs font-bold text-charcoal uppercase tracking-wide">Outdoor unit temps</p>
              </div>
              <div className="bg-modern-red/5 rounded-2xl p-5 border border-modern-red/20 text-center">
                <p className="text-3xl lg:text-4xl font-bebas text-modern-red leading-none mb-2">40°F</p>
                <p className="text-xs font-bold text-charcoal uppercase tracking-wide">Single-day winter swing</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              See{' '}
              <Link href="/climate-controlled-arkansas-humidity" className="text-modern-red font-semibold hover:underline">
                why climate-controlled storage matters in Arkansas humidity
              </Link>
              {' '}for the deeper regional breakdown — what humidity actually does to wood, leather, photos, and electronics.
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
              Climate-Controlled vs Standard — FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              The questions Modern Storage® customers ask most when picking between climate-controlled and standard drive-up storage.
            </p>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Compare both formats at your nearest Modern Storage® location
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Every Modern Storage® location offers climate-controlled storage; most also offer drive-up. Open your nearest facility&apos;s reservation page for live pricing on both formats so you can pick the right fit.
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
