import assert from 'node:assert/strict';
import { ALL_STORY_EVENTS, createNewCharacter, resolveEventChoice } from '../src/engine/gameEngine.js';
import {
  DUNGEON_DEFINITIONS, createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice,
  isDungeonChoiceAvailable, evaluateDungeonChoiceOdds, fleeDungeon
} from '../src/engine/dungeonEngine.js';
import { joinAffiliation } from '../src/engine/affiliation.js';
import { gateProfileOf, nextGateDueAge, planFirstGate } from '../src/engine/dungeonPacing.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';

function delver(seed, extra = {}) {
  const c = createNewCharacter({ seed, startAge: 30 });
  Object.assign(c, { job: 'Fixer', fixerGrade: 6, alive: true, ...extra });
  c.stats = { health: 95, sanity: 90, wealth: 40, rep: 40, network: 40 };
  c.npcs = {};
  return c;
}
const start = (c, id) => { c.pendingDungeon = createDungeonSession(id, c); return c; };
const pickWhere = (c, pred) => getDungeonCurrentStage(c.pendingDungeon).choices.findIndex(pred);
const always = () => 0;

// Six dungeons, each still four main stages, each with a side room, a shortcut and a report choice
const ids = Object.keys(DUNGEON_DEFINITIONS);
assert.ok(ids.includes('dungeon_backstreets_night'));
for (const id of ids) {
  const def = DUNGEON_DEFINITIONS[id];
  assert.equal(def.stages.length, 4, id);
  assert.ok(def.sideRoom?.choices?.length >= 2, `${id} side room`);
  assert.ok(def.stages.some((s) => s.choices.some((c) => c.side === def.sideRoom.id)), `${id} side door`);
  assert.ok(def.stages[1].choices.some((c) => c.goto === 3), `${id} shortcut`);
  assert.ok(def.stages[3].choices.some((c) => c.reportAff), `${id} report`);
  assert.ok(def.variants?.[2]?.choices?.length >= 2, `${id} variant`);
}

// The side room is one extra stage, then the route resumes where it would have gone
const side = start(delver('dg-side'), 'dungeon_warp_train');
const door = pickWhere(side, (c) => c.side);
let step = resolveDungeonChoice(side, door, always);
assert.equal(step.session.inSide.id, 'warp_luggage');
assert.equal(getDungeonCurrentStage(step.session).isSide, true);
step = resolveDungeonChoice(step.char, 1, always);
assert.equal(step.session.inSide, null);
assert.equal(step.session.currentStageIndex, 1, 'back on the main route at the next stage');

// The shortcut skips to the last stage on success and only moves one stage on failure
const fast = start(delver('dg-fast'), 'dungeon_lobotomy_ruin');
fast.pendingDungeon.currentStageIndex = 1;
const cut = pickWhere(fast, (c) => c.goto === 3);
assert.equal(resolveDungeonChoice(fast, cut, always).session.currentStageIndex, 3);
const slow = start(delver('dg-fast'), 'dungeon_lobotomy_ruin');
slow.pendingDungeon.currentStageIndex = 1;
const failed = resolveDungeonChoice(slow, cut, () => 0.999);
assert.equal(failed.session.currentStageIndex, 2);

// A seeded variant: the same seed and age always open the same third stage
let variants = 0;
for (let i = 0; i < 40; i++) {
  const c = delver(`dg-var-${i}`);
  const a = createDungeonSession('dungeon_great_lake', c).variant;
  assert.equal(createDungeonSession('dungeon_great_lake', c).variant, a);
  if (a === 2) {
    variants++;
    const s = { ...createDungeonSession('dungeon_great_lake', c), currentStageIndex: 2 };
    assert.equal(getDungeonCurrentStage(s).isVariant, true);
  }
}
assert.ok(variants > 8 && variants < 32, `variant share ${variants}/40`);

