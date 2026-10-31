import { APEX_DIRECTIVES, isApexCommander, applyApexDirective, getApexDirectiveEffects } from './cityUpgrades.js';
import { npcIsActive } from './eventConditions.js';

export const YEAR_PLAN_POINTS = 3;
export { APEX_DIRECTIVES, isApexCommander };

export const YEAR_ACTIVITIES = [
  { id: 'train', vi: 'Rèn giũa kỹ năng', en: 'Hone skills', effectVi: 'Tập trung luyện thế kiếm và quy chuẩn tác chiến: +2% tỷ lệ đậu khảo hạch thăng bậc mỗi điểm (dồn 2 điểm: -2 HP; dồn 3 điểm: -4 HP quá tải cơ bắp)', effectEn: 'Focus on combat drills and protocols: +2% promotion exam pass rate per point (2 pts: -2 HP; 3 pts: -4 HP physical overstrain)' },
  { id: 'work', vi: 'Lao động mưu sinh', en: 'Scrape a living', effectVi: 'Đổi mồ hôi lấy tiền trọ và sinh hoạt: +2 Ahn/điểm (dồn 2 điểm: -3 SP; dồn 3 điểm: -6 SP kiệt sức)', effectEn: 'Sweat for rent and sustenance: +2 Ahn per point (2 pts: -3 SP; 3 pts: -6 SP burnout)' },
  { id: 'bond', vi: 'Móc nối quan hệ', en: 'Build ties', effectVi: 'Tạo dựng chỗ đứng và lòng tin với người xung quanh: +2 Quan hệ mỗi điểm', effectEn: 'Build standing and trust with those around you: +2 Network per point' },
  { id: 'rest', vi: 'Nghỉ ngơi dưỡng thần', en: 'Rest & recuperate', effectVi: 'Đóng chặt cửa sau giờ giới nghiêm, hàn gắn tâm trí: +3 SP mỗi điểm', effectEn: 'Bar the door after curfew, mend your mind: +3 SP per point' },
  { id: 'scheme', vi: 'Mưu tính luồn lách', en: 'Underground schemes', effectVi: 'Xóa dấu vết, tìm kiếm đòn bẩy quyền lực từ bóng tối: -2 Heat, +2 Đòn bẩy/điểm (dồn 2 điểm: -2 Gắn kết; dồn 3 điểm: -4 Gắn kết, +2 Heat)', effectEn: 'Cover tracks, seek leverage in the shadows: -2 Heat, +2 Leverage per point (2 pts: -2 Bond; 3 pts: -4 Bond, +2 Heat)' }
];

export const AMBITIONS = [
  { id: 'rank', vi: 'Gầy dựng vị thế vững chắc', en: 'Carve out an unshakeable station', detailVi: 'Leo lên nấc thang cao nhất trên con đường đã chọn trong The City.', detailEn: 'Climb to the highest rung on your chosen path in the City.' },
  { id: 'fortune', vi: 'Tích lũy tài sản phòng thân', en: 'Secure family savings', detailVi: 'Tích trữ ít nhất 80 Ahn để không bao giờ bị đuổi ra đường hay rơi vào cảnh bần cùng.', detailEn: 'Accumulate at least 80 Ahn to never face eviction or destitute ruin.' },
  { id: 'survive', vi: 'Tồn tại qua giông bão The City', en: 'Outlive the City', detailVi: 'Bảo toàn mạng sống đến tuổi 70 giữa chốn Backstreets tàn khốc.', detailEn: 'Survive to age 70 amidst the brutal Backstreets.' },
  { id: 'outskirts', vi: 'Vượt tường ra Outskirts', en: 'Exile beyond the Wall', detailVi: 'Thoát khỏi sự ngột ngạt của các Corp, tìm về vùng đất hoang bên ngoài The City.', detailEn: 'Escape corporate suffocation, seeking the free wasteland.' }
];

const inOutskirts = (char) => String(char?.regionId || '').toLowerCase().includes('outskirts') || Boolean(char?.flags?.includes('OutskirtsExile'));
const LADDER_JOBS = new Set(['Fixer', 'Color Fixer', 'Syndicate', 'Wing Employee', 'Workshop Craftsman']);

/** The ambitions that still mean something for this life: no ladder to climb, no Outskirts to reach if already there. */
export function ambitionsFor(char) {
  return AMBITIONS.filter((goal) => (goal.id !== 'rank' || LADDER_JOBS.has(char?.job)) && (goal.id !== 'outskirts' || !inOutskirts(char)));
}

export const defaultYearPoints = () => ({ train: 1, work: 1, bond: 0, rest: 1, scheme: 0 });

export function validYearPoints(points) {
  return points && YEAR_ACTIVITIES.every(({ id }) => Number.isInteger(points[id]) && points[id] >= 0 && points[id] <= YEAR_PLAN_POINTS) &&
    YEAR_ACTIVITIES.reduce((sum, { id }) => sum + points[id], 0) === YEAR_PLAN_POINTS;
}

