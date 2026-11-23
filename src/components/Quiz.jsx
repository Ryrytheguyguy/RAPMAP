import { useCallback, useEffect, useRef, useState } from 'react'
import { CITIES, STOREFRONT } from '../data/cities'
import { findPreview } from '../player/itunes'
import { usePlayer } from '../player/PlayerContext'
import QuizMap from './QuizMap'

const ROUND = 10
const CLIP = 10 // seconds
const BEST_KEY = 'rapmap-best-score-v2'
const DECADES = [1990, 2000, 2010, 2020]

const decadeOf = (y) => Math.min(2020, Math.floor(y / 10) * 10)
const decadeLabel = (d) => `${d}s`

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Every song and album with a known year, across every scene.
const POOL = CITIES.flatMap((city) =>
  city.eras.flatMap((era) => [
    ...era.songs.filter((s) => s.year).map((s) => ({ city, era, kind: 'song', ...s })),
    ...era.albums.filter((a) => a.year).map((a) => ({ city, era, kind: 'album', ...a })),
  ]),
)

function makeQuestion(entry) {
  const others = shuffle(CITIES.filter((c) => c.id !== entry.city.id && c.country !== entry.city.country)).slice(0, 3)
  return {
    entry,
    item: { kind: entry.kind, title: entry.title, artist: entry.artist, year: entry.year, q: entry.q, store: STOREFRONT[entry.city.country] },
    city: entry.city,
    decade: decadeOf(entry.year),
    options: shuffle([entry.city, ...others]),
  }
}

function buildRound() {
  // At most 2 clips from the same city, so rounds stay varied.
  const used = {}
  const picks = []
  for (const e of shuffle(POOL)) {
    if ((used[e.city.id] || 0) >= 2) continue
    used[e.city.id] = (used[e.city.id] || 0) + 1
    picks.push(e)
    if (picks.length >= ROUND + 6) break // spares, in case a clip cannot be found
  }
  return picks
}

function rankFor(correct, total) {
  const r = correct / total
  if (r >= 0.9) return { title: 'Hall of Fame', line: 'Your ears are a map. Time to teach someone else.' }
  if (r >= 0.7) return { title: 'Platinum Plaque', line: 'Serious ears. A few more listens and you are there.' }
  if (r >= 0.4) return { title: 'Underground MC', line: 'Solid foundation. Explore the map to level up.' }
  return { title: 'Open-Mic Rookie', line: 'Everyone starts somewhere. Hit the map and try again.' }
}

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}
const saveBest = (v) => {
  try {
    localStorage.setItem(BEST_KEY, String(v))
  } catch {
    /* storage can be unavailable; the quiz still works */
  }
}

