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
    mottoVi: 'Giữ chặt nhân tính, không lùi bước trước hư vô',
    mottoEn: 'Anchor your humanity, yield not to oblivion'
  },
  CARMEN: {
    id: 'carmen',
    nameVi: 'Vầng Thái Dương Carmen · Inland Empire',
    nameEn: 'Carmen’s Blinding Sun · Inland Empire',
    color: '#ecc94b', // Blinding golden sun
    icon: '☀️',
    mottoVi: 'Yêu lấy chính mình, buông tay để bộc phát',
    mottoEn: 'Love thyself, let go and effloresce'
  },
  SURVIVAL: {
    id: 'survival',
    nameVi: 'Bản Năng Sinh Tồn · Half-Light',
    nameEn: 'Backstreets Instinct · Half-Light',
    color: '#f56565', // Danger crimson
    icon: '⚡',
    mottoVi: 'Ra đòn trước để sống sót, chớ tin kẻ mỉm cười',
    mottoEn: 'Strike first to survive, trust no smiling face'
  },
  LOGIC: {
    id: 'logic',
    nameVi: 'Toan Tính The City · Interfacing & Logic',
    nameEn: 'City Calculus · Logic & Taboo',
    color: '#4fd1c5', // Cold teal
    icon: '⚖️',
    mottoVi: 'Đo lường giá máu, Ahn và ánh mắt của Beholder',
    mottoEn: 'Weigh blood, Ahn, and the Beholder’s gaze'
  },
  DRAMA: {
    id: 'drama',
    nameVi: 'Khí Phách Hiệp Sĩ & Nghệ Thuật · Drama',
    nameEn: 'Poetic Passion · Drama & Savoir Faire',
    color: '#b794f4', // Royal purple / La Mancha
    icon: '🎭',
    mottoVi: 'Một màn kịch vĩ đại cần những nét cọ chấn động',
    mottoEn: 'A grand performance demands strokes that shake the sky'
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
      textVi: 'Một luồng nhiệt chói lòa từ vầng thái dương của The Light phả vào gáy bạn: "Sao phải chịu đựng đau đớn vì luật lệ của người khác? Hãy yêu lấy bản ngã của mình. Bạn có thể biến tất cả vết sẹo này thành sức mạnh tuyệt đối..."',
      textEn: 'A scorching radiance from The Light’s blinding sun breathes upon your neck: “Why endure agony for the sake of another’s rules? Love yourself. You can forge every scar into absolute power...”'
    };
  }

  // 2. Ayin's Stoic Volition (Holding onto humanity)
  if (event.id.includes('crossroad_18') || sanity >= 55 && (event.major || scars.length >= 2)) {
    return {
      faculty: PSYCHE_FACULTIES.VOLITION,
      textVi: 'Một khoảng lặng tĩnh mịch giữa tâm bão The City: "Giữ chặt đôi chân trên mặt đất. Đau đớn và những vết thương này là bằng chứng bạn vẫn đang sống như một con người. Đừng cúi đầu."',
      textEn: 'A resolute quiet anchors your chest amidst The City’s tempest: “Plant your feet firm upon the stone. This agony and these scars are proof you still walk as human. Bow to nothing.”'
    };
  }

  // 3. Backstreets Primal Instinct (Half-Light / Sweepers / Combat)
  if (eventText.includes('sweeper') || eventText.includes('máu') || eventText.includes('giết') || health <= 35 || event.id.includes('req_')) {
    return {
      faculty: PSYCHE_FACULTIES.SURVIVAL,
      textVi: 'Thú tính sinh tồn trong huyết quản gầm gừ báo động: "Mùi rỉ sắt và chết chóc rất gần. Ở Backstreets, kẻ do dự là kẻ nằm xuống trước khi đồng hồ điểm 3 giờ 13."',
      textEn: 'Predatory survival instinct snarls through your veins: “The stench of rust and death is near. In the Backstreets, the one who hesitates goes down before the clock strikes 3:13.”'
    };
  }

  // 4. Poetic Passion / Drama (Bloodfiends, La Mancha, The Ring, Hongyuan)
  if (eventText.includes('lamancha') || eventText.includes('bloodfiend') || eventText.includes('ring') || flags.includes('WildHuntRider')) {
    return {
      faculty: PSYCHE_FACULTIES.DRAMA,
      textVi: 'Nhịp đập hoang dại giục giã trong lồng ngực: "Dù là La Mancha Land rực rỡ hay vũ đài đẫm máu của The Ring, The City không dành chỗ cho những kẻ tầm thường. Hãy biến khoảnh khắc này thành một tuyệt tác bất hủ!"',
      textEn: 'A wild pulse quickens in your ribs: “Be it radiant La Mancha Land or The Ring’s sanguine dais, The City holds no place for the mundane. Make this moment an unforgettable masterpiece!”'
    };
  }

  // 5. City Logic & Taboo (Ahn, Contracts, Hana, Arbiters)
  if (taboo >= 1 || char.job === 'Fixer' || char.job === 'Wing Employee' || (char.stats?.wealth || 0) >= 45) {
    return {
      faculty: PSYCHE_FACULTIES.LOGIC,
      textVi: 'Toan tính sắc bén rà soát tình hình: "Mọi hơi thở tại The City đều có hóa đơn tính tiền. Cân nhắc kỹ cái giá phải trả; nếu chạm vào Taboo của The Head, ngay cả các Wing cũng không bảo vệ được bạn."',
      textEn: 'Keen calculus scans the room: “Every breath in The City carries an invoice. Weigh the price carefully; touch the Taboos of The Head, and not even the Wings can shield you.”'
    };
  }

  // Default Stoic Insight
  return {
    faculty: PSYCHE_FACULTIES.VOLITION,
    textVi: 'Nội tâm bạn lắng lại trước ngã rẽ: "Một bước đi lúc này sẽ định hình vết sẹo của ngày mai."',
    textEn: 'Your inner focus steadies before the crossroads: “A single step taken now will etch the scars of tomorrow.”'
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
