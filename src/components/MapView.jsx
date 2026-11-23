import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import { getEra, influenceAt, GEO_NAME } from '../data/cities'
import { usePlayer } from '../player/PlayerContext'


// The map is drawn from Natural Earth country shapes (via the world-atlas
// package), so it needs no tile server and works offline.
// Generous limits so the map never re-centres itself on load; they only stop
// you from dragging far out into empty space.
const WORLD_BOUNDS = [
  [-80, -400],
  [88, 400],
]
const DRAWER_W = 440

// Atlas colours: tan and sage land on a blue sea, with white borders.
const LAND_COLOURS = ['#dcd5a6', '#cfd2a2', '#e3d8ab', '#c6cf9f', '#d8d0a0', '#d2d6a8', '#e0d3a0', '#cbd0a0']
const LAND_HOVER = '#f3eec8'
export const BORDER = 'rgba(255,255,255,0.95)'
const hashName = (s) => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}
export const landColour = (name) => LAND_COLOURS[hashName(name) % LAND_COLOURS.length]

// Shapes that cross the 180° meridian (Russia, Fiji) would draw a stripe
// across the whole map. Unwrap each ring and add a mirrored copy instead.
function unwrapRing(ring) {
  const out = [ring[0].slice()]
  for (let i = 1; i < ring.length; i++) {
    let [x, y] = ring[i]
    const px = out[i - 1][0]
    while (x - px > 180) x -= 360
    while (px - x > 180) x += 360
    out.push([x, y])
  }
  return out
}

function fixAntimeridian(f) {
  const g = f.geometry
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates
  const result = []
  for (const poly of polys) {
    const rings = poly.map(unwrapRing)
    const xs = rings.flat().map((p) => p[0])
    result.push(rings)
    if (Math.max(...xs) > 180) result.push(rings.map((r) => r.map(([x, y]) => [x - 360, y])))
    else if (Math.min(...xs) < -180) result.push(rings.map((r) => r.map(([x, y]) => [x + 360, y])))
  }
  return { ...f, geometry: { type: 'MultiPolygon', coordinates: result } }
}

export const FEATURES = feature(world, world.objects.countries)
  .features.filter((f) => f.properties.name !== 'Antarctica')
  .map(fixAntimeridian)

export function pinHtml(city) {
  return `<span class="pin"><svg viewBox="0 0 48 48" aria-hidden="true"><path class="hp-halo" d="M9 29V24C9 14.6 15.2 7 24 7s15 7.6 15 17v5" fill="none" stroke-width="8" stroke-linecap="round"/><path class="hp-band" d="M9 29V24C9 14.6 15.2 7 24 7s15 7.6 15 17v5" fill="none" stroke-width="4" stroke-linecap="round"/><rect class="hp-cup" x="5" y="25" width="10" height="16" rx="4.5"/><rect class="hp-cup" x="33" y="25" width="10" height="16" rx="4.5"/><rect class="hp-pad" x="8" y="29" width="4" height="8" rx="2"/><rect class="hp-pad" x="36" y="29" width="4" height="8" rx="2"/></svg></span><span class="pin-label">${city.name}</span>`
}

