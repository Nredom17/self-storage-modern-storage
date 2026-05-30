# Modern Storage® Self-Storage Hub — SEO Roadmap

**Source of truth:** verified against the live site `https://self-storage.modernstorage.com` and the synced `main` branch on 2026-05-26. Replaces the stale audit from third-party tooling that was based on an older repo snapshot.

---

## Current state — what's already in place

Cross off as you read. None of these need new work.

### Pages indexed (8 URLs in sitemap.xml)

| Path | Status | Notes |
|---|---|---|
| `/` | ✅ Live | Homepage hub, hero, all 4 service options, 10-location map, FAQ |
| `/climate-controlled` | ✅ Live | Full SEO build, 7-concept explainer, 6-size guide, 10 FAQs |
| `/household-storage` | ✅ Live | (was `/household-moving` — renamed) |
| `/rv-boat-vehicle` | ✅ Live | (was `/boat-rv-vehicle` — renamed; 5-facility filter applied) |
| `/business-storage` | ✅ Live | (was `/business` — renamed; includes contact form) |
| `/ai-storage-size-finder` | ✅ Live | Interactive sizing tool, indexable SEO page |
| `/free-moving-truck` | ✅ Live | Dedicated landing page |
| `/move-in-checklist` | ✅ Live | Lead-gated checklist with print-to-PDF |

### Technical SEO foundation

- ✅ `sitemap.xml` lists all 8 routes at the production domain
- ✅ `robots.txt` allows all, references sitemap
- ✅ Canonical URLs on every page (verified)
- ✅ Open Graph + Twitter Card on every page
- ✅ JSON-LD schemas in markup: `SelfStorage`, `LocalBusiness`, `Service`, `OfferCatalog`, `BreadcrumbList`, `FAQPage`, `Review`, `Rating`, `Person`, `PostalAddress`, `GeoCoordinates`
- ✅ ISR (`revalidate = 60`) — Supabase edits propagate within 60s without a code push
- ✅ `lib/data.ts` graceful fallback if Supabase is offline
- ✅ Mobile-first responsive design (verified via class audit)
- ✅ Lazy-loaded images below the fold (`loading="lazy"`)
- ✅ Real phone (`501-910-0096`), real reservation URLs (10 per-location), real ZIPs + street addresses for all 10 locations
- ✅ Real Modern Storage® trademark coverage sitewide (361 occurrences with ®, 0 bare)
- ✅ Real award attribution in hero badge (Arkansas Democrat Gazette + Best of Northwest Arkansas)
- ✅ Live interactive Leaflet/OpenStreetMap with 10 location pins

---

## Real gaps — prioritized punch list

### TIER 1 — Highest impact (do first)

#### 1.1  Per-city landing pages (×10)
**Why:** This is the **single biggest local-SEO gap**. Every "See Available Units" click currently leaves this subdomain for modernstorage.com — the authority builds the wrong domain. Local-intent queries ("storage units Bentonville," "self storage Little Rock") are the highest-converting bucket in this industry.

**What to build:** 10 city-focused pages, one per facility region:
- `/locations/west-little-rock`
- `/locations/shackleford`
- `/locations/riverdale`
- `/locations/north-little-rock`
- `/locations/maumelle-blvd`
- `/locations/bryant`
- `/locations/hot-springs`
- `/locations/bentonville`
- `/locations/springdale`
- `/locations/lowell`

**Each page must include:**
- H1 with city + service ("Self Storage in Bentonville, AR | Modern Storage®")
- Real street address, ZIP, phone, hours, gate-access hours
- Embedded Leaflet map zoomed to that single pin
- 3–5 paragraphs of city-specific copy (nearby landmarks, drive times, common reasons people in that city rent storage)
- Available unit sizes at that facility with rent ranges
- Climate-controlled / drive-up / boat-RV availability badges
- Facility-specific photo gallery (3+ photos)
- 3–5 real Google reviews scoped to that location
- City-specific FAQ block (5–8 Qs)
- "Reserve a unit" CTA → real reservation URL for that facility
- "Get Directions" → maps.google.com deep link
- `LocalBusiness` JSON-LD with full PostalAddress, GeoCoordinates, openingHours, telephone, image, sameAs (Google Business Profile URL)
- BreadcrumbList: Home → Locations → [City Name]

**Implementation note:** Use Next.js dynamic route `app/locations/[slug]/page.tsx` reading from the existing `LOCATIONS` array (already has lat/lon/streetAddress/zip). Generate `generateStaticParams()` for all 10. ~6–8 hours of focused work for all 10 pages.

**Effort:** 8h dev + 4h content writing per city (40h content total). Recommend writing 1–2 pages with copy first, then templating the rest.

---

#### 1.2  Locations hub page
**Why:** Funnels traffic from "modern storage locations" / "storage near me" → individual city pages. Provides a single internal-link target for the header/footer.

**What to build:** `/locations`

- H1: "Modern Storage® Locations in Arkansas"
- 10 location cards in a grid (already have the data + photos)
- Filter by region (existing chip pattern)
- Embedded all-pin Leaflet map (same as homepage but full-section)
- 2–3 paragraphs of statewide service-area copy
- Link to every city page from 1.1

**Effort:** 2h. Smaller scope, reuses existing `LocationFinder` component.

---

#### 1.3  Visible breadcrumb component
**Why:** `BreadcrumbList` JSON-LD already exists on every page, but only `/climate-controlled` and `/rv-boat-vehicle` render breadcrumbs as visible HTML (verified). Visible breadcrumbs help users + Google parse site structure.

**What to build:** Add the existing breadcrumb pattern (already used on `/climate-controlled`) to:
- `/business-storage`
- `/household-storage`
- `/ai-storage-size-finder`
- `/free-moving-truck`
- `/move-in-checklist`
- All future city pages from 1.1

**Effort:** 30 minutes. Extract the existing breadcrumb JSX into a `<Breadcrumb>` component, drop into each page hero.

---

#### 1.4  About + Contact pages
**Why:** Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Local SEO favors clear business identity. Currently neither page exists on this subdomain — and the Best of the Best Self-Storage Awards (three-time winner) have no dedicated home.

**What to build:**
- `/about` — Company story, Best-of-the-Best awards (with Arkansas Democrat Gazette + Best of NWA attribution), leadership / founder bio if available, brand history, what makes Modern Storage® different.
- `/contact` — Phone (`501-910-0096`), email (`info@modernstorage.com`), all 10 location addresses + hours as crawlable text, a contact form (the existing `BusinessContactForm.tsx` can be reused or scoped down). `LocalBusiness` JSON-LD with full NAP.

**Effort:** 3h dev + 3h content writing.

---

### TIER 2 — Medium impact (do after Tier 1)

#### 2.1  Self-storage size guide page
**Why:** "What size storage unit do I need" is one of the highest-volume bottom-funnel storage queries. The `/ai-storage-size-finder` covers the interactive angle; a static, indexable guide covers the SEO angle.

**What to build:** `/storage-sizes` (or `/size-guide`)
- Visual comparison of all 6 sizes (5×5 through 10×30)
- Each size: what fits, square footage, room equivalents, photo
- Comparison table
- CTA to the AI Size Finder for interactive sizing
- CTA to reserve

**Effort:** 4h.

---

#### 2.2  Storage tips / blog hosted on this subdomain
**Why:** Footer currently links "Storage Tips" → `https://www.modernstorage.com/blog`. That content builds authority on the *other* domain. Self-storage queries with informational intent ("how to pack a TV for storage," "best way to store leather furniture") should target this subdomain instead.

**Options:**
- **A** (fastest): Build `/storage-tips` as a single-page resource hub with 8–15 topic sections. Cheap, ships in 4h, immediate keyword coverage.
- **B** (highest value): Migrate or duplicate top-performing blog posts from `modernstorage.com/blog` to `/blog` on this subdomain. ~8h dev for blog infrastructure + ongoing content.

**Effort:** 4h (option A) or 16h+ (option B).

---

#### 2.3  Reviews hub page
**Why:** Currently reviews live inside individual pages as 3-card placeholders flagged for replacement. A dedicated `/reviews` page can host Google review embeds + 20–30 quotes by category/location.

**What to build:** `/reviews`
- Filterable by location and theme (clean facility, helpful staff, easy move-in, etc.)
- Link out to Google review profile for each location (`sameAs` in `LocalBusiness` schema)
- Aggregate `Review` + `AggregateRating` JSON-LD

**Effort:** 3h dev + ongoing content as real reviews come in.

---

#### 2.4  Privacy + Terms pages (legal)
**Why:** Footer should link to these for compliance + trust. Lead-gated forms (`/api/checklist-lead`, `/api/business-inquiry`) collect PII — privacy disclosure is genuinely required.

**Effort:** 1h dev (template), legal-reviewed copy out of scope.

---

#### 2.5  Spanish landing page
**Why:** The `Se Habla Español` badge on West Little Rock implies bilingual support. If true, a Spanish version of the homepage (`/es` or `/es-ar/`) captures that audience. Add `hreflang` pairs.

**Effort:** 2h dev (i18n setup) + 6h translation. Only do if bilingual service is genuinely staffed.

---

### TIER 3 — Polish (do whenever)

#### 3.1  Image sitemap
**Why:** This site is image-heavy with descriptive filenames + alt text. An image sitemap helps Google Images surface the facility photos.

**What to build:** Add `<image:image>` blocks to `app/sitemap.ts` for each page's primary images.

**Effort:** 1h.

---

#### 3.2  RSS / Atom feed
**Why:** If the blog (2.2) ships, an RSS feed at `/feed.xml` helps news aggregators + AI scrapers cite your content.

**Effort:** 1h once blog exists.

---

#### 3.3  Cross-link "nearby cities" on each location page
**Why:** Internal-link density across geo-related pages. On `/locations/bentonville`, link out to `/locations/springdale` and `/locations/lowell` ("Also serving Springdale and Lowell"). On `/locations/shackleford`, link to `/locations/west-little-rock` and `/locations/riverdale`.

**Effort:** 30 min, after 1.1 is done.

---

#### 3.4  Performance / Core Web Vitals audit
**Why:** Currently no measured baseline. Image-heavy hero pages risk LCP regression as more content lands.

**What to do:**
- Run PageSpeed Insights on `/`, `/climate-controlled`, `/rv-boat-vehicle`
- Check LCP ≤ 2.5s, INP < 200ms, CLS < 0.1
- If LCP poor, preload hero image with `<link rel="preload" as="image" fetchPriority="high">`
- Verify Leaflet map isn't blocking interactivity (it's already dynamic-imported)

**Effort:** 2h investigation + variable fix time.

---

#### 3.5  Google Business Profile + Search Console
**Why:** Outside this codebase but critical for local SEO.

**What to do:**
- Verify all 10 facilities have claimed Google Business Profiles, NAP matches site
- Submit `https://self-storage.modernstorage.com/sitemap.xml` in Search Console
- Add `sameAs` GBP URLs to each `LocalBusiness` JSON-LD

**Effort:** 4h ops work, no code changes.

---

## Recommended sprint order

| Sprint | Work | Effort | Outcome |
|---|---|---|---|
| **1** | 1.2 Locations hub + 1.3 Breadcrumb component + 1.4 About/Contact | ~10h | 3 new indexable pages, breadcrumb everywhere |
| **2** | 1.1 Per-city pages (10 × template) | ~12h dev + 40h content | 10 indexable city pages, biggest local-SEO unlock |
| **3** | 2.1 Size guide + 2.3 Reviews hub + 2.4 Privacy/Terms | ~8h | 3 more indexable pages, legal coverage |
| **4** | 2.2 Storage tips / blog (option A first) | ~4h | Content authority moves to this subdomain |
| **5** | 3.1 Image sitemap + 3.3 Cross-links + 3.4 CWV audit + 3.5 GBP | ~8h | Polish, measurement, ongoing |

End state: **~24 indexable pages** (up from 8), full internal-link graph, real local-SEO surface area for every facility, content authority concentrated on this subdomain instead of leaking to the apex domain.

---

## Things explicitly NOT recommended

To keep the roadmap honest, here are things I considered and rejected:

- **AMP** — Deprecated by Google, Next.js doesn't ship first-class support, no SEO benefit.
- **Separate mobile site** — Responsive design covers it. Don't fragment.
- **Auto-generated content via AI** — Google's helpful-content guidance penalizes thin AI content. City pages must have real, hand-written local content.
- **Schema for every possible type** — More schema isn't always better. Stick to types Google actually uses for rich results: `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `Review`. Skip exotic types unless Google docs explicitly cite them.
- **Aggressive interlinking with exact-match anchor text** — Past a point this looks manipulative. Use natural anchor variations.

---

*Last updated: 2026-05-26. Maintainer: the engineer holding the keys to this repo. Update this doc whenever a Tier item ships.*
