import { ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { LIFE_MINORS, LIFE_DAILIES } from '../../src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from '../../src/data/eventsChildhood.js';

const pools = [
  ['major', ALL_STORY_EVENTS],
  ['consequence', CONSEQUENCE_EVENTS],
  ['minor', LIFE_MINORS],
  ['daily', LIFE_DAILIES]
];
const sceneLimits = { major: 80, consequence: 80, minor: 60, daily: 60 };
const resultLimits = { major: 55, consequence: 55, minor: 55, daily: 55 };
const words = (value) => String(value || '').replace(/^\[[^\]]+\]\s*/, '').trim().split(/\s+/).filter(Boolean).length;
const entries = [];
const flags = [];

for (const [kind, events] of pools) {
  for (const event of events) {
    const row = { kind, id: event.id, viWords: words(event.vi), enWords: words(event.en), choices: event.choices?.length || 0, outcomes: 0 };
    entries.push(row);
    if (row.viWords > sceneLimits[kind]) flags.push({ kind, id: event.id, part: 'situation', words: row.viWords, limit: sceneLimits[kind] });
    for (const [index, choice] of (event.choices || []).entries()) {
      const outcomes = choice.outcomes || choice.out || [];
      row.outcomes += outcomes.length;
      const results = outcomes.length ? outcomes : [choice];
      for (const [outIndex, result] of results.entries()) {
        const vi = result.resultVi || result.rvi || choice.resultVi || choice.rvi;
        const en = result.resultEn || result.ren || choice.resultEn || choice.ren;
        const viWords = words(vi);
        const enWords = words(en);
        if (viWords > resultLimits[kind]) flags.push({ kind, id: event.id, part: `choice ${index + 1} / result ${outIndex + 1}`, words: viWords, limit: resultLimits[kind] });
        if (viWords >= 10 && enWords >= 10 && enWords / viWords > 1.7) flags.push({ kind, id: event.id, part: `choice ${index + 1} / result ${outIndex + 1}`, viWords, enWords, issue: 'English much longer' });
      }
    }
    if (row.viWords >= 10 && row.enWords >= 10 && row.enWords / row.viWords > 1.7) flags.push({ kind, id: event.id, part: 'situation', viWords: row.viWords, enWords: row.enWords, issue: 'English much longer' });
  }
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ entries, flags }, null, 2));
} else {
  for (const [kind, events] of pools) {
    const rows = entries.filter((entry) => entry.kind === kind);
    console.log(`${kind}: ${events.length} events, ${rows.reduce((sum, row) => sum + row.choices, 0)} choices, ${rows.reduce((sum, row) => sum + row.outcomes, 0)} outcome branches`);
  }
  console.log(`Editorial flags: ${flags.length}`);
  for (const flag of flags) console.log(`  ${flag.kind} ${flag.id} ${flag.part}: ${flag.issue || `${flag.words}/${flag.limit} Vietnamese words`}`);
}
