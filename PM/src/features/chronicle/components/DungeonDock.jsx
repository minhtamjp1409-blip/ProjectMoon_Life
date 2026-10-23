import React, { useEffect, useState } from 'react';
import {
  ShieldAlert,
  LogOut,
  CheckCircle2,
  Circle,
  Sparkles,
  Package,
  Shield,
  Scale,
  Flame,
  HeartPulse,
  Radar,
  Clock,
  Compass,
  Activity,
  Droplets,
  Snowflake,
  Award
} from 'lucide-react';
import { useT } from '../../../i18n';
import {
  DUNGEON_DEFINITIONS,
  getDungeonCurrentStage,
  getDungeonMastery,
  isDungeonChoiceAvailable,
  evaluateDungeonChoiceOdds
} from '../../../engine/gameEngine.js';

const STANCES = [
  {
    id: 'guarded',
    icon: Shield,
    vi: 'Thận Trọng',
    en: 'Guarded',
    subVi: '-35% Sát thương/Áp lực · +12% Kiểm định · 0.85x Ahn',
    subEn: '-35% Dmg/Strain · +12% Check · 0.85x Loot'
  },
  {
    id: 'balanced',
    icon: Scale,
    vi: 'Cân Bằng',
    en: 'Balanced',
    subVi: '100% Công thủ & Chiến lợi phẩm tiêu chuẩn',
    subEn: 'Standard 1.0x Damage, Checks & Vault Haul'
  },
  {
    id: 'reckless',
    icon: Flame,
    vi: 'Xung Kích',
    en: 'Reckless',
    subVi: '+45% Ahn · +30% Merit · +10% Vigor · +4 Resonance',
    subEn: '+45% Loot · +30% Merit · +10% Vigor · +4 Resonance'
  }
];

const TRAIT_NAMES = {
  vigor: { vi: 'Thể Lực (Vigor)', en: 'Vigor' },
  nerve: { vi: 'Thần Kinh (Nerve)', en: 'Nerve' },
  charm: { vi: 'Khéo Léo (Charm)', en: 'Charm' },
  luck: { vi: 'Vận May (Luck)', en: 'Luck' }
};

