// Featured locations are rendered in this exact order on /rv-boat-vehicle.
// Slugs must match entries in lib/site.ts LOCATIONS (and the Supabase mirror).
export const BOAT_RV_FEATURED_SLUGS = [
  'lowell',
  'shackleford',
  'bentonville',
  'springdale',
  'maumelle',
  'hot-springs',
] as const

// Per-location 50–100 word copy used on the featured-location cards.
// Tone: factual, local, no fabricated amenities. Keep aligned with what the
// publicly listed badges and Modern Storage® data actually support.
export const BOAT_RV_LOCATION_COPY: Record<
  (typeof BOAT_RV_FEATURED_SLUGS)[number],
  { tagline: string; body: string; bestFor: string[]; caption: string }
> = {
  lowell: {
    tagline: 'Northwest Arkansas · Beaver Lake gateway',
    body:
      'Modern Storage® Lowell sits in the heart of Northwest Arkansas boating and RV country. From the facility on Monroe Avenue customers are minutes from US-71 and a straightforward run to Beaver Lake for tournaments and weekend trips. The site supports boat storage on trailers, RV parking sized for travel trailers and fifth wheels, and vehicle and trailer storage for contractors moving equipment between NWA jobsites.',
    bestFor: [
      'Bass and pontoon boats headed to Beaver Lake',
      'Travel trailers and fifth wheels',
      'Work trailers and seasonal vehicles',
    ],
    caption:
      'Modern Storage® Lowell at night — Northwest Arkansas boat, RV, and trailer storage near Beaver Lake.',
  },
  shackleford: {
    tagline: 'Little Rock metro · indoor RV bays',
    body:
      'Modern Storage® Shackleford at 3400 S Shackleford Rd in Little Rock offers indoor RV storage alongside outdoor parking for boats, vehicles, and trailers — a rare combination in central Arkansas. The indoor RV bays fit Class C motorhomes, smaller travel trailers, classic cars, and project vehicles that benefit from being out of the sun. Convenient to I-430 and I-630 for customers commuting from West Little Rock, Maumelle, and the western metro.',
    bestFor: [
      'Indoor RV storage for Class C and travel trailers',
      'Classic cars and project vehicles',
      'Boat-and-trailer outdoor parking',
    ],
    caption:
      'Indoor RV storage unit at Modern Storage® Shackleford in Little Rock.',
  },
  bentonville: {
    tagline: 'Northwest Arkansas · recreation and Beaver Lake',
    body:
      'Modern Storage® Bentonville stores boats, RVs, and vehicles for one of the most active recreation markets in the country. Customers park bass boats and pontoons headed for Beaver Lake, travel trailers for weekends in the Ozarks, mountain-bike rigs and gear trailers for the Slaughter Pen and Coler trail systems, and second vehicles that don’t fit in tight downtown garages. Climate-controlled household storage is on-site if you need both at one location.',
    bestFor: [
      'Boats and RVs heading to Beaver Lake',
      'Mountain-bike and gear trailers',
      'Second-vehicle parking for downtown residents',
    ],
    caption:
      'Modern Storage® Bentonville facility exterior — boat, RV, and vehicle storage for Northwest Arkansas recreation.',
  },
  springdale: {
    tagline: 'Northwest Arkansas · trailers, boats, work vehicles',
    body:
      'Modern Storage® Springdale supports Northwest Arkansas customers storing utility trailers, boats, work trucks, and seasonal vehicles between trips and jobs. The facility is positioned for easy access from US-412 and I-49 for customers heading to Beaver Lake, the White River, and the northern parts of the metro. Outdoor parking spaces are sized for single-axle and dual-axle trailers, mid-size boats, and full-size pickups.',
    bestFor: [
      'Utility and dual-axle trailers',
      'Mid-size boats and seasonal vehicles',
      'Work trucks and contractor rigs',
    ],
    caption:
      'Modern Storage® Springdale facility exterior with red sculpture in Northwest Arkansas.',
  },
  maumelle: {
    tagline: 'Lake Maumelle · budget-conscious boat storage',
    body:
      'Modern Storage® Maumelle Blvd at 9100 Maumelle Blvd in North Little Rock is the closest Modern Storage® location to Lake Maumelle, so customers can launch in the morning and have the boat back in storage the same afternoon. Outdoor parking and a Boat/RV Storage program make Maumelle Blvd a practical choice for central Arkansas customers looking for budget-conscious boat and RV storage without driving across the metro. Free moving truck participation makes household add-ons easier when you need both.',
    bestFor: [
      'Weekend Lake Maumelle boaters',
      'Budget-conscious outdoor boat and RV parking',
      'Customers combining household and boat storage',
    ],
    caption:
      'Modern Storage® Maumelle Blvd aerial view — Boat/RV storage close to Lake Maumelle.',
  },
  'hot-springs': {
    tagline: 'Lake Ouachita · weekend boating base',
    body:
      'Modern Storage® Hot Springs sits on the doorstep of Lake Ouachita — Arkansas’s largest lake — and is the natural home base for boats, ski rigs, and travel trailers that spend weekends on the water. Customers in the Hot Springs area, plus weekenders coming down from Little Rock, store boats on trailers, pontoons, and travel trailers for nearby campgrounds. Drive-up household storage is on the same site if you want to consolidate into one rental.',
    bestFor: [
      'Boats and ski rigs headed to Lake Ouachita',
      'Pontoons and travel trailers for nearby campgrounds',
      'Weekenders driving down from Little Rock',
    ],
    caption:
      'Modern Storage® Hot Springs facility exterior — boat and RV storage close to Lake Ouachita.',
  },
}

