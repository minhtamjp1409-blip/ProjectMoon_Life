import assert from 'node:assert/strict';
import { bestowHanaColorTitle, getBranchSceneMeta, CANON_COLOR_BLACKLIST, COLOR_PALETTE, COLOR_EPITHETS } from '../src/engine/colorRegistry.js';

console.log('--- Testing Color Bestowal Engine ---');

// 1. Test 1000 procedural rolls
const generatedTitles = new Set();
for (let i = 0; i < 1000; i++) {
  const mockChar = {
    name: `Fixer_${i}`,
    seed: `seed_${i}_test`,
    age: 20 + (i % 40)
  };

  const bestowed = bestowHanaColorTitle(mockChar);
  assert.ok(bestowed.title, 'Title must not be empty');
  assert.ok(bestowed.color, 'Color hex must not be empty');
  assert.ok(bestowed.glow, 'Color glow must not be empty');

  // Verify Canon blacklist check
  assert.ok(
    !CANON_COLOR_BLACKLIST.has(bestowed.title.toUpperCase()),
    `Collision detected with canon Color: ${bestowed.title}`
  );

  // Verify format: [Color] [Epithet]
  const parts = bestowed.title.split(' ');
  assert.equal(parts.length, 2, `Title should be 2 words: ${bestowed.title}`);
  assert.ok(COLOR_PALETTE.some(c => c.name === parts[0]), `Invalid color: ${parts[0]}`);
  assert.ok(COLOR_EPITHETS.includes(parts[1]), `Invalid epithet: ${parts[1]}`);

  generatedTitles.add(bestowed.title);
}

console.log(`✓ 1000 rolls generated ${generatedTitles.size} distinct titles with 0 canon collisions.`);

// 2. Test Branch Scene Meta
console.log('--- Testing Branch Scene Resolution ---');

// Dead
assert.equal(getBranchSceneMeta({ alive: false }).sceneClass, 'scene-hatch red');

// Distorted
assert.equal(getBranchSceneMeta({ alive: true, flags: ['Distorted'] }).sceneClass, 'scene-branch-distortion');

// EGO Awakened
assert.equal(getBranchSceneMeta({ alive: true, flags: ['EGOAwakened'] }).sceneClass, 'scene-branch-ego');

// Color Fixer
const colorMeta = getBranchSceneMeta({ alive: true, isColorFixer: true, customTitle: 'Vermilion Gale' });
assert.ok(colorMeta.sceneClass.includes('scene-branch-color') && colorMeta.sceneClass.includes('is-apex'));
assert.equal(colorMeta.isColor, true);
assert.equal(colorMeta.isApex, true);

// Factions
assert.ok(getBranchSceneMeta({ alive: true, job: 'Syndicate', finger: 'Thumb', fingerRank: 0 }).sceneClass.includes('scene-branch-thumb'));
assert.ok(getBranchSceneMeta({ alive: true, job: 'Syndicate', finger: 'Thumb', fingerRank: 3 }).sceneClass.includes('is-apex'));
assert.ok(getBranchSceneMeta({ alive: true, job: 'Syndicate', finger: 'Middle' }).sceneClass.includes('scene-branch-middle'));
assert.ok(getBranchSceneMeta({ alive: true, job: 'Syndicate', finger: 'Index' }).sceneClass.includes('scene-branch-index'));
assert.ok(getBranchSceneMeta({ alive: true, job: 'Syndicate', finger: 'Ring' }).sceneClass.includes('scene-branch-ring'));
assert.ok(getBranchSceneMeta({ alive: true, job: 'Syndicate', finger: 'Pinky' }).sceneClass.includes('scene-branch-pinky'));
assert.ok(getBranchSceneMeta({ alive: true, job: 'Wing Employee', wingRank: 1 }).sceneClass.includes('scene-branch-wing'));
assert.ok(getBranchSceneMeta({ alive: true, job: 'Wing Employee', wingRank: 3 }).sceneClass.includes('is-apex'));
assert.ok(getBranchSceneMeta({ alive: true, job: 'Workshop Craftsman' }).sceneClass.includes('scene-branch-workshop'));

console.log('✓ All branch scenes & apex ranks resolve correctly.');
console.log('--- ALL COLOR & SCENE TESTS PASSED ---');
