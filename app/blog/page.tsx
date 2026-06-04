import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { getPublishedPosts, isStorageTipsPublic, STORAGE_TIPS_BRAND } from '@/lib/blog'

// Storage Tips index — lists every published post, newest first. Re-renders
// every 60s so newly-published posts appear without a code redeploy.
//
// Gated by the STORAGE_TIPS_PUBLIC env var. When OFF (the default) any
// request to /blog returns a 404 — but the admin at /admin/blog stays
// available so the team can stage posts before launch.
export const revalidate = 60

const PAGE_PATH = '/blog'

export const metadata: Metadata = {
  title: {
    absolute: `Modern Storage® ${STORAGE_TIPS_BRAND} — Self-Storage Guides & Advice`,
  },
  description:
    'In-depth storage tips, guides, and answers from the Modern Storage® team — storage unit sizes, pricing, climate-controlled storage, boat and RV storage, business storage, and Arkansas-specific advice.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: `Modern Storage® ${STORAGE_TIPS_BRAND}`,
    description:
      'Self-storage tips, guides, and answers from the Modern Storage® team across 10 Arkansas locations.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
}

export default async function StorageTipsIndexPage() {
  // Public kill-switch — hide the entire section until the team is ready.
  if (!isStorageTipsPublic()) notFound()
  const posts = await getPublishedPosts()

  return (
    <>
      {/* Breadcrumb + Hero */}
      <section className="bg-charcoal text-white">
        <div className="h-1 w-full bg-modern-red" />
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-modern-red transition-colors">
                  Self Storage
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">{STORAGE_TIPS_BRAND}</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">Modern Storage® {STORAGE_TIPS_BRAND}</p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Storage <span className="text-modern-red">Tips</span> &amp; Guides
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Practical storage tips on unit sizes, pricing, climate-controlled storage, boat and RV storage, business storage, and Arkansas-specific advice from the Modern Storage® team.
            </p>
          </div>
        </div>
      </section>

      {/* Post grid. The "Older Blogs" card is pinned as the last tile so
          visitors who scroll through every new Storage Tips post end up
          with a clear path to the archive on modernstorage.com/blog. */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group bg-white border border-gray-200 hover:border-modern-red hover:shadow-xl rounded-2xl overflow-hidden transition-all flex flex-col"
              >
                {p.heroImage && (
                  <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                    <Image
                      src={p.heroImage}
                      alt={p.heroAlt ?? p.h1}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  {p.category && (
                    <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">
                      {p.category}
                    </p>
                  )}
                  <h2 className="text-xl font-black text-charcoal group-hover:text-modern-red transition-colors leading-tight mb-3">
                    {p.h1}
                  </h2>
                  {p.intro && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">{p.intro}</p>
                  )}
                  <div className="text-xs text-gray-500 mt-auto">
                    {p.publishedAt && (
                      <time dateTime={p.publishedAt}>
                        {new Date(p.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    )}
                    {p.readingMinutes && <span> · {p.readingMinutes} min read</span>}
                  </div>
                </div>
              </Link>
            ))}

            {/* Pinned "Older Blogs" card — links to the legacy blog archive
                on modernstorage.com. Square aspect ratio with bold red
                background so it reads as a deliberate brand tile, not a
                missing post. External link, opens in a new tab. */}
            <a
              href="https://www.modernstorage.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Browse older posts on modernstorage.com/blog"
              className="group relative aspect-square bg-modern-red hover:bg-modern-red-hover rounded-2xl overflow-hidden transition-all shadow-md hover:shadow-2xl flex flex-col items-center justify-center text-center p-8"
            >
              {/* Subtle archive icon — folder-stack glyph, white over the red */}
              <svg
                className="w-16 h-16 mb-5 text-white/90 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M5 8h14M5 8a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-8a2 2 0 00-2-2M5 8V6a2 2 0 012-2h10a2 2 0 012 2v2M9 13h6"
                />
              </svg>
              <p className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                Older Blogs
              </p>
              <p className="text-sm text-white/85 mt-3 leading-relaxed">
                Browse the full Modern Storage® archive
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white mt-5 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full transition-colors">
                Visit modernstorage.com
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>

          {posts.length === 0 && (
            <p className="text-center text-gray-500 mt-10 text-sm">
              No new Storage Tips yet — fresh posts coming soon. The archive on
              modernstorage.com has plenty to dig into in the meantime.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
