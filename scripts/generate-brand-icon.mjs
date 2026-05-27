// One-shot script — renders Modern Storage® brand icon PNGs.
// Letters use a real bold sans-serif font (Arial Black on Windows /
// Helvetica Bold fallback), rendered as image text by sharp and then
// composited onto the red circle. This produces correctly proportioned
// "MS" letters that match what you'd expect from a real type design.
//
// Run:  node scripts/generate-brand-icon.mjs
//   or: npm run generate:brand-icon

import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = resolve(__dirname, '..', 'public')
mkdirSync(PUBLIC_DIR, { recursive: true })

// Render one icon at the target size.
// transparent: true   → no background fill
// transparent: false  → solid white square background
async function renderIcon({ size, transparent, outPath }) {
  // 1. Render "MS" text to a transparent PNG buffer using sharp's
  //    built-in text rendering. Pango handles the system font lookup.
  //    Font sizing: ~52% of the icon size gives letters that fit
  //    inside the inner ring without crowding.
  const letterPng = await sharp({
    text: {
      text: '<span foreground="white" letter_spacing="-2000">MS</span>',
      font: 'Arial Black',
      fontfile: 'C:\\Windows\\Fonts\\ariblk.ttf',
      width: Math.round(size * 0.62),
      height: Math.round(size * 0.42),
      rgba: true,
      align: 'center',
      justify: true,
    },
  })
    .png()
    .toBuffer()

  // 2. Build the red circle + white inner ring as an SVG layer.
  const ringSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="${size}" height="${size}">
      ${transparent ? '' : '<rect width="1024" height="1024" fill="#FFFFFF"/>'}
      <circle cx="512" cy="512" r="480" fill="#F60001"/>
      <circle cx="512" cy="512" r="420" fill="none" stroke="#FFFFFF" stroke-width="14"/>
    </svg>
  `)

  // 3. Composite the letters centered onto the badge.
  await sharp(ringSvg)
    .composite([{ input: letterPng, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(outPath)
}

const TARGETS = [
  { size: 512, transparent: true, out: 'brand-icon-512.png', label: 'transparent 512' },
  { size: 1024, transparent: true, out: 'brand-icon-1024.png', label: 'transparent 1024' },
  { size: 512, transparent: false, out: 'brand-icon-on-white-512.png', label: 'on-white 512' },
  { size: 1024, transparent: false, out: 'brand-icon-on-white-1024.png', label: 'on-white 1024' },
]

for (const t of TARGETS) {
  const outPath = resolve(PUBLIC_DIR, t.out)
  await renderIcon({ size: t.size, transparent: t.transparent, outPath })
  console.log(`  ✓ ${t.label.padEnd(20)} → public/${t.out}`)
}

// Also write SVG sources that reference Arial Black via <text>. Modern
// browsers use the system font; for upload-anywhere portability we ship
// the PNG outputs above as the canonical brand asset.
const SVG_TRANSPARENT = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" role="img" aria-label="Modern Storage">
  <title>Modern Storage®</title>
  <circle cx="512" cy="512" r="480" fill="#F60001"/>
  <circle cx="512" cy="512" r="420" fill="none" stroke="#FFFFFF" stroke-width="14"/>
  <text x="512" y="512"
        fill="#FFFFFF"
        font-family="'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-weight="900"
        font-size="440"
        letter-spacing="-20"
        text-anchor="middle"
        dominant-baseline="central">MS</text>
</svg>`

const SVG_ON_WHITE = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" role="img" aria-label="Modern Storage">
  <title>Modern Storage®</title>
  <rect width="1024" height="1024" fill="#FFFFFF"/>
  <circle cx="512" cy="512" r="480" fill="#F60001"/>
  <circle cx="512" cy="512" r="420" fill="none" stroke="#FFFFFF" stroke-width="14"/>
  <text x="512" y="512"
        fill="#FFFFFF"
        font-family="'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-weight="900"
        font-size="440"
        letter-spacing="-20"
        text-anchor="middle"
        dominant-baseline="central">MS</text>
</svg>`

writeFileSync(resolve(PUBLIC_DIR, 'brand-icon.svg'), SVG_TRANSPARENT + '\n')
writeFileSync(resolve(PUBLIC_DIR, 'brand-icon-on-white.svg'), SVG_ON_WHITE + '\n')
console.log('  ✓ SVG sources              → public/brand-icon.svg, public/brand-icon-on-white.svg')
console.log('\nDone.')
