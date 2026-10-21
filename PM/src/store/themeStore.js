import { create } from 'zustand';

export const useThemeStore = create((set) => {
  const initialMode = localStorage.getItem('pm-theme-mode') || 'dark';
  const initialLang = localStorage.getItem('pm-lang-mode') || 'vi';
  const initialMotion = localStorage.getItem('pm-motion-mode') || 'system';

  if (initialMode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  document.documentElement.dataset.motion = initialMotion;

  return {
    themeMode: initialMode,
    // 'system' follows the OS reduced-motion setting; 'full' and 'reduced' override it.
    // Windows turns reduced motion on with "Animation effects" off, often without meaning to.
    motionMode: initialMotion,
    cycleMotion: () =>
      set((state) => {
        const next = { system: 'full', full: 'reduced', reduced: 'system' }[state.motionMode] || 'system';
        localStorage.setItem('pm-motion-mode', next);
        document.documentElement.dataset.motion = next;
        return { motionMode: next };
      }),
    lang: initialLang, // 'vi' | 'bi' | 'en'
    sidebarCollapsed: null, // null = auto (collapses during active chronicle play), true/false = user override
    mobileDossierOpen: false,
    setMobileDossierOpen: (open) => set({ mobileDossierOpen: open }),
    toggleSidebar: (currentEffective) =>
      set(() => ({
        sidebarCollapsed: !currentEffective
      })),
    setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),
    toggleTheme: () =>
      set((state) => {
        const nextMode = state.themeMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('pm-theme-mode', nextMode);
        if (nextMode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { themeMode: nextMode };
      }),
    setLang: (lang) =>
      set(() => {
        localStorage.setItem('pm-lang-mode', lang);
        return { lang };
      })
  };
});

export default useThemeStore;
