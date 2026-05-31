import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

// Re-render every 60s to pick up Supabase site-settings edits without redeploy.
export const revalidate = 60

const PAGE_PATH = '/guides/storage-unit-sizes'
const HERO_IMAGE = '/images/modern-storage-10x15-climate-controlled-unit.png'
const HERO_ALT =
  'Modern Storage® 10x15 climate-controlled storage unit interior — a popular Arkansas self-storage size for two-bedroom apartments and small homes'

// SEO + AI-visibility target: this is the answer-first deep guide built to mirror
// the proven AI-citation pattern on modernstorage.com/blog/the-complete-guide-to-
// storage-unit-sizes (175 LLM prompts cite it). Each per-size section leads with
// the direct answer to "what fits in a [size] storage unit?" so PAA boxes and AI
// extractors can quote a clean snippet without paraphrase loss.
export const metadata: Metadata = {
  title: {
    absolute: 'Storage Unit Sizes Guide — 5x5, 5x10, 10x10, 10x15, 10x20, 10x30 | Modern Storage®',
  },
  description:
    'Complete storage unit sizes guide for Arkansas customers — 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 storage units, what fits in each, climate-controlled vs drive-up, and how to choose the right size at Modern Storage®.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Storage Unit Sizes Guide | Modern Storage®',
    description:
      'Storage unit sizes guide — what fits in 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 storage units, and how to choose the right size in Arkansas.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'article',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1000, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storage Unit Sizes Guide | Modern Storage®',
    description: 'Storage unit sizes guide — 5x5 through 10x30 with what fits and how to choose.',
    images: [HERO_IMAGE],
  },
}

// Per-size deep content. Each entry is rendered as its own H2 section with a
// linked anchor (#size-5x5, #size-5x10, etc.) so AI engines and Google can pull
// individual section snippets, and so customers can deep-link to specific sizes
// from the table of contents and from /size-guide.
type SizeDetail = {
  size: string
  sqft: string
  sqftNum: number
  ceiling: string
  image: string
  alt: string
  // First sentence is the direct answer for "what fits in [size]?" — written
  // tight enough for PAA and AI Overview extraction.
  answerFirst: string
  fits: string[]
  bestFor: string[]
  notFor: string[]
  monthlyDriveUp: string
  monthlyClimate: string
  comparison: string
}

