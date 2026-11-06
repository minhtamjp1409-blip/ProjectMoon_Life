// ============================================================================
// DUNGEON SIGNATURES (Đợt 128): one rule of its own for each dungeon, on top of the shared fight.
//   Outskirts      lamp oil: every stage burns oil; in the dark, checks are harder and the way out costs blood
//   Backstreets    the clock from 3:13 to 4:34: the last sweep presses harder before it retreats
//   Great Lake     the Lake Laws: an omen asks for one answer; a wrong one teaches the law, twice wakes what is below
//   Bloodfiend     the blood market: stalls at the lulls sell an edge for HP; buy twice and the ringmaster notices
//   WARP           passengers: lead survivors out; each one makes the blows land harder and each one counts at the end
//   Lobotomy       work types: an Abnormality answers to one kind of work; the duty log fills in across lives
//   The Head       suppression: no lull between the Claw and the Arbiter, your record arms the Beholder,
//                  and the people closest to you may stand with you once each
// What carries across lives (laws, duty logs) is kept as `lore:` entries in seenEvents, which the store
// merges into globalSeenEvents and hands back to the next life as char.dungeonLore.
// The law texts, the market stalls and which work each Abnormality wants are adaptations, labelled in game.
// ============================================================================
import { DUNGEON_LAWS, WORK_TYPES, SIGNATURE_TEXT } from '../data/dungeonSignatureText.js';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const fnv = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

export const SIGNATURE_BALANCE = {
  oil: { start: 4, native: 1, checked: 2, plain: 1, darkCheck: -0.3, darkFleeHp: 12 },
  clock: { deadline: 81, dangerAt: 60, turn: 4, rest: 14, push: 2, side: 4, shortcut: -6, sweptDamage: 1.35, sweptStrain: 5 },
  // A right answer calms the water and opens the enemy two notches; tuned so the Lake stays rung 2 (test_dungeon_difficulty)
  law: { wrong: 0.9, woken: 2.6, wokenStrain: 16, right: 0, rightBreaks: 2 },
  market: { wineHp: 10, goldHp: 8, goldLoot: 15, notice: 2 },
  passenger: { max: 2, damage: 0.1, network: 3, rep: 2, leftSanity: 4 },
  work: { perFight: 2, rightBreaks: 2, rightStrain: -4, wrongTaken: 0.9, wrongSanity: 6 },
  head: { allyBond: 70, allyDeath: 0.35, recordPerHeat: 30, recordMax: 2 }
};

export const SIGNATURE_OF = {
  dungeon_outskirts_ruins: 'oil',
  dungeon_backstreets_night: 'clock',
  dungeon_great_lake: 'law',
  dungeon_bloodfiend_carnival: 'market',
  dungeon_warp_train: 'passenger',
  dungeon_lobotomy_ruin: 'work',
  dungeon_claw_judgment: 'head'
};
export const signatureOf = (session) => SIGNATURE_OF[session?.id] || null;

// ---- lore across lives ------------------------------------------------------
const LORE = 'lore:';
export const knownLore = (char) => new Set([...(char?.dungeonLore || []), ...(char?.seenEvents || []).filter((id) => String(id).startsWith(LORE))]);
function learn(char, session, key) {
  const id = `${LORE}${key}`;
  if (!(char.seenEvents || []).includes(id)) char.seenEvents = [...(char.seenEvents || []), id];
  if (session.lore && !session.lore.includes(id)) session.lore = [...session.lore, id];
}

// ---- setup -----------------------------------------------------------------
/** Called once when a session is created; the stage builders only see the session, so what they need is copied here. */
export function initSignature(session, char) {
  const kind = signatureOf(session);
  if (!kind) return session;
  session.signature = kind;
  session.lore = [...knownLore(char)];
  if (kind === 'oil') {
    const native = (char?.flags || []).includes('OutskirtsAdaptability') || char?.regionId === 'OUTSKIRTS';
    session.oilMax = SIGNATURE_BALANCE.oil.start + (native ? SIGNATURE_BALANCE.oil.native : 0);
    session.oil = session.oilMax;
  }
  if (kind === 'clock') session.clockMin = 0;
  if (kind === 'market') { session.notice = 0; session.bloodEdge = 0; }
  if (kind === 'passenger') session.passengers = 0;
  if (kind === 'head') {
    const B = SIGNATURE_BALANCE.head;
    session.headAllies = Object.entries(char?.npcs || {})
      .filter(([, npc]) => npc && npc.status !== 'dead' && !npc.injured && (npc.bond || 0) >= B.allyBond && (npc.nameVi || npc.name))
      .slice(0, 3)
      .map(([role, npc]) => ({ role, nameVi: npc.nameVi || npc.name, nameEn: npc.nameEn || npc.nameVi || npc.name, used: false }));
    session.headRecord = Math.min(B.recordMax, Math.floor((char?.heat || 0) / B.recordPerHeat));
  }
  return session;
}

