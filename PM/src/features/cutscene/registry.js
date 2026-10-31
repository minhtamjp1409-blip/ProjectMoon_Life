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
    keyDynamic: 'color'
  },
  // A companion dies in your place: the name on the dark, a candle that goes out, their last words
  savior: {
    ms: { full: 3600, lite: 900, still: 1600, caption: 1200 },
    lines: [
      { vi: 'Đòn đó lẽ ra đã giết bạn.', en: 'That blow should have killed you.' }
    ],
    keyDynamic: 'savior',
    // What each of them says last, by the role they held in the life
    lastWords: {
      spouse: { vi: 'Sống tiếp đi. Vì cả hai ta.', en: 'Keep living. For both of us.' },
      partner: { vi: 'Đừng quay lại nhìn tôi.', en: 'Don’t turn back to look at me.' },
      friend: { vi: 'Lần này để tôi.', en: 'Let me take this one.' },
      mentor: { vi: 'Đến lượt con rồi.', en: 'Your turn now.' }
    }
  },
  // The top seat of a Finger: the Finger's own mark in its colour, then the title the whole Finger now uses
  finger: {
    ms: { full: 4600, lite: 1000, still: 1800, caption: 1200 },
    lines: [
      { vi: 'Cả Ngón Tay im lặng chờ.', en: 'The whole Finger waits in silence.' }
    ],
    keyDynamic: 'finger'
  },
  // A dungeon gate: the interface fades away, the dungeon's own backdrop shows whole, its name is set like a title card.
  // The name and the line under it come from the dungeon definition.
  dungeon: {
    ms: { full: 2400, lite: 900, still: 1600, caption: 1200 },
    lines: [],
    keyDynamic: 'dungeon'
  },
  // Carmen's call (event ego_carmen_crossroad): a slow heartbeat of warm light, whispers drift in from the edges
  // and thicken, then go quiet for the one sentence. The choice dock rises only after it.
  carmen: {
    ms: { full: 6000, lite: 900, still: 1800, caption: 1200 },
    lines: [
      { vi: 'Có ai đang gọi tên bạn bằng chính giọng của bạn.', en: 'Someone is calling your name in your own voice.' }
    ],
    keyLine: 0,
    // Drawn as up to 24 fragments in the full cut and 6 in the lite one, cycling through this list
    whispers: [
      { vi: 'đừng quay đầu', en: "don't look back" },
      { vi: 'ở đây sáng hơn', en: "it's brighter here" },
      { vi: 'bạn mệt rồi', en: "you're tired" },
      { vi: 'buông ra đi', en: 'let go' },
      { vi: 'không ai trách bạn', en: 'no one will blame you' },
      { vi: 'đau lắm, đúng không', en: "it hurts, doesn't it" },
      { vi: 'lại gần đây', en: 'come closer' },
      { vi: 'bạn chịu đủ rồi', en: "you've endured enough" },
      { vi: 'tôi nghe thấy bạn', en: 'I can hear you' },
      { vi: 'không cần giữ nữa', en: 'no need to hold on' },
      { vi: 'họ chưa từng hiểu bạn', en: 'they never understood you' },
      { vi: 'thành điều bạn muốn', en: 'become what you want' }
    ]
  }
};

// The opening of a life: the District card (CityLoadingOverlay), then the birth entries one by one.
// Not a Director scene (the clock has not started, nothing to hold), but paced from the same settings and cuts.
// lite is the default and keeps the timing the game always had; full is slower, still holds the card without
// motion, caption (scenes off) skips the card and lays the entries down quickly.
export const BIRTH_OPENING = {
  cardMs: { full: 2400, lite: 1500, still: 900, caption: 0 },
  // [before the first entry, between the next ones]
  entryGapMs: { full: [700, 1600], lite: [550, 1250], still: [300, 700], caption: [150, 400] }
};

export function birthOpeningCut({ setting = 'short', reduced = false } = {}) {
  if (setting === 'off') return 'caption';
  if (reduced) return 'still';
  return setting === 'full' ? 'full' : 'lite';
}

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
