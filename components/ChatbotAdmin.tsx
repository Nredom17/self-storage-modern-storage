'use client'

// Admin editor for chatbot Q&A. Lives at /admin/chatbot (password-protected by
// middleware.ts). Reads/writes via /api/admin/chatbot, which uses the Supabase
// service role. The live chat widget reads the same rows (active only).

import { useCallback, useEffect, useState } from 'react'
import { CHAT_LOCATIONS } from '@/lib/chatbot'

type AdminFaq = {
  id?: string
  question: string
  keywords: string
  answer: string
  button_label: string
  button_url: string
  location_answers: Record<string, string>
  active: boolean
  sort_order: number
}

type ApiRow = {
  id: string
  question: string
  keywords: string | null
  answer: string
  button_label: string | null
  button_url: string | null
  location_answers: Record<string, string> | null
  active: boolean
  sort_order: number
}

function blankFaq(sortOrder: number): AdminFaq {
  return {
    question: '',
    keywords: '',
    answer: '',
    button_label: '',
    button_url: '',
    location_answers: {},
    active: true,
    sort_order: sortOrder,
  }
}

function normalize(row: ApiRow): AdminFaq {
  return {
    id: row.id,
    question: row.question ?? '',
    keywords: row.keywords ?? '',
    answer: row.answer ?? '',
    button_label: row.button_label ?? '',
    button_url: row.button_url ?? '',
    location_answers: row.location_answers ?? {},
    active: row.active,
    sort_order: row.sort_order ?? 0,
  }
}

export default function ChatbotAdmin() {
  const [rows, setRows] = useState<AdminFaq[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<AdminFaq | null>(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/chatbot', { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || `Request failed (${res.status})`)
      setRows((json.faqs as ApiRow[]).map(normalize))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function save() {
    if (!editing) return
    if (!editing.question.trim() || !editing.answer.trim()) {
      setError('Question and answer are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const isUpdate = Boolean(editing.id)
      const res = await fetch('/api/admin/chatbot', {
        method: isUpdate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || `Save failed (${res.status})`)
      setEditing(null)
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(faq: AdminFaq) {
    if (!faq.id) return
    if (!confirm(`Delete this Q&A?\n\n“${faq.question}”`)) return
    setError('')
    try {
      const res = await fetch(`/api/admin/chatbot?id=${encodeURIComponent(faq.id)}`, {
        method: 'DELETE',
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || `Delete failed (${res.status})`)
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed.')
    }
  }

  async function toggleActive(faq: AdminFaq) {
    if (!faq.id) return
    setError('')
    try {
      const res = await fetch('/api/admin/chatbot', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...faq, active: !faq.active }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || `Update failed (${res.status})`)
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed.')
    }
  }

  const nextSort = rows.length ? Math.max(...rows.map((r) => r.sort_order)) + 1 : 1

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h1 className="text-2xl font-black text-charcoal">Chatbot Q&amp;A Editor</h1>
        <button
          type="button"
          onClick={() => {
            setEditing(blankFaq(nextSort))
            setError('')
          }}
          className="bg-modern-red hover:bg-modern-red-hover text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
        >
          + Add question
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        These answers power the chat widget on the website. Changes go live within about a minute.
        Hours are handled automatically and are not edited here.
      </p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-gray-500">No questions yet. Click “Add question” to create one.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((faq) => (
            <li
              key={faq.id}
              className={`flex flex-col rounded-xl border p-4 ${
                faq.active ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-charcoal">{faq.question}</p>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{faq.answer}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    Keywords: {faq.keywords || '—'}
                    {faq.button_label ? ` · Button: ${faq.button_label}` : ''}
                    {Object.keys(faq.location_answers).length
                      ? ` · ${Object.keys(faq.location_answers).length} location answer(s)`
                      : ''}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      faq.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {faq.active ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex gap-2 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => toggleActive(faq)}
                      className="text-gray-600 hover:text-charcoal"
                    >
                      {faq.active ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing({ ...faq, location_answers: { ...faq.location_answers } })
                        setError('')
                      }}
                      className="text-modern-red hover:text-modern-red-hover"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(faq)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-black text-charcoal">
              {editing.id ? 'Edit question' : 'Add question'}
            </h2>

            <label className="mt-4 block text-sm font-bold text-charcoal">Question</label>
            <input
              value={editing.question}
              onChange={(e) => setEditing({ ...editing, question: e.target.value })}
              placeholder="e.g. Do you offer climate-controlled units?"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-modern-red focus:outline-none"
            />

            <label className="mt-4 block text-sm font-bold text-charcoal">
              Keywords <span className="font-normal text-gray-400">(comma-separated)</span>
            </label>
            <input
              value={editing.keywords}
              onChange={(e) => setEditing({ ...editing, keywords: e.target.value })}
              placeholder="climate, temperature, air conditioned"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-modern-red focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-400">
              If a visitor types any of these words, the bot replies with this answer.
            </p>

            <label className="mt-4 block text-sm font-bold text-charcoal">Answer</label>
            <textarea
              value={editing.answer}
              onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
              rows={4}
              placeholder="The reply the bot gives…"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-modern-red focus:outline-none"
            />

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-charcoal">
                  Button label <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  value={editing.button_label}
                  onChange={(e) => setEditing({ ...editing, button_label: e.target.value })}
                  placeholder="View climate-controlled storage"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-modern-red focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-charcoal">
                  Button URL <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  value={editing.button_url}
                  onChange={(e) => setEditing({ ...editing, button_url: e.target.value })}
                  placeholder="https://…"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-modern-red focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm font-bold text-charcoal">
                <input
                  type="checkbox"
                  checked={editing.active}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                  className="h-4 w-4 accent-modern-red"
                />
                Active (shown to visitors)
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-charcoal">
                Order
                <input
                  type="number"
                  value={editing.sort_order}
                  onChange={(e) =>
                    setEditing({ ...editing, sort_order: Number(e.target.value) || 0 })
                  }
                  className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm focus:border-modern-red focus:outline-none"
                />
              </label>
            </div>

            <details className="mt-5 rounded-lg border border-gray-200 p-3">
              <summary className="cursor-pointer text-sm font-bold text-charcoal">
                Location-specific answers (optional)
              </summary>
              <p className="mt-2 text-xs text-gray-500">
                Leave blank to use the main answer everywhere. If you fill one in, the bot will ask
                which location, then give that store’s answer. Stores left blank use the main answer.
              </p>
              <div className="mt-3 space-y-3">
                {CHAT_LOCATIONS.map((loc) => (
                  <div key={loc.key}>
                    <label className="block text-xs font-bold text-gray-600">{loc.shortName}</label>
                    <textarea
                      value={editing.location_answers[loc.key] ?? ''}
                      onChange={(e) => {
                        const next = { ...editing.location_answers }
                        if (e.target.value.trim()) next[loc.key] = e.target.value
                        else delete next[loc.key]
                        setEditing({ ...editing, location_answers: next })
                      }}
                      rows={2}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-modern-red focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </details>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold text-charcoal hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-modern-red px-5 py-2 text-sm font-bold text-white hover:bg-modern-red-hover disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
