import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { GitBranch, Download, RotateCcw, Hammer } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../../../store/gameStore';
import { buildLifeSummaryAndLegacy } from '../../../engine/gameEngine';
import { MINOR_WINDOW_MS, splitTitle } from '../../../engine/yearPlanner';
import { exportDossierCardPNG } from '../../../utils/exportDossierCard';
import { audioEngine } from '../../../engine/audioEngine';
import { gameFeel } from '../../../engine/gameFeel';
import { useT } from '../../../i18n';
import { Deltas, ChoicePreview } from './Deltas';
import { getPsycheInterjection, evaluateDiscoChoiceCheck } from '../../../engine/discoPsyche';

const ENTRY_KIND = {
  causal: { cls: 'k-causal', vi: 'Causal Echo', en: 'Causal Echo' },
  miracle: { cls: 'k-good', vi: 'Turning Point', en: 'Turning Point' },
  promo: { cls: 'k-good', vi: 'Promotion', en: 'Promotion' },
  danger: { cls: 'k-bad', vi: 'Danger', en: 'Danger' },
  death: { cls: 'k-death', vi: 'Death', en: 'Death' },
  summary: { cls: 'k-summary', vi: 'Year-End Reckoning', en: 'Year-End Reckoning' },
  choice: { cls: 'k-choice', vi: 'Decision', en: 'Decision' },
  lore: { cls: 'k-lore', vi: 'Chronicle Lore', en: 'Chronicle Lore' },
  daily: { cls: 'k-daily', vi: 'Life Friction', en: 'Life Friction' },
  contract: { cls: 'k-contract', vi: 'Fixer Contract', en: 'Fixer Contract' }
};

const WORKSHOP_STYLES = [
  'Mook Workshop · Katana Cắt Không Gian',
  'Wheels Industry · Đại Kiếm Nghiền Chấn',
  'Atelier Logic · Súng Trường Công Phá',
  'Stigma Workshop · Thương Lửa Khắc Ấn'
];

const FX_TEXT = {
  death: ['Kiếp sống khép lại', 'A life ends'],
  ego: ['E.G.O', 'E.G.O'],
  distort: ['Distortion', 'Distortion'],
  loss: ['Mất mát', 'Loss'],
  gold: null,
  blood: null,
  echo: null
};

/* ---------- Story log ---------- */

const LogEntries = React.memo(function LogEntries({ logs }) {
  const { t, lang, bilingual } = useT();
  const out = [];
  let lastAge = null;
  let lastSeasonId = null;

  logs.forEach((entry) => {
    if (entry.age !== lastAge) {
      lastAge = entry.age;
      lastSeasonId = entry.season?.id || null;
      out.push(
        <div className="yearline" key={`y_${entry.id}`}>
          <span>
            <b>{t(`Tuổi ${entry.age}`, `Age ${entry.age}`)}</b>
            {entry.season ? ` · ${t(entry.season.vi, entry.season.en)}` : ''}
          </span>
        </div>
      );
    } else if (entry.season && entry.season.id !== lastSeasonId) {
      lastSeasonId = entry.season.id;
      out.push(
        <div className="season-divider" key={`s_${entry.id}`}>
          <span className="season-divider-line" />
          <span className="season-divider-badge">{t(entry.season.vi, entry.season.en)}</span>
          <span className="season-divider-line" />
        </div>
      );
    }
    const kind = ENTRY_KIND[entry.type];
    const raw = lang === 'en' ? entry.en || entry.vi : entry.vi;
    // Older events open with "[Title]"; show it as the entry's tag instead of inline
    const { title, body } = splitTitle(raw);
    const tag = entry.omen ? t('Điềm lúc chào đời', 'Omen at birth') : title || (kind?.vi ? t(kind.vi, kind.en) : null);
    out.push(
      <article className={`entry ${kind?.cls || ''}`} key={entry.id}>
        <div className="entry-header-row">
          {entry.season && <span className="entry-season-badge">{t(entry.season.vi, entry.season.en)}</span>}
          {tag && <p className="entry-tag">{tag}</p>}
        </div>
        {entry.choiceVi && (
          <p className="entry-choice">
            {t('Bạn chọn: ', 'You chose: ')}
            {lang === 'en' ? entry.choiceEn || entry.choiceVi : entry.choiceVi}
          </p>
        )}
        {entry.passed && <p className="entry-choice is-muted">{t('Bạn để nó trôi qua.', 'You let it pass.')}</p>}
        <p className="entry-text">{body}</p>
        {bilingual && entry.en && entry.en !== entry.vi && <p className="entry-alt">{splitTitle(entry.en).body}</p>}
        <Deltas deltas={entry.deltas} />
      </article>
    );
  });

  return out;
});

