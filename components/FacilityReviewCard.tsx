// Server component — one facility's review summary card for the /reviews
// landing grid: name, city, Google rating + count, latest reviews, and the
// "Read More Reviews" / "Leave a Review" actions. Renders a graceful
// "reviews being collected" state when no cached data exists yet.

import Link from 'next/link'
import ReviewStars from '@/components/ReviewStars'
import type { ReviewFacility, FacilityReviewData } from '@/lib/reviews'

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const days = Math.floor((Date.now() - then) / 86_400_000)
  if (days < 1) return 'Today'
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
  if (days < 30) return `${Math.floor(days / 7)} week${days < 14 ? '' : 's'} ago`
  if (days < 365) return `${Math.floor(days / 30)} month${days < 60 ? '' : 's'} ago`
  return `${Math.floor(days / 365)} year${days < 730 ? '' : 's'} ago`
}

export default function FacilityReviewCard({
  facility,
  data,
}: {
  facility: ReviewFacility
  data: FacilityReviewData
}) {
  const hasData = data.rating != null && (data.reviewCount ?? 0) > 0
  const latest = data.reviews.slice(0, 2)

  return (
    <article className="flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header — name, city, rating */}
      <div className="p-6 border-b border-gray-100">
        <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-1">
          {facility.region}
        </p>
        <h3 className="text-lg font-black text-charcoal leading-tight">
          <Link href={`/reviews/${facility.slug}`} className="hover:text-modern-red transition-colors">
            {facility.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">{facility.city}, AR</p>

        {hasData ? (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-2xl font-black text-charcoal leading-none">
              {data.rating!.toFixed(1)}
            </span>
            <ReviewStars rating={data.rating!} size="sm" />
            <span className="text-xs text-gray-500">
              ({data.reviewCount} Google review{data.reviewCount === 1 ? '' : 's'})
            </span>
          </div>
        ) : (
          <p className="mt-3 text-sm text-gray-400 italic">Reviews are being collected.</p>
        )}
      </div>

      {/* Latest reviews */}
      {latest.length > 0 && (
        <div className="p-6 space-y-4 flex-1">
          {latest.map((r, i) => (
            <figure key={i} className="text-sm">
              <div className="flex items-center justify-between gap-2 mb-1">
                <figcaption className="font-bold text-charcoal">{r.author}</figcaption>
                {r.createTime && (
                  <span className="text-[11px] text-gray-400 shrink-0">{formatRelative(r.createTime)}</span>
                )}
              </div>
              {r.rating > 0 && <ReviewStars rating={r.rating} size="sm" className="mb-1" />}
              <blockquote className="text-gray-600 leading-relaxed line-clamp-4">“{r.text}”</blockquote>
            </figure>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="p-6 pt-0 mt-auto flex flex-col gap-2">
        <Link
          href={`/reviews/${facility.slug}`}
          className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-black text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
        >
          Read More Reviews
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        {facility.googleReviewLink && (
          <a
            href={facility.googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-modern-red text-modern-red hover:bg-modern-red hover:text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
          >
            Leave a Review
          </a>
        )}
      </div>
    </article>
  )
}
