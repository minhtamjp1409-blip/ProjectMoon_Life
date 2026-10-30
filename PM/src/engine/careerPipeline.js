import { npcIsActive } from './eventConditions.js';
/**
 * Project Moon Universe - Career Progression, Distortion Lifecycle & Inheritance Engine
 * Enforces strict, canonical milestones:
 * - Fixer: Grade 9 -> 8 -> 7 -> 6 -> 5 -> 4 -> 3 -> 2 -> 1 -> Color Fixer (NO grade skipping!).
 * - Distortion: Complete career decoupling, suppression waves, Carmen communion.
 * - Succession: Biological child vs Apprentice vs Scavenger inheritor.
 * - Inventory & Survival Tech (K Corp Ampoule auto-revive).
 */

import { SEASONS } from './gameEngine.js';
import { getItemById } from '../data/itemsData.js';
import { contractRouteOf } from '../data/careerContracts.js';
import { laneContractMods } from './affiliation.js';
import { egoEdge, hasAwakenedEgo } from './egoEdge.js';
import { annualTrainingBonus } from './annualPlan.js';
import GATES from '../data/careerGates.json' with { type: 'json' };

// Promotion gates come from careerGates.json, the same file the backend embeds
const fixerGate = (grade) => GATES.fixer.find((row) => row.grade === grade);
const fingerGate = (rank) => GATES.finger.find((row) => row.rank === rank);
const wingGate = (rank) => GATES.wing.find((row) => row.rank === rank);

export const FIXER_LADDER = [
  {
    grade: 8,
    meritReq: fixerGate(8).merit,
    repReq: fixerGate(8).rep,
    titleVi: 'Kỳ thi Thăng cấp Fixer Grade 8 (Hana Section 6)',
    titleEn: 'Grade 8 Fixer Promotion Exam (Hana Section 6)',
    descVi: 'Hana Association Section 6 gửi thông báo triệu tập: Bạn đã tích lũy đủ chiến tích ban đầu ở Backstreets. Hãy làm thủ tục kiểm tra năng lực để tháo bỏ tấm thẻ Grade 9 tập sự.',
    descEn: 'Hana Association Section 6 issues your summons: You have accumulated sufficient Backstreet merits to sit for the Grade 8 competency evaluation.'
  },
  {
    grade: 7,
    meritReq: fixerGate(7).merit,
    repReq: fixerGate(7).rep,
    titleVi: 'Khảo sát Gia nhập Văn phòng (Fixer Grade 7)',
    titleEn: 'Office Affiliation Certification (Grade 7 Fixer)',
    descVi: 'Các Văn phòng Fixer độc lập và phân hội Zwei bắt đầu để mắt đến bạn. Hana yêu cầu bạn vượt qua bài thẩm định Grade 7 để nhận thù lao tiêu chuẩn.',
    descEn: 'Independent Fixer Offices and Zwei sub-branches take note of your record. Complete the Grade 7 certification for standard commission rates.'
  },
  {
    grade: 6,
    meritReq: fixerGate(6).merit,
    repReq: fixerGate(6).rep,
    titleVi: 'Bổ nhiệm Fixer Thực chiến (Grade 6)',
    titleEn: 'Field Combat Operative Commission (Grade 6)',
    descVi: 'Vượt qua vô số vụ huyết chiến Backstreets và thanh trừng chuột cống, bạn được cấp chứng chỉ Fixer Grade 6, đủ tư cách chỉ huy đội nhỏ đối đầu hiểm họa Urban Legend.',
    descEn: 'Surviving dozens of lethal clashes, you are granted Grade 6 status, authorized to lead tactical strike cells against Urban Legend threats.'
  },
  {
    grade: 5,
    meritReq: fixerGate(5).merit,
    repReq: fixerGate(5).rep,
    titleVi: 'Đại hội Thăng cấp Trung cấp (Fixer Grade 5)',
    titleEn: 'Mid-Tier Rank Exam (Grade 5 Fixer)',
    descVi: 'Tại ngưỡng Grade 5, bạn bước vào hàng ngũ Fixer kỳ cựu. Hana Association yêu cầu bài kiểm tra đối kháng thực địa với các Capo cấp thấp của Syndicate.',
    descEn: 'Grade 5 marks entry into the veteran echelon. Hana requires verified field combat suppression against syndicate Capos.'
  },
  {
    grade: 4,
    meritReq: fixerGate(4).merit,
    repReq: fixerGate(4).rep,
    titleVi: 'Phó Chỉ Huy Section (Fixer Grade 4)',
    titleEn: 'Section Vice-Captaincy (Grade 4 Fixer)',
    descVi: 'Đạt Grade 4, tên tuổi bạn bắt đầu được các Hiệp hội lớn (Shi, Liu, Seven, Dieci) săn đón. Mức phí ủy thác tăng vọt, đối mặt trực diện hiểm họa Urban Plague.',
    descEn: 'At Grade 4, major Associations scout your talent. Contract bounties surge as you deploy directly against Urban Plague threats.'
  },
  {
    grade: 3,
    meritReq: fixerGate(3).merit,
    repReq: fixerGate(3).rep,
    titleVi: 'Chuyên gia Cấp cao (Fixer Grade 3)',
    titleEn: 'Senior Specialist Commission (Grade 3 Fixer)',
    descVi: 'Chỉ 3% số Fixer ở The City đạt tới Grade 3. Bạn đủ thẩm quyền tiếp cận vũ khí Workshop cấp cao và điều tra các vụ án bí mật của Wing.',
    descEn: 'Only the top 3% of Fixers reach Grade 3. You gain access to master-grade Workshop gear and classified Wing investigations.'
  },
  {
    grade: 2,
    meritReq: fixerGate(2).merit,
    repReq: fixerGate(2).rep,
    titleVi: 'Át Chủ Bài Section 1 (Fixer Grade 2)',
    titleEn: 'Section 1 Ace Operative (Grade 2 Fixer)',
    descVi: 'Bạn là cánh tay phải của các Đội trưởng Section 1. Mọi bước đi đều phải đối đầu với quái vật Urban Nightmare và những bản án tử hình của The Head.',
    descEn: 'The right hand of Section 1 Directors. Your missions confront Urban Nightmare horrors and death warrants issued by The Head.'
  },
  {
    grade: 1,
    meritReq: fixerGate(1).merit,
    repReq: fixerGate(1).rep,
    titleVi: 'Đỉnh cao Fixer: Đại Khảo Hạch Grade 1 (Hana Supreme)',
    titleEn: 'Apex of Fixers: Grade 1 Supreme Evaluation',
    descVi: 'Bạn đứng trên đỉnh cao của giới Fixer toàn The City. Hội đồng Hana đích thân ký quyết định công nhận Grade 1 — bước đệm cuối cùng trước khi trở thành huyền thoại Color.',
    descEn: 'You stand atop the entire City’s Fixer hierarchy. Hana’s Supreme Board signs your Grade 1 credential — the final threshold before Color designation.'
  }
];

