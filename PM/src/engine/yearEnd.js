// The end of a year: income, upkeep, ageing, city conditions and the next year's plan.
import { ALL_STORY_EVENTS, applyFatalOrCompanionSave, cloneChar, handleSanityBreakdown, woundDeath } from './gameEngine.js';
import { BALANCE, agingLoss, calmAmount, driftOf, effectiveAge, frailty, hasEstablishedStanding, healAmount, midlifeMaintenanceLoss } from './economyModel.js';
import { REGIONS } from '../data/worldData.js';
import { YEAR_END_LINES } from '../data/yearEndLines.js';
import { addScar, scarAnnualEffects } from './scarModel.js';
import { affiliationYearTick } from './affiliation.js';
import { ageNpcCompanions, driftBonds, keepInTouch } from './director.js';
import { ambitionComplete } from './annualPlan.js';
import { applyFx, isNest, isOutskirts, planYear, pushLog, settle } from './yearPlanner.js';
import { applyRegionalSingularityPassive } from './cityUpgrades.js';
import { getNextFixerPromotion, getOtherCareerPromotion } from './careerPipeline.js';
import { npcIsActive } from './eventConditions.js';
import { planFirstGate } from './dungeonPacing.js';
import { reachedCareerAge } from './careerAge.js';
import { simulateNpcAutonomousLife } from './narrativeArcEngine.js';
import { syncVisibleDoorsForChar } from './lockedDoors.js';
import { updateDramaTension } from './weaverAI.js';

/* ---------- the turn of the year ---------- */

export const JOB_INCOME = (char) => {
  if (char.flags?.includes('ColorFixer') || char.job === 'Color Fixer') return 12;
  switch (char.job) {
    case 'Fixer':
      return 2 + Math.round((9 - Math.min(9, char.fixerGrade)) * 0.7);
    case 'Syndicate': {
      const synRank = Math.max(char.fingerRank || 0, (!char.finger && char.flags?.includes('IndependentSyndicate')) ? Math.min(3, Math.max(0, char.syndicateRank || 0)) : 0);
      return 3 + synRank * 2 + (synRank >= 3 ? 3 : 0);
    }
    case 'Wing Employee':
      return 4 + (char.wingRank || 0);
    case 'Workshop Craftsman':
      return 3;
    default:
      return 1;
  }
};

/**
 * Closes the year: income against living costs, slow healing, the Backstreets'
 * wear, ageing (each written into one plain line with its deltas), then the
 * birthday and the next year's plan.
 */
/**
 * One sentence for a year-end reason, fitted to the life stage, and never the
 * variant this character got last time for the same reason.
 */
function yearLine(char, rng, key, n) {
  const set = YEAR_END_LINES[key];
  const stage = char.age < 4 ? 'baby' : char.age < 13 ? 'kid' : 'adult';
  const pool = set[stage] || set.kid || set.adult;
  const last = char.yearEndLast?.[key];
  let idx = Math.floor(rng() * pool.length);
  if (pool.length > 1 && idx === last) idx = (idx + 1) % pool.length;
  char.yearEndLast = { ...(char.yearEndLast || {}), [key]: idx };
  const fill = (s) => (n == null ? s : s.replace('{n}', n));
  return [fill(pool[idx][0]), fill(pool[idx][1])];
}

