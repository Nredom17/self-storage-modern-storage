// Modern Storage® — "Storage Tips" (a.k.a. blog) data model + helpers.
//
// PUBLIC KILL-SWITCH
// ────────────────────────────────────────────────────────────────────────
// The customer-facing pages at /blog and /blog/[slug] are PUBLIC by default
// now — the section has launched and posts are live as soon as they're
// flipped to "Published" in /admin/blog.
//
// To temporarily TAKE THE BLOG PRIVATE again (rare, e.g. during a big
// rewrite or if everything needs to come down for legal review), set:
//
//   In Vercel → Project Settings → Environment Variables:
//     STORAGE_TIPS_PUBLIC = false       (any of: false / 0 / off / no)
//
//   Then redeploy. The /blog index and every /blog/[slug] page will 404
//   for the public while admin keeps full access.
//
// The admin pages at /admin/blog and /admin/blog/[id] are ALWAYS
// accessible (behind the HTTP Basic Auth middleware) regardless of the
// public flag — so you can still write and stage posts privately.
export function isStorageTipsPublic(): boolean {
  const v = (process.env.STORAGE_TIPS_PUBLIC ?? '').trim().toLowerCase()
  // Public by default. Only an explicit "off" value disables.
  return v !== 'false' && v !== '0' && v !== 'off' && v !== 'no'
}

// Public-facing brand name for the section. The URL path stays /blog
// because it's semantic for crawlers and SEO, but every visible label
// reads "Storage Tips" so the customer sees the brand framing.
export const STORAGE_TIPS_BRAND = 'Storage Tips'

//
// One row in the Supabase `blog_posts` table maps to one BlogPost in this
// file. The `body` jsonb column holds an array of BlogBlock structures
// rendered by components/BlogBlocks.tsx — the block schema is the editorial
// contract between admin edits and public render.
//
// Adding a new block type is a 3-step change:
//   1. add the variant to BlogBlock here
//   2. handle it in components/BlogBlocks.tsx
//   3. (optional) document it in /admin/blog so editors know it exists
//
// The block list is intentionally short for Phase 1 (heading, paragraph,
// list, quote, callout, image, cta, comparison, faq). More can be added
// later without breaking existing rows because each block carries its own
// `type` tag.

import { getSupabaseClient } from '@/lib/supabase'

export type BlogStatus = 'draft' | 'published' | 'archived'

export type BlogBlock =
  | { type: 'heading'; level: 2 | 3; text: string; anchor?: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }
  | {
      type: 'callout'
      // Color-coded callout tones. info=gray for general notes,
      // tip=blue for helpful guidance, success=green for positive
      // confirmations, warn=amber for caveats, danger=red for
      // prohibited actions, fees, or policy enforcement.
      tone?: 'info' | 'tip' | 'success' | 'warn' | 'danger'
      title?: string
      text: string
    }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | {
      type: 'cta'
      label: string
      href: string
      variant?: 'primary' | 'secondary'
    }
  | {
      type: 'comparison'
      leftHeader?: string
      rightHeader?: string
      rows: { left: string; right: string }[]
    }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | {
      // Key Takeaways block — a styled summary box that goes at the top of
      // a post. Renders as a red-accent card with a bulleted list. Great
      // for policy articles, "things to know before X" posts, and any
      // content where the visitor needs the bottom line before the body.
      type: 'takeaways'
      title?: string
      items: string[]
    }
  | {
      // Table-of-contents block. When the renderer hits this, it walks
      // the entire body array and lists every heading-block as a sticky
      // jump link. Each heading needs an `anchor` field (or it gets one
      // auto-derived from the text) for the # link to work.
      type: 'toc'
      title?: string
    }

