import assert from 'node:assert/strict';
import { createNewCharacter, createRNG, buildLifeSummaryAndLegacy } from '../src/engine/gameEngine.js';
import { pickCityBulletin } from '../src/engine/yearPlanner.js';
import { ancestorLandmarksFromLives } from '../src/engine/cityUpgrades.js';

// 1. Recording landmark when Color Fixer, Distortion, OwnFixerOffice, or Syndicate leader dies
{
  const colorChar = createNewCharacter({ customName: 'Seong-hun', seed: 'anc_color', preferredRegionId: 'K' });
  colorChar.age = 44;
  colorChar.job = 'Color Fixer';
  colorChar.flags.push('ColorFixer');
  colorChar.customTitle = 'The Jade Needle';
  const colorSummary = buildLifeSummaryAndLegacy(colorChar);
  assert.equal(colorSummary.cityLandmark?.kind, 'color');
  assert.equal(colorSummary.cityLandmark?.districtId, 'K');
  assert.equal(colorSummary.cityLandmark?.name, 'Seong-hun');

  const officeChar = createNewCharacter({ customName: 'Ji-yeon', seed: 'anc_office', preferredRegionId: 'L' });
  officeChar.age = 38;
  officeChar.job = 'Fixer';
  officeChar.flags.push('OwnFixerOffice');
  officeChar.org = { type: 'office', id: 'dawn', name: 'Dawn Office' };
  const officeSummary = buildLifeSummaryAndLegacy(officeChar);
  assert.equal(officeSummary.cityLandmark?.kind, 'office');
  assert.equal(officeSummary.cityLandmark?.officeName, 'Dawn Office');
  assert.equal(officeSummary.cityLandmark?.districtId, 'L');

  const synChar = createNewCharacter({ customName: 'Dae-ho', seed: 'anc_syn', preferredRegionId: 'T' });
  synChar.age = 41;
  synChar.job = 'Syndicate';
  synChar.finger = 'Thumb';
  synChar.fingerRank = 2;
  const synSummary = buildLifeSummaryAndLegacy(synChar);
  assert.equal(synSummary.cityLandmark?.kind, 'syndicate');
  assert.equal(synSummary.cityLandmark?.finger, 'Thumb');

  const distChar = createNewCharacter({ customName: 'Min-seo', seed: 'anc_dist', preferredRegionId: 'U' });
  distChar.age = 33;
  distChar.job = 'Distortion';
  distChar.flags.push('Distorted');
  const distSummary = buildLifeSummaryAndLegacy(distChar);
  assert.equal(distSummary.cityLandmark?.kind, 'distortion');
  assert.equal(distSummary.cityLandmark?.districtId, 'U');
}

// 2. Legacy records saved before cityLandmark still map cleanly
{
  const extracted = ancestorLandmarksFromLives([
    { name: 'Yi Sang', regionId: 'S', job: 'Color Fixer', isColorAncestor: true, colorTitle: 'The Mirror' }
  ]);
  assert.equal(extracted.length, 1);
  assert.equal(extracted[0].kind, 'color');
  assert.equal(extracted[0].districtId, 'S');
}

// 3. Descendant in same District receives 1..2 ancestor bulletins; never > 2, and another District never triggers it
{
  const pastLives = [
    { name: 'Seong-hun', regionId: 'K', cityLandmark: { kind: 'color', name: 'Seong-hun', districtId: 'K', title: 'The Jade Needle', year: 44 } },
    { name: 'Ji-yeon', regionId: 'K', cityLandmark: { kind: 'office', name: 'Ji-yeon', districtId: 'K', officeName: 'Green Needle Office', year: 38 } },
    { name: 'Dae-ho', regionId: 'K', cityLandmark: { kind: 'syndicate', name: 'Dae-ho', districtId: 'K', finger: 'Ring', year: 41 } },
    { name: 'Min-seo', regionId: 'L', cityLandmark: { kind: 'distortion', name: 'Min-seo', districtId: 'L', year: 33 } }
  ];

  const sameDistChar = createNewCharacter({ customName: 'Descendant', seed: 'desc_k', preferredRegionId: 'K', pastLives });
  const seenAncestor = [];
  const rng = createRNG('ancestor_roll_test');
  for (let age = 8; age <= 50; age++) {
    const b = pickCityBulletin(sameDistChar, age, rng);
    if (b?.isAncestorBulletin) seenAncestor.push(b);
  }
  assert.ok(seenAncestor.length >= 1 && seenAncestor.length <= 2, `expected 1..2 ancestor bulletins, got ${seenAncestor.length}`);
  assert.ok(seenAncestor.some((b) => /Seong-hun|Ji-yeon|Dae-ho/.test(b.vi) && /District 11/.test(b.vi)));
  assert.ok(!seenAncestor.some((b) => b.vi.includes('Min-seo')), 'should not surface District 12 ancestor while living in District 11');

  // When moving to District 12 (if below cap 2), Min-seo can surface
  sameDistChar.regionId = 'L';
  sameDistChar.ancestorBulletinsShown = 0;
  const seenAfterMove = [];
  for (let age = 20; age <= 45; age++) {
    const b = pickCityBulletin(sameDistChar, age, rng);
    if (b?.isAncestorBulletin) seenAfterMove.push(b);
  }
  assert.ok(seenAfterMove.some((b) => b.vi.includes('Min-seo') && b.vi.includes('District 12')));

  // Different District (M) sees 0 ancestor bulletins
  const otherDistChar = createNewCharacter({ customName: 'Outsider', seed: 'desc_m', preferredRegionId: 'M', pastLives });
  for (let age = 8; age <= 60; age++) {
    const b = pickCityBulletin(otherDistChar, age, rng);
    assert.ok(!b?.isAncestorBulletin, 'unrelated district must never see ancestor bulletin');
  }
}

console.log('test_ancestor_bulletins.mjs passed');
