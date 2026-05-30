import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getPostBySlug, getPublishedSlugs, isStorageTipsPublic, STORAGE_TIPS_BRAND } from '@/lib/blog'
import BlogBlocks from '@/components/BlogBlocks'

// Re-render every 60s — picks up new/edited posts in Supabase without redeploy.
export const revalidate = 60

// Static-generate every published post at build time + revalidate as above.
// When the public kill-switch is off, generateStaticParams returns nothing so
// the build doesn't pre-render any post pages.
export async function generateStaticParams() {
  if (!isStorageTipsPublic()) return []
  const slugs = await getPublishedSlugs()
  return slugs.map((slug) => ({ slug }))
}

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Not found' }
  const url = post.canonicalUrl ?? `${SITE_URL}/blog/${post.slug}`
  const ogImage = post.ogImage ?? post.heroImage ?? undefined
  return {
    title: { absolute: post.title },
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].filter(Boolean) as string[],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      siteName: 'Modern Storage®',
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: ogImage
        ? [{ url: ogImage, width: 1600, height: 900, alt: post.heroAlt ?? post.h1 }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: post.twitterImage ? [post.twitterImage] : ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function StorageTipPage({ params }: Props) {
  // Public kill-switch — hide the section until the team is ready.
  if (!isStorageTipsPublic()) notFound()
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const url = post.canonicalUrl ?? `${SITE_URL}/blog/${post.slug}`
  const heroImageAbs = post.heroImage
    ? post.heroImage.startsWith('http')
      ? post.heroImage
      : SITE_URL + post.heroImage
    : null

  // ── JSON-LD ─────────────────────────────────────────────
  const blogPostingSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url + '#article',
    headline: post.h1,
    description: post.metaDescription,
    url,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: { '@id': SITE_URL + '/#organization', name: post.author },
    publisher: { '@id': SITE_URL + '/#organization' },
    mainEntityOfPage: url,
  }
  if (heroImageAbs) blogPostingSchema.image = heroImageAbs
  if (post.primaryKeyword) blogPostingSchema.keywords = post.primaryKeyword
  if (post.lastReviewedAt) {
    blogPostingSchema.review = {
      '@type': 'Review',
      reviewBody: post.disclaimer ?? 'Reviewed for accuracy.',
      author: { '@type': 'Person', name: post.reviewer ?? post.author },
      datePublished: post.lastReviewedAt,
    }
  }

  // FAQPage — only emit when the post body has a faq block (so we don't
  // claim FAQ rich results on posts that don't qualify).
  const faqBlock = post.body.find((b) => b.type === 'faq')
  const faqSchema =
    faqBlock && faqBlock.type === 'faq'
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqBlock.items.map((q) => ({
            '@type': 'Question',
            name: q.q,
            acceptedAnswer: { '@type': 'Answer', text: q.a },
          })),
        }
      : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: STORAGE_TIPS_BRAND, item: SITE_URL + '/blog' },
      { '@type': 'ListItem', position: 3, name: post.h1, item: url },
    ],
  }

  const jsonLd = [blogPostingSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]

  const ctaLabel = post.ctaLabel ?? 'Find a Modern Storage® Location Near You'
  const ctaUrl = post.ctaUrl ?? '/#locations'

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header / breadcrumb + meta */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" className="hover:text-modern-red transition-colors">{STORAGE_TIPS_BRAND}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300 line-clamp-1">{post.h1}</li>
            </ol>
          </nav>
          {post.category && (
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-3">
              {post.category}
            </p>
          )}
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
            {post.h1}
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold flex-wrap">
            <span>By {post.author}</span>
            {post.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </>
            )}
            {post.readingMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </>
            )}
            {post.lastReviewedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Reviewed{' '}
                  {new Date(post.lastReviewedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                  {post.reviewer ? ` by ${post.reviewer}` : ''}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Hero image */}
      {post.heroImage && (
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-6 pt-8 lg:pt-10">
            <figure>
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[16/9] bg-gray-100 relative">
                <Image
                  src={post.heroImage}
                  alt={post.heroAlt ?? post.h1}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
              {post.heroCaption && (
                <figcaption className="text-xs text-gray-500 italic text-center mt-3">
                  {post.heroCaption}
                </figcaption>
              )}
            </figure>
          </div>
        </section>
      )}

      {/* Article body */}
      <article className="bg-white pb-12 lg:pb-16">
        <div className="max-w-3xl mx-auto px-6 pt-8 lg:pt-10">
          {/* Intro paragraph */}
          {post.intro && (
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{post.intro}</p>
          )}

          {/* Quick-answer block — answer-first for PAA / AI Overview extraction */}
          {post.quickAnswer && (
            <aside className="bg-modern-red/5 border-l-4 border-modern-red rounded-r-xl px-5 py-4 mb-8">
              <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">Quick answer</p>
              <p className="text-gray-700 leading-relaxed">{post.quickAnswer}</p>
            </aside>
          )}

          {/* Block-by-block body */}
          <BlogBlocks blocks={post.body} />

          {/* Disclaimer */}
          {post.disclaimer && (
            <p className="text-xs text-gray-500 italic mt-10 pt-6 border-t border-gray-200 leading-relaxed">
              {post.disclaimer}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Final CTA */}
      <section className="bg-modern-red py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight">
            {ctaLabel}
          </h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto leading-relaxed">
            10 Modern Storage® locations across Arkansas. Climate-controlled, drive-up, business, boat, RV, and vehicle storage — reserve online in minutes.
          </p>
          <Link
            href={ctaUrl}
            className="inline-flex items-center gap-2 bg-white text-modern-red font-black px-8 py-3.5 rounded-full hover:bg-red-50 transition-colors text-sm shadow-md"
          >
            Find a Location
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
