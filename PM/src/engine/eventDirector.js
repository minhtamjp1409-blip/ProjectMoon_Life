import { careerAgeOf } from './careerAge.js';
import { HABIT_CHALLENGE_BY_EVENT, HABIT_CHALLENGE_LABELS } from '../data/habitChallengeTags.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const CHALLENGE_HABITS = ['violence', 'mercy', 'greed', 'loyalty', 'faith'];
export const MAX_HABIT_CHALLENGES_PER_LIFE = 2;
const HABIT_CHALLENGE_COOLDOWN_YEARS = 5;

const ROUTE_PREFIX = {
  fixer: 'fixer', fx: 'fixer', color: 'fixer', hana: 'fixer',
  wing: 'wing', wsv: 'wing',
  syn: 'syndicate', finger: 'syndicate', thumb: 'syndicate', index: 'syndicate',
  middle: 'syndicate', ring: 'syndicate', pinky: 'syndicate',
  distort: 'distortion', ego: 'ego', abno: 'abnormality'
};

const DANGER_PREFIX = new Set(['shock', 'distort', 'abno', 'ensemble']);
const RELIEF_PREFIX = new Set(['life', 'mourn', 'wellness']);

function choiceEffects(choice) {
  return [choice?.effects, choice?.fx, ...(choice?.outcomes || choice?.out || []).map((outcome) => outcome.effects || outcome.fx)].filter(Boolean);
}

function eventPressure(event) {
  const choices = event.choices || [];
  if (!choices.length) return { danger: false, relief: false };
  let dangerous = 0;
  let restorative = 0;
  for (const choice of choices) {
    const effects = choiceEffects(choice);
    if (choice.startDungeon || effects.some((fx) => (fx.health || 0) <= -8 || (fx.sanity || 0) <= -10 || (fx.heat || 0) >= 12 || (fx.taboo || 0) > 0)) dangerous++;
    if (effects.some((fx) => (fx.health || 0) >= 5 || (fx.sanity || 0) >= 5) &&
        !effects.some((fx) => (fx.health || 0) < 0 || (fx.sanity || 0) < 0)) restorative++;
  }
  return { danger: dangerous > choices.length / 2, relief: restorative > choices.length / 2 };
}

/** Normalized event family prefix used for per-life diversity dampening (AI-3). */
export function eventFamily(eventOrId) {
  const id = typeof eventOrId === 'string' ? eventOrId : String(eventOrId?.id || '');
  if (id.startsWith('ch_exp_')) return 'ch_exp';
  if (id.startsWith('m_lineage_')) return 'lineage';
  if (id.startsWith('outcast_arc_')) return 'outcast';
  const head = id.split('_')[0];
  if (['ch', 'ch2', 'child'].includes(head)) return 'childhood';
  return head || 'general';
}

/** Habit ("Nature" motif) challenged by an existing event, if any (AI-5). */
export function habitChallengeForEvent(event) {
  if (!event) return null;
  if (event.challengeHabit) return event.challengeHabit;
  const tag = (event.tags || []).find((entry) => typeof entry === 'string' && entry.startsWith('challenge:'));
  if (tag) return tag.slice(10);
  return HABIT_CHALLENGE_BY_EVENT[event.id] || null;
}

export function directorTags(event) {
  const tags = new Set(event.tags || []);
  const prefix = String(event.id || '').split('_')[0];
  const route = ROUTE_PREFIX[prefix];
  if (route) tags.add(`route:${route}`);
  if (event.need?.finger) tags.add(`finger:${String(event.need.finger).toLowerCase()}`);
  if (event.need?.npc || event.keepRole || /\{(?:spouse|partner|friend|mentor|parentName)\}/.test(event.vi || '')) tags.add('npc');
  if (event.causalOnly || event.isCausalCallback || event.id?.startsWith('csq_')) tags.add('causal');
  if (event.regions?.length || event.need?.regionId || event.need?.regions?.length) tags.add('location');
  const pressure = eventPressure(event);
  if (pressure.danger || DANGER_PREFIX.has(prefix)) tags.add('danger');
  if (pressure.relief || RELIEF_PREFIX.has(prefix) || prefix === 'econ') tags.add('relief');
  if (event.legacy || (event.age?.[0] ?? 0) >= 55 || /^(?:elder_|twilight_|color_long_|color_quiet_|color_last_|finger_long_|finger_seat_|wing_apex_)/.test(event.id || '') || /kế nhiệm|kế vị|di sản|trao lại|hồ sơ đời/.test(event.vi || '')) {
    tags.add('legacy');
  }
  const challengeHabit = habitChallengeForEvent(event);
  if (challengeHabit) tags.add(`challenge:${challengeHabit}`);
  return [...tags];
}

/** Intrinsic narrative intensity [0.12..0.95] of an event for intensity-curve pacing (AI-3). */
export function eventIntensity(event) {
  if (!event) return 0.45;
  // directorTags already merges authored tags; reading event.tags alone would miss derived danger/relief
  const tags = directorTags(event);
  let score = 0.46;
  if (tags.includes('danger')) score = 0.80;
  else if (tags.includes('relief')) score = 0.20;
  else if (tags.includes('legacy')) score = 0.44;
  else if (tags.includes('causal')) score = 0.58;

  const choices = event.choices || [];
  let maxRisk = 0;
  for (const choice of choices) {
    if (choice.startDungeon) maxRisk = Math.max(maxRisk, 0.25);
    for (const fx of choiceEffects(choice)) {
      if ((fx.health || 0) <= -14 || (fx.sanity || 0) <= -15 || (fx.taboo || 0) > 0) maxRisk = Math.max(maxRisk, 0.14);
      else if ((fx.heat || 0) >= 15) maxRisk = Math.max(maxRisk, 0.08);
    }
  }
  return clamp(Math.round((score + maxRisk) * 100) / 100, 0.12, 0.95);
}

/** Target narrative intensity curve across the four life stages (AI-3). */
export function stageTargetIntensity(age, careerAge = 18) {
  const a = clamp(age ?? 0, 0, 110);
  if (a < careerAge) {
    const t = a / Math.max(1, careerAge);
    return Math.round((0.22 + t * 0.14) * 100) / 100;
  }
  if (a < 35) {
    const t = (a - careerAge) / Math.max(1, 35 - careerAge);
    return Math.round((0.35 + t * 0.21) * 100) / 100;
  }
  if (a < 60) {
    const dist = Math.abs(a - 46) / 14;
    return Math.round((0.76 - dist * 0.10) * 100) / 100;
  }
  const t = clamp((a - 60) / 25, 0, 1);
  return Math.round((0.50 - t * 0.16) * 100) / 100;
}

/** Current + upcoming lookahead intensity estimate from recent beats, tension and pending threads. */
export function actualLifeIntensity(char, weaver) {
  const age = char?.age || 0;
  const recent = (weaver?.recentBeats || []).filter((beat) => age - beat.age <= 6).slice(-4);
  let beatAvg = null;
  if (recent.length > 0) {
    let sum = 0;
    let totalW = 0;
    recent.forEach((beat, idx) => {
      const w = idx + 1;
      const bInt = beat.intensity ?? (beat.tags?.includes('danger') ? 0.8 : beat.tags?.includes('relief') ? 0.2 : 0.48);
      sum += bInt * w;
      totalW += w;
    });
    beatAvg = sum / totalW;
  }
  const tensionNorm = clamp((weaver?.tensionScore ?? 20) / 100, 0, 1);
  const dueSoon = (weaver?.pendingThreads || []).filter((t) => !t.fulfilled && t.triggerAge >= age && t.triggerAge <= age + 3).length;
  const threadForecast = Math.min(0.20, dueSoon * 0.08);
  const health = char?.stats?.health ?? char?.health ?? 50;
  const sanity = char?.stats?.sanity ?? char?.sanity ?? 50;
  const distress = Math.max(health < 40 ? (40 - health) / 100 : 0, sanity < 35 ? (35 - sanity) / 100 : 0);
  const base = beatAvg != null ? beatAvg * 0.65 + tensionNorm * 0.35 : tensionNorm * 0.6 + 0.15;
  return clamp(Math.round((base + threadForecast + distress) * 100) / 100, 0.10, 0.98);
}

/** Deterministic habit classification from an answered choice when explicit `motif` is omitted (AI-5). */
export function inferChoiceMotifs(choice, outcome = null, event = null) {
  const sampleOut = outcome || (choice?.out || choice?.outcomes)?.[0] || null;
  const explicit = {};
  for (const src of [choice, outcome]) {
    if (src?.motif && typeof src.motif === 'object') {
      for (const [k, v] of Object.entries(src.motif)) {
        if (v) explicit[k] = (explicit[k] || 0) + v;
      }
    }
  }
  if (Object.keys(explicit).length > 0) return explicit;

  const baseFx = choice?.fx || choice?.effects || {};
  const outFx = (sampleOut && sampleOut !== choice) ? (sampleOut.fx || sampleOut.effects || {}) : {};
  const fx = {};
  for (const k of new Set([...Object.keys(baseFx), ...Object.keys(outFx)])) {
    fx[k] = (baseFx[k] || 0) + (outFx[k] || 0);
  }
  const text = `${choice?.labelEn || ''} ${choice?.en || ''} ${choice?.labelVi || ''} ${choice?.vi || ''} ${event?.id || ''}`.toLowerCase();
  const hasSeriousNpcCost = Boolean(choice?.favorCost || sampleOut?.favorCost) ||
    ((fx.health || 0) <= -6 || (fx.wealth || 0) <= -6 || (fx.sanity || 0) <= -6 || (fx.rep || 0) <= -3 || (fx.heat || 0) >= 4);
  let bondTotal = 0;
  for (const b of [choice?.bond, sampleOut && sampleOut !== choice ? sampleOut.bond : null]) {
    if (b && typeof b === 'object') {
      bondTotal += Object.values(b).reduce((s, v) => s + (v || 0), 0);
    }
  }

  if (choice?.startDungeon || sampleOut?.startDungeon || (fx.heat || 0) >= 5 ||
      ((fx.health || 0) <= -5 && /attack|kill|fight|ambush|raid|slay|purge|strike|shoot|duel|brawl|execute|slash|clash|force|threat|hunt|draw weapon|intimidat|tấn công|giết|chém|bắn|đánh|thanh trừng|xử|áp sát|vũ lực|phản kích|đe|ra tay/.test(text))) {
    return { violence: 1 };
  }
  if (/prescript|chỉ lệnh|định mệnh|the loom/.test(text) && /obey|follow|accept|tuân|nghe theo|làm theo/.test(text)) {
    return { faith: 1 };
  }
  if (((fx.wealth || 0) >= 4 && (bondTotal < 0 || (fx.rep || 0) < 0 || (fx.heat || 0) >= 2 || (fx.sanity || 0) <= -4)) ||
      /\b(bribe|embezz\w*|steal|extort\w*|hoard|blackmail\w*|sell out|pocket|skim\w*|ransom|demand extra|profit|smuggl\w*|overcharg\w*|swindl\w*|loot)\b|(?:^|[\s,.;:!?(\x22\x27\u201c])(hối lộ|biển thủ|trộm|ăn chặn|tống tiền|bán đứng|ôm tiền|đút túi|thu phí|món hời|kiếm chác)(?=$|[\s,.;:!?\)\u201d\x22\x27])/.test(text)) {
    return { greed: 1 };
  }
  if ((bondTotal >= 4 && (Boolean(choice?.favorCost || sampleOut?.favorCost) || (fx.health || 0) < 0 || (fx.wealth || 0) < 0 || (fx.sanity || 0) < 0 || (fx.rep || 0) < 0 || (fx.heat || 0) > 0 || (fx.network || 0) >= 2)) ||
      bondTotal >= 6 || choice?.npcQuest || sampleOut?.npcQuest ||
      /\b(swear|oath|stand by|vouch\w*|keep your word|stay with|cover for|shield\w*|repay|promise\w*|loyal\w*|side with|back .* up)\b|(?:^|[\s,.;:!?(\x22\x27\u201c])(thề|lời hứa|giữ lời|bảo lãnh|che chở|đứng về|giữ chữ tín|trả nghĩa|trả ơn|đồng hành|không bỏ rơi|giữ hẹn)(?=$|[\s,.;:!?\)\u201d\x22\x27])/.test(text)) {
    return { loyalty: 1 };
  }
  const hasMercyWord = /\b(spare|forgiv\w*|shelter|mercy|pardon|rescue|charity|donate|relieve|heal|bandag\w*|tend|console|comfort|defuse|help (?:them|him|her|the|a|an)|save (?:them|him|her|a|an))\b/.test(text) ||
      /(?:^|[\s,.;:!?(\x22\x27\u201c])(tha thứ|tha mạng|cứu|giúp|nhường|cho ăn|che giấu|mềm lòng|băng bó|chăm sóc|an ủi|san sẻ|đỡ dậy|thương xót|tha cho)(?=$|[\s,.;:!?\)\u201d\x22\x27])/.test(text);
  if (((fx.wealth || 0) < 0 && (bondTotal > 0 || hasMercyWord)) || hasMercyWord) {
    return { mercy: 1 };
  }
  return {};
}

