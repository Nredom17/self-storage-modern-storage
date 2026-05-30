'use client'

import { useRef, useState } from 'react'

// Single reusable image-upload widget used everywhere in the Storage Tips
// editor that previously had a bare URL/path text input. Hybrid UX —
// editors can still paste a URL or /images/* path manually, OR click
// Upload to drop a file straight into Supabase Storage and have the URL
// filled in automatically.
//
// Posts to /api/admin/blog/upload (multipart). That endpoint is behind
// the same HTTP Basic Auth as the rest of /api/admin/*, so the upload
// inherits the auth gate the editor already passed.
//
// Shows:
//   • The current value (text input — editable)
//   • An "Upload" button → opens the file picker
//   • Progress / error state next to the button
//   • A small image preview when value points at something loadable

export default function ImageUploadField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  hint?: string
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setError(null)
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const r = await fetch('/api/admin/blog/upload', { method: 'POST', body: form })
      const data = (await r.json()) as { url?: string; error?: string }
      if (!r.ok || !data.url) {
        setError(data.error ?? `Upload failed (${r.status}).`)
        return
      }
      onChange(data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function openPicker() {
    if (uploading) return
    inputRef.current?.click()
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) void handleFile(f)
  }

  // Show a thumbnail when the value points at something loadable. We use
  // a vanilla <img> here (not next/image) because admin previews don't
  // need the optimization layer and an external URL would require domain
  // allowlisting in next.config — not worth it for an internal preview.
  const showPreview = value.trim().length > 0

  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-1.5">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 items-stretch">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/your-photo.jpg  or paste a URL"
          className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-modern-red"
        />
        <button
          type="button"
          onClick={openPicker}
          disabled={uploading}
          className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {uploading ? (
            <>
              <span className="inline-block w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" aria-hidden="true" />
              Uploading…
            </>
          ) : (
            <>📤 Upload</>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
      {error && (
        <p className="text-xs text-red-600 mt-1.5 leading-relaxed">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{hint}</p>
      )}
      {showPreview && (
        <div className="mt-2 inline-block rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="block max-h-24 w-auto"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
      )}
    </div>
  )
}
