let currentUser = null;

function initPage() {
  const navLogout = document.getElementById('navLogoutBtn');
  if (navLogout) {
    navLogout.addEventListener('click', function(e) {
      e.preventDefault();
      sessionStorage.removeItem('da1_user');
      window.location.href = 'user.html';
    });
  }

  const demoRedirect = sessionStorage.getItem('da1_demo_redirect');
  if (demoRedirect) {
    sessionStorage.removeItem('da1_demo_redirect');
    loginDemo();
    return;
  }

  const saved = sessionStorage.getItem('da1_user');
  if (saved) {
    currentUser = JSON.parse(saved);
    renderProfile(currentUser);
  } else {
    document.getElementById('authView').style.display = 'flex';
    document.getElementById('profileView').style.display = 'none';
  }
}

function switchAuthTab(tab) {
  document.querySelectorAll('.da1-auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (tab === 'login') === (i === 0));
  });
  document.getElementById('formLogin').classList.toggle('active', tab === 'login');
  document.getElementById('formRegister').classList.toggle('active', tab !== 'login');
}

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  if (!email || !pass) { showToast('Completa todos los campos', true); return; }
  loginDemo();
}

function handleRegister() {
  showToast('Función de registro en desarrollo', true);
}

function loginDemo() {
  const u = {
    nombre:    'John',
    apellidos: 'Doe',
    email:     'john.doe@da1motors.com',
    rol:       'CLIENTE PREMIUM',
    desde:     'Diciembre 2024'
  };
  sessionStorage.setItem('da1_user', JSON.stringify(u));
  currentUser = u;
  renderProfile(u);
  showToast('Modo desarrollador activado');
}

function handleLogout() {
  sessionStorage.removeItem('da1_user');
  currentUser = null;
  showToast('Cerrando sesión de forma segura...');
  setTimeout(() => { window.location.href = 'index.html'; }, 800);
}

function renderProfile(u) {
  document.getElementById('authView').style.display    = 'none';
  document.getElementById('profileView').style.display = 'block';
  document.getElementById('profileName').textContent   = u.nombre + ' ' + u.apellidos;
  document.getElementById('profileRole').textContent   = u.rol || 'CLIENTE';
  document.getElementById('profileSince').textContent  = 'Miembro desde ' + u.desde;
  document.getElementById('heroRef').textContent       = 'DA1 — ' + u.nombre.toUpperCase();

  if (document.getElementById('cfgNombre'))    document.getElementById('cfgNombre').value    = u.nombre;
  if (document.getElementById('cfgApellidos')) document.getElementById('cfgApellidos').value = u.apellidos;
  if (document.getElementById('cfgEmail'))     document.getElementById('cfgEmail').value     = u.email;

  switchTab('dashboard');
  updatePrices();
}

function switchTab(tab) {
  document.querySelectorAll('.da1-ptab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  document.querySelectorAll('.da1-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + tab);
  });
  if (tab === 'dashboard') setTimeout(animateKPIs, 100);
}

const EXCHANGE_RATES   = { EUR: 1, USD: 1.09, AED: 4.00 };
const CURRENCY_SYMBOLS = { EUR: '€', USD: '$', AED: 'AED' };
let currentCurrency    = 'EUR';
const baseTotalInvested = 2187500;

function toggleCurrency() {
  const order = ['EUR', 'USD', 'AED'];
  currentCurrency = order[(order.indexOf(currentCurrency) + 1) % order.length];
  updatePrices();
}

function selectCurrency(el) {
  document.querySelectorAll('.da1-cur-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  const txt = el.textContent.trim();
  if (txt.includes('EUR'))      currentCurrency = 'EUR';
  else if (txt.includes('USD')) currentCurrency = 'USD';
  else if (txt.includes('AED')) currentCurrency = 'AED';
  updatePrices();
}

function updatePrices() {
  const kpiTotal = document.getElementById('kpi-total');
  if (!kpiTotal) return;
  const converted = baseTotalInvested * EXCHANGE_RATES[currentCurrency];
  const formatted = converted.toLocaleString('es-ES', { maximumFractionDigits: 0 });
  kpiTotal.style.opacity = '0';
  setTimeout(() => {
    kpiTotal.textContent   = CURRENCY_SYMBOLS[currentCurrency] + ' ' + formatted;
    kpiTotal.style.opacity = '1';
  }, 150);
}

function removeFav(btn) {
  const card = btn.closest('.da1-fav-card');
  card.style.cssText += 'transition:opacity .3s,transform .3s;opacity:0;transform:scale(.9)';
  setTimeout(() => {
    card.remove();
    const n = document.querySelectorAll('.da1-fav-card').length;
    document.getElementById('favBadge').textContent  = n;
    document.getElementById('kpi-favs').textContent  = n;
    document.getElementById('favCount').textContent  = n + ' favoritos';
    showToast('Vehículo eliminado de favoritos');
  }, 320);
}

function confirmDelete() {
  if (confirm('¿Estás seguro de que quieres eliminar tu cuenta permanentemente?')) {
    handleLogout();
  }
}

function animateKPIs() {
  const count = (el, target, dur) => {
    if (!el) return;
    const start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(e * target);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  count(document.getElementById('kpi-pedidos'), 2, 700);
  count(document.getElementById('kpi-favs'), document.querySelectorAll('.da1-fav-card').length, 900);
}

let _toastTimer;
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  const i = t.querySelector('i');
  document.getElementById('toastMsg').textContent = msg;
  t.style.borderLeftColor = isError ? '#EF4444' : 'var(--red)';
  i.className  = isError ? 'bi bi-exclamation-circle-fill' : 'bi bi-check-circle-fill';
  i.style.color = isError ? '#EF4444' : 'var(--red)';
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

document.addEventListener('DOMContentLoaded', initPage);