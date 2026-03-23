// api/status.js
// La web consulta este endpoint para saber si el bot está online.

const TIMEOUT_MS = 60 * 1000; // 60s sin señal = offline

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  const lastSeen = global['lastSeen'];
  const now      = Date.now();
  const online   = lastSeen && (now - lastSeen) < TIMEOUT_MS;

  return res.status(200).json({
    online:   !!online,
    lastSeen: lastSeen || null,
    ago:      lastSeen ? Math.floor((now - lastSeen) / 1000) : null
  });
}

