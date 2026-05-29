import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/climate-controlled-arkansas-humidity'
const HERO_IMAGE = '/images/modern-storage-bentonville-climate-controlled-hallway.jpg'
const HERO_ALT =
  'Indoor climate-controlled storage hallway at Modern Storage® — designed for Arkansas humidity and summer heat'

export const metadata: Metadata = {
  title: {
    absolute: 'Climate-Controlled Storage for Arkansas Humidity | Modern Storage®',
  },
  description:
    'How Arkansas humidity damages stored belongings — and why climate-controlled storage is the safer choice. Heat indexes, monthly humidity averages, garage and attic temperatures, and what goes wrong if you skip indoor storage.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Climate-Controlled Storage for Arkansas Humidity | Modern Storage®',
    description:
      'How Arkansas humidity damages stored belongings and why climate-controlled storage protects furniture, electronics, photos, and long-term storage.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Climate-Controlled Storage for Arkansas Humidity | Modern Storage®',
    description:
      'Why Arkansas humidity makes climate-controlled storage the smart choice.',
    images: [HERO_IMAGE],
  },
}

const MONTHLY_HUMIDITY = [
  { month: 'January',   high: 86, low: 62, note: 'Cool but very damp mornings — condensation risk on cool indoor surfaces.' },
  { month: 'April',     high: 88, low: 56, note: 'Spring storms drive humidity spikes; outdoor unit interiors stay damp.' },
  { month: 'July',      high: 91, low: 65, note: 'Peak combined heat + humidity. Garages and outdoor units routinely 100°F+.' },
  { month: 'September', high: 90, low: 60, note: 'Tail end of summer — accumulated humidity damage builds in non-conditioned storage.' },
  { month: 'November',  high: 89, low: 64, note: 'Cool air can\'t hold as much moisture, but indoor garages still cycle wet/dry.' },
]

const DAMAGE_BY_ITEM = [
  {
    title: 'Wood furniture & antiques',
    body:
      'Humidity above 60% causes wood to absorb moisture, swell, and warp. Glue joints fail, drawer faces stick, and finishes crack along grain lines. Repeated swelling cycles permanently weaken furniture structure.',
  },
  {
    title: 'Leather',
    body:
      'Leather absorbs moisture and grows surface mildew in damp storage. Sustained humidity above 65% causes irreversible spotting and odor. Climate-controlled storage keeps couches, jackets, and bags in wearable condition.',
  },
  {
    title: 'Mattresses & upholstery',
    body:
      'Foam and fabric absorb moisture from humid air. Even a few weeks in a hot Arkansas garage can leave a mattress smelling musty or growing mold inside the layers — and you usually can\'t fix it after the fact.',
  },
  {
    title: 'Electronics',
    body:
      'Humidity condenses inside sealed devices when temperatures swing. Capacitors corrode, solder joints fatigue, and screens fog. TVs, computers, audio gear, and gaming systems should always go in climate-controlled storage.',
  },
  {
    title: 'Photos, documents & books',
    body:
      'Paper absorbs moisture, curls, yellows, and grows mildew at humidity above 55%. Family photos fade and stick together. Books grow foxing spots on pages. Important documents become unreadable. Indoor storage prevents all of it.',
  },
  {
    title: 'Musical instruments',
    body:
      'Guitars, pianos, and brass instruments require stable humidity (40-60%) and temperature to stay tuned and structurally sound. Outdoor and garage storage will warp wood, fail glue joints, and tarnish metal.',
  },
] as const

const TEMP_COMPARISON = [
  { space: 'Arkansas attic in July',           range: '120°F – 150°F', risk: 'Almost guaranteed damage to anything heat-sensitive.' },
  { space: 'Outdoor storage unit in July',     range: '105°F – 125°F', risk: 'High risk for electronics, photos, wood furniture.' },
  { space: 'Garage in July',                   range: '95°F – 115°F',  risk: 'Damaging over weeks; severe damage over months.' },
  { space: 'Garage in January',                range: '20°F – 50°F',   risk: 'Freeze cycles crack finishes and damage electronics.' },
  { space: 'Climate-controlled at Modern Storage®', range: '59°F – 79°F', risk: 'Safe for furniture, electronics, photos, long-term storage.' },
]

