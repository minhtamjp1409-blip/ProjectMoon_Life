import React from 'react';

// Distortion manifestation: your mind shatters, Carmen's light floods the core,
// the human frame breaks into jagged crimson shards, and the distortion takes physical shape.
// Drawn here, timed in cutscene.css.
const SHARD_LEFT = '30,20 90,45 75,115 15,90';
const SHARD_TOP = '90,15 170,30 145,95 80,65';
const SHARD_RIGHT = '150,90 190,110 165,185 110,145';
const SHARD_BOTTOM = '35,110 105,130 90,190 20,165';
const SHARD_CENTER = '75,60 135,70 120,135 60,115';

export function DistortScene() {
  return (
    <div className="cs-art cs-distort-art" aria-hidden="true">
      <div className="cs-distort-abyss" />
      <div className="cs-distort-core" />
      <span className="cs-distort-pulse" />
      <svg className="cs-distort-fracture" viewBox="0 0 200 200">
        <polygon className="cs-distort-shard is-1" points={SHARD_LEFT} />
        <polygon className="cs-distort-shard is-2" points={SHARD_TOP} />
        <polygon className="cs-distort-shard is-3" points={SHARD_RIGHT} />
        <polygon className="cs-distort-shard is-4" points={SHARD_BOTTOM} />
        <polygon className="cs-distort-shard is-5" points={SHARD_CENTER} />
      </svg>
      <div className="cs-flash is-crimson" />
    </div>
  );
}
