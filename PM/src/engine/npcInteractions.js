// ============================================================================
// NPC INTERACTION ENGINE
// Direct interactive agency between player and living companions:
// 1. Drink & Confide (Uống rượu giãi bày)
// 2. Spar & Coordinate (Luyện tập phối hợp)
// 3. Emergency Aid / Rescue (Cứu viện hoạn nạn)
// 4. Call In A Favor (Nhờ cậy đặc quyền)
// ============================================================================

import { npcIsActive } from './eventConditions.js';
import { bondCapFor, ensureNpcAgency } from '../data/npcPersonality.js';
import { plantThread } from './affiliation.js';

export function isFactionLeader(char) {
  if (!char) return false;
  const flags = char.flags || [];
  if (char.job === 'Color Fixer' || char.fixerGrade === 0 || flags.includes('ColorFixer')) return true;
  if (char.job === 'Fixer' && ((char.fixerGrade ?? 9) <= 2 || flags.includes('AssocDirector') || flags.includes('OwnFixerOffice'))) return true;
  if (char.job === 'Wing Employee' && (char.wingRank || 0) >= 2) return true;
  if (char.job === 'Syndicate' && (char.fingerRank || 0) >= 2) return true;
  return false;
}

export const NPC_INTERACTION_ACTIONS = [
  {
    id: 'drink_confide',
    nameVi: 'Uống rượu giãi bày',
    nameEn: 'Drink & Confide',
    descVi: 'Mời một chầu rượu rẻ ở quán ngõ hẻm, lắng nghe tâm tư và xoa dịu áp lực đè nặng trong lòng.',
    descEn: 'Share cheap drinks in an alley tavern, easing their hidden burdens and listening to their story.',
    costAhn: 4,
    cooldownYears: 1
  },
  {
    id: 'spar_coordinate',
    nameVi: 'Luyện kiếm hiệp lực',
    nameEn: 'Spar & Coordinate',
    descVi: 'Giao đấu đối luyện thực chiến để thấu hiểu thói quen ra đòn, gia tăng độ ăn ý khi xuống hầm ngục.',
    descEn: 'Cross blades in practical sparring, honing battlefield synergy for dungeon expeditions.',
    costHp: 2,
    cooldownYears: 1
  },
  {
    id: 'emergency_aid',
    nameVi: 'Cứu viện hoạn nạn',
    nameEn: 'Emergency Aid',
    descVi: 'Chi trả tiền bạc hoặc dùng uy tín can thiệp để giải quyết khủng hoảng sinh tử đang bóp nghẹt họ.',
    descEn: 'Pay Ahn or spend reputation to resolve the life-or-death crisis crushing them.',
    costAhn: 15,
    costRep: 8
  },
  {
    id: 'call_favor',
    nameVi: 'Nhờ cậy đặc quyền',
    nameEn: 'Call In A Favor',
    descVi: 'Nhờ vả ân nghĩa để họ tận dụng vị trí trong Wing, Syndicate hoặc mạng lưới Fixer giúp đỡ bạn.',
    descEn: 'Call in owed gratitude, leveraging their rank in a Wing, Syndicate, or Fixer network to aid you.'
  },
  {
    id: 'delegate_command',
    nameVi: 'Ủy thác việc tổ chức',
    nameEn: 'Delegate Faction Task',
    descVi: 'Giao phần việc gai góc của tổ chức cho cấp dưới/cộng sự gánh vác (+6 Merit, +6 Ahn, -10 Heat, nhưng giảm 6 Gắn kết và có 35% rủi ro họ gặp nguy biến).',
    descEn: 'Assign a hazardous organizational task to your subordinate or partner (+6 Merit, +6 Ahn, -10 Heat, costs 6 Bond with a 35% risk of acute crisis).',
    cooldownYears: 1
  }
];

