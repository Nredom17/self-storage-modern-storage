import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'
import AIStorageSizeFinder from './AIStorageSizeFinder'

export const revalidate = 60

const PAGE_PATH = '/ai-storage-size-finder'

export const metadata: Metadata = {
  title: { absolute: 'AI Storage Size Finder | Modern Storage® Unit Size Guide' },
  description:
    'Use the Modern Storage® AI Storage Size Finder to estimate the right storage unit size for furniture, boxes, apartment moves, homes, and business inventory.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'AI Storage Size Finder | Modern Storage®',
    description:
      'Find the right Modern Storage® unit size in under 30 seconds. Get a personalized recommendation based on your home, apartment, business inventory, or major items.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Storage Size Finder | Modern Storage®',
    description:
      'Find the right Modern Storage® unit size in under 30 seconds.',
  },
}

const UNIT_SIZE_GUIDE = [
  {
    size: '5x5',
    title: '5x5 Storage Unit',
    body: 'Best for boxes, seasonal décor, small furniture, and closet overflow.',
    href: '/climate-controlled#size-5x5',
  },
  {
    size: '5x10',
    title: '5x10 Storage Unit',
    body: 'Best for dorm rooms, studio apartments, and small furniture.',
    href: '/climate-controlled#size-5x10',
  },
  {
    size: '10x10',
    title: '10x10 Storage Unit',
    body: 'Best for one-bedroom apartments or several rooms of furniture.',
    href: '/climate-controlled#size-10x10',
  },
  {
    size: '10x15',
    title: '10x15 Storage Unit',
    body: 'Best for two-bedroom apartments or small homes.',
    href: '/climate-controlled#size-10x15',
  },
  {
    size: '10x20',
    title: '10x20 Storage Unit',
    body: 'Best for full homes, vehicles, or larger moves.',
    href: '/climate-controlled#size-10x20',
  },
] as const

const FINDER_FAQS = [
  {
    q: 'What size storage unit do I need?',
    a: `The right storage unit size depends on where you are moving from, how much you plan to store, and any large items like beds, sofas, or appliances. A studio or dorm room typically fits in a 5x10 unit, a one-bedroom apartment usually fits in a 10x10, and a full home usually needs a 10x20 or larger. The Modern Storage® AI Storage Size Finder above estimates the right size for you in under 30 seconds.`,
  },
  {
    q: 'How much can fit in a 10x10 storage unit?',
    a: `A 10x10 storage unit holds about 800 cubic feet — typically the contents of a one-bedroom apartment or two to three rooms of furniture. That usually includes a bedroom set, a living room set with a couch and chairs, major appliances or a TV, and 15-20 standard moving boxes. The exact fit depends on how tightly you pack, which the AI Storage Size Finder accounts for.`,
  },
  {
    q: 'Is a 5x10 storage unit big enough for a studio apartment?',
    a: `Yes, a 5x10 storage unit fits most studio apartments — about 400 cubic feet of space. That usually holds a mattress set, a small sofa or loveseat, a dresser, a few chairs, and roughly 10-15 boxes. If you also have a king bed, a sectional, or many bins from a packed studio, the AI Storage Size Finder may step you up to a 10x10 for breathing room.`,
  },
  {
    q: 'Should I choose a larger storage unit if my items barely fit?',
    a: `Yes. When the AI Storage Size Finder confidence meter shows 85% or higher, the fit is technically possible but tight, which makes loading slower and retrieval frustrating. Stepping up to the next size — for example 10x10 to 10x15 — typically costs only a little more and gives you walking room inside the unit, easier access to items in the back, and space to add more later.`,
  },
  {
    q: 'Can I use this tool for business inventory?',
    a: `Yes. Choose Business Inventory in step one, then pick a density that matches how packed your stock is. The Modern Storage® AI Storage Size Finder will recommend a unit size based on a typical inventory load, and Modern Storage® Riverdale plus other locations offer mini-warehouse business storage with loading dock access, electricity in select units, and 24/7 access at participating sites.`,
  },
] as const

function buildJsonLd(phoneDisplay: string) {
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FINDER_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'AI Storage Size Finder', item: SITE_URL + PAGE_PATH },
    ],
  }

  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': SITE_URL + PAGE_PATH + '#webapp',
    name: 'Modern Storage® AI Storage Size Finder',
    url: SITE_URL + PAGE_PATH,
    description:
      'Free tool that recommends the right Modern Storage® unit size based on living situation, density of belongings, and major items to store.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: {
      '@type': 'SelfStorage',
      name: 'Modern Storage®',
      url: SITE_URL + '/',
      telephone: phoneDisplay,
      areaServed: { '@type': 'State', name: 'Arkansas' },
    },
  }

  return [webApp, faqPage, breadcrumb]
}

