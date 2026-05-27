'use client'

// Interactive "What belongs in climate-controlled" showcase.
//
// Per UX consultant feedback on /climate-controlled: the dense 18-item
// grid is text-heavy. They suggested either a carousel or a tab system
// where clicking an item updates an adjacent image with description
// overlay. This implements the tab pattern.
//
// Layout:
//   Left  (lg col-span-5): 2-column grid of clickable item tabs, each
//                          tab shows its Lucide icon + label.
//   Right (lg col-span-7): a single anchor photo (the real Bentonville
//                          climate-controlled hallway image we already
//                          have) with a dark gradient overlay and the
//                          selected item's icon, title, and description
//                          rendered on top.
//
// The image stays consistent across selections — it grounds the whole
// section visually without needing per-item photography we don't have
// yet. The selection state changes the overlay content only.
//
// Mobile: tabs render above, image+overlay stacks below.

import { useState } from 'react'
import Image from 'next/image'
import {
  Armchair,
  Sofa,
  BedDouble,
  Tv,
  Image as ImageIcon,
  FileHeart,
  BookOpen,
  Frame,
  Music,
  Disc,
  Wine,
  Shirt,
  Sparkles,
  Trophy,
  Award,
  Camera,
  Scissors,
  Boxes,
  Check,
  type LucideIcon,
} from 'lucide-react'

type StoreItem = {
  label: string
  description: string
}

// Per-item icon mapping. Each WHAT_TO_STORE entry gets a specific
// Lucide icon. Default to Check if a future item is added without a
// mapping — keeps the UI safe.
const ICON_BY_LABEL: Record<string, LucideIcon> = {
  'Wood furniture': Armchair,
  'Leather furniture': Sofa,
  'Mattresses': BedDouble,
  'Electronics': Tv,
  'Photos and documents': ImageIcon,
  'Medical records': FileHeart,
  'Books': BookOpen,
  'Art and framed prints': Frame,
  'Musical instruments': Music,
  'Vinyl records': Disc,
  'Wine': Wine,
  'Clothing': Shirt,
  'Holiday decor': Sparkles,
  'Collectibles': Trophy,
  'Sports memorabilia': Award,
  'Cameras': Camera,
  'Sewing equipment': Scissors,
  'Business inventory': Boxes,
}

function iconFor(label: string): LucideIcon {
  return ICON_BY_LABEL[label] ?? Check
}

export default function WhatToStoreShowcase({
  items,
  imageUrl,
  imageAlt,
}: {
  items: readonly StoreItem[]
  imageUrl: string
  imageAlt: string
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = items[selectedIndex] ?? items[0]
  const SelectedIcon = iconFor(selected.label)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* ── Tabs column ─────────────────────────────────────────
          18 items in a 2-column grid. On mobile this is still 2
          columns because the labels are short. Each tab is a real
          <button> for keyboard + screen-reader support. */}
      <div
        className="lg:col-span-5 grid grid-cols-2 gap-2"
        role="tablist"
        aria-label="Items to store in climate-controlled storage"
      >
        {items.map((item, i) => {
          const isActive = i === selectedIndex
          const Icon = iconFor(item.label)
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="what-to-store-detail"
              onClick={() => setSelectedIndex(i)}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-modern-red focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ${
                isActive
                  ? 'bg-modern-red text-white shadow-lg'
                  : 'bg-white/5 hover:bg-white/15 text-gray-200 border border-white/10'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-modern-red'}`}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* ── Detail panel ────────────────────────────────────────
          Static anchor photo with gradient overlay. Selected item's
          icon, title, and description render on top. aria-live so
          screen readers announce changes when the user activates a
          different tab. */}
      <div
        id="what-to-store-detail"
        role="tabpanel"
        aria-live="polite"
        className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] bg-gray-800 shadow-2xl"
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        {/* Dark gradient — heavier at bottom where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/85 to-charcoal/20" aria-hidden="true" />

        {/* Selected item label badge — top-left */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-modern-red text-white px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
            Climate-controlled best fit
          </span>
        </div>

        {/* Selection detail — bottom-anchored */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-modern-red flex items-center justify-center shrink-0 shadow-lg">
              <SelectedIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.2} aria-hidden="true" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {selected.label}
            </h3>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl">
            {selected.description}
          </p>
        </div>
      </div>
    </div>
  )
}
