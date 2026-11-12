// What a major choice leaves behind. Counts every choice in the story pool by its most lasting trace:
//   lasting   a field that changes the life for good (scar, record, job, NPC fate or absence, item, dungeon...)
//   flagRead  a flag some other code or event reads
//   mem       a memory a later event can ask for
//   deadFlag  a flag nobody reads
//   bondOnly  only the bond number moves
//   immediate only stats move
// A flag counts as read when its name appears quoted anywhere else in src/engine or src/data, so the
// "read" column is an upper bound.
//   node tools/sim/consequence_census.mjs            totals
//   node tools/sim/consequence_census.mjs flags      every unread flag and the choice that writes it
//   node tools/sim/consequence_census.mjs npc        NPC-facing choices that leave no status or flag behind
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';

const root = fileURLToPath(new URL('../../src/', import.meta.url));
const corpus = ['engine', 'data']
  .flatMap((d) => readdirSync(root + d).filter((f) => f.endsWith('.js')).map((f) => readFileSync(`${root}${d}/${f}`, 'utf8')))
  .join('\n');
const mentions = (tok) => [`'${tok}'`, `"${tok}"`].reduce((n, q) => n + corpus.split(q).length - 1, 0);

const LASTING = ['scarsAdd', 'recordsAdd', 'scheduleConsequences', 'setJob', 'npcFate', 'npcAway', 'npcAdd', 'npcQuest', 'setFingerRank', 'setFixerGrade', 'startDungeon', 'itemAdd', 'setFinger', 'lasting', 'later'];
const NPC_RE = /\{(friend|partner|lover|spouse|mentor|rival|ward|sibling|parent|child|boss|colleague)\}/;

export function consequenceCensus(events = ALL_STORY_EVENTS) {
  const totals = { choices: 0, lasting: 0, flagRead: 0, mem: 0, deadFlag: 0, bondOnly: 0, immediate: 0 };
  const deadFlags = new Map();
  const npcBare = [];
  for (const e of events) (e.choices || []).forEach((c, i) => {
    totals.choices += 1;
    const outs = [c, ...(c.outcomes || [])].filter(Boolean);
    const keys = new Set(outs.flatMap((o) => Object.keys(o)));
    const flags = outs.flatMap((o) => o.flagsAdd || []);
    for (const f of flags) if (mentions(f) <= 1) deadFlags.set(f, `${e.id}#${i}`);
    const cls = LASTING.some((k) => keys.has(k)) ? 'lasting'
      : flags.some((f) => mentions(f) > 1) ? 'flagRead'
      : outs.some((o) => o.mem || o.memory || o.memories) ? 'mem'
      : flags.length ? 'deadFlag'
      : keys.has('bond') ? 'bondOnly' : 'immediate';
    totals[cls] += 1;
    const text = outs.map((o) => `${o.resultVi || ''} ${o.labelVi || ''}`).join(' ');
    if ((cls === 'bondOnly' || cls === 'immediate') && (NPC_RE.test(text) || keys.has('bond'))) {
      npcBare.push(`${e.id}#${i} :: ${outs.map((o) => o.resultVi || '').join(' | ').slice(0, 160)}`);
    }
  });
  return { totals, deadFlags, npcBare };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { totals, deadFlags, npcBare } = consequenceCensus();
  const mode = process.argv[2];
  if (mode === 'flags') console.log([...deadFlags].map(([f, at]) => `${f}  <- ${at}`).join('\n'));
  else if (mode === 'npc') console.log(npcBare.join('\n'));
  else console.log({ events: ALL_STORY_EVENTS.length, ...totals, unreadFlags: deadFlags.size, npcChoicesWithoutTrace: npcBare.length });
}
