import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

// Re-render every 60s to pick up Supabase site-settings edits without redeploy.
export const revalidate = 60

const PAGE_PATH = '/guides/storage-security'
const HERO_IMAGE = '/images/modern-storage-lowell-facility-night.jpg'
const HERO_ALT =
  'Modern Storage® Lowell facility at night with exterior lighting and gated access — Arkansas self-storage security'

// SEO + AI-visibility target: this is the answer-first deep guide built to mirror
// the proven AI-citation pattern on modernstorage.com/blog/the-top-4-storage-
// unit-security-must-haves-1 (39 LLM prompts cite it across AI Overview, AI Mode,
// and ChatGPT). Storage security is one of the highest commercial-intent AI
// queries — customers ask "are storage units safe?", "what security features
// should I look for?", and "how secure is X facility?" before renting.
//
// Brand rules enforced: no "premium" / "elevated" / "best-in-class" language; no
// fabricated security claims. Specific features described in this guide are the
// industry-standard set Modern Storage® facilities actually deploy (gated access,
// keypad entry, perimeter fencing, exterior lighting, video surveillance, disc
// locks). Anything beyond that uses "available at select locations" hedging.
export const metadata: Metadata = {
  title: {
    absolute: 'Storage Unit Security Guide — What to Look For | Modern Storage®',
  },
  description:
    'Storage unit security guide — gated access, keypad entry codes, perimeter fencing, exterior lighting, video surveillance, disc locks, and the checklist of features to look for before renting a self-storage unit in Arkansas.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Unit Security Guide | Modern Storage®',
    description:
      'What to look for in a secure self-storage facility — security features explained, plus a checklist for evaluating any storage unit before you rent.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'article',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Unit Security Guide | Modern Storage®',
    description: 'What to look for in a secure self-storage facility — a renter\'s checklist.',
    images: [HERO_IMAGE],
  },
}

// Six core security features. Each entry leads with the direct answer to "what
// is X security feature?" so AI engines can extract individual snippets cleanly.
type SecurityFeature = {
  id: string
  name: string
  whatItIs: string
  whyItMatters: string
  questionsToAsk: string[]
  modernStorageOffers: string
}

