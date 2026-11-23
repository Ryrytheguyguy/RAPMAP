import { useState } from 'react'

const ITEMS = [
  { id: 'filters', label: 'Filters', d: 'M3 5h18l-7 8v6l-4-2v-4z' },
  { id: 'timeline', label: 'Timeline', d: 'M3 12h18M7 8v8M12 6v12M17 9v6' },
  { id: 'nowplaying', label: 'Now playing', d: 'M9 18V6l10-2v12M9 18a3 3 0 11-6 0 3 3 0 016 0zm10-2a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'drawer', label: 'City details', d: 'M4 4h16v16H4zM14 4v16' },
  { id: 'player', label: 'Player bar', d: 'M3 17h18M3 7h18M7 12h10' },
]

export default function PanelToggles({ panels, onToggle }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={'ptoggles' + (open ? ' is-open' : '')}>
      <button className="ptoggle-main" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Show or hide panels" title="Show or hide panels">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>
        <span>Panels</span>
      </button>
      {open && (
        <div className="ptoggle-list" role="group" aria-label="Panels">
          {ITEMS.map((it) => (
            <label key={it.id} className="ptoggle">
              <input type="checkbox" checked={panels[it.id]} onChange={() => onToggle(it.id)} />
              <span className="ptoggle-box" aria-hidden="true" />
              <span>{it.label}</span>
            </label>
          ))}
          <button className="ptoggle-all" onClick={() => onToggle('all')}>
            {Object.values(panels).every(Boolean) ? 'Hide all' : 'Show all'}
          </button>
        </div>
      )}
    </div>
  )
}
