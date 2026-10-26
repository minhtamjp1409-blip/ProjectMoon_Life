// ============================================================================
// NPC PERSONALITY
// A trait line used to be the whole person. Now each NPC is an archetype with a
// want, a fear and tags the story can lean on. Tags are what quests hook into:
// a `gambler` friend gets a debt story, a `sickly` mentor gets a last-season story.
// Bond is also capped until the person's own quest is done (see director.js), so
// nobody becomes the one who dies for you just by being around.
// ============================================================================

export const ARCHETYPES = [
  { id: 'gambler', tags: ['gambler', 'liar'],
    vi: 'hay cười, và cược cả những thứ không phải của mình', en: 'laughs easily and bets what is not theirs',
    wantVi: 'một ván thắng đủ lớn để rời District', wantEn: 'one winning hand big enough to leave the District',
    fearVi: 'nghe tên mình được đọc lên trong sổ nợ', fearEn: 'hearing their name read out from a ledger' },
  { id: 'proud', tags: ['proud'],
    vi: 'không nhận quà, không nhận lời khuyên, chỉ nhận món nợ', en: 'takes no gifts and no advice, only debts',
    wantVi: 'được người ta gọi bằng tên thật', wantEn: 'to be called by their real name',
    fearVi: 'bị thương hại', fearEn: 'being pitied' },
  { id: 'idealist', tags: ['idealist'],
    vi: 'tin The City có thể đổi, và nói điều đó hơi to', en: 'believes the City can change, and says so a little loudly',
    wantVi: 'một phòng khám không hỏi tiền trước', wantEn: 'a clinic that does not ask for money first',
    fearVi: 'ngày niềm tin ấy trở nên rẻ', fearEn: 'the day that belief gets cheap' },
  { id: 'sickly', tags: ['sickly'],
    vi: 'ho khan mỗi sáng và giấu chiếc khăn tay', en: 'coughs dry every morning and hides the handkerchief',
    wantVi: 'sống thêm một mùa nữa', wantEn: 'one more season',
    fearVi: 'trở thành gánh nặng', fearEn: 'becoming a burden' },
  { id: 'ambitious', tags: ['ambitious'],
    vi: 'tính trước ba nước, biết ai ngồi ghế nào trong khu', en: 'plans three moves ahead and knows who sits where in the ward',
    wantVi: 'một chiếc ghế trong một Office lớn', wantEn: 'a seat in a large Office',
    fearVi: 'chết mà không ai nhớ tên', fearEn: 'dying with no one remembering the name' },
  { id: 'secretive', tags: ['secretive', 'runaway'],
    vi: 'ít nói, luôn mang một con dao gấp, không bao giờ kể quê', en: 'quiet, always carries a folding knife, never mentions home',
    wantVi: 'không ai biết mình từng là ai', wantEn: 'for no one to know who they used to be',
    fearVi: 'một gương mặt cũ ở cuối hẻm', fearEn: 'an old face at the end of the alley' },
  { id: 'loyal', tags: ['loyal'],
    vi: 'trung thành đến mức ngu ngốc', en: 'loyal to the point of foolishness',
    wantVi: 'một người đáng để trung thành', wantEn: 'someone worth being loyal to',
    fearVi: 'bị bỏ lại', fearEn: 'being left behind' },
  { id: 'greedy', tags: ['greedy'],
    vi: 'luôn có cách kiếm vài Ahn, và luôn muốn thêm', en: 'always finds a few Ahn, and always wants more',
    wantVi: 'một căn hộ trong Nest', wantEn: 'an apartment inside a Nest',
    fearVi: 'ngủ ngoài hẻm thêm một lần nữa', fearEn: 'sleeping in the alley one more time' },
  { id: 'devout', tags: ['devout'],
    vi: 'ghi lại mọi điềm báo, tin The Index đang dệt chỉ', en: 'writes down every omen, believes the Index is weaving thread',
    wantVi: 'một Prescript mang tên mình', wantEn: 'a Prescript with their own name on it',
    fearVi: 'một ngày không có chỉ lệnh nào', fearEn: 'a day with no instruction' },
  { id: 'artist', tags: ['artist'],
    vi: 'vẽ lên tường bằng than, xóa đi trước khi trời sáng', en: 'draws on walls in charcoal and wipes it off before dawn',
    wantVi: 'một bức không bị xóa', wantEn: 'one piece that is not wiped off',
    fearVi: 'quên gương mặt mẹ mình', fearEn: 'forgetting their mother’s face' },
  { id: 'veteran', tags: ['veteran'],
    vi: 'ngủ ngồi, tay luôn đặt trên cán', en: 'sleeps sitting up, hand always on the hilt',
    wantVi: 'một đêm không nghe tiếng nổ', wantEn: 'one night without hearing an explosion',
    fearVi: 'tiếng còi lúc 3 giờ 10', fearEn: 'the siren at 3:10' },
  { id: 'caretaker', tags: ['caretaker'],
    vi: 'nhặt mọi con vật bị bỏ rơi về nhà', en: 'takes in every abandoned animal',
    wantVi: 'một mái hiên đủ rộng cho tất cả', wantEn: 'an awning wide enough for all of them',
    fearVi: 'đếm thiếu một con', fearEn: 'counting one short' },
  { id: 'bookish', tags: ['bookish'],
    vi: 'đọc nhiều hơn ăn', en: 'reads more than they eat',
    wantVi: 'một cuốn sách còn nguyên bìa', wantEn: 'a book with its cover still on',
    fearVi: 'phải đốt sách để sưởi', fearEn: 'burning books for warmth' },
  { id: 'hothead', tags: ['hothead', 'proud'],
    vi: 'nóng tính, gây sự với đám lớn hơn mình', en: 'hot-headed, picks fights with bigger people',
    wantVi: 'thắng một lần mà không ai chứng kiến', wantEn: 'to win once with no one watching',
    fearVi: 'bị coi là yếu', fearEn: 'being seen as weak' },
  { id: 'fixerfan', tags: ['fixerfan', 'idealist'],
    vi: 'thần tượng các Color Fixer, thuộc tên từng người', en: 'idolizes the Color Fixers, knows every name',
    wantVi: 'được đứng cạnh họ một lần', wantEn: 'to stand beside one of them once',
    fearVi: 'thấy thần tượng ngã xuống', fearEn: 'watching an idol fall' },
  { id: 'nestdreamer', tags: ['nestdreamer', 'ambitious'],
    vi: 'mơ được sống trong Nest và dành tiền từng đồng một', en: 'dreams of living in a Nest and saves coin by coin',
    wantVi: 'một giấy phép cư trú', wantEn: 'a residence permit',
    fearVi: 'bị đuổi khỏi chính giấc mơ của mình', fearEn: 'being thrown out of their own dream' },
  { id: 'liar', tags: ['liar', 'secretive'],
    vi: 'nói dối giỏi đến mức chính mình cũng tin', en: 'lies so well they believe it themselves',
    wantVi: 'một lần nói thật mà không mất gì', wantEn: 'one truth that costs nothing',
    fearVi: 'bị hỏi lại câu chuyện cũ', fearEn: 'being asked to retell the old story' },
  { id: 'cook', tags: ['cook', 'caretaker'],
    vi: 'nấu cho cả khu và tính tiền bằng tin tức', en: 'cooks for the whole block and charges in gossip',
    wantVi: 'một bếp lò không bị thu thuế', wantEn: 'a stove no one taxes',
    fearVi: 'bếp tắt giữa mùa đông', fearEn: 'the stove going cold mid-winter' },
  { id: 'tinkerer', tags: ['tinkerer', 'proud'],
    vi: 'sửa được mọi thứ, trừ chính mình', en: 'can fix anything except themselves',
    wantVi: 'một xưởng nhỏ của riêng mình', wantEn: 'a small workshop of their own',
    fearVi: 'đôi tay bắt đầu run', fearEn: 'the first tremor in their hands' }
];

