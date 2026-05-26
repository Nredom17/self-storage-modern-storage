export const SITE_URL = 'https://self-storage.modernstorage.com'

export const PHONE_NUMBER_DISPLAY = '501-910-0096'
export const PHONE_NUMBER_HREF = 'tel:+15019100096'

// Inbox shown in the contact form success/error messages and used by the
// /api/business-inquiry route as the default recipient. Override the recipient
// without a code deploy by setting BUSINESS_INQUIRY_TO in Vercel env.
export const BUSINESS_CONTACT_EMAIL = 'info@modernstorage.com'

// Generic "Reserve" buttons (before the user has picked a facility) steer to
// the on-page location finder so the customer chooses a Modern Storage® location
// first. Per-location "See Available Units" buttons use the individual
// facility's reservationUrl instead (see LOCATIONS below).
export const RESERVATION_URL = '/#locations'

// Storage Options dropdown — exposed both in the desktop header dropdown and
// the mobile menu, and reused by the footer.
export const STORAGE_OPTION_LINKS = [
  { label: 'Climate-Controlled Storage', href: '/climate-controlled' },
  { label: 'Household Storage', href: '/household-storage' },
  { label: 'Boat and RV Storage', href: '/rv-boat-vehicle' },
  { label: 'Business Storage', href: '/business-storage' },
] as const

