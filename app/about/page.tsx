import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import { getSupabaseClient } from '@/lib/supabase'
import AboutClient from './AboutClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: { absolute: 'About Modern Storage® | Arkansas Self Storage Company' },
  description:
    'Modern Storage® is Arkansas\u2019s award-winning self storage company — 10 locations, 10,000+ units, Top 50 nationally, 3x Best Self Storage. Locally owned since 2009.',
  alternates: { canonical: SITE_URL + '/about' },
  openGraph: {
    title: 'About Modern Storage® | Arkansas Self Storage Company',
    description: 'Award-winning Arkansas self storage since 2009. 10 locations, smart technology, and a team that actually cares.',
    url: SITE_URL + '/about',
    siteName: 'Modern Storage\u00ae',
    images: [{ url: SITE_URL + '/images/modern-storage-riverdale-facility-exterior.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': SITE_URL + '/#organization',
      name: 'Modern Storage\u00ae',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: SITE_URL + '/images/Modern Storage Logo for Website.png' },
      foundingDate: '2009',
      description: 'Award-winning Arkansas self storage company with 10 locations across the state.',
      areaServed: { '@type': 'State', name: 'Arkansas' },
      award: [
        'Top 50 Self Storage Management Company — Inside Self Storage',
        'Best Self Storage — Best of NW Arkansas 2023, 2024, 2025',
        'Best Self Storage — AR Democrat-Gazette Best of the Best 2023, 2024, 2025',
        'Top 10 Self Storage Podcast — Feedspot',
      ],
      sameAs: [
        'https://www.facebook.com/ModernStorage',
        'https://www.youtube.com/@modernstorage',
        'https://www.tiktok.com/@modernstorage',
      ],
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: 'English' },
    },
    {
      '@type': 'WebPage',
      '@id': SITE_URL + '/about#webpage',
      url: SITE_URL + '/about',
      name: 'About Modern Storage\u00ae',
      isPartOf: { '@id': SITE_URL + '/#website' },
      about: { '@id': SITE_URL + '/#organization' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'About', item: SITE_URL + '/about' },
        ],
      },
    },
  ],
}

const SOCIAL_DEFAULTS = {
  youtube_subscribers: '16K+',
  facebook_followers: '26K+',
  tiktok_likes: '1M+',
  updated_at: null as string | null,
}

export default async function AboutPage() {
  let social = { ...SOCIAL_DEFAULTS }

  const sb = getSupabaseClient()
  if (sb) {
    const { data } = await sb.from('social_stats').select('key,value,updated_at')
    if (data) {
      for (const row of data) {
        if (row.key in social) (social as Record<string, string | null>)[row.key] = row.value
        if (row.updated_at) social.updated_at = row.updated_at
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <AboutClient social={social} />
    </>
  )
}
