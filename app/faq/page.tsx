import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, FAQS, THEME_PAGES } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/faq'

export const metadata: Metadata = {
  title: {
    absolute: 'Self Storage Frequently Asked Questions | Modern Storage®',
  },
  description:
    'Frequently asked questions about Modern Storage® self storage in Arkansas — unit sizes, climate-controlled storage, boat and RV storage, business storage, free moving truck, online reservations, and finding the nearest Modern Storage® location.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Self Storage Frequently Asked Questions | Modern Storage®',
    description:
      'Answers to the most common self storage FAQs about unit sizes, climate-controlled storage, boat and RV storage, business storage, free moving truck, and Modern Storage® locations in Arkansas.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Self Storage Frequently Asked Questions | Modern Storage®',
    description: 'Common self storage FAQs answered for Modern Storage® customers in Arkansas.',
  },
}

export default async function FaqHubPage() {
  const settings = await getSiteSettings()

  // ── JSON-LD ──────────────────────────────────────────────
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: SITE_URL + PAGE_PATH },
    ],
  }

  const jsonLd = [faqPage, breadcrumb]

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
              <li className="text-gray-300">FAQ</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
              Frequently Asked Questions
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Self Storage <span className="text-modern-red">FAQs</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Answers to the most common questions about Modern Storage® self storage — unit sizes, climate-controlled storage, boat and RV storage, business storage, the free moving truck, online reservations, and finding your nearest Modern Storage® location.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN FAQS ───────────────────────────────────────── */}
      <section id="faqs" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* ── DEEPER DIVES (link to topic-specific FAQs) ───────── */}
      <section className="bg-gray-50 py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Topic-specific FAQs
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Need More Detail on a Specific Service?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Each storage option page has its own FAQ section with details that apply specifically to that service. Pick the page closest to what you need.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {THEME_PAGES.map((p) => (
              <Link
                key={p.slug}
                href={`${p.href}#faq`}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-modern-red mb-2">
                  FAQs
                </p>
                <h3 className="font-black text-charcoal text-lg leading-tight mb-3 group-hover:text-modern-red transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">{p.description}</p>
                <span className="text-xs font-bold text-modern-red inline-flex items-center gap-1">
                  Read FAQs
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Still have a question?
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Talk to the Modern Storage® team or pick a location nearest you — we&apos;ll walk you through size options, climate-controlled availability, and reservation details.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/locations"
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Find a Unit Near You
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
