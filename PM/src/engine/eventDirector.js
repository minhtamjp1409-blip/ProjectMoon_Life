const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const ROUTE_PREFIX = {
  fixer: 'fixer', fx: 'fixer', color: 'fixer', hana: 'fixer',
  wing: 'wing', wsv: 'wing',
  syn: 'syndicate', finger: 'syndicate', thumb: 'syndicate', index: 'syndicate',
  middle: 'syndicate', ring: 'syndicate', pinky: 'syndicate',
  distort: 'distortion', ego: 'ego', abno: 'abnormality'
};

const DANGER_PREFIX = new Set(['shock', 'distort', 'abno', 'ensemble']);
const RELIEF_PREFIX = new Set(['life', 'mourn']);

function choiceEffects(choice) {
  return [choice?.effects, ...(choice?.outcomes || []).map((outcome) => outcome.effects)].filter(Boolean);
}

function eventPressure(event) {
  const choices = event.choices || [];
  if (!choices.length) return { danger: false, relief: false };
  let dangerous = 0;
  let restorative = 0;
  for (const choice of choices) {
    const effects = choiceEffects(choice);
    if (choice.startDungeon || effects.some((fx) => (fx.health || 0) <= -8 || (fx.sanity || 0) <= -10 || (fx.heat || 0) >= 12 || (fx.taboo || 0) > 0)) dangerous++;
    if (effects.some((fx) => (fx.health || 0) >= 5 || (fx.sanity || 0) >= 5) &&
        !effects.some((fx) => (fx.health || 0) < 0 || (fx.sanity || 0) < 0)) restorative++;
  }
  return { danger: dangerous > choices.length / 2, relief: restorative > choices.length / 2 };
}

export function directorTags(event) {
  const tags = new Set(event.tags || []);
  const prefix = String(event.id || '').split('_')[0];
  const route = ROUTE_PREFIX[prefix];
  if (route) tags.add(`route:${route}`);
  if (event.need?.finger) tags.add(`finger:${String(event.need.finger).toLowerCase()}`);
  if (event.need?.npc || event.keepRole || /\{(?:spouse|partner|friend|mentor|parentName)\}/.test(event.vi || '')) tags.add('npc');
  if (event.causalOnly || event.isCausalCallback || event.id?.startsWith('csq_')) tags.add('causal');
  if (event.regions?.length || event.need?.regionId || event.need?.regions?.length) tags.add('location');
  const pressure = eventPressure(event);
  if (pressure.danger || DANGER_PREFIX.has(prefix)) tags.add('danger');
  if (pressure.relief || RELIEF_PREFIX.has(prefix)) tags.add('relief');
  if (event.legacy || (event.age?.[0] ?? 0) >= 55 || /^(?:elder_|twilight_|color_long_|color_quiet_|color_last_|finger_long_|finger_seat_|wing_apex_)/.test(event.id || '') || /kế nhiệm|kế vị|di sản|trao lại|hồ sơ đời/.test(event.vi || '')) {
    tags.add('legacy');
  }
  return [...tags];
}

export function rememberDirectorEvent(weaver, event, age) {
  const beat = { id: event.id, age, tags: directorTags(event) };
  return [...(weaver.recentBeats || []), beat].slice(-8);
}

export function directorScore(event, char, weaver, baseUtility) {
  const tags = directorTags(event);
  const recent = (weaver.recentBeats || []).filter((beat) => (char.age || 0) - beat.age <= 5).slice(-4);
  const lastThree = recent.slice(-3);
  const dangerCount = lastThree.filter((beat) => beat.tags?.includes('danger')).length;
  const reliefCount = lastThree.filter((beat) => beat.tags?.includes('relief')).length;
  const health = char.stats?.health ?? char.health ?? 50;
  const sanity = char.stats?.sanity ?? char.sanity ?? 50;
  let mult = 1;
  const reasons = [];
  const reasonsEn = [];

  if (tags.includes('danger') && dangerCount >= 2) {
    mult *= 0.72;
    reasons.push('Hai biến cố nặng gần đây'); reasonsEn.push('Two heavy blows close together');
  } else if (tags.includes('danger') && reliefCount >= 2 && health >= 55 && sanity >= 45) {
    mult *= 1.25;
    reasons.push('Sau một quãng yên ắng'); reasonsEn.push('After a quiet stretch');
  }
  if (tags.includes('danger') && (health < 35 || sanity < 30)) {
    mult *= 0.78;
    reasons.push('Thương tích hoặc kiệt sức'); reasonsEn.push('Wounded or exhausted');
  }
  if (tags.includes('relief') && (dangerCount >= 2 || health < 35 || sanity < 30)) {
    mult *= 1.3;
    reasons.push('Cần một khoảng lặng'); reasonsEn.push('Needs a breather');
  }

  const routeTag = tags.find((tag) => tag.startsWith('route:'));
  const sameRouteRecent = routeTag ? lastThree.filter((beat) => beat.tags?.includes(routeTag)).length : 0;
  if (sameRouteRecent >= 2) {
    mult *= 0.82;
    reasons.push('Nghề này vừa xuất hiện liên tiếp'); reasonsEn.push('This trade just came up twice');
  }
  if (tags.includes('npc') && lastThree.filter((beat) => beat.tags?.includes('npc')).length === 0) {
    mult *= 1.12;
    reasons.push('Lâu rồi chưa có cảnh với người quen'); reasonsEn.push('No scene with a familiar face for a while');
  }
  const pending = (weaver.pendingThreads || []).some((thread) => !thread.fulfilled && thread.eventId === event.id);
  if (pending) {
    mult *= 1.25;
    reasons.push('Mạch cũ đang mở'); reasonsEn.push('An old thread is open');
  }

  // Elder pacing rule (Đợt 140.5): after 60, soften back-to-back danger and favor legacy/relief beats,
  // while keeping occasional legacy-threatening danger if the last 5 years had none
  if ((char.age || 0) >= 60) {
    const dangerInFive = recent.filter((beat) => beat.tags?.includes('danger')).length;
    if (tags.includes('legacy')) {
      mult *= 1.28;
      reasons.push('Chuyện di sản tuổi xế chiều'); reasonsEn.push('Late-life legacy beat');
    }
    if (tags.includes('relief')) {
      mult *= 1.16;
      reasons.push('Nhịp sống chậm lại ở tuổi già'); reasonsEn.push('Slower cadence in old age');
    }
    if (tags.includes('danger')) {
      if (dangerInFive >= 1) {
        mult *= 0.76;
        reasons.push('Giảm bớt hiểm họa dồn dập tuổi già'); reasonsEn.push('Fewer back-to-back hazards in old age');
      } else if (tags.includes('legacy')) {
        mult *= 1.15;
        reasons.push('Thử thách nhắm vào di sản'); reasonsEn.push('A threat to what you built');
      }
    }
  }

  return {
    tags,
    multiplier: clamp(mult, 0.55, 1.45),
    utility: Math.round(Math.max(1, baseUtility) * clamp(mult, 0.55, 1.45) * 10) / 10,
    reasons,
    reasonsEn
  };
}

export function drawDirectorCandidate(candidates, roll) {
  const top = candidates.slice(0, Math.min(24, candidates.length));
  if (!top.length) return null;
  const weight = (item) => Math.pow(Math.max(1, item.utility), 0.85);
  const total = top.reduce((sum, item) => sum + weight(item), 0);
  let remaining = clamp(roll, 0, 0.999999999) * total;
  for (const item of top) {
    remaining -= weight(item);
    if (remaining < 0) return item;
  }
  return top[top.length - 1];
}
