import { create } from 'zustand';

export const useThemeStore = create((set) => {
  // One theme: the City is always at night
  const initialMode = 'dark';
  const readSetting = (key) => typeof localStorage === 'undefined' ? null : localStorage.getItem(key);
  const initialLang = readSetting('pm-lang-mode') || 'vi';
  const initialMotion = readSetting('pm-motion-mode') || 'system';
  const initialText = readSetting('pm-text-size') || 'md';
  const initialReadMode = readSetting('pm-read-mode') === 'compact' ? 'compact' : 'full';
  const initialGameplayMetrics = readSetting('pm-gameplay-metrics') === 'on';
  const initialPerfMode = readSetting('pm-perf-mode') === 'on';

  if (typeof document !== 'undefined') {
    if (initialMode === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    document.documentElement.dataset.motion = initialMotion;
    document.documentElement.dataset.text = initialText;
    document.documentElement.dataset.perf = initialPerfMode ? 'low' : 'high';
  }

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
    // Chronicle reading: 'full' shows every entry in full, 'compact' folds resolved routine entries to their first sentence
    readMode: initialReadMode,
    setReadMode: (next) => {
      localStorage.setItem('pm-read-mode', next);
      set({ readMode: next });
    },
    perfMode: initialPerfMode,
    setPerfMode: (enabled) => {
      localStorage.setItem('pm-perf-mode', enabled ? 'on' : 'off');
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.perf = enabled ? 'low' : 'high';
      }
      set({ perfMode: enabled });
    },
    gameplayMetricsEnabled: initialGameplayMetrics,
    setGameplayMetrics: (enabled) => {
      localStorage.setItem('pm-gameplay-metrics', enabled ? 'on' : 'off');
      set({ gameplayMetricsEnabled: enabled });
    },
    cycleTextSize: () =>
      set((state) => {
        const next = { md: 'lg', lg: 'xl', xl: 'md' }[state.textSize] || 'md';
        localStorage.setItem('pm-text-size', next);
        document.documentElement.dataset.text = next;
        return { textSize: next };
      }),
    setMotion: (next) => {
      localStorage.setItem('pm-motion-mode', next);
      document.documentElement.dataset.motion = next;
      set({ motionMode: next });
    },
    setTextSize: (next) => {
      localStorage.setItem('pm-text-size', next);
      document.documentElement.dataset.text = next;
      set({ textSize: next });
    },
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
