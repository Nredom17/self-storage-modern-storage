// ─────────────────────────────────────────────────────────────────────────────
// Modern Storage® chatbot data + matching.
//
// SAFETY: the widget is a guided, button-driven flow backed by this approved
// data. It never generates free-form answers — it routes visitors to approved
// location links, approved contact info, or the fallback line. It cannot invent
// pricing, availability, discounts, policies, or legal statements.
//
// ── WHERE TO EDIT ───────────────────────────────────────────────────────────
//   CHAT_LOCATIONS  — the 10 locations: name, phone, address, reservation URL,
//                     and the words/aliases that should route to each one.
//   CHATBOT_TEXT    — greeting, prompts, fallback, avatar.
// ─────────────────────────────────────────────────────────────────────────────

export type ChatLocation = {
  key: string
  /** Full brand name shown in answers. */
  name: string
  /** Short label for option buttons. */
  shortName: string
  phone: string
  address: string
  /** Reservation / location page on modernstorage.com. */
  url: string
  region: 'little-rock' | 'nwa' | 'other'
  /** Words or phrases (lowercase) that route a typed message to this location. */
  aliases: string[]
}

export const CHAT_LOCATIONS: ChatLocation[] = [
  {
    key: 'west-little-rock',
    name: 'Modern Storage® West Little Rock',
    shortName: 'West Little Rock',
    phone: '(501) 812-6500',
    address: '601 Autumn Rd, Little Rock, AR 72211',
    url: 'https://www.modernstorage.com/self-storage-little-rock-ar-f5198',
    region: 'little-rock',
    aliases: ['west little rock', 'wlr', 'chenal', 'little rock west'],
  },
  {
    key: 'shackleford',
    name: 'Modern Storage® Shackleford',
    shortName: 'Shackleford',
    phone: '(501) 500-5467',
    address: '3400 South Shackleford Road, Little Rock, AR 72205',
    url: 'https://www.modernstorage.com/3400-south-shackleford-road-little-rock-ar-72205',
    region: 'little-rock',
    aliases: ['shackleford', 'little rock shackleford'],
  },
  {
    key: 'maumelle',
    name: 'Modern Storage® Maumelle Blvd',
    shortName: 'Maumelle Blvd',
    phone: '(501) 791-0080',
    address: '9100 Maumelle Blvd, North Little Rock, AR 72113',
    url: 'https://www.modernstorage.com/self-storage-maumelle-ar-f9458',
    region: 'little-rock',
    aliases: ['maumelle blvd', 'maumelle', 'north little rock maumelle'],
  },
  {
    key: 'riverdale',
    name: 'Modern Storage® Riverdale',
    shortName: 'Riverdale',
    phone: '(501) 632-7770',
    address: '2510 Cantrell Rd, Little Rock, AR 72202',
    url: 'https://www.modernstorage.com/2510-cantrell-rd-little-rock-ar-72202',
    region: 'little-rock',
    aliases: [
      'riverdale',
      'cantrell',
      'cammack village',
      'camack village',
      'the heights',
      'heights',
      'hillcrest',
      'pulaski heights',
    ],
  },
  {
    key: 'bryant',
    name: 'Modern Storage® Bryant',
    shortName: 'Bryant',
    phone: '(501) 302-5000',
    address: '300 Dell Dr, Bryant, AR 72022',
    url: 'https://www.modernstorage.com/self-storage-bryant-ar-f8249',
    region: 'other',
    aliases: ['bryant'],
  },
  {
    key: 'north-little-rock',
    name: 'Modern Storage® North Little Rock',
    shortName: 'North Little Rock',
    phone: '(501) 441-5333',
    address: '3100 North Hills Blvd, North Little Rock, AR 72116',
    url: 'https://www.modernstorage.com/self-storage-north-little-rock-ar-f8184',
    region: 'little-rock',
    aliases: ['north little rock', 'nlr', 'north hills'],
  },
  {
    key: 'hot-springs',
    name: 'Modern Storage® Hot Springs',
    shortName: 'Hot Springs',
    phone: '(501) 302-1400',
    address: '1238 Higdon Ferry Rd, Hot Springs, AR 71913',
    url: 'https://www.modernstorage.com/self-storage-hot-springs-ar-f5404',
    region: 'other',
    aliases: ['hot springs'],
  },
  {
    key: 'springdale',
    name: 'Modern Storage® Springdale',
    shortName: 'Springdale',
    phone: '(479) 480-7600',
    address: '4555 W Sunset Ave, Springdale, AR 72762',
    url: 'https://www.modernstorage.com/self-storage-springdale-ar-f2741',
    region: 'nwa',
    aliases: ['springdale'],
  },
  {
    key: 'lowell',
    name: 'Modern Storage® Lowell',
    shortName: 'Lowell',
    phone: '(479) 485-2299',
    address: '1407 W Monroe Ave, Lowell, AR 72745',
    url: 'https://www.modernstorage.com/1407-w-monroe-ave-lowell-ar-72745',
    region: 'nwa',
    aliases: ['lowell'],
  },
  {
    key: 'bentonville',
    name: 'Modern Storage® Bentonville',
    shortName: 'Bentonville',
    phone: '(479) 316-2500',
    address: '700 SW 14th St, Bentonville, AR 72712',
    url: 'https://www.modernstorage.com/self-storage-bentonville-ar-f3125',
    region: 'nwa',
    aliases: ['bentonville'],
  },
]

