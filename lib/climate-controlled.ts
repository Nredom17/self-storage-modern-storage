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
    // Rewritten 2026-06-05 verbatim from Alexandra's copy — cleaner,
    // less Arkansas-specific framing for the foundational "What is"
    // FAQ. The "Benefits" bullet list lives in aHtml; the plain-text
    // `a` still reads as one coherent answer for the FAQPage schema.
    q: 'What is climate-controlled storage?',
    a: `Climate-controlled storage is an indoor storage unit located inside a fully enclosed building where temperatures are managed year-round. Unlike standard outdoor storage units, climate-controlled units help reduce exposure to extreme heat, cold, humidity, dust, and weather-related fluctuations. At Modern Storage®, climate-controlled units are maintained in a managed indoor environment designed to provide more stable conditions than outdoor storage. Benefits of climate-controlled storage: indoor access from enclosed hallways; more consistent temperatures throughout the year; reduced exposure to humidity and moisture; less dust, pollen, and debris; added protection for sensitive belongings; comfortable loading and unloading regardless of weather.`,
    aHtml: `<p>Climate-controlled storage is an indoor storage unit located inside a fully enclosed building where temperatures are managed year-round. Unlike standard outdoor storage units, climate-controlled units help reduce exposure to extreme heat, cold, humidity, dust, and weather-related fluctuations.</p><p>At Modern Storage®, climate-controlled units are maintained in a managed indoor environment designed to provide more stable conditions than outdoor storage.</p><p><strong>Benefits of climate-controlled storage:</strong></p><ul><li>Indoor access from enclosed hallways</li><li>More consistent temperatures throughout the year</li><li>Reduced exposure to humidity and moisture</li><li>Less dust, pollen, and debris</li><li>Added protection for sensitive belongings</li><li>Comfortable loading and unloading regardless of weather</li></ul>`,
  },
  {
    // Net-new FAQ 2026-06-05 verbatim from Alexandra's copy. Sits
    // right after "What is" so the natural follow-up ("what goes
    // in one?") is answered immediately.
    q: 'What items are commonly stored in climate-controlled units?',
    a: `Climate-controlled storage is often chosen for furniture, electronics, family photos and documents, antiques and collectibles, musical instruments, business inventory, mattresses, and artwork. Availability varies by location.`,
    aHtml: `<p>Climate-controlled storage is often chosen for:</p><ul><li>Furniture</li><li>Electronics</li><li>Family photos and documents</li><li>Antiques and collectibles</li><li>Musical instruments</li><li>Business inventory</li><li>Mattresses</li><li>Artwork</li></ul><p>Availability varies by location.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. The
    // "worth it" answer now includes both side decision lists
    // (worth it vs not needed) so a single FAQ covers the whole
    // decision framework — the previous version only listed the
    // "yes" cases.
    q: 'Is climate-controlled storage worth it in Arkansas?',
    a: `Yes, climate-controlled storage is often worth the additional cost in Arkansas because the state experiences high humidity, extreme summer heat, and rapid seasonal temperature changes. The real question is not whether climate control is better. It is whether the items you're storing could be damaged by heat, moisture, or humidity. Climate-controlled storage is usually worth it if you are storing wood or leather furniture, electronics and televisions, important documents, family photos, artwork or collectibles, musical instruments, vinyl records, business records or inventory, or items being stored longer than 3 to 6 months. You may not need climate-controlled storage for lawn equipment, outdoor furniture, plastic storage bins, metal tools, vehicles, or items designed for outdoor use.`,
    aHtml: `<p>Yes, climate-controlled storage is often worth the additional cost in Arkansas because the state experiences high humidity, extreme summer heat, and rapid seasonal temperature changes.</p><p>The real question is not whether climate control is better. It is whether the items you're storing could be damaged by heat, moisture, or humidity.</p><p><strong>Climate-controlled storage is usually worth it if you are storing:</strong></p><ul><li>Wood or leather furniture</li><li>Electronics and televisions</li><li>Important documents</li><li>Family photos</li><li>Artwork or collectibles</li><li>Musical instruments</li><li>Vinyl records</li><li>Business records or inventory</li><li>Items being stored longer than 3 to 6 months</li></ul><p><strong>You may not need climate-controlled storage for:</strong></p><ul><li>Lawn equipment</li><li>Outdoor furniture</li><li>Plastic storage bins</li><li>Metal tools</li><li>Vehicles</li><li>Items designed for outdoor use</li></ul>`,
  },
  {
    // Net-new FAQ 2026-06-05 verbatim from Alexandra's copy. Sits
    // right after "worth it" so cost is addressed as the natural
    // next question. Replaces the previous "Are climate-controlled
    // units more expensive than drive-up?" entry further down in
    // the array, which read as a flat one-liner.
    q: 'How much more does climate-controlled storage cost?',
    a: `Climate-controlled units typically cost more than standard drive-up units, but many renters find the added protection worthwhile when storing valuable or sentimental items. If replacing the item would cost significantly more than the monthly upgrade, climate-controlled storage is usually the safer choice.`,
    aHtml: `<p>Climate-controlled units typically cost more than standard drive-up units, but many renters find the added protection worthwhile when storing valuable or sentimental items.</p><p>If replacing the item would cost significantly more than the monthly upgrade, climate-controlled storage is usually the safer choice.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. The
    // "simple rule" closer is the AEO money line — gives AI
    // engines a clean one-sentence answer to quote.
    q: 'Do I need climate-controlled storage or will drive-up be fine?',
    a: `The best storage type depends on what you're storing and how long you'll store it. Choose climate-controlled storage when you're protecting items that can be damaged by heat, humidity, or temperature fluctuations — climate-controlled units are especially useful for long-term storage and valuable belongings. Choose standard drive-up storage when convenience and affordability are the priority and the items are built to handle normal outdoor conditions. Climate-controlled storage is usually best for valuable or sentimental belongings, long-term storage, business records and inventory, furniture and home furnishings, electronics and media equipment, and collectibles and antiques. Drive-up storage is usually best for lawn equipment, outdoor furniture, tools, construction materials, seasonal decorations, and short-term storage during a move. A simple rule: if replacing the item would be expensive or impossible, climate-controlled storage is usually the safer choice.`,
    aHtml: `<p>The best storage type depends on what you're storing and how long you'll store it.</p><p>Choose <strong>climate-controlled storage</strong> when you're protecting items that can be damaged by heat, humidity, or temperature fluctuations. Climate-controlled units are especially useful for long-term storage and valuable belongings.</p><p>Choose <strong>standard drive-up storage</strong> when convenience and affordability are the priority and the items are built to handle normal outdoor conditions.</p><p><strong>Climate-controlled storage is usually best for:</strong></p><ul><li>Valuable or sentimental belongings</li><li>Long-term storage</li><li>Business records and inventory</li><li>Furniture and home furnishings</li><li>Electronics and media equipment</li><li>Collectibles and antiques</li></ul><p><strong>Drive-up storage is usually best for:</strong></p><ul><li>Lawn equipment</li><li>Outdoor furniture</li><li>Tools</li><li>Construction materials</li><li>Seasonal decorations</li><li>Short-term storage during a move</li></ul><p><em>A simple rule:</em> if replacing the item would be expensive or impossible, climate-controlled storage is usually the safer choice.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Tiered
    // risk-level structure (below 50% / 50-60% / 60-70% / 70-80% /
    // above 80%) replaces the flat "Above 60%" bullet list.
    q: 'What humidity level damages stored items?',
    a: `Most stored belongings begin experiencing increased risk once relative humidity remains above 60% for extended periods. Humidity itself is often more damaging than temperature because moisture becomes trapped inside fabrics, paper products, wood, and electronics. General humidity risk levels: below 50% humidity — generally considered safe for most stored belongings. 50-60% humidity — low risk for most items; long-term storage is usually acceptable. 60-70% humidity — mold and mildew risks begin increasing; paper, fabric, and wood can start absorbing moisture. 70-80% humidity — warping, corrosion, and adhesive failure become more common; books, photos, and furniture may show damage. Above 80% humidity — high risk of mold growth; electronics and sensitive materials become vulnerable to moisture damage. Arkansas outdoor humidity frequently exceeds these levels during the summer, which is one reason many renters choose climate-controlled storage for sensitive belongings.`,
    aHtml: `<p>Most stored belongings begin experiencing increased risk once relative humidity remains above <strong>60%</strong> for extended periods.</p><p>Humidity itself is often more damaging than temperature because moisture becomes trapped inside fabrics, paper products, wood, and electronics.</p><p><strong>General humidity risk levels</strong></p><p><strong>Below 50% humidity</strong></p><ul><li>Generally considered safe for most stored belongings</li></ul><p><strong>50-60% humidity</strong></p><ul><li>Low risk for most items</li><li>Long-term storage is usually acceptable</li></ul><p><strong>60-70% humidity</strong></p><ul><li>Mold and mildew risks begin increasing</li><li>Paper, fabric, and wood can start absorbing moisture</li></ul><p><strong>70-80% humidity</strong></p><ul><li>Warping, corrosion, and adhesive failure become more common</li><li>Books, photos, and furniture may show damage</li></ul><p><strong>Above 80% humidity</strong></p><ul><li>High risk of mold growth</li><li>Electronics and sensitive materials become vulnerable to moisture damage</li></ul><p>Arkansas outdoor humidity frequently exceeds these levels during the summer, which is one reason many renters choose climate-controlled storage for sensitive belongings.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Cleaner
    // framing — leads with the problems climate-controlled helps
    // reduce, then closes with the structural reason it works.
    q: 'Does climate-controlled storage prevent damage from Arkansas summer humidity?',
    a: `Climate-controlled storage helps reduce the humidity exposure that causes many common storage problems in Arkansas, including mold, mildew, warping, corrosion, and musty odors. During Arkansas summers, outdoor humidity frequently exceeds 70%, and enclosed spaces such as garages, attics, sheds, and non-conditioned storage units can trap moisture for weeks at a time. Over time, that moisture can damage sensitive belongings. Common humidity-related problems climate-controlled storage helps reduce: mold and mildew growth; wood swelling and warping; rust and corrosion on metal; damage to photographs and documents; musty odors in fabrics and mattresses; moisture buildup inside electronics. Because climate-controlled units are located inside enclosed, conditioned buildings, they provide a more stable environment than standard outdoor storage.`,
    aHtml: `<p>Climate-controlled storage helps reduce the humidity exposure that causes many common storage problems in Arkansas, including mold, mildew, warping, corrosion, and musty odors.</p><p>During Arkansas summers, outdoor humidity frequently exceeds 70%, and enclosed spaces such as garages, attics, sheds, and non-conditioned storage units can trap moisture for weeks at a time. Over time, that moisture can damage sensitive belongings.</p><p><strong>Common humidity-related problems climate-controlled storage helps reduce</strong></p><ul><li>Mold and mildew growth</li><li>Wood swelling and warping</li><li>Rust and corrosion on metal</li><li>Damage to photographs and documents</li><li>Musty odors in fabrics and mattresses</li><li>Moisture buildup inside electronics</li></ul><p>Because climate-controlled units are located inside enclosed, conditioned buildings, they provide a more stable environment than standard outdoor storage.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Adds
    // the "Why temperature consistency matters" bullet list so the
    // answer goes beyond just the temperature range.
    q: 'What temperature are climate-controlled storage units kept at?',
    a: `Climate-controlled storage units at Modern Storage® are maintained within a managed indoor temperature range of approximately 59°F to 79°F. The goal of climate-controlled storage is not to keep units at one exact temperature. Instead, the facility uses indoor HVAC systems to help maintain a more consistent environment throughout the year compared to garages, attics, sheds, or standard outdoor storage units. Why temperature consistency matters: reduces expansion and contraction of materials; helps protect furniture and wood finishes; reduces stress on electronics; helps preserve photographs and documents; creates a more comfortable indoor storage environment. Exact temperatures may vary slightly based on season, building design, and HVAC cycling.`,
    aHtml: `<p>Climate-controlled storage units at Modern Storage® are maintained within a managed indoor temperature range of approximately <strong>59°F to 79°F</strong>.</p><p>The goal of climate-controlled storage is not to keep units at one exact temperature. Instead, the facility uses indoor HVAC systems to help maintain a more consistent environment throughout the year compared to garages, attics, sheds, or standard outdoor storage units.</p><p><strong>Why temperature consistency matters</strong></p><ul><li>Reduces expansion and contraction of materials</li><li>Helps protect furniture and wood finishes</li><li>Reduces stress on electronics</li><li>Helps preserve photographs and documents</li><li>Creates a more comfortable indoor storage environment</li></ul><p>Exact temperatures may vary slightly based on season, building design, and HVAC cycling.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Question
    // changed from "prevent mold and mildew" to "help prevent" —
    // matches her cleaner, hedged language. Adds two bullet lists:
    // why mold develops, and how climate-controlled helps.
    q: 'How does climate-controlled storage help prevent mold and mildew?',
    a: `Mold and mildew thrive in damp, humid environments. In Arkansas, garages, attics, sheds, basements, and outdoor storage units can experience prolonged periods of high humidity that allow moisture to accumulate on stored belongings. Climate-controlled storage helps reduce humidity exposure by keeping belongings inside an enclosed, conditioned building with a more stable indoor environment than standard outdoor storage. Why mold develops in storage: high humidity levels; limited air circulation; condensation on surfaces; long-term moisture exposure. How climate-controlled storage helps: reduces humidity exposure; limits condensation caused by temperature swings; provides a more consistent indoor environment; helps protect fabrics, paper, wood, and other moisture-sensitive items. While no storage environment can completely eliminate risk, climate-controlled storage is generally the best option for items vulnerable to mold and mildew.`,
    aHtml: `<p>Mold and mildew thrive in damp, humid environments. In Arkansas, garages, attics, sheds, basements, and outdoor storage units can experience prolonged periods of high humidity that allow moisture to accumulate on stored belongings.</p><p>Climate-controlled storage helps reduce humidity exposure by keeping belongings inside an enclosed, conditioned building with a more stable indoor environment than standard outdoor storage.</p><p><strong>Why mold develops in storage</strong></p><ul><li>High humidity levels</li><li>Limited air circulation</li><li>Condensation on surfaces</li><li>Long-term moisture exposure</li></ul><p><strong>How climate-controlled storage helps</strong></p><ul><li>Reduces humidity exposure</li><li>Limits condensation caused by temperature swings</li><li>Provides a more consistent indoor environment</li><li>Helps protect fabrics, paper, wood, and other moisture-sensitive items</li></ul><p>While no storage environment can completely eliminate risk, climate-controlled storage is generally the best option for items vulnerable to mold and mildew.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Adds
    // mattress-type recommendation list + a tips bullet list,
    // replaces the previous one-paragraph answer.
    q: 'Should I store mattresses in climate-controlled storage?',
    a: `Yes. Climate-controlled storage is often recommended for mattresses because mattresses can absorb moisture, odors, and humidity during storage. A mattress stored in a garage, attic, basement, or non-conditioned unit may be exposed to temperature fluctuations and elevated humidity levels that can affect fabrics, foam, and internal materials over time. Climate-controlled storage is recommended for memory foam mattresses, pillow-top mattresses, hybrid mattresses, guest room mattresses, and long-term mattress storage. Mattress storage tips: use a breathable mattress cover; store the mattress clean and dry; avoid placing items on top of the mattress; follow the manufacturer's storage recommendations; store upright if permitted by the manufacturer. Climate-controlled storage helps provide a more stable environment for long-term mattress storage than most non-conditioned spaces.`,
    aHtml: `<p>Yes. Climate-controlled storage is often recommended for mattresses because mattresses can absorb moisture, odors, and humidity during storage.</p><p>A mattress stored in a garage, attic, basement, or non-conditioned unit may be exposed to temperature fluctuations and elevated humidity levels that can affect fabrics, foam, and internal materials over time.</p><p><strong>Climate-controlled storage is recommended for:</strong></p><ul><li>Memory foam mattresses</li><li>Pillow-top mattresses</li><li>Hybrid mattresses</li><li>Guest room mattresses</li><li>Long-term mattress storage</li></ul><p><strong>Mattress storage tips</strong></p><ul><li>Use a breathable mattress cover</li><li>Store the mattress clean and dry</li><li>Avoid placing items on top of the mattress</li><li>Follow the manufacturer's storage recommendations</li><li>Store upright if permitted by the manufacturer</li></ul><p>Climate-controlled storage helps provide a more stable environment for long-term mattress storage than most non-conditioned spaces.</p>`,
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
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Adds
    // the "appropriate for" list and the "when to consider a
    // dedicated wine cellar" qualifier so the answer reads
    // balanced — climate-controlled covers everyday wine, but
    // a wine cellar is better for investment-grade.
    q: 'Is climate-controlled storage good for wine?',
    a: `Yes. Climate-controlled storage is generally a better option for wine than a garage, attic, shed, or standard outdoor storage unit because wine is sensitive to heat and temperature fluctuations. Extended exposure to elevated temperatures can affect a wine's flavor, aroma, and aging process. Climate-controlled storage helps provide a more stable environment than most non-conditioned spaces. Climate-controlled storage may be appropriate for everyday wine collections, seasonal wine storage, short- to medium-term wine storage, and overflow bottles that do not fit in a home wine refrigerator. When to consider a dedicated wine cellar: collectors storing rare, investment-grade, or long-term aging wines may benefit from a dedicated wine storage facility designed specifically for wine preservation. Climate-controlled storage is often a practical solution for everyday wine storage, but it is not a substitute for a professionally managed wine cellar.`,
    aHtml: `<p>Yes. Climate-controlled storage is generally a better option for wine than a garage, attic, shed, or standard outdoor storage unit because wine is sensitive to heat and temperature fluctuations.</p><p>Extended exposure to elevated temperatures can affect a wine's flavor, aroma, and aging process. Climate-controlled storage helps provide a more stable environment than most non-conditioned spaces.</p><p><strong>Climate-controlled storage may be appropriate for:</strong></p><ul><li>Everyday wine collections</li><li>Seasonal wine storage</li><li>Short- to medium-term wine storage</li><li>Overflow bottles that do not fit in a home wine refrigerator</li></ul><p><strong>When to consider a dedicated wine cellar</strong></p><p>Collectors storing rare, investment-grade, or long-term aging wines may benefit from a dedicated wine storage facility designed specifically for wine preservation.</p><p>Climate-controlled storage is often a practical solution for everyday wine storage, but it is not a substitute for a professionally managed wine cellar.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Two
    // bullet lists added — clothing items that benefit, and
    // clothing storage tips.
    q: 'Can I store clothing in climate-controlled storage?',
    a: `Yes. Climate-controlled storage is often recommended for clothing because fabrics can absorb moisture, odors, and humidity during storage. Natural materials such as wool, leather, silk, and cotton are especially vulnerable to prolonged humidity exposure. Climate-controlled storage helps provide a more stable environment than garages, attics, basements, or standard outdoor units. Clothing items that benefit from climate-controlled storage: seasonal wardrobes, formal wear, leather jackets, wool coats, vintage clothing, designer apparel, uniforms and specialty garments. Clothing storage tips: wash and dry clothing before storage; use breathable garment bags when appropriate; store items in clean containers; avoid overpacking boxes; consider moisture absorbers for long-term storage. Climate-controlled storage can help reduce moisture-related risks and is often preferred for long-term clothing storage.`,
    aHtml: `<p>Yes. Climate-controlled storage is often recommended for clothing because fabrics can absorb moisture, odors, and humidity during storage.</p><p>Natural materials such as wool, leather, silk, and cotton are especially vulnerable to prolonged humidity exposure. Climate-controlled storage helps provide a more stable environment than garages, attics, basements, or standard outdoor units.</p><p><strong>Clothing items that benefit from climate-controlled storage</strong></p><ul><li>Seasonal wardrobes</li><li>Formal wear</li><li>Leather jackets</li><li>Wool coats</li><li>Vintage clothing</li><li>Designer apparel</li><li>Uniforms and specialty garments</li></ul><p><strong>Clothing storage tips</strong></p><ul><li>Wash and dry clothing before storage</li><li>Use breathable garment bags when appropriate</li><li>Store items in clean containers</li><li>Avoid overpacking boxes</li><li>Consider moisture absorbers for long-term storage</li></ul><p>Climate-controlled storage can help reduce moisture-related risks and is often preferred for long-term clothing storage.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Less
    // absolute framing ("often recommended" vs the previous
    // "should always be stored"), plus a 9-item collectibles list
    // covering antique furniture, coins, comics, trading cards,
    // sports memorabilia, signed collectibles, vintage toys,
    // artwork, and historical documents.
    q: 'Should antiques and collectibles be stored in climate-controlled storage?',
    a: `Yes. Climate-controlled storage is often recommended for antiques and collectibles because many collectible items can be sensitive to heat, humidity, and temperature fluctuations. Materials such as wood, paper, leather, fabric, metal, and adhesives may deteriorate over time when exposed to prolonged moisture or extreme temperatures. Climate-controlled storage helps provide a more stable indoor environment than garages, attics, basements, or standard outdoor storage units. Collectibles that may benefit from climate-controlled storage: antique furniture, coins and currency collections, comic books, trading cards, sports memorabilia, signed collectibles, vintage toys, artwork and framed pieces, historical documents. For valuable or irreplaceable collections, climate-controlled storage is often the preferred option for long-term storage.`,
    aHtml: `<p>Yes. Climate-controlled storage is often recommended for antiques and collectibles because many collectible items can be sensitive to heat, humidity, and temperature fluctuations.</p><p>Materials such as wood, paper, leather, fabric, metal, and adhesives may deteriorate over time when exposed to prolonged moisture or extreme temperatures. Climate-controlled storage helps provide a more stable indoor environment than garages, attics, basements, or standard outdoor storage units.</p><p><strong>Collectibles that may benefit from climate-controlled storage</strong></p><ul><li>Antique furniture</li><li>Coins and currency collections</li><li>Comic books</li><li>Trading cards</li><li>Sports memorabilia</li><li>Signed collectibles</li><li>Vintage toys</li><li>Artwork and framed pieces</li><li>Historical documents</li></ul><p>For valuable or irreplaceable collections, climate-controlled storage is often the preferred option for long-term storage.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy.
    // Question reworded from "Can I store firearms or guns in
    // storage units?" → "Are firearms allowed in storage units?"
    // — matches her cleaner, more neutral framing. Answer
    // pulls back from the previous "yes, climate-controlled
    // recommended" stance and instead defers to facility rules
    // and applicable law, which is the legally safer position.
    q: 'Are firearms allowed in storage units?',
    a: `Policies regarding firearms vary by storage facility and applicable laws. Customers should review facility rules and comply with all federal, state, and local regulations before storing firearms. If firearms are permitted, owners should ensure they are stored safely, securely, and in accordance with all applicable legal requirements. For questions about firearm storage policies at a specific Modern Storage® location, contact the facility directly before renting or moving in.`,
    aHtml: `<p>Policies regarding firearms vary by storage facility and applicable laws. Customers should review facility rules and comply with all federal, state, and local regulations before storing firearms.</p><p>If firearms are permitted, owners should ensure they are stored safely, securely, and in accordance with all applicable legal requirements.</p><p>For questions about firearm storage policies at a specific <a href="/locations">Modern Storage® location</a>, contact the facility directly before renting or moving in.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Softer
    // "often recommended" framing + 5-item musical-instrument
    // storage-tips bullet list.
    q: 'Can I use climate-controlled storage for musical instruments?',
    a: `Yes. Climate-controlled storage is often recommended for musical instruments because many instruments contain wood, felt, leather, metal, adhesives, or other materials that can be affected by temperature fluctuations and humidity exposure. Guitars, pianos, violins, brass instruments, woodwinds, drums, and other instruments may benefit from being stored in a more stable indoor environment than a garage, attic, basement, or standard outdoor storage unit. Musical instrument storage tips: clean instruments before storage; use a protective case when available; store instruments off the floor; avoid direct sunlight and excessive heat; follow manufacturer storage recommendations. Climate-controlled storage helps provide a more stable environment for long-term instrument storage than most non-conditioned spaces.`,
    aHtml: `<p>Yes. Climate-controlled storage is often recommended for musical instruments because many instruments contain wood, felt, leather, metal, adhesives, or other materials that can be affected by temperature fluctuations and humidity exposure.</p><p>Guitars, pianos, violins, brass instruments, woodwinds, drums, and other instruments may benefit from being stored in a more stable indoor environment than a garage, attic, basement, or standard outdoor storage unit.</p><p><strong>Musical instrument storage tips</strong></p><ul><li>Clean instruments before storage</li><li>Use a protective case when available</li><li>Store instruments off the floor</li><li>Avoid direct sunlight and excessive heat</li><li>Follow manufacturer storage recommendations</li></ul><p>Climate-controlled storage helps provide a more stable environment for long-term instrument storage than most non-conditioned spaces.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Broader
    // "many appliances" framing + 5-item commonly-stored list +
    // "empty, clean, completely dry" prep reminder.
    q: 'Can I store appliances in climate-controlled storage?',
    a: `Yes. Many appliances can be stored in climate-controlled storage, especially those containing electronic components, rubber seals, or materials that may be sensitive to temperature fluctuations and moisture exposure. Commonly stored appliances include refrigerators, washers and dryers, dishwashers, microwaves, and small kitchen appliances. Before storing any appliance, make sure it is empty, clean, and completely dry. Climate-controlled storage helps provide a more stable environment than garages, sheds, or standard outdoor storage units and is often preferred for long-term appliance storage.`,
    aHtml: `<p>Yes. Many appliances can be stored in climate-controlled storage, especially those containing electronic components, rubber seals, or materials that may be sensitive to temperature fluctuations and moisture exposure.</p><p><strong>Commonly stored appliances include:</strong></p><ul><li>Refrigerators</li><li>Washers and dryers</li><li>Dishwashers</li><li>Microwaves</li><li>Small kitchen appliances</li></ul><p>Before storing any appliance, make sure it is empty, clean, and completely dry.</p><p>Climate-controlled storage helps provide a more stable environment than garages, sheds, or standard outdoor storage units and is often preferred for long-term appliance storage.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Cleaner
    // "often preferred" framing; lists the categories where
    // climate-controlled is the common choice for long-term.
    q: 'Is climate-controlled storage good for long-term storage?',
    a: `Yes. Climate-controlled storage is often preferred for long-term storage because it helps provide a more stable indoor environment than garages, attics, sheds, or standard outdoor storage units. Items stored for extended periods may be exposed to seasonal temperature fluctuations and humidity changes. Climate-controlled storage can help reduce those exposures, making it a popular choice for furniture, electronics, documents, collectibles, clothing, and business inventory. For long-term storage, climate-controlled units are often chosen when the stored items are valuable, sensitive, or difficult to replace.`,
    aHtml: `<p>Yes. Climate-controlled storage is often preferred for long-term storage because it helps provide a more stable indoor environment than garages, attics, sheds, or standard outdoor storage units.</p><p>Items stored for extended periods may be exposed to seasonal temperature fluctuations and humidity changes. Climate-controlled storage can help reduce those exposures, making it a popular choice for furniture, electronics, documents, collectibles, clothing, and business inventory.</p><p>For long-term storage, climate-controlled units are often chosen when the stored items are valuable, sensitive, or difficult to replace.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Pulled
    // back from the previous "stable for extended periods even
    // during a temporary outage" implicit guarantee; the new copy
    // is legally safer — defers to the rental agreement on
    // outage-period conditions.
    q: 'What happens to climate-controlled storage during a power outage?',
    a: `Climate-controlled buildings may experience temperature changes during a power outage because HVAC systems rely on electrical service to operate. The effect of an outage depends on factors such as outdoor weather conditions, building construction, and the duration of the outage. During a temporary outage, indoor temperatures may change more gradually than in many outdoor environments because stored items remain inside an enclosed building. As outlined in the rental agreement, temperature and humidity levels cannot be guaranteed during power outages, utility interruptions, mechanical failures, or other events beyond the facility's control.`,
    aHtml: `<p>Climate-controlled buildings may experience temperature changes during a power outage because HVAC systems rely on electrical service to operate.</p><p>The effect of an outage depends on factors such as outdoor weather conditions, building construction, and the duration of the outage. During a temporary outage, indoor temperatures may change more gradually than in many outdoor environments because stored items remain inside an enclosed building.</p><p>As outlined in the rental agreement, temperature and humidity levels cannot be guaranteed during power outages, utility interruptions, mechanical failures, or other events beyond the facility's control.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Adds
    // side-by-side suitability lists — heated vs climate-
    // controlled — and the Arkansas-specific "summer humidity is
    // just as concerning as winter temperatures" closer.
    q: `What's the difference between climate-controlled and heated storage?`,
    a: `Heated storage and climate-controlled storage are not the same. Heated storage helps protect belongings from freezing temperatures during colder months but may not address summer heat or humidity. Climate-controlled storage is designed to provide a more consistent indoor environment throughout the year by using heating and cooling systems inside an enclosed building. Heated storage may be suitable for tools, equipment, vehicles, and items primarily affected by freezing temperatures. Climate-controlled storage is often preferred for furniture, electronics, documents, photos, collectibles, and musical instruments. In Arkansas, many renters choose climate-controlled storage because summer heat and humidity can be just as concerning as winter temperatures.`,
    aHtml: `<p>Heated storage and climate-controlled storage are not the same.</p><p><strong>Heated storage</strong> helps protect belongings from freezing temperatures during colder months but may not address summer heat or humidity.</p><p><strong>Climate-controlled storage</strong> is designed to provide a more consistent indoor environment throughout the year by using heating and cooling systems inside an enclosed building.</p><p><strong>Heated storage may be suitable for:</strong></p><ul><li>Tools</li><li>Equipment</li><li>Vehicles</li><li>Items primarily affected by freezing temperatures</li></ul><p><strong>Climate-controlled storage is often preferred for:</strong></p><ul><li>Furniture</li><li>Electronics</li><li>Documents</li><li>Photos</li><li>Collectibles</li><li>Musical instruments</li></ul><p>In Arkansas, many renters choose climate-controlled storage because summer heat and humidity can be just as concerning as winter temperatures.</p>`,
  },
  {
    // Rewritten 2026-06-05 verbatim from Alexandra's copy. Pulled
    // back from the previous "on-site teams who monitor HVAC
    // systems" specific claim — the new copy defers to the rental
    // agreement on temp/humidity guarantees and points customers
    // at the specific facility for monitoring details. Legally
    // safer; doesn't promise specific monitoring tech.
    q: 'Does climate-controlled storage have temperature monitoring?',
    a: `Climate-controlled buildings use heating and cooling systems to help provide a more consistent indoor environment than standard outdoor storage units. Building systems and climate-control features may vary by location. Customers with questions about a specific facility's climate-control setup should contact that location directly. As stated in the rental agreement, temperature and humidity levels cannot be guaranteed and may be affected by factors such as weather conditions, utility interruptions, or equipment issues.`,
    aHtml: `<p>Climate-controlled buildings use heating and cooling systems to help provide a more consistent indoor environment than standard outdoor storage units.</p><p>Building systems and climate-control features may vary by location. Customers with questions about a specific facility's climate-control setup should <a href="/locations">contact that location directly</a>.</p><p>As stated in the rental agreement, temperature and humidity levels cannot be guaranteed and may be affected by factors such as weather conditions, utility interruptions, or equipment issues.</p>`,
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
