import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import { SIZE_GUIDE_UNITS, SIZE_GUIDE_FAQS } from '@/lib/size-guide'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/size-guide'

export const metadata: Metadata = {
  title: {
    absolute: 'Storage Unit Size Guide — 5x5 to 10x30 | Modern Storage®',
  },
  description:
    'What size storage unit do you need? Compare 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 storage units at Modern Storage®. See what fits, square footage, room equivalents, and common use cases.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Unit Size Guide — 5x5 to 10x30 | Modern Storage®',
    description:
      'Compare storage unit sizes at Modern Storage® — 5x5 to 10x30. Square footage, what fits, room equivalents, and common use cases for every size.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Storage Unit Size Guide | Modern Storage®',
    description: 'Compare 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 storage units at Modern Storage®.',
  },
}

function buildJsonLd() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Size Guide', item: SITE_URL + PAGE_PATH },
    ],
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Modern Storage® Unit Sizes',
    itemListElement: SIZE_GUIDE_UNITS.map((u, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: SITE_URL + PAGE_PATH + '#size-' + u.sizeSlug,
      item: {
        '@type': 'Service',
        name: `${u.size} Storage Unit`,
        description: `${u.bestFor}. ${u.sqft} — equivalent to a ${u.roomEquivalent.toLowerCase()}.`,
      },
    })),
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SIZE_GUIDE_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [breadcrumb, itemList, faqPage]
}

export default async function SizeGuidePage() {
  const settings = await getSiteSettings()
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
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Size Guide</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
              Storage Unit Size Guide
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              What Size <span className="text-modern-red">Storage Unit</span> Do You Need?
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl">
              Compare every Modern Storage® unit size from 5x5 to 10x30 — square footage, room equivalents, what actually fits, and common reasons people rent that size. Still not sure? Use the AI Size Finder for a personalized recommendation in 30 seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/ai-storage-size-finder"
                className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-7 py-3.5 rounded-full transition-colors text-sm"
              >
                Try the AI Size Finder
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors border border-white/20 text-sm"
              >
                Find a Unit Near You
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ───────────────────────────────── */}
      <section className="bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              At a glance
            </p>
            <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight">
              Storage Unit Size Comparison
            </h2>
          </div>
          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-charcoal text-white">
                <tr>
                  <th scope="col" className="text-left p-4 font-black uppercase tracking-wider text-xs">Size</th>
                  <th scope="col" className="text-left p-4 font-black uppercase tracking-wider text-xs">Square feet</th>
                  <th scope="col" className="text-left p-4 font-black uppercase tracking-wider text-xs">Room equivalent</th>
                  <th scope="col" className="text-left p-4 font-black uppercase tracking-wider text-xs">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SIZE_GUIDE_UNITS.map((u) => (
                  <tr key={u.size} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bebas text-2xl text-charcoal">{u.size}</td>
                    <td className="p-4 text-charcoal font-semibold">{u.sqft}</td>
                    <td className="p-4 text-gray-600">{u.roomEquivalent}</td>
                    <td className="p-4 text-gray-600">{u.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── PER-SIZE DETAIL CARDS ─────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Detailed breakdown
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                Every Storage Unit Size, Side by Side
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Each Modern Storage® unit size, what fits inside, and the situations customers most often choose it for.
              </p>
            </div>
            <Link
              href="/ai-storage-size-finder"
              className="inline-flex items-center gap-2 text-sm font-bold text-modern-red hover:text-modern-red-hover transition-colors whitespace-nowrap"
            >
              Try the AI Size Finder →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SIZE_GUIDE_UNITS.map((u) => (
              <article
                id={'size-' + u.sizeSlug}
                key={u.size}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col scroll-mt-24"
              >
                <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                  <span className="font-bebas text-6xl lg:text-7xl text-charcoal leading-none">{u.size}</span>
                  <span className="text-sm font-bold text-charcoal/70">Storage Unit</span>
                </div>
                <div className="flex gap-4 mb-5 text-xs font-semibold">
                  <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-charcoal">
                    {u.sqft}
                  </span>
                  <span className="text-gray-500 self-center">{u.roomEquivalent}</span>
                </div>

                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Best for</p>
                <p className="text-base font-bold text-charcoal mb-5">{u.bestFor}</p>

                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">What fits</p>
                <ul className="space-y-1.5 mb-5">
                  {u.fits.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-gray-700">
                      <span className="text-modern-red font-black shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Common use cases</p>
                <ul className="space-y-1 mb-6">
                  {u.useCases.map((item) => (
                    <li key={item} className="text-sm text-gray-600">{item}</li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link
                    href="/locations"
                    aria-label={`Find a ${u.size} storage unit near you`}
                    className="inline-flex items-center justify-center gap-2 w-full bg-modern-red hover:bg-modern-red-hover text-white text-sm font-black px-5 py-3 rounded-full transition-colors"
                  >
                    Find a {u.size} Unit
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SIZE FINDER CALLOUT ────────────────────────── */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                Still not sure?
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-4">
                Get a Personalized Unit-Size Recommendation
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Tell the AI Size Finder what you&apos;re storing — furniture, boxes, appliances, vehicles, business inventory — and it returns the right Modern Storage® unit size in about 30 seconds. No quiz, no email required.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <Link
                href="/ai-storage-size-finder"
                className="bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3.5 rounded-full text-sm shadow-md inline-flex items-center justify-center gap-2 transition-colors"
              >
                Try the AI Size Finder
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={settings.phoneHref}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-full text-sm border border-white/20 inline-flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                </svg>
                Call for New Rentals
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="bg-gray-50 py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Size Guide FAQs
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Storage Unit Size Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              The questions Modern Storage® customers ask most about picking a unit size.
            </p>
          </div>
          <FaqAccordion items={SIZE_GUIDE_FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Found Your Size? Reserve a Unit Today
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Pick a Modern Storage® location and reserve online in minutes. Month-to-month rentals — switch sizes anytime if your needs change.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/locations"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Find a Unit Near You
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/ai-storage-size-finder"
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Try the AI Size Finder
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