// A companion: comes along, can be sent ahead, can be hurt or lost, and the run moves the bond
const withPartner = (seed, bond) => {
  const c = delver(seed);
  c.npcs.partner = { role: 'partner', nameVi: 'Hạ', nameEn: 'Ha', bond, status: 'alive', metAge: 20, lastSeen: 30 };
  return start(c, 'dungeon_bloodfiend_carnival');
};
const team = withPartner('dg-team', 70);
assert.equal(team.pendingDungeon.companion.role, 'partner');
team.pendingDungeon.currentStageIndex = 1;
const leadIdx = pickWhere(team, (c) => c.companionLead);
assert.ok(leadIdx >= 0, 'middle stages offer sending the companion ahead');
const leadOdds = evaluateDungeonChoiceOdds(getDungeonCurrentStage(team.pendingDungeon).choices[leadIdx], team, team.pendingDungeon);
assert.ok(leadOdds.successPct >= 55 && leadOdds.estHp === 0);
const hp = team.stats.health;
const ledOk = resolveDungeonChoice(team, leadIdx, always);
assert.equal(ledOk.char.stats.health, hp, 'you take no wound when they go first');
assert.equal(ledOk.char.npcs.partner.bond, 72);
assert.match(ledOk.session.lastStageResult.vi, /Hạ đi trước/);
const hurtRun = withPartner('dg-hurt', 70);
hurtRun.pendingDungeon.currentStageIndex = 1;
let rolls = [0.99, 0.99];
const hurt = resolveDungeonChoice(hurtRun, leadIdx, () => rolls.shift() ?? 0.99);
assert.equal(hurt.char.npcs.partner.bond, 67);
assert.equal(hurt.char.npcs.partner.status, 'alive');
const lostRun = withPartner('dg-lost', 20);
lostRun.pendingDungeon.currentStageIndex = 1;
rolls = [0.99, 0.0];
const lost = resolveDungeonChoice(lostRun, leadIdx, () => rolls.shift() ?? 0.5);
assert.equal(lost.char.npcs.partner.deceased, true);
assert.ok(lost.char.flags.includes('PartnerLost'));
assert.equal(lost.session.companion, null);
assert.match(lost.session.lastStageResult.vi, /không quay lại/);
// A close companion takes half a blow once
const saveRun = withPartner('dg-save', 80);
saveRun.pendingDungeon.currentStageIndex = 1;
const nerveIdx = pickWhere(saveRun, (c) => c.checkTrait && (c.fx?.health ?? 0) < 0);
assert.ok(nerveIdx >= 0);
const alone = start(delver('dg-save'), 'dungeon_bloodfiend_carnival');
alone.pendingDungeon.currentStageIndex = 1;
rolls = [0.999, 0.0];
const saved = resolveDungeonChoice(saveRun, nerveIdx, () => rolls.shift() ?? 0.5);
const unsaved = resolveDungeonChoice(alone, nerveIdx, () => 0.999);
assert.ok(saved.session.companionSaved);
assert.ok(saved.char.stats.health > unsaved.char.stats.health, 'the save halves the wound');
// The run ends: a win brings the companion closer
const winner = withPartner('dg-win', 50);
winner.pendingDungeon.currentStageIndex = 3;
const won = resolveDungeonChoice(winner, 1, always);
assert.equal(won.resolution.outcome, 'conquered');
assert.equal(won.char.npcs.partner.bond, 54);
const quitter = withPartner('dg-quit', 50);
assert.equal(fleeDungeon(quitter).char.npcs.partner.bond, 51);

// Reporting is only for someone with a badge, and pays more when the dungeon fits the Association
const lone = start(delver('dg-report'), 'dungeon_outskirts_ruins');
lone.pendingDungeon.currentStageIndex = 3;
const reportIdx = pickWhere(lone, (c) => c.reportAff);
assert.equal(isDungeonChoiceAvailable(getDungeonCurrentStage(lone.pendingDungeon).choices[reportIdx], lone), false);
const scholar = delver('dg-report-dieci');
joinAffiliation(scholar, 'dieci');
start(scholar, 'dungeon_outskirts_ruins').pendingDungeon.currentStageIndex = 3;
const reported = resolveDungeonChoice(scholar, reportIdx, always);
assert.equal(reported.char.affiliation.standing, 64, 'Dieci values a Ruins report most');
assert.equal(scholar.affiliation.standing, 50, 'the previous state is not edited in place');
const guard = delver('dg-report-zwei');
joinAffiliation(guard, 'zwei');
start(guard, 'dungeon_outskirts_ruins').pendingDungeon.currentStageIndex = 3;
assert.equal(resolveDungeonChoice(guard, reportIdx, always).char.affiliation.standing, 58);

