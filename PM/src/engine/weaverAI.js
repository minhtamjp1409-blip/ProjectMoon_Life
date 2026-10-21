import { evaluateNarrativeArcProgression, computeEmotionalWaveConsideration } from './narrativeArcEngine.js';
import { matchesEventContext } from './eventConditions.js';
import { evaluateEventConsiderations } from './utilityCurves.js';
import { createCityBlackboard } from './cityBlackboard.js';
import {
  getNextFixerPromotion,
  checkColorFixerReadiness,
  getNextFingerPromotion,
  FINGER_LADDERS,
  getNextWingPromotion,
  getNextWorkshopPromotion
} from './careerPipeline.js';
// ============================================================================
// THE PRESCRIPT LOOM: CAUSAL MEMORY GRAPH & RNG FATE OMEN ENGINE
// Pure In-Universe Project Moon Causal Engine (Zero Meta/AI Text)
// ============================================================================

export const FATE_OMENS = [
  {
    id: 'index_equilibrium',
    chanceWeight: 24,
    hue: '#5fb0b0',
    rarityVi: 'Thường gặp',
    rarityEn: 'Common',
    rarityColor: 'cyan',
    nameVi: 'The Loom’s Equilibrium',
    nameEn: 'The Loom’s Equilibrium',
    tagVi: 'Không có gì đặc biệt',
    tagEn: 'Nothing special',
    descVi: 'Không có điềm gì cả. Ở The City, thế đã là may. Công việc, bạn bè và hậu quả đến với bạn theo nhịp bình thường.',
    descEn: 'No omen at all, which in the City counts as luck. Work, friends and consequences arrive at an ordinary pace.',
    statMod: { health: 0, sanity: 0, wealth: 0, heat: 0, taboo: 0, resonance: 0 },
    meritMult: 1.0,
    weights: { causal: 1.35, lore: 1.2, npc: 1.25, crisis: 1.0, relief: 1.15 }
  },
  {
    id: 'merciless_head',
    chanceWeight: 18,
    hue: '#e2705f',
    rarityVi: 'Nguy hiểm',
    rarityEn: 'Dangerous',
    rarityColor: 'red',
    nameVi: 'Gaze of The Head',
    nameEn: 'Gaze of The Head',
    tagVi: 'Bị để mắt từ lúc sinh',
    tagEn: 'Watched from birth',
    descVi: 'Giấy khai sinh của bạn lọt vào tầm mắt một Beholder của B Corp. Bắt đầu với 1 Taboo Gaze; Syndicate và các đợt thanh trừng tìm đến bạn thường hơn.',
    descEn: 'Your birth record caught the eye of a B Corp Beholder. Start with 1 Taboo Gaze; Syndicates and purges find you more often.',
    statMod: { health: 0, sanity: -6, wealth: 0, heat: 12, taboo: 1, resonance: 5 },
    meritMult: 1.15,
    weights: { causal: 1.65, lore: 1.15, npc: 0.95, crisis: 1.65, relief: 0.55 }
  },
  {
    id: 'carmen_whisper',
    chanceWeight: 18,
    hue: '#a98be0',
    rarityVi: 'Dị thường',
    rarityEn: 'Anomalous',
    rarityColor: 'purple',
    nameVi: 'Bleeding Seed of Light',
    nameEn: 'Bleeding Seed of Light',
    tagVi: 'Nghe thấy một giọng nói',
    tagEn: 'Hears a voice',
    descVi: 'Đêm nào bạn cũng mơ thấy tiếng piano đứt quãng và một giọng phụ nữ dịu dàng dưới tán cây đầy nắng. +22 Resonance; dễ chạm tới E.G.O, hoặc Distortion.',
    descEn: 'Every night you dream of a broken piano and a gentle woman’s voice beneath a sunlit tree. +22 Resonance; E.G.O (or Distortion) comes easier.',
    statMod: { health: -4, sanity: -10, wealth: 0, heat: 0, taboo: 0, resonance: 22 },
    meritMult: 1.1,
    weights: { causal: 1.45, lore: 1.4, npc: 1.2, crisis: 1.45, relief: 0.75 }
  },
  {
    id: 'crimson_sweeper_star',
    chanceWeight: 16,
    hue: '#d98a4a',
    rarityVi: 'Hung hiểm',
    rarityEn: 'Ill-starred',
    rarityColor: 'volcano',
    nameVi: '3:13 AM Blood Star',
    nameEn: '3:13 AM Blood Star',
    tagVi: 'Sinh đúng giờ Sweeper',
    tagEn: 'Born at Sweeper hour',
    descVi: 'Bạn chào đời đúng lúc còi Night in the Backstreets vang lên. −8 Sinh lực, +18 Heat ngay từ đầu, nhưng mọi trận chiến cho thêm 30% Merit.',
    descEn: 'You were born as the Night in the Backstreets siren sounded. −8 Health and +18 Heat from the start, but every fight pays 30% more Merit.',
    statMod: { health: -8, sanity: -4, wealth: -5, heat: 18, taboo: 0, resonance: 8 },
    meritMult: 1.3,
    weights: { causal: 1.5, lore: 1.3, npc: 0.9, crisis: 1.6, relief: 0.65 }
  },
  {
    id: 'jcorp_rigged_dice',
    chanceWeight: 12,
    hue: '#d0a94f',
    rarityVi: 'Thất thường',
    rarityEn: 'Volatile',
    rarityColor: 'gold',
    nameVi: 'J Corp’s Rigged Gamble',
    nameEn: 'J Corp’s Rigged Gamble',
    tagVi: 'Lên voi xuống chó',
    tagEn: 'Feast or famine',
    descVi: 'Một chút Wishpower rò ra từ các sòng bạc của J Corp đã ngấm vào bạn. Đời bạn sẽ lên voi xuống chó: giàu bất ngờ, hoặc trắng tay sau một đêm.',
    descEn: 'A trace of Wishpower leaked from J Corp’s casinos seeped into you. Your life swings hard: sudden fortune, or ruin overnight.',
    statMod: { health: 0, sanity: -4, wealth: 12, heat: 10, taboo: 0, resonance: 6 },
    meritMult: 1.2,
    weights: { causal: 1.55, lore: 1.35, npc: 1.1, crisis: 1.5, relief: 0.85 }
  },
  {
    id: 'bloodline_echo',
    chanceWeight: 12,
    hue: '#c97a96',
    rarityVi: 'Nợ huyết thống',
    rarityEn: 'Inherited',
    rarityColor: 'magenta',
    nameVi: 'Ancestral Blood Debt',
    nameEn: 'Ancestral Blood Debt',
    tagVi: 'Mang việc dang dở của người đã khuất',
    tagEn: 'Carries the dead’s unfinished business',
    descVi: 'Kẻ thù cũ, Book of Vengeance của The Middle và những món di vật cứ tìm đến bạn. Dễ rơi vào hơn nếu bạn là người thừa kế của đời trước.',
    descEn: 'Old enemies, The Middle’s Book of Vengeance and stray relics keep finding you. Far likelier if you are someone’s heir.',
    statMod: { health: 4, sanity: -5, wealth: 4, heat: 14, taboo: 0, resonance: 12 },
    meritMult: 1.2,
    weights: { causal: 1.75, lore: 1.4, npc: 1.55, crisis: 1.25, relief: 1.0 }
  }
];