const FAQS = [
  {
    q: 'How humid does it get in Arkansas?',
    a: `Arkansas summer humidity routinely runs between 70% and 90% — among the highest in the country outside of coastal regions. Summer dewpoints frequently exceed 70°F, which is the threshold where outdoor air feels oppressive and where humidity inside a non-conditioned storage space becomes damaging to stored items. Even non-summer months see humidity highs above 80% on most days.`,
  },
  {
    q: 'Does humidity really damage stored items that much?',
    a: `Yes — humidity is actually a bigger threat to most stored belongings than temperature alone. Sustained humidity above 60% will warp wood furniture, mildew leather, fog electronics, yellow paper, and grow mold on fabric and mattresses. The longer items sit in a humid environment, the worse the cumulative damage. A few months in a hot garage during an Arkansas summer is enough to ruin furniture, photos, and electronics.`,
  },
  {
    q: 'What temperature do climate-controlled storage units stay at?',
    a: `Climate-controlled storage units at Modern Storage® stay within a managed indoor range of approximately 59°F to 79°F year-round. That range is well within the safe zone for wood, leather, paper, fabric, electronics, and other commonly stored items. By comparison, an Arkansas garage can swing from 20°F in January to 115°F in July — a range no household item is designed for.`,
  },
  {
    q: 'Is climate-controlled storage worth the extra cost in Arkansas?',
    a: `For anything you\'d hesitate to leave in a hot garage, yes. The price difference between drive-up and climate-controlled at Modern Storage® is small compared to replacement cost of damaged furniture, ruined electronics, or lost family photos. For tools, plastic bins, and durable garage-type items, drive-up storage is fine. For furniture, electronics, mattresses, photos, instruments, and long-term storage of household items, climate-controlled pays for itself the first time you avoid damage.`,
  },
  {
    q: 'Will my garage or attic protect my stuff in summer?',
    a: `No. Arkansas garages routinely hit 110-115°F in July and August, and attics run even hotter — often 130-150°F. Both spaces also experience large humidity swings as they heat and cool through the day, which is exactly the condition that condenses moisture inside electronics and warps wood. If you wouldn\'t leave it in your car all summer, don\'t leave it in your garage or attic either.`,
  },
  {
    q: 'How does Modern Storage® manage humidity in climate-controlled buildings?',
    a: `Modern Storage® climate-controlled buildings use insulation and HVAC systems to maintain a stable indoor environment year-round. The temperature management indirectly reduces humidity by keeping the air conditioned — warm air holds more moisture, so a cooler indoor space stays drier. Specific system details vary by facility, but the day-to-day humidity inside a climate-controlled unit is far lower than outside.`,
  },
  {
    q: 'Where can I find climate-controlled storage in Arkansas?',
    a: `Most Modern Storage® locations across Arkansas offer climate-controlled storage, including facilities in Little Rock (Shackleford, Riverdale), West Little Rock, North Little Rock (North Hills, Maumelle Blvd), Bentonville, Springdale, Lowell, Bryant, and Hot Springs. See the climate-controlled storage page or the locations finder to filter by climate-controlled availability near you.`,
  },
] as const

function buildJsonLd(phoneDisplay: string) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': SITE_URL + PAGE_PATH + '#article',
    headline: 'Climate-Controlled Storage for Arkansas Humidity',
    description:
      'How Arkansas humidity damages stored belongings — and why climate-controlled storage is the right protection.',
    image: SITE_URL + HERO_IMAGE,
    author: { '@type': 'Organization', name: 'Modern Storage®' },
    publisher: {
      '@type': 'Organization',
      name: 'Modern Storage®',
      url: SITE_URL + '/',
      telephone: phoneDisplay,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL + PAGE_PATH },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Climate-Controlled Storage', item: SITE_URL + '/climate-controlled' },
      { '@type': 'ListItem', position: 3, name: 'For Arkansas Humidity', item: SITE_URL + PAGE_PATH },
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

