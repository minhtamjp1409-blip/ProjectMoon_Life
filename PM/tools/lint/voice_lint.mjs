/**
 * Voice lint: checks the written text of every story entry and dungeon stage against the rules in
 * UNIVERSE.md section 4 and the antislop copy rules (no long dashes, no decorative emoji, no stat
 * numbers in prose, no exclamation runs, canon terms left untranslated).
 * Usage: node tools/lint/voice_lint.mjs [--examples=N] [--rule=name] [--fail]
 */
import { ALL_STORY_EVENTS } from '../../src/engine/gameEngine.js';
import { LIFE_MINORS, LIFE_DAILIES } from '../../src/engine/yearPlanner.js';
import { CONSEQUENCE_EVENTS } from '../../src/data/eventsChildhood.js';
import { FIXER_REQUESTS } from '../../src/data/eventsSupernatural.js';
import { DUNGEON_DEFINITIONS } from '../../src/engine/dungeonEngine.js';
import { ASSOCIATIONS, OFFICE_REQUESTS } from '../../src/data/associations.js';
import { GAUNTLETS, REST_TEXT } from '../../src/data/dungeonGauntlets.js';

const arg = (name, dflt) => (process.argv.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1] ?? dflt;
const EXAMPLES = Number(arg('examples', 0));
const ONLY = arg('rule', '');
// Two dailies are about a moon the Districts cannot see; that is the point of them
const MOON_OK = new Set(['r_m_moon', 'r_e_moon']);

function bangOutsideQuotes(s) {
  let inQuote = false;
  for (const ch of s) {
    if (ch === String.fromCharCode(8220) || ch === String.fromCharCode(34)) inQuote = !inQuote;
    else if (ch === String.fromCharCode(8221)) inQuote = false;
    else if (ch === String.fromCharCode(33) && !inQuote) return true;
  }
  return false;
}

const RULES = {
  longDash: { re: /[—–]|\s--\s/, why: 'long dash (UNIVERSE 4.5)' },
  emoji: { re: /[\u{1F300}-\u{1FAFF}☀-➿⭐⬆️]/u, why: 'decorative emoji' },
  statNumber: { re: /[+\u2212]\d+\s?(?:HP|SP|Ahn|Merit|Heat|Resonance|Rep\b|Sanity|Taboo|Network)/i, why: 'signed stat tally or percent in story prose (UNIVERSE 4.7)' },
  exclaim: { test: bangOutsideQuotes, why: 'exclamation mark in narration (inside quoted speech is allowed)' },
  hanViet: { re: /Ngũ Chỉ|Huyết Quỷ|Sổ Thù Hận|Thiên Mệnh|Sát Tinh|Thành Phố|Thành phố/, why: 'translated canon term (UNIVERSE 4.4)' },
  moon: { re: /ánh trăng|mặt trăng|moonlight|\bmoon(?!\s?(?:project|light corp))\b/i, why: 'the City has no moon' },
  placeholder: { re: /\{(?!(?:name|age|friend|rival|lover|nemesis|parentName|parentDeath|parent|relic|partner|spouse|child|ward|mentor|mentee|scars)\})[a-zA-Z_]+\}|undefined|NaN|\[object/, why: 'placeholder interpolateText does not fill' },
  doubleSpace: { re: /\S {2,}\S/, why: 'double space' },
};

const strings = [];
const push = (pool, id, field, s) => { if (typeof s === 'string' && s) strings.push({ pool, id, field, s }); };
const walk = (pool, id, field, v) => {
  if (typeof v === 'string') return push(pool, id, field, v);
  if (Array.isArray(v)) return v.forEach((x, i) => walk(pool, id, `${field}[${i}]`, x));
  if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (/^(vi|en|titleVi|titleEn|labelVi|labelEn|resultVi|resultEn|descVi|descEn|nameVi|nameEn|kickerVi|kickerEn|rvi|ren|textVi|textEn|introVi|introEn|tellVi|tellEn|phaseVi|phaseEn|judgmentVi|judgmentEn|failVi|failEn)$/.test(k) || typeof x === 'object') walk(pool, id, `${field}.${k}`, x);
};
const assocRequests = [...Object.values(ASSOCIATIONS).flatMap((a) => a.requests), ...OFFICE_REQUESTS];
const poolOf = [['major', ALL_STORY_EVENTS], ['consequence', CONSEQUENCE_EVENTS], ['minor', LIFE_MINORS], ['daily', LIFE_DAILIES], ['request', FIXER_REQUESTS], ['request', assocRequests]];
for (const [pool, list] of poolOf) for (const e of list) walk(pool, e.id, '', e);
for (const d of Object.values(DUNGEON_DEFINITIONS)) walk('dungeon', d.id, '', d);
for (const [id, g] of Object.entries(GAUNTLETS)) walk('dungeon', id, '.gauntlet', g);
walk('dungeon', 'rest', '', REST_TEXT);

const tally = {};
const shown = {};
const byPool = {};
for (const { pool, id, field, s } of strings) {
  for (const [name, rule] of Object.entries(RULES)) {
    if (ONLY && ONLY !== name) continue;
    if (name === 'moon' && MOON_OK.has(id)) continue;
    if (rule.test ? rule.test(s) : rule.re.test(s)) {
      tally[name] = (tally[name] || 0) + 1;
      (byPool[name] ||= {})[pool] = (byPool[name]?.[pool] || 0) + 1;
      if (EXAMPLES && (shown[name] = (shown[name] || 0) + 1) <= EXAMPLES) console.log(`[${name}] ${pool}:${id}${field} :: ${s.replace(/\n/g, ' ').slice(0, 160)}`);
    }
  }
}
console.log(`\nStrings checked: ${strings.length}`);
for (const [name, { why }] of Object.entries(RULES)) {
  if (ONLY && ONLY !== name) continue;
  console.log(`${name.padEnd(12)} ${String(tally[name] || 0).padStart(5)}  ${why}  ${JSON.stringify(byPool[name] || {})}`);
}
if (process.argv.includes('--fail') && Object.values(tally).some(Boolean)) process.exitCode = 1;
