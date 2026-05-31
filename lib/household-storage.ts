// Content module for /household-storage. Positioned as the PRIMARY residential
// storage category page — moving, renovating, downsizing, life transitions,
// temporary/short-term storage. Climate-controlled is one available option,
// not a core identity (that's /climate-controlled's job).

export const HOUSEHOLD_UNIT_SIZES = [
  {
    size: '5x5',
    sizeSlug: '5x5',
    image: '/images/modern-storage-5x5-climate-controlled-unit.png',
    alt: 'Modern Storage® 5x5 household storage unit for closet overflow, seasonal items, and apartment storage',
    bestFor: 'Closet overflow & seasonal',
    fits: [
      'Holiday decor and seasonal bins',
      'Boxes of clothing, books, and toys',
      'A small dresser or end tables',
      'Photo albums and keepsakes',
    ],
    moveNote:
      'Right-sized for renters topping up an apartment closet, or families tucking away off-season decor without crowding the garage.',
  },
  {
    size: '5x10',
    sizeSlug: '5x10',
    image: '/images/modern-storage-5x10-climate-controlled-unit.png',
    alt: 'Modern Storage® 5x10 household storage unit sized for a studio apartment or single bedroom',
    bestFor: 'Studio or single bedroom',
    fits: [
      'Mattress set and small couch',
      'Dresser, nightstand, and chairs',
      '10–15 standard moving boxes',
      'Bikes, sports gear, or a desk',
    ],
    moveNote:
      'A favorite for college storage between semesters, downsizers, and renters who need a single room of overflow space.',
  },
  {
    size: '10x10',
    sizeSlug: '10x10',
    image: '/images/modern-storage-10x10-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x10 household storage unit sized for a one-bedroom apartment move',
    bestFor: 'One-bedroom apartment',
    fits: [
      'Bedroom and living room sets',
      'Major appliance or TV',
      '15–20 moving boxes',
      'Office desk and a filing cabinet',
    ],
    moveNote:
      'The most-requested household size — fits a full one-bedroom apartment with room to walk inside the unit.',
  },
  {
    size: '10x15',
    sizeSlug: '10x15',
    image: '/images/modern-storage-10x15-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x15 household storage unit sized for a two-bedroom home or renovation',
    bestFor: 'Two-bedroom home',
    fits: [
      'Multiple bedroom sets',
      'Couch, recliner, and dining set',
      'Major appliances and patio furniture',
      'Holiday decor and stacked bins',
    ],
    moveNote:
      'A common pick for families renovating one wing of the house or relocating from a two-bedroom rental.',
  },
  {
    size: '10x20',
    sizeSlug: '10x20',
    image: '/images/modern-storage-10x20-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x20 household storage unit sized for a three-bedroom home or whole-home move',
    bestFor: 'Three-bedroom home',
    fits: [
      'Full living, dining, and bedroom sets',
      'Refrigerator, washer, and dryer',
      'Garage contents and tools',
      'Boxes from a whole-home move',
    ],
    moveNote:
      'Whole-home volume for families between houses, military PCS moves, or full kitchen renovations.',
  },
  {
    size: '10x30',
    sizeSlug: '10x30',
    image: '/images/modern-storage-10x30-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x30 household storage unit sized for a four to five bedroom whole-home move',
    bestFor: 'Four to five bedrooms',
    fits: [
      'Whole-home moves with garage',
      'Estate downsizes and inheritances',
      'Restoration crew jobsite overflow',
      'Two-household combine-and-store',
    ],
    moveNote:
      'Availability varies by location. Best for whole-home moves, blended-family combines, and major estate clear-outs.',
  },
] as const