export function canInteractWithNpc(char, role, actionId) {
  if (!char || !role) return { ok: false, reasonVi: 'Nhân vật không hợp lệ', reasonEn: 'Invalid character' };
  const rawNpc = char.npcs?.[role];
  if (!rawNpc || !npcIsActive(rawNpc)) {
    return { ok: false, reasonVi: 'Người này không còn hiện diện trong đời bạn', reasonEn: 'This person is no longer in your life' };
  }
  const npc = ensureNpcAgency(rawNpc);
  const wealth = char.stats?.wealth ?? char.wealth ?? 0;
  const rep = char.stats?.rep ?? char.rep ?? 0;
  const hp = char.stats?.health ?? char.health ?? 50;

  if (actionId === 'drink_confide') {
    if (wealth < 4) {
      return { ok: false, reasonVi: 'Không đủ Ahn trả tiền rượu (cần 4 Ahn)', reasonEn: 'Not enough Ahn for drinks (need 4 Ahn)' };
    }
    return { ok: true };
  }

  if (actionId === 'spar_coordinate') {
    if (!['partner', 'mentor', 'mentee', 'friend', 'rival'].includes(role)) {
      return { ok: false, reasonVi: 'Người này không phải chiến hữu để đối luyện', reasonEn: 'This person is not a combat partner' };
    }
    if (hp <= 5) {
      return { ok: false, reasonVi: 'Thể lực quá kiệt quệ để giao đấu', reasonEn: 'Too exhausted to spar' };
    }
    return { ok: true };
  }

  if (actionId === 'emergency_aid') {
    const hasCrisis = npc.crisis && npc.crisis.severity > 0 && npc.crisis.type !== 'none';
    if (!hasCrisis) {
      return { ok: false, reasonVi: 'Họ không gặp khủng hoảng nào cần cứu viện lúc này', reasonEn: 'They currently face no acute crisis' };
    }
    if (wealth < 15 && rep < 8) {
      return { ok: false, reasonVi: 'Cần ít nhất 15 Ahn hoặc 8 Danh tiếng để can thiệp', reasonEn: 'Need at least 15 Ahn or 8 Rep to intervene' };
    }
    return { ok: true };
  }

  if (actionId === 'call_favor') {
    const hasDebt = (npc.debts?.toPlayer || 0) > 0;
    const isSworn = (npc.bond || 0) >= 70;
    if (!hasDebt && !isSworn) {
      return { ok: false, reasonVi: 'Họ không nợ ân huệ của bạn và chưa đủ gắn kết (cần 70 Gắn bó)', reasonEn: 'They owe no favors and bond is not yet sworn (need 70 Bond)' };
    }
    return { ok: true };
  }

  if (actionId === 'delegate_command') {
    if (!['mentee', 'partner'].includes(role)) {
      return { ok: false, reasonVi: 'Chỉ có thể ủy thác việc tổ chức cho Đệ tử hoặc Cộng sự tác chiến', reasonEn: 'Only a Mentee or Combat Partner can be delegated organizational tasks' };
    }
    if (!isFactionLeader(char)) {
      return { ok: false, reasonVi: 'Cần giữ vị trí chỉ huy (Grade 2+, Chủ Office, Director, Wing Rank 2+, hoặc Finger Rank 2+)', reasonEn: 'Requires command rank (Grade 2+, Office Owner, Director, Wing Rank 2+, or Finger Rank 2+)' };
    }
    if (npc.status === 'wounded' || (npc.crisis && npc.crisis.severity > 0 && npc.crisis.type !== 'none')) {
      return { ok: false, reasonVi: 'Họ đang mang thương tích hoặc khủng hoảng, không thể gánh thêm lệnh ủy thác', reasonEn: 'They are wounded or in crisis and cannot take on another assignment' };
    }
    if ((npc.bond || 0) < 35) {
      return { ok: false, reasonVi: 'Mức gắn kết quá thấp để giao việc nhạy cảm (cần 35 Gắn kết)', reasonEn: 'Bond too low to entrust sensitive operations (need 35 Bond)' };
    }
    if (npc.lastDelegatedAge === char.age) {
      return { ok: false, reasonVi: 'Bạn đã ủy thác nhiệm vụ cho họ trong năm nay rồi', reasonEn: 'You have already delegated an operation to them this year' };
    }
    return { ok: true };
  }

  return { ok: false, reasonVi: 'Hành động không xác định', reasonEn: 'Unknown action' };
}

