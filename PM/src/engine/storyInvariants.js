// ============================================================================
// STORY INVARIANTS: rules a life must never break, checked by the audit and the
// balance harness (never by the game itself).
//   - state: flags and NPC records must agree (Married with no spouse, Widowed with a living one…)
//   - leaks: a dead person must not turn up in a scene unless the scene is a remembrance
//   - roles: text that names a relationship (wife, mentor…) needs that person to be alive
// ============================================================================

import { npcIsActive } from './eventConditions.js';

const L = '\\p{L}';
const word = (alts, flags = 'iu') => new RegExp(`(?<!${L})(?:${alts})(?!${L})`, flags);

// Relationship words, per role. Deliberately narrow: a false alarm costs more than a miss here.
export const ROLE_WORDS = {
  spouse: { vi: word('vợ|chồng(?! giấy| chất| lên)|bạn đời|phu nhân|phu quân'), en: word('wife|husband|spouse') },
  lover: { vi: word('người yêu|người thương(?! nhân)'), en: word('lover|sweetheart') },
  child: { vi: word('đứa con của bạn|con của bạn|con trai của bạn|con gái của bạn'), en: word('your son|your daughter|your child|your baby') },
  mentor: { vi: word('sư phụ|người thầy'), en: word('your mentor|your master|your teacher') },
  friend: { vi: word('bạn thuở nhỏ|người bạn cũ'), en: word('childhood friend') }
};

// Scenes that are about someone who is gone on purpose
export const REMEMBRANCE_ID = /mourn|avenge|bereave|memor|funeral|grave|lost_|elegy|requiem|anniversary|passing|epitaph|widow|orphan/i;

const roleFlags = {
  spouse: ['Married'],
  child: ['HasChild'],
  lover: ['InLove']
};

const isDead = (n) => Boolean(n) && (n.deceased || ['dead'].includes(n.status));

/** Pure state checks. Returns [{ code, msg }]. */
export function checkState(char) {
  const out = [];
  const flags = char.flags || [];
  const npcs = char.npcs || {};
  const add = (code, msg) => out.push({ code, msg });

  if (flags.includes('Married') && !npcIsActive(npcs.spouse)) add('married-no-spouse', 'Married but no living spouse');
  if (flags.includes('Widowed') && npcIsActive(npcs.spouse)) add('widowed-spouse-alive', 'Widowed but the spouse is alive');
  if (flags.includes('HasChild') && !npcs.child) add('haschild-no-child', 'HasChild without a child record');
  if (flags.includes('ChildLost') && npcIsActive(npcs.child)) add('childlost-alive', 'ChildLost but the child is around');
  if (flags.includes('InLove') && !npcIsActive(npcs.lover) && !npcIsActive(npcs.spouse)) add('inlove-nobody', 'InLove but no lover or spouse alive');
  if (flags.includes('PartnerLost') && npcIsActive(npcs.partner)) add('partnerlost-alive', 'PartnerLost but the partner is around');
  if (flags.includes('FriendLost') && npcIsActive(npcs.friend)) add('friendlost-alive', 'FriendLost but the friend is around');
  if (flags.includes('MentorLost') && npcIsActive(npcs.mentor)) add('mentorlost-alive', 'MentorLost but the mentor is around');

  for (const [role, n] of Object.entries(npcs)) {
    if (!n || n.alive === undefined && n.status === undefined && n.deceased === undefined) continue;
    if (n.deceased && n.status && n.status !== 'dead') add('npc-deceased-status', `${role} is deceased but status is ${n.status}`);
    if (n.status === 'dead' && !n.deceased) add('npc-dead-not-deceased', `${role} has status dead but deceased is not set`);
    if (typeof n.bond === 'number' && (n.bond < 0 || n.bond > 100)) add('npc-bond-range', `${role} bond ${n.bond}`);
  }

  if (flags.includes('Distorted') && char.job !== 'Distortion') add('distorted-job', `Distorted but job is ${char.job}`);
  if (char.job === 'Distortion' && !flags.includes('Distorted')) add('distortion-flag', 'job Distortion without the Distorted flag');
  if (flags.includes('ColorFixer') && char.fixerGrade !== 0) add('color-grade', `ColorFixer with grade ${char.fixerGrade}`);
  if (char.job === 'Fixer' && !(Number.isInteger(char.fixerGrade) && char.fixerGrade >= 0 && char.fixerGrade <= 9)) add('fixer-grade', `Fixer grade ${char.fixerGrade}`);
  if (char.job === 'Child' && char.age >= 20) add('child-adult', `still Child at ${char.age}`);
  if (char.job === 'Syndicate' && char.age >= 22 && !char.finger) add('syndicate-no-finger', 'Syndicate without a Finger');

  for (const k of ['health', 'sanity', 'wealth', 'network', 'rep']) {
    const v = char.stats?.[k];
    if (!Number.isFinite(v) || v < 0 || v > 100) add('stat-range', `${k}=${v}`);
  }
  if ((char.taboo || 0) < 0 || (char.taboo || 0) > 3) add('taboo-range', `taboo=${char.taboo}`);
  if (!Number.isFinite(char.merit) || char.merit < 0) add('merit-range', `merit=${char.merit}`);
  return out;
}

