// Birth: region, family and a new character; cloneChar copies a character for the next state.
import { ALL_STORY_EVENTS, SEASONS, clamp, createRNG, freshSeed, interpolateText, rollOriginalCityName } from './gameEngine.js';
import { ENSEMBLE_SCORE_ITEM } from '../data/dungeonEnsemble.js';
import { FAMILIES, REGIONS } from '../data/worldData.js';
import { ancestorLandmarksFromLives, applyAncestorEchoInheritance } from './cityUpgrades.js';
import { composeBirth } from '../data/birthStories.js';
import { createInitialWeaverState, rollRandomFateOmen } from './weaverAI.js';
import { ensureNpcAgency } from '../data/npcPersonality.js';
import { frailty } from './economyModel.js';
import { initChildhoodMontage } from './childhoodFastForward.js';
import { keepsakeForLife, normalizeLegacyRecord } from './legacyKeepsake.js';
import { localizeEnsembleName } from '../data/ensembleNames.js';
import { normalizeScars } from './scarModel.js';
import { rollCareerAge } from './careerAge.js';
import { rollPerinatalFate } from './fateEngine.js';
import { rollTraits } from './variance.js';
import { syncVisibleDoorsForChar } from './lockedDoors.js';

/**
 * Creates a new character (Generation 1 or Generational Heir of Generation N)
 * The newborn is also given a random fate omen.
 */
/**
 * A birthplace left to chance: weighted by population, with a 65% pull back to
 * the previous generation's District. The home screen's wheel spins to this
 * result, so it must stay the only place the roll happens.
 */
export function rollBirthRegion(rng = Math.random, parentLegacy = null, preferredFamilyId = 'RANDOM') {
  if (preferredFamilyId === 'outskirts_nomad') return REGIONS.find(r => r.id === 'OUTSKIRTS');
  const regions = preferredFamilyId && preferredFamilyId !== 'RANDOM'
    ? REGIONS.filter(r => r.id !== 'OUTSKIRTS')
    : REGIONS;
  if (parentLegacy?.regionId && rng() < 0.65) {
    const inherited = REGIONS.find(r => r.id === parentLegacy.regionId);
    if (inherited && regions.includes(inherited)) return inherited;
  }
  const totalWeight = regions.reduce((s, r) => s + (r.birthWeight || 1), 0);
  let pick = rng() * totalWeight;
  for (const r of regions) {
    pick -= r.birthWeight || 1;
    if (pick <= 0) return r;
  }
  return regions[0];
}

export function rollBirthFamily(region, rng, parentLegacy = null, preferredFamilyId = 'RANDOM') {
  if (region.id === 'OUTSKIRTS') {
    return FAMILIES.find((f) => f.id === 'outskirts_nomad');
  }
  const hasLivingParentAtBirth = parentLegacy?.successorRelation === 'child' && parentLegacy.age >= 18;
  const excludedForChild = new Set(['orphan', 'dieci_orphan']);
  if (preferredFamilyId && preferredFamilyId !== 'RANDOM') {
    const selected = FAMILIES.find((f) => f.id === preferredFamilyId);
    if (selected && selected.id !== 'outskirts_nomad' && !(hasLivingParentAtBirth && excludedForChild.has(selected.id))) return selected;
  }
  if (region.tags?.includes('head')) {
    const headFamilies = FAMILIES.filter((f) => ['nest_feather', 'wing_executive'].includes(f.id));
    return headFamilies[Math.floor(rng() * headFamilies.length)] || FAMILIES[0];
  }
  if (region.tags?.includes('fallen_wing')) {
    const fallenFamilies = FAMILIES.filter((f) => ['smoke_war_veteran', 'orphan', 'backstreet_worker', 'fixer_lineage', 'workshop_apprentice'].includes(f.id) && !(hasLivingParentAtBirth && excludedForChild.has(f.id)));
    return fallenFamilies[Math.floor(rng() * fallenFamilies.length)] || FAMILIES[0];
  }
  if (parentLegacy) {
    if (parentLegacy.wealth >= 60) {
      const nestFam = FAMILIES.find((f) => f.id === 'nest_feather' || f.id === 'wing_executive');
      if (nestFam) return nestFam;
    } else if (parentLegacy.job === 'Fixer' || parentLegacy.job === 'Color Fixer') {
      const fixerFam = FAMILIES.find((f) => f.id === 'fixer_lineage');
      if (fixerFam) return fixerFam;
    }
  }

  const weights = {
    orphan: 14,
    backstreet_worker: 18,
    smoke_war_veteran: region.ward === 4 || region.id === 'D' || region.id === 'G' ? 24 : 8,
    fixer_lineage: 12,
    workshop_apprentice: region.id === 'T' || region.ward === 20 || region.id === 'J' ? 18 : 10,
    syndicate_soldato: region.id === 'J' || region.id === 'K' || region.id === 'N' ? 18 : 12,
    nest_feather: region.wealth >= 8 ? 24 : 8,
    wing_executive: region.wealth >= 9 ? 12 : 2,
    dieci_orphan: region.ward === 11 || region.id === 'K' ? 18 : 8,
    great_lake_mariner: region.id === 'U' || region.ward === 21 ? 30 : 2,
    warp_cleaner_offspring: region.id === 'W' || region.ward === 23 ? 24 : 4,
    backstreet_bistro: region.ward === 23 || region.id === 'H' ? 18 : 10,
    prosthetic_tinkerer: region.id === 'T' || region.id === 'V' || region.id === 'G' ? 18 : 10
  };

  const pool = FAMILIES.filter((f) => f.id !== 'outskirts_nomad' && !(hasLivingParentAtBirth && excludedForChild.has(f.id)));
  const total = pool.reduce((sum, f) => sum + (weights[f.id] || 10), 0);
  let pick = rng() * total;
  for (const f of pool) {
    pick -= (weights[f.id] || 10);
    if (pick <= 0) return f;
  }
  return pool[0] || FAMILIES[0];
}

