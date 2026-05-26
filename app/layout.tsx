import './globals.css'
import type { Metadata } from 'next'
import { Bebas_Neue } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'

// Google Tag Manager — only fires when the env var is set in Vercel.
// Marketing team manages GA4, conversions, Meta Pixel, call tracking, etc. via
// the GTM dashboard; no code deploy needed to add or change tags.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''

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
    siteName: 'Modern Storage®',
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
      <head>
        {GTM_ID && (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body className="bg-gray-50 text-charcoal min-h-screen flex flex-col">
        {/* GTM noscript iframe — fires for users with JS disabled */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              aria-hidden="true"
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <Header phoneDisplay={settings.phoneDisplay} phoneHref={settings.phoneHref} />
        <main className="flex-1">{children}</main>
        <Footer phoneDisplay={settings.phoneDisplay} phoneHref={settings.phoneHref} />
      </body>
    </html>
  )
}
