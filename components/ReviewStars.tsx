// Server component — renders a 1–5 star rating row (supports half stars).
// Decorative by default; pass `label` for an accessible text equivalent.

export default function ReviewStars({
  rating,
  size = 'md',
  className = '',
}: {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const dims = size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75
  const rounded = rating - full >= 0.75 ? full + 1 : full

  return (
    <div
      className={`inline-flex items-center gap-0.5 text-modern-red ${className}`}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < (hasHalf ? full : rounded)
        const isHalf = hasHalf && i === full
        return (
          <svg key={i} className={dims} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.22" />
              </linearGradient>
            </defs>
            <path
              fill={isFull ? 'currentColor' : isHalf ? `url(#half-${i})` : 'currentColor'}
              fillOpacity={isFull || isHalf ? 1 : 0.22}
              d="M12 17.27l5.18 3.13-1.37-5.9 4.59-3.97-6.04-.52L12 4.5 9.64 10.01l-6.04.52 4.59 3.97-1.37 5.9z"
            />
          </svg>
        )
      })}
    </div>
  )
}
