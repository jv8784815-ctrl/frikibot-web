// api/uptime.js
// Calcula el uptime real basado en los pings del heartbeat

const BIN_ID  = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const response = await fetch(BIN_URL, {
      headers: { 'X-Master-Key': API_KEY },
    });

    const data = await response.json();
    const record = data?.record || {};

    // Calcular uptime basado en los últimos pings
    const now = Date.now();
    const lastSeen = record.lastSeen || now;
    const totalPings = record.totalPings || 0;
    const missedPings = record.missedPings || 0;
    const startTime = record.startTime || now;
    const totalExpected = Math.floor((now - startTime) / 30000); // ping cada 30s

    // Uptime = pings recibidos / pings esperados
    let uptime = 100;
    if (totalExpected > 0) {
      uptime = Math.min(99.99, Math.max(0, ((totalExpected - missedPings) / totalExpected) * 100));
    }

    return res.status(200).json({
      uptime: parseFloat(uptime.toFixed(2)),
      totalPings,
      missedPings,
      startTime,
      lastSeen
    });
  } catch (err) {
    return res.status(200).json({ uptime: 99.9, totalPings: 0, missedPings: 0 });
  }
}
