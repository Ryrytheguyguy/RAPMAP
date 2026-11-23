export default function Hero({ onStart, startYear, scenes, genres, countries }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <h1 id="hero-title">
          Rap has<br />
          <span>no borders.</span>
        </h1>
        <p className="hero-copy">
          Travel through 37 years of hip-hop on a world map. Pick a year, click a city, and hear the artists, songs and
          sounds that made each scene.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onStart}>
            Start exploring in {startYear}
          </button>
        </div>
        <ul className="hero-stats" aria-label="What is inside RapMap">
          <li>
            <strong>{scenes}</strong> scenes
          </li>
          <li>
            <strong>{countries}</strong> countries
          </li>
          <li>
            <strong>37</strong> years
          </li>
          <li>
            <strong>{genres}</strong> subgenres
          </li>
        </ul>
      </div>
    </section>
  )
}
