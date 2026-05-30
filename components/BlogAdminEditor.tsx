'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ImageUploadField from '@/components/ImageUploadField'

// Per-post editor at /admin/blog/[id]. Phase 1 uses simple inputs for the
// scalar SEO fields and a single JSON textarea for the `body` block array
// (so any block type defined in lib/blog.ts works without a custom UI
// per type). A richer block builder can replace the textarea later
// without changing the storage shape.

type Status = 'draft' | 'published' | 'archived'

type PostRow = {
  id: string
  slug: string
  status: Status
  published_at: string | null
  title: string
  h1: string
  meta_description: string
  canonical_url: string | null
  primary_keyword: string | null
  secondary_keywords: string[] | null
  entity_keywords: string[] | null
  category: string | null
  tags: string[] | null
  search_intent: string | null
  target_audience: string | null
  funnel_stage: string | null
  author: string | null
  reviewer: string | null
  last_reviewed_at: string | null
  disclaimer: string | null
  hero_image: string | null
  hero_alt: string | null
  hero_caption: string | null
  og_image: string | null
  twitter_image: string | null
  intro: string | null
  quick_answer: string | null
  body: unknown
  cta_label: string | null
  cta_url: string | null
  related_service_url: string | null
}

function csv(arr: string[] | null | undefined): string {
  return (arr ?? []).join(', ')
}
function splitCsv(s: string): string[] {
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
}

