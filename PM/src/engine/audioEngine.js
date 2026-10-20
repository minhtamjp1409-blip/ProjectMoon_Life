/**
 * Project Moon Life - Procedural Audio Engine
 * Built with Web Audio API synthesis following the `audio-design` skill.
 * Implements bus mixing architecture: Master -> { SFX, UI, Ambience }.
 * Uses perceptual decibel gain and SFX variation to eliminate robotic repetition.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.uiGain = null;
    this.ambienceGain = null;

    // Load saved volume settings from localStorage
    const savedMuted = localStorage.getItem('pm_audio_muted') === 'true';
    const savedVol = parseFloat(localStorage.getItem('pm_audio_vol') || '0.7');

    this.isMuted = savedMuted;
    this.volume = isNaN(savedVol) ? 0.7 : Math.max(0, Math.min(1, savedVol));
    this.subscribers = new Set();
  }

  /**
   * Initializes the Web Audio Context upon user interaction.
   */
  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
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
    const targetGain = this.isMuted ? 0 : this.linearToGain(this.volume);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(targetGain, now + 0.05);

    this.sfxGain.gain.setValueAtTime(0.85, now);
    this.uiGain.gain.setValueAtTime(0.65, now);
    this.ambienceGain.gain.setValueAtTime(0.4, now);
  }

  linearToGain(slider01) {
    if (slider01 <= 0.001) return 0;
    // Perceptual logarithmic mapping: 0 -> 0, 1 -> 1
    return Math.pow(slider01, 2);
  }

  setMuted(muted) {
    this.isMuted = Boolean(muted);
    localStorage.setItem('pm_audio_muted', String(this.isMuted));
    this.applyVolumes();
    this.notify();
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('pm_audio_vol', String(this.volume));
    if (this.isMuted && this.volume > 0) {
      this.isMuted = false;
      localStorage.setItem('pm_audio_muted', 'false');
    }
    this.applyVolumes();
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) => cb({ isMuted: this.isMuted, volume: this.volume }));
  }

  // --- Sound Generation with Procedural Synthesis & SFX Variation ---

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
    const bufferSize = this.ctx.sampleRate * 0.09;
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
  playDanger() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
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
}

export const audioEngine = new AudioEngine();
