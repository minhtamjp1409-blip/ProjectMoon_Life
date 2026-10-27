import { activeCityCondition, workshopPrice } from '../../../engine/cityConditions.js';
import {
  IMBUEMENT_RECIPES,
  TRANSIT_HUBS,
  canImbueEquipment,
  canRelocateDistrict,
  imbuementCostFor,
  transitCostFor
} from '../../../engine/cityUpgrades.js';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Check } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';
import { ITEMS_CATALOG, ITEM_TYPES } from '../../../data/itemsData';
import { audioEngine } from '../../../engine/audioEngine';
import { useT } from '../../../i18n';

export const WorkshopDepotModal = ({ open, onClose }) => {
  const { t, lang } = useT();
  const { char, buyItem, relocateDistrict, imbueEquipment } = useGameStore((s) => ({
    char: s.char,
    buyItem: s.buyItem,
    relocateDistrict: s.relocateDistrict,
    imbueEquipment: s.imbueEquipment
  }));

  const [activeTab, setActiveTab] = useState('ALL');

  if (!char) return null;

  const playerAhn = char.stats?.wealth ?? char.wealth ?? 0;
  const inventory = Array.isArray(char.inventory) ? char.inventory : [];
  const imbuedSet = new Set((char.imbuedRelics || []).map((r) => r.relicId));

  const filterItems = () => {
    if (activeTab === 'ALL') return ITEMS_CATALOG;
    return ITEMS_CATALOG.filter((item) => item.type === activeTab);
  };

  const handleBuy = (item) => {
    if (playerAhn < workshopPrice(item, char)) return;
    audioEngine.playCoinChime();
    buyItem(item.id);
  };

  const handleImbue = (relicId) => {
    const check = canImbueEquipment(char, relicId);
    if (!check.ok) return;
    audioEngine.playCoinChime();
    imbueEquipment(relicId);
  };

  const handleRelocate = (regionId) => {
    const check = canRelocateDistrict(char, targetRegionIdOf(regionId));
    if (!check.ok) return;
    audioEngine.playCoinChime();
    relocateDistrict(regionId);
  };

  const targetRegionIdOf = (rid) => rid;

  const isOwned = (item) => {
    return inventory.some((inv) => inv.id === item.id);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={780}
      centered
      className="workshop-depot-modal"
      title={
        <div className="depot-title">
          <span>{t('Workshop, Lò Khảm & Ga Liên Quận', 'Workshop, Singularity Forge & Transit')}</span>
          <span className="depot-purse num">
            {playerAhn} <small>Ahn</small>
          </span>
        </div>
      }
    >
      <div className="depot">
        <p className="depot-lead">
          {t(
            'Vũ khí Workshop, cấy ghép, khảm cổ vật Singularity và vé di chuyển liên Quận. Mỗi lựa chọn mở ra cơ hội sống sót mới.',
            'Workshop weapons, grafts, Singularity imbuement, and inter-District transit passes. Each option reshapes your odds.'
          )}
        </p>
        {activeCityCondition(char) && (
          <p role="status" className="depot-notice">
            {t(
              'Phong tỏa nguồn hàng: thuốc và trang bị +15%, làm tròn lên. Hết hiệu lực sau tuổi ',
              'Supply cordon: medicine and equipment +15%, rounded up. Ends after age '
            )}
            {char.cityCondition.endAge}.
          </p>
        )}
        <div className="tabs depot-tabs" role="tablist">
          {[
            { id: 'ALL', labelVi: 'Tất cả', labelEn: 'All Items' },
            { id: ITEM_TYPES.WEAPON, labelVi: 'Vũ khí Workshop', labelEn: 'Weapons' },
            { id: ITEM_TYPES.ARMOR, labelVi: 'Giáp & Cấy ghép', labelEn: 'Armor & Grafts' },
            { id: ITEM_TYPES.CONSUMABLE, labelVi: 'Thuốc K Corp', labelEn: 'Consumables' },
            { id: ITEM_TYPES.SPECIAL, labelVi: 'Thị thực & Cổ vật', labelEn: 'Permits & Relics' },
            { id: 'IMBUEMENT', labelVi: 'Khảm Singularity', labelEn: 'Imbuement' },
            { id: 'TRANSIT', labelVi: 'Vé Tàu & Chuyển Quận', labelEn: 'District Transit' }
          ].map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              key={tab.id}
              className={activeTab === tab.id ? 'is-on' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {lang === 'en' ? tab.labelEn : tab.labelVi}
            </button>
          ))}
        </div>

        {activeTab === 'IMBUEMENT' ? (
          <ul className="depot-list">
            {IMBUEMENT_RECIPES.map((rec) => {
              const relicDef = ITEMS_CATALOG.find((i) => i.id === rec.relicId);
              const alreadyImbued = imbuedSet.has(rec.relicId);
              const check = canImbueEquipment(char, rec.relicId);
              const cost = imbuementCostFor(char);
              return (
                <li key={rec.relicId} className="depot-item is-special">
                  <div className="depot-item-main">
                    <h4>
                      {lang === 'en'
                        ? `${rec.prefixEn} Synthesis (${relicDef?.nameEn || rec.relicId})`
                        : `Khảm ${rec.prefixVi} (${relicDef?.nameVi || rec.relicId})`}
                      <span className="depot-tier">Singularity</span>
                    </h4>
                    <p>{lang === 'en' ? rec.bonusEn : rec.bonusVi}</p>
                    {!alreadyImbued && !check.ok && (
                      <small className="muted" style={{ display: 'block', marginTop: 4 }}>
                        {lang === 'en' ? check.reasonEn : check.reasonVi}
                      </small>
                    )}
                  </div>
                  <div className="depot-item-buy">
                    <span className={'depot-price num' + (playerAhn >= cost ? '' : ' is-short')}>
                      {cost === 0 ? t('Miễn phí (Thợ Rèn)', 'Free (Craftsman)') : `${cost} Ahn`}
                    </span>
                    {alreadyImbued ? (
                      <span className="depot-owned">
                        <Check size={14} aria-hidden="true" /> {t('Đã khảm', 'Imbued')}
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm"
                        disabled={!check.ok}
                        onClick={() => handleImbue(rec.relicId)}
                      >
                        {check.ok ? t('Dung hợp', 'Imbue') : t('Chưa đủ điều kiện', 'Locked')}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : activeTab === 'TRANSIT' ? (
          <ul className="depot-list">
            {TRANSIT_HUBS.map((hub) => {
              const isHere = char.regionId === hub.regionId;
              const check = canRelocateDistrict(char, hub.regionId);
              const cost = transitCostFor(hub, char);
              return (
                <li key={hub.regionId} className="depot-item is-special">
                  <div className="depot-item-main">
                    <h4>
                      {lang === 'en' ? hub.nameEn : hub.nameVi}
                      <span className="depot-tier">{lang === 'en' ? hub.carrierEn : hub.carrierVi}</span>
                    </h4>
                    <p>{lang === 'en' ? hub.arrivalDescEn : hub.arrivalDescVi}</p>
                    <small className="muted" style={{ display: 'block', marginTop: 4 }}>
                      {lang === 'en' ? hub.passiveEn : hub.passiveVi}
                    </small>
                  </div>
                  <div className="depot-item-buy">
                    <span className={'depot-price num' + (playerAhn >= cost ? '' : ' is-short')}>{cost} Ahn</span>
                    {isHere ? (
                      <span className="depot-owned">
                        <Check size={14} aria-hidden="true" /> {t('Đang ở đây', 'Current District')}
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm"
                        disabled={!check.ok}
                        onClick={() => handleRelocate(hub.regionId)}
                      >
                        {check.ok
                          ? t('Khởi hành', 'Depart')
                          : char.lastRelocatedAge === char.age
                            ? t('Đã đi năm nay', 'Moved this year')
                            : t('Thiếu Ahn', 'Need Ahn')}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="depot-list">
            {filterItems().map((item) => {
              const owned = isOwned(item);
              const price = workshopPrice(item, char);
              const canAfford = playerAhn >= price;
              return (
                <li key={item.id} className={'depot-item is-' + item.type}>
                  <div className="depot-item-main">
                    <h4>
                      {lang === 'en' ? item.nameEn : item.nameVi}
                      <span className="depot-tier">{item.tier}</span>
                    </h4>
                    <p>{lang === 'en' ? item.descEn : item.descVi}</p>
                  </div>
                  <div className="depot-item-buy">
                    <span className={'depot-price num' + (canAfford ? '' : ' is-short')}>{price} Ahn</span>
                    {owned ? (
                      <span className="depot-owned">
                        <Check size={14} aria-hidden="true" /> {t('Đã sở hữu', 'Owned')}
                      </span>
                    ) : (
                      <button type="button" className="btn btn-sm" disabled={!canAfford} onClick={() => handleBuy(item)}>
                        {canAfford ? t('Mua', 'Buy') : t('Thiếu Ahn', 'Need Ahn')}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Modal>
  );
};