const SIZE_DETAILS: SizeDetail[] = [
  {
    size: '5x5',
    sqft: '25 sq ft',
    sqftNum: 25,
    ceiling: '~8 ft ceiling',
    image: '/images/modern-storage-5x5-climate-controlled-unit.png',
    alt: 'Modern Storage® 5x5 climate-controlled storage unit interior — smallest unit size for closet overflow and dorm storage in Arkansas',
    answerFirst:
      'A 5x5 storage unit fits the contents of a single closet or a college dorm room — roughly 15-20 boxes, a small dresser, a chair, and seasonal items. It is the smallest Modern Storage® unit size and works well for short-term overflow, document storage, holiday decor, and college students storing dorm gear between semesters.',
    fits: [
      '15-20 medium moving boxes (1.5 cu ft each)',
      'Small dresser or 3-drawer chest',
      'Boxed clothing and personal items',
      'Holiday decor, holiday tree, wreaths',
      'Single mattress (twin or full, on edge)',
      'Lamp, chair, and a few small framed items',
      'Sporting goods (golf clubs, fishing rods, bikes)',
      'File boxes and small business records',
    ],
    bestFor: [
      'College dorm storage between semesters',
      'Single-closet overflow at home',
      'Document and small business records storage',
      'Holiday and seasonal item storage',
      'Apartment overflow when you only need a little extra space',
    ],
    notFor: [
      'Whole-room or full-apartment storage',
      'Sofas, full mattress sets with frames, or dining tables',
      'Multi-piece appliances',
    ],
    monthlyDriveUp: '$25 – $45 / month',
    monthlyClimate: '$35 – $60 / month',
    comparison:
      'A 5x5 is half the floor space of a 5x10. If you have a single bedroom, a sofa, or a mattress set with a frame, choose a 5x10 instead.',
  },
  {
    size: '5x10',
    sqft: '50 sq ft',
    sqftNum: 50,
    ceiling: '~8 ft ceiling',
    image: '/images/modern-storage-5x10-climate-controlled-unit.png',
    alt: 'Modern Storage® 5x10 climate-controlled storage unit interior — popular Arkansas size for studio apartments and single bedrooms',
    answerFirst:
      'A 5x10 storage unit fits the contents of a studio apartment or a single bedroom — a mattress set, dresser, small sofa, a few chairs, and 10-15 boxes. It is one of the most popular Modern Storage® sizes and is sized similarly to a walk-in closet.',
    fits: [
      'Mattress and box spring (queen or smaller)',
      'Dresser or 6-drawer chest',
      'Small sofa or loveseat',
      'Coffee table or end tables',
      'Single TV (boxed) and a few small electronics',
      '10-15 moving boxes',
      'Bicycle or two stand-up bikes',
      'Boxed kitchenware and small appliances',
    ],
    bestFor: [
      'Studio apartment storage',
      'Single bedroom worth of furniture and boxes',
      'College storage between semesters or after graduation',
      'Apartment storage during a move or renovation',
      'Storing extra furniture when a roommate moves in or out',
    ],
    notFor: [
      'Full one-bedroom apartment with multiple rooms of furniture',
      'King-size mattress with full bedroom set',
      'Storing more than ~15 boxes plus furniture',
    ],
    monthlyDriveUp: '$45 – $75 / month',
    monthlyClimate: '$60 – $95 / month',
    comparison:
      'A 5x10 is half the floor space of a 10x10. If you are storing the contents of an entire one-bedroom apartment, including living-room furniture, step up to a 10x10.',
  },
  {
    size: '10x10',
    sqft: '100 sq ft',
    sqftNum: 100,
    ceiling: '~8 ft ceiling',
    image: '/images/modern-storage-10x10-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x10 climate-controlled storage unit interior — popular Arkansas size for one-bedroom apartments',
    answerFirst:
      'A 10x10 storage unit fits the contents of a one-bedroom apartment — a queen bed and frame, dresser, sofa, coffee table, TV, dining set, and 15-20 boxes. It is the most-rented self-storage unit size in Arkansas and is roughly the floor area of a small bedroom.',
    fits: [
      'Queen or king mattress with bed frame',
      'Dresser and one or two nightstands',
      'Full-size sofa with cushions',
      'Coffee table and end tables',
      'TV stand and 1-2 TVs',
      'Small dining table with four chairs',
      'Bookshelf, lamp, and small accent furniture',
      '15-20 moving boxes',
    ],
    bestFor: [
      'Full one-bedroom apartment storage',
      'Storing a single bedroom plus a living room',
      'Long-distance moves with apartment-sized furniture',
      'Downsizing from a small home to an apartment',
      'Business inventory and document storage',
    ],
    notFor: [
      'Full two-bedroom apartment with multiple rooms',
      'Large sectional sofas plus multiple bedrooms',
      'Full-size appliances (washer, dryer, refrigerator) plus a bedroom set',
    ],
    monthlyDriveUp: '$80 – $140 / month',
    monthlyClimate: '$110 – $180 / month',
    comparison:
      'A 10x10 is one-third smaller than a 10x15. If you have an oversized sectional, multiple beds, or two-bedroom apartment contents, choose a 10x15 instead.',
  },
  {
    size: '10x15',
    sqft: '150 sq ft',
    sqftNum: 150,
    ceiling: '~8 ft ceiling',
    image: '/images/modern-storage-10x15-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x15 climate-controlled storage unit interior — popular Arkansas size for two-bedroom homes and renovation storage',
    answerFirst:
      'A 10x15 storage unit fits the contents of a two-bedroom apartment or small home — two mattress sets, dressers, sofa, coffee table, dining set, TV, and 20-30 boxes. It is a popular size for whole-apartment moves, renovation storage, and customers who want room to walk inside the unit.',
    fits: [
      'Two queen or king mattress sets with frames',
      'Two dressers, two nightstands',
      'Sofa and loveseat or sectional',
      'Coffee table and end tables',
      'TV stand and 2-3 TVs',
      'Full dining table with 4-6 chairs',
      'Multiple bookshelves and accent pieces',
      '20-30 moving boxes',
    ],
    bestFor: [
      'Two-bedroom apartment storage',
      'Small home storage during a renovation',
      'Whole-apartment moves between leases',
      'Long-distance moves with two-bedroom contents',
      'Business inventory plus document storage',
    ],
    notFor: [
      'Three- and four-bedroom homes with multiple rooms of large furniture',
      'Vehicle storage (use a parking space or 10x20 instead)',
      'Multiple appliances plus a full home of furniture',
    ],
    monthlyDriveUp: '$110 – $180 / month',
    monthlyClimate: '$150 – $230 / month',
    comparison:
      'A 10x15 is one-quarter smaller than a 10x20. If you have a full three-bedroom home, step up to a 10x20 for more breathing room.',
  },
  {
    size: '10x20',
    sqft: '200 sq ft',
    sqftNum: 200,
    ceiling: '~8 ft ceiling',
    image: '/images/modern-storage-10x20-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x20 climate-controlled storage unit interior — Arkansas size for three-bedroom homes and full-home storage',
    answerFirst:
      'A 10x20 storage unit fits the contents of a three-bedroom home — multiple mattress sets, dressers, a full living room, a dining set, appliances, and 30-50 boxes. It is roughly the size of a one-car garage and is also large enough to store a single mid-size car.',
    fits: [
      'Three or more mattress sets with frames',
      'Multiple dressers and nightstands',
      'Full sectional sofa plus loveseat',
      'Full dining table with 6-8 chairs',
      'Refrigerator, washer, and dryer',
      'Multiple TVs and entertainment center',
      'Patio furniture and outdoor gear',
      '30-50 moving boxes',
      'Single mid-size car (if no other contents)',
    ],
    bestFor: [
      'Three-bedroom home storage',
      'Full-home storage during a long-distance move',
      'Garage-contents storage during a renovation',
      'Vehicle storage for a single mid-size car',
      'Business inventory and e-commerce storage',
    ],
    notFor: [
      'Five-bedroom homes with extensive furniture',
      'Large boats, RVs, or oversized trailers (use parking storage instead)',
    ],
    monthlyDriveUp: '$150 – $250 / month',
    monthlyClimate: '$200 – $310 / month',
    comparison:
      'A 10x20 is one-third smaller than a 10x30. If you have a four- or five-bedroom home, a workshop, or extensive business inventory, choose a 10x30 instead.',
  },
  {
    size: '10x30',
    sqft: '300 sq ft',
    sqftNum: 300,
    ceiling: '~8 ft ceiling',
    image: '/images/modern-storage-10x30-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x30 climate-controlled storage unit interior — largest Arkansas size for four- and five-bedroom homes',
    answerFirst:
      'A 10x30 storage unit fits the contents of a four- or five-bedroom home — multiple bedrooms of furniture, a full living and dining room, appliances, garage contents, and 50+ boxes. It is the largest Modern Storage® unit size and is roughly the size of a two-car garage.',
    fits: [
      'Four or five mattress sets with frames',
      'Multiple full bedroom sets',
      'Two living rooms of furniture or large sectional',
      'Full kitchen contents plus all major appliances',
      'Garage contents — tools, lawn equipment, bikes',
      'Multiple TVs and home entertainment',
      'Patio furniture, grills, and outdoor gear',
      '50+ moving boxes',
      'Business inventory and e-commerce stock',
    ],
    bestFor: [
      'Four- and five-bedroom home storage',
      'Full-home storage during a long-distance move',
      'Business and e-commerce inventory at scale',
      'Garage and workshop contents storage',
      'Restoration company tools and equipment',
    ],
    notFor: [
      'Single boats, RVs, and oversized trailers (use outdoor parking storage at participating Modern Storage® locations instead)',
    ],
    monthlyDriveUp: '$200 – $350 / month',
    monthlyClimate: '$270 – $440 / month',
    comparison:
      "A 10x30 is the largest Modern Storage® indoor unit size. If you need more, look at multiple 10x20 units or talk to the team about commercial business storage — Modern Storage® Riverdale has the largest business storage selection.",
  },
]

