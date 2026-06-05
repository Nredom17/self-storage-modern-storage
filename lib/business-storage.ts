export const BUSINESS_FEATURES = [
  {
    title: 'Loading dock access',
    body:
      'Dock-height loading at Modern Storage® Riverdale lets pallets, freight shipments, and box trucks unload directly into a business storage unit — the best fit for higher-volume commercial movement.',
    icon: 'dock',
  },
  {
    title: 'Package acceptance',
    body:
      'Receiving service for FedEx, UPS, USPS, and freight at participating Modern Storage® locations — useful for e-commerce sellers and contractors who can&apos;t take deliveries on a jobsite.',
    icon: 'package',
  },
  {
    title: 'Electricity in select units',
    body:
      'Select mini-warehouse units include in-unit electricity for charging tools, running a small workstation, or plugging in lighting. Availability varies by building.',
    icon: 'bolt',
  },
  {
    title: '24/7 access where available',
    body:
      'A subset of business storage units offer 24/7 gated access — confirm at the specific Modern Storage® location. Riverdale and several central Arkansas locations support extended hours by default.',
    icon: 'clock',
  },
] as const

export const BUSINESS_USE_CASES = [
  {
    title: 'E-commerce',
    body:
      'Mini-warehouse space for Shopify, Amazon FBM, eBay, and Etsy sellers — store inventory, accept inbound shipments, pick and pack, and stage outbound freight without leasing a warehouse.',
  },
  {
    title: 'Contractors',
    body:
      'Tools, materials, ladders, equipment, and a small mobile office for general contractors, electricians, plumbers, HVAC crews, and tradespeople working across the Little Rock and NWA markets.',
  },
  {
    title: 'Restoration',
    body:
      'A staging base for content packouts, equipment storage, and dehumidifier rotation for restoration and disaster-response companies handling insurance and emergency jobs across Arkansas.',
  },
  {
    title: 'Staging',
    body:
      'Furniture stagers and interior pros store rotating inventory between listings, with climate-controlled mini-warehouse options for upholstered pieces and high-value decor.',
  },
  {
    title: 'Moving companies',
    body:
      'Local and long-distance movers use Modern Storage® for overflow, between-move staging, and short-term customer holds when a closing slides or a new home isn&apos;t ready.',
  },
  {
    title: 'Document archive',
    body:
      'Law firms, medical offices, accountants, and small businesses store records boxes in climate-controlled mini-warehouse units sized for long-term retention and occasional retrieval.',
  },
] as const

export const PARTNER_PROGRAMS = [
  {
    title: 'Volume rate program',
    body:
      'Multi-unit and multi-location pricing for organizations that need more than a single mini-warehouse. We&apos;ll structure a single invoice across the Modern Storage® locations your team uses.',
  },
  {
    title: 'Property and facility partners',
    body:
      'Modern Storage® partners with property managers, brokers, and facility teams to support move-outs, renovations, and overflow needs across central Arkansas portfolios.',
  },
  {
    title: 'Restoration and insurance partners',
    body:
      'Priority access, content-packout intake support, and staging space for vetted restoration partners — set up before the next loss event so the response is faster.',
  },
  {
    title: 'Nonprofit and education',
    body:
      'Discounted programs for qualifying Arkansas nonprofits, faith communities, and schools storing program materials, event gear, and donation inventory.',
  },
] as const

export const BUSINESS_FAQS = [
  {
    // Net-new Phase 2 / Block 10 — direct PAA target. "Can I use a
    // storage unit for my business" is the explicit fear-framed
    // entry-point question; without an authoritative yes answer up
    // front, small-business searchers default to commercial real
    // estate listings. Concise→detailed→bullets format.
    q: 'Can I use a storage unit for my business?',
    a: `Yes — Modern Storage® offers business storage for inventory, tools, supplies, equipment, records, and commercial overflow. Business storage works well for e-commerce sellers, contractors, restoration crews, real estate professionals, document archive needs, and small businesses that need flexible month-to-month space without a commercial lease. Storage units are intended for storage rather than as active workspaces, repair shops, or operating business locations — though select Modern Storage® facilities accept business deliveries, offer dock-height loading, and provide extended access hours for higher-volume commercial use. Modern Storage® Riverdale is the flagship business storage facility in central Arkansas with loading docks and freight access. Common business uses for a Modern Storage® unit: e-commerce inventory — receive shipments, pick-and-pack, ship out; contractor tools, ladders, materials, and equipment; restoration packouts and emergency-response staging; document archives for law firms, medical, dental, and accounting practices; real estate staging furniture and seasonal display inventory; trade-show booths, signage, and marketing materials between events; office furniture and electronics during a relocation or remodel; moving-company overflow and customer holds when a closing slides.`,
    aHtml: `<p>Yes — Modern Storage® offers <a href="/business-storage">business storage</a> for inventory, tools, supplies, equipment, records, and commercial overflow. Business storage works well for e-commerce sellers, contractors, restoration crews, real estate professionals, document archive needs, and small businesses that need flexible month-to-month space without a commercial lease.</p><p>Storage units are intended for storage rather than as active workspaces, repair shops, or operating business locations — though select Modern Storage® facilities accept business deliveries, offer dock-height loading, and provide extended access hours for higher-volume commercial use. <a href="/locations/riverdale">Modern Storage® Riverdale</a> is the flagship business storage facility in central Arkansas with loading docks and freight access.</p><p><strong>Common business uses for a Modern Storage® unit:</strong></p><ul><li>E-commerce inventory — receive shipments, pick-and-pack, ship out</li><li>Contractor tools, ladders, materials, and equipment</li><li>Restoration packouts and emergency-response staging</li><li>Document archives for law firms, medical, dental, and accounting practices</li><li>Real estate staging furniture and seasonal display inventory</li><li>Trade-show booths, signage, and marketing materials between events</li><li>Office furniture and electronics during a relocation or remodel</li><li>Moving-company overflow and customer holds when a closing slides</li></ul>`,
  },
  {
    // Net-new Phase 2 — business storage pricing transparency. AEO
    // win because most operators don't publish this anywhere on the
    // marketing site, so AI engines have nothing to extract.
    q: 'How much does business storage cost?',
    a: `Business storage at Modern Storage® uses the same per-unit pricing as household storage — a 10x10 mini-warehouse unit typically runs $80-$140 per month drive-up or $110-$180 climate-controlled, and a 10x20 (one-car-garage equivalent, common for contractors and e-commerce) runs $150-$250 drive-up or $200-$310 climate-controlled. Larger 10x30 mini-warehouse units suitable for higher-volume inventory or multi-pallet operations typically run $200-$350 drive-up or $270-$440 climate-controlled. Multi-unit and multi-location accounts get volume pricing — Modern Storage® offers a single point of contact, consolidated invoicing, and structured rate negotiation across the Arkansas locations your business uses. Specific add-ons (dock-height loading, in-unit electricity, package receiving, extended access) are confirmed at the facility. Typical business storage pricing at Modern Storage®: 10x10 mini-warehouse — about $80-$140/mo drive-up, $110-$180/mo climate-controlled; 10x15 — about $110-$180/mo drive-up, $150-$230/mo climate-controlled; 10x20 — about $150-$250/mo drive-up, $200-$310/mo climate-controlled; 10x30 — about $200-$350/mo drive-up, $270-$440/mo climate-controlled; volume pricing for multi-unit and multi-location business accounts; no long-term commercial lease, no early-termination fee — month-to-month; live rates and current move-in offers shown on each location's reservation page.`,
    aHtml: `<p>Business storage at Modern Storage® uses the same per-unit pricing as household storage — a 10x10 mini-warehouse unit typically runs $80-$140 per month drive-up or $110-$180 climate-controlled, and a 10x20 (one-car-garage equivalent, common for contractors and e-commerce) runs $150-$250 drive-up or $200-$310 climate-controlled.</p><p>Larger 10x30 mini-warehouse units suitable for higher-volume inventory or multi-pallet operations typically run $200-$350 drive-up or $270-$440 climate-controlled. Multi-unit and multi-location accounts get volume pricing — Modern Storage® offers a single point of contact, consolidated invoicing, and structured rate negotiation across the Arkansas locations your business uses. Specific add-ons (dock-height loading, in-unit electricity, package receiving, extended access) are confirmed at the facility.</p><p><strong>Typical business storage pricing at Modern Storage®:</strong></p><ul><li><strong>10x10 mini-warehouse</strong> — about $80-$140/mo drive-up, $110-$180/mo climate-controlled</li><li><strong>10x15</strong> — about $110-$180/mo drive-up, $150-$230/mo climate-controlled</li><li><strong>10x20</strong> — about $150-$250/mo drive-up, $200-$310/mo climate-controlled</li><li><strong>10x30</strong> — about $200-$350/mo drive-up, $270-$440/mo climate-controlled</li><li><strong>Volume pricing</strong> for multi-unit and multi-location business accounts</li><li><strong>No long-term commercial lease, no early-termination fee</strong> — month-to-month</li><li>Live rates and current move-in offers shown on each <a href="/locations">location's reservation page</a></li></ul>`,
  },
  {
    // Phase 2 — upgraded with bullets. Plain-text `a` keeps the
    // JSON-LD schema readable as one answer.
    q: 'What is a mini-warehouse and how is it different from regular self storage?',
    a: `A mini-warehouse is a business-grade self-storage unit set up for active commercial use rather than long-term household storage. At Modern Storage®, mini-warehouse units are typically larger than household units, often include features like dock-height loading, electricity in select units, and extended access hours, and are sized for inventory, equipment, records, and contractor materials. Modern Storage® Riverdale leads the mini-warehouse program in central Arkansas. What makes a Modern Storage® mini-warehouse different from a regular storage unit: typically larger units sized for commercial inventory, pallets, and trade equipment; dock-height loading at participating locations (Riverdale leads); in-unit electricity available in select units for tools, lighting, or a workstation; extended hours and 24-hour gated access at select facilities; package and freight receiving for FedEx, UPS, USPS at participating locations; volume and multi-unit pricing for businesses needing more than one unit; intended for storage and limited business operations — not as an active workspace or full retail operation.`,
    aHtml: `<p>A mini-warehouse is a business-grade self-storage unit set up for active commercial use rather than long-term household storage. At Modern Storage®, mini-warehouse units are typically larger than household units, often include features like dock-height loading, electricity in select units, and extended access hours, and are sized for inventory, equipment, records, and contractor materials. <a href="/locations/riverdale">Modern Storage® Riverdale</a> leads the mini-warehouse program in central Arkansas.</p><p><strong>What makes a Modern Storage® mini-warehouse different from a regular storage unit:</strong></p><ul><li>Typically larger units sized for commercial inventory, pallets, and trade equipment</li><li>Dock-height loading at participating locations (Riverdale leads)</li><li>In-unit electricity available in select units for tools, lighting, or a workstation</li><li>Extended hours and 24-hour gated access at select facilities</li><li>Package and freight receiving for FedEx, UPS, USPS at participating locations</li><li>Volume and multi-unit pricing for businesses needing more than one unit</li><li>Intended for storage and limited business operations — not as an active workspace or full retail operation</li></ul>`,
  },
  {
    q: 'Which Modern Storage® location is best for business storage?',
    a: `All Modern Storage® locations across Arkansas offer business storage units. The right location depends on where your business operates — Modern Storage® has facilities in Little Rock, North Little Rock, Bentonville, Springdale, Lowell, Maumelle, Bryant, and Hot Springs. Use the inquiry form above or call 501-910-0096 and the team will match you to the right facility and unit size for your business.`,
  },
  {
    q: 'Is business storage available at all Modern Storage® locations?',
    a: `Yes. Every Modern Storage® location across Arkansas offers business storage options. Available features vary by location, but businesses commonly use Modern Storage® for inventory, equipment, records, contractor materials, staging furniture, overflow storage, and operational support. If you need dock-height loading or freight access specifically, Modern Storage® Riverdale is the best fit.`,
  },
  {
    q: 'Do you have loading docks?',
    a: `Yes. Modern Storage® Riverdale offers dock-height loading access for approved business customers. Dock access is especially useful for freight deliveries, pallet unloading, contractor materials, restoration equipment, and inventory movement. Other Modern Storage® locations support business storage too, but Riverdale is the lead facility for dock-height loading.`,
  },
  {
    q: 'Can Modern Storage® accept packages for my business?',
    a: `Package and freight receiving for FedEx, UPS, USPS, and freight carriers is available at participating Modern Storage® locations. This is useful for e-commerce sellers and contractors who need a reliable receiving address. Confirm availability at your preferred location when you submit a business inquiry.`,
  },
  {
    q: 'Do business storage units have electricity?',
    a: `Select mini-warehouse units at Modern Storage® include in-unit electricity for charging tools, powering tools and equipment, or running lighting. Availability varies by location and unit. Note electricity as a requirement in your business inquiry and the team will confirm which units can accommodate it.`,
  },
  {
    q: 'Is there 24/7 access for business storage?',
    a: `Extended and 24/7 gated access is available at select Modern Storage® locations. Access hours vary by facility, so confirm availability before reserving.`,
  },
  {
    q: 'Do you offer climate-controlled business storage?',
    a: `Yes. Climate-controlled business storage units are available at Modern Storage® locations across Arkansas. Climate control is recommended for e-commerce inventory, product samples, documents, staging furniture, electronics, and any commercial stock sensitive to Arkansas heat and humidity.`,
  },
  {
    q: 'Can my moving company or restoration crew use Modern Storage® for staging?',
    a: `Yes. Modern Storage® works with moving companies, restoration crews, and disaster-response teams across Arkansas. Moving companies use Modern Storage® for overflow, between-move staging, and short-term customer holds. Restoration companies use it for content packouts, equipment storage, and dehumidifier rotation. Contact the business storage team to discuss volume, access, and partner program options.`,
  },
  {
    q: 'Do you offer multi-unit or multi-location pricing for businesses?',
    a: `Yes. Modern Storage® offers volume pricing for organizations that need multiple units or storage across more than one Arkansas location. Multi-unit accounts include a single point of contact and consolidated invoicing. Submit a business inquiry above or call 501-910-0096 to discuss your needs and get a structured quote.`,
  },
  {
    q: 'How do I get a business storage quote?',
    a: `Fill out the business inquiry form on this page with your name, company, preferred location, use case, and a brief description of what you need to store. The Modern Storage® team will respond with available options based on your needs. You can also call 501-910-0096 directly to speak with the business storage team.`,
  },
  // ── Comparison-style entries (business storage alternatives) ────────
  // Frames Modern Storage® mini-warehouse units against warehouses, office
  // space, retail backrooms, commercial leases, and other ways businesses
  // create operational space. None duplicate the existing "Do you offer X?"
  // or "Which Modern Storage® location?" entries above.
  {
    q: 'Warehouse vs Self Storage — which is right for my business?',
    a: `Warehouses are designed for large-scale inventory and logistics operations. Self storage offers a more affordable solution for businesses that need extra space without committing to a commercial facility.`,
  },
  {
    q: 'Office Storage vs Self Storage — which is better?',
    a: `Office storage consumes valuable workspace that could be used for employees and productivity. Self storage helps businesses keep records, equipment, and inventory off-site while freeing up office space.`,
  },
  {
    q: 'Retail Backroom vs Storage Unit — which is better?',
    a: `Retail backrooms provide immediate access to inventory but are often limited in size. A storage unit offers overflow space for seasonal products, displays, and excess inventory.`,
  },
  {
    q: 'Contractor Storage vs Warehouse — which is better?',
    a: `Many contractors do not need an entire warehouse. A storage unit provides a cost-effective alternative for tools, equipment, materials, and supplies.`,
  },
  {
    q: 'Business Storage vs Commercial Lease — which is better?',
    a: `Commercial leases often involve long-term commitments and significantly higher costs. Business storage offers flexibility and lower overhead for companies needing additional space.`,
  },
  {
    q: 'Inventory Storage vs Warehouse — which is better?',
    a: `A warehouse may be excessive for smaller businesses. Storage units provide scalable inventory space without the expense of a dedicated commercial facility.`,
  },
  {
    q: 'Storage Unit vs Shipping Container — which is better?',
    a: `Shipping containers offer storage at a fixed location but may lack climate protection and accessibility. Storage units often provide greater convenience, security, and flexibility.`,
  },
  {
    q: 'Storage Unit vs Commercial Building — which is better?',
    a: `Purchasing or leasing a commercial building requires substantial capital. Storage units provide extra space without the financial burden of property ownership.`,
  },
  {
    q: 'Self Storage vs Industrial Space — which is better?',
    a: `Industrial space is designed for manufacturing and operations. Self storage is generally more affordable for businesses focused primarily on storage needs.`,
  },
  {
    q: 'Small Business Storage vs Warehouse — which is better?',
    a: `Most small businesses do not require warehouse-scale operations. Storage units provide practical space for inventory, records, and equipment without unnecessary costs.`,
  },
  {
    q: 'E-Commerce Storage vs Warehouse — which is better?',
    a: `Many e-commerce businesses start with storage units because they offer flexibility and lower monthly expenses. Warehouses become more attractive as order volume grows.`,
  },
  {
    q: 'Contractor Storage vs Home Garage — which is better?',
    a: `Storing contractor equipment at home can consume valuable space and create security concerns. Storage units provide dedicated room for tools, trailers, and materials.`,
  },
  {
    q: 'Storage Unit vs Retail Lease for Inventory — which is better?',
    a: `Retail leases are designed to generate sales, not simply store products. Storage units are often far more affordable when inventory storage is the primary goal.`,
  },
  {
    q: 'Storage Unit vs Office Lease for Storage — which is better?',
    a: `Using office space solely for storage may be an inefficient use of resources. Storage units help businesses maximize productive office square footage.`,
  },
  {
    q: 'Storage Unit vs Expanding Your Business Location — which is better?',
    a: `Expanding a location can be expensive and permanent. A storage unit provides immediate additional space without major capital investment.`,
  },
  {
    q: 'Self Storage vs Off-Site Records Storage — which is better?',
    a: `Records storage services specialize in document management. Self storage offers flexibility for businesses that need access to records along with other stored items.`,
  },
  {
    q: 'Storage Unit vs Purchasing a Warehouse — which is better?',
    a: `Buying a warehouse requires significant capital and ongoing maintenance. Storage units offer flexibility without long-term ownership commitments.`,
  },
  {
    q: 'Storage Unit vs Keeping Inventory at Home — which is better?',
    a: `Home inventory storage can quickly overwhelm living spaces. Storage units help separate business operations from personal life.`,
  },
  {
    q: 'Business Storage vs Coworking Space Storage — which is better?',
    a: `Coworking spaces are designed for work environments rather than inventory storage. Storage units provide significantly more room for equipment and products.`,
  },
  {
    q: 'Storage Unit vs Using a Spare Office as Storage — which is better?',
    a: `A spare office can often generate greater value when used for employees or operations. Storage units free up office space while keeping inventory and equipment accessible.`,
  },
] as const
