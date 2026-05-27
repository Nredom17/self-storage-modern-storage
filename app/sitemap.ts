import type { MetadataRoute } from 'next'
import { SITE_URL, THEME_PAGES, LOCATIONS } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE_URL + '/', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...THEME_PAGES.map((p) => ({
      url: SITE_URL + p.href,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: SITE_URL + '/locations',
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Per-city location pages — one URL per facility
    ...LOCATIONS.map((loc) => ({
      url: SITE_URL + '/locations/' + loc.slug,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: SITE_URL + '/ai-storage-size-finder',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/free-moving-truck',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/move-in-checklist',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/contact',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: SITE_URL + '/faq',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/size-guide',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // ── Long-tail authority pages ────────────────────────────
    // These deepen topical coverage and link INTO the main location
    // pages — they support, not replace, the core /locations/[slug] URLs.
    {
      url: SITE_URL + '/storage-for-walmart-vendors',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/storage-near-beaver-lake',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/contractor-storage-little-rock',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/climate-controlled-arkansas-humidity',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
}
