import React, { useRef, useState, useEffect } from 'react';
import { localizeEnsembleName } from '../../../data/ensembleNames.js';
import { Dices, GitBranch, Play, ChevronDown, ArrowUpRight, Search, BookOpen, MapPin } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Modal } from 'antd';
import { useGameStore } from '../../../store/gameStore';
import { freshSeed, createRNG, rollBirthRegion } from '../../../engine/gameEngine';
import { REGIONS, CODEX_RECORDS } from '../../../data/worldData';
import { FATE_OMENS } from '../../../engine/weaverAI';
import { useT } from '../../../i18n';
import { RegionMark } from '../../../components/RegionMark';
import { audioEngine } from '../../../engine/audioEngine';
import CityLoadingOverlay from './CityLoadingOverlay';
import { reducedMotion } from '../../../utils/motion';
import { useThemeStore } from '../../../store/themeStore';

const CAREERS = [
  [
    'Fixer',
    'Nhận Request, tìm một Office và vươn lên qua từng Grade. Hana chỉ trao Color cho những người còn sống để chứng minh mình.',
    'Take Requests, join an Office and rise through the Grades. Only those who survive can earn a Color from Hana.'
  ],
  [
    'The Five Fingers',
    'Sống theo luật của Thumb, Index, Middle, Ring hoặc Pinky. Sự trung thành luôn đi kèm một cái giá.',
    'Live by the laws of the Thumb, Index, Middle, Ring or Pinky. Loyalty always carries a price.'
  ],
  [
    'Wing Employee',
    'Một chỗ trong Nest, một công việc gắn với Singularity. Sự an toàn kéo dài chừng nào bạn còn hữu dụng.',
    'A place in a Nest and a job serving a Singularity. Safety lasts as long as you remain useful.'
  ]
];

const WHEEL_SECTORS = REGIONS.filter((r) => r.id !== 'OUTSKIRTS');
const SECTOR_DEG = 360 / WHEEL_SECTORS.length;
const hubName = (r) => (r ? (r.id === 'OUTSKIRTS' ? 'Outskirts' : `${r.id} Corp`) : 'The City');
const hubCaption = (r, t) =>
  r ? (r.ward ? `District ${r.ward}` : t('Ngoài bức tường', 'Beyond the wall')) : t('26 District · một kiếp sống', '26 Districts · one life');
// Which sector sits under the needle at 12 o'clock for a given wheel rotation
const sectorUnderNeedle = (deg) => WHEEL_SECTORS[Math.floor((((-deg % 360) + 360) % 360) / SECTOR_DEG) % WHEEL_SECTORS.length];

