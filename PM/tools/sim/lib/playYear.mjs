// One simulated year of a life, shared by the sims that watch what a player meets.
// `pickIndex` comes from choicePolicy.mjs; `onResolve(char, kind, id)` is called just before each pending thing is answered.
import { resolveEventChoice, resolveDungeonChoice, getDungeonCurrentStage, isDungeonChoiceAvailable, resolveFixerContract } from '../../../src/engine/gameEngine.js';
import { planYear, chooseDirectorPacedLead, chooseYearLead, runDueItems, resolveMinor, endYear } from '../../../src/engine/yearPlanner.js';
import { careerAgeOf, CAREER_CROSSROAD_IDS } from '../../../src/engine/careerAge.js';
import { enforceTabooJudgment } from '../../../src/engine/tabooJudgment.js';
import { lookaheadDungeonStake, pickLookaheadContract, pickLookaheadDungeonChoice, pickLookaheadLead } from './lookaheadPolicy.mjs';

function pickRecklessLead(char, rng) {
  const offers = char?.pendingLead?.offers || [];
  const dangerIdx = offers.findIndex((o) => o.tier === 'danger' || o.tier === 'forbidden');
  if (dangerIdx >= 0) return chooseYearLead(char, dangerIdx);
  return chooseDirectorPacedLead(char, rng);
}

function pickRecklessDungeonChoice(stage, usable) {
  const choices = stage?.choices || [];
  const aggressive = usable.filter((k) => !choices[k].isFlee && choices[k].restAction !== 'rest');
  const pool = aggressive.length ? aggressive : usable;
  const preferred = pool.find((k) => choices[k].push || choices[k].combatAction || choices[k].trait || choices[k].id?.includes('blood'));
  return preferred !== undefined ? preferred : pool[0];
}

// lookahead and its no-rollout control (tactical) share the lead, Request and dungeon rules
const tacticalRules = (policy) => policy === 'lookahead' || policy === 'tactical';

export function playYear(charState, rng, pickIndex, onResolve = () => {}, options = {}) {
  const policy = options.policy || pickIndex?.policy || null;
  let char = charState;
  if (!char.plan?.length) planYear(char, rng);
  if (char.pendingLead) {
    if (policy === 'reckless') char = pickRecklessLead(char, rng);
    else if (tacticalRules(policy)) char = pickLookaheadLead(char, rng);
    else char = chooseDirectorPacedLead(char, rng);
  }
  for (let t = 0; t <= 100 && char.alive; t += 2) {
    char = runDueItems(char, t, rng).char;
    // As in the store: at three Taboo the Claw comes before anything else is answered
    char = enforceTabooJudgment(char);
    let spin = 0;
    while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 8) {
      if (char.pendingEvent) {
        onResolve(char, 'event', char.pendingEvent.id);
        const idx = Math.max(0, pickIndex(char.pendingEvent.choices, rng, char, char.pendingEvent.id));
        const stake = policy === 'reckless' ? 2 : tacticalRules(policy) ? lookaheadDungeonStake(char, char.pendingEvent.choices?.[idx]) : 0;
        char = resolveEventChoice(char, idx, rng, stake);
      } else if (char.pendingDungeon) {
        const stage = getDungeonCurrentStage(char.pendingDungeon);
        const usable = stage.choices.map((c, k) => k).filter((k) => isDungeonChoiceAvailable(stage.choices[k], char));
        onResolve(char, 'dungeon', char.pendingDungeon.id);
        const idx = policy === 'reckless'
          ? pickRecklessDungeonChoice(stage, usable)
          : tacticalRules(policy)
            ? pickLookaheadDungeonChoice(char, stage, usable, char.pendingDungeon)
            : usable[Math.floor(rng() * usable.length)];
        const res = resolveDungeonChoice(char, idx, rng);
        char = res.char;
        if (options.onDungeonFinish && res.isFinished) options.onDungeonFinish(res, char);
      } else if (char.pendingMinor) {
        onResolve(char, 'minor', char.pendingMinor.id);
        char = resolveMinor(char, pickIndex(char.pendingMinor.choices, rng, char, char.pendingMinor.id), rng);
      } else if (char.pendingContract) {
        const ap = char.pendingContract.approaches;
        const approachId = policy === 'reckless'
          ? (ap.find((a) => a.id === 'bold') || ap.find((a) => !a.isDecline) || ap[0]).id
          : tacticalRules(policy)
            ? pickLookaheadContract(char, char.pendingContract)
            : ap[Math.floor(rng() * ap.length)].id;
        char = resolveFixerContract(char, approachId, rng);
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
