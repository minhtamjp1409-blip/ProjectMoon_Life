// ============================================================================
// DUNGEON COMBAT: the floor-by-floor fights of a gauntlet dungeon (data/dungeonGauntlets.js).
// One turn: the enemy has shown an intent; the player guards, strikes, evades or sends a
// companion in; damage and breaks follow from the answer table below, then the next intent
// is shown. A floor ends when the enemy's guard is broken. Rests are the only place to leave.
// Shared dungeon helpers (damage scaling, endings, companions) come in through `ctx` from
// dungeonEngine.js, so this module never imports it back.
// ============================================================================
import { cardEffectOf, dungeonUsesCards, nextHand } from './dungeonCards.js';
import { GAUNTLETS, INTENT_KINDS, REST_TEXT } from '../data/dungeonGauntlets.js';
import { activeScarSynergies } from './scarModel.js';
import { dungeonWagerDamage, dungeonWagerLoot } from './dungeonWager.js';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const fnv = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

/** [share of the blow taken, guard broken] for each answer to each kind of intent. The right answer always breaks the guard a notch; a counter breaks it two. */
export const ANSWERS = {
  guard: { heavy: [0.25, 1], quick: [0.6, 0], sweep: [0.5, 0], mind: [0.35, 1], grab: [1.1, 0] },
  strike: { heavy: [1.25, 1], quick: [0.3, 2], sweep: [1, 1], mind: [1, 1], grab: [0.6, 1] },
  evade: { heavy: [0, 0], quick: [0.8, 0], sweep: [0, 1], mind: [0.8, 0], grab: [0, 1] }
};
// A recovery (Serum K) hurts no one; only a strike cuts it short
ANSWERS.guard.heal = [0, 0];
ANSWERS.strike.heal = [0, 1];
ANSWERS.evade.heal = [0, 0];
const EVADE_MISS = 1.3;
const MAX_ALLY_CALLS = 2;

// Pressing on twice hurts more than twice as much as once: the second wager is the one worth a second thought

export const COMBAT_BALANCE = {
  damageScale: 0.9,
  tierScale: 0.12,
  aleph: 1.05,
  strainBase: 1,
  strainPerTier: 1,
  strainMind: 4,
  clearRelief: -8,
  evadeBase: 0.64,
  rest: { health: 12, sanity: 10, strain: -22 },
  push: { loot: 8, merit: 2 },
  clearLoot: { base: 6, perTier: 5, elite: 10, boss: 16 },
  clearMerit: { base: 2, perTier: 2, elite: 3, boss: 6 }
};

export const isGauntlet = (dungeonId) => Boolean(GAUNTLETS[dungeonId]);
export const gauntletOf = (dungeonId) => GAUNTLETS[dungeonId] || null;

const pickEnemy = (g, floor, seed, id, age) => {
  const list = floor.enemies || [];
  return list[fnv(`${seed}|${id}|${age}|f${floor.tier}|${list.length}`) % Math.max(1, list.length)] || null;
};

function enterFloor(session, char, index) {
  const g = GAUNTLETS[session.id];
  const c = session.combat;
  c.floor = index;
  c.turn = 0;
  c.floorPlays = 0;
  // A card played before a rest has done its work; it must not follow the player into the next fight
  session.cardActive = null;
  const floor = c.plan[index];
  if (!floor || floor.kind === 'rest') {
    c.enemy = null;
    return;
  }
  const enemy = floor.elite ? g.elite : pickEnemy(g, floor, char?.seed ?? '', session.id, char?.age ?? 0);
  c.enemy = enemy;
  c.guardMax = enemy.guard;
  c.guard = enemy.guard;
  c.phase = 1;
  c.offset = fnv(`${char?.seed ?? ''}|${session.id}|${index}|${enemy.nameEn}`) % enemy.intents.length;
}