const StageFx = () => {
  const { t } = useT();
  const fx = useGameStore((s) => s.stageFx);
  if (!fx) return null;
  const label = FX_TEXT[fx.kind];
  return (
    <div key={fx.at} className={`stage-fx fx-${fx.kind}`} aria-hidden="true">
      {label && <span className="stage-fx-word">{t(...label)}</span>}
    </div>
  );
};

const AmbientScene = ({ char }) => {
  let sceneClass = 'scene-blade';
  if (!char.alive) {
    sceneClass = 'scene-hatch red';
  } else if ((char.heat || 0) >= 50 || (char.taboo || 0) >= 2) {
    sceneClass = 'scene-hatch';
  } else if ((char.resonance || 0) >= 40 || char.fateOmenId?.includes('star')) {
    sceneClass = 'scene-star';
  } else if (char.regionId === '11' || char.regionId === '23') {
    sceneClass = 'scene-warp';
  } else if (char.job === 'Syndicate') {
    sceneClass = 'scene-kong';
  }
  return <div className={`scene on ${sceneClass}`} aria-hidden="true" />;
};

/* ---------- Decision docks ---------- */

const MinorDock = ({ prompt, npcs, paused, onPick }) => {
  const { t, lang, bilingual } = useT();
  return (
    <div className="dock is-minor" role="dialog" aria-label={t('Một lựa chọn nhỏ', 'A small choice')}>
      <div className="dock-inner">
        <div className="countdown" aria-hidden="true">
          <i key={prompt.id} style={{ animationDuration: `${MINOR_WINDOW_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }} />
        </div>
        <p className="dock-text">{lang === 'en' ? prompt.en : prompt.vi}</p>
        {bilingual && <p className="entry-alt">{prompt.en}</p>}
        <div className="choices">
          {prompt.choices.map((ch, idx) => (
            <button type="button" key={idx} className="choice" onClick={() => onPick(idx)}>
              <kbd>{idx + 1}</kbd>
              <span>
                <span className="choice-label">{lang === 'en' ? ch.en : ch.vi}</span>
                <ChoicePreview choice={ch} npcs={npcs} />
              </span>
            </button>
          ))}
          <button type="button" className="choice is-ghost" onClick={() => onPick(-1)}>
            <kbd>0</kbd>
            <span className="choice-label">{t(prompt.ignore?.vi || 'Để nó trôi qua', prompt.ignore?.en || 'Let it pass')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const EventDock = ({ event, char, onPick }) => {
  const { t, lang, bilingual } = useT();
  const causal = event.isCausalCallback;
  const title = lang === 'en' ? event.titleEn || event.titleVi : event.titleVi;
  const psyche = getPsycheInterjection(char, event, lang);

  return (
    <div className="dock" role="dialog" aria-label={t('Sự kiện cần quyết định', 'Decision')}>
      <div className="dock-inner">
        <div className="dock-banner">
          <div className="dock-banner-text">
            <p className={`dock-kicker ${causal ? 'is-causal' : ''}`}>
              {causal ? 'Causal Echo · Time stops' : t(`Tuổi ${char.age} · thời gian dừng lại`, `Age ${char.age} · time stops`)}
            </p>
            <p className="dock-title">{title || t('Bạn sẽ làm gì?', 'What will you do?')}</p>
          </div>
        </div>

        {causal && (event.causalReasonVi || event.causalReasonEn) && (
          <div className="causal-echo-badge">
            <span className="causal-icon">⟲</span>
            <span className="causal-text">
              {lang === 'en' ? (event.causalReasonEn || event.causalReasonVi) : (event.causalReasonVi || event.causalReasonEn)}
            </span>
          </div>
        )}

        <p className="dock-text">{lang === 'en' ? event.displayEn || event.displayVi : event.displayVi}</p>
        {bilingual && event.displayEn && <p className="entry-alt">{event.displayEn}</p>}

        {psyche && (
          <div className="disco-psyche-card" style={{ borderLeftColor: psyche.faculty.color }}>
            <div className="disco-psyche-header">
              <span className="disco-psyche-icon">{psyche.faculty.icon}</span>
              <span className="disco-psyche-faculty" style={{ color: psyche.faculty.color }}>
                {lang === 'en' ? psyche.faculty.nameEn : psyche.faculty.nameVi}
              </span>
            </div>
            <p className="disco-psyche-voice">
              {lang === 'en' ? psyche.textEn : psyche.textVi}
            </p>
          </div>
        )}

        <div className="choices">
          {(event.choices || []).map((ch, idx) => {
            const label = splitTitle(lang === 'en' ? ch.labelEn || ch.labelVi : ch.labelVi).body;
            const check = evaluateDiscoChoiceCheck(ch, char);
            const extra = [];
            if (Array.isArray(ch.scheduleConsequences) && ch.scheduleConsequences.length > 0) {
              extra.push(
                <span className="delta is-rare is-static" key="c">
                  {t(`Hậu quả sau ${ch.scheduleConsequences[0].delayYears} năm`, `Consequence in ${ch.scheduleConsequences[0].delayYears} yrs`)}
                </span>
              );
            }
            if (Array.isArray(ch.scarsAdd) && ch.scarsAdd.length > 0) {
              extra.push(
                <span className="delta is-down is-static" key="s">
                  {t('Sẹo: ', 'Scar: ')}
                  {ch.scarsAdd[0]}
                </span>
              );
            }
            if (ch.setJob) extra.push(<span className="delta is-bond is-static" key="j">{t('Con đường: ', 'Path: ')}{ch.setJob}</span>);
            return (
              <button type="button" key={idx} className="choice" onClick={() => onPick(idx)}>
                <kbd>{idx + 1}</kbd>
                <span>
                  <span className="choice-label">{label}</span>
                  {bilingual && ch.labelEn && ch.labelEn !== ch.labelVi && <span className="choice-alt">{splitTitle(ch.labelEn).body}</span>}
                  
                  {check && (
                    <div className={`disco-check-pill ${check.isRedCheck ? 'is-red' : 'is-white'}`}>
                      <span className="check-tag">🎲 {lang === 'en' ? check.badgeEn : check.badgeVi}: <b>{check.successPct}%</b></span>
                      {check.modifiers.map((m, mIdx) => (
                        <span key={mIdx} className={`check-mod ${m.pos ? 'is-pos' : 'is-neg'}`}>
                          {lang === 'en' ? m.labelEn : m.labelVi}
                        </span>
                      ))}
                    </div>
                  )}

                  <ChoicePreview choice={ch} npcs={char.npcs} />
                  {extra.length > 0 && <span className="preview">{extra}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ContractDock = ({ contract, wealth, onPick }) => {
  const { t, lang } = useT();

  return (
    <div className="dock" role="dialog" aria-label={t('Request của Fixer', 'Fixer request')}>
      <div className="dock-inner">
        <div className="dock-banner">
          <div className="dock-banner-text">
            <p className="dock-kicker">
              {t('Request · ', 'Request · ')}
              {lang === 'en' ? contract.tierInfo.nameEn : contract.tierInfo.nameVi}
            </p>
            <p className="dock-title">{lang === 'en' ? contract.template.typeEn : contract.template.typeVi}</p>
          </div>
        </div>

        <p className="dock-text">{lang === 'en' ? contract.template.en : contract.template.vi}</p>

        <div className="choices">
          {contract.approaches.map((app, idx) => {
            const short = app.costAhn > wealth;
            return (
              <button type="button" key={app.id} className="choice" disabled={short} onClick={() => onPick(app.id)}>
                <kbd>{idx + 1}</kbd>
                <span>
                  <span style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <span className="choice-label">{lang === 'en' ? app.labelEn : app.labelVi}</span>
                    <span className="num muted" style={{ fontSize: 14, whiteSpace: 'nowrap' }}>
                      +{app.payAhn} Ahn · +{app.meritGain} Merit
                    </span>
                  </span>
                  <span className="odds">
                    <span className="stack-bar" aria-hidden="true">
                      <i style={{ width: `${app.successPct}%`, background: 'var(--good)' }} />
                      <i style={{ width: `${app.failPct}%`, background: 'var(--warn)' }} />
                      <i style={{ width: `${app.deathPct}%`, background: 'var(--bad)' }} />
                    </span>
                    <span className="odds-legend">
                      <span><i className="dot" style={{ background: 'var(--good)' }} />{t('Thành công', 'Success')} {app.successPct}%</span>
                      <span><i className="dot" style={{ background: 'var(--warn)' }} />{t('Thất bại', 'Fail')} {app.failPct}%</span>
                      <span><i className="dot" style={{ background: 'var(--bad)' }} />{t('Tử trận', 'Death')} {app.deathPct}%</span>
                    </span>
                  </span>
                  {short && (
                    <span className="preview">
                      <span className="delta is-down is-static">{t(`Cần ${app.costAhn} Ahn`, `Needs ${app.costAhn} Ahn`)}</span>
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ---------- End of a life ---------- */

const Epitaph = ({ summary, onInherit, onRestart }) => {
  const { t, lang } = useT();
  return (
    <section className="epitaph" aria-label={t('Bia mộ', 'Epitaph')}>
      <div className="epitaph-body">
        <p className="epitaph-age">
          {summary.age}
          <span>{t('tuổi', 'years')}</span>
        </p>
        <h2 className="epitaph-name">{summary.name}</h2>
        <p className="epitaph-cause">{lang === 'en' ? summary.deathCauseEn : summary.deathCauseVi}</p>
        <p className="epitaph-title">{lang === 'en' ? summary.epitaphTitleEn : summary.epitaphTitleVi}</p>

        <div className="epitaph-facts">
          <div>
            <span>{t('Thế hệ', 'Generation')}</span>
            <b className="num">#{summary.generation}</b>
          </div>
          <div>
            <span>{t('Cấp đe dọa', 'Threat tier')}</span>
            <b>{summary.rankTier}</b>
          </div>
          <div>
            <span>{t('Di vật để lại', 'Relic left behind')}</span>
            <b>{summary.relic}</b>
          </div>
        </div>

        <div className="epitaph-actions">
          <button type="button" className="btn btn-primary btn-lg" onClick={onInherit}>
            <GitBranch size={16} />
            {summary.age < 14
              ? t(`Chơi đời em · thế hệ #${summary.generation + 1}`, `Play as sibling · gen #${summary.generation + 1}`)
              : summary.age < 18 || !summary.hasChild
                ? t(`Kế thừa di vật · thế hệ #${summary.generation + 1}`, `Inherit legacy · gen #${summary.generation + 1}`)
                : t(`Chơi đời con · thế hệ #${summary.generation + 1}`, `Play the heir · gen #${summary.generation + 1}`)}
          </button>
          <button type="button" className="btn btn-lg" onClick={() => exportDossierCardPNG(summary)}>
            <Download size={16} />
            {t('Tải thẻ PNG', 'Download PNG')}
          </button>
          <button type="button" className="btn btn-ghost btn-lg" onClick={onRestart}>
            <RotateCcw size={16} />
            {t('Kiếp mới từ đầu', 'Start over')}
          </button>
        </div>
      </div>
    </section>
  );
};

/* ---------- Stage ---------- */

export const LiveStageFeed = () => {
  const { t } = useT();
  const { char, speed, setSpeed, chooseMinor, selectEventChoice, selectContractApproach, confirmColorTitle, confirmEgoName, completeWorkshopCraft, startLife, abandonRun } =
    useGameStore(
      useShallow((s) => ({
        char: s.char,
        speed: s.speed,
        setSpeed: s.setSpeed,
        chooseMinor: s.chooseMinor,
        selectEventChoice: s.selectEventChoice,
        selectContractApproach: s.selectContractApproach,
        confirmColorTitle: s.confirmColorTitle,
        confirmEgoName: s.confirmEgoName,
        completeWorkshopCraft: s.completeWorkshopCraft,
        startLife: s.startLife,
        abandonRun: s.abandonRun
      }))
    );

  const logRef = useRef(null);
  const stageRef = useRef(null);
  const prevAliveRef = useRef(char.alive);
  const [titleInput, setTitleInput] = useState('The Crimson Dusk');
  const [egoInput, setEgoInput] = useState('Penitence of Ash');
  const [weaponName, setWeaponName] = useState('Atelier Crimson Edge');
  const [weaponStyle, setWeaponStyle] = useState(WORKSHOP_STYLES[0]);
  const [cursorPos, setCursorPos] = useState(50);
  const [strikes, setStrikes] = useState([]);
  const dirRef = useRef(1);

  // Trauma-based screen shake on stage element (following game-feel skill)
  useEffect(() => {
    return gameFeel.subscribe(({ x, y, rot, isShaking }) => {
      if (!stageRef.current) return;
      if (isShaking) {
        stageRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(4)}rad)`;
      } else {
        stageRef.current.style.transform = '';
      }
    });
  }, []);

  // Death audio & traumatic hit-stop
  useEffect(() => {
    if (prevAliveRef.current && !char.alive) {
      audioEngine.playDeath();
      gameFeel.addTrauma(0.85);
      gameFeel.triggerHitStop(220);
    }
    prevAliveRef.current = char.alive;
  }, [char.alive]);

  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    const epitaph = el.querySelector('.epitaph');
    // At death, bring the epitaph's top into view rather than its last button
    if (epitaph) el.scrollTo({ top: Math.min(el.scrollHeight, epitaph.offsetTop - 24), behavior: 'smooth' });
    else el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [char.logs.length, char.alive, char.pendingEvent, char.pendingContract, char.pendingMinor]);

  const handleChooseMinor = (idx) => {
    audioEngine.playClick();
    chooseMinor(idx);
  };

  const handleSelectEvent = (idx) => {
    audioEngine.playClick();
    selectEventChoice(idx);
  };

  const handleSelectContract = (id) => {
    audioEngine.playClick();
    selectContractApproach(id);
  };

  const handleConfirmColorTitle = (title) => {
    audioEngine.playEgo();
    confirmColorTitle(title);
  };

  const handleConfirmEgoName = (name) => {
    audioEngine.playEgo();
    confirmEgoName(name);
  };

  // Keys: 1–9 pick, 0 / Esc lets a small moment pass, Space pauses, M toggles mute, S saves
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (e.code === 'Space') {
        if (!char.alive) return;
        e.preventDefault();
        audioEngine.playClick();
        setSpeed(speed === 0 ? 1 : 0);
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        audioEngine.toggleMute();
        return;
      }
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        audioEngine.playClick();
        useGameStore.getState().saveRun(true);
        return;
      }
      if (char.pendingMinor && (e.key === '0' || e.key === 'Escape')) {
        e.preventDefault();
        handleChooseMinor(-1);
        return;
      }
      const idx = parseInt(e.key, 10) - 1;
      if (Number.isNaN(idx) || idx < 0) return;
      if (char.pendingEvent && idx < (char.pendingEvent.choices?.length || 0)) {
        e.preventDefault();
        handleSelectEvent(idx);
      } else if (char.pendingContract && idx < (char.pendingContract.approaches?.length || 0)) {
        const app = char.pendingContract.approaches[idx];
        if (app.costAhn > char.stats.wealth) return;
        e.preventDefault();
        handleSelectContract(app.id);
      } else if (char.pendingMinor && idx < char.pendingMinor.choices.length) {
        e.preventDefault();
        handleChooseMinor(idx);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [char.alive, char.pendingEvent, char.pendingContract, char.pendingMinor, char.stats.wealth, speed, setSpeed, chooseMinor, selectEventChoice, selectContractApproach]);

  // Forge mini-game: the cursor sweeps while the craft modal is open
  useEffect(() => {
    if (char.pendingModal !== 'craft_weapon' || strikes.length >= 3) return undefined;
    const timer = setInterval(() => {
      setCursorPos((prev) => {
        let next = prev + dirRef.current * 3.8;
        if (next >= 96) {
          next = 96;
          dirRef.current = -1;
        } else if (next <= 4) {
          next = 4;
          dirRef.current = 1;
        }
        return next;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [char.pendingModal, strikes.length]);

  const handleForgeStrike = () => {
    if (strikes.length >= 3) return;
    const dist = Math.abs(cursorPos - 52);
    audioEngine.playClick();
    setStrikes((prev) => [...prev, dist <= 10 ? 100 : dist <= 22 ? 85 : 68]);
  };

  const forgeQuality = strikes.length ? Math.round(strikes.reduce((a, b) => a + b, 0) / strikes.length) : 0;
  const lifeSummary = !char.alive ? buildLifeSummaryAndLegacy(char) : null;

  return (
    <div className="stage" ref={stageRef}>
      <AmbientScene char={char} />
      <StageFx />
      <div className="log" ref={logRef}>
        <div className="log-col">
          <LogEntries logs={char.logs} />
          {lifeSummary && <Epitaph summary={lifeSummary} onInherit={() => startLife(true)} onRestart={abandonRun} />}
        </div>
      </div>

      {char.pendingEvent && <EventDock event={char.pendingEvent} char={char} onPick={handleSelectEvent} />}
      {!char.pendingEvent && char.pendingContract && <ContractDock contract={char.pendingContract} wealth={char.stats.wealth} onPick={handleSelectContract} />}
      {!char.pendingEvent && !char.pendingContract && char.pendingMinor && (
        <MinorDock prompt={char.pendingMinor} npcs={char.npcs} paused={speed === 0} onPick={handleChooseMinor} />
      )}

      <Modal open={char.pendingModal === 'color_title'} footer={null} closable={false} centered title={t('Hana Association trao Color', 'Hana Association grants a Color')}>
        <div className="stack" style={{ paddingTop: 4 }}>
          <p className="muted">
            {t('Hana Association công nhận bạn là một Color Fixer. Cả 26 District sẽ gọi bạn bằng danh hiệu này.', 'Hana Association recognises you as a Color Fixer. All 26 Districts will call you by this title.')}
          </p>
          <div className="field">
            <label htmlFor="color-title">{t('Danh hiệu', 'Title')}</label>
            <input id="color-title" className="input" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
          </div>
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => confirmColorTitle(titleInput)}>
            {t('Khắc danh hiệu', 'Engrave the title')}
          </button>
        </div>
      </Modal>

      <Modal open={char.pendingModal === 'ego_name'} footer={null} closable={false} centered title={t('E.G.O khai hoa', 'Your E.G.O effloresces')}>
        <div className="stack" style={{ paddingTop: 4 }}>
          <p className="muted">
            {t('Bạn khước từ giọng nói của Carmen và biến vết sẹo thành sức mạnh của riêng mình. Hãy đặt tên cho E.G.O.', 'You refused Carmen’s voice and turned your scars into your own power. Name your E.G.O.')}
          </p>
          <div className="field">
            <label htmlFor="ego-name">{t('Tên E.G.O', 'E.G.O name')}</label>
            <input id="ego-name" className="input" value={egoInput} onChange={(e) => setEgoInput(e.target.value)} />
          </div>
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => confirmEgoName(egoInput)}>
            {t('Thức tỉnh E.G.O', 'Awaken the E.G.O')}
          </button>
        </div>
      </Modal>

      <Modal open={char.pendingModal === 'craft_weapon'} footer={null} closable={false} centered title={t('Lò rèn Workshop', 'Workshop forge')}>
        <div className="stack" style={{ paddingTop: 4 }}>
          <div className="panel" style={{ padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }} className="muted num">
              <span>
                {t('Nhiệt độ', 'Heat')} {Math.round(cursorPos * 14)}°C
              </span>
              <span>
                {t('Nhát búa', 'Strikes')} {strikes.length} / 3
              </span>
            </div>
            <div style={{ position: 'relative', height: 18, marginTop: 10, borderRadius: 4, background: 'var(--active)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '40%', width: '24%', background: 'var(--accent-soft)' }} />
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${cursorPos}%`, width: 3, background: 'var(--text)' }} />
            </div>
            {strikes.length < 3 ? (
              <button type="button" className="btn btn-block" style={{ marginTop: 12 }} onClick={handleForgeStrike}>
                <Hammer size={15} />
                {t('Giáng búa khi vạch trắng ở giữa dải vàng', 'Strike when the white line is inside the gold band')}
              </button>
            ) : (
              <p className="num" style={{ marginTop: 12, fontSize: 15 }}>
                {t('Chất lượng rèn', 'Forge quality')}: {forgeQuality} / 100
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="weapon-name">{t('Tên vũ khí', 'Weapon name')}</label>
            <input id="weapon-name" className="input" value={weaponName} onChange={(e) => setWeaponName(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="weapon-style">{t('Trường phái Workshop', 'Workshop style')}</label>
            <select id="weapon-style" className="select" value={weaponStyle} onChange={(e) => setWeaponStyle(e.target.value)}>
              {WORKSHOP_STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => {
              completeWorkshopCraft({
                name: weaponName.trim() || 'Atelier Crimson Edge',
                style: weaponStyle,
                quality: forgeQuality || 68,
                gradeLabel: forgeQuality >= 95 ? 'Masterpiece' : forgeQuality >= 80 ? 'Fine Work' : 'Standard'
              });
              setStrikes([]);
            }}
          >
            {t('Hoàn tất & đăng ký với Tres Association', 'Finish & register with Tres Association')}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LiveStageFeed;
