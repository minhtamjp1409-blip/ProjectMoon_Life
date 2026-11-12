// Batches 167 to 172: the play screen's focus and phone type, choices that keep their word about people,
// the costed recovery year and year-plan presets, the director's reach counters, the custom-event sandbox and
// dungeon objectives.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ALL_STORY_EVENTS, createNewCharacter } from '../src/engine/gameEngine.js';
import { applyChoiceExtras } from '../src/engine/director.js';
import { endYear } from '../src/engine/yearPlanner.js';
import { npcIsActive } from '../src/engine/eventConditions.js';
import { makeNpc } from '../src/data/birthStories.js';
import { consequenceCensus } from '../tools/sim/consequence_census.mjs';

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const outsOf = (choice) => [choice, ...(choice.outcomes || [])].filter(Boolean);

// ---------------------------------------------------------------- 168: choices that keep their word about people
{
  // `bonds` was never a field: applyBonds reads `bond`, so a choice written with `bonds` moved nobody
  const wrong = [];
  for (const e of ALL_STORY_EVENTS) (e.choices || []).forEach((c, i) => {
    for (const o of outsOf(c)) if (o.bonds) wrong.push(`${e.id}#${i}`);
  });
  assert.deepEqual(wrong, [], `choices use bond, not bonds: ${wrong.join(', ')}`);

  // A result that says someone left you for good has to change their status, not only the bond number
  const LEAVES = /\{(friend|partner|lover|spouse|mentor|child|ward)\}[^.]*(tránh mặt bạn|vĩnh viễn không còn|không bao giờ đi cùng|không thể hàn gắn)|(không bao giờ đi cùng đường với bạn)/;
  const broken = [];
  for (const e of ALL_STORY_EVENTS) (e.choices || []).forEach((c, i) => {
    for (const o of outsOf(c)) {
      if (!LEAVES.test(o.resultVi || '')) continue;
      const kept = o.npcFate || o.npcAway || c.npcFate || c.npcAway;
      if (!kept) broken.push(`${e.id}#${i}`);
    }
  });
  assert.deepEqual(broken, [], `a departure in the text is a departure in the state: ${broken.join(', ')}`);

  // npcAway: gone from scenes for the years given, then back on their own with a line in the year
  const char = createNewCharacter({ customName: 'Away', seed: 'away-167' });
  char.age = 30;
  char.npcs = { ...char.npcs, friend: makeNpc('friend', () => 0.4, { bond: 50, metAge: 12, lastSeen: 29 }) };
  const deltas = [];
  applyChoiceExtras(char, [{ npcAway: { friend: 3 } }], deltas, () => 0.5);
  assert.equal(char.npcs.friend.status, 'away');
  assert.equal(char.npcs.friend.returnAge, 33);
  assert.equal(npcIsActive(char.npcs.friend), false, 'someone away is not in the scene pool');
  assert.ok(deltas.some((d) => d.k === 'fate' && d.v === 'away'), 'the result shows that they left');
  char.age = 32;
  const stillAway = endYear(char, () => 0.5);
  assert.equal(stillAway.npcs.friend.status, 'away', 'not back before returnAge');
  stillAway.age = 33;
  const back = endYear(stillAway, () => 0.5);
  assert.equal(back.npcs.friend.status, undefined, 'back at returnAge');
  assert.equal(npcIsActive(back.npcs.friend), true);
  const said = JSON.stringify(back.log || []) + JSON.stringify(back);
  assert.ok(said.includes('trở về sau 3 năm đi xa'), 'the year says they came back');
  // A ratchet, not a target: 159 flags are written and never read (tools/sim/consequence_census.mjs flags).
  // New content may not add to them; each one wired to a follow-up lowers the ceiling.
  const { deadFlags } = consequenceCensus();
  assert.ok(deadFlags.size <= 159, `unread flags grew to ${deadFlags.size}: give the new flag a reader or drop it`);
  console.log('168 ok: bond keys, departures and the away status');
}

// ---------------------------------------------------------------- 167: focus and phone type
{
  const feed = read('../src/features/chronicle/components/LiveStageFeed.jsx');
  assert.ok(/useFocusTrap\(dockRef, hasDock && !peekBehind\)/.test(feed), 'the event dock traps Tab while it is open');
  const scene = read('../src/features/cutscene/CutsceneLayer.jsx');
  assert.ok(scene.includes('aria-modal="true"') && !scene.includes("if (e.key === 'Tab') return;"), 'a cutscene is a modal and keeps Tab on its skip button');
  const css = read('../src/styles/ui/chronicle.css');
  assert.ok(!/is-minor \.dock-text \{[^}]*story-size\) - 2px/.test(css), 'the phone minor story is not set below the event card');
  assert.ok(!/choice-size\) - 1\.5px/.test(css), 'phone choice labels keep the choice size');
  console.log('167 ok: focus traps and phone type');
}

