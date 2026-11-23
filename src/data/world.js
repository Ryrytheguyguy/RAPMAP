// ─────────────────────────────────────────────────────────────
// RapMap world data: 39 additional cities.
//
// Same rules as cities.js: every year from 1990 to 2026 must fall inside
// exactly one era of a city. `influence` (0-100) is an editorial estimate.
//
// Where a scene is based somewhere other than the capital (Rabat, Astana,
// Hanoi, Canberra, ...), the pin stands for that country's scene and the
// text says where the scene really lives. Cities marked with `note` are
// small profiles: they only list what could be confirmed.
//
// Format helpers keep each entry short:
//   artist: [name, note]
//   song / album: [title, artist, year, optionalSearchTerm]
//   The optional search term is used for audio lookup when the title is in
//   a non-Latin script.
// ─────────────────────────────────────────────────────────────

const E = (from, to, title, genres, influence, blurb, artists = [], songs = [], albums = []) => ({
  from,
  to,
  title,
  genres,
  influence,
  blurb,
  artists: artists.map(([name, note]) => ({ name, note })),
  songs: songs.map(([t, artist, year, q]) => ({ title: t, artist, year, q })),
  albums: albums.map(([t, artist, year, q]) => ({ title: t, artist, year, q })),
})

const C = (id, name, country, region, coords, tagline, eras, note) => ({
  id,
  name,
  country,
  region,
  coords,
  tagline,
  eras,
  note,
})

