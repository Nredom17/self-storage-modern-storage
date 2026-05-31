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

// `columns` controls the on-page layout. Default 1 = single stacked
// accordion (the historical behavior — preserved so every existing caller
// keeps rendering unchanged). 2 = side-by-side grid on md+ screens, with
// items flowing in DOM order across two columns. Each column expands
// independently when an item opens because `<details>` height is intrinsic
// to its grid cell; siblings in the same row stay top-aligned.
//
// Use 2 columns for long FAQ lists (15+ items) where vertical scroll feels
// excessive. Short FAQ blocks (~6 items) stay single-column so visitors
// don't have to track two parallel reading lanes for a 3-item list.
export default function FaqAccordion({
  items,
  columns = 1,
}: {
  items: readonly FaqItem[]
  columns?: 1 | 2
}) {
  // Container variants — single column keeps the original divide-y border
  // treatment. Two-column uses a responsive grid with a vertical divider
  // between the cells via gap-x and each <details> getting its own bottom
  // border so the visual rhythm matches the single-column look.
  const containerClass =
    columns === 2
      ? 'grid grid-cols-1 md:grid-cols-2 md:gap-x-10 border-t border-gray-200'
      : 'divide-y divide-gray-200 border-y border-gray-200'
  const itemClass =
    columns === 2
      ? 'group py-2 border-b border-gray-200'
      : 'group py-2'

  return (
    <div className={containerClass}>
      {items.map((item, i) => (
        <details
          key={item.q}
          // Open the first item by default so the page has visible answer
          // content above the fold. Every other answer is still in the DOM
          // (and crawlable), just visually collapsed. In 2-column mode we
          // open the first item in EACH column (index 0 and 1) so both
          // sides have visible answer content on initial render.
          open={columns === 2 ? i < 2 : i === 0}
          className={itemClass}
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
              // <div> rather than <p> so aHtml can include block-level
              // markup (paragraphs, <ul>, <ol>) without invalid nesting.
              // Child selectors keep the single-paragraph case visually
              // identical to the plain-text branch.
              <div
                className="
                  text-gray-600 leading-relaxed text-sm sm:text-base
                  [&_a]:text-modern-red [&_a]:font-semibold [&_a:hover]:underline
                  [&_p]:mb-3 [&_p:last-child]:mb-0
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:space-y-1
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:space-y-1
                "
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