export function createNewCharacter({
  customName = '',
  gender = 'unspecified',
  seed = '',
  preferredRegionId = 'RANDOM',
  preferredFamilyId = 'RANDOM',
  parentLegacy = null,
  pastLives = [],
  openedDoors = [],
  startAge = 0,
  fastForwardChildhood = false,
  // A player's very first life is never lost in the womb: they have not made a single choice yet
  sparePerinatal = false
} = {}) {
  parentLegacy = normalizeLegacyRecord(parentLegacy);
  const actualSeed = seed.trim() || freshSeed();
  const rng = createRNG(actualSeed);
  const actualAge = Math.max(0, startAge);

  // Pick Region
  let region = null;
  if (preferredRegionId && preferredRegionId !== 'RANDOM') {
    region = REGIONS.find(r => r.id === preferredRegionId);
  }
  if (!region) region = rollBirthRegion(rng, parentLegacy, preferredFamilyId);

  // Pick Family Background
  const family = rollBirthFamily(region, rng, parentLegacy, preferredFamilyId);

  // Roll RNG Fate Omen at birth!
  const fateOmen = rollRandomFateOmen(rng, Boolean(parentLegacy));
  const omenMod = fateOmen.statMod || {};

  const defaultName =
    customName.trim() ||
    (parentLegacy?.childName
      ? parentLegacy.childName
      : rollOriginalCityName(rng, { regionId: region.id, nest: family.tier === 'nest' || family.id === 'nest_feather' }));

  const generation = parentLegacy ? (parentLegacy.generation || 1) + 1 : 1;

  // Base Stats (0 - 100) + Family Background + RNG Fate Omen modifiers - Balanced for Project Moon lore
  let health = clamp(52 + (family.statMod.health || 0) + (omenMod.health || 0) + Math.floor(rng() * 10 - 4), 20, 95);
  let sanity = clamp(52 + (family.statMod.sanity || 0) + (omenMod.sanity || 0) + Math.floor(rng() * 10 - 4), 20, 95);
  let wealth = clamp(6 + (family.statMod.wealth || 0) + (omenMod.wealth || 0) + Math.floor(rng() * 4 - 1), 1, 95);
  let network = clamp(2 + (family.statMod.network || 0) + Math.floor(rng() * 3), 0, 50);
  let rep = clamp(0 + (family.statMod.rep || 0) + Math.floor(rng() * 2), 0, 50);

  const flags = [...(family.flags || [])];
  if (family.trait?.id && !flags.includes(family.trait.id)) {
    flags.push(family.trait.id);
  }
  const scars = [];
  const unlockedRecords = [region.id === 'OUTSKIRTS' ? 'born_outskirts' : 'born_city'];
  let heat = clamp((family.statMod.heat || 0) + (omenMod.heat || 0), 0, 100);
  let taboo = clamp((family.statMod.taboo || 0) + (omenMod.taboo || 0), 0, 2);
  let resonance = clamp(5 + (family.statMod.resonance || 0) + (omenMod.resonance || 0), 0, 100);

  if (['merciless_head', 'carmen_whisper', 'crimson_sweeper_star'].includes(fateOmen.id)) {
    unlockedRecords.push('omen_cursed_birth');
  }
  if (generation >= 3) unlockedRecords.push('dynasty_gen3');
  if (generation >= 5) unlockedRecords.push('dynasty_gen5');
  if (region.id === 'T') unlockedRecords.push('tcorp_time_debtor');

  // Apply Generational Inheritance based on the 5 Successor Archetypes
  let lineageInfo = null;
  const inheritedEchoes = [];

  if (parentLegacy) {
    flags.push('HuyếtThốngKếThừa');
    if (!unlockedRecords.includes('lineage_heir')) unlockedRecords.push('lineage_heir');
    if (parentLegacy.ensembleScore) resonance = clamp(resonance + 3, 0, 100);
    const inheritedRelicEn = parentLegacy.relicEn || localizeEnsembleName(parentLegacy.relic, 'en');

    const succRel = parentLegacy.successorRelation || (parentLegacy.age < 14 ? 'sibling' : parentLegacy.age < 18 ? 'companion' : parentLegacy.hasChild ? 'child' : 'scavenger');

    if (succRel === 'child') {
      wealth = clamp(wealth + Math.round((parentLegacy.wealth || 0) * 0.25), 2, 75);
      rep = clamp(rep + Math.round((parentLegacy.rep || 0) * 0.15), 1, 50);
      network = clamp(network + Math.round((parentLegacy.network || 0) * 0.18), 1, 50);
      inheritedEchoes.push({
        labelVi: `Huyết tử thừa kế từ ${parentLegacy.name}: ${parentLegacy.relic}`,
        labelEn: `Biological inheritance from ${parentLegacy.name} (${inheritedRelicEn})`,
        impactVi: `Thêm Ahn lúc đầu, người cũ của ${parentLegacy.name} có thể tìm đến`,
        impactEn: `+Starting Ahn, unlocks Heirloom & Old Comrade causal events`
      });
    } else if (succRel === 'sibling') {
      wealth = clamp(wealth + Math.round((parentLegacy.wealth || 0) * 0.10), 2, 45);
      resonance = clamp(resonance + 6, 0, 100);
      sanity = clamp(sanity + 5, 10, 95);
      scars.push('Nỗi đau kẻ sống sót');
      inheritedEchoes.push({
        labelVi: `Kỷ vật của người ngã xuống tuổi thơ: ${parentLegacy.relic}`,
        labelEn: `Keepsake of one fallen young (${inheritedRelicEn})`,
        impactVi: `+6 Resonance, mang Vết sẹo Nỗi đau kẻ sống sót kiên cường khi nguy cấp`,
        impactEn: `+6 Resonance, Survivor's Guilt scar grants resilience in crisis`
      });
    } else if (succRel === 'companion') {
      network = clamp(network + Math.round((parentLegacy.network || 0) * 0.20), 1, 50);
      rep = clamp(rep + Math.round((parentLegacy.rep || 0) * 0.12), 1, 50);
      resonance = clamp(resonance + 4, 0, 100);
      inheritedEchoes.push({
        labelVi: `Di nguyện của bạn đồng hành: ${parentLegacy.relic}`,
        labelEn: `Companion's parting vow (${inheritedRelicEn})`,
        impactVi: `+Mạng lưới Backstreets và Resonance từ lời thề đồng hành`,
        impactEn: `+Starting Network and Resonance from shared youthful vows`
      });
    } else if (succRel === 'apprentice') {
      rep = clamp(rep + Math.round((parentLegacy.rep || 0) * 0.25), 1, 50);
      network = clamp(network + Math.round((parentLegacy.network || 0) * 0.22), 1, 50);
      health = clamp(health + 8, 20, 95);
      inheritedEchoes.push({
        labelVi: `Truyền nhân ý chí của ${parentLegacy.name}: ${parentLegacy.relic}`,
        labelEn: `Protege inheritor of ${parentLegacy.name} (${inheritedRelicEn})`,
        impactVi: `+Khởi điểm Danh tiếng, Mạng lưới và Thân pháp võ học được rèn giũa`,
        impactEn: `+Higher starting Rep, Network and trained physical fortitude`
      });
    } else if (succRel === 'debt_bearer') {
      network = clamp(network + 16, 1, 50);
      resonance = clamp(resonance + 6, 0, 100);
      heat = clamp(heat + 32, 0, 100);
      flags.push('NợMáuĐờiTrước');
      scars.push(`Món Nợ Máu Của ${parentLegacy.name}`);
      inheritedEchoes.push({
        labelVi: `Món nợ ép gánh từ thời ${parentLegacy.name}`,
        labelEn: `Blood debt forced upon you from ${parentLegacy.name}`,
        impactVi: `Syndicate bắt thế nợ, Heat cao kích thích tiềm năng phản kháng`,
        impactEn: `Forced debt, starts with Syndicate Heat and resistance drive`
      });
    } else {
      // scavenger / solitary
      wealth = clamp(wealth + Math.round((parentLegacy.wealth || 0) * 0.08), 2, 40);
      resonance = clamp(resonance + 5, 0, 100);
      flags.push('BảnLĩnhNgõCùng');
      inheritedEchoes.push({
        labelVi: `Di vật nhặt từ đống đổ nát của ${parentLegacy.name}: ${parentLegacy.relic}`,
        labelEn: `Scavenged relic of ${parentLegacy.name} (${inheritedRelicEn})`,
        impactVi: `Nhận di vật vô chủ, tiềm năng thức tỉnh vũ khí bí mật`,
        impactEn: `Found unowned relic, hidden weapon awakening potential`
      });
    }

    lineageInfo = {
      generation,
      parentName: parentLegacy.name,
      parentAge: parentLegacy.age || 0,
      parentTitle: parentLegacy.epitaphTitleVi,
      parentJob: parentLegacy.job,
      parentDeathVi: parentLegacy.deathCauseVi,
      parentDeathEn: parentLegacy.deathCauseEn,
      relic: parentLegacy.relic || keepsakeForLife(parentLegacy).vi,
      relicEn: inheritedRelicEn || keepsakeForLife(parentLegacy).en,
      inheritedDebt: Boolean(parentLegacy.hasVendetta || succRel === 'debt_bearer'),
      successorRelation: succRel,
      successorTitleVi: parentLegacy.successorTitleVi,
      successorTitleEn: parentLegacy.successorTitleEn,
      successorIntroVi: parentLegacy.successorIntroVi,
      successorIntroEn: parentLegacy.successorIntroEn
    };

    if (parentLegacy.ensembleScore) inheritedEchoes.push({
      labelVi: 'Bản tổng phổ viết dở', labelEn: 'The Unfinished Score',
      impactVi: 'Thêm 3 Resonance khi bắt đầu đời mới', impactEn: 'Start the next life with 3 extra Resonance'
    });

    if (parentLegacy.hasVendetta && succRel !== 'debt_bearer') {
      flags.push('NợMáuĐờiTrước');
      heat = clamp(heat + 28, 0, 100);
      scars.push(`Món Nợ Máu Của ${parentLegacy.name}`);
      inheritedEchoes.push({
        labelVi: `Món nợ trong Book of Vengeance từ thời ${parentLegacy.name}`,
        labelEn: `Book of Vengeance blood debt from ${parentLegacy.name}`,
        impactVi: `Syndicate sẽ tìm đến đòi nợ khi bạn trưởng thành`,
        impactEn: `The Syndicate will come to collect when you come of age`
      });
    }

    const echoState = { wealth, rep, network, resonance, heat, sanity, flags, inheritedEchoes };
    applyAncestorEchoInheritance(parentLegacy, echoState);
    wealth = echoState.wealth;
    rep = echoState.rep;
    network = echoState.network;
    resonance = echoState.resonance;
    heat = echoState.heat;
    sanity = echoState.sanity;

    const reserveAhn = parentLegacy.reserveAhn || 0;
    const hasEndowment = Boolean(parentLegacy.hasLineageEndowment || parentLegacy.flags?.includes('LineageEndowmentFund'));
    if (reserveAhn > 0 || hasEndowment) {
      const bonusWealth = Math.min(35, Math.floor(reserveAhn * 0.35) + (hasEndowment ? 18 : 0));
      if (bonusWealth > 0) {
        wealth = clamp(wealth + bonusWealth, 1, 95);
        rep = clamp(rep + (hasEndowment ? 6 : 2), 0, 65);
        inheritedEchoes.push({
          labelVi: hasEndowment
            ? `Quỹ Di Sản Huyết Thống của ${parentLegacy.name}`
            : `Quỹ Bảo Tồn của ${parentLegacy.name} (${reserveAhn} Ahn tích lũy)`,
          labelEn: hasEndowment
            ? `${parentLegacy.name}'s Lineage Endowment Fund`
            : `${parentLegacy.name}'s Reserve Vault (${reserveAhn} Ahn saved)`,
          impactVi: `+${bonusWealth} Ahn khởi đầu${hasEndowment ? ', +6 Danh tiếng' : ', +2 Danh tiếng'}`,
          impactEn: `+${bonusWealth} starting Ahn${hasEndowment ? ', +6 Rep' : ', +2 Rep'}`
        });
      }
    }
  }

  let deathAtChildAge = 0;
  const isBiologicalChild = Boolean(parentLegacy && parentLegacy.successorRelation === 'child');
  if (isBiologicalChild && parentLegacy.age >= 18) {
    const parentChildBirthAge = Math.min(parentLegacy.age - 1, Math.max(18, parentLegacy.age - 18));
    deathAtChildAge = Math.max(1, parentLegacy.age - parentChildBirthAge);
  }

  const parentNpc = parentLegacy ? ensureNpcAgency({
    id: 'npc_parent',
    name: parentLegacy.name,
    nameVi: parentLegacy.name,
    nameEn: parentLegacy.name,
    role: 'parent',
    job: parentLegacy.job,
    district: parentLegacy.regionNameVi || null,
    relic: parentLegacy.relic,
    alive: isBiologicalChild && actualAge < deathAtChildAge,
    deathAgeInChildLife: deathAtChildAge
  }, rng) : null;

  if (actualAge >= 18) {
    health = clamp(health + 18, 20, 95);
    sanity = clamp(sanity + 18, 20, 95);
    wealth = clamp(wealth + 14, 5, 85);
    network = clamp(network + 10, 0, 50);
    rep = clamp(rep + 10, 0, 50);
  }

  // The opening lines are assembled from independent random pieces (see birthStories.js)
  const birthKind = flags.includes('Outskirts') || region.id === 'OUTSKIRTS' ? 'out' : flags.includes('Nest') || flags.includes('Feather') ? 'nest' : 'back';
  const birth = composeBirth({
    kind: birthKind,
    familyId: family.id,
    omenId: fateOmen.id,
    regionVi: region.nameVi,
    regionEn: region.nameEn,
    regionId: region.id,
    name: defaultName,
    generation,
    rng
  });

  // Check Pre-Birth / Perinatal Mortality (District medicine, pollution, safety, poverty)
  // Rolled even when spared, so the rest of the seed plays out the same
  const perinatalRoll = actualAge === 0 ? rollPerinatalFate({
    region,
    familyId: family.id,
    omenId: fateOmen.id,
    flags,
    wealth
  }, rng) : null;
  const perinatal = sparePerinatal ? null : perinatalRoll;

  let initialLogs = [];
  if (perinatal) {
    initialLogs.push({
      id: 'log_birth_perinatal_0',
      age: 0,
      season: SEASONS[0],
      type: 'danger',
      vi: perinatal.preludeVi(region.nameVi),
      en: perinatal.preludeEn(region.nameEn)
    });
    initialLogs.push({
      id: 'log_birth_perinatal_1',
      age: 0,
      season: SEASONS[0],
      type: 'death',
      vi: region.id === 'OUTSKIRTS'
        ? `[Mất trước khi cất tiếng khóc] ${perinatal.deathVi}. Đoàn xe chôn bạn ở nơi họ dừng chân đêm ấy.`
        : `[Mất trước khi cất tiếng khóc] ${perinatal.deathVi}. Một sinh linh nữa rời The City khi ánh đèn neon ngoài cửa sổ còn chưa kịp đổi màu.`,
      en: region.id === 'OUTSKIRTS'
        ? `[Perished before drawing breath] ${perinatal.deathEn}. The caravan buried you where it stopped that night.`
        : `[Perished before drawing breath] ${perinatal.deathEn}. Another life slipped from The City before neon lights outside could change color.`
    });
  } else if (actualAge > 0) {
    initialLogs.push({
      id: 'log_adult_start_0',
      age: actualAge,
      season: SEASONS[0],
      type: 'story',
      vi: region.id === 'OUTSKIRTS'
        ? `Năm bạn ${actualAge} tuổi, đoàn xe dừng bên ngoài bức tường The City. Bạn mang theo 「${lineageInfo?.relic || 'kỷ vật cũ'}」 của ${parentLegacy?.name || 'người đi trước'} và tự chọn đường đi tiếp.`
        : `Năm bạn ${actualAge} tuổi, ${parentLegacy ? parentLegacy.name : 'người đi trước'} đã ngã xuống trong biến cố The City. Bạn tiếp nhận di vật 「${lineageInfo?.relic || 'Kỷ vật cũ'}」 và chính thức bắt đầu hành trình của riêng mình.`,
      en: region.id === 'OUTSKIRTS'
        ? `At age ${actualAge}, the caravan stops beyond the City wall. You carry 「${lineageInfo?.relicEn || 'an old keepsake'}」 from ${parentLegacy?.name || 'the one before you'} and choose your next road.`
        : `At age ${actualAge}, ${parentLegacy ? parentLegacy.name : 'your predecessor'} fell in the perils of The City. You take up 「${lineageInfo?.relicEn || 'a keepsake'}」 and begin your own path.`
    });
  } else {
    initialLogs = birth.lines.map((line, i) => ({
      id: `log_birth_${i}`,
      age: 0,
      season: SEASONS[0],
      ...line
    }));

    if (lineageInfo) {
      if (parentNpc && parentNpc.alive) {
        initialLogs.push({
          id: 'log_parent_living',
          age: 0,
          season: SEASONS[1],
          type: 'causal',
          vi: `Bạn chào đời tại ${region.nameVi}. Cha/mẹ bạn (${parentLegacy.name}, ${parentLegacy.job || 'cư dân The City'}) lúc này vẫn còn sống và che chở bạn qua những năm tháng ấu thơ.`,
          en: `You were born in ${region.nameEn}. Your parent (${parentLegacy.name}) is alive and watching over your early childhood.`
        });
      } else {
        let legacyVi = `Bạn là con của ${lineageInfo.parentName}. Thứ duy nhất người ấy để lại là 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', và một món nợ máu với Syndicate.' : '.'}`;
        let legacyEn = `You are the child of ${lineageInfo.parentName}. All they left you was 「${lineageInfo.relicEn}」${lineageInfo.inheritedDebt ? ', and a blood debt to a Syndicate.' : '.'}`;

        if (lineageInfo.successorRelation === 'sibling' || (lineageInfo.parentAge > 0 && lineageInfo.parentAge < 14)) {
          legacyVi = `${lineageInfo.parentName} ngã xuống năm ${lineageInfo.parentAge} tuổi khi chưa kịp lớn. Bạn là đứa trẻ trốn cùng buồng trọ lúc 3:13 AM nhặt lại 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', cùng món nợ máu dở dang với Syndicate.' : '.'}`;
          legacyEn = `${lineageInfo.parentName} perished young at age ${lineageInfo.parentAge}. You are the room-child who hid beside them at 3:13 AM, clutching 「${lineageInfo.relicEn}」${lineageInfo.inheritedDebt ? ', along with an unsettled Syndicate blood debt.' : '.'}`;
        } else if (lineageInfo.successorRelation === 'companion' || (lineageInfo.parentAge >= 14 && lineageInfo.parentAge < 18)) {
          legacyVi = `${lineageInfo.parentName} ngã xuống giữa tuổi thiếu niên (${lineageInfo.parentAge} tuổi). Bạn là người bạn cùng ngõ hẻm tiếp bước mang theo 「${lineageInfo.relic}」${lineageInfo.inheritedDebt ? ', cùng món nợ máu dở dang với Syndicate.' : '.'}`;
          legacyEn = `${lineageInfo.parentName} fell at age ${lineageInfo.parentAge}. You are the alley companion who took up their 「${lineageInfo.relicEn}」${lineageInfo.inheritedDebt ? ', along with an unsettled Syndicate blood debt.' : '.'}`;
        } else if (lineageInfo.successorRelation === 'apprentice') {
          legacyVi = `${lineageInfo.parentName} qua đời năm ${lineageInfo.parentAge} tuổi. Bạn là môn sinh được người ấy dìu dắt, tiếp nhận 「${lineageInfo.relic}」 và ý chí chiến đấu chưa hoàn tất.`;
          legacyEn = `${lineageInfo.parentName} passed away at age ${lineageInfo.parentAge}. You are the protégé they mentored, taking up 「${lineageInfo.relicEn}」 and their martial will.`;
        } else if (lineageInfo.successorRelation === 'debt_bearer') {
          legacyVi = `${lineageInfo.parentName} qua đời năm ${lineageInfo.parentAge} tuổi khi nợ máu chưa trả hết. Bạn bị Syndicate ép gánh cuốn sổ nợ cùng di vật 「${lineageInfo.relic}」.`;
          legacyEn = `${lineageInfo.parentName} died at age ${lineageInfo.parentAge} with an unsettled blood debt. The Syndicate forced their ledger and 「${lineageInfo.relicEn}」 into your hands.`;
        } else if (lineageInfo.successorRelation === 'scavenger' || lineageInfo.successorRelation === 'heir') {
          legacyVi = `${lineageInfo.parentName} qua đời cô độc năm ${lineageInfo.parentAge} tuổi. Bạn là kẻ nhặt rác Backstreets tình cờ đào được 「${lineageInfo.relic}」 từ đống gạch vụn trước giờ Sweeper dọn sạch.`;
          legacyEn = `${lineageInfo.parentName} died alone at age ${lineageInfo.parentAge}. You are a Backstreet scavenger who unearthed 「${lineageInfo.relicEn}」 before the Sweepers arrived.`;
        }

        initialLogs.push({
          id: 'log_legacy_0',
          age: 0,
          season: SEASONS[1],
          type: 'causal',
          vi: legacyVi,
          en: legacyEn
        });
      }
    }
  }

  const weaver = createInitialWeaverState(fateOmen.id, inheritedEchoes);
  if (parentNpc && parentNpc.alive && deathAtChildAge > actualAge) {
    weaver.pendingThreads.push({
      id: 'thread_parent_passing',
      eventId: 'csq_parent_historic_passing',
      triggerAge: deathAtChildAge,
      kind: 'major',
      reasonVi: `Năm bạn ${deathAtChildAge} tuổi: Biến cố ${parentLegacy.name} ngã xuống`,
      reasonEn: `At age ${deathAtChildAge}: The historic fall of ${parentLegacy.name}`
    });
  }

  const createdChar = {
    seed: actualSeed,
    generation,
    name: defaultName,
    gender: gender === 'male' || gender === 'female' ? gender : 'unspecified',
    age: actualAge,
    bodyAge: Number((actualAge * frailty({ regionId: region.id })).toFixed(2)),
    bodyAgeRecordedAt: actualAge,
    seasonIdx: 0,
    alive: !perinatal,
    deathCauseVi: perinatal ? perinatal.deathVi : null,
    deathCauseEn: perinatal ? perinatal.deathEn : null,
    regionId: region.id,
    birthRegionId: region.id,
    familyId: family.id,
    family: {
      id: family.id,
      nameVi: family.nameVi,
      nameEn: family.nameEn,
      descVi: family.descVi,
      descEn: family.descEn,
      trait: family.trait || null
    },
    backgroundTrait: family.trait || null,
    fateOmenId: fateOmen.id,
    traits: rollTraits(createRNG(`${actualSeed}:traits`)),
    job: actualAge >= 18 && region.id !== 'OUTSKIRTS'
      ? (parentLegacy?.job === 'Syndicate' ? 'Syndicate' : parentLegacy?.job === 'Wing Employee' ? 'Wing Employee' : 'Fixer')
      : 'Child',
    careerAge: rollCareerAge(actualSeed, {
      nest: flags.includes('Nest') || flags.includes('Feather'),
      outskirts: region.id === 'OUTSKIRTS',
      poor: ['orphan', 'backstreet_worker', 'smoke_war_veteran'].includes(family.id)
    }),
    fixerGrade: 9,
    lastFixerExamAge: null,
    fixerTrialRetryGrade: null,
    merit: actualAge >= 18 ? 10 : 0,
    finger: actualAge >= 18 && parentLegacy?.job === 'Syndicate' ? parentLegacy?.finger : null,
    fingerRank: actualAge >= 18 && parentLegacy?.job === 'Syndicate' ? 1 : 0,
    wingRank: 0,
    wingEmployerId: actualAge >= 18 && parentLegacy?.job === 'Wing Employee' ? region.id : null,
    syndicateRank: 0,
    org: null,
    customTitle: null,
    egoName: null,
    craftWeapon: null,
    inventory: parentLegacy?.ensembleScore ? [{ ...ENSEMBLE_SCORE_ITEM }] : [],
    debts: [],
    stats: {
      health: perinatal ? 0 : health,
      sanity: perinatal ? 0 : sanity,
      wealth,
      network,
      rep
    },
    get health() { return this.stats.health; },
    get sanity() { return this.stats.sanity; },
    get wealth() { return this.stats.wealth; },
    get network() { return this.stats.network; },
    get rep() { return this.stats.rep; },
    heat,
    taboo,
    resonance,
    flags,
    activeArcs: [],
    scars,
    npcs: {
      friend: birth.friend ? { ...birth.friend, metAge: 0, ...(perinatal ? { needsNaming: false, namedPrompted: true } : {}) } : null,
      parent: parentNpc,
      mentor: (parentLegacy && parentLegacy.successorRelation === 'apprentice' && parentLegacy.npcs?.partner && parentLegacy.npcs.partner.status !== 'dead')
        ? ensureNpcAgency({
            ...parentLegacy.npcs.partner,
            role: 'mentor',
            metAge: 0,
            bond: 65,
            traitVi: `Cộng sự cũ của ${parentLegacy.name}, nay trở thành người dìu dắt bạn`,
            traitEn: `Former comrade of ${parentLegacy.name}, now guiding you`,
            memories: [{ age: 0, vi: `Năm 0 tuổi: Nhận lời dìu dắt từ người bạn chiến đấu của ${parentLegacy.name}.`, en: `Age 0: Taken under the wing of ${parentLegacy.name}'s comrade.`, pinned: true }]
          }, rng)
        : null,
      partner: null,
      spouse: null,
      child: null,
      nemesis: (parentLegacy?.npcs?.nemesis && parentLegacy.npcs.nemesis.status !== 'dead')
        ? ensureNpcAgency({
            ...parentLegacy.npcs.nemesis,
            role: 'nemesis',
            metAge: 0,
            traitVi: `Kẻ thù truyền kiếp của ${parentLegacy.name}, nay chuyển tầm ngắm sang hậu bối`,
            traitEn: `Sworn nemesis of ${parentLegacy.name}, now hunting the heir`,
            memories: [{ age: 0, vi: `Năm 0 tuổi: Thừa kế mối thù sâu nặng từ thời ${parentLegacy.name}.`, en: `Age 0: Inherited the blood feud from ${parentLegacy.name}.`, pinned: true }]
          }, rng)
        : null
    },
    lineage: lineageInfo,
    ancestorLandmarks: ancestorLandmarksFromLives([...(pastLives || []), ...(parentLegacy ? [parentLegacy] : [])]),
    ancestorBulletinsShown: 0,
    reserveAhn: 0,
    bloodlineSeenEvents: parentLegacy
      ? [...new Set([...(parentLegacy.bloodlineSeenEvents || []), ...(parentLegacy.seenEvents || [])])] // seenEvents: legacies saved before Đợt 151
      : [],
    seenEvents: [],
    seenBulletins: [],
    openedDoors: [],
    visibleDoors: [],
    doorsDecade: null,
    recent: [],
    plan: [],
    planCursor: 0,
    pendingMinor: null,
    memory: [],
    motifs: {},
    habits: {},
    habitChallenges: [],
    unlockedRecords,
    contractRecord: { fixer: 0, wing: 0, independent: 0, fingers: {}, highestFixerTier: 0 },
    dungeonRecord: { clears: [] },
    logs: [],
    pendingBirthLogs: initialLogs,
    weaver,
    pendingEvent: null,
    pendingContract: null,
    pendingDungeon: null,
    pendingNpcNaming: null,
    pendingModal: null,
    childhoodMontage: null
  };
  syncVisibleDoorsForChar(createdChar, { events: ALL_STORY_EVENTS, openedDoors, rng });
  if (fastForwardChildhood && actualAge === 0 && Array.isArray(pastLives) && pastLives.length >= 1) {
    initChildhoodMontage(createdChar, {
      events: ALL_STORY_EVENTS,
      interpolateText,
      openedDoors,
      rng
    });
  }
  return createdChar;
}

