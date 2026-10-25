import { createNewCharacter, createRNG } from '../../src/engine/gameEngine.js';
import { createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice, useDungeonEgo, useDungeonSupply } from '../../src/engine/dungeonEngine.js';
import { ENSEMBLE_DUNGEON_ID } from '../../src/engine/ensemblePath.js';

export function simulateEnsemble(route, count = 200, prepared = true, { stance = 'balanced', finale = 'own' } = {}) {
  const outcomes = { conquered: 0, dead: 0, distorted: 0, fled: 0 };
  for (let i = 0; i < count; i++) {
    const seed = `ensemble-sim-${route}-${i}`;
    let char = createNewCharacter({ seed, startAge: 35 });
    Object.assign(char, { alive: true, age: 35, taboo: 0, pendingBirthLogs: [], flags: prepared ? ['EGOAwakened'] : [] });
    char.stats = { health: prepared ? 95 : 60, sanity: prepared ? 90 : 55, rep: 80, network: 65, wealth: 70 };
    char.resonance = 80;
    if (route === 'color') { char.job = 'Fixer'; char.fixerGrade = 1; char.flags.push('ColorFixer'); }
    if (route === 'finger') { char.job = 'Syndicate'; char.finger = 'Ring'; char.fingerRank = 3; }
    if (route === 'wing') { char.job = 'Wing Employee'; char.wingRank = 3; }
    if (route === 'workshop') { char.job = 'Workshop Craftsman'; char.workshopRank = 3; }
    char.pendingDungeon = createDungeonSession(ENSEMBLE_DUNGEON_ID, char);
    char.pendingDungeon.stance = stance;
    const rng = createRNG(seed);
    for (let n = 0; n < 12 && char.pendingDungeon; n++) {
      const session = char.pendingDungeon;
      if (prepared && ((session.currentStageIndex === 3 && finale === 'own') || session.ensembleCoda)) {
        char = useDungeonSupply(char, 'scan');
        char = useDungeonEgo(char);
      }
      const stage = getDungeonCurrentStage(char.pendingDungeon);
      const pick = stage.choices.findIndex((choice) => choice.ensembleResist || (choice.checkTrait && (session.currentStageIndex === 3 && !session.ensembleCoda && finale === 'join' ? choice.ensembleHarmony > 0 : !choice.ensembleHarmony)));
      const result = resolveDungeonChoice(char, pick, rng);
      char = result.char;
      if (result.resolution) outcomes[result.resolution.outcome]++;
    }
  }
  return { route, prepared, stance, finale, count, ...outcomes, winPercent: Math.round(outcomes.conquered / count * 100) };
}

if (process.argv[1]?.replaceAll('\\', '/').endsWith('/ensemble_sim.mjs')) {
  const count = Number(process.argv[2]) || 200;
  console.table(['color', 'finger', 'wing', 'workshop'].flatMap((route) => [simulateEnsemble(route, count, true), simulateEnsemble(route, count, false)]));
}
