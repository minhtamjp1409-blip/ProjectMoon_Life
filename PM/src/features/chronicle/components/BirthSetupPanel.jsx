import React, { useMemo, useState } from 'react';
import { Dices, GitBranch, Play, MapPin, ScrollText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../../../store/gameStore';
import { freshSeed } from '../../../engine/gameEngine';
import { REGIONS, CODEX_RECORDS } from '../../../data/worldData';
import { FATE_OMENS } from '../../../engine/weaverAI';
import { useT } from '../../../i18n';
import { RegionMark } from '../../../components/RegionMark';

const PATHS = [
  {
    kickerVi: 'Grade 9 → Color',
    kickerEn: 'Grade 9 → Color',
    titleVi: 'Fixer',
    titleEn: 'Fixer',
    descVi: 'Nhận request từ Office và Association, leo từng Grade, và nếu sống đủ lâu, được Hana trao một Color.',
    descEn: 'Take requests from Offices and Associations, climb the Grades, and if you live long enough, earn a Color from Hana.'
  },
  {
    kickerVi: 'Thumb · Index · Middle · Ring',
    kickerEn: 'Thumb · Index · Middle · Ring',
    titleVi: 'The Five Fingers',
    titleEn: 'The Five Fingers',
    descVi: 'Lễ nghi của Thumb, Prescript của Index, Book of Vengeance của Middle. Mỗi Finger một luật chơi riêng.',
    descEn: 'The Thumb’s etiquette, the Index’s Prescripts, the Middle’s Book of Vengeance. Every Finger plays by its own rules.'
  },
  {
    kickerVi: 'Feather của Wing',
    kickerEn: 'A Wing’s Feather',
    titleVi: 'Nhân viên Wing',
    titleEn: 'Wing employee',
    descVi: 'Sống trong Nest, làm việc cho một Singularity. An toàn hơn, cho tới khi công ty cần bạn biến mất.',
    descEn: 'Live in a Nest and work for a Singularity. Safer, until the company needs you gone.'
  },
  {
    kickerVi: 'Tres Association',
    kickerEn: 'Tres Association',
    titleVi: 'Workshop',
    titleEn: 'Workshop',
    descVi: 'Rèn vũ khí cho Fixer cả thành phố, đặt tên cho tác phẩm của mình và để nó lại cho đời sau.',
    descEn: 'Forge weapons for the City’s Fixers, name your masterpiece and leave it to the next generation.'
  },
  {
    kickerVi: 'Giọng nói của Carmen',
    kickerEn: 'Carmen’s voice',
    titleVi: 'E.G.O hay Distortion',
    titleEn: 'E.G.O or Distortion',
    descVi: 'Khi tâm trí chạm đáy, bạn sẽ nghe thấy nó. Vượt qua để Effloresce, hoặc buông tay.',
    descEn: 'When your mind hits bottom, you will hear it. Overcome it to Effloresce, or let go.'
  }
];

export const BirthSetupPanel = () => {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const { customName, customSeed, selectedRegion, pendingLegacy, pastLives, globalCodex, telemetry, savedRun, setConfigField, startLife, resumeRun, abandonRun } =
    useGameStore(
      useShallow((s) => ({
        customName: s.customName,
        customSeed: s.customSeed,
        selectedRegion: s.selectedRegion,
        pendingLegacy: s.pendingLegacy,
        pastLives: s.pastLives,
        globalCodex: s.globalCodex,
        telemetry: s.telemetry,
        savedRun: s.savedRun,
        setConfigField: s.setConfigField,
        startLife: s.startLife,
        resumeRun: s.resumeRun,
        abandonRun: s.abandonRun
      }))
    );

  const [spinning, setSpinning] = useState(false);
  const [litIdx, setLitIdx] = useState(-1);
  const mapRef = React.useRef(null);

  // While the omen rolls, light the cards in turn
  React.useEffect(() => {
    if (!spinning) return undefined;
    const timer = setInterval(() => setLitIdx((i) => (i + 1) % FATE_OMENS.length), 90);
    return () => clearInterval(timer);
  }, [spinning]);

  const launch = (useLegacy = false) => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setLitIdx(-1);
      startLife(useLegacy);
    }, 1000);
  };

  const omenTotal = FATE_OMENS.reduce((sum, o) => sum + o.chanceWeight, 0);
  const region = REGIONS.find((r) => r.id === selectedRegion);
  const livesLived = Math.max(telemetry?.totalLivesLived || 0, pastLives.length);
  const highestGen = Math.max(telemetry?.highestGeneration || 1, ...pastLives.map((l) => l.generation || 1), 1);
  const regionLabel = (r) => (lang === 'en' ? r.nameEn : r.nameVi);

  const districts = useMemo(() => REGIONS, []);

  return (
    <div className="home">
      {/* ---------- Hero: clean typography + character creation card ---------- */}
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <span className="hero-kicker">Project Moon · {t('Mô phỏng một đời người', 'A life simulation')}</span>
          <h1 id="home-title">
            {t('Sinh ra ở', 'Born in')} <span>The City</span>
          </h1>
          <p className="hero-lead">
            {t(
              'Mỗi năm trôi qua trong 30 giây. Bạn lớn lên ở Nest hay Backstreets, thành Fixer, người của Syndicate hay Feather của Wing. Rồi bạn chết, và đời con tiếp nối.',
              'Each year passes in 30 seconds. You grow up in a Nest or the Backstreets, become a Fixer, a Syndicate member or a Wing’s Feather. Then you die, and your heir carries on.'
            )}
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-light" onClick={() => mapRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              <MapPin size={17} />
              {t('Chọn nơi sinh trên bản đồ', 'Pick a birthplace on the map')}
            </button>
            <button type="button" className="btn btn-light" onClick={() => navigate('/bloodline')}>
              <ScrollText size={17} />
              {t('Xem gia phả', 'Open the bloodline')}
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <b>{livesLived}</b>
              <span>{t('kiếp đã sống', 'lives lived')}</span>
            </div>
            <div>
              <b>#{highestGen}</b>
              <span>{t('thế hệ xa nhất', 'furthest generation')}</span>
            </div>
            <div>
              <b>
                {globalCodex.length}/{CODEX_RECORDS.length}
              </b>
              <span>{t('thành tựu', 'milestones')}</span>
            </div>
          </div>
        </div>

        <div className="create">
          <div>
            <h2>{t('Hồ sơ khai sinh', 'Birth record')}</h2>
            <p className="create-sub">{t('Ô nào để trống, The City tự quyết.', 'Leave any field empty and The City decides.')}</p>
          </div>

          {savedRun && (
            <div className="resume">
              <div>
                <b>
                  {t('Kiếp đang dở', 'Life in progress')}: {savedRun.char.name}, {savedRun.char.age} {t('tuổi', 'yrs')}
                </b>
                <p className="muted" style={{ fontSize: 14, marginTop: 2 }}>
                  {t('Lưu lúc', 'Saved')} {savedRun.savedAt ? new Date(savedRun.savedAt).toLocaleString(lang === 'en' ? 'en-GB' : 'vi-VN') : '?'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-primary" onClick={resumeRun}>
                  <Play size={16} />
                  {t('Chơi tiếp', 'Continue')}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() =>
                    Modal.confirm({
                      title: t(`Bỏ kiếp của ${savedRun.char.name}?`, `Abandon ${savedRun.char.name}'s life?`),
                      content: t('Tiến trình này sẽ bị xóa và không lấy lại được.', 'This progress will be deleted for good.'),
                      okText: t('Xóa', 'Delete'),
                      cancelText: t('Giữ lại', 'Keep it'),
                      okButtonProps: { danger: true },
                      onOk: abandonRun
                    })
                  }
                >
                  {t('Bỏ kiếp này', 'Abandon')}
                </button>
              </div>
            </div>
          )}

          {pendingLegacy && (
            <div className="legacy">
              <div>
                <p style={{ fontWeight: 600 }}>
                  {t('Tiếp nối huyết thống', 'Continue the bloodline')} · {t('thế hệ', 'generation')} #{pendingLegacy.generation + 1}
                </p>
                <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
                  {t(
                    `Con của ${pendingLegacy.name}, mất năm ${pendingLegacy.age} tuổi. Thừa kế 「${pendingLegacy.relic}」.`,
                    `Heir of ${pendingLegacy.name}, who died at ${pendingLegacy.age}. Inherits 「${pendingLegacy.relic}」.`
                  )}
                </p>
                {pendingLegacy.hasVendetta && (
                  <p style={{ fontSize: 14, marginTop: 4, color: 'var(--bad)' }}>
                    {t('Món nợ trong Book of Vengeance cũng được truyền lại.', 'The debt in the Book of Vengeance passes down too.')}
                  </p>
                )}
              </div>
              <button type="button" className="btn" disabled={spinning} onClick={() => launch(true)}>
                <GitBranch size={16} />
                {t(`Chơi đời con của ${pendingLegacy.name}`, `Play as ${pendingLegacy.name}'s heir`)}
              </button>
            </div>
          )}

          <div className="field">
            <label htmlFor="birth-name">{t('Tên nhân vật', 'Name')}</label>
            <input
              id="birth-name"
              className="input"
              placeholder="Roland, Xiao, Kali, Yi Sang…"
              value={customName}
              onChange={(e) => setConfigField('customName', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="birth-region">{t('Nơi sinh', 'Birthplace')}</label>
            <select id="birth-region" className="select" value={selectedRegion} onChange={(e) => setConfigField('selectedRegion', e.target.value)}>
              <option value="RANDOM">{t('Ngẫu nhiên theo dân số', 'Random, by population')}</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {regionLabel(r)} · {lang === 'en' ? r.aliasEn : r.aliasVi}
                </option>
              ))}
            </select>
          </div>

          <details className="disclosure">
            <summary>{t('Seed', 'Seed')}</summary>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="input num"
                aria-label="Seed"
                placeholder={t('Tự sinh nếu để trống', 'Generated if empty')}
                value={customSeed}
                onChange={(e) => setConfigField('customSeed', e.target.value)}
              />
              <button
                type="button"
                className="btn"
                style={{ height: 44 }}
                onClick={() => setConfigField('customSeed', freshSeed())}
                aria-label={t('Seed ngẫu nhiên', 'Random seed')}
              >
                <Dices size={16} />
              </button>
            </div>
          </details>

          <button type="button" className="btn btn-primary btn-lg btn-block" disabled={spinning} onClick={() => launch(false)}>
            <Play size={17} />
            {spinning ? t('Đang quay thiên mệnh…', 'Rolling your omen…') : t('Quay thiên mệnh & chào đời', 'Roll your omen & be born')}
          </button>
        </div>
      </section>

      {/* ---------- Paths ---------- */}
      <section className="home-section" aria-labelledby="paths-title">
        <div className="home-section-head">
          <div>
            <h2 id="paths-title">{t('Những con đường trong The City', 'Paths through The City')}</h2>
            <p>{t('Bạn không chọn trước. Tuổi 18, cuộc đời sẽ đưa bạn tới ngã rẽ.', 'You don’t pick in advance. At 18, life brings you to the crossroads.')}</p>
          </div>
        </div>
        <div className="paths">
          {PATHS.map((p) => (
            <article className="path" key={p.titleEn}>
              <div className="path-text">
                <small>{t(p.kickerVi, p.kickerEn)}</small>
                <b>{t(p.titleVi, p.titleEn)}</b>
                <p>{t(p.descVi, p.descEn)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Birthplace ---------- */}
      <section className="home-section" aria-labelledby="map-title" ref={mapRef}>
        <div className="home-section-head">
          <div>
            <h2 id="map-title">{t('Nơi bạn cất tiếng khóc', 'Where you are born')}</h2>
            <p>
              {t(
                'Nơi sinh quyết định bạn lớn lên trong Nest hay Backstreets, bạn sống được bao lâu và ai sẽ để mắt tới bạn.',
                'Your birthplace decides whether you grow up in a Nest or the Backstreets, how long you live and who notices you.'
              )}
            </p>
          </div>
          <button type="button" className={`btn ${selectedRegion === 'RANDOM' ? 'btn-primary' : ''}`} onClick={() => setConfigField('selectedRegion', 'RANDOM')}>
            <Dices size={16} />
            {t('Để ngẫu nhiên', 'Leave it to chance')}
          </button>
        </div>
        <div className="birthplace">
          <div className="birthplace-map">
            <figcaption>
              {region ? (
                <>
                  <b>
                    {regionLabel(region)} · {lang === 'en' ? region.aliasEn : region.aliasVi}
                  </b>
                  <span>{lang === 'en' ? region.descEn : region.descVi}</span>
                </>
              ) : (
                <>
                  <b>{t('Ngẫu nhiên', 'Random')}</b>
                  <span>
                    {t(
                      'Phần lớn người ta sinh ra ở Backstreets. Rất ít người được sinh trong Nest của The Head.',
                      'Most people are born in the Backstreets. Very few are born in the Nests of The Head.'
                    )}
                  </span>
                </>
              )}
            </figcaption>
          </div>
          <div className="districts" role="listbox" aria-label={t('Chọn nơi sinh', 'Choose a birthplace')}>
            {districts.map((r) => (
              <button
                key={r.id}
                type="button"
                role="option"
                aria-selected={selectedRegion === r.id}
                className={`district ${selectedRegion === r.id ? 'is-on' : ''}`}
                onClick={() => setConfigField('selectedRegion', r.id)}
              >
                <b>
                  {regionLabel(r)}
                  <RegionMark r={r} t={t} />
                </b>
                <span>{lang === 'en' ? r.aliasEn : r.aliasVi}</span>
                <div className="meters">
                  <span title={t('An ninh', 'Safety')}>
                    {t('An ninh', 'Safety')} {r.unmapped ? '?' : r.safety}
                    <div className="bar">
                      <i style={{ width: r.unmapped ? 0 : `${r.safety * 10}%`, '--c': 'var(--s-health)' }} />
                    </div>
                  </span>
                  <span title={t('Giàu có', 'Wealth')}>
                    {t('Giàu có', 'Wealth')} {r.unmapped ? '?' : r.wealth}
                    <div className="bar">
                      <i style={{ width: r.unmapped ? 0 : `${r.wealth * 10}%`, '--c': 'var(--s-wealth)' }} />
                    </div>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Omens ---------- */}
      <section className="home-section" aria-labelledby="omens-title">
        <div className="home-section-head">
          <div>
            <h2 id="omens-title">{t('Thiên mệnh lúc chào đời', 'The omen at your birth')}</h2>
            <p>{t('Một trong sáu điềm sẽ được quay khi bạn chào đời. Nó đổi chỉ số khởi đầu và loại chuyện tìm đến bạn.', 'One of six omens is rolled at birth. It shifts your starting stats and the kind of trouble that finds you.')}</p>
          </div>
        </div>
        <div className="omens">
          {FATE_OMENS.map((o, i) => (
            <article key={o.id} className={`omen ${litIdx === i ? 'is-lit' : ''}`} style={{ '--omen': o.hue }}>
              <div className="omen-top">
                <b>{o.nameEn}</b>
                <span>{Math.round((o.chanceWeight / omenTotal) * 100)}%</span>
              </div>
              <span className="muted" style={{ fontSize: 14, fontWeight: 500 }}>
                {lang === 'en' ? `${o.rarityEn} · ${o.tagEn}` : `${o.rarityVi} · ${o.tagVi}`}
              </span>
              <p>{lang === 'en' ? o.descEn : o.descVi}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Memorial ---------- */}
      <section className="home-section" aria-labelledby="memorial-title">
        <div className="home-section-head">
          <div>
            <h2 id="memorial-title">{t('Đài tưởng niệm', 'Memorial')}</h2>
            <p>{t('Những người đã sống trước bạn.', 'Those who lived before you.')}</p>
          </div>
          {pastLives.length > 0 && (
            <button type="button" className="btn" onClick={() => navigate('/bloodline')}>
              {t(`Xem cả ${pastLives.length} kiếp`, `View all ${pastLives.length}`)}
            </button>
          )}
        </div>
        {pastLives.length === 0 ? (
          <p className="empty">{t('Chưa ai nằm lại đây. Kiếp sống đầu tiên của bạn sẽ là người đầu tiên.', 'No one rests here yet. Your first life will be the first.')}</p>
        ) : (
          <div className="memorial">
            {pastLives.slice(0, 6).map((life, idx) => (
              <article className="tomb" key={`${life.seed}_${idx}`}>
                <span className="tomb-age">
                  {life.age}
                  <small>{t('tuổi', 'yrs')}</small>
                </span>
                <b>
                  {life.name} <span className="muted num" style={{ fontWeight: 400, fontSize: 14 }}>· #{life.generation}</span>
                </b>
                <p>{lang === 'en' ? life.deathCauseEn || life.deathCauseVi : life.deathCauseVi}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="home-credits">
        {t(
          'Một dự án cá nhân, phi thương mại, dựa trên thế giới của Project Moon (Lobotomy Corporation, Library of Ruina, Limbus Company).',
          'A personal, non-commercial project set in Project Moon’s world (Lobotomy Corporation, Library of Ruina, Limbus Company).'
        )}
      </footer>
    </div>
  );
};

export default BirthSetupPanel;
