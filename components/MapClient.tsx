'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Location } from '@/lib/data'
import { buildDirectionsUrl } from '@/lib/geo'

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

// Opens the matching popup when selectedSlug changes externally (card click).
function PopupSync({
  selectedSlug,
  markerRefs,
}: {
  selectedSlug: string | null
  markerRefs: React.MutableRefObject<Record<string, L.Marker | null>>
}) {
  const map = useMap()
  useEffect(() => {
    if (!selectedSlug) {
      map.closePopup()
      return
    }
    const marker = markerRefs.current[selectedSlug]
    if (marker) {
      // Pan to the marker so the popup is visible
      map.panTo(marker.getLatLng(), { animate: true })
      marker.openPopup()
    }
  }, [selectedSlug, map, markerRefs])
  return null
}

export default function MapClient({
  locations,
  selectedSlug,
  onPinClick,
  onPopupClose,
}: {
  locations: Location[]
  selectedSlug: string | null
  onPinClick: (slug: string) => void
  onPopupClose: () => void
}) {
  const markerRefs = useRef<Record<string, L.Marker | null>>({})

  // Default view: Arkansas-wide.
  const center: [number, number] = [34.9, -92.5]

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      className="w-full h-[420px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden z-0"
      attributionControl
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />

      {locations.map((loc) => {
        const isSelected = loc.slug === selectedSlug
        const directionsUrl = buildDirectionsUrl(loc)
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
              popupclose: () => onPopupClose(),
            }}
            keyboard={true}
            alt={`${loc.name} in ${loc.city}, ${loc.state}`}
          >
            <Popup minWidth={240} maxWidth={280} closeButton={true} autoPan={true}>
              <div className="font-sans">
                <p className="text-[10px] font-black uppercase tracking-widest text-modern-red mb-1">
                  {loc.city}, {loc.state}
                </p>
                <h3 className="font-black text-charcoal text-base leading-tight mb-2">{loc.name}</h3>
                <p className="text-xs text-gray-700 mb-0.5">{loc.streetAddress}</p>
                <p className="text-xs text-gray-700 mb-2">
                  {loc.city}, {loc.state} {loc.zip}
                </p>
                <p className="text-xs text-gray-700 mb-3">{loc.phone}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {loc.badges.slice(0, 3).map((b) => (
                    <span
                      key={b}
                      className="text-[9px] font-bold uppercase tracking-wide bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={loc.reservationUrl}
                    aria-label={`See available units at ${loc.name}`}
                    className="block w-full text-center bg-modern-red hover:bg-modern-red-hover text-white text-xs font-bold px-4 py-2 rounded-full transition-colors no-underline"
                  >
                    See Available Units
                  </a>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to ${loc.name}`}
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-bold px-4 py-2 rounded-full transition-colors no-underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}

      <FitBounds locations={locations} />
      <PopupSync selectedSlug={selectedSlug} markerRefs={markerRefs} />
    </MapContainer>
  )
}