/** The id of the entry behind a log line, when the log id carries it. */
export function logEntryId(log) {
  const id = String(log?.id || '');
  if (id.startsWith('log_ev_')) return id.split('_').slice(3).join('_');
  const m = /^log_\d+_\d+_(.+)$/.exec(id);
  return m ? m[1] : id;
}

const stripTitle = (t) => String(t || '').replace(/^\s*\[[^\]]{2,80}\]\s*/, '');

/**
 * Checks lines the character has just read (new logs, or the text of a pending prompt).
 * `scenes` is [{ id, vi, en, age, type }]; remembrance scenes are skipped.
 */
export function checkScenes(char, scenes, { remembers = () => false } = {}) {
  const out = [];
  const npcs = char.npcs || {};
  const scars = (char.scars || []).join(' ');
  const dead = Object.entries(npcs).filter(([, n]) => n && isDead(n) && n.nameVi && n.nameVi.length >= 3);

  for (const s of scenes) {
    if (!s || REMEMBRANCE_ID.test(s.id || '') || remembers(s.id) || s.type === 'death') continue;
    const vi = stripTitle(s.vi);

    for (const [role, n] of dead) {
      if (n.fateAge != null && s.age != null && s.age <= n.fateAge) continue;
      // A scar can carry the name ("X died in your place") and be recalled later
      if (scars.includes(n.nameVi)) continue;
      // Case-sensitive: the name "Tao" is not the pronoun "tao"
      if (word(n.nameVi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u').test(vi)) {
        out.push({ code: 'dead-name', id: s.id, msg: `${role} "${n.nameVi}" (died at ${n.fateAge}) appears at ${s.age}` });
      }
    }
    for (const [role, rx] of Object.entries(ROLE_WORDS)) {
      if (!rx.vi.test(vi)) continue;
      const npc = role === 'lover' ? npcs.lover || npcs.spouse : npcs[role];
      // The scene that ends a relationship may still name the person
      if (npc && npc.fateAge != null && s.age != null && s.age <= npc.fateAge) continue;
      if (!npcIsActive(npc)) {
        out.push({ code: 'role-no-person', id: s.id, msg: `text names a ${role} but none is alive` });
      }
    }
  }
  return out;
}

/** Static gate test for an entry that names a role in its text: does it actually require that person? */
export function entryGatesRole(entry, role) {
  const need = entry.need || {};
  const text = `${entry.vi || ''} ${entry.en || ''}`;
  if (text.includes(`{${role}}`)) return true;
  if (need.npcTag?.[1] === role) return true;
  if (need.npc === role || need.npcTag?.[0] === role || need.bondAtLeast?.[0] === role || need.deadNpc === role) return true;
  const flagsNeeded = [...(need.flags || []), ...(entry.requires || [])];
  if ((roleFlags[role] || []).some((f) => flagsNeeded.includes(f))) return true;
  if (role === 'lover' && (need.npc === 'spouse' || flagsNeeded.includes('Married'))) return true;
  return false;
}
