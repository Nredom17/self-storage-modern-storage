import Link from 'next/link'
import FaqAccordion from '@/components/FaqAccordion'
import { slugify, type BlogBlock } from '@/lib/blog'

// Renders the array of BlogBlock structures stored in a blog_posts row's
// `body` jsonb column. New block types added to lib/blog.ts must also
// gain a render branch here, or the renderer drops them silently.
//
// All blocks read deterministic Tailwind classes (no dynamic strings) so
// Next.js can tree-shake correctly and PurgeCSS doesn't strip anything.

// Resolve an anchor for a heading: explicit anchor field wins; otherwise
// auto-slug from the text so TOC links + scroll-to-section work without
// the editor having to set every anchor by hand.
function anchorFor(block: Extract<BlogBlock, { type: 'heading' }>): string {
  return block.anchor ?? slugify(block.text)
}

// Matches [link text](https://url) OR bare https?:// URLs.
// Markdown links are checked first so the URL inside doesn't get
// double-matched by the bare-URL branch.
const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|https?:\/\/[^\s<>"']+/g
function renderTextWithLinks(text: string): React.ReactNode {
  if (!text || !LINK_RE.test(text)) return text
  LINK_RE.lastIndex = 0
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = LINK_RE.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index)
    if (before) parts.push(before)
    if (match[1] && match[2]) {
      // Markdown-style [label](url)
      parts.push(
        <a
          key={`lnk-${key++}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-modern-red font-semibold hover:underline underline underline-offset-2"
        >
          {match[1]}
        </a>,
      )
    } else {
      // Bare URL — strip trailing punctuation so "https://x.com)." doesn't include the period
      let url = match[0]
      let trailing = ''
      if (/[.,;:!?)]$/.test(url)) {
        trailing = url.slice(-1)
        url = url.slice(0, -1)
      }
      parts.push(
        <a
          key={`lnk-${key++}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-modern-red font-semibold hover:underline underline underline-offset-2"
        >
          {url}
        </a>,
      )
      if (trailing) parts.push(trailing)
    }
    lastIndex = match.index + match[0].length
  }
  const tail = text.slice(lastIndex)
  if (tail) parts.push(tail)
  return parts
}