export const CHATBOT_TEXT = {
  prompt: 'Can I help you?',
  agentName: 'Modern Storage® Help',
  welcome:
    'Welcome to Modern Storage®! I’m here to help with your storage needs. Please type your question below, and I’ll help you get the answer.',
  askName: 'First, What’s your name?',
  askPhone: 'Thanks. Lastly, what is your phone number?',
  phonePlaceholder: 'Enter your phone number',
  menuIntro:
    'Great, thank you. How can we help today? You can type a question — like “What are your hours?” — or pick an option below.',
  fallback:
    ‘Sure — type your message below and our team will get back to you by email.’,
  // Polite ending — shown when the visitor signs off ("thanks", "bye",
  // "that's all", etc.). Keeps the door open without burying the visitor in
  // a fallback dead-end menu. Phone number intentionally OMITTED — the
  // persistent "Call to Rent a Unit" pill below the conversation already
  // carries the number, and the Rent a Unit / Tenant Support pills give
  // them the right paths for either audience.
  goodbye:
    'You’re welcome! Thanks for chatting with Modern Storage®. If you think of anything else, our team is just a tap away — or reserve online from any location page. Have a great day!',
  noLocationMatch:
    'I’m not sure which location you mean. Please choose one of these Modern Storage® locations:',
  // Shown when a visitor asks about hours — we ask which store first, then show
  // that store's hours, so we never have to recite the per-store exceptions.
  hoursPrompt: 'Which Modern Storage® location are you interested in?',
  avatar: '/images/chat-avatar.jpg',
  sizeFinderUrl: 'https://self-storage.modernstorage.com/ai-storage-size-finder',
  sizeGuideUrl: 'https://self-storage.modernstorage.com/size-guide',
  // Persistent action buttons shown under the conversation.
  newCustomersPhone: '501-910-0096',
  newCustomersTel: 'tel:+15019100096',
  existingTenantsUrl: 'https://www.modernstorage.com/self-storage',
  // Online bill pay for existing tenants.
  payOnlineUrl: 'https://www.modernstorage.com/payonline',
}

export const byKey = (key: string): ChatLocation | undefined =>
  CHAT_LOCATIONS.find((l) => l.key === key)

/**
 * Normalize a typed phone number to 10 digits, or return null if it isn't a
 * valid US 10-digit number. Accepts common formats like (501) 555-1234,
 * 501-555-1234, or a leading 1 (e.g. 1-501-555-1234).
 */
export function normalizePhone(raw: string): string | null {
  let d = (raw || '').replace(/\D/g, '')
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1)
  return d.length === 10 ? d : null
}

/** Format 10 digits as (XXX) XXX-XXXX for display. */
export function formatPhone(tenDigits: string): string {
  return `(${tenDigits.slice(0, 3)}) ${tenDigits.slice(3, 6)}-${tenDigits.slice(6)}`
}

