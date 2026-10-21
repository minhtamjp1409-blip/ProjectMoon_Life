export const npcIsActive = (npc) => Boolean(npc) && npc.alive !== false && !npc.deceased && !['dead', 'missing', 'estranged'].includes(npc.status);
export const isNestResident = (char) => ['Nest', 'NestResident', 'Feather'].some((f) => char.flags?.includes(f));
export const isOutsideCity = (char) => char.regionId === 'OUTSKIRTS' || char.flags?.includes('Outskirts');

export function matchesNeed(need, char) {
  if (!need) return true;
  const flags = char.flags || [];
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
  if (need.regions && !need.regions.includes(char.regionId)) return false;
  if (need.finger && need.finger !== char.finger) return false;
  if (need.flags && !need.flags.every((f) => flags.includes(f))) return false;
  if (need.noFlags?.some((f) => flags.includes(f))) return false;
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
  if (need.deadNpc && (!char.npcs?.[need.deadNpc] || !char.npcs[need.deadNpc].deceased)) return false;
  const remembers = (key) => (char.memory || []).some((m) => m.key === key);
  if (need.mem && !remembers(need.mem)) return false;
  if (need.noMem && remembers(need.noMem)) return false;
  if (need.grade && !(char.job === 'Fixer' && char.fixerGrade <= need.grade[0] && char.fixerGrade >= need.grade[1])) return false;
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

const roles = ['friend', 'partner', 'mentor', 'lover', 'spouse', 'child', 'parent', 'rival'];
export function hasNarrativeContext(entry, char) {
  const text = `${entry.vi || ''} ${entry.en || ''}`;
  for (const role of roles) {
    if (!text.includes(`{${role}}`)) continue;
    const npc = char.npcs?.[role] || (role === 'lover' ? char.npcs?.spouse : null);
    const remembrance = entry.remembers?.includes(role) || entry.need?.deadNpc === role ||
      ((entry.id?.startsWith('mourn_') || entry.id?.startsWith('avenge_')) && ['spouse', 'partner'].includes(role));
    if (remembrance ? !npc : !npcIsActive(npc)) return false;
  }
  return true;
}

export function matchesEventContext(entry, char) {
  if (!entry || !char.alive) return false;
  if (entry.age && (char.age < entry.age[0] || char.age > entry.age[1])) return false;
  if (entry.regions && !entry.regions.includes(char.regionId)) return false;
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
