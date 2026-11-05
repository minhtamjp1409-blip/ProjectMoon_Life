// One rule of its own for each dungeon (engine/dungeonSignature.js): lamp oil, the 4:34 clock, the Lake Laws,
// the blood market, passengers, L Corp work types, and the Head's suppression. Each is checked doing its one job.
import assert from 'node:assert/strict';
import { createNewCharacter } from '../src/engine/gameEngine.js';
import { createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice, evaluateDungeonChoiceOdds, fleeDungeon, isDungeonChoiceAvailable } from '../src/engine/dungeonEngine.js';
import { SIGNATURE_BALANCE as B, SIGNATURE_OF, signatureMeter, signatureCheckBonus, signatureDamageMult, lawOf, preferredWork, knownLore, settleSignature } from '../src/engine/dungeonSignature.js';
import { DUNGEON_LAWS } from '../src/data/dungeonSignatureText.js';
import { GAUNTLETS } from '../src/data/dungeonGauntlets.js';

const best = { heavy: 'guard', quick: 'strike', sweep: 'evade', mind: 'guard', grab: 'evade', heal: 'strike' };
function person(seed, extra = {}) {
  const c = createNewCharacter({ seed, startAge: 30, sparePerinatal: true });
  c.scars = [];
  Object.assign(c, { job: 'Fixer', fixerGrade: 6, alive: true, npcs: {}, heat: 0, ...extra });
  c.flags = c.flags.filter((f) => f !== 'Distorted');
  c.stats = { health: 95, sanity: 80, wealth: 40, rep: 40, network: 40, ...(extra.stats || {}) };
  return c;
}
const enter = (c, id) => { c.pendingDungeon = createDungeonSession(id, c); return c; };
const stageOf = (c) => getDungeonCurrentStage(c.pendingDungeon);
const idxOf = (c, pred) => stageOf(c).choices.findIndex(pred);
const pick = (c, pred, rng = () => 0) => resolveDungeonChoice(c, idxOf(c, pred), rng).char;
const answer = (c) => {
  const it = stageOf(c).combat.intent;
  return pick(c, (x) => x.combatAction === (it.kind === 'law' ? lawOf(it.law).answer : best[it.kind]) && !x.sealed);
};
// Plays right answers and the first lull choice until `done(c)` or the run ends
function until(c, done, restPick = (x) => x.restAction === 'push' || x.restAction === 'rest') {
  for (let i = 0; i < 80 && c.pendingDungeon && !done(c); i++) {
    const st = stageOf(c);
    c = st.isRest ? pick(c, (x) => restPick(x) || x === st.choices[0]) : st.isCombat ? answer(c) : resolveDungeonChoice(c, 0, () => 0).char;
  }
  return c;
}

// 1. Every dungeon with a rung has a rule of its own, shown in the dock
for (const id of Object.keys(SIGNATURE_OF)) {
  const c = enter(person(`sig-${id}`), id);
  assert.ok(signatureMeter(c.pendingDungeon), `${id} shows its rule`);
}

// 2. Outskirts: every stage burns oil, a checked one twice; short of oil the check is harder; in the dark the way out costs blood
let o = enter(person('sig-oil'), 'dungeon_outskirts_ruins');
assert.equal(o.pendingDungeon.oil, B.oil.start);
o = pick(o, (x) => !x.checkTrait && !x.isFlee);
assert.equal(o.pendingDungeon.oil, B.oil.start - B.oil.plain, 'a plain stage burns one');
const checked = stageOf(o).choices.find((x) => x.checkTrait);
assert.equal(signatureCheckBonus(o.pendingDungeon, checked), 0, 'enough oil: no penalty');
o.pendingDungeon.oil = 1;
assert.equal(signatureCheckBonus(o.pendingDungeon, checked), B.oil.darkCheck, 'too little oil for a check: it is done half in the dark');
o.pendingDungeon.oil = 0;
const hpDark = o.stats.health;
const out = resolveDungeonChoice(o, idxOf(o, (x) => x.isFlee), () => 0.5);
assert.ok(out.isFinished && out.char.stats.health <= hpDark - B.oil.darkFleeHp, 'walking out in the dark costs blood');
const dockLeave = fleeDungeon({ ...o, stats: { ...o.stats }, pendingDungeon: { ...o.pendingDungeon, oil: 0 } });
assert.equal(dockLeave.char.stats.health, o.stats.health - B.oil.darkFleeHp, 'the dock button out costs the same in the dark');
assert.match(dockLeave.resolution.resultVi, /bóng tối/);