/**
 * Checks and returns the NEXT available Fixer promotion exam.
 * Guarantees NO skipping grades: must proceed strictly 9 -> 8 -> 7 -> ... -> 1.
 */
export function getNextFixerPromotion(char) {
  if (char.job !== 'Fixer' || char.flags.includes('Distorted')) return null;
  const curGrade = char.fixerGrade ?? 9;
  if (curGrade <= 1) return null; // Grade 1 is evaluated separately for Color trial

  const nextStep = FIXER_LADDER.find((step) => step.grade === curGrade - 1);
  if (!nextStep) return null;

  const curRep = (char.stats?.rep ?? char.rep) || 0;
  const isEligible = (char.merit || 0) >= nextStep.meritReq && curRep >= nextStep.repReq;

  return {
    ...nextStep,
    isEligible,
    currentMerit: char.merit || 0,
    currentRep: curRep
  };
}

export function fixerPromotionOfferChance(char, step = getNextFixerPromotion(char)) {
  if (!step?.isEligible) return 0;
  const extraRep = Math.max(0, step.currentRep - step.repReq);
  const extraMerit = Math.max(0, step.currentMerit - step.meritReq);
  return Math.min(0.9, 0.55 + Math.min(0.35, extraRep * 0.01 + extraMerit * 0.003));
}

export function fixerContractOfferChance(char) {
  if (char.job !== 'Fixer' || char.flags?.includes('Distorted')) return 0;
  const step = getNextFixerPromotion(char) || (char.fixerGrade === 1 && !char.flags?.includes('ColorFixer')
    ? { repReq: colorRequirementFor(char).rep, meritReq: colorRequirementFor(char).merit }
    : null);
  if (!step) return 0.42;
  const repGap = Math.max(0, step.repReq - (char.stats?.rep ?? char.rep ?? 0));
  const meritGap = Math.max(0, step.meritReq - (char.merit || 0));
  const repChance = repGap > 0 ? 0.54 + 0.18 * Math.min(1, repGap / Math.max(10, step.repReq * 0.25)) : 0.42;
  const meritChance = meritGap > 0 ? 0.5 + 0.1 * Math.min(1, meritGap / Math.max(15, step.meritReq * 0.25)) : 0.42;
  return Math.max(repChance, meritChance);
}

/**
 * How likely a contract is offered this year for any career that has them. A Fixer keeps the
 * promotion-gap curve above; the others lean on Merit, because Merit is what their ladders gate on.
 */
export function contractOfferChance(char) {
  const route = contractRouteOf(char);
  if (!route) return 0;
  if (route === 'fixer') {
    // Work comes through a badge: an Association or Office hands it out, a lone Fixer finds it
    const mods = laneContractMods(char, char.fixerGrade ?? 9);
    return Math.min(0.85, Math.max(0, fixerContractOfferChance(char) * mods.offerMult + mods.offerDelta));
  }
  const step = getOtherCareerPromotion(char);
  if (!step) return 0.5;
  const meritGap = Math.max(0, step.meritReq - step.currentMerit);
  if (meritGap <= 0) return 0.5;
  return 0.5 + 0.12 * Math.min(1, meritGap / Math.max(15, step.meritReq * 0.25));
}

export function fixerPromotionSuccessChance(char, targetGrade) {
  const step = FIXER_LADDER.find((entry) => entry.grade === targetGrade);
  if (!step) return 0;
  const extraRep = Math.max(0, char.stats.rep - step.repReq);
  const extraMerit = Math.max(0, (char.merit || 0) - step.meritReq);
  const healthBonus = Math.max(-0.08, Math.min(0.08, (char.stats.health - 55) * 0.002));
  const edge = egoEdge(char);
  // Each failed attempt at this band is entered in Hana's report and makes the next one a little easier
  const retryBonus = Math.min(RETRY_BONUS_CAP, (char.fixerExamFailures?.[targetGrade] || 0) * RETRY_BONUS_STEP);
  return Math.min(0.85 + edge + retryBonus, Math.max(0.2, 0.8 - (8 - targetGrade) * 0.065 + extraRep * 0.003 + extraMerit * 0.0008 + healthBonus + edge + retryBonus + annualTrainingBonus(char)));
}

const RETRY_BONUS_STEP = 0.04;
const RETRY_BONUS_CAP = 0.12;

/** Share of Merit above the new Grade's threshold that survives a promotion. The top two Grades keep more. */
export const meritRetentionAfterPromotion = (newGrade) => (newGrade <= 2 ? 0.45 : 0.25);

export const isFixerPromotionChoice = (choice, char) =>
  char?.job === 'Fixer' && choice?.setFixerGrade != null && choice.setFixerGrade < (char.fixerGrade ?? 9);

export function fixerPromotionFailureEffects(targetGrade) {
  const table = {
    8: { health: -8, wealth: -6, sanity: -6 },
    7: { health: -12, wealth: -10, sanity: -8 },
    6: { health: -18, wealth: -15, sanity: -12 },
    5: { health: -24, wealth: -22, sanity: -15 },
    4: { health: -32, wealth: -30, sanity: -20 },
    3: { health: -40, wealth: -38, sanity: -25 },
    2: { health: -48, wealth: -45, sanity: -28 },
    1: { health: -58, wealth: -55, sanity: -35 }
  };
  return table[targetGrade] || { health: -20, wealth: -20, sanity: -15 };
}

/**
 * Evaluates whether Color Fixer trial can be initiated.
 * Strictly requires Grade 1, Merit >= 210, Rep >= 100, E.G.O Awakening / Resonance >= 50,
 * and surviving an Urban Nightmare / Star of the City ordeal.
 */
export const COLOR_FIXER_REQ = { merit: GATES.color.merit, rep: GATES.color.rep };

// Hana draws its Colors from Grade 1. A Fixer whose E.G.O has taken shape is already past what the
// grading system measures, so Hana looks sooner; the trial itself is the same and can still be failed.
export const COLOR_FIXER_REQ_EGO = { merit: GATES.color.ego.merit, rep: GATES.color.ego.rep, age: GATES.color.ego.age };

// Prodigy Fast-Track: extraordinary feats / early E.G.O allow Color ascension between age 26 and 40
export const COLOR_FIXER_REQ_PRODIGY = { merit: GATES.color.prodigy.merit, rep: GATES.color.prodigy.rep, age: GATES.color.prodigy.age };

// The E.G.O road to Color. Hana does not wait for Grade 1 when the wielder's own weapon already outruns the grading
// scale: Grade 4 or better, an Awakened E.G.O that has settled (Resonance 55+), and a record Hana can defend.
export const COLOR_FIXER_REQ_EGO_ROAD = { merit: GATES.color.egoRoad.merit, rep: GATES.color.egoRoad.rep, age: GATES.color.egoRoad.age };

// Every number above comes from career_gates.json, which the backend reads too. The backend cannot see the
// inventory, so the client sends this one fact (a relic or a forged weapon in the pack) with the plan request.
export const hasColorRelic = (char) => (char?.inventory || []).some((it) => String(it?.id || it).startsWith('rel_') || String(it?.id || it).startsWith('wpn_'));

export const isColorEgoRoadEligible = (char) => {
  const road = GATES.color.egoRoad;
  if (!char || char.flags?.includes('Distorted') || char.flags?.includes('ColorFixer')) return false;
  if (char.job !== 'Fixer' && char.job !== 'Color Fixer') return false;
  if (char.age < road.age || char.age > GATES.color.oldestAge) return false;
  if (!road.grades.includes(char.fixerGrade) || !hasAwakenedEgo(char)) return false;
  const rep = (char.stats?.rep ?? char.rep) || 0;
  return rep >= road.rep && (char.merit || 0) >= road.merit && (char.resonance || 0) >= road.resonance;
};

export const isColorProdigyEligible = (char) => {
  const prodigy = GATES.color.prodigy;
  if (!char || char.flags?.includes('Distorted') || char.flags?.includes('ColorFixer')) return false;
  if (char.job !== 'Fixer' && char.job !== 'Color Fixer') return false;
  if (char.age < prodigy.age || char.age > GATES.color.oldestAge) return false;
  if (isColorEgoRoadEligible(char)) return true;
  if (char.age > prodigy.latestAge) return false;
  if (!prodigy.grades.includes(char.fixerGrade)) return false;

  const rep = (char.stats?.rep ?? char.rep) || 0;
  const merit = char.merit || 0;
  const flags = char.flags || [];
  const hasFeat = flags.some((f) => prodigy.feats.includes(f));

  // Feat / Impossible Trial Conqueror (all grades 1-3)
  if ((hasColorRelic(char) || hasFeat || (char.resonance || 0) >= prodigy.resonance) && rep >= prodigy.rep && merit >= prodigy.merit) return true;

  // Track A: Awakened E.G.O Prodigy (specifically for exceptional under-grade Fixers Grade 2-3)
  const track = prodigy.egoTrack;
  if (track.grades.includes(char.fixerGrade) && hasAwakenedEgo(char) && rep >= track.rep && merit >= track.merit) return true;

  return false;
};

export const colorRequirementFor = (char) => {
  if (isColorEgoRoadEligible(char)) return COLOR_FIXER_REQ_EGO_ROAD;
  if (isColorProdigyEligible(char)) return COLOR_FIXER_REQ_PRODIGY;
  return hasAwakenedEgo(char) ? COLOR_FIXER_REQ_EGO : { ...COLOR_FIXER_REQ, age: GATES.color.age };
};

export function checkColorFixerReadiness(char) {
  const isProdigy = isColorProdigyEligible(char);
  const req = colorRequirementFor(char);
  const targetMerit = req.merit;
  const targetRep = req.rep;
  const targetAge = req.age;
  if ((char.job !== 'Fixer' && char.job !== 'Color Fixer') || char.flags.includes('Distorted') || char.flags.includes('ColorFixer')) {
    return { ready: false, reason: 'Chưa đủ điều kiện', targetMerit, targetRep };
  }
  if (char.fixerGrade !== 1 && !isProdigy) {
    return { ready: false, reason: 'Bắt buộc phải là Fixer Grade 1 (hoặc đạt chuẩn Thần Đồng Đặc Cách)', targetMerit, targetRep };
  }
  if (char.age < targetAge) return { ready: false, reason: `Hana yêu cầu hồ sơ hành nghề lâu năm (từ ${targetAge} tuổi)`, targetMerit, targetRep, targetAge };
  const curRep = (char.stats?.rep ?? char.rep) || 0;
  const meritOk = (char.merit || 0) >= targetMerit;
  const repOk = curRep >= targetRep;
  const egoOrResonance = true;

  return {
    ready: meritOk && repOk && egoOrResonance,
    isProdigy,
    meritOk,
    repOk,
    egoOrResonance,
    targetMerit,
    targetRep,
    targetAge
  };
}

