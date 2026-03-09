<!DOCTYPE html>
<html lang="es" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Perfil | DA1MOTORS</title>
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
      <div class="da1-auth-subtitle">Accede a tu cuenta</div>
      <div class="da1-auth-tabs">
        <button class="da1-auth-tab active" onclick="switchAuthTab('login')">Iniciar sesión</button>
        <button class="da1-auth-tab" onclick="switchAuthTab('register')">Crear cuenta</button>
      </div>
      <div class="da1-auth-form active" id="formLogin">
        <div class="da1-field">
          <label>Email</label>
          <input type="email" id="loginEmail" placeholder="tu@email.com">
        </div>
        <div class="da1-field">
          <label>Contraseña</label>
          <input type="password" id="loginPass" placeholder="••••••••">
        </div>
        <button class="da1-auth-btn" onclick="handleLogin()">Iniciar sesión</button>
      </div>
      <div class="da1-auth-form" id="formRegister">
        <div class="da1-form-row">
          <div class="da1-field"><label>Nombre</label><input type="text" id="regNombre" placeholder="Usuario"></div>
          <div class="da1-field"><label>Apellidos</label><input type="text" id="regApellidos" placeholder="Contraseña">
          </div>
        </div>
        <div class="da1-field"><label>Email</label><input type="email" id="regEmail" placeholder="tu@email.com"></div>
        <div class="da1-field"><label>Contraseña</label><input type="password" id="regPass"
            placeholder="Mínimo 8 caracteres"></div>
        <button class="da1-auth-btn" onclick="handleRegister()">Crear cuenta</button>
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
        <div class="da1-avatar-ring"><i class="bi bi-person-fill"></i></div>
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
            <div class="da1-form-row single">
              <div class="da1-field"><label>Email</label><input type="email" id="cfgEmail" value="" readonly
                  style="opacity:0.7; cursor:not-allowed;"></div>
            </div>
            <button class="da1-btn da1-btn-red" onclick="showToast('Perfil actualizado')" style="margin-top:8px;">
              <i class="bi bi-floppy-fill"></i> Guardar cambios
            </button>
          </article>

          <article class="da1-settings-block">
            <h2 class="da1-sblock-title"><i class="bi bi-wallet2"></i> Billetera y Pagos</h2>
            <div class="da1-wallet-list"
              style="min-height: 130px; display: flex; align-items: center; justify-content: center; border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px;">
              <span style="color: var(--gray); font-size: 13px;">No hay métodos de pago guardados</span>
            </div>
            <button class="da1-btn da1-btn-ghost" style="margin-top:16px;width:100%;justify-content:center;"
              onclick="showToast('Añadir método próximamente...')">
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
              <label class="da1-toggle"><input type="checkbox"><span class="da1-toggle-slider"></span></label>
            </div>
            <div class="da1-form-row single">
              <div class="da1-field"><label>Nueva contraseña</label><input type="password"
                  placeholder="Mínimo 8 caracteres"></div>
            </div>
            <button class="da1-btn da1-btn-ghost" style="margin-top:8px;" onclick="showToast('Contraseña actualizada')">
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

  <?php include 'footer.php'; ?>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="./js/user.js"></script>
  <script src="./js/chat.js"></script>
</body>

</html>
</body>

</html>