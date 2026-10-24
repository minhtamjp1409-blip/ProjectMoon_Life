// A prototype of the tactic hand, switched on per dungeon (`cards: true`). Each stage you hold three cards drawn from a
// small deck and may play one before choosing. A card changes the next stage only and goes to the discard; when the pile
// runs dry the discard is shuffled back. Every card has a price, so playing nothing is a real answer.

const fnv = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619) >>> 0;
  return h;
};

export const DUNGEON_CARDS = {
  read_blow: { vi: 'Đọc đòn', en: 'Read the Blow', textVi: 'Dò đường dễ hơn 12 điểm phần trăm.', textEn: 'Checks are 12 points easier.', check: 0.12 },
  steady: { vi: 'Giữ nhịp', en: 'Keep Steady', textVi: 'Thương tổn nhận vào giảm một phần tư.', textEn: 'Damage taken drops by a quarter.', damage: 0.75 },
  blood: { vi: 'Đánh đổi máu', en: 'Trade Blood', textVi: 'Mất 6 HP ngay. Dò đường dễ hơn 10 điểm, phần thưởng thêm 30%.', textEn: 'Lose 6 HP now. Checks 10 points easier, rewards 30% larger.', check: 0.10, reward: 1.3, now: { health: -6 } },
  greed: { vi: 'Mắt tham', en: 'Greedy Eye', textVi: 'Loot thêm một nửa, nhưng dò đường khó hơn 6 điểm.', textEn: 'Loot half again as large, but checks 6 points harder.', check: -0.06, loot: 1.5 },
  ego: { needsEgo: true, vi: 'Khai mở E.G.O', en: 'Open the E.G.O', textVi: 'Mất 8 SP ngay, thêm 4 Resonance. Dò đường và né dễ hơn 22 điểm, thương tổn giảm 40%.', textEn: 'Lose 8 SP now, gain 4 Resonance. Checks and dodges 22 points easier, damage down 40%.', check: 0.22, damage: 0.6, now: { sanity: -8, resonance: 4 } },
  second: { vi: 'Hơi thở thứ hai', en: 'Second Wind', textVi: 'Hồi 8 HP và 4 SP ngay. Không đổi gì ở chặng này.', textEn: 'Heal 8 HP and 4 SP now. Changes nothing about this stage.', now: { health: 8, sanity: 4 } },
  cold: { vi: 'Đếm lạnh', en: 'Cold Count', textVi: 'Quét chặng này miễn phí, không tốn tiếp tế.', textEn: 'Scan this stage for free, no supply spent.', scan: true },
  wall: { vi: 'Dựng thế thủ', en: 'Raise the Wall', textVi: 'Thương tổn lượt này giảm 40%, nhưng đòn của bạn không phá được thế của nó.', textEn: 'Damage this turn drops 40%, but your blows cannot break its stance.', damage: 0.6, noBreak: true, combatOnly: true },
  slip: { vi: 'Bước lướt', en: 'Slip Step', textVi: 'Né dễ hơn 25 điểm, nhưng nếu né hụt thì đòn trúng nặng thêm một phần mười.', textEn: 'Evading is 25 points easier, but a missed dodge lands a tenth heavier.', evade: 0.25, missMult: 1.1, combatOnly: true },
  riposte: { vi: 'Bắt nhịp', en: 'Catch the Beat', textVi: 'Phản công phá thêm một nhịp thế của nó, nhưng mọi đòn nhận vào nặng hơn một phần tư.', textEn: 'A strike breaks one more beat of its stance, but every blow you take is a quarter heavier.', breaks: 1, damage: 1.25, combatOnly: true },
  time_stop: { vi: 'Dừng một giây', en: 'Stop One Second', textVi: 'Đòn của nó trượt qua bạn lượt này, nhưng đòn của bạn cũng không phá được thế. Thêm 10 áp lực.', textEn: 'Its blow slides past you this turn, but yours cannot break its stance either. Adds 10 strain.', damage: 0.1, noBreak: true, now: { strain: 10 }, theme: 'warp', combatOnly: true },
  lcorp_log: { vi: 'Sổ ghi chép nhân viên', en: 'Staff Field Notes', textVi: 'Né dễ hơn 15 điểm, thương tổn giảm một phần tám. Mất 4 SP vì phải đọc lại những gì đã xảy ra với người trước.', textEn: 'Evading is 15 points easier, damage down an eighth. Lose 4 SP rereading what happened to those before you.', evade: 0.15, damage: 0.88, now: { sanity: -4 }, theme: 'lcorp', combatOnly: true },
  lcorp_lockdown: { vi: 'Kích hoạt phong tỏa', en: 'Trigger Lockdown', textVi: 'Thương tổn giảm một nửa, nhưng đòn của bạn không phá được thế. Thêm 8 áp lực.', textEn: 'Damage is halved, but your blows cannot break its stance. Adds 8 strain.', damage: 0.5, noBreak: true, now: { strain: 8 }, theme: 'lcorp', combatOnly: true },
  blood_toast: { vi: 'Chén máu mời', en: 'The Offered Cup', textVi: 'Hồi 10 HP ngay, mất 6 SP vì vị của nó.', textEn: 'Heal 10 HP now, lose 6 SP to the taste.', now: { health: 10, sanity: -6 }, theme: 'blood', combatOnly: true },
  blood_mask: { vi: 'Đeo mặt nạ dạ hội', en: 'Wear the Masquerade Mask', textVi: 'Né dễ hơn 10 điểm, thương tổn giảm một phần năm. Mất 3 SP vì không còn nhìn thấy mặt mình.', textEn: 'Evading is 10 points easier, damage down a fifth. Lose 3 SP at not seeing your own face.', evade: 0.10, damage: 0.8, now: { sanity: -3 }, theme: 'blood', combatOnly: true },
  alley_run: { vi: 'Đường tắt của Backstreets', en: 'The Backstreets Shortcut', textVi: 'Né dễ hơn 20 điểm, loot thêm một phần năm.', textEn: 'Evading is 20 points easier, loot a fifth larger.', evade: 0.20, loot: 1.2, theme: 'alley', combatOnly: true },
  alley_knife: { vi: 'Con dao giấu trong ủng', en: 'The Knife in the Boot', textVi: 'Phản công phá thêm một nhịp thế, nhưng mọi đòn nhận vào nặng hơn 7%. Loot thêm 7%.', textEn: 'A strike breaks one more beat of its stance, but every blow you take is 7% heavier. Loot 7% larger.', breaks: 1, damage: 1.07, loot: 1.07, theme: 'alley', combatOnly: true },
  bluff: { vi: 'Giả điềm tĩnh', en: 'Feigned Calm', textVi: 'Dò đường dễ hơn 8 điểm, thương tổn giảm một phần mười.', textEn: 'Checks 8 points easier, damage down a tenth.', check: 0.08, damage: 0.9 }
};

