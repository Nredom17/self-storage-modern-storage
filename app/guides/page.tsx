import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'

export const revalidate = 60

const PAGE_PATH = '/guides'

export const metadata: Metadata = {
  title: {
    absolute: 'Arkansas Self Storage Resource Center | Modern Storage®',
  },
  description:
    'The complete Modern Storage® self storage resource center — storage unit size guides, climate-controlled storage, moving storage, business storage, RV & boat storage, security guides, and Arkansas-specific FAQs.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Arkansas Self Storage Resource Center | Modern Storage®',
    description:
      'In-depth guides on apartment, moving, contractor, business, boat/RV, climate-controlled, and size selection for Arkansas self storage.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Arkansas Self Storage Resource Center | Modern Storage®',
    description: 'Complete self storage guides and resources for Arkansas customers.',
  },
}

const GUIDES = [
  {
    href: '/guides/storage-unit-sizes',
    cluster: 'Storage Unit Sizes',
    title: 'Storage Unit Sizes Guide',
    description:
      'Complete walkthrough of every Modern Storage® unit size — 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 — with what fits in each, climate-controlled vs drive-up pricing, and how to pick the right size for your situation.',
    readTime: '7 min read',
    featured: true,
  },
  {
    href: '/guides/storage-security',
    cluster: 'Security & Smart Locks',
    title: 'Storage Unit Security Guide',
    description:
      'What makes a storage facility actually secure — gated access, video surveillance, perimeter fencing, exterior lighting, disc locks, and on-site management — plus a 10-step pre-rent checklist for evaluating any facility.',
    readTime: '6 min read',
    featured: false,
  },
  {
    href: '/guides/apartment-storage',
    cluster: 'Moving & Residential Storage',
    title: 'Apartment Storage Guide',
    description:
      'Renting a small apartment? Compare 5x5 and 5x10 storage unit sizes, college-storage strategies, and which Modern Storage® Arkansas locations are closest to apartment complexes.',
    readTime: '5 min read',
    featured: true,
  },
  {
    href: '/guides/moving-storage',
    cluster: 'Moving & Residential Storage',
    title: 'Storage During a Move',
    description:
      'Storage between leases, military PCS, long-distance relocation, and renovation moves. Pair with the free moving truck for one-trip move-in.',
    readTime: '5 min read',
    featured: false,
  },
  {
    href: '/climate-controlled-arkansas-humidity',
    cluster: 'Climate-Controlled Storage',
    title: 'Climate-Controlled Storage for Arkansas Humidity',
    description:
      'How Arkansas humidity damages stored belongings — month-by-month humidity table, garage vs. attic vs. climate-controlled temperature comparison, and what belongs indoors.',
    readTime: '8 min read',
    featured: true,
  },
  {
    href: '/business-storage-bentonville',
    cluster: 'Business Storage',
    title: 'Supplier & Business Storage in Bentonville',
    description:
      'Climate-controlled and business storage for NWA vendors, suppliers, e-commerce sellers, and Bentonville-area small businesses. Near the Walmart Home Office area.',
    readTime: '6 min read',
    featured: true,
  },
  {
    href: '/contractor-storage-little-rock',
    cluster: 'Business Storage',
    title: 'Contractor Storage in Little Rock',
    description:
      'Tools, jobsite overflow, restoration crew kits, and trade inventory storage at four Little Rock area Modern Storage® locations.',
    readTime: '5 min read',
    featured: false,
  },
  {
    href: '/storage-near-beaver-lake',
    cluster: 'RV & Boat Storage',
    title: 'Boat & RV Storage Near Beaver Lake',
    description:
      'Off-season boat storage, year-round RV parking, and trailer spaces minutes from Beaver Lake marinas. Lowell location on I-49 between Rogers and Springdale.',
    readTime: '5 min read',
    featured: false,
  },
]

const ALL_CLUSTERS = ['All', ...Array.from(new Set(GUIDES.map((g) => g.cluster)))]

