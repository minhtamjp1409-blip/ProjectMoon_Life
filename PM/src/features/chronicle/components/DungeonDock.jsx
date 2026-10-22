import React from 'react';
import { ShieldAlert, LogOut, CheckCircle2, Circle, AlertTriangle, Sparkles, Package } from 'lucide-react';
import { useT } from '../../../i18n';
import {
  DUNGEON_DEFINITIONS,
  getDungeonCurrentStage,
  isDungeonChoiceAvailable
} from '../../../engine/gameEngine.js';

export const DungeonDock = ({ session, char, onPick, onFlee }) => {
  const { t, lang, bilingual } = useT();

  if (!session) return null;

  const def = DUNGEON_DEFINITIONS[session.id];
  if (!def) return null;

  const stage = getDungeonCurrentStage(session);
  if (!stage) return null;

  const currentIdx = session.currentStageIndex || 0;
  const stages = def.stages || [];
  const strain = session.sanityStrain || 0;
  const strainPct = Math.min(100, Math.max(0, strain));
  const isHighStrain = strain >= 60;
  const isCriticalStrain = strain >= 85;

  const title = lang === 'en' ? def.titleEn : def.titleVi;
  const kicker = lang === 'en' ? def.kickerEn : def.kickerVi;
  const stageName = lang === 'en' ? stage.nameEn : stage.nameVi;
  const stageDesc = lang === 'en' ? stage.descEn : stage.descVi;

  return (
    <div className={`dock is-dungeon theme-${def.theme || 'default'}`} role="document">
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
                {t('Phím 1-9 để chọn · F để rút lui', 'Keys 1-9 to choose · F to flee')}
              </span>
            </div>
            <h3 className="dock-title">{title}</h3>
          </div>
        </div>

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

        {/* Status Dashboard: Sanity Strain Gauge & Accumulated Haul */}
        <div className="dungeon-dashboard">
          <div className="dungeon-gauge-group">
            <div className="gauge-label-row">
              <span className="gauge-title">
                {t('Áp Lực Tâm Thần (Sanity Strain)', 'Sanity Strain & Panic Pressure')}
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
            <span className="haul-label">{t('Chiến Lợi Phẩm:', 'Vault Haul:')}</span>
            <span className="haul-val">+{session.accumulatedLootAhn || 0} Ahn</span>
            {(session.accumulatedMerit || 0) > 0 && (
              <span className="haul-merit">+{session.accumulatedMerit} Merit</span>
            )}
          </div>
        </div>

        {/* Active Stage Description */}
        <div className="dungeon-stage-body">
          <h4 className="dungeon-stage-title">
            <span className="stage-marker">{t(`Chặng ${currentIdx + 1}:`, `Stage ${currentIdx + 1}:`)}</span> {stageName}
          </h4>
          <p className="dock-text">{stageDesc}</p>
        </div>

        {/* Stage Choice Actions */}
        <div className="choices">
          {stage.choices.map((ch, idx) => {
            const isAvail = isDungeonChoiceAvailable(ch, char);
            const label = lang === 'en' ? ch.labelEn : ch.labelVi;
            const labelAlt = lang === 'en' ? ch.labelVi : ch.labelEn;

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
                    {ch.lootAhn && (
                      <span className="choice-loot-pill">+{ch.lootAhn} Ahn</span>
                    )}
                  </span>

                  {bilingual && labelAlt && labelAlt !== label && (
                    <span className="choice-alt">{labelAlt}</span>
                  )}

                  {/* Requirements / Pre-requisite Badges */}
                  <div className="choice-pills-row">
                    {ch.reqItem && (
                      <span className={`req-pill ${char.inventory?.some(i => i.id === ch.reqItem) ? 'is-met' : 'is-unmet'}`}>
                        <Package size={12} />
                        {char.inventory?.some(i => i.id === ch.reqItem)
                          ? t('Có vật phẩm yêu cầu', 'Item Available')
                          : t('Thiếu vật phẩm yêu cầu', 'Missing Required Item')}
                      </span>
                    )}
                    {ch.checkTrait && (
                      <span className={`trait-pill ${char.traits?.[ch.checkTrait] ? 'is-pos' : 'is-neutral'}`}>
                        <Sparkles size={12} />
                        {t(`Kiểm định tố chất: ${ch.checkTrait}`, `Trait Check: ${ch.checkTrait}`)}
                      </span>
                    )}
                    {ch.isFlee && (
                      <span className="flee-pill">
                        <LogOut size={12} />
                        {t('Rút lui bảo toàn tính mạng', 'Retreat with current haul')}
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
              <span>{t('Rút lui an toàn (Bảo toàn chiến lợi phẩm)', 'Safe Evacuation (Keep Accumulated Haul)')}</span>
              <span className="key-badge">F / Esc</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
