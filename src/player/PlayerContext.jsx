import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { findPreview } from './itunes'

const PlayerContext = createContext(null)
export const usePlayer = () => useContext(PlayerContext)

// Set by the shared web preview, which blocks outside audio.
const AUDIO_OFF = typeof window !== 'undefined' && window.RAPMAP_NO_AUDIO === true

export function itemId(item) {
  return `${item.kind}|${item.title}|${item.artist}`
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const requestRef = useRef(0)
  const queueRef = useRef({ items: [], index: -1 })
  const [current, setCurrent] = useState(null) // { item, meta }
  const [status, setStatus] = useState('idle') // idle | loading | playing | paused | error
  const [error, setError] = useState('')
  const [time, setTime] = useState({ t: 0, d: 30 })
  const [hasQueue, setHasQueue] = useState({ prev: false, next: false })

  const syncQueueFlags = () => {
    const { items, index } = queueRef.current
    setHasQueue({ prev: index > 0, next: index >= 0 && index < items.length - 1 })
  }

  const load = useCallback(async (item, { auto = false } = {}) => {
    const req = ++requestRef.current
    const audio = audioRef.current
    audio.pause()
    setCurrent({ item, meta: null })
    setError('')
    setTime({ t: 0, d: 30 })

    if (AUDIO_OFF) {
      setStatus('error')
      setError('off')
      return
    }

    setStatus('loading')
    try {
      const meta = await findPreview(item)
      if (req !== requestRef.current) return
      setCurrent({ item, meta })
      audio.src = meta.url
      await audio.play()
    } catch (e) {
      if (req !== requestRef.current) return
      if (e && e.name === 'NotAllowedError') {
        setStatus('paused')
        return
      }
      // In a queue, skip a track that cannot be played and carry on.
      const { items, index } = queueRef.current
      if (auto && index >= 0 && index < items.length - 1) {
        queueRef.current.index = index + 1
        syncQueueFlags()
        load(items[index + 1], { auto: true })
        return
      }
      setStatus('error')
      setError(e && e.message === 'not-found' ? 'not-found' : 'network')
    }
  }, [])

  // One audio element for the whole site.
  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'auto'
    audioRef.current = audio
    const onTime = () => setTime({ t: audio.currentTime, d: audio.duration || 30 })
    const onPlaying = () => setStatus('playing')
    const onPause = () => {
      if (!audio.ended) setStatus((s) => (s === 'playing' ? 'paused' : s))
    }
    const onWaiting = () => setStatus((s) => (s === 'playing' ? 'loading' : s))
    const onEnded = () => {
      const { items, index } = queueRef.current
      if (index >= 0 && index < items.length - 1) {
        queueRef.current.index = index + 1
        syncQueueFlags()
        load(items[index + 1], { auto: true })
      } else {
        setStatus('paused')
        setTime((x) => ({ ...x, t: 0 }))
      }
    }
    const onError = () => {
      if (!audio.src) return
      setStatus('error')
      setError('network')
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onTime)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.pause()
      audio.removeAttribute('src')
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onTime)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [load])

  const play = useCallback(
    (item, queue) => {
      const audio = audioRef.current
      // Clicking the track that is already loaded toggles it.
      if (current && itemId(current.item) === itemId(item) && (status === 'playing' || status === 'paused' || status === 'loading')) {
        if (status === 'playing') audio.pause()
        else if (status === 'paused') audio.play().catch(() => {})
        return
      }
      const items = queue && queue.length ? queue : [item]
      queueRef.current = { items, index: Math.max(0, items.findIndex((x) => itemId(x) === itemId(item))) }
      syncQueueFlags()
      load(item)
    },
    [current, status, load],
  )

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !current) return
    if (status === 'playing') audio.pause()
    else if (status === 'paused') audio.play().catch(() => {})
    else if (status === 'error' && !AUDIO_OFF) load(current.item)
  }, [current, status, load])

  const step = useCallback(
    (dir) => {
      const { items, index } = queueRef.current
      const next = index + dir
      if (index < 0 || next < 0 || next >= items.length) return
      queueRef.current.index = next
      syncQueueFlags()
      load(items[next])
    },
    [load],
  )

  const seek = useCallback((t) => {
    const audio = audioRef.current
    if (audio && Number.isFinite(t)) audio.currentTime = t
  }, [])

  const close = useCallback(() => {
    requestRef.current++
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.removeAttribute('src')
    }
    queueRef.current = { items: [], index: -1 }
    syncQueueFlags()
    setCurrent(null)
    setStatus('idle')
    setError('')
  }, [])

  const value = useMemo(
    () => ({
      current,
      status,
      error,
      time,
      hasQueue,
      play,
      toggle,
      next: () => step(1),
      prev: () => step(-1),
      seek,
      close,
      audioOff: AUDIO_OFF,
    }),
    [current, status, error, time, hasQueue, play, toggle, step, seek, close],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
