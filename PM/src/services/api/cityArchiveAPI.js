import { apiRequest } from './baseAPI.js';

export const cityArchiveAPI = {
  checkHealth: () => apiRequest('/health'),

  getArchiveSnapshot: () => apiRequest('/archive'),

  saveMemorial: (memorial) =>
    apiRequest('/archive/memorial', {
      method: 'POST',
      body: JSON.stringify(memorial)
    }),

  deleteMemorial: (seed, age) =>
    apiRequest(`/archive/memorial?seed=${encodeURIComponent(seed)}&age=${age}`, {
      method: 'DELETE'
    }),

  clearMemorials: () =>
    apiRequest('/archive/memorials', {
      method: 'DELETE'
    }),

  syncCodex: (keys) =>
    apiRequest('/archive/codex', {
      method: 'POST',
      body: JSON.stringify({ keys })
    }),

  saveCustomEvent: (customEvent) =>
    apiRequest('/archive/custom-event', {
      method: 'POST',
      body: JSON.stringify(customEvent)
    }),

  // The life in progress, so it can be resumed after leaving mid-run
  getRunState: (slot = 'main') => apiRequest(`/state/${slot}`, { allow404: true }),

  saveRunState: (payload, slot = 'main') =>
    apiRequest(`/state/${slot}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),

  clearRunState: (slot = 'main') => apiRequest(`/state/${slot}`, { method: 'DELETE', allow404: true }),

  recordGameplaySample: (sample) => apiRequest('/telemetry/gameplay', { method: 'POST', body: JSON.stringify(sample) })
};

export default cityArchiveAPI;
