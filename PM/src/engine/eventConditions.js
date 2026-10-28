import { effectiveMinAge } from './careerAge.js';
import { hasScarTag } from './scarModel.js';
import { getAffiliation, laneOf } from './affiliation.js';

export const npcIsActive = (npc) => Boolean(npc) && npc.alive !== false && !npc.deceased && !['dead', 'missing', 'estranged', 'betrayer'].includes(npc.status);
export const isNestResident = (char) => ['Nest', 'NestResident', 'Feather'].some((f) => char.flags?.includes(f));
export const isOutsideCity = (char) => char.regionId === 'OUTSKIRTS' || char.flags?.includes('Outskirts');

export const FIELD_COMPANION_ROLES = ['partner', 'mentor', 'friend', 'lover', 'spouse'];

export const charHasCombatGear = (char) => Boolean(
  char?.craftWeapon ||
  (char?.inventory || []).some((item) => item?.type === 'weapon' || item?.type === 'armor') ||
  (char?.flags || []).some((f) => ['유물', 'CraftedColorWeapon', 'SingularityImbued'].includes(f))
);

export function getFieldCompanion(char) {
  if (!char?.npcs) return null;
  for (const role of FIELD_COMPANION_ROLES) {
    const npc = char.npcs[role];
    if (npcIsActive(npc) && !npc.injured && !npc.advisor) {
      return { role, npc };
    }
  }
  return null;
}

/** Snapshot of who stood beside the player in the Color trial, kept so later callbacks name the same person. */
export function recordColorTrialCompanion(char) {
  const found = getFieldCompanion(char);
  if (!found) return null;
  const { role, npc } = found;
  char.colorTrialCompanion = { role, id: npc.id || `${role}:${npc.nameVi || npc.nameEn || ''}`, nameVi: npc.nameVi, nameEn: npc.nameEn || npc.nameVi };
  return char.colorTrialCompanion;
}

/** The NPC recorded at the Color trial, only if that same person still holds the slot. */
export function colorTrialCompanionOf(char) {
  const rec = char?.colorTrialCompanion;
  if (!rec) return null;
  const npc = char.npcs?.[rec.role];
  if (!npc) return null;
  const sameId = npc.id ? npc.id === rec.id : `${rec.role}:${npc.nameVi || npc.nameEn || ''}` === rec.id || npc.nameVi === rec.nameVi;
  return sameId ? npc : null;
}

/** Whether the person from the Color trial is still alive and present. Old saves without a record fall back to the partner slot. */
export function colorTrialCompanionAlive(char) {
  if (!char?.colorTrialCompanion) return npcIsActive(char?.npcs?.partner);
  return npcIsActive(colorTrialCompanionOf(char));
}

export const isColorFixerChar = (char) =>
  Boolean(
    char &&
      (char.job === 'Color Fixer' ||
        char.flags?.includes('ColorFixer') ||
        char.isColorFixer ||
        (char.job === 'Fixer' && char.fixerGrade === 0))
  );

export function jobMatchesWithInheritance(jobs, char, entry = null) {
  if (!Array.isArray(jobs) || jobs.length === 0) return true;
  if (jobs.includes(char?.job)) return true;
  if (char?.flags?.includes('Distorted') && char.finger && jobs.includes('Syndicate')) return true;
  if (isColorFixerChar(char) && jobs.includes('Fixer')) {
    const id = entry?.id || '';
    if (id.startsWith('fixer_promo_') || id === 'hana_color_ascension_trial') return false;
    const gradeBounds = entry?.need?.grade || entry?.grade;
    if (Array.isArray(gradeBounds)) {
      const min = Math.min(gradeBounds[0], gradeBounds[1]);
      if (min > 1) return false;
    }
    return true;
  }
  return false;
}

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

