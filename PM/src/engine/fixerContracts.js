// Fixer Requests: building an offer and settling the approach the player chose.
import { CAREER_REQUESTS } from '../data/careerContractTemplates.js';
import { CONTRACT_ROUTES, contractRouteOf, equivalentGrade } from '../data/careerContracts.js';
import { FATE_OMENS, updateDramaTension } from './weaverAI.js';
import { FIXER_REQUESTS } from '../data/eventsSupernatural.js';
import { SEASONS, clamp } from './gameEngine.js';
import { THREAT_TIERS } from '../data/worldData.js';
import { annualSchemeContractPower } from './annualPlan.js';
import { applyFatalOrCompanionSave } from './lifeEnding.js';
import { applyNpcFate } from './director.js';
import { checkPromotions } from './careerMilestones.js';
import { cloneChar } from './characterCreation.js';
import { egoEdge } from './egoEdge.js';
import { evaluateCompanionSupport } from '../data/npcPersonality.js';
import { getImbuedCombatBonus } from './cityUpgrades.js';
import { hasColorSignatureWeapon } from './dungeonEngine.js';
import { laneContractMods, laneContractSet, noteAffiliationContract } from './affiliation.js';
import { rememberResonance } from './awakeningProgress.js';
import { reputationGain } from './economyModel.js';
import { scarContractPower } from './scarModel.js';

/**
 * Generates an interactive Fixer Contract with 3 tactical choices (Methodical, Bold, Seven Intel)
 */
