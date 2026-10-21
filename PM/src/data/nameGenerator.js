// ============================================================================
// NAME GENERATOR
// A flat list of 40 names made every life feel like the same street. Names here
// are assembled from a culture (the City pulls people from everywhere), a given
// name, a family name and, in the Backstreets, a street alias that people
// actually use. The district nudges which cultures are likely, so District 8
// sounds like Hongyuan and District 14 sounds like Nagel und Hammer.
// ============================================================================

const pick = (list, rng) => list[Math.floor(rng() * list.length) % list.length];

const CULTURES = {
  korean: {
    given: ['Seo-yeon', 'Min-jae', 'Ha-eun', 'Do-yun', 'Ji-ho', 'Yeon-woo', 'Soo-ah', 'Tae-oh', 'Bora', 'Hyun-seok', 'Mi-rae', 'Jun-seo', 'Ah-ri', 'Dae-ho', 'Na-yeon', 'Kang-min', 'Ye-jin', 'Sung-hoon', 'Eun-bi', 'Woo-jin'],
    family: ['Kim', 'Oh', 'Baek', 'Yoon', 'Han', 'Seo', 'Gwon', 'Ryu', 'Shin', 'Jang', 'Hwang', 'Moon']
  },
  chinese: {
    given: ['Wen Hao', 'Mei Ling', 'Zhi Ruo', 'Bo Yan', 'Xiu Lan', 'Jian Yu', 'Li Na', 'Chen Xi', 'Yue Qing', 'Tao', 'Hui Min', 'Feng', 'Ying Zhao', 'Ming Zhe', 'Lan Yin', 'Qiang'],
    family: ['Jia', 'Xue', 'Wang', 'Shi', 'Lin', 'Zhou', 'Gu', 'Tang', 'Ye', 'Luo', 'Cheng', 'Du']
  },
  japanese: {
    given: ['Haruka', 'Ren', 'Sora', 'Kaito', 'Aoi', 'Daichi', 'Mio', 'Shun', 'Natsuki', 'Ryoma', 'Chihiro', 'Takumi', 'Emi', 'Kenji', 'Sayo', 'Isamu'],
    family: ['Mori', 'Kurose', 'Tachibana', 'Sakai', 'Ogawa', 'Ishida', 'Hayashi', 'Fujiwara', 'Kagami', 'Nomura', 'Yamabe', 'Kuroki']
  },
  german: {
    given: ['Matthias', 'Liesel', 'Ansgar', 'Katrin', 'Konrad', 'Ilse', 'Rainer', 'Wilhelmina', 'Dieter', 'Hanne', 'Lorenz', 'Margit', 'Jonas', 'Elke', 'Falk', 'Brigitte'],
    family: ['Reiner', 'Brandt', 'Kessler', 'Vogt', 'Hartmann', 'Lenz', 'Weiss', 'Adler', 'Roth', 'Faber', 'Keller', 'Sommer']
  },
  russian: {
    given: ['Ilya', 'Katya', 'Pavel', 'Zoya', 'Dmitri', 'Anya', 'Lev', 'Nadia', 'Oleg', 'Vera', 'Misha', 'Tamara', 'Vadim', 'Svetlana', 'Roman', 'Galina'],
    family: ['Volkov', 'Morozov', 'Orlova', 'Sokolov', 'Zaitsev', 'Belova', 'Kuznetsov', 'Lebedev', 'Petrenko', 'Smirnova', 'Fedorov', 'Gromov']
  },
  french: {
    given: ['Camille', 'Mathis', 'Odile', 'Lucien', 'Margaux', 'Étienne', 'Solène', 'Basile', 'Inès', 'Théo', 'Colette', 'Anselme', 'Jeanne', 'Rémy', 'Agathe', 'Gaspard'],
    family: ['Roux', 'Delacroix', 'Marchand', 'Fontaine', 'Lemaire', 'Girard', 'Vasseur', 'Brun', 'Moreau', 'Dubois', 'Laurent', 'Perrin']
  },
  hispanic: {
    given: ['Mateo', 'Lucía', 'Rafael', 'Inés', 'Joaquín', 'Marisol', 'Tomás', 'Esperanza', 'Diego', 'Pilar', 'Emilio', 'Catalina', 'Santiago', 'Rosario', 'Bruno', 'Valeria'],
    family: ['Vidal', 'Ortega', 'Navarro', 'Castillo', 'Herrera', 'Mendoza', 'Salinas', 'Cordero', 'Paredes', 'Rivas', 'Ibarra', 'Luna']
  },
  english: {
    given: ['Edmund', 'Hazel', 'Silas', 'Nell', 'Ambrose', 'Wren', 'Thaddeus', 'Maude', 'Rhys', 'Ivy', 'Corwin', 'Beatrice', 'Alder', 'Dorothea', 'Jasper', 'Tess'],
    family: ['Hale', 'Marlowe', 'Ashby', 'Pryce', 'Thorne', 'Wick', 'Fenwick', 'Calloway', 'Dunmore', 'Rook', 'Sterling', 'Harrow']
  }
};

