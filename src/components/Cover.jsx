// Generated "album covers" and artist avatars.
// Real album art and artist photos are copyrighted, so RapMap draws
// stylised placeholders from the title. Swap in real images if you
// have permission to use them.

const PALETTES = [
  ['#1d6fb8', '#06182e'],
  ['#3f9e6a', '#0b2a22'],
  ['#d9b373', '#4a3414'],
  ['#e07a5f', '#3a1410'],
  ['#4cc9c0', '#06284a'],
  ['#f0c978', '#2c5a3a'],
  ['#5aa6e0', '#0a1e34'],
  ['#8fd18a', '#12304f'],
]

function hash(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

export function initials(name) {
  return name
    .replace(/^The\s+/i, '')
    .replace(/[^A-Za-z0-9$ ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ name }) {
  const h = hash(name)
  const [a, b] = PALETTES[h % PALETTES.length]
  return (
    <span className="avatar" style={{ background: `linear-gradient(${(h % 6) * 30 + 20}deg, ${a}, ${b})` }} aria-hidden="true">
      {initials(name)}
    </span>
  )
}

export default function Cover({ title, sub, year }) {
  const h = hash(title + sub)
  const [a, b] = PALETTES[h % PALETTES.length]
  return (
    <div
      className="cover"
      style={{ background: `linear-gradient(${(h % 6) * 30 + 20}deg, ${a}, ${b})` }}
      role="img"
      aria-label={`${title} by ${sub}, ${year}`}
    >
      <span className="cover-disc" aria-hidden="true" />
      <strong>{title}</strong>
      <em>
        {sub} · {year}
      </em>
    </div>
  )
}
