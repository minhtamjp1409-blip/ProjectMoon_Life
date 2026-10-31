/**
 * Cutscene lint: every scene in the registry is drawn, has all four cuts, and its CSS keeps the house rules
 * (only transform and opacity move, nothing loops, colours come from tokens, reduced motion has a still cut).
 * The scene words go through voice_lint with the story text.
 * Usage: node tools/lint/check_cutscenes.mjs
 */
import { readFileSync } from 'node:fs';
import { CUTSCENES } from '../../src/features/cutscene/registry.js';

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');
const css = read('src/styles/ui/cutscene.css');
const layer = read('src/features/cutscene/CutsceneLayer.jsx');
const problems = [];
const fail = (msg) => problems.push(msg);

const art = (layer.match(/SCENE_ART = \{([^}]*)\}/) || [])[1] || '';
for (const [id, scene] of Object.entries(CUTSCENES)) {
  if (!new RegExp(`\\b${id}:`).test(art)) fail(`${id}: no drawing in CutsceneLayer SCENE_ART`);
  for (const cut of ['full', 'lite', 'still', 'caption']) if (!(scene.ms?.[cut] > 0)) fail(`${id}: missing ${cut} cut`);
  if (scene.ms?.full > 8000) fail(`${id}: full cut runs ${scene.ms.full} ms, over 8 s`);
  if (scene.ms?.lite > 1000) fail(`${id}: lite cut runs ${scene.ms.lite} ms, over 1 s`);
  if (!scene.keyDynamic && !scene.lines?.[scene.keyLine]) fail(`${id}: key line ${scene.keyLine} does not exist`);
  if (scene.ms?.full && scene.lines?.length * 700 > scene.ms.full) fail(`${id}: too many lines to read in ${scene.ms.full} ms`);
}

for (const cut of ['is-full', 'is-lite', 'is-still', 'is-caption']) if (!css.includes(`.${cut}`)) fail(`cutscene.css has no .${cut} rules`);
if (!/\.is-still,\s*\.is-still \* \{ animation: none !important; \}/.test(css)) fail('the still cut must stop every animation');
if (/infinite/.test(css)) fail('a scene animation loops; scenes play once');
if (/transition:\s*all/.test(css)) fail('transition: all');

// Keyframes move only transform and opacity
for (const [, name, body] of css.matchAll(/@keyframes\s+([\w-]+)\s*\{([\s\S]*?\})\s*\}/g)) {
  for (const [, prop] of body.matchAll(/([a-z-]+)\s*:/g)) {
    if (!['transform', 'opacity'].includes(prop)) fail(`@keyframes ${name} animates ${prop}`);
  }
}

// Colours only through tokens, outside comments
const code = css.replace(/\/\*[\s\S]*?\*\//g, '');
const literal = code.match(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i);
if (literal) fail(`literal colour ${literal[0]} in cutscene.css; use a token`);

if (problems.length) {
  console.error(`Cutscene lint: ${problems.length} problem(s)`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`Cutscene lint: ${Object.keys(CUTSCENES).length} scene(s), four cuts each, transform and opacity only, tokens only.`);
