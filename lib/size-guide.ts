// Content module for the dedicated /size-guide page. Richer than the brief
// UNIT_SIZES list in lib/site.ts — adds square footage, room equivalents,
// what-fits bullet lists, and common use cases per size so the page works as
// an SEO target for "5x5 storage", "10x10 storage", "what size storage unit
// do I need", etc.

export const SIZE_GUIDE_UNITS = [
  {
    size: '5x5',
    sizeSlug: '5x5',
    label: '5x5 storage unit',
    sqft: '25 sq ft',
    roomEquivalent: 'Walk-in closet',
    bestFor: 'Boxes, seasonal items, and closet overflow',
    fits: [
      'Up to 25 standard moving boxes',
      'Holiday decorations and seasonal bins',
      'A small dresser or nightstand',
      'Photo albums, documents, suitcases',
      'Sporting equipment and small tools',
    ],
    useCases: [
      'Apartment renters with too much closet stuff',
      'College students storing between semesters',
      'Document and photo archives',
      'Seasonal sports / hobby gear',
    ],
  },
  {
    size: '5x10',
    sizeSlug: '5x10',
    label: '5x10 storage unit',
    sqft: '50 sq ft',
    roomEquivalent: 'Studio apartment or single room',
    bestFor: 'A single room of furniture or studio contents',
    fits: [
      'Mattress set and small sofa',
      'Dresser, nightstand, and chairs',
      'Up to 40 boxes',
      'Bicycle, kayak, or sports equipment',
      'Small office furniture',
    ],
    useCases: [
      'Studio apartment between leases',
      'Single bedroom of furniture',
      'Small business inventory overflow',
      'College storage with furniture',
    ],
  },
  {
    size: '10x10',
    sizeSlug: '10x10',
    label: '10x10 storage unit',
    sqft: '100 sq ft',
    roomEquivalent: 'One-bedroom apartment',
    bestFor: 'A full one-bedroom apartment',
    fits: [
      'Queen bedroom set',
      'Living room set (couch, chair, coffee table)',
      'Major appliance (washer, dryer, or refrigerator)',
      '15–20 standard moving boxes',
      'A flat-screen TV and office equipment',
    ],
    useCases: [
      'One-bedroom apartment move',
      'Downsizing from a larger home',
      'Renovation overflow',
      'Small business records + furniture',
    ],
  },
  {
    size: '10x15',
    sizeSlug: '10x15',
    label: '10x15 storage unit',
    sqft: '150 sq ft',
    roomEquivalent: 'Two-bedroom apartment or small home',
    bestFor: 'A two-bedroom apartment or small home',
    fits: [
      'Multiple bedroom sets',
      'Living, dining, and bedroom furniture',
      'Major appliances and patio furniture',
      'Holiday decor and seasonal storage',
      '30–50 boxes',
    ],
    useCases: [
      'Two-bedroom apartment move',
      'Family downsizing',
      'Mid-size renovation',
      'Business inventory and equipment',
    ],
  },
  {
    size: '10x20',
    sizeSlug: '10x20',
    label: '10x20 storage unit',
    sqft: '200 sq ft',
    roomEquivalent: 'Three-bedroom home',
    bestFor: 'A three-bedroom home or one-car garage',
    fits: [
      'Full living, dining, and three bedroom sets',
      'Refrigerator, washer, dryer, and major appliances',
      'Garage contents (tools, lawn equipment)',
      'Patio furniture and bicycles',
      'Up to 75 boxes',
    ],
    useCases: [
      'Three-bedroom home move',
      'Whole-home renovation',
      'Military PCS moves',
      'Significant business inventory',
    ],
  },
  {
    size: '10x30',
    sizeSlug: '10x30',
    label: '10x30 storage unit',
    sqft: '300 sq ft',
    roomEquivalent: 'Four to five bedroom home or two-car garage',
    bestFor: 'A large home or significant business inventory',
    fits: [
      'Four to five bedrooms of furniture',
      'Large appliance sets and patio furniture',
      'Whole-garage contents and tools',
      'Contractor or trade equipment',
      'E-commerce inventory and pallets',
    ],
    useCases: [
      'Large-home moves',
      'Estate storage',
      'Contractor and trade equipment',
      'E-commerce inventory and small warehouse needs',
    ],
  },
] as const

