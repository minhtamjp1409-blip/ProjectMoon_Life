import React from 'react';
import { Tooltip } from 'antd';
import { ChevronDown, ChevronUp, User, Heart, Brain, Coins, Flame, Eye, Sparkles, X, ShieldAlert, ShoppingBag, HelpCircle, Crown, Star } from 'lucide-react';
import { WorkshopDepotModal } from './WorkshopDepotModal';
import { useGameStore } from '../../../store/gameStore';
import { useThemeStore } from '../../../store/themeStore';
import { REGIONS, FAMILIES, FINGER_RANKS } from '../../../data/worldData';
import { FATE_OMENS } from '../../../engine/weaverAI';
import { SEASONS, WING_RANKS, getNextCareerMilestone } from '../../../engine/gameEngine';
import { audioEngine } from '../../../engine/audioEngine';
import { gameFeel } from '../../../engine/gameFeel';
import { useT } from '../../../i18n';
import { getScarProfile, activeScarSynergies, MAX_ACTIVE_SCARS } from '../../../engine/scarModel';
import { getAffiliation, affiliationLabel, standingLabel } from '../../../engine/affiliation';
import { rankPlateOf } from '../../../engine/sceneContext';
import { localizeEnsembleName } from '../../../data/ensembleNames.js';

const JOB_LABELS = {
  Child: { vi: 'Trẻ em', en: 'Child' },
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
  if (char.job === 'Wing Employee') {
    const rank = WING_RANKS[Math.min(WING_RANKS.length - 1, char.wingRank || 0)];
    return `Wing · ${t(rank.titleVi.split(' (')[0], rank.titleEn)}`;
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
        <span className="label stat-label">
          <i className="dot" style={{ background: isCritical ? 'var(--bad)' : color }} />
          <span>{label}</span>
          {tooltip && (
            <Tooltip title={tooltip} placement="top">
              <span
                role="button"
                tabIndex={0}
                aria-label="Thông tin chỉ số"
                className="stat-help"
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

const TabooStat = ({ value, tooltip = null, flag = null }) => {
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
        <span className="label stat-label">
          <i className="dot" style={{ background: 'var(--bad)' }} />
          <span>Taboo Gaze</span>
          {flag && <span className="stat-flag">{flag}</span>}
          {tooltip && (
            <Tooltip title={tooltip} placement="top">
              <span
                role="button"
                tabIndex={0}
                aria-label="Thông tin chỉ số"
                className="stat-help"
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
        <p className="empty is-inline">
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
                <div className="stat-head is-bond">
                  <span className="muted">
                    {since >= 3 ? t(`Đã ${since} năm không gặp`, `Not seen in ${since} years`) : t('Gắn bó', 'Bond')}
                    {' · '}
                    <em className="bond-tier" style={{ color: tier.color }}>{t(tier.vi, tier.en)}</em>
                  </span>
                  <b>{n.bond ?? 0}</b>
                </div>
                <div className="bar is-thin">
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

// Name and post. The top of a branch gets its own frame (see rankPlateOf): the conferred colour of a
// Hana Color, a Finger's colour at its top seat, the Wing board's blue; one step below gets a quieter one.
// Wing staff carry no org record; their employer is the Corp of the district they work in
const wingOf = (region) => (region?.tags?.includes('wing') && region.nameEn?.split(' · ')[1]) || 'Wing';

const Nameplate = ({ char, region, omen, t, lang }) => {
  const plate = rankPlateOf(char);
  const special = plate.tier !== 'plain';
  const gender = char.gender && char.gender !== 'unspecified' ? (char.gender === 'male' ? t('Nam', 'Male') : t('Nữ', 'Female')) : null;
  const faction = getAffiliation(char) ? affiliationLabel(char, lang)
    : char.org?.name || (char.finger ? `The ${char.finger}` : char.job === 'Wing Employee' ? wingOf(region) : t('Tự do', 'Unaffiliated'));
  return (
    <div className={`dossier-head nameplate is-${plate.tier}${special ? ` route-${plate.route}` : ''}`} style={special ? { '--plate': plate.color } : undefined}>
      {special && (
        <span className="nameplate-rank">
          <Crown size={13} aria-hidden="true" />
          {t(plate.vi, plate.en)}
        </span>
      )}
      <span className="dossier-gen">
        <span className="num">{t('Thế hệ', 'Gen')} #{char.generation}</span>
        {gender && <span>{gender}</span>}
      </span>
      <div className="dossier-id">
        <h2>{char.name}{char.flags?.includes('EnsembleSurvivor') && <span className="ensemble-mark" title={t('Ngôi sao không tắt · sống sót qua Ensemble', 'The star that would not go out · Ensemble survivor')}><Star size={16} aria-label={t('Sống sót qua Ensemble', 'Ensemble survivor')} /></span>}</h2>
        <p className="nameplate-post">{describeJob(char, t)}</p>
      </div>
      <div className="nameplate-facts">
        <div className="kv">
          <span>{t('Tổ chức', 'Faction')}</span>
          <span className="kv-val-wrap">{faction}</span>
        </div>
        <Tooltip title={lang === 'en' ? omen.descEn : omen.descVi} placement="right">
          <div className="kv is-help">
            <span>{t('Điềm báo', 'Fate omen')}</span>
            <span className="text-accent">{(lang === 'en' ? omen.nameEn : omen.nameVi).split(' · ')[0]}</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

const DossierContent = ({ char, milestone, region, omen, items, t, lang, activeTab = 'all', onOpenDepot }) => {
  const { health, sanity, wealth, network, rep } = char.stats;

  const showOverview = activeTab === 'all' || activeTab === 'overview';
  const showCareer = activeTab === 'all' || activeTab === 'career';
  const showRelations = activeTab === 'all' || activeTab === 'relations';

  return (
    <>
      <Nameplate char={char} region={region} omen={omen} t={t} lang={lang} />

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
          {char.job === 'Wing Employee' && (
            <>
              <Stat
                label={t('Hồ sơ sạch', 'Standing')}
                value={char.standing ?? 50}
                unit="%"
                color="var(--s-network)"
                flag={(char.standing ?? 50) <= 20 ? t('Bị để mắt', 'Under review') : null}
                tooltip={t(
                  'Hồ sơ sạch: độ tin cậy của bạn với cấp trên trong Wing. Thấp dưới 20 thì kiểm toán và thanh lọc nhắm vào bạn trước.',
                  'Standing: how far your superiors in the Wing trust your record. Below 20, audits and purges come for you first.'
                )}
              />
              <Stat
                label={t('Bí mật nắm giữ', 'Leverage')}
                value={char.leverage || 0}
                unit="%"
                color="var(--s-heat)"
                flag={(char.leverage || 0) >= 60 ? t('Bị nhòm ngó', 'Noticed') : null}
                riseIsBad
                tooltip={t(
                  'Bí mật nắm giữ: những gì bạn biết về người khác. Mở được cửa, nhưng từ 60 trở lên hồ sơ sạch bị bào mòn mỗi năm và thế lực phía trên bắt đầu để ý.',
                  'Leverage: what you know about other people. It opens doors, but from 60 up your standing erodes each year and those above start to notice.'
                )}
              />
            </>
          )}
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
            flag={(char.taboo || 0) === 2 ? t('Lần tới: Claw', 'Next: the Claw') : null}
            tooltip={t(
              'Taboo Gaze: Mức độ vi phạm Điều Cấm Kỵ của The Head. Đạt 3/3, Claw của C Corp sẽ đến ngay. Không thể rút lui: gục ngã là chết; vượt qua sẽ mở kết thúc đặc biệt ở Outskirts.',
              'Taboo Gaze: Violations of the Head’s Taboos. At 3/3, a C Corp Claw arrives at once. There is no retreat: collapse means death; survival unlocks a special Outskirts ending.'
            )}
          />
        </section>
      )}

      {/* Tab: Career & Equipment */}
      {showCareer && milestone && (
        <section className="career-objective-card">
          <div className="career-obj-header">
            <span className="career-obj-tag">{milestone.category}</span>
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

      {/* Tab: Overview & Stats */}
      {showOverview && (
        <details className="dossier-fold">
          <summary>
            <span>{t('Khu vực & xuất thân', 'District & background')}</span>
            <small>{lang === 'en' ? region.nameEn : region.nameVi}</small>
          </summary>
          <div className="dossier-fold-body">
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
                  <span className="context-card-val text-accent">
                    {lang === 'en' ? char.family.nameEn : char.family.nameVi}
                  </span>
                </div>
                {modSummary && (
                  <div className="context-feature-box kv-perk-note is-gold">
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

          {/* Standing, mentee & merit; faction and omen sit on the nameplate */}
          <div className="dossier-meta-card">
            {getAffiliation(char) && (
              <div className="kv">
                <span>{t('Tín nhiệm', 'Standing')}</span>
                <span className="kv-val-wrap">{standingLabel(char, lang)}</span>
              </div>
            )}
            {char.mentee && char.npcs?.mentee && (
              <div className="kv">
                <span>{t('Đang dìu dắt', 'Training')}</span>
                <span className="kv-val-wrap">{lang === 'en' ? char.npcs.mentee.nameEn : char.npcs.mentee.nameVi}</span>
              </div>
            )}
            {char.job !== 'Child' && (
              <div className="kv">
                <span>Merit</span>
                <span className="num">{char.merit}</span>
              </div>
            )}
          </div>
          </div>
        </details>
      )}

      {showCareer && items.length > 0 && (
        <details className="dossier-fold">
          <summary>
            <span>{t('Trang bị & Vũ khí', 'Equipment & Relics')}</span>
            <small>{items.length}</small>
          </summary>
          <div className="dossier-fold-body">
          {items.map((it) => (
            <div className="kv" key={it.k}>
              <span>{it.k}</span>
              <span className="kv-strong">{it.v}</span>
            </div>
          ))}
          </div>
        </details>
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
          {activeScarSynergies(char).map((synergy) => <article className="scar-card" key={synergy.id}>
            <div className="scar-card-heading"><strong>{t(synergy.labelVi, synergy.labelEn)}</strong><span>{t('Kết hợp', 'Synergy')}</span></div>
            <p className="scar-boon">+ {t(synergy.boonVi, synergy.boonEn)}</p>
            <p className="scar-cost">− {t(synergy.costVi, synergy.costEn)}</p>
          </article>)}
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
    char.egoName && { k: 'E.G.O', v: t(char.egoName, localizeEnsembleName(char.egoName, 'en')) },
    char.craftWeapon && { k: t('Thần binh', 'Weapon'), v: char.craftWeapon.name },
    char.lineage?.relic && !char.craftWeapon && { k: t('Di vật', 'Relic'), v: t(char.lineage.relic, localizeEnsembleName(char.lineage.relic, 'en')) }
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
  const plate = rankPlateOf(char);
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
            <span className={`hud2-name is-${plate.tier}${plate.route ? ` route-${plate.route}` : ''}`} style={plate.color ? { '--plate': plate.color } : undefined}>{char.name}{char.flags?.includes('EnsembleSurvivor') && <Star className="ensemble-mark" size={13} aria-label={t('Sống sót qua Ensemble', 'Ensemble survivor')} />}</span>
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
