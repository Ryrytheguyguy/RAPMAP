# RapMap

An interactive map of rap's evolution, 1990-2026. 61 scenes, a year slider, filters, artist/song/album profiles, an influence chart, an audio quiz (guess the city and decade from a 10-second clip), and music that plays on the page.

## Easiest way to open it (no Node needed)
Double-click `rapmap-standalone.html`. It is one file and needs an internet connection for music, map fonts and previews.

## Run the project
```
npm install
npm run dev      # development
npm run build    # production build in dist/
```
Deploy: push to GitHub, import the repo in Vercel (framework: Vite). Nothing else to set up.

## Where things are
- `src/data/cities.js`: the first five scenes (NYC, LA, Atlanta, London, Paris), genres, influence helpers.
- `src/data/world.js`: the 30 added capitals. Each era lists genres, a 0-100 influence score, a blurb, artists, songs and albums.
- `src/components/Quiz.jsx`, `QuizMap.jsx`: the audio quiz (10-second clips, guess city and decade, map reveal). Questions are built from the songs and albums in the city data.
- `src/player/`: the music player. It looks up a 30-second preview on Apple's free iTunes Search API (no key) and plays it in a footer bar.
- `src/components/`: map, drawer, filters, influence chart, player bar.

## Notes on music
- Previews are 30 seconds, from Apple. Not every track exists there (small scenes and some labels, e.g. Death Row, are missing). When an album has no preview, a track by the artist plays instead. If nothing is found, the bar shows a message and a Spotify search link.
- Music does not play inside the shared preview link on claude.ai, because that page blocks outside requests. It works in the standalone file, locally and on Vercel.

## Content notes
Songs, albums and years were written from general knowledge and partly checked against Apple's catalogue. Please fact-check before submitting. Influence scores are editorial estimates. Scenes marked "A small profile" list only what could be confirmed. Singapore and the Maldives are pins only. Rabat, Astana, Hanoi, Canberra, Ankara, Beijing and Rio are national scenes pinned to the capital.

## Look and feel
Pins are headphones (see `pinHtml` in `src/components/MapView.jsx`). Land colours are the `LAND_COLOURS` list in the same file, the sea is the gradient on `.map` in `src/styles.css`, and the film grain is `body::after`. Fonts: Big Shoulders Display, Archivo, Courier Prime, Permanent Marker. While a track plays, `src/components/NowPlaying.jsx` shows the cover of that track from Apple's catalogue. Apple does not supply artist photos, so this is cover art, not a photo of the artist.

## Look and font
The map is drawn from Natural Earth country shapes in an atlas style (blue sea, tan land, white borders, soft shading from the `relief` filter in `index.html`). All text uses a Spotify-style font stack (`--font-display` / `--font-body`): Spotify's own Circular is a paid font, so the site uses Intera free font with a very similar look, and will pick up Circular automatically on any computer that has it installed. The interface uses a deep-ocean navy with sand-gold and leaf-green accents (tokens at the top of `src/styles.css`); red is used only on the headphones (`--signal`).


## Country pop and beat
Clicking a country raises it above the map. While a track plays, it bounces to an irregular boom-bap groove (see the `Bounce the raised country` effect in `src/components/MapView.jsx`): every bar is different, with strong kicks, snares, ghost hits and the occasional rest. Apple's audio cannot be analysed from a web page, so it is not tied to each song's real beat.

## Type & text colour
Fonts follow the brief sheet: **Anton** for the logo, titles and major headers; **Inter** for body text, navigation, descriptions and menus; **Space Mono** for years, coordinates, genre labels and music metadata. Text is neutral off-white (#eee) and grey (#a3a3a3) on the dark panels.

## Panels
The **Panels** button (left of the map) lets you hide/show the filter bar, timeline, now-playing card, city details and player bar. The choice is remembered in the browser.

## Publishing on GitHub Pages
The ready-built site is in the `docs/` folder, so no tools are needed on your computer.

1. Create a new **public** repository on github.com (for example `rapmap`).
2. Upload everything in this folder (drag the files and folders into the repository page, then **Commit changes**).
3. Open **Settings > Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, **Branch** to `main`, folder `/docs`, and press **Save**.
4. After about a minute the site is live at `https://YOUR-USERNAME.github.io/rapmap/`.

If you change the code and have Node installed: `npm install`, then `npm run build:docs`, and upload the new `docs/` folder.

Optional automatic build: the file `.github/workflows/deploy.yml` rebuilds the site on every push. To use it, set **Settings > Pages > Source** to *GitHub Actions* instead.

## Credits
AI helped code this project; a human directed it.
