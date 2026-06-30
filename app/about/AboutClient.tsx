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

// ── SVG outline icons ─────────────────────────────────────────────────────────
const Icons: Record<string, JSX.Element> = {
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L22 7l-3-3"/>
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M6 9H4a2 2 0 0 1-2-2V5h4"/><path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/><path d="M6 5h12v7a6 6 0 0 1-12 0V5z"/><path d="M12 18v4"/><path d="M8 22h8"/>
    </svg>
  ),
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
    </svg>
  ),
}

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: string, duration = 2000) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      const match = target.match(/([\d,.]+)([MK]?)/)
      if (!match) { setDisplay(target); return }
      const raw = parseFloat(match[1].replace(/,/g, ''))
      const suffix = match[2]
      const rest = target.replace(match[0], '')
      const startTime = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        const cur = raw * eased
        let fmt: string
        if (suffix === 'M') fmt = cur.toFixed(1) + 'M'
        else if (suffix === 'K') fmt = Math.floor(cur) + 'K'
        else fmt = Math.floor(cur).toLocaleString()
        setDisplay(fmt + rest)
        if (t < 1) requestAnimationFrame(tick)
        else setDisplay(target)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, display }
}

function StatCard({ icon, value, label, sub }: { icon: string; value: string; label: string; sub?: string }) {
  const { ref, display } = useCountUp(value)
  return (
    <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all min-h-36">
      <span className="text-white/40 group-hover:text-white/60 transition-colors mb-3">{Icons[icon]}</span>
      <span ref={ref} className="text-3xl font-black text-modern-red leading-none tabular-nums mb-2">{display}</span>
      <p className="text-xs font-bold uppercase tracking-widest text-white leading-tight">{label}</p>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  )
}

const AWARDS = [
  { icon: '🏆', title: 'Best Self Storage', sub: 'Best of NW Arkansas', years: '2023 · 2024 · 2025', color: 'border-yellow-400' },
  { icon: '🏆', title: 'Best Self Storage', sub: 'AR Democrat-Gazette Best of the Best', years: '2023 · 2024 · 2025', color: 'border-yellow-400' },
  { icon: '🎙️', title: 'Top 10 Podcast', sub: 'Self Storage Podcasts · Feedspot', years: 'Ranked Nationally', color: 'border-modern-red' },
  { icon: '🌟', title: 'Top 50 Nationally', sub: 'Self Storage Management · Inside Self Storage', years: 'U.S. Rankings', color: 'border-modern-red' },
]

const WHY = [
  {
    icon: '📱',
    title: 'Smart Technology',
    body: `Online rentals, app-enabled smart locks at select locations, digital account management, and digital customer tools designed to simplify storage.`
  },
  {
    icon: '🔒',
    title: 'Premium Security',
    body: `Modern security features including gated access, video surveillance, well-lit properties, and security measures that vary by location.`
  },
  {
    icon: '🤝',
    title: 'Real Customer Service',
    body: `Friendly, knowledgeable local teams focused on making storage simple from move-in to move-out.`
  },
  {
    icon: '🏆',
    title: 'Award-Winning',
    body: `Recognized as Best Self Storage in NW Arkansas and Central Arkansas three years running. Ranked Top 50 nationally by Inside Self Storage.`
  },
  {
    icon: '🏠',
    title: 'Independently Owned',
    body: `Founded and operated independently since 2017. Every decision is made by people who know this industry and are invested in its long-term success.`
  },
  {
    icon: '✨',
    title: 'Premium Facilities',
    body: `Clean, professionally maintained facilities with climate-controlled options, wide hallways, quality lighting, and convenient access designed around how people actually use storage.`
  },
]

