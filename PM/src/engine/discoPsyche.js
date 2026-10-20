// ============================================================================
// DISCO PSYCHE ENGINE: Project Moon x Disco Elysium Narrative Intelligence
// Generates internal psyche voice interjections, dynamic skill checks (Red/White),
// and modifier breakdowns based on character stats, scars, and past deeds.
// ============================================================================

export const PSYCHE_FACULTIES = {
  VOLITION: {
    id: 'volition',
    nameVi: 'Ý Chí Kiên Định · Volition',
    nameEn: 'Stoic Volition · Ayin',
    color: '#63b3ed', // Cobalt ice blue
    icon: '🛡️',
    mottoVi: 'Nghiến răng mà đứng. Đừng để vầng dương hay bóng đêm nuốt chửng',
    mottoEn: 'Grit your teeth. Yield not to the blinding sun nor the abyss'
  },
  CARMEN: {
    id: 'carmen',
    nameVi: 'Vầng Thái Dương Carmen · Inland Empire',
    nameEn: 'Carmen’s Blinding Sun · Inland Empire',
    color: '#ecc94b', // Blinding golden sun
    icon: '☀️',
    mottoVi: 'Buông tay ra. Bạn không cần làm người tử tế cho ai xem',
    mottoEn: 'Let go. You owe nobody a hollow human shape'
  },
  SURVIVAL: {
    id: 'survival',
    nameVi: 'Bản Năng Sinh Tồn · Half-Light',
    nameEn: 'Backstreets Instinct · Half-Light',
    color: '#f56565', // Danger crimson
    icon: '⚡',
    mottoVi: 'Tay trong túi áo. Kẻ chớp mắt trước là kẻ nằm xuống',
    mottoEn: 'Hand on your blade. The first to blink goes down'
  },
  LOGIC: {
    id: 'logic',
    nameVi: 'Toan Tính The City · Interfacing & Logic',
    nameEn: 'City Calculus · Logic & Taboo',
    color: '#4fd1c5', // Cold teal
    icon: '⚖️',
    mottoVi: 'Mỗi hơi thở đều tính bằng Ahn, mỗi lỗi lầm đều trả bằng đầu',
    mottoEn: 'Every breath costs Ahn; every slip pays with blood'
  },
  DRAMA: {
    id: 'drama',
    nameVi: 'Khí Phách Nghệ Thuật & Hiệp Sĩ · Drama',
    nameEn: 'Poetic Passion · Drama & Savoir Faire',
    color: '#b794f4', // Royal purple / La Mancha
    icon: '🎭',
    mottoVi: 'Nếu phải ngã xuống, hãy để lũ khán giả phía dưới phải nín thở',
    mottoEn: 'If fall you must, leave the gallery breathless'
  }
};

/**
 * Determines which inner faculty voice chimes in for this moment
 */
