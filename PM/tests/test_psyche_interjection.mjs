import assert from 'node:assert/strict';
import { createNewCharacter, createRNG } from '../src/engine/gameEngine.js';
import { getPsycheInterjection } from '../src/engine/discoPsyche.js';
import { makePicker, planTheYear, POLICIES } from '../tools/sim/lib/choicePolicy.mjs';
import { playYear } from '../tools/sim/lib/playYear.mjs';

const countSentences = (text) => {
  const trimmed = String(text || '').trim();
  if (!trimmed) return 0;
  // Ignore decimal/time colons or abbreviations without spaces; split at terminal punctuation
  return trimmed.split(/[.!?]+(?:\s+|$)/).filter(Boolean).length;
};

// 1. Concrete scar + matching Wing event mentions the actual scar & District
{
  const char = createNewCharacter({ customName: 'Test', seed: 'psyche_scar' });
  char.age = 24;
  char.regionId = 'L';
  char.scars = ['Lưng bỏng'];
  const event = {
    id: 'test_wing_offer',
    titleVi: 'Đề nghị từ Wing',
    titleEn: 'Wing offer',
    displayVi: 'Một người đại diện của L Corp gõ cửa đưa ra bản hợp đồng mới.',
    displayEn: 'A representative from L Corp knocks with a new contract offer.',
    major: true,
    choices: []
  };
  const vi = getPsycheInterjection(char, event, 'vi');
  assert.ok(vi, 'expected scar-linked psyche interjection');
  assert.ok(vi.textVi.includes('Lưng bỏng'), `should reference scar, got: ${vi.textVi}`);
  assert.ok(vi.textVi.includes('District 12'), `should reference District 12, got: ${vi.textVi}`);
  assert.equal(countSentences(vi.textVi), 1, `VI should be 1 sentence: ${vi.textVi}`);
  assert.equal(countSentences(vi.textEn), 1, `EN should be 1 sentence: ${vi.textEn}`);
}

// 2. High resonance + contract/secret event spots loophole or departed NPC
{
  const char = createNewCharacter({ customName: 'Test', seed: 'psyche_res' });
  char.age = 29;
  char.regionId = 'T';
  char.resonance = 48;
  char.npcs = {
    friend: { nameVi: 'Hae-jin', nameEn: 'Hae-jin', deceased: true, status: 'dead' }
  };
  const event = {
    id: 'test_tcorp_contract',
    titleVi: 'Giao kèo mới',
    displayVi: 'Người đại diện đưa bản hợp đồng thời gian ra trước mặt bạn.',
    major: true,
    choices: []
  };
  const res = getPsycheInterjection(char, event, 'vi');
  assert.ok(res, 'expected high-resonance contract interjection');
  assert.ok(res.textVi.includes('Hae-jin') || res.textVi.includes('điều khoản'), `expected NPC/contract detail: ${res.textVi}`);
  assert.ok(res.textVi.includes('District 20'), `expected District 20: ${res.textVi}`);
  assert.equal(countSentences(res.textVi), 1);
  assert.equal(countSentences(res.textEn), 1);
}

// 3. Unanchored infant minor event stays silent (no generic filler)
{
  const char = createNewCharacter({ customName: 'Baby', seed: 'psyche_baby' });
  char.age = 2;
  char.scars = [];
  char.resonance = 0;
  char.heat = 0;
  char.taboo = 0;
  const event = {
    id: 'child_nap',
    displayVi: 'Buổi trưa yên ắng trong phòng.',
    major: false,
    choices: []
  };
  assert.equal(getPsycheInterjection(char, event, 'vi'), null);
}

// 4. Simulation rate check over 60 lives: must stay < 25% and every line must be 1 sentence
{
  let totalEvents = 0;
  let triggered = 0;
  for (let i = 0; i < 60; i++) {
    const policy = POLICIES[i % POLICIES.length];
    const pick = makePicker(policy);
    const rng = createRNG(`psyche_rate_${i}`);
    let char = createNewCharacter({ customName: `P${i}`, seed: `psyche_rate_${i}` });
    let guard = 0;
    while (char.alive && char.age < 90 && guard++ < 150) {
      char = planTheYear(char, policy, rng);
      char = playYear(char, rng, pick, (state, kind) => {
        if (kind !== 'event' || !state.pendingEvent) return;
        totalEvents += 1;
        const interjection = getPsycheInterjection(state, state.pendingEvent, 'vi');
        if (interjection) {
          triggered += 1;
          assert.equal(countSentences(interjection.textVi), 1, `VI not 1 sentence: ${interjection.textVi}`);
          assert.equal(countSentences(interjection.textEn), 1, `EN not 1 sentence: ${interjection.textEn}`);
          assert.ok(!/undefined|null/.test(interjection.textVi), `bad VI interpolation: ${interjection.textVi}`);
          assert.ok(!/undefined|null/.test(interjection.textEn), `bad EN interpolation: ${interjection.textEn}`);
        }
      });
    }
  }
  const rate = totalEvents > 0 ? triggered / totalEvents : 0;
  console.log(`Psyche interjection rate over 60 lives: ${triggered}/${totalEvents} (${(rate * 100).toFixed(1)}%)`);
  assert.ok(totalEvents > 200, 'simulation should inspect many events');
  assert.ok(rate < 0.25, `interjection rate ${(rate * 100).toFixed(1)}% must stay below 25%`);
  assert.ok(rate > 0.01, `interjection rate ${(rate * 100).toFixed(1)}% must be non-trivial`);
}

console.log('test_psyche_interjection.mjs passed');
