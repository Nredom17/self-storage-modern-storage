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
  { label: 'Unit Sizes', href: '/#size-guide' },
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
      { label: 'Size Guide', href: '/#size-guide' },
      { label: 'AI Size Finder', href: '/ai-storage-size-finder' },
      { label: '5x5 to 10x30 Sizes', href: '/#size-guide' },
    ],
  },
  { type: 'link', label: 'Moving Truck', href: '/free-moving-truck' },
  {
    type: 'dropdown',
    label: 'Resources',
    items: [
      { label: 'Blog', href: 'https://www.modernstorage.com/blog', external: true },
      {
        label: 'Modern Storage® Unpacked',
        href: 'https://podcast.modernstorage.com',
        external: true,
      },
      { label: 'Video Library', href: 'https://www.youtube.com/@modernstorage', external: true },
      { label: 'Free Moving Checklist', href: '/move-in-checklist' },
      { label: 'Storage Tips', href: 'https://www.modernstorage.com/blog', external: true },
    ],
  },
  { type: 'link', label: 'FAQ', href: '/#faq' },
  { type: 'link', label: 'Reserve Now', href: '/#reserve' },
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
    badges: ['Climate-Controlled', 'Business Storage', 'Ground-Floor Access'],
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
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Business Storage'],
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
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Boat/RV Storage'],
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
    badges: ['Climate-Controlled', 'Business Storage', 'Ground-Floor Access'],
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
    badges: ['Climate-Controlled', 'Boat/RV Storage', 'Business Storage'],
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

export const FAQS = [
  {
    q: 'What size storage unit do I need?',
    a: `The right storage unit size depends on what you plan to store. A 5x5 storage unit is great for boxes, seasonal items, and closet overflow. A 10x10 storage unit can usually hold the contents of a one-bedroom apartment. A 10x20 storage unit is often used for the contents of a three-bedroom home, large furniture, or business inventory. Modern Storage® offers a storage unit size guide to help Arkansas customers choose the best fit before renting.`,
  },
  {
    q: 'Do you offer climate-controlled storage?',
    a: `Yes. Many Modern Storage® locations in Arkansas offer climate-controlled storage units designed to help protect furniture, electronics, documents, photos, clothing, antiques, and business inventory from extreme temperature changes and humidity. Climate-controlled storage is a smart option if you are storing items long term or storing anything sensitive to heat, cold, or moisture.`,
  },
  {
    q: 'Which locations offer boat and RV storage?',
    a: `Select Modern Storage® locations offer boat storage, RV storage, trailer parking, and vehicle storage. Availability varies by location, but options may include outdoor parking, covered parking, and oversized spaces for larger vehicles. Customers looking for boat and RV storage in Arkansas can check availability at Modern Storage® locations including Maumelle Blvd in North Little Rock, Bentonville, West Little Rock, and Lowell.`,
  },
  {
    q: 'Can I reserve a storage unit online?',
    a: `Yes. You can reserve a storage unit online through the Modern Storage® website in just a few minutes. Choose your Arkansas storage location, select the unit size that works best for you, and complete your reservation from your phone, tablet, or computer. Online reservations make it easy to compare storage options before visiting the facility.`,
  },
  {
    q: 'Do you offer a free moving truck?',
    a: `Modern Storage® offers a free moving truck with new rentals at participating locations. Truck availability, rental requirements, mileage limits, and location participation may vary, so customers should contact their local Modern Storage® facility before move-in. It is a helpful option for moving furniture, boxes, apartment contents, or business inventory into storage.`,
  },
  {
    q: 'Are storage rentals month-to-month?',
    a: `Yes. Modern Storage® storage rentals are month-to-month, giving customers flexibility without a long-term contract. Month-to-month storage is ideal for moving, remodeling, downsizing, business storage, seasonal storage, college storage, or short-term overflow needs.`,
  },
  {
    q: 'How do I find the closest Modern Storage® location?',
    a: `Modern Storage® has convenient self-storage locations across Arkansas, including Little Rock, West Little Rock, North Little Rock (with two facilities — North Hills Blvd and Maumelle Blvd), Bentonville, Bryant, Hot Springs, Springdale, and Lowell. Customers can visit the Modern Storage® locations page to find the nearest facility, compare amenities, and view available storage units.`,
  },
  {
    q: 'Do you offer business storage?',
    a: `Yes. Modern Storage® offers business storage and mini-warehouse storage for contractors, e-commerce sellers, sales reps, medical offices, real estate professionals, and small businesses. Business storage units can be used for inventory, tools, equipment, records, supplies, furniture, and overflow materials.`,
  },
  {
    q: 'Do you have drive-up storage units?',
    a: `Yes. Many Modern Storage® locations offer drive-up storage units, allowing customers to load and unload directly from their vehicle. Drive-up access is especially helpful for heavy furniture, tools, equipment, business inventory, and frequent trips to your storage unit.`,
  },
  {
    q: 'Do you have storage units in Little Rock, Bentonville, Springdale, Hot Springs, Bryant, and North Little Rock?',
    a: `Yes. Modern Storage® offers self-storage units in Little Rock, West Little Rock, North Little Rock (including the Maumelle Blvd facility), Bentonville, Bryant, Hot Springs, Springdale, and Lowell. Depending on the location, customers can find climate-controlled storage, drive-up storage, boat and RV storage, vehicle parking, business storage, and mini-warehouse options.`,
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
