import './globals.css'
import type { Metadata } from 'next'
import { Bebas_Neue, Poppins } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import ChatWidget from '@/components/ChatWidget'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings, getChatFaqs } from '@/lib/data'

// Google Tag Manager — only fires when the env var is set in Vercel.
// Marketing team manages GA4, conversions, Meta Pixel, call tracking, etc. via
// the GTM dashboard; no code deploy needed to add or change tags.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''

// OpenAI Ads Pixel (oaiq). Fires a page_view on every load and exposes
// window.oaiq for per-event conversion calls — e.g., reservations,
// contact-form submissions, chat-lead captures.
const OAI_PIXEL_ID = 'CNhvzAEAPk8Yu7UmJLfe6M'

// Re-render at most every 60s — picks up Supabase edits without a full code push.
export const revalidate = 60

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

// Poppins is the site's default body + UI font (nav, headings, paragraphs).
// The Bebas Neue display font above stays reserved for the brand logo.
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    // Default title mirrors the homepage hook (10 Arkansas locations) so that any
    // page without its own metadata.title also leads with the brand differentiator
    // rather than the generic "Self Storage Units in Arkansas" phrase.
    default: 'Self Storage in Arkansas — 10 Locations | Modern Storage®',
    template: '%s | Modern Storage®',
  },
  description:
    'Modern Storage® — 10 Arkansas self-storage locations with climate-controlled units, household storage, boat and RV parking, business storage, and a free moving truck with new rentals.',
  metadataBase: new URL(SITE_URL),
  // applicationName drives the <meta name="application-name"> tag.
  // Google sometimes uses this as a secondary signal for the brand
  // line in SERPs alongside the WebSite schema below.
  applicationName: 'Modern Storage®',
  // Favicon — the "MS" brand mark trimmed to fill the frame and placed
  // on a solid white tile so it stays legible at 16–32px tab size on any
  // background. We intentionally do NOT reference an SVG here: browsers
  // prioritize SVG favicons, and the transparent thin-ring SVG rendered
  // as a near-invisible blob at tab size. A white-tile PNG reads reliably.
  icons: {
    icon: [
      { url: '/favicon-ms-512.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon-ms-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/favicon-ms-512.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon-ms-512.png',
  },
  openGraph: {
    siteName: 'Modern Storage®',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

// Sitewide WebSite schema — drives the "site name" line Google shows
// in search results (the small brand line above the URL in a SERP
// card). Without an explicit WebSite.name, Google strips the ® mark
// when it infers the brand from page titles. Setting `name` here
// tells Google the canonical brand mark is "Modern Storage®".
// alternateName covers searches for the bare phrase "Modern Storage"
// without the symbol.
function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_URL + '/#website',
    name: 'Modern Storage®',
    alternateName: 'Modern Storage',
    url: SITE_URL + '/',
    publisher: { '@id': SITE_URL + '/#organization' },
    inLanguage: 'en-US',
  }
}

// Sitewide Organization schema — anchored at SITE_URL + '#organization' so
// every per-page Service / Article / LocalBusiness schema can reference it
// via provider/publisher fields. This is the canonical brand entity for
// Modern Storage®; per-facility LocalBusiness schemas remain separate and
// reference each physical location.
function buildOrganizationSchema(phoneDisplay: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE_URL + '/#organization',
    name: 'Modern Storage®',
    legalName: 'Modern Storage',
    url: SITE_URL + '/',
    // Organization.logo is the field Google reads to render the
    // tiny icon next to the brand name in search/listing views.
    // Using the on-white square PNG (no transparency, ≥112×112,
    // square aspect) per Google's logo guidelines. The awards
    // image stays available below as Organization.image for
    // contexts that prefer a richer visual.
    logo: SITE_URL + '/brand-icon-on-white-512.png',
    image: SITE_URL + '/images/modern-storage-springdale-best-of-the-best-awards.png',
    telephone: phoneDisplay,
    description:
      'Modern Storage® operates 10 self-storage facilities across Arkansas with climate-controlled, household, business, boat, RV, and vehicle storage. Three-time winner (2023, 2024, 2025) of the Best of the Best Self-Storage Awards — Arkansas Democrat Gazette and Best of Northwest Arkansas.',
    areaServed: { '@type': 'State', name: 'Arkansas' },
    sameAs: [
      'https://www.modernstorage.com',
      'https://podcast.modernstorage.com',
      'https://www.instagram.com/modern.storage',
      'https://www.tiktok.com/@modernstorage',
      'https://www.facebook.com/modernstorage',
      'https://www.linkedin.com/company/modern-storage',
      'https://www.youtube.com/@modernstorage',
    ],
    // Multiple Organization.award entries keep each year's distinct
    // accolade visible to search engines and AI extractors while
    // sharing the unified "Best of the Best Self-Storage Awards"
    // brand label.
    award: [
      'Best of the Best Self-Storage Awards 2023 — Arkansas Democrat Gazette',
      'Best of the Best Self-Storage Awards 2024 — Arkansas Democrat Gazette',
      'Best of the Best Self-Storage Awards 2025 — Arkansas Democrat Gazette',
      'Best of Northwest Arkansas — Self-Storage Category',
    ],
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const chatFaqs = await getChatFaqs()
  const organizationSchema = buildOrganizationSchema(settings.phoneDisplay)
  const websiteSchema = buildWebsiteSchema()
  return (
    <html lang="en" className={`${bebasNeue.variable} ${poppins.variable}`}>
      <head>
        {/* Sitewide WebSite schema — drives the SERP site-name brand
            line and ensures it carries the ® mark. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Sitewide Organization schema — emits the canonical brand entity
            on every page. Per-page schemas reference it via @id. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
        {/* OpenAI Ads Pixel — verbatim setup code provided by the OpenAI Ads
            dashboard. Loads the SDK from bzrcdn.openai.com and initializes
            with the pixel ID. The SDK handles page_view tracking; future
            conversion events can be added by calling
            window.oaiq('event', '<event_name>', { ... }) from the relevant
            client component. */}
        <Script
          id="oai-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"${OAI_PIXEL_ID}",debug:true});`,
          }}
        />
      </head>
      <body className="font-sans bg-gray-50 text-charcoal min-h-screen flex flex-col">
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
        {/* Sticky bottom CTA bar — mobile-only. Slides in when user
            scrolls up after passing the hero, hides on scroll-down,
            and hides when near the bottom of the page so it doesn't
            double-stack with the final red CTA section. */}
        <StickyMobileCTA phoneDisplay={settings.phoneDisplay} phoneHref={settings.phoneHref} />
        {/* Floating guided chatbot — captures name/email, then routes to
            approved location links + contact info. Q&A is editable from
            /admin/chatbot (Supabase), falling back to lib/chatbot.ts.
            No generative AI, so it can't invent answers. */}
        <ChatWidget faqs={chatFaqs} />
      </body>
    </html>
  )
}