// ─────────────────────────────────────────────────────────────────────────────
// OFFICE HOURS
//
// All stores are open Monday–Saturday 8:30 AM – 5:30 PM.
// On Sundays, most stores are open 1:00 PM – 6:00 PM, EXCEPT the two stores
// listed in SUNDAY_CLOSED, which are closed on Sundays.
//
// To change hours for ONE store, add a custom entry to HOURS_OVERRIDES below.
// To change the Sunday-closed list, edit SUNDAY_CLOSED.
// ─────────────────────────────────────────────────────────────────────────────
const WEEKDAY_HOURS = 'Monday–Saturday: 8:30 AM – 5:30 PM'
const SUNDAY_OPEN = 'Sunday: 1:00 PM – 6:00 PM'
const SUNDAY_CLOSED_TEXT = 'Sunday: Closed'

/** Location keys that are CLOSED on Sundays. */
const SUNDAY_CLOSED: string[] = ['lowell', 'maumelle']

/**
 * Per-store hours override. Leave empty unless a single store needs hours that
 * don't follow the standard pattern above. Example:
 *   'springdale': 'Monday–Friday: 9:00 AM – 6:00 PM\nWeekends: Closed',
 */
const HOURS_OVERRIDES: Record<string, string> = {}

/** The approved hours string for a location, used by the chatbot. */
export function locationHours(loc: ChatLocation): string {
  if (HOURS_OVERRIDES[loc.key]) return HOURS_OVERRIDES[loc.key]
  const sunday = SUNDAY_CLOSED.includes(loc.key) ? SUNDAY_CLOSED_TEXT : SUNDAY_OPEN
  return `${WEEKDAY_HOURS}\n${sunday}`
}

// ─────────────────────────────────────────────────────────────────────────────
// QUESTIONS & ANSWERS  ←  ADD OR EDIT YOUR CHATBOT ANSWERS HERE
//
// Each entry is one question the bot can answer when a visitor types something
// that matches one of its `keywords`. To add a new Q&A, copy a block and fill in:
//   question  — the question, for your reference (not shown to visitors)
//   keywords  — lowercase words/phrases that should trigger this answer.
//               Keep them short and distinctive (e.g. 'climate', 'rv', 'price').
//   answer    — the exact text the bot replies with. Keep it factual; do not
//               promise pricing, availability, or policies that vary by store.
//   links     — (optional) buttons shown under the answer.
//
// NOTE: "hours" is handled automatically (it asks which store, then shows that
// store's hours from the OFFICE HOURS section above) — you don't add it here.
// ─────────────────────────────────────────────────────────────────────────────
export type ChatFaq = {
  /** Optional DB id (present when the answer comes from Supabase). */
  id?: string
  question: string
  keywords: string[]
  answer: string
  links?: { label: string; href: string }[]
  /** Optional per-location answer overrides, keyed by location key. */
  locationAnswers?: Record<string, string>
}

export const CHAT_FAQS: ChatFaq[] = [
  {
    question: 'Do you have climate-controlled units?',
    keywords: [
      'climate',
      'climate controlled',
      'temperature',
      'air conditioned',
      'air conditioning',
      'heated',
      'cooled',
    ],
    answer:
      'Many Modern Storage® locations offer climate-controlled units, though availability and sizes vary by facility. You can learn more about climate-controlled storage below, or tell me which location you’re interested in.',
    links: [
      { label: 'Climate-controlled storage', href: 'https://self-storage.modernstorage.com/climate-controlled' },
    ],
  },
  {
    question: 'What size is my unit / what is my unit number?',
    keywords: ['my unit', 'unit #', 'unit number', 'my size', 'what size is my', 'what size is unit', 'size of my unit', 'my storage unit size'],
    answer:
      'For account-specific information like your unit size or number, you\'ll need to log in to your Modern Storage® account or contact your store directly — they\'ll be happy to help!',
  },
  {
    question: 'What size storage unit do I need?',
    keywords: ['size', 'sizes', 'how big', 'how large', 'dimensions', 'what size', 'square feet'],
    answer:
      'Not sure what size you need? Our AI Storage Size Finder and Size Guide can help you choose the right unit.',
    links: [
      { label: 'AI Storage Size Finder', href: CHATBOT_TEXT.sizeFinderUrl },
      { label: 'Size Guide', href: CHATBOT_TEXT.sizeGuideUrl },
    ],
  },
  {
    question: 'How do I rent or reserve a unit?',
    keywords: ['reserve', 'reservation', 'rent online', 'book', 'sign up', 'how do i rent'],
    answer:
      'You can view available units and reserve online for any Modern Storage® location. Tell me which location you’re interested in and I’ll send you the right link.',
  },
  {
    question: 'Do you offer boat, RV, or vehicle storage?',
    keywords: ['boat', 'rv', 'camper', 'vehicle', 'car storage', 'trailer', 'motorhome'],
    answer:
      'Select Modern Storage® locations offer boat, RV, and vehicle storage. Availability varies by facility — let me know which area you’re in and I can point you to the right location.',
    links: [
      { label: 'Boat, RV & vehicle storage', href: 'https://self-storage.modernstorage.com/rv-boat-vehicle' },
    ],
  },
  // "How long can I rent for?" — customers ask this in many phrasings
  // that didn't hit the admin's existing "Are storage rentals month-to-
  // month?" FAQ (whose keywords were month/lease/contract/commitment).
  // Comprehensive keyword set so any natural phrasing matches.
  {
    question: 'How long can I rent a storage unit?',
    keywords: [
      'how long',
      'how long can i rent',
      'how long can i',
      'rent for',
      'rental period',
      'rental length',
      'length of rental',
      'duration',
      'minimum rental',
      'minimum stay',
      'how short',
      'shortest rental',
      'longest rental',
      'maximum rental',
    ],
    answer:
      'Modern Storage® rentals are month-to-month with no long-term lease commitment. You can rent for as little as one month, and there is no maximum — many customers stay for years. Written notice is required before move-out, and tenants are responsible for cleaning out the unit and removing their lock at the end of occupancy.',
  },
  // Common safety / legal question. Plain "no" answer with the why — keeps
  // us in compliance with state/local fire code and the rental agreement.
  {
    question: 'Can I live or sleep in my storage unit?',
    keywords: [
      'live',
      'living',
      'sleep',
      'sleeping',
      'reside',
      'residence',
      'stay overnight',
      'sleep in',
      'dwelling',
      'occupancy',
      'habitation',
      'move in to',
      'move into',
    ],
    answer:
      'No. Modern Storage® units are for storage only — they cannot be used as a residence, for sleeping, or for any kind of overnight occupancy. State and local fire codes, building regulations, and your rental agreement all prohibit anyone from living in a storage unit, for safety reasons. If you’re between homes and need short-term housing options, our team can still help you store your belongings while you arrange other accommodations.',
  },
  // Smart lock FAQ — added 2026-06-05 per Alexandra's direction.
  // Customers ask about smart locks specifically when they see the
  // option at move-in or in marketing materials. Keywords cover the
  // most common phrasings: "smart lock", "what's a smart lock",
  // "phone lock", "keyless", "NFC", etc.
  {
    question: "What's a Modern Smart Unit / smart lock?",
    keywords: [
      'smart unit',
      'smart units',
      'modern smart unit',
      'smart lock',
      'smart locks',
      'smartlock',
      'phone lock',
      'phone unlock',
      'keyless',
      'keyless lock',
      'keyless entry',
      'nfc',
      'nfc tap',
      'tap to unlock',
      'digital lock',
      'app lock',
      'unlock with phone',
      'open with phone',
      'no key',
      'no physical key',
    ],
    answer:
      'A Modern Smart Unit is a storage unit equipped with a smart lock instead of a traditional lock and key. Using the Modern Storage app, you can:\n\n• Unlock your unit with your smartphone using NFC tap\n• Pay your rent from the app\n• Share temporary access with family members, employees, or friends\n• View your lock activity and manage access digitally\n• Never worry about carrying or losing a physical key\n\nWould you like to see if Smart Units are available at your preferred Modern Storage location?',
  },
  {
    question: 'What is a standard unit / unit without a smart lock?',
    keywords: [
      'standard unit',
      'standard units',
      'regular unit',
      'regular units',
      'traditional unit',
      'non-smart unit',
      'without smart lock',
      'without a smart lock',
      'no smart lock',
      'regular key',
      'traditional key',
      'physical key',
      'lock and key',
      'normal unit',
      'normal storage',
      'units without',
      'ones without',
    ],
    answer:
      'A standard storage unit provides the same secure storage space but uses a traditional lock and key instead of a smart lock — you\'ll unlock your unit manually each time you visit.\n\nBoth options are secure and offer the same great storage experience. The main difference is convenience: Modern Smart Units offer keyless entry and digital access management, while standard units use a traditional lock and key.',
  },
]

