import { useEffect, useRef, useState } from 'react';
import {
  AMBITIONS,
  APEX_DIRECTIVES,
  YEAR_ACTIVITIES,
  YEAR_PLAN_POINTS,
  ambitionsFor,
  defaultYearPoints,
  isApexCommander
} from '../../../engine/annualPlan.js';
import { YearLeadList } from './YearLeadDock';
import { useT } from '../../../i18n';

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
        {apexEligible && (
          <fieldset className="year-plan-ambitions" style={{ marginTop: 12 }}>
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
