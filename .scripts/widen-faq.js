// One-shot script to widen the FAQ-section container from max-w-4xl to
// max-w-7xl on every page that renders <FaqAccordion ... columns={2} />.
//
// Why a script: doing this by hand across ~20 files is tedious; a previous
// awk attempt had a bug that deleted unrelated max-w-4xl containers
// (final-CTA blocks). This pass uses substring matching with explicit
// containment checks so we only ever rewrite the narrow container that's
// the DIRECT parent of a 2-col FaqAccordion call.
//
// Algorithm:
//   1. Read file as a string.
//   2. Find every FaqAccordion match.
//   3. Walk backward from that match looking for the most recent
//      occurrence of "max-w-4xl mx-auto px-6" within a short window
//      (1500 chars). If found and that window does NOT contain a closing
//      </section> in between, swap it for "max-w-7xl mx-auto px-6".
//   4. Write the modified file.
//
// The </section>-in-between check is the key safety net: it guarantees we
// never reach back into an UNRELATED earlier section and accidentally
// rewrite its container width.

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..', 'app')
const targets = []

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name)
    if (name.isDirectory()) walk(full)
    else if (name.name === 'page.tsx') targets.push(full)
  }
}
walk(root)

const SEARCH_NEEDLE = 'columns={2}'
const NARROW = 'max-w-4xl mx-auto px-6'
const WIDE = 'max-w-7xl mx-auto px-6'
const SECTION_CLOSE = '</section>'
const WINDOW = 1500

let modified = 0
for (const file of targets) {
  const original = fs.readFileSync(file, 'utf8')
  if (!original.includes(SEARCH_NEEDLE)) continue

  // Walk all occurrences of FaqAccordion columns={2}.
  let changed = original
  let cursor = 0
  while (true) {
    const idx = changed.indexOf(SEARCH_NEEDLE, cursor)
    if (idx === -1) break
    const lookBackStart = Math.max(0, idx - WINDOW)
    const window = changed.slice(lookBackStart, idx)
    const narrowIdx = window.lastIndexOf(NARROW)
    if (narrowIdx >= 0) {
      // Make sure there is no </section> between the narrow class and the
      // FaqAccordion — that would mean we're reaching into an earlier
      // section, which is exactly what the previous attempt did wrong.
      const between = window.slice(narrowIdx + NARROW.length)
      if (!between.includes(SECTION_CLOSE)) {
        const absolute = lookBackStart + narrowIdx
        changed = changed.slice(0, absolute) + WIDE + changed.slice(absolute + NARROW.length)
        cursor = absolute + WIDE.length
        continue
      }
    }
    // No safe rewrite for this occurrence; advance past it.
    cursor = idx + SEARCH_NEEDLE.length
  }

  if (changed !== original) {
    fs.writeFileSync(file, changed)
    modified++
    console.log('✓ widened: ' + path.relative(process.cwd(), file))
  }
}

console.log('\nTotal files widened: ' + modified)
