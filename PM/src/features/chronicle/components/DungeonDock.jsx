import React, { useEffect } from 'react';
import { ShieldAlert, LogOut, Shield, Scale, Flame, HeartPulse, Radar, Package, Award, Sparkles, Zap } from 'lucide-react';
import { useT } from '../../../i18n';
import { audioEngine } from '../../../engine/audioEngine.js';
import {
  DUNGEON_DEFINITIONS,
  DUNGEON_BALANCE,
  DUNGEON_CARDS,
  CARD_BUDGET,
  cardPlayable,
  cardBudgetLeft,
  getDungeonCurrentStage,
  getDungeonMastery,
  getStrainTier,
  dungeonSupplyState,
  dungeonEgoState,
  isDungeonChoiceAvailable,
  evaluateDungeonChoiceOdds
} from '../../../engine/gameEngine.js';
import { gauntletRoute } from '../../../engine/dungeonCombat.js';

const STANCES = [
  {
    id: 'guarded',
    icon: Shield,
    vi: 'Thận trọng',
    en: 'Guarded',
    noteVi: 'Ít thương tổn và áp lực hơn, dễ qua kiểm định hơn, nhặt được ít hơn.',
    noteEn: 'Less damage and strain, better odds on checks, a smaller haul.'
  },
  {
    id: 'balanced',
    icon: Scale,
    vi: 'Cân bằng',
    en: 'Balanced',
    noteVi: 'Không cộng, không trừ.',
    noteEn: 'No bonus, no penalty.'
  },
  {
    id: 'reckless',
    icon: Flame,
    vi: 'Xung kích',
    en: 'Reckless',
    noteVi: 'Nhặt nhiều hơn và thêm công trạng, nhưng đau hơn và áp lực dâng nhanh hơn.',
    noteEn: 'A bigger haul and extra merit, but more damage and faster strain.'
  }
];

const TRAIT_NAMES = {
  vigor: ['Thể lực', 'Vigor'],
  nerve: ['Thần kinh', 'Nerve'],
  luck: ['Vận may', 'Luck'],
  bond: ['Gắn bó', 'Bond']
};

const TIER_NAMES = {
  calm: ['Vững', 'Steady'],
  shaken: ['Run tay', 'Shaken'],
  panic: ['Hoảng loạn', 'Panicked'],
  breaking: ['Sắp gãy', 'Breaking']
};

const AMBIENT = {
  warp: ['Đồng hồ T Corp đứng ở 00:09.99. Trong toa, thời gian vẫn trôi.', 'The T Corp clock holds at 00:09.99. Inside the car, time keeps passing.'],
  greatlake: ['Sương trắng dày thêm sau mỗi chặng. Chuông Luật Đại Hồ chưa ngừng.', 'The fog thickens with every stage. The Lake Law bells have not stopped.'],
  lobotomy: ['Đèn khẩn cấp chớp màu cam. Còi Meltdown vọng lên từ tầng dưới.', 'Emergency lamps pulse amber. A Meltdown siren echoes from the floor below.'],
  bloodfiend: ['Nhạc kèn lạc điệu đúng một nốt. Đu quay vẫn quay.', 'The organ music is off by exactly one note. The wheel keeps turning.'],
  outskirts: ['Cát chảy xuống theo từng bước. Gió mang mùi kim loại cũ.', 'Sand runs down with every step. The wind smells of old metal.'],
  night: ['Mọi cánh cửa đã khóa. Đồng hồ đầu hẻm vẫn chưa tới 4 giờ 34.', 'Every door is locked. The clock at the head of the alley has not reached 4:34.'],
  claw: ['Không có lối rút. Gục ngã hoặc thất bại ở chặng cuối đồng nghĩa với cái chết.', 'There is no retreat. Breaking down or failing the final stage means death.'],
  ensemble: ['Không có nhạc. Những sợi dây và ghế gỗ báo trước nhịp. Cửa ra chỉ mở ở hồi đầu, trừ khi lời mời cuối đã ép bạn vào.', 'There is no music. Strings and wooden chairs telegraph the beat. The exit opens only in the first act, unless the final invitation forced you in.']
};

const STAT_ICON = { health: '♥', sanity: '✦', wealth: '◆', merit: '◈', resonance: '◎', rep: '★' };
const SEVERITY = [null, ['nhẹ', 'light'], ['vừa', 'moderate'], ['nặng', 'heavy']];
const severityOf = (n) => (n >= 13 ? 3 : n >= 6 ? 2 : 1);

const Chip = ({ stat, tone, children }) => (
  <span className={`delta is-affected is-affected-${stat} is-static dg-chip is-${tone}`}>
    <span className="delta-stat-icon" aria-hidden="true">{STAT_ICON[stat]}</span>
    {children}
  </span>
);

const StrainMeter = ({ strain, t }) => {
  const tier = getStrainTier(strain);
  const [vi, en] = TIER_NAMES[tier.id];
  return (
    <div className={`dg-strain is-${tier.id}`}>
      <div className="dg-strain-head">
        <span className="dg-label">{t('Áp lực tâm thần', 'Mental strain')}</span>
        <span className="dg-strain-tier">{t(vi, en)}</span>
      </div>
      <div
        className="dg-meter"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={strain}
        aria-valuetext={`${strain}, ${t(vi, en)}`}
        aria-label={t('Áp lực tâm thần', 'Mental strain')}
      >
        <span className="dg-meter-fill" style={{ width: `${strain}%` }} />
        {[45, 70, 90].map((at) => <span key={at} className="dg-meter-tick" style={{ left: `${at}%` }} aria-hidden="true" />)}
      </div>
    </div>
  );
};

// What a card is about, read from the effects it carries: the first match names its type and picks its emblem
const CARD_FACES = {
  ego: { vi: 'E.G.O', en: 'E.G.O', path: 'M12 2l2.4 5.6L20 8l-4.3 3.9L17 18l-5-3-5 3 1.3-6.1L4 8l5.6-.4z' },
  scan: { vi: 'Dò xét', en: 'Scout', path: 'M12 5C6.5 5 3 12 3 12s3.5 7 9 7 9-7 9-7-3.5-7-9-7zm0 3a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z' },
  heal: { vi: 'Hồi phục', en: 'Mend', path: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z' },
  strike: { vi: 'Phản công', en: 'Counter', path: 'M20 3l1 1-9 9 2 2-2 2-2-2-4 4-2-2 4-4-2-2 2-2 2 2z' },
  evade: { vi: 'Né', en: 'Evade', path: 'M3 6h10l-3 3h9l-4 3h6l-5 3H9l3-3H4l3-3H3z' },
  guard: { vi: 'Thủ', en: 'Guard', path: 'M12 3l8 3v6c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V6z' },
  check: { vi: 'Dò đường', en: 'Read', path: 'M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z' },
  loot: { vi: 'Thu hoạch', en: 'Haul', path: 'M12 3c4.5 0 8 1.5 8 3.5S16.5 10 12 10 4 8.5 4 6.5 7.5 3 12 3zM4 9c1.7 1.5 4.5 2.5 8 2.5S18.3 10.5 20 9v4c0 2-3.5 3.5-8 3.5S4 15 4 13zm0 7c1.7 1.5 4.5 2.5 8 2.5s6.3-1 8-2.5v2c0 2-3.5 3.5-8 3.5S4 20 4 18z' }
};
const cardFace = (card) => {
  let kind = 'guard';
  if (card.needsEgo) kind = 'ego';
  else if (card.scan) kind = 'scan';
  else if ((card.now?.health || 0) > 0) kind = 'heal';
  else if (card.breaks) kind = 'strike';
  else if (card.evade) kind = 'evade';
  else if (card.damage != null && card.damage < 1) kind = 'guard';
  else if (card.check) kind = 'check';
  else if (card.loot || card.reward) kind = 'loot';
  return { kind, ...CARD_FACES[kind] };
};
// The foot of the card shows only what is paid or gained the moment it is played
const cardPrice = (card, t) => {
  const n = card.now || {};
  const out = [];
  if (n.health) out.push({ key: 'hp', label: `${n.health > 0 ? '+' : '-'}${Math.abs(n.health)} HP`, good: n.health > 0 });
  if (n.sanity) out.push({ key: 'sp', label: `${n.sanity > 0 ? '+' : '-'}${Math.abs(n.sanity)} SP`, good: n.sanity > 0 });
  if (n.resonance) out.push({ key: 'rs', label: `+${n.resonance} Resonance`, good: true });
  if (n.strain) out.push({ key: 'st', label: `+${n.strain} ${t('áp lực', 'strain')}`, good: false });
  return out;
};

export const DungeonDock = ({ session, char, onPick, onFlee, onSetStance, onUseSupply, onUseEgo, onPlayCard }) => {
  const { t, lang, bilingual } = useT();
  const def = session ? DUNGEON_DEFINITIONS[session.id] : null;
  const stage = getDungeonCurrentStage(session);
  const result = session?.lastStageResult;

  // Ambience itself follows the dungeon theme from LiveStageFeed; the dock only voices each stage result
  useEffect(() => {
    if (!result) return;
    const fx = result.fx;
    if (fx === 'heavyhit') audioEngine.playDamage(1.6);
    else if (fx === 'hit') audioEngine.playDamage(1.2);
    else if (fx === 'mind' || fx === 'phase') audioEngine.playDanger();
    else if (fx === 'block' || fx === 'counter' || fx === 'clash') audioEngine.playBladeClash();
    else if (fx === 'break' || fx === 'boss-down' || fx === 'rest') audioEngine.playBuff();
    else if (fx === 'evade' || fx === 'ally' || fx === 'shortcut' || fx === 'door') audioEngine.playClick();
    else if (result.type === 'check_fail') audioEngine.playDamage(1.3);
    else if (result.type === 'check_ok') audioEngine.playBuff();
  }, [result]);

  if (!session || !def || !stage) return null;

  const stages = def.stages;
  const currentIdx = session.currentStageIndex || 0;
  const strain = session.sanityStrain || 0;
  const mastery = getDungeonMastery(def, char);
  const activeStance = STANCES.find((s) => s.id === (session.stance || 'balanced')) || STANCES[1];
  const breather = dungeonSupplyState(char, session, 'breather');
  const scan = dungeonSupplyState(char, session, 'scan');
  const ego = dungeonEgoState(char, session);
  const pick = (vi, en) => (lang === 'en' ? en : vi);
  const ambient = AMBIENT[def.theme] || AMBIENT.warp;
  const route = session.mode === 'gauntlet' ? gauntletRoute(session) : null;
  const fight = stage.combat || null;

  return (
    <div className={`dock is-dungeon theme-${def.theme}${fight?.isBoss ? ' is-boss' : ''}${fight?.phase === 2 ? ' is-phase-2' : ''}`} style={{ '--dg': def.accentColor }} role="document">
      {result?.fx && <span key={result.nonce} className={`dg-fx fx-${result.fx}`} aria-hidden="true" />}
      <div className="dock-inner dg">
        <header className="dg-head">
          <div className="dock-kicker-row">
            <p className="dock-kicker">
              <ShieldAlert size={14} aria-hidden="true" />
              <span className="dg-hazard">{def.hazard}</span>
              <span>{pick(def.kickerVi, def.kickerEn)}</span>
            </p>
          </div>
          <h3 className="dock-title">{pick(def.titleVi, def.titleEn)}</h3>
          {!session.ensembleCoda && <p className="dg-ambient">{t(ambient[0], ambient[1])}</p>}
          {def.noRetreat && <p className="dg-judgment-warning">{t('Không có lối rút. HP hoặc SP cạn sẽ chết. Trượt kiểm định cuối cũng chết.', 'No retreat. Reaching zero HP or SP kills you. Failing the final check also kills you.')}</p>}
          {def.theme === 'ensemble' && <p className="dg-judgment-warning">{session.ensembleCoda
            ? t('Theo Carmen: thành Distortion. Chống lại: mất 8 HP nếu thành công; trượt hoặc HP cạn sẽ chết.', 'Follow Carmen: become a Distortion. Resist: lose 8 HP on success; a failed check or zero HP means death.')
            : t(`HP cạn hoặc trượt hồi cuối: chết. SP cạn, áp lực đầy hoặc 3 Hòa âm: đối diện Carmen.${session.ensembleForced ? ' Lần mời cuối: không được rời đi.' : ' Chỉ được rời ở hồi đầu.'}`, `Zero HP or a failed finale means death. Zero SP, full strain or 3 Harmony: face Carmen.${session.ensembleForced ? ' Final invitation: no retreat.' : ' You may leave only in the opening act.'}`)}</p>}
          {route ? (
            <ol className="dg-route is-gauntlet" aria-label={t('Các tầng', 'Floors')}>
              {route.map((floor, idx) => (
                <li
                  key={idx}
                  className={`is-${floor.kind} ${floor.state === 'done' ? 'is-done' : floor.state === 'now' ? 'is-now' : ''}`}
                  aria-current={floor.state === 'now' ? 'step' : undefined}
                  title={floor.kind === 'rest' ? t('Điểm nghỉ', 'Rest') : floor.kind === 'boss' ? t('Trùm', 'Boss') : floor.kind === 'elite' ? t('Tinh nhuệ', 'Elite') : t('Giao tranh', 'Fight')}
                >
                  <span className="dg-route-bar" />
                  <span className="dg-route-num">{floor.kind === 'rest' ? '·' : floor.kind === 'boss' ? '★' : idx + 1}</span>
                </li>
              ))}
            </ol>
          ) : (
          <ol className="dg-route" aria-label={t('Tiến trình hầm ngục', 'Dungeon progress')}>
            {stages.map((st, idx) => (
              <li
                key={st.stageIndex}
                className={idx < currentIdx ? 'is-done' : idx === currentIdx ? 'is-now' : ''}
                aria-current={idx === currentIdx ? 'step' : undefined}
                title={pick(st.nameVi, st.nameEn)}
              >
                <span className="dg-route-bar" />
                <span className="dg-route-num">{idx + 1}</span>
              </li>
            ))}
          </ol>
          )}
        </header>

        <section className="dg-status" aria-label={t('Trạng thái chuyến đi', 'Run status')}>
          <StrainMeter strain={strain} t={t} />
          {def.theme === 'ensemble' && <div className="dg-harmony" role="meter" aria-label={t('Hòa âm', 'Harmony')} aria-valuemin={0} aria-valuemax={3} aria-valuenow={session.ensembleHarmony || 0}>
            <span>{t('Hòa âm', 'Harmony')} <b>{session.ensembleHarmony || 0}/3</b></span>
            <span className="dg-harmony-marks" aria-hidden="true">{[0, 1, 2].map((mark) => <i key={mark} className={mark < (session.ensembleHarmony || 0) ? 'is-filled' : ''} />)}</span>
          </div>}
          {def.noRewards ? !session.ensembleCoda && (
            <div className="dg-haul dg-judgment-note">
              <span className="dg-label">{t('Điều kiện sống sót', 'Survival condition')}</span>
              <span className="dg-haul-val">{def.theme === 'ensemble' ? t('Giữ một nhịp của riêng mình', 'Keep a beat of your own') : t('Qua bốn chặng · Không được rút lui', 'Clear four stages · No retreat')}</span>
            </div>
          ) : (
            <div className="dg-haul">
              <span className="dg-label">{t('Thu hoạch', 'Haul')}</span>
              <span className="dg-haul-val">
                <b className="num">{session.accumulatedLootAhn || 0}</b> Ahn
                {(session.accumulatedMerit || 0) > 0 && <> · <b className="num">{session.accumulatedMerit}</b> {t('công trạng', 'merit')}</>}
              </span>
              {(session.delveStake || 0) > 0 && <span className="dg-need is-unmet">{t(`Cược sâu ${session.delveStake}/2: hàng ở các trận tới +${session.delveStake * 35}%, sát thương nhận +${session.delveStake === 2 ? 35 : 15}%`, `Deep wager ${session.delveStake}/2: future fight loot +${session.delveStake * 35}%, damage taken +${session.delveStake === 2 ? 35 : 15}%`)}</span>}
            </div>
          )}
        </section>

        {session.companion && (
          <p className="dg-ambient">{t(`Đi cùng: ${session.companion.nameVi}`, `With you: ${session.companion.nameEn}`)}</p>
        )}

        {result && (
          <aside key={`${result.stageNum}-${result.type}-${strain}`} className={`dg-result is-${result.type || 'pass'}`} aria-live="polite">
            <p>{pick(result.vi, result.en)}</p>
          </aside>
        )}

        <section key={session.combat ? `f${session.combat.floor}-${session.combat.phase || 1}` : currentIdx} className="dg-scene">
          <h4 className="dg-scene-title">
            <span>{stage.sceneLabelVi ? t(stage.sceneLabelVi, stage.sceneLabelEn) : route ? t('Sau trận cuối', 'After the last fight') : t(`Chặng ${currentIdx + 1} / ${stages.length}`, `Stage ${currentIdx + 1} / ${stages.length}`)}</span>
            {pick(stage.nameVi, stage.nameEn)}
          </h4>
          {fight && (
            <div className="dg-foe" aria-label={t('Kẻ thù', 'Enemy')}>
              <div className="dg-foe-guard" role="meter" aria-valuemin={0} aria-valuemax={fight.guardMax} aria-valuenow={fight.guard} aria-label={t('Thế thủ còn lại', 'Guard left')}>
                {Array.from({ length: fight.guardMax }, (_, i) => (
                  <span key={i} className={`dg-foe-pip ${i < fight.guard ? 'is-up' : ''}`} />
                ))}
                {fight.isBoss && <span className="dg-foe-phase">{t(`Pha ${fight.phase}`, `Phase ${fight.phase}`)}</span>}
              </div>
              <p className={`dg-intent is-${fight.intent.kind}`}>
                <span className="dg-intent-kind">{pick(fight.intent.kindVi, fight.intent.kindEn)}</span>
                <span className="dg-intent-name">{pick(fight.intent.nameVi, fight.intent.nameEn)}</span>
              </p>
              {fight.next && (
                <p className="dg-intent-next">{t('Đòn sau', 'Next')}: {pick(fight.next.kindVi, fight.next.kindEn)} · {pick(fight.next.nameVi, fight.next.nameEn)}</p>
              )}
              <details className="dg-foe-help">
                <summary>{t('Cách đáp đòn', 'How to answer')}</summary>
                <p>{t('Thủ hợp với đòn nặng và tấn công tâm trí. Phản công hợp với đòn nhanh. Né hợp với đòn quét và túm giữ, nhưng có thể trượt. Đáp đúng thì kẻ thù mất thế; phản công đúng lúc làm mất hai nấc.', 'Guard suits heavy blows and mind attacks. Strike suits quick attacks. Evade suits sweeps and grabs, but can miss. The right answer breaks a notch of guard; a well-timed strike breaks two.')}</p>
              </details>
            </div>
          )}
          <p className="dock-text">{pick(stage.descVi, stage.descEn)}</p>
        </section>

        <ul className="choices dg-choices">
          {stage.choices.map((ch, idx) => {
            const avail = isDungeonChoiceAvailable(ch, char, session);
            const odds = evaluateDungeonChoiceOdds(ch, char, session);
            const label = pick(ch.labelVi, ch.labelEn);
            const alt = pick(ch.labelEn, ch.labelVi);
            const trait = ch.companionLead ? TRAIT_NAMES.bond : ch.checkTrait ? TRAIT_NAMES[ch.checkTrait] : null;
            const hasItem = ch.reqItem ? (char.inventory || []).some((i) => (i.id || i) === ch.reqItem) : true;
            const ahn = (odds?.estLoot || 0) + Math.max(0, odds?.estWealth || 0);
            return (
              <li key={idx}>
                <button
                  type="button"
                  className={`choice dg-choice ${ch.isFlee ? 'is-leave' : ''}`}
                  disabled={!avail}
                  onClick={() => {
                    if (!avail) return;
                    if (ch.isFlee) {
                      audioEngine.playClick();
                    } else if (ch.costHp || ch.checkTrait === 'vigor') {
                      audioEngine.playBladeClash();
                    } else if (def.theme === 'warp') {
                      audioEngine.playWarpSurge();
                    } else if (ch.checkTrait) {
                      audioEngine.playDiceRoll();
                    } else {
                      audioEngine.playClick();
                    }
                    onPick(idx);
                  }}
                >
                  <span className="choice-badge">{idx + 1}</span>
                  <span className="choice-content">
                    <span className="choice-label">{label}</span>
                    {bilingual && alt && alt !== label && <span className="choice-alt">{alt}</span>}
                    <span className="preview">
                      {trait && (
                        <span className={`dg-odds ${odds.successPct >= 80 ? 'is-high' : odds.successPct >= 60 ? 'is-mid' : 'is-low'}`}>
                          <Sparkles size={12} aria-hidden="true" />
                          {t(trait[0], trait[1])} {odds.successPct}%
                        </span>
                      )}
                      {ch.side && <span className="dg-need is-met">{t('Ngõ phụ, thêm một chặng', 'Side room, one more stage')}</span>}
                      {Number.isInteger(ch.goto) && <span className="dg-need is-met">{t('Lối tắt, bỏ qua một chặng', 'Shortcut, skips a stage')}</span>}
                      {ch.companionLead && <span className="dg-need is-met">{t('Người đi cùng chịu rủi ro thay bạn', 'Your companion takes the risk')}</span>}
                      {ch.reqItem && (
                        <span className={`dg-need ${hasItem ? 'is-met' : 'is-unmet'}`}>
                          <Package size={12} aria-hidden="true" />
                          {hasItem ? t('Dùng vật phẩm', 'Uses an item') : t('Thiếu vật phẩm', 'Item missing')}
                        </span>
                      )}
                      {ch.costAhn && <span className={`dg-need ${(char.stats?.wealth ?? 0) >= ch.costAhn ? 'is-met' : 'is-unmet'}`}>{ch.costAhn} Ahn</span>}
                      {ch.isFlee && (
                        <span className="dg-need is-met"><LogOut size={12} aria-hidden="true" />{def.theme === 'ensemble' ? t('Rời nhà hát · mất danh tiếng', 'Leave the theatre · lose reputation') : t('Rút lui, giữ hàng đã gom', 'Leave with what you hold')}</span>
                      )}
                      {ch.ensembleHarmony > 0 && <span className="dg-need is-unmet">{t(`+${ch.ensembleHarmony} Hòa âm · 3 dấu mở tiếng gọi`, `+${ch.ensembleHarmony} Harmony · 3 marks summon the voice`)}</span>}
                      {ch.ensembleHarmony > 0 && ch.strainDelta < 0 && <span className="dg-need is-met">{t('Giảm áp lực', 'Less strain')}</span>}
                      {ch.ensembleAccept && <span className="dg-need is-unmet">{t('Trở thành Distortion · mất con đường hiện tại', 'Become a Distortion · lose your current path')}</span>}
                      {ch.ensembleResist && <span className="dg-need is-unmet">{t('Trượt kiểm định: chết', 'Failed check: death')}</span>}
                      {def.theme === 'ensemble' && currentIdx === stages.length - 1 && ch.checkTrait && !session.ensembleCoda && <span className="dg-need is-unmet">{t('Trượt hồi cuối: chết', 'Failed finale: death')}</span>}
                      {ch.restAction === 'push' && <span className="dg-need is-unmet">{t(`Trận sau: loot +35%, đòn đau hơn ${(session.delveStake || 0) >= 1 ? 20 : 15}%`, `Later fights: loot +35%, hits ${(session.delveStake || 0) >= 1 ? 20 : 15}% harder`)}</span>}
                      {def.fatalOnFinalFailure && currentIdx === stages.length - 1 && (
                        <span className="dg-need is-unmet">{t('Trượt kiểm định: chết', 'Failed check: death')}</span>
                      )}
                      {odds?.estHp < 0 && <Chip stat="health" tone="down">HP · {t(...SEVERITY[severityOf(-odds.estHp)])}</Chip>}
                      {odds?.estHp > 0 && <Chip stat="health" tone="up">HP</Chip>}
                      {odds?.estSp < 0 && <Chip stat="sanity" tone="down">SP · {t(...SEVERITY[severityOf(-odds.estSp)])}</Chip>}
                      {odds?.estSp > 0 && <Chip stat="sanity" tone="up">SP</Chip>}
                      {ahn > 0 && <Chip stat="wealth" tone="up">Ahn</Chip>}
                      {odds?.estMerit > 0 && <Chip stat="merit" tone="up">{t('Công trạng', 'Merit')}</Chip>}
                      {odds?.estResonance > 0 && <Chip stat="resonance" tone="up">{t('Cộng hưởng', 'Resonance')}</Chip>}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {stage.canFlee && !def.noRetreat && (
          <div className="dg-leave">
            <button
              type="button"
              className="btn btn-ghost btn-sm dg-leave-btn"
              onClick={() => {
                audioEngine.playClick();
                onFlee?.();
              }}
            >
              <LogOut size={14} aria-hidden="true" />
              <span>{def.theme === 'ensemble' ? t('Rời nhà hát · mất danh tiếng', 'Leave the theatre · lose reputation') : t(`Rút lui và giữ ${session.accumulatedLootAhn || 0} Ahn đã gom`, `Leave and keep the ${session.accumulatedLootAhn || 0} Ahn you hold`)}</span>
              <kbd>F</kbd>
            </button>
          </div>
        )}

        <section className="dg-tools" aria-label={t('Chiến thuật', 'Tactics')}>
          <div className="dg-stances" role="radiogroup" aria-label={t('Thế chiến thuật', 'Stance')}>
            {STANCES.map((st) => {
              const Icon = st.icon;
              const on = st.id === activeStance.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={`dg-stance stance-${st.id} ${on ? 'is-on' : ''}`}
                  onClick={() => {
                    audioEngine.playClick();
                    onSetStance?.(st.id);
                  }}
                  title={def.noRetreat
                    ? st.id === 'guarded'
                      ? t('Giảm sát thương và áp lực; không tăng xác suất kiểm định.', 'Less damage and strain; no bonus to check odds.')
                      : st.id === 'balanced'
                        ? t('Sát thương bình thường, xác suất kiểm định nhỉnh hơn.', 'Normal damage and slightly better check odds.')
                        : t('Tăng cơ hội kiểm định, nhưng chịu nhiều sát thương và áp lực hơn.', 'Better check odds, but more damage and strain.')
                    : pick(st.noteVi, st.noteEn)}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{pick(st.vi, st.en)}</span>
                </button>
              );
            })}
          </div>
          <div className="dg-supplies">
            <button
              type="button"
              className="dg-supply"
              disabled={!breather.ok}
              onClick={() => {
                audioEngine.playBuff();
                onUseSupply?.('breather');
              }}
              title={t(`Nghỉ thở: hồi máu và tinh thần, giảm áp lực. Tốn ${DUNGEON_BALANCE.breather.cost} Ahn và một lần tiếp tế.`, `Catch breath: restores HP and SP, eases strain. Costs ${DUNGEON_BALANCE.breather.cost} Ahn and one supply.`)}
            >
              <HeartPulse size={14} aria-hidden="true" />
              <span>{t('Nghỉ thở', 'Catch breath')}</span>
              <small>{DUNGEON_BALANCE.breather.cost} Ahn</small>
              <kbd>Q</kbd>
            </button>
            <button
              type="button"
              className={`dg-supply ${scan.reason === 'scanned' ? 'is-used' : ''}`}
              disabled={!scan.ok}
              onClick={() => {
                audioEngine.playPrescriptTick();
                onUseSupply?.('scan');
              }}
              title={def.noRewards ? t('Đọc nhịp của đối thủ: tăng cơ hội kiểm định và giảm sát thương trong chặng này.', 'Read the opponent’s rhythm: better odds and less damage this stage.') : t('Dò đường: đọc quy luật của chặng này. Dễ qua kiểm định hơn, nhận ít thương tổn hơn, tìm thêm được chút hàng.', 'Read the stage: better check odds, less damage, a little extra haul.')}
            >
              <Radar size={14} aria-hidden="true" />
              <span>{scan.reason === 'scanned' ? t('Đã dò', 'Read') : t('Dò đường', 'Read stage')}</span>
              <kbd>E</kbd>
            </button>
            {ego.reason !== 'none' && (
              <button
                type="button"
                className={`dg-supply dg-supply--ego ${ego.reason === 'active' ? 'is-used' : ''}`}
                disabled={!ego.ok}
                onClick={() => {
                  audioEngine.playEgo();
                  onUseEgo?.();
                }}
                title={t('Kích hoạt E.G.O: chặng này dễ qua kiểm định hơn nhiều và nhận ít thương tổn hơn. Đổi lại áp lực, tinh thần và Resonance đều tăng. Mỗi lần vào hầm có số lần giới hạn.', 'Awaken the E.G.O: this stage is far easier and hurts less. In exchange strain, sanity and Resonance all take a hit. Limited uses per run.')}
              >
                <Zap size={14} aria-hidden="true" />
                <span>{ego.reason === 'active' ? t('E.G.O đang mở', 'E.G.O open') : t('Kích hoạt E.G.O', 'Awaken E.G.O')}</span>
                <small>{session.egoCharges ?? 0}</small>
                <kbd>R</kbd>
              </button>
            )}
            <span className="dg-supply-count" title={t('Số lần tiếp tế còn lại', 'Supplies left')}>
              {t('Tiếp tế', 'Supplies')} {session.supplyCharges ?? 0}/{session.maxSupplies ?? 2}
            </span>
          </div>
          {Array.isArray(session.cardHand) && session.cardHand.length > 0 && cardBudgetLeft(session) <= 0 && !session.cardActive && (
            <p className="dg-hand-spent">{t('Đã dùng hết bài chiến thuật.', 'Tactic cards spent.')}</p>
          )}
          {Array.isArray(session.cardHand) && session.cardHand.length > 0 && (cardBudgetLeft(session) > 0 || session.cardActive) && (
            <div className="dg-hand" role="group" aria-label={t('Bài chiến thuật', 'Tactic cards')}>
              <span className="dg-hand-label">
                {t('Bài trên tay', 'Hand')} · {t('còn', 'plays left')} {cardBudgetLeft(session)}
              </span>
              <div className="dg-hand-cards">
              {session.cardHand.map((id, slot) => {
                const card = DUNGEON_CARDS[id];
                if (!card) return null;
                const face = cardFace(card);
                const price = cardPrice(card, t);
                return (
                  <button
                    key={`${id}-${slot}`}
                    type="button"
                    className={`dg-card dg-card--${face.kind}`}
                    disabled={Boolean(session.cardActive) || cardBudgetLeft(session) <= 0 || !cardPlayable(id, char)}
                    onClick={() => onPlayCard?.(id)}
                  >
                    <span className="dg-card-kind">{t(face.vi, face.en)}</span>
                    <svg className="dg-card-emblem" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d={face.path} />
                    </svg>
                    <strong className="dg-card-name">{t(card.vi, card.en)}</strong>
                    <small className="dg-card-text">{t(card.textVi, card.textEn)}</small>
                    {price.length > 0 && (
                      <span className="dg-card-price">
                        {price.map((p) => <i key={p.key} className={p.good ? 'is-gain' : 'is-cost'}>{p.label}</i>)}
                      </span>
                    )}
                  </button>
                );
              })}
              </div>
              {session.cardActive && DUNGEON_CARDS[session.cardActive] && (
                <span className="dg-card-active">{t('Đang dùng', 'In play')}: {t(DUNGEON_CARDS[session.cardActive].vi, DUNGEON_CARDS[session.cardActive].en)}</span>
              )}
            </div>
          )}
          <p className="dg-tools-note">
            {def.noRewards
              ? activeStance.id === 'guarded'
                ? t('Thận trọng: ít thương tổn, không cộng tỉ lệ kiểm định.', 'Guarded: less damage, no check bonus.')
                : activeStance.id === 'balanced'
                  ? t('Cân bằng: thương tổn vừa phải, tỉ lệ kiểm định tăng nhẹ.', 'Balanced: normal damage, slightly better odds.')
                  : t('Xung kích: tỉ lệ kiểm định tăng, thương tổn và áp lực cũng tăng.', 'Reckless: better odds, more damage and strain.')
              : pick(activeStance.noteVi, activeStance.noteEn)}
            {mastery.hasMastery && (
              <span className="dg-mastery" title={t('Xuất thân và trang bị giúp bạn nhận ít thương tổn hơn và dễ qua kiểm định hơn.', 'Your background and gear mean less damage and better odds on checks.')}>
                <Award size={13} aria-hidden="true" /> {pick(mastery.labelVi, mastery.labelEn)}
              </span>
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export default DungeonDock;
