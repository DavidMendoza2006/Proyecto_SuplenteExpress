<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DA1 Premier Luxury Car</title>
    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="./bootstrap-icons/bootstrap-icons.css">
    <link rel="stylesheet" href="./css/carsGrid.css">
    <link rel="stylesheet" href="./css/carsMain.css">
    <link rel="stylesheet" href="./css/index.css">
</head>

<body>

    <?php include 'header.php'; ?>
    <main>

        <section class="position-relative overflow-hidden hero-section">

            <video class="position-absolute top-0 start-0 w-100 h-100 hero-video" autoplay muted loop playsinline
                poster="img/PaginaIndex/ferrari458.png">
                <source src="videos/index/Ferrari 458.mp4" type="video/mp4">
            </video>

            <div class="position-absolute top-0 start-0 w-100 h-100 hero-overlay"></div>

            <div class="position-relative d-flex align-items-end hero-content-wrap">
                <div class="container-fluid px-4 px-lg-5">
                    <div class="row">
                        <div class="col-12 col-md-8 col-lg-5 pb-5 hero-text-col">

                            <p class="text-uppercase mb-2 hero-eyebrow">Ferrari · 2015</p>

                            <h1 class="text-white fw-bold text-uppercase lh-1 mb-4 hero-title">
                                <span class="d-block hero-line-1">2015&nbsp; FERRARI</span>
                                <span class="d-block hero-line-2">458 ITALIA</span>
                            </h1>

                            <a href="./cars.html"
                                class="btn rounded-pill border-white text-white d-inline-flex align-items-center gap-2 hero-btn">
                                <span class="fw-bold text-uppercase" style="letter-spacing:2px;font-size:.78rem;">View
                                    More</span>
                                <i class="bi bi-arrow-right"></i>
                            </a>

                        </div>
                    </div>
                </div>
            </div>

            <div class="position-absolute bottom-0 start-0 w-100 hero-fog"></div>

        </section>
        <section class="position-relative overflow-hidden about-section">


            <img src="./img/PaginaIndex/huayraR.png" alt=""
                class="position-absolute top-0 start-0 w-100 h-100 about-img" aria-hidden="true">

            <div class="position-absolute top-0 start-0 w-100 about-fog-top"></div>


            <div class="position-absolute top-0 start-0 w-100 h-100 about-overlay"></div>

            <div class="position-absolute bottom-0 start-0 w-100 about-fog-bottom"></div>

            <div class="position-relative container-fluid px-4 px-lg-5 about-content">
                <div class="row py-5 py-lg-0">
                    <div class="col-12 col-lg-5 py-lg-5 my-lg-4">

                        <h2 class="text-white fw-bold text-uppercase mb-4 about-title">
                            DA<span class="about-accent">1</span>MOTORS
                        </h2>

                        <p class="about-text mb-4">
                            DA1Motors es reconocido como el mejor concesionario de lujo de España,
                            ofreciendo una colección sin igual de supercars, hypercars y
                            automóviles de lujo. Nuestro showroom alberga marcas exclusivas como
                            <a href="#" class="about-link">Bugatti</a>,
                            <a href="#" class="about-link">Ferrari</a>,
                            <a href="#" class="about-link">Lamborghini</a>,
                            <a href="#" class="about-link">Pagani</a>,
                            <a href="#" class="about-link">Mercedes-Benz</a>,
                            <a href="#" class="about-link">Rolls-Royce</a>,
                            <a href="#" class="about-link">McLaren</a> y
                            <a href="#" class="about-link">Porsche</a>.
                        </p>

                        <p class="about-text">
                            Reconocidos globalmente, DA1Motors posee una colección incomparable
                            de vehículos de lujo, consolidando España como el epicentro para
                            los entusiastas y coleccionistas que buscan los automóviles más
                            exclusivos del planeta.
                        </p>

                    </div>
                </div>
            </div>

        </section>

        <section class="fs-section">


            <div class="d-flex align-items-end justify-content-between mb-4 fs-header">
                <h2 class="text-white text-uppercase fw-bold mb-0 fs-title">
                    Featured <span class="fs-accent">Stock</span>
                </h2>
            </div>


            <div class="fs-track-wrap">
                <button class="fs-ext-prev" id="fsPrev" aria-label="Anterior">
                    <i class="bi bi-chevron-left"></i>
                </button>

                <div class="fs-track-clip">
                    <div class="fs-track" id="fsTrack">

                        <article class="da1-card fs-card">
                            <div class="da1-card-carousel">
                                <div class="da1-carousel-track">
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/MclarenP1/full.png" alt="McLaren P1">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/MclarenP1/side.png" data-pos="side"
                                            alt="McLaren P1 — Lateral">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/MclarenP1/interior.png"
                                            alt="McLaren P1 — Interior">
                                    </div>
                                </div>
                                <button class="da1-car-prev" aria-label="prev"><i
                                        class="bi bi-chevron-left"></i></button>
                                <button class="da1-car-next" aria-label="next"><i
                                        class="bi bi-chevron-right"></i></button>
                                <div class="da1-dots">
                                    <span class="da1-dot-item active"></span>
                                    <span class="da1-dot-item"></span>
                                    <span class="da1-dot-item"></span>
                                </div>
                                <span class="da1-card-tag">Available</span>
                            </div>
                            <div class="da1-card-body">
                                <div class="da1-card-brand">
                                    <i class="bi bi-pentagon-fill da1-brand-icon"></i>
                                    <span>McLaren</span>
                                    <span class="da1-card-badge da1-badge-new">-34%</span>
                                </div>
                                <h3 class="da1-card-name">P1 Carbon Series</h3>
                                <p class="da1-card-year">2015</p>
                                <div class="da1-card-meta">
                                    <span><i class="bi bi-speedometer2"></i> 0 km</span>
                                    <span><i class="bi bi-fuel-pump"></i> Híbrido</span>
                                </div>
                                <div class="da1-card-footer">
                                    <div class="da1-card-price">
                                        <span class="da1-currency" data-aed="AED" data-eur="€" data-usd="$">€</span>
                                        <span class="da1-amount" data-aed="11.500.000" data-eur="2.875.000"
                                            data-usd="3.133.515">2.875.000</span>
                                    </div>
                                    <div class="da1-card-actions">
                                        <button class="da1-card-cur" title="Cambiar moneda"><i
                                                class="bi bi-arrow-left-right"></i></button>
                                        <button class="da1-card-buy">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="da1-card fs-card">
                            <div class="da1-card-carousel">
                                <div class="da1-carousel-track">
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Porsche 918 Spyder/full.png"
                                            alt="Porsche 918 Spyder">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Porsche 918 Spyder/side.png" data-pos="side"
                                            alt="Porsche 918 — Lateral">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Porsche 918 Spyder/interior.png"
                                            alt="Porsche 918 — Interior">
                                    </div>
                                </div>
                                <button class="da1-car-prev" aria-label="prev"><i
                                        class="bi bi-chevron-left"></i></button>
                                <button class="da1-car-next" aria-label="next"><i
                                        class="bi bi-chevron-right"></i></button>
                                <div class="da1-dots">
                                    <span class="da1-dot-item active"></span>
                                    <span class="da1-dot-item"></span>
                                    <span class="da1-dot-item"></span>
                                </div>
                                <span class="da1-card-tag">Available</span>
                            </div>
                            <div class="da1-card-body">
                                <div class="da1-card-brand">
                                    <i class="bi bi-shield-fill da1-brand-icon"></i>
                                    <span>Porsche</span>
                                </div>
                                <h3 class="da1-card-name">918 Spyder</h3>
                                <p class="da1-card-year">2015</p>
                                <div class="da1-card-meta">
                                    <span><i class="bi bi-speedometer2"></i> 9.285 km</span>
                                    <span><i class="bi bi-fuel-pump"></i> Híbrido</span>
                                </div>
                                <div class="da1-card-footer">
                                    <div class="da1-card-price">
                                        <span class="da1-currency" data-aed="AED" data-eur="€" data-usd="$">€</span>
                                        <span class="da1-amount" data-aed="5.250.000" data-eur="1.312.500"
                                            data-usd="1.430.518">1.312.500</span>
                                    </div>
                                    <div class="da1-card-actions">
                                        <button class="da1-card-cur" title="Cambiar moneda"><i
                                                class="bi bi-arrow-left-right"></i></button>
                                        <button class="da1-card-buy">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="da1-card fs-card">
                            <div class="da1-card-carousel">
                                <div class="da1-carousel-track">
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Ferrari 812 Competizione/full.png"
                                            alt="Ferrari 812 Competizione">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Ferrari 812 Competizione/side.png"
                                            data-pos="side" alt="Ferrari 812 — Lateral">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Ferrari 812 Competizione/interior.png"
                                            alt="Ferrari 812 — Interior">
                                    </div>
                                </div>
                                <button class="da1-car-prev" aria-label="prev"><i
                                        class="bi bi-chevron-left"></i></button>
                                <button class="da1-car-next" aria-label="next"><i
                                        class="bi bi-chevron-right"></i></button>
                                <div class="da1-dots">
                                    <span class="da1-dot-item active"></span>
                                    <span class="da1-dot-item"></span>
                                    <span class="da1-dot-item"></span>
                                </div>
                                <span class="da1-card-tag">Available</span>
                            </div>
                            <div class="da1-card-body">
                                <div class="da1-card-brand">
                                    <i class="bi bi-shield-fill da1-brand-icon" style="color:#e8001c"></i>
                                    <span>Ferrari</span>
                                </div>
                                <h3 class="da1-card-name">812 Competizione</h3>
                                <p class="da1-card-year">2022</p>
                                <div class="da1-card-meta">
                                    <span><i class="bi bi-speedometer2"></i> 1.155 km</span>
                                    <span><i class="bi bi-fuel-pump"></i> Gasolina</span>
                                </div>
                                <div class="da1-card-footer">
                                    <div class="da1-card-price">
                                        <span class="da1-currency" data-aed="AED" data-eur="€" data-usd="$">€</span>
                                        <span class="da1-amount" data-aed="5.450.000" data-eur="1.362.500"
                                            data-usd="1.485.014">1.362.500</span>
                                    </div>
                                    <div class="da1-card-actions">
                                        <button class="da1-card-cur" title="Cambiar moneda"><i
                                                class="bi bi-arrow-left-right"></i></button>
                                        <button class="da1-card-buy">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="da1-card fs-card">
                            <div class="da1-card-carousel">
                                <div class="da1-carousel-track">
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Chiron/full.png" alt="Bugatti Chiron 2019">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Chiron/side.png" data-pos="side"
                                            alt="Bugatti Chiron — Lateral">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Chiron/interiror.png"
                                            alt="Bugatti Chiron — Interior">
                                    </div>
                                </div>
                                <button class="da1-car-prev" aria-label="prev"><i
                                        class="bi bi-chevron-left"></i></button>
                                <button class="da1-car-next" aria-label="next"><i
                                        class="bi bi-chevron-right"></i></button>
                                <div class="da1-dots">
                                    <span class="da1-dot-item active"></span>
                                    <span class="da1-dot-item"></span>
                                    <span class="da1-dot-item"></span>
                                </div>
                                <span class="da1-card-tag">Available</span>
                            </div>
                            <div class="da1-card-body">
                                <div class="da1-card-brand">
                                    <i class="bi bi-circle-fill da1-brand-icon"></i>
                                    <span>Bugatti</span>
                                </div>
                                <h3 class="da1-card-name">Chiron</h3>
                                <p class="da1-card-year">2019</p>
                                <div class="da1-card-meta">
                                    <span><i class="bi bi-speedometer2"></i> 6.700 km</span>
                                    <span><i class="bi bi-fuel-pump"></i> Gasolina</span>
                                </div>
                                <div class="da1-card-footer">
                                    <div class="da1-card-price">
                                        <span class="da1-currency" data-aed="AED" data-eur="€" data-usd="$">€</span>
                                        <span class="da1-amount" data-aed="12.900.000" data-eur="3.225.000"
                                            data-usd="3.514.986">3.225.000</span>
                                    </div>
                                    <div class="da1-card-actions">
                                        <button class="da1-card-cur" title="Cambiar moneda"><i
                                                class="bi bi-arrow-left-right"></i></button>
                                        <button class="da1-card-buy">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="da1-card fs-card">
                            <div class="da1-card-carousel">
                                <div class="da1-carousel-track">
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Lamborghini Aventador SVJ/full.png"
                                            alt="Lamborghini Aventador SVJ">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Lamborghini Aventador SVJ/side.png"
                                            data-pos="side" alt="Aventador SVJ — Lateral">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Lamborghini Aventador SVJ/interior.png"
                                            alt="Aventador SVJ — Interior">
                                    </div>
                                </div>
                                <button class="da1-car-prev" aria-label="prev"><i
                                        class="bi bi-chevron-left"></i></button>
                                <button class="da1-car-next" aria-label="next"><i
                                        class="bi bi-chevron-right"></i></button>
                                <div class="da1-dots">
                                    <span class="da1-dot-item active"></span>
                                    <span class="da1-dot-item"></span>
                                    <span class="da1-dot-item"></span>
                                </div>
                                <span class="da1-card-tag da1-tag-sold">Sold</span>
                            </div>
                            <div class="da1-card-body">
                                <div class="da1-card-brand">
                                    <i class="bi bi-trophy-fill da1-brand-icon"></i>
                                    <span>Lamborghini</span>
                                </div>
                                <h3 class="da1-card-name">Aventador SVJ</h3>
                                <p class="da1-card-year">2021</p>
                                <div class="da1-card-meta">
                                    <span><i class="bi bi-speedometer2"></i> 3.200 km</span>
                                    <span><i class="bi bi-fuel-pump"></i> Gasolina</span>
                                </div>
                                <div class="da1-card-footer">
                                    <div class="da1-card-price">
                                        <span class="da1-currency" data-aed="AED" data-eur="€" data-usd="$">€</span>
                                        <span class="da1-amount" data-aed="8.750.000" data-eur="2.187.500"
                                            data-usd="2.384.196">2.187.500</span>
                                    </div>
                                    <div class="da1-card-actions">
                                        <button class="da1-card-cur" title="Cambiar moneda"><i
                                                class="bi bi-arrow-left-right"></i></button>
                                        <button class="da1-card-buy">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="da1-card fs-card">
                            <div class="da1-card-carousel">
                                <div class="da1-carousel-track">
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Rolls-Royce Phantom VIII/full.png"
                                            alt="Rolls-Royce Phantom">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Rolls-Royce Phantom VIII/side.png"
                                            data-pos="side" alt="Phantom — Lateral">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Rolls-Royce Phantom VIII/interiro.png"
                                            alt="Phantom — Interior">
                                    </div>
                                </div>
                                <button class="da1-car-prev" aria-label="prev"><i
                                        class="bi bi-chevron-left"></i></button>
                                <button class="da1-car-next" aria-label="next"><i
                                        class="bi bi-chevron-right"></i></button>
                                <div class="da1-dots">
                                    <span class="da1-dot-item active"></span>
                                    <span class="da1-dot-item"></span>
                                    <span class="da1-dot-item"></span>
                                </div>
                                <span class="da1-card-tag">Available</span>
                            </div>
                            <div class="da1-card-body">
                                <div class="da1-card-brand">
                                    <i class="bi bi-gem da1-brand-icon"></i>
                                    <span>Rolls-Royce</span>
                                </div>
                                <h3 class="da1-card-name">Phantom VIII</h3>
                                <p class="da1-card-year">2023</p>
                                <div class="da1-card-meta">
                                    <span><i class="bi bi-speedometer2"></i> 800 km</span>
                                    <span><i class="bi bi-fuel-pump"></i> Gasolina</span>
                                </div>
                                <div class="da1-card-footer">
                                    <div class="da1-card-price">
                                        <span class="da1-currency" data-aed="AED" data-eur="€" data-usd="$">€</span>
                                        <span class="da1-amount" data-aed="4.200.000" data-eur="1.050.000"
                                            data-usd="1.144.414">1.050.000</span>
                                    </div>
                                    <div class="da1-card-actions">
                                        <button class="da1-card-cur" title="Cambiar moneda"><i
                                                class="bi bi-arrow-left-right"></i></button>
                                        <button class="da1-card-buy">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="da1-card fs-card">
                            <div class="da1-card-carousel">
                                <div class="da1-carousel-track">
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Aston Martin Valkyrie/full.png"
                                            alt="Aston Martin Valkyrie">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Aston Martin Valkyrie/side.png"
                                            data-pos="side" alt="Valkyrie — Lateral">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Aston Martin Valkyrie/interior.png"
                                            alt="Valkyrie — Interior">
                                    </div>
                                </div>
                                <button class="da1-car-prev" aria-label="prev"><i
                                        class="bi bi-chevron-left"></i></button>
                                <button class="da1-car-next" aria-label="next"><i
                                        class="bi bi-chevron-right"></i></button>
                                <div class="da1-dots">
                                    <span class="da1-dot-item active"></span>
                                    <span class="da1-dot-item"></span>
                                    <span class="da1-dot-item"></span>
                                </div>
                                <span class="da1-card-tag">Available</span>
                            </div>
                            <div class="da1-card-body">
                                <div class="da1-card-brand">
                                    <i class="bi bi-award-fill da1-brand-icon"></i>
                                    <span>Aston Martin</span>
                                </div>
                                <h3 class="da1-card-name">Valkyrie AMR Pro</h3>
                                <p class="da1-card-year">2022</p>
                                <div class="da1-card-meta">
                                    <span><i class="bi bi-speedometer2"></i> 120 km</span>
                                    <span><i class="bi bi-fuel-pump"></i> Híbrido</span>
                                </div>
                                <div class="da1-card-footer">
                                    <div class="da1-card-price">
                                        <span class="da1-currency" data-aed="AED" data-eur="€" data-usd="$">€</span>
                                        <span class="da1-amount" data-aed="22.000.000" data-eur="5.500.000"
                                            data-usd="5.994.550">5.500.000</span>
                                    </div>
                                    <div class="da1-card-actions">
                                        <button class="da1-card-cur" title="Cambiar moneda"><i
                                                class="bi bi-arrow-left-right"></i></button>
                                        <button class="da1-card-buy">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article class="da1-card fs-card">
                            <div class="da1-card-carousel">
                                <div class="da1-carousel-track">
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Mercedes-AMG One/full.png"
                                            alt="Mercedes-AMG One">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Mercedes-AMG One/side.png" data-pos="side"
                                            alt="AMG One — Lateral">
                                    </div>
                                    <div class="da1-carousel-slide">
                                        <img src="./img/PaginaCars/coches/Mercedes-AMG One/interior.png"
                                            alt="AMG One — Interior">
                                    </div>
                                </div>
                                <button class="da1-car-prev" aria-label="prev"><i
                                        class="bi bi-chevron-left"></i></button>
                                <button class="da1-car-next" aria-label="next"><i
                                        class="bi bi-chevron-right"></i></button>
                                <div class="da1-dots">
                                    <span class="da1-dot-item active"></span>
                                    <span class="da1-dot-item"></span>
                                    <span class="da1-dot-item"></span>
                                </div>
                                <span class="da1-card-tag da1-tag-sold">Sold</span>
                            </div>
                            <div class="da1-card-body">
                                <div class="da1-card-brand">
                                    <i class="bi bi-stars da1-brand-icon"></i>
                                    <span>Mercedes-Benz</span>
                                </div>
                                <h3 class="da1-card-name">AMG One</h3>
                                <p class="da1-card-year">2023</p>
                                <div class="da1-card-meta">
                                    <span><i class="bi bi-speedometer2"></i> 500 km</span>
                                    <span><i class="bi bi-fuel-pump"></i> Híbrido F1</span>
                                </div>
                                <div class="da1-card-footer">
                                    <div class="da1-card-price">
                                        <span class="da1-currency" data-aed="AED" data-eur="€" data-usd="$">€</span>
                                        <span class="da1-amount" data-aed="11.000.000" data-eur="2.750.000"
                                            data-usd="2.997.275">2.750.000</span>
                                    </div>
                                    <div class="da1-card-actions">
                                        <button class="da1-card-cur" title="Cambiar moneda"><i
                                                class="bi bi-arrow-left-right"></i></button>
                                        <button class="da1-card-buy">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </article>

                    </div>
                </div>

                <button class="fs-ext-next" id="fsNext" aria-label="Siguiente">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>


            <div class="d-flex align-items-center justify-content-between mt-4">
                <div class="fs-indicators" id="fsIndicators"></div>
                <a href="./cars.html"
                    class="fs-viewall-mobile d-inline-flex align-items-center gap-2 text-uppercase fw-bold fs-viewall">
                    View All <i class="bi bi-arrow-right"></i>
                </a>
            </div>

        </section>


    </main>

    <?php include 'footer.php'; ?>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="./js/user.js"></script>
    <script src="./js/chat.js"></script>
    <script src="./js/index.js"></script>
</body>

</html>