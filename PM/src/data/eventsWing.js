// Everything the Wing route adds on top of the older Feather scenes: the desk, the promotion rooms, the top of the ladder.
import { WING_DESK_EVENTS_A } from './eventsWingDesk.js';
import { WING_DESK_EVENTS_B } from './eventsWingDesk2.js';
import { WING_PROMO_EXTRA } from './eventsWingPromo.js';
import { WING_APEX_EVENTS } from './eventsWingApex.js';
import { WING_OVERHAUL_EVENTS } from './eventsWingOverhaul.js';

export const WING_STORY_EVENTS = [
  ...WING_DESK_EVENTS_A,
  ...WING_DESK_EVENTS_B,
  ...WING_PROMO_EXTRA,
  ...WING_APEX_EVENTS,
  ...WING_OVERHAUL_EVENTS
];
