// Renders a 1080x640 memorial card for a finished life and downloads it as PNG.
export function exportDossierCardPNG(summary) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // Obsidian background
  ctx.fillStyle = '#0b0c10';
  ctx.fillRect(0, 0, 1080, 640);

  // Outer structural border
  ctx.strokeStyle = '#c9a24b';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, 1024, 584);

  ctx.strokeStyle = '#232734';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, 1000, 560);

  // Header classification bar
  ctx.fillStyle = '#c9a24b';
  ctx.font = '600 16px "Be Vietnam Pro", sans-serif';
  ctx.fillText(
    `HANA ASSOCIATION ARCHIVE // GENERATION #${summary.generation} // THREAT TIER: ${summary.rankTier.toUpperCase()}`,
    68,
    88
  );

  // Character Name & Title
  ctx.fillStyle = '#eceef4';
  ctx.font = '700 46px "Be Vietnam Pro", sans-serif';
  ctx.fillText(summary.name, 68, 152);

  ctx.fillStyle = '#c9a24b';
  ctx.font = '500 24px "Noto Serif", Georgia, serif';
  ctx.fillText(summary.epitaphTitleVi, 68, 192);

  // Divider line
  ctx.strokeStyle = '#262b38';
  ctx.beginPath();
  ctx.moveTo(68, 220);
  ctx.lineTo(1012, 220);
  ctx.stroke();

  // Key Dossier Metrics
  const diff = summary.lifespanDiff ?? 0;
  const diffLabel = `${summary.age} Tuổi (${diff >= 0 ? `+${diff}` : diff} vs TB Quận)`;
  const metrics = [
    ['TUỔI THỌ / LIFESPAN', diffLabel],
    ['XUẤT THÂN / ORIGIN', `${summary.familyNameVi || summary.regionNameVi}`],
    ['NGHỀ NGHIỆP / OCCUPATION', summary.occupationVi || summary.job],
    ['DI VẬT ĐỂ LẠI / HEIRLOOM', summary.relic]
  ];

  metrics.forEach(([label, val], idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 68 + col * 480;
    const y = 268 + row * 82;

    ctx.fillStyle = '#7e869b';
    ctx.font = '500 14px "Be Vietnam Pro", sans-serif';
    ctx.fillText(label, x, y);

    ctx.fillStyle = '#eceef4';
    ctx.font = '600 22px "Be Vietnam Pro", sans-serif';
    ctx.fillText(String(val).slice(0, 38), x, y + 32);
  });

  // Karma Scars
  ctx.fillStyle = '#7e869b';
  ctx.font = '500 14px "Be Vietnam Pro", sans-serif';
  ctx.fillText('VẾT SẸO TÂM THỨC / KARMA SCARS', 68, 445);

  ctx.fillStyle = '#d64550';
  ctx.font = '500 18px "Be Vietnam Pro", sans-serif';
  const scarStr =
    summary.scars && summary.scars.length > 0
      ? summary.scars.slice(0, 4).join('  ·  ')
      : 'Không để lại vết sẹo tâm thức nào';
  ctx.fillText(scarStr.slice(0, 78), 68, 476);

  // Cause of Death
  ctx.fillStyle = '#7e869b';
  ctx.font = '500 14px "Be Vietnam Pro", sans-serif';
  ctx.fillText('KẾT CỤC SINH MỆNH / FINAL RECORD', 68, 528);

  ctx.fillStyle = '#eceef4';
  ctx.font = 'italic 20px "Noto Serif", Georgia, serif';
  ctx.fillText(summary.deathCauseVi.slice(0, 82), 68, 558);

  // Seed footer
  ctx.fillStyle = '#6c738a';
  ctx.font = '500 13px "Be Vietnam Pro", sans-serif';
  ctx.fillText(`SEED: ${summary.seed}  //  CHRONICLES OF THE CITY`, 680, 585);

  const link = document.createElement('a');
  link.download = `city-dossier-${summary.name.toLowerCase().replace(/\s+/g, '-')}-gen${summary.generation}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
