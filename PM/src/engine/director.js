import { npcIsActive } from './eventConditions.js';
// ============================================================================
// THE DIRECTOR: decides which small stories a year tells, and remembers.
//
// • Memory: choices leave keys in char.memory; entries gated by need.mem can only
//   happen to someone who once did that thing.
// • Consequences: choice.later schedules a specific event N years ahead
//   (a "minor" thread in weaver.pendingThreads, shown on the Loom screen).
// • Pacing: after a hard stretch it favours relief; after a quiet one, danger.
// • Themes: the same kind of story (3:13, the Index, the Ring…) rests for years.
// • Spotlight: people you haven't seen in a while come back into the story.
// • Nature: repeated violence, mercy, greed or loyalty colours what comes next.
// Every pick is written to the decision log with a plain reason.
// ============================================================================

import { clamp, interpolateText, getNextCareerMilestone } from './gameEngine.js';
import { makeNpc } from '../data/birthStories.js';
import { bondCapFor } from '../data/npcPersonality.js';

const THEME_REST_YEARS = 4;

export const npcActive = npcIsActive;

export const hasMemory = (char, key) => (char.memory || []).some((m) => m.key === key);

// Lines that mention the Night in the Backstreets share one theme automatically
export function themeOf(entry) {
  if (entry.theme) return entry.theme;
  const text = `${entry.vi || ''}`;
  if (/3[:h ]1[03]|3 giờ 1[03]|Sweeper/.test(text)) return '313';
  return null;
}

const MOTIF_TAGS = { violence: 'danger', mercy: 'relief', greed: 'money', loyalty: 'npc', faith: 'index' };

