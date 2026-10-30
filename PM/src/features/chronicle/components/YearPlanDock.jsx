import { useEffect, useRef, useState } from 'react';
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

// One screen a year: time allocation, lifelong ambition, and the Apex directive when available.
export function YearPlanDock({ char, onConfirm }) {
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
  const firstButton = useRef(null);
  const firstAmbition = useRef(null);
  useEffect(() => {
    if (choosingAmbition) firstAmbition.current?.focus();
    else firstButton.current?.focus();
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

  return (
    <section className="dock year-plan" aria-labelledby="year-plan-title">
      <div className="dock-inner">
        <p className="dock-kicker">{t(`Tuổi ${char.age}`, `Age ${char.age}`)}</p>
        <h2 className="dock-title" id="year-plan-title">
          {choosingAmbition ? t('Bạn muốn sống vì điều gì?', 'What will you live for?') : t('Bạn dành năm nay cho điều gì?', 'How will you spend this year?')}
        </h2>
        {choosingAmbition ? <>
          <p className="year-plan-intro">{t('Đây là mục tiêu của cả đời. Sau khi chọn, bạn sẽ phân thời gian cho năm đầu đi làm.', 'This is your goal for this life. After choosing, you will plan your first working year.')}</p>
          <fieldset className="year-plan-ambitions">
            <legend>{t('Tham vọng của đời này', 'Ambition for this life')}</legend>
            {choices.map((goal, index) => (
              <label key={goal.id} className={ambition === goal.id ? 'is-selected' : ''}>
                <input ref={index === 0 ? firstAmbition : null} type="radio" name="life-ambition" value={goal.id} checked={ambition === goal.id} onChange={() => setAmbition(goal.id)} />
                <span><strong>{t(goal.vi, goal.en)}</strong><small>{t(goal.detailVi, goal.detailEn)}</small></span>
              </label>
            ))}
          </fieldset>
          <button type="button" className="btn btn-primary year-plan-confirm" disabled={!ambition} onClick={() => setChoosingAmbition(false)}>
            {t('Lập kế hoạch năm đầu', 'Plan the first working year')}
          </button>
        </> : <>
        <p className="year-plan-intro">
          {t('Phân 3 ô thời gian cho định hướng năm nay.', 'Assign three time slots for this year.')}
        </p>
        <p className="year-plan-remaining" aria-live="polite">
          {t(`Còn ${YEAR_PLAN_POINTS - used} ô`, `${YEAR_PLAN_POINTS - used} slots left`)}
        </p>
        {priorPoints && (
          <button className="year-plan-reuse" type="button" onClick={() => setPoints(priorPoints)}>
            {t('Dùng lại kế hoạch năm trước', 'Use last year’s plan')}
          </button>
        )}
        <div className="year-plan-activities">
          {YEAR_ACTIVITIES.map((activity, index) => (
            <div className="year-plan-activity" key={activity.id}>
              <div>
                <strong>{t(activity.vi, activity.en)}</strong>
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
                  ref={index === 0 ? firstButton : null}
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
                    <small style={{ marginLeft: 4, opacity: 0.85 }}>
                      ({t(netDeltas.companionDetails[0].nameVi, netDeltas.companionDetails[0].nameEn)})
                    </small>
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
            className="btn btn-primary year-plan-confirm"
            type="button"
            disabled={!canConfirm}
            onClick={() => onConfirm(points, ambition, apexEligible ? directive : null)}
          >
            {t('Bắt đầu năm mới', 'Begin New Year')}
          </button>
        </div>
        </>}
      </div>
    </section>
  );
}
