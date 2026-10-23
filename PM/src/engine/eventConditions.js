import { effectiveMinAge } from './careerAge.js';
import { hasScarTag } from './scarModel.js';
import { getAffiliation, laneOf } from './affiliation.js';

export const npcIsActive = (npc) => Boolean(npc) && npc.alive !== false && !npc.deceased && !['dead', 'missing', 'estranged', 'betrayer'].includes(npc.status);
export const isNestResident = (char) => ['Nest', 'NestResident', 'Feather'].some((f) => char.flags?.includes(f));
export const isOutsideCity = (char) => char.regionId === 'OUTSKIRTS' || char.flags?.includes('Outskirts');

function regionMatchesList(allowedRegions, regionId) {
  if (!Array.isArray(allowedRegions) || allowedRegions.length === 0) return true;
  if (!regionId) return false;
  if (allowedRegions.includes(regionId)) return true;
  if (typeof regionId === 'string' && regionId.length === 1 && regionId >= 'A' && regionId <= 'Z') {
    const wardStr = String(regionId.charCodeAt(0) - 64);
    if (allowedRegions.includes(wardStr) || allowedRegions.includes(Number(wardStr))) return true;
  }
  return false;
}

export function matchesNeed(need, char) {
  if (!need) return true;
  const flags = char.flags || [];
  if (need.item && !(char.inventory || []).some(i => (i.id || i) === need.item)) return false;
  if (need.nest && !isNestResident(char)) return false;
  if (need.notNest && isNestResident(char)) return false;
  if (need.back && (isNestResident(char) || isOutsideCity(char))) return false;
  if (need.out && !isOutsideCity(char)) return false;
  if (need.notOut && isOutsideCity(char)) return false;
  if (need.jobs) {
    const jobAllowed = need.jobs.includes(char.job) ||
      (char.flags?.includes('Distorted') && char.finger && need.jobs.includes('Syndicate'));
    if (!jobAllowed) return false;
  }
  if (need.regions && !regionMatchesList(need.regions, char.regionId)) return false;
  if (need.finger && need.finger !== char.finger) return false;
  if (need.flags && !need.flags.every((f) => flags.includes(f))) return false;
  if (need.noFlags?.some((f) => flags.includes(f))) return false;
  if (need.scarTag && !hasScarTag(char, need.scarTag)) return false;
  if (need.noScarTag && hasScarTag(char, need.noScarTag)) return false;
  if (need.npc && !npcIsActive(char.npcs?.[need.npc])) return false;
  if (need.noNpc && npcIsActive(char.npcs?.[need.noNpc])) return false;
  if (need.npcTag) {
    const [tagRole, tag] = need.npcTag;
    const tagged = char.npcs?.[tagRole] || (tagRole === 'lover' ? char.npcs?.spouse : null);
    if (!npcIsActive(tagged) || !(tagged.tags || []).includes(tag)) return false;
  }
  if (need.noQuest) {
    const target = char.npcs?.[need.noQuest.role];
    if (target && (target.questsDone || 0) >= need.noQuest.max) return false;
  }
  if (need.bondAtLeast) {
    const [bRole, min] = need.bondAtLeast;
    const bTarget = char.npcs?.[bRole] || (bRole === 'lover' ? char.npcs?.spouse : null);
    if (!npcIsActive(bTarget) || (bTarget.bond || 0) < min) return false;
  }
  if (need.bondAtMost) {
    const [bRole, max] = need.bondAtMost;
    const bTarget = char.npcs?.[bRole] || (bRole === 'lover' ? char.npcs?.spouse : null);
    if (!npcIsActive(bTarget) || (bTarget.bond || 0) > max) return false;
  }
  if (need.deadNpc && (!char.npcs?.[need.deadNpc] || !char.npcs[need.deadNpc].deceased)) return false;
  const remembers = (key) => (char.memory || []).some((m) => m.key === key);
  if (need.mem && !remembers(need.mem)) return false;
  if (need.noMem && remembers(need.noMem)) return false;
  if (need.grade) {
    if (char.job !== 'Fixer' || char.fixerGrade == null) return false;
    const min = Math.min(need.grade[0], need.grade[1]);
    const max = Math.max(need.grade[0], need.grade[1]);
    if (char.fixerGrade < min || char.fixerGrade > max) return false;
  }
  if (need.aff || need.affSection || need.affYears != null || need.affStanding) {
    const a = getAffiliation(char);
    const want = need.aff;
    if (want === 'free') { if (!['free', 'owner'].includes(laneOf(char))) return false; }
    else if (want === 'any') { if (!a) return false; }
    else if (want === 'assoc' || want === 'office') { if (a?.kind !== want) return false; }
    else if (want && (!a || a.id !== want)) return false;
    if (need.affSection && (a?.kind !== 'assoc' || a.section < need.affSection[0] || a.section > need.affSection[1])) return false;
    if (need.affYears != null && (!a || char.age - a.joinedAge < need.affYears)) return false;
    if (need.affStanding && (!a || a.standing < need.affStanding[0] || a.standing > need.affStanding[1])) return false;
  }
  if (need.fingerRank != null && (char.fingerRank || 0) !== need.fingerRank) return false;
  if (need.fingerRankAtLeast != null && (char.fingerRank || 0) < need.fingerRankAtLeast) return false;
  if (need.fingerRankAtMost != null && (char.fingerRank || 0) > need.fingerRankAtMost) return false;
  if (need.wingRank != null && (char.wingRank || 0) !== need.wingRank) return false;
  if (need.workshopRank != null && (char.workshopRank || 0) !== need.workshopRank) return false;
  for (const [key, [lo, hi]] of Object.entries(need.stat || {})) {
    const value = char.stats?.[key] ?? char[key] ?? 0;
    if (!Number.isFinite(value) || value < lo || value > hi) return false;
  }
  return true;
}

