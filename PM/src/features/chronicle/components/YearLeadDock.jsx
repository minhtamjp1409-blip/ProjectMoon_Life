import { useEffect, useRef } from 'react';
import { interpolateText } from '../../../engine/gameEngine';
import { LIFE_MINORS, isYearLeadUsable, splitTitle } from '../../../engine/yearPlanner';
import { useT } from '../../../i18n';

const TIER = {
  steady: ['Ít rủi ro', 'Lower risk'],
  uncertain: ['Khó đoán', 'Uncertain'],
  danger: ['Nguy hiểm', 'Dangerous']
};

const KEY = {
  health: ['HP', 'HP'], sanity: ['SP', 'SP'], wealth: ['Ahn', 'Ahn'], network: ['Quan hệ', 'Network'], rep: ['Danh tiếng', 'Rep'],
  merit: ['Công trạng', 'Merit'], heat: ['Truy nã', 'Heat'], resonance: ['Cộng hưởng', 'Resonance']
};
const BAD_WHEN_UP = new Set(['heat']);

// Which stats a lead can move either way across all of its answers. Direction only: the size stays a surprise.
function outlook(event) {
  const gain = new Set();
  const cost = new Set();
  const effects = (event?.choices || []).flatMap((choice) => [choice.fx || choice.effects || {}, ...(choice.out || choice.outcomes || []).map((o) => o.fx || o.effects || {})]);
  for (const fx of effects) {
    for (const [key, value] of Object.entries(fx)) {
      if (!KEY[key] || !value) continue;
      ((value > 0) !== BAD_WHEN_UP.has(key) ? gain : cost).add(key);
    }
  }
  return { gain: [...gain].slice(0, 4), cost: [...cost].slice(0, 4) };
}

export function YearLeadDock({ draft, char, onPick }) {
  const { t } = useT();
  const firstOffer = useRef(null);
  const usable = draft.offers.map((offer, index) => ({ offer, index })).filter(({ offer }) => isYearLeadUsable(offer, char));
  useEffect(() => { firstOffer.current?.focus(); }, [draft.age]);
  return (
    <section className="dock year-leads" aria-labelledby="year-leads-title">
      <div className="dock-inner">
        <p className="dock-kicker">{t(`Tuổi ${draft.age}`, `Age ${draft.age}`)}</p>
        <h2 className="dock-title" id="year-leads-title">{t('Ba manh mối', 'Three leads')}</h2>
        <p className="year-leads-intro">{t('Bạn chỉ đủ thời gian theo một dấu vết. Hai chuyện còn lại sẽ trôi qua.', 'You have time to follow one lead. The other two will pass you by.')}</p>
        <div className="year-leads-list">
          {usable.map(({ offer, index }) => {
            const event = LIFE_MINORS.find((entry) => entry.id === offer.id);
            if (!event) return null;
            const vi = splitTitle(interpolateText(event.vi || '', char));
            const en = splitTitle(interpolateText(event.en || '', char));
            const { gain, cost } = outlook(event);
            return (
              <button className={`year-lead is-${offer.tier}`} type="button" key={offer.id} ref={index === usable[0]?.index ? firstOffer : null} onClick={() => onPick(index)}>
                <span className="year-lead-meta"><span>{index + 1}</span><span>{t(...(TIER[offer.tier] || TIER.uncertain))}</span></span>
                <strong>{t(vi.title || vi.body.slice(0, 65), en.title || en.body.slice(0, 65))}</strong>
                <span className="year-lead-copy">{t(vi.body, en.body)}</span>
                <span className="year-lead-outlook">
                  {gain.length > 0 && <span className="is-gain">{t('Có thể được', 'May gain')}: {gain.map((k) => t(...KEY[k])).join(', ')}</span>}
                  {cost.length > 0 && <span className="is-cost">{t('Có thể mất', 'May cost')}: {cost.map((k) => t(...KEY[k])).join(', ')}</span>}
                </span>
              </button>
            );
          })}
          {usable.length === 0 && <button className="year-lead" type="button" ref={firstOffer} onClick={() => onPick(-1)}>{t('Các manh mối đã nguội. Tiếp tục năm nay.', 'The leads have gone cold. Continue this year.')}</button>}
        </div>
        <p className="year-leads-note">{t('Mức nguy hiểm chỉ là dấu hiệu ban đầu; lựa chọn trong sự kiện vẫn quyết định hậu quả.', 'The warning is only a first impression. Your choice inside the event still shapes the outcome.')}</p>
      </div>
    </section>
  );
}
