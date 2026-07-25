// api/ping.js — endpoint para recibir pings del bot y consultar estado
let lastPing = 0;

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    lastPing = Date.now();
    return res.status(200).json({ ok: true, timestamp: lastPing });
  }

  if (req.method === 'GET') {
    const now = Date.now();
    const isOnline = lastPing > 0 && (now - lastPing) < 90000;
    const ago = lastPing > 0 ? Math.floor((now - lastPing) / 1000) : null;
    return res.status(200).json({
      online: isOnline,
      ago: isOnline ? 0 : ago,
      lastPing: lastPing
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