// Keep alias export so any legacy imports remain compatible
export const WEAVER_AI_MODES = FATE_OMENS;

export function rollRandomFateOmen(rng = Math.random, hasParentLegacy = false) {
  const pool = FATE_OMENS.map((omen) => ({
    ...omen,
    effectiveWeight:
      hasParentLegacy && omen.id === 'bloodline_echo'
        ? omen.chanceWeight * 3.2
        : omen.chanceWeight
  }));
  const total = pool.reduce((sum, item) => sum + item.effectiveWeight, 0);
  let pick = rng() * total;
  for (const item of pool) {
    pick -= item.effectiveWeight;
    if (pick <= 0) return item;
  }
  return FATE_OMENS[0];
}

export const DRAMA_PHASES = {
  INCUBATION: {
    id: 'INCUBATION',
    labelVi: 'Incubation',
    labelEn: 'Incubation',
    color: 'var(--state-info)',
    descVi: 'Chưa có gì xảy ra. Những lựa chọn bây giờ sẽ quay lại về sau.'
  },
  RISING_TENSION: {
    id: 'RISING_TENSION',
    labelVi: 'Rising Tension',
    labelEn: 'Rising Tension',
    color: 'var(--accent-gold)',
    descVi: 'Có người đang để ý đến bạn, hoặc có chuyện cũ chưa xong.'
  },
  CLIMAX: {
    id: 'CLIMAX',
    labelVi: 'Climax',
    labelEn: 'Climax',
    color: 'var(--state-danger)',
    descVi: 'Một món nợ đến hạn, một bước lên, hoặc giọng nói của Carmen. Chuyện lớn sắp xảy ra.'
  },
  AFTERMATH: {
    id: 'AFTERMATH',
    labelVi: 'Aftermath',
    labelEn: 'Aftermath',
    color: 'var(--state-Chill)',
    descVi: 'Sau một chuyện lớn. Thời gian để băng bó và sống tiếp.'
  }
};

export function createInitialWeaverState(mode = 'index_equilibrium', inheritedEchoes = []) {
  const nodes = [];
  const edges = [];

  if (inheritedEchoes && inheritedEchoes.length > 0) {
    inheritedEchoes.forEach((echo, idx) => {
      nodes.push({
        id: `legacy_node_${idx}`,
        type: 'legacy',
        age: 0,
        labelVi: `Từ đời trước: ${echo.labelVi}`,
        labelEn: `From the last generation: ${echo.labelEn}`,
        impactVi: echo.impactVi || 'Còn ảnh hưởng đến đời này',
        impactEn: echo.impactEn || 'Directly shapes the fate of this generation'
      });
    });
  }

  return {
    mode,
    dramaPhase: 'INCUBATION',
    tensionScore: 18,
    yearsSinceLastMajor: 0,
    yearsSinceLastCrisis: 99,
    nodes,
    edges,
    pendingThreads: [],
    decisionLog: [],
    customWeights: {},
    customEvents: []
  };
}

