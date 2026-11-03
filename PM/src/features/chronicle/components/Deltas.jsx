import React from 'react';
import { useT } from '../../../i18n';
import { weightedOutcomes } from '../../../engine/outcomeOdds.js';
import { fixerPromotionSuccessChance, isFixerPromotionChoice } from '../../../engine/careerPipeline.js';
import { bringsClaw } from '../../../engine/forbiddenPath.js';
import { getChoiceAhnCost } from '../../../engine/eventConditions.js';
import { interpolateText } from '../../../engine/gameEngine.js';

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

const STAT_COLORS = {
  health: 'var(--s-health)',
  sanity: 'var(--s-sanity)',
  wealth: 'var(--s-wealth)',
  network: 'var(--s-network)',
  rep: 'var(--s-rep)',
  heat: 'var(--s-heat)',
  resonance: 'var(--s-reso)',
  taboo: 'var(--bad)',
  merit: 'var(--gold)',
  standing: 'var(--s-network)',
  leverage: 'var(--s-heat)'
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
  if (d.k === 'favour') {
    return (
      <span className={`delta is-${d.v > 0 ? 'bond' : 'down'}`} style={style}>
        {t('Ân nghĩa', 'Favour')} · {d.name} <b className="num">{sign(d.v)}</b>
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
        {t(`Cấp bậc Finger: Bậc ${d.v}`, `Finger Rank: Tier ${d.v}`)}
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

export function choiceCostDisplay(choice, char) {
  const costAhn = getChoiceAhnCost(choice, char);
  const isShortAhn = costAhn > (char?.stats?.wealth ?? char?.wealth ?? 0);
  return {
    costAhn,
    isShortAhn,
    needVi: `Thiếu Ahn (Cần ${costAhn})`,
    needEn: `Short Ahn (Needs ${costAhn})`,
    costVi: `Tốn ${costAhn} Ahn`,
    costEn: `Cost: ${costAhn} Ahn`
  };
}

import { previewChoice, hasMinorExtraDetails } from '../choicePreviewModel.js';
export { previewChoice, hasMinorExtraDetails };

export const ChoicePreview = ({ choice, npcs, char, kind = 'major', check = null, expanded = false }) => {
  const { t, lang } = useT();
  const { affected, directions, odds, examOdds } = previewChoice(choice, char, kind);
  const bonds = Object.entries(choice.bond || {})
    .map(([role]) => ({ name: npcs?.[role]?.nameVi || npcs?.spouse?.nameVi }))
    .filter((b) => b.name);
  const rawLasting = choice?.lasting
    ? (lang === 'en' ? (choice.lasting.en || choice.lasting.vi) : (choice.lasting.vi || choice.lasting.en))
    : null;
  const lastingText = rawLasting && char ? interpolateText(rawLasting, char) : rawLasting;
  if (!affected?.length && !bonds.length && !check && !odds && !examOdds && !choice.later && !choice.scar && !choice.npcFate && !lastingText && !bringsClaw(choice, char)) return null;

  const renderStatChip = (k) => {
    const dir = directions?.[k] || 'vary';
    const tone = dir === 'rise' ? toneOf(k, 1) : dir === 'fall' ? toneOf(k, -1) : 'affected';
    const dirMark = dir === 'rise' ? '+' : dir === 'fall' ? '−' : '±';
    return (
      <span key={k} className={`delta is-${tone} is-affected is-affected-${k} is-static`}>
        <i className="delta-stat-dot" style={{ background: STAT_COLORS[k] || 'var(--muted)' }} aria-hidden="true" />
        {t(...LABELS[k])} <b className="num">{dirMark}</b>
      </span>
    );
  };

  const renderBondChips = () => bonds.map((b) => (
    <span key={b.name} className="delta is-bond is-static">
      {t('Quan hệ', 'Bond')} · {b.name}
    </span>
  ));

  const renderRiskChips = () => (
    <>
      {bringsClaw(choice, char) && <span className="delta is-down is-static">{t('Đủ 3 Taboo: Claw đến ngay, không có đường rút', 'Reaches 3 Taboo: the Claw arrives at once, no retreat')}</span>}
      {choice.later && <span className="delta is-rare is-static">{t('Sẽ có hậu quả', 'Has consequences')}</span>}
      {choice.scar && <span className="delta is-rare is-static">{t('Để lại dấu tích', 'Leaves a mark')}</span>}
    </>
  );

  const renderLasting = () => (
    lastingText ? <span className="choice-lasting">{lastingText}</span> : null
  );

  const renderOdds = () => {
    if (examOdds) {
      return (
        <span className="preview-odds">
          {t(`Đỗ ${examOdds.pass}%`, `Pass ${examOdds.pass}%`)}
        </span>
      );
    }
    if (check) {
      return (
        <span className={`disco-check-pill ${check.isRedCheck ? 'is-red' : 'is-white'}`}>
          <span className="check-tag">{t(`Trót lọt ${check.successPct}%`, `${check.successPct}% chance`)}</span>
          {(check.modifiers || []).map((m, mIdx) => (
            <span key={mIdx} className={`check-mod ${m.pos ? 'is-pos' : 'is-neg'}`}>
              {lang === 'en' ? m.labelEn : m.labelVi}
            </span>
          ))}
        </span>
      );
    }
    if (odds) {
      return (
        <span className="preview-odds">
          {t(`Trót lọt ${odds[0]}%`, `${odds[0]}% chance`)}
        </span>
      );
    }
    return null;
  };

  if (kind !== 'minor') {
    return (
      <span className="preview">
        {renderOdds()}
        {affected.map(renderStatChip)}
        {renderBondChips()}
        {renderRiskChips()}
        {renderLasting()}
      </span>
    );
  }

  // Minor choices (Đợt 118a):
  // Main impact: first affected stat, or odds if no stats
  const primaryStat = affected[0];
  const secondaryStats = affected.slice(1);

  return (
    <span className={`preview is-minor-preview ${expanded ? 'is-expanded' : 'is-folded'}`}>
      <span className="preview-primary">
        {!primaryStat && renderOdds()}
        {primaryStat && renderStatChip(primaryStat)}
      </span>
      <span className={`preview-secondary ${expanded ? 'is-open' : 'is-hidden-mobile'}`}>
        {primaryStat && renderOdds()}
        {secondaryStats.map(renderStatChip)}
        {renderBondChips()}
        {renderRiskChips()}
        {renderLasting()}
      </span>
    </span>
  );
};

export default Deltas;
