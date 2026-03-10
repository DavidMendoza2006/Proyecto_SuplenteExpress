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
                <img src="https://xqtxmceatjupoasnllot.supabase.co/storage/v1/object/public/Imagenes/Marketplace/banner_marketplace.png" alt="Lifestyle Merch" class="da1-hero-bg"
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
                                <h4 class="da1-sidebar-title m-0"><i class="bi bi-funnel-fill me-2 text-danger"></i> Filtros</h4>
                                <button class="btn btn-link text-muted p-0 text-decoration-none" id="clearFilters" style="font-size: 0.8rem;">Limpiar</button>
                            </div>

                            <div class="da1-filter-group mb-4">
                                <h5 class="da1-filter-heading">Categoría</h5>

                                <div class="form-check da1-check">
                                    <input class="form-check-input filter-checkbox" type="checkbox" id="catAll" checked>
                                    <label class="form-check-label" for="catAll">Todos los productos</label>
                                </div>

                                <div class="form-check da1-check">
                                    <input class="form-check-input filter-checkbox" type="checkbox" id="catHotWheels">
                                    <label class="form-check-label" for="catHotWheels">Hot Wheels / 1:64</label>
                                </div>

                                <div class="form-check da1-check">
                                    <input class="form-check-input filter-checkbox" type="checkbox" id="catLlaveros">
                                    <label class="form-check-label" for="catLlaveros">Llaveros</label>
                                </div>

                                <div class="form-check da1-check">
                                    <input class="form-check-input filter-checkbox" type="checkbox" id="catApparel">
                                    <label class="form-check-label" for="catApparel">Apparel (Ropa)</label>
                                </div>
                            </div>

                            <div class="da1-filter-group mb-4">
                                <h5 class="da1-filter-heading">Marca</h5>
                                <div class="form-check da1-check">
                                    <input class="form-check-input filter-checkbox" type="checkbox" id="brandMattel">
                                    <label class="form-check-label" for="brandMattel">Hot Wheels Premium</label>
                                </div>
                                <div class="form-check da1-check">
                                    <input class="form-check-input filter-checkbox" type="checkbox" id="brandMiniGT">
                                    <label class="form-check-label" for="brandMiniGT">Mini GT</label>
                                </div>
                                <div class="form-check da1-check">
                                    <input class="form-check-input filter-checkbox" type="checkbox" id="brandDA1">
                                    <label class="form-check-label" for="brandDA1">DA1 Originals</label>
                                </div>
                            </div>

                            <div class="da1-filter-group">
                                <h5 class="da1-filter-heading">Disponibilidad</h5>
                                <div class="form-check da1-check">
                                    <input class="form-check-input filter-radio" type="radio" name="stock" id="stockAll" checked>
                                    <label class="form-check-label" for="stockAll">Ver Todos</label>
                                </div>
                                <div class="form-check da1-check">
                                    <input class="form-check-input filter-radio" type="radio" name="stock" id="stockIn">
                                    <label class="form-check-label" for="stockIn">En Stock</label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-9">
                        <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-dark">
                            <span class="text-muted fw-bold" id="productCount" style="font-family: 'Rajdhani'; letter-spacing: 1px;">Cargando productos...</span>
                            <select class="form-select da1-sort-select w-auto" id="sortSelect">
                                <option value="new">Novedades</option>
                                <option value="asc">Precio: Menor a Mayor</option>
                                <option value="desc">Precio: Mayor a Menor</option>
                            </select>
                        </div>

                        <div class="da1-grid da1-grid-shop" id="shopGrid">
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </main>

    <?php include 'footer.php'; ?>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>

    <script src="./js/cartGlobal.js"></script>

    <script src="./js/user.js"></script>
    <script src="./js/marketplace.js"></script>
    <script src="./js/chat.js"></script>
</body>

</html>s
</body>

</html>