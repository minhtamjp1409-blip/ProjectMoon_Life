import assert from 'node:assert/strict';
import { createNewCharacter, createDungeonSession, getDungeonCurrentStage, evaluateDungeonChoiceOdds, resolveDungeonChoice } from '../src/engine/gameEngine.js';
import { DUNGEON_CARDS, playDungeonCard, cardPlayable } from '../src/engine/dungeonCards.js';

const IDS = [...new Set([...Object.keys(DUNGEON_CARDS).filter((id) => DUNGEON_CARDS[id].combatOnly), 'steady', 'second', 'cold', 'ego'])];

const fighter = (seed = 'cards') => {
  const c = createNewCharacter({ seed, startAge: 30 });
  c.job = 'Fixer'; c.alive = true;
  c.flags = [...c.flags, 'EGOAwakened'];
  c.stats = { ...c.stats, health: 60, sanity: 70, wealth: 20 };
  c.resonance = 20;
  c.pendingDungeon = createDungeonSession('dungeon_warp_train', c);
  return c;
};
// Put the first fight on a quick attack, so a strike lands a clean counter and the numbers are easy to read
const onIntent = (c, name) => {
  const s = c.pendingDungeon;
  const idx = s.combat.enemy.intents.findIndex((id) => id === name);
  s.combat.offset = Math.max(0, idx);
  s.combat.turn = 0;
  // A tall stance, so that a counter that breaks several beats still leaves the floor standing and the drop can be read
  s.combat.guard = 8;
  s.combat.guardMax = 8;
  return c;
};
const onQuick = (c) => onIntent(c, 'lunge');
const clone = (c) => ({ ...c, stats: { ...c.stats }, logs: [...c.logs], pendingDungeon: { ...c.pendingDungeon, combat: { ...c.pendingDungeon.combat, plan: c.pendingDungeon.combat.plan.map((f) => ({ ...f })) }, cardHand: [...(c.pendingDungeon.cardHand || [])] } });
const withCard = (id, make = fighter, intent = 'lunge') => {
  const base = onIntent(make(), intent);
  base.pendingDungeon.cardHand = [id];
  return { base, played: playDungeonCard(clone(base), id) };
};
const choiceOf = (c, action) => getDungeonCurrentStage(c.pendingDungeon).choices.findIndex((ch) => ch.combatAction === action);
const odds = (c, action) => {
  const stage = getDungeonCurrentStage(c.pendingDungeon);
  return evaluateDungeonChoiceOdds(stage.choices[choiceOf(c, action)], c, c.pendingDungeon);
};

console.log('1. Every fighting card can be played, and its price is paid exactly...');
for (const id of IDS) {
  const card = DUNGEON_CARDS[id];
  const { base, played } = withCard(id);
  assert.equal(played.pendingDungeon.cardActive, id, `${id} can be played in a fight`);
  assert.equal(played.stats.health - base.stats.health, card.now?.health || 0, `${id} price in HP`);
  assert.equal(played.stats.sanity - base.stats.sanity, card.now?.sanity || 0, `${id} price in SP`);
  assert.equal((played.resonance || 0) - (base.resonance || 0), card.now?.resonance || 0, `${id} price in Resonance`);
  assert.equal((played.pendingDungeon.sanityStrain || 0) - (base.pendingDungeon.sanityStrain || 0), card.now?.strain || 0, `${id} price in strain`);
  assert.equal(Boolean(played.pendingDungeon.stageScanned), Boolean(card.scan), `${id} scan flag`);
  assert.ok(card.vi && card.en && card.textVi && card.textEn, `${id} has both languages`);
}

console.log('2. Damage cards change what the screen says you will take...');
for (const id of IDS.filter((i) => DUNGEON_CARDS[i].damage != null)) {
  const { base, played } = withCard(id, fighter, 'crush');
  const before = -odds(base, 'strike').estHp;
  const after = -odds(played, 'strike').estHp;
  const f = DUNGEON_CARDS[id].damage;
  if (f < 1) assert.ok(after < before, `${id} lowers the blow (${before} to ${after})`);
  else if (f > 1) assert.ok(after > before, `${id} raises the blow (${before} to ${after})`);
}

console.log('3. Every card that makes a dodge or a check easier moves the dodge odds in combat...');
for (const id of IDS.filter((i) => (DUNGEON_CARDS[i].evade || 0) + (DUNGEON_CARDS[i].check || 0) > 0)) {
  const { base, played } = withCard(id);
  const gain = (DUNGEON_CARDS[id].evade || 0) + (DUNGEON_CARDS[id].check || 0);
  const b = odds(base, 'evade').successPct;
  const a = odds(played, 'evade').successPct;
  assert.ok(a > b, `${id} raises the dodge chance (${b}% to ${a}%)`);
  assert.ok(a - b >= Math.min(gain * 100 - 2, 90 - b), `${id} raises it by about ${Math.round(gain * 100)} points`);
}

console.log('4. A missed dodge under Slip Step lands heavier, and only then...');
{
  const { base, played } = withCard('slip');
  const miss = () => 0.999;
  const plain = resolveDungeonChoice(clone(base), choiceOf(base, 'evade'), miss).char;
  const slipped = resolveDungeonChoice(clone(played), choiceOf(played, 'evade'), miss).char;
  assert.ok(base.stats.health - slipped.stats.health > base.stats.health - plain.stats.health, 'the miss hurts more with Slip Step');
  const guardPlain = resolveDungeonChoice(clone(base), choiceOf(base, 'guard'), miss).char;
  const guardSlip = resolveDungeonChoice(clone(played), choiceOf(played, 'guard'), miss).char;
  assert.equal(guardSlip.stats.health, guardPlain.stats.health, 'another answer is not made heavier by Slip Step');
}

console.log('5. Cards that cannot break its stance do not, and cards that break more do...');
const guardAfterStrike = (c) => resolveDungeonChoice(clone(c), choiceOf(c, 'strike'), () => 0.5).session?.combat?.guard ?? 0;
{
  const reference = onQuick(fighter());
  const startGuard = reference.pendingDungeon.combat.guard;
  const plainDrop = startGuard - guardAfterStrike(reference);
  assert.ok(plainDrop >= 1, 'a plain counter against a quick attack breaks at least one beat');
  for (const id of IDS.filter((i) => DUNGEON_CARDS[i].noBreak)) {
    const { played } = withCard(id);
    assert.equal(played.pendingDungeon.combat.guard - guardAfterStrike(played), 0, `${id} leaves its stance whole`);
  }
  for (const id of IDS.filter((i) => DUNGEON_CARDS[i].breaks)) {
    const { played } = withCard(id);
    assert.equal(played.pendingDungeon.combat.guard - guardAfterStrike(played), plainDrop + DUNGEON_CARDS[id].breaks, `${id} breaks ${DUNGEON_CARDS[id].breaks} more`);
  }
}

console.log('6. A card lasts one turn, and one played before a rest does not follow into the next fight...');
{
  const { played } = withCard('wall');
  const after = resolveDungeonChoice(clone(played), choiceOf(played, 'guard'), () => 0.5);
  assert.equal(after.session?.cardActive ?? null, null, 'the card is spent after the turn');
  assert.ok((after.session?.cardHand || []).length > 0, 'a new hand is dealt');

  const resting = fighter('rest-carry');
  const s = resting.pendingDungeon;
  s.combat.floor = s.combat.plan.findIndex((f) => f.kind === 'rest');
  s.combat.enemy = null;
  s.cardHand = ['second', 'wall'];
  assert.equal(cardPlayable('wall', resting), false, 'a plain buff has nothing to act on between fights');
  const healed = playDungeonCard(clone(resting), 'second');
  assert.equal(healed.pendingDungeon.cardActive, 'second');
  const restIdx = getDungeonCurrentStage(healed.pendingDungeon).choices.findIndex((ch) => ch.restAction === 'rest');
  const next = resolveDungeonChoice(healed, restIdx, () => 0.5);
  assert.equal(next.session?.cardActive ?? null, null, 'the next fight starts with no card in play');
  assert.equal(next.session?.combat?.floorPlays ?? 0, 0, 'and with a fresh play for the floor');
}

console.log('7. Floor budget: one card a floor...');
{
  const { played } = withCard('wall');
  played.pendingDungeon.cardHand = ['steady', 'cold'];
  const again = playDungeonCard(clone(played), 'steady');
  assert.equal(again.pendingDungeon.cardActive, 'wall', 'a second card on the same floor is refused');
}

console.log('8. Clearing a floor pays more with a loot card...');
{
  const clearWith = (id) => {
    const c = onQuick(fighter('loot'));
    c.pendingDungeon.combat.guard = 1;
    c.pendingDungeon.cardHand = id ? [id] : [];
    const ready = id ? playDungeonCard(clone(c), id) : c;
    return resolveDungeonChoice(clone(ready), choiceOf(ready, 'strike'), () => 0.5).session.accumulatedLootAhn;
  };
  assert.ok(clearWith('alley_run') > clearWith(null), 'The Backstreets Shortcut raises loot on the clearing blow');
}

console.log('Dungeon cards: price, odds, damage, evade, stance, lifetime of a card, floor budget and loot passed for ' + IDS.length + ' cards.');