function DistrictDial({ selected, onSelect, isSpinning, rotation, displayRegion, onTriggerSpin, spinnerRef, nameRef, captionRef, t }) {
  const sectors = WHEEL_SECTORS;
  const point = (radius, angle) => [180 + radius * Math.cos(angle), 180 + radius * Math.sin(angle)];
  const region = displayRegion || REGIONS.find((r) => r.id === selected);

  return (
    <div className="district-dial-container">
      <div className={`district-dial ${isSpinning ? 'is-spinning' : ''}`}>
        <svg viewBox="0 0 360 360" aria-label={t('Chọn một District', 'Choose a District')}>
          {/* Static outer ring & mid ring */}
          <circle cx="180" cy="180" r="172" className="dial-outer-ring" />
          <circle cx="180" cy="180" r="122" className="dial-mid-ring" />

          {/* Rotating wheel group */}
          {/* Turned frame by frame from BirthSetupPanel (requestAnimationFrame), not by a CSS
              transition, so the spin still plays where transitions are globally shortened */}
          <g
            ref={spinnerRef}
            className="dial-spinner-group"
            style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '180px 180px' }}
          >
            {sectors.map((r, i) => {
              const a = (i * Math.PI * 2) / sectors.length - Math.PI / 2;
              const b = ((i + 1) * Math.PI * 2) / sectors.length - Math.PI / 2;
              const p = [
                point(130, a + 0.012),
                point(164, a + 0.012),
                point(164, b - 0.012),
                point(130, b - 0.012)
              ];
              const label = point(147, (a + b) / 2);
              const isSelected = selected === r.id;

              return (
                <g
                  key={r.id}
                  className={`dial-sector ${isSelected ? 'is-selected' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={r.nameEn}
                  aria-pressed={isSelected}
                  onClick={() => !isSpinning && onSelect(r.id)}
                  onKeyDown={(e) => {
                    if (!isSpinning && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onSelect(r.id);
                    }
                  }}
                >
                  <path
                    d={`M ${p[0]} L ${p[1]} A 164 164 0 0 1 ${p[2]} L ${p[3]} A 130 130 0 0 0 ${p[0]} Z`}
                  />
                  <text x={label[0]} y={label[1]} textAnchor="middle" dominantBaseline="middle">
                    {r.id}
                  </text>
                  <title>{r.nameEn}</title>
                </g>
              );
            })}
          </g>

          {/* Inner Static Hub */}
          <circle cx="180" cy="180" r="110" className="dial-inner" />

          {/* The pointer at twelve o'clock reads the letter under it */}
          <g className="dial-pointer-needle">
            <polygon points="180,26 171,6 189,6" />
          </g>

          {/* Center District Status */}
          <text ref={nameRef} x="180" y="162" className="dial-name" textAnchor="middle">
            {hubName(region)}
          </text>
          <text ref={captionRef} x="180" y="192" className="dial-caption" textAnchor="middle">
            {hubCaption(region, t)}
          </text>
        </svg>

        <span className="dial-instruction">
          {isSpinning
            ? t('Vận mệnh The City đang xoay vần…', 'The City wheel is turning…')
            : t('Chọn ký tự hoặc quay ngẫu nhiên nơi sinh', 'Choose a letter or spin random birthplace')}
        </span>
      </div>

      <button
        type="button"
        className="dial-spin-btn"
        disabled={isSpinning}
        onClick={onTriggerSpin}
        title={t('Quay ngẫu nhiên District', 'Spin random district')}
      >
        <Dices size={16} className={isSpinning ? 'animate-spin' : ''} />
        <span>{t('Quay ngẫu nhiên District', 'Spin random District')}</span>
      </button>
      <MotionHint t={t} />
    </div>
  );
}

// Shown only while the OS asks for reduced motion and the player has not chosen a setting
function MotionHint({ t }) {
  const motionMode = useThemeStore((s) => s.motionMode);
  const cycleMotion = useThemeStore((s) => s.cycleMotion);
  const osReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (motionMode !== 'system' || !osReduced) return null;
  return (
    <p className="dial-motion-hint">
      {t(
        'Máy của bạn đang tắt hiệu ứng chuyển động, nên vòng quay được rút ngắn.',
        'Your device has animations turned off, so the wheel spin is shortened.'
      )}{' '}
      <button type="button" onClick={cycleMotion}>
        {t('Bật đầy đủ', 'Turn on full motion')}
      </button>
    </p>
  );
}

export const BirthSetupPanel = () => {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const customName = useGameStore((s) => s.customName);
  const gender = useGameStore((s) => s.gender === 'female' ? 'female' : 'male');
  const customSeed = useGameStore((s) => s.customSeed);
  const selectedRegion = useGameStore((s) => s.selectedRegion);
  const selectedFamily = useGameStore((s) => s.selectedFamily || 'RANDOM');
  const pendingLegacy = useGameStore((s) => s.pendingLegacy);
  const pastLives = useGameStore((s) => s.pastLives);
  const globalCodex = useGameStore((s) => s.globalCodex);
  const savedRun = useGameStore((s) => s.savedRun);
  const { setConfigField, startLife, resumeRun, abandonRun, discardPendingLegacy } = useGameStore.getState();
  const [spinning, setSpinning] = useState(false);
  const [search, setSearch] = useState('');
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [displayRegion, setDisplayRegion] = useState(null);
  const [loadingActive, setLoadingActive] = useState(false);
  const [targetLaunchParams, setTargetLaunchParams] = useState(null);

  const mapRef = useRef(null);
  const spinnerRef = useRef(null);
  const hubNameRef = useRef(null);
  const hubCaptionRef = useRef(null);
  const rotationRef = useRef(0);
  const rafRef = useRef(0);
  const lastTickRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const sectors = WHEEL_SECTORS;

  /**
   * Turns the wheel so `target` stops under the needle, `turns` full turns first.
   * Writes the transform and the hub text straight to the DOM each frame; React
   * state is only set at the end. A region off the wheel (the Outskirts) stops
   * on the seam between Z and A.
   */
  const spinTo = (target, { turns = 5, duration = 2600 } = {}) =>
    new Promise((resolve) => {
      cancelAnimationFrame(rafRef.current);
      const reduce = reducedMotion();
      const spins = reduce ? 1 : turns;
      const time = reduce ? Math.min(duration, 1100) : duration;
      const idx = sectors.findIndex((r) => r.id === target?.id);
      const stopAt = idx >= 0 ? -(idx + 0.5) * SECTOR_DEG : 0;
      const from = rotationRef.current;
      const forward = (((stopAt - from) % 360) + 360) % 360;
      const to = from + spins * 360 + forward;
      const start = performance.now();
      let lastSector = null;
      setIsWheelSpinning(true);

      const frame = (now) => {
        const p = Math.min(1, (now - start) / time);
        const eased = 1 - Math.pow(1 - p, 4);
        const deg = from + (to - from) * eased;
        rotationRef.current = deg;
        if (spinnerRef.current) spinnerRef.current.style.transform = `rotate(${deg}deg)`;
        const under = p < 1 ? sectorUnderNeedle(deg) : target;
        if (under && under !== lastSector) {
          lastSector = under;
          if (hubNameRef.current) hubNameRef.current.textContent = hubName(under);
          if (hubCaptionRef.current) hubCaptionRef.current.textContent = hubCaption(under, t);
          if (p < 1 && now - lastTickRef.current > 45) {
            lastTickRef.current = now;
            try {
              audioEngine.playClick();
            } catch {}
          }
        }
        if (p < 1) {
          rafRef.current = requestAnimationFrame(frame);
          return;
        }
        setWheelRotation(deg);
        setDisplayRegion(target);
        setIsWheelSpinning(false);
        try {
          audioEngine.playBuff();
        } catch {}
        resolve(target);
      };
      rafRef.current = requestAnimationFrame(frame);
    });

  // The dice button picks a birthplace and keeps it selected
  const handleManualSpin = () => {
    if (isWheelSpinning) return;
    const chosen = rollBirthRegion(Math.random, null, selectedFamily);
    spinTo(chosen).then(() => setRegion(chosen.id));
  };

  // Every start spins. "Random" stays random for the next life; only this birth is decided.
  const launch = (inherit = false, age = 0) => {
    if (spinning || isWheelSpinning) return;
    const fixed = selectedRegion && selectedRegion !== 'RANDOM' ? REGIONS.find((r) => r.id === selectedRegion) : null;
    const seed = customSeed?.trim();
    const chosen = fixed || rollBirthRegion(seed ? createRNG(seed) : Math.random, inherit ? pendingLegacy : null, selectedFamily);
    setTargetLaunchParams({ inherit, age, region: chosen, regionId: fixed ? null : chosen.id });
    setSpinning(true);
    spinTo(chosen, fixed ? { turns: 3, duration: 1900 } : {}).then(() => {
      setTimeout(() => setLoadingActive(true), 350);
    });
  };

  const handleLoadingComplete = () => {
    setLoadingActive(false);
    setSpinning(false);
    const inherit = targetLaunchParams?.inherit ?? false;
    const age = targetLaunchParams?.age ?? 0;
    startLife(inherit, age, targetLaunchParams?.regionId || null);
  };
  const setRegion = (id) => {
    setConfigField('selectedRegion', id);
    if (id === 'OUTSKIRTS' && selectedFamily !== 'RANDOM' && selectedFamily !== 'outskirts_nomad') {
      setConfigField('selectedFamily', 'RANDOM');
    } else if (id !== 'OUTSKIRTS' && id !== 'RANDOM' && selectedFamily === 'outskirts_nomad') {
      setConfigField('selectedFamily', 'RANDOM');
    }
  };
  const region = REGIONS.find((r) => r.id === selectedRegion);
  const districts = REGIONS.filter((r) =>
    `${r.nameEn} ${r.aliasEn} ${r.aliasVi}`.toLowerCase().includes(search.toLowerCase().trim())
  );
  const omenTotal = FATE_OMENS.reduce((sum, o) => sum + o.chanceWeight, 0);
  const highestGeneration = Math.max(1, ...pastLives.map((life) => life.generation || 1));
  const relation =
    pendingLegacy?.successorRelation ||
    (pendingLegacy?.age < 14
      ? 'sibling'
      : pendingLegacy?.age < 18
        ? 'companion'
        : pendingLegacy?.hasChild
          ? 'child'
          : 'heir');
  const heirAge =
    pendingLegacy?.childAgeWhenParentDied || Math.max(1, Math.min(18, (pendingLegacy?.age || 22) - 22));
  const confirmDiscard = () =>
    Modal.confirm({
      title: t('Bắt đầu một huyết thống mới?', 'Start a new bloodline?'),
      content: t(
        'Di sản sẽ không được chuyển giao. Các kiếp trước vẫn được giữ trong Huyết thống.',
        'This heirloom will not pass on. Past lives remain in your Bloodline archive.'
      ),
      okText: t('Bỏ di sản', 'Discard heirloom'),
      cancelText: t('Giữ lại', 'Keep it'),
      onOk: () => discardPendingLegacy(false)
    });

  return (
    <div className="city-home" lang={lang === 'bi' ? 'vi' : lang}>
      <CityLoadingOverlay
        active={loadingActive}
        region={targetLaunchParams?.region || region}
        charName={customName || t('Cư dân The City', 'City Citizen')}
        seed={customSeed}
        onComplete={handleLoadingComplete}
      />
      <section className="home-opening" aria-labelledby="home-title">
        <div className="opening-story">
          <p className="opening-context">
            {t('Một câu chuyện trong vũ trụ Project Moon', 'A life in the Project Moon universe')}
          </p>
          <h1 id="home-title">
            The City <em className="the-city-title">Chronicles</em>
          </h1>
          <div className={`opening-atlas ${spinning ? 'is-launch-spinning' : ''}`}>
            <DistrictDial
              selected={selectedRegion}
              onSelect={(id) => {
                const picked = REGIONS.find((r) => r.id === id);
                setRegion(id);
                if (picked) spinTo(picked, { turns: 0, duration: 520 });
              }}
              isSpinning={isWheelSpinning}
              rotation={wheelRotation}
              spinnerRef={spinnerRef}
              nameRef={hubNameRef}
              captionRef={hubCaptionRef}
              displayRegion={displayRegion}
              onTriggerSpin={handleManualSpin}
              t={t}
            />
            <div className="atlas-note">
              <MapPin size={16} aria-hidden="true" />
              <div>
                <strong>{region ? (lang === 'en' ? region.nameEn : region.nameVi || region.nameEn) : t('Nơi sinh chưa định', 'A birthplace unwritten')}</strong>
                <p>
                  {region
                    ? t(region.aliasVi, region.aliasEn)
                    : t(
                        'Để The City chọn, hoặc tự chọn một District.',
                        'Let The City decide, or choose your own District.'
                      )}
                </p>
                <button
                  onClick={() =>
                    mapRef.current?.scrollIntoView({
                      behavior: reducedMotion()
                        ? 'instant'
                        : 'smooth'
                    })
                  }
                >
                  {t('Xem các District', 'Explore the Districts')}{' '}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="birth-panel" aria-labelledby="birth-title">
          <div className="birth-heading">
            <span className="birth-symbol">
              <BookOpen size={21} strokeWidth={1.4} aria-hidden="true" />
            </span>
            <div>
              <h2 id="birth-title">{t('Mở một hồ sơ mới', 'Begin a new record')}</h2>
              <p>{t('Mỗi cái tên là một đời chưa được kể.', 'Every name is a life yet to be told.')}</p>
            </div>
          </div>
          {savedRun && (
            <div className="birth-resume">
              <div>
                <span>{t('Kiếp đang dở', 'Life in progress')}</span>
                <strong>
                  {savedRun.char.name}
                  <small>
                    {' '}
                    · {savedRun.char.age} {t('tuổi', 'yrs')}
                  </small>
                </strong>
              </div>
              <button className="btn btn-block" onClick={resumeRun}>
                <Play size={15} />
                {t('Viết tiếp câu chuyện', 'Continue this life')}
              </button>
              <button
                className="birth-text-action"
                onClick={() =>
                  Modal.confirm({
                    title: t('Bỏ kiếp đang dở?', 'Abandon this life?'),
                    content: t('Tiến trình của kiếp này sẽ bị xóa.', 'This life’s progress will be deleted.'),
                    okText: t('Bỏ kiếp này', 'Abandon life'),
                    cancelText: t('Giữ lại', 'Keep it'),
                    okButtonProps: { danger: true },
                    onOk: abandonRun
                  })
                }
              >
                {t('Bỏ kiếp đang dở', 'Discard this progress')}
              </button>
            </div>
          )}
          <div className="birth-fields">
            <div className="field">
              <label htmlFor="birth-name">
                {t('Tên của bạn', 'Your name')}
                <span>{t('Không bắt buộc', 'Optional')}</span>
              </label>
              <input
                id="birth-name"
                className="input"
                placeholder={t('Để The City đặt tên', 'Let The City name you')}
                value={customName}
                onChange={(e) => setConfigField('customName', e.target.value)}
                maxLength={60}
                autoComplete="off"
              />
            </div>
            <div className="field">
              <span className="field-label" id="birth-gender-label">{t('Giới tính', 'Gender')}</span>
              <div className="seg birth-gender" role="radiogroup" aria-labelledby="birth-gender-label">
                {[['male', t('Nam', 'Male')], ['female', t('Nữ', 'Female')]].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={gender === id}
                    className={gender === id ? 'is-on' : ''}
                    onClick={() => setConfigField('gender', id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="field-hint">{t('Nơi sinh và gia cảnh do The City định đoạt. Lời kể vẫn gọi bạn là "bạn".', 'The City decides your birthplace and background. The story still addresses you as "you".')}</p>
            </div>
            <details className="birth-seed">
              <summary>
                {t('Seed thế giới', 'World seed')}
                <ChevronDown size={15} />
              </summary>
              <div>
                <input
                  className="input num"
                  aria-label={t('Seed thế giới', 'World seed')}
                  placeholder={t('Tự tạo nếu để trống', 'Generated if left empty')}
                  value={customSeed}
                  onChange={(e) => setConfigField('customSeed', e.target.value)}
                />
                <button
                  className="app-tool"
                  onClick={() => setConfigField('customSeed', freshSeed())}
                  aria-label={t('Tạo seed mới', 'Generate a seed')}
                >
                  <Dices size={18} />
                </button>
              </div>
            </details>
          </div>
          <button
            className="btn btn-primary btn-lg btn-block hero-start-btn"
            disabled={spinning}
            aria-busy={spinning}
            onClick={() => launch()}
          >
            <Play size={17} />
            {spinning
              ? t('Đang mở hồ sơ…', 'Opening your record…')
              : t('Bước vào The City', 'Enter The City')}
          </button>
          <p className="birth-footnote">
            {t(
              'Một năm trong 30 giây. Tự lưu sau mỗi lựa chọn.',
              'A year in 30 seconds. Saved after every choice.'
            )}
          </p>
          {pendingLegacy && (
            <details className="birth-legacy" open>
              <summary>
                <GitBranch size={17} />
                {t(
                  `Kế thừa thế hệ #${pendingLegacy.generation + 1}`,
                  `Continue generation #${pendingLegacy.generation + 1}`
                )}
                <ChevronDown size={15} />
              </summary>
              <div className="birth-legacy-inner">
                <div className="birth-legacy-header">
                  <span className="successor-badge">
                    {lang === 'en'
                      ? (pendingLegacy.successorTitleEn || pendingLegacy.successorRelation || 'Successor')
                      : (pendingLegacy.successorTitleVi || pendingLegacy.successorRelation || 'Người kế thừa')}
                  </span>
                </div>
                <p className="birth-legacy-intro">
                  {lang === 'en'
                    ? (pendingLegacy.successorIntroEn || `You take up the legacy of ${pendingLegacy.name}.`)
                    : (pendingLegacy.successorIntroVi || `Bạn tiếp nhận di sản của ${pendingLegacy.name}.`)}
                </p>
                <p className="birth-legacy-relic">
                  {t('Kỷ vật truyền đời:', 'Relic passed down:')}{' '}
                  <strong>{t(pendingLegacy.relic, localizeEnsembleName(pendingLegacy.relic, 'en'))}</strong>
                </p>
                <button className="btn btn-block btn-primary" disabled={spinning} onClick={() => launch(true, 0)}>
                  {t('Bắt đầu kiếp này từ tuổi 0', 'Begin this life at age 0')}
                </button>
                {relation === 'child' && heirAge >= 14 && (
                  <button className="btn btn-block" disabled={spinning} onClick={() => launch(true, heirAge)}>
                    {t(`Tiếp quản ở tuổi ${heirAge}`, `Take over at age ${heirAge}`)}
                  </button>
                )}
                <button className="birth-text-action" onClick={confirmDiscard}>
                  {t('Bỏ di sản, bắt đầu độc lập', 'Discard heirloom and start fresh')}
                </button>
              </div>
            </details>
          )}
        </section>
      </section>

      <div className="archive-strip" aria-label={t('Dấu chân của bạn', 'Your record')}>
        <div>
          <b>{pastLives.length}</b>
          <span>{t('kiếp đã sống', pastLives.length === 1 ? 'life remembered' : 'lives remembered')}</span>
        </div>
        <div>
          <b>{highestGeneration}</b>
          <span>{t('thế hệ', highestGeneration === 1 ? 'generation' : 'generations')}</span>
        </div>
        <div>
          <b>
            {globalCodex.length}
            <small> / {CODEX_RECORDS.length}</small>
          </b>
          <span>{t('thành tựu', globalCodex.length === 1 ? 'codex record' : 'codex records')}</span>
        </div>
        <button onClick={() => navigate('/bloodline')}>
          {t('Mở huyết thống', 'Open bloodline')}
          <ArrowUpRight size={17} />
        </button>
      </div>

      <section className="city-section" aria-labelledby="paths-title">
        <div className="city-section-heading">
          <div>
            <h2 id="paths-title">{t('Những con đường trong The City', 'Ways through The City')}</h2>
            <p>
              {t('Từ khoảng 15 đến 20 tuổi, cuộc đời đưa bạn tới ngã rẽ.', 'Somewhere between fifteen and twenty, your life reaches a crossroads.')}
            </p>
          </div>
        </div>
        <div className="career-list">
          {CAREERS.map(([title, vi, en]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{t(vi, en)}</p>
            </article>
          ))}
        </div>
        <div className="ego-note">
          <span>E.G.O / Distortion</span>
          <p>
            {t(
              'Khi tâm trí chạm giới hạn, giọng nói của Carmen có thể tìm đến. Bạn sẽ giữ lấy mình, hay buông tay?',
              'At the limits of your mind, Carmen’s voice may find you. Will you hold on to yourself, or let go?'
            )}
          </p>
        </div>
      </section>

      <section className="city-section" ref={mapRef} aria-labelledby="map-title">
        <div className="city-section-heading">
          <div>
            <h2 id="map-title">{t('Nơi mọi chuyện bắt đầu', 'Where it all begins')}</h2>
            <p>
              {t(
                '26 District và Outskirts. Mỗi nơi có một cái giá để tồn tại.',
                '26 Districts and the Outskirts. Each has its own cost of living.'
              )}
            </p>
          </div>
          <button
            className="btn"
            onClick={() => setRegion('RANDOM')}
            aria-pressed={selectedRegion === 'RANDOM'}
          >
            <Dices size={16} />
            {t('Ngẫu nhiên', 'Random')}
          </button>
        </div>
        <div className="district-browser">
          <div className="district-selection">
            <span>{t('Nơi sinh đã chọn', 'Selected birthplace')}</span>
            <h3>{region ? (lang === 'en' ? region.nameEn : region.nameVi || region.nameEn) : t('Để số phận quyết định', 'Leave it to fate')}</h3>
            <p>
              {region
                ? t(region.descVi, region.descEn)
                : t(
                    'Phần lớn cư dân lớn lên ở Backstreets. Một số ít có thể chào đời sau những bức tường của Nest.',
                    'Most residents grow up in the Backstreets. A fortunate few are born behind the walls of a Nest.'
                  )}
            </p>
            {region && <RegionMark r={region} t={t} />}
            <button
              className="birth-text-action"
              onClick={() => document.getElementById('birth-region')?.focus()}
            >
              {t('Trở về hồ sơ khai sinh', 'Return to your birth record')} <ArrowUpRight size={14} />
            </button>
          </div>
          <div>
            <label className="district-search">
              <Search size={16} />
              <input
                aria-label={t('Tìm District', 'Search Districts')}
                placeholder={t('Tìm District hoặc Wing…', 'Find a District or Wing…')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <div className="district-index">
              {districts.map((r) => (
                <button
                  key={r.id}
                  className={selectedRegion === r.id ? 'is-selected' : ''}
                  onClick={() => setRegion(r.id)}
                  aria-pressed={selectedRegion === r.id}
                >
                  <span>{r.ward ? String(r.ward).padStart(2, '0') : 'OUT'}</span>
                  <strong>{r.id === 'OUTSKIRTS' ? 'Outskirts' : `${r.id} Corp`}</strong>
                  <small>{t(r.aliasVi, r.aliasEn)}</small>
                </button>
              ))}
              {!districts.length && (
                <p className="empty">{t('Không tìm thấy District phù hợp.', 'No matching Districts.')}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="city-section" aria-labelledby="omens-title">
        <details className="fate-disclosure">
          <summary>
            <div>
              <h2 id="omens-title">{t('Điềm báo lúc chào đời', 'Omens at birth')}</h2>
              <p>{t('Một trong sáu điềm báo sẽ đi cùng bạn.', 'One of six omens will follow you.')}</p>
            </div>
            <ChevronDown size={20} />
          </summary>
          <div className="fate-grid">
            {FATE_OMENS.map((o) => (
              <article key={o.id}>
                <div>
                  <h3>{t(o.nameVi, o.nameEn)}</h3>
                  <span className="num">{Math.round((o.chanceWeight / omenTotal) * 100)}%</span>
                </div>
                <p>{t(o.descVi || o.tagVi, o.descEn || o.tagEn)}</p>
              </article>
            ))}
          </div>
        </details>
      </section>
      <footer className="city-footer">
        <span>The City Chronicles</span>
        <p>
          {t(
            'Dự án fan phi thương mại. Thế giới thuộc về Project Moon.',
            'A non-commercial fan project. World and lore by Project Moon.'
          )}
        </p>
        <Link to="/glossary">
          {t('Thuật ngữ thế giới', 'World Glossary')}
          <ArrowUpRight size={14} />
        </Link>
      </footer>
    </div>
  );
};
export default BirthSetupPanel;
