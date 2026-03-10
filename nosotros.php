<!DOCTYPE html>
<html lang="es" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre Nosotros - DA1MOTORS</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;500;600;700&family=Inter:wght@300;400;600&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="./bootstrap-icons/bootstrap-icons.css">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/nosotros.css">
</head>

<body>

  <?php include 'header.php'; ?>

  <main class="da1-about-main">

    <header class="da1-about-hero">
      <div class="da1-about-hero-bg">
        <img src="./img/PaginaCars/coches/Lamborghini Aventador SVJ/full.png" alt="DA1MOTORS Garage"
          class="da1-parallax-img">
      </div>
      <div class="da1-about-overlay"></div>

      <div class="da1-about-hero-content container">
        <span class="da1-eyebrow fade-up">La Élite del Motor</span>
        <h1 class="da1-hero-headline fade-up delay-1">No vendemos coches.<br><span>Forjamos Legados.</span></h1>
        <p class="da1-hero-sub fade-up delay-2">Para los que dominan el mundo, creamos el garaje perfecto. Acceder a
          DA1MOTORS no es una compra, es una declaración de intenciones.</p>
        <div class="fade-up delay-3 mt-4">
          <a href="cars.php" class="da1-btn-aggressive">Ver el Inventario <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </header>

    <section class="da1-philosophy container">
      <div class="row align-items-center">
        <div class="col-lg-5 order-2 order-lg-1 reveal-left">
          <h2 class="da1-section-title">Solo el <span>1% del 1%</span></h2>
          <p class="da1-text">Rechazamos la mediocridad. Rastrear el planeta entero para encontrar el hypercar exacto,
            en el color exacto, con la especificación exacta. Ese es nuestro trabajo.</p>
          <p class="da1-text">Si existe, lo conseguimos. Si no existe, convencemos a las marcas de que te lo fabriquen.
            Operamos bajo estricta confidencialidad para coleccionistas, deportistas de élite y líderes de la industria.
          </p>

          <ul class="da1-list">
            <li><i class="bi bi-crosshair"></i> Precisión Absoluta en Búsqueda</li>
            <li><i class="bi bi-incognito"></i> Discreción Total Garantizada</li>
            <li><i class="bi bi-globe2"></i> Logística VIP Mundial</li>
          </ul>
        </div>
        <div class="col-lg-6 offset-lg-1 order-1 order-lg-2 mb-5 mb-lg-0 reveal-right">
          <div class="da1-image-box">
            <img src="./img/PaginaCars/coches/Chiron/interior.png" alt="Interior Lujo" class="img-fluid">
            <div class="da1-image-accent"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="da1-power-stats">
      <div class="container">
        <div class="row">
          <div class="col-md-4 da1-stat-item reveal-up">
            <div class="da1-stat-num">>840</div>
            <div class="da1-stat-label">Hiperdeportivos Entregados</div>
          </div>
          <div class="col-md-4 da1-stat-item reveal-up delay-1">
            <div class="da1-stat-num">€498M</div>
            <div class="da1-stat-label">Volumen Gestionado en 2026</div>
          </div>
          <div class="col-md-4 da1-stat-item reveal-up delay-2">
            <div class="da1-stat-num">52</div>
            <div class="da1-stat-label">Países con Operaciones Activas</div>
          </div>
        </div>
      </div>
    </section>

    <section class="da1-manifesto container">
      <div class="da1-manifesto-box reveal-up">
        <i class="bi bi-quote da1-quote-icon"></i>
        <p class="da1-manifesto-text">"El dinero compra velocidad. La influencia compra exclusividad. Pero solo la
          obsesión por la perfección te da las llaves de DA1MOTORS."</p>
        <span class="da1-manifesto-author">— Abdelati & David, Fundadores y CEOs</span>
      </div>
    </section>

  </main>

  <?php include 'footer.php'; ?>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="./js/user.js"></script>
  <script src="./js/nosotros.js"></script>
    <script src="./js/chat.js"></script>
</body>

</html>