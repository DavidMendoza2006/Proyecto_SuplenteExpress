document.addEventListener('DOMContentLoaded', async function () {

    // 1. THEME TOGGLE (Modo Oscuro/Claro)
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const htmlEl = document.documentElement;

    if (toggle) {
        toggle.addEventListener('click', () => {
            const isDark = htmlEl.getAttribute('data-theme') === 'dark';
            htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
            if (icon) icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        });
    }

    // 2. INICIALIZAR SUPABASE
    const supabaseUrl = 'https://pmgliohbadapwffnixeu.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZ2xpb2hiYWRhcHdmZm5peGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzQwNTgsImV4cCI6MjA4ODIxMDA1OH0.b7xMDD9ZPJAaFOjW-bRstuPnkF-Mm7y9CCJ-F_Gzh8g';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    let productsDB = [];
    const shopGrid = document.getElementById('shopGrid');
    const productCount = document.getElementById('productCount');

    // 3. DESCARGAR DATOS DE SUPABASE
    async function fetchProductos() {
        if (!shopGrid) return;

        shopGrid.innerHTML = `
            <div class="col-12 text-center py-5" style="grid-column: 1 / -1;">
                <div class="spinner-border text-danger mb-3" role="status"></div>
                <h5 class="text-white text-uppercase" style="letter-spacing: 2px;">Conectando con el concesionario...</h5>
            </div>
        `;

        const { data, error } = await supabase
            .from('marketplace_productos')
            .select('*')
            .eq('activo', true)
            .order('creado_en', { ascending: false });

        if (error) {
            console.error("Error al cargar Supabase:", error);
            shopGrid.innerHTML = `<div class="col-12 text-center py-5 text-danger" style="grid-column: 1 / -1;">Error de conexión con la base de datos.</div>`;
            return;
        }

        productsDB = data;
        filterProducts();
    }

    // 4. FUNCIÓN PARA DIBUJAR TARJETAS
    function renderProducts(lista) {
        if (!shopGrid) return;
        shopGrid.innerHTML = '';

        if (lista.length === 0) {
            shopGrid.innerHTML = `<div class="col-12 text-center py-5 text-muted" style="grid-column: 1 / -1;">No hay productos con estos filtros.</div>`;
            if (productCount) productCount.textContent = `0 resultados`;
            return;
        }

        let htmlString = "";
        lista.forEach(prod => {
            let metaArray = typeof prod.meta_info === 'string' ? JSON.parse(prod.meta_info) : prod.meta_info;
            let metaHTML = metaArray && metaArray.length ? metaArray.map(m => `<span>${m}</span>`).join('') : '';

            let btnHTML = prod.en_stock
                ? `<button class="da1-card-buy btn-add-cart"><i class="bi bi-cart-plus me-1"></i> Añadir</button>`
                : `<button class="btn btn-outline-secondary btn-sm" disabled>Sin Stock</button>`;

            let opacity = prod.en_stock ? '1' : '0.7';
            let filterImg = prod.en_stock ? 'none' : 'grayscale(100%)';

            htmlString += `
            <article class="da1-card" style="opacity: ${opacity};">
                <div class="da1-card-carousel" style="height: 220px; background: #0a0a0a;">
                    <img src="${prod.imagen_url}" alt="${prod.nombre}" class="w-100 h-100" style="object-fit: contain; padding: 20px; filter: ${filterImg};">
                    <span class=\"da1-card-tag ${prod.tag_class}\">${prod.tag}</span>
                </div>
                <div class="da1-card-body">
                    <div class="da1-card-brand text-muted">
                        <i class="bi ${prod.icono} da1-brand-icon"></i>
                        <span>${prod.marca}</span>
                    </div>
                    <h3 class="da1-card-name fs-5 mt-1">${prod.nombre}</h3>
                    <div class="da1-card-meta mt-2">${metaHTML}</div>
                    <div class="da1-card-footer mt-3">
                        <div class="da1-card-price">
                            <span class="da1-currency">€</span>
                            <span class="da1-amount ${prod.en_stock ? 'text-white' : 'text-muted text-decoration-line-through'}">${parseFloat(prod.precio_eur).toFixed(2)}</span>
                        </div>
                        <div class="da1-card-actions">${btnHTML}</div>
                    </div>
                </div>
            </article>`;
        });

        shopGrid.innerHTML = htmlString;
        if (productCount) productCount.textContent = `Mostrando ${lista.length} resultados`;
    }

    // Helper para leer checks
    function isChecked(id) {
        const el = document.getElementById(id);
        return el ? el.checked : false;
    }

    // 5. FUNCIÓN DE FILTRADO (ACTUALIZADA CON "TODOS")
    function filterProducts() {
        try {
            const catAll = isChecked('catAll');

            // Recopilamos qué categorías están marcadas
            const activeCats = [];
            // Si "Todos" está marcado, no filtramos por categoría (array vacío)
            if (!catAll) {
                if (isChecked('catHotWheels')) activeCats.push("Hot Wheels / 1:64");
                if (isChecked('catLlaveros')) activeCats.push("Llaveros");
                if (isChecked('catApparel')) activeCats.push("Apparel (Ropa)");
                if (isChecked('catAccesorios')) activeCats.push("Accesorios");
            }

            const activeBrands = [];
            if (isChecked('brandMattel')) activeBrands.push("Hot Wheels Premium");
            if (isChecked('brandDA1')) activeBrands.push("DA1 Originals");
            if (isChecked('brandMiniGT')) activeBrands.push("Mini GT");

            const mustBeInStock = isChecked('stockIn');

            let filtrados = productsDB.filter(prod => {
                // Lógica de Categoría: Si "Todos" es true o no hay ninguna marcada, catOk es true
                let catOk = catAll || activeCats.length === 0 || activeCats.includes(prod.categoria);

                // Lógica de Marcas
                let brandOk = activeBrands.length === 0 || activeBrands.includes(prod.marca);

                // Lógica de Stock
                let stockOk = mustBeInStock ? prod.en_stock === true : true;

                return catOk && brandOk && stockOk;
            });

            // Ordenar
            const sortVal = document.getElementById('sortSelect')?.value || 'new';
            if (sortVal === 'asc') filtrados.sort((a, b) => parseFloat(a.precio_eur) - parseFloat(b.precio_eur));
            if (sortVal === 'desc') filtrados.sort((a, b) => parseFloat(b.precio_eur) - parseFloat(a.precio_eur));

            renderProducts(filtrados);
        } catch (e) {
            console.error("Error aplicando filtros:", e);
        }
    }

    // 6. EVENT LISTENERS Y LÓGICA DE COMPORTAMIENTO

    // Comportamiento de "Todos"
    const catAllBtn = document.getElementById('catAll');
    if (catAllBtn) {
        catAllBtn.addEventListener('change', function () {
            if (this.checked) {
                // Si marco "Todos", desmarco las demás
                document.querySelectorAll('#catHotWheels, #catLlaveros, #catApparel, #catAccesorios').forEach(cb => cb.checked = false);
            }
            filterProducts();
        });
    }

    // Comportamiento de categorías individuales
    document.querySelectorAll('#catHotWheels, #catLlaveros, #catApparel, #catAccesorios').forEach(cb => {
        cb.addEventListener('change', function () {
            if (this.checked && catAllBtn) {
                // Si marco una categoría, desmarco "Todos"
                catAllBtn.checked = false;
            }
            filterProducts();
        });
    });

    // Otros filtros
    document.querySelectorAll('.filter-radio, #brandMattel, #brandMiniGT, #brandDA1').forEach(input => {
        input.addEventListener('change', filterProducts);
    });

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.addEventListener('change', filterProducts);

    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.filter-checkbox').forEach(i => i.checked = false);
            if (catAllBtn) catAllBtn.checked = true;
            const stockAll = document.getElementById('stockAll');
            if (stockAll) stockAll.checked = true;
            if (sortSelect) sortSelect.value = 'new';
            filterProducts();
        });
    }

    // 7. LÓGICA DEL CARRITO
    const cartBadge = document.getElementById('cartBadge');
    let cartCount = 0;

    if (shopGrid) {
        shopGrid.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-add-cart');
            if (!btn) return;
            e.preventDefault();
            if (cartBadge) {
                cartCount++;
                cartBadge.textContent = cartCount;
                cartBadge.style.transform = 'scale(1.5) translate(-20%, -20%)';
                setTimeout(() => cartBadge.style.transform = 'translate(-30%, -30%)', 200);
            }
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-check2"></i> Añadido';
            btn.style.background = '#00c87a';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 2000);
        });
    }

    // 🚀 INICIAR LA CONEXIÓN A SUPABASE
    await fetchProductos();

});