// api/heartbeat.js
// Tu bot hace POST a este endpoint cada 30s para indicar que sigue vivo.

const STORAGE_KEY = 'lastSeen';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  global[STORAGE_KEY] = Date.now();

  return res.status(200).json({ ok: true, ts: global[STORAGE_KEY] });
}
