/* ══════════════════════════════════════════════════
   DA1MOTORS — perfil.js
══════════════════════════════════════════════════ */

let currentUser = null;

function initPage() {
  const saved = sessionStorage.getItem('da1_user');
  if (saved) {
    currentUser = JSON.parse(saved);
    renderProfile(currentUser);
  } else {
    document.getElementById('authView').style.display = 'flex';
    document.getElementById('profileView').style.display = 'none';
  }
}

function showProfileView() {
    if(currentUser) {
        document.getElementById('authView').style.display = 'none';
        document.getElementById('profileView').style.display = 'block';
    } else {
        showToast("Inicia sesión primero", true);
        document.getElementById('authView').style.display = 'flex';
        document.getElementById('profileView').style.display = 'none';
    }
}

function renderProfile(u) {
  document.getElementById('authView').style.display = 'none';
  document.getElementById('profileView').style.display = 'block';
  document.getElementById('profileName').textContent = u.nombre + ' ' + u.apellidos;
  document.getElementById('profileRole').textContent = u.rol || 'CLIENTE PREMIUM';
  document.getElementById('profileSince').textContent = 'Miembro desde ' + u.desde;
  document.getElementById('heroRef').textContent = 'DA1 — ' + (u.nombre || 'CLIENT').toUpperCase();
  
  if (document.getElementById('cfgNombre')) document.getElementById('cfgNombre').value = u.nombre || '';
  if (document.getElementById('cfgApellidos')) document.getElementById('cfgApellidos').value = u.apellidos || '';
  if (document.getElementById('cfgEmail')) document.getElementById('cfgEmail').value = u.email || '';
  
  setTimeout(animateKPIs, 350);
}

function switchAuthTab(tab) {
  document.querySelectorAll('.da1-auth-tab').forEach((t, i) => t.classList.toggle('active', (tab === 'login') === (i === 0)));
  document.getElementById('formLogin').classList.toggle('active', tab === 'login');
  document.getElementById('formRegister').classList.toggle('active', tab !== 'login');
}

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  if (!email || !pass) { showToast('Completa todos los campos', true); return; }

  const name = email.split('@')[0];
  const u = {
    nombre: name.charAt(0).toUpperCase() + name.slice(1),
    apellidos: 'Usuario',
    email, rol: 'CLIENTE PREMIUM',
    desde: 'Diciembre 2024'
  };
  sessionStorage.setItem('da1_user', JSON.stringify(u));
  currentUser = u;
  renderProfile(u);
  showToast('Sesión iniciada correctamente');
}

function loginDemo() {
  const u = { nombre:'John', apellidos:'Doe', email:'john.doe@da1motors.com', rol:'CLIENTE PREMIUM', desde:'Diciembre 2024' };
  sessionStorage.setItem('da1_user', JSON.stringify(u));
  currentUser = u;
  renderProfile(u);
  showToast('Modo demo activado');
}

function handleLogout() {
  sessionStorage.removeItem('da1_user');
  currentUser = null;
  document.getElementById('profileView').style.display = 'none';
  document.getElementById('authView').style.display = 'flex';
  showToast('Sesión cerrada');
}

function switchTab(tab) {
  document.querySelectorAll('.da1-ptab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.da1-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tab));
  if (tab === 'dashboard') setTimeout(animateKPIs, 100);
}

function animateKPIs() {
  const count = (el, target, dur, fmt) => {
    if (!el) return;
    const s = performance.now();
    const tick = now => {
      const t = Math.min((now - s) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(Math.round(e * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  count(document.getElementById('kpi-pedidos'), 2, 700, v => v);
  count(document.getElementById('kpi-favs'), 4, 900, v => v);
}

let _toastTimer;
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  const i = t.querySelector('i');
  document.getElementById('toastMsg').textContent = msg;
  t.style.borderLeftColor = isError ? '#EF4444' : 'var(--red)';
  i.className = isError ? 'bi bi-exclamation-circle-fill' : 'bi bi-check-circle-fill';
  i.style.color = isError ? '#EF4444' : 'var(--red)';
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// Iniciar
document.addEventListener('DOMContentLoaded', initPage);
// Añade esta función a tu perfil.js si no la tienes para animar la eliminación de coches
function removeFav(btn) {
  const card = btn.closest('.da1-fav-card');
  card.style.cssText += 'transition:opacity .3s,transform .3s;opacity:0;transform:scale(.9)';
  setTimeout(() => {
    card.remove();
    const n = document.querySelectorAll('.da1-fav-card').length;
    document.getElementById('favBadge').textContent = n;
    document.getElementById('kpi-favs').textContent = n;
    document.getElementById('favCount').textContent = n + ' favoritos';
    showToast('Vehículo eliminado de favoritos');
  }, 320);
}