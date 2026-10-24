import React from 'react';
import { Tooltip } from 'antd';
import { ChevronDown, ChevronUp, User, Heart, Brain, Coins, Flame, Eye, Sparkles, X, ShieldAlert, ShoppingBag, HelpCircle } from 'lucide-react';
import { WorkshopDepotModal } from './WorkshopDepotModal';
import { useGameStore } from '../../../store/gameStore';
import { useThemeStore } from '../../../store/themeStore';
import { REGIONS, FAMILIES, FINGER_RANKS } from '../../../data/worldData';
import { FATE_OMENS } from '../../../engine/weaverAI';
import { SEASONS, getNextCareerMilestone } from '../../../engine/gameEngine';
import { audioEngine } from '../../../engine/audioEngine';
import { gameFeel } from '../../../engine/gameFeel';
import { useT } from '../../../i18n';
import { getScarProfile, MAX_ACTIVE_SCARS } from '../../../engine/scarModel';
import { getAffiliation, affiliationLabel, standingLabel } from '../../../engine/affiliation';

const JOB_LABELS = {
  Child: { vi: 'Trẻ em', en: 'Child' },
  'Wing Employee': { vi: 'Nhân viên Wing', en: 'Wing Employee' },
  'Workshop Craftsman': { vi: 'Thợ rèn Workshop', en: 'Workshop Craftsman' },
  Outcast: { vi: 'Kẻ đào tẩu', en: 'Outcast' }
};

export function describeJob(char, t) {
  if (char.job === 'Fixer') {
    return char.fixerGrade === 0
      ? `Color Fixer${char.customTitle ? ` · ${char.customTitle}` : ''}`
      : `Fixer Grade ${char.fixerGrade}`;
  }
  if (char.job === 'Syndicate' && char.finger) {
    return `The ${char.finger} · ${FINGER_RANKS[char.finger]?.[char.fingerRank || 0] || ''}`;
  }
  const local = JOB_LABELS[char.job];
  return local ? t(local.vi, local.en) : char.job || t('Chưa có nghề', 'No trade yet');
}

function formatStatModSummary(statMod, t) {
  if (!statMod) return '';
  const labels = {
    health: 'HP',
    sanity: 'SP',
    wealth: 'Ahn',
    network: t('Quan hệ', 'Network'),
    rep: 'Rep',
    heat: 'Heat',
    taboo: 'Taboo',
    resonance: t('Cộng hưởng', 'Resonance')
  };
  const parts = [];
  for (const [k, v] of Object.entries(statMod)) {
    if (!v || !labels[k]) continue;
    const sign = v > 0 ? '+' : '';
    parts.push(`${sign}${v} ${labels[k]}`);
  }
  return parts.join(' · ');
}

// When a value changes, float the difference above the bar for a moment
function useChange(value) {
  const prev = React.useRef(value);
  const [change, setChange] = React.useState(null);
  React.useEffect(() => {
    const d = value - prev.current;
    prev.current = value;
    if (!d) return undefined;
    setChange({ d, at: Date.now() });
    const timer = setTimeout(() => setChange(null), 1600);
    return () => clearTimeout(timer);
  }, [value]);
  return change;
}