// Which cultures a district leans toward (weights). Anything not listed uses a mixed City crowd.
const REGION_LEAN = {
  H: { chinese: 6, korean: 1, japanese: 1 },
  S: { korean: 5, japanese: 3, chinese: 1 },
  J: { chinese: 3, hispanic: 4, english: 1 },
  N: { german: 6, english: 1 },
  Y: { russian: 6, german: 1 },
  P: { french: 4, hispanic: 1, german: 1 },
  U: { english: 3, russian: 2, japanese: 1 },
  W: { english: 2, japanese: 2, korean: 2, french: 2 },
  T: { english: 3, german: 2, french: 2 },
  OUTSKIRTS: { russian: 2, hispanic: 2, korean: 2, english: 2, german: 1 }
};
const MIXED = { korean: 3, chinese: 2, japanese: 2, german: 2, russian: 2, french: 2, hispanic: 2, english: 2 };

// Street aliases: what the Backstreets actually call a person. Reads naturally in both languages.
const ALIAS_ADJ = ['Six-Toed', 'Soft', 'Ashen', 'Crooked', 'Lantern', 'Quiet', 'Rusty', 'Pale', 'Two-Coat', 'Needle', 'Tallow', 'Hollow', 'Lucky', 'Dry', 'Narrow', 'Salt'];
const ALIAS_NOUN = ['Mouse', 'Crow', 'Ledger', 'Wick', 'Thimble', 'Rook', 'Gutter', 'Pawn', 'Moth', 'Brass', 'Cricket', 'Nail', 'Sparrow', 'Latch', 'Dust', 'Ferret'];

function weightedCulture(regionId, rng) {
  const table = REGION_LEAN[regionId] ? { ...MIXED, ...Object.fromEntries(Object.entries(MIXED).map(([k]) => [k, 1])), ...REGION_LEAN[regionId] } : MIXED;
  const entries = Object.entries(table);
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let roll = rng() * total;
  for (const [culture, w] of entries) {
    roll -= w;
    if (roll <= 0) return culture;
  }
  return entries[0][0];
}

/**
 * Returns { name, alias, full } where `name` is what the game calls the person.
 * Backstreets people are usually known by given name or alias; Nest people keep a family name.
 */
export function generatePersonName(rng, { regionId = null, nest = false, forceAlias = false } = {}) {
  const culture = CULTURES[weightedCulture(regionId, rng)];
  const given = pick(culture.given, rng);
  const family = pick(culture.family, rng);
  const hasAlias = forceAlias || (!nest && rng() < 0.32);
  const alias = hasAlias ? `${pick(ALIAS_ADJ, rng)} ${pick(ALIAS_NOUN, rng)}` : null;
  const full = `${given} ${family}`;
  // Nest households use full names, Backstreets use short ones, and an alias wins on the street.
  const name = nest ? full : alias && rng() < 0.55 ? alias : rng() < 0.5 ? given : full;
  return { name, alias, given, family, full };
}
