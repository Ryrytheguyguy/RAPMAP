import { usePlayer } from '../player/PlayerContext'
import { Avatar } from './Cover'
import { Equalizer } from './Icons'

// Big artwork for whatever is playing, so there is something to look at.
// Apple's preview API supplies the cover of the track, not a photo of the artist.
export default function NowPlaying() {
  const p = usePlayer()
  if (!p || !p.current || p.status === 'error' || p.status === 'idle') return null
  const { item, meta } = p.current
  const playing = p.status === 'playing'
  return (
    <aside className={'nowcard' + (playing ? ' is-playing' : '')} aria-label="Now playing artwork" key={meta ? meta.url : item.title}>
      <div className="nowcard-art">
        {meta && meta.artworkLarge ? <img src={meta.artworkLarge} alt={`Cover for ${meta.trackName} by ${meta.artistName}`} /> : <Avatar name={item.artist} />}
        {playing && (
          <span className="nowcard-eq">
            <Equalizer width={18} height={18} />
          </span>
        )}
      </div>
      <div className="nowcard-meta">
        <small>{playing ? 'Now playing' : p.status === 'loading' ? 'Loading' : 'Paused'}</small>
        <strong>{meta ? meta.artistName : item.artist}</strong>
        <span>{meta ? meta.trackName : item.title}</span>
      </div>
    </aside>
  )
}
