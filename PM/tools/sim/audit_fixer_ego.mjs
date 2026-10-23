import { createNewCharacter, resolveEventChoice, resolveDungeonChoice, getDungeonCurrentStage, isDungeonChoiceAvailable, createRNG, resolveFixerContract } from '../../src/engine/gameEngine.js';
import { planYear, runDueItems, resolveMinor, endYear, LIFE_MINORS } from '../../src/engine/yearPlanner.js';
import { choiceIsAvailable } from '../../src/engine/eventConditions.js';
import { getNextFixerPromotion } from '../../src/engine/careerPipeline.js';

const lives = Number(process.argv[2]) || 500;
const mode = process.argv[3] === 'focused' ? 'focused' : 'random';
const mean = (xs) => xs.length ? xs.reduce((sum, x) => sum + x, 0) / xs.length : null;
const summarize = (xs) => ({ n: xs.length, mean: mean(xs), min: xs.length ? Math.min(...xs) : null, max: xs.length ? Math.max(...xs) : null });
const result = {
  lives, mode, adults: 0, everFixer: 0, fixerEntryAges: [],
  grade8EligibleAges: [], grade8ExamOffers: 0, grade8Attempts: 0, grade8Passes: 0, grade8PassAges: [],
  allPromotionOffers: 0, allPromotionAttempts: 0, allPromotionPasses: 0,
  egoPrereqAges: [], carmenOffers: 0, egoAttempts: 0, egoAwakenings: 0, egoAges: [],
  fixerAndEgoLives: 0, grade8AndEgoLives: 0, grade8AndEgoSameYear: 0,
  anyPromotionAndEgoSameYear: 0, egoAmongFixer: 0,
  endedDistorted: 0, endedAlive: 0,
};

function choose(choices, char, rng, context = '') {
  const available = (choices || []).map((_, i) => i).filter(i => choiceIsAvailable(choices[i], char));
  if (!available.length) return -1;
  if (mode === 'random') return available[Math.floor(rng() * available.length)];
  if (context === 'ad_career_crossroad_18' || context === 'ad_outskirts_crossroad_18') {
    const fixer = available.find(i => choices[i].setJob === 'Fixer');
    if (fixer != null) return fixer;
  }
  if (context.startsWith('fixer_promo_')) {
    const promotion = available.find(i => choices[i].setFixerGrade != null);
    if (promotion != null) return promotion;
  }
  if (context === 'ego_carmen_crossroad' || context === 'ego_second_efflorescence_trial') return available[0];
  const score = choice => {
    const fx = choice.effects || choice.fx || {};
    const outcomes = choice.outcomes || choice.out || [];
    const expected = outcomes.length ? outcomes.reduce((s, o) => s + (o.w || 0) * score(o), 0) / outcomes.reduce((s, o) => s + (o.w || 0), 0) : 0;
    return (fx.health || 0) * 1.2 + (fx.sanity || 0) + (fx.wealth || 0) * 0.5 +
      (fx.rep || 0) * 0.7 + (fx.resonance || 0) * 0.8 + (choice.meritAdd || 0) * 0.8 + expected;
  };
  return available.reduce((best, i) => score(choices[i]) > score(choices[best]) ? i : best, available[0]);
}

