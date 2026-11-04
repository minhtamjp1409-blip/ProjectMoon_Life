// zustand's `create` for server renders in tests: the server snapshot is the live state, not the
// state the store was created with, so a test can set a state and render it. Same API otherwise.
import React from 'react';
import { createStore } from 'zustand/vanilla';

const identity = (arg) => arg;

export function useStore(api, selector = identity) {
  const read = React.useCallback(() => selector(api.getState()), [api, selector]);
  return React.useSyncExternalStore(api.subscribe, read, read);
}

const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};

export const create = (createState) => (createState ? createImpl(createState) : createImpl);
