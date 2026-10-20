const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_API_URL) || 'http://localhost:5080/api';

// When the archive server is down, stop knocking for a while instead of failing every call
let offlineUntil = 0;

export async function apiRequest(endpoint, options = {}) {
  const { allow404, ...fetchOptions } = options;
  if (Date.now() < offlineUntil) throw new Error('API offline');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...(fetchOptions.headers || {}) },
      signal: controller.signal,
      ...fetchOptions
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
