import assert from 'node:assert/strict';
import { createNewCharacter, createRNG, cloneChar, DUNGEON_DEFINITIONS } from '../src/engine/gameEngine.js';
import { planYear, chooseYearLead, runDueItems, resolveMinor, LIFE_MINORS, MINOR_WINDOW_MS, FIRST_MINOR_WINDOW_MS } from '../src/engine/yearPlanner.js';
import { addScar, activeScarSynergies, scarAnnualEffects } from '../src/engine/scarModel.js';
import { createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice, evaluateDungeonChoiceOdds, playDungeonCard, CARD_BUDGET } from '../src/engine/dungeonEngine.js';

let offeredLeads = 0;
let quietLeads = 0;
for (let i = 0; i < 100; i++) {
  const char = createNewCharacter({ seed: `lead-${i}`, startAge: 25 });
  char.job = ['Fixer', 'Syndicate', 'Wing Employee', 'Outcast', 'Distortion'][i % 5];
  if (char.job === 'Distortion') char.flags.push('Distorted');
  planYear(char, createRNG(`${char.seed}:year`));
  const draft = char.pendingLead;
  if (!draft) { quietLeads++; continue; }
  offeredLeads++;
  assert.equal(draft?.offers.length, 3, `${char.job} has three offers`);
  assert.equal(new Set(draft.offers.map((offer) => offer.id)).size, 3);
  const chosen = chooseYearLead(char, i % 3);
  assert.equal(chosen.pendingLead, null);
  assert.equal(chosen.leadChoice.id, draft.offers[i % 3].id);
  assert.equal(chosen.plan.filter((item) => item.lead).length, 1);
  assert.ok(LIFE_MINORS.some((entry) => entry.id === chosen.leadChoice.id));
  assert.equal(cloneChar(JSON.parse(JSON.stringify(chosen))).plan.filter((item) => item.lead).length, 1);
  assert.equal(chooseYearLead(chosen, 0), chosen, 'a year cannot be drafted twice');
}
assert(offeredLeads > 0 && quietLeads > 0, 'extra leads appear sometimes, not every year');

{
  const first = createNewCharacter({ seed: 'first-timed-encounter', startAge: 7, preferredRegionId: 'K' });
  first.stats.health = 50;
  first.plan = [{ kind: 'minor', id: 'm_med_child_remedy', t: 0.1 }];
  first.planCursor = 0;
  const opened = runDueItems(first, 10, createRNG('first-timed-encounter')).char;
  assert.equal(opened.pendingMinor?.remainingMs, FIRST_MINOR_WINDOW_MS, 'the first timed encounter gives time to read');
  const passed = resolveMinor(opened, -1, createRNG('first-timed-choice'));
  assert.equal(passed.firstTimedMinorSeen, true, 'passing still counts as having seen the encounter');
  passed.plan = [{ kind: 'minor', id: 'm_med_child_remedy', t: 0.1 }];
  passed.planCursor = 0;
  const next = runDueItems(passed, 10, createRNG('later-timed-encounter')).char;
  assert.equal(next.pendingMinor?.remainingMs, MINOR_WINDOW_MS, 'later encounters keep the normal clock');
  assert.equal(cloneChar(JSON.parse(JSON.stringify(passed))).firstTimedMinorSeen, true, 'the first encounter state survives saving');
}

const scarred = createNewCharacter({ seed: 'synergy', startAge: 25 });
addScar(scarred, 'Vết móc câu Sweeper 3:13 AM');
addScar(scarred, 'Thanh kiếm tôi bằng máu mình');
assert.ok(activeScarSynergies(scarred).some((entry) => entry.id === 'cornered_blade'));
assert.equal(scarAnnualEffects({ ...scarred, age: 26 }).heat, 3);
assert.equal(scarAnnualEffects({ ...scarred, age: 27 }).heat, 2, 'the pairing bills only every other year');

const repaired = createNewCharacter({ seed: 'repair', startAge: 25 });
addScar(repaired, 'Vết dao trả nợ');
addScar(repaired, 'Chiếc hộp từ nhà máy');
assert.ok(activeScarSynergies(repaired).some((entry) => entry.id === 'field_repair'));
assert.equal(scarAnnualEffects({ ...repaired, age: 26 }).wealth, -2);
assert.equal(scarAnnualEffects({ ...repaired, age: 27 }).wealth, -1);
const baseSupply = createDungeonSession('dungeon_warp_train', createNewCharacter({ seed: 'base', startAge: 25 })).maxSupplies;
assert.equal(createDungeonSession('dungeon_warp_train', repaired).maxSupplies, baseSupply + 1);

const fighter = createNewCharacter({ seed: 'deep-wager', startAge: 25 });
fighter.job = 'Fixer';
fighter.pendingDungeon = createDungeonSession('dungeon_warp_train', fighter);
const restIndex = fighter.pendingDungeon.combat.plan.findIndex((floor) => floor.kind === 'rest');
fighter.pendingDungeon.combat.floor = restIndex;
const stage = getDungeonCurrentStage(fighter.pendingDungeon);
const pushIndex = stage.choices.findIndex((choice) => choice.restAction === 'push');
assert.ok(pushIndex >= 0);
const pushed = resolveDungeonChoice(fighter, pushIndex, () => 0.5).char;
assert.equal(pushed.pendingDungeon.delveStake, 1);
const fightStage = getDungeonCurrentStage(pushed.pendingDungeon);
const guard = fightStage.choices.find((choice) => choice.combatAction === 'guard');
const withStake = evaluateDungeonChoiceOdds(guard, pushed, pushed.pendingDungeon);
const withoutStake = evaluateDungeonChoiceOdds(guard, pushed, { ...pushed.pendingDungeon, delveStake: 0 });
assert.ok(withStake.estHp <= withoutStake.estHp, 'pressing on cannot make incoming damage safer');

console.log('Roguelike loop: seeded annual offers, single commitment, saved draft, scar tradeoffs and dungeon wager passed.');

{
  const stale = createNewCharacter({ seed: 'lead-stale', startAge: 25 });
  planYear(stale, createRNG(`${stale.seed}:year`));
  stale.pendingLead ||= { age: stale.age, offers: [{ id: 'm_med_backstreet_clinic', tier: 'steady' }] };
  const old = cloneChar(stale);
  old.age += 1;
  assert.equal(chooseYearLead(old, 0).pendingLead, null, 'a draft left over from another year is dropped');
  const dead = cloneChar(stale);
  dead.pendingLead = { age: dead.age, offers: [{ id: 'no_such_event', tier: 'steady' }] };
  assert.equal(chooseYearLead(dead, 0).pendingLead, null, 'a draft with no usable offer is dropped');
}

{
  const claw = createNewCharacter({ seed: 'claw-rest', startAge: 30 });
  claw.job = 'Fixer';
  const session = createDungeonSession('dungeon_claw_judgment', claw);
  session.combat.floor = session.combat.plan.findIndex((floor) => floor.kind === 'rest');
  const restChoices = getDungeonCurrentStage(session).choices;
  assert.ok(restChoices.some((choice) => choice.restAction === 'rest'));
  assert.ok(!restChoices.some((choice) => choice.restAction === 'push'), 'a dungeon with no rewards offers no wager');
  for (let i = 0; i < 40; i++) {
    const c = createNewCharacter({ seed: `tier-${i}`, startAge: 25 });
    planYear(c, createRNG(`${c.seed}:year`));
    if (c.pendingLead) assert.equal(c.pendingLead.offers.length, 3);
  }
}

