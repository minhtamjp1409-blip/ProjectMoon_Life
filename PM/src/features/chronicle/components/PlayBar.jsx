import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, Modal, Dropdown } from 'antd';
import { User, Play, Pause, SkipForward, Bot, RotateCcw, House, Save, Check, Volume2, VolumeX, MoreHorizontal, BookOpen, GitFork, Trophy, Compass, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../../../store/gameStore';
import { useThemeStore } from '../../../store/themeStore';
import { SEASONS, getNextCareerMilestone } from '../../../engine/gameEngine';
import { WorkshopDepotModal } from './WorkshopDepotModal';
import { ShoppingBag } from 'lucide-react';
import { nextPlanItem } from '../../../engine/yearPlanner';
import { DRAMA_PHASES } from '../../../engine/weaverAI';
import { audioEngine } from '../../../engine/audioEngine';
import { useT } from '../../../i18n';

const SPEEDS = [
  { spd: 1, secs: 30 },
  { spd: 2, secs: 15 },
  { spd: 3, secs: 10 }
];

const isWaiting = (s) => Boolean(s?.char?.pendingEvent || s?.char?.pendingContract || s?.char?.pendingModal || s?.activeResolution || (s?.postChoicePauseMs > 0));
const isRunning = (s) => s.inRun && s.char?.alive && s.speed > 0 && !isWaiting(s);

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
      <div className="yearbar-quarter-ticks" aria-hidden="true">
        <span className="tick tick-25" title="Summer (25%)" />
        <span className="tick tick-50" title="Autumn (50%)" />
        <span className="tick tick-75" title="Winter (75%)" />
      </div>
    </div>
  );
};

// Re-renders only when the whole-second count changes
const YearStatus = () => {
  const { t } = useT();
  const status = useGameStore((s) => {
    if (!s.char?.alive) return 'dead';
    if (s.postChoicePauseMs > 0) return `reading_${Math.ceil(s.postChoicePauseMs / 1000)}`;
    if (s.activeResolution) return 'resolution';
    if (isWaiting(s)) return 'wait';
    if (s.char.pendingMinor) return 'minor';
    if (s.speed === 0) return 'pause';
    return Math.max(0, Math.ceil(((100 - s.yearProgress) / 100) * (30 / s.speed)));
  });
  if (status === 'dead') return <span>{t('Kiếp sống đã khép lại', 'This life has ended')}</span>;
  if (typeof status === 'string' && status.startsWith('reading_')) {
    const sec = status.split('_')[1];
    return <span style={{ color: 'var(--good)' }}>{t(`Kết quả vừa lưu · Tiếp tục sau ${sec}s`, `Result logged · Resuming in ${sec}s`)}</span>;
  }
  if (status === 'resolution') return <span style={{ color: 'var(--good)' }}>{t('Đang xem kết quả quyết định', 'Reviewing outcome')}</span>;
  if (status === 'wait') return <span style={{ color: 'var(--accent)' }}>{t('Đang chờ bạn quyết định', 'Waiting for your decision')}</span>;
  if (status === 'minor') return <span style={{ color: 'var(--accent)' }}>{t('Một lựa chọn đang chờ', 'A choice is waiting')}</span>;
  if (status === 'pause') return <span>{t('Tạm dừng', 'Paused')}</span>;
  return <span className="num">{t(`Sang năm sau ${status} giây`, `Next year in ${status}s`)}</span>;
};

