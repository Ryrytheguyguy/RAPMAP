// Finds a 30-second preview for a song, album or artist using Apple's
// public iTunes Search API (no account or key needed). Results are cached,
// so playing the same track twice does not search again.

const cache = new Map()

const norm = (s = '') =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\(.*?\)|\[.*?\]/g, ' ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()

const BAD = /karaoke|tribute|instrumental|made famous|originally performed|lullaby|8-bit|piano version|orchestra|string quartet|vitamin string|rockabye|cover/i

// Whole-word artist match: "Epik High" must not match "Epikase Orchestra",
// but "Snoop Doggy Dogg" may match "Snoop Dogg".
function sameArtist(want, got) {
  const a = norm(want).split(' ').filter(Boolean)
  const b = norm(got).split(' ').filter(Boolean)
  if (!a.length || !b.length) return false
  const [short, long] = a.length <= b.length ? [a, b] : [b, a]
  return short.every((t) => long.includes(t))
}

// Browsers can call the API directly. If a network or privacy setting
// blocks that, fall back to JSONP, which the API also supports.
function jsonp(url, timeout = 9000) {
  return new Promise((resolve, reject) => {
    const cb = '__rapmap_' + Math.random().toString(36).slice(2)
    const script = document.createElement('script')
    const done = () => {
      delete window[cb]
      script.remove()
      clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      done()
      reject(new Error('timeout'))
    }, timeout)
    window[cb] = (data) => {
      done()
      resolve(data)
    }
    script.onerror = () => {
      done()
      reject(new Error('network'))
    }
    script.src = `${url}&callback=${cb}`
    document.head.appendChild(script)
  })
}

async function search(term, entity, extra = '', store = 'US', limit = 15) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=${entity}&limit=${limit}&country=${store}${extra}`
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('http ' + res.status)
    return (await res.json()).results || []
  } catch {
    return (await jsonp(url)).results || []
  }
}

// Names Apple files under a different spelling.
const ALIAS = { 'Tupac Shakur': '2Pac', 'Snoop Doggy Dogg': 'Snoop Dogg', 'Big Pun': 'Big Punisher', 'The Notorious B.I.G.': 'The Notorious B.I.G.' }

async function lookupTracks(id, store) {
  const url = `https://itunes.apple.com/lookup?id=${id}&entity=song&country=${store}`
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('http ' + res.status)
    return ((await res.json()).results || []).filter((r) => r.wrapperType === 'track')
  } catch {
    return ((await jsonp(url)).results || []).filter((r) => r.wrapperType === 'track')
  }
}

function pick(results, { title, artist, album }) {
  const wantTitle = norm(title || '').slice(0, 18)
  const wantAlbum = norm(album || '').slice(0, 18)
  const wantArtist = norm(artist || '')
  let best = null
  let bestScore = 0
  for (const r of results) {
    if (!r.previewUrl) continue
    const name = norm(r.trackName)
    const coll = norm(r.collectionName)
    const art = norm(r.artistName)
    let score = 0
    if (wantArtist) {
      if (art === wantArtist) score += 3
      else if (sameArtist(artist, r.artistName)) score += 2
      else continue
    }
    if (wantTitle) {
      if (name === norm(title)) score += 4
      else if (name.includes(wantTitle)) score += 3
      else continue
    }
    if (wantAlbum) {
      if (coll.includes(wantAlbum)) score += 3
      else continue
    }
    if (BAD.test(r.trackName) || BAD.test(r.collectionName || '')) score -= 3
    if (/live|remix|version|edit/i.test(r.trackName) && !/live|remix|version|edit/i.test(title || '')) score -= 1
    if (score > bestScore) {
      bestScore = score
      best = r
    }
  }
  return best
}

function shape(r) {
  return {
    url: r.previewUrl,
    trackName: r.trackName,
    artistName: r.artistName,
    collectionName: r.collectionName,
    artwork: r.artworkUrl100 ? r.artworkUrl100.replace('100x100', '200x200') : null,
    artworkLarge: r.artworkUrl100 ? r.artworkUrl100.replace('100x100', '600x600') : null,
  }
}

// "Epik High ft. Beenzino & Buddy" -> "Epik High". Long credit lines make the
// search return nothing, so searches use the lead artist only.
const lead = (artist) => artist.split(/\s+(?:ft\.?|feat\.?|featuring|x|&)\s+|,/i)[0].trim()

export async function findPreview(item) {
  const key = `${item.kind}|${item.title}|${item.artist}|${item.q || ''}|${item.store || ''}`
  if (cache.has(key)) return cache.get(key)

  const lookup = async (store) => {
    const who = lead(item.artist)
    if (item.kind === 'artist') {
      const name = ALIAS[item.artist] || item.artist
      let hit = pick(await search(name, 'song', '&attribute=artistTerm', store, 50), { artist: name })
      if (!hit) hit = pick(await search(`${name} rap`, 'song', '', store, 50), { artist: name })
      return hit
    }
    if (item.kind === 'album') {
      // Find the album itself, then take a track from it.
      const albums = await search(item.q || `${item.title} ${who}`, 'album', '', store)
      const want = norm(item.title).slice(0, 18)
      const alb = albums.find((a) => norm(a.collectionName).includes(want) && sameArtist(ALIAS[who] || who, a.artistName) && !BAD.test(a.collectionName))
      if (alb) {
        const tracks = await lookupTracks(alb.collectionId, store)
        const t = tracks.find((r) => r.previewUrl)
        if (t) return t
      }
      let hit = pick(await search(item.q || `${item.title} ${who}`, 'song', '', store), { artist: ALIAS[who] || who, album: item.title })
      if (!hit) hit = pick(await search(ALIAS[who] || who, 'song', '&attribute=artistTerm', store), { artist: ALIAS[who] || who, album: item.title })
      // Some catalogues (e.g. Death Row) are not sold by Apple. Play the artist instead.
      if (!hit) hit = pick(await search(ALIAS[who] || who, 'song', '&attribute=artistTerm', store), { artist: ALIAS[who] || who })
      return hit
    }
    const w = ALIAS[who] || who
    let hit = pick(await search(item.q || `${item.title} ${who}`, 'song', '', store), { title: item.title, artist: w })
    // Search ranks by popularity, so a famous song can be buried: look through the artist's catalogue.
    if (!hit) hit = pick(await search(w, 'song', '&attribute=artistTerm', store, 100), { title: item.title, artist: w })
    return hit
  }

  const task = (async () => {
    // US store first; then the scene's own country store.
    const stores = item.store && item.store !== 'US' ? ['US', item.store] : ['US']
    let hit = null
    let netError = null
    for (const store of stores) {
      try {
        hit = await lookup(store)
      } catch (e) {
        netError = e
      }
      if (hit) break
    }
    if (!hit) throw netError || new Error('not-found')
    return shape(hit)
  })()

  cache.set(key, task)
  task.catch(() => cache.delete(key))
  return task
}
