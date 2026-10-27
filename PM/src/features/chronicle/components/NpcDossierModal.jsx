import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore.js';
import { NPC_INTERACTION_ACTIONS, canInteractWithNpc } from '../../../engine/npcInteractions.js';
import { ensureNpcAgency, getNpcBondState } from '../../../data/npcPersonality.js';

export const NpcDossierModal = ({ npcRole, onClose }) => {
  const char = useGameStore((s) => s.char);
  const lang = useGameStore((s) => s.lang);
  const t = useGameStore((s) => s.t);
  const interactNpc = useGameStore((s) => s.interactNpc);

  const [feedback, setFeedback] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeBtnRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      previous?.focus?.();
    };
  }, [onClose]);

  if (!char || !npcRole) return null;
  const rawNpc = char.npcs?.[npcRole];
  if (!rawNpc) return null;

  const npc = ensureNpcAgency(rawNpc);
  const name = lang === 'en' ? npc.nameEn || npc.nameVi : npc.nameVi;
  const isGone = npc.deceased || ['dead', 'missing', 'estranged', 'betrayer'].includes(npc.status);
  const bondState = getNpcBondState(npc);
  const perk = npc.dungeonPerk;

  const handleAction = async (actionId) => {
    setLoadingAction(actionId);
    setFeedback(null);
    try {
      const res = interactNpc(npcRole, actionId);
      if (!res.success) {
        setFeedback({
          text: lang === 'en' ? res.reasonEn || 'Action failed' : res.reasonVi || 'Không thể thực hiện',
          isError: true
        });
      } else {
        setFeedback({
          text: lang === 'en' ? res.log?.en || 'Interaction succeeded.' : res.log?.vi || 'Tương tác thành công.',
          isError: false
        });
      }
    } finally {
      setLoadingAction(null);
    }
  };

  const ROLE_LABELS = {
    friend: ['Bạn thời thơ ấu', 'Childhood Friend'],
    mentor: ['Người thầy / Sư phụ', 'Mentor'],
    rival: ['Kình địch', 'Rival'],
    lover: ['Người thương', 'Beloved'],
    spouse: ['Bạn đời', 'Spouse'],
    partner: ['Cộng sự tác chiến', 'Combat Partner'],
    child: ['Con', 'Child'],
    nemesis: ['Kẻ thù truyền kiếp', 'Nemesis'],
    mentee: ['Đệ tử', 'Mentee'],
    ward: ['Đứa trẻ bảo hộ', 'Ward']
  };

  const roleText = t(...(ROLE_LABELS[npcRole] || [npcRole, npcRole]));

  return (
    <div
      className="npc-dossier-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="npc-dossier-title"
    >
      <div className="npc-dossier-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="npc-dossier-head">
          <div className="npc-dossier-badge-row">
            <span className="npc-role-tag">{roleText}</span>
            <span className="npc-district-tag">{npc.district || 'District Backstreets'}</span>
          </div>
          <div className="npc-title-row">
            <h2 className="npc-dossier-name" id="npc-dossier-title">{name}</h2>
            <button
              ref={closeBtnRef}
              type="button"
              className="npc-close-btn"
              onClick={onClose}
              aria-label={t('Đóng hồ sơ', 'Close dossier')}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="npc-career-sub">
            <span className="npc-career-pill">{lang === 'en' ? npc.rankLabelEn || npc.job : npc.rankLabelVi || npc.job}</span>
            {npc.status === 'wounded' && <span className="npc-status-pill is-wounded">{t('Trọng thương', 'Wounded')}</span>}
            {isGone && <span className="npc-status-pill is-dead">{t('Đã khuất / Mất tích', 'Deceased / Gone')}</span>}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="npc-dossier-body">
          {/* Archetype Want & Fear */}
          <section className="npc-dossier-section archetype-box">
            <p className="npc-trait-quote">
              <em>"{lang === 'en' ? npc.traitEn : npc.traitVi}"</em>
            </p>
            <div className="want-fear-grid">
              <div className="want-col">
                <span className="wf-label">{t('Ước vọng', 'Want')}</span>
                <span className="wf-val">{lang === 'en' ? npc.wantEn : npc.wantVi}</span>
              </div>
              <div className="fear-col">
                <span className="wf-label">{t('Nỗi sợ', 'Fear')}</span>
                <span className="wf-val">{lang === 'en' ? npc.fearEn : npc.fearVi}</span>
              </div>
            </div>
          </section>

          {/* Bond & Ledger */}
          <section className="npc-dossier-section bond-box">
            <div className="bond-status-head">
              <span className="bond-label">{t('Mức độ gắn kết', 'Bond Level')}</span>
              <span className="bond-val-tier" style={{ color: bondState.color }}>
                {t(bondState.vi, bondState.en)} · <b>{npc.bond ?? 0}/100</b>
              </span>
            </div>
            <div className="bond-progress-track">
              <div className="bond-progress-fill" style={{ width: `${npc.bond ?? 0}%`, backgroundColor: bondState.color }} />
            </div>
            <div className="ledger-sub-row">
              <span className="ledger-stat">
                {t('Nợ ân nghĩa với bạn:', 'Owed favors to you:')} <b>{npc.debts?.toPlayer || 0}</b>
              </span>
              <span className="ledger-stat">
                {t('Hỗ trợ hợp đồng:', 'Contract Aid:')} <b>{bondState.contractMod > 0 ? `+${bondState.contractMod}` : bondState.contractMod}</b>
              </span>
            </div>
          </section>

          {/* Active Crisis Alert Banner */}
          {npc.crisis && npc.crisis.type !== 'none' && npc.crisis.severity > 0 && (
            <section className="npc-dossier-section crisis-alert-card">
              <div className="crisis-card-head">
                <span className="crisis-icon" aria-hidden="true">
                  <AlertTriangle size={16} />
                </span>
                <div>
                  <h4 className="crisis-title">{t('Khủng Hoảng Sinh Tử Đang Rình Rập', 'Acute Crisis Unfolding')}</h4>
                  <p className="crisis-desc">
                    {lang === 'en' ? npc.crisis.labelEn || 'Urgent Peril' : npc.crisis.labelVi || 'Nguy nan cấp bách'} (Mức độ: {npc.crisis.severity}%)
                  </p>
                </div>
              </div>
              <div className="crisis-severity-bar">
                <div className="crisis-severity-fill" style={{ width: `${npc.crisis.severity}%` }} />
              </div>
            </section>
          )}

          {/* Dungeon Tag-Team Perk Card */}
          {perk && (
            <section className="npc-dossier-section perk-card">
              <div className="perk-card-head">
                <span className="perk-badge">{t('Kỹ Năng Đồng Hành Hầm Ngục', 'Dungeon Companion Perk')}</span>
                <h4 className="perk-name">{lang === 'en' ? perk.nameEn : perk.nameVi}</h4>
              </div>
              <p className="perk-desc">{lang === 'en' ? perk.descEn : perk.descVi}</p>
            </section>
          )}

          {/* Shared Memories Timeline */}
          {Array.isArray(npc.memories) && npc.memories.length > 0 && (
            <section className="npc-dossier-section memories-section">
              <h4 className="memories-title">{t('Dòng Thời Gian Kề Vai Sát Cánh', 'Shared Memories Timeline')}</h4>
              <ul className="memories-list">
                {npc.memories.map((m, idx) => (
                  <li key={idx} className="memory-item">
                    <i className="memory-bullet" aria-hidden="true" />
                    <span className="memory-text">{lang === 'en' ? m.en : m.vi}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Action Feedback Notification */}
          {feedback && (
            <div className={`npc-action-feedback ${feedback.isError ? 'is-error' : 'is-success'}`}>
              {feedback.text}
            </div>
          )}
        </div>

        {/* Interactive Action Dock */}
        {!isGone && (
          <footer className="npc-dossier-footer">
            <h4 className="action-dock-title">{t('Hành Động Tương Tác Tri Kỷ', 'Companion Actions')}</h4>
            <div className="npc-action-grid">
              {NPC_INTERACTION_ACTIONS.map((action) => {
                const check = canInteractWithNpc(char, npcRole, action.id);
                return (
                  <button
                    key={action.id}
                    type="button"
                    className={`npc-action-btn ${!check.ok ? 'is-disabled' : ''}`}
                    disabled={!check.ok || loadingAction === action.id}
                    onClick={() => handleAction(action.id)}
                    title={!check.ok ? (lang === 'en' ? check.reasonEn : check.reasonVi) : ''}
                  >
                    <span className="action-name">{lang === 'en' ? action.nameEn : action.nameVi}</span>
                    <span className="action-cost">
                      {action.id === 'drink_confide' && '-4 Ahn'}
                      {action.id === 'spar_coordinate' && '-2 HP'}
                      {action.id === 'emergency_aid' && (lang === 'en' ? 'Aid Crisis' : 'Cứu viện')}
                      {action.id === 'call_favor' && (lang === 'en' ? 'Use Favor' : 'Đòi ân nghĩa')}
                    </span>
                  </button>
                );
              })}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};
