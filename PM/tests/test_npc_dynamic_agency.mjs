import assert from 'node:assert/strict';
import {
  ARCHETYPE_DUNGEON_PERKS,
  getNpcDungeonPerk,
  rollNpcCareer,
  ensureNpcAgency
} from '../src/data/npcPersonality.js';
import {
  canInteractWithNpc,
  executeNpcInteraction
} from '../src/engine/npcInteractions.js';
import { simulateNpcAutonomousLife } from '../src/engine/narrativeArcEngine.js';
import { createNewCharacter, buildLifeSummaryAndLegacy } from '../src/engine/gameEngine.js';
import {
  pickDungeonCompanion,
  createDungeonSession,
  resolveDungeonChoice,
  useDungeonSupply
} from '../src/engine/dungeonEngine.js';

console.log('--- Testing NPC Dynamic Agency & Interactive System ---');

// 1. Archetype Dungeon Perks mapping & agency enrichment
const rawNpc = {
  role: 'partner',
  nameVi: 'Roland',
  nameEn: 'Roland',
  archetype: 'veteran',
  bond: 35,
  questsDone: 2,
  status: 'alive'
};

const enriched = ensureNpcAgency(rawNpc, () => 0.5);
assert.equal(enriched.role, 'partner');
assert.ok(enriched.job, 'NPC must have a job');
assert.ok(enriched.district, 'NPC must operate in a district');
assert.ok(enriched.dungeonPerk, 'NPC must have a dungeon perk');
assert.equal(enriched.dungeonPerk.type, 'parry', 'Veteran must have combat parry perk');
assert.ok(Array.isArray(enriched.memories), 'NPC must have memories array');
assert.equal(enriched.debts.toPlayer, 0);

// 2. Interactive NPC Actions: canInteractWithNpc & executeNpcInteraction
const char = createNewCharacter({ seed: 'test-npc-agency', startAge: 22 });
char.npcs.partner = enriched;
char.stats.wealth = 20;
char.stats.health = 50;
char.stats.sanity = 40;

// Action A: Drink & Confide
const canDrink = canInteractWithNpc(char, 'partner', 'drink_confide');
assert.equal(canDrink.ok, true, 'Player with 20 Ahn can drink with partner');

const drinkRes = executeNpcInteraction(char, 'partner', 'drink_confide', () => 0.5);
assert.equal(drinkRes.success, true);
assert.equal(drinkRes.nextChar.stats.wealth, 16, 'Drinking should deduct 4 Ahn');
assert.equal(drinkRes.nextChar.stats.sanity, 50, 'Drinking should restore 10 Sanity');
assert.ok(drinkRes.nextChar.npcs.partner.bond > enriched.bond, 'Bond must increase');
assert.equal(drinkRes.nextChar.npcs.partner.memories.length, 1, 'Milestone memory must be recorded');

// Action B: Spar & Coordinate
const sparRes = executeNpcInteraction(drinkRes.nextChar, 'partner', 'spar_coordinate', () => 0.5);
assert.equal(sparRes.success, true);
assert.equal(sparRes.nextChar.stats.health, 48, 'Sparring costs 2 Health');
assert.ok(sparRes.nextChar.companionSynergy?.active, 'Sparring must activate companion synergy');
assert.equal(sparRes.nextChar.npcs.partner.memories.length, 2, 'Sparring memory must be recorded');

// Action C: Emergency Aid
// When partner has no crisis, emergency aid is denied
const aidCheckNoCrisis = canInteractWithNpc(sparRes.nextChar, 'partner', 'emergency_aid');
assert.equal(aidCheckNoCrisis.ok, false, 'Cannot aid when no crisis');

// Give partner a crisis
sparRes.nextChar.npcs.partner.crisis = {
  type: 'debt',
  severity: 85,
  labelVi: 'Nợ nóng sòng bạc J Corp',
  labelEn: 'J Corp Casino Debt'
};

const aidCheckWithCrisis = canInteractWithNpc(sparRes.nextChar, 'partner', 'emergency_aid');
assert.equal(aidCheckWithCrisis.ok, true, 'Can aid when crisis active and player has Ahn');