// One stat: its own hue on the bar; a critical level turns the bar red and names it
const Stat = ({ label, value, unit = '/100', color, flag, riseIsBad = false, tooltip = null }) => {
  const change = useChange(value);
  const good = change && (riseIsBad ? change.d < 0 : change.d > 0);
  const flashClass = change ? (good ? 'is-flash-up' : 'is-flash-down') : '';
  const isCritical = ['HP', 'SP'].includes(label) && value <= 20;

  React.useEffect(() => {
    if (!change) return;
    if (good) {
      audioEngine.playBuff();
    } else {
      const delta = Math.abs(change.d);
      audioEngine.playDamage(Math.min(1.8, Math.max(0.6, delta / 7)));
      gameFeel.addTrauma(Math.min(0.65, 0.2 + delta * 0.025));
    }
  }, [change?.at]);

  React.useEffect(() => {
    if (isCritical && change && !good) {
      audioEngine.playDanger();
    }
  }, [isCritical, change?.at]);

  return (
    <div className={`stat ${flashClass} ${isCritical ? 'is-critical' : ''}`}>
      <div className="stat-head">
        <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <i className="dot" style={{ background: isCritical ? 'var(--bad)' : color }} />
          <span>{label}</span>
          {tooltip && (
            <Tooltip title={tooltip} placement="top">
              <span
                role="button"
                tabIndex={0}
                aria-label="Thông tin chỉ số"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'help',
                  color: 'var(--ink-muted)',
                  marginLeft: 2,
                  opacity: 0.85
                }}
              >
                <HelpCircle size={12} />
              </span>
            </Tooltip>
          )}
          {flag && <span className="stat-flag">{flag}</span>}
          {isCritical && <span className="stat-flag is-warn">CRIT</span>}
        </span>
        <div className="stat-num-box">
          {change && (
            <span key={change.at} className={`stat-delta-badge ${good ? 'is-up' : 'is-down'}`} aria-hidden="true">
              {good ? '▲' : '▼'} {change.d > 0 ? `+${change.d}` : change.d}
            </span>
          )}
          <b className={`${change ? (good ? 'val-up' : 'val-down') : ''} ${isCritical ? 'val-crit' : ''}`}>
            {value}
            {unit && <small> {unit}</small>}
          </b>
        </div>
      </div>
      <div className={`bar ${flashClass}`}>
        <i
          key={change ? `bar_${change.at}` : 'steady'}
          style={{ width: `${Math.max(0, Math.min(100, value))}%`, '--c': flag || isCritical ? 'var(--bad)' : color }}
        />
      </div>
    </div>
  );
};

const TabooStat = ({ value, tooltip = null }) => {
  const change = useChange(value);
  const good = change && change.d < 0;
  const flashClass = change ? (good ? 'is-flash-up' : 'is-flash-down') : '';

  React.useEffect(() => {
    if (!change) return;
    if (!good) {
      audioEngine.playDanger();
      gameFeel.addTrauma(0.5);
    }
  }, [change?.at]);

  return (
    <div className={`stat ${flashClass}`}>
      <div className="stat-head">
        <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <i className="dot" style={{ background: 'var(--bad)' }} />
          <span>Taboo Gaze</span>
          {tooltip && (
            <Tooltip title={tooltip} placement="top">
              <span
                role="button"
                tabIndex={0}
                aria-label="Thông tin chỉ số"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'help',
                  color: 'var(--ink-muted)',
                  marginLeft: 2,
                  opacity: 0.85
                }}
              >
                <HelpCircle size={12} />
              </span>
            </Tooltip>
          )}
        </span>
        <div className="stat-num-box">
          {change && (
            <span key={change.at} className={`stat-delta-badge ${good ? 'is-up' : 'is-down'}`} aria-hidden="true">
              {good ? '▲' : '▼'} {change.d > 0 ? `+${change.d}` : change.d}
            </span>
          )}
          <b className={change ? (good ? 'val-up' : 'val-down') : ''}>
            {value}
            <small> /3</small>
          </b>
        </div>
      </div>
      <div className={`taboo ${flashClass}`} aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i key={n} className={value >= n ? 'is-on' : ''} />
        ))}
      </div>
    </div>
  );
};

const ROLE_LABELS = {
  friend: ['Bạn thuở nhỏ', 'Childhood friend'],
  mentor: ['Người thầy', 'Mentor'],
  rival: ['Đối thủ', 'Rival'],
  lover: ['Người thương', 'Beloved'],
  spouse: ['Bạn đời', 'Spouse'],
  partner: ['Cộng sự', 'Partner'],
  child: ['Con', 'Child'],
  nemesis: ['Kẻ thù', 'Nemesis']
};

const STATUS_LABELS = {
  dead: ['Đã chết', 'Dead'],
  missing: ['Mất tích', 'Missing'],
  estranged: ['Đã rời bỏ bạn', 'Gone from your life'],
  betrayer: ['Đã phản bội bạn', 'Betrayed you']
};

