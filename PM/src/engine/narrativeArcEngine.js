/**
 * Project Moon - Narrative Arc Engine & Emotional Wave Orchestrator
 * Upgrades the AI Director with:
 * 1. Multi-Stage Narrative Arcs (State Machine for long-term multi-chapter sagas)
 * 2. Emotional Wave & Sine Pacing (Alternating between Bittersweet Respite & Reality Shocks)
 * 3. NPC Autonomous Life Drama (Dynamic life events triggered by living companion traits)
 */

import { normalize, ResponseCurves } from './utilityCurves.js';

/**
 * Canonical Multi-Stage Narrative Arcs:
 * Each Arc is a 3 to 4 stage journey that weaves through the character's life
 */
export const NARRATIVE_ARCS = [
  // --- ARC 1: THE THUMB'S IRON ETICQUETTE & BLOOD FEUD ---
  {
    id: 'arc_thumb_blood_etiquette',
    nameVi: 'Huyết Chiến Lễ Nghi · The Thumb',
    nameEn: 'The Thumb’s Iron Etiquette Saga',
    triggerNeed: { jobs: ['Syndicate'], flags: ['FingerThumb'] },
    stages: [
      { stage: 1, eventId: 'syn_thumb_etiquette_execution', titleVi: 'Khởi điểm: Lễ nghi xử bắn' },
      { stage: 2, eventId: 'syn_thumb_ammunition_quota', titleVi: 'Leo thang: Khủng hoảng hạn ngạch đạn dược' },
      { stage: 3, eventId: 'syn_thumb_underboss_purge', titleVi: 'Đỉnh điểm: Đại thanh trừng của Sottocapo' }
    ]
  },

  // --- ARC 2: THE INDEX'S WEFT OF CAUSALITY ---
  {
    id: 'arc_index_prescript_thread',
    nameVi: 'Sợi Chỉ Định Mệnh · The Index',
    nameEn: 'The Index’s Weft of Causality',
    triggerNeed: { jobs: ['Syndicate'], flags: ['FingerIndex'] },
    stages: [
      { stage: 1, eventId: 'syn_index_prescript_bizarre', titleVi: 'Khởi điểm: Chỉ lệnh đi lùi ngã tư' },
      { stage: 2, eventId: 'syn_index_spinning_top_prescript', titleVi: 'Leo thang: Nhiệm vụ giao phong bì đỏ' },
      { stage: 3, eventId: 'syn_index_promo_proxy', titleVi: 'Đỉnh điểm: Đại khảo nghiệm phong hàm Proxy' }
    ]
  },

  // --- ARC 3: THE MIDDLE'S SANGUINE BROTHERHOOD ---
  {
    id: 'arc_middle_vengeance_saga',
    nameVi: 'Sổ Thù Hận Huynh Đệ · The Middle',
    nameEn: 'The Middle’s Book of Vengeance Saga',
    triggerNeed: { jobs: ['Syndicate'], flags: ['FingerMiddle'] },
    stages: [
      { stage: 1, eventId: 'syn_middle_book_of_vengeance', titleVi: 'Khởi điểm: Món nợ máu đầu tiên' },
      { stage: 2, eventId: 'syn_middle_promo_big_sibling_rescue', titleVi: 'Leo thang: Đột kích nhà lao cứu anh em' },
      { stage: 3, eventId: 'syn_middle_promo_big_sibling', titleVi: 'Đỉnh điểm: Đại khảo thí phong Big Brother' }
    ]
  },

  // --- ARC 4: WING CLASSIFIED SINGULARITY CONSPIRACY ---
  {
    id: 'arc_wing_classified_singularity',
    nameVi: 'Âm Mưu Singularity Tập Đoàn · Megacorp',
    nameEn: 'Classified Singularity Corporate Arc',
    triggerNeed: { jobs: ['Wing'] },
    stages: [
      { stage: 1, eventId: 'wing_singularity_leak_crisis', titleVi: 'Khởi điểm: Rò rỉ phòng thí nghiệm' },
      { stage: 2, eventId: 'wing_corporate_espionage_bribe', titleVi: 'Leo thang: Lời đề nghị của gián điệp' },
      { stage: 3, eventId: 'wing_singularity_classified_audit', titleVi: 'Đỉnh điểm: Đại thẩm tra của Ban Quản Trị' }
    ]
  },

  // --- ARC 5: CARMEN'S SIREN & THE DISTORTION ABYSS ---
  {
    id: 'arc_carmen_distortion_abyss',
    nameVi: 'Tiếng Gọi Của Carmen · Vực Sâu Biến Dị',
    nameEn: 'Carmen’s Siren & The Distortion Abyss',
    triggerNeed: { flags: ['Distorted'] },
    stages: [
      { stage: 1, eventId: 'distort_carmen_communion_1', titleVi: 'Khởi điểm: Lời thầm thì dưới ánh mặt trời' },
      { stage: 2, eventId: 'distort_former_companion_encounter', titleVi: 'Leo thang: Cuộc gặp lại đẫm lệ với cố nhân' },
      { stage: 3, eventId: 'distort_star_of_city_rampage', titleVi: 'Đỉnh điểm: Cơn cuồng nộ Star of the City' }
    ]
  },

  // --- ARC 6: FIXER APEX SUMMIT (GRADE 2 TO COLOR) ---
  {
    id: 'arc_fixer_apex_summit',
    nameVi: 'Đỉnh Cao Fixer · Đại Khảo Thí Hana',
    nameEn: 'Apex Fixer Summit · Hana Supreme Arc',
    triggerNeed: { jobs: ['Fixer'], flags: ['promo_g2_done'] },
    stages: [
      { stage: 1, eventId: 'fixer_g2_wing_conspiracy', titleVi: 'Khởi điểm: Âm mưu năng lượng thời gian T Corp' },
      { stage: 2, eventId: 'fixer_promo_g1_exam', titleVi: 'Leo thang: Đại khảo hạch Grade 1' },
      { stage: 3, eventId: 'hana_color_ascension_trial', titleVi: 'Đỉnh điểm: Đại khảo thí phong Color Huyền Thoại' }
    ]
  }
];

