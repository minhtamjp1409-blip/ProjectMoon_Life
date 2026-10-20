import { apiRequest } from './baseAPI';

export const cityArchiveAPI = {
  checkHealth: () => apiRequest('/health'),

  getArchiveSnapshot: () => apiRequest('/archive'),

  saveMemorial: (memorial) =>
    apiRequest('/archive/memorial', {
      method: 'POST',
      body: JSON.stringify(memorial)
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

  clearRunState: (slot = 'main') => apiRequest(`/state/${slot}`, { method: 'DELETE', allow404: true })
};

export default cityArchiveAPI;
