export const MAX_ACTIVE_SCARS = 4;

export function activeScarCount(char) {
  return Math.min(MAX_ACTIVE_SCARS, (char.scars || []).length);
}

export function addScar(char, name) {
  if (!name || char.scars.includes(name) || char.scars.length >= MAX_ACTIVE_SCARS) return false;
  char.scars.push(name);
  return true;
}
