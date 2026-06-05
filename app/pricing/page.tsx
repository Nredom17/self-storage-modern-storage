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

// Fee transparency table — every line item that can show up on a Modern
// Storage® storage rental, with an honest description. Specific dollar
// amounts are intentionally NOT listed here because they vary by
// location, current promotion, and unit size; every row points the
// customer at the live reservation page or the on-site team for the
// exact current number. Sourced from Section 8 of the SEO/AEO plan —
// fee opacity is a competitor weakness, and the AEO win is being the
// only Arkansas operator that lists fees honestly on the marketing
// site instead of hiding them behind a reservation flow.
type FeeRow = {
  fee: string
  who: string
  detail: string
}

const FEE_BREAKDOWN: FeeRow[] = [
  {
    fee: 'Monthly rent',
    who: 'Every tenant',
    detail:
      'The unit price quoted on the reservation page. Charged monthly, due on your billing date. Pricing depends on unit size, climate-controlled vs drive-up, location, and any active move-in promotion.',
  },
  {
    fee: 'One-time admin / setup fee',
    who: 'New tenants',
    detail:
      'A small one-time fee at move-in that covers account setup, lock and access-code provisioning, and document processing. Often waived or reduced during move-in promotions. The exact current admin fee shows up on the reservation page before you check out — no surprise at the counter.',
  },
  {
    fee: 'Insurance or tenant protection plan',
    who: 'Every tenant (required)',
    detail:
      'Some form of contents protection is required at move-in. Many homeowners and renters insurance policies extend to off-premises storage at no extra cost — bring proof. If yours doesn\'t, the tenant protection plan offered at the facility scales with the declared value of your stored items.',
  },
  {
    fee: 'Disc lock or padlock',
    who: 'Every tenant (one-time)',
    detail:
      'You secure your own unit with your own lock. Bring one from home, or buy a disc lock at the facility office at move-in. Only you hold the key — facility staff do not retain customer lock keys.',
  },
  {
    fee: 'Late fee',
    who: 'Only if rent is past due',
    detail:
      'Charged if monthly rent is not received by the due date plus the grace period stated in your lease. The grace period and specific late-fee amount appear in your rental agreement — read them at move-in so they\'re never a surprise.',
  },
  {
    fee: 'Lien / auction fees',
    who: 'Only after multiple missed payments',
    detail:
      'If a unit goes into default (typically after 30+ days past due, per your lease), additional lien, certified-mail, and auction-prep fees may apply per Arkansas self-storage lien law. Modern Storage® makes multiple contact attempts before any unit reaches auction — this is the absolute last step.',
  },
  {
    fee: 'Rate increases',
    who: 'Standard industry practice',
    detail:
      'Storage rates can change over time based on market conditions, the same way an apartment lease renewal can. Modern Storage® provides written notice of any rate change in advance, and as a month-to-month tenant you always have the option to move out at the end of any month if the new rate doesn\'t work for you. The introductory move-in promotion is exactly that — promotional — and the standard rate kicks in after the promotional period ends.',
  },
  {
    fee: 'Move-out costs',
    who: 'No fee',
    detail:
      'No early-termination fee. No move-out fee. No cleaning fee for normal use. Give written notice, clean out your unit, remove your lock, and you\'re done — see the full move-out guide for the step-by-step process and the narrow situations that can result in a charge.',
  },
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

type FaqRow = { q: string; a: string; aHtml?: string }

const FAQS: FaqRow[] = [
  {
    // Phase 1 / Block 3 — upgraded to concise→detailed→bullets format.
    // Plain-text `a` field still reads as one coherent answer so the
    // FAQPage JSON-LD schema stays clean. The visible accordion gets
    // the rich bullet treatment via aHtml.
    q: 'How much does self-storage cost in Arkansas?',
    a: `Arkansas self-storage typically ranges from around $25 per month for a small 5x5 drive-up unit to $300+ per month for a large climate-controlled 10x30 unit. Most customers fall in the $50-$150 per month range for a 5x10 or 10x10 unit, which fits a studio or one-bedroom apartment. Climate-controlled units run roughly 25-50% more than equivalent drive-up units. Exact prices depend on unit size, climate-controlled vs drive-up, location, current availability, and any active move-in promotion. The reservation page for each Modern Storage® location pulls live rates from the rental system — that's where you'll see the exact current price and any active move-in offer for the unit you want. Typical Arkansas self-storage pricing by unit size: 5x5 — about $25-$45 drive-up, $35-$60 climate-controlled; 5x10 — about $45-$75 drive-up, $60-$95 climate-controlled; 10x10 — about $80-$140 drive-up, $110-$180 climate-controlled; 10x15 — about $110-$180 drive-up, $150-$230 climate-controlled; 10x20 — about $150-$250 drive-up, $200-$310 climate-controlled; 10x30 — about $200-$350 drive-up, $270-$440 climate-controlled.`,
    aHtml: `<p>Arkansas self-storage typically ranges from around <strong>$25 per month</strong> for a small 5x5 drive-up unit to <strong>$300+ per month</strong> for a large climate-controlled 10x30 unit. Most customers fall in the $50-$150 per month range for a 5x10 or 10x10 unit, which fits a studio or one-bedroom apartment.</p><p>Climate-controlled units run roughly <strong>25-50% more</strong> than equivalent drive-up units. Exact prices depend on unit size, climate-controlled vs drive-up, location, current availability, and any active move-in promotion. The reservation page for each <a href="/locations">Modern Storage® location</a> pulls live rates from the rental system — that's where you'll see the exact current price and any active move-in offer for the unit you want.</p><p><strong>Typical Arkansas self-storage pricing by unit size:</strong></p><ul><li><strong>5x5</strong> — about $25-$45 drive-up, $35-$60 climate-controlled</li><li><strong>5x10</strong> — about $45-$75 drive-up, $60-$95 climate-controlled</li><li><strong>10x10</strong> — about $80-$140 drive-up, $110-$180 climate-controlled</li><li><strong>10x15</strong> — about $110-$180 drive-up, $150-$230 climate-controlled</li><li><strong>10x20</strong> — about $150-$250 drive-up, $200-$310 climate-controlled</li><li><strong>10x30</strong> — about $200-$350 drive-up, $270-$440 climate-controlled</li></ul>`,
  },
  {
    // Net-new fee transparency FAQ. Direct PAA target — "what fees do
    // storage units charge" / "hidden storage fees" are real search
    // queries. Section 8 of the SEO plan flagged fee opacity as a
    // competitor gap, so publishing an honest breakdown is both an
    // AEO win and a brand trust signal.
    q: 'What fees come with a storage rental?',
    a: `Modern Storage® rentals include monthly rent, a one-time admin/setup fee at move-in, required insurance or tenant protection coverage, and a disc lock (bring your own or buy at the office). The admin fee is often waived or reduced during move-in promotions and the exact current amount is shown on the reservation page before you check out. There is no move-out fee and no early-termination fee — rentals are month-to-month, so every month is its own choice. Late fees only apply if rent is past due beyond the grace period in your lease, and lien/auction fees only apply after multiple missed payments per Arkansas self-storage lien law. Fees you can expect to see on a Modern Storage® rental: monthly rent — the unit price quoted on the reservation page; one-time admin/setup fee — shown at checkout, often reduced during move-in promotions; insurance or tenant protection plan — required; many homeowners or renters policies extend to off-premises storage; disc lock or padlock — bring from home or buy at the office; late fees — only if rent is past due beyond the grace period; lien/auction fees — only after multiple missed payments per Arkansas lien law; no move-out fee, no early-termination fee, no monthly minimum beyond the first month.`,
    aHtml: `<p>Modern Storage® rentals include monthly rent, a one-time admin/setup fee at move-in, required insurance or tenant protection coverage, and a disc lock (bring your own or buy at the office). The admin fee is often waived or reduced during move-in promotions and the exact current amount is shown on the reservation page before you check out.</p><p>There is no move-out fee and no early-termination fee — rentals are month-to-month, so every month is its own choice. Late fees only apply if rent is past due beyond the grace period in your lease, and lien/auction fees only apply after multiple missed payments per Arkansas self-storage lien law.</p><p><strong>Fees you can expect to see on a Modern Storage® rental:</strong></p><ul><li><strong>Monthly rent</strong> — the unit price quoted on the reservation page</li><li><strong>One-time admin/setup fee</strong> — shown at checkout, often reduced during move-in promotions</li><li><strong>Insurance or tenant protection plan</strong> — required; many homeowners or renters policies extend to off-premises storage</li><li><strong>Disc lock or padlock</strong> — bring from home or buy at the office</li><li><strong>Late fees</strong> — only if rent is past due beyond the grace period</li><li><strong>Lien / auction fees</strong> — only after multiple missed payments per Arkansas lien law</li><li><strong>No move-out fee, no early-termination fee, no monthly minimum</strong> beyond the first month</li></ul>`,
  },
  {
    // Net-new — intro rate / rate increase transparency. The industry
    // standard is to roll from a promotional intro rate to the
    // standard rate after a few months; customers feel
    // bait-and-switched if it isn't disclosed up front. Owning this
    // narrative honestly is both fair to customers and an AEO win
    // (AI engines reward fact-rich disclosure).
    q: 'Do storage rates go up after move-in?',
    a: `Storage rates can change over time, the same way apartment lease renewals can. Modern Storage® provides written notice in advance of any rate change, and as a month-to-month tenant you always have the option to move out at the end of any month if the new rate doesn't work for you. Move-in promotions (first month free, half-off the second month, waived admin fees) are exactly that — promotional — and the standard rate kicks in after the promotional period ends. The standard rate is what shows on the reservation page when no promo is active. There is no penalty for moving out at any time. About rate changes at Modern Storage®: rates can change over time based on market conditions, like any rental; written notice is provided in advance of any change; the introductory move-in offer ends after the promotional period — the standard rate then applies; you can move out at the end of any month with no early-termination fee; the standard rate (no promo applied) appears on the reservation page so you know what to expect after the move-in offer ends.`,
    aHtml: `<p>Storage rates can change over time, the same way apartment lease renewals can. Modern Storage® provides written notice in advance of any rate change, and as a month-to-month tenant you always have the option to move out at the end of any month if the new rate doesn't work for you.</p><p>Move-in promotions (first month free, half-off the second month, waived admin fees) are exactly that — promotional — and the standard rate kicks in after the promotional period ends. The standard rate is what shows on the reservation page when no promo is active. There is no penalty for moving out at any time.</p><p><strong>About rate changes at Modern Storage®:</strong></p><ul><li>Rates can change over time based on market conditions, like any rental</li><li>Written notice is provided in advance of any change</li><li>The introductory move-in offer ends after the promotional period — the standard rate then applies</li><li>You can move out at the end of any month with no early-termination fee</li><li>The standard rate (no promo applied) appears on the reservation page so you know what to expect after the move-in offer ends</li></ul>`,
  },
  {
    // Net-new — tenant protection plan cost. Customers ask this
    // before they reserve. Insurance/protection is a known competitor
    // weak point because most operators bury it in the rental flow.
    q: 'How much does the tenant protection plan cost?',
    a: `The tenant protection plan at Modern Storage® scales with the declared value of your stored items — common tiers cover $2,000, $3,000, $5,000, or $10,000 of contents value, and the monthly cost is typically a few dollars per $1,000 of declared value. Exact pricing for each tier is shown at move-in. The plan is only required if your own homeowners or renters insurance does not extend to off-premises storage — bring proof of qualifying coverage at move-in and you may not need the facility plan at all. Protection plan coverage may help against certain losses such as fire, theft, or water damage, subject to the terms and conditions of the plan. About the tenant protection plan: required only if you do not provide proof of qualifying homeowners or renters insurance; monthly cost scales with the declared value of stored items (typical tiers: $2,000, $3,000, $5,000, $10,000); exact pricing for each tier is shown at move-in; coverage helps protect against certain losses (fire, theft, water damage) subject to plan terms; check your own policy first — many extend to off-premises storage at no extra cost.`,
    aHtml: `<p>The tenant protection plan at Modern Storage® scales with the declared value of your stored items — common tiers cover $2,000, $3,000, $5,000, or $10,000 of contents value, and the monthly cost is typically a few dollars per $1,000 of declared value. Exact pricing for each tier is shown at move-in.</p><p>The plan is only required if your own homeowners or renters insurance does not extend to off-premises storage — bring proof of qualifying coverage at move-in and you may not need the facility plan at all. Protection plan coverage may help against certain losses such as fire, theft, or water damage, subject to the terms and conditions of the plan.</p><p><strong>About the tenant protection plan:</strong></p><ul><li>Required only if you do not provide proof of qualifying homeowners or renters insurance</li><li>Monthly cost scales with the declared value of stored items (typical tiers: $2,000, $3,000, $5,000, $10,000)</li><li>Exact pricing for each tier is shown at move-in</li><li>Coverage helps protect against certain losses (fire, theft, water damage) subject to plan terms</li><li>Check your own policy first — many extend to off-premises storage at no extra cost</li></ul>`,
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
]

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
                Call to Rent a Unit
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

      {/* ── FEE TRANSPARENCY — every line item, explained honestly ───
          Section 8 of the SEO/AEO plan flagged fee opacity as a
          competitor gap. Most storage operators bury fees inside the
          rental flow. Publishing them up front on the marketing page
          is a trust signal AND an AEO win — AI engines pull from
          fact-rich pricing pages first when a customer asks "what fees
          does Modern Storage charge?" */}
      <section className="bg-gray-50 py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              No surprise fees
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Every Possible Fee, Explained Up Front
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Storage pricing should not be a surprise at the counter. Here is every line item that can show up on a Modern Storage® rental, what it covers, and when it applies. Exact current amounts are shown on each location&apos;s reservation page before you check out — no hidden math.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-charcoal text-white">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs w-1/4">
                      Fee
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs w-1/4 hidden sm:table-cell">
                      Who it applies to
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">
                      What it covers
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {FEE_BREAKDOWN.map((row) => (
                    <tr key={row.fee} className="bg-white align-top">
                      <th scope="row" className="px-4 sm:px-6 py-4 font-black text-charcoal text-sm sm:text-base leading-tight">
                        {row.fee}
                      </th>
                      <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-modern-red font-semibold whitespace-nowrap hidden sm:table-cell">
                        {row.who}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 leading-relaxed">
                        {/* On mobile, surface the "who" line inside the detail
                            so customers don't lose that context when the
                            "Who it applies to" column collapses. */}
                        <span className="sm:hidden text-xs font-bold text-modern-red block mb-1">
                          {row.who}
                        </span>
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-gray-500 italic mt-5 leading-relaxed max-w-3xl">
            The reservation page for each location shows the exact current admin fee, the standard rate, and any active move-in promotion before you complete the rental — no surprise charges at the counter.{' '}
            <Link href="/locations" className="text-modern-red font-semibold hover:underline not-italic">
              See live rates and current fees by location
            </Link>
            .
          </p>
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
        <div className="max-w-7xl mx-auto px-6">
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