// ---- the meter the dock shows ----------------------------------------------
const clockText = (min) => {
  const total = 13 + min;
  return `${3 + Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};
/** One line for the dock: what this dungeon's own rule stands at right now. */
export function signatureMeter(session) {
  const kind = signatureOf(session);
  if (!kind) return null;
  const T = SIGNATURE_TEXT.meter[kind];
  if (kind === 'oil') return { kind, labelVi: T.labelVi, labelEn: T.labelEn, value: session.oil, max: session.oilMax, tone: session.oil <= 0 ? 'bad' : session.oil <= 2 ? 'warn' : 'ok', noteVi: session.oil <= 0 ? T.darkVi : T.noteVi, noteEn: session.oil <= 0 ? T.darkEn : T.noteEn };
  if (kind === 'clock') {
    const C = SIGNATURE_BALANCE.clock;
    const late = session.clockMin >= C.deadline;
    const danger = session.clockMin >= C.dangerAt && !late;
    return { kind, labelVi: T.labelVi, labelEn: T.labelEn, text: `${clockText(session.clockMin)} / 4:34`, tone: danger ? 'bad' : 'ok', noteVi: late ? T.sweptVi : danger ? T.dangerVi : T.noteVi, noteEn: late ? T.sweptEn : danger ? T.dangerEn : T.noteEn };
  }
  if (kind === 'law') {
    const known = (session.lore || []).filter((id) => id.startsWith(`${LORE}lake_law_`)).length;
    return { kind, labelVi: T.labelVi, labelEn: T.labelEn, value: known, max: DUNGEON_LAWS.length, tone: 'ok', noteVi: T.noteVi, noteEn: T.noteEn };
  }
  if (kind === 'market') return { kind, labelVi: T.labelVi, labelEn: T.labelEn, value: session.notice, max: SIGNATURE_BALANCE.market.notice, tone: session.notice >= SIGNATURE_BALANCE.market.notice ? 'bad' : session.notice ? 'warn' : 'ok', noteVi: T.noteVi, noteEn: T.noteEn };
  if (kind === 'passenger') return { kind, labelVi: T.labelVi, labelEn: T.labelEn, value: session.passengers, max: SIGNATURE_BALANCE.passenger.max, tone: session.passengers ? 'warn' : 'ok', noteVi: T.noteVi, noteEn: T.noteEn };
  if (kind === 'work') {
    const files = (session.lore || []).filter((id) => id.startsWith(`${LORE}abno_`) && !id.includes('_not_')).length;
    return { kind, labelVi: T.labelVi, labelEn: T.labelEn, value: files, tone: 'ok', noteVi: T.noteVi, noteEn: T.noteEn };
  }
  const allies = session.headAllies || [];
  const left = allies.filter((a) => !a.used).length;
  // No one close enough is a fact of this life, not a fault: say so instead of showing 0 / 0 in red
  if (!allies.length) return { kind, labelVi: T.labelVi, labelEn: T.labelEn, textVi: T.noneVi, textEn: T.noneEn, tone: 'warn', noteVi: T.noteVi, noteEn: T.noteEn };
  return { kind, labelVi: T.labelVi, labelEn: T.labelEn, value: left, max: allies.length, tone: left ? 'ok' : 'bad', noteVi: T.noteVi, noteEn: T.noteEn };
}

// ---- Outskirts: lamp oil (stage dungeon) ------------------------------------
export const isDark = (session) => signatureOf(session) === 'oil' && (session.oil ?? 1) <= 0;
const oilCost = (choice) => (choice?.checkTrait ? SIGNATURE_BALANCE.oil.checked : SIGNATURE_BALANCE.oil.plain);
/** A check done with less oil than it burns is done half in the dark. */
export const signatureCheckBonus = (session, choice) => (signatureOf(session) === 'oil' && (session.oil ?? 0) < oilCost(choice) ? SIGNATURE_BALANCE.oil.darkCheck : 0);

/** Walking out of the Outskirts with the lamp out costs blood, whichever way the player leaves. Returns the note, or null. */
export function darkWayOut(char, session) {
  if (!isDark(session)) return null;
  char.stats.health = clamp((char.stats.health || 0) - SIGNATURE_BALANCE.oil.darkFleeHp, 0, 100);
  return SIGNATURE_TEXT.oil.darkWayOut;
}

/** After an Outskirts stage: burn the oil the choice took; walking out in the dark costs blood. Returns notes. */
export function afterOilStage(char, session, choice) {
  if (signatureOf(session) !== 'oil') return [];
  const notes = [];
  if (choice.isFlee) {
    const dark = darkWayOut(char, session);
    return dark ? [dark] : notes;
  }
  const before = session.oil;
  session.oil = Math.max(0, session.oil - oilCost(choice));
  if (before > 0 && session.oil === 0) notes.push(SIGNATURE_TEXT.oil.out);
  else if (before > 2 && session.oil <= 2) notes.push(SIGNATURE_TEXT.oil.low);
  return notes;
}

// ---- fights: shared hooks for the gauntlets ---------------------------------
/** When a floor opens: the market's edge, the Head's record. Mutates the combat state. */
export function onFloorEnter(session, char, floor, c) {
  const kind = signatureOf(session);
  if (kind === 'market' && session.bloodEdge) {
    c.guard = Math.max(1, c.guard - session.bloodEdge);
    session.bloodEdge = 0;
  }
  if (kind === 'head' && c.floor === 0 && session.headRecord > 0 && c.enemy?.intents) {
    c.enemy = { ...c.enemy, intents: [...c.enemy.intents, ...Array(session.headRecord).fill('report')] };
  }
  c.works = 0;
}

/** Lake omens take the second turn of every fight on the Great Lake. Returns the intent to use. */
export function signatureIntent(session, intent, step = 0) {
  if (signatureOf(session) !== 'law' || !intent) return intent;
  const c = session.combat;
  if ((c.turn + step) !== 1 || c.lawDone?.[c.floor]) return intent;
  const law = DUNGEON_LAWS[fnv(`${session.seed || ''}|${c.floor}|law`) % DUNGEON_LAWS.length];
  return { id: `law_${law.id}`, kind: 'law', law: law.id, nameVi: law.omenNameVi, nameEn: law.omenNameEn, tellVi: law.tellVi, tellEn: law.tellEn, dmg: intent.dmg, mind: Math.max(intent.mind || 0, 6) };
}
export const lawOf = (id) => DUNGEON_LAWS.find((l) => l.id === id) || null;
const lawKnown = (session, id) => (session.lore || []).includes(`${LORE}lake_law_${id}`);

/** Extra fight choices and label marks this dungeon adds. Mutates `choices`; returns nothing. */
export function signatureChoices(session, intent, choices) {
  const kind = signatureOf(session);
  const c = session.combat;
  if (kind === 'law' && intent?.kind === 'law' && lawKnown(session, intent.law)) {
    const law = lawOf(intent.law);
    for (const ch of choices) {
      if (ch.combatAction === law.answer) { ch.labelVi += ` (theo ${law.nameVi})`; ch.labelEn += ` (by ${law.nameEn})`; }
    }
  }
  if (kind === 'work' && !c.workOpen && (c.works || 0) < SIGNATURE_BALANCE.work.perFight && intent && intent.kind !== 'law') {
    choices.push({ labelVi: SIGNATURE_TEXT.work.openVi, labelEn: SIGNATURE_TEXT.work.openEn, combatAction: 'workOpen', resultVi: '', resultEn: '' });
  }
  if (kind === 'head') {
    for (const ally of session.headAllies || []) {
      if (ally.used) continue;
      choices.push({ labelVi: `Gọi ${ally.nameVi} đứng cùng bạn trước The Head`, labelEn: `Call ${ally.nameEn} to stand with you before the Head`, combatAction: 'headAlly', allyRole: ally.role, resultVi: '', resultEn: '' });
    }
  }
}

const abnoKey = (enemy) => `abno_${String(enemy?.nameEn || '').toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
export const preferredWork = (enemy) => WORK_TYPES[fnv(`${enemy?.nameEn || ''}|work`) % WORK_TYPES.length].id;

/** The work step of a Lobotomy fight: four kinds of work, each marked with what the duty log already says. */
export function workChoices(session) {
  const key = abnoKey(session.combat.enemy);
  const lore = new Set(session.lore || []);
  const right = lore.has(`${LORE}${key}`) ? preferredWork(session.combat.enemy) : null;
  const choices = WORK_TYPES.map((w) => {
    const ruledOut = lore.has(`${LORE}${key}_not_${w.id}`);
    const markVi = right === w.id ? ' (sổ trực: phù hợp)' : ruledOut ? ' (sổ trực: không phù hợp)' : '';
    const markEn = right === w.id ? ' (duty log: suits it)' : ruledOut ? ' (duty log: does not suit it)' : '';
    return { labelVi: `${w.labelVi}${markVi}`, labelEn: `${w.labelEn}${markEn}`, combatAction: 'work', workType: w.id, resultVi: '', resultEn: '' };
  });
  choices.push({ labelVi: SIGNATURE_TEXT.work.backVi, labelEn: SIGNATURE_TEXT.work.backEn, combatAction: 'workBack', resultVi: '', resultEn: '' });
  return choices;
}

/**
 * Resolves the fight choices only a signature knows (a Lake omen, a kind of work, an ally before the Head).
 * Returns { taken, breaks, quality, line, fx, sanity?, strain? } or null when the shared table answers it.
 */
export function resolveSignatureCombat(ctx, char, session, choice, intent, rng) {
  const kind = signatureOf(session);
  const c = session.combat;
  if (kind === 'law' && intent?.kind === 'law') {
    const law = lawOf(intent.law);
    const L = SIGNATURE_BALANCE.law;
    c.lawDone = { ...(c.lawDone || {}), [c.floor]: true };
    if (choice.combatAction === law.answer) {
      return { taken: L.right, breaks: L.rightBreaks, quality: 'good', fx: 'evade', line: { vi: law.rightVi, en: law.rightEn } };
    }
    const twice = (session.lawWrong || []).includes(law.id);
    session.lawWrong = [...(session.lawWrong || []), law.id];
    learn(char, session, `lake_law_${law.id}`);
    if (twice) return { taken: L.woken, breaks: 0, quality: 'poor', fx: 'heavyhit', strain: L.wokenStrain, line: SIGNATURE_TEXT.law.woken };
    return { taken: L.wrong, breaks: 0, quality: 'poor', fx: 'hit', line: { vi: `${law.wrongVi} Bạn ghi vào sổ: ${law.nameVi}, ${law.ruleVi}`, en: `${law.wrongEn} You write it in the book: ${law.nameEn}, ${law.ruleEn}` } };
  }
  if (kind === 'work' && choice.combatAction === 'work') {
    const W = SIGNATURE_BALANCE.work;
    const key = abnoKey(c.enemy);
    c.works = (c.works || 0) + 1;
    c.workOpen = false;
    const right = choice.workType === preferredWork(c.enemy);
    const type = WORK_TYPES.find((w) => w.id === choice.workType);
    if (right) {
      learn(char, session, key);
      return { taken: 0, breaks: W.rightBreaks, quality: 'good', fx: 'counter', strain: W.rightStrain, line: { vi: `${type.rightVi} Sổ trực ghi: ${c.enemy.nameVi} hợp với ${type.labelVi.toLowerCase()}.`, en: `${type.rightEn} The duty log reads: ${c.enemy.nameEn} answers to ${type.labelEn.toLowerCase()}.` } };
    }
    learn(char, session, `${key}_not_${choice.workType}`);
    return { taken: W.wrongTaken, breaks: 0, quality: 'poor', fx: 'mind', sanity: W.wrongSanity, line: { vi: `${type.wrongVi} Sổ trực ghi: không dùng ${type.labelVi.toLowerCase()} với nó.`, en: `${type.wrongEn} The duty log reads: no ${type.labelEn.toLowerCase()} with it.` } };
  }
  if (kind === 'head' && choice.combatAction === 'headAlly') {
    const ally = (session.headAllies || []).find((a) => a.role === choice.allyRole && !a.used);
    if (!ally) return null;
    session.headAllies = session.headAllies.map((a) => (a === ally ? { ...a, used: true } : a));
    const dies = rng() < SIGNATURE_BALANCE.head.allyDeath;
    const npc = char.npcs?.[ally.role];
    if (npc) {
      const memory = { age: char.age || 0, vi: `Năm ${char.age || 0} tuổi: đứng cùng bạn trước The Head.`, en: `Age ${char.age || 0}: stood with you before the Head.` };
      char.npcs = { ...char.npcs, [ally.role]: { ...npc, ...(dies ? { status: 'dead', fateAge: char.age } : { injured: true, injurySeverity: 'severe', injuredAtAge: char.age || 0, healsAtAge: (char.age || 0) + 2 }), memories: [...(npc.memories || []), memory].slice(-6) } };
    }
    const T = SIGNATURE_TEXT.head;
    return { taken: 0, breaks: 1, quality: 'good', fx: 'ally', line: dies ? { vi: T.allyDiesVi(ally.nameVi), en: T.allyDiesEn(ally.nameEn) } : { vi: T.allyHurtVi(ally.nameVi), en: T.allyHurtEn(ally.nameEn) } };
  }
  return null;
}

/** Preview for the choices a signature resolves, or null. */
export function previewSignatureCombat(session, choice, intent) {
  const kind = signatureOf(session);
  if (kind === 'law' && intent?.kind === 'law' && ['guard', 'strike', 'evade'].includes(choice.combatAction)) {
    const law = lawOf(intent.law);
    if (lawKnown(session, law.id)) return { taken: choice.combatAction === law.answer ? 0 : SIGNATURE_BALANCE.law.wrong };
    return { taken: SIGNATURE_BALANCE.law.wrong * (2 / 3) };
  }
  if (choice.combatAction === 'workBack' || choice.combatAction === 'headAlly') return { taken: 0 };
  // Opening the work step shows the best the duty log can promise, so it never reads as free when nothing is known
  if (choice.combatAction === 'workOpen') {
    const options = WORK_TYPES.map((w) => previewSignatureCombat(session, { combatAction: 'work', workType: w.id }, intent));
    return options.reduce((a, b) => (b.taken < a.taken ? b : a));
  }
  if (choice.combatAction === 'work') {
    const lore = new Set(session.lore || []);
    const key = abnoKey(session.combat.enemy);
    const W = SIGNATURE_BALANCE.work;
    // A wrong work also costs a fixed share of the mind, so the preview carries it
    if (lore.has(`${LORE}${key}`)) return choice.workType === preferredWork(session.combat.enemy) ? { taken: 0 } : { taken: W.wrongTaken, sanity: W.wrongSanity };
    if (lore.has(`${LORE}${key}_not_${choice.workType}`)) return { taken: W.wrongTaken, sanity: W.wrongSanity };
    return { taken: W.wrongTaken * 0.75, sanity: Math.round(W.wrongSanity * 0.75) };
  }
  return null;
}

/** Multiplies blows during the last sweep and while shielding passengers. */
export function signatureDamageMult(session) {
  const kind = signatureOf(session);
  if (kind === 'clock' && session.clockMin >= SIGNATURE_BALANCE.clock.dangerAt && session.clockMin < SIGNATURE_BALANCE.clock.deadline) return SIGNATURE_BALANCE.clock.sweptDamage;
  if (kind === 'passenger') return 1 + SIGNATURE_BALANCE.passenger.damage * (session.passengers || 0);
  return 1;
}

/** After every fight turn: the clock moves. Returns notes and extra strain. */
export function afterFightTurn(session) {
  if (signatureOf(session) !== 'clock') return { notes: [], strain: 0 };
  const C = SIGNATURE_BALANCE.clock;
  const before = session.clockMin;
  session.clockMin += C.turn;
  const notes = before < C.deadline && session.clockMin >= C.deadline ? [SIGNATURE_TEXT.clock.swept]
    : before < C.dangerAt && session.clockMin >= C.dangerAt ? [SIGNATURE_TEXT.clock.pressure] : [];
  return { notes, strain: session.clockMin >= C.dangerAt && session.clockMin < C.deadline ? C.sweptStrain : 0 };
}

// ---- lulls between fights ---------------------------------------------------
/** Extra choices a lull offers in this dungeon. Mutates `choices`. */
export function signatureRestChoices(session, choices) {
  const kind = signatureOf(session);
  const T = SIGNATURE_TEXT;
  if (kind === 'market') {
    const M = SIGNATURE_BALANCE.market;
    choices.splice(1, 0,
      { labelVi: T.market.wineVi, labelEn: T.market.wineEn, restAction: 'blood_wine', costHp: M.wineHp, resultVi: T.market.wineResultVi, resultEn: T.market.wineResultEn },
      { labelVi: T.market.goldVi, labelEn: T.market.goldEn, restAction: 'blood_gold', costHp: M.goldHp, resultVi: T.market.goldResultVi, resultEn: T.market.goldResultEn });
  }
  if (kind === 'passenger' && (session.passengers || 0) < SIGNATURE_BALANCE.passenger.max) {
    choices.splice(1, 0, { labelVi: T.passenger.takeVi, labelEn: T.passenger.takeEn, restAction: 'passenger', resultVi: T.passenger.takeResultVi, resultEn: T.passenger.takeResultEn });
  }
}

/** Settles a lull choice for the signature. Returns { notes, insertElite } . */
export function resolveSignatureRest(char, session, choice, COMBAT_REST) {
  const kind = signatureOf(session);
  const notes = [];
  let insertElite = false;
  if (kind === 'clock') {
    const C = SIGNATURE_BALANCE.clock;
    const add = { rest: C.rest, push: C.push, side: C.side }[choice.restAction] || 0;
    const before = session.clockMin;
    session.clockMin = Math.max(0, session.clockMin + add);
    if (before < C.deadline && session.clockMin >= C.deadline) notes.push(SIGNATURE_TEXT.clock.swept);
    else if (before < C.dangerAt && session.clockMin >= C.dangerAt) notes.push(SIGNATURE_TEXT.clock.pressure);
  }
  if (kind === 'market' && (choice.restAction === 'blood_wine' || choice.restAction === 'blood_gold')) {
    const M = SIGNATURE_BALANCE.market;
    char.stats.health = Math.max(1, (char.stats.health || 0) - (choice.costHp || 0));
    if (choice.restAction === 'blood_wine') session.bloodEdge = 1;
    else session.accumulatedLootAhn = (session.accumulatedLootAhn || 0) + M.goldLoot;
    session.notice = (session.notice || 0) + 1;
    if (session.notice === M.notice) { insertElite = true; notes.push(SIGNATURE_TEXT.market.noticed); }
  }
  if (kind === 'passenger' && choice.restAction === 'passenger') {
    session.passengers = (session.passengers || 0) + 1;
    const r = COMBAT_REST;
    char.stats.health = clamp(char.stats.health + Math.round(r.health / 2), 0, 100);
    char.stats.sanity = clamp(char.stats.sanity + r.sanity, 0, 100);
  }
  return { notes, insertElite };
}

/** The shortcut through the Backstreets saves minutes too. */
export function onShortcut(session, took) {
  if (signatureOf(session) === 'clock' && took) session.clockMin = Math.max(0, session.clockMin + SIGNATURE_BALANCE.clock.shortcut);
}

// ---- how a run ends ---------------------------------------------------------
/** Passengers brought out are witnesses; passengers left behind stay with you. Returns notes. */
export function settleSignature(char, session, outcome) {
  if (signatureOf(session) !== 'passenger' || !session.passengers) return [];
  const P = SIGNATURE_BALANCE.passenger;
  const n = session.passengers;
  if (outcome === 'conquered') {
    char.stats.network = clamp((char.stats.network || 0) + P.network * n, 0, 100);
    char.stats.rep = clamp((char.stats.rep || 0) + P.rep * n, 0, 100);
    return [{ vi: SIGNATURE_TEXT.passenger.outVi(n), en: SIGNATURE_TEXT.passenger.outEn(n) }];
  }
  char.stats.sanity = clamp((char.stats.sanity || 0) - P.leftSanity * n, 0, 100);
  return [{ vi: SIGNATURE_TEXT.passenger.lostVi(n), en: SIGNATURE_TEXT.passenger.lostEn(n) }];
}
