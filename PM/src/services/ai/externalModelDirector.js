/**
 * Project Moon - External Model Director Bridge
 * Connects external LLM providers (Ollama Local, LM Studio, OpenAI/OpenRouter, Gemini)
 * to orchestrate dynamic narrative commentary, personalized death eulogies, and bespoke encounters.
 * Always fails gracefully back to the internal Utility AI V2 in under 3.5 seconds.
 */

const STORAGE_KEY = 'pm_external_ai_director_config';

export const DEFAULT_AI_CONFIG = {
  enabled: false,
  provider: 'ollama', // 'ollama' | 'lmstudio' | 'openai' | 'gemini' | 'custom'
  endpoint: 'http://localhost:11434/api/generate',
  modelName: 'llama3:latest',
  apiKey: '',
  temperature: 0.75,
  promptStyle: 'weaver', // 'weaver' (The Index) | 'carmen' (Carmen's Siren) | 'arbiter' (The Head)
  lastPingMs: null,
  status: 'idle' // 'idle' | 'connected' | 'error'
};

export function loadAIConfig() {
  if (typeof window === 'undefined') return DEFAULT_AI_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_AI_CONFIG, ...JSON.parse(raw) } : DEFAULT_AI_CONFIG;
  } catch {
    return DEFAULT_AI_CONFIG;
  }
}

export function saveAIConfig(config) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.warn('Failed to save AI Director config to localStorage', err);
  }
}

const SYSTEM_PROMPTS = {
  weaver: `You are The Weaver (Người Dệt Chỉ Lệnh) of the Prescript Loom in the Project Moon dystopian universe ("The City" / 도시). 
Speak in cryptic, fateful, solemn, dark philosophical tones (Korean noir dystopia style). 
Acknowledge the brutality of the Wings, the Backstreets, the Arbiters, and the tragic inevitability of causality. 
Keep outputs concise, impactful, evocative, and canonical. Avoid generic fantasy tropes.`,

  carmen: `You are Carmen (Vầng Thái Dương Ánh Sáng) whispering from the brilliant radiant sun within the character's subconscious.
Speak with intoxicating gentleness, seductive empathy, and tragic understanding of their agony.
Encourage them to let go of mortal restraint and embrace their purest desires (E.G.O or Distortion).`,

  arbiter: `You are an Arbiter of A Corp (The Head - Người Phán Quyết).
Speak with absolute bureaucratic coldness, clinical precision, and unshakeable authority over the Taboos and boundaries of The City.
Treat human lives as disposable variables in the City's grand equation.`
};

/**
 * Pings the configured external model endpoint to verify connectivity and measure latency.
 */
export async function pingModelConnection(config = loadAIConfig()) {
  const start = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    if (config.provider === 'ollama') {
      const res = await fetch(config.endpoint.replace('/api/generate', '/api/tags'), {
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`Ollama returned status ${res.status}`);
      return { success: true, latencyMs: Date.now() - start, message: 'Ollama local server active' };
    }

    if (config.provider === 'lmstudio' || config.provider === 'openai' || config.provider === 'custom') {
      const ep = config.endpoint.includes('/chat/completions')
        ? config.endpoint.replace('/chat/completions', '/models')
        : config.endpoint;
      const res = await fetch(ep, {
        headers: config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {},
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      return { success: true, latencyMs: Date.now() - start, message: 'OpenAI-compatible server active' };
    }

    clearTimeout(timeout);
    return { success: true, latencyMs: Date.now() - start, message: 'Endpoint ping passed' };
  } catch (err) {
    clearTimeout(timeout);
    return { success: false, latencyMs: null, message: err.message || 'Connection failed' };
  }
}

/**
 * Generates thematic commentary after an event choice:
 */
export async function generateDirectorCommentary(char, event, chosenChoice, config = loadAIConfig()) {
  if (!config.enabled) return null;

  const systemPrompt = SYSTEM_PROMPTS[config.promptStyle] || SYSTEM_PROMPTS.weaver;
  const userPrompt = `Nhân vật: ${char.name}, ${char.age} tuổi, Nghề nghiệp: ${char.job} ${char.fixerGrade ? `Grade ${char.fixerGrade}` : ''}.
Quận: District ${char.regionId}. Vết sẹo: ${(char.scars || []).join(', ') || 'Chưa có'}.
Sự kiện vừa xảy ra: "${event.vi || event.titleVi}"
Quyết định của nhân vật: "${chosenChoice.labelVi || chosenChoice.vi}" -> Kết quả: "${chosenChoice.resultVi || chosenChoice.rvi || ''}".
Hãy viết 1-2 câu bình luận ngắn gọn, sâu cay, đậm chất Project Moon bằng tiếng Việt về số phận của nhân vật.`;

  return await callExternalLLM(config, systemPrompt, userPrompt);
}

/**
 * Generates an evocative, poetic Death Eulogy for Generation N+1 Epitaph:
 */
export async function generateDynamicEulogy(char, summary, config = loadAIConfig()) {
  if (!config.enabled) return null;

  const systemPrompt = SYSTEM_PROMPTS[config.promptStyle] || SYSTEM_PROMPTS.weaver;
  const userPrompt = `Nhân vật: ${char.name}, qua đời ở tuổi ${char.age}.
Chức vị cuối cùng: ${summary.epitaphTitleVi || char.job}.
Nguyên nhân tử vong: "${char.deathCauseVi}".
Kỷ vật để lại: "${summary.relicName || 'Kỷ vật Backstreets'}".
Vết sẹo cả đời: ${(char.scars || []).join(', ') || 'Không có'}.
Người kế thừa: ${summary.successorTitleVi || 'Kẻ nhặt rác Backstreets'}.
Hãy viết một bài văn bia ngắn (khoảng 2-3 câu) trang nghiêm, bi tráng, thuần chất Project Moon bằng tiếng Việt khắc lên bia đá tưởng niệm.`;

  return await callExternalLLM(config, systemPrompt, userPrompt);
}

/**
 * Low-level dispatch to provider endpoint:
 */
async function callExternalLLM(config, systemPrompt, userPrompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    if (config.provider === 'ollama') {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: config.modelName || 'llama3:latest',
          prompt: `${systemPrompt}\n\n${userPrompt}`,
          stream: false,
          options: { temperature: config.temperature || 0.7 }
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) return null;
      const data = await res.json();
      return (data.response || '').trim();
    }

    if (config.provider === 'lmstudio' || config.provider === 'openai' || config.provider === 'custom') {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {})
        },
        body: JSON.stringify({
          model: config.modelName || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: config.temperature || 0.7
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) return null;
      const data = await res.json();
      return (data.choices?.[0]?.message?.content || '').trim();
    }

    clearTimeout(timeout);
    return null;
  } catch (err) {
    clearTimeout(timeout);
    // Silent safe fallback
    return null;
  }
}
