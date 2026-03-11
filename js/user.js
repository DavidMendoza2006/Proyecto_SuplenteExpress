const supabaseUrl = window.DA1_ENV.SUPABASE_URL;
const supabaseKey = window.DA1_ENV.SUPABASE_ANON_KEY;
const supabaseApp = window.supabase.createClient(supabaseUrl, supabaseKey);

let currentUser = null;
let baseTotalInvested = 0;
let userKpis = { pedidos: 0, favoritos: 0, gastado: 0 };

async function initPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestedTab = urlParams.get('tab');

  if (requestedTab === 'login' || requestedTab === 'register') {
    await handleLogout(false);
  }

  try {
    const { data: { session } } = await supabaseApp.auth.getSession();

    const guestItems = document.querySelectorAll('.auth-guest');
    const userItems = document.querySelectorAll('.auth-user');

    if (session) {
      guestItems.forEach(el => el.style.display = 'none');
      userItems.forEach(el => el.style.display = 'flex');

      if (document.getElementById('profileView')) {
        await cargarPerfilReal();
      }
    } else {
      guestItems.forEach(el => el.style.display = 'flex');
      userItems.forEach(el => el.style.display = 'none');

      if (document.getElementById('authView')) {
        document.getElementById('authView').style.display = 'flex';
        document.getElementById('profileView').style.display = 'none';
        if (requestedTab === 'register') switchAuthTab('register');
        else switchAuthTab('login');
      }
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
    showToast('Rellena todos los campos', true);
    return;
  }

  if (pass.length < 8) {
    showToast('La seguridad es lo primero: mínimo 8 caracteres', true);
    return;
  }

  showToast('Creando cuenta VIP...', false);

  const { data, error } = await supabaseApp.auth.signUp({
    email: email,
    password: pass,
    options: {
      data: { nombre: nombre, apellidos: apellidos }
    }
  });

  if (error) {
    showToast(error.message, true);
  } else {
    showToast('¡Cuenta creada! Revisa tu email para confirmar.', false);
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
    setTimeout(() => window.location.href = 'user.php', 1000);
  }
}

