<!DOCTYPE html>
<html lang="es" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
  <link href="./bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="./bootstrap/css/bootstrap.css" rel="stylesheet">
  <link href="./css/carsMain.css" rel="stylesheet">
  <link href="./css/carsGrid.css" rel="stylesheet">
  <link href="./css/estadis.css" rel="stylesheet">
  <title>Cars | DA1MOTORS</title>
</head>

<body>
  <?php include 'header.php'; ?>

  <main class="da1-main">
    <section class="da1-hero">
      <div class="da1-hero-bg-wrap">
        <img src="./img/PaginaCars/banner.png" alt="DA1MOTORS hero car" class="da1-hero-bg">
        <div class="da1-hero-overlay"></div>
      </div>
      <div class="da1-hero-content">
        <p class="da1-breadcrumb">
          <a href="./index.php">Home</a> <span class="da1-breadcrumb-sep">/</span> <strong>Available Cars</strong>
        </p>
        <h1 class="da1-hero-title">
          <span class="da1-hero-underline">No frenarás.</span><br>
          <span class="da1-hero-sub">Solo los mejores coches del planeta.</span>
        </h1>
      </div>

      <div class="da1-filters-bar">

        <div class="da1-filter-item">
          <button class="da1-filter-btn" data-target="filter-marca">
            <span class="da1-filter-label">MARCA</span>
            <span class="da1-filter-val" id="val-marca">All Brands</span>
            <i class="bi bi-chevron-down da1-filter-chevron"></i>
          </button>
          <div class="da1-filter-panel" id="filter-marca">
            <label><input type="checkbox" id="chkAllMarca" checked> <strong style="color: #fff;">All Brands</strong></label>
            <div style="height:1px; background:var(--da1-grey-border, #2a2a2a); margin:4px 0;"></div>

            <div id="dynamicBrandList"></div>

          </div>
        </div>

        <div class="da1-filter-item">
          <button class="da1-filter-btn" data-target="filter-year">
            <span class="da1-filter-label">AÑO</span>
            <span class="da1-filter-val" id="val-year">All years</span>
            <i class="bi bi-chevron-down da1-filter-chevron"></i>
          </button>
          <div class="da1-filter-panel" id="filter-year">
            <label><input type="checkbox" id="chkAllYear" checked> <strong style="color: #fff;">All years</strong></label>
            <div style="height:1px; background:var(--da1-grey-border, #2a2a2a); margin:4px 0;"></div>

            <div id="dynamicYearList"></div>
          </div>
        </div>

        <div class="da1-filter-item">
          <button class="da1-filter-btn" data-target="filter-price">
            <span class="da1-filter-label">PRECIO</span>
            <span class="da1-filter-val" id="val-price">All price options</span>
            <i class="bi bi-chevron-down da1-filter-chevron"></i>
          </button>
          <div class="da1-filter-panel" id="filter-price">
            <label><input type="checkbox" id="chkAllPrice" checked> <strong style="color: #fff;">All price options</strong></label>
            <div style="height:1px; background:var(--da1-grey-border, #2a2a2a); margin:4px 0;"></div>

            <div id="dynamicPriceList"></div>
          </div>
        </div>

        <div class="da1-filter-item">
          <button class="da1-filter-btn" data-target="filter-type">
            <span class="da1-filter-label">TIPO</span>
            <span class="da1-filter-val" id="val-tipo">All body types</span>
            <i class="bi bi-chevron-down da1-filter-chevron"></i>
          </button>
          <div class="da1-filter-panel" id="filter-type">
            <label><input type="checkbox" id="chkAllTipo" checked> <strong style="color: #fff;">All body types</strong></label>
            <div style="height:1px; background:var(--da1-grey-border, #2a2a2a); margin:4px 0;"></div>

            <div id="dynamicTypeList"></div>
          </div>
        </div>

        <div class="da1-filter-item">
          <button class="da1-filter-btn" data-target="filter-specs">
            <span class="da1-filter-label">ESPECIFICACIONES</span>
            <span class="da1-filter-val" id="val-specs">All specifications</span>
            <i class="bi bi-chevron-down da1-filter-chevron"></i>
          </button>
          <div class="da1-filter-panel" id="filter-specs">
            <label><input type="checkbox" id="chkAllSpecs" checked> <strong style="color: #fff;">All specifications</strong></label>
            <div style="height:1px; background:var(--da1-grey-border, #2a2a2a); margin:4px 0;"></div>

            <div id="dynamicSpecsList"></div>
          </div>
        </div>

        <button class="da1-filter-search" id="btnResetFilters" title="Limpiar filtros">
          <i class="bi bi-arrow-counterclockwise" style="font-size: 1.2rem; margin-right: 4px;"></i> RESET
        </button>

      </div>
    </section>

    <section class="da1-cars-section" id="cars-grid">
      <div class="da1-cars-toolbar">
        <div class="da1-toolbar-left">
          <button class="da1-tab-btn active" data-tab="Available">Available</button>
          <button class="da1-tab-btn" data-tab="Sold">Sold</button>
        </div>
        <div class="da1-toolbar-right">
          <div class="da1-sort-wrap">
            <button class="da1-sort-btn" id="sortBtn">Recommended <i class="bi bi-chevron-down"></i></button>
            <div class="da1-sort-panel" id="sortPanel">
              <button class="da1-sort-opt active" data-sort="rec">Recommended</button>
              <button class="da1-sort-opt" data-sort="asc">Price: Low to High</button>
              <button class="da1-sort-opt" data-sort="desc">Price: High to Low</button>
              <button class="da1-sort-opt" data-sort="year">Year: Newest</button>
              <button class="da1-sort-opt" data-sort="km">Mileage: Lowest</button>
            </div>
          </div>
        </div>
      </div>

      <div class="da1-grid" id="dynamicCarsGrid">
        <div class="col-12 text-center py-5 w-100" style="grid-column: 1 / -1;">
          <div class="spinner-border text-danger mb-3" role="status"></div>
          <h5 class="text-white text-uppercase" style="letter-spacing: 2px;">Cargando inventario...</h5>
        </div>
      </div>
    </section>
  </main>

  <?php include 'footer.php'; ?>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="./js/cartGlobal.js"></script>
  <script src="./js/user.js"></script>
  <script src="./js/cars.js"></script>

  <script src="./js/chat.js"></script>
</body>

</html>
</body>

</html>