// api/status.js
// La web consulta este endpoint para saber si el bot está online
// Lee el timestamp guardado en Vercel KV

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  try {
    const { kv } = await import('@vercel/kv');

    // Si la key existe, el bot hizo ping hace menos de 120s (ver ex en ping.js)
    const lastSeen = await kv.get('bot_last_seen');

    if (!lastSeen) {
      // Key expiró o nunca existió = bot offline
      return res.status(200).json({
        online: false,
        lastSeen: null,
        ago: null
      });
    }

    const ago = Math.floor((Date.now() - lastSeen) / 1000);
    return res.status(200).json({
      online: true,
      lastSeen,
      ago
    });

  } catch (err) {
    return res.status(200).json({
      online: false,
      lastSeen: null,
      ago: null,
      error: err.message
    });
  }
}
