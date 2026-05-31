'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Admin-only list view at /admin/blog. Lives behind the HTTP Basic Auth
// gate (middleware.ts). Shows all posts (draft + published + archived),
// most-recently-updated first, with quick links into the editor and a
// "New Post" button that creates a blank draft and routes to its editor.
//
// Surfaces the STORAGE_TIPS_PUBLIC kill-switch state at the top so
// editors can immediately tell whether their published posts are
// reaching the public or staying private.

type Row = {
  id: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  title: string
  h1: string
  category: string | null
  updated_at: string
  published_at: string | null
}

type StatusPayload = {
  posts: Row[]
  publicEnabled: boolean
  setupSql?: string
  needsSetup?: boolean
  setupError?: string
}

export default function BlogAdminList() {
  const router = useRouter()
  const [rows, setRows] = useState<Row[] | null>(null)
  const [publicEnabled, setPublicEnabled] = useState<boolean | null>(null)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Database setup state — when the blog_posts table doesn't exist in
  // Supabase yet, the API returns needsSetup:true with the migration SQL
  // inline so we can show a copy-paste flow instead of a dead-end error.
  const [needsSetup, setNeedsSetup] = useState(false)
  const [setupSql, setSetupSql] = useState<string>('')
  const [sqlCopied, setSqlCopied] = useState(false)

  async function load() {
    const r = await fetch('/api/admin/blog', { cache: 'no-store' })
    const data = (await r.json()) as StatusPayload
    setRows(data.posts ?? [])
    setPublicEnabled(Boolean(data.publicEnabled))
    setNeedsSetup(Boolean(data.needsSetup))
    setSetupSql(data.setupSql ?? '')
    if (data.setupError && !data.needsSetup) setError(data.setupError)
  }
  useEffect(() => {
    void load()
  }, [])

  async function copySetupSql() {
    try {
      await navigator.clipboard.writeText(setupSql)
      setSqlCopied(true)
      window.setTimeout(() => setSqlCopied(false), 2500)
    } catch {
      // Clipboard API can fail on some browsers / contexts — fall back to a
      // manual selection prompt the user can copy from.
      window.alert('Could not copy automatically. Select the SQL below and copy manually.')
    }
  }

  async function createBlank() {
    setCreating(true)
    setError(null)
    const stamp = new Date()
      .toISOString()
      .replace(/[-:T]/g, '')
      .slice(0, 12)
    // Every new draft gets the Key Takeaways card and the Table of
    // Contents block prefilled at the top, so editors never have to
    // remember to add them by hand. The takeaways start with four
    // placeholder bullets — fill them in (or leave blank and the
    // renderer skips the card gracefully). The TOC auto-builds itself
    // from every level-2 heading the editor adds below.
    const defaultBody = [
      {
        type: 'takeaways',
        title: 'Key Takeaways',
        items: [
          'Replace this with the first key takeaway.',
          'Replace this with the second key takeaway.',
          'Replace this with the third key takeaway.',
          'Replace this with the fourth key takeaway.',
        ],
      },
      { type: 'toc', title: 'Table of Contents' },
      {
        type: 'heading',
        level: 2,
        text: 'Replace this with your first section heading',
      },
      {
        type: 'paragraph',
        text: 'Replace this with your first paragraph of body content.',
      },
    ]
    const r = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: 'untitled-' + stamp,
        title: 'Untitled draft',
        h1: 'Untitled draft',
        meta_description: 'Edit me before publishing.',
        status: 'draft',
        body: defaultBody,
      }),
    })
    const data = await r.json()
    setCreating(false)
    if (!r.ok) {
      setError(data.error ?? 'Failed to create draft.')
      return
    }
    router.push(`/admin/blog/${data.post.id}`)
  }

  async function remove(id: string, title: string) {
    if (!window.confirm(`Delete "${title}" permanently? This cannot be undone.`)) return
    const r = await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' })
    if (!r.ok) {
      const data = await r.json()
      setError(data.error ?? 'Failed to delete.')
      return
    }
    void load()
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-charcoal tracking-tight">Storage Tips editor</h1>
            <p className="text-sm text-gray-500 mt-1">
              Modern Storage® Storage Tips — write, save drafts, publish.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/chatbot"
              className="text-sm text-gray-600 hover:text-modern-red font-bold"
            >
              ← Chatbot editor
            </Link>
            <button
              type="button"
              onClick={createBlank}
              disabled={creating}
              className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-5 py-2.5 rounded-full transition-colors text-sm disabled:opacity-50"
            >
              {creating ? 'Creating…' : '+ New post'}
            </button>
          </div>
        </header>

        {/* Public / private kill-switch status. Editors can publish posts
            either way, but when the section is OFF nothing reaches the
            customer-facing site at /blog — that returns a 404 and the
            sitemap omits all blog URLs. Editors switch the public state
            by setting STORAGE_TIPS_PUBLIC in Vercel env vars and
            redeploying. */}
        {publicEnabled !== null && (
          <div
            className={
              'mb-6 p-4 rounded-xl border flex items-start gap-3 ' +
              (publicEnabled
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900')
            }
          >
            <span
              className={
                'text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mt-0.5 ' +
                (publicEnabled ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900')
              }
            >
              {publicEnabled ? 'Live' : 'Private'}
            </span>
            <div className="text-sm leading-relaxed">
              {publicEnabled ? (
                <>
                  <strong>Storage Tips is live.</strong> Published posts are visible to the public at{' '}
                  <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-xs">/blog</code> and appear in the sitemap.
                </>
              ) : (
                <>
                  <strong>Storage Tips is private.</strong> Nothing is visible to the public — the customer-facing{' '}
                  <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">/blog</code> page returns a 404 and blog URLs are omitted from the sitemap. You can still write and stage published posts here. <br />
                  To go live: set <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">STORAGE_TIPS_PUBLIC=true</code> in Vercel env vars and redeploy.
                </>
              )}
            </div>
          </div>
        )}

        {/* First-run database setup. Shown when the Supabase `blog_posts`
            table doesn't exist yet. Renders the migration SQL with a
            one-click copy button and step-by-step Studio instructions —
            because the Supabase JS client cannot execute DDL, the only
            reliable path is for the editor to paste this into Studio. */}
        {needsSetup && (
          <div className="mb-6 p-6 bg-amber-50 border border-amber-300 rounded-2xl">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 mt-0.5">
                Setup needed
              </span>
              <div className="flex-1">
                <h2 className="font-black text-charcoal text-lg mb-1">One last step — create the database table</h2>
                <p className="text-sm text-amber-900 leading-relaxed">
                  The Storage Tips section is wired up, but Supabase doesn't have the{' '}
                  <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">blog_posts</code> table yet. Copy the SQL below, paste it into the Supabase SQL editor, and run it once. Two minutes — then reload this page and the editor will work.
                </p>
              </div>
            </div>

            <ol className="text-sm text-charcoal space-y-3 mb-4 list-decimal pl-5">
              <li>
                Open{' '}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-modern-red font-bold hover:underline"
                >
                  Supabase Studio
                </a>{' '}
                and pick this project.
              </li>
              <li>
                In the left nav click <strong>SQL Editor</strong> → <strong>+ New query</strong>.
              </li>
              <li>
                Paste the SQL below into the editor and click <strong>Run</strong>.
              </li>
              <li>
                Come back here and click <strong>Reload</strong> below.
              </li>
            </ol>

            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={copySetupSql}
                className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-5 py-2.5 rounded-full text-sm shadow-md transition-colors"
              >
                {sqlCopied ? '✓ Copied' : '📋 Copy SQL'}
              </button>
              <button
                type="button"
                onClick={() => void load()}
                className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-modern-red text-charcoal font-bold px-5 py-2.5 rounded-full text-sm transition-colors"
              >
                ↻ Reload
              </button>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-modern-red text-charcoal font-bold px-5 py-2.5 rounded-full text-sm transition-colors"
              >
                Open Supabase ↗
              </a>
            </div>

            <pre className="bg-charcoal text-gray-100 text-xs leading-relaxed p-4 rounded-xl overflow-auto max-h-80 font-mono whitespace-pre-wrap break-words">
              {setupSql}
            </pre>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-sm">
            {error}
          </div>
        )}

        {rows === null ? (
          <p className="text-gray-500">Loading…</p>
        ) : rows.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
            <p className="text-gray-600 mb-4">No posts yet.</p>
            <button
              type="button"
              onClick={createBlank}
              disabled={creating}
              className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-5 py-2.5 rounded-full text-sm disabled:opacity-50"
            >
              Create your first draft
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left text-xs font-black uppercase tracking-widest text-gray-600">
                <tr>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Updated</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/blog/${r.id}`}
                        className="font-bold text-charcoal hover:text-modern-red"
                      >
                        {r.title || r.h1 || '(untitled)'}
                      </Link>
                      <div className="text-xs text-gray-500 mt-0.5">/blog/{r.slug}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          'inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ' +
                          (r.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'draft'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-200 text-gray-700')
                        }
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{r.category ?? '—'}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {new Date(r.updated_at).toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {r.status === 'published' && (
                        <Link
                          href={`/blog/${r.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-modern-red hover:text-modern-red-hover mr-4"
                        >
                          View ↗
                        </Link>
                      )}
                      <Link
                        href={`/admin/blog/${r.id}`}
                        className="text-xs font-bold text-charcoal hover:text-modern-red mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(r.id, r.title)}
                        className="text-xs font-bold text-gray-400 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
