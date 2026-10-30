// One simulated year of a life, shared by the sims that watch what a player meets.
// `pickIndex` comes from choicePolicy.mjs; `onResolve(char, kind, id)` is called just before each pending thing is answered.
import { resolveEventChoice, resolveDungeonChoice, getDungeonCurrentStage, isDungeonChoiceAvailable, resolveFixerContract } from '../../../src/engine/gameEngine.js';
import { planYear, chooseDirectorPacedLead, runDueItems, resolveMinor, endYear } from '../../../src/engine/yearPlanner.js';
import { careerAgeOf, CAREER_CROSSROAD_IDS } from '../../../src/engine/careerAge.js';

export function playYear(charState, rng, pickIndex, onResolve = () => {}) {
  let char = charState;
  if (!char.plan?.length) planYear(char, rng);
  if (char.pendingLead) char = chooseDirectorPacedLead(char, rng);
  for (let t = 0; t <= 100 && char.alive; t += 2) {
    char = runDueItems(char, t, rng).char;
    let spin = 0;
    while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 8) {
      if (char.pendingEvent) {
        onResolve(char, 'event', char.pendingEvent.id);
        char = resolveEventChoice(char, Math.max(0, pickIndex(char.pendingEvent.choices, rng, char, char.pendingEvent.id)), rng);
      } else if (char.pendingDungeon) {
        const stage = getDungeonCurrentStage(char.pendingDungeon);
        const usable = stage.choices.map((c, k) => k).filter((k) => isDungeonChoiceAvailable(stage.choices[k], char));
        onResolve(char, 'dungeon', char.pendingDungeon.id);
        char = resolveDungeonChoice(char, usable[Math.floor(rng() * usable.length)], rng).char;
      } else if (char.pendingMinor) {
        onResolve(char, 'minor', char.pendingMinor.id);
        char = resolveMinor(char, pickIndex(char.pendingMinor.choices, rng, char, char.pendingMinor.id), rng);
      } else if (char.pendingContract) {
        const ap = char.pendingContract.approaches;
        char = resolveFixerContract(char, ap[Math.floor(rng() * ap.length)].id, rng);
      } else {
        char.pendingModal = null;
      }
    }
  }
  if (char.alive) char = endYear(char, rng);
  return char;
}

/**
 * Puts a life on a route at its own working age, once. The livelihood crossroad is already in the plan by then;
 * left there it would pick a livelihood over the forced one, so it is removed. Returns true on the year it happened.
 */
export function forceRoute(char, job) {
  if (char.age < careerAgeOf(char)) return false;
  char.plan = (char.plan || []).filter((item) => !CAREER_CROSSROAD_IDS.includes(item.forcedEventId));
  if (CAREER_CROSSROAD_IDS.includes(char.pendingEvent?.id)) char.pendingEvent = null;
  char.seenEvents = [...new Set([...(char.seenEvents || []), ...CAREER_CROSSROAD_IDS])];
  char.job = job;
  if (job === 'Fixer') char.fixerGrade = 9;
  if (job === 'Syndicate') char.syndicateRank = 0;
  if (job === 'Wing Employee') { char.wingRank = 0; char.wingEmployerId = char.regionId; }
  return true;
}
