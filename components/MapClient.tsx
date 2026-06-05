'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Location } from '@/lib/data'

// Brand-red teardrop pin as an HTML/SVG divIcon (no asset path issues with Next.js bundler).
function createPinIcon(isSelected: boolean): L.DivIcon {
  const w = isSelected ? 34 : 28
  const h = isSelected ? 46 : 38
  const fill = '#F60001'
  const stroke = '#ffffff'
  const html = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 32" aria-hidden="true" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <circle cx="12" cy="12" r="4" fill="${stroke}"/>
  </svg>`
  return L.divIcon({
    className: 'modern-storage-pin',
    html,
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
    popupAnchor: [0, -h + 6],
  })
}

// Re-fits the map view to whichever locations are currently shown.
function FitBounds({ locations }: { locations: Location[] }) {
  const map = useMap()
  useEffect(() => {
    if (locations.length === 0) return
    if (locations.length === 1) {
      map.setView([locations[0].lat, locations[0].lon], 13, { animate: true })
      return
    }
    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lon] as [number, number]))
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 11, animate: true })
  }, [locations, map])
  return null
}

// Pans the map to the matching pin when selectedSlug changes externally
// (card click in the sidebar). The on-map popup was removed 2026-06-05
// per Alexandra's direction — facility details now render in a sticky
// side panel beside the map instead of in a Leaflet popup that fought
// the map for space.
function PinPanSync({
  selectedSlug,
  markerRefs,
}: {
  selectedSlug: string | null
  markerRefs: React.MutableRefObject<Record<string, L.Marker | null>>
}) {
  const map = useMap()
  useEffect(() => {
    if (!selectedSlug) return
    const marker = markerRefs.current[selectedSlug]
    if (marker) {
      map.panTo(marker.getLatLng(), { animate: true })
    }
  }, [selectedSlug, map, markerRefs])
  return null
}

export default function MapClient({
  locations,
  selectedSlug,
  onPinClick,
}: {
  locations: Location[]
  selectedSlug: string | null
  onPinClick: (slug: string) => void
}) {
  const markerRefs = useRef<Record<string, L.Marker | null>>({})

  // Default view: Arkansas-wide.
  const center: [number, number] = [34.9, -92.5]

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      className="w-full h-[260px] sm:h-[300px] lg:h-[360px] rounded-2xl overflow-hidden z-0"
      attributionControl
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />

      {/* Pins emit onPinClick only — no Leaflet popup. The selected
          facility's full details render in the side panel beside the
          map (see LocationFinder.tsx <SelectedFacilityPanel/>). */}
      {locations.map((loc) => {
        const isSelected = loc.slug === selectedSlug
        return (
          <Marker
            key={loc.slug}
            position={[loc.lat, loc.lon]}
            icon={createPinIcon(isSelected)}
            ref={(instance) => {
              markerRefs.current[loc.slug] = instance ?? null
            }}
            eventHandlers={{
              click: () => onPinClick(loc.slug),
            }}
            keyboard={true}
            alt={`${loc.name} in ${loc.city}, ${loc.state}`}
          />
        )
      })}

      <FitBounds locations={locations} />
      <PinPanSync selectedSlug={selectedSlug} markerRefs={markerRefs} />
    </MapContainer>
  )
}
