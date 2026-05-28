// Build a highly-legible favicon from the brand "MS" mark.
//
// The source art (public/images/modern_storage_ms_.png) is a red double
// ring + red "MS" on a transparent background with generous padding.
// At 16–32px tab size that reads as a faint, near-empty blob. This script
// fixes legibility two ways:
//   1. Trim the transparent padding so the mark fills the frame.
//   2. Place it on a solid white rounded tile so the red reads against
//      both light and dark browser tab backgrounds.
//
// Run:  node scripts/make-favicon.mjs

import sharp from 'sharp'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SRC = resolve(ROOT, 'public/images/modern_storage_ms_.png')
const PUBLIC = resolve(ROOT, 'public')

// 1. Trim transparent border to a tight bounding box around the rings.
const trimmed = await sharp(SRC).trim({ threshold: 10 }).toBuffer()

// 2. For each target: resize the trimmed mark to fill ~84% of the tile
//    (8% margin per side so the outer ring isn't flush), then center it
//    on a square tile of the given background.
async function build(out, size, background) {
  const inner = Math.round(size * 0.84)
  const mark = await sharp(trimmed)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  await sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(resolve(PUBLIC, out))
  console.log(`  ✓ public/${out} (${size}x${size})`)
}

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 }

await build('favicon-ms-512.png', 512, WHITE) // primary favicon — white tile, always visible
await build('favicon-ms-192.png', 192, WHITE) // PWA / Android
await build('favicon-ms-transparent-512.png', 512, CLEAR) // transparent variant if needed
console.log('Done.')