const pick = (list, rng) => list[Math.floor(rng() * list.length) % list.length];

export function rollArchetype(rng) {
  return pick(ARCHETYPES, rng);
}

export const hasTag = (npc, tag) => Boolean(npc && Array.isArray(npc.tags) && npc.tags.includes(tag));

/**
 * How high a bond can climb right now. Trust is earned through the person's own
 * quest, not just time spent: 40 to begin, +20 for each quest done, 100 at three.
 * Family starts a little higher because blood and a shared roof count for something.
 */
export function bondCapFor(npc) {
  if (!npc) return 40;
  const base = ['spouse', 'child', 'parent'].includes(npc.role) ? 55 : 40;
  return Math.min(100, base + 20 * (npc.questsDone || 0));
}

export function getNpcBondState(npc) {
  if (!npc) return { id: 'none', vi: 'Không có', en: 'None', color: 'var(--text-muted)', contractMod: 0, dungeonMod: 0, betrayalRisk: 0 };
  if (npc.status === 'betrayer') {
    return { id: 'betrayer', vi: 'Kẻ phản bội', en: 'Betrayer', color: 'var(--state-danger)', contractMod: -16, dungeonMod: -10, betrayalRisk: 0 };
  }
  const b = npc.bond ?? 22;
  const volatile = hasTag(npc, 'greedy') || hasTag(npc, 'liar') || hasTag(npc, 'ambitious') || hasTag(npc, 'hothead');
  if (b >= 80) {
    return { id: 'sworn', vi: 'Gắn kết sinh tử', en: 'Sworn', color: 'var(--accent-gold)', contractMod: 13, dungeonMod: 6, betrayalRisk: 0 };
  }
  if (b >= 52) {
    return { id: 'trusted', vi: 'Tin cậy', en: 'Trusted', color: 'var(--state-chill)', contractMod: 8, dungeonMod: 3, betrayalRisk: 0 };
  }
  if (b >= 30) {
    return { id: 'steady', vi: 'Bình thường', en: 'Steady', color: 'var(--text-secondary)', contractMod: 3, dungeonMod: 0, betrayalRisk: volatile && b <= 33 ? 0.04 : 0 };
  }
  if (b >= 18) {
    return {
      id: 'strained',
      vi: 'Rạn nứt (-Tỉ lệ)',
      en: 'Strained (-Odds)',
      color: 'var(--s-heat)',
      contractMod: volatile ? -10 : -7,
      dungeonMod: -5,
      betrayalRisk: volatile ? 0.14 : 0.06
    };
  }
  return {
    id: 'hostile',
    vi: 'Bất mãn / Dễ phản',
    en: 'Hostile / Betrayal Risk',
    color: 'var(--state-danger)',
    contractMod: -15,
    dungeonMod: -9,
    betrayalRisk: volatile ? 0.28 : 0.18
  };
}

