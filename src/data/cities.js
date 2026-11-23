// ─────────────────────────────────────────────────────────────
// RapMap data
// To add a city: copy one object in CITIES, change id / name /
// country / coords / color, and fill in its eras. Every year from
// 1990 to 2026 must fall inside exactly one era of that city.
// `influence` (0-100) is an EDITORIAL estimate of how much a scene
// shaped rap worldwide in that era. It is not hard data. Tweak it!
// ─────────────────────────────────────────────────────────────

import { WORLD_CITIES } from './world.js'

export const GENRES = [
  { id: 'boom-bap', label: 'Boom bap' },
  { id: 'conscious', label: 'Conscious' },
  { id: 'g-funk', label: 'G-funk' },
  { id: 'gangsta', label: 'Gangsta rap' },
  { id: 'southern', label: 'Southern' },
  { id: 'crunk', label: 'Crunk' },
  { id: 'trap', label: 'Trap' },
  { id: 'drill', label: 'Drill' },
  { id: 'grime', label: 'Grime' },
  { id: 'afroswing', label: 'Afroswing' },
  { id: 'french-rap', label: 'French rap' },
  { id: 'cloud', label: 'Cloud rap' },
  { id: 'alt', label: 'Alternative' },
  { id: 'melodic', label: 'Melodic rap' },
  { id: 'go-go', label: 'Go-go' },
  { id: 'latin', label: 'Latin rap' },
  { id: 'german-rap', label: 'German rap' },
  { id: 'k-hip-hop', label: 'K-hip-hop' },
  { id: 'j-hip-hop', label: 'J-hip-hop' },
  { id: 'c-hip-hop', label: 'Chinese hip-hop' },
  { id: 'sea', label: 'Southeast Asian' },
  { id: 'desi', label: 'Desi hip-hop' },
  { id: 'arabic', label: 'Arabic rap' },
  { id: 'turkish', label: 'Turkish rap' },
  { id: 'african', label: 'African rap' },
  { id: 'central-asian', label: 'Central Asian' },
  { id: 'island', label: 'Island rap' },
  { id: 'russian', label: 'Russian rap' },
  { id: 'dembow', label: 'Dembow' },
  { id: 'persian', label: 'Persian rap' },
  { id: 'tuga', label: 'Hip hop tuga' },
  { id: 'greek', label: 'Greek rap' },
  { id: 'nordic', label: 'Nordic rap' },
  { id: 'eastern-euro', label: 'Eastern European' },
  { id: 'mongolian', label: 'Mongolian rap' },
]

export const GENRE_LABEL = Object.fromEntries(GENRES.map((g) => [g.id, g.label]))

export const spotifySearch = (q) => `https://open.spotify.com/search/${encodeURIComponent(q)}`

const BASE_CITIES = [
  // ───────────────────────── NEW YORK ─────────────────────────
  {
    id: 'nyc',
    region: 'North America',
    name: 'New York',
    country: 'USA',
    coords: [40.7128, -74.006],
    color: '#e8554e',
    tagline: 'Where it all began. Born in the Bronx, raised in five boroughs.',
    eras: [
      {
        from: 1990,
        to: 1994,
        title: 'The Golden Age',
        blurb:
          'Queens, Brooklyn, Staten Island and the Bronx each had their own sound, but all of it ran on dusty samples and hard drums. Lyricism was the currency, and this stretch produced some of the most respected albums in rap history.',
        genres: ['boom-bap', 'conscious'],
        influence: 98,
        artists: [
          { name: 'Nas', note: 'Queensbridge poet. Illmatic became the benchmark for NYC lyricism.' },
          { name: 'Wu-Tang Clan', note: 'Staten Island collective that turned kung-fu films and chess into a sound.' },
          { name: 'A Tribe Called Quest', note: 'Queens jazz-rap pioneers with warm samples and playful verses.' },
          { name: 'The Notorious B.I.G.', note: 'Brooklyn storyteller with one of the smoothest flows ever.' },
          { name: 'Gang Starr', note: "DJ Premier's chopped-sample beats meet Guru's calm delivery." },
        ],
        songs: [
          { title: 'N.Y. State of Mind', artist: 'Nas', year: 1994 },
          { title: 'C.R.E.A.M.', artist: 'Wu-Tang Clan', year: 1993 },
          { title: 'Juicy', artist: 'The Notorious B.I.G.', year: 1994 },
          { title: 'Can I Kick It?', artist: 'A Tribe Called Quest', year: 1990 },
          { title: 'Mass Appeal', artist: 'Gang Starr', year: 1994 },
        ],
        albums: [
          { title: 'Illmatic', artist: 'Nas', year: 1994 },
          { title: 'Enter the Wu-Tang (36 Chambers)', artist: 'Wu-Tang Clan', year: 1993 },
          { title: 'Ready to Die', artist: 'The Notorious B.I.G.', year: 1994 },
          { title: 'The Low End Theory', artist: 'A Tribe Called Quest', year: 1991 },
          { title: 'Midnight Marauders', artist: 'A Tribe Called Quest', year: 1993 },
        ],
      },
      {
        from: 1995,
        to: 1999,
        title: 'Shiny Suits & Street Dreams',
        blurb:
          'Rap went fully mainstream. Bad Boy turned samples into pop hits while Mobb Deep, DMX and Busta Rhymes kept the streets loud. Jay-Z started building an empire that would define the next decade.',
        genres: ['boom-bap'],
        influence: 95,
        artists: [
          { name: 'Jay-Z', note: 'Marcy Projects to mogul. Reasonable Doubt is a mafioso-rap classic.' },
          { name: 'Mobb Deep', note: 'Queensbridge duo with cold, minimal, menacing production.' },
          { name: 'Busta Rhymes', note: 'Hyperactive flow and the most memorable videos of the era.' },
          { name: 'DMX', note: 'Yonkers voice with a raspy growl and raw emotion.' },
          { name: 'Big Pun', note: 'Bronx lyrical heavyweight and a landmark for Latin rap.' },
        ],
        songs: [
          { title: 'Shook Ones, Pt. II', artist: 'Mobb Deep', year: 1995 },
          { title: 'Hypnotize', artist: 'The Notorious B.I.G.', year: 1997 },
          { title: 'Hard Knock Life (Ghetto Anthem)', artist: 'Jay-Z', year: 1998 },
          { title: "Ruff Ryders' Anthem", artist: 'DMX', year: 1998 },
          { title: 'Gimme Some More', artist: 'Busta Rhymes', year: 1998 },
        ],
        albums: [
          { title: 'The Infamous', artist: 'Mobb Deep', year: 1995 },
          { title: 'Reasonable Doubt', artist: 'Jay-Z', year: 1996 },
          { title: 'It Was Written', artist: 'Nas', year: 1996 },
          { title: 'Life After Death', artist: 'The Notorious B.I.G.', year: 1997 },
          { title: "It's Dark and Hell Is Hot", artist: 'DMX', year: 1998 },
        ],
      },
      {
        from: 2000,
        to: 2009,
        title: 'Roc-A-Fella, G-Unit & the Mixtape Wars',
        blurb:
          'Jay-Z and Nas traded classics, 50 Cent turned a mixtape buzz into a global hit factory, and Harlem\'s Diplomats brought flamboyant style. The Southern sound was rising, but New York still set the tone.',
        genres: ['boom-bap', 'conscious'],
        influence: 85,
        artists: [
          { name: 'Jay-Z', note: 'The Blueprint (2001) reset the sound of the decade.' },
          { name: '50 Cent', note: 'Queens survivor whose debut album sold in the millions.' },
          { name: "Cam'ron", note: 'Harlem wit, pink fur and the Diplomats movement.' },
          { name: 'Nas', note: 'Stillmatic answered the critics with a comeback.' },
        ],
        songs: [
          { title: 'Made You Look', artist: 'Nas', year: 2002 },
          { title: 'Oh Boy', artist: "Cam'ron", year: 2002 },
          { title: 'In Da Club', artist: '50 Cent', year: 2003 },
          { title: '99 Problems', artist: 'Jay-Z', year: 2003 },
          { title: 'Empire State of Mind', artist: 'Jay-Z', year: 2009 },
        ],
        albums: [
          { title: 'The Blueprint', artist: 'Jay-Z', year: 2001 },
          { title: 'Stillmatic', artist: 'Nas', year: 2001 },
          { title: 'Get Rich or Die Tryin\'', artist: '50 Cent', year: 2003 },
          { title: 'The Black Album', artist: 'Jay-Z', year: 2003 },
          { title: 'Purple Haze', artist: "Cam'ron", year: 2004 },
        ],
      },
      {
        from: 2010,
        to: 2019,
        title: 'A New Wave Rises',
        blurb:
          'A fresh generation blended boom bap nostalgia, cloud rap and pop. Harlem and Brooklyn crews got internet-famous, Nicki Minaj and Cardi B reshaped what a rap star looks like, and by 2019 Brooklyn drill was exploding.',
        genres: ['boom-bap', 'cloud', 'drill'],
        influence: 70,
        artists: [
          { name: 'A$AP Rocky', note: 'Harlem stylist who mixed Houston slow-downs with NYC swagger.' },
          { name: 'Joey Bada$$', note: 'Brooklyn teen who revived the 90s sound with Pro Era.' },
          { name: 'Cardi B', note: 'Bronx-born superstar with a huge personality.' },
          { name: 'Nicki Minaj', note: 'Queens-raised icon with elite bars and larger-than-life characters.' },
          { name: 'Pop Smoke', note: 'Brooklyn voice who brought UK-style drill beats to New York.' },
        ],
        songs: [
          { title: 'Peso', artist: 'A$AP Rocky', year: 2011 },
          { title: 'Survival Tactics', artist: 'Joey Bada$$', year: 2012 },
          { title: 'Starships', artist: 'Nicki Minaj', year: 2012 },
          { title: 'Bodak Yellow', artist: 'Cardi B', year: 2017 },
          { title: 'Welcome to the Party', artist: 'Pop Smoke', year: 2019 },
        ],
        albums: [
          { title: 'Pink Friday', artist: 'Nicki Minaj', year: 2010 },
          { title: 'Live.Love.A$AP', artist: 'A$AP Rocky', year: 2011 },
          { title: '1999', artist: 'Joey Bada$$', year: 2012 },
          { title: 'Invasion of Privacy', artist: 'Cardi B', year: 2018 },
          { title: 'Meet the Woo', artist: 'Pop Smoke', year: 2019 },
        ],
      },
      {
        from: 2020,
        to: 2026,
        title: 'Brooklyn Drill & Bronx Bounce',
        blurb:
          'Drill became the sound of the city. Pop Smoke\'s posthumous debut topped charts worldwide, Fivio Foreign carried the Brooklyn wave, and Ice Spice made Bronx rap go viral with a very short, very catchy formula.',
        genres: ['drill'],
        influence: 78,
        artists: [
          { name: 'Pop Smoke', note: 'His 2020 debut became one of the defining records of the era.' },
          { name: 'Fivio Foreign', note: 'Brooklyn drill leader who landed major collaborations.' },
          { name: 'Ice Spice', note: 'Bronx rapper whose short, hooky songs ruled social media.' },
          { name: 'Cardi B', note: 'Still a top-tier hitmaker, with huge collaborations.' },
        ],
        songs: [
          { title: 'What You Know Bout Love', artist: 'Pop Smoke', year: 2020 },
          { title: 'Up', artist: 'Cardi B', year: 2021 },
          { title: 'Munch (Feelin\' U)', artist: 'Ice Spice', year: 2022 },
          { title: 'Princess Diana', artist: 'Ice Spice', year: 2023 },
        ],
        albums: [
          { title: 'Shoot for the Stars, Aim for the Moon', artist: 'Pop Smoke', year: 2020 },
          { title: 'B.I.B.L.E.', artist: 'Fivio Foreign', year: 2022 },
          { title: 'Like..?', artist: 'Ice Spice', year: 2023 },
        ],
      },
    ],
  },

  // ───────────────────────── LOS ANGELES ─────────────────────────
  {
    id: 'la',
    region: 'North America',
    name: 'Los Angeles',
    country: 'USA',
    coords: [34.0522, -118.2437],
    color: '#f2a65a',
    tagline: 'Sunshine, funk and street poetry from Compton to Crenshaw.',
    eras: [
      {
        from: 1990,
        to: 1994,
        title: 'G-Funk Takes Over',
        blurb:
          'West Coast rap moved from raw gangsta storytelling to the slow, melodic, synth-heavy G-funk sound. Dr. Dre\'s The Chronic set the template, and Long Beach and Compton became the center of the rap world.',
        genres: ['g-funk', 'gangsta'],
        influence: 92,
        artists: [
          { name: 'Dr. Dre', note: 'Compton producer who built the G-funk sound on The Chronic.' },
          { name: 'Snoop Doggy Dogg', note: 'Long Beach voice with the most relaxed flow in rap.' },
          { name: 'Ice Cube', note: 'South Central storyteller with sharp, cinematic writing.' },
          { name: 'Cypress Hill', note: 'South Gate group who mixed rap with Latino culture and funk.' },
          { name: 'Warren G', note: 'Long Beach producer-rapper who took G-funk to pop radio.' },
        ],
        songs: [
          { title: "Nuthin' but a 'G' Thang", artist: 'Dr. Dre ft. Snoop Dogg', year: 1992 },
          { title: 'It Was a Good Day', artist: 'Ice Cube', year: 1992 },
          { title: 'Insane in the Brain', artist: 'Cypress Hill', year: 1993 },
          { title: 'Gin and Juice', artist: 'Snoop Doggy Dogg', year: 1994 },
          { title: 'Regulate', artist: 'Warren G & Nate Dogg', year: 1994 },
        ],
        albums: [
          { title: 'The Chronic', artist: 'Dr. Dre', year: 1992 },
          { title: 'The Predator', artist: 'Ice Cube', year: 1992 },
          { title: 'Doggystyle', artist: 'Snoop Doggy Dogg', year: 1993 },
          { title: 'Regulate... G Funk Era', artist: 'Warren G', year: 1994 },
        ],
      },
      {
        from: 1995,
        to: 1999,
        title: 'Death Row Peak & the Underground',
        blurb:
          'Tupac made Los Angeles his home base, "California Love" hit everywhere, and Dr. Dre returned with a polished new sound. Meanwhile, workshops like Project Blowed nurtured a fast, experimental underground scene.',
        genres: ['g-funk', 'gangsta'],
        influence: 90,
        artists: [
          { name: 'Tupac Shakur', note: 'New York-born but a West Coast icon through this period.' },
          { name: 'Dr. Dre', note: '2001 pushed rap production into a bigger, cleaner sound.' },
          { name: 'Snoop Dogg', note: 'Kept the G-funk flame alive on Tha Doggfather.' },
          { name: 'Freestyle Fellowship', note: 'Project Blowed pioneers known for complex, jazzy flows.' },
        ],
        songs: [
          { title: 'Dear Mama', artist: '2Pac', year: 1995 },
          { title: 'California Love', artist: '2Pac ft. Dr. Dre', year: 1995 },
          { title: 'How Do U Want It', artist: '2Pac', year: 1996 },
          { title: 'Still D.R.E.', artist: 'Dr. Dre ft. Snoop Dogg', year: 1999 },
        ],
        albums: [
          { title: 'Me Against the World', artist: '2Pac', year: 1995 },
          { title: 'All Eyez on Me', artist: '2Pac', year: 1996 },
          { title: 'Tha Doggfather', artist: 'Snoop Dogg', year: 1996 },
          { title: '2001', artist: 'Dr. Dre', year: 1999 },
        ],
      },
      {
        from: 2000,
        to: 2009,
        title: 'Dr. Dre Protégés & Pop Crossover',
        blurb:
          'The old guard kept hitting while new voices like The Game arrived. Snoop Dogg went global with Pharrell-produced hits. LA was still famous, but the center of rap was moving south.',
        genres: ['gangsta'],
        influence: 70,
        artists: [
          { name: 'The Game', note: 'Compton rapper who revived West Coast rap with The Documentary.' },
          { name: 'Snoop Dogg', note: 'Reinvented himself as a pop-friendly global star.' },
          { name: 'Ice Cube', note: 'Moved between music and film but kept releasing albums.' },
          { name: 'Dr. Dre', note: 'Behind the boards for a new generation of stars.' },
        ],
        songs: [
          { title: 'You Can Do It', artist: 'Ice Cube', year: 2000 },
          { title: "Drop It Like It's Hot", artist: 'Snoop Dogg ft. Pharrell', year: 2004 },
          { title: 'Hate It or Love It', artist: 'The Game ft. 50 Cent', year: 2005 },
        ],
        albums: [
          { title: "R&G (Rhythm & Gangsta): The Masterpiece", artist: 'Snoop Dogg', year: 2004 },
          { title: 'The Documentary', artist: 'The Game', year: 2005 },
          { title: 'Laugh Now, Cry Later', artist: 'Ice Cube', year: 2006 },
        ],
      },
      {
        from: 2010,
        to: 2019,
        title: 'Kendrick, TDE & the New Wave',
        blurb:
          'Compton\'s Kendrick Lamar and the TDE crew pushed West Coast rap toward jazz, funk and social commentary. Tyler, the Creator led Odd Future\'s weird side, Nipsey Hussle built a community brand, and Roddy Ricch scored a worldwide hit.',
        genres: ['conscious', 'alt', 'gangsta'],
        influence: 85,
        artists: [
          { name: 'Kendrick Lamar', note: 'Compton storyteller who became one of rap\'s defining voices.' },
          { name: 'Tyler, the Creator', note: 'Odd Future leader with a constantly evolving sound.' },
          { name: 'Nipsey Hussle', note: 'Crenshaw entrepreneur-rapper, remembered as a community leader.' },
          { name: 'Vince Staples', note: 'Long Beach rapper with sharp, honest writing.' },
          { name: 'Roddy Ricch', note: 'Compton melodic rapper with a global hit.' },
        ],
        songs: [
          { title: 'Yonkers', artist: 'Tyler, the Creator', year: 2011 },
          { title: 'Swimming Pools (Drank)', artist: 'Kendrick Lamar', year: 2012 },
          { title: 'Alright', artist: 'Kendrick Lamar', year: 2015 },
          { title: 'The Box', artist: 'Roddy Ricch', year: 2019 },
        ],
        albums: [
          { title: 'Goblin', artist: 'Tyler, the Creator', year: 2011 },
          { title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar', year: 2012 },
          { title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', year: 2015 },
          { title: "Summertime '06", artist: 'Vince Staples', year: 2015 },
          { title: 'Victory Lap', artist: 'Nipsey Hussle', year: 2018 },
        ],
      },
      {
        from: 2020,
        to: 2026,
        title: 'Kendrick Era',
        blurb:
          'Kendrick Lamar became the center of rap conversation, Tyler kept reinventing his sound, and the West Coast regained massive global attention with the 2024 rap feud and its most-played record.',
        genres: ['conscious', 'alt'],
        influence: 88,
        artists: [
          { name: 'Kendrick Lamar', note: 'Mr. Morale, then "Not Like Us" and GNX in 2024.' },
          { name: 'Tyler, the Creator', note: 'Hit a new creative peak with Call Me If You Get Lost and Chromakopia.' },
          { name: 'Roddy Ricch', note: 'Compton melodic rapper still pushing the sound.' },
        ],
        songs: [
          { title: 'N95', artist: 'Kendrick Lamar', year: 2022 },
          { title: 'Not Like Us', artist: 'Kendrick Lamar', year: 2024 },
        ],
        albums: [
          { title: 'Call Me If You Get Lost', artist: 'Tyler, the Creator', year: 2021 },
          { title: 'Mr. Morale & the Big Steppers', artist: 'Kendrick Lamar', year: 2022 },
          { title: 'Chromakopia', artist: 'Tyler, the Creator', year: 2024 },
          { title: 'GNX', artist: 'Kendrick Lamar', year: 2024 },
        ],
      },
    ],
  },

  // ───────────────────────── ATLANTA ─────────────────────────
  {
    id: 'atl',
    region: 'North America',
    name: 'Atlanta',
    country: 'USA',
    coords: [33.749, -84.388],
    color: '#9bd16b',
    tagline: 'The city that turned the South into rap\'s center of gravity.',
    eras: [
      {
        from: 1990,
        to: 1994,
        title: 'Planting the Seeds',
        blurb:
          'Atlanta was still outside rap\'s spotlight, but things were starting. Arrested Development won over critics with positive, Southern-flavored rap, Kris Kross had the world jumping, and OutKast arrived with Organized Noize\'s soulful production.',
        genres: ['southern', 'conscious'],
        influence: 40,
        artists: [
          { name: 'OutKast', note: 'André 3000 and Big Boi: the duo that changed Southern rap.' },
          { name: 'Arrested Development', note: 'Southern-flavored, positive, and a critical favorite.' },
          { name: 'Kris Kross', note: 'Teen duo who wore their clothes backward and ruled 1992.' },
          { name: 'Organized Noize', note: 'Producer collective behind the Dungeon Family sound.' },
        ],
        songs: [
          { title: 'Mr. Wendal', artist: 'Arrested Development', year: 1992 },
          { title: 'Tennessee', artist: 'Arrested Development', year: 1992 },
          { title: 'Jump', artist: 'Kris Kross', year: 1992 },
          { title: "Player's Ball", artist: 'OutKast', year: 1993 },
        ],
        albums: [
          { title: '3 Years, 5 Months and 2 Days in the Life Of...', artist: 'Arrested Development', year: 1992 },
          { title: 'Totally Krossed Out', artist: 'Kris Kross', year: 1992 },
          { title: 'Southernplayalisticadillacmuzik', artist: 'OutKast', year: 1994 },
        ],
      },
      {
        from: 1995,
        to: 1999,
        title: 'The South Got Something to Say',
        blurb:
          'At the 1995 Source Awards, André 3000 told the crowd "the South got something to say." He was right. OutKast and the Dungeon Family built a strange, soulful and futuristic style that fans and critics loved.',
        genres: ['southern', 'conscious'],
        influence: 60,
        artists: [
          { name: 'OutKast', note: 'Went from regional stars to critical heavyweights.' },
          { name: 'Goodie Mob', note: 'Dungeon Family group with deep, socially aware songs.' },
          { name: 'CeeLo Green', note: 'Goodie Mob\'s soul-drenched voice.' },
        ],
        songs: [
          { title: 'Cell Therapy', artist: 'Goodie Mob', year: 1995 },
          { title: 'Elevators (Me & You)', artist: 'OutKast', year: 1996 },
          { title: 'Rosa Parks', artist: 'OutKast', year: 1998 },
        ],
        albums: [
          { title: 'Soul Food', artist: 'Goodie Mob', year: 1995 },
          { title: 'ATLiens', artist: 'OutKast', year: 1996 },
          { title: 'Aquemini', artist: 'OutKast', year: 1998 },
        ],
      },
      {
        from: 2000,
        to: 2009,
        title: 'Crunk, Snap & the Birth of Trap',
        blurb:
          'Atlanta became rap\'s hit factory. Lil Jon blew up club rap with crunk, D4L made snap music a craze, and T.I. and Young Jeezy gave the world trap, a style built on hard drums and street stories that would take over global rap.',
        genres: ['trap', 'crunk', 'southern'],
        influence: 85,
        artists: [
          { name: 'T.I.', note: 'Named a whole genre with his 2003 album Trap Muzik.' },
          { name: 'Young Jeezy', note: 'Voice of the streets with big hooks and ad-libs.' },
          { name: 'Lil Jon', note: 'King of crunk, famous for shouted hooks and party energy.' },
          { name: 'Ludacris', note: 'Playful, punchy and a major star by the early 2000s.' },
          { name: 'Gucci Mane', note: 'East Atlanta trap pioneer with a constant stream of mixtapes.' },
        ],
        songs: [
          { title: 'Get Low', artist: 'Lil Jon & The East Side Boyz', year: 2003 },
          { title: 'Rubber Band Man', artist: 'T.I.', year: 2003 },
          { title: 'Laffy Taffy', artist: 'D4L', year: 2005 },
          { title: 'Soul Survivor', artist: 'Young Jeezy ft. Akon', year: 2005 },
        ],
        albums: [
          { title: 'Stankonia', artist: 'OutKast', year: 2000 },
          { title: 'Trap Muzik', artist: 'T.I.', year: 2003 },
          { title: 'Speakerboxxx/The Love Below', artist: 'OutKast', year: 2003 },
          { title: "Let's Get It: Thug Motivation 101", artist: 'Young Jeezy', year: 2005 },
        ],
      },
      {
        from: 2010,
        to: 2019,
        title: 'Trap Takes the World',
        blurb:
          'By the mid-2010s, trap was global pop. Future\'s moody melodies, Migos\' triplet flows, Young Thug\'s wild vocals and 21 Savage\'s deadpan delivery gave Atlanta the strongest hold on mainstream rap it has ever had.',
        genres: ['trap'],
        influence: 97,
        artists: [
          { name: 'Future', note: 'Pioneered a dark, melodic style that countless rappers copied.' },
          { name: 'Migos', note: 'Triplet flows and viral hooks. They defined a new rhythm.' },
          { name: 'Young Thug', note: 'Experimental voice that influenced a generation.' },
          { name: '21 Savage', note: 'Deadpan Atlanta storyteller.' },
          { name: 'Lil Baby', note: 'Rapidly rose in 2018 and became a defining voice.' },
        ],
        songs: [
          { title: 'Bad and Boujee', artist: 'Migos ft. Lil Uzi Vert', year: 2016 },
          { title: 'Mask Off', artist: 'Future', year: 2017 },
          { title: 'Bank Account', artist: '21 Savage', year: 2017 },
          { title: 'Drip Too Hard', artist: 'Lil Baby & Gunna', year: 2018 },
        ],
        albums: [
          { title: 'DS2', artist: 'Future', year: 2015 },
          { title: 'Barter 6', artist: 'Young Thug', year: 2015 },
          { title: 'Culture', artist: 'Migos', year: 2017 },
          { title: 'Issa Album', artist: '21 Savage', year: 2017 },
        ],
      },
      {
        from: 2020,
        to: 2026,
        title: 'The New Atlanta Generation',
        blurb:
          'Lil Baby, Gunna and Future stayed at the top, 21 Savage teamed up with Drake for one of the decade\'s biggest releases, and Latto pushed Atlanta\'s rap further. Trap is no longer just a style; it is the global default.',
        genres: ['trap', 'southern'],
        influence: 92,
        artists: [
          { name: 'Lil Baby', note: 'My Turn made him one of the decade\'s leading rappers.' },
          { name: 'Gunna', note: 'Smooth melodic style that fits any beat.' },
          { name: 'Future', note: 'Over a decade of dominance and still going.' },
          { name: '21 Savage', note: 'Reached a new level with Her Loss.' },
          { name: 'Latto', note: 'Atlanta-raised hitmaker with a hard-edged delivery.' },
        ],
        songs: [
          { title: 'Life Is Good', artist: 'Future ft. Drake', year: 2020 },
          { title: 'The Bigger Picture', artist: 'Lil Baby', year: 2020 },
          { title: 'Big Energy', artist: 'Latto', year: 2021 },
          { title: 'pushin P', artist: 'Gunna & Future ft. Young Thug', year: 2022 },
          { title: 'Rich Flex', artist: 'Drake & 21 Savage', year: 2022 },
        ],
        albums: [
          { title: 'My Turn', artist: 'Lil Baby', year: 2020 },
          { title: 'Punk', artist: 'Young Thug', year: 2021 },
          { title: 'DS4EVER', artist: 'Gunna', year: 2022 },
          { title: 'I Never Liked You', artist: 'Future', year: 2022 },
          { title: 'Her Loss', artist: 'Drake & 21 Savage', year: 2022 },
        ],
      },
    ],
  },

  // ───────────────────────── LONDON ─────────────────────────
  {
    id: 'london',
    region: 'Europe',
    name: 'London',
    country: 'UK',
    coords: [51.5074, -0.1278],
    color: '#5aa6e0',
    tagline: 'From pirate radio to the charts. Grime and UK drill started here.',
    eras: [
      {
        from: 1990,
        to: 1999,
        title: 'UK Hip-Hop Underground',
        blurb:
          'London rappers started rapping in their own accents instead of copying American ones. The scene lived on pirate radio, small labels and club nights, and mixed with jungle and drum & bass. It was small, but it laid the groundwork for everything to come.',
        genres: ['boom-bap', 'conscious'],
        influence: 30,
        artists: [
          { name: 'London Posse', note: 'Early London crew who rapped proudly in their own accents.' },
          { name: 'Blak Twang', note: 'South London storyteller and one of UK rap\'s early voices.' },
          { name: 'Roots Manuva', note: 'Stockwell artist who blended dub, hip-hop and humor.' },
        ],
        songs: [{ title: 'So Rotten', artist: 'Blak Twang', year: 1996 }],
        albums: [
          { title: 'Gangster Chronicle', artist: 'London Posse', year: 1990 },
          { title: 'Brand New Second Hand', artist: 'Roots Manuva', year: 1999 },
        ],
      },
      {
        from: 2000,
        to: 2009,
        title: 'Grime Is Born',
        blurb:
          'Around 2002, East London produced a brand-new genre: fast, rough, electronic beats around 140 BPM with MCs spitting over them. Dizzee Rascal\'s Boy in da Corner won the 2003 Mercury Prize, proving that grime was a serious art form.',
        genres: ['grime'],
        influence: 55,
        artists: [
          { name: 'Dizzee Rascal', note: 'Bow teenager whose debut album changed UK music.' },
          { name: 'Wiley', note: 'Often called the Godfather of Grime for his pioneering beats.' },
          { name: 'Kano', note: 'East London MC with a sharp, melodic flow.' },
          { name: 'Lethal Bizzle', note: 'Created one of grime\'s first big crowd anthems.' },
          { name: 'Giggs', note: 'Peckham pioneer of the road-rap sound.' },
        ],
        songs: [
          { title: 'Eskimo', artist: 'Wiley', year: 2002 },
          { title: 'Fix Up, Look Sharp', artist: 'Dizzee Rascal', year: 2003 },
          { title: 'Pow! (Forward)', artist: 'Lethal Bizzle', year: 2004 },
          { title: "P's and Q's", artist: 'Kano', year: 2004 },
        ],
        albums: [
          { title: 'Boy in da Corner', artist: 'Dizzee Rascal', year: 2003 },
          { title: 'Run the Road', artist: 'Various Artists', year: 2004 },
          { title: 'Home Sweet Home', artist: 'Kano', year: 2005 },
        ],
      },
      {
        from: 2010,
        to: 2019,
        title: 'Grime Goes Global & UK Drill Appears',
        blurb:
          'Skepta\'s Konnichiwa won the 2016 Mercury Prize, and in 2017 Stormzy\'s Gang Signs & Prayer became the first grime album to reach number one in the UK. J Hus mixed rap with Afro-influenced rhythms, Dave won the 2019 Mercury Prize with Psychodrama, and UK drill started to emerge.',
        genres: ['grime', 'drill', 'afroswing'],
        influence: 80,
        artists: [
          { name: 'Skepta', note: 'Tottenham MC who led grime\'s international comeback.' },
          { name: 'Stormzy', note: 'Croydon star who made grime a chart-topping force.' },
          { name: 'J Hus', note: 'Stratford artist who shaped the afroswing sound.' },
          { name: 'Dave', note: 'Streatham rapper known for deep, introspective writing.' },
          { name: 'Little Simz', note: 'North London MC with ambitious, genre-bending albums.' },
        ],
        songs: [
          { title: "That's Not Me", artist: 'Skepta ft. JME', year: 2014 },
          { title: 'Shut Up', artist: 'Stormzy', year: 2015 },
          { title: 'Did You See', artist: 'J Hus', year: 2017 },
          { title: 'Black', artist: 'Dave', year: 2019 },
        ],
        albums: [
          { title: 'Konnichiwa', artist: 'Skepta', year: 2016 },
          { title: 'Gang Signs & Prayer', artist: 'Stormzy', year: 2017 },
          { title: 'Common Sense', artist: 'J Hus', year: 2017 },
          { title: 'Psychodrama', artist: 'Dave', year: 2019 },
          { title: 'Grey Area', artist: 'Little Simz', year: 2019 },
        ],
      },
      {
        from: 2020,
        to: 2026,
        title: 'UK Rap Goes Worldwide',
        blurb:
          'Central Cee made UK drill a worldwide streaming force, Dave and Central Cee topped charts together with "Sprinter," and Little Simz won the 2022 Mercury Prize. London is now one of the most exported rap scenes in the world.',
        genres: ['drill', 'grime', 'afroswing'],
        influence: 85,
        artists: [
          { name: 'Central Cee', note: 'West London drill star with global reach.' },
          { name: 'Dave', note: 'Continues to be one of the most respected UK rappers.' },
          { name: 'Little Simz', note: 'Mercury Prize winner and creative powerhouse.' },
          { name: 'Headie One', note: 'Tottenham drill star known for an inventive, melodic style.' },
          { name: 'Stormzy', note: 'Grime-to-pop figure who moved to a broader sound.' },
        ],
        songs: [
          { title: 'Doja', artist: 'Central Cee', year: 2022 },
          { title: 'Sprinter', artist: 'Dave & Central Cee', year: 2023 },
        ],
        albums: [
          { title: 'Edna', artist: 'Headie One', year: 2020 },
          { title: "We're All Alone in This Together", artist: 'Dave', year: 2021 },
          { title: 'Sometimes I Might Be Introvert', artist: 'Little Simz', year: 2021 },
          { title: "Can't Rush Greatness", artist: 'Central Cee', year: 2023 },
        ],
      },
    ],
  },

  // ───────────────────────── PARIS ─────────────────────────
  {
    id: 'paris',
    region: 'Europe',
    name: 'Paris',
    country: 'France',
    coords: [48.8566, 2.3522],
    color: '#c9a0e8',
    tagline: 'Rap français: one of the biggest rap scenes outside the US.',
    eras: [
      {
        from: 1990,
        to: 1994,
        title: 'French Rap Finds Its Voice',
        blurb:
          'After a 1984 TV show introduced hip-hop to French homes, Paris artists developed their own approach. MC Solaar brought jazzy, poetic wordplay while Suprême NTM and Assassin from the suburbs delivered harder, political rap.',
        genres: ['french-rap', 'boom-bap', 'conscious'],
        influence: 55,
        artists: [
          { name: 'MC Solaar', note: 'Smooth, poetic and the first French rap star.' },
          { name: 'Suprême NTM', note: 'Saint-Denis duo with raw energy and political lyrics.' },
          { name: 'Assassin', note: 'Uncompromising Paris group with sharp social commentary.' },
        ],
        songs: [
          { title: 'Bouge de là', artist: 'MC Solaar', year: 1991 },
          { title: 'Caroline', artist: 'MC Solaar', year: 1994 },
        ],
        albums: [
          { title: 'Qui sème le vent récolte le tempo', artist: 'MC Solaar', year: 1991 },
          { title: 'Authentik', artist: 'Suprême NTM', year: 1991 },
          { title: 'Prose Combat', artist: 'MC Solaar', year: 1994 },
        ],
      },
      {
        from: 1995,
        to: 1999,
        title: 'Banlieue Voices',
        blurb:
          'Suburban crews moved to the center of French rap. Suprême NTM\'s Paris sous les bombes became a landmark, Doc Gynéco brought a laid-back G-funk feel, and 113 closed the decade with an album about growing up in the suburbs.',
        genres: ['french-rap', 'boom-bap', 'g-funk'],
        influence: 62,
        artists: [
          { name: 'Suprême NTM', note: 'Led the decade with intense live shows and strong albums.' },
          { name: 'Doc Gynéco', note: 'Relaxed, G-funk-influenced and very popular.' },
          { name: '113', note: 'Vitry-sur-Seine group telling suburban stories.' },
          { name: 'MC Solaar', note: 'Kept expanding French rap\'s mainstream audience.' },
        ],
        songs: [
          { title: 'Nirvana', artist: 'Doc Gynéco', year: 1996 },
          { title: 'Paris sous les bombes', artist: 'Suprême NTM', year: 1995 },
        ],
        albums: [
          { title: 'Paris sous les bombes', artist: 'Suprême NTM', year: 1995 },
          { title: 'Première consultation', artist: 'Doc Gynéco', year: 1996 },
          { title: 'Les Princes de la ville', artist: '113', year: 1999 },
        ],
      },
      {
        from: 2000,
        to: 2009,
        title: 'Street Rap Goes Mainstream',
        blurb:
          'French rap became a commercial force. Booba, first with Lunatic and then solo, shaped the hard, stylish side of the genre, while Diam\'s became a rare female star with a big pop crossover.',
        genres: ['french-rap', 'conscious'],
        influence: 65,
        artists: [
          { name: 'Booba', note: 'Boulogne-Billancourt MC who became one of French rap\'s biggest names.' },
          { name: 'Lunatic', note: 'The Booba and Ali duo behind a street-rap classic.' },
          { name: "Diam's", note: 'Breakthrough female star with a huge 2006 album.' },
          { name: 'Rohff', note: 'Vitry-sur-Seine veteran with a technical, aggressive style.' },
          { name: 'Kery James', note: 'Thoughtful, socially conscious voice.' },
        ],
        songs: [
          { title: 'Mauvais œil', artist: 'Lunatic', year: 2000 },
          { title: 'Temps mort', artist: 'Booba', year: 2002 },
          { title: 'La Boulette', artist: "Diam's", year: 2006 },
          { title: 'Ouest Side', artist: 'Booba', year: 2006 },
        ],
        albums: [
          { title: 'Mauvais œil', artist: 'Lunatic', year: 2000 },
          { title: 'Temps mort', artist: 'Booba', year: 2002 },
          { title: 'Dans ma bulle', artist: "Diam's", year: 2006 },
          { title: 'Ouest Side', artist: 'Booba', year: 2006 },
        ],
      },
      {
        from: 2010,
        to: 2019,
        title: 'Streaming, Cloud & a New Sound',
        blurb:
          'Streaming changed French rap. Kaaris pushed hard trap, Nekfeu brought a more lyrical, emotional approach, and PNL built a massive following with atmospheric, melodic songs and cinematic visuals.',
        genres: ['french-rap', 'cloud', 'trap'],
        influence: 78,
        artists: [
          { name: 'PNL', note: 'Brothers from the Paris suburbs who made cinematic, melodic rap.' },
          { name: 'Nekfeu', note: 'Paris MC known for introspective, multi-layered writing.' },
          { name: 'Kaaris', note: 'Sevran rapper with a harsh trap style.' },
          { name: 'Booba', note: 'Stayed on top across three decades.' },
        ],
        songs: [
          { title: 'DA', artist: 'PNL', year: 2016 },
          { title: 'Naha', artist: 'PNL', year: 2016 },
          { title: 'Cyborg', artist: 'Nekfeu', year: 2016 },
        ],
        albums: [
          { title: 'Or noir', artist: 'Kaaris', year: 2013 },
          { title: 'Feu', artist: 'Nekfeu', year: 2015 },
          { title: 'Dans la légende', artist: 'PNL', year: 2016 },
          { title: 'Deux frères', artist: 'PNL', year: 2019 },
        ],
      },
      {
        from: 2020,
        to: 2026,
        title: 'French Drill & Global Streams',
        blurb:
          'Paris and its suburbs now produce a stream of chart-topping acts. French drill, trap and melodic rap dominate streaming, with artists like Ninho, Gazo and Tiakola reaching huge audiences across the French-speaking world.',
        genres: ['french-rap', 'drill', 'trap'],
        influence: 84,
        artists: [
          { name: 'Ninho', note: 'Essonne rapper with constant chart success.' },
          { name: 'Gazo', note: 'Paris voice associated with the French drill wave.' },
          { name: 'Tiakola', note: 'Melodic rap with Afro-influenced sounds.' },
          { name: 'Booba', note: 'Still one of the most influential figures in French rap.' },
        ],
        songs: [],
        albums: [],
      },
    ],
  },
]

// Distinct colours for the chart and city panels. The first five are the
// original RapMap cities; the rest are picked from a palette, then spread
// around the colour wheel.
const PALETTE = [
  '#e07a5f', '#9bd16b', '#4cc9c0', '#c9a0e8', '#f2a65a', '#e9759a', '#8fa8ff', '#d9d27a',
  '#6fd6a8', '#ffb4a2', '#5aa6e0', '#b5e07a', '#f0c978', '#d28fd9', '#7fd1d9', '#e8a0b4',
]
const colorFor = (i) => PALETTE[i % PALETTE.length]

export const CITIES = [
  ...BASE_CITIES,
  ...WORLD_CITIES.map((c, i) => ({ ...c, color: colorFor(i) })),
]

export const COUNTRIES = [...new Set(CITIES.map((c) => c.country))].sort((a, b) => a.localeCompare(b))
export const REGIONS = [...new Set(CITIES.map((c) => c.region))]

// Apple store used as a second try when a track is not in the US store.
export const STOREFRONT = {
  Canada: 'CA', Italy: 'IT', Spain: 'ES', Germany: 'DE', France: 'FR', UK: 'GB', Argentina: 'AR', Peru: 'PE',
  Brazil: 'BR', Chile: 'CL', Japan: 'JP', 'South Korea': 'KR', China: 'CN', Taiwan: 'TW', Thailand: 'TH',
  Singapore: 'SG', Vietnam: 'VN', India: 'IN', Bangladesh: 'BD', Kazakhstan: 'KZ', Lebanon: 'LB', UAE: 'AE',
  Turkey: 'TR', Egypt: 'EG', Morocco: 'MA', 'South Africa': 'ZA', Australia: 'AU', Fiji: 'FJ', Mexico: 'MX', Indonesia: 'ID', 'Dominican Republic': 'DO', Portugal: 'PT', Sweden: 'SE', Greece: 'GR', 'New Zealand': 'NZ', Colombia: 'CO', Ecuador: 'EC', 'Costa Rica': 'CR', Philippines: 'PH', 'Saudi Arabia': 'SA', Romania: 'RO', Bulgaria: 'BG', Ukraine: 'UA', "Côte d'Ivoire": 'CI',
}

// Names used by the map shapes (Natural Earth) for each country in RapMap.
export const GEO_NAME = {
  USA: 'United States of America',
  UK: 'United Kingdom',
  'South Korea': 'South Korea',
  UAE: 'United Arab Emirates',
  Russia: 'Russia',
  'Dominican Republic': 'Dominican Rep.',
}

export function getEra(city, year) {
  return city.eras.find((e) => year >= e.from && year <= e.to) || city.eras[city.eras.length - 1]
}

// Smooth influence score: interpolates between the middle of each era
// so pins grow and shrink gradually as you drag the year slider.
export function influenceAt(city, year) {
  const pts = city.eras.map((e) => ({ x: (e.from + e.to) / 2, v: e.influence }))
  if (year <= pts[0].x) return pts[0].v
  if (year >= pts[pts.length - 1].x) return pts[pts.length - 1].v
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    if (year >= a.x && year <= b.x) {
      const t = (year - a.x) / (b.x - a.x)
      return a.v + (b.v - a.v) * t
    }
  }
  return pts[pts.length - 1].v
}
