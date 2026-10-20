import React, { useEffect, useState } from 'react';
import { Tooltip, Dropdown } from 'antd';
import { ScrollText, GitMerge, BookOpen, GitBranch, Trophy, Sun, Moon, Languages } from 'lucide-react';
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

// The product's mark: a crescent over the City's horizon line.
export const BrandMark = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <path d="M20.5 5.5a10.5 10.5 0 1 0 6 18.6A9 9 0 0 1 20.5 5.5Z" fill="currentColor" />
    <rect x="3" y="27" width="26" height="2" rx="1" fill="currentColor" />
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

// A mini record of the life in progress, so it stays in view on every screen
const LifeCard = ({ lang }) => {
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

export const Sidebar = () => {
  const isRail = useIsRail();
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
    <nav className="nav" aria-label={pick(lang, 'Điều hướng chính', 'Main navigation')}>
      <button type="button" className="nav-brand" onClick={() => navigate('/')} aria-label="The City Chronicles">
        <span className="nav-mark">
          <BrandMark />
        </span>
        <div>
          <b>THE CITY</b>
          <span>Chronicles</span>
        </div>
      </button>

      <div className="nav-list">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const label = pick(lang, item.vi, item.en);
          const active = location.pathname === item.key;
          return (
            <Tooltip key={item.key} title={isRail ? label : null} placement="right">
              <button
                type="button"
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={`nav-item ${active ? 'is-active' : ''}`}
                onClick={() => navigate(item.key)}
              >
                <Icon size={19} strokeWidth={1.7} />
                <span className="label">{label}</span>
                {counts[item.key] && <span className="count">{counts[item.key]}</span>}
              </button>
            </Tooltip>
          );
        })}
      </div>

      <div className="nav-spacer" />

      <LifeCard lang={lang} />

      <div className="nav-utils">
        <LangMenu>
          <button type="button" className="btn btn-ghost" style={{ padding: '0 10px', gap: 6 }} aria-label={pick(lang, 'Ngôn ngữ', 'Language')}>
            <Languages size={16} />
            {langShort}
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
        >
          <span className="server" role="status">
            <span className={`status-dot ${backendOnline ? 'is-on' : ''}`} />
            <span>{backendOnline ? 'Online' : 'Offline'}</span>
          </span>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Sidebar;