// Life transitions — the EMOTIONAL why behind household storage. Heavy on
// transitional and temporary-storage language (bridge the gap, create extra
// space, free up the garage, simplify the move). Auditor flagged that the page
// was too practical and not emotionally resonant.
export const LIFE_TRANSITIONS = [
  {
    title: 'Moving',
    body:
      'Bridge the gap between move-out and move-in. Temporary storage during a move means you can take your time finding the right place — without rushing decisions or stacking boxes in a friend\'s garage. Free moving truck with new rentals at participating locations.',
    icon: 'truck',
  },
  {
    title: 'Renovating',
    body:
      'Store furniture safely during a kitchen, bath, or whole-home renovation. Parking your belongings in a Modern Storage® unit protects them from dust, paint, and contractor traffic — and gives your crew room to actually work. Close out the unit when the project wraps.',
    icon: 'tools',
  },
  {
    title: 'Downsizing',
    body:
      'Empty nesters, right-sizing families, and combined households can keep heirlooms, holiday decor, and seasonal pieces close by without crowding the new place. Create extra space at home without making permanent decisions about what to part with.',
    icon: 'home',
  },
  {
    title: 'Growing family',
    body:
      'Make room for a nursery or a teenager moving back home. Store the guest-room set, the home office, or out-of-season gear so the house can flex with the people inside it.',
    icon: 'family',
  },
  {
    title: 'Life transition',
    body:
      'Marriage, divorce, college, deployment, estate handling, or simply a season of in-between. Modern Storage® month-to-month rentals adjust as your timeline shifts — so storage stays one less thing to worry about.',
    icon: 'heart',
  },
  {
    title: 'Everyday extra space',
    body:
      'Patio furniture, holiday decor, winter coats, hunting gear, and yard equipment. Rotate seasonal items through a small Modern Storage® unit to free up garage, attic, and closet space at home.',
    icon: 'sun',
  },
] as const

// Why Choose Modern Storage® — differentiator section that the auditor said
// was missing entirely. Eight short benefit cards covering month-to-month,
// multiple locations, drive-up, online reservations, free truck, climate
// available, clean facilities, flexible sizing.
export const WHY_CHOOSE_MODERN = [
  {
    title: 'Month-to-month rentals',
    body:
      'No long-term contracts. Pay for the storage you need, for as long as you need it, and close out whenever your situation changes.',
  },
  {
    title: '10 convenient locations',
    body:
      'Storage facilities across central and Northwest regions — one is likely close to your home, your office, or the route between them.',
  },
  {
    title: 'Drive-up access',
    body:
      'Pull a vehicle, trailer, or moving truck right up to the unit door at most locations. Best for heavy furniture, garage contents, and frequent access.',
  },
  {
    title: 'Online reservations',
    body:
      'Reserve a unit in minutes from your phone or laptop — no waiting room, no phone tag. Check current unit availability before you visit.',
  },
  {
    title: 'Free moving truck',
    body:
      'New household rentals include a free moving truck at participating locations. Move in with one trip instead of two.',
  },
  {
    title: 'Climate-controlled available',
    body:
      'Indoor, climate-controlled units are available at every Modern Storage® location for items sensitive to heat and humidity — furniture, electronics, and photos.',
  },
  {
    title: 'Clean, well-kept facilities',
    body:
      'Storage you can walk into without holding your breath. Lit hallways, swept units, monitored entry, and on-site teams that actually answer the phone.',
  },
  {
    title: 'Flexible sizing',
    body:
      'Six unit sizes from 5x5 to 10x30 — closet overflow through whole-home moves. Upgrade or downsize as your needs change.',
  },
] as const

// Drive-Up vs Climate-Controlled — the clear segmentation the auditor asked
// for. Two cards side by side, each with a use-case list. Climate-controlled
// card includes a link to the dedicated /climate-controlled page so this page
// doesn't try to be both.
export const DRIVE_UP_VS_CLIMATE = {
  driveUp: {
    title: 'Drive-Up Household Storage',
    intro:
      'Pull right up to your unit and load directly from your vehicle. The faster, more affordable option for items that tolerate temperature changes.',
    bestFor: [
      'Garage and basement overflow',
      'Tools, lawn equipment, and outdoor gear',
      'Patio furniture and grills',
      'Quick-access items you visit often',
      'Short-term storage during a move',
    ],
  },
  climate: {
    title: 'Climate-Controlled Household Storage',
    intro:
      'Indoor units inside enclosed, insulated buildings. The right choice for anything sensitive to summer heat, winter cold, or humidity.',
    bestFor: [
      'Wood furniture and leather',
      'Electronics, TVs, and computers',
      'Family photos and documents',
      'Instruments, art, and collectibles',
      'Long-term storage of household items',
    ],
    deepLink: '/climate-controlled',
    deepLinkLabel: 'See full climate-controlled details →',
  },
} as const