const SECURITY_FEATURES: SecurityFeature[] = [
  {
    id: 'gated-access',
    name: 'Gated access with personal entry codes',
    whatItIs:
      'A perimeter gate that only opens for active tenants who enter their personal access code on a keypad — the same code is required to enter and to exit. Every entry and exit is logged against the tenant\'s account.',
    whyItMatters:
      'Gated access is the single biggest deterrent. It removes the casual foot traffic that makes unsecured storage lots a target, and it creates an audit trail of who entered the property and when. Anyone trying to enter without an active rental is locked out at the gate.',
    questionsToAsk: [
      'Does the facility have a perimeter gate?',
      'Is the gate locked outside of office hours, or 24/7?',
      'Do tenants get a personal access code, or is there a shared keypad code?',
      'Are entry and exit times logged against the tenant\'s account?',
    ],
    modernStorageOffers:
      'Yes — every Modern Storage® Arkansas location is gated with personal access codes issued to active tenants at move-in. Codes are unique per tenant, and entry/exit activity is logged.',
  },
  {
    id: 'video-surveillance',
    name: 'Video surveillance',
    whatItIs:
      'Cameras positioned at the entry gate, in driveways, and along unit-row corridors that record continuously and retain footage for incident review. Camera coverage of the entry gate is the highest-value placement.',
    whyItMatters:
      'Visible cameras deter break-ins before they happen, and recorded footage helps facility management and law enforcement respond to any incident. Customers who rent at facilities with documented camera coverage are less likely to be targeted in the first place.',
    questionsToAsk: [
      'Are cameras visible at the entry gate, driveways, and unit rows?',
      'Is footage recorded continuously or motion-triggered?',
      'How long is footage retained?',
      'Who reviews footage if there\'s an incident?',
    ],
    modernStorageOffers:
      'Yes — Modern Storage® Arkansas facilities deploy video surveillance systems with coverage at entry points and driveways. Specific camera count and retention varies by facility — contact the local facility for details.',
  },
  {
    id: 'perimeter-fencing',
    name: 'Perimeter fencing',
    whatItIs:
      'A continuous fence around the entire property boundary — typically chain-link or steel — designed to prevent any approach to the units except through the controlled entry gate.',
    whyItMatters:
      'Without perimeter fencing, the entry gate is mostly theatrical — someone determined to break in can walk around it. A continuous fence forces all access through the controlled gate, where the keypad, lighting, and cameras concentrate.',
    questionsToAsk: [
      'Is there continuous fencing around the entire property?',
      'Is the fence well-maintained, with no gaps or compromised sections?',
      'Are there secondary access points and are they also gated?',
    ],
    modernStorageOffers:
      'Yes — Modern Storage® Arkansas facilities are surrounded by perimeter fencing. Material and height vary by location and zoning.',
  },
  {
    id: 'exterior-lighting',
    name: 'Bright exterior lighting',
    whatItIs:
      'Lighting along unit rows, driveways, and parking areas that activates at dusk and runs through the night, plus motion-activated lighting at key points. Well-lit facilities are a known deterrent.',
    whyItMatters:
      'A dark facility at night is an invitation. Bright lighting makes cameras more effective, gives tenants confidence accessing their unit after hours, and removes the cover that would-be intruders rely on.',
    questionsToAsk: [
      'Is the facility well-lit at night?',
      'Are unit rows specifically lit, or just the driveway?',
      'Is there motion-activated lighting in driveways?',
      'When does after-hours lighting turn on?',
    ],
    modernStorageOffers:
      'Yes — Modern Storage® Arkansas facilities use exterior lighting at unit rows, driveways, and the entry gate. Coverage and motion-activated features vary by location.',
  },
  {
    id: 'disc-locks',
    name: 'Disc locks (not padlocks)',
    whatItIs:
      'A disc-shaped lock with a shrouded shackle that resists bolt cutters, hacksaws, and pry bars. Disc locks replace standard padlocks at most modern self-storage facilities because padlocks are easy to cut.',
    whyItMatters:
      'The unit door lock is the last line of defense. A standard padlock with an exposed shackle can be cut in under a minute with bolt cutters. A disc lock with a recessed shackle has nothing for the bolt cutter to grip — it forces a would-be thief to either pick the lock (slow) or move on.',
    questionsToAsk: [
      'Does the facility require a disc lock, or allow any padlock?',
      'Does the facility sell disc locks at the office for customers who didn\'t bring one?',
      'Is the lock the customer\'s responsibility, or does the facility provide one?',
    ],
    modernStorageOffers:
      'Yes — Modern Storage® strongly recommends a disc lock for every rental and sells disc locks at the office at move-in if a customer needs one. The tenant holds the only key — facility staff do not retain customer keys.',
  },
  {
    id: 'on-site-management',
    name: 'On-site or nearby management',
    whatItIs:
      'A property manager or rental office on-site during business hours who can respond to incidents, sign new tenants in, and visually monitor the facility. Some operations also use roving district managers across multiple facilities.',
    whyItMatters:
      'On-site management catches things technology misses. A manager who knows the facility notices when something looks off — a strange vehicle, a unit door ajar, lighting that\'s out. Tech-only facilities can be hacked or vandalized off-hours with no human response.',
    questionsToAsk: [
      'Is there a manager on-site during business hours?',
      'Who responds to incidents outside of office hours?',
      'How does the facility communicate with tenants about issues?',
    ],
    modernStorageOffers:
      'Yes — Modern Storage® facilities are staffed during business hours, with district managers across the Arkansas portfolio. Customer service is centralized at 501-910-0096.',
  },
] as const

// What to do BEFORE you rent. Checklist format — each item is one specific
// thing a customer can verify themselves. AI engines love checklists.
const PRE_RENT_CHECKLIST = [
  'Drive past the facility at night to confirm it\'s well-lit and visible from the road',
  'Walk the perimeter to look for gaps, damaged fencing, or unmonitored access points',
  'Ask the front office how often security incidents are reported and how they\'re handled',
  'Confirm cameras are positioned at the entry gate AND in unit-row driveways',
  'Confirm you get a personal keypad code, not a shared facility code',
  'Confirm tenants are required to bring or buy a disc lock — not a standard padlock',
  'Ask whether the facility maintains a current pest-control program (mice and roaches damage stored items)',
  'Ask whether insurance or a tenant protection plan is required',
  'Confirm what hours gate access is available — 24/7, extended hours, or office hours only',
  'Confirm what happens to your unit and lock if you fall behind on payment',
] as const

const FAQS = [
  {
    q: 'Are self-storage units safe?',
    a: `Yes — modern self-storage facilities with gated access, video surveillance, perimeter fencing, exterior lighting, and disc locks are a secure place to store belongings. The combination of layered features (you have to get past the gate AND the camera AND the fence AND the lock to reach a unit) is what makes the model work. Storage incidents at well-secured facilities are rare. To evaluate a specific facility, use the security checklist in this guide — drive past at night, confirm the gate, fencing, and lighting, and ask the front office about cameras and lock requirements.`,
  },
  {
    q: 'What security features should I look for in a self-storage facility?',
    a: `Look for six core features: (1) a perimeter gate with personal access codes issued to each tenant, (2) video surveillance at the gate and in unit-row driveways, (3) continuous perimeter fencing around the property, (4) bright exterior lighting at night, (5) a disc-lock requirement (not standard padlocks), and (6) on-site or nearby management during business hours. Facilities that combine all six are significantly more secure than those missing one or more. Modern Storage® Arkansas facilities deploy this combination as standard.`,
  },
  {
    q: 'How secure are Modern Storage® units?',
    a: `Modern Storage® Arkansas facilities are secured with gated access (personal access codes per tenant), video surveillance, perimeter fencing, exterior lighting, and a disc-lock recommendation for every unit. Tenants hold the only key to their unit — facility staff do not retain customer lock keys. Specific camera coverage and lighting vary by location; ask the local facility office for facility-specific details. Tenant insurance or a tenant protection plan is required at move-in.`,
  },
  {
    q: 'Is a padlock or a disc lock better for a storage unit?',
    a: `A disc lock is significantly better than a standard padlock for self-storage. Standard padlocks have an exposed shackle that bolt cutters can sever in under a minute. Disc locks have a recessed, shrouded shackle that bolt cutters cannot grip — the would-be thief has to pick the lock (slow and conspicuous) or move on. Disc locks also resist weather better, which matters for outdoor drive-up units. Modern Storage® sells disc locks at the office for customers who need one at move-in.`,
  },
  {
    q: 'Do storage units have cameras inside the unit?',
    a: `No — Modern Storage® and other reputable self-storage operators do NOT place cameras inside individual rented units. That would violate tenant privacy. Cameras are positioned at the entry gate, in unit-row driveways, and at common areas to monitor approach and access. Once a tenant\'s unit is locked, what\'s inside is private to the tenant.`,
  },
  {
    q: 'What happens if there\'s a break-in at a storage unit?',
    a: `If there\'s a break-in, the facility reviews video footage and contacts the affected tenant. Local law enforcement is engaged for the investigation. The tenant files a claim with their insurance or tenant protection plan (which is why coverage is required at move-in). Modern Storage® facilities are designed to make break-ins difficult, but no facility — and no insurance — eliminates risk entirely. Reputable operators are transparent about incident history when customers ask.`,
  },
  {
    q: 'Are storage units checked or inspected by staff?',
    a: `Modern Storage® staff do not enter rented units — that would violate tenant privacy. Staff do walk the property regularly during business hours to check for issues like unit doors left open by a tenant in a hurry, damaged locks, broken lights, lot debris, and signs of unauthorized access. Facilities also use video surveillance for ongoing automated monitoring. If staff notice an apparent problem with a specific unit (door ajar, broken lock), they\'ll attempt to contact the tenant.`,
  },
  {
    q: 'Should I buy storage insurance?',
    a: `Yes — most reputable self-storage facilities, including Modern Storage®, require either proof of qualifying insurance (often homeowners or renters policies that extend to off-premises storage at no extra cost) or enrollment in a tenant protection plan offered at move-in. Tenant protection plans are typically a few dollars per $1,000 of declared value and cover common loss types like fire, theft, and water damage subject to plan terms. Check your existing homeowners or renters policy first — many already cover off-premises storage at no additional cost.`,
  },
  {
    q: 'Are climate-controlled units more secure than drive-up units?',
    a: `Climate-controlled units are typically more secure than drive-up units because they sit inside an enclosed building behind a second locked door (the building entry door) — a would-be thief has to defeat the gate, the building door, AND the unit lock. Drive-up units have only the gate and the unit lock between them and the property perimeter. That said, well-secured drive-up units at a facility with gated access, video surveillance, and bright lighting are still significantly more secure than units at a poorly-secured facility of any kind.`,
  },
  {
    q: 'Can I add my own security camera or alarm to my storage unit?',
    a: `Some facilities allow tenants to install personal security devices (Wi-Fi cameras, motion sensors, smart locks); others do not. Check with your specific Modern Storage® location before installing anything. Power is typically not available inside individual rented units, which limits options. Battery-powered Wi-Fi cameras and motion-activated alerts are the most common tenant-added security. Anything installed must be removed when you move out.`,
  },
  {
    q: 'What\'s the safest way to pack a storage unit?',
    a: `Pack a storage unit so valuables aren\'t visible if a unit is briefly opened. Keep electronics, jewelry, documents, and high-value items in unmarked boxes toward the back of the unit, behind larger furniture. Don\'t label boxes "ELECTRONICS" or "TOOLS" on the outside — use neutral labels and a separate inventory list kept at home. Photograph or video your unit contents at move-in for insurance purposes. And keep an updated inventory list off-site (cloud storage, email to yourself).`,
  },
  {
    q: 'How can I confirm a storage facility is actually secure?',
    a: `Use the checklist in this guide before you sign anything. Drive past at night to confirm lighting. Walk the perimeter to look for fencing gaps. Confirm gate operation and ask whether you\'ll receive a personal access code. Ask where the cameras are. Confirm whether disc locks are required. Ask how incidents are reported and handled. A facility that answers all these questions transparently is far more trustworthy than one that deflects. Modern Storage® Arkansas locations welcome these questions at move-in.`,
  },
] as const

function buildJsonLd() {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': SITE_URL + PAGE_PATH + '#article',
    headline: 'Storage Unit Security Guide — What to Look For',
    description:
      'Storage unit security guide — gated access, keypad entry codes, perimeter fencing, exterior lighting, video surveillance, disc locks, and the checklist of features to look for before renting a self-storage unit in Arkansas.',
    image: SITE_URL + HERO_IMAGE,
    author: { '@id': SITE_URL + '/#organization' },
    publisher: { '@id': SITE_URL + '/#organization' },
    datePublished: '2026-05-30',
    dateModified: '2026-05-30',
    mainEntityOfPage: SITE_URL + PAGE_PATH,
    url: SITE_URL + PAGE_PATH,
  }

  // HowTo schema for the pre-rent checklist — Google rewards HowTo with rich
  // results, and the checklist format is exactly what AI engines extract.
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': SITE_URL + PAGE_PATH + '#howto',
    name: 'How to Evaluate Self-Storage Security Before You Rent',
    description:
      'Ten-step checklist for verifying that a self-storage facility is actually secure before signing a rental agreement.',
    step: PRE_RENT_CHECKLIST.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `Step ${i + 1}`,
      text: step,
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: SITE_URL + '/guides' },
      { '@type': 'ListItem', position: 3, name: 'Storage Security', item: SITE_URL + PAGE_PATH },
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

  return [article, howTo, breadcrumb, faqPage]
}

