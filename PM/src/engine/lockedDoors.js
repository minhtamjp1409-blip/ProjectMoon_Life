import GATES from '../data/careerGates.json' with { type: 'json' };
import { describeNeedGaps, isColorFixerChar, isOutsideCity, jobMatchesWithInheritance, matchesNeed } from './eventConditions.js';

const BIRTH_ONLY_FLAGS = new Set([
  'SmokeWarVet',
  'OutcastChild',
  'Outskirts',
  'BackstreetOrphan',
  'SyndicateFamily',
  'WorkshopKid',
  'DieciScholar',
  'GreatLakeSurvivor',
  'WarpPassenger'
]);

const stripBrackets = (text = '') => String(text || '').replace(/^\[|\]$/g, '').trim();

function extractHook(event) {
  const rawVi = stripBrackets(event.titleVi || '');
  const rawEn = stripBrackets(event.titleEn || '');
  if (rawVi) {
    return {
      vi: rawVi,
      en: rawEn || rawVi
    };
  }
  const snippetVi = String(event.vi || '').split(/[.!?]/)[0].trim();
  const snippetEn = String(event.en || '').split(/[.!?]/)[0].trim();
  return {
    vi: snippetVi.slice(0, 72) || 'Cửa chưa mở trong khu phố',
    en: snippetEn.slice(0, 72) || 'Unopened city threshold'
  };
}

function buildGateDoors(char, openedSet) {
  const doors = [];
  const age = char?.age || 0;
  const isDistorted = Boolean(char?.flags?.includes('Distorted') || char?.job === 'Distortion');
  if (isDistorted) return doors;

  if (char?.job === 'Fixer' || char?.job === 'Child') {
    const curGrade = char?.job === 'Fixer' ? (char.fixerGrade ?? 9) : 9;
    const isChild = char?.job === 'Child';
    const nextTier = (GATES.fixer || []).find((tier) => (isChild ? tier.grade === 8 : tier.grade < curGrade) && !openedSet.has(`gate:fixer:${tier.grade}`));
    if (nextTier) {
      doors.push({
        id: `gate:fixer:${nextTier.grade}`,
        source: 'gate',
        ageRange: [18, 99],
        titleVi: `Kỳ sát hạch Fixer Grade ${nextTier.grade}`,
        titleEn: `Fixer Grade ${nextTier.grade} exam`,
        need: { jobs: ['Fixer'], meritAtLeast: nextTier.merit, stat: { rep: [nextTier.rep, 100] } }
      });
    }
    if (char?.job === 'Fixer' && curGrade <= 4 && !isColorFixerChar(char) && !openedSet.has('gate:color')) {
      doors.push({
        id: 'gate:color',
        source: 'gate',
        ageRange: [GATES.color?.age || 30, GATES.color?.oldestAge || 46],
        titleVi: 'Ngưỡng phong danh Color Fixer của Hana',
        titleEn: 'Hana Color Fixer nomination',
        need: {
          jobs: ['Fixer'],
          grade: [1, 2],
          meritAtLeast: GATES.color?.merit || 260,
          stat: { rep: [GATES.color?.rep || 90, 100] }
        }
      });
    }
  }

  if (char?.job === 'Syndicate' || char?.job === 'Child') {
    const curRank = char?.job === 'Syndicate' ? (char.fingerRank ?? 0) : 0;
    const isChild = char?.job === 'Child';
    const nextRank = (GATES.finger || []).find((tier) => (isChild ? tier.rank === 1 : tier.rank > curRank) && !openedSet.has(`gate:finger:${tier.rank}`));
    if (nextRank && age <= 75) {
      const rankStat = { rep: [nextRank.rep, 100], ...(nextRank.network > 0 ? { network: [nextRank.network, 100] } : {}) };
      doors.push({
        id: `gate:finger:${nextRank.rank}`,
        source: 'gate',
        ageRange: [18, 80],
        titleVi: `Bậc ${nextRank.rank} trong Syndicate`,
        titleEn: `Syndicate Rank ${nextRank.rank}`,
        need: { jobs: ['Syndicate'], meritAtLeast: nextRank.merit, stat: rankStat }
      });
    }
  }

  if (char?.job === 'Wing Employee' || char?.job === 'Child') {
    const curRank = char?.job === 'Wing Employee' ? (char.wingRank ?? 0) : 0;
    const isChild = char?.job === 'Child';
    const nextWing = (GATES.wing || []).find((tier) => (isChild ? tier.rank === 1 : tier.rank > curRank) && !openedSet.has(`gate:wing:${tier.rank}`));
    if (nextWing && age <= 75) {
      doors.push({
        id: `gate:wing:${nextWing.rank}`,
        source: 'gate',
        ageRange: [18, 80],
        titleVi: `Vị trí bậc ${nextWing.rank} ở Wing`,
        titleEn: `Wing Rank ${nextWing.rank} post`,
        need: {
          jobs: ['Wing Employee'],
          meritAtLeast: nextWing.merit,
          stat: { wealth: [nextWing.wealth, 100], network: [nextWing.network, 100] }
        }
      });
    }
  }

  return doors;
}

