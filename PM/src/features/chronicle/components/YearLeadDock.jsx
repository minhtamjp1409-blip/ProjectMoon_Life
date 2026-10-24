import { useEffect, useRef } from 'react';
import { interpolateText } from '../../../engine/gameEngine';
import { LIFE_MINORS, splitTitle } from '../../../engine/yearPlanner';
import { useT } from '../../../i18n';
import '../../../styles/yearLeads.css';

const TIER = {
  steady: ['Ít rủi ro', 'Lower risk'],
  uncertain: ['Khó đoán', 'Uncertain'],
  danger: ['Nguy hiểm', 'Dangerous']
};

export function YearLeadDock({ draft, char, onPick }) {
  const { t } = useT();
  const firstOffer = useRef(null);
  useEffect(() => { firstOffer.current?.focus(); }, [draft.age]);
  return (
    <section className="dock year-leads" aria-labelledby="year-leads-title">
      <div className="dock-inner">
        <p className="dock-kicker">{t(`Tuổi ${draft.age}`, `Age ${draft.age}`)}</p>
        <h2 className="dock-title" id="year-leads-title">{t('Ba manh mối', 'Three leads')}</h2>
        <p className="year-leads-intro">{t('Bạn chỉ đủ thời gian theo một dấu vết. Hai chuyện còn lại sẽ trôi qua.', 'You have time to follow one lead. The other two will pass you by.')}</p>
        <div className="year-leads-list">
          {draft.offers.map((offer, index) => {
            const event = LIFE_MINORS.find((entry) => entry.id === offer.id);
            if (!event) return null;
            const vi = splitTitle(interpolateText(event.vi || '', char));
            const en = splitTitle(interpolateText(event.en || '', char));
            return (
              <button className={`year-lead is-${offer.tier}`} type="button" key={offer.id} ref={index === 0 ? firstOffer : null} onClick={() => onPick(index)}>
                <span className="year-lead-meta"><span>{index + 1}</span><span>{t(...TIER[offer.tier])}</span></span>
                <strong>{t(vi.title || vi.body.slice(0, 65), en.title || en.body.slice(0, 65))}</strong>
                <span className="year-lead-copy">{t(vi.body, en.body)}</span>
              </button>
            );
          })}
        </div>
        <p className="year-leads-note">{t('Mức nguy hiểm chỉ là dấu hiệu ban đầu; lựa chọn trong sự kiện vẫn quyết định hậu quả.', 'The warning is only a first impression. Your choice inside the event still shapes the outcome.')}</p>
      </div>
    </section>
  );
}
