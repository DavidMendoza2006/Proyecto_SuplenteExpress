<!DOCTYPE html>
<html lang="es" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketplace - DA1MOTORS Lifestyle</title>

    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
    <link href="./bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="./bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="./css/defaultFooter.css" rel="stylesheet">
    <link href="./css/carsMain.css" rel="stylesheet">
    <link href="./css/carsGrid.css" rel="stylesheet">
    <link href="./css/marketplace.css" rel="stylesheet">
</head>

<body>

    <?php include 'header.php'; ?>
    <main class="da1-main" style="padding-top: 0;">

        <section class="da1-hero" style="height: 380px;">
            <div class="da1-hero-bg-wrap">
                <img src="./img/PaginaCars/banner.png" alt="Lifestyle Merch" class="da1-hero-bg"
                    style="object-position: center 60%; filter: grayscale(20%);">
                <div class="da1-hero-overlay"
                    style="background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5), #0a0a0a);"></div>
            </div>
            <div class="da1-hero-content" style="padding-top: 80px;">
                <p class="da1-breadcrumb">
                    <a href="index.php">Home</a> <span class="da1-breadcrumb-sep">/</span> <strong>Marketplace</strong>
                </p>
                <h1 class="da1-hero-title">
                    <span class="da1-hero-underline">Lifestyle & Merch.</span><br>
                    <span class="da1-hero-sub">Hot Wheels Premium, llaveros exclusivos y accesorios.</span>
                </h1>
            </div>
        </section>

        <section class="da1-shop-section py-5">
            <div class="container-fluid px-4 px-lg-5">
                <div class="row g-4">

                    <div class="col-lg-3">
                        <div class="da1-sidebar">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h4 class="da1-sidebar-title m-0"><i class="bi bi-funnel-fill me-2 text-danger"></i>
                                    Filtros</h4>
                                <button class="btn btn-link text-muted p-0 text-decoration-none"
                                    style="font-size: 0.8rem;">Limpiar</button>
                            </div>

                            <div class="da1-filter-group mb-4">
                                <h5 class="da1-filter-heading">Categoría</h5>
                                <div class="form-check da1-check">
                                    <input class="form-check-input" type="checkbox" id="catHotWheels" checked>
                                    <label class="form-check-label" for="catHotWheels">Hot Wheels / 1:64</label>
                                </div>
                                <div class="form-check da1-check">
                                    <input class="form-check-input" type="checkbox" id="catLlaveros">
                                    <label class="form-check-label" for="catLlaveros">Llaveros</label>
                                </div>
                                <div class="form-check da1-check">
                                    <input class="form-check-input" type="checkbox" id="catApparel">
                                    <label class="form-check-label" for="catApparel">Apparel (Ropa)</label>
                                </div>
                                <div class="form-check da1-check">
                                    <input class="form-check-input" type="checkbox" id="catAccesorios">
                                    <label class="form-check-label" for="catAccesorios">Accesorios</label>
                                </div>
                            </div>

                            <div class="da1-filter-group mb-4">
                                <h5 class="da1-filter-heading">Marca</h5>
                                <div class="form-check da1-check">
                                    <input class="form-check-input" type="checkbox" id="brandMattel">
                                    <label class="form-check-label" for="brandMattel">Hot Wheels Premium</label>
                                </div>
                                <div class="form-check da1-check">
                                    <input class="form-check-input" type="checkbox" id="brandMiniGT">
                                    <label class="form-check-label" for="brandMiniGT">Mini GT</label>
                                </div>
                                <div class="form-check da1-check">
                                    <input class="form-check-input" type="checkbox" id="brandDA1">
                                    <label class="form-check-label" for="brandDA1">DA1 Originals</label>
                                </div>
                            </div>

                            <div class="da1-filter-group">
                                <h5 class="da1-filter-heading">Disponibilidad</h5>
                                <div class="form-check da1-check">
                                    <input class="form-check-input" type="radio" name="stock" id="stockAll" checked>
                                    <label class="form-check-label" for="stockAll">Ver Todos</label>
                                </div>
                                <div class="form-check da1-check">
                                    <input class="form-check-input" type="radio" name="stock" id="stockIn">
                                    <label class="form-check-label" for="stockIn">En Stock</label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-9">

                        <div
                            class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-dark">
                            <span class="text-muted fw-bold"
                                style="font-family: 'Rajdhani'; letter-spacing: 1px;">Mostrando 4 resultados</span>
                            <select class="form-select da1-sort-select w-auto">
                                <option>Novedades</option>
                                <option>Precio: Menor a Mayor</option>
                                <option>Precio: Mayor a Menor</option>
                            </select>
                        </div>

                        <div class="da1-grid da1-grid-shop">

                            <article class="da1-card">
                                <div class="da1-card-carousel" style="height: 220px; background: #0a0a0a;">
                                    <img src="./img/PaginaCars/coches/Chiron/full.png" alt="Hot Wheels Nissan"
                                        class="w-100 h-100" style="object-fit: contain; padding: 20px;">
                                    <span class="da1-card-tag bg-primary border-primary">1:64 Premium</span>
                                </div>
                                <div class="da1-card-body">
                                    <div class="da1-card-brand text-muted">
                                        <i class="bi bi-car-front-fill da1-brand-icon"></i>
                                        <span>Hot Wheels Car Culture</span>
                                    </div>
                                    <h3 class="da1-card-name fs-5 mt-1">Nissan Skyline GT-R (R34)</h3>
                                    <div class="da1-card-meta mt-2">
                                        <span><i class="bi bi-layers-fill"></i> Metal/Metal</span>
                                        <span><i class="bi bi-record-circle-fill"></i> Real Riders</span>
                                    </div>
                                    <div class="da1-card-footer mt-3">
                                        <div class="da1-card-price">
                                            <span class="da1-currency">€</span>
                                            <span class="da1-amount text-white">14.99</span>
                                        </div>
                                        <div class="da1-card-actions">
                                            <button class="da1-card-buy btn-add-cart"><i
                                                    class="bi bi-cart-plus me-1"></i> Añadir</button>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article class="da1-card">
                                <div class="da1-card-carousel" style="height: 220px; background: #0a0a0a;">
                                    <img src="./img/PaginaCars/coches/Porsche 918 Spyder/full.png" alt="Llavero Carbono"
                                        class="w-100 h-100" style="object-fit: contain; padding: 20px;">
                                    <span class="da1-card-tag bg-danger border-danger">Accesorio</span>
                                </div>
                                <div class="da1-card-body">
                                    <div class="da1-card-brand text-muted">
                                        <i class="bi bi-gem da1-brand-icon"></i>
                                        <span>DA1 Originals</span>
                                    </div>
                                    <h3 class="da1-card-name fs-5 mt-1">Llavero Fibra de Carbono Real</h3>
                                    <div class="da1-card-meta mt-2">
                                        <span><i class="bi bi-hash"></i> Grabado láser</span>
                                    </div>
                                    <div class="da1-card-footer mt-3">
                                        <div class="da1-card-price">
                                            <span class="da1-currency">€</span>
                                            <span class="da1-amount text-white">29.90</span>
                                        </div>
                                        <div class="da1-card-actions">
                                            <button class="da1-card-buy btn-add-cart"><i
                                                    class="bi bi-cart-plus me-1"></i> Añadir</button>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article class="da1-card" style="opacity: 0.7;">
                                <div class="da1-card-carousel" style="height: 220px; background: #0a0a0a;">
                                    <img src="./img/PaginaCars/coches/Ferrari 812 Competizione/full.png"
                                        alt="Hot Wheels Bugatti" class="w-100 h-100"
                                        style="object-fit: contain; padding: 20px; filter: grayscale(100%);">
                                    <span class="da1-card-tag da1-tag-sold">Agotado</span>
                                </div>
                                <div class="da1-card-body">
                                    <div class="da1-card-brand text-muted">
                                        <i class="bi bi-car-front-fill da1-brand-icon"></i>
                                        <span>Hot Wheels Elite 64</span>
                                    </div>
                                    <h3 class="da1-card-name fs-5 mt-1">Bugatti Chiron Pur Sport</h3>
                                    <div class="da1-card-meta mt-2">
                                        <span><i class="bi bi-star-fill text-warning"></i> Edición Limitada</span>
                                    </div>
                                    <div class="da1-card-footer mt-3">
                                        <div class="da1-card-price">
                                            <span class="da1-currency">€</span>
                                            <span
                                                class="da1-amount text-muted text-decoration-line-through">24.50</span>
                                        </div>
                                        <div class="da1-card-actions">
                                            <button class="btn btn-outline-secondary btn-sm" disabled>Sin Stock</button>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <article class="da1-card">
                                <div class="da1-card-carousel" style="height: 220px; background: #0a0a0a;">
                                    <img src="./img/PaginaCars/coches/MclarenP1/full.png" alt="Gorra DA1"
                                        class="w-100 h-100" style="object-fit: contain; padding: 20px;">
                                    <span class="da1-card-tag bg-dark border-secondary">Apparel</span>
                                </div>
                                <div class="da1-card-body">
                                    <div class="da1-card-brand text-muted">
                                        <i class="bi bi-tag-fill da1-brand-icon"></i>
                                        <span>DA1 Originals</span>
                                    </div>
                                    <h3 class="da1-card-name fs-5 mt-1">Gorra DA1MOTORS Edition</h3>
                                    <div class="da1-card-meta mt-2">
                                        <span><i class="bi bi-scissors"></i> Algodón Premium</span>
                                        <span><i class="bi bi-check-circle"></i> Talla Única</span>
                                    </div>
                                    <div class="da1-card-footer mt-3">
                                        <div class="da1-card-price">
                                            <span class="da1-currency">€</span>
                                            <span class="da1-amount text-white">35.00</span>
                                        </div>
                                        <div class="da1-card-actions">
                                            <button class="da1-card-buy btn-add-cart"><i
                                                    class="bi bi-cart-plus me-1"></i> Añadir</button>
                                        </div>
                                    </div>
                                </div>
                            </article>

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
    <script src="./js/marketplace.js"></script>
</body>

</html>