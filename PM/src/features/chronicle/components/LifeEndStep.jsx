import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, GitBranch } from 'lucide-react';
import { useT } from '../../../i18n';

// A death takes two steps: a short card (who, how old, why), then the full record.
// The legacy is written by the store the moment the character dies, so this is only how the end is shown.
// Special endings are not a death and go straight to the record.
// held: the death scene still plays over the card, so the first button waits for it before taking focus.
export function LifeEndStep({ summary, held = false, onInherit, children }) {
  const { t, lang } = useT();
  const [looked, setLooked] = useState(Boolean(summary.endingId));
  const recordRef = useRef(null);
  const lookRef = useRef(null);
  const key = `${summary.seed}-${summary.age}`;

  // Each new death starts again from the card
  useEffect(() => {
    setLooked(Boolean(summary.endingId));
  }, [key, summary.endingId]);

  useEffect(() => {
    if (!held && !looked) lookRef.current?.focus({ preventScroll: true });
  }, [held, looked, key]);

  useEffect(() => {
    if (looked && !summary.endingId) recordRef.current?.focus({ preventScroll: true });
    if (looked && !summary.endingId) recordRef.current?.scrollIntoView({ block: 'start' });
  }, [looked, summary.endingId]);

  if (looked) {
    return (
      <div ref={recordRef} tabIndex={-1} className="life-end-record" key={key}>
        {children}
      </div>
    );
  }

  const origin = lang === 'en'
    ? `${summary.name}, born in ${summary.birthRegionNameEn || summary.regionNameEn}`
    : `${summary.name}, sinh ra tại ${summary.birthRegionNameVi || summary.regionNameVi}`;

  return (
    <section className="life-end-card" key={key} aria-label={t('Cái chết', 'The end')}>
      <p className="epitaph-kicker-origin">{origin}</p>
      <p className="epitaph-age">
        {summary.age}
        <span>{t('tuổi', 'yrs')}</span>
      </p>
      <p className="epitaph-cause">{lang === 'en' ? summary.deathCauseEn : summary.deathCauseVi}</p>
      <blockquote className="epitaph-poetic-quote">{lang === 'en' ? summary.poeticQuoteEn : summary.poeticQuoteVi}</blockquote>
      <div className="life-end-actions">
        <button type="button" className="btn btn-primary btn-lg" ref={lookRef} onClick={() => setLooked(true)}>
          <BookOpen size={16} />
          {t('Nhìn lại cuộc đời này', 'Look back on this life')}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onInherit}>
          <GitBranch size={16} />
          {t('Kế thừa ngay', 'Continue now')}
        </button>
      </div>
    </section>
  );
}