const FAQS = [
  {
    q: 'What size storage unit do I need?',
    a: 'A 5x10 fits a studio apartment or bedroom. A 10x10 handles a 1–2 bedroom apartment. A 10x20 fits a full house. Use our Size Guide or AI Size Finder for a personalized recommendation based on exactly what you plan to store.',
    href: '/guides/storage-unit-sizes',
  },
  {
    q: 'Do I need climate-controlled storage in Arkansas?',
    a: 'Arkansas averages 70–85% humidity in summer. Climate-controlled storage is strongly recommended for wood furniture, electronics, artwork, clothing, documents, and anything sensitive to heat or moisture. Drive-up units work well for metal, plastic, and vehicles.',
    href: '/climate-controlled-arkansas-humidity',
  },
  {
    q: 'Can I store a boat, RV, or vehicle?',
    a: 'Yes. Select Modern Storage® locations offer covered and uncovered spaces for boats, RVs, trailers, and vehicles. Lowell is especially convenient for Beaver Lake boat storage. Contact your preferred location for current availability and sizing.',
    href: '/storage-near-beaver-lake',
  },
  {
    q: 'How much does storage cost in Arkansas?',
    a: 'Prices vary by unit size, location, and whether you choose climate-controlled or drive-up access. Small units (5x5, 5x10) typically start under $50/month. Larger units (10x20, 10x30) range higher. Reserve online to lock in current pricing.',
    href: '/guides/storage-unit-sizes',
  },
  {
    q: 'Can businesses rent storage units?',
    a: 'Absolutely. Modern Storage® serves contractors, e-commerce sellers, Walmart suppliers, restaurateurs, and small businesses throughout Arkansas. Climate-controlled options protect inventory, equipment, and documents. No long-term commitment required.',
    href: '/business-storage-bentonville',
  },
  {
    q: 'What is a Modern Smart Unit?',
    a: 'A Modern Smart Unit uses a smart lock instead of a traditional key. You unlock your unit with your smartphone via NFC tap, pay rent through the app, and share temporary digital access with employees or family — no physical key needed.',
    href: '/guides/storage-security',
  },
  {
    q: 'How long can I rent a storage unit?',
    a: 'Modern Storage® offers month-to-month rentals with no long-term commitment required. You can rent for as little as one month or as long as you need. Simply give notice when you are ready to move out.',
    href: null,
  },
]

