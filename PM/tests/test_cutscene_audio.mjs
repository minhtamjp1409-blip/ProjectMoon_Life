import assert from 'node:assert/strict';
import { CUTSCENES } from '../src/features/cutscene/registry.js';

// A stand-in AudioContext that records what a cue schedules. Web Audio throws on an exponential ramp to zero or below,
// and CutsceneLayer swallows audio errors, so a broken cue would otherwise go unnoticed.
const log = { starts: [], expRamps: [], nodes: 0 };
const param = (value = 1) => ({
  value,
  setValueAtTime(v) { this.value = v; },
  linearRampToValueAtTime(v) { this.value = v; },
  exponentialRampToValueAtTime(v, time) { log.expRamps.push({ v, time }); this.value = v; },
  cancelScheduledValues() {}
});
const node = (extra = {}) => { log.nodes++; return { connect() {}, disconnect() {}, ...extra }; };
class FakeContext {
  constructor() { this.currentTime = 0; this.sampleRate = 8000; this.state = 'running'; this.destination = {}; }
  createGain() { return node({ gain: param(1) }); }
  createOscillator() { return node({ type: 'sine', frequency: param(440), start: (t) => log.starts.push(t), stop() {} }); }
  createBiquadFilter() { return node({ type: 'lowpass', frequency: param(350), Q: param(1) }); }
  createBufferSource() { return node({ buffer: null, start: (t) => log.starts.push(t), stop() {} }); }
  createBuffer(channels, length) { return { getChannelData: () => new Float32Array(length) }; }
  resume() { return Promise.resolve(); }
}
const stored = new Map();
globalThis.localStorage = { getItem: (k) => stored.get(k) ?? null, setItem: (k, v) => stored.set(k, String(v)), removeItem: (k) => stored.delete(k) };
globalThis.window = { AudioContext: FakeContext };
const { audioEngine } = await import('../src/engine/audioEngine.js');
audioEngine.setMuted(false);

for (const [id, scene] of Object.entries(CUTSCENES)) {
  for (const cut of ['full', 'lite', 'still']) {
    log.starts = []; log.expRamps = []; log.nodes = 0;
    const ms = scene.ms[cut];
    assert.doesNotThrow(() => audioEngine.playCutscene(id, cut, ms), `${id} ${cut} schedules without error`);
    assert(log.starts.length > 0, `${id} ${cut} makes a sound`);
    assert(log.expRamps.every((r) => r.v > 0), `${id} ${cut} never ramps exponentially to zero`);
    // Every sound starts while that cut of the scene is still up
    const limit = ms / 1000;
    assert(log.starts.every((t) => t >= 0 && t < limit), `${id} ${cut} starts every sound inside the scene (${limit}s)`);
  }
  log.nodes = 0;
  audioEngine.playCutscene(id, 'caption', scene.ms.caption);
  assert.equal(log.nodes, 0, `${id} caption adds no sound`);
}

// A skip fades the scene's bus
audioEngine.playCutscene('claw', 'full', CUTSCENES.claw.ms.full);
const bus = audioEngine.cutsceneBus;
audioEngine.stopCutscene();
assert.equal(audioEngine.cutsceneBus, null);
assert(bus.gain.value < 0.001, 'the bus is faded out');

// Muted: nothing at all
audioEngine.setMuted(true);
log.nodes = 0;
audioEngine.playCutscene('death', 'full', CUTSCENES.death.ms.full);
assert.equal(log.nodes, 0, 'muted plays nothing');

console.log(`Cutscene audio: ${Object.keys(CUTSCENES).length} scenes cue inside their timelines in full, lite and still, captions and mute stay silent, a skip fades the bus.`);
