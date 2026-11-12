/**
 * Project Moon - Narrative Arc Engine & Emotional Wave Orchestrator
 * Upgrades the AI Director with:
 * 1. Multi-Stage Narrative Arcs (State Machine for long-term multi-chapter sagas)
 * 2. Emotional Wave & Sine Pacing (Alternating between Bittersweet Respite & Reality Shocks)
 * 3. NPC Autonomous Life Drama (Dynamic life events triggered by living companion traits)
 */

import { normalize, ResponseCurves } from './utilityCurves.js';
import { npcIsActive, woundByShield } from './eventConditions.js';
import { ensureNpcAgency, rollNpcCareer, appendNpcMemory, getNpcAge } from '../data/npcPersonality.js';

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
      { stage: 2, eventId: 'syn_middle_cousin_retaliation', titleVi: 'Leo thang: Nợ máu đòi máu tại xưởng rèn' },
      { stage: 3, eventId: 'syn_middle_promo_big_sibling', titleVi: 'Đỉnh điểm: Đại khảo thí phong Big Brother', waitsForGate: true }
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
  },

  // --- ARC 7: ELDER SYNDICATE TWILIGHT SUCCESSION ---
  {
    id: 'arc_syndicate_twilight_succession',
    nameVi: 'Hoàng Hôn Ngầm · Chuyển Giao Quyền Bính',
    nameEn: 'Underworld Twilight · The Succession Ledger',
    triggerNeed: { jobs: ['Syndicate'] },
    stages: [
      { stage: 1, eventId: 'elder_syndicate_old_lieutenant_return', titleVi: 'Khởi điểm: Phó tướng năm xưa quay về' },
      { stage: 2, eventId: 'elder_syndicate_blood_ledger_reckoning', titleVi: 'Leo thang: Thanh toán cuốn sổ nợ máu' },
      { stage: 3, eventId: 'elder_syndicate_dynasty_seal', titleVi: 'Đỉnh điểm: Dấu ấn truyền ngôi đêm sương', waitsForGate: true }
    ]
  },

  // --- ARC 8: DISTORTION METAMORPHOSIS & ABYSSAL DOMAIN ---
  {
    id: 'arc_distortion_metamorphosis_domain',
    nameVi: 'Hóa Thân Dị Thể · Lãnh Địa Vực Sâu',
    nameEn: 'Metamorphosis of the Distortion · Abyssal Domain',
    triggerNeed: { flags: ['Distorted'] },
    stages: [
      { stage: 1, eventId: 'distort_arc_archetype_divergence', titleVi: 'Khởi điểm: Ba hình thái của tiếng vọng' },
      { stage: 2, eventId: 'distort_arc_lcd_moses_inspection', titleVi: 'Leo thang: Làn khói tẩu của Moses' },
      { stage: 3, eventId: 'distort_arc_elder_hibernation_monolith', titleVi: 'Đỉnh điểm: Tượng đài ngủ đông giữa sương mù', waitsForGate: true }
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

  const scheduleNextStage = (arc, def) => {
    const stage = def.stages.find((entry) => entry.stage === arc.currentStage);
    if (!stage) return;
    const pending = char.weaver?.pendingThreads || [];
    if (pending.some((thread) => !thread.fulfilled && thread.eventId === stage.eventId)) return;
    const waitsForGate = Boolean(
      stage.waitsForGate ||
      stage.stage >= 3 ||
      stage.eventId.includes('_promo_') ||
      stage.eventId === 'hana_color_ascension_trial'
    );
    char.weaver = {
      ...char.weaver,
      pendingThreads: [...pending, {
        id: `arc_${arc.id}_${stage.stage}_${char.age}`,
        eventId: stage.eventId,
        kind: 'major',
        arcId: arc.id,
        arcStage: stage.stage,
        waitsForGate,
        plantedAtAge: char.age,
        triggerAge: char.age + 1,
        reasonVi: `${def.nameVi}: hồi ${stage.stage}/${def.stages.length}`,
        reasonEn: `${def.nameEn}: chapter ${stage.stage}/${def.stages.length}`,
        fulfilled: false
      }]
    };
  };

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
      } else scheduleNextStage(arc, def);
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
      scheduleNextStage(char.activeArcs[char.activeArcs.length - 1], def);
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
 * What certain people do when the relationship has run long enough. These callbacks exist in the
 * data but no choice plants them, because nobody can know in advance who will stay close, so the
 * bond itself schedules them.
 */
const NPC_RETURNS = [
  {
    id: 'csq_npc_sworn_rescue', roles: ['partner', 'friend'], minBond: 65, minAge: 20, chance: 0.16, delay: 1,
    reasonVi: (n) => `${n.nameVi} đã đứng cạnh bạn đủ lâu để không cần được nhờ`,
    reasonEn: (n) => `${n.nameEn} has stood by you long enough not to need asking`
  },
  {
    id: 'csq_npc_mentor_duel', roles: ['mentor'], minBond: 50, minAge: 28, chance: 0.07, delay: 2,
    reasonVi: (n) => `${n.nameVi} muốn biết bạn đã đi xa tới đâu`,
    reasonEn: (n) => `${n.nameEn} wants to know how far you have come`
  },
  {
    id: 'csq_npc_rival_reckoning', roles: ['nemesis', 'rival'], minAge: 22, chance: 0.08, delay: 2,
    reasonVi: (n) => `${n.nameVi} vẫn nhớ món nợ giữa hai người`,
    reasonEn: (n) => `${n.nameEn} still remembers what lies between you`
  }
];

function scheduleNpcReturns(char, rng) {
  const pending = char.weaver?.pendingThreads || [];
  const seen = char.seenEvents || [];
  const added = [];
  for (const rule of NPC_RETURNS) {
    if (seen.includes(rule.id) || pending.some((th) => th.eventId === rule.id && !th.fulfilled)) continue;
    if ((char.age ?? 0) < rule.minAge) continue;
    const npc = rule.roles.map((role) => char.npcs?.[role]).find((n) => npcIsActive(n) && (n.bond ?? 35) >= (rule.minBond ?? 0));
    if (!npc || rng() >= rule.chance) continue;
    added.push({
      id: `thr_${char.age}_${rule.id}`,
      kind: 'major',
      eventId: rule.id,
      plantedAtAge: char.age,
      triggerAge: char.age + rule.delay,
      reasonVi: rule.reasonVi(npc),
      reasonEn: rule.reasonEn(npc),
      fulfilled: false
    });
  }
  if (added.length) char.weaver = { ...char.weaver, pendingThreads: [...pending, ...added] };
}

export const FRIEND_NEWS_BY_JOB = {
  Fixer: [
    {
      id: 'fixer_contract',
      bondDelta: 3,
      vi: (n) => `[Tin khu phố] ${n.nameVi} vừa ký hợp đồng dài hạn với một Văn phòng Fixer độc lập và gửi tặng bạn bao thuốc lá Backstreets ăn mừng.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} signed an operative contract with an independent Fixer Office and sent a pack of Backstreet cigarettes in celebration.`
    },
    {
      id: 'fixer_escort',
      bondDelta: 2,
      vi: (n) => `[Tin khu phố] ${n.nameVi} vừa hoàn tất chuyến hộ tống hàng qua District lân cận, tiện đường ghé để lại cho bạn phần lương khô dự trữ.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} finished a cross-District caravan escort and dropped off spare field rations at your door.`
    },
    {
      id: 'fixer_wound',
      bondDelta: 1,
      vi: (n) => `[Tin khu phố] ${n.nameVi} trở về sau vụ ủy thác vùng ven với vết chém sượt qua bả vai; bạn gửi sang cuộn băng gạc sạch kèm thuốc sát trùng.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} returned from an outskirts commission with a grazed shoulder; you sent over clean bandages and antiseptic.`
    }
  ],
  'Wing Employee': [
    {
      id: 'wing_audit',
      bondDelta: 3,
      vi: (n) => `[Tin khu phố] ${n.nameVi} vừa vượt qua đợt kiểm toán định kỳ trong Wing, gửi thư tay kèm hộp trà Nest mời bạn dùng thử.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} cleared a quarterly Wing audit and sent a handwritten note with a tin of Nest tea.`
    },
    {
      id: 'wing_overtime',
      bondDelta: 2,
      vi: (n) => `[Tin khu phố] ${n.nameVi} phải trực thông ba ca liền tại bộ phận của Wing; bạn gửi sang lọ thuốc bổ thần kinh giúp họ cầm cự qua tuần cao điểm.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} worked three consecutive shifts in their Wing department; you sent nerve tonics to help them through the crunch.`
    },
    {
      id: 'wing_voucher',
      bondDelta: 2,
      vi: (n) => `[Tin khu phố] ${n.nameVi} tận dụng hạn mức nhân viên Wing để chuyển cho bạn tấm phiếu mua nhu yếu phẩm miễn thuế.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} used their Wing staff quota to pass along a tax-exempt supply voucher for you.`
    }
  ],
  Syndicate: [
    {
      id: 'syn_turf',
      bondDelta: 3,
      vi: (n) => `[Tin khu phố] ${n.nameVi} vừa đứng ra thu xếp êm xuôi vụ tranh chấp địa bàn cho nhánh Syndicate, gửi biếu bạn chai rượu mạnh chiến lợi phẩm.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} settled a turf dispute for their Syndicate branch and sent you a bottle of strong liquor from the spoils.`
    },
    {
      id: 'syn_laylow',
      bondDelta: 1,
      vi: (n) => `[Tin khu phố] ${n.nameVi} đang tạm lánh mặt vài tuần ở nhà trọ ngoại vi sau đợt va chạm giữa các băng đảng ngõ hẻm.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} is lying low at a perimeter boarding house for a few weeks after a clash between alley gangs.`
    },
    {
      id: 'syn_tip',
      bondDelta: 2,
      vi: (n) => `[Tin khu phố] ${n.nameVi} nhắn bạn tránh xa khu chợ đêm cuối tuần này vì nhánh Syndicate của họ sắp mở đợt thu sổ nợ.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} tipped you off to avoid the night market this weekend ahead of their Syndicate's ledger collection.`
    }
  ],
  'Workshop Artisan': [
    {
      id: 'ws_blueprint',
      bondDelta: 3,
      vi: (n) => `[Tin khu phố] ${n.nameVi} vừa được Tres Association duyệt bản mẫu linh kiện mới tại Workshop, gửi tặng bạn con dao găm tự rèn để kỷ niệm.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} had a new component prototype certified by Tres Association and gifted you a hand-forged dagger.`
    },
    {
      id: 'ws_fumes',
      bondDelta: 2,
      vi: (n) => `[Tin khu phố] ${n.nameVi} bị ho khan vì hít khói hàn kim loại suốt nhiều đêm trong xưởng; bạn gửi sang lọ thuốc dịu phổi.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} caught a dry cough from breathing welding fumes all week; you sent over a bottle of lung-soothing syrup.`
    },
    {
      id: 'ws_scrap',
      bondDelta: 2,
      vi: (n) => `[Tin khu phố] ${n.nameVi} thu mua được lô thép tốt từ bãi phế liệu vùng ven và nhắn sẽ ưu tiên bảo dưỡng đồ nghề cho bạn.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} acquired a batch of high-grade steel from the perimeter yards and offered to tune up your gear first.`
    }
  ],
  Civilian: [
    {
      id: 'civ_rent',
      bondDelta: 3,
      vi: (n) => `[Tin khu phố] ${n.nameVi} vừa xoay xở trả xong tiền thuê mặt bằng quý này ở Backstreets, gửi biếu bạn suất ăn nóng mừng qua cơn túng thiếu.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} paid off their quarterly Backstreets stall rent and sent you a hot meal to celebrate getting through the lean month.`
    },
    {
      id: 'civ_casino',
      bondDelta: 0,
      vi: (n) => `[Tin khu phố] ${n.nameVi} lỡ thua sạch tiền tại sòng bạc J Corp, phải vay nóng Syndicate và đang tạm trốn tại một nhà trọ giá rẻ.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} lost their purse at a J Corp casino, borrowing on high syndicate interest and lying low in a cheap tenement.`
    },
    {
      id: 'civ_smog',
      bondDelta: 1,
      vi: (n) => `[Tin khu phố] ${n.nameVi} bị ho dữ dội do khói bụi công nghiệp nồng nặc; bạn gửi sang một lọ thuốc an thần để xoa dịu cơn đau.`,
      en: (n) => `[Alley Dispatch] ${n.nameEn} suffers coughing fits from industrial smog; you sent over a bottle of sedatives to soothe the pain.`
    }
  ]
};

export function simulateNpcAutonomousLife(char, rng = Math.random) {
  const logs = [];
  if (!char.npcs) return logs;

  // 1. Childhood Friend Autonomous Life (Bond-aware: camaraderie vs. friction/clash)
  if (npcIsActive(char.npcs.friend)) {
    const friend = ensureNpcAgency(char.npcs.friend, rng, {
      age: getNpcAge(char, char.npcs.friend),
      regionId: char.regionId
    });
    char.npcs.friend = friend;
    const friendAge = getNpcAge(char, friend);

    if (friendAge >= 18 && (friend.job === 'Child' || friend.job === 'Apprentice')) {
      const adultCareer = friend.adultCareer || rollNpcCareer(friend.archetype || 'loyal', 'friend', rng, {
        age: friendAge,
        district: friend.district || char.regionId,
        nest: friend.nest
      });
      friend.job = adultCareer.job;
      friend.rank = adultCareer.rank;
      friend.rankLabelVi = adultCareer.rankLabelVi;
      friend.rankLabelEn = adultCareer.rankLabelEn;
      if (adultCareer.corpId) friend.corpId = adultCareer.corpId;
      if (adultCareer.finger) friend.finger = adultCareer.finger;
      friend.memories = appendNpcMemory(friend.memories, {
        age: char.age ?? 18,
        vi: `Năm ${char.age ?? 18} tuổi: Trưởng thành và bắt đầu mưu sinh với nghề ${adultCareer.rankLabelVi}.`,
        en: `Age ${char.age ?? 18}: Came of age and began working as ${adultCareer.rankLabelEn}.`,
        pinned: true
      });
    }

    const fBond = friend.bond ?? 35;
    if (friendAge >= 18 && rng() < 0.14) {
      if (fBond < 24) {
        if (rng() < 0.5) {
          const prevSp = char.stats?.sanity ?? 50;
          const nextSp = Math.max(0, prevSp - 4);
          if (char.stats) char.stats.sanity = nextSp;
          const d = nextSp - prevSp;
          logs.push({
            vi: `[Va chạm ngõ hẻm] ${friend.nameVi} chạm mặt bạn ở quán rượu Backstreets. Rượu rẻ tiền làm bùng lên những bất mãn tích tụ; hai người lời qua tiếng lại đến mức rút vũ khí găm vào mặt bàn trước khi khách xung quanh kịp can ngăn.`,
            en: `[Alley Altercation] ${friend.nameEn} crossed paths with you in a Backstreet tavern. Cheap liquor ignited festering grievances; the argument escalated until blades were driven into the tabletop before patrons pulled you apart.`,
            ...(d ? { deltas: [{ k: 'sanity', v: d, unit: 'SP' }] } : {})
          });
          friend.bond = Math.max(0, fBond - 4);
        } else {
          const prevRep = char.stats?.rep ?? 0;
          const nextRep = Math.max(0, prevRep - 3);
          if (char.stats) char.stats.rep = nextRep;
          const d = nextRep - prevRep;
          logs.push({
            vi: `[Tin đồn bất lợi] ${friend.nameVi} công khai phàn nàn với các môi giới trong vùng rằng bạn là kẻ tính toán chỉ biết giữ mạng mình, khiến uy tín của bạn sứt mẻ ít nhiều.`,
            en: `[Hostile Rumor] ${friend.nameEn} openly complained to local brokers that you only ever look out for your own skin, chipping away at your standing in the district.`,
            ...(d ? { deltas: [{ k: 'rep', v: d, unit: 'Rep' }] } : {})
          });
        }
      } else if (friend.lastNewsAge == null || (char.age ?? 0) - friend.lastNewsAge >= 3) {
        friend.lastSeen = char.age;
        friend.lastNewsAge = char.age ?? 0;

        if (friend.pendingCareerSwitch) {
          const nextJob = friend.job === 'Fixer' ? 'Workshop Artisan' : 'Fixer';
          friend.pendingCareerSwitch = false;
          friend.job = nextJob;
          friend.rank = nextJob === 'Fixer' ? 8 : 1;
          friend.rankLabelVi = nextJob === 'Fixer' ? 'Fixer Grade 8' : 'Thợ chế tác Workshop';
          friend.rankLabelEn = nextJob === 'Fixer' ? 'Grade 8 Fixer' : 'Workshop Artisan';
          friend.lastNewsId = `switch_${nextJob}`;
          friend.memories = appendNpcMemory(friend.memories, {
            age: char.age ?? 0,
            vi: `Năm ${char.age ?? 0} tuổi: Rẽ hướng sang nghề ${friend.rankLabelVi}.`,
            en: `Age ${char.age ?? 0}: Switched career path to ${friend.rankLabelEn}.`
          });
          logs.push({
            vi: `[Ngã rẽ sự nghiệp] ${friend.nameVi} quyết định gác lại công việc cũ để chuyển sang làm ${friend.rankLabelVi}, nhắn bạn hôm nào rảnh ghé qua uống chén rượu mừng khởi đầu mới.`,
            en: `[Career Turn] ${friend.nameEn} left their old line of work to become a ${friend.rankLabelEn}, inviting you for a drink to celebrate the fresh start.`
          });
        } else {
          const jobKey = FRIEND_NEWS_BY_JOB[friend.job] ? friend.job : 'Civilian';
          const pool = FRIEND_NEWS_BY_JOB[jobKey].filter((item) => item.id !== friend.lastNewsId);
          const candidates = pool.length > 0 ? pool : FRIEND_NEWS_BY_JOB[jobKey];
          const chosen = candidates[Math.floor(rng() * candidates.length) % candidates.length];
          friend.lastNewsId = chosen.id;
          if (chosen.bondDelta) {
            friend.bond = Math.min(100, fBond + chosen.bondDelta);
          }
          logs.push({
            vi: chosen.vi(friend),
            en: chosen.en(friend)
          });
        }
      }
    }
  }

  // 2. Combat Partner Autonomous Life (Synergy vs. Friction)
  if (npcIsActive(char.npcs.partner)) {
    const partner = ensureNpcAgency(char.npcs.partner, rng, {
      age: getNpcAge(char, char.npcs.partner),
      regionId: char.regionId
    });
    char.npcs.partner = partner;
    const pBond = partner.bond ?? 35;
    if ((char.age ?? 0) >= 19 && rng() < 0.15) {
      if (pBond < 26) {
        logs.push({
          vi: `[Rạn nứt tác chiến] ${partner.nameVi} tự ý giữ lại một phần đạn dược và thông tin tình báo sau ca tuần tra chung, buông lời lạnh nhạt rằng ai cũng phải tự lo đường lui ở The City.`,
          en: `[Tactical Friction] ${partner.nameEn} withheld spare ammunition and recon notes after a joint patrol, remarking coldly that everyone in The City needs their own exit plan.`
        });
        partner.bond = Math.max(0, pBond - 3);
      } else if (pBond >= 65) {
        const prevHp = char.stats?.health ?? 50;
        const nextHp = Math.min(100, prevHp + 3);
        if (char.stats) char.stats.health = nextHp;
        const d = nextHp - prevHp;
        logs.push({
          vi: `[Đồng đội ăn ý] ${partner.nameVi} thức trắng đêm mài chỉnh lại vũ khí và bọc lại giáp vai cho bạn trước mùa hợp đồng mới.`,
          en: `[Trusted Wingman] ${partner.nameEn} stayed up all night recalibrating your weapon balance and reinforcing your pauldron straps ahead of the new contract season.`,
          ...(d ? { deltas: [{ k: 'health', v: d, unit: 'HP' }] } : {})
        });
        partner.lastSeen = char.age;
      }
    }
  }

  // 3. Living Mentor Autonomous Life
  if (npcIsActive(char.npcs.mentor)) {
    const mentor = ensureNpcAgency(char.npcs.mentor, rng, {
      age: getNpcAge(char, char.npcs.mentor),
      regionId: char.regionId
    });
    char.npcs.mentor = mentor;
    const mBond = mentor.bond ?? 35;
    if ((char.age ?? 0) >= 25 && rng() < 0.14) {
      if (mBond < 24) {
        mentor.rebukeCount = (mentor.rebukeCount || 0) + 1;
        const prevSp = char.stats?.sanity ?? 50;
        const nextSp = Math.max(0, prevSp - 3);
        if (char.stats) char.stats.sanity = nextSp;
        const d = nextSp - prevSp;
        if (mentor.rebukeCount >= 3) {
          mentor.status = 'estranged';
          mentor.statusChangedAge = char.age ?? 0;
          mentor.memories = appendNpcMemory(mentor.memories, {
            age: char.age ?? 0,
            vi: `Năm ${char.age ?? 0} tuổi: Sư phụ chính thức cắt đứt quan hệ thầy trò sau nhiều năm thất vọng.`,
            en: `Age ${char.age ?? 0}: Mentor severed ties after years of disappointment.`,
            pinned: true
          });
          logs.push({
            vi: `[Đoạn tuyệt thầy trò] ${mentor.nameVi} đặt lại kỷ vật cũ lên bàn rồi quay lưng bước đi dứt khoát. Sau nhiều lần cảnh cáo không thành, người thầy năm xưa chính thức cắt đứt quan hệ với bạn.`,
            en: `[Severed Mentorship] ${mentor.nameEn} set their old keepsake on the table and walked away for good. After repeated unheeded warnings, your former mentor severed all ties with you.`,
            ...(d ? { deltas: [{ k: 'sanity', v: d, unit: 'SP' }] } : {})
          });
        } else {
          logs.push({
            vi: `[Lời trách của Sư Phụ] ${mentor.nameVi} nhìn cách bạn xuống tay trong các vụ việc gần đây rồi lắc đầu bỏ đi, nói rằng bạn đã quên mất giới hạn tối thiểu của nghề.`,
            en: `[Mentor’s Rebuke] ${mentor.nameEn} watched how you handled recent affairs and walked away shaking their head, saying you have forgotten the craft's bare minimum restraint.`,
            ...(d ? { deltas: [{ k: 'sanity', v: d, unit: 'SP' }] } : {})
          });
        }
      } else {
        mentor.rebukeCount = 0;
        logs.push({
          vi: `[Chỉ dạy của Sư Phụ] ${mentor.nameVi} gọi bạn tới uống trà lúc hoàng hôn, ngắm nhìn vết chém cũ trên tay và truyền thụ kinh nghiệm đối đầu sát thủ Shi.`,
          en: `[Mentor’s Teachings] ${mentor.nameEn} summoned you for twilight tea, reflecting on old battle scars and sharing tactical poise against Shi assassins.`
        });
        mentor.bond = Math.min(100, mBond + 2);
        mentor.lastSeen = char.age;
      }
    }
  }

  // 4. Living Spouse Autonomous Life
  if (npcIsActive(char.npcs.spouse) && char.flags?.includes('Married')) {
    const spouse = ensureNpcAgency(char.npcs.spouse, rng, {
      age: getNpcAge(char, char.npcs.spouse),
      regionId: char.regionId
    });
    char.npcs.spouse = spouse;
    const sBond = spouse.bond ?? 45;
    if (rng() < 0.15) {
      if (sBond < 25) {
        const prevSp = char.stats?.sanity ?? 50;
        const nextSp = Math.max(0, prevSp - 4);
        if (char.stats) char.stats.sanity = nextSp;
        const d = nextSp - prevSp;
        logs.push({
          vi: `[Căn hộ lạnh lẽo] Bạn trở về nhà lúc nửa đêm; ${spouse.nameVi} đã khóa cửa phòng ngủ từ sớm, trên bàn chỉ còn tờ hóa đơn tiền điện nước đặt cạnh phần cơm nguội ngắt.`,
          en: `[Cold Apartment] You returned home at midnight; ${spouse.nameEn} had locked the bedroom door hours ago, leaving only an unpaid utility bill beside a plate of cold rice.`,
          ...(d ? { deltas: [{ k: 'sanity', v: d, unit: 'SP' }] } : {})
        });
      } else {
        const prevSp = char.stats?.sanity ?? 50;
        const nextSp = Math.min(100, prevSp + 4);
        if (char.stats) char.stats.sanity = nextSp;
        const d = nextSp - prevSp;
        logs.push({
          vi: `[Tổ ấm Backstreets] ${spouse.nameVi} thắp một ngọn nến thơm tự chế bên bàn ăn, chuẩn bị bữa tối nóng hổi xua tan giá lạnh sau một ca làm việc dài.`,
          en: `[Backstreet Hearth] ${spouse.nameEn} lit a fragrant homemade candle by the table, serving a hot meal that drove away the bone-chilling frost of your long shift.`,
          ...(d ? { deltas: [{ k: 'sanity', v: d, unit: 'SP' }] } : {})
        });
      }
    }
  }

  // 5. Active Nemesis Shadow Harassment
  if (npcIsActive(char.npcs.nemesis) && rng() < 0.14) {
    const nemesis = ensureNpcAgency(char.npcs.nemesis, rng, {
      age: getNpcAge(char, char.npcs.nemesis),
      regionId: char.regionId
    });
    char.npcs.nemesis = nemesis;
    nemesis.harassCount = (nemesis.harassCount || 0) + 1;
    const prevSp = char.stats?.sanity ?? 50;
    const nextSp = Math.max(0, prevSp - 3);
    if (char.stats) char.stats.sanity = nextSp;
    const d = nextSp - prevSp;
    if (nemesis.harassCount >= 3 && !nemesis.reckoningPlanted) {
      nemesis.reckoningPlanted = true;
      const pending = char.weaver?.pendingThreads || [];
      if (!pending.some((t) => !t.fulfilled && t.eventId === 'csq_npc_rival_reckoning')) {
        char.weaver = {
          ...char.weaver,
          pendingThreads: [
            ...pending,
            {
              id: `thr_nemesis_reckoning_${char.age ?? 0}`,
              kind: 'major',
              eventId: 'csq_npc_rival_reckoning',
              plantedAtAge: char.age ?? 0,
              triggerAge: (char.age ?? 0) + 1,
              reasonVi: `Mối thù với ${nemesis.nameVi} đã lên tới đỉnh điểm`,
              reasonEn: `Your blood feud with ${nemesis.nameEn} reached its boiling point`,
              fulfilled: false
            }
          ]
        };
      }
      logs.push({
        vi: `[Thù hận chạm đỉnh] ${nemesis.nameVi} không còn dừng lại ở những vết dao cảnh cáo. Tin tức từ ngõ hẻm báo về rằng kẻ thù cũ đã gom đủ nhân thủ để chuẩn bị một cuộc thanh toán sòng phẳng với bạn.`,
        en: `[Vendetta Boiling Point] ${nemesis.nameEn} is done leaving warning marks. Word from the alleys says your nemesis has gathered muscle to settle the score in blood.`,
        ...(d ? { deltas: [{ k: 'sanity', v: d, unit: 'SP' }] } : {})
      });
    } else {
      logs.push({
        vi: `[Bóng ma phản bội] Bạn phát hiện ký hiệu quen thuộc của ${nemesis.nameVi} vạch bằng mũi dao ngay trên hộp thư trước cửa. Kẻ từng đi bên cạnh bạn vẫn đang rình rập chờ thời cơ.`,
        en: `[Shadow of Betrayal] You found ${nemesis.nameEn}'s familiar knife-mark scratched into your doorway postbox. Your former companion is still stalking your movements.`,
        ...(d ? { deltas: [{ k: 'sanity', v: d, unit: 'SP' }] } : {})
      });
    }
  }

  // 6. Dynamic Career Progression & Crisis Tracking
  for (const [role, rawNpc] of Object.entries(char.npcs)) {
    if (!npcIsActive(rawNpc)) continue;
    const npcAge = getNpcAge(char, rawNpc);
    const npc = ensureNpcAgency(rawNpc, rng, { age: npcAge, regionId: char.regionId });
    char.npcs[role] = npc;

    if ((role === 'child' || role === 'ward') && npcAge >= 18 && (npc.job === 'Apprentice' || npc.job === 'Child')) {
      const adultCareer = npc.adultCareer || rollNpcCareer(npc.archetype || 'loyal', 'friend', rng, {
        age: npcAge,
        district: npc.district || char.regionId,
        nest: npc.nest
      });
      npc.job = adultCareer.job;
      npc.rank = adultCareer.rank;
      npc.rankLabelVi = adultCareer.rankLabelVi;
      npc.rankLabelEn = adultCareer.rankLabelEn;
      if (adultCareer.corpId) npc.corpId = adultCareer.corpId;
      if (adultCareer.finger) npc.finger = adultCareer.finger;
      npc.memories = appendNpcMemory(npc.memories, {
        age: char.age ?? 18,
        vi: `Năm ${char.age ?? 18} tuổi: Đủ 18 tuổi và bắt đầu tự lập với nghề ${adultCareer.rankLabelVi}.`,
        en: `Age ${char.age ?? 18}: Turned 18 and began working independently as ${adultCareer.rankLabelEn}.`,
        pinned: true
      });
    }

    // Career Promotion roll (adults only)
    const promoRoll = rng();
    if (promoRoll < 0.10 && npcAge >= 18) {
      if (npc.job === 'Fixer' && (npc.rank > 4 || (npc.rank > 2 && (char.age ?? 20) >= 28 && promoRoll < 0.05))) {
        npc.rank -= 1;
        npc.rankLabelVi = `Fixer Grade ${npc.rank}`;
        npc.rankLabelEn = `Grade ${npc.rank} Fixer`;
        const memVi = `Năm ${char.age ?? 0} tuổi: Thăng cấp lên Fixer Grade ${npc.rank} sau kỳ khảo thí của Hana.`;
        const memEn = `Age ${char.age ?? 0}: Promoted to Grade ${npc.rank} Fixer through Hana Association exam.`;
        npc.memories = appendNpcMemory(npc.memories, { age: char.age ?? 0, vi: memVi, en: memEn });
        logs.push({
          vi: `[Tin vui thăng cấp] ${npc.nameVi} vừa vượt qua kỳ sát hạch gắt gao của Hiệp hội Hana, chính thức thăng tiến lên Fixer Grade ${npc.rank}.`,
          en: `[Promotion Dispatch] ${npc.nameEn} passed the rigorous Hana Association exam, officially promoted to Grade ${npc.rank} Fixer.`
        });
      } else if (npc.job === 'Wing Employee' && npc.rank < 3) {
        npc.rank += 1;
        const rankTitlesVi = ['Thử việc', 'Chính thức', 'Trưởng phòng', 'Giám đốc bộ phận'];
        const rankTitlesEn = ['Probationary', 'Staff Member', 'Department Lead', 'Branch Director'];
        const corpMatch = `${npc.rankLabelVi || ''} ${npc.rankLabelEn || ''}`.match(/\b([A-Z])\s+Corp\b/);
        const corpId = npc.corpId || (corpMatch ? corpMatch[1] : 'K');
        npc.corpId = corpId;
        npc.rankLabelVi = `${corpId} Corp ${rankTitlesVi[npc.rank] || 'Cán bộ'}`;
        npc.rankLabelEn = `${corpId} Corp ${rankTitlesEn[npc.rank] || 'Feather'}`;
        const memVi = `Năm ${char.age ?? 0} tuổi: Được bổ nhiệm vị trí ${rankTitlesVi[npc.rank]} tại ${corpId} Corp.`;
        const memEn = `Age ${char.age ?? 0}: Appointed to ${rankTitlesEn[npc.rank]} inside ${corpId} Corp.`;
        npc.memories = appendNpcMemory(npc.memories, { age: char.age ?? 0, vi: memVi, en: memEn });
        logs.push({
          vi: `[Bổ nhiệm Tập đoàn] ${npc.nameVi} vừa được thăng chức lên ${rankTitlesVi[npc.rank]} tại ${corpId} Corp; họ gửi thư mời bạn uống một tách trà từ Nest.`,
          en: `[Corporate Promotion] ${npc.nameEn} was promoted to ${rankTitlesEn[npc.rank]} at ${corpId} Corp, inviting you to share tea from the Nest.`
        });
      } else if (npc.job === 'Syndicate' && (npc.rank ?? 1) < 3) {
        npc.rank = (npc.rank ?? 1) + 1;
        const fingerMatch = `${npc.rankLabelVi || ''} ${npc.rankLabelEn || ''}`.match(/The\s+(Thumb|Index|Middle|Ring|Pinky)/i);
        const finger = npc.finger || (fingerMatch ? fingerMatch[1] : null);
        const synTitlesVi = {
          2: finger ? `Đội trưởng The ${finger}` : 'Đội trưởng Syndicate',
          3: finger ? `Cán bộ cấp cao The ${finger}` : 'Thủ lĩnh nhánh Syndicate'
        };
        const synTitlesEn = {
          2: finger ? `The ${finger} Enforcer Captain` : 'Syndicate Captain',
          3: finger ? `The ${finger} Underboss` : 'Syndicate Lieutenant'
        };
        npc.rankLabelVi = synTitlesVi[npc.rank];
        npc.rankLabelEn = synTitlesEn[npc.rank];
        const memVi = `Năm ${char.age ?? 0} tuổi: Vươn lên vị trí ${npc.rankLabelVi} trong giới ngầm.`;
        const memEn = `Age ${char.age ?? 0}: Rose to ${npc.rankLabelEn} in the underworld.`;
        npc.memories = appendNpcMemory(npc.memories, { age: char.age ?? 0, vi: memVi, en: memEn });
        logs.push({
          vi: `[Thăng tiến ngầm] Sau nhiều cuộc tranh giành địa bàn đẫm máu, ${npc.nameVi} đã vươn lên làm ${npc.rankLabelVi} và gửi người mang quà biếu tới tận nhà bạn.`,
          en: `[Underworld Rise] After bloody turf wars, ${npc.nameEn} rose to become ${npc.rankLabelEn} and sent a courier with a gift to your door.`
        });
      } else if ((npc.job === 'Workshop Artisan' || npc.job === 'Workshop Craftsman') && (npc.rank ?? 1) < 3) {
        npc.rank = (npc.rank ?? 1) + 1;
        const wsTitlesVi = { 2: 'Thợ chính Workshop', 3: 'Meister trưởng xưởng' };
        const wsTitlesEn = { 2: 'Senior Workshop Artisan', 3: 'Workshop Meister' };
        npc.rankLabelVi = wsTitlesVi[npc.rank];
        npc.rankLabelEn = wsTitlesEn[npc.rank];
        const memVi = `Năm ${char.age ?? 0} tuổi: Được Tres công nhận bậc ${npc.rankLabelVi}.`;
        const memEn = `Age ${char.age ?? 0}: Certified by Tres as ${npc.rankLabelEn}.`;
        npc.memories = appendNpcMemory(npc.memories, { age: char.age ?? 0, vi: memVi, en: memEn });
        logs.push({
          vi: `[Danh tiếng Workshop] Tay nghề của ${npc.nameVi} ngày càng vang xa; họ vừa được công nhận là ${npc.rankLabelVi}.`,
          en: `[Workshop Renown] ${npc.nameEn}'s craftsmanship earned wide acclaim, elevating them to ${npc.rankLabelEn}.`
        });
      } else if ((npc.job === 'Civilian' || npc.job === 'Outcast') && (npc.rank ?? 0) < 2) {
        npc.rank = (npc.rank ?? 0) + 1;
        const civTitlesVi = { 1: 'Chủ cơ sở quen mặt khu phố', 2: 'Đầu mối giao dịch có tiếng vùng ven' };
        const civTitlesEn = { 1: 'Established Ward Proprietor', 2: 'Respected District Broker' };
        npc.rankLabelVi = civTitlesVi[npc.rank];
        npc.rankLabelEn = civTitlesEn[npc.rank];
        const memVi = `Năm ${char.age ?? 0} tuổi: Gây dựng chỗ đứng thành ${npc.rankLabelVi}.`;
        const memEn = `Age ${char.age ?? 0}: Built up standing as ${npc.rankLabelEn}.`;
        npc.memories = appendNpcMemory(npc.memories, { age: char.age ?? 0, vi: memVi, en: memEn });
        logs.push({
          vi: `[Làm ăn khấm khá] Nhờ tháo vát và biết giữ chữ tín ở Backstreets, ${npc.nameVi} nay đã trở thành ${npc.rankLabelVi}.`,
          en: `[Steady Livelihood] Through grit and street credibility, ${npc.nameEn} has established themselves as ${npc.rankLabelEn}.`
        });
      }
    } else if (role === 'friend' && npcAge >= 22 && promoRoll >= 0.96 && !npc.careerSwitchedOnce && !npc.pendingCareerSwitch) {
      npc.pendingCareerSwitch = true;
      npc.careerSwitchedOnce = true;
    }

    // Crisis tick, resolution at 100, and alert
    if (npc.crisis && npc.crisis.type !== 'none' && npc.crisis.severity > 0) {
      const nextSeverity = npc.crisis.severity + Math.floor(rng() * 10) + 6;
      if (nextSeverity >= 100) {
        const oldLabelVi = npc.crisis.labelVi || 'cơn khủng hoảng';
        const oldLabelEn = npc.crisis.labelEn || 'their crisis';
        npc.crisis = { type: 'none', severity: 0, labelVi: '', labelEn: '' };
        if ((npc.bond ?? 35) >= 15) {
          npc.bond = Math.max(6, (npc.bond ?? 35) - 5);
          Object.assign(npc, woundByShield(npc, char.age ?? 20));
          npc.memories = appendNpcMemory(npc.memories, {
            age: char.age ?? 0,
            vi: `Năm ${char.age ?? 0} tuổi: Tự mình trả giá đắt để vượt qua ${oldLabelVi} khi không có bạn ứng cứu.`,
            en: `Age ${char.age ?? 0}: Paid a heavy price alone to survive ${oldLabelEn} without your aid.`,
            pinned: true
          });
          logs.push({
            vi: `[Hệ lụy khủng hoảng] Không nhận được cứu viện kịp thời, ${npc.nameVi} phải tự trả giá bằng máu và thương tích để thoát khỏi ${oldLabelVi}. Họ giữ được mạng sống, nhưng ánh mắt nhìn bạn đã thêm một phần lạnh nhạt.`,
            en: `[Crisis Fallout] Without timely aid, ${npc.nameEn} paid in blood and wounds to survive ${oldLabelEn} alone. They lived, though a quiet chill now lingers between you.`
          });
        } else {
          npc.status = 'missing';
          npc.statusChangedAge = char.age ?? 0;
          npc.memories = appendNpcMemory(npc.memories, {
            age: char.age ?? 0,
            vi: `Năm ${char.age ?? 0} tuổi: Mất tích giữa đêm tối vì không gánh nổi ${oldLabelVi}.`,
            en: `Age ${char.age ?? 0}: Vanished into the night under the weight of ${oldLabelEn}.`,
            pinned: true
          });
          logs.push({
            vi: `[Đứt đoạn giữa đêm] Khủng hoảng từ ${oldLabelVi} vượt quá sức chịu đựng. Khi bạn ghé qua nơi ở của ${npc.nameVi}, căn phòng chỉ còn đống đồ đạc xáo trộn; họ đã biến mất không để lại lời nhắn nào.`,
            en: `[Vanished in the Night] The crushing weight of ${oldLabelEn} proved too much. When you checked ${npc.nameEn}'s quarters, only overturned furniture remained.`
          });
        }
      } else {
        npc.crisis.severity = nextSeverity;
        if (npc.crisis.severity >= 75 && rng() < 0.35) {
          if (npc.crisis.type === 'debt') {
            logs.push({
              vi: `[Báo động nợ máu] Toán đòi nợ của Syndicate đã bao vây khu trọ của ${npc.nameVi}. Họ cần bạn can thiệp gấp trước khi bị cắt ngón tay.`,
              en: `[Debt Crisis] Syndicate debt collectors surrounded ${npc.nameEn}’s lodgings. They urgently need your aid before fingers are severed.`
            });
          } else if (npc.crisis.type === 'distortion_risk') {
            logs.push({
              vi: `[Ám ảnh tâm trí] Bạn thoáng thấy ${npc.nameVi} đứng dưới mưa, ánh mắt vô hồn thì thầm câu hát của Carmen. Tinh thần của họ đang trên bờ vực sụp đổ.`,
              en: `[Mind Slip] You spotted ${npc.nameEn} standing in the rain, glassy-eyed and murmuring Carmen's verses. Their psyche is fracturing.`
            });
          } else if (npc.crisis.type === 'prosthetic') {
            logs.push({
              vi: `[Đào thải cơ khí] Các khớp nối sinh học trên người ${npc.nameVi} đang rỉ dịch đen và chập mạch liên tục. Họ cần tiền thay lõi cấp tốc trước khi liệt hoàn toàn.`,
              en: `[Prosthetic Failure] ${npc.nameEn}'s bionic joints are leaking black fluid and short-circuiting. They need an urgent core replacement before paralysis sets in.`
            });
          } else {
            logs.push({
              vi: `[Nguy biến cận kề] ${npc.nameVi} đang bị dồn vào chân tường vì ${npc.crisis.labelVi || 'hiểm họa ngầm'} và rất cần bạn đứng ra tiếp ứng.`,
              en: `[Mounting Peril] ${npc.nameEn} is cornered by ${npc.crisis.labelEn || 'escalating danger'} and urgently needs your backing.`
            });
          }
        }
      }
    } else if (rng() < 0.05 && npcAge >= 18 && (!npc.crisis || npc.crisis.type === 'none')) {
      if (['gambler', 'greedy'].includes(npc.archetype)) {
        npc.crisis = { type: 'debt', severity: 40, labelVi: 'Nợ nóng sòng bạc', labelEn: 'Gambling Debt' };
      } else if (['tinkerer', 'sickly', 'cook', 'caretaker'].includes(npc.archetype)) {
        npc.crisis = { type: 'prosthetic', severity: 40, labelVi: 'Hội chứng đào thải cơ khí', labelEn: 'Prosthetic Rejection' };
      } else if (['idealist', 'proud', 'artist', 'fixerfan'].includes(npc.archetype)) {
        npc.crisis = { type: 'distortion_risk', severity: 45, labelVi: 'Tiếng thì thầm của Carmen', labelEn: 'Whispers of Carmen' };
      } else if (['hothead', 'veteran', 'loyal'].includes(npc.archetype)) {
        npc.crisis = { type: 'feud', severity: 40, labelVi: 'Truy sát từ băng đảng thù địch', labelEn: 'Hostile Gang Vendetta' };
      } else if (['secretive', 'liar', 'devout'].includes(npc.archetype)) {
        npc.crisis = { type: 'hunted', severity: 40, labelVi: 'Quá khứ cũ bị lần ra dấu vết', labelEn: 'Tracked by Old Shadows' };
      } else if (['ambitious', 'nestdreamer', 'bookish'].includes(npc.archetype)) {
        npc.crisis = { type: 'audit', severity: 40, labelVi: 'Thanh tra kỷ luật truy xét hồ sơ', labelEn: 'Disciplinary Audit Investigation' };
      }
    }
  }

  if (char.job === 'Distortion' || char.flags?.includes('Distorted')) {
    logs.push(...reactNpcsToMajorTurn(char, 'distortion'));
  } else if (char.job === 'Syndicate') {
    logs.push(...reactNpcsToMajorTurn(char, 'syndicate'));
  } else if (char.job === 'Color Fixer' || char.isColorFixer || char.flags?.includes('ColorFixer')) {
    logs.push(...reactNpcsToMajorTurn(char, 'color'));
  }

  scheduleNpcReturns(char, rng);
  return logs;
}

const CLOSE_NPC_ROLES = ['friend', 'partner', 'mentor', 'spouse', 'lover', 'child', 'ward', 'mentee'];

function decideMilestoneReaction(npc, role, turnType) {
  const arch = npc.archetype || 'loyal';
  const bond = npc.bond ?? 35;
  if (turnType === 'distortion') {
    if (['loyal', 'caretaker', 'idealist', 'artist'].includes(arch) || bond >= 75 || ((role === 'spouse' || role === 'child') && bond >= 55)) return 'stay';
    if (['secretive', 'bookish', 'tinkerer', 'cook', 'sickly'].includes(arch) || bond >= 40) return 'secret_contact';
    return 'leave';
  }
  if (turnType === 'syndicate') {
    if (['gambler', 'greedy', 'hothead', 'loyal', 'veteran'].includes(arch) || npc.job === 'Syndicate' || bond >= 65) return 'stay';
    if (['secretive', 'liar', 'bookish', 'tinkerer', 'cook'].includes(arch) || (npc.job === 'Wing Employee' && bond >= 45) || bond >= 42) return 'secret_contact';
    return 'leave';
  }
  if (turnType === 'color') {
    if (['secretive', 'liar'].includes(arch) || npc.job === 'Syndicate') return 'secret_contact';
    if (['greedy', 'hothead'].includes(arch) && bond < 25) return 'leave';
    return 'stay';
  }
  return 'stay';
}

export function reactNpcsToMajorTurn(char, turnType) {
  const logs = [];
  if (!char?.npcs || !turnType) return logs;
  const age = char.age ?? 20;
  for (const role of CLOSE_NPC_ROLES) {
    const rawNpc = char.npcs[role];
    if (!npcIsActive(rawNpc)) continue;
    if (rawNpc.milestoneReactions?.[turnType]) continue;
    const npc = ensureNpcAgency(rawNpc, null, { age: getNpcAge(char, rawNpc), regionId: char.regionId });
    const reaction = decideMilestoneReaction(npc, role, turnType);
    npc.milestoneReactions = { ...(npc.milestoneReactions || {}), [turnType]: reaction };
    npc.lastMilestoneReaction = reaction;

    if (reaction === 'stay') {
      npc.bond = Math.min(100, (npc.bond ?? 35) + (turnType === 'color' ? 8 : 5));
      const line = turnType === 'distortion'
        ? {
            vi: `[Ở lại bên dị dạng] Dù hình hài bạn đã biến đổi, ${npc.nameVi} vẫn đặt tay lên vai bạn và chọn ở lại.`,
            en: `[By Your Side] Even after your form twisted into a Distortion, ${npc.nameEn} placed a hand on your shoulder and chose to stay.`
          }
        : turnType === 'syndicate'
          ? {
              vi: `[Đồng hành giới ngầm] Khi bạn bước vào hàng ngũ Syndicate, ${npc.nameVi} gật đầu chấp nhận và tiếp tục sát cánh cùng bạn.`,
              en: `[Underworld Camaraderie] When you joined the Syndicate ranks, ${npc.nameEn} nodded in acceptance and stood by your side.`
            }
          : {
              vi: `[Dưới ánh sắc hiệu] Ngày bạn nhận danh hiệu Color, ${npc.nameVi} nâng ly chúc mừng và tự hào đứng bên cạnh bạn.`,
              en: `[Under the Color Banner] On the day you received your Color title, ${npc.nameEn} raised a glass and stood proudly at your side.`
            };
      npc.memories = appendNpcMemory(npc.memories, { age, vi: line.vi, en: line.en, pinned: true });
      logs.push(line);
    } else if (reaction === 'secret_contact') {
      npc.secretContact = true;
      const line = turnType === 'distortion'
        ? {
            vi: `[Liên lạc trong bóng tối] ${npc.nameVi} không dám xuất hiện công khai bên một Distortion, nhưng vẫn lặng lẽ để lại ký hiệu và tiếp tế cho bạn ở hẻm vắng.`,
            en: `[Secret Contact] ${npc.nameEn} cannot be seen beside a Distortion in daylight, yet still leaves supplies and signals for you in quiet alleys.`
          }
        : turnType === 'syndicate'
          ? {
              vi: `[Giữ dây ngầm] Vì khác chiến tuyến khi bạn gia nhập Syndicate, ${npc.nameVi} chuyển sang gặp bạn lén lút qua các ngõ tối.`,
              en: `[Clandestine Line] Separated by faction lines after you joined the Syndicate, ${npc.nameEn} switched to meeting you in secret.`
            }
          : {
              vi: `[Tránh ánh nhìn Hana] Khi tên tuổi Color của bạn vang khắp các Quận, ${npc.nameVi} lui vào hậu trường và chỉ giữ liên lạc kín để không làm lộ cả hai.`,
              en: `[Out of Hana's Sight] With your Color title drawing eyes across the Districts, ${npc.nameEn} stepped into the shadows and kept only covert contact.`
            };
      npc.memories = appendNpcMemory(npc.memories, { age, vi: line.vi, en: line.en, pinned: true });
      logs.push(line);
    } else {
      npc.status = 'estranged';
      npc.statusChangedAge = age;
      const line = turnType === 'distortion'
        ? {
            vi: `[Quay lưng rời đi] Nhìn hình dáng không còn là người của bạn, ${npc.nameVi} lùi lại rồi cắt đứt mọi liên lạc.`,
            en: `[Turned Away] Seeing that your shape is no longer human, ${npc.nameEn} stepped back and severed all contact.`
          }
        : turnType === 'syndicate'
          ? {
              vi: `[Khác đường máu] Không chấp nhận con đường máu của Syndicate mà bạn đã chọn, ${npc.nameVi} nói lời từ biệt và rời khỏi đời bạn.`,
              en: `[Parting Ways] Refusing to follow the bloody Syndicate path you chose, ${npc.nameEn} said farewell and walked out of your life.`
            }
          : {
              vi: `[Cái bóng quá lớn] Khoảng cách giữa bạn và ${npc.nameVi} trở nên quá xa sau ngày bạn thành Color; họ lặng lẽ rút khỏi cuộc đời bạn.`,
              en: `[Eclipsed] The distance between you and ${npc.nameEn} grew too wide after you became a Color; they quietly withdrew from your life.`
            };
      npc.memories = appendNpcMemory(npc.memories, { age, vi: line.vi, en: line.en, pinned: true });
      logs.push(line);
    }
    char.npcs[role] = npc;
  }
  return logs;
}