export function updateDramaTension(weaver, char) {
  const activeThreads = weaver.pendingThreads.filter(t => !t.fulfilled);
  const dueSoonCount = activeThreads.filter(t => t.triggerAge <= char.age + 2).length;

  let tension = 15;
  tension += Math.min(30, (char.heat || 0) * 0.45);
  tension += Math.min(25, (char.taboo || 0) * 9);
  tension += Math.max(0, (55 - char.sanity) * 0.6);
  tension += Math.max(0, (50 - char.health) * 0.45);
  tension += dueSoonCount * 12;
  tension += Math.min(18, (char.resonance || 0) * 0.25);

  tension = Math.max(5, Math.min(100, Math.round(tension)));

  let phase = 'INCUBATION';
  if (weaver.yearsSinceLastCrisis <= 1 && tension < 78) {
    phase = 'AFTERMATH';
  } else if (tension >= 68 || dueSoonCount > 0 || char.sanity <= 18 || (char.taboo || 0) >= 3) {
    phase = 'CLIMAX';
  } else if (tension >= 38 || activeThreads.length > 0 || char.age >= 17) {
    phase = 'RISING_TENSION';
  }

  return {
    ...weaver,
    tensionScore: tension,
    dramaPhase: phase
  };
}

export function recordChoiceInGraph(weaver, char, event, choice, outcomeTextVi, outcomeTextEn) {
  const nodeId = `ev_${char.age}_${event.id}_${weaver.nodes.length}`;
  const newNode = {
    id: nodeId,
    type: event.isCausalCallback ? 'consequence' : (event.major ? 'major_choice' : 'event'),
    eventId: event.id,
    age: char.age,
    labelVi: choice.labelVi,
    labelEn: choice.labelEn,
    outcomeVi: outcomeTextVi,
    outcomeEn: outcomeTextEn
  };

  const nextNodes = [...weaver.nodes, newNode].slice(-45);
  const nextEdges = [...weaver.edges];
  const nextThreads = [...weaver.pendingThreads];

  nextThreads.forEach(thread => {
    if (!thread.fulfilled && thread.eventId === event.id) {
      thread.fulfilled = true;
      thread.fulfilledAtAge = char.age;
      if (thread.sourceNodeId) {
        nextEdges.push({
          from: thread.sourceNodeId,
          to: nodeId,
          labelVi: thread.reasonVi,
          labelEn: thread.reasonEn
        });
      }
    }
  });

  if (Array.isArray(choice.scheduleConsequences)) {
    choice.scheduleConsequences.forEach((csq, idx) => {
      const triggerAge = char.age + (csq.delayYears || 4);
      nextThreads.push({
        id: `thr_${char.age}_${csq.eventId}_${idx}`,
        eventId: csq.eventId,
        sourceEventId: event.id,
        sourceNodeId: nodeId,
        plantedAtAge: char.age,
        triggerAge,
        reasonVi: csq.reasonVi,
        reasonEn: csq.reasonEn,
        fulfilled: false
      });
    });
  }

  if (Array.isArray(choice.scarsAdd) && choice.scarsAdd.length > 0) {
    choice.scarsAdd.forEach(scar => {
      const scarNodeId = `scar_${char.age}_${weaver.nodes.length}`;
      nextNodes.push({
        id: scarNodeId,
        type: 'scar',
        age: char.age,
        labelVi: `Vết sẹo: ${scar}`,
        labelEn: `Scar: ${scar}`,
        outcomeVi: 'Ở lại với bạn, và làm Resonance tăng lên',
        outcomeEn: 'Stays with you, and raises Resonance'
      });
      nextEdges.push({
        from: nodeId,
        to: scarNodeId,
        labelVi: 'Để lại sẹo',
        labelEn: 'Etched Scar'
      });
    });
  }

  return {
    ...weaver,
    nodes: nextNodes,
    edges: nextEdges.slice(-60),
    pendingThreads: nextThreads,
    yearsSinceLastMajor: event.major ? 0 : weaver.yearsSinceLastMajor + 1,
    yearsSinceLastCrisis: (event.isCausalCallback || (choice.effects?.sanity || 0) <= -15) ? 0 : weaver.yearsSinceLastCrisis + 1
  };
}

export function isEventEligible(event, char, { scripted = false } = {}) {
  if (!matchesEventContext(event, char)) return false;
  if (char.seenEvents?.includes(event.id) && !event.repeatable) return false;
  if (event.causalOnly && !char.weaver?.pendingThreads?.some(t => t.eventId === event.id && !t.fulfilled && t.triggerAge <= char.age)) return false;
  if (event.id.startsWith('fixer_promo_') && !getNextFixerPromotion(char)?.isEligible) return false;
  if (event.id === 'hana_color_ascension_trial' && !checkColorFixerReadiness(char).ready) return false;
  const fingerTrialRank = event.id.startsWith('syn_')
    ? Object.values(FINGER_LADDERS).flat().find((step) => (step.eventIds || [step.eventId]).includes(event.id))?.rank
    : null;
  if (fingerTrialRank && (!getNextFingerPromotion(char)?.isEligible || getNextFingerPromotion(char)?.rank !== fingerTrialRank)) return false;
  if (event.id.startsWith('wing_promo_') && !getNextWingPromotion(char)?.isEligible) return false;
  if (event.id.startsWith('ws_promo_') && !getNextWorkshopPromotion(char)?.isEligible) return false;
  if (event.id === 'ad_career_crossroad_18' && (char.age < 18 || char.job !== 'Child')) return false;
  if (event.id === 'ego_carmen_crossroad' && !(char.age >= 18 && (char.stats.sanity <= 5 || char.resonance >= 90))) return false;
  if (event.id === 'csq_claw_taboo_visitation' && char.taboo < 3) return false;
  const milestones = ['ad_career_crossroad_18', 'ego_carmen_crossroad', 'ego_second_efflorescence_trial', 'hana_color_ascension_trial', 'csq_claw_taboo_visitation'];
  return scripted || !milestones.includes(event.id);
}

