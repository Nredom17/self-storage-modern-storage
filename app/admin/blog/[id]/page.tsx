import type { Metadata } from 'next'
import BlogAdminEditor from '@/components/BlogAdminEditor'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Edit Blog Post',
  robots: { index: false, follow: false },
}

export default function BlogAdminEditPage({ params }: { params: { id: string } }) {
  return <BlogAdminEditor id={params.id} />
}
