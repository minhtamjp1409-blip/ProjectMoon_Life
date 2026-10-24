import assert from 'node:assert/strict';

const values = new Map();
globalThis.localStorage = {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value)
};

const sent = [];
globalThis.fetch = async (_url, options) => {
  sent.push(options);
  return { ok: true, status: 200, json: async () => ({ status: 'ONLINE' }) };
};

const { apiRequest } = await import('../src/services/api/baseAPI.js');
await apiRequest('/health');
await apiRequest('/health', { headers: { 'X-Test-Header': 'retained' } });

const token = values.get('pm-player-token-v1');
assert.match(token, /^[a-f0-9]{64}$/);
assert.equal(sent[0].headers['X-Player-Token'], token);
assert.equal(sent[1].headers['X-Player-Token'], token);
assert.equal(sent[1].headers['X-Test-Header'], 'retained');

const reloaded = await import('../src/services/api/baseAPI.js?fresh=1');
await reloaded.apiRequest('/health');
assert.equal(sent[2].headers['X-Player-Token'], token);

values.delete('pm-player-token-v1');
localStorage.setItem = () => { throw new Error('Storage full'); };
await assert.rejects(apiRequest('/health'), /Storage full/);
assert.equal(sent.length, 3, 'an unpersisted token must never be sent as a recoverable save identity');

console.log('Player token: generated once, stored across reloads and sent with API requests.');
