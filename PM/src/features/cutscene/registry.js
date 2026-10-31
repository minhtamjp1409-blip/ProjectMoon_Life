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
  },
  // Death: the light closes in from the edges and the last lamp goes out; the card that follows says who and why
  death: {
    ms: { full: 3200, lite: 900, still: 1600, caption: 1200 },
    lines: [
      { vi: 'Mọi tiếng động chậm lại.', en: 'Every sound slows down.' },
      { vi: 'Rồi im.', en: 'Then nothing.' }
    ],
    keyLine: 1
  },
  // Hana's Color bestowal: the conferred title is the key line, taken from the roll (bestowedColor in the store)
  color: {
    ms: { full: 4200, lite: 1000, still: 1800, caption: 1200 },
    lines: [
      { vi: 'Phòng họp của Hana im bặt.', en: 'The Hana hall goes quiet.' },
      { vi: 'Một cái tên được đọc lên.', en: 'A name is read aloud.' }
    ],
    keyDynamic: 'title'
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