export default function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            // Both h2 and h3 get an auto-generated id from the text when no
            // explicit anchor is supplied. The h2 also picks up a thin
            // red-modern-left accent border so big section headings have
            // the same visual treatment as the Key Takeaways and TOC
            // cards below — design-pass consistency across block types.
            const id = anchorFor(block)
            return block.level === 2 ? (
              <h2
                key={i}
                id={id}
                className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mt-12 mb-5 scroll-mt-24 border-l-4 border-modern-red pl-4"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={i}
                id={id}
                className="text-xl lg:text-2xl font-black text-charcoal tracking-tight mt-8 mb-3 scroll-mt-24"
              >
                {block.text}
              </h3>
            )
          }

          case 'paragraph':
            return (
              <p key={i} className="text-gray-700 leading-relaxed mb-5">
                {/* Auto-linkify URLs so a paragraph like "Listen here:
                 * https://open.spotify.com/..." renders the URL as a
                 * clickable link rather than bare text. Editors writing
                 * in the plain-text paragraph block shouldn't have to
                 * use a separate CTA block just to make a URL clickable. */}
                {renderTextWithLinks(block.text)}
              </p>
            )

          case 'list':
            return block.ordered ? (
              <ol key={i} className="list-decimal pl-6 space-y-2 mb-6 text-gray-700 leading-relaxed">
                {(block.items ?? []).map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="space-y-2 mb-6">
                {(block.items ?? []).map((item, j) => (
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
            // Five tones for editorial color-coding. Each tone uses a
            // distinct background + left accent + title color so the
            // visual semantic carries even when the title is omitted.
            //   info     gray   general note
            //   tip      blue   helpful guidance
            //   success  green  positive confirmation
            //   warn     amber  caveat / heads-up
            //   danger   red    prohibited action, fee, policy
            // Deterministic class strings (no dynamic concatenation) so
            // Tailwind's JIT doesn't strip them at build time.
            const styles =
              tone === 'danger'
                ? {
                    container: 'bg-red-50 border-red-500',
                    title: 'text-red-700',
                  }
                : tone === 'warn'
                  ? {
                      container: 'bg-amber-50 border-amber-400',
                      title: 'text-amber-700',
                    }
                  : tone === 'tip'
                    ? {
                        container: 'bg-blue-50 border-blue-500',
                        title: 'text-blue-700',
                      }
                    : tone === 'success'
                      ? {
                          container: 'bg-emerald-50 border-emerald-500',
                          title: 'text-emerald-700',
                        }
                      : {
                          container: 'bg-gray-50 border-gray-300',
                          title: 'text-charcoal',
                        }
            return (
              <aside
                key={i}
                className={`border-l-4 rounded-r-xl px-5 py-4 my-6 ${styles.container}`}
              >
                {block.title && (
                  <p className={`font-black mb-1.5 ${styles.title}`}>{block.title}</p>
                )}
                <p className="text-gray-700 leading-relaxed">{block.text}</p>
              </aside>
            )
          }

          case 'image':
            // Render at NATURAL aspect ratio — no forced 16:9 container
            // that crops marketing graphics with overlay text. Width is
            // capped by the article column, height is intrinsic.
            return (
              <figure key={i} className="my-8">
                <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.src}
                    alt={block.alt}
                    loading="lazy"
                    className="block w-full h-auto"
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
                        {(block.rows ?? []).map((r, j) => (
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
                <FaqAccordion items={block.items ?? []} />
              </div>
            )

          case 'takeaways': {
            // Key Takeaways box — Modern Storage brand palette (light
            // red tint + thick modern-red left accent, matching the
            // Quick Answer aside in [slug]/page.tsx). Sits near the top
            // of a post and gives readers the bottom line before the
            // body. Originally a blue gradient; rebranded sitewide.
            //
            // Defensive skip: new posts are pre-seeded with placeholder
            // bullets like "Replace this with…". If an editor hits
            // publish without filling them in (or deletes every bullet),
            // we silently drop the card rather than shipping an empty
            // box or the placeholder text.
            const realItems = (block.items ?? []).filter(
              (it) => it.trim().length > 0 && !/^replace this/i.test(it.trim()),
            )
            if (realItems.length === 0) return null
            const title = block.title ?? 'Key Takeaways'
            return (
              <aside
                key={i}
                className="my-8 bg-modern-red/5 border-l-4 border-modern-red rounded-r-xl px-6 py-5"
              >
                <h3 className="font-black text-modern-red text-lg mb-3 tracking-tight">{title}</h3>
                <ul className="space-y-2.5">
                  {realItems.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-2.5 text-gray-700 leading-relaxed text-sm sm:text-base"
                    >
                      <span className="text-modern-red mt-1.5 shrink-0 font-black" aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )
          }

          case 'toc': {
            // Table of Contents — Modern Storage brand palette (light
            // charcoal tint + thick charcoal left accent + red link
            // arrows). Functional / navigational feel that visually
            // separates it from the red-themed Quick Answer / Key
            // Takeaways callouts above. Auto-built from every level-2
            // heading in the body so the jump list stays scannable.
            const headings = blocks.flatMap((b) =>
              b.type === 'heading' && b.level === 2
                ? [{ text: b.text, anchor: anchorFor(b) }]
                : [],
            )
            if (headings.length === 0) return null
            const title = block.title ?? 'Table of Contents'
            return (
              <aside
                key={i}
                className="my-8 bg-charcoal/[0.04] border-l-4 border-charcoal rounded-r-xl px-6 py-5"
              >
                <h3 className="font-black text-charcoal text-lg mb-3 tracking-tight">{title}</h3>
                <ul className="space-y-2.5">
                  {headings.map((h, j) => (
                    <li key={j}>
                      <a
                        href={`#${h.anchor}`}
                        className="text-charcoal hover:text-modern-red font-bold transition-colors inline-flex items-start gap-2 text-sm sm:text-base leading-relaxed"
                      >
                        <span className="text-modern-red shrink-0" aria-hidden="true">→</span>
                        <span>{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )
          }

          default:
            return null
        }
      })}
    </>
  )
}
