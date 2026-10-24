import React from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { Tooltip } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { useGameStore } from '../store/gameStore';
import { pick } from '../i18n';
import { NAV_ITEMS, LANG_OPTIONS, BrandMark, LangMenu, MotionToggle, TextSizeToggle } from './Sidebar';

// One bar for every width: the archive tabs sit in it on a desktop and move to the bottom bar on a phone
export const Header = ({ languageOverride, isPlay }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { themeMode, toggleTheme, lang: preferredLang } = useThemeStore();
  const lang = languageOverride || preferredLang;
  const online = useGameStore((s) => s.backendOnline);
  const inRun = useGameStore((s) => s.inRun);
  const name = useGameStore((s) => s.char.name);
  const age = useGameStore((s) => s.char.age);
  const current = NAV_ITEMS.find((i) => i.key === pathname) || NAV_ITEMS[0];
  return (
    <header className="topbar" lang={lang === 'bi' ? 'vi' : lang}>
      <button type="button" className="topbar-brand" onClick={() => navigate('/')} aria-label="The City Chronicles">
        <BrandMark size={28} />
        <span className="topbar-word">
          The City <em>Chronicles</em>
        </span>
        <span className="topbar-here">{pick(lang, current.vi, current.en)}</span>
      </button>
      <nav className="topbar-nav" aria-label={pick(lang, 'Điều hướng chính', 'Main navigation')}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={pathname === item.key ? 'is-current' : ''}
            aria-current={pathname === item.key ? 'page' : undefined}
            onClick={() => navigate(item.key)}
          >
            {pick(lang, item.vi, item.en)}
          </button>
        ))}
      </nav>
      <div className="topbar-tools">
        {inRun && !isPlay && (
          <button type="button" className="topbar-life" onClick={() => navigate('/')}>
            <span>{pick(lang, 'Kiếp đang sống', 'Life in progress')}</span>
            <strong>
              {name} · {age} {pick(lang, 'tuổi', 'yrs')}
            </strong>
          </button>
        )}
        <LangMenu placement="bottomRight">
          <button type="button" className="app-tool" aria-label={languageOverride ? 'Choose story language' : pick(lang, 'Chọn ngôn ngữ', 'Choose language')}>
            <Languages size={16} aria-hidden="true" />
            <span>{LANG_OPTIONS.find((o) => o.key === preferredLang)?.short}</span>
          </button>
        </LangMenu>
        <button
          type="button"
          className="app-tool"
          onClick={toggleTheme}
          aria-label={pick(lang, 'Đổi giao diện sáng / tối', 'Toggle light / dark theme')}
          aria-pressed={themeMode === 'dark'}
        >
          {themeMode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <TextSizeToggle lang={lang} placement="bottomRight" />
        <MotionToggle lang={lang} placement="bottomRight" />
        <Tooltip
          title={online ? pick(lang, 'Đã kết nối archive', 'Archive connected') : pick(lang, 'Lưu trên thiết bị', 'Saved on this device')}
          placement="bottomRight"
        >
          <span className={`topbar-sync ${online ? 'is-online' : ''}`} role="status">
            <i aria-hidden="true" />
            <span className="sr-only">{online ? pick(lang, 'Đã kết nối archive', 'Archive connected') : pick(lang, 'Lưu trên thiết bị', 'Saved on this device')}</span>
          </span>
        </Tooltip>
      </div>
    </header>
  );
};

export const BottomNav = ({ languageOverride }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const preferredLang = useThemeStore((s) => s.lang);
  const lang = languageOverride || preferredLang;
  return (
    <nav className="bottom-nav" aria-label={pick(lang, 'Điều hướng chính', 'Main navigation')} lang={lang === 'bi' ? 'vi' : lang}>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.key;
        return (
          <button
            key={item.key}
            type="button"
            className={isActive ? 'is-current' : ''}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => navigate(item.key)}
          >
            <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
            <span>{pick(lang, item.shortVi, item.shortEn)}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Header;