/**
 * Checks active arcs and boosts the utility of the NEXT stage event
 */
export function evaluateNarrativeArcProgression(char, event) {
  if (!char.activeArcs || char.activeArcs.length === 0) return { arcBonus: 0, arcReasonVi: null };

  for (const activeArc of char.activeArcs) {
    if (activeArc.status !== 'active') continue;
    const def = NARRATIVE_ARCS.find(a => a.id === activeArc.id);
    if (!def) continue;

    const currentStageDef = def.stages.find(s => s.stage === activeArc.currentStage);
    if (currentStageDef && currentStageDef.eventId === event.id) {
      return {
        arcBonus: 85, // Massive priority boost to chain narrative sequentially
        arcReasonVi: `Mạch truyện chính [${def.nameVi}]: Tiến trình Hồi ${activeArc.currentStage} / ${def.stages.length} (+Arc)`
      };
    }
  }

  return { arcBonus: 0, arcReasonVi: null };
}

/**
 * Updates or advances active arcs when an event is resolved
 */
export function advanceActiveNarrativeArcs(char, eventId) {
  if (!char.activeArcs) char.activeArcs = [];

  // Check if any active arc advanced
  for (const arc of char.activeArcs) {
    if (arc.status !== 'active') continue;
    const def = NARRATIVE_ARCS.find(a => a.id === arc.id);
    if (!def) continue;

    const stageDef = def.stages.find(s => s.stage === arc.currentStage && s.eventId === eventId);
    if (stageDef) {
      arc.currentStage++;
      if (arc.currentStage > def.stages.length) {
        arc.status = 'completed';
        if (!char.unlockedRecords) char.unlockedRecords = [];
        char.unlockedRecords.push(`arc_completed_${arc.id}`);
      }
      return;
    }
  }

  // Check if a new arc should be initiated
  for (const def of NARRATIVE_ARCS) {
    if (char.activeArcs.some(a => a.id === def.id)) continue;
    const firstStage = def.stages[0];
    if (firstStage && firstStage.eventId === eventId) {
      char.activeArcs.push({
        id: def.id,
        currentStage: 2, // First stage just completed, now awaiting stage 2
        status: 'active',
        startedAge: char.age
      });
      return;
    }
  }
}

/**
 * Emotional Wave & Sine Pacing Evaluator:
 * Calculates emotional resonance based on years since crisis, recent deaths, and sanity
 */
