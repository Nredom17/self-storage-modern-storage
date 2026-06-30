export type Guide = {
  href: string; cluster: string; icon: string; title: string
  description: string; readTime: string; featured: boolean
}
export type FAQ = { q: string; a: string; href: string | null }

export const GUIDES: Guide[] = [
  { href: '/guides/storage-unit-sizes', cluster: 'Storage Unit Sizes', icon: '📦', title: 'How to Choose the Right Storage Unit Size', description: 'Complete walkthrough of every Modern Storage® unit size — 5x5 to 10x30 — with what fits in each, climate-controlled vs drive-up pricing, and how to pick the right size.', readTime: '7 min read', featured: true },
  { href: '/guides/storage-security', cluster: 'Security & Smart Locks', icon: '🔒', title: 'What to Look For in a Secure Storage Facility', description: 'Gated access, video surveillance, perimeter fencing, disc locks, on-site management — plus a 10-step pre-rent checklist for evaluating any facility.', readTime: '6 min read', featured: false },
  { href: '/guides/apartment-storage', cluster: 'Moving & Residential', icon: '🏠', title: 'Where to Put the Stuff That Does Not Fit Your Apartment', description: 'Compare 5x5 and 5x10 unit sizes, college-storage strategies, and which Modern Storage® Arkansas locations are closest to apartment complexes.', readTime: '5 min read', featured: true },
  { href: '/guides/moving-storage', cluster: 'Moving & Residential', icon: '🚚', title: 'How to Use Storage to Make Your Move Less Stressful', description: 'Storage between leases, military PCS, long-distance relocation, and renovation moves. Pair with the free moving truck for one-trip move-in.', readTime: '5 min read', featured: false },
  { href: '/climate-controlled-arkansas-humidity', cluster: 'Climate-Controlled', icon: '❄️', title: 'Why Arkansas Humidity Destroys Stored Belongings (And How to Stop It)', description: 'How Arkansas humidity damages stored belongings — month-by-month humidity table, garage vs. attic vs. climate-controlled comparison, and what belongs indoors.', readTime: '8 min read', featured: true },
  { href: '/business-storage-bentonville', cluster: 'Business Storage', icon: '🏢', title: 'The Smart Way to Store Business Inventory Near the Walmart Home Office', description: 'Climate-controlled and business storage for NWA vendors, suppliers, e-commerce sellers, and Bentonville-area small businesses near the Walmart Home Office.', readTime: '6 min read', featured: true },
  { href: '/contractor-storage-little-rock', cluster: 'Business Storage', icon: '🔧', title: 'Where Little Rock Contractors Store Their Tools Between Jobs', description: 'Tools, jobsite overflow, restoration crew kits, and trade inventory storage at four Little Rock area Modern Storage® locations.', readTime: '5 min read', featured: false },
  { href: '/storage-near-beaver-lake', cluster: 'RV & Boat Storage', icon: '⛵', title: 'Off-Season Boat and RV Storage Near Beaver Lake', description: 'Off-season boat storage, year-round RV parking, and trailer spaces minutes from Beaver Lake marinas. Lowell location on I-49.', readTime: '5 min read', featured: false },
]

export const FAQS: FAQ[] = [
  { q: 'What size storage unit do I need?', a: 'A 5x10 fits a studio or bedroom. A 10x10 handles a 1–2 bedroom apartment. A 10x20 fits a full house. Use our AI Size Finder for a personalized recommendation based on what you plan to store.', href: '/guides/storage-unit-sizes' },
  { q: 'Do I need climate-controlled storage in Arkansas?', a: 'Arkansas averages 70–85% humidity in summer. Climate control is strongly recommended for wood furniture, electronics, artwork, clothing, and documents. Drive-up works for metal, plastic, and vehicles.', href: '/climate-controlled-arkansas-humidity' },
  { q: 'Can I store a boat, RV, or vehicle?', a: 'Yes. Select Modern Storage® locations offer covered and uncovered spaces for boats, RVs, trailers, and vehicles. Lowell is ideal for Beaver Lake boat storage. Contact your preferred location for availability.', href: '/storage-near-beaver-lake' },
  { q: 'How much does storage cost in Arkansas?', a: 'Small units (5x5, 5x10) typically start under $50/month. Larger units range higher depending on size and climate control. Reserve online to lock in current pricing at any of our 10 locations.', href: '/guides/storage-unit-sizes' },
  { q: 'Can businesses rent storage units?', a: 'Absolutely. Modern Storage® serves contractors, e-commerce sellers, Walmart suppliers, and small businesses across Arkansas. Climate-controlled options protect inventory and equipment. No long-term commitment required.', href: '/business-storage-bentonville' },
  { q: 'What is a Modern Smart Unit?', a: 'A Modern Smart Unit uses a smart lock instead of a traditional key. Unlock your unit with your smartphone via NFC tap, pay rent through the app, and share temporary digital access — no physical key needed.', href: '/guides/storage-security' },
  { q: 'How long can I rent a storage unit?', a: 'Modern Storage® offers month-to-month rentals with no long-term commitment. Rent for as little as one month or as long as you need. Simply give notice when you are ready to move out.', href: null },
  { q: 'What items cannot be stored?', a: 'Hazardous materials, flammable liquids, perishable food, living things (people or animals), and illegal items cannot be stored. Your rental agreement includes a full list of prohibited items.', href: null },
]
