import type { Metadata } from 'next'
import BlogAdminList from '@/components/BlogAdminList'

// Protected by middleware.ts HTTP Basic Auth + noindex.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Storage Tips Editor',
  robots: { index: false, follow: false },
}

export default function StorageTipsAdminPage() {
  return <BlogAdminList />
}
