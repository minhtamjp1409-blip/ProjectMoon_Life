import React from 'react';
import { useT } from '../../../i18n';
import { weightedOutcomes } from '../../../engine/outcomeOdds.js';
import { fixerPromotionSuccessChance, isFixerPromotionChoice } from '../../../engine/careerPipeline.js';

const LABELS = {
  health: ['HP', 'HP'],
  sanity: ['SP', 'SP'],
  wealth: ['Ahn', 'Ahn'],
  network: ['Quan hệ', 'Network'],
  rep: ['Danh tiếng', 'Rep'],
  heat: ['Truy nã', 'Heat'],
  resonance: ['Cộng hưởng', 'Resonance'],
  taboo: ['Điều cấm', 'Taboo'],
  merit: ['Công trạng', 'Merit'],
  standing: ['Hồ sơ sạch', 'Standing'],
  leverage: ['Bí mật nắm giữ', 'Leverage']
};

const STAT_ICONS = {
  health: '♥',
  sanity: '✦',
  wealth: '◆',
  network: '❖',
  rep: '★',
  heat: '▲',
  resonance: '◎',
  taboo: '✖',
  merit: '◈',
  standing: '▣',
  leverage: '◇'
};

// Stats whose rise is bad news
const RISE_IS_BAD = new Set(['heat', 'taboo']);
const NEUTRAL = new Set(['resonance']);

const sign = (v) => (v > 0 ? `+${v}` : `${v}`);

function toneOf(k, v) {
  if (NEUTRAL.has(k)) return 'rare';
  const good = RISE_IS_BAD.has(k) ? v < 0 : v > 0;
  return good ? 'up' : 'down';
}

/** One chip per change: stats, bonds, people met or lost, scars, consequences planted. */
export function DeltaChip({ d, i = 0 }) {
  const { t } = useT();
  const style = { animationDelay: `${i * 70}ms` };
  if (LABELS[d.k]) {
    const [vi, en] = LABELS[d.k];
    return (
      <span className={`delta is-${toneOf(d.k, d.v)}`} style={style}>
        {t(vi, en)} <b className="num">{sign(d.v)}</b>
      </span>
    );
  }
  if (d.k === 'bond') {
    return (
      <span className={`delta is-${d.v > 0 ? 'bond' : 'down'}`} style={style}>
        {t('Gắn bó', 'Bond')} · {d.name} <b className="num">{sign(d.v)}</b>
      </span>
    );
  }
  if (d.k === 'meet') {
    return (
      <span className="delta is-bond" style={style}>
        {t('Người mới', 'Someone new')} · {d.name}
      </span>
    );
  }
  if (d.k === 'promote') {
    return (
      <span className="delta is-bond" style={style}>
        {d.name} · {t('bạn đời', 'spouse')}
      </span>
    );
  }
  if (d.k === 'fate') {
    const text = { dead: t('đã chết', 'is dead'), missing: t('mất tích', 'is missing'), estranged: t('rời bỏ bạn', 'left you') }[d.v] || d.v;
    return (
      <span className="delta is-down is-heavy" style={style}>
        {d.name} {text}
      </span>
    );
  }
  if (d.k === 'scar') {
    return (
      <span className="delta is-rare" style={style}>
        {t('Dấu tích', 'Mark')} · {d.name}
      </span>
    );
  }
  if (d.k === 'job') {
    return (
      <span className="delta is-bond" style={style}>
        {t('Con đường: ', 'Path: ')} {d.v}
      </span>
    );
  }
  if (d.k === 'fixerGrade') {
    return (
      <span className="delta is-rare" style={style}>
        {d.v === 0 ? t('Thăng cấp: Color Fixer', 'Promoted: Color Fixer') : t(`Thăng cấp: Fixer Grade ${d.v}`, `Promoted: Fixer Grade ${d.v}`)}
      </span>
    );
  }
  if (d.k === 'fingerRank') {
    return (
      <span className="delta is-rare" style={style}>
        {t(`Cấp bậc Ngón Tay: Bậc ${d.v}`, `Finger Rank: Tier ${d.v}`)}
      </span>
    );
  }
  if (d.k === 'wingRank') {
    return (
      <span className="delta is-rare" style={style}>
        {t(`Cấp bậc Tập đoàn: Bậc ${d.v}`, `Wing Rank: Tier ${d.v}`)}
      </span>
    );
  }
  if (d.k === 'seed') {
    return (
      <span className="delta is-rare" style={style}>
        {t('Gieo một hậu quả', 'A consequence is planted')}
      </span>
    );
  }
  return null;
}

