import type { Metadata } from 'next'
import BlogAdminList from '@/components/BlogAdminList'

// Protected by middleware.ts HTTP Basic Auth + noindex.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog Editor',
  robots: { index: false, follow: false },
}

export default function BlogAdminPage() {
  return <BlogAdminList />
}