export function generateFixerContract(char, rng, overrideTemplate = null) {
  const route = contractRouteOf(char) || 'fixer';
  // A Fixer's work comes by lane: an Association's own board, an Office's, or the open one
  const laneSet = route === 'fixer' ? laneContractSet(char) : null;
  const mods = route === 'fixer' ? laneContractMods(char, equivalentGrade(char, route)) : laneContractMods({}, 9);
  const cfg = laneSet ? laneSet.cfg : route === 'fixer' ? null : CONTRACT_ROUTES[route];
  const effGrade = equivalentGrade(char, route);
  let maxTier = 0;
  if (effGrade <= 1) maxTier = 5;
  else if (effGrade <= 3) maxTier = 4;
  else if (effGrade <= 5) maxTier = 3;
  else if (effGrade <= 7) maxTier = 2;
  else maxTier = 1;
  maxTier = Math.max(1, maxTier - mods.tierCap);

  const pool = laneSet ? laneSet.pool : cfg ? CAREER_REQUESTS[route] : FIXER_REQUESTS;
  const inBand = pool.filter(r => r.tier <= maxTier && r.tier >= Math.max(0, maxTier - 2));
  // A career should not hand out the same commission twice in a row
  const recent = new Set((char.contractLog || []).slice(-6));
  const fresh = inBand.filter((r) => !recent.has(r.id));
  const candidateReqs = fresh.length >= 2 ? fresh : inBand;
  const template = overrideTemplate || candidateReqs[Math.floor(rng() * candidateReqs.length)] || pool[0];
  const baseTier = THREAT_TIERS[template.tier] || THREAT_TIERS[0];
  const tierInfo = cfg ? { ...baseTier, nameVi: cfg.tiers[template.tier].nameVi, nameEn: cfg.tiers[template.tier].nameEn } : baseTier;

  // Specific stakes and danger scaling matching narrated peril
  const isHighStakes = Boolean(
    template.highDanger ||
    template.tier >= 3 ||
    (template.vi && /vòng vây|sát thủ|tử thủ|dị thể|thanh trừng|bắn tỉa|chợ đen|tử chiến|liều mạng/i.test(template.vi))
  );
  const stakePayBonus = template.payBonus ?? (isHighStakes ? Math.max(2, Math.round(tierInfo.basePay * 0.25)) : 0);
  const stakeMeritBonus = template.meritBonus ?? (isHighStakes ? Math.max(1, Math.round(tierInfo.baseMerit * 0.2)) : 0);
  const effectiveBasePay = tierInfo.basePay + stakePayBonus;
  const effectiveBaseMerit = tierInfo.baseMerit + stakeMeritBonus;
  const stakesTag = isHighStakes
    ? { vi: 'Nguy cơ cao · Thù lao bổng lộc', en: 'High Peril · Premium Pay' }
    : null;

  let power = 48 + (9 - effGrade) * 7.5;
  if (route === 'middle' || route === 'wing') power += ((char.stats.network ?? 40) - 40) * 0.12;
  if (route === 'thumb' || route === 'pinky') power += ((char.stats.health ?? 50) - 50) * 0.1;
  power += (char.stats.health - 50) * 0.25;
  power += (char.stats.sanity - 50) * 0.2;
  power += scarContractPower(char);
  const hasCombatGear = Boolean(
    char.craftWeapon ||
    (char.inventory || []).some((item) => item?.type === 'weapon' || item?.type === 'armor') ||
    hasColorSignatureWeapon(char) ||
    char.flags.includes('유물') ||
    char.flags.includes('CraftedColorWeapon')
  );
  if (hasCombatGear && (char.flags.includes('고급장비') || char.flags.includes('유물') || char.craftWeapon)) {
    power += 12;
  }
  // The Color commission and the engraved blade are carried into every contract after
  if (hasColorSignatureWeapon(char)) power += 16;
  power += getImbuedCombatBonus(char) * 0.6;
  if (char.flags.includes('EGOAwakened') || char.flags.includes('ShinAwakened')) power += 18;
  if (char.flags.includes('AbyssalDistortionApex')) power += 14;
  const compSupport = evaluateCompanionSupport(char);
  power += compSupport.contractPower;
  power += annualSchemeContractPower(char);
  if (char.flags?.includes('EndgameOfficePatron')) power += 6;

  const difficulty = 32 + template.tier * 16;
  const baseSuccess = clamp(Math.round(55 + (power - difficulty) * 1.1 + egoEdge(char) * 100 + mods.successDelta), 18, 94);
  const pay = (base) => Math.max(1, Math.round(base * mods.payMult));
  const baseDeath = clamp(Math.round((100 - baseSuccess) * (0.12 + template.tier * 0.05)), 2, 42);
  const approachOdds = (successPct, wantedDeathPct) => {
    const deathPct = clamp(wantedDeathPct, 1, 100 - successPct);
    return { successPct, failPct: 100 - successPct - deathPct, deathPct };
  };

  return {
    id: `${template.id}_${char.age}`,
    combatPower: power,
    route,
    lane: laneSet?.lane || null,
    affId: laneSet?.affId || null,
    kickerVi: cfg?.kickerVi || null,
    kickerEn: cfg?.kickerEn || null,
    template,
    tierInfo,
    stakesTag,
    companionSupport: compSupport.active ? {
      role: compSupport.role,
      nameVi: compSupport.npc.nameVi,
      nameEn: compSupport.npc.nameEn,
      bond: compSupport.npc.bond ?? 22,
      stateId: compSupport.state.id,
      stateVi: compSupport.state.vi,
      stateEn: compSupport.state.en,
      powerDelta: compSupport.contractPower,
      betrayalRisk: compSupport.betrayalRisk
    } : null,
    approaches: [
      {
        id: 'careful',
        labelVi: cfg?.careful[0] || 'Làm chậm mà chắc',
        labelEn: cfg?.careful[1] || 'Slow and careful',
        ...approachOdds(clamp(baseSuccess + 8, 25, 96), Math.max(1, Math.round(baseDeath * 0.55))),
        payAhn: pay(effectiveBasePay),
        meritGain: effectiveBaseMerit,
        costAhn: 0
      },
      {
        id: 'bold',
        labelVi: cfg?.bold[0] || 'Xông vào, xong sớm (thêm 50% Ahn và Merit)',
        labelEn: cfg?.bold[1] || 'Go in hard, finish fast (50% more Ahn and Merit)',
        ...approachOdds(clamp(baseSuccess - 8, 15, 90), clamp(Math.round(baseDeath * 1.45), 4, 55)),
        payAhn: pay(effectiveBasePay * 1.5),
        meritGain: Math.round(effectiveBaseMerit * 1.5),
        costAhn: 0
      },
      {
        id: 'intel',
        labelVi: cfg?.intel[0] || 'Mua hồ sơ mục tiêu của Seven Association (8 Ahn)',
        labelEn: cfg?.intel[1] || 'Buy the target file from Seven Association (8 Ahn)',
        ...approachOdds(clamp(baseSuccess + 18, 35, 98), 1),
        payAhn: pay(effectiveBasePay),
        meritGain: effectiveBaseMerit + 3,
        costAhn: 8
      },
      {
        id: 'decline',
        labelVi: 'Trả lại ủy thác',
        labelEn: 'Return the contract',
        successPct: 0,
        failPct: 0,
        deathPct: 0,
        payAhn: 0,
        meritGain: 0,
        costAhn: 0,
        isDecline: true
      }
    ]
  };
}