export type BlogPost = {
  id: string
  slug: string
  status: BlogStatus
  publishedAt: string | null
  createdAt: string
  updatedAt: string

  // SEO meta
  title: string
  h1: string
  metaDescription: string
  canonicalUrl: string | null
  primaryKeyword: string | null
  secondaryKeywords: string[]
  entityKeywords: string[]

  // Classification
  category: string | null
  tags: string[]
  searchIntent: string | null
  targetAudience: string | null
  funnelStage: string | null

  // Authorship
  author: string
  reviewer: string | null
  lastReviewedAt: string | null
  disclaimer: string | null

  // Hero / social images
  heroImage: string | null
  heroAlt: string | null
  heroCaption: string | null
  ogImage: string | null
  twitterImage: string | null

  // Content
  intro: string | null
  quickAnswer: string | null
  body: BlogBlock[]

  // Conversion
  ctaLabel: string | null
  ctaUrl: string | null
  relatedServiceUrl: string | null

  // Reading metadata
  readingMinutes: number | null
  wordCount: number | null
}

// Row shape from Supabase — snake_case to BlogPost camelCase mapper.
type DbBlogPost = {
  id: string
  slug: string
  status: BlogStatus
  published_at: string | null
  created_at: string
  updated_at: string
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
  body: BlogBlock[] | null
  cta_label: string | null
  cta_url: string | null
  related_service_url: string | null
  reading_minutes: number | null
  word_count: number | null
}

// Deep-normalize the body array so every block has the fields the
// renderer expects, with safe defaults for anything missing. This
// is the load-bearing safety net behind the static prerender — any
// unexpected null / undefined / wrong-type field at runtime would
// otherwise crash the build. New block types can be added to the
// switch as needed.
function normalizeBody(raw: unknown[]): BlogBlock[] {
  const out: BlogBlock[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const b = item as Record<string, unknown>
    const type = typeof b.type === 'string' ? b.type : ''
    const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : [])
    const str = (v: unknown, fallback = ''): string => (typeof v === 'string' ? v : fallback)
    switch (type) {
      case 'heading':
        out.push({
          type: 'heading',
          level: b.level === 3 ? 3 : 2,
          text: str(b.text),
          anchor: typeof b.anchor === 'string' ? b.anchor : undefined,
        } as BlogBlock)
        break
      case 'paragraph':
        out.push({ type: 'paragraph', text: str(b.text) } as BlogBlock)
        break
      case 'list':
        out.push({
          type: 'list',
          ordered: Boolean(b.ordered),
          items: arr(b.items).map((it) => str(it)),
        } as BlogBlock)
        break
      case 'quote':
        out.push({
          type: 'quote',
          text: str(b.text),
          attribution: typeof b.attribution === 'string' ? b.attribution : undefined,
        } as BlogBlock)
        break
      case 'callout':
        out.push({
          type: 'callout',
          variant: b.variant === 'warning' || b.variant === 'success' ? b.variant : 'info',
          title: typeof b.title === 'string' ? b.title : undefined,
          text: str(b.text),
        } as BlogBlock)
        break
      case 'image':
        out.push({
          type: 'image',
          src: str(b.src),
          alt: str(b.alt),
          caption: typeof b.caption === 'string' ? b.caption : undefined,
        } as BlogBlock)
        break
      case 'cta':
        out.push({
          type: 'cta',
          label: str(b.label),
          href: str(b.href),
          variant: b.variant === 'secondary' ? 'secondary' : 'primary',
        } as BlogBlock)
        break
      case 'comparison':
        out.push({
          type: 'comparison',
          leftHeader: typeof b.leftHeader === 'string' ? b.leftHeader : undefined,
          rightHeader: typeof b.rightHeader === 'string' ? b.rightHeader : undefined,
          rows: arr(b.rows)
            .map((r) => {
              if (!r || typeof r !== 'object') return null
              const row = r as Record<string, unknown>
              return { left: str(row.left), right: str(row.right) }
            })
            .filter((r): r is { left: string; right: string } => r !== null),
        } as BlogBlock)
        break
      case 'faq':
        out.push({
          type: 'faq',
          items: arr(b.items)
            .map((q) => {
              if (!q || typeof q !== 'object') return null
              const item = q as Record<string, unknown>
              return { q: str(item.q), a: str(item.a) }
            })
            .filter((q): q is { q: string; a: string } => q !== null),
        } as BlogBlock)
        break
      case 'takeaways':
        out.push({
          type: 'takeaways',
          title: typeof b.title === 'string' ? b.title : undefined,
          items: arr(b.items).map((it) => str(it)),
        } as BlogBlock)
        break
      case 'toc':
        out.push({
          type: 'toc',
          title: typeof b.title === 'string' ? b.title : undefined,
        } as BlogBlock)
        break
      default:
        // Unknown block type — skip silently so the renderer can't fall
        // into a render branch that doesn't exist.
        break
    }
  }
  return out
}