const COMBAT_STARTER = ['wall', 'wall', 'slip', 'slip', 'riposte', 'riposte', 'steady', 'cold', 'second', 'ego'];
// Each fighting dungeon swaps two plain cards for two that belong to its own danger
const THEMED = {
  warp: ['time_stop', 'steady'],
  lcorp: ['lcorp_log', 'lcorp_lockdown'],
  blood: ['blood_toast', 'blood_mask'],
  alley: ['alley_run', 'alley_knife']
};
// Slots 5 and 6 of the fighting deck (the second Catch the Beat and Keep Steady) are the ones given up
const THEME_SLOTS = [5, 6];
const themeOf = (session) => ({ dungeon_warp_train: 'warp', dungeon_lobotomy_ruin: 'lcorp', dungeon_bloodfiend_carnival: 'blood', dungeon_backstreets_night: 'alley' })[session.id];
const STARTER = ['read_blow', 'read_blow', 'steady', 'blood', 'greed', 'ego', 'second', 'cold', 'bluff', 'bluff'];
const deckFor = (char, combat, theme) => {
  const base = combat ? [...COMBAT_STARTER] : [...STARTER];
  if (combat && THEMED[theme]) THEME_SLOTS.forEach((slot, i) => { base[slot] = THEMED[theme][i]; });
  // Someone whose E.G.O has not woken has no such card to hold; the slot goes to the plain steady-hands card
  return base.map((id) => (DUNGEON_CARDS[id].needsEgo && !char?.flags?.includes('EGOAwakened') ? 'steady' : id));
};
const HAND = 3;
// A dungeon is a handful of stages; the hand is a resource to ration, not a fresh buff every stage
export const CARD_BUDGET = 2;
// In a chain of fights the hand is a choice about the floor: one card a floor, dealt fresh each turn
export const FLOOR_CARD_BUDGET = 1;
export const cardBudgetLeft = (session) => (session?.mode === 'gauntlet'
  ? Math.max(0, FLOOR_CARD_BUDGET - (session.combat?.floorPlays || 0))
  : Math.max(0, CARD_BUDGET - (session?.cardsPlayed || 0)));

