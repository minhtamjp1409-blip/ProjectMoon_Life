import { activeCityCondition, workshopPrice } from '../../../engine/cityConditions.js';
import {
  IMBUEMENT_RECIPES,
  TRANSIT_HUBS,
  canImbueEquipment,
  canRelocateDistrict,
  hasVipTransitPass,
  imbuementCostFor,
  transitCostFor
} from '../../../engine/cityUpgrades.js';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Check } from 'lucide-react';
import { useGameStore } from '../../../store/gameStore';
import { ITEMS_CATALOG, ITEM_TYPES } from '../../../data/itemsData';
import { audioEngine } from '../../../engine/audioEngine';
import { gameFeel } from '../../../engine/gameFeel';
import { useT } from '../../../i18n';

const STAT_CHIP_LABELS = {
  health: ['HP', 'HP'],
  sanity: ['SP', 'SP'],
  wealth: ['Ahn', 'Ahn'],
  network: ['Quan hệ', 'Network'],
  rep: ['Danh tiếng', 'Rep'],
  merit: ['Merit', 'Merit'],
  resonance: ['Resonance', 'Resonance'],
  leverage: ['Leverage', 'Leverage'],
  heat: ['Heat', 'Heat']
};

function renderTradeoffChips(fx = {}, t, extra = []) {
  const entries = Object.entries(fx).filter(([k, v]) => Boolean(v) && STAT_CHIP_LABELS[k]);
  return (
    <div className="depot-deltas">
      {extra.map((chip, idx) => (
        <span key={`extra_${idx}`} className={`delta is-${chip.tone} is-static`}>
          {chip.label} {chip.val ? <b className="num">{chip.val}</b> : null}
        </span>
      ))}
      {entries.map(([k, v]) => {
        const [vi, en] = STAT_CHIP_LABELS[k];
        const isGood = k === 'heat' ? v < 0 : v > 0;
        const tone = k === 'resonance' ? 'rare' : isGood ? 'up' : 'down';
        const signed = v > 0 ? `+${v}` : `${v}`;
        return (
          <span key={k} className={`delta is-${tone} is-static`}>
            {t(vi, en)} <b className="num">{signed}</b>
          </span>
        );
      })}
    </div>
  );
}

