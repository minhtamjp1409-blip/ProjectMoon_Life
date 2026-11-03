import { npcIsActive } from './eventConditions.js';

export const NAMING_ROLES = ['friend', 'lover', 'spouse'];

export function isNamingRole(role) {
  return NAMING_ROLES.includes(role);
}

export function sanitizeNpcName(rawInput) {
  if (typeof rawInput !== 'string') return '';
  return rawInput.trim().slice(0, 24).trim();
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
    if (currentNpc && npcIsActive(currentNpc) && currentNpc.needsNaming && !currentNpc.namedPrompted) {
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
    const prompt = getNpcNamingPrompt(role, char);
    char.pendingNpcNaming = {
      role,
      defaultNameVi: npc.nameVi || '',
      defaultNameEn: npc.nameEn || npc.nameVi || '',
      traitVi: npc.traitVi || '',
      traitEn: npc.traitEn || npc.traitVi || '',
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
    next.vi = next.vi.replaceAll(oldVi, newVi);
  }
  if (oldEn && typeof next.en === 'string' && next.en.includes(oldEn)) {
    next.en = next.en.replaceAll(oldEn, newEn);
  }
  if (oldVi && typeof next.choiceVi === 'string' && next.choiceVi.includes(oldVi)) {
    next.choiceVi = next.choiceVi.replaceAll(oldVi, newVi);
  }
  if (oldEn && typeof next.choiceEn === 'string' && next.choiceEn.includes(oldEn)) {
    next.choiceEn = next.choiceEn.replaceAll(oldEn, newEn);
  }
  if (next.review) {
    next.review = {
      ...next.review,
      ...(oldVi && typeof next.review.vi === 'string' ? { vi: next.review.vi.replaceAll(oldVi, newVi) } : {}),
      ...(oldEn && typeof next.review.en === 'string' ? { en: next.review.en.replaceAll(oldEn, newEn) } : {}),
      ...(Array.isArray(next.review.choices)
        ? {
            choices: next.review.choices.map((c) => ({
              ...c,
              ...(oldVi && typeof c.vi === 'string' ? { vi: c.vi.replaceAll(oldVi, newVi) } : {}),
              ...(oldEn && typeof c.en === 'string' ? { en: c.en.replaceAll(oldEn, newEn) } : {})
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
    if (Array.isArray(char.logs)) {
      char.logs = char.logs.map((entry) => {
        if (entry && (entry.age === char.age || entry.id === 'log_birth_3')) {
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
  }

  char.pendingNpcNaming = null;
  return syncNpcNamingPrompt(char);
}
