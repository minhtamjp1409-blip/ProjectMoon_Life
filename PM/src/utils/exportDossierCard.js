// Renders a 1200x760 memorial dossier & epitaph card for a finished life and downloads it as PNG.
const ROUTE_ACCENTS = {
  Color: '#e8a33c',
  Thumb: '#d8743c',
  Index: '#ece08e',
  Middle: '#d9b34a',
  Ring: '#ec4b55',
  Pinky: '#b88ae8',
  Distortion: '#e2487a',
  'Wing Employee': '#7fb0ff',
  'Workshop Craftsman': '#f08a3c',
  Syndicate: '#d0566a',
  Fixer: '#c9a24b'
};

// The card appends two hex digits of alpha to the accent ("#rrggbb22"), and addColorStop throws on anything it
// cannot parse, so only a six-digit hex is accepted
const SIX_DIGIT_HEX = /^#[0-9a-fA-F]{6}$/;

export function resolveAccent(summary) {
  const accent = rawAccent(summary);
  return SIX_DIGIT_HEX.test(accent) ? accent : '#c9a24b';
}

function rawAccent(summary) {
  if (!summary) return '#c9a24b';
  if (summary.colorHex) return String(summary.colorHex).trim();
  if (summary.finger && ROUTE_ACCENTS[summary.finger]) return ROUTE_ACCENTS[summary.finger];
  const occ = String(summary.occupationVi || summary.job || '');
  if (occ.includes('Lãnh Chúa') || occ.includes('Dị Thể') || occ.includes('Tai Ương') || occ.includes('Distortion')) return ROUTE_ACCENTS.Distortion;
  if (occ.includes('Thumb')) return ROUTE_ACCENTS.Thumb;
  if (occ.includes('Index')) return ROUTE_ACCENTS.Index;
  if (occ.includes('Middle')) return ROUTE_ACCENTS.Middle;
  if (occ.includes('Ring')) return ROUTE_ACCENTS.Ring;
  if (occ.includes('Pinky')) return ROUTE_ACCENTS.Pinky;
  if (occ.includes('Wing')) return ROUTE_ACCENTS['Wing Employee'];
  if (occ.includes('Workshop')) return ROUTE_ACCENTS['Workshop Craftsman'];
  if (occ.includes('Syndicate')) return ROUTE_ACCENTS.Syndicate;
  return '#c9a24b';
}

function drawCornerOrnaments(ctx, x, y, w, h, color) {
  const s = 18;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const corners = [
    [x, y + s, x, y, x + s, y],
    [x + w - s, y, x + w, y, x + w, y + s],
    [x, y + h - s, x, y + h, x + s, y + h],
    [x + w - s, y + h, x + w, y + h, x + w, y + h - s]
  ];
  corners.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();
  });
}

function drawEmblemWatermark(ctx, cx, cy, r, accent) {
  ctx.save();
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.09;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.72, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r * 0.35, cy + Math.sin(a) * r * 0.35);
    ctx.lineTo(cx + Math.cos(a) * r * 1.08, cy + Math.sin(a) * r * 1.08);
    ctx.stroke();
  }
  ctx.restore();
}

