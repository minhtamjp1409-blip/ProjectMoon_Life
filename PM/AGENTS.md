<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.agents/skills/antislop/SKILL.md`
- UI / visual: `.agents/skills/antislop-ui/SKILL.md`
- Copy / narrative text: `.agents/skills/antislop-copywriting/SKILL.md`
- Accessibility / UI states: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive layout: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `.agents/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: `npx antislop-ai --update`, or run `npx antislop-ai` and pick Overwrite them.
<!-- antislop:end -->

## Installed skill routing

Read the relevant installed `SKILL.md` under `.agents/skills/` before applying it. Select by the task; a skill's availability does not require changing unrelated systems.

- Game HUD, menus, controls: `game-ui-ux`, `input-systems`.
- Narrative branches, NPC decisions, event scoring and seeded generation: `dialogue-systems`, `game-ai`, `ai-behavior-trees-utility-ai`, `procedural-gen`.
- Save/load, migrations and measured performance: `save-systems`, `performance-optimization`.
- Feedback and sound: `game-feel`, `audio-design`.
- Interface composition, responsive styling and tokens: `design-taste-frontend`, `ui-ux-pro-max`, `ui-styling`, `design-system`.
- Visual identity and assets: `brand`, `design`, `create-game-assets`.
- Banners and presentations: `banner-design`, `slides`.
- Spatial gameplay when needed: `camera-systems`, `physics-tuning`, `level-design`, `shader-programming`.

Keep the existing React/Vite/Zustand/Ant Design stack and the Project Moon terminology described in `UNIVERSE.md`. Adapt engine-neutral guidance to this web game. A skill example is not a request to migrate frameworks or add packages.
