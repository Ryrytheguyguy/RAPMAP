import { useCallback, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Welcome from './components/Welcome'
import MapView from './components/MapView'
import Filters from './components/Filters'
import YearSlider from './components/YearSlider'
import CityDrawer from './components/CityDrawer'
import Influence from './components/Influence'
import Quiz from './components/Quiz'
import PlayerBar from './components/PlayerBar'
import NowPlaying from './components/NowPlaying'
import PanelToggles from './components/PanelToggles'
import { PlayerProvider } from './player/PlayerContext'
import { CITIES, COUNTRIES, GENRES, getEra } from './data/cities'

const START_YEAR = 1994

export default function App() {
  const [view, setView] = useState('explore')
  const [year, setYear] = useState(START_YEAR)
  const [playing, setPlaying] = useState(false)
  const [cityId, setCityId] = useState(null)
  const [genre, setGenre] = useState('all')
  const [country, setCountry] = useState('all')
  const [intro, setIntro] = useState(true)
  const [welcome, setWelcome] = useState(false)
  const [panels, setPanels] = useState(() => {
    const def = { filters: true, timeline: true, nowplaying: true, drawer: true, player: true }
    try { return { ...def, ...JSON.parse(localStorage.getItem('rapmap-panels') || '{}') } } catch { return def }
  })
  const togglePanel = useCallback((id) => {
    setPanels((p) => {
      const next = id === 'all'
        ? Object.fromEntries(Object.keys(p).map((k) => [k, !Object.values(p).every(Boolean)]))
        : { ...p, [id]: !p[id] }
      try { localStorage.setItem('rapmap-panels', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const city = useMemo(() => CITIES.find((c) => c.id === cityId) || null, [cityId])
  const drawerOpen = view === 'explore' && !!city && panels.drawer

  const handleView = useCallback((v) => {
    setView(v)
    if (v !== 'explore') setPlaying(false)
    if (v === 'explore') setIntro(false)
  }, [])

  const handleSelect = useCallback((id) => {
    setCityId(id)
    if (id) setPlaying(false)
  }, [])

  const closeDrawer = useCallback(() => setCityId(null), [])

  const openFromChart = useCallback((id) => {
    setCityId(id)
    setIntro(false)
    setPlaying(false)
    setView('explore')
  }, [])

  const visible = CITIES.filter((c) => country === 'all' || c.country === country)
  const matching = visible.filter((c) => genre === 'all' || getEra(c, year).genres.includes(genre))
  const matchText = genre === 'all' ? `${visible.length} scenes` : `${matching.length} of ${visible.length} match in ${year}`

  const caption = city ? `${city.name} · ${getEra(city, year).title}` : 'Pick a city on the map'

  return (
    <PlayerProvider>
    <div className="app">
      <Header view={view} onView={handleView} />
      {welcome && <Welcome />}

      <main className={'stage' + (drawerOpen ? ' has-drawer' : '')}>
        <MapView
          cities={CITIES}
          year={year}
          genre={genre}
          country={country}
          selectedId={cityId}
          onSelect={handleSelect}
          active={view === 'explore'}
        />

        {view === 'explore' && (
          <>
            {panels.filters && <Filters
              genre={genre}
              onGenre={setGenre}
              country={country}
              onCountry={setCountry}
              countries={COUNTRIES}
              cities={CITIES}
              selectedId={cityId}
              onCity={handleSelect}
              matchText={matchText}
            />}
            {panels.timeline && <YearSlider year={year} onYear={setYear} playing={playing} onPlaying={setPlaying} caption={caption} />}
            {panels.nowplaying && <NowPlaying />}
            {panels.drawer && <CityDrawer city={city} cities={CITIES} year={year} onClose={closeDrawer} onYear={setYear} />}
            <PanelToggles panels={panels} onToggle={togglePanel} />
            {intro && (
              <Hero
                startYear={START_YEAR}
                scenes={CITIES.length}
                countries={COUNTRIES.length}
                genres={GENRES.length}
                onStart={() => { setIntro(false); setWelcome(true) }}
              />
            )}
          </>
        )}

        {view === 'influence' && (
          <div className="page">
            <Influence cities={CITIES} year={year} onYear={setYear} onOpenCity={openFromChart} />
            <YearSlider year={year} onYear={setYear} playing={playing} onPlaying={setPlaying} caption="Scrub through time" />
          </div>
        )}

        {view === 'quiz' && (
          <div className="page">
            <Quiz onExit={() => handleView('explore')} />
          </div>
        )}
      </main>

      {panels.player && <PlayerBar />}
    </div>
    </PlayerProvider>
  )
}
