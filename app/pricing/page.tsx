import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/pricing'

export const metadata: Metadata = {
  title: {
    absolute: 'Self Storage Prices in Arkansas — Unit Sizes & Rates | Modern Storage®',
  },
  description:
    'Self storage pricing in Arkansas by unit size — 5x5 through 10x30, climate-controlled vs drive-up, what affects rates, and how to see live prices for any Modern Storage® location. Reserve online to lock in current move-in offers.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Self Storage Prices in Arkansas | Modern Storage®',
    description:
      'Self storage pricing by unit size, climate-controlled vs drive-up premium, and what affects rates in Arkansas. Reserve online for live rates.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Self Storage Prices in Arkansas | Modern Storage®',
    description: 'Pricing by unit size, climate-controlled vs drive-up, and what affects storage rates.',
  },
}

// Starting-at ranges. Intentionally hedged — these are typical Arkansas
// market ranges based on operator industry data. Live rates vary by
// facility, unit availability, current move-in promotions, and season.
// Every CTA on this page funnels customers to the live reservation page
// for the specific location they want.
type SizeRow = {
  size: string
  sqft: string
  fits: string
  driveUp: string
  climate: string
}

const SIZE_PRICING: SizeRow[] = [
  { size: '5x5',   sqft: '25 sq ft',  fits: 'Closet overflow, seasonal items, dorm boxes',                            driveUp: '$25 – $45',   climate: '$35 – $60' },
  { size: '5x10',  sqft: '50 sq ft',  fits: 'Studio apartment, single bedroom, college storage',                       driveUp: '$45 – $75',   climate: '$60 – $95' },
  { size: '10x10', sqft: '100 sq ft', fits: 'One-bedroom apartment, 15-20 boxes plus furniture',                       driveUp: '$80 – $140',  climate: '$110 – $180' },
  { size: '10x15', sqft: '150 sq ft', fits: 'Two-bedroom home, renovation storage',                                    driveUp: '$110 – $180', climate: '$150 – $230' },
  { size: '10x20', sqft: '200 sq ft', fits: 'Three-bedroom home, business inventory, full-home move',                  driveUp: '$150 – $250', climate: '$200 – $310' },
  { size: '10x30', sqft: '300 sq ft', fits: 'Four to five-bedroom home, garage contents, e-commerce inventory',        driveUp: '$200 – $350', climate: '$270 – $440' },
]

const PRICING_FACTORS = [
  {
    title: 'Unit size',
    body:
      'The biggest single factor. A 10x10 (100 sq ft) is typically ~2× the price of a 5x10 (50 sq ft). Match the unit to what you actually need — paying for empty space costs more long-term than upsizing later if you outgrow it.',
  },
  {
    title: 'Climate-controlled vs drive-up',
    body:
      'Climate-controlled units run roughly 25-50% more than equivalent drive-up units. Worth it for furniture, electronics, photos, mattresses, and long-term storage. Drive-up makes sense for tools, plastic bins, and durable items.',
  },
  {
    title: 'Location',
    body:
      'High-demand metros (Bentonville, west Little Rock) price slightly higher than smaller markets (Bryant, Hot Springs). Lake-area units (Maumelle Blvd for Lake Maumelle) reflect the seasonal demand premium.',
  },
  {
    title: 'Season & current demand',
    body:
      'Late spring and summer are peak moving season — prices firm up and move-in specials shorten. Fall and winter typically see the strongest promotional offers. Reserve early in peak season to lock in current rates.',
  },
  {
    title: 'Move-in offers & promotions',
    body:
      'Most facilities run rotating new-customer promotions — first month free, half-off the second month, waived admin fees. These shift monthly. The reservation page for each location shows the current offer.',
  },
  {
    title: 'Insurance / protection plan',
    body:
      'Some form of contents protection is required. Many homeowners and renters policies extend to off-premises storage at no extra cost. If yours doesn\'t, Modern Storage® offers an affordable tenant protection plan — usually a few dollars per $1,000 of declared value.',
  },
] as const

