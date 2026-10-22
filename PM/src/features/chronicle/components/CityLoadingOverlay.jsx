import React, { useEffect, useState, useRef } from 'react';
import { Compass, Sparkles, Shield, Eye, Flame } from 'lucide-react';
import { audioEngine } from '../../../engine/audioEngine';
import { useT } from '../../../i18n';

export const CityLoadingOverlay = ({ active, region, charName, seed, onComplete }) => {
  const { t } = useT();
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const timerRef = useRef(null);

  const telemetryLines = region?.id === 'OUTSKIRTS'
    ? [
        t('Ghi lại một ca sinh ngoài bức tường...', 'Recording a birth beyond the wall...'),
        t('Không có District nào ghi tên vào sổ cư trú.', 'No District lists this child as a resident.'),
        t('Đoàn người dựng trại trước khi trời tối.', 'The caravan makes camp before dark.'),
        t('Ánh đèn The City vẫn ở phía bên kia tường.', 'The City lights remain on the other side of the wall.')
      ]
    : [
        t('Ghi lại một ca sinh trong The City...', 'Recording a birth in the City...'),
        t('Xác định District và khu cư trú.', 'Identifying District and residential quarter.'),
        t('Tên mới được ghi vào hồ sơ.', 'A new name enters the record.'),
        t('Cuộc đời bắt đầu.', 'A life begins.')
      ];

  useEffect(() => {
    if (!active) {
      setProgress(0);
      setStageIndex(0);
      return;
    }

    try {
      audioEngine.playBuff();
    } catch {
      // Audio may be muted
    }

    const startTime = performance.now();
    const duration = 1500; // 1.5 seconds loading time

    const updateFrame = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) setStageIndex(0);
      else if (pct < 65) setStageIndex(1);
      else if (pct < 90) setStageIndex(2);
      else setStageIndex(3);

      if (pct < 100) {
        timerRef.current = requestAnimationFrame(updateFrame);
      } else {
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 180);
      }
    };

    timerRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [active]);

  if (!active) return null;

  const districtTitle = region
    ? region.id === 'OUTSKIRTS'
      ? 'The Outskirts'
      : region.ward
        ? `District ${region.ward} · ${region.nameVi}`
        : `${region.nameVi}`
    : 'The City';

  const districtSub = region
    ? region.aliasVi || region.nameEn || 'Khu Vực Bí Ẩn'
    : '26 District';

  return (
    <div
      className="city-loading-overlay"
      role="dialog"
      aria-modal="true"
      onClick={() => onComplete && onComplete()}
    >
      <div className="loading-scanlines" aria-hidden="true" />
      <div className="loading-vignette" aria-hidden="true" />

      <div className="loading-modal-card">
        {/* District Crest Emblem */}
        <div className="loading-emblem-wrap">
          <div className="loading-emblem-ring" />
          <div className="loading-emblem-core">
            <span className="loading-emblem-letter">{region ? region.id : 'PM'}</span>
          </div>
          <Sparkles className="loading-sparkle sparkle-1" size={16} />
          <Sparkles className="loading-sparkle sparkle-2" size={14} />
        </div>

        {/* Header tags */}
        <div className="loading-header-tag">
          <Eye size={13} className="text-accent" />
          <span>{t('GHI NHẬN HỒ SƠ SINH MỆNH MỚI', 'NEW LIFE REGISTRATION PROTOCOL')}</span>
        </div>

        <h2 className="loading-district-title">{districtTitle}</h2>
        <p className="loading-district-sub">{districtSub}</p>

        {charName && (
          <div className="loading-name-pill">
            <span className="pill-label">{t('Định danh:', 'Identity:')}</span>
            <span className="pill-name">{charName}</span>
          </div>
        )}

        {/* Telemetry terminal line */}
        <div className="loading-terminal-box">
          <p className="loading-terminal-text" key={stageIndex}>
            <span className="terminal-prefix">&gt; </span>
            {telemetryLines[stageIndex] || telemetryLines[0]}
          </p>
        </div>

        {/* Golden Progress Bar */}
        <div className="loading-progress-wrap">
          <div className="loading-progress-track">
            <div className="loading-progress-fill" style={{ width: `${progress}%` }}>
              <div className="loading-progress-glow" />
            </div>
          </div>
          <div className="loading-progress-meta">
            <span className="meta-sync">{t('Đang đồng bộ...', 'Synchronizing...')}</span>
            <span className="meta-pct">{progress}%</span>
          </div>
        </div>

        <p className="loading-skip-hint">
          {t('Nhấp chuột bất kỳ đâu để vào ngay [Bỏ qua]', 'Click anywhere to enter immediately [Skip]')}
        </p>
      </div>
    </div>
  );
};

export default CityLoadingOverlay;