// ---------------------------------------------------------------- 169: a year to mend, at the career's price
{
  const { applyAnnualPlan, CONVALESCE, previewAnnualPlanDeltas, YEAR_PLAN_PRESETS, validYearPoints } = await import('../src/engine/annualPlan.js');
  const hurtFixer = (hp) => {
    const c = createNewCharacter({ customName: 'Mend', seed: 'mend-169' });
    return { ...c, age: 30, job: 'Fixer', fixerGrade: 8, ambition: { id: 'rank', chosenAge: 18 }, stats: { ...c.stats, health: hp }, pendingYearPlan: { age: 30 }, plan: [{ kind: 'contract', t: 0.4 }, { kind: 'minor', t: 0.6 }] };
  };
  const mend = { train: 0, work: 1, bond: 0, rest: 2, scheme: 0 };
  const c = hurtFixer(40);
  assert.equal(previewAnnualPlanDeltas(c, mend).health, 40 + 2 * CONVALESCE.hpPerPoint - 40, 'the preview shows the HP the year mends');
  assert.ok(applyAnnualPlan(c, mend, 'rank'));
  assert.equal(c.stats.health, 40 + 2 * CONVALESCE.hpPerPoint, 'two rest slots mend while hurt');
  assert.ok(!c.plan.some((it) => it.kind === 'contract') && c.plan.some((it) => it.kind === 'minor'), 'the price: this year\'s Request is dropped, nothing else');
  assert.equal(c.annualPlan.convalescence, true);
  const healthy = hurtFixer(70);
  applyAnnualPlan(healthy, mend, 'rank');
  assert.equal(healthy.stats.health, 70, 'no mending above the threshold');
  assert.ok(healthy.plan.some((it) => it.kind === 'contract'), 'a healthy year keeps its Request');
  const oneSlot = hurtFixer(40);
  applyAnnualPlan(oneSlot, { train: 1, work: 1, bond: 0, rest: 1, scheme: 0 }, 'rank');
  assert.equal(oneSlot.stats.health, 40, 'one rest slot is an ordinary year');
  // the presets are whole plans and only pace the year
  assert.ok(YEAR_PLAN_PRESETS.length >= 3 && YEAR_PLAN_PRESETS.every((p) => validYearPoints(p.points)), 'every preset spends exactly the year\'s slots');
  assert.ok(YEAR_PLAN_PRESETS.every((p) => !('ambition' in p) && !('job' in p)), 'a preset never picks a route or an ambition');
  console.log('169 ok: the mending year; presets are valid plans');
}

// ---------------------------------------------------------------- 170: the director looks past its top 24, a little
// ---------------------------------------------------------------- 171: custom events only in a sandbox life
{
  const { selectEventWithWeaverAI, DIRECTOR_EXPLORE_SHARE, SANDBOX_FLAG, directorProbe } = await import('../src/engine/weaverAI.js');
  assert.ok(DIRECTOR_EXPLORE_SHARE > 0 && DIRECTOR_EXPLORE_SHARE <= 0.1, 'exploring is a small share of draws');
  // the same quiet life the director test uses: no thread due, no career step waiting
  const char = createNewCharacter({ seed: 'director-contract', startAge: 29 });
  char.job = 'Outcast';
  char.seenEvents = [];
  let seenDraw = null;
  directorProbe.onDraw = (d) => { seenDraw = d; };
  const low = selectEventWithWeaverAI({ weaver: char.weaver, char, allPools: ALL_STORY_EVENTS, consequencePool: [], rng: () => DIRECTOR_EXPLORE_SHARE / 2 });
  directorProbe.onDraw = null;
  assert.ok(seenDraw && seenDraw.eligible.length > 24, 'the probe sees the whole eligible list');
  const log = low.weaver.decisionLog[0];
  assert.equal(log.director.explored, true, 'a roll under the share explores');
  assert.ok(!log.candidates.slice(0, 24).some((c) => c.eventId === low.event.id), 'an explored event comes from past the top 24');
  const high = selectEventWithWeaverAI({ weaver: char.weaver, char, allPools: ALL_STORY_EVENTS, consequencePool: [], rng: () => 0.5 });
  assert.equal(high.weaver.decisionLog[0].director.explored, false, 'an ordinary roll stays in the top 24');

  const custom = { id: 'custom_test', age: [18, 80], major: true, weight: 9999, vi: 'Thử', en: 'Test', choices: [{ labelVi: 'A', labelEn: 'A', effects: { rep: 10 } }] };
  const weaver = { ...char.weaver, customEvents: [custom] };
  const draws = (flags) => Array.from({ length: 30 }, (_, k) => selectEventWithWeaverAI({ weaver, char: { ...char, flags }, allPools: ALL_STORY_EVENTS, consequencePool: [], rng: () => 0.07 + (k / 30) * 0.9 }).event?.id);
  assert.ok(!draws(char.flags || []).includes('custom_test'), 'an ordinary life never draws a custom event');
  assert.ok(draws([...(char.flags || []), SANDBOX_FLAG]).includes('custom_test'), 'a sandbox life does');
  const store = read('../src/store/gameStore.js');
  assert.ok(/addCustomEvent[\s\S]{0,400}SANDBOX_FLAG/.test(store), 'writing an event marks the life as a sandbox');
  assert.ok(/gameplayMetricsEnabled \|\| char\.flags\?\.includes\(SANDBOX_FLAG\)/.test(store), 'a sandbox life sends no play data');
  console.log('170 ok: exploring past the top 24; 171 ok: custom events stay in sandbox lives');
}

