// Image upload endpoint for the Storage Tips admin editor. Accepts a
// multipart/form-data POST with a single `file` field, stores it in
// Supabase Storage under the `storage-tips-images` public bucket, and
// returns the public URL.
//
// Sits behind middleware.ts HTTP Basic Auth — same gate as the rest of
// /api/admin/*. Service-role Supabase client used for the upload so we
// don't need RLS policies on the storage bucket.
//
// The bucket is auto-created on first upload (public, 5 MB per-file
// limit, jpg/png/webp/avif only) so the editor never sees a "bucket
// not found" error path.

import { NextResponse } from 'next/server'
import { getServiceSupabaseClient } from '@/lib/supabase'
import { slugify } from '@/lib/blog'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BUCKET = 'storage-tips-images'
// Vercel's serverless function body limit is ~4.5 MB. Setting our cap at
// 4 MB keeps us comfortably under that so the platform never intercepts
// a too-large request with a plain-text "Request Entity Too Large"
// response (which broke the editor's JSON.parse).
const MAX_BYTES = 4 * 1024 * 1024 // 4 MB hard cap
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
])

// File extension preserved from the original upload so the URL stays
// human-readable. Falls back to .bin if we somehow get an unknown type.
function extensionFor(file: File): string {
  const orig = file.name.toLowerCase()
  const dot = orig.lastIndexOf('.')
  if (dot >= 0) {
    const ext = orig.slice(dot + 1)
    if (/^[a-z0-9]{2,5}$/.test(ext)) return ext
  }
  const m = (file.type || '').toLowerCase()
  if (m === 'image/jpeg') return 'jpg'
  if (m === 'image/png') return 'png'
  if (m === 'image/webp') return 'webp'
  if (m === 'image/avif') return 'avif'
  if (m === 'image/gif') return 'gif'
  return 'bin'
}

async function ensureBucket(client: ReturnType<typeof getServiceSupabaseClient>) {
  if (!client) return
  // listBuckets is cheap and idempotent; createBucket fails if the bucket
  // already exists (error code != 200) so we check first.
  const { data: buckets } = await client.storage.listBuckets()
  if (buckets?.some((b) => b.name === BUCKET)) return
  const { error } = await client.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: MAX_BYTES,
    allowedMimeTypes: Array.from(ALLOWED_MIME),
  })
  if (error) throw new Error('Could not create storage bucket: ' + error.message)
}

export async function POST(req: Request) {
  const client = getServiceSupabaseClient()
  if (!client) {
    return NextResponse.json(
      { error: 'Supabase service role not configured.' },
      { status: 500 },
    )
  }

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Expected multipart/form-data body.' }, { status: 400 })
  }
  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }
  if (file.size === 0) {
    return NextResponse.json({ error: 'File is empty.' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File is ${(file.size / 1024 / 1024).toFixed(1)} MB — limit is 4 MB.` },
      { status: 413 },
    )
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type "${file.type}". Use JPG, PNG, WebP, AVIF, or GIF.` },
      { status: 415 },
    )
  }

  try {
    await ensureBucket(client)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Bucket creation failed.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  // Filename: slugified original stem + timestamp + extension. Timestamp
  // avoids collisions when an editor uploads the same name twice.
  const stem = file.name.replace(/\.[^.]+$/, '')
  const slug = slugify(stem || 'image') || 'image'
  const ts = Date.now()
  const ext = extensionFor(file)
  const objectPath = `${slug}-${ts}.${ext}`

  const buf = Buffer.from(await file.arrayBuffer())
  const { error: uploadErr } = await client.storage
    .from(BUCKET)
    .upload(objectPath, buf, {
      contentType: file.type,
      cacheControl: '31536000', // 1 year — filenames are uniquely timestamped
      upsert: false,
    })
  if (uploadErr) {
    return NextResponse.json({ error: 'Upload failed: ' + uploadErr.message }, { status: 500 })
  }

  const { data: urlData } = client.storage.from(BUCKET).getPublicUrl(objectPath)
  return NextResponse.json({
    url: urlData.publicUrl,
    path: objectPath,
    bytes: file.size,
    mime: file.type,
  })
}
