import { useEffect, useState } from 'react'

const SECONDS = 7

// A short welcome banner under the header that points at the three sections.
export default function Welcome() {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setOpen(false), SECONDS * 1000)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // The tabs pulse while the banner is open.
  useEffect(() => {
    document.documentElement.classList.toggle('welcome-on', open)
    return () => document.documentElement.classList.remove('welcome-on')
  }, [open])

  if (!open) return null
  return (
    <aside className="welcome" role="status" aria-live="polite">
      <span className="welcome-caret" aria-hidden="true" />
      <button className="welcome-x" onClick={() => setOpen(false)} aria-label="Close welcome message">
        ×
      </button>
      <h2 className="welcome-title">Welcome to RapMap</h2>
      <ul>
        <li><strong>Explore</strong> the world map and hear each scene</li>
        <li><strong>Influence</strong> shows who shaped rap, year by year</li>
        <li><strong>Quiz</strong> tests your ear with 10-second clips</li>
      </ul>
      <span className="welcome-bar" style={{ animationDuration: SECONDS + 's' }} aria-hidden="true" />
    </aside>
  )
}
