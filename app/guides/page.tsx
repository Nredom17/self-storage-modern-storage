import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import GuidesClient from './GuidesClient'
import { GUIDES, FAQS } from './data'

export const revalidate = 60

const PAGE_PATH = '/guides'

export const metadata: Metadata = {
  title: { absolute: 'Arkansas Self Storage Resource Center | Modern Storage®' },
  description:
    'The complete Modern Storage® self storage resource center — storage unit size guides, climate-controlled storage, moving storage, business storage, RV & boat storage, security guides, and Arkansas FAQs.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Arkansas Self Storage Resource Center | Modern Storage®',
    description: 'In-depth guides on apartment, moving, contractor, business, boat/RV, climate-controlled, and size selection for Arkansas self storage.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
  },
}

export default async function GuidesPage() {
  await getSiteSettings()
  return <GuidesClient guides={GUIDES} faqs={FAQS} />
}
