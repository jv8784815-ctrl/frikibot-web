export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Falta el número de teléfono' });
  }

  try {
    // Leemos tu Gist específico. El ?t= evita la caché de Vercel.
    const gistRawUrl = "https://gist.githubusercontent.com/jv8784815-ctrl/9b025e8b886f757487ec5024b364acbc/raw/tunnel-subbot.json";
    const responseGist = await fetch(`${gistRawUrl}?t=${Date.now()}`);
    
    if (!responseGist.ok) {
      throw new Error("No se pudo obtener la URL del túnel desde el Gist");
    }
    
    const gistData = await responseGist.json();
    const BOT_SERVER_URL = gistData.tunnel; 

    console.log("🌉 Puente Vercel: Conectando con el bot en:", BOT_SERVER_URL);

    const response = await fetch(`${BOT_SERVER_URL}/api/generate-pairing-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
    
  } catch (error) {
    console.error('❌ Error en el puente de Vercel:', error.message);
    return res.status(500).json({ 
      error: 'El servidor del bot no responde. Asegúrate de que "node tunnel.js" esté corriendo en la PC.' 
    });
  }
}