// Comparison rows for the size-vs-size decision section. Each row answers a
// specific PAA-style query ("5x5 vs 5x10", "10x10 vs 10x15", etc.) — this is
// the question format that AI engines and Google PAA boxes love to extract.
const SIZE_COMPARISONS = [
  {
    a: '5x5',
    b: '5x10',
    pick: 'Pick 5x5 for closet overflow or a college dorm. Pick 5x10 for a studio apartment, a single bedroom, or any furniture larger than a chair.',
  },
  {
    a: '5x10',
    b: '10x10',
    pick: 'Pick 5x10 for a studio or single bedroom. Pick 10x10 for a full one-bedroom apartment with living room and bedroom furniture together.',
  },
  {
    a: '10x10',
    b: '10x15',
    pick: 'Pick 10x10 for a one-bedroom apartment. Pick 10x15 for a two-bedroom apartment, a small home, or anytime you want walk-in room inside the unit.',
  },
  {
    a: '10x15',
    b: '10x20',
    pick: 'Pick 10x15 for two-bedroom apartments. Pick 10x20 for a three-bedroom home, garage contents, or single-car storage.',
  },
  {
    a: '10x20',
    b: '10x30',
    pick: 'Pick 10x20 for a three-bedroom home or single-car storage. Pick 10x30 for four- and five-bedroom homes, full businesses, or whole-garage workshop contents.',
  },
] as const