export const NAV_LINKS = [
  { label: 'Unit Sizes', href: '/size-guide' },
  { label: 'Size Finder', href: '/ai-storage-size-finder' },
  { label: 'Locations', href: '/#locations' },
  { label: 'Moving Truck', href: '/free-moving-truck' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Reserve Now', href: '/#reserve' },
] as const

// Header nav tree. Mix of `link` (single anchor) and `dropdown` (menu).
// Order is left-to-right on desktop, top-to-bottom on mobile.
export type NavTreeItem =
  | { type: 'link'; label: string; href: string; external?: boolean }
  | {
      type: 'dropdown'
      label: string
      items: {
        label: string
        href: string
        external?: boolean
      }[]
    }

// Locations dropdown uses a two-level drill-down UX (region → cities) instead
// of the flat dropdown pattern. Defined separately from NAV_TREE so the Header
// can render it with its own custom component.
export const LOCATION_NAV_GROUPS = [
  {
    id: 'central-arkansas',
    label: 'Central Arkansas',
    cities: [
      { slug: 'maumelle', label: 'Maumelle, AR' },
      { slug: 'west-little-rock', label: 'West Little Rock, AR' },
      // Shackleford location renders as "Little Rock, AR" in the dropdown
      // (the facility is in Little Rock; "Shackleford" is the street).
      { slug: 'shackleford', label: 'Little Rock, AR' },
      // Riverdale services the Downtown / Heights / Hillcrest neighborhoods —
      // the dropdown label calls all of those out for local search intent.
      { slug: 'riverdale', label: 'Riverdale - Downtown - Heights - Hillcrest' },
      { slug: 'north-little-rock', label: 'North Little Rock, AR' },
      { slug: 'bryant', label: 'Bryant, AR' },
      { slug: 'hot-springs', label: 'Hot Springs, AR' },
    ],
  },
  {
    id: 'northwest-arkansas',
    label: 'Northwest Arkansas',
    cities: [
      { slug: 'springdale', label: 'Springdale, AR' },
      { slug: 'lowell', label: 'Lowell, AR' },
      { slug: 'bentonville', label: 'Bentonville, AR' },
    ],
  },
] as const

// NAV_TREE — everything to the RIGHT of the Locations dropdown.
// Locations is rendered separately via its own drill-down component.
export const NAV_TREE: readonly NavTreeItem[] = [
  {
    type: 'dropdown',
    label: 'Storage Types',
    items: [
      { label: 'Climate-Controlled Storage', href: '/climate-controlled' },
      { label: 'Boat & RV Storage', href: '/rv-boat-vehicle' },
      { label: 'Business Storage', href: '/business-storage' },
      { label: 'Household Storage', href: '/household-storage' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Unit Sizes',
    items: [
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'AI Size Finder', href: '/ai-storage-size-finder' },
    ],
  },
  { type: 'link', label: 'Moving Truck', href: '/free-moving-truck' },
  {
    type: 'dropdown',
    label: 'Resources',
    items: [
      { label: 'Blog', href: 'https://www.modernstorage.com/blog', external: true },
      {
        label: 'Podcast',
        href: 'https://podcast.modernstorage.com',
        external: true,
      },
      { label: 'Video Library', href: 'https://www.youtube.com/@modernstorage', external: true },
      { label: 'Free Moving Checklist', href: '/move-in-checklist' },
      { label: 'Storage Tips', href: 'https://www.modernstorage.com/blog', external: true },
    ],
  },
  { type: 'link', label: 'FAQ', href: '/faq' },
  { type: 'link', label: 'Contact Us', href: '/contact' },
] as const

export const THEME_PAGES = [
  {
    slug: 'climate-controlled',
    title: 'Climate-Controlled Storage',
    description:
      'Protect furniture, electronics, documents, photos, instruments, collectibles, and business inventory from Arkansas heat, cold, and humidity swings.',
    cta: 'Explore Climate-Controlled Storage',
    href: '/climate-controlled',
    image: '/images/modern-storage-bentonville-climate-controlled-hallway.jpg',
    alt: 'Climate-controlled storage hallway at Modern Storage® Bentonville with clean indoor units.',
  },
  {
    slug: 'household-storage',
    title: 'Household Storage',
    description:
      'Storage for moving, downsizing, renovating, growing families, life transitions, and seasonal items at 10 Modern Storage® locations across Arkansas.',
    cta: 'Explore Household Storage',
    href: '/household-storage',
    image: '/images/modern-storage-springdale-facility-exterior.jpg',
    alt: 'Modern Storage® Springdale self storage facility exterior in Arkansas with clean grounds.',
  },
  {
    slug: 'rv-boat-vehicle',
    title: 'Boat and RV Storage',
    description:
      'Boat, RV, trailer, motorcycle, and vehicle storage at select Modern Storage® locations near Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry.',
    cta: 'Explore Boat and RV Storage',
    href: '/rv-boat-vehicle',
    image: '/images/modern-storage-shackleford-rv-storage-unit.jpg',
    alt: 'RV stored inside a Modern Storage® Shackleford unit with red roll-up doors.',
  },
  {
    slug: 'business-storage',
    title: 'Business Storage',
    description:
      'Mini-warehouse and business storage for e-commerce, contractors, restoration crews, stagers, movers, and document archives — led by Modern Storage® Riverdale.',
    cta: 'Explore Business Storage',
    href: '/business-storage',
    image: '/images/modern-storage-riverdale-business-conference.jpg',
    alt: 'Business-friendly office and conference space at Modern Storage® Riverdale in Little Rock.',
  },
] as const

// Coordinates are approximate per the address; refine with a geocoder if precision matters.
export const LOCATIONS = [
  {
    slug: 'west-little-rock',
    name: 'Modern Storage® West Little Rock',
    city: 'Little Rock',
    state: 'AR',
    zip: '72211',
    region: 'Little Rock Area',
    streetAddress: '601 Autumn Rd',
    phone: '501-910-0096',
    lat: 34.748,
    lon: -92.376,
    image: '/images/modern-storage-west-little-rock-facility-exterior.jpg',
    alt: 'Modern Storage® West Little Rock self-storage facility exterior in Little Rock Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck', 'Se Habla Español'],
    reservationUrl: 'https://www.modernstorage.com/self-storage-little-rock-ar-f5198',
  },
  {
    slug: 'shackleford',
    name: 'Modern Storage® Shackleford',
    city: 'Little Rock',
    state: 'AR',
    zip: '72205',
    region: 'Little Rock Area',
    streetAddress: '3400 South Shackleford Road',
    phone: '501-910-0096',
    lat: 34.7466,
    lon: -92.4007,
    image: '/images/modern-storage-shackleford-facility-exterior.jpg',
    alt: 'Modern Storage® Shackleford self-storage facility exterior in Little Rock Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck'],
    reservationUrl: 'https://www.modernstorage.com/3400-south-shackleford-road-little-rock-ar-72205',
  },
  {
    slug: 'riverdale',
    name: 'Modern Storage® Riverdale',
    city: 'Little Rock',
    state: 'AR',
    zip: '72202',
    region: 'Little Rock Area',
    streetAddress: '2510 Cantrell Rd',
    phone: '501-910-0096',
    lat: 34.7506,
    lon: -92.2796,
    image: '/images/modern-storage-riverdale-facility-exterior.jpg',
    alt: 'Modern Storage® Riverdale self-storage facility exterior at sunset in Little Rock Arkansas',
    badges: ['Climate-Controlled', 'Business Storage', 'Ground-Floor Access', 'Free Moving Truck'],
    reservationUrl: 'https://www.modernstorage.com/2510-cantrell-rd-little-rock-ar-72202',
  },
  {
    slug: 'north-little-rock',
    name: 'Modern Storage® North Little Rock',
    city: 'North Little Rock',
    state: 'AR',
    zip: '72116',
    region: 'North Little Rock',
    streetAddress: '3100 North Hills Blvd',
    phone: '501-910-0096',
    lat: 34.802,
    lon: -92.260,
    image: '/images/modern-storage-north-little-rock-facility-night.jpg',
    alt: 'Modern Storage® North Little Rock self-storage facility at night in North Little Rock Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Business Storage', 'Free Moving Truck'],
    reservationUrl: 'https://www.modernstorage.com/self-storage-north-little-rock-ar-f8184',
  },
  {
    slug: 'maumelle',
    name: 'Modern Storage® Maumelle Blvd',
    city: 'North Little Rock',
    state: 'AR',
    zip: '72113',
    region: 'North Little Rock',
    streetAddress: '9100 Maumelle Blvd',
    phone: '501-910-0096',
    lat: 34.838,
    lon: -92.343,
    image: '/images/modern-storage-maumelle-facility-aerial.jpg',
    alt: 'Modern Storage® Maumelle Blvd self-storage facility aerial view in North Little Rock Arkansas',
    badges: ['Climate-Controlled', 'Boat/RV Storage', 'Free Moving Truck'],
    reservationUrl: 'https://www.modernstorage.com/self-storage-maumelle-ar-f9458',
  },
  {
    slug: 'bryant',
    name: 'Modern Storage® Bryant',
    city: 'Bryant',
    state: 'AR',
    zip: '72022',
    region: 'Bryant',
    streetAddress: '300 Dell Dr',
    phone: '501-910-0096',
    lat: 34.596,
    lon: -92.489,
    image: '/images/modern-storage-bryant-facility-sunset.jpg',
    alt: 'Modern Storage® Bryant self-storage facility exterior at sunset in Bryant Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Boat/RV Storage', 'Free Moving Truck'],
    reservationUrl: 'https://www.modernstorage.com/self-storage-bryant-ar-f8249',
  },
  {
    slug: 'hot-springs',
    name: 'Modern Storage® Hot Springs',
    city: 'Hot Springs',
    state: 'AR',
    zip: '71913',
    region: 'Hot Springs',
    streetAddress: '2138 Higdon Ferry Rd',
    phone: '501-910-0096',
    lat: 34.504,
    lon: -93.055,
    image: '/images/modern-storage-hot-springs-facility-exterior.jpg',
    alt: 'Modern Storage® Hot Springs self-storage facility exterior in Hot Springs Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck'],
    reservationUrl: 'https://www.modernstorage.com/self-storage-hot-springs-ar-f5404',
  },
  {
    slug: 'bentonville',
    name: 'Modern Storage® Bentonville',
    city: 'Bentonville',
    state: 'AR',
    zip: '72712',
    region: 'Northwest Arkansas',
    streetAddress: '700 SW 14th St',
    phone: '501-910-0096',
    lat: 36.372,
    lon: -94.208,
    image: '/images/modern-storage-bentonville-facility-exterior.jpg',
    alt: 'Modern Storage® Bentonville self-storage facility exterior in Bentonville Arkansas',
    badges: ['Climate-Controlled', 'Business Storage', 'Ground-Floor Access', 'Free Moving Truck'],
    reservationUrl: 'https://www.modernstorage.com/self-storage-bentonville-ar-f3125',
  },
  {
    slug: 'springdale',
    name: 'Modern Storage® Springdale',
    city: 'Springdale',
    state: 'AR',
    zip: '72762',
    region: 'Northwest Arkansas',
    streetAddress: '4555 W Sunset Ave',
    phone: '501-910-0096',
    lat: 36.187,
    lon: -94.129,
    image: '/images/modern-storage-springdale-facility-with-sculpture.jpg',
    alt: 'Modern Storage® Springdale self-storage facility exterior with red sculpture in Springdale Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck'],
    reservationUrl: 'https://www.modernstorage.com/self-storage-springdale-ar-f2741',
  },
  {
    slug: 'lowell',
    name: 'Modern Storage® Lowell',
    city: 'Lowell',
    state: 'AR',
    zip: '72745',
    region: 'Northwest Arkansas',
    streetAddress: '1407 W Monroe Ave',
    phone: '501-910-0096',
    lat: 36.255,
    lon: -94.140,
    image: '/images/modern-storage-lowell-facility-night.jpg',
    alt: 'Modern Storage® Lowell self-storage facility exterior at night in Lowell Arkansas',
    badges: ['Climate-Controlled', 'Boat/RV Storage', 'Business Storage', 'Free Moving Truck'],
    reservationUrl: 'https://www.modernstorage.com/1407-w-monroe-ave-lowell-ar-72745',
  },
] as const