export const DungeonDock = ({
  session,
  char,
  onPick,
  onFlee,
  onSetStance,
  onUseSupply
}) => {
  const { t, lang, bilingual } = useT();

  const def = session ? DUNGEON_DEFINITIONS[session.id] : null;
  const theme = def?.theme || 'warp';
  const currentIdx = session?.currentStageIndex || 0;

  // Live anomaly chronometer / telemetry counter inside the DungeonDock
  const [anomalyTick, setAnomalyTick] = useState(0);
  useEffect(() => {
    if (!session) return undefined;
    setAnomalyTick(currentIdx * 520 + 18);
    const interval = setInterval(() => {
      setAnomalyTick((prev) => prev + Math.floor(Math.random() * 17) + 9 + currentIdx * 6);
    }, 70);
    return () => clearInterval(interval);
  }, [session?.id, currentIdx]);

  if (!session || !def) return null;
  const stage = getDungeonCurrentStage(session);
  if (!stage) return null;

  const stages = def.stages || [];
  const strain = session.sanityStrain || 0;
  const strainPct = Math.min(100, Math.max(0, strain));
  const isHighStrain = strain >= 60;
  const isCriticalStrain = strain >= 80;

  const mastery = getDungeonMastery(def, char);
  const activeStance = session.stance || 'balanced';
  const supplyCharges = session.supplyCharges ?? 0;
  const maxSupplies = session.maxSupplies ?? 2;
  const stageScanned = Boolean(session.stageScanned);

  const title = lang === 'en' ? def.titleEn : def.titleVi;
  const kicker = lang === 'en' ? def.kickerEn : def.kickerVi;
  const stageName = lang === 'en' ? stage.nameEn : stage.nameVi;
  const stageDesc = lang === 'en' ? stage.descEn : stage.descVi;

  const renderAnomalyTelemetry = () => {
    if (theme === 'warp') {
      const subjectiveAge = (char?.age || 20) + anomalyTick;
      return (
        <div className="dungeon-telemetry-bar theme-warp">
          <div className="telemetry-primary">
            <Clock size={15} className="telemetry-icon spin-pulse" />
            <span className="telemetry-label">{t('TUỔI DỊ GIỚI (SUBJECTIVE AGE):', 'SUBJECTIVE RIFT AGE:')}</span>
            <strong className="telemetry-counter warp-glitch-num">
              {subjectiveAge.toLocaleString()} {t('tuổi', 'yrs')}
            </strong>
          </div>
          <div className="telemetry-secondary">
            <span className="telemetry-chip">
              {t(`Đồng hồ Singularity: 00:09.99s (Đóng băng ở ${char?.age || 20} tuổi)`, `Singularity Clock: 00:09.99s (Locked at Age ${char?.age || 20})`)}
            </span>
          </div>
        </div>
      );
    }
    if (theme === 'greatlake') {
      const depthMeters = 180 + currentIdx * 340 + (anomalyTick % 45);
      const pallidIndex = Math.min(99, 14 + currentIdx * 22 + Math.floor(strain * 0.25));
      return (
        <div className="dungeon-telemetry-bar theme-greatlake">
          <div className="telemetry-primary">
            <Compass size={15} className="telemetry-icon" />
            <span className="telemetry-label">{t('ĐỘ SÂU ĐẠI HỒ:', 'ABYSSAL DEPTH:')}</span>
            <strong className="telemetry-counter">-{depthMeters}m</strong>
          </div>
          <div className="telemetry-secondary">
            <span className="telemetry-chip">
              {t(`Màng Sáp Pallid: ${pallidIndex}% · Âm thoa U Corp: 432 Hz`, `Pallid Wax Index: ${pallidIndex}% · U Corp Tuning: 432 Hz`)}
            </span>
          </div>
        </div>
      );
    }
    if (theme === 'lobotomy') {
      const qliphothLevel = Math.max(1, 4 - currentIdx);
      const enkephalinPpm = 420 + currentIdx * 280 + (anomalyTick % 60);
      return (
        <div className="dungeon-telemetry-bar theme-lobotomy">
          <div className="telemetry-primary">
            <Activity size={15} className="telemetry-icon" />
            <span className="telemetry-label">{t('KHÓA QLIPHOTH:', 'QLIPHOTH DETERRENCE:')}</span>
            <strong className="telemetry-counter">{t(`Cấp ${qliphothLevel} / Meltdown`, `Tier ${qliphothLevel} / Meltdown`)}</strong>
          </div>
          <div className="telemetry-secondary">
            <span className="telemetry-chip">
              {t(`Nồng độ Enkephalin: ${enkephalinPpm} PPM`, `Enkephalin Density: ${enkephalinPpm} PPM`)}
            </span>
          </div>
        </div>
      );
    }
    if (theme === 'bloodfiend') {
      const thirstPulse = 88 + currentIdx * 18 + (anomalyTick % 14);
      return (
        <div className="dungeon-telemetry-bar theme-bloodfiend">
          <div className="telemetry-primary">
            <Droplets size={15} className="telemetry-icon" />
            <span className="telemetry-label">{t('NHỊP TIM ĐÊM HỘI MÁU:', 'CRIMSON BANQUET PULSE:')}</span>
            <strong className="telemetry-counter">{thirstPulse} BPM</strong>
          </div>
          <div className="telemetry-secondary">
            <span className="telemetry-chip">
              {t(`Huyết áp dị thể · Tầng diễu hành ${currentIdx + 1}/4`, `Hematic Pressure · Parade Sector ${currentIdx + 1}/4`)}
            </span>
          </div>
        </div>
      );
    }
    const subZero = -(28 + currentIdx * 9 + (anomalyTick % 5));
    return (
      <div className="dungeon-telemetry-bar theme-outskirts">
        <div className="telemetry-primary">
          <Snowflake size={15} className="telemetry-icon" />
          <span className="telemetry-label">{t('NHIỆT ĐỘ PHẾ TÍCH:', 'RUIN AMBIENT TEMP:')}</span>
          <strong className="telemetry-counter">{subZero}°C</strong>
        </div>
        <div className="telemetry-secondary">
          <span className="telemetry-chip">
            {t('Bức xạ Singularity cổ đại đang hoạt động', 'Primordial Singularity Radiation Active')}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`dock is-dungeon theme-${theme}`} role="document">
      <div className="dock-inner">
        {/* Header Banner */}
        <div className="dock-banner">
          <div className="dock-banner-text">
            <div className="dock-kicker-row">
              <p className="dock-kicker">
                <span className="dock-kicker-icon">
                  <ShieldAlert size={14} />
                </span>
                <span className="dungeon-hazard-tag" style={{ borderColor: def.accentColor || '#38bdf8' }}>
                  {def.hazard || 'WAW'}
                </span>
                <span>{kicker}</span>
              </p>
              <span className="dock-hotkey-hint">
                {t('Phím 1-9 chọn · Q/E tiếp tế · F rút lui', '1-9 choose · Q/E supply · F flee')}
              </span>
            </div>
            <h3 className="dock-title">{title}</h3>
          </div>
        </div>

        {/* Live Anomaly Telemetry / WARP Chronometer */}
        {renderAnomalyTelemetry()}

        {/* 4-Stage Breadcrumbs Stepper */}
        <nav className="dungeon-breadcrumbs" aria-label={t('Tiến trình hầm ngục', 'Dungeon Progress')}>
          {stages.map((st, idx) => {
            const isCompleted = idx < currentIdx;
            const isActive = idx === currentIdx;
            const isLocked = idx > currentIdx;
            const stName = lang === 'en' ? st.nameEn : st.nameVi;

            return (
              <div
                key={idx}
                className={`dungeon-step ${isCompleted ? 'is-completed' : ''} ${isActive ? 'is-active' : ''} ${isLocked ? 'is-locked' : ''}`}
              >
                <div className="dungeon-step-indicator">
                  {isCompleted ? (
                    <CheckCircle2 size={16} className="step-icon done" />
                  ) : isActive ? (
                    <span className="step-active-dot" style={{ background: def.accentColor || '#38bdf8' }} />
                  ) : (
                    <Circle size={14} className="step-icon locked" />
                  )}
                  <span className="step-num">{idx + 1}</span>
                </div>
                <span className="step-label" title={stName}>
                  {stName}
                </span>
                {idx < stages.length - 1 && <span className="step-connector" />}
              </div>
            );
          })}
        </nav>

        {/* Status Dashboard: Sanity Strain Gauge, Mastery & Accumulated Haul */}
        <div className="dungeon-dashboard">
          <div className="dungeon-gauge-group">
            <div className="gauge-label-row">
              <span className="gauge-title">
                {t('Áp Lực Tâm Thần (Sanity Strain)', 'Sanity Strain & Resolve Threshold')}
                {session.resolveAwakened && (
                  <span className="resolve-awakened-pill">
                    🔥 {t('Ý Chí Bất Khuất (-25% DMG)', 'Heroic Resolve (-25% DMG)')}
                  </span>
                )}
              </span>
              <span className={`gauge-value ${isCriticalStrain ? 'is-crit' : isHighStrain ? 'is-high' : ''}`}>
                {strain}%
              </span>
            </div>
            <div className="dungeon-strain-track" aria-hidden="true">
              <div
                className={`dungeon-strain-fill ${isCriticalStrain ? 'is-crit' : isHighStrain ? 'is-high' : ''}`}
                style={{ width: `${strainPct}%` }}
              />
            </div>
          </div>

          <div className="dungeon-haul-badge">
            <span className="haul-label">{t('Kho Báu Tích Lũy:', 'Vault Haul:')}</span>
            <span className="haul-val">+{session.accumulatedLootAhn || 0} Ahn</span>
            {(session.accumulatedMerit || 0) > 0 && (
              <span className="haul-merit">+{session.accumulatedMerit} Merit</span>
            )}
          </div>
        </div>

        {/* Tactical Command Bar: Stances, Field Supplies & Adaptation Mastery */}
        <div className="dungeon-tactics-bar">
          <div className="tactics-stances" role="group" aria-label={t('Thế Chiến Thuật', 'Tactical Stance')}>
            <span className="tactics-group-label">{t('Thế:', 'Stance:')}</span>
            {STANCES.map((st) => {
              const Icon = st.icon;
              const isSelected = activeStance === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  className={`stance-btn stance-${st.id} ${isSelected ? 'is-active' : ''}`}
                  onClick={() => onSetStance && onSetStance(st.id)}
                  title={lang === 'en' ? st.subEn : st.subVi}
                  aria-pressed={isSelected}
                >
                  <Icon size={13} />
                  <span>{lang === 'en' ? st.en : st.vi}</span>
                </button>
              );
            })}
          </div>

          <div className="tactics-supplies">
            <span className="tactics-group-label">
              {t(`Tiếp tế (${supplyCharges}/${maxSupplies}):`, `Supplies (${supplyCharges}/${maxSupplies}):`)}
            </span>
            <button
              type="button"
              className="supply-btn supply-breather"
              disabled={supplyCharges <= 0}
              onClick={() => onUseSupply && onUseSupply('breather')}
              title={t('Hồi phục ngay +16 HP, +14 SP và giảm 20% Áp lực Tâm thần (Phím Q)', 'Restore +16 HP, +14 SP & -20% Sanity Strain (Key Q)')}
            >
              <HeartPulse size={13} />
              <span>{t('Hồi sức (+16 HP/SP)', 'Field Stim (+16 HP/SP)')}</span>
              <kbd>Q</kbd>
            </button>
            <button
              type="button"
              className={`supply-btn supply-scan ${stageScanned ? 'is-scanned' : ''}`}
              disabled={supplyCharges <= 0 || stageScanned}
              onClick={() => onUseSupply && onUseSupply('scan')}
              title={t('Tăng +25% tỷ lệ kiểm định, giảm 50% sát thương tầng này và +10 Ahn (Phím E)', '+25% Check Odds, -50% Stage Damage & +10 Bonus Ahn (Key E)')}
            >
              <Radar size={13} />
              <span>
                {stageScanned
                  ? t('Đã Thẩm Định', 'Sector Scanned')
                  : t('Thẩm định (+25% Tỉ lệ)', 'Scan (+25% Odds)')}
              </span>
              <kbd>E</kbd>
            </button>
          </div>
        </div>

        {/* Adaptation Mastery & Active Stance Summary Strip */}
        <div className="dungeon-modifier-strip">
          <span className="mod-stance-summary">
            {lang === 'en'
              ? STANCES.find((s) => s.id === activeStance)?.subEn
              : STANCES.find((s) => s.id === activeStance)?.subVi}
          </span>
          {mastery.hasMastery && (
            <span className="mod-mastery-badge" title={t('Thích nghi từ Trang bị & Xuất thân giúp giảm sát thương và tăng tỷ lệ thành công', 'Equipment & Background Mastery reduces incoming damage and boosts check odds')}>
              <Award size={13} />
              <span>
                {t('Thích nghi:', 'Mastery:')} {lang === 'en' ? mastery.labelEn : mastery.labelVi}{' '}
                (-{Math.round((1 - mastery.dmgMult) * 100)}% DMG, +{Math.round(mastery.checkBonus * 100)}% Check)
              </span>
            </span>
          )}
        </div>

        {/* Previous Stage Feedback Banner */}
        {session.lastStageResult && (
          <div className={`dungeon-stage-feedback is-${session.lastStageResult.type || 'pass'}`}>
            <p className="feedback-text">
              {lang === 'en' ? session.lastStageResult.en : session.lastStageResult.vi}
            </p>
          </div>
        )}

        {/* Active Stage Description */}
        <div className="dungeon-stage-body">
          <h4 className="dungeon-stage-title">
            <span className="stage-marker">{t(`Chặng ${currentIdx + 1}/${stages.length}:`, `Stage ${currentIdx + 1}/${stages.length}:`)}</span>{' '}
            {stageName}
          </h4>
          <p className="dock-text">{stageDesc}</p>
        </div>

        {/* Stage Choice Actions */}
        <div className="choices">
          {stage.choices.map((ch, idx) => {
            const isAvail = isDungeonChoiceAvailable(ch, char, session);
            const odds = evaluateDungeonChoiceOdds(ch, char, session);
            const label = lang === 'en' ? ch.labelEn : ch.labelVi;
            const labelAlt = lang === 'en' ? ch.labelVi : ch.labelEn;
            const traitInfo = ch.checkTrait ? TRAIT_NAMES[ch.checkTrait] : null;
            const totalEstAhn = (odds?.estLoot || 0) + (odds?.estWealth > 0 ? odds.estWealth : 0);

            return (
              <button
                type="button"
                key={idx}
                className={`choice ${!isAvail ? 'is-disabled' : ''} ${ch.isFlee ? 'is-flee-choice' : ''}`}
                disabled={!isAvail}
                onClick={() => isAvail && onPick(idx)}
              >
                <span className="choice-badge">{idx + 1}</span>
                <span className="choice-content">
                  <span className="choice-label-row">
                    <span className="choice-label">{label}</span>
                    {totalEstAhn > 0 && (
                      <span className="choice-loot-pill">+{totalEstAhn} Ahn</span>
                    )}
                  </span>

                  {bilingual && labelAlt && labelAlt !== label && (
                    <span className="choice-alt">{labelAlt}</span>
                  )}

                  {/* Requirements, Check Odds & Expected Stat Preview Pills */}
                  <div className="choice-pills-row">
                    {ch.reqItem && (
                      <span className={`req-pill ${char.inventory?.some(i => i.id === ch.reqItem) ? 'is-met' : 'is-unmet'}`}>
                        <Package size={12} />
                        {char.inventory?.some(i => i.id === ch.reqItem)
                          ? t('Có vật phẩm yêu cầu', 'Item Available')
                          : t('Thiếu vật phẩm yêu cầu', 'Missing Required Item')}
                      </span>
                    )}

                    {ch.costAhn && (
                      <span className={`req-pill ${(char.stats?.wealth ?? 0) >= ch.costAhn ? 'is-met' : 'is-unmet'}`}>
                        💰 -{ch.costAhn} Ahn
                      </span>
                    )}

                    {odds?.hasCheck ? (
                      <span
                        className={`trait-pill ${
                          odds.successPct >= 80 ? 'is-pos' : odds.successPct >= 60 ? 'is-neutral' : 'is-warn'
                        }`}
                      >
                        <Sparkles size={12} />
                        {t(
                          `Kiểm định ${traitInfo?.vi || ch.checkTrait}: ${odds.successPct}%`,
                          `${traitInfo?.en || ch.checkTrait} Check: ${odds.successPct}%`
                        )}
                      </span>
                    ) : !ch.isFlee ? (
                      <span className="trait-pill is-pos">
                        ✓ {t('Chắc chắn (100%)', 'Guaranteed (100%)')}
                      </span>
                    ) : null}

                    {odds && odds.estHp !== 0 && (
                      <span className={`delta-preview-pill ${odds.estHp > 0 ? 'is-good' : 'is-bad'}`}>
                        ❤️ {odds.estHp > 0 ? `+${odds.estHp}` : odds.estHp} HP
                      </span>
                    )}
                    {odds && odds.estSp !== 0 && (
                      <span className={`delta-preview-pill ${odds.estSp > 0 ? 'is-good' : 'is-bad'}`}>
                        🧠 {odds.estSp > 0 ? `+${odds.estSp}` : odds.estSp} SP
                      </span>
                    )}
                    {odds && odds.estMerit > 0 && (
                      <span className="delta-preview-pill is-good">
                        🎖️ +{odds.estMerit} Merit
                      </span>
                    )}
                    {odds && odds.estResonance > 0 && (
                      <span className="delta-preview-pill is-good">
                        ✨ +{odds.estResonance} Resonance
                      </span>
                    )}

                    {ch.isFlee && (
                      <span className="flee-pill">
                        <LogOut size={12} />
                        {t('Rút lui bảo toàn chiến lợi phẩm', 'Retreat with current haul')}
                      </span>
                    )}
                  </div>
                </span>
              </button>
            );
          })}
        </div>

        {/* Explicit Emergency Evacuate / Flee Button if allowed */}
        {stage.canFlee && (
          <div className="dungeon-retreat-bar">
            <button
              type="button"
              className="btn btn-ghost btn-sm dungeon-flee-btn"
              onClick={onFlee}
              title={t('Rút lui khỏi hầm ngục ngay lập tức', 'Evacuate dungeon immediately')}
            >
              <LogOut size={14} />
              <span>
                {t(
                  `Rút lui an toàn (Mang về +${session.accumulatedLootAhn || 0} Ahn)`,
                  `Safe Evacuation (Keep +${session.accumulatedLootAhn || 0} Ahn)`
                )}
              </span>
              <span className="key-badge">F / Esc</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