export function evaluateCompanionSupport(char) {
  const npcs = char?.npcs || {};
  const isActive = (n) => Boolean(n) && n.alive !== false && !n.deceased && !['dead', 'missing', 'estranged', 'betrayer'].includes(n.status);
  const role = isActive(npcs.partner) ? 'partner' : isActive(npcs.friend) ? 'friend' : isActive(npcs.mentor) ? 'mentor' : null;
  if (!role) return { active: false, role: null, npc: null, state: null, contractPower: 0, dungeonOddsMod: 0, betrayalRisk: 0 };
  const npc = npcs[role];
  const state = getNpcBondState(npc);
  const roleScale = role === 'partner' ? 1.0 : 0.65;
  return {
    active: true,
    role,
    npc,
    state,
    contractPower: Math.round(state.contractMod * roleScale),
    dungeonOddsMod: Math.round(state.dungeonMod * roleScale),
    betrayalRisk: role === 'mentor' ? state.betrayalRisk * 0.4 : state.betrayalRisk
  };
}

export const ARCHETYPE_DUNGEON_PERKS = {
  gambler: {
    id: 'gamble',
    nameVi: 'Liều Ăn Nhiều',
    nameEn: 'High Roller',
    descVi: '+25% Ahn thu được từ Dungeon nhưng tăng nhẹ rủi ro áp lực',
    descEn: '+25% Ahn loot in Dungeons with slight strain risk',
    type: 'loot',
    lootBonus: 0.25
  },
  proud: {
    id: 'unyielding',
    nameVi: 'Bất Khuất',
    nameEn: 'Unyielding Poise',
    descVi: 'Không nao núng trước đòn đe dọa, tăng 10% tỉ lệ thành công khi đọ chiêu',
    descEn: 'Immune to intimidation, +10% Clash success rate',
    type: 'clash',
    clashBonus: 0.10
  },
  idealist: {
    id: 'beacon',
    nameVi: 'Ngọn Hải Đăng',
    nameEn: 'Moral Beacon',
    descVi: 'Hồi 8 Sanity khi người chơi đối mặt với dị thể hoặc cảnh hãi hùng',
    descEn: 'Restores 8 Sanity when encountering horrors',
    type: 'calm',
    sanityRestore: 8
  },
  sickly: {
    id: 'last_breath',
    nameVi: 'Hơi Thở Tàn',
    nameEn: 'Desperate Grasp',
    descVi: 'Tăng 20% khả năng rút lui an toàn khi cạn kiệt sinh lực',
    descEn: '+20% safe flee chance when low on HP',
    type: 'flee',
    fleeBonus: 0.20
  },
  ambitious: {
    id: 'tactician',
    nameVi: 'Toan Tính',
    nameEn: 'Ruthless Tactician',
    descVi: '+15% Merit nhận được từ Dungeon',
    descEn: '+15% Merit earned in Dungeons',
    type: 'merit',
    meritBonus: 0.15
  },
  secretive: {
    id: 'scout',
    nameVi: 'Thám Thính Ngõ Ngách',
    nameEn: 'Shadow Scout',
    descVi: 'Phát hiện bẫy ngầm, giảm 30% sát thương hiểm họa bẫy',
    descEn: 'Detects hidden hazards, reducing trap damage by 30%',
    type: 'trap_mitigation',
    damageReduction: 0.30
  },
  loyal: {
    id: 'shield',
    nameVi: 'Tấm Khiên Sinh Tử',
    nameEn: 'Mortal Aegis',
    descVi: 'Đỡ một đòn sát thương chí mạng thay người chơi (1 lần duy nhất)',
    descEn: 'Absorbs one fatal blow for the player',
    type: 'shield'
  },
  greedy: {
    id: 'salvage',
    nameVi: 'Mắt Nhặt Xác',
    nameEn: 'Scrap Eye',
    descVi: 'Tìm thêm vật phẩm hoặc linh kiện giá trị trong tàn tích',
    descEn: 'Unearths additional gear or scraps from ruins',
    type: 'salvage',
    lootBonus: 0.20
  },
  devout: {
    id: 'prescript_faith',
    nameVi: 'Tín Niệm Chỉ Lệnh',
    nameEn: 'Prescript Guidance',
    descVi: 'Giảm 25% biến động tâm thần trong lúc nguy khốn',
    descEn: 'Reduces Sanity swings by 25%',
    type: 'sanity_shield',
    sanityReduction: 0.25
  },
  artist: {
    id: 'flair',
    nameVi: 'Nét Cọ Cuồng Tưởng',
    nameEn: 'Demented Stroke',
    descVi: 'Tăng sát thương diện rộng khi đối đầu bầy quái ngõ hẻm',
    descEn: 'Enhanced clash damage against mobs',
    type: 'clash',
    clashBonus: 0.12
  },
  veteran: {
    id: 'parry',
    nameVi: 'Gạt Đòn Thực Chiến',
    nameEn: 'Combat Parry',
    descVi: 'Hóa giải hoàn toàn 1 đòn hiểm họa mỗi tầng',
    descEn: 'Parries 1 hazard check per floor',
    type: 'parry'
  },
  caretaker: {
    id: 'first_aid',
    nameVi: 'Băng Bó Dã Chiến',
    nameEn: 'Field Dressing',
    descVi: 'Hồi thêm 10 HP và 6 Sanity tại mỗi trạm nghỉ',
    descEn: 'Restores additional 10 HP & 6 Sanity at rest stops',
    type: 'breather_bonus',
    healBonus: 10,
    sanityBonus: 6
  },
  bookish: {
    id: 'analysis',
    nameVi: 'Phân Tích Điểm Yếu',
    nameEn: 'Weakness Study',
    descVi: 'Bộc lộ điểm yếu kẻ địch, tăng 12% tỉ lệ thắng giao tranh',
    descEn: 'Reveals enemy vulnerabilities, +12% combat odds',
    type: 'clash',
    clashBonus: 0.12
  },
  hothead: {
    id: 'frenzy',
    nameVi: 'Cuồng Nộ',
    nameEn: 'Blood Rage',
    descVi: 'Gấp đôi sát thương phản đòn khi người chơi bị thương tích',
    descEn: 'Doubles counter damage when wounded',
    type: 'clash',
    clashBonus: 0.15
  },
  fixerfan: {
    id: 'mimicry',
    nameVi: 'Học Đòi Color',
    nameEn: 'Hero’s Form',
    descVi: 'Tăng 8% tỉ lệ thành công trên mọi quyết định',
    descEn: '+8% success rate on all checks',
    type: 'check_bonus',
    checkBonus: 0.08
  },
  nestdreamer: {
    id: 'grit',
    nameVi: 'Bám Trụ Kiên Cường',
    nameEn: 'Tenacity',
    descVi: 'Giảm 20% lượng máu tiêu hao do kiệt sức',
    descEn: 'Reduces strain damage by 20%',
    type: 'strain_reduction',
    strainReduction: 0.20
  },
  liar: {
    id: 'feint',
    nameVi: 'Hư Chiêu Đánh Lừa',
    nameEn: 'Deceptive Feint',
    descVi: 'Tăng 25% tỉ lệ né tránh đòn công kích phủ đầu',
    descEn: '+25% evasion rate against first strikes',
    type: 'flee',
    fleeBonus: 0.25
  },
  cook: {
    id: 'ration',
    nameVi: 'Khẩu Phần Ấm',
    nameEn: 'Warm Ration',
    descVi: 'Giảm 30% chi phí hồi phục tại trạm nghỉ',
    descEn: 'Reduces breather cost by 30%',
    type: 'breather_discount',
    costReduction: 0.30
  },
  tinkerer: {
    id: 'field_repair',
    nameVi: 'Sửa Đồ Cấp Tốc',
    nameEn: 'Field Repair',
    descVi: 'Bảo dưỡng vũ khí tức thì, giảm 35% sát thương hiểm họa cơ khí',
    descEn: 'Mitigates mechanical hazards by 35%',
    type: 'trap_mitigation',
    damageReduction: 0.35
  }
};