// Approximate Arkansas bounding box used by the SVG map projection.
export const AR_BOUNDS = {
  north: 36.5,
  south: 33.02,
  east: -89.65,
  west: -94.6,
} as const

// Hand-traced simplified Arkansas outline (NW → N → bootheel → MS river → SE → S → SW → Red River jog → close).
// viewBox is 0 0 500 380 — match this in the map component.
export const ARKANSAS_OUTLINE_PATH =
  'M 0 0 L 449.5 0 L 449.5 54.6 L 500 54.6 L 484.8 109.2 L 469.7 163.8 L 424.2 218.4 L 363.6 273 L 345.5 380 L 56.6 380 L 56.6 322.2 L 17.2 322.2 Z'

export const ARKANSAS_VIEWBOX = { w: 500, h: 380 } as const

export const LOCATION_FILTERS = [
  'All Arkansas',
  'Little Rock Area',
  'North Little Rock',
  'Northwest Arkansas',
  'Hot Springs',
  'Bryant',
] as const

export const UNIT_SIZES = [
  {
    size: '5×5',
    label: '5x5 storage unit',
    bestFor: 'Closet-sized storage',
    fits: 'Boxes, seasonal decor, small furniture, suitcases',
  },
  {
    size: '5×10',
    label: '5x10 storage unit',
    bestFor: 'Studio apartment',
    fits: 'Mattress set, dresser, small couch, boxes, bicycles',
  },
  {
    size: '10×10',
    label: '10x10 storage unit',
    bestFor: '1-bedroom apartment',
    fits: 'Living room set, bedroom set, appliances, 15–20 boxes',
  },
  {
    size: '10×15',
    label: '10x15 storage unit',
    bestFor: '2-bedroom home',
    fits: 'Multiple bedroom sets, appliances, patio furniture, boxes',
  },
  {
    size: '10×20',
    label: '10x20 storage unit',
    bestFor: '3-bedroom home',
    fits: 'Full home contents, garage items, vehicle in some locations',
  },
  {
    size: '10×30',
    label: '10x30 storage unit',
    bestFor: '4–5 bedroom home',
    fits: 'Whole-home moves, large inventory, contractor equipment',
  },
] as const

