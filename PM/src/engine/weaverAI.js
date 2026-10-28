import { cityEventMultiplier } from './cityConditions.js';
import { careerAgeOf, reachedCareerAge } from './careerAge.js';
import { rememberResonance, hasEgoOpportunity, colorTrialAvailable, rollEgoEncounter } from './awakeningProgress.js';
import { evaluateNarrativeArcProgression, computeEmotionalWaveConsideration } from './narrativeArcEngine.js';
import { ENSEMBLE_INVITE_ID, ENSEMBLE_LAST_CALL_ID, ensembleEligible } from './ensemblePath.js';
import { matchesEventContext } from './eventConditions.js';
import { evaluateEventConsiderations } from './utilityCurves.js';
import { createCityBlackboard } from './cityBlackboard.js';
import { activeScarCount } from './scarModel.js';
import {
  getNextFixerPromotion,
  fixerPromotionOfferChance,
  checkColorFixerReadiness,
  getNextFingerPromotion,
  getNextWingPromotion,
  getOtherCareerPromotion,
  careerTrialForEvent,
  careerPromotionOfferChance,
  getEgoLeap,
  isEgoLeapEvent,
  RETIRED_WORKSHOP_TRIAL_IDS
} from './careerPipeline.js';
import { isAffInviteEvent, getAffiliationInvite, preferredPromoIds } from './affiliation.js';
import { isGateEvent, gateOnCooldown, gateWeightMult } from './dungeonPacing.js';
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
        labelVi: `Dấu tích: ${scar}`,
        labelEn: `Mark: ${scar}`,
        outcomeVi: 'Ở lại với bạn, và làm Resonance tăng lên',
        outcomeEn: 'Stays with you, and raises Resonance'
      });
      nextEdges.push({
        from: nodeId,
        to: scarNodeId,
        labelVi: 'Để lại dấu tích',
        labelEn: 'Left a mark'
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
  if (event.id === 'ego_carmen_crossroad' &&
      (char.egoEncounterRollAge !== char.age || char.egoEncounterOffered !== true)) return false;
  if (event.id === 'fixer_seven_unclaimed_dossier' && !scripted) return false;
  if (event.id === ENSEMBLE_INVITE_ID || event.id === ENSEMBLE_LAST_CALL_ID) return scripted && ensembleEligible(char);
  if (RETIRED_WORKSHOP_TRIAL_IDS.has(event.id)) return false;
  const otherTrial = careerTrialForEvent(event.id);
  const contextEvent = otherTrial && event.age ? { ...event, age: [event.age[0], 140] } : event;
  if (!matchesEventContext(contextEvent, char)) return false;
  const fixerExam = event.id.startsWith('fixer_promo_');
  if (char.seenEvents?.includes(event.id) && !event.repeatable && !fixerExam && !otherTrial) return false;
  if (event.causalOnly && !char.weaver?.pendingThreads?.some(t => t.eventId === event.id && !t.fulfilled && t.triggerAge <= char.age)) return false;
  if (fixerExam) {
    const next = getNextFixerPromotion(char);
    const eventGrade = event.choices?.find((choice) => choice.setFixerGrade != null)?.setFixerGrade;
    if (!next?.isEligible || eventGrade !== next.grade || char.lastFixerExamAge === char.age) return false;
  }
  if (event.id === 'hana_color_ascension_trial' && (!checkColorFixerReadiness(char).ready || !colorTrialAvailable(char))) return false;
  if (otherTrial) {
    const next = getOtherCareerPromotion(char);
    if (!next?.isEligible || next.route !== otherTrial.route || next.rank !== otherTrial.rank ||
        (next.route === 'finger' && next.finger !== otherTrial.finger)) return false;
    const prefix = next.route === 'finger' ? 'Finger' : 'Wing';
    if (char[`last${prefix}TrialAge`] === char.age) return false;
  }
  if (event.id === 'ad_career_crossroad_18' && (!reachedCareerAge(char) || char.job !== 'Child' || char.regionId === 'OUTSKIRTS')) return false;
  if (event.id === 'ad_outskirts_crossroad_18' && (!reachedCareerAge(char) || char.job !== 'Child')) return false;
  if (isEgoLeapEvent(event.id) && getEgoLeap(char)?.eventId !== event.id) return false;
  if (isAffInviteEvent(event.id) && getAffiliationInvite(char) !== event.id) return false;
  if (isGateEvent(event.id) && gateOnCooldown(char)) return false;
  if (event.id === 'ego_carmen_crossroad' && !(char.age >= 18 && (hasEgoOpportunity(char) || char.stats.sanity <= 15 || (char.resonance || 0) >= 50))) return false;
  const milestones = ['ad_career_crossroad_18', 'ad_outskirts_crossroad_18', 'ego_carmen_crossroad', 'ego_second_efflorescence_trial', 'hana_color_ascension_trial'];
  return scripted || (!milestones.includes(event.id) && !isEgoLeapEvent(event.id));
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
  if ((char.job === 'Syndicate' || (char.flags?.includes('Distorted') && char.finger)) && (char.fingerRank || 0) >= 2 &&
      (event.need?.fingerRank === 3 || (event.need?.fingerRankAtLeast || 0) >= 2)) {
    loreScore += 28 * w.lore;
    reasonsVi.push('Quyền bính và cống nạp của Thủ lĩnh Ngón Tay');
    reasonsEn.push('Syndicate Apex leadership & tribute');
  }
  if ((char.resonance || 0) >= 25 && !char.flags?.includes('EGOAwakened') && !char.flags?.includes('Distorted') &&
      Array.isArray(event.choices) && event.choices.some((c) => (c?.effects?.resonance || 0) > 0 || (c?.outcomes || []).some((o) => (o?.effects?.resonance || 0) > 0))) {
    loreScore += 10 * w.lore;
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

  if (event.id === 'ad_career_crossroad_18' && char.age === careerAgeOf(char)) {
    pacingScore += 120;
    reasonsVi.push('Đến tuổi phải chọn đường');
    reasonsEn.push('Working-age career crossroad milestone');
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
  // Branches with less content of their own meet dungeon gates more often
  const gateMult = isGateEvent(event.id) ? gateWeightMult(char) : 1;
  const rawTotal = (baseWeight + causalScore + loreScore + npcScore + pacingScore + arcBonus) * considerationMult * waveMultiplier * customMult * cityEventMultiplier(event, char) * gateMult;
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

  // Career crossroad at the character's own working age
  if (reachedCareerAge(char) && char.job === 'Child') {
    const crossroadId = char.regionId === 'OUTSKIRTS' ? 'ad_outskirts_crossroad_18' : 'ad_career_crossroad_18';
    const crossroadEv = allPools.find(e => e.id === crossroadId);
    if (crossroadEv && isEventEligible(crossroadEv, char, { scripted: true })) {
      const logEntry = {
        age: char.age,
        phase: 'CLIMAX',
        selectedId: crossroadEv.id,
        utility: 995,
        reasonVi: 'Đến tuổi phải tự nuôi sống bản thân tại The City: ngã rẽ nghề nghiệp bắt buộc',
        reasonEn: 'Working age reached: mandatory career crossroad, surviving on your own in The City',
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

  // Syndicate initiate choosing Finger allegiance
  const chooseFingerEv = allPools.find(e => e.id === 'syn_choose_finger_allegiance');
  if (
    chooseFingerEv &&
    char.job === 'Syndicate' &&
    !char.finger &&
    !char.seenEvents.includes('syn_choose_finger_allegiance') &&
    ((char.merit || 0) >= 10 || (char.stats?.rep || 0) >= 18 || (char.heat || 0) >= 20 || char.age >= 22)
  ) {
    const logEntry = {
      age: char.age,
      phase: 'CLIMAX',
      selectedId: chooseFingerEv.id,
      utility: 980,
      reasonVi: 'Gia nhập Syndicate: Tuyên thệ trung thành với một trong The Five Fingers',
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
  const curSanity = char.stats?.sanity ?? char.sanity ?? 50;

  if (
    carmenEv &&
    rollEgoEncounter(char, rng) &&
    !char.flags.includes('EGOAwakened') &&
    !char.flags.includes('Distorted') &&
    !char.seenEvents.includes('ego_carmen_crossroad')
  ) {
    const logEntry = {
      age: char.age,
      phase: 'CLIMAX',
      selectedId: carmenEv.id,
      utility: 950,
      reasonVi: `Tâm trí còn ${curSanity}, Resonance ${char.resonance}%: Carmen bắt đầu nói`,
      reasonEn: `Sanity at ${curSanity}, Resonance ${char.resonance}%: Carmen starts to speak`,
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

  // Someone whose E.G.O has taken shape is offered the special track first, and often. The ordinary exam stays
  // available the years the leap is declined, on cooldown, or not rolled.
  const egoLeap = getEgoLeap(char);
  if (egoLeap && char.lastEgoLeapAge !== char.age && rng() < 0.4) {
    const leapEv = allPools.find((e) => e.id === egoLeap.eventId);
    if (leapEv && isEventEligible(leapEv, char, { scripted: true })) {
      const logEntry = {
        age: char.age,
        phase: 'CLIMAX',
        selectedId: leapEv.id,
        utility: 978,
        reasonVi: 'E.G.O đã thành hình: Hana, hoặc tổ chức của bạn, mở một bài tái định hạng đặc biệt nhảy hai bậc',
        reasonEn: 'Your E.G.O has taken shape: a special two-band re-rating is opened',
        candidates: [{ eventId: leapEv.id, totalUtility: 978 }]
      };
      return {
        event: leapEv,
        weaver: { ...updatedWeaver, decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18) }
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
    const nextPromo = getNextFixerPromotion(char);
    const availableIds = candidateIds.filter((id) => {
      const event = allPools.find((entry) => entry.id === id);
      return event && isEventEligible(event, char);
    });
    const retryDue = nextPromo?.isEligible && char.fixerTrialRetryGrade === nextPromo.grade &&
      char.lastFixerExamAge != null && char.age > char.lastFixerExamAge;
    if (availableIds.length > 0 && char.lastFixerExamAge !== char.age && (retryDue || rng() < fixerPromotionOfferChance(char, nextPromo))) {
      // The trial that belongs to the badge you wear comes up more often than a stranger's
      const own = availableIds.filter((id) => preferredPromoIds(char).includes(id));
      const chosenId = own.length && rng() < 0.7
        ? own[Math.floor(rng() * own.length)]
        : availableIds[Math.floor(rng() * availableIds.length)];
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
    const step = getOtherCareerPromotion(char);
    if (nextFingerPromo?.isEligible && char.lastFingerTrialAge !== char.age && rng() < careerPromotionOfferChance(char, step)) {
      const candidateIds = nextFingerPromo.eventIds || [nextFingerPromo.eventId];
      const availableIds = candidateIds.filter((id) => {
        const event = allPools.find((entry) => entry.id === id);
        return event && isEventEligible(event, char);
      });
      if (availableIds.length > 0) {
        // Shuffle candidates with rng() for true promotion diversity
        const chosenId = availableIds[Math.floor(rng() * availableIds.length)];
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
    if (nextWingPromo?.isEligible && char.lastWingTrialAge !== char.age && rng() < careerPromotionOfferChance(char)) {
      const wingIds = (nextWingPromo.eventIds || [nextWingPromo.eventId]).filter((id) => {
        const event = allPools.find((entry) => entry.id === id);
        return event && isEventEligible(event, char);
      });
      const promoEv = wingIds.length ? allPools.find((e) => e.id === wingIds[Math.floor(rng() * wingIds.length)]) : null;
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

  // Hana Color Fixer Supreme Trial (Star of the City Calamity)
  const colorEv = allPools.find(e => e.id === 'hana_color_ascension_trial');
  if (
    colorEv &&
    char.job === 'Fixer' &&
    !char.flags.includes('Distorted') &&
    checkColorFixerReadiness(char).ready &&
    colorTrialAvailable(char)
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

  // Rare early lane to Color: a Seven Association case can hand a mid-career Fixer merit that
  // would otherwise take a decade of contracts, without touching the trial's own merit/rep gate.
  // Most Fixers never see this offered; it is a chance, not a track.
  if (
    char.job === 'Fixer' &&
    !char.flags.includes('Distorted') &&
    !char.flags.includes('ColorFixer') &&
    !char.seenEvents.includes('fixer_seven_unclaimed_dossier') &&
    char.age >= 28 && char.age <= 38 &&
    (char.fixerGrade ?? 9) >= 2 && (char.fixerGrade ?? 9) <= 6 &&
    rng() < 0.22
  ) {
    const dossierEv = allPools.find(e => e.id === 'fixer_seven_unclaimed_dossier');
    if (dossierEv && isEventEligible(dossierEv, char, { scripted: true })) {
      const logEntry = {
        age: char.age,
        phase: updatedWeaver.dramaPhase,
        selectedId: dossierEv.id,
        utility: 860,
        reasonVi: 'Một đồng nghiệp đề cử bạn cho vụ của Seven, đặt cả tên mình vào rủi ro',
        reasonEn: 'A colleague puts their own name at risk to recommend you for Seven’s case',
        candidates: [{ eventId: dossierEv.id, totalUtility: 860 }]
      };
      return {
        event: dossierEv,
        weaver: {
          ...updatedWeaver,
          decisionLog: [logEntry, ...updatedWeaver.decisionLog].slice(0, 18)
        }
      };
    }
  }

  // A freelance Fixer past Grade 9 gets asked to join an Association or an Office; which one is fixed by seed and age
  const threadDue = (updatedWeaver.pendingThreads || []).some((t) => !t.fulfilled && t.triggerAge <= char.age);
  const inviteId = threadDue ? null : getAffiliationInvite(char);
  if (inviteId) {
    const inviteEv = allPools.find((e) => e.id === inviteId);
    if (inviteEv && isEventEligible(inviteEv, char)) {
      return {
        event: inviteEv,
        weaver: {
          ...updatedWeaver,
          decisionLog: [{
            age: char.age, phase: 'CLIMAX', selectedId: inviteEv.id, utility: 960,
            reasonVi: 'Một Association hoặc Office để mắt đến Fixer tự do này và gửi lời mời',
            reasonEn: 'An Association or Office has noticed this freelance Fixer and sent an offer',
            candidates: [{ eventId: inviteEv.id, totalUtility: 960 }]
          }, ...updatedWeaver.decisionLog].slice(0, 18)
        }
      };
    }
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
  const eligible = combinedPool.filter(ev => !ev.id.startsWith('fixer_promo_') && !careerTrialForEvent(ev.id) && isEventEligible(ev, char));

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
  const topCandidates = scored.slice(0, Math.min(24, scored.length));
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