const FAQS = [
  {
    q: 'How much does self-storage cost in Arkansas?',
    a: `Arkansas self-storage typically ranges from around $25/month for a small 5x5 drive-up unit to $300+/month for a large climate-controlled 10x30 unit. Most customers fall in the $50-150/month range for a 5x10 or 10x10 unit. Exact prices vary by Modern Storage® facility, unit availability, current move-in promotions, and season. The reservation page for each location shows live rates.`,
  },
  {
    q: 'Why does Modern Storage® not list exact prices on this page?',
    a: `Unit pricing changes constantly based on facility-level availability, current promotions, and demand cycles. Listing fixed prices on a marketing page would be out of date within weeks and would either understate or overstate what customers actually pay. The reservation page for each Modern Storage® location pulls live rates from the rental system — that's where you'll see the exact current price and any active move-in offer for the unit you want.`,
  },
  {
    q: 'Is climate-controlled storage worth the extra cost?',
    a: `For furniture, electronics, photos, mattresses, leather, instruments, and anything stored long-term — yes. The roughly 25-50% premium is small compared to repair or replacement cost of items damaged by Arkansas summer humidity. For tools, plastic bins, patio furniture, and durable items that already live in a hot garage, standard drive-up storage is the more affordable choice. See the climate-controlled storage page for the full breakdown.`,
  },
  {
    q: 'What unit size should I rent to keep cost down?',
    a: `Match the unit to what you're actually storing — don't pay for empty space. A 5x10 (50 sq ft) covers a studio or single bedroom. A 10x10 (100 sq ft) fits a one-bedroom apartment. A 10x15 (150 sq ft) handles a two-bedroom home. Use the AI Storage Size Finder for a personalized recommendation in under 30 seconds, or see the full size guide.`,
  },
  {
    q: 'Are there cheaper storage options at certain Modern Storage® locations?',
    a: `Pricing varies modestly by Arkansas market. Bryant, Hot Springs, and Lowell typically price slightly lower than Bentonville and west Little Rock metros. Drive-up units are cheaper than climate-controlled at every location. To compare, open the reservation page for two or three nearby Modern Storage® locations side-by-side and check the current rates for the unit size you want.`,
  },
  {
    q: 'Are move-in specials available?',
    a: `Yes. Most Modern Storage® locations rotate new-customer promotions throughout the year — first month free, half-off the second month, waived admin fees, or similar. The specific offer changes monthly and varies by facility. The current offer for each location appears on its reservation page. Peak fall and winter promotions are typically the strongest.`,
  },
  {
    q: 'Can I get a free moving truck at Modern Storage® rates?',
    a: `Yes — Modern Storage® offers a free moving truck with new storage rentals at participating Arkansas locations. The truck rental itself has no fee; you just pay for the fuel you used (full tank in, full tank out). Truck availability, mileage limits, and participation vary by facility. The truck offer doesn't change the storage unit price — it's an included move-in benefit on top of the standard rate.`,
  },
  {
    q: 'How do I get the most accurate quote?',
    a: `Pick the Modern Storage® location closest to where you'll be storing, click "See Available Units," and review live rates for the size you want. The reservation page shows the exact current price plus any active move-in offer. You can also call 501-910-0096 and the team will walk through current pricing and availability across multiple locations if you're flexible on which facility.`,
  },
] as const

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Self Storage Pricing in Arkansas',
    name: 'Self Storage Prices in Arkansas — Modern Storage® Unit Sizes & Rates',
    description:
      'Self storage pricing in Arkansas by unit size. Starting-at ranges for 5x5 through 10x30 units, climate-controlled vs drive-up premium, and what affects storage rates. Live rates available on each Modern Storage® location reservation page.',
    url: SITE_URL + PAGE_PATH,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    provider: { '@id': SITE_URL + '/#organization' },
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: SITE_URL + PAGE_PATH },
    ],
  }
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [service, breadcrumb, faqPage]
}

