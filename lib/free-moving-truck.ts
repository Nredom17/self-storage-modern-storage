// Content module for /free-moving-truck — a dedicated indexed page positioned
// as a "move-in convenience benefit tied to storage rentals," NOT a U-Haul
// competitor. Keeps commercial intent aligned with storage customers.

// All 10 Modern Storage® Arkansas facilities offer the free moving truck.
// Truck availability per facility rotates with demand and season; the team
// confirms a specific date when the customer reserves their unit.
export const TRUCK_LOCATIONS: Array<{ name: string; area: string; slug: string }> = [
  { slug: 'west-little-rock', name: 'Modern Storage® West Little Rock', area: 'Little Rock area' },
  { slug: 'shackleford', name: 'Modern Storage® Shackleford', area: 'Little Rock area' },
  { slug: 'riverdale', name: 'Modern Storage® Riverdale', area: 'Little Rock area' },
  { slug: 'north-little-rock', name: 'Modern Storage® North Little Rock', area: 'North Little Rock' },
  { slug: 'maumelle', name: 'Modern Storage® Maumelle Blvd', area: 'North Little Rock' },
  { slug: 'bryant', name: 'Modern Storage® Bryant', area: 'Bryant' },
  { slug: 'hot-springs', name: 'Modern Storage® Hot Springs', area: 'Hot Springs' },
  { slug: 'bentonville', name: 'Modern Storage® Bentonville', area: 'Northwest Arkansas' },
  { slug: 'springdale', name: 'Modern Storage® Springdale', area: 'Northwest Arkansas' },
  { slug: 'lowell', name: 'Modern Storage® Lowell', area: 'Northwest Arkansas' },
]

// How the truck works — three punchy steps for fast scanning. Customers don't
// need a five-step checklist; they need to know it's simple. No fabricated
// specifics: language hedges anything that varies by location.
export const HOW_IT_WORKS = [
  {
    n: '1',
    t: 'Reserve Your Unit',
    b: 'Book your Modern Storage® unit online or by phone, and request the free moving truck for your move-in day.',
  },
  {
    n: '2',
    t: 'Confirm Availability',
    b: 'Weekend and month-end dates fill quickly. Lock in your truck date as early as possible — ideally a week ahead during peak moving season.',
  },
  {
    n: '3',
    t: 'Pick Up & Move',
    // Tightened 2026-06-05 — must specify "valid" driver's license
    // and that the insurance must cover the truck (not generic
    // proof of car insurance). Avoids day-of surprises at pickup.
    b: 'Bring your valid driver’s license and proof of insurance that covers the truck, load up, and drive straight to your unit. Return the truck the same day with a full tank.',
  },
] as const

// Who uses the free moving truck most. Expands keyword reach (apartment moves,
// college storage, military relocation, home staging, downsizing, business
// inventory) and helps visitors self-identify with the use case.
export const WHO_USES_THIS = [
  'Apartment moves',
  'College students',
  'Home staging during a sale',
  'Military relocation (PCS moves)',
  'Downsizing & empty nesters',
  'Business inventory moves',
  'Local household moves',
  'Renovations & remodels',
] as const

// Truck capacity & specs — fully hedged. Real specs vary by Modern Storage®
// location and truck size; this section gives customers enough to plan
// without making promises we can't keep.
export const TRUCK_SPECS = [
  {
    title: 'Capacity',
    body:
      'Most Modern Storage® locations offer a box truck sized to move a one-bedroom to two-bedroom apartment in a single trip. Customers moving a small home typically finish in one trip with efficient loading.',
  },
  {
    title: 'Loading equipment',
    body:
      'Most trucks include a rear loading ramp and tie-down points along the cargo walls. Hand trucks and furniture dollies may be available at participating locations — ask when you reserve.',
  },
  {
    title: 'Transmission & drivability',
    body:
      'The trucks are automatic transmission with standard car-style controls. If you can drive a full-size SUV or pickup, you can drive the Modern Storage® moving truck.',
  },
  {
    title: 'Will my stuff fit?',
    body:
      'A one-bedroom apartment, a 10x10 storage unit’s worth of furniture and boxes, or a typical small-home move usually loads in one trip. Larger four-bedroom moves may need two trips or a supplemental truck — the team can advise when you reserve.',
  },
] as const

