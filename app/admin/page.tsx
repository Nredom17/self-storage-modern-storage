import type { Metadata } from 'next'
import Link from 'next/link'
import { isStorageTipsPublic } from '@/lib/blog'

// Admin hub at /admin. Single landing page that links to every admin
// tool — Storage Tips (blog) editor, Chatbot content editor, and quick
// jumps back to the public site. Lives behind the HTTP Basic Auth gate
// from middleware.ts and is hard-noindexed so it never leaks to search.
//
// Add new admin tools as cards in ADMIN_TOOLS below. Keep the shape
// stable so the grid stays clean.

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Modern Storage® Admin',
  robots: { index: false, follow: false },
}

type AdminTool = {
  href: string
  title: string
  description: string
  cta: string
  // Inline SVG path data so we don't depend on an icon library and the
  // page renders zero-JS.
  iconPath: string
  // 'internal' renders as Next/Link, 'external' as <a target=_blank>.
  external?: boolean
}

const ADMIN_TOOLS: AdminTool[] = [
  {
    href: '/admin/blog',
    title: 'Storage Tips (Blog) Editor',
    description:
      'Create, edit, and publish blog posts. Block-based body editor supports headings, callouts (5 tones), Key Takeaways cards, auto Table of Contents, FAQs, comparisons, and images.',
    cta: 'Open blog editor',
    iconPath:
      'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2zM14 4v6h6M9 13h6M9 17h4',
  },
  {
    href: '/admin/chatbot',
    title: 'Chatbot Content Editor',
    description:
      'Edit the AI chat widget knowledge base — facts, FAQs, location details, and the system prompt the chatbot uses to answer customer questions.',
    cta: 'Open chatbot editor',
    iconPath:
      'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    href: '/',
    title: 'View Live Site',
    description:
      'Open the public Modern Storage® homepage in a new tab. Useful for previewing how published changes look to real visitors.',
    cta: 'Open homepage ↗',
    iconPath:
      'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
    external: true,
  },
  {
    href: '/blog',
    title: 'View Live Blog',
    description:
      'Open the public /blog index in a new tab to see what visitors see. Gated by the STORAGE_TIPS_PUBLIC env var — flip it in Vercel when ready.',
    cta: 'Open blog ↗',
    iconPath:
      'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2zM14 4v6h6',
    external: true,
  },
]

export default function AdminHomePage() {
  const tipsPublic = isStorageTipsPublic()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-charcoal text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-xs font-black uppercase tracking-widest text-modern-red mb-2">
            Admin · Modern Storage®
          </p>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">
            Modern Storage® Admin
          </h1>
          <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
            Internal tools for managing the public site. Pick a destination below.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Status row — surface the Storage Tips public/draft gate so
            editors instantly know whether published posts are reaching
            real visitors. */}
        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 mb-8 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-gray-500">
              Storage Tips public visibility
            </span>
            <span
              className={
                'inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ' +
                (tipsPublic
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800')
              }
            >
              {tipsPublic ? 'Public · /blog is live' : 'Hidden · /blog returns 404'}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Controlled by the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[11px]">STORAGE_TIPS_PUBLIC</code> env var in Vercel.
          </p>
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ADMIN_TOOLS.map((tool) => {
            const cardCls =
              'group bg-white border border-gray-200 hover:border-modern-red rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col h-full'
            const inner = (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-modern-red/10 text-modern-red flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.iconPath} />
                    </svg>
                  </div>
                  <h2 className="text-lg font-black text-charcoal tracking-tight">
                    {tool.title}
                  </h2>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 flex-1">
                  {tool.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-black text-modern-red group-hover:gap-2.5 transition-all">
                  {tool.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </>
            )
            return tool.external ? (
              <a
                key={tool.href}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardCls}
              >
                {inner}
              </a>
            ) : (
              <Link key={tool.href} href={tool.href} className={cardCls}>
                {inner}
              </Link>
            )
          })}
        </div>

        {/* Footer — pinned reminders so the editor doesn't have to dig
            through env vars to remember how the gating works. */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-600 mb-3">
            Quick reference
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <li>
              <strong className="text-charcoal">/admin authentication —</strong> HTTP Basic Auth via the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">ADMIN_USER</code> / <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">ADMIN_PASSWORD</code> env vars in Vercel.
            </li>
            <li>
              <strong className="text-charcoal">Drafts are private —</strong> only posts with status <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">published</code> appear on the public site. Drafts stay in the editor.
            </li>
            <li>
              <strong className="text-charcoal">Need a new admin tool?</strong> Add a card to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">ADMIN_TOOLS</code> in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">app/admin/page.tsx</code>.
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
