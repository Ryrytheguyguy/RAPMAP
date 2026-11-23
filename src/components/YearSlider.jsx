import { useEffect } from 'react'
import { PlayIcon, PauseIcon } from './Icons'

export const MIN_YEAR = 1990
export const MAX_YEAR = 2026
const DECADES = [
  { label: '90s', y: 1990 },
  { label: '00s', y: 2000 },
  { label: '10s', y: 2010 },
  { label: '20s', y: 2020 },
]
const TICKS = [1990, 2000, 2010, 2020, 2026]

export default function YearSlider({ year, onYear, playing, onPlaying, caption }) {
  useEffect(() => {
    if (!playing) return undefined
    const id = setInterval(() => onYear((y) => Math.min(MAX_YEAR, y + 1)), 1000)
    return () => clearInterval(id)
  }, [playing, onYear])

  useEffect(() => {
    if (playing && year >= MAX_YEAR) onPlaying(false)
  }, [playing, year, onPlaying])

  const toggle = () => {
    if (!playing && year >= MAX_YEAR) onYear(MIN_YEAR)
    onPlaying(!playing)
  }

  const pct = ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100
  const decade = Math.floor(year / 10) * 10

  return (
    <div className="slider glass">
      <button className="play" onClick={toggle} aria-label={playing ? 'Pause timeline' : 'Play timeline'}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="slider-main">
        <div className="slider-top">
          <span className="year" aria-live="polite">
            {year}
          </span>
          <span className="caption">{caption}</span>
        </div>
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={1}
          value={year}
          style={{ '--pct': pct + '%' }}
          aria-label="Year"
          onChange={(e) => {
            onPlaying(false)
            onYear(Number(e.target.value))
          }}
        />
        <div className="ticks" aria-hidden="true">
          {TICKS.map((t, i) => (
            <span
              key={t}
              style={{
                left: ((t - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100 + '%',
                transform: i === 0 ? 'none' : i === TICKS.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="decades" role="group" aria-label="Jump to a decade">
        {DECADES.map((d) => (
          <button
            key={d.y}
            className={'decade' + (decade === d.y ? ' is-on' : '')}
            onClick={() => {
              onPlaying(false)
              onYear(d.y)
            }}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  )
}
