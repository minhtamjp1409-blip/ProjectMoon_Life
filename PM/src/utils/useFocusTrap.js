import { useEffect } from 'react';

const FOCUSABLE = 'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

const isShown = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';

/**
 * Keeps Tab and Shift+Tab inside `ref` while `active`. A dialog opened above it (the NPC dossier, settings) has
 * its own trap, so this one stands aside whenever the last aria-modal element in the document is someone else's.
 */
export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'Tab' || event.defaultPrevented) return;
      const box = ref.current;
      if (!box) return;
      const modals = document.querySelectorAll('[aria-modal="true"]');
      const top = modals[modals.length - 1];
      if (top && top !== box && !box.contains(top)) return;
      const focusables = Array.from(box.querySelectorAll(FOCUSABLE)).filter(isShown);
      if (!focusables.length) {
        event.preventDefault();
        box.focus({ preventScroll: true });
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const inside = box.contains(document.activeElement);
      if (event.shiftKey && (!inside || document.activeElement === first || document.activeElement === box)) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && (!inside || document.activeElement === last)) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [ref, active]);
}
