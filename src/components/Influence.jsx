import { useMemo, useRef, useState } from 'react'
import { getEra, influenceAt } from '../data/cities'

const W = 900
const H = 400
const M = { l: 44, r: 20, t: 24, b: 34 }
const X0 = 1990
const X1 = 2026
const x = (y) => M.l + ((y - X0) / (X1 - X0)) * (W - M.l - M.r)
const yv = (v) => M.t + (1 - v / 100) * (H - M.t - M.b)
const YEARS = Array.from({ length: X1 - X0 + 1 }, (_, i) => X0 + i)
const XTICKS = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025]
const BANDS = [
  { from: 1990, to: 2000, label: '90s' },
  { from: 2000, to: 2010, label: '00s' },
  { from: 2010, to: 2020, label: '10s' },
  { from: 2020, to: 2026, label: '20s' },
]
const DEFAULT_ON = ['nyc', 'atl', 'london', 'toronto', 'seoul', 'paris']

export default function Influence({ cities, year, onYear, onOpenCity }) {
  const [on, setOn] = useState(() => new Set(DEFAULT_ON))
  const [showAll, setShowAll] = useState(false)
  const svgRef = useRef(null)
  const dragging = useRef(false)

  const toggle = (id) =>
    setOn((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const scrub = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    const yr = Math.round(X0 + ((px - M.l) / (W - M.l - M.r)) * (X1 - X0))
    onYear(Math.max(X0, Math.min(X1, yr)))
  }

  const ranked = useMemo(() => [...cities].sort((a, b) => influenceAt(b, year) - influenceAt(a, year)), [cities, year])
  const alphabetical = useMemo(() => [...cities].sort((a, b) => a.name.localeCompare(b.name)), [cities])
  const top = ranked[0]
  const topEra = getEra(top, year)
  const shownRank = showAll ? ranked : ranked.slice(0, 10)
  const lines = cities.filter((c) => on.has(c.id))

  return (
    <section className="influence" aria-labelledby="inf-title">
      <div className="influence-head">
        <p className="kicker">Compare scenes over time</p>
        <h2 id="inf-title">Who shaped rap in {year}?</h2>
        <p className="lede">
          <strong style={{ color: top.color }}>{top.name}</strong> leads in {year}: {topEra.title}. Drag across the chart or use the
          year slider to travel through time.
        </p>
      </div>

      <div className="influence-grid">
        <div className="chart glass">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`Line chart comparing the influence of ${lines.length} rap scenes from 1990 to 2026`}
            onPointerDown={(e) => {
              dragging.current = true
              e.currentTarget.setPointerCapture(e.pointerId)
              scrub(e)
            }}
            onPointerMove={(e) => dragging.current && scrub(e)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            {BANDS.map((b, i) => (
              <g key={b.label}>
                {i % 2 === 0 && <rect x={x(b.from)} y={M.t} width={x(b.to) - x(b.from)} height={H - M.t - M.b} className="band" />}
                <text x={(x(b.from) + x(b.to)) / 2} y={M.t - 8} className="band-label" textAnchor="middle">
                  {b.label}
                </text>
              </g>
            ))}

            {[0, 25, 50, 75, 100].map((v) => (
              <g key={v}>
                <line x1={M.l} x2={W - M.r} y1={yv(v)} y2={yv(v)} className="grid" />
                <text x={M.l - 10} y={yv(v) + 4} textAnchor="end" className="axis">
                  {v}
                </text>
              </g>
            ))}
            {XTICKS.map((t) => (
              <text key={t} x={x(t)} y={H - 10} textAnchor="middle" className="axis">
                {t}
              </text>
            ))}

            {lines.map((c, li) => {
              const d = YEARS.map((yr, i) => `${i ? 'L' : 'M'}${x(yr).toFixed(1)},${yv(influenceAt(c, yr)).toFixed(1)}`).join(' ')
              return <path key={c.id} d={d} fill="none" stroke={c.color} strokeWidth="2.6" strokeDasharray={['', '9 5', '2 5', '12 4 2 4'][li % 4] || undefined} strokeLinecap="round" strokeLinejoin="round" />
            })}

            <line x1={x(year)} x2={x(year)} y1={M.t} y2={H - M.b} className="cursor" />
            {lines.map((c) => (
              <circle key={c.id} cx={x(year)} cy={yv(influenceAt(c, year))} r="5.5" fill={c.color} stroke="#0a0a0a" strokeWidth="2" />
            ))}
            <text
              x={Math.min(Math.max(x(year), M.l + 20), W - M.r - 20)}
              y={H - M.b + 22}
              textAnchor="middle"
              className="cursor-label"
            >
              {year}
            </text>
          </svg>

          <div className="picker-head">
            <span>
              Showing {lines.length} of {cities.length} scenes
            </span>
            <span className="picker-actions">
              <button onClick={() => setOn(new Set(ranked.slice(0, 6).map((c) => c.id)))}>Top 6 in {year}</button>
              <button onClick={() => setOn(new Set(DEFAULT_ON))}>Reset</button>
              <button onClick={() => setOn(new Set())}>Clear</button>
            </span>
          </div>
          <div className="legend" role="group" aria-label="Choose which cities to compare">
            {alphabetical.map((c) => (
              <button key={c.id} className={'legend-item' + (on.has(c.id) ? '' : ' is-off')} onClick={() => toggle(c.id)} aria-pressed={on.has(c.id)}>
                <i style={{ background: c.color }} />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <aside className="rank glass" aria-label={`Scenes ranked by influence in ${year}`}>
          <h3>Ranking in {year}</h3>
          <ol>
            {shownRank.map((c, i) => {
              const v = Math.round(influenceAt(c, year))
              return (
                <li key={c.id}>
                  <button onClick={() => onOpenCity(c.id)} aria-label={`Open ${c.name} on the map`}>
                    <span className="rank-n">{i + 1}</span>
                    <span className="rank-body">
                      <span className="rank-top">
                        <strong>{c.name}</strong>
                        <span>{v}</span>
                      </span>
                      <span className="rank-bar">
                        <span style={{ width: v + '%', background: c.color }} />
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
          <button className="rank-more" onClick={() => setShowAll((s) => !s)}>
            {showAll ? 'Show top 10' : `Show all ${cities.length}`}
          </button>
          <p className="fineprint">
            Scores are editorial estimates of cultural impact (artists, new sounds, global reach), not hard data. You can adjust them in
            src/data/cities.js and src/data/world.js.
          </p>
        </aside>
      </div>
    </section>
  )
}
