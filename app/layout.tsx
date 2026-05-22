import './globals.css'
import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'

// Re-render at most every 60s — picks up Supabase edits without a full code push.
export const revalidate = 60

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Self Storage Units in Arkansas | Modern Storage®',
    template: '%s | Modern Storage®',
  },
  description:
    'Find self-storage units across Arkansas with Modern Storage®. Climate-controlled storage, household storage, boat and RV parking, business storage, and free moving truck options available.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: 'Modern Storage® Self Storage',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  return (
    <html lang="en" className={bebasNeue.variable}>
      <body className="bg-gray-50 text-charcoal min-h-screen flex flex-col">
        <Header phoneDisplay={settings.phoneDisplay} phoneHref={settings.phoneHref} />
        <main className="flex-1">{children}</main>
        <Footer phoneDisplay={settings.phoneDisplay} phoneHref={settings.phoneHref} />
      </body>
    </html>
  )
}
