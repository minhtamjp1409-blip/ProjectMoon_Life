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

export const FIXER_LADDER = [
  {
    grade: 8,
    meritReq: 10,
    repReq: 8,
    titleVi: 'Kỳ thi Thăng cấp Fixer Grade 8 (Hana Section 6)',
    titleEn: 'Grade 8 Fixer Promotion Exam (Hana Section 6)',
    descVi: 'Hana Association Section 6 gửi thông báo triệu tập: Bạn đã tích lũy đủ chiến tích ban đầu ở Backstreets. Hãy làm thủ tục kiểm tra năng lực để tháo bỏ tấm thẻ Grade 9 tập sự.',
    descEn: 'Hana Association Section 6 issues your summons: You have accumulated sufficient Backstreet merits to sit for the Grade 8 competency evaluation.'
  },
  {
    grade: 7,
    meritReq: 22,
    repReq: 16,
    titleVi: 'Khảo sát Gia nhập Văn phòng (Fixer Grade 7)',
    titleEn: 'Office Affiliation Certification (Grade 7 Fixer)',
    descVi: 'Các Văn phòng Fixer độc lập và phân hội Zwei bắt đầu để mắt đến bạn. Hana yêu cầu bạn vượt qua bài thẩm định Grade 7 để nhận thù lao tiêu chuẩn.',
    descEn: 'Independent Fixer Offices and Zwei sub-branches take note of your record. Complete the Grade 7 certification for standard commission rates.'
  },
  {
    grade: 6,
    meritReq: 38,
    repReq: 26,
    titleVi: 'Bổ nhiệm Fixer Thực chiến (Grade 6)',
    titleEn: 'Field Combat Operative Commission (Grade 6)',
    descVi: 'Vượt qua vô số vụ huyết chiến Backstreets và thanh trừng chuột cống, bạn được cấp chứng chỉ Fixer Grade 6, đủ tư cách chỉ huy đội nhỏ đối đầu hiểm họa Urban Legend.',
    descEn: 'Surviving dozens of lethal clashes, you are granted Grade 6 status, authorized to lead tactical strike cells against Urban Legend threats.'
  },
  {
    grade: 5,
    meritReq: 56,
    repReq: 38,
    titleVi: 'Đại hội Thăng cấp Trung cấp (Fixer Grade 5)',
    titleEn: 'Mid-Tier Rank Exam (Grade 5 Fixer)',
    descVi: 'Tại ngưỡng Grade 5, bạn bước vào hàng ngũ Fixer kỳ cựu. Hana Association yêu cầu bài kiểm tra đối kháng thực địa với các Capo cấp thấp của Syndicate.',
    descEn: 'Grade 5 marks entry into the veteran echelon. Hana requires verified field combat suppression against syndicate Capos.'
  },
  {
    grade: 4,
    meritReq: 78,
    repReq: 52,
    titleVi: 'Phó Chỉ Huy Section (Fixer Grade 4)',
    titleEn: 'Section Vice-Captaincy (Grade 4 Fixer)',
    descVi: 'Đạt Grade 4, tên tuổi bạn bắt đầu được các Hiệp hội lớn (Shi, Liu, Seven, Dieci) săn đón. Mức phí ủy thác tăng vọt, đối mặt trực diện hiểm họa Urban Plague.',
    descEn: 'At Grade 4, major Associations scout your talent. Contract bounties surge as you deploy directly against Urban Plague threats.'
  },
  {
    grade: 3,
    meritReq: 105,
    repReq: 68,
    titleVi: 'Chuyên gia Cấp cao (Fixer Grade 3)',
    titleEn: 'Senior Specialist Commission (Grade 3 Fixer)',
    descVi: 'Chỉ 3% số Fixer ở The City đạt tới Grade 3. Bạn đủ thẩm quyền tiếp cận vũ khí Workshop cấp cao và điều tra các vụ án bí mật của Wing.',
    descEn: 'Only the top 3% of Fixers reach Grade 3. You gain access to master-grade Workshop gear and classified Wing investigations.'
  },
  {
    grade: 2,
    meritReq: 150,
    repReq: 82,
    titleVi: 'Át Chủ Bài Section 1 (Fixer Grade 2)',
    titleEn: 'Section 1 Ace Operative (Grade 2 Fixer)',
    descVi: 'Bạn là cánh tay phải của các Đội trưởng Section 1. Mọi bước đi đều phải đối đầu với quái vật Urban Nightmare và những bản án tử hình của The Head.',
    descEn: 'The right hand of Section 1 Directors. Your missions confront Urban Nightmare horrors and death warrants issued by The Head.'
  },
  {
    grade: 1,
    meritReq: 200,
    repReq: 95,
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
    ? { repReq: COLOR_FIXER_REQ.rep, meritReq: COLOR_FIXER_REQ.merit }
    : null);
  if (!step) return 0.42;
  const repGap = Math.max(0, step.repReq - (char.stats?.rep ?? char.rep ?? 0));
  const meritGap = Math.max(0, step.meritReq - (char.merit || 0));
  const repChance = repGap > 0 ? 0.54 + 0.18 * Math.min(1, repGap / Math.max(10, step.repReq * 0.25)) : 0.42;
  const meritChance = meritGap > 0 ? 0.5 + 0.1 * Math.min(1, meritGap / Math.max(15, step.meritReq * 0.25)) : 0.42;
  return Math.max(repChance, meritChance);
}

