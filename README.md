# Born in The City · ProjectMoon_Life

<p align="center">
  <b>A rich life-simulation roguelike set in the Project Moon universe</b><br>
  <i>26 Districts · Wings & Singularities · Fixers & Syndicates · Distortions & E.G.O</i>
</p>

<p align="center">
  <a href="https://project-moon-life-five.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-project--moon--life--five.vercel.app-d4af37?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo on Vercel" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%206-61dafb?style=flat-square" alt="React 18" />
  <img src="https://img.shields.io/badge/Backend-.NET%208%20Minimal%20API-512bd4?style=flat-square" alt=".NET 8" />
  <img src="https://img.shields.io/badge/Audio-Web%20Audio%20Synthesis-f59e0b?style=flat-square" alt="Web Audio" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

> 🌐 **Chơi trực tuyến ngay (Online Live Demo):** [https://project-moon-life-five.vercel.app](https://project-moon-life-five.vercel.app)  
> *(Hỗ trợ đầy đủ PC và Mobile, tự động lưu trữ, không cần cài đặt phức tạp)*

---

## 📖 Overview / Tổng quan

**Born in The City** is a dark, atmospheric life-simulation roguelike inspired by the dystopian universe of Project Moon (*Lobotomy Corporation*, *Library of Ruina*, *Limbus Company*).

Each year of your life passes in real time (configurable 10s–30s). You are born into one of the 26 Districts of The City—as a starving orphan in the Backstreets, a nomarch in the Outskirts, or a sheltered Feather of a Megacorporation Wing. You make pivotal life decisions, climb the brutal hierarchy, confront Sweepers and Syndicates, and eventually face death... only for your legacy to pass down to your children and disciples.

---

## ✨ Key Features / Tính năng nổi bật

### 1. The 26 Districts & Origins
* **26 Unique Districts (A to Z):** Each governed by a Megacorporation Wing with its own Singularity (e.g., T Corp Time Debt, W Corp Warp Trains, K Corp Regeneration Ampoules, R Corp Cloning, L Corp Extraction).
* **Social Strata & Family Backgrounds:**
  * Backstreets Orphan & Sweeper survivors
  * Backstreet sweatshop working families
  * Retired Fixer lineages
  * Nest Feathers under corporate quotas
  * Wing Executive / Noble Lineages
  * Outskirts wasteland nomads

### 2. Deep Career Paths & Pinnacle Crucibles (Thử Thách Đỉnh Cao Lore-Accurate)
* **Color Fixer Ascension (Đại Khảo Thí Star of the City):** In Project Moon lore, reaching Color is never an automatic stat promotion. Grade 1 Fixers with $\ge 150$ Merit and $\ge 68$ Rep must survive the *Hana Star of the City Calamity Commission* against lethal Urban Nightmares or ancient threats before the Hana Council grants an official Color title (*The Red Mist*, *The Black Silence*, *The Purple Tear*).
* **The Voice of Carmen · Distortion & E.G.O Blooming:**
  * When emotional despair peaks (Sanity $\le 16$, Resonance $\ge 35$), Carmen whispers into the soul, offering release through Distortion.
  * *True E.G.O Efflorescence:* Refusing Carmen requires iron conviction and life scars. Succeeding manifests True E.G.O with an interactive naming modal.
  * *Incomplete E.G.O (E.G.O Chưa Hoàn Chỉnh):* Faltering resolve fractures the soul, leaving an emotional scar and scheduling a second efflorescence trial years later.
  * *Distortion (Biến Dị):* Surrendering to Carmen shatters human shape into a monstrous classified Distortion with immense destructive fury and a City-wide bounty.
* **The Five Fingers Pinnacle Trials:**
  * **The Thumb (Underboss / Capo dei Capi):** Endure the Grand Etiquette Purge where a single misspoken word brings execution.
  * **The Index (Weaver of Prescripts):** Execute the Golden Prescript without question to unseal the Proxy blade.
  * **The Middle (Great Brother / Sister):** Settle the 20-year Master Blood Debt in the Book of Vengeance against fortified syndicates.
  * **The Ring (Maestro of the Gallery):** Present an "Art of Suffering" graded A+ by Ring Docents.
  * **The Pinky (Star of the Sky / Thiên Tinh):** Climb the Outskirts bell tower and forge a soul-bound Star Blade.
* **Workshop Masterpiece (Tuyệt Tác Thần Binh Tres Association):** Temper unstable Singularity alloys to forge generational heirloom weapons.
* **Wing Senior Executive (Thẩm Định Singularity Tối Mật):** Gaze into the horrific secret powering the Megacorporation (WARP cleanup, R Corp Hatchery, K Corp Weeping chamber) without collapsing into madness.

### 3. Generational Dynasty & Bloodlines
* **Heir Succession:** Continue playing as your child or apprentice across generations.
* **Inherited Echoes:** Carry forward bloodline traits, ancestral relics, family debts, and vendettas.
* **Epitaph & Memorial Card Export:** Generate high-resolution dossier PNG cards commemorating each life lived.

### 4. Procedural Web Audio Engine (`audio-design`)
* **Pure Web Audio API Synthesis:** 100% synthesized sound effects—zero external audio file dependencies, instant loading, offline capability.
* **Bus Mixer Architecture:** `MasterBus -> { SFXBus, UIBus, AmbienceBus }` with decibel (dB) gain control.
* **Organic SFX Variation:** Dynamic pitch wobbly ($\pm 5\%$) and filter modulation to eliminate robotic repetition.
* **Sound Palette:** Tactical mechanical clicks, healing chimes, industrial blade strikes, low-frequency curfew sirens, and funeral bell tolls.

### 5. Kinetic Game Feel (`game-feel`)
* **Trauma-Based Screen Shake ($trauma^2$):** Quadratic camera/stage shaking response for hits, damage, and dangers with smooth sinusoidal decay.
* **Dramatic Hit-Stop (Freeze Frame):** 180–220ms high-contrast freeze frames on fatal encounters and deaths before epitaph reveal.
* **Dynamic Delta Animations:** Emerald glow waves (`is-flash-up`) for stat buffs and crimson glitch tremors (`is-flash-down`) for damage.

### 6. Architectural Dystopian Visuals
* **Pure CSS/SVG Geometric Wireframe Backdrop:** Concentric rotating City rings, technical blueprint grids, coordinate crosshairs, and animated sweeping laser beams.
* **Dynamic Ambient Scenes:** Contextual ambient backdrops reflecting current life states (Warp space, Blade alleyways, Smoke war hatch, Star of the City).

### 7. Weaver AI Narrative Director & Four-Season Architecture
* **Four-Season Seasonal Pacing (Xuân · Hạ · Thu · Đông):**
  * **Spring (Mùa Xuân):** Season of beginnings, Association commissions, entrance examinations, and awakening.
  * **Summer (Mùa Hạ):** Season of street commerce, backstreet brawls, heatwaves, and tactical choices.
  * **Autumn (Mùa Thu):** Season of Hana reviews, debt collections, audits, and cold rains.
  * **Winter (Mùa Đông):** Season of Sweeper hours, bitter frost, crisis trials, and year-end reckonings.
* **Distinct Event Kinds:**
  * **Chronicle Lore (Kể chuyện):** Deep slice-of-life observations and atmospheric worldbuilding.
  * **Life Friction (Tài nguyên):** Backstreet economic drains, medical patch-ups, tavern drinks, and Syndicate taxes.
  * **Minor Decisions (Sự kiện ngắn):** Time-pressured tactical choices with lasting memory tags.
  * **Key Turning Points (Sự kiện then chốt):** Pivotal crossroads, Association contracts, E.G.O manifestations, and karmic retribution.
* **Persistent Causality (Nhân quả bền vững - Không bị reset khi qua năm):** Unlike typical life sims where choices reset annually, every decision leaves persistent memory echoes (`char.memory`), trauma scars, and scheduled causal threads (`pendingThreads`) that return years later.
* **Career Objectives & Milestone Tracker:**
  * Dedicated HUD goal tracker displaying promotion criteria (e.g., Fixer Grade 9 -> 8: required Merit & Rep; Syndicate ranks: Thumb Capo, Index Proxy, Middle Big Brother; Wing Executive levels; Workshop Masteries).
  * Checklists with live progress bars, checkable conditions, and strategy tips.
* **Goal-Seeking Utility AI:** The Director calculates player ambitions and weights opportunities to gain missing Merit, Rep, or Ahn while balancing drama tension (Tension ⇄ Relief oscillation).

---

## ⌨️ Controls & Keyboard Shortcuts

| Shortcut | Action |
| :---: | :--- |
| <kbd>1</kbd> – <kbd>9</kbd> | Select corresponding event choice / contract approach |
| <kbd>0</kbd> or <kbd>Esc</kbd> | Skip minor daily choice (let time pass) |
| <kbd>Space</kbd> | Pause / Resume real-time year progression |
| <kbd>M</kbd> | Toggle audio mute / unmute |
| <kbd>S</kbd> | Quick save current run |

---

## 🏗️ Repository Architecture

```text
ProjectMoon_Life/
├── PM/                         # Frontend Application (React 18 + Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI widgets (CityBackdrop, RegionMark, PageBanner)
│   │   ├── data/               # Story events, districts, factions, glossary, codex
│   │   ├── engine/             # Core engines:
│   │   │   ├── gameEngine.js   # Life creation, character stats, generation lineage
│   │   │   ├── yearPlanner.js  # Year schedule, dailies, minors, living costs, aging
│   │   │   ├── weaverAI.js     # Narrative director, drama tension, fate omens
│   │   │   ├── audioEngine.js  # Web Audio API bus mixer & procedural synthesis
│   │   │   └── gameFeel.js     # Trauma-based screen shake & hit-stop system
│   │   ├── features/           # Feature pages (Chronicle, Bloodline, Codex, Glossary)
│   │   ├── layouts/            # MainLayout, Header, Sidebar with live vital bars
│   │   ├── store/              # Zustand state store with auto-save
│   │   └── index.css           # Dystopian design system & micro-animations
│   └── package.json
│
└── PM_BE/                      # Backend Service (.NET 8 Minimal API)
    ├── Program.cs              # API endpoints, JSON compression
    ├── Services/               # Archive store (write-behind JSON), Director and Weaver scorers
    ├── Data/                   # Archive and run-state files (git-ignored)
    └── ProjectMoon.Api.csproj
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **.NET SDK**: .NET 8.0 or higher

### 1. Frontend Setup
```bash
cd PM
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

### 2. Backend Setup
```bash
cd PM_BE
dotnet run
```
Default API port: `http://localhost:5080`.

The frontend calls the deployed backend (`https://projectmoon-life.onrender.com/api`) by default, so `npm run dev` works without running the backend. To use a local backend, create `PM/.env.local` with `VITE_API_URL=http://localhost:5080/api`.

### Saved progress on a hosted server

The browser keeps its own save and a random player token in local storage. The API uses that token to keep each player's archive and active run separate. It is an anonymous device identity, not a login: clearing browser storage loses access to that server archive.

Deploy the frontend and backend changes together. The older shared files in `PM_BE/Data/city_archive.json` and `PM_BE/Data/run_state.json` are left untouched; the new API does not assign those shared records to any player. Existing saves in each browser remain available locally.

For durable server saves, set `CITY_DATA_DIR` to an absolute path backed by persistent storage. Without it, the backend writes under its local `Data` folder. On Render, that default filesystem is cleared on restart or redeploy; the browser save remains the fallback. Run `npm run test:backend-isolation` from `PM` after changing backend persistence.

---

## 🛠️ Build & Verification

```bash
# Build frontend for production
cd PM
npm run build

# Story lint, regression tests and a 500-moment integrity audit
npm run test
```

Separate tools, all run against the real engine with fixed seeds:

| Command | What it does |
| :--- | :--- |
| `npm run lint:story` | Duplicate ids, references to missing events, unknown effect keys, relationship words without a gate |
| `npm run audit` | 1,000,000-moment integrity audit; rewrites `BAO_CAO_KIEM_THU_1_TRIEU_KICH_BAN.txt` |
| `npm run audit:story` | Logic violations (a dead person in a scene, Married with no spouse…) and variety across lives |
| `npm run balance` | Lifespan against each District's `avgLife`, every resource by age, and what moves each resource |

---

## 📜 Lore Disclaimer

This project is a fan-made tribute to the world created by **Project Moon** (*Lobotomy Corporation*, *Library of Ruina*, *Limbus Company*). All lore trademarks, names, and concepts belong to Project Moon.
