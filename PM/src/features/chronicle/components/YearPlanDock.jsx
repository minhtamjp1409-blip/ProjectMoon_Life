import { useEffect, useRef, useState } from 'react';
import {
  AMBITIONS,
  APEX_DIRECTIVES,
  YEAR_ACTIVITIES,
  YEAR_PLAN_POINTS,
  ambitionsFor,
  defaultYearPoints,
  isApexCommander,
  previewAnnualPlanDeltas
} from '../../../engine/annualPlan.js';
import { YearLeadList } from './YearLeadDock';
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

// One screen a year: where the time goes, the life's ambition the first time, Apex Command Directive for leaders, and the year's lead.
export function YearPlanDock({ char, draft, onConfirm }) {
  const { t } = useT();
  const choices = ambitionsFor(char);
  const apexEligible = isApexCommander(char);
  const [points, setPoints] = useState(() => char.lastYearPoints || defaultYearPoints());
  const [ambition, setAmbition] = useState(
    char.ambition?.id || (choices.some((goal) => goal.id === 'survive') ? 'survive' : choices[0]?.id)
  );
  const [directive, setDirective] = useState(
    () => char.lastApexDirective?.id || APEX_DIRECTIVES[0]?.id || 'dispatch_squad'
  );
  const firstButton = useRef(null);
  useEffect(() => {
    firstButton.current?.focus();
  }, [char.pendingYearPlan?.age]);
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
          {t('Bạn dành năm nay cho điều gì?', 'How will you spend this year?')}
        </h2>
        <p className="year-plan-intro">
          {draft
            ? t('Phân 3 ô thời gian, rồi chọn một manh mối để bắt đầu năm.', 'Assign three time slots, then pick a lead to begin the year.')
            : t('Phân 3 ô thời gian cho năm nay.', 'Assign three time slots for this year.')}
        </p>
        <p className="year-plan-remaining" aria-live="polite">
          {t(`Còn ${YEAR_PLAN_POINTS - used} ô`, `${YEAR_PLAN_POINTS - used} slots left`)}
        </p>
        <div className="year-plan-activities">
          {YEAR_ACTIVITIES.map((activity, index) => (
            <div className="year-plan-activity" key={activity.id}>
              <div>
                <strong>{t(activity.vi, activity.en)}</strong>
                <small>{t(activity.effectVi, activity.effectEn)}</small>
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
        {!char.ambition && (
          <fieldset className="year-plan-ambitions">
            <legend>{t('Tham vọng của đời này', 'Ambition for this life')}</legend>
            {choices.map((goal) => (
              <label key={goal.id} className={ambition === goal.id ? 'is-selected' : ''}>
                <input
                  type="radio"
                  name="life-ambition"
                  value={goal.id}
                  checked={ambition === goal.id}
                  onChange={() => setAmbition(goal.id)}
                />
                <span>
                  <strong>{t(goal.vi, goal.en)}</strong>
                  <small>{t(goal.detailVi, goal.detailEn)}</small>
                </span>
              </label>
            ))}
          </fieldset>
        )}
        {current && (
          <p className="year-plan-current-goal">
            {t('Tham vọng', 'Ambition')}: {t(current.vi, current.en)}
          </p>
        )}
        {draft ? (
          <div className="year-plan-leads">
            <h3>{t('Ba manh mối', 'Three leads')}</h3>
            <p className="year-leads-intro">
              {t('Bạn chỉ đủ thời gian theo một dấu vết. Hai chuyện còn lại sẽ trôi qua.', 'You have time to follow one lead. The other two will pass you by.')}
            </p>
            <YearLeadList
              draft={draft}
              char={char}
              disabled={!canConfirm}
              autoFocus={false}
              onPick={(index) => onConfirm(points, ambition, index, apexEligible ? directive : null)}
            />
            {!canConfirm && (
              <p className="year-leads-note">
                {t('Phân đủ 3 ô để chọn manh mối.', 'Assign all three slots to pick a lead.')}
              </p>
            )}
          </div>
        ) : (
          <button
            className="btn btn-primary year-plan-confirm"
            type="button"
            disabled={!canConfirm}
            onClick={() => onConfirm(points, ambition, null, apexEligible ? directive : null)}
          >
            {t('Bắt đầu năm', 'Begin year')}
          </button>
        )}
      </div>
    </section>
  );
}