async function handleLogout(redirect = true) {
  try {
    if (redirect && typeof showToast === 'function') {
      showToast('Cerrando sesión...');
    }

    await supabaseApp.auth.signOut();
    localStorage.removeItem('da1_perfil_cache');
    sessionStorage.removeItem('da1_user');

    if (redirect) {
      setTimeout(() => {
        if (window.location.pathname.includes('index.php') || window.location.pathname === '/') {
          window.location.reload();
        } else {
          window.location.href = 'index.php';
        }
      }, 1200);
    }
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}
async function cargarPerfilReal() {
  const cacheLocal = localStorage.getItem('da1_perfil_cache');
  if (cacheLocal) {
    const dataGuardada = JSON.parse(cacheLocal);
    currentUser = dataGuardada.perfil;
    userKpis = dataGuardada.kpis;
    baseTotalInvested = Number(dataGuardada.kpis.gastado || 0);
    renderProfileDynamic();
  }

  try {
    const response = await fetch('api_perfil.php');
    if (!response.ok) throw new Error("Fallo PHP");

    const data = await response.json();
    if (data.status === 'success') {

      localStorage.setItem('da1_perfil_cache', JSON.stringify(data));

      currentUser = data.perfil;
      userKpis = data.kpis;
      baseTotalInvested = Number(data.kpis.gastado || 0);

      renderProfileDynamic();
    }
  } catch (error) {
    console.error("Error comprobando novedades:", error);
  }
}

function renderProfileDynamic() {
  document.getElementById('authView').style.display = 'none';
  document.getElementById('profileView').style.display = 'block';

  if (currentUser) {
    const tgl = document.getElementById('tgl2FA');
    if (tgl) {
      tgl.checked = (currentUser.f2a_activo === true || currentUser.f2a_activo === "true");
    }

    document.getElementById('profileName').textContent = currentUser.nombre + ' ' + (currentUser.apellidos || '');
    document.getElementById('heroRef').textContent = 'DA1 — ' + currentUser.nombre.toUpperCase();

    if (document.getElementById('cfgNombre')) document.getElementById('cfgNombre').value = currentUser.nombre;
    if (document.getElementById('cfgApellidos')) document.getElementById('cfgApellidos').value = currentUser.apellidos || '';

    const fecha = new Date(currentUser.creado_en || Date.now())
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
  const tabsContainer = document.getElementById('authTabs');
  const fLogin = document.getElementById('formLogin');
  const fRegister = document.getElementById('formRegister');
  const fUpdate = document.getElementById('formUpdatePassword');

  if (tab === 'update-password') {
    tabsContainer.style.display = 'none';
    fLogin.classList.remove('active');
    fRegister.classList.remove('active');
    fUpdate.style.display = 'flex';
  } else {
    tabsContainer.style.display = 'flex';
    fUpdate.style.display = 'none';

    document.querySelectorAll('.da1-auth-tab').forEach((t, i) => {
      t.classList.toggle('active', (tab === 'login') === (i === 0));
    });

    fLogin.classList.toggle('active', tab === 'login');
    fRegister.classList.toggle('active', tab === 'register');
  }
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
  let t = document.getElementById('toast');

  if (!t) {
    t = document.createElement('div');
    t.className = 'da1-toast';
    t.id = 'toast';
    t.innerHTML = '<i class="bi bi-check-circle-fill"></i><span id="toastMsg"></span>';
    document.body.appendChild(t);
  }

  const i = t.querySelector('i');
  document.getElementById('toastMsg').textContent = msg;
  t.style.borderLeftColor = isError ? '#EF4444' : 'var(--da1-red, #e8001c)';
  i.className = isError ? 'bi bi-exclamation-circle-fill' : 'bi bi-check-circle-fill';
  i.style.color = isError ? '#EF4444' : 'var(--da1-red, #e8001c)';

  setTimeout(() => t.classList.add('show'), 10);

  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

async function handleResetRequest() {
  const email = document.getElementById('loginEmail').value.trim();

  if (!email) {
    showToast('Introduce tu email para enviarte el enlace', true);
    return;
  }

  showToast('Enviando instrucciones al correo...');

  const { data, error } = await supabaseApp.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname + '?tab=update-password',
  });

  if (error) {
    showToast(error.message, true);
  } else {
    showToast('¡Revisa tu bandeja de entrada!');
  }
}
async function handleUpdatePassword() {
  const newPass = document.getElementById('newPassword').value;

  if (newPass.length < 8) {
    showToast('La contraseña debe tener al menos 8 caracteres', true);
    return;
  }

  const { data, error } = await supabaseApp.auth.updateUser({
    password: newPass
  });

  if (error) {
    showToast(error.message, true);
  } else {
    showToast('Contraseña actualizada. Ya puedes entrar.');
    setTimeout(() => window.location.href = 'user.php?tab=login', 2000);
  }
}

supabaseApp.auth.onAuthStateChange((event, session) => {
  if (event === "PASSWORD_RECOVERY") {

    switchAuthTab('update-password');
    showToast("Configure su nueva contraseña de acceso.");
  }
});
async function updateProfile() {
  const nombre = document.getElementById('cfgNombre').value.trim();
  const apellidos = document.getElementById('cfgApellidos').value.trim();

  if (!nombre) {
    showToast('El nombre es obligatorio', true);
    return;
  }

  showToast('Sincronizando con DA1 Cloud...');

  const { error } = await supabaseApp
    .from('perfiles')
    .update({
      nombre: nombre,
      apellidos: apellidos
    })
    .eq('id', currentUser.id);

  if (error) {
    showToast('Error al guardar: ' + error.message, true);
  } else {
    currentUser.nombre = nombre;
    currentUser.apellidos = apellidos;

    const cache = JSON.parse(localStorage.getItem('da1_perfil_cache') || '{}');
    cache.perfil = currentUser;
    localStorage.setItem('da1_perfil_cache', JSON.stringify(cache));

    renderProfileDynamic();

    showToast('¡Perfil actualizado correctamente!');
  }
}
async function handleEmailUpdate() {
  const nuevoEmail = document.getElementById('cfgEmail').value.trim();

  const { data: { session } } = await supabaseApp.auth.getSession();
  if (nuevoEmail === session.user.email) {
    showToast('El email es el mismo que el actual', true);
    return;
  }

  showToast('Enviando códigos de verificación...');

  const { data, error } = await supabaseApp.auth.updateUser({
    email: nuevoEmail
  });

  if (error) {
    showToast(error.message, true);
  } else {
    showToast('¡Petición enviada! Revisa tus bandejas de entrada para confirmar.');
  }
}
async function toggle2FA() {
  const isChecked = document.getElementById('tgl2FA').checked;

  showToast(isChecked ? 'Activando protección 2FA...' : 'Desactivando 2FA...');

  const { error } = await supabaseApp
    .from('perfiles')
    .update({ f2a_activo: isChecked })
    .eq('id', currentUser.id);

  if (error) {
    showToast('Error al actualizar seguridad', true);
    document.getElementById('tgl2FA').checked = !isChecked;
  } else {
    currentUser.f2a_activo = isChecked;
    showToast(isChecked ? '2FA habilitado en base de datos' : '2FA deshabilitado');
  }
}

async function changePasswordFromSettings() {
  const newPass = document.getElementById('newPassSettings').value;

  if (newPass.length < 8) {
    showToast('La contraseña debe tener al menos 8 caracteres', true);
    return;
  }

  showToast('Actualizando credenciales...');

  const { data, error } = await supabaseApp.auth.updateUser({
    password: newPass
  });

  if (error) {
    showToast(error.message, true);
  } else {
    showToast('¡Contraseña actualizada con éxito!');
    document.getElementById('newPassSettings').value = '';
  }
}
async function confirmDelete() {
  const confirmacion = confirm("¿ESTÁS SEGURO? Esta acción es irreversible y perderás todos tus datos en DA1MOTORS.");

  if (confirmacion) {
    showToast("Procesando eliminación definitiva...", true);

    try {
      const { data: { session } } = await supabaseApp.auth.getSession();

      if (!session) return;

      const response = await fetch('eliminar_cuenta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: session.user.id })
      });

      const result = await response.json();

      if (result.status === 'success') {
        await supabaseApp.auth.signOut();
        localStorage.clear();
        showToast("Cuenta eliminada. Gracias por haber formado parte de DA1.");
        setTimeout(() => window.location.href = 'index.php', 2000);
      } else {
        showToast("Error de servidor: " + result.message, true);
      }
    } catch (error) {
      showToast("Error en la conexión", true);
    }
  }
}
let stripe, elements, cardElement;

