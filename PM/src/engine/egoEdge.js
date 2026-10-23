// What a manifested E.G.O is worth outside a fight. Canon splits it in two: an Effloresced E.G.O grown from
// the wielder's own will, and a Volatile one that has not settled. The game keeps that split:
// EGOAwakened is the full one, IncompleteEGO the unsettled one.

export const EGO_EDGE = { awakened: 0.05, volatile: 0.015 };

export const hasAwakenedEgo = (char) => Boolean(char?.flags?.includes('EGOAwakened'));

/** Added to the success chance of Hana trials, career trials and contracts. Small on purpose. */
export function egoEdge(char) {
  if (hasAwakenedEgo(char)) return EGO_EDGE.awakened;
  if (char?.flags?.includes('IncompleteEGO')) return EGO_EDGE.volatile;
  return 0;
}

/** Outcomes that pay Merit and do not end in a death or a Distortion lean slightly towards the wielder. */
export const egoMeritTilt = (char) => 1 + egoEdge(char) * 1.5;