/** A habit counts as settled only when it leads the runner-up by this much, not just when it passes a threshold. */
const HABIT_LEAD_MARGIN = 2;
const HABIT_INFER_MIN_AGE = 15;

/**
 * Records a choice's habit for AI-5 in `char.habits`.
 * Authored `motif` fields still go to `char.motifs`, which Nature (director.js) and the City
 * Blackboard read; inferred habits stay out of it so those systems keep their authored thresholds.
 */
export function recordChoiceMotif(char, sources = [], choice = null, event = null) {
  if (!char) return;
  const list = Array.isArray(sources) ? sources.filter(Boolean) : [];
  const motifs = { ...(char.motifs || {}) };
  const habits = { ...(char.habits || {}) };
  let addedExplicit = false;
  for (const src of list) {
    if (src?.motif && typeof src.motif === 'object') {
      for (const [k, v] of Object.entries(src.motif)) {
        if (v) {
          motifs[k] = (motifs[k] || 0) + v;
          habits[k] = (habits[k] || 0) + v;
          addedExplicit = true;
        }
      }
    }
  }
  // Childhood choices are not yet a settled adult habit; authored motifs above still count at any age
  if (!addedExplicit && choice && (char.age || 0) >= HABIT_INFER_MIN_AGE) {
    const outcome = list.length > 1 ? list[list.length - 1] : null;
    const inferred = inferChoiceMotifs(choice, outcome, event);
    // A habit is a choice made over something else: when every option carries the same motif, picking one says nothing
    const others = Array.isArray(event?.choices) ? event.choices.filter((c) => c && c !== choice) : null;
    for (const [k, v] of Object.entries(inferred)) {
      if (!v) continue;
      if (others && others.length && others.every((c) => inferChoiceMotifs(c, null, event)[k])) continue;
      habits[k] = (habits[k] || 0) + v;
    }
  }
  char.motifs = motifs;
  char.habits = habits;
}

/** Dominant settled habit: repeated >= `minScore` times and clearly ahead of the next habit (AI-5). */
export function dominantHabit(char, minScore = 3) {
  const entries = Object.entries(char?.habits || {})
    .filter(([k]) => CHALLENGE_HABITS.includes(k))
    .sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]));
  if (!entries.length || entries[0][1] < minScore) return null;
  const runnerUp = entries[1]?.[1] || 0;
  if (entries[0][1] - runnerUp < HABIT_LEAD_MARGIN) return null;
  return entries[0][0];
}

/** Returns the habit to challenge right now if the life is ready and under the 2-per-life cap. */
export function canTriggerHabitChallenge(char) {
  const minChallengeAge = Math.max(18, careerAgeOf(char));
  if (!char || char.childhoodMontage?.active || (char.age || 0) < minChallengeAge) return null;
  const done = char.habitChallenges || [];
  if (done.length >= MAX_HABIT_CHALLENGES_PER_LIFE) return null;
  const last = done[done.length - 1];
  if (last && (char.age || 0) - (last.age || 0) < HABIT_CHALLENGE_COOLDOWN_YEARS) return null;
  return dominantHabit(char, done.length === 0 ? 3 : 4);
}

/** Records that an event testing the active habit just occurred (capped at 2 per life). */
export function markHabitChallengeTriggered(char, event) {
  if (!char || !event) return null;
  const habit = habitChallengeForEvent(event);
  if (!habit) return null;
  const activeHabit = canTriggerHabitChallenge(char);
  if (activeHabit !== habit) return null;
  const done = char.habitChallenges || [];
  if (done.length >= MAX_HABIT_CHALLENGES_PER_LIFE || done.some((entry) => entry.eventId === event.id)) return null;
  const record = { habit, eventId: event.id, age: char.age || 0 };
  char.habitChallenges = [...done, record];
  return record;
}

export function rememberDirectorEvent(weaver, event, age) {
  const beat = { id: event.id, age, family: eventFamily(event), intensity: eventIntensity(event), tags: directorTags(event) };
  return [...(weaver.recentBeats || []), beat].slice(-8);
}

export function directorScore(event, char, weaver, baseUtility) {
  const tags = directorTags(event);
  const recent = (weaver.recentBeats || []).filter((beat) => (char.age || 0) - beat.age <= 5).slice(-4);
  const lastThree = recent.slice(-3);
  const dangerCount = lastThree.filter((beat) => beat.tags?.includes('danger')).length;
  const reliefCount = lastThree.filter((beat) => beat.tags?.includes('relief')).length;
  const health = char.stats?.health ?? char.health ?? 50;
  const sanity = char.stats?.sanity ?? char.sanity ?? 50;
  let mult = 1;
  const reasons = [];
  const reasonsEn = [];

  if (tags.includes('danger') && dangerCount >= 2) {
    mult *= 0.72;
    reasons.push('Hai biến cố nặng gần đây'); reasonsEn.push('Two heavy blows close together');
  } else if (tags.includes('danger') && reliefCount >= 2 && health >= 55 && sanity >= 45) {
    mult *= 1.25;
    reasons.push('Sau một quãng yên ắng'); reasonsEn.push('After a quiet stretch');
  }
  if (tags.includes('danger') && (health < 35 || sanity < 30)) {
    mult *= 0.78;
    reasons.push('Thương tích hoặc kiệt sức'); reasonsEn.push('Wounded or exhausted');
  }
  if (tags.includes('relief') && (dangerCount >= 2 || health < 35 || sanity < 30)) {
    mult *= 1.3;
    reasons.push('Cần một khoảng lặng'); reasonsEn.push('Needs a breather');
  }

  const routeTag = tags.find((tag) => tag.startsWith('route:'));
  const sameRouteRecent = routeTag ? lastThree.filter((beat) => beat.tags?.includes(routeTag)).length : 0;
  if (sameRouteRecent >= 2) {
    mult *= 0.82;
    reasons.push('Nghề này vừa xuất hiện liên tiếp'); reasonsEn.push('This trade just came up twice');
  }
  if (tags.includes('npc') && lastThree.filter((beat) => beat.tags?.includes('npc')).length === 0) {
    mult *= 1.18;
    reasons.push('Lâu rồi chưa có cảnh với người quen'); reasonsEn.push('No scene with a familiar face for a while');
  }
  const pending = (weaver.pendingThreads || []).some((thread) => !thread.fulfilled && thread.eventId === event.id);
  if (pending) {
    mult *= 1.25;
    reasons.push('Mạch cũ đang mở'); reasonsEn.push('An old thread is open');
  }

  // Elder pacing rule (Đợt 140.5): after 60, soften back-to-back danger and favor legacy/relief beats,
  // while keeping occasional legacy-threatening danger if the last 5 years had none
  if ((char.age || 0) >= 60) {
    const dangerInFive = recent.filter((beat) => beat.tags?.includes('danger')).length;
    if (tags.includes('legacy')) {
      mult *= 1.28;
      reasons.push('Chuyện di sản tuổi xế chiều'); reasonsEn.push('Late-life legacy beat');
    }
    if (tags.includes('relief')) {
      mult *= 1.16;
      reasons.push('Nhịp sống chậm lại ở tuổi già'); reasonsEn.push('Slower cadence in old age');
    }
    if (tags.includes('danger')) {
      if (dangerInFive >= 1) {
        mult *= 0.76;
        reasons.push('Giảm bớt hiểm họa dồn dập tuổi già'); reasonsEn.push('Fewer back-to-back hazards in old age');
      } else if (tags.includes('legacy')) {
        mult *= 1.15;
        reasons.push('Thử thách nhắm vào di sản'); reasonsEn.push('A threat to what you built');
      }
    }
  }

  // AI-3: Lookahead stage intensity curve + bloodline novelty + repeat/family dampening (bounded extra factor)
  let aiMult = 1;
  const age = char.age || 0;
  const careerAge = careerAgeOf(char);
  const lookaheadTarget = stageTargetIntensity(age, careerAge) * 0.7 + stageTargetIntensity(age + 3, careerAge) * 0.3;
  const actualIntensity = actualLifeIntensity(char, weaver);
  const gap = lookaheadTarget - actualIntensity;
  if (Math.abs(gap) >= 0.06) {
    const desiredIntensity = clamp(lookaheadTarget + gap * 0.55, 0.14, 0.92);
    const evIntensity = eventIntensity(event);
    const closeness = clamp(1 - Math.abs(evIntensity - desiredIntensity), 0, 1);
    const curveFactor = 0.84 + closeness * 0.40;
    aiMult *= curveFactor;
    if (curveFactor >= 1.14) {
      reasons.push(gap > 0 ? 'Đường cong giai đoạn đẩy cao nhịp kịch tính' : 'Đường cong giai đoạn hạ nhịp lấy hơi');
      reasonsEn.push(gap > 0 ? 'Stage curve lifts dramatic stakes' : 'Stage curve eases off intensity');
    }
  }

  const bloodlineKnown = char.bloodlineSeenEvents?.length ? char.bloodlineSeenEvents : (char.discoverySeen || []);
  if (bloodlineKnown.length > 0) {
    if (!bloodlineKnown.includes(event.id)) {
      aiMult *= 1.24;
      reasons.push('Chưa từng gặp trong dòng họ'); reasonsEn.push('Unseen across the bloodline');
    } else {
      aiMult *= 0.82;
    }
  }

  const drawCount = Math.max(weaver?.drawCounts?.[event.id] || 0, (char.seenEvents || []).includes(event.id) ? 1 : 0);
  if (drawCount > 0) {
    aiMult *= Math.max(0.55, Math.pow(0.62, drawCount));
    reasons.push('Đã lặp lại trong đời này'); reasonsEn.push('Already drawn this life');
  }

  const fam = eventFamily(event);
  const recentSameFamily = (weaver?.recentBeats || []).slice(-5).filter((b) => (b.family || eventFamily(b.id)) === fam).length;
  const lifeFamilyDraws = weaver?.familyCounts?.[fam] || 0;
  if (recentSameFamily >= 1) aiMult *= Math.max(0.68, 0.84 - recentSameFamily * 0.10);
  if (lifeFamilyDraws >= 3) aiMult *= 0.82;

  // AI-5: Prioritize events that confront a clearly formed player habit (<= 2 per life)
  const challengeReadyHabit = canTriggerHabitChallenge(char);
  const eventChallengeHabit = habitChallengeForEvent(event);
  if (challengeReadyHabit && eventChallengeHabit === challengeReadyHabit &&
      !(char.habitChallenges || []).some((entry) => entry.eventId === event.id)) {
    aiMult *= 1.38;
    const habitLabel = HABIT_CHALLENGE_LABELS[challengeReadyHabit] || { vi: challengeReadyHabit, en: challengeReadyHabit };
    reasons.push(`Xu hướng ${habitLabel.vi} sắp phải trả giá`);
    reasonsEn.push(`Your habit of ${habitLabel.en} carries a price`);
  }

  const totalMult = clamp(mult * clamp(aiMult, 0.55, 1.45), 0.55, 1.45);
  return {
    tags,
    multiplier: totalMult,
    utility: Math.round(Math.max(1, baseUtility) * totalMult * 10) / 10,
    reasons,
    reasonsEn
  };
}

export function drawDirectorCandidate(candidates, roll) {
  const top = candidates.slice(0, Math.min(24, candidates.length));
  if (!top.length) return null;
  // 0.5 flattens the top 24 enough for variety yet keeps pacing multipliers (relief x1.3 -> x1.14) meaningful; 200 door lives beat 0.35 on reach
  const weight = (item) => Math.pow(Math.max(1, item.utility), 0.5);
  const total = top.reduce((sum, item) => sum + weight(item), 0);
  let remaining = clamp(roll, 0, 0.999999999) * total;
  for (const item of top) {
    remaining -= weight(item);
    if (remaining < 0) return item;
  }
  return top[top.length - 1];
}
