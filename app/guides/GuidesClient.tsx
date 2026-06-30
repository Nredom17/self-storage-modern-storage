"use client"
import { useState, useMemo } from 'react'
import Link from 'next/link'

type Guide = {
  href: string; cluster: string; icon: string; title: string
  description: string; readTime: string; featured: boolean
}
type FAQ = { q: string; a: string; href: string | null }

const TOPICS = [
  { label: 'All', filter: 'All' },
  { label: '📦 Sizes', filter: 'Storage Unit Sizes' },
  { label: '🏢 Business', filter: 'Business Storage' },
  { label: '🚚 Moving', filter: 'Moving & Residential' },
  { label: '❄️ Climate', filter: 'Climate-Controlled' },
  { label: '⛵ Vehicles', filter: 'RV & Boat Storage' },
  { label: '🔒 Security', filter: 'Security & Smart Locks' },
]

const STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: '10', label: 'Arkansas Locations' },
  { value: '100k+', label: 'Customers Served' },
  { value: '30+', label: 'Expert Guides' },
]

export default function GuidesClient({ guides, faqs }: { guides: Guide[]; faqs: FAQ[] }) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      const matchesFilter = activeFilter === 'All' || g.cluster === activeFilter
      const q = search.toLowerCase()
      const matchesSearch = !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || g.cluster.toLowerCase().includes(q)
      return matchesFilter && matchesSearch
    })
  }, [guides, search, activeFilter])

  return (
    <main>
      {/* Hero — tight */}
      <section className="bg-charcoal text-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Modern Storage® Resource Center</p>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-4">
                Arkansas Self Storage <span className="text-modern-red">Resource Center</span>
              </h1>
              <p className="text-gray-300 text-base leading-relaxed max-w-xl">
                Everything you need to find the right unit, protect your belongings from Arkansas humidity, move smarter, and store your business inventory — all in one place.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0 lg:min-w-64">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-modern-red">{s.value}</p>
                  <p className="text-xs text-gray-300 font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search + filters — sticky */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Search storage guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-xs border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-modern-red"
          />
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button
                key={t.filter}
                onClick={() => setActiveFilter(t.filter)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                  activeFilter === t.filter
                    ? 'bg-modern-red text-white border-modern-red'
                    : 'bg-white text-charcoal border-gray-200 hover:border-modern-red'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pillar intro */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-charcoal mb-4">Your Complete Guide to Self Storage in Arkansas</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Choosing a storage unit involves more than picking a size. Arkansas&#39;s climate, your specific situation — moving, downsizing, running a business, storing a boat — and the features of each facility all matter. This resource center brings together everything Modern Storage® has learned from 15+ years serving Arkansas customers across 10 locations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '📦', label: 'Storage Unit Sizes', href: '/guides/storage-unit-sizes' },
              { icon: '❄️', label: 'Climate-Controlled', href: '/climate-controlled-arkansas-humidity' },
              { icon: '🏢', label: 'Business Storage', href: '/business-storage-bentonville' },
              { icon: '🚚', label: 'Moving Storage', href: '/guides/moving-storage' },
              { icon: '⛵', label: 'RV & Boat Storage', href: '/storage-near-beaver-lake' },
              { icon: '🔒', label: 'Security Guide', href: '/guides/storage-security' },
              { icon: '🏠', label: 'Apartment Storage', href: '/guides/apartment-storage' },
              { icon: '🔧', label: 'Contractor Storage', href: '/contractor-storage-little-rock' },
            ].map((t) => (
              <Link key={t.href} href={t.href}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-modern-red hover:text-white rounded-xl border border-gray-200 hover:border-modern-red transition-all text-center group">
                <span className="text-2xl">{t.icon}</span>
                <span className="text-xs font-black text-charcoal group-hover:text-white transition-colors">{t.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured guides */}
      <section className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Start Here</p>
          <h2 className="text-xl font-black text-charcoal mb-5">Featured Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guides.filter((g) => g.featured).map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-xl p-5 border-2 border-modern-red hover:bg-modern-red transition-all flex flex-col">
                <span className="text-3xl mb-3">{g.icon}</span>
                <p className="text-xs font-black uppercase tracking-widest text-modern-red group-hover:text-white mb-1 transition-colors">⭐ {g.cluster}</p>
                <h3 className="text-sm font-black text-charcoal group-hover:text-white leading-tight mb-auto transition-colors">{g.title}</h3>
                <span className="mt-3 text-xs font-bold text-modern-red group-hover:text-white transition-colors">{g.readTime} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All guides */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">All Resources</p>
          <h2 className="text-xl font-black text-charcoal mb-5">
            Browse {guides.length} Expert Storage Guides
          </h2>
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-sm py-8">No guides match your search. Try a different keyword or filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((g) => (
                <Link key={g.href} href={g.href}
                  className="group bg-gray-50 hover:bg-white rounded-xl p-5 border border-gray-200 hover:border-modern-red hover:shadow-md transition-all flex flex-col">
                  <span className="text-2xl mb-2">{g.icon}</span>
                  <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">{g.cluster}</p>
                  <h2 className="text-sm font-black text-charcoal group-hover:text-modern-red leading-tight mb-2 transition-colors">{g.title}</h2>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-3">{g.description}</p>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-3 mt-auto">
                    <span className="text-xs text-gray-400">{g.readTime} · June 2026</span>
                    <span className="text-xs font-bold text-modern-red group-hover:translate-x-0.5 transition-transform">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ 2-col */}
      <section className="bg-gray-50 py-10 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">Quick Answers</p>
          <h2 className="text-xl font-black text-charcoal mb-5">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-black text-charcoal mb-2">{faq.q}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{faq.a}</p>
                {faq.href && (
                  <Link href={faq.href} className="text-xs font-bold text-modern-red hover:underline">Full guide →</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links — tight */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-lg font-black text-charcoal mb-4">Jump to a Topic</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Climate-Controlled Storage', href: '/climate-controlled' },
              { label: 'RV & Boat Storage', href: '/rv-boat-vehicle-storage' },
              { label: 'Business Storage', href: '/business-storage-bentonville' },
              { label: 'Contractor Storage', href: '/contractor-storage-little-rock' },
              { label: 'AI Size Finder', href: '/ai-storage-size-finder' },
              { label: 'Size Guide', href: '/size-guide' },
              { label: 'Find a Location', href: '/locations' },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="bg-gray-50 hover:bg-modern-red hover:text-white text-charcoal text-xs font-bold px-4 py-2 rounded-full transition-colors border border-gray-200">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EEAT footer */}
      <section className="bg-charcoal text-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Expert Reviewed</p>
              <p className="font-black text-white text-lg mb-1">Reviewed by the Modern Storage® Team</p>
              <p className="text-gray-400 text-sm">Serving Arkansas Since 2009 · Last Updated June 2026</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: '15+', l: 'Years Operating' },
                { v: '10', l: 'AR Locations' },
                { v: '100k+', l: 'Customers Served' },
                { v: '30+', l: 'Expert Guides' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="text-xl font-black text-modern-red">{s.v}</p>
                  <p className="text-xs text-gray-400">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