export const FINGER_LADDERS = {
  Thumb: [
    { rank: 1, meritReq: fingerGate(1).merit, repReq: fingerGate(1).rep, eventId: 'syn_thumb_promo_capo', eventIds: ['syn_thumb_promo_capo', 'syn_thumb_promo_capo_convoy', 'syn_thumb_promo_capo_ledger'], titleVi: 'Thăng cấp Capo (The Thumb)', titleEn: 'Thumb Capo Promotion Trial' },
    { rank: 2, meritReq: fingerGate(2).merit, repReq: fingerGate(2).rep, eventId: 'syn_thumb_promo_sottocapo', eventIds: ['syn_thumb_promo_sottocapo', 'syn_thumb_promo_sottocapo_armory', 'syn_thumb_promo_sottocapo_envoy'], titleVi: 'Khảo thí Sottocapo (The Thumb)', titleEn: 'Thumb Sottocapo Promotion Trial' },
    { rank: 3, meritReq: fingerGate(3).merit, repReq: fingerGate(3).rep, eventId: 'syn_thumb_underboss_purge', eventIds: ['syn_thumb_underboss_purge', 'syn_thumb_apex_godfather', 'syn_thumb_underboss_succession'], titleVi: 'Đại Lễ Tuyên Thệ Underboss (The Thumb)', titleEn: 'Thumb Underboss Pinnacle Trial' }
  ],
  Index: [
    { rank: 1, meritReq: fingerGate(1).merit, repReq: fingerGate(1).rep, eventId: 'syn_index_promo_messenger', eventIds: ['syn_index_promo_messenger', 'syn_index_promo_messenger_conduit', 'syn_index_promo_messenger_night'], titleVi: 'Sứ Giả Chỉ Lệnh (Index Messenger Trial)', titleEn: 'Index Messenger Promotion Trial' },
    { rank: 2, meritReq: fingerGate(2).merit, repReq: fingerGate(2).rep, eventId: 'syn_index_promo_proxy', eventIds: ['syn_index_promo_proxy', 'syn_index_promo_proxy_sword', 'syn_index_promo_proxy_silence'], titleVi: 'Đại Kiếm Proxy (Index Proxy Trial)', titleEn: 'Index Proxy Promotion Trial' },
    { rank: 3, meritReq: fingerGate(3).merit, repReq: fingerGate(3).rep, eventId: 'syn_index_weaver_prescript', eventIds: ['syn_index_weaver_prescript', 'syn_index_grand_proxy_flow', 'syn_index_weaver_blank'], titleVi: 'Ý Chỉ Thần Dệt (Index Weaver Pinnacle)', titleEn: 'Index Weaver Pinnacle Trial' }
  ],
  Middle: [
    { rank: 1, meritReq: fingerGate(1).merit, repReq: fingerGate(1).rep, eventId: 'syn_middle_promo_big_sibling', eventIds: ['syn_middle_promo_big_sibling', 'syn_middle_promo_big_sibling_rescue', 'syn_middle_promo_big_sibling_dinner'], titleVi: 'Lễ Khắc Xích Vàng: Big Sibling (The Middle)', titleEn: 'Middle Big Sibling Promotion Trial' },
    { rank: 2, meritReq: fingerGate(2).merit, repReq: fingerGate(2).rep, eventId: 'syn_middle_promo_great_elder', eventIds: ['syn_middle_promo_great_elder', 'syn_middle_promo_great_elder_clan', 'syn_middle_promo_great_elder_ledger'], titleVi: 'Đại Trưởng Lão (Middle Great Elder)', titleEn: 'Middle Great Elder Promotion Trial' },
    { rank: 3, meritReq: fingerGate(3).merit, repReq: fingerGate(3).rep, eventId: 'syn_middle_great_brother_vendetta', eventIds: ['syn_middle_great_brother_vendetta', 'syn_middle_apex_patriarch', 'syn_middle_great_sibling_forgiveness'], titleVi: 'Đại Huyết Nợ: Great Brother/Sister (The Middle)', titleEn: 'Middle Great Sibling Pinnacle Trial' }
  ],
  Ring: [
    { rank: 1, meritReq: fingerGate(1).merit, repReq: fingerGate(1).rep, eventId: 'syn_ring_promo_docent', eventIds: ['syn_ring_promo_docent', 'syn_ring_promo_docent_gallery', 'syn_ring_promo_docent_restoration'], titleVi: 'Triển Lãm Giải Phẫu: Docent (The Ring)', titleEn: 'Ring Docent Promotion Trial' },
    { rank: 2, meritReq: fingerGate(2).merit, repReq: fingerGate(2).rep, eventId: 'syn_ring_promo_maestro', eventIds: ['syn_ring_promo_maestro', 'syn_ring_promo_maestro_symphony', 'syn_ring_maestro_gallery'], titleVi: 'Đại Nhạc Trưởng: Maestro (The Ring)', titleEn: 'Ring Maestro Promotion Trial' },
    { rank: 3, meritReq: fingerGate(3).merit, repReq: fingerGate(3).rep, eventId: 'syn_ring_curator_monument', eventIds: ['syn_ring_curator_monument', 'syn_ring_apex_grand_master', 'syn_ring_curator_unsigned'], titleVi: 'Đại Quản Trưởng: Grand Curator (The Ring)', titleEn: 'Ring Grand Curator Pinnacle Trial' }
  ],
  Pinky: [
    { rank: 1, meritReq: fingerGate(1).merit, repReq: fingerGate(1).rep, eventId: 'syn_pinky_promo_blade', eventIds: ['syn_pinky_promo_blade', 'syn_pinky_promo_blade_oath', 'syn_pinky_promo_blade_ferry'], titleVi: 'Lưỡi Đao Lập Thệ: Sworn Blade (The Pinky)', titleEn: 'Pinky Sworn Blade Promotion Trial' },
    { rank: 2, meritReq: fingerGate(2).merit, repReq: fingerGate(2).rep, eventId: 'syn_pinky_star_blade_pinnacle', eventIds: ['syn_pinky_star_blade_pinnacle', 'syn_pinky_promo_shadow_arbiter', 'pinky_star_blade_oath'], titleVi: 'Thiên Tinh: Star of the Sky (The Pinky)', titleEn: 'Pinky Star of the Sky Promotion Trial' },
    { rank: 3, meritReq: fingerGate(3).merit, repReq: fingerGate(3).rep, eventId: 'syn_pinky_promo_sovereign', eventIds: ['syn_pinky_promo_sovereign', 'syn_pinky_apex_monarch', 'syn_pinky_sovereign_empty_yard'], titleVi: 'Chúa Tể Ngón Út: Sovereign (The Pinky)', titleEn: 'Pinky Sovereign Pinnacle Trial' }
  ]
};

