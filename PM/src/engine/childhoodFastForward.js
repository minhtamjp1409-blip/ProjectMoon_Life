import { matchesNeed } from './eventConditions.js';
import { syncVisibleDoorsForChar } from './lockedDoors.js';

const splitEventTitle = (text = '') => {
  const m = /^\s*\[([^\]]{2,80})\]\s*/.exec(text || '');
  return m ? { title: m[1].trim(), body: text.slice(m[0].length) } : { title: '', body: text || '' };
};

const eventCompatibleAtAge = (ev, char, age, usedIds) => {
  if (!ev?.id || !ev.major || usedIds.has(ev.id)) return false;
  if (ev.causalOnly || ev.isCausalCallback) return false;
  if (ev.id.startsWith('ad_career_crossroad')) return false;
  if (!Array.isArray(ev.choices) || ev.choices.length === 0) return false;
  if (Array.isArray(ev.age)) {
    const [lo, hi] = ev.age;
    if (lo != null && age < lo) return false;
    if (hi != null && age > hi) return false;
  }
  const dummy = { ...char, age };
  if (ev.need && !matchesNeed(ev.need, dummy, ev)) return false;
  return true;
};

const pickWeighted = (list, rng) => {
  if (!list.length) return null;
  return list[Math.floor(rng() * list.length)];
};

const hasFriendHook = (ev) => Boolean(
  ev?.need?.npc === 'friend' ||
  (ev?.choices || []).some((ch) => ch?.need?.npc === 'friend') ||
  String(ev?.vi || '').includes('{friend}')
);

/**
 * Selects 3-4 authentic childhood events (ages 0-14) covering opener, early street life,
 * childhood friend bonding/naming when present, and threshold into age 15.
 */
export function pickChildhoodBeats(char, allEvents = [], rng = Math.random) {
  const used = new Set();
  const hasFriend = Boolean(char?.npcs?.friend);
  const beats = [];

  // Beat 1 (~age 4): background opener first, fallback to early childhood event
  const openers = allEvents.filter((ev) => ev.id?.startsWith('ev_open_') && eventCompatibleAtAge(ev, char, 4, used));
  const earlyFallback = allEvents.filter((ev) => !ev.id?.startsWith('ev_open_') && (ev.age?.[1] ?? 99) <= 14 && eventCompatibleAtAge(ev, char, 5, used));
  const b1 = pickWeighted(openers, rng) || pickWeighted(earlyFallback, rng);
  if (b1) {
    used.add(b1.id);
    beats.push({ event: b1, targetAge: b1.age?.[0] != null ? Math.max(3, Math.min(6, b1.age[0])) : 4, allowFriendNaming: false });
  }

  // Beat 2 (~age 8): mid-childhood beat (save friend-heavy events for Beat 3 when friend exists)
  const midCandidates = allEvents.filter((ev) => {
    if (!eventCompatibleAtAge(ev, char, 8, used)) return false;
    if (ev.id?.startsWith('ev_open_')) return false;
    if ((ev.age?.[0] ?? 0) > 10 || (ev.age?.[1] ?? 99) > 15) return false;
    return !hasFriend || !hasFriendHook(ev);
  });
  const midAny = allEvents.filter((ev) => !ev.id?.startsWith('ev_open_') && (ev.age?.[1] ?? 99) <= 15 && eventCompatibleAtAge(ev, char, 8, used));
  const b2 = pickWeighted(midCandidates, rng) || pickWeighted(midAny, rng);
  if (b2) {
    used.add(b2.id);
    beats.push({ event: b2, targetAge: 8, allowFriendNaming: false });
  }

  // Beat 3 (~age 11, only when childhood friend exists): friend bonding + inline optional naming
  if (hasFriend) {
    const friendPool = allEvents.filter((ev) =>
      hasFriendHook(ev) &&
      (ev.age?.[1] ?? 99) <= 16 &&
      eventCompatibleAtAge(ev, char, 10, used)
    );
    const anyChildPool = allEvents.filter((ev) =>
      !ev.id?.startsWith('ev_open_') &&
      (ev.age?.[1] ?? 99) <= 15 &&
      eventCompatibleAtAge(ev, char, 11, used)
    );
    const b3 = pickWeighted(friendPool, rng) || pickWeighted(anyChildPool, rng);
    if (b3) {
      used.add(b3.id);
      beats.push({ event: b3, targetAge: 11, allowFriendNaming: true });
    }
  }

  // Final Beat (~age 13): pre-adolescent bridge toward 15
  const lateCandidates = allEvents.filter((ev) =>
    !ev.id?.startsWith('ev_open_') &&
    (ev.age?.[0] ?? 0) >= 6 &&
    (ev.age?.[1] ?? 99) <= 16 &&
    eventCompatibleAtAge(ev, char, 13, used)
  );
  const lateFallback = allEvents.filter((ev) =>
    !ev.id?.startsWith('ev_open_') &&
    (ev.age?.[1] ?? 99) <= 18 &&
    eventCompatibleAtAge(ev, char, 13, used)
  );
  const bLast = pickWeighted(lateCandidates, rng) || pickWeighted(lateFallback, rng);
  if (bLast) {
    used.add(bLast.id);
    beats.push({ event: bLast, targetAge: 13, allowFriendNaming: false });
  }

  return beats;
}

