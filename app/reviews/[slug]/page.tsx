import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import {
  REVIEWS_ENABLED,
  REVIEW_FACILITY_CONFIG,
  getReviewFacility,
  getFacilityReviewData,
} from '@/lib/reviews'
import ReviewStars from '@/components/ReviewStars'

// Pre-render one page per configured facility slug — but none while the
// Reviews section is switched off (REVIEWS_ENABLED = false).
export function generateStaticParams() {
  if (!REVIEWS_ENABLED) return []
  return REVIEW_FACILITY_CONFIG.filter((f) => f.visible).map((f) => ({ slug: f.slug }))
}

// Re-render hourly so newly-cached reviews surface without a redeploy.
export const revalidate = 3600

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const facility = await getReviewFacility(params.slug)
  if (!facility) return { title: 'Reviews | Modern Storage®' }
  const path = `/reviews/${facility.slug}`
  return {
    title: `${facility.name} Reviews — Self Storage in ${facility.city}, AR`,
    description: `Read verified Google reviews and ratings for ${facility.name} self storage in ${facility.city}, Arkansas. See what customers say about climate-controlled and drive-up storage, then leave your own review.`,
    alternates: { canonical: SITE_URL + path },
    openGraph: {
      title: `${facility.name} Reviews`,
      description: `Verified Google reviews for ${facility.name} self storage in ${facility.city}, AR.`,
      url: SITE_URL + path,
      type: 'website',
    },
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function FacilityReviewsPage({ params }: { params: { slug: string } }) {
  // Reviews section is off until the Google Business Profile API is live.
  if (!REVIEWS_ENABLED) notFound()

  const facility = await getReviewFacility(params.slug)
  if (!facility) notFound()

  const data = await getFacilityReviewData(facility.slug)
  const hasData = data.rating != null && (data.reviewCount ?? 0) > 0
  const path = `/reviews/${facility.slug}`

  // Schema — SelfStorage + AggregateRating + Reviews, only when real data exists.
  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: 'Reviews', item: SITE_URL + '/reviews' },
        { '@type': 'ListItem', position: 3, name: facility.name, item: SITE_URL + path },
      ],
    },
  ]
  if (hasData) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'SelfStorage',
      '@id': SITE_URL + '/#location-' + facility.slug,
      name: facility.name,
      url: SITE_URL + path,
      address: { '@type': 'PostalAddress', addressLocality: facility.city, addressRegion: 'AR', addressCountry: 'US' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        reviewCount: data.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
      review: data.reviews.slice(0, 5).map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
        reviewBody: r.text,
        datePublished: r.createTime?.slice(0, 10),
      })),
    })
  }

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/reviews" className="hover:text-modern-red transition-colors">Reviews</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">{facility.city}</li>
            </ol>
          </nav>

          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">{facility.region}</p>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-[1.05] tracking-tight mb-4">
            {facility.name} Reviews
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-2xl">
            Verified Google reviews for self storage in {facility.city}, Arkansas. See what customers say,
            then reserve a unit or leave a review of your own.
          </p>

          {hasData ? (
            <div className="inline-flex items-center gap-4 bg-white/5 ring-1 ring-white/10 rounded-2xl px-6 py-4 mb-8">
              <span className="text-4xl font-black leading-none">{data.rating!.toFixed(1)}</span>
              <div>
                <ReviewStars rating={data.rating!} size="md" />
                <p className="text-xs text-gray-400 mt-1">
                  {data.reviewCount} Google review{data.reviewCount === 1 ? '' : 's'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 italic mb-8">
              Reviews for this location are being collected — check back soon.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {facility.googleReviewLink && (
              <a
                href={facility.googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
              >
                Leave a Review
              </a>
            )}
            <Link
              href={`/locations/${facility.slug}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
            >
              View Location &amp; Reserve
            </Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS LIST ──────────────────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6">
          {data.reviews.length > 0 ? (
            <div className="space-y-5">
              {data.reviews.map((r, i) => (
                <figure key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <figcaption className="font-black text-charcoal">{r.author}</figcaption>
                    {r.createTime && <span className="text-xs text-gray-400 shrink-0">{formatDate(r.createTime)}</span>}
                  </div>
                  {r.rating > 0 && <ReviewStars rating={r.rating} size="sm" className="mb-3" />}
                  <blockquote className="text-gray-700 leading-relaxed">“{r.text}”</blockquote>
                </figure>
              ))}
              <p className="text-xs text-gray-400 text-center pt-2">
                Reviews sourced from Google and refreshed automatically.
              </p>
            </div>
          ) : (
            <div className="text-center bg-white rounded-2xl border border-gray-200 p-10">
              <p className="text-gray-600 mb-6">
                We don&apos;t have any reviews to display for {facility.name} yet.
                {facility.googleReviewLink ? ' Be the first to leave one.' : ''}
              </p>
              {facility.googleReviewLink && (
                <a
                  href={facility.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Leave a Review on Google
                </a>
              )}
            </div>
          )}

          {/* Internal links */}
          <nav aria-label="Related" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/reviews" className="text-modern-red font-semibold hover:underline">← All reviews</Link>
            <Link href={`/locations/${facility.slug}`} className="text-modern-red font-semibold hover:underline">
              {facility.name} location
            </Link>
            <Link href="/climate-controlled" className="text-modern-red font-semibold hover:underline">
              Climate-controlled storage
            </Link>
            <Link href="/locations" className="text-modern-red font-semibold hover:underline">All locations</Link>
          </nav>
        </div>
      </section>
    </>
  )
}