export const WHY_US = [
  {
    title: 'Clean, well-kept facilities',
    description: 'Bright, well-maintained properties cleaned and inspected on a regular schedule.',
  },
  {
    title: 'Climate-controlled options',
    description: 'Temperature- and humidity-managed units that protect sensitive belongings year-round.',
  },
  {
    title: 'Free moving truck with new rentals',
    description: 'New customers can move in easier with a complimentary moving truck at participating locations.',
  },
  {
    title: 'Online reservations',
    description: 'Reserve a unit online in minutes — no waiting, no phone tag.',
  },
  {
    title: 'Month-to-month rentals',
    description: 'Flexible terms so you only pay for the storage you actually need.',
  },
  {
    title: 'Boat, RV, and vehicle storage',
    description: 'Outdoor and covered parking for boats, RVs, trailers, and vehicles at select locations.',
  },
  {
    title: 'Business storage options',
    description: 'Mini-warehouse and business-friendly units for contractors, e-commerce, and inventory.',
  },
  {
    title: 'Multiple Arkansas locations',
    description: '10 locations across central and Northwest Arkansas — there is one near you.',
  },
] as const

// FAQ answers below follow a deliberate SEO pattern:
//   1. First sentence answers the query directly (snippet-friendly).
//   2. Body weaves in exact-match phrases — self-storage units, storage facility,
//      indoor storage, secure storage, month-to-month, storage near me,
//      parking storage, square footage references, common search variants.
//   3. `aHtml` mirrors `a` with embedded internal links to size-guide,
//      climate-controlled, rv-boat-vehicle, business-storage, free-moving-truck,
//      and locations — strengthens topical authority and crawl pathways.
//   4. `a` (plain text) is what feeds the FAQPage JSON-LD schema.
export const FAQS = [
  {
    q: 'What size storage unit do I need?',
    a: `The best self-storage unit size depends on how many items, furniture pieces, or boxes you need to store. A 5x5 storage unit (25 sq ft) holds boxes, seasonal items, and closet overflow. A 10x10 storage unit (100 sq ft) fits the contents of a one-bedroom apartment — bed, dresser, couch, and 15-20 boxes. A 10x20 storage unit (200 sq ft) is sized for a three-bedroom home, large furniture, or business inventory. Modern Storage® publishes a full self-storage unit size guide so Arkansas customers can compare 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 storage units before reserving online.`,
    aHtml: `The best self-storage unit size depends on how many items, furniture pieces, or boxes you need to store. A 5x5 storage unit (25 sq ft) holds boxes, seasonal items, and closet overflow. A 10x10 storage unit (100 sq ft) fits the contents of a one-bedroom apartment — bed, dresser, couch, and 15-20 boxes. A 10x20 storage unit (200 sq ft) is sized for a three-bedroom home, large furniture, or business inventory. Modern Storage® publishes a full <a href="/size-guide">self-storage unit size guide</a> so Arkansas customers can compare 5x5, 5x10, 10x10, 10x15, 10x20, and 10x30 storage units before reserving online.`,
  },
  {
    q: 'Do you offer climate-controlled storage?',
    a: `Yes — Modern Storage® offers climate-controlled storage units at multiple Arkansas locations. Climate-controlled storage protects furniture, electronics, documents, photos, clothing, antiques, instruments, and business inventory from extreme heat, cold, and humidity. It is the recommended option for long-term storage, indoor storage of valuables, temperature-controlled storage for electronics, and storing anything sensitive to Arkansas summer humidity. Climate-controlled units are inside secure storage buildings with monitored access.`,
    aHtml: `Yes — Modern Storage® offers <a href="/climate-controlled">climate-controlled storage units</a> at multiple Arkansas locations. Climate-controlled storage protects furniture, electronics, documents, photos, clothing, antiques, instruments, and business inventory from extreme heat, cold, and humidity. It is the recommended option for long-term storage, indoor storage of valuables, temperature-controlled storage for electronics, and storing anything sensitive to Arkansas summer humidity. Climate-controlled units are inside secure storage buildings with monitored access.`,
  },
  {
    q: 'Is climate-controlled storage worth it in Arkansas?',
    a: `Climate-controlled storage is worth it in Arkansas for anything you would not store in a hot garage during August. Arkansas summers regularly push storage units above 100°F with high humidity — conditions that warp wood furniture, crack leather, fog photos, swell paper, and corrode electronics. If you are storing furniture during a remodel, electronics, instruments, family photos, important documents, art, antiques, or business inventory, climate-controlled storage at Modern Storage® is the safer choice. For tools, lawn equipment, or seasonal outdoor gear, a standard drive-up storage unit usually works fine.`,
    aHtml: `<a href="/climate-controlled">Climate-controlled storage</a> is worth it in Arkansas for anything you would not store in a hot garage during August. Arkansas summers regularly push storage units above 100°F with high humidity — conditions that warp wood furniture, crack leather, fog photos, swell paper, and corrode electronics. If you are storing furniture during a remodel, electronics, instruments, family photos, important documents, art, antiques, or business inventory, climate-controlled storage at Modern Storage® is the safer choice. For tools, lawn equipment, or seasonal outdoor gear, a standard drive-up storage unit usually works fine.`,
  },
  {
    q: 'Which locations offer boat and RV storage?',
    a: `Modern Storage® offers boat storage, RV storage, trailer parking, motorcycle storage, and vehicle parking storage at select Arkansas locations. Outdoor parking, covered parking, and oversized parking spaces are available depending on the facility. Customers searching for boat storage near Beaver Lake, RV storage near Lake Maumelle, or trailer storage near Greers Ferry can compare availability at Modern Storage® Maumelle Blvd in North Little Rock, Modern Storage® Bentonville, Modern Storage® West Little Rock, Modern Storage® Lowell, and Modern Storage® Shackleford.`,
    aHtml: `Modern Storage® offers <a href="/rv-boat-vehicle">boat storage, RV storage, trailer parking, motorcycle storage, and vehicle parking storage</a> at select Arkansas locations. Outdoor parking, covered parking, and oversized parking spaces are available depending on the facility. Customers searching for boat storage near Beaver Lake, RV storage near Lake Maumelle, or trailer storage near Greers Ferry can compare availability at Modern Storage® Maumelle Blvd in North Little Rock, Modern Storage® Bentonville, Modern Storage® West Little Rock, Modern Storage® Lowell, and Modern Storage® Shackleford.`,
  },
  {
    q: 'Can I store a boat year-round in Arkansas?',
    a: `Yes — Modern Storage® offers year-round boat storage in Arkansas. Boat owners near Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry use Modern Storage® for off-season boat storage, trailer storage, and storage between weekends on the water. Year-round boat storage protects the hull, upholstery, and electronics from sun damage, freeze cycles, and winter weather. Available formats include outdoor parking storage, covered boat parking, and indoor storage for smaller boats and personal watercraft, depending on the location.`,
    aHtml: `Yes — Modern Storage® offers year-round <a href="/rv-boat-vehicle">boat storage in Arkansas</a>. Boat owners near Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry use Modern Storage® for off-season boat storage, trailer storage, and storage between weekends on the water. Year-round boat storage protects the hull, upholstery, and electronics from sun damage, freeze cycles, and winter weather. Available formats include outdoor parking storage, covered boat parking, and indoor storage for smaller boats and personal watercraft, depending on the location.`,
  },
  {
    q: 'What fits in a 10x10 storage unit?',
    a: `A 10x10 storage unit (100 square feet) holds the contents of a typical one-bedroom apartment: a queen mattress and frame, a dresser, a sofa, a coffee table, a TV, a small dining set, plus 15-20 boxes of personal items. Most customers also fit a few lamps, a bookshelf, and seasonal items. A 10x10 is a popular self-storage unit size for college storage, apartment storage near downtown, storage during a move, and short-term overflow. If you are storing the contents of a two-bedroom home, look at a 10x15 or 10x20 instead.`,
    aHtml: `A 10x10 storage unit (100 square feet) holds the contents of a typical one-bedroom apartment: a queen mattress and frame, a dresser, a sofa, a coffee table, a TV, a small dining set, plus 15-20 boxes of personal items. Most customers also fit a few lamps, a bookshelf, and seasonal items. A 10x10 is a popular self-storage unit size for college storage, apartment storage near downtown, storage during a move, and short-term overflow. If you are storing the contents of a two-bedroom home, look at a 10x15 or 10x20 instead — see the full <a href="/size-guide">storage unit size guide</a>.`,
  },
  {
    q: 'How much does self-storage cost in Arkansas?',
    a: `Self-storage in Arkansas typically ranges from around $30/month for a small 5x5 storage unit to $250+/month for a large 10x30 storage unit or RV parking storage space. Pricing depends on unit size, climate-controlled vs. drive-up, location, and current availability. Modern Storage® lists current monthly rates and any move-in specials on each location's reservation page, so customers can compare cheap storage options across Little Rock, North Little Rock, Bentonville, Springdale, Lowell, Bryant, Hot Springs, and Maumelle before reserving.`,
    aHtml: `Self-storage in Arkansas typically ranges from around $30/month for a small 5x5 storage unit to $250+/month for a large 10x30 storage unit or RV parking storage space. Pricing depends on unit size, climate-controlled vs. drive-up, location, and current availability. Modern Storage® lists current monthly rates and any move-in specials on each <a href="/locations">location's reservation page</a>, so customers can compare cheap storage options across Little Rock, North Little Rock, Bentonville, Springdale, Lowell, Bryant, Hot Springs, and Maumelle before reserving.`,
  },
  {
    q: 'Can I reserve a storage unit online?',
    a: `Yes — you can reserve a self-storage unit online with Modern Storage® in under five minutes. Pick your Arkansas storage facility, choose your unit size (5x5, 5x10, 10x10, 10x15, 10x20, or 10x30), and complete the reservation from your phone, tablet, or computer. Online reservations let customers compare climate-controlled storage, drive-up storage, and parking storage availability at multiple Modern Storage® locations before visiting in person.`,
    aHtml: `Yes — you can reserve a self-storage unit online with Modern Storage® in under five minutes. Pick your Arkansas storage facility, choose your unit size (5x5, 5x10, 10x10, 10x15, 10x20, or 10x30), and complete the reservation from your phone, tablet, or computer. Online reservations let customers compare climate-controlled storage, drive-up storage, and parking storage availability at multiple <a href="/locations">Modern Storage® locations</a> before visiting in person.`,
  },
  {
    q: 'Do you offer a free moving truck?',
    a: `Yes — Modern Storage® offers a free moving truck with new self-storage rentals at participating Arkansas locations. The free truck is a popular move-in benefit for customers moving an apartment, a one-bedroom or two-bedroom home, business inventory, or large furniture into a Modern Storage® unit. Truck availability, mileage limits, fuel responsibility, and participation vary by facility, so customers should confirm details with the local storage facility before move-in day.`,
    aHtml: `Yes — Modern Storage® offers a <a href="/free-moving-truck">free moving truck</a> with new self-storage rentals at participating Arkansas locations. The free truck is a popular move-in benefit for customers moving an apartment, a one-bedroom or two-bedroom home, business inventory, or large furniture into a Modern Storage® unit. Truck availability, mileage limits, fuel responsibility, and participation vary by facility, so customers should confirm details with the local storage facility before move-in day.`,
  },
  {
    q: 'Are storage rentals month-to-month?',
    a: `Yes — Modern Storage® rents self-storage units on a month-to-month basis with no long-term contract. Month-to-month self-storage is the standard format for moving, remodeling, downsizing, business storage, seasonal storage, college storage, military deployment, and short-term overflow. Customers can extend month to month for as long as they need, or move out after 30 days. Month-to-month flexibility is one of the reasons self-storage is more affordable than renting a larger apartment or office.`,
    aHtml: `Yes — Modern Storage® rents self-storage units on a month-to-month basis with no long-term contract. Month-to-month self-storage is the standard format for moving, remodeling, downsizing, <a href="/business-storage">business storage</a>, seasonal storage, college storage, military deployment, and short-term overflow. Customers can extend month to month for as long as they need, or move out after 30 days. Month-to-month flexibility is one of the reasons self-storage is more affordable than renting a larger apartment or office.`,
  },
  {
    q: 'How do I find the closest Modern Storage® location?',
    a: `The fastest way to find a Modern Storage® storage unit near me is to use the locations page, which lists all 10 Arkansas facilities with addresses, phone numbers, and reservation links. Modern Storage® has self-storage facilities in Little Rock (Shackleford and Riverdale), West Little Rock, North Little Rock (North Hills Blvd and Maumelle Blvd), Maumelle, Bentonville, Bryant, Hot Springs, Springdale, and Lowell. Each location page shows climate-controlled availability, drive-up storage, boat and RV storage, and current move-in offers.`,
    aHtml: `The fastest way to find a Modern Storage® storage unit near me is to use the <a href="/locations">locations page</a>, which lists all 10 Arkansas facilities with addresses, phone numbers, and reservation links. Modern Storage® has self-storage facilities in Little Rock (Shackleford and Riverdale), West Little Rock, North Little Rock (North Hills Blvd and Maumelle Blvd), Maumelle, Bentonville, Bryant, Hot Springs, Springdale, and Lowell. Each location page shows climate-controlled availability, drive-up storage, boat and RV storage, and current move-in offers.`,
  },
  {
    q: 'Do you offer business storage?',
    a: `Yes — Modern Storage® offers business storage and mini-warehouse storage units across Arkansas. Business storage works for contractors, e-commerce sellers, sales reps, medical offices, real estate professionals, restoration crews, stagers, movers, and small business inventory storage. Business storage units hold inventory, tools, equipment, records, supplies, furniture, samples, and overflow materials — at a fraction of the cost of commercial office or warehouse space. Modern Storage® Riverdale offers business-friendly amenities including conference space, and most Arkansas locations offer month-to-month business storage.`,
    aHtml: `Yes — Modern Storage® offers <a href="/business-storage">business storage and mini-warehouse storage units</a> across Arkansas. Business storage works for contractors, e-commerce sellers, sales reps, medical offices, real estate professionals, restoration crews, stagers, movers, and small business inventory storage. Business storage units hold inventory, tools, equipment, records, supplies, furniture, samples, and overflow materials — at a fraction of the cost of commercial office or warehouse space. Modern Storage® Riverdale offers business-friendly amenities including conference space, and most Arkansas locations offer month-to-month business storage.`,
  },
  {
    q: 'Can businesses accept deliveries at a storage unit?',
    a: `Many Modern Storage® locations accept business deliveries at customer storage units, making them a practical alternative to leasing warehouse space. E-commerce sellers, restoration companies, contractors, and sales teams use Modern Storage® business storage to receive inventory shipments, equipment deliveries, supplies, and samples — without paying commercial warehouse rates. Acceptance policies, delivery hours, and signature requirements vary by location, so customers should confirm with their local Arkansas storage facility before scheduling shipments.`,
    aHtml: `Many Modern Storage® locations accept business deliveries at customer storage units, making them a practical alternative to leasing warehouse space. E-commerce sellers, restoration companies, contractors, and sales teams use Modern Storage® <a href="/business-storage">business storage</a> to receive inventory shipments, equipment deliveries, supplies, and samples — without paying commercial warehouse rates. Acceptance policies, delivery hours, and signature requirements vary by location, so customers should confirm with their local Arkansas storage facility before scheduling shipments.`,
  },
  {
    q: 'Do you have drive-up storage units?',
    a: `Yes — Modern Storage® offers drive-up storage units at most Arkansas locations. Drive-up storage lets customers pull a vehicle, trailer, or moving truck directly to the unit door for loading and unloading. It is the fastest format for heavy furniture, tools, equipment, business inventory, frequent access, and apartment storage during a move. Drive-up storage units are typically standard (non-climate-controlled), making them a more affordable option than indoor storage for items that tolerate temperature changes.`,
    aHtml: `Yes — Modern Storage® offers drive-up storage units at most Arkansas locations. Drive-up storage lets customers pull a vehicle, trailer, or moving truck directly to the unit door for loading and unloading. It is the fastest format for heavy furniture, tools, equipment, business inventory, frequent access, and apartment storage during a move. Drive-up storage units are typically standard (non-climate-controlled), making them a more affordable option than <a href="/climate-controlled">indoor climate-controlled storage</a> for items that tolerate temperature changes.`,
  },
  {
    q: 'Are storage units secure?',
    a: `Modern Storage® self-storage facilities are designed with multiple layers of security: gated entry with a personal access code, on-site cameras, exterior lighting, and individually locked storage units. Customers provide their own padlock or use a disc lock for added security. Secure storage matters most for business inventory, electronics, family heirlooms, and long-term storage — and is a key reason customers choose Modern Storage® over an unattended garage or shed. Specific security features vary by location and are listed on each facility's reservation page.`,
    aHtml: `Modern Storage® self-storage facilities are designed with multiple layers of security: gated entry with a personal access code, on-site cameras, exterior lighting, and individually locked storage units. Customers provide their own padlock or use a disc lock for added security. Secure storage matters most for business inventory, electronics, family heirlooms, and long-term storage — and is a key reason customers choose Modern Storage® over an unattended garage or shed. Specific security features vary by location and are listed on each <a href="/locations">facility's reservation page</a>.`,
  },
  {
    q: 'What cannot be stored in a storage unit?',
    a: `Self-storage units cannot be used for living, sleeping, or working out of, and cannot hold hazardous, flammable, perishable, or illegal items. That includes gasoline and fuel (drain mowers and equipment before storing), propane tanks, paint and solvents, fireworks, ammunition, food and groceries, plants, live animals, stolen property, and anything regulated by state or federal law. Wet items should also be avoided — they cause mold that can damage neighboring units. Modern Storage® provides a full prohibited-items list at move-in for each Arkansas storage facility.`,
    aHtml: `Self-storage units cannot be used for living, sleeping, or working out of, and cannot hold hazardous, flammable, perishable, or illegal items. That includes gasoline and fuel (drain mowers and equipment before storing), propane tanks, paint and solvents, fireworks, ammunition, food and groceries, plants, live animals, stolen property, and anything regulated by state or federal law. Wet items should also be avoided — they cause mold that can damage neighboring units. Modern Storage® provides a full prohibited-items list at move-in for each <a href="/locations">Arkansas storage facility</a>.`,
  },
  {
    q: 'Is storage insurance required?',
    a: `Most self-storage facilities, including Modern Storage®, require some form of storage insurance or protection plan on the contents of a storage unit. Many homeowners and renters insurance policies already extend coverage to off-premises storage — check with your insurance provider. If your existing policy does not cover stored items, Modern Storage® offers an affordable tenant protection plan at move-in. Storage insurance covers fire, theft, water damage, and other common loss events, and the monthly cost is typically a few dollars per $1,000 of declared value.`,
    aHtml: `Most self-storage facilities, including Modern Storage®, require some form of storage insurance or protection plan on the contents of a storage unit. Many homeowners and renters insurance policies already extend coverage to off-premises storage — check with your insurance provider. If your existing policy does not cover stored items, Modern Storage® offers an affordable tenant protection plan at move-in. Storage insurance covers fire, theft, water damage, and other common loss events, and the monthly cost is typically a few dollars per $1,000 of declared value.`,
  },
  {
    q: 'Do you have storage units in Little Rock, Bentonville, Springdale, Hot Springs, Bryant, and North Little Rock?',
    a: `Yes — Modern Storage® has self-storage facilities serving every major Arkansas market. Customers searching for storage units near Little Rock can rent at Modern Storage® Shackleford, Modern Storage® Riverdale, or Modern Storage® West Little Rock. Self-storage facilities near North Little Rock include North Hills Blvd and Maumelle Blvd. Storage units near Bentonville, Lowell, and Springdale serve all of Northwest Arkansas. Modern Storage® also has storage facilities in Bryant (south of Little Rock), Hot Springs, and Maumelle. Depending on the location, customers can choose climate-controlled storage, drive-up storage, boat and RV storage, vehicle parking storage, business storage, and mini-warehouse units — all month-to-month, all reservable online.`,
    aHtml: `Yes — Modern Storage® has self-storage facilities serving every major Arkansas market. Customers searching for storage units near Little Rock can rent at Modern Storage® Shackleford, Modern Storage® Riverdale, or Modern Storage® West Little Rock. Self-storage facilities near North Little Rock include North Hills Blvd and Maumelle Blvd. Storage units near Bentonville, Lowell, and Springdale serve all of Northwest Arkansas. Modern Storage® also has storage facilities in Bryant (south of Little Rock), Hot Springs, and Maumelle. Depending on the location, customers can choose <a href="/climate-controlled">climate-controlled storage</a>, drive-up storage, <a href="/rv-boat-vehicle">boat and RV storage</a>, vehicle parking storage, <a href="/business-storage">business storage</a>, and mini-warehouse units — all month-to-month, all reservable online via the <a href="/locations">Modern Storage® locations page</a>.`,
  },
] as const

export const REVIEWS = [
  {
    quote: `Just rented a unit at Modern Storage® Springdale and I'm seriously impressed. Hunter helped me get set up and showed me my temperature-controlled 10x20 unit, which was exactly what I needed. Easy process, clean facility, and great service overall.`,
    author: 'Jeffrey B.',
    location: 'Modern Storage® Springdale',
    facilitySlug: 'springdale',
    theme: 'Climate-controlled fit',
  },
  {
    quote: `Modern Storage® West Little Rock has professional, knowledgeable, and friendly staff, a clean and secure environment, and an easy move-in process. Great location, competitive pricing, gated access, and personal access codes. Very happy to be here!`,
    author: 'Sholanda G.',
    location: 'Modern Storage® West Little Rock',
    facilitySlug: 'west-little-rock',
    theme: 'Easy move-in',
  },
  {
    quote: `From the moment we walked into Modern Storage® Bentonville, the team made us feel taken care of. Friendly guidance, expert knowledge, and a smooth experience from start to finish. We'll absolutely recommend Modern Storage® Bentonville to others.`,
    author: 'Holly G.',
    location: 'Modern Storage® Bentonville',
    facilitySlug: 'bentonville',
    theme: 'Helpful team',
  },
] as const