function dominantMotif(char) {
  const entries = Object.entries(char.motifs || {}).filter(([, v]) => v >= 2);
  if (!entries.length) return null;
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * How strongly the director wants this entry this year, with the reason it would give.
 */
export function directorWeight(entry, char) {
  const n = entry.need || {};
  let w = entry.w ?? 1;
  let reason = null;
  const tags = entry.tags || [];
  const tension = char.weaver?.tensionScore ?? 20;

  if (n.regions) {
    w *= 2.6;
    reason = reason || { vi: 'Chuyện chỉ có ở District này', en: 'A story only this District tells' };
  }
  if (n.jobs) w *= 2;
  if (n.flags?.includes('Distorted')) {
    w *= 6;
    reason = { vi: 'Bạn không còn là người như trước', en: 'You are not who you were' };
  }
  if (n.nest || n.back || n.out) w *= 1.4;
  if (n.mem || tags.includes('callback')) {
    w *= 5.5;
    reason = { vi: 'Một lựa chọn cũ quay lại', en: 'An old choice comes back' };
  }

  if (tags.includes('danger')) {
    if (tension >= 65) w *= 0.45;
    else if (tension <= 30 && (char.weaver?.yearsSinceLastCrisis || 0) >= 2) {
      w *= 1.8;
      reason = reason || { vi: 'Đã yên ắng quá lâu', en: 'It has been quiet too long' };
    }
  }
  if (tags.includes('relief') && tension >= 60) {
    w *= 2.2;
    reason = reason || { vi: 'Cho bạn một khoảng thở', en: 'A moment to breathe' };
  }

  const theme = themeOf(entry);
  if (theme) {
    const last = char.themes?.[theme];
    if (last != null && char.age - last < THEME_REST_YEARS) w *= 0.1;
  }

  if (n.npc) {
    const npc = char.npcs?.[n.npc];
    const since = char.age - (npc?.lastSeen ?? npc?.metAge ?? 0);
    if (since >= 3) {
      w *= 2.6;
      reason = reason || { vi: `Đã lâu không gặp ${npc?.nameVi || ''}`.trim(), en: `You haven't seen ${npc?.nameEn || 'them'} in a while` };
    } else if (since <= 0) w *= 0.5;
  }

  const motif = dominantMotif(char);
  if (motif && tags.includes(MOTIF_TAGS[motif])) {
    w *= 1.5;
    reason = reason || { vi: 'The City đáp lại con người bạn đã trở thành', en: 'The City answers who you have become' };
  }

  // Crucible of Pinnacle Ascensions (E.G.O, Color Fixer, Five Fingers, Workshop Masterpiece)
  if (entry.id?.includes('ascension_trial') || entry.id?.includes('pinnacle') || entry.id?.includes('efflorescence') || entry.id?.includes('carmen_crossroad')) {
    w *= 4.5;
    reason = { vi: 'Thời khắc khảo thí đỉnh cao', en: 'A crucible of pinnacle ascension' };
  }

  // Career Goal-Seeking Utility AI: weights events according to active promotion goals
  try {
    const milestone = getNextCareerMilestone(char);
    if (milestone && milestone.progressPct < 100) {
      const unmet = milestone.requirements.filter((r) => !r.met);
      const needsMerit = unmet.some((r) => r.labelEn?.includes('Merit'));
      const needsRep = unmet.some((r) => r.labelEn?.includes('Rep'));
      const needsWealth = unmet.some((r) => r.labelEn?.includes('Wealth') || r.labelEn?.includes('Ahn'));

      if (needsMerit && (tags.includes('combat') || tags.includes('contract') || tags.includes('merit') || entry.id?.includes('contract') || entry.id?.includes('brawl'))) {
        w *= 2.3;
        reason = reason || { vi: 'Cơ hội lập công thăng tiến', en: 'Opportunity to earn promotion merit' };
      } else if (needsRep && (tags.includes('rep') || tags.includes('public') || tags.includes('heroic') || tags.includes('fame'))) {
        w *= 2.1;
        reason = reason || { vi: 'Tạo dựng danh tiếng trong khu vực', en: 'Building reputation across the District' };
      } else if (needsWealth && (tags.includes('money') || tags.includes('deal') || tags.includes('lucrative') || tags.includes('work'))) {
        w *= 1.9;
        reason = reason || { vi: 'Kiếm Ahn cho mục tiêu tiếp theo', en: 'Scraping Ahn for your next ambition' };
      }
    }
  } catch (err) {
    // Ignore if during early initialization
  }

  return { w, reason: reason || { vi: 'Ngẫu nhiên', en: 'Chance' } };
}

/** Records that a theme just played, so it rests for a few years. */
export function markTheme(char, entry) {
  const theme = themeOf(entry);
  if (theme) char.themes = { ...(char.themes || {}), [theme]: char.age };
}

export function logDecision(char, entry, reason, kind) {
  const label = interpolateText(entry.vi || '', char).replace(/\s+/g, ' ').slice(0, 72);
  const item = {
    age: char.age,
    phase: char.weaver?.dramaPhase || 'INCUBATION',
    selectedId: entry.id,
    kind,
    label,
    utility: Math.round((reason.w ?? 1) * 10) / 10,
    reasonVi: reason.vi,
    reasonEn: reason.en
  };
  char.weaver = { ...char.weaver, decisionLog: [item, ...(char.weaver?.decisionLog || [])].slice(0, 24) };
}

/** All threads scheduled by earlier choices that are due this year and unfulfilled. */
export function dueThreads(char) {
  return (char.weaver?.pendingThreads || []).filter((th) => !th.fulfilled && char.age >= th.triggerAge);
}

/** Minor events scheduled by earlier choices that are due this year. */
export function dueMinorThreads(char) {
  return (char.weaver?.pendingThreads || []).filter((th) => (th.kind === 'minor' || !th.kind) && !th.fulfilled && char.age >= th.triggerAge);
}

export function closeThreads(char, eventId) {
  if (!char.weaver?.pendingThreads?.some((th) => th.eventId === eventId && !th.fulfilled)) return;
  char.weaver = {
    ...char.weaver,
    pendingThreads: char.weaver.pendingThreads.map((th) =>
      th.eventId === eventId && !th.fulfilled ? { ...th, fulfilled: true, fulfilledAtAge: char.age } : th
    )
  };
}

/**
 * Applies everything a choice does besides plain stats. Pushes readable deltas
 * (bonds, meetings, fates) next to the stat deltas.
 */
export function applyChoiceExtras(char, sources, deltas, rng) {
  const all = sources.filter(Boolean);
  const pickField = (f) => all.map((s) => s[f]).filter(Boolean);

  // New people
  for (const npc of pickField('npc')) {
    if (char.npcs?.[npc.role]) continue;
    const fresh = makeNpc(npc.role, rng, {
      bond: npc.bond ?? 22,
      metAge: char.age,
      lastSeen: char.age,
      regionId: char.regionId,
      nest: (char.flags || []).some((f) => ['Nest', 'NestResident', 'Feather'].includes(f))
    });
    if (npc.nameVi) Object.assign(fresh, { nameVi: npc.nameVi, nameEn: npc.nameEn || npc.nameVi });
    char.npcs = { ...char.npcs, [npc.role]: fresh };
    deltas.push({ k: 'meet', role: npc.role, name: fresh.nameVi });
    if (npc.role === 'child' && !char.flags.includes('HasChild')) char.flags.push('HasChild');
  }

  // Lover becomes spouse, and so on
  for (const p of pickField('promote')) {
    const from = char.npcs?.[p.from];
    if (!from || char.npcs?.[p.to]) continue;
    char.npcs = { ...char.npcs, [p.to]: { ...from, role: p.to, lastSeen: char.age }, [p.from]: null };
    deltas.push({ k: 'promote', role: p.to, name: from.nameVi });
    if (p.to === 'spouse' && !char.flags.includes('Married')) char.flags.push('Married');
  }

  // Bonds
  for (const bond of pickField('bond')) {
    for (const [role, v] of Object.entries(bond)) {
      const target = char.npcs?.[role] || (role === 'lover' ? char.npcs?.spouse : null);
      const key = char.npcs?.[role] ? role : role === 'lover' && char.npcs?.spouse ? 'spouse' : null;
      if (!key || !npcActive(target)) continue;
      const before = target.bond || 0;
      // Trust is capped until the person's own quest is done, and warmth is slow to give.
      const cap = bondCapFor(target);
      const gain = v > 0 ? Math.max(1, Math.round(v * 0.7)) : v;
      const after = v > 0 ? Math.max(before, Math.min(cap, clamp(before + gain, 0, 100))) : clamp(before + gain, 0, 100);
      char.npcs = { ...char.npcs, [key]: { ...target, bond: after, lastSeen: char.age } };
      if (after !== before) deltas.push({ k: 'bond', role: key, name: target.nameVi, v: after - before });
    }
  }

  // A person's own quest finished: this is what actually opens the door to deeper trust
  for (const role of pickField('npcQuest')) {
    const key = char.npcs?.[role] ? role : role === 'lover' && char.npcs?.spouse ? 'spouse' : null;
    const target = key && char.npcs[key];
    if (!target || !npcActive(target)) continue;
    const questsDone = (target.questsDone || 0) + 1;
    const lifted = { ...target, questsDone, lastSeen: char.age };
    const bondNow = Math.min(bondCapFor(lifted), (lifted.bond || 0) + 8);
    char.npcs = { ...char.npcs, [key]: { ...lifted, bond: Math.max(lifted.bond || 0, bondNow) } };
    deltas.push({ k: 'bond', role: key, name: target.nameVi, v: Math.max(0, bondNow - (target.bond || 0)) });
    char.memory = [...(char.memory || []), { key: `quest_${key}_${questsDone}`, age: char.age }];
  }

  // Fates
  for (const fate of pickField('npcFate')) {
    for (const [role, status] of Object.entries(fate)) {
      const key = char.npcs?.[role] ? role : role === 'lover' && char.npcs?.spouse ? 'spouse' : null;
      const target = key && char.npcs[key];
      if (!target || !npcActive(target)) continue;
      char.npcs = { ...char.npcs, [key]: { ...target, status, deceased: status === 'dead', fateAge: char.age } };
      deltas.push({ k: 'fate', role: key, name: target.nameVi, v: status });
      char.memory = [...(char.memory || []), { key: `lost_${key}`, age: char.age }];
      if (status === 'dead') {
        if (key === 'spouse') {
          char.flags = (char.flags || []).filter(f => f !== 'Married');
          if (!char.flags.includes('Widowed')) char.flags.push('Widowed');
        } else if (key === 'lover') {
          char.flags = (char.flags || []).filter(f => f !== 'InLove');
          if (!char.flags.includes('LoverLost')) char.flags.push('LoverLost');
        } else if (key === 'child') {
          char.flags = (char.flags || []).filter(f => f !== 'HasChild');
          if (!char.flags.includes('ChildLost')) char.flags.push('ChildLost');
        } else if (key === 'partner') {
          if (!char.flags.includes('PartnerLost')) char.flags.push('PartnerLost');
        } else if (key === 'friend') {
          if (!char.flags.includes('FriendLost')) char.flags.push('FriendLost');
        } else if (key === 'mentor') {
          if (!char.flags.includes('MentorLost')) char.flags.push('MentorLost');
        }
      }
    }
  }

  // Memories, consequences, nature
  for (const key of pickField('mem')) {
    if (!hasMemory(char, key)) char.memory = [...(char.memory || []), { key, age: char.age }];
  }
  for (const list of pickField('later')) {
    const threads = list.map((l, i) => ({
      id: `thr_${char.age}_${l.id}_${i}`,
      kind: 'minor',
      eventId: l.id,
      plantedAtAge: char.age,
      triggerAge: char.age + (l.years || 3),
      reasonVi: interpolateText(l.reasonVi || '', char),
      reasonEn: interpolateText(l.reasonEn || l.reasonVi || '', char),
      fulfilled: false
    }));
    char.weaver = { ...char.weaver, pendingThreads: [...(char.weaver?.pendingThreads || []), ...threads] };
    deltas.push({ k: 'seed', v: threads.length });
  }
  for (const motif of pickField('motif')) {
    const next = { ...(char.motifs || {}) };
    for (const [k, v] of Object.entries(motif)) next[k] = (next[k] || 0) + v;
    char.motifs = next;
  }
}

/** People drift apart when you stop seeing them. */
export function driftBonds(char) {
  const next = { ...char.npcs };
  let changed = false;
  for (const [role, npc] of Object.entries(char.npcs || {})) {
    if (!npcActive(npc) || role === 'child') continue;
    const yearsApart = char.age - (npc.lastSeen ?? npc.metAge ?? 0);
    if (yearsApart >= 2 && (npc.bond || 0) > 10) {
      const drop = yearsApart >= 5 ? 3 : 2;
      next[role] = { ...npc, bond: Math.max(10, (npc.bond || 0) - drop) };
      changed = true;
    }
  }
  if (changed) char.npcs = next;
}
