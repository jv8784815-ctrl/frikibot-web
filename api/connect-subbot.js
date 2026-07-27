export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Falta el número de teléfono' });
  }

  try {
    // Leemos el Gist con la URL del túnel
    const gistRawUrl = "https://gist.githubusercontent.com/jv8784815-ctrl/9b025e8b886f757487ec5024b364acbc/raw/tunnel-subbot.json";
    const responseGist = await fetch(`${gistRawUrl}?t=${Date.now()}`);
    
    if (!responseGist.ok) {
      throw new Error("No se pudo obtener la URL del túnel desde el Gist");
    }
    
    const gistData = await responseGist.json();
    const BOT_SERVER_URL = gistData.tunnel;

    if (!BOT_SERVER_URL) {
      throw new Error("La URL del túnel está vacía. Asegúrate de que tunnel.js esté corriendo.");
    }

    console.log("🌉 Puente Vercel: Conectando con el bot en:", BOT_SERVER_URL);

    // Enviar petición al bot en tu PC
    const response = await fetch(`${BOT_SERVER_URL}/api/generate-pairing-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });

    const responseText = await response.text();
    
    // Intentar parsear como JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Respuesta no es JSON válido:', responseText.substring(0, 200));
      throw new Error('El servidor del bot devolvió una respuesta inválida');
    }
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
    
  } catch (error) {
    console.error('❌ Error en el puente de Vercel:', error.message);
    return res.status(500).json({ 
      error: error.message || 'Error al conectar con el servidor del bot',
      details: 'Asegúrate de que tunnel.js y bot.js estén corriendo en tu PC'
    });
  }
}
