import React, { useEffect, useState } from 'react';
import { Tooltip, Dropdown } from 'antd';
import { ScrollText, GitMerge, BookOpen, GitBranch, Trophy, Sun, Moon, Languages, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useThemeStore } from '../store/themeStore';
import { useGameStore } from '../store/gameStore';
import { CODEX_RECORDS } from '../data/worldData';
import { pick } from '../i18n';

export const NAV_ITEMS = [
  { key: '/', icon: ScrollText, vi: 'Chronicle', en: 'Chronicle', shortVi: 'Chronicle', shortEn: 'Chronicle' },
  { key: '/weaver-ai', icon: GitMerge, vi: 'Weaver AI', en: 'Weaver AI', shortVi: 'Weaver', shortEn: 'Weaver' },
  { key: '/glossary', icon: BookOpen, vi: 'Lore & Districts', en: 'Lore & Districts', shortVi: 'Lore', shortEn: 'Lore' },
  { key: '/bloodline', icon: GitBranch, vi: 'Bloodline', en: 'Bloodline', shortVi: 'Bloodline', shortEn: 'Bloodline' },
  { key: '/codex', icon: Trophy, vi: 'Codex', en: 'Codex', shortVi: 'Codex', shortEn: 'Codex' }
];

export const LANG_OPTIONS = [
  { key: 'vi', short: 'VI', label: 'Tiếng Việt (giữ thuật ngữ gốc)' },
  { key: 'bi', short: 'VI+EN', label: 'Song ngữ Việt – Anh' },
  { key: 'en', short: 'EN', label: 'English' }
];

// The product's mark: Project Moon crescent over District 1 brutalist monolith with Carmen's singularity core
export const BrandMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="brand-logo-svg">
    <defs>
      <linearGradient id="bmBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#141722"/>
        <stop offset="100%" stopColor="#08090d"/>
      </linearGradient>
      <linearGradient id="bmGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5d77f"/>
        <stop offset="60%" stopColor="#c59f4e"/>
        <stop offset="100%" stopColor="#8c6a23"/>
      </linearGradient>
      <linearGradient id="bmRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4d4d"/>
        <stop offset="100%" stopColor="#990000"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#bmBg)"/>
    <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="url(#bmGold)" strokeWidth="1.8" opacity="0.85"/>
    <circle cx="32" cy="32" r="23" fill="none" stroke="#252a3a" strokeWidth="1" strokeDasharray="3 3"/>
    <path d="M42 12 A 20 20 0 0 0 20 44 A 20 20 0 1 1 42 12 Z" fill="url(#bmGold)" />
    <polygon points="16,36 23,33 23,50 16,50" fill="#181c28" stroke="#333a4d" strokeWidth="1"/>
    <polygon points="41,33 48,36 48,50 41,50" fill="#181c28" stroke="#333a4d" strokeWidth="1"/>
    <polygon points="32,15 39,23 39,50 25,50 25,23" fill="#10131d" stroke="url(#bmGold)" strokeWidth="1.6"/>
    <polygon points="32,20 35,25 32,30 29,25" fill="url(#bmRed)"/>
    <line x1="32" y1="33" x2="32" y2="46" stroke="url(#bmRed)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="50" x2="52" y2="50" stroke="url(#bmGold)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="32" cy="54" r="1.5" fill="#f5d77f"/>
  </svg>
);

export const LangMenu = ({ children, placement = 'topLeft' }) => {
  const { lang, setLang } = useThemeStore();
  return (
    <Dropdown
      trigger={['click']}
      placement={placement}
      menu={{
        selectable: true,
        selectedKeys: [lang],
        items: LANG_OPTIONS.map((o) => ({ key: o.key, label: o.label })),
        onClick: ({ key }) => setLang(key)
      }}
    >
      {children}
    </Dropdown>
  );
};

function useChange(value) {
  const prev = React.useRef(value);
  const [change, setChange] = React.useState(null);
  React.useEffect(() => {
    const d = value - prev.current;
    prev.current = value;
    if (!d) return undefined;
    setChange({ d, at: Date.now() });
    const timer = setTimeout(() => setChange(null), 1400);
    return () => clearTimeout(timer);
  }, [value]);
  return change;
}

const LifeBar = ({ k, v, c }) => {
  const change = useChange(v);
  const isUp = change && change.d > 0;
  const flashClass = change ? (isUp ? 'is-flash-up' : 'is-flash-down') : '';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 28px', alignItems: 'center', gap: 8, fontSize: 13 }}>
      <span className="muted">{k}</span>
      <div className={`bar ${flashClass}`} style={{ height: 5 }}>
        <i key={change ? `lb_${change.at}` : 'steady'} style={{ width: `${v}%`, '--c': c }} />
      </div>
      <span className={`num ${change ? (isUp ? 'val-up' : 'val-down') : ''}`} style={{ textAlign: 'right' }}>
        {v}
      </span>
    </div>
  );
};

