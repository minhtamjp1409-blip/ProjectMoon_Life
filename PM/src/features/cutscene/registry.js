// Every scene the Cutscene Director can play. The timeline itself lives in cutscene.css; this table holds what the
// store needs to hold the dock (how long each cut runs) and the words the scene says.
// Cuts: full (first viewing), lite (repeat viewings, x3, autoplay), still (reduced motion), caption (scenes switched off).
export const CUTSCENES = {
  claw: {
    ms: { full: 3600, lite: 900, still: 1600, caption: 1200 },
    lines: [
      { vi: 'Căn phòng đột ngột im lặng.', en: 'The room falls silent.' },
      { vi: 'Một đường cắt xanh mở ra trước mặt bạn.', en: 'A blue cut opens in front of you.' },
      { vi: 'Claw đã đến.', en: 'The Claw has arrived.' }
    ],
    // The one line kept when the scene is cut short
    keyLine: 2
  }
};

export const CUTSCENE_SETTINGS = ['full', 'short', 'off'];
const SEEN_KEY = (id) => `pm-cutscene-seen:${id}`;

export function hasSeenCutscene(id) {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem(SEEN_KEY(id)) === '1';
  } catch {
    return false;
  }
}

export function markCutsceneSeen(id) {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(SEEN_KEY(id), '1');
  } catch {
    // private windows and blocked storage: the scene just plays in full again next time
  }
}

// setting: 'full' always plays in full; 'short' plays in full the first time, then cut short; 'off' leaves one caption.
export function resolveCutsceneCut({ setting = 'short', reduced = false, seen = false, fast = false, lowPower = false } = {}) {
  if (setting === 'off') return 'caption';
  if (reduced) return 'still';
  if (setting === 'full') return 'full';
  if (fast || lowPower || seen) return 'lite';
  return 'full';
}

export function prefersReducedMotion() {
  if (typeof document === 'undefined') return false;
  const mode = document.documentElement.dataset.motion;
  if (mode === 'reduced') return true;
  if (mode === 'full') return false;
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isLowPowerDevice() {
  if (typeof document !== 'undefined' && document.documentElement.dataset.perf === 'low') return true;
  if (typeof navigator === 'undefined') return false;
  return (navigator.hardwareConcurrency || 8) <= 2 || (navigator.deviceMemory || 8) <= 2;
}
