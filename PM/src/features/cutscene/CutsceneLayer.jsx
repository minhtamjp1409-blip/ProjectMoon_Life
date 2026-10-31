import React, { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n';
import { CUTSCENES } from './registry';
import { ClawScene } from './scenes/ClawScene';
import '../../styles/ui/cutscene.css';

const SCENE_ART = { claw: ClawScene };
const SKIP_KEYS = new Set(['Enter', 'Escape', ' ']);

// The full-screen layer for the scene in the store. JS only mounts it, ends it on time and lets the player skip;
// the timeline itself is CSS. Keys are caught on the capture phase so a skip never reaches the choice hotkeys behind.
export default function CutsceneLayer() {
  const { cutscene, endCutscene, cutsceneStarted } = useGameStore(
    useShallow((s) => ({ cutscene: s.cutscene, endCutscene: s.endCutscene, cutsceneStarted: s.cutsceneStarted }))
  );
  const { t } = useT();
  const skipRef = useRef(null);
  const key = cutscene?.key;

  useEffect(() => {
    if (!cutscene) return undefined;
    cutsceneStarted(key);
    skipRef.current?.focus({ preventScroll: true });
    const done = setTimeout(() => endCutscene('done', key), cutscene.durationMs);
    const onKey = (e) => {
      if (e.key === 'Tab') return;
      e.stopPropagation();
      if (!SKIP_KEYS.has(e.key)) return;
      e.preventDefault();
      if (!e.repeat) endCutscene('skip', key);
    };
    const onHidden = () => {
      if (document.hidden) endCutscene('hidden', key);
    };
    window.addEventListener('keydown', onKey, { capture: true });
    document.addEventListener('visibilitychange', onHidden);
    return () => {
      clearTimeout(done);
      window.removeEventListener('keydown', onKey, { capture: true });
      document.removeEventListener('visibilitychange', onHidden);
    };
  }, [key]);

  if (!cutscene) return null;
  const scene = CUTSCENES[cutscene.id];
  const Art = SCENE_ART[cutscene.id];
  const lines = cutscene.cut === 'full' ? scene.lines : [scene.lines[scene.keyLine]];
  const skip = (e) => {
    e.stopPropagation();
    endCutscene('skip', key);
  };

  return (
    <div
      className={`cutscene cs-${cutscene.id} is-${cutscene.cut}`}
      style={{ '--cs-total': `${cutscene.durationMs}ms` }}
      onClick={skip}
    >
      <div className="cs-scrim" aria-hidden="true" />
      {Art && cutscene.cut !== 'caption' && <Art />}
      <div className="cs-lines" role="status" aria-live="polite">
        {lines.map((line, i) => (
          <p key={i} className={`cs-line cs-line-${i + 1} ${i === lines.length - 1 ? 'is-key' : ''}`}>
            {t(line.vi, line.en)}
          </p>
        ))}
      </div>
      <button type="button" ref={skipRef} className="cs-skip" onClick={skip}>
        {t('Bỏ qua', 'Skip')}
      </button>
    </div>
  );
}
