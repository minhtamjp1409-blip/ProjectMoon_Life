// Resolving the choice the player made on a story event.
import { ALL_STORY_EVENTS, SEASONS, clamp, interpolateText, markColorInvestiture } from './gameEngine.js';
import { BALANCE, isFixerCareerEvent, reputationGain } from './economyModel.js';
import { CAREER_CROSSROAD_IDS } from './careerAge.js';
import { COLOR_FIXER_REQ, FINGER_LADDERS, FIXER_LADDER, RETIRED_WORKSHOP_TRIAL_IDS, careerPromotionFailureEffects, careerPromotionSuccessChance, careerTrialForEvent, egoLeapFailureEffects, egoLeapSuccessChance, fixerPromotionFailureEffects, fixerPromotionSuccessChance, getEgoLeap, getNextFixerPromotion, getOtherCareerPromotion, isEgoLeapEvent, meritRetentionAfterPromotion, triggerDistortionTransformation } from './careerPipeline.js';
import { DUNGEON_DEFINITIONS, createDungeonSession } from './dungeonEngine.js';
import { ENSEMBLE_INVITE_ID, ENSEMBLE_LAST_CALL_ID, recordEnsembleInvitation } from './ensemblePath.js';
import { ITEMS_CATALOG } from '../data/itemsData.js';
import { PRINTED_NUMBERS, traitsOf, varyEffects } from './variance.js';
import { addScar } from './scarModel.js';
import { advanceActiveNarrativeArcs } from './narrativeArcEngine.js';
import { advanceChildhoodMontage } from './childhoodFastForward.js';
import { applyAffiliationChoice, ensureAffiliation, getAffiliation } from './affiliation.js';
import { applyBonds, applyNpcFate, closeThreads, hasMemory, namesInUse } from './director.js';
import { applyColorTrialCompanionState, applyFatalOrCompanionSave, closeLifeByChoice, handleSanityBreakdown, woundDeath } from './lifeEnding.js';
import { bondCapFor, yearsTogetherOf } from '../data/npcPersonality.js';
import { checkPromotions } from './careerMilestones.js';
import { choiceIsAvailable, getChoiceAhnCost, matchesEventContext, mergeEffects, npcIsActive } from './eventConditions.js';
import { cloneChar } from './characterCreation.js';
import { dungeonWagerLevel } from './dungeonWager.js';
import { makeNpc } from '../data/birthStories.js';
import { markHabitChallengeTriggered, recordChoiceMotif } from './eventDirector.js';
import { markOpenedDoor } from './lockedDoors.js';
import { recordChoiceInGraph, updateDramaTension } from './weaverAI.js';
import { rememberResonance } from './awakeningProgress.js';
import { weightedOutcomes } from './outcomeOdds.js';

/**
 * Resolves a player's choice on a Story / Causal Event
 */
// What a reader would call a changed life: the path, a rank, or a supernatural state
const TURNING_FLAGS = ['EGOAwakened', 'Distorted', 'ColorFixer'];

const lifeStandingSignature = (char) =>
  [char.job, char.fixerGrade, char.fingerRank, char.syndicateRank, char.wingRank, ...TURNING_FLAGS.map((f) => char.flags?.includes(f))].join('|');

