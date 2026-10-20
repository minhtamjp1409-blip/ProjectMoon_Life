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
import { CityBackdrop } from '../../../components/CityBackdrop';

const PATHS = [
  {
    kicker: 'Grade 9 → Color',
    title: 'Fixer',
    desc: 'Take contracts from Offices and Associations, climb the Grades, and if you live long enough, earn a Color from Hana.'
  },
  {
    kicker: 'Thumb · Index · Middle · Ring · Pinky',
    title: 'The Five Fingers',
    desc: 'The Thumb’s etiquette, the Index’s Prescripts, the Middle’s Book of Vengeance. Every Finger plays by its own rules.'
  },
  {
    kicker: 'A Wing’s Feather',
    title: 'Wing Employee',
    desc: 'Live in a Nest and work for a Singularity. Far safer than the streets, until the company decides you are expendable.'
  },
  {
    kicker: 'Tres Association',
    title: 'Workshop Craftsman',
    desc: 'Forge weapons and prosthetics for the City’s Fixers, patent your creations, and pass your masterpiece down.'
  },
  {
    kicker: 'Carmen’s Voice',
    title: 'E.G.O or Distortion',
    desc: 'When your psyche collapses, the Voice in the blinding sun calls. Stand firm to Effloresce, or surrender to Distortion.'
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
        <CityBackdrop />
        <div className="hero-copy">
          <span className="hero-kicker">PROJECT MOON // LIFE CHRONICLES</span>
          <h1 id="home-title">
            Born in <span>The City</span>
          </h1>
          <p className="hero-lead">
            Each year passes in 30 seconds. Carve your destiny across the Nest or the Backstreets—rise as a Fixer, a Syndicate enforcer, or a Wing’s Feather. Perish, and pass down your legacy to the next generation.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-light" onClick={() => mapRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              <MapPin size={17} />
              Pick Birthplace on Map
            </button>
            <button type="button" className="btn btn-light" onClick={() => navigate('/bloodline')}>
              <ScrollText size={17} />
              View Bloodline Archives
            </button>
          </div>
          <div className="hero-stats">
            <div>
              <b>{livesLived}</b>
              <span>Lives Lived</span>
            </div>
            <div>
              <b>#{highestGen}</b>
              <span>Deepest Gen</span>
            </div>
            <div>
              <b>
                {globalCodex.length}/{CODEX_RECORDS.length}
              </b>
              <span>Codex Milestones</span>
            </div>
          </div>
        </div>

        <div className="create">
          <div>
            <h2>Birth Record // Identity Dossier</h2>
            <p className="create-sub">Leave any field empty and The City decides.</p>
          </div>

          {savedRun && (
            <div className="resume">
              <div>
                <b>
                  Life in progress: {savedRun.char.name}, {savedRun.char.age} yrs
                </b>
                <p className="muted" style={{ fontSize: 14, marginTop: 2 }}>
                  Saved {savedRun.savedAt ? new Date(savedRun.savedAt).toLocaleString('en-GB') : '?'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-primary" onClick={resumeRun}>
                  <Play size={16} />
                  Resume Run
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() =>
                    Modal.confirm({
                      title: `Abandon ${savedRun.char.name}'s life?`,
                      content: 'This progress will be deleted for good and cannot be recovered.',
                      okText: 'Delete',
                      cancelText: 'Keep it',
                      okButtonProps: { danger: true },
                      onOk: abandonRun
                    })
                  }
                >
                  Abandon
                </button>
              </div>
            </div>
          )}

          {pendingLegacy && (() => {
            const rel = pendingLegacy.successorRelation || (pendingLegacy.age < 14 ? 'sibling' : pendingLegacy.age < 18 ? 'companion' : pendingLegacy.hasChild ? 'child' : 'heir');
            let header = `Bloodline Succession · Generation #${pendingLegacy.generation + 1}`;
            let desc = `Direct heir of ${pendingLegacy.name}, who died at age ${pendingLegacy.age}. Inherits 「${pendingLegacy.relic}」.`;
            let btn = `Play as ${pendingLegacy.name}'s Heir`;

            if (rel === 'sibling') {
              header = `Legacy Heirloom · Generation #${pendingLegacy.generation + 1}`;
              desc = `${pendingLegacy.name} died young at age ${pendingLegacy.age}. You are a younger sibling (or local child) who found 「${pendingLegacy.relic}」.`;
              btn = `Play as ${pendingLegacy.name}'s Sibling`;
            } else if (rel === 'companion') {
              header = `Inherited Will · Generation #${pendingLegacy.generation + 1}`;
              desc = `${pendingLegacy.name} fell at age ${pendingLegacy.age} before starting a family. You carry on their will and 「${pendingLegacy.relic}」.`;
              btn = `Carry on ${pendingLegacy.name}'s Legacy`;
            } else if (rel === 'heir') {
              header = `Legacy Succession · Generation #${pendingLegacy.generation + 1}`;
              desc = `${pendingLegacy.name} passed away at age ${pendingLegacy.age} with no children. You inherit their 「${pendingLegacy.relic}」.`;
              btn = `Play as ${pendingLegacy.name}'s Successor`;
            }

            return (
              <div className="legacy">
                <div>
                  <p style={{ fontWeight: 600 }}>
                    {header}
                  </p>
                  <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
                    {desc}
                  </p>
                  {pendingLegacy.hasVendetta && (
                    <p style={{ fontSize: 14, marginTop: 4, color: 'var(--bad)' }}>
                      The blood debt in the Book of Vengeance passes down as well.
                    </p>
                  )}
                </div>
                <button type="button" className="btn btn-block" disabled={spinning} onClick={() => launch(true)}>
                  <GitBranch size={16} />
                  {btn}
                </button>
              </div>
            );
          })()}

          <div className="field">
            <label htmlFor="birth-name">Identity / Name</label>
            <input
              id="birth-name"
              className="input"
              placeholder="Roland, Xiao, Kali, Yi Sang…"
              value={customName}
              onChange={(e) => setConfigField('customName', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="birth-region">Birthplace / District</label>
            <select id="birth-region" className="select" value={selectedRegion} onChange={(e) => setConfigField('selectedRegion', e.target.value)}>
              <option value="RANDOM">Random, weighted by population</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nameEn} · {r.aliasEn}
                </option>
              ))}
            </select>
          </div>

          <details className="disclosure">
            <summary>+ Custom World Seed</summary>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="input num"
                aria-label="Seed"
                placeholder="Generated if empty"
                value={customSeed}
                onChange={(e) => setConfigField('customSeed', e.target.value)}
              />
              <button
                type="button"
                className="btn"
                style={{ height: 44 }}
                onClick={() => setConfigField('customSeed', freshSeed())}
                aria-label="Random seed"
              >
                <Dices size={16} />
              </button>
            </div>
          </details>

          <button type="button" className="btn btn-primary btn-lg btn-block hero-start-btn" disabled={spinning} onClick={() => launch(false)}>
            <Play size={17} />
            {spinning ? 'Rolling Destiny…' : 'Roll Destiny & Enter The City'}
          </button>
        </div>
      </section>

      {/* ---------- Paths ---------- */}
      <section className="home-section" aria-labelledby="paths-title">
        <div className="home-section-head">
          <div>
            <h2 id="paths-title">Paths Across The City</h2>
            <p>You do not choose in advance. At age 18, life brings you to the crossroads.</p>
          </div>
        </div>
        <div className="paths">
          {PATHS.map((p) => (
            <article className="path" key={p.title}>
              <div className="path-text">
                <small>{p.kicker}</small>
                <b>{p.title}</b>
                <p>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Birthplace ---------- */}
      <section className="home-section" aria-labelledby="map-title" ref={mapRef}>
        <div className="home-section-head">
          <div>
            <h2 id="map-title">Where You Are Born // District Matrix</h2>
            <p>
              Your birthplace decides whether you grow up in a Nest or the Backstreets, your life expectancy, and who notices you.
            </p>
          </div>
          <button type="button" className={`btn ${selectedRegion === 'RANDOM' ? 'btn-primary' : ''}`} onClick={() => setConfigField('selectedRegion', 'RANDOM')}>
            <Dices size={16} />
            Random District
          </button>
        </div>
        <div className="birthplace">
          <div className="birthplace-map">
            <figcaption>
              {region ? (
                <>
                  <b>
                    {region.nameEn} · {region.aliasEn}
                  </b>
                  <span>{region.descEn}</span>
                </>
              ) : (
                <>
                  <b>Random District</b>
                  <span>
                    Most people are born in the Backstreets. Very few are born in the Nests of The Head.
                  </span>
                </>
              )}
            </figcaption>
          </div>
          <div className="districts" role="listbox" aria-label="Choose a birthplace">
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
                  {r.nameEn}
                  <RegionMark r={r} t={t} />
                </b>
                <span>{r.aliasEn}</span>
                <div className="meters">
                  <span title="Safety">
                    Safety {r.unmapped ? '?' : r.safety}
                    <div className="bar">
                      <i style={{ width: r.unmapped ? 0 : `${r.safety * 10}%`, '--c': 'var(--s-health)' }} />
                    </div>
                  </span>
                  <span title="Wealth">
                    Wealth {r.unmapped ? '?' : r.wealth}
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
            <h2 id="omens-title">Natal Fate Omens</h2>
            <p>One of six omens is rolled upon birth. It shifts your initial stats, karma threads, and the troubles that find you.</p>
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
                {`${o.rarityEn} · ${o.tagEn}`}
              </span>
              <p>{o.descEn}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Memorial ---------- */}
      <section className="home-section" aria-labelledby="memorial-title">
        <div className="home-section-head">
          <div>
            <h2 id="memorial-title">Memorial of Fallen Lives</h2>
            <p>Those who walked before you in The City.</p>
          </div>
          {pastLives.length > 0 && (
            <button type="button" className="btn" onClick={() => navigate('/bloodline')}>
              {`View All ${pastLives.length} Lives`}
            </button>
          )}
        </div>
        {pastLives.length === 0 ? (
          <p className="empty">No one rests here yet. Your first life will be the first inscription.</p>
        ) : (
          <div className="memorial">
            {pastLives.slice(0, 6).map((life, idx) => (
              <article className="tomb" key={`${life.seed}_${idx}`}>
                <span className="tomb-age">
                  {life.age}
                  <small>yrs</small>
                </span>
                <b>
                  {life.name} <span className="muted num" style={{ fontWeight: 400, fontSize: 14 }}>· #{life.generation}</span>
                </b>
                <p>{life.deathCauseEn || life.deathCauseVi}</p>
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
