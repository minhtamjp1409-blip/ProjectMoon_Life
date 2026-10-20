import React, { useRef, useState } from 'react';
import { Dices, GitBranch, Play, ChevronDown, ArrowUpRight, Search, BookOpen, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useGameStore } from '../../../store/gameStore';
import { freshSeed } from '../../../engine/gameEngine';
import { REGIONS, CODEX_RECORDS } from '../../../data/worldData';
import { FATE_OMENS } from '../../../engine/weaverAI';
import { useT } from '../../../i18n';
import { RegionMark } from '../../../components/RegionMark';

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
  ],
  [
    'Workshop Craftsman',
    'Rèn vũ khí, chế tác cơ thể và tạo nên một di vật có thể sống lâu hơn chính bạn.',
    'Forge weapons, craft prosthetics and make an heirloom that might outlive you.'
  ]
];

function DistrictDial({ selected, onSelect, t }) {
  const sectors = REGIONS.filter((r) => r.id !== 'OUTSKIRTS');
  const point = (radius, angle) => [180 + radius * Math.cos(angle), 180 + radius * Math.sin(angle)];
  const region = REGIONS.find((r) => r.id === selected);
  return (
    <div className="district-dial">
      <svg viewBox="0 0 360 360" aria-label={t('Chọn một District', 'Choose a District')}>
        <circle cx="180" cy="180" r="172" className="dial-outer-ring" />
        <circle cx="180" cy="180" r="122" className="dial-mid-ring" />
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
          return (
            <g
              key={r.id}
              className={selected === r.id ? 'is-selected' : ''}
              role="button"
              tabIndex={0}
              aria-label={r.nameEn}
              aria-pressed={selected === r.id}
              onClick={() => onSelect(r.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(r.id);
                }
              }}
            >
              <path d={`M ${p[0]} L ${p[1]} A 164 164 0 0 1 ${p[2]} L ${p[3]} A 130 130 0 0 0 ${p[0]} Z`} />
              <text x={label[0]} y={label[1]} textAnchor="middle" dominantBaseline="middle">
                {r.id}
              </text>
              <title>{r.nameEn}</title>
            </g>
          );
        })}
        <circle cx="180" cy="180" r="110" className="dial-inner" />
        <text x="180" y="162" className="dial-name" textAnchor="middle">
          {region ? (region.id === 'OUTSKIRTS' ? 'Outskirts' : `${region.id} Corp`) : 'The City'}
        </text>
        <text x="180" y="192" className="dial-caption" textAnchor="middle">
          {region
            ? region.ward
              ? `District ${region.ward}`
              : 'Outskirts'
            : t('26 District · một kiếp sống', '26 Districts · one life')}
        </text>
      </svg>
      <span className="dial-instruction">
        {t('Chọn một ký tự để đặt nơi sinh', 'Choose a letter to set your birthplace')}
      </span>
    </div>
  );
}

export const BirthSetupPanel = () => {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const customName = useGameStore((s) => s.customName);
  const customSeed = useGameStore((s) => s.customSeed);
  const selectedRegion = useGameStore((s) => s.selectedRegion);
  const pendingLegacy = useGameStore((s) => s.pendingLegacy);
  const pastLives = useGameStore((s) => s.pastLives);
  const globalCodex = useGameStore((s) => s.globalCodex);
  const savedRun = useGameStore((s) => s.savedRun);
  const { setConfigField, startLife, resumeRun, abandonRun, discardPendingLegacy } = useGameStore.getState();
  const [spinning, setSpinning] = useState(false);
  const [search, setSearch] = useState('');
  const mapRef = useRef(null);
  const launchTimer = useRef(null);
  React.useEffect(() => () => clearTimeout(launchTimer.current), []);
  const launch = (inherit = false, age = 0) => {
    if (spinning) return;
    setSpinning(true);
    launchTimer.current = setTimeout(() => {
      setSpinning(false);
      startLife(inherit, age);
    }, 650);
  };
  const setRegion = (id) => setConfigField('selectedRegion', id);
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
      <section className="home-opening" aria-labelledby="home-title">
        <div className="opening-story">
          <p className="opening-context">
            {t('Một câu chuyện trong vũ trụ Project Moon', 'A life in the Project Moon universe')}
          </p>
          <h1 id="home-title">
            {t('Một đời giữa', 'A life in')}{' '}
            <br />
            <span className="the-city-title">The City.</span>
          </h1>
          <p className="opening-lead">
            {t(
              'Nơi bạn sinh ra không phải lựa chọn của bạn. Nhưng những gì còn lại sau một đời người thì có.',
              'You do not choose the world you are born into. What you leave behind is another matter.'
            )}
          </p>
          <div className="opening-atlas">
            <DistrictDial selected={selectedRegion} onSelect={setRegion} t={t} />
            <div className="atlas-note">
              <MapPin size={16} aria-hidden="true" />
              <div>
                <strong>{region ? region.nameEn : t('Nơi sinh chưa định', 'A birthplace unwritten')}</strong>
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
                      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
              <label htmlFor="birth-region">{t('Nơi chào đời', 'Birthplace')}</label>
              <select
                id="birth-region"
                className="select"
                value={selectedRegion}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="RANDOM">
                  {t('Ngẫu nhiên theo dân số', 'Random, weighted by population')}
                </option>
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nameEn} · {t(r.aliasVi, r.aliasEn)}
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
            <details className="birth-legacy">
              <summary>
                <GitBranch size={17} />
                {t(
                  `Kế thừa đời ${pendingLegacy.generation + 1}`,
                  `Continue generation ${pendingLegacy.generation + 1}`
                )}
                <ChevronDown size={15} />
              </summary>
              <p>
                {t('Di sản của', 'The legacy of')} <strong>{pendingLegacy.name}</strong> ·{' '}
                {pendingLegacy.relic}
              </p>
              <button className="btn btn-block" disabled={spinning} onClick={() => launch(true, 0)}>
                {t('Bắt đầu từ tuổi 0', 'Begin at age 0')}
              </button>
              {relation === 'child' && heirAge >= 14 && (
                <button className="btn btn-block" disabled={spinning} onClick={() => launch(true, heirAge)}>
                  {t(`Tiếp quản ở tuổi ${heirAge}`, `Take over at age ${heirAge}`)}
                </button>
              )}
              <button className="birth-text-action" onClick={confirmDiscard}>
                {t('Bỏ di sản, bắt đầu độc lập', 'Discard heirloom and start fresh')}
              </button>
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
              {t('Đến tuổi 18, cuộc đời đưa bạn tới ngã rẽ.', 'At eighteen, your life reaches a crossroads.')}
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
            <h3>{region ? region.nameEn : t('Để số phận quyết định', 'Leave it to fate')}</h3>
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
        <a href="/THE_CITY_CHRONICLES_DOCUMENTATION.pdf" target="_blank" rel="noreferrer">
          {t('Tài liệu gameplay', 'Gameplay guide')}
          <ArrowUpRight size={14} />
        </a>
      </footer>
    </div>
  );
};
export default BirthSetupPanel;
