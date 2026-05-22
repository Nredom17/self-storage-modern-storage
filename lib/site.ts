export const SITE_URL = 'https://self-storage.modernstorage.com'

export const PHONE_NUMBER_DISPLAY = '[CENTRALIZED PHONE NUMBER]'
export const PHONE_NUMBER_HREF = 'tel:[CENTRALIZED PHONE NUMBER]'

// Reserve buttons point here. Replace with the live reservation URL
// (e.g., Storable/SiteLink/etc.) before launch. Find-a-unit buttons should
// continue to point at #locations (the location finder).
export const RESERVATION_URL = '[RESERVATION LINK]'

export const NAV_LINKS = [
  { label: 'Storage Options', href: '/#storage-options' },
  { label: 'Unit Sizes', href: '/#size-guide' },
  { label: 'Locations', href: '/#locations' },
  { label: 'Moving Truck', href: '/#moving-truck' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Reserve Now', href: '/#reserve' },
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
    alt: 'Climate-controlled storage hallway at Modern Storage Bentonville with clean indoor units.',
  },
  {
    slug: 'boat-rv-vehicle',
    title: 'Boat, RV & Vehicle Storage',
    description:
      'Store boats, RVs, trailers, motorcycles, cars, and work vehicles at select Modern Storage locations with convenient access and secure parking options.',
    cta: 'Explore Boat and RV Storage',
    href: '/boat-rv-vehicle',
    image: '/images/modern-storage-shackleford-rv-storage-unit.jpg',
    alt: 'RV stored inside a Modern Storage Shackleford unit with red roll-up doors.',
  },
  {
    slug: 'business',
    title: 'Business & Mini-Warehouse Storage',
    description:
      'Flexible storage for contractors, e-commerce sellers, inventory overflow, records, equipment, and small business operations.',
    cta: 'Explore Business Storage',
    href: '/business',
    image: '/images/modern-storage-riverdale-business-conference.jpg',
    alt: 'Business-friendly office and conference space at Modern Storage Riverdale.',
  },
  {
    slug: 'household-moving',
    title: 'Household Storage & Moving',
    description:
      'Modern Storage offers clean, modern storage facilities across Arkansas for moving, household storage, and life transitions.',
    cta: 'Explore Household Storage',
    href: '/household-moving',
    image: '/images/modern-storage-springdale-facility-exterior.jpg',
    alt: 'Modern Storage Springdale self storage facility exterior in Arkansas with premium modern design.',
  },
] as const

// Approximate placeholder coordinates for each facility. Replace with the actual
// site coordinates (Google Maps -> right-click -> first row) before launch.
export const LOCATIONS = [
  {
    slug: 'west-little-rock',
    name: 'Modern Storage — West Little Rock',
    city: 'Little Rock',
    region: 'Little Rock Area',
    address: '[Street address placeholder], Little Rock, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 34.748,
    lon: -92.376,
    image: '/images/modern-storage-west-little-rock-facility-exterior.jpg',
    alt: 'Modern Storage West Little Rock self-storage facility exterior in Little Rock Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck', 'Se Habla Español'],
    reservationUrl: '[RESERVATION LINK]',
  },
  {
    slug: 'shackleford',
    name: 'Modern Storage — Shackleford',
    city: 'Little Rock',
    region: 'Little Rock Area',
    address: '[Street address placeholder], Little Rock, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 34.748,
    lon: -92.396,
    image: '/images/modern-storage-shackleford-facility-exterior.jpg',
    alt: 'Modern Storage Shackleford self-storage facility exterior in Little Rock Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck'],
    reservationUrl: '[RESERVATION LINK]',
  },
  {
    slug: 'riverdale',
    name: 'Modern Storage — Riverdale',
    city: 'Little Rock',
    region: 'Little Rock Area',
    address: '[Street address placeholder], Little Rock, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 34.766,
    lon: -92.296,
    image: '/images/modern-storage-riverdale-facility-exterior.jpg',
    alt: 'Modern Storage Riverdale self-storage facility exterior at sunset in Little Rock Arkansas',
    badges: ['Climate-Controlled', 'Business Storage', 'Ground-Floor Access'],
    reservationUrl: '[RESERVATION LINK]',
  },
  {
    slug: 'north-little-rock',
    name: 'Modern Storage — North Little Rock',
    city: 'North Little Rock',
    region: 'North Little Rock',
    address: '[Street address placeholder], North Little Rock, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 34.769,
    lon: -92.267,
    image: '/images/modern-storage-north-little-rock-facility-night.jpg',
    alt: 'Modern Storage North Little Rock self-storage facility at night in North Little Rock Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Business Storage'],
    reservationUrl: '[RESERVATION LINK]',
  },
  {
    slug: 'maumelle',
    name: 'Modern Storage — Maumelle',
    city: 'Maumelle',
    region: 'Maumelle',
    address: '[Street address placeholder], Maumelle, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 34.866,
    lon: -92.404,
    image: '/images/modern-storage-maumelle-facility-aerial.jpg',
    alt: 'Modern Storage Maumelle self-storage facility aerial view in Arkansas',
    badges: ['Climate-Controlled', 'Boat/RV Storage', 'Free Moving Truck'],
    reservationUrl: '[RESERVATION LINK]',
  },
  {
    slug: 'bryant',
    name: 'Modern Storage — Bryant',
    city: 'Bryant',
    region: 'Bryant',
    address: '[Street address placeholder], Bryant, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 34.596,
    lon: -92.489,
    image: '/images/modern-storage-bryant-facility-sunset.jpg',
    alt: 'Modern Storage Bryant self-storage facility exterior at sunset in Bryant Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Boat/RV Storage'],
    reservationUrl: '[RESERVATION LINK]',
  },
  {
    slug: 'hot-springs',
    name: 'Modern Storage — Hot Springs',
    city: 'Hot Springs',
    region: 'Hot Springs',
    address: '[Street address placeholder], Hot Springs, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 34.504,
    lon: -93.055,
    image: '/images/modern-storage-hot-springs-facility-exterior.jpg',
    alt: 'Modern Storage Hot Springs self-storage facility exterior in Hot Springs Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck'],
    reservationUrl: '[RESERVATION LINK]',
  },
  {
    slug: 'bentonville',
    name: 'Modern Storage — Bentonville',
    city: 'Bentonville',
    region: 'Northwest Arkansas',
    address: '[Street address placeholder], Bentonville, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 36.372,
    lon: -94.208,
    image: '/images/modern-storage-bentonville-facility-exterior.jpg',
    alt: 'Modern Storage Bentonville self-storage facility exterior in Bentonville Arkansas',
    badges: ['Climate-Controlled', 'Business Storage', 'Ground-Floor Access'],
    reservationUrl: '[RESERVATION LINK]',
  },
  {
    slug: 'springdale',
    name: 'Modern Storage — Springdale',
    city: 'Springdale',
    region: 'Northwest Arkansas',
    address: '[Street address placeholder], Springdale, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 36.187,
    lon: -94.129,
    image: '/images/modern-storage-springdale-facility-with-sculpture.jpg',
    alt: 'Modern Storage Springdale self-storage facility exterior with red sculpture in Springdale Arkansas',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck'],
    reservationUrl: '[RESERVATION LINK]',
  },
  {
    slug: 'lowell',
    name: 'Modern Storage — Lowell',
    city: 'Lowell',
    region: 'Northwest Arkansas',
    address: '[Street address placeholder], Lowell, AR',
    phone: '[CENTRALIZED PHONE NUMBER]',
    lat: 36.255,
    lon: -94.131,
    image: '/images/modern-storage-lowell-facility-night.jpg',
    alt: 'Modern Storage Lowell self-storage facility exterior at night in Lowell Arkansas',
    badges: ['Climate-Controlled', 'Boat/RV Storage', 'Business Storage'],
    reservationUrl: '[RESERVATION LINK]',
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
  'Maumelle',
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
    a: 'A 5×5 holds closet-sized items, a 10×10 fits a one-bedroom apartment, and a 10×20 typically holds a 3-bedroom home. Use the Modern Storage size guide above for a quick visual reference, or call us and we will help you choose.',
  },
  {
    q: 'Do you offer climate-controlled storage?',
    a: 'Yes. Most Modern Storage locations across Arkansas offer climate-controlled units that keep temperature and humidity within a controlled range — ideal for furniture, electronics, documents, photos, and business inventory.',
  },
  {
    q: 'Which locations offer boat and RV storage?',
    a: 'Select Modern Storage locations including Maumelle, Bryant, and Lowell offer outdoor and covered boat, RV, trailer, and vehicle parking. Visit our Boat, RV & Vehicle Storage page to see availability.',
  },
  {
    q: 'Can I reserve a storage unit online?',
    a: 'Yes — you can reserve a storage unit online in just a few minutes. Pick your location, pick a unit size, and complete the reservation from your phone or computer.',
  },
  {
    q: 'Do you offer a free moving truck?',
    a: 'Modern Storage offers a free moving truck with new rentals at participating locations. Availability, requirements, and location participation may vary, so check with your local Modern Storage for details.',
  },
  {
    q: 'Are storage rentals month-to-month?',
    a: 'Yes. All Modern Storage rentals are month-to-month, so you only pay for the storage you need without a long-term commitment.',
  },
  {
    q: 'Which Modern Storage location is closest to me?',
    a: 'Modern Storage operates 10 locations across Arkansas including West Little Rock, Shackleford, Riverdale, North Little Rock, Maumelle, Bryant, Hot Springs, Bentonville, Springdale, and Lowell. Use the location finder above to choose the one nearest you.',
  },
  {
    q: 'Do you offer business storage?',
    a: 'Yes. Modern Storage offers mini-warehouse and business-friendly units for contractors, e-commerce sellers, inventory overflow, records, and small-business equipment. Visit our Business Storage page to learn more.',
  },
  {
    q: 'Do you have drive-up storage units?',
    a: 'Yes — many Modern Storage locations offer drive-up storage units that let you load and unload directly from your vehicle. Look for the Drive-Up Access badge on each location card.',
  },
  {
    q: 'Do you have storage units in Little Rock, Bentonville, Springdale, Hot Springs, Bryant, Maumelle, and North Little Rock?',
    a: 'Yes. Modern Storage operates self-storage facilities in all of those Arkansas markets, plus Lowell in Northwest Arkansas. Each location offers a mix of climate-controlled, drive-up, boat/RV, and business storage options.',
  },
] as const

export const REVIEWS = [
  {
    quote:
      'The facility was spotless and well lit. It made picking a unit and moving in feel easy — exactly what I wanted from a storage company.',
    author: 'Verified customer',
    location: 'Little Rock, AR',
    theme: 'Clean facility',
  },
  {
    quote:
      'The team helped me figure out the right size and even walked me through the climate-controlled hallway before I signed. Super helpful from start to finish.',
    author: 'Verified customer',
    location: 'Bentonville, AR',
    theme: 'Helpful team',
  },
  {
    quote:
      'Reserved online in a couple of minutes and used the free moving truck. Move-in was the smoothest part of my whole move.',
    author: 'Verified customer',
    location: 'Maumelle, AR',
    theme: 'Easy move-in',
  },
] as const
