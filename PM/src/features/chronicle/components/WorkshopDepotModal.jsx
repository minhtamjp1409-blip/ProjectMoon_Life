import React, { useState } from 'react';
import { Modal, Tag } from 'antd';
import { ShoppingBag, Shield, Zap, Sparkles, Check, Coins, AlertCircle } from 'lucide-react';
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
    if (playerAhn < item.costAhn) return;
    audioEngine.playBuff();
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
      width={720}
      centered
      className="workshop-depot-modal"
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShoppingBag size={20} color="var(--accent)" />
            <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>
              {t('Xưởng Chế tác Workshop & Chợ Đen', 'Workshop Depot & Black Market')}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface)', padding: '4px 12px', borderRadius: 6, border: '1px solid var(--border)' }}>
            <Coins size={16} color="var(--accent)" />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>
              {playerAhn} <small style={{ fontSize: 11 }}>Ahn</small>
            </span>
          </div>
        </div>
      }
    >
      <div style={{ marginTop: 12 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 16px' }}>
          {t(
            'Trang bị vũ khí Workshop, cấy ghép sinh học hoặc thuốc phục hồi K Corp để gia tăng cơ hội sống sót giữa những cuộc thanh trừng đẫm máu của The City.',
            'Procure Workshop weaponry, bio-grafts, and K Corp miraculous ampoules to ensure your survival through The City’s brutal purges.'
          )}
        </p>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 10, marginBottom: 16 }}>
          {[
            { id: 'ALL', labelVi: 'Tất cả', labelEn: 'All Items' },
            { id: ITEM_TYPES.WEAPON, labelVi: 'Vũ khí Workshop', labelEn: 'Weapons' },
            { id: ITEM_TYPES.ARMOR, labelVi: 'Giáp & Cấy ghép', labelEn: 'Armor & Grafts' },
            { id: ITEM_TYPES.CONSUMABLE, labelVi: 'Thuốc sinh tồn K Corp', labelEn: 'Consumables' },
            { id: ITEM_TYPES.SPECIAL, labelVi: 'Thị thực & Đặc quyền', labelEn: 'Visas & Permits' }
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: '1px solid',
                borderColor: activeTab === tab.id ? 'var(--accent)' : 'var(--border)',
                background: activeTab === tab.id ? 'rgba(212, 175, 55, 0.15)' : 'var(--raised)',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {lang === 'en' ? tab.labelEn : tab.labelVi}
            </button>
          ))}
        </div>

        {/* Item Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12, maxHeight: '56vh', overflowY: 'auto', paddingRight: 4 }}>
          {filterItems().map((item) => {
            const owned = isOwned(item);
            const canAfford = playerAhn >= item.costAhn;

            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--raised)',
                  border: '1px solid var(--border)',
                  borderTop: item.type === 'weapon' ? '2px solid var(--accent)' : item.type === 'consumable' ? '2px solid #22c55e' : '2px solid #60a5fa',
                  borderRadius: 8,
                  padding: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 10
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                      {lang === 'en' ? item.nameEn : item.nameVi}
                    </h4>
                    <Tag color="gold" style={{ margin: 0, fontSize: 10, fontWeight: 700 }}>
                      {item.tier}
                    </Tag>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--story)', lineHeight: 1.5, margin: 0 }}>
                    {lang === 'en' ? item.descEn : item.descVi}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Coins size={14} color="var(--accent)" />
                    <span style={{ fontSize: 14, fontWeight: 700, color: canAfford ? 'var(--accent)' : 'var(--bad)' }}>
                      {item.costAhn} Ahn
                    </span>
                  </div>

                  {owned ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'var(--good)' }}>
                      <Check size={14} /> {t('Đã sở hữu', 'Owned')}
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => handleBuy(item)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 5,
                        fontSize: 12,
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: canAfford ? 'var(--accent)' : 'var(--border)',
                        background: canAfford ? 'var(--accent)' : 'var(--raised)',
                        color: canAfford ? '#0a0d12' : 'var(--faint)',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {canAfford ? t('Mua ngay', 'Purchase') : t('Thiếu tiền', 'Need Ahn')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
