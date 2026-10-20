import { create } from 'zustand';

export const useThemeStore = create((set) => {
  const initialMode = localStorage.getItem('pm-theme-mode') || 'dark';
  const initialLang = localStorage.getItem('pm-lang-mode') || 'vi';

  if (initialMode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    themeMode: initialMode,
    lang: initialLang, // 'vi' | 'bi' | 'en'
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
