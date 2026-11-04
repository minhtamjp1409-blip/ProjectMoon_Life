// Renders every sound the game makes into an OfflineAudioContext in Chrome, through the same buses and the
// default volumes the game starts with, and reports peak and loudest-400ms RMS in dBFS for each one.
// A level report, not a listening test: it finds the sounds far louder or quieter than their neighbours,
// and the owner still has to listen. RMS here is plain dBFS, not LUFS.
//   node tools/qa/audio_levels.mjs [--json out.json]
import { createServer } from 'vite';
import { writeFileSync } from 'node:fs';
import { Browser } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const jsonOut = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null;

const server = await createServer({ server: { port: 0, strictPort: false }, logLevel: 'error' });
await server.listen();
const { port } = server.httpServer.address();
const browser = await Browser.launch();
let rows = [];
try {
  const page = await browser.newPage({ width: 800, height: 600 });
  await page.goto(`http://localhost:${port}/`, { timeoutMs: 60000, settleMs: 1500 });
  rows = await page.eval(async () => {
    const { audioEngine } = await import('/src/engine/audioEngine.js');
    const { CUTSCENES } = await import('/src/features/cutscene/registry.js');
    const { WORLDS } = await import('/src/engine/sceneContext.js');
    const SR = 44100;

    // A fresh engine wired to an offline context exactly as init() wires the live one
    const engineOn = (seconds) => {
      const eng = new audioEngine.constructor();
      eng.isMuted = false; eng.isAmbienceMuted = false;
      eng.volume = 0.7; eng.sfxVolume = 0.8; eng.ambienceVolume = 0.7;
      const ctx = new OfflineAudioContext(2, Math.ceil(SR * seconds), SR);
      eng.ctx = ctx;
      eng.masterGain = ctx.createGain(); eng.sfxGain = ctx.createGain(); eng.uiGain = ctx.createGain(); eng.ambienceGain = ctx.createGain();
      eng.sfxGain.connect(eng.masterGain); eng.uiGain.connect(eng.masterGain); eng.ambienceGain.connect(eng.masterGain);
      eng.masterGain.connect(ctx.destination);
      eng.masterGain.gain.value = eng.linearToGain(eng.volume);
      eng.sfxGain.gain.value = eng.linearToGain(eng.sfxVolume) * 0.9;
      eng.uiGain.gain.value = eng.linearToGain(eng.sfxVolume) * 0.75;
      eng.ambienceGain.gain.value = eng.linearToGain(eng.ambienceVolume) * 0.9;
      eng.applyVolumes = () => {};
      return { eng, ctx };
    };
    const measure = (buffer) => {
      let peak = 0;
      const win = Math.round(SR * 0.4);
      let loudest = 0;
      const mono = new Float32Array(buffer.length);
      for (let c = 0; c < buffer.numberOfChannels; c++) {
        const d = buffer.getChannelData(c);
        for (let i = 0; i < d.length; i++) { mono[i] += d[i] / buffer.numberOfChannels; peak = Math.max(peak, Math.abs(d[i])); }
      }
      for (let s = 0; s + win <= mono.length; s += Math.round(win / 4)) {
        let sum = 0;
        for (let i = s; i < s + win; i++) sum += mono[i] * mono[i];
        loudest = Math.max(loudest, Math.sqrt(sum / win));
      }
      const db = (v) => (v > 0 ? Math.round(20 * Math.log10(v) * 10) / 10 : -120);
      return { peakDb: db(peak), rmsDb: db(loudest) };
    };
    const render = async (group, name, seconds, play) => {
      const { eng, ctx } = engineOn(seconds);
      try { play(eng, ctx); } catch (e) { return { group, name, error: String(e.message || e) }; }
      const buffer = await ctx.startRendering();
      return { group, name, ...measure(buffer) };
    };

    const out = [];
    const oneShots = ['playClick', 'playDecision', 'playYearTick', 'playPageFlip', 'playBuff', 'playCoinChime', 'playDiceRoll',
      'playPrescriptTick', 'playThumbSnap', 'playBladeClash', 'playClashSpark', 'playWarpSurge', 'playDamage', 'playDanger',
      'playHeartbeat', 'playEgo', 'playDeath'];
    for (const m of oneShots) if (typeof audioEngine[m] === 'function') out.push(await render('one-shot', m, 4, (eng) => eng[m]()));
    for (const id of Object.keys(CUTSCENES)) {
      for (const cut of ['full', 'lite']) out.push(await render('cutscene', `${id} (${cut})`, 7, (eng) => eng.playCutscene(id, cut, 5000)));
    }
    const places = Object.keys(WORLDS).filter((w) => !['title', 'library', 'dead'].includes(w) && !w.startsWith('dungeon-'));
    for (const w of places) out.push(await render('location cue', w, 3, (eng) => { eng.currentWorld = w === 'backstreets' ? 'nest' : 'backstreets'; eng.playLocationCue(w, eng.currentWorld); }));
    for (const w of Object.keys(WORLDS).filter((x) => x !== 'title')) {
      out.push(await render('ambience', w, 8, (eng) => eng.setScene({ world: w, weather: 'rain', ego: 'none', danger: false })));
    }
    return out;
  });
} finally {
  await browser.close();
  await server.close();
}

// Outliers against the median of their own group
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };
const groups = [...new Set(rows.map((r) => r.group))];
const flagged = [];
for (const g of groups) {
  const inGroup = rows.filter((r) => r.group === g && r.rmsDb != null);
  const med = median(inGroup.filter((r) => r.rmsDb > -100).map((r) => r.rmsDb));
  console.log(`\n${g} (median loudest RMS ${med} dBFS)`);
  for (const r of rows.filter((x) => x.group === g)) {
    if (r.error) { console.log(`  ${r.name.padEnd(26)} ERROR ${r.error}`); flagged.push(`${g}: ${r.name} failed to render`); continue; }
    const notes = [];
    if (r.peakDb > -1) notes.push('peak near clipping');
    if (r.rmsDb <= -100) notes.push('silent');
    else if (r.rmsDb - med >= 6) notes.push(`+${(r.rmsDb - med).toFixed(1)} dB over the group`);
    else if (med - r.rmsDb >= 12) notes.push(`${(r.rmsDb - med).toFixed(1)} dB under the group`);
    if (notes.length) flagged.push(`${g}: ${r.name} (${notes.join(', ')})`);
    console.log(`  ${r.name.padEnd(26)} peak ${String(r.peakDb).padStart(6)}  rms ${String(r.rmsDb).padStart(6)}  ${notes.join(', ')}`);
  }
}
console.log(`\n${flagged.length ? 'To listen to first:\n  ' + flagged.join('\n  ') : 'No sound stands far from its group.'}`);
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(rows, null, 1));
