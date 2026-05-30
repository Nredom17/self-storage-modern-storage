import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getPublishedPosts } from '@/lib/blog'

// Blog index — lists every published post, newest first. Re-renders every
// 60s so newly-published posts appear without a code redeploy.
export const revalidate = 60

const PAGE_PATH = '/blog'

export const metadata: Metadata = {
  title: {
    absolute: 'Modern Storage® Blog — Self-Storage Guides & Tips',
  },
  description:
    'In-depth guides, tips, and answers from the Modern Storage® team — storage unit sizes, pricing, climate-controlled storage, boat and RV storage, business storage, and Arkansas-specific advice.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Modern Storage® Blog',
    description:
      'Self-storage guides, tips, and answers from the Modern Storage® team across 10 Arkansas locations.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
}

export default async function BlogIndexPage() {
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
              <li className="text-gray-300">Blog</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-4">Modern Storage® Blog</p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Self-Storage Guides &amp; <span className="text-modern-red">Tips</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              In-depth guides on storage unit sizes, pricing, climate-controlled storage, boat and RV storage, business storage, and Arkansas-specific advice from the Modern Storage® team.
            </p>
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-16">
              No published posts yet — check back soon.
            </p>
          ) : (
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
            </div>
          )}
        </div>
      </section>
    </>
  )
}
