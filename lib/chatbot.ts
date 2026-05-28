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
    aliases: ['west little rock', 'chenal', 'little rock west'],
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
    aliases: ['north little rock', 'north hills'],
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
  welcome: 'Welcome to Modern Storage®! I’m here to help with your storage needs.',
  askName: 'First, what’s your name?',
  askEmail: 'Thanks. What’s your email?',
  emailPlaceholder: 'Enter your email',
  menuIntro:
    'Great, thank you. How can we help today? You can type a question — like “What are your hours?” — or pick an option below.',
  fallback:
    'I’m not sure on that, but our team can help. Please contact your Modern Storage® location directly, or pick an option below.',
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
}

export const byKey = (key: string): ChatLocation | undefined =>
  CHAT_LOCATIONS.find((l) => l.key === key)

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

/**
 * Match a typed message to a single approved Q&A, longest keyword first.
 * Pass the live list from the database; defaults to the hardcoded CHAT_FAQS
 * so the function still works as a fallback when no DB list is supplied.
 */
export function matchFaq(text: string, faqs: ChatFaq[] = CHAT_FAQS): ChatFaq | null {
  const t = ' ' + text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' '
  const pairs = faqs
    .flatMap((f) => f.keywords.map((k) => ({ f, k: k.trim().toLowerCase() })))
    .filter(({ k }) => k.length > 0)
    .sort((a, b) => b.k.length - a.k.length)
  for (const { f, k } of pairs) {
    if (t.includes(' ' + k + ' ')) return f
  }
  return null
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