const intentsNow = (c) => (c.phase === 2 && c.enemy?.phase2 ? c.enemy.phase2 : c.enemy?.intents || []);
const intentAt = (session, step = 0) => {
  const c = session.combat;
  const list = intentsNow(c);
  if (!list.length) return null;
  const id = list[(c.offset + c.turn + step) % list.length];
  return { id, ...GAUNTLETS[session.id].intents[id] };
};

/** Turns a fresh session for a gauntlet dungeon into a combat run. */
export function initGauntlet(session, char) {
  const g = GAUNTLETS[session.id];
  if (!g) return session;
  session.mode = 'gauntlet';
  session.combat = { plan: g.floors.map((f) => ({ ...f })), floor: 0, done: false, allyCalls: 0, sideUsed: false };
  enterFloor(session, char, 0);
  return session;
}

/** How many floors, and where the player stands, for the progress strip. */
export function gauntletRoute(session) {
  const c = session?.combat;
  if (!c) return [];
  return c.plan.map((f, i) => ({ kind: f.elite ? 'elite' : f.kind, state: c.done || i < c.floor ? 'done' : i === c.floor ? 'now' : 'next' }));
}

function damageOf(ctx, def, char, session, intent, taken, kind) {
  const c = session.combat;
  const tier = c.plan[c.floor]?.tier || 1;
  const base = kind === 'sanity' ? intent.mind : intent.dmg;
  if (!base || taken <= 0) return 0;
  const scale = (1 + (tier - 1) * COMBAT_BALANCE.tierScale) * (def.hazard === 'ALEPH' ? COMBAT_BALANCE.aleph : 1);
  // The same multiplier stage choices use: mastery, stance, traits, scan, E.G.O and strain
  const mult = ctx.damageMult(def, char, session, kind === 'sanity' ? 'sanity' : 'health') / (ctx.hazardOf(def) || 1);
  return Math.max(1, Math.ceil(base * taken * scale * mult * COMBAT_BALANCE.damageScale * dungeonWagerDamage(session.delveStake)));
}

export function evadeChance(ctx, char, session) {
  let chance = COMBAT_BALANCE.evadeBase * ctx.traitFactor(char, 'luck') + ctx.mastery(char, session).checkBonus;
  if (session.stageScanned) chance += 0.15;
  if (session.egoActive) chance += 0.3;
  chance += (cardEffectOf(session).evade || 0) + (cardEffectOf(session).check || 0);
  if (session.stance === 'guarded') chance += 0.05;
  if ((char.stats?.health ?? 100) <= 40 && activeScarSynergies(char).some((synergy) => synergy.id === 'cornered_blade')) chance += 0.06;
  chance += ctx.strainCheck(session);
  return clamp(chance, 0.25, session.egoActive ? 0.95 : 0.9);
}

/** What the screen shows before a choice: success odds and the wound you should expect. */
export function previewCombatAction(ctx, choice, char, session) {
  const def = ctx.def(session);
  const intent = intentAt(session);
  if (!intent) return null;
  const action = choice.combatAction;
  if (action === 'ally') {
    const odds = ctx.companionLeadChance(char, session);
    return { hasCheck: true, trait: 'bond', successPct: Math.round(odds * 100), estHp: 0, estSp: 0, estWealth: 0, estLoot: 0, estRep: 0, estMerit: 0, estResonance: 0 };
  }
  const [taken] = ANSWERS[action][intent.kind];
  const ok = action === 'evade' ? evadeChance(ctx, char, session) : 1;
  const expected = action === 'evade' ? ok * taken + (1 - ok) * EVADE_MISS * (cardEffectOf(session).missMult || 1) : taken;
  return {
    hasCheck: action === 'evade', trait: action === 'evade' ? 'luck' : null, successPct: Math.round(ok * 100),
    estHp: -damageOf(ctx, def, char, session, intent, expected, 'health'),
    estSp: -damageOf(ctx, def, char, session, intent, expected, 'sanity'),
    estWealth: 0, estLoot: 0, estRep: 0, estMerit: 0, estResonance: 0
  };
}

