// The next career milestone, E.G.O readiness and the promotions a character has earned.
import { FINGER_LADDERS, FIXER_LADDER, checkColorFixerReadiness, fixerPromotionOfferChance, getNextFingerPromotion, getNextFixerPromotion, getNextWingPromotion, isColorProdigyEligible } from './careerPipeline.js';
import { FINGER_RANKS } from '../data/worldData.js';
import GATES from '../data/careerGates.json' with { type: 'json' };
import { SEASONS, evaluateCharacterAchievements } from './gameEngine.js';
import { activeScarCount } from './scarModel.js';
import { careerAgeOf } from './careerAge.js';
import { getNextIndependentSyndicatePromotion, npcIsActive } from './eventConditions.js';
import { hasEgoOpportunity } from './awakeningProgress.js';

// A Syndicate member with no Finger climbs these instead (syndicateRank 0 to 3)
export const INDEPENDENT_SYNDICATE_RANKS = [
  { vi: 'Kẻ bảo kê đường phố', en: 'Street Enforcer' },
  { vi: 'Đầu gấu khu phố', en: 'Turf Lieutenant' },
  { vi: 'Đại ca băng đảng tự do', en: 'Independent Syndicate Boss' },
  { vi: 'Bá chủ ngõ tối', en: 'Underground Kingpin' }
];

export const WING_RANKS = [
  { rank: 0, titleVi: 'Nhân viên tập sự (Contract Intern)', titleEn: 'Contract Intern', merit: 0, wealth: 0, network: 0 },
  { rank: 1, titleVi: 'Feather chính thức (Feather Agent)', titleEn: 'Feather Agent', merit: GATES.wing[0].merit, wealth: GATES.wing[0].wealth, network: GATES.wing[0].network },
  { rank: 2, titleVi: 'Trưởng phòng ban (Section Chief)', titleEn: 'Section Chief', merit: GATES.wing[1].merit, wealth: GATES.wing[1].wealth, network: GATES.wing[1].network },
  { rank: 3, titleVi: 'Giám đốc cấp cao (Senior Executive)', titleEn: 'Senior Executive', merit: GATES.wing[2].merit, wealth: GATES.wing[2].wealth, network: GATES.wing[2].network }
];

/**
 * Calculates the player's active career milestone and required checklist objectives.
 * Fixer thresholds are read from careerPipeline, the same table that gates the exams.
 */
export function getNextCareerMilestone(char) {
  if (!char || !char.alive) {
    return {
      category: 'MEMORIAL',
      titleVi: 'Kiếp sống đã khép lại',
      titleEn: 'Life Concluded',
      progressPct: 100,
      requirements: [],
      tipVi: 'Xem bia ký tưởng niệm và ghi chép gia phả.',
      tipEn: 'Review the epitaph and legacy records.'
    };
  }

  // 1. Childhood, until the character has a livelihood
  if (char.job === 'Child') {
    if (char.age < 7) {
      const curAge = char.age;
      const targetAge = 7;
      const curHp = char.stats?.health ?? char.health ?? 0;
      const targetHp = 30;
      const curSp = char.stats?.sanity ?? char.sanity ?? 0;
      const targetSp = 30;

      const p1 = Math.min(100, (curAge / targetAge) * 100);
      const p2 = Math.min(100, (curHp / targetHp) * 100);
      const p3 = Math.min(100, (curSp / targetSp) * 100);
      const progressPct = Math.round((p1 + p2 + p3) / 3);

      return {
        category: 'CHILDHOOD SURVIVAL',
        titleVi: 'Sinh tồn thơ ấu tại The City',
        titleEn: 'Childhood Survival in The City',
        progressPct,
        requirements: [
          { labelVi: 'Đạt tuổi 7', labelEn: 'Reach Age 7', current: curAge, target: targetAge, met: curAge >= targetAge, sources: ['Sống qua từng năm'] },
          { labelVi: 'Sinh lực an toàn (HP)', labelEn: 'Safe Health (HP)', current: curHp, target: targetHp, met: curHp >= targetHp, sources: ['Phòng khám khu phố', 'Dinh dưỡng cơ bản'] },
          { labelVi: 'Tỉnh táo an toàn (SP)', labelEn: 'Safe Sanity (SP)', current: curSp, target: targetSp, met: curSp >= targetSp, sources: ['Nghỉ ngơi', 'Gia đình bảo bọc'] }
        ],
        tipVi: 'Bảo toàn mạng sống và giữ tâm trí ổn định trước những nguy hiểm đầu đời.',
        tipEn: 'Stay alive and keep your mind sound amidst early city perils.'
      };
    }

    if (char.age < 14) {
      const curAge = char.age;
      const targetAge = 14;
      const curNet = char.stats?.network ?? char.network ?? 0;
      const targetNet = 15;
      const activeNpcs = Object.values(char.npcs || {}).filter(npcIsActive).length;
      const targetNpcs = 1;

      const p1 = Math.min(100, (curAge / targetAge) * 100);
      const p2 = Math.min(100, (curNet / targetNet) * 100);
      const p3 = activeNpcs >= 1 ? 100 : 0;
      const progressPct = Math.round((p1 + p2 + p3) / 3);

      return {
        category: 'STREET APPRENTICESHIP',
        titleVi: 'Xây dựng quan hệ & Nền tảng đường phố',
        titleEn: 'Street Aptitude & Bonds',
        progressPct,
        requirements: [
          { labelVi: 'Đạt tuổi 14', labelEn: 'Reach Age 14', current: curAge, target: targetAge, met: curAge >= targetAge, sources: ['Sống qua từng năm'] },
          { labelVi: 'Mối quan hệ (Network)', labelEn: 'Network', current: curNet, target: targetNet, met: curNet >= targetNet, sources: ['Gặp gỡ Backstreets', 'Kết thân đồng trang lứa'] },
          { labelVi: 'Bạn bè / Người thân đồng hành', labelEn: 'Companions', current: activeNpcs, target: targetNpcs, met: activeNpcs >= targetNpcs, sources: ['Tương tác NPC', 'Biến cố đường phố'] }
        ],
        tipVi: 'Kết thân với bạn bè hoặc người thầy, học hỏi quy tắc sinh tồn ở Backstreets hoặc Nest.',
        tipEn: 'Befriend companions or mentors, learning the survival codes of the City.'
      };
    }

    // From 14 until the first livelihood: preparing for the career crossroads
    const curAge = char.age;
    const targetAge = careerAgeOf(char);
    const curMerit = char.merit || 0;
    const curWealth = char.stats?.wealth ?? char.wealth ?? 0;
    const curRep = char.stats?.rep ?? char.rep ?? 0;

    const pAge = Math.min(100, (curAge / targetAge) * 100);
    const pStat = Math.min(100, Math.max((curMerit / 8) * 100, (curWealth / 12) * 100, (curRep / 10) * 100));
    const progressPct = Math.round((pAge * 0.6) + (pStat * 0.4));

    return {
      category: 'CAREER CROSSROADS',
      titleVi: `Chuẩn bị bước ngoặt cuộc đời (Tuổi ${targetAge})`,
      titleEn: `Preparation for the Career Crossroads (Age ${targetAge})`,
      progressPct,
      requirements: [
        { labelVi: `Đến tuổi phải tự kiếm sống (${targetAge})`, labelEn: `Reach working age (${targetAge})`, current: curAge, target: targetAge, met: curAge >= targetAge, sources: ['Trưởng thành theo năm tháng'] },
        { labelVi: 'Tích lũy nền tảng (Merit, Ahn hoặc Rep)', labelEn: 'Merit, Ahn or Rep', current: Math.max(curMerit, curWealth, curRep), target: 10, met: Math.max(curMerit, curWealth, curRep) >= 10, sources: ['Học việc đường phố', 'Làm thuê thời vụ', 'Bảo vệ khu phố'] }
      ],
      tipVi: `Đến tuổi ${targetAge}, bạn phải chọn nơi kiếm sống: Fixer, Syndicate hay Wing.`,
      tipEn: `At ${targetAge} you must choose how you earn a living: Fixer, Syndicate or Wing.`
    };
  }

  // 2. Fixer Career / Color Fixer
  if (char.job === 'Fixer' || char.job === 'Color Fixer') {
    if (char.fixerGrade === 0 || char.job === 'Color Fixer' || char.flags.includes('ColorFixer')) {
      const targetMerit = 250;
      const targetRep = 90;
      const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
      const p2 = Math.min(100, (((char.stats?.rep ?? char.rep) || 0) / targetRep) * 100);
      const progressPct = Math.round((p1 + p2) / 2);

      return {
        category: 'COLOR FIXER ASCENSION',
        titleVi: 'Huyền thoại The City (City Legend)',
        titleEn: 'Sovereign Legend of The City',
        progressPct,
        requirements: [
          { labelVi: 'Chiến công tối thượng (Merit)', labelEn: 'Merit', current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Hợp đồng Star of the City', 'Nhiệm vụ đặc biệt Hana', 'Săn Abnormality cấp cao'] },
          { labelVi: 'Danh tiếng vang dội (Rep)', labelEn: 'Reputation', current: (char.stats?.rep ?? char.rep) || 0, target: targetRep, met: ((char.stats?.rep ?? char.rep) || 0) >= targetRep, sources: ['Uy danh The City', 'Nhiệm vụ chấn động'] }
        ],
        tipVi: 'Bạn là một Color. Tên tuổi bạn sánh ngang Red Mist hay Black Silence, ghi dấu vào lịch sử.',
        tipEn: 'You are a Color. Your name stands alongside the Red Mist and Black Silence.'
      };
    }

    const isProdigy = isColorProdigyEligible(char);
    if (char.fixerGrade === 1 || isProdigy) {
      const readiness = checkColorFixerReadiness(char);
      const targetMerit = readiness.targetMerit;
      const targetRep = readiness.targetRep;
      const curRep = (char.stats?.rep ?? char.rep) || 0;
      const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
      const p2 = Math.min(100, (curRep / targetRep) * 100);
      const progressPct = Math.round((p1 + p2) / 2);

      if (isProdigy) {
        return {
          category: 'STAR OF THE CITY ORDEAL',
          titleVi: 'Đại Khảo Thí Phong Color (Hana Đặc Cách Thần Đồng)',
          titleEn: 'Hana Star of the City: Prodigy Color Investiture',
          progressPct,
          requirements: [
            { labelVi: `Chiến công thần đồng (Merit >= ${targetMerit})`, labelEn: `Prodigy Merit (>= ${targetMerit})`, current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Hợp đồng đặc biệt', 'Chinh phục Dungeon', 'Tiêu diệt mối họa cấp cao'] },
            { labelVi: `Danh tiếng vượt bậc (Rep >= ${targetRep})`, labelEn: `Prodigy Rep (>= ${targetRep})`, current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Uy danh The City', 'Nhiệm vụ chấn động'] },
            { labelVi: `Tuổi xét hồ sơ thần đồng (>= ${readiness.targetAge || 26})`, labelEn: `Prodigy Age Review (>= ${readiness.targetAge || 26})`, current: char.age, target: readiness.targetAge || 26, met: char.age >= (readiness.targetAge || 26), sources: ['Tuổi từ 26 đến 34 kèm kỳ tích'] }
          ],
          tipVi: `Bạn đạt chuẩn Thần Đồng Đặc Cách (Fixer Grade ${char.fixerGrade} xuất chúng). Hana Association sẵn sàng mở đại khảo thí phong Color mà không cần thăng từng bậc!`,
          tipEn: `You qualify for the Hana Prodigy Fast-Track (Grade ${char.fixerGrade} prodigy). Hana will convene the Color Investiture directly without climbing grade by grade!`
        };
      }

      return {
        category: 'STAR OF THE CITY ORDEAL',
        titleVi: 'Đại Khảo Thí Phong Color (Hana Council)',
        titleEn: 'Hana Star of the City: Color Investiture',
        progressPct,
        requirements: [
          { labelVi: `Chiến công (Merit >= ${targetMerit})`, labelEn: `Merit (>= ${targetMerit})`, current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Đại hợp đồng Star of the City', 'Khủng hoảng Hiệp hội cấp cao', 'Chinh phục Dungeon'] },
          { labelVi: `Danh tiếng (Rep >= ${targetRep})`, labelEn: `Reputation (>= ${targetRep})`, current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Ủy thác Association', 'Tiêu diệt mối họa cấp cao'] },
          { labelVi: 'Tuổi để Hana xét hồ sơ', labelEn: 'Age for Hana review', current: char.age, target: readiness.targetAge, met: char.age >= readiness.targetAge, sources: ['Năm tháng rèn giũa (Thức tỉnh E.G.O để xét sớm)'] }
        ],
        tipVi: char.flags.includes('EGOAwakened')
          ? 'E.G.O của bạn khiến Hana xét hồ sơ sớm hơn và với ngưỡng thấp hơn. Bài khảo thí vẫn là bài khảo thí: bạn có thể trượt.'
          : 'Đủ Merit và Rep thì Hana Association triệu tập đại khảo thí phong Color. E.G.O không bắt buộc, nhưng người mang E.G.O được xét sớm hơn.',
        tipEn: char.flags.includes('EGOAwakened')
          ? 'Your E.G.O makes Hana review your file earlier and at lower thresholds. The trial is still a trial: you can fail it.'
          : 'With enough Merit and Rep, Hana Association convenes the Color Investiture trial. E.G.O is not required, but wielders are reviewed sooner.'
      };
    }

    const targetThreshold = FIXER_LADDER.find((step) => step.grade === char.fixerGrade - 1) || FIXER_LADDER[0];
    const targetMerit = targetThreshold.meritReq;
    const targetRep = targetThreshold.repReq;
    const curRep = (char.stats?.rep ?? char.rep) || 0;
    const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
    const p2 = Math.min(100, (curRep / targetRep) * 100);
    const progressPct = Math.round((p1 + p2) / 2);

    return {
      category: 'HANA EVALUATION',
      titleVi: `Thăng cấp: Fixer Grade ${targetThreshold.grade}`,
      titleEn: `Promotion: Grade ${targetThreshold.grade} Fixer`,
      progressPct,
      requirements: [
        { labelVi: 'Chiến công (Merit)', labelEn: 'Merit', current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Hợp đồng Fixer thường niên', 'Ủy thác Hiệp hội', 'Chiến đấu hẻm tối', 'Dungeon Delve'] },
        { labelVi: 'Danh tiếng (Rep)', labelEn: 'Reputation', current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Hoàn tất hợp đồng xuất sắc', 'Sự kiện khu vực'] }
      ],
      tipVi: char.flags.includes('EGOAwakened') && char.fixerGrade >= 3
        ? 'Có E.G.O, bạn đủ điều kiện để Hana mở một bài tái định hạng đặc biệt nhảy hai bậc, sau khi đã đủ Merit và Rep cho bậc kế tiếp. Bài này khó hơn bài thường và vẫn có thể thất bại.'
        : 'Nhận hợp đồng Fixer, giải quyết ủy thác từ Association hoặc can thiệp bạo lực để tích lũy Merit và Rep.',
      tipEn: char.flags.includes('EGOAwakened') && char.fixerGrade >= 3
        ? 'With an E.G.O, Hana can open a special re-rating that skips two bands, once you have the Merit and Rep for the next one. It is harder than the ordinary exam and can still be failed.'
        : 'Accept Fixer contracts, resolve Association requests, or survive clashes to earn Merit and Rep.'
    };
  }

  // 3. Syndicate Career
  if (char.job === 'Syndicate') {
    if (!char.finger) {
      const isIndependent = char.flags?.includes('IndependentSyndicate');
      const rank = char.syndicateRank || 0;
      const INDIE_RANKS = INDEPENDENT_SYNDICATE_RANKS;
      const curTitle = INDIE_RANKS[Math.min(rank, INDIE_RANKS.length - 1)];
      const nextRank = rank + 1;
      if (nextRank >= INDIE_RANKS.length) {
        return {
          category: 'INDEPENDENT SYNDICATE HEGEMONY',
          titleVi: `Bá chủ hẻm tối: ${curTitle.vi}`,
          titleEn: `Alley Hegemony: ${curTitle.en}`,
          progressPct: 100,
          requirements: [
            { labelVi: 'Chiến công Backstreets', labelEn: 'Street Merit', current: char.merit || 0, target: 80, met: true, sources: ['Bảo vệ địa bàn', 'Chiến tranh băng đảng'] }
          ],
          tipVi: 'Băng đảng của bạn kiểm soát hoàn toàn khu vực ngầm mà không cần cúi đầu trước bất kỳ Ngón Tay nào.',
          tipEn: 'Your syndicate firmly commands the underground turf without bowing to any Finger.'
        };
      }
      const nextTitle = INDIE_RANKS[nextRank];
      const indiePromo = getNextIndependentSyndicatePromotion(char);
      const targetMerit = indiePromo?.meritReq ?? 20;
      const targetRep = indiePromo?.repReq ?? 20;
      const targetHeat = indiePromo?.heatReq ?? 15;
      const curMerit = char.merit || 0;
      const curRep = char.stats?.rep || 0;
      const curHeat = char.heat || 0;
      const meritPct = Math.min(100, (curMerit / targetMerit) * 100);
      const repPct = Math.min(100, (curRep / targetRep) * 100);
      const heatPct = Math.min(100, (curHeat / targetHeat) * 100);
      const progressPct = Math.round((meritPct + repPct + heatPct) / 3);

      return {
        category: isIndependent ? 'INDEPENDENT SYNDICATE' : 'LOCAL STREET SYNDICATE',
        titleVi: `Vị thế: ${nextTitle.vi}`,
        titleEn: `Station: ${nextTitle.en}`,
        progressPct,
        requirements: [
          { labelVi: 'Chiến công Backstreets', labelEn: 'Street Merit', current: curMerit, target: targetMerit, met: curMerit >= targetMerit, sources: ['Đòi nợ ngầm', 'Hỗn chiến bảo kê'] },
          { labelVi: 'Danh tiếng hẻm tối', labelEn: 'Street Rep', current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Thanh toán đối thủ', 'Mở rộng địa bàn'] },
          { labelVi: 'Độ khét tiếng (Heat)', labelEn: 'Street Heat', current: curHeat, target: targetHeat, met: curHeat >= targetHeat, sources: ['Đụng độ gác đêm', 'Chống lại áp lực thâu tóm'] }
        ],
        tipVi: isIndependent
          ? 'Băng đảng độc lập tự chủ địa bàn, không đóng thuế cho Finger nhưng phải tự chịu áp lực truy quét và thanh trừng.'
          : 'Băng nhóm đường phố địa phương. Khi danh tiếng và chiến công đủ lớn, các đại tổ chức sẽ gửi tối hậu thư.',
        tipEn: isIndependent
          ? 'An independent crew holds its own turf, paying no tribute to Fingers but facing constant raids and assimilation pressure.'
          : 'A local street crew. When your reputation and merit grow enough, major syndicates will send an ultimatum.'
      };
    }

    const finger = char.finger;
    const ladder = FINGER_RANKS[finger] || FINGER_RANKS.Thumb;
    const currentRank = char.fingerRank || 0;

    if (currentRank >= ladder.length - 1) {
      return {
        category: `THE ${finger.toUpperCase()} SOVEREIGNTY`,
        titleVi: `Đỉnh cao quyền lực: ${ladder[currentRank]}`,
        titleEn: `Peak Authority: ${ladder[currentRank]}`,
        progressPct: 100,
        requirements: [
          { labelVi: 'Chiến công (Merit)', labelEn: 'Merit', current: char.merit || 0, target: FINGER_LADDERS[finger]?.[2]?.meritReq || 115, met: true, sources: ['Mệnh lệnh Ngón', 'Thu hồi nợ máu'] }
        ],
        tipVi: 'Bạn đã là người đứng đầu một nhánh của Ngón. Mệnh lệnh của bạn là luật trong hẻm.',
        tipEn: 'You hold supreme authority within your Finger branch. Your word is alley law.'
      };
    }

    const nextRank = currentRank + 1;
    const nextTitle = ladder[nextRank];
    const minAge = [0, 22, 28, 35][nextRank];
    const minTenure = [0, 0, 4, 5][nextRank];
    const yearsInRank = currentRank === 0 || char.lastFingerPromotionAge == null ? minTenure : Math.max(0, char.age - char.lastFingerPromotionAge);
    const nextStep = FINGER_LADDERS[finger]?.[nextRank - 1];
    const targetMerit = nextStep?.meritReq || nextRank * 28;
    const targetRep = nextStep?.repReq || nextRank * 18;
    const targetNet = nextStep?.networkReq || 0;
    const curRep = (char.stats?.rep ?? char.rep) || 0;
    const curNet = (char.stats?.network ?? char.network) || 0;
    const p1 = Math.min(100, ((char.merit || 0) / targetMerit) * 100);
    const p2 = Math.min(100, (curRep / targetRep) * 100);
    const pNet = targetNet > 0 ? Math.min(100, (curNet / targetNet) * 100) : 100;
    const p3 = minTenure > 0 ? Math.min(100, (yearsInRank / minTenure) * 100) : 100;
    const p4 = Math.min(100, (char.age / minAge) * 100);
    const progressPct = Math.round(Math.min((p1 + p2 + (targetNet > 0 ? pNet : p1)) / 3, p3, p4));

    return {
      category: `THE ${finger.toUpperCase()} TRIAL`,
      titleVi: `Thăng bậc: ${nextTitle}`,
      titleEn: `Syndicate Rank: ${nextTitle}`,
      progressPct,
      requirements: [
        { labelVi: 'Công trạng với Ngón (Merit)', labelEn: 'Syndicate Merit', current: char.merit || 0, target: targetMerit, met: (char.merit || 0) >= targetMerit, sources: ['Mệnh lệnh thanh trừng của Ngón', 'Thu hồi nợ máu', 'Apex Command Directives'] },
        { labelVi: 'Uy danh giang hồ (Rep)', labelEn: 'Reputation', current: curRep, target: targetRep, met: curRep >= targetRep, sources: ['Đàn áp đối thủ', 'Huyết chiến đường phố'] },
        ...(targetNet > 0 ? [{ labelVi: 'Mạng lưới chân rết (Network)', labelEn: 'Syndicate Network', current: curNet, target: targetNet, met: curNet >= targetNet, sources: ['Kết thân đàn em', 'Mở rộng cơ sở bảo kê'] }] : []),
        { labelVi: 'Tuổi tối thiểu', labelEn: 'Minimum age', current: char.age, target: minAge, met: char.age >= minAge, sources: ['Thâm niên sinh tồn trong hắc đạo'] },
        ...(currentRank > 0 && minTenure > 0 ? [{ labelVi: 'Năm giữ bậc hiện tại', labelEn: 'Years at current rank', current: yearsInRank, target: minTenure, met: yearsInRank >= minTenure, sources: ['Cống hiến qua các năm'] }] : [])
      ],
      tipVi: 'Thực thi mệnh lệnh của Ngón, thu hồi nợ máu và chứng minh lòng trung thành.',
      tipEn: 'Execute Finger orders, claim vengeance debts, and prove unquestioned loyalty.'
    };
  }

  // 4. Wing Employee Career
  if (char.job === 'Wing Employee') {
    const currentRank = char.wingRank || 0;
    const nextRank = Math.min(WING_RANKS.length - 1, currentRank + 1);
    const target = WING_RANKS[nextRank];

    if (currentRank >= WING_RANKS.length - 1) {
      return {
        category: 'WING EXECUTIVE',
        titleVi: 'Giám đốc cấp cao (Wing Executive)',
        titleEn: 'Senior Wing Executive',
        progressPct: 100,
        requirements: [],
        tipVi: 'Bạn ngồi trong ban điều hành Wing, nắm giữ bí mật Singularity.',
        tipEn: 'You sit on the executive board, guarding the secrets of the Singularity.'
      };
    }

    const curWealth = (char.stats?.wealth ?? char.wealth) || 0;
    const curNet = (char.stats?.network ?? char.network) || 0;
    const p1 = Math.min(100, ((char.merit || 0) / target.merit) * 100);
    const p2 = Math.min(100, (curWealth / target.wealth) * 100);
    const p3 = Math.min(100, (curNet / target.network) * 100);
    const yearsInRank = currentRank === 0 || char.lastWingPromotionAge == null ? 3 : Math.max(0, char.age - char.lastWingPromotionAge);
    const p4 = Math.min(100, (yearsInRank / 3) * 100);
    const progressPct = Math.round(Math.min(p1, p2, p3, p4));

    return {
      category: 'WING ADVANCEMENT',
      titleVi: `Thăng chức: ${target.titleVi}`,
      titleEn: `Promotion: ${target.titleEn}`,
      progressPct,
      requirements: [
        { labelVi: 'Hiệu suất công việc (Merit)', labelEn: 'Merit', current: char.merit || 0, target: target.merit, met: (char.merit || 0) >= target.merit, sources: ['Nghiên cứu dự án Singularity', 'Báo cáo hiệu suất', 'Apex Directive'] },
        { labelVi: 'Cổ phần & Ahn (Wealth)', labelEn: 'Wealth (Ahn)', current: curWealth, target: target.wealth, met: curWealth >= target.wealth, sources: ['Lương tập đoàn', 'Cổ phần nội bộ Wing'] },
        { labelVi: 'Mối quan hệ nội bộ (Network)', labelEn: 'Network', current: curNet, target: target.network, met: curNet >= target.network, sources: ['Quan hệ với cấp quản lý', 'Ngoại giao phòng ban'] },
        ...(currentRank > 0 ? [{ labelVi: 'Năm giữ chức hiện tại', labelEn: 'Years in current post', current: yearsInRank, target: 3, met: yearsInRank >= 3, sources: ['Thâm niên công tác'] }] : [])
      ],
      tipVi: 'Hoàn thành các dự án nghiên cứu của Wing, giữ quan hệ với ban quản trị và tích lũy Ahn.',
      tipEn: 'Deliver Wing research quotas, cultivate corporate ties, and amass Ahn.'
    };
  }

  // 5. Distortion Metamorphosis Milestone
  if (char.job === 'Distortion' || char.flags.includes('Distorted')) {
    const curRes = char.resonance || 0;
    const targetRes = 100;
    const curHp = char.stats?.health ?? char.health ?? 0;
    const targetHp = 80;
    const p1 = Math.min(100, (curRes / targetRes) * 100);
    const p2 = Math.min(100, (curHp / targetHp) * 100);
    const progressPct = Math.round((p1 + p2) / 2);
    const isApex = progressPct >= 100 || char.flags.includes('AbyssalDistortionApex');

    return {
      category: 'DISTORTION METAMORPHOSIS',
      titleVi: isApex ? 'Đỉnh Cao Dị Thường Vực Thẳm (Abyssal Apex Metamorphosed)' : 'Biến Dị Vực Thẳm (Distortion Metamorphosis)',
      titleEn: isApex ? 'Abyssal Apex Metamorphosis Achieved' : 'Abyssal Distortion Metamorphosis',
      progressPct: isApex ? 100 : progressPct,
      requirements: [
        {
          labelVi: 'Cộng hưởng Vực thẳm (Resonance >= 100)',
          labelEn: 'Abyssal Resonance (>= 100)',
          current: curRes,
          target: targetRes,
          met: curRes >= targetRes || isApex,
          sources: ['Tiếng gọi của Carmen', 'Giải phóng dục vọng bản ngã', 'Nghi thức bóng tối']
        },
        {
          labelVi: 'Thể xác Dị Thường cường hóa (HP >= 80)',
          labelEn: 'Reinforced Anomaly Flesh (HP >= 80)',
          current: curHp,
          target: targetHp,
          met: curHp >= targetHp || isApex,
          sources: ['Tái tạo tế bào dị thường (Tissue Regen)', 'Hấp thụ tinh hoa bóng đêm', 'Đè bẹp thợ săn']
        }
      ],
      tipVi: isApex
        ? 'Bản ngã của bạn đã hoàn tất biến dị tột cùng. Các thớ thịt và giác quan cổ xưa hoàn toàn hòa làm một với dục vọng, ban tặng nội lực tái sinh mô thịt (+4 HP/năm) và áp đảo mọi kẻ săn đuổi (+14 Sức mạnh chiến đấu).'
        : 'Bạn là một Distortion. Các mô thịt dị thường tự co bóp tái sinh hàng năm theo chỉ số Cộng hưởng. Vực thẳm không phục vụ The Head hay các Wing: bạn là bản ngã trần trụi nhất.',
      tipEn: isApex
        ? 'Your ego has achieved apex metamorphosis. Ancient sinews and senses are unified with pure desire, granting perpetual tissue regeneration (+4 HP/year) and overwhelming combat power (+14).'
        : 'You are a Distortion. Anomalous tissues pulsate and knit together each year based on Resonance. The abyss answers neither Head nor Wings: you are the rawest self.'
    };
  }

  if (char.job === 'Workshop Craftsman') {
    return {
      category: 'WORKSHOP',
      titleVi: 'Một ngày ở xưởng',
      titleEn: 'A Day at the Workshop',
      progressPct: 0,
      requirements: [],
      tipVi: 'Nhận đơn đặt hàng, giữ lò hoạt động và chọn người được cầm vũ khí bạn rèn.',
      tipEn: 'Take commissions, keep the forge running, and decide who receives your weapons.'
    };
  }

  // Fallback
  return {
    category: 'SURVIVAL',
    titleVi: 'Sống sót và khẳng định vị thế',
    titleEn: 'Survival & Renown',
    progressPct: Math.min(100, (char.merit || 0) * 2),
    requirements: [
      { labelVi: 'Chiến công (Merit)', labelEn: 'Merit', current: char.merit || 0, target: 50, met: (char.merit || 0) >= 50, sources: ['Hợp đồng Backstreets', 'Bảo vệ khu trọ'] }
    ],
    tipVi: 'Gia tăng tài nguyên và tạo dựng danh tiếng trong khu vực.',
    tipEn: 'Build your wealth and cement your reputation across the District.'
  };
}

/**
 * Returns character's E.G.O Awakening & Distortion psychological readiness horizon
 */
export function getEgoReadiness(char) {
  if (!char) return null;
  const flags = char.flags || [];
  if (flags.includes('EGOAwakened')) {
    return {
      status: 'awakened',
      progressPct: 100,
      labelVi: 'Đã Thức Tỉnh E.G.O Toàn Phần',
      labelEn: 'Fully Awakened E.G.O',
      descVi: 'Bản ngã của bạn đã kết tinh thành vũ khí và ý chí bất khuất, tỏa sáng giữa màn đêm The City.',
      descEn: 'Your ego has crystallized into unique armaments and resolve that cannot waver.',
      sourcesVi: ['Vũ khí và giáp trụ cá nhân đã thức tỉnh']
    };
  }
  if (char.job === 'Distortion' || flags.includes('Distorted')) {
    return {
      status: 'distorted',
      progressPct: 100,
      labelVi: 'Đã Biến Dị Thành Distortion',
      labelEn: 'Metamorphosed into Distortion',
      descVi: 'Bạn đã lắng nghe tiếng gọi ngọt ngào của Carmen và chấp nhận hình thái trần trụi nhất của dục vọng.',
      descEn: 'You embraced Carmen’s honeyed whispers and abandoned your humanity into pure form.',
      sourcesVi: ['Tái tạo tế bào dị thường', 'Tiếng gọi Carmen']
    };
  }
  const res = char.resonance || 0;
  const sanity = (char.stats?.sanity ?? char.sanity) || 0;
  const age = char.age || 0;

  // An unfinished E.G.O has its own second road; the first crossroad is not offered again
  if (flags.includes('IncompleteEGO')) {
    return {
      status: 'incomplete',
      progressPct: 80,
      resonance: res,
      sanity,
      labelVi: 'E.G.O Chưa Hoàn Chỉnh',
      labelEn: 'Incomplete E.G.O',
      descVi: 'Bản ngã đã thành hình nhưng còn vết rạn. Một cơn nguy biến về sau có thể cho bạn cơ hội hàn gắn nó, hoặc làm nó vỡ thành Distortion. Không có gì bảo đảm cơ hội ấy sẽ đến.',
      descEn: 'The ego took shape but still carries a fissure. A later crisis may let you mend it, or break it into Distortion. Nothing guarantees that chance will come.',
      sourcesVi: ['Sống sót qua nguy biến lớn', 'Giữ tâm trí đủ vững']
    };
  }
  if (char.seenEvents?.includes('ego_carmen_crossroad')) {
    return {
      status: 'crossroad_passed',
      progressPct: 100,
      resonance: res,
      sanity,
      labelVi: 'Đã Đi Qua Giao Lộ',
      labelEn: 'Crossroad Already Passed',
      descVi: 'Bạn đã đứng trước giao lộ của Carmen và rời đi mà không mang theo E.G.O. Giao lộ ấy không mở lại, nên tích thêm Resonance không gọi nó trở về.',
      descEn: 'You stood at Carmen’s crossroad and left without an E.G.O. It does not open again, so more Resonance will not call it back.',
      sourcesVi: []
    };
  }

  // Strict adulthood requirement for psychological crystallization
  if (age < 18) {
    return {
      status: 'dormant',
      progressPct: Math.min(50, Math.round((res / 74) * 50)),
      resonance: res,
      sanity,
      labelVi: 'Tâm Trí Trẻ Thơ (Chưa Đủ 18 Tuổi Để Thức Tỉnh E.G.O)',
      labelEn: 'Adolescent Mind (Must Reach Age 18 for E.G.O Awakening)',
      descVi: 'Bản ngã chỉ có thể kết tinh hoàn chỉnh khi đã trưởng thành (từ 18 tuổi). Hãy bảo toàn sinh mạng qua những năm tháng niên thiếu.',
      descEn: 'The ego can only fully crystallize in adulthood (from age 18). Preserve your life through your youth.',
      sourcesVi: ['Trưởng thành theo thời gian (Tuổi >= 18)', 'Tích lũy kinh nghiệm sinh tử']
    };
  }

  const scars = activeScarCount(char);
  // Real E.G.O mechanics matching awakeningProgress.js line 7:
  // Apex Resonance >= 74 OR (Resonance >= 62 && ((scars >= 1 && sanity <= 38) || (scars >= 2 && sanity <= 45)))
  const isCrisisEligible = res >= 62 && ((scars >= 1 && sanity <= 38) || (scars >= 2 && sanity <= 45));
  const isApexResonance = res >= 74;
  const isImminent = hasEgoOpportunity(char) || isApexResonance || isCrisisEligible;
  const isStirring = res >= 40;

  const targetRes = isCrisisEligible ? 62 : 74;
  const progressPct = isImminent
    ? 100
    : (isStirring ? Math.min(95, Math.round((res / targetRes) * 100)) : Math.round((res / 74) * 50));

  if (isImminent) {
    return {
      status: 'imminent',
      progressPct: Math.max(90, progressPct),
      resonance: res,
      sanity,
      labelVi: 'Giao Lộ Ngàn Cân Treo Sợi Tóc (E.G.O hoặc Distortion)',
      labelEn: 'Psychic Precipice: E.G.O or Distortion Crossroads',
      descVi: isCrisisEligible || sanity <= 38
        ? `Tâm trí rơi vào khủng hoảng (Sanity: ${sanity}, Resonance: ${res} với ${scars} vết sẹo). Giọng nói của Carmen đang thầm thì bên tai. Giữ vững niềm tin để thức tỉnh E.G.O, hoặc gục ngã thành Distortion.`
        : `Tần số Ánh Sáng đã đạt cực điểm (Resonance >= 74). Một bài khảo nghiệm tinh thần có thể xuất hiện bất cứ lúc nào để tôi luyện vũ khí bản ngã E.G.O.`,
      descEn: isCrisisEligible || sanity <= 38
        ? `Sanity has fractured under peak resonance with scars. Carmen whispers in your ear. Hold fast to awaken E.G.O, or surrender to Distortion.`
        : `Resonance has reached apex (>= 74). A mental crucible may manifest at any moment to forge your personal E.G.O weapon.`,
      sourcesVi: ['Vượt qua khủng hoảng tâm trí', 'Đối diện chấn thương quá khứ', 'Kiên định với nguyên tắc']
    };
  }

  if (isStirring) {
    return {
      status: 'stirring',
      progressPct,
      resonance: res,
      sanity,
      labelVi: 'Bản Ngã Bắt Đầu Dao Động (Resonance Đang Tăng)',
      labelEn: 'Ego Awakening Stirring (Resonance Rising)',
      descVi: `Tần số Ánh Sáng đang cộng hưởng trong máu thịt. Khi Resonance đạt 74 (hoặc 62 khi mang sẹo và gặp khủng hoảng tâm trí), cánh cửa E.G.O sẽ mở ra.`,
      descEn: `The Light echoes in your pulse. Once Resonance reaches 74 (or 62 with scars during a mental crisis), the E.G.O threshold opens.`,
      sourcesVi: ['Chiến đấu sinh tử', 'Chinh phục Dungeon Dị Thường', 'Khảo nghiệm số phận']
    };
  }

  return {
    status: 'dormant',
    progressPct,
    resonance: res,
    sanity,
    labelVi: 'Tâm Thức Bình Thường (Chưa Thức Tỉnh)',
    labelEn: 'Dormant Psychic Threshold',
    descVi: 'Chưa có dấu hiệu cộng hưởng bất thường với Ánh Sáng của The City.',
    descEn: 'No unusual psychic resonance with the City’s Light has manifested yet.',
    sourcesVi: ['Tiếp xúc với Abnormality', 'Chấn thương tâm lý', 'Nghi thức siêu nhiên']
  };
}

/**
 * Evaluates Fixer Grade / Syndicate Rank / Wing Rank promotions
 */
export function checkPromotions(char) {
  const logsToAdd = [];
  const curRep = (char.stats?.rep ?? char.rep) || 0;

  // Distortions never participate in human promotions
  if (char.flags.includes('Distorted')) return logsToAdd;

  if (char.job === 'Fixer') {
    const nextPromo = getNextFixerPromotion(char);
    if (nextPromo && nextPromo.isEligible && !char.flags.includes(`promo_ready_g${nextPromo.grade}`)) {
      char.flags.push(`promo_ready_g${nextPromo.grade}`);
      const offerChance = Math.round(fixerPromotionOfferChance(char, nextPromo) * 100);
      logsToAdd.push({
        id: `log_promo_ready_${char.age}_g${nextPromo.grade}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: `[Hana Association Thông Báo] Hồ sơ của bạn đủ ngưỡng dự tuyển Grade ${nextPromo.grade}. Mỗi năm, cơ hội được triệu tập hiện là ${offerChance}% và tăng khi điểm dư cao hơn. Nếu trượt hoặc hoãn mà vẫn đủ điều kiện, Hana sẽ gọi lại vào năm sau.`,
        en: `[Hana Association Notice] Your record qualifies for the Grade ${nextPromo.grade} candidate pool. Your current annual summons chance is ${offerChance}% and rises with surplus points. If you fail or defer and still qualify, Hana will call you back next year.`
      });
    }

    // Color Fixer Candidacy
    const colorCheck = checkColorFixerReadiness(char);
    if (colorCheck.ready && !char.flags.includes('ColorCandidate')) {
      char.flags.push('ColorCandidate');
      logsToAdd.push({
        id: `log_color_cand_${char.age}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: `[Hana Association] Hồ sơ của bạn đã đủ tiêu chuẩn để Hội đồng Tối cao triệu tập đại khảo thí Star of the City nhằm phong Color.`,
        en: `[Hana Association] Your achievements qualify you for the Supreme Council's Star of the City trial for a Color designation.`
      });
    }
  }

  // Syndicate / Five Fingers Rank Promotions: emit notifications when ready for next trial (Unblocked for Distorted)
  if ((char.job === 'Syndicate' || (char.flags.includes('Distorted') && char.finger)) && char.finger) {
    const nextPromo = getNextFingerPromotion(char);
    if (nextPromo && nextPromo.isEligible && !char.flags.includes(`finger_promo_ready_r${nextPromo.rank}`)) {
      char.flags.push(`finger_promo_ready_r${nextPromo.rank}`);
      logsToAdd.push({
        id: `log_finger_ready_${char.age}_r${nextPromo.rank}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: `[The ${char.finger} Thông Báo] Bạn đã tích lũy đủ công trạng và uy danh để bước vào đại lễ thăng bậc: ${nextPromo.titleVi}.`,
        en: `[The ${char.finger} Notice] Your merits and renown qualify you for the advancement trial: ${nextPromo.titleEn}.`
      });
    }
  }

  // Wing Employee Promotions: emit notifications when ready for next corporate appointment
  if (char.job === 'Wing Employee') {
    const nextPromo = getNextWingPromotion(char);
    if (nextPromo && nextPromo.isEligible && !char.flags.includes(`wing_promo_ready_r${nextPromo.rank}`)) {
      char.flags.push(`wing_promo_ready_r${nextPromo.rank}`);
      logsToAdd.push({
        id: `log_wing_ready_${char.age}_r${nextPromo.rank}`,
        age: char.age,
        season: SEASONS[char.seasonIdx],
        type: 'promo',
        vi: `[Ban Giám Đốc Wing] Bạn đã đạt đủ chỉ tiêu hiệu suất và quan hệ để được xét duyệt thăng chức: ${nextPromo.titleVi}.`,
        en: `[Wing Directorate] You have fulfilled corporate quotas and are eligible for promotion: ${nextPromo.titleEn}.`
      });
    }
  }

  evaluateCharacterAchievements(char);
  return logsToAdd;
}
