import { createNewCharacter, createRNG, ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { selectEventWithWeaverAI, isEventEligible } from '../../src/engine/weaverAI.js';
import { directorTags } from '../../src/engine/eventDirector.js';

const runs = Math.max(1, Number(process.argv[2] || 500));
const jobs = ['Fixer', 'Wing Employee', 'Syndicate', 'Outcast'];
const counts = { sampled: 0, different: 0, legacyDanger: 0, directorDanger: 0, legacyRelief: 0, directorRelief: 0, invalid: 0 };
const scenarios = { crisis: { sampled: 0, legacyDanger: 0, directorDanger: 0 }, calm: { sampled: 0, legacyDanger: 0, directorDanger: 0 } };

for (let i = 0; i < runs; i++) {
  const stateRng = createRNG(`director-state-${i}`);
  const char = createNewCharacter({ seed: `director-${i}`, startAge: 24 + Math.floor(stateRng() * 42) });
  char.job = jobs[i % jobs.length];
  char.stats.health = i % 2 ? 75 : 25;
  char.stats.sanity = i % 2 ? 78 : 28;
  char.stats.rep = 24;
  char.merit = 10;
  char.resonance = 0;
  char.heat = 0;
  char.taboo = 0;
  if (char.job === 'Fixer') char.fixerGrade = 8;
  if (char.job === 'Syndicate') { char.finger = 'Index'; char.fingerRank = 0; char.flags.push('FingerIndex'); }
  char.weaver.yearsSinceLastMajor = 1;
  char.weaver.recentBeats = i % 2
    ? [{ id: 'quiet-a', age: char.age - 2, tags: ['relief'] }, { id: 'quiet-b', age: char.age - 1, tags: ['relief'] }]
    : [{ id: 'hard-a', age: char.age - 2, tags: ['danger'] }, { id: 'hard-b', age: char.age - 1, tags: ['danger'] }];

  const sameDraw = createRNG(`director-draw-${i}`)();
  const selected = selectEventWithWeaverAI({ weaver: char.weaver, char, allPools: ALL_STORY_EVENTS, consequencePool: [], rng: () => sameDraw });
  const record = selected.weaver.decisionLog[0]?.director;
  if (!record) continue;
  counts.sampled++;
  const baseline = ALL_STORY_EVENTS.find((event) => event.id === record.legacyId);
  const directed = ALL_STORY_EVENTS.find((event) => event.id === record.directedId);
  if (!baseline || !directed || !isEventEligible(baseline, char) || !isEventEligible(directed, char)) counts.invalid++;
  if (baseline.id !== directed.id) counts.different++;
  const legacyTags = directorTags(baseline);
  const directedTags = directorTags(directed);
  if (legacyTags.includes('danger')) counts.legacyDanger++;
  if (directedTags.includes('danger')) counts.directorDanger++;
  if (legacyTags.includes('relief')) counts.legacyRelief++;
  if (directedTags.includes('relief')) counts.directorRelief++;
  const scenario = i % 2 ? scenarios.calm : scenarios.crisis;
  scenario.sampled++;
  if (legacyTags.includes('danger')) scenario.legacyDanger++;
  if (directedTags.includes('danger')) scenario.directorDanger++;
}

if (counts.invalid) throw new Error(`${counts.invalid} director picks bypassed eligibility`);
if (counts.sampled < runs * 0.8) throw new Error(`Only ${counts.sampled}/${runs} seeds reached the normal director draw`);
console.log(JSON.stringify({ runs, counts, scenarios }, null, 2));