for (let i = 0; i < lives; i++) {
  const seed = `fixer_ego_audit_${i}`;
  const rng = createRNG(`${seed}:life`);
  let char = createNewCharacter({ customName: `Audit ${i}`, seed });
  let everFixer = false;
  let grade8Eligible = false;
  let egoPrereq = false;
  let entryAge = null;
  let grade8Age = null;
  let egoAge = null;
  const promotionYears = new Set();
  let guard = 0;

  function recordState() {
    if (char.job === 'Fixer' && !everFixer) {
      everFixer = true;
      entryAge = char.age;
      result.fixerEntryAges.push(entryAge);
    }
    if (!grade8Eligible && char.job === 'Fixer' && char.fixerGrade === 9 && getNextFixerPromotion(char)?.isEligible) {
      grade8Eligible = true;
      result.grade8EligibleAges.push(char.age);
    }
    if (!egoPrereq && char.age >= 18 && !char.flags.includes('Distorted') && !char.flags.includes('EGOAwakened') &&
        ((char.resonance || 0) >= 70 || ((char.resonance || 0) >= 58 && char.stats.sanity <= 38) || char.stats.sanity <= 12)) {
      egoPrereq = true;
      result.egoPrereqAges.push(char.age);
    }
  }

  while (char.alive && char.age < 120 && guard++ < 200) {
    recordState();
    planYear(char, rng);
    for (let t = 0; t <= 100 && char.alive; t += 2) {
      char = runDueItems(char, t, rng).char;
      let spin = 0;
      while (char.alive && (char.pendingEvent || char.pendingMinor || char.pendingContract || char.pendingDungeon || char.pendingModal) && spin++ < 8) {
        if (char.pendingEvent) {
          const event = char.pendingEvent;
          const idx = choose(event.choices, char, rng, event.id);
          if (event.id.startsWith('fixer_promo_')) {
            result.allPromotionOffers++;
            if (char.fixerGrade === 9) result.grade8ExamOffers++;
          }
          if (event.id === 'ego_carmen_crossroad') result.carmenOffers++;
          const attemptedPromotion = event.id.startsWith('fixer_promo_') && event.choices[idx]?.setFixerGrade != null;
          const attemptedEgo = (event.id === 'ego_carmen_crossroad' || event.id === 'ego_second_efflorescence_trial') && idx >= 0 && idx <= 1;
          const beforeGrade = char.fixerGrade;
          const beforeEgo = char.flags.includes('EGOAwakened');
          if (attemptedPromotion) {
            result.allPromotionAttempts++;
            if (beforeGrade === 9) result.grade8Attempts++;
          }
          if (attemptedEgo) result.egoAttempts++;
          char = resolveEventChoice(char, idx, rng);
          if (attemptedPromotion && char.fixerGrade < beforeGrade) {
            result.allPromotionPasses++;
            promotionYears.add(char.age);
            if (beforeGrade === 9 && grade8Age == null) {
              grade8Age = char.age;
              result.grade8Passes++;
              result.grade8PassAges.push(char.age);
            }
          }
          if (!beforeEgo && char.flags.includes('EGOAwakened')) {
            egoAge = char.age;
            result.egoAwakenings++;
            result.egoAges.push(char.age);
          }
        } else if (char.pendingDungeon) {
          const stage = getDungeonCurrentStage(char.pendingDungeon);
          const usable = stage.choices.map((_, k) => k).filter(k => isDungeonChoiceAvailable(stage.choices[k], char));
          let k = usable[Math.floor(rng() * usable.length)];
          if (mode === 'focused') {
            const flee = usable.find(x => stage.choices[x].isFlee);
            const forward = usable.filter(x => !stage.choices[x].isFlee).sort((a, b) =>
              (stage.choices[b].fx?.health || 0) - (stage.choices[a].fx?.health || 0));
            k = (char.stats.health < 45 || char.stats.sanity < 30) && flee !== undefined ? flee : forward[0] ?? flee;
          }
          char = resolveDungeonChoice(char, k, rng).char;
        } else if (char.pendingMinor) {
          const def = LIFE_MINORS.find(m => m.id === char.pendingMinor.id);
          char = resolveMinor(char, choose(def?.choices, char, rng, def?.id), rng);
        } else if (char.pendingContract) {
          const ap = char.pendingContract.approaches;
          const pick = mode === 'random' ? ap[Math.floor(rng() * ap.length)] :
            ap.filter(a => a.id !== 'decline').sort((a, b) => b.successPct - a.successPct)[0];
          char = resolveFixerContract(char, pick.id, rng);
        } else char.pendingModal = null;
        recordState();
      }
    }
    if (char.alive) char = endYear(char, rng);
    recordState();
  }
  if (char.age >= 18) result.adults++;
  if (everFixer) result.everFixer++;
  if (char.alive) result.endedAlive++;
  if (char.flags.includes('Distorted')) result.endedDistorted++;
  if (everFixer && egoAge != null) { result.fixerAndEgoLives++; result.egoAmongFixer++; }
  if (grade8Age != null && egoAge != null) {
    result.grade8AndEgoLives++;
    if (grade8Age === egoAge) result.grade8AndEgoSameYear++;
  }
  if (egoAge != null && promotionYears.has(egoAge)) result.anyPromotionAndEgoSameYear++;
}

for (const key of ['fixerEntryAges', 'grade8EligibleAges', 'grade8PassAges', 'egoPrereqAges', 'egoAges']) {
  result[key] = summarize(result[key]);
}
console.log(JSON.stringify(result, null, 2));
