import { create } from 'zustand';

export const useThemeStore = create((set) => {
  // One theme: the City is always at night
  const initialMode = 'dark';
  const initialLang = localStorage.getItem('pm-lang-mode') || 'vi';
  const initialMotion = localStorage.getItem('pm-motion-mode') || 'system';
  const initialText = localStorage.getItem('pm-text-size') || 'md';

  if (initialMode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  document.documentElement.dataset.motion = initialMotion;
  document.documentElement.dataset.text = initialText;

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
    // Reading size for story text: 'md' | 'lg' | 'xl'
    textSize: initialText,
    cycleTextSize: () =>
      set((state) => {
        const next = { md: 'lg', lg: 'xl', xl: 'md' }[state.textSize] || 'md';
        localStorage.setItem('pm-text-size', next);
        document.documentElement.dataset.text = next;
        return { textSize: next };
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
    toggleTheme: () => {},
    setLang: (lang) =>
      set(() => {
        localStorage.setItem('pm-lang-mode', lang);
        return { lang };
      })
  };
});

export default useThemeStore;
