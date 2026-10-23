// All Finger-specific stories, gathered so the engine registers one list per kind. A "mission" is a
// major scene the planner hands a Finger member in most years, the way a Fixer is handed a Request.
import { THUMB_EVENTS, THUMB_MINORS, THUMB_DAILIES } from './eventsFingerThumb.js';
import { INDEX_EVENTS, INDEX_MINORS, INDEX_DAILIES } from './eventsFingerIndex.js';
import { MIDDLE_EVENTS, MIDDLE_MINORS, MIDDLE_DAILIES } from './eventsFingerMiddle.js';
import { RING_EVENTS, RING_MINORS, RING_DAILIES } from './eventsFingerRing.js';
import { PINKY_EVENTS, PINKY_MINORS, PINKY_DAILIES } from './eventsFingerPinky.js';
import { FINGER_EXTRA_EVENTS, FINGER_EXTRA_MINORS, FINGER_EXTRA_DAILIES } from './eventsFingerExtra.js';
import { FINGER_CANON_EVENTS, FINGER_CANON_MINORS, FINGER_CANON_DAILIES } from './eventsFingerCanon.js';

const MISSION_IDS = new Set([
  // Thumb
  'thumb_market_tribute', 'thumb_ammo_count', 'thumb_wedding_guard', 'thumb_funeral_salute', 'thumb_bridge_swap',
  'thumb_bar_protection', 'thumb_rat_recruit', 'thumb_nest_debt', 'thumb_shooting_range', 'thumb_envelope_bullet',
  'thumb_turf_redraw', 'thumb_mole_hunt', 'thumb_commissary_winter', 'thumb_rival_dinner',
  // Index
  'index_red_umbrella', 'index_two_prescripts', 'index_wait_at_stop', 'index_golden_letter', 'index_proselyte_defector',
  'index_return_lost_item', 'index_shadow_a_stranger', 'index_flower_for_grave', 'index_count_the_steps', 'index_sealed_hour',
  'index_chalk_marks', 'index_bridge_with_no_name', 'index_letter_to_self', 'index_weight_of_prescript',
  // Middle
  'middle_book_entry_fresh', 'middle_family_dinner', 'middle_runaway_shelter', 'middle_mediate_feud', 'middle_find_missing_sibling',
  'middle_collect_the_debt', 'middle_orphans_home', 'middle_sibling_funeral', 'middle_book_forgiveness', 'middle_borrowed_money',
  'middle_testify_for_sibling', 'middle_peace_between_families', 'middle_dinner_for_enemy', 'middle_litter_of_names',
  // Ring
  'ring_atelier_critique', 'ring_patron_portrait', 'ring_opening_night', 'ring_stolen_masterpiece', 'ring_rival_sabotage',
  'ring_model_wants_out', 'ring_harsh_critic', 'ring_apprentice_audition', 'ring_restoring_the_damaged', 'ring_auction_shipping',
  'ring_pigment_from_outskirts', 'ring_unveiling_at_dawn', 'ring_maestro_breakdown', 'ring_viewer_who_weeps',
  // Pinky
  'pinky_witness_oath', 'pinky_sworn_blade_delivery', 'pinky_hunt_oathbreaker', 'pinky_bell_tower_watch', 'pinky_secret_ledger_courier',
  'pinky_vow_trial', 'pinky_blood_contract', 'pinky_unlawful_order', 'pinky_hostage_oath', 'pinky_elder_duel',
  'pinky_bride_escort', 'pinky_loophole', 'pinky_mute_witness', 'pinky_dying_stranger',
  // Added after the lore check
  'thumb_blameless_comrade', 'thumb_outsider_rank_etiquette', 'index_pneumatic_tube', 'index_pager_prescript',
  'middle_pilgrimage_of_loyalty', 'middle_collective_vengeance', 'middle_leaver_hunt', 'ring_grade_civilian_art',
  'ring_veiled_auction', 'ring_school_dispute', 'ring_outskirts_clash', 'pinky_hidden_member', 'pinky_gather_call', 'pinky_wrong_blade'
]);
const tag = (list) => list.map((e) => (MISSION_IDS.has(e.id) ? { ...e, mission: true } : e));

export const FINGER_STORY_EVENTS = tag([...THUMB_EVENTS, ...INDEX_EVENTS, ...MIDDLE_EVENTS, ...RING_EVENTS, ...PINKY_EVENTS, ...FINGER_EXTRA_EVENTS, ...FINGER_CANON_EVENTS]);
export const FINGER_MINORS = [...THUMB_MINORS, ...INDEX_MINORS, ...MIDDLE_MINORS, ...RING_MINORS, ...PINKY_MINORS, ...FINGER_EXTRA_MINORS, ...FINGER_CANON_MINORS];
export const FINGER_DAILIES = [...THUMB_DAILIES, ...INDEX_DAILIES, ...MIDDLE_DAILIES, ...RING_DAILIES, ...PINKY_DAILIES, ...FINGER_EXTRA_DAILIES, ...FINGER_CANON_DAILIES];
export const FINGER_MISSIONS = FINGER_STORY_EVENTS.filter((e) => e.mission);
