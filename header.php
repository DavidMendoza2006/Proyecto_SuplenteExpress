<?php 

  $current_page = basename($_SERVER['PHP_SELF']); 
?>

<link rel="icon" type="image/png" href="./img/favicon.png">
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="./bootstrap/css/bootstrap.css">
<link rel="stylesheet" href="./bootstrap-icons/bootstrap-icons.css">
<link rel="stylesheet" href="./css/defaultNav.css">
<link rel="stylesheet" href="./css/marketplace.css">

<nav class="navbar navbar-expand-lg da1-navbar">
  <div class="container-fluid px-4">

    <a class="navbar-brand da1-brand" href="index.php">
      <span class="da1-brand-accent">DA1</span>MOTORS
    </a>

    <button class="navbar-toggler da1-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDA1" aria-expanded="false">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarDA1">
      <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">

        <li class="nav-item da1-mega-parent">
          <a class="nav-link da1-link <?php echo ($current_page == 'cars.php') ? 'active' : ''; ?>" href="cars.php">
            CARS <i class="bi bi-chevron-down da1-chevron"></i>
          </a>

          <div class="da1-mega-menu">
            <div class="da1-mega-inner">
              <div class="da1-mega-col">
                <p class="da1-mega-title">Explorar</p>
                <a href="cars.php" class="da1-mega-item"><span class="da1-mega-icon"><i class="bi bi-grid-3x3-gap"></i></span><span><strong>Explore Inventory</strong><small>Todos los vehículos</small></span></a>
                <a href="specs.php" class="da1-mega-item"><span class="da1-mega-icon"><i class="bi bi-cpu"></i></span><span><strong>Specs</strong><small>Discover the cars specs</small></span></a>
                <a href="compare.php" class="da1-mega-item"><span class="da1-mega-icon"><i class="bi bi-arrow-left-right"></i></span><span><strong>Compare</strong><small>Compare car models</small></span></a>
                <a href="#" class="da1-mega-item"><span class="da1-mega-icon"><i class="bi bi-key"></i></span><span><strong>Sell My Car</strong><small>Vende tu vehículo</small></span></a>
              </div>
              <div class="da1-mega-divider"></div>
              <div class="da1-mega-col">
                <p class="da1-mega-title">Available Cars</p>
                <a href="#" class="da1-mega-brand-item"><span class="da1-dot"></span>Mercedes-Benz<span class="da1-badge">4</span></a>
                <a href="#" class="da1-mega-brand-item"><span class="da1-dot"></span>Aston Martin<span class="da1-badge">2</span></a>
                <a href="cars.php?marca=Ferrari" class="da1-mega-brand-item"><span class="da1-dot"></span>Ferrari<span class="da1-badge">22</span></a>
                <a href="#" class="da1-mega-brand-item"><span class="da1-dot"></span>Bugatti<span class="da1-badge">3</span></a>
                <a href="#" class="da1-mega-brand-item"><span class="da1-dot"></span>Brabus<span class="da1-badge">3</span></a>
              </div>
              <div class="da1-mega-divider"></div>
              <div class="da1-mega-col">
                <p class="da1-mega-title">Sold Cars</p>
                <a href="#" class="da1-mega-brand-item"><span class="da1-dot da1-dot--sold"></span>Ford<span class="da1-badge da1-badge--sold">3</span></a>
                <a href="#" class="da1-mega-brand-item"><span class="da1-dot da1-dot--sold"></span>Lamborghini<span class="da1-badge da1-badge--sold">11</span></a>
                <a href="#" class="da1-mega-brand-item"><span class="da1-dot da1-dot--sold"></span>McLaren<span class="da1-badge da1-badge--sold">4</span></a>
                <a href="#" class="da1-mega-brand-item"><span class="da1-dot da1-dot--sold"></span>Porsche<span class="da1-badge da1-badge--sold">7</span></a>
                <a href="#" class="da1-mega-brand-item"><span class="da1-dot da1-dot--sold"></span>Rolls-Royce<span class="da1-badge da1-badge--sold">4</span></a>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item"><a class="nav-link da1-link <?php echo ($current_page == 'marketplace.php') ? 'active' : ''; ?>" href="marketplace.php">MarketPlace</a></li>

        <li class="nav-item"><a class="nav-link da1-link <?php echo ($current_page == 'nosotros.php') ? 'active' : ''; ?>" href="nosotros.php">Nosotros</a></li>

        <li class="nav-item"><a class="nav-link da1-link <?php echo ($current_page == 'contacto.php') ? 'active' : ''; ?>" href="contacto.php">Contacto</a></li>

        <li class="nav-item d-flex align-items-center">
          <button class="da1-theme-toggle" id="themeToggle" title="Cambiar modo">
            <i class="bi bi-moon-stars-fill" id="themeIcon"></i>
          </button>
        </li>

        <li class="nav-item d-flex align-items-center ms-2">
          <button class="da1-cart-btn position-relative" title="Ver carrito">
            <i class="bi bi-bag-fill"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartBadge">
              0
            </span>
          </button>
        </li>

        <li class="nav-item da1-user-parent">
          <a class="nav-link da1-link da1-user-btn <?php echo ($current_page == 'user.php') ? 'active' : ''; ?>" href="user.php">
            <i class="bi bi-person-circle"></i>
          </a>

          <div class="da1-user-menu">
            <a class="da1-user-item auth-guest" href="user.php?tab=login">
              <i class="bi bi-box-arrow-in-right"></i> Iniciar sesión
            </a>
            <a class="da1-user-item auth-guest" href="user.php?tab=register">
              <i class="bi bi-person-plus"></i> Registrarse
            </a>

            <a class="da1-user-item auth-user" href="user.php" style="display: none;">
              <i class="bi bi-person-circle"></i> Mi Perfil
            </a>
            <div class="da1-user-divider auth-user" style="display: none;"></div>

            <a class="da1-user-item auth-user" href="#" onclick="handleLogout(true); return false;" style="display: none;">
              <i class="bi bi-box-arrow-right"></i> Cerrar sesión
            </a>
          </div>
        </li>

      </ul>
    </div>
  </div>
</nav>