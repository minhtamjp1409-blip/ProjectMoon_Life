import { npcIsActive } from './eventConditions.js';

export const NAMING_ROLES = ['friend', 'lover', 'spouse'];

export function isNamingRole(role) {
  return NAMING_ROLES.includes(role);
}

export function sanitizeNpcName(rawInput) {
  if (typeof rawInput !== 'string') return '';
  return rawInput.trim().slice(0, 24).trim();
}

export function formatNpcTrait(trait, lang = 'vi') {
  if (!trait || typeof trait !== 'string') return '';
  const trimmed = trait.trim();
  if (!trimmed) return '';
  const prefix = lang === 'en' ? 'Trait: ' : 'Đặc điểm: ';
  if (trimmed.toLowerCase().startsWith(prefix.toLowerCase())) return trimmed;
  const cap = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return `${prefix}${cap}`;
}

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceWholeName(text, oldName, newName) {
  if (typeof text !== 'string' || !text || !oldName || !newName || oldName === newName) return text;
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])${escapeRegExp(oldName)}(?![\\p{L}\\p{N}_])`, 'gu');
  return text.replace(pattern, newName);
}

function containsWholeName(text, name) {
  if (typeof text !== 'string' || !text || !name) return false;
  if (!text.includes(name)) return false;
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])${escapeRegExp(name)}(?![\\p{L}\\p{N}_])`, 'u');
  return pattern.test(text);
}

function pendingItemMentionsNpc(item, role, nameVi, nameEn) {
  if (!item) return false;
  if (item.need?.npc === role || item.keepRole === role || item.role === role) return true;
  const texts = [
    item.titleVi, item.titleEn, item.displayVi, item.displayEn,
    item.vi, item.en,
    ...(Array.isArray(item.choices)
      ? item.choices.flatMap((c) => [c?.labelVi, c?.labelEn, c?.vi, c?.en])
      : [])
  ];
  return texts.some((text) => containsWholeName(text, nameVi) || containsWholeName(text, nameEn));
}

function childhoodFriendHasAppeared(char, npc) {
  if (!char || !npc || (char.age ?? 0) <= 0) return false;
  const nameVi = npc.nameVi || '';
  const nameEn = npc.nameEn || nameVi;
  if (
    pendingItemMentionsNpc(char.pendingEvent, 'friend', nameVi, nameEn) ||
    pendingItemMentionsNpc(char.pendingMinor, 'friend', nameVi, nameEn) ||
    pendingItemMentionsNpc(char.pendingContract, 'friend', nameVi, nameEn)
  ) {
    return true;
  }
  const minAge = Math.max(1, (npc.metAge ?? 0) + 1);
  return (char.logs || []).some((entry) => {
    if (!entry) return false;
    if (String(entry.id || '').startsWith('log_birth')) return false;
    if ((entry.age ?? 0) < minAge) return false;
    return (
      containsWholeName(entry.vi, nameVi) ||
      containsWholeName(entry.en, nameEn) ||
      (Array.isArray(entry.deltas) && entry.deltas.some((d) => d?.role === 'friend'))
    );
  });
}

function replacePendingNpcName(item, oldVi, oldEn, newVi, newEn) {
  if (!item) return item;
  const next = { ...item };
  for (const field of ['titleVi', 'displayVi', 'vi']) {
    if (oldVi && typeof next[field] === 'string' && next[field].includes(oldVi)) {
      next[field] = replaceWholeName(next[field], oldVi, newVi);
    }
  }
  for (const field of ['titleEn', 'displayEn', 'en']) {
    if (oldEn && typeof next[field] === 'string' && next[field].includes(oldEn)) {
      next[field] = replaceWholeName(next[field], oldEn, newEn);
    }
  }
  if (Array.isArray(next.choices)) {
    next.choices = next.choices.map((c) => {
      if (!c) return c;
      const updated = { ...c };
      for (const f of ['labelVi', 'vi']) {
        if (oldVi && typeof updated[f] === 'string' && updated[f].includes(oldVi)) {
          updated[f] = replaceWholeName(updated[f], oldVi, newVi);
        }
      }
      for (const f of ['labelEn', 'en']) {
        if (oldEn && typeof updated[f] === 'string' && updated[f].includes(oldEn)) {
          updated[f] = replaceWholeName(updated[f], oldEn, newEn);
        }
      }
      return updated;
    });
  }
  return next;
}

export function getNpcNamingPrompt(role, char) {
  if (role === 'friend') {
    const isChildhood = (char?.age ?? 0) < 15 && (char?.npcs?.friend?.metAge ?? 0) < 15;
    if (isChildhood) {
      return {
        titleVi: 'Bạn thuở nhỏ',
        titleEn: 'Childhood friend',
        questionVi: 'Đứa trẻ đó tên gì? (để trống để ngẫu nhiên)',
        questionEn: 'What is that child’s name? (leave blank for random)'
      };
    }
    return {
      titleVi: 'Người bạn mới',
      titleEn: 'New friend',
      questionVi: 'Người bạn đó tên gì? (để trống để ngẫu nhiên)',
      questionEn: 'What is that friend’s name? (leave blank for random)'
    };
  }
  if (role === 'lover') {
    return {
      titleVi: 'Người thương',
      titleEn: 'Lover',
      questionVi: 'Người thương của bạn tên gì? (để trống để ngẫu nhiên)',
      questionEn: 'What is your lover’s name? (leave blank for random)'
    };
  }
  return {
    titleVi: 'Người bạn đời',
    titleEn: 'Spouse',
    questionVi: 'Người bạn đời của bạn tên gì? (để trống để ngẫu nhiên)',
    questionEn: 'What is your spouse’s name? (leave blank for random)'
  };
}

export function syncNpcNamingPrompt(char, { autoPlay = false, waitForBirthPrologue = false } = {}) {
  if (!char || !char.alive) {
    if (char) char.pendingNpcNaming = null;
    return char;
  }

  if (autoPlay) {
    let updatedNpcs = null;
    for (const role of NAMING_ROLES) {
      const npc = char.npcs?.[role];
      if (npc && npc.needsNaming) {
        if (!updatedNpcs) updatedNpcs = { ...char.npcs };
        updatedNpcs[role] = { ...npc, needsNaming: false, namedPrompted: true };
      }
    }
    if (updatedNpcs) char.npcs = updatedNpcs;
    char.pendingNpcNaming = null;
    return char;
  }

  if (char.pendingNpcNaming) {
    const currentRole = char.pendingNpcNaming.role;
    const currentNpc = char.npcs?.[currentRole];
    const ready = currentRole !== 'friend' || (currentNpc?.metAge ?? 0) > 0 || childhoodFriendHasAppeared(char, currentNpc);
    if (currentNpc && npcIsActive(currentNpc) && currentNpc.needsNaming && !currentNpc.namedPrompted && ready) {
      return char;
    }
    char.pendingNpcNaming = null;
  }

  if (waitForBirthPrologue && (char.pendingBirthLogs || []).length > 0) {
    return char;
  }

  for (const role of NAMING_ROLES) {
    const npc = char.npcs?.[role];
    if (!npc || !npcIsActive(npc)) continue;
    // Old saves do not carry `needsNaming: true`, so they are never prompted again
    if (!npc.needsNaming || npc.namedPrompted) continue;
    // Childhood friend met at birth waits until first post-birth event/log featuring them
    if (role === 'friend' && (npc.metAge ?? 0) === 0 && !childhoodFriendHasAppeared(char, npc)) {
      continue;
    }
    const prompt = getNpcNamingPrompt(role, char);
    char.pendingNpcNaming = {
      role,
      defaultNameVi: npc.nameVi || '',
      defaultNameEn: npc.nameEn || npc.nameVi || '',
      traitVi: formatNpcTrait(npc.traitVi || '', 'vi'),
      traitEn: formatNpcTrait(npc.traitEn || npc.traitVi || '', 'en'),
      ...prompt
    };
    return char;
  }

  return char;
}

