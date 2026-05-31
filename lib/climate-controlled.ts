// Content module for /climate-controlled — positioned as the authoritative
// climate-controlled / indoor / temperature-controlled storage page for
// Arkansas. Heavy on long-term storage, indoor storage, near-me intent,
// Arkansas climate context, comparison content, and business use cases.

export const CLIMATE_UNIT_SIZES = [
  {
    size: '5x5',
    sizeSlug: '5x5',
    title: '5x5 Climate-Controlled Storage Unit',
    image: '/images/modern-storage-5x5-climate-controlled-unit.png',
    alt: 'Modern Storage® 5x5 climate-controlled indoor storage unit for documents, electronics, and seasonal items',
    bestFor: 'Closet-sized indoor storage',
    fits: [
      'Boxes, books, and seasonal decor',
      'A small dresser or two end tables',
      'Photo albums and important documents',
      'Suitcases, small electronics, and a wine rack',
    ],
    climateNote:
      'Sized for the items most worth protecting: paper, photos, electronics, and anything that warps in humidity.',
  },
  {
    size: '5x10',
    sizeSlug: '5x10',
    title: '5x10 Climate-Controlled Storage Unit',
    image: '/images/modern-storage-5x10-climate-controlled-unit.png',
    alt: 'Modern Storage® 5x10 indoor climate-controlled storage unit for studio apartments and single rooms',
    bestFor: 'Studio apartment or single room',
    fits: [
      'Mattress set and small couch',
      'Dresser, nightstand, and chairs',
      'Boxes from a studio or one room',
      'Bicycle or sports equipment',
    ],
    climateNote:
      'A practical indoor size for renters between leases who want furniture protected from summer humidity year-round.',
  },
  {
    size: '10x10',
    sizeSlug: '10x10',
    title: '10x10 Climate-Controlled Storage Unit',
    image: '/images/modern-storage-10x10-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x10 indoor climate-controlled storage unit sized for a one-bedroom apartment',
    bestFor: 'One-bedroom apartment',
    fits: [
      'Bedroom and living room furniture',
      'Major appliances or a TV',
      '15–20 standard moving boxes',
      'Office equipment or filing cabinets',
    ],
    climateNote:
      'The most-requested climate-controlled size. Fits a full one-bedroom while keeping electronics, wood furniture, and upholstery in stable indoor conditions year-round.',
  },
  {
    size: '10x15',
    sizeSlug: '10x15',
    title: '10x15 Climate-Controlled Storage Unit',
    image: '/images/modern-storage-10x15-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x15 indoor climate-controlled storage unit for two-bedroom homes and long-term storage',
    bestFor: 'Two-bedroom home or condo',
    fits: [
      'Multiple bedroom sets',
      'Couch, recliner, and dining set',
      'Major appliances and patio furniture',
      'Holiday decor, boxes, and bins',
    ],
    climateNote:
      'Designed for two-bedroom moves and long-term storage where the whole load benefits from indoor climate protection — not just a few items.',
  },
  {
    size: '10x20',
    sizeSlug: '10x20',
    title: '10x20 Climate-Controlled Storage Unit',
    image: '/images/modern-storage-10x20-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x20 indoor climate-controlled storage unit for three-bedroom homes and business inventory',
    bestFor: 'Three-bedroom home',
    fits: [
      'Full living, dining, and bedroom sets',
      'Refrigerator, washer, and dryer',
      'Garage contents and tools',
      'Business inventory or records overflow',
    ],
    climateNote:
      'Whole-home volume with year-round climate control. Common for families between houses, renovations, military relocation, and long-term storage during deployment.',
  },
  {
    size: '10x30',
    sizeSlug: '10x30',
    title: '10x30 Climate-Controlled Storage Unit',
    image: '/images/modern-storage-10x30-climate-controlled-unit.png',
    alt: 'Modern Storage® 10x30 indoor climate-controlled storage unit for large homes and e-commerce inventory',
    bestFor: 'Large home or business volume',
    fits: [
      'Four to five bedrooms of furniture',
      'Large appliance sets and patio',
      'Contractor or trade equipment',
      'E-commerce inventory and pallets',
    ],
    climateNote:
      'Availability varies by location. Best for whole-home moves and inventory-heavy small businesses that need a stable indoor environment for long-term storage.',
  },
] as const

