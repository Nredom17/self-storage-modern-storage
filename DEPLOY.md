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

| Var | Required for | Notes |
|---|---|---|
| `RESEND_API_KEY` | Business inquiry form on `/business-storage` | Get from https://resend.com → API Keys. Without it, `/api/business-inquiry` falls back to logging the submission to the server console and returning `{ ok: true, dev: true }` — useful for local dev, but on Vercel production this means inquiries are silently dropped to logs. **Required for production.** |
| `BUSINESS_INQUIRY_TO` | Optional | Override recipient (default `info@modernstorage.com`) without a code deploy. |
| `BUSINESS_INQUIRY_FROM` | Optional | Override sender (default `Modern Storage® Website <forms@modernstorage.com>`). Until the `modernstorage.com` domain is verified in Resend, you can temporarily set this to `onboarding@resend.dev` to send while DNS propagates. |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Only if you want runtime-editable locations/settings from Supabase. Without it, the static fallback in `lib/site.ts` is used. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Pair with the URL above. |

### Resend setup (one-time)

1. **Sign up** at https://resend.com (free tier: 100/day, 3,000/month).
2. **Create API key** in the dashboard → copy it into Vercel as `RESEND_API_KEY`.
3. **Verify the sending domain**:
   - Add `modernstorage.com` (or a subdomain like `mail.modernstorage.com`) in Resend → Domains.
   - Resend will show you DKIM and SPF DNS records (TXT + CNAME). Add those at whoever hosts DNS for `modernstorage.com`.
   - Wait for the green checkmark (usually <30 min).
4. **Confirm the from-address** in `BUSINESS_INQUIRY_FROM` matches the verified domain. The default `forms@modernstorage.com` works as soon as `modernstorage.com` is verified.

Once those steps are done, inquiries submitted from `/business-storage` arrive at `info@modernstorage.com` with the user's email set as the `Reply-To`, so the team can reply directly from their inbox.

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
| ~~`[CENTRALIZED PHONE NUMBER]`~~ ✅ Done | `lib/site.ts` — `PHONE_NUMBER_DISPLAY` and `PHONE_NUMBER_HREF` | Live number `501-910-0096` is wired through `lib/site.ts` and `supabase/seed.sql` |
| ~~`[RESERVATION LINK]`~~ ✅ Done | `lib/site.ts` — `RESERVATION_URL` | Generic "Reserve" buttons now steer to `/#locations` so the customer picks a facility first; per-location "See Available Units" buttons use each facility's individual `reservationUrl`. If you ever get a single master Storable URL, swap `RESERVATION_URL` (and the matching `reservation_url` row in `supabase/seed.sql`) back to it. |
| ~~`[CONFIRM TEMPERATURE RANGE]`~~ ✅ Done | `lib/climate-controlled.ts` — `CLIMATE_CONCEPTS` and `CLIMATE_FAQS` | Filled in as ~59°F-79°F. If operations approves a tighter spec, update the two copy spots in `lib/climate-controlled.ts`. |
| ~~`[CONFIRM HUMIDITY DETAILS]`~~ ✅ Resolved | `lib/climate-controlled.ts` | Humidity concept card removed; the page no longer claims a specific managed humidity range. WHAT_TO_STORE copy still references humidity as a risk to items (accurate, no commitment). |
| 25 placeholder JPEGs | `public/images/` | Replace each with the real Modern Storage® photo at the listed filename (filenames are SEO-optimized — keep them) |
| ~~3 homepage review placeholders~~ ✅ Done | `lib/site.ts` — `REVIEWS` array | Replaced with the same 3 real Google reviews used on /climate-controlled. Homepage also now emits per-location SelfStorage schema (10 facilities) + Review schema linked via `itemReviewed` `@id`. |
| ~~3 climate-controlled review placeholders~~ ✅ Done | `lib/climate-controlled.ts` — `CLIMATE_REVIEWS` array | Replaced with 3 real Google reviews (Jeffrey B. — Riverdale; Sholanda G. — West Little Rock; Holly G. — Bentonville). Each carries a `facilitySlug` and is emitted as schema.org Review JSON-LD linked via `itemReviewed` to the SelfStorage `@id` of the right facility. |
| ~~Location addresses~~ ✅ Done | `lib/site.ts` — `LOCATIONS` array and `supabase/seed.sql` | All 10 facility addresses + ZIPs filled in; `maumelle` slug renamed to `Modern Storage® Maumelle Blvd` at 9100 Maumelle Blvd, North Little Rock, AR 72113 |

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