export function getPsycheInterjection(char, event, lang = 'vi') {
  if (!char || !event) return null;

  const eventText = `${event.vi || ''} ${event.en || ''}`.toLowerCase();
  const scars = char.scars || [];
  const flags = char.flags || [];
  const sanity = char.stats?.sanity ?? 50;
  const health = char.stats?.health ?? 50;
  const resonance = char.resonance || 0;
  const taboo = char.taboo || 0;

  // 1. Carmen's Sun (Inland Empire / E.G.O & Distortion)
  if (event.id.includes('carmen') || resonance >= 50 || sanity <= 18) {
    return {
      faculty: PSYCHE_FACULTIES.CARMEN,
      textVi: 'Hơi ấm từ vầng thái dương của The Light phả vào sau gáy bạn, vừa dịu dàng vừa ngột ngạt: "Này. Sao phải gượng gạo chịu đau đến thế? Ở The City này, ai cũng tự cứu lấy mình cả thôi. Bạn không cần làm một con người tử tế cho ai xem nữa. Cứ buông tay ra. Hãy trở thành điều bạn muốn."',
      textEn: 'A suffocating warmth from The Light’s sun breaths on your neck, soft and intimate: “Hey. Why strain so hard to endure? In this City, everyone only saves themselves. You don’t need to play the decent human for anyone. Just let go. Become what you want.”'
    };
  }

  // 2. Ayin's Stoic Volition (Holding onto humanity)
  if (event.id.includes('crossroad_18') || sanity >= 55 && (event.major || scars.length >= 2)) {
    return {
      faculty: PSYCHE_FACULTIES.VOLITION,
      textVi: 'Một giọng nói lạnh và trầm vang lên từ lồng ngực: "Đứng vững. Đau thì nghiến răng lại. Máu chảy hay sẹo rạch đều là chứng tích bạn vẫn là một con người. Một khi buông tay, bạn sẽ không bao giờ tìm lại được hình dáng của chính mình."',
      textEn: 'A cold, steady murmur echoes in your ribs: “Stand firm. When it hurts, grit your teeth. Bleeding flesh and jagged scars are proof you are still human. Once you let go, you will never reclaim your own shape.”'
    };
  }

  // 3. Backstreets Primal Instinct (Half-Light / Sweepers / Combat)
  if (eventText.includes('sweeper') || eventText.includes('máu') || eventText.includes('giết') || health <= 35 || event.id.includes('req_')) {
    return {
      faculty: PSYCHE_FACULTIES.SURVIVAL,
      textVi: 'Cơn co giật quen thuộc dưới khớp ngón tay: "Tay trong túi áo. Rút dao ra trước khi gã kia kịp chớp mắt. Ở cái hẻm này, đứa nào mở miệng phân bua trước thường là đứa nằm xuống trước khi đồng hồ điểm 3 giờ 13."',
      textEn: 'A familiar twitch tightens your knuckles: “Hand inside the coat. Draw your steel before they blink. In these alleys, the first one to start explaining is the one on the pavement before 3:13.”'
    };
  }

  // 4. Poetic Passion / Drama (Bloodfiends, La Mancha, The Ring, Hongyuan)
  if (eventText.includes('lamancha') || eventText.includes('bloodfiend') || eventText.includes('ring') || flags.includes('WildHuntRider')) {
    return {
      faculty: PSYCHE_FACULTIES.DRAMA,
      textVi: 'Cơn rùng mình chạy dọc sống lưng: "Một nụ cười méo mó sau tấm mặt nạ rỉ sét. Một đường kiếm sắc lẹm không thừa một giọt máu. Nếu phải gục ngã ở cái xó này, ít nhất hãy để lũ người đứng xem phía dưới phải nín thở."',
      textEn: 'A shudder ripples down your spine: “A twisted grin behind a rusted visor. A stroke of steel that spills not an idle drop. If fall you must in this gutter, at least leave the spectators breathless.”'
    };
  }

  // 5. City Logic & Taboo (Ahn, Contracts, Hana, Arbiters)
  if (taboo >= 1 || char.job === 'Fixer' || char.job === 'Wing Employee' || (char.stats?.wealth || 0) >= 45) {
    return {
      faculty: PSYCHE_FACULTIES.LOGIC,
      textVi: 'Đầu óc bạn tự động nhảy số: "Tính lại tiền trong túi đi. Một băng đạn xưởng rèn có giá ba ngày lương. Còn nếu vi phạm luật của The Head, đến tiền làm đám ma cũng chẳng còn ai đứng ra mà thu."',
      textEn: 'Your mind tallies the ledger without blinking: “Count the coins in your pocket. A box of workshop ammo costs three days of labor. Step over the Taboo, and there won’t even be anyone left to collect your burial fee.”'
    };
  }

  // Default Stoic Insight
  return {
    faculty: PSYCHE_FACULTIES.VOLITION,
    textVi: 'Bạn chững lại nửa nhịp: "Ở The City, bước chân sau luôn phải trả tiền cho vết máu của bước chân trước."',
    textEn: 'You pause half a beat: “In The City, your next step always pays for the blood of the last.”'
  };
}

