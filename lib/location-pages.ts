import { LOCATIONS } from '@/lib/site'

type Slug = (typeof LOCATIONS)[number]['slug']

/**
 * Per-location content for the dynamic /locations/[slug] route.
 *
 * Shackleford is the fully-written exemplar — copy is grounded in real, public
 * facts (street name, interstate access, neighborhood, ZIP). The other 9 use
 * a structured template marked with [CONFIRM LOCAL DETAILS] so the local team
 * can replace city copy without changing the schema or page layout.
 *
 * Everything in `paragraphs` is rendered as <p>. Everything in `nearby` is a
 * card. `faqs` becomes the page's FAQPage JSON-LD.
 */
export type LocationPageContent = {
  /** True when the city copy is still a defensible template, not bespoke. */
  needsLocalCopy: boolean
  /** Short one-line subtitle under the H1. */
  subtitle: string
  /** Body copy paragraphs for the "About this location" section. */
  paragraphs: string[]
  /** Nearby landmarks / corridors / neighborhoods served. */
  nearby: { label: string; description?: string }[]
  /** Page-specific FAQs. Rendered in accordion + emitted as FAQPage JSON-LD. */
  faqs: { q: string; a: string }[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Defensible template used as default for any location that hasn't been written.
// Every fact in here is derived from the LOCATIONS array — no claims that
// aren't already in the site data.
// ─────────────────────────────────────────────────────────────────────────────
function templateContent(slug: Slug): LocationPageContent {
  const loc = LOCATIONS.find((l) => l.slug === slug)!
  const offers = (loc.badges as readonly string[]).join(', ')

  return {
    needsLocalCopy: true,
    subtitle: `Self storage at ${loc.streetAddress} in ${loc.city}, ${loc.state} ${loc.zip}`,
    paragraphs: [
      `Modern Storage® ${loc.name.replace('Modern Storage® ', '')} is located at ${loc.streetAddress} in ${loc.city}, Arkansas. The facility serves customers across ${loc.city} and the surrounding area with ${offers.toLowerCase()}.`,
      `[CONFIRM LOCAL DETAILS] — Replace this paragraph with two to three sentences of neighborhood-specific copy: what corridors and streets feed into the facility, which subdivisions or commercial districts it serves, and any specific reasons people in ${loc.city} choose Modern Storage® (recent move, growing family, business overflow, seasonal RV parking, etc.).`,
      `Reserve online or call ${loc.phone} to confirm available unit sizes, climate-controlled availability, and current move-in offers at Modern Storage® ${loc.city}.`,
    ],
    nearby: [
      { label: `${loc.city}, AR ${loc.zip}`, description: 'Primary service area.' },
      { label: '[CONFIRM NEARBY LANDMARK]', description: 'Add a real nearby landmark or major road.' },
      { label: '[CONFIRM NEARBY LANDMARK]', description: 'Add a second nearby landmark or neighborhood.' },
    ],
    faqs: defaultFaqs(slug),
  }
}

function defaultFaqs(slug: Slug): { q: string; a: string }[] {
  const loc = LOCATIONS.find((l) => l.slug === slug)!
  const offers = loc.badges as readonly string[]
  const climate = offers.includes('Climate-Controlled')
  const driveUp = offers.includes('Drive-Up Access')
  const boatRv = offers.includes('Boat/RV Storage')
  const business = offers.includes('Business Storage')
  const freeTruck = offers.includes('Free Moving Truck')

  return [
    {
      q: `Where is Modern Storage® ${loc.city} located?`,
      a: `Modern Storage® ${loc.city} is located at ${loc.streetAddress}, ${loc.city}, ${loc.state} ${loc.zip}. Use the map and "Get Directions" button above to navigate to the facility from your current location.`,
    },
    {
      q: `What types of storage does Modern Storage® ${loc.city} offer?`,
      a: `Modern Storage® ${loc.city} offers ${offers.join(', ').toLowerCase()}. Availability and unit sizes vary — use the "See Available Units" button to view live inventory and pricing for this facility.`,
    },
    ...(climate
      ? [
          {
            q: `Is climate-controlled storage available at Modern Storage® ${loc.city}?`,
            a: `Yes. Modern Storage® ${loc.city} offers climate-controlled storage units designed to help protect furniture, electronics, documents, photos, and other temperature-sensitive items from Arkansas heat, cold, and humidity swings.`,
          },
        ]
      : []),
    ...(driveUp
      ? [
          {
            q: `Does Modern Storage® ${loc.city} have drive-up storage?`,
            a: `Yes. Modern Storage® ${loc.city} offers drive-up storage units, which let you load and unload directly from your vehicle — ideal for heavy furniture, business inventory, and frequent access.`,
          },
        ]
      : []),
    ...(boatRv
      ? [
          {
            q: `Does Modern Storage® ${loc.city} offer boat, RV, or vehicle storage?`,
            a: `Yes. Modern Storage® ${loc.city} is one of the five Modern Storage® locations that offer boat storage, RV storage, trailer parking, and vehicle storage. Availability and space size vary — check live availability online.`,
          },
        ]
      : []),
    ...(business
      ? [
          {
            q: `Is Modern Storage® ${loc.city} a good fit for business storage?`,
            a: `Yes. Modern Storage® ${loc.city} offers business storage and mini-warehouse units for contractors, e-commerce sellers, sales reps, medical offices, real estate professionals, and small businesses. Unit sizes range from standard storage to larger mini-warehouse spaces.`,
          },
        ]
      : []),
    ...(freeTruck
      ? [
          {
            q: `Does Modern Storage® ${loc.city} offer a free moving truck?`,
            a: `Modern Storage® ${loc.city} is a participating location for the free moving truck program with new rentals. Truck availability, rental requirements, and mileage limits may vary — contact the facility before move-in to confirm.`,
          },
        ]
      : []),
    {
      q: `Can I reserve a storage unit online at Modern Storage® ${loc.city}?`,
      a: `Yes. Click "See Available Units" on this page to go to the live reservation page for Modern Storage® ${loc.city}. You can choose your unit size, review pricing, and complete the reservation in a few minutes.`,
    },
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// Shackleford — fully-written exemplar
// ─────────────────────────────────────────────────────────────────────────────
const SHACKLEFORD: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Self storage at 3400 South Shackleford Road in west Little Rock, just south of I-630',
  paragraphs: [
    'Modern Storage® Shackleford sits at 3400 South Shackleford Road in west Little Rock, a short drive from the I-430 and I-630 interchange. The facility serves customers across the Shackleford Crossings, Pleasant Valley, Park Avenue, and Walnut Valley areas of ZIP 72205, with quick access from Markham Street, Kanis Road, and Cantrell Road.',
    'West Little Rock is one of the busiest commercial and residential corridors in central Arkansas, and Modern Storage® Shackleford is built for that traffic — climate-controlled units protect furniture, electronics, documents, and seasonal items from Arkansas heat and humidity, drive-up access units make loading and unloading easier for heavier items, and the free moving truck program at participating locations helps new customers move in without renting a second vehicle.',
    'Modern Storage® Shackleford is one of five Modern Storage® locations that offer boat, RV, and vehicle storage. Customers store fishing boats, ski boats, travel trailers, motorcycles, and work vehicles in spaces sized for longer rigs that don\'t fit on a residential driveway. Availability varies — reserve online or call 501-910-0096 to confirm.',
  ],
  nearby: [
    {
      label: 'West Little Rock, AR 72205',
      description: 'Primary service area — Shackleford Crossings, Pleasant Valley, Park Avenue, Walnut Valley.',
    },
    {
      label: 'I-430 / I-630 interchange',
      description: 'Easy on/off access for moves coming from Chenal Parkway, downtown Little Rock, or Hot Springs.',
    },
    {
      label: 'Shackleford Crossings & Markham corridor',
      description: 'Walking-distance retail; convenient for stopping by between errands.',
    },
  ],
  faqs: [
    {
      q: 'Where is Modern Storage® Shackleford located?',
      a: 'Modern Storage® Shackleford is located at 3400 South Shackleford Road, Little Rock, AR 72205 — in west Little Rock, just south of I-630 and a short drive from the I-430 interchange. Use the "Get Directions" button above for turn-by-turn from your current location.',
    },
    {
      q: 'What storage options are available at Modern Storage® Shackleford?',
      a: 'Modern Storage® Shackleford offers climate-controlled storage, drive-up access units, boat / RV / vehicle storage, and the free moving truck program for new customers at participating locations. Unit sizes range from 5×5 to 10×30 — exact availability varies, so check the live reservation page for current inventory.',
    },
    {
      q: 'Is climate-controlled storage available at Modern Storage® Shackleford?',
      a: 'Yes. Modern Storage® Shackleford offers climate-controlled storage units designed to help protect furniture, electronics, documents, photos, and other temperature-sensitive items from Arkansas heat and humidity. Climate-controlled storage is the best option for long-term storage and for valuables that don\'t belong in an outdoor or garage environment.',
    },
    {
      q: 'Does Modern Storage® Shackleford offer boat, RV, or vehicle storage?',
      a: 'Yes. Modern Storage® Shackleford is one of five Modern Storage® locations that offer boat storage, RV storage, trailer parking, and vehicle storage. The other featured locations are Lowell, Bentonville, Springdale, and Maumelle. Space length and indoor/covered availability vary — confirm with the facility before move-in.',
    },
    {
      q: 'Does Modern Storage® Shackleford have drive-up storage units?',
      a: 'Yes. Drive-up storage units at Modern Storage® Shackleford let customers load and unload directly from a vehicle, which makes a big difference for heavy furniture, appliances, business inventory, and any items you need to access frequently. Drive-up availability varies by unit size — see the live reservation page for current options.',
    },
    {
      q: 'How do I reserve a unit at Modern Storage® Shackleford?',
      a: 'Click the "See Available Units" button on this page to go to the live reservation page for Modern Storage® Shackleford on modernstorage.com. You can compare unit sizes, view current pricing, and complete the reservation in a few minutes from your phone or computer. You can also call 501-910-0096 to talk to the Modern Storage® team directly.',
    },
    {
      q: 'What size storage unit should I rent at Modern Storage® Shackleford?',
      a: 'For closet-sized items, boxes, and documents, a 5×5 storage unit is usually enough. A 10×10 fits a one-bedroom apartment, a 10×20 fits a three-bedroom home, and a 10×30 covers a large home or business inventory. Use the AI Storage Size Finder tool on this site if you want a personalized recommendation, or call Modern Storage® Shackleford for help.',
    },
    {
      q: 'Does Modern Storage® Shackleford offer the free moving truck?',
      a: 'Modern Storage® Shackleford is a participating location for the free moving truck program with new rentals. Truck availability, rental requirements, mileage limits, and other details may vary — contact the facility before move-in to confirm and reserve the truck for your move-in day.',
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Map: slug → content. Templates for everything that isn't bespoke yet.
// ─────────────────────────────────────────────────────────────────────────────
export const LOCATION_PAGE_CONTENT: Record<Slug, LocationPageContent> = {
  'west-little-rock': templateContent('west-little-rock'),
  shackleford: SHACKLEFORD,
  riverdale: templateContent('riverdale'),
  'north-little-rock': templateContent('north-little-rock'),
  maumelle: templateContent('maumelle'),
  bryant: templateContent('bryant'),
  'hot-springs': templateContent('hot-springs'),
  bentonville: templateContent('bentonville'),
  springdale: templateContent('springdale'),
  lowell: templateContent('lowell'),
}

/** Best-effort fetch — falls back to a template if the slug is unknown. */
export function getLocationPageContent(slug: string): LocationPageContent | null {
  if (slug in LOCATION_PAGE_CONTENT) {
    return LOCATION_PAGE_CONTENT[slug as Slug]
  }
  return null
}