export const PlayBar = () => {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const { themeMode, toggleTheme, setMobileDossierOpen } = useThemeStore();
  const char = useGameStore((s) => s.char);
  const milestone = getNextCareerMilestone(char);
  const { age, seasonIdx, yearProgress, dramaPhase, alive, waiting, speed, autoPlay, setSpeed, toggleAutoPlay, stepYear, exitToSetup, abandonRun, saveRun, lastSavedAt } =
    useGameStore(
      useShallow((s) => ({
        age: s.char.age,
        seasonIdx: s.char.seasonIdx,
        yearProgress: s.yearProgress,
        dramaPhase: s.char.weaver?.dramaPhase,
        alive: s.char.alive,
        waiting: isWaiting(s) || Boolean(s.char.pendingMinor),
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

  const openArchive = (path) => {
    audioEngine.playClick();
    if (alive) saveRun(true);
    navigate(path);
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

  // Determine whether the next click advances to an upcoming event, the next season, or the new year
  const nextItem = nextPlanItem(char);
  const curSeasonIdx = Math.min(3, Math.floor(((yearProgress || 0) + 0.1) / 25));
  const nextSeasonBoundary = Math.min(100, (curSeasonIdx + 1) * 25);
  const itemP = nextItem ? nextItem.t * 100 : null;
  const isNextEvent = itemP !== null && itemP > (yearProgress || 0) + 0.2 && itemP <= nextSeasonBoundary;
  const isNextYear = !isNextEvent && nextSeasonBoundary >= 100;

  const nextSeasonObj = SEASONS[Math.min(3, curSeasonIdx + 1)];
  const stepLabel = isNextEvent
    ? t('Sự kiện tiếp', 'Next Event')
    : isNextYear
    ? t('Qua năm', 'Next Year')
    : t('Qua mùa', 'Next Season');

  const stepTitle = isNextEvent
    ? t('Chuyển đến sự kiện tiếp theo trong mùa', 'Skip to next scheduled event in this season')
    : isNextYear
    ? t('Hoàn tất năm hiện tại và bước sang năm mới', 'Conclude year and enter next year')
    : t(`Chuyển sang ${nextSeasonObj?.vi || 'mùa tiếp'}`, `Skip to ${nextSeasonObj?.en || 'next season'}`);

  const cycleSpeed = () => {
    audioEngine.playClick();
    const next = speed === 1 ? 2 : (speed === 2 ? 3 : 1);
    handleSetSpeed(next);
  };

  const menuItems = [
    {
      key: 'autoplay',
      icon: <Bot size={16} />,
      label: (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          <span>{autoPlay ? t('Tắt tự động chọn', 'Disable auto-pick') : t('Bật tự động chọn', 'Enable auto-pick')}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: autoPlay ? 'var(--good)' : 'var(--muted)' }}>
            {autoPlay ? t('BẬT', 'ON') : t('TẮT', 'OFF')}
          </span>
        </span>
      ),
      onClick: handleToggleAutoPlay
    },
    {
      key: 'shop',
      icon: <ShoppingBag size={16} color="var(--accent)" />,
      label: (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          <span>{t('Xưởng Workshop & Chợ Đen', 'Workshop & Black Market')}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>
            {char.stats?.wealth ?? char.wealth ?? 0} Ahn
          </span>
        </span>
      ),
      onClick: () => setShopOpen(true)
    },
    {
      key: 'audio',
      icon: audioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />,
      label: (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          <span>{audioMuted ? t('Bật âm thanh', 'Unmute audio') : t('Tắt âm thanh', 'Mute audio')}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: !audioMuted ? 'var(--good)' : 'var(--muted)' }}>
            {!audioMuted ? t('BẬT', 'ON') : t('TẮT', 'OFF')}
          </span>
        </span>
      ),
      onClick: handleToggleAudio
    },
    {
      key: 'theme',
      icon: themeMode === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
      label: themeMode === 'dark' ? t('Giao diện Sáng', 'Light Theme') : t('Giao diện Tối', 'Dark Theme'),
      onClick: toggleTheme
    },
    {
      type: 'divider'
    },
    {
      key: 'world',
      icon: <Compass size={16} />,
      label: t('Hồ sơ thế giới', 'World Archive'),
      onClick: () => openArchive('/glossary')
    },
    {
      key: 'bloodline',
      icon: <GitFork size={16} />,
      label: t('Gia phả & Di sản', 'Bloodline & Legacy'),
      onClick: () => openArchive('/bloodline')
    },
    {
      key: 'codex',
      icon: <Trophy size={16} />,
      label: t('Thành tựu & Điềm báo', 'Codex & Achievements'),
      onClick: () => openArchive('/codex')
    },
    {
      key: 'weaver',
      icon: <BookOpen size={16} />,
      label: t('Khung cửi số phận', 'Fate Loom (Weaver AI)'),
      onClick: () => openArchive('/weaver-ai')
    },
    {
      type: 'divider'
    },
    {
      key: 'dossier',
      icon: <User size={16} />,
      label: t('Hồ sơ nhân vật chi tiết', 'Character Dossier'),
      onClick: () => setMobileDossierOpen(true)
    },
    {
      type: 'divider'
    },
    {
      key: 'save',
      icon: justSaved ? <Check size={16} style={{ color: 'var(--good)' }} /> : <Save size={16} />,
      label: justSaved ? t('Đã lưu thành công!', 'Saved!') : t('Lưu tiến trình', 'Save game'),
      disabled: !alive,
      onClick: () => saveRun(true)
    },
    {
      key: 'home',
      icon: <House size={16} />,
      label: t('Về trang chủ', 'Go Home'),
      onClick: goHome
    },
    {
      key: 'restart',
      danger: true,
      icon: <RotateCcw size={16} />,
      label: t('Bỏ kiếp này', 'Abandon life'),
      onClick: newLife
    }
  ];

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
          {milestone && milestone.progressPct < 100 && (
            <Tooltip
              title={`${lang === 'en' ? milestone.titleEn : milestone.titleVi} (${milestone.progressPct}%) · ${lang === 'en' ? milestone.tipEn : milestone.tipVi}`}
            >
              <span className="career-obj-pill">
                <span className="obj-text">{lang === 'en' ? milestone.titleEn : milestone.titleVi}</span>
                <b className="obj-pct">{milestone.progressPct}%</b>
              </span>
            </Tooltip>
          )}
          <Tooltip title={phase.descVi}>
            <span className="phase">{phase.labelEn || phase.labelVi}</span>
          </Tooltip>
        </div>
      </div>

      <div className="playbar-controls">
        <button
          type="button"
          className={`icon-btn play-pause-btn ${speed === 0 && alive ? 'is-on' : ''}`}
          disabled={!alive}
          onClick={() => {
            if (useGameStore.getState().postChoicePauseMs > 0) {
              useGameStore.getState().clearPostChoicePause();
            }
            handleSetSpeed(speed === 0 ? 1 : 0);
          }}
          aria-label={speed === 0 ? t('Tiếp tục (Space)', 'Resume (Space)') : t('Tạm dừng (Space)', 'Pause (Space)')}
          title={speed === 0 ? t('Tiếp tục (Space)', 'Resume (Space)') : t('Tạm dừng (Space)', 'Pause (Space)')}
        >
          {speed === 0 ? <Play size={18} /> : <Pause size={18} />}
        </button>

        {/* Speed button group on desktop */}
        <div className="speeds playbar-desktop-speeds" role="group" aria-label={t('Tốc độ', 'Speed')}>
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

        {/* Single speed cycle button on mobile */}
        <button
          type="button"
          className="btn-speed-mobile"
          disabled={!alive}
          onClick={cycleSpeed}
          title={t('Bấm để đổi tốc độ (1x/2x/3x)', 'Tap to cycle speed (1x/2x/3x)')}
        >
          {speed || 1}×
        </button>

        <span className="divider" />

        <button
          type="button"
          className="btn btn-step-season"
          disabled={!alive || waiting}
          onClick={handleStepYear}
          title={stepTitle}
        >
          <SkipForward size={16} />
          <span>{stepLabel}</span>
        </button>

        {/* Desktop secondary utilities (Bot, Mute, Save, Home, Restart) */}
        <div className="playbar-desktop-actions">
        <Tooltip title={t('Mở Xưởng Workshop & Chợ Đen để mua vũ khí / vật phẩm', 'Open Workshop & Black Market to purchase gear')}>
          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={() => setShopOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 10px', height: 32, borderColor: 'rgba(212, 175, 55, 0.3)' }}
          >
            <ShoppingBag size={14} color="var(--accent)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>
              {char.stats?.wealth ?? char.wealth ?? 0} Ahn
            </span>
          </button>
        </Tooltip>
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

        {/* Mobile Shop quick button */}
        <button
          type="button"
          className="btn-shop-mobile"
          onClick={() => setShopOpen(true)}
          title={t('Xưởng Workshop & Chợ Đen', 'Workshop & Market')}
          aria-label={t('Xưởng Workshop & Chợ Đen', 'Workshop & Market')}
        >
          <ShoppingBag size={18} color="var(--accent)" />
        </button>

        {/* Mobile More dropdown menu (pops up from bottom bar) */}
        <div className="playbar-mobile-more">
          <Dropdown menu={{ items: menuItems }} placement="topRight" trigger={['click']}>
            <button 
              type="button" 
              className="icon-btn" 
              aria-label={t('Thao tác khác', 'More options')}
            >
              <MoreHorizontal size={18} />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default PlayBar;