/**
 * What a non-Fixer contract leaves behind besides Ahn and Merit: heat, nerves, a name that remembers you.
 * Only a finished job plants a memory and a delayed callback; a failed one just costs.
 */
function applyContractAftermath(char, cfg, template, ok) {
  if (!cfg) return;
  const fx = ok ? cfg.okFx : cfg.failFx;
  for (const [key, value] of Object.entries(fx || {})) {
    if (key === 'heat') char.heat = clamp((char.heat || 0) + value, 0, 100);
    else if (key === 'standing') char.standing = clamp((char.standing ?? 50) + value, 0, 100);
    else if (key === 'leverage') char.leverage = clamp((char.leverage || 0) + value, 0, 100);
    else char.stats[key] = clamp((char.stats[key] ?? 0) + value, 0, 100);
  }
  if (ok && template.mem && !(char.memory || []).some((m) => m.key === template.mem)) {
    char.memory = [...(char.memory || []), { key: template.mem, age: char.age }];
  }
  if (ok && template.later) {
    const l = template.later;
    char.weaver = {
      ...char.weaver,
      pendingThreads: [...(char.weaver?.pendingThreads || []), {
        id: `thr_${char.age}_${l.id}`,
        kind: 'minor',
        eventId: l.id,
        plantedAtAge: char.age,
        triggerAge: char.age + (l.years || 3),
        reasonVi: l.reasonVi,
        reasonEn: l.reasonEn,
        fulfilled: false
      }]
    };
  }
}

/**
 * Resolves the player's chosen tactical approach on a Fixer Contract
 */
