import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { FEATURES, pinHtml, landColour, BORDER } from './MapView'
import { GEO_NAME } from '../data/cities'

// Small reveal map: shows the answer's country and pin.
export default function QuizMap({ city }) {
  const host = useRef(null)

  useEffect(() => {
    const map = L.map(host.current, {
      zoomControl: false,
      attributionControl: false,
      minZoom: 1,
      maxZoom: 7,
      zoomSnap: 0.25,
      scrollWheelZoom: false,
    })
    L.control.zoom({ position: 'topleft' }).addTo(map)
    const target = GEO_NAME[city.country] || city.country
    let bounds = null
    const geo = L.geoJSON(
      { type: 'FeatureCollection', features: FEATURES },
      {
        style: (f) => {
          const hit = f.properties.name === target
          return {
            color: hit ? '#e01b24' : BORDER,
            weight: hit ? 2.6 : 0.8,
            fillColor: hit ? '#f3eec8' : landColour(f.properties.name),
            fillOpacity: 1,
          }
        },
      },
    ).addTo(map)
    geo.eachLayer((l) => {
      if (l.feature.properties.name === target) {
        l.bringToFront()
        const b = l.getBounds()
        // Use the copy closest to the city (some shapes are mirrored over the date line).
        if (b.contains(city.coords) || !bounds) bounds = b
      }
    })
    const icon = L.divIcon({ className: 'pin-icon quiz-pin', html: pinHtml(city), iconSize: [44, 44], iconAnchor: [22, 22] })
    L.marker(city.coords, { icon, interactive: false }).addTo(map)

    const wide = bounds ? bounds.getEast() - bounds.getWest() : 999
    if (bounds && wide <= 70 && bounds.contains(city.coords)) map.fitBounds(bounds, { padding: [30, 30], maxZoom: 5 })
    else map.setView(city.coords, 4)
    const timer = setTimeout(() => map.invalidateSize(), 50)
    return () => {
      clearTimeout(timer)
      map.remove()
    }
  }, [city])

  return <div className="quiz-map" ref={host} role="img" aria-label={`Map showing ${city.name}, ${city.country}`} />
}