export function getNextFingerPromotion(char) {
  const isSyndicate = char.job === 'Syndicate' || (char.flags.includes('Distorted') && char.finger);
  if (!isSyndicate || !char.finger || char.flags.includes('ThumbTraitor')) return null;
  const ladder = FINGER_LADDERS[char.finger];
  if (!ladder) return null;
  const curRank = char.fingerRank || 0;
  if (curRank >= 3) return null;

  const nextStep = ladder.find((step) => step.rank === curRank + 1);
  if (!nextStep) return null;

  const curRep = (char.stats?.rep ?? char.rep) || 0;
  const curNet = (char.stats?.network ?? char.network) || 0;
  const netReq = nextStep.networkReq || 0;
  const earliestAge = [0, 22, 28, 35][nextStep.rank];
  const minTenure = [0, 0, 4, 5][nextStep.rank];
  const tenureOk = curRank === 0 || char.lastFingerPromotionAge == null || char.age - char.lastFingerPromotionAge >= minTenure;
  const fingerPacingOk = tenureOk && char.age >= earliestAge;
  const isEligible = (char.merit || 0) >= nextStep.meritReq && curRep >= nextStep.repReq && curNet >= netReq && fingerPacingOk;

  return {
    ...nextStep,
    finger: char.finger,
    isEligible,
    currentMerit: char.merit || 0,
    currentRep: curRep,
    currentNetwork: curNet
  };
}

export const WING_LADDER_PROMOTIONS = [
  { rank: 1, meritReq: wingGate(1).merit, wealthReq: wingGate(1).wealth, networkReq: wingGate(1).network, eventId: 'wing_promo_feather_r1', eventIds: ['wing_promo_feather_r1', 'wing_promo_feather_vetting', 'wing_promo_feather_witness', 'wing_promo_feather_ledger'], titleVi: 'Bổ Nhiệm Feather Chính Thức (Nest Feather)', titleEn: 'Official Feather Commission' },
  { rank: 2, meritReq: wingGate(2).merit, wealthReq: wingGate(2).wealth, networkReq: wingGate(2).network, eventId: 'wing_promo_specialist_r2', eventIds: ['wing_promo_specialist_r2', 'wing_promo_chief_reorg', 'wing_promo_chief_inheritance', 'wing_promo_chief_oversight'], titleVi: 'Trưởng Phòng Ban Singularity (Section Chief)', titleEn: 'Section Chief / Singularity Specialist' },
  { rank: 3, meritReq: wingGate(3).merit, wealthReq: wingGate(3).wealth, networkReq: wingGate(3).network, eventId: 'wing_singularity_classified_audit', eventIds: ['wing_singularity_classified_audit', 'wing_promo_exec_board_vote', 'wing_promo_exec_quiet_room', 'wing_promo_exec_the_list'], titleVi: 'Đại Hội Đồng Quản Trị (Senior Executive Audit)', titleEn: 'Senior Executive Board Audit' }
];

export function getNextWingPromotion(char) {
  if (char.job !== 'Wing Employee' || char.flags.includes('Distorted')) return null;
  const curRank = char.wingRank || 0;
  if (curRank >= 3) return null;

  const nextStep = WING_LADDER_PROMOTIONS.find((step) => step.rank === curRank + 1);
  if (!nextStep) return null;

  const curWealth = (char.stats?.wealth ?? char.wealth) || 0;
  const curNet = (char.stats?.network ?? char.network) || 0;
  const tenureOk = curRank === 0 || char.lastWingPromotionAge == null || char.age - char.lastWingPromotionAge >= 3;
  const isEligible = (char.merit || 0) >= nextStep.meritReq && curWealth >= nextStep.wealthReq && curNet >= nextStep.networkReq && tenureOk;

  return {
    ...nextStep,
    isEligible,
    currentMerit: char.merit || 0,
    currentWealth: curWealth,
    currentNetwork: curNet,
    currentStanding: char.standing ?? 50
  };
}

export const RETIRED_WORKSHOP_TRIAL_IDS = new Set([
  'ws_promo_journeyman_r1', 'ws_promo_master_r2', 'workshop_legendary_forge_trial'
]);

const FINGER_OPPORTUNITIES = {
  Thumb: 'm_career_thumb_ledger', Index: 'm_career_index_prescript',
  Middle: 'm_career_middle_vengeance', Ring: 'm_career_ring_commission',
  Pinky: 'm_career_pinky_oath'
};

const FINGER_APEX_OPPORTUNITIES = {
  Thumb: 'm_career_thumb_apex_tribute',
  Index: 'm_career_index_apex_tribute',
  Middle: 'm_career_middle_apex_tribute',
  Ring: 'm_career_ring_apex_tribute',
  Pinky: 'm_career_pinky_apex_tribute'
};

export function getOtherCareerPromotion(char) {
  if (char.job === 'Syndicate' || (char.flags?.includes('Distorted') && char.finger)) {
    const step = getNextFingerPromotion(char);
    return step && { ...step, route: 'finger' };
  }
  if (char.job === 'Wing Employee') {
    const step = getNextWingPromotion(char);
    return step && { ...step, route: 'wing' };
  }
  return null;
}

export function careerTrialForEvent(id) {
  for (const [finger, ladder] of Object.entries(FINGER_LADDERS)) {
    const step = ladder.find((entry) => (entry.eventIds || [entry.eventId]).includes(id));
    if (step) return { route: 'finger', finger, ...step };
  }
  const wing = WING_LADDER_PROMOTIONS.find((step) => step.eventIds.includes(id));
  if (wing) return { route: 'wing', ...wing };
  return null;
}

export function careerPromotionOfferChance(char, step = getOtherCareerPromotion(char)) {
  if (!step?.isEligible) return 0;
  const retry = careerTrialRetryDue(char, step);
  const extraMerit = Math.max(0, step.currentMerit - step.meritReq);
  const extraStanding = step.route === 'finger'
    ? Math.max(0, step.currentRep - step.repReq)
    : Math.max(0, step.currentNetwork - step.networkReq) + Math.max(0, step.currentWealth - step.wealthReq) * 0.5 + Math.max(0, (step.currentStanding ?? 50) - 50) * 0.3;
  const base = step.route === 'finger' ? 0.56 : 0.52;
  return Math.min(0.86, base + (retry ? 0.16 : 0) + Math.min(0.18, extraMerit * 0.002 + extraStanding * 0.006));
}

// A clean record opens doors and held secrets pry them open, but a clean record bought with secrets is a thin one
const wingRecordEdge = (char) => ((char.standing ?? 50) - 50) * 0.002 + Math.min(40, char.leverage || 0) * 0.001;

export function careerPromotionSuccessChance(char, step) {
  const rank = step.rank;
  const base = { finger: 0.72, wing: 0.77 }[step.route] - (rank - 1) * (step.route === 'finger' ? 0.14 : 0.12);
  const extraMerit = Math.max(0, (char.merit || 0) - step.meritReq);
  const standingBonus = step.route === 'finger'
    ? Math.max(0, char.stats.rep - step.repReq) * 0.002 + Math.max(0, char.stats.network - (step.networkReq || 0)) * 0.001
    : Math.max(0, char.stats.network - step.networkReq) * 0.002 + Math.max(0, char.stats.wealth - step.wealthReq) * 0.001 + wingRecordEdge(char);
  const readiness = step.route === 'wing' ? (char.stats.sanity - 50) * 0.0015 : (char.stats.health - 50) * 0.0015;
  const edge = egoEdge(char);
  return Math.max(0.25, Math.min(0.86 + edge, base + Math.min(0.14, extraMerit * 0.001 + standingBonus) + readiness + edge + annualTrainingBonus(char)));
}

export function careerPromotionFailureEffects(step) {
  const rank = step.rank;
  if (step.route === 'finger') {
    const byFinger = {
      Thumb: {
        1: { health: -18, rep: -8, heat: 8 },
        2: { health: -35, rep: -14, heat: 12, merit: -10 },
        3: { health: -50, rep: -20, heat: 18, merit: -18 }
      },
      Index: {
        1: { sanity: -16, merit: -6, health: -10 },
        2: { sanity: -28, merit: -14, health: -20 },
        3: { sanity: -40, merit: -22, health: -30 }
      },
      Middle: {
        1: { health: -20, heat: 8, sanity: -8, rep: -6 },
        2: { health: -38, heat: 14, sanity: -15, rep: -14 },
        3: { health: -52, heat: 20, sanity: -22, rep: -22, merit: -15 }
      },
      Ring: {
        1: { sanity: -18, wealth: -12, health: -14 },
        2: { sanity: -30, wealth: -25, health: -25, rep: -10 },
        3: { sanity: -45, wealth: -40, health: -38, rep: -16, merit: -15 }
      },
      Pinky: {
        1: { health: -16, sanity: -14, merit: -6 },
        2: { health: -32, sanity: -25, merit: -12, rep: -10 },
        3: { health: -48, sanity: -38, merit: -20, rep: -16 }
      }
    };
    const fingerTable = byFinger[step.finger] || byFinger.Thumb;
    return fingerTable[rank] || fingerTable[1];
  }
  const wingTable = {
    1: { network: -10, wealth: -15, sanity: -12, merit: -6 },
    2: { network: -18, wealth: -38, sanity: -22, merit: -12, health: -10 },
    3: { network: -28, wealth: -65, sanity: -35, merit: -20, health: -18 }
  };
  return wingTable[rank] || wingTable[1];
}

export function careerTrialRetryDue(char, step = getOtherCareerPromotion(char)) {
  if (!step?.isEligible) return false;
  const prefix = step.route === 'finger' ? 'Finger' : 'Wing';
  return char[`${prefix.toLowerCase()}TrialRetryRank`] === step.rank &&
    char[`last${prefix}TrialAge`] != null && char.age > char[`last${prefix}TrialAge`];
}

export function careerOpportunity(char) {
  const step = getOtherCareerPromotion(char);
  if (!step || step.isEligible) return null;
  const gaps = [Math.max(0, step.meritReq - step.currentMerit) / step.meritReq];
  if (step.route === 'finger') gaps.push(Math.max(0, step.repReq - step.currentRep) / step.repReq);
  if (step.route === 'wing') gaps.push(Math.max(0, step.wealthReq - step.currentWealth) / step.wealthReq, Math.max(0, step.networkReq - step.currentNetwork) / step.networkReq);
  const shortage = Math.max(...gaps);
  if (shortage <= 0) return null;
  const ids = step.route === 'finger'
    ? [FINGER_OPPORTUNITIES[step.finger]]
    : ['m_career_wing_review', 'm_career_wing_quota', 'm_career_wing_incident'];
  return { id: ids[0], ids, chance: Math.min(step.route === 'wing' ? 0.78 : 0.68, 0.34 + shortage * (step.route === 'wing' ? 0.44 : 0.34)), shortage, route: step.route };
}