export function scoreEventUtility(event, char, weaver) {
  const modeObj = FATE_OMENS.find(m => m.id === weaver.mode) || FATE_OMENS[0];
  const w = modeObj.weights;

  const baseWeight = Number(event.weight || 5);
  let causalScore = 0;
  let loreScore = 0;
  let npcScore = 0;
  let pacingScore = 0;
  const reasonsVi = [];
  const reasonsEn = [];

  if (event.requires && event.requires.some(r => ['HuyếtThốngKếThừa', 'NợMáuĐờiTrước'].includes(r))) {
    causalScore += 18 * w.causal;
    reasonsVi.push('Liên quan đến đời trước');
    reasonsEn.push('Direct Generational Bloodline link (+Causal)');
  }
  if (event.requires && event.requires.length > 0) {
    causalScore += 8 * w.causal;
    reasonsVi.push('Hệ quả của một lựa chọn cũ');
    reasonsEn.push(`Matches causal flags [${event.requires.join(', ')}]`);
  }

  if (Array.isArray(event.regions) && event.regions.includes(char.regionId)) {
    loreScore += 10 * w.lore;
    reasonsVi.push('Chuyện riêng của District này');
    reasonsEn.push(`District-specific lore for ${char.regionId} (+Lore)`);
  }
  if (Array.isArray(event.jobs) && event.jobs.includes(char.job)) {
    loreScore += 9 * w.lore;
    reasonsVi.push('Chuyện của nghề bạn đang làm');
    reasonsEn.push(`Advances ${char.job} career arc`);
  }

  const eventText = `${event.vi || ''} ${event.en || ''}`;
  if (eventText.includes('{partner}') || eventText.includes('{spouse}') || eventText.includes('{mentor}') || event.id.startsWith('life_')) {
    const activeNpcs = Object.values(char.npcs || {}).filter(Boolean).length;
    npcScore += (7 + activeNpcs * 3.5) * w.npc;
    reasonsVi.push('Liên quan đến người thân của bạn');
    reasonsEn.push('Engages persistent Companion / Family bonds (+NPC)');
  }

  if (weaver.dramaPhase === 'CLIMAX') {
    if (event.id.includes('showdown') || event.id.includes('promotion') || event.id.includes('carmen') || event.id.includes('maestro') || event.id.includes('blade_unlock') || event.id.includes('massacre')) {
      pacingScore += 14 * w.crisis;
      reasonsVi.push('Đúng lúc cao trào');
      reasonsEn.push('Matches Climax drama phase');
    }
  } else if (weaver.dramaPhase === 'AFTERMATH') {
    if (event.id.startsWith('life_') || event.id.includes('orphanage')) {
      pacingScore += 11 * w.relief;
      reasonsVi.push('Một khoảng lặng sau biến cố');
      reasonsEn.push('Provides recovery in Aftermath phase');
    }
  }

  if (event.id === 'ad_career_crossroad_18' && char.age === 18) {
    pacingScore += 120;
    reasonsVi.push('Tuổi 18: phải chọn đường');
    reasonsEn.push('Mandatory Age 18 career crossroad milestone');
  }

  // 1. Multi-Stage Narrative Arc Progression Priority
  const { arcBonus, arcReasonVi } = evaluateNarrativeArcProgression(char, event);
  if (arcBonus > 0 && arcReasonVi) {
    reasonsVi.push(arcReasonVi);
  }

  // 2. Emotional Wave & Sine Pacing Considerations
  const { waveMultiplier, pacingLogs } = computeEmotionalWaveConsideration(char, weaver, event);
  if (pacingLogs && pacingLogs.length > 0) {
    reasonsVi.push(...pacingLogs);
  }

  // 3. Advanced Non-Linear Response Curves & City Blackboard Considerations
  const blackboard = createCityBlackboard(char);
  const consideration = evaluateEventConsiderations(event, char, blackboard);
  const considerationMult = consideration.scoreMultiplier;
  if (consideration.considerationLogs?.length > 0) {
    reasonsVi.push(...consideration.considerationLogs);
  }

  const customMult = weaver.customWeights?.[event.id] ?? 1;
  const rawTotal = (baseWeight + causalScore + loreScore + npcScore + pacingScore + arcBonus) * considerationMult * waveMultiplier * customMult;
  const totalUtility = Math.round(rawTotal * 10) / 10;

  return {
    eventId: event.id,
    totalUtility,
    breakdown: {
      base: Math.round(baseWeight * 10) / 10,
      causal: Math.round(causalScore * 10) / 10,
      lore: Math.round(loreScore * 10) / 10,
      npc: Math.round(npcScore * 10) / 10,
      pacing: Math.round(pacingScore * 10) / 10
    },
    reasonsVi: reasonsVi.length > 0 ? reasonsVi : ['Hợp với tuổi và hoàn cảnh lúc này'],
    reasonsEn: reasonsEn.length > 0 ? reasonsEn : ['Prescript convergence for current age and environment']
  };
}