// 3. Backstreets: every turn costs minutes; past 4:34 the Sweepers make every blow harder
let n = enter(person('sig-clock'), 'dungeon_backstreets_night');
n = answer(n);
assert.equal(n.pendingDungeon.clockMin, B.clock.turn, 'a turn costs minutes');
assert.equal(signatureDamageMult(n.pendingDungeon), 1);
n.pendingDungeon.clockMin = B.clock.deadline;
n = answer(n);
assert.equal(signatureDamageMult(n.pendingDungeon), B.clock.sweptDamage, 'past 4:34 the blows land harder');
assert.match(n.pendingDungeon.lastStageResult.vi, /4:34/, 'the moment is told');
assert.equal(signatureMeter(n.pendingDungeon).tone, 'bad');

// 4. Great Lake: the second turn of a fight is an omen; a wrong answer writes the law down, the same law broken twice wakes what is below
let l = enter(person('sig-lake'), 'dungeon_great_lake');
l = answer(l);
const omen = stageOf(l).combat.intent;
assert.equal(omen.kind, 'law', 'the second turn brings an omen');
const law = lawOf(omen.law);
const withFriend = { ...l, pendingDungeon: { ...l.pendingDungeon, companion: { role: 'partner', nameVi: 'Yan', nameEn: 'Yan' } }, npcs: { partner: { nameVi: 'Yan', bond: 60, status: 'alive' } } };
assert.equal(getDungeonCurrentStage(withFriend.pendingDungeon).choices.some((x) => x.combatAction === 'ally'), false, 'no one can take a Lake omen for you');
const wrong = ['guard', 'strike', 'evade'].find((a) => a !== law.answer);
const hp0 = l.stats.health;
l = pick(l, (x) => x.combatAction === wrong);
assert.ok(l.stats.health < hp0, 'breaking a law hurts');
assert.ok(knownLore(l).has(`lore:lake_law_${law.id}`), 'and writes the law in the book');
assert.match(l.pendingDungeon.lastStageResult.vi, new RegExp(law.nameVi), 'the book names the law');
// Known next life: the right answer is marked
const heir = enter(person('sig-lake-heir', { dungeonLore: [`lore:lake_law_${law.id}`] }), 'dungeon_great_lake');
heir.pendingDungeon.seed = l.pendingDungeon.seed;
const heirRun = answer(heir);
const heirOmen = stageOf(heirRun).combat.intent;
if (heirOmen.law === law.id) {
  const marked = stageOf(heirRun).choices.find((x) => x.combatAction === law.answer);
  assert.match(marked.labelVi, new RegExp(`theo ${law.nameVi}`), 'a known law marks its answer');
}
// The same law broken twice
const twice = enter(person('sig-lake-twice'), 'dungeon_great_lake');
twice.pendingDungeon.lawWrong = [law.id];
twice.pendingDungeon.lore = [];
const c2 = twice.pendingDungeon.combat;
c2.turn = 1;
const forced = stageOf(twice).combat.intent;
const wrong2 = ['guard', 'strike', 'evade'].find((a) => a !== lawOf(forced.law).answer);
twice.pendingDungeon.lawWrong = [forced.law];
const woke = pick(twice, (x) => x.combatAction === wrong2);
assert.match(woke.pendingDungeon.lastStageResult.vi, /mở mắt/, 'what is below wakes');
assert.equal(DUNGEON_LAWS.length, 6);
assert.ok(DUNGEON_LAWS.every((x) => ['guard', 'strike', 'evade'].includes(x.answer) && x.tellVi && x.tellEn));

// 5. Bloodfiend: the stalls sell for HP; the wine takes a notch off the next guard; buying twice brings the ringmaster
let b = enter(person('sig-blood'), 'dungeon_bloodfiend_carnival');
b = until(b, (c) => stageOf(c).isRest);
assert.ok(idxOf(b, (x) => x.restAction === 'blood_wine') >= 0 && idxOf(b, (x) => x.restAction === 'blood_gold') >= 0, 'the stalls are open at a lull');
const poor = { ...b, stats: { ...b.stats, health: B.market.wineHp } };
assert.equal(isDungeonChoiceAvailable(stageOf(b).choices.find((x) => x.restAction === 'blood_wine'), poor), false, 'a stall will not take the last of you');
const hpB = b.stats.health;
const floorsBefore = b.pendingDungeon.combat.plan.length;
b = pick(b, (x) => x.restAction === 'blood_wine');
assert.equal(b.stats.health, hpB - B.market.wineHp, 'wine costs HP');
const g = b.pendingDungeon.combat;
assert.equal(g.guard, g.guardMax - 1, 'the next enemy starts a notch down');
b = until(b, (c) => stageOf(c).isRest);
b = pick(b, (x) => x.restAction === 'blood_gold');
assert.equal(b.pendingDungeon.combat.plan.length, floorsBefore + 1, 'a second purchase brings the ringmaster');
assert.equal(stageOf(b).nameEn, GAUNTLETS.dungeon_bloodfiend_carnival.elite.nameEn);