export function syndicateApexOpportunity(char) {
  if ((char.job === 'Syndicate' || (char.flags?.includes('Distorted') && char.finger)) && char.finger && (char.fingerRank || 0) >= 3) {
    const id = FINGER_APEX_OPPORTUNITIES[char.finger] || FINGER_APEX_OPPORTUNITIES.Thumb;
    return { id, ids: [id], chance: 0.68, shortage: 0, route: 'finger_apex' };
  }
  return null;
}

/**
 * Handles character Distortion transformation:
 * - Changes job to 'Distortion'
 * - Immediately severs Fixer contracts and official Wing appointments
 * - Resets/locks sanity into distorted state
 * - Logs the monumental fall into Carmen's void
 */
export function triggerDistortionTransformation(char) {
  if (char.job === 'Distortion') return [];
  if (char.flags.includes('ColorFixer') || char.isColorFixer || char.job === 'Color Fixer') {
    char.unlockedRecords ||= [];
    if (!char.unlockedRecords.includes('color_fixer')) char.unlockedRecords.push('color_fixer');
    if (char.colorAwardAge != null && char.colorAwardAge < 45 && !char.unlockedRecords.includes('color_before_forty_five')) {
      char.unlockedRecords.push('color_before_forty_five');
    }
    char.colorTitleAtAward ||= char.customTitle || null;
    char.flags = char.flags.filter((flag) => flag !== 'ColorFixer');
    char.isColorFixer = false;
    char.customTitle = null;
  }
  if (!char.flags.includes('Distorted')) char.flags.push('Distorted');
  char.job = 'Distortion';
  char.stats.sanity = 0; // Absolute madness or inverted ego
  char.resonance = Math.max(char.resonance || 0, 85);
  char.heat = Math.max(char.heat || 0, 60);

  // Guarantee initiation of the 3-stage Carmen abyss saga in the very next year
  const pending = char.weaver?.pendingThreads || [];
  if (!pending.some((t) => t.eventId === 'distort_carmen_communion_1')) {
    char.weaver = {
      ...(char.weaver || {}),
      pendingThreads: [
        ...pending,
        {
          id: `arc_distortion_${char.age}_init`,
          eventId: 'distort_carmen_communion_1',
          kind: 'major',
          arcId: 'arc_carmen_distortion_abyss',
          arcStage: 1,
          plantedAtAge: char.age,
          triggerAge: char.age + 1,
          reasonVi: 'Tiếng Gọi Của Carmen: hồi 1/3 (Lời thầm thì dưới ánh mặt trời)',
          reasonEn: 'Carmen’s Siren: chapter 1/3 (Whispers under the sun)',
          fulfilled: false
        }
      ]
    };
  }

  const logs = [
    {
      id: `log_distort_transform_${char.age}`,
      age: char.age,
      season: SEASONS[char.seasonIdx || 0],
      type: 'major',
      vi: `[THỨC TỈNH BIẾN DỊ · DISTORTION] Giọng nói dịu dàng như mật ngọt của Carmen ôm trọn lấy tâm trí bạn trong vầng thái dương rực rỡ. Nỗi đau, áp lực và nhân tính tan rã, nhường chỗ cho hình thái chân thật nhất của bản ngã. Bạn không còn là một con người của The City nữa. Bạn là một Distortion.`,
      en: `[DISTORTION METAMORPHOSIS] Carmen’s honeyed whispers cradled your shattered mind within the radiant sun. Humanity and agonizing pressure dissolved into the purest manifestation of your obsession. You are no longer human. You are a Distortion.`
    }
  ];

  return logs;
}

/**
 * Evaluates item effects upon fatal damage (K Corp HP Ampoule auto-revive).
 * Returns true if saved, false otherwise.
 */
export function tryItemAutoRevive(char) {
  if (!Array.isArray(char.inventory)) return false;
  const ampouleIdx = char.inventory.findIndex((item) => item.id === 'con_kcorp_ampoule');
  if (ampouleIdx === -1) return false;

  // Consume the ampoule
  char.inventory.splice(ampouleIdx, 1);
  char.stats.health = 50;
  char.stats.sanity = Math.max(20, char.stats.sanity);

  char.logs.push({
    id: `log_kcorp_save_${char.age}_${Date.now()}`,
    age: char.age,
    season: SEASONS[char.seasonIdx || 0],
    type: 'major',
    vi: `[Ống tiêm K Corp] Ống tiêm màu lục bảo của K Corp vỡ trong tay bạn. Dịch sinh học thấm vào những mô đã hỏng và kéo bạn trở lại ngay trước khi mọi thứ tối đi.`,
    en: `[K Corp Ampoule] The emerald K Corp ampoule breaks in your hand. The biogel seeps into the ruined tissue and pulls you back just before everything goes dark.`
  });

  return true;
}

/**
 * Calculates biological inheritance vs sibling/companion vs protégé vs debt-bearer vs scavenger successor.
 * Covers dying young (age < 18), dying childless, dying with debts, and dying solitary in The City.
 */