// Decision framework that doubles as PAA-bait. Each entry answers "How do I
// pick the right storage unit size for X?" in an answer-first format.
const DECISION_FRAMEWORK = [
  {
    question: 'How do I pick a storage unit size for moving?',
    answer:
      'Match your storage unit to the size of the home you are moving out of. A studio or single bedroom fits in a 5x10. A one-bedroom apartment fits in a 10x10. A two-bedroom apartment fits in a 10x15. A three-bedroom home fits in a 10x20. A four- or five-bedroom home fits in a 10x30. Add one size up if you have oversized sectionals, multiple beds beyond the room count, or want walk-in space to access items.',
  },
  {
    question: 'How do I pick a storage unit size during a renovation?',
    answer:
      'For renovation storage, size up one step from what your home would normally fit. Renovation customers usually pull more out than they expect — appliances, fixtures, dining tables, and protective coverings all add up. A 10x15 covers a single-room renovation, a 10x20 handles a whole-floor renovation, and a 10x30 fits an entire-home renovation including kitchen and appliances.',
  },
  {
    question: 'How do I pick a storage unit size for business inventory?',
    answer:
      'For business and e-commerce inventory storage, calculate your boxed inventory in cubic feet, then add 30% for aisle space if you need to walk in and pick items. A 5x10 holds 50-75 case-pack boxes. A 10x10 holds 100-150 cases plus a small staging area. A 10x15 supports a small e-commerce operation with shelving. A 10x20 or 10x30 covers larger inventory plus delivery acceptance — Modern Storage® Riverdale and Modern Storage® Bentonville are the flagship business storage facilities.',
  },
  {
    question: 'How do I pick a storage unit size for a car or motorcycle?',
    answer:
      'For indoor vehicle storage, a 10x20 fits a single mid-size car or a single motorcycle plus storage. Larger vehicles, trucks, full-size SUVs, and full-size pickup trucks need a 10x30 or an outdoor parking space. For motorcycles only, a 5x10 or 10x10 unit works. Outdoor parking spaces at participating Modern Storage® locations also accommodate boats, RVs, and oversized trailers.',
  },
] as const

