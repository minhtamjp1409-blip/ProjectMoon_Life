import { DUNGEON_DEFINITIONS } from '../../engine/dungeonEngine.js';

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
    keyLine: 0,
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
  },
  // E.G.O awakening: Carmen's voice shatters, inner light erupts from the deepest wound, E.G.O takes physical form
  ego: {
    ms: { full: 4600, lite: 1000, still: 1800, caption: 1200 },
    lines: [
      { vi: 'Giọng nói trong tâm trí bạn vụn vỡ.', en: 'The voice in your mind shatters.' },
      { vi: 'Một luồng sáng bùng lên từ nơi sâu thẳm nhất.', en: 'Light erupts from the deepest fracture.' },
      { vi: 'E.G.O đã thành hình.', en: 'E.G.O has taken shape.' }
    ],
    keyLine: 2
  },
  // Distortion manifestation: your mind shatters, Carmen's light floods the core, the human frame gives way
  distort: {
    ms: { full: 4600, lite: 1000, still: 1800, caption: 1200 },
    lines: [
      { vi: 'Tâm trí bạn không còn gồng gánh nữa.', en: 'Your mind no longer struggles to hold on.' },
      { vi: 'Mặt kính vỡ ra, và ánh dương của Carmen nuốt chửng bản ngã.', en: 'The glass shatters, and Carmen’s light swallows your self.' },
      { vi: 'Biến dị đã thành hình.', en: 'Distortion has taken shape.' }
    ],
    keyLine: 2
  },
  // The Library threshold: the City wall falls behind, amid the Outskirts ash a plain wooden door stands open
  library: {
    ms: { full: 5200, lite: 1000, still: 1800, caption: 1200 },
    lines: [
      { vi: 'Bức Tường thành đã lùi lại phía sau.', en: 'The City wall has fallen far behind.' },
      { vi: 'Giữa đống tro tàn Outskirts, một cánh cửa gỗ mộc mạc đang mở.', en: 'Amid the Outskirts ash, a plain wooden door stands open.' },
      { vi: 'Chào mừng bạn đến với Thư Viện.', en: 'Welcome to the Library.' }
    ],
    keyLine: 2
  },
  // The Index Prescript: celestial scroll descending, broken wax seal, divine silver directives
  prescript: {
    ms: { full: 4800, lite: 1000, still: 1800, caption: 1200 },
    lines: [
      { vi: 'Từ trần nhà rạn nứt, một cuộn giấy sớ buông rơi.', en: 'From the fractured ceiling, a prescript scroll drifts downward.' },
      { vi: 'Dấu niêm sáp vỡ vụn, và những dòng chữ bạc hiện ra.', en: 'The wax seal breaks, revealing silver-glowing script.' },
      { vi: 'Mệnh lệnh của The Index đã ban xuống.', en: 'The Index has delivered its Prescript.' }
    ],
    keyLine: 2
  },
  // The Thumb Iron Rule: loaded muzzle, stamped discipline bullet, rigid obedience
  ironrule: {
    ms: { full: 4600, lite: 1000, still: 1800, caption: 1200 },
    lines: [
      { vi: 'Căn phòng chìm vào sự phục tùng tuyệt đối.', en: 'The chamber falls into absolute subjugation.' },
      { vi: 'Tiếng lên đạn kim loại khô khốc vang lên bên tai.', en: 'A cold metallic slide racks beside your ear.' },
      { vi: 'Thiết luật của The Thumb là bất khả lay chuyển.', en: 'The iron rule of the Thumb is absolute.' }
    ],
    keyLine: 2
  },
  // The Middle Vengeance: ledger of grudges turning, indelible violet ink, debt to the Family
  vengeance: {
    ms: { full: 4800, lite: 1000, still: 1800, caption: 1200 },
    lines: [
      { vi: 'Từng trang sổ thù hận lật mở trong bóng tối.', en: 'The pages of the ledger turn in the dark.' },
      { vi: 'Mực tím thấm sâu vào da thịt như lời thề không bao giờ phai.', en: 'Violet ink seeps into flesh like an unfading vow.' },
      { vi: 'Món nợ với Gia Đình của The Middle phải được hoàn trả.', en: 'Every debt against the Family must be repaid.' }
    ],
    keyLine: 2
  }
};

// The opening of a life: the District card (CityLoadingOverlay), then the birth entries one by one.
// Not a Director scene (the clock has not started, nothing to hold), but paced from the same settings and cuts.
// lite is the default and is short because a player sees it at the start of every life (800ms since 04/11/2026,
// when the opening was measured at 2.6s against 0.04s on the sample site); full is slower, still holds the card without
// motion, caption (scenes off) skips the card and lays the entries down quickly.
export const BIRTH_OPENING = {
  cardMs: { full: 2400, lite: 800, still: 900, caption: 0 },
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

// Đợt 118c: Trả câu chính của cảnh để đọc qua vùng thông báo khi cảnh kết thúc hoặc khi ở bản caption
export function getCutsceneKeyAnnouncement(id, state = null, lang = 'vi') {
  const scene = CUTSCENES[id];
  if (!scene) return '';
  if (id === 'color') {
    const c = state?.bestowedColor;
    const title = c?.title || 'Color Fixer';
    return lang === 'en' ? `Hana conferred title: ${title}` : `Hana sắc phong danh hiệu: ${title}`;
  }
  if (id === 'savior') {
    const life = state?.char;
    const role = ['spouse', 'partner', 'friend', 'mentor'].find((k) => life?.npcs?.[k]?.deceased && life.npcs[k].fateAge === life.age);
    const words = role ? scene.lastWords?.[role] : null;
    if (words) return lang === 'en' ? words.en : words.vi;
    return lang === 'en' ? 'A companion took the blow in your place.' : 'Một người thân đã đỡ đòn thay bạn.';
  }
  if (id === 'dungeon') {
    const dungeonId = state?.char?.pendingDungeon?.id || state?.dungeonId;
    const def = dungeonId ? DUNGEON_DEFINITIONS[dungeonId] : null;
    if (def) return lang === 'en' ? (def.titleEn || def.titleVi) : (def.titleVi || def.titleEn);
    return lang === 'en' ? 'Dungeon' : 'Hầm ngục';
  }
  if (scene.keyLine !== undefined && scene.lines?.[scene.keyLine]) {
    return lang === 'en' ? scene.lines[scene.keyLine].en : scene.lines[scene.keyLine].vi;
  }
  return '';
}
