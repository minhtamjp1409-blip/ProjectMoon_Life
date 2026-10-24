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
  ego: { needsEgo: true, vi: 'Khai mở E.G.O', en: 'Open the E.G.O', textVi: 'Mất 8 SP ngay, thêm 4 Resonance. Dò đường dễ hơn 22 điểm, thương tổn giảm 40%.', textEn: 'Lose 8 SP now, gain 4 Resonance. Checks 22 points easier, damage down 40%.', check: 0.22, damage: 0.6, now: { sanity: -8, resonance: 4 } },
  second: { vi: 'Hơi thở thứ hai', en: 'Second Wind', textVi: 'Hồi 8 HP và 4 SP ngay. Không đổi gì ở chặng này.', textEn: 'Heal 8 HP and 4 SP now. Changes nothing about this stage.', now: { health: 8, sanity: 4 } },
  cold: { vi: 'Đếm lạnh', en: 'Cold Count', textVi: 'Quét chặng này miễn phí, không tốn tiếp tế.', textEn: 'Scan this stage for free, no supply spent.', scan: true },
  bluff: { vi: 'Giả điềm tĩnh', en: 'Feigned Calm', textVi: 'Dò đường dễ hơn 8 điểm, thương tổn giảm một phần mười.', textEn: 'Checks 8 points easier, damage down a tenth.', check: 0.08, damage: 0.9 }
};

const STARTER = ['read_blow', 'read_blow', 'steady', 'blood', 'greed', 'ego', 'second', 'cold', 'bluff', 'bluff'];
// Someone whose E.G.O has not woken has no such card to hold; the slot goes to the plain steady-hands card
const deckFor = (char) => STARTER.map((id) => (DUNGEON_CARDS[id].needsEgo && !char?.flags?.includes('EGOAwakened') ? 'steady' : id));
const HAND = 3;
// A dungeon is a handful of stages; the hand is a resource to ration, not a fresh buff every stage
export const CARD_BUDGET = 2;

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
  const hp = char?.stats?.health ?? 0;
  const sp = char?.stats?.sanity ?? 0;
  if ((card.now?.health || 0) < 0 && hp + card.now.health < 1) return false;
  if ((card.now?.sanity || 0) < 0 && sp + card.now.sanity < 1) return false;
  return true;
}

export const dungeonUsesCards = (def) => Boolean(def?.cards);

export function dealCards(session, char) {
  const seed = `${char?.seed ?? ''}|${session.id}|${char?.age ?? 0}`;
  const pile = shuffle(deckFor(char), seed);
  return { ...session, cardPile: pile, cardDiscard: [], cardActive: null, cardsPlayed: 0, ...draw({ cardPile: pile, cardDiscard: [], currentStageIndex: 0 }, seed) };
}

/** The effect the stage is under right now, or an empty one. */
export const cardEffectOf = (session) => (session?.cardActive ? DUNGEON_CARDS[session.cardActive] || {} : {});

/** Plays a card from the hand: pays its immediate price and marks it for the next choice. */
export function playDungeonCard(charState, cardId) {
  const session = charState?.pendingDungeon;
  if (!session || session.cardActive || (session.cardsPlayed || 0) >= CARD_BUDGET || !(session.cardHand || []).includes(cardId) || !cardPlayable(cardId, charState)) return charState;
  const card = DUNGEON_CARDS[cardId];
  const char = { ...charState, stats: { ...charState.stats } };
  const clamp = (v) => Math.max(1, Math.min(100, v));
  if (card.now?.health) char.stats.health = clamp(char.stats.health + card.now.health);
  if (card.now?.sanity) char.stats.sanity = clamp(char.stats.sanity + card.now.sanity);
  if (card.now?.resonance) char.resonance = clamp((char.resonance || 0) + card.now.resonance);
  const hand = [...session.cardHand];
  hand.splice(hand.indexOf(cardId), 1);
  char.pendingDungeon = {
    ...session,
    cardHand: hand,
    cardActive: cardId,
    cardDiscard: [...(session.cardDiscard || []), cardId],
    cardsPlayed: (session.cardsPlayed || 0) + 1,
    ...(card.scan ? { stageScanned: true } : {})
  };
  return char;
}

/** After a stage resolves: the played card is spent and unplayed ones go back before three new ones are dealt. */
export function nextHand(session, char) {
  const seed = `${char?.seed ?? ''}|${session.id}|${char?.age ?? 0}|${session.currentStageIndex || 0}`;
  const back = { ...session, cardDiscard: [...(session.cardDiscard || []), ...(session.cardHand || [])], cardHand: [], cardActive: null };
  return { ...back, ...draw(back, seed) };
}