const HOURS_KEYWORDS = [
  'hours',
  'hour',
  'open',
  'opening',
  'close',
  'closing',
  'closed',
  'what time',
]

/** True when a typed message is asking about office / opening hours. */
export function isHoursQuestion(text: string): boolean {
  const t = ' ' + text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' '
  return HOURS_KEYWORDS.some((k) => t.includes(' ' + k + ' '))
}

const PAYMENT_KEYWORDS = [
  'payment',
  'pay my bill',
  'pay bill',
  'pay my rent',
  'pay rent',
  'pay online',
  'make a payment',
  'autopay',
  'invoice',
]

/** True when a typed message is about paying a bill / making a payment. */
export function isPaymentQuestion(text: string): boolean {
  const t = ' ' + text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' '
  return PAYMENT_KEYWORDS.some((k) => t.includes(' ' + k + ' '))
}

// ─── Contact-info question detection ─────────────────────────────────────
// Catches "what's wlr number", "phone number for shackleford", "address for
// bryant", "where is hot springs" — anything asking for a store's phone or
// physical address. When matched alongside a known location alias, the
// chatbot answers immediately with that store's contact info instead of
// asking "which location?".
const CONTACT_PHRASES = [
  'phone number',
  'phone for',
  'phone of',
  'number for',
  'number of',
  'the number',
  'whats the number',
  "what's the number",
  'whats their number',
  'address for',
  'address of',
  'the address',
  'whats the address',
  "what's the address",
  'contact info',
  'contact information',
  'contact number',
  'where is',
  'how do i contact',
  'how can i contact',
  'how do i reach',
  'how can i reach',
  'call them',
]
const CONTACT_SINGLE = ['address']

/** True when a typed message is asking for a store's phone or address. */
export function isContactQuestion(text: string): boolean {
  const t = ' ' + text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' '
  if (CONTACT_SINGLE.some((k) => t.includes(' ' + k + ' '))) return true
  return CONTACT_PHRASES.some((p) => t.includes(' ' + p + ' '))
}

// ─── Goodbye / sign-off detection ─────────────────────────────────────────
// These phrases mean the visitor is wrapping up the conversation. We catch
// them BEFORE the keyword/FAQ match so a polite "thanks" never falls into
// the generic "I don't have an answer for that one" fallback.
//
// Two categories:
//  • SHORT_GOODBYES = the entire message is one of these words (after we
//    strip punctuation and whitespace). Catches "thanks", "bye", "ok".
//  • GOODBYE_PHRASES = the message contains one of these multi-word phrases.
//    Catches "that's all", "no thanks", "thank you so much", "I'm good".
//
// Single-word checks are kept tight so we don't false-positive on legit
// product questions like "is climate ok for furniture?".
const SHORT_GOODBYES = new Set([
  'thanks',
  'thx',
  'ty',
  'bye',
  'goodbye',
  'cya',
  'later',
  'done',
  'okay',
  'ok',
  'cool',
  'great',
  'awesome',
  'perfect',
  'nope',
  'no',
])

const GOODBYE_PHRASES = [
  'thank you',
  'thanks so much',
  'thanks a lot',
  'thanks for your help',
  'thank you so much',
  'thank you for your help',
  'that is all',
  "that's all",
  'that is it',
  "that's it",
  'all good',
  'no thanks',
  'no thank you',
  "i'm good",
  'im good',
  'i am good',
  'got it',
  'sounds good',
  'have a good day',
  'have a great day',
  'see you',
  'see ya',
  'talk later',
  'all set',
  'i am all set',
  "i'm all set",
]

