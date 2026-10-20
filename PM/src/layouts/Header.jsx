import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { pick } from '../i18n';
import { NAV_ITEMS, LANG_OPTIONS, BrandMark, LangMenu } from './Sidebar';

export const Header = () => {
  const { themeMode, toggleTheme, lang } = useThemeStore();
  const { pathname } = useLocation();
  const current = NAV_ITEMS.find((i) => i.key === pathname) || NAV_ITEMS[0];
  return (
    <header className="app-mobile-header">
      <BrandMark size={29} />
      <div>
        <strong>The City</strong>
        <span>{pick(lang, current.vi, current.en)}</span>
      </div>
      <LangMenu placement="bottomRight">
        <button className="app-tool" aria-label={pick(lang, 'Chọn ngôn ngữ', 'Choose language')}>
          {LANG_OPTIONS.find((o) => o.key === lang)?.short}
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
    </header>
  );
};
export const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lang = useThemeStore((s) => s.lang);
  return (
    <nav className="app-bottom-nav" aria-label={pick(lang, 'Điều hướng chính', 'Main navigation')}>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.key}
            className={pathname === item.key ? 'is-current' : ''}
            aria-current={pathname === item.key ? 'page' : undefined}
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
