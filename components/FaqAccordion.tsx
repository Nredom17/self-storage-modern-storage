'use client'

import { useState } from 'react'

// `a` is the plain-text answer used in the JSON-LD FAQPage schema (Google
// requires plain text there). `aHtml` is the optional rich version rendered
// to the page, allowing embedded internal links for topical authority.
type FaqItem = { q: string; a: string; aHtml?: string }

export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const id = `faq-${i}`
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                id={`${id}-trigger`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="text-base sm:text-lg font-bold text-charcoal group-hover:text-modern-red transition-colors">
                  {item.q}
                </span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-modern-red group-hover:text-white text-charcoal flex items-center justify-center transition-all ${
                    isOpen ? 'rotate-45 bg-modern-red text-white' : ''
                  }`}
                  aria-hidden="true"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-trigger`}
              hidden={!isOpen}
              className="pb-5 pr-12"
            >
              {item.aHtml ? (
                <p
                  className="text-gray-600 leading-relaxed text-sm sm:text-base [&_a]:text-modern-red [&_a]:font-semibold [&_a:hover]:underline"
                  dangerouslySetInnerHTML={{ __html: item.aHtml }}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.a}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