export function determineSuccessorType(char) {
  // Case 1: Dying young (Child or adolescent)
  if (char.age < 14) {
    return {
      type: 'sibling',
      titleVi: 'Đồng lứa Sống sót',
      titleEn: 'Surviving Sibling / Room Urchin',
      introVi: `${char.name} ngã xuống năm ${char.age} tuổi khi chưa kịp lớn. Bạn là đứa trẻ trốn cùng buồng trọ lúc 3:13 AM, run rẩy giấu đi kỷ vật và lời thề sống sót giữa lòng The City.`,
      introEn: `${char.name} perished young at age ${char.age}. You are the fellow room-child who hid alongside them at 3:13 AM, clutching their keepsake and sworn to survive in The City.`
    };
  }

  if (char.age < 18) {
    return {
      type: 'companion',
      titleVi: 'Bạn đồng hành Niên thiếu',
      titleEn: 'Youthful Companion',
      introVi: `${char.name} ngã xuống giữa tuổi thiếu niên. Bạn là người bạn cùng vào sinh ra tử trong ngõ hẻm Backstreets tiếp bước mang theo di nguyện dở dang.`,
      introEn: `${char.name} fell in the bloom of youth. You are the companion who walked the Backstreet alleys beside them, taking up their unfinished will.`
    };
  }

  // Case 2: Biological offspring (age >= 18 with active living child)
  const aliveChild = npcIsActive(char.npcs?.child);
  if (aliveChild) {
    return {
      type: 'child',
      titleVi: 'Huyết tử Thừa kế',
      titleEn: 'Biological Heir',
      introVi: `Bạn là con của ${char.name}, mang trong mình dòng máu và ký ức về một tiền nhân đã sống kiên cường giữa lòng The City.`,
      introEn: `You are the child of ${char.name}, carrying their bloodline and memory across The City.`
    };
  }

  // Case 3: Successor Apprentice / Protégé or Sworn Partner
  const activeProtégé = npcIsActive(char.npcs?.apprentice) || npcIsActive(char.npcs?.partner);
  if (activeProtégé) {
    return {
      type: 'apprentice',
      titleVi: 'Truyền nhân Ý chí',
      titleEn: 'Successor Apprentice',
      introVi: `Bạn là người được ${char.name} dìu dắt và gửi gắm di nguyện, nắm chặt vũ khí cùng những bài học sống còn trước khi người ấy ngã xuống.`,
      introEn: `You are the chosen successor entrusted by ${char.name}, gripping their weapon and surviving lessons before they fell.`
    };
  }

  // Case 4: Bound Debt Bearer (Con nợ thế thân do Syndicate lùng bắt)
  const hasVendetta = Boolean(
    char.hasVendetta ||
    (char.heat || 0) >= 40 ||
    char.flags?.includes('MiddleVendetta') ||
    char.scars?.some((s) => typeof s === 'string' && s.includes('Nợ Máu'))
  );
  if (hasVendetta) {
    return {
      type: 'debt_bearer',
      titleVi: 'Kẻ Gánh Nợ Bất Đắc Dĩ',
      titleEn: 'Bound Debt Successor',
      introVi: `${char.name} qua đời khi nợ máu với Syndicate chưa tất toán. Toán chấp pháp lùng ra người quen biết duy nhất còn sống là bạn, ép bạn tiếp nhận cuốn sổ nợ đẫm máu.`,
      introEn: `${char.name} passed away leaving an unsettled Syndicate blood debt. The enforcers hunted down the only surviving associate — you — pressing the bloodstained ledger into your hands.`
    };
  }

  // Case 5: Solitary death: scavenger in the Backstreets
  return {
    type: 'scavenger',
    titleVi: 'Kẻ nhặt tàn dư Backstreets',
    titleEn: 'Backstreet Scavenger Inheritor',
    introVi: `Bạn là một kẻ sống sót vô danh ở Backstreets, tình cờ đào bới được chiếc ba lô cũ và di vật vấy máu của ${char.name} từ đống gạch vụn trước giờ Sweeper dọn sạch.`,
    introEn: `You are an unnamed Backstreet survivor who scavenged the battered pack and bloodstained relic of ${char.name} from the rubble before the Sweepers arrived.`
  };
}

// ---------------------------------------------------------------------------
// E.G.O leap: a second, harder track beside the ordinary exams.
// Hana raises a Fixer by the Requests in their reports, and an Effloresced E.G.O is proof of strength the
// reports have not caught up with. So Hana sets one verification Request two bands above the Fixer's
// Grade. The Finger and Wing ladders get the same one-time leap of two ranks.
// ---------------------------------------------------------------------------

const LEAP_COOLDOWN_YEARS = 3;
const FINGER_LEAP_MIN_AGE = [26, 30];
const WING_LEAP_MIN_AGE = [28, 32];

export const isEgoLeapEvent = (id) => /^(fixer|finger|wing)_ego_leap_/.test(String(id));

/** The leap this character could be offered now, or null. Needs the next ordinary promotion to be earned first. */
export function getEgoLeap(char) {
  if (!hasAwakenedEgo(char) || char.flags.includes('Distorted') || char.flags.includes('ego_leap_done')) return null;
  if (Number.isFinite(char.lastEgoLeapAge) && char.age < char.lastEgoLeapAge + LEAP_COOLDOWN_YEARS) return null;

  if (char.job === 'Fixer') {
    const from = char.fixerGrade ?? 9;
    if (from < 3 || !getNextFixerPromotion(char)?.isEligible) return null;
    return { route: 'fixer', from, to: Math.max(1, from - 2), eventId: `fixer_ego_leap_g${from}` };
  }
  if (char.job === 'Syndicate' && char.finger) {
    const from = char.fingerRank || 0;
    if (from > 1 || char.age < FINGER_LEAP_MIN_AGE[from] || !getNextFingerPromotion(char)?.isEligible) return null;
    return { route: 'finger', finger: char.finger, from, to: from + 2, eventId: `finger_ego_leap_${char.finger.toLowerCase()}_r${from}` };
  }
  if (char.job === 'Wing Employee') {
    const from = char.wingRank || 0;
    if (from > 1 || char.age < WING_LEAP_MIN_AGE[from] || !getNextWingPromotion(char)?.isEligible) return null;
    return { route: 'wing', from, to: from + 2, eventId: `wing_ego_leap_r${from}` };
  }
  return null;
}

const leapStep = (leap) => {
  const ladder = leap.route === 'finger' ? FINGER_LADDERS[leap.finger] : WING_LADDER_PROMOTIONS;
  return { ...ladder.find((entry) => entry.rank === leap.to), route: leap.route, finger: leap.finger };
};

/** Judged against the band the leap lands in, so it is harder than the ordinary exam it skips past. */
export function egoLeapSuccessChance(char, leap) {
  return leap.route === 'fixer' ? fixerPromotionSuccessChance(char, leap.to) : careerPromotionSuccessChance(char, leapStep(leap));
}

export function egoLeapFailureEffects(leap) {
  return leap.route === 'fixer' ? fixerPromotionFailureEffects(leap.to) : careerPromotionFailureEffects(leapStep(leap));
}
