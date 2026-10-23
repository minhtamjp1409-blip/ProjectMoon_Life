/**
 * Project Moon Life - Game Feel & Juice System
 * Built following the `game-feel` skill:
 * - Decaying trauma-based screen shake (trauma^2 quadratic response).
 * - Smooth pseudo-random offsets via sine wave phase sampling, NOT erratic jitter.
 * - Hit-stop / freeze frame mechanics for impact moments.
 *
 * The frame loop only runs while there is trauma to spend, so an idle screen costs nothing,
 * and nothing shakes for players who asked for reduced motion.
 */

const reducedMotion = () => {
  if (typeof document === 'undefined') return true;
  const mode = document.documentElement.dataset.motion;
  if (mode === 'reduced') return true;
  if (mode === 'full') return false;
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

class GameFeelEngine {
  constructor() {
    this.trauma = 0.0;
    this.decay = 1.35; // trauma lost per second
    this.maxOffsetX = 10; // max px offset
    this.maxOffsetY = 8;
    this.maxRoll = 0.035; // radians (~2 degrees)

    this.time = 0.0;
    this.lastFrame = 0;
    this.listeners = new Set();
    this.animId = null;

    this.hitStopActive = false;
    this.hitStopTimeout = null;
  }

  loop = (now) => {
    const dt = Math.min(0.1, (now - this.lastFrame) / 1000);
    this.lastFrame = now;
    this.trauma = Math.max(0, this.trauma - this.decay * dt);
    this.time += dt * 32.0;

    // Quadratic response: trauma^2 gives gentle low hits and sharp punchy high hits
    const shake = this.trauma * this.trauma;
    this.emit({
      x: this.maxOffsetX * shake * Math.sin(this.time * 1.7),
      y: this.maxOffsetY * shake * Math.sin(this.time * 2.3),
      rot: this.maxRoll * shake * Math.sin(this.time * 1.1),
      shake,
      isShaking: this.trauma > 0
    });

    this.animId = this.trauma > 0 ? requestAnimationFrame(this.loop) : null;
  };

  /**
   * Adds trauma (0.0 to 1.0). Hits stack trauma instead of overriding.
   */
  addTrauma(amount) {
    if (reducedMotion()) return;
    this.trauma = Math.min(1.0, this.trauma + amount);
    if (this.animId === null) {
      this.lastFrame = performance.now();
      this.animId = requestAnimationFrame(this.loop);
    }
  }

  /**
   * Triggers a hit-stop freeze frame for high-impact moments (deaths, E.G.O, fatal choices).
   */
  triggerHitStop(durationMs = 90) {
    if (this.hitStopActive || reducedMotion()) return;
    this.hitStopActive = true;
    document.body.classList.add('is-hit-stop');

    if (this.hitStopTimeout) clearTimeout(this.hitStopTimeout);
    this.hitStopTimeout = setTimeout(() => {
      this.hitStopActive = false;
      document.body.classList.remove('is-hit-stop');
    }, durationMs);
  }

  /** A short buzz on touch devices: a choice landing, a check failing, a death. */
  haptic(pattern = 12) {
    if (reducedMotion() || typeof navigator === 'undefined' || !navigator.vibrate) return;
    if (!window.matchMedia?.('(pointer: coarse)').matches) return;
    try { navigator.vibrate(pattern); } catch { /* unsupported */ }
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
