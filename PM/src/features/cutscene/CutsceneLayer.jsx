import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '../../store/gameStore';
import { useT } from '../../i18n';
import { audioEngine } from '../../engine/audioEngine';
import { DUNGEON_DEFINITIONS } from '../../engine/dungeonEngine';
import { WORLDS } from '../../engine/sceneContext';
import { FINGER_RANKS } from '../../data/worldData';
import { CUTSCENES } from './registry';
import { ClawScene } from './scenes/ClawScene';
import { DeathScene } from './scenes/DeathScene';
import { ColorScene } from './scenes/ColorScene';
import { CarmenScene } from './scenes/CarmenScene';
import { DungeonGateScene } from './scenes/DungeonGateScene';
import { SaviorScene } from './scenes/SaviorScene';
import { FingerScene } from './scenes/FingerScene';
import '../../styles/ui/cutscene.css';

const SCENE_ART = { claw: ClawScene, death: DeathScene, color: ColorScene, carmen: CarmenScene, dungeon: DungeonGateScene, savior: SaviorScene, finger: FingerScene };
const SKIP_KEYS = new Set(['Enter', 'Escape', ' ']);

// A Color too dark to see on the scene's dark (Black) draws its slit in the text colour instead
function sceneColor(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return null;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.12 ? 'var(--text)' : hex;
}

// "Name: subtitle" becomes the title card's two lines; a name without one takes the dungeon's kicker underneath
function gateLines(title = '', kicker = '') {
  const at = title.indexOf(': ');
  return at > 0 ? [title.slice(0, at), title.slice(at + 2)] : [title, kicker];
}

// Scenes whose key line comes from the run rather than the registry: the words, an optional line under them, a colour
const DYNAMIC = {
  // The Color title is always English
  color: ({ bestowedColor }) => ({
    key: { vi: bestowedColor?.title || '', en: bestowedColor?.title || '' },
    color: sceneColor(bestowedColor?.color)
  }),
  dungeon: ({ dungeonId }) => {
    const def = DUNGEON_DEFINITIONS[dungeonId];
    if (!def) return null;
    const [nameVi, subVi] = gateLines(def.titleVi, def.kickerVi);
    const [nameEn, subEn] = gateLines(def.titleEn, def.kickerEn);
    return { key: { vi: nameVi, en: nameEn }, sub: subVi || subEn ? { vi: subVi, en: subEn } : null, color: sceneColor(def.accentColor) };
  },
  // The companion who died this year in your place, and what their role in the life has them say last
  savior: ({ life }) => {
    const role = SAVIOR_ROLES.find((k) => life?.npcs?.[k]?.deceased && life.npcs[k].fateAge === life.age);
    const npc = role ? life.npcs[role] : null;
    if (!npc) return null;
    const words = CUTSCENES.savior.lastWords[role];
    return { key: { vi: npc.nameVi || npc.nameEn, en: npc.nameEn || npc.nameVi }, sub: words ? { vi: `“${words.vi}”`, en: `“${words.en}”` } : null };
  },
  // The Finger's top title (always its English name), the Finger under it, the Finger's colour and mark
  finger: ({ life }) => {
    const finger = life?.finger;
    const title = FINGER_RANKS[finger]?.[3];
    if (!title) return null;
    const route = String(finger).toLowerCase();
    return { key: { vi: title, en: title }, sub: { vi: `The ${finger}`, en: `The ${finger}` }, color: sceneColor(WORLDS[`finger-${route}`]?.accent), variant: route };
  }
};

const SAVIOR_ROLES = ['spouse', 'partner', 'friend', 'mentor'];

// The full-screen layer for the scene in the store. JS only mounts it, ends it on time and lets the player skip;
// the timeline itself is CSS. Keys are caught on the capture phase so a skip never reaches the choice hotkeys behind.
export default function CutsceneLayer() {
  const { cutscene, endCutscene, cutsceneStarted, bestowedColor, dungeonId, life } = useGameStore(
    useShallow((s) => ({
      cutscene: s.cutscene,
      endCutscene: s.endCutscene,
      cutsceneStarted: s.cutsceneStarted,
      bestowedColor: s.bestowedColor,
      dungeonId: s.char?.pendingDungeon?.id || null,
      // the life itself, for the scenes that name someone (savior) or a seat (finger)
      life: s.char
    }))
  );
  const { t } = useT();
  const skipRef = useRef(null);
  const key = cutscene?.key;

  useEffect(() => {
    if (!cutscene) return undefined;
    cutsceneStarted(key);
    skipRef.current?.focus({ preventScroll: true });
    // The scene's own sound, timed to its timeline; it fades when the scene ends or is skipped
    try {
      audioEngine.playCutscene(cutscene.id, cutscene.cut, cutscene.durationMs);
    } catch {
      // Audio may be blocked
    }
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
      audioEngine.stopCutscene();
      clearTimeout(done);
      window.removeEventListener('keydown', onKey, { capture: true });
      document.removeEventListener('visibilitychange', onHidden);
    };
  }, [key]);

  if (!cutscene) return null;
  const scene = CUTSCENES[cutscene.id];
  const Art = SCENE_ART[cutscene.id];
  // The key line is either written in the registry or taken from the run (DYNAMIC)
  const dynamic = scene.keyDynamic ? DYNAMIC[scene.keyDynamic]?.({ bestowedColor, dungeonId, life }) : null;
  const keyLine = scene.keyDynamic ? dynamic?.key || { vi: '', en: '' } : scene.lines[scene.keyLine];
  const lines = cutscene.cut === 'full' ? [...scene.lines.filter((line, i) => scene.keyDynamic || i !== scene.keyLine), keyLine] : [keyLine];
  const skip = (e) => {
    e.stopPropagation();
    endCutscene('skip', key);
  };

  const color = dynamic?.color || null;

  // Portalled to body: inside the layout it shared a stacking context and the decree modal and toasts showed through
  return createPortal(
    <div
      className={`cutscene cs-${cutscene.id} is-${cutscene.cut}`}
      style={{
        '--cs-total': `${cutscene.durationMs}ms`,
        ...(color ? { '--cs-color': color } : {})
      }}
      onClick={skip}
    >
      <div className="cs-scrim" aria-hidden="true" />
      {Art && cutscene.cut !== 'caption' && <Art cut={cutscene.cut} variant={dynamic?.variant} />}
      <div className="cs-lines" role="status" aria-live="polite">
        {lines.map((line, i) => (
          <p key={i} className={`cs-line cs-line-${i + 1} ${i === lines.length - 1 ? 'is-key' : ''}`}>
            {t(line.vi, line.en)}
          </p>
        ))}
        {dynamic?.sub && <p className="cs-line cs-sub">{t(dynamic.sub.vi || dynamic.sub.en, dynamic.sub.en || dynamic.sub.vi)}</p>}
      </div>
      <button type="button" ref={skipRef} className="cs-skip" onClick={skip}>
        {t('Bỏ qua', 'Skip')}
      </button>
    </div>,
    document.body
  );
}
