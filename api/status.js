// api/status.js
// La web consulta esto para saber si el bot está online

const BIN_ID  = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
const TIMEOUT = 60000; // 60s sin ping = offline

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const response = await fetch(BIN_URL, {
      headers: { 'X-Master-Key': API_KEY },
    });

    const data = await response.json();
    const lastSeen = data?.record?.lastSeen;

    if (!lastSeen) {
      return res.status(200).json({ online: false, lastSeen: null, ago: null });
    }

    const ago    = Math.floor((Date.now() - lastSeen) / 1000);
    const online = ago < (TIMEOUT / 1000);

    return res.status(200).json({ online, lastSeen, ago });
  } catch (err) {
    return res.status(200).json({ online: false, lastSeen: null, ago: null });
  }
}