function isReachableThisLife(event, char, age) {
  if (!event || !event.need || !Object.keys(event.need).length) return false;
  if (event.causalOnly || event.isCausalCallback) return false;
  if (String(event.id || '').startsWith('ev_open_') && age >= 8) return false;

  const need = event.need;
  if (Array.isArray(event.age)) {
    const [minA, maxA] = event.age;
    if (maxA != null && maxA < age) return false;
    if (minA != null && minA > age + 20) return false;
  }

  const flags = char.flags || [];
  if (Array.isArray(need.flags)) {
    for (const f of need.flags) {
      if (BIRTH_ONLY_FLAGS.has(f) && !flags.includes(f)) return false;
    }
  }
  if (Array.isArray(need.noFlags) && need.noFlags.some((f) => flags.includes(f))) return false;
  if (need.finger && char.finger && need.finger !== char.finger) return false;
  if (need.noFinger && char.finger) return false;
  if (need.out && !isOutsideCity(char) && age >= 18) return false;
  if (need.notOut && isOutsideCity(char) && char.regionId === 'OUTSKIRTS') return false;

  if (Array.isArray(need.jobs) && char.job && char.job !== 'Child') {
    if (!jobMatchesWithInheritance(need.jobs, char, event)) return false;
  }
  return true;
}

function extractTargets(need = {}) {
  return {
    stats: need.stat ? Object.fromEntries(Object.entries(need.stat).map(([k, [lo]]) => [k, lo])) : {},
    regions: need.regions ? [...need.regions] : [],
    jobs: need.jobs ? [...need.jobs] : [],
    finger: need.finger || null,
    meritAtLeast: need.meritAtLeast ?? null,
    grade: need.grade ? [...need.grade] : null,
    nest: Boolean(need.nest),
    back: Boolean(need.back)
  };
}

function formatDoor(candidate, char) {
  const gaps = describeNeedGaps(candidate.need, char, 3);
  if (!gaps.length) return null;
  const hook = candidate.source === 'gate'
    ? { vi: candidate.titleVi, en: candidate.titleEn }
    : extractHook(candidate);
  const reqVi = `Cần ${gaps.map((g) => g.vi).join(' và ')}.`;
  const reqEn = `Needs ${gaps.map((g) => g.en).join(' and ')}.`;
  return {
    id: candidate.id,
    source: candidate.source || 'event',
    hookVi: hook.vi,
    hookEn: hook.en,
    reqVi,
    reqEn,
    hintVi: `${hook.vi}. ${reqVi}`,
    hintEn: `${hook.en}. ${reqEn}`,
    need: candidate.need,
    targets: extractTargets(candidate.need),
    opened: false
  };
}

