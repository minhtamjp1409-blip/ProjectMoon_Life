import React from 'react';
import { Tooltip } from 'antd';
import { ChevronDown, ChevronUp, User, Heart, Brain, Coins, Flame, Eye, Sparkles, X, ShieldAlert } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';
import { REGIONS, FINGER_RANKS } from '../../../data/worldData';
import { FATE_OMENS } from '../../../engine/weaverAI';
import { getNextCareerMilestone } from '../../../engine/gameEngine';
import { audioEngine } from '../../../engine/audioEngine';
import { gameFeel } from '../../../engine/gameFeel';
import { useT } from '../../../i18n';

const JOB_LABELS = {
  Child: { vi: 'Trẻ em', en: 'Child' },
  'Wing Employee': { vi: 'Nhân viên Wing', en: 'Wing Employee' },
  'Workshop Craftsman': { vi: 'Thợ rèn Workshop', en: 'Workshop Craftsman' }
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
const Stat = ({ label, value, unit = '/100', color, flag, riseIsBad = false }) => {
  const change = useChange(value);
  const good = change && (riseIsBad ? change.d < 0 : change.d > 0);
  const flashClass = change ? (good ? 'is-flash-up' : 'is-flash-down') : '';
  const isCritical = value <= 20 && !riseIsBad;

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
        <span className="label">
          <i className="dot" style={{ background: isCritical ? 'var(--bad)' : color }} />
          {label}
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

const TabooStat = ({ value }) => {
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
        <span className="label">
          <i className="dot" style={{ background: 'var(--bad)' }} />
          Taboo Gaze
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
  estranged: ['Đã rời bỏ bạn', 'Gone from your life']
};

// The people in this life, each with what they are like and how close you are
const People = ({ npcs, age, t, lang }) => {
  const list = Object.entries(npcs || {}).filter(([, n]) => Boolean(n));
  if (!list.length) return null;
  const gone = (n) => n.deceased || ['dead', 'missing', 'estranged'].includes(n.status);
  list.sort(([, a], [, b]) => Number(gone(a)) - Number(gone(b)));
  return (
    <section>
      <h3 className="section-title">{t('Những người trong đời bạn', 'The people in your life')}</h3>
      {list.map(([role, n]) => {
        const isGone = gone(n);
        const status = n.deceased ? 'dead' : n.status;
        const since = age - (n.lastSeen ?? n.metAge ?? 0);
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
                  <span className="muted">{since >= 3 ? t(`Đã ${since} năm không gặp`, `Not seen in ${since} years`) : t('Gắn bó', 'Bond')}</span>
                  <b>{n.bond ?? 0}</b>
                </div>
                <div className="bar" style={{ height: 4 }}>
                  <i style={{ width: `${n.bond ?? 0}%`, '--c': 'var(--s-rep)' }} />
                </div>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

const DossierContent = ({ char, milestone, region, omen, items, t, lang }) => {
  const { health, sanity, wealth, network, rep } = char.stats;

  return (
    <>
      <div className="dossier-head">
        <span className="dossier-gen num">
          {t('Thế hệ', 'Gen')} #{char.generation}
        </span>
        <div className="dossier-id">
          <h2>{char.name}</h2>
          <p>{describeJob(char, t)}</p>
        </div>
      </div>

      {/* Active Career Milestone & Goals Checklist */}
      {milestone && (
        <section className="career-objective-card">
          <div className="career-obj-header">
            <span className="career-obj-tag">{milestone.category}</span>
            <span className="career-obj-pct num">{milestone.progressPct}%</span>
          </div>
          <h4 className="career-obj-title">{lang === 'en' ? milestone.titleEn : milestone.titleVi}</h4>
          <div className="career-obj-bar">
            <i style={{ width: `${milestone.progressPct}%` }} />
          </div>
          <div className="career-obj-reqs">
            {milestone.requirements.map((req, idx) => (
              <div key={idx} className={`career-req-item ${req.met ? 'is-met' : ''}`}>
                <span className="req-status">{req.met ? '✓' : '○'}</span>
                <span className="req-label">{lang === 'en' ? req.labelEn : req.labelVi}</span>
                <span className="req-val num">{req.current}/{req.target}</span>
              </div>
            ))}
          </div>
          <p className="career-obj-tip">{lang === 'en' ? milestone.tipEn : milestone.tipVi}</p>
        </section>
      )}

      <section>
        <div className="kv">
          <span>{t('Khu vực', 'District')}</span>
          <span title={lang === 'en' ? region.nameEn : region.nameVi}>{lang === 'en' ? region.nameEn : region.nameVi}</span>
        </div>
        <div className="kv">
          <span>{t('Tổ chức', 'Faction')}</span>
          <span>{char.org?.name || (char.finger ? `The ${char.finger}` : t('Tự do', 'Unaffiliated'))}</span>
        </div>
        <div className="kv">
          <span>Merit</span>
          <span className="num">{char.merit}</span>
        </div>
        <Tooltip title={lang === 'en' ? omen.descEn : omen.descVi} placement="right">
          <div className="kv" style={{ cursor: 'help' }}>
            <span>Fate Omen</span>
            <span style={{ color: 'var(--accent)' }}>{(lang === 'en' ? omen.nameEn : omen.nameVi).split(' · ')[0]}</span>
          </div>
        </Tooltip>
      </section>

      <section>
        <h3 className="section-title">Vitals</h3>
        <Stat label="HP" value={health} color="var(--s-health)" flag={health <= 25 ? 'CRITICAL' : null} />
        <Stat label="SP" value={sanity} color="var(--s-sanity)" flag={sanity <= 22 ? 'Carmen Calls' : null} />
        <Stat label="Wealth" value={wealth} unit="Ahn" color="var(--s-wealth)" flag={wealth <= 5 ? 'Near Ruin' : null} />
        <Stat label="Network" value={network} color="var(--s-network)" />
        <Stat label="Reputation" value={rep} color="var(--s-rep)" />
      </section>

      <section>
        <h3 className="section-title">Causal Pressure</h3>
        <Stat
          label="Syndicate Heat"
          value={char.heat || 0}
          unit="%"
          color="var(--s-heat)"
          flag={(char.heat || 0) >= 70 ? 'Hunted' : null}
          riseIsBad
        />
        <Stat label="E.G.O Resonance" value={char.resonance || 0} unit="%" color="var(--s-reso)" />
        <TabooStat value={char.taboo || 0} />
      </section>

      {items.length > 0 && (
        <section>
          <h3 className="section-title">{t('Vật mang theo', 'Carried')}</h3>
          {items.map((it) => (
            <div className="kv" key={it.k}>
              <span>{it.k}</span>
              <span style={{ color: 'var(--accent)' }}>{it.v}</span>
            </div>
          ))}
        </section>
      )}

      <People npcs={char.npcs} age={char.age} t={t} lang={lang} />

      {char.scars.length > 0 && (
        <section>
          <h3 className="section-title">{t('Vết sẹo tâm thức', 'Psyche scars')}</h3>
          <div className="chips">
            {char.scars.map((s, i) => (
              <span className="chip" key={`${s}_${i}`}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export const CharacterDossierCard = () => {
  const { t, lang } = useT();
  const char = useGameStore((s) => s.char);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const region = REGIONS.find((r) => r.id === char.regionId) || REGIONS[0];
  const omen = FATE_OMENS.find((o) => o.id === (char.fateOmenId || char.weaver?.mode)) || FATE_OMENS[0];
  const { health, sanity, wealth, network, rep } = char.stats;
  const milestone = getNextCareerMilestone(char);
  const items = [
    char.egoName && { k: 'E.G.O', v: char.egoName },
    char.craftWeapon && { k: t('Thần binh', 'Weapon'), v: char.craftWeapon.name },
    char.lineage?.relic && !char.craftWeapon && { k: t('Di vật', 'Relic'), v: char.lineage.relic }
  ].filter(Boolean);

  const jobDesc = describeJob(char, t);
  const isHpCritical = health <= 20;
  const isSpCritical = sanity <= 20;
  const tabooLevel = char.taboo || 0;

  return (
    <>
      {/* 1. Dedicated Mobile Resource HUD (Visible only on mobile <= 820px) */}
      <div 
        className="mobile-resource-hud" 
        onClick={() => setDrawerOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={t('Chỉ số nhân vật và tài nguyên', 'Character stats and resources')}
      >
        {/* Row 1: Character identity & quick job badge */}
        <div className="m-hud-row-identity">
          <div className="m-hud-name-group">
            <span className="m-hud-name">{char.name}</span>
            <span className="m-hud-gen">Gen #{char.generation}</span>
            <span className="m-hud-job">{jobDesc}</span>
          </div>
          <button 
            type="button" 
            className="m-hud-open-btn"
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

        {/* Row 2: Vitals Twin Gauges (HP & SP) */}
        <div className="m-hud-row-vitals">
          {/* HP Gauge */}
          <div className={`m-gauge m-gauge-hp ${isHpCritical ? 'is-critical' : ''}`}>
            <div className="m-gauge-head">
              <span className="m-gauge-label">
                <Heart size={12} className="m-icon-hp" />
                <b>HP</b>
              </span>
              <span className="m-gauge-val num">
                <b>{health}</b><small>/100</small>
              </span>
            </div>
            <div className="m-gauge-track">
              <div 
                className="m-gauge-fill" 
                style={{ width: `${Math.max(0, Math.min(100, health))}%` }} 
              />
            </div>
          </div>

          {/* SP Gauge */}
          <div className={`m-gauge m-gauge-sp ${isSpCritical ? 'is-critical' : ''}`}>
            <div className="m-gauge-head">
              <span className="m-gauge-label">
                <Brain size={12} className="m-icon-sp" />
                <b>SP</b>
              </span>
              <span className="m-gauge-val num">
                <b>{sanity}</b><small>/100</small>
              </span>
            </div>
            <div className="m-gauge-track">
              <div 
                className="m-gauge-fill" 
                style={{ width: `${Math.max(0, Math.min(100, sanity))}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Row 3: Secondary Assets & Threats */}
        <div className="m-hud-row-pills">
          <div className="m-pill m-pill-wealth" title={t('Tiền mặt Ahn', 'Ahn Wealth')}>
            <Coins size={12} className="m-icon-gold" />
            <b className="num">{wealth}</b> <small>Ahn</small>
          </div>
          <div className="m-pill m-pill-rep" title={t('Danh tiếng', 'Reputation')}>
            <span className="m-pill-dot" style={{ background: 'var(--s-rep)' }} />
            <span>Rep</span> <b className="num">{rep}</b>
          </div>
          <div className="m-pill m-pill-net" title={t('Mạng lưới quan hệ', 'Network')}>
            <span className="m-pill-dot" style={{ background: 'var(--s-network)' }} />
            <span>Net</span> <b className="num">{network}</b>
          </div>
          {char.heat > 0 && (
            <div className="m-pill m-pill-heat" title={t('Mức độ truy nã', 'Heat Level')}>
              <Flame size={12} className="m-icon-heat" />
              <b className="num">{char.heat}</b>
            </div>
          )}
          <div className={`m-pill m-pill-taboo ${tabooLevel >= 2 ? 'is-critical' : ''}`} title={t('Ánh nhìn Taboo', 'Taboo Gaze')}>
            <Eye size={12} className="m-icon-taboo" />
            <span>Taboo</span> <b className="num">{tabooLevel}/3</b>
          </div>
          {milestone && milestone.progressPct < 100 && (
            <div className="m-pill m-pill-milestone" title={lang === 'en' ? milestone.titleEn : milestone.titleVi}>
              <span>🎯</span> <b className="num">{milestone.progressPct}%</b>
            </div>
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
          <div className="mobile-dossier-sheet" onClick={(e) => e.stopPropagation()}>
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
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Desktop Sidebar (Visible only on > 820px) */}
      <aside className="side desktop-dossier-side" aria-label={t('Hồ sơ nhân vật', 'Character')}>
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
