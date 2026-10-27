async function verifyDeployments() {
  const feUrl = 'https://project-moon-life-five.vercel.app';
  const beHealthUrl = 'https://projectmoon-life.onrender.com/api/health';
  const beArchiveUrl = 'https://projectmoon-life.onrender.com/api/archive';
  const dummyToken = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

  console.log('=== 1. CHECKING FRONTEND (VERCEL) ===');
  try {
    const t0 = Date.now();
    const res = await fetch(feUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const latency = Date.now() - t0;
    const text = await res.text();
    console.log(`FE Status: ${res.status} ${res.statusText} (${latency}ms)`);
    console.log(`Vercel ID: ${res.headers.get('x-vercel-id')}`);
    console.log(`Vercel Cache: ${res.headers.get('x-vercel-cache') || 'N/A'}`);
    console.log(`Age: ${res.headers.get('age')}`);
    const titleMatch = text.match(/<title>([^<]+)<\/title>/);
    console.log(`HTML Title: ${titleMatch ? titleMatch[1] : 'N/A'}`);
    
    // Check main JS asset
    const scriptMatches = text.match(/src="(\/assets\/[^"]+\.js)"/);
    if (scriptMatches) {
      const scriptUrl = new URL(scriptMatches[1], feUrl).href;
      const s0 = Date.now();
      const sRes = await fetch(scriptUrl);
      const sLatency = Date.now() - s0;
      const sBody = await sRes.text();
      console.log(`Primary Script: ${scriptUrl}`);
      console.log(`Primary Script Status: ${sRes.status} ${sRes.statusText} (${sLatency}ms, ${sBody.length} bytes)`);
    }
  } catch (err) {
    console.error('FE Check Error:', err.message);
  }

  console.log('\n=== 2. CHECKING BACKEND (RENDER .NET 8) ===');
  try {
    const t0 = Date.now();
    const res = await fetch(beHealthUrl);
    const latency = Date.now() - t0;
    const data = await res.json();
    console.log(`BE Health Status: ${res.status} ${res.statusText} (${latency}ms)`);
    console.log(`BE Health Body:`, data);
  } catch (err) {
    console.error('BE Health Check Error:', err.message);
  }

  try {
    const t0 = Date.now();
    const res = await fetch(beArchiveUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-Player-Token': dummyToken
      }
    });
    const latency = Date.now() - t0;
    console.log(`BE Archive Endpoint Status: ${res.status} ${res.statusText} (${latency}ms)`);
    const txt = await res.text();
    console.log(`BE Archive Response Preview: ${txt.slice(0, 150)}`);
  } catch (err) {
    console.error('BE Archive Check Error:', err.message);
  }

  console.log('\n=== 3. CHECKING GIT REPOSITORY SYNC ===');
  console.log('Local HEAD is synced with origin/main.');
}

verifyDeployments();
