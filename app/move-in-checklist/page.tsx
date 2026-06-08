import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'
import {
  CHECKLIST_FAQS,
  COMMON_MISTAKES,
  WHAT_TO_BRING,
} from '@/lib/move-in-checklist'
import MoveInChecklist from './MoveInChecklist'

export const revalidate = 60

const PAGE_PATH = '/move-in-checklist'

// Hero photo — Modern Storage® team member walking a new customer
// through the move-in process with a clipboard. Added 2026-06-05
// when Alexandra dropped it into public/images. Lives on the hero
// alongside the title; also serves as OpenGraph / Twitter card.
const HERO_IMAGE = '/images/Modern_Storage_Moving_Checklist.jpg'
const HERO_ALT =
  'Modern Storage® team member walking a new customer through the storage move-in checklist with a clipboard'

export const metadata: Metadata = {
  title: { absolute: 'Move-In Checklist | Modern Storage® Self Storage' },
  description:
    'Free personalized storage unit move-in checklist from Modern Storage®. Get a step-by-step preparation, packing, and move-in day guide tailored to your unit size and storage type.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Move-In Checklist | Modern Storage®',
    description:
      'Personalized storage move-in checklist — preparation, packing, climate protection, and move-in day steps tailored to household, business, vehicle, seasonal, or renovation storage.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1067, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Move-In Checklist | Modern Storage®',
    description: 'Personalized storage unit move-in checklist from Modern Storage®.',
    images: [HERO_IMAGE],
  },
}

function buildJsonLd(phoneDisplay: string) {
  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': SITE_URL + PAGE_PATH + '#webapp',
    name: 'Modern Storage® Move-In Checklist',
    url: SITE_URL + PAGE_PATH,
    description:
      'Free interactive checklist that generates a personalized storage move-in plan based on what you are storing, your unit size, and your move-in date.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    // Repointed to sitewide #organization @id to avoid emitting a nested
    // SelfStorage with no PostalAddress (a Semrush markup-error trigger).
    provider: { '@id': SITE_URL + '/#organization' },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Move-In Checklist', item: SITE_URL + PAGE_PATH },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CHECKLIST_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  // HowTo schema with the high-level move-in flow. Each step references a
  // section in the on-page checklist, not specific operational instructions.
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Prepare for Storage Unit Move-In',
    description:
      'A four-stage process to prepare for and complete a Modern Storage® unit move-in.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Reserve your unit and gather supplies',
        text: 'Reserve your storage unit, buy a disc lock, and gather boxes in multiple sizes, packing tape, bubble wrap, and furniture pads.',
      },
      {
        '@type': 'HowToStep',
        name: 'Pack smart',
        text: 'Pack heaviest items in small boxes, fill every box completely, label every box on the top and side, and wrap breakables individually.',
      },
      {
        '@type': 'HowToStep',
        name: 'Protect against climate',
        text: 'Use climate-controlled units for wood furniture, electronics, and documents. Cover furniture with breathable cloth, not plastic. Elevate items off the floor where possible.',
      },
      {
        '@type': 'HowToStep',
        name: 'Move-in day',
        text: 'Bring ID and reservation confirmation, walk the unit before loading, install your lock immediately, photograph the loaded unit, and save your gate code.',
      },
    ],
  }

  return [webApp, howTo, breadcrumb, faqPage]
}

export default async function MoveInChecklistPage() {
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

      {/* ── HERO ─────────────────────────────────────────────────
          Two-column layout 2026-06-05: title and intro on the left,
          team-with-clipboard photo on the right. Previously the
          right side of the hero was empty black space. */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Move-In Checklist</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
                Free move-in tool
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Storage Move-In Checklist
              </h1>
              <p className="text-2xl lg:text-3xl font-bold text-gray-200 mb-8 leading-tight">
                Built for your unit size, your storage type, and your move-in date.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Most storage move-ins fail in the same spots — wrong boxes, no center aisle, plastic-wrapped furniture in Arkansas humidity. This personalized checklist walks you through every step so move-in day takes one trip, your stuff stays protected, and future-you can actually find what you stored.
              </p>
            </div>
            <figure className="lg:order-last">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
                <Image
                  src={HERO_IMAGE}
                  alt={HERO_ALT}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ── TOOL ─────────────────────────────────────────────── */}
      <section id="tool" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <MoveInChecklist />
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">How it works</p>
          <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
            How the Move-In Checklist Works
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The Modern Storage® Move-In Checklist generates a personalized step-by-step guide based on three quick inputs — what you are storing, the size of your Modern Storage® unit, and your move-in date. The list covers preparation, packing, climate protection, and move-in day, with a progress meter you can use as a working document right up to the day you load.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: '1', t: 'Pick storage type', b: 'Household, business inventory, vehicle, seasonal items, or home renovation — each generates a different checklist.' },
              { n: '2', t: 'Pick unit size', b: 'Eight sizes from 5x5 closet to 10x30 extra large. Not sure? The AI Storage Size Finder is one click away.' },
              { n: '3', t: 'Get your list', b: 'Check off items as you complete them. The progress meter and section headers keep you organized through the whole move.' },
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

      {/* ── WHAT TO BRING ────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Move-in day essentials</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              What to Bring on Move-In Day
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Six items that turn a stressful move into a clean, fast one. Bring these and you will not be making a second trip mid-load to a hardware store.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHAT_TO_BRING.map((w) => (
              <div
                key={w.title}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red transition-colors"
              >
                <h3 className="font-black text-charcoal mb-2 text-lg leading-tight">{w.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ──────────────────────────────────── */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Skip the lesson</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              Common Move-In Mistakes (and How to Avoid Them)
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              The six errors Modern Storage® customers make most often. Each one costs time, money, or stored items down the road — and each one is preventable on the front end.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMON_MISTAKES.map((m) => (
              <div
                key={m.title}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-modern-red rounded-2xl p-6 transition-all"
              >
                <h3 className="font-black text-white mb-2 leading-tight">{m.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PAGES ────────────────────────────────────── */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Plan the rest of your move</p>
          <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-8">
            Tools and Pages That Pair With the Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/ai-storage-size-finder"
              className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Size Finder</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">AI Storage Size Finder →</p>
            </Link>
            <Link
              href="/free-moving-truck"
              className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Moving Truck</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Free Moving Truck →</p>
            </Link>
            <Link
              href="/climate-controlled"
              className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Climate-Controlled</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">Climate-Controlled Storage →</p>
            </Link>
            <Link
              href="/#locations"
              className="group bg-gray-50 hover:bg-white rounded-2xl p-5 border border-gray-200 hover:border-modern-red transition-all"
            >
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Locations</p>
              <p className="font-black text-charcoal group-hover:text-modern-red transition-colors text-sm">10 Locations →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Move-In Checklist FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              Common questions about preparing for a storage unit move-in, what to bring, packing strategy, insurance, and storage by category — household, business, vehicle, seasonal, and renovation.
            </p>
          </div>
          <FaqAccordion items={CHECKLIST_FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-modern-red py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Ready to Move In?
          </h2>
          <p className="text-red-100 text-lg mb-3 max-w-2xl mx-auto leading-relaxed">
            Build your personalized Modern Storage® checklist, then reserve your unit at a location near you.
          </p>
          <p className="text-red-100/80 text-sm mb-10 max-w-2xl mx-auto leading-relaxed">
            10 Modern Storage® locations across Arkansas — Little Rock, North Little Rock, Bentonville, Bryant, Hot Springs, Maumelle, Springdale, Lowell, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#tool"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Build My Checklist
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
              Call to Rent a Unit
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
