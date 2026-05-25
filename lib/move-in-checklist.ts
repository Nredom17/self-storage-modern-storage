// Content module for /move-in-checklist. The CHECKLIST_DATA powers the
// interactive tool; the page-section arrays below power the surrounding SEO
// content (intro copy, what-to-bring highlights, common mistakes, FAQ).

export type UnitSize = { id: string; label: string; sub: string }
export type StorageType = { id: string; label: string; icon: string }

export const UNIT_SIZES: UnitSize[] = [
  { id: '5x5', label: '5x5', sub: 'Closet sized' },
  { id: '5x10', label: '5x10', sub: 'Walk-in closet' },
  { id: '5x15', label: '5x15', sub: 'Large walk-in' },
  { id: '10x10', label: '10x10', sub: 'Half garage' },
  { id: '10x15', label: '10x15', sub: 'Full garage' },
  { id: '10x20', label: '10x20', sub: 'One-car garage' },
  { id: '10x25', label: '10x25', sub: 'Large garage' },
  { id: '10x30', label: '10x30', sub: 'Extra large' },
]

export const STORAGE_TYPES: StorageType[] = [
  { id: 'household', label: 'Household', icon: '🏠' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'vehicle', label: 'Vehicle', icon: '🚗' },
  { id: 'seasonal', label: 'Seasonal Items', icon: '❄️' },
  { id: 'renovation', label: 'Home Renovation', icon: '🔨' },
]

export type ChecklistMap = Record<string, string[]>

