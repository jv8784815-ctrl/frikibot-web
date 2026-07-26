<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Conectar Sub-bot - FrikiBot</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🥖</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&family=Zen+Kaku+Gothic+New:wght@400;700&family=DotGothic16&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
:root {
  --teto: #e62e4d;
  --teto-2: #ff5478;
  --teto-3: #ff8fa8;
  --accent: #00d4aa;
  --dark: #0c0609;
  --dark-2: #140a0f;
  --dark-3: #1e1018;
  --text: #f0dde3;
  --text-dim: #8a6a75;
  --border: #2a151e;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: var(--dark);
  color: var(--text);
  font-family: 'Zen Maru Gothic', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.container {
  max-width: 500px;
  width: 100%;
  background: var(--dark-2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.header { text-align: center; margin-bottom: 2rem; }
.logo { font-size: 3rem; margin-bottom: 1rem; }
h1 { font-size: 2rem; color: var(--text); margin-bottom: 0.5rem; }
.subtitle { color: var(--text-dim); font-size: 0.9rem; }
.form-group { margin-bottom: 1.5rem; }
label { display: block; color: var(--text); font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 700; }
input {
  width: 100%; padding: 1rem; background: var(--dark-3); border: 1px solid var(--border);
  border-radius: 8px; color: var(--text); font-size: 1rem; font-family: inherit; transition: border-color 0.2s;
}
input:focus { outline: none; border-color: var(--accent); }
.btn {
  width: 100%; padding: 1rem; background: var(--accent); color: #fff; border: none;
  border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: inherit;
}
.btn:hover { background: #00b894; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,212,170,0.35); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.box {
  margin-top: 2rem; padding: 1.5rem; background: var(--dark-3); border-radius: 8px; display: none;
}
.box.show { display: block; animation: fadeIn 0.3s; }
.box-code { border: 1px solid var(--accent); }
.box-waiting { border: 1px solid #f0a500; }
.box-success { border: 1px solid var(--accent); background: rgba(0,212,170,0.1); }
.box-error { border: 1px solid var(--teto); background: rgba(230,46,77,0.1); }
.code {
  font-family: 'DotGothic16', monospace; font-size: 2rem; color: var(--accent); text-align: center;
  letter-spacing: 0.3em; margin: 1rem 0; padding: 1rem; background: var(--dark); border-radius: 8px; border: 1px solid var(--border);
}
.status-icon { font-size: 3rem; text-align: center; margin-bottom: 1rem; }
.status-text { font-size: 1.1rem; text-align: center; color: var(--text); margin-bottom: 0.5rem; font-weight: 700; }
.status-desc { font-size: 0.85rem; text-align: center; color: var(--text-dim); line-height: 1.6; }
.instructions { font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; margin-top: 1rem; }
.instructions ol { margin-left: 1.5rem; margin-top: 0.5rem; }
.instructions li { margin-bottom: 0.4rem; }
.timer { text-align: center; font-family: 'DotGothic16', monospace; font-size: 1.2rem; color: #f0a500; margin-top: 0.5rem; }
.error-text { color: var(--teto-3); font-size: 0.9rem; text-align: center; }
.loading {
  display: inline-block; width: 1rem; height: 1rem; border: 2px solid var(--text-dim);
  border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite;
  margin-right: 0.5rem; vertical-align: middle;
}
.pulse-dot {
  display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #f0a500;
  animation: pulseDot 1.5s infinite; margin-right: 0.5rem; vertical-align: middle;
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulseDot { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.back-link { display: inline-block; margin-top: 1.5rem; color: var(--accent); text-decoration: none; font-size: 0.9rem; }
.back-link:hover { text-decoration: underline; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="logo">🤖</div>
    <h1>Conectar Sub-bot</h1>
    <p class="subtitle">Vincula tu número de WhatsApp con FrikiBot</p>
  </div>

  <form id="connectForm">
    <div class="form-group">
      <label for="phone">Número de teléfono (con código de país)</label>
      <input type="tel" id="phone" placeholder="Ej: 521234567890" required>
    </div>
    <button type="submit" class="btn" id="submitBtn">
      <i class="fas fa-link"></i> Solicitar código
    </button>
  </form>

  <!-- PASO 1: CÓDIGO GENERADO -->
  <div class="box box-code" id="codeBox">
    <label style="text-align:center; display:block;">Tu código de vinculación:</label>
    <div class="code" id="codeDisplay">XXXX-XXXX</div>
    <div class="instructions">
      <strong>Para conectar tu sub-bot:</strong>
      <ol>
        <li>Abre WhatsApp en tu teléfono.</li>
        <li>Ve a <strong>Configuración</strong> > <strong>Dispositivos vinculados</strong>.</li>
        <li>Toca <strong>Vincular un dispositivo</strong>.</li>
        <li>En la parte inferior, toca <strong>Vincular con número de teléfono</strong>.</li>
        <li>Ingresa el código de arriba.</li>
      </ol>
    </div>
  </div>

  <!-- PASO 2: ESPERANDO CONEXIÓN -->
  <div class="box box-waiting" id="waitingBox">
    <div class="status-icon">⏳</div>
    <div class="status-text"><span class="pulse-dot"></span> Esperando conexión...</div>
    <div class="status-desc">Ingresa el código en WhatsApp. Estamos esperando.</div>
    <div class="timer" id="timerDisplay">60s</div>
  </div>

  <!-- PASO 3: CONECTADO -->
  <div class="box box-success" id="successBox">
    <div class="status-icon">✅</div>
    <div class="status-text" style="color: var(--accent);">¡Sub-bot conectado!</div>
    <div class="status-desc">Tu sub-bot está listo y funcionando. Ya puedes usarlo en tus grupos.</div>
  </div>

  <!-- PASO 4: ERROR -->
  <div class="box box-error" id="errorBox">
    <div class="status-icon">❌</div>
    <div class="error-text" id="errorText">Error desconocido</div>
  </div>

  <a href="/" class="back-link">
    <i class="fas fa-arrow-left"></i> Volver al inicio
  </a>
</div>

<script>
const form = document.getElementById('connectForm');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const codeBox = document.getElementById('codeBox');
const waitingBox = document.getElementById('waitingBox');
const successBox = document.getElementById('successBox');
const errorBox = document.getElementById('errorBox');
const codeDisplay = document.getElementById('codeDisplay');
const errorText = document.getElementById('errorText');
const timerDisplay = document.getElementById('timerDisplay');

let checkInterval = null;
let timerInterval = null;
let timeLeft = 60;

// Ocultar todas las cajas
function hideAll() {
  codeBox.classList.remove('show');
  waitingBox.classList.remove('show');
  successBox.classList.remove('show');
  errorBox.classList.remove('show');
  if (checkInterval) { clearInterval(checkInterval); checkInterval = null; }
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

// Mostrar una caja
function showBox(box) {
  hideAll();
  box.classList.add('show');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const phone = phoneInput.value.trim().replace(/\D/g, '');
  
  if (!phone || phone.length < 10) {
    errorText.textContent = 'Por favor ingresa un número válido con código de país (Ej: 521234567890)';
    showBox(errorBox);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading"></span> Solicitando código...';
  hideAll();

  try {
    const response = await fetch('/api/connect-subbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al solicitar el código');
    }

    if (data.code) {
      // Mostrar el código
      codeDisplay.textContent = data.code;
      showBox(codeBox);

      // Después de 3 segundos, cambiar a modo espera
      setTimeout(() => {
        showBox(waitingBox);
        startTimer(60);
        startChecking(data.session);
      }, 3000);

    } else if (data.message && data.message.includes('ya estaba conectado')) {
      showBox(successBox);
    } else {
      throw new Error('No se recibió un código válido');
    }

  } catch (error) {
    errorText.textContent = error.message;
    showBox(errorBox);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-link"></i> Solicitar código';
  }
});

// Temporizador de 60 segundos
function startTimer(seconds) {
  timeLeft = seconds;
  timerDisplay.textContent = `${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;
    if (timeLeft <= 10) {
      timerDisplay.style.color = 'var(--teto)';
    }
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
      errorText.textContent = 'El código expiró. Solicita uno nuevo.';
      showBox(errorBox);
    }
  }, 1000);
}

// Verificar estado de conexión cada 3 segundos
function startChecking(session) {
  checkInterval = setInterval(async () => {
    try {
      const response = await fetch(`/api/subbot-status?session=${session}`);
      const data = await response.json();

      if (data.connected) {
        // ¡Conectado!
        clearInterval(checkInterval);
        checkInterval = null;
        clearInterval(timerInterval);
        timerInterval = null;
        showBox(successBox);
      } else if (data.status === 'not_found') {
        // La sesión desapareció
        clearInterval(checkInterval);
        checkInterval = null;
        clearInterval(timerInterval);
        timerInterval = null;
        errorText.textContent = 'La sesión se cerró. Intenta de nuevo.';
        showBox(errorBox);
      }
      // Si status es 'waiting' o 'pending', seguimos esperando
    } catch (error) {
      console.error('Error verificando estado:', error);
    }
  }, 3000);
}
</script>
</body>
</html>
