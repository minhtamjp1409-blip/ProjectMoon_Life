import React, { useEffect, useState } from 'react';
import { audioEngine } from '../../../engine/audioEngine';
import { useT } from '../../../i18n';
import { useThemeStore } from '../../../store/themeStore';
import { BIRTH_OPENING, birthOpeningCut, prefersReducedMotion } from '../../cutscene/registry';

// The District card that opens a life: the District's letter, its name, the new name, one line of what is happening,
// and a rule that runs out as the card holds. How long it holds comes from the opening's cut (registry BIRTH_OPENING):
// scenes off skip it, reduced motion holds it still at its last line, Full lets it run longer.
// The lines step on four timers and the rule is a CSS transform, so nothing re-renders frame by frame.
const LINE_AT = [0, 0.3, 0.65, 0.9];

export const CityLoadingOverlay = ({ active, region, charName, onComplete }) => {
  const { t } = useT();
  const [stageIndex, setStageIndex] = useState(0);
  const cutsceneMode = useThemeStore((s) => s.cutsceneMode);
  const cut = birthOpeningCut({ setting: cutsceneMode, reduced: prefersReducedMotion() });
  const duration = BIRTH_OPENING.cardMs[cut];

  const lines = region?.id === 'OUTSKIRTS'
    ? [
        t('Ghi lại một ca sinh ngoài bức tường.', 'Recording a birth beyond the wall.'),
        t('Không có District nào ghi tên vào sổ cư trú.', 'No District lists this child as a resident.'),
        t('Đoàn người dựng trại trước khi trời tối.', 'The caravan makes camp before dark.'),
        t('Ánh đèn The City vẫn ở phía bên kia tường.', 'The City lights remain on the other side of the wall.')
      ]
    : [
        t('Ghi lại một ca sinh trong The City.', 'Recording a birth in the City.'),
        t('Xác định District và khu cư trú.', 'Identifying District and residential quarter.'),
        t('Tên mới được ghi vào hồ sơ.', 'A new name enters the record.'),
        t('Cuộc đời bắt đầu.', 'A life begins.')
      ];

  useEffect(() => {
    if (!active) {
      setStageIndex(0);
      return undefined;
    }
    if (!duration) {
      onComplete?.();
      return undefined;
    }
    try {
      audioEngine.playBuff();
    } catch {
      // Audio may be muted
    }
    if (cut === 'still') {
      setStageIndex(3);
      const id = setTimeout(() => onComplete?.(), duration);
      return () => clearTimeout(id);
    }
    setStageIndex(0);
    const timers = LINE_AT.slice(1).map((at, i) => setTimeout(() => setStageIndex(i + 1), at * duration));
    timers.push(setTimeout(() => onComplete?.(), duration + 180));
    return () => timers.forEach(clearTimeout);
  }, [active]);

  if (!active || !duration) return null;

  // Region names already start with their District ("District 8 · H Corp"), so the number is only added when missing
  const districtTitle = region
    ? region.id === 'OUTSKIRTS'
      ? 'The Outskirts'
      : region.ward && !String(region.nameVi).startsWith('District')
        ? `District ${region.ward} · ${region.nameVi}`
        : `${region.nameVi}`
    : 'The City';

  const districtSub = region
    ? region.aliasVi || region.nameEn || 'Khu Vực Bí Ẩn'
    : '26 District';

  return (
    <div
      className={`city-loading-overlay is-${cut}`}
      role="dialog"
      aria-modal="true"
      aria-label={t('Một cuộc đời bắt đầu', 'A life begins')}
      style={{ '--card-ms': `${duration}ms` }}
      onClick={() => onComplete && onComplete()}
    >
      <div className="loading-modal-card">
        <div className="loading-emblem-wrap" aria-hidden="true">
          <div className="loading-emblem-ring" />
          <div className="loading-emblem-core">
            <span className="loading-emblem-letter">{region ? region.id : 'PM'}</span>
          </div>
        </div>

        <h2 className="loading-district-title">{districtTitle}</h2>
        <p className="loading-district-sub">{districtSub}</p>

        {charName && (
          <p className="loading-name-pill">
            <span className="pill-label">{t('Tên:', 'Name:')}</span>
            <span className="pill-name">{charName}</span>
          </p>
        )}

        <div className="loading-terminal-box" role="status" aria-live="polite">
          <p className="loading-terminal-text" key={stageIndex}>
            {lines[stageIndex] || lines[0]}
          </p>
        </div>

        <div className="loading-progress-track" aria-hidden="true">
          <div className="loading-progress-fill" />
        </div>

        <p className="loading-skip-hint">
          {t('Chạm vào bất kỳ đâu để vào ngay', 'Tap anywhere to go straight in')}
        </p>
      </div>
    </div>
  );
};

export default CityLoadingOverlay;