export function exportDossierCardPNG(summary) {
  const W = 1200;
  const H = 760;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const accent = resolveAccent(summary);

  // 1. Deep Obsidian & Subtle Radial Glow Background
  ctx.fillStyle = '#090a0f';
  ctx.fillRect(0, 0, W, H);

  const grad = ctx.createRadialGradient(W * 0.78, H * 0.24, 20, W * 0.78, H * 0.24, 520);
  grad.addColorStop(0, `${accent}22`);
  grad.addColorStop(1, 'rgba(9, 10, 15, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Watermark seal in top-right
  drawEmblemWatermark(ctx, W - 180, 175, 110, accent);

  // Outer & Inner Dossier Frames
  ctx.strokeStyle = `${accent}99`;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(26, 26, W - 52, H - 52);

  ctx.strokeStyle = '#222634';
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, W - 76, H - 76);
  drawCornerOrnaments(ctx, 26, 26, W - 52, H - 52, accent);

  // 2. Header Classification Bar
  ctx.fillStyle = accent;
  ctx.font = '600 14px "Archivo", system-ui, sans-serif';
  ctx.fillText(
    `HANA ASSOCIATION ARCHIVE  //  GENERATION #${summary.generation || 1}  //  THREAT TIER: ${String(summary.rankTier || 'CANARD').toUpperCase()}`,
    68,
    78
  );

  // 3. Character Name, Lifespan Badge & Title
  ctx.fillStyle = '#f2efe9';
  ctx.font = '700 44px "Literata", Georgia, serif';
  ctx.fillText(String(summary.name || 'Unnamed'), 68, 134);

  ctx.fillStyle = accent;
  ctx.font = '600 22px "Literata", Georgia, serif';
  ctx.fillText(String(summary.epitaphTitleVi || summary.occupationVi || summary.job || ''), 68, 170);

  if (summary.poeticQuoteVi) {
    ctx.fillStyle = '#a5adbe';
    ctx.font = 'italic 16px "Literata", Georgia, serif';
    ctx.fillText(`“${String(summary.poeticQuoteVi).slice(0, 96)}”`, 68, 202);
  }

  // Divider line
  ctx.strokeStyle = '#262b38';
  ctx.beginPath();
  ctx.moveTo(68, 222);
  ctx.lineTo(W - 68, 222);
  ctx.stroke();

  // 4. Key Dossier Metrics (2x2 Grid)
  const diff = summary.lifespanDiff ?? 0;
  const diffLabel = `${summary.age} Tuổi (${diff >= 0 ? `+${diff}` : diff} vs TB Quận)`;
  const metrics = [
    ['TUỔI THỌ / LIFESPAN', diffLabel],
    ['XUẤT THÂN / ORIGIN', `${summary.familyNameVi || summary.regionNameVi || 'The City'}`],
    ['NGHỀ NGHIỆP & ĐỊA VỊ', summary.occupationVi || summary.job || 'Cư dân'],
    ['DI VẬT TRUYỀN ĐỜI / RELIC', summary.relic || 'Không có']
  ];

  metrics.forEach(([label, val], idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 68 + col * 530;
    const y = 254 + row * 70;

    ctx.fillStyle = '#7e869b';
    ctx.font = '600 12px "Archivo", system-ui, sans-serif';
    ctx.fillText(label, x, y);

    ctx.fillStyle = '#eceef4';
    ctx.font = '600 20px "Archivo", system-ui, sans-serif';
    ctx.fillText(String(val).slice(0, 44), x, y + 28);
  });

  // 5. Pivotal Turning Points (Top 3 Landmarks)
  const turningPoints = (summary.turningPoints || []).slice(0, 3);
  ctx.fillStyle = '#7e869b';
  ctx.font = '600 12px "Archivo", system-ui, sans-serif';
  ctx.fillText('CỘT MỐC ĐỊNH MỆNH / PIVOTAL LANDMARKS', 68, 408);

  if (turningPoints.length > 0) {
    turningPoints.forEach((tp, i) => {
      const y = 434 + i * 28;
      ctx.fillStyle = accent;
      ctx.font = '700 14px "Archivo", system-ui, sans-serif';
      ctx.fillText(`Tuổi ${tp.age}`, 68, y);

      ctx.fillStyle = '#dadde6';
      ctx.font = '500 15px "Literata", Georgia, serif';
      const line = `${tp.titleVi ? `${tp.titleVi} — ` : ''}${tp.summaryVi || ''}`;
      ctx.fillText(line.slice(0, 92), 142, y);
    });
  } else {
    ctx.fillStyle = '#8b92a6';
    ctx.font = 'italic 15px "Literata", Georgia, serif';
    ctx.fillText('Một kiếp người lặng lẽ đi qua màn sương của The City.', 68, 436);
  }

  // 6. Karma Scars & Final Record
  ctx.fillStyle = '#7e869b';
  ctx.font = '600 12px "Archivo", system-ui, sans-serif';
  ctx.fillText('VẾT SẸO TÂM THỨC / KARMA SCARS', 68, 536);

  ctx.fillStyle = '#df5a64';
  ctx.font = '500 16px "Archivo", system-ui, sans-serif';
  const scarStr =
    summary.scars && summary.scars.length > 0
      ? summary.scars.slice(0, 4).join('  ·  ')
      : 'Không để lại vết sẹo tâm thức nào';
  ctx.fillText(scarStr.slice(0, 88), 68, 562);

  ctx.fillStyle = '#7e869b';
  ctx.font = '600 12px "Archivo", system-ui, sans-serif';
  ctx.fillText('KẾT CỤC SINH MỆNH / FINAL RECORD', 68, 604);

  ctx.fillStyle = '#f2efe9';
  ctx.font = 'italic 19px "Literata", Georgia, serif';
  ctx.fillText(String(summary.deathCauseVi || '').slice(0, 92), 68, 632);

  // 7. Bottom Stat Strip & Seed Footer
  ctx.strokeStyle = '#262b38';
  ctx.beginPath();
  ctx.moveTo(68, 662);
  ctx.lineTo(W - 68, 662);
  ctx.stroke();

  const reserveTag = (summary.reserveAhn || 0) > 0 ? ` (+${summary.reserveAhn} Quỹ)` : '';
  const statStrip = `HP ${summary.health ?? 0}   ·   SP ${summary.sanity ?? 0}   ·   Ahn ${summary.wealth ?? 0}${reserveTag}   ·   Net ${summary.network ?? 0}   ·   Rep ${summary.rep ?? 0}   ·   Merit ${summary.merit ?? 0}   ·   Resonance ${summary.resonance ?? 0}%`;
  ctx.fillStyle = '#b8bfd0';
  ctx.font = '600 14px "Archivo", system-ui, sans-serif';
  ctx.fillText(statStrip, 68, 694);

  ctx.fillStyle = '#7e869b';
  ctx.font = '600 13px "Archivo", system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`SEED: ${summary.seed}  //  THE CITY CHRONICLES`, W - 68, 694);
  ctx.textAlign = 'left';

  const link = document.createElement('a');
  link.download = `city-dossier-${String(summary.name || 'citizen').toLowerCase().replace(/\s+/g, '-')}-gen${summary.generation || 1}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
