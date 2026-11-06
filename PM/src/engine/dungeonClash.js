// ============================================================================
// CLASH: in a named fight (an elite, a boss, every floor of the Head's judgment), when the enemy
// commits to a heavy or quick blow, the player may meet it blade to blade instead of answering it.
// Both sides roll one die whose range is shown before the choice; the higher roll wins the beat.
// Before rolling, the player may stake one thing from their life to raise their die: a companion
// fighting at their side, an old scar remembered, or Ahn spent on a trick. One stake per fight.
//   win  : no damage, the guard breaks two notches and the enemy loses its next move
//   tie  : both recoil, no one is hurt
//   lose : the blow lands harder than if it had been answered
// A won beat also adds to what the fight pays when it is cleared, so a clash trades blood for loot.
// Balance reference points (see PROGRESS_LOG, Đợt 125): an unstaked clash against a boss is
// close to a coin flip, a staked one about seven in ten, so the stake is what makes it worth it.
// Every dungeon bends one rule, so a clash in the WARP train does not feel like one on the Great Lake.
// ============================================================================

import { appendNpcMemory } from '../data/npcPersonality.js';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export const CLASH_KINDS = ['heavy', 'quick'];
export const CLASH_BALANCE = {
  player: { lo: 1, hi: 6, masteryCap: 3 },
  loseTaken: 1,
  winBreaks: 2,
  // Each beat won pays this share more loot when the fight is cleared: the risk is taken for the haul
  winLoot: 0.2,
  perFight: { elite: 1, boss: 3, named: 2 },
  scarSanity: 4,
  scarLoseMult: 1.5,
  npcWinBond: 3,
  npcLoseBond: -8
};

/**
 * One profile per gauntlet. Enemy dice are given for a tier 4 fight and move one face per tier;
 * the twist is the one rule this dungeon bends.
 *   chaos    : every die rolls wider, both sides
 *   mind     : Sanity counts twice, steady or frayed
 *   feed     : a lost clash lets the enemy close one notch of its guard
 *   undertow : a tie goes to the enemy, at half the blow
 *   streets  : Ahn buys more here, and costs less
 *   judgment : the Head does not take money; a win breaks one notch more
 */
export const CLASH_PROFILES = {
  dungeon_warp_train: { enemy: [1, 6], twist: 'chaos', ahnCost: 8 },
  dungeon_lobotomy_ruin: { enemy: [1, 6], twist: 'mind', ahnCost: 8 },
  dungeon_bloodfiend_carnival: { enemy: [1, 6], twist: 'feed', ahnCost: 8 },
  dungeon_great_lake: { enemy: [1, 6], twist: 'undertow', ahnCost: 8 },
  dungeon_backstreets_night: { enemy: [1, 6], twist: 'streets', ahnCost: 5 },
  dungeon_claw_judgment: { enemy: [1, 7], twist: 'judgment', ahnCost: 0, allFloors: true }
};

export const TWIST_TEXT = {
  chaos: ['Trên chuyến tàu này mọi thứ đều lệch: cả hai viên xúc xắc lăn rộng hơn.', 'On this train everything runs wide: both dice roll farther.'],
  mind: ['Ở chi nhánh này, tâm trí quyết định cú ra đòn: Sanity tính gấp đôi.', 'In this branch the mind decides the swing: Sanity counts twice.'],
  feed: ['Thua một nhịp, nó uống máu bạn và khép lại một nấc thế thủ.', 'Lose a beat and it drinks your blood and closes a notch of guard.'],
  undertow: ['Trên mặt Hồ, hòa nghĩa là bị kéo đi: hòa tính là thua, đòn đau bằng nửa.', 'On the Lake a tie means being dragged: a tie counts as a loss, at half the blow.'],
  streets: ['Ở Backstreets tiền nói nhiều hơn: cược Ahn rẻ hơn và đáng hơn.', 'In the Backstreets money talks louder: staking Ahn costs less and buys more.'],
  judgment: ['Head không nhận tiền. Thắng một nhịp ở đây đánh vỡ thêm một nấc.', 'The Head takes no money. A beat won here breaks one notch more.']
};

export const profileOf = (dungeonId) => CLASH_PROFILES[dungeonId] || null;

const isNamedFloor = (profile, floor) => Boolean(floor && floor.kind !== 'rest' && (floor.kind === 'boss' || floor.elite || profile?.allFloors));
const fightCap = (profile, floor) => (floor.kind === 'boss' ? CLASH_BALANCE.perFight.boss : floor.elite ? CLASH_BALANCE.perFight.elite : CLASH_BALANCE.perFight.named);