export function previousYearPoints(char) {
  return validYearPoints(char?.lastYearPoints) ? { ...char.lastYearPoints } : null;
}

export function applyAnnualPlan(char, points, ambitionId, directiveId = null) {
  if (!char?.pendingYearPlan || char.pendingYearPlan.age !== char.age || !validYearPoints(points)) return false;
  if (!char.ambition && !ambitionsFor(char).some((goal) => goal.id === ambitionId)) return false;
  const p = { ...points };
  char.annualPlan = { age: char.age, points: p, directiveId: directiveId || null };
  char.lastYearPoints = p;
  if (!char.ambition) char.ambition = { id: ambitionId, chosenAge: char.age, complete: false };
  const stats = char.stats;
  stats.wealth = Math.min(100, (stats.wealth || 0) + p.work * 2);
  stats.network = Math.min(100, (stats.network || 0) + p.bond * 2);
  stats.sanity = Math.min(100, (stats.sanity || 0) + p.rest * 3);
  char.heat = Math.max(0, (char.heat || 0) - p.scheme * 2);
  char.leverage = Math.min(100, (char.leverage || 0) + p.scheme * 2);

  // Tangible trade-offs for heavy point allocation (2+ points)
  if (p.train === 2) stats.health = Math.max(1, (stats.health || 0) - 2);
  else if (p.train >= 3) stats.health = Math.max(1, (stats.health || 0) - 4);

  if (p.work === 2) stats.sanity = Math.max(1, (stats.sanity || 0) - 3);
  else if (p.work >= 3) stats.sanity = Math.max(1, (stats.sanity || 0) - 6);

  if (p.scheme >= 2) {
    const penalty = p.scheme >= 3 ? 4 : 2;
    const activeCompanions = Object.values(char.npcs || {}).filter(npcIsActive);
    for (const comp of activeCompanions) {
      const currentBond = typeof comp.bond === 'number' ? comp.bond : 40;
      comp.bond = Math.max(0, currentBond - penalty);
    }
    if (p.scheme >= 3) {
      char.heat = Math.min(100, (char.heat || 0) + 2);
    }
  }
  if (directiveId && isApexCommander(char)) {
    applyApexDirective(char, directiveId);
  }
  char.pendingYearPlan = null;
  return true;
}

/** Previews the combined net effect of assigned plan points and chosen apex directive */
export function previewAnnualPlanDeltas(char, points, directiveId = null) {
  const p = points || {};
  const stats = char?.stats || {};
  const hasCharStats = Boolean(char && char.stats);

  const initialWealth = hasCharStats && typeof stats.wealth === 'number' ? stats.wealth : 50;
  const initialHealth = hasCharStats && typeof stats.health === 'number' ? stats.health : 50;
  const initialSanity = hasCharStats && typeof stats.sanity === 'number' ? stats.sanity : 50;
  const initialNetwork = hasCharStats && typeof stats.network === 'number' ? stats.network : 40;
  const initialRep = hasCharStats && typeof stats.rep === 'number' ? stats.rep : 30;
  const initialHeat = char && typeof char.heat === 'number' ? char.heat : 0;
  const initialLeverage = char && typeof char.leverage === 'number' ? char.leverage : 0;
  const initialMerit = char && typeof char.merit === 'number' ? char.merit : 0;
  const initialResonance = char && typeof char.resonance === 'number' ? char.resonance : 0;
  const initialStanding = char && typeof char.standing === 'number' ? char.standing : 50;

  let w = initialWealth + (p.work || 0) * 2;
  w = Math.min(100, Math.max(0, w));

  let net = initialNetwork + (p.bond || 0) * 2;
  net = Math.min(100, Math.max(0, net));

  let san = initialSanity + (p.rest || 0) * 3;
  if ((p.work || 0) === 2) san -= 3;
  else if ((p.work || 0) >= 3) san -= 6;
  san = Math.min(100, Math.max(1, san));

  let hp = initialHealth;
  if ((p.train || 0) === 2) hp -= 2;
  else if ((p.train || 0) >= 3) hp -= 4;
  hp = Math.min(100, Math.max(1, hp));

  let h = initialHeat;
  h = Math.max(0, h - (p.scheme || 0) * 2);
  if ((p.scheme || 0) >= 3) h = Math.min(100, h + 2);

  let lev = initialLeverage + (p.scheme || 0) * 2;
  lev = Math.min(100, Math.max(0, lev));

  let rep = initialRep;
  let merit = initialMerit;
  let res = initialResonance;
  let standing = initialStanding;

  let apexBondBoost = 0;
  if (directiveId && isApexCommander(char)) {
    const effects = getApexDirectiveEffects(char, directiveId);
    if (effects) {
      const combined = { ...effects.fx };
      for (const [k, v] of Object.entries(effects.routeBonus)) {
        if (k === 'bondBoost') {
          combined.bondBoost = (combined.bondBoost || 0) + v;
        } else {
          combined[k] = (combined[k] || 0) + v;
        }
      }
      apexBondBoost = combined.bondBoost || 0;

      if (combined.costAhnOrRep) {
        if (w >= combined.costAhnOrRep) {
          w = Math.max(0, w - combined.costAhnOrRep);
        } else {
          rep = Math.max(0, rep - 3);
        }
      }
      if (combined.wealth) w = Math.min(100, Math.max(0, w + combined.wealth));
      if (combined.health) hp = Math.min(100, Math.max(1, hp + combined.health));
      if (combined.sanity) san = Math.min(100, Math.max(1, san + combined.sanity));
      if (combined.network) net = Math.min(100, Math.max(0, net + combined.network));
      if (combined.rep) rep = Math.min(100, Math.max(0, rep + combined.rep));
      if (combined.merit) merit = Math.max(0, merit + combined.merit);
      if (combined.resonance) res = Math.min(100, Math.max(0, res + combined.resonance));
      if (combined.leverage) lev = Math.min(100, Math.max(0, lev + combined.leverage));
      if (combined.standing) standing = Math.min(100, Math.max(0, standing + combined.standing));
      if (combined.heat) h = Math.min(100, Math.max(0, h + combined.heat));
    }
  }

  // Exact companion bond calculation considering active NPCs, current individual bonds, and 0–100 clamping limits
  const activeCompanions = Object.entries(char?.npcs || {}).filter(([, comp]) => npcIsActive(comp));
  let bondDelta = 0;
  const companionDetails = [];

  if (activeCompanions.length > 0) {
    let totalDelta = 0;
    const penalty = (p.scheme || 0) >= 3 ? 4 : (p.scheme || 0) >= 2 ? 2 : 0;
    for (const [role, comp] of activeCompanions) {
      const initialBond = typeof comp.bond === 'number' ? comp.bond : 40;
      let nextBond = initialBond;
      if (penalty > 0) {
        nextBond = Math.max(0, nextBond - penalty);
      }
      if (apexBondBoost > 0) {
        nextBond = Math.min(100, Math.max(0, nextBond + apexBondBoost));
      }
      const d = nextBond - initialBond;
      totalDelta += d;
      companionDetails.push({
        role,
        nameVi: comp.nameVi || role,
        nameEn: comp.nameEn || role,
        initialBond,
        nextBond,
        delta: d
      });
    }
    const allSame = companionDetails.every((d) => d.delta === companionDetails[0].delta);
    bondDelta = allSame ? companionDetails[0].delta : Math.round(totalDelta / activeCompanions.length);
  }

  return {
    wealth: w - initialWealth,
    network: net - initialNetwork,
    sanity: san - initialSanity,
    health: hp - initialHealth,
    heat: h - initialHeat,
    leverage: lev - initialLeverage,
    rep: rep - initialRep,
    merit: merit - initialMerit,
    resonance: res - initialResonance,
    standing: standing - initialStanding,
    trainingCheckBonus: Math.round(((p.train || 0) * 0.02) * 100),
    companionBond: bondDelta,
    companionDetails
  };
}

export function annualTrainingBonus(char) {
  return char?.annualPlan?.age === char?.age ? Math.min(0.06, (char.annualPlan.points?.train || 0) * 0.02) : 0;
}

export function ambitionComplete(char) {
  switch (char?.ambition?.id) {
    case 'rank': return Boolean(char.flags?.includes('ColorFixer') || char.fixerGrade === 1 || char.fingerRank >= 3 || char.wingRank >= 3 || char.workshopRank >= 3);
    case 'fortune': return (char.stats?.wealth || 0) >= 80;
    case 'survive': return char.age >= 70;
    case 'outskirts': return inOutskirts(char) || char.endingId === 'library_threshold';
    default: return false;
  }
}

export function ambitionWeight(event, ambitionId) {
  if (!ambitionId) return 1;
  const effects = (event?.choices || []).flatMap((choice) => [choice.fx || choice.effects || {}, ...(choice.out || choice.outcomes || []).map((outcome) => outcome.fx || outcome.effects || {})]);
  const hasGain = (key) => effects.some((fx) => (fx[key] || 0) > 0);
  if (ambitionId === 'rank' && (hasGain('merit') || hasGain('rep'))) return 1.15;
  if (ambitionId === 'fortune' && hasGain('wealth')) return 1.15;
  if (ambitionId === 'survive' && (hasGain('health') || hasGain('sanity'))) return 1.15;
  if (ambitionId === 'outskirts' && (event.id?.includes('outskirts') || event.need?.regionId?.includes?.('outskirts'))) return 1.2;
  return 1;
}
