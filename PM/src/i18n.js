import { useThemeStore } from './store/themeStore';

// 'vi' and 'bi' read Vietnamese first; 'bi' also shows the English line where a screen offers one.
export function pick(lang, vi, en) {
  if (lang === 'en') return en || vi;
  return vi || en;
}

export function useT() {
  const lang = useThemeStore((s) => s.lang);
  const t = (vi, en) => pick(lang, vi, en);
  return { t, lang, bilingual: lang === 'bi' };
}
