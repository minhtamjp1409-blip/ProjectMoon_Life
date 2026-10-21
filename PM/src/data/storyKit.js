// Builders and age bands shared by the newer story files.
// M: minor (a choice with a 15 second window), C: its choice, O: one weighted outcome,
// I: what happens if you let it pass, D: a daily line (no choice, small stat change).

export const M = (id, age, need, vi, en, choices, ignore, extra = {}) => ({ id, age, need, vi, en, choices, ignore, ...extra });
export const C = (vi, en, rvi, ren, fx = {}, extra = {}) => ({ vi, en, rvi, ren, fx, ...extra });
export const O = (w, rvi, ren, fx = {}, extra = {}) => ({ w, rvi, ren, fx, ...extra });
export const I = (rvi, ren, fx = {}, extra = {}) => ({ vi: 'Để nó trôi qua', en: 'Let it pass', rvi, ren, fx, ...extra });
export const D = (id, age, need, vi, en, fx = {}, extra = {}) => ({ id, age, need, vi, en, fx, ...extra });

export const AGE = {
  INF: [0, 3],
  KID: [4, 6],
  CHILD: [7, 11],
  TEEN: [12, 17],
  YOUNG: [7, 17],
  ANY: [12, 140],
  ADULT: [18, 45],
  GROWN: [18, 140],
  MID: [40, 59],
  OLD: [60, 140]
};
