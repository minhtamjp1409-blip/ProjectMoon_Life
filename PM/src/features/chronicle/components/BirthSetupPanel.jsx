import React, { useRef, useState, useEffect } from 'react';
import { localizeEnsembleName } from '../../../data/ensembleNames.js';
import { Dices, GitBranch, Play, ChevronDown, ArrowUpRight, Search, BookOpen, MapPin, Stamp, RotateCcw } from 'lucide-react';
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
import CityBirthAtlas, { ATLAS_VIEW, atlasTargetView } from './CityBirthAtlas';
import { reducedMotion } from '../../../utils/motion';
import { describeJob } from './CharacterDossierCard';

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
  const [activeTab, setActiveTab] = useState(savedRun ? 'resume' : 'new');
  useEffect(() => {
    if (!savedRun && activeTab === 'resume') {
      setActiveTab('new');
    }
  }, [savedRun, activeTab]);
  const [spinning, setSpinning] = useState(false);
  const [search, setSearch] = useState('');
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [atlasViewport, setAtlasViewport] = useState(ATLAS_VIEW);
  const [displayRegion, setDisplayRegion] = useState(null);
  const [loadingActive, setLoadingActive] = useState(false);
  const [targetLaunchParams, setTargetLaunchParams] = useState(null);

  const mapRef = useRef(null);
  const viewportRef = useRef(ATLAS_VIEW);
  const rafRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // The atlas locates the birthplace before the existing registration overlay opens.
  const spinTo = (target, { duration = 1500 } = {}) =>
    new Promise((resolve) => {
      cancelAnimationFrame(rafRef.current);
      const reduce = reducedMotion();
      const time = reduce ? 1 : duration;
      const from = viewportRef.current;
      const to = atlasTargetView(target?.id);
      const start = performance.now();
      setIsWheelSpinning(true);

      const frame = (now) => {
        const p = Math.min(1, (now - start) / time);
        const eased = reduce ? 1 : 1 - Math.pow(1 - p, 3);
        const next = Object.fromEntries(Object.keys(ATLAS_VIEW).map((key) => [key, from[key] + (to[key] - from[key]) * eased]));
        viewportRef.current = next;
        setAtlasViewport(next);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(frame);
          return;
        }
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

  const resetAtlas = () => {
    cancelAnimationFrame(rafRef.current);
    viewportRef.current = ATLAS_VIEW;
    setAtlasViewport(ATLAS_VIEW);
    setIsWheelSpinning(false);
  };

  // Every start spins. "Random" stays random for the next life; only this birth is decided.
  const launch = (inherit = false, age = 0) => {
    if (spinning || isWheelSpinning) return;
    const fixed = selectedRegion && selectedRegion !== 'RANDOM' ? REGIONS.find((r) => r.id === selectedRegion) : null;
    const seed = customSeed?.trim();
    const chosen = fixed || rollBirthRegion(seed ? createRNG(seed) : Math.random, inherit ? pendingLegacy : null, selectedFamily);
    setTargetLaunchParams({ inherit, age, region: chosen, regionId: fixed ? null : chosen.id });
    setSpinning(true);
    spinTo(chosen, { duration: 1750 }).then(() => {
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
    setDisplayRegion(REGIONS.find((r) => r.id === id) || null);
    if (id === 'RANDOM') resetAtlas();
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
            The City <span className="the-city-title">Chronicles</span>
          </h1>
          <div className={`opening-atlas ${spinning ? 'is-launch-spinning' : ''}`}>
            <CityBirthAtlas
              selected={selectedRegion}
              onSelect={(id) => {
                setRegion(id);
                setDisplayRegion(REGIONS.find((r) => r.id === id));
              }}
              moving={isWheelSpinning}
              starting={spinning}
              viewport={atlasViewport}
              displayRegion={displayRegion}
              onRandom={handleManualSpin}
              onReset={resetAtlas}
              onStart={() => launch()}
              t={t}
              lang={lang}
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
            <span className="birth-symbol" aria-hidden="true">
              <Stamp size={20} strokeWidth={1.5} />
            </span>
            <div className="birth-heading-text">
              <span className="birth-bureau-code">HANA REGISTRY // FORM 0-A</span>
              <h2 id="birth-title">
                {savedRun && activeTab === 'resume'
                  ? t('Hồ sơ kiếp đang dở', 'Dossier in progress')
                  : t('Khai sinh một sinh mệnh mới', 'Begin a new record')}
              </h2>
              <p>
                {savedRun && activeTab === 'resume'
                  ? t('Tiến trình sống được bảo lưu an toàn bởi The City.', 'Active life safely preserved by The City.')
                  : t('Mỗi cái tên là một đời chưa được kể giữa The City.', 'Every name is a life yet to be told in The City.')}
              </p>
            </div>
          </div>

          {savedRun && (
            <div className="birth-tabs-bar" role="tablist" aria-label={t('Chế độ bắt đầu', 'Start mode')}>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'resume'}
                className={`birth-tab ${activeTab === 'resume' ? 'is-active' : ''}`}
                onClick={() => {
                  try { audioEngine.playClick(); } catch {}
                  setActiveTab('resume');
                }}
              >
                <Play size={14} />
                <span>{t('Kiếp đang dở', 'In Progress')}</span>
                <b className="tab-pill">{savedRun.char.name}</b>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'new'}
                className={`birth-tab ${activeTab === 'new' ? 'is-active' : ''}`}
                onClick={() => {
                  try { audioEngine.playClick(); } catch {}
                  setActiveTab('new');
                }}
              >
                <Stamp size={14} />
                <span>{t('Khai sinh kiếp mới', 'New Life')}</span>
              </button>
            </div>
          )}

          {savedRun && activeTab === 'resume' ? (
            <div className="birth-resume-view">
              <div className="resume-dossier-card">
                <div className="resume-dossier-header">
                  <span className="resume-dossier-tag">
                    {t('HỒ SƠ ĐANG LƯU HÀNH', 'ACTIVE DOSSIER')}
                  </span>
                  <span className="resume-serial-code">
                    REC // {savedRun.char.age}Y · GEN #{savedRun.char.generation || 1}
                  </span>
                </div>
                <div className="resume-nameplate">
                  <h3 className="resume-name">{savedRun.char.name}</h3>
                  <p className="resume-post">
                    {describeJob(savedRun.char, t)}
                  </p>
                </div>
                {savedRun.char.stats && (
                  <div className="resume-stats-strip">
                    <div className="resume-stat">
                      <span className="stat-label">HP</span>
                      <b className="stat-val">{savedRun.char.stats.health}</b>
                    </div>
                    <div className="resume-stat">
                      <span className="stat-label">SP</span>
                      <b className="stat-val">{savedRun.char.stats.sanity}</b>
                    </div>
                    <div className="resume-stat">
                      <span className="stat-label">Ahn</span>
                      <b className="stat-val text-gold">{savedRun.char.stats.wealth}</b>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block resume-launch-btn"
                onClick={() => {
                  try { audioEngine.playClick(); } catch {}
                  resumeRun();
                }}
              >
                <Play size={17} />
                <span>{t('Viết tiếp câu chuyện', 'Continue this life')}</span>
              </button>
              <button
                type="button"
                className="birth-text-action is-abandon"
                onClick={() =>
                  Modal.confirm({
                    title: t('Bỏ kiếp đang dở?', 'Abandon this life?'),
                    content: t('Tiến trình của kiếp này sẽ bị xóa vĩnh viễn.', 'This life’s progress will be deleted permanently.'),
                    okText: t('Bỏ kiếp này', 'Abandon life'),
                    cancelText: t('Giữ lại', 'Keep it'),
                    okButtonProps: { danger: true },
                    onOk: abandonRun
                  })
                }
              >
                {t('Hủy bỏ kiếp đang dở', 'Discard this progress')}
              </button>
            </div>
          ) : (
            <>
              <div className="birth-fields">
                <div className="field">
                  <label htmlFor="birth-name">
                    {t('Tên của bạn', 'Your name')}
                    <span>{t('Không bắt buộc', 'Optional')}</span>
                  </label>
                  <input
                    id="birth-name"
                    className="input"
                    placeholder={t('Để The City đặt tên (ngẫu nhiên)', 'Let The City name you (random)')}
                    value={customName}
                    onChange={(e) => setConfigField('customName', e.target.value)}
                    maxLength={60}
                    autoComplete="off"
                  />
                </div>
                <div className="field">
                  <span className="field-label" id="birth-gender-label">{t('Giới tính khởi đầu', 'Starting Gender')}</span>
                  <div className="seg birth-gender" role="radiogroup" aria-labelledby="birth-gender-label">
                    {[['male', t('♂ Nam', '♂ Male')], ['female', t('♀ Nữ', '♀ Female')]].map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={gender === id}
                        className={gender === id ? 'is-on' : ''}
                        onClick={() => {
                          try { audioEngine.playClick(); } catch {}
                          setConfigField('gender', id);
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <p className="field-hint">{t('Gia cảnh khởi đầu do The City định đoạt. Lời kể vẫn gọi bạn là "bạn".', 'Your starting household is decided by The City. The story still addresses you as "you".')}</p>
                </div>
                <div className="field birth-region-field">
                  <label htmlFor="birth-region">
                    {t('Nơi sinh', 'Birthplace')}
                    <button
                      type="button"
                      className="birth-map-link"
                      onClick={() =>
                        mapRef.current?.scrollIntoView({
                          behavior: reducedMotion() ? 'instant' : 'smooth'
                        })
                      }
                    >
                      <MapPin size={13} aria-hidden="true" />
                      <span>{t('Tra cứu bản đồ', 'Explore map')}</span>
                    </button>
                  </label>
                  <select
                    id="birth-region"
                    className="input birth-region-select"
                    value={selectedRegion || 'RANDOM'}
                    onChange={(e) => {
                      const id = e.target.value;
                      setRegion(id);
                      const picked = REGIONS.find((r) => r.id === id);
                      setDisplayRegion(picked || null);
                      resetAtlas();
                    }}
                  >
                    <option value="RANDOM">
                      {t('Ngẫu nhiên · Để The City định đoạt', 'Random · Let The City decide')}
                    </option>
                    {REGIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.id === 'OUTSKIRTS'
                          ? t('Outskirts · Ngoài Bức Tường', 'Outskirts · Beyond the Wall')
                          : `District ${String(r.ward).padStart(2, '0')} (${r.id} Corp) · ${lang === 'en' ? r.aliasEn : r.aliasVi}`}
                      </option>
                    ))}
                  </select>
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
                      type="button"
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
                <Stamp size={17} />
                <span>
                  {spinning
                    ? t('Đang mở hồ sơ…', 'Opening your record…')
                    : t('Đóng dấu & Bước vào The City', 'Sign & Enter The City')}
                </span>
              </button>
              <p className="birth-footnote">
                {t(
                  'Một năm trong 30 giây · Tự lưu sau mỗi lựa chọn.',
                  'A year in 30 seconds · Saved after every choice.'
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
            </>
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