export function resolveEventChoice(charState, choiceIdx, rng = Math.random, dungeonStake = 0) {
  const char = cloneChar(charState);
  const event = char.pendingEvent;
  if (!event) return char;
  if (RETIRED_WORKSHOP_TRIAL_IDS.has(event.id)) {
    char.pendingEvent = null;
    return char;
  }

  const choice = event.choices?.[choiceIdx];
  if (!choiceIsAvailable(choice, char)) return char;
  const standingBefore = lifeStandingSignature(char);
  const debtAtChoice = choice.debtId
    ? (char.debts || []).find((debt) => debt.id === choice.debtId && debt.status === 'active')
    : null;
  const debtBalanceAtChoice = debtAtChoice?.balanceAhn;
  const debtTextValues = debtAtChoice
    ? { debtBalance: debtBalanceAtChoice, partialPay: Math.min(3, debtBalanceAtChoice) }
    : {};
  if (choice.useItem) {
    const index = char.inventory.findIndex(i => (i.id || i) === choice.useItem);
    char.inventory.splice(index, 1);
    if (!char.inventory.some(i => (i.id || i) === choice.useItem) && char.equipped) {
      char.equipped = { ...char.equipped };
      for (const [slot, item] of Object.entries(char.equipped)) {
        if ((item?.id || item) === choice.useItem) char.equipped[slot] = null;
      }
    }
  }
  if (choice.favorCost) {
    const { role, amount } = choice.favorCost;
    char.npcs[role] = { ...char.npcs[role], bond: char.npcs[role].bond - amount };
  }
  const review = {
    vi: event.displayVi || interpolateText(event.vi || '', char),
    en: event.displayEn || interpolateText(event.en || '', char),
    choices: (event.choices || []).map((entry) => ({
      vi: interpolateText(entry.labelVi || '', char),
      en: interpolateText(entry.labelEn || '', char)
    })),
    selected: choiceIdx
  };
  char.pendingEvent = null;
  if (event.id.startsWith('fixer_promo_')) {
    const requiredGrade = event.choices?.find((entry) => entry.setFixerGrade != null)?.setFixerGrade;
    const nextGrade = getNextFixerPromotion(char);
    if (!nextGrade?.isEligible || requiredGrade !== nextGrade.grade || !matchesEventContext(event, char)) {
      char.fixerTrialRetryGrade = null;
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_invalid`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: 'Hana hủy giấy triệu tập cũ vì Grade hoặc hồ sơ hiện tại không còn khớp. Không có thay đổi chỉ số.',
        en: 'Hana withdrew an outdated summons because your current Grade or record no longer matches. No resources changed.'
      });
      return char;
    }
  }
  const otherTrial = careerTrialForEvent(event.id);
  if (otherTrial) {
    const next = getOtherCareerPromotion(char);
    if (!next?.isEligible || next.route !== otherTrial.route || next.rank !== otherTrial.rank ||
        (next.route === 'finger' && next.finger !== otherTrial.finger)) {
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_invalid`, age: char.age, season: SEASONS[char.seasonIdx], type: 'promo',
        vi: 'Giấy gọi xét bậc không còn khớp với hồ sơ hiện tại. Không có chỉ số nào thay đổi.',
        en: 'The promotion summons no longer matches your record. No resources changed.'
      });
      return char;
    }
  }
  if (isEgoLeapEvent(event.id)) {
    const leap = getEgoLeap(char);
    if (!leap || leap.eventId !== event.id) {
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_invalid`, age: char.age, season: SEASONS[char.seasonIdx], type: 'promo',
        vi: 'Giấy gọi tái định hạng đặc biệt không còn khớp với hồ sơ hiện tại. Không có chỉ số nào thay đổi.',
        en: 'The special re-rating summons no longer matches your record. No resources changed.'
      });
      return char;
    }
    if (choice.leapPromotion) {
      char.lastEgoLeapAge = char.age;
      if (rng() >= Math.min(0.92, egoLeapSuccessChance(char, leap) + (choice.leapOdds || 0))) {
        const loss = egoLeapFailureEffects(leap);
        const deltas = [];
        for (const [key, amount] of Object.entries(loss)) {
          const statsKey = ['health', 'sanity', 'wealth', 'network', 'rep'].includes(key);
          const before = statsKey ? char.stats[key] : char[key] || 0;
          const after = clamp(before + amount, 0, key === 'merit' ? 9999 : 100);
          if (statsKey) char.stats[key] = after; else char[key] = after;
          if (after !== before) deltas.push({ k: key, v: after - before });
        }
        const vi = leap.route === 'fixer'
          ? 'Hana không đóng dấu cho bài tái định hạng đặc biệt. Vũ khí của bạn vẫn có thật, nhưng hồ sơ chưa nhảy được hai bậc. Bạn trở về với thương tích và phí điều trị, và Hana sẽ không mở lại bài này trong ba năm.'
          : 'Buổi xét bậc đặc biệt không cho kết quả. Vũ khí không bị tước, nhưng ghế vẫn chưa thuộc về bạn. Họ sẽ không mở lại chuyện này trong ba năm.';
        const en = leap.route === 'fixer'
          ? 'Hana did not stamp the special re-rating. The weapon is real, but the record cannot jump two bands. You return with wounds and a treatment bill, and Hana will not reopen this for three years.'
          : 'The special review gives no result. The weapon is not taken from you, but the seat is not yet yours. They will not reopen it for three years.';
        char.logs.push({
          id: `log_ev_${char.age}_${event.id}_failed`, age: char.age, season: SEASONS[char.seasonIdx], type: 'major',
          choiceVi: choice.labelVi, choiceEn: choice.labelEn, vi, en, deltas, review
        });
        char.weaver = recordChoiceInGraph(char.weaver, char, event, { effects: loss }, vi, en);
        closeThreads(char, event.id);
        if (char.stats.health <= 0) {
          const [woundVi, woundEn] = woundDeath(char, 'Gục ngã trong bài tái định hạng đặc biệt', 'Succumbed during a special re-rating trial');
          applyFatalOrCompanionSave(char, woundVi, woundEn);
        } else if (char.stats.sanity <= 0) handleSanityBreakdown(char, rng);
        char.weaver = updateDramaTension(char.weaver, char);
        return char;
      }
    }
  }
  if (!char.seenEvents.includes(event.id)) {
    char.seenEvents.push(event.id);
  }
  if (otherTrial) {
    const prefix = otherTrial.route === 'finger' ? 'Finger' : 'Wing';
    const retryKey = `${prefix.toLowerCase()}TrialRetryRank`;
    char[`last${prefix}TrialAge`] = char.age;
    char[retryKey] = otherTrial.rank;
    const promotionChoice = choice[`set${prefix}Rank`] === otherTrial.rank;
    if (promotionChoice && rng() >= careerPromotionSuccessChance(char, otherTrial)) {
      const beforeHealth = char.stats?.health ?? 50;
      const loss = careerPromotionFailureEffects(otherTrial);
      const deltas = [];
      for (const [key, amount] of Object.entries(loss)) {
        const statsKey = ['health', 'sanity', 'wealth', 'network', 'rep'].includes(key);
        const before = statsKey ? char.stats[key] : char[key] || 0;
        const floor = key === 'health' && beforeHealth >= 45 ? 1 : 0;
        const after = clamp(before + amount, floor, key === 'merit' ? 9999 : 100);
        if (statsKey) char.stats[key] = after;
        else char[key] = after;
        if (after !== before) deltas.push({ k: key, v: after - before });
      }
      const verdict = otherTrial.route === 'finger'
        ? `The ${otherTrial.finger} chưa trao bậc mới. Tổ chức giữ lại hồ sơ; bạn có thể trở lại từ năm sau nếu còn đủ điều kiện.`
        : otherTrial.route === 'wing'
          ? 'Hội đồng Wing gạch tên bạn khỏi đợt bổ nhiệm. Hồ sơ được giữ lại cho kỳ sau nếu bạn đáp ứng lại chỉ tiêu.'
          : 'Đại diện Tres không đóng dấu kiểm định. Bạn phải bù lại vật liệu và có thể trình mẫu mới từ năm sau.';
      const verdictEn = otherTrial.route === 'finger'
        ? `The ${otherTrial.finger} withheld the new rank. Your record remains open; you may return next year if you qualify.`
        : otherTrial.route === 'wing'
          ? 'The Wing board passed over your appointment. Your file remains open for a later review if you meet the quotas again.'
          : 'The Tres representative withheld the proofmark. You must replace the materials before presenting another sample next year.';
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_failed`, age: char.age, season: SEASONS[char.seasonIdx], type: 'major',
        choiceVi: choice.labelVi, choiceEn: choice.labelEn, vi: verdict, en: verdictEn, deltas, review
      });
      char.weaver = recordChoiceInGraph(char.weaver, char, event, { effects: loss }, verdict, verdictEn);
      closeThreads(char, event.id);
      if (char.stats.health <= 0) {
        const [woundVi, woundEn] = woundDeath(char, 'Gục ngã trong kỳ xét bậc', 'Succumbed during a promotion trial');
        applyFatalOrCompanionSave(char, woundVi, woundEn);
      } else if (char.stats.sanity <= 0) handleSanityBreakdown(char, rng);
      char.weaver = updateDramaTension(char.weaver, char);
      return char;
    }
    if (promotionChoice) char[retryKey] = null;
  }
  if (event.id.startsWith('fixer_promo_')) {
    char.lastFixerExamAge = char.age;
    const trialGrade = event.choices?.find((entry) => entry.setFixerGrade != null)?.setFixerGrade;
    char.fixerTrialRetryGrade = trialGrade ?? null;
    if (choice.setFixerGrade != null && rng() >= fixerPromotionSuccessChance(char, choice.setFixerGrade)) {
      const loss = fixerPromotionFailureEffects(choice.setFixerGrade);
      const before = { ...char.stats };
      // The attempt still goes into Hana's report: a little Merit, and a better chance next time
      const noted = Math.max(2, 9 - choice.setFixerGrade);
      char.merit = (char.merit || 0) + noted;
      char.fixerExamFailures = { ...(char.fixerExamFailures || {}), [choice.setFixerGrade]: (char.fixerExamFailures?.[choice.setFixerGrade] || 0) + 1 };
      const healthFloor = (before.health ?? 50) >= 45 ? 1 : 0;
      char.stats.health = clamp(char.stats.health + loss.health, healthFloor, 100);
      char.stats.wealth = clamp(char.stats.wealth + loss.wealth, 0, 100);
      char.stats.sanity = clamp(char.stats.sanity + loss.sanity, 0, 100);
      const vi = `Hana không công nhận kết quả sát hạch Grade ${choice.setFixerGrade}. Bạn trở về với thương tích, phí điều trị và bồi hoàn; có thể xin thi lại từ năm sau nếu vẫn đủ điều kiện.`;
      const en = `Hana did not certify your Grade ${choice.setFixerGrade} trial. You returned injured, with treatment and compensation costs; you may try again next year if you still qualify.`;
      char.logs.push({
        id: `log_ev_${char.age}_${event.id}_failed`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'major',
        choiceVi: choice.labelVi,
        choiceEn: choice.labelEn,
        review,
        vi,
        en,
        deltas: Object.keys(loss).map((k) => ({ k, v: char.stats[k] - before[k] })).filter((delta) => delta.v)
      });
      char.weaver = recordChoiceInGraph(char.weaver, char, event, { effects: loss }, vi, en);
      closeThreads(char, event.id);
      if (char.stats.health <= 0) {
        const [woundVi, woundEn] = woundDeath(char, 'Gục ngã trong kỳ sát hạch của Hana', 'Succumbed during a Hana qualification trial');
        applyFatalOrCompanionSave(char, woundVi, woundEn);
      } else if (char.stats.sanity <= 0) {
        handleSanityBreakdown(char, rng);
      }
      char.weaver = updateDramaTension(char.weaver, char);
      return char;
    }
    if (choice.setFixerGrade != null) char.fixerTrialRetryGrade = null;
  }
  markOpenedDoor(char, event.id);
  advanceActiveNarrativeArcs(char, event.id);
  if (event.id === 'distort_arc_star_calamity_ascension' &&
      char.activeArcs?.some((arc) => arc.id === 'arc_carmen_distortion_abyss' && arc.status === 'active' && arc.currentStage === 3)) {
    advanceActiveNarrativeArcs(char, 'distort_star_of_city_rampage');
    closeThreads(char, 'distort_star_of_city_rampage', { playedEventId: event.id });
  }
  if (event.id === 'ad_career_second_application') char.lastCareerApplicationAge = char.age;

  // Determine outcome (direct choice or weighted outcome roll)
  let outcome = choice;
  const rawOutcomes = choice.outcomes || choice.out;
  if (Array.isArray(rawOutcomes) && rawOutcomes.length > 0) {
    const evaluatedOutcomes = weightedOutcomes(choice, char);
    const totalW = evaluatedOutcomes.reduce((s, entry) => s + entry.weight, 0);
    let roll = rng() * totalW;
    for (const { outcome: candidate, weight } of evaluatedOutcomes) {
      roll -= weight;
      if (roll <= 0) {
        outcome = candidate;
        break;
      }
    }
  }

  // Merge effects from both choice and rolled outcome (supports both .effects and .fx formats)
  const startDungeonId = outcome.startDungeon || choice.startDungeon;
  // A gate answered, entered or not, starts the wait before the next one
  if (event.id.startsWith('gate_')) char.lastGateAge = char.age;
  const printsNumbers = PRINTED_NUMBERS.test(`${outcome.resultVi || outcome.rvi || ''}${choice.resultVi || choice.rvi || ''}`);
  const rolled = mergeEffects(choice, outcome);
  const effectiveCostAhn = getChoiceAhnCost(choice, char);
  if (effectiveCostAhn && (choice.fx?.wealth ?? choice.effects?.wealth ?? rolled.wealth) === -effectiveCostAhn) {
    rolled.wealth = (rolled.wealth || 0) + effectiveCostAhn;
  }
  const effects = printsNumbers ? rolled : varyEffects(rolled, rng, traitsOf(char));
  for (const key of [...(choice.exactFx || []), ...(outcome === choice ? [] : outcome.exactFx || [])]) {
    if (key in rolled) effects[key] = rolled[key];
  }
  if (/^fixer_promo_/.test(event.id) && effects.health < 0) effects.health = Math.ceil(effects.health * 0.65);
  // Entering a dungeon only sets the scene: the stages pay out, so the entry itself never pays twice
  if (startDungeonId) for (const key of Object.keys(effects)) effects[key] = 0;
  if (effectiveCostAhn) effects.wealth = (effects.wealth || 0) - effectiveCostAhn;
  const itemId = outcome.itemAdd || choice.itemAdd;
  const purchasedItem = ITEMS_CATALOG.find(i => i.id === itemId);
  if (purchasedItem) char.inventory.push({ ...purchasedItem });
  if (effects.health) char.stats.health = clamp(char.stats.health + effects.health, 0, 100);
  if (effects.sanity) char.stats.sanity = clamp(char.stats.sanity + effects.sanity, 0, 100);
  if (effects.wealth) {
    const beforeEventW = char.stats.wealth || 0;
    if (effects.wealth > 0 && beforeEventW + effects.wealth > 100) {
      char.reserveAhn = (char.reserveAhn || 0) + (beforeEventW + effects.wealth - 100);
    }
    char.stats.wealth = clamp(beforeEventW + effects.wealth, 0, 100);
  }
  const reserveAdd = (choice.reserveAdd || 0) + (outcome === choice ? 0 : outcome.reserveAdd || 0);
  if (reserveAdd) char.reserveAhn = Math.max(0, (char.reserveAhn || 0) + reserveAdd);
  if (effects.network) char.stats.network = clamp(char.stats.network + effects.network, 0, 100);
  if (effects.rep) char.stats.rep = clamp(char.stats.rep + (printsNumbers ? effects.rep : reputationGain(char.stats.rep, effects.rep)), 0, 100);
  if (effects.heat) char.heat = clamp((char.heat || 0) + effects.heat, 0, 100);
  if (effects.taboo) char.taboo = clamp((char.taboo || 0) + effects.taboo, 0, 3);
  if (effects.resonance) char.resonance = clamp((char.resonance || 0) + effects.resonance, 0, 100);
  if (effects.standing) char.standing = clamp((char.standing ?? 50) + effects.standing, 0, 100);
  if (effects.leverage) char.leverage = clamp((char.leverage || 0) + effects.leverage, 0, 100);

  rememberResonance(char, effects.resonance || 0);
  if (event.id === 'hana_color_ascension_trial') char.lastColorTrialAge = char.age;

  // Career / Faction / Region mutations
  const setJob = outcome.setJob || choice.setJob;
  if (CAREER_CROSSROAD_IDS.includes(event.id) && setJob === 'Outcast') char.lastCareerApplicationAge = char.age;
  if (char.job === 'Child' && setJob && setJob !== 'Child') char.merit = 0;
  if (setJob === 'Wing Employee' && char.job !== 'Wing Employee') char.wingEmployerId = char.regionId;
  if (setJob) char.job = setJob;
  if (choice.clearFinger || outcome.clearFinger) {
    char.finger = null;
    char.fingerRank = 0;
  }

  const setFixerGrade = outcome.setFixerGrade ?? choice.setFixerGrade;
  const previousFixerGrade = char.fixerGrade;
  if (setFixerGrade !== undefined) {
    char.fixerGrade = setFixerGrade;
  }

  // Color Fixer Promotion & Title Assignment
  const isColorPromote = choice.promote === 'ColorFixer' || outcome.promote === 'ColorFixer' ||
    choice.flagsAdd?.includes('ColorFixer') || outcome.flagsAdd?.includes('ColorFixer') ||
    choice.flags?.includes('ColorFixer') || outcome.flags?.includes('ColorFixer') ||
    choice.openColorModal || outcome.openColorModal;
  if (isColorPromote) {
    char.fixerGrade = 0;
    if (!char.flags.includes('ColorFixer')) char.flags.push('ColorFixer');
    char.colorAwardAge ??= char.age;
    markColorInvestiture(char);
  }

  const assignedTitle = outcome.customTitle || choice.customTitle ||
    outcome.customTitleVi || choice.customTitleVi ||
    outcome.customTitleEn || choice.customTitleEn;
  if (assignedTitle) {
    char.customTitle = assignedTitle;
  }

  const setFinger = outcome.setFinger || choice.setFinger;
  if (setFinger) {
    char.finger = setFinger;
    char.flags = char.flags.filter(f => !/^Finger(Thumb|Index|Middle|Ring|Pinky)$/.test(f));
    char.flags.push(`Finger${setFinger}`);
  }

  const previousFingerRank = char.fingerRank || 0;
  const setFingerRank = outcome.setFingerRank ?? choice.setFingerRank;
  if (setFingerRank !== undefined) {
    if (setFingerRank > (char.fingerRank || 0)) char.lastFingerPromotionAge = char.age;
    char.fingerRank = setFingerRank;
  }

  const setWingRank = outcome.setWingRank ?? choice.setWingRank;
  if (setWingRank !== undefined) {
    if (setWingRank > (char.wingRank || 0)) char.lastWingPromotionAge = char.age;
    char.wingRank = setWingRank;
  }

  const setSyndicateRank = outcome.setSyndicateRank ?? choice.setSyndicateRank;
  if (setSyndicateRank !== undefined) {
    char.syndicateRank = setSyndicateRank;
  }

  const setOrg = outcome.setOrg || choice.setOrg;
  if (setOrg) {
    char.org = setOrg;
    ensureAffiliation(char);
  }

  const setRegion = outcome.setRegion || choice.setRegion;
  if (setRegion) char.regionId = setRegion;

  // Finger missions were written without Merit, so a member's ladder stalled while a Fixer's did not
  const missionMerit = event.mission && char.job === 'Syndicate' ? 4 + (char.fingerRank || 0) * 3 : 0;
  const listedMerit = startDungeonId ? 0 : (choice.meritAdd || 0) + (outcome === choice ? 0 : outcome.meritAdd || 0) ||
    (startDungeonId ? 0 : missionMerit);
  const meritAdd = isFixerCareerEvent(event) ? Math.round(listedMerit * BALANCE.fixerMeritScale) : listedMerit;
  if (meritAdd) {
    if (char.job === 'Child') {
      char.stats.rep = clamp((char.stats.rep || 0) + Math.round(meritAdd * 0.5), 0, 100);
    } else {
      char.merit = Math.max(0, char.merit + meritAdd);
    }
  }
  if ((event.id.startsWith('fixer_promo_') || event.id.startsWith('fixer_ego_leap_')) && char.fixerGrade < previousFixerGrade) {
    const earnedAtGrade = FIXER_LADDER.find((step) => step.grade === char.fixerGrade)?.meritReq || 0;
    const nextRequirement = FIXER_LADDER.find((step) => step.grade === char.fixerGrade - 1)?.meritReq || COLOR_FIXER_REQ.merit;
    const retained = earnedAtGrade + Math.floor(Math.max(0, char.merit - earnedAtGrade) *
      (char.flags.includes('SevenExceptionalRecord') ? 0.85 : meritRetentionAfterPromotion(char.fixerGrade)));
    char.merit = char.flags.includes('SevenExceptionalRecord') ? retained : Math.min(nextRequirement - 10, retained);
  }
  if ((char.fingerRank || 0) > previousFingerRank && char.finger && FINGER_LADDERS[char.finger]) {
    const ladder = FINGER_LADDERS[char.finger];
    const earnedAtRank = ladder.find((step) => step.rank === char.fingerRank)?.meritReq || 0;
    const nextRequirement = ladder.find((step) => step.rank === char.fingerRank + 1)?.meritReq || 220;
    char.merit = Math.min(nextRequirement - 12,
      earnedAtRank + Math.floor(Math.max(0, char.merit - earnedAtRank) * 0.25));
  }

  // Flags, Scars, Codex Records, NPCs, Memories (Persistent Causality)
  const flagsAdd = [
    ...(choice.flagsAdd || []),
    ...(choice.flags || []),
    ...(outcome.flagsAdd || []),
    ...(outcome.flags || [])
  ];
  flagsAdd.forEach(f => {
    if (!char.flags.includes(f)) {
      char.flags.push(f);
      if (f === 'Married') char.flags = char.flags.filter((x) => x !== 'Widowed' && x !== 'Separated');
      if (f === 'ColorFixer') {
        char.job = 'Color Fixer';
        char.fixerGrade = 0;
      }
      if (f === 'Distorted') {
        const distortLogs = triggerDistortionTransformation(char);
        char.logs.push(...distortLogs);
      }
    }
  });

  const flagsRemove = [
    ...(choice.flagsRemove || []),
    ...(outcome.flagsRemove || [])
  ];
  applyColorTrialCompanionState(char, flagsAdd);
  if (flagsRemove.length > 0) {
    char.flags = char.flags.filter(f => !flagsRemove.includes(f));
  }
  if (setRegion === 'OUTSKIRTS') {
    char.flags = char.flags.filter(f => f !== 'Nest' && f !== 'Feather');
    if (!char.flags.includes('Outskirts')) char.flags.push('Outskirts');
  } else if (setRegion) {
    const wasOutside = char.regionId === 'OUTSKIRTS' || char.flags.includes('Outskirts');
    char.flags = char.flags.filter(f => f !== 'Outskirts');
    if (wasOutside && !char.flags.includes('EnteredCity')) char.flags.push('EnteredCity');
  }

  const scarsAdd = [
    ...(choice.scarsAdd || []),
    ...(choice.scars || []),
    ...(choice.scar ? [choice.scar] : []),
    ...(outcome.scarsAdd || []),
    ...(outcome.scars || []),
    ...(outcome.scar ? [outcome.scar] : [])
  ];
  scarsAdd.forEach(s => {
    const interpolated = interpolateText(s, char);
    addScar(char, interpolated);
  });

  // Persistent Memories: Choices remain etched into character's past
  const memList = [
    choice.mem,
    outcome.mem,
    choice.memory,
    outcome.memory,
    ...(choice.memories || []),
    ...(outcome.memories || [])
  ].filter(Boolean);
  memList.forEach(m => {
    if (!hasMemory(char, m)) {
      char.memory = [...(char.memory || []), { key: m, choiceId: `${event.id}_c${choiceIdx}`, eventId: event.id, role: event.need?.npc || Object.keys(choice.bond || outcome.bond || {})[0] || null, age: char.age }];
    }
  });

  const recordsAdd = [...(choice.recordsAdd || []), ...(outcome.recordsAdd || [])];
  recordsAdd.forEach(r => {
    if (!char.unlockedRecords.includes(r)) char.unlockedRecords.push(r);
  });

  applyBonds(char, outcome === choice ? [choice] : [choice, outcome]);
  const majorNpcRole = event.need?.npc || Object.keys(choice.bond || outcome.bond || {})[0] || null;
  if (majorNpcRole && !hasMemory(char, `${event.id}_c${choiceIdx}`)) char.memory = [...(char.memory || []), { key: `${event.id}_c${choiceIdx}`, choiceId: `${event.id}_c${choiceIdx}`, eventId: event.id, role: majorNpcRole, age: char.age }];

  const allSources = outcome === choice ? [choice] : [choice, outcome];
  markHabitChallengeTriggered(char, event);
  recordChoiceMotif(char, allSources, choice, event);

  // Process companion personal quests (npcQuest) and relationship promotions
  for (const src of allSources) {
    if (src.npcQuest && Array.isArray(src.npcQuest)) {
      for (const role of src.npcQuest) {
        const key = char.npcs?.[role] ? role : role === 'lover' && char.npcs?.spouse ? 'spouse' : null;
        const target = key && char.npcs[key];
        if (!target || !npcIsActive(target)) continue;
        const questsDone = (target.questsDone || 0) + 1;
        const yearsTogether = yearsTogetherOf(char, target);
        const lifted = { ...target, questsDone, lastSeen: char.age };
        const cap = bondCapFor({ ...lifted, yearsTogether });
        const bondNow = Math.min(cap, (lifted.bond || 0) + 14);
        char.npcs = { ...char.npcs, [key]: { ...lifted, bond: Math.max(lifted.bond || 0, bondNow) } };
        char.memory = [...(char.memory || []), { key: `quest_${key}_${questsDone}`, age: char.age }];
      }
    }
    if (src.promote) {
      const p = src.promote;
      const from = char.npcs?.[p.from];
      if (from && npcIsActive(from) && !npcIsActive(char.npcs?.[p.to])) {
        char.npcs = { ...char.npcs, [p.to]: { ...from, role: p.to, lastSeen: char.age, needsNaming: false, namedPrompted: true }, [p.from]: null };
        if (p.to === 'spouse') {
          char.flags = [...(char.flags || []).filter((x) => x !== 'Widowed' && x !== 'Separated'), ...(char.flags.includes('Married') ? [] : ['Married'])];
        }
      }
    }
  }

  const npcAdd = outcome.npcAdd || choice.npcAdd;
  if (npcAdd && npcAdd.role) {
    const lover = char.npcs?.lover;
    if (npcAdd.role === 'spouse' && npcIsActive(lover)) {
      char.npcs.spouse = { ...lover, role: 'spouse', bond: Math.max(lover.bond || 0, npcAdd.bond || 0), lastSeen: char.age, needsNaming: false, namedPrompted: true };
      char.npcs.lover = null;
    } else if (!char.npcs[npcAdd.role] || char.npcs[npcAdd.role].deceased) {
      const base = makeNpc(npcAdd.role, rng, { metAge: char.age, lastSeen: char.age, ...(npcAdd.ageAtMeet == null ? {} : { ageAtMeet: npcAdd.ageAtMeet }), avoidNames: namesInUse(char) });
      char.npcs[npcAdd.role] = {
        ...base,
        ...(npcAdd.nameVi ? { nameVi: npcAdd.nameVi, nameEn: npcAdd.nameEn || npcAdd.nameVi, needsNaming: false, namedPrompted: true } : {}),
        ...(npcAdd.traitVi ? { traitVi: npcAdd.traitVi, traitEn: npcAdd.traitEn || npcAdd.traitVi } : {}),
        bond: Math.abs(npcAdd.bond || 70)
      };
      // Someone new in a role that was lost ends that loss flag
      const lostFlag = { friend: 'FriendLost', partner: 'PartnerLost', mentor: 'MentorLost', child: 'ChildLost' }[npcAdd.role];
      if (lostFlag) char.flags = char.flags.filter((f) => f !== lostFlag);
    }
  }

  const npcFate = outcome.npcFate || choice.npcFate;
  if (npcFate) {
    for (const [role, status] of Object.entries(npcFate)) {
      applyNpcFate(char, role, status);
    }
  }

  // Joining, leaving or standing in an Association or Office, and the junior under your wing
  applyAffiliationChoice(char, choice);
  if (outcome !== choice) applyAffiliationChoice(char, outcome);

  // Structured Debts Management (Fixer license & street loans)
  if (!char.debts) char.debts = [];
  const debtsAdd = [...(choice.debtsAdd || []), ...(outcome.debtsAdd || [])];
  debtsAdd.forEach((d) => {
    if (!char.debts.some((existing) => existing.id === d.id)) {
      char.debts.push({
        id: d.id,
        creditorId: d.creditorId || 'backstreets_pawn_creditor',
        principalAhn: d.principalAhn ?? d.balanceAhn ?? 8,
        balanceAhn: d.balanceAhn ?? d.principalAhn ?? 8,
        createdAge: d.createdAge ?? char.age,
        nextDueAge: d.nextDueAge ?? (char.age + 1),
        missedPayments: d.missedPayments ?? 0,
        status: d.status || 'active',
        originEventId: d.originEventId || event.id
      });
    }
  });

  const debtsSettle = [...(choice.debtsSettle || []), ...(outcome.debtsSettle || [])];
  debtsSettle.forEach((debtId) => {
    const d = char.debts.find((item) => item.id === debtId);
    if (d) {
      d.status = 'settled';
      d.balanceAhn = 0;
    }
    if (debtId === 'fixer_license_debt') {
      char.flags = char.flags.filter((f) => f !== 'FixerLicenseDebt');
    }
  });

  const debtRepay = outcome.debtRepay || choice.debtRepay;
  if (debtRepay && debtRepay.id) {
    const d = char.debts.find((item) => item.id === debtRepay.id && item.status === 'active');
    if (d) {
      const repayAmount = debtRepay.amount === 'partial' ? Math.min(3, d.balanceAhn) : (debtRepay.amount || 0);
      const amount = Math.min(d.balanceAhn, repayAmount);
      d.balanceAhn -= amount;
      if (debtRepay.nextDueAge != null) d.nextDueAge = debtRepay.nextDueAge;
      else if (debtRepay.deferYears) d.nextDueAge = char.age + debtRepay.deferYears;
      if (d.balanceAhn <= 0) {
        d.status = 'settled';
        d.balanceAhn = 0;
        if (d.id === 'fixer_license_debt') {
          char.flags = char.flags.filter((f) => f !== 'FixerLicenseDebt');
        }
      }
    }
  }

  const debtPenalty = outcome.debtPenalty || choice.debtPenalty;
  if (debtPenalty && debtPenalty.id) {
    const d = char.debts.find((item) => item.id === debtPenalty.id && item.status === 'active');
    if (d) {
      d.missedPayments = (d.missedPayments || 0) + 1;
      if (debtPenalty.principalAdd) {
        d.principalAhn += debtPenalty.principalAdd;
        d.balanceAhn += debtPenalty.principalAdd;
      }
      if (debtPenalty.deferYears) d.nextDueAge = char.age + debtPenalty.deferYears;
    }
  }

  // Interactive Modals (Workshop Crafting / Naming E.G.O / Color Title)
  if (choice.openCraftModal || outcome.openCraftModal) {
    char.pendingModal = 'craft_weapon';
  }
  if (choice.openEgoModal || outcome.openEgoModal) {
    char.pendingModal = 'ego_name';
  }
  if (choice.openColorModal || outcome.openColorModal) {
    char.pendingModal = 'color_title';
    char.fixerGrade = 0;
    char.job = 'Color Fixer';
    if (!char.flags.includes('ColorFixer')) char.flags.push('ColorFixer');
    char.colorAwardAge ??= char.age;
    markColorInvestiture(char);
  }

  // Micro-Dungeon Delve trigger
  if (startDungeonId && char.alive) {
    char.pendingDungeon = createDungeonSession(startDungeonId, char);
    if (char.pendingDungeon && !DUNGEON_DEFINITIONS[startDungeonId]?.noRetreat && !DUNGEON_DEFINITIONS[startDungeonId]?.noWager) char.pendingDungeon.delveStake = dungeonWagerLevel(dungeonStake);
    if (choice.dungeonPrep === 'supplies') {
      char.pendingDungeon.maxSupplies += 1;
      char.pendingDungeon.supplyCharges += 1;
    }
    // A run taken for the Association moves standing when it ends
    if (char.pendingDungeon && (choice.dungeonAff || outcome.dungeonAff)) char.pendingDungeon.aff = getAffiliation(char)?.id || null;
  }
  if (event.id === ENSEMBLE_INVITE_ID || event.id === ENSEMBLE_LAST_CALL_ID) recordEnsembleInvitation(char, Boolean(startDungeonId));

  const partialDebtSettled = choice.debtCost === 'partial' && debtBalanceAtChoice != null && debtBalanceAtChoice <= 3;
  const resultVi = partialDebtSettled ? choice.resultViSettled : outcome.resultVi || outcome.rvi || choice.resultVi || choice.rvi;
  const resultEn = partialDebtSettled ? choice.resultEnSettled : outcome.resultEn || outcome.ren || choice.resultEn || choice.ren;
  let textVi = interpolateText(resultVi || '', char, debtTextValues);
  let textEn = interpolateText(resultEn || '', char, debtTextValues);
  if (choice.ensembleDecline) {
    const final = char.ensemble.declines >= 2;
    textVi += final ? ` Lần tới, ở tuổi ${char.ensemble.nextAge}, buổi diễn sẽ bắt buộc bắt đầu. Bạn có một năm để chuẩn bị; lần đó không được rút lui.` : ` Lời mời sẽ trở lại sớm nhất ở tuổi ${char.ensemble.nextAge}. Bạn còn một lần từ chối.`;
    textEn += final ? ` At age ${char.ensemble.nextAge}, the performance will begin by force. You have one year to prepare; that visit allows no retreat.` : ` The invitation will return no earlier than age ${char.ensemble.nextAge}. You have one refusal left.`;
  }

  char.logs.push({
    id: `log_ev_${char.age}_${event.id}`,
    age: char.age,
    season: SEASONS[char.seasonIdx],
    type: event.isCausalCallback ? 'causal' : (event.major ? 'major' : 'choice'),
    // 'major' is a weight class for events, hundreds of them; only a choice that moved the life is a turning point
    ...(lifeStandingSignature(char) !== standingBefore ? { turning: true } : {}),
    choiceVi: choice.labelVi,
    choiceEn: choice.labelEn,
    review,
    vi: textVi,
    en: textEn
  });

  // Record in the Weaver AI Causal Memory Graph & schedule any delayed consequences!
  const allConsequences = [
    ...(choice.scheduleConsequences || []),
    ...(outcome === choice ? [] : outcome.scheduleConsequences || []),
    ...(choice.later || []).map(l => ({ eventId: l.id, delayYears: l.years, reasonVi: l.reasonVi, reasonEn: l.reasonEn })),
    ...(outcome === choice ? [] : outcome.later || []).map(l => ({ eventId: l.id, delayYears: l.years, reasonVi: l.reasonVi, reasonEn: l.reasonEn }))
  ];
  const effectiveChoice = {
    ...choice,
    ...outcome,
    scheduleConsequences: allConsequences,
    scarsAdd
  };
  char.weaver = recordChoiceInGraph(char.weaver, char, event, effectiveChoice, textVi, textEn);

  // Mark any thread targeting this event as fulfilled
  closeThreads(char, event.id);

  // A life can end by choice: the character walks away or hands the seat on, and the chronicle closes
  if ((outcome.endsLife || choice.endsLife) && char.alive) {
    closeLifeByChoice(char, outcome.lifeEnding || choice.lifeEnding, outcome.deathCauseVi || choice.deathCauseVi, outcome.deathCauseEn || choice.deathCauseEn);
  } else if (outcome.deathCauseVi || char.stats.health <= 0) {
    const [woundVi, woundEn] = woundDeath(char, 'Gục ngã vì vết thương quá nặng', 'Succumbed to fatal wounds');
    applyFatalOrCompanionSave(char, outcome.deathCauseVi || woundVi, outcome.deathCauseEn || woundEn);
    if (!char.alive && (outcome.lifeEnding || choice.lifeEnding)) char.lifeEnding = outcome.lifeEnding || choice.lifeEnding;
  } else if (char.stats.sanity <= 0) {
    handleSanityBreakdown(char, rng);
  }

  const promoLogs = checkPromotions(char);
  char.logs.push(...promoLogs);
  char.weaver = updateDramaTension(char.weaver, char);

  if (char.childhoodMontage?.active && !char.pendingDungeon && !char.pendingModal) {
    advanceChildhoodMontage(char, {
      events: ALL_STORY_EVENTS,
      interpolateText,
      openedDoors: char.openedDoors || [],
      rng
    });
  }

  return char;
}
