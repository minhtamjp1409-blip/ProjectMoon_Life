import fs from 'node:fs';
const ed = (p, a, b) => { let s = fs.readFileSync(p, 'utf8'); const nl = s.includes('\r\n'); if (nl) s = s.replace(/\r\n/g, '\n'); if (!s.includes(a)) throw new Error(p + ' miss ' + a.slice(0, 50)); s = s.replace(a, b); fs.writeFileSync(p, nl ? s.replace(/\n/g, '\r\n') : s); };
const G = 'src/engine/gameEngine.js';
ed(G, `    .replace(/\{nemesis\}/g, npcName('nemesis', 'kẻ thù'))`, `    .replace(/\{nemesis\}/g, npcName('nemesis', 'kẻ thù'))
    .replace(/\{departed\}/g, char.recentBereavementNameVi || 'Người ấy')`);
ed(G, `    seenEvents: [...new Set([...(char.bloodlineSeenEvents || []), ...(char.seenEvents || [])])],
    bloodlineSeenEvents:`, `    // One list for the whole bloodline; a second copy under seenEvents doubled the size of every legacy
    bloodlineSeenEvents:`);
ed(G, `      ? [...new Set([...(parentLegacy.bloodlineSeenEvents || []), ...(parentLegacy.seenEvents || [])])]`, `      ? [...(parentLegacy.bloodlineSeenEvents || [])]`);
const T = 'src/data/eventsApexTwilight.js';
ed(T, `vi: '[Buổi tiễn đưa chiều muộn] Người quen cũ đã đi hết tuổi trời mà không phải ngã xuống vì đao kiếm.`, `vi: '[Buổi tiễn đưa chiều muộn] {departed} đã sống hết tuổi trời, không ngã xuống vì lưỡi dao nào.`);
ed(T, `en: '[Late afternoon farewell] An old companion has reached the end of their natural years without falling to a blade.`, `en: '[Late afternoon farewell] {departed} reached the end of their natural years without falling to a blade.`);
const D = 'src/features/chronicle/components/CharacterDossierCard.jsx';
ed(D, `tooltip={t('Ahn dùng cho sinh hoạt, mua tin và điều trị.', 'Ahn pays for living costs, intelligence, and treatment.')} />`, `tooltip={t('Ahn dùng cho sinh hoạt, mua tin và điều trị.', 'Ahn pays for living costs, intelligence, and treatment.')} />
          {(char.reserveAhn || 0) > 0 && (
            <small className="npc-inspect-hint">
              {t(\`Quỹ Bảo Tồn: \${char.reserveAhn} Ahn. Phần vượt trần 100 được cất ở đây và để lại một phần cho đời sau.\`, \`Reserve Vault: \${char.reserveAhn} Ahn. Earnings above the 100 cap are kept here, and part passes to your successor.\`)}
            </small>
          )}`);
ed(D, `<div className="hud2-stat is-ahn" title={t('Tiền mặt Ahn', 'Ahn Wealth')}>`, `<div className="hud2-stat is-ahn" title={(char.reserveAhn || 0) > 0 ? t(\`Tiền mặt Ahn. Quỹ Bảo Tồn: \${char.reserveAhn} Ahn\`, \`Ahn on hand. Reserve Vault: \${char.reserveAhn} Ahn\`) : t('Tiền mặt Ahn', 'Ahn Wealth')}>`);
