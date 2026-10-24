const RAW_URL = (import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:5080/api';
// Normalize URL: remove trailing slashes and ensure it ends with /api
const cleanUrl = RAW_URL.replace(/\/+$/, '');
const API_BASE_URL = cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;

// When the archive server is down, stop knocking for a while instead of failing every call
let offlineUntil = 0;

function getPlayerToken() {
  const key = 'pm-player-token-v1';
  const saved = localStorage.getItem(key);
  if (/^[a-f0-9]{64}$/.test(saved || '')) return saved;

  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  localStorage.setItem(key, token);
  return token;
}

export async function apiRequest(endpoint, options = {}) {
  const { allow404, headers, ...fetchOptions } = options;
  if (Date.now() < offlineUntil) throw new Error('API offline');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers: { 'Content-Type': 'application/json', ...(headers || {}), 'X-Player-Token': getPlayerToken() },
      signal: controller.signal
    });
  } catch (err) {
    offlineUntil = Date.now() + 30000;
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  if (allow404 && (response.status === 404 || response.status === 204)) return null;
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  if (response.status === 204) return null;
  return response.json();
}

export default API_BASE_URL;
