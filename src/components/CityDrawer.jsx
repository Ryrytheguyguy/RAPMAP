import { useEffect, useRef } from 'react'
import { GENRE_LABEL, STOREFRONT, getEra, influenceAt } from '../data/cities'
import Cover, { Avatar } from './Cover'
import { CloseIcon, PlayIcon, Equalizer } from './Icons'
import { usePlayer, itemId } from '../player/PlayerContext'

function useRowState() {
  const p = usePlayer()
  const activeId = p && p.current ? itemId(p.current.item) : null
  return (item) => {
    const active = activeId === itemId(item)
    return {
      active,
      playing: active && p.status === 'playing',
      loading: active && p.status === 'loading',
      failed: active && p.status === 'error',
    }
  }
}

export default function CityDrawer({ city, cities, year, onClose, onYear }) {
  const player = usePlayer()
  const rowState = useRowState()
  const open = !!city
  const lastRef = useRef(city)
  if (city) lastRef.current = city
  const shown = city || lastRef.current
  const scrollRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0
    if (open && closeRef.current) closeRef.current.focus({ preventScroll: true })
  }, [open, shown && shown.id])

  const inertProps = open ? {} : { inert: '' }

  if (!shown) return <aside className="drawer" aria-hidden="true" />

  const era = getEra(shown, year)
  const influence = Math.round(influenceAt(shown, year))
  const ranked = [...cities].sort((a, b) => influenceAt(b, year) - influenceAt(a, year))
  const rank = ranked.findIndex((c) => c.id === shown.id) + 1

  const store = STOREFRONT[shown.country]
  const songItems = era.songs.map((s) => ({ kind: 'song', title: s.title, artist: s.artist, year: s.year, q: s.q, store }))

  return (
    <aside
      className={'drawer' + (open ? ' is-open' : '')}
      aria-label={`${shown.name} rap scene`}
      aria-hidden={!open}
      style={{ '--accent': shown.color }}
      {...inertProps}
    >
      <div className="drawer-scroll" ref={scrollRef}>
        <div className="drawer-head">
          <button className="icon-btn" ref={closeRef} onClick={onClose} aria-label="Close city panel">
            <CloseIcon />
          </button>
          <p className="kicker">
            {shown.country} · {shown.region}
          </p>
          <h2>{shown.name}</h2>
          <p className="tagline">{shown.tagline}</p>
        </div>

        {shown.note && <p className="city-note">{shown.note}</p>}

        <div className="era-nav" role="group" aria-label={`${shown.name} eras`}>
          {shown.eras.map((e) => {
            const on = year >= e.from && year <= e.to
            return (
              <button
                key={e.from}
                className={'era-chip' + (on ? ' is-on' : '')}
                aria-pressed={on}
                onClick={() => {
                  if (!on) onYear(e.from)
                }}
              >
                {e.from}–{String(e.to).slice(2)}
              </button>
            )
          })}
        </div>

        <div className="fade-in" key={shown.id + '-' + era.from}>
          <section className="era-card">
            <p className="era-years">
              {era.from}–{era.to}
            </p>
            <h3>{era.title}</h3>
            <p>{era.blurb}</p>
            <ul className="tags" aria-label="Subgenres">
              {era.genres.map((g) => (
                <li key={g}>{GENRE_LABEL[g]}</li>
              ))}
            </ul>
            <div className="meter" aria-label={`Influence in ${year}: ${influence} out of 100`}>
              <div className="meter-top">
                <span>Global influence in {year}</span>
                <strong>
                  #{rank} of {cities.length} · {influence}
                </strong>
              </div>
              <div className="meter-bar">
                <span style={{ width: influence + '%' }} />
              </div>
            </div>
          </section>

          <section>
            <h4>Key artists</h4>
            {era.artists.length ? (
              <ul className="artists">
                {era.artists.map((a) => {
                  const item = { kind: 'artist', title: a.name, artist: a.name, store }
                  const st = rowState(item)
                  return (
                    <li key={a.name}>
                      <button
                        className={'artist' + (st.active ? ' is-active' : '')}
                        onClick={() => player.play(item)}
                        aria-label={`Play a track by ${a.name}`}
                      >
                        <Avatar name={a.name} />
                        <span className="artist-text">
                          <strong>{a.name}</strong>
                          <span>{a.note}</span>
                        </span>
                        <span className="artist-go">
                          {st.playing ? <Equalizer width={16} height={16} /> : <PlayIcon width={14} height={14} />}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="empty">No confirmed artists for this period yet.</p>
            )}
          </section>

          <section>
            <div className="section-head">
              <h4>Songs to hear</h4>
              {songItems.length > 1 && (
                <button className="play-all" onClick={() => player.play(songItems[0], songItems)}>
                  <PlayIcon width={12} height={12} />
                  Play all
                </button>
              )}
            </div>
            {songItems.length ? (
              <ol className="songs">
                {songItems.map((s, i) => {
                  const st = rowState(s)
                  return (
                    <li key={s.title + s.artist}>
                      <button
                        className={'song' + (st.active ? ' is-active' : '') + (st.failed ? ' is-failed' : '')}
                        onClick={() => player.play(s, songItems)}
                        aria-label={`${st.playing ? 'Pause' : 'Play'} ${s.title} by ${s.artist}`}
                      >
                        <span className="song-n">
                          {st.playing ? <Equalizer width={16} height={16} /> : st.loading ? <span className="spin" aria-hidden="true" /> : i + 1}
                        </span>
                        <span className="song-text">
                          <strong>{s.title}</strong>
                          <span>
                            {s.artist}
                            {s.year ? ` · ${s.year}` : ''}
                          </span>
                        </span>
                        <span className="song-play">
                          <PlayIcon width={14} height={14} />
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            ) : (
              <p className="empty">Song picks for this era are still being added. Tap an artist above to hear a track.</p>
            )}
          </section>

          <section>
            <h4>Essential albums</h4>
            {era.albums.length ? (
              <ul className="albums">
                {era.albums.map((a) => {
                  const item = { kind: 'album', title: a.title, artist: a.artist, year: a.year, q: a.q, store }
                  const st = rowState(item)
                  return (
                    <li key={a.title + a.artist}>
                      <button
                        className={'album-btn' + (st.active ? ' is-active' : '')}
                        onClick={() => player.play(item)}
                        aria-label={`Play a track from ${a.title} by ${a.artist}`}
                      >
                        <Cover title={a.title} sub={a.artist} year={a.year} />
                        <span className="album-play">
                          {st.playing ? <Equalizer width={18} height={18} /> : <PlayIcon width={16} height={16} />}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="empty">Album picks for this era are still being added.</p>
            )}
          </section>

          <p className="fineprint">
            Cover art in the lists is generated. Tap any artist, song or album to hear a 30-second preview, courtesy of Apple.
          </p>
        </div>
      </div>
    </aside>
  )
}