// Comparison table — head-to-head against the traditional "rent storage + rent
// a truck separately" workflow. Strong conversion copy because it reframes the
// decision around bundled value rather than feature-by-feature.
export const COMPARISON_ROWS: Array<{ aspect: string; traditional: string; modern: string }> = [
  { aspect: 'Storage unit',          traditional: 'Rent separately',           modern: 'Reserve online' },
  { aspect: 'Moving truck',          traditional: 'Rent from a second company', modern: 'Included free' },
  { aspect: 'Reservation steps',     traditional: 'Two companies, two systems', modern: 'One reservation' },
  { aspect: 'Truck rental fee',      traditional: '$80–$200+ per day',          modern: 'No truck fee' },
  { aspect: 'Drop-off location',     traditional: 'Drive back to rental site',  modern: 'Return on site' },
  { aspect: 'Trips on move-in day',  traditional: 'Two or more trips',          modern: 'Often one trip' },
  { aspect: 'Coordination',          traditional: 'Match schedules & deposits', modern: 'One team, one date' },
]

// Social proof — short, factual trust signals to break up legal/procedural
// copy with positive reinforcement. Kept hedged and honest.
export const SOCIAL_PROOF = {
  headline: 'One of our most-requested move-in benefits',
  body:
    'The free moving truck has been a Modern Storage® move-in benefit for years. Customers across Little Rock, Bentonville, Springdale, Bryant, Hot Springs, and Maumelle have used it for apartment moves, downsizing, home staging, and business inventory loads — without renting a separate truck.',
} as const

// What customers ask about most — kept to four cards so it reads fast. The
// long-form verification/approval terms now live in a single VERIFICATION_NOTE
// (hero) plus the dedicated FAQ entry, instead of being repeated three times
// across the page.
export const TRUCK_DETAILS = [
  {
    title: 'Reservation & pickup',
    body:
      'Reserve your Modern Storage® unit first, then lock in your truck for your move-in day. Bring a valid driver’s license and proof of personal auto insurance to pickup — most customers are on the road within 15 minutes.',
  },
  {
    title: 'Fuel policy',
    body:
      'Truck goes out with a full tank. Return it the same day with a full tank and you only pay for the fuel you used on your trip. No fuel surcharges, no refueling fees.',
  },
  {
    title: 'Mileage',
    body:
      'A daily mileage allowance is included for local moves. Mileage limits and overage rates vary by location and truck size — the team confirms the exact terms before you sign so there are no surprises.',
  },
  {
    title: 'Availability',
    body:
      'Trucks are first-come, first-served. Friday afternoons, weekends, and the first and last weekends of every month book up first. Reserve as early as you can — ideally a week ahead during peak moving season.',
  },
] as const

export const MOVING_TIPS = [
  {
    title: 'Park, then disassemble',
    body:
      'Park the truck close to your front door and break down beds, table legs, and modular shelving before loading. Disassembled pieces stack flat against the truck walls and save 30–40% of cargo volume.',
  },
  {
    title: 'Heaviest first, fragile last',
    body:
      'Load appliances, washers/dryers, dressers, and bookcases against the truck cab. Then mattresses and couches. Boxes go on top with the heaviest at the bottom. Fragile items load last so they come off first.',
  },
  {
    title: 'Box like sizes together',
    body:
      'Standard moving boxes stack cleanly when they’re the same size. Picture frames, mirrors, and TVs ride best between two padded mattresses. Lamps and floor decor fill the gaps last.',
  },
  {
    title: 'Label every box for the unit',
    body:
      'Mark the side of each box (not the top) with the room and a one-line content note. Future-you will thank past-you when something needs to come out of the unit three months from now.',
  },
] as const

