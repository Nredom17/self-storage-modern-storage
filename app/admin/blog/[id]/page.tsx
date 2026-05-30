import type { Metadata } from 'next'
import BlogAdminEditor from '@/components/BlogAdminEditor'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Edit Storage Tip',
  robots: { index: false, follow: false },
}

export default function StorageTipsAdminEditPage({ params }: { params: { id: string } }) {
  return <BlogAdminEditor id={params.id} />
}
