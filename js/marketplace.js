document.addEventListener('DOMContentLoaded', async function () {

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

    const supabaseUrl = 'https://xqtxmceatjupoasnllot.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdHhtY2VhdGp1cG9hc25sbG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTQzOTgsImV4cCI6MjA4ODYzMDM5OH0.imFG8M-A73za3bVwwWfTLUkV_0n15N8kwx0tMqk53jo';

    if (!window.supabase) {
        console.error("ERROR: Librería de Supabase no encontrada. Verifica que esté incluida en el PHP.");
        return;
    }

    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    let productsDB = [];
    const shopGrid = document.getElementById('shopGrid');
    const productCount = document.getElementById('productCount');


    async function fetchProductos() {
        if (!shopGrid) return;

        shopGrid.innerHTML = `
            <div class="col-12 text-center py-5" style="grid-column: 1 / -1;">
                <div class="spinner-border text-danger mb-3" role="status"></div>
                <h5 class="text-white text-uppercase" style="letter-spacing: 2px;">Conectando con el concesionario...</h5>
            </div>
        `;

        try {
            const { data, error } = await supabase
                .from('marketplace_productos')
                .select('*')
                .eq('activo', true)
                .order('creado_en', { ascending: false });

            if (error) throw error;

            productsDB = data || [];
            filterProducts();
        } catch (error) {
            console.error("Error al cargar Supabase:", error);
            shopGrid.innerHTML = `
                <div class="col-12 text-center py-5 text-danger" style="grid-column: 1 / -1; border: 1px dashed #e8001c; background: rgba(232,0,28,0.1); border-radius: 8px;">
                    <i class="bi bi-exclamation-triangle-fill" style="font-size: 2rem;"></i>
                    <h5 class="mt-3">Error de conexión</h5>
                    <p class="mb-0 text-muted small">${error.message}</p>
                </div>`;
            if (productCount) productCount.textContent = "Error";
        }
    }

    function renderProducts(lista) {
        if (!shopGrid) return;
        shopGrid.innerHTML = '';

        if (!lista || lista.length === 0) {
            shopGrid.innerHTML = `<div class="col-12 text-center py-5 text-muted" style="grid-column: 1 / -1;">No hay productos que coincidan con estos filtros.</div>`;
            if (productCount) productCount.textContent = `0 resultados`;
            return;
        }

        let htmlString = "";
        lista.forEach(prod => {
            let metaHTML = "";
            try {
                let metaArray = typeof prod.meta_info === 'string' ? JSON.parse(prod.meta_info) : prod.meta_info;
                if (Array.isArray(metaArray)) {
                    metaHTML = metaArray.map(m => `<span>${m}</span>`).join('');
                }
            } catch (e) {
                console.warn(`Error parseando meta_info del producto ID ${prod.id}`);
            }

            let isStock = prod.en_stock !== false && prod.en_stock !== 'false';

            let btnHTML = isStock
                ? `<button class="da1-card-buy btn-add-cart"><i class="bi bi-cart-plus me-1"></i> Añadir</button>`
                : `<button class="btn btn-outline-secondary btn-sm" disabled>Sin Stock</button>`;

            let opacity = isStock ? '1' : '0.6';
            let filterImg = isStock ? 'none' : 'grayscale(100%) opacity(0.8)';

            let precio = parseFloat(prod.precio_eur) || 0;

            htmlString += `
            <article class="da1-card" style="opacity: ${opacity};">
                <div class="da1-card-carousel" style="height: 220px; background: #0a0a0a;">
                    <img src="${prod.imagen_url || ''}" alt="${prod.nombre}" class="w-100 h-100" style="object-fit: contain; padding: 20px; filter: ${filterImg};">
                    ${prod.tag ? `<span class="da1-card-tag ${prod.tag_class || ''}">${prod.tag}</span>` : ''}
                </div>
                <div class="da1-card-body">
                    <div class="da1-card-brand text-muted">
                        <i class="bi ${prod.icono || 'bi-tag'} da1-brand-icon"></i>
                        <span>${prod.marca || 'DA1'}</span>
                    </div>
                    <h3 class="da1-card-name fs-5 mt-1">${prod.nombre}</h3>
                    <div class="da1-card-meta mt-2">${metaHTML}</div>
                    <div class="da1-card-footer mt-3">
                        <div class="da1-card-price">
                            <span class="da1-currency">€</span>
                            <span class="da1-amount ${isStock ? 'text-white' : 'text-muted text-decoration-line-through'}">${precio.toFixed(2)}</span>
                        </div>
                        <div class="da1-card-actions">${btnHTML}</div>
                    </div>
                </div>
            </article>`;
        });

        shopGrid.innerHTML = htmlString;
        if (productCount) productCount.textContent = `Mostrando ${lista.length} resultados`;
    }

    function isChecked(id) {
        const el = document.getElementById(id);
        return el ? el.checked : false;
    }


    function filterProducts() {
        try {
            const catAll = isChecked('catAll');

            const activeCats = [];
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
                let catOk = catAll || activeCats.length === 0 || activeCats.includes(prod.categoria);
                let brandOk = activeBrands.length === 0 || activeBrands.includes(prod.marca);
                let productInStock = prod.en_stock === true || prod.en_stock === 'true';
                let stockOk = mustBeInStock ? productInStock : true;

                return catOk && brandOk && stockOk;
            });

            const sortVal = document.getElementById('sortSelect')?.value || 'new';
            if (sortVal === 'asc') filtrados.sort((a, b) => parseFloat(a.precio_eur) - parseFloat(b.precio_eur));
            if (sortVal === 'desc') filtrados.sort((a, b) => parseFloat(b.precio_eur) - parseFloat(a.precio_eur));

            renderProducts(filtrados);
        } catch (e) {
            console.error("Error aplicando filtros:", e);
        }
    }

    const catAllBtn = document.getElementById('catAll');
    if (catAllBtn) {
        catAllBtn.addEventListener('change', function () {
            if (this.checked) {
                document.querySelectorAll('#catHotWheels, #catLlaveros, #catApparel, #catAccesorios').forEach(cb => {
                    if (cb) cb.checked = false;
                });
            }
            filterProducts();
        });
    }

    document.querySelectorAll('#catHotWheels, #catLlaveros, #catApparel, #catAccesorios').forEach(cb => {
        if (cb) {
            cb.addEventListener('change', function () {
                if (this.checked && catAllBtn) catAllBtn.checked = false;
                filterProducts();
            });
        }
    });

    document.querySelectorAll('.filter-radio, #brandMattel, #brandMiniGT, #brandDA1').forEach(input => {
        if (input) input.addEventListener('change', filterProducts);
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

    if (shopGrid) {
        shopGrid.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-add-cart');
            if (!btn) return;
            e.preventDefault();

            const card = btn.closest('.da1-card');
            const productName = card.querySelector('.da1-card-name').textContent;
            const prodData = productsDB.find(p => p.nombre === productName);

            if (prodData && typeof window.addToCartGlobal === 'function') {
                window.addToCartGlobal({
                    id: prodData.id,
                    name: prodData.nombre,
                    price: parseFloat(prodData.precio_eur),
                    image: prodData.imagen_url
                });

                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="bi bi-check2"></i> Añadido';
                btn.style.background = '#00c87a';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                }, 2000);
            } else {
                console.error("No se encontró el producto o cartGlobal.js no está cargado.");
            }
        });
    }

    await fetchProductos();
});