// Maps each Modern Storage® amenity badge to a Lucide icon.
//
// The icons replace pill-style amenity chips that read as buttons but
// aren't clickable. Per UX feedback: "this looks like a button — change
// these to bullet points, with a little icon next to them (climate
// control has its own icon, drive-up has a little truck)."
//
// One default icon (Check) is used for any badge we haven't mapped yet —
// so adding a new badge to the LOCATIONS data doesn't break the UI.

import {
  Thermometer,
  Truck,
  Caravan,
  Briefcase,
  DoorOpen,
  Languages,
  PackageCheck,
  Check,
  type LucideIcon,
} from 'lucide-react'

// Normalize badge strings so we match regardless of dashes, ampersands,
// or "and" spelling variants. e.g. "Boat/RV Storage" and "Boat & RV
// Storage" both resolve to the same caravan icon.
function normalize(badge: string): string {
  return badge
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const ICONS: Record<string, LucideIcon> = {
  // Storage formats
  'climate-controlled': Thermometer,
  'climate-controlled-storage': Thermometer,

  // Access
  'drive-up-access': Truck,
  'drive-up': Truck,
  'ground-floor-access': DoorOpen,
  'ground-floor': DoorOpen,

  // Vehicle / parking
  'boat-rv-storage': Caravan,
  'boat-and-rv-storage': Caravan,
  'rv-storage': Caravan,
  'boat-storage': Caravan,
  'vehicle-storage': Caravan,

  // Business
  'business-storage': Briefcase,
  'mini-warehouse': Briefcase,

  // Programs / language
  'free-moving-truck': PackageCheck,
  'se-habla-espanol': Languages,
  'se-habla-español': Languages,
}

export function getBadgeIcon(badge: string): LucideIcon {
  return ICONS[normalize(badge)] ?? Check
}