export function fixerPromotionSuccessChance(char, targetGrade) {
  const step = FIXER_LADDER.find((entry) => entry.grade === targetGrade);
  if (!step) return 0;
  const extraRep = Math.max(0, char.stats.rep - step.repReq);
  const extraMerit = Math.max(0, (char.merit || 0) - step.meritReq);
  const healthBonus = Math.max(-0.08, Math.min(0.08, (char.stats.health - 55) * 0.002));
  return Math.min(0.85, Math.max(0.2, 0.8 - (8 - targetGrade) * 0.065 + extraRep * 0.003 + extraMerit * 0.0008 + healthBonus));
}

export function fixerPromotionFailureEffects(targetGrade) {
  const difficulty = 9 - targetGrade;
  return { health: -(3 + difficulty * 2), wealth: -(1 + difficulty * 4), sanity: -(1 + difficulty) };
}

/**
 * Evaluates whether Color Fixer trial can be initiated.
 * Strictly requires Grade 1, Merit >= 210, Rep >= 100, E.G.O Awakening / Resonance >= 50,
 * and surviving an Urban Nightmare / Star of the City ordeal.
 */
export const COLOR_FIXER_REQ = { merit: 300, rep: 95 };

export function checkColorFixerReadiness(char) {
  const targetMerit = COLOR_FIXER_REQ.merit;
  const targetRep = COLOR_FIXER_REQ.rep;
  if (char.job !== 'Fixer' || char.flags.includes('Distorted') || char.flags.includes('ColorFixer')) {
    return { ready: false, reason: 'Chưa đủ điều kiện', targetMerit, targetRep };
  }
  if (char.fixerGrade !== 1) {
    return { ready: false, reason: 'Bắt buộc phải là Fixer Grade 1', targetMerit, targetRep };
  }
  if (char.age < 30) return { ready: false, reason: 'Hana yêu cầu hồ sơ hành nghề lâu năm (từ 30 tuổi)', targetMerit, targetRep };
  const curRep = (char.stats?.rep ?? char.rep) || 0;
  const meritOk = (char.merit || 0) >= targetMerit;
  const repOk = curRep >= targetRep;
  const egoOrResonance = true; // E.G.O is not a prerequisite for a Color designation.

  return {
    ready: meritOk && repOk && egoOrResonance,
    meritOk,
    repOk,
    egoOrResonance,
    targetMerit,
    targetRep
  };
}

