import { useEffect, useRef, useState } from 'react';
import { EyeOff } from 'lucide-react';
import {
  AMBITIONS,
  APEX_DIRECTIVES,
  YEAR_ACTIVITIES,
  YEAR_PLAN_POINTS,
  ambitionsFor,
  defaultYearPoints,
  isApexCommander,
  previousYearPoints,
  previewAnnualPlanDeltas
} from '../../../engine/annualPlan.js';
import { audioEngine } from '../../../engine/audioEngine.js';
import { useGameStore } from '../../../store/gameStore.js';
import { useT } from '../../../i18n';

const DIRECTIVE_STAT_LABELS = {
  wealth: ['Ahn', 'Ahn'],
  merit: ['Merit', 'Merit'],
  rep: ['Rep', 'Rep'],
  health: ['HP', 'HP'],
  sanity: ['SP', 'SP'],
  network: ['Quan hệ', 'Network'],
  resonance: ['Resonance', 'Resonance'],
  leverage: ['Leverage', 'Leverage'],
  heat: ['Heat', 'Heat'],
  bondBoost: ['Gắn kết', 'Bond']
};

function renderDirectiveChips(fx = {}, t) {
  const chips = [];
  if (fx.costAhnOrRep) {
    chips.push({
      key: 'costAhnOrRep',
      tone: 'down',
      label: t('Chi phí', 'Upkeep'),
      val: `-${fx.costAhnOrRep} Ahn`
    });
  }
  for (const [k, v] of Object.entries(fx)) {
    if (!v || !DIRECTIVE_STAT_LABELS[k]) continue;
    const [vi, en] = DIRECTIVE_STAT_LABELS[k];
    const isGood = k === 'heat' ? v < 0 : v > 0;
    const tone = k === 'resonance' ? 'rare' : isGood ? 'up' : 'down';
    chips.push({
      key: k,
      tone,
      label: t(vi, en),
      val: v > 0 ? `+${v}` : `${v}`
    });
  }
  return (
    <span className="directive-deltas">
      {chips.map((c) => (
        <span key={c.key} className={`delta is-${c.tone} is-static`}>
          {c.label} <b className="num">{c.val}</b>
        </span>
      ))}
    </span>
  );
}

const emptyYearPoints = () => Object.fromEntries(YEAR_ACTIVITIES.map((a) => [a.id, 0]));

