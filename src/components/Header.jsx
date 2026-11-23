const TABS = [
  { id: 'explore', label: 'Explore' },
  { id: 'influence', label: 'Influence' },
  { id: 'quiz', label: 'Quiz' },
]

export default function Header({ view, onView }) {
  return (
    <header className="header">
      <button className="logo" onClick={() => onView('explore')} aria-label="RapMap, go to the map">
        <span className="logo-dot" aria-hidden="true" />
        RAP<span>MAP</span>
      </button>
      <nav className="tabs" aria-label="Sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={'tab' + (view === t.id ? ' is-active' : '')}
            aria-current={view === t.id ? 'page' : undefined}
            onClick={() => onView(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
