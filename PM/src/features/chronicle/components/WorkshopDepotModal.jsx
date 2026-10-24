import { activeCityCondition, workshopPrice } from '../../../engine/cityConditions.js';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Check } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';
import { ITEMS_CATALOG, ITEM_TYPES } from '../../../data/itemsData';
import { audioEngine } from '../../../engine/audioEngine';
import { useT } from '../../../i18n';

export const WorkshopDepotModal = ({ open, onClose }) => {
  const { t, lang } = useT();
  const { char, buyItem, useConsumableItem } = useGameStore((s) => ({
    char: s.char,
    buyItem: s.buyItem,
    useConsumableItem: s.useConsumableItem
  }));

  const [activeTab, setActiveTab] = useState('ALL');

  if (!char) return null;

  const playerAhn = char.stats?.wealth ?? char.wealth ?? 0;
  const inventory = Array.isArray(char.inventory) ? char.inventory : [];

  const filterItems = () => {
    if (activeTab === 'ALL') return ITEMS_CATALOG;
    return ITEMS_CATALOG.filter((item) => item.type === activeTab);
  };

  const handleBuy = (item) => {
    if (playerAhn < workshopPrice(item, char)) return;
    audioEngine.playCoinChime();
    buyItem(item.id);
  };

  const isOwned = (item) => {
    return inventory.some((inv) => inv.id === item.id);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={760}
      centered
      className="workshop-depot-modal"
      title={
        <div className="depot-title">
          <span>{t('Workshop & Chợ Đen', 'Workshop Depot & Black Market')}</span>
          <span className="depot-purse num">
            {playerAhn} <small>Ahn</small>
          </span>
        </div>
      }
    >
      <div className="depot">
        <p className="depot-lead">
          {t(
            'Vũ khí Workshop, cấy ghép và thuốc K Corp. Mỗi món tăng cơ hội sống sót, không món nào bảo đảm điều đó.',
            'Workshop weapons, grafts and K Corp ampoules. Each one improves your odds; none of them guarantees anything.'
          )}
        </p>
        {activeCityCondition(char) && (
          <p role="status" className="depot-notice">
            {t('Phong tỏa nguồn hàng: thuốc và trang bị +15%, làm tròn lên. Hết hiệu lực sau tuổi ', 'Supply cordon: medicine and equipment +15%, rounded up. Ends after age ')}
            {char.cityCondition.endAge}.
          </p>
        )}
        <div className="tabs depot-tabs" role="tablist">
          {[
            { id: 'ALL', labelVi: 'Tất cả', labelEn: 'All Items' },
            { id: ITEM_TYPES.WEAPON, labelVi: 'Vũ khí Workshop', labelEn: 'Weapons' },
            { id: ITEM_TYPES.ARMOR, labelVi: 'Giáp & Cấy ghép', labelEn: 'Armor & Grafts' },
            { id: ITEM_TYPES.CONSUMABLE, labelVi: 'Thuốc sinh tồn K Corp', labelEn: 'Consumables' },
            { id: ITEM_TYPES.SPECIAL, labelVi: 'Thị thực & Đặc quyền', labelEn: 'Visas & Permits' }
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
        <ul className="depot-list">
          {filterItems().map((item) => {
            const owned = isOwned(item);
            const price = workshopPrice(item, char);
            const canAfford = playerAhn >= price;
            return (
              <li key={item.id} className={"depot-item is-" + item.type}>
                <div className="depot-item-main">
                  <h4>
                    {lang === 'en' ? item.nameEn : item.nameVi}
                    <span className="depot-tier">{item.tier}</span>
                  </h4>
                  <p>{lang === 'en' ? item.descEn : item.descVi}</p>
                </div>
                <div className="depot-item-buy">
                  <span className={"depot-price num" + (canAfford ? "" : " is-short")}>{price} Ahn</span>
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
      </div>
    </Modal>
  );
};