export function getNpcDungeonPerk(npc) {
  if (!npc) return null;
  const arch = npc.archetype || (npc.tags?.[0]) || 'loyal';
  return ARCHETYPE_DUNGEON_PERKS[arch] || ARCHETYPE_DUNGEON_PERKS.loyal;
}

export const NPC_DISTRICTS = [
  'District 23 · Phố Thịt & Ẩm Thực',
  'District 4 · Tàn Tích Chiến Tranh Khói',
  'District 11 · Khu Khói Bụi Công Nghiệp',
  'District 20 · Phố Hơi Nước T Corp',
  'District 10 · Tiền Tiêu Y Tế K Corp',
  'District 8 · Phố Môi Giới Thông Tin',
  'District 2 · Vùng Giáp Ranh Nest'
];

export function rollNpcCareer(archetype, role, rng = Math.random) {
  if (role === 'mentor') {
    return {
      job: 'Fixer',
      rank: 4,
      rankLabelVi: 'Fixer Grade 4 (Kỳ cựu)',
      rankLabelEn: 'Veteran Grade 4 Fixer',
      district: NPC_DISTRICTS[Math.floor(rng() * NPC_DISTRICTS.length)]
    };
  }
  if (role === 'child' || role === 'ward') {
    return {
      job: 'Apprentice',
      rank: 0,
      rankLabelVi: 'Học nghề Backstreets',
      rankLabelEn: 'Backstreets Apprentice',
      district: NPC_DISTRICTS[0]
    };
  }
  if (['veteran', 'hothead', 'fixerfan', 'proud'].includes(archetype)) {
    const grades = [9, 8, 7, 6, 5];
    const g = grades[Math.floor(rng() * grades.length)];
    return {
      job: 'Fixer',
      rank: g,
      rankLabelVi: `Fixer Grade ${g}`,
      rankLabelEn: `Grade ${g} Fixer`,
      district: NPC_DISTRICTS[Math.floor(rng() * NPC_DISTRICTS.length)]
    };
  }
  if (['gambler', 'greedy', 'secretive', 'devout'].includes(archetype)) {
    const fingers = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
    const f = fingers[Math.floor(rng() * fingers.length)];
    return {
      job: 'Syndicate',
      rank: 1,
      rankLabelVi: `Thành viên The ${f}`,
      rankLabelEn: `The ${f} Member`,
      district: NPC_DISTRICTS[Math.floor(rng() * NPC_DISTRICTS.length)]
    };
  }
  if (['nestdreamer', 'ambitious', 'bookish'].includes(archetype)) {
    const corps = ['W Corp', 'K Corp', 'T Corp'];
    const corp = corps[Math.floor(rng() * corps.length)];
    return {
      job: 'Wing Employee',
      rank: 1,
      rankLabelVi: `Nhân viên ${corp}`,
      rankLabelEn: `${corp} Feather`,
      district: NPC_DISTRICTS[Math.floor(rng() * NPC_DISTRICTS.length)]
    };
  }
  if (['tinkerer', 'artist'].includes(archetype)) {
    return {
      job: 'Workshop Artisan',
      rank: 1,
      rankLabelVi: 'Thợ chế tác Workshop',
      rankLabelEn: 'Workshop Artisan',
      district: NPC_DISTRICTS[Math.floor(rng() * NPC_DISTRICTS.length)]
    };
  }
  const civJobs = [
    { vi: 'Chủ quán rượu Backstreets', en: 'Backstreet Tavern Keeper' },
    { vi: 'Môi giới thông tin ngầm', en: 'Underground Broker' },
    { vi: 'Bác sĩ phòng khám chui', en: 'Backstreet Alley Medic' },
    { vi: 'Người giao hàng ngõ ngách', en: 'Alley Courier' }
  ];
  const c = civJobs[Math.floor(rng() * civJobs.length)];
  return {
    job: 'Civilian',
    rank: 0,
    rankLabelVi: c.vi,
    rankLabelEn: c.en,
    district: NPC_DISTRICTS[Math.floor(rng() * NPC_DISTRICTS.length)]
  };
}

