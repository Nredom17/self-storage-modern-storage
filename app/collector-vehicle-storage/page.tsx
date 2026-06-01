import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/site'
import { getSiteSettings } from '@/lib/data'
import FaqAccordion from '@/components/FaqAccordion'

// Re-render every 60s to pick up Supabase site-settings edits.
export const revalidate = 60

const PAGE_PATH = '/collector-vehicle-storage'

// Hero — silver Porsche 911 in golden hour against red Modern Storage®
// roll-up doors. The atmospheric lighting + dramatic rear-3/4 angle reads
// more "collector garage" than "parking lot."
const HERO_IMAGE = '/images/porsche-911-secure-modern.storage..png'
const HERO_ALT =
  'Silver Porsche 911 parked in golden-hour light against Modern Storage® red roll-up doors — Arkansas collector and exotic car storage'

// Other in-page photos. Filenames match what's saved in public/images/.
const MASERATI_IMAGE = '/images/exotic-vehicle-storage-at-modern-storage.webp.png'
const MASERATI_ALT =
  'Exotic car emerging from a red Modern Storage® roll-up door — indoor enclosed vehicle storage in Arkansas'

const COLLECTION_IMAGE = '/images/luxury-car-storage-facility-collection.Modern.Storage.png'
const COLLECTION_ALT =
  'Five collector cars parked in front of red Modern Storage® roll-up doors — Arkansas exotic and collector vehicle storage'

const FERRARI_IMAGE = '/images/ferrari-296-gtb-modern.storage-facility..png'
const FERRARI_ALT =
  'Ferrari beside a red Modern Storage® roll-up door — Arkansas exotic and classic car storage'

const AERIAL_IMAGE = '/images/luxury-vehicle-storage-drone-photo.Modern.Storage.png'
const AERIAL_ALT =
  'Aerial top-down view of collector cars at a Modern Storage® facility — Arkansas collector vehicle storage'

const GREEN_PORSCHE_IMAGE = '/images/porsche-gts-modern.storage-storage-unit..png'
const GREEN_PORSCHE_ALT =
  'Porsche GTS parked beside a Modern Storage® unit — indoor enclosed vehicle storage in Arkansas'

export const metadata: Metadata = {
  // Meta title — 57 chars including the ® symbol, fits the SERP budget
  // without truncation and leads with the brand-modifier keywords.
  title: {
    absolute: 'Classic, Exotic & Collector Car Storage | Modern Storage®',
  },
  description:
    'Indoor enclosed storage for classic cars, exotics, and collector vehicles across Arkansas at Modern Storage®, with separate climate-controlled units for parts and restoration projects.',
  alternates: { canonical: SITE_URL + PAGE_PATH },
  openGraph: {
    title: 'Classic, Exotic & Collector Car Storage | Modern Storage®',
    description:
      'Indoor enclosed bays for collector vehicles, drive-up units for project cars, and climate-controlled units for parts and restoration projects across Arkansas.',
    url: SITE_URL + PAGE_PATH,
    siteName: 'Modern Storage®',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1600, height: 1066, alt: HERO_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Classic, Exotic & Collector Car Storage | Modern Storage®',
    description:
      'Indoor enclosed storage for collector vehicles, plus climate-controlled units for parts and documents, across Arkansas.',
    images: [HERO_IMAGE],
  },
}

// ─── DATA ───────────────────────────────────────────────────────────────

// Why-collectors-need-storage value props. Three columns, scannable, each
// anchored to a concrete reason that maps to a real Modern Storage® offering
// (climate-controlled, indoor enclosed bays, business storage).
const VALUE_PROPS = [
  {
    title: 'Garage overflow',
    body:
      'When a daily driver, a project car, and the weekend toy all need a spot, garage space runs out fast. Modern Storage® gives the collector vehicle its own indoor home so the garage stays usable for everything else.',
  },
  {
    title: 'Year-round protection',
    body:
      'Arkansas summers regularly exceed 95°F with high humidity — conditions that crack leather, oxidize paint, dry-rot seals, and corrode electronics. Indoor enclosed storage keeps the vehicle out of direct sun, dust, and the worst of Arkansas weather; climate-controlled units (a separate option) handle the leather pieces, parts, and documents that ride along with the build.',
  },
  {
    title: 'Restoration headroom',
    body:
      'A bare-shell restoration needs more than just space for the car — it needs room for the donor parts, the engine on a stand, the rolling tool cart, and the boxes of trim pieces. Mini-warehouse and business storage units at Modern Storage® handle the whole footprint.',
  },
] as const

// Storage options by vehicle type. Seven cards covering the full collector
// spectrum. Each card maps to a real Modern Storage® offering so the page
// stays factual (no fabricated services).
const VEHICLE_TYPES = [
  {
    title: 'Classic cars',
    body:
      'Pre-war coupes, muscle-era V8s, vintage European cruisers — anything you bought to keep, not commute in. Indoor enclosed bays and drive-up units at Modern Storage® locations across Arkansas keep classics out of direct sun, weather, and the dust that wears finishes down over time.',
  },
  {
    title: 'Exotic & supercars',
    body:
      'Ferrari, Lamborghini, McLaren, Porsche GT cars, AMG GT — exotics that respond badly to heat soak, UV, and humidity. Indoor enclosed storage keeps the paint, leather, electronics, and rubber in show-floor condition between drives.',
  },
  {
    title: 'Motorcycles',
    body:
      'Modern Storage® stores cruisers, sport bikes, adventure bikes, café customs, and gear together. A 5×10 indoor unit covers a single motorcycle plus helmets, jackets, tools, and spares. Larger units accommodate multiple bikes and a workbench.',
  },
  {
    title: 'Project cars',
    body:
      'Long-term builds need somewhere to live between work sessions. Drive-up units at most Modern Storage® locations across Arkansas give the rolling chassis, the donor parts, and the tool cart room to coexist.',
  },
  {
    title: 'Convertibles & roadsters',
    body:
      'Convertible tops and leather interiors are the first things to suffer in direct sun and outdoor humidity. Indoor enclosed storage at Modern Storage® keeps the soft top out of UV, the leather away from outdoor moisture swings, and the carpets dry.',
  },
  {
    title: 'Weekend & track cars',
    body:
      'Cars you drive on weekends — track-prepped Caymans, Miatas with cage and harness, restored S-chassis builds — deserve indoor storage that keeps them ready to go. Indoor enclosed bays and drive-up indoor units at Modern Storage® locations fit the bill.',
  },
  {
    title: 'Snowbird vehicles',
    body:
      'Half the year you\'re in Arkansas, half the year you\'re somewhere warmer. Modern Storage® rents month-to-month with no long-term lease — pay for the storage months you need, close out for the rest, and pick back up when you return.',
  },
] as const

// Storage prep checklist — the "before you drop it off" walkthrough.
// Numbered list rendered with a HowTo schema block below.
const PREP_CHECKLIST = [
  {
    step: 'Wash, dry, and wax',
    body:
      'A clean exterior locks out grime and contaminants that would otherwise sit on the paint for the entire storage period. Hand-dry to avoid water spots and finish with a coat of wax or sealant.',
  },
  {
    step: 'Change oil and top fluids',
    body:
      'Used oil contains acidic combustion byproducts that attack bearings over time. Fresh oil before storage protects the engine internals. Top off the coolant, brake fluid, and power steering reservoirs.',
  },
  {
    step: 'Fill the tank and add fuel stabilizer',
    body:
      'A full tank reduces condensation inside the fuel tank. Fuel stabilizer keeps ethanol-blended pump gas from separating and varnishing the injectors or carburetor over a months-long sit.',
  },
  {
    step: 'Inflate tires to spec — or use jack stands',
    body:
      'Flat-spotting happens when tires sit under static load for months. Either inflate to the high end of the recommended range to reduce contact patch deformation, or lift the car onto jack stands so the wheels hang free.',
  },
  {
    step: 'Disconnect or trickle-charge the battery',
    body:
      'Parasitic draws drain batteries over weeks. Either disconnect the negative terminal entirely (and remove the battery if storage is over six months) or run a trickle charger / battery tender on a clean ground.',
  },
  {
    step: 'Crack a window and use a breathable cover',
    body:
      'A small gap in the window keeps cabin air circulating and prevents the musty smell that builds up in sealed interiors. Use a breathable indoor car cover — never plastic, which traps moisture against the paint.',
  },
  {
    step: 'Document the condition',
    body:
      'Photograph the car at move-in from multiple angles, note the odometer, and keep the inventory and any keys in a secure off-site location. Useful for insurance, future resale, and your own peace of mind.',
  },
] as const

// FAQs — answer-first format so Google's PAA box + AI Overview can extract
// clean snippets. 12 entries cover the search intents the user listed
// (classic car storage AR, collector vehicle, exotic car, indoor vehicle,
// motorcycle, project car, climate-controlled for parts).
const FAQS = [
  {
    q: 'Does Modern Storage® offer indoor enclosed storage for classic and exotic cars?',
    a: `Yes. Modern Storage® offers indoor enclosed bays and drive-up indoor units sized for classic cars, exotic vehicles, project cars, and motorcycles at locations across Arkansas. Outdoor parking also accommodates larger or daily-driver-style vehicles. Climate-controlled units are available for parts, leather pieces, and documents stored alongside the vehicle.`,
  },
  {
    q: 'Where can I store a classic car in Arkansas?',
    a: `Modern Storage® offers collector vehicle storage at locations across Arkansas — indoor enclosed bays, drive-up storage, and outdoor parking. Use the location finder to pick the Modern Storage® closest to your garage and confirm which formats are available. Separate climate-controlled units are available for parts and documents.`,
  },
  {
    q: 'What size storage unit do I need for a classic or exotic car?',
    a: `Most classic cars, exotics, and weekend cars fit comfortably in a 10×20 storage unit (200 sq ft) — about the size of a one-car garage. Longer wheelbase vehicles, full-size pickups, and restomod project cars typically need a 10×30. Two collector cars side-by-side fit in an indoor enclosed bay.`,
  },
  {
    q: 'Can I store car parts and tools alongside my collector car?',
    a: `Yes. Climate-controlled storage at Modern Storage® is the right choice for spare body panels, leather interiors, engine internals, wiring harnesses, build documents, tools, and any parts vulnerable to Arkansas heat and humidity. A separate climate-controlled unit alongside a drive-up vehicle space is a common collector setup.`,
  },
  {
    q: 'Is indoor enclosed storage worth it for a collector car?',
    a: `For most collector vehicles, yes. Arkansas summers regularly exceed 95°F with sustained high humidity — conditions that accelerate paint oxidation, soft-top and seal degradation, leather cracking, and electronics failure. Indoor enclosed bays at Modern Storage® keep the car out of direct sun, weather, and the dust that wears finishes down between drives. (Modern Storage® does not offer climate-controlled storage for vehicles themselves — climate-controlled units are intended for parts, leather pieces, and documents stored alongside.)`,
  },
  {
    q: 'Do you offer storage for restoration projects?',
    a: `Yes. Modern Storage® offers drive-up units and mini-warehouse business storage at locations across Arkansas — ground-floor access, room for the rolling chassis, donor parts, tools, and a workbench together. Restoration crews and personal builders rent at the Modern Storage® closest to their shop or garage.`,
  },
  {
    q: 'How do I prepare a classic car for long-term storage?',
    a: `Wash and wax the exterior, change the oil, top the fuel tank with stabilizer, inflate tires to spec (or use jack stands), disconnect or trickle-charge the battery, crack a window, and use a breathable indoor car cover. The full step-by-step checklist is on this page above.`,
  },
  {
    q: 'Can I store a motorcycle at Modern Storage®?',
    a: `Yes. Modern Storage® locations across Arkansas accommodate motorcycles in 5×10 or 5×15 indoor units, with indoor enclosed bays at select facilities for collectors who want vault-quality storage. Helmets, jackets, tools, and seasonal gear store alongside.`,
  },
  {
    q: 'Are storage units secure enough for a six-figure car?',
    a: `Modern Storage® facilities are gated with personal keypad codes issued per tenant, monitored with video surveillance, surrounded by perimeter fencing, lit at night, and staffed during business hours. Tenants secure their unit with a disc lock. See the storage security guide for the full six-layer breakdown.`,
  },
  {
    q: 'How long can I store a collector car at Modern Storage®?',
    a: `As long as you need. Modern Storage® rentals are month-to-month with no long-term lease commitment, so you can store seasonally (winter only, snowbird trips), between restoration phases, or year-round. Indoor enclosed storage is recommended for stays longer than ~3 months — and a separate climate-controlled unit makes sense for any leather pieces, parts, or documents stored alongside.`,
  },
  {
    q: 'Can I access my car at Modern Storage® any day of the week?',
    a: `Yes. Gate access at every Modern Storage® location is 6:00 AM – 10:00 PM, every day. Office hours for new rentals and tenant questions are Monday-Saturday 8:30 AM – 5:30 PM, Sunday 1:00 PM – 6:00 PM (Maumelle and Lowell are closed Sundays).`,
  },
  {
    q: 'Do storage units have electricity for trickle chargers or battery tenders?',
    a: `Select Modern Storage® mini-warehouse units include in-unit electricity for trickle chargers, battery tenders, dehumidifiers, and small tools. Availability varies by location and unit — note electricity as a requirement on the business storage inquiry form and the team will confirm what's available at your preferred facility.`,
  },
] as const

// ─── JSON-LD ────────────────────────────────────────────────────────────

function buildJsonLd() {
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SITE_URL + PAGE_PATH + '#service',
    serviceType: 'Classic, Exotic, and Collector Vehicle Storage',
    name: 'Classic, Exotic & Collector Car Storage in Arkansas',
    description:
      'Indoor enclosed storage for classic cars, exotics, supercars, project cars, motorcycles, convertibles, weekend drivers, and snowbird vehicles across Arkansas. Indoor enclosed bays, drive-up storage, and mini-warehouse business storage at Modern Storage® locations across the state. Climate-controlled units are available separately for parts, leather pieces, and documents.',
    url: SITE_URL + PAGE_PATH,
    image: SITE_URL + HERO_IMAGE,
    areaServed: { '@type': 'State', name: 'Arkansas' },
    // Repointed to sitewide #organization @id — no nested SelfStorage with
    // incomplete PostalAddress (a Semrush markup-error trigger).
    provider: { '@id': SITE_URL + '/#organization' },
  }

  // HowTo schema for the storage-prep checklist. Google rewards HowTo
  // with rich results; AI engines quote the steps directly.
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': SITE_URL + PAGE_PATH + '#howto',
    name: 'How to Prepare a Classic Car for Long-Term Storage',
    description:
      'Seven-step storage prep walkthrough for classic cars, exotics, project cars, and weekend drivers at Modern Storage® Arkansas locations.',
    step: PREP_CHECKLIST.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.step,
      text: s.body,
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Collector Vehicle Storage', item: SITE_URL + PAGE_PATH },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return [service, howTo, breadcrumb, faqPage]
}

// ─── PAGE ───────────────────────────────────────────────────────────────

export default async function CollectorVehicleStoragePage() {
  const settings = await getSiteSettings()
  const jsonLd = buildJsonLd()

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── HERO — dramatic edge-to-edge car shot ────────────────
          Different from the standard charcoal hero: the photo runs
          full-bleed behind the text block with a left-to-right
          gradient so the headline stays legible. Reads more
          "collector garage at golden hour" than "storage page." */}
      <section className="relative bg-black overflow-hidden">
        <div className="h-1 w-full bg-modern-red relative z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt={HERO_ALT}
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
          {/* Left-edge gradient for legibility of overlaid copy. */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" aria-hidden="true" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-400">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-modern-red transition-colors">Self Storage</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-200">Collector Vehicle Storage</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-modern-red/20 border border-modern-red/50 text-modern-red text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-modern-red animate-pulse" aria-hidden="true" />
              Classic · Exotic · Collector
            </span>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6">
              Classic Car &amp; Collector Vehicle <span className="text-modern-red">Storage</span>
            </h1>
            <p className="text-gray-200 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">
              Indoor enclosed bays and restoration-project space for the cars you drive on weekends, the ones still in pieces in the garage, and the ones that only come out for the show. Climate-controlled units are available separately for parts, leather, and documents. Across Arkansas at Modern Storage®.
            </p>

            <div className="flex flex-wrap gap-3 mb-3">
              <a
                href={settings.phoneHref}
                aria-label={`Call Modern Storage® new rentals at ${settings.phoneDisplay}`}
                className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm shadow-md"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
                </svg>
                Call Modern Storage®
              </a>
              <Link
                href="#vehicle-types"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-charcoal font-bold px-7 py-3.5 rounded-full transition-colors text-sm shadow-md"
              >
                Find Vehicle Storage
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-gray-300 mt-6">
              {[
                'Indoor enclosed bays available',
                'Climate-controlled units for parts & interiors',
                'Mini-warehouse for restoration projects',
                'Month-to-month',
              ].map((b) => (
                <li key={b} className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-modern-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── WHY COLLECTORS NEED STORAGE ────────────────────────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-modern-red mb-3">
                Why collectors need storage
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
                A car worth driving is a car worth protecting
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Most home garages weren't built for what's parked in them. A daily, a project, the weekend toy, and the parts shelf all compete for the same slab — and the only thing that loses is the car you cared about most. Modern Storage® gives each vehicle its own indoor home so the garage stays usable and the cars stay show-floor clean.
              </p>
              <Link
                href="/rv-boat-vehicle"
                className="inline-flex items-center gap-2 text-sm font-bold text-modern-red hover:text-modern-red-hover transition-colors"
              >
                See all vehicle storage options →
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9] bg-gray-800 relative">
                <Image
                  src={COLLECTION_IMAGE}
                  alt={COLLECTION_ALT}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 lg:mt-16">
            {VALUE_PROPS.map((v, i) => (
              <article key={v.title} className="bg-gray-50 border border-gray-200 rounded-2xl p-7 hover:border-modern-red transition-colors">
                <span className="font-bebas text-4xl text-modern-red leading-none block mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-black text-charcoal text-lg leading-tight mb-3">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORAGE OPTIONS BY VEHICLE TYPE ────────────────────── */}
      <section id="vehicle-types" className="bg-gray-50 py-16 lg:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-modern-red mb-3">
              Storage by vehicle
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              Built for the cars you actually own
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Every collector's garage looks a little different. Modern Storage® has the format to match — indoor enclosed bays for show cars, drive-up units for project cars, outdoor parking for daily-driver-style vehicles, and climate-controlled units for parts, leather, and documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VEHICLE_TYPES.map((t) => (
              <article
                key={t.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-modern-red hover:shadow-lg transition-all flex flex-col"
              >
                <h3 className="font-black text-charcoal text-xl leading-tight mb-3 tracking-tight">{t.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDOOR ENCLOSED BAYS — generic to all locations ──── */}
      <section className="bg-charcoal text-white py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-modern-red mb-3">
                Indoor enclosed bays
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-5">
                The vault for cars that don&apos;t see weather
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5">
                Indoor enclosed bays at Modern Storage® locations across Arkansas are sized for full classic cars, exotics, restored project builds, and multiple motorcycles side-by-side — all behind a roll-up door, under a roof, and inside the gate.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Indoor walls and a sealed roof shield paint, leather, electronics, soft tops, and rubber from sun, rain, and the worst of the heat-and-humidity cycle that punishes cars sitting in an Arkansas driveway. Reserve early — indoor bays fill quickly heading into show and event season.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#locations"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Find a Location →
                </Link>
                <Link
                  href="/rv-boat-vehicle"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full transition-colors border border-white/20 text-sm"
                >
                  All vehicle storage
                </Link>
              </div>
            </div>
            <figure className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] lg:aspect-[4/5] bg-gray-800 relative">
                <Image
                  src={MASERATI_IMAGE}
                  alt={MASERATI_ALT}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-cover object-center"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ── CLIMATE-CONTROLLED FOR PARTS, TOOLS, INTERIOR ─────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <figure>
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100 relative">
                <Image
                  src={FERRARI_IMAGE}
                  alt={FERRARI_ALT}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </figure>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-modern-red mb-3">
                Climate-controlled
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
                For parts, tools, interior, and documents
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                The car is only half the collection. Spare panels, NOS trim, leather seats out for re-stitching, a rebuilt block on a stand, the original window stickers, the documented service history — none of it does well in a hot Arkansas garage.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                <Link href="/climate-controlled" className="text-modern-red font-bold hover:text-modern-red-hover transition-colors">Climate-controlled units</Link> at Modern Storage® keep the parts side of the build in show-floor condition while the car itself lives in an indoor bay or drive-up unit alongside. Run a unit per project, or one for everything.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-2">
                {[
                  'Body panels & trim',
                  'Leather & upholstery',
                  'Wiring harnesses',
                  'Engine internals',
                  'Build documentation',
                  'Tools & shop carts',
                  'Tires & wheels',
                  'NOS parts',
                ].map((p) => (
                  <li key={p} className="flex gap-2">
                    <svg className="w-4 h-4 text-modern-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINI-WAREHOUSE / DRIVE-UP — generic, no per-facility callout ── */}
      <section className="bg-gray-50 py-16 lg:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-modern-red mb-3">
                Drive-up &amp; mini-warehouse storage
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-5">
                Drive-up storage for restoration projects
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                A bare-shell restoration isn't just a car — it's a rolling chassis, a donor parts pile, a workbench, an engine stand, a tool cart, and forty boxes of trim. That's a drive-up + mini-warehouse footprint, not a household one.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Modern Storage® locations across Arkansas offer <Link href="/business-storage" className="text-modern-red font-bold hover:text-modern-red-hover transition-colors">drive-up business storage</Link> sized to handle a project car and everything around it. Restoration shops and personal builders rent at the Modern Storage® closest to their garage.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#locations"
                  className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-bold px-6 py-3 rounded-full transition-colors text-sm"
                >
                  Find a Location →
                </Link>
                <Link
                  href="/business-storage"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-charcoal font-bold px-6 py-3 rounded-full transition-colors border border-gray-200 text-sm"
                >
                  Business storage
                </Link>
              </div>
            </div>
            <figure>
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[16/9] bg-gray-100 relative">
                <Image
                  src={AERIAL_IMAGE}
                  alt={AERIAL_ALT}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ── STORAGE PREP CHECKLIST ─────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-modern-red mb-3">
              Storage prep checklist
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-4">
              How to put a collector car in storage the right way
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
              Skip these and the car you stored looking new comes out months later looking driven. Seven steps to do before the gate closes behind you.
            </p>
          </div>

          <ol className="space-y-4">
            {PREP_CHECKLIST.map((c, i) => (
              <li key={c.step} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex gap-5">
                <span className="font-bebas text-4xl text-modern-red leading-none shrink-0 w-12">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-black text-charcoal text-base leading-tight mb-2">{c.step}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── INTERNAL LINKS / RELATED PAGES ─────────────────────── */}
      <section className="bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-modern-red mb-3">
            Explore more
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-charcoal tracking-tight mb-8">
            Related Modern Storage® pages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { href: '/climate-controlled', label: 'Climate-Controlled' },
              { href: '/rv-boat-vehicle', label: 'RV & Boat Storage' },
              { href: '/business-storage', label: 'Business Storage' },
              { href: '/locations', label: 'All Locations' },
              { href: '/size-guide', label: 'Size Guide' },
              { href: '/pricing', label: 'Pricing' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white border border-gray-200 hover:border-modern-red rounded-xl px-4 py-3 text-sm font-bold text-charcoal hover:text-modern-red transition-all text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-modern-red mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-charcoal tracking-tight mb-3">
              Collector vehicle storage questions
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Twelve answers for the questions collectors actually ask before reserving — answer-first so search engines and AI can extract clean snippets.
            </p>
          </div>
          <FaqAccordion items={FAQS} columns={2} />
        </div>
      </section>

      {/* ── FINAL CTA — Protect What You Love Driving ────────── */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={GREEN_PORSCHE_IMAGE}
            alt={GREEN_PORSCHE_ALT}
            fill
            loading="lazy"
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 lg:py-28 text-center">
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight mb-5">
            Protect What You Love <span className="text-modern-red">Driving</span>
          </h2>
          <p className="text-gray-200 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Reserve an indoor enclosed bay, drive-up, or mini-warehouse business unit at the Modern Storage® location closest to your garage — plus climate-controlled units for parts, leather, and documents. Month-to-month. No long-term lease. Ready when you are.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={settings.phoneHref}
              aria-label={`Call Modern Storage® new rentals at ${settings.phoneDisplay}`}
              className="inline-flex items-center gap-2 bg-modern-red hover:bg-modern-red-hover text-white font-black px-8 py-3.5 rounded-full transition-colors text-sm shadow-md"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.16.39 2.41.6 3.71.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.21 2.55.6 3.71a1 1 0 01-.25 1.05l-2.23 2.03z" />
              </svg>
              Call Modern Storage®
            </a>
            <Link
              href="/#locations"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-charcoal font-black px-8 py-3.5 rounded-full transition-colors text-sm shadow-md"
            >
              Find a Location →
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-8 py-3.5 rounded-full transition-colors border border-white/40 text-sm"
            >
              All Arkansas Locations
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
