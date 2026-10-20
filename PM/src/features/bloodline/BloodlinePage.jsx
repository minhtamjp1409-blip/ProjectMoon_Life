import React from 'react';
import { Download, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import { exportDossierCardPNG } from '../../utils/exportDossierCard';
import { useT } from '../../i18n';
import PageBanner from '../../components/PageBanner';

export const BloodlinePage = () => {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const { pastLives, setPendingLegacy, exitToSetup } = useGameStore();

  const handleInherit = (life) => {
    setPendingLegacy(life);
    exitToSetup();
    navigate('/');
  };

  const highestGen = pastLives.reduce((m, l) => Math.max(m, l.generation || 0), 0);
  const avgAge = pastLives.length ? Math.round(pastLives.reduce((s, l) => s + (l.age || 0), 0) / pastLives.length) : 0;

  return (
    <div className="page">
      <PageBanner
        title={t('Gia phả', 'Bloodline')}
        sub={
          pastLives.length === 0
            ? t('Chưa có kiếp sống nào khép lại.', 'No life has ended yet.')
            : t(
                `${pastLives.length} kiếp · thế hệ xa nhất #${highestGen} · thọ trung bình ${avgAge} tuổi`,
                `${pastLives.length} lives · furthest generation #${highestGen} · average lifespan ${avgAge}`
              )
        }
      />

      {pastLives.length === 0 ? (
        <div className="panel" style={{ padding: 20 }}>
          <p className="empty">
            {t(
              'Khi một kiếp sống kết thúc, bia mộ và di vật của người đó sẽ nằm ở đây, và bạn có thể chơi tiếp đời con.',
              'When a life ends, its epitaph and relic rest here, and you can play on as the heir.'
            )}
          </p>
          <button type="button" className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => navigate('/')}>
            <Play size={15} />
            {t('Bắt đầu kiếp sống đầu tiên', 'Start your first life')}
          </button>
        </div>
      ) : (
        <section className="panel" style={{ overflowX: 'auto' }}>
          <table className="table stack-sm" style={{ minWidth: 820 }}>
            <thead>
              <tr>
                <th className="num" style={{ width: 64 }}>{t('Đời', 'Gen')}</th>
                <th>{t('Tên & danh hiệu', 'Name & title')}</th>
                <th className="num">{t('Thọ', 'Age')}</th>
                <th>{t('Kết cục', 'Fate')}</th>
                <th>{t('Di vật', 'Relic')}</th>
                <th style={{ width: 200 }} />
              </tr>
            </thead>
            <tbody>
              {pastLives.map((life, idx) => (
                <tr key={`${life.seed}_${idx}`}>
                  <td className="num">#{life.generation}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{life.name}</div>
                    <div className="cell-sub">
                      {lang === 'en' ? life.epitaphTitleEn || life.epitaphTitleVi : life.epitaphTitleVi} · {life.rankTier}
                    </div>
                    <div className="cell-sub">{lang === 'en' ? life.regionNameEn || life.regionNameVi : life.regionNameVi}</div>
                  </td>
                  <td className="num">{life.age}</td>
                  <td style={{ maxWidth: 260 }}>{lang === 'en' ? life.deathCauseEn || life.deathCauseVi : life.deathCauseVi}</td>
                  <td className="muted" style={{ maxWidth: 200 }}>{life.relic}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button type="button" className="btn" style={{ height: 30 }} onClick={() => handleInherit(life)}>
                        <Play size={14} />
                        {t('Chơi đời con', 'Play heir')}
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        style={{ width: 30, height: 30 }}
                        onClick={() => exportDossierCardPNG(life)}
                        aria-label={t('Tải thẻ PNG', 'Download PNG')}
                        title={t('Tải thẻ PNG', 'Download PNG')}
                      >
                        <Download size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default BloodlinePage;