export const CHECKLIST_DATA: Record<string, ChecklistMap> = {
  household: {
    'Before Move-In': [
      'Reserve your unit online or by phone',
      'Purchase a disc lock or cylinder lock (we recommend both)',
      "Get boxes in multiple sizes — don't underestimate small boxes",
      'Stock up on packing tape, bubble wrap, and furniture pads',
      'Label every box on the top and at least one side',
      'Disassemble large furniture to maximize vertical space',
      'Take photos of electronics serial numbers for insurance',
      "Confirm your renter's or homeowner's insurance covers stored items",
    ],
    'Packing Smart': [
      'Pack heaviest items in small boxes',
      'Fill boxes completely — half-empty boxes collapse when stacked',
      'Wrap breakables individually, never stack unwrapped',
      "Place items you'll need first near the front of the unit",
      'Store mattresses upright in mattress bags',
      'Keep a clear aisle down the center for access',
      'Drain all fuel from lawn equipment before storage',
      'Use wardrobe boxes for hanging clothes',
    ],
    'Climate & Protection': [
      'Consider climate control for wood furniture, electronics, documents',
      'Place a moisture absorber or desiccant in the unit',
      'Cover furniture with breathable cloth, not plastic',
      'Elevate items off the floor with pallets if available',
      'Do not store perishables, plants, or live animals',
      'Check that appliances are fully dry before storing',
    ],
    'Move-In Day': [
      'Bring your government-issued ID and reservation confirmation',
      'Walk the unit before loading — inspect for damage or leaks',
      'Install your lock immediately after first load',
      'Create a simple map or inventory list of where items are',
      'Photograph the full unit before you leave',
      'Save your gate code and facility hours in your phone',
    ],
  },
  business: {
    'Before Move-In': [
      'Confirm unit size handles your peak inventory volume',
      'Set up business insurance coverage for stored inventory',
      'Purchase shelving units to maximize vertical space',
      'Create an inventory spreadsheet before the first item goes in',
      'Label all boxes with SKU, product name, and quantity',
      'Establish a check-in / check-out protocol for your team',
    ],
    Organization: [
      'Install metal shelving along all walls before loading',
      'Group inventory by category, then by frequency of access',
      'Keep fast-moving inventory near the front',
      'Leave a center aisle at least 36 inches wide',
      'Use clear bins with printed labels for small parts',
      'Post a laminated unit map on the inside of the door',
    ],
    'Security & Access': [
      'Use a high-security disc lock — do not use a standard padlock',
      "Add your facility gate code to your team's shared password manager",
      "Know your facility's access hours before scheduling pickups",
      'Do not share your access code beyond essential staff',
      'Review security camera coverage with facility staff',
    ],
    Ongoing: [
      'Audit inventory quarterly — storage is not a permanent warehouse',
      'Update your inventory spreadsheet every visit',
      'Keep the unit clean and organized — clutter costs time',
      'Review unit size every 6 months as inventory changes',
    ],
  },
  vehicle: {
    'Before Storage': [
      'Wash and dry the vehicle thoroughly inside and out',
      'Change the oil before long-term storage',
      'Fill the gas tank and add a fuel stabilizer',
      'Check and top off all fluids',
      'Inflate tires to recommended PSI',
      'Disconnect the battery or use a trickle charger',
      'Pull the parking brake — but not for long-term storage',
      'Take dated photos of every panel before storing',
    ],
    'Move-In Day': [
      'Confirm unit door height clears your vehicle',
      'Use wheel chocks to prevent rolling',
      'Cover the vehicle with a breathable car cover',
      'Place a vapor barrier under the vehicle if on concrete',
      'Leave windows cracked slightly for air circulation',
      'Remove all valuables and personal items',
    ],
    'While in Storage': [
      'Visit monthly to run the engine and check tire pressure',
      'Check for rodent activity — place traps if needed',
      'Do not run engine in an enclosed unit without ventilation',
    ],
  },
  seasonal: {
    'Before Packing': [
      'Clean and dry all items before boxing — mold is undefeated',
      'Photograph your holiday decor setup for next year',
      'Sort by season so you only open what you need',
      'Use original boxes for fragile ornaments when available',
      'Wrap string lights around cardboard to prevent tangling',
    ],
    Packing: [
      'Use color-coded bins by season or holiday',
      'Label bins on top and all four sides',
      'Do not use garbage bags — they tear and hide contents',
      'Store delicate items in hard-sided plastic bins, not cardboard',
      "Place seasonal items you'll need soonest at the front",
    ],
    Protection: [
      'Add cedar blocks or lavender sachets to repel insects',
      'Keep fabric items in breathable cotton storage bags',
      'Avoid plastic wrap directly on wood furniture',
      'Store wrapping paper rolls in a flat, dedicated bin',
    ],
  },
  renovation: {
    'Before the Project': [
      'Measure your unit before moving furniture — know what fits',
      'Create a room-by-room inventory of what is going into storage',
      'Wrap upholstered furniture in protective plastic',
      'Remove doors from large cabinets to reduce bulk',
      'Store hardware in labeled zip bags taped to the furniture',
    ],
    'During Renovation': [
      'Keep frequently needed items accessible near the front',
      'Do not store construction debris — units are for goods only',
      'Check the unit weekly if the project runs long',
      'Keep a flashlight and gloves in the unit for easy access visits',
    ],
    'Moving Back In': [
      'Start with large furniture and work to small items',
      'Check every item for damage before bringing it back in',
      'Do a final sweep of the unit before ending your rental',
      'Notify Modern Storage® of your move-out date in advance',
    ],
  },
}

// ─── PAGE-SECTION CONTENT (server-rendered, used by page.tsx) ───────────────

export const WHAT_TO_BRING = [
  {
    title: 'Government-issued ID',
    body:
      "Your driver's license or state ID is required at the facility office before you receive your gate code.",
  },
  {
    title: 'Reservation confirmation',
    body:
      'A printed or on-screen copy of your reservation makes the office walk-through faster — especially for evening or weekend move-ins.',
  },
  {
    title: 'Your own disc lock',
    body:
      'Modern Storage® recommends a disc lock or cylinder lock over a standard padlock. Most facilities sell them on-site if you forget.',
  },
  {
    title: 'Phone fully charged',
    body:
      'You will photograph the unit before loading, save the gate code, and likely run a flashlight inside the unit for a few minutes.',
  },
  {
    title: 'Furniture pads or moving blankets',
    body:
      'Even a short load between truck and unit can ding furniture. A few pads or blankets are the cheapest insurance you can bring.',
  },
  {
    title: 'A roll of moving tape and a marker',
    body:
      'You will end up taping at least one box you thought was sealed. A marker is also clutch for last-minute box labeling.',
  },
] as const

