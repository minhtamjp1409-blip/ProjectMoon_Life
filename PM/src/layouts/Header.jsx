import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { pick } from '../i18n';
import { NAV_ITEMS, LANG_OPTIONS, BrandMark, LangMenu } from './Sidebar';

// Phone only: the rail folds into this top bar and the bottom navigation below.
export const Header = () => {
  const { themeMode, toggleTheme, lang } = useThemeStore();
  const location = useLocation();
  const current = NAV_ITEMS.find((i) => i.key === location.pathname) || NAV_ITEMS[0];
  const langShort = LANG_OPTIONS.find((o) => o.key === lang)?.short || 'VI';

  return (
    <header className="mobile-top">
      <span style={{ color: 'var(--accent)', display: 'inline-flex' }}>
        <BrandMark size={22} />
      </span>
      <span className="brand">{pick(lang, current.vi, current.en)}</span>
      <LangMenu>
        <button type="button" className="btn btn-ghost" style={{ padding: '0 8px' }}>
          {langShort}
        </button>
      </LangMenu>
      <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={pick(lang, 'Đổi giao diện', 'Toggle theme')}>
        {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
};

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useThemeStore((s) => s.lang);

  return (
    <nav className="bottom-nav" aria-label={pick(lang, 'Điều hướng chính', 'Main navigation')}>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = location.pathname === item.key;
        return (
          <button
            key={item.key}
            type="button"
            className={active ? 'is-active' : ''}
            aria-current={active ? 'page' : undefined}
            onClick={() => navigate(item.key)}
          >
            <Icon size={18} strokeWidth={1.6} />
            {pick(lang, item.shortVi, item.shortEn)}
          </button>
        );
      })}
    </nav>
  );
};

export default Header;