if (typeof Stripe !== 'undefined') {
  stripe = Stripe('pk_test_51T96SRAwHprUZMBwHXYs8XUo4jmfe8ReqqvnfID1b2LHUv46sPgToSQcZWuRdHS5ORbIdxpTXxO4OXlky5GBR1Rz00jqb7hkdW');
  elements = stripe.elements();
  cardElement = elements.create('card', {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '16px',
        '::placeholder': { color: '#888888' },
      }
    }
  });
}

async function abrirModalPago() {
  showToast("Iniciando conexión segura...");

  try {
    const response = await fetch('crear_setup_intent.php');
    const { clientSecret } = await response.json();

    cardElement.mount('#card-element');

    document.getElementById('payment-form').onsubmit = async (e) => {
      e.preventDefault();
      showToast("Verificando tarjeta con Stripe...");

      const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: { card: cardElement }
      });

      if (error) {
        showToast(error.message, true);
      } else {
        await vincularClienteStripe(setupIntent.payment_method);
      }
    };
  } catch (err) {
    showToast("Error de conexión con la pasarela", true);
  }
}
async function vincularClienteStripe(paymentMethodId) {
  showToast("Vinculando billetera DA1...");

  const response = await fetch('api_pagos.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: currentUser.email, user_id: currentUser.id })
  });

  const result = await response.json();

  if (result.status === 'success') {
    const { error } = await supabaseApp
      .from('perfiles')
      .update({ stripe_customer_id: result.customer_id })
      .eq('id', currentUser.id);

    if (!error) {
      showToast("¡Billetera configurada con éxito!");
      currentUser.stripe_customer_id = result.customer_id;
      bootstrap.Modal.getInstance(document.getElementById('modalStripe')).hide();
    }
  } else {
    showToast("Error en el registro de pago: " + result.message, true);
  }
}
async function suscribirNewsletter() {
  const emailInput = document.getElementById('newsEmail');
  const email = emailInput.value.trim();

  if (!email) {
    showToast("Por favor, introduce tu email.", true);
    return;
  }

  showToast("Procesando suscripción VIP...");

  try {
    const { error } = await supabaseApp
      .from('newsletter')
      .insert([{
        email: email,
        activo: true,
        fuente: 'Footer Web'
      }]);

    if (error && error.code === '23505') {
      showToast("Ya perteneces a nuestra lista VIP.", true);
      emailInput.value = '';
      return;
    } else if (error) {
      showToast("Error al guardar en base de datos.", true);
      return;
    }

    const response = await fetch('api_newsletter.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    });

    const result = await response.json();

    if (result.status === 'success') {
      showToast("¡Suscrito! Revisa tu bandeja de entrada.");
      emailInput.value = '';
    } else {
      showToast("Error enviando el correo: " + result.message, true);
    }
  } catch (error) {
    showToast("Error de conexión con el servidor.", true);
  }
}
async function loginConGoogle() {
  try {
    const { data, error } = await supabaseApp.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/Proyecto_SuplenteExpress/user.php'
      }
    });

    if (error) throw error;

  } catch (error) {
    console.error("Error con Google:", error);
    showToast("Error al conectar con Google.", true);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  initPage();

  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  const temaGuardado = localStorage.getItem('da1_theme');
  if (temaGuardado) {
    htmlEl.setAttribute('data-theme', temaGuardado);
    if (icon) icon.className = temaGuardado === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
  }

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      const nuevoTema = isDark ? 'light' : 'dark';

      htmlEl.setAttribute('data-theme', nuevoTema);
      localStorage.setItem('da1_theme', nuevoTema);

      if (icon) icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    });
  }
});


