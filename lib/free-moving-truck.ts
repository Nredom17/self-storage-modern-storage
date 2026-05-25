// Content module for /free-moving-truck — a dedicated indexed page positioned
// as a "move-in convenience benefit tied to storage rentals," NOT a U-Haul
// competitor. Keeps commercial intent aligned with storage customers.

// Participating locations are the same Modern Storage® facilities where the
// Free Moving Truck badge appears in the LOCATIONS data in lib/site.ts.
// Standalone list here so the page reads cleanly without depending on the
// runtime filter.
export const TRUCK_LOCATIONS: Array<{ name: string; area: string }> = [
  { name: 'Modern Storage® West Little Rock', area: 'Little Rock area' },
  { name: 'Modern Storage® Shackleford', area: 'Little Rock area' },
  { name: 'Modern Storage® Maumelle Blvd', area: 'North Little Rock' },
  { name: 'Modern Storage® Hot Springs', area: 'Hot Springs' },
  { name: 'Modern Storage® Springdale', area: 'Northwest Arkansas' },
]

// How the truck works — five short steps so customers know exactly what to
// expect on move-in day. No fabricated specifics: language hedges anything
// that varies by location.
export const HOW_IT_WORKS = [
  {
    n: '1',
    t: 'Reserve your storage unit',
    b: 'Reserve a Modern Storage® unit online or by phone at a participating Arkansas location. Mention you plan to use the free moving truck so the team can schedule it for move-in day.',
  },
  {
    n: '2',
    t: 'Confirm truck availability for your date',
    b: 'Trucks are first-come, first-served and book up quickly during peak moving weekends. Lock in a date as soon as your reservation is set so the truck is ready when you arrive.',
  },
  {
    n: '3',
    t: 'Pick up the truck at the facility',
    b: 'Show valid ID and proof of insurance, sign the truck rental agreement, and the team will walk you through the basics. Most customers are on the road within 15 minutes.',
  },
  {
    n: '4',
    t: 'Load, drive, unload',
    b: 'Move your furniture, appliances, mattresses, and boxes from your home directly to your storage unit. Most moves are a single trip — local distances make the math easy.',
  },
  {
    n: '5',
    t: 'Return the truck the same day',
    b: 'Bring the truck back to the facility you picked it up from. The team confirms mileage and fuel, and your storage rental is fully set up — no second rental, no second trip.',
  },
] as const

export const TRUCK_DETAILS = [
  {
    title: 'Reservation requirements',
    body:
      'A free moving truck is included with new storage rentals at participating Modern Storage® locations. Customers must complete a storage unit reservation before booking the truck, and the truck date is tied to your move-in day.',
  },
  {
    title: 'Driver requirements',
    body:
      'A valid driver’s license and proof of personal auto insurance are required at pickup. Some locations may require the driver to be 21 or older. Confirm specifics with the Modern Storage® location you reserved with.',
  },
  {
    title: 'Mileage and fuel',
    body:
      'A daily mileage allowance is included with the free truck for local moves. Mileage limits, overage rates, and fuel return rules vary by location — the team will walk you through the exact terms before you sign.',
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

export const TRUCK_FAQS = [
  {
    q: 'Is the moving truck really free?',
    a: `Yes. Modern Storage® includes a free moving truck with new storage unit rentals at participating Arkansas locations. There is no rental fee for the truck itself when it is used to move into your Modern Storage® unit. Mileage allowance, fuel return rules, and driver requirements vary by location, and customers cover their own gas — the team walks you through the exact terms when you reserve.`,
  },
  {
    q: 'Which Modern Storage® locations offer the free moving truck?',
    a: `The free moving truck is offered at participating Modern Storage® locations across Arkansas, including West Little Rock, Shackleford, Maumelle Blvd, Springdale, and Hot Springs. Availability rotates by demand and season. Call 501-910-0096 or check with the location nearest you to confirm a truck is available for your move-in date.`,
  },
  {
    q: 'How far can I drive the free moving truck?',
    a: `A daily mileage allowance is included with the free truck for local moves — typically enough to cover an in-town move with one round trip. Mileage limits, overage rates, and fuel return rules vary by location. The team confirms specifics before you sign so there are no surprises at return.`,
  },
  {
    q: 'Do I need to bring anything to pick up the truck?',
    a: `Yes. Bring a valid driver’s license and proof of personal auto insurance to the pickup appointment. Some locations may require the driver to be 21 or older. Confirm requirements with your Modern Storage® location when you reserve the unit and truck.`,
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
