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

// How the truck works — five short steps so customers know exactly what to
// expect on move-in day. No fabricated specifics: language hedges anything
// that varies by location.
export const HOW_IT_WORKS = [
  {
    n: '1',
    t: 'Reserve your storage unit',
    b: 'Reserve a Modern Storage® unit online or by phone at any of our 10 Arkansas locations. Mention you plan to use the free moving truck so the team can schedule it for your move-in day.',
  },
  {
    n: '2',
    t: 'Confirm truck availability for your date',
    b: 'Trucks are first-come, first-served and book up quickly during peak moving weekends. Lock in a date as soon as your reservation is set so the truck is ready when you arrive.',
  },
  {
    n: '3',
    t: 'Pick up the truck at the facility',
    b: 'Bring a valid driver’s license and proof of personal auto insurance. We just need to verify your insurance covers use of the moving truck before you drive. Most customers are on the road within 15 minutes.',
  },
  {
    n: '4',
    t: 'Load, drive, unload',
    b: 'Move your furniture, appliances, mattresses, and boxes from your home directly to your storage unit. Most moves are a single trip — local distances make the math easy.',
  },
  {
    n: '5',
    t: 'Return the truck the same day',
    b: 'We send the truck out with a full tank of gas. Return it the same day with a full tank, and you only pay for the fuel you used along the way. The team confirms mileage at return and your storage rental is fully set up.',
  },
] as const

export const TRUCK_DETAILS = [
  {
    title: 'Reservation requirements',
    body:
      'A free moving truck is included with new storage rentals at all 10 Modern Storage® Arkansas locations. Customers complete a storage unit reservation before booking the truck, and the truck date is tied to your move-in day.',
  },
  {
    title: 'Driver & insurance',
    body:
      'Bring a valid driver’s license and proof of personal auto insurance when you pick up the truck. We just need to verify your insurance covers use of the moving truck before you drive. Some locations may require the driver to be 21 or older — confirm with the Modern Storage® location you reserved with.',
  },
  {
    title: 'Fuel policy',
    body:
      'We send the truck out with a full tank of gas. Return it with a full tank, and you only pay for the fuel you used. No fuel surcharges, no refueling fees — just pay the pump on your way back.',
  },
  {
    title: 'Mileage and use',
    body:
      'A daily mileage allowance is included with the free truck for local moves. Mileage limits and overage rates vary by location and truck size — the team will walk you through the exact terms before you sign.',
  },
  {
    title: 'Verification & approval',
    body:
      'Truck use is subject to verification and approval. Free moving truck use is available to qualifying customers and is subject to location availability, reservation confirmation, valid driver’s license, proof of insurance, account status, and completion of any required rental paperwork. Modern Storage® reserves the right to deny or cancel truck use if any information cannot be verified or if the customer does not meet truck-use requirements.',
  },
  {
    title: 'Availability',
    body:
      'Trucks are limited and reserved on a first-come, first-served basis. Friday afternoons, weekends, and the first and last weekends of the month book up first. Reserving your storage unit and truck several days ahead is the easiest way to lock in your move-in date.',
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
    a: `Yes. Modern Storage® includes a free moving truck with new storage unit rentals at all 10 Arkansas locations. There is no rental fee for the truck itself when it is used to move into your Modern Storage® unit. We provide the truck with a full tank of gas — return it with a full tank and you only pay for the fuel you used. Mileage allowance and driver requirements vary by location, and the team walks you through the exact terms when you reserve.`,
  },
  {
    q: 'Which Modern Storage® locations offer the free moving truck?',
    a: `All 10 Modern Storage® Arkansas locations participate in the free moving truck program: West Little Rock, Shackleford, Riverdale, North Little Rock, Maumelle Blvd, Bryant, Hot Springs, Bentonville, Springdale, and Lowell. Truck availability rotates by location and demand. Call 501-910-0096 or check with the location nearest you to confirm a truck is available for your move-in date.`,
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
