import { usePlayer } from '../player/PlayerContext'
import { spotifySearch } from '../data/cities'
import { PlayIcon, PauseIcon, NextIcon, PrevIcon, CloseIcon } from './Icons'
import { Avatar } from './Cover'

const fmt = (s) => {
  const t = Math.max(0, Math.floor(s || 0))
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`
}

function message(error, item, audioOff) {
  if (audioOff) return 'Playback is switched off in this shared preview. Open the standalone RapMap file or the deployed site to hear songs.'
  if (error === 'not-found') return `No preview found for "${item.title}". Not every track is in the preview catalogue.`
  return "Couldn't load the preview. Check your connection and try again."
}

export default function PlayerBar() {
  const p = usePlayer()
  if (!p || !p.current) return null

  const { item, meta } = p.current
  const loading = p.status === 'loading'
  const playing = p.status === 'playing'
  const failed = p.status === 'error'
  const dur = p.time.d || 30
  const pct = Math.min(100, (p.time.t / dur) * 100)

  return (
    <section className={'player' + (failed ? ' is-error' : '')} aria-label="Now playing">
      <div className="player-art" aria-hidden="true">
        {meta && meta.artwork ? <img src={meta.artwork} alt="" /> : <Avatar name={item.artist} />}
      </div>

      <div className="player-info">
        <strong title={item.title}>{meta ? meta.trackName : item.title}</strong>
        <span title={item.artist}>{meta ? meta.artistName : item.artist}</span>
      </div>

      <div className="player-controls">
        <button className="pbtn" onClick={p.prev} disabled={!p.hasQueue.prev} aria-label="Previous track">
          <PrevIcon />
        </button>
        <button
          className="pbtn pbtn-main"
          onClick={p.toggle}
          disabled={loading || p.audioOff}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {loading ? <span className="spin" aria-hidden="true" /> : playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="pbtn" onClick={p.next} disabled={!p.hasQueue.next} aria-label="Next track">
          <NextIcon />
        </button>
      </div>

      {failed ? (
        <div className="player-msg" role="status">
          <span>{message(p.error, item, p.audioOff)}</span>
          {!p.audioOff && (
            <a href={spotifySearch(`${item.title} ${item.artist}`)} target="_blank" rel="noopener noreferrer">
              Search on Spotify
            </a>
          )}
        </div>
      ) : (
        <div className="player-seek">
          <span className="player-time">{fmt(p.time.t)}</span>
          <input
            type="range"
            min={0}
            max={dur}
            step={0.1}
            value={Math.min(p.time.t, dur)}
            style={{ '--pct': pct + '%' }}
            onChange={(e) => p.seek(Number(e.target.value))}
            aria-label="Seek within the preview"
            disabled={loading}
          />
          <span className="player-time">{fmt(dur)}</span>
          <span className="player-tag">30s preview</span>
        </div>
      )}

      <button className="icon-btn player-close" onClick={p.close} aria-label="Close player">
        <CloseIcon />
      </button>
    </section>
  )
}