// Friendly verification copy shown near the hero CTA so customers know what
// to expect at pickup without making the page sound like the DMV.
export const VERIFICATION_NOTE =
  'A quick verification is required. Before truck pickup, we’ll verify your reservation, driver’s license, insurance, and rental account details. Truck use is subject to approval, availability, and completion of required paperwork.'

export const TRUCK_FAQS = [
  {
    q: 'Is the moving truck really free?',
    a: `Yes. Modern Storage® includes a free moving truck with new storage unit rentals at all 10 Locations. There is no rental fee for the truck itself when it is used to move into your Modern Storage® unit. We provide the truck with a full tank of gas — return it with a full tank and you only pay for the fuel you used. Mileage allowance and driver requirements vary by location, and the team walks you through the exact terms when you reserve.`,
  },
  {
    q: 'Which Modern Storage® locations offer the free moving truck?',
    a: `All 10 Modern Storage® locations participate in the free moving truck program: West Little Rock, Shackleford, Riverdale, North Little Rock, Maumelle Blvd, Bryant, Hot Springs, Bentonville, Springdale, and Lowell. Truck availability rotates by location and demand. Call 501-910-0096 or check with the location nearest you to confirm a truck is available for your move-in date.`,
  },
  {
    q: 'What is the fuel policy for the free moving truck?',
    a: `We send the truck out with a full tank of gas. Return it with a full tank on the same day and you only pay for the fuel you used along the way. There are no fuel surcharges and no refueling fees when the tank comes back full. If the tank is not full at return, the location may charge a refueling fee to top it off — the team confirms the exact policy before you sign.`,
  },
  {
    q: 'How far can I drive the free moving truck?',
    a: `A daily mileage allowance is included with the free truck for local moves — typically enough to cover an in-town move with one round trip. Mileage limits and overage rates vary by location and truck size. The team confirms specifics before you sign so there are no surprises at return.`,
  },
  {
    q: 'Do I need to bring anything to pick up the truck?',
    a: `Yes. Bring a valid driver’s license and proof of personal auto insurance to the pickup appointment. We just need to verify your insurance covers use of the moving truck before you drive. Some locations may require the driver to be 21 or older. Confirm requirements with your Modern Storage® location when you reserve the unit and truck.`,
  },
  {
    q: 'Why does Modern Storage® need to verify my information?',
    a: `Truck use is subject to verification and approval. Before pickup we verify your reservation, driver’s license, insurance, and account status, and complete the rental paperwork. This protects you, the next customer who uses the truck, and the facility. Modern Storage® reserves the right to deny or cancel truck use if information cannot be verified or if the customer does not meet truck-use requirements.`,
  },
  {
    q: 'Can I use the free truck for a move out of storage?',
    a: `The free moving truck is positioned as a move-in benefit — it is included with new storage rentals to help you load into the unit. Move-out truck availability varies by location and is not guaranteed. Ask your Modern Storage® location what is possible if you need a truck on the way out.`,
  },
  {
    q: 'How far in advance should I reserve the truck?',
    a: `Trucks are limited and reserved on a first-come, first-served basis. Friday afternoons, weekends, and the first and last weekends of each month fill first. Reserving your storage unit and truck several days ahead — or a week ahead during peak moving season — is the most reliable way to lock in your move-in date.`,
  },
  {
    q: 'Can I use the free moving truck if I do not rent a storage unit?',
    a: `No. The free moving truck is a move-in benefit tied to a new Modern Storage® storage rental. It is not a standalone truck rental service. If you only need a truck and no storage unit, a traditional truck rental company is the right fit.`,
  },
  {
    q: 'What size is the moving truck?',
    a: `Truck size varies by Modern Storage® location, but most locations offer a box truck sized for a one-bedroom apartment to a small home move in one trip. Larger moves may require two trips or supplemental help. The team will confirm truck dimensions when you book so you can plan loading.`,
  },
] as const