// ---------------------------------------------------------------- 172: a dungeon objective, decided at the last stage
{
  const { DUNGEON_OBJECTIVES, DUNGEON_OBJECTIVE_EVENTS, dungeonObjectiveFor, objectiveEventFor } = await import('../src/data/dungeonObjectives.js');
  const { createDungeonSession, getDungeonCurrentStage, resolveDungeonChoice, createRNG, resolveEventChoice } = await import('../src/engine/gameEngine.js');
  const { POLICIES: DP } = await import('../tools/sim/dungeon_sim.mjs');
  const { CLAW_DUNGEON_ID } = await import('../src/data/dungeonClaw.js');
  // every side of every objective leaves something that outlasts the year
  const LASTING = ['npc', 'scarsAdd', 'itemAdd', 'meritAdd'];
  for (const e of DUNGEON_OBJECTIVE_EVENTS) {
    assert.ok(e.causalOnly && e.weight === 0, `${e.id} is never drawn on its own`);
    for (const c of e.choices) assert.ok(LASTING.some((k) => c[k]) || c.effects?.heat, `${e.id}: "${c.labelVi}" leaves a trace`);
  }
  assert.ok(DUNGEON_OBJECTIVES.every((o) => DUNGEON_OBJECTIVE_EVENTS.some((e) => e.id === o.eventId)), 'each objective opens its own event');
  const sample = createNewCharacter({ customName: 'Obj', seed: 'objective-172' });
  assert.equal(dungeonObjectiveFor('dungeon_great_lake', sample).id, dungeonObjectiveFor('dungeon_great_lake', sample).id, 'the objective is fixed by life, age and dungeon');
  assert.ok(objectiveEventFor('rescue').titleVi && objectiveEventFor('rescue').displayVi, 'the event arrives split into title and body');
  assert.equal(createDungeonSession(CLAW_DUNGEON_ID, sample).objective, undefined, 'the Claw is a judgment, not a job');

  // A cleared run hands the objective's choice to the event dock; a run left early says the task is undone
  let cleared = null;
  let fled = null;
  for (let i = 0; i < 160 && (!cleared || !fled); i++) {
    const rng = createRNG(`obj_${i}`);
    let c = createNewCharacter({ customName: `O${i}`, seed: `obj_${i}` });
    c = { ...c, age: 30, job: 'Fixer', stats: { ...c.stats, health: 95, sanity: 90 } };
    c.pendingDungeon = createDungeonSession('dungeon_backstreets_night', c, rng);
    assert.ok(c.pendingDungeon.objective, 'an ordinary dungeon carries an objective');
    for (let step = 0; step < 60 && c.pendingDungeon; step++) {
      const stage = getDungeonCurrentStage(c.pendingDungeon);
      const r = resolveDungeonChoice(c, DP.measured(stage, c, c.pendingDungeon, rng), rng);
      c = r.char;
      if (r.isFinished) {
        if (r.resolution?.outcome === 'conquered' && c.alive && !cleared) cleared = c;
        if (r.resolution?.outcome === 'fled' && !fled) fled = r.resolution;
      }
    }
  }
  assert.ok(cleared, 'some run clears the dungeon');
  assert.ok(cleared.pendingEvent?.isDungeonObjective, 'clearing opens the objective event');
  const after = resolveEventChoice(cleared, 0, () => 0.5);
  assert.equal(after.pendingEvent, null, 'the objective resolves like any event');
  if (fled) assert.ok(/bỏ dở/.test(fled.resultVi), 'leaving early names the undone task');
  console.log('172 ok: dungeon objectives open at the last stage and leave a lasting trace');
}
