// ============================================================================
// AFFILIATION: freelance, an Office, or an Association, and what each costs and pays.
// Lore scaffold: Requests come from an Association, which hands them to an Office or an
// associate Fixer. An associate takes a stable wage and must accept what is assigned.
// The rest (standing, warnings, expulsion, mentees, going independent) is the game's own.
// This module only reads and writes the character; it never imports the engine, so any
// layer can call it without a cycle.
// ============================================================================
import { ASSOCIATIONS, OFFICES, OFFICE_CFG, OFFICE_REQUESTS, SECTION_TABLE, STANDING_WORDS } from '../data/associations.js';

// Flags this module grants through helper calls, declared where the story lint can see them
export const AFFILIATION_FLAGS = [
  { flagGranted: 'HasAffiliation' }, { flagGranted: 'AffWarned' }, { flagGranted: 'AssocDirector' },
  { flagGranted: 'FormerAffiliate' }, { flagGranted: 'Defector' }, { flagGranted: 'Mentoring' },
  { flagGranted: 'MentorGraduate' }, { flagGranted: 'MenteeLost' }, { flagGranted: 'MenteeLeft' }
];

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const has = (char, flag) => (char.flags || []).includes(flag);
const addFlag = (char, flag) => { if (!has(char, flag)) char.flags = [...(char.flags || []), flag]; };
const dropFlag = (char, ...flags) => { char.flags = (char.flags || []).filter((f) => !flags.includes(f)); };

export const AFF_INVITE_IDS = [...Object.keys(ASSOCIATIONS).map((id) => `aff_invite_${id}`), 'aff_invite_office'];
export const isAffInviteEvent = (id) => AFF_INVITE_IDS.includes(id);

const START_SECTION = { 9: 6, 8: 6, 7: 5, 6: 5, 5: 4, 4: 4, 3: 3, 2: 2, 1: 2, 0: 1 };
const LEGACY_ORGS = {
  'Hook Office': { kind: 'office', id: 'hook' },
  'Shi Association': { kind: 'assoc', id: 'shi' },
  'Öufi Association': { kind: 'assoc', id: 'oufi' }
};

const defOf = (kind, id) => (kind === 'office' ? OFFICES[id] : ASSOCIATIONS[id]) || null;

function fresh(char, kind, id) {
  const grade = char.fixerGrade ?? 9;
  return {
    kind, id, name: defOf(kind, id)?.name || id,
    section: kind === 'assoc' ? (START_SECTION[grade] ?? 6) : null,
    standing: 50, joinedAge: char.age, lastPromotedAge: char.age,
    yearJobs: 0, jobsDone: 0, failures: 0, refusals: 0, warnedAge: null, director: false
  };
}

/** The stored affiliation, or the one an older save implies from its `org`, without writing it back. */
export function getAffiliation(char) {
  if (!char) return null;
  const a = char.affiliation;
  if (a && (a.kind === 'assoc' || a.kind === 'office') && defOf(a.kind, a.id)) return a;
  const legacy = LEGACY_ORGS[char.org?.name];
  return legacy ? fresh(char, legacy.kind, legacy.id) : null;
}

/** Like getAffiliation, but stores what an older save implied so later edits stick. */
export function ensureAffiliation(char) {
  const a = getAffiliation(char);
  if (a && char.affiliation !== a) {
    char.affiliation = a;
    addFlag(char, 'HasAffiliation');
  }
  return char.affiliation || null;
}

export function laneOf(char) {
  if (!char || (char.job !== 'Fixer' && char.job !== 'Color Fixer') || has(char, 'Distorted')) return null;
  const a = getAffiliation(char);
  if (a) return a.kind;
  return has(char, 'OwnFixerOffice') ? 'owner' : 'free';
}

const syncOrg = (char) => {
  const a = char.affiliation;
  char.org = a ? { type: a.kind, name: a.name, id: a.id, section: a.section } : null;
};