export function executeNpcInteraction(char, role, actionId, rng = Math.random) {
  const check = canInteractWithNpc(char, role, actionId);
  if (!check.ok) {
    return { success: false, reasonVi: check.reasonVi, reasonEn: check.reasonEn, nextChar: char };
  }

  const nextChar = JSON.parse(JSON.stringify(char));
  nextChar.stats = nextChar.stats || {};
  let npc = ensureNpcAgency(nextChar.npcs[role], rng);
  const name = npc.nameVi || npc.nameEn;
  const cap = bondCapFor(npc);
  const age = nextChar.age || 0;
  let log = null;

  if (actionId === 'drink_confide') {
    nextChar.stats.wealth = Math.max(0, (nextChar.stats.wealth || 0) - 4);
    nextChar.stats.sanity = Math.min(100, (nextChar.stats.sanity || 50) + 10);
    const newBond = Math.min(cap, (npc.bond || 30) + 6);
    npc.bond = newBond;

    // Relieve crisis if any
    if (npc.crisis && npc.crisis.severity > 0) {
      npc.crisis.severity = Math.max(0, npc.crisis.severity - 25);
      if (npc.crisis.severity === 0) npc.crisis.type = 'none';
    }

    const memoryTextVi = `Năm ${age} tuổi: Cùng uống rượu giãi bày tại quán trọ Backstreets.`;
    const memoryTextEn = `Age ${age}: Shared deep drinks and confessions at a Backstreet tavern.`;
    npc.memories = [...(npc.memories || []), { age, vi: memoryTextVi, en: memoryTextEn }].slice(-6);

    log = {
      vi: `[Tri kỷ giãi bày] Bạn cùng ${name} ngồi bên chiếc bàn gỗ ẩm mốc ở quán rượu Backstreets. Men rượu cay xua tan giá lạnh; ${name} kể cho bạn nghe về 「${npc.wantVi || 'ước vọng sống còn'}」 và nỗi sợ 「${npc.fearVi || 'tiếng còi nửa đêm'}」. Lòng bạn nhẹ nhõm hơn nhiều. (+10 Sanity, +6 Gắn kết)`,
      en: `[Confiding in Drinks] You sat with ${npc.nameEn} over a damp wooden table in a Backstreet tavern. Cheap liquor thawed the frost; ${npc.nameEn} spoke of longing for "${npc.wantEn || 'survival'}" and fearing "${npc.fearEn || 'midnight sirens'}". Your mind feels far clearer. (+10 Sanity, +6 Bond)`
    };
  } else if (actionId === 'spar_coordinate') {
    nextChar.stats.health = Math.max(1, (nextChar.stats.health || 50) - 2);
    npc.bond = Math.min(cap, (npc.bond || 30) + 4);
    nextChar.companionSynergy = {
      active: true,
      role,
      nameVi: npc.nameVi,
      nameEn: npc.nameEn,
      perk: npc.dungeonPerk,
      year: age
    };

    const memoryTextVi = `Năm ${age} tuổi: Đối luyện thực chiến ăn ý, thấu hiểu từng đường đao mũi kiếm.`;
    const memoryTextEn = `Age ${age}: Sharpened combat poise and mutual instincts in sparring.`;
    npc.memories = [...(npc.memories || []), { age, vi: memoryTextVi, en: memoryTextEn }].slice(-6);

    log = {
      vi: `[Luyện kiếm hiệp lực] Lưỡi thép va vào nhau chan chát trong con hẻm cụt. ${name} đọc được nhịp thở và cách chuyển trọng tâm của bạn, cả hai ăn ý đến mức không cần nhìn cũng biết đối phương bọc lót ở đâu. Kích hoạt hiệu ứng Hiệp lực Hầm ngục cho mùa săn này! (-2 HP, +4 Gắn kết)`,
      en: `[Combat Poise] Steel clashed in the dead-end alley. ${npc.nameEn} read your footwork and breathing shifts; the two of you moved in fluid synchronization. Companion Dungeon Synergy activated for this season! (-2 HP, +4 Bond)`
    };
  } else if (actionId === 'emergency_aid') {
    const costWealth = (nextChar.stats.wealth || 0) >= 15;
    if (costWealth) {
      nextChar.stats.wealth -= 15;
    } else {
      nextChar.stats.rep = Math.max(0, (nextChar.stats.rep || 0) - 8);
    }

    const oldCrisisLabel = npc.crisis?.labelVi || 'cơn bĩ cực';
    npc.crisis = { type: 'none', severity: 0, labelVi: '', labelEn: '' };
    npc.debts = npc.debts || {};
    npc.debts.toPlayer = (npc.debts.toPlayer || 0) + 1;
    npc.bond = Math.min(100, (npc.bond || 30) + 20);

    const memoryTextVi = `Năm ${age} tuổi: Bạn ra tay cứu mạng, giải quyết món nợ sinh tử bóp nghẹt họ.`;
    const memoryTextEn = `Age ${age}: You stepped in and saved their life from a crushing crisis.`;
    npc.memories = [...(npc.memories || []), { age, vi: memoryTextVi, en: memoryTextEn }].slice(-6);

    log = {
      vi: `[Cứu viện sinh tử] Bạn đứng ra dàn xếp dứt điểm ${oldCrisisLabel} cho ${name}. Nhìn món nợ bị xé toạc trước mắt, ${name} nắm chặt tay bạn, ánh mắt trĩu nặng ơn nghĩa thề sẽ đền đáp bằng cả mạng sống nếu có ngày bạn cần. (+20 Gắn kết, Nợ ân huệ +1)`,
      en: `[Mortal Salvation] You settled ${npc.nameEn}'s crisis once and for all. Watching the death warrant torn in half, ${npc.nameEn} gripped your hand tightly, swearing a debt of blood and honor whenever you call. (+20 Bond, Owed Favor +1)`
    };
  } else if (actionId === 'call_favor') {
    if ((npc.debts?.toPlayer || 0) > 0) {
      npc.debts.toPlayer -= 1;
    } else {
      npc.bond = Math.max(0, (npc.bond || 0) - 6);
    }

    let rewardVi = '';
    let rewardEn = '';
    const job = npc.job || 'Civilian';

    if (job === 'Wing Employee') {
      nextChar.stats.health = Math.min(100, (nextChar.stats.health || 50) + 35);
      rewardVi = `${name} bí mật tuồn cho bạn một ống tiêm tinh chất phục hồi sinh học K Corp, chữa lành các vết rách trên cơ thể. (+35 HP)`;
      rewardEn = `${npc.nameEn} smuggled a classified K Corp regenerative ampule to you, sewing together deep tissue tears. (+35 HP)`;
    } else if (job === 'Syndicate') {
      nextChar.heat = Math.max(0, (nextChar.heat || 0) - 25);
      rewardVi = `${name} liên hệ các đầu nậu của Ngón tay để xóa tên bạn khỏi danh sách truy quét ngầm. (-25 Heat)`;
      rewardEn = `${npc.nameEn} leveraged Finger contacts to scratch your name off backstreet hit-lists. (-25 Heat)`;
    } else if (job === 'Fixer') {
      nextChar.stats.network = Math.min(100, (nextChar.stats.network || 0) + 14);
      nextChar.stats.rep = Math.min(100, (nextChar.stats.rep || 0) + 10);
      nextChar.merit = (nextChar.merit || 0) + 4;
      rewardVi = `${name} chia sẻ hồ sơ tình báo nội bộ của Hiệp hội, giúp bạn mở rộng tầm ảnh hưởng và uy tín. (+14 Mạng lưới, +10 Rep, +4 Merit)`;
      rewardEn = `${npc.nameEn} shared classified Association dossiers, broadening your reach and standing. (+14 Network, +10 Rep, +4 Merit)`;
    } else {
      nextChar.stats.sanity = Math.min(100, (nextChar.stats.sanity || 50) + 15);
      nextChar.stats.health = Math.min(100, (nextChar.stats.health || 50) + 8);
      rewardVi = `${name} mở cửa căn hầm bí mật an toàn cho bạn trú ẩn qua đêm, tránh xa mọi cặp mắt dò xét. (+15 Sanity, +8 HP)`;
      rewardEn = `${npc.nameEn} sheltered you in a secluded cellar sanctuary, safe from prying eyes. (+15 Sanity, +8 HP)`;
    }

    const memoryTextVi = `Năm ${age} tuổi: Đền đáp ân nghĩa, tương trợ bạn trong cơn bĩ cực.`;
    const memoryTextEn = `Age ${age}: Repaid their debt of honor, aiding you in your hour of need.`;
    npc.memories = [...(npc.memories || []), { age, vi: memoryTextVi, en: memoryTextEn }].slice(-6);

    log = {
      vi: `[Đền đáp ân nghĩa] Bạn liên lạc với ${name} yêu cầu sự trợ giúp. Không một lời từ chối, ${rewardVi}`,
      en: `[Calling the Debt] You called upon ${npc.nameEn} for aid. Without hesitation, ${rewardEn}`
    };
  } else if (actionId === 'delegate_command') {
    npc.lastDelegatedAge = age;
    npc.bond = Math.max(0, (npc.bond || 40) - 6);
    nextChar.merit = (nextChar.merit || 0) + 6;
    nextChar.stats.wealth = Math.min(100, (nextChar.stats.wealth || 0) + 6);
    nextChar.heat = Math.max(0, (nextChar.heat || 0) - 10);
    if (nextChar.job === 'Wing Employee' && nextChar.standing != null) {
      nextChar.standing = Math.min(100, nextChar.standing + 5);
    }
    if (nextChar.affiliation) {
      nextChar.affiliation.standing = Math.min(100, (nextChar.affiliation.standing || 50) + 4);
    }
    if (role === 'mentee' && nextChar.mentee) {
      nextChar.mentee.progress = Math.min(99, (nextChar.mentee.progress || 0) + 12);
    }

    const sufferedFallout = rng() < 0.35;
    if (sufferedFallout) {
      npc.crisis = {
        type: 'ambush',
        severity: 45,
        labelVi: 'Thương tích & rắc rối khi gánh lệnh ủy thác thay bạn',
        labelEn: 'Wounded & audited carrying out your delegated order'
      };
      if (role === 'mentee') {
        plantThread(
          nextChar,
          'aff_subordinate_reckoning',
          1,
          'Cấp dưới trở về với thương tích sau lệnh ủy thác của bạn',
          'Your subordinate returns wounded from the task you delegated'
        );
      } else if (role === 'partner') {
        plantThread(
          nextChar,
          'aff_partner_reckoning',
          1,
          'Cộng sự trở về với thương tích sau lệnh ủy thác của bạn',
          'Your partner returns wounded from the task you delegated'
        );
      }
      const memoryTextVi = `Năm ${age} tuổi: Gánh phần việc nguy hiểm do bạn ủy thác và bị thương nặng.`;
      const memoryTextEn = `Age ${age}: Carried out a hazardous task you delegated and suffered heavy fallout.`;
      npc.memories = [...(npc.memories || []), { age, vi: memoryTextVi, en: memoryTextEn }].slice(-6);

      log = {
        vi: `[Ủy thác trả giá đắt] Bạn giao phần việc gai góc của tổ chức cho ${name} xử lý. Nhiệm vụ hoàn tất trót lọt, hồ sơ của bạn sạch dấu vết, nhưng ${name} rơi vào ổ phục kích và đang lâm vào khủng hoảng cần cứu viện. (+6 Merit, +6 Ahn, -10 Heat, -6 Gắn kết · Cảnh báo khủng hoảng)`,
        en: `[Costly Delegation] You assigned a thorny organizational operation to ${npc.nameEn}. The task succeeded and your ledger stays clean, but ${npc.nameEn} walked into an ambush and now faces an acute crisis. (+6 Merit, +6 Ahn, -10 Heat, -6 Bond · Crisis Alert)`
      };
    } else {
      const memoryTextVi = `Năm ${age} tuổi: Thay mặt bạn giải quyết gọn gàng công việc của tổ chức.`;
      const memoryTextEn = `Age ${age}: Handled a sensitive organizational operation on your behalf.`;
      npc.memories = [...(npc.memories || []), { age, vi: memoryTextVi, en: memoryTextEn }].slice(-6);

      log = {
        vi: `[Ủy thác việc tổ chức] ${name} thay mặt bạn đứng mũi chịu sào xử lý êm thấm phần việc nhạy cảm của tổ chức, mang về cả chiến công lẫn lợi tức mà không để lại dấu vết trên hồ sơ của bạn. (+6 Merit, +6 Ahn, -10 Heat, -6 Gắn kết)`,
        en: `[Delegated Operation] ${npc.nameEn} handled a sensitive organizational assignment in your stead, securing both Merit and profit while keeping your own hands clean. (+6 Merit, +6 Ahn, -10 Heat, -6 Bond)`
      };
    }
  }

  nextChar.npcs[role] = npc;
  if (log) {
    nextChar.logs = [...(nextChar.logs || []), log];
  }

  return {
    success: true,
    log,
    nextChar
  };
}
