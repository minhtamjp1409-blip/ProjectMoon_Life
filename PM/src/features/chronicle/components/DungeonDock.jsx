import React, { useEffect } from 'react';
import { ShieldAlert, LogOut, Shield, Scale, Flame, HeartPulse, Radar, Package, Award, Sparkles, Zap } from 'lucide-react';
import { useT } from '../../../i18n';
import { audioEngine } from '../../../engine/audioEngine.js';
import {
  DUNGEON_DEFINITIONS,
  DUNGEON_BALANCE,
  getDungeonCurrentStage,
  getDungeonMastery,
  getStrainTier,
  dungeonSupplyState,
  dungeonEgoState,
  isDungeonChoiceAvailable,
  evaluateDungeonChoiceOdds
} from '../../../engine/gameEngine.js';
import '../../../styles/dungeon.css';

const STANCES = [
  {
    id: 'guarded',
    icon: Shield,
    vi: 'Thận trọng',
    en: 'Guarded',
    noteVi: 'Ít thương tổn và áp lực hơn, dễ qua kiểm định hơn, nhặt được ít hơn.',
    noteEn: 'Less damage and strain, better odds on checks, a smaller haul.'
  },
  {
    id: 'balanced',
    icon: Scale,
    vi: 'Cân bằng',
    en: 'Balanced',
    noteVi: 'Không cộng, không trừ.',
    noteEn: 'No bonus, no penalty.'
  },
  {
    id: 'reckless',
    icon: Flame,
    vi: 'Xung kích',
    en: 'Reckless',
    noteVi: 'Nhặt nhiều hơn và thêm công trạng, nhưng đau hơn và áp lực dâng nhanh hơn.',
    noteEn: 'A bigger haul and extra merit, but more damage and faster strain.'
  }
];

const TRAIT_NAMES = {
  vigor: ['Thể lực', 'Vigor'],
  nerve: ['Thần kinh', 'Nerve'],
  luck: ['Vận may', 'Luck']
};

const TIER_NAMES = {
  calm: ['Vững', 'Steady'],
  shaken: ['Run tay', 'Shaken'],
  panic: ['Hoảng loạn', 'Panicked'],
  breaking: ['Sắp gãy', 'Breaking']
};

const AMBIENT = {
  warp: ['Đồng hồ T Corp đứng ở 00:09.99. Trong toa, thời gian vẫn trôi.', 'The T Corp clock holds at 00:09.99. Inside the car, time keeps passing.'],
  greatlake: ['Sương trắng dày thêm sau mỗi chặng. Chuông Luật Đại Hồ chưa ngừng.', 'The fog thickens with every stage. The Lake Law bells have not stopped.'],
  lobotomy: ['Đèn khẩn cấp chớp màu cam. Còi Meltdown vọng lên từ tầng dưới.', 'Emergency lamps pulse amber. A Meltdown siren echoes from the floor below.'],
  bloodfiend: ['Nhạc kèn lạc điệu đúng một nốt. Đu quay vẫn quay.', 'The organ music is off by exactly one note. The wheel keeps turning.'],
  outskirts: ['Cát chảy xuống theo từng bước. Gió mang mùi kim loại cũ.', 'Sand runs down with every step. The wind smells of old metal.']
};

const STAT_ICON = { health: '♥', sanity: '✦', wealth: '◆', merit: '◈', resonance: '◎', rep: '★' };
const SEVERITY = [null, ['nhẹ', 'light'], ['vừa', 'moderate'], ['nặng', 'heavy']];
const severityOf = (n) => (n >= 13 ? 3 : n >= 6 ? 2 : 1);

const Chip = ({ stat, tone, children }) => (
  <span className={`delta is-affected is-affected-${stat} is-static dg-chip is-${tone}`}>
    <span className="delta-stat-icon" aria-hidden="true">{STAT_ICON[stat]}</span>
    {children}
  </span>
);

const StrainMeter = ({ strain, t }) => {
  const tier = getStrainTier(strain);
  const [vi, en] = TIER_NAMES[tier.id];
  return (
    <div className={`dg-strain is-${tier.id}`}>
      <div className="dg-strain-head">
        <span className="dg-label">{t('Áp lực tâm thần', 'Mental strain')}</span>
        <span className="dg-strain-tier">{t(vi, en)}</span>
      </div>
      <div
        className="dg-meter"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={strain}
        aria-valuetext={`${strain}, ${t(vi, en)}`}
        aria-label={t('Áp lực tâm thần', 'Mental strain')}
      >
        <span className="dg-meter-fill" style={{ width: `${strain}%` }} />
        {[45, 70, 90].map((at) => <span key={at} className="dg-meter-tick" style={{ left: `${at}%` }} aria-hidden="true" />)}
      </div>
    </div>
  );
};

export const DungeonDock = ({ session, char, onPick, onFlee, onSetStance, onUseSupply, onUseEgo }) => {
  const { t, lang, bilingual } = useT();
  const def = session ? DUNGEON_DEFINITIONS[session.id] : null;
  const stage = getDungeonCurrentStage(session);
  const result = session?.lastStageResult;

  // Ambience itself follows the dungeon theme from LiveStageFeed; the dock only voices each stage result
  useEffect(() => {
    if (!result) return;
    if (result.type === 'check_fail') audioEngine.playDamage(1.3);
    else if (result.type === 'check_ok') audioEngine.playBuff();
  }, [result]);

  if (!session || !def || !stage) return null;

  const stages = def.stages;
  const currentIdx = session.currentStageIndex || 0;
  const strain = session.sanityStrain || 0;
  const mastery = getDungeonMastery(def, char);
  const activeStance = STANCES.find((s) => s.id === (session.stance || 'balanced')) || STANCES[1];
  const breather = dungeonSupplyState(char, session, 'breather');
  const scan = dungeonSupplyState(char, session, 'scan');
  const ego = dungeonEgoState(char, session);
  const pick = (vi, en) => (lang === 'en' ? en : vi);
  const ambient = AMBIENT[def.theme] || AMBIENT.warp;

  return (
    <div className={`dock is-dungeon theme-${def.theme}`} style={{ '--dg': def.accentColor }} role="document">
      <div className="dock-inner dg">
        <header className="dg-head">
          <div className="dock-kicker-row">
            <p className="dock-kicker">
              <ShieldAlert size={14} aria-hidden="true" />
              <span className="dg-hazard">{def.hazard}</span>
              <span>{pick(def.kickerVi, def.kickerEn)}</span>
            </p>
          </div>
          <h3 className="dock-title">{pick(def.titleVi, def.titleEn)}</h3>
          <p className="dg-ambient">{t(ambient[0], ambient[1])}</p>
          <ol className="dg-route" aria-label={t('Tiến trình hầm ngục', 'Dungeon progress')}>
            {stages.map((st, idx) => (
              <li
                key={st.stageIndex}
                className={idx < currentIdx ? 'is-done' : idx === currentIdx ? 'is-now' : ''}
                aria-current={idx === currentIdx ? 'step' : undefined}
                title={pick(st.nameVi, st.nameEn)}
              >
                <span className="dg-route-bar" />
                <span className="dg-route-num">{idx + 1}</span>
              </li>
            ))}
          </ol>
        </header>

        <section className="dg-status" aria-label={t('Trạng thái chuyến đi', 'Run status')}>
          <StrainMeter strain={strain} t={t} />
          <div className="dg-haul">
            <span className="dg-label">{t('Thu hoạch', 'Haul')}</span>
            <span className="dg-haul-val">
              <b className="num">{session.accumulatedLootAhn || 0}</b> Ahn
              {(session.accumulatedMerit || 0) > 0 && <> · <b className="num">{session.accumulatedMerit}</b> {t('công trạng', 'merit')}</>}
            </span>
          </div>
        </section>

        {result && (
          <aside key={`${result.stageNum}-${result.type}-${strain}`} className={`dg-result is-${result.type || 'pass'}`} aria-live="polite">
            <p>{pick(result.vi, result.en)}</p>
          </aside>
        )}

        <section key={currentIdx} className="dg-scene">
          <h4 className="dg-scene-title">
            <span>{t(`Chặng ${currentIdx + 1} / ${stages.length}`, `Stage ${currentIdx + 1} / ${stages.length}`)}</span>
            {pick(stage.nameVi, stage.nameEn)}
          </h4>
          <p className="dock-text">{pick(stage.descVi, stage.descEn)}</p>
        </section>

        <ul className="choices dg-choices">
          {stage.choices.map((ch, idx) => {
            const avail = isDungeonChoiceAvailable(ch, char, session);
            const odds = evaluateDungeonChoiceOdds(ch, char, session);
            const label = pick(ch.labelVi, ch.labelEn);
            const alt = pick(ch.labelEn, ch.labelVi);
            const trait = ch.checkTrait ? TRAIT_NAMES[ch.checkTrait] : null;
            const hasItem = ch.reqItem ? (char.inventory || []).some((i) => (i.id || i) === ch.reqItem) : true;
            const ahn = (odds?.estLoot || 0) + Math.max(0, odds?.estWealth || 0);
            return (
              <li key={idx}>
                <button
                  type="button"
                  className={`choice dg-choice ${ch.isFlee ? 'is-leave' : ''}`}
                  disabled={!avail}
                  onClick={() => {
                    if (!avail) return;
                    if (ch.isFlee) {
                      audioEngine.playClick();
                    } else if (ch.costHp || ch.checkTrait === 'vigor') {
                      audioEngine.playBladeClash();
                    } else if (def.theme === 'warp') {
                      audioEngine.playWarpSurge();
                    } else if (ch.checkTrait) {
                      audioEngine.playDiceRoll();
                    } else {
                      audioEngine.playClick();
                    }
                    onPick(idx);
                  }}
                >
                  <span className="choice-badge">{idx + 1}</span>
                  <span className="choice-content">
                    <span className="choice-label">{label}</span>
                    {bilingual && alt && alt !== label && <span className="choice-alt">{alt}</span>}
                    <span className="preview">
                      {trait && (
                        <span className={`dg-odds ${odds.successPct >= 80 ? 'is-high' : odds.successPct >= 60 ? 'is-mid' : 'is-low'}`}>
                          <Sparkles size={12} aria-hidden="true" />
                          {t(trait[0], trait[1])} {odds.successPct}%
                        </span>
                      )}
                      {ch.reqItem && (
                        <span className={`dg-need ${hasItem ? 'is-met' : 'is-unmet'}`}>
                          <Package size={12} aria-hidden="true" />
                          {hasItem ? t('Dùng vật phẩm', 'Uses an item') : t('Thiếu vật phẩm', 'Item missing')}
                        </span>
                      )}
                      {ch.costAhn && <span className={`dg-need ${(char.stats?.wealth ?? 0) >= ch.costAhn ? 'is-met' : 'is-unmet'}`}>{ch.costAhn} Ahn</span>}
                      {ch.isFlee && (
                        <span className="dg-need is-met"><LogOut size={12} aria-hidden="true" />{t('Rút lui, giữ hàng đã gom', 'Leave with what you hold')}</span>
                      )}
                      {odds?.estHp < 0 && <Chip stat="health" tone="down">HP · {t(...SEVERITY[severityOf(-odds.estHp)])}</Chip>}
                      {odds?.estHp > 0 && <Chip stat="health" tone="up">HP</Chip>}
                      {odds?.estSp < 0 && <Chip stat="sanity" tone="down">SP · {t(...SEVERITY[severityOf(-odds.estSp)])}</Chip>}
                      {odds?.estSp > 0 && <Chip stat="sanity" tone="up">SP</Chip>}
                      {ahn > 0 && <Chip stat="wealth" tone="up">Ahn</Chip>}
                      {odds?.estMerit > 0 && <Chip stat="merit" tone="up">{t('Công trạng', 'Merit')}</Chip>}
                      {odds?.estResonance > 0 && <Chip stat="resonance" tone="up">{t('Cộng hưởng', 'Resonance')}</Chip>}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {stage.canFlee && (
          <div className="dg-leave">
            <button
              type="button"
              className="btn btn-ghost btn-sm dg-leave-btn"
              onClick={() => {
                audioEngine.playClick();
                onFlee?.();
              }}
            >
              <LogOut size={14} aria-hidden="true" />
              <span>{t(`Rút lui và giữ ${session.accumulatedLootAhn || 0} Ahn đã gom`, `Leave and keep the ${session.accumulatedLootAhn || 0} Ahn you hold`)}</span>
              <kbd>F</kbd>
            </button>
          </div>
        )}

        <section className="dg-tools" aria-label={t('Chiến thuật', 'Tactics')}>
          <div className="dg-stances" role="radiogroup" aria-label={t('Thế chiến thuật', 'Stance')}>
            {STANCES.map((st) => {
              const Icon = st.icon;
              const on = st.id === activeStance.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={`dg-stance stance-${st.id} ${on ? 'is-on' : ''}`}
                  onClick={() => {
                    audioEngine.playClick();
                    onSetStance?.(st.id);
                  }}
                  title={pick(st.noteVi, st.noteEn)}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{pick(st.vi, st.en)}</span>
                </button>
              );
            })}
          </div>
          <div className="dg-supplies">
            <button
              type="button"
              className="dg-supply"
              disabled={!breather.ok}
              onClick={() => {
                audioEngine.playBuff();
                onUseSupply?.('breather');
              }}
              title={t(`Nghỉ thở: hồi máu và tinh thần, giảm áp lực. Tốn ${DUNGEON_BALANCE.breather.cost} Ahn và một lần tiếp tế.`, `Catch breath: restores HP and SP, eases strain. Costs ${DUNGEON_BALANCE.breather.cost} Ahn and one supply.`)}
            >
              <HeartPulse size={14} aria-hidden="true" />
              <span>{t('Nghỉ thở', 'Catch breath')}</span>
              <small>{DUNGEON_BALANCE.breather.cost} Ahn</small>
              <kbd>Q</kbd>
            </button>
            <button
              type="button"
              className={`dg-supply ${scan.reason === 'scanned' ? 'is-used' : ''}`}
              disabled={!scan.ok}
              onClick={() => {
                audioEngine.playPrescriptTick();
                onUseSupply?.('scan');
              }}
              title={t('Dò đường: đọc quy luật của chặng này. Dễ qua kiểm định hơn, nhận ít thương tổn hơn, tìm thêm được chút hàng.', 'Read the stage: better check odds, less damage, a little extra haul.')}
            >
              <Radar size={14} aria-hidden="true" />
              <span>{scan.reason === 'scanned' ? t('Đã dò', 'Read') : t('Dò đường', 'Read stage')}</span>
              <kbd>E</kbd>
            </button>
            {ego.reason !== 'none' && (
              <button
                type="button"
                className={`dg-supply dg-supply--ego ${ego.reason === 'active' ? 'is-used' : ''}`}
                disabled={!ego.ok}
                onClick={() => {
                  audioEngine.playEgo();
                  onUseEgo?.();
                }}
                title={t('Kích hoạt E.G.O: chặng này dễ qua kiểm định hơn nhiều và nhận ít thương tổn hơn. Đổi lại áp lực, tinh thần và Resonance đều tăng. Mỗi lần vào hầm có số lần giới hạn.', 'Awaken the E.G.O: this stage is far easier and hurts less. In exchange strain, sanity and Resonance all take a hit. Limited uses per run.')}
              >
                <Zap size={14} aria-hidden="true" />
                <span>{ego.reason === 'active' ? t('E.G.O đang mở', 'E.G.O open') : t('Kích hoạt E.G.O', 'Awaken E.G.O')}</span>
                <small>{session.egoCharges ?? 0}</small>
                <kbd>R</kbd>
              </button>
            )}
            <span className="dg-supply-count" title={t('Số lần tiếp tế còn lại', 'Supplies left')}>
              {t('Tiếp tế', 'Supplies')} {session.supplyCharges ?? 0}/{session.maxSupplies ?? 2}
            </span>
          </div>
          <p className="dg-tools-note">
            {pick(activeStance.noteVi, activeStance.noteEn)}
            {mastery.hasMastery && (
              <span className="dg-mastery" title={t('Xuất thân và trang bị giúp bạn nhận ít thương tổn hơn và dễ qua kiểm định hơn.', 'Your background and gear mean less damage and better odds on checks.')}>
                <Award size={13} aria-hidden="true" /> {pick(mastery.labelVi, mastery.labelEn)}
              </span>
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export default DungeonDock;