export function matchesNeed(need, char, contextEntry = null) {
  if (!need) return true;
  const flags = char.flags || [];
  if (need.item && !(char.inventory || []).some(i => (i.id || i) === need.item)) return false;
  if (need.hasGear && !charHasCombatGear(char)) return false;
  if (need.nest && !isNestResident(char)) return false;
  if (need.notNest && isNestResident(char)) return false;
  if (need.back && (isNestResident(char) || isOutsideCity(char))) return false;
  if (need.out && !isOutsideCity(char)) return false;
  if (need.notOut && isOutsideCity(char)) return false;
  if (need.jobs && !jobMatchesWithInheritance(need.jobs, char, contextEntry || need)) return false;
  if (need.regions && !regionMatchesList(need.regions, char.regionId)) return false;
  if (need.finger && need.finger !== char.finger) return false;
  if (need.notFinger && need.notFinger === char.finger && char.job === 'Syndicate') return false;
  if (need.noFinger && char.finger) return false;
  if (need.hasActiveDebt && !(char.debts || []).some((d) => d.id === need.hasActiveDebt && d.status === 'active' && (char.age || 0) >= d.nextDueAge)) return false;
  if (need.meritAtLeast != null && (char.merit || 0) < need.meritAtLeast) return false;
  if (need.flags && !need.flags.every((f) => flags.includes(f))) return false;
  if (need.noFlags?.some((f) => flags.includes(f))) return false;
  if (need.scarTag && !hasScarTag(char, need.scarTag)) return false;
  if (need.noScarTag && hasScarTag(char, need.noScarTag)) return false;
  if (need.companionActive && !getFieldCompanion(char)) return false;
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
    const min = Math.min(need.grade[0], need.grade[1]);
    const max = Math.max(need.grade[0], need.grade[1]);
    const isColor = isColorFixerChar(char);
    if ((char.job !== 'Fixer' && !isColor) || char.fixerGrade == null) return false;
    const effGrade = isColor && char.fixerGrade === 0 && min === 1 ? 1 : char.fixerGrade;
    if (effGrade < min || effGrade > max) return false;
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
  if (need.wingRankAtLeast != null && (char.wingRank || 0) < need.wingRankAtLeast) return false;
  if (need.wingRankAtMost != null && (char.wingRank || 0) > need.wingRankAtMost) return false;
  if (need.workshopRank != null && (char.workshopRank || 0) !== need.workshopRank) return false;
  if (need.syndicateRank != null && (char.syndicateRank || 0) !== need.syndicateRank) return false;
  if (need.syndicateRankAtLeast != null && (char.syndicateRank || 0) < need.syndicateRankAtLeast) return false;
  if (need.syndicateRankAtMost != null && (char.syndicateRank || 0) > need.syndicateRankAtMost) return false;
  for (const [key, [lo, hi]] of Object.entries(need.stat || {})) {
    const value = char.stats?.[key] ?? char[key] ?? (key === 'standing' ? 50 : 0);
    if (!Number.isFinite(value) || value < lo || value > hi) return false;
  }
  return true;
}

const roles = ['friend', 'partner', 'mentor', 'lover', 'spouse', 'child', 'ward', 'parent', 'rival', 'nemesis', 'mentee'];
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
  if (entry.jobs && !jobMatchesWithInheritance(entry.jobs, char, entry)) return false;
  if (entry.finger && entry.finger !== char.finger) return false;
  if (entry.syndicateRank != null && (char.syndicateRank || 0) !== entry.syndicateRank) return false;
  if (entry.syndicateRankAtLeast != null && (char.syndicateRank || 0) < entry.syndicateRankAtLeast) return false;
  if (entry.activeDebt && !(char.debts || []).some((d) => d.id === entry.activeDebt && d.status === 'active' && (char.age || 0) >= d.nextDueAge)) return false;
  if (entry.requires && !entry.requires.every((f) => char.flags.includes(f))) return false;
  if (entry.forbids?.some((f) => char.flags.includes(f))) return false;
  const distortionEntry = entry.requires?.includes('Distorted') || entry.need?.flags?.includes('Distorted') ||
    entry.jobs?.includes('Distortion') || entry.need?.jobs?.includes('Distortion') ||
    entry.allowDistorted || (char.finger && entry.finger === char.finger);
  if (char.flags.includes('Distorted') && !distortionEntry) return false;
  return matchesNeed(entry.need, char, entry) && hasNarrativeContext(entry, char);
}

export function getChoiceAhnCost(choice, char) {
  if (!choice) return 0;
  if (choice.debtId && (choice.debtCost === 'full' || choice.debtCost === 'partial')) {
    const debt = (char?.debts || []).find((item) => item.id === choice.debtId && item.status === 'active');
    if (!debt) return 0;
    return choice.debtCost === 'full' ? debt.balanceAhn : Math.min(3, debt.balanceAhn);
  }
  return choice.costAhn ?? 0;
}

export function choiceIsAvailable(choice, char) {
  if (!choice || !matchesNeed(choice.need, char)) return false;
  if (choice.useItem && !(char.inventory || []).some(i => (i.id || i) === choice.useItem)) return false;
  if (choice.favorCost && (!npcIsActive(char.npcs?.[choice.favorCost.role]) || (char.npcs[choice.favorCost.role].bond || 0) < choice.favorCost.amount)) return false;
  return (char.stats?.wealth ?? char.wealth ?? 0) >= getChoiceAhnCost(choice, char);
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

export function isIndependentSyndicateEligibleForRank(char, nextRank) {
  if (!char || char.job !== 'Syndicate' || char.finger) return false;
  const flags = char.flags || [];
  if (!flags.includes('IndependentSyndicate')) return false;
  const currentRank = char.syndicateRank || 0;
  if (currentRank !== nextRank - 1) return false;
  const merit = char.merit || 0;
  const rep = char.stats?.rep ?? char.rep ?? 0;
  const heat = char.heat || 0;
  if (nextRank === 1) {
    return merit >= 20 && rep >= 20 && heat >= 15;
  }
  if (nextRank === 2) {
    return merit >= 50 && rep >= 45 && heat >= 30;
  }
  if (nextRank === 3) {
    return merit >= 90 && rep >= 75 && heat >= 50;
  }
  return false;
}

