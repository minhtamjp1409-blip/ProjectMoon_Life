const PERSONAL_EGO_RELIC = /^(?:Mảnh E\.G\.O|E\.G\.O fragment)\b/iu;

export const isPersonalEgoRelic = (relic) => typeof relic === 'string' && PERSONAL_EGO_RELIC.test(relic);

export function keepsakeForLife(life) {
  if (life?.ensembleScore) return { vi: 'Bản tổng phổ viết dở', en: 'The Unfinished Score' };
  if (life?.craftWeapon?.name) {
    return { vi: life.craftWeapon.name, en: life.craftWeapon.nameEn || life.craftWeapon.name };
  }
  const name = life?.name || 'người đi trước';
  if (life?.job === 'Color Fixer' || life?.flags?.includes('ColorFixer')) {
    return { vi: `Thẻ Fixer của ${name}`, en: `${name}'s Fixer license` };
  }
  if ((life?.age || 0) < 16) {
    return { vi: `Mảnh giấy ghi tên ${name}`, en: `A scrap bearing ${name}'s name` };
  }
  return { vi: `Cuốn sổ tay của ${name}`, en: `${name}'s notebook` };
}

const replaceRelic = (text, oldRelic, replacement) => typeof text === 'string'
  ? text.replaceAll(oldRelic, replacement)
  : text;

export function normalizeLegacyRecord(life) {
  if (!life || !isPersonalEgoRelic(life.relic)) return life;
  const keepsake = keepsakeForLife(life);
  const oldRelic = life.relic;
  const egoName = life.egoName || oldRelic.match(/「([^」]+)」/u)?.[1] || null;
  return {
    ...life,
    egoName,
    isEgoAncestor: true,
    relic: keepsake.vi,
    relicEn: keepsake.en,
    lifeStoryParagraphsVi: life.lifeStoryParagraphsVi?.map((line) => replaceRelic(line, oldRelic, keepsake.vi)),
    lifeStoryParagraphsEn: life.lifeStoryParagraphsEn?.map((line) => replaceRelic(line, oldRelic, keepsake.en))
  };
}

export function normalizeLegacyCharacter(char) {
  if (!char?.lineage || !isPersonalEgoRelic(char.lineage.relic)) return char;
  const oldRelic = char.lineage.relic;
  const keepsake = keepsakeForLife({
    name: char.lineage.parentName,
    age: char.lineage.parentAge,
    job: char.lineage.parentJob
  });
  const replaceLog = (log) => ({
    ...log,
    vi: replaceRelic(log.vi, oldRelic, keepsake.vi),
    en: replaceRelic(log.en, oldRelic, keepsake.en)
  });
  return {
    ...char,
    lineage: { ...char.lineage, relic: keepsake.vi, relicEn: keepsake.en },
    npcs: char.npcs && Object.fromEntries(Object.entries(char.npcs).map(([role, npc]) => [
      role,
      npc?.relic === oldRelic ? { ...npc, relic: keepsake.vi } : npc
    ])),
    logs: char.logs?.map(replaceLog),
    pendingBirthLogs: char.pendingBirthLogs?.map(replaceLog),
    inheritedEchoes: char.inheritedEchoes?.map((echo) => ({
      ...echo,
      labelVi: replaceRelic(echo.labelVi, oldRelic, keepsake.vi),
      labelEn: replaceRelic(echo.labelEn, oldRelic, keepsake.en)
    }))
  };
}
