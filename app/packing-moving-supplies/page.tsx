import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

export const revalidate = 60

const PAGE_PATH = '/packing-moving-supplies'

export const metadata: Metadata = {
  title: {
    absolute: 'Packing & Moving Supplies | Modern Storage®',
  },
  description:
    'Boxes, tape, locks, bubble wrap, mattress covers, and other moving and packing supplies available for purchase on-site at Modern Storage® — to help with storage, moving, and organization. Selection varies by location.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Packing & Moving Supplies | Modern Storage®',
    description:
      'Boxes, tape, bubble wrap, covers, and locks available at Modern Storage® locations across Arkansas.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Packing & Moving Supplies | Modern Storage®',
    description:
      'Boxes, tape, bubble wrap, covers, and locks at Modern Storage® locations across Arkansas.',
  },
}

const SUPPLIES = [
  {
    title: 'Moving boxes',
    body:
      'Small, medium, large, and wardrobe boxes for everything from books to closets. Right-sized boxes pack tighter, stack safer, and make the most of your unit.',
  },
  {
    title: 'Packing tape',
    body:
      'Heavy-duty packing tape to seal boxes securely so they hold up through loading, transport, and stacking in storage.',
  },
  {
    title: 'Bubble wrap & packing paper',
    body:
      'Bubble wrap and packing paper to cushion dishes, glassware, electronics, and other fragile items before they go in the box.',
  },
  {
    title: 'Mattress & furniture covers',
    body:
      'Protective covers and plastic to keep mattresses, sofas, and upholstered furniture clean and dust-free during a move or long-term storage.',
  },
  {
    title: 'Locks & disc locks',
    body:
      'Disc locks and padlocks to secure your unit. A quality lock is the simplest way to protect what you store.',
  },
  {
    title: 'Stretch wrap, markers & labels',
    body:
      'Stretch wrap to bundle awkward items, plus markers and labels so you can find what you need without opening every box.',
  },
] as const

const FAQS = [
  {
    q: 'Does Modern Storage® sell moving boxes and packing supplies?',
    a: `Yes — boxes, tape, locks, bubble wrap, mattress covers, and other moving and packing supplies are available for purchase on-site at participating Modern Storage® locations to help with storage, moving, and organization. Selection and availability vary by location, so call 501-910-0096 or check with your local Modern Storage® location to confirm what's in stock before you visit.`,
  },
  {
    q: 'What packing supplies do you carry?',
    a: `Locations typically stock moving boxes in several sizes, packing tape, bubble wrap, packing paper, mattress and furniture covers, disc locks, and markers. Exact selection varies by location and current inventory. Pick up supplies when you reserve your unit so you have everything you need on move-in day.`,
  },
  {
    q: 'Do I have to rent a unit to buy packing supplies?',
    a: `Packing supplies are a convenience for storage and moving customers. Whether supplies can be purchased without a rental depends on the location — contact your nearest Modern Storage® facility at 501-910-0096 to confirm.`,
  },
  {
    q: 'Which Modern Storage® locations have packing supplies?',
    a: `Packing and moving supplies are available at participating Modern Storage® locations across Arkansas — including Little Rock, North Little Rock, Bryant, Hot Springs, Bentonville, Springdale, and Lowell. Inventory varies by store, so confirm availability with your local location before visiting.`,
  },
  {
    q: 'Do you also offer a free moving truck?',
    a: `Yes — Modern Storage® offers a free moving truck with new rentals at participating Arkansas locations. Pairing the free moving truck with the right boxes and packing supplies makes move-in day far easier. Truck availability, mileage, and terms vary by location.`,
  },
  {
    q: 'How many boxes do I need for my move?',
    a: `It depends on how much you're packing. A studio or one-bedroom might need 10-20 boxes; a full home needs many more. Use the Modern Storage® Size Guide and Move-In Checklist to estimate boxes and the right unit size before you start packing.`,
  },
] as const

function buildJsonLd(phoneDisplay: string) {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Packing & Moving Supplies',
    name: 'Packing & Moving Supplies',
    description:
      'Boxes, tape, locks, bubble wrap, mattress covers, and other moving and packing supplies available for purchase on-site at Modern Storage® to help with storage, moving, and organization. Selection varies by location.',
    url: SITE_URL + PAGE_PATH,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    // Repointed to sitewide #organization @id to avoid emitting a nested
    // SelfStorage with no PostalAddress (a Semrush markup-error trigger).
    provider: { '@id': SITE_URL + '/#organization' },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Packing & Moving Supplies', item: SITE_URL + PAGE_PATH },
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

  return [service, breadcrumb, faqPage]
}

export default async function PackingSuppliesPage() {
  const settings = await getSiteSettings()
  const jsonLd = buildJsonLd(settings.phoneDisplay)
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
              <li className="text-gray-300">Packing &amp; Moving Supplies</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              Moving Made Easier
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Packing &amp; <span className="text-modern-red">Moving Supplies</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              Boxes, tape, locks, bubble wrap, mattress covers, and other moving and packing
              supplies available for purchase on-site to help with storage, moving, and
              organization. Grab everything you need in one stop at Modern Storage® — selection
              varies by location.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#locations" className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm">
                Find a Location
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/free-moving-truck" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                Free Moving Truck
              </Link>
              <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm">
                Call for New Rentals
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">What we carry</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Packing Supplies Available at Modern Storage®
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              From the first box to the last lock, Modern Storage® locations stock the essentials for a
              smoother move. Selection and availability vary by facility — call your local store to confirm
              what&apos;s in stock.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUPPLIES.map((s) => (
              <div key={s.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-modern-red/10 text-modern-red flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-black text-charcoal mb-2 leading-tight">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Why buy supplies here</p>
          <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-6">
            One Stop for Storage and Supplies
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Picking up supplies where you store saves a trip. Reserve your unit, grab the right boxes and
              packing materials, and you&apos;re ready for move-in day. Pair supplies with our{' '}
              <Link href="/free-moving-truck" className="text-modern-red font-semibold hover:underline">free moving truck</Link>{' '}
              at participating locations to move everything in one go.
            </p>
            <p>
              Right-sized boxes and proper padding matter even more for{' '}
              <Link href="/climate-controlled" className="text-modern-red font-semibold hover:underline">climate-controlled</Link>{' '}
              and long-term storage — sturdy, well-packed boxes stack safely and protect what&apos;s inside.
              Not sure how much you&apos;ll need? Use the{' '}
              <Link href="/size-guide" className="text-modern-red font-semibold hover:underline">Size Guide</Link>{' '}
              and{' '}
              <Link href="/move-in-checklist" className="text-modern-red font-semibold hover:underline">Move-In Checklist</Link>{' '}
              to estimate boxes and the right unit size before you start packing.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight">
              Packing &amp; Moving Supplies FAQ
            </h2>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      <section className="bg-modern-red py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Get Your Packing Supplies at Modern Storage®
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Boxes, tape, bubble wrap, covers, and locks — available at Modern Storage® locations across
            Arkansas. Find your nearest location, then pick up everything you need when you reserve.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#locations" className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md">
              Find a Location
            </Link>
            <Link href="/free-moving-truck" className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md">
              Free Moving Truck
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
