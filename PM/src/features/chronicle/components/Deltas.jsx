import React from 'react';
import { useT } from '../../../i18n';

const LABELS = {
  health: ['Sinh lực', 'Health'],
  sanity: ['Tâm trí', 'Sanity'],
  wealth: ['Ahn', 'Ahn'],
  network: ['Mạng lưới', 'Network'],
  rep: ['Danh vọng', 'Reputation'],
  heat: ['Heat', 'Heat'],
  resonance: ['Resonance', 'Resonance'],
  taboo: ['Taboo', 'Taboo'],
  merit: ['Merit', 'Merit']
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
        {t('Vết sẹo', 'Scar')} · {d.name}
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
 * What a choice will do: fixed changes, or for a gamble each stat's range across
 * outcomes plus the odds.
 */
export function previewChoice(choice) {
  const base = fxOf(choice);
  const outs = outsOf(choice);
  if (!outs?.length) {
    return { fixed: STAT_ORDER.filter((k) => base[k]).map((k) => ({ k, v: base[k] })), ranges: [], odds: null };
  }
  const total = outs.reduce((s, o) => s + (o.w ?? 50), 0);
  const ranges = [];
  for (const k of STAT_ORDER) {
    const values = outs.map((o) => (base[k] || 0) + (fxOf(o)[k] || 0));
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    if (lo === 0 && hi === 0) continue;
    if (lo === hi) ranges.push({ k, lo, hi });
    else ranges.push({ k, lo, hi });
  }
  return { fixed: [], ranges, odds: outs.map((o) => Math.round(((o.w ?? 50) / total) * 100)) };
}

export const ChoicePreview = ({ choice, npcs }) => {
  const { t } = useT();
  const { fixed, ranges, odds } = previewChoice(choice);
  const bonds = Object.entries(choice.bond || {})
    .map(([role, v]) => ({ name: npcs?.[role]?.nameVi || npcs?.spouse?.nameVi, v }))
    .filter((b) => b.name);
  if (!fixed.length && !ranges.length && !bonds.length && !choice.later && !choice.scar && !choice.npcFate) return null;

  return (
    <span className="preview">
      {odds && (
        <span className="preview-odds">
          {t('May rủi', 'A gamble')} {odds.join(' / ')}%
        </span>
      )}
      {fixed.map((d) => (
        <span key={d.k} className={`delta is-${toneOf(d.k, d.v)} is-static`}>
          {t(...LABELS[d.k])} <b className="num">{sign(d.v)}</b>
        </span>
      ))}
      {ranges.map((r) => (
        <span key={r.k} className={`delta is-${r.lo === r.hi ? toneOf(r.k, r.lo) : r.hi <= 0 ? toneOf(r.k, -1) : r.lo >= 0 ? toneOf(r.k, 1) : 'mixed'} is-static`}>
          {t(...LABELS[r.k])}{' '}
          <b className="num">{r.lo === r.hi ? sign(r.lo) : `${sign(r.lo)} ~ ${sign(r.hi)}`}</b>
        </span>
      ))}
      {bonds.map((b) => (
        <span key={b.name} className={`delta is-${b.v > 0 ? 'bond' : 'down'} is-static`}>
          {b.name} <b className="num">{sign(b.v)}</b>
        </span>
      ))}
      {choice.later && <span className="delta is-rare is-static">{t('Sẽ có hậu quả', 'Has consequences')}</span>}
      {choice.scar && <span className="delta is-rare is-static">{t('Để lại sẹo', 'Leaves a scar')}</span>}
    </span>
  );
};

export default Deltas;