export function computeEmotionalWaveConsideration(char, weaver, event) {
  let scoreMultiplier = 1.0;
  const pacingLogs = [];

  const yearsSinceCrisis = weaver?.yearsSinceLastCrisis ?? 3;
  const isFamilyOrPeaceEvent = event.id.startsWith('life_') ||
    event.id.includes('hearth') ||
    (event.vi || '').includes('{spouse}') ||
    (event.vi || '').includes('{child}') ||
    (event.vi || '').includes('trà') ||
    (event.vi || '').includes('quán ăn');

  const isViolenceOrThreatEvent = event.id.includes('ambush') ||
    event.id.includes('raid') ||
    event.id.includes('purge') ||
    event.id.includes('assassin') ||
    event.id.includes('sweeper');

  // 1. Bittersweet Respite / Warm Hearth Phase (Post-crisis recovery: years 0 - 2)
  if (yearsSinceCrisis <= 2) {
    if (isFamilyOrPeaceEvent) {
      const respiteBoost = 2.4;
      scoreMultiplier *= respiteBoost;
      pacingLogs.push(`Khoảng lặng ấm áp sau bão táp (x${respiteBoost.toFixed(1)})`);
    } else if (isViolenceOrThreatEvent) {
      scoreMultiplier *= 0.35; // suppress relentless combat to let emotional impact sink in
    }
  }
  // 2. The City's Reality Tremor (Prolonged peace: 4+ years of quiet life)
  else if (yearsSinceCrisis >= 4 && (char.stats?.sanity ?? 50) >= 60) {
    if (isViolenceOrThreatEvent) {
      const shockBoost = 2.2;
      scoreMultiplier *= shockBoost;
      pacingLogs.push(`Hiện thực nghiệt ngã của The City thức giấc (x${shockBoost.toFixed(1)})`);
    }
  }

  return {
    waveMultiplier: Math.max(0.2, Math.min(3.5, scoreMultiplier)),
    pacingLogs
  };
}

/**
 * Autonomous Micro-Drama for living companions:
 * Runs annually at year end to create living, breathing companion events
 */
export function simulateNpcAutonomousLife(char, rng = Math.random) {
  const logs = [];
  if (!char.npcs) return logs;

  // 1. Childhood Friend Autonomous Life
  const friend = char.npcs.friend;
  if (friend && !friend.deceased && friend.status === 'alive') {
    const friendAge = (char.age || 0);
    if (friendAge >= 18 && rng() < 0.12) {
      const roll = rng();
      if (roll < 0.4) {
        logs.push({
          vi: `[Tin khu phố] ${friend.nameVi} vừa ký được hợp đồng dài hạn với một Văn phòng Fixer độc lập, gửi tặng bạn một bao thuốc lá Backstreets ăn mừng.`,
          en: `[Alley Dispatch] ${friend.nameEn} signed an operative contract with an independent Fixer Office, sending a pack of Backstreet cigarettes in celebration.`
        });
        if (friend.bond) friend.bond = Math.min(100, friend.bond + 3);
      } else if (roll < 0.7) {
        logs.push({
          vi: `[Tin khu phố] ${friend.nameVi} lỡ thua sạch tiền tại sòng bạc J Corp, phải vay nóng Syndicate và đang tạm trốn tại một nhà trọ giá rẻ.`,
          en: `[Alley Dispatch] ${friend.nameEn} lost their purse at a J Corp casino, borrowing on high syndicate interest and lying low in a cheap tenement.`
        });
      } else {
        logs.push({
          vi: `[Tin khu phố] ${friend.nameVi} bị ho dữ dội do khói bụi công nghiệp nồng nặc; bạn gửi sang một lọ thuốc an thần để xoa dịu cơn đau.`,
          en: `[Alley Dispatch] ${friend.nameEn} suffers coughing fits from industrial smog; you sent over a bottle of sedatives to soothe the pain.`
        });
      }
    }
  }

  // 2. Living Mentor Autonomous Life
  const mentor = char.npcs.mentor;
  if (mentor && !mentor.deceased && mentor.status === 'alive') {
    if (char.age >= 25 && rng() < 0.14) {
      logs.push({
        vi: `[Chỉ dạy của Sư Phụ] ${mentor.nameVi} gọi bạn tới uống trà lúc hoàng hôn, ngắm nhìn vết chém cũ trên tay và truyền thụ kinh nghiệm đối đầu sát thủ Shi.`,
        en: `[Mentor’s Teachings] ${mentor.nameEn} summoned you for twilight tea, reflecting on old battle scars and sharing tactical poise against Shi assassins.`
      });
      if (mentor.bond) mentor.bond = Math.min(100, mentor.bond + 2);
    }
  }

  // 3. Living Spouse Autonomous Life
  const spouse = char.npcs.spouse;
  if (spouse && !spouse.deceased && spouse.status === 'alive' && char.flags.includes('Married')) {
    if (rng() < 0.15) {
      logs.push({
        vi: `[Tổ ấm Backstreets] ${spouse.nameVi} thắp một ngọn nến thơm tự chế bên bàn ăn, chuẩn bị bữa tối nóng hổi xua tan giá lạnh sau một ca làm việc dài.`,
        en: `[Backstreet Hearth] ${spouse.nameEn} lit a fragrant homemade candle by the table, serving a hot meal that drove away the bone-chilling frost of your long shift.`
      });
      if (char.stats) char.stats.sanity = Math.min(100, (char.stats.sanity || 50) + 4);
    }
  }

  return logs;
}
