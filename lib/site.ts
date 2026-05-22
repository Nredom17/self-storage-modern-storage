export const SITE_URL = 'https://self-storage.modernstorage.com'

export const PHONE_NUMBER_DISPLAY = '[CENTRALIZED PHONE NUMBER]'
export const PHONE_NUMBER_HREF = 'tel:[CENTRALIZED PHONE NUMBER]'

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
    image: '/images/modern-storage-climate-controlled-storage-hallway.jpg',
    alt: 'Climate-controlled storage hallway at Modern Storage with clean indoor units',
  },
  {
    slug: 'boat-rv-vehicle',
    title: 'Boat, RV & Vehicle Storage',
    description:
      'Store boats, RVs, trailers, motorcycles, cars, and work vehicles at select Modern Storage locations with convenient access and secure parking options.',
    cta: 'Explore Boat and RV Storage',
    href: '/boat-rv-vehicle',
    image: '/images/modern-storage-boat-rv-vehicle-storage.jpg',
    alt: 'Boat and RV storage parking area at Modern Storage in Arkansas',
  },
  {
    slug: 'business',
    title: 'Business & Mini-Warehouse Storage',
    description:
      'Flexible storage for contractors, e-commerce sellers, inventory overflow, records, equipment, and small business operations.',
    cta: 'Explore Business Storage',
    href: '/business',
    image: '/images/modern-storage-business-mini-warehouse-storage.jpg',
    alt: 'Business storage and mini-warehouse space at Modern Storage with loading access',
  },
  {
    slug: 'household-moving',
    title: 'Household Storage & Moving',
    description:
      'Storage for moving, downsizing, renovating, seasonal items, growing families, and life transitions.',
    cta: 'Explore Household Storage',
    href: '/household-moving',
    image: '/images/modern-storage-household-moving-storage.jpg',
    alt: 'Family loading boxes into a Modern Storage unit during a move',
  },
] as const

export const LOCATIONS = [
  {
    name: 'Modern Storage — Little Rock (West Markham)',
    region: 'Little Rock Area',
    address: '[Street address placeholder], Little Rock, AR',
    image: '/images/modern-storage-little-rock-location.jpg',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck', 'Se Habla Español'],
  },
  {
    name: 'Modern Storage — Cantrell',
    region: 'Little Rock Area',
    address: '[Street address placeholder], Little Rock, AR',
    image: '/images/modern-storage-cantrell-location.jpg',
    badges: ['Climate-Controlled', 'Ground-Floor Access', 'Free Moving Truck'],
  },
  {
    name: 'Modern Storage — North Little Rock',
    region: 'North Little Rock',
    address: '[Street address placeholder], North Little Rock, AR',
    image: '/images/modern-storage-north-little-rock-location.jpg',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Business Storage'],
  },
  {
    name: 'Modern Storage — Maumelle',
    region: 'Maumelle',
    address: '[Street address placeholder], Maumelle, AR',
    image: '/images/modern-storage-maumelle-location.jpg',
    badges: ['Climate-Controlled', 'Boat/RV Storage', 'Free Moving Truck'],
  },
  {
    name: 'Modern Storage — Bryant',
    region: 'Bryant',
    address: '[Street address placeholder], Bryant, AR',
    image: '/images/modern-storage-bryant-location.jpg',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Boat/RV Storage'],
  },
  {
    name: 'Modern Storage — Hot Springs',
    region: 'Hot Springs',
    address: '[Street address placeholder], Hot Springs, AR',
    image: '/images/modern-storage-hot-springs-location.jpg',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck'],
  },
  {
    name: 'Modern Storage — Bentonville',
    region: 'Northwest Arkansas',
    address: '[Street address placeholder], Bentonville, AR',
    image: '/images/modern-storage-bentonville-location.jpg',
    badges: ['Climate-Controlled', 'Business Storage', 'Ground-Floor Access'],
  },
  {
    name: 'Modern Storage — Springdale',
    region: 'Northwest Arkansas',
    address: '[Street address placeholder], Springdale, AR',
    image: '/images/modern-storage-springdale-location.jpg',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck'],
  },
  {
    name: 'Modern Storage — Lowell',
    region: 'Northwest Arkansas',
    address: '[Street address placeholder], Lowell, AR',
    image: '/images/modern-storage-lowell-location.jpg',
    badges: ['Climate-Controlled', 'Boat/RV Storage', 'Business Storage'],
  },
  {
    name: 'Modern Storage — Fayetteville',
    region: 'Northwest Arkansas',
    address: '[Street address placeholder], Fayetteville, AR',
    image: '/images/modern-storage-fayetteville-location.jpg',
    badges: ['Climate-Controlled', 'Drive-Up Access', 'Free Moving Truck', 'Se Habla Español'],
  },
] as const

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
    a: 'Modern Storage operates 10 locations across Arkansas including Little Rock, North Little Rock, Maumelle, Bryant, Hot Springs, Bentonville, Springdale, Lowell, and Fayetteville. Use the location finder above to choose the one nearest you.',
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
    a: 'Yes. Modern Storage operates self-storage facilities in all of those Arkansas markets, plus Lowell and Fayetteville in Northwest Arkansas. Each location offers a mix of climate-controlled, drive-up, boat/RV, and business storage options.',
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
