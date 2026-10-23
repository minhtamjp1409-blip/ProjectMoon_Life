/**
 * Project Moon Life - Color Fixer Registry & Procedural Bestowal Engine
 * 
 * Rules according to Project Moon lore:
 * 1. Hana Association Section 1 assigns the Color Title based on prowess and signature.
 * 2. Fixers DO NOT choose their own title.
 * 3. Title format is universally in ENGLISH across all language modes (e.g. Red Mist, Black Silence).
 * 4. Title format: [Color] + [Epithet].
 * 5. MUST NEVER collide with canonical Project Moon Colors:
 *    - Red Mist (Kali)
 *    - Red Gaze (Vergilius)
 *    - Blue Reverberation (Argalia)
 *    - Purple Tear (Iori)
 *    - Black Silence (Roland & Angelica)
 *    - Vermilion Cross (The Vermilion Cross)
 *    - Indigo Elder (The Indigo Elder)
 */

export const CANON_COLOR_BLACKLIST = new Set([
  'RED MIST',
  'RED GAZE',
  'BLUE REVERBERATION',
  'PURPLE TEAR',
  'BLACK SILENCE',
  'VERMILION CROSS',
  'INDIGO ELDER'
]);

export const COLOR_PALETTE = [
  { name: 'Vermilion', hex: '#e1341e', glow: 'rgba(225, 52, 30, 0.45)', viNote: 'Chu Sa' },
  { name: 'Azure', hex: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.45)', viNote: 'Lam Biển' },
  { name: 'Cobalt', hex: '#2563eb', glow: 'rgba(37, 99, 235, 0.45)', viNote: 'Cobalt Đậm' },
  { name: 'Crimson', hex: '#b91c1c', glow: 'rgba(185, 28, 28, 0.45)', viNote: 'Huyết Sắc' },
  { name: 'Scarlet', hex: '#dc2626', glow: 'rgba(220, 38, 38, 0.45)', viNote: 'Đỏ Thắm' },
  { name: 'Amber', hex: '#d97706', glow: 'rgba(217, 119, 6, 0.45)', viNote: 'Hổ Phách' },
  { name: 'Yellow', hex: '#eab308', glow: 'rgba(234, 179, 8, 0.45)', viNote: 'Hoàng Kim' },
  { name: 'Ochre', hex: '#b45309', glow: 'rgba(180, 83, 9, 0.45)', viNote: 'Hoàng Thổ' },
  { name: 'Jade', hex: '#059669', glow: 'rgba(5, 150, 105, 0.45)', viNote: 'Ngọc Bích' },
  { name: 'Viridian', hex: '#0d9488', glow: 'rgba(13, 148, 136, 0.45)', viNote: 'Xanh Rêu' },
  { name: 'Violet', hex: '#7c3aed', glow: 'rgba(124, 58, 237, 0.45)', viNote: 'Tím Tinh Tú' },
  { name: 'Indigo', hex: '#4338ca', glow: 'rgba(67, 56, 202, 0.45)', viNote: 'Chàm Thẫm' },
  { name: 'Purple', hex: '#9333ea', glow: 'rgba(147, 51, 234, 0.45)', viNote: 'Tím Vương Giả' },
  { name: 'Silver', hex: '#94a3b8', glow: 'rgba(148, 163, 184, 0.45)', viNote: 'Bạc Sắc' },
  { name: 'Ash', hex: '#71717a', glow: 'rgba(113, 113, 122, 0.45)', viNote: 'Tro Tàn' },
  { name: 'Black', hex: '#27272a', glow: 'rgba(39, 39, 42, 0.6)', viNote: 'Hắc Ám' },
  { name: 'White', hex: '#f8fafc', glow: 'rgba(248, 250, 252, 0.55)', viNote: 'Bạch Ngân' }
];

export const COLOR_EPITHETS = [
  'Gale',
  'Fang',
  'Needle',
  'Tide',
  'Frost',
  'Thunder',
  'Eclipse',
  'Blade',
  'Edge',
  'Bell',
  'Shroud',
  'Spark',
  'Dusk',
  'Dawn',
  'Coil',
  'Wave',
  'Thorn',
  'Mirror',
  'Grasp',
  'Shadow',
  'Talon',
  'Spire',
  'Veil',
  'Pulse',
  'Tempest',
  'Crest',
  'Flock',
  'Beacon'
];

/**
 * Procedurally bestows an official Hana Color Title.
 * Guarantees NO collisions with canonical Project Moon Colors.
 *
 * @param {Object} char - The character receiving the title
 * @returns {{ title: string, color: string, glow: string, colorName: string, epithet: string }}
 */
export function bestowHanaColorTitle(char = null) {
  // Use character seed / history if present for deterministic yet varied roll
  const seedString = `${char?.name || ''}_${char?.seed || ''}_${char?.age || 28}_${Date.now()}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash * 31 + seedString.charCodeAt(i)) & 0xffffffff;
  }

  const availableColors = [...COLOR_PALETTE];
  const availableEpithets = [...COLOR_EPITHETS];

  // Try permutations until we find a title not in the canon blacklist
  for (let attempt = 0; attempt < 50; attempt++) {
    const colorIdx = Math.abs((hash + attempt * 7) % availableColors.length);
    const epithetIdx = Math.abs(((hash >> 3) + attempt * 13) % availableEpithets.length);

    const colorObj = availableColors[colorIdx];
    const epithet = availableEpithets[epithetIdx];
    const fullTitle = `${colorObj.name} ${epithet}`;

    if (!CANON_COLOR_BLACKLIST.has(fullTitle.toUpperCase())) {
      return {
        title: fullTitle, // Always English
        colorName: colorObj.name,
        epithet: epithet,
        color: colorObj.hex,
        glow: colorObj.glow,
        conferredAtAge: char?.age || 28
      };
    }
  }

  // Safe fallback guaranteed to not be in canon
  return {
    title: 'Vermilion Gale',
    colorName: 'Vermilion',
    epithet: 'Gale',
    color: '#e1341e',
    glow: 'rgba(225, 52, 30, 0.45)',
    conferredAtAge: char?.age || 28
  };
}
