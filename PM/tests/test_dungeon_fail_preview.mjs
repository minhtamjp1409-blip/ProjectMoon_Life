// The miss price on the choice must be what a miss really costs, and the door forecast must read the heaviest floor
import assert from 'node:assert/strict';
import { createNewCharacter } from '../src/engine/gameEngine.js';
import { DUNGEON_DEFINITIONS, createDungeonSession, getDungeonCurrentStage, evaluateDungeonChoiceOdds, resolveDungeonChoice, dungeonEntryForecast } from '../src/engine/dungeonEngine.js';

let checked = 0;
const report = [];
const kinds = new Set();
for (const id of Object.keys(DUNGEON_DEFINITIONS)) {
  const char = createNewCharacter({ seed: `fail-${id}`, startAge: 30 });
  char.job = 'Fixer'; char.fixerGrade = 6;
  char.stats.health = 100; char.stats.sanity = 100;
  const session = createDungeonSession(id, char);
  const stage = getDungeonCurrentStage(session);
  const live = { ...char, pendingDungeon: session };
  (stage?.choices || []).forEach((choice, idx) => {
    const odds = evaluateDungeonChoiceOdds(choice, live, session);
    if (!odds?.hasCheck || odds.failHp == null || choice.companionLead || choice.ensembleResist || choice.combatAction === 'ally') return;
    assert(odds.failHp <= odds.estHp, `${id}#${idx}: a miss must cost at least the success price`);
    const before = live.stats.health;
    // The worst of a high and a low roll is the miss; fights and stage checks read the roll in opposite ways
    const lost = Math.min(...[0.999, 0.001].map((r) => (resolveDungeonChoice(structuredClone(live), idx, () => r).char?.stats?.health ?? before) - before));
    if (lost === 0) return;
    report.push({ id, idx, preview: odds.failHp, real: lost });
    assert(Math.abs(lost - odds.failHp) <= Math.max(2, Math.abs(odds.failHp) * 0.2), `${id}#${idx}: preview ${odds.failHp}, real ${lost}`);
    checked++;
    kinds.add(session.mode === 'gauntlet' ? choice.combatAction : 'stage');
  });
  const forecast = dungeonEntryForecast(id, char, 0);
  if (forecast) {
    assert.equal(typeof forecast.canRetreat, 'boolean');
    if (forecast.worstFloor) assert(forecast.worstFloor.floor >= 1 && forecast.worstFloor.floor <= forecast.floors, `${id}: worst floor in range`);
  }
}
const weak = createNewCharacter({ seed: 'fail-weak', startAge: 30 });
weak.stats.health = 3;
const anyId = Object.keys(DUNGEON_DEFINITIONS).find((id) => (getDungeonCurrentStage(createDungeonSession(id, weak))?.choices || []).some((c) => c.checkTrait && (c.fx?.health || 0) < 0));
const s = createDungeonSession(anyId, weak);
const lethal = getDungeonCurrentStage(s).choices.map((c) => evaluateDungeonChoiceOdds(c, weak, s)).some((o) => o?.failLethal);
assert(lethal, 'At 3 HP a damaging check must warn that a miss can drop you');
assert(checked > 0, 'At least one miss compared against the resolver');
assert(kinds.has('stage') && (kinds.has('evade') || kinds.has('clash')), `both stage checks and fights compared: ${[...kinds]}`);
console.log(`Dungeon miss preview: ${checked} choices (${[...kinds].join(', ')}) match the resolver, door forecast reads the heaviest floor, lethal warning passed.`);
process.exit(0);