function mapDb(row: DbBlogPost): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    title: row.title ?? '',
    h1: row.h1,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    primaryKeyword: row.primary_keyword,
    secondaryKeywords: row.secondary_keywords ?? [],
    entityKeywords: row.entity_keywords ?? [],
    category: row.category,
    tags: row.tags ?? [],
    searchIntent: row.search_intent,
    targetAudience: row.target_audience,
    funnelStage: row.funnel_stage,
    author: row.author ?? 'Modern Storage® Team',
    reviewer: row.reviewer,
    lastReviewedAt: row.last_reviewed_at,
    disclaimer: row.disclaimer,
    heroImage: row.hero_image,
    heroAlt: row.hero_alt,
    heroCaption: row.hero_caption,
    ogImage: row.og_image,
    twitterImage: row.twitter_image,
    intro: row.intro,
    quickAnswer: row.quick_answer,
    body: Array.isArray(row.body) ? normalizeBody(row.body) : [],
    ctaLabel: row.cta_label,
    ctaUrl: row.cta_url,
    relatedServiceUrl: row.related_service_url,
    readingMinutes: row.reading_minutes,
    wordCount: row.word_count,
  }
}

// ─── Public read paths ────────────────────────────────────────────────────

/** All published posts, newest first. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const client = getSupabaseClient()
  if (!client) return []
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  if (error || !data) return []
  return (data as DbBlogPost[]).map(mapDb)
}

/** Single published post by slug. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = getSupabaseClient()
  if (!client) return null
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  if (error || !data) return null
  return mapDb(data as DbBlogPost)
}

/** Slugs only — used by the sitemap. */
export async function getPublishedSlugs(): Promise<string[]> {
  const client = getSupabaseClient()
  if (!client) return []
  const { data, error } = await client
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
  if (error || !data) return []
  return (data as { slug: string }[]).map((r) => r.slug)
}

// ─── Admin read path (includes drafts) ────────────────────────────────────
// Server-side only — used by /api/admin/blog and /admin/blog pages.
// Requires the SUPABASE_SERVICE_ROLE_KEY env var to bypass RLS.

export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  const client = getSupabaseClient()
  if (!client) return []
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false })
  if (error || !data) return []
  return (data as DbBlogPost[]).map(mapDb)
}

export async function getPostByIdAdmin(id: string): Promise<BlogPost | null> {
  const client = getSupabaseClient()
  if (!client) return null
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error || !data) return null
  return mapDb(data as DbBlogPost)
}

// ─── Slug + reading-time helpers ─────────────────────────────────────────

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/®|™|©/g, '') // strip brand marks
    .replace(/[^a-z0-9\s-]/g, '') // drop punctuation
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
}

/** Approximate reading time (words / 220 wpm). Used when not set explicitly. */
export function estimateReadingMinutes(text: string): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(wordCount / 220))
}

/** Word count across intro + quick_answer + body text blocks. */
export function countWords(post: BlogPost): number {
  const pieces: string[] = []
  if (post.intro) pieces.push(post.intro)
  if (post.quickAnswer) pieces.push(post.quickAnswer)
  for (const b of post.body) {
    if (b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote') pieces.push(b.text)
    if (b.type === 'callout') pieces.push((b.title ?? '') + ' ' + b.text)
    if (b.type === 'list') pieces.push(b.items.join(' '))
    if (b.type === 'comparison') {
      for (const r of b.rows) pieces.push(r.left + ' ' + r.right)
    }
    if (b.type === 'faq') {
      for (const q of b.items) pieces.push(q.q + ' ' + q.a)
    }
  }
  return pieces.join(' ').split(/\s+/).filter(Boolean).length
}
