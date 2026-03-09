<!DOCTYPE html>
<html lang="es" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto - DA1MOTORS</title>

    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
    <link href="./bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="./bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="./css/carsMain.css" rel="stylesheet">
    <link href="./css/contacto.css" rel="stylesheet">
</head>

<body>

    <?php include 'header.php'; ?>
    <main class="da1-main" style="padding-top: 0;">

        <section class="da1-hero" style="height: 400px;">
            <div class="da1-hero-bg-wrap">
                <img src="./img/PaginaCars/banner.png" alt="Contact Hero" class="da1-hero-bg"
                    style="object-position: center 60%;">
                <div class="da1-hero-overlay"></div>
            </div>
            <div class="da1-hero-content" style="padding-top: 100px;">
                <p class="da1-breadcrumb">
                    <a href="index.php">Home</a> <span class="da1-breadcrumb-sep">/</span> <strong>Contacto</strong>
                </p>
                <h1 class="da1-hero-title">
                    <span class="da1-hero-underline">Hablemos.</span><br>
                    <span class="da1-hero-sub">Servicio exclusivo, atención personalizada.</span>
                </h1>
            </div>
        </section>

        <section class="da1-contact-section py-5">
            <div class="container-fluid px-4 px-lg-5">
                <div class="row g-5">

                    <div class="col-lg-5">
                        <div class="d-flex flex-column gap-4">

                            <div class="contact-info-card">
                                <div class="contact-icon"><i class="bi bi-geo-alt-fill"></i></div>
                                <div class="contact-details">
                                    <h4>Headquarters / Showroom</h4>
                                    <p>Calle Gran Vía 42<br>28013 Madrid, España</p>
                                </div>
                            </div>

                            <div class="contact-info-card">
                                <div class="contact-icon"><i class="bi bi-headset"></i></div>
                                <div class="contact-details">
                                    <h4>Atención al Cliente</h4>
                                    <p><a href="tel:+34900000000">+34 900 000 000</a><br><a
                                            href="mailto:info@da1motors.com">info@da1motors.com</a></p>
                                </div>
                            </div>

                            <div class="contact-info-card">
                                <div class="contact-icon"><i class="bi bi-clock-fill"></i></div>
                                <div class="contact-details">
                                    <h4>Horario Comercial</h4>
                                    <p>Lunes – Viernes: 09:00 – 20:00<br>Sábados: 10:00 – 14:00 (Solo cita previa)</p>
                                </div>
                            </div>

                            <div class="contact-map border border-dark rounded overflow-hidden">
                                <iframe width="100%" height="250" frameborder="0" scrolling="no" marginheight="0"
                                    marginwidth="0"
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7088942527771%2C40.41829929286665%2C-3.6961483955383305%2C40.423089698710364&amp;layer=mapnik&amp;marker=40.42069452875193%2C-3.702521324157715"
                                    style="filter: invert(90%) hue-rotate(180deg); border: 1px solid var(--c-border);">
                                </iframe>
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-7">
                        <div class="contact-form-wrap p-4 p-lg-5">
                            <h2 class="text-uppercase fw-bold text-white mb-2"
                                style="font-family: 'Rajdhani'; letter-spacing: 2px;">Envíanos un mensaje</h2>
                            <p class="text-muted mb-4" style="font-size: 0.9rem;">Un asesor personal se pondrá en
                                contacto contigo en menos de 24 horas.</p>

                            <form id="contactForm" class="row g-4">
                                <div class="col-md-6">
                                    <label class="da1-form-label">Nombre Completo *</label>
                                    <input type="text" class="form-control da1-input" required
                                        placeholder="Ej. Bruce Wayne">
                                </div>
                                <div class="col-md-6">
                                    <label class="da1-form-label">Teléfono *</label>
                                    <input type="tel" class="form-control da1-input" required
                                        placeholder="+34 600 000 000">
                                </div>
                                <div class="col-md-6">
                                    <label class="da1-form-label">Email *</label>
                                    <input type="email" class="form-control da1-input" required
                                        placeholder="tu@email.com">
                                </div>
                                <div class="col-md-6">
                                    <label class="da1-form-label">Motivo de la consulta</label>
                                    <select class="form-select da1-input">
                                        <option value="buy">Comprar un vehículo</option>
                                        <option value="sell">Vender mi vehículo</option>
                                        <option value="import">Importación a la carta</option>
                                        <option value="other">Información general</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label class="da1-form-label">Mensaje *</label>
                                    <textarea class="form-control da1-input" rows="5" required
                                        placeholder="¿En qué podemos ayudarte?"></textarea>
                                </div>
                                <div class="col-12">
                                    <div class="form-check da1-checkbox">
                                        <input class="form-check-input" type="checkbox" id="privacyCheck" required>
                                        <label class="form-check-label text-muted" for="privacyCheck"
                                            style="font-size: 0.8rem;">
                                            He leído y acepto la <a href="#"
                                                class="text-danger text-decoration-none">Política de Privacidad</a>.
                                        </label>
                                    </div>
                                </div>
                                <div class="col-12 mt-4">
                                    <button type="submit" class="da1-btn-submit w-100">
                                        Enviar Mensaje <i class="bi bi-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </main>
    <?php include 'footer.php'; ?>
    
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="./js/user.js"></script>
    <script src="./js/contacto.js"></script>
</body>

</html>