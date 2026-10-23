/**
 * Counts story content per career branch and affiliation, so no branch is thin next to Fixer.
 * An event counts for a branch when it names the job, requires an org/flag, or its id says so.
 * Usage: node tools/lint/branch_coverage.mjs [--list=Branch]
 */
import { ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { LIFE_MINORS, LIFE_DAILIES } from '../../src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from '../../src/data/eventsChildhood.js';

const all = [
  ...ALL_STORY_EVENTS.map((e) => ['major', e]),
  ...LIFE_MINORS.map((e) => ['minor', e]),
  ...LIFE_DAILIES.map((e) => ['daily', e]),
  ...CONSEQUENCE_EVENTS.map((e) => ['conseq', e])
];

const BRANCHES = {
  Fixer: { jobs: ['Fixer'], flags: ['ColorFixer', 'EGOAwakened', 'HasAffiliation', 'Hook', 'Shi', 'Oufi', 'Öufi'], id: /^(fx_|fixer|hana|ego_|color|request|contract|office|assoc)/i },
  Syndicate: { jobs: ['Syndicate'], flags: ['SyndicateMember'], id: /(syndic|gang|nest|backstreet|lamb|thumb|index|ring)/i },
  Wing: { jobs: ['Wing Employee'], flags: ['WingEmployee'], id: /(wing|k_corp|kcorp|lcb|zwei|tres|hana_asso|r_corp|shi_|nest)/i },
  Workshop: { jobs: ['Workshop Craftsman'], flags: ['WorkshopCraftsman'], id: /(workshop|craft|forge|smith|atelier|bespoke)/i },
  Distortion: { jobs: ['Distortion'], flags: ['Distorted'], id: /(distort|carmen|sin_|abnorm)/i },
  Finger: { jobs: ['Finger'], flags: ['FingerMember'], id: /(finger|claw|ring_|thumb_|index_)/i }
};

const tag = (e) => {
  const src = e[1];
  const jobs = src.jobs || src.conditions?.jobs || [];
  const flags = [...(src.requires || []), ...(src.conditions?.requires || [])];
  const hit = [];
  for (const [name, b] of Object.entries(BRANCHES)) {
    if (jobs.some((j) => b.jobs.includes(j)) || flags.some((f) => b.flags.includes(f)) || b.id.test(src.id || '')) hit.push(name);
  }
  return hit;
};

const rows = {};
for (const e of all) {
  for (const b of tag(e)) {
    rows[b] ??= { major: 0, minor: 0, daily: 0, conseq: 0, total: 0 };
    rows[b][e[0]]++;
    rows[b].total++;
  }
}
console.table(rows);
const list = process.argv.find((a) => a.startsWith('--list='))?.slice(7);
if (list) for (const e of all) if (tag(e).includes(list)) console.log(e[0], e[1].id);