export function selectEventWithWeaverAI({
  weaver,
  char,
  allPools,
  consequencePool,
  rng
}) {
  const updatedWeaver = updateDramaTension(weaver, char);

  if ((char.taboo || 0) >= 3 && !char.seenEvents.includes('csq_claw_taboo_visitation')) {
    const clawEv = consequencePool.find(e => e.id === 'csq_claw_taboo_visitation');
    if (clawEv && isEventEligible(clawEv, char, { scripted: true })) {
      const logEntry = {
        age: char.age,
        phase: 'CLIMAX',
        selectedId: clawEv.id,
        utility: 999,
        reasonVi: 'Taboo Gaze đã đủ 3/3: C Corp cử một Claw đến',
        reasonEn: 'Taboo Gaze reached 3/3: C Corp sent a Claw',
        candidates: [{ eventId: clawEv.id, totalUtility: 999 }]
      };
      return {
        event: clawEv,
        weaver: {
          ...updatedWeaver,
          decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
        }
      };
    }
  }

  // Mandatory Age 18 Adult Career Crossroad (BitLife / PM Canon Milestone)
  if ((char.age >= 18 && char.job === 'Child') && !char.seenEvents.includes('ad_career_crossroad_18')) {
    const crossroadEv = allPools.find(e => e.id === 'ad_career_crossroad_18');
    if (crossroadEv && isEventEligible(crossroadEv, char, { scripted: true })) {
      const logEntry = {
        age: char.age,
        phase: 'CLIMAX',
        selectedId: crossroadEv.id,
        utility: 995,
        reasonVi: 'Tuổi 18: Ngã rẽ trưởng thành bắt buộc — tự nuôi sống bản thân tại The City',
        reasonEn: 'Age 18: Mandatory career crossroad — surviving on your own in The City',
        candidates: [{ eventId: crossroadEv.id, totalUtility: 995 }]
      };
      return {
        event: crossroadEv,
        weaver: {
          ...updatedWeaver,
          decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
        }
      };
    }
  }

  // Prioritize sequential Fixer Grade Promotion exams (Multi-track Association trials)
  if (char.job === 'Fixer' && !char.flags.includes('Distorted')) {
    const FIXER_PROMOTION_POOLS = {
      9: ['fixer_promo_g8_exam', 'fixer_promo_g8_seven', 'fixer_promo_g8_zwei'],
      8: ['fixer_promo_g7_exam', 'fixer_promo_g7_shi', 'fixer_promo_g7_tres'],
      7: ['fixer_promo_g6_exam', 'fixer_promo_g6_cinq', 'fixer_promo_g6_oufi'],
      6: ['fixer_promo_g5_exam', 'fixer_promo_g5_dieci', 'fixer_promo_g5_molar'],
      5: ['fixer_promo_g4_exam', 'fixer_promo_g4_devzat', 'fixer_promo_g4_rhino'],
      4: ['fixer_promo_g3_exam', 'fixer_promo_g3_warp', 'fixer_promo_g3_reindeer'],
      3: ['fixer_promo_g2_exam', 'fixer_promo_g2_black_silence', 'fixer_promo_g2_district_defense'],
      2: ['fixer_promo_g1_exam', 'fixer_promo_g1_hana_apex', 'fixer_promo_g1_calamity']
    };
    const candidateIds = FIXER_PROMOTION_POOLS[char.fixerGrade] || [];
    const availableIds = candidateIds.filter((id) => !char.seenEvents.includes(id));
    if (availableIds.length > 0 && (char.stats?.health || 0) >= 45) {
      // Pick randomly with rng() from eligible candidates for true promotion diversity
      const shuffled = [...availableIds].sort(() => rng() - 0.5);
      const chosenId = shuffled[0];
      const examEv = allPools.find((e) => e.id === chosenId);
      if (examEv && isEventEligible(examEv, char)) {
        const logEntry = {
          age: char.age,
          phase: 'CLIMAX',
          selectedId: examEv.id,
          utility: 975,
          reasonVi: `Fixer Grade ${char.fixerGrade} đủ điều kiện: Hana Association triệu tập kỳ thi thăng cấp Grade ${char.fixerGrade - 1}`,
          reasonEn: `Grade ${char.fixerGrade} Fixer eligible: Hana Association summons promotion exam to Grade ${char.fixerGrade - 1}`,
          candidates: availableIds.map(id => ({ eventId: id, totalUtility: 975 }))
        };
        return {
          event: examEv,
          weaver: {
            ...updatedWeaver,
            decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
          }
        };
      }
    }
  }

  // Prioritize sequential Syndicate / Finger Promotion trials (Unblocked for Distorted Finger Operatives)
  const isFingerOperative = (char.job === 'Syndicate' || (char.flags.includes('Distorted') && char.finger)) && char.finger;
  if (isFingerOperative) {
    const nextFingerPromo = getNextFingerPromotion(char);
    if (nextFingerPromo && nextFingerPromo.isEligible) {
      const candidateIds = nextFingerPromo.eventIds || [nextFingerPromo.eventId];
      const availableIds = candidateIds.filter((id) => !char.seenEvents.includes(id));
      if (availableIds.length > 0) {
        // Shuffle candidates with rng() for true promotion diversity
        const shuffled = [...availableIds].sort(() => rng() - 0.5);
        const chosenId = shuffled[0];
        const promoEv = allPools.find((e) => e.id === chosenId);
        if (promoEv && isEventEligible(promoEv, char)) {
          const logEntry = {
            age: char.age,
            phase: 'CLIMAX',
            selectedId: promoEv.id,
            utility: 975,
            reasonVi: `Thành viên The ${char.finger}${char.flags.includes('Distorted') ? ' (Distorted)' : ''} đủ điều kiện: Đại lễ thăng bậc ${nextFingerPromo.titleVi}`,
            reasonEn: `The ${char.finger} operative${char.flags.includes('Distorted') ? ' (Distorted)' : ''} eligible: Promotion trial ${nextFingerPromo.titleEn}`,
            candidates: availableIds.map(id => ({ eventId: id, totalUtility: 975 }))
          };
          return {
            event: promoEv,
            weaver: {
              ...updatedWeaver,
              decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
            }
          };
        }
      }
    }
  }

  // Prioritize sequential Wing Employee Promotion appointments
  if (char.job === 'Wing Employee' && !char.flags.includes('Distorted')) {
    const nextWingPromo = getNextWingPromotion(char);
    if (nextWingPromo && nextWingPromo.isEligible && !char.seenEvents.includes(nextWingPromo.eventId)) {
      const promoEv = allPools.find((e) => e.id === nextWingPromo.eventId);
      if (promoEv && isEventEligible(promoEv, char)) {
        const logEntry = {
          age: char.age,
          phase: 'CLIMAX',
          selectedId: promoEv.id,
          utility: 975,
          reasonVi: `Nhân viên Wing đủ chỉ tiêu: Bổ nhiệm thăng chức ${nextWingPromo.titleVi}`,
          reasonEn: `Wing employee fulfilled quotas: Promotion appointment ${nextWingPromo.titleEn}`,
          candidates: [{ eventId: promoEv.id, totalUtility: 975 }]
        };
        return {
          event: promoEv,
          weaver: {
            ...updatedWeaver,
            decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
          }
        };
      }
    }
  }

  // Prioritize sequential Workshop Craftsman Promotion appraisals
  if (char.job === 'Workshop Craftsman' && !char.flags.includes('Distorted')) {
    const nextWsPromo = getNextWorkshopPromotion(char);
    if (nextWsPromo && nextWsPromo.isEligible && !char.seenEvents.includes(nextWsPromo.eventId)) {
      const promoEv = allPools.find((e) => e.id === nextWsPromo.eventId);
      if (promoEv && isEventEligible(promoEv, char)) {
        const logEntry = {
          age: char.age,
          phase: 'CLIMAX',
          selectedId: promoEv.id,
          utility: 975,
          reasonVi: `Thợ rèn Workshop đủ điều kiện: Khảo hạch nghệ nhân ${nextWsPromo.titleVi}`,
          reasonEn: `Workshop craftsman eligible: Artisan appraisal ${nextWsPromo.titleEn}`,
          candidates: [{ eventId: promoEv.id, totalUtility: 975 }]
        };
        return {
          event: promoEv,
          weaver: {
            ...updatedWeaver,
            decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
          }
        };
      }
    }
  }

  // Prioritize Distortion progression when distorted
  if (char.flags.includes('Distorted')) {
    const distortStages = [
      'distort_carmen_communion_1',
      'distort_suppression_wave_1',
      'distort_manifest_domain',
      'distort_climax_color_faceoff'
    ];
    for (const dId of distortStages) {
      if (!char.seenEvents.includes(dId)) {
        const dEv = allPools.find((e) => e.id === dId);
        if (dEv && isEventEligible(dEv, char)) {
          const logEntry = {
            age: char.age,
            phase: 'CLIMAX',
            selectedId: dEv.id,
            utility: 990,
            reasonVi: 'Tiến trình Biến dị Distortion dưới tiếng thì thầm của Carmen',
            reasonEn: 'Distortion progression under Carmen’s siren whispers',
            candidates: [{ eventId: dEv.id, totalUtility: 990 }]
          };
          return {
            event: dEv,
            weaver: {
              ...updatedWeaver,
              decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
            }
          };
        }
      }
    }
  }

  // Syndicate initiate choosing Finger allegiance
  const chooseFingerEv = allPools.find(e => e.id === 'syn_choose_finger_allegiance');
  if (
    chooseFingerEv &&
    char.job === 'Syndicate' &&
    !char.finger &&
    !char.seenEvents.includes('syn_choose_finger_allegiance')
  ) {
    const logEntry = {
      age: char.age,
      phase: 'CLIMAX',
      selectedId: chooseFingerEv.id,
      utility: 980,
      reasonVi: 'Gia nhập Syndicate: Tuyên thệ trung thành với một trong Năm Ngón Tay (Five Fingers)',
      reasonEn: 'Joined Syndicate: Swear allegiance to one of the Five Fingers',
      candidates: [{ eventId: chooseFingerEv.id, totalUtility: 980 }]
    };
    return {
      event: chooseFingerEv,
      weaver: {
        ...updatedWeaver,
        decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
      }
    };
  }

  const carmenEv = allPools.find(e => e.id === 'ego_carmen_crossroad');
  const meetsCarmenPrereq = char.age >= 18 &&
    (((char.resonance || 0) >= 95 && Math.min(4, (char.scars || []).length) >= 3) ||
      (char.sanity <= 5 && rng() < 0.12) ||
      ((char.resonance || 0) >= 90 && rng() < 0.15));

  if (
    carmenEv &&
    meetsCarmenPrereq &&
    !char.flags.includes('EGOAwakened') &&
    !char.flags.includes('Distorted') &&
    !char.seenEvents.includes('ego_carmen_crossroad')
  ) {
    const logEntry = {
      age: char.age,
      phase: 'CLIMAX',
      selectedId: carmenEv.id,
      utility: 950,
      reasonVi: `Tâm trí còn ${char.sanity}, Resonance ${char.resonance}%: Carmen bắt đầu nói`,
      reasonEn: `Sanity at ${char.sanity}, Resonance ${char.resonance}%: Carmen starts to speak`,
      candidates: [{ eventId: carmenEv.id, totalUtility: 950 }]
    };
    return {
      event: carmenEv,
      weaver: {
        ...updatedWeaver,
        decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
      }
    };
  }

  // Hana Color Fixer Supreme Trial (Star of the City Calamity)
  const colorEv = allPools.find(e => e.id === 'hana_color_ascension_trial');
  if (
    colorEv &&
    char.job === 'Fixer' &&
    !char.flags.includes('Distorted') &&
    checkColorFixerReadiness(char).ready &&
    !char.seenEvents.includes('hana_color_ascension_trial')
  ) {
    const logEntry = {
      age: char.age,
      phase: 'CLIMAX',
      selectedId: colorEv.id,
      utility: 980,
      reasonVi: `Fixer Grade 1 đạt ${char.merit} Merit & ${(char.stats?.rep ?? char.rep)} Rep: Hana Association triệu tập đại khảo thí Star of the City để xét phong Color`,
      reasonEn: `Grade 1 Fixer with ${char.merit} Merit & ${(char.stats?.rep ?? char.rep)} Rep: Hana summons Star of the City trial for Color investiture`,
      candidates: [{ eventId: colorEv.id, totalUtility: 980 }]
    };
    return {
      event: colorEv,
      weaver: {
        ...updatedWeaver,
        decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
      }
    };
  }

  // Syndicate Pinnacle Ascension Trial (Underboss / Weaver / Great Sibling / Curator / Sovereign)
  if (
    (char.job === 'Syndicate' || (char.flags.includes('Distorted') && char.finger)) &&
    char.finger &&
    (char.fingerRank || 0) >= 2 &&
    (char.merit || 0) >= 78 &&
    ((char.stats?.rep ?? char.rep) || 0) >= 45
  ) {
    const fingerTrialPools = {
      Thumb: ['syn_thumb_underboss_purge', 'syn_thumb_apex_godfather'],
      Index: ['syn_index_weaver_prescript', 'syn_index_grand_proxy_flow'],
      Middle: ['syn_middle_great_brother_vendetta', 'syn_middle_apex_patriarch'],
      Pinky: ['syn_pinky_promo_sovereign', 'syn_pinky_apex_monarch'],
      Ring: ['syn_ring_curator_monument', 'syn_ring_apex_grand_master']
    };
    const candidateIds = fingerTrialPools[char.finger] || [];
    const available = candidateIds.filter((id) => !char.seenEvents.includes(id));
    if (available.length > 0) {
      const chosenId = [...available].sort(() => rng() - 0.5)[0];
      const fingerEv = allPools.find((e) => e.id === chosenId);
      if (fingerEv && isEventEligible(fingerEv, char, { scripted: true })) {
        const logEntry = {
          age: char.age,
          phase: 'CLIMAX',
          selectedId: fingerEv.id,
          utility: 975,
          reasonVi: `Thành viên The ${char.finger}${char.flags.includes('Distorted') ? ' (Distorted)' : ''} đạt Rank ${char.fingerRank} & ${char.merit} Merit: Khảo nghiệm sinh tử bước lên đỉnh cao Quyền Lực`,
          reasonEn: `The ${char.finger} member reached Rank ${char.fingerRank} & ${char.merit} Merit: Pinnacle Ascension trial to apex leadership`,
          candidates: available.map((id) => ({ eventId: id, totalUtility: 975 }))
        };
        return {
          event: fingerEv,
          weaver: {
            ...updatedWeaver,
            decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
          }
        };
      }
    }
  }

  // Wing Senior Executive Singularity Audit
  const wingEv = allPools.find(e => e.id === 'wing_singularity_classified_audit');
  if (
    wingEv &&
    char.job === 'Wing Employee' &&
    (char.wingRank || 0) >= 2 &&
    (char.merit || 0) >= 90 &&
    !char.seenEvents.includes('wing_singularity_classified_audit')
  ) {
    const logEntry = {
      age: char.age,
      phase: 'CLIMAX',
      selectedId: wingEv.id,
      utility: 970,
      reasonVi: `Nhân viên Wing đạt Rank ${char.wingRank} & ${char.merit} Merit: Ban giám đốc triệu tập thẩm định Singularity tối mật`,
      reasonEn: `Wing Employee with Rank ${char.wingRank} & ${char.merit} Merit: Summoned to classified Singularity Board appraisal`,
      candidates: [{ eventId: wingEv.id, totalUtility: 970 }]
    };
    return {
      event: wingEv,
      weaver: {
        ...updatedWeaver,
        decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
      }
    };
  }

  // Workshop Masterpiece Forge Trial (Tres Certification)
  const workshopEv = allPools.find(e => e.id === 'workshop_legendary_forge_trial');
  if (
    workshopEv &&
    char.job === 'Workshop Craftsman' &&
    (char.workshopRank || 0) >= 2 &&
    (char.merit || 0) >= 90 &&
    !char.seenEvents.includes('workshop_legendary_forge_trial')
  ) {
    const logEntry = {
      age: char.age,
      phase: 'CLIMAX',
      selectedId: workshopEv.id,
      utility: 970,
      reasonVi: `Thợ rèn Workshop đạt Rank ${char.workshopRank} & ${char.merit} Merit: Cơ hội rèn Tuyệt tác Thần binh trước giám định viên Tres`,
      reasonEn: `Workshop Craftsman with Rank ${char.workshopRank} & ${char.merit} Merit: Opportunity to forge a Masterpiece under Tres appraisers`,
      candidates: [{ eventId: workshopEv.id, totalUtility: 970 }]
    };
    return {
      event: workshopEv,
      weaver: {
        ...updatedWeaver,
        decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
      }
    };
  }

  const dueThread = updatedWeaver.pendingThreads.find(
    t => !t.fulfilled && char.age >= t.triggerAge && !char.seenEvents.includes(t.eventId)
  );
  if (dueThread) {
    const csqEvent =
      consequencePool.find(e => e.id === dueThread.eventId) ||
      allPools.find(e => e.id === dueThread.eventId);

    if (csqEvent && isEventEligible(csqEvent, char, { scripted: true })) {
      const logEntry = {
        age: char.age,
        phase: updatedWeaver.dramaPhase,
        selectedId: csqEvent.id,
        utility: 880,
        reasonVi: `Từ tuổi ${dueThread.plantedAtAge}: ${dueThread.reasonVi}`,
        reasonEn: `From age ${dueThread.plantedAtAge}: ${dueThread.reasonEn}`,
        candidates: [{ eventId: csqEvent.id, totalUtility: 880 }]
      };
      return {
        event: csqEvent,
        weaver: {
          ...updatedWeaver,
          decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
        }
      };
    }
  }

  const combinedPool = [...(updatedWeaver.customEvents || []), ...allPools];
  const eligible = combinedPool.filter(ev => isEventEligible(ev, char));

  if (eligible.length === 0) {
    return { event: null, weaver: updatedWeaver };
  }

  const scored = eligible
    .map(ev => ({
      event: ev,
      score: scoreEventUtility(ev, char, updatedWeaver)
    }))
    .map((item) => {
      // A theme the director played recently (the 3:13 siren above all) rests for a few years
      const is313 = /3:1[03]|3 giờ 1[03]|Sweeper/.test(item.event.vi || '');
      const last = char.themes?.['313'];
      if (is313 && last != null && char.age - last < 4) {
        item.score = { ...item.score, totalUtility: Math.round(item.score.totalUtility * 0.15 * 10) / 10 };
      }
      return item;
    })
    .sort((a, b) => b.score.totalUtility - a.score.totalUtility);

  // Draw from a wide field so two lives with the same start still diverge;
  // a forced milestone (utility far above the rest) still wins almost every time.
  // The 0.85 power keeps the order but gives the lower half of the field a real chance.
  const drawWeight = (item) => Math.pow(Math.max(1, item.score.totalUtility), 0.85);
  const topCandidates = scored.slice(0, Math.min(14, scored.length));
  const totalWeight = topCandidates.reduce((sum, item) => sum + drawWeight(item), 0);
  let pickRoll = rng() * totalWeight;
  let chosen = topCandidates[0];

  for (const item of topCandidates) {
    pickRoll -= drawWeight(item);
    if (pickRoll <= 0) {
      chosen = item;
      break;
    }
  }

  const logEntry = {
    age: char.age,
    phase: updatedWeaver.dramaPhase,
    selectedId: chosen.event.id,
    utility: chosen.score.totalUtility,
    breakdown: chosen.score.breakdown,
    reasonVi: chosen.score.reasonsVi.join(' · '),
    reasonEn: chosen.score.reasonsEn.join(' · '),
    candidates: topCandidates.map(c => ({
      eventId: c.event.id,
      totalUtility: c.score.totalUtility
    }))
  };

  return {
    event: chosen.event,
    weaver: {
      ...updatedWeaver,
      decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
    }
  };
}
