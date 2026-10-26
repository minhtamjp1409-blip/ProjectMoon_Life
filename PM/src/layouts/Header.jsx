import React, { useState } from 'react';
import { Volume2, VolumeX, Settings2 } from 'lucide-react';
import { Tooltip } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import { useGameStore } from '../store/gameStore';
import { pick } from '../i18n';
import { audioEngine } from '../engine/audioEngine';
import { NAV_ITEMS, BrandMark } from './Sidebar';
import { SettingsModal } from '../components/SettingsModal';

// One bar for every width: the archive tabs sit in it on a desktop and move to the bottom bar on a phone.
// The mark goes home; during a life that means back to the title screen (the run is saved first).
export const Header = ({ languageOverride, isPlay }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const preferredLang = useThemeStore((s) => s.lang);
  const [muted, setMuted] = useState(() => audioEngine.isMuted);
  const [settingsOpen, setSettingsOpen] = useState(false);
  React.useEffect(() => audioEngine.subscribe((st) => setMuted(st.isMuted)), []);
  const lang = languageOverride || preferredLang;
  const inRun = useGameStore((s) => s.inRun);
  const exitToSetup = useGameStore((s) => s.exitToSetup);
  const name = useGameStore((s) => s.char.name);
  const age = useGameStore((s) => s.char.age);
  const current = NAV_ITEMS.find((i) => i.key === pathname) || NAV_ITEMS[0];
  const goHome = () => {
    if (inRun && pathname === '/') exitToSetup();
    navigate('/');
  };
  return (
    <header className="topbar" lang={lang === 'bi' ? 'vi' : lang}>
      <Tooltip title={inRun && pathname === '/' ? pick(lang, 'Về màn hình chính (đã lưu)', 'Back to the title screen (saved)') : null} placement="bottomLeft">
        <button type="button" className="topbar-brand" onClick={goHome} aria-label={pick(lang, 'The City Chronicles, về màn hình chính', 'The City Chronicles, home')}>
          <BrandMark size={28} />
          <span className="topbar-word">
            The City <em>Chronicles</em>
          </span>
          <span className="topbar-here">{pick(lang, current.vi, current.en)}</span>
        </button>
      </Tooltip>
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
        <button
          type="button"
          className="app-tool"
          onClick={() => audioEngine.toggleMute()}
          aria-label={muted ? pick(lang, 'Bật âm thanh', 'Sound on') : pick(lang, 'Tắt âm thanh', 'Sound off')}
          aria-pressed={!muted}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <button
          type="button"
          className="app-tool"
          onClick={() => setSettingsOpen(true)}
          aria-label={pick(lang, 'Cài đặt: âm thanh, hiển thị, hiệu năng', 'Settings: audio, display, performance')}
        >
          <Settings2 size={17} aria-hidden="true" />
        </button>
      </div>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
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
