import React, { useState, useEffect } from 'react';
import { Modal, Switch, Select, Input, Slider, Button, message, Tag } from 'antd';
import { Cpu, Wifi, Activity, CheckCircle, AlertTriangle, Key, Sparkles } from 'lucide-react';
import { loadAIConfig, saveAIConfig, pingModelConnection } from '../../../services/ai/externalModelDirector';
import { useT } from '../../../i18n';

export const ExternalDirectorModal = ({ open, onClose, onConfigSaved }) => {
  const { t, lang } = useT();
  const [config, setConfig] = useState(loadAIConfig());
  const [pinging, setPinging] = useState(false);
  const [pingResult, setPingResult] = useState(null);

  useEffect(() => {
    if (open) {
      setConfig(loadAIConfig());
      setPingResult(null);
    }
  }, [open]);

  const handleProviderChange = (provider) => {
    let endpoint = config.endpoint;
    let modelName = config.modelName;

    if (provider === 'ollama') {
      endpoint = 'http://localhost:11434/api/generate';
      modelName = 'llama3:latest';
    } else if (provider === 'lmstudio') {
      endpoint = 'http://localhost:1234/v1/chat/completions';
      modelName = 'local-model';
    } else if (provider === 'openai') {
      endpoint = 'https://api.openai.com/v1/chat/completions';
      modelName = 'gpt-4o-mini';
    }

    setConfig((prev) => ({
      ...prev,
      provider,
      endpoint,
      modelName
    }));
  };

  const handleTestConnection = async () => {
    setPinging(true);
    setPingResult(null);
    try {
      const result = await pingModelConnection(config);
      setPingResult(result);
      if (result.success) {
        message.success(t(`Kết nối thành công! Độ trễ: ${result.latencyMs}ms`, `Connected successfully! Latency: ${result.latencyMs}ms`));
      } else {
        message.error(t(`Không thể kết nối: ${result.message}`, `Connection failed: ${result.message}`));
      }
    } catch (err) {
      setPingResult({ success: false, message: err.message });
      message.error(err.message);
    } finally {
      setPinging(false);
    }
  };

  const handleSave = () => {
    saveAIConfig(config);
    message.success(t('Đã lưu cấu hình Bộ Điều Phối AI!', 'Saved AI Director configuration!'));
    if (onConfigSaved) onConfigSaved(config);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--accent-gold)' }}>
          <Cpu size={20} />
          <span>{t('Bộ Điều Phối AI Ngoại (External Model Director)', 'External AI Director Orchestrator')}</span>
        </div>
      }
      width={680}
      className="pm-modal"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
        <p className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
          {t(
            'Hệ thống hỗ trợ kết nối với các mô hình ngôn ngữ lớn (LLM) bên ngoài như Ollama Local (chạy máy cá nhân 100% riêng tư), LM Studio, OpenAI hoặc Custom API. Model ngoài sẽ phối hợp cùng Utility AI để sáng tác điếu văn bia mộ độc nhất, tạo lời bình luận tâm lý của Carmen/Weaver, và viết biến cố cá nhân hóa.',
            'Connect external LLMs like Ollama Local (100% private on your machine), LM Studio, or OpenAI. The external model coordinates with the Utility AI to generate unique epitaph eulogies, psychological Carmen/Weaver commentaries, and personalized encounters.'
          )}
        </p>

        {/* Master Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div>
            <div style={{ fontWeight: 600 }}>{t('Kích hoạt Điều Phối Viên AI Ngoài', 'Enable External AI Director')}</div>
            <div className="muted" style={{ fontSize: 12 }}>{t('Nếu tắt hoặc mất kết nối, hệ thống tự động chạy Utility AI V2 nội bộ an toàn 100%.', 'If disabled or offline, game automatically falls back to internal Utility AI V2.')}</div>
          </div>
          <Switch
            checked={config.enabled}
            onChange={(checked) => setConfig((prev) => ({ ...prev, enabled: checked }))}
          />
        </div>

        {/* Provider Select */}
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
            {t('Nhà Cung Cấp / Nền Tảng (Provider)', 'Provider / Platform')}
          </label>
          <Select
            value={config.provider}
            onChange={handleProviderChange}
            style={{ width: '100%' }}
            options={[
              { label: 'Ollama Local (Offline, Riêng tư, Miễn phí)', value: 'ollama' },
              { label: 'LM Studio / LocalAI (Localhost:1234)', value: 'lmstudio' },
              { label: 'OpenAI / OpenRouter / Groq (Cloud API)', value: 'openai' },
              { label: 'Tùy chỉnh Endpoint (Custom Provider)', value: 'custom' }
            ]}
          />
        </div>

        {/* Endpoint URL */}
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
            {t('Địa Chỉ Endpoint URL', 'Endpoint URL')}
          </label>
          <Input
            value={config.endpoint}
            onChange={(e) => setConfig((prev) => ({ ...prev, endpoint: e.target.value }))}
            placeholder="http://localhost:11434/api/generate"
          />
        </div>

        {/* Model Name */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              {t('Tên Mô Hình (Model Name)', 'Model Name')}
            </label>
            <Input
              value={config.modelName}
              onChange={(e) => setConfig((prev) => ({ ...prev, modelName: e.target.value }))}
              placeholder="llama3:latest / mistral / gpt-4o-mini"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
              {t('Khóa API Key (Nếu có)', 'API Key (Optional)')}
            </label>
            <Input.Password
              value={config.apiKey}
              onChange={(e) => setConfig((prev) => ({ ...prev, apiKey: e.target.value }))}
              placeholder="sk-..."
            />
          </div>
        </div>

        {/* Persona Style */}
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
            {t('Giọng Điệu Chỉ Lệnh (Director Voice Style)', 'Director Persona Style')}
          </label>
          <Select
            value={config.promptStyle}
            onChange={(val) => setConfig((prev) => ({ ...prev, promptStyle: val }))}
            style={{ width: '100%' }}
            options={[
              { label: 'The Prescript Weaver (Người Dệt Chỉ Lệnh · The Index - Bí ẩn, định mệnh)', value: 'weaver' },
              { label: 'Carmen’s Whispers (Vầng Thái Dương Ánh Sáng - Dịu dàng, thấu cảm, dục vọng)', value: 'carmen' },
              { label: 'The Head Arbiter (Người Phán Quyết A Corp - Lạnh lùng, quy chuẩn, áp đặt)', value: 'arbiter' }
            ]}
          />
        </div>

        {/* Temperature */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
            <span>{t('Nhiệt Độ Sáng Tạo (Creativity Temperature)', 'Creativity Temperature')}</span>
            <span className="num">{config.temperature}</span>
          </div>
          <Slider
            min={0.2}
            max={1.0}
            step={0.05}
            value={config.temperature}
            onChange={(val) => setConfig((prev) => ({ ...prev, temperature: val }))}
          />
        </div>

        {/* Test Connection Output */}
        {pingResult && (
          <div style={{ padding: '8px 12px', background: pingResult.success ? 'rgba(78, 201, 176, 0.1)' : 'rgba(235, 87, 87, 0.1)', borderRadius: 6, border: `1px solid ${pingResult.success ? 'var(--state-success)' : 'var(--state-danger)'}`, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            {pingResult.success ? <CheckCircle size={16} color="var(--state-success)" /> : <AlertTriangle size={16} color="var(--state-danger)" />}
            <span>{pingResult.message} {pingResult.latencyMs && `(${pingResult.latencyMs}ms)`}</span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Button
            icon={<Wifi size={16} />}
            loading={pinging}
            onClick={handleTestConnection}
          >
            {t('Kiểm tra kết nối', 'Ping Model')}
          </Button>
          <Button type="primary" onClick={handleSave} style={{ background: 'var(--accent-gold)', borderColor: 'var(--accent-gold)', color: '#000', fontWeight: 600 }}>
            {t('Lưu Cấu Hình', 'Save Configuration')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExternalDirectorModal;