const hashText = (text) => {
  let h = 2166136261;
  const s = String(text || '');
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

function makeLocalRng(seedText) {
  let a = hashText(seedText) || 1;
  return () => {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function isDoorBoundaryAge(age) {
  return age === 0 || (age >= 10 && age % 10 === 0);
}

/**
 * Selects 2-3 reachable locked doors for the current life & decade,
 * reading conditions exclusively from careerGates.json and eventConditions.js.
 */
export function pickVisibleLockedDoors(char, { events = [], openedDoors = [], count = 3 } = {}) {
  if (!char) return [];
  const age = Number(char.age || 0);
  const decade = Math.floor(age / 10) * 10;
  const localRng = makeLocalRng(`${char.seed || char.name || 'door'}:doors:${decade}:${openedDoors?.length || 0}`);
  const openedSet = new Set([
    ...(openedDoors || []),
    ...(char.openedDoors || []),
    ...(char.seenEvents || []),
    ...(char.unlockedRecords || []).map((k) => String(k).replace(/^door:/, ''))
  ]);

  const rawGates = buildGateDoors(char, openedSet)
    .filter((gate) => !matchesNeed(gate.need, char, gate));

  const rawEvents = (events || []).filter((ev) => {
    if (!ev?.major || !ev.id || openedSet.has(ev.id)) return false;
    if (!isReachableThisLife(ev, char, age)) return false;
    if (matchesNeed(ev.need, char, ev)) return false;
    return true;
  });

  // Prioritize doors that have explicit quantitative or District conditions players can actively pursue
  const scoreDoor = (ev) => {
    const need = ev.need || {};
    let score = ev.source === 'gate' ? 2 : 1;
    if (need.stat) score += 3;
    if (need.regions) score += 2;
    if (need.meritAtLeast != null) score += 1.5;
    if (need.bondAtLeast || need.npc) score += 1.5;
    if (need.grade || need.wingRankAtLeast != null || need.fingerRankAtLeast != null || need.syndicateRankAtLeast != null) score += 1.5;
    if (Array.isArray(ev.age) && ev.age[0] >= age && ev.age[0] <= age + 12) score += 1.5;
    return score + localRng() * 9;
  };

  const formattedGates = rawGates
    .map((g) => ({ raw: g, formatted: formatDoor(g, char), score: scoreDoor(g) }))
    .filter((x) => x.formatted)
    .sort((a, b) => b.score - a.score);

  const formattedEvents = rawEvents
    .map((ev) => ({ raw: ev, formatted: formatDoor(ev, char), score: scoreDoor(ev) }))
    .filter((x) => x.formatted)
    .sort((a, b) => b.score - a.score);

  const selected = [];
  const usedIds = new Set();

  // Group story-event doors by route bucket so one high-volume faction (e.g., 5 Fingers) never crowds out Wing/Fixer/District paths
  const bucketOf = (item) => {
    const jobs = item.formatted?.targets?.jobs || [];
    if (jobs.includes('Wing Employee')) return 'wing';
    if (jobs.includes('Fixer') || jobs.includes('Color Fixer')) return 'fixer';
    if (jobs.includes('Syndicate') || item.raw?.need?.finger) return 'syndicate';
    return 'general';
  };
  const buckets = { general: [], fixer: [], wing: [], syndicate: [] };
  for (const item of formattedEvents) {
    buckets[bucketOf(item)].push(item);
  }
  // Rotate bucket priority deterministically across seeds/generations so different lives aim at different City corridors
  const bucketOrder = ['general', 'fixer', 'wing', 'syndicate'];
  const rot = Math.floor(localRng() * bucketOrder.length);
  const rotated = [...bucketOrder.slice(rot), ...bucketOrder.slice(0, rot)];

  const takeFromItem = (item) => {
    if (!item || selected.length >= count || usedIds.has(item.formatted.id)) return false;
    usedIds.add(item.formatted.id);
    selected.push(item.formatted);
    return true;
  };

  // Pick 1 event from rotated primary bucket, 1 matching or alternate gate, then diversify remaining slots
  for (const key of rotated) {
    if (selected.length >= 2) break;
    takeFromItem(buckets[key][0]);
  }
  const primaryBucket = rotated[0];
  const matchingGate = formattedGates.find((g) => bucketOf(g) === primaryBucket) || formattedGates[0];
  if (matchingGate && selected.length < count) {
    takeFromItem(matchingGate);
  }
  for (const item of formattedEvents) {
    if (selected.length >= count) break;
    takeFromItem(item);
  }
  for (const item of formattedGates) {
    if (selected.length >= count) break;
    takeFromItem(item);
  }

  return selected.slice(0, count);
}

/** Records that a locked door (event or career gate) has been opened on the current run. */
export function markOpenedDoor(char, doorId) {
  if (!char || !doorId) return char;
  if (!Array.isArray(char.openedDoors)) char.openedDoors = [];
  if (!char.openedDoors.includes(doorId)) char.openedDoors.push(doorId);
  if (Array.isArray(char.visibleDoors)) {
    char.visibleDoors = char.visibleDoors.map((d) => (d.id === doorId ? { ...d, opened: true } : d));
  }
  return char;
}

/** Refreshes `char.visibleDoors` at birth and at each decade (`10, 20, 30...`), and marks newly unlocked doors as opened. */
export function syncVisibleDoorsForChar(char, { events = [], openedDoors = [], rng = Math.random } = {}) {
  if (!char) return char;
  const age = Number(char.age || 0);
  const decade = Math.floor(age / 10) * 10;

  if (!Array.isArray(char.openedDoors)) char.openedDoors = [];

  // Mark any current door already satisfied or event seen as opened
  if (Array.isArray(char.visibleDoors)) {
    for (const door of char.visibleDoors) {
      const seen = (char.seenEvents || []).includes(door.id);
      const metNow = door.need && matchesNeed(door.need, char, door);
      if ((seen || metNow) && !door.opened) {
        markOpenedDoor(char, door.id);
      }
    }
  }

  if (char.doorsDecade == null || (age >= 10 && char.doorsDecade < decade)) {
    char.doorsDecade = decade;
    char.visibleDoors = pickVisibleLockedDoors(char, {
      events,
      openedDoors: [...openedDoors, ...char.openedDoors],
      rng,
      count: 3
    });
  }
  return char;
}