function bondTierInfo(bond = 0, role = '') {
  if (role === 'nemesis') return { vi: 'Thù địch', en: 'Nemesis', color: 'var(--state-danger)' };
  if (bond >= 80) return { vi: 'Gắn kết (+Tỉ lệ)', en: 'Sworn (+Odds)', color: 'var(--accent-gold)' };
  if (bond >= 52) return { vi: 'Tin cậy (+Hỗ trợ)', en: 'Trusted (+Aid)', color: 'var(--state-chill)' };
  if (bond >= 30) return { vi: 'Ổn định', en: 'Steady', color: 'var(--s-rep)' };
  if (bond >= 18) return { vi: 'Rạn nứt (-Tỉ lệ)', en: 'Strained (-Odds)', color: 'var(--s-heat)' };
  return { vi: 'Bất mãn / Dễ phản (!)', en: 'Hostile / Betrayal Risk (!)', color: 'var(--state-danger)' };
}

// The people in this life, each with what they are like and how close you are
const People = ({ npcs, age, t, lang }) => {
  const list = Object.entries(npcs || {}).filter(([, n]) => Boolean(n));
  if (!list.length) {
    return (
      <section>
        <h3 className="section-title">{t('Những người trong đời bạn', 'The people in your life')}</h3>
        <p className="muted" style={{ fontSize: 13, fontStyle: 'italic', padding: '8px 0' }}>
          {t('Hiện tại bạn sống cô độc giữa The City, chưa có mối liên hệ thân thiết nào.', 'You currently walk alone in The City, holding no close bonds.')}
        </p>
      </section>
    );
  }
  const gone = (n) => n.deceased || ['dead', 'missing', 'estranged', 'betrayer'].includes(n.status);
  list.sort(([, a], [, b]) => Number(gone(a)) - Number(gone(b)));
  return (
    <section>
      <h3 className="section-title">{t('Những người trong đời bạn', 'The people in your life')}</h3>
      {list.map(([role, n]) => {
        const isGone = gone(n);
        const status = n.deceased ? 'dead' : n.status;
        const since = age - (n.lastSeen ?? n.metAge ?? 0);
        const tier = bondTierInfo(n.bond ?? 0, role);
        return (
          <div key={role} className={`npc ${isGone ? 'is-gone' : ''}`}>
            <div className="npc-head">
              <b>{lang === 'en' ? n.nameEn || n.nameVi : n.nameVi}</b>
              <span>{t(...(ROLE_LABELS[role] || [role, role]))}</span>
            </div>
            {(n.traitVi || n.traitEn) && <p className="npc-trait">{lang === 'en' ? n.traitEn : n.traitVi}</p>}
            {isGone ? (
              <span className="npc-status">{t(...(STATUS_LABELS[status] || STATUS_LABELS.dead))}</span>
            ) : (
              <>
                <div className="stat-head" style={{ marginBottom: 0, fontSize: 13 }}>
                  <span className="muted">
                    {since >= 3 ? t(`Đã ${since} năm không gặp`, `Not seen in ${since} years`) : t('Gắn bó', 'Bond')}
                    {' · '}
                    <em style={{ fontStyle: 'normal', color: tier.color, fontWeight: 600 }}>{t(tier.vi, tier.en)}</em>
                  </span>
                  <b>{n.bond ?? 0}</b>
                </div>
                <div className="bar" style={{ height: 4 }}>
                  <i style={{ width: `${n.bond ?? 0}%`, '--c': tier.color }} />
                </div>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

const DossierContent = ({ char, milestone, region, omen, items, t, lang, activeTab = 'all', onOpenDepot }) => {
  const { health, sanity, wealth, network, rep } = char.stats;

  const showOverview = activeTab === 'all' || activeTab === 'overview';
  const showCareer = activeTab === 'all' || activeTab === 'career';
  const showRelations = activeTab === 'all' || activeTab === 'relations';

  return (
    <>
      <div className="dossier-head">
        <span className="dossier-gen num">
          {t('Thế hệ', 'Gen')} #{char.generation}
        </span>
        <div className="dossier-id">
          <h2>{char.name}</h2>
          <p>{describeJob(char, t)}</p>
          {char.customTitle && (
            <div className="dossier-color-crest">
              <span className="crest-swatch" />
              <span className="crest-title">{char.customTitle}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tab: Career & Equipment */}
      {showCareer && milestone && (
        <section className="career-objective-card">
          <div className="career-obj-header">
            <span className="career-obj-tag">
              {lang === 'en' ? (milestone.categoryEn || milestone.category) : (milestone.categoryVi || milestone.category)}
            </span>
            {milestone.category !== 'WORKSHOP' && <span className="career-obj-pct num">{milestone.progressPct}%</span>}
          </div>
          <h4 className="career-obj-title">{lang === 'en' ? milestone.titleEn : milestone.titleVi}</h4>
          {milestone.category !== 'WORKSHOP' && <div className="career-obj-bar">
            <i style={{ width: `${milestone.progressPct}%` }} />
          </div>}
          {milestone.category !== 'WORKSHOP' && <div className="career-obj-reqs">
            {milestone.requirements.map((req, idx) => (
              <div key={idx} className={`career-req-item ${req.met ? 'is-met' : ''}`}>
                <span className="req-status">{req.met ? '✓' : '○'}</span>
                <span className="req-label">{lang === 'en' ? req.labelEn : req.labelVi}</span>
                <span className="req-val num">{req.current}/{req.target}</span>
              </div>
            ))}
          </div>}
          <p className="career-obj-tip">{lang === 'en' ? milestone.tipEn : milestone.tipVi}</p>
        </section>
      )}

      {showCareer && items.length > 0 && (
        <section>
          <h3 className="section-title">{t('Trang bị & Vũ khí', 'Equipment & Relics')}</h3>
          {items.map((it) => (
            <div className="kv" key={it.k}>
              <span>{it.k}</span>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{it.v}</span>
            </div>
          ))}
        </section>
      )}

      {/* Tab: Overview & Stats */}
      {showOverview && (
        <section>
          {/* District Context Card */}
          <div className="dossier-context-card kv-stack">
            <div className="context-card-header">
              <span className="context-card-tag">{t('Khu vực', 'District')}</span>
              <span className="context-card-val">{lang === 'en' ? region.nameEn : region.nameVi}</span>
            </div>
            {(lang === 'en' ? region.singularityEn : region.singularityVi) && (
              <div className="context-feature-box kv-perk-note">
                <b>{t('Đặc trưng', 'Singularity')}:</b> {lang === 'en' ? region.singularityEn : region.singularityVi}
              </div>
            )}
            <div className="metric-pill-row">
              <span className="metric-pill">
                <span>{t('An ninh', 'Safety')}</span>
                <b>{region.safety}/10</b>
              </span>
              <span className="metric-pill">
                <span>{t('Y tế', 'Medical')}</span>
                <b>{region.medical}/10</b>
              </span>
              <span className="metric-pill">
                <span>{t('Kinh tế', 'Wealth')}</span>
                <b>{region.wealth}/10</b>
              </span>
              <span className="metric-pill">
                <span>{t('Tuổi thọ TB', 'Avg Life')}</span>
                <b>{region.avgLife}</b>
              </span>
            </div>
          </div>

          {/* Background / Family Context Card */}
          {char.family && (() => {
            const famDef = FAMILIES.find((f) => f.id === char.family?.id) || char.family;
            const modSummary = formatStatModSummary(famDef?.statMod, t);
            const trait = char.backgroundTrait || famDef?.trait;
            return (
              <div className="dossier-context-card kv-stack">
                <div className="context-card-header">
                  <span className="context-card-tag">{t('Xuất thân', 'Background')}</span>
                  <span className="context-card-val" style={{ color: 'var(--accent-gold, #ffd700)' }}>
                    {lang === 'en' ? char.family.nameEn : char.family.nameVi}
                  </span>
                </div>
                {modSummary && (
                  <div className="context-feature-box kv-perk-note" style={{ borderLeftColor: 'var(--accent-gold, #ffd700)' }}>
                    <b>{t('Chỉ số khởi đầu', 'Starting bonus')}:</b>{' '}
                    <span className="stat-bonus-badge">{modSummary}</span>
                  </div>
                )}
                {trait && (
                  <div className="context-feature-box kv-perk-note">
                    <b>{t('Phúc lợi', 'Perk')} · {lang === 'en' ? trait.nameEn : trait.nameVi}:</b>{' '}
                    {lang === 'en' ? trait.descEn : trait.descVi}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Faction, Merit & Fate Omen Meta Card */}
          <div className="dossier-meta-card">
            <div className="kv" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '6px 0' }}>
              <span>{t('Tổ chức', 'Faction')}</span>
              <span className="kv-val-wrap">{getAffiliation(char) ? affiliationLabel(char, lang) : (char.org?.name || (char.finger ? `The ${char.finger}` : t('Tự do', 'Unaffiliated')))}</span>
            </div>
            {getAffiliation(char) && (
              <div className="kv" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '6px 0' }}>
                <span>{t('Tín nhiệm', 'Standing')}</span>
                <span className="kv-val-wrap">{standingLabel(char, lang)}</span>
              </div>
            )}
            {char.mentee && char.npcs?.mentee && (
              <div className="kv" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '6px 0' }}>
                <span>{t('Đang dìu dắt', 'Training')}</span>
                <span className="kv-val-wrap">{lang === 'en' ? char.npcs.mentee.nameEn : char.npcs.mentee.nameVi}</span>
              </div>
            )}
            {char.job !== 'Child' && (
              <div className="kv" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '6px 0' }}>
                <span>Merit</span>
                <span className="num">{char.merit}</span>
              </div>
            )}
            <Tooltip title={lang === 'en' ? omen.descEn : omen.descVi} placement="right">
              <div className="kv" style={{ cursor: 'help', padding: '6px 0' }}>
                <span>{t('Điềm báo', 'Fate omen')}</span>
                <span style={{ color: 'var(--accent)' }}>{(lang === 'en' ? omen.nameEn : omen.nameVi).split(' · ')[0]}</span>
              </div>
            </Tooltip>
          </div>
        </section>
      )}

      {showOverview && (
        <section>
          <h3 className="section-title">{t('Chỉ số', 'Vitals')}</h3>
          <Stat label="HP" value={health} color="var(--s-health)" flag={health <= 25 ? 'CRITICAL' : null} tooltip={t('Sinh lực. Về 0 có thể chết vì thương tích; được hồi bằng điều trị và nghỉ cuối năm.', 'Vitality. Reaching 0 can be fatal; treatment and year-end rest restore it.')} />
          <Stat label="SP" value={sanity} color="var(--s-sanity)" flag={sanity <= 22 ? 'Carmen Calls' : null} tooltip={t('Tinh thần. Về 0 dẫn tới khủng hoảng; chỗ dựa và nghỉ ngơi giúp hồi phục.', 'Sanity. Reaching 0 triggers a crisis; support and rest help restore it.')} />
          <Stat label={t('Tiền mặt', 'Wealth')} value={wealth} unit="Ahn" color="var(--s-wealth)" flag={wealth <= 5 ? t('Cạn tiền', 'Near ruin') : null} tooltip={t('Ahn dùng cho sinh hoạt, mua tin và điều trị.', 'Ahn pays for living costs, intelligence, and treatment.')} />
          <Stat label={t('Quan hệ', 'Network')} value={network} color="var(--s-network)" />
          <Stat label={t('Danh tiếng', 'Reputation')} value={rep} color="var(--s-rep)" />
        </section>
      )}

      {showOverview && (
        <section>
          <h3 className="section-title">{t('Áp lực', 'Causal pressure')}</h3>
          <Stat
            label="Syndicate Heat"
            value={char.heat || 0}
            unit="%"
            color="var(--s-heat)"
            flag={(char.heat || 0) >= 70 ? 'Hunted' : null}
            riseIsBad
            tooltip={t(
              'Syndicate Heat: Mức độ truy nã và căm phẫn từ các băng đảng Backstreets. Khi vượt quá 70%, sát thủ và thợ săn tiền thưởng sẽ liên tục phục kích bạn.',
              'Syndicate Heat: Backstreet Syndicate hostility and bounty level. Above 70%, hitmen and bounty hunters will relentlessly ambush you.'
            )}
          />
          <Stat
            label="E.G.O Resonance"
            value={char.resonance || 0}
            unit="%"
            color="var(--s-reso)"
            flag={char.flags?.includes('EGOAwakened') ? 'E.G.O' : (char.resonance || 0) >= 50 ? 'READY' : null}
            tooltip={t(
              'E.G.O Resonance: Mức cộng hưởng với Ánh Sáng (The Light). Đạt từ 50%–60% Cộng hưởng (hoặc có Vết sẹo + 50% Cộng hưởng) ở tuổi trưởng thành sẽ mở ra Ngã rẽ Ánh Sáng để thức tỉnh E.G.O.',
              'E.G.O Resonance: Affinity with the Light. Reaching 50%–60% Resonance (or 50% with an active scar) in adulthood unlocks the Crossroads of the Light to awaken E.G.O.'
            )}
          />
          <TabooStat
            value={char.taboo || 0}
            tooltip={t(
              'Taboo Gaze: Mức độ vi phạm Điều Cấm Kỵ của The Head. Đạt 3/3, Claw của C Corp sẽ đến ngay. Không thể rút lui: gục ngã là chết; vượt qua sẽ mở kết thúc đặc biệt ở Outskirts.',
              'Taboo Gaze: Violations of the Head’s Taboos. At 3/3, a C Corp Claw arrives at once. There is no retreat: collapse means death; survival unlocks a special Outskirts ending.'
            )}
          />
        </section>
      )}

      {/* Tab: Relations & Scars */}
      {showRelations && <People npcs={char.npcs} age={char.age} t={t} lang={lang} />}

      {showRelations && (char.scars.length > 0 || char.scarHistory?.length > 0) && (
        <section>
          <h3 className="section-title">{t('Dấu tích còn mang', 'Active marks')} <small>{t(`Tối đa ${MAX_ACTIVE_SCARS} dấu tích có tác động. Dấu cũ được giữ trong tiểu sử.`, `Up to ${MAX_ACTIVE_SCARS} active marks. Older marks remain in your history.`)}</small></h3>
          <div className="scar-list">
            {char.scars.map((s, i) => {
              const profile = getScarProfile(s);
              if (!profile) return null;
              return <article className="scar-card" key={`${s}_${i}`}>
                <div className="scar-card-heading"><strong>{s}</strong><span>{t(profile.labelVi, profile.labelEn)}</span></div>
                <p className="scar-boon">+ {t(profile.boonVi, profile.boonEn)}</p>
                <p className="scar-cost">− {t(profile.costVi, profile.costEn)}</p>
              </article>;
            })}
          </div>
          {(char.scarHistory?.length || 0) > 0 && <details><summary>{t(`${char.scarHistory.length} dấu tích cũ`, `${char.scarHistory.length} older marks`)}</summary><div className="chips">{char.scarHistory.map((scar, index) => <span className="chip" key={`${scar}_${index}`}>{scar}</span>)}</div></details>}
        </section>
      )}
    </>
  );
};

export const CharacterDossierCard = () => {
  const { t, lang } = useT();
  const char = useGameStore((s) => s.char);
  const { mobileDossierOpen: drawerOpen, setMobileDossierOpen: setDrawerOpen } = useThemeStore();
  const [mobileTab, setMobileTab] = React.useState('overview');
  const sheetRef = React.useRef(null);
  React.useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.activeElement;
    const sheet = sheetRef.current;
    sheet?.querySelector('button')?.focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setDrawerOpen(false); return; }
      if (event.key !== 'Tab') return;
      const controls = [...sheet.querySelectorAll('button:not(:disabled), a[href], input, select, [tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => { document.removeEventListener('keydown', handleKey, true); previous?.focus(); };
  }, [drawerOpen]);

  const region = REGIONS.find((r) => r.id === char.regionId) || REGIONS[0];
  const omen = FATE_OMENS.find((o) => o.id === (char.fateOmenId || char.weaver?.mode)) || FATE_OMENS[0];
  const { health, sanity, wealth, network, rep } = char.stats;
  const milestone = getNextCareerMilestone(char);
  const yearProgress = useGameStore((s) => s.yearProgress);
  const currentSeason = SEASONS[char.seasonIdx] || SEASONS[0];
  const items = [
    char.egoName && { k: 'E.G.O', v: char.egoName },
    char.craftWeapon && { k: t('Thần binh', 'Weapon'), v: char.craftWeapon.name },
    char.lineage?.relic && !char.craftWeapon && { k: t('Di vật', 'Relic'), v: char.lineage.relic }
  ].filter(Boolean);

  const jobDesc = describeJob(char, t);
  const isHpCritical = health <= 20;
  const isSpCritical = sanity <= 20;
  const tabooLevel = char.taboo || 0;

  const isColor = Boolean(char.isColorFixer || char.fixerGrade === 0 || char.flags?.includes('ColorFixer') || char.customTitle);
  const isFingerApex = char.job === 'Syndicate' && (char.fingerRank || 0) >= 2;
  const isWingApex = char.job === 'Wing Employee' && (char.wingRank || 0) >= 2;
  const isApex = isColor || isFingerApex || isWingApex;

  const colorData = char.colorData;
  const apexStyle = isColor && colorData?.color ? {
    '--apex-color': colorData.color,
    '--apex-glow': colorData.glow || 'rgba(212, 175, 55, 0.4)'
  } : {};

  return (
    <>
      {/* 1. Dedicated Mobile Status Header (Safe-Area Protected, All Vitals + Timeline in View) */}
      <div 
        className="mobile-resource-hud" 
        onClick={() => setDrawerOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={event => { if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); event.stopPropagation(); setDrawerOpen(true); } }}
        aria-label={t('Chỉ số nhân vật và tài nguyên - Bấm để mở hồ sơ chi tiết', 'Character stats and resources - Tap to open dossier')}
      >
        {/* Row 1: who, when, and the dossier button */}
        <div className="hud2-top">
          <div className="hud2-who">
            <span className="hud2-name">{char.name}</span>
            <span className="hud2-gen">#{char.generation}</span>
            <span className="hud2-when">
              {jobDesc.split(' · ')[0]} · <b>{t(`Tuổi ${char.age}`, `Age ${char.age}`)}</b> · {t(currentSeason?.vi, currentSeason?.en)}
            </span>
          </div>
          <button
            type="button"
            className="m-hud-open-btn hud2-open"
            onClick={(e) => {
              e.stopPropagation();
              setDrawerOpen(true);
            }}
            aria-label={t('Xem hồ sơ chi tiết', 'Open full dossier')}
          >
            <span>{t('Hồ sơ', 'Dossier')}</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Row 2: equal cells, so a long number can never push into its neighbour */}
        <div className="hud2-stats">
          <div className={`hud2-stat is-hp ${isHpCritical ? 'is-critical' : ''}`} title={`HP: ${health}/100`}>
            <span className="hud2-k"><Heart size={13} aria-hidden="true" />HP</span>
            <b className="hud2-v num">{health}</b>
            <i className="hud2-bar"><i style={{ width: `${Math.max(0, Math.min(100, health))}%` }} /></i>
          </div>
          <div className={`hud2-stat is-sp ${isSpCritical ? 'is-critical' : ''}`} title={`SP: ${sanity}/100`}>
            <span className="hud2-k"><Brain size={13} aria-hidden="true" />SP</span>
            <b className="hud2-v num">{sanity}</b>
            <i className="hud2-bar"><i style={{ width: `${Math.max(0, Math.min(100, sanity))}%` }} /></i>
          </div>
          <div className="hud2-stat is-ahn" title={t('Tiền mặt Ahn', 'Ahn Wealth')}>
            <span className="hud2-k"><Coins size={13} aria-hidden="true" />Ahn</span>
            <b className="hud2-v num">{wealth}</b>
          </div>
        </div>

        <div className="hud2-secondary" aria-label={t('Chỉ số bổ sung', 'Additional stats')}>
          <span title={t('Quan hệ', 'Network')}><span>{t('Quan hệ', 'Network')}</span><b>{network}</b></span>
          <span title={t('Danh tiếng', 'Reputation')} aria-label={t(`Danh tiếng ${rep}`, `Reputation ${rep}`)}><span>Rep</span><b>{rep}</b></span>
          <span title={t('Mức độ truy nã', 'Heat Level')} className={char.heat >= 65 ? 'is-danger' : ''}><span>Heat</span><b>{char.heat || 0}</b></span>
          <span title={t('Cộng hưởng E.G.O', 'E.G.O Resonance')}><span>E.G.O</span><b>{char.resonance || 0}%</b></span>
          <span title={t('Ánh nhìn Taboo', 'Taboo Gaze')} className={tabooLevel >= 2 ? 'is-danger' : ''}><span>Taboo</span><b>{tabooLevel}/3</b></span>
        </div>

        {/* Row 3: the year, and the next career goal */}
        <div className="hud2-year">
          <i className="hud2-year-track"><i style={{ width: `${Math.max(0, Math.min(100, yearProgress || 0))}%` }} /></i>
          {milestone && milestone.category !== 'WORKSHOP' && milestone.progressPct < 100 ? (
            <span className="hud2-goal" title={lang === 'en' ? milestone.titleEn : milestone.titleVi}>
              <span>{lang === 'en' ? milestone.titleEn : milestone.titleVi}</span>
              <b>{milestone.progressPct}%</b>
            </span>
          ) : (
            <span className="hud2-goal is-place">{region ? (lang === 'en' ? region.nameEn : region.nameVi) : ''}</span>
          )}
        </div>
      </div>

      {/* 2. Mobile Dossier Drawer (Slides up when drawerOpen is true on mobile) */}
      {drawerOpen && (
        <div 
          className="mobile-dossier-overlay" 
          onClick={() => setDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t('Hồ sơ nhân vật chi tiết', 'Full Character Dossier')}
        >
          <div
            className={`mobile-dossier-sheet ${isColor ? 'is-color-fixer' : ''} ${isApex ? 'is-apex-rank' : ''}`}
            style={apexStyle}
            ref={sheetRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-dossier-sheet-head">
              <div className="sheet-drag-handle" />
              <div className="sheet-title-row">
                <div className="sheet-title-info">
                  <b>{char.name}</b>
                  <span>Gen #{char.generation} · {jobDesc}</span>
                </div>
                <button
                  type="button"
                  className="icon-btn sheet-close-btn"
                  onClick={() => setDrawerOpen(false)}
                  aria-label={t('Đóng hồ sơ', 'Close dossier')}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile Dossier Segmented Tabs */}
              <div className="m-sheet-tabs" role="tablist" onKeyDown={event => {
                if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
                event.preventDefault();
                const tabs = [...event.currentTarget.querySelectorAll('[role="tab"]')];
                const next = tabs[(tabs.indexOf(document.activeElement) + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
                next?.click(); next?.focus();
              }}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileTab === 'overview'}
                  className={`m-sheet-tab ${mobileTab === 'overview' ? 'is-active' : ''}`}
                  onClick={() => setMobileTab('overview')}
                >
                  {t('Chỉ số', 'Vitals')}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileTab === 'career'}
                  className={`m-sheet-tab ${mobileTab === 'career' ? 'is-active' : ''}`}
                  onClick={() => setMobileTab('career')}
                >
                  {t('Sự nghiệp', 'Career')}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileTab === 'relations'}
                  className={`m-sheet-tab ${mobileTab === 'relations' ? 'is-active' : ''}`}
                  onClick={() => setMobileTab('relations')}
                >
                  {t('Mối quan hệ', 'Bonds')}
                </button>
              </div>
            </div>
            <div className="mobile-dossier-sheet-body">
              <DossierContent
                char={char}
                milestone={milestone}
                region={region}
                omen={omen}
                items={items}
                t={t}
                lang={lang}
                activeTab={mobileTab}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Desktop Sidebar (Visible only on > 820px) */}
      <aside
        className={`side desktop-dossier-side ${isColor ? 'is-color-fixer' : ''} ${isApex ? 'is-apex-rank' : ''}`}
        style={apexStyle}
        aria-label={t('Hồ sơ nhân vật', 'Character')}
      >
        <DossierContent
          char={char}
          milestone={milestone}
          region={region}
          omen={omen}
          items={items}
          t={t}
          lang={lang}
        />
      </aside>
    </>
  );
};

export default CharacterDossierCard;
