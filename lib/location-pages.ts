import { LOCATIONS } from '@/lib/site'

type Slug = (typeof LOCATIONS)[number]['slug']

/**
 * Per-location content for the dynamic /locations/[slug] route.
 *
 * All 10 facilities now have bespoke local copy. Each entry references real
 * Arkansas streets, neighborhoods, corridors, and landmarks — no placeholders.
 *
 * Everything in `paragraphs` is rendered as <p>. Everything in `nearby` is a
 * card. `faqs` becomes the page's FAQPage JSON-LD.
 */
export type LocationPageContent = {
  /** Set to false once a location has bespoke local copy. Kept on the type
   *  so future facility expansions can use the template fallback path. */
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

// Default FAQ generator — kept around because facility-specific FAQ arrays
// below still call it for the common questions before adding bespoke ones.
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
      q: `Where is ${loc.name} located?`,
      a: `${loc.name} is located at ${loc.streetAddress}, ${loc.city}, ${loc.state} ${loc.zip}. Use the map and "Get Directions" button above to navigate to the facility from your current location.`,
    },
    {
      q: `What types of storage does ${loc.name} offer?`,
      a: `${loc.name} offers ${offers.join(', ').toLowerCase()}. Availability and unit sizes vary — use the "See Available Units" button to view live inventory and pricing for this facility.`,
    },
    ...(climate
      ? [
          {
            q: `Is climate-controlled storage available at ${loc.name}?`,
            a: `Yes. ${loc.name} offers climate-controlled storage units designed to help protect furniture, electronics, documents, photos, and other temperature-sensitive items from Arkansas heat, cold, and humidity swings.`,
          },
        ]
      : []),
    ...(driveUp
      ? [
          {
            q: `Does ${loc.name} have drive-up storage?`,
            a: `Yes. ${loc.name} offers drive-up storage units, which let you load and unload directly from your vehicle — ideal for heavy furniture, business inventory, and frequent access.`,
          },
        ]
      : []),
    ...(boatRv
      ? [
          {
            q: `Does ${loc.name} offer boat, RV, or vehicle storage?`,
            a: `Yes. ${loc.name} is one of the Modern Storage® locations that offer boat storage, RV storage, trailer parking, and vehicle storage. Availability and space size vary — check live availability online.`,
          },
        ]
      : []),
    ...(business
      ? [
          {
            q: `Is ${loc.name} a good fit for business storage?`,
            a: `Yes. ${loc.name} offers business storage and mini-warehouse units for contractors, e-commerce sellers, sales reps, medical offices, real estate professionals, and small businesses.`,
          },
        ]
      : []),
    ...(freeTruck
      ? [
          {
            q: `Does ${loc.name} offer a free moving truck?`,
            a: `Yes — ${loc.name} is a participating location for the free moving truck program with new rentals. Truck availability, mileage limits, and requirements vary — contact the facility before move-in to confirm.`,
          },
        ]
      : []),
    {
      q: `Can I reserve a storage unit online at ${loc.name}?`,
      a: `Yes. Click "See Available Units" on this page to go to the live reservation page for ${loc.name}. You can choose your unit size, review pricing, and complete the reservation in a few minutes.`,
    },
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SHACKLEFORD — west Little Rock, 72205
// ─────────────────────────────────────────────────────────────────────────────
const SHACKLEFORD: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Self storage at 3400 South Shackleford Road in west Little Rock, just south of I-630',
  paragraphs: [
    'Modern Storage® Shackleford sits at 3400 South Shackleford Road in west Little Rock, a short drive from the I-430 and I-630 interchange. The facility serves customers across the Shackleford Crossings, Pleasant Valley, Park Avenue, and Walnut Valley areas of ZIP 72205, with quick access from Markham Street, Kanis Road, and Cantrell Road.',
    'West Little Rock is one of the busiest commercial and residential corridors in central Arkansas, and Modern Storage® Shackleford is built for that traffic — climate-controlled units protect furniture, electronics, documents, and seasonal items from Arkansas heat and humidity, drive-up access units make loading and unloading easier for heavier items, and the free moving truck program at participating locations helps new customers move in without renting a second vehicle.',
    'Modern Storage® Shackleford is one of the Modern Storage® locations historically known for vehicle storage. Customers store work vehicles, motorcycles, and select equipment in spaces that don\'t fit on a residential driveway. Availability varies — reserve online or call 501-910-0096 to confirm current offerings.',
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
      a: 'Modern Storage® Shackleford is at 3400 South Shackleford Road, Little Rock, AR 72205 — in west Little Rock, just south of I-630 and a short drive from the I-430 interchange. Use the "Get Directions" button above for turn-by-turn from your current location.',
    },
    {
      q: 'What storage options are available at Modern Storage® Shackleford?',
      a: 'Modern Storage® Shackleford offers climate-controlled storage, drive-up access units, and the free moving truck program for new customers at participating locations. Unit sizes range from 5×5 to 10×30 — exact availability varies, so check the live reservation page for current inventory.',
    },
    {
      q: 'Is climate-controlled storage available at Modern Storage® Shackleford?',
      a: 'Yes. Modern Storage® Shackleford offers climate-controlled storage units designed to help protect furniture, electronics, documents, photos, and other temperature-sensitive items from Arkansas heat and humidity. Climate-controlled storage is the best option for long-term storage and for valuables that don\'t belong in an outdoor or garage environment.',
    },
    {
      q: 'Does Modern Storage® Shackleford have drive-up storage units?',
      a: 'Yes. Drive-up storage units at Modern Storage® Shackleford let customers load and unload directly from a vehicle, which makes a big difference for heavy furniture, appliances, business inventory, and any items you need to access frequently. Drive-up availability varies by unit size — see the live reservation page for current options.',
    },
    {
      q: 'How do I reserve a unit at Modern Storage® Shackleford?',
      a: 'Click the "See Available Units" button on this page to go to the live reservation page for Modern Storage® Shackleford on modernstorage.com. You can compare unit sizes, view current pricing, and complete the reservation in a few minutes from your phone or computer. You can also call 501-910-0096 to talk to the team directly.',
    },
    {
      q: 'What size storage unit should I rent at Modern Storage® Shackleford?',
      a: 'For closet-sized items, boxes, and documents, a 5×5 storage unit is usually enough. A 10×10 fits a one-bedroom apartment, a 10×20 fits a three-bedroom home, and a 10×30 covers a large home or business inventory. Use the AI Storage Size Finder tool on this site for a personalized recommendation.',
    },
    {
      q: 'Does Modern Storage® Shackleford offer the free moving truck?',
      a: 'Yes — Modern Storage® Shackleford is a participating location for the free moving truck program with new rentals. Truck availability, rental requirements, and mileage limits vary; contact the facility before move-in to confirm and reserve the truck for your move-in day.',
    },
    {
      q: 'What neighborhoods does Modern Storage® Shackleford serve?',
      a: 'Modern Storage® Shackleford primarily serves west Little Rock — Shackleford Crossings, Pleasant Valley, Park Avenue, Walnut Valley, and the Markham / Kanis / Cantrell corridors of ZIP 72205. The location is also convenient for customers coming from Chenal Parkway, downtown Little Rock via I-630, and Hot Springs via I-430.',
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. WEST LITTLE ROCK — 601 Autumn Rd, 72211
// ─────────────────────────────────────────────────────────────────────────────
const WEST_LITTLE_ROCK: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Self storage at 601 Autumn Rd in west Little Rock, off Markham Street near the I-430 corridor',
  paragraphs: [
    'Modern Storage® West Little Rock is located at 601 Autumn Road in ZIP 72211, just off West Markham Street near the I-430 corridor. The facility serves customers across Chenal Valley, Pleasant Ridge, Pleasant Valley, and the busy commercial belt that runs from Bowman Road through Rodney Parham. Markham, Kanis, and Cantrell all feed into the facility, making move-in easy from almost anywhere in west Little Rock.',
    'West Little Rock is a high-growth area for families, professionals, and small businesses — and Modern Storage® West Little Rock is sized to serve all three. Climate-controlled units protect furniture, electronics, photos, and documents from Arkansas summer humidity, drive-up access units handle heavier garage and warehouse loads, and a Spanish-speaking team (Se Habla Español) makes reserving and moving in straightforward for the area\'s bilingual customer base.',
    'New customers at Modern Storage® West Little Rock can take advantage of the free moving truck program at participating locations to load furniture, appliances, and boxes directly from home to the unit in a single trip. Reserve online or call 501-910-0096 to confirm current availability and the move-in offers running this month.',
  ],
  nearby: [
    {
      label: 'West Little Rock, AR 72211',
      description: 'Primary service area — Chenal Valley, Pleasant Ridge, Pleasant Valley, Bowman Road corridor.',
    },
    {
      label: 'I-430 & West Markham',
      description: 'Easy access from Chenal Parkway, downtown Little Rock, North Little Rock, and Bryant.',
    },
    {
      label: 'Rodney Parham & Bowman',
      description: 'Convenient for stops between west Little Rock retail centers and offices.',
    },
  ],
  faqs: [
    ...defaultFaqs('west-little-rock'),
    {
      q: 'What neighborhoods does Modern Storage® West Little Rock serve?',
      a: 'Modern Storage® West Little Rock primarily serves ZIP 72211 and the surrounding west Little Rock area — Chenal Valley, Pleasant Ridge, Pleasant Valley, the Bowman Road corridor, and the West Markham / Rodney Parham retail belt. It\'s also convenient for customers commuting on I-430 from downtown Little Rock, Maumelle, or Bryant.',
    },
    {
      q: 'Does Modern Storage® West Little Rock have Spanish-speaking staff?',
      a: 'Yes — Modern Storage® West Little Rock has Spanish-speaking team members on site (Se Habla Español). The team can walk Spanish-speaking customers through unit sizes, climate-controlled options, pricing, and the reservation paperwork before move-in.',
    },
    // ── Storage Unit vs Garage in Little Rock ────────────────────────
    {
      q: 'Why use a storage unit instead of a garage in Little Rock?',
      a: `Storage units help keep garages available for vehicles while reducing household clutter.`,
    },
    {
      q: 'What items are commonly moved from garages into storage in Little Rock?',
      a: `Furniture, seasonal decorations, tools, and recreational equipment are common examples.`,
    },
    {
      q: 'Can storage help improve home organization in Little Rock?',
      a: `Yes. Many families use storage to create a cleaner and more functional garage.`,
    },
    // ── Climate-Controlled Storage vs Garage in Little Rock ──────────
    {
      q: 'Does climate-controlled storage offer better protection than a garage in Little Rock?',
      a: `Climate-controlled storage helps reduce exposure to heat, humidity, and temperature fluctuations.`,
    },
    {
      q: 'What items benefit most from climate control in Little Rock?',
      a: `Electronics, antiques, photographs, documents, and wood furniture.`,
    },
    {
      q: 'Is climate-controlled storage necessary in Little Rock?',
      a: `For sensitive belongings, climate-controlled storage is often recommended due to seasonal weather conditions in Arkansas.`,
    },
    // ── Storage Unit vs Spare Bedroom in Little Rock ─────────────────
    {
      q: 'Should I use a spare bedroom or a storage unit in Little Rock?',
      a: `A storage unit can help preserve your home's usable living space while keeping belongings secure.`,
    },
    {
      q: 'What items are commonly stored offsite by Little Rock homeowners?',
      a: `Seasonal items, furniture, business inventory, and collections.`,
    },
    {
      q: 'Can storage free up space for guests or a home office?',
      a: `Yes. Many homeowners reclaim spare bedrooms by moving excess items into storage.`,
    },
    // ── Storage Unit vs Shed in Little Rock ──────────────────────────
    {
      q: 'Is a storage unit safer than a backyard shed in Little Rock?',
      a: `Storage facilities often provide enhanced security features and professional property management.`,
    },
    {
      q: 'Do storage units require maintenance in Little Rock?',
      a: `No. Unlike sheds, storage units do not require repairs, painting, or upkeep.`,
    },
    {
      q: 'Which option is more flexible — a storage unit or a shed in Little Rock?',
      a: `Storage units allow you to adjust your space needs without construction costs.`,
    },
    // ── Storage Unit vs Home Addition in Little Rock ─────────────────
    {
      q: 'Is storage cheaper than adding onto a home in Little Rock?',
      a: `In most cases, a storage unit costs significantly less than a home addition.`,
    },
    {
      q: 'When should I choose storage over construction in Little Rock?',
      a: `If your primary need is extra storage space, renting a unit can be a faster and more affordable solution.`,
    },
    {
      q: 'Can storage help postpone major renovations in Little Rock?',
      a: `Yes. Many homeowners use storage while evaluating long-term housing needs.`,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. RIVERDALE — 2510 Cantrell Rd, Little Rock, 72202
// ─────────────────────────────────────────────────────────────────────────────
const RIVERDALE: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Business storage and climate-controlled units at 2510 Cantrell Rd in the Riverdale district of Little Rock',
  paragraphs: [
    'Modern Storage® Riverdale sits at 2510 Cantrell Road in ZIP 72202, in the Riverdale district of Little Rock between downtown and Hillcrest. Cantrell Road (Hwy 10) is the major artery feeding the facility from downtown, the River Market, Heights, and Hillcrest, with quick I-630 access for customers coming from west Little Rock or North Little Rock.',
    'Modern Storage® Riverdale is the flagship location for business storage in central Arkansas. The facility offers ground-floor access for moving heavy items in and out, climate-controlled units for documents, electronics, and inventory, and business-friendly amenities geared toward contractors, medical offices, real estate professionals, attorneys, e-commerce sellers, and downtown small businesses that need professional indoor storage without commercial real estate cost.',
    'Households in Riverdale, Hillcrest, the Heights, and downtown also use Modern Storage® Riverdale for apartment moves, downsizing, renovation storage, and seasonal items — climate-controlled units protect everything from family photos to wine to electronics through Arkansas summer humidity. Reserve online or call 501-910-0096 to confirm current availability.',
  ],
  nearby: [
    {
      label: 'Riverdale & Hillcrest, AR 72202',
      description: 'Primary service area — Riverdale, Hillcrest, the Heights, and downtown Little Rock.',
    },
    {
      label: 'Cantrell Rd & I-630',
      description: 'Easy access from downtown, the River Market, west Little Rock, and North Little Rock.',
    },
    {
      label: 'Downtown Little Rock & River Market',
      description: 'Convenient for downtown businesses, restaurants, and offices needing nearby storage.',
    },
  ],
  faqs: [
    ...defaultFaqs('riverdale'),
    {
      q: 'Is Modern Storage® Riverdale designed for businesses?',
      a: 'Yes — Modern Storage® Riverdale is the flagship business storage location for central Arkansas. The facility offers ground-floor access, climate-controlled units, and amenities geared toward contractors, medical and dental offices, attorneys, real estate teams, e-commerce sellers, and small businesses that need professional indoor storage without leasing commercial warehouse space.',
    },
    {
      q: 'What neighborhoods does Modern Storage® Riverdale serve?',
      a: 'Modern Storage® Riverdale primarily serves the Riverdale district, Hillcrest, the Heights, and downtown Little Rock — ZIP 72202 and the broader Cantrell Road corridor. It\'s also convenient for customers coming from west Little Rock via I-630 and from North Little Rock via the Main Street and Broadway bridges.',
    },
    {
      q: 'Does Modern Storage® Riverdale have ground-floor access?',
      a: 'Yes. Ground-floor access means no stairs and no elevators between the parking area and your storage unit — important for moving heavy furniture, business equipment, file boxes, and inventory in and out efficiently. It\'s one of the main reasons businesses and downtown households choose Modern Storage® Riverdale.',
    },
    // ── Storage Unit vs Driveway Storage in Riverdale ────────────────
    {
      q: 'Why not store items in a driveway near Riverdale?',
      a: `Driveway storage leaves belongings exposed to weather, theft, and HOA restrictions.`,
    },
    {
      q: 'What are the benefits of a storage unit over driveway storage?',
      a: `Storage units provide dedicated space, improved protection, and greater organization.`,
    },
    {
      q: 'Can storage improve curb appeal?',
      a: `Yes. Removing excess items from a driveway can create a cleaner appearance.`,
    },
    // ── Climate-Controlled Storage vs Standard Storage in Riverdale ──
    {
      q: 'What is the advantage of climate-controlled storage at Modern Storage® Riverdale?',
      a: `It helps protect sensitive belongings from heat and humidity.`,
    },
    {
      q: 'Is standard storage enough for most items in Riverdale?',
      a: `Many items store well in standard units, especially for shorter periods.`,
    },
    {
      q: 'When should I choose climate control at Modern Storage® Riverdale?',
      a: `For electronics, antiques, photographs, and other valuable possessions.`,
    },
    // ── Storage Unit vs Garage in Riverdale ──────────────────────────
    {
      q: 'Why rent a storage unit instead of using a garage in Riverdale?',
      a: `A storage unit helps preserve garage space for vehicles and everyday use.`,
    },
    {
      q: 'What items are commonly stored offsite by Riverdale residents?',
      a: `Furniture, business inventory, seasonal items, and recreational equipment.`,
    },
    {
      q: 'Can storage help reduce household clutter in Riverdale?',
      a: `Yes. Storage provides additional space while keeping your home organized.`,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. NORTH LITTLE ROCK — 3100 North Hills Blvd, 72116
// ─────────────────────────────────────────────────────────────────────────────
const NORTH_LITTLE_ROCK: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Climate-controlled and drive-up self storage at 3100 North Hills Blvd in North Little Rock, near McCain Mall',
  paragraphs: [
    'Modern Storage® North Little Rock is located at 3100 North Hills Boulevard in ZIP 72116, just off McCain Boulevard near McCain Mall and minutes from the I-40 / JFK Boulevard interchange. The facility serves customers across the Lakewood, Park Hill, Indian Hills, and Sherwood-adjacent areas of North Little Rock, with quick access for moves coming from downtown NLR, the Burns Park corridor, and Sherwood via JFK.',
    'North Little Rock is a strong mix of established neighborhoods, growing apartment communities, and small businesses — and Modern Storage® North Little Rock is built for all of them. Climate-controlled units protect furniture, electronics, and important documents from Arkansas summer heat and humidity, drive-up access units make loading easier for heavier garage and warehouse loads, and the business storage option supports contractors, sales reps, and small companies serving the central Arkansas region.',
    'New customers at Modern Storage® North Little Rock can take advantage of the free moving truck program at participating locations. Reserve online or call 501-910-0096 to compare unit sizes, confirm climate-controlled availability, and lock in your move-in day.',
  ],
  nearby: [
    {
      label: 'North Little Rock, AR 72116',
      description: 'Primary service area — Lakewood, Park Hill, Indian Hills, and the McCain corridor.',
    },
    {
      label: 'McCain Blvd & I-40',
      description: 'Easy access from downtown NLR, Sherwood, Maumelle, and east Little Rock via I-40.',
    },
    {
      label: 'McCain Mall area',
      description: 'Convenient retail district with restaurants, shopping, and quick highway access.',
    },
  ],
  faqs: [
    ...defaultFaqs('north-little-rock'),
    {
      q: 'What neighborhoods does Modern Storage® North Little Rock serve?',
      a: 'Modern Storage® North Little Rock primarily serves the ZIP 72116 area — Lakewood, Park Hill, Indian Hills, and the McCain Boulevard corridor. It\'s also convenient for customers coming from downtown NLR, Sherwood (via JFK Blvd), Maumelle (via I-40), and parts of east Little Rock.',
    },
    {
      q: 'Is Modern Storage® North Little Rock a good fit for businesses?',
      a: 'Yes — Modern Storage® North Little Rock offers business storage and mini-warehouse units for contractors, sales reps, e-commerce sellers, medical offices, and small companies serving central Arkansas. Drive-up access makes loading inventory and equipment efficient, and climate-controlled options protect records, samples, and sensitive equipment.',
    },
    {
      q: 'How is Modern Storage® North Little Rock different from the Maumelle Blvd location?',
      a: 'Both Modern Storage® locations are in North Little Rock and offer climate-controlled units and the free moving truck program. North Hills Blvd is closer to McCain Mall, the I-40 corridor, and the Lakewood / Park Hill neighborhoods, with business storage and drive-up access. Maumelle Blvd is further west on Hwy 100 toward the city of Maumelle and features boat/RV storage in addition to climate-controlled units — best for customers near Lake Maumelle or west NLR.',
    },
    // ── Storage Unit vs Garage in North Little Rock ──────────────────
    {
      q: 'Why move items from a garage into storage in North Little Rock?',
      a: `Doing so can create more usable space for vehicles and home projects.`,
    },
    {
      q: 'What items belong in storage instead of a garage?',
      a: `Seasonal decorations, extra furniture, and rarely used belongings are common choices.`,
    },
    {
      q: 'Can storage help improve organization in North Little Rock homes?',
      a: `Yes. Storage units provide dedicated space for overflow items.`,
    },
    // ── Climate-Controlled Storage vs Standard Storage in NLR ────────
    {
      q: 'What is climate-controlled storage in North Little Rock?',
      a: `Climate-controlled units maintain more consistent temperatures and humidity levels than standard units.`,
    },
    {
      q: 'Who should choose climate-controlled storage at Modern Storage® North Little Rock?',
      a: `Anyone storing valuable, delicate, or temperature-sensitive belongings.`,
    },
    {
      q: 'Is standard storage sufficient for most items in North Little Rock?',
      a: `Many household items store well in standard units, depending on the item and duration.`,
    },
    // ── Storage Unit vs Attic in North Little Rock ───────────────────
    {
      q: 'Why not store everything in the attic in North Little Rock?',
      a: `Attics can become extremely hot and may not be suitable for many household items.`,
    },
    {
      q: 'What items are vulnerable in attic storage?',
      a: `Documents, photographs, electronics, and wooden furniture.`,
    },
    {
      q: 'How does self storage help over attic storage in North Little Rock?',
      a: `Storage units offer easier access and better protection for many belongings.`,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. MAUMELLE BLVD — 9100 Maumelle Blvd, North Little Rock, 72113
// ─────────────────────────────────────────────────────────────────────────────
const MAUMELLE: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Climate-controlled storage plus boat & RV parking at 9100 Maumelle Blvd, on Hwy 100 between NLR and Maumelle',
  paragraphs: [
    'Modern Storage® Maumelle Blvd is located at 9100 Maumelle Boulevard (Hwy 100) in ZIP 72113, on the corridor connecting western North Little Rock to the city of Maumelle. The facility is positioned for customers across Maumelle, Crystal Hill, west NLR, and the I-430 / Hwy 100 corridor, with easy lake-area access for boat owners headed to Lake Maumelle or Pinnacle Mountain State Park.',
    'This is the central Arkansas Modern Storage® location built around boat and RV storage. Lake Maumelle and Lake Conway are both within reach, and customers store fishing boats, ski boats, pontoons, travel trailers, motorcycles, and RVs in spaces sized for longer rigs that don\'t fit on a residential driveway or in an HOA. Climate-controlled indoor units round out the offering for furniture, electronics, documents, and other temperature-sensitive items.',
    'The free moving truck program is available at Modern Storage® Maumelle Blvd for new household and business storage rentals — handy for customers moving between Maumelle and central Little Rock or NLR. Reserve online or call 501-910-0096 to confirm boat/RV space availability, climate-controlled unit sizes, and current move-in offers.',
  ],
  nearby: [
    {
      label: 'Maumelle & west NLR, AR 72113',
      description: 'Primary service area — Maumelle, Crystal Hill, and the Hwy 100 corridor.',
    },
    {
      label: 'Lake Maumelle & Pinnacle Mountain',
      description: 'Boat and RV storage location of choice for lake-area customers and weekend boaters.',
    },
    {
      label: 'I-430 & Hwy 100',
      description: 'Easy access from west Little Rock, North Little Rock, and the Conway commuter corridor.',
    },
  ],
  faqs: [
    ...defaultFaqs('maumelle'),
    {
      q: 'Does Modern Storage® Maumelle Blvd offer boat and RV storage?',
      a: 'Yes — Modern Storage® Maumelle Blvd is one of the Modern Storage® locations that offer boat, RV, trailer, and vehicle storage. The location is positioned for customers near Lake Maumelle, Lake Conway, and the broader I-430 / Hwy 100 corridor. Space length and indoor/covered availability vary, so check the live reservation page or call 501-910-0096 to confirm.',
    },
    {
      q: 'What neighborhoods does Modern Storage® Maumelle Blvd serve?',
      a: 'Modern Storage® Maumelle Blvd primarily serves the city of Maumelle, the Crystal Hill area, west North Little Rock, and the Hwy 100 corridor in ZIP 72113. It\'s also a popular boat/RV storage option for lake-area customers commuting from west Little Rock, downtown NLR, and Conway.',
    },
    {
      q: 'How is Modern Storage® Maumelle Blvd different from the North Hills location?',
      a: 'Both Modern Storage® locations are in North Little Rock and offer climate-controlled units. Maumelle Blvd specializes in boat and RV storage — best for customers near Lake Maumelle or anyone storing a longer rig. North Hills Blvd is closer to McCain Mall, the I-40 corridor, and the Lakewood / Park Hill neighborhoods, with drive-up access and business storage options instead of boat/RV.',
    },
    // ── Storage Unit vs Garage in Maumelle ───────────────────────────
    {
      q: 'Should I use a storage unit instead of my garage in Maumelle?',
      a: `A storage unit can help keep your garage organized and available for vehicles.`,
    },
    {
      q: 'What items are often moved into storage in Maumelle?',
      a: `Holiday decorations, sporting equipment, and furniture.`,
    },
    {
      q: 'Can storage improve home functionality in Maumelle?',
      a: `Yes. Many residents use storage to reduce clutter and improve organization.`,
    },
    // ── Climate-Controlled Storage vs Garage in Maumelle ─────────────
    {
      q: 'Does climate control matter in Arkansas for Maumelle households?',
      a: `Climate control can help protect sensitive items from seasonal temperature and humidity changes.`,
    },
    {
      q: 'Which belongings benefit most from climate-controlled storage in Maumelle?',
      a: `Electronics, documents, artwork, and antiques.`,
    },
    {
      q: 'Is a garage enough for long-term storage in Maumelle?',
      a: `For some items yes, but climate-sensitive belongings often benefit from additional protection.`,
    },
    // ── Storage Unit vs Larger Home in Maumelle ──────────────────────
    {
      q: 'Is a storage unit cheaper than buying a larger home in Maumelle?',
      a: `Generally, yes. Storage can provide extra space without the expense of moving.`,
    },
    {
      q: 'Who benefits from using storage in Maumelle?',
      a: `Families experiencing temporary space shortages or life transitions.`,
    },
    {
      q: 'Can storage delay the need to move in Maumelle?',
      a: `Many homeowners use storage as a flexible solution before making major housing decisions.`,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. BRYANT — 300 Dell Dr, 72022
// ─────────────────────────────────────────────────────────────────────────────
const BRYANT: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Climate-controlled, drive-up, and boat/RV storage at 300 Dell Dr in Bryant, along the I-30 corridor',
  paragraphs: [
    'Modern Storage® Bryant is located at 300 Dell Drive in ZIP 72022, along the fast-growing I-30 corridor in Saline County. The facility serves customers across Bryant, Alexander, Benton, and parts of southwest Little Rock, with quick I-30 access for commuters heading north toward downtown Little Rock or south toward Hot Springs.',
    'Bryant has been one of the fastest-growing communities in central Arkansas for years, with new families, new subdivisions, and new small businesses arriving every season. Modern Storage® Bryant is sized to support that growth — climate-controlled units protect furniture, electronics, and family photos from Arkansas heat and humidity, drive-up access units handle garage overflow and renovation storage, and outdoor parking storage supports the area\'s active boat, RV, and trailer-owning population.',
    'New customers at Modern Storage® Bryant can take advantage of the free moving truck program at participating locations to make move-in easier — especially helpful for households moving between Bryant, Benton, and Little Rock. Reserve online or call 501-910-0096 to compare unit sizes and lock in your move-in date.',
  ],
  nearby: [
    {
      label: 'Bryant & Saline County, AR 72022',
      description: 'Primary service area — Bryant, Alexander, Benton, and the I-30 corridor.',
    },
    {
      label: 'I-30 corridor',
      description: 'Easy access to and from southwest Little Rock, Benton, and Hot Springs via I-30.',
    },
    {
      label: 'Hwy 5 & Reynolds Rd area',
      description: 'Convenient for Bryant residential growth and the area\'s active boat/RV-owning families.',
    },
  ],
  faqs: [
    ...defaultFaqs('bryant'),
    {
      q: 'What areas does Modern Storage® Bryant serve?',
      a: 'Modern Storage® Bryant primarily serves Bryant, Alexander, Benton, and the surrounding Saline County area along the I-30 corridor — ZIP 72022 and nearby. It\'s also convenient for customers in southwest Little Rock who prefer Bryant\'s pricing and slightly easier highway access.',
    },
    {
      q: 'Does Modern Storage® Bryant have parking for boats and RVs?',
      a: 'Yes — Modern Storage® Bryant offers boat, RV, and trailer parking. The Saline County area has a high concentration of boat-owning and outdoor families, and Bryant is positioned for storing rigs that don\'t fit on a residential driveway or in an HOA-restricted neighborhood. Space length and availability vary — check the live reservation page or call to confirm.',
    },
    {
      q: 'Is Modern Storage® Bryant good for renovation or moving storage?',
      a: 'Yes — Bryant is one of the fastest-growing communities in central Arkansas, and Modern Storage® Bryant supports a lot of renovation, moving, and downsizing storage. Climate-controlled units protect furniture and electronics during a renovation, drive-up units handle heavy garage contents, and month-to-month rentals mean you only pay through the project.',
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. HOT SPRINGS — 2138 Higdon Ferry Rd, 71913
// ─────────────────────────────────────────────────────────────────────────────
const HOT_SPRINGS: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Climate-controlled and drive-up self storage at 2138 Higdon Ferry Rd in Hot Springs, near Hot Springs Mall and Lake Hamilton',
  paragraphs: [
    'Modern Storage® Hot Springs is located at 2138 Higdon Ferry Road in ZIP 71913, near Hot Springs Mall and minutes from both Lake Hamilton and Hot Springs National Park. The facility serves customers across Hot Springs, Hot Springs Village (via Hwy 7), Lake Hamilton, Lakeside, and Pearcy, with quick access from Central Avenue and Airport Road.',
    'Hot Springs combines a year-round resident base with a steady flow of weekenders, retirees, and Lake Hamilton homeowners — and Modern Storage® Hot Springs serves all of them. Climate-controlled units are essential in this part of Arkansas given the mix of high summer humidity and the area\'s many lakefront second homes and seasonal residents. Drive-up access units support garage overflow, contractor and trade equipment, and the area\'s active outdoor lifestyle.',
    'The free moving truck program at participating Modern Storage® locations makes move-in easier for new customers — especially helpful for residents moving between Hot Springs and Hot Springs Village, or seasonal residents arriving from out of state. Reserve online or call 501-910-0096 to confirm unit sizes and current availability.',
  ],
  nearby: [
    {
      label: 'Hot Springs, AR 71913',
      description: 'Primary service area — central Hot Springs, Higdon Ferry corridor, and the Hot Springs Mall area.',
    },
    {
      label: 'Lake Hamilton & Lakeside',
      description: 'Lake-area customers, seasonal residents, and second-home owners across the Lake Hamilton shore.',
    },
    {
      label: 'Hot Springs Village & Hwy 7',
      description: 'Convenient for retirees and HSV residents needing climate-controlled or indoor storage close to home.',
    },
  ],
  faqs: [
    ...defaultFaqs('hot-springs'),
    {
      q: 'What areas does Modern Storage® Hot Springs serve?',
      a: 'Modern Storage® Hot Springs primarily serves central Hot Springs, the Higdon Ferry and Central Avenue corridors, the Hot Springs Mall area, Lake Hamilton, Lakeside, and Pearcy — ZIP 71913 and surrounding Garland County. It\'s also a popular option for Hot Springs Village residents looking for climate-controlled storage closer to town.',
    },
    {
      q: 'Why is climate-controlled storage important in Hot Springs?',
      a: 'Hot Springs combines a high summer humidity environment with a strong base of lakefront second homes and seasonal residents — both situations where climate-controlled storage is the smart choice. Climate-controlled units at Modern Storage® Hot Springs help protect furniture, leather, photos, documents, electronics, and seasonal lakehouse items from humidity damage and the area\'s temperature swings.',
    },
    {
      q: 'Is Modern Storage® Hot Springs convenient for Lake Hamilton residents?',
      a: 'Yes. Modern Storage® Hot Springs is on Higdon Ferry Road, with quick access to the Lake Hamilton shoreline communities — Lakeside, Pearcy, and the south-shore neighborhoods. It\'s a popular climate-controlled storage option for lake-area homeowners storing seasonal furniture, electronics, and household overflow.',
    },
    // ── Boat Storage Near Lake Hamilton vs Keeping a Boat at Home ────
    {
      q: 'Is boat storage better than keeping a boat at home near Lake Hamilton?',
      a: `Boat storage can help free up driveway space and provide dedicated protection when the boat is not in use.`,
    },
    {
      q: 'Why do Lake Hamilton boat owners use storage?',
      a: `Many homeowners have limited parking space or HOA restrictions.`,
    },
    {
      q: 'Can boat storage extend the life of my boat?',
      a: `Proper storage can help reduce exposure to weather and environmental wear.`,
    },
    // ── Indoor Boat Storage vs Outdoor Boat Storage Near Beaver Lake ─
    {
      q: 'What are the benefits of indoor boat storage near Beaver Lake?',
      a: `Indoor storage offers greater protection from sun, weather, and debris.`,
    },
    {
      q: 'Is outdoor boat storage more affordable?',
      a: `Outdoor storage is often less expensive and works well for many boat owners.`,
    },
    {
      q: 'Which option is best for long-term boat storage?',
      a: `Indoor storage generally provides the highest level of protection for long-term storage.`,
    },
    // ── Boat Storage Near Lake Ouachita ──────────────────────────────
    {
      q: 'Why use boat storage near Lake Ouachita?',
      a: `Convenient storage can help reduce towing time and simplify lake access.`,
    },
    {
      q: 'Can I store fishing gear with my boat?',
      a: `Many boat owners store gear, life jackets, and related equipment together.`,
    },
    {
      q: 'How does storage help during the off-season for Lake Ouachita boats?',
      a: `Storage provides a dedicated location when boating activity slows down.`,
    },
    // ── RV Storage for Lake Travelers ────────────────────────────────
    {
      q: 'Why do RV owners use storage near Hot Springs?',
      a: `Storage provides a convenient place to keep RVs between trips while freeing up space at home.`,
    },
    {
      q: 'Can RV storage help protect my vehicle?',
      a: `Covered and enclosed storage options can help reduce exposure to weather.`,
    },
    {
      q: 'Should I store my RV year-round?',
      a: `Many owners use RV storage throughout the year to simplify parking and maintenance.`,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. BENTONVILLE — 700 SW 14th St, 72712
// ─────────────────────────────────────────────────────────────────────────────
const BENTONVILLE: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Climate-controlled, business, and ground-floor storage at 700 SW 14th St in south Bentonville',
  paragraphs: [
    'Modern Storage® Bentonville is located at 700 SW 14th Street in ZIP 72712, in south Bentonville and minutes from the downtown Bentonville square, Walmart Home Office, Crystal Bridges Museum, and the I-49 / Walton Boulevard corridor. The facility serves customers across Bentonville, Bella Vista, Centerton, and the rapidly growing south Bentonville neighborhoods, with quick I-49 access for commuters and customers throughout Benton County.',
    'Bentonville is one of the fastest-growing cities in the country, fueled by Walmart, J.B. Hunt, Tyson, and the Northwest Arkansas tech and creative economy that surrounds them. Modern Storage® Bentonville is built for that pace — climate-controlled units protect furniture, electronics, documents, and family photos from Northwest Arkansas humidity, ground-floor access makes moves and business deliveries efficient, and the business storage option supports the area\'s contractors, e-commerce sellers, real estate teams, medical offices, and Walmart-supplier small businesses.',
    'The free moving truck program at Modern Storage® Bentonville helps new customers move in without renting a second vehicle — especially helpful for households relocating from Bella Vista, Rogers, Centerton, or out of state. Reserve online or call 501-910-0096 to compare unit sizes and confirm move-in availability.',
  ],
  nearby: [
    {
      label: 'Bentonville, AR 72712',
      description: 'Primary service area — south Bentonville, downtown square, and the SW 14th / Walton Blvd corridor.',
    },
    {
      label: 'Walmart HQ & Crystal Bridges',
      description: 'Convenient for Walmart corporate employees, suppliers, and the creative economy around Crystal Bridges.',
    },
    {
      label: 'Bella Vista & Centerton',
      description: 'Easy I-49 and Hwy 102 access for commuters from Bella Vista, Centerton, and northwest Benton County.',
    },
  ],
  faqs: [
    ...defaultFaqs('bentonville'),
    {
      q: 'What areas does Modern Storage® Bentonville serve?',
      a: 'Modern Storage® Bentonville primarily serves Bentonville, Bella Vista, Centerton, and the south Bentonville neighborhoods of ZIP 72712. It\'s also convenient for customers commuting from Rogers and northern Benton County via I-49 and Walton Boulevard.',
    },
    {
      q: 'Is Modern Storage® Bentonville a good fit for Walmart suppliers and small businesses?',
      a: 'Yes — Modern Storage® Bentonville offers business storage and ground-floor access designed for Walmart suppliers, contractors, e-commerce sellers, real estate teams, medical offices, and the wide ecosystem of small businesses serving the Northwest Arkansas economy. Climate-controlled units protect samples, electronics, and records.',
    },
    {
      q: 'Does Modern Storage® Bentonville have ground-floor access?',
      a: 'Yes. Ground-floor access at Modern Storage® Bentonville means no stairs or elevators between the parking area and your storage unit, which makes a real difference when moving heavy furniture, business inventory, samples, or office equipment. It\'s one of the main reasons businesses and downtown Bentonville households choose this location.',
    },
    // ── Storage Unit vs Shed in Bentonville ──────────────────────────
    {
      q: 'Is a storage unit better than a backyard shed in Bentonville?',
      a: `For many Bentonville residents, a storage unit offers more security, weather protection, and flexibility than a backyard shed. Storage units also eliminate the need for maintenance and repairs.`,
    },
    {
      q: 'Can a shed protect my belongings from Arkansas weather?',
      a: `While sheds provide basic protection, they may be vulnerable to humidity, temperature fluctuations, and severe weather. A storage unit often provides better protection for valuable items.`,
    },
    {
      q: 'What costs more: a storage unit or building a shed?',
      a: `Building a shed typically requires a larger upfront investment, while a storage unit offers affordable monthly rates without construction costs.`,
    },
    // ── Climate-Controlled Storage vs Garage in Bentonville ──────────
    {
      q: 'Why choose climate-controlled storage instead of a garage?',
      a: `Climate-controlled storage helps protect furniture, electronics, documents, and collectibles from heat, humidity, and temperature swings common in Arkansas.`,
    },
    {
      q: 'Can I store electronics in a garage?',
      a: `Garages often experience extreme temperatures that can damage electronics over time. Climate-controlled storage provides a more stable environment.`,
    },
    {
      q: 'Is climate-controlled storage worth the extra cost?',
      a: `For valuable or sensitive belongings, climate-controlled storage can help prevent costly damage and preserve items longer.`,
    },
    // ── Storage Unit vs Apartment Closet in Bentonville ──────────────
    {
      q: 'Why rent a storage unit instead of using my apartment closet?',
      a: `A storage unit provides significantly more space, helping reduce clutter and free up valuable living areas.`,
    },
    {
      q: 'What items are commonly moved from closets into storage?',
      a: `Seasonal decorations, sports equipment, extra furniture, and business inventory are frequently stored offsite.`,
    },
    {
      q: 'Can storage help make a smaller apartment feel larger?',
      a: `Yes. Removing infrequently used items can create a more organized and spacious living environment.`,
    },
    // ── Best Storage Option for Bentonville Residents ────────────────
    {
      q: 'What type of storage unit is best for Bentonville residents?',
      a: `The best option depends on what you're storing. Climate-controlled units are ideal for sensitive items, while standard units work well for household goods and equipment.`,
    },
    {
      q: 'How do I choose the right storage unit size?',
      a: `Consider the number of items, furniture pieces, and future storage needs. Many facilities offer size guides to help.`,
    },
    {
      q: 'Should I choose climate-controlled storage in Bentonville?',
      a: `If you're storing electronics, antiques, photographs, or wooden furniture, climate-controlled storage is often recommended.`,
    },
    // ── Apartment Storage in Bentonville ─────────────────────────────
    {
      q: 'Why do apartment residents use storage units in Bentonville?',
      a: `Storage units help apartment residents create more living space without upgrading to a larger apartment.`,
    },
    {
      q: 'What can I store during an apartment move in Bentonville?',
      a: `Furniture, boxes, seasonal items, and temporary overflow belongings are commonly stored during transitions.`,
    },
    {
      q: 'Can storage help with downsizing?',
      a: `Yes. A storage unit allows you to keep important possessions while reducing clutter at home.`,
    },
    // ── Storage for Walmart Vendors in Bentonville ───────────────────
    {
      q: 'Why do Walmart vendors use storage units in Bentonville?',
      a: `Many vendors need convenient space for product samples, displays, marketing materials, and inventory.`,
    },
    {
      q: 'Can a storage unit help support business operations?',
      a: `Yes. Storage units can provide flexible space without the expense of leasing additional office or warehouse space.`,
    },
    {
      q: 'What business items can be stored at Modern Storage® Bentonville?',
      a: `Trade show materials, inventory, fixtures, promotional items, and product samples are commonly stored.`,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. SPRINGDALE — 4555 W Sunset Ave, 72762
// ─────────────────────────────────────────────────────────────────────────────
const SPRINGDALE: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Climate-controlled and drive-up self storage at 4555 W Sunset Ave in west Springdale, near the I-49 corridor',
  paragraphs: [
    'Modern Storage® Springdale is located at 4555 West Sunset Avenue in ZIP 72762, in west Springdale along Hwy 412 and minutes from the I-49 interchange. The facility serves customers across Springdale, Tontitown, Johnson, west Rogers, and the rapidly growing residential corridor stretching toward Cave Springs and Lowell. Don Tyson Parkway, Elm Springs Road, and Highway 412 all feed directly into the facility.',
    'Springdale anchors the Northwest Arkansas economy alongside Tyson Foods, and the surrounding area is one of the fastest-growing residential markets in the country. Modern Storage® Springdale is built for that growth — climate-controlled units protect furniture, electronics, mattresses, photos, and family documents from Northwest Arkansas heat and humidity, while drive-up access units handle garage overflow, renovation storage, and contractor equipment.',
    'New customers at Modern Storage® Springdale can use the free moving truck program at participating locations to load directly from home to the unit — especially useful for moves between Springdale, Tontitown, and the Rogers / Bentonville corridor. Reserve online or call 501-910-0096 to compare unit sizes and current availability.',
  ],
  nearby: [
    {
      label: 'Springdale & Tontitown, AR 72762',
      description: 'Primary service area — west Springdale, Tontitown, Johnson, and the Hwy 412 corridor.',
    },
    {
      label: 'I-49 & Don Tyson Pkwy',
      description: 'Easy I-49 access for commuters from Rogers, Bentonville, Fayetteville, and Lowell.',
    },
    {
      label: 'Tyson HQ & west Rogers',
      description: 'Convenient for Tyson employees, west Rogers residents, and the Pinnacle Hills corridor.',
    },
  ],
  faqs: [
    ...defaultFaqs('springdale'),
    {
      q: 'What areas does Modern Storage® Springdale serve?',
      a: 'Modern Storage® Springdale primarily serves Springdale, Tontitown, Johnson, west Rogers, and the Cave Springs / Lowell corridor — ZIP 72762 and the broader Hwy 412 / I-49 area. It\'s also a popular choice for customers near the University of Arkansas and northern Fayetteville given its position on the I-49 corridor.',
    },
    {
      q: 'Is Modern Storage® Springdale good for college students?',
      a: 'Yes — Modern Storage® Springdale is a popular choice for University of Arkansas and Northwest Arkansas Community College students storing furniture, dorm gear, and seasonal items between semesters. A 5×5 or 5×10 unit usually covers a dorm room or single bedroom, and month-to-month rentals mean students aren\'t locked into a long lease.',
    },
    {
      q: 'How is Modern Storage® Springdale different from the Bentonville and Lowell locations?',
      a: 'All three Northwest Arkansas Modern Storage® locations offer climate-controlled units and the free moving truck program. Springdale focuses on household and drive-up storage along the Hwy 412 corridor. Bentonville adds business storage and ground-floor access, designed for the Walmart supplier and small-business economy. Lowell sits between Rogers and Springdale on I-49 and adds boat/RV storage to the mix.',
    },
    // ── Storage Unit vs Garage in Springdale ─────────────────────────
    {
      q: 'Why use storage instead of filling the garage in Springdale?',
      a: `Storage helps preserve parking space and keeps homes organized.`,
    },
    {
      q: 'Can I store seasonal equipment at Modern Storage® Springdale?',
      a: `Yes. Lawn equipment, decorations, and recreational gear are common storage items.`,
    },
    {
      q: 'Does storage help increase usable space at home?',
      a: `Absolutely. Many families use storage to reduce household clutter.`,
    },
    // ── Storage Unit vs Shed in Springdale ───────────────────────────
    {
      q: 'Storage unit vs backyard shed in Springdale — which is more affordable long term?',
      a: `The answer depends on usage, but storage units avoid construction and maintenance costs.`,
    },
    {
      q: 'Are storage units more secure than sheds in Springdale?',
      a: `Many facilities offer security features not commonly found with backyard sheds.`,
    },
    {
      q: 'Can a storage unit protect items from Springdale weather?',
      a: `Yes. Storage units often provide better protection from the elements than a backyard shed.`,
    },
    // ── Storage Unit vs Apartment Upgrade in Springdale ──────────────
    {
      q: 'Is a storage unit cheaper than moving to a larger apartment in Springdale?',
      a: `Often, yes. Storage can provide extra space at a much lower monthly cost.`,
    },
    {
      q: 'What do Springdale apartment residents commonly store?',
      a: `Furniture, seasonal items, business inventory, and hobby equipment.`,
    },
    {
      q: 'Can storage make apartment living easier in Springdale?',
      a: `Yes. Reducing clutter can make smaller spaces feel larger and more comfortable.`,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. LOWELL — 1407 W Monroe Ave, 72745
// ─────────────────────────────────────────────────────────────────────────────
const LOWELL: LocationPageContent = {
  needsLocalCopy: false,
  subtitle:
    'Climate-controlled, business, and boat/RV storage at 1407 W Monroe Ave in Lowell, on the I-49 corridor',
  paragraphs: [
    'Modern Storage® Lowell is located at 1407 West Monroe Avenue in ZIP 72745, right in the heart of the I-49 corridor between Rogers and Springdale. The facility serves customers across Lowell, Cave Springs, Pleasant Grove, southern Rogers, and northern Springdale — one of the most rapidly growing residential and business corridors in Northwest Arkansas. Monroe Avenue, Pleasant Grove Road, and I-49 all feed directly into the facility.',
    'Lowell is the rare Modern Storage® location that combines three storage categories under one roof — climate-controlled indoor units for household goods, business storage for the area\'s small companies and Walmart suppliers, and boat/RV parking for the active outdoor families that fill the Beaver Lake and Lake Sequoyah communities. That mix makes it the most flexible Northwest Arkansas location and a smart pick for households or businesses comparing options between Rogers, Bentonville, and Springdale.',
    'The free moving truck program at Modern Storage® Lowell helps new customers move in without renting a separate vehicle — useful for the constant moves happening between Lowell, Rogers, Bentonville, and Springdale. Reserve online or call 501-910-0096 to confirm climate-controlled unit sizes, business storage availability, or boat/RV space length for your rig.',
  ],
  nearby: [
    {
      label: 'Lowell, AR 72745',
      description: 'Primary service area — Lowell, Cave Springs, Pleasant Grove, and the I-49 corridor.',
    },
    {
      label: 'I-49 between Rogers & Springdale',
      description: 'Central location for customers moving between Rogers, Bentonville, Springdale, and Fayetteville.',
    },
    {
      label: 'Beaver Lake & Lake Sequoyah',
      description: 'Boat and RV storage option for Northwest Arkansas lake families and weekend boaters.',
    },
  ],
  faqs: [
    ...defaultFaqs('lowell'),
    {
      q: 'What areas does Modern Storage® Lowell serve?',
      a: 'Modern Storage® Lowell primarily serves Lowell, Cave Springs, Pleasant Grove, southern Rogers, and northern Springdale — ZIP 72745 and the surrounding I-49 corridor. The location is centrally positioned between Bentonville and Fayetteville, making it convenient for almost anywhere in Northwest Arkansas.',
    },
    {
      q: 'Does Modern Storage® Lowell offer boat and RV storage?',
      a: 'Yes — Modern Storage® Lowell offers boat, RV, trailer, and vehicle storage. The location is positioned for Northwest Arkansas customers near Beaver Lake, Lake Sequoyah, and the Bella Vista lake communities. Space length and availability vary; check the live reservation page or call 501-910-0096 to confirm a fit for your rig.',
    },
    {
      q: 'Is Modern Storage® Lowell a good fit for businesses?',
      a: 'Yes — Modern Storage® Lowell offers business storage and climate-controlled units, making it a flexible option for Walmart suppliers, e-commerce sellers, contractors, sales reps, and small businesses serving the Rogers / Bentonville / Springdale market. Drive-up access for inventory loading is available, and climate-controlled units protect samples, electronics, and records.',
    },
    {
      q: 'How is Modern Storage® Lowell different from the other Northwest Arkansas locations?',
      a: 'Lowell is the Northwest Arkansas location that combines all three categories — climate-controlled, business, and boat/RV storage. Bentonville focuses on business and ground-floor access; Springdale focuses on household and drive-up. If you want flexibility between household, business, and boat/RV at one Northwest Arkansas facility, Lowell is usually the right pick.',
    },
    // ── Storage Unit vs Larger Apartment in Northwest Arkansas ───────
    {
      q: 'Is renting a storage unit cheaper than upgrading apartments in Northwest Arkansas?',
      a: `In many cases, yes. A storage unit can provide extra space at a fraction of the cost of moving into a larger apartment.`,
    },
    {
      q: 'When does a storage unit make more sense than upgrading apartments?',
      a: `If you only need additional storage and not extra living space, a storage unit is often the more economical option.`,
    },
    {
      q: 'Can storage help delay a move in Northwest Arkansas?',
      a: `Many residents use storage to stay organized and avoid the expense of upgrading prematurely.`,
    },
    // ── Moving to Northwest Arkansas: PODS vs Self Storage ───────────
    {
      q: 'What is the difference between PODS and self storage in Northwest Arkansas?',
      a: `PODS are designed for moving and temporary storage, while self storage provides ongoing access to your belongings.`,
    },
    {
      q: 'Which option is more affordable long term — PODS or self storage?',
      a: `Self storage is often more cost-effective for extended storage needs.`,
    },
    {
      q: 'Can I access my belongings more easily with self storage?',
      a: `Yes. Most self storage facilities provide convenient access during operating hours.`,
    },
    // ── Self Storage vs Attic Storage in Northwest Arkansas ──────────
    {
      q: 'Is attic storage safe for household items in Northwest Arkansas?',
      a: `Attics can experience extreme temperatures and humidity, which may damage certain belongings.`,
    },
    {
      q: 'What items should not be stored in an attic?',
      a: `Electronics, photographs, documents, antiques, and wooden furniture can be vulnerable to attic conditions.`,
    },
    {
      q: 'Why choose a storage unit instead of attic storage?',
      a: `Storage units offer a more controlled environment and help free up space at home.`,
    },
    // ── Storage for New Residents Moving to Northwest Arkansas ───────
    {
      q: 'Why do new residents use storage during a move to Northwest Arkansas?',
      a: `Storage provides flexibility while waiting on housing, renovations, or closing dates.`,
    },
    {
      q: 'Can storage help during relocation delays?',
      a: `Yes. Many people use storage as a temporary solution when moving schedules change.`,
    },
    {
      q: 'What size storage unit do movers typically need in Northwest Arkansas?',
      a: `The size depends on the volume of belongings, but facilities can help recommend the right unit.`,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Map: slug → content. Every entry is now bespoke local copy.
// ─────────────────────────────────────────────────────────────────────────────
export const LOCATION_PAGE_CONTENT: Record<Slug, LocationPageContent> = {
  'west-little-rock': WEST_LITTLE_ROCK,
  shackleford: SHACKLEFORD,
  riverdale: RIVERDALE,
  'north-little-rock': NORTH_LITTLE_ROCK,
  maumelle: MAUMELLE,
  bryant: BRYANT,
  'hot-springs': HOT_SPRINGS,
  bentonville: BENTONVILLE,
  springdale: SPRINGDALE,
  lowell: LOWELL,
}

/** Best-effort fetch — falls back to null if the slug is unknown. */
export function getLocationPageContent(slug: string): LocationPageContent | null {
  if (slug in LOCATION_PAGE_CONTENT) {
    return LOCATION_PAGE_CONTENT[slug as Slug]
  }
  return null
}
