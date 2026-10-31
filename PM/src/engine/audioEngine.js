/**
 * Project Moon Life - Procedural Audio & Ambience Engine
 * Built with Web Audio API synthesis following the `audio-design` & `game-feel` skills.
 * 
 * Features:
 * - Bus Mixing Graph: MasterGain -> { SFXGain, UIGain, AmbienceGain }.
 * - Sidechain Ducking: Ambience smoothly ducks under high-impact SFX / dialogue and recovers.
 * - Procedural Ambience Generator (Zero-latency, 0 network asset dependencies):
 *     Layered scapes per world (src/engine/ambienceScapes.js): rain and wind, WARP rails, a forge, office
 *     air and typing, a Great Lake tide, Carmen's whispers. Noise and mechanical events only, no music.
 * - Contextual Project Moon SFX (with pitch/volume variation to eliminate repetitive fatigue):
 *     - Page flip / Sổ thù hận (Middle's Book of Vengeance)
 *     - Prescript typewriter / dệt chỉ thị (Index Prescript)
 *     - Thumb discipline snap / gõ búa trật tự (The Thumb)
 *     - Blade clash / giao tranh đao kiếm
 *     - Ahn coin clink / giao dịch xưởng
 *     - WARP whistle & dimensional breach
 *     - Dice roll / kiểm tra chỉ số
 *     - Decision chime, damage crunch, E.G.O choral swell, somber death toll
 */

import { startScape } from './ambienceScapes.js';

const safeGetStorage = (key, fallback = null) => {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : fallback;
  } catch {
    return fallback;
  }
};

const safeSetStorage = (key, value) => {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, String(value));
  } catch {}
};

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.uiGain = null;
    this.ambienceGain = null;

    // Load persisted settings
    const savedMuted = safeGetStorage('pm_audio_muted') === 'true';
    const savedVol = parseFloat(safeGetStorage('pm_audio_vol', '0.7') || '0.7');
    const savedAmbienceMuted = safeGetStorage('pm_ambience_muted') === 'true';
    const savedAmbienceVol = parseFloat(safeGetStorage('pm_ambience_vol', '0.7') || '0.7');
    const savedSfxVol = parseFloat(safeGetStorage('pm_sfx_vol', '0.8') || '0.8');

    this.isMuted = savedMuted;
    this.volume = isNaN(savedVol) ? 0.7 : Math.max(0, Math.min(1, savedVol));
    this.isAmbienceMuted = savedAmbienceMuted;
    this.ambienceVolume = isNaN(savedAmbienceVol) ? 0.7 : Math.max(0, Math.min(1, savedAmbienceVol));
    this.sfxVolume = isNaN(savedSfxVol) ? 0.8 : Math.max(0, Math.min(1, savedSfxVol));

    // Ambience state
    this.currentAmbienceType = null;
    this.activeAmbienceNodes = [];
    this.noiseBuffers = {};
    this.isDucked = false;
    this.duckTimeout = null;

    this.subscribers = new Set();
  }

  /**
   * Initializes the Web Audio Context upon user interaction.
   */
  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Bus Architecture: Master -> { SFX, UI, Ambience }
      this.masterGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.uiGain = this.ctx.createGain();
      this.ambienceGain = this.ctx.createGain();

      this.sfxGain.connect(this.masterGain);
      this.uiGain.connect(this.masterGain);
      this.ambienceGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.applyVolumes();
    } catch (err) {
      console.warn('AudioContext not supported or blocked:', err);
    }
  }

  applyVolumes() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const targetMasterGain = this.isMuted ? 0 : this.linearToGain(this.volume);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(targetMasterGain, now + 0.05);

    const targetSfxGain = this.isMuted ? 0 : this.linearToGain(this.sfxVolume);
    this.sfxGain.gain.setValueAtTime(this.sfxGain.gain.value, now);
    this.sfxGain.gain.linearRampToValueAtTime(targetSfxGain * 0.9, now + 0.05);

    this.uiGain.gain.setValueAtTime(this.uiGain.gain.value, now);
    this.uiGain.gain.linearRampToValueAtTime(targetSfxGain * 0.75, now + 0.05);

    const targetAmbienceGain = (this.isMuted || this.isAmbienceMuted) ? 0 : this.linearToGain(this.ambienceVolume) * 0.9;
    this.ambienceGain.gain.setValueAtTime(this.ambienceGain.gain.value, now);
    this.ambienceGain.gain.linearRampToValueAtTime(targetAmbienceGain, now + 0.1);

  }

  linearToGain(slider01) {
    if (slider01 <= 0.001) return 0;
    // Perceptual logarithmic mapping: slider^2 gives natural loudness feeling
    return Math.pow(slider01, 2);
  }

  setMuted(muted) {
    this.isMuted = Boolean(muted);
    safeSetStorage('pm_audio_muted', this.isMuted);
    this.applyVolumes();
    this.notify();
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    safeSetStorage('pm_audio_vol', this.volume);
    if (this.isMuted && this.volume > 0) {
      this.isMuted = false;
      safeSetStorage('pm_audio_muted', 'false');
    }
    this.applyVolumes();
    this.notify();
  }

  setAmbienceMuted(muted) {
    this.isAmbienceMuted = Boolean(muted);
    safeSetStorage('pm_ambience_muted', this.isAmbienceMuted);
    this.applyVolumes();
    this.notify();
  }

  toggleAmbience() {
    this.setAmbienceMuted(!this.isAmbienceMuted);
    return !this.isAmbienceMuted;
  }

  setAmbienceVolume(vol) {
    this.ambienceVolume = Math.max(0, Math.min(1, vol));
    safeSetStorage('pm_ambience_vol', this.ambienceVolume);
    this.applyVolumes();
    this.notify();
  }

  setSfxVolume(vol) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    safeSetStorage('pm_sfx_vol', this.sfxVolume);
    this.applyVolumes();
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) => cb({
      isMuted: this.isMuted,
      volume: this.volume,
      isAmbienceMuted: this.isAmbienceMuted,
      ambienceVolume: this.ambienceVolume,
      sfxVolume: this.sfxVolume,
      currentAmbienceType: this.currentAmbienceType
    }));
  }

  /**
   * Ducking: Smoothly dips the ambience bus when an important SFX/dialogue occurs.
   */
  duckAmbience(targetFraction = 0.25, durationMs = 800) {
    if (!this.ctx || !this.ambienceGain || this.isMuted || this.isAmbienceMuted) return;
    const now = this.ctx.currentTime;
    const baseGain = this.linearToGain(this.ambienceVolume) * 0.9;
    const duckedGain = baseGain * targetFraction;

    this.ambienceGain.gain.cancelScheduledValues(now);
    this.ambienceGain.gain.setValueAtTime(this.ambienceGain.gain.value, now);
    this.ambienceGain.gain.linearRampToValueAtTime(duckedGain, now + 0.08);

    if (this.duckTimeout) clearTimeout(this.duckTimeout);
    this.duckTimeout = setTimeout(() => {
      if (!this.ctx || !this.ambienceGain) return;
      const t = this.ctx.currentTime;
      this.ambienceGain.gain.cancelScheduledValues(t);
      this.ambienceGain.gain.setValueAtTime(this.ambienceGain.gain.value, t);
      const restoredGain = (this.isMuted || this.isAmbienceMuted) ? 0 : this.linearToGain(this.ambienceVolume) * 0.9;
      this.ambienceGain.gain.linearRampToValueAtTime(restoredGain, t + 0.45);
    }, durationMs);
  }

  // =========================================================================
  // NOISE BUFFER HELPERS (Pink, Brown, White)
  // =========================================================================

  getNoiseBuffer(type = 'pink', duration = 4) {
    if (!this.ctx) return null;
    const key = `${type}_${duration}`;
    if (this.noiseBuffers[key]) return this.noiseBuffers[key];

    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else if (type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Gain compensation
      }
    } else {
      // White noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }

    this.noiseBuffers[key] = buffer;
    return buffer;
  }

  // =========================================================================
  // DYNAMIC AMBIENCE ENGINE (Procedural Soundscapes)
  // =========================================================================

  /**
   * Switches the ambient soundscape smoothly. The scene comes from sceneContextOf: its world picks the
   * layers, its season picks the weather, a danger adds a heartbeat and an active E.G.O a bright hiss.
   */
  setScene(scene) {
    const key = scene ? [scene.world, scene.weather, scene.ego === 'active' ? 'ego' : '', scene.danger ? 'danger' : '', scene.carmen ? 'carmen' : ''].join('|') : null;
    if (this.currentAmbienceType === key) return;
    this.init();
    if (!this.ctx) return;
    this.stopAmbience();
    this.currentAmbienceType = key;
    this.notify();
    if (!scene || this.isMuted || this.isAmbienceMuted) return;

    const t = this.ctx.currentTime;
    const groupGain = this.ctx.createGain();
    groupGain.gain.setValueAtTime(0.0001, t);
    groupGain.gain.linearRampToValueAtTime(1, t + 2.2);
    groupGain.connect(this.ambienceGain);
    const noise = { pink: this.getNoiseBuffer('pink', 4), brown: this.getNoiseBuffer('brown', 5), white: this.getNoiseBuffer('white', 2) };
    const { sources, handles } = startScape(this.ctx, groupGain, noise, scene.world, scene);
    this.activeAmbienceNodes.push({ gain: groupGain, sources, handles });
  }

  /** Kept for callers that still name a scape directly. */
  setAmbience(type) {
    this.setScene(type ? { world: type, weather: 'rain', ego: 'none', danger: false } : null);
  }

  stopAmbience() {
    if (this.activeAmbienceNodes.length > 0) {
      const now = this.ctx ? this.ctx.currentTime : 0;
      this.activeAmbienceNodes.forEach((nodeGroup) => {
        try {
          nodeGroup.handles?.forEach((h) => { h.stopped = true; clearTimeout(h.id); });
          if (nodeGroup.gain) {
            nodeGroup.gain.gain.cancelScheduledValues(now);
            nodeGroup.gain.gain.setValueAtTime(nodeGroup.gain.gain.value, now);
            nodeGroup.gain.gain.linearRampToValueAtTime(0.0001, now + 1.6);
          }
          setTimeout(() => {
            nodeGroup.sources?.forEach((s) => {
              try { s.stop(); s.disconnect(); } catch {}
            });
            try { nodeGroup.gain?.disconnect(); } catch {}
          }, 1700);
        } catch {}
      });
      this.activeAmbienceNodes = [];
    }
  }

  // =========================================================================
  // CONTEXTUAL SFX GENERATORS (Project Moon Audio Palette)
  // =========================================================================

  /**
   * Sổ Thù Hận / Lật Sách / Đọc Biên Niên (Page flip / parchment friction).
   * Used when browsing Middle Book of Vengeance, chronicles, or major story cards.
   */
  playPageFlip() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const dur = 0.08;
    const buf = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * dur), this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / data.length) * Math.PI);
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buf;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    const pitchJitter = 2400 * (0.92 + Math.random() * 0.16);
    filter.frequency.setValueAtTime(pitchJitter, t);
    filter.Q.setValueAtTime(1.8, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    source.start(t);
  }

  /**
   * Chỉ Thị Ngón Trỏ (Index Prescript Weaver / Typewriter Click).
   * Crisp typewriter strike with subtle mechanical resonance.
   */
  playPrescriptTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    const baseFreq = 1680 * (0.95 + Math.random() * 0.1);
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.03);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, t);

    gain.gain.setValueAtTime(0.24, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  /**
   * Búng Tay Ngón Cái (Thumb Discipline Snap / Order Gavel Strike).
   * Tight wooden percussive snap with deep commanding transient.
   */
  playThumbSnap() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(360, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.06);

    gain.gain.setValueAtTime(0.38, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    // Initial noise snap
    const noiseBuf = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.02), this.ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuf;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2800, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.32, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.08);
    noise.start(t);
  }

  /**
   * Giao Tranh Đao Kiếm (Blade Clash / Steel Parry).
   * High metallic friction scrape with clear ringing steel harmonic.
   */
  playBladeClash() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.duckAmbience(0.3, 500);

    // Metallic ring frequencies (inharmonic steel partials)
    const freqs = [1840, 2480, 3960];
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f * (0.98 + Math.random() * 0.04), t);

      gain.gain.setValueAtTime(0.2 / (idx + 1), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.3);
    });

    // Metallic scrape noise burst
    const dur = 0.04;
    const buf = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * dur), this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf;
    const nFilter = this.ctx.createBiquadFilter();
    nFilter.type = 'highpass';
    nFilter.frequency.setValueAtTime(3200, t);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.28, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(t);
  }

  /**
   * Tiền Tệ Ahn / Xưởng Chế Tác (Coin Clink / Workshop Anvil Tap).
   * Bright pair of high metallic rings when spending or earning Ahn.
   */
  playCoinChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [3136, 3520]; // G7, A7
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const offset = idx * 0.045;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * (0.99 + Math.random() * 0.02), t + offset);

      gain.gain.setValueAtTime(0.001, t + offset);
      gain.gain.linearRampToValueAtTime(0.16, t + offset + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t + offset);
      osc.stop(t + offset + 0.22);
    });
  }

  /**
   * Còi Tàu WARP / Nhảy Vọt Thời Gian (W-Train Dimensional Horn Surge).
   * Deep portamento horn swell used when entering or surviving a W-Train leap cycle.
   */
  playWarpSurge() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.duckAmbience(0.15, 1200);

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    // Haunting portamento swell: 110Hz -> 138Hz -> 116Hz
    osc1.frequency.setValueAtTime(110, t);
    osc1.frequency.exponentialRampToValueAtTime(142, t + 0.45);
    osc1.frequency.exponentialRampToValueAtTime(116, t + 1.1);

    osc2.frequency.setValueAtTime(112, t);
    osc2.frequency.exponentialRampToValueAtTime(144, t + 0.45);
    osc2.frequency.exponentialRampToValueAtTime(118, t + 1.1);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, t);
    filter.Q.setValueAtTime(4.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.36, t + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.25);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 1.3);
    osc2.stop(t + 1.3);
  }

  /**
   * Xúc Xắc / Kiểm Tra Cơ Hội (Dice Roll / Fate Rattle).
   */
  playDiceRoll() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const taps = [0, 0.05, 0.09, 0.12];
    taps.forEach((delay, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420 + idx * 80 + Math.random() * 40, t + delay);
      osc.frequency.exponentialRampToValueAtTime(160, t + delay + 0.02);

      gain.gain.setValueAtTime(0.18 / (idx + 1), t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.025);

      osc.connect(gain);
      gain.connect(this.uiGain);
      osc.start(t + delay);
      osc.stop(t + delay + 0.03);
    });
  }

  /**
   * Crisp UI switch/click: Typewriter / mechanical relay click.
   */
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Randomize pitch slightly (SFX variation: +/- 5%)
    const pitch = 1400 * (0.95 + Math.random() * 0.1);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(280, t + 0.035);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, t);
    filter.Q.setValueAtTime(3, t);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.038);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.uiGain);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  /**
   * Resource increase / heal / merit gain: Harmonious warm pentatonic chime.
   */
  playBuff() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const chords = [
      [523.25, 659.25], // C5, E5
      [587.33, 739.99], // D5, F#5
      [659.25, 830.61]  // E5, G#5
    ];
    const notes = chords[Math.floor(Math.random() * chords.length)];

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const delay = idx * 0.04;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * (0.99 + Math.random() * 0.02), t + delay);

      gain.gain.setValueAtTime(0.001, t + delay);
      gain.gain.linearRampToValueAtTime(0.18, t + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t + delay);
      osc.stop(t + delay + 0.38);
    });
  }

  /**
   * Damage / resource loss / injury: Sharp metallic clash and blunt bone impact.
   */
  playDamage(intensity = 1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const scale = Math.min(2, Math.max(0.6, intensity));
    this.duckAmbience(0.35, 450);

    // Low pitch punch
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    const startFreq = 160 * (0.95 + Math.random() * 0.1);
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(32, t + 0.18);

    gain.gain.setValueAtTime(0.35 * scale, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    // Distortion waveshaper for gritty industrial crunch
    const waveShaper = this.ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1;
      curve[i] = ((3 + 10) * x * 20 * (Math.PI / 180)) / (Math.PI + 10 * Math.abs(x));
    }
    waveShaper.curve = curve;

    // Metal clatter noise burst
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.09);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1100, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25 * scale, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(waveShaper);
    waveShaper.connect(gain);
    gain.connect(this.sfxGain);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.24);
    noise.start(t);
  }

  /**
   * Danger / Syndicate siren / Sweeper chime: Low resonant drone.
   */
  /**
   * Visceral low-frequency cardiac pulse for high strain / panic in dungeons (lub-dub).
   */
  playHeartbeat(rate = 1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.duckAmbience(0.4, 600);

    // Lub (first contraction)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const filter1 = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(62, t);
    osc1.frequency.exponentialRampToValueAtTime(36, t + 0.14);

    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(110, t);

    gain1.gain.setValueAtTime(0.001, t);
    gain1.gain.linearRampToValueAtTime(0.38 * rate, t + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.sfxGain);

    osc1.start(t);
    osc1.stop(t + 0.18);

    // Dub (second closure)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    const filter2 = this.ctx.createBiquadFilter();

    const t2 = t + 0.15;
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(54, t2);
    osc2.frequency.exponentialRampToValueAtTime(30, t2 + 0.12);

    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(95, t2);

    gain2.gain.setValueAtTime(0.001, t2);
    gain2.gain.linearRampToValueAtTime(0.28 * rate, t2 + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.14);

    osc2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(this.sfxGain);

    osc2.start(t2);
    osc2.stop(t2 + 0.16);
  }

  /**
   * Clash sparks & high-velocity blade deflection friction.
   */
  playClashSpark() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.duckAmbience(0.5, 300);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.12);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.Q.setValueAtTime(4, t);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  playDanger() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.duckAmbience(0.2, 900);

    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(75, t);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(4.5, t);
    lfoGain.gain.setValueAtTime(15, t);
    lfo.connect(osc.frequency);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, t);
    filter.Q.setValueAtTime(5, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.28, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    lfo.start(t);
    osc.start(t);
    lfo.stop(t + 0.9);
    osc.stop(t + 0.9);
  }

  /**
   * E.G.O Awakening / Distortion Whisper: Resonant ethereal choral swell.
   */
  playEgo() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.duckAmbience(0.1, 1800);
    const freqs = [174.61, 261.63, 392.0, 523.25]; // F3, C4, G4, C5

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq * (1 + (idx - 1.5) * 0.004), t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 1.65);
    });
  }

  /**
   * Character death / Life closed: Somber low-frequency bell toll.
   */
  playDeath() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.duckAmbience(0.0, 2600);
    const root = 65.41; // C2

    [1, 2, 2.756, 3.82].forEach((partial, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(root * partial, t);

      const amp = 0.28 / (i + 1);
      gain.gain.setValueAtTime(amp, t);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + 2.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 2.5);
    });
  }

  /**
   * Subtle tick when year turns.
   */
  playYearTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(680, t);
    osc.frequency.exponentialRampToValueAtTime(240, t + 0.02);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.022);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(t);
    osc.stop(t + 0.025);
  }

  /**
   * Dramatic time-stop decision cue: Resonant harmonic chime.
   */
  playDecision() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    this.duckAmbience(0.3, 500);

    // Resonant time-stop chime: A4 (440) + E5 (659.25) + low sub (110)
    [440, 659.25, 110].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx === 2 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      if (idx !== 2) {
        osc.frequency.exponentialRampToValueAtTime(freq * 0.98, t + 0.35);
      }
      const initialAmp = idx === 2 ? 0.16 : 0.12;
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(initialAmp, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.uiGain);
      osc.start(t);
      osc.stop(t + 0.5);
    });
  }

  /* ---------- Cutscene cues (src/features/cutscene) ---------- */

  // One tone on the scene's own bus: a pitch (optionally gliding), a quick rise and an exponential fall
  cueTone(bus, t, { freq, to = null, type = 'sine', peak = 0.12, attack = 0.02, decay = 0.6 }) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t + attack + decay);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(peak, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    osc.connect(gain);
    gain.connect(bus);
    osc.start(t);
    osc.stop(t + attack + decay + 0.05);
  }

  // A band of filtered noise that swells and falls: a cut through the air, a crowd of whispers, a gust at a gate
  cueNoise(bus, t, { dur = 1, type = 'bandpass', freq = 1200, to = null, q = 1, peak = 0.08, attack = 0.3 }) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.getNoiseBuffer('pink', Math.max(1, Math.ceil(dur + 0.2)));
    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(freq, t);
    if (to) filter.frequency.exponentialRampToValueAtTime(to, t + dur);
    filter.Q.setValueAtTime(q, t);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(peak, t + Math.min(attack, dur * 0.8));
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(bus);
    src.start(t);
    src.stop(t + dur + 0.05);
  }

  // Lub-dub, quieter with each call when the caller lowers amp
  cueBeat(bus, t, amp = 0.32) {
    this.cueTone(bus, t, { freq: 62, to: 36, peak: amp, attack: 0.02, decay: 0.14 });
    this.cueTone(bus, t + 0.15, { freq: 54, to: 30, peak: amp * 0.75, attack: 0.02, decay: 0.12 });
  }

  // A bell from partials of one root, like the death toll, at any loudness
  cueBell(bus, t, { root = 65.41, peak = 0.22, decay = 2.2 } = {}) {
    [1, 2, 2.756, 3.82].forEach((partial, i) => this.cueTone(bus, t, { freq: root * partial, peak: peak / (i + 1), attack: 0.01, decay }));
  }

  /**
   * Plays the cue for a scene, timed to its CSS timeline (cutscene.css). Lite keeps only the key hit; a caption
   * (scenes off) plays nothing extra. The ambience ducks for the length of the scene, and everything runs on one bus
   * so a skip can fade the lot (stopCutscene).
   */
  playCutscene(id, cut = 'full', durationMs = 3000) {
    if (this.isMuted || cut === 'caption') return;
    this.init();
    if (!this.ctx) return;
    this.stopCutscene();
    const bus = this.ctx.createGain();
    bus.gain.setValueAtTime(1, this.ctx.currentTime);
    bus.connect(this.sfxGain);
    this.cutsceneBus = bus;
    this.duckAmbience(0.08, durationMs);
    const t = this.ctx.currentTime + 0.02;
    const at = (ms) => t + ms / 1000;
    // The still cut (reduced motion) is short too, so it takes the lite cue: the key hit right away
    const lite = cut !== 'full';

    if (id === 'claw') {
      // the cut runs across the room, the sight turns over a low drone, one hard flash
      if (!lite) {
        this.cueNoise(bus, at(400), { dur: 1.1, type: 'bandpass', freq: 700, to: 3200, q: 3, peak: 0.07, attack: 0.9 });
        this.cueTone(bus, at(900), { freq: 55, peak: 0.1, attack: 0.5, decay: 1.6 });
      }
      const hit = lite ? 480 : 3000;
      this.cueTone(bus, at(hit), { freq: 1900, to: 700, type: 'triangle', peak: 0.16, attack: 0.005, decay: 0.3 });
      this.cueNoise(bus, at(hit), { dur: 0.25, type: 'highpass', freq: 2400, peak: 0.12, attack: 0.01 });
    } else if (id === 'death') {
      // the heart slows and stops, then one distant toll on "Then nothing"
      if (!lite) {
        this.cueBeat(bus, at(150), 0.34);
        this.cueBeat(bus, at(1250), 0.2);
      }
      this.cueBell(bus, at(lite ? 300 : 2000), { peak: 0.16, decay: lite ? 1.4 : 2.2 });
    } else if (id === 'color') {
      // a swell rises with the slit, and the name rings out with the flash
      if (!lite) {
        [261.63, 392.0, 523.25].forEach((f, i) => this.cueTone(bus, at(300 + i * 120), { freq: f, type: i % 2 ? 'triangle' : 'sine', peak: 0.06, attack: 1.6, decay: 0.8 }));
      }
      const ring = lite ? 450 : 2500;
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.cueTone(bus, at(ring + i * 25), { freq: f, peak: 0.1 / (1 + i * 0.4), attack: 0.01, decay: lite ? 0.9 : 1.6 }));
    } else if (id === 'carmen') {
      // four slow beats under a crowd of whispers that thickens, then quiet and one warm note for the sentence
      if (!lite) {
        [672, 1488, 2440, 3460].forEach((ms, i) => this.cueBeat(bus, at(ms), 0.18 + i * 0.03));
        this.cueNoise(bus, at(500), { dur: 3.2, type: 'bandpass', freq: 900, to: 1600, q: 2, peak: 0.06, attack: 2.6 });
      } else {
        this.cueNoise(bus, at(0), { dur: 0.6, type: 'bandpass', freq: 1200, q: 2, peak: 0.05, attack: 0.3 });
      }
      const say = lite ? 100 : 3800;
      [220, 329.63, 440].forEach((f) => this.cueTone(bus, at(say), { freq: f, peak: 0.05, attack: 0.5, decay: lite ? 0.6 : 1.8 }));
    } else if (id === 'savior') {
      // your own heart still beating, a low note under their name, the candle snuffed
      if (!lite) this.cueBeat(bus, at(150), 0.3);
      this.cueTone(bus, at(lite ? 100 : 1300), { freq: 146.83, peak: 0.08, attack: 0.4, decay: lite ? 0.6 : 1.6 });
      this.cueNoise(bus, at(lite ? 450 : 2500), { dur: 0.4, type: 'highpass', freq: 3000, peak: 0.05, attack: 0.03 });
    } else if (id === 'finger') {
      // a low chord gathers while the Finger's mark is laid down, then the title lands with one heavy strike
      if (!lite) {
        [55, 82.41, 110].forEach((f) => this.cueTone(bus, at(800), { freq: f, type: 'sawtooth', peak: 0.035, attack: 1.4, decay: 0.5 }));
      }
      const strike = lite ? 100 : 2600;
      this.cueTone(bus, at(strike), { freq: 110, to: 45, peak: 0.24, attack: 0.01, decay: 0.8 });
      this.cueTone(bus, at(strike), { freq: 880, to: 620, type: 'triangle', peak: 0.07, attack: 0.01, decay: 1.2 });
    } else if (id === 'dungeon') {
      // a gust as the room falls away, a low gate falling shut as the name appears
      if (!lite) this.cueNoise(bus, at(0), { dur: 0.9, type: 'lowpass', freq: 300, to: 1400, q: 0.8, peak: 0.08, attack: 0.6 });
      const thud = lite ? 100 : 400;
      this.cueTone(bus, at(thud), { freq: 90, to: 40, peak: 0.26, attack: 0.01, decay: 0.7 });
      this.cueNoise(bus, at(thud), { dur: 0.35, type: 'bandpass', freq: 180, q: 1.5, peak: 0.1, attack: 0.02 });
    }
  }

  // Fades whatever a scene still has playing; called when a scene ends or is skipped
  stopCutscene() {
    const bus = this.cutsceneBus;
    if (!bus || !this.ctx) return;
    this.cutsceneBus = null;
    const now = this.ctx.currentTime;
    bus.gain.setValueAtTime(bus.gain.value, now);
    bus.gain.linearRampToValueAtTime(0.0001, now + 0.12);
    setTimeout(() => {
      try {
        bus.disconnect();
      } catch {}
    }, 200);
  }
}

export const audioEngine = new AudioEngine();
