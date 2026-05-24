// Featured locations are rendered in this exact order on /boat-rv-storage.
// Slugs must match entries in lib/site.ts LOCATIONS (and the Supabase mirror).
export const BOAT_RV_FEATURED_SLUGS = [
  'lowell',
  'shackleford',
  'bentonville',
  'springdale',
  'maumelle',
  'hot-springs',
] as const

export const VEHICLE_TYPE_CARDS = [
  {
    type: 'Boat Storage',
    sub: 'Bass boats, ski boats, pontoons, fishing rigs',
    body:
      'Modern Storage® offers outdoor parking and covered options for boats kept close to Arkansas lakes. Pull-through and back-in spaces at participating locations make trailer maneuvering easier between weekend trips.',
    bullets: [
      'Outdoor parking and select covered options',
      'Pull-through and back-in spaces at participating sites',
      'Convenient to Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry',
      'Month-to-month — store seasonally or year-round',
    ],
    icon: 'boat',
  },
  {
    type: 'RV Storage',
    sub: 'Class A, Class C, travel trailers, fifth wheels',
    body:
      'Park motorhomes, travel trailers, and fifth wheels at Modern Storage® locations sized for larger rigs. Wide drive aisles and oversized spaces help with maneuvering, and indoor RV storage is available at select facilities like Shackleford.',
    bullets: [
      'Oversized outdoor spaces for Class A and fifth wheels',
      'Indoor RV storage at select locations including Shackleford',
      'Wide drive aisles for easier maneuvering',
      'Gated, surveilled facilities with individual rentals',
    ],
    icon: 'rv',
  },
  {
    type: 'Vehicle Storage',
    sub: 'Cars, trucks, work vans, trailers, motorcycles',
    body:
      'Daily drivers, project cars, work vans, utility trailers, and motorcycles all have a home at Modern Storage®. Vehicle storage is a good fit for households without a garage, snowbirds, and contractors needing a secure place to stage equipment.',
    bullets: [
      'Outdoor parking for cars, trucks, and vans',
      'Trailer and equipment storage at participating sites',
      'Motorcycle storage indoors or outdoors',
      'Month-to-month — pause when the season ends',
    ],
    icon: 'car',
  },
] as const

export const BOAT_RV_SIZING = [
  {
    space: '10x20',
    bestFor: 'Compact boats and small trailers',
    fits: 'Bass boats up to ~17 ft, jet skis on trailers, utility trailers, small motorcycles in covered space',
  },
  {
    space: '10x25',
    bestFor: 'Mid-size boats, smaller travel trailers',
    fits: 'Center-console fishing boats, ski boats up to ~22 ft, pop-up campers, single-axle travel trailers',
  },
  {
    space: '10x30',
    bestFor: 'Pontoons, travel trailers, work vans',
    fits: 'Pontoons up to ~24 ft, mid-size travel trailers, full-size pickups with caps, work vans',
  },
  {
    space: '10x40',
    bestFor: 'Class C motorhomes, fifth wheels',
    fits: 'Class C RVs, fifth wheels, larger travel trailers, dual-axle utility trailers',
  },
  {
    space: '12x45+',
    bestFor: 'Class A motorhomes and large rigs',
    fits: 'Class A motorhomes, large fifth wheels, toy haulers, and combination tow setups',
  },
] as const

export const BOAT_RV_FAQS = [
  {
    q: 'Where can I store my boat or RV in Arkansas?',
    a: `Modern Storage® offers boat, RV, and vehicle storage at select Arkansas locations including Lowell, Shackleford in Little Rock, Bentonville, Springdale, Maumelle, and Hot Springs. Customers near Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry use Modern Storage® to keep boats, RVs, and trailers ready for the next trip. Availability and parking types vary by location — call ahead or check the location pages for current options.`,
  },
  {
    q: 'Do you offer indoor or covered RV storage?',
    a: `Yes. Modern Storage® Shackleford in Little Rock offers indoor RV storage, and select locations offer covered parking options. Indoor and covered RV storage helps protect motorhomes, fifth wheels, and travel trailers from sun, hail, and weather between trips. Specific bay sizes and availability vary by facility, so reach out to the Modern Storage® location nearest you for current options.`,
  },
  {
    q: 'What size parking space do I need for my RV?',
    a: `A typical Class C motorhome or fifth wheel fits in a 10x40 space at Modern Storage®. Class A motorhomes and larger fifth wheels often need a 12x45 or larger. Smaller travel trailers, pop-up campers, and pontoons can fit in 10x25 or 10x30 spaces. Measure your rig (including any rear ladder, hitch, and tongue extension) before reserving, and the Modern Storage® team can help match it to the right space.`,
  },
  {
    q: 'Can I store my boat trailer and tow vehicle together?',
    a: `Often yes, depending on the space and location. Modern Storage® offers outdoor parking sized for boat-and-trailer combinations and at select sites you can rent a single larger space for a tow vehicle alongside the trailer. Pull-through spaces at participating locations make hooking and unhooking easier.`,
  },
  {
    q: 'Are the boat and RV storage facilities secure?',
    a: `Modern Storage® facilities are gated and surveilled, with individual rentals and on-site coverage that varies by location. Customers receive their own access code or app credential for entry during access hours. Specific security features — fencing, lighting, camera placement, and access hours — vary by facility, so confirm details with the Modern Storage® location you plan to rent from.`,
  },
  {
    q: 'How much does boat or RV storage cost in Arkansas?',
    a: `Pricing for boat, RV, and vehicle storage at Modern Storage® varies by location, space size, and whether the space is outdoor, covered, or indoor. The fastest way to see current pricing is to check the reservation page for the Modern Storage® location nearest you. Month-to-month rentals are the standard, so customers can store seasonally without a long-term contract.`,
  },
  {
    q: 'Can I work on my boat or RV at the storage facility?',
    a: `Modern Storage® rentals are for storage, not for mechanical work, washing, or major maintenance. Customers can hitch and unhitch, load gear, and prep for trips, but on-site repair work is not permitted. This keeps the lot clean, clear for other rentals, and within insurance and local code requirements. The team can recommend nearby service options when needed.`,
  },
  {
    q: 'Can I access my boat or RV after hours?',
    a: `Access hours vary by Modern Storage® location. Many facilities offer extended access hours, and a few may offer 24-hour access by exception. The location you reserve with will confirm exact access hours so you can plan early-morning launches and late-night returns from the lake.`,
  },
] as const
