# The City Chronicles: interface direction (v4, "the City at night, seen through glass")

The City fills the screen and changes with the life being lived: a Fixer walks an amber night, a Feather lives under the clean light of the Nest, the Index rains down Prescripts, a WARP car streaks past its windows. Every panel is dark smoked glass over that world, so the world is always present and the words stay legible. There is no light theme.

- Idea: the world is the background, and the background tells you where you are. Each route, a Hana Color, an awakened or open E.G.O, a dungeon and death each have their own sky, skyline, weather, accent and sound.
- One source of truth: `src/engine/sceneContext.js` (`sceneContextOf`). It feeds the backdrop (`src/components/world/`), the accent colour (`--accent` on `.shell`) and the ambience (`src/engine/ambienceScapes.js`).
- Typefaces: Literata for the story, headings and names; Archivo for the instruments, labels and figures (tabular numbers).
- Colour: ink ground (#07070a), bone text (#f1ede6), smoked glass surfaces. The accent belongs to the world (amber Fixer, ice-blue Nest, Prescript yellow Index, paint red Ring, violet Pinky, ember Thumb, magenta Distortion, the conferred colour of a Color). Gold only for milestones, Ahn and Hana evaluations. HP, SP and the other stats keep their own hues with written labels.
- Sound: ambience only, no music. It is made from noise and mechanical events: rain, wind, city rumble and distant sirens, office air and typing, the Index typewriter, WARP rails, a forge, crowds, the Great Lake tide, Carmen's whispers, the L Corp alarm, a heartbeat in danger.
- Motion: a change of world crossfades over about 1.6s, new chronicle entries rise, the decision dock rises, cards lift, a dungeon result shakes, and a Color or E.G.O gets one burst of light. Weather runs on one capped canvas. Everything stops under reduced motion.
- Shell: one top bar (brand, archive tabs, language, sound, text size, motion, sync). On a phone the tabs move to a bottom bar.
- Play: the running head, the dossier column, the chronicle column (the darkest glass) and the decision beside it from 1240px. Narrower, the decision is a sheet from below.
- Rules: tokens only, no hard-coded colours; root tokens on `:root`, never `:root.dark` (it outranks media queries and the text-size setting); sentence-case labels; no gradient text; no emoji icons.
- Checks: 1440 and 390 wide, several worlds, keyboard focus, reduced motion. Screenshots go in the scratchpad, never in the repo.

This direction was written by the agent at the owner's request; the owner can change any line.