function replaceLogNpcName(entry, role, oldVi, oldEn, newVi, newEn) {
  if (!entry) return entry;
  const next = { ...entry };
  if (oldVi && typeof next.vi === 'string' && next.vi.includes(oldVi)) {
    next.vi = replaceWholeName(next.vi, oldVi, newVi);
  }
  if (oldEn && typeof next.en === 'string' && next.en.includes(oldEn)) {
    next.en = replaceWholeName(next.en, oldEn, newEn);
  }
  if (oldVi && typeof next.choiceVi === 'string' && next.choiceVi.includes(oldVi)) {
    next.choiceVi = replaceWholeName(next.choiceVi, oldVi, newVi);
  }
  if (oldEn && typeof next.choiceEn === 'string' && next.choiceEn.includes(oldEn)) {
    next.choiceEn = replaceWholeName(next.choiceEn, oldEn, newEn);
  }
  if (next.review) {
    next.review = {
      ...next.review,
      ...(oldVi && typeof next.review.vi === 'string' ? { vi: replaceWholeName(next.review.vi, oldVi, newVi) } : {}),
      ...(oldEn && typeof next.review.en === 'string' ? { en: replaceWholeName(next.review.en, oldEn, newEn) } : {}),
      ...(Array.isArray(next.review.choices)
        ? {
            choices: next.review.choices.map((c) => ({
              ...c,
              ...(oldVi && typeof c.vi === 'string' ? { vi: replaceWholeName(c.vi, oldVi, newVi) } : {}),
              ...(oldEn && typeof c.en === 'string' ? { en: replaceWholeName(c.en, oldEn, newEn) } : {})
            }))
          }
        : {})
    };
  }
  if (Array.isArray(next.deltas)) {
    next.deltas = next.deltas.map((d) => {
      if (d && (d.role === role || d.name === oldVi || d.name === oldEn)) {
        return { ...d, name: newVi };
      }
      return d;
    });
  }
  return next;
}

export function applyNpcName(char, rawInput = '', roleOverride = null) {
  if (!char) return char;
  const role =
    roleOverride ||
    char.pendingNpcNaming?.role ||
    NAMING_ROLES.find((r) => char.npcs?.[r]?.needsNaming && !char.npcs?.[r]?.namedPrompted);

  if (!role || !char.npcs?.[role]) {
    char.pendingNpcNaming = null;
    return char;
  }

  const npc = char.npcs[role];
  const oldVi = npc.nameVi || '';
  const oldEn = npc.nameEn || oldVi;
  const custom = sanitizeNpcName(rawInput);
  const finalVi = custom || oldVi;
  const finalEn = custom || oldEn;

  char.npcs = {
    ...char.npcs,
    [role]: {
      ...npc,
      nameVi: finalVi,
      nameEn: finalEn,
      fullName: custom ? finalVi : (npc.fullName || finalVi),
      needsNaming: false,
      namedPrompted: true
    }
  };

  if (custom && (finalVi !== oldVi || finalEn !== oldEn)) {
    const minAge = npc.metAge ?? 0;
    if (Array.isArray(char.logs)) {
      char.logs = char.logs.map((entry) => {
        if (entry && ((entry.age ?? 0) >= minAge || entry.id === 'log_birth_3')) {
          return replaceLogNpcName(entry, role, oldVi, oldEn, finalVi, finalEn);
        }
        return entry;
      });
    }
    if (Array.isArray(char.pendingBirthLogs)) {
      char.pendingBirthLogs = char.pendingBirthLogs.map((entry) =>
        replaceLogNpcName(entry, role, oldVi, oldEn, finalVi, finalEn)
      );
    }
    if (char.colorTrialCompanion?.role === role) {
      char.colorTrialCompanion = {
        ...char.colorTrialCompanion,
        nameVi: finalVi,
        nameEn: finalEn
      };
    }
    if (char.pendingEvent) char.pendingEvent = replacePendingNpcName(char.pendingEvent, oldVi, oldEn, finalVi, finalEn);
    if (char.pendingMinor) char.pendingMinor = replacePendingNpcName(char.pendingMinor, oldVi, oldEn, finalVi, finalEn);
    if (char.pendingContract) char.pendingContract = replacePendingNpcName(char.pendingContract, oldVi, oldEn, finalVi, finalEn);
  }

  char.pendingNpcNaming = null;
  return syncNpcNamingPrompt(char);
}
