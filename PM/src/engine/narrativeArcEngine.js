/**
 * Project Moon - Narrative Arc Engine & Emotional Wave Orchestrator
 * Upgrades the AI Director with:
 * 1. Multi-Stage Narrative Arcs (State Machine for long-term multi-chapter sagas)
 * 2. Emotional Wave & Sine Pacing (Alternating between Bittersweet Respite & Reality Shocks)
 * 3. NPC Autonomous Life Drama (Dynamic life events triggered by living companion traits)
 */

import { normalize, ResponseCurves } from './utilityCurves.js';
import { npcIsActive } from './eventConditions.js';

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
    if ((char.age || 0) < rule.minAge) continue;
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

export function simulateNpcAutonomousLife(char, rng = Math.random) {
  const logs = [];
  if (!char.npcs) return logs;

  // 1. Childhood Friend Autonomous Life (Bond-aware: camaraderie vs. friction/clash)
  const friend = char.npcs.friend;
  if (npcIsActive(friend)) {
    const friendAge = char.age || 0;
    const fBond = friend.bond ?? 35;
    if (friendAge >= 18 && rng() < 0.14) {
      if (fBond < 24) {
        if (rng() < 0.5) {
          logs.push({
            vi: `[Va chạm ngõ hẻm] ${friend.nameVi} chạm mặt bạn ở quán rượu Backstreets. Rượu rẻ tiền làm bùng lên những bất mãn tích tụ; hai người lời qua tiếng lại đến mức rút vũ khí găm vào mặt bàn trước khi khách xung quanh kịp can ngăn.`,
            en: `[Alley Altercation] ${friend.nameEn} crossed paths with you in a Backstreet tavern. Cheap liquor ignited festering grievances; the argument escalated until blades were driven into the tabletop before patrons pulled you apart.`
          });
          friend.bond = Math.max(0, fBond - 4);
          if (char.stats) char.stats.sanity = Math.max(0, (char.stats.sanity || 50) - 4);
        } else {
          logs.push({
            vi: `[Tin đồn bất lợi] ${friend.nameVi} công khai phàn nàn với các môi giới trong vùng rằng bạn là kẻ tính toán chỉ biết giữ mạng mình, khiến uy tín của bạn sứt mẻ ít nhiều.`,
            en: `[Hostile Rumor] ${friend.nameEn} openly complained to local brokers that you only ever look out for your own skin, chipping away at your standing in the district.`
          });
          if (char.stats) char.stats.rep = Math.max(0, (char.stats.rep || 0) - 3);
        }
      } else {
        friend.lastSeen = char.age;
        const roll = rng();
        if (roll < 0.4) {
          logs.push({
            vi: `[Tin khu phố] ${friend.nameVi} vừa ký được hợp đồng dài hạn với một Văn phòng Fixer độc lập, gửi tặng bạn một bao thuốc lá Backstreets ăn mừng.`,
            en: `[Alley Dispatch] ${friend.nameEn} signed an operative contract with an independent Fixer Office, sending a pack of Backstreet cigarettes in celebration.`
          });
          friend.bond = Math.min(100, fBond + 3);
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
  }

  // 2. Combat Partner Autonomous Life (Synergy vs. Friction)
  const partner = char.npcs.partner;
  if (npcIsActive(partner)) {
    const pBond = partner.bond ?? 35;
    if ((char.age || 0) >= 19 && rng() < 0.15) {
      if (pBond < 26) {
        logs.push({
          vi: `[Rạn nứt tác chiến] ${partner.nameVi} tự ý giữ lại một phần đạn dược và thông tin tình báo sau ca tuần tra chung, buông lời lạnh nhạt rằng ai cũng phải tự lo đường lui ở The City.`,
          en: `[Tactical Friction] ${partner.nameEn} withheld spare ammunition and recon notes after a joint patrol, remarking coldly that everyone in The City needs their own exit plan.`
        });
        partner.bond = Math.max(0, pBond - 3);
      } else if (pBond >= 65) {
        logs.push({
          vi: `[Đồng đội ăn ý] ${partner.nameVi} thức trắng đêm mài chỉnh lại vũ khí và bọc lại giáp vai cho bạn trước mùa hợp đồng mới.`,
          en: `[Trusted Wingman] ${partner.nameEn} stayed up all night recalibrating your weapon balance and reinforcing your pauldron straps ahead of the new contract season.`
        });
        partner.lastSeen = char.age;
        if (char.stats) char.stats.health = Math.min(100, (char.stats.health || 50) + 3);
      }
    }
  }

  // 3. Living Mentor Autonomous Life
  const mentor = char.npcs.mentor;
  if (npcIsActive(mentor)) {
    const mBond = mentor.bond ?? 35;
    if (char.age >= 25 && rng() < 0.14) {
      if (mBond < 24) {
        logs.push({
          vi: `[Lời trách của Sư Phụ] ${mentor.nameVi} nhìn cách bạn xuống tay trong các vụ việc gần đây rồi lắc đầu bỏ đi, nói rằng bạn đã quên mất giới hạn tối thiểu của nghề.`,
          en: `[Mentor’s Rebuke] ${mentor.nameEn} watched how you handled recent affairs and walked away shaking their head, saying you have forgotten the craft's bare minimum restraint.`
        });
        if (char.stats) char.stats.sanity = Math.max(0, (char.stats.sanity || 50) - 3);
      } else {
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
  const spouse = char.npcs.spouse;
  if (npcIsActive(spouse) && char.flags.includes('Married')) {
    const sBond = spouse.bond ?? 45;
    if (rng() < 0.15) {
      if (sBond < 25) {
        logs.push({
          vi: `[Căn hộ lạnh lẽo] Bạn trở về nhà lúc nửa đêm; ${spouse.nameVi} đã khóa cửa phòng ngủ từ sớm, trên bàn chỉ còn tờ hóa đơn tiền điện nước đặt cạnh phần cơm nguội ngắt.`,
          en: `[Cold Apartment] You returned home at midnight; ${spouse.nameEn} had locked the bedroom door hours ago, leaving only an unpaid utility bill beside a plate of cold rice.`
        });
        if (char.stats) char.stats.sanity = Math.max(0, (char.stats.sanity || 50) - 4);
      } else {
        logs.push({
          vi: `[Tổ ấm Backstreets] ${spouse.nameVi} thắp một ngọn nến thơm tự chế bên bàn ăn, chuẩn bị bữa tối nóng hổi xua tan giá lạnh sau một ca làm việc dài.`,
          en: `[Backstreet Hearth] ${spouse.nameEn} lit a fragrant homemade candle by the table, serving a hot meal that drove away the bone-chilling frost of your long shift.`
        });
        if (char.stats) char.stats.sanity = Math.min(100, (char.stats.sanity || 50) + 4);
      }
    }
  }

  // 5. Active Nemesis Shadow Harassment
  const nemesis = char.npcs.nemesis;
  if (npcIsActive(nemesis) && rng() < 0.14) {
    logs.push({
      vi: `[Bóng ma phản bội] Bạn phát hiện ký hiệu quen thuộc của ${nemesis.nameVi} vạch bằng mũi dao ngay trên hộp thư trước cửa. Kẻ từng đi bên cạnh bạn vẫn đang rình rập chờ thời cơ.`,
      en: `[Shadow of Betrayal] You found ${nemesis.nameEn}'s familiar knife-mark scratched into your doorway postbox. Your former companion is still stalking your movements.`
    });
    if (char.stats) char.stats.sanity = Math.max(0, (char.stats.sanity || 50) - 3);
  }

  scheduleNpcReturns(char, rng);
  return logs;
}