// A mini record of the life in progress, so it stays in view on other screens
const LifeCard = ({ lang, isPlay, isCollapsed }) => {
  // Never show in-run mini card on Chronicle page (where Dossier is already visible)
  // or when the sidebar is collapsed into rail mode
  if (isPlay || isCollapsed) return null;

  const { inRun, name, age, alive, health, sanity } = useGameStore(
    useShallow((s) => ({
      inRun: s.inRun,
      name: s.char.name,
      age: s.char.age,
      alive: s.char.alive,
      health: s.char.stats.health,
      sanity: s.char.stats.sanity
    }))
  );
  if (!inRun) return null;
  return (
    <div className="nav-life">
      <div className="nav-life-head">
        <b>{name}</b>
        <span className="num muted">{alive ? `${age} ${pick(lang, 'tuổi', 'yrs')}` : pick(lang, 'Đã mất', 'Deceased')}</span>
      </div>
      {[
        { k: 'HP', v: health, c: 'var(--s-health)' },
        { k: 'SP', v: sanity, c: 'var(--s-sanity)' }
      ].map((s) => (
        <LifeBar key={s.k} k={s.k} v={s.v} c={s.c} />
      ))}
    </div>
  );
};

// Labels hide below 1280px, where each icon needs a tooltip instead
function useIsRail() {
  const query = '(max-width: 1280px)';
  const [rail, setRail] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setRail(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return rail;
}

export const Sidebar = ({ isCollapsed = false, onToggleCollapse, isPlay = false }) => {
  const isRail = useIsRail();
  const effectiveRail = isRail || isCollapsed;
  const navigate = useNavigate();
  const location = useLocation();
  const { themeMode, toggleTheme, lang } = useThemeStore();
  const { backendOnline, livesCount, codexCount } = useGameStore(
    useShallow((s) => ({ backendOnline: s.backendOnline, livesCount: s.pastLives.length, codexCount: s.globalCodex.length }))
  );
  const counts = {
    '/bloodline': livesCount || null,
    '/codex': `${codexCount}/${CODEX_RECORDS.length}`
  };
  const langShort = LANG_OPTIONS.find((o) => o.key === lang)?.short || 'VI';

  return (
    <nav className={`nav ${isCollapsed ? 'is-collapsed' : ''}`} aria-label={pick(lang, 'Điều hướng chính', 'Main navigation')}>
      <div className="nav-head">
        <button type="button" className="nav-brand" onClick={() => navigate('/')} aria-label="The City Chronicles">
          <span className="nav-mark">
            <BrandMark />
          </span>
          {!isCollapsed && (
            <div className="nav-brand-title">
              <b>THE CITY</b>
              <span>Chronicles</span>
            </div>
          )}
        </button>
        {onToggleCollapse && (
          <Tooltip
            title={isCollapsed ? pick(lang, 'Mở rộng menu', 'Expand sidebar') : pick(lang, 'Thu gọn menu', 'Collapse sidebar')}
            placement="right"
          >
            <button
              type="button"
              className="icon-btn nav-toggle-btn"
              onClick={onToggleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </Tooltip>
        )}
      </div>

      <div className="nav-list">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const label = pick(lang, item.vi, item.en);
          const active = location.pathname === item.key;
          return (
            <Tooltip key={item.key} title={effectiveRail ? label : null} placement="right">
              <button
                type="button"
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={`nav-item ${active ? 'is-active' : ''}`}
                onClick={() => navigate(item.key)}
              >
                <Icon size={19} strokeWidth={1.7} />
                {!isCollapsed && <span className="label">{label}</span>}
                {!isCollapsed && counts[item.key] && <span className="count">{counts[item.key]}</span>}
              </button>
            </Tooltip>
          );
        })}
      </div>

      <div className="nav-spacer" />

      <LifeCard lang={lang} isPlay={isPlay} isCollapsed={isCollapsed} />

      <div className="nav-utils">
        <LangMenu>
          <button type="button" className="btn btn-ghost" style={{ padding: isCollapsed ? '0 6px' : '0 10px', gap: 6 }} aria-label={pick(lang, 'Ngôn ngữ', 'Language')}>
            <Languages size={16} />
            {!isCollapsed && langShort}
          </button>
        </LangMenu>
        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={pick(lang, 'Đổi giao diện sáng / tối', 'Toggle light / dark')}
          title={pick(lang, 'Đổi giao diện sáng / tối', 'Toggle light / dark')}
        >
          {themeMode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <Tooltip
          title={
            backendOnline
              ? pick(lang, 'Đã kết nối kho lưu trữ (.NET, cổng 5080)', 'Archive server connected (.NET, port 5080)')
              : pick(lang, 'Chưa kết nối máy chủ, đang lưu trên trình duyệt này', 'Server offline, saving in this browser')
          }
          placement="right"
        >
          <span className="server" role="status">
            <span className={`status-dot ${backendOnline ? 'is-on' : ''}`} />
            {!isCollapsed && <span>{backendOnline ? 'Online' : 'Offline'}</span>}
          </span>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Sidebar;