// One screen a year: time allocation, lifelong ambition, and the Apex directive when available.
export function YearPlanDock({ char, onConfirm, onPeek }) {
  const { t } = useT();
  const choices = ambitionsFor(char);
  const apexEligible = isApexCommander(char);
  const [points, setPoints] = useState(defaultYearPoints);
  const priorPoints = previousYearPoints(char);
  const [ambition, setAmbition] = useState(
    char.ambition?.id || (choices.some((goal) => goal.id === 'survive') ? 'survive' : choices[0]?.id)
  );
  const [choosingAmbition, setChoosingAmbition] = useState(!char.ambition);
  const [directive, setDirective] = useState(
    () => char.lastApexDirective?.id || APEX_DIRECTIVES[0]?.id || 'dispatch_squad'
  );
  const confirmButtonRef = useRef(null);
  const selectedAmbitionRef = useRef(null);
  useEffect(() => {
    if (choosingAmbition) selectedAmbitionRef.current?.focus();
    else confirmButtonRef.current?.focus();
  }, [char.pendingYearPlan?.age, choosingAmbition]);
  const used = YEAR_ACTIVITIES.reduce((sum, activity) => sum + (points[activity.id] || 0), 0);
  const canConfirm = used === YEAR_PLAN_POINTS && Boolean(char.ambition || ambition);
  const current = AMBITIONS.find((goal) => goal.id === char.ambition?.id);
  const netDeltas = previewAnnualPlanDeltas(char, points, apexEligible ? directive : null);

  function changePoint(id, amount) {
    setPoints((previous) => {
      const total = YEAR_ACTIVITIES.reduce((sum, activity) => sum + (previous[activity.id] || 0), 0);
      if (amount > 0 && total >= YEAR_PLAN_POINTS) return previous;
      return { ...previous, [id]: Math.max(0, Math.min(YEAR_PLAN_POINTS, (previous[id] || 0) + amount)) };
    });
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) && document.activeElement?.type !== 'radio') return;
      if (useGameStore.getState().cutscene) return;
      if ((e.key === 'v' || e.key === 'V') && onPeek) {
        e.preventDefault();
        audioEngine.playClick();
        onPeek();
        return;
      }
      if (choosingAmbition) {
        const idx = parseInt(e.key, 10) - 1;
        if (!Number.isNaN(idx) && idx >= 0 && idx < choices.length) {
          e.preventDefault();
          audioEngine.playClick();
          setAmbition(choices[idx].id);
          return;
        }
        if (e.key === 'Enter' && ambition && document.activeElement?.tagName !== 'BUTTON') {
          e.preventDefault();
          audioEngine.playClick();
          setChoosingAmbition(false);
        }
        return;
      }
      if (e.key === '0' || e.key === 'Backspace') {
        e.preventDefault();
        audioEngine.playClick();
        setPoints(emptyYearPoints());
        return;
      }
      if ((e.key === 'r' || e.key === 'R') && priorPoints) {
        e.preventDefault();
        audioEngine.playClick();
        setPoints(priorPoints);
        return;
      }
      const actIdx = parseInt(e.key, 10) - 1;
      if (!Number.isNaN(actIdx) && actIdx >= 0 && actIdx < YEAR_ACTIVITIES.length) {
        e.preventDefault();
        audioEngine.playClick();
        changePoint(YEAR_ACTIVITIES[actIdx].id, e.shiftKey ? -1 : 1);
        return;
      }
      if (e.key === 'Enter' && canConfirm && !['BUTTON', 'SUMMARY'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        audioEngine.playClick();
        onConfirm(points, ambition, apexEligible ? directive : null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [choosingAmbition, choices, ambition, priorPoints, canConfirm, points, apexEligible, directive, onConfirm, onPeek]);

  return (
    <section className="dock year-plan" aria-labelledby="year-plan-title">
      <div className="dock-inner">
        <div className="dock-kicker-row">
          <p className="dock-kicker">{t(`Tuổi ${char.age}`, `Age ${char.age}`)}</p>
          <div className="dock-kicker-actions">
            <span className="dock-hotkey-hint">
              {choosingAmbition
                ? t('Phím 1-4 chọn · Enter tiếp tục', 'Keys 1-4 pick · Enter continue')
                : t('Phím 1-5 thêm · 0 xóa · Enter xác nhận', 'Keys 1-5 add · 0 clear · Enter confirm')}
            </span>
            {onPeek && (
              <button
                type="button"
                className="dock-peek-btn"
                onClick={onPeek}
                aria-label={t('Xem biên niên phía sau (phím V)', 'See chronicle behind (V key)')}
                title={t('Xem biên niên phía sau (V)', 'See chronicle behind (V)')}
              >
                <EyeOff size={15} aria-hidden="true" />
                <span>{t('Xem phía sau', 'See behind')}</span>
              </button>
            )}
          </div>
        </div>
        <h2 className="dock-title" id="year-plan-title">
          {choosingAmbition ? t('Bạn muốn sống vì điều gì?', 'What will you live for?') : t('Bạn dành năm nay cho điều gì?', 'How will you spend this year?')}
        </h2>
        {choosingAmbition ? <>
          <p className="year-plan-intro">{t('Đây là mục tiêu của cả đời. Sau khi chọn, bạn sẽ phân thời gian cho năm đầu đi làm.', 'This is your goal for this life. After choosing, you will plan your first working year.')}</p>
          <fieldset className="year-plan-ambitions">
            <legend>{t('Tham vọng của đời này', 'Ambition for this life')}</legend>
            {choices.map((goal, index) => {
              const isSelected = ambition === goal.id || (!ambition && index === 0);
              return (
                <label key={goal.id} className={ambition === goal.id ? 'is-selected' : ''}>
                  <input ref={isSelected ? selectedAmbitionRef : null} type="radio" name="life-ambition" value={goal.id} checked={ambition === goal.id} onChange={() => setAmbition(goal.id)} />
                  <span><strong>{t(goal.vi, goal.en)}</strong><small>{t(goal.detailVi, goal.detailEn)}</small></span>
                </label>
              );
            })}
          </fieldset>
          <button type="button" className="btn btn-primary year-plan-confirm" disabled={!ambition} onClick={() => setChoosingAmbition(false)}>
            {t('Lập kế hoạch năm đầu', 'Plan the first working year')}
          </button>
        </> : <>
        <p className="year-plan-intro">
          {t('Phân 3 ô thời gian cho định hướng năm nay.', 'Assign three time slots for this year.')}
        </p>
        <div className="year-plan-toolbar">
          <p className="year-plan-remaining" aria-live="polite">
            {t(`Còn ${YEAR_PLAN_POINTS - used} ô`, `${YEAR_PLAN_POINTS - used} slots left`)}
          </p>
          <div className="year-plan-quick-btns">
            {used > 0 && (
              <button className="year-plan-reuse is-quiet" type="button" onClick={() => setPoints(emptyYearPoints())}>
                {t('Đặt lại về 0', 'Clear slots')}
              </button>
            )}
            {priorPoints && (
              <button className="year-plan-reuse" type="button" onClick={() => setPoints(priorPoints)}>
                {t('Dùng lại năm trước', 'Use last year’s plan')}
              </button>
            )}
          </div>
        </div>
        <div className="year-plan-activities">
          {YEAR_ACTIVITIES.map((activity, index) => (
            <div className="year-plan-activity" key={activity.id}>
              <div>
                <strong><span className="year-plan-slot-idx">{index + 1}.</span> {t(activity.vi, activity.en)}</strong>
                <small>{t(activity.effectVi.split(' (')[0], activity.effectEn.split(' (')[0])}</small>
                {activity.effectVi.includes(' (') && (
                  <details className="year-plan-more">
                    <summary>{t('Khi dồn nhiều ô', 'When stacking slots')}</summary>
                    <p>{t(activity.effectVi, activity.effectEn)}</p>
                  </details>
                )}
              </div>
              <div className="year-plan-stepper">
                <button
                  type="button"
                  aria-label={t(`Giảm ${activity.vi}`, `Reduce ${activity.en}`)}
                  onClick={() => changePoint(activity.id, -1)}
                  disabled={!points[activity.id]}
                >
                  −
                </button>
                <output aria-label={t(`${activity.vi}: ${points[activity.id]} ô`, `${activity.en}: ${points[activity.id]} slots`)}>
                  {points[activity.id]}
                </output>
                <button
                  type="button"
                  aria-label={t(`Tăng ${activity.vi}`, `Increase ${activity.en}`)}
                  onClick={() => changePoint(activity.id, 1)}
                  disabled={used >= YEAR_PLAN_POINTS}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        {used > 0 && (
          <div className="year-plan-net-summary" aria-label={t('Tổng kết hiệu ứng dự kiến', 'Estimated Net Deltas')}>
            <span className="net-summary-title">{t('Tổng kết dự kiến:', 'Estimated Net:')}</span>
            <span className="net-summary-chips">
              {netDeltas.wealth !== 0 && (
                <span className={`delta is-${netDeltas.wealth > 0 ? 'up' : 'down'} is-static`}>
                  {t('Ahn', 'Ahn')} {netDeltas.wealth > 0 ? `+${netDeltas.wealth}` : netDeltas.wealth}
                </span>
              )}
              {netDeltas.health !== 0 && (
                <span className={`delta is-${netDeltas.health > 0 ? 'up' : 'down'} is-static`}>
                  {t('HP', 'HP')} {netDeltas.health > 0 ? `+${netDeltas.health}` : netDeltas.health}
                </span>
              )}
              {netDeltas.sanity !== 0 && (
                <span className={`delta is-${netDeltas.sanity > 0 ? 'up' : 'down'} is-static`}>
                  {t('SP', 'SP')} {netDeltas.sanity > 0 ? `+${netDeltas.sanity}` : netDeltas.sanity}
                </span>
              )}
              {netDeltas.trainingCheckBonus > 0 && (
                <span className="delta is-rare is-static">
                  {t('Luyện tập', 'Train')} +{netDeltas.trainingCheckBonus}%
                </span>
              )}
              {netDeltas.network !== 0 && (
                <span className={`delta is-${netDeltas.network > 0 ? 'up' : 'down'} is-static`}>
                  {t('Quan hệ', 'Network')} {netDeltas.network > 0 ? `+${netDeltas.network}` : netDeltas.network}
                </span>
              )}
              {netDeltas.rep !== 0 && (
                <span className={`delta is-${netDeltas.rep > 0 ? 'up' : 'down'} is-static`}>
                  {t('Danh tiếng', 'Rep')} {netDeltas.rep > 0 ? `+${netDeltas.rep}` : netDeltas.rep}
                </span>
              )}
              {netDeltas.heat !== 0 && (
                <span className={`delta is-${netDeltas.heat < 0 ? 'up' : 'down'} is-static`}>
                  {t('Heat', 'Heat')} {netDeltas.heat > 0 ? `+${netDeltas.heat}` : netDeltas.heat}
                </span>
              )}
              {netDeltas.leverage !== 0 && (
                <span className={`delta is-${netDeltas.leverage > 0 ? 'up' : 'down'} is-static`}>
                  {t('Leverage', 'Leverage')} +{netDeltas.leverage}
                </span>
              )}
              {netDeltas.companionBond !== 0 && (
                <span
                  className={`delta is-${netDeltas.companionBond > 0 ? 'up' : 'down'} is-static`}
                  title={
                    netDeltas.companionDetails?.length
                      ? netDeltas.companionDetails
                          .map((c) => `${t(c.nameVi, c.nameEn)}: ${c.delta > 0 ? `+${c.delta}` : c.delta} (${c.initialBond} → ${c.nextBond})`)
                          .join('\n')
                      : undefined
                  }
                >
                  {t('Gắn kết', 'Bond')} {netDeltas.companionBond > 0 ? `+${netDeltas.companionBond}` : netDeltas.companionBond}
                  {netDeltas.companionDetails?.length === 1 && (
                    <span className="delta-companion-sub">
                      ({t(netDeltas.companionDetails[0].nameVi, netDeltas.companionDetails[0].nameEn)})
                    </span>
                  )}
                </span>
              )}
            </span>
          </div>
        )}
        {apexEligible && (
          <fieldset className="year-plan-ambitions year-plan-directives">
            <legend>{t('Chỉ thị Thủ Lĩnh (Quyền điều hành năm nay)', 'Apex Command Directive (Leadership Order)')}</legend>
            {APEX_DIRECTIVES.map((dir) => (
              <label key={dir.id} className={directive === dir.id ? 'is-selected' : ''}>
                <input
                  type="radio"
                  name="apex-directive"
                  value={dir.id}
                  checked={directive === dir.id}
                  onChange={() => setDirective(dir.id)}
                />
                <span>
                  <strong>{t(dir.vi, dir.en)}</strong>
                  <small>{t(dir.detailVi, dir.detailEn)}</small>
                  {renderDirectiveChips(dir.fx, t)}
                </span>
              </label>
            ))}
          </fieldset>
        )}
        {!char.ambition && <p className="year-plan-current-goal">{t('Bạn đã chọn', 'Chosen ambition')}: {t(choices.find((goal) => goal.id === ambition)?.vi, choices.find((goal) => goal.id === ambition)?.en)}</p>}
        {current && (
          <p className="year-plan-current-goal">
            {t('Tham vọng', 'Ambition')}: {t(current.vi, current.en)}
          </p>
        )}
        <div className="year-plan-confirm-wrap">
          <button
            ref={confirmButtonRef}
            className="btn btn-primary year-plan-confirm"
            type="button"
            disabled={!canConfirm}
            onClick={() => onConfirm(points, ambition, apexEligible ? directive : null)}
          >
            {t('Bắt đầu năm mới', 'Begin new year')}
          </button>
        </div>
        </>}
      </div>
    </section>
  );
}
