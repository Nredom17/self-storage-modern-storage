import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'

export const revalidate = 60

const PAGE_PATH = '/guides'

export const metadata: Metadata = {
  title: {
    absolute: 'Self Storage Guides & Long-Form Content | Modern Storage®',
  },
  description:
    'In-depth Modern Storage® guides on apartment storage, moving storage, contractor and business storage, boat & RV storage near Beaver Lake, supplier storage in Bentonville, and climate-controlled storage for Arkansas humidity.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Self Storage Guides | Modern Storage®',
    description:
      'In-depth guides on apartment, moving, contractor, business, boat/RV, and climate-controlled storage in Arkansas.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Self Storage Guides | Modern Storage®',
    description: 'In-depth Modern Storage® storage guides for Arkansas customers.',
  },
}

// Single source of truth for every published guide. /guides hub renders this
// list, the footer "Storage Guides" section lists it, and the sitemap
// includes the URLs. New cluster hubs added here propagate automatically.
const GUIDES = [
  // Headline guide — listed first because it targets the highest-volume
  // PAA + AI-Overview queries ("what size storage unit do I need", "how big
  // is a 10x10 storage unit", etc.). Mirrors the proven AI-citation pattern
  // on the legacy domain's /blog/the-complete-guide-to-storage-unit-sizes
  // (cited 175 times in AI Overviews and AI Mode).
  {
    href: '/guides/storage-unit-sizes',
    cluster: 'Sizing',
    title: 'Storage Unit Sizes Guide',
    description:
      'Complete walkthrough of every Modern Storage® unit size — 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 — with what fits in each, climate-controlled vs drive-up pricing, and how to pick the right size for your situation.',
  },
  {
    // Security guide — mirrors the legacy domain's #2 AI-cited blog
    // (/blog/the-top-4-storage-unit-security-must-haves-1, 39 prompts).
    // Six layered features explained with a 10-step pre-rent checklist.
    href: '/guides/storage-security',
    cluster: 'Security',
    title: 'Storage Unit Security Guide',
    description:
      'What makes a storage facility actually secure — gated access, video surveillance, perimeter fencing, exterior lighting, disc locks, and on-site management — plus a 10-step pre-rent checklist for evaluating any facility.',
  },
  {
    href: '/guides/apartment-storage',
    cluster: 'Residential',
    title: 'Apartment Storage Guide',
    description:
      'Renting a small apartment? Compare 5x5 and 5x10 storage unit sizes, college-storage strategies, and which Modern Storage® Arkansas locations are closest to apartment complexes.',
  },
  {
    href: '/guides/moving-storage',
    cluster: 'Residential',
    title: 'Storage During a Move',
    description:
      'Storage between leases, military PCS, long-distance relocation, and renovation moves. Pair with the free moving truck for one-trip move-in.',
  },
  {
    href: '/climate-controlled-arkansas-humidity',
    cluster: 'Climate',
    title: 'Climate-Controlled Storage for Arkansas Humidity',
    description:
      'How Arkansas humidity damages stored belongings — month-by-month humidity table, garage vs. attic vs. climate-controlled temperature comparison, and what belongs indoors.',
  },
  {
    href: '/business-storage-bentonville',
    cluster: 'Business',
    title: 'Supplier & Business Storage in Bentonville',
    description:
      'Climate-controlled and business storage for NWA vendors, suppliers, e-commerce sellers, and Bentonville-area small businesses. Near the Walmart Home Office area.',
  },
  {
    href: '/contractor-storage-little-rock',
    cluster: 'Business',
    title: 'Contractor Storage in Little Rock',
    description:
      'Tools, jobsite overflow, restoration crew kits, and trade inventory storage at four Little Rock area Modern Storage® locations.',
  },
  {
    href: '/storage-near-beaver-lake',
    cluster: 'Boat & RV',
    title: 'Boat & RV Storage Near Beaver Lake',
    description:
      'Off-season boat storage, year-round RV parking, and trailer spaces minutes from Beaver Lake marinas. Lowell location on I-49 between Rogers and Springdale.',
  },
] as const

function buildJsonLd() {
  // CollectionPage describes this page as a curated list of guides.
  // ItemList enumerates the guides for crawlers and AI search.
  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': SITE_URL + PAGE_PATH + '#guides',
    name: 'Self Storage Guides | Modern Storage®',
    description:
      'In-depth Modern Storage® guides covering apartment storage, moving storage, business and contractor storage, boat/RV storage near Beaver Lake, supplier storage in Bentonville, and climate-controlled storage for Arkansas humidity.',
    url: SITE_URL + PAGE_PATH,
    isPartOf: { '@id': SITE_URL + '/#organization' },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: GUIDES.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: g.title,
        url: SITE_URL + g.href,
        description: g.description,
      })),
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: SITE_URL + PAGE_PATH },
    ],
  }

  return [collectionPage, breadcrumb]
}

// Group guides by cluster for visual grouping on the page.
function groupByCluster() {
  const clusters: Record<string, typeof GUIDES[number][]> = {}
  for (const g of GUIDES) {
    if (!clusters[g.cluster]) clusters[g.cluster] = []
    clusters[g.cluster].push(g)
  }
  return clusters
}

export default async function GuidesHubPage() {
  await getSiteSettings()
  const jsonLd = buildJsonLd()
  const clusters = groupByCluster()

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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
              <li className="text-gray-300">Guides</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
              Storage Guides
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Modern Storage<sup className="text-[0.55em] font-bold -top-[0.6em] relative ml-0.5">®</sup>{' '}
              <span className="text-modern-red">Storage Guides</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              In-depth guides for the situations Modern Storage® customers face most — apartment moves, life transitions, business inventory, lake-area boat and RV storage, and protecting belongings from Arkansas humidity. Each guide links to the right facility, the right unit size, and the next step.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {Object.entries(clusters).map(([cluster, guides]) => (
            <div key={cluster} className="mb-16 last:mb-0">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
                {cluster}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {guides.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
                  >
                    <h2 className="text-lg font-black text-charcoal leading-tight mb-3 group-hover:text-modern-red transition-colors">
                      {g.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                      {g.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-modern-red">
                      Read guide →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
            Quick links
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-8">
            Or jump straight to a category page
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/climate-controlled" className="bg-white hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">
              Climate-Controlled Storage
            </Link>
            <Link href="/household-storage" className="bg-white hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">
              Household Storage
            </Link>
            <Link href="/rv-boat-vehicle" className="bg-white hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">
              Boat &amp; RV Storage
            </Link>
            <Link href="/business-storage" className="bg-white hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">
              Business Storage
            </Link>
            <Link href="/free-moving-truck" className="bg-white hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">
              Free Moving Truck
            </Link>
            <Link href="/size-guide" className="bg-white hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">
              Unit Size Guide
            </Link>
            <Link href="/locations" className="bg-white hover:bg-modern-red hover:text-white text-charcoal text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-gray-200">
              All 10 Locations
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