export const HOUSEHOLD_FAQS = [
  {
    q: 'What size household storage unit do I need?',
    a: `Most one-bedroom apartments fit in a 10x10 Modern Storage® unit, a two-bedroom home fits a 10x15, and a three-bedroom home is typically best served by a 10x20. Single rooms, dorm storage, or closet overflow fit in a 5x5 or 5x10. The size guide on this page shows what fits inside each unit, and the on-site team can confirm the best size before move-in.`,
  },
  {
    q: 'Do you offer temporary storage during a move?',
    a: `Yes. Temporary storage is one of the most common reasons households rent a Modern Storage® unit. Month-to-month rentals mean you can store furniture and boxes between move-out and move-in dates without committing to a long contract. Bridge a few weeks between closings, store while you find the right house, or warehouse items during a long-distance relocation — close out the unit as soon as you're done.`,
  },
  {
    q: 'Do you offer storage during a home renovation?',
    a: `Yes. Renovation storage is one of the most popular household use cases. Parking furniture, appliances, rugs, and decor in a Modern Storage® unit protects your belongings from dust, paint, and contractor traffic — and gives the crew the space to actually work. Month-to-month rentals mean you only pay through the renovation and close out the unit when the project wraps.`,
  },
  {
    q: 'Can college students store between semesters?',
    a: `Yes. Modern Storage® is a popular choice for college students storing furniture, clothes, and dorm gear between semesters instead of hauling everything home. A 5x5 or 5x10 unit usually covers a dorm room or single bedroom. Month-to-month rentals mean no long lease, and convenient locations near the University of Arkansas, NWA campuses, and central-region schools make pickup and drop-off easy.`,
  },
  {
    q: 'Is there a free moving truck with household storage?',
    a: `Yes. Modern Storage® offers a free moving truck with new household storage rentals at participating locations. Move in with one trip instead of two — load furniture, appliances, and boxes directly from your home to your unit on move-in day. Truck availability, mileage limits, and participation vary by location, so confirm when you reserve.`,
  },
  {
    q: 'Are storage rentals month-to-month?',
    a: `Yes — every Modern Storage® household storage rental is month-to-month. No long-term contracts. Pay for the storage you need, for as long as you need it, and close out when your situation changes. Month-to-month is what makes self-storage practical for moving, renovating, downsizing, deployment, and short-term overflow.`,
  },
  {
    q: 'Can I reserve a household storage unit online?',
    a: `Yes. Reserve a household storage unit online at any Modern Storage® location in under five minutes — no waiting room, no phone tag. Choose your nearby facility, pick a unit size, and complete the reservation from your phone, tablet, or laptop. Online reservations are available 24/7.`,
  },
  {
    q: `What's the difference between drive-up and climate-controlled household storage?`,
    a: `Drive-up units let you pull your vehicle right up to the unit door — fastest for heavy furniture, garage contents, tools, and items you'll access often. Climate-controlled units sit inside enclosed, insulated buildings and stay temperature-stable year-round — best for wood furniture, electronics, photos, documents, art, and anything sensitive to heat or humidity. Every Modern Storage® location offers climate-controlled, and most also offer drive-up. If you're storing a mix, climate-controlled covers everything.`,
  },
  {
    q: 'Do you offer climate-controlled household storage?',
    a: `Yes. Climate-controlled household storage units are available at every Modern Storage® location — all 10 Arkansas facilities. Indoor, insulated buildings keep furniture, electronics, photos, mattresses, and other temperature-sensitive items in a stable environment year-round. If you're storing anything you wouldn't leave in a hot car or a damp garage, climate-controlled is the right call. Use the location finder to check unit sizes near you, or see the dedicated climate-controlled storage page for full details.`,
  },
  {
    q: 'How do I find a household storage unit near me?',
    a: `Use the location finder on this page to filter by region — Little Rock, North Little Rock, Maumelle, Bryant, Hot Springs, Bentonville, Springdale, and Lowell. Every Modern Storage® facility is listed with address, available unit types, and a direct reserve-online link. You can also call 501-910-0096 and the team will help you find the closest location with the right unit size.`,
  },
  {
    q: 'Do you offer apartment storage and short-term storage?',
    a: `Yes. Apartment storage is one of the most common Modern Storage® use cases — renters use a 5x5, 5x10, or 10x10 to store seasonal items, sports gear, extra furniture, or boxes that won't fit in a small apartment. Short-term storage works the same way: rent month-to-month for one month, three months, or as long as you need, and close out whenever. No long contracts, no commitment.`,
  },
  {
    q: 'Do you have boat, RV, or business storage as well?',
    a: `Yes. Modern Storage® offers boat storage, RV storage, and vehicle parking at select locations near Beaver Lake, Lake Maumelle, Lake Ouachita, and Greers Ferry. Business storage and mini-warehouse units for contractors, inventory, equipment, and records are available across most locations. See the Boat & RV Storage page and Business Storage page for full details.`,
  },
  // ── Comparison-style entries (household alternatives) ────────────────
  // Comparison topics frame Modern Storage® alongside other ways
  // homeowners and renters create extra space — garage, basement, attic,
  // shed, spare bedroom, additions, etc. None duplicate the existing
  // "Do you offer X?" / "What size?" entries above.
  {
    q: 'Garage vs Storage Unit — which is better for household storage?',
    a: `A garage provides convenient access to stored items, but it often competes with vehicle parking and workspace needs. A storage unit helps free up garage space while providing dedicated room for furniture, seasonal items, and household belongings. If your garage is overflowing, a storage unit may be the better long-term solution.`,
  },
  {
    q: 'Basement vs Storage Unit — which is better?',
    a: `Basements can offer convenient storage, but they may be vulnerable to moisture, humidity, and occasional flooding. Storage units provide additional space outside the home and can help protect belongings while reducing household clutter.`,
  },
  {
    q: 'Attic vs Storage Unit — which is better?',
    a: `Attics are commonly used for storage but can experience extreme temperature fluctuations. Storage units offer easier access and often provide more usable space for large furniture, appliances, and household items.`,
  },
  {
    q: 'Shed vs Storage Unit — which is better?',
    a: `A backyard shed works well for lawn equipment and outdoor supplies. Storage units provide greater flexibility, larger storage options, and can accommodate furniture, boxes, business inventory, and household goods.`,
  },
  {
    q: 'Spare Bedroom vs Storage Unit — which is better?',
    a: `Using a spare bedroom for storage can reduce the functionality of your home. A storage unit allows you to reclaim living space while keeping important belongings accessible.`,
  },
  {
    q: 'Closet vs Storage Unit — which is better?',
    a: `Closets are ideal for everyday storage, but they fill up quickly. A storage unit provides substantially more space for seasonal decorations, keepsakes, furniture, and infrequently used items.`,
  },
  {
    q: 'Storage Unit vs Home Addition — which is better?',
    a: `A home addition creates permanent square footage but often requires a significant investment. A storage unit provides immediate extra space at a fraction of the cost and may eliminate the need for construction.`,
  },
  {
    q: 'Storage Unit vs Outdoor Storage Shed — which is better?',
    a: `An outdoor shed can be convenient but requires installation, maintenance, and available yard space. A storage unit offers flexible sizing and often eliminates maintenance responsibilities.`,
  },
  {
    q: 'Storage Unit vs Portable Garage — which is better?',
    a: `Portable garages provide temporary protection for vehicles and equipment. Storage units generally offer better security, weather protection, and flexibility for household storage.`,
  },
  {
    q: 'Storage Unit vs Decluttering — which is better?',
    a: `Decluttering involves reducing possessions, while storage provides a place for items you want to keep but do not need every day. Many homeowners use both strategies together.`,
  },
  {
    q: 'Storage Unit vs Selling Furniture — which is better?',
    a: `Selling furniture creates immediate space but may be difficult if you plan to use the items again. A storage unit allows you to keep valuable furniture until it is needed.`,
  },
  {
    q: 'Storage Unit vs Donating Belongings — which is better?',
    a: `Donating unwanted items is often a good solution for permanent downsizing. A storage unit is better suited for belongings with sentimental, financial, or future practical value.`,
  },
  {
    q: 'Storage Unit vs Keeping Everything in Your Apartment — which is better?',
    a: `Overcrowded apartments can feel smaller and less organized. A storage unit creates additional space while allowing you to keep belongings that may not fit comfortably at home.`,
  },
  {
    q: 'Storage Unit vs Buying a Bigger House — which is better?',
    a: `Buying a larger home is a major financial commitment. For many families, a storage unit provides the extra space they need without increasing their mortgage, taxes, and maintenance costs.`,
  },
] as const