export const COMMON_MISTAKES = [
  {
    title: "Packing boxes only half-full",
    body:
      'Half-empty boxes collapse when you stack three or four high. Either fill the box completely (pack with paper or soft items) or use a smaller box.',
  },
  {
    title: 'Putting heavy items in big boxes',
    body:
      'A large box of books is unmovable. Books, tools, hardware, and dishware go in small boxes. Pillows, linens, lampshades, and seasonal decor go in large boxes.',
  },
  {
    title: 'Wrapping wood furniture in plastic',
    body:
      'Plastic traps humidity against the wood and causes mold or finish damage in Arkansas summers. Use a breathable furniture pad or cotton sheet instead.',
  },
  {
    title: 'Not labeling boxes',
    body:
      'Future-you will need to find the holiday decor in six months. Label the side of every box (not just the top) with the room and a one-line content note.',
  },
  {
    title: 'Forgetting the center aisle',
    body:
      'A wall-to-wall packed unit means everything in the back is hostage to everything in the front. Leave at least a 24-inch center aisle if you plan to access items mid-rental.',
  },
  {
    title: 'Storing items still damp',
    body:
      'Appliances, lawn equipment, mattresses, and outdoor gear must be fully dry before they go in. Mold and mildew start within days, especially in Arkansas humidity.',
  },
] as const

export const CHECKLIST_FAQS = [
  {
    q: 'How do I prepare for move-in day at Modern Storage®?',
    a: `Use the Modern Storage® Move-In Checklist above to generate a personalized list. The short version: reserve your unit ahead of time, buy a disc lock, pack with the right box sizes for what you are storing, label every box on the side and the top, take photos of valuable items for insurance, and bring a government-issued ID and your reservation confirmation on move-in day. Walk the unit before loading and install your lock as soon as your first items are inside.`,
  },
  {
    q: 'What do I need to bring to my Modern Storage® move-in appointment?',
    a: `Bring a government-issued ID, your reservation confirmation, your own disc lock (most facilities sell them on-site if you forget), and a fully charged phone for photos and saving your gate code. If you are moving a full home or apartment, furniture pads and moving blankets prevent damage between the truck and the unit.`,
  },
  {
    q: 'Should I label my boxes for storage?',
    a: `Yes — label every box on the top and at least one side. Future-you needs to find specific items without unloading the whole unit. Use a thick marker, write the room and a one-line content note ("Kitchen — small appliances"), and keep a simple inventory list on your phone or in a notes app for the bigger picture.`,
  },
  {
    q: 'Do I need climate-controlled storage for my furniture?',
    a: `For wood furniture, leather furniture, upholstered furniture, electronics, photos, documents, and any high-value pieces, climate-controlled storage is strongly recommended in Arkansas. Summer heat and humidity can cause warping, cracking, swelling, mildew, and fabric damage over time. See the Climate-Controlled Storage page for more on what belongs indoors.`,
  },
  {
    q: 'How should I pack boxes for long-term storage?',
    a: `Use small boxes for heavy items (books, tools, dishware) and large boxes for light items (linens, pillows, holiday decor). Fill every box completely — packing paper or soft items in the gaps prevent collapse when stacked. Wrap breakables individually. Store mattresses upright in mattress bags. Drain fuel from lawn equipment. Cover wood furniture with a breathable cloth, never plastic.`,
  },
  {
    q: 'Do I need insurance on my stored items?',
    a: `Most renters' and homeowners' insurance policies cover items in storage, but coverage limits and exclusions vary by policy. Confirm with your insurer before move-in, especially for high-value items like electronics, jewelry, antiques, or business inventory. Many Modern Storage® locations also offer optional storage tenant insurance — ask at move-in.`,
  },
  {
    q: 'Can I store a vehicle in a storage unit?',
    a: `Yes. Modern Storage® offers vehicle storage at select Arkansas locations, including indoor RV storage at Modern Storage® Shackleford. Before storing a vehicle long-term: wash and dry it, change the oil, fill the gas tank with a fuel stabilizer added, inflate tires to spec, disconnect the battery or use a trickle charger, and cover with a breathable car cover. See the Boat and RV Storage page for the full breakdown.`,
  },
  {
    q: 'How do I store seasonal items so they last?',
    a: `Clean and fully dry every item before packing — even small moisture starts mold in Arkansas humidity. Use hard-sided plastic bins instead of cardboard for fragile items, color-code by season or holiday, and label bins on the top and all four sides. Add cedar blocks or lavender sachets to repel insects. Place items you will need first (Halloween before Christmas) near the front.`,
  },
] as const
