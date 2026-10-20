# Born in The City · ProjectMoon_Life

<p align="center">
  <b>A rich life-simulation roguelike set in the Project Moon universe</b><br>
  <i>26 Districts · Wings & Singularities · Fixers & Syndicates · Distortions & E.G.O</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%206-61dafb?style=flat-square" alt="React 18" />
  <img src="https://img.shields.io/badge/Backend-.NET%208%20Minimal%20API-512bd4?style=flat-square" alt=".NET 8" />
  <img src="https://img.shields.io/badge/Audio-Web%20Audio%20Synthesis-f59e0b?style=flat-square" alt="Web Audio" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

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

### 2. Deep Career Paths & Life Choices
* **Fixer Associations & Offices:** Climb from Grade 9 novice to Grade 1 elite, receive requests from Hana, Shi, Zwei, Cinq, or Tres Associations, and earn a legendary Color title (*The Red Mist*, *The Black Silence*, *The Purple Tear*).
* **The Five Fingers Syndicates:** Swear fealty to The Thumb (strict hierarchy & etiquette), The Index (inscrutable Prescripts), The Middle (unforgiving Book of Vengeance), or The Ring (grotesque artistic anatomy).
* **Wing Employment:** Work inside corporate Nests with access to Singularities, balancing quotas against company purges.
* **Workshop Craftsman:** Forge custom weapons, tune Workshop traits (*Mook Workshop*, *Wheels Industry*, *Atelier Logic*, *Stigma*), and pass weapons down across generations.
* **The Voice of Carmen · Distortion & E.G.O:** When sanity collapses, choose between submitting to Distortion or overcoming your scars to manifest your own E.G.O.

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

### 7. Weaver AI Narrative Director
* **Dynamic Tension Curve:** Regulates pacing across 5 narrative phases (Incubation, Rising Conflict, Climax, Aftermath, Resolution).
* **Causal Echoes:** Choices plant delayed consequence threads that mature and return years later.

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
    ├── Program.cs              # API endpoints, JSON compression, Weaver AI proxy
    ├── Data/                   # High-performance write-behind JSON archive store
    └── PM_BE.csproj
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

---

## 🛠️ Build & Verification

```bash
# Build frontend for production
cd PM
npm run build

# Run tests
npm run test
```

---

## 📜 Lore Disclaimer

This project is a fan-made tribute to the world created by **Project Moon** (*Lobotomy Corporation*, *Library of Ruina*, *Limbus Company*). All lore trademarks, names, and concepts belong to Project Moon.