export const VEHICLE_TYPE_CARDS = [
  {
    type: 'Boat Storage',
    sub: 'Bass boats, ski boats, pontoons, fishing rigs',
    body:
      'Modern Storage® offers outdoor parking and select covered options for boats kept close to Arkansas lakes. Pull-through and back-in spaces at participating locations make trailer maneuvering easier between weekend trips, and on-site households often store fishing gear, coolers, and skis in an adjacent unit.',
    bullets: [
      'Outdoor parking and select covered options',
      'Pull-through and back-in spaces at participating sites',
      'Convenient to Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry',
      'Month-to-month — store seasonally or year-round',
    ],
    ctaLabel: 'Reserve Boat Storage',
    icon: 'boat',
  },
  {
    type: 'RV Storage',
    sub: 'Class A, Class C, travel trailers, fifth wheels',
    body:
      'Park motorhomes, travel trailers, and fifth wheels at Modern Storage® locations sized for larger rigs. Wide drive aisles and oversized spaces help with maneuvering, and indoor RV storage is available at select facilities including Modern Storage® Shackleford in Little Rock.',
    bullets: [
      'Oversized outdoor spaces for Class A and fifth wheels',
      'Indoor RV storage at select locations including Shackleford',
      'Wide drive aisles for easier maneuvering',
      'Gated, surveilled facilities with individual rentals',
    ],
    ctaLabel: 'Reserve RV Storage',
    icon: 'rv',
  },
  {
    type: 'Vehicle Storage',
    sub: 'Cars, trucks, work vans, trailers, motorcycles',
    body:
      'Daily drivers, project cars, work vans, utility trailers, and motorcycles all have a home at Modern Storage®. Vehicle storage is a good fit for households without a garage, snowbirds returning to Arkansas for the season, and contractors needing a secure place to stage equipment between jobs.',
    bullets: [
      'Outdoor parking for cars, trucks, and vans',
      'Trailer and equipment storage at participating sites',
      'Motorcycle storage indoors or outdoors',
      'Month-to-month — pause when the season ends',
    ],
    ctaLabel: 'Check Vehicle Storage Availability',
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

export const LAKE_WEEKEND_LOCATIONS = [
  { name: 'Modern Storage® Maumelle Blvd', detail: 'closest to Lake Maumelle for same-day launches' },
  { name: 'Modern Storage® Hot Springs', detail: 'doorstep of Lake Ouachita' },
  { name: 'Modern Storage® Lowell', detail: 'short run to Beaver Lake from NWA' },
  { name: 'Modern Storage® Bentonville', detail: 'Beaver Lake plus Ozarks recreation' },
] as const

export const LONG_TERM_RV_LOCATIONS = [
  { name: 'Modern Storage® Shackleford', detail: 'indoor RV storage in Little Rock' },
  { name: 'Modern Storage® Lowell', detail: 'oversized outdoor parking in NWA' },
  { name: 'Modern Storage® Bentonville', detail: 'NWA outdoor parking with climate-controlled household add-ons' },
  { name: 'Modern Storage® Maumelle Blvd', detail: 'central Arkansas Boat/RV program' },
] as const

export const CLASSIC_CAR_LOCATIONS = [
  { name: 'Modern Storage® Shackleford', detail: 'indoor bays for classic cars and project vehicles' },
  { name: 'Modern Storage® Bentonville', detail: 'climate-controlled household units for parts and accessories' },
  { name: 'Modern Storage® Riverdale', detail: 'climate-controlled mini-warehouse for restorers and collectors' },
] as const

export const BY_THE_NUMBERS = [
  { stat: '10', label: 'Arkansas locations' },
  { stat: '10,000+', label: 'Storage units across the state' },
  { stat: '3×', label: 'Best of the Best Self Storage winner (2023, 2024, 2025)' },
  { stat: 'Climate', label: 'Controlled options across most Modern Storage® facilities' },
  { stat: 'Central & NWA', label: 'Boat, RV, and vehicle storage from Hot Springs to Bentonville' },
] as const

export const BOAT_RV_FAQS = [
  {
    q: 'Can I store my RV year-round in Arkansas?',
    a: `Yes. Modern Storage® rents RV storage on a month-to-month basis at participating locations, so you can store year-round or pause between seasons. Outdoor parking is the most common option; indoor RV storage is available at select Modern Storage® locations including Modern Storage® Shackleford in Little Rock. Long-term RV storage works best when you confirm space size, access hours, and any electricity availability before move-in.`,
  },
  {
    q: 'What size storage do I need for a pontoon boat?',
    a: `Most pontoon boats fit comfortably in a 10x30 outdoor space at Modern Storage®, including the trailer tongue. Larger 24-foot-plus pontoons or tritoons can need a 10x40, especially with a tow vehicle parked alongside. Measure your trailer from the ball coupler to the rear of the motor, then add a few feet of buffer when you reserve.`,
  },
  {
    q: 'Do you offer covered RV parking near Bentonville?',
    a: `Covered and indoor RV options vary by Modern Storage® location and are limited where available. For Northwest Arkansas customers, Modern Storage® Bentonville and Modern Storage® Lowell both support boat and RV storage, and indoor RV storage is available at Modern Storage® Shackleford in Little Rock for customers willing to drive further. Call ahead to confirm covered availability before reserving.`,
  },
  {
    q: 'Is climate-controlled vehicle storage worth it in Arkansas heat?',
    a: `For daily drivers, no — outdoor parking is usually fine. For classic cars, convertibles, restoration projects, and collector vehicles you plan to keep long term, an indoor or climate-stable environment helps protect paint, interiors, rubber seals, and electronics from Arkansas summer heat and humidity. Indoor RV bays at Modern Storage® Shackleford are the closest equivalent for vehicles, and climate-controlled household units can hold parts, accessories, and racing gear.`,
  },
  {
    q: 'Can I store a trailer, motorcycle, or classic car?',
    a: `Yes. Modern Storage® supports utility trailers, dual-axle trailers, motorcycles, cars, trucks, work vans, and classic vehicles at participating locations. Motorcycles can be stored indoors at locations with appropriate unit sizes; trailers and full-size vehicles typically use outdoor parking. The right Modern Storage® location depends on your rig size and how often you need to pull it out.`,
  },
  {
    q: 'Which Modern Storage® locations offer boat and RV storage?',
    a: `Modern Storage® offers boat, RV, and vehicle storage at Modern Storage® Lowell, Shackleford, Bentonville, Springdale, Maumelle Blvd, and Hot Springs. Customers near Beaver Lake favor Lowell, Bentonville, and Springdale. Central Arkansas customers favor Shackleford and Maumelle Blvd. Hot Springs customers and Little Rock weekenders headed to Lake Ouachita store at Modern Storage® Hot Springs.`,
  },
  {
    q: 'Can I access my boat or RV on weekends?',
    a: `Yes. Access hours vary by Modern Storage® location, but every featured boat and RV location supports weekend access during posted hours, and several offer extended hours for early-morning launches and late-night returns from the lake. Confirm specific access hours with the Modern Storage® location you plan to reserve with.`,
  },
  {
    q: 'How do I reserve boat or RV storage?',
    a: `Reserve online from any Modern Storage® location page in just a few minutes — choose the location nearest your lake or route, select the space size that fits your rig, and confirm. Customers who would rather talk through options can call the centralized Modern Storage® line at 501-910-0096 and the team will recommend the right facility based on your boat, RV, or vehicle.`,
  },
] as const