export function resolveFixerContract(charState, approachId, rng = Math.random) {
  const char = cloneChar(charState);
  const contract = char.pendingContract;
  if (!contract) return char;

  const approach = contract.approaches.find(a => a.id === approachId);
  if (!approach || char.stats.wealth < approach.costAhn) return char;
  const { template, tierInfo } = contract;
  const fixerRoute = !contract.route || contract.route === 'fixer';
  const cfg = !fixerRoute ? CONTRACT_ROUTES[contract.route] : contract.affId ? laneContractSet(char)?.cfg || null : null;
  const appendStandingNote = (outcome) => {
    const note = fixerRoute && contract.affId ? noteAffiliationContract(char, outcome, template) : null;
    const last = char.logs[char.logs.length - 1];
    if (note && last) { last.vi += ` ${note.vi}`; last.en += ` ${note.en}`; }
  };
  const tagVi = cfg?.tagVi || 'Request';
  const tagEn = cfg?.tagEn || 'Request';
  char.pendingContract = null;
  char.contractLog = [...(char.contractLog || []), template.id].slice(-12);

  if (approach.costAhn > 0) {
    char.stats.wealth = clamp(char.stats.wealth - approach.costAhn, 0, 100);
  }

  if (approach.id === 'decline') {
    const isHanaDispatch = template.tier >= 3;
    if (isHanaDispatch) char.stats.rep = clamp(char.stats.rep - 2, 0, 100);
    char.logs.push({
      id: `log_req_decline_${char.age}`,
      age: char.age,
      season: SEASONS[char.seasonIdx || 0],
      type: 'story',
      vi: cfg
        ? `[Từ chối · ${tagVi}] ${cfg.declineVi}${isHanaDispatch ? ' Uy tín giảm 2.' : ''}`
        : `[Từ chối ủy thác] Bạn trả lại hồ sơ ${template.nameVi || ''} trước khi nhận việc.${isHanaDispatch ? ' Hana ghi nhận một lần từ chối điều động; uy tín giảm 2.' : ' Không có thù lao hay công trạng.'}`,
      en: cfg
        ? `[Declined · ${tagEn}] ${cfg.declineEn}${isHanaDispatch ? ' Reputation fell by 2.' : ''}`
        : `[Contract Declined] You returned the file for ${template.nameEn || 'this assignment'} before accepting it.${isHanaDispatch ? ' Hana recorded a refused dispatch; reputation fell by 2.' : ' There is no pay or merit.'}`
    });
    appendStandingNote('decline');
    char.weaver = updateDramaTension(char.weaver, char);
    return char;
  }

  const omenObj = FATE_OMENS.find((o) => o.id === char.fateOmenId);
  const meritMult = omenObj?.meritMult || 1.0;
  const compSupport = evaluateCompanionSupport(char);

  // Low-bond companion clash or mid-mission betrayal check
  if (compSupport.active && compSupport.betrayalRisk > 0 && rng() < compSupport.betrayalRisk) {
    const traitor = compSupport.npc;
    const role = compSupport.role;
    const isFullBetrayal = (traitor.bond ?? 20) < 18 || rng() < 0.45;
    if (isFullBetrayal) {
      applyNpcFate(char, role, 'betrayer', char.age);
      if (!char.npcs.nemesis) {
        char.npcs = { ...char.npcs, nemesis: { ...traitor, role: 'nemesis', status: 'alive', bond: 0, lastSeen: char.age } };
      }
      char.stats.health = clamp(char.stats.health - (14 + template.tier * 4), 0, 100);
      char.stats.sanity = clamp(char.stats.sanity - 14, 0, 100);
      char.heat = clamp((char.heat || 0) + 12, 0, 100);
      char.resonance = clamp((char.resonance || 0) + 12, 0, 100);
      rememberResonance(char, 12);
      if (!char.flags.includes('BetrayedByCompanion')) char.flags.push('BetrayedByCompanion');
      char.weaver.pendingThreads = [
        ...(char.weaver.pendingThreads || []),
        {
          id: `thr_${char.age}_csq_npc_betrayer_ambush`,
          kind: 'major',
          eventId: 'csq_npc_betrayer_ambush',
          plantedAtAge: char.age,
          triggerAge: char.age + 3,
          reasonVi: `${traitor.nameVi} đã bán đứng bạn và vẫn còn ở ngoài kia`,
          reasonEn: `${traitor.nameEn} sold you out and is still out there`,
          fulfilled: false
        }
      ];
      char.logs.push({
        id: `log_req_betrayal_${char.age}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'danger',
        vi: `[Phản bội giữa nhiệm vụ · ${traitor.nameVi}] Giữa lúc giao chiến trong vụ ${template.nameVi || tierInfo.nameVi}, ${traitor.nameVi} đã bán lộ trình của bạn cho đối phương để lấy tiền thưởng, rồi bỏ mặc bạn giữa vòng vây.`,
        en: `[Mid-Contract Betrayal · ${traitor.nameEn}] In the middle of ${template.nameEn || tierInfo.nameEn}, ${traitor.nameEn} sold your route to the enemy for a payout and left you surrounded.`
      });
      if (char.stats.health <= 0) {
        applyFatalOrCompanionSave(char, template.deathVi, template.deathEn);
      }
      char.weaver = updateDramaTension(char.weaver, char);
      return char;
    } else {
      // Insubordination / clash during contract reduces successPct by 18% and costs HP/SP
      char.stats.health = clamp(char.stats.health - 5, 0, 100);
      char.stats.sanity = clamp(char.stats.sanity - 5, 0, 100);
      char.npcs = { ...char.npcs, [role]: { ...traitor, bond: Math.max(5, (traitor.bond || 20) - 4), lastSeen: char.age } };
      char.logs.push({
        id: `log_req_clash_${char.age}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'danger',
        vi: `[Xô xát nội bộ · ${traitor.nameVi}] Mối quan hệ rạn nứt khiến bạn và ${traitor.nameVi} cãi vã ngay trước giờ hành động, làm lộ vị trí và giảm mạnh tỉ lệ thành công.`,
        en: `[Internal Clash · ${traitor.nameEn}] Strained trust led to a bitter argument with ${traitor.nameEn} right before the strike, exposing your position and hurting your odds.`
      });
    }
  }

  const roll = rng() * 100;
  if (roll < approach.successPct) {
    const completed = char.contractRecord || { fixer: 0, wing: 0, independent: 0, fingers: {}, highestFixerTier: 0 };
    const route = contractRouteOf(char);
    char.contractRecord = {
      ...completed,
      fixer: (completed.fixer || 0) + (route === 'fixer' ? 1 : 0),
      wing: (completed.wing || 0) + (route === 'wing' ? 1 : 0),
      independent: (completed.independent || 0) + (route === 'independent_syndicate' ? 1 : 0),
      fingers: ['thumb', 'index', 'middle', 'ring', 'pinky'].includes(route) && char.finger
        ? { ...(completed.fingers || {}), [char.finger]: ((completed.fingers || {})[char.finger] || 0) + 1 }
        : { ...(completed.fingers || {}) },
      highestFixerTier: route === 'fixer' ? Math.max(completed.highestFixerTier || 0, template.tier || 0) : (completed.highestFixerTier || 0)
    };
    if (char.stats.health <= 25 && !char.unlockedRecords.includes('shi_boundary_of_death')) {
      char.unlockedRecords.push('shi_boundary_of_death');
    }
    // Near the top the Requests that matter are few; a Grade 1 or 2 Fixer is paid in Merit like it
    const topGradeMult = fixerRoute && (char.fixerGrade ?? 9) <= 2 ? 1.25 : 1;
    const gainedMerit = Math.round(approach.meritGain * meritMult * topGradeMult);
    const beforeContractW = char.stats.wealth || 0;
    if (approach.payAhn > 0 && beforeContractW + approach.payAhn > 100) {
      char.reserveAhn = (char.reserveAhn || 0) + (beforeContractW + approach.payAhn - 100);
    }
    char.stats.wealth = clamp(beforeContractW + approach.payAhn, 0, 100);
    char.stats.rep = clamp(char.stats.rep + reputationGain(char.stats.rep, Math.max(2, template.tier + 2)), 0, 100);
    char.merit += gainedMerit;
    if (compSupport.active && compSupport.state.id === 'sworn' && rng() < 0.45) {
      char.npcs = { ...char.npcs, [compSupport.role]: { ...compSupport.npc, bond: Math.min(100, (compSupport.npc.bond || 80) + 2), lastSeen: char.age } };
    }
    const assistNoteVi = compSupport.active && compSupport.contractPower >= 8
      ? ` Sự phối hợp ăn ý của ${compSupport.npc.nameVi} giúp bạn kết thúc gọn gàng.`
      : '';
    const assistNoteEn = compSupport.active && compSupport.contractPower >= 8
      ? ` ${compSupport.npc.nameEn}’s tight coordination made the finish clean.`
      : '';
    char.logs.push({
      id: `log_req_ok_${char.age}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'choice',
      vi: `[${cfg ? tagVi : 'Request hoàn thành'} · ${tierInfo.nameVi}] ${template.okVi}${assistNoteVi}`,
      en: `[${cfg ? tagEn : 'Request completed'} · ${tierInfo.nameEn}] ${template.okEn}${assistNoteEn}`
    });
    applyContractAftermath(char, cfg, template, true);
    appendStandingNote('ok');
  } else if (roll < approach.successPct + approach.failPct) {
    const isHighStakes = Boolean(contract.stakesTag);
    const hpLoss = (10 + template.tier * 5) + (isHighStakes ? 4 : 0);
    const spLoss = (6 + template.tier * 3) + (isHighStakes ? 3 : 0);
    char.stats.health = clamp(char.stats.health - hpLoss, 0, 100);
    char.stats.sanity = clamp(char.stats.sanity - spLoss, 0, 100);
    char.resonance = clamp((char.resonance || 0) + 8, 0, 100);
      rememberResonance(char, 8);
    if (compSupport.active && compSupport.contractPower < 0) {
      char.npcs = { ...char.npcs, [compSupport.role]: { ...compSupport.npc, bond: Math.max(5, (compSupport.npc.bond || 20) - 3), lastSeen: char.age } };
    }
    const frictionNoteVi = compSupport.active && compSupport.contractPower < 0
      ? ` Sự thiếu ăn ý và bất đồng với ${compSupport.npc.nameVi} khiến bạn trả giá đắt.`
      : '';
    const frictionNoteEn = compSupport.active && compSupport.contractPower < 0
      ? ` Friction and hesitation with ${compSupport.npc.nameEn} cost you dearly.`
      : '';

    char.logs.push({
      id: `log_req_fail_${char.age}`,
      age: char.age,
      season: SEASONS[char.seasonIdx],
      type: 'danger',
      vi: `[${cfg ? `${tagVi} thất bại` : 'Request thất bại'} · ${tierInfo.nameVi}] ${template.failVi}${frictionNoteVi}`,
      en: `[${cfg ? `${tagEn} failed` : 'Request failed'} · ${tierInfo.nameEn}] ${template.failEn}${frictionNoteEn}`
    });
    applyContractAftermath(char, cfg, template, false);
    appendStandingNote('fail');

    if (char.stats.health <= 0) {
      applyFatalOrCompanionSave(char, template.deathVi, template.deathEn);
    }
  } else {
    applyFatalOrCompanionSave(char, template.deathVi, template.deathEn);
  }

  const promoLogs = checkPromotions(char);
  char.logs.push(...promoLogs);
  char.weaver = updateDramaTension(char.weaver, char);
  return char;
}
