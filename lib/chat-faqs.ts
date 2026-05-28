// ─────────────────────────────────────────────────────────────────────────────
// Chat widget content + matching logic.
//
// HOW THE BOT STAYS SAFE: it is NOT a generative AI. It can only ever return
// one of the approved answers below, or the single fallback line. It cannot
// invent pricing, availability, policies, discounts, guarantees, or legal
// statements — because it never writes text, it only picks an approved answer.
//
// ── WHERE YOU ADD YOUR OWN Q&A ──────────────────────────────────────────────
// Edit the CHAT_FAQS array below. Each entry is:
//   { q: 'The question', a: 'The approved answer', keywords: ['extra','terms'] }
//   - q       = a sample/canonical question (also used for matching + the
//               suggestion chips)
//   - a       = the EXACT answer shown to visitors (this is the only text they
//               ever see — keep it short, friendly, professional)
//   - keywords = optional extra words/synonyms that should also point to this
//               answer (improves matching; e.g. 'ac', 'temperature' for climate)
//
// To change the greeting, fallback line, avatar, or suggestion chips, edit
// CHAT_CONFIG. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────────────────────

export type ChatFaq = {
  q: string
  a: string
  keywords?: string[]
}

export const CHAT_CONFIG = {
  // Small bubble text (matches the "Can I help you?" popup)
  prompt: 'Can I help you?',
  // The agent name shown in the open chat header
  agentName: 'Modern Storage® Help',
  // First message shown when the chat opens
  greeting:
    'Hi! I can answer quick questions about Modern Storage® — hours, sizes, climate-controlled units, online rentals, locations, and more. What can I help you with?',
  // Shown when no approved answer matches the question (verbatim, per your rules)
  fallback:
    "I'm not sure on that, but our team can help. Please contact us directly.",
  // Circular avatar. Swap to a team headshot at /images/chat-avatar.jpg when ready.
  avatar: '/brand-icon-on-white-512.png',
  // Tappable starter questions (should match a CHAT_FAQS question)
  suggestions: [
    'What are your hours?',
    'Can I rent online?',
    'Do you offer climate-controlled units?',
    'Where are your locations?',
  ],
}

// ── APPROVED Q&A — EDIT THIS LIST ───────────────────────────────────────────
export const CHAT_FAQS: ChatFaq[] = [
  {
    q: 'Hi',
    a: 'Hi! What can I help you with? You can ask about hours, unit sizes, climate-controlled units, online rentals, or locations.',
    keywords: ['hi', 'hello', 'hey', 'hiya', 'yo', 'good morning', 'good afternoon'],
  },
  {
    q: 'What are your hours?',
    a: 'Our office hours vary by location. Please contact the specific location for current hours.',
    keywords: ['hours', 'open', 'opening', 'close', 'closing', 'time', 'today', 'access hours'],
  },
  {
    q: 'Can I rent online?',
    a: 'Yes, online rentals are available through our website.',
    keywords: ['rent', 'reserve', 'reservation', 'online', 'sign up', 'book'],
  },
  {
    q: 'Do you offer climate-controlled units?',
    a: 'Some locations offer climate-controlled units. Please check the specific facility page or contact the location.',
    keywords: ['climate', 'controlled', 'temperature', 'ac', 'air', 'conditioned', 'heated', 'cooled'],
  },
  {
    q: 'Where are your locations?',
    a: 'Modern Storage® has 10 locations across Arkansas. Use the Locations menu at the top of the site to find the one nearest you.',
    keywords: ['location', 'locations', 'where', 'near', 'nearby', 'address', 'find', 'city', 'town'],
  },
  {
    q: 'What unit sizes do you have?',
    a: 'We offer a range of unit sizes from small to large. Our Size Guide and AI Size Finder can help you pick the right one, or contact a location for help.',
    keywords: ['size', 'sizes', 'big', 'small', 'how much fit', 'square feet', 'dimensions', '5x5', '10x10'],
  },
  {
    q: 'How much does a unit cost?',
    a: 'Prices vary by location, unit size, and current availability. Please check the specific location page or contact us for current rates.',
    keywords: ['price', 'pricing', 'cost', 'rate', 'rates', 'how much', 'monthly', 'fee', 'cheap', 'deal', 'discount', 'special'],
  },
  {
    q: 'Do you have a free moving truck?',
    a: 'Many locations offer a free moving truck with new rentals. Availability and details vary by location — please confirm with the specific facility.',
    keywords: ['truck', 'moving', 'move', 'free truck', 'rental truck'],
  },
  {
    q: 'How do I contact you?',
    a: 'You can reach our team at 501-910-0096 or through our Contact page. We are happy to help.',
    keywords: ['contact', 'phone', 'call', 'talk', 'reach', 'speak', 'human', 'representative', 'someone', 'help'],
  },
]

// ── Matching (deterministic; never generates text) ──────────────────────────

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'am', 'be', 'do', 'does', 'did', 'can', 'could',
  'would', 'should', 'will', 'i', 'you', 'your', 'our', 'we', 'to', 'of', 'for',
  'and', 'or', 'what', 'whats', 'how', 'when', 'it', 'my', 'me', 'on', 'at', 'in',
  'have', 'has', 'with', 'get', 'got', 'there', 'any', 'some', 'this', 'that',
  'please', 'thanks', 'thank',
])

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 0 && !STOPWORDS.has(t))
}

/**
 * Return the best-matching approved FAQ, or null if nothing is confident
 * enough (the caller then shows CHAT_CONFIG.fallback). Scoring favors answers
 * whose keywords/question overlap the visitor's meaningful words.
 */
export function matchFaq(query: string): ChatFaq | null {
  const qTokens = tokenize(query)
  if (qTokens.length === 0) return null

  let best: ChatFaq | null = null
  let bestScore = 0

  for (const faq of CHAT_FAQS) {
    const faqTokens = new Set<string>([
      ...tokenize(faq.q),
      ...(faq.keywords ?? []).flatMap((k) => tokenize(k)),
    ])
    // Also allow multi-word keyword phrases to match as substrings.
    const phrases = (faq.keywords ?? []).filter((k) => k.includes(' ')).map((k) => k.toLowerCase())
    const normalizedQuery = query.toLowerCase()

    let hits = 0
    for (const t of qTokens) if (faqTokens.has(t)) hits += 1
    for (const p of phrases) if (normalizedQuery.includes(p)) hits += 1

    if (hits === 0) continue
    const ratio = hits / qTokens.length
    const weighted = hits + ratio // reward both raw hits and focused queries

    if (weighted > bestScore) {
      bestScore = weighted
      best = faq
    }
  }

  // Require at least one solid keyword hit and a reasonable share of the query.
  if (best && bestScore >= 1 && bestScore / (qTokens.length + 1) >= 0.18) return best
  return null
}

/** Answer text for a query — always an approved answer or the fallback. */
export function answerFor(query: string): string {
  const match = matchFaq(query)
  return match ? match.a : CHAT_CONFIG.fallback
}
