import React from 'react';
import { useGameStore } from '../../../store/gameStore';
import { REGIONS } from '../../../data/worldData';
import { useT } from '../../../i18n';
import { audioEngine } from '../../../engine/audioEngine';

export const DistrictStrip = () => {
  const regionId = useGameStore((s) => s.char?.regionId);
  const { lang, t } = useT();
  const region = REGIONS.find((r) => r.id === regionId) || REGIONS[0];
  if (!region) return null;

  const name = lang === 'en' ? region.nameEn : region.nameVi;
  const shortName = region.ward ? `D${region.ward} · ${region.id}` : 'Outskirts';
  const singularity = lang === 'en' ? region.singularityEn : region.singularityVi;

  const handleOpen = () => {
    audioEngine.playClick();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-district-dossier'));
      const openFold = () => {
        const folds = document.querySelectorAll('details.is-district-fold');
        folds.forEach((el) => {
          el.open = true;
        });
        const visibleFold = [...folds].find((el) => el.getClientRects().length > 0);
        visibleFold?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };
      openFold();
      setTimeout(openFold, 60);
    }
  };

  return (
    <button
      type="button"
      className="district-strip"
      onClick={handleOpen}
      title={t('Mở mục Khu vực & xuất thân trong hồ sơ', 'Open District & background in dossier')}
      aria-label={singularity ? `${name}. ${singularity}` : name}
    >
      <strong className="district-strip-name">
        <span className="district-strip-full">{name}</span>
        <span className="district-strip-short" aria-hidden="true">{shortName}</span>
      </strong>
      {singularity && <small className="district-strip-singularity">{singularity}</small>}
    </button>
  );
};

export default DistrictStrip;