export function ensureNpcAgency(npc, rng = Math.random) {
  if (!npc) return npc;
  const copy = { ...npc };
  if (!copy.archetype) {
    const arch = rollArchetype(rng);
    copy.archetype = arch.id;
    copy.tags = copy.tags || [...arch.tags];
    copy.wantVi = copy.wantVi || arch.wantVi;
    copy.wantEn = copy.wantEn || arch.wantEn;
    copy.fearVi = copy.fearVi || arch.fearVi;
    copy.fearEn = copy.fearEn || arch.fearEn;
  }
  if (!copy.job || !copy.district) {
    const career = rollNpcCareer(copy.archetype, copy.role, rng);
    copy.job = copy.job || career.job;
    copy.rank = copy.rank ?? career.rank;
    copy.rankLabelVi = copy.rankLabelVi || career.rankLabelVi;
    copy.rankLabelEn = copy.rankLabelEn || career.rankLabelEn;
    copy.district = copy.district || career.district;
  }
  if (!copy.dungeonPerk) {
    copy.dungeonPerk = getNpcDungeonPerk(copy);
  }
  if (!copy.crisis) {
    copy.crisis = { type: 'none', severity: 0, labelVi: '', labelEn: '' };
  }
  if (!copy.debts) {
    copy.debts = { toPlayer: 0, toOthers: 0, favorCount: 0 };
  }
  if (!Array.isArray(copy.memories)) {
    copy.memories = [];
  }
  return copy;
}