/** Which pool and which labels this Fixer's contracts use, or null for the open Request board. */
export function laneContractSet(char) {
  const a = getAffiliation(char);
  if (!a) return null;
  if (a.kind === 'assoc') {
    const def = ASSOCIATIONS[a.id];
    return { cfg: def.cfg, pool: def.requests, affId: a.id, lane: 'assoc' };
  }
  const def = OFFICES[a.id];
  return {
    cfg: { ...OFFICE_CFG, kickerVi: `Bảng việc của ${def.name}`, kickerEn: `${def.name} job board` },
    pool: OFFICE_REQUESTS, affId: `office:${a.id}`, lane: 'office'
  };
}

/** How the lane bends a contract: pay, odds, how high the Requests reach, how often they come. */
export function laneContractMods(char, effGrade = 9) {
  const lane = laneOf(char);
  const a = getAffiliation(char);
  if (lane === 'assoc') {
    const steps = 6 - (a.section ?? 6);
    return { lane, payMult: 1 + steps * 0.03 + (a.director ? 0.1 : 0), successDelta: 2, tierCap: 0, offerMult: 1, offerDelta: 0.1 };
  }
  if (lane === 'office') return { lane, payMult: 1.08, successDelta: 0, tierCap: 0, offerMult: 1, offerDelta: 0.05 };
  if (lane === 'owner') {
    const staff = char.officeState?.staff || 0;
    return { lane, payMult: 1.2, successDelta: -2, tierCap: 0, offerMult: 0.95 + staff * 0.04, offerDelta: 0 };
  }
  if (lane === 'free') {
    // Nobody hands a lone Fixer the big jobs unless someone vouches for them
    const vouched = (char.stats?.network ?? 0) >= 60;
    return { lane, payMult: 1.3, successDelta: -4, tierCap: effGrade <= 7 && !vouched ? 1 : 0, offerMult: effGrade <= 8 ? 0.88 : 1, offerDelta: 0 };
  }
  return { lane: null, payMult: 1, successDelta: 0, tierCap: 0, offerMult: 1, offerDelta: 0 };
}

export function standingLabel(char, lang = 'vi') {
  const a = getAffiliation(char);
  if (!a) return '';
  const row = STANDING_WORDS.find(([min]) => a.standing >= min) || STANDING_WORDS.at(-1);
  return lang === 'en' ? row[2] : row[1];
}

export function affiliationLabel(char, lang = 'vi') {
  const a = getAffiliation(char);
  if (!a) return lang === 'en' ? 'Freelance' : 'Tự do';
  const part = a.kind === 'assoc' ? ` · Section ${a.section}${a.director ? (lang === 'en' ? ' Director' : ' · Director') : ''}` : '';
  return `${a.name}${part}`;
}

/** Exam variants that belong to the Association this Fixer sits in, so the trial matches the badge. */
export function preferredPromoIds(char) {
  const a = getAffiliation(char);
  return a ? defOf(a.kind, a.id)?.promoIds || [] : [];
}

const fnv = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

/**
 * The invitation a freelance Fixer gets this year, if any. Deterministic in (seed, age), so the
 * event selector and the eligibility check agree on which one it is without storing anything.
 */
export function getAffiliationInvite(char) {
  if (char?.job !== 'Fixer' || has(char, 'Distorted') || getAffiliation(char) || has(char, 'OwnFixerOffice')) return null;
  if (char.fixerGrade == null || char.fixerGrade > 8) return null;
  if (char.lastAffiliationAge != null && char.age - char.lastAffiliationAge < 3) return null;
  const options = [];
  for (const [id, def] of Object.entries(ASSOCIATIONS)) {
    const barredUntil = (char.affBarred?.[id] ?? -99) + 12;
    const declinedUntil = (char.affDeclined?.[id] ?? -99) + 5;
    if (char.age < barredUntil || char.age < declinedUntil || !def.fit(char)) continue;
    options.push(`aff_invite_${id}`);
  }
  if (!(char.age < (char.affDeclined?.office ?? -99) + 5)) options.push('aff_invite_office');
  if (!options.length) return null;
  const h = fnv(`${char.seed ?? char.name ?? ''}|aff|${char.age}`);
  if ((h % 1000) / 1000 >= 0.6) return null;
  return options[Math.floor(((h >>> 10) % 997) / 997 * options.length)];
}

/** Queues a story beat for the weaver to bring up, once, unless one of the same kind is already waiting. */
export function plantThread(char, eventId, delay, reasonVi, reasonEn) {
  const pending = char.weaver?.pendingThreads || [];
  if (pending.some((t) => t.eventId === eventId && !t.fulfilled)) return;
  char.weaver = {
    ...char.weaver,
    pendingThreads: [...pending, {
      id: `thr_${char.age}_${eventId}`, kind: 'major', eventId, plantedAtAge: char.age,
      triggerAge: char.age + delay, reasonVi, reasonEn, fulfilled: false
    }]
  };
}

/** Takes the badge. `key` is an Association id, or `office:<id>`. */
export function joinAffiliation(char, key) {
  const [kind, id] = key.includes(':') ? ['office', key.split(':')[1]] : ['assoc', key];
  if (!defOf(kind, id)) return false;
  char.affiliation = fresh(char, kind, id);
  char.lastAffiliationAge = char.age;
  addFlag(char, 'HasAffiliation');
  dropFlag(char, 'AffWarned');
  syncOrg(char);
  // Every belonging is tested once: a few years in, the place asks for something you may not give
  const name = char.affiliation.name;
  const delay = 4 + (fnv(`${char.seed ?? ''}|conflict|${char.age}|${id}`) % 3);
  char.weaver = {
    ...char.weaver,
    pendingThreads: [...(char.weaver?.pendingThreads || []), {
      id: `thr_${char.age}_aff_conflict_${kind === 'office' ? 'office' : id}`,
      kind: 'major',
      eventId: `aff_conflict_${kind === 'office' ? 'office' : id}`,
      plantedAtAge: char.age,
      triggerAge: char.age + delay,
      reasonVi: `${name} sắp đòi ở bạn một điều khó`,
      reasonEn: `${name} is about to ask something hard of you`,
      fulfilled: false
    }]
  };
  return true;
}

/** Ends the membership. `mode` is 'expelled', 'defect' or 'resign'; the stat costs belong to the event or log that calls this. */
export function leaveAffiliation(char, mode = 'resign') {
  const a = getAffiliation(char);
  if (!a) return null;
  char.affiliation = null;
  char.org = null;
  char.lastAffiliationAge = char.age;
  dropFlag(char, 'HasAffiliation', 'AffWarned', 'AssocDirector');
  addFlag(char, 'FormerAffiliate');
  if (mode === 'defect') addFlag(char, 'Defector');
  if (mode !== 'resign') char.affBarred = { ...(char.affBarred || {}), [a.kind === 'assoc' ? a.id : 'office']: char.age };
  return a;
}

const labelIndex = (standing) => STANDING_WORDS.findIndex(([min]) => standing >= min);

/**
 * A finished, failed or refused contract moves standing. Returns a sentence to append to the log
 * when the standing crossed a line the player should notice, otherwise null.
 */
export function noteAffiliationContract(char, outcome, template = {}) {
  const lane = laneOf(char);
  if (lane !== 'assoc' && lane !== 'office') return null;
  const a = ensureAffiliation(char);
  const before = labelIndex(a.standing);
  const assoc = a.kind === 'assoc';
  if (outcome === 'ok') {
    a.standing = clamp(a.standing + 4 + ((template.tier || 0) >= 3 ? 1 : 0), 0, 100);
    a.jobsDone++; a.yearJobs++;
  } else if (outcome === 'fail') {
    a.standing = clamp(a.standing - 7, 0, 100);
    a.failures++; a.yearJobs++;
  } else if (outcome === 'decline') {
    a.standing = clamp(a.standing - (assoc ? 9 : 5), 0, 100);
    a.refusals++;
  } else return null;
  const after = labelIndex(a.standing);
  if (after === before) return null;
  const word = standingLabel(char, 'vi'), wordEn = standingLabel(char, 'en');
  return { vi: `Tín nhiệm của bạn trong ${a.name} giờ ở mức: ${word}.`, en: `Your standing in ${a.name} is now: ${wordEn}.` };
}

function menteeYear(char, logs) {
  const m = char.mentee;
  if (!m) return;
  const npc = char.npcs?.mentee;
  const active = npc && npc.alive !== false && !npc.deceased && !['dead', 'missing', 'estranged', 'betrayer'].includes(npc.status);
  if (!active) {
    char.mentee = null;
    dropFlag(char, 'Mentoring');
    return;
  }
  const bond = npc.bond ?? 50;
  const sane = (char.stats?.sanity ?? 50) >= 45;
  m.progress = (m.progress || 0) + 14 + (sane ? 4 : 0) + Math.floor(bond / 20) - ((char.heat || 0) > 40 ? 3 : 0);
  char.npcs = { ...char.npcs, mentee: { ...npc, bond: clamp(bond + (sane ? 1 : -2), 0, 100), lastSeen: char.age } };
  if (m.progress >= 30 && m.progress < 75 && !m.crisisPlanted) {
    m.crisisPlanted = true;
    plantThread(char, 'aff_mentee_crisis', 1, 'Người trẻ bạn dìu dắt nhận một việc quá tầm', 'The junior you train takes a job beyond their reach');
  }
  if (m.progress >= 100) {
    char.mentee = null;
    char.menteesTrained = (char.menteesTrained || 0) + 1;
    const gradLabelVi = char.job === 'Wing Employee'
      ? 'Trưởng tổ Feather (Đã xuất sư)'
      : char.job === 'Syndicate'
        ? 'Chỉ huy nhánh phố (Đã xuất sư)'
        : 'Fixer độc lập (Đã xuất sư)';
    const gradLabelEn = char.job === 'Wing Employee'
      ? 'Feather Unit Lead (Graduated)'
      : char.job === 'Syndicate'
        ? 'Branch Captain (Graduated)'
        : 'Independent Fixer (Graduated)';
    char.npcs = {
      ...char.npcs,
      mentee: {
        ...char.npcs.mentee,
        graduated: true,
        rankLabelVi: gradLabelVi,
        rankLabelEn: gradLabelEn
      }
    };
    dropFlag(char, 'Mentoring');
    addFlag(char, 'MentorGraduate');
    char.stats.rep = clamp(char.stats.rep + 4, 0, 100);
    char.stats.network = clamp(char.stats.network + 5, 0, 100);
    const a = char.affiliation;
    if (a) a.standing = clamp(a.standing + 6, 0, 100);
    if (char.job === 'Wing Employee' && char.standing != null) {
      char.standing = clamp(char.standing + 6, 0, 100);
    }
    const mNameVi = char.npcs.mentee.nameVi || 'Người bạn dìu dắt';
    const mNameEn = char.npcs.mentee.nameEn || 'The junior you trained';
    const gradVi = char.job === 'Wing Employee'
      ? `[Lứa sau] ${mNameVi} vượt qua kỳ đánh giá nội bộ của Wing và được bổ nhiệm phụ trách một tổ chuyên trách riêng. Trước khi chuyển sang tầng mới, họ đặt bản báo cáo cuối cùng lên bàn bạn và cúi đầu chào.`
      : char.job === 'Syndicate'
        ? `[Lứa sau] ${mNameVi} tự mình dẫn một toán người giữ trọn khu phố mà không cần bạn ra mặt. Khi việc xong, họ đến cúi đầu trước bạn đúng lễ nghĩa của Finger rồi bước về nhánh của mình.`
        : `[Lứa sau] ${mNameVi} nhận Request đầu tiên mà không cần bạn đứng sau lưng. Khi người ấy đi, họ cúi đầu một lần, và bạn nhận ra mình đang đứng đúng chỗ người từng dạy bạn đã đứng.`;
    const gradEn = char.job === 'Wing Employee'
      ? `[The next generation] ${mNameEn} passes the Wing’s internal review and is appointed to head a unit of their own. Before moving to the new floor, they set a final report on your desk and bow once.`
      : char.job === 'Syndicate'
        ? `[The next generation] ${mNameEn} leads a crew to hold a street block without needing you to step in. When it is done, they bow before you in the Finger’s proper manner and return to their own branch.`
        : `[The next generation] ${mNameEn} takes a first Request without you standing behind. On leaving they bow once, and you realize you are standing where whoever taught you once stood.`;
    logs.push({
      key: 'mentee_graduate', type: 'story',
      vi: gradVi,
      en: gradEn
    });
    return;
  }
  if (bond < 25 && m.progress < 60 && !(m.warnedAge === char.age)) {
    m.warnedAge = char.age;
    logs.push({
      key: 'mentee_drift', type: 'story',
      vi: `[Lứa sau] ${npc.nameVi || 'Người bạn dìu dắt'} ít đến hơn. Họ đã thôi hỏi những câu cần hỏi, và bạn không biết đó là dấu hiệu của sự tự tin hay của điều ngược lại.`,
      en: `[The next generation] ${npc.nameEn || 'The junior you trained'} comes around less. They have stopped asking the questions that need asking, and you cannot tell whether that is confidence or the opposite.`
    });
  }
}

/** The slower stories of a long career: a chair, a junior, an Office of your own. They come as threads so they do not drown in the pool. */
function plantStoryBeats(char, rng) {
  if (char.job === 'Wing Employee') {
    if (char.age >= 28 && (char.wingRank || 0) >= 2 && !has(char, 'Mentoring') && (char.menteesTrained || 0) < 2 &&
        char.age - (char.lastMenteeOfferAge ?? -99) >= 6 && rng() < 0.25) {
      char.lastMenteeOfferAge = char.age;
      plantThread(char, 'aff_mentee_wing', 1, 'Một nhân sự trẻ của Wing được phân về dưới quyền bạn', 'A junior Wing operative is assigned under your command');
    }
    return;
  }
  if (char.job === 'Syndicate') {
    if (char.age >= 28 && (char.fingerRank || 0) >= 2 && !has(char, 'Mentoring') && (char.menteesTrained || 0) < 2 &&
        char.age - (char.lastMenteeOfferAge ?? -99) >= 6 && rng() < 0.25) {
      char.lastMenteeOfferAge = char.age;
      plantThread(char, 'aff_mentee_syndicate', 1, 'Một đàn em trẻ trong Finger xin đi theo học việc dưới trướng bạn', 'A young initiate in the Finger asks to serve under your wing');
    }
    return;
  }
  const a = getAffiliation(char);
  const grade = char.fixerGrade ?? 9;
  if (a?.kind === 'assoc' && a.section === 1 && !a.director && grade <= 3 && !char.directorOffered) {
    char.directorOffered = char.age;
    plantThread(char, 'aff_director_offer', 1, `${a.name} cần một người ngồi vào chiếc ghế Director`, `${a.name} needs someone for the Director’s chair`);
  }
  if (char.age >= 32 && grade <= 5 && !has(char, 'Mentoring') && (char.menteesTrained || 0) < 2 &&
      char.age - (char.lastMenteeOfferAge ?? -99) >= 6 && rng() < 0.22) {
    char.lastMenteeOfferAge = char.age;
    plantThread(char, a ? 'aff_mentee_assoc' : 'aff_mentee_free', 1, 'Một Fixer trẻ cần ai đó chỉ đường', 'A young Fixer needs someone to show the way');
  }
  if (has(char, 'OwnFixerOffice') && !a) {
    const office = char.officeState = { ...(char.officeState || {}) };
    if (office.sinceAge == null) office.sinceAge = char.age;
    if (!has(char, 'OfficeHired') && !char.officeHireOffered) {
      char.officeHireOffered = char.age;
      plantThread(char, 'aff_office_hire', 1, 'Văn phòng của bạn có nhiều việc hơn một người xoay xở được', 'Your Office has more work than one person can manage');
    }
    if (char.age - office.sinceAge >= 3 && !char.officePressureOffered) {
      char.officePressureOffered = char.age;
      plantThread(char, 'aff_office_pressure', 1, 'Một Association để mắt đến Office nhỏ của bạn', 'An Association has noticed your small Office');
    }
  }
}

/**
 * The yearly side of belonging: the wage, standing drifting with work done or not, Section
 * promotions, warnings and the end of the membership. Also mentees and a founded Office.
 * Returns log entries for the year planner to write.
 */