export default async function AIStorageSizeFinderPage() {
  const settings = await getSiteSettings()
  const jsonLd = buildJsonLd(settings.phoneDisplay)
  const PHONE_NUMBER_DISPLAY = settings.phoneDisplay
  const PHONE_NUMBER_HREF = settings.phoneHref

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
        <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">AI Storage Size Finder</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
              AI-powered size guide
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              AI Storage Size Finder
            </h1>
            <p className="text-2xl lg:text-3xl font-bold text-gray-200 mb-8 leading-tight">
              Find the right Modern Storage® unit size in under 30 seconds.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Not sure what size storage unit you need? Use the Modern Storage® AI Storage Size Finder to estimate the best unit size for your home, apartment, business inventory, furniture, boxes, or seasonal items. Answer a few quick questions and get a recommended storage unit size before you reserve.
            </p>
          </div>
        </div>
      </section>

      {/* ── TOOL ─────────────────────────────────────────────── */}
      <section id="tool" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AIStorageSizeFinder />
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">How it works</p>
          <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
            How Our Storage Size Finder Works
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The AI Storage Size Finder estimates how much storage space you may need based on where you are moving from, how much you plan to store, and any large items you want to include. It then recommends a unit size and shows whether the fit may be comfortable or tight.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: '1', t: 'Pick your situation', b: 'Studio, 1-bedroom, full house, office, business inventory — pick what fits.' },
              { n: '2', t: 'Tell us the density', b: 'Lightly packed, normally packed, or tight to the gills — be honest.' },
              { n: '3', t: 'Get your best fit', b: 'See your recommended Modern Storage® unit, a confidence meter, and a step-up option if your fit is tight.' },
            ].map((s) => (
              <div key={s.n} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="font-bebas text-5xl text-modern-red leading-none mb-3">{s.n}</div>
                <h3 className="font-black text-charcoal text-lg mb-2 leading-tight">{s.t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIT SIZE GUIDE ──────────────────────────────────── */}
      <section id="size-guide" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Storage unit size guide</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Storage Unit Size Guide
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A quick reference for the most-requested Modern Storage® unit sizes. Click any size to see the full breakdown on the climate-controlled storage page — what fits, who it suits, and how to reserve.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {UNIT_SIZE_GUIDE.map((u) => (
              <Link
                key={u.size}
                href={u.href}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
              >
                <span className="font-bebas text-6xl lg:text-7xl text-charcoal leading-none mb-3">{u.size}</span>
                <h3 className="font-black text-charcoal text-lg mb-2 leading-tight group-hover:text-modern-red transition-colors">
                  {u.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{u.body}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-modern-red mt-4">
                  See {u.size} details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED STORAGE OPTIONS ─────────────────────────── */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Related Modern Storage® pages</p>
          <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-8">
            Keep Browsing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/move-in-checklist" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Checklist</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Move-In Checklist →</p>
            </Link>
            <Link href="/#locations" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Locations</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Storage locations across Arkansas →</p>
            </Link>
            <Link href="/climate-controlled" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Climate-Controlled</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Climate-controlled storage →</p>
            </Link>
            <Link href="/household-storage" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Household</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Household storage at 10 locations →</p>
            </Link>
            <Link href="/rv-boat-vehicle" className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Boat & RV</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Boat, RV & vehicle storage →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Common questions about choosing the right storage unit size, what fits in each unit, and how to use the Modern Storage® AI Storage Size Finder for home, apartment, or business storage.
            </p>
          </div>
          <FaqAccordion items={FINDER_FAQS} />
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Ready to Find Your Storage Unit?
          </h2>
          <p className="text-red-100 text-lg mb-3 max-w-2xl mx-auto leading-relaxed">
            Use the AI Storage Size Finder, then reserve the recommended size at a Modern Storage® location near you.
          </p>
          <p className="text-red-100/80 text-sm mb-10 max-w-2xl mx-auto leading-relaxed">
            Available at Modern Storage® locations in Little Rock, North Little Rock, Bentonville, Bryant, Hot Springs, Maumelle, Springdale, Lowell, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#tool"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Find My Size
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/#locations"
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              See All Locations
            </Link>
            <a
              href={PHONE_NUMBER_HREF}
              className="bg-white/10 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/20 transition-colors text-sm border border-white/30 inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
              </svg>
              Call {PHONE_NUMBER_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