const aidRes = executeNpcInteraction(sparRes.nextChar, 'partner', 'emergency_aid', () => 0.5);
assert.equal(aidRes.success, true);
assert.equal(aidRes.nextChar.npcs.partner.crisis.severity, 0, 'Crisis severity must be wiped clean');
assert.equal(aidRes.nextChar.npcs.partner.debts.toPlayer, 1, 'Partner must owe 1 favor');
assert.equal(aidRes.nextChar.npcs.partner.bond, 65, 'Bond increases by 20 after aid');

// Action D: Call Favor
const favorCheck = canInteractWithNpc(aidRes.nextChar, 'partner', 'call_favor');
assert.equal(favorCheck.ok, true, 'Can call in favor when debts.toPlayer > 0');

// Test Wing employee favor (+35 HP)
aidRes.nextChar.npcs.partner.job = 'Wing Employee';
aidRes.nextChar.stats.health = 30;
const wingFavorRes = executeNpcInteraction(aidRes.nextChar, 'partner', 'call_favor', () => 0.5);
assert.equal(wingFavorRes.success, true);
assert.equal(wingFavorRes.nextChar.stats.health, 65, 'Wing favor heals 35 HP via K Corp ampule');
assert.equal(wingFavorRes.nextChar.npcs.partner.debts.toPlayer, 0, 'Favor must be consumed');

// 3. Autonomous Progression & Crisis Simulation
const autoChar = createNewCharacter({ seed: 'test-auto-agency', startAge: 25 });
autoChar.npcs.friend = {
  role: 'friend',
  nameVi: 'Dong-rang',
  nameEn: 'Dong-rang',
  archetype: 'ambitious',
  job: 'Wing Employee',
  rank: 1,
  rankLabelVi: 'K Corp Thử việc',
  rankLabelEn: 'K Corp Probationary',
  district: 'District 10',
  bond: 60,
  status: 'alive'
};

const logs = simulateNpcAutonomousLife(autoChar, () => 0.02);
assert.ok(Array.isArray(logs));
// Check if friend has enriched agency
assert.ok(autoChar.npcs.friend.dungeonPerk);
assert.ok(autoChar.npcs.friend.memories);

// 4. Dungeon Tag-Team Synergy (Parry & Shield)
// Test A: pickDungeonCompanion attaches perk
const dungChar = createNewCharacter({ seed: 'test-dung-companion', startAge: 26 });
dungChar.npcs.partner = {
  role: 'partner',
  nameVi: 'Gebura',
  nameEn: 'Gebura',
  archetype: 'loyal',
  bond: 80,
  status: 'alive'
};

const comp = pickDungeonCompanion(dungChar);
assert.ok(comp, 'Companion must be selected');
assert.equal(comp.role, 'partner');
assert.equal(comp.perk.type, 'shield', 'Loyal companion must have shield perk');

// Test B: Shield saves player from fatal damage
const session = createDungeonSession('dungeon_warp_train', dungChar);
dungChar.pendingDungeon = session;
dungChar.stats.health = 1; // 1 HP left

// Resolve choice 0 with fail roll
const dungRes = resolveDungeonChoice(dungChar, 0, () => 0.99);

// Shield should trigger!
assert.equal(dungRes.isFinished, false, 'Shield should prevent death');
assert.equal(dungRes.char.stats.health, 5, 'Player should be left at 5 HP by shield intervention');
assert.equal(dungRes.char.npcs.partner.status, 'wounded', 'Companion should become wounded after shielding');
assert.ok(dungRes.session.companionShieldUsed, 'Shield flag must be marked used');

// 5. Cross-Generational Lineage & Legacy Connection
const fallenAncestor = createNewCharacter({ seed: 'test-ancestor', startAge: 48 });
fallenAncestor.name = 'Old Fixer Roland';
fallenAncestor.npcs = {
  partner: { role: 'partner', nameVi: 'Angelica', nameEn: 'Angelica', status: 'alive', bond: 90 },
  nemesis: { role: 'nemesis', nameVi: 'Argalia', nameEn: 'Argalia', status: 'alive', bond: 0 }
};

const summary = buildLifeSummaryAndLegacy(fallenAncestor);
assert.ok(summary.npcs, 'Summary must preserve NPCs for successor inheritance');
assert.ok(summary.npcs.nemesis, 'Nemesis must be preserved');