// 6. WARP: a passenger led along makes the blows harder and counts at the end
let w = enter(person('sig-warp'), 'dungeon_warp_train');
w = until(w, (c) => stageOf(c).isRest);
w = pick(w, (x) => x.restAction === 'passenger');
assert.equal(w.pendingDungeon.passengers, 1);
assert.equal(signatureDamageMult(w.pendingDungeon), 1 + B.passenger.damage);
const out1 = { stats: { ...w.stats } };
settleSignature(out1, { ...w.pendingDungeon, passengers: 2 }, 'conquered');
assert.equal(out1.stats.network, w.stats.network + 2 * B.passenger.network, 'each passenger brought out is a witness');
const left1 = { stats: { ...w.stats } };
settleSignature(left1, { ...w.pendingDungeon, passengers: 2 }, 'fled');
assert.equal(left1.stats.sanity, w.stats.sanity - 2 * B.passenger.leftSanity, 'each one left behind stays with you');

// 7. Lobotomy: an Abnormality answers to one kind of work; the duty log keeps both what works and what does not
let a = enter(person('sig-lobo'), 'dungeon_lobotomy_ruin');
a = pick(a, (x) => x.combatAction === 'workOpen');
assert.deepEqual(stageOf(a).choices.map((x) => x.workType || x.combatAction), ['instinct', 'insight', 'attachment', 'repression', 'workBack']);
const enemy = a.pendingDungeon.combat.enemy;
const right = preferredWork(enemy);
const wrongWork = ['instinct', 'insight', 'attachment', 'repression'].find((t) => t !== right);
const guardA = a.pendingDungeon.combat.guard;
const spA = a.stats.sanity;
const missed = pick(a, (x) => x.workType === wrongWork);
assert.ok(missed.stats.sanity < spA, 'the wrong work costs the mind');
assert.ok([...knownLore(missed)].some((id) => id.endsWith(`_not_${wrongWork}`)), 'the log notes what does not work');
let hit = pick(missed, (x) => x.combatAction === 'workOpen');
const knownWrong = stageOf(hit).choices.find((x) => x.workType === wrongWork);
assert.match(knownWrong.labelVi, /không phù hợp/);
assert.ok(evaluateDungeonChoiceOdds(knownWrong, hit, hit.pendingDungeon).estSp <= -B.work.wrongSanity, 'the preview carries the fixed cost to the mind');
hit = pick(hit, (x) => x.workType === right);
assert.equal(hit.pendingDungeon.combat.guard, Math.max(0, guardA - B.work.rightBreaks), 'the right work costs it two notches');
assert.equal(idxOf(hit, (x) => x.combatAction === 'workOpen'), -1, 'two works a fight, no more');

// 8. The Head: no lull between the Claw and the Arbiter; the record arms the Beholder; the closest may stand with you once
const friend = { nameVi: 'Yan', nameEn: 'Yan', bond: 80, status: 'alive' };
let h = enter(person('sig-head', { taboo: 3, heat: 70, npcs: { partner: friend } }), 'dungeon_claw_judgment');
assert.deepEqual(h.pendingDungeon.combat.plan.map((f) => f.kind), ['fight', 'rest', 'fight', 'boss']);
assert.equal(h.pendingDungeon.headRecord, 2, 'heat 70 adds two reports to the Beholder');
assert.equal(h.pendingDungeon.combat.enemy.intents.filter((i) => i === 'report').length, GAUNTLETS.dungeon_claw_judgment.floors[0].enemies[0].intents.filter((i) => i === 'report').length + 2);
const allyIdx = idxOf(h, (x) => x.combatAction === 'headAlly');
assert.ok(allyIdx >= 0, 'a friend bonded 70 can be called');
assert.equal(evaluateDungeonChoiceOdds(stageOf(h).choices[allyIdx], h, h.pendingDungeon).estHp, 0);
const hpH = h.stats.health;
h = resolveDungeonChoice(h, allyIdx, () => 0.9).char;
assert.equal(h.stats.health, hpH, 'they take the blow');
assert.equal(h.npcs.partner.injured, true, 'and do not walk away from it');
assert.equal(idxOf(h, (x) => x.combatAction === 'headAlly'), -1, 'once each');
const lost = resolveDungeonChoice(enter(person('sig-head-2', { taboo: 3, npcs: { partner: { ...friend } } }), 'dungeon_claw_judgment'), 3, () => 0).char;
assert.equal(lost.npcs.partner.status, 'dead', 'and may not come back');

const alone = enter(person('sig-head-alone', { taboo: 3 }), 'dungeon_claw_judgment');
const aloneMeter = signatureMeter(alone.pendingDungeon);
assert.equal(aloneMeter.textVi, 'Chưa có ai đủ thân', 'no one close is said plainly');
assert.notEqual(aloneMeter.tone, 'bad');

console.log('Dungeon signatures: oil, the 4:34 clock, Lake Laws across lives, the blood market, passengers, work types, the Head suppression');