// A run taken for the Association moves standing at the end
const zwei = delver('dg-assoc');
joinAffiliation(zwei, 'zwei');
const assocGate = ALL_STORY_EVENTS.find((e) => e.id === 'gate_assoc_zwei_carnival');
assert.equal(matchesEventContext(assocGate, zwei), true);
assert.equal(matchesEventContext(assocGate, delver('dg-assoc-none')), false);
zwei.pendingEvent = assocGate;
const inRun = resolveEventChoice(zwei, 0, () => 0.5);
assert.equal(inRun.pendingDungeon.aff, 'zwei');
inRun.pendingDungeon.currentStageIndex = 3;
assert.equal(resolveDungeonChoice(inRun, 0, always).char.affiliation.standing, 60);
const refused = { ...zwei, pendingEvent: assocGate, affiliation: { ...zwei.affiliation } };
assert.equal(resolveEventChoice(refused, 2, () => 0.5).affiliation.standing, 45);

// Carrying something out plants a callback
const keeper = start(delver('dg-keep'), 'dungeon_lobotomy_ruin');
keeper.pendingDungeon.currentStageIndex = 3;
const kept = resolveDungeonChoice(keeper, 0, always).char;
assert.ok(kept.flags.includes('KeptDungeonTrophy'));
assert.ok(kept.weaver.pendingThreads.some((t) => t.eventId === 'csq_dungeon_trophy_kept'));
assert.ok(ALL_STORY_EVENTS.some((e) => e.id === 'csq_dungeon_trophy_kept'));

// Every Finger has its own Night gate; a Finger member is guaranteed more gates than a Fixer
for (const finger of ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky']) {
  const m = delver(`dg-finger-${finger}`, { job: 'Syndicate', finger, fingerRank: 0 });
  const own = ALL_STORY_EVENTS.filter((e) => e.id.startsWith('gate_night_') && matchesEventContext(e, m));
  assert.equal(own.length, 1, `${finger} has one Night gate`);
}
assert.ok(gateProfileOf({ job: 'Syndicate' }).guaranteed > gateProfileOf({ job: 'Fixer' }).guaranteed);
assert.ok(gateProfileOf({ job: 'Syndicate' }).cooldown < gateProfileOf({ job: 'Fixer' }).cooldown);
const member = delver('dg-quota', { job: 'Syndicate', finger: 'Ring', fingerRank: 0 });
member.weaver.pendingThreads = [];
member.seenEvents = ['gate_night_ring_material'];
member.lastGateAge = member.age;
const due = nextGateDueAge(member);
assert.ok(due >= member.age + 5 && due <= member.age + 8, 'a second gate is due five to eight years later');
member.age = due - 1;
assert.equal(planFirstGate(member), true);
member.seenEvents = [...member.seenEvents, 'gate_bloodfiend_syndicate_hostage', 'gate_outskirts_salvage_crew'];
assert.equal(nextGateDueAge(member), null, 'three gates fill the quota');
const fixerDone = delver('dg-fixer-quota');
fixerDone.seenEvents = ['gate_warp_fixer_request'];
assert.equal(nextGateDueAge(fixerDone), null, 'a Fixer is guaranteed one');

// The Night itself: four stages, three waves, and the Backstreets know it best
const night = DUNGEON_DEFINITIONS.dungeon_backstreets_night;
assert.match(night.kickerVi, /3 giờ 13/);
assert.match(night.stages[0].nameVi, /thứ nhất/);
assert.match(night.stages[2].nameVi, /thứ ba/);
console.log(`Dungeon variety: ${ids.length} dungeons with side rooms, shortcuts, seeded variants, companions, reports, Association runs, callbacks and branch pacing passed.`);
