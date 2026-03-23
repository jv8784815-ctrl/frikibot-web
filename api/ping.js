// api/ping.js
// Tu bot hace POST a este endpoint cada 30s
// Guarda el timestamp en Vercel KV (Redis) — persiste entre reinicios

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Guarda en Vercel KV
    const { kv } = await import('@vercel/kv');
    await kv.set('bot_last_seen', Date.now(), { ex: 120 }); // expira en 120s automáticamente
    return res.status(200).json({ ok: true, ts: Date.now() });
  } catch (err) {
    // Fallback: si KV no está configurado aún
    return res.status(500).json({ ok: false, error: err.message });
  }
}