// ─── "I want to talk to a human" / "send a message" detection ────────────
// Triggers the chat widget's existing startMessage() flow, which opens the
// free-text "send us a message" input that gets emailed to info@
// modernstorage.com. We want to catch the common shortcuts a visitor uses
// when the menu options aren't matching what they need.
//
// Two layers (same pattern as isGoodbye above):
//   • SHORT_MESSAGE_TRIGGERS = whole-message single-word match. Tight so
//     legit product words ("agent" alone is rare; "help" is sometimes typed
//     when a visitor wants help in general but is acceptable here because
//     opening the message form IS a help action).
//   • MESSAGE_PHRASES = multi-word phrase match anywhere in the message.
const SHORT_MESSAGE_TRIGGERS = new Set([
  'agent',
  'human',
  'representative',
  'rep',
  'help',
  'message',
])

const MESSAGE_PHRASES = [
  'send message',
  'send a message',
  'send us a message',
  'send you a message',
  'leave a message',
  'send email',
  'send an email',
  'email you',
  'email me',
  'contact me',
  'contact us',
  'talk to a human',
  'talk to someone',
  'talk to a person',
  'talk to a real person',
  'talk to an agent',
  'speak to a human',
  'speak to someone',
  'speak to an agent',
  'speak with a person',
  'real person',
  'live agent',
  'live person',
  'customer service',
  'customer support',
  'reach support',
  'get in touch',
]

export function isMessageRequest(text: string): boolean {
  const t = text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim()
  if (!t) return false
  if (SHORT_MESSAGE_TRIGGERS.has(t)) return true
  const padded = ' ' + t + ' '
  return MESSAGE_PHRASES.some((p) => padded.includes(' ' + p + ' '))
}

export function isGoodbye(text: string): boolean {
  const t = text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim()
  if (!t) return false
  // Exact single-word match — message is JUST "thanks" or similar.
  if (SHORT_GOODBYES.has(t)) return true
  // Multi-word phrase match.
  const padded = ' ' + t + ' '
  return GOODBYE_PHRASES.some((p) => padded.includes(' ' + p + ' '))
}

// Common words that shouldn't, on their own, drive a match.
const MATCH_STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'at', 'is', 'are',
  'do', 'does', 'you', 'your', 'i', 'my', 'me', 'we', 'it', 'can', 'how', 'what',
  'where', 'when', 'which', 'need', 'want', 'help', 'please', 'with', 'have',
  'about', 'this', 'that', 'near', 'get', 'storage', 'store', 'stored', 'unit',
  'units', 'modern', 'rent', 'rental',
])