{
  const card = createNewCharacter({ seed: 'card-hand', startAge: 30 });
  card.job = 'Fixer';
  const session = createDungeonSession('dungeon_outskirts_ruins', card);
  assert.equal(session.cardHand.length, 3, 'a card dungeon deals three cards');
  assert.equal(session.cardPile.length + session.cardHand.length, 10, 'the deck holds ten');
  assert.ok(!createDungeonSession('dungeon_great_lake', card).cardHand, 'only dungeons that opt in deal cards');
  card.pendingDungeon = session;
  const id = session.cardHand[0];
  const played = playDungeonCard(card, id);
  assert.equal(played.pendingDungeon.cardActive, id);
  assert.equal(played.pendingDungeon.cardHand.length, 2);
  assert.equal(playDungeonCard(played, played.pendingDungeon.cardHand[0]), played, 'one card at a time');
  const second = { ...played, pendingDungeon: { ...played.pendingDungeon, cardActive: null, cardsPlayed: CARD_BUDGET } };
  assert.equal(playDungeonCard(second, second.pendingDungeon.cardHand[0]), second, 'the budget is a hard cap');
  assert.equal(playDungeonCard(card, 'not_a_card'), card);
  const stage = getDungeonCurrentStage(session);
  const choiceIdx = stage.choices.findIndex((c) => c.checkTrait);
  if (choiceIdx >= 0) {
    const plain = evaluateDungeonChoiceOdds(stage.choices[choiceIdx], card, session);
    const read = playDungeonCard({ ...card, pendingDungeon: { ...session, cardHand: ['read_blow'] } }, 'read_blow');
    assert.ok(evaluateDungeonChoiceOdds(stage.choices[choiceIdx], read, read.pendingDungeon).successPct > plain.successPct, 'a card moves the odds the screen shows');
  }
  const done = resolveDungeonChoice(played, 0, () => 0.5);
  if (done.char.pendingDungeon) {
    assert.equal(done.char.pendingDungeon.cardActive, null, 'a card lasts for one stage');
    assert.equal(done.char.pendingDungeon.cardHand.length, 3, 'a new hand is dealt');
  }
}

{
  const plain = createNewCharacter({ seed: 'card-ego', startAge: 30 });
  plain.job = 'Fixer';
  const deal = (c) => createDungeonSession('dungeon_outskirts_ruins', c);
  const dealt = deal(plain);
  assert.ok(![...dealt.cardPile, ...dealt.cardHand].includes('ego'), 'an unawakened character holds no E.G.O card');
  const awake = { ...plain, flags: [...plain.flags, 'EGOAwakened'] };
  const awakeSession = deal(awake);
  assert.ok([...awakeSession.cardPile, ...awakeSession.cardHand].includes('ego'), 'an awakened one does');
  assert.equal(playDungeonCard({ ...plain, pendingDungeon: { ...dealt, cardHand: ['ego'] } }, 'ego').pendingDungeon.cardActive, null, 'the card cannot be forced on someone who has not woken it');

  for (const [hp, ok] of [[6, false], [7, true], [1, false], [80, true]]) {
    const c = { ...awake, stats: { ...awake.stats, health: hp, sanity: 50 }, pendingDungeon: { ...awakeSession, cardHand: ['blood'] } };
    const r = playDungeonCard(c, 'blood');
    assert.equal(Boolean(r.pendingDungeon.cardActive), ok, `Trade Blood at ${hp} HP`);
    assert.ok(r.stats.health >= 1, 'a card never leaves a living character at zero HP');
  }
  for (const sp of [8, 9, 3]) {
    const c = { ...awake, stats: { ...awake.stats, health: 80, sanity: sp }, pendingDungeon: { ...awakeSession, cardHand: ['ego'] } };
    const r = playDungeonCard(c, 'ego');
    assert.ok(r.stats.sanity >= 1, `Open the E.G.O at ${sp} SP never leaves zero`);
  }
  const twin = { ...plain, pendingDungeon: { ...dealt, cardHand: ['bluff', 'bluff', 'bluff'] } };
  assert.equal(playDungeonCard(twin, 'bluff').pendingDungeon.cardHand.length, 2, 'duplicates in hand play one at a time');
  const dock = (await import('node:fs')).readFileSync(new URL('../src/features/chronicle/components/DungeonDock.jsx', import.meta.url), 'utf8');
  assert.ok(/key=\{`\$\{id\}-\$\{slot\}`\}/.test(dock), 'cards in hand are keyed by slot as well as id');
}

