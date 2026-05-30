# Google Business Profile Reviews — Setup Guide

This walks you through getting the four Google credentials the Reviews feature
needs, then where to paste them in Vercel. You are the listing owner, so you have
everything required.

You'll end up with these four values:

| Env var | What it is |
| --- | --- |
| `GOOGLE_GBP_CLIENT_ID` | OAuth client ID (Step 4) |
| `GOOGLE_GBP_CLIENT_SECRET` | OAuth client secret (Step 4) |
| `GOOGLE_GBP_REFRESH_TOKEN` | long-lived token tied to your Google login (Step 5) |
| `GOOGLE_GBP_ACCOUNT_ID` | your Business Profile account number (Step 6) |

> ⏳ **Heads-up on timing:** Step 3 (requesting API access) is reviewed by Google
> and can take a few business days. The *reviews* endpoint won't return data until
> that's approved — but you can do all the other steps while you wait.

---

## Step 1 — Create a Google Cloud project

1. Go to **https://console.cloud.google.com** and sign in with the **Google account
   that manages your Modern Storage® listings**.
2. Top bar, click the **project dropdown** (left of the search bar) → **New Project**.
3. Name it `Modern Storage Reviews` → **Create**.
4. When it finishes, make sure that new project is selected in the project dropdown.
5. Note the **Project number** (Dashboard → "Project info" card) — you'll need it in Step 3.

---

## Step 2 — Turn on the APIs

For each of the three APIs below: go to **APIs & Services → Library** (left menu),
type the name in the search box, click the result, then click **Enable**.

1. **Google My Business API** (this is the one that serves reviews)
2. **My Business Account Management API**
3. **My Business Business Information API**

> If "Google My Business API" shows "Request access" instead of "Enable," that's
> expected — handle it in Step 3.

---

## Step 3 — Request access to the Business Profile APIs (the gated step)

Google restricts the reviews API to approved projects.

1. Open the access request form: **https://developers.google.com/my-business/content/prereqs**
   → find the **"Request access"** link/button.
2. Fill it out:
   - **Google Cloud project number:** the number from Step 1.
   - **Use case:** "Display our own business's Google reviews on our company website,
     self-storage.modernstorage.com."
3. Submit. You'll get an email when it's approved (often 2–5 business days).

You can continue with Steps 4–6 now; reviews just won't return data until approval lands.

---

## Step 4 — Create the OAuth client → CLIENT_ID + CLIENT_SECRET

First configure the consent screen, then create the client.

**4a. Consent screen**
1. **APIs & Services → OAuth consent screen**.
2. **User type:** choose **External** → **Create**. (If your Google account is a
   Google Workspace account, **Internal** is fine and skips the "test users" step.)
3. App name: `Modern Storage Reviews`. User support email: your email.
   Developer contact email: your email. → **Save and Continue**.
4. **Scopes** page → **Save and Continue** (don't need to add any here).
5. **Test users** page → **Add Users** → enter **your own Google email** (the one
   that manages the listings) → **Save and Continue**.

**4b. The client**
1. **APIs & Services → Credentials** → **+ Create Credentials** → **OAuth client ID**.
2. **Application type:** **Web application**.
3. Name: `Reviews Web Client`.
4. Under **Authorized redirect URIs** → **+ Add URI** → paste exactly:
   ```
   https://developers.google.com/oauthplayground
   ```
5. **Create**.
6. A box pops up with **Client ID** and **Client secret**. Copy both somewhere safe.
   - `Client ID`  → this is **`GOOGLE_GBP_CLIENT_ID`**
   - `Client secret` → this is **`GOOGLE_GBP_CLIENT_SECRET`**

---

## Step 5 — Get the REFRESH_TOKEN (via OAuth Playground)

1. Go to **https://developers.google.com/oauthplayground**.
2. Click the **gear icon** (⚙️, top-right) → check **"Use your own OAuth credentials"**.
3. Paste your **Client ID** and **Client secret** from Step 4 into the boxes that appear.
   Leave the gear panel open or close it — your entries are saved.
4. On the **left panel (Step 1)**, scroll past the API list to the box labeled
   **"Input your own scopes"** and paste exactly:
   ```
   https://www.googleapis.com/auth/business.manage
   ```
   → click **Authorize APIs**.
5. A Google sign-in opens. Sign in with the **account that manages your listings** →
   click through **Continue / Allow**. (If you see an "unverified app" warning because
   the consent screen is in Testing, click **Advanced → Go to … (unsafe)** — it's your
   own app, this is safe.)
6. You're returned to the Playground on **Step 2**. Click **"Exchange authorization
   code for tokens"**.
7. In the response, find **`Refresh token`** (starts with `1//`). Copy that whole value.
   - This is **`GOOGLE_GBP_REFRESH_TOKEN`**.

> If no refresh token appears, click the gear → ensure "Use your own OAuth credentials"
> is still checked, then revoke and re-run Steps 4–7. A refresh token is only issued on
> a fresh consent.

---

## Step 6 — Get the ACCOUNT_ID

Stay in OAuth Playground (you're still authorized from Step 5):

1. On the **left panel**, find **Step 3** ("Configure request to API"). In the request
   URL box, paste exactly:
   ```
   https://mybusinessaccountmanagement.googleapis.com/v1/accounts
   ```
2. Make sure the HTTP method is **GET** → click **"Send the request"**.
3. In the response on the right, find a line like:
   ```json
   "name": "accounts/123456789012345"
   ```
4. Copy the number after `accounts/` (e.g. `123456789012345`).
   - This is **`GOOGLE_GBP_ACCOUNT_ID`**. (Pasting the full `accounts/123…` also works —
     the code handles both.)

> If you manage more than one account, pick the one whose `accountName` matches
> "Modern Storage" / your business.

---

## Step 7 — Paste everything into Vercel

1. Go to **https://vercel.com**, open the **modern-storage-self-storage** project.
2. **Settings → Environment Variables**.
3. For each value below, click **Add New**, enter the **Key** and **Value**, leave the
   environment set to **Production** (also tick **Preview** if you want previews to work),
   then **Save**:

   | Key | Value |
   | --- | --- |
   | `GOOGLE_GBP_CLIENT_ID` | from Step 4 |
   | `GOOGLE_GBP_CLIENT_SECRET` | from Step 4 |
   | `GOOGLE_GBP_REFRESH_TOKEN` | from Step 5 |
   | `GOOGLE_GBP_ACCOUNT_ID` | from Step 6 |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → "service_role" secret |
   | `CRON_SECRET` | make up a long random string (e.g. a password generator) |

4. Go to **Deployments** tab → newest deployment → **⋯ menu → Redeploy** so the new
   variables take effect.

---

## Step 8 — Trigger the first pull and verify

1. After the redeploy finishes, visit this URL in your browser (swap in your real
   `CRON_SECRET`):
   ```
   https://self-storage.modernstorage.com/api/cron/refresh-reviews?secret=YOUR_CRON_SECRET
   ```
2. You should see a JSON summary like `{"ok":true,"refreshed":10,...}`.
   - `"reason":"...credentials not configured"` → an env var is missing/misspelled.
   - `"status":"fetch-failed"` for every facility → usually the Step 3 access request
     isn't approved yet, or the account ID is wrong.
3. Open **https://self-storage.modernstorage.com/reviews** — ratings and reviews should
   now appear. (After this, the daily 8 AM UTC cron keeps them fresh automatically.)

---

## Step 9 (optional) — Add the "Leave a Review" links

The location IDs are already loaded. The "Leave a Review" button stays hidden until you
add each facility's public review link (these can't be derived from the location IDs):

1. In Google Business Profile, open a location → **"Ask for reviews" / "Get more reviews"**
   → copy the share link (looks like `https://g.page/r/XXXXX/review`).
2. In **Supabase → SQL Editor**, run one update per facility, e.g.:
   ```sql
   update public.review_facilities
   set google_review_link = 'https://g.page/r/XXXXX/review'
   where slug = 'west-little-rock';
   ```
   (slugs: `west-little-rock`, `shackleford`, `riverdale`, `north-little-rock`,
   `maumelle`, `bryant`, `hot-springs`, `bentonville`, `springdale`, `lowell`)

The buttons appear automatically once the links are saved.