const NETWORK = [
  { icon: '🌐', title: 'ModernStorage.com', body: 'Our primary platform for reservations, account management, and storage resources across all locations.' },
  { icon: '🎙️', title: 'Modern Storage® Unpacked', body: 'A nationally ranked self-storage podcast covering industry trends, operations, real estate, and development.' },
  { icon: '📚', title: 'Storage Guides & Blog', body: '30+ expert resources covering unit sizes, climate control, moving tips, business storage, and more.' },
  { icon: '🧮', title: 'Storage Tools', body: 'Online size finders, calculators, and interactive tools that help customers choose the right storage solution.' },
  { icon: '▶️', title: 'Video & Social', body: 'Educational content across YouTube, TikTok, and Facebook reaching hundreds of thousands of followers.' },
  { icon: '🏗️', title: 'Real Estate & Development', body: 'Resources, insights, and expertise for investors, developers, and operators exploring the self-storage industry.' },
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
                About<br /><span className="text-modern-red">Modern Storage&#174;</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8">
                An independently owned self-storage owner and operator committed to delivering secure, convenient, and professionally managed storage solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/locations" className="inline-block bg-modern-red text-white text-sm font-black px-6 py-3 rounded-full hover:bg-red-700 transition-colors text-center">
                  Find a Location
                </Link>
                <Link href="/size-guide" className="inline-block bg-white/10 text-white text-sm font-black px-6 py-3 rounded-full hover:bg-white/20 transition-colors text-center">
                  Find My Unit Size
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

      {/* Stats — dark premium */}
      <section className="bg-[#111] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">By the Numbers</p>
          <h2 className="text-2xl font-black text-white mb-8">Modern Storage&#174; at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon="calendar" value="15+" label="Years Experience" />
            <StatCard icon="pin" value="10" label="Arkansas Locations" />
            <StatCard icon="people" value="100K+" label="Customers Served" />
            <StatCard icon="key" value="10,000+" label="Units Under Management" />
            <StatCard icon="grid" value="1.6M+" label="Sq Ft Managed" />
            <StatCard icon="star" value="Top 50" label="Nationally Ranked" sub="Inside Self Storage" />
            <StatCard icon="trophy" value="3×" label="Best Self Storage" sub="NW Arkansas" />
            <StatCard icon="trophy" value="3×" label="Best Self Storage" sub="Central Arkansas" />
            <StatCard icon="mic" value="Top 10" label="Self Storage Podcast" sub="Feedspot" />
            <StatCard icon="book" value="30+" label="Expert Resources" sub="Resource Center" />
            <StatCard icon="play" value={social.youtube_subscribers} label="YouTube Subscribers" />
            <StatCard icon="chat" value={social.facebook_followers} label="Facebook Followers" />
            <StatCard icon="music" value={social.tiktok_likes} label="TikTok Likes" />
          </div>
          {social.updated_at && (
            <p className="text-center text-xs text-white/30 mt-6">
              Social stats updated {new Date(social.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          )}
        </div>
      </section>

      {/* About */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">About Modern Storage&#174;</p>
          <h2 className="text-3xl font-black text-charcoal mb-6">About Modern Storage&#174;</h2>
          <div className="text-gray-600 leading-relaxed space-y-4 text-base">
            <p>
              Founded in 2017 and headquartered in North Little Rock, Arkansas, Modern Storage&#174; is an independently owned self-storage owner and operator committed to delivering secure, convenient, and professionally managed storage solutions throughout Arkansas.
            </p>
            <p>
              Our facilities are designed to serve homeowners, renters, businesses, students, and organizations with a wide range of storage options — including climate-controlled units, drive-up storage, vehicle storage, and business storage. Combined with online rentals, digital account management, and customer-focused service, we make renting and managing a storage unit simple from start to finish.
            </p>
            <p>
              Modern Storage&#174; is more than a self-storage company. We are committed to educating and supporting our customers through industry resources that extend beyond the rental experience. Through our blogs, storage guides, videos, online tools, and the Modern Storage&#174; Unpacked podcast, we provide practical insights into self-storage, commercial real estate, construction, development, and property management.
            </p>
            <p>
              As an Arkansas company, we take a long-term approach to every decision we make. We continually invest in our facilities, technology, employees, and communities while maintaining consistent standards for cleanliness, security, operational excellence, and customer service across every location.
            </p>
            <p>
              Whether you&#39;re storing household belongings, business inventory, or a vehicle — or exploring self-storage real estate and development — Modern Storage&#174; is committed to providing dependable service, trusted expertise, and resources backed by a team that proudly calls Arkansas home.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Why Modern Storage&#174;</p>
          <h2 className="text-3xl font-black text-charcoal mb-8">What Makes Us Different</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY.map((w) => (
              <div key={w.title} className="group p-6 bg-white hover:bg-white rounded-2xl border border-gray-200 hover:border-modern-red hover:shadow-md transition-all">
                <span className="text-3xl mb-4 block">{w.icon}</span>
                <h3 className="text-base font-black text-charcoal mb-2 group-hover:text-modern-red transition-colors">{w.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Recognition</p>
          <h2 className="text-3xl font-black text-charcoal mb-8">Awards &amp; Honors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AWARDS.map((a) => (
              <div key={a.title + a.sub} className={`bg-gray-50 rounded-2xl p-6 border-2 ${a.color} flex flex-col items-center text-center`}>
                <span className="text-4xl mb-3">{a.icon}</span>
                <h3 className="text-base font-black text-charcoal mb-1">{a.title}</h3>
                <p className="text-xs font-bold text-gray-600 mb-2">{a.sub}</p>
                <p className="text-xs text-modern-red font-black uppercase tracking-widest">{a.years}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Modern Storage Network */}
      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">More Than Storage</p>
          <h2 className="text-3xl font-black text-charcoal mb-3">The Modern Storage&#174; Network</h2>
          <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-3xl">
            Most storage companies stop at renting units. Modern Storage&#174; has built a media and education platform around the industry — providing customers, business owners, developers, and investors with resources that go far beyond the rental process.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NETWORK.map((n) => (
              <div key={n.title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-md transition-all">
                <span className="text-2xl mb-3 block">{n.icon}</span>
                <h3 className="text-sm font-black text-charcoal mb-2">{n.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{n.body}</p>
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
            As an independently owned Arkansas company, we&#39;re able to make long-term decisions that prioritize our customers, employees, and communities rather than quarterly earnings. Every facility is held to a standard we&#39;d be proud to show our neighbors.
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
          <p className="text-gray-300 text-base mb-8 max-w-2xl mx-auto">
            Whether you&#39;re storing household belongings, business inventory, vehicles, or planning your next self-storage investment, Modern Storage&#174; is committed to delivering secure facilities, exceptional service, and trusted expertise backed by a team that proudly calls Arkansas home.
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
