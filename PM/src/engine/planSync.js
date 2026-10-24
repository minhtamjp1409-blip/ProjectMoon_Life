export function createPlanSynchronizer({ plan, clone, createRng }) {
  let latestRequest = 0;
  return async (read, apply) => {
    const request = ++latestRequest;
    const before = read();
    const source = before.char;
    if (!before.inRun || !source?.alive) return false;
    const snapshot = clone(source);
    const synced = await plan(snapshot, createRng(`${source.seed}:planner:${source.age}`));
    const current = read();
    // A response only belongs to the untouched state it was requested for.
    if (request !== latestRequest || !current.inRun || current.char !== source || current.yearProgress !== before.yearProgress) return false;
    apply(source, synced);
    return true;
  };
}
