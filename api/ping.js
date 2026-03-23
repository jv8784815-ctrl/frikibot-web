// api/ping.js
// El bot hace POST aquí cada 30s
// Usa jsonbin.io para guardar el estado — sin dependencias extra

const BIN_ID    = process.env.JSONBIN_BIN_ID;
const API_KEY   = process.env.JSONBIN_API_KEY;
const BIN_URL   = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await fetch(BIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      },
      body: JSON.stringify({ lastSeen: Date.now() }),
    });

    return res.status(200).json({ ok: true, ts: Date.now() });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
