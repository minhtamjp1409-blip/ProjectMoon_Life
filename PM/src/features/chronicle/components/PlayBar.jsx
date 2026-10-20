import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, Modal } from 'antd';
import { Play, Pause, SkipForward, Bot, RotateCcw, House, Save, Check, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../../../store/gameStore';
import { SEASONS } from '../../../engine/gameEngine';
import { DRAMA_PHASES } from '../../../engine/weaverAI';
import { audioEngine } from '../../../engine/audioEngine';
import { useT } from '../../../i18n';

const SPEEDS = [
  { spd: 1, secs: 30 },
  { spd: 2, secs: 15 },
  { spd: 3, secs: 10 }
];

const isWaiting = (c) => Boolean(c.pendingEvent || c.pendingContract || c.pendingModal);
const isRunning = (s) => s.inRun && s.char.alive && s.speed > 0 && !isWaiting(s.char);

/*
 * The store advances yearProgress in 200ms steps. Drawing those steps makes the bar
 * stutter, so the fill is painted every animation frame instead: it extrapolates from
 * the last stored value at the current speed, never moves backwards within a year,
 * and writes a transform straight to the DOM without re-rendering React.
 */
const YearTrack = () => {
  const fillRef = useRef(null);
  const paused = useGameStore((s) => !isRunning(s));

  useEffect(() => {
    let anchorP = useGameStore.getState().yearProgress;
    let anchorT = performance.now();
    let shown = anchorP;
    let frame = 0;

    const unsub = useGameStore.subscribe((s, prev) => {
      if (s.yearProgress !== prev.yearProgress || s.speed !== prev.speed) {
        anchorP = s.yearProgress;
        anchorT = performance.now();
        if (s.yearProgress < shown - 5) shown = s.yearProgress; // a new year began
      }
    });

    const paint = (now) => {
      const s = useGameStore.getState();
      if (!s.char.alive) shown = 100;
      else if (s.char.pendingMinor) {
        // Time creeps on at 1× while a small choice waits; follow the store exactly
        shown = Math.max(shown, s.yearProgress);
      } else if (isRunning(s)) {
        const est = anchorP + ((now - anchorT) / (30000 / s.speed)) * 100;
        shown = Math.min(100, Math.max(shown, est));
      } else {
        shown = s.yearProgress;
        anchorP = s.yearProgress;
        anchorT = now;
      }
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${shown / 100})`;
      frame = requestAnimationFrame(paint);
    };
    frame = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frame);
      unsub();
    };
  }, []);

  return (
    <div className={`yearbar-track ${paused ? 'is-paused' : ''}`}>
      <div className="yearbar-fill" ref={fillRef} />
    </div>
  );
};

// Re-renders only when the whole-second count changes
const YearStatus = () => {
  const { t } = useT();
  const status = useGameStore((s) => {
    if (!s.char.alive) return 'dead';
    if (isWaiting(s.char)) return 'wait';
    if (s.char.pendingMinor) return 'minor';
    if (s.speed === 0) return 'pause';
    return Math.max(0, Math.ceil(((100 - s.yearProgress) / 100) * (30 / s.speed)));
  });
  if (status === 'dead') return <span>{t('Kiếp sống đã khép lại', 'This life has ended')}</span>;
  if (status === 'wait') return <span style={{ color: 'var(--accent)' }}>{t('Đang chờ bạn quyết định', 'Waiting for your decision')}</span>;
  if (status === 'minor') return <span style={{ color: 'var(--accent)' }}>{t('Một lựa chọn đang chờ', 'A choice is waiting')}</span>;
  if (status === 'pause') return <span>{t('Tạm dừng', 'Paused')}</span>;
  return <span className="num">{t(`Sang năm sau ${status} giây`, `Next year in ${status}s`)}</span>;
};

export const PlayBar = () => {
  const { t } = useT();
  const navigate = useNavigate();
  const { age, seasonIdx, dramaPhase, alive, waiting, speed, autoPlay, setSpeed, toggleAutoPlay, stepYear, exitToSetup, abandonRun, saveRun, lastSavedAt } =
    useGameStore(
      useShallow((s) => ({
        age: s.char.age,
        seasonIdx: s.char.seasonIdx,
        dramaPhase: s.char.weaver?.dramaPhase,
        alive: s.char.alive,
        waiting: isWaiting(s.char) || Boolean(s.char.pendingMinor),
        speed: s.speed,
        autoPlay: s.autoPlay,
        setSpeed: s.setSpeed,
        toggleAutoPlay: s.toggleAutoPlay,
        stepYear: s.stepYear,
        exitToSetup: s.exitToSetup,
        abandonRun: s.abandonRun,
        saveRun: s.saveRun,
        lastSavedAt: s.lastSavedAt
      }))
    );

  const [justSaved, setJustSaved] = React.useState(false);
  const [audioMuted, setAudioMuted] = React.useState(audioEngine.isMuted);

  React.useEffect(() => {
    return audioEngine.subscribe(({ isMuted }) => {
      setAudioMuted(isMuted);
    });
  }, []);

  const handleToggleAudio = () => {
    const next = audioEngine.toggleMute();
    setAudioMuted(next);
  };

  React.useEffect(() => {
    if (!lastSavedAt) return undefined;
    setJustSaved(true);
    const timer = setTimeout(() => setJustSaved(false), 1600);
    return () => clearTimeout(timer);
  }, [lastSavedAt]);

  const handleSetSpeed = (newSpeed) => {
    audioEngine.playClick();
    setSpeed(newSpeed);
  };

  const handleStepYear = () => {
    audioEngine.playYearTick();
    stepYear();
  };

  const handleToggleAutoPlay = () => {
    audioEngine.playClick();
    toggleAutoPlay();
  };

  const goHome = () => {
    audioEngine.playClick();
    exitToSetup();
    navigate('/');
  };

  const newLife = () => {
    audioEngine.playClick();
    if (!alive) {
      abandonRun();
      return;
    }
    Modal.confirm({
      title: t('Bỏ kiếp sống này?', 'Abandon this life?'),
      content: t('Tiến trình hiện tại sẽ bị xóa. Muốn giữ lại thì dùng nút Về trang chủ: game tự lưu.', 'Current progress will be deleted. To keep it, use Home instead: the game saves itself.'),
      okText: t('Bỏ và bắt đầu lại', 'Abandon and restart'),
      cancelText: t('Chơi tiếp', 'Keep playing'),
      okButtonProps: { danger: true },
      onOk: abandonRun
    });
  };

  const season = SEASONS[seasonIdx];
  const phase = DRAMA_PHASES[dramaPhase] || DRAMA_PHASES.INCUBATION;

  return (
    <div className="playbar">
      <div className="playbar-age">
        <b>{age}</b>
        <span>
          {t('tuổi', 'yrs')} · {t(season?.vi, season?.en)}
        </span>
      </div>

      <div className="yearbar" aria-label={t('Tiến độ năm', 'Year progress')}>
        <YearTrack />
        <div className="yearbar-meta">
          <YearStatus />
          <Tooltip title={phase.descVi}>
            <span className="phase">{phase.labelEn || phase.labelVi}</span>
          </Tooltip>
        </div>
      </div>

      <div className="playbar-controls">
        <button
          type="button"
          className={`icon-btn ${speed === 0 && alive ? 'is-on' : ''}`}
          disabled={!alive}
          onClick={() => handleSetSpeed(speed === 0 ? 1 : 0)}
          aria-label={speed === 0 ? t('Tiếp tục (Space)', 'Resume (Space)') : t('Tạm dừng (Space)', 'Pause (Space)')}
          title={speed === 0 ? t('Tiếp tục (Space)', 'Resume (Space)') : t('Tạm dừng (Space)', 'Pause (Space)')}
        >
          {speed === 0 ? <Play size={18} /> : <Pause size={18} />}
        </button>

        <div className="speeds" role="group" aria-label={t('Tốc độ', 'Speed')}>
          {SPEEDS.map((s) => (
            <button
              key={s.spd}
              type="button"
              className={speed === s.spd ? 'is-on' : ''}
              aria-pressed={speed === s.spd}
              disabled={!alive}
              onClick={() => handleSetSpeed(s.spd)}
              title={t(`${s.secs} giây mỗi năm`, `${s.secs}s per year`)}
            >
              {s.spd}×
            </button>
          ))}
        </div>

        <span className="divider" />

        <button
          type="button"
          className="btn"
          disabled={!alive || waiting}
          onClick={handleStepYear}
          title={t('Sang năm tiếp theo ngay', 'Skip to next year')}
        >
          <SkipForward size={16} />
          {t('+1 năm', '+1 year')}
        </button>

        <button
          type="button"
          className={`icon-btn ${autoPlay ? 'is-on' : ''}`}
          aria-pressed={autoPlay}
          aria-label={t('Tự động chọn', 'Auto-pick')}
          title={t('Tự chọn phương án đầu khi có sự kiện', 'Pick the first option automatically')}
          onClick={handleToggleAutoPlay}
        >
          <Bot size={18} />
        </button>

        <button
          type="button"
          className={`icon-btn ${audioMuted ? '' : 'is-on'}`}
          onClick={handleToggleAudio}
          aria-label={audioMuted ? t('Bật âm thanh (phím M)', 'Unmute audio (M key)') : t('Tắt âm thanh (phím M)', 'Mute audio (M key)')}
          title={audioMuted ? t('Bật âm thanh (M)', 'Unmute audio (M)') : t('Tắt âm thanh (M)', 'Mute audio (M)')}
        >
          {audioMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>

        <button type="button" className="icon-btn" onClick={() => saveRun(true)} disabled={!alive} aria-label={t('Lưu tiến trình', 'Save progress')} title={t('Lưu tiến trình (game cũng tự lưu)', 'Save progress (the game also autosaves)')}>
          {justSaved ? <Check size={17} style={{ color: 'var(--good)' }} /> : <Save size={17} />}
        </button>
        <button type="button" className="icon-btn" onClick={goHome} aria-label={t('Về trang chủ', 'Home')} title={t('Về trang chủ (tiến trình được giữ lại)', 'Home (progress is kept)')}>
          <House size={17} />
        </button>
        <button type="button" className="icon-btn" onClick={newLife} aria-label={t('Kiếp sống mới', 'New life')} title={t('Bỏ kiếp này, bắt đầu kiếp mới', 'Abandon this life and start anew')}>
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
};

export default PlayBar;
