// Every non-Fixer contract template, keyed by route (see CONTRACT_ROUTES in careerContracts.js).
import { THUMB_CONTRACTS } from './careerContractsThumb.js';
import { INDEX_CONTRACTS } from './careerContractsIndex.js';
import { MIDDLE_CONTRACTS } from './careerContractsMiddle.js';
import { RING_CONTRACTS } from './careerContractsRing.js';
import { PINKY_CONTRACTS } from './careerContractsPinky.js';
import { WING_CONTRACTS } from './careerContractsWing.js';
import { MORE_CONTRACTS } from './careerContractsMore.js';

export const CAREER_REQUESTS = {
  thumb: [...THUMB_CONTRACTS, ...MORE_CONTRACTS.thumb],
  index: [...INDEX_CONTRACTS, ...MORE_CONTRACTS.index],
  middle: [...MIDDLE_CONTRACTS, ...MORE_CONTRACTS.middle],
  ring: [...RING_CONTRACTS, ...MORE_CONTRACTS.ring],
  pinky: [...PINKY_CONTRACTS, ...MORE_CONTRACTS.pinky],
  wing: WING_CONTRACTS
};
