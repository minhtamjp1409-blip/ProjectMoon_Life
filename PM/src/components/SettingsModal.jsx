import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Volume2, VolumeX, Sparkles, Sliders, Monitor, Shield, Zap } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { pick } from '../i18n';
import { audioEngine } from '../engine/audioEngine';
import { LANG_OPTIONS } from '../layouts/Sidebar';

export const SettingsModal = ({ open, onClose }) => {
  const {
    lang: preferredLang,
    setLang,
    textSize,
    setTextSize,
    motionMode,
    setMotion,
    perfMode,
    setPerfMode,
    gameplayMetricsEnabled,
    setGameplayMetrics
  } = useThemeStore();

  const lang = preferredLang;

  // Audio Engine state
  const [audioState, setAudioState] = useState(() => ({
    isMuted: audioEngine.isMuted,
    volume: audioEngine.volume,
    isAmbienceMuted: audioEngine.isAmbienceMuted,
    ambienceVolume: audioEngine.ambienceVolume,
    sfxVolume: audioEngine.sfxVolume ?? 0.8
  }));

  useEffect(() => {
    return audioEngine.subscribe((st) => {
      setAudioState({
        isMuted: st.isMuted,
        volume: st.volume,
        isAmbienceMuted: st.isAmbienceMuted,
        ambienceVolume: st.ambienceVolume,
        sfxVolume: st.sfxVolume ?? 0.8
      });
    });
  }, []);

  // Keyboard navigation & accessibility: only this layer takes Escape and Tab while open, and focus returns to the opener
  const panelRef = React.useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const opener = document.activeElement;
    const focusables = () => Array.from(panelRef.current?.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') || []);
    const first = focusables()[0];
    (first || panelRef.current)?.focus?.();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const items = focusables();
        if (!items.length) { e.preventDefault(); return; }
        const head = items[0];
        const tail = items[items.length - 1];
        const inside = panelRef.current?.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === head || !inside)) { e.preventDefault(); tail.focus(); }
        else if (!e.shiftKey && (document.activeElement === tail || !inside)) { e.preventDefault(); head.focus(); }
        return;
      }
      // Keys meant for the game behind the modal (choice hotkeys) stop here
      if (!panelRef.current?.contains(e.target)) e.stopImmediatePropagation();
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      if (opener && typeof opener.focus === 'function' && document.contains(opener)) opener.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleMasterChange = (e) => {
    const val = parseFloat(e.target.value);
    audioEngine.setVolume(val);
  };

  const handleAmbienceChange = (e) => {
    const val = parseFloat(e.target.value);
    audioEngine.setAmbienceVolume(val);
  };

  const handleSfxChange = (e) => {
    const val = parseFloat(e.target.value);
    audioEngine.setSfxVolume(val);
  };

  return createPortal(
    <div className="city-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={pick(lang, 'Cài đặt hệ thống', 'System Settings')}>
      <div className="settings-panel" ref={panelRef} tabIndex={-1} onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <div className="settings-title-wrap">
            <Sliders size={18} className="settings-icon" aria-hidden="true" />
            <h3 className="settings-title">{pick(lang, 'Cài đặt & Bảng điều khiển', 'Settings & Control Panel')}</h3>
          </div>
          <button type="button" className="settings-close-btn" onClick={onClose} aria-label={pick(lang, 'Đóng cài đặt', 'Close settings')}>
            <X size={18} />
          </button>
        </div>

        <div className="settings-body">
          {/* Section: Audio Mixer */}
          <section className="settings-section">
            <div className="settings-section-head">
              <span className="settings-section-tag">{pick(lang, 'Hòa âm & Môi trường', 'Audio Mixer & Soundscape')}</span>
              <button
                type="button"
                className="settings-quick-mute"
                onClick={() => audioEngine.toggleMute()}
                aria-label={audioState.isMuted ? pick(lang, 'Bật tiếng', 'Unmute sound') : pick(lang, 'Tắt tiếng', 'Mute sound')}
              >
                {audioState.isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{audioState.isMuted ? pick(lang, 'Đã tắt tiếng', 'Muted') : pick(lang, 'Đang phát', 'Active')}</span>
              </button>
            </div>

            <div className="settings-slider-group">
              {/* Master Volume */}
              <div className="settings-slider-row">
                <div className="slider-label-row">
                  <span>{pick(lang, 'Âm lượng tổng (Master)', 'Master Volume')}</span>
                  <span className="slider-num">{Math.round(audioState.volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={audioState.volume}
                  onChange={handleMasterChange}
                  className="settings-slider"
                  aria-label={pick(lang, 'Âm lượng tổng', 'Master Volume')}
                />
              </div>

              {/* Ambience Volume */}
              <div className="settings-slider-row">
                <div className="slider-label-row">
                  <span>{pick(lang, 'Môi trường (Ambience / Mưa, Gió, WARP)', 'Ambience (Rain, Wind, WARP)')}</span>
                  <span className="slider-num">{Math.round(audioState.ambienceVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={audioState.ambienceVolume}
                  onChange={handleAmbienceChange}
                  className="settings-slider"
                  aria-label={pick(lang, 'Âm lượng môi trường', 'Ambience Volume')}
                />
              </div>

              {/* SFX Volume */}
              <div className="settings-slider-row">
                <div className="slider-label-row">
                  <span>{pick(lang, 'Hiệu ứng (SFX / Lật thẻ, Búa, Kiếm)', 'SFX (Cards, Clashes, Forge)')}</span>
                  <span className="slider-num">{Math.round((audioState.sfxVolume ?? 0.8) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={audioState.sfxVolume ?? 0.8}
                  onChange={handleSfxChange}
                  className="settings-slider"
                  aria-label={pick(lang, 'Âm lượng hiệu ứng', 'SFX Volume')}
                />
              </div>
            </div>
          </section>

          {/* Section: Performance Mode */}
          <section className="settings-section">
            <span className="settings-section-tag">{pick(lang, 'Hiệu năng & Thiết bị di động', 'Performance & Mobile Optimization')}</span>
            <div className="settings-toggle-card">
              <div className="toggle-card-info">
                <div className="toggle-card-title-row">
                  <Zap size={15} className="toggle-card-icon" />
                  <strong>{pick(lang, 'Chế độ Tiết kiệm pin / Hiệu năng cao', 'Battery Saver / Low-Power Mode')}</strong>
                </div>
                <p className="toggle-card-desc">
                  {pick(
                    lang,
                    'Tắt canvas hạt thời tiết và đóng băng chuyển động SVG nền để máy mát, tiết kiệm pin tối đa trên điện thoại.',
                    'Disables canvas weather particles and freezes SVG ambient loops to conserve battery and keep mobile devices cool.'
                  )}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={perfMode}
                className={`settings-switch-btn ${perfMode ? 'is-on' : ''}`}
                onClick={() => setPerfMode(!perfMode)}
              >
                <span>{perfMode ? pick(lang, 'Bật', 'On') : pick(lang, 'Tắt', 'Off')}</span>
              </button>
            </div>
          </section>

          {/* Section: Language & Typography */}
          <section className="settings-section">
            <span className="settings-section-tag">{pick(lang, 'Hiển thị & Ngôn ngữ', 'Display & Language')}</span>
            
            {/* Language Chips */}
            <div className="settings-pill-row">
              <span className="settings-sublabel">{pick(lang, 'Ngôn ngữ hiển thị:', 'Language:')}</span>
              <div className="pill-options">
                {LANG_OPTIONS.map((o) => (
                  <button
                    key={o.key}
                    type="button"
                    className={`settings-pill-btn ${preferredLang === o.key ? 'is-active' : ''}`}
                    onClick={() => setLang(o.key)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Story Text Size */}
            <div className="settings-pill-row">
              <span className="settings-sublabel">{pick(lang, 'Cỡ chữ truyện:', 'Story text size:')}</span>
              <div className="pill-options">
                {[
                  ['md', 'Vừa', 'Medium'],
                  ['lg', 'Lớn', 'Large'],
                  ['xl', 'Rất lớn', 'Extra large']
                ].map(([k, vi, en]) => (
                  <button
                    key={k}
                    type="button"
                    className={`settings-pill-btn ${textSize === k ? 'is-active' : ''}`}
                    onClick={() => setTextSize(k)}
                  >
                    {pick(lang, vi, en)}
                  </button>
                ))}
              </div>
            </div>

            {/* Motion */}
            <div className="settings-pill-row">
              <span className="settings-sublabel">{pick(lang, 'Chuyển động:', 'Motion:')}</span>
              <div className="pill-options">
                {[
                  ['system', 'Hệ thống', 'System'],
                  ['full', 'Đầy đủ', 'Full'],
                  ['reduced', 'Giảm', 'Reduced']
                ].map(([k, vi, en]) => (
                  <button
                    key={k}
                    type="button"
                    className={`settings-pill-btn ${motionMode === k ? 'is-active' : ''}`}
                    onClick={() => setMotion(k)}
                  >
                    {pick(lang, vi, en)}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Privacy / Metrics */}
          <section className="settings-section">
            <div className="settings-toggle-card">
              <div className="toggle-card-info">
                <div className="toggle-card-title-row">
                  <Shield size={15} className="toggle-card-icon" />
                  <strong>{pick(lang, 'Gửi số liệu chơi ẩn danh', 'Anonymous Gameplay Metrics')}</strong>
                </div>
                <p className="toggle-card-desc">
                  {pick(
                    lang,
                    'Gửi số năm sống, nguyên nhân tử trận để cân bằng độ khó. Hoàn toàn ẩn danh, không lưu IP hay thiết bị.',
                    'Shares lifespan and ending causes to balance difficulty. Strictly anonymous, no IP or device tracking.'
                  )}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={gameplayMetricsEnabled}
                className={`settings-switch-btn ${gameplayMetricsEnabled ? 'is-on' : ''}`}
                onClick={() => setGameplayMetrics(!gameplayMetricsEnabled)}
              >
                <span>{gameplayMetricsEnabled ? pick(lang, 'Bật', 'On') : pick(lang, 'Tắt', 'Off')}</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
};
