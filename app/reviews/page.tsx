import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import {
  getReviewFacilities,
  getAllFacilityReviewData,
  aggregateRating,
  type FacilityReviewData,
} from '@/lib/reviews'
import ReviewStars from '@/components/ReviewStars'
import FacilityReviewCard from '@/components/FacilityReviewCard'

const PAGE_PATH = '/reviews'

// Re-render hourly so newly-cached Google reviews surface without a redeploy.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Customer Reviews — Modern Storage® Arkansas Self Storage',
  description:
    'Read verified Google reviews for Modern Storage® self-storage facilities across Arkansas — Little Rock, North Little Rock, Bryant, Hot Springs, Maumelle, Bentonville, Springdale, and Lowell. See ratings by location and leave your own review.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Customer Reviews — Modern Storage® Arkansas',
    description:
      'Verified Google reviews and ratings for every Modern Storage® self-storage location across central and Northwest Arkansas.',
    url: SITE_URL + PAGE_PATH,
    type: 'website',
  },
}

function buildJsonLd(
  facilities: Awaited<ReturnType<typeof getReviewFacilities>>,
  bySlug: Map<string, FacilityReviewData>,
) {
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': SITE_URL + PAGE_PATH + '#webpage',
    name: 'Customer Reviews — Modern Storage® Arkansas',
    url: SITE_URL + PAGE_PATH,
    isPartOf: { '@id': SITE_URL + '/#website' },
    about: { '@id': SITE_URL + '/#organization' },
  }

  // One SelfStorage entity per facility that actually has review data, with
  // AggregateRating + a few sample reviews. Emitting markup only when real
  // data exists keeps it valid (no empty/zero ratings).
  const businesses = facilities
    .map((f) => {
      const d = bySlug.get(f.slug)
      if (!d || d.rating == null || !d.reviewCount) return null
      return {
        '@context': 'https://schema.org',
        '@type': 'SelfStorage',
        '@id': SITE_URL + '/#location-' + f.slug,
        name: f.name,
        url: SITE_URL + '/reviews/' + f.slug,
        address: { '@type': 'PostalAddress', addressLocality: f.city, addressRegion: 'AR', addressCountry: 'US' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: d.rating,
          reviewCount: d.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        review: d.reviews.slice(0, 3).map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.author },
          reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
          reviewBody: r.text,
          datePublished: r.createTime?.slice(0, 10),
        })),
      }
    })
    .filter(Boolean)

  return [collection, ...businesses]
}

export default async function ReviewsPage() {
  const facilities = await getReviewFacilities()
  const bySlug = await getAllFacilityReviewData()
  const allData = facilities.map((f) => bySlug.get(f.slug)).filter(Boolean) as FacilityReviewData[]
  const agg = aggregateRating(allData)
  const jsonLd = buildJsonLd(facilities, bySlug)

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Reviews</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/40 text-modern-red text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              Customer Reviews
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              What Arkansas Customers Say About <span className="text-modern-red">Modern Storage®</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Verified Google reviews from real customers across our 10 self-storage facilities — from
              Little Rock and North Little Rock to Bentonville, Springdale, Lowell, Bryant, Hot Springs,
              and Maumelle. Ratings update automatically from Google.
            </p>

            {agg.rating != null && agg.reviewCount > 0 && (
              <div className="inline-flex items-center gap-4 bg-white/5 ring-1 ring-white/10 rounded-2xl px-6 py-4">
                <span className="text-4xl font-black leading-none">{agg.rating.toFixed(1)}</span>
                <div>
                  <ReviewStars rating={agg.rating} size="md" />
                  <p className="text-xs text-gray-400 mt-1">
                    Across {agg.reviewCount.toLocaleString()} Google review{agg.reviewCount === 1 ? '' : 's'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FACILITY CARDS ────────────────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">By Location</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Reviews for Every Modern Storage® Facility
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Pick a location to read its full set of Google reviews, see its rating, or leave a review of
              your own. Comparing facilities? Start with the{' '}
              <Link href="/locations" className="text-modern-red font-semibold hover:underline">
                locations map
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => (
              <FacilityReviewCard key={f.slug} facility={f} data={bySlug.get(f.slug) ?? {
                slug: f.slug, rating: null, reviewCount: null, reviews: [], updatedAt: null,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-modern-red text-white py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Ready to reserve your unit?</h2>
          <p className="text-white/90 text-lg mb-8">
            Find the closest Modern Storage® facility and reserve a climate-controlled or drive-up unit online.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/locations" className="inline-flex items-center gap-2 bg-white text-modern-red font-black px-7 py-3.5 rounded-full hover:bg-gray-100 transition-colors text-sm">
              Find a Unit Near You
            </Link>
            <Link href="/climate-controlled" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors border border-white/30 text-sm">
              Climate-Controlled Storage
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
