/**
 * Whether to cut motion short right now: the in-game setting on <html data-motion>
 * wins, and "system" falls back to the OS prefers-reduced-motion setting.
 */
export function reducedMotion() {
  const mode = document.documentElement.dataset.motion;
  if (mode === 'full') return false;
  if (mode === 'reduced') return true;
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}