export function endYear(charState, rng) {
  const char = cloneChar(charState);
  if (!char.alive) return char;
  // A companion hurt in a dungeon clash sits out a year, then can walk with you again
  const returned = [];
  for (const [role, raw] of Object.entries(char.npcs || {})) {
    let npc = raw;
    // Someone who left for a while (npcAway) comes back on their own once the years are up
    if (npc?.status === 'away' && npc.returnAge != null && (char.age || 0) >= npc.returnAge) {
      const { status, returnAge, ...rest } = npc;
      npc = { ...rest, lastSeen: char.age || 0 };
      char.npcs = { ...char.npcs, [role]: npc };
      returned.push(npc);
    }
    // Older saves marked a shielding companion `status: 'wounded'` with no way back; give them a year to heal
    if (npc?.status === 'wounded') {
      const { status, ...rest } = npc;
      npc = { ...rest, injured: true, injurySeverity: 'severe', injuredAtAge: char.age || 0, healsAtAge: (char.age || 0) + 1 };
      char.npcs = { ...char.npcs, [role]: npc };
    }
    if (npc?.injured && npc.healsAtAge != null && (char.age || 0) >= npc.healsAtAge) {
      char.npcs = { ...char.npcs, [role]: { ...npc, injured: false, injurySeverity: null, healsAtAge: null } };
    }
  }
  const region = REGIONS.find((r) => r.id === char.regionId) || REGIONS[0];
  const nest = isNest(char);
  const fx = {};
  const breakdown = [];
  const vi = [];
  const en = [];
  const add = (k, v) => {
    if (v) fx[k] = (fx[k] || 0) + v;
  };
  const line = (key, n) => {
    const [lv, le] = yearLine(char, rng, key, n);
    vi.push(lv);
    en.push(le);
  };
  for (const npc of returned) {
    const years = Math.max(1, (char.age || 0) - (npc.awayAge ?? char.age ?? 0));
    vi.push(`${npc.nameVi} trở về sau ${years} năm đi xa và gõ cửa nhà bạn trước tiên.`);
    en.push(`${npc.nameEn || npc.nameVi} comes back after ${years} years away and knocks on your door first.`);
  }

  if (reachedCareerAge(char) && !char.flags.includes('Distorted')) {
    let livingCost = nest ? 5 : isOutskirts(char) ? 2 : 3;

    // Head Weapons & Firearms Tax: Strictly enforced by The Head & Tres Association
    const hasFirearms = (char.inventory || []).some(i => i.id?.includes('revolver') || i.id?.includes('logic')) || char.flags.includes('Firearms');
    if (hasFirearms) {
      livingCost += 3;
      line('firearms_tax');
    }

    // Workshop Master Weapon Maintenance
    const hasWorkshopGear = (char.inventory || []).some(i => i.id?.startsWith('wpn_') || i.id?.startsWith('arm_')) || char.craftWeapon;
    if (hasWorkshopGear && rng() < 0.6) {
      livingCost += 2;
      line('gear_upkeep');
    }

    // Full-Body Cybernetic Maintenance
    if (char.flags.includes('FullBodyProsthetic')) {
      livingCost += 3;
      line('prosthetic_upkeep');
    }

    const assetCost = Math.min(4, Math.max(0, Math.floor((char.stats.wealth - 45) / 15) + 1));
    if (assetCost > 0) {
      livingCost += assetCost;
      line('asset_cost', assetCost);
    }

    const careerIncome = JOB_INCOME(char);
    const patronDividend = char.flags?.includes('EndgameOfficePatron') ? 4 : 0;
    if (careerIncome > 0) {
      breakdown.push({ cat: 'economy', labelVi: 'Thu nhập nghề nghiệp', labelEn: 'Career income', k: 'wealth', v: careerIncome, unit: 'Ahn' });
    }
    if (patronDividend > 0) {
      breakdown.push({ cat: 'economy', labelVi: 'Cổ tức tài trợ Office & Địa bàn', labelEn: 'Office & territory patronage dividend', k: 'wealth', v: patronDividend, unit: 'Ahn' });
    }
    if (livingCost > 0) {
      breakdown.push({ cat: 'economy', labelVi: 'Sinh hoạt, thuế & bảo dưỡng', labelEn: 'Living, taxes & maintenance', k: 'wealth', v: -livingCost, unit: 'Ahn' });
    }
    const marketJitter = Math.round(rng() * 2 - 1);
    if (marketJitter !== 0) {
      breakdown.push({ cat: 'economy', labelVi: 'Biến động thị trường & chi tiêu phát sinh', labelEn: 'Market fluctuations & miscellaneous expenses', k: 'wealth', v: marketJitter, unit: 'Ahn' });
    }
    const net = careerIncome + patronDividend - livingCost + marketJitter;
    add('wealth', net);
    if (net > 0) {
      line('income_up');
    } else if (net < 0) {
      line('income_down');
    }
  } else {
    // Childhood living friction: survival is harsh, money gets spent on family necessities
    if (!nest) {
      if (char.stats.wealth > 4 && rng() < 0.4) {
        const drain = Math.min(2, Math.max(1, Math.floor(char.stats.wealth * 0.15)));
        add('wealth', -drain);
        line('child_friction');
        breakdown.push({ cat: 'economy', labelVi: 'Chi tiêu sinh hoạt gia đình', labelEn: 'Family necessities', k: 'wealth', v: -drain, unit: 'Ahn' });
      }
    } else {
      if (char.stats.wealth > 14 && rng() < 0.35) {
        const drain = Math.min(3, Math.max(1, Math.floor(char.stats.wealth * 0.12)));
        add('wealth', -drain);
        line('nest_tuition');
        breakdown.push({ cat: 'economy', labelVi: 'Học phí & sinh hoạt Nest', labelEn: 'Nest tuition & living', k: 'wealth', v: -drain, unit: 'Ahn' });
      }
    }
  }

  // Healthcare & Wounds recovery vs Street clinic expenses vs Distortion anomaly tissue regeneration
  if (char.flags.includes('Distorted')) {
    if (char.stats.health < BALANCE.heal.below || char.flags.includes('AbyssalDistortionApex')) {
      const bonus = char.flags.includes('AbyssalDistortionApex') ? 4 : 0;
      const anomalyRegen = Math.max(8, Math.round(((char.resonance || 50) * 0.16))) + bonus;
      add('health', anomalyRegen);
      line('heal_distortion_tissue');
      breakdown.push({ cat: 'recovery', labelVi: 'Tái tạo mô dị thường', labelEn: 'Anomalous regeneration', k: 'health', v: anomalyRegen, unit: 'HP' });
    }
  } else if (char.stats.health < BALANCE.heal.below) {
    if (char.flags.includes('KCorpAmpoule')) {
      const amt = healAmount(char, 'ampoule');
      add('health', amt);
      line('heal_ampoule');
      breakdown.push({ cat: 'recovery', labelVi: 'Phục hồi huyết thanh K Corp', labelEn: 'K Corp Ampoule recovery', k: 'health', v: amt, unit: 'HP' });
    } else if (nest) {
      const amt = healAmount(char, 'nest');
      add('health', amt);
      line('heal_nest');
      breakdown.push({ cat: 'recovery', labelVi: 'Điều dưỡng y tế Nest', labelEn: 'Nest medical recovery', k: 'health', v: amt, unit: 'HP' });
    } else if (char.stats.wealth >= 3 && reachedCareerAge(char)) {
      add('wealth', -2);
      const amt = healAmount(char, 'clinic');
      add('health', amt);
      line('heal_clinic');
      breakdown.push({ cat: 'economy', labelVi: 'Phí phòng khám hẻm', labelEn: 'Backstreet clinic fee', k: 'wealth', v: -2, unit: 'Ahn' });
      breakdown.push({ cat: 'recovery', labelVi: 'Điều trị vết thương', labelEn: 'Wound treatment', k: 'health', v: amt, unit: 'HP' });
    } else {
      const amt = healAmount(char, 'natural');
      add('health', amt);
      line('heal_natural');
      breakdown.push({ cat: 'recovery', labelVi: 'Tự phục hồi thể trạng', labelEn: 'Natural health recovery', k: 'health', v: amt, unit: 'HP' });
    }
  }

  // Mental Sanity recovery vs Tavern comfort
  const bond = ['spouse', 'partner', 'friend', 'mentor', 'child'].some((k) => npcIsActive(char.npcs?.[k]) && (char.npcs[k].bond || 0) >= 50);
  if (char.stats.sanity < BALANCE.calm.below && !char.flags.includes('Distorted')) {
    if (bond) {
      const amt = calmAmount(char, 'bond');
      add('sanity', amt);
      line('calm_bond');
      breakdown.push({ cat: 'recovery', labelVi: 'Sự an ủi từ người thân', labelEn: 'Companion comfort', k: 'sanity', v: amt, unit: 'SP' });
    } else if (char.stats.wealth >= 2 && reachedCareerAge(char)) {
      add('wealth', -1);
      const amt = calmAmount(char, 'tavern');
      add('sanity', amt);
      line('calm_tavern');
      breakdown.push({ cat: 'economy', labelVi: 'Chi tiêu quán rượu', labelEn: 'Tavern comfort expense', k: 'wealth', v: -1, unit: 'Ahn' });
      breakdown.push({ cat: 'recovery', labelVi: 'Xoa dịu tinh thần', labelEn: 'Sanity soothing', k: 'sanity', v: amt, unit: 'SP' });
    } else {
      const amt = calmAmount(char, 'natural');
      add('sanity', amt);
      line('calm_natural');
      breakdown.push({ cat: 'recovery', labelVi: 'Thời gian xoa dịu', labelEn: 'Natural sanity recovery', k: 'sanity', v: amt, unit: 'SP' });
    }
  }

  const scarEffects = scarAnnualEffects(char);
  if (Object.keys(scarEffects).length) {
    for (const [key, value] of Object.entries(scarEffects)) {
      add(key, value);
      breakdown.push({ cat: 'wear', labelVi: 'Ảnh hưởng từ vết sẹo', labelEn: 'Toll from permanent scars', k: key, v: value });
    }
    vi.push('Những dấu tích còn mang đã đòi phần của chúng.');
    en.push('The marks you carry took their toll.');
  }
  if ((char.resonance || 0) >= 90 && !char.flags.includes('Distorted') && !char.flags.includes('EGOAwakened')) {
    add('sanity', -2);
    breakdown.push({ cat: 'wear', labelVi: 'Tiếng gọi Carmen từ cộng hưởng cực hạn', labelEn: "Carmen's call from peak resonance", k: 'sanity', v: -2, unit: 'SP' });
    vi.push('Cộng hưởng quá cao khiến tiếng nói của Carmen khó lắng xuống.');
    en.push('High resonance made Carmen’s voice harder to quiet.');
  }

  if (reachedCareerAge(char) && ['Fixer', 'Color Fixer', 'Syndicate', 'Wing Employee', 'Workshop Craftsman'].includes(char.job) && !char.flags.includes('Distorted')) {
    const wear = char.job === 'Fixer' || char.job === 'Color Fixer' || char.job === 'Syndicate' ? 2 : 1;
    const spStrain = char.job === 'Wing Employee' || char.job === 'Syndicate' ? 3 : 2;
    add('health', -wear);
    add('sanity', -spStrain);
    line('job_wear');
    breakdown.push({ cat: 'wear', labelVi: 'Hao mòn nghề nghiệp', labelEn: 'Career wear', k: 'health', v: -wear, unit: 'HP' });
    breakdown.push({ cat: 'wear', labelVi: 'Căng thẳng công việc', labelEn: 'Career mental strain', k: 'sanity', v: -spStrain, unit: 'SP' });
  }

  const maintenanceCost = midlifeMaintenanceLoss(char);
  if (maintenanceCost > 0) {
    if ((char.stats?.wealth || 0) + (fx.wealth || 0) < maintenanceCost && (char.reserveAhn || 0) > 0) {
      const drawn = Math.min(char.reserveAhn, Math.max(maintenanceCost, 15));
      char.reserveAhn -= drawn;
      add('wealth', drawn);
      breakdown.push({
        cat: 'income',
        labelVi: 'Rút dự trữ từ Quỹ Bảo Tồn',
        labelEn: 'Withdrawal from Reserve Vault',
        k: 'wealth',
        v: drawn,
        unit: 'Ahn'
      });
    }
    if ((char.stats?.wealth || 0) + (fx.wealth || 0) >= maintenanceCost) {
      add('wealth', -maintenanceCost);
      breakdown.push({
        cat: 'wear',
        labelVi: 'Bảo trì thể trạng & thuốc ức chế đau',
        labelEn: 'Body maintenance & pain suppression',
        k: 'wealth',
        v: -maintenanceCost,
        unit: 'Ahn'
      });
      if (char.flags?.includes('PainSuppressantDeficit')) {
        char.flags = char.flags.filter((f) => f !== 'PainSuppressantDeficit');
      }
    } else {
      if (!char.flags?.includes('PainSuppressantDeficit')) {
        char.flags = [...(char.flags || []), 'PainSuppressantDeficit'];
        add('sanity', -1);
        breakdown.push({
          cat: 'wear',
          labelVi: 'Thiếu thuốc ức chế đau & khớp sẹo nhức nhối',
          labelEn: 'Pain suppressant deficit & aching scar tissue',
          k: 'sanity',
          v: -1,
          unit: 'SP'
        });
      }
    }
  }

  // City environmental hazards (Smog in polluted districts, Crime in dangerous districts)
  if (!nest && char.age >= 4) {
    if (region.pollution >= 5 && rng() < 0.35) {
      add('health', -2);
      line('smog');
      breakdown.push({ cat: 'wear', labelVi: 'Khói độc công nghiệp', labelEn: 'Industrial smog', k: 'health', v: -2, unit: 'HP' });
    }
    if (region.safety <= 4 && rng() < 0.35) {
      add('sanity', -2);
      line('gunfire');
      breakdown.push({ cat: 'wear', labelVi: 'Bạo lực đường phố', labelEn: 'Street violence', k: 'sanity', v: -2, unit: 'SP' });
    }
  }

  if ((char.heat || 0) > 0) {
    add('heat', -1);
    breakdown.push({ cat: 'drift', labelVi: 'Dịu nhiệt truy vết', labelEn: 'Heat dissipation', k: 'heat', v: -1 });
  }
  // Secrets go stale and a record that has been leaned on too long gets noticed
  if (char.job === 'Wing Employee') {
    if ((char.leverage || 0) > 0 && char.age % 2 === 0) {
      add('leverage', -1);
      breakdown.push({ cat: 'drift', labelVi: 'Tài liệu mật lỗi thời', labelEn: 'Leverage depreciation', k: 'leverage', v: -1 });
    }
    if ((char.leverage || 0) >= 60) {
      add('standing', -1);
      breakdown.push({ cat: 'wear', labelVi: 'Nghi ngờ nội bộ vì nắm quá nhiều bí mật', labelEn: 'Internal suspicion from excessive leverage', k: 'standing', v: -1 });
    }
  }
  // A Distortion is never off Hana's books, and people stop recognizing you.
  // One who found a human voice again (eventsDistortionVoice.js) is still on the books, but recognized.
  if (char.flags.includes('Distorted')) {
    const humanVoice = char.flags.includes('HumanVoice');
    const isSovereign = char.flags.includes('DistortionLabyrinthSovereign');
    const isWanderer = char.flags.includes('DistortionLucidWanderer');
    const isCalamity = char.flags.includes('DistortionPrimordialCalamity');
    const watch = humanVoice ? 3 : 6;
    add('heat', watch);
    breakdown.push({ cat: 'drift', labelVi: 'Truy vết Distortion từ Hiệp hội Hana', labelEn: 'Hana Distortion surveillance', k: 'heat', v: watch });
    if (!humanVoice && !isWanderer) {
      add('network', -2);
      breakdown.push({ cat: 'drift', labelVi: 'Cô lập xã hội do Biến dị', labelEn: 'Social isolation from Distortion', k: 'network', v: -2 });
    }
    if (isSovereign) {
      add('heat', -3);
      add('wealth', 3);
      breakdown.push({ cat: 'drift', labelVi: 'Lãnh địa sương mù che khuất truy vết (Lãnh Chúa Mê Cung)', labelEn: 'Labyrinth mist conceals surveillance (Labyrinth Sovereign)', k: 'heat', v: -3 });
      breakdown.push({ cat: 'income', labelVi: 'Chiến lợi phẩm từ kẻ xâm nhập lãnh địa', labelEn: 'Spoils from domain intruders', k: 'wealth', v: 3, unit: 'Ahn' });
    } else if (isWanderer) {
      add('sanity', 3);
      add('wealth', 3);
      breakdown.push({ cat: 'drift', labelVi: 'Neo giữ lý trí (Dị Thể Tỉnh Thức)', labelEn: 'Anchored lucidity (Lucid Wanderer)', k: 'sanity', v: 3, unit: 'SP' });
      breakdown.push({ cat: 'income', labelVi: 'Khế ước ngầm của Dị Thể Tỉnh Thức', labelEn: 'Underground pacts of the Lucid Wanderer', k: 'wealth', v: 3, unit: 'Ahn' });
    } else if (isCalamity) {
      add('health', 4);
      add('resonance', 3);
      breakdown.push({ cat: 'drift', labelVi: 'Tái tạo sinh học dị thể (Tai Ương Nguyên Thủy)', labelEn: 'Anomalous regeneration (Primordial Calamity)', k: 'health', v: 4, unit: 'HP' });
      breakdown.push({ cat: 'drift', labelVi: 'Cộng hưởng vực thẳm (Tai Ương Nguyên Thủy)', labelEn: 'Abyssal resonance surge (Primordial Calamity)', k: 'resonance', v: 3, unit: 'Res' });
    }
    vi.push(humanVoice
      ? 'Hana vẫn giữ hồ sơ của bạn, nhưng trong đó giờ ghi tên bạn bằng chữ.'
      : 'Hồ sơ theo dõi cá thể Distortion của bạn tại trụ sở Hana Association vẫn giữ nguyên trạng thái truy vết.');
    en.push(humanVoice
      ? 'Hana still keeps your file, but it now carries your name in writing.'
      : 'Your active Distortion dossier at Hana Association remained open under high-priority watch.');
  }
  for (const meet of keepInTouch(char, rng)) pushLog(char, { key: 'keep_in_touch', type: 'story', ...meet }, 0.97);
  driftBonds(char);

  // What events keep raising also wears off: resonance, fame and connections need feeding
  const nextFixerExam = getNextFixerPromotion(char);
  const nextOtherExam = getOtherCareerPromotion(char);
  const protectedThresholds = nextFixerExam?.isEligible
    ? { rep: nextFixerExam.repReq, merit: nextFixerExam.meritReq }
    : nextOtherExam?.isEligible
      ? { merit: nextOtherExam.meritReq, rep: nextOtherExam.repReq, network: nextOtherExam.networkReq }
      : {};
  const drift = driftOf(char, bond ? 2 : 0, protectedThresholds);
  for (const [k, v] of Object.entries(drift)) add(k, v);
  if (drift.network) {
    line(hasEstablishedStanding(char) || (char.age >= 60 && char.stats.rep >= 70) ? 'drift_network_established' : 'drift_network');
    breakdown.push({ cat: 'drift', labelVi: 'Quan hệ phai nhạt theo thời gian', labelEn: 'Network drift over time', k: 'network', v: drift.network });
  }
  if (drift.rep) {
    line('drift_rep');
    breakdown.push({ cat: 'drift', labelVi: 'Danh tiếng lắng xuống', labelEn: 'Reputation drift', k: 'rep', v: drift.rep });
  }
  if (drift.resonance) {
    line('drift_resonance');
    breakdown.push({ cat: 'drift', labelVi: 'Cộng hưởng suy giảm', labelEn: 'Resonance fading', k: 'resonance', v: drift.resonance });
  }

  const wear = agingLoss(char);
  const oldAge = wear > 0;
  if (wear > 0) {
    add('health', -wear);
    line(char.flags.includes('FullBodyProsthetic') ? 'aging_prosthetic' : effectiveAge(char) >= 65 ? 'aging_late' : 'aging_early', wear);
    breakdown.push({ cat: 'wear', labelVi: 'Hao mòn tuổi tác', labelEn: 'Aging physical loss', k: 'health', v: -wear, unit: 'HP' });
  }

  const deltas = applyFx(char, fx);

  const statUnits = {
    health: 'HP',
    sanity: 'SP',
    wealth: 'Ahn',
    heat: 'Heat',
    leverage: 'Lev',
    rep: 'Rep',
    merit: 'Merit',
    resonance: 'Res',
    standing: 'Stand',
    network: 'Net'
  };
  const trackedKeys = new Set([...breakdown.map((b) => b.k), ...deltas.map((d) => d.k)]);
  for (const k of trackedKeys) {
    const bSum = breakdown.filter((b) => b.k === k).reduce((acc, b) => acc + (b.v || 0), 0);
    const dVal = deltas.find((d) => d.k === k)?.v ?? 0;
    const diff = dVal - bSum;
    if (diff !== 0) {
      breakdown.push({
        cat: 'limit',
        labelVi: diff > 0 ? 'Chặn giới hạn tối thiểu' : 'Chặn giới hạn tối đa',
        labelEn: diff > 0 ? 'Clamped at lower bound' : 'Clamped at upper bound',
        k,
        v: diff,
        unit: statUnits[k] || ''
      });
    }
  }

  const npcAutonomyLogs = [...ageNpcCompanions(char, rng), ...simulateNpcAutonomousLife(char, rng)];
  for (const nlog of npcAutonomyLogs) {
    pushLog(
      char,
      {
        key: 'npc_autonomy',
        type: 'story',
        vi: nlog.vi,
        en: nlog.en,
        ...(nlog.deltas ? { deltas: nlog.deltas } : {})
      },
      0.98
    );
  }

  for (const affLog of affiliationYearTick(char, rng)) pushLog(char, affLog, 0.985);
  planFirstGate(char);

  // Distortion Apex Metamorphosis payoff (T22)
  if (char.flags.includes('Distorted') && (char.resonance || 0) >= 100 && (char.stats?.health || 0) >= 80 && !char.flags.includes('AbyssalDistortionApex')) {
    char.flags.push('AbyssalDistortionApex');
    if (!(char.unlockedRecords || []).includes('distortion_metamorphosis_apex')) {
      char.unlockedRecords = [...(char.unlockedRecords || []), 'distortion_metamorphosis_apex'];
    }
    pushLog(char, {
      key: 'distortion_apex_achieved',
      type: 'miracle',
      vi: '[Biến Dị Vực Thẳm Hoàn Tất] Thể xác và dục vọng của bạn vượt qua ngưỡng giới hạn. Các mô thịt dị thường kết tinh thành hình thái tối thượng, giải phóng uy lực áp đảo (+4 HP/năm và +14 Sức chiến đấu).',
      en: '[Abyssal Apex Metamorphosis Complete] Your flesh and desire breached the mortal threshold. Anomalous tissues crystallized into supreme form (+4 HP/year and +14 Combat Power).'
    }, 0.99);
  }

  if (deltas.length > 0 || breakdown.length > 0) {
    // Up to age 4 a year closes on its first line only; the chips and the breakdown still list every reason
    const keep = char.age <= 4 ? 1 : vi.length;
    const textVi = vi.length ? vi.slice(0, keep).join(' ') : 'Một năm nữa lặng lẽ trôi qua dưới màn đêm không bao giờ tắt của The City.';
    const textEn = en.length ? en.slice(0, keep).join(' ') : 'Another year quietly drifted by beneath the never-dimming lights of the City.';
    pushLog(
      char,
      {
        key: 'year_end',
        type: 'summary',
        vi: `[Cuối năm] ${textVi}`,
        en: `[Year's end] ${textEn}`,
        deltas,
        breakdown
      },
      0.99
    );
  }

  // Hard knocks the City deals on its own
  if ((char.stats?.wealth || 0) <= 5 && (char.reserveAhn || 0) > 0) {
    const drawn = Math.min(char.reserveAhn, 20);
    char.reserveAhn -= drawn;
    const d = applyFx(char, { wealth: drawn });
    pushLog(
      char,
      {
        key: 'reserve_ahn_draw',
        type: 'story',
        vi: `[Quỹ Bảo Tồn] Tiền mặt cạn dần. Bạn rút ${drawn} Ahn từ Quỹ Bảo Tồn dự trữ để giữ cho cuộc sống không rơi vào tay đám đòi nợ.`,
        en: `[Reserve Vault] Cash ran low. You withdrew ${drawn} Ahn from your Reserve Vault to keep collectors away from your door.`,
        deltas: d
      },
      0.99
    );
  }
  if (reachedCareerAge(char) && char.stats.wealth <= 0 && !nest && !char.flags.includes('Distorted')) {
    const d = applyFx(char, { health: -20, sanity: -12, wealth: 14, resonance: 10 });
    addScar(char, 'Vết mổ trả nợ');
    pushLog(
      char,
      {
        key: 'organ_debt',
        type: 'danger',
        vi: 'Không còn đồng Ahn nào để trả tiền trọ. Đám đòi nợ đưa bạn tới một phòng khám không biển hiệu và lấy đi thứ đáng giá nhất bạn còn: một quả thận.',
        en: 'You had no Ahn left for rent. The collectors took you to an unmarked clinic and took the most valuable thing you still had: a kidney.',
        deltas: d
      },
      0.99
    );
  }
  if (char.age >= 16 && (char.heat || 0) >= 65 && rng() < 0.35) {
    const distorted = char.flags.includes('Distorted');
    const d = applyFx(char, distorted ? { health: -14, sanity: -6, heat: -14 } : { health: -18, sanity: -8, heat: -18 });
    pushLog(
      char,
      {
        key: 'heat_ambush',
        type: 'danger',
        vi: distorted
          ? 'Một đội Fixer của Hana chặn cả hai đầu hẻm, mang theo lưới thép và đèn pha. Bạn phá được một bức tường để thoát, và để lại một phần cơ thể dưới lưới.'
          : 'Ba kẻ đeo mặt nạ chờ sẵn ở đầu hẻm. Bạn thoát được, nhưng mang về một vết dao dài trên sườn.',
        en: distorted
          ? 'A Hana-sent Fixer team sealed both ends of the alley with steel nets and floodlights. You broke through a wall to escape, and left part of your body under the net.'
          : 'Three masked figures were waiting at the mouth of the alley. You got away, with a long knife wound along your ribs.',
        deltas: d
      },
      0.99
    );
  }

  if (char.stats.health <= 0) {
    const [woundVi, woundEn] = woundDeath(char, 'Gục xuống vì vết thương và kiệt sức', 'Collapsed from wounds and exhaustion');
    applyFatalOrCompanionSave(
      char,
      oldAge ? 'Ra đi vì tuổi già, dưới ánh đèn không bao giờ tắt của The City' : woundVi,
      oldAge ? 'Passed of old age beneath the City’s never-dimming lights' : woundEn
    );
    return char;
  }
  if (char.stats.sanity <= 0) {
    handleSanityBreakdown(char, rng);
    if (!char.alive) return char;
  }

  // Birthday
  char.bodyAge = Number((effectiveAge(char) + frailty(char)).toFixed(2));
  char.age += 1;
  if (char.companionSynergy && (char.age - (char.companionSynergy.year ?? 0)) > 1) {
    char.companionSynergy = null;
  }
  char.bodyAgeRecordedAt = char.age;
  char.seasonIdx = 0;
  if (char.ambition && !char.ambition.complete && ambitionComplete(char)) char.ambition.complete = true;
  char.weaver = {
    ...char.weaver,
    yearsSinceLastMajor: (char.weaver?.yearsSinceLastMajor || 0) + 1,
    yearsSinceLastCrisis: (char.weaver?.yearsSinceLastCrisis || 0) + 1
  };
  if (reachedCareerAge(char) && (char.job === 'Fixer' || char.job === 'Color Fixer' || char.job === 'Syndicate')) applyFx(char, { merit: 2 });
  if (char.lastRelocatedAge !== undefined) applyRegionalSingularityPassive(char);
  settle(char, 0, rng);
  char.weaver = updateDramaTension(char.weaver, char);
  if (char.alive) {
    syncVisibleDoorsForChar(char, { events: ALL_STORY_EVENTS, openedDoors: char.openedDoors || [], rng });
    planYear(char, rng);
    // A working life plans its year on the same screen as the year's leads
    if (reachedCareerAge(char) && char.job !== 'Child') char.pendingYearPlan = { age: char.age };
  }
  return char;
}
