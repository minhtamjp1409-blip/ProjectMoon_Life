import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header, { BottomNav } from './Header';
import { WorldBackdrop } from '../components/world/WorldBackdrop';
import { sceneContextOf } from '../engine/sceneContext';
import { audioEngine } from '../engine/audioEngine';
import { useShallow } from 'zustand/react/shallow';
import { DUNGEON_DEFINITIONS } from '../engine/gameEngine';
import { useGameStore } from '../store/gameStore';

const TICK_MS = 100;

export const MainLayout = ({ children }) => {
  const location = useLocation();
  // Only the fields the loop needs; yearProgress is left out so the layout doesn't re-render each tick
  const { inRun, alive, pendingEvent, pendingContract, pendingMinor, pendingModal, activeResolution, speed, autoPlay, tick, selectEventChoice, selectContractApproach, dismissResolution, hydrateFromBackend, dungeonId, dungeonFx, dungeonNonce } =
    useGameStore(
      useShallow((s) => ({
        inRun: s.inRun,
        alive: s.char.alive,
        pendingEvent: s.char.pendingEvent,
        pendingContract: s.char.pendingContract,
        pendingMinor: s.char.pendingMinor,
        pendingModal: s.char.pendingModal,
        activeResolution: s.activeResolution,
        speed: s.speed,
        autoPlay: s.autoPlay,
        tick: s.tick,
        selectEventChoice: s.selectEventChoice,
        selectContractApproach: s.selectContractApproach,
        dismissResolution: s.dismissResolution,
        hydrateFromBackend: s.hydrateFromBackend,
        dungeonId: s.char.pendingDungeon?.id || null,
        dungeonFx: s.char.pendingDungeon?.lastStageResult?.fx || null,
        dungeonNonce: s.char.pendingDungeon?.lastStageResult?.nonce || 0
      }))
    );

  useEffect(() => {
    hydrateFromBackend();
  }, [hydrateFromBackend]);

  // The year's clock: real elapsed time, capped so a background tab doesn't skip a decade
  useEffect(() => {
    if (!inRun || !alive || speed === 0 || pendingModal) return undefined;

    if (activeResolution) {
      if (!autoPlay) return undefined;
      const autoDelay = speed === 3 ? 3000 : speed === 2 ? 4500 : 7000;
      const timer = setTimeout(() => {
        dismissResolution();
      }, autoDelay);
      return () => clearTimeout(timer);
    }

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
  }, [inRun, alive, pendingEvent, pendingContract, pendingModal, activeResolution, speed, autoPlay, tick, selectEventChoice, selectContractApproach, dismissResolution]);

  // The play screen manages its own scrolling regions; other screens scroll as a page
  const isPlay = location.pathname === '/' && inRun;
  const isHome = location.pathname === '/' && !inRun;
  const hasDock = isPlay && Boolean(pendingEvent || pendingContract || pendingMinor || activeResolution);
  const dungeon = isPlay && dungeonId ? DUNGEON_DEFINITIONS[dungeonId] : null;

  // The world this life is in right now: one string, so the layout re-renders only when it changes
  const sceneKey = useGameStore((s) => JSON.stringify(sceneContextOf({ inRun: s.inRun, path: location.pathname, char: s.char })));
  const scene = useMemo(() => JSON.parse(sceneKey), [sceneKey]);
  const session = useGameStore((s) => s.char.pendingDungeon || null);
  useEffect(() => {
    audioEngine.setScene(scene);
  }, [scene]);
  const sceneStyle = {
    '--accent': scene.color || scene.accent,
    '--accent-hover': scene.color || scene.accent,
    '--accent-ink': scene.color ? '#fff' : scene.ink,
    '--accent-soft': 'color-mix(in srgb, ' + (scene.color || scene.accent) + ' 16%, transparent)',
    '--glow': scene.glow,
    ...(dungeon ? { '--dg': dungeon.accentColor } : {})
  };

  return (
    <div
      className={`shell interface-v2 ${isPlay ? 'is-in-play' : ''} ${hasDock ? 'has-dock' : ''} ${dungeon ? `in-dungeon dg-shell-${dungeon.theme}` : ''}`}
      data-world={scene.world}
      style={sceneStyle}
    >
      <WorldBackdrop scene={scene} session={session} />
      {dungeon && dungeonFx && <span key={dungeonNonce} className={`dg-shell-pulse fx-${dungeonFx}`} aria-hidden="true" />}
      <Header isPlay={isPlay} />
      <main className={`main ${isHome ? 'is-home' : ''}`} id="main-content">{isPlay ? children : <div className="main-scroll">{children}</div>}</main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
