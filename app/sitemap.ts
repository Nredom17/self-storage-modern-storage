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
  ]
}
