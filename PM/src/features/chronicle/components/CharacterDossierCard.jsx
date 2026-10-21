import React from 'react';
import { Tooltip } from 'antd';
import { ChevronDown, ChevronUp, User, Heart, Brain, Coins, Flame, Eye, Sparkles, X, ShieldAlert, ShoppingBag } from 'lucide-react';
import { WorkshopDepotModal } from './WorkshopDepotModal';
import { useGameStore } from '../../../store/gameStore';
import { useThemeStore } from '../../../store/themeStore';
import { REGIONS, FINGER_RANKS } from '../../../data/worldData';
import { FATE_OMENS } from '../../../engine/weaverAI';
import { SEASONS, getNextCareerMilestone } from '../../../engine/gameEngine';
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
        </div>
      </div>

      {/* Tab: Career & Equipment */}
      {showCareer && milestone && (
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
              <span>{t('Điềm báo', 'Fate omen')}</span>
              <span style={{ color: 'var(--accent)' }}>{(lang === 'en' ? omen.nameEn : omen.nameVi).split(' · ')[0]}</span>
            </div>
          </Tooltip>
        </section>
      )}

      {showOverview && (
        <section>
          <h3 className="section-title">{t('Chỉ số', 'Vitals')}</h3>
          <Stat label="HP" value={health} color="var(--s-health)" flag={health <= 25 ? 'CRITICAL' : null} />
          <Stat label="SP" value={sanity} color="var(--s-sanity)" flag={sanity <= 22 ? 'Carmen Calls' : null} />
          <Stat label={t('Tiền mặt', 'Wealth')} value={wealth} unit="Ahn" color="var(--s-wealth)" flag={wealth <= 5 ? t('Cạn tiền', 'Near ruin') : null} />
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
          />
          <Stat label="E.G.O Resonance" value={char.resonance || 0} unit="%" color="var(--s-reso)" />
          <TabooStat value={char.taboo || 0} />
        </section>
      )}

      {/* Tab: Relations & Scars */}
      {showRelations && <People npcs={char.npcs} age={char.age} t={t} lang={lang} />}

      {showRelations && char.scars.length > 0 && (
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
        <div className="m-hud-compact-inner">
          <div className="m-hud-name-group">
            <span className="m-hud-name">{char.name}</span>
            <span className="m-hud-gen">#{char.generation}</span>
            <span className="m-hud-job-pill">{jobDesc.split(' · ')[0]}</span>
          </div>

          <div className="m-hud-vitals-group">
            {/* HP micro gauge */}
            <div className={`m-micro-gauge m-gauge-hp ${isHpCritical ? 'is-critical' : ''}`} title={`HP: ${health}/100`}>
              <Heart size={12} className="m-icon-hp" />
              <span className="m-micro-val num"><b>{health}</b></span>
              <div className="m-micro-track">
                <div className="m-micro-fill" style={{ width: `${Math.max(0, Math.min(100, health))}%` }} />
              </div>
            </div>

            {/* SP micro gauge */}
            <div className={`m-micro-gauge m-gauge-sp ${isSpCritical ? 'is-critical' : ''}`} title={`SP: ${sanity}/100`}>
              <Brain size={12} className="m-icon-sp" />
              <span className="m-micro-val num"><b>{sanity}</b></span>
              <div className="m-micro-track">
                <div className="m-micro-fill" style={{ width: `${Math.max(0, Math.min(100, sanity))}%` }} />
              </div>
            </div>
          </div>

          <div className="m-hud-resources-group">
            <div className="m-micro-pill m-pill-wealth" title={t('Tiền mặt Ahn', 'Ahn Wealth')}>
              <Coins size={12} className="m-icon-gold" />
              <span className="num"><b>{wealth}</b></span>
            </div>
            {tabooLevel > 0 && (
              <div className={`m-micro-pill m-pill-taboo ${tabooLevel >= 2 ? 'is-critical' : ''}`} title={t('Ánh nhìn Taboo', 'Taboo Gaze')}>
                <Eye size={12} className="m-icon-taboo" />
                <span className="num"><b>{tabooLevel}</b>/3</span>
              </div>
            )}
            {char.heat > 0 && (
              <div className="m-micro-pill m-pill-heat" title={t('Mức độ truy nã', 'Heat Level')}>
                <Flame size={12} className="m-icon-heat" />
                <span className="num"><b>{char.heat}</b></span>
              </div>
            )}
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
            <ChevronDown size={12} />
          </button>
        </div>

        {/* Row 2: Season & Year Progress timeline sub-strip */}
        <div className="m-hud-subline">
          <div className="m-hud-season-pill">
            <b>{t(`Tuổi ${char.age}`, `Age ${char.age}`)}</b>
            <span>· {t(currentSeason?.vi, currentSeason?.en)}</span>
          </div>
          <div className="m-hud-timeline-track">
            <div className="m-hud-timeline-fill" style={{ width: `${Math.max(0, Math.min(100, yearProgress || 0))}%` }} />
          </div>
          {milestone && milestone.progressPct < 100 ? (
            <span className="m-hud-goal-pill" title={lang === 'en' ? milestone.titleEn : milestone.titleVi}>
              <span className="m-hud-goal-text">{lang === 'en' ? milestone.titleEn : milestone.titleVi}</span>
              <b>{milestone.progressPct}%</b>
            </span>
          ) : (
            <span className="m-hud-region-pill">{region ? (lang === 'en' ? region.nameEn : region.nameVi) : ''}</span>
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
          <div className="mobile-dossier-sheet" ref={sheetRef} onClick={(e) => e.stopPropagation()}>
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
                  {t('Nhân mạch', 'Bonds')}
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
