import React, { useState } from 'react';
import { Modal } from 'antd';
import { Plus, Cpu, Sparkles, Settings } from 'lucide-react';
import ExternalDirectorModal from './components/ExternalDirectorModal';
import { loadAIConfig } from '../../services/ai/externalModelDirector';
import { useGameStore } from '../../store/gameStore';
import { FATE_OMENS, DRAMA_PHASES } from '../../engine/weaverAI';
import { useT } from '../../i18n';
import PageBanner from '../../components/PageBanner';

const LIST_CAP = 8;

export const WeaverAiPage = () => {
  const { t, lang } = useT();
  const { char, inRun, addCustomEvent } = useGameStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [evText, setEvText] = useState('');
  const [choice1, setChoice1] = useState('');
  const [choice2, setChoice2] = useState('');
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(60);
  const [showAllNodes, setShowAllNodes] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiConfig, setAiConfig] = useState(loadAIConfig());

  const weaver = char.weaver || {};
  const omen = FATE_OMENS.find((o) => o.id === (char.fateOmenId || weaver.mode)) || FATE_OMENS[0];
  const phase = DRAMA_PHASES[weaver.dramaPhase] || DRAMA_PHASES.INCUBATION;
  const threads = weaver.pendingThreads || [];
  const activeThreads = threads.filter((th) => !th.fulfilled).sort((a, b) => a.triggerAge - b.triggerAge);
  const nodes = (weaver.nodes || []).slice().reverse();
  const decisions = weaver.decisionLog || [];
  const nextThread = activeThreads[0];

  const handleSave = () => {
    if (!evText.trim() || !choice1.trim()) return;
    addCustomEvent({
      id: `custom_${Date.now()}`,
      age: [Number(minAge) || 15, Number(maxAge) || 70],
      major: true,
      weight: 25,
      vi: evText.trim(),
      en: evText.trim(),
      choices: [
        {
          labelVi: choice1.trim(),
          labelEn: choice1.trim(),
          resultVi: 'Quyết định của bạn đã khắc một nhánh nhân quả mới vào The City.',
          resultEn: 'Your choice carved a new causal branch in The City.',
          effects: { rep: 10, sanity: 5, wealth: 10 }
        },
        {
          labelVi: choice2.trim() || 'Thận trọng rút lui quan sát',
          labelEn: choice2.trim() || 'Step back and observe',
          resultVi: 'Bạn chọn cách bảo toàn lực lượng.',
          resultEn: 'You preserved your strength.',
          effects: { sanity: 4, network: 6 }
        }
      ]
    });
    setEvText('');
    setChoice1('');
    setChoice2('');
    setModalOpen(false);
  };

  let finding;
  if (!inRun) finding = t('Chưa có kiếp sống nào đang chạy. Khung cửi sẽ ghi lại từ năm đầu tiên.', 'No life is running. The loom records from the first year.');
  else if (nextThread) {
    finding = t(
      `${char.name}, ${char.age} tuổi · ${activeThreads.length} mầm nhân quả đang ủ, mầm gần nhất phát tác ở tuổi ${nextThread.triggerAge}.`,
      `${char.name}, age ${char.age} · ${activeThreads.length} consequences pending, the next at age ${nextThread.triggerAge}.`
    );
  } else {
    finding = t(`${char.name}, ${char.age} tuổi · chưa có mầm nhân quả nào đang ủ.`, `${char.name}, age ${char.age} · no consequences pending.`);
  }

  return (
    <div className="page">
      <PageBanner
        tag="WEAVER_CORE // NARRATIVE_DIRECTOR"
        title={t('Khung cửi chỉ lệnh', 'Prescript loom')}
        sub={finding}
        action={
          <button type="button" className="btn btn-primary btn-lg" onClick={() => setModalOpen(true)}>
            <Plus size={17} />
            {t('Viết sự kiện mới', 'Write a new event')}
          </button>
        }
      />

      <div className="stack">
        <div className="kpis" style={{ '--n': 4 }}>
          <div className="kpi">
            <div className="kpi-label">{t('Pha vận mệnh', 'Drama phase')}</div>
            <div className="kpi-value" style={{ fontSize: 18 }} title={phase.descVi}>
              {t(phase.labelVi.split(' (')[0], phase.labelEn)}
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">{t('Áp lực The City', 'City tension')}</div>
            <div className="kpi-value">
              {weaver.tensionScore ?? 0}
              <small>%</small>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">{t('Mầm nhân quả đang ủ', 'Pending consequences')}</div>
            <div className="kpi-value">{activeThreads.length}</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">{t('Nút ký ức đã khắc', 'Memory nodes')}</div>
            <div className="kpi-value">{nodes.length}</div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>{t('Thiên mệnh lúc chào đời', 'Birth omen')}</h2>
            <span className="panel-meta num">{lang === 'en' ? `${omen.chanceWeight}% chance` : omen.rarityVi}</span>
          </div>
          <div className="panel-body">
            <p style={{ fontWeight: 500 }}>{lang === 'en' ? omen.nameEn : omen.nameVi}</p>
            <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
              {lang === 'en' ? omen.descEn : omen.descVi}
            </p>
          </div>
        </div>

        <div className="grid-2">
          <div className="stack">
            <section className="panel" aria-labelledby="threads-title">
              <div className="panel-head">
                <h2 id="threads-title">{t('Hàng đợi nhân quả', 'Consequence queue')}</h2>
                <span className="panel-meta num">
                  {threads.length} {t('mầm', 'threads')}
                </span>
              </div>
              <div className="panel-body">
                {threads.length === 0 ? (
                  <p className="empty">
                    {t('Chưa có mầm nào. Những lựa chọn lớn trong biên niên sẽ gieo mầm ở đây.', 'Nothing planted yet. Big choices in the chronicle plant them here.')}
                  </p>
                ) : (
                  <div className="rows">
                    {threads.map((th) => (
                      <div className="row" key={th.id}>
                        <div style={{ minWidth: 0 }}>
                          <div className="num muted" style={{ fontSize: 13 }}>
                            {t(`Gieo tuổi ${th.plantedAtAge} → phát tác tuổi ${th.triggerAge}`, `Planted at ${th.plantedAtAge} → due at ${th.triggerAge}`)}
                          </div>
                          <div style={{ fontSize: 14, marginTop: 2 }}>{th.reasonVi}</div>
                        </div>
                        <span className={`pill ${th.fulfilled ? '' : 'pill-warn'}`}>
                          {th.fulfilled ? t('Đã trả quả', 'Resolved') : t('Đang ủ', 'Pending')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="panel" aria-labelledby="nodes-title">
              <div className="panel-head">
                <h2 id="nodes-title">{t('Ký ức & vết sẹo', 'Memories & scars')}</h2>
                {nodes.length > LIST_CAP && (
                  <button type="button" className="btn btn-ghost" style={{ height: 28 }} onClick={() => setShowAllNodes(!showAllNodes)}>
                    {showAllNodes ? t('Thu gọn', 'Show less') : t(`Xem tất cả ${nodes.length}`, `View all ${nodes.length}`)}
                  </button>
                )}
              </div>
              <div className="panel-body">
                {nodes.length === 0 ? (
                  <p className="empty">{t('Chưa có nút ký ức nào.', 'No memory nodes yet.')}</p>
                ) : (
                  <div className="rows">
                    {(showAllNodes ? nodes : nodes.slice(0, LIST_CAP)).map((n) => (
                      <div className="row" key={n.id} style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <span className="num muted" style={{ width: 56, flex: 'none', fontSize: 13 }}>
                          {t('Tuổi', 'Age')} {n.age}
                        </span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 500 }}>{n.labelVi}</div>
                          {n.outcomeVi && <div className="cell-sub">{n.outcomeVi}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

          <section className="panel" aria-labelledby="decisions-title">
            <div className="panel-head">
              <h2 id="decisions-title">{t('Bản ghi chỉ lệnh', 'Prescript log')}</h2>
              <span className="panel-meta num">
                {decisions.length} {t('lượt dệt', 'weaves')}
              </span>
            </div>
            <div className="panel-body" style={{ maxHeight: 640, overflowY: 'auto' }}>
              {decisions.length === 0 ? (
                <p className="empty">{t('Chạy biên niên vài năm để thấy các chỉ lệnh được chọn.', 'Run the chronicle a few years to see which prescripts were chosen.')}</p>
              ) : (
                <div className="rows">
                  {decisions.map((log, i) => (
                    <div key={i} style={{ padding: '10px 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }} className="muted num">
                        <span>
                          {t('Tuổi', 'Age')} {log.age} ·{' '}
                          {DRAMA_PHASES[log.phase] ? t(DRAMA_PHASES[log.phase].labelVi.split(' (')[0], DRAMA_PHASES[log.phase].labelEn) : log.phase}
                        </span>
                        <span>
                          {t('Trọng số', 'Weight')} {log.utility}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, marginTop: 2 }}>
                        <code style={{ fontSize: 13 }}>{log.selectedId}</code>
                      </div>
                      <div className="cell-sub">{log.reasonVi}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        okText={t('Khắc vào khung cửi', 'Add to the loom')}
        cancelText={t('Hủy', 'Cancel')}
        okButtonProps={{ disabled: !evText.trim() || !choice1.trim() }}
        centered
        title={t('Khắc chỉ lệnh tình huống mới', 'Write a new prescript')}
      >
        <div className="stack" style={{ paddingTop: 8 }}>
          <div className="field">
            <label htmlFor="ev-text">{t('Tình huống', 'Situation')}</label>
            <textarea
              id="ev-text"
              className="textarea"
              rows={3}
              placeholder={t('Một Messenger của The Index trao cho bạn mật lệnh…', 'A Messenger of The Index hands you a sealed order…')}
              value={evText}
              onChange={(e) => setEvText(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="ev-c1">{t('Lựa chọn 1', 'Choice 1')}</label>
            <input id="ev-c1" className="input" value={choice1} onChange={(e) => setChoice1(e.target.value)} />
            <span className="hint">+10 {t('danh vọng', 'reputation')}, +10 Ahn, +5 {t('tâm trí', 'sanity')}</span>
          </div>
          <div className="field">
            <label htmlFor="ev-c2">{t('Lựa chọn 2', 'Choice 2')}</label>
            <input id="ev-c2" className="input" value={choice2} onChange={(e) => setChoice2(e.target.value)} />
            <span className="hint">+4 {t('tâm trí', 'sanity')}, +6 {t('mạng lưới', 'network')}</span>
          </div>
          <div className="grid-2" style={{ gap: 12 }}>
            <div className="field">
              <label htmlFor="ev-min">{t('Từ tuổi', 'From age')}</label>
              <input id="ev-min" className="input num" type="number" value={minAge} onChange={(e) => setMinAge(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="ev-max">{t('Đến tuổi', 'To age')}</label>
              <input id="ev-max" className="input num" type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WeaverAiPage;