export default function BlogAdminEditor({ id }: { id: string }) {
  const router = useRouter()
  const [row, setRow] = useState<PostRow | null>(null)
  const [bodyJson, setBodyJson] = useState<string>('[]')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/blog', { cache: 'no-store' })
    const data = await r.json()
    const post = (data.posts as PostRow[]).find((p) => p.id === id)
    if (post) {
      setRow(post)
      setBodyJson(JSON.stringify(post.body ?? [], null, 2))
    } else {
      setError('Post not found.')
    }
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  function update<K extends keyof PostRow>(k: K, v: PostRow[K]) {
    setRow((r) => (r ? { ...r, [k]: v } : r))
  }

  async function save(nextStatus?: Status) {
    if (!row) return
    setSaving(true)
    setError(null)
    // Validate the body JSON before sending so we don't truncate work.
    let parsedBody: unknown
    try {
      parsedBody = JSON.parse(bodyJson)
      if (!Array.isArray(parsedBody)) throw new Error('body must be a JSON array of blocks')
    } catch (e) {
      setError('Body JSON is invalid: ' + (e instanceof Error ? e.message : 'parse error'))
      setSaving(false)
      return
    }
    const payload: Record<string, unknown> = {
      slug: row.slug,
      status: nextStatus ?? row.status,
      title: row.title,
      h1: row.h1,
      meta_description: row.meta_description,
      canonical_url: row.canonical_url || null,
      primary_keyword: row.primary_keyword || null,
      secondary_keywords: row.secondary_keywords ?? [],
      entity_keywords: row.entity_keywords ?? [],
      category: row.category || null,
      tags: row.tags ?? [],
      search_intent: row.search_intent || null,
      target_audience: row.target_audience || null,
      funnel_stage: row.funnel_stage || null,
      author: row.author || 'Modern Storage® Team',
      reviewer: row.reviewer || null,
      last_reviewed_at: row.last_reviewed_at || null,
      disclaimer: row.disclaimer || null,
      hero_image: row.hero_image || null,
      hero_alt: row.hero_alt || null,
      hero_caption: row.hero_caption || null,
      og_image: row.og_image || null,
      twitter_image: row.twitter_image || null,
      intro: row.intro || null,
      quick_answer: row.quick_answer || null,
      body: parsedBody,
      cta_label: row.cta_label || null,
      cta_url: row.cta_url || null,
      related_service_url: row.related_service_url || null,
    }

    const r = await fetch(`/api/admin/blog?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await r.json()
    setSaving(false)
    if (!r.ok) {
      setError(data.error ?? 'Save failed.')
      return
    }
    setRow(data.post)
    setBodyJson(JSON.stringify(data.post.body ?? [], null, 2))
    setSavedAt(new Date())
  }

  if (!row) {
    return (
      <main className="min-h-screen bg-gray-50 py-10 px-6 max-w-5xl mx-auto">
        <p className="text-gray-500">{error ?? 'Loading…'}</p>
        <Link href="/admin/blog" className="text-modern-red text-sm font-bold mt-4 inline-block">
          ← Back to blog list
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Sticky header bar with save/publish actions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-3 justify-between sticky top-4 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="text-sm text-gray-600 hover:text-modern-red font-bold"
            >
              ← All posts
            </Link>
            <span
              className={
                'inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ' +
                (row.status === 'published'
                  ? 'bg-emerald-100 text-emerald-800'
                  : row.status === 'draft'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-gray-200 text-gray-700')
              }
            >
              {row.status}
            </span>
            {savedAt && (
              <span className="text-xs text-gray-500">
                Saved {savedAt.toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {row.status === 'published' && (
              <Link
                href={`/blog/${row.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-modern-red hover:text-modern-red-hover px-3 py-2"
              >
                View live ↗
              </Link>
            )}
            <button
              type="button"
              onClick={() => save('draft')}
              disabled={saving}
              className="bg-gray-200 hover:bg-gray-300 text-charcoal font-bold px-5 py-2.5 rounded-full transition-colors text-sm disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save draft'}
            </button>
            <button
              type="button"
              onClick={() => save('published')}
              disabled={saving}
              className="bg-modern-red hover:bg-modern-red-hover text-white font-bold px-5 py-2.5 rounded-full transition-colors text-sm disabled:opacity-50"
            >
              {row.status === 'published' ? 'Update' : 'Publish'}
            </button>
            {row.status === 'published' && (
              <button
                type="button"
                onClick={() => save('archived')}
                disabled={saving}
                className="bg-white text-gray-600 border border-gray-300 hover:border-gray-400 font-bold px-5 py-2.5 rounded-full transition-colors text-sm disabled:opacity-50"
              >
                Archive
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-sm whitespace-pre-wrap">
            {error}
          </div>
        )}

        {/* Form sections */}
        <Section title="Identity & SEO">
          <Field label="Slug (URL path: /blog/<slug>)" value={row.slug} onChange={(v) => update('slug', v)} />
          <Field label="Page title (the <title> tag, ~60 chars max)" value={row.title} onChange={(v) => update('title', v)} />
          <Field label="H1 (on-page heading)" value={row.h1} onChange={(v) => update('h1', v)} />
          <Textarea label="Meta description (~155 chars max)" value={row.meta_description} onChange={(v) => update('meta_description', v)} rows={2} />
          <Field label="Canonical URL (optional override)" value={row.canonical_url ?? ''} onChange={(v) => update('canonical_url', v)} />
          <Field label="Primary keyword" value={row.primary_keyword ?? ''} onChange={(v) => update('primary_keyword', v)} />
          <Field label="Secondary keywords (comma-separated)" value={csv(row.secondary_keywords)} onChange={(v) => update('secondary_keywords', splitCsv(v))} />
          <Field label="Entity keywords (comma-separated)" value={csv(row.entity_keywords)} onChange={(v) => update('entity_keywords', splitCsv(v))} />
        </Section>

        <Section title="Classification">
          <Field label="Category (e.g. sizing / security / pricing)" value={row.category ?? ''} onChange={(v) => update('category', v)} />
          <Field label="Tags (comma-separated)" value={csv(row.tags)} onChange={(v) => update('tags', splitCsv(v))} />
          <Field label="Search intent (informational / commercial / transactional)" value={row.search_intent ?? ''} onChange={(v) => update('search_intent', v)} />
          <Field label="Target audience" value={row.target_audience ?? ''} onChange={(v) => update('target_audience', v)} />
          <Field label="Funnel stage (awareness / consideration / decision)" value={row.funnel_stage ?? ''} onChange={(v) => update('funnel_stage', v)} />
        </Section>

        <Section title="Authorship & legal">
          <Field label="Author" value={row.author ?? ''} onChange={(v) => update('author', v)} />
          <Field label="Reviewer (optional)" value={row.reviewer ?? ''} onChange={(v) => update('reviewer', v)} />
          <Field label="Last reviewed (YYYY-MM-DD)" value={row.last_reviewed_at ?? ''} onChange={(v) => update('last_reviewed_at', v)} />
          <Textarea label="Brand / legal disclaimer (optional)" value={row.disclaimer ?? ''} onChange={(v) => update('disclaimer', v)} rows={3} />
        </Section>

        <Section title="Hero & social images">
          <ImageUploadField
            label="Hero image"
            value={row.hero_image ?? ''}
            onChange={(v) => update('hero_image', v)}
            hint="Click Upload to drop a file straight into Supabase Storage, or paste a /images/* path or full URL. JPG / PNG / WebP / AVIF / GIF, 5 MB max."
          />
          <Field label="Hero alt text (under 125 chars)" value={row.hero_alt ?? ''} onChange={(v) => update('hero_alt', v)} />
          <Field label="Hero caption (optional, italic under image)" value={row.hero_caption ?? ''} onChange={(v) => update('hero_caption', v)} />
          <ImageUploadField
            label="Open Graph image override (optional — defaults to hero)"
            value={row.og_image ?? ''}
            onChange={(v) => update('og_image', v)}
            hint="Used when the post is shared on Facebook, LinkedIn, etc. 1200×630 recommended."
          />
          <ImageUploadField
            label="Twitter card image override (optional — defaults to hero)"
            value={row.twitter_image ?? ''}
            onChange={(v) => update('twitter_image', v)}
          />
        </Section>

        <Section title="Content">
          <Textarea label="Intro paragraph (lead, sets up the article)" value={row.intro ?? ''} onChange={(v) => update('intro', v)} rows={4} />
          <Textarea label="Quick-answer block (answer-first paragraph for PAA / AI Overview)" value={row.quick_answer ?? ''} onChange={(v) => update('quick_answer', v)} rows={4} />
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-1.5">
              Body (JSON array of blocks)
            </label>
            <textarea
              value={bodyJson}
              onChange={(e) => setBodyJson(e.target.value)}
              rows={20}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono leading-relaxed focus:outline-none focus:border-modern-red"
              spellCheck={false}
            />
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Each entry has a <code className="bg-gray-100 px-1 rounded">type</code> field. Supported:
              <code className="bg-gray-100 px-1 mx-1 rounded">heading</code>
              <code className="bg-gray-100 px-1 mx-1 rounded">paragraph</code>
              <code className="bg-gray-100 px-1 mx-1 rounded">list</code>
              <code className="bg-gray-100 px-1 mx-1 rounded">quote</code>
              <code className="bg-gray-100 px-1 mx-1 rounded">callout</code>
              <code className="bg-gray-100 px-1 mx-1 rounded">image</code>
              <code className="bg-gray-100 px-1 mx-1 rounded">cta</code>
              <code className="bg-gray-100 px-1 mx-1 rounded">comparison</code>
              <code className="bg-gray-100 px-1 mx-1 rounded">faq</code>
            </p>
          </div>
          {/* In-body image uploader. Uploads to Supabase Storage and
              appends a ready-made { type: 'image', ... } block to the
              JSON above so editors don't have to hand-edit JSON to add
              a photo. */}
          <BodyImageUploader
            onUploaded={(url) => {
              let arr: unknown
              try {
                arr = JSON.parse(bodyJson)
              } catch {
                arr = []
              }
              const next = Array.isArray(arr) ? [...arr, { type: 'image', src: url, alt: '' }] : [{ type: 'image', src: url, alt: '' }]
              setBodyJson(JSON.stringify(next, null, 2))
            }}
          />
        </Section>

        <Section title="Conversion">
          <Field label="CTA button label (footer)" value={row.cta_label ?? ''} onChange={(v) => update('cta_label', v)} />
          <Field label="CTA button URL" value={row.cta_url ?? ''} onChange={(v) => update('cta_url', v)} />
          <Field label="Related service-page URL (internal link)" value={row.related_service_url ?? ''} onChange={(v) => update('related_service_url', v)} />
        </Section>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
      <h2 className="text-lg font-black text-charcoal mb-5 tracking-tight">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-modern-red"
      />
    </div>
  )
}

