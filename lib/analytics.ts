// Centralized analytics / pixel firing.
//
// Every lead-capture path on the site (contact form, chat-widget phone
// capture, move-in checklist lead gate) calls trackLead() with whatever
// identifiers it just captured. The helper fans the event out to:
//
//   1. Reddit Ads Pixel  — re-inits the pixel with advanced match keys
//      (email/phoneNumber) so Reddit can match the visitor to a real
//      Reddit user, then fires a Lead event.
//   2. OpenAI Ads Pixel  — fires an "event" call with the source label.
//   3. Google Tag Manager dataLayer — pushes a "lead" event. The
//      marketing team can hook GA4, Meta Pixel, Google Ads, etc. to it
//      from the GTM dashboard without a code change.
//
// PII handling: raw email/phone are passed to Reddit (their SDK hashes
// server-side; this is the documented usage). NO email/phone is pushed
// to GTM's dataLayer — only the event name and source — because
// downstream tags often forward the entire dataLayer to ad networks.

const REDDIT_PIXEL_ID = 'a2_j41lj6z9iw28'

type LeadParams = {
  /** Free-text identifier for where the lead was captured ("contact_form",
   * "chat_widget", "checklist", etc.). Surfaces in Reddit/OpenAI/GA4 as
   * the conversion source. */
  source: string
  email?: string
  /** Raw US phone, any format. Will be reduced to digits before sending. */
  phone?: string
  /** Optional first name — included in GTM event for downstream tags. */
  name?: string
  /** Optional value (USD) — defaults to 0 for non-purchase leads. */
  value?: number
}

// Minimal global window shape so we don't have to declare it across
// every consumer.
type WindowWithPixels = {
  rdt?: (...args: unknown[]) => void
  oaiq?: (...args: unknown[]) => void
  dataLayer?: Record<string, unknown>[]
}

export function trackLead(params: LeadParams): void {
  if (typeof window === 'undefined') return

  const w = window as unknown as WindowWithPixels
  const phone = params.phone ? params.phone.replace(/\D/g, '') : undefined
  const email = params.email ? params.email.trim().toLowerCase() : undefined

  // ── Reddit Pixel ───────────────────────────────────────────────────
  try {
    if (typeof w.rdt === 'function') {
      const matchKeys: Record<string, string> = {}
      if (email) matchKeys.email = email
      if (phone) matchKeys.phoneNumber = phone
      if (Object.keys(matchKeys).length > 0) {
        w.rdt('init', REDDIT_PIXEL_ID, matchKeys)
      }
      w.rdt('track', 'Lead', { conversionId: params.source })
    }
  } catch {
    /* non-fatal — keep the form/chat flow uninterrupted */
  }

  // ── OpenAI Ads Pixel ──────────────────────────────────────────────
  try {
    if (typeof w.oaiq === 'function') {
      w.oaiq('event', 'lead', {
        type: 'customer_action',
        amount: params.value ?? 0,
        currency: 'USD',
        source: params.source,
      })
    }
  } catch {
    /* non-fatal */
  }

  // ── GTM dataLayer ─────────────────────────────────────────────────
  // PII intentionally omitted here — GA4 / Meta etc. will pick this up
  // via tags configured by the marketing team in the GTM dashboard.
  try {
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      event: 'lead',
      lead_source: params.source,
    })
  } catch {
    /* non-fatal */
  }
}