export const SIZE_GUIDE_FAQS = [
  {
    q: 'What size storage unit do I need?',
    a: `The right storage unit size depends on what you plan to store and how it's organized. A 5x5 storage unit works for boxes, seasonal items, and closet overflow. A 10x10 storage unit fits a one-bedroom apartment. A 10x20 storage unit holds a three-bedroom home, and a 10x30 storage unit handles a large home or business inventory. If you're between sizes, choosing the larger size gives more breathing room for getting items in and out.`,
  },
  {
    q: 'What fits in a 5x5 storage unit?',
    a: `A 5x5 storage unit is roughly the size of a walk-in closet (25 square feet). It holds about 25 standard moving boxes, seasonal decorations, a small dresser, photo albums, documents, and small sporting equipment. It's the right call for apartment renters with extra stuff, college students between semesters, and document or photo archives.`,
  },
  {
    q: 'What fits in a 10x10 storage unit?',
    a: `A 10x10 storage unit is 100 square feet — enough for the contents of a one-bedroom apartment. It typically holds a queen bedroom set, a living room set, a major appliance, 15 to 20 boxes, and a flat-screen TV. It's the most popular size at Modern Storage® because it balances space and price for most household moves and downsizing situations.`,
  },
  {
    q: 'What fits in a 10x20 storage unit?',
    a: `A 10x20 storage unit is 200 square feet — equivalent to a one-car garage. It fits the contents of a three-bedroom home: full living, dining, and three bedroom sets, major appliances, garage contents and tools, patio furniture, and up to 75 boxes. It's a common pick for three-bedroom home moves, whole-home renovations, and military PCS moves.`,
  },
  {
    q: 'Can I store a vehicle in a storage unit?',
    a: `Yes, at select Modern Storage® locations. A 10x20 storage unit fits a smaller car or motorcycle. A 10x30 storage unit can accommodate a larger vehicle, a small boat, or a trailer. For RV and boat storage specifically, see the Boat & RV Storage page — five Modern Storage® locations (Lowell, Shackleford, Bentonville, Springdale, Maumelle) offer outdoor and covered vehicle parking sized for longer rigs.`,
  },
  {
    q: 'What if I pick the wrong storage unit size?',
    a: `It happens often — and it's an easy fix. Modern Storage® rentals are month-to-month, so if a 5x10 turns out too small, you can move up to a 10x10 at the same facility without breaking a contract. Use the AI Size Finder tool on this site for a personalized recommendation, or call the local Modern Storage® team and we'll help size you right the first time.`,
  },
  {
    q: 'Are climate-controlled units available in every size?',
    a: `Every Modern Storage® location offers climate-controlled units in 5x5 through 10x20 sizes, with 10x30 availability varying by facility. Climate-controlled storage keeps temperature and humidity more stable than an outdoor unit — the right call for furniture, electronics, documents, photos, art, and instruments. See the Climate-Controlled Storage page for the full breakdown.`,
  },
  // ── Comparison-style entries (size vs size) ──────────────────────────
  // Skipped "Which Storage Unit Size Do I Need?" — same topic as the
  // existing "What size storage unit do I need?" entry above.
  {
    q: '5x5 vs 5x10 Storage Unit — which is right for me?',
    a: `A 5x5 storage unit offers 25 square feet of space and is ideal for boxes, seasonal decorations, small furniture, or business records. A 5x10 doubles the storage area to 50 square feet and can hold the contents of a small bedroom, including a mattress set, dresser, and multiple boxes. If you're storing more than a few items or need room to access belongings, a 5x10 is often worth the extra space.`,
  },
  {
    q: '5x10 vs 10x10 Storage Unit — which is right for me?',
    a: `A 5x10 unit provides 50 square feet, while a 10x10 provides 100 square feet. A 10x10 can typically hold the contents of a one-bedroom apartment, making it a popular choice during moves. If you're storing furniture from multiple rooms, the 10x10 offers significantly more flexibility.`,
  },
  {
    q: '10x10 vs 10x15 Storage Unit — which is right for me?',
    a: `A 10x15 storage unit provides 50% more space than a 10x10. While a 10x10 works well for a one-bedroom home, a 10x15 is often better for a two-bedroom home, larger furniture sets, appliances, and business inventory.`,
  },
  {
    q: '10x15 vs 10x20 Storage Unit — which is right for me?',
    a: `A 10x20 storage unit can often hold the contents of a three-bedroom house, including large appliances and multiple furniture sets. A 10x15 is a strong middle-ground option for families that need extra storage without paying for unused space.`,
  },
  {
    q: '10x20 vs 10x30 Storage Unit — which is right for me?',
    a: `A 10x30 unit offers 300 square feet of storage and is often used for large household moves, commercial inventory, or vehicle storage. A 10x20 works well for most residential storage needs, while a 10x30 is ideal for major transitions or business use.`,
  },
  {
    q: '5x5 vs 10x10 Storage Unit — what is the difference?',
    a: `The difference is substantial. A 5x5 is similar to a small closet, while a 10x10 is roughly the size of half a standard garage. If you're storing furniture, appliances, or an entire room's contents, a 10x10 is usually the better choice.`,
  },
  {
    q: '10x10 vs 10x20 Storage Unit — what is the difference?',
    a: `A 10x20 provides twice the floor space of a 10x10. While a 10x10 is suitable for apartment storage, a 10x20 can accommodate the contents of a multi-bedroom home, making it a common choice during relocations.`,
  },
  {
    q: 'Small vs large storage unit — how do I choose?',
    a: `Small storage units are ideal for seasonal items, boxes, and a few pieces of furniture. Large storage units work better for household moves, business inventory, vehicles, and long-term storage. Choosing the right size helps avoid paying for unused space.`,
  },
  {
    q: 'Climate-Controlled 10x10 vs Standard 10x10 — what is the difference?',
    a: `Both units provide the same amount of space, but climate-controlled storage maintains more stable temperatures and humidity levels. If you're storing electronics, wooden furniture, antiques, documents, or collectibles, climate-controlled storage provides additional protection.`,
  },
] as const
