export const MAX_ACTIVE_SCARS = 3;

export const SCAR_SYNERGIES = [
  { id: 'cornered_blade', tags: ['survivor', 'weapon'], labelVi: 'Lưỡi kiếm trong ngõ cụt', labelEn: 'Cornered blade', boonVi: 'Khi HP thấp, né đòn trong dungeon dễ hơn 6%.', boonEn: 'At low HP, dungeon evasion gains 6 percentage points.', costVi: 'Cứ hai năm thêm 1 Heat.', costEn: 'Gain 1 extra Heat every other year.', annual: { heat: 1 } },
  { id: 'field_repair', tags: ['injury', 'craft'], labelVi: 'Tự vá mình', labelEn: 'Field repair', boonVi: 'Vào dungeon với thêm một lần tiếp tế.', boonEn: 'Enter dungeons with one extra supply.', costVi: 'Cứ hai năm tốn thêm 1 Ahn cho vật liệu.', costEn: 'Spend 1 extra Ahn every other year on materials.', annual: { wealth: -1 } },
  { id: 'haunted_witness', tags: ['trauma', 'witness'], labelVi: 'Mắt không ngủ', labelEn: 'Sleepless witness', boonVi: 'Dò đường trong dungeon tăng thêm 7 điểm phần trăm cơ hội kiểm định.', boonEn: 'Scanned dungeon checks gain 7 percentage points.', costVi: 'Cứ hai năm mất thêm 1 SP.', costEn: 'Lose 1 extra SP every other year.', annual: { sanity: -1 } }
];

export function activeScarSynergies(char) {
  const tags = new Set(normalizeScars(char).scars.map((name) => getScarProfile(name)?.tag).filter(Boolean));
  return SCAR_SYNERGIES.filter((synergy) => synergy.tags.every((tag) => tags.has(tag)));
}

const PROFILES = {
  survivor: {
    tag: 'survivor', labelVi: 'Bản năng sống sót', labelEn: 'Survival instinct',
    boonVi: 'Khi HP hoặc SP ≤ 40: kết quả thoát hiểm có trọng số +15%; chuyện sinh tồn dễ gặp hơn.',
    boonEn: 'At 40 HP or SP or less: escape outcomes gain 15% weight; survival stories appear more often.',
    costVi: 'Mỗi năm mất 1 SP vì cảnh giác kéo dài.', costEn: 'Lose 1 SP each year to constant vigilance.',
    annual: { sanity: -1 }, resonanceFloor: 2
  },
  injury: {
    tag: 'injury', labelVi: 'Thương tật', labelEn: 'Lasting injury',
    boonVi: 'Dễ gặp cơ hội chữa trị và phục hồi thương tật.', boonEn: 'Medical and recovery opportunities appear more often.',
    costVi: 'Ủy thác Fixer: -4 lực. Mỗi năm mất 1 HP.', costEn: 'Fixer contracts: -4 power. Lose 1 HP each year.',
    annual: { health: -1 }, contractPower: -4, resonanceFloor: 1
  },
  weapon: {
    tag: 'weapon', labelVi: 'Vũ khí mang theo', labelEn: 'Kept weapon',
    boonVi: 'Ủy thác Fixer: +6 lực; chuyện chiến đấu dễ gặp hơn.', boonEn: 'Fixer contracts: +6 power; combat stories appear more often.',
    costVi: 'Mỗi năm tăng 2 Syndicate Heat vì món đồ gây chú ý.', costEn: 'Gain 2 Syndicate Heat yearly as the weapon attracts attention.',
    annual: { heat: 2 }, contractPower: 6, resonanceFloor: 1
  },
  craft: {
    tag: 'craft', labelVi: 'Tay nghề', labelEn: 'Craft',
    boonVi: 'Việc sửa chữa dễ gặp hơn; ủy thác Fixer: +3 lực.', boonEn: 'Repair work appears more often; Fixer contracts: +3 power.',
    costVi: 'Từ 18 tuổi, mỗi năm mất 1 Ahn để giữ dụng cụ và vật liệu.', costEn: 'From age 18, spend 1 Ahn yearly on tools and materials.',
    annual: { wealth: -1 }, contractPower: 3, resonanceFloor: 0
  },
  faction: {
    tag: 'faction', labelVi: 'Dấu của tổ chức', labelEn: 'Faction mark',
    boonVi: 'Dễ gặp người nhận ra dấu của tổ chức.', boonEn: 'People who recognize the faction mark appear more often.',
    costVi: 'Mỗi năm tăng 2 Syndicate Heat vì bị nhận mặt.', costEn: 'Gain 2 Syndicate Heat yearly as others recognize you.',
    annual: { heat: 2 }, resonanceFloor: 1
  },
  trauma: {
    tag: 'trauma', labelVi: 'Ám ảnh', labelEn: 'Trauma',
    boonVi: 'Dễ gặp nhánh đối diện ký ức hoặc tìm cách hồi phục.', boonEn: 'Memory and recovery branches appear more often.',
    costVi: 'Mỗi năm mất 2 SP; cộng hưởng khó lắng xuống.', costEn: 'Lose 2 SP yearly; resonance fades more slowly.',
    annual: { sanity: -2 }, resonanceFloor: 4
  },
  witness: {
    tag: 'witness', labelVi: 'Người biết chuyện', labelEn: 'Witness',
    boonVi: 'Dễ gặp nhánh điều tra và bí mật của Wing.', boonEn: 'Investigation and Wing secret branches appear more often.',
    costVi: 'Mỗi năm mất 1 SP vì điều đã biết.', costEn: 'Lose 1 SP yearly to what you know.',
    annual: { sanity: -1 }, resonanceFloor: 3
  }
};

