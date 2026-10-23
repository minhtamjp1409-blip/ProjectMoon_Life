const CORDON_EVENTS = new Set(['mid_fixer_cordon', 'mid_wing_recall', 'mid_finger_supply',
  'mid_index_detour', 'mid_middle_bread', 'mid_ring_crate', 'mid_pinky_witness']);

export function activeCityCondition(char) {
  const c = char.cityCondition;
  return c?.kind === 'supply_cordon' && c.regionId === char.regionId &&
    !char.flags?.includes('Outskirts') && char.regionId !== 'OUTSKIRTS' &&
    char.age >= c.startAge && char.age <= c.endAge ? c : null;
}

export function workshopPrice(item, char) {
  return Math.ceil(item.costAhn * (activeCityCondition(char) && item.type !== 'special' ? 1.15 : 1));
}

export function cityEventMultiplier(event, char) {
  return activeCityCondition(char) && CORDON_EVENTS.has(event.id) ? 2 : 1;
}

export function advanceCityCondition(char, rng) {
  if (char.cityConditionRollAge === char.age) return;
  char.cityConditionRollAge = char.age;
  if (char.age < 25 || char.age > 40 || char.regionId === 'OUTSKIRTS' ||
      char.flags?.includes('Outskirts') || char.age <= (char.cityCondition?.endAge ?? -10) + 3) return;
  if (rng() >= 0.16) return;
  const duration = rng() < 0.5 ? 2 : 3;
  char.cityCondition = { version: 1, kind: 'supply_cordon', regionId: char.regionId,
    startAge: char.age, endAge: char.age + duration - 1 };
  char.logs ??= [];
  char.logs.push({ id: `cordon_${char.age}_${char.regionId}`, age: char.age, type: 'major',
    vi: `[Đường hàng bị chặn] Các chốt kiểm soát giữ hàng ngoài khu bạn ở. Trong ${duration} năm tới, giá thuốc và trang bị tại xưởng tăng 15% (làm tròn lên); việc hộ tống, kiểm hàng và chuyển hàng kín xuất hiện thường hơn. Giấy phép giữ nguyên giá.`,
    en: `[Supply cordon] Checkpoints hold shipments outside your district. For ${duration} years, workshop medicine and equipment cost 15% more (rounded up); escort, inspection and covert delivery work becomes more likely. Permit prices stay unchanged.` });
}