export const FINGER_LADDERS = {
  Thumb: [
    { rank: 1, meritReq: 26, repReq: 16, eventId: 'syn_thumb_promo_capo', eventIds: ['syn_thumb_promo_capo', 'syn_thumb_promo_capo_convoy'], titleVi: 'Thăng cấp Capo (The Thumb)', titleEn: 'Thumb Capo Promotion Trial' },
    { rank: 2, meritReq: 52, repReq: 32, eventId: 'syn_thumb_promo_sottocapo', eventIds: ['syn_thumb_promo_sottocapo', 'syn_thumb_promo_sottocapo_armory'], titleVi: 'Khảo thí Sottocapo (The Thumb)', titleEn: 'Thumb Sottocapo Promotion Trial' },
    { rank: 3, meritReq: 115, repReq: 65, eventId: 'syn_thumb_underboss_purge', eventIds: ['syn_thumb_underboss_purge', 'syn_thumb_apex_godfather'], titleVi: 'Đại Lễ Tuyên Thệ Underboss (The Thumb)', titleEn: 'Thumb Underboss Pinnacle Trial' }
  ],
  Index: [
    { rank: 1, meritReq: 26, repReq: 16, eventId: 'syn_index_promo_messenger', eventIds: ['syn_index_promo_messenger', 'syn_index_promo_messenger_conduit'], titleVi: 'Sứ Giả Chỉ Lệnh (Index Messenger Trial)', titleEn: 'Index Messenger Promotion Trial' },
    { rank: 2, meritReq: 52, repReq: 32, eventId: 'syn_index_promo_proxy', eventIds: ['syn_index_promo_proxy', 'syn_index_promo_proxy_sword'], titleVi: 'Đại Kiếm Proxy (Index Proxy Trial)', titleEn: 'Index Proxy Promotion Trial' },
    { rank: 3, meritReq: 115, repReq: 65, eventId: 'syn_index_weaver_prescript', eventIds: ['syn_index_weaver_prescript', 'syn_index_grand_proxy_flow'], titleVi: 'Ý Chỉ Thần Dệt (Index Weaver Pinnacle)', titleEn: 'Index Weaver Pinnacle Trial' }
  ],
  Middle: [
    { rank: 1, meritReq: 26, repReq: 16, eventId: 'syn_middle_promo_big_sibling', eventIds: ['syn_middle_promo_big_sibling', 'syn_middle_promo_big_sibling_rescue'], titleVi: 'Lễ Khắc Xích Vàng: Big Sibling (The Middle)', titleEn: 'Middle Big Sibling Promotion Trial' },
    { rank: 2, meritReq: 52, repReq: 32, eventId: 'syn_middle_promo_great_elder', eventIds: ['syn_middle_promo_great_elder', 'syn_middle_promo_great_elder_clan'], titleVi: 'Đại Trưởng Lão (Middle Great Elder)', titleEn: 'Middle Great Elder Promotion Trial' },
    { rank: 3, meritReq: 115, repReq: 65, eventId: 'syn_middle_great_brother_vendetta', eventIds: ['syn_middle_great_brother_vendetta', 'syn_middle_apex_patriarch'], titleVi: 'Đại Huyết Nợ: Great Brother/Sister (The Middle)', titleEn: 'Middle Great Sibling Pinnacle Trial' }
  ],
  Ring: [
    { rank: 1, meritReq: 26, repReq: 16, eventId: 'syn_ring_promo_docent', eventIds: ['syn_ring_promo_docent', 'syn_ring_promo_docent_gallery'], titleVi: 'Triển Lãm Giải Phẫu: Docent (The Ring)', titleEn: 'Ring Docent Promotion Trial' },
    { rank: 2, meritReq: 52, repReq: 32, eventId: 'syn_ring_promo_maestro', eventIds: ['syn_ring_promo_maestro', 'syn_ring_promo_maestro_symphony'], titleVi: 'Đại Nhạc Trưởng: Maestro (The Ring)', titleEn: 'Ring Maestro Promotion Trial' },
    { rank: 3, meritReq: 115, repReq: 65, eventId: 'syn_ring_curator_monument', eventIds: ['syn_ring_curator_monument', 'syn_ring_apex_grand_master'], titleVi: 'Đại Quản Trưởng: Grand Curator (The Ring)', titleEn: 'Ring Grand Curator Pinnacle Trial' }
  ],
  Pinky: [
    { rank: 1, meritReq: 26, repReq: 16, eventId: 'syn_pinky_promo_blade', eventIds: ['syn_pinky_promo_blade', 'syn_pinky_promo_blade_oath'], titleVi: 'Lưỡi Đao Lập Thệ: Sworn Blade (The Pinky)', titleEn: 'Pinky Sworn Blade Promotion Trial' },
    { rank: 2, meritReq: 52, repReq: 32, eventId: 'syn_pinky_star_blade_pinnacle', eventIds: ['syn_pinky_star_blade_pinnacle', 'syn_pinky_promo_shadow_arbiter'], titleVi: 'Thiên Tinh: Star of the Sky (The Pinky)', titleEn: 'Pinky Star of the Sky Promotion Trial' },
    { rank: 3, meritReq: 115, repReq: 65, eventId: 'syn_pinky_promo_sovereign', eventIds: ['syn_pinky_promo_sovereign', 'syn_pinky_apex_monarch'], titleVi: 'Chúa Tể Ngón Út: Sovereign (The Pinky)', titleEn: 'Pinky Sovereign Pinnacle Trial' }
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
  const earliestAge = [0, 22, 28, 35][nextStep.rank];
  const tenureOk = curRank === 0 || char.lastFingerPromotionAge == null || char.age - char.lastFingerPromotionAge >= 3;
  const fingerPacingOk = tenureOk && (char.finger !== 'Thumb' || char.age >= earliestAge);
  const isEligible = (char.merit || 0) >= nextStep.meritReq && curRep >= nextStep.repReq && fingerPacingOk;

  return {
    ...nextStep,
    finger: char.finger,
    isEligible,
    currentMerit: char.merit || 0,
    currentRep: curRep
  };
}

export const WING_LADDER_PROMOTIONS = [
  { rank: 1, meritReq: 25, wealthReq: 18, networkReq: 14, eventId: 'wing_promo_feather_r1', titleVi: 'Bổ Nhiệm Feather Chính Thức (Nest Feather)', titleEn: 'Official Feather Commission' },
  { rank: 2, meritReq: 65, wealthReq: 45, networkReq: 32, eventId: 'wing_promo_specialist_r2', titleVi: 'Trưởng Phòng Ban Singularity (Section Chief)', titleEn: 'Section Chief / Singularity Specialist' },
  { rank: 3, meritReq: 125, wealthReq: 85, networkReq: 60, eventId: 'wing_singularity_classified_audit', titleVi: 'Đại Hội Đồng Quản Trị (Senior Executive Audit)', titleEn: 'Senior Executive Board Audit' }
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
    currentNetwork: curNet
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
  const wing = WING_LADDER_PROMOTIONS.find((step) => step.eventId === id);
  if (wing) return { route: 'wing', ...wing };
  return null;
}

export function careerPromotionOfferChance(char, step = getOtherCareerPromotion(char)) {
  if (!step?.isEligible) return 0;
  const retry = careerTrialRetryDue(char, step);
  const extraMerit = Math.max(0, step.currentMerit - step.meritReq);
  const extraStanding = step.route === 'finger'
    ? Math.max(0, step.currentRep - step.repReq)
    : Math.max(0, step.currentNetwork - step.networkReq) + Math.max(0, step.currentWealth - step.wealthReq) * 0.5;
  const base = step.route === 'finger' ? 0.56 : 0.52;
  return Math.min(0.86, base + (retry ? 0.16 : 0) + Math.min(0.18, extraMerit * 0.002 + extraStanding * 0.006));
}

export function careerPromotionSuccessChance(char, step) {
  const rank = step.rank;
  const base = { finger: 0.74, wing: 0.77 }[step.route] - (rank - 1) * 0.12;
  const extraMerit = Math.max(0, (char.merit || 0) - step.meritReq);
  const standingBonus = step.route === 'finger'
    ? Math.max(0, char.stats.rep - step.repReq) * 0.002
    : Math.max(0, char.stats.network - step.networkReq) * 0.002 + Math.max(0, char.stats.wealth - step.wealthReq) * 0.001;
  const readiness = step.route === 'wing' ? (char.stats.sanity - 50) * 0.0015 : (char.stats.health - 50) * 0.0015;
  return Math.max(0.25, Math.min(0.88, base + Math.min(0.14, extraMerit * 0.001 + standingBonus) + readiness));
}

export function careerPromotionFailureEffects(step) {
  const rank = step.rank;
  if (step.route === 'finger') {
    const byFinger = {
      Thumb: { health: -4, rep: -4, heat: 5 },
      Index: { sanity: -8, merit: -4, heat: 3 },
      Middle: { health: -10, heat: 6, sanity: -2 },
      Ring: { sanity: -7, wealth: -4, rep: -2 },
      Pinky: { health: -7, sanity: -5, merit: -2 }
    };
    return Object.fromEntries(Object.entries(byFinger[step.finger] || byFinger.Thumb).map(([key, value]) => [key, value > 0 ? value + rank - 1 : value - (rank - 1) * 2]));
  }
  return { network: -(4 + rank * 2), wealth: -(2 + rank * 2), merit: -rank * 2, sanity: -rank * 2 };
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

/**
 * Handles character Distortion transformation:
 * - Changes job to 'Distortion'
 * - Immediately severs Fixer contracts and official Wing appointments
 * - Resets/locks sanity into distorted state
 * - Logs the monumental fall into Carmen's void
 */
export function triggerDistortionTransformation(char) {
  if (char.job === 'Distortion') return [];
  if (!char.flags.includes('Distorted')) char.flags.push('Distorted');
  char.job = 'Distortion';
  char.stats.sanity = 0; // Absolute madness or inverted ego
  char.resonance = Math.max(char.resonance || 0, 85);
  char.heat = Math.max(char.heat || 0, 60);

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
    vi: `[Ống tiêm K Corp kích hoạt!] Ống tiêm chứa dịch màu lục bảo K Corp vỡ tung, chất lỏng sinh học thần kỳ thấm sâu vào từng tế bào bị hủy hoại, kéo bạn tức thì trở về từ cõi chết! (+50 HP)`,
    en: `[K Corp Ampoule Triggered!] The emerald vial shattered, miraculous biogel flooding your ruined tissues and pulling you back from the brink of oblivion! (+50 HP)`
  });

  return true;
}

/**
 * Calculates biological inheritance vs protégé vs scavenger successor.
 */
export function determineSuccessorType(char) {
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

  const activeProtégé = npcIsActive(char.npcs?.apprentice);

  if (activeProtégé) {
    return {
      type: 'apprentice',
      titleVi: 'Học trò Kế thừa Di nguyện',
      titleEn: 'Successor Apprentice',
      introVi: `Bạn là đệ tử được ${char.name} dìu dắt, nắm chặt thanh vũ khí và những lời dặn dò cuối cùng trước khi người ấy ngã xuống.`,
      introEn: `You are the chosen protégé of ${char.name}, gripping their parting teachings and weapon.`
    };
  }

  // Solitary death: scavenger in the Backstreets
  return {
    type: 'scavenger',
    titleVi: 'Kẻ nhặt tàn dư Backstreets',
    titleEn: 'Backstreet Scavenger Inheritor',
    introVi: `Bạn là một kẻ sống sót vô danh ở Backstreets, tình cờ đào bới được chiếc ba lô cũ và cuốn nhật ký vấy máu của ${char.name} từ đống gạch vụn.`,
    introEn: `You are an unnamed Backstreet survivor who uncovered the battered pack and bloodstained journal of ${char.name} amidst the rubble.`
  };
}
