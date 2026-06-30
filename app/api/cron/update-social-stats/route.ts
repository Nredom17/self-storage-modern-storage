import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Vercel Cron: runs daily at 9am CT (14:00 UTC)
// Env vars needed:
//   SUPABASE_SERVICE_ROLE_KEY  — Supabase service role (write access)
//   NEXT_PUBLIC_SUPABASE_URL   — Supabase project URL
//   YOUTUBE_API_KEY            — YouTube Data API v3 key
//   YOUTUBE_CHANNEL_ID         — Channel ID (UCxxxxxx, find in YouTube Studio → Settings → Channel)
//   CRON_SECRET                — Random string, add to Vercel env + vercel.json header check

export const runtime = 'nodejs'
export const maxDuration = 30

const FALLBACK = {
  youtube_subscribers: '16K+',
  facebook_followers: '26K+',
  tiktok_likes: '1M+',
}

async function fetchYouTubeStats(): Promise<{ subscribers: string } | null> {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  if (!apiKey || !channelId) return null

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    const res = await fetch(url, { next: { revalidate: 0 } })
    if (!res.ok) return null
    const data = await res.json()
    const stats = data?.items?.[0]?.statistics
    if (!stats) return null
    const raw = parseInt(stats.subscriberCount || '0', 10)
    const formatted = raw >= 1000000 ? (raw / 1000000).toFixed(1) + 'M+' :
                      raw >= 1000 ? Math.floor(raw / 1000) + 'K+' : String(raw)
    return { subscribers: formatted }
  } catch {
    return null
  }
}

// Facebook & TikTok require app approval — architecture is ready, keys wire in later
async function fetchFacebookStats(): Promise<{ followers: string } | null> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  const pageId = process.env.FACEBOOK_PAGE_ID
  if (!token || !pageId) return null

  try {
    const url = `https://graph.facebook.com/v19.0/${pageId}?fields=followers_count&access_token=${token}`
    const res = await fetch(url, { next: { revalidate: 0 } })
    if (!res.ok) return null
    const data = await res.json()
    const raw = data?.followers_count || 0
    const formatted = raw >= 1000 ? Math.floor(raw / 1000) + 'K+' : String(raw)
    return { followers: formatted }
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const now = new Date().toISOString()
  const updates: Array<{ key: string; value: string; updated_at: string }> = []
  const errors: string[] = []

  // YouTube
  const yt = await fetchYouTubeStats()
  if (yt) {
    updates.push({ key: 'youtube_subscribers', value: yt.subscribers, updated_at: now })
  } else {
    errors.push('YouTube: no data (check YOUTUBE_API_KEY + YOUTUBE_CHANNEL_ID)')
  }

  // Facebook
  const fb = await fetchFacebookStats()
  if (fb) {
    updates.push({ key: 'facebook_followers', value: fb.followers, updated_at: now })
  } else {
    errors.push('Facebook: no data (check FACEBOOK_PAGE_ACCESS_TOKEN + FACEBOOK_PAGE_ID)')
  }

  // TikTok: official API requires business approval — using manual update for now
  // When TikTok API access is granted, add fetchTikTokStats() here

  // Upsert whatever we got — never overwrite with empty/null
  if (updates.length > 0) {
    const { error } = await sb.from('social_stats').upsert(updates, { onConflict: 'key' })
    if (error) errors.push(`Supabase write error: ${error.message}`)
  }

  return NextResponse.json({
    ok: true,
    updated: updates.map((u) => u.key),
    errors,
    timestamp: now,
  })
}
