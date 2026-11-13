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

// 3b. Active NPC branch never treats dead/missing/estranged/away NPCs as "waiting", and scars resolve cleanly without double "Vết" or raw placeholders
{
  const char = createNewCharacter({ customName: 'Watcher', seed: 'psyche_gone_npc' });
  char.age = 25;
  char.regionId = 'K';
  char.resonance = 0;
  char.heat = 0;
  char.scars = [];
  char.npcs = {
    mother: { nameVi: 'Mẹ', nameEn: 'Mother', alive: false },
    friend: { nameVi: 'Seojun', nameEn: 'Seojun', status: 'missing' },
    spouse: { nameVi: 'Minji', nameEn: 'Minji', status: 'away' }
  };
  for (let i = 0; i < 40; i++) {
    const ev = {
      id: `rel_check_${i}`,
      titleVi: 'Món nợ cũ',
      displayVi: 'Một người nhắc tới món nợ và chuyện phản bội năm xưa tại office.',
      major: true,
      choices: []
    };
    const res = getPsycheInterjection(char, ev, 'vi');
    if (res) {
      assert.ok(!/đang chờ/.test(res.textVi), `gone NPC must never trigger waiting line: ${res.textVi}`);
    }
  }

  const scarChar = createNewCharacter({ customName: 'Scarred', seed: 'psyche_scar_phrase' });
  scarChar.age = 24;
  scarChar.regionId = 'K';
  scarChar.scars = ['Vết mổ trả nợ'];
  let woundLine = null;
  for (let k = 0; k < 40 && !woundLine; k++) {
    const woundEv = {
      id: `test_clinic_threat_${k}`,
      titleVi: 'Bệnh xá đêm',
      displayVi: 'Đám thu nợ chặn cửa phòng khám cấp cứu.',
      major: true,
      choices: []
    };
    woundLine = getPsycheInterjection(scarChar, woundEv, 'vi');
  }
  assert.ok(woundLine, 'expected wound scar psyche line within 40 rolls');
  assert.ok(!/Vết\s+"Vết/.test(woundLine.textVi), `no double Vết prefix: ${woundLine.textVi}`);
  assert.ok(woundLine.textVi.includes('Vết mổ trả nợ'), `keeps scar name: ${woundLine.textVi}`);

  const objChar = createNewCharacter({ customName: 'ObjectScar', seed: 'psyche_scar_object' });
  objChar.age = 24;
  objChar.regionId = 'K';
  objChar.npcs = { friend: { nameVi: 'Minh Anh', nameEn: 'Minh Anh', deceased: true, status: 'dead' } };
  objChar.scars = ['Người bạn đã bỏ lại {friend}'];
  let objLine = null;
  for (let k = 0; k < 40 && !objLine; k++) {
    const objEv = {
      id: `test_trauma_threat_${k}`,
      titleVi: 'Ám ảnh hẻm tối',
      displayVi: 'Tiếng còi cấp cứu và phục kích vang đầu ngõ.',
      major: true,
      choices: []
    };
    objLine = getPsycheInterjection(objChar, objEv, 'vi');
  }
  assert.ok(objLine, 'expected memory scar psyche line within 40 rolls');
  assert.ok(!/\{friend\}/.test(objLine.textVi), `placeholder resolved cleanly: ${objLine.textVi}`);
  assert.ok(objLine.textVi.includes('Minh Anh'), `interpolated friend name present: ${objLine.textVi}`);
  assert.ok(!/Vết\s+"Người bạn/.test(objLine.textVi), `non-wound scar avoids "Vết ..." prefix: ${objLine.textVi}`);

  // Different char.seed values must produce distinct hashSeed outcomes across shared event/age
  const sameEv = { id: 'seed_diff_ev', titleVi: 'Ám ảnh hẻm tối', displayVi: 'Phục kích hẻm tối.', major: true, choices: [] };
  const cA = { seed: 'seed_alpha_1', age: 24, regionId: 'K', scars: ['Vết mổ trả nợ'], stats: { sanity: 50 } };
  const cB = { seed: 'seed_beta_2', age: 24, regionId: 'K', scars: ['Vết mổ trả nợ'], stats: { sanity: 50 } };
  let differed = false;
  for (let age = 20; age < 60 && !differed; age++) {
    cA.age = age;
    cB.age = age;
    const rA = Boolean(getPsycheInterjection(cA, sameEv, 'vi'));
    const rB = Boolean(getPsycheInterjection(cB, sameEv, 'vi'));
    if (rA !== rB) differed = true;
  }
  assert.equal(differed, true, 'different char.seed values must diversify hashSeed roll');
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