export default async function HumidityPage() {
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
              <li><Link href="/climate-controlled" className="hover:text-modern-red transition-colors">Climate-Controlled</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Arkansas Humidity</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Regional storage guide
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Climate-Controlled Storage for <span className="text-modern-red">Arkansas Humidity</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
                Arkansas humidity is the reason climate-controlled storage exists. Heat indexes above 100°F, summer dewpoints in the 70s, attics that hit 150°F — and the cumulative damage that does to anything stored in a garage or outdoor unit. Here\'s what actually goes wrong, and how indoor storage prevents it.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/climate-controlled" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                  See Climate-Controlled Storage
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
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
                Indoor climate-controlled storage at Modern Storage® — built for Arkansas summer humidity.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Quick-answer summary — lives high on the page so AI Overviews,
          Perplexity, and ChatGPT can extract the load-bearing facts
          without scrolling. Every claim here is defensible to public
          climate data (NWS) or already published on the site. */}
      <section className="bg-modern-red/5 border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Quick answer</p>
          <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-4">
            Why climate-controlled storage matters in Arkansas
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Arkansas summer humidity routinely runs <strong>70–90%</strong>, with attic temperatures of <strong>120–150°F</strong> and garages of <strong>100–115°F</strong> in July — conditions that warp wood furniture, mildew leather and fabric, fade photos, and fog electronics over a single season. Climate-controlled storage at Modern Storage® keeps belongings in an indoor range of roughly <strong>59°F to 79°F</strong> year-round, well within the safe zone for furniture, electronics, photos, instruments, and long-term household storage.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <li className="bg-white rounded-xl p-4 border border-gray-200">
              <strong className="block text-charcoal mb-1">Summer humidity</strong>
              Typically 70–90% in Arkansas; dew points routinely 70°F+
            </li>
            <li className="bg-white rounded-xl p-4 border border-gray-200">
              <strong className="block text-charcoal mb-1">Attic in July</strong>
              120–150°F — too hot for nearly anything stored
            </li>
            <li className="bg-white rounded-xl p-4 border border-gray-200">
              <strong className="block text-charcoal mb-1">Garage / outdoor unit in July</strong>
              100–125°F with daily humidity swings
            </li>
            <li className="bg-white rounded-xl p-4 border border-gray-200">
              <strong className="block text-charcoal mb-1">Climate-controlled (Modern Storage®)</strong>
              Approximately 59°F to 79°F year-round
            </li>
            <li className="bg-white rounded-xl p-4 border border-gray-200">
              <strong className="block text-charcoal mb-1">Most at risk</strong>
              Wood furniture, leather, mattresses, electronics, photos, books, instruments
            </li>
            <li className="bg-white rounded-xl p-4 border border-gray-200">
              <strong className="block text-charcoal mb-1">Damage threshold</strong>
              Sustained humidity above 60% causes wood swelling and mildew
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">By month</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Arkansas Humidity Throughout the Year
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Arkansas humidity is high year-round — not just in summer. These are typical monthly humidity high/low percentages and how each season affects items stored in a non-climate-controlled space.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Month</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">High humidity</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Low humidity</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Impact on storage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {MONTHLY_HUMIDITY.map((m) => (
                  <tr key={m.month} className="bg-white">
                    <th scope="row" className="px-4 sm:px-6 py-4 font-semibold text-charcoal align-top">{m.month}</th>
                    <td className="px-4 sm:px-6 py-4 text-charcoal align-top font-semibold">{m.high}%</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 align-top">{m.low}%</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-700 align-top">{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic mt-4 max-w-3xl">
            Approximate monthly averages across the Little Rock and Northwest Arkansas regions. Actual conditions vary by year and location.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">What goes wrong</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              What Arkansas Humidity Does to Stored Items
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Each category of household belongings reacts differently to sustained humidity. Here\'s what tends to fail first in a non-climate-controlled space, and why <Link href="/climate-controlled" className="text-modern-red font-semibold hover:underline">indoor climate-controlled storage</Link> protects against each.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DAMAGE_BY_ITEM.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl p-6 border border-gray-200 transition-colors">
                <h3 className="font-black text-charcoal mb-2 leading-tight">{d.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Temperature comparison</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              Garage vs. Attic vs. Climate-Controlled
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Where you store something matters more than how. Here\'s the temperature range your belongings actually experience in five common Arkansas storage environments.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-white/10">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs text-gray-400">Storage space</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs text-modern-red">Temperature range</th>
                  <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs text-gray-400">Damage risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {TEMP_COMPARISON.map((t) => (
                  <tr key={t.space}>
                    <th scope="row" className="px-4 sm:px-6 py-4 font-semibold text-white align-top">{t.space}</th>
                    <td className="px-4 sm:px-6 py-4 text-white font-semibold align-top">{t.range}</td>
                    <td className="px-4 sm:px-6 py-4 text-gray-400 align-top">{t.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FIND CLIMATE-CONTROLLED STORAGE BY LOCATION ────────
          Inbound contextual links to specific facility pages — keeps
          this guide tied into the local SEO layer and gives weak
          location pages (Bryant, Hot Springs, Springdale, NLR,
          Maumelle) direct inbound link equity from a topic page. */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Where to reserve
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Find Climate-Controlled Storage at These Arkansas Locations
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Most Modern Storage® locations offer indoor climate-controlled units to protect belongings from Arkansas humidity and heat. Pick the facility nearest you — each page shows live unit availability, climate-controlled sizes, and a reserve-online link.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/locations/bentonville" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Northwest Arkansas</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Bentonville</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled and ground-floor business storage in south Bentonville.</p>
            </Link>
            <Link href="/locations/springdale" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Northwest Arkansas</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Springdale</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled and drive-up storage on the Hwy 412 / I-49 corridor.</p>
            </Link>
            <Link href="/locations/lowell" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Northwest Arkansas</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Lowell</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled, business, and boat/RV storage on I-49.</p>
            </Link>
            <Link href="/locations/north-little-rock" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">North Little Rock</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® North Little Rock</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled, drive-up, and business storage near McCain Mall.</p>
            </Link>
            <Link href="/locations/maumelle" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">North Little Rock</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Maumelle Blvd</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled units and boat/RV storage on Hwy 100.</p>
            </Link>
            <Link href="/locations/bryant" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Saline County</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Bryant</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled, drive-up, and boat/RV along the I-30 corridor.</p>
            </Link>
            <Link href="/locations/hot-springs" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Hot Springs</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Hot Springs</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled storage for Lake Hamilton and Hot Springs Village residents.</p>
            </Link>
            <Link href="/locations/shackleford" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Little Rock</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Shackleford</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled and drive-up storage just south of I-630.</p>
            </Link>
            <Link href="/locations/west-little-rock" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Little Rock</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® West Little Rock</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled and drive-up units near Chenal and I-430.</p>
            </Link>
            <Link href="/locations/riverdale" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Little Rock</p>
              <h3 className="font-black text-charcoal leading-tight group-hover:text-modern-red transition-colors">Modern Storage® Riverdale</h3>
              <p className="text-sm text-gray-600 mt-1">Climate-controlled and business storage on Cantrell Rd, near downtown.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Arkansas Humidity &amp; Storage FAQ
            </h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Skip the Humidity Damage. Reserve Climate-Controlled Storage.
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Climate-controlled storage at Modern Storage® keeps belongings in a stable indoor range (~59°F to 79°F) year-round — far below the temperatures and humidity of an Arkansas garage or attic.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/climate-controlled" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              See Climate-Controlled Options
            </Link>
            <Link href="/locations" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              Find a Nearby Location
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
