const supabaseUrl = 'https://pmgliohbadapwffnixeu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZ2xpb2hiYWRhcHdmZm5peGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzQwNTgsImV4cCI6MjA4ODIxMDA1OH0.b7xMDD9ZPJAaFOjW-bRstuPnkF-Mm7y9CCJ-F_Gzh8g';

const supabaseApp = window.supabase.createClient(supabaseUrl, supabaseKey);

let currentUser = null;
let baseTotalInvested = 0;
let userKpis = { pedidos: 0, favoritos: 0, gastado: 0 };

async function initPage() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
      themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('tab') === 'login' || urlParams.get('tab') === 'register') {
    await handleLogout(false);
  }

  try {
    const { data: { session } } = await supabaseApp.auth.getSession();
    if (session) {
      await cargarPerfilReal();
    } else {
      document.getElementById('authView').style.display = 'flex';
      document.getElementById('profileView').style.display = 'none';
    }
  } catch (error) {
    console.warn("Error sesión", error);
  }
}

async function handleRegister() {
  const nombre = document.getElementById('regNombre')?.value.trim();
  const apellidos = document.getElementById('regApellidos')?.value.trim();
  const email = document.getElementById('regEmail')?.value.trim();
  const pass = document.getElementById('regPass')?.value;

  if (!nombre || !apellidos || !email || !pass) {
    showToast('Rellena todos los campos', true); return;
  }

  showToast('Creando cuenta...', false);
  const { data, error } = await supabaseApp.auth.signUp({
    email: email, password: pass, options: { data: { nombre: nombre, apellidos: apellidos } }
  });

  if (error) { showToast(error.message, true); }
  else {
    showToast('¡Cuenta creada! Inicia sesión.', false);
    setTimeout(() => switchAuthTab('login'), 2000);
  }
}

async function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value;

  if (!email || !pass) { showToast('Completa todos los campos', true); return; }

  showToast('Verificando credenciales...', false);
  const { data, error } = await supabaseApp.auth.signInWithPassword({ email: email, password: pass });

  if (error) {
    showToast('Correo o contraseña incorrectos', true);
  } else {
    try {
      await fetch('iniciar_sesion_php.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: data.user.id })
      });
    } catch (e) { }
    showToast('¡Bienvenido!');
    setTimeout(() => window.location.href = 'user.html', 1000);
  }
}

async function handleLogout(redirect = true) {
  await supabaseApp.auth.signOut();
  try { await fetch('iniciar_sesion_php.php', { method: 'POST', body: JSON.stringify({}) }); } catch (e) { }
  currentUser = null;
  if (redirect) {
    showToast('Cerrando sesión...');
    setTimeout(() => { window.location.href = 'index.html'; }, 800);
  }
}

async function cargarPerfilReal() {
  try {
    const response = await fetch('api_perfil.php');
    if (!response.ok) throw new Error("Fallo PHP");

    const data = await response.json();
    if (data.status === 'success') {
      currentUser = data.perfil;
      userKpis = data.kpis;
      baseTotalInvested = Number(data.kpis.gastado || 0);
      renderProfileDynamic();
    } else {
      console.warn("Aviso PHP:", data.message);
    }
  } catch (error) {
    console.error("Error cargando perfil:", error);
  }
}

function renderProfileDynamic() {
  document.getElementById('authView').style.display = 'none';
  document.getElementById('profileView').style.display = 'block';
  if (currentUser) {
    document.getElementById('profileName').textContent = currentUser.nombre + ' ' + (currentUser.apellidos || '');
    document.getElementById('heroRef').textContent = 'DA1 — ' + currentUser.nombre.toUpperCase();
    if (document.getElementById('cfgNombre')) document.getElementById('cfgNombre').value = currentUser.nombre;
    if (document.getElementById('cfgApellidos')) document.getElementById('cfgApellidos').value = currentUser.apellidos || '';

    const fecha = new Date(currentUser.creado_en || Date.now());
    document.getElementById('profileSince').textContent = 'Miembro desde ' + fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  }
  if (document.getElementById('cfgEmail')) {
    supabaseApp.auth.getSession().then(({ data }) => {
      if (data.session) document.getElementById('cfgEmail').value = data.session.user.email;
    });
  }

  if (document.getElementById('pedidosBadge')) document.getElementById('pedidosBadge').textContent = userKpis.pedidos || 0;
  if (document.getElementById('favBadge')) document.getElementById('favBadge').textContent = userKpis.favoritos || 0;
  if (document.getElementById('kpi-pedidos')) document.getElementById('kpi-pedidos').textContent = userKpis.pedidos || 0;
  if (document.getElementById('kpi-favs')) document.getElementById('kpi-favs').textContent = userKpis.favoritos || 0;

  switchTab('dashboard');
  updatePrices();
}

function switchAuthTab(tab) {
  document.querySelectorAll('.da1-auth-tab').forEach((t, i) => { t.classList.toggle('active', (tab === 'login') === (i === 0)); });
  document.getElementById('formLogin').classList.toggle('active', tab === 'login');
  document.getElementById('formRegister').classList.toggle('active', tab !== 'login');
}

function switchTab(tab) {
  document.querySelectorAll('.da1-ptab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.da1-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tab));
}

let currentCurrency = 'EUR';
const EXCHANGE_RATES = { EUR: 1, USD: 1.09, AED: 4.00 };
const CURRENCY_SYMBOLS = { EUR: '€', USD: '$', AED: 'AED' };

function toggleCurrency() {
  const order = ['EUR', 'USD', 'AED'];
  currentCurrency = order[(order.indexOf(currentCurrency) + 1) % order.length];
  updatePrices();
}

function selectCurrency(el) {
  document.querySelectorAll('.da1-cur-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  if (el.textContent.includes('EUR')) currentCurrency = 'EUR';
  else if (el.textContent.includes('USD')) currentCurrency = 'USD';
  else if (el.textContent.includes('AED')) currentCurrency = 'AED';
  updatePrices();
}

function updatePrices() {
  const kpiTotal = document.getElementById('kpi-total');
  if (!kpiTotal) return;
  const converted = baseTotalInvested * EXCHANGE_RATES[currentCurrency];
  const formatted = converted.toLocaleString('es-ES', { maximumFractionDigits: 0 });

  kpiTotal.style.opacity = '0';
  setTimeout(() => {
    kpiTotal.textContent = CURRENCY_SYMBOLS[currentCurrency] + ' ' + formatted;
    kpiTotal.style.opacity = '1';
  }, 150);
}

let _toastTimer;
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  const i = t.querySelector('i');
  document.getElementById('toastMsg').textContent = msg;
  t.style.borderLeftColor = isError ? '#EF4444' : 'var(--da1-red, #e8001c)';
  i.className = isError ? 'bi bi-exclamation-circle-fill' : 'bi bi-check-circle-fill';
  i.style.color = isError ? '#EF4444' : 'var(--da1-red, #e8001c)';
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

document.addEventListener('DOMContentLoaded', initPage);