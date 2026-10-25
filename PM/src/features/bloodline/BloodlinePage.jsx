import React from 'react';
import { localizeEnsembleName } from '../../data/ensembleNames.js';
import { Download, Play, Trash2 } from 'lucide-react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import { exportDossierCardPNG } from '../../utils/exportDossierCard';
import { useT } from '../../i18n';
import PageBanner from '../../components/PageBanner';

export const BloodlinePage = () => {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const { pastLives, setPendingLegacy, deletePastLife, clearBloodline, exitToSetup } = useGameStore();

  const handleInherit = (life) => {
    if (life.endingId) return;
    setPendingLegacy(life);
    exitToSetup();
    navigate('/');
  };

  const highestGen = pastLives.reduce((m, l) => Math.max(m, l.generation || 0), 0);
  const endedLives = pastLives.filter((life) => !life.endingId);
  const avgAge = endedLives.length ? Math.round(endedLives.reduce((s, l) => s + (l.age || 0), 0) / endedLives.length) : 0;

  return (
    <div className="page">
      <PageBanner
        tag="HANA_ARCHIVE // LINEAGE_DYNASTY"
        title={t('Gia phả', 'Bloodline')}
        sub={
          pastLives.length === 0
            ? t('Chưa có kiếp sống nào khép lại.', 'No life has ended yet.')
            : t(
                `${pastLives.length} hồ sơ · thế hệ xa nhất #${highestGen}${endedLives.length ? ` · tuổi thọ TB ${avgAge}` : ''}`,
                `${pastLives.length} records · furthest generation #${highestGen}${endedLives.length ? ` · average lifespan ${avgAge}` : ''}`
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
            <span className="muted" style={{ fontSize: 14 }}>
              {t('Danh sách các thế hệ đã qua', 'List of past generations in this dynasty')}
            </span>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ color: 'var(--bad)', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, height: 32 }}
              onClick={() => {
                Modal.confirm({
                  title: lang === 'en' ? 'Clear Entire Bloodline Dynasty?' : 'Xóa toàn bộ cây gia phả?',
                  content: lang === 'en'
                    ? `All ${pastLives.length} past lives, epitaphs, and inherited heirlooms will be permanently removed.`
                    : `Toàn bộ ${pastLives.length} kiếp sống, bia mộ và di vật gia truyền sẽ bị xóa vĩnh viễn khỏi gia phả.`,
                  okText: lang === 'en' ? 'Delete All' : 'Xóa toàn bộ',
                  cancelText: lang === 'en' ? 'Cancel' : 'Hủy',
                  okButtonProps: { danger: true },
                  onOk: () => clearBloodline()
                });
              }}
            >
              <Trash2 size={14} />
              {t('Xóa toàn bộ gia phả', 'Clear Entire Bloodline')}
            </button>
          </div>
          <table className="table stack-sm table-bloodline">
            <thead>
              <tr>
                <th className="num" style={{ width: 64 }}>{t('Đời', 'Gen')}</th>
                <th>{t('Tên & danh hiệu', 'Name & title')}</th>
                <th className="num">{t('Tuổi khi khép hồ sơ', 'Age at record end')}</th>
                <th>{t('Kết cục', 'Fate')}</th>
                <th>{t('Di vật', 'Relic')}</th>
                <th style={{ width: 220 }} />
              </tr>
            </thead>
            <tbody>
              {pastLives.map((life, idx) => (
                <tr key={`${life.seed}_${idx}`}>
                  <td className="num" data-label={t('Đời', 'Gen')}>#{life.generation}</td>
                  <td data-label={t('Nhân vật', 'Character')}>
                    <div style={{ fontWeight: 500 }}>{life.name}</div>
                    <div className="cell-sub">
                      {lang === 'en' ? life.epitaphTitleEn || life.epitaphTitleVi : life.epitaphTitleVi} · {life.rankTier}
                    </div>
                    <div className="cell-sub">{lang === 'en' ? life.regionNameEn || life.regionNameVi : life.regionNameVi}</div>
                  </td>
                  <td className="num" data-label={t('Tuổi khi khép hồ sơ', 'Age at record end')}>{life.age} {t('tuổi', 'yrs')}</td>
                  <td style={{ maxWidth: 260 }} data-label={t('Kết cục', 'Fate')}>{lang === 'en' ? life.deathCauseEn || life.deathCauseVi : life.deathCauseVi}</td>
                  <td className="muted" style={{ maxWidth: 200 }} data-label={t('Di vật', 'Relic')}>{t(life.relic, localizeEnsembleName(life.relic, 'en'))}</td>
                  <td className="bloodline-action-td">
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                      {!life.endingId && <button type="button" className="btn btn-primary" style={{ height: 32 }} onClick={() => handleInherit(life)}>
                        <Play size={14} />
                        {t('Chơi đời con', 'Play heir')}
                      </button>}
                      <button
                        type="button"
                        className="icon-btn"
                        style={{ width: 32, height: 32 }}
                        onClick={() => exportDossierCardPNG(life)}
                        aria-label={t('Tải thẻ PNG', 'Download PNG')}
                        title={t('Tải thẻ PNG', 'Download PNG')}
                      >
                        <Download size={15} />
                      </button>
                      <button
                        type="button"
                        className="icon-btn"
                        style={{ width: 32, height: 32, color: 'var(--bad)' }}
                        onClick={() => {
                          Modal.confirm({
                            title: lang === 'en' ? `Delete ${life.name} from Bloodline?` : `Xóa ${life.name} khỏi gia phả?`,
                            content: lang === 'en'
                              ? `Epitaph of Generation #${life.generation} (${life.name}, age ${life.age}) will be removed from this dynasty archive.`
                              : `Bia mộ của Thế hệ #${life.generation} (${life.name}, thọ ${life.age} tuổi) sẽ bị xóa vĩnh viễn khỏi hồ sơ gia phả.`,
                            okText: lang === 'en' ? 'Delete' : 'Xóa',
                            cancelText: lang === 'en' ? 'Cancel' : 'Hủy',
                            okButtonProps: { danger: true },
                            onOk: () => deletePastLife(life.seed, life.age)
                          });
                        }}
                        aria-label={t('Xóa khỏi gia phả', 'Delete from bloodline')}
                        title={t('Xóa khỏi gia phả', 'Delete from bloodline')}
                      >
                        <Trash2 size={15} />
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