function Textarea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm leading-relaxed focus:outline-none focus:border-modern-red"
      />
    </div>
  )
}

// "Add an image to the body" helper. Lets the editor upload a file and
// have a ready-made { type: 'image', src, alt } block appended to the
// body JSON above — saves them from hand-editing JSON. The image block
// still needs an alt value, so we leave alt: '' for the editor to fill
// in before publishing.
function BodyImageUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [tempUrl, setTempUrl] = useState('')
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <p className="text-xs font-black uppercase tracking-widest text-gray-600 mb-2">
        Add an image block to the body
      </p>
      <p className="text-xs text-gray-500 mb-3 leading-relaxed">
        Upload an image and we'll append a ready-made <code className="bg-gray-100 px-1 rounded">{'{ type: "image", src, alt }'}</code> block to the JSON above. Don't forget to fill in the <code className="bg-gray-100 px-1 rounded">alt</code> field before publishing.
      </p>
      <ImageUploadField
        label="Upload image"
        value={tempUrl}
        onChange={(v) => {
          setTempUrl(v)
          if (v) {
            onUploaded(v)
            // Reset so the same widget can be reused for the next image
            // without re-clearing manually.
            window.setTimeout(() => setTempUrl(''), 50)
          }
        }}
      />
    </div>
  )
}
