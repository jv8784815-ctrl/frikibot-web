// api/ping.js
const BIN_ID  = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Obtener datos actuales
    const getRes = await fetch(`${BIN_URL}/latest`, {
      headers: { 'X-Master-Key': API_KEY },
    });
    const current = await getRes.json();
    const record = current?.record || {};

    const now = Date.now();
    const newRecord = {
      lastSeen: now,
      startTime: record.startTime || now,
      totalPings: (record.totalPings || 0) + 1,
      missedPings: record.missedPings || 0,
    };

    await fetch(BIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      },
      body: JSON.stringify(newRecord),
    });

    return res.status(200).json({ ok: true, ts: now });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