/**
 * Calculates Disco Elysium style skill check metadata for a choice
 */
export function evaluateDiscoChoiceCheck(choice, char) {
  const rawOutcomes = choice.outcomes || choice.out;
  if (!Array.isArray(rawOutcomes) || rawOutcomes.length <= 1) {
    return null; // Deterministic choice
  }

  const isRedCheck = Boolean(
    choice.openEgoModal ||
    choice.openColorModal ||
    choice.flagsAdd?.includes('ColorFixer') ||
    choice.flagsAdd?.includes('EGOAwakened') ||
    choice.flagsAdd?.includes('Distorted') ||
    choice.scarsAdd?.length > 0 ||
    rawOutcomes.some(o => o.flagsAdd?.includes('ColorFixer') || o.flagsAdd?.includes('EGOAwakened') || o.flagsAdd?.includes('Distorted') || o.deathCauseVi)
  );

  // Compute Base Success Percentage from prime outcome weight
  const primeOutcome = rawOutcomes[0];
  const totalW = rawOutcomes.reduce((s, o) => s + (o.w || 50), 0);
  let basePct = Math.round(((primeOutcome.w || 50) / totalW) * 100);

  const modifiers = [];

  // 1. Shin / E.G.O Awakening mastery
  if (char.flags?.includes('ShinAwakened') || char.flags?.includes('EGOAwakened')) {
    basePct += 14;
    modifiers.push({ labelVi: '+14% Thức Tỉnh Shin & Bản Ngã', labelEn: '+14% Shin / E.G.O Mastery', pos: true });
  }

  // 2. Battle Scars & Calamity Experience
  if (char.scars?.some(s => s.includes('Star of the City') || s.includes('Calamity') || s.includes('Vết sẹo'))) {
    basePct += 10;
    modifiers.push({ labelVi: '+10% Tôi Luyện Từ Vết Sẹo', labelEn: '+10% Calamity Scar Hardening', pos: true });
  }

  // 3. High Sanity / Mental Fortitude
  const sanity = char.stats?.sanity ?? 50;
  if (sanity >= 65) {
    basePct += 8;
    modifiers.push({ labelVi: '+8% Tâm Trí Vững Vàng', labelEn: '+8% High Sanity Focus', pos: true });
  } else if (sanity <= 18) {
    basePct -= 15;
    modifiers.push({ labelVi: '-15% Tâm Trí Rối Loạn', labelEn: '-15% Critical Sanity Collapse', pos: false });
  }

  // 4. Physical Wounds & Exhaustion
  const health = char.stats?.health ?? 50;
  if (health <= 25) {
    basePct -= 12;
    modifiers.push({ labelVi: '-12% Thương Tật Nặng', labelEn: '-12% Severe Physical Trauma', pos: false });
  }

  // 5. Fixer Seniority & Merit
  if (char.job === 'Fixer' && (char.fixerGrade || 9) <= 3) {
    basePct += 8;
    modifiers.push({ labelVi: `+8% Fixer Grade ${char.fixerGrade}`, labelEn: `+8% Grade ${char.fixerGrade} Experience`, pos: true });
  }

  const finalPct = Math.max(8, Math.min(94, basePct));

  return {
    isRedCheck,
    checkType: isRedCheck ? 'RED CHECK' : 'WHITE CHECK',
    badgeVi: isRedCheck ? 'THỬ THÁCH ĐỎ (Sinh Tử)' : 'KIỂM ĐỊNH (Kỹ Năng)',
    badgeEn: isRedCheck ? 'RED CHECK (Crucial)' : 'WHITE CHECK (Tactical)',
    successPct: finalPct,
    modifiers: modifiers.slice(0, 3)
  };
}
