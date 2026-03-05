<!DOCTYPE html>
<html lang="es" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre Nosotros | DA1MOTORS</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;500;600;700&family=Inter:wght@300;400;600&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="./bootstrap-icons/bootstrap-icons.css">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/nosotros.css">
  <link rel="stylesheet" href="./css/defaultFooter.css">
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
          <a href="cars.html" class="da1-btn-aggressive">Ver el Inventario <i class="bi bi-arrow-right"></i></a>
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
            <img src="./img/PaginaCars/coches/Chiron/interiror.png" alt="Interior Lujo" class="img-fluid">
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

  <footer id="da1-footer">
    <div class="footer-newsletter">
      <div class="newsletter-copy">
        <span class="newsletter-tag">Newsletter exclusivo</span>
        <h3 class="newsletter-title">Primero en saber. Primero en Contactar.</h3>
        <p class="newsletter-subtitle">Nuevas llegadas, subastas privadas y ofertas solo para suscriptores.</p>
      </div>
      <div class="newsletter-form">
        <input type="email" class="newsletter-input" placeholder="tu@email.com">
        <button class="newsletter-btn">Suscribirme</button>
      </div>
    </div>

    <div class="footer-grid">
      <div class="footer-col">
        <a href="index.html" class="footer-brand"><span>DA1</span>MOTORS</a>
        <p class="footer-desc">
          Especialistas en vehículos de alta gama y superdeportivos.
          Más de 847 vehículos vendidos en 38 países desde 2018.
          Autenticidad, discreción y resultados.
        </p>
        <div class="footer-seals">
          <span class="footer-seal"><i class="bi bi-shield-fill-check"></i> Verificado</span>
          <span class="footer-seal"><i class="bi bi-award-fill"></i> Premium</span>
          <span class="footer-seal"><i class="bi bi-globe2"></i> Internacional</span>
        </div>
      </div>

      <div class="footer-col">
        <p class="footer-col-title"><i class="bi bi-car-front-fill"></i> Vehículos</p>
        <ul class="footer-links">
          <li><a href="cars.html">Coches disponibles <span class="link-badge">New</span></a></li>
          <li><a href="#">Coches vendidos</a></li>
          <li><a href="marketplace.html">MarketPlace</a></li>
          <li><a href="compare.html">Comparador</a></li>
          <li><a href="specs.html">Fichas técnicas</a></li>
          <li><a href="#">Vender mi coche</a></li>
          <li><a href="#">Matrículas privadas</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <p class="footer-col-title"><i class="bi bi-building-fill"></i> Empresa</p>
        <ul class="footer-links">
          <li><a href="nosotros.html">Sobre DA1MOTORS</a></li>
          <li><a href="#">Resultados & Stats</a></li>
          <li><a href="nosotros.html">Nuestro equipo</a></li>
          <li><a href="#">Prensa & Media</a></li>
          <li><a href="#">Trabaja con nosotros <span class="link-badge">+3</span></a></li>
          <li><a href="#">Partners & Marcas</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <p class="footer-col-title"><i class="bi bi-headset"></i> Contacto</p>
        <div class="footer-contact-item">
          <i class="bi bi-geo-alt-fill"></i>
          <span>Calle Gran Vía 42, 28013 Madrid, España</span>
        </div>
        <div class="footer-contact-item">
          <i class="bi bi-telephone-fill"></i>
          <a href="tel:+34900000000">+34 900 000 000</a>
        </div>
        <div class="footer-contact-item">
          <i class="bi bi-envelope-fill"></i>
          <a href="mailto:info@da1motors.com">info@da1motors.com</a>
        </div>
        <div class="footer-contact-item">
          <i class="bi bi-clock-fill"></i>
          <span>Lun–Sáb · 09:00 – 20:00</span>
        </div>
        <div class="footer-contact-item">
          <i class="bi bi-whatsapp"></i>
          <a href="#">WhatsApp directo 24/7</a>
        </div>
      </div>
    </div>

    <div class="footer-social">
      <span class="social-label">Síguenos</span>
      <div class="social-links">
        <a href="#" class="social-btn" title="Instagram"><i class="bi bi-instagram"></i></a>
        <a href="#" class="social-btn" title="YouTube"><i class="bi bi-youtube"></i></a>
        <a href="#" class="social-btn" title="TikTok"><i class="bi bi-tiktok"></i></a>
        <a href="#" class="social-btn" title="X / Twitter"><i class="bi bi-twitter-x"></i></a>
        <a href="#" class="social-btn" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
        <a href="#" class="social-btn" title="Facebook"><i class="bi bi-facebook"></i></a>
      </div>
      <span class="social-tagline">"Where performance meets perfection."</span>
    </div>

    <div class="footer-legal">
      <span class="footer-copy">
        © 2026 <span>DA1MOTORS</span> · Todos los derechos reservados.
      </span>
      <div class="footer-legal-links">
        <a href="#">Política de privacidad</a>
        <a href="#">Aviso legal</a>
        <a href="#">Cookies</a>
        <a href="#">Términos de uso</a>
      </div>
    </div>
  </footer>

  <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="./js/nosotros.js"></script>
</body>

</html>