# Blog Drafts — Phase 4 of the SEO/AEO Plan

This folder holds Markdown drafts for the 10 blog posts on `self-storage.modernstorage.com/blog`. Each draft is one file. The fields inside map 1:1 to the form inputs in the `/admin/blog` editor — copy each section into its matching field, upload the suggested hero image, click Publish.

## How the drafts are structured

Each `NN-slug-name.md` file contains:

| Section header in the draft | Where it goes in `/admin/blog` |
| --- | --- |
| `=== TITLE ===` | "Title (browser tab)" input |
| `=== H1 ===` | "H1 (page heading)" input |
| `=== META DESCRIPTION ===` | "Meta description" textarea |
| `=== PRIMARY KEYWORD ===` | "Primary keyword" input |
| `=== SECONDARY KEYWORDS ===` | "Secondary keywords" comma-separated input |
| `=== CATEGORY ===` | "Category" dropdown (Pricing / Climate / Size / Moving / etc.) |
| `=== HERO IMAGE ===` | Hero image upload + alt text |
| `=== INTRO ===` | "Intro" textarea (renders above the Quick Answer aside) |
| `=== QUICK ANSWER ===` | "Quick Answer" textarea (the red aside block at the top) |
| `=== BODY ===` | Block editor — paste paragraphs and headings in order |
| `=== FAQS ===` | FAQ block editor — one Q / A pair per entry |
| `=== CTA SECTION ===` | CTA label + URL inputs |
| `=== TAGS ===` | Tags input (comma-separated) |
| `=== AUTHOR ===` | "Author" input |
| `=== DISCLAIMER ===` | Optional "Disclaimer" textarea (renders as italic footer) |

The draft also includes a section called "SUGGESTED INTERNAL LINKS" — those are already woven into the body paragraphs, so you don't need to add them separately. They're listed at the bottom so you can verify each one lands on a real page during your review pass.

## The 10 posts (priority order)

| # | File | Topic | Status |
| --- | --- | --- | --- |
| 1 | `01-self-storage-pricing-arkansas.md` | Self Storage Pricing in Arkansas — full fee breakdown | **Drafted** |
| 2 | `02-how-to-choose-storage-unit-size.md` | How to Choose a Storage Unit Size — decision framework | **Drafted** |
| 3 | `03-climate-controlled-storage-arkansas-humidity.md` | How Climate-Controlled Storage Works in Arkansas Humidity | _Pending_ |
| 4 | `04-storage-vs-garage-arkansas.md` | Self Storage vs Your Arkansas Garage | _Pending_ |
| 5 | `05-business-storage-arkansas.md` | Business Storage in Arkansas — e-commerce, contractors, records | _Pending_ |
| 6 | `06-rv-boat-storage-arkansas-lakes.md` | RV & Boat Storage Near Arkansas Lakes | _Pending_ |
| 7 | `07-storage-furniture-arkansas.md` | Storing Furniture in Arkansas — climate-controlled vs drive-up | _Pending_ |
| 8 | `08-24-hour-access-storage.md` | Storage Access Hours — What 7-Day Gated Access Means | _Pending_ |
| 9 | `09-moving-checklist-storage.md` | Moving Day Checklist — How to Use Storage During a Move | _Pending_ |
| 10 | `10-month-to-month-storage.md` | Month-to-Month Storage — What "No Long-Term Contract" Means | _Pending_ |

## Publishing workflow

1. Open the draft file in this folder.
2. Open `/admin/blog/new` in another tab.
3. Copy each section into its matching field.
4. Upload the suggested hero image (or pick a similar one from your library).
5. Use the "Suggest FAQs from body" button if you want the AI suggester to add more on top of the four I've drafted (optional).
6. Preview, publish.
7. Update the table above — change _Pending_ to **Published**, or move the file to a `published/` subfolder.

## Tone and format

Every post follows the same pattern: **concise → detailed → bullets**. The lead sentence answers the search query directly so AI engines can extract a clean snippet, the detail paragraph adds the substance, and a bulleted list compresses the key takeaway for scanners. All numbers (price ranges, humidity, temperature) match the rest of the site exactly — no internal contradictions.
