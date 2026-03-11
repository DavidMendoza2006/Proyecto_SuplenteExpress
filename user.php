<!DOCTYPE html>
<html lang="es" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Perfil - DA1MOTORS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="./bootstrap-icons/bootstrap-icons.css">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/user.css">
</head>

<body>

  <?php include 'header.php'; ?>

  <div class="da1-auth-wrap" id="authView" style="display: none;">
    <div class="da1-auth-glow"></div>
    <div class="da1-auth-card">
      <div class="da1-auth-logo">DA1<span>MOTORS</span></div>

      <div class="da1-auth-tabs" id="authTabs">
        <button class="da1-auth-tab active" onclick="switchAuthTab('login')">Iniciar sesión</button>
        <button class="da1-auth-tab" onclick="switchAuthTab('register')">Crear cuenta</button>
      </div>
      <div class="d-flex flex-column align-items-center justify-content-center mt-4 mb-3">
        <span class="text-muted mb-3 fw-bold" style="font-size: 0.9rem; letter-spacing: 1px;">O ENTRA EN LA PISTA CON</span>

        <button type="button" onclick="loginConGoogle()" class="da1-btn-google">
          <i class="bi bi-google"></i>Google
        </button>
      </div>

      <div class="da1-auth-form active" id="formLogin">
        <div class="da1-field">
          <label>Email</label>
          <input type="email" id="loginEmail" placeholder="tu@email.com">
        </div>
        <div class="da1-field">
          <label>Contraseña</label>
          <input type="password" id="loginPass" placeholder="••••••••">
          <a href="#" onclick="handleResetRequest()" style="font-size: 10px; color: var(--gray); text-decoration: none; margin-top: 8px; text-align: right; display: block;">
            ¿Olvidó su contraseña?
          </a>
        </div>
        <button class="da1-auth-btn" onclick="handleLogin()">Iniciar sesión</button>
      </div>

      <div class="da1-auth-form" id="formRegister">
        <div class="da1-form-row">
          <div class="da1-field"><label>Nombre</label><input type="text" id="regNombre" placeholder="Tu nombre"></div>
          <div class="da1-field"><label>Apellidos</label><input type="text" id="regApellidos" placeholder="Tus apellidos"></div>
        </div>
        <div class="da1-field"><label>Email</label><input type="email" id="regEmail" placeholder="tu@email.com"></div>
        <div class="da1-field"><label>Contraseña</label><input type="password" id="regPass" placeholder="Mínimo 8 caracteres"></div>
        <button class="da1-auth-btn" onclick="handleRegister()">Crear cuenta</button>
      </div>

      <div class="da1-auth-form" id="formUpdatePassword" style="display: none;">
        <div class="da1-auth-subtitle">Configura tu nueva contraseña</div>
        <div class="da1-field">
          <label>Nueva Contraseña</label>
          <input type="password" id="newPassword" placeholder="Mínimo 8 caracteres">
        </div>
        <button class="da1-auth-btn" onclick="handleUpdatePassword()">Guardar nueva clave</button>
      </div>
    </div>
  </div>

  <div id="profileView" style="display:none;">
    <header class="da1-profile-hero">
      <div class="da1-hero-glow"></div>
      <div class="da1-hero-sup">Panel de cliente</div>
      <h1 class="da1-hero-title">Mi <span>Perfil</span></h1>
      <div class="da1-hero-ref" id="heroRef">DA1 — CLIENT PORTAL</div>
    </header>

    <main class="da1-profile-wrap">
      <section class="da1-avatar-block">
        <div class="da1-avatar-ring" id="avatarContainer"><i class="bi bi-person-fill"></i></div>
        <div class="da1-avatar-info">
          <div class="da1-avatar-name" id="profileName">—</div>
          <div class="da1-avatar-role" id="profileRole">CLIENTE PREMIUM</div>
          <div class="da1-avatar-since" id="profileSince">Miembro desde —</div>
        </div>
        <div class="da1-avatar-actions">
          <button class="da1-btn da1-btn-ghost" onclick="handleLogout()">
            <i class="bi bi-box-arrow-right"></i> Cerrar sesión
          </button>
          <button class="da1-btn da1-btn-red" onclick="switchTab('config')">
            <i class="bi bi-pencil-fill"></i> Editar perfil
          </button>
        </div>
      </section>

      <nav class="da1-profile-tabs">
        <button class="da1-ptab active" data-tab="dashboard" onclick="switchTab('dashboard')">
          <i class="bi bi-grid-1x2"></i> Resumen
        </button>
        <button class="da1-ptab" data-tab="pedidos" onclick="switchTab('pedidos')">
          <i class="bi bi-bag-check"></i> Solicitudes
          <span class="da1-ptab-badge" id="pedidosBadge">0</span>
        </button>
        <button class="da1-ptab" data-tab="favoritos" onclick="switchTab('favoritos')">
          <i class="bi bi-heart"></i> Favoritos
          <span class="da1-ptab-badge" id="favBadge">0</span>
        </button>
        <button class="da1-ptab" data-tab="config" onclick="switchTab('config')">
          <i class="bi bi-sliders"></i> Configuración
        </button>
      </nav>

      <section class="da1-panel active" id="panel-dashboard">
        <div class="da1-dashboard-grid">
          <article class="da1-dash-kpi">
            <div class="da1-kpi-icon"><i class="bi bi-bag-check-fill"></i></div>
            <div class="da1-kpi-label">Pedidos activos</div>
            <div class="da1-kpi-val" id="kpi-pedidos">0</div>
            <div class="da1-kpi-sub">Sin pedidos activos</div>
          </article>
          <article class="da1-dash-kpi">
            <div class="da1-kpi-icon"><i class="bi bi-heart-fill"></i></div>
            <div class="da1-kpi-label">Favoritos</div>
            <div class="da1-kpi-val" id="kpi-favs">0</div>
            <div class="da1-kpi-sub">Vehículos guardados</div>
          </article>
          <article class="da1-dash-kpi">
            <div class="da1-kpi-icon"><i class="bi bi-cash-stack"></i></div>
            <div class="da1-kpi-label">Invertido total</div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
              <div class="da1-kpi-val" style="font-size:26px;letter-spacing:0.5px;transition:opacity 0.2s;"
                id="kpi-total">€ 0</div>
              <button class="da1-currency-swap" onclick="toggleCurrency()" title="Cambiar divisa">
                <i class="bi bi-arrow-left-right"></i>
              </button>
            </div>
            <div class="da1-kpi-sub">En 0 vehículos</div>
          </article>
          <article class="da1-dash-kpi">
            <div class="da1-kpi-icon"><i class="bi bi-patch-check-fill"></i></div>
            <div class="da1-kpi-label">Estado cuenta</div>
            <div class="da1-kpi-val" style="font-size:18px;color:var(--gray);">NUEVO</div>
            <div class="da1-kpi-sub">Cuenta verificada</div>
          </article>
        </div>

        <div class="da1-section-head">
          <h2 class="da1-section-title">Actividad reciente</h2>
          <div class="da1-section-line"></div>
        </div>

        <div class="da1-activity"
          style="display: flex; justify-content: center; align-items: center; text-align: center; width: 100%; padding: 40px 20px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px; box-sizing: border-box;">
          <span style="color: var(--gray); font-size: 14px;">No hay actividad reciente.</span>
        </div>
      </section>

      <section class="da1-panel" id="panel-pedidos">
        <div class="da1-section-head" style="margin-bottom:24px;">
          <h2 class="da1-section-title">Historial de pedidos</h2>
          <div class="da1-section-line"></div>
        </div>
        <div class="da1-orders-list"
          style="display: flex; justify-content: center; align-items: center; text-align: center; width: 100%; padding: 80px 20px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px; box-sizing: border-box;">
          <span style="color: var(--gray); font-size: 14px;">Aún no has realizado ningún pedido.</span>
        </div>
      </section>

      <section class="da1-panel" id="panel-favoritos">
        <div class="da1-section-head" style="margin-bottom:24px;">
          <h2 class="da1-section-title">Vehículos guardados</h2>
          <div class="da1-section-line"></div>
        </div>
        <div class="da1-favorites-grid" id="favsGrid"
          style="display: flex; justify-content: center; align-items: center; text-align: center; width: 100%; grid-column: 1 / -1; padding: 80px 20px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px; box-sizing: border-box;">
          <span style="color: var(--gray); font-size: 14px;">No tienes vehículos guardados en favoritos.</span>
        </div>
      </section>

      <section class="da1-panel" id="panel-config">
        <div class="da1-settings-grid">
          <article class="da1-settings-block">
            <h2 class="da1-sblock-title"><i class="bi bi-person-fill"></i> Datos personales</h2>
            <div class="da1-form-row">
              <div class="da1-field"><label>Nombre</label><input type="text" id="cfgNombre" value=""></div>
              <div class="da1-field"><label>Apellidos</label><input type="text" id="cfgApellidos" value=""></div>
            </div>
            <div class="da1-field">
              <label>Email</label>
              <div style="display: flex; gap: 10px;">
                <input type="email" id="cfgEmail" value="" style="flex-grow: 1;">
                <button class="da1-btn da1-btn-ghost" onclick="handleEmailUpdate()" style="padding: 0 15px;">
                  <i class="bi bi-envelope-check"></i>
                </button>
              </div>
              <small style="font-size: 10px; color: var(--gray); margin-top: 5px; display: block;">
                Se enviará un código de verificación a ambas direcciones.
              </small>
            </div>
            <button class="da1-btn da1-btn-red" onclick="updateProfile()" style="margin-top:8px;">
              <i class="bi bi-floppy-fill"></i> Guardar cambios
            </button>
          </article>

          <article class="da1-settings-block">
            <h2 class="da1-sblock-title"><i class="bi bi-wallet2"></i> Billetera y Pagos</h2>

            <div id="walletList" class="da1-wallet-list" style="min-height: 100px; display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; justify-content: center; border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px; padding: 40px;">
                <span style="color: var(--gray); font-size: 13px;">No hay métodos de pago guardados</span>
              </div>
            </div>

            <button class="da1-btn da1-btn-ghost" style="margin-top:16px; width:100%; justify-content:center;"
              onclick="abrirModalPago()" data-bs-toggle="modal" data-bs-target="#modalStripe">
              <i class="bi bi-plus-lg"></i> Añadir método de pago
            </button>
          </article>

          <article class="da1-settings-block">
            <h2 class="da1-sblock-title"><i class="bi bi-sliders"></i> Preferencias</h2>
            <div style="margin-bottom:20px;">
              <div
                style="font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gray);margin-bottom:10px;">
                Moneda por defecto</div>
              <div class="da1-cur-opts">
                <div class="da1-cur-opt active" onclick="selectCurrency(this)">€ EUR</div>
                <div class="da1-cur-opt" onclick="selectCurrency(this)">$ USD</div>
                <div class="da1-cur-opt" onclick="selectCurrency(this)">AED</div>
              </div>
            </div>
            <div class="da1-toggle-row">
              <div>
                <div class="da1-toggle-name">Notificaciones de precio</div>
                <div class="da1-toggle-desc">Alertas cuando baje el precio de un favorito</div>
              </div>
              <label class="da1-toggle"><input type="checkbox" checked><span class="da1-toggle-slider"></span></label>
            </div>
            <div class="da1-toggle-row">
              <div>
                <div class="da1-toggle-name">Actualizaciones de pedidos</div>
                <div class="da1-toggle-desc">SMS y Email sobre el estado de entrega</div>
              </div>
              <label class="da1-toggle"><input type="checkbox" checked><span class="da1-toggle-slider"></span></label>
            </div>
          </article>

          <article class="da1-settings-block">
            <h2 class="da1-sblock-title"><i class="bi bi-shield-lock-fill"></i> Seguridad</h2>

            <div class="da1-toggle-row" style="margin-bottom:16px;">
              <div>
                <div class="da1-toggle-name">Autenticación 2FA</div>
                <div class="da1-toggle-desc">Capa extra de seguridad con Google Authenticator</div>
              </div>
              <label class="da1-toggle">
                <input type="checkbox" id="tgl2FA" onchange="toggle2FA()">
                <span class="da1-toggle-slider"></span>
              </label>
            </div>

            <div class="da1-form-row single">
              <div class="da1-field">
                <label>Nueva contraseña</label>
                <input type="password" id="newPassSettings" placeholder="Mínimo 8 caracteres">
              </div>
            </div>

            <button class="da1-btn da1-btn-ghost" style="margin-top:8px;" onclick="changePasswordFromSettings()">
              <i class="bi bi-lock-fill"></i> Actualizar contraseña
            </button>
          </article>
          <article class="da1-settings-block full" style="padding:24px;">
            <h2 class="da1-sblock-title" style="color:#EF4444;border-bottom-color:rgba(239,68,68,.2);">
              <i class="bi bi-exclamation-triangle-fill" style="color:#EF4444;"></i> Zona de peligro
            </h2>
            <div class="da1-danger-zone">
              <div>
                <h3 class="da1-danger-title">Eliminar cuenta permanentemente</h3>
                <div class="da1-danger-desc">Acción irreversible. Se borrarán todos tus datos, pedidos y métodos de pago
                  guardados.</div>
              </div>
              <button class="da1-btn-danger" onclick="confirmDelete()">Eliminar cuenta</button>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>

  <div class="da1-toast" id="toast">
    <i class="bi bi-check-circle-fill"></i>
    <span id="toastMsg">Acción completada</span>
  </div>
  <div class="modal fade" id="modalStripe" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="background: #111; border: 1px solid #222; border-top: 4px solid #e8001c; color: white;">
        <div class="modal-header" style="border-bottom: 1px solid #222;">
          <h5 class="modal-title" style="font-family: 'Rajdhani'; letter-spacing: 2px; text-transform: uppercase;">
            Vincular Nueva Tarjeta
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="padding: 24px;">
          <form id="payment-form">
            <div class="da1-field" style="margin-bottom: 20px;">
              <label style="color: #888; font-size: 12px; margin-bottom: 10px; display: block;">Datos de la tarjeta (Cifrado Stripe)</label>
              <div id="card-element" style="background: #0a0a0a; padding: 15px; border: 1px solid #333; border-radius: 4px;"></div>
              <div id="card-errors" role="alert" style="color: #EF4444; font-size: 11px; margin-top: 10px; font-family: 'Inter';"></div>
            </div>

            <button id="submit-card" class="da1-auth-btn" style="width: 100%; margin-top: 10px;">
              <i class="bi bi-shield-lock-fill"></i> Guardar Tarjeta de Forma Segura
            </button>
          </form>
        </div>
        <div class="modal-footer" style="border-top: 1px solid #222; justify-content: center;">
          <p style="font-size: 10px; color: #555; text-align: center;">
            <i class="bi bi-patch-check"></i> Conexión cifrada de grado militar. DA1MOTORS no almacena sus datos bancarios.
          </p>
        </div>
      </div>
    </div>
  </div>

  <?php include 'footer.php'; ?>
  <script src="https://js.stripe.com/v3/"></script>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="./js/user.js"></script>
  <script src="./js/chat.js"></script>


</body>

</html>