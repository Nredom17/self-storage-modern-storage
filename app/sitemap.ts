import type { MetadataRoute } from 'next'
import { SITE_URL, THEME_PAGES, LOCATIONS } from '@/lib/site'
import { REVIEW_FACILITY_CONFIG, REVIEWS_ENABLED } from '@/lib/reviews'

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
    // Reviews hub + one page per facility (reviews refresh daily).
    // Omitted entirely while the Reviews section is switched off.
    ...(REVIEWS_ENABLED
      ? [
          {
            url: SITE_URL + '/reviews',
            lastModified: now,
            changeFrequency: 'daily' as const,
            priority: 0.8,
          },
          ...REVIEW_FACILITY_CONFIG.filter((f) => f.visible).map((f) => ({
            url: SITE_URL + '/reviews/' + f.slug,
            lastModified: now,
            changeFrequency: 'daily' as const,
            priority: 0.6,
          })),
        ]
      : []),
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
      url: SITE_URL + '/business-storage-bentonville',
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
    // ── Guides hub + cluster pages ───────────────────────────
    {
      url: SITE_URL + '/guides',
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: SITE_URL + '/guides/apartment-storage',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/guides/moving-storage',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // ── New lake & regional boat/RV guides (NWA + Hot Springs + central AR)
    {
      url: SITE_URL + '/storage-near-lake-hamilton',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/storage-near-lake-ouachita',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/storage-near-table-rock-lake',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/storage-near-greers-ferry-lake',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/boat-storage-near-hot-springs',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: SITE_URL + '/rv-boat-storage-northwest-arkansas',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // ── Pricing + Fayetteville ───────────────────────────────
    // /pricing gets high priority — pricing intent is one of the
    // biggest transactional query clusters in the market.
    {
      url: SITE_URL + '/pricing',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: SITE_URL + '/storage-near-fayetteville',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
}
