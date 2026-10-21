import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { pick } from '../i18n';
import { NAV_ITEMS, LANG_OPTIONS, BrandMark, LangMenu, MotionToggle } from './Sidebar';

export const Header = ({ languageOverride }) => {
  const { themeMode, toggleTheme, lang: preferredLang } = useThemeStore();
  const lang = languageOverride || preferredLang;
  const { pathname } = useLocation();
  const current = NAV_ITEMS.find((i) => i.key === pathname) || NAV_ITEMS[0];
  return (
    <header className="mobile-top app-mobile-header" lang={lang === 'bi' ? 'vi' : lang}>
      <BrandMark size={29} />
      <div className="brand">
        <strong>The City</strong>
        <span>{pick(lang, current.vi, current.en)}</span>
      </div>
      <LangMenu placement="bottomRight">
        <button className="app-tool" aria-label={languageOverride ? 'Choose story language' : pick(lang, 'Chọn ngôn ngữ', 'Choose language')}>
          {LANG_OPTIONS.find((o) => o.key === preferredLang)?.short}
        </button>
      </LangMenu>
      <button
        className="app-tool"
        onClick={toggleTheme}
        aria-label={pick(lang, 'Đổi giao diện sáng / tối', 'Toggle theme')}
        aria-pressed={themeMode === 'dark'}
      >
        {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <MotionToggle lang={lang} placement="bottomRight" />
    </header>
  );
};

export const BottomNav = ({ languageOverride }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const preferredLang = useThemeStore((s) => s.lang);
  const lang = languageOverride || preferredLang;
  return (
    <nav className="bottom-nav app-bottom-nav" aria-label={pick(lang, 'Điều hướng chính', 'Main navigation')} lang={lang === 'bi' ? 'vi' : lang}>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.key;
        return (
          <button
            key={item.key}
            className={isActive ? 'is-active is-current' : ''}
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