const roles = ['friend', 'partner', 'mentor', 'lover', 'spouse', 'child', 'ward', 'parent', 'rival', 'nemesis'];
export function hasNarrativeContext(entry, char) {
  const text = [entry.vi, entry.en, entry.ignore?.rvi, entry.ignore?.ren,
    ...(entry.choices || []).flatMap((choice) => [choice.vi, choice.en, choice.rvi, choice.ren,
      choice.resultVi, choice.resultEn, ...(choice.out || choice.outcomes || []).flatMap((outcome) =>
        [outcome.rvi, outcome.ren, outcome.resultVi, outcome.resultEn])])].filter(Boolean).join(' ');
  for (const role of roles) {
    if (!text.includes(`{${role}}`)) continue;
    const npc = char.npcs?.[role] || (role === 'lover' ? char.npcs?.spouse : null);
    const remembrance = entry.remembers?.includes(role) || entry.need?.deadNpc === role ||
      ((entry.id?.startsWith('mourn_') || entry.id?.startsWith('avenge_')) && ['spouse', 'partner'].includes(role));
    if (remembrance ? !npc : !npcIsActive(npc)) return false;
  }
  if (text.includes('{parentName}') && !char.lineage?.parentName && !char.npcs?.parent) return false;
  return true;
}

export function matchesEventContext(entry, char) {
  if (!entry || !char.alive) return false;
  if (entry.age && (char.age < effectiveMinAge(entry, char) || char.age > entry.age[1])) return false;
  if (entry.regions && !regionMatchesList(entry.regions, char.regionId)) return false;
  if (entry.jobs) {
    const jobMatches = entry.jobs.includes(char.job) ||
      (char.flags?.includes('Distorted') && char.finger && entry.jobs.includes('Syndicate'));
    if (!jobMatches) return false;
  }
  if (entry.finger && entry.finger !== char.finger) return false;
  if (entry.requires && !entry.requires.every((f) => char.flags.includes(f))) return false;
  if (entry.forbids?.some((f) => char.flags.includes(f))) return false;
  const distortionEntry = entry.requires?.includes('Distorted') || entry.need?.flags?.includes('Distorted') ||
    entry.jobs?.includes('Distortion') || entry.need?.jobs?.includes('Distortion') ||
    entry.allowDistorted || (char.finger && entry.finger === char.finger);
  if (char.flags.includes('Distorted') && !distortionEntry) return false;
  return matchesNeed(entry.need, char) && hasNarrativeContext(entry, char);
}

export function choiceIsAvailable(choice, char) {
  return Boolean(choice) && matchesNeed(choice.need, char) &&
    (!choice.useItem || (char.inventory || []).some(i => (i.id || i) === choice.useItem)) &&
    (!choice.favorCost || (npcIsActive(char.npcs?.[choice.favorCost.role]) &&
      (char.npcs[choice.favorCost.role].bond || 0) >= choice.favorCost.amount)) &&
    (choice.costAhn == null || char.stats.wealth >= choice.costAhn);
}

export function mergeEffects(...sources) {
  const effects = {};
  for (const source of new Set(sources.filter(Boolean))) {
    for (const [key, value] of Object.entries(source.effects || source.fx || {})) {
      effects[key] = (effects[key] || 0) + value;
    }
  }
  return effects;
}
