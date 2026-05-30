'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Admin-only list view at /admin/blog. Lives behind the HTTP Basic Auth
// gate (middleware.ts). Shows all posts (draft + published + archived),
// most-recently-updated first, with quick links into the editor and a
// "New Post" button that creates a blank draft and routes to its editor.

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

export default function BlogAdminList() {
  const router = useRouter()
  const [rows, setRows] = useState<Row[] | null>(null)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    const r = await fetch('/api/admin/blog', { cache: 'no-store' })
    const data = await r.json()
    setRows(data.posts ?? [])
  }
  useEffect(() => {
    void load()
  }, [])

  async function createBlank() {
    setCreating(true)
    setError(null)
    const stamp = new Date()
      .toISOString()
      .replace(/[-:T]/g, '')
      .slice(0, 12)
    const r = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: 'untitled-' + stamp,
        title: 'Untitled draft',
        h1: 'Untitled draft',
        meta_description: 'Edit me before publishing.',
        status: 'draft',
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
            <h1 className="text-3xl font-black text-charcoal tracking-tight">Blog editor</h1>
            <p className="text-sm text-gray-500 mt-1">
              Modern Storage® blog posts — write, save drafts, publish.
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