export const CLIMATE_CONCEPTS = [
  {
    title: 'Indoor access',
    body:
      'Indoor climate-controlled storage units are accessed from interior hallways inside an enclosed building, rather than from outdoor drive-up bays. Easier to load, unload, and visit in any Arkansas weather.',
  },
  {
    title: 'A more stable storage environment',
    body:
      'An insulated indoor space gives belongings a more consistent storage environment than a standard outdoor unit. Less direct exposure to outdoor air, dust, pollen, and pests entering from outside.',
  },
  {
    title: 'Buffer against Arkansas heat and cold swings',
    body:
      'Arkansas runs hot and humid in summer and can swing cold quickly in winter. A climate-controlled unit limits the worst of those daily and seasonal extremes from reaching the inside of your unit.',
  },
  {
    title: 'Security and monitoring',
    body:
      'Modern Storage® facilities are gated, surveilled, and use individually locked unit doors. Specific access hours, code or app entry, and on-site coverage details vary by facility — confirm with your local Modern Storage® team.',
  },
  {
    title: 'Ground-floor access',
    body:
      'Many Modern Storage® climate-controlled units offer ground-floor indoor access with no stairs between you and your unit. Ground-floor availability and sizes vary by facility.',
  },
  {
    title: 'Temperature range',
    body:
      'Climate-controlled units at Modern Storage® are kept within a managed indoor temperature range of approximately 59°F to 79°F. Exact temperatures vary by building, season, and HVAC cycle — but the day-to-day swing your belongings experience is far smaller than a non-climate-controlled garage, attic, or outdoor unit in Arkansas.',
  },
] as const

// Expanded "what belongs" list per SEO audit. Auditor flagged this as one of
// the strongest sections on the site and recommended expansion to become a
// "semantic monster". Now 18 items covering every long-tail keyword cluster:
// mattresses, clothing, holiday decor, medical records, wine, cameras, sewing
// equipment, and sports memorabilia added.
export const WHAT_TO_STORE = [
  {
    label: 'Wood furniture',
    description: 'Wood swells, warps, and cracks when humidity and temperature swing — stable indoor conditions help finishes and joinery last for years.',
  },
  {
    label: 'Leather furniture',
    description: 'Leather dries, cracks, and grows mildew in extreme heat or humidity. An indoor unit keeps couches and chairs in steadier conditions.',
  },
  {
    label: 'Mattresses',
    description: 'Mattresses absorb moisture and can grow mold in a humid garage or attic. Climate-controlled storage keeps them dry and odor-free for long-term storage.',
  },
  {
    label: 'Electronics',
    description: 'TVs, computers, audio gear, and gaming systems hold up better when stored away from outdoor temperature swings, dust, and condensation.',
  },
  {
    label: 'Photos and documents',
    description: 'Paper yellows, curls, and grows mold quickly in humid or unconditioned spaces — climate control keeps records and family photos legible.',
  },
  {
    label: 'Medical records',
    description: 'Medical files, dental records, and other regulated paper records need a stable indoor environment to remain legible and intact long-term.',
  },
  {
    label: 'Books',
    description: 'Bindings warp and pages mildew when humidity climbs. Climate-controlled storage protects a personal library or professional reference collection.',
  },
  {
    label: 'Art and framed prints',
    description: 'Canvases, prints, frames, and matting are sensitive to humidity and heat — indoor conditions prevent warping, fading, and foxing.',
  },
  {
    label: 'Musical instruments',
    description: 'Guitars, pianos, brass, and woodwinds need stable temperature and humidity to stay in tune and structurally sound.',
  },
  {
    label: 'Vinyl records',
    description: 'Records warp in heat and album sleeves mildew in humidity. A climate-controlled unit keeps a vinyl collection playable and properly stored.',
  },
  {
    label: 'Wine',
    description: 'Wine deteriorates fast in hot, fluctuating temperatures. Climate-controlled storage is a practical option for excess bottles a home cellar can\'t hold.',
  },
  {
    label: 'Clothing',
    description: 'Wool, leather, silk, and seasonal wardrobes mildew and absorb odors in humid storage. Indoor units keep clothing in wearable condition between seasons.',
  },
  {
    label: 'Holiday decor',
    description: 'Wreaths, lights, ornaments, and inflatables degrade fast in attic heat. Climate-controlled storage extends the life of holiday decor year over year.',
  },
  {
    label: 'Collectibles',
    description: 'Antiques, memorabilia, coins, comics, and trading cards lose value when exposed to temperature and humidity extremes.',
  },
  {
    label: 'Sports memorabilia',
    description: 'Signed jerseys, autographed baseballs, framed photos, and trading cards stay collector-grade in a stable, climate-controlled environment.',
  },
  {
    label: 'Cameras',
    description: 'Camera bodies, lenses, and accessories develop mold on internal optics when stored in damp conditions. Climate-controlled storage prevents fungus growth.',
  },
  {
    label: 'Sewing equipment',
    description: 'Sewing machines, sergers, and fabric supplies need stable indoor conditions to prevent rust on metal parts and moisture damage to fabric.',
  },
  {
    label: 'Business inventory',
    description: 'Retail stock, e-commerce inventory, samples, and records stay in saleable condition when stored in operating-grade indoor space.',
  },
] as const

// Big-number visual band rendered above the Arkansas factor cards.
// Lifts the strongest stats out of paragraph bodies and into scannable
// anchors — 2 seconds of "yes, this is real" vs. 45 seconds of reading.
// All numbers are taken directly from the factor card bodies below;
// no new claims, no SEO change.
export const ARKANSAS_CLIMATE_STATS = [
  { value: '70%+', label: 'Summer humidity' },
  { value: '100°F+', label: 'Heat indexes' },
  { value: '120°F+', label: 'Garage temps' },
  { value: '40°F', label: 'Single-day swing' },
] as const

// "Why Arkansas climate matters" — the regional context auditor said could
// become one of the strongest parts of the page. Builds regional topical
// authority through humidity, heat-index, mold-risk, garage-heat, attic-temp
// references that competitors largely ignore.
export const ARKANSAS_CLIMATE_CONTEXT = {
  intro:
    'Arkansas weather is the reason climate-controlled storage exists. Summers regularly push heat indexes above 100°F with high humidity, while winter cold fronts can drop temperatures 40°F in a single day. The result: garages, attics, and outdoor storage units experience swings that household belongings simply weren\'t built to survive.',
  factors: [
    {
      title: 'Summer humidity',
      body:
        'Arkansas summer humidity routinely exceeds 70% — enough to warp wood, mildew fabric, and grow mold on leather, paper, and instruments inside a non-climate-controlled space.',
    },
    {
      title: 'Heat indexes above 100°F',
      body:
        'Outdoor storage units and garages routinely hit 110°F+ in July and August. Electronics, vinyl, photographs, and adhesives can break down quickly in that range.',
    },
    {
      title: 'Rapid weather swings',
      body:
        'Arkansas winter cold fronts can drop temperatures 40°F in 24 hours. Repeated freeze-thaw cycles crack wood furniture finishes and stress sealed electronics.',
    },
    {
      title: 'Moisture and mold risk',
      body:
        'Humid air condenses on cool surfaces — sealed garages, basements, and outdoor units become mold and mildew incubators every summer. Climate control breaks the cycle.',
    },
    {
      title: 'Garage and attic temperatures',
      body:
        'Home garages can hit 120°F+ in direct summer sun. Attics run even hotter — well above the safe storage range for anything sentimental, valuable, or temperature-sensitive.',
    },
    {
      title: 'Pollen and dust exposure',
      body:
        'Arkansas has one of the highest pollen counts in the country. Outdoor units accumulate pollen and dust on every visit; indoor climate-controlled storage stays far cleaner.',
    },
  ],
} as const

// "Do You Actually Need Climate-Controlled Storage?" — the comparison content
// the auditor called "SEO gold". Direct answer to high-intent searches like
// "is climate controlled storage worth it" and "do I need climate-controlled
// storage". Two sided lists for fast scanning.
export const DO_YOU_NEED_CLIMATE = {
  worthIt: {
    title: 'Climate-Controlled Is Usually Worth It For:',
    items: [
      'Wood furniture and antiques',
      'Leather furniture and upholstery',
      'Electronics, TVs, and computers',
      'Family photos and documents',
      'Mattresses and bedding',
      'Musical instruments',
      'Wine, vinyl records, and collectibles',
      'Long-term storage of any household items',
      'Anything sentimental or hard to replace',
    ],
  },
  driveUpFine: {
    title: 'Standard Drive-Up Storage May Be Fine For:',
    items: [
      'Garden tools and lawn equipment',
      'Patio furniture and outdoor grills',
      'Garage and basement overflow',
      'Plastic bins and storage totes',
      'Sports equipment (durable items)',
      'Construction tools and trade supplies',
      'Short-term storage during a quick move',
      'Items that already live in a hot garage',
    ],
  },
} as const

// Comparison table — auditor: "This page BEGS for a comparison chart." Direct
// climate-controlled vs standard drive-up rows. Powers featured snippets and
// AI search extraction.
export const COMPARISON_ROWS: Array<{ aspect: string; climate: string; standard: string }> = [
  { aspect: 'Access',               climate: 'Indoor hallways, climate-controlled building', standard: 'Outdoor drive-up door' },
  { aspect: 'Temperature',          climate: 'Stable indoor range (~59°F – 79°F)',           standard: 'Same as outdoors' },
  { aspect: 'Humidity exposure',    climate: 'Reduced through enclosed indoor space',        standard: 'Full outdoor humidity' },
  { aspect: 'Best for',             climate: 'Furniture, electronics, photos, long-term',    standard: 'Tools, patio gear, durable items' },
  { aspect: 'Storage duration',     climate: 'Excellent for long-term & year-round storage', standard: 'Best for short-term & quick access' },
  { aspect: 'Cost',                 climate: 'Higher monthly rate (indoor & conditioned)',   standard: 'Lower monthly rate' },
  { aspect: 'Dust & pollen',        climate: 'Lower — enclosed indoor environment',          standard: 'Higher — outdoor exposure' },
  { aspect: 'Loading in bad weather', climate: 'Indoor — stays dry',                         standard: 'Outdoor — exposed to rain/snow' },
]

// Climate-controlled storage for businesses — auditor: "huge missed
// opportunity… business storage searches are valuable… broadens commercial
// intent significantly."
export const BUSINESS_USE_CASES = {
  intro:
    'Climate-controlled storage isn\'t just residential. Small businesses across the region use Modern Storage® for indoor storage of inventory, records, samples, and equipment that don\'t belong in a hot warehouse — at a fraction of commercial real-estate cost.',
  uses: [
    { label: 'Business records & archives',  body: 'Tax records, contracts, and HR files in a stable indoor environment that protects paper long-term.' },
    { label: 'Medical & dental files',       body: 'Regulated paper records that need a clean, dry, climate-stable environment for retention compliance.' },
    { label: 'Retail inventory',             body: 'Apparel, electronics, and seasonal stock that arrives in saleable condition every time you pull from storage.' },
    { label: 'Product samples',              body: 'Reps and showroom businesses use climate-controlled storage for samples that can\'t fade or warp.' },
    { label: 'E-commerce inventory',         body: 'Online sellers store packaged inventory indoors to prevent humidity damage to boxes, labels, and product.' },
    { label: 'Office electronics',           body: 'Spare computers, monitors, networking gear, and AV equipment between project phases or office moves.' },
    { label: 'Office furniture',             body: 'Conference tables, executive chairs, and reception furniture during office relocations or remodels.' },
    { label: 'Marketing materials',          body: 'Trade-show booths, signage, brochures, and event supplies kept ready for the next show.' },
  ],
} as const

// Trust signals — auditor: "Climate-controlled renters are more trust-sensitive
// than standard renters. Add: years in business, award mentions, occupancy /
// social proof, local expertise."
export const TRUST_SIGNALS = [
  {
    headline: 'Best of the Best Self-Storage Awards · 2023, 2024, 2025 winner',
    body: 'Three-time winner (2023, 2024, 2025) of the Best of the Best Self-Storage Awards by the Arkansas Democrat Gazette, plus recognition from Best of Northwest Arkansas.',
  },
  {
    headline: 'Trusted by families & businesses',
    body: 'Households and small businesses across central and Northwest regions rely on Modern Storage® for indoor, climate-controlled storage every day.',
  },
  {
    headline: 'Local on-site teams',
    body: 'On-site managers at every Modern Storage® location — not a call center 1,000 miles away. Real people who know the building and the units.',
  },
  {
    headline: 'Climate-controlled at every location',
    body: 'Climate-controlled storage units are available at all 10 Modern Storage® facilities across Arkansas, so there\'s always one near you.',
  },
] as const

export const CLIMATE_FAQS = [
  {
    q: 'What is climate-controlled storage?',
    a: `Climate-controlled storage means your unit is located inside an enclosed indoor building designed to provide a more stable storage environment than a standard outdoor drive-up unit. These indoor storage units are kept within a managed temperature range and protect belongings from the worst of Arkansas summer heat, winter cold, and humidity swings. At Modern Storage®, climate-controlled units are commonly used for furniture, electronics, documents, photos, mattresses, instruments, wine, business inventory, and long-term storage of any household items. Availability varies by location.`,
  },
  {
    q: 'Is climate-controlled storage worth it in Arkansas?',
    a: `Climate-controlled storage is usually worth it in Arkansas because the weather can shift from 100°F-plus humid summers to sub-freezing winter cold fronts in the same year. Garages routinely hit 120°F in summer and attics run even hotter — far above safe ranges for furniture, electronics, photos, instruments, and anything sentimental. Climate-controlled storage at Modern Storage® gives those items an indoor environment that stays stable year-round. If you'd hesitate to leave it in a hot garage, climate-controlled is the safer choice.`,
  },
  {
    q: 'Do I need climate-controlled storage or will drive-up be fine?',
    a: `Climate-controlled is the right call for wood furniture, leather, mattresses, electronics, photos, documents, mattresses, instruments, wine, vinyl, art, and long-term storage of household items. Standard drive-up storage is usually fine for tools, lawn equipment, patio furniture, plastic bins, and durable items you'll access often. If you're storing a mix, climate-controlled covers everything. If the items already live happily in a hot garage, drive-up is the more affordable option.`,
  },
  {
    q: 'What temperature are climate-controlled storage units kept at?',
    a: `Climate-controlled storage units at Modern Storage® are kept within a managed indoor temperature range of approximately 59°F to 79°F. Exact temperatures vary by building, season, and HVAC cycle — but the day-to-day swing belongings experience is far smaller than a non-climate-controlled garage, attic, or outdoor unit. For specific details about a facility's climate-control system, customers can call Modern Storage® at 501-910-0096.`,
  },
  {
    q: 'How does climate-controlled storage prevent mold and mildew?',
    a: `Mold and mildew grow when humid air condenses on cool surfaces — exactly what happens in a sealed garage, basement, or outdoor unit every Arkansas summer. Climate-controlled storage breaks the cycle by keeping the indoor air at a stable temperature and reducing humidity exposure inside the unit. The space stays drier, the air moves through an HVAC system, and mold doesn't get the conditions it needs to colonize fabric, paper, leather, or wood.`,
  },
  {
    q: 'Should I store mattresses in climate-controlled storage?',
    a: `Yes — mattresses are one of the items that benefit most from climate-controlled storage. Mattresses absorb moisture, and even a few weeks in a humid garage or basement can leave them smelling musty or growing mold inside the layers. A climate-controlled unit keeps them dry, odor-free, and ready to sleep on when you need them again. Store mattresses upright if possible, in a breathable cover.`,
  },
  {
    q: 'Should electronics go in climate-controlled storage?',
    a: `Yes — electronics should go in climate-controlled storage whenever possible. TVs, computers, monitors, speakers, gaming systems, office equipment, and appliances are sensitive to heat, cold, dust, and condensation. Climate-controlled units at Modern Storage® keep electronics in a stable indoor environment that helps protect screens, wiring, batteries, capacitors, and internal components from the temperature swings that cause early failure.`,
  },
  {
    q: 'Can I store vinyl records in climate-controlled storage?',
    a: `Yes — vinyl records belong in climate-controlled storage. Records warp permanently in heat above 90°F or so, and album sleeves grow mildew in humid conditions. A climate-controlled unit at Modern Storage® keeps a vinyl collection at safe indoor temperatures so records stay flat and playable, even during long-term storage.`,
  },
  {
    q: 'Is climate-controlled storage good for wine?',
    a: `Climate-controlled storage is a practical option for wine bottles that don't fit in a home cellar. Wine deteriorates quickly when stored above 70°F, and the indoor temperature range at Modern Storage® stays well within an acceptable range for everyday and mid-range bottles. For high-end investment-grade wine that requires precise cellar conditions, a dedicated wine-cellar facility is the better fit — but for everyday excess bottles, climate-controlled self-storage works well.`,
  },
  {
    q: 'Can I store clothing in climate-controlled storage?',
    a: `Yes — clothing is well-suited to climate-controlled storage. Wool, leather, silk, and seasonal wardrobes absorb humidity and mildew quickly in unconditioned spaces. A climate-controlled unit at Modern Storage® keeps clothing in wearable condition between seasons. Store items clean and dry in breathable garment bags or plastic bins, with cedar or silica gel to absorb residual moisture.`,
  },
  {
    q: 'Should antiques and collectibles be stored in climate-controlled storage?',
    a: `Antiques, coins, comics, trading cards, signed memorabilia, and other collectibles should always be stored in climate-controlled storage. Value drops quickly when these items are exposed to heat, humidity, or temperature swings — wood antiques crack, paper yellows, metal tarnishes, and cardboard absorbs moisture. The cost of a climate-controlled unit at Modern Storage® is small compared to the value preserved.`,
  },
  {
    q: 'Can I store firearms or guns in storage units?',
    a: `Firearms can be stored in self-storage units, including climate-controlled units at Modern Storage®, subject to applicable law and facility rules. Climate-controlled storage is recommended for guns because humidity causes rust on metal parts and warping on wood stocks. Ammunition has specific handling requirements — confirm what's permitted with the Modern Storage® location you reserve with before move-in.`,
  },
  {
    q: 'Can I use climate-controlled storage for musical instruments?',
    a: `Yes — climate-controlled storage is the right choice for guitars, pianos, brass, woodwinds, drums, and any wood, leather, or felt-containing instrument. Temperature and humidity swings cause wood to crack, glue joints to fail, drum heads to detune, and brass to develop tarnish. A Modern Storage® indoor climate-controlled unit keeps instruments structurally sound between gigs, lessons, or seasons.`,
  },
  {
    q: 'Can I store appliances in climate-controlled storage?',
    a: `Yes — refrigerators, washers, dryers, dishwashers, and small kitchen appliances can be stored in climate-controlled storage. Appliances should be cleaned, dried thoroughly, and have doors propped open before move-in to prevent mold growth in seals and interiors. Climate-controlled storage protects rubber gaskets, electronics, and metal components from the humidity that causes corrosion and seal failure.`,
  },
  {
    q: 'Is climate-controlled storage good for long-term storage?',
    a: `Climate-controlled storage is the recommended choice for long-term storage of household items, business inventory, and valuables. The longer something sits in storage, the more cumulative damage temperature swings and humidity can cause. Climate-controlled units at Modern Storage® stay stable year-round, so a year in storage looks the same as a month — without the warping, mildew, or fade that builds up in unconditioned spaces.`,
  },
  {
    q: 'What happens to climate-controlled storage during a power outage?',
    a: `Modern Storage® buildings are designed with insulation that keeps climate-controlled units stable for an extended period even during a temporary power outage. Brief outages have minimal impact on the indoor temperature inside a unit. Extended outages are rare; the on-site team monitors building systems and addresses HVAC issues as they arise to maintain a stable environment.`,
  },
  {
    q: `What's the difference between climate-controlled and heated storage?`,
    a: `Heated storage units only protect against freezing — they keep indoor temperatures above ~50°F in winter but don't address summer heat or humidity. Climate-controlled storage at Modern Storage® manages both heat and cold year-round, keeping the unit within a stable range across all seasons. In Arkansas, where summer humidity is the bigger threat to most belongings, climate-controlled is the more practical choice.`,
  },
  {
    q: 'Does climate-controlled storage have temperature monitoring?',
    a: `Modern Storage® climate-controlled buildings are managed by on-site teams who monitor HVAC systems and indoor conditions as part of regular operations. Specific monitoring technology, sensors, and alert systems vary by facility — for details about a particular Modern Storage® location, call 501-910-0096 and the team can walk through the building's climate-control setup.`,
  },
  {
    q: 'Are climate-controlled storage units more expensive than drive-up?',
    a: `Climate-controlled storage units typically cost more than standard drive-up storage because they sit inside enclosed, conditioned buildings. The extra cost is usually worth it when storing furniture, electronics, photos, instruments, business inventory, or anything with sentimental or financial value — repair or replacement costs from heat and humidity damage far exceed the premium. Modern Storage® lists current rates on each location's reservation page.`,
  },
  {
    q: 'Which Modern Storage® locations offer climate-controlled storage?',
    a: `Every Modern Storage® location offers climate-controlled storage — all 10 facilities, including Little Rock (Shackleford and Riverdale), West Little Rock, North Little Rock (North Hills Blvd and Maumelle Blvd), Bentonville, Bryant, Hot Springs, Springdale, and Lowell. Use the location finder on this page to reserve online at the nearest facility.`,
    aHtml: `Every Modern Storage® location offers climate-controlled storage — all 10 facilities, including Little Rock (<a href="/locations/shackleford">Shackleford</a> and <a href="/locations/riverdale">Riverdale</a>), <a href="/locations/west-little-rock">West Little Rock</a>, North Little Rock (<a href="/locations/north-little-rock">North Hills Blvd</a> and <a href="/locations/maumelle">Maumelle Blvd</a>), <a href="/locations/bentonville">Bentonville</a>, <a href="/locations/bryant">Bryant</a>, <a href="/locations/hot-springs">Hot Springs</a>, <a href="/locations/springdale">Springdale</a>, and <a href="/locations/lowell">Lowell</a>. Use the location finder on this page to reserve online at the nearest facility.`,
  },
  {
    q: 'How do I find climate-controlled storage near me?',
    a: `Use the location finder on this page to filter for climate-controlled-only Modern Storage® locations. The map shows every facility with indoor climate-controlled storage available, and the address and reserve-online link for each. Customers searching for climate-controlled storage near me will find a Modern Storage® location in most central and Northwest regions — Little Rock, Bentonville, Bryant, Hot Springs, Springdale, Lowell, and North Little Rock.`,
    aHtml: `Use the location finder on this page to filter for climate-controlled-only Modern Storage® locations. The map shows every facility with indoor climate-controlled storage available, and the address and reserve-online link for each. Customers searching for climate-controlled storage near me will find a Modern Storage® location in most central and Northwest regions — <a href="/locations/west-little-rock">Little Rock</a>, <a href="/locations/bentonville">Bentonville</a>, <a href="/locations/bryant">Bryant</a>, <a href="/locations/hot-springs">Hot Springs</a>, <a href="/locations/springdale">Springdale</a>, <a href="/locations/lowell">Lowell</a>, and <a href="/locations/north-little-rock">North Little Rock</a>.`,
  },
  {
    q: 'Can I reserve a climate-controlled unit online?',
    a: `Yes — climate-controlled units at Modern Storage® can be reserved online in under five minutes. Pick the nearest location, choose your unit size, and complete the reservation from your phone, tablet, or laptop. Online reservations make it easy to compare indoor climate-controlled availability at multiple Modern Storage® facilities before visiting.`,
  },
  {
    q: 'What size climate-controlled storage unit do I need?',
    a: `The right climate-controlled storage unit size depends on what you're storing. A 5x5 climate-controlled unit (25 sq ft) holds boxes, documents, photos, and small valuables. A 5x10 fits a single room of furniture or college storage. A 10x10 fits a one-bedroom apartment, while 10x15, 10x20, and 10x30 sizes are sized for two-bedroom, three-bedroom, and whole-home moves respectively. Use the size guide on this page or try the AI Storage Size Finder for a personalized recommendation.`,
  },
  // ── Comparison-style entries (climate vs other storage formats) ─────
  // Skipped: "Heated Storage vs Climate-Controlled" — covered above by
  // "What's the difference between climate-controlled and heated storage?"
  // Skipped: "Antiques vs Standard Storage" — covered by the existing
  // antiques entry. Skipped: "Is Climate-Controlled Storage Necessary in
  // Arkansas?" — covered by the existing "Is it worth it in Arkansas?"
  {
    q: 'Climate-Controlled vs Standard Storage — what is the difference?',
    a: `Climate-controlled storage maintains a more consistent environment than standard storage units. Standard units are excellent for many household items, but climate-controlled storage is often preferred for temperature-sensitive belongings.`,
  },
  {
    q: 'Indoor Storage vs Outdoor Storage — what is the difference?',
    a: `Indoor storage units are located within a building and provide additional protection from weather exposure. Outdoor storage offers convenient drive-up access and is often more affordable.`,
  },
  {
    q: 'Climate-Controlled Storage vs Garage — which is better?',
    a: `Garages often experience significant temperature swings throughout the year. Climate-controlled storage provides a more stable environment that may better protect furniture, electronics, and collectibles.`,
  },
  {
    q: 'Climate-Controlled Storage vs Basement — which is better?',
    a: `Basements can be susceptible to moisture, humidity, and occasional water intrusion. Climate-controlled storage offers a more predictable environment for long-term storage.`,
  },
  {
    q: 'Climate-Controlled Storage vs Attic — which is better?',
    a: `Attics frequently experience extreme temperatures. Climate-controlled storage helps reduce exposure to excessive heat that can affect furniture, photographs, electronics, and documents.`,
  },
  {
    q: 'Climate-Controlled Storage for Electronics vs Standard Storage',
    a: `Electronics can be sensitive to extreme temperatures and humidity. Climate-controlled storage provides a more consistent environment for computers, televisions, and other electronic devices.`,
  },
  {
    q: 'Climate-Controlled Storage for Furniture vs Standard Storage',
    a: `Wood furniture, leather furniture, and upholstered items often benefit from stable storage conditions. Climate-controlled storage may help reduce risks associated with prolonged temperature fluctuations.`,
  },
  {
    q: 'Is Climate-Controlled Storage Worth the Extra Cost?',
    a: `For valuable, sentimental, or temperature-sensitive belongings, many customers find the additional protection worthwhile. For durable items such as tools and outdoor equipment, standard storage may be sufficient.`,
  },
  // ── Arkansas-specific comparisons ──────────────────────────────────
  {
    q: 'Climate-Controlled Storage vs Garage in Arkansas',
    a: `Arkansas summers regularly bring high heat and humidity. Climate-controlled storage provides a more stable alternative to a residential garage for sensitive belongings.`,
  },
  {
    q: 'Climate-Controlled Storage vs Attic in Arkansas',
    a: `Attics in Arkansas can become extremely hot during summer months. Climate-controlled storage offers a cooler and more consistent environment.`,
  },
  {
    q: 'Climate-Controlled Storage vs Basement in Arkansas',
    a: `Arkansas basements can experience humidity issues depending on construction and location. Climate-controlled storage provides additional environmental stability.`,
  },
  {
    q: 'Climate-Controlled Storage vs Standard Storage in Arkansas',
    a: `Many items store well in standard storage, but climate-controlled units may be preferred for electronics, furniture, documents, and collectibles due to Arkansas weather conditions.`,
  },
  {
    q: 'Indoor Storage vs Outdoor Storage in Arkansas Summers',
    a: `Indoor storage provides additional protection from summer heat and weather exposure, while outdoor storage offers convenient access and lower cost.`,
  },
  {
    q: 'Best Storage Option for Arkansas Heat',
    a: `For heat-sensitive items, climate-controlled indoor storage generally offers the highest level of protection during Arkansas summers.`,
  },
] as const

export const CLIMATE_REVIEWS = [
  {
    quote: `Just rented a unit at Modern Storage® Springdale and I'm seriously impressed. Hunter helped me get set up and showed me my temperature-controlled 10x20 unit, which was exactly what I needed. Easy process, clean facility, and great service overall.`,
    initials: 'J',
    author: 'Jeffrey B.',
    location: 'Modern Storage® Springdale',
    facilitySlug: 'springdale',
    theme: 'Climate-controlled fit',
  },
  {
    quote: `Modern Storage® West Little Rock has professional, knowledgeable, and friendly staff, a clean and secure environment, and an easy move-in process. Great location, competitive pricing, gated access, and personal access codes. Very happy to be here!`,
    initials: 'S',
    author: 'Sholanda G.',
    location: 'Modern Storage® West Little Rock',
    facilitySlug: 'west-little-rock',
    theme: 'Easy move-in',
  },
  {
    quote: `From the moment we walked into Modern Storage® Bentonville, the team made us feel taken care of. Friendly guidance, expert knowledge, and a smooth experience from start to finish. We'll absolutely recommend Modern Storage® Bentonville to others.`,
    initials: 'H',
    author: 'Holly G.',
    location: 'Modern Storage® Bentonville',
    facilitySlug: 'bentonville',
    theme: 'Helpful team',
  },
] as const