export const Deltas = ({ deltas }) =>
  deltas?.length ? (
    <div className="deltas">
      {deltas.map((d, i) => (
        <DeltaChip key={`${d.k}_${d.role || ''}_${i}`} d={d} i={i} />
      ))}
    </div>
  ) : null;

/* ---------- previewing a choice before you make it ---------- */

const STAT_ORDER = Object.keys(LABELS);

// Old story events call it `effects`/`outcomes`; small choices call it `fx`/`out`
const fxOf = (x) => x?.fx || x?.effects || {};
const outsOf = (c) => c?.out || c?.outcomes || null;

/**
 * What a choice will do: list of affected resources (without exact numbers to maintain
 * suspense and gamble), plus odds when multiple outcomes exist.
 */
export function previewChoice(choice, char, kind = 'major') {
  const base = fxOf(choice);
  const costOutsideEffects = choice.costAhn && base.wealth !== -choice.costAhn ? choice.costAhn : 0;
  if (isFixerPromotionChoice(choice, char)) {
    const pass = Math.round(fixerPromotionSuccessChance(char, choice.setFixerGrade) * 100);
    return { affected: [...new Set([...STAT_ORDER.filter((key) => Boolean(base[key])), 'health', 'wealth', 'sanity'])],
      fixed: [], ranges: [], odds: null, examOdds: { pass, fail: 100 - pass } };
  }
  const weighted = char ? weightedOutcomes(choice, char, kind) : (outsOf(choice) || []).map((outcome) => ({ outcome, weight: outcome.w ?? 1 }));
  const outs = weighted.map((entry) => entry.outcome);
  if (!outs?.length) {
    const affected = STAT_ORDER.filter((k) => Boolean(base[k]) || (k === 'wealth' && Boolean(choice.costAhn)));
    const fixed = STAT_ORDER.filter((k) => base[k] || (k === 'wealth' && choice.costAhn)).map((k) => ({ k, v: base[k] || -choice.costAhn }));
    return { affected, fixed, ranges: [], odds: null };
  }
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  const affected = [];
  const ranges = [];
  for (const k of STAT_ORDER) {
    const values = outs.map((o) => (base[k] || 0) + (fxOf(o)[k] || 0) - (k === 'wealth' ? costOutsideEffects : 0));
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    if (lo === 0 && hi === 0 && !base[k] && !(k === 'wealth' && choice.costAhn)) continue;
    affected.push(k);
    ranges.push({ k, lo, hi });
  }
  const odds = weighted.map((entry) => Math.round((entry.weight / total) * 100));
  return { affected, fixed: [], ranges, odds };
}

export const ChoicePreview = ({ choice, npcs, char, kind = 'major' }) => {
  const { t } = useT();
  const { affected, odds, examOdds } = previewChoice(choice, char, kind);
  const bonds = Object.entries(choice.bond || {})
    .map(([role]) => ({ name: npcs?.[role]?.nameVi || npcs?.spouse?.nameVi }))
    .filter((b) => b.name);
  if (!affected?.length && !bonds.length && !choice.later && !choice.scar && !choice.npcFate) return null;

  return (
    <span className="preview">
      {odds && (
        <span className="preview-odds">
          {t('May rủi', 'A gamble')} {odds.join(' / ')}%
        </span>
      )}
      {examOdds && (
        <span className="preview-odds">
          {t('Đỗ', 'Pass')} {examOdds.pass}% · {t('Trượt', 'Fail')} {examOdds.fail}%
        </span>
      )}
      {affected.map((k) => (
        <span key={k} className={`delta is-affected is-affected-${k} is-static`}>
          <span className="delta-stat-icon">{STAT_ICONS[k] || '⚡'}</span>
          {t(...LABELS[k])}
        </span>
      ))}
      {bonds.map((b) => (
        <span key={b.name} className="delta is-bond is-static">
          {t('Quan hệ', 'Bond')} · {b.name}
        </span>
      ))}
      {choice.later && <span className="delta is-rare is-static">{t('Sẽ có hậu quả', 'Has consequences')}</span>}
      {choice.scar && <span className="delta is-rare is-static">{t('Để lại dấu tích', 'Leaves a mark')}</span>}
    </span>
  );
};

export default Deltas;
