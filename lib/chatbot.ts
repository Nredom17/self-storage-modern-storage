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
  menuIntro: 'Great, thank you. How can we help today?',
  fallback:
    'I’m not sure on that, but our team can help. Please contact your Modern Storage® location directly.',
  noLocationMatch:
    'I’m not sure which location you mean. Please choose one of these Modern Storage® locations:',
  avatar: '/images/chat-avatar.jpg',
  sizeFinderUrl: 'https://self-storage.modernstorage.com/ai-storage-size-finder',
  sizeGuideUrl: 'https://self-storage.modernstorage.com/size-guide',
}

export const byKey = (key: string): ChatLocation | undefined =>
  CHAT_LOCATIONS.find((l) => l.key === key)

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