const ACTION_LABEL = {
  guard: ['Thủ: đứng vững, đỡ đòn', 'Guard: stand firm and block'],
  strike: ['Phản công: đánh vào lúc nó ra đòn', 'Strike: hit as it attacks'],
  evade: ['Né: tránh khỏi đường đòn', 'Evade: get out of the line of attack']
};

/** The stage object the dock renders for the current floor of a gauntlet. */
export function gauntletStage(ctx, session) {
  const c = session.combat;
  const floor = c.plan[c.floor];
  const total = c.plan.length;
  if (floor.kind === 'rest') {
    const g = GAUNTLETS[session.id];
    const firstRest = c.plan.findIndex((f) => f.kind === 'rest') === c.floor;
    const choices = [
      { labelVi: 'Băng bó và thở một lúc', labelEn: 'Bind your wounds and breathe a while', restAction: 'rest', resultVi: 'Bạn ngồi dựa lưng vào tường, buộc lại những chỗ đang chảy máu, và đếm hơi thở cho tới khi tay thôi run.', resultEn: 'You sit with your back to the wall, tie off what is bleeding, and count your breaths until your hands stop shaking.' },
      { labelVi: 'Đi tiếp ngay, nhặt nhạnh những gì rơi lại', labelEn: 'Press on at once, picking up what was dropped', restAction: 'push', resultVi: 'Bạn không dừng. Trên đường đi, bạn nhặt được những thứ người đi trước đã đánh rơi.', resultEn: 'You do not stop. On the way you pick up what those before you dropped.' }
    ];
    // A dungeon that pays nothing has nothing to press on for, so the option would only skip the rest
    if (ctx.def(session).noRewards) choices.splice(choices.findIndex((choice) => choice.restAction === 'push'), 1);
    const noRetreat = Boolean(ctx.def(session).noRetreat);
    // A locked train still has a next carriage door and a gap between cars, but no way back out
    if (firstRest && !noRetreat && g.elite && !c.sideUsed) {
      choices.push({ labelVi: 'Mở cánh cửa phụ: một kẻ mạnh hơn, phần thưởng lớn hơn', labelEn: 'Open the side door: a stronger foe, a bigger reward', restAction: 'side', resultVi: 'Bạn đẩy cánh cửa phụ. Thứ phía sau đã nghe thấy bạn từ trước.', resultEn: 'You push the side door. What is behind it heard you long before.' });
      choices.push({ labelVi: 'Đi lối tắt, bỏ qua tầng kế tiếp', labelEn: 'Take the shortcut and skip the next floor', restAction: 'shortcut', checkTrait: 'luck', resultVi: 'Lối tắt hẹp và nguy hiểm, nhưng bạn qua được và tránh hẳn một tầng.', resultEn: 'The shortcut is narrow and dangerous, but you get through and skip a whole floor.', failVi: 'Lối tắt sụp dưới chân bạn. Bạn rơi xuống đúng tầng mình định tránh, người đầy vết xước.', failEn: 'The shortcut gives way beneath you. You fall right onto the floor you meant to avoid, scraped all over.' });
    }
    if (!noRetreat && !ctx.def(session).locked) choices.push({ labelVi: 'Rời đi với những gì đã gom được', labelEn: 'Leave with what you have gathered', restAction: 'leave', isFlee: true, resultVi: 'Bạn quay lưng về phía lối ra. Phần còn lại của nơi này sẽ chờ một người khác.', resultEn: 'You turn toward the way out. The rest of this place will wait for someone else.' });
    return { stageIndex: c.floor, nameVi: REST_TEXT.nameVi, nameEn: REST_TEXT.nameEn, descVi: ctx.def(session).locked ? g.locked.vi : noRetreat ? REST_TEXT.judgmentVi : REST_TEXT.descVi, descEn: ctx.def(session).locked ? g.locked.en : noRetreat ? REST_TEXT.judgmentEn : REST_TEXT.descEn, canFlee: !noRetreat, isRest: true, sceneLabelVi: `Tầng ${c.floor + 1} / ${total}`, sceneLabelEn: `Floor ${c.floor + 1} / ${total}`, choices };
  }
  const enemy = c.enemy;
  const intent = intentAt(session);
  const next = session.stageScanned ? intentAt(session, 1) : null;
  const kind = INTENT_KINDS[intent.kind];
  const choices = ['guard', 'strike', 'evade'].map((action) => ({
    labelVi: c.sealed === action ? `${ACTION_LABEL[action][0]} (đang bị khóa)` : ACTION_LABEL[action][0],
    labelEn: c.sealed === action ? `${ACTION_LABEL[action][1]} (locked)` : ACTION_LABEL[action][1],
    combatAction: action, sealed: c.sealed === action,
    checkTrait: action === 'evade' ? 'luck' : undefined, resultVi: '', resultEn: ''
  }));
  if (session.companion && c.allyCalls < MAX_ALLY_CALLS && ctx.companionActive(session)) {
    const cmp = session.companion;
    choices.push({ labelVi: `Để ${cmp.nameVi} đỡ đòn này thay bạn`, labelEn: `Let ${cmp.nameEn} take this one for you`, combatAction: 'ally', resultVi: '', resultEn: '' });
  }
  return {
    stageIndex: c.floor,
    nameVi: enemy.nameVi, nameEn: enemy.nameEn,
    descVi: `${c.turn === 0 && c.phase === 1 ? `${enemy.introVi} ` : ''}${intent.tellVi}`,
    descEn: `${c.turn === 0 && c.phase === 1 ? `${enemy.introEn} ` : ''}${intent.tellEn}`,
    canFlee: false,
    isCombat: true,
    sceneLabelVi: `Tầng ${c.floor + 1} / ${total}${floor.kind === 'boss' ? ' · Trùm' : floor.elite ? ' · Tinh nhuệ' : ''}`,
    sceneLabelEn: `Floor ${c.floor + 1} / ${total}${floor.kind === 'boss' ? ' · Boss' : floor.elite ? ' · Elite' : ''}`,
    combat: {
      guard: c.guard, guardMax: c.guardMax, phase: c.phase, isBoss: floor.kind === 'boss', tier: floor.tier,
      intent: { nameVi: intent.nameVi, nameEn: intent.nameEn, kind: intent.kind, kindVi: kind.vi, kindEn: kind.en },
      next: next ? { nameVi: next.nameVi, nameEn: next.nameEn, kindVi: INTENT_KINDS[next.kind].vi, kindEn: INTENT_KINDS[next.kind].en } : null
    },
    choices
  };
}