function shuffle(ids, seed) {
  const a = [...ids];
  let s = fnv(seed);
  for (let i = a.length - 1; i > 0; i--) {
    s = Math.imul(s ^ (s >>> 15), 2246822519) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function draw(session, seed) {
  let pile = [...(session.cardPile || [])];
  let discard = [...(session.cardDiscard || [])];
  const hand = [];
  while (hand.length < HAND) {
    if (!pile.length) {
      if (!discard.length) break;
      pile = shuffle(discard, `${seed}|reshuffle|${session.currentStageIndex || 0}`);
      discard = [];
    }
    hand.push(pile.shift());
  }
  return { cardPile: pile, cardDiscard: discard, cardHand: hand };
}

/** Can this character pay the card's price without being left at zero or holding a power they have not woken? */
export function cardPlayable(cardId, char) {
  const card = DUNGEON_CARDS[cardId];
  if (!card) return false;
  if (card.needsEgo && !char?.flags?.includes('EGOAwakened')) return false;
  // The free scan does not stack with a scan already paid for this stage: the play would be spent for nothing
  if (card.scan && char?.pendingDungeon?.stageScanned) return false;
  // Between fights only a card that heals has anything to act on
  const pending = char?.pendingDungeon;
  if (pending?.mode === 'gauntlet' && pending.combat?.plan?.[pending.combat.floor]?.kind === 'rest' && !((card.now?.health || 0) > 0)) return false;
  const hp = char?.stats?.health ?? 0;
  const sp = char?.stats?.sanity ?? 0;
  if ((card.now?.health || 0) < 0 && hp + card.now.health < 1) return false;
  if ((card.now?.sanity || 0) < 0 && sp + card.now.sanity < 1) return false;
  return true;
}

export const dungeonUsesCards = (def) => Boolean(def?.cards);

export function dealCards(session, char) {
  const seed = `${char?.seed ?? ''}|${session.id}|${char?.age ?? 0}`;
  const pile = shuffle(deckFor(char, session.mode === 'gauntlet', themeOf(session)), seed);
  return { ...session, cardPile: pile, cardDiscard: [], cardActive: null, cardsPlayed: 0, ...draw({ cardPile: pile, cardDiscard: [], currentStageIndex: 0 }, seed) };
}

/** The effect the stage is under right now, or an empty one. */
export const cardEffectOf = (session) => (session?.cardActive ? DUNGEON_CARDS[session.cardActive] || {} : {});

/** Plays a card from the hand: pays its immediate price and marks it for the next choice. */
export function playDungeonCard(charState, cardId) {
  const session = charState?.pendingDungeon;
  if (!session || session.cardActive || cardBudgetLeft(session) <= 0 || !(session.cardHand || []).includes(cardId) || !cardPlayable(cardId, charState)) return charState;
  const card = DUNGEON_CARDS[cardId];
  const char = { ...charState, stats: { ...charState.stats } };
  const clamp = (v) => Math.max(1, Math.min(100, v));
  if (card.now?.health) char.stats.health = clamp(char.stats.health + card.now.health);
  if (card.now?.sanity) char.stats.sanity = clamp(char.stats.sanity + card.now.sanity);
  if (card.now?.resonance) char.resonance = clamp((char.resonance || 0) + card.now.resonance);
  const strain = card.now?.strain || 0;
  const hand = [...session.cardHand];
  hand.splice(hand.indexOf(cardId), 1);
  char.pendingDungeon = {
    ...session,
    cardHand: hand,
    cardActive: cardId,
    cardDiscard: [...(session.cardDiscard || []), cardId],
    cardsPlayed: (session.cardsPlayed || 0) + 1,
    ...(session.mode === 'gauntlet' ? { combat: { ...session.combat, floorPlays: (session.combat?.floorPlays || 0) + 1 } } : {}),
    ...(strain ? { sanityStrain: Math.max(0, Math.min(100, (session.sanityStrain || 0) + strain)) } : {}),
    ...(card.scan ? { stageScanned: true } : {})
  };
  return char;
}

/** After a stage resolves: the played card is spent and unplayed ones go back before three new ones are dealt. */
export function nextHand(session, char) {
  const seed = `${char?.seed ?? ''}|${session.id}|${char?.age ?? 0}|${session.currentStageIndex || 0}|${session.combat?.floor ?? 0}|${session.combat?.turn ?? 0}|${session.combat?.phase ?? 1}`;
  const back = { ...session, cardDiscard: [...(session.cardDiscard || []), ...(session.cardHand || [])], cardHand: [], cardActive: null };
  return { ...back, ...draw(back, seed) };
}