export const WORLD_CITIES = [
  // ───────────────────────── NORTH AMERICA ─────────────────────────
  C('toronto', 'Toronto', 'Canada', 'North America', [43.6532, -79.3832], 'The 6ix: from underdog scene to global rap capital.', [
    E(1990, 1999, "Canada's First Rap Pioneers", ['boom-bap'], 18,
      "Toronto's rap scene was small but proud. Maestro Fresh-Wes had made history just before the decade, and the Dream Warriors brought jazzy, playful rap to international audiences in the early 90s.",
      [
        ['Maestro Fresh-Wes', 'Toronto pioneer whose "Let Your Backbone Slide" became a milestone for Canadian rap.'],
        ['Dream Warriors', 'Toronto duo with jazzy samples and a playful style.'],
        ['Choclair', 'Toronto rapper who broke through at the end of the decade.'],
      ],
      [
        ['Let Your Backbone Slide', 'Maestro Fresh-Wes', 1989],
        ["My Definition of a Bombastic Jazz Style", 'Dream Warriors', 1991],
      ],
      [['And Now the Legacy Begins', 'Dream Warriors', 1991]]),
    E(2000, 2009, 'Building a Scene', ['alt', 'boom-bap'], 38,
      "Toronto artists mixed Caribbean, R&B and rap influences into their own sound. Kardinal Offishall and k-os found audiences abroad, and at the end of the decade a young actor named Drake started releasing mixtapes.",
      [
        ['Kardinal Offishall', 'Toronto veteran who took Toronto slang and Caribbean sounds to a wider audience.'],
        ['k-os', 'Genre-blending Toronto artist who mixed rap, rock and soul.'],
        ['Drake', 'Began with the 2009 mixtape So Far Gone.'],
      ],
      [
        ['Crabbuckit', 'k-os', 2004],
        ['Dangerous', 'Kardinal Offishall', 2008],
        ['Best I Ever Had', 'Drake', 2009],
      ],
      [['Joyful Rebellion', 'k-os', 2004]]),
    E(2010, 2019, 'The 6ix Takes Over', ['melodic', 'trap'], 92,
      "Drake turned Toronto into one of the most important cities in music. His mix of rapping and singing, moody production and constant hits shaped the sound of the decade, and a new generation of Toronto artists followed.",
      [
        ['Drake', 'Rapper and singer who became one of the biggest artists in the world.'],
        ['Nav', 'Toronto-area rapper and producer with a melodic trap style.'],
        ['Jazz Cartier', 'Toronto rapper with a moody, cinematic sound.'],
      ],
      [
        ['Started from the Bottom', 'Drake', 2013],
        ['Hotline Bling', 'Drake', 2015],
        ["God's Plan", 'Drake', 2018],
      ],
      [
        ['Take Care', 'Drake', 2011],
        ['Nothing Was the Same', 'Drake', 2013],
        ['Views', 'Drake', 2016],
      ]),
    E(2020, 2026, 'Global Home Base', ['melodic', 'trap'], 90,
      "Drake kept releasing chart-topping albums and collaborations, and Toronto remained one of the most visible cities in pop and rap.",
      [
        ['Drake', 'Continued to dominate streaming with long, genre-hopping albums.'],
        ['Nav', 'Kept releasing melodic trap albums.'],
      ],
      [
        ['Toosie Slide', 'Drake', 2020],
        ['Way 2 Sexy', 'Drake ft. Future & Young Thug', 2021],
      ],
      [
        ['Certified Lover Boy', 'Drake', 2021],
        ['For All the Dogs', 'Drake', 2023],
      ]),
  ]),

  C('dc', 'Washington DC', 'USA', 'North America', [38.9072, -77.0369], 'Go-go is the sound of the capital. Rap grew up beside it.', [
    E(1990, 1999, 'Go-Go Capital', ['go-go'], 14,
      "Before rap took over, DC had its own homegrown sound: go-go, a percussion-heavy funk style pioneered by Chuck Brown in the 1970s. Local bands like Rare Essence ruled the clubs and shaped how DC musicians ride a beat.",
      [
        ['Chuck Brown', 'The "Godfather of Go-Go".'],
        ['Rare Essence', 'DC go-go band that has played the city for decades.'],
        ['E.U.', 'Go-go group best known for "Da Butt".'],
      ],
      [
        ['Bustin\' Loose', 'Chuck Brown & The Soul Searchers', 1978],
        ['Da Butt', 'E.U.', 1988],
      ]),
    E(2000, 2009, 'The DMV Finds a Voice', ['go-go', 'conscious'], 26,
      "The DMV (DC, Maryland and Virginia) developed its own rap identity. Wale blended go-go rhythms with rap and reached a national audience at the end of the decade.",
      [
        ['Wale', 'DC rapper who worked go-go sounds into his music.'],
        ['Backyard Band', 'DC go-go band and a fixture of the local scene.'],
      ],
      [['Chillin', 'Wale ft. Lady Gaga', 2009]],
      [['Attention Deficit', 'Wale', 2009]]),
    E(2010, 2019, 'Ambition & the DMV Wave', ['melodic', 'alt', 'trap'], 42,
      "Wale signed to Maybach Music Group, Logic came out of nearby Maryland and Rico Nasty brought a punk-trap energy. In 2019 the \"Don't Mute DC\" protests showed how much go-go still meant to the city.",
      [
        ['Wale', 'Washington DC rapper with a long run on the charts.'],
        ['Logic', 'Maryland rapper from the DC area with a fast, lyrical style.'],
        ['Rico Nasty', 'Maryland rapper known for aggressive, punk-influenced trap.'],
      ],
      [
        ['Lotus Flower Bomb', 'Wale ft. Miguel', 2011],
        ['1-800-273-8255', 'Logic ft. Alessia Cara & Khalid', 2017],
      ],
      [
        ['Ambition', 'Wale', 2011],
        ['Under Pressure', 'Logic', 2014],
        ['Nasty', 'Rico Nasty', 2018],
      ]),
    E(2020, 2026, 'Go-Go Gets Its Flag', ['go-go', 'alt'], 36,
      "DC officially recognised go-go as its music, and the DMV kept producing artists with their own sound.",
      [
        ['Rico Nasty', 'Kept pushing a loud, genre-mixing sound.'],
        ['Wale', 'Continued to release albums.'],
      ],
      [],
      [
        ['Nightmare Vacation', 'Rico Nasty', 2020],
        ['Folarin II', 'Wale', 2021],
      ]),
  ]),

  // ───────────────────────── EUROPE ─────────────────────────
  C('rome', 'Rome', 'Italy', 'Europe', [41.9028, 12.4964], 'Rap from the posse years to Sanremo.', [
    E(1990, 1999, 'The Posse Years', ['boom-bap', 'conscious'], 20,
      "Italian rap grew out of the \"posse\" scene of social centres and student occupations. In Rome, crews like Assalti Frontali mixed political lyrics with hard beats, and Piotta turned rap into a summer hit.",
      [
        ['Assalti Frontali', 'Rome group with political, street-level lyrics.'],
        ['Colle der Fomento', 'Rome crew that became a pillar of Italian underground rap.'],
        ['Piotta', 'Rome rapper with the hit "Supercafone".'],
      ],
      [['Supercafone', 'Piotta', 1999]],
      [['Scienza Doppia H', 'Colle der Fomento', 1999]]),
    E(2000, 2009, 'Underground Rome', ['boom-bap'], 24,
      "Rome's underground produced dark, hard-hitting rap, with a strong crew culture around labels like Truceklan.",
      [
        ['Noyz Narcos', 'Rome rapper with a dark, gritty style, linked to Truceklan.'],
        ['Colle der Fomento', 'Stayed active as one of the city\'s most respected groups.'],
      ],
      [],
      [['Verano Zombie', 'Noyz Narcos', 2005]]),
    E(2010, 2019, 'Rome on the Charts', ['trap', 'melodic'], 52,
      "A new wave of Roman artists reached the charts. Coez and the duo Carl Brave and Franco126 mixed rap with pop melodies, Dark Polo Gang brought a flashy trap style, and Achille Lauro took the stage at Sanremo.",
      [
        ['Coez', 'Rome artist who blends rap and pop songwriting.'],
        ['Carl Brave', 'Rome rapper who teamed up with Franco126 for Polaroid.'],
        ['Franco126', 'Rome artist and producer, partner of Carl Brave.'],
        ['Dark Polo Gang', 'Rome trap crew known for a flashy style.'],
        ['Achille Lauro', 'Rome artist who mixed trap with theatrical pop.'],
      ],
      [
        ['Faccio un casino', 'Coez', 2017],
        ['Rolls Royce', 'Achille Lauro', 2019],
      ],
      [
        ['Faccio un casino', 'Coez', 2017],
        ['Polaroid', 'Carl Brave x Franco126', 2017],
      ]),
    E(2020, 2026, 'Trap Goes Pop', ['trap'], 56,
      "Trap and rap became part of Italy's pop mainstream, with Rome sharing the spotlight with Milan and Naples.",
      [
        ['Achille Lauro', 'Returned to Sanremo several times with theatrical performances.'],
        ['Coez', 'Kept releasing hit albums.'],
      ],
      [['Me ne frego', 'Achille Lauro', 2020]]),
  ]),

  C('madrid', 'Madrid', 'Spain', 'Europe', [40.4168, -3.7038], "Spain's rap industry hub, and the home of its biggest pop-trap crossover.", [
    E(1990, 2009, "Spain's Rap Industry Hub", ['latin', 'boom-bap'], 22,
      "Spanish rap grew across the country, with Madrid acting as the centre of the music industry and the media. Many of the scene's biggest names came from other cities, and are listed here with their hometown.",
      [
        ['SFDK', 'Seville duo, one of Spanish rap\'s most loved groups.'],
        ['Violadores del Verso', 'Zaragoza group known for dense, poetic writing.'],
        ['Mala Rodríguez', 'Seville rapper who became one of the best-known female voices in Spanish rap.'],
      ],
      [],
      [
        ['Vivir para contarlo', 'Violadores del Verso', 2000],
        ['Lujo Ibérico', 'La Mala Rodríguez', 2000],
      ]),
    E(2010, 2019, 'Madrid Trap', ['trap', 'latin'], 50,
      "Trap landed in Madrid in the mid-2010s. Yung Beef and the crews around him built a local scene, and C. Tangana started to move from street rap toward pop.",
      [
        ['Yung Beef', 'Madrid trap figure who helped build the local scene.'],
        ['C. Tangana', 'Madrid rapper and songwriter who became Spain\'s biggest crossover act.'],
      ],
      [],
      [
        ['Ídolo', 'C. Tangana', 2017],
        ['Avida Dollars', 'C. Tangana', 2018],
      ]),
    E(2020, 2026, 'The Madrileño Effect', ['latin', 'melodic'], 62,
      "C. Tangana's El Madrileño mixed rap, flamenco and rumba and won over audiences in Spain and Latin America. Madrid-born Quevedo joined Bizarrap for a hit that was heard around the world.",
      [
        ['C. Tangana', 'His 2021 album became a landmark for Spanish pop.'],
        ['Quevedo', 'Born in Madrid and raised in the Canary Islands.'],
      ],
      [
        ['Tú Me Dejaste de Querer', 'C. Tangana, Niño de Elche & La Húngara', 2021],
        ['Demasiadas Mujeres', 'C. Tangana', 2021],
        ['Bzrp Music Sessions, Vol. 52', 'Bizarrap & Quevedo', 2022],
      ],
      [['El Madrileño', 'C. Tangana', 2021]]),
  ]),

  C('berlin', 'Berlin', 'Germany', 'Europe', [52.52, 13.405], 'Street rap, labels and chart-toppers from the capital.', [
    E(1990, 1999, 'After the Wall', ['german-rap'], 18,
      "After reunification, Berlin's youth culture exploded with clubs, squats and the first German-language rap crews. The city's battle scene was starting to form.",
      [['Kool Savas', 'Berlin MC who began building his reputation in the late 90s.']]),
    E(2000, 2009, 'Aggro Berlin & Street Rap', ['german-rap'], 62,
      "Berlin became the centre of German street rap. The label Aggro Berlin launched Sido and Fler with a hard, provocative style, while Bushido and Kool Savas filled the charts and the battle circuit.",
      [
        ['Sido', 'Berlin rapper who first appeared in a mask and became a major star.'],
        ['Bushido', 'Berlin rapper with a series of chart albums.'],
        ['Fler', 'Berlin rapper who came up through Aggro Berlin.'],
        ['Kool Savas', 'Berlin MC with a reputation as a technical battle rapper.'],
      ],
      [['Mein Block', 'Sido', 2004]],
      [
        ['Maske', 'Sido', 2004],
        ['Vom Bordstein bis zur Skyline', 'Bushido', 2003],
        ['Neue Deutsche Welle', 'Fler', 2005],
      ]),
    E(2010, 2026, 'Berlin Rules the Charts', ['german-rap', 'trap'], 68,
      "A new generation of Berlin rappers dominated German streaming. Capital Bra and Samra scored a long run of number ones and made trap the sound of the capital.",
      [
        ['Capital Bra', 'Berlin rapper with many number-one singles in Germany.'],
        ['Samra', 'Berlin rapper and Capital Bra\'s frequent partner.'],
      ],
      [],
      [['Berlin lebt', 'Capital Bra & Samra', 2018]]),
  ]),

  // ───────────────────────── LATIN AMERICA ─────────────────────────
  C('buenos-aires', 'Buenos Aires', 'Argentina', 'Latin America', [-34.6037, -58.3816], 'Freestyle plazas to the biggest trap sessions in Latin America.', [
    E(1990, 1999, 'Rap Meets Rock', ['latin', 'alt'], 20,
      "In the 90s, hip-hop in Buenos Aires mixed with funk, rock and pop. Illya Kuryaki and the Valderramas made rap-flavoured pop that was loved across Latin America.",
      [['Illya Kuryaki and the Valderramas', 'Buenos Aires duo who blended rap, funk and pop.']],
      [['Abarajame', 'Illya Kuryaki and the Valderramas', 1995]],
      [
        ['Chaco', 'Illya Kuryaki and the Valderramas', 1995],
        ['Kryptonita', 'Illya Kuryaki and the Valderramas', 1997],
      ]),
    E(2000, 2014, 'Freestyle in the Plazas', ['latin'], 22,
      "Freestyle battles in Buenos Aires parks and plazas became the heart of the scene. A whole generation learned to rap by improvising in front of a circle of friends, which set up the next wave."),
    E(2015, 2026, 'Argentine Trap Takes Off', ['trap', 'latin'], 82,
      "Freestyle talents moved into trap and Argentina became one of the most important sources of Spanish-language rap. Duki and Trueno became stars, and producer Bizarrap turned his online sessions into global hits.",
      [
        ['Duki', 'Buenos Aires trap star who came up through freestyle battles.'],
        ['Trueno', 'Buenos Aires rapper with a mix of rap, funk and Latin rhythms.'],
        ['Bizarrap', 'Buenos Aires producer behind the Bzrp Music Sessions.'],
        ['Wos', 'Buenos Aires rapper and freestyle champion.'],
      ],
      [
        ['Goteo', 'Duki', 2018],
        ['Bzrp Music Sessions, Vol. 52', 'Bizarrap & Quevedo', 2022],
        ['Shakira: Bzrp Music Sessions, Vol. 53', 'Bizarrap & Shakira', 2023],
      ],
      [['Súper Sangre Joven', 'Duki', 2019]]),
  ]),

  C('lima', 'Lima', 'Peru', 'Latin America', [-12.0464, -77.0428], "From Quechua verses to the Pacific coast's rap battles.", [
    E(1990, 1999, 'Cassettes & Break Crews', ['latin'], 6,
      "Hip-hop reached Peru through films, TV and cassettes. Break-dance crews formed in several cities in the early 90s, and in Lima the first hip-hop concerts and shops, such as the label TPM Records, appeared in the second half of the decade.",
      [
        ['Max del Solar', 'Lima b-boy credited with some of the first hip-hop concerts in the city.'],
        ['Coche Bomba', 'Runs TPM Records in Lima and has been a promoter and judge on the battle circuit.'],
      ]),
    E(2000, 2014, 'Battles & Websites', ['latin'], 10,
      "Rap spread through internet cafés, websites and freestyle battles. One of the best-known rappers with Peruvian roots, Immortal Technique, was born in Lima and made his name in New York.",
      [['Immortal Technique', 'Born in Lima, raised in Harlem. Known for political, hard-hitting rap.']],
      [['Dance with the Devil', 'Immortal Technique', 2001]],
      [['Revolutionary Vol. 2', 'Immortal Technique', 2003]]),
    E(2015, 2026, 'Streaming Voices', ['latin', 'trap'], 18,
      "A new generation of Peruvian rappers built audiences online and in Spanish-language battle events.",
      [
        ['Renata Flores', 'Singer and rapper known for Quechua-language songs.'],
        ['Faraón Love Shady', 'Peruvian rapper often named in rankings of the country\'s top rappers.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('rio', 'Rio de Janeiro', 'Brazil', 'Latin America', [-22.9068, -43.1729], "Samba, funk and hip-hop on the beach and in the favelas.", [
    E(1990, 1999, 'Funk, Samples & Planet Hemp', ['latin', 'boom-bap'], 28,
      "In Rio, rap mixed with funk carioca, samba and rock. Planet Hemp and its singer Marcelo D2 took hip-hop attitude into the Brazilian mainstream, and MV Bill told stories from the Cidade de Deus.",
      [
        ['Planet Hemp', 'Rio band that blended rap, rock and funk.'],
        ['Marcelo D2', 'Rio rapper who later combined hip-hop and samba.'],
        ['MV Bill', 'Rapper from the Cidade de Deus favela, known for social commentary.'],
      ],
      [['Legalize Já', 'Planet Hemp', 1995]],
      [
        ['Usuário', 'Planet Hemp', 1995],
        ['Traficando Informação', 'MV Bill', 1999],
      ]),
    E(2000, 2009, 'Samba Meets Boom Bap', ['latin', 'boom-bap'], 34,
      "Marcelo D2 built his solo career on the meeting of samba and sampled beats, while Black Alien from Niterói became a cult figure with quick, intricate flows.",
      [
        ['Marcelo D2', 'Rio rapper who fused samba and hip-hop.'],
        ['Black Alien', 'Rapper from the Rio area known for fast, complex rhymes.'],
      ],
      [],
      [
        ['A Procura da Batida Perfeita', 'Marcelo D2', 2003],
        ['Babylon by Gus Vol. 1: O Ano do Macaco', 'Black Alien', 2004],
      ]),
    E(2010, 2026, "Rio's Trap Generation", ['trap', 'latin'], 40,
      "A new generation of Rio rappers moved from boom bap toward trap and more personal lyrics.",
      [['BK\'', 'Rio rapper known for reflective, introspective writing.']],
      [],
      [['Castelos & Ruínas', "BK'", 2016]]),
  ], 'Brazil\'s biggest rap names (Racionais MC\'s, Emicida) are from São Paulo. This profile covers Rio.'),

  C('santiago', 'Santiago', 'Chile', 'Latin America', [-33.4489, -70.6693], 'Chilean rap from the barrios to the world.', [
    E(1990, 2009, 'From Crews to Cult Status', ['latin', 'boom-bap'], 28,
      "Santiago's rap scene grew through neighbourhood crews and became a serious national movement in the late 90s. Tiro de Gracia and Makiza were among the best-known groups.",
      [
        ['Tiro de Gracia', 'Santiago group, one of the best-known Chilean rap acts of the 90s.'],
        ['Makiza', 'Santiago group that included Ana Tijoux.'],
      ],
      [],
      [
        ['Ser Humano!', 'Tiro de Gracia', 1997],
        ['Aerolíneas Makiza', 'Makiza', 1998],
      ]),
    E(2010, 2026, 'Chilean Trap & Global Voices', ['latin', 'trap', 'conscious'], 42,
      "Ana Tijoux launched a solo career with a worldwide audience and political songs, while a new wave of Santiago trap artists turned Chile into a force in Spanish-language streaming.",
      [
        ['Ana Tijoux', 'Former Makiza member with a successful solo career.'],
        ['Pablo Chill-E', 'Santiago-area trap artist who helped drive Chilean trap.'],
      ],
      [['1977', 'Ana Tijoux', 2010]],
      [['1977', 'Ana Tijoux', 2010]]),
  ]),

  // ───────────────────────── EAST ASIA ─────────────────────────
  C('tokyo', 'Tokyo', 'Japan', 'East Asia', [35.6762, 139.6503], 'From Shibuya clubs to anime soundtracks and viral hits.', [
    E(1990, 1999, 'Nihon Hip-Hop Is Born', ['j-hip-hop'], 28,
      "Japanese rap found its feet in Tokyo clubs and on independent labels. Groups such as Rhymester and Scha Dara Parr proved rap could be done in Japanese and reach a wide audience.",
      [
        ['Rhymester', 'Tokyo group formed in 1989 and a pillar of Japanese rap.'],
        ['Scha Dara Parr', 'Tokyo trio who brought playful rap to the pop charts.'],
      ]),
    E(2000, 2009, 'Nujabes & the Anime Era', ['j-hip-hop', 'boom-bap'], 42,
      "Tokyo's producers found a global audience. Nujabes made jazzy, mellow hip-hop beats that were heard around the world, partly thanks to the anime series Samurai Champloo.",
      [
        ['Nujabes', 'Tokyo producer whose jazzy hip-hop made him a cult hero abroad.'],
        ['Shing02', 'Rapper who collaborated with Nujabes on the Luv(sic) series.'],
      ],
      [
        ['Aruarian Dance', 'Nujabes', 2004],
        ['Luv(sic) Pt.2', 'Nujabes ft. Shing02', 2004],
      ],
      [['Metaphorical Music', 'Nujabes', 2003]]),
    E(2010, 2019, 'Trap Arrives in Japan', ['j-hip-hop', 'trap'], 48,
      "Trap and TV battle shows made Japanese rap younger and louder. KOHH became an international name with a raw, minimal style.",
      [
        ['KOHH', 'Tokyo rapper with a minimal, emotional trap style.'],
        ['Rhymester', 'Veteran group still active and respected.'],
      ],
      [],
      [['DIRT', 'KOHH', 2014]]),
    E(2020, 2026, 'Viral Hits & New Stars', ['j-hip-hop', 'trap'], 56,
      "Japanese rap crossed into the pop mainstream. Creepy Nuts had a worldwide viral hit, and Awich from Okinawa became one of the most visible female rappers in the country.",
      [
        ['Creepy Nuts', 'Tokyo duo of rapper R-指定 and DJ Matsunaga.'],
        ['Awich', 'Rapper from Okinawa who rose to national fame.'],
      ],
      [['Bling-Bang-Bang-Born', 'Creepy Nuts', 2024]],
      [['Queendom', 'Awich', 2022]]),
  ]),

  C('seoul', 'Seoul', 'South Korea', 'East Asia', [37.5665, 126.978], 'Where hip-hop became K-pop\'s secret ingredient.', [
    E(1990, 1999, 'Seo Taiji Opens the Door', ['k-hip-hop'], 30,
      "In 1992, Seo Taiji and Boys mixed rap, dance and rock on \"Nan Arayo\" and changed Korean pop. At the end of the decade, Drunken Tiger debuted in 1999 and became a founding name of Korean hip-hop.",
      [
        ['Seo Taiji and Boys', 'Group that brought rap into Korean pop.'],
        ['Drunken Tiger', 'Group led by Tiger JK, a founding name in Korean hip-hop.'],
      ],
      [['Nan Arayo', 'Seo Taiji and Boys', 1992, 'Seo Taiji and Boys Nan Arayo']],
      [['Year of the Tiger', 'Drunken Tiger', 1999]]),
    E(2000, 2009, 'Underground to Mainstream', ['k-hip-hop'], 42,
      "Groups like Epik High brought thoughtful, melodic hip-hop to a wide audience, while a close-knit underground scene stayed active in Seoul's Hongdae district.",
      [
        ['Epik High', 'Seoul trio known for cinematic, lyrical hip-hop.'],
        ['Drunken Tiger', 'Kept releasing albums and mentoring younger artists.'],
      ],
      [],
      [['Map the Soul', 'Epik High', 2003]]),
    E(2010, 2019, 'Show Me the Money', ['k-hip-hop', 'trap'], 72,
      "The TV competition Show Me the Money launched in 2012 and made rap hugely popular. Trap, melodic rap and viral hits followed, and Keith Ape's \"It G Ma\" travelled worldwide.",
      [
        ['Epik High', 'Veterans who stayed at the top.'],
        ['Beenzino', 'Seoul rapper with a smooth, stylish approach.'],
        ['Keith Ape', 'Seoul rapper whose "It G Ma" went viral internationally.'],
      ],
      [
        ['All I Wanna Do', 'Jay Park', 2012],
        ['It G Ma', 'Keith Ape', 2015],
      ],
      [['Up All Night', 'Beenzino', 2012]]),
    E(2020, 2026, 'Hip-Hop Meets K-Pop', ['k-hip-hop', 'melodic'], 80,
      "Rap sits at the core of K-pop, and the line between idols and rappers has blurred. Zico had a viral hit, and Suga of BTS released solo rap projects as Agust D.",
      [
        ['Zico', 'Seoul rapper and producer with a viral global hit.'],
        ['Agust D', 'Solo rap project of BTS member Suga.'],
      ],
      [
        ['Any Song', 'Zico', 2020],
        ['Daechwita', 'Agust D', 2020],
      ],
      [['D-2', 'Agust D', 2020]]),
  ]),

  C('beijing', 'Beijing', 'China', 'East Asia', [39.9042, 116.4074], "China's media capital, and the stage for the rap boom.", [
    E(1990, 2009, 'Underground Roots', ['c-hip-hop'], 8,
      "Rap reached China through imported tapes and the rock scene of Beijing. The underground grew slowly, with small crews, local battles and independent releases.",
      []),
    E(2010, 2016, 'The Online Scene', ['c-hip-hop'], 22,
      "Rap crews found audiences on Chinese streaming sites and social media, especially outside Beijing. Chengdu, Chongqing and other cities became hotspots.",
      []),
    E(2017, 2026, 'The Rap of China Effect', ['c-hip-hop', 'trap'], 55,
      "The TV show The Rap of China, launched in 2017, brought rap to hundreds of millions of viewers. Chengdu group Higher Brothers toured the US and Europe after signing with 88rising.",
      [['Higher Brothers', 'Chengdu group that became the best-known Chinese rap act abroad.']],
      [['Made in China', 'Higher Brothers', 2018]],
      [['Five Stars', 'Higher Brothers', 2019]]),
  ], 'Chinese rap is centred on Chengdu and Chongqing as much as Beijing. This profile covers the national scene.'),

  C('taipei', 'Taipei', 'Taiwan', 'East Asia', [25.033, 121.5654], 'Mandopop, Hoklo rap and an independent scene.', [
    E(1990, 2009, 'Mandarin Rap Arrives', ['c-hip-hop'], 14,
      "Rap entered Taiwanese pop in the 1990s. MC HotDog is widely described as the father of Taiwanese hip-hop, and Jay Chou's rap-flavoured pop made hip-hop rhythms part of Chinese-language pop.",
      [
        ['MC HotDog', 'Often called the father of Taiwanese hip-hop.'],
        ['Jay Chou', 'Taiwanese pop star who mixed rap, R&B and Chinese influences.'],
      ],
      [['Shuang Jie Gun', 'Jay Chou', 2001, '雙截棍 周杰倫']]),
    E(2010, 2026, 'The Independent Wave', ['c-hip-hop', 'trap'], 22,
      "A newer generation, including Dwagie, rapped in Mandarin and Taiwanese Hokkien, and used rap to talk about identity and politics.",
      [['Dwagie', 'Taiwanese rapper from the 2010s wave.']]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  // ───────────────────────── SOUTHEAST ASIA ─────────────────────────
  C('bangkok', 'Bangkok', 'Thailand', 'Southeast Asia', [13.7563, 100.5018], 'Thai rap went from pop novelty to political voice.', [
    E(1990, 2004, 'The First Wave', ['sea'], 14,
      "Thai rap first reached the mainstream through pop-rap hits in the 90s, with Joey Boy as one of the best-known early names.",
      [['Joey Boy', 'Thai rapper and one of the early names in Thai rap.']]),
    E(2005, 2016, 'Thaitanium & the Underground', ['sea'], 24,
      "Bangkok's rap scene broadened with groups like Thaitanium, and independent artists began to use the internet to find fans.",
      [['Thaitanium', 'Bangkok hip-hop group active since the 2000s.']]),
    E(2017, 2026, 'Rap Is Now', ['sea', 'trap'], 52,
      "TV rap competitions turned Thai rap into the country's biggest youth sound. Rap Against Dictatorship released a protest song that went viral in 2018, and Milli performed at Coachella in 2022.",
      [
        ['Rap Against Dictatorship', 'Thai collective known for political rap.'],
        ['Milli', 'Bangkok rapper who performed at Coachella.'],
      ],
      [['Prathet Ku Mee', 'Rap Against Dictatorship', 2018]]),
  ]),

  C('singapore', 'Singapore', 'Singapore', 'Southeast Asia', [1.3521, 103.8198], 'A small city-state with a hungry rap scene.', [
    E(1990, 2009, 'Small but Hungry', ['sea'], 5,
      "Hip-hop in Singapore was a small underground world of dancers, DJs and rappers."),
    E(2010, 2026, 'The Streaming Era', ['sea', 'trap'], 20,
      "Online platforms helped Singapore rappers find audiences at home and abroad. Yung Raja and Shigga Shay are among the best-known names.",
      [
        ['Yung Raja', 'Singaporean rapper who built a following online.'],
        ['Shigga Shay', 'Singaporean rapper and one of the scene\'s visible names.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('hanoi', 'Hanoi', 'Vietnam', 'Southeast Asia', [21.0285, 105.8542], "Vietnam's first hip-hop club opened here.", [
    E(1990, 1999, 'Big Toe & the First Club', ['sea'], 8,
      "Hanoi's Big Toe formed in 1992, as the first hip-hop club opened at the Vietnam-Soviet Cultural Friendship Palace. Viet Max, born in Hanoi, helped organise the early scene.",
      [['Viet Max', 'Hanoi-born dancer and organiser of early hip-hop events.']]),
    E(2000, 2009, 'The First Recordings', ['sea'], 16,
      "In 2004, Viet Max organised the country's first big collaborative hip-hop event in Hanoi, and in 2005 early Vietnamese rap recordings such as \"Rap Club is My Club\" appeared.",
      [['Wowy', 'Saigon-based rapper who began making music in 2005.']]),
    E(2010, 2026, 'Rap Goes Mainstream', ['sea', 'trap'], 34,
      "Wowy and Karik's \"Khu Tao Sống\" made rap famous in Vietnam in 2010, Suboi performed for President Obama in 2016, and TV rap shows brought the sound to everyone.",
      [
        ['Wowy', 'Saigon-based rapper with a large fan base.'],
        ['Suboi', 'Rapper born in Saigon, often called the queen of Vietnamese rap.'],
      ],
      [['Khu Tao Sống', 'Wowy ft. Karik', 2010]]),
  ], "Most of Vietnam's best-known rappers are based in Saigon (Ho Chi Minh City). Hanoi is where the first club formed."),

  // ───────────────────────── SOUTH ASIA ─────────────────────────
  C('delhi', 'New Delhi', 'India', 'South Asia', [28.6139, 77.209], 'Punjabi swagger, gully rap and a booming underground.', [
    E(1990, 2009, 'Before Desi Hip-Hop', ['desi'], 8,
      "Indian rap began with pop novelty hits. Baba Sehgal is often described as India's first rapper.",
      [['Baba Sehgal', 'Early Indian pop-rapper.']],
      [['Thanda Thanda Pani', 'Baba Sehgal', 1992]]),
    E(2010, 2017, 'The Honey Singh Era', ['desi'], 40,
      "Punjabi-Hindi pop-rap took over Indian clubs and Bollywood. Yo Yo Honey Singh was the face of the sound, and Badshah followed with his own hits.",
      [
        ['Yo Yo Honey Singh', 'Rapper who made Punjabi-Hindi rap a Bollywood staple.'],
        ['Badshah', 'Delhi rapper and a pop-rap hitmaker.'],
      ],
      [
        ['Brown Rang', 'Yo Yo Honey Singh', 2011],
        ['Blue Eyes', 'Yo Yo Honey Singh', 2013],
        ['DJ Waley Babu', 'Badshah', 2015],
      ]),
    E(2018, 2026, 'Gully Rap & the Underground', ['desi', 'alt'], 58,
      "The 2019 film Gully Boy, based on Mumbai's street rap, put Indian hip-hop in front of a huge audience. In Delhi, Prabh Deep and Seedhe Maut led a new, lyric-driven underground.",
      [
        ['Prabh Deep', 'Delhi rapper with a reflective, atmospheric style.'],
        ['Seedhe Maut', 'Delhi duo with fast, technical rap.'],
      ],
      [],
      [
        ['Class-Sikh', 'Prabh Deep', 2018],
        ['Bayaan', 'Seedhe Maut', 2019],
      ]),
  ]),

  C('dhaka', 'Dhaka', 'Bangladesh', 'South Asia', [23.8103, 90.4125], 'From the first Bengali rap album to street-crew anthems.', [
    E(1990, 2005, 'The First Bengali Rap', ['desi'], 6,
      "In 1993, Ashraf Babu and Charu released Tri-Rotner Khepa, the first Bengali rap album.",
      [['Ashraf Babu', 'Released the first Bengali rap album with Charu in 1993.']],
      [],
      [['Tri-Rotner Khepa', 'Ashraf Babu & Charu', 1993]]),
    E(2006, 2018, 'Dhaka Crews', ['desi'], 18,
      "Dhaka crews like Deshi MCs, Uptown Lokolz and T.O.R built a rap scene online and at street gigs. Jalali Set's \"Sura Target\" went viral in 2015, and their album Level 13 followed in 2016.",
      [
        ['Deshi MCs', 'Dhaka crew behind the hit "Genjam".'],
        ['Uptown Lokolz', 'Dhaka crew formed in 2008.'],
        ['Jalali Set', 'Dhaka street crew with a hit debut album.'],
      ],
      [
        ['Genjam', 'Deshi MCs', 2006],
        ['Sura Target', 'Jalali Set', 2015],
      ],
      [['Level 13', 'Jalali Set', 2016]]),
    E(2019, 2026, 'Viral Voices', ['desi'], 30,
      "Rap songs about corruption and everyday life went viral on YouTube. G-Series reached number one on the Bangladeshi YouTube trending tab in 2019.",
      [['G-Series', 'Rapper whose protest-flavoured songs trended in Bangladesh.']],
      [['Maaf Koira Den Bhai', 'G-Series', 2019]]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  // ───────────────────────── CENTRAL ASIA ─────────────────────────
  C('tashkent', 'Tashkent', 'Uzbekistan', 'Central Asia', [41.2995, 69.2401], "Uzbek rap, after independence and on the internet.", [
    E(1990, 2009, 'After Independence', ['central-asian'], 4,
      "After Uzbekistan became independent in 1991, foreign rap reached the country through cassettes and satellite TV. Local rap stayed a small underground."),
    E(2010, 2026, 'The Online Scene', ['central-asian'], 14,
      "Uzbek rappers use social media and streaming to reach fans. Artists such as Shaxriyor, Massa and Konsta are among those listed in Uzbek hip-hop directories.",
      [
        ['Shaxriyor', 'Uzbek artist listed among the country\'s hip-hop acts.'],
        ['Massa', 'Uzbek artist listed among the country\'s hip-hop acts.'],
        ['Konsta', 'Uzbek artist listed among the country\'s hip-hop acts.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('astana', 'Astana', 'Kazakhstan', 'Central Asia', [51.1694, 71.4491], "Rap in Kazakh and Russian, from Almaty to Shymkent.", [
    E(1990, 2007, 'Rap After Independence', ['central-asian'], 5,
      "Kazakhstan became independent in 1991, and rap slowly appeared in cities such as Almaty. Kicha began making rap in the early 2000s.",
      [['Kicha', 'Early Kazakh rapper, a member of Black Cost.']]),
    E(2008, 2014, 'Black Cost', ['central-asian'], 12,
      "Black Cost is described as one of the first rap groups in the country. Their 2008 video \"Like a Flower Through Stone\" documented the early scene.",
      [['Black Cost', 'One of the first Kazakh rap groups.']]),
    E(2015, 2026, 'Streaming Stars', ['central-asian', 'trap'], 30,
      "Ninety One formed in Almaty in 2015 and helped create Q-pop, and rappers such as Skriptonite, Shiza and Irina Kairatovna found huge audiences in Russian and Kazakh.",
      [
        ['Skriptonite', 'One of Kazakhstan\'s biggest names; raps in Russian.'],
        ['Ninety One', 'Almaty group that pioneered Q-pop, with rapper Zaq.'],
        ['Shiza', 'Rapper from Shymkent.'],
        ['Irina Kairatovna', 'Rapper who began in 2017.'],
      ]),
  ], 'Kazakh rap is centred on Almaty rather than Astana. This profile covers the national scene.'),

  C('bishkek', 'Bishkek', 'Kyrgyzstan', 'Central Asia', [42.8746, 74.5698], 'Political rap and freestyle battles in Kyrgyz.', [
    E(1990, 2007, 'Imported Beats', ['central-asian'], 5,
      "After Kyrgyzstan became independent in 1991, hip-hop arrived through cassettes and, later, the internet."),
    E(2008, 2026, 'Patriot & the Freestyle League', ['central-asian'], 12,
      "L'zeep wrote the political song \"Patriot\" in 2008, which spread after the 2010 uprising. In 2012, Bishkek held its first Freestyle League, and rappers such as Willi and K.A. (who raps in Kyrgyz) emerged.",
      [
        ["L'zeep", 'Bishkek rapper who wrote the political song "Patriot".'],
        ['K.A.', 'A double-time specialist who raps in Kyrgyz.'],
        ['Ulukmanapo', 'Kyrgyz rapper who collaborated with Kazakhstan\'s Shiza.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  // ───────────────────────── MIDDLE EAST ─────────────────────────
  C('beirut', 'Beirut', 'Lebanon', 'Middle East', [33.8938, 35.5018], 'Arabic rap with a political edge.', [
    E(1990, 2009, 'After the War', ['arabic'], 8,
      "Lebanon's civil war ended in 1990, and a small Arabic rap scene grew in Beirut in the following years. Fareeq El Atrache became one of its best-known groups.",
      [
        ['Fareeq El Atrache', 'Beirut group from the early Arabic rap scene.'],
        ['Rayess Bek', 'Lebanese rapper known for politically conscious Arabic rap.'],
      ]),
    E(2010, 2026, 'The Protest Soundtrack', ['arabic', 'trap'], 20,
      "Beirut rappers used Arabic rap to describe politics, economic crisis and daily life, and rap became part of the soundtrack of Lebanon's 2019 protests.",
      [['Rayess Bek', 'Continued to release politically conscious Arabic rap.']]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('abu-dhabi', 'Abu Dhabi', 'UAE', 'Middle East', [24.4539, 54.3773], 'Gulf rap, at festivals, in studios and online.', [
    E(1990, 2009, 'Satellite & Cassettes', ['arabic'], 4,
      "Hip-hop reached the Gulf through satellite TV, cassettes and the expat community. The local scene stayed small and was centred on clubs in Abu Dhabi and Dubai."),
    E(2010, 2026, 'Emirati Voices', ['arabic', 'trap'], 12,
      "A generation of Emirati rappers started to rap in Arabic and English about identity and local culture, using social media and streaming platforms. Names such as KMulti, Ghost and Bunny J appear in UAE coverage.",
      [
        ['KMulti', 'Emirati rapper.'],
        ['Ghost', 'Emirati rapper.'],
        ['Bunny J', 'Emirati rapper based in the UAE.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('ankara', 'Ankara', 'Turkey', 'Middle East', [39.9334, 32.8597], 'Turkish rap, from German-Turkish roots to chart domination.', [
    E(1990, 2009, 'From Berlin to Istanbul', ['turkish'], 12,
      "Turkish rap started in Germany's Turkish community and found a huge audience at home in the mid-90s. Cartel's 1995 album was a landmark, and Ceza became a star in the early 2000s.",
      [
        ['Cartel', 'Turkish-German group whose 1995 album sparked a boom in Turkish rap.'],
        ['Ceza', 'Istanbul rapper who became a major star.'],
      ],
      [],
      [
        ['Cartel', 'Cartel', 1995],
        ['Med Cezir', 'Ceza', 2002],
      ]),
    E(2010, 2026, 'Rap Becomes the New Pop', ['turkish', 'trap'], 38,
      "Turkish rap became one of the most-streamed styles in the country. Ankara-born Ezhel was among the biggest names of the trap generation.",
      [['Ezhel', 'Ankara-born rapper with a hugely popular trap sound.']],
      [],
      [['Müptezhel', 'Ezhel', 2017]]),
  ], "Turkish rap is centred on Istanbul. This profile follows the national scene, with Ankara-born Ezhel as its anchor."),

  // ───────────────────────── AFRICA ─────────────────────────
  C('cairo', 'Cairo', 'Egypt', 'Africa', [30.0444, 31.2357], 'Revolution, mahraganat and Egyptian trap.', [
    E(1990, 2009, 'Underground Beginnings', ['arabic'], 12,
      "Egyptian hip-hop developed in Cairo's underground, with a handful of groups rapping in Arabic and English.",
      []),
    E(2010, 2026, 'Revolution, Mahraganat & Trap', ['arabic', 'trap'], 38,
      "The 2011 revolution pushed Cairo rappers like Arabian Knightz to the front, and the electronic street sound mahraganat emerged from working-class neighbourhoods. By the late 2010s, Egyptian trap artists were building huge audiences.",
      [
        ['Arabian Knightz', 'Cairo group known for revolutionary rap.'],
        ['Marwan Pablo', 'Cairo artist who helped drive Egyptian trap.'],
        ['Abyusif', 'Cairo trap artist.'],
      ],
      [['Rebel', 'Arabian Knightz ft. Lauryn Hill', 2011]]),
  ]),

  C('rabat', 'Rabat', 'Morocco', 'Africa', [34.0209, -6.8416], 'Moroccan rap: from the first albums to Darija trap.', [
    E(1990, 1999, 'The First Albums', ['arabic'], 12,
      "Moroccan youth in Europe brought hip-hop home in the mid-90s. In 1996, Double A from Salé, next to Rabat, released what is called the first official Moroccan rap album, and H-Kayne formed in Meknes.",
      [
        ['Double A', 'Rappers from Salé, next to Rabat, among the first on Moroccan TV.'],
        ['H-Kayne', 'Meknes group formed in 1996.'],
      ]),
    E(2000, 2009, 'The Scene Spreads', ['arabic', 'boom-bap'], 22,
      "Crews formed in Tangier and Casablanca, festivals such as Boulevard gave the scene a stage, and Don Bigg released Mgharba Tal Moute in 2006.",
      [['Don Bigg', 'Moroccan rapper whose career began in the late 1990s.']],
      [],
      [['Mgharba Tal Moute', 'Don Bigg', 2006]]),
    E(2010, 2026, 'Darija Goes Global', ['arabic', 'trap'], 36,
      "Rappers who sing and rap in Moroccan Arabic (Darija) built large audiences online. Dizzy DROS, ElGrandeToto and Shayfeen became leading names, and Dizzy DROS won an AFRIMA award in 2021.",
      [
        ['Dizzy DROS', 'Moroccan rapper with a large online following.'],
        ['ElGrandeToto', 'Moroccan trap artist.'],
        ['Shayfeen', 'Moroccan rap group from Safi.'],
      ],
      [],
      [
        ['Caméléon', 'ElGrandeToto', 2021],
        ['Solaris', 'Pause', 2019],
      ]),
  ], "Morocco's rap scene is spread across Casablanca, Tangier, Meknes and Safi. This profile covers the national scene."),

  C('cape-town', 'Cape Town', 'South Africa', 'Africa', [-33.9249, 18.4241], 'Anti-apartheid roots, Afrikaans rap and zef.', [
    E(1990, 1999, 'Rap Against Apartheid', ['african', 'conscious'], 20,
      "Cape Town's hip-hop was political from the start. Groups like Prophets of da City and Black Noise used rap to speak out against apartheid.",
      [
        ['Prophets of da City', 'Cape Town group with strong political lyrics.'],
        ['Black Noise', 'Cape Town pioneers of South African hip-hop.'],
      ],
      [],
      [['Age of Truth', 'Prophets of da City', 1990]]),
    E(2000, 2009, 'Kaapse Rap & Zef', ['african'], 30,
      "Rappers began to use Afrikaans and Cape slang. Brasse Vannie Kaap brought Kaapse rap to a wider audience, and Die Antwoord started to build their \"zef\" image.",
      [
        ['Brasse Vannie Kaap', 'Cape Town group known for Afrikaans-language rap.'],
        ['Die Antwoord', 'Cape Town duo who built an international following.'],
      ],
      [],
      [['$O$', 'Die Antwoord', 2009]]),
    E(2010, 2026, 'Cape Town to the World', ['african', 'alt'], 42,
      "Die Antwoord became a worldwide phenomenon, while artists like Dope Saint Jude used rap to talk about identity and politics.",
      [
        ['Die Antwoord', 'Cape Town duo known for a surreal, provocative style.'],
        ['Dope Saint Jude', 'Cape Town rapper and activist.'],
      ],
      [
        ['Enter the Ninja', 'Die Antwoord', 2010],
        ['Baby\'s on Fire', 'Die Antwoord', 2012],
      ],
      [['Ten$ion', 'Die Antwoord', 2012]]),
  ]),

  // ───────────────────────── OCEANIA ─────────────────────────
  C('canberra', 'Canberra', 'Australia', 'Oceania', [-35.2809, 149.13], 'Australian hip-hop, from the suburbs to the world.', [
    E(1990, 1999, 'Roots', ['boom-bap'], 12,
      "Australian hip-hop began in the 1980s with breakdancing and graffiti, and by the 90s, local crews were rapping in their own accents."),
    E(2000, 2009, 'Aussie Hip-Hop Finds Its Voice', ['boom-bap', 'conscious'], 28,
      "Adelaide's Hilltop Hoods became the face of the scene, proving Australian audiences would buy local hip-hop in large numbers.",
      [['Hilltop Hoods', 'Adelaide group and the biggest name in Australian hip-hop.']],
      [],
      [
        ['The Calling', 'Hilltop Hoods', 2003],
        ['The Hard Road', 'Hilltop Hoods', 2006],
      ]),
    E(2010, 2026, 'Global Breakouts', ['trap', 'melodic'], 40,
      "Iggy Azalea reached number one in the US, and Baker Boy rapped in Yolŋu Matha as well as English.",
      [
        ['Iggy Azalea', 'Australian rapper who topped the US charts.'],
        ['Baker Boy', 'Rapper from Arnhem Land who raps in Yolŋu Matha and English.'],
      ],
      [['Fancy', 'Iggy Azalea ft. Charli XCX', 2014]],
      [
        ['The New Classic', 'Iggy Azalea', 2014],
        ['Gela', 'Baker Boy', 2021],
      ]),
  ], "Australian hip-hop is centred on Sydney, Melbourne and Adelaide. This profile covers the national scene."),

  C('suva', 'Suva', 'Fiji', 'Oceania', [-18.1248, 178.4501], 'A small scene in a region where New Zealand leads.', [
    E(1990, 2009, 'The Pacific First Wave', ['island'], 6,
      "The Pacific's early hip-hop story is centred on Aotearoa New Zealand: 3 The Hard Way had a number-one with \"Hip Hop Holiday\" in 1994, OMC's \"How Bizarre\" went worldwide in 1997, and King Kapisi won the Silver Scroll award in 1999 for \"Reverse Resistance\". Fiji's own scene was small.",
      [
        ['3 The Hard Way', 'New Zealand group with a number-one in 1994.'],
        ['OMC', 'New Zealand act with a worldwide hit in 1997.'],
        ['King Kapisi', 'Samoan-New Zealand rapper and Silver Scroll winner.'],
      ],
      [
        ['Hip Hop Holiday', '3 The Hard Way', 1994],
        ['How Bizarre', 'OMC', 1997],
        ['Reverse Resistance', 'King Kapisi', 1999],
      ]),
    E(2010, 2026, 'A Small Scene', ['island'], 10,
      "Fijian rappers such as Whipz say rap is still small in Fiji, and many prefer positive, motivational lyrics over the gangster style.",
      [['Whipz', 'Fijian rapper (David Whippy) with a motivational style.']]),
  ], 'A small profile: this lists only what could be confirmed. Songs from New Zealand are included as regional context.'),

  C('male', 'Malé', 'Maldives', 'South Asia', [4.1755, 73.5093], "Dhivehi rap from the islands: Symbolic Records and Pest.", [
    E(1990, 2009, 'Before the Scene', ['island'], 4,
      "Maldivian music was built on traditional and pop styles, and hip-hop was heard mainly through imported recordings."),
    E(2010, 2019, 'Symbolic Records', ['island'], 12,
      "Rappers formed crews and labels in Malé. Pest co-founded Symbolic Records with friends from Fuvahmulah, and co-wrote \"Reethi Kudhin\", recorded in early 2011.",
      [
        ['Pest', 'Maldivian rapper and co-founder of Symbolic Records.'],
        ['Darknezz', 'Maldivian rap collective led by Eydee.'],
      ]),
    E(2020, 2026, 'Dhivehi Rap Today', ['island'], 20,
      "Pest returned with singles such as \"Veringe Verikan\" (2022) and the album L2 (2025), produced largely by Sanchu.",
      [['Pest', 'Maldivian rapper.']],
      [],
      [['L2', 'Pest', 2025]]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  // ───────────────────────── ADDED: MOSCOW, AFRICA, ASIA, AMERICAS, PACIFIC ─────────────────────────
  C('moscow', 'Moscow', 'Russia', 'Europe', [55.7558, 37.6173], 'From the first Moscow crews to battle rap and streaming trap.', [
    E(1990, 1999, 'The First Crews', ['boom-bap', 'russian'], 20,
      "Russian rap started in the late 80s and early 90s. Bogdan Titomir and Malchishnik are named as pioneers, and Moscow crews such as D.O.B Community and White Hot Ice formed in the early-to-mid 90s. Detsl became popular at the end of the decade.",
      [
        ['Bogdan Titomir', 'Named among the pioneers of Russian rap.'],
        ['Malchishnik', 'Early Russian rap group, named among the pioneers.'],
        ['D.O.B Community', 'Moscow crew from the early-to-mid 90s scene.'],
        ['Detsl', 'Became popular in Russian rap in the late 1990s.'],
      ]),
    E(2000, 2009, 'Rap on the Radio', ['russian', 'boom-bap'], 30,
      "Rap reached the mainstream. Kasta and Bad Balance were among the most popular acts of the early 2000s, Centr won Best Hip Hop Project at the 2008 MTV Russia Music Awards, and Smoky Mo and Krovostok came up in Moscow's underground. Timati built a pop-rap career in Moscow.",
      [
        ['Centr', 'Became popular in 2007, with the albums Kacheli and Efir v norme.'],
        ['Kasta', 'One of the most popular Russian rap acts of the early 2000s.'],
        ['Smoky Mo', 'Came out of the Moscow underground in the mid-2000s.'],
        ['Krovostok', 'Underground act from the same mid-2000s Moscow scene.'],
        ['Timati', 'Moscow-born rapper and pop star.'],
      ]),
    E(2010, 2019, 'Battles & Trap', ['russian', 'trap', 'alt'], 48,
      "A new generation arrived with trap and online audiences: Face, Big Baby Tape, Morgenshtern, Pharaoh and Husky are among the names that defined the decade. Oxxxymiron became the face of Russian battle rap, and his 2015 Versus Battle against Johnny Boy was watched by millions.",
      [
        ['Oxxxymiron', 'Russian battle-rap star and author of the album Gorgorod.'],
        ['Face', 'Rapper who became a major name in the late 2010s.'],
        ['Big Baby Tape', 'Trap-influenced rapper with a huge online following.'],
        ['Morgenshtern', 'Rapper and online personality whose hits topped Russian streaming.'],
        ['Pharaoh', 'Cloud-rap-influenced artist from the late-2010s wave.'],
      ],
      [
        ['Welcome to St. Tropez', 'Timati ft. DJ Antoine', 2011],
        ['Cadillac', 'Morgenshtern & Eljay', 2019],
      ],
      [
        ['Gorgorod', 'Oxxxymiron', 2015],
        ['Dragonborn', 'Big Baby Tape', 2018],
      ]),
    E(2020, 2026, 'Streaming Stars', ['russian', 'trap'], 44,
      "Morgenshtern, Husky and Slava Marlow gained notable popularity between 2020 and 2025, and the scene lives mainly on streaming and video platforms.",
      [
        ['Morgenshtern', 'One of the most-streamed Russian rappers of the period.'],
        ['Husky', 'Rapper who gained notable popularity in the 2020s.'],
        ['Slava Marlow', 'Producer and artist who rose to popularity in the 2020s.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Some acts named here (like Oxxxymiron) are not all strictly from Moscow.'),

  C('antananarivo', 'Antananarivo', 'Madagascar', 'Africa', [-18.8792, 47.5079], 'Rap Gasy: Malagasy hip-hop, from breakdance crews to festivals.', [
    E(1990, 1999, 'Haintso Haintso', ['african'], 8,
      "Hip-hop reached Madagascar around 1985 with breakdancing, and locals call it \"Haintso Haintso\". The Malagasy rap scene, Rap Gasy, stayed underground until the late 1990s, though some artists were already attracting attention from 1994 for politically provocative lyrics."),
    E(2000, 2009, 'A Child Ambassador', ['african'], 12,
      "In 2007, 15-year-old rapper Name Six was named UNICEF's first Junior Goodwill Ambassador for Eastern and Southern Africa, using his music to talk about the challenges facing children in poorer communities.",
      [['Name Six', 'Teenage Malagasy rapper and UNICEF Junior Goodwill Ambassador in 2007.']]),
    E(2010, 2026, 'Rap Gasy Today', ['african'], 18,
      "Rappers began blending Malagasy musical traditions with rap, slam and beatboxing, and organised their own hip-hop festival. Madmax, Kemyrah, Nanté98, Fab's Brownz and Kresnik are among the current names.",
      [
        ['Madmax', 'Malagasy rapper behind the 2022 releases Malalako and Ambadiky Amaray.'],
        ['Kemyrah', 'Rap Gasy artist.'],
        ['Nanté98', 'Rap Gasy artist.'],
        ["Fab's Brownz", 'Rap Gasy artist.'],
        ['Kresnik', 'Rap Gasy artist.'],
      ],
      [],
      [
        ['Malalako', 'Madmax', 2022],
        ['Ambadiky Amaray', 'Madmax', 2022],
        ['Love Spirit', 'Basta Lion', 2021],
        ['NY ANIO', 'Zakai', 2024],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('maputo', 'Maputo', 'Mozambique', 'Africa', [-25.9692, 32.5732], 'Engaged rap in Portuguese: from Rappers United to Azagaia.', [
    E(1990, 1999, 'Cassettes & Crews', ['african'], 8,
      "Rap arrived in Maputo in the 1980s on cassettes brought back by travellers, and early artists mostly copied American rappers. Rappers United formed in 1993 as one of the first crews, and the Rádio Moçambique programme Hip Hop Time (1995) helped spread the genre.",
      [['Rappers United', 'One of Maputo\'s first rap crews, formed in 1993.']]),
    E(2000, 2009, 'Rap with a Message', ['african', 'conscious'], 20,
      "Gpro Fam formed in 2000 and released Um Passo em Frente in 2003; its song \"País da Marrabenta\", a critique of poverty and corruption, was reportedly censored. The 2003 compilation Atenção Desminagem by Banda Podre is considered a manifesto of Mozambican rap. Azagaia's \"Combatentes de Fortuna\" came in 2009.",
      [
        ['Gpro Fam', 'Group formed at the 2000 Tchova talent contest.'],
        ['Banda Podre', 'Group behind the 2003 compilation Atenção Desminagem.'],
        ['Azagaia', 'Maputo rapper and the best-known voice of engaged rap in Mozambique.'],
      ],
      [
        ['País da Marrabenta', 'Gpro Fam', 2003],
        ['Combatentes de Fortuna', 'Azagaia', 2009],
      ],
      [
        ['Um Passo em Frente', 'Gpro Fam', 2003],
        ['Atenção Desminagem', 'Banda Podre', 2003],
      ]),
    E(2010, 2026, 'Engaged vs Commercial', ['african', 'conscious'], 26,
      "Azagaia was arrested in 2011 on a cannabis charge shortly before a concert, and kept releasing politically charged work such as \"Declaração de Paz\" (2014). Commercial acts such as MC Roger (\"Patrão é Patrão\", 2014) stood on the other side of a split in the scene. Azagaia died in 2023.",
      [
        ['Azagaia', 'Engaged rapper who stayed at the centre of the scene until his death in 2023.'],
        ['MC Roger', 'Rapper known for the commercial hit "Patrão é Patrão".'],
        ['Rage', 'Rapper with the songs "O que é que vais fazer" and "Dia-a-Dia".'],
        ['Melody', 'André Cardoso, known for the 2018 video "Chamboco".'],
      ],
      [
        ['Declaração de Paz', 'Azagaia', 2014],
        ['Patrão é Patrão', 'MC Roger', 2014],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('jakarta', 'Jakarta', 'Indonesia', 'Southeast Asia', [-6.2088, 106.8456], 'From Iwa K to Rich Brian: Indonesia rhymes in many languages.', [
    E(1990, 1999, 'The First Album', ['sea'], 10,
      "Iwa K released the first full-length Indonesian hip-hop album in the early 1990s. In 1995, the then-minister B.J. Habibie objected to an Indonesian rap festival, a sign of how new the sound was.",
      [['Iwa K', 'Jakarta rapper behind the first full-length Indonesian hip-hop album.']]),
    E(2000, 2009, 'Local Voices', ['sea'], 18,
      "The Jogja Hiphop Foundation, founded in Yogyakarta in 2003, mixed rap with gamelan and wayang kulit. Saykoji was among the acts active by 2005, and Papuan rapper Epo D'Fenomeno began making music the same year.",
      [
        ['Saykoji', 'Indonesian rapper, active from the mid-2000s.'],
        ['Jogja Hiphop Foundation', 'Yogyakarta collective that blends rap with Javanese tradition.'],
        ["Epo D'Fenomeno", 'Papuan rapper and producer who began making music in 2005.'],
      ]),
    E(2010, 2019, 'Going Global', ['sea', 'trap'], 42,
      "Rich Brian's \"Dat $tick\" (2016) went viral and reached number 4 on the US Bubbling Under R&B/Hip-Hop Singles chart. His album Amen followed in 2018, the same year A(riel) Nayaka's Cadence Blue became the first hip-hop album nominated for Album of the Year at the Indonesian Music Awards.",
      [
        ['Rich Brian', 'Jakarta-born rapper who broke out through the internet and 88rising.'],
        ['Warren Hue', 'Indonesian rapper signed to 88rising.'],
        ['A(riel) Nayaka', 'English-language rapper behind Cadence Blue.'],
      ],
      [['Dat $tick', 'Rich Brian', 2016]],
      [
        ['Amen', 'Rich Brian', 2018],
        ['Cadence Blue', 'A(riel) Nayaka', 2018],
      ]),
    E(2020, 2026, 'New Collectives', ['sea', 'trap'], 44,
      "Warren Hue was named to Forbes' 2022 30 Under 30 Asia list. Collectives such as Envy (South Jakarta) and rappers like Ramengvrl and Tenxi, who blends hip-hop with dangdut, are widening the sound.",
      [
        ['Rich Brian', 'Continued to release albums for an international audience.'],
        ['Warren Hue', 'Named to the Forbes 30 Under 30 Asia list in 2022.'],
        ['Tenxi', 'Mixes hip-hop with dangdut.'],
        ['Ramengvrl', 'Rapper active since 2016.'],
      ],
      [],
      [['Brightside', 'Rich Brian', 2021]]),
  ], 'Indonesian hip-hop spreads from Jakarta to Yogyakarta, Papua and beyond. This pin stands for the national scene.'),

  C('mexico-city', 'Mexico City', 'Mexico', 'Latin America', [19.4326, -99.1332], 'From parody singles to MTV hits to a hip-hop mural in the capital.', [
    E(1990, 1999, 'Rap Reaches MTV', ['latin', 'boom-bap'], 24,
      "Memo Ríos's \"El Cotorreo\" (1979) is often cited as the first Mexican rap record, and the hip-hop movement began in 1991 with groups like Sindicato del Terror and 4to Del Tren in the State of Mexico. In 1996 Control Machete, from Monterrey, made rap mainstream through MTV videos. Molotov, from Mexico City, mixed rock and rap.",
      [
        ['Memo Ríos', 'MC Aplausos, author of "El Cotorreo" (1979).'],
        ['Sindicato del Terror', 'State of Mexico group from the first wave of Mexican hip-hop.'],
        ['Control Machete', 'Monterrey group that made rap mainstream through MTV.'],
        ['Molotov', 'Mexico City band known for rock-rap crossover.'],
      ],
      [
        ['¿Comprendes Mendes?', 'Control Machete', 1996],
        ['Gimme tha Power', 'Molotov', 1997],
      ],
      [['Mucho Barato', 'Control Machete', 1996]]),
    E(2000, 2009, 'Control Machete & Beyond', ['latin', 'boom-bap'], 34,
      "Control Machete's \"Sí Señor\" was used in a Levi's Super Bowl commercial and the film Amores perros, and the group released Uno, Dos: Bandera in 2004 before a long hiatus. Cartel de Santa, Alemán and others carried the scene forward.",
      [
        ['Control Machete', 'Went on indefinite hiatus in 2004.'],
        ['Cartel de Santa', 'Rap group that expanded the scene in the 2000s.'],
        ['Alemán', 'Mexican rapper who grew out of the 2000s scene.'],
      ],
      [['Sí Señor', 'Control Machete', 1999]],
      [['Uno, Dos: Bandera', 'Control Machete', 2004]]),
    E(2010, 2019, 'Battles & Trap', ['latin', 'trap'], 40,
      "Mexican rap grew through battles and online audiences. Gera MX, Dharius, Dyablo and freestyle star Aczino became well-known names, and Santa Fe Klan and MC Davo reached large audiences.",
      [
        ['Gera MX', 'Mexican rapper and one of the scene\'s big names.'],
        ['Dharius', 'Mexican rapper from the new generation.'],
        ['Aczino', 'Freestyle battle star from Mexico City.'],
        ['Santa Fe Klan', 'Rapper with a large national following.'],
      ]),
    E(2020, 2026, '50 Years of Mexican Hip-Hop', ['latin', 'trap'], 42,
      "In 2023 Spotify unveiled a mural in Mexico City celebrating 50 years of Mexican hip-hop, naming artists such as Santa Fe Klan, MC Davo and Lefty SM.",
      [
        ['Santa Fe Klan', 'One of the most visible rappers of the 2020s.'],
        ['MC Davo', 'Named on the 2023 Mexico City hip-hop mural.'],
        ['Lefty SM', 'Named on the 2023 Mexico City hip-hop mural.'],
      ]),
  ], 'Mexican rap lives in Monterrey, Mexico City, Guadalajara and many more places. This pin stands for the national scene.'),

  C('santo-domingo', 'Santo Domingo', 'Dominican Republic', 'Latin America', [18.4861, -69.9312], 'Rap in Los Mina, and dembow, the sound that travelled the world.', [
    E(1990, 1999, 'The First Dembow', ['dembow', 'latin'], 14,
      "In 1991, DJ Boyo made \"Mujeres Andadoras\", considered the first Dominican dembow track. Teens in Santo Domingo's poorest neighbourhoods, inspired by reggae en español and Shabba Ranks, made music with very limited resources.",
      [['DJ Boyo', 'Made the first Dominican dembow track, "Mujeres Andadoras" (1991).']]),
    E(2000, 2009, 'Rap vs Dembow', ['dembow', 'latin'], 24,
      "DJ Topo's TV show La Hora de DJ Topo (2005) helped launch Rochy RD, El Mayor and others, and Los Ando Locos' \"Ando Loco\" was a nationwide hit in 2006. Rappers largely looked down on dembow producers. Lápiz Conciente, born in 1983 and raised in Los Mina, grew into a leading Dominican rapper.",
      [
        ['Lápiz Conciente', 'Born in Santo Domingo, raised in Los Mina; widely seen as the best Dominican rapper.'],
        ['Rochy RD', 'Dembow artist launched through DJ Topo\'s show.'],
        ['El Mayor', 'Dembow artist launched through DJ Topo\'s show.'],
        ['Los Ando Locos', 'Group behind the 2006 hit "Ando Loco".'],
      ],
      [['Ando Loco', 'Los Ando Locos', 2006]]),
    E(2010, 2019, 'Trap Bow', ['dembow', 'trap'], 40,
      "Pablo Piddy switched to dembow in 2011 with \"Si Tú Quiere Dembow\". In the mid-2010s Latin trap influence brought 808s to the sound, and El Alfa's \"Tarzán\" (2014) marked a new era. In 2019, \"Que Calor\" with Major Lazer and J Balvin introduced dembow to the world.",
      [
        ['El Alfa', 'Dembow star often called El Jefe; central to the trap-bow era.'],
        ['Pablo Piddy', 'Rapper who moved to dembow in 2011.'],
        ['Lápiz Conciente', 'Ranked No. 13 on Billboard en Español\'s list of essential Spanish-language rappers (2023).'],
      ],
      [
        ['Si Tú Quiere Dembow', 'Pablo Piddy', 2011],
        ['Tarzán', 'El Alfa', 2014],
        ['Que Calor', 'Major Lazer ft. J Balvin & El Alfa', 2019],
      ]),
    E(2020, 2026, 'Global Dembow', ['dembow', 'trap', 'latin'], 54,
      "Dominican artists became fixtures in Latin urban music. Tokischa, from Santo Domingo, joined Rosalía on \"Linda\" in 2022, and El Alfa stayed one of the genre's best-known names.",
      [
        ['El Alfa', 'One of dembow\'s biggest international names.'],
        ['Tokischa', 'Santo Domingo artist known for provocative dembow and rap.'],
        ['Lápiz Conciente', 'Still active; announced a new track, "Advertencia para la competencia", in 2023.'],
      ],
      [['Linda', 'Tokischa & Rosalía', 2022]]),
  ], 'Dominican urban music mixes rap and dembow. Dembow is not strictly rap, but the two scenes grew side by side.'),

  C('caracas', 'Caracas', 'Venezuela', 'Latin America', [10.4806, -66.9036], 'Spanish-language rap with some of the best lyricists in Latin America.', [
    E(1990, 1999, 'Pioneers', ['latin', 'boom-bap'], 12,
      "Perucho Conde is credited with the first hip-hop song made in Venezuela, in the 1980s. Early groups such as 3 Dueños and Guerrilla Seca built the underground scene in the 90s.",
      [
        ['Perucho Conde', 'Credited with the first Venezuelan hip-hop song.'],
        ['3 Dueños', 'Early Venezuelan rap group.'],
        ['Guerrilla Seca', 'Early Venezuelan rap group.'],
      ]),
    E(2000, 2009, 'A Growing Underground', ['latin', 'conscious'], 20,
      "La Corte, 4to Poder and Apache gave Venezuelan rap a loyal audience, and later stars such as Canserbero and Lil Supa grew out of this scene.",
      [
        ['La Corte', 'Venezuelan rap group.'],
        ['4to Poder', 'Venezuelan rap group.'],
        ['Apache', 'Venezuelan rapper who became a star abroad.'],
      ]),
    E(2010, 2019, 'Canserbero & Akapellah', ['latin', 'conscious'], 32,
      "Canserbero, who died in 2015, became a legend of Spanish-language rap. Akapellah, Lil Supa and McKlopedia took Venezuelan rap to a wider audience across Latin America.",
      [
        ['Canserbero', 'Venezuelan rapper revered across the Spanish-speaking world.'],
        ['Akapellah', 'Venezuelan rapper with a large following.'],
        ['Lil Supa', 'Venezuelan rapper who gained international attention.'],
        ['McKlopedia', 'Venezuelan rapper and freestyler.'],
      ]),
    E(2020, 2026, 'A New Generation', ['latin', 'trap'], 30,
      "Artists such as Gabylonia, Reke, Truko and Gona carry on the scene, with many Venezuelan artists working from abroad.",
      [
        ['Gabylonia', 'Venezuelan rapper.'],
        ['Reke', 'Venezuelan rapper.'],
        ['Truko', 'Venezuelan rapper.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Some of these artists come from other Venezuelan cities.'),

  C('honolulu', 'Honolulu', 'USA', 'Oceania', [21.3069, -157.8583], 'Hawaiian-language hip-hop, from Hilo to the world.', [
    E(1990, 1999, 'Hawaiian Rap Begins', ['island', 'boom-bap'], 8,
      "Hip-hop reached Hawaiʻi through DJs, dancers and radio. In 1993, Caleb Richards and Shane Veincent formed Sudden Rush in Hilo, widely recognised as the first group to record hip-hop with Native Hawaiian rapping (nā mele pāleoleo).",
      [['Sudden Rush', 'Hilo group, the first to record hip-hop with Native Hawaiian rapping.']]),
    E(2000, 2009, 'Rapping in ʻŌlelo Hawaiʻi', ['island', 'conscious'], 12,
      "Sudden Rush moved from copying 1990s gangsta rap to focusing on Hawaiian culture and local political issues. Their song \"Ea\" came out in 2002.",
      [['Sudden Rush', 'Fluent Hawaiian speaker Keʻala Kawaʻauhau Jr. kept the group rooted in ʻōlelo Hawaiʻi.']],
      [['Ea', 'Sudden Rush', 2002]]),
    E(2010, 2026, 'Still Rooted', ['island'], 14,
      "Sudden Rush released four albums between 1994 and 2018. Kawaʻauhau died in 2018, and the group recorded an album with him before his death.",
      [['Sudden Rush', 'Veincent and Richards are the remaining members.']]),
  ], 'A small profile: this lists only what could be confirmed. Sudden Rush is from Hilo; the pin stands for Hawaiʻi.'),

  // ───────────────────────── ADDED: EUROPE, MIDDLE EAST, AFRICA, ASIA, AMERICAS, OCEANIA ─────────────────────────
  C('stockholm', 'Stockholm', 'Sweden', 'Europe', [59.3293, 18.0686], 'Rap in Swedish, from the suburbs to the cloud-rap internet.', [
    E(1990, 1999, 'Rapping in Swedish', ['boom-bap', 'nordic'], 24,
      "Hip-hop reached Stockholm in the early 1980s. Just D began rapping in Swedish in 1990, and in 1994 the Latin Kings released Välkommen till Förorten, a chart success about life in the suburbs. Petter debuted with Mitt sjätte sinne in 1998 and started the late-90s Swedish hip-hop boom.",
      [
        ['Just D', 'Formed in 1990 and began rapping in Swedish.'],
        ['Latin Kings', 'Suburban group behind Välkommen till Förorten.'],
        ['Petter', 'Debuted in 1998 and sparked the late-90s boom.'],
        ['Looptroop', 'Part of the late-90s generation.'],
      ],
      [],
      [
        ['Välkommen till Förorten', 'Latin Kings', 1994],
        ['Mitt sjätte sinne', 'Petter', 1998],
      ]),
    E(2000, 2009, 'Swedish Hip-Hop Grows Up', ['boom-bap', 'conscious', 'nordic'], 30,
      "Promoe's \"These Walls Don't Lie\" was a hit in 2004, and in 2008 the Make it blast! hip-hop summit was held in Stockholm, chaired by Timbuktu. Ison & Fille, Adam Tensta and Ayesha were among the best-known names.",
      [
        ['Promoe', 'Rapper behind the 2004 hit "These Walls Don\'t Lie".'],
        ['Timbuktu', 'Chaired the 2008 Make it blast! summit.'],
        ['Ison & Fille', 'Duo among the best-known Swedish rappers of the decade.'],
        ['Adam Tensta', 'Swedish rapper who became a national name.'],
      ],
      [['These Walls Don\'t Lie', 'Promoe', 2004]]),
    E(2010, 2019, 'Cloud Rap Goes Global', ['cloud', 'trap', 'nordic'], 56,
      "Yung Lean, Bladee, Thaiboy Digital and Ecco2k brought Swedish cloud rap to an international audience. Le Sinner and Rebstar drew attention abroad in 2017, including with \"Hello Kitty\".",
      [
        ['Yung Lean', 'Stockholm rapper who became a cloud-rap icon.'],
        ['Bladee', 'Cloud-rap artist with an international following.'],
        ['Thaiboy Digital', 'Part of the same internet-born wave.'],
        ['Ecco2k', 'Part of the same internet-born wave.'],
      ],
      [['Hello Kitty', 'Le Sinner & Rebstar', 2017]],
      [['Unknown Memory', 'Yung Lean', 2014]]),
    E(2020, 2026, 'Rap on the Charts', ['trap', 'cloud', 'nordic'], 46,
      "Swedish rap is a staple of the Swedish charts and keeps exporting artists. Yung Lean, Bladee and their circle remain among the country's best-known international rap names.",
      [
        ['Yung Lean', 'Still one of Sweden\'s best-known rap exports.'],
        ['Bladee', 'Still a leading name in the scene.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed, and the source covered the 2010s and 2020s only by name.'),

  C('tehran', 'Tehran', 'Iran', 'Middle East', [35.6892, 51.389], 'Persian rap on the internet, under pressure at home.', [
    E(1990, 1999, 'Before the Internet', ['persian'], 4,
      "Rap in Persian only starts to appear in the sources I found in the 2000s, so this early period is thinly documented."),
    E(2000, 2009, 'Underground Beginnings', ['persian', 'conscious'], 16,
      "Persian hip-hop grew in Tehran in the 2000s. Without official permission, rappers spread their music through the internet and word of mouth. Hichkas is often credited as a founding figure of the genre, and Yas also became a leading name.",
      [
        ['Hichkas', 'Tehran rapper often described as a pioneer of Persian rap.'],
        ['Yas', 'Rapper who became one of the best-known voices of the scene.'],
        ['Zedbazi', 'Tehran duo from the early underground.'],
      ]),
    E(2010, 2019, 'Online Stars', ['persian', 'trap'], 28,
      "Streaming, Telegram and social media allowed Persian rappers to reach millions without radio or state approval. Tataloo became one of the most visible and controversial figures.",
      [
        ['Hichkas', 'Continued to shape the sound.'],
        ['Yas', 'Remained a major name.'],
        ['Tataloo', 'Among the most visible and controversial figures in Persian rap.'],
      ]),
    E(2020, 2026, 'Rap and Protest', ['persian', 'conscious'], 34,
      "Rapper Toomaj Salehi was arrested in 2022 over songs that supported the protests in Iran. His case became an international talking point about the risks of rapping in Iran.",
      [
        ['Toomaj Salehi', 'Rapper arrested in 2022 over protest songs.'],
        ['Hichkas', 'Veteran of the scene.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('kyiv', 'Kyiv', 'Ukraine', 'Europe', [50.4501, 30.5234], 'Ukrainian rap from the 1989 pioneers to a Eurovision win.', [
    E(1990, 1999, 'The Pioneers', ['eastern-euro'], 14,
      "TNMK (Kharkiv) and V.U.Z.V (Kyiv) both started in 1989, and hip-hop developed in Ukraine through the 1990s. Osnovnyy Pokaznyk, Tartak and GreenJolly are also listed among the pioneers. Audiences saw Kharkiv and Lviv as the main centres.",
      [
        ['TNMK', 'Started in 1989 in Kharkiv.'],
        ['V.U.Z.V', 'Kyiv group that started in 1989.'],
        ['Tartak', 'Lviv act listed among the pioneers.'],
        ['GreenJolly', 'Ivano-Frankivsk act listed among the pioneers.'],
      ]),
    E(2000, 2009, 'Orange Revolution', ['eastern-euro'], 20,
      "GreenJolly's \"Together We Are Many\" was Ukraine's 2005 Eurovision entry and the unofficial anthem of the Orange Revolution. Eurovision required its lyrics to be changed. Freel from Kyiv, DaHok and Sirius MC came up in the mid-2000s, and in 2008 LEZO released Hostroslovy.",
      [
        ['GreenJolly', 'Behind "Together We Are Many" (2005).'],
        ['Freel', 'Kyiv act from the mid-2000s.'],
        ['LEZO', 'Released Hostroslovy in 2008.'],
      ],
      [['Together We Are Many', 'GreenJolly', 2005]],
      [['Hostroslovy', 'LEZO', 2008]]),
    E(2010, 2019, 'New Voices', ['eastern-euro', 'alt'], 24,
      "PVNCH's Holodnyi was voted best hip-hop album of 2014, and Tulym from Kyiv performed with Onyx in Sofia in 2015. Alyona alyona, Kalush and Yarmak are listed among the artists who followed.",
      [
        ['PVNCH', 'Album Holodnyi was voted best hip-hop album of 2014.'],
        ['Tulym', 'Kyiv duo formed by KyLЯ and RYLEZ in 2008.'],
        ['Alyona alyona', 'Rapper who became one of the best-known names in Ukraine.'],
      ],
      [],
      [['Holodnyi', 'PVNCH', 2014]]),
    E(2020, 2026, 'Wartime Rap', ['eastern-euro', 'alt'], 38,
      "Kalush Orchestra, who mix rap and folk, won Eurovision 2022 with \"Stefania\". Ukrainian rappers have been active at home and abroad during the war.",
      [
        ['Kalush Orchestra', 'Mix rap with folk; won Eurovision in 2022.'],
        ['Alyona alyona', 'Continues to release music.'],
      ],
      [['Stefania', 'Kalush Orchestra', 2022]]),
  ], 'A small profile: this lists only what could be confirmed. Some acts named here are from other Ukrainian cities.'),

  C('bucharest', 'Bucharest', 'Romania', 'Europe', [44.4268, 26.1025], 'From block-party rap in Pantelimon to a trap boom.', [
    E(1990, 1999, 'The Cartier Wave', ['eastern-euro', 'boom-bap'], 28,
      "Vorbire Directă was the first Romanian hip-hop group in 1992, and the first hip-hop concert was held in Bucharest on 14 May 1993. R.A.C.L.A. released the first hip-hop album, Rap-Sodia efectului defectului, in 1995. B.U.G. Mafia, La Familia and Paraziții emerged, with a short-lived rivalry between the \"Cartel\" and \"RANS\" camps.",
      [
        ['Vorbire Directă', 'First Romanian hip-hop group.'],
        ['B.U.G. Mafia', 'Bucharest crew from Pantelimon; later the first Romanian rap group to tour abroad.'],
        ['La Familia', 'Part of the Cartel camp.'],
        ['Paraziții', 'One of the most enduring Romanian rap groups.'],
        ['R.A.C.L.A.', 'Released the first Romanian hip-hop album in 1995.'],
      ],
      [
        ['Pantelimonu\' Petrece', 'B.U.G. Mafia', 1996],
        ['Gara de Nord', 'R.A.C.L.A.', 1998],
      ],
      [
        ['De cartier', 'B.U.G. Mafia', 1998],
        ['Nicăieri nu-i ca acasă', 'La Familia', 1999],
      ]),
    E(2000, 2009, 'Cult Status', ['eastern-euro', 'boom-bap'], 34,
      "B.U.G. Mafia and Paraziții gained cult status. In the late 2000s, Puya (La Familia), Guess Who, Grasu XXL, Spike and Specii rose to prominence.",
      [
        ['B.U.G. Mafia', 'Cult status in the 2000s.'],
        ['Paraziții', 'Cult status in the 2000s.'],
        ['Puya', 'Of La Familia; rose to prominence in the late 2000s.'],
        ['Guess Who', 'Rose to prominence in the late 2000s.'],
      ]),
    E(2010, 2019, 'Trap Takes Over', ['eastern-euro', 'trap'], 40,
      "Trap was popularised from 2015 by Șatra B.E.N.Z., with the album O.$.O.D. II (2017) and Killa Fonic's mixtape Ramses 1989 (2016) well received. YouTube-based artists such as Lino Golden, abi and 5GANG followed, and from 2018 Ian, Azteca and Amuly made trap the main current.",
      [
        ['Șatra B.E.N.Z.', 'Popularised trap in Romania from 2015.'],
        ['Killa Fonic', 'Mixtape Ramses 1989 (2016).'],
        ['Lino Golden', 'YouTube-based artist of the second wave.'],
      ],
      [],
      [
        ['O.$.O.D. II', 'Șatra B.E.N.Z.', 2017],
        ['Ramses 1989', 'Killa Fonic', 2016],
      ]),
    E(2020, 2026, 'After the Pandemic', ['eastern-euro', 'trap'], 36,
      "After COVID-19, a new group of artists emerged, including Bvcovia, Marko Glass, Albert NBN and Tussin, experimenting with pop, manele, R&B, drill and rage.",
      [
        ['Bvcovia', 'Part of the post-COVID generation.'],
        ['Marko Glass', 'Part of the post-COVID generation.'],
        ['Albert NBN', 'Part of the post-COVID generation.'],
      ]),
  ]),

  C('sofia', 'Sofia', 'Bulgaria', 'Europe', [42.6977, 23.3219], 'Bulgarian rap: two waves, an east-west rivalry, then trap.', [
    E(1990, 1999, 'First Wave', ['eastern-euro', 'boom-bap'], 8,
      "Ivo-Trombona (later Mc Guinness) is called the first Bulgarian rapper, and the song \"Problems\" was recorded at the New Generation studio in Sofia. In 1991, Dobo Rap Plamen Sound released an experimental live album in Burgas, and X-Team formed in the mid-1990s. Upsurt released Bozdugan in 1999.",
      [
        ['Ivo-Trombona', 'Called the first Bulgarian rapper.'],
        ['X-Team', 'Formed in the mid-1990s.'],
        ['Upsurt', 'Released Bozdugan in 1999.'],
      ],
      [],
      [['Bozdugan', 'Upsurt', 1999]]),
    E(2000, 2009, 'Second Wave', ['eastern-euro', 'boom-bap'], 16,
      "Rap became commercially successful. Big Sha founded Frontline Hustle, and Sniper Records was a rival label, with a rivalry between east and west. Big Sha's Hliab & Amfeti (2008) was a major success, and \"Dime Piece\" with Snoop Dogg followed in 2009. Upsurt, DRS and Nokaut were among the other acts.",
      [
        ['Big Sha', 'Founded Frontline Hustle; "Dime Piece" featured Snoop Dogg.'],
        ['Spens and Slim', 'Sniper Records, the rival label.'],
        ['Upsurt', 'Released Chekai malko in 2001.'],
        ['DRS', 'Ndoe and Mitaka; debuted with Урок#1 in 2001.'],
      ],
      [['Dime Piece', 'Big Sha ft. Snoop Dogg', 2009]],
      [['Hliab & Amfeti', 'Big Sha', 2008]]),
    E(2010, 2019, 'Online Generation', ['eastern-euro', 'trap'], 18,
      "Lil Jon performed in Sofia on 31 March 2010. After 2010, F.O. and Keranov, among others, gained popularity by posting songs online, and Dim4ou, Qvkata DLG and 100 Kila became known names.",
      [
        ['Dim4ou', 'Late-2000s and 2010s name.'],
        ['Qvkata DLG', 'Late-2000s and 2010s name.'],
        ['F.O.', 'Gained popularity online after 2010.'],
      ]),
    E(2020, 2026, 'Trap as the New Wave', ['eastern-euro', 'trap'], 22,
      "Trap is the most listened-to genre. V:RGO, MurdaBoyz and MBT are among the artists named, and the Egasi Festa in Burgas (May 2023) brought several hip-hop artists together.",
      [
        ['V:RGO', 'Named among the new wave.'],
        ['MurdaBoyz', 'Named among the new wave.'],
        ['MBT', 'Named among the new wave.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Several acts named here are from other Bulgarian cities.'),

  C('athens', 'Athens', 'Greece', 'Europe', [37.9838, 23.7275], 'Greek rap, from the 1990 first album to trap.', [
    E(1990, 1999, 'The Pioneers', ['greek', 'boom-bap'], 14,
      "Rap and hip-hop were first heard in Greece in the 1970s through a US military base. O.P.A.'s En+Taxei (1990) is described as the first Greek hip-hop album, and Active Member, formed in 1992 at a Public Enemy concert in Nikaia, released Diamartiria in 1993. Terror X Crew, Imiskoumbria and Zontanoi Nekroi followed.",
      [
        ['O.P.A.', 'Made En+Taxei, called the first Greek hip-hop album.'],
        ['Active Member', 'Formed in Nikaia in 1992.'],
        ['Terror X Crew', 'Released their single in 1995.'],
        ['Zontanoi Nekroi', 'Brought gangsta rap to Greece in 1997.'],
      ],
      [],
      [
        ['En+Taxei', 'O.P.A.', 1990],
        ['Diamartiria', 'Active Member', 1993],
        ['O Protos Tomos', 'Zontanoi Nekroi', 1998],
      ]),
    E(2000, 2009, 'Radio Hits', ['greek', 'boom-bap'], 22,
      "Imiskoumbria's \"Pame oli mazi se mia paralia\" was a major hit in 2001, Goin' Through had a hit with \"Poso malakas eisai\" in 2004, and Stavento had a radio hit with \"Mesa sou\" in 2007. Underground rap was promoted through HipHop.Gr and Atlantis FM.",
      [
        ['Imiskoumbria', 'Satirical act with a major 2001 hit.'],
        ["Goin' Through", 'Hit with "Poso malakas eisai" in 2004.'],
        ['Stavento', 'Radio hit with "Mesa sou" in 2007.'],
      ],
      [
        ['Pame oli mazi se mia paralia', 'Imiskoumbria', 2001],
        ['Poso malakas eisai', "Goin' Through", 2004],
        ['Mesa sou', 'Stavento', 2007],
      ]),
    E(2010, 2019, 'New Crews', ['greek', 'trap'], 26,
      "New crews such as Logos Timis, Joker/Two-Face and Fi Vita Sigma appeared, boom bap acts like Bloody Hawk and Mr.YO kept the tradition alive, and Lex's career grew substantially.",
      [
        ['Lex', 'Career grew substantially in the 2010s.'],
        ['Bloody Hawk', 'Boom bap act.'],
        ['Mr.YO', 'Boom bap act.'],
      ]),
    E(2020, 2026, 'Greek Rap Today', ['greek', 'trap'], 30,
      "Lex was still filling concerts in the Athens suburbs in 2022, and boom bap acts such as Zafko, Lobo and Poetic carry on the tradition.",
      [
        ['Lex', 'Held a concert in Nea Smyrni in 2022.'],
        ['Zafko', 'Boom bap act.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Song and album titles are written in Latin letters, and some tracks may not be on Apple.'),

  C('ndjamena', "N'Djamena", 'Chad', 'Africa', [12.1348, 15.0557], 'Hip-hop in French and verlan, with festivals in the capital.', [
    E(1990, 1999, 'Street Parties', ['african'], 6,
      "Hip-hop reached N'Djamena around the end of the 1980s. Young dancers imitated Vanilla Ice, MC Hammer and Shabba Ranks at neighbourhood parties, mostly in the south of the city. Komplyss and Les Banlyeuzars emerged in the early 1990s and were the first to present hip-hop to the general public, and Kamikazz performed at MASA in Abidjan in 1997.",
      [
        ['Komplyss', 'One of the first groups to present hip-hop to the public.'],
        ['Les Banlyeuzars', 'One of the first groups to present hip-hop to the public.'],
        ['Kamikazz', 'Performed at MASA in Abidjan in 1997.'],
      ]),
    E(2000, 2009, 'Génération 3R', ['african'], 8,
      "Génération 3R was founded by Célestin Mawndoé, Love Nixon, Takilal Ndolassem and Daïsson, and developed a style using verlan, French slang. The N'Djam Hip-Hop festival launched in 2005, and the N'Djamvi festival followed in 2007.",
      [
        ['Génération 3R', 'Association and group that developed a verlan style.'],
        ['T4J', 'Group led by Turbo, known as Imaam T.'],
      ]),
    E(2010, 2026, 'A New Generation', ['african'], 12,
      "A new generation of Chadian musicians has been shaking up the scene, according to recent local reports. N'Djam Hip-Hop and N'Djamvi remain the key stages in the capital.",
      [['Imaam T', 'Turbo, a leading voice and member of Génération 3R.']]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('abidjan', 'Abidjan', "Côte d'Ivoire", 'Africa', [5.36, -4.0083], 'Rap Ivoire: nouchi-language rap that finally broke through.', [
    E(1990, 2009, 'Coupé-décalé Country', ['african'], 8,
      "In Côte d'Ivoire, coupé-décalé long dominated popular music, and rap stayed on the margins. Young rappers kept freestyling in Abidjan's schools."),
    E(2010, 2019, 'The Rap Ivoire Wave', ['african'], 22,
      "Kiff No Beat (Didi B, Elow'n, Black K, El Jay and Joochar) helped renew Ivorian rap, rapping mainly in nouchi. Their hit \"Tu es dans pain\" came out in 2014, followed by Bop de Narr's \"L'Eau par mes narines\" (2015) and Suspect 95's \"Esseu C Forcé\" (2016).",
      [
        ['Kiff No Beat', 'Group that helped renew Ivorian rap.'],
        ['Didi B', 'Member of Kiff No Beat; went on to a solo career.'],
        ['Bop de Narr', 'Known as the "God of Punchlines".'],
        ['Suspect 95', 'Started freestyling in Abidjan\'s schools.'],
        ['MC One', 'Young rapper from the late 2010s.'],
      ],
      [
        ['Tu es dans pain', 'Kiff No Beat', 2014],
        ["L'Eau par mes narines", 'Bop de Narr', 2015],
        ['Esseu C Forcé', 'Suspect 95', 2016],
      ]),
    E(2020, 2026, 'Rap Takes Power', ['african'], 34,
      "In 2022 African media reported that Rap Ivoire was soaring in popularity in Côte d'Ivoire, with rappers such as Didi B, Suspect 95 and Billy Billy among the best-known names.",
      [
        ['Didi B', 'One of the best-known names in Rap Ivoire.'],
        ['Suspect 95', 'One of the best-known names in Rap Ivoire.'],
        ['Billy Billy', 'Rapper named in coverage of the scene.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('auckland', 'Auckland', 'New Zealand', 'Oceania', [-36.8485, 174.7633], 'Hip-hop with Māori and Pasifika voices.', [
    E(1990, 1999, "E Tū and How Bizarre", ['boom-bap', 'island'], 18,
      "Upper Hutt Posse's \"E Tū\" (1988) is regarded as the first New Zealand hip-hop single, rapping in te reo Māori. In 1995, Auckland group OMC had an international hit with \"How Bizarre\".",
      [
        ['Upper Hutt Posse', 'Pioneered rapping in te reo Māori.'],
        ['OMC', 'Auckland group behind the international hit "How Bizarre".'],
      ],
      [['How Bizarre', 'OMC', 1995]]),
    E(2000, 2009, 'Dawn Raid Era', ['boom-bap', 'island'], 26,
      "Auckland label Dawn Raid Entertainment, founded in 2002, put Pasifika hip-hop and R&B on the charts. Scribe's \"Stand Up\" and album The Crusader (2003) topped the charts, and Savage's \"Swing\" followed in 2008.",
      [
        ['Dawn Raid', 'Auckland label that brought Pasifika hip-hop to the charts.'],
        ['Scribe', 'Christchurch rapper whose debut album topped the charts.'],
        ['Savage', 'Auckland rapper behind "Swing".'],
      ],
      [
        ['Stand Up', 'Scribe', 2003],
        ['Swing', 'Savage', 2008],
      ],
      [['The Crusader', 'Scribe', 2003]]),
    E(2010, 2026, 'A Confident Scene', ['boom-bap', 'island', 'alt'], 30,
      "Auckland hip-hop continues to blend Māori, Pasifika and global influences, with acts such as Home Brew and Church & AP carrying the sound into the 2010s.",
      [
        ['Home Brew', 'Auckland crew of the 2010s.'],
        ['Church & AP', 'Auckland duo of the 2010s.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Some acts named here are from other New Zealand cities.'),

  C('nuuk', 'Nuuk', 'Greenland', 'North America', [64.1814, -51.6941], 'Inuit hip-hop in Kalaallisut, Danish and English.', [
    E(1990, 1999, 'Nuuk Posse', ['nordic'], 6,
      "The group formed in 1985 under another name and took the name Nuuk Posse in 1991. They rap in Kalaallisut, English and Danish, released the single \"Sussa Appinnagu\" in 1992, and the albums NP (1995) and Kaataq (1996, on the Belgian label Sub Rosa). They received Greenland's cultural prize in 1995.",
      [['Nuuk Posse', 'Inuit hip-hop group formed in 1985.']],
      [['Sussa Appinnagu', 'Nuuk Posse', 1992]],
      [
        ['NP', 'Nuuk Posse', 1995],
        ['Kaataq', 'Nuuk Posse', 1996],
      ]),
    E(2000, 2026, 'Messengers of Truth', ['nordic'], 8,
      "Nuuk Posse have toured Sweden, Germany, Spain, Belgium and Canada, and were nominated as \"Messengers of Truth\" by the United Nations in 2004.",
      [['Nuuk Posse', 'Nominated by the UN as Messengers of Truth in 2004.']]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('bogota', 'Bogotá', 'Colombia', 'Latin America', [4.711, -74.0721], 'Rap that came through films and parks, and a free festival.', [
    E(1990, 1999, 'Parks and Cassettes', ['latin', 'boom-bap'], 20,
      "Rap reached Colombia in the 1980s partly through films such as Beat Street, and it took root in marginalised neighbourhoods of Medellín, Cali, Barranquilla and Bogotá. Gotas de Rap, La Etnnia, Raza Gángster and Estilo Bajo became the most important Bogotá bands. In 1996, mayor Antanas Mockus proposed a public space that became Rap al Parque, later Hip Hop al Parque. AlcolyrikoZ formed in Medellín in 1999.",
      [
        ['La Etnnia', 'Bogotá brothers who became one of the most important rap groups in Colombia.'],
        ['Gotas de Rap', 'One of Bogotá\'s most important groups.'],
        ['Raza Gángster', 'One of Bogotá\'s most important groups.'],
        ['Estilo Bajo', 'One of Bogotá\'s most important groups.'],
        ['AlcolyrikoZ', 'Medellín group that emerged in 1999 in Aranjuez.'],
      ]),
    E(2000, 2009, 'Hip Hop al Parque', ['latin', 'conscious'], 26,
      "Hip Hop al Parque, now with breakdance and graffiti, became one of Bogotá's most important free events and partnered with Medellín's Altavoz festival. La Etnnia and AlcolyrikoZ were national flagships.",
      [
        ['La Etnnia', 'Flagship group of the national scene.'],
        ['AlcolyrikoZ', 'Flagship group of the national scene.'],
      ]),
    E(2010, 2019, 'Battles and Trap', ['latin', 'trap'], 36,
      "Batalla de los Gallos freestyle battles became a major part of the scene, and Colombian rap grew across Bogotá and Medellín.",
      [
        ['La Etnnia', 'Still a reference point.'],
        ['AlcolyrikoZ', 'Medellín flagship group.'],
      ]),
    E(2020, 2026, 'Rap Colombiano', ['latin', 'trap'], 38,
      "Rap colombiano continues to grow, with festivals and battles keeping the culture visible.",
      [
        ['La Etnnia', 'Veteran Bogotá group.'],
        ['AlcolyrikoZ', 'Medellín flagship group.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. The article gave no song or album titles. Medellín is also a major scene.'),

  C('quito', 'Quito', 'Ecuador', 'Latin America', [-0.1807, -78.4678], 'Hip-hop in Spanish and Quichua.', [
    E(1990, 2009, 'Early Years', ['latin'], 6,
      "Ecuadorian hip-hop came through breakdance, graffiti and rap, as elsewhere in Latin America. Little about this period was available in the sources I found."),
    E(2010, 2026, 'Mugre Sur & Runa Rap', ['latin', 'alt'], 12,
      "Quito group Mugre Sur, active for 23 years, mixes rap with popular Ecuadorian music and criticises corruption, racism and social injustice, performing in costumes. Inmortal Kultura from Cotacachi raps in Quichua. A hip-hop festival at Parque Cumandá in Quito in 2022 brought artists from the US, Puerto Rico, Mexico and Brazil.",
      [
        ['Mugre Sur', 'Quito group that mixes rap with popular Ecuadorian music.'],
        ['Inmortal Kultura', 'Cotacachi group that raps in Quichua.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Help expand it!'),

  C('san-jose', 'San José', 'Costa Rica', 'Latin America', [9.9281, -84.0907], 'From break-dance in La Sabana to a unified hip-hop culture.', [
    E(1990, 1999, 'Reggae Meets Hip-Hop', ['latin', 'boom-bap'], 8,
      "In 1990, rappers performed at the anniversary concert of the TV show Hola Juventud, called the first milestone in local hip-hop history. Ragga by Roots (1996) mixed reggae and hip-hop and became one of the most iconic bands in Costa Rican popular music. Tapón's Creada a mi manera (1997) launched a new generation.",
      [
        ['Ragga by Roots', 'Mixed reggae and hip-hop in 1996.'],
        ['Tapón', 'Creada a mi manera (1997) launched a new generation.'],
        ['Natural Vibes', 'Rap group of the period.'],
      ],
      [],
      [['Creada a mi manera', 'Tapón', 1997]]),
    E(2000, 2009, 'Radicales', ['latin', 'boom-bap'], 10,
      "The Radicales compilations, backed by Sony Music, sold well into the early 2000s. Reggaetón rose, rap briefly declined, then resurged in the second half of the decade, and from 2008 the culture began to unify.",
      [
        ['Squad', 'Blended hip-hop with soul and R&B.'],
        ['3scrivas', 'Named among the artists of the late-2000s revival.'],
        ['Yaco', 'Named among the artists of the late-2000s revival.'],
      ]),
    E(2010, 2026, 'Unified Culture', ['latin', 'trap'], 14,
      "Festivals like Epicentro Urbano brought all hip-hop disciplines together, and artists such as Las Viejas de Patio, Crypy and GaB carried the scene forward.",
      [
        ['Las Viejas de Patio', 'Named among the artists of the scene.'],
        ['Crypy', 'Named among the artists of the scene.'],
        ['GaB', 'Named among the artists of the scene.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. The source did not name San José as the city; the culture spreads across the country.'),

  C('tripoli', 'Tripoli', 'Libya', 'Africa', [32.8872, 13.1913], 'Rap of the revolution, and of exile.', [
    E(1990, 2009, 'Before the Revolution', ['arabic'], 2,
      "The sources I found document Libyan rap only in the years just before the 2011 uprising."),
    E(2010, 2019, 'Revolution Rap', ['arabic', 'conscious'], 14,
      "Ibn Thabit, a UK-based rapper, released pro-revolution songs before the 2011 uprising, and rap artists performed in Martyrs Square in Tripoli. Qaddafi was killed in October 2011. In 2012 young rappers launched Radio Zone, and MC Swat released \"Benghazistan\" in 2013. Swat fled Libya by boat in 2017.",
      [
        ['Ibn Thabit', 'UK-based rapper who released pro-revolution songs.'],
        ['MC Swat', 'Rapper who left Libya by boat in 2017.'],
        ['Mohammad al-Houni', 'Rapped about corruption and brutality at 17.'],
        ['Black Tiger', 'Rapper behind "Soldiers of Benghazi".'],
      ],
      [['Benghazistan', 'MC Swat', 2013]]),
    E(2020, 2026, 'Still Rapping', ['arabic'], 8,
      "Little about recent years was available in the sources I found. Libyan rappers continue to work in the shadow of an unstable political situation.",
      [['MC Swat', 'Rapped from exile.']]),
  ], 'A small profile: this lists only what could be confirmed. Several artists named here are linked to Benghazi rather than Tripoli.'),

  C('riyadh', 'Riyadh', 'Saudi Arabia', 'Middle East', [24.7136, 46.6753], 'Saudi rap from the early years to a thriving scene.', [
    E(1990, 1999, 'First Recordings', ['arabic'], 4,
      "Qusai Kheder, considered one of Saudi Arabia's first rappers, began recording in 1994."),
    E(2000, 2009, 'Underground', ['arabic'], 8,
      "Hip-hop emerged in Saudi Arabia in the early 2000s, and a few artists reshaped the scene in 2005 and 2006. Klash, one of the first rappers in the kingdom, was sentenced in 2007 to three months in jail over his song \"Mother\".",
      [
        ['Qusai', 'Active for over 30 years.'],
        ['Klash', 'One of the first rappers in the kingdom.'],
      ]),
    E(2010, 2019, 'Online and Onstage', ['arabic', 'trap'], 14,
      "In 2011, Jeddah-born Big Hass presented his first radio show. Saudi Arabia was the top YouTube user per capita in 2013, and more than 5,000 rap and hip-hop shows were staged in 2018, double the 2017 figure.",
      [
        ['Lil Eazy', 'Mostly raps about having fun.'],
        ['Skinny', 'Received death threats over a song.'],
        ['Shiboba', 'Raps in Arabic from Mecca about social issues.'],
      ]),
    E(2020, 2026, 'A Thriving Scene', ['arabic', 'trap'], 22,
      "By 2023, Saudi hip-hop was described by The National as thriving, with artists such as Lil Eazy a stalwart of the scene.",
      [
        ['Lil Eazy', 'Stalwart of the Saudi hip-hop scene.'],
        ['Shiboba', 'Raps in Arabic about community issues.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Many artists named here are based in Jeddah or Mecca.'),

  C('ulaanbaatar', 'Ulaanbaatar', 'Mongolia', 'Asia', [47.8864, 106.9057], 'Mongolian hip-hop: techno-rap, throat singing and Mongolian Bling.', [
    E(1990, 1999, 'Techno-Rap', ['mongolian'], 12,
      "MC Boys formed at the end of the 1980s and is described as the first Mongolian rap group. Khar Sarnai (Black Rose) formed in 1991, and Khar Tas's \"Clouded Sky\" (c. 1992) is considered the first Mongolian hip-hop music video. Economic hardship led many groups to disappear, and the second half of the decade brought Dain ba Enkh, Ice Top, Lumino, MCIT and 2 Khüü.",
      [
        ['MC Boys', 'First Mongolian rap group.'],
        ['Khar Sarnai', 'Black Rose; techno-rap formed in 1991.'],
        ['Khar Tas', 'Techno-rap band that commented on the transition period.'],
        ['Dain ba Enkh', 'Political and social lyrics with R&B and disco-funk.'],
      ],
      [['Clouded Sky', 'Khar Tas', 1992]]),
    E(2000, 2009, 'Second Generation', ['mongolian', 'boom-bap'], 20,
      "Ice Top reworked a Dr. Dre track in \"Bi hendch hereggüi\" (2001), Lumino's \"Namaig dagaad tsenge\" (2002) had its video banned, which only made it more popular, and \"Hüniih\" (2004) was one of Lumino's biggest hits. Click Click Boom, Tatar, ThunderZ and Young Mo'G made up the new generation.",
      [
        ['Ice Top', 'Wrote "Bi hendch hereggüi" and "Iluu".'],
        ['Lumino', 'Behind "Namaig dagaad tsenge" and "Hüniih".'],
        ['Tatar', 'Gained fame when its members were 18.'],
        ['Quiza', 'Used G-funk.'],
      ],
      [
        ['Bi hendch hereggüi', 'Ice Top', 2001],
        ['Namaig dagaad tsenge', 'Lumino', 2002],
        ['Hüniih', 'Lumino', 2004],
        ['Iluu', 'Ice Top', 2009],
      ]),
    E(2010, 2026, 'Mongolian Bling', ['mongolian', 'alt'], 28,
      "XL and Metune began using traditional instruments and throat singing, and ThunderZ and Young Mo'G blended hip-hop with Mongolian traditional styles. The documentary Mongolian Bling (2012) covered the scene.",
      [
        ['ThunderZ', 'Blends hip-hop with Mongolian tradition.'],
        ["Young Mo'G", 'Wrote "Naadii" and "Mongol Swag".'],
        ['Rokit Bay', 'Wrote "Neg ödriin haan" (2010).'],
      ],
      [['Neg ödriin haan', 'Rokit Bay', 2010]]),
  ]),

  C('manila', 'Manila', 'Philippines', 'Southeast Asia', [14.5995, 120.9842], 'Pinoy rap: Tagalog rhymes, FlipTop battles and a global star.', [
    E(1990, 1999, 'Pinoy Rap Hits', ['sea', 'boom-bap'], 20,
      "Francis M's \"Mga Kababayan Ko\" and Andrew E's \"Humanap Ka ng Panget\" (both 1990) brought Tagalog rap to the mainstream.",
      [
        ['Francis M', 'Francis Magalona, a pioneer of Pinoy rap.'],
        ['Andrew E', 'Mainstream Pinoy rap star.'],
      ],
      [
        ['Mga Kababayan Ko', 'Francis M', 1990],
        ['Humanap Ka ng Panget', 'Andrew E', 1990],
      ]),
    E(2000, 2009, 'Going Global', ['sea', 'boom-bap'], 28,
      "Filipino-American rapper Apl.de.ap, from Angeles City, brought Filipino pride to a worldwide audience with the Black Eyed Peas, including \"The Apl Song\" (2003).",
      [
        ['Apl.de.ap', 'Black Eyed Peas member from Angeles City.'],
        ['Gloc-9', 'Became one of the leading voices of Pinoy rap.'],
      ],
      [['The Apl Song', 'Black Eyed Peas', 2003]]),
    E(2010, 2019, 'FlipTop Era', ['sea', 'conscious', 'trap'], 34,
      "The FlipTop battle league started in 2010 and became a cornerstone of the culture. Gloc-9's \"Sirena\" (2013) and \"Upuan\" (2012) are among his best-known songs, and Shanti Dope's \"Nadarang\" (2018) became a hit.",
      [
        ['Gloc-9', 'Pinoy rap\'s most celebrated storyteller.'],
        ['Shanti Dope', 'Young rapper behind the 2018 hit "Nadarang".'],
        ['Loonie', 'Rapper and battle star.'],
      ],
      [
        ['Upuan', 'Gloc-9 ft. Jeazell Grutas', 2012],
        ['Sirena', 'Gloc-9 ft. Ebe Dancel', 2013],
        ['Nadarang', 'Shanti Dope', 2018],
      ]),
    E(2020, 2026, 'A Global Scene', ['sea', 'trap'], 36,
      "Filipino rap has grown on streaming and social platforms. FlipTop battles, Gloc-9 and a new generation keep the culture visible.",
      [
        ['Gloc-9', 'Still active and widely respected.'],
        ['Shanti Dope', 'Young star of the scene.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed.'),

  C('lisbon', 'Lisbon', 'Portugal', 'Europe', [38.7223, -9.1393], 'Hip hop tuga: Portuguese, Creole and the sound of the suburbs.', [
    E(1990, 1999, 'The Pioneers', ['tuga', 'boom-bap'], 16,
      "General D, born in Maputo and raised in Lisbon, signed with Valentim de Carvalho (EMI) in 1994 and released Pé Na Tchôn, Karapinha Na Céu (1995) and Kanimabo (1997). The 1994 compilation Rapublica put the first generation of Portuguese rappers on record, and Boss AC, Mind da Gap, Dealema, Mundo Segundo and Chullage came up in the same years. American artist Ithaka lived and recorded in Lisbon from 1992 to 1998. Sam the Kid, from Chelas, debuted with Entre(tanto) in 1999, recorded alone at home.",
      [
        ['General D', 'Born in Maputo, raised in Lisbon; often called the founder of hip hop tuga.'],
        ['Boss AC', 'Lisbon rapper from the first generation.'],
        ['Mind da Gap', 'Old-school group.'],
        ['Dealema', 'Old-school group.'],
        ['Sam the Kid', 'Chelas rapper and producer.'],
      ],
      [],
      [
        ['Pé Na Tchôn, Karapinha Na Céu', 'General D', 1995],
        ['Kanimabo', 'General D', 1997],
        ['Entre(tanto)', 'Sam the Kid', 1999],
      ]),
    E(2000, 2009, 'Hip-Hop Tuga Finds Its Voice', ['tuga', 'conscious'], 24,
      "Sam the Kid's Pratica(mente) (2006) is described as his best work, Valete's politically engaged Serviço Público came out the same year, and Halloween released Projecto Mary Witch (2006). Regula's mixtapes Kara Davis (2007) and Kara Davis Vol.2 Lisa Chu (2009) followed.",
      [
        ['Sam the Kid', 'Songs such as "Poetas de Karaoke" and "Não Percebes".'],
        ['Valete', 'Politically engaged; songs such as "Roleta Russa" and "Anti-Heroi".'],
        ['Halloween', 'Released Projecto Mary Witch in 2006.'],
        ['Regula', 'Mixtape series Kara Davis.'],
      ],
      [],
      [
        ['Pratica(mente)', 'Sam the Kid', 2006],
        ['Serviço Público', 'Valete', 2006],
        ['Projecto Mary Witch', 'Halloween', 2006],
        ['Kara Davis', 'Regula', 2007],
      ]),
    E(2010, 2019, 'Albums and Arenas', ['tuga', 'alt'], 30,
      "Regula released Gancho (2013) and Casca Grossa (2015), and Halloween's Híbrido (2015) appeared on many Portuguese album-of-the-year lists. Orelha Negra's best-known single is \"Solteiro\", with Sam the Kid, Regula and Heber & Roulet. Piruka's \"Se Eu Não Acordar Amanhã\" has the most views of any hip hop tuga song on YouTube. On 8 March 2019, the concert A História Do Hip-Hop Tuga filled the Altice Arena in Lisbon.",
      [
        ['Orelha Negra', 'Super group of previously independent artists.'],
        ['Piruka', 'New-school rapper with the most-watched hip hop tuga song on YouTube.'],
        ['Regula', 'Released Gancho and Casca Grossa.'],
        ['Halloween', 'Híbrido (2015).'],
      ],
      [],
      [
        ['Gancho', 'Regula', 2013],
        ['Híbrido', 'Halloween', 2015],
        ['Casca Grossa', 'Regula', 2015],
      ]),
    E(2020, 2026, 'A New Generation', ['tuga', 'trap'], 34,
      "Piruka, Valete and Sam the Kid are among the most popular names, and Plutónio carries the trap sound of the new generation.",
      [
        ['Piruka', 'Among the most popular new-school rappers.'],
        ['Plutónio', 'Trap-influenced rapper of the new generation.'],
        ['Sam the Kid', 'Veteran still among the most popular artists.'],
      ]),
  ], 'A small profile: this lists only what could be confirmed. Some acts named here come from other parts of Portugal, such as Capicua from Porto.'),
]
