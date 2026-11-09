import assert from 'node:assert/strict';
import { APEX_COLOR_GENERATED, APEX_FINGER_GENERATED, apexNoveltyWeight } from '../src/data/apexCommissions.js';
import { LIFE_MINORS, resolveMinor } from '../src/engine/yearPlanner.js';
import { createNewCharacter } from '../src/engine/gameEngine.js';
import { matchesEventContext } from '../src/engine/eventConditions.js';

const apex = [...APEX_COLOR_GENERATED, ...APEX_FINGER_GENERATED];
const first = apex.find((entry) => entry.id === 'm_apex_index_proxy_dispute_press');
const sameScene = apex.find((entry) => entry.id === 'm_apex_index_proxy_dispute_rain');
const sameComplication = apex.find((entry) => entry.id === 'm_apex_index_courier_lost_press');
const otherBranch = apex.find((entry) => entry.id === 'm_apex_middle_book_name_press');
assert(first && sameScene && sameComplication && otherBranch);
assert(apexNoveltyWeight(sameScene, [first.id]) < apexNoveltyWeight(sameComplication, [first.id]));
assert.equal(apexNoveltyWeight(otherBranch, [first.id]), 1);
assert.equal(apexNoveltyWeight(first, []), 1);

for (const id of ['m_apex_color_two_offices_press', 'm_apex_thumb_rival_ledger_press',
  'm_apex_index_proxy_dispute_press', 'm_apex_middle_book_name_press',
  'm_apex_ring_curatorial_dispute_press', 'm_apex_pinky_oath_debt_press']) {
  const entry = apex.find((event) => event.id === id);
  assert(entry, `${id} is present`);
  assert.notEqual(entry.choices[0].vi, 'Nghe từng bên và phán theo thông lệ', `${id} has its own choice`);
  assert(entry.choices[1].out.every((outcome) => outcome.rvi && outcome.ren), `${id} has both outcomes`);
}

const spared = LIFE_MINORS.find((entry) => entry.id === 'm_syn_child_grown');
const order = LIFE_MINORS.find((entry) => entry.id === 'm_syn_order');
const char = createNewCharacter({ seed: 'spared-child-callback', startAge: 30 });
char.job = 'Syndicate';
char.fingerRank = 0;
assert.equal(matchesEventContext(spared, char), false);
char.pendingMinor = { id: order.id, t: 0.3, vi: order.vi, en: order.en, choices: order.choices, ignore: order.ignore };
const after = resolveMinor(char, 1, () => 0.01);
assert(after.memory.some((entry) => entry.key === 'spared_syn_child'));
assert.equal(matchesEventContext(spared, after), false, 'the callback waits ten years');
after.age += 10;
assert.equal(matchesEventContext(spared, after), true);

console.log('Apex scene variation and spared-child callback gates passed.');