const LINES = {
  guard: {
    good: ['Bạn đỡ trọn {intent}. Tay tê đi, nhưng bạn vẫn đứng.', 'You take the full {intent} on your guard. Your arms go numb, but you stay standing.'],
    mid: ['Bạn chặn được phần lớn {intent}, phần còn lại vẫn xuyên qua.', 'You stop most of the {intent}; the rest still gets through.'],
    poor: ['Bạn giơ tay đỡ, nhưng {intent} không cần phá thế thủ của bạn. Nó vòng qua.', 'You raise your guard, but the {intent} does not need to break it. It goes around.']
  },
  strike: {
    good: ['Bạn đón {intent} bằng một đòn phản, trúng trước khi nó kịp rút về.', 'You meet the {intent} with a counter that lands before it can pull back.'],
    mid: ['Bạn đánh trúng, và {intent} cũng trúng bạn.', 'Your blow lands, and so does the {intent}.'],
    poor: ['Bạn lao vào đúng lúc {intent} giáng xuống. Cả hai cùng trúng, nhưng bạn đau hơn.', 'You go in just as the {intent} comes down. You both land, but you take the worse of it.']
  },
  evade: {
    good: ['Bạn lách khỏi {intent} trong gang tấc.', 'You slip clear of the {intent} by a hair.'],
    mid: ['Bạn né được nửa người, {intent} vẫn sượt qua.', 'You get half clear; the {intent} still grazes you.'],
    poor: ['Bạn né chậm một nhịp. {intent} trúng đúng chỗ bạn vừa định tới.', 'You move a beat late. The {intent} lands exactly where you were heading.']
  }
};
const lineFor = (action, quality, intent) => {
  const [vi, en] = LINES[action][quality];
  return { vi: vi.replace('{intent}', intent.nameVi.toLowerCase()), en: en.replace('{intent}', intent.nameEn.toLowerCase()) };
};
const qualityOfIntent = (intent, action, taken, breaks) => (intent.heal ? (action === 'strike' ? 'good' : 'mid') : qualityOf(taken, breaks));
const qualityOf = (taken, breaks) => (taken <= 0.4 || breaks >= 2 ? 'good' : taken >= 1.1 ? 'poor' : 'mid');

