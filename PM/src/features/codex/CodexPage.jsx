import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CODEX_RECORDS, CODEX_CATEGORIES } from '../../data/worldData';
import { useT } from '../../i18n';
import PageBanner from '../../components/PageBanner';

const TIER_LABELS = {
  common: ['Phổ biến', 'Common'],
  uncommon: ['Khá hiếm', 'Uncommon'],
  rare: ['Hiếm', 'Rare'],
  epic: ['Sử thi', 'Epic'],
  legend: ['Truyền thuyết', 'Legendary'],
  myth: ['Huyền thoại', 'Mythic'],
  miracle: ['Thần tích', 'Miracle']
};

const progressOf = (char, key) => {
  const contracts = char?.contractRecord || {};
  const clears = char?.dungeonRecord?.clears || [];
  const goals = {
    life_eighty: [char?.age || 0, 80], life_century: [char?.age || 0, 100],
    three_requests: [contracts.fixer || 0, 3], ten_requests: [contracts.fixer || 0, 10],
    five_finger_jobs: [Math.max(0, ...Object.values(contracts.fingers || {})), 5],
    independent_five_jobs: [contracts.independent || 0, 5],
    wing_five_assignments: [contracts.wing || 0, 5],
    dungeon_first_clear: [clears.length, 1], dungeon_three_clear: [clears.length, 3],
    dungeon_five_places: [new Set(clears.map((clear) => clear.id)).size, 5]
  };
  return goals[key] || null;
};

const stripCount = (label) => label.replace(/\s*\(\d+\)\s*$/, '');

export const CodexPage = () => {
  const { t, lang, bilingual } = useT();
  const { globalCodex, char, inRun } = useGameStore();
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');

  const unlockedCount = CODEX_RECORDS.filter((r) => globalCodex.includes(r.key)).length;
  const total = CODEX_RECORDS.length;
  const pct = Math.round((unlockedCount / total) * 100);

  const inCategory = CODEX_RECORDS.filter((r) => category === 'all' || r.category === category);
  const records = inCategory.filter((r) => {
    if (filter === 'unlocked') return globalCodex.includes(r.key);
    if (filter === 'locked') return !globalCodex.includes(r.key);
    return true;
  });
  const catUnlocked = inCategory.filter((r) => globalCodex.includes(r.key)).length;

  return (
    <div className="page">
      <PageBanner
        tag="LOBOTOMY_CORP // CODEX_CLASSIFICATION"
        title={t('Thành tựu', 'Codex')}
        sub={t(`Đã mở ${unlockedCount} / ${total} cột mốc`, `${unlockedCount} of ${total} milestones unlocked`)}
      />

      <div className="panel" style={{ padding: '16px 20px', marginBottom: 16 }}>
        <div className="bar is-accent" style={{ height: 6 }} role="progressbar" aria-valuenow={unlockedCount} aria-valuemin={0} aria-valuemax={total}>
          <i style={{ width: `${pct}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 }} className="muted num">
          <span>
            {unlockedCount} {t('đã mở', 'unlocked')} · {pct}%
          </span>
          <span>
            {total} {t('cột mốc', 'milestones')}
          </span>
        </div>
      </div>

      <div className="tabs" role="tablist">
        {CODEX_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            className={category === c.id ? 'is-on' : ''}
            onClick={() => setCategory(c.id)}
          >
            {stripCount(lang === 'en' ? c.en : c.vi)}
          </button>
        ))}
      </div>

      <section className="panel" style={{ marginTop: 16 }}>
        <div className="toolbar">
          <span className="muted num" style={{ fontSize: 14 }}>
            {catUnlocked} / {inCategory.length} {t('đã mở trong nhóm này', 'unlocked in this group')}
          </span>
          <div className="seg" role="group" aria-label={t('Lọc', 'Filter')}>
            {[
              { v: 'all', vi: 'Tất cả', en: 'All' },
              { v: 'unlocked', vi: 'Đã đạt', en: 'Unlocked' },
              { v: 'locked', vi: 'Chưa đạt', en: 'Locked' }
            ].map((o) => (
              <button key={o.v} type="button" className={filter === o.v ? 'is-on' : ''} onClick={() => setFilter(o.v)}>
                {t(o.vi, o.en)}
              </button>
            ))}
          </div>
        </div>

        {records.length === 0 ? (
          <div style={{ padding: '0 20px 20px' }}>
            <p className="empty">
              {filter === 'unlocked'
                ? t('Chưa mở cột mốc nào trong nhóm này.', 'Nothing unlocked in this group yet.')
                : t('Bạn đã mở hết cột mốc trong nhóm này.', 'Every milestone in this group is unlocked.')}
            </p>
          </div>
        ) : (
          <div className="grid-2" style={{ gap: 0 }}>
            {records.map((rec) => {
              const unlocked = globalCodex.includes(rec.key);
              const progress = inRun && !unlocked ? progressOf(char, rec.key) : null;
              return (
                <div key={rec.key} className={`record ${unlocked ? '' : 'is-locked'}`} style={{ borderTop: '1px solid var(--rule)' }}>
                  <div style={{ minWidth: 0 }}>
                    <div className="record-name">{lang === 'en' ? rec.en : rec.vi}</div>
                    {bilingual && <div className="record-sub">{rec.en}</div>}
                    <div className="record-sub" style={{ marginTop: 4 }}>
                      {lang === 'en' ? rec.hintEn || rec.hintVi : rec.hintVi}
                    </div>
                    {progress && <div className="record-sub" aria-label={t(`Tiến độ đời này: ${Math.min(progress[0], progress[1])} trên ${progress[1]}`, `This life's progress: ${Math.min(progress[0], progress[1])} of ${progress[1]}`)}>
                      {t('Đời này', 'This life')}: {Math.min(progress[0], progress[1])}/{progress[1]}
                    </div>}
                  </div>
                  <div className="record-status" style={{ display: 'grid', justifyItems: 'end', gap: 6 }}>
                    <span className="pill">{TIER_LABELS[rec.tier]?.[lang === 'en' ? 1 : 0] || rec.tier}</span>
                    <span style={{ fontSize: 13, color: unlocked ? 'var(--good)' : 'var(--faint)' }}>
                      {unlocked ? t('Đã đạt', 'Unlocked') : t('Chưa mở', 'Locked')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default CodexPage;
