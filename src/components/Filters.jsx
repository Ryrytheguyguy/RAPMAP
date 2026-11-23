import { GENRES } from '../data/cities'

export default function Filters({ genre, onGenre, country, onCountry, countries, cities, selectedId, onCity, matchText }) {
  const sorted = [...cities].sort((a, b) => a.name.localeCompare(b.name))
  return (
    <div className="filters glass">
      <div className="chips" role="group" aria-label="Filter by subgenre">
        <button className={'chip' + (genre === 'all' ? ' is-on' : '')} onClick={() => onGenre('all')} aria-pressed={genre === 'all'}>
          All styles
        </button>
        {GENRES.map((g) => (
          <button
            key={g.id}
            className={'chip' + (genre === g.id ? ' is-on' : '')}
            onClick={() => onGenre(genre === g.id ? 'all' : g.id)}
            aria-pressed={genre === g.id}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="filters-side">
        <label className="select">
          <span>City</span>
          <select value={selectedId || ''} onChange={(e) => onCity(e.target.value || null)}>
            <option value="">Jump to…</option>
            {sorted.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="select">
          <span>Country</span>
          <select value={country} onChange={(e) => onCountry(e.target.value)}>
            <option value="all">All</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <span className="match" aria-live="polite">
          {matchText}
        </span>
      </div>
    </div>
  )
}