const FAQS = [
  {
    q: 'What size storage unit do I need for a one-bedroom apartment?',
    a: `A 10x10 storage unit (100 sq ft) fits a typical one-bedroom apartment, including a queen mattress and frame, dresser, sofa, coffee table, TV, dining set, and 15-20 boxes. If you have a large sectional sofa or oversized furniture, step up to a 10x15. If you are only storing the bedroom — not the full apartment — a 5x10 (50 sq ft) is enough.`,
  },
  {
    q: 'What size storage unit do I need for a two-bedroom apartment?',
    a: `A 10x15 storage unit (150 sq ft) fits a typical two-bedroom apartment, including two mattress sets, dressers, a sofa, dining set, TV stand, and 20-30 boxes. If you have an oversized sectional, multiple beds beyond two, or you want breathing room to walk inside the unit, step up to a 10x20 (200 sq ft).`,
  },
  {
    q: 'What size storage unit do I need for a three-bedroom home?',
    a: `A 10x20 storage unit (200 sq ft) fits a typical three-bedroom home, including multiple mattress sets, dressers, a full living room, dining set, appliances, and 30-50 boxes. It is roughly the size of a one-car garage. For four- and five-bedroom homes or homes with extensive furniture, choose a 10x30 (300 sq ft) instead.`,
  },
  {
    q: 'How big is a 5x5 storage unit?',
    a: `A 5x5 storage unit is 25 square feet — 5 feet wide by 5 feet deep with an 8-foot ceiling — for a total of about 200 cubic feet of storage space. It is roughly the size of a single hall closet and is the smallest Modern Storage® unit size. It fits 15-20 boxes, a small dresser, seasonal items, holiday decor, and college dorm gear.`,
  },
  {
    q: 'How big is a 5x10 storage unit?',
    a: `A 5x10 storage unit is 50 square feet — 5 feet wide by 10 feet deep with an 8-foot ceiling — for a total of about 400 cubic feet of storage space. It is roughly the size of a walk-in closet and is one of the most popular Modern Storage® unit sizes. It fits the contents of a studio apartment or single bedroom, including a mattress set, dresser, small sofa, and 10-15 boxes.`,
  },
  {
    q: 'How big is a 10x10 storage unit?',
    a: `A 10x10 storage unit is 100 square feet — 10 feet wide by 10 feet deep with an 8-foot ceiling — for a total of about 800 cubic feet of storage space. It is roughly the size of a small bedroom and is the most-rented Modern Storage® unit size in Arkansas. It fits the contents of a one-bedroom apartment, including a queen bed, dresser, sofa, dining set, TV, and 15-20 boxes.`,
  },
  {
    q: 'How big is a 10x20 storage unit?',
    a: `A 10x20 storage unit is 200 square feet — 10 feet wide by 20 feet deep with an 8-foot ceiling — for a total of about 1,600 cubic feet of storage space. It is roughly the size of a one-car garage. It fits the contents of a three-bedroom home, including multiple mattress sets, full living and dining rooms, appliances, and 30-50 boxes. It is also large enough to store a single mid-size car.`,
  },
  {
    q: 'What size storage unit fits a king-size bed?',
    a: `A king-size mattress and frame fit in any Modern Storage® unit size from a 5x10 upward when stored on edge (mattress upright against a wall). A 5x10 fits the king set plus a few small items. A 10x10 fits the king set plus a one-bedroom apartment worth of furniture. For a king bedroom plus a living room and dining set, choose a 10x15.`,
  },
  {
    q: 'What size storage unit fits a sectional sofa?',
    a: `A full-size sectional sofa fits in a 10x10 storage unit (100 sq ft) when broken down into individual pieces. If you also need to store other furniture or a full bedroom, step up to a 10x15. Oversized sectionals (10+ feet long when assembled) may need a 10x15 even when stored alone, depending on the configuration of the pieces.`,
  },
  {
    q: 'What is the smallest storage unit Modern Storage® offers?',
    a: `The smallest Modern Storage® storage unit is a 5x5 (25 square feet) — about the size of a single closet. It fits 15-20 boxes, a small dresser, holiday decor, and college dorm storage. For even smaller needs, like document storage or a single box of records, consider sharing a 5x5 with a friend or a colleague — though Modern Storage® rentals are typically single-customer.`,
  },
  {
    q: 'What is the largest storage unit Modern Storage® offers?',
    a: `The largest standard Modern Storage® indoor storage unit is a 10x30 (300 square feet) — roughly the size of a two-car garage. It fits the contents of a four- or five-bedroom home plus garage contents, or a full business inventory. For boats, RVs, oversized trailers, and oversized vehicles, Modern Storage® also offers outdoor parking spaces at participating locations including Maumelle Blvd, Bryant, Lowell, and Bentonville.`,
  },
  {
    q: 'Should I choose climate-controlled or drive-up for my unit size?',
    a: `Choose climate-controlled storage for furniture, electronics, documents, photos, antiques, and anything stored more than ~3 months in Arkansas. Climate-controlled units stay between roughly 59°F and 79°F year-round and protect against Arkansas summer humidity and winter cold. Choose drive-up storage for tools, plastic bins, patio furniture, outdoor gear, and short-term storage where temperature changes don't matter — it costs less and lets you pull a vehicle directly to the unit door for loading.`,
  },
] as const

