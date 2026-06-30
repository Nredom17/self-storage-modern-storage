"use client"
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Social = {
  youtube_subscribers: string
  facebook_followers: string
  tiktok_likes: string
  updated_at: string | null
}

function useCountUp(target: string, duration = 1800) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const match = target.match(/([\d,.]+)([MK]?)/)
        if (!match) { setDisplay(target); return }
        const raw = parseFloat(match[1].replace(/,/g, ''))
        const suffix = match[2]
        const rest = target.replace(match[0], '')
        const end = raw
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const cur = end * eased
          let formatted: string
          if (suffix === 'M') formatted = cur.toFixed(1) + 'M'
          else if (suffix === 'K') formatted = Math.floor(cur) + 'K'
          else formatted = Math.floor(cur).toLocaleString()
          setDisplay(formatted + rest)
          if (progress < 1) requestAnimationFrame(tick)
          else setDisplay(target)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, display }
}

function StatCard({ icon, value, label, sub }: { icon: string; value: string; label: string; sub?: string }) {
  const { ref, display } = useCountUp(value)
  return (
    <div className="group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-all cursor-default">
      <span className="text-2xl mb-3">{icon}</span>
      <span ref={ref} className="text-3xl lg:text-4xl font-black text-modern-red leading-none tabular-nums">
        {display}
      </span>
      <p className="text-xs font-black uppercase tracking-widest text-charcoal mt-2">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}

const TIMELINE = [
  { year: '2009', title: 'Founded in Arkansas', body: `Modern Storage® opens its first location with a simple goal — build the storage facility we’d actually want to use.` },
  { year: '2014', title: 'Expanding Across Central Arkansas', body: `Growing demand leads to new locations across Little Rock, North Little Rock, and surrounding communities.` },
  { year: '2018', title: 'Northwest Arkansas Launch', body: `Modern Storage® enters the NWA market with premium climate-controlled facilities in Bentonville, Lowell, and Springdale.` },
  { year: '2021', title: 'Smart Locks & Modern Technology', body: `We become one of the first Arkansas storage companies to roll out app-controlled smart locks, contactless rentals, and digital access.` },
  { year: '2024', title: '10 Locations & Top 50 Nationally', body: `Modern Storage® reaches 10 Arkansas locations and earns a spot on Inside Self Storage’s Top 50 management companies in the U.S.` },
  { year: 'Today', title: 'The Future of Storage', body: `Serving 100,000+ customers with a team that treats every unit like it’s their own. Arkansas built. Arkansas proud.` },
]

const AWARDS = [
  { icon: '🏆', title: 'Best Self Storage', sub: 'Best of NW Arkansas', years: '2023 · 2024 · 2025', color: 'border-yellow-400' },
  { icon: '🏆', title: 'Best Self Storage', sub: 'AR Democrat-Gazette Best of the Best', years: '2023 · 2024 · 2025', color: 'border-yellow-400' },
  { icon: '🎙️', title: 'Top 10 Podcast', sub: 'Self Storage Podcasts · Feedspot', years: 'Ranked Nationally', color: 'border-modern-red' },
  { icon: '🌟', title: 'Top 50 Nationally', sub: 'Self Storage Management · Inside Self Storage', years: 'U.S. Rankings', color: 'border-modern-red' },
]

const WHY = [
  { icon: '📱', title: 'Smart Technology', body: `App-controlled smart locks, online rentals, autopay, and digital access codes. No paperwork. No keys to lose.` },
  { icon: '🔒', title: 'Premium Security', body: `Perimeter fencing, 24/7 video surveillance, gated access, and individually alarmed units at select locations.` },
  { icon: '🤝', title: 'Real Customer Service', body: `On-site managers who actually know your name. Google reviews consistently above 4.8 stars across all locations.` },
  { icon: '🏆', title: 'Award-Winning', body: `Recognized as Best Self Storage in NW Arkansas and Central Arkansas three years running. Top 50 nationally.` },
  { icon: '🏠', title: 'Locally Owned', body: `Arkansas owned and operated since 2009. Every decision is made here, not in a corporate office in another state.` },
  { icon: '✨', title: 'Modern Facilities', body: `Climate-controlled hallways, clean units, LED lighting, and drive-up access. Built the way storage should be.` },
]

export default function AboutClient({ social }: { social: Social }) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-charcoal text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">About Modern Storage&#174;</p>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-5">
                Arkansas&#39;s Modern<br /><span className="text-modern-red">Self Storage Company</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8">
                We&#39;re building a better self-storage experience through technology, customer service, and award-winning facilities across Arkansas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/locations" className="inline-block bg-modern-red text-white text-sm font-black px-6 py-3 rounded-full hover:bg-red-700 transition-colors text-center">
                  Find a Location
                </Link>
                <Link href="/size-guide" className="inline-block bg-white/10 text-white text-sm font-black px-6 py-3 rounded-full hover:bg-white/20 transition-colors text-center">
                  Explore Our Story
                </Link>
              </div>
            </div>
            <div className="relative mt-10 lg:mt-0 lg:w-[500px] lg:flex-shrink-0 rounded-2xl overflow-hidden" style={{ height: '380px' }}>
              <Image
                src="/images/modern-storage-bentonville-facility-exterior.jpg"
                alt="Modern Storage Arkansas facility"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-charcoal/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row 1 */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-100">
            <StatCard icon="📅" value="15+" label="Years Operating" />
            <StatCard icon="📍" value="10" label="Arkansas Locations" />
            <StatCard icon="👥" value="100K+" label="Customers Served" />
            <StatCard icon="🗝️" value="10,000+" label="Units Under Management" />
            <StatCard icon="📐" value="1.6M+" label="Sq Ft Managed" />
            <StatCard icon="🌟" value="Top 50" label="Nationally Ranked" sub="Inside Self Storage" />
          </div>
        </div>
      </section>

      {/* Stats Row 2 */}
      <section className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 divide-x divide-gray-200">
            <StatCard icon="🏆" value="3×" label="Best Self Storage" sub="NW Arkansas" />
            <StatCard icon="🏆" value="3×" label="Best Self Storage" sub="Central Arkansas" />
            <StatCard icon="🎙️" value="Top 10" label="Self Storage Podcast" sub="Feedspot" />
            <StatCard icon="📚" value="30+" label="Expert Resources" sub="Resource Center" />
            <StatCard icon="▶️" value={social.youtube_subscribers} label="YouTube Subscribers" />
            <StatCard icon="👍" value={social.facebook_followers} label="Facebook Followers" />
            <StatCard icon="🎵" value={social.tiktok_likes} label="TikTok Likes" />
          </div>
          {social.updated_at && (
            <p className="text-center text-xs text-gray-400 mt-4">
              Social stats updated {new Date(social.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          )}
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Our Story</p>
          <h2 className="text-3xl font-black text-charcoal mb-6">Built in Arkansas. Built for Arkansas.</h2>
          <div className="text-gray-600 leading-relaxed space-y-4 text-base">
            <p>
              Modern Storage&#174; was founded in 2009 with a straightforward premise: self storage in Arkansas should be better. Not just bigger units or lower prices &#8212; better in every way. Cleaner facilities. Smarter technology. Real people answering the phone.
            </p>
            <p>
              We started with one location and a stubborn belief that the storage industry was overdue for a serious upgrade. Fifteen years later, we operate 10 locations across Arkansas, manage more than 10,000 units, and serve over 100,000 customers &#8212; all while staying 100% locally owned and operated.
            </p>
            <p>
              Along the way, we became one of the first Arkansas storage companies to deploy app-controlled smart locks and contactless rentals. We launched Modern Storage Unpacked, a podcast that ranked in the national top 10. We wrote a book. We earned Best Self Storage honors three years running in both Northwest and Central Arkansas.
            </p>
            <p>
              None of it happened because we followed what everyone else was doing. It happened because we kept asking a simple question: what would actually make this better for the customer?
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Our Journey</p>
          <h2 className="text-3xl font-black text-charcoal mb-10">Modern Storage&#174; Timeline</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="relative pl-12">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-modern-red flex items-center justify-center text-white text-xs font-black z-10">
                    {i + 1}
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">{item.year}</p>
                  <h3 className="text-base font-black text-charcoal mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Modern Storage */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Why Modern Storage&#174;</p>
          <h2 className="text-3xl font-black text-charcoal mb-8">What Makes Us Different</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY.map((w) => (
              <div key={w.title} className="group p-6 bg-gray-50 hover:bg-white rounded-2xl border border-gray-200 hover:border-modern-red hover:shadow-md transition-all">
                <span className="text-3xl mb-4 block">{w.icon}</span>
                <h3 className="text-base font-black text-charcoal mb-2 group-hover:text-modern-red transition-colors">{w.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Recognition</p>
          <h2 className="text-3xl font-black text-charcoal mb-8">Awards &amp; Honors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AWARDS.map((a) => (
              <div key={a.title + a.sub} className={`bg-white rounded-2xl p-6 border-2 ${a.color} flex flex-col items-center text-center`}>
                <span className="text-4xl mb-3">{a.icon}</span>
                <h3 className="text-base font-black text-charcoal mb-1">{a.title}</h3>
                <p className="text-xs font-bold text-gray-600 mb-2">{a.sub}</p>
                <p className="text-xs text-modern-red font-black uppercase tracking-widest">{a.years}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Community</p>
          <h2 className="text-3xl font-black text-charcoal mb-4">Arkansas Proud</h2>
          <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-2xl">
            We&#39;re not a REIT. We&#39;re not a national chain managed from out of state. Every dollar earned stays in Arkansas, every decision is made by people who live here, and every facility is held to a standard we&#39;d be proud to show our neighbors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { v: 'NW Arkansas', d: 'Bentonville · Lowell · Springdale' },
              { v: 'Central Arkansas', d: 'Little Rock · North Little Rock · Maumelle · Bryant' },
              { v: 'Hot Springs', d: 'Serving the Natural State' },
            ].map((r) => (
              <div key={r.v} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <p className="text-sm font-black text-charcoal mb-1">{r.v}</p>
                <p className="text-xs text-gray-500">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Ready to Get Started?</p>
          <h2 className="text-3xl lg:text-4xl font-black mb-4">Experience Modern Storage&#174;</h2>
          <p className="text-gray-300 text-base mb-8 max-w-lg mx-auto">
            Reserve online in minutes. No long-term commitment. Free moving truck at most locations. Arkansas&#39;s highest-rated storage experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/locations" className="inline-block bg-modern-red text-white text-sm font-black px-8 py-3 rounded-full hover:bg-red-700 transition-colors">
              Find a Location Near You
            </Link>
            <Link href="/size-guide" className="inline-block bg-white/10 text-white text-sm font-black px-8 py-3 rounded-full hover:bg-white/20 transition-colors">
              Find My Unit Size
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