/** Builds a ready-to-render pendingEvent object for a childhood fast-forward beat. */
export function buildMontageEvent(event, char, meta, interpolate = (s) => s) {
  const viParts = splitEventTitle(interpolate(event.vi || '', char));
  const enParts = splitEventTitle(interpolate(event.en || '', char));
  return {
    ...event,
    choices: (event.choices || []).map((c) => ({
      ...c,
      labelVi: interpolate(c.labelVi || '', char),
      labelEn: interpolate(c.labelEn || '', char),
      ...(c.lasting
        ? {
            lasting: {
              vi: interpolate(c.lasting.vi || '', char),
              en: interpolate(c.lasting.en || '', char)
            }
          }
        : {})
    })),
    titleVi: viParts.title,
    titleEn: enParts.title,
    displayVi: viParts.body,
    displayEn: enParts.body,
    t: 0.25,
    _montage: {
      step: meta.step,
      total: meta.total,
      targetAge: meta.targetAge,
      allowFriendNaming: Boolean(meta.allowFriendNaming)
    }
  };
}

/** Starts childhood montage (ages 0-14 compressed into 3-4 interactive beats) when opted in on life #2+. */
export function initChildhoodMontage(char, { events = [], interpolateText, openedDoors = [], rng = Math.random } = {}) {
  if (!char) return char;
  if (Array.isArray(char.pendingBirthLogs) && char.pendingBirthLogs.length > 0) {
    char.logs = [...(char.logs || []), ...char.pendingBirthLogs];
    char.pendingBirthLogs = [];
  }
  const beats = pickChildhoodBeats(char, events, rng);
  if (beats.length === 0) {
    char.age = 15;
    char.childhoodMontage = { active: false, completed: true, total: 0, queue: [] };
    syncVisibleDoorsForChar(char, { events, openedDoors, rng });
    return char;
  }
  const total = beats.length;
  const first = beats[0];
  char.age = first.targetAge;
  char.seasonIdx = Math.min(3, first.targetAge % 4);
  char.childhoodMontage = {
    active: true,
    step: 1,
    total,
    queue: beats.slice(1).map((b, i) => ({
      eventId: b.event.id,
      targetAge: b.targetAge,
      allowFriendNaming: Boolean(b.allowFriendNaming),
      step: i + 2,
      total
    }))
  };
  char.pendingNpcNaming = null;
  char.pendingEvent = buildMontageEvent(first.event, char, {
    step: 1,
    total,
    targetAge: first.targetAge,
    allowFriendNaming: Boolean(first.allowFriendNaming)
  }, interpolateText);
  return char;
}

/** Advances the montage after resolving a beat choice, or lands cleanly at age 15 once complete. */
export function advanceChildhoodMontage(char, { events = [], interpolateText, openedDoors = [], rng = Math.random } = {}) {
  if (!char?.childhoodMontage?.active) return false;
  if (!char.alive) {
    char.childhoodMontage = null;
    return false;
  }
  const queue = Array.isArray(char.childhoodMontage.queue) ? [...char.childhoodMontage.queue] : [];
  while (queue.length > 0) {
    const nextMeta = queue.shift();
    const ev = events.find((e) => e.id === nextMeta.eventId);
    if (!ev) continue;
    char.childhoodMontage.step = nextMeta.step;
    char.childhoodMontage.queue = queue;
    char.age = nextMeta.targetAge;
    char.seasonIdx = Math.min(3, nextMeta.targetAge % 4);
    syncVisibleDoorsForChar(char, { events, openedDoors, rng });
    char.pendingNpcNaming = null;
    char.pendingEvent = buildMontageEvent(ev, char, nextMeta, interpolateText);
    return true;
  }

  // Final beat resolved: settle cleanly into age 15
  char.childhoodMontage = {
    active: false,
    completed: true,
    total: char.childhoodMontage.total || 0,
    queue: []
  };
  char.age = 15;
  char.seasonIdx = 0;
  char.plan = [];
  char.planCursor = 0;
  char.pendingBirthLogs = [];
  char.pendingMinor = null;
  char.pendingNpcNaming = null;
  if (char.npcs?.friend && char.npcs.friend.needsNaming && !char.npcs.friend.namedPrompted) {
    char.npcs = {
      ...char.npcs,
      friend: { ...char.npcs.friend, needsNaming: false, namedPrompted: true }
    };
  }
  syncVisibleDoorsForChar(char, { events, openedDoors, rng });
  char.logSerial = (char.logSerial ?? (char.logs || []).length) + 1;
  char.logs.push({
    id: `log_childhood_montage_15_${char.logSerial}`,
    age: 15,
    season: { vi: 'Mùa Xuân', en: 'Spring' },
    type: 'milestone',
    vi: 'Tuổi thơ khép lại qua vài bước ngoặt chính. Từ năm mười lăm tuổi, thời gian tự trôi.',
    en: 'Childhood closes through a few defining turns. From fifteen onward, the years run on their own.'
  });
  return false;
}