export default async function PricingPage() {
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
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Pricing</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
              Pricing
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Self Storage <span className="text-modern-red">Prices</span> in Arkansas
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Starting-at ranges by unit size, climate-controlled vs drive-up premium, and what affects storage rates at Modern Storage® Arkansas locations. <strong className="text-white">Live rates and current move-in offers appear on each location&apos;s reservation page</strong> — open the closest location to see exact pricing for the unit you want.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/locations" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                See Live Rates by Location
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/ai-storage-size-finder" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                Find My Unit Size
              </Link>
              <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                Call for New Rentals
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE — drive-up vs climate-controlled ranges ────── */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">By unit size</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Self Storage Price Ranges by Unit Size
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Typical monthly starting-at ranges for Modern Storage® Arkansas locations. <strong>Drive-up</strong> means outdoor unit doors you can pull a vehicle up to. <strong>Climate-controlled</strong> means indoor units inside an enclosed insulated building. Both formats are available at most Modern Storage® locations.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base">
                <thead className="bg-charcoal text-white">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Size</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs hidden sm:table-cell">Square ft</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs hidden lg:table-cell">What fits</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Drive-up / mo</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs whitespace-nowrap">Climate-controlled / mo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {SIZE_PRICING.map((row) => (
                    <tr key={row.size} className="bg-white">
                      <th scope="row" className="px-4 sm:px-6 py-4 font-bebas text-3xl sm:text-4xl text-charcoal leading-none align-middle">{row.size}</th>
                      <td className="px-4 sm:px-6 py-4 text-gray-700 align-middle whitespace-nowrap hidden sm:table-cell">{row.sqft}</td>
                      <td className="px-4 sm:px-6 py-4 text-gray-700 align-middle hidden lg:table-cell">{row.fits}</td>
                      <td className="px-4 sm:px-6 py-4 text-gray-700 align-middle font-semibold whitespace-nowrap">{row.driveUp}</td>
                      <td className="px-4 sm:px-6 py-4 text-modern-red align-middle font-bold whitespace-nowrap">{row.climate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hedge / disclaimer — important for trust */}
          <p className="text-xs text-gray-500 italic mt-5 leading-relaxed max-w-3xl">
            Ranges are typical Modern Storage® Arkansas starting points based on industry data. Exact prices vary by location, unit availability, current move-in promotions, and season. <Link href="/locations" className="text-modern-red font-semibold hover:underline not-italic">See live rates on the reservation page</Link> for the specific Modern Storage® location and unit size you want.
          </p>
        </div>
      </section>

      {/* ── CLIMATE VS DRIVE-UP — the premium explained ─────────────── */}
      <section className="bg-gray-50 py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Climate vs drive-up premium</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Why Climate-Controlled Costs More
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Climate-controlled units typically run roughly <strong>25-50% more</strong> per month than equivalent drive-up units. The extra cost reflects the enclosed, insulated, year-round-conditioned building they sit inside. For sensitive items, the math usually favors paying the premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-modern-red rounded-2xl p-7 shadow-lg">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Climate-controlled is worth the premium for</p>
              <h3 className="text-xl font-black text-charcoal mb-4 leading-tight">Sensitive items + long-term storage</h3>
              <ul className="space-y-2.5">
                {['Wood and leather furniture', 'Electronics, TVs, computers', 'Mattresses and upholstery', 'Family photos and documents', 'Musical instruments, vinyl, wine', 'Anything stored more than ~3 months'].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-charcoal">
                    <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mt-5 leading-relaxed">
                Repair or replacement cost of furniture, electronics, and photos damaged by Arkansas summer humidity dwarfs the climate-controlled premium. See <Link href="/climate-controlled-arkansas-humidity" className="text-modern-red font-semibold hover:underline">why climate-controlled storage matters in Arkansas humidity</Link>.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Drive-up is the better-priced choice for</p>
              <h3 className="text-xl font-black text-charcoal mb-4 leading-tight">Durable items + short-term storage</h3>
              <ul className="space-y-2.5">
                {['Tools, lawn equipment, outdoor gear', 'Plastic storage bins', 'Patio furniture and grills', 'Garage and basement overflow', 'Sports equipment (durable)', 'Short-term storage during a quick move'].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-charcoal">
                    <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mt-5 leading-relaxed">
                If items already live happily in a hot garage, drive-up storage is the right call. Pull the vehicle right up to the unit door, load and unload directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT AFFECTS PRICING ───────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">What moves the price</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              What Affects Storage Pricing in Arkansas
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Six factors shape what you actually pay for self-storage in Arkansas. Understanding them helps you pick the right unit and time your reservation for the best rate.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRICING_FACTORS.map((f) => (
              <div key={f.title} className="bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 transition-colors">
                <h3 className="font-black text-charcoal mb-2 leading-tight">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEE LIVE PRICES BY LOCATION ────────────────────────────── */}
      <section className="bg-charcoal text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Live rates</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              See Current Prices for the Modern Storage® Location You Want
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              The starting-at ranges above are typical. Exact current pricing — including any active move-in offer — appears on each location&apos;s reservation page. Pick the location closest to where you&apos;ll store and click through to live rates.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { slug: 'shackleford',       label: 'Little Rock (Shackleford)' },
              { slug: 'west-little-rock',  label: 'West Little Rock' },
              { slug: 'riverdale',         label: 'Little Rock (Riverdale)' },
              { slug: 'north-little-rock', label: 'North Little Rock' },
              { slug: 'maumelle',          label: 'Maumelle Blvd' },
              { slug: 'bryant',            label: 'Bryant' },
              { slug: 'hot-springs',       label: 'Hot Springs' },
              { slug: 'bentonville',       label: 'Bentonville' },
              { slug: 'springdale',        label: 'Springdale' },
              { slug: 'lowell',            label: 'Lowell' },
            ].map((l) => (
              <Link key={l.slug} href={`/locations/${l.slug}`} className="group bg-white/5 hover:bg-white/10 hover:border-modern-red rounded-xl p-4 border border-white/10 transition-all flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-white group-hover:text-modern-red transition-colors">{l.label}</span>
                <svg className="w-4 h-4 text-modern-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">Self Storage Pricing FAQ</h2>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Reserve Your Unit and Lock in Current Pricing
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Live rates and current move-in offers on every Modern Storage® location reservation page. Pick the closest location, choose a size, and reserve online in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/locations" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Find a Location
            </Link>
            <Link href="/ai-storage-size-finder" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              Find My Unit Size
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
