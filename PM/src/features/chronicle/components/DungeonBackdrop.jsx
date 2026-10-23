import React from 'react';
import { DUNGEON_DEFINITIONS } from '../../../engine/gameEngine';

export const DungeonBackdrop = ({ session }) => {
  if (!session) return null;
  const def = DUNGEON_DEFINITIONS[session.id];
  const theme = def?.theme || 'warp';
  const strain = session.sanityStrain || 0;
  const isHighStrain = strain >= 60;
  const isCriticalStrain = strain >= 85;

  return (
    <div
      className={`dungeon-backdrop theme-${theme} ${isHighStrain ? 'is-high-strain' : ''} ${isCriticalStrain ? 'is-crit-strain' : ''}`}
      aria-hidden="true"
    >
      {/* 1. WARP Train: Dimensional scanlines, speedlines & spatial tear */}
      {theme === 'warp' && (
        <div className="warp-dimensional-grid">
          <div className="warp-speedline line-1" />
          <div className="warp-speedline line-2" />
          <div className="warp-speedline line-3" />
          <div className="warp-rift-core" />
          <div className="warp-scanlines" />
        </div>
      )}

      {/* 2. Lobotomy Ruins: Subterranean facility siren & Enkephalin motes */}
      {theme === 'lobotomy' && (
        <div className="lobotomy-meltdown-grid">
          <div className="enkephalin-mote mote-1" />
          <div className="enkephalin-mote mote-2" />
          <div className="enkephalin-mote mote-3" />
          <div className="enkephalin-mote mote-4" />
          <div className="enkephalin-core-glow" />
          <div className="lobotomy-siren-ambient" />
        </div>
      )}

      {/* 3. La Manchaland: Subterranean neon Ferris wheel & Crimson blood mist */}
      {theme === 'bloodfiend' && (
        <div className="bloodfiend-carnival-grid">
          <div className="blood-mist-layer" />
          <div className="carnival-neon-ring" />
          <div className="carnival-neon-spokes" />
          <div className="crimson-ambient-glow" />
        </div>
      )}

      {/* 4. Ancient Outskirts Ruins: Desert sand drift & Megalithic ruin monoliths */}
      {theme === 'outskirts' && (
        <div className="outskirts-ruins-grid">
          <div className="sand-drift-layer" />
          <div className="ruin-monolith-shadow left" />
          <div className="ruin-monolith-shadow right" />
          <div className="sun-shaft-glow" />
        </div>
      )}

      {/* 5. The Great Lake (Pallid Whale Abyss): Abyssal currents, pallid membrane & U Corp tuning rings */}
      {theme === 'greatlake' && (
        <div className="greatlake-abyss-grid">
          <div className="greatlake-wave-layer wave-1" />
          <div className="greatlake-wave-layer wave-2" />
          <div className="greatlake-tuning-ring ring-outer" />
          <div className="greatlake-tuning-ring ring-inner" />
          <div className="pallid-whale-eye-glow" />
          <div className="pallid-spore-mote spore-1" />
          <div className="pallid-spore-mote spore-2" />
          <div className="pallid-spore-mote spore-3" />
        </div>
      )}

      {/* Sanity Strain Vignette: Darkens and bleeds red as strain rises */}
      <div
        className="strain-vignette"
        style={{
          opacity: Math.min(0.7, Math.max(0, (strain - 15) / 100))
        }}
      />
    </div>
  );
};