export function affiliationYearTick(char, rng) {
  const logs = [];
  if (has(char, 'Distorted')) return logs;
  if (char.job === 'Wing Employee' || char.job === 'Syndicate') {
    plantStoryBeats(char, rng);
    menteeYear(char, logs);
    return logs;
  }
  if (char.job !== 'Fixer' && char.job !== 'Color Fixer') return logs;
  const a = ensureAffiliation(char);

  if (a) {
    const def = defOf(a.kind, a.id);
    const assoc = a.kind === 'assoc';
    const years = char.age - a.joinedAge;
    const grade = char.fixerGrade ?? 9;

    if (a.standing >= 20) {
      const wage = assoc ? SECTION_TABLE[a.section].salary + (a.director ? 1 : 0) : 1;
      char.stats.wealth = clamp(char.stats.wealth + wage, 0, 100);
    }
    if (a.yearJobs === 0) a.standing = clamp(a.standing - (assoc ? 3 : 2), 0, 100);
    else if (a.yearJobs >= 2) a.standing = clamp(a.standing + 2, 0, 100);
    // A Fixer who never climbs is a seat someone else could use
    if (years >= 6 && grade >= 8 && !a.director) {
      a.standing = clamp(a.standing - (assoc ? 4 : 2), 0, 100);
      if (!a.stagnantNoted || char.age - a.stagnantNoted >= 3) {
        a.stagnantNoted = char.age;
        logs.push({
          key: 'aff_stagnant', type: 'story',
          vi: `[${a.name}] Những người vào cùng thời với bạn đã lên cao hơn. Người điều phối vẫn gọi tên bạn, nhưng ngừng đưa những việc đáng nhớ.`,
          en: `[${a.name}] People who joined around when you did have climbed higher. The coordinator still calls your name, but has stopped handing you work worth remembering.`
        });
      }
    }

    if (assoc && a.section > 1 && years >= 1 && char.age - a.lastPromotedAge >= 2 && a.standing >= 70) {
      const target = a.section - 1;
      if (grade <= SECTION_TABLE[target].maxGrade) {
        a.section = target;
        a.lastPromotedAge = char.age;
        a.standing = 60;
        syncOrg(char);
        logs.push({
          key: 'aff_section_up', type: 'promo',
          vi: `[${a.name}] Tên bạn được chuyển sang Section ${target}. Phòng của bạn lớn hơn, bàn ăn nhiều món hơn, và những việc giao đến có bậc cao hơn.`,
          en: `[${a.name}] Your name is moved to Section ${target}. Your room is bigger, the table has more dishes, and the work that arrives is of a higher tier.`
        });
      }
    }

    const warnedBefore = a.warnedAge != null;
    if (!a.director && (a.standing <= 0 || (warnedBefore && a.standing < 12 && char.age > a.warnedAge))) {
      char.stats.rep = clamp(char.stats.rep - 6, 0, 100);
      char.stats.network = clamp(char.stats.network - 6, 0, 100);
      leaveAffiliation(char, 'expelled');
      logs.push({ key: 'aff_expelled', type: 'danger', vi: `[Bị cắt hợp đồng] ${def.expelVi || `${a.name} ngừng giao việc cho bạn.`} Giấy phép Hana của bạn vẫn còn, Merit vẫn là của bạn. Chỉ có cái tên đứng sau lưng là không còn.`, en: `[Contract cut] ${def.expelEn || `${a.name} stops handing you work.`} Your Hana license remains, your Merit stays yours. Only the name behind you is gone.` });
    } else if (a.standing < 25 && (a.warnedAge == null || char.age - a.warnedAge >= 3)) {
      a.warnedAge = char.age;
      addFlag(char, 'AffWarned');
      logs.push({
        key: 'aff_warning', type: 'danger',
        vi: `[Cảnh cáo · ${a.name}] Người điều phối gọi bạn vào phòng và đọc lại danh sách các việc bạn đã trả, đã trượt, đã từ chối. Họ không to tiếng. Họ nói rằng đây là lần nhắc, và lần sau không còn là nhắc.`,
        en: `[Warning · ${a.name}] The coordinator calls you in and reads back the jobs you returned, failed, or refused. They do not raise their voice. They say this is a reminder, and the next time will not be one.`
      });
    } else if (a.standing >= 45) {
      dropFlag(char, 'AffWarned');
    }
    if (char.affiliation) { a.yearJobs = 0; syncOrg(char); }
  }

  if (has(char, 'OwnFixerOffice') && !getAffiliation(char)) {
    const staff = char.officeState?.staff || 0;
    if (staff > 0) char.stats.wealth = clamp(char.stats.wealth + Math.min(2, staff) - (staff >= 3 ? 1 : 0), 0, 100);
  }
  plantStoryBeats(char, rng);
  menteeYear(char, logs);
  return logs;
}