// Create successor apprentice
const apprenticeSuccessor = createNewCharacter({
  seed: 'test-apprentice-heir',
  parentLegacy: {
    ...summary,
    successorRelation: 'apprentice'
  }
});

assert.ok(apprenticeSuccessor.npcs.mentor, 'Apprentice must inherit surviving comrade as mentor');
assert.equal(apprenticeSuccessor.npcs.mentor.nameVi, 'Angelica');
assert.ok(apprenticeSuccessor.npcs.nemesis, 'Successor must inherit active nemesis');
assert.equal(apprenticeSuccessor.npcs.nemesis.nameVi, 'Argalia');
assert.ok(apprenticeSuccessor.npcs.nemesis.memories[0].vi.includes('Thừa kế mối thù'));

// 6. Leadership Subordinate Delegation & Cross-Route Mentee Progression
import { affiliationYearTick } from '../src/engine/affiliation.js';
import { resolveEventChoice, ALL_STORY_EVENTS } from '../src/engine/gameEngine.js';

const wingLeader = createNewCharacter({ seed: 'test-wing-leader', startAge: 32 });
wingLeader.job = 'Wing Employee';
wingLeader.wingRank = 2;
wingLeader.standing = 50;
wingLeader.heat = 30;
wingLeader.stats.wealth = 40;

// Tick affiliationYearTick with low rng to plant aff_mentee_wing
affiliationYearTick(wingLeader, () => 0.1);
assert.ok(
  wingLeader.weaver.pendingThreads.some((t) => t.eventId === 'aff_mentee_wing'),
  'Wing Rank 2+ leader should be offered a junior Feather mentee via aff_mentee_wing'
);

// Resolve aff_mentee_wing choice 0 (accept attaché)
const wingMenteeEvent = ALL_STORY_EVENTS.find((e) => e.id === 'aff_mentee_wing');
assert.ok(wingMenteeEvent, 'aff_mentee_wing must exist in ALL_STORY_EVENTS');
wingLeader.pendingEvent = wingMenteeEvent;
const afterMenteeAccept = resolveEventChoice(wingLeader, 0, () => 0.5);
assert.ok(afterMenteeAccept.flags.includes('Mentoring'), 'Wing leader should gain Mentoring flag');
assert.ok(afterMenteeAccept.npcs.mentee, 'Wing leader should gain mentee NPC');
assert.equal(afterMenteeAccept.npcs.mentee.job, 'Wing Employee', 'Wing mentee job should align with Wing Employee');

// Test delegate_command (clean run first at age 32, then fallout at age 33)
const canDelegate = canInteractWithNpc(afterMenteeAccept, 'mentee', 'delegate_command');
assert.equal(canDelegate.ok, true, 'Wing Rank 2 leader can delegate organizational task to mentee');

const cleanDel = executeNpcInteraction(afterMenteeAccept, 'mentee', 'delegate_command', () => 0.8);
assert.equal(cleanDel.success, true);
assert.equal(cleanDel.nextChar.merit, (afterMenteeAccept.merit || 0) + 6, 'Delegation grants +6 Merit');
assert.equal(cleanDel.nextChar.heat, 20, 'Delegation reduces Heat by 10');
assert.equal(cleanDel.nextChar.npcs.mentee.bond, 44, 'Delegation costs 6 Bond');

// Cooldown check in same year
const sameYearDelegate = canInteractWithNpc(cleanDel.nextChar, 'mentee', 'delegate_command');
assert.equal(sameYearDelegate.ok, false, 'Cannot delegate twice in the same year');

// Next year fallout roll (< 0.35) plants aff_subordinate_reckoning
cleanDel.nextChar.age = 33;
const falloutDel = executeNpcInteraction(cleanDel.nextChar, 'mentee', 'delegate_command', () => 0.1);
assert.equal(falloutDel.success, true);
assert.ok(falloutDel.nextChar.npcs.mentee.crisis.severity > 0, 'Fallout inflicts acute crisis on mentee');
assert.ok(
  falloutDel.nextChar.weaver.pendingThreads.some((t) => t.eventId === 'aff_subordinate_reckoning'),
  'Fallout on mentee plants aff_subordinate_reckoning thread'
);

console.log('All NPC Dynamic Agency & Interactive tests passed successfully!');
