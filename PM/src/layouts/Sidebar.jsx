import React from 'react';
import { Dropdown, Tooltip } from 'antd';
import {
  ScrollText,
  GitMerge,
  BookOpen,
  GitBranch,
  Trophy,
  Monitor,
  Sparkles,
  Pause,
  Type
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { pick } from '../i18n';

export const NAV_ITEMS = [
  {
    key: '/',
    icon: ScrollText,
    vi: 'Biên niên',
    en: 'Chronicle',
    shortVi: 'Biên niên',
    shortEn: 'Chronicle'
  },
  {
    key: '/weaver-ai',
    icon: GitMerge,
    vi: 'Khung cửi',
    en: 'The Loom',
    shortVi: 'Khung cửi',
    shortEn: 'Loom'
  },
  {
    key: '/glossary',
    icon: BookOpen,
    vi: 'Từ điển thế giới',
    en: 'World archive',
    shortVi: 'Thế giới',
    shortEn: 'World'
  },
  {
    key: '/bloodline',
    icon: GitBranch,
    vi: 'Huyết thống',
    en: 'Bloodline',
    shortVi: 'Gia phả',
    shortEn: 'Bloodline'
  },
  { key: '/codex', icon: Trophy, vi: 'Thành tựu', en: 'Codex', shortVi: 'Thành tựu', shortEn: 'Codex' }
];
export const LANG_OPTIONS = [
  { key: 'vi', short: 'VI', label: 'Tiếng Việt' },
  { key: 'bi', short: 'VI+EN', label: 'Song ngữ Việt / Anh' },
  { key: 'en', short: 'EN', label: 'English' }
];
export const BrandMark = ({ size = 36 }) => (
  <img src="/favicon.svg" width={size} height={size} alt="" aria-hidden="true" />
);

export const LangMenu = ({ children, placement = 'topLeft' }) => {
  const { lang, setLang } = useThemeStore();
  return (
    <Dropdown
      trigger={['click']}
      placement={placement}
      menu={{
        selectable: true,
        selectedKeys: [lang],
        items: LANG_OPTIONS.map((o) => ({ key: o.key, label: o.label })),
        onClick: ({ key }) => setLang(key)
      }}
    >
      {children}
    </Dropdown>
  );
};

const MOTION_LABELS = {
  system: ['Chuyển động: theo hệ thống', 'Motion: follow system'],
  full: ['Chuyển động: đầy đủ', 'Motion: full'],
  reduced: ['Chuyển động: giảm', 'Motion: reduced']
};
const MOTION_ICONS = { system: Monitor, full: Sparkles, reduced: Pause };

/** Cycles system → full → reduced. Full overrides an OS that has animations turned off. */
export function MotionToggle({ lang, placement = 'top' }) {
  const motionMode = useThemeStore((s) => s.motionMode);
  const cycleMotion = useThemeStore((s) => s.cycleMotion);
  const label = pick(lang, ...MOTION_LABELS[motionMode]);
  const Icon = MOTION_ICONS[motionMode] || Monitor;
  return (
    <Tooltip title={`${label}. ${pick(lang, 'Bấm để đổi.', 'Click to change.')}`} placement={placement}>
      <button className="app-tool" onClick={cycleMotion} aria-label={label}>
        <Icon size={17} aria-hidden="true" />
      </button>
    </Tooltip>
  );
}

const TEXT_LABELS = {
  md: ['Cỡ chữ: vừa', 'Text size: medium'],
  lg: ['Cỡ chữ: lớn', 'Text size: large'],
  xl: ['Cỡ chữ: rất lớn', 'Text size: extra large']
};

/** Story text is the product, so its size is a setting and not an afterthought. */
export function TextSizeToggle({ lang, placement = 'top' }) {
  const textSize = useThemeStore((s) => s.textSize);
  const cycleTextSize = useThemeStore((s) => s.cycleTextSize);
  const label = pick(lang, ...TEXT_LABELS[textSize]);
  return (
    <Tooltip title={`${label}. ${pick(lang, 'Bấm để đổi.', 'Click to change.')}`} placement={placement}>
      <button className="app-tool" onClick={cycleTextSize} aria-label={label}>
        <Type size={textSize === 'md' ? 15 : textSize === 'lg' ? 17 : 19} aria-hidden="true" />
      </button>
    </Tooltip>
  );
}
