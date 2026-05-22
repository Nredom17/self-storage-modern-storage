import type { MetadataRoute } from 'next'
import { SITE_URL, THEME_PAGES } from '@/lib/site'

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
  ]
}