export default function MapView({ cities, year, genre, country, selectedId, onSelect, active }) {
  const hostRef = useRef(null)
  const mapRef = useRef(null)
  const geoRef = useRef(null)
  const homeRef = useRef({ center: [36, -40], zoom: 2.5 })
  const markersRef = useRef({})
  const onSelectRef = useRef(onSelect)
  const countryRef = useRef(country)
  const hadSelection = useRef(false)
  const [popped, setPopped] = useState(null)
  const setPoppedRef = useRef(setPopped)
  setPoppedRef.current = setPopped
  const player = usePlayer()
  const playing = !!player && player.status === 'playing'
  const trackKey = player && player.current ? player.current.item.title + player.current.item.artist : ''
  onSelectRef.current = onSelect
  countryRef.current = country

  // Build the map once.
  useEffect(() => {
    const map = L.map(hostRef.current, {
      center: [25, 10],
      zoom: 2,
      minZoom: 0,
      maxZoom: 8,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      zoomControl: false,
    })
    L.control.zoom({ position: 'topleft' }).addTo(map)
    map.attributionControl.setPrefix(false)
    map.attributionControl.addAttribution('Map data: Natural Earth')

    // Which countries have exactly one city? Clicking them opens it.
    const byCountry = {}
    cities.forEach((c) => {
      byCountry[c.country] = byCountry[c.country] || []
      byCountry[c.country].push(c.id)
    })
    const nameToCountry = Object.fromEntries(Object.keys(byCountry).map((k) => [GEO_NAME[k] || k, k]))

    const styleFor = (name) => {
      const key = nameToCountry[name]
      const hasScene = !!key && !!byCountry[key]
      const highlighted = !!key && countryRef.current === key
      return {
        color: highlighted ? '#e01b24' : BORDER,
        weight: highlighted ? 2.6 : 0.9,
        fillColor: highlighted ? '#f3eec8' : landColour(name),
        fillOpacity: 1,
      }
    }

    const geo = L.geoJSON(
      { type: 'FeatureCollection', features: FEATURES },
      {
        style: (f) => styleFor(f.properties.name),
        onEachFeature: (f, layer) => {
          const name = f.properties.name
          const key = nameToCountry[name]
          const ids = key ? byCountry[key] : null
          layer.bindTooltip(ids ? `${name}` : name, { sticky: true, direction: 'top', className: 'country-tip', offset: [0, -4] })
          layer.on('mouseover', () => layer.setStyle({ fillColor: LAND_HOVER, fillOpacity: 0.95 }))
          layer.on('mouseout', () => geo.resetStyle(layer))
          layer.on('click', (e) => {
            L.DomEvent.stopPropagation(e)
            setPoppedRef.current(name)
            onSelectRef.current(ids && ids.length === 1 ? ids[0] : null)
          })
        },
      },
    ).addTo(map)
    geo.styleFor = styleFor
    geoRef.current = geo

    cities.forEach((city) => {
      const icon = L.divIcon({
        className: 'pin-wrap',
        html: pinHtml(city),
        iconSize: [64, 64],
        iconAnchor: [32, 32],
      })
      const marker = L.marker(city.coords, { icon, title: city.name, keyboard: true, riseOnHover: true }).addTo(map)
      marker.on('click', () => onSelectRef.current(city.id))
      markersRef.current[city.id] = marker
    })

    map.on('click', () => {
      setPoppedRef.current(null)
      onSelectRef.current(null)
    })

    // Open on a view that fits every pin, clear of the filter bar and the slider.
    const wide = window.innerWidth > 760
    map.fitBounds(L.latLngBounds(cities.map((c) => c.coords)), {
      paddingTopLeft: wide ? [30, 110] : [12, 150],
      paddingBottomRight: wide ? [30, 180] : [12, 170],
      maxZoom: 4,
      animate: false,
    })
    homeRef.current = { center: map.getCenter(), zoom: map.getZoom() }
    map.setMinZoom(Math.max(0, map.getZoom() - 0.75))
    map.setMaxBounds(WORLD_BOUNDS)
    map.options.maxBoundsViscosity = 0.6

    // With 61 pins, names only show when zoomed in (or on hover / selection).
    const updateLabels = () => map.getContainer().classList.toggle('show-labels', map.getZoom() >= 4.25)
    map.on('zoomend', updateLabels)
    updateLabels()

    // Atlas-style names for continents and oceans (hidden once zoomed in).
    const GEO_LABELS = [
      ['NORTH AMERICA', 47, -102, 'cont'], ['SOUTH AMERICA', -8, -62, 'cont'], ['EUROPE', 63, 24, 'cont'], ['AFRICA', 5, 20, 'cont'],
      ['ASIA', 52, 95, 'cont'], ['AUSTRALIA', -25, 134, 'cont'],
      ['Arctic Ocean', 82, -40, 'sea'], ['Atlantic Ocean', 28, -42, 'sea'], ['Pacific Ocean', -12, -108, 'sea'],
      ['Pacific Ocean', 20, 160, 'sea'], ['Indian Ocean', -22, 78, 'sea'],
    ]
    GEO_LABELS.forEach(([text, lat, lng, kind]) => {
      L.marker([lat, lng], {
        interactive: false,
        keyboard: false,
        zIndexOffset: -1000,
        icon: L.divIcon({ className: 'geo-label ' + kind, html: `<span>${text}</span>`, iconSize: [0, 0] }),
      }).addTo(map)
    })
    const updateGeo = () => map.getContainer().classList.toggle('hide-geo', map.getZoom() >= 4.5)
    map.on('zoomend', updateGeo)
    updateGeo()

    // Keep the map sized correctly when the player bar appears or the window changes.
    const ro = new ResizeObserver(() => map.invalidateSize())
    ro.observe(hostRef.current)
    mapRef.current = map

    return () => {
      ro.disconnect()
      map.remove()
      mapRef.current = null
      geoRef.current = null
      markersRef.current = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Highlight the chosen country.
  useEffect(() => {
    const geo = geoRef.current
    if (geo) geo.setStyle((f) => geo.styleFor(f.properties.name))
  }, [country])

  // The selected city's country pops up above the rest of the map.
  useEffect(() => {
    const geo = geoRef.current
    if (!geo) return
    const city = cities.find((c) => c.id === selectedId)
    const target = city ? GEO_NAME[city.country] || city.country : popped
    geo.eachLayer((layer) => {
      const el = layer.getElement && layer.getElement()
      if (!el) return
      const on = !!target && layer.feature.properties.name === target
      el.classList.toggle('country-pop', on)
      if (on) layer.bringToFront()
    })
  }, [selectedId, cities, popped])

  // A pin or the city menu takes over from a plain country click.
  useEffect(() => {
    if (selectedId) setPopped(null)
  }, [selectedId])

  // Bounce the raised country while a track plays. Apple's audio cannot be
  // analysed from a web page, so this plays a loose, irregular boom-bap groove:
  // every bar is different (strong kick, snare, random ghost hits, a little
  // swing and the odd rest), so it never settles into a steady heartbeat.
  useEffect(() => {
    const geo = geoRef.current
    const root = mapRef.current && mapRef.current.getContainer()
    if (!root) return undefined
    root.classList.remove('is-beating')
    if (!playing || !geo) return undefined
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    root.classList.add('is-beating')

    const hits = [] // { t: start ms, power: 0..1 }
    let barStart = performance.now() + 120
    const planBar = () => {
      const step = 168 * (0.9 + Math.random() * 0.22) // ms per 16th note, drifts each bar
      const rest = Math.random() < 0.06
      const bar = []
      if (!rest) {
        bar.push([0, 1])
        if (Math.random() < 0.9) bar.push([8 + (Math.random() < 0.25 ? 1 : 0), 0.7 + Math.random() * 0.25])
        for (let i = 1; i < 16; i++) {
          if (i === 8 || i === 9) continue
          if (Math.random() < 0.3) bar.push([i, 0.25 + Math.random() * 0.4])
        }
        if (Math.random() < 0.35) bar.push([6 + Math.floor(Math.random() * 3), 0.55 + Math.random() * 0.3])
      }
      bar.forEach(([i, power]) => hits.push({ t: barStart + i * step + (Math.random() - 0.5) * 30, power }))
      barStart += step * (rest ? 6 : Math.random() < 0.15 ? 12 : 16)
    }

    let raf = 0
    const paths = () => {
      const list = []
      geo.eachLayer((l) => {
        const el = l.getElement && l.getElement()
        if (el && el.classList.contains('country-pop')) list.push(el)
      })
      return list
    }
    const frame = (now) => {
      while (barStart < now + 1500) planBar()
      // Sum of fast-attack, slow-decay bumps from recent hits.
      let e = 0
      for (let i = hits.length - 1; i >= 0; i--) {
        const dt = now - hits[i].t
        if (dt > 600) {
          hits.splice(i, 1)
          continue
        }
        if (dt < 0) continue
        const env = dt < 45 ? dt / 45 : Math.exp(-(dt - 45) / 150)
        e += hits[i].power * env
      }
      e = Math.min(1.25, e)
      const lift = 5 + e * 15
      const scale = 1.04 + e * 0.055
      const shadow = 6 + e * 14
      paths().forEach((el) => {
        el.style.transform = `scale(${scale.toFixed(3)}) translateY(${-lift.toFixed(1)}px)`
        el.style.filter = `drop-shadow(0 ${shadow.toFixed(1)}px ${(4 + e * 5).toFixed(1)}px rgba(10, 30, 50, ${(0.35 + e * 0.2).toFixed(2)}))`
      })
      root.style.setProperty('--hit', Math.min(1, e).toFixed(3))
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('is-beating')
      root.style.removeProperty('--hit')
      paths().forEach((el) => {
        el.style.transform = ''
        el.style.filter = ''
      })
    }
  }, [playing, trackKey])

  // Update pin size / state whenever the year or filters change.
  useEffect(() => {
    cities.forEach((city) => {
      const marker = markersRef.current[city.id]
      const el = marker && marker.getElement()
      if (!el) return
      const era = getEra(city, year)
      const influence = influenceAt(city, year)
      const size = 28 + (influence / 100) * 24
      const matches = genre === 'all' || era.genres.includes(genre)
      const visible = country === 'all' || city.country === country
      el.style.setProperty('--s', size.toFixed(1) + 'px')
      el.classList.toggle('is-dim', !matches)
      el.classList.toggle('is-hidden', !visible)
      el.classList.toggle('is-selected', city.id === selectedId)
      marker.setZIndexOffset(city.id === selectedId ? 1000 : Math.round(influence))
      el.setAttribute('aria-label', `${city.name}, ${era.title}, ${year}`)
    })
  }, [cities, year, genre, country, selectedId])

  // Fly to the selected city, leaving room for the drawer.
  useEffect(() => {
    const map = mapRef.current
    if (!map || !active) return
    if (selectedId) {
      const city = cities.find((c) => c.id === selectedId)
      const z = Math.max(map.getZoom(), 5)
      const p = map.project(L.latLng(city.coords), z)
      if (window.innerWidth > 760) p.x += DRAWER_W / 2
      else p.y += window.innerHeight * 0.2
      map.flyTo(map.unproject(p, z), z, { duration: 1.1 })
      hadSelection.current = true
    } else if (hadSelection.current) {
      map.flyTo(homeRef.current.center, homeRef.current.zoom, { duration: 1 })
      hadSelection.current = false
    }
  }, [selectedId, cities, active])

  // Leaflet needs to re-measure after being hidden.
  useEffect(() => {
    if (!active || !mapRef.current) return undefined
    const t = setTimeout(() => mapRef.current && mapRef.current.invalidateSize(), 60)
    return () => clearTimeout(t)
  }, [active])

  return <div ref={hostRef} className="map" style={{ display: active ? 'block' : 'none' }} />
}