/**
 * Event-side hooks. An event choice or outcome can carry: affJoin, affDecline, affLeave, affStanding,
 * affSection, affDirector, menteeStart, officeStaff. Each is applied after the usual effects.
 */
export function applyAffiliationChoice(char, src) {
  if (!src) return;
  if (src.affJoin) joinAffiliation(char, src.affJoin);
  if (src.affDecline) {
    char.affDeclined = { ...(char.affDeclined || {}), [src.affDecline]: char.age };
  }
  if (src.affStanding) {
    const cur = ensureAffiliation(char);
    if (cur) cur.standing = clamp(cur.standing + src.affStanding, 0, 100);
  }
  if (src.affSection) {
    const cur = ensureAffiliation(char);
    if (cur?.kind === 'assoc') { cur.section = clamp(cur.section + src.affSection, 1, 6); cur.lastPromotedAge = char.age; syncOrg(char); }
  }
  if (src.affDirector) {
    const cur = ensureAffiliation(char);
    if (cur?.kind === 'assoc') {
      cur.director = true;
      cur.section = 1;
      cur.standing = Math.max(cur.standing, 70);
      char.directorAppointment = { name: cur.name, age: char.age };
      addFlag(char, 'AssocDirector');
      syncOrg(char);
    }
  }
  if (src.affLeave) leaveAffiliation(char, src.affLeave === true ? 'resign' : src.affLeave);
  if (src.menteeStart) {
    char.mentee = { sinceAge: char.age, progress: 0 };
    addFlag(char, 'Mentoring');
    if (char.npcs?.mentee) {
      if (char.job === 'Wing Employee') {
        char.npcs = {
          ...char.npcs,
          mentee: {
            ...char.npcs.mentee,
            job: 'Wing Employee',
            rank: 1,
            rankLabelVi: 'Trợ lý Feather (Đệ tử)',
            rankLabelEn: 'Junior Feather Protege'
          }
        };
      } else if (char.job === 'Syndicate') {
        char.npcs = {
          ...char.npcs,
          mentee: {
            ...char.npcs.mentee,
            job: 'Syndicate',
            rank: 1,
            rankLabelVi: char.finger ? `Đàn em kế cận The ${char.finger}` : 'Đàn em kế cận Syndicate',
            rankLabelEn: char.finger ? `The ${char.finger} Protege` : 'Syndicate Protege'
          }
        };
      }
    }
  }
  const mentee = char.npcs?.mentee;
  if (mentee && src.menteeBond) {
    char.npcs = { ...char.npcs, mentee: { ...mentee, bond: clamp((mentee.bond ?? 50) + src.menteeBond, 0, 100), lastSeen: char.age } };
  }
  if (char.mentee && src.menteeProgress) char.mentee.progress = clamp((char.mentee.progress || 0) + src.menteeProgress, 0, 99);
  if (mentee && src.menteeFate) {
    const dead = src.menteeFate === 'dead';
    char.npcs = { ...char.npcs, mentee: { ...char.npcs.mentee, status: src.menteeFate, deceased: dead, fateAge: char.age } };
    char.mentee = null;
    dropFlag(char, 'Mentoring');
    addFlag(char, dead ? 'MenteeLost' : 'MenteeLeft');
  }
  if (src.officeStaff) {
    const staff = clamp((char.officeState?.staff || 0) + src.officeStaff, 0, 4);
    char.officeState = { ...(char.officeState || {}), staff };
  }
  if (src.clearNpcCrisis && char.npcs?.[src.clearNpcCrisis]) {
    const r = src.clearNpcCrisis;
    char.npcs = {
      ...char.npcs,
      [r]: {
        ...char.npcs[r],
        crisis: { type: 'none', severity: 0, labelVi: '', labelEn: '' }
      }
    };
  }
}