export const WorkshopDepotModal = ({ open, onClose }) => {
  const { t, lang } = useT();
  const { char, buyItem, relocateDistrict, imbueEquipment } = useGameStore((s) => ({
    char: s.char,
    buyItem: s.buyItem,
    relocateDistrict: s.relocateDistrict,
    imbueEquipment: s.imbueEquipment
  }));

  const [activeTab, setActiveTab] = useState('ALL');
  const [depotFeedback, setDepotFeedback] = useState(null);

  if (!char) return null;

  const playerAhn = char.stats?.wealth ?? char.wealth ?? 0;
  const inventory = Array.isArray(char.inventory) ? char.inventory : [];
  const imbuedSet = new Set((char.imbuedRelics || []).map((r) => r.relicId));
  const vipPass = hasVipTransitPass(char);

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
    const res = imbueEquipment(relicId);
    if (res?.ok) {
      audioEngine.playBuff();
      gameFeel.addTrauma(0.24);
      setDepotFeedback({
        tone: 'imbue',
        text:
          lang === 'en'
            ? `Singularity Imbuement complete: ${res.recipe.prefixEn} (+${res.powerGain} Combat Power). ${res.recipe.bonusEn}`
            : `Đã dung hợp Singularity: ${res.recipe.prefixVi} (+${res.powerGain} Sức chiến đấu). ${res.recipe.bonusVi}`
      });
    }
  };

  const handleRelocate = (regionId) => {
    const check = canRelocateDistrict(char, regionId);
    if (!check.ok) return;
    const res = relocateDistrict(regionId);
    if (res?.ok) {
      audioEngine.playCoinChime();
      gameFeel.addTrauma(0.14);
      setDepotFeedback({
        tone: 'transit',
        text:
          lang === 'en'
            ? `Arrived at ${res.hub.nameEn} (-${res.cost} Ahn). ${res.hub.arrivalDescEn}`
            : `Đã đặt chân tới ${res.hub.nameVi} (-${res.cost} Ahn). ${res.hub.arrivalDescVi}`
      });
    }
  };

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
            'Vũ khí Workshop, cấy ghép, khảm cổ vật Singularity và vé di chuyển liên Quận. Mỗi lựa chọn mở ra cơ hội sống sót mới đi kèm cái giá tương xứng.',
            'Workshop weapons, grafts, Singularity imbuement, and inter-District transit passes. Every edge carries a matching price.'
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
        {depotFeedback && (
          <p role="status" className={`depot-feedback is-${depotFeedback.tone}`}>
            {depotFeedback.text}
          </p>
        )}
        <div className="tabs depot-tabs" role="tablist" aria-label={t('Danh mục Workshop', 'Workshop categories')}>
          {(() => {
            const tabs = [
              { id: 'ALL', labelVi: 'Tất cả', labelEn: 'All Items' },
              { id: ITEM_TYPES.WEAPON, labelVi: 'Vũ khí Workshop', labelEn: 'Weapons' },
              { id: ITEM_TYPES.ARMOR, labelVi: 'Giáp & Cấy ghép', labelEn: 'Armor & Grafts' },
              { id: ITEM_TYPES.CONSUMABLE, labelVi: 'Thuốc K Corp', labelEn: 'Consumables' },
              { id: ITEM_TYPES.SPECIAL, labelVi: 'Thị thực & Cổ vật', labelEn: 'Permits & Relics' },
              { id: 'IMBUEMENT', labelVi: 'Khảm Singularity', labelEn: 'Imbuement' },
              { id: 'TRANSIT', labelVi: 'Vé Tàu & Chuyển Quận', labelEn: 'District Transit' }
            ];
            const selectTabAt = (nextIdx) => {
              const target = tabs[(nextIdx + tabs.length) % tabs.length];
              if (!target) return;
              setActiveTab(target.id);
              setDepotFeedback(null);
              document.getElementById(`depot-tab-${target.id}`)?.focus();
            };
            return tabs.map((tab, idx) => (
              <button
                type="button"
                role="tab"
                id={`depot-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls="depot-tabpanel"
                tabIndex={activeTab === tab.id ? 0 : -1}
                key={tab.id}
                className={activeTab === tab.id ? 'is-on' : ''}
                onClick={() => {
                  setActiveTab(tab.id);
                  setDepotFeedback(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    selectTabAt(idx + 1);
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    selectTabAt(idx - 1);
                  } else if (e.key === 'Home') {
                    e.preventDefault();
                    selectTabAt(0);
                  } else if (e.key === 'End') {
                    e.preventDefault();
                    selectTabAt(tabs.length - 1);
                  }
                }}
              >
                {lang === 'en' ? tab.labelEn : tab.labelVi}
              </button>
            ));
          })()}
        </div>

        <div id="depot-tabpanel" role="tabpanel" aria-labelledby={`depot-tab-${activeTab}`}>
        {activeTab === 'IMBUEMENT' ? (
          <ul className="depot-list">
            {IMBUEMENT_RECIPES.map((rec) => {
              const relicDef = ITEMS_CATALOG.find((i) => i.id === rec.relicId);
              const alreadyImbued = imbuedSet.has(rec.relicId);
              const check = canImbueEquipment(char, rec.relicId);
              const cost = imbuementCostFor(char);
              const isCraftsman = char.job === 'Workshop Craftsman';
              const extraChips = [
                {
                  tone: 'up',
                  label: t('Chiến lực', 'Combat Power'),
                  val: `+${rec.combatPowerBonus + (isCraftsman ? 6 : 0)}`
                },
                ...(isCraftsman
                  ? [
                      { tone: 'up', label: t('Thợ rèn', 'Craftsman'), val: '+8 Merit' },
                      { tone: 'down', label: t('Rèn tay', 'Forge toil'), val: '-3 HP' }
                    ]
                  : [])
              ];
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
                    {renderTradeoffChips(rec.statFx, t, extraChips)}
                    {!alreadyImbued && !check.ok && (
                      <small className="depot-subnote">
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
              const extraChips = [
                ...(vipPass
                  ? [{ tone: 'rare', label: t('Thẻ VIP', 'VIP Pass'), val: '-50% Ahn' }]
                  : hub.isWarpEconomy
                    ? [{ tone: 'down', label: t('Khoang WARP phổ thông', 'WARP Economy'), val: '-3 SP / +3 Resonance' }]
                    : [])
              ];
              return (
                <li key={hub.regionId} className="depot-item is-special">
                  <div className="depot-item-main">
                    <h4>
                      {lang === 'en' ? hub.nameEn : hub.nameVi}
                      <span className="depot-tier">{lang === 'en' ? hub.carrierEn : hub.carrierVi}</span>
                    </h4>
                    <p>{lang === 'en' ? hub.arrivalDescEn : hub.arrivalDescVi}</p>
                    {renderTradeoffChips(hub.arrivalFx, t, extraChips)}
                    <small className="depot-subnote">
                      {lang === 'en' ? hub.passiveEn : hub.passiveVi}
                    </small>
                    {!isHere && !check.ok && (
                      <small className="depot-subnote">
                        {lang === 'en' ? check.reasonEn : check.reasonVi}
                      </small>
                    )}
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
                            : playerAhn < cost
                              ? t('Thiếu Ahn', 'Need Ahn')
                              : t('Chưa đủ điều kiện', 'Locked')}
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
      </div>
    </Modal>
  );
};
