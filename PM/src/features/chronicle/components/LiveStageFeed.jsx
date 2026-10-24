import { choiceIsAvailable } from '../../../engine/eventConditions.js';
import { ITEMS_CATALOG } from '../../../data/itemsData.js';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { GitBranch, Download, RotateCcw, Hammer, ChevronDown, Eye, EyeOff, BookOpen, Copy, Check, House } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../../../store/gameStore';
import { buildLifeSummaryAndLegacy, getDungeonCurrentStage, isDungeonChoiceAvailable, DUNGEON_DEFINITIONS } from '../../../engine/gameEngine';
import { DungeonDock } from './DungeonDock';
import { YearLeadDock } from './YearLeadDock';
import { DungeonBackdrop } from './DungeonBackdrop';
import { LIFE_MINORS, MINOR_WINDOW_MS, splitTitle } from '../../../engine/yearPlanner';
import { exportDossierCardPNG } from '../../../utils/exportDossierCard';
import { audioEngine } from '../../../engine/audioEngine';
import { gameFeel } from '../../../engine/gameFeel';
import { useT } from '../../../i18n';
import { Deltas, ChoicePreview } from './Deltas';
import { getPsycheInterjection, evaluateDiscoChoiceCheck } from '../../../engine/discoPsyche';
import { bestowHanaColorTitle, getBranchSceneMeta } from '../../../engine/colorRegistry';

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
  contract: { cls: 'k-contract', vi: 'Contract', en: 'Contract' }
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

const storyParts = (entry, lang) => {
  const raw = lang === 'en' ? entry.en || entry.vi : entry.vi;
  const { title, body } = splitTitle(raw);
  const reviewRaw = entry.review && (lang === 'en' ? entry.review.en || entry.review.vi : entry.review.vi);
  const reviewBody = reviewRaw ? splitTitle(reviewRaw).body : '';
  const repeatedPrompt = Boolean(reviewBody && body.startsWith(reviewBody));
  return {
    title,
    situation: repeatedPrompt ? reviewBody : '',
    result: repeatedPrompt ? body.slice(reviewBody.length).trim() : body,
    reviewBody: repeatedPrompt ? '' : reviewBody
  };
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
    const { title, situation, result, reviewBody } = storyParts(entry, lang);
    const tag = entry.omen ? t('Điềm lúc chào đời', 'Omen at birth') : title || (kind?.vi ? t(kind.vi, kind.en) : null);
    out.push(
      <article className={`entry ${kind?.cls || ''}`} key={entry.id}>
        {/* The yearline and season dividers above already say when; the card only says what */}
        {tag && (
          <div className="entry-header-row">
            <p className="entry-tag">{tag}</p>
          </div>
        )}
        {entry.choiceVi && (
          <p className="entry-choice">
            {t('Bạn chọn: ', 'You chose: ')}
            {lang === 'en' ? entry.choiceEn || entry.choiceVi : entry.choiceVi}
          </p>
        )}
        {entry.passed && <p className="entry-choice is-muted">{t('Bạn để nó trôi qua.', 'You let it pass.')}</p>}
        {situation && <p className="entry-text">{situation}</p>}
        {result && <p className={`entry-text ${entry.choiceVi || entry.passed ? 'is-result' : ''}`}>{result}</p>}
        {bilingual && entry.en && entry.en !== entry.vi && <p className="entry-alt">{splitTitle(entry.en).body}</p>}
        {entry.review && (
          <details className="entry-review">
            <summary>{t('Xem lại sự kiện và lựa chọn', 'Review event and choices')}</summary>
            {reviewBody && <p>{reviewBody}</p>}
            <ol>
              {entry.review.choices.map((option, index) => (
                <li key={index} className={index === entry.review.selected ? 'is-selected' : ''}>
                  {lang === 'en' ? option.en || option.vi : option.vi}
                  {index === entry.review.selected && ` ${t('· Đã chọn', '· Chosen')}`}
                </li>
              ))}
            </ol>
          </details>
        )}
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
  const meta = getBranchSceneMeta(char);
  const colorData = char?.colorData;

  const style = meta.isColor && colorData?.color ? {
    '--apex-color': colorData.color,
    '--apex-glow': colorData.glow || 'rgba(212, 175, 55, 0.4)'
  } : {};

  return (
    <div className={`scene on ${meta.sceneClass}`} style={style} aria-hidden="true">
      <div className="scene-ambient-layer" />
      <div className="scene-particle-layer" />
      {meta.isApex && <div className="scene-apex-aura" />}
      {meta.isEgo && <div className="scene-ego-beams" />}
    </div>
  );
};

/* ---------- Decision docks ---------- */

const DockNavigation = () => null;

// Where the moment happens, for the dock kicker
const placeOf = (char) =>
  char.flags?.includes('Nest') || char.flags?.includes('Feather') ? 'Nest' : char.flags?.includes('Outskirts') || char.regionId === 'OUTSKIRTS' ? 'Outskirts' : 'Backstreets';

const MinorDock = ({ prompt, char, npcs, wealth = 0, remainingMs, onPick, place = 'Backstreets' }) => {
  const { t, lang, bilingual } = useT();
  const raw = lang === 'en' ? prompt.en : prompt.vi;
  const { title, body } = splitTitle(raw);
  const sourceChoices = LIFE_MINORS.find((entry) => entry.id === prompt.id)?.choices || [];
  return (
    <div className="dock is-minor" role="document">
      <div className="dock-inner">
        {!prompt.annualMerit && <div className="countdown-wrap">
          <div className="countdown" aria-hidden="true">
            <i style={{ transform: `scaleX(${Math.max(0, Math.min(1, remainingMs / MINOR_WINDOW_MS))})` }} />
          </div>
          <span className="countdown-badge">{Math.ceil(Math.max(0, remainingMs) / 1000)}s</span>
        </div>}
        <div className="dock-banner">
          <div className="dock-banner-text">
            <div className="dock-kicker-row">
              <p className="dock-kicker">
                <span className="dock-kicker-icon">⚡</span>
                <span>{prompt.annualMerit
                  ? t(`Nhiệm vụ Công trạng · ${place}`, `Merit commission · ${place}`)
                  : t(`Gặp gỡ bất chợt · ${place}`, `Encounter · ${place}`)}</span>
              </p>
              <span className="dock-hotkey-hint">{t('0 / Esc: bỏ qua', '0 / Esc: pass')}</span>
            </div>
            {title && <h3 className="dock-title">{title}</h3>}
          </div>
        </div>
        <p className="dock-text">{body}</p>
        {bilingual && <p className="entry-alt">{splitTitle(prompt.en).body}</p>}
        <div className="choices">
          {prompt.choices.map((ch, idx) => {
            const costAhn = ch.costAhn ?? sourceChoices[idx]?.costAhn;
            const isShortAhn = Boolean(costAhn && costAhn > wealth);
            return (
              <button
                type="button"
                key={idx}
                className={`choice ${isShortAhn ? 'is-disabled' : ''}`}
                disabled={isShortAhn}
                style={isShortAhn ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
                onClick={() => !isShortAhn && onPick(idx)}
              >
                <span className="choice-badge">{idx + 1}</span>
                <span>
                  <span className="choice-label">{lang === 'en' ? ch.en : ch.vi}</span>
                  {costAhn && (
                    <span className={`delta ${isShortAhn ? 'is-down' : 'is-static'}`} style={{ marginLeft: 6 }}>
                      {isShortAhn ? t(`Thiếu Ahn (Cần ${costAhn})`, `Short Ahn (Needs ${costAhn})`) : t(`Tốn ${costAhn} Ahn`, `Cost: ${costAhn} Ahn`)}
                    </span>
                  )}
                  <ChoicePreview choice={ch} npcs={npcs} char={char} kind="minor" />
                </span>
              </button>
            );
          })}
          <button type="button" className="choice is-ghost" onClick={() => onPick(-1)}>
            <span className="choice-badge is-ghost">0</span>
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
    <div className={`dock ${causal ? 'is-causal' : ''}`} role="document">
      <div className="dock-inner">
        <div className="dock-banner">
          <div className="dock-banner-text">
            <div className="dock-kicker-row">
              <p className={`dock-kicker ${causal ? 'is-causal' : ''}`}>
                <span className="dock-kicker-icon">{causal ? '⟲' : '⏳'}</span>
                <span>{causal ? 'Causal Echo · Time stops' : t(`Tuổi ${char.age} · thời gian dừng lại`, `Age ${char.age} · time stops`)}</span>
              </p>
              <span className="dock-hotkey-hint">{t('Phím 1-9 để chọn', 'Keys 1-9')}</span>
            </div>
            <h3 className="dock-title">{title || t('Bạn sẽ làm gì?', 'What will you do?')}</h3>
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
          <details className="disco-psyche-card">
            <summary className="disco-psyche-header">
              <span className="disco-psyche-faculty">
                {lang === 'en' ? psyche.faculty.nameEn : psyche.faculty.nameVi}
              </span>
              <span>{t('Tiếng nói nội tâm', 'Inner voice')}</span>
            </summary>
            <p className="disco-psyche-voice">
              {lang === 'en' ? psyche.textEn : psyche.textVi}
            </p>
          </details>
        )}

        <div className="choices">
          {(event.choices || []).map((ch, idx) => {
            const label = splitTitle(lang === 'en' ? ch.labelEn || ch.labelVi : ch.labelVi).body;
            const check = evaluateDiscoChoiceCheck(ch, char);
            const playerWealth = char.stats?.wealth ?? char.wealth ?? 0;
            const isShortAhn = Boolean(ch.costAhn && ch.costAhn > playerWealth);
            const blocked = !choiceIsAvailable(ch, char);
            const item = ITEMS_CATALOG.find(i => i.id === (ch.useItem || ch.need?.item));
            const extra = [];
            if (item) extra.push(<span className="delta is-static" key="item">{t(ch.useItem ? 'D?ng h?t: ' : 'C?n trang b?: ', ch.useItem ? 'Consume: ' : 'Requires: ')}{lang === 'en' ? item.nameEn : item.nameVi}</span>);
            if (ch.favorCost) extra.push(<span className="delta is-static" key="favor">{t('C?n ng??i c?n s?ng, ?? g?n b?: ', 'Needs an available contact with bond: ')}{ch.favorCost.amount}</span>);
            if (blocked) extra.push(<span className="delta is-static" key="blocked">{t('Ch?a ?? ?i?u ki?n', 'Requirements not met')}</span>);
            if (ch.costAhn) {
              extra.push(
                <span className={`delta ${isShortAhn ? 'is-down' : 'is-static'}`} key="costAhn" style={blocked ? { borderColor: 'rgba(239,68,68,0.5)', color: '#f87171' } : { borderColor: 'rgba(234,179,8,0.4)', color: '#facc15' }}>
                  {isShortAhn ? t(`Thiếu Ahn (Cần ${ch.costAhn})`, `Short Ahn (Needs ${ch.costAhn})`) : t(`Tốn ${ch.costAhn} Ahn`, `Cost: ${ch.costAhn} Ahn`)}
                </span>
              );
            }
            if (Array.isArray(ch.scheduleConsequences) && ch.scheduleConsequences.length > 0) {
              extra.push(
                <span className="delta is-rare is-static" key="c">
                  {t('Sẽ có hậu quả', 'Has consequences')}
                </span>
              );
            }
            if (Array.isArray(ch.scarsAdd) && ch.scarsAdd.length > 0) {
              extra.push(
                <span className="delta is-rare is-static" key="s">
                  {t('Để lại dấu tích', 'Leaves a mark')}
                </span>
              );
            }
            if (ch.setJob) extra.push(<span className="delta is-bond is-static" key="j">{t('Con đường: ', 'Path: ')}{ch.setJob}</span>);
            return (
              <button
                type="button"
                key={idx}
                className={`choice ${blocked ? 'is-disabled' : ''}`}
                disabled={blocked}
                style={isShortAhn ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
                onClick={() => !blocked && onPick(idx)}
              >
                <span className="choice-badge">{idx + 1}</span>
                <span>
                  <span className="choice-label">{label}</span>
                  {bilingual && ch.labelEn && ch.labelEn !== ch.labelVi && <span className="choice-alt">{splitTitle(ch.labelEn).body}</span>}
                  
                  {check && (
                    <div className={`disco-check-pill ${check.isRedCheck ? 'is-red' : 'is-white'}`}>
                      <span className="check-tag">{lang === 'en' ? check.badgeEn : check.badgeVi}: <b>{check.successPct}%</b></span>
                      {check.modifiers.map((m, mIdx) => (
                        <span key={mIdx} className={`check-mod ${m.pos ? 'is-pos' : 'is-neg'}`}>
                          {lang === 'en' ? m.labelEn : m.labelVi}
                        </span>
                      ))}
                    </div>
                  )}

                  <ChoicePreview choice={ch} npcs={char.npcs} char={char} />
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
    <div className="dock is-contract" role="document">
      <div className="dock-inner">
        <div className="dock-banner">
          <div className="dock-banner-text">
            <div className="dock-kicker-row">
              <p className="dock-kicker">
                <span className="dock-kicker-icon">📜</span>
                <span>
                  {lang === 'en' ? (contract.kickerEn || 'Request') : (contract.kickerVi || 'Request')}
                  {' · '}
                  {lang === 'en' ? contract.tierInfo.nameEn : contract.tierInfo.nameVi}
                </span>
              </p>
              <span className="dock-hotkey-hint">{t('Phím 1-9 để chọn', 'Keys 1-9')}</span>
            </div>
            <h3 className="dock-title">{lang === 'en' ? contract.template.typeEn : contract.template.typeVi}</h3>
          </div>
        </div>

        <p className="dock-text">{lang === 'en' ? contract.template.en : contract.template.vi}</p>

        {contract.companionSupport && (contract.companionSupport.noteVi || contract.companionSupport.noteEn) && (
          <div
            className="companion-contract-banner"
            style={{
              margin: '0 0 12px 0',
              padding: '8px 12px',
              borderRadius: 4,
              fontSize: 12,
              lineHeight: 1.45,
              borderLeft: `3px solid ${contract.companionSupport.powerMod < 0 ? 'var(--bad)' : 'var(--good)'}`,
              background: contract.companionSupport.powerMod < 0 ? 'rgba(229, 72, 77, 0.09)' : 'rgba(61, 154, 80, 0.09)',
              color: 'var(--ink)'
            }}
          >
            <strong style={{ color: contract.companionSupport.powerMod < 0 ? 'var(--bad)' : 'var(--good)', marginRight: 6 }}>
              {contract.companionSupport.powerMod < 0
                ? t(`⚠ Bất hòa đồng đội (${contract.companionSupport.powerMod} Power)`, `⚠ Companion Friction (${contract.companionSupport.powerMod} Power)`)
                : t(`✦ Phối hợp đồng đội (+${contract.companionSupport.powerMod} Power)`, `✦ Companion Synergy (+${contract.companionSupport.powerMod} Power)`)}
            </strong>
            <span>{lang === 'en' ? contract.companionSupport.noteEn : contract.companionSupport.noteVi}</span>
          </div>
        )}

        <div className="choices">
          {contract.approaches.map((app, idx) => {
            const short = app.costAhn > wealth;
            return (
              <button type="button" key={app.id} className="choice" disabled={short} onClick={() => onPick(app.id)}>
                <span className="choice-badge">{idx + 1}</span>
                <span>
                  <span style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <span className="choice-label">{lang === 'en' ? app.labelEn : app.labelVi}</span>
                    <span className="num muted" style={{ fontSize: 14, whiteSpace: 'nowrap' }}>
                      {app.isDecline ? t('Không nhận việc', 'No commission') : `+${app.payAhn} Ahn · +${app.meritGain} Merit`}
                    </span>
                  </span>
                  <span className="odds">
                    <span className="stack-bar" aria-hidden="true">
                      <i style={{ width: `${app.successPct}%`, background: 'var(--good)' }} />
                      <i style={{ width: `${app.failPct}%`, background: 'var(--warn)' }} />
                      <i style={{ width: `${app.deathPct}%`, background: 'var(--bad)' }} />
                    </span>
                    <span className="odds-legend">
                      {app.isDecline ? (
                        <span>{t('Bỏ qua · Không hồi phục', 'Skip · No recovery')}</span>
                      ) : (
                        <>
                          <span><i className="dot" style={{ background: 'var(--good)' }} />{t('Thành công', 'Success')} {app.successPct}%</span>
                          <span><i className="dot" style={{ background: 'var(--warn)' }} />{t('Thất bại', 'Fail')} {app.failPct}%</span>
                          <span><i className="dot" style={{ background: 'var(--bad)' }} />{t('Tử trận', 'Death')} {app.deathPct}%</span>
                        </>
                      )}
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

const DUNGEON_KICKER = {
  library: ['Kết thúc đặc biệt · Ngưỡng cửa The Library', 'Special ending · The Library Threshold'],
  conquered: ['Hầm ngục · Đã đi hết', 'Dungeon · Cleared'],
  fled: ['Hầm ngục · Đã rút lui', 'Dungeon · Withdrawn'],
  broken: ['Hầm ngục · Tinh thần gục ngã', 'Dungeon · Broken']
};

const ResultDock = ({ resolution, onDismiss }) => {
  const { t, lang, bilingual } = useT();

  const title = lang === 'en' ? resolution.titleEn || resolution.titleVi : resolution.titleVi;
  const choiceLabel = lang === 'en' ? resolution.choiceLabelEn || resolution.choiceLabelVi : resolution.choiceLabelVi;
  const narrativeBody = lang === 'en' ? resolution.narrativeEn || resolution.narrativeVi : resolution.narrativeVi;
  const narrativeAlt = lang === 'en' ? resolution.narrativeVi : resolution.narrativeEn;

  return (
    <div className={`dock is-resolution ${resolution.isDead ? 'is-dead' : ''} ${resolution.isCausal ? 'is-causal' : ''} ${resolution.isEnding ? 'is-library-ending' : ''}`} role="document">
      <div className="dock-inner">
        <div className="dock-banner">
          <div className="dock-banner-text">
            <div className="dock-kicker-row">
              <p className={`dock-kicker is-outcome ${resolution.isDead ? 'is-dead' : ''}`}>
                <span className="dock-kicker-icon">{resolution.isDead ? '☠' : resolution.isCausal ? '⟲' : '✓'}</span>
                <span>
                  {resolution.isDead
                    ? t('Tử trận · Số mệnh khép lại', 'Fallen · Fate Sealed')
                    : resolution.kind === 'dungeon'
                    ? t(...(DUNGEON_KICKER[resolution.outcome] || DUNGEON_KICKER.fled))
                    : resolution.isCausal
                    ? t('Causal Echo · Nhân quả khắc ghi', 'Causal Echo · Causality Imprinted')
                    : t(`Kết quả quyết định · Tuổi ${resolution.age}`, `Decision Outcome · Age ${resolution.age}`)}
                </span>
              </p>
              <span className="dock-hotkey-hint">{t('Phím Space / Enter để tiếp tục', 'Space / Enter to continue')}</span>
            </div>
            <h3 className="dock-title">{title}</h3>
          </div>
        </div>

        {resolution.isEnding && (
          <div className="library-threshold-visual" aria-hidden="true">
            <div className="library-door-panel is-left" />
            <div className="library-door-panel is-right" />
            <div className="library-door-light" />
          </div>
        )}

        {choiceLabel && (
          <div className="resolution-choice-pill">
            <span className="choice-pill-label">{t('Bạn đã chọn:', 'You chose:')}</span>
            <span className="choice-pill-text">{choiceLabel}</span>
          </div>
        )}

        <div className="resolution-narrative">
          <p className="dock-text">{narrativeBody}</p>
          {bilingual && narrativeAlt && narrativeAlt !== narrativeBody && (
            <p className="entry-alt" style={{ marginTop: 8 }}>{narrativeAlt}</p>
          )}
        </div>

        <div className="resolution-deltas-section">
          <span className="deltas-title">{t('Ảnh hưởng & Thay đổi:', 'Impact & Consequences:')}</span>
          {resolution.deltas && resolution.deltas.length > 0 ? (
            <Deltas deltas={resolution.deltas} />
          ) : (
            <span className="deltas-empty">{t('Không có biến động thể trạng', 'No major stat shifts')}</span>
          )}
        </div>

        {resolution.isDead && (
          <div className="resolution-death-banner">
            <span className="death-icon">☠</span>
            <span>{t('Quyết định này đã đưa bạn đến cái chết giữa The City lạnh lùng.', 'This choice led you to death in the cold expanse of The City.')}</span>
          </div>
        )}

        <div className="resolution-actions">
          <button
            type="button"
            className={`btn ${resolution.isDead ? 'btn-danger' : 'btn-primary'} btn-lg btn-block resolution-btn`}
            onClick={onDismiss}
            autoFocus
          >
            <span>{resolution.isEnding ? t('Xem kết thúc ➔', 'View Ending ➔') : resolution.isDead ? t('Xem Bia Mộ ➔', 'View Epitaph ➔') : t('Tiếp tục hành trình ➔', 'Continue Journey ➔')}</span>
            <span className="key-badge">Space / Enter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- End of a life ---------- */

const Epitaph = ({ summary, onInherit, onRestart, onViewRecord, onGoHome }) => {
  const { t, lang, bilingual } = useT();
  const [copied, setCopied] = useState(false);
  const [showTimeline, setShowTimeline] = useState(true);

  const paragraphs = lang === 'en'
    ? (summary.lifeStoryParagraphsEn || [])
    : (summary.lifeStoryParagraphsVi || []);
  const altParagraphs = lang === 'en'
    ? (summary.lifeStoryParagraphsVi || [])
    : (summary.lifeStoryParagraphsEn || []);
  const turningPoints = summary.turningPoints || [];
  const recordsList = summary.recordsList || [];
  const lifeTags = summary.lifeTags || [];
  const diff = summary.lifespanDiff ?? 0;
  const diffSign = diff >= 0 ? `+${diff}` : `${diff}`;

  const finalStatBars = [
    { key: 'health', labelVi: 'Sinh lực (Health)', labelEn: 'Health', val: summary.health ?? 0, cls: 'bar-hp' },
    { key: 'sanity', labelVi: 'Tỉnh táo (Sanity)', labelEn: 'Sanity', val: summary.sanity ?? 0, cls: 'bar-sp' },
    { key: 'wealth', labelVi: 'Tài sản (Wealth)', labelEn: 'Wealth', val: summary.wealth ?? 0, cls: 'bar-wealth' },
    { key: 'network', labelVi: 'Mạng lưới (Network)', labelEn: 'Network', val: summary.network ?? 0, cls: 'bar-net' },
    { key: 'rep', labelVi: 'Danh tiếng (Reputation)', labelEn: 'Reputation', val: summary.rep ?? 0, cls: 'bar-rep' },
    { key: 'resonance', labelVi: 'Cộng hưởng (Resonance)', labelEn: 'Resonance', val: summary.resonance ?? 0, cls: 'bar-res' }
  ];

  const handleCopySummary = () => {
    const header = lang === 'en'
      ? `${summary.name}, born in ${summary.birthRegionNameEn || summary.regionNameEn} — ${summary.age} yrs (${summary.deathCauseEn})`
      : `${summary.name}, sinh ra tại ${summary.birthRegionNameVi || summary.regionNameVi} — ${summary.age} tuổi (${summary.deathCauseVi})`;
    const quote = lang === 'en' ? summary.poeticQuoteEn : summary.poeticQuoteVi;
    const story = paragraphs.join('\n\n');
    const statsLine = `HP ${summary.health ?? 0} | SP ${summary.sanity ?? 0} | Ahn ${summary.wealth ?? 0} | Net ${summary.network ?? 0} | Rep ${summary.rep ?? 0} | Resonance ${summary.resonance ?? 0}%`;
    const fullText = `${header}\n${quote}\n\n${story}\n\n[${statsLine}]\nSeed: ${summary.seed}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <section className={`epitaph epitaph-v2 ${summary.endingId ? 'is-special-ending' : ''}`} aria-label={summary.endingId ? t('Kết thúc đặc biệt', 'Special ending') : t('Tổng kết cuộc đời', 'Life Summary')}>
      <div className="epitaph-body">
        {/* Top Kicker & Giant Lifespan Header */}
        <p className="epitaph-kicker-origin">
          {lang === 'en'
            ? `${summary.name}, born in ${summary.birthRegionNameEn || summary.regionNameEn}`
            : `${summary.name}, sinh ra tại ${summary.birthRegionNameVi || summary.regionNameVi}`}
        </p>

        <p className="epitaph-age">
          {summary.age}
          <span>{t('tuổi', 'yrs')}</span>
        </p>

        <p className="epitaph-cause">{lang === 'en' ? summary.deathCauseEn : summary.deathCauseVi}</p>

        <blockquote className="epitaph-poetic-quote">
          {lang === 'en' ? summary.poeticQuoteEn : summary.poeticQuoteVi}
        </blockquote>

        {/* Primary 3-Card Fact Grid (Born into / Occupation / vs. Local Avg Lifespan) */}
        <div className="epitaph-facts epitaph-facts-primary">
          <div className="epitaph-fact-card">
            <span>{t('Xuất thân gia đình', 'Born into')}</span>
            <b>{lang === 'en' ? summary.familyNameEn : summary.familyNameVi}</b>
          </div>
          <div className="epitaph-fact-card">
            <span>{t('Nghề nghiệp & Địa vị', 'Occupation')}</span>
            <b>{lang === 'en' ? (summary.occupationEn || summary.epitaphTitleEn) : (summary.occupationVi || summary.epitaphTitleVi)}</b>
          </div>
          <div className="epitaph-fact-card">
            {summary.endingId ? (
              <><span>{t('Nơi cuối cùng được ghi nhận', 'Last recorded location')}</span><b>Outskirts</b></>
            ) : (
              <>
                <span>{t(`So với tuổi thọ TB Quận (${summary.localAvgLife || 55})`, `vs. local average lifespan (${summary.localAvgLife || 55})`)}</span>
                <b className={`num ${diff >= 0 ? 'is-pos-life' : 'is-neg-life'}`}>{diffSign} {t('tuổi', 'yrs')}</b>
              </>
            )}
          </div>
        </div>

        {/* Secondary Bloodline & Hana Classification Row */}
        <div className="epitaph-facts epitaph-facts-secondary">
          <div className="epitaph-fact-card">
            <span>{t('Thế hệ huyết thống', 'Generation')}</span>
            <b className="num">#{summary.generation}</b>
          </div>
          <div className="epitaph-fact-card">
            <span>{t('Phân cấp đe dọa Hana', 'Threat tier')}</span>
            <b className="text-accent">{summary.rankTier}</b>
          </div>
          <div className="epitaph-fact-card">
            <span>{summary.endingId ? t('Vật mang theo', 'Carried onward') : t('Di vật truyền đời', 'Relic left behind')}</span>
            <b>{summary.relic}</b>
          </div>
        </div>

        {/* Deep Narrative Life Story Card */}
        <div className="epitaph-panel epitaph-story-panel">
          <div className="epitaph-panel-head">
            <h3>{t('Tiểu sử cuộc đời', 'Life story')}</h3>
            {turningPoints.length > 0 && (
              <button
                type="button"
                className="epitaph-subtoggle"
                onClick={() => setShowTimeline((v) => !v)}
              >
                {showTimeline
                  ? t('Ẩn cột mốc năm tuổi', 'Hide age milestones')
                  : t(`Xem ${turningPoints.length} cột mốc năm tuổi`, `Show ${turningPoints.length} age milestones`)}
              </button>
            )}
          </div>

          <div className="epitaph-story-paragraphs">
            {paragraphs.map((p, idx) => (
              <div key={idx} className="epitaph-story-block">
                <p className="epitaph-story-p">{p}</p>
                {bilingual && altParagraphs[idx] && altParagraphs[idx] !== p && (
                  <p className="epitaph-story-p is-alt">{altParagraphs[idx]}</p>
                )}
              </div>
            ))}
          </div>

          {showTimeline && turningPoints.length > 0 && (
            <div className="epitaph-turning-points">
              <p className="turning-points-heading">
                {t('Các bước ngoặt định mệnh theo năm tuổi:', 'Pivotal turning points by age:')}
              </p>
              <ul className="turning-points-list">
                {turningPoints.map((tp, idx) => (
                  <li key={`${tp.age}_${idx}`} className={`tp-item tp-${tp.type || 'major'}`}>
                    <span className="tp-age">{t(`Tuổi ${tp.age}`, `Age ${tp.age}`)}</span>
                    <div className="tp-content">
                      <strong>{lang === 'en' ? tp.titleEn : tp.titleVi}</strong>
                      <span>{lang === 'en' ? tp.summaryEn : tp.summaryVi}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Unlocked Records & Milestones Card */}
        {recordsList.length > 0 && (
          <div className="epitaph-panel epitaph-records-panel">
            <div className="epitaph-panel-head">
              <h3>
                {t('Dấu ấn & Thành tựu', 'Records')}
                {summary.newRecordsCount > 0 && (
                  <span className="records-new-count">
                    {summary.newRecordsCount} {t('mới', 'new')}
                  </span>
                )}
              </h3>
              <span className="epitaph-panel-sub">
                {t(`${recordsList.length} dấu ấn được ghi nhận`, `${recordsList.length} records logged`)}
              </span>
            </div>

            <div className="epitaph-records-list">
              {recordsList.map((rec) => (
                <div
                  key={rec.key}
                  className={`epitaph-record-row tier-${rec.tier || 'common'} ${rec.isNew ? 'is-new-record' : ''}`}
                  title={lang === 'en' ? rec.hintEn : rec.hintVi}
                >
                  <div className="record-row-left">
                    <span className="record-row-title">{lang === 'en' ? rec.en : rec.vi}</span>
                    {rec.isNew && <span className="record-new-badge">NEW</span>}
                  </div>
                  <span className="record-row-rarity">
                    {lang === 'en' ? rec.rarityEn : rec.rarityVi}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final State (Stat Bars + Life Tags) Card */}
        <div className="epitaph-panel epitaph-final-panel">
          <div className="epitaph-panel-head">
            <h3>{summary.endingId ? t('Trạng thái ở ngưỡng cửa', 'At the threshold') : t('Trạng thái cuối đời', 'Final state')}</h3>
            <span className="epitaph-panel-sub">
              {t(`Chiến công (Merit): ${summary.merit || 0}`, `Merit: ${summary.merit || 0}`)}
            </span>
          </div>

          <div className="epitaph-stat-bars">
            {finalStatBars.map((st) => (
              <div key={st.key} className="epitaph-stat-row">
                <div className="epitaph-stat-head">
                  <span>{lang === 'en' ? st.labelEn : st.labelVi}</span>
                  <b className="num">{st.val}</b>
                </div>
                <div className="epitaph-stat-track">
                  <div
                    className={`epitaph-stat-fill ${st.cls}`}
                    style={{ width: `${Math.min(100, Math.max(0, st.val))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {lifeTags.length > 0 && (
            <div className="epitaph-life-tags">
              {lifeTags.map((tag, idx) => (
                <span key={idx} className={`epitaph-tag-pill kind-${tag.kind || 'default'}`}>
                  {lang === 'en' ? tag.en : tag.vi}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="epitaph-actions epitaph-actions-v2">
          {!summary.endingId && <button type="button" className="btn btn-primary btn-lg epitaph-btn-reborn" onClick={onInherit}>
            <GitBranch size={16} />
            {summary.age < 14
              ? t(`Chơi đời em · thế hệ #${summary.generation + 1}`, `Play as sibling · gen #${summary.generation + 1}`)
              : summary.age < 18 || !summary.hasChild
                ? t(`Kế thừa di vật · thế hệ #${summary.generation + 1}`, `Be born again · gen #${summary.generation + 1}`)
                : t(`Chơi đời con · thế hệ #${summary.generation + 1}`, `Play the heir · gen #${summary.generation + 1}`)}
          </button>}

          <button type="button" className="btn btn-lg" onClick={onViewRecord}>
            <BookOpen size={16} />
            {t('Xem lại biên niên sử', 'View life record')}
          </button>

          <button type="button" className="btn btn-lg" onClick={handleCopySummary}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? t('Đã sao chép!', 'Copied!') : t('Sao chép tóm tắt', 'Copy summary')}
          </button>

          <button type="button" className="btn btn-lg" onClick={() => exportDossierCardPNG(summary)}>
            <Download size={16} />
            {t('Lưu ảnh thẻ', 'Save image')}
          </button>
        </div>

        <div className="epitaph-secondary-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={onGoHome}>
            <House size={14} />
            {t('Về trang chủ', 'Home')}
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onRestart}>
            <RotateCcw size={14} />
            {t('Kiếp mới từ đầu', 'Start over')}
          </button>
        </div>

        <p className="epitaph-seed-footer">
          Seed · <span className="num">{summary.seed}</span>
        </p>
      </div>
    </section>
  );
};

/* ---------- Stage ---------- */

export const LiveStageFeed = () => {
  const { t } = useT();
  const navigate = useNavigate();
  const {
    char,
    speed,
    minorRemainingMs,
    setSpeed,
    chooseMinor,
    chooseYearLead,
    selectEventChoice,
    selectContractApproach,
    setDungeonStance,
    useDungeonSupply,
    useDungeonEgo,
    chooseDungeonAction,
    fleeDungeon,
    confirmColorTitle,
    confirmEgoName,
    completeWorkshopCraft,
    startLife,
    abandonRun,
    exitToSetup,
    activeResolution,
    dismissResolution,
    postChoicePauseMs,
    clearPostChoicePause,
    revealNextBirthLog,
    skipAllBirthLogs
  } = useGameStore(
    useShallow((s) => ({
      char: s.char,
      speed: s.speed,
      minorRemainingMs: s.minorRemainingMs,
      setSpeed: s.setSpeed,
      chooseMinor: s.chooseMinor,
      chooseYearLead: s.chooseYearLead,
      selectEventChoice: s.selectEventChoice,
      selectContractApproach: s.selectContractApproach,
      setDungeonStance: s.setDungeonStance,
      useDungeonSupply: s.useDungeonSupply,
      useDungeonEgo: s.useDungeonEgo,
      chooseDungeonAction: s.chooseDungeonAction,
      fleeDungeon: s.fleeDungeon,
      confirmColorTitle: s.confirmColorTitle,
      confirmEgoName: s.confirmEgoName,
      completeWorkshopCraft: s.completeWorkshopCraft,
      startLife: s.startLife,
      abandonRun: s.abandonRun,
      exitToSetup: s.exitToSetup,
      activeResolution: s.activeResolution,
      dismissResolution: s.dismissResolution,
      postChoicePauseMs: s.postChoicePauseMs,
      clearPostChoicePause: s.clearPostChoicePause,
      revealNextBirthLog: s.revealNextBirthLog,
      skipAllBirthLogs: s.skipAllBirthLogs
    }))
  );

  const pendingBirthLogs = char.pendingBirthLogs || [];
  const isPrologueActive = pendingBirthLogs.length > 0;

  const logRef = useRef(null);
  const stageRef = useRef(null);
  const prevAliveRef = useRef(char.alive);
  const [titleInput, setTitleInput] = useState('The Crimson Dusk');
  const [bestowedColor, setBestowedColor] = useState(null);
  const [egoInput, setEgoInput] = useState('Penitence of Ash');

  useEffect(() => {
    if (char.pendingModal === 'color_title' && !bestowedColor) {
      const rolled = bestowHanaColorTitle(char);
      setBestowedColor(rolled);
    } else if (char.pendingModal !== 'color_title' && bestowedColor) {
      setBestowedColor(null);
    }
  }, [char.pendingModal, char]);
  const [weaponName, setWeaponName] = useState('Atelier Crimson Edge');
  const [weaponStyle, setWeaponStyle] = useState(WORKSHOP_STYLES[0]);
  const [cursorPos, setCursorPos] = useState(50);
  const [strikes, setStrikes] = useState([]);
  const [peekBehind, setPeekBehind] = useState(false);
  const dirRef = useRef(1);

  // Auto-reveal birth prologue events sequentially with cinematic pacing
  useEffect(() => {
    if (!isPrologueActive) return;

    const delay = (char.logs?.length || 0) === 0 ? 550 : 1250;
    const timer = setTimeout(() => {
      revealNextBirthLog();
      try {
        audioEngine.playYearTick();
      } catch {}
    }, delay);

    return () => clearTimeout(timer);
  }, [isPrologueActive, char.logs?.length, revealNextBirthLog]);

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
      if (char.endingId === 'library_threshold') {
        audioEngine.playPageFlip();
        gameFeel.haptic(30);
      } else {
        audioEngine.playDeath();
        gameFeel.haptic([80, 50, 160]);
        gameFeel.addTrauma(0.85);
        gameFeel.triggerHitStop(220);
      }
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
  }, [char.logs.length, char.alive, char.pendingDungeon, char.pendingEvent, char.pendingContract, char.pendingMinor, activeResolution]);

  const handleChooseMinor = (idx) => {
    audioEngine.playClick();
    chooseMinor(idx);
  };

  const handleSelectEvent = (idx) => {
    if (!choiceIsAvailable(char.pendingEvent?.choices?.[idx], char)) return;
    audioEngine.playClick();
    selectEventChoice(idx);
  };

  const handleSelectContract = (id) => {
    audioEngine.playClick();
    selectContractApproach(id);
  };

  const handleSelectDungeon = (idx) => {
    audioEngine.playClick();
    chooseDungeonAction(idx);
  };

  const handleFleeDungeon = () => {
    audioEngine.playClick();
    fleeDungeon();
  };

  const handleSetDungeonStance = (stance) => {
    audioEngine.playClick();
    setDungeonStance(stance);
  };

  const handleUseDungeonSupply = (supplyType) => {
    audioEngine.playClick();
    useDungeonSupply(supplyType);
  };

  const handleUseDungeonEgo = () => {
    audioEngine.playEgo();
    useDungeonEgo();
  };

  const handleConfirmColorTitle = (title) => {
    audioEngine.playEgo();
    confirmColorTitle(title);
  };

  const handleConfirmEgoName = (name) => {
    audioEngine.playEgo();
    confirmEgoName(name);
  };

  // Keys: Space / Enter / Esc dismisses resolution when active; otherwise 1–9 pick, Space pauses, M toggles mute, S saves
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (char.pendingModal) return;
      if (peekBehind) {
        if (e.key === 'Escape') { e.preventDefault(); setPeekBehind(false); }
        return;
      }

      if (postChoicePauseMs > 0) {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          audioEngine.playClick();
          clearPostChoicePause();
          return;
        }
      }

      if (activeResolution) {
        if (e.code === 'Space' || e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          audioEngine.playClick();
          dismissResolution();
        }
        return;
      }

      if (isPrologueActive) {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          audioEngine.playClick();
          revealNextBirthLog();
          return;
        }
        return;
      }

      if (char.pendingLead) {
        const leadIndex = Number(e.key) - 1;
        if (Number.isInteger(leadIndex) && leadIndex >= 0 && leadIndex < char.pendingLead.offers.length) {
          e.preventDefault();
          audioEngine.playClick();
          chooseYearLead(leadIndex);
        }
        return;
      }

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
      if (char.pendingDungeon && !DUNGEON_DEFINITIONS[char.pendingDungeon.id]?.noRetreat && (e.key === 'f' || e.key === 'F' || e.key === 'Escape')) {
        e.preventDefault();
        handleFleeDungeon();
        return;
      }
      if (char.pendingDungeon && (e.key === 'q' || e.key === 'Q')) {
        e.preventDefault();
        handleUseDungeonSupply('breather');
        return;
      }
      if (char.pendingDungeon && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        handleUseDungeonSupply('scan');
        return;
      }
      if (char.pendingDungeon && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        handleUseDungeonEgo();
        return;
      }
      const idx = parseInt(e.key, 10) - 1;
      if (Number.isNaN(idx) || idx < 0) return;
      if (char.pendingDungeon) {
        const stage = getDungeonCurrentStage(char.pendingDungeon);
        if (stage && idx < (stage.choices?.length || 0)) {
          const ch = stage.choices[idx];
          if (isDungeonChoiceAvailable(ch, char)) {
            e.preventDefault();
            handleSelectDungeon(idx);
          }
        }
      } else if (char.pendingEvent && idx < (char.pendingEvent.choices?.length || 0)) {
        e.preventDefault();
        handleSelectEvent(idx);
      } else if (char.pendingContract && idx < (char.pendingContract.approaches?.length || 0)) {
        const app = char.pendingContract.approaches[idx];
        if (app.costAhn > char.stats.wealth) return;
        e.preventDefault();
        handleSelectContract(app.id);
      } else if (char.pendingMinor && idx < char.pendingMinor.choices.length) {
        const choice = LIFE_MINORS.find((event) => event.id === char.pendingMinor.id)?.choices[idx];
        if (!choiceIsAvailable(choice, char)) return;
        e.preventDefault();
        handleChooseMinor(idx);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [char.alive, char.pendingLead, char.pendingDungeon, char.pendingEvent, char.pendingContract, char.pendingMinor, char.stats.wealth, activeResolution, dismissResolution, postChoicePauseMs, clearPostChoicePause, speed, setSpeed, chooseYearLead, chooseMinor, selectEventChoice, selectContractApproach, chooseDungeonAction, fleeDungeon, isPrologueActive, revealNextBirthLog, peekBehind]);

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

  // Sound cues and camera trauma when an event, contract, or dungeon delve stops time
  useEffect(() => {
    if (char.pendingDungeon) {
      audioEngine.playDanger();
      gameFeel.addTrauma(0.32);
    } else if (char.pendingEvent) {
      const ev = char.pendingEvent;
      if (ev.isCausalCallback) {
        audioEngine.playDanger();
      } else if (ev.finger === 'index' || ev.id?.includes('finger_index') || ev.titleVi?.includes('Chỉ Thị')) {
        audioEngine.playPrescriptTick();
      } else if (ev.finger === 'middle' || ev.id?.includes('finger_middle') || ev.titleVi?.includes('Sổ Thù Hận')) {
        audioEngine.playPageFlip();
      } else if (ev.finger === 'thumb' || ev.id?.includes('finger_thumb') || ev.titleVi?.includes('Kỷ Luật')) {
        audioEngine.playThumbSnap();
      } else if (ev.isDistortion || ev.distortionPoints > 0) {
        audioEngine.playDanger();
      } else if (typeof audioEngine.playDecision === 'function') {
        audioEngine.playDecision();
      }
    } else if (char.pendingContract) {
      if (typeof audioEngine.playDecision === 'function') audioEngine.playDecision();
    }
  }, [char.pendingDungeon?.id, char.pendingDungeon?.currentStageIndex, char.pendingEvent?.id, char.pendingContract?.id]);

  // Dynamic Contextual Ambience: smoothly adjusts as character travels or enters states
  useEffect(() => {
    audioEngine.updateContextualAmbience(
      char,
      Boolean(char.pendingDungeon),
      char.pendingDungeon ? (DUNGEON_DEFINITIONS[char.pendingDungeon.id]?.theme || 'warp') : null
    );
  }, [char.alive, char.pendingDungeon?.id, char.career, char.district, char.distortionPoints]);

  const lastDungeonResult = char.pendingDungeon?.lastStageResult;
  useEffect(() => {
    if (lastDungeonResult?.type === 'check_fail') gameFeel.haptic([30, 40, 30]);
    else if (lastDungeonResult?.type === 'check_ok') gameFeel.haptic(10);
  }, [lastDungeonResult]);

  const forgeQuality = strikes.length ? Math.round(strikes.reduce((a, b) => a + b, 0) / strikes.length) : 0;
  const lifeSummary = !char.alive ? buildLifeSummaryAndLegacy(char) : null;
  const hasDock = Boolean((char.pendingLead && !isPrologueActive) || char.pendingDungeon || char.pendingEvent || char.pendingContract || char.pendingMinor || activeResolution);
  const canPeek = Boolean(char.pendingDungeon || char.pendingEvent || char.pendingContract || activeResolution);
  useEffect(() => setPeekBehind(false), [char.pendingDungeon?.id, char.pendingEvent?.id, char.pendingContract?.id, activeResolution?.titleVi]);

  const dungeonTheme = char.pendingDungeon ? DUNGEON_DEFINITIONS[char.pendingDungeon.id]?.theme || 'warp' : null;

  return (
    <div
      className={`stage ${hasDock ? 'has-dock' : ''} ${dungeonTheme ? `is-dungeon-stage is-dungeon-${dungeonTheme}` : ''}`}
      ref={stageRef}
    >
      <DungeonBackdrop session={char.pendingDungeon} />
      <AmbientScene char={char} />
      <StageFx />
      <div className="chronicle-heading"><h1>{t('Biên niên', 'Chronicle')}</h1><span>{char.name}</span></div>
      <div className="log" ref={logRef}>
        <div className="log-col">
          <LogEntries logs={char.logs} />
          {isPrologueActive && (
            <div className="prologue-dock">
              <button
                type="button"
                className="btn btn-ghost btn-sm prologue-skip-btn"
                onClick={() => {
                  try { audioEngine.playClick(); } catch {}
                  skipAllBirthLogs();
                }}
              >
                {t('Bỏ qua', 'Skip')}
              </button>
            </div>
          )}
          {lifeSummary && !isPrologueActive && (
            <Epitaph
              summary={lifeSummary}
              onInherit={() => startLife(true)}
              onRestart={abandonRun}
              onViewRecord={() => {
                if (logRef.current) {
                  logRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onGoHome={() => {
                exitToSetup();
                navigate('/');
              }}
            />
          )}
        </div>
      </div>

      {hasDock && canPeek && (
        <button type="button" className="event-peek-toggle" onClick={() => setPeekBehind((value) => !value)} aria-label={peekBehind ? t('Hiện quyết định', 'Show decision') : t('Ẩn quyết định để xem biên niên', 'Hide decision to read chronicle')} aria-pressed={peekBehind}>
          {peekBehind ? <Eye size={17} /> : <EyeOff size={17} />}
          <span>{peekBehind ? t('Hiện quyết định', 'Show decision') : t('Xem phía sau', 'See behind')}</span>
        </button>
      )}
      {hasDock && !peekBehind && (
        <div className="event-modal-backdrop" role="dialog" aria-modal="true" aria-label={t('Sự kiện & Kết quả', 'Event & Outcome')}>
          {activeResolution ? (
            <ResultDock
              resolution={activeResolution}
              onDismiss={() => {
                audioEngine.playClick();
                dismissResolution();
              }}
            />
          ) : (
            <>
              {char.pendingLead && <YearLeadDock draft={char.pendingLead} char={char} onPick={chooseYearLead} />}
              {!char.pendingLead && char.pendingDungeon && (
                <DungeonDock
                  session={char.pendingDungeon}
                  char={char}
                  onPick={handleSelectDungeon}
                  onFlee={handleFleeDungeon}
                  onSetStance={handleSetDungeonStance}
                  onUseSupply={handleUseDungeonSupply}
                  onUseEgo={handleUseDungeonEgo}
                />
              )}
              {!char.pendingLead && !char.pendingDungeon && char.pendingEvent && <EventDock event={char.pendingEvent} char={char} onPick={handleSelectEvent} />}
              {!char.pendingLead && !char.pendingDungeon && !char.pendingEvent && char.pendingContract && <ContractDock contract={char.pendingContract} wealth={char.stats.wealth} onPick={handleSelectContract} />}
              {!char.pendingLead && !char.pendingDungeon && !char.pendingEvent && !char.pendingContract && char.pendingMinor && (
                <MinorDock prompt={char.pendingMinor} char={char} npcs={char.npcs} wealth={char.stats.wealth} place={placeOf(char)} remainingMs={minorRemainingMs} onPick={handleChooseMinor} />
              )}
            </>
          )}
        </div>
      )}

      <Modal
        open={char.pendingModal === 'color_title'}
        footer={null}
        closable={false}
        centered
        className="hana-decree-modal"
        title={null}
      >
        <div
          className="hana-decree-scroll"
          style={{
            '--conferred-color': bestowedColor?.color || '#e1341e',
            '--conferred-glow': bestowedColor?.glow || 'rgba(225, 52, 30, 0.4)'
          }}
        >
          <div className="hana-decree-crest-wrap">
            <span className="hana-seal-icon">✦</span>
          </div>

          <div className="hana-decree-header">
            <span className="hana-decree-subtitle">
              {t('Hiệp Hội Hana Phân Khu 1 · Sắc Phong', 'Hana Association Section 1 · Imperial Decree')}
            </span>
            <h2 className="hana-decree-main-title">
              {t('Sắc Lệnh Tuyên Phong Color', 'Color Fixer Bestowal Decree')}
            </h2>
          </div>

          <div className="hana-title-plate">
            <div className="hana-title-swatch" />
            <div className="hana-title-name">
              {bestowedColor?.title || 'Vermilion Gale'}
            </div>
            <div className="hana-title-heraldry">
              {t(
                `Định danh sắc tộc: ${bestowedColor?.colorName || 'Vermilion'} · Khí tiết: ${bestowedColor?.epithet || 'Gale'}`,
                `Color designation: ${bestowedColor?.colorName || 'Vermilion'} · Epithet: ${bestowedColor?.epithet || 'Gale'}`
              )}
            </div>
          </div>

          <p className="hana-decree-proclamation">
            {t(
              `Theo nghị định tối cao của Hội Đồng Hana, chiến tích và khí chất của bạn đã đạt tới cảnh giới huyền thoại của Thành Phố. Kể từ giây phút này, cả 26 Quận sẽ mãi mãi kính sợ và xướng tên bạn dưới danh hiệu độc nhất: `,
              `By supreme decree of the Hana Association Council, your prowess and essence have attained the legendary zenith of the City. From this moment onward, all 26 Districts shall revere and know you solely by the title: `
            )}
            <b>「{bestowedColor?.title || 'Vermilion Gale'}」</b>.
          </p>

          <button
            type="button"
            className="hana-decree-action-btn"
            onClick={() => handleConfirmColorTitle(bestowedColor || { title: 'Vermilion Gale', color: '#e1341e', glow: 'rgba(225, 52, 30, 0.4)' })}
          >
            {t('Tiếp nhận Sắc Chỉ Hana', 'Accept Hana Decree')}
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
