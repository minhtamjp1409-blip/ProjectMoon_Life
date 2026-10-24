import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:net';
import { mkdtemp, rm, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dll = join(root, 'bin', 'Debug', 'net8.0', 'ProjectMoon.Api.dll');
const dataRoot = await mkdtemp(join(tmpdir(), 'pm-archive-isolation-'));
const tokenA = 'a'.repeat(64);
const tokenB = 'b'.repeat(64);
const port = await new Promise((resolve, reject) => {
  const server = createServer();
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => {
    const freePort = server.address().port;
    server.close(() => resolve(freePort));
  });
});
const base = `http://127.0.0.1:${port}/api`;
let child;

async function start() {
  child = spawn('dotnet', [dll, '--urls', `http://127.0.0.1:${port}`, '--contentRoot', dataRoot], {
    cwd: root,
    env: { ...process.env, ASPNETCORE_ENVIRONMENT: 'Production' },
    stdio: 'ignore'
  });
  for (let i = 0; i < 80; i++) {
    if (child.exitCode !== null) throw new Error(`Backend exited with ${child.exitCode}`);
    try {
      if ((await fetch(`${base}/health`)).ok) return;
    } catch { /* still starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Backend did not start');
}

async function stop() {
  if (!child) return;
  const process = child;
  child = null;
  if (process.exitCode !== null) return;
  await new Promise((resolve) => {
    process.once('exit', resolve);
    process.kill();
    setTimeout(resolve, 3000).unref();
  });
}

const request = (path, token, options = {}) => fetch(`${base}${path}`, {
  ...options,
  headers: { 'Content-Type': 'application/json', ...(token ? { 'X-Player-Token': token } : {}) }
});

try {
  await start();
  const preflight = await fetch(`${base}/archive`, {
    method: 'OPTIONS',
    headers: {
      Origin: 'https://project-moon-life-five.vercel.app',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'x-player-token,content-type'
    }
  });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-origin'), '*');
  assert.equal((await request('/state/main')).status, 401);
  assert.equal((await request('/archive')).status, 401);
  assert.equal((await request('/state/main', 'invalid')).status, 401);

  assert.equal((await request('/state/main', tokenA, {
    method: 'PUT',
    body: JSON.stringify({ char: { seed: 'player-a', alive: true }, yearProgress: 12, version: 3, rngState: [0, 4294967295, 123456789, 77], activePlayMs: 61000 })
  })).status, 204);
  assert.equal((await request('/state/main', tokenB)).status, 404);
  assert.equal((await request('/state/main', tokenB, { method: 'DELETE' })).status, 404);
  assert.equal((await request('/state/main', tokenA)).status, 200);
  assert.equal((await request('/telemetry/gameplay')).status, 401);
  const sample = { runKey: 'run-a', age: 34, minutes: 12, firstDungeonOutcome: 'dead' };
  assert.equal((await request('/telemetry/gameplay', tokenA, { method: 'POST', body: JSON.stringify(sample) })).status, 204);
  assert.equal((await request('/telemetry/gameplay', tokenA, { method: 'POST', body: JSON.stringify(sample) })).status, 204);
  assert.equal((await request('/telemetry/gameplay', tokenB, { method: 'POST', body: JSON.stringify({ ...sample, runKey: 'run-b', firstDungeonOutcome: 'none' }) })).status, 204);

  assert.equal((await request('/archive/codex', tokenA, {
    method: 'POST', body: JSON.stringify({ keys: ['player_a_only'] })
  })).status, 200);
  const archiveB = await (await request('/archive', tokenB)).json();
  assert(!archiveB.globalCodex.includes('player_a_only'));
  assert.equal((await request('/archive/memorials', tokenB, { method: 'DELETE' })).status, 200);
  const archiveA = await (await request('/archive', tokenA)).json();
  assert(archiveA.globalCodex.includes('player_a_only'));
  await new Promise((resolve) => setTimeout(resolve, 1300));
  await stop();

  await start();
  const persistedResponse = await request('/state/main', tokenA);
  assert.equal(persistedResponse.status, 200, 'player A save should survive restart');
  const savedA = await persistedResponse.json();
  assert.equal(savedA.char.seed, 'player-a');
  assert.deepEqual(savedA.rngState, [0, 4294967295, 123456789, 77]);
  assert.equal(savedA.activePlayMs, 61000);
  const playerKey = createHash('sha256').update(tokenA).digest('hex');
  const playerBKey = createHash('sha256').update(tokenB).digest('hex');
  const metricsA = JSON.parse(await readFile(join(dataRoot, 'Data', 'players', playerKey, 'gameplay_metrics.json'), 'utf8'));
  const metricsB = JSON.parse(await readFile(join(dataRoot, 'Data', 'players', playerBKey, 'gameplay_metrics.json'), 'utf8'));
  assert.equal(metricsA.lives, 1);
  assert.equal(metricsA.firstDungeonDeaths, 1);
  assert.equal(metricsB.firstDungeonDeaths, 0);
  assert(!JSON.stringify(metricsA).includes('run-a'), 'the metrics file stores only a hash of the run key');
  assert.equal((await request('/state/main', tokenB)).status, 404);

  assert.equal((await request('/state/main', tokenA, {
    method: 'PUT', body: JSON.stringify({ char: { seed: 'player-a-new', alive: true }, yearProgress: 15 })
  })).status, 204);
  await new Promise((resolve) => setTimeout(resolve, 1300));
  await stop();
  await writeFile(join(dataRoot, 'Data', 'players', playerKey, 'run_state.json'), '{broken');

  await start();
  const recovered = await (await request('/state/main', tokenA)).json();
  assert.equal(recovered.char.seed, 'player-a');
  console.log('Backend archives: isolated tokens, rejected anonymous access, restart and backup recovery passed.');
} finally {
  await stop();
  const safePrefix = join(tmpdir(), 'pm-archive-isolation-');
  if (!dataRoot.startsWith(safePrefix) || dirname(dataRoot) !== tmpdir() || dataRoot.endsWith(sep)) {
    throw new Error(`Refusing to remove unexpected test directory: ${dataRoot}`);
  }
  await rm(dataRoot, { recursive: true, force: true });
}