{
  const c = createNewCharacter({ seed: 'card-scan', startAge: 30 });
  c.job = 'Fixer';
  const s = createDungeonSession('dungeon_outskirts_ruins', c);
  const scanned = { ...c, pendingDungeon: { ...s, cardHand: ['cold'], stageScanned: true } };
  assert.equal(playDungeonCard(scanned, 'cold'), scanned, 'Cold Count is refused once the stage is already scanned');
  const fresh = { ...c, pendingDungeon: { ...s, cardHand: ['cold'], stageScanned: false } };
  assert.equal(playDungeonCard(fresh, 'cold').pendingDungeon.stageScanned, true);
  const dock = (await import('node:fs')).readFileSync(new URL('../src/features/chronicle/components/DungeonDock.jsx', import.meta.url), 'utf8');
  assert.ok(dock.includes('dg-hand-spent'), 'spent hands collapse to one line');
}

{
  const fall = (restored) => {
    const c = createNewCharacter({ seed: `warp-${restored}`, startAge: 30 });
    c.job = 'Fixer'; c.stats.health = 1; c.stats.sanity = 90; c.stats.wealth = 60; c.warpRestored = restored;
    c.pendingDungeon = createDungeonSession('dungeon_warp_train', c);
    let r = { char: c, isFinished: false };
    for (let i = 0; i < 40 && !r.isFinished; i++) {
      const stage = getDungeonCurrentStage(r.char.pendingDungeon);
      const idx = stage.choices.findIndex((ch) => ch.combatAction === 'strike' || ch.restAction === 'push');
      r = resolveDungeonChoice(r.char, Math.max(0, idx), () => 0.99);
    }
    return r;
  };
  const flee = createNewCharacter({ seed: 'warp-locked', startAge: 30 });
  flee.job = 'Fixer';
  const session = createDungeonSession('dungeon_warp_train', flee);
  session.combat.floor = session.combat.plan.findIndex((floor) => floor.kind === 'rest');
  const rest = getDungeonCurrentStage(session).choices;
  assert.ok(!rest.some((choice) => choice.restAction === 'leave'), 'the doors of a WARP train do not open');
  assert.ok(rest.some((choice) => choice.restAction === 'rest'));

  const first = fall(0);
  assert.equal(first.resolution?.outcome, 'restored', 'the first fall is put right by the cleaners');
  assert.equal(first.char.alive, true);
  assert.equal(first.char.warpRestored, 1);
  assert.equal(first.char.stats.health, 22);
  assert.ok(first.char.stats.wealth < 60, 'the invoice is paid in Ahn');
  assert.ok(first.char.flags.includes('WarpRestored'));
  const last = fall(2);
  assert.equal(last.char.alive, false, 'a body can only be put back so many times');
  assert.equal(last.resolution?.outcome, 'dead');
}

{
  const defs = ['dungeon_warp_train', 'dungeon_lobotomy_ruin', 'dungeon_bloodfiend_carnival', 'dungeon_outskirts_ruins', 'dungeon_great_lake', 'dungeon_backstreets_night'];
  const texts = new Set();
  for (const id of defs) {
    const def = DUNGEON_DEFINITIONS[id];
    assert.ok(def?.fall?.vi && def.fall.en && def.fall.causeVi && def.fall.causeEn, `${id} has a fall of its own`);
    assert.ok(!/[—–]/.test(def.fall.vi + def.fall.en), `${id} fall text has no long dash`);
    texts.add(def.fall.vi);
  }
  assert.equal(texts.size, defs.length, 'no two dungeons end a life with the same words');
}
