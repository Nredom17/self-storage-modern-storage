// One-shot script — renders Modern Storage® brand icon PNGs from a
// self-contained SVG string. Outputs to /public so the files are both
// served by the live site and downloadable as upload-ready assets
// (Google Search Console favicon, Google Business Profile logo,
// social profile avatars, etc.).
//
// Run:  node scripts/generate-brand-icon.mjs
//
// The script renders letters from path geometry (not <text>) so the
// output is byte-identical regardless of which fonts are installed on
// the build machine — sharp/librsvg's font fallback chain is unreliable
// across Windows/macOS/Linux/CI.

import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = resolve(__dirname, '..', 'public')
mkdirSync(PUBLIC_DIR, { recursive: true })

// Letter geometry on a 1024×1024 canvas, both letters baseline-aligned
// in y∈[332, 692] (380 tall) inside the inner ring.
//
// M : single 7-point polygon — vertical pillars on each side with a V
//     notch cut into the top, peak at y=572.
// S : five overlapping rectangles forming three horizontal bars + two
//     short side connectors. Cleaner to reason about than a single
//     compound path, and renders identically.
const M_LETTERS = `
  <g fill="#FFFFFF">
    <!-- M : x∈[240,480], 240 wide -->
    <path d="
      M 240 332
      L 300 332
      L 360 572
      L 420 332
      L 480 332
      L 480 692
      L 240 692
      Z
    "/>
    <!-- S : x∈[544,784], 240 wide, built from 5 rectangles.
         Top bar / left connector / middle bar / right connector / bottom bar -->
    <rect x="544" y="332" width="240" height="80"/>
    <rect x="544" y="412" width="80"  height="68"/>
    <rect x="544" y="476" width="240" height="72"/>
    <rect x="704" y="544" width="80"  height="68"/>
    <rect x="544" y="612" width="240" height="80"/>
  </g>`

const SVG_TRANSPARENT = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <circle cx="512" cy="512" r="480" fill="#F60001"/>
  <circle cx="512" cy="512" r="420" fill="none" stroke="#FFFFFF" stroke-width="14"/>
  ${M_LETTERS}
</svg>`.trim()

const SVG_ON_WHITE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#FFFFFF"/>
  <circle cx="512" cy="512" r="480" fill="#F60001"/>
  <circle cx="512" cy="512" r="420" fill="none" stroke="#FFFFFF" stroke-width="14"/>
  ${M_LETTERS}
</svg>`.trim()

const TARGETS = [
  { svg: SVG_TRANSPARENT, size: 512, out: 'brand-icon-512.png', label: 'transparent 512' },
  { svg: SVG_TRANSPARENT, size: 1024, out: 'brand-icon-1024.png', label: 'transparent 1024' },
  { svg: SVG_ON_WHITE, size: 512, out: 'brand-icon-on-white-512.png', label: 'on-white 512' },
  { svg: SVG_ON_WHITE, size: 1024, out: 'brand-icon-on-white-1024.png', label: 'on-white 1024' },
]

for (const t of TARGETS) {
  const outPath = resolve(PUBLIC_DIR, t.out)
  await sharp(Buffer.from(t.svg))
    .resize(t.size, t.size)
    .png({ compressionLevel: 9 })
    .toFile(outPath)
  console.log(`  ✓ ${t.label.padEnd(20)} → public/${t.out}`)
}

// Also overwrite the canonical SVG sources with the path-based geometry
// so the SVG and PNG are visually identical (no <text> font dependency).
writeFileSync(resolve(PUBLIC_DIR, 'brand-icon.svg'), SVG_TRANSPARENT + '\n')
writeFileSync(resolve(PUBLIC_DIR, 'brand-icon-on-white.svg'), SVG_ON_WHITE + '\n')
console.log('  ✓ SVG sources              → public/brand-icon.svg, public/brand-icon-on-white.svg')
console.log('\nDone. Upload public/brand-icon-512.png (transparent) or')
console.log('public/brand-icon-on-white-512.png to Google Search Console,')
console.log('Google Business Profile, social avatars, etc.')
