import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header, { BottomNav } from './Header';
import { CityBackdrop } from '../components/CityBackdrop';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../store/gameStore';
import { useThemeStore } from '../store/themeStore';

const TICK_MS = 100;

export const MainLayout = ({ children }) => {
  const location = useLocation();
  // Only the fields the loop needs; yearProgress is left out so the layout doesn't re-render each tick
  const { inRun, alive, pendingEvent, pendingContract, pendingMinor, pendingModal, speed, autoPlay, tick, selectEventChoice, selectContractApproach, hydrateFromBackend } =
    useGameStore(
      useShallow((s) => ({
        inRun: s.inRun,
        alive: s.char.alive,
        pendingEvent: s.char.pendingEvent,
        pendingContract: s.char.pendingContract,
        pendingMinor: s.char.pendingMinor,
        pendingModal: s.char.pendingModal,
        speed: s.speed,
        autoPlay: s.autoPlay,
        tick: s.tick,
        selectEventChoice: s.selectEventChoice,
        selectContractApproach: s.selectContractApproach,
        hydrateFromBackend: s.hydrateFromBackend
      }))
    );

  useEffect(() => {
    hydrateFromBackend();
  }, [hydrateFromBackend]);

  // The year's clock: real elapsed time, capped so a background tab doesn't skip a decade
  useEffect(() => {
    if (!inRun || !alive || speed === 0 || pendingModal) return undefined;

    if (pendingEvent || pendingContract) {
      if (!autoPlay) return undefined;
      const autoDelay = speed === 3 ? 4000 : speed === 2 ? 6000 : 9000;
      const timer = setTimeout(() => {
        if (pendingEvent) selectEventChoice(0);
        else if (pendingContract) selectContractApproach('careful');
      }, autoDelay);
      return () => clearTimeout(timer);
    }

    let last = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      const dt = Math.min(400, Math.max(0, now - last));
      last = now;
      tick(dt);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [inRun, alive, pendingEvent, pendingContract, pendingModal, speed, autoPlay, tick, selectEventChoice, selectContractApproach]);

  // The play screen manages its own scrolling regions; other screens scroll as a page
  const isPlay = location.pathname === '/' && inRun;
  const hasDock = isPlay && Boolean(pendingEvent || pendingContract || pendingMinor);
  const { sidebarCollapsed, toggleSidebar } = useThemeStore();
  const isNavCollapsed = sidebarCollapsed !== null ? sidebarCollapsed : isPlay;

  return (
    <div className={`shell interface-v2 ${isNavCollapsed ? 'is-nav-collapsed' : ''} ${isPlay ? 'is-in-play' : ''} ${hasDock ? 'has-dock' : ''}`}>
      <CityBackdrop variant="ambient" />
      <Sidebar isCollapsed={isNavCollapsed} onToggleCollapse={() => toggleSidebar(isNavCollapsed)} isPlay={isPlay} />
      <Header />
      <main className="main" id="main-content">{isPlay ? children : <div className="main-scroll">{children}</div>}</main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
