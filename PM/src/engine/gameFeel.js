/**
 * Project Moon Life - Game Feel & Juice System
 * Built following the `game-feel` skill:
 * - Decaying trauma-based screen shake (trauma^2 quadratic response).
 * - Smooth pseudo-random offsets via sine wave phase sampling, NOT erratic jitter.
 * - Hit-stop / freeze frame mechanics for impact moments.
 * - Button squash & stretch feedback.
 */

class GameFeelEngine {
  constructor() {
    this.trauma = 0.0;
    this.decay = 1.35; // trauma lost per second
    this.maxOffsetX = 10; // max px offset
    this.maxOffsetY = 8;
    this.maxRoll = 0.035; // radians (~2 degrees)

    this.time = 0.0;
    this.lastFrame = performance.now();
    this.listeners = new Set();
    this.animId = null;

    this.hitStopActive = false;
    this.hitStopTimeout = null;

    this.startLoop();
  }

  startLoop() {
    const loop = (now) => {
      const dt = Math.min(0.1, (now - this.lastFrame) / 1000);
      this.lastFrame = now;

      if (this.trauma > 0) {
        this.trauma = Math.max(0, this.trauma - this.decay * dt);
        this.time += dt * 32.0;

        // Quadratic response: trauma^2 gives gentle low hits and sharp punchy high hits
        const shake = this.trauma * this.trauma;
        const x = this.maxOffsetX * shake * Math.sin(this.time * 1.7);
        const y = this.maxOffsetY * shake * Math.sin(this.time * 2.3);
        const rot = this.maxRoll * shake * Math.sin(this.time * 1.1);

        this.emit({ x, y, rot, shake, isShaking: true });
      } else {
        this.emit({ x: 0, y: 0, rot: 0, shake: 0, isShaking: false });
      }

      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);
  }

  /**
   * Adds trauma (0.0 to 1.0). Hits stack trauma instead of overriding.
   */
  addTrauma(amount) {
    this.trauma = Math.min(1.0, this.trauma + amount);
  }

  /**
   * Triggers a hit-stop freeze frame for high-impact moments (deaths, E.G.O, fatal choices).
   */
  triggerHitStop(durationMs = 90) {
    if (this.hitStopActive) return;
    this.hitStopActive = true;
    document.body.classList.add('is-hit-stop');

    if (this.hitStopTimeout) clearTimeout(this.hitStopTimeout);
    this.hitStopTimeout = setTimeout(() => {
      this.hitStopActive = false;
      document.body.classList.remove('is-hit-stop');
    }, durationMs);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(state) {
    this.listeners.forEach((fn) => fn(state));
  }
}

export const gameFeel = new GameFeelEngine();