function buildJsonLd() {
  // Article schema — guides are long-form editorial content. Article (with
  // headline + image + datePublished) is what AI engines extract from for
  // citations. The /blog/the-complete-guide-to-storage-unit-sizes URL we are
  // mirroring on the legacy domain uses the same pattern.
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': SITE_URL + PAGE_PATH + '#article',
    headline: 'Storage Unit Sizes Guide — 5x5, 5x10, 10x10, 10x15, 10x20, 10x30',
    description:
      'Complete storage unit sizes guide for Arkansas customers — 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 storage units, what fits in each, climate-controlled vs drive-up, and how to choose the right size at Modern Storage®.',
    image: SITE_URL + HERO_IMAGE,
    author: { '@id': SITE_URL + '/#organization' },
    publisher: { '@id': SITE_URL + '/#organization' },
    datePublished: '2026-05-30',
    dateModified: '2026-05-30',
    mainEntityOfPage: SITE_URL + PAGE_PATH,
    url: SITE_URL + PAGE_PATH,
  }

  // HowTo schema for the decision framework — Google rewards HowTo with rich
  // results, and AI engines often quote HowTo step content directly.
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': SITE_URL + PAGE_PATH + '#howto',
    name: 'How to Choose the Right Storage Unit Size',
    description:
      'Decision framework for picking the right Modern Storage® unit size based on what you are storing (apartment, home, renovation, business inventory, or vehicle).',
    step: DECISION_FRAMEWORK.map((d, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: d.question,
      text: d.answer,
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: SITE_URL + '/guides' },
      { '@type': 'ListItem', position: 3, name: 'Storage Unit Sizes', item: SITE_URL + PAGE_PATH },
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

export default async function StorageUnitSizesGuidePage() {
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
              <li className="text-gray-300">Storage Unit Sizes</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">
                Storage Unit Sizes Guide
              </p>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Storage Unit Sizes — <span className="text-modern-red">5x5 through 10x30</span>
              </h1>
              {/* Lead paragraph is intentionally answer-first so PAA + AI
                  Overview can extract a clean summary as the snippet. */}
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Modern Storage® offers six standard self-storage unit sizes in Arkansas: <strong className="text-white">5x5, 5x10, 10x10, 10x15, 10x20, and 10x30</strong>. A 5x5 holds a single closet of contents, a 10x10 fits a one-bedroom apartment, a 10x15 fits a two-bedroom apartment, a 10x20 fits a three-bedroom home, and a 10x30 fits a four- or five-bedroom home or whole-garage contents. This guide walks through every size, what fits, climate-controlled vs drive-up, and how to pick the right one.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/ai-storage-size-finder"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Try the AI Storage Size Finder
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/#locations"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  See Live Rates by Location
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

      {/* ── QUICK REFERENCE TABLE ─────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              Quick reference
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Storage Unit Sizes at a Glance
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              All six Modern Storage® indoor unit sizes side-by-side. Tap any row to jump to the deep-dive section for that size.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base">
                <thead className="bg-charcoal text-white">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Size</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Square ft</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs hidden md:table-cell">Fits roughly</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs">Drive-up</th>
                    <th scope="col" className="px-4 sm:px-6 py-4 font-black uppercase tracking-widest text-xs whitespace-nowrap">Climate-controlled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {SIZE_DETAILS.map((s) => (
                    <tr key={s.size} className="bg-white hover:bg-gray-50 transition-colors">
                      <th scope="row" className="px-4 sm:px-6 py-4 align-middle">
                        <Link href={`#size-${s.size}`} className="font-bebas text-3xl sm:text-4xl text-charcoal hover:text-modern-red transition-colors leading-none">
                          {s.size}
                        </Link>
                      </th>
                      <td className="px-4 sm:px-6 py-4 text-gray-700 align-middle whitespace-nowrap font-semibold">{s.sqft}</td>
                      <td className="px-4 sm:px-6 py-4 text-gray-700 align-middle hidden md:table-cell text-sm">{s.bestFor[0]}</td>
                      <td className="px-4 sm:px-6 py-4 text-gray-700 align-middle whitespace-nowrap text-sm">{s.monthlyDriveUp}</td>
                      <td className="px-4 sm:px-6 py-4 text-modern-red align-middle font-bold whitespace-nowrap text-sm">{s.monthlyClimate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-gray-500 italic mt-5 leading-relaxed max-w-3xl">
            Ranges are typical Modern Storage® Arkansas starting points. Exact prices vary by location, unit availability, current move-in promotions, and season — <Link href="/#locations" className="text-modern-red font-semibold hover:underline not-italic">see live rates on each location's reservation page</Link>.
          </p>
        </div>
      </section>

      {/* ── PER-SIZE DEEP DIVES ───────────────────────────────── */}
      {SIZE_DETAILS.map((s, idx) => (
        <section
          key={s.size}
          id={`size-${s.size}`}
          className={`py-12 lg:py-16 border-b border-gray-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-100 relative">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex gap-3 text-xs font-black uppercase tracking-widest">
                  <span className="bg-charcoal text-white px-3 py-1.5 rounded-full">{s.sqft}</span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full">{s.ceiling}</span>
                </div>
              </div>

              <div className="lg:col-span-7">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
                  Storage unit size
                </p>
                <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
                  {s.size} Storage Unit
                </h2>
                {/* answer-first lead paragraph — first sentence is the PAA snippet */}
                <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6">
                  {s.answerFirst}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-charcoal mb-3">What fits in a {s.size}</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {s.fits.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-charcoal mb-3">Best for</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {s.bestFor.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Not the right size if you have</p>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    {s.notFor.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-100 rounded-xl px-4 py-3 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Drive-up</p>
                    <p className="text-lg font-bold text-charcoal">{s.monthlyDriveUp}</p>
                  </div>
                  <div className="bg-modern-red/10 border border-modern-red/30 rounded-xl px-4 py-3 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-modern-red mb-1">Climate-controlled</p>
                    <p className="text-lg font-bold text-modern-red">{s.monthlyClimate}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 italic leading-relaxed">
                  <strong className="not-italic text-charcoal">Sizing up or down?</strong> {s.comparison}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── SIZE-VS-SIZE COMPARISONS ──────────────────────────── */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Size vs size</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Which Size Should I Pick?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The five most common size-vs-size decisions Modern Storage® customers face. Each comparison answers the direct question — pick the smaller size if you fit it, pick the larger size if any of the next-up criteria match.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {SIZE_COMPARISONS.map((c) => (
              <article key={`${c.a}-${c.b}`} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-bebas text-2xl text-charcoal">{c.a}</span>
                  <span className="text-xs font-black uppercase tracking-widest text-modern-red">vs</span>
                  <span className="font-bebas text-2xl text-charcoal">{c.b}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{c.pick}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOWTO DECISION FRAMEWORK ──────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">How to choose</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              How to Pick the Right Storage Unit Size for Your Situation
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Four common situations and the size recommendation for each — these are also emitted as a HowTo schema block so AI engines can extract step-by-step answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DECISION_FRAMEWORK.map((d, i) => (
              <article key={d.question} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-modern-red transition-colors">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-bebas text-3xl text-modern-red leading-none">{i + 1}</span>
                  <h3 className="font-black text-charcoal leading-tight">{d.question}</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{d.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIMATE-CONTROLLED CALLOUT ────────────────────────── */}
      <section className="bg-charcoal text-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">Climate-controlled vs drive-up</p>
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-4">
                Should I Choose Climate-Controlled or Drive-Up at My Size?
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Every unit size in this guide is available in both formats at most Modern Storage® locations. <strong className="text-white">Climate-controlled units stay between roughly 59°F and 79°F year-round</strong> — pick climate-controlled for furniture, electronics, documents, photos, antiques, and anything stored more than three months in Arkansas. Drive-up storage is cheaper and faster for loading, with the unit door opening directly to your vehicle — pick drive-up for tools, plastic bins, patio gear, and short-term storage where temperature changes don't matter.
              </p>
              <Link
                href="/climate-controlled"
                className="inline-flex items-center gap-2 text-sm font-bold text-modern-red hover:text-modern-red-hover transition-colors"
              >
                See climate-controlled storage at every Arkansas location →
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">Climate-controlled premium</p>
                <p className="text-3xl font-bebas text-white mb-2">+25-50%</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Climate-controlled units run roughly 25-50% more than equivalent drive-up units. For most furniture, electronics, and long-term storage, the math favors paying the premium — repair or replacement cost of damaged items dwarfs the difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-3">
              Storage Unit Sizes FAQ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              The most-asked questions about Modern Storage® unit sizes — answered for People Also Ask, AI Overview, and direct customer reference.
            </p>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-modern-red py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 tracking-tight">
            Pick a Size, Pick a Location, Reserve Online
          </h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Live rates, climate-controlled availability, and current move-in offers on every Modern Storage® Arkansas location reservation page. Or use the AI Storage Size Finder for a personalized recommendation in under 30 seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ai-storage-size-finder"
              className="bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md inline-flex items-center gap-2"
            >
              Try the AI Storage Size Finder
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/#locations"
              className="bg-charcoal text-white font-black px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors text-sm shadow-md"
            >
              Find a Location
            </Link>
            <a
              href={settings.phoneHref}
              className="bg-white/15 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/25 transition-colors text-sm border border-white/40 inline-flex items-center gap-2"
            >
              Call for New Rentals
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