const RULES = [
  ['weapon', /thanh kiếm tôi bằng máu|khẩu súng phạm taboo|mảnh xương sườn trong chuôi kiếm|chiếc búa của n corp|đại sư rèn thần binh|kiếm của kim/i],
  ['craft', /chiếc hộp từ nhà máy|thợ rèn phạm taboo|viên bolus của hongyuan/i],
  ['faction', /hình xăm hắc vân|con mắt của the ring|sự tuân phục tuyệt đối của the thumb|kẻ đào tẩu vĩ đại của the thumb|người thi hành ý chỉ|kẻ xé prescript|nắm đấm sắt của the middle|lời thề thiên tinh|bí mật đen tối của wing|kẻ đốt prescript|dấu của shi association|người làm đứt xích của the middle|chiến tích xóa tên khỏi sổ thù/i],
  ['survivor', /bị trục xuất ra the outskirts|vết móc đêm 3:13|vết móc câu sweeper|đêm ở ngoài lúc 3:13|cánh cửa mở lúc 3:13|lều cuối trại|kẻ chém đứt xiềng xích erlking|tấm khiên của kẻ bị săn đuổi|chuộc thân khỏi sổ thù/i],
  ['witness', /chân tướng the city|con mắt nhìn thấu đa vũ trụ|bản đồ giải phẫu star of the city|con số sau tai|tên viết bằng mực đỏ/i],
  ['trauma', /di chứng sụp đổ tinh thần|ký ức địa ngục tàu warp|hai nghìn năm trong toa cuối|tiếng khóc ở phòng bên|người bạn đã bỏ lại|bàn tay vấy máu|tiếng hú của cuộc săn hoang dã|vết rạn khung cửi|vết nứt chưa liền|ngọn lửa cuồng loạn|vết bỏng linh hồn|tâm trí quá tải|đêm ở giếng không đáy|dấu ấn linh hồn tiền nhân/i],
  ['injury', /vết mổ trả nợ|vết mổ cưỡng chế thuế nội tạng|cổ tay gãy|vết dao|vết kim trên cột sống|bả vai vỡ|gân vai đứt|xương đòn đổi|vết chém mở ngực|thương tật từ star|vết cưa|mất ngón|ngón tay trả|bàn tay thiếu|vết khâu bên hông|lưng bỏng|cánh tay bỏng|cánh tay không còn da|vết răng|vết cào|vết dây thép|vết sẹo hình bông hoa|nửa mạn sườn mất|những khối u của k corp/i]
];

export function getScarProfile(name) {
  if (typeof name !== 'string') return null;
  const tag = RULES.find(([, pattern]) => pattern.test(name))?.[0];
  return tag ? PROFILES[tag] : null;
}

export function activeScarCount(char) {
  return normalizeScars(char).scars.length;
}

export function hasScarTag(char, tag) {
  return normalizeScars(char).scars.some((name) => getScarProfile(name)?.tag === tag);
}

// A pairing costs on top of the two marks only every other year: the boon is real, the price should not double the bill
export function scarAnnualEffects(char) {
  const effects = {};
  const synergyYear = (char.age || 0) % 2 === 0;
  const annuals = [...normalizeScars(char).scars.map((name) => getScarProfile(name)?.annual || {}), ...(synergyYear ? activeScarSynergies(char).map((synergy) => synergy.annual) : [])];
  for (const annual of annuals) {
    for (const [key, value] of Object.entries(annual)) {
      if (key === 'wealth' && char.age < 18) continue;
      effects[key] = (effects[key] || 0) + value;
    }
  }
  return effects;
}

export function scarContractPower(char) {
  return normalizeScars(char).scars.reduce((sum, name) => sum + (getScarProfile(name)?.contractPower || 0), 0);
}

export function scarResonanceFloor(char) {
  return normalizeScars(char).scars.reduce((sum, name) => sum + (getScarProfile(name)?.resonanceFloor || 0), 0);
}

export function normalizeScars(char) {
  const history = [...(char.scarHistory || [])];
  const active = [];
  for (const name of [...(char.scars || [])].reverse()) {
    const profile = getScarProfile(name);
    if (profile && !active.some((item) => getScarProfile(item)?.tag === profile.tag) && active.length < MAX_ACTIVE_SCARS) active.unshift(name);
    else if (!history.includes(name)) history.push(name);
  }
  return { scars: active, scarHistory: history };
}

export function addScar(char, name) {
  if (!name) return false;
  const normalized = normalizeScars(char);
  char.scars = normalized.scars;
  char.scarHistory = normalized.scarHistory;
  if (char.scars.includes(name) || char.scarHistory.includes(name)) return false;
  const profile = getScarProfile(name);
  if (!profile || hasScarTag(char, profile.tag)) {
    char.scarHistory.push(name);
    return false;
  }
  if (char.scars.length >= MAX_ACTIVE_SCARS) char.scarHistory.push(char.scars.shift());
  char.scars.push(name);
  return true;
}
