import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import AIStorageSizeFinder from './AIStorageSizeFinder'

export const metadata: Metadata = {
  title: 'AI Storage Size Finder | Modern Storage®',
  description:
    'Find the right Modern Storage® unit size in under 30 seconds. The AI Storage Size Finder recommends the best fit based on your living situation, how packed your stuff is, and the major items you need to store.',
  alternates: { canonical: SITE_URL + '/AIStorageSizeFinder' },
  // Utility tool, not a content page — keep it out of search results so it
  // doesn't compete with the storage category pages for organic traffic.
  robots: { index: false, follow: true },
}

export default function Page() {
  return <AIStorageSizeFinder />
}
