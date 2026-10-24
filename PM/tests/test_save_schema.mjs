import assert from 'node:assert/strict';
import { migrateRun, SAVE_VERSION } from '../src/engine/saveSchema.js';

const base = { char: { seed: 's', alive: true, age: 30, pendingLead: { age: 29, offers: [] } }, yearProgress: 0.4 };
const old = migrateRun(base);
assert.equal(old.version, SAVE_VERSION);
assert.equal(old.char.pendingLead, null, 'a stale draft from an old save is dropped');
assert.deepEqual(old.char.scars, []);
assert.equal(base.char.pendingLead.age, 29, 'the input save is not mutated');
assert.equal(migrateRun({ ...base, version: SAVE_VERSION }).char.pendingLead, null, 'a current save also drops a stale draft');
assert.equal(migrateRun({ version: SAVE_VERSION, char: { seed: 's', alive: true, age: 30, pendingLead: { age: 30, offers: [] } } }).char.pendingLead, null, 'an empty current draft cannot block play');
const validDraft = { age: 30, offers: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] };
assert.deepEqual(migrateRun({ version: SAVE_VERSION, char: { seed: 's', alive: true, age: 30, pendingLead: validDraft } }).char.pendingLead, validDraft, 'a valid current draft stays available');
assert.equal(migrateRun({ ...base, version: SAVE_VERSION + 1 }), null, 'a save from a newer build is refused');
assert.equal(migrateRun({ char: { seed: 's', alive: false } }), null, 'a dead run does not resume');
assert.equal(migrateRun(null), null);
console.log('Save schema: migration, stale draft, future version and dead run passed.');
