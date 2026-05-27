// Server-rendered FAQ accordion using native <details> / <summary>.
//
// Why this is a server component (no 'use client'):
//   * Every answer must render in the initial HTML so crawlers, AI search,
//     and JS-disabled audit tools index it. The previous client version
//     wrapped closed answers in <div hidden>, which some SEO tools count
//     as JS-only content.
//   * <details>/<summary> is the W3C primitive for accordions. Google has
//     stated that content inside <details> is fully indexed regardless of
//     open/closed state — it's all in the DOM.
//   * No useState means no hydration, no client bundle, no flash.
//
// `a` is the plain-text answer used in the FAQPage JSON-LD schema.
// `aHtml` is the optional rich version with internal links, rendered to
// the page via dangerouslySetInnerHTML (we control the content, so this
// is safe).

type FaqItem = { q: string; a: string; aHtml?: string }

export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item, i) => (
        <details
          key={item.q}
          // Open the first item by default so the page has visible answer
          // content above the fold. Every other answer is still in the DOM
          // (and crawlable), just visually collapsed.
          open={i === 0}
          className="group py-2"
        >
          <summary
            className="
              flex items-center justify-between gap-6 py-3 cursor-pointer list-none
              [&::-webkit-details-marker]:hidden
            "
          >
            {/* Heading is INSIDE summary so screen readers + crawlers still
                see h3 semantics. Permitted by HTML spec. */}
            <h3 className="text-base sm:text-lg font-bold text-charcoal group-hover:text-modern-red group-open:text-modern-red transition-colors m-0">
              {item.q}
            </h3>
            <span
              className="
                shrink-0 w-8 h-8 rounded-full bg-gray-100 text-charcoal
                group-hover:bg-modern-red group-hover:text-white
                group-open:bg-modern-red group-open:text-white group-open:rotate-45
                flex items-center justify-center transition-all
              "
              aria-hidden="true"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </summary>
          <div className="pb-5 pr-12">
            {item.aHtml ? (
              <p
                className="text-gray-600 leading-relaxed text-sm sm:text-base [&_a]:text-modern-red [&_a]:font-semibold [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: item.aHtml }}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.a}</p>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