/** Resolves one choice inside a gauntlet. Returns the same shape as resolveDungeonChoice. */
export function resolveGauntletChoice(char, session, choiceIndex, rng, ctx) {
  const def = ctx.def(session);
  const c = session.combat;
  const stage = gauntletStage(ctx, session);
  const choice = stage.choices[choiceIndex];
  if (!choice || choice.sealed) return { char, session, isFinished: false, resolution: null };
  session.fxNonce = (session.fxNonce || 0) + 1;
  const floor = c.plan[c.floor];
  const notes = [];
  let fx = null;

  if (stage.isRest) {
    if (choice.restAction === 'leave') return ctx.finishFled(char, session, { vi: choice.resultVi, en: choice.resultEn });
    let text = { vi: choice.resultVi, en: choice.resultEn };
    let skip = 0;
    if (choice.restAction === 'rest') {
      const r = COMBAT_BALANCE.rest;
      char.stats.health = clamp(char.stats.health + r.health, 0, 100);
      char.stats.sanity = clamp(char.stats.sanity + r.sanity, 0, 100);
      session.sanityStrain = clamp((session.sanityStrain || 0) + r.strain, 0, 100);
      fx = 'rest';
    } else if (choice.restAction === 'push' && !def.noRewards) {
      session.delveStake = Math.min(2, (session.delveStake || 0) + 1);
      session.accumulatedLootAhn = (session.accumulatedLootAhn || 0) + COMBAT_BALANCE.push.loot;
      char.merit = (char.merit || 0) + COMBAT_BALANCE.push.merit;
      session.accumulatedMerit = (session.accumulatedMerit || 0) + COMBAT_BALANCE.push.merit;
      fx = 'push';
    } else if (choice.restAction === 'side') {
      c.sideUsed = true;
      c.plan.splice(c.floor + 1, 0, { kind: 'fight', tier: 3, elite: true });
      fx = 'door';
    } else if (choice.restAction === 'shortcut') {
      c.sideUsed = true;
      if (rng() < evadeChance(ctx, char, session)) {
        skip = 1;
        session.sanityStrain = clamp((session.sanityStrain || 0) + 18, 0, 100);
        fx = 'shortcut';
      } else {
        char.stats.health = clamp(char.stats.health - 10, 0, 100);
        session.sanityStrain = clamp((session.sanityStrain || 0) + 12, 0, 100);
        text = { vi: choice.failVi, en: choice.failEn };
        fx = 'hit';
      }
    }
    session.lastStageResult = { type: 'stage_clear', stageNum: c.floor + 1, stageNameVi: stage.nameVi, stageNameEn: stage.nameEn, vi: text.vi, en: text.en, fx, nonce: session.fxNonce };
    ctx.log(char, session, def, stage, session.lastStageResult);
    if (char.stats.health <= 0) return ctx.finishDead(char, session, def, stage);
    enterFloor(session, char, Math.min(c.plan.length - 1, c.floor + 1 + skip));
    return { char, session, isFinished: false, resolution: null };
  }

  const intent = intentAt(session);
  const action = choice.combatAction;
  let taken;
  let breaks;
  let quality;
  let line;
  if (action === 'ally') {
    c.allyCalls += 1;
    const ok = rng() < ctx.companionLeadChance(char, session);
    if (ok) {
      taken = 0; breaks = 1; quality = 'good';
      ctx.moveCompanionBond(char, session.companion, 2);
      line = ctx.companionLine('leadOk', session.companion);
      fx = 'ally';
    } else {
      taken = 0.5; breaks = 0; quality = 'mid';
      const npcBond = ctx.companionBond(char, session);
      const loss = (def.hazard === 'ALEPH' ? 0.1 : 0.06) * (npcBond < 30 ? 1.6 : 1);
      if (rng() < loss && ctx.loseCompanion(char, session)) {
        line = ctx.lastCompanionLine;
      } else {
        ctx.moveCompanionBond(char, session.companion, -3);
        line = ctx.companionLine('leadHurt', session.companion);
      }
      fx = 'hit';
    }
  } else {
    [taken, breaks] = ANSWERS[action][intent.kind];
    if (action === 'evade' && rng() >= evadeChance(ctx, char, session)) {
      taken = EVADE_MISS * (cardEffectOf(session).missMult || 1); breaks = 0; quality = 'poor';
    } else {
      quality = qualityOfIntent(intent, action, taken, breaks);
    }
    if (action === 'strike' && session.egoActive) breaks += 1;
    if (action === 'strike') breaks += cardEffectOf(session).breaks || 0;
    if (cardEffectOf(session).noBreak) breaks = 0;
    if (action === 'strike' && session.stance === 'reckless' && rng() < 0.35) breaks += 1;
    line = lineFor(action, quality, intent);
    fx = action === 'guard' ? (quality === 'poor' ? 'hit' : 'block') : action === 'strike' ? (quality === 'good' ? 'counter' : 'clash') : (quality === 'good' ? 'evade' : 'hit');
  }

  const hp = damageOf(ctx, def, char, session, intent, taken, 'health');
  const sp = damageOf(ctx, def, char, session, intent, taken, 'sanity');
  char.stats.health = clamp(char.stats.health - hp, 0, 100);
  char.stats.sanity = clamp(char.stats.sanity - sp, 0, 100);
  if (intent.kind === 'mind' && sp > 0) fx = 'mind';
  if (intent.kind === 'heavy' && hp >= 10) fx = 'heavyhit';
  const strain = (COMBAT_BALANCE.strainBase + floor.tier * COMBAT_BALANCE.strainPerTier + (intent.kind === 'mind' ? COMBAT_BALANCE.strainMind : 0) - (action === 'guard' ? 2 : 0))
    * (session.stageScanned ? 0.5 : 1) * ctx.strainMult(char, session);
  session.sanityStrain = clamp((session.sanityStrain || 0) + Math.round(strain), 0, 100);
  notes.push(line);

  c.guard = Math.max(0, c.guard - breaks);
  c.sealed = null;
  if (intent.heal && action !== 'strike' && c.guard > 0) {
    c.guard = Math.min(c.guardMax, c.guard + intent.heal);
    notes.push({ vi: `${c.enemy.nameVi} khép lại những vết thương bạn vừa gây ra.`, en: `${c.enemy.nameEn} closes the wounds you just dealt.` });
    fx = 'phase';
  } else if (intent.heal && action === 'strike') {
    notes.push({ vi: 'Đòn của bạn cắt ngang lúc nó đang hồi phục.', en: 'Your blow cuts in while it is recovering.' });
  }
  if (intent.seal && (hp > 0 || sp > 0)) {
    c.sealed = intent.seal;
    notes.push(intent.seal === 'strike'
      ? { vi: 'Chiếc lồng giữ tay bạn lại. Lượt sau bạn không thể phản công.', en: 'The cage holds your arms. Next turn you cannot strike.' }
      : { vi: 'Chỗ bạn định bước tới đã bị đánh dấu. Lượt sau bạn không thể né.', en: 'Where you meant to step has been marked. Next turn you cannot evade.' });
  }
  c.turn += 1;
  session.stageScanned = false;
  session.egoActive = false;
  const playedCard = cardEffectOf(session);

  const enemy = c.enemy;
  let cleared = false;
  if (c.guard <= 0) {
    cleared = true;
    const lootBase = COMBAT_BALANCE.clearLoot;
    const meritBase = COMBAT_BALANCE.clearMerit;
    const extraLoot = floor.kind === 'boss' ? lootBase.boss : floor.elite ? lootBase.elite : 0;
    const extraMerit = floor.kind === 'boss' ? meritBase.boss : floor.elite ? meritBase.elite : 0;
    const loot = Math.round((lootBase.base + floor.tier * lootBase.perTier + extraLoot) * ctx.lootMult(session) * dungeonWagerLoot(session.delveStake) * (playedCard.loot ?? 1) * (playedCard.reward ?? 1));
    const merit = meritBase.base + floor.tier * meritBase.perTier + extraMerit;
    session.accumulatedLootAhn = (session.accumulatedLootAhn || 0) + (def.noRewards ? 0 : loot);
    if (!def.noRewards) {
      char.merit = (char.merit || 0) + merit;
      session.accumulatedMerit = (session.accumulatedMerit || 0) + merit;
    }
    notes.push(floor.kind === 'boss'
      ? { vi: `${enemy.nameVi} đổ xuống và không đứng dậy nữa.`, en: `${enemy.nameEn} falls and does not rise again.` }
      : { vi: `${enemy.nameVi} gục xuống. Lối đi phía trước mở ra.`, en: `${enemy.nameEn} goes down. The way ahead opens.` });
    fx = floor.kind === 'boss' ? 'boss-down' : 'break';
    // Getting through a floor lets the breath out a little
    session.sanityStrain = clamp((session.sanityStrain || 0) + COMBAT_BALANCE.clearRelief, 0, 100);
  } else if (floor.kind === 'boss' && c.phase === 1 && enemy.phase2 && c.guard <= Math.floor(c.guardMax / 2)) {
    c.phase = 2;
    c.turn = 0;
    notes.push({ vi: enemy.phaseVi, en: enemy.phaseEn });
    fx = 'phase';
  }

  if (dungeonUsesCards(def)) {
    if (cleared) c.floorPlays = 0;
    Object.assign(session, nextHand(session, char));
  }

  const vi = notes.map((n) => n.vi).join(' ');
  const en = notes.map((n) => n.en).join(' ');
  session.lastStageResult = {
    type: quality === 'poor' ? 'check_fail' : 'check_ok', stageNum: c.floor + 1, stageNameVi: stage.nameVi, stageNameEn: stage.nameEn,
    vi, en, hpDelta: -hp, spDelta: -sp, fx, nonce: session.fxNonce
  };
  ctx.log(char, session, def, stage, session.lastStageResult);

  if (ctx.fatalBreak(def) && (char.stats.health <= 0 || char.stats.sanity <= 0 || session.sanityStrain >= ctx.breakAt)) {
    return ctx.finishJudgment(char, session, stage, false);
  }
  if (char.stats.health <= 0) return ctx.finishDead(char, session, def, stage);
  if (char.stats.sanity <= 0 || session.sanityStrain >= ctx.breakAt) return ctx.finishBroken(char, session, def, stage);

  if (cleared) {
    if (c.floor >= c.plan.length - 1) {
      c.done = true;
      session.currentStageIndex = def.stages.length - 1;
      if (def.fatalOnFinalFailure) return ctx.finishJudgment(char, session, stage, true);
    } else {
      enterFloor(session, char, c.floor + 1);
    }
  }
  return { char, session, isFinished: false, resolution: null };
}

/** At a rest the player may leave; in a fight there is no way out but through. */
export const canLeaveGauntlet = (session) => !session?.combat || session.combat.done || session.combat.plan[session.combat.floor]?.kind === 'rest';
// A locked train keeps its rests but never opens a way out of them
export const isLockedDungeon = (def) => Boolean(def?.locked);
