# Deploying to Vercel — self-storage.modernstorage.com

This project is a fully static Next.js 14 app. Every route prerenders at build time, so Vercel will serve it from the edge CDN with no serverless functions needed.

## Pre-flight check (already verified)

- [x] `npm run build` passes
- [x] All 8 routes compile (`/`, 4 theme pages, `_not-found`, `sitemap.xml`, `robots.txt`)
- [x] All routes prerendered as static content (`○` in build output)
- [x] Metadata + canonical + Open Graph render correctly
- [x] 5 JSON-LD blocks emit: SelfStorage, LocalBusiness, Service, BreadcrumbList, FAQPage
- [x] `sitemap.xml` lists all 5 pages with production domain
- [x] `robots.txt` allows all + points to production sitemap
- [x] No `localhost` or `http://` references in source
- [x] Image placeholders in place (16 charcoal JPEGs at `/public/images/`)

## Step 1 — Connect repo to Vercel

1. Go to https://vercel.com/new
2. Import the GitHub repo: `Nredom17/self-storage-modern-storage`
3. Vercel auto-detects Next.js — no settings to change
4. Click **Deploy**

The first deploy produces a `*.vercel.app` URL. Verify it loads before adding the custom domain.

## Step 2 — Add the custom subdomain

In the Vercel project:

1. Open **Settings → Domains**
2. Add `self-storage.modernstorage.com`
3. Vercel will display the DNS record you need to create

You'll see one of two options:

**Recommended — CNAME (works for subdomains):**

```
Type:   CNAME
Name:   self-storage
Value:  cname.vercel-dns.com
TTL:    3600 (or auto)
```

Add that record at whoever hosts DNS for `modernstorage.com` (likely the same provider as the podcast subdomain).

## Step 3 — Wait for DNS + SSL

- DNS propagation: usually <5 min, can be up to 24h
- Vercel auto-provisions a Let's Encrypt SSL cert once DNS resolves
- Once green-checked in Vercel, the site is live at https://self-storage.modernstorage.com

## Step 4 — Set up production-only redirects (optional)

If you want to force the apex `modernstorage.com` and `www.modernstorage.com` to keep working unchanged while the subdomain handles self-storage, no Vercel config is needed — the main domain is on a separate deployment.

## Environment variables

**None required.** This project has no API keys, no Supabase, no third-party SDKs. If you add a reservation form or analytics later, set keys in **Settings → Environment Variables**.

## After-deploy checklist

Run these checks against the live URL:

```
https://self-storage.modernstorage.com/                  → 200, hero loads
https://self-storage.modernstorage.com/climate-controlled → 200
https://self-storage.modernstorage.com/boat-rv-vehicle    → 200
https://self-storage.modernstorage.com/business           → 200
https://self-storage.modernstorage.com/household-moving   → 200
https://self-storage.modernstorage.com/sitemap.xml        → XML with 5 URLs
https://self-storage.modernstorage.com/robots.txt         → allow + sitemap line
```

SEO validation:
- Submit `https://self-storage.modernstorage.com/sitemap.xml` in Google Search Console
- Test JSON-LD at https://search.google.com/test/rich-results
- Test Open Graph card at https://www.opengraph.xyz/

## Things to replace before the site goes public

These are placeholders in the codebase that should be swapped for real values. Each is a literal string you can search-and-replace.

| Placeholder | Where | What to do |
|---|---|---|
| `[CENTRALIZED PHONE NUMBER]` | `lib/site.ts` — `PHONE_NUMBER_DISPLAY` and `PHONE_NUMBER_HREF` | Set the real phone number (e.g. `(501) 555-0100` and `tel:+15015550100`) |
| `[RESERVATION LINK]` | `lib/site.ts` — `RESERVATION_URL` | Set the real reservation URL (Storable/SiteLink/etc.). All Reserve buttons across the site point to this single constant |
| `[CONFIRM TEMPERATURE RANGE]` | `lib/climate-controlled.ts` — `CLIMATE_CONCEPTS` and `CLIMATE_FAQS` | Confirm the actual temperature range maintained in climate-controlled units (varies by facility) and either insert specifics or remove the marker |
| `[CONFIRM HUMIDITY DETAILS]` | `lib/climate-controlled.ts` — `CLIMATE_CONCEPTS` and `CLIMATE_FAQS` | Confirm whether and how humidity is actively managed at each facility, then update the copy |
| 25 placeholder JPEGs | `public/images/` | Replace each with the real Modern Storage® photo at the listed filename (filenames are SEO-optimized — keep them) |
| 3 homepage review placeholders | `lib/site.ts` — `REVIEWS` array | Replace with real Google reviews |
| 3 climate-controlled review placeholders | `lib/climate-controlled.ts` — `CLIMATE_REVIEWS` array | Replace with real Google reviews |
| Location addresses | `lib/site.ts` — `LOCATIONS` array | Replace `[Street address placeholder]` with the real street address for each of the 10 facilities |

See `public/images/README.md` for the full image filename map.

### Quick sanity check after replacing placeholders

```bash
# from the project root — should return 0 matches when launch-ready
grep -r "\[CENTRALIZED PHONE NUMBER\]" --include="*.ts" --include="*.tsx" .
grep -r "\[RESERVATION LINK\]" --include="*.ts" --include="*.tsx" .
grep -r "\[CONFIRM TEMPERATURE RANGE\]" --include="*.ts" --include="*.tsx" .
grep -r "\[CONFIRM HUMIDITY DETAILS\]" --include="*.ts" --include="*.tsx" .
```

## Subsequent deploys

Push to `main` → Vercel auto-builds and deploys. Preview deploys are created for every other branch and pull request.

```bash
git add .
git commit -m "Update phone number"
git push
```

The new build will be live in ~60 seconds.