export default async function StorageSecurityGuidePage() {
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
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/guides" className="hover:text-modern-red transition-colors">Guides</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Storage Security</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
                Storage Security Guide
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                What Makes a Storage Facility <span className="text-modern-red">Actually Secure</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                A secure self-storage facility uses six layered features: <strong className="text-white">gated access with personal codes, video surveillance, perimeter fencing, exterior lighting, disc locks, and on-site management</strong>. No single feature is enough on its own — the combination is what works. This guide breaks each one down, explains what to verify before you rent, and gives you a pre-rent checklist to evaluate any facility.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#checklist"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Jump to the Pre-Rent Checklist
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/#locations"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  See Modern Storage® Locations
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-800 relative">
                <Image
                  src={HERO_IMAGE}
                  alt={HERO_ALT}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIX CORE SECURITY FEATURES ─────────────────────────── */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Core security features</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              The Six Layers of Self-Storage Security
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              These are the features a reputable self-storage facility deploys as a baseline. Tap any feature to jump to its full explanation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
            {SECURITY_FEATURES.map((f, i) => (
              <Link
                key={f.id}
                href={`#${f.id}`}
                className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-modern-red rounded-2xl p-5 transition-all flex items-start gap-4"
              >
                <span className="font-bebas text-3xl text-modern-red leading-none shrink-0">{i + 1}</span>
                <div>
                  <h3 className="font-black text-charcoal text-base leading-tight group-hover:text-modern-red transition-colors mb-1">
                    {f.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-snug">{f.whatItIs.substring(0, 110)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PER-FEATURE DEEP DIVES ─────────────────────────────── */}
      {SECURITY_FEATURES.map((f, idx) => (
        <section
          key={f.id}
          id={f.id}
          className={`py-12 lg:py-16 border-b border-gray-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Security feature {idx + 1} of {SECURITY_FEATURES.length}
            </p>
            <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-5">
              {f.name}
            </h2>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-5">
              <p className="text-xs font-black uppercase tracking-widest text-charcoal mb-2">What it is</p>
              <p className="text-gray-700 leading-relaxed">{f.whatItIs}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-5">
              <p className="text-xs font-black uppercase tracking-widest text-charcoal mb-2">Why it matters</p>
              <p className="text-gray-700 leading-relaxed">{f.whyItMatters}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-xs font-black uppercase tracking-widest text-charcoal mb-3">Questions to ask the facility</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {f.questionsToAsk.map((q) => (
                    <li key={q} className="flex gap-2.5">
                      <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-modern-red/5 border border-modern-red/20 rounded-2xl p-6">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">At Modern Storage®</p>
                <p className="text-sm text-charcoal leading-relaxed">{f.modernStorageOffers}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── PRE-RENT CHECKLIST ──────────────────────────────────── */}
      <section id="checklist" className="bg-charcoal text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Pre-rent checklist</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              Ten Things to Verify Before You Sign
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              A real-world checklist for evaluating any self-storage facility — Modern Storage® or otherwise — before committing to a rental. Walk through each item; a facility that answers all ten transparently is a facility you can trust.
            </p>
          </div>

          <ol className="space-y-3">
            {PRE_RENT_CHECKLIST.map((item, i) => (
              <li key={item} className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4">
                <span className="font-bebas text-3xl text-modern-red leading-none shrink-0 w-10">{(i + 1).toString().padStart(2, '0')}</span>
                <p className="text-gray-200 leading-relaxed pt-1.5">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-3">
              Storage Security FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              The most-asked questions about self-storage security — written answer-first for People Also Ask, AI Overview, and direct customer reference.
            </p>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Rent at a Facility That Checks Every Box
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Every Modern Storage® Arkansas location is built around the six security layers in this guide. Pick the closest facility, ask any of the questions above at move-in, and reserve online in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#locations"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Find a Location
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={settings.phoneHref}
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md"
            >
              Call for New Rentals
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
