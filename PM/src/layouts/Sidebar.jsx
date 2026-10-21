import React from 'react';
import { Dropdown, Tooltip } from 'antd';
import {
  ScrollText,
  GitMerge,
  BookOpen,
  GitBranch,
  Trophy,
  Sun,
  Moon,
  Languages,
  PanelLeftClose,
  PanelLeftOpen,
  Monitor,
  Sparkles,
  Pause
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { useGameStore } from '../store/gameStore';
import { pick } from '../i18n';

export const NAV_ITEMS = [
  {
    key: '/',
    icon: ScrollText,
    vi: 'Biên niên',
    en: 'Chronicle',
    shortVi: 'Biên niên',
    shortEn: 'Chronicle'
  },
  {
    key: '/weaver-ai',
    icon: GitMerge,
    vi: 'Khung cửi',
    en: 'The Loom',
    shortVi: 'Khung cửi',
    shortEn: 'Loom'
  },
  {
    key: '/glossary',
    icon: BookOpen,
    vi: 'Từ điển thế giới',
    en: 'World archive',
    shortVi: 'Thế giới',
    shortEn: 'World'
  },
  {
    key: '/bloodline',
    icon: GitBranch,
    vi: 'Huyết thống',
    en: 'Bloodline',
    shortVi: 'Gia phả',
    shortEn: 'Bloodline'
  },
  { key: '/codex', icon: Trophy, vi: 'Thành tựu', en: 'Codex', shortVi: 'Thành tựu', shortEn: 'Codex' }
];
export const LANG_OPTIONS = [
  { key: 'vi', short: 'VI', label: 'Tiếng Việt' },
  { key: 'bi', short: 'VI+EN', label: 'Song ngữ Việt / Anh' },
  { key: 'en', short: 'EN', label: 'English' }
];
export const BrandMark = ({ size = 36 }) => (
  <img src="/favicon.svg" width={size} height={size} alt="" aria-hidden="true" />
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

const MOTION_LABELS = {
  system: ['Chuyển động: theo hệ thống', 'Motion: follow system'],
  full: ['Chuyển động: đầy đủ', 'Motion: full'],
  reduced: ['Chuyển động: giảm', 'Motion: reduced']
};
const MOTION_ICONS = { system: Monitor, full: Sparkles, reduced: Pause };

/** Cycles system → full → reduced. Full overrides an OS that has animations turned off. */
export function MotionToggle({ lang, placement = 'top' }) {
  const motionMode = useThemeStore((s) => s.motionMode);
  const cycleMotion = useThemeStore((s) => s.cycleMotion);
  const label = pick(lang, ...MOTION_LABELS[motionMode]);
  const Icon = MOTION_ICONS[motionMode] || Monitor;
  return (
    <Tooltip title={`${label}. ${pick(lang, 'Bấm để đổi.', 'Click to change.')}`} placement={placement}>
      <button className="app-tool" onClick={cycleMotion} aria-label={label}>
        <Icon size={17} aria-hidden="true" />
      </button>
    </Tooltip>
  );
}

export const Sidebar = ({ isCollapsed, onToggleCollapse, isPlay, languageOverride }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lang: preferredLang, themeMode, toggleTheme } = useThemeStore();
  const lang = languageOverride || preferredLang;
  const online = useGameStore((s) => s.backendOnline);
  const inRun = useGameStore((s) => s.inRun);
  const name = useGameStore((s) => s.char.name);
  const age = useGameStore((s) => s.char.age);
  return (
    <aside className={`app-navigation ${isCollapsed ? 'is-compact' : ''}`} lang={lang === 'bi' ? 'vi' : lang}>
      <div className="app-brand-row">
        <button className="app-brand" onClick={() => navigate('/')} aria-label="The City Chronicles">
          <BrandMark />
          <span>
            <strong>The City</strong>
            <small>Chronicles</small>
          </span>
        </button>
        <button
          className="app-nav-collapse"
          onClick={onToggleCollapse}
          aria-label={pick(lang, 'Thu gọn hoặc mở menu', 'Toggle navigation')}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
        </button>
      </div>
      <div className="app-nav-caption">{pick(lang, 'Hồ sơ lưu trữ', 'The archives')}</div>
      <nav className="app-nav-links" aria-label={pick(lang, 'Điều hướng chính', 'Main navigation')}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const label = pick(lang, item.vi, item.en);
          return (
            <Tooltip key={item.key} title={isCollapsed ? label : null} placement="right">
              <button
                type="button"
                className={`app-nav-link ${pathname === item.key ? 'is-current' : ''}`}
                aria-current={pathname === item.key ? 'page' : undefined}
                aria-label={label}
                onClick={() => navigate(item.key)}
              >
                <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                <span>{label}</span>
              </button>
            </Tooltip>
          );
        })}
      </nav>
      <div className="app-nav-footer">
        {inRun && !isPlay && (
          <button className="app-life-link" onClick={() => navigate('/')}>
            <span>{pick(lang, 'Kiếp đang sống', 'Life in progress')}</span>
            <strong>{name}</strong>
            <small>
              {age} {pick(lang, 'tuổi', 'years')}
            </small>
          </button>
        )}
        <div className="app-nav-tools">
          <LangMenu>
            <button className="app-tool" aria-label={languageOverride ? 'Choose story language' : pick(lang, 'Chọn ngôn ngữ', 'Choose language')}>
              <Languages size={17} aria-hidden="true" />
              <span>{LANG_OPTIONS.find((o) => o.key === preferredLang)?.short}</span>
            </button>
          </LangMenu>
          <button
            className="app-tool"
            onClick={toggleTheme}
            aria-label={pick(lang, 'Đổi giao diện sáng / tối', 'Toggle light / dark theme')}
            aria-pressed={themeMode === 'dark'}
          >
            {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <MotionToggle lang={lang} />
        </div>
        <span className="app-connection">
          <i className={online ? 'is-online' : ''} />
          <span>
            {online
              ? pick(lang, 'Đã kết nối archive', 'Archive connected')
              : pick(lang, 'Lưu trên thiết bị', 'Saved on this device')}
          </span>
        </span>
        <span className="app-edition">Project Moon · Fan project</span>
      </div>
    </aside>
  );
};
export default Sidebar;
