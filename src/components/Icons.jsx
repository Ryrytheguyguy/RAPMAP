const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const PlayIcon = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
  </svg>
)

export const PauseIcon = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
)

export const NextIcon = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M6 5.6v12.8a1 1 0 0 0 1.55.83l8.2-5.4a1 1 0 0 0 0-1.66l-8.2-5.4A1 1 0 0 0 6 5.6z" />
    <rect x="17" y="5" width="2.6" height="14" rx="1.1" />
  </svg>
)

export const PrevIcon = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M18 5.6v12.8a1 1 0 0 1-1.55.83l-8.2-5.4a1 1 0 0 1 0-1.66l8.2-5.4A1 1 0 0 1 18 5.6z" />
    <rect x="4.4" y="5" width="2.6" height="14" rx="1.1" />
  </svg>
)

export const Equalizer = (p) => (
  <svg {...base} fill="currentColor" stroke="none" className="eq" {...p}>
    <rect className="eq-1" x="4" y="6" width="3.6" height="14" rx="1" />
    <rect className="eq-2" x="10.2" y="6" width="3.6" height="14" rx="1" />
    <rect className="eq-3" x="16.4" y="6" width="3.6" height="14" rx="1" />
  </svg>
)

export const CloseIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
)

export const HeadphonesIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="14" width="5" height="7" rx="2" />
    <rect x="16" y="14" width="5" height="7" rx="2" />
  </svg>
)
