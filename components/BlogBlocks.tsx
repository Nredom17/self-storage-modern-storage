import Link from 'next/link'
import Image from 'next/image'
import FaqAccordion from '@/components/FaqAccordion'
import type { BlogBlock } from '@/lib/blog'

// Renders the array of BlogBlock structures stored in a blog_posts row's
// `body` jsonb column. New block types added to lib/blog.ts must also
// gain a render branch here, or the renderer drops them silently.
//
// All blocks read deterministic Tailwind classes (no dynamic strings) so
// Next.js can tree-shake correctly and PurgeCSS doesn't strip anything.

export default function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return block.level === 2 ? (
              <h2
                key={i}
                id={block.anchor}
                className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mt-10 mb-4 scroll-mt-24"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={i}
                id={block.anchor}
                className="text-xl lg:text-2xl font-black text-charcoal tracking-tight mt-8 mb-3 scroll-mt-24"
              >
                {block.text}
              </h3>
            )

          case 'paragraph':
            return (
              <p key={i} className="text-gray-700 leading-relaxed mb-5">
                {block.text}
              </p>
            )

          case 'list':
            return block.ordered ? (
              <ol key={i} className="list-decimal pl-6 space-y-2 mb-6 text-gray-700 leading-relaxed">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="space-y-2 mb-6">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-gray-700 leading-relaxed">
                    <svg className="w-4 h-4 text-modern-red shrink-0 mt-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )

          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-modern-red pl-5 my-6 italic text-gray-700 leading-relaxed"
              >
                "{block.text}"
                {block.attribution && (
                  <footer className="not-italic text-sm font-bold text-charcoal mt-2">
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            )

          case 'callout': {
            const tone = block.tone ?? 'info'
            const toneClasses =
              tone === 'warn'
                ? 'bg-amber-50 border-amber-300'
                : tone === 'success'
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-gray-50 border-gray-200'
            return (
              <aside
                key={i}
                className={`border-l-4 rounded-r-xl px-5 py-4 my-6 ${toneClasses}`}
              >
                {block.title && (
                  <p className="font-black text-charcoal mb-1.5">{block.title}</p>
                )}
                <p className="text-gray-700 leading-relaxed">{block.text}</p>
              </aside>
            )
          }

          case 'image':
            return (
              <figure key={i} className="my-8">
                <div className="rounded-2xl overflow-hidden shadow-lg aspect-[16/9] bg-gray-100 relative">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-sm text-gray-500 italic text-center mt-3">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )

          case 'cta': {
            const isPrimary = (block.variant ?? 'primary') === 'primary'
            const cls = isPrimary
              ? 'bg-modern-red hover:bg-modern-red-hover text-white'
              : 'bg-charcoal hover:bg-gray-800 text-white'
            // External vs internal — Next/Link handles internal, <a> for external.
            const isExternal = /^https?:\/\//.test(block.href)
            const inner = (
              <>
                {block.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )
            return (
              <div key={i} className="my-8 text-center">
                {isExternal ? (
                  <a
                    href={block.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 font-black px-7 py-3.5 rounded-full transition-colors text-sm shadow-md ${cls}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    href={block.href}
                    className={`inline-flex items-center gap-2 font-black px-7 py-3.5 rounded-full transition-colors text-sm shadow-md ${cls}`}
                  >
                    {inner}
                  </Link>
                )}
              </div>
            )
          }

          case 'comparison':
            return (
              <div key={i} className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['left', 'right'] as const).map((side) => {
                  const header = side === 'left' ? block.leftHeader : block.rightHeader
                  const accent =
                    side === 'left'
                      ? 'border-modern-red bg-modern-red/5'
                      : 'border-gray-200 bg-gray-50'
                  return (
                    <div key={side} className={`border-l-4 rounded-r-xl px-5 py-4 ${accent}`}>
                      {header && (
                        <p className="text-xs font-black uppercase tracking-widest text-charcoal mb-3">
                          {header}
                        </p>
                      )}
                      <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                        {block.rows.map((r, j) => (
                          <li key={j}>{side === 'left' ? r.left : r.right}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            )

          case 'faq':
            return (
              <div key={i} className="my-8">
                <FaqAccordion items={block.items} />
              </div>
            )

          default:
            return null
        }
      })}
    </>
  )
}
