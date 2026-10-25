const NAMES = [
  { vi: 'Nhịp còn sót lại', en: 'The Remaining Beat' },
  { vi: 'Bản tổng phổ viết dở', en: 'The Unfinished Score' }
];

export function localizeEnsembleName(value, language = 'vi') {
  const name = NAMES.find((entry) => entry.vi === value || entry.en === value);
  return name ? name[language === 'en' ? 'en' : 'vi'] : value;
}