export function cloneChar(char) {
  const scarState = normalizeScars(char);
  const invClone = structuredClone(char.inventory || []);
  const eqClone = char.equipped ? structuredClone(char.equipped) : undefined;
  if (eqClone) {
    for (const slot of ['weapon', 'armor', 'consumable', 'utility']) {
      if (eqClone[slot]?.id) {
        const matchInInv = invClone.find((it) => it && (it.id || it) === eqClone[slot].id);
        if (matchInInv && typeof matchInInv === 'object') {
          eqClone[slot] = matchInInv;
        }
      }
    }
  }
  const copy = {
    ...char,
    stats: { ...char.stats },
    flags: [...char.flags],
    scars: scarState.scars,
    scarHistory: scarState.scarHistory,
    npcs: structuredClone(char.npcs || {}),
    weaver: structuredClone(char.weaver),
    inventory: invClone,
    debts: structuredClone(char.debts || []),
    ...(eqClone !== undefined ? { equipped: eqClone } : {}),
    ...(char.craftWeapon !== undefined ? { craftWeapon: structuredClone(char.craftWeapon) } : {}),
    imbuedRelics: structuredClone(char.imbuedRelics || []),
    themes: { ...(char.themes || {}) },
    plan: structuredClone(char.plan || []),
    reserveAhn: char.reserveAhn || 0,
    bloodlineSeenEvents: [...(char.bloodlineSeenEvents || [])],
    seenEvents: [...char.seenEvents],
    openedDoors: [...(char.openedDoors || [])],
    visibleDoors: structuredClone(char.visibleDoors || []),
    doorsDecade: char.doorsDecade ?? null,
    childhoodMontage: char.childhoodMontage ? structuredClone(char.childhoodMontage) : null,
    ancestorLandmarks: structuredClone(char.ancestorLandmarks || []),
    ancestorBulletinsShown: char.ancestorBulletinsShown || 0,
    recent: [...(char.recent || [])],
    recentMishaps: [...(char.recentMishaps || [])],
    memory: [...(char.memory || [])],
    motifs: { ...(char.motifs || {}) },
    habits: { ...(char.habits || {}) },
    habitChallenges: structuredClone(char.habitChallenges || []),
    unlockedRecords: [...char.unlockedRecords],
    logs: [...char.logs],
    pendingBirthLogs: char.pendingBirthLogs ? [...char.pendingBirthLogs] : undefined
  };
  Object.defineProperties(copy, {
    health: { get() { return this.stats.health; }, enumerable: true },
    sanity: { get() { return this.stats.sanity; }, enumerable: true },
    wealth: { get() { return this.stats.wealth; }, enumerable: true },
    network: { get() { return this.stats.network; }, enumerable: true },
    rep: { get() { return this.stats.rep; }, enumerable: true }
  });
  return copy;
}