export default function Quiz({ onExit }) {
  const player = usePlayer()
  const [phase, setPhase] = useState('intro')
  const [spares, setSpares] = useState([])
  const [q, setQ] = useState(null)
  const [num, setNum] = useState(0)
  const [place, setPlace] = useState(null)
  const [dec, setDec] = useState(null)
  const [locked, setLocked] = useState(false)
  const [clip, setClip] = useState('loading') // loading | playing | paused | ended | error
  const [meta, setMeta] = useState(null)
  const [t, setT] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [placesRight, setPlacesRight] = useState(0)
  const [decadesRight, setDecadesRight] = useState(0)
  const [gain, setGain] = useState(0)
  const [best, setBest] = useState(readBest)
  const audioRef = useRef(null)
  const reqRef = useRef(0)
  const nextRef = useRef(null)
  const sparesRef = useRef([])
  sparesRef.current = spares

  // One audio element for the quiz.
  useEffect(() => {
    const a = new Audio()
    a.preload = 'auto'
    audioRef.current = a
    const onTime = () => {
      setT(Math.min(a.currentTime, CLIP))
      if (a.currentTime >= CLIP) {
        a.pause()
        setClip('ended')
      }
    }
    const onPlaying = () => setClip('playing')
    const onPause = () => setClip((s) => (s === 'playing' ? 'paused' : s))
    const onEnded = () => setClip('ended')
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('playing', onPlaying)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onEnded)
    return () => {
      reqRef.current++
      a.pause()
      a.removeAttribute('src')
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('playing', onPlaying)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onEnded)
    }
  }, [])

  // Load and play the clip for a question. If a track cannot be found, swap in a spare.
  const loadClip = useCallback(async (question) => {
    const req = ++reqRef.current
    const a = audioRef.current
    a.pause()
    setClip('loading')
    setMeta(null)
    setT(0)
    try {
      const m = await findPreview(question.item)
      if (req !== reqRef.current) return
      setMeta(m)
      a.src = m.url
      a.currentTime = 0
      await a.play()
    } catch (e) {
      if (req !== reqRef.current) return
      if (e && e.name === 'NotAllowedError') {
        setClip('paused') // the browser wants a click first
        return
      }
      const [nextEntry, ...rest] = sparesRef.current
      if (nextEntry) {
        setSpares(rest)
        const nq = makeQuestion(nextEntry)
        setQ(nq)
        loadClip(nq)
      } else {
        setClip('error')
      }
    }
  }, [])

  const start = () => {
    if (player) player.close() // stop the site player
    const picks = buildRound()
    const first = makeQuestion(picks[0])
    setSpares(picks.slice(1))
    setNum(1)
    setQ(first)
    setPlace(null)
    setDec(null)
    setLocked(false)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setPlacesRight(0)
    setDecadesRight(0)
    setGain(0)
    setPhase('playing')
    loadClip(first)
  }

  const toggleClip = () => {
    const a = audioRef.current
    if (clip === 'playing') a.pause()
    else if (clip === 'paused' || clip === 'ended') {
      if (clip === 'ended' || a.currentTime >= CLIP) a.currentTime = 0
      a.play().catch(() => {})
    } else if (clip === 'error' && q) loadClip(q)
  }

  const lockIn = () => {
    if (locked || !q || place === null || dec === null) return
    const placeOk = place === q.city.id
    const decOk = dec === q.decade
    let pts = 0
    if (placeOk) {
      const s = streak + 1
      pts += 100 + Math.min(s - 1, 4) * 25
      setStreak(s)
      setBestStreak((b) => Math.max(b, s))
      setPlacesRight((c) => c + 1)
    } else setStreak(0)
    if (decOk) {
      pts += 50
      setDecadesRight((c) => c + 1)
    }
    setScore((s) => s + pts)
    setGain(pts)
    setLocked(true)
  }

  const next = () => {
    if (num >= ROUND) {
      audioRef.current.pause()
      if (score > best) {
        setBest(score)
        saveBest(score)
      }
      setPhase('done')
      return
    }
    const [nextEntry, ...rest] = spares
    const nq = makeQuestion(nextEntry)
    setSpares(rest)
    setQ(nq)
    setNum(num + 1)
    setPlace(null)
    setDec(null)
    setLocked(false)
    setGain(0)
    loadClip(nq)
  }

  useEffect(() => {
    if (locked && nextRef.current) nextRef.current.focus({ preventScroll: true })
  }, [locked])

  useEffect(() => {
    if (phase !== 'playing' || locked || !q) return undefined
    const onKey = (e) => {
      const n = Number(e.key)
      if (n >= 1 && n <= 4 && q.options[n - 1]) setPlace(q.options[n - 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, locked, q])

  if (phase === 'intro') {
    const off = !!(player && player.audioOff)
    return (
      <section className="quiz quiz-intro" aria-labelledby="quiz-title">
        <div className="intro-stack fade-in">
          <h2 id="quiz-title" className="pump">
            Guess the Sound
          </h2>
          {off && <p className="quiz-warn">Audio is switched off in this preview, so clips cannot play here.</p>}
          <div className="quiz-actions">
            <button className="btn btn-primary" onClick={start} disabled={off}>
              Start quiz
            </button>
            <button className="btn btn-ghost" onClick={() => onExit()}>
              Back to the map
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (phase === 'done') {
    const r = rankFor(placesRight, ROUND)
    return (
      <section className="quiz" aria-labelledby="quiz-title">
        <div className="quiz-card fade-in">
          <p className="kicker">Round complete</p>
          <h2 id="quiz-title">{r.title}</h2>
          <p className="lede">{r.line}</p>
          <dl className="results">
            <div>
              <dt>Score</dt>
              <dd>{score}</dd>
            </div>
            <div>
              <dt>Cities</dt>
              <dd>
                {placesRight}/{ROUND}
              </dd>
            </div>
            <div>
              <dt>Decades</dt>
              <dd>
                {decadesRight}/{ROUND}
              </dd>
            </div>
            <div>
              <dt>Best streak</dt>
              <dd>{bestStreak}</dd>
            </div>
            <div>
              <dt>Personal best</dt>
              <dd>{Math.max(best, score)}</dd>
            </div>
          </dl>
          <div className="quiz-actions">
            <button className="btn btn-primary" onClick={start}>
              Play again
            </button>
            <button className="btn btn-ghost" onClick={() => onExit()}>
              Back to the map
            </button>
          </div>
        </div>
      </section>
    )
  }

  const placeOk = locked && place === q.city.id
  const decOk = locked && dec === q.decade
  const art = meta && (meta.artwork || null)

  return (
    <section className="quiz" aria-labelledby="q-text">
      <div className="quiz-card quiz-card-wide">
        <div className="quiz-top">
          <span>
            Clip {num} / {ROUND}
          </span>
          <span className="quiz-score">
            {streak > 1 && <em>x{streak}</em>}
            {score} pts
          </span>
        </div>
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={ROUND} aria-valuenow={num - 1 + (locked ? 1 : 0)}>
          <span style={{ width: ((num - 1 + (locked ? 1 : 0)) / ROUND) * 100 + '%' }} />
        </div>

        <div className="fade-in" key={num}>
          <h2 id="q-text" className="q-text">
            Where is this from, and when?
          </h2>

          <div className="clip">
            <button className="clip-btn" onClick={toggleClip} aria-label={clip === 'playing' ? 'Pause clip' : 'Play clip'} disabled={clip === 'loading'}>
              {clip === 'playing' ? (
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : clip === 'ended' ? (
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8" /><path d="M3 3v5h5" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <div className="clip-body">
              <div className={'clip-bars' + (clip === 'playing' ? ' is-playing' : '')} aria-hidden="true">
                {Array.from({ length: 24 }).map((_, i) => (
                  <i key={i} style={{ animationDelay: (i % 7) * 0.09 + 's' }} />
                ))}
              </div>
              <div className="clip-line" role="progressbar" aria-label="Clip progress" aria-valuemin={0} aria-valuemax={CLIP} aria-valuenow={Math.round(t)}>
                <span style={{ width: (t / CLIP) * 100 + '%' }} />
              </div>
              <div className="clip-meta">
                <span>
                  {clip === 'loading' && 'Finding a clip…'}
                  {clip === 'playing' && 'Listening…'}
                  {clip === 'paused' && 'Press play'}
                  {clip === 'ended' && 'Press to replay'}
                  {clip === 'error' && 'Could not load a clip. Press to retry.'}
                </span>
                <span>
                  0:{String(Math.floor(t)).padStart(2, '0')} / 0:{CLIP}
                </span>
              </div>
            </div>
          </div>

          <p className="quiz-label">Which city?</p>
          <ul className="options">
            {q.options.map((c, i) => {
              let state = ''
              if (locked) {
                if (c.id === q.city.id) state = ' is-right'
                else if (c.id === place) state = ' is-wrong'
                else state = ' is-faded'
              } else if (c.id === place) state = ' is-picked'
              return (
                <li key={c.id}>
                  <button className={'option' + state} onClick={() => setPlace(c.id)} disabled={locked} aria-pressed={c.id === place}>
                    <span className="option-key">{i + 1}</span>
                    <span>
                      {c.name}
                      <small className="option-sub">{c.country}</small>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <p className="quiz-label">Which decade?</p>
          <div className="decade-row" role="group" aria-label="Decade">
            {DECADES.map((d) => {
              let state = ''
              if (locked) {
                if (d === q.decade) state = ' is-right'
                else if (d === dec) state = ' is-wrong'
                else state = ' is-faded'
              } else if (d === dec) state = ' is-picked'
              return (
                <button key={d} className={'option decade' + state} onClick={() => setDec(d)} disabled={locked} aria-pressed={d === dec}>
                  {decadeLabel(d)}
                </button>
              )
            })}
          </div>

          {!locked && (
            <div className="quiz-actions">
              <button className="btn btn-primary" onClick={lockIn} disabled={place === null || dec === null}>
                Lock in answer
              </button>
              {(place === null || dec === null) && <span className="quiz-hint">Pick a city and a decade.</span>}
            </div>
          )}

          {locked && (
            <div className="reveal" role="status">
              <div className="reveal-head">
                {art ? <img className="reveal-art" src={art} alt="" /> : <div className="reveal-art" />}
                <div>
                  <strong className="reveal-result">
                    {placeOk ? 'Right city!' : `It's ${q.city.name}.`} {decOk ? 'Right decade!' : `Released in ${q.entry.year} (${decadeLabel(q.decade)}).`}
                    {gain > 0 && <span className="reveal-gain"> +{gain}</span>}
                  </strong>
                  <p className="reveal-song">
                    {q.entry.title} · {q.entry.artist}
                    {q.entry.kind === 'album' && ' (album)'} · {q.entry.year}
                  </p>
                  <p className="reveal-where">
                    {q.city.name}, {q.city.country} · {q.entry.era.title}
                  </p>
                </div>
              </div>
              <QuizMap city={q.city} />
              <p className="reveal-note">{q.city.tagline}</p>
              <div className="quiz-actions">
                <button className="btn btn-primary" ref={nextRef} onClick={next}>
                  {num >= ROUND ? 'See results' : 'Next clip'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