/** Whether this turn of this fight allows a clash at all. */
export function clashOffered(session, intent) {
  const c = session?.combat;
  const profile = profileOf(session?.id);
  const floor = c?.plan?.[c.floor];
  if (!profile || !intent || !isNamedFloor(profile, floor)) return false;
  if (!CLASH_KINDS.includes(intent.kind) || c.sealed === 'strike') return false;
  return (c.clashes || 0) < fightCap(profile, floor);
}

export const clashesLeft = (session) => {
  const c = session.combat;
  return Math.max(0, fightCap(profileOf(session.id), c.plan[c.floor]) - (c.clashes || 0));
};

/** The stakes a life can put on the table right now, cheapest first. */
export function clashStakes(ctx, char, session) {
  const c = session.combat;
  const profile = profileOf(session.id);
  if (!profile || c.stakeUsed) return [];
  const out = [];
  const cost = profile.ahnCost;
  if (cost > 0 && !ctx.def(session).noRewards && (char.stats?.wealth ?? 0) >= cost) {
    const streets = profile.twist === 'streets';
    out.push({ id: 'ahn', lo: 1, hi: streets ? 3 : 2, cost });
  }
  // Reopening a scar costs Sanity; a mind that would break on the price is not offered it
  const scars = (char.scars || []).filter((s) => typeof s === 'string');
  if (scars.length && (char.stats?.sanity ?? 0) > CLASH_BALANCE.scarSanity) out.push({ id: 'scar', lo: 1, hi: 3, scar: scars.at(-1) });
  if (session.companion && ctx.companionActive(session)) out.push({ id: 'npc', lo: 2, hi: 2, companion: session.companion });
  return out;
}

/** The player's die for this clash, with a stake if one is placed. */
export function playerDie(ctx, char, session, stake = null) {
  const profile = profileOf(session.id);
  const P = CLASH_BALANCE.player;
  let lo = P.lo;
  let hi = P.hi + Math.min(P.masteryCap, Math.round(ctx.mastery(char, session).checkBonus * 10));
  const sp = char.stats?.sanity ?? 50;
  const mindTwice = profile?.twist === 'mind' ? 2 : 1;
  if (sp >= 70) lo += mindTwice;
  // A frayed mind swings wider, not better: the average stays, the spread grows
  else if (sp <= 30) { lo -= mindTwice; hi += mindTwice; }
  if (session.stance === 'reckless') { lo -= 1; hi += 1; } else if (session.stance === 'guarded') { lo += 1; hi -= 1; }
  if (session.egoActive) { lo += 2; hi += 2; }
  if (profile?.twist === 'chaos') { lo -= 1; hi += 1; }
  if (stake) { lo += stake.lo; hi += stake.hi; }
  lo = Math.max(1, lo);
  return [lo, Math.max(lo + 1, hi)];
}

/** The enemy's die: the dungeon's base, one face per tier from 4, one higher face in a second phase. */
export function enemyDie(session) {
  const c = session.combat;
  const profile = profileOf(session.id);
  const floor = c.plan[c.floor];
  const shift = (floor?.tier || 4) - 4;
  let [lo, hi] = profile.enemy;
  lo += shift; hi += shift;
  if (floor?.kind === 'boss' && c.phase === 2) hi += 1;
  if (profile.twist === 'chaos') { lo -= 1; hi += 1; }
  lo = Math.max(1, lo);
  return [lo, Math.max(lo + 1, hi)];
}

/** Exact odds of two uniform integer dice: [win, tie, lose]. */
export function clashOdds([alo, ahi], [blo, bhi]) {
  let win = 0;
  let tie = 0;
  const n = (ahi - alo + 1) * (bhi - blo + 1);
  for (let a = alo; a <= ahi; a++) {
    for (let b = blo; b <= bhi; b++) {
      if (a > b) win++;
      else if (a === b) tie++;
    }
  }
  return [win / n, tie / n, (n - win - tie) / n];
}

const rollDie = ([lo, hi], rng) => lo + Math.floor(rng() * (hi - lo + 1));

/** Share of the blow the player should expect from this clash, for the preview. */
export function expectedTaken(session, odds, stake) {
  const profile = profileOf(session.id);
  const [, tie, lose] = odds;
  const loseShare = CLASH_BALANCE.loseTaken * (stake?.id === 'scar' ? CLASH_BALANCE.scarLoseMult : 1);
  return lose * loseShare + (profile?.twist === 'undertow' ? tie * 0.5 : 0);
}