function normalizeMsg(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

// Helper — are all the tokens of `kwTokens` present in `inputTokens` in order,
// possibly with other words between them? Lets a keyword "live in unit" match
// an input "can i live in my unit" because the three keyword tokens appear in
// order, just with "my" sitting between "in" and "unit".
function keywordTokensInOrder(kwTokens: string[], inputTokens: string[]): boolean {
  let ki = 0
  for (const it of inputTokens) {
    if (it === kwTokens[ki]) ki++
    if (ki === kwTokens.length) return true
  }
  return false
}

/**
 * Score a single FAQ against a typed input by combining four signals:
 *   1. VERBATIM phrase match — keyword appears as a contiguous phrase in the
 *      input (highest weight; phrase length adds a small bonus so a 3-word
 *      keyword outranks a 1-word keyword that also matches).
 *   2. PHRASE-WITH-GAPS match — keyword tokens appear in order in the input,
 *      possibly separated by other words ("live in unit" → "live in my unit").
 *   3. QUESTION-TITLE overlap — distinctive (non-stopword, 3+ char) words
 *      from the FAQ's own question that also appear in the input. Helps
 *      "is there a trash on site" lock onto "...trash disposal on site?".
 *   4. SINGLE-TOKEN overlap — distinctive keyword tokens that appear anywhere
 *      in the input. The old fallback path, now part of the combined score.
 *
 * Stronger signals (1, 2) carry far more weight than weak overlap (3, 4).
 * The threshold filters out junk matches that would otherwise return wrong
 * answers for vague inputs.
 */
function scoreFaq(input: string, faq: ChatFaq): number {
  const norm = normalizeMsg(input)
  if (!norm) return 0
  const padded = ' ' + norm + ' '
  const inputTokensAll = norm.split(' ').filter(Boolean)
  const inputDistinct = new Set(
    inputTokensAll.filter((w) => w.length >= 3 && !MATCH_STOPWORDS.has(w)),
  )

  let score = 0

  for (const rawKw of faq.keywords) {
    const k = rawKw.trim().toLowerCase()
    if (!k) continue
    // 1. Verbatim phrase
    if (padded.includes(' ' + k + ' ')) {
      score += 12 + Math.min(k.length, 30) * 0.3
      continue
    }
    const kwTokens = k.split(/\s+/).filter(Boolean)
    // 2. Phrase with gaps (only meaningful for multi-token keywords)
    if (kwTokens.length >= 2 && keywordTokensInOrder(kwTokens, inputTokensAll)) {
      score += 8 + kwTokens.length
      continue
    }
    // 4. Single-token overlap — only the distinctive tokens of the keyword.
    for (const w of kwTokens) {
      if (w.length >= 3 && !MATCH_STOPWORDS.has(w) && inputDistinct.has(w)) {
        score += 1
      }
    }
  }

  // 3. Question-title overlap. The FAQ author's question is itself a signal
  // about what the FAQ answers — a customer's phrasing usually shares words
  // with it ("is there a trash on site" ↔ "...trash disposal on site?").
  const titleTokens = normalizeMsg(faq.question)
    .split(' ')
    .filter((w) => w.length >= 3 && !MATCH_STOPWORDS.has(w))
  const titleSeen = new Set<string>()
  for (const t of titleTokens) {
    if (!titleSeen.has(t) && inputDistinct.has(t)) {
      score += 1.5
      titleSeen.add(t)
    }
  }

  return score
}

/**
 * Match a typed message to a single approved Q&A by scoring every FAQ and
 * picking the highest-scoring one above the threshold. Only ever returns an
 * APPROVED answer (or null → the fallback line); it never generates text,
 * so it cannot invent an answer.
 */
export function matchFaq(text: string, faqs: ChatFaq[] = CHAT_FAQS): ChatFaq | null {
  if (!normalizeMsg(text)) return null
  let best: ChatFaq | null = null
  let bestScore = 0
  for (const f of faqs) {
    const s = scoreFaq(text, f)
    if (s > bestScore) {
      bestScore = s
      best = f
    }
  }
  // Threshold = 3. One verbatim hit (12+) or one phrase-with-gaps (8+) is
  // a comfortable answer. Two title-word overlaps (3.0) or three distinctive
  // single-token hits (3) clear the bar but only when multiple signals align,
  // which keeps weak guesses out.
  return bestScore >= 3 ? best : null
}

export type LocationMatch =
  | { type: 'location'; loc: ChatLocation; fromAlias: boolean }
  | { type: 'ambiguous-lr' }
  | { type: 'ambiguous-nwa' }
  | { type: 'none' }

/**
 * Match a typed message to a single location, or signal a Little Rock / NWA
 * disambiguation, or no match. Specific aliases are checked before the generic
 * "little rock" / "nwa" catch-alls, longest alias first.
 */
export function matchLocation(text: string): LocationMatch {
  const t = ' ' + text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' '

  const pairs = CHAT_LOCATIONS.flatMap((loc) => loc.aliases.map((a) => ({ loc, a })))
    .sort((x, y) => y.a.length - x.a.length)

  for (const { loc, a } of pairs) {
    if (t.includes(' ' + a + ' ') || t.includes(a)) {
      return { type: 'location', loc, fromAlias: true }
    }
  }
  if (/\bnwa\b/.test(t) || t.includes('northwest arkansas')) return { type: 'ambiguous-nwa' }
  if (t.includes('little rock')) return { type: 'ambiguous-lr' }
  return { type: 'none' }
}