export default async function GuidesPage() {
  await getSiteSettings()

  return (
    <main>
      {/* Hero */}
      <section className="bg-charcoal text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
            Modern Storage® Resource Center
          </p>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
            Arkansas Self Storage{' '}
            <span className="text-modern-red">Resource Center</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to find the right storage unit, protect your belongings in Arkansas humidity, move smarter, and store your business inventory — all in one place.
          </p>
        </div>
      </section>

      {/* Pillar intro */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-black text-charcoal mb-4">Your Complete Guide to Self Storage in Arkansas</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Choosing a storage unit involves more than picking a size. Arkansas&#39;s climate, your specific situation — moving, downsizing, running a business, storing a boat — and the features of each facility all matter. This resource center brings together everything Modern Storage® has learned from 15+ years of serving Arkansas customers across 10 locations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-black text-charcoal mb-3">Storage Unit Sizes</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  Not sure what size you need? Our size guide covers every unit from 5x5 to 10x30, including what fits in each, how to decide between climate-controlled and drive-up, and how to avoid paying for space you don&#39;t need.
                </p>
                <Link href="/guides/storage-unit-sizes" className="text-xs font-bold text-modern-red hover:underline">Read the Size Guide →</Link>
              </div>
              <div>
                <h3 className="text-lg font-black text-charcoal mb-3">Climate-Controlled Storage</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  Arkansas summer humidity regularly exceeds 80%. Wood warps, electronics corrode, and fabric grows mold faster than most people expect. Learn exactly what needs climate control and what doesn&#39;t.
                </p>
                <Link href="/climate-controlled-arkansas-humidity" className="text-xs font-bold text-modern-red hover:underline">Read the Climate Guide →</Link>
              </div>
              <div>
                <h3 className="text-lg font-black text-charcoal mb-3">Business &amp; Contractor Storage</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  Modern Storage® serves contractors, e-commerce sellers, Walmart suppliers, and small businesses across Northwest Arkansas and the Little Rock metro. Month-to-month rentals, drive-up access, and climate-controlled options available.
                </p>
                <Link href="/business-storage-bentonville" className="text-xs font-bold text-modern-red hover:underline">Read the Business Storage Guide →</Link>
              </div>
              <div>
                <h3 className="text-lg font-black text-charcoal mb-3">Moving &amp; Residential Storage</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  Whether you&#39;re moving between leases, downsizing, or renovating, storage gives you the flexibility to move on your schedule. Pair your unit with our free moving truck for a one-trip move-in.
                </p>
                <Link href="/guides/moving-storage" className="text-xs font-bold text-modern-red hover:underline">Read the Moving Storage Guide →</Link>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Modern Storage® operates 10 locations across Arkansas — Little Rock, North Little Rock, Maumelle, Shackleford, Riverdale, West Little Rock, Bryant, Hot Springs, Springdale, Lowell, and Bentonville. Every guide links to the specific location, unit size, and reservation page that matches your situation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured guides */}
      <section className="bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Start Here</p>
          <h2 className="text-2xl font-black text-charcoal mb-8">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {GUIDES.filter((g) => g.featured).map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group bg-white rounded-2xl p-6 border-2 border-modern-red hover:bg-modern-red hover:text-white transition-all flex flex-col"
              >
                <p className="text-xs font-black uppercase tracking-widest text-modern-red group-hover:text-white mb-2 transition-colors">
                  ⭐ {g.cluster}
                </p>
                <h3 className="text-base font-black text-charcoal group-hover:text-white leading-tight mb-2 transition-colors">
                  {g.title}
                </h3>
                <span className="mt-auto text-xs font-bold text-modern-red group-hover:text-white transition-colors">
                  {g.readTime} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All guides grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">All Resources</p>
          <h2 className="text-2xl font-black text-charcoal mb-8">Browse All Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
              >
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">
                  {g.cluster}
                </p>
                <h2 className="text-lg font-black text-charcoal leading-tight mb-3 group-hover:text-modern-red transition-colors">
                  {g.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                  {g.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{g.readTime} · Updated June 2026 · Arkansas Guide</span>
                  <span className="text-xs font-bold text-modern-red">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Quick Answers</p>
          <h2 className="text-2xl font-black text-charcoal mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-base font-black text-charcoal mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{faq.a}</p>
                {faq.href && (
                  <Link href={faq.href} className="text-xs font-bold text-modern-red hover:underline">
                    Read full guide →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
            Quick links
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-8">
            Jump straight to a topic
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/climate-controlled" className="bg-gray-50 hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">Climate-Controlled Storage</Link>
            <Link href="/rv-boat-vehicle-storage" className="bg-gray-50 hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">RV & Boat Storage</Link>
            <Link href="/business-storage-bentonville" className="bg-gray-50 hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">Business Storage</Link>
            <Link href="/contractor-storage-little-rock" className="bg-gray-50 hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">Contractor Storage</Link>
            <Link href="/ai-storage-size-finder" className="bg-gray-50 hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">AI Size Finder</Link>
            <Link href="/size-guide" className="bg-gray-50 hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">Size Guide</Link>
            <Link href="/locations" className="bg-gray-50 hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">Find a Location</Link>
          </div>
        </div>
      </section>

      {/* Author trust */}
      <section className="bg-charcoal text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Expert Reviewed</p>
          <p className="text-white font-black text-lg mb-1">Reviewed by the Modern Storage® Team</p>
          <p className="text-gray-400 text-sm">15+ Years Operating Self Storage · Serving Arkansas Since 2009 · Last Updated June 2026</p>
        </div>
      </section>
    </main>
  )
}