/**
 * Rolls one clash. Returns what the combat turn needs: the share of the blow taken, guard broken,
 * the outcome, both rolls, and whether the enemy loses its next move.
 */
export function rollClash(ctx, char, session, stake, rng) {
  const profile = profileOf(session.id);
  const mineDie = playerDie(ctx, char, session, stake);
  const theirDie = enemyDie(session);
  const mine = rollDie(mineDie, rng);
  const theirs = rollDie(theirDie, rng);
  let outcome = mine > theirs ? 'win' : mine === theirs ? 'tie' : 'lose';
  let taken = 0;
  let breaks = 0;
  if (outcome === 'tie' && profile.twist === 'undertow') { outcome = 'dragged'; taken = 0.5; }
  if (outcome === 'win') breaks = CLASH_BALANCE.winBreaks + (profile.twist === 'judgment' ? 1 : 0);
  if (outcome === 'lose') {
    taken = CLASH_BALANCE.loseTaken * (stake?.id === 'scar' ? CLASH_BALANCE.scarLoseMult : 1);
    if (profile.twist === 'feed') breaks = -1;
  }
  return { outcome, mine, theirs, mineDie, theirDie, taken, breaks, stagger: outcome === 'win' };
}

/** What a placed stake costs or gives back once the dice have landed. Mutates char and session. */
export function settleStake(ctx, char, session, stake, outcome) {
  if (!stake) return null;
  const won = outcome === 'win';
  if (stake.id === 'ahn') {
    char.stats.wealth = clamp((char.stats.wealth || 0) - stake.cost, 0, 100);
    return won
      ? { vi: `${stake.cost} Ahn mua được một ống thuốc kích và một góc đánh.`, en: `${stake.cost} Ahn bought a stimulant and an angle of attack.` }
      : { vi: `${stake.cost} Ahn đã tiêu, và không mua được gì.`, en: `${stake.cost} Ahn spent, and it bought nothing.` };
  }
  if (stake.id === 'scar') {
    char.stats.sanity = clamp((char.stats.sanity || 0) - CLASH_BALANCE.scarSanity, 0, 100);
    return won
      ? { vi: `Bạn nhớ lại lần mang về vết sẹo "${stake.scar}", và tay bạn biết phải đặt kiếm ở đâu.`, en: `You remember how you earned the scar "${stake.scar}", and your hands know where the blade goes.` }
      : { vi: `Ký ức về vết sẹo "${stake.scar}" kéo bạn chậm lại một nhịp, và vết cũ toác ra.`, en: `The memory of the scar "${stake.scar}" slows you by a beat, and the old wound tears open.` };
  }
  if (stake.id === 'npc') {
    const comp = stake.companion;
    const role = comp.role;
    if (won) {
      ctx.moveCompanionBond(char, comp, CLASH_BALANCE.npcWinBond);
      const npc = char.npcs?.[role];
      if (npc) {
        const memory = { age: char.age || 0, vi: `Năm ${char.age || 0} tuổi: cùng bạn ra một nhát quyết định trong ${ctx.def(session).titleVi}.`, en: `Age ${char.age || 0}: struck the deciding blow at your side in ${ctx.def(session).titleEn}.`, pinned: true };
        char.npcs = { ...char.npcs, [role]: { ...npc, memories: appendNpcMemory(npc.memories, memory) } };
      }
      return { vi: `${comp.nameVi} lao vào cùng lúc với bạn. Hai lưỡi đánh vào cùng một chỗ.`, en: `${comp.nameEn} goes in at the same moment you do. Two blades land in the same place.` };
    }
    ctx.moveCompanionBond(char, comp, CLASH_BALANCE.npcLoseBond);
    const npc = char.npcs?.[role];
    // Hurt, not lost: they sit out the next dungeon and endYear lets them walk again a year on
    if (npc && npc.status !== 'dead') char.npcs = { ...char.npcs, [role]: { ...npc, injured: true, injurySeverity: 'moderate', injuredAtAge: char.age || 0, healsAtAge: (char.age || 0) + 1 } };
    session.companion = null;
    return { vi: `${comp.nameVi} đỡ phần đòn trượt khỏi bạn và ngã xuống. Họ còn sống, nhưng phải rời khỏi đây.`, en: `${comp.nameEn} takes the part of the blow that slid off you and goes down. They live, but they have to leave.` };
  }
  return null;
}
