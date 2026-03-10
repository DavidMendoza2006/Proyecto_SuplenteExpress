document.addEventListener('DOMContentLoaded', async function () {

  // ==========================================
  // 1. SUPABASE SETUP
  // ==========================================
  const supabaseUrl = 'https://xqtxmceatjupoasnllot.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdHhtY2VhdGp1cG9hc25sbG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTQzOTgsImV4cCI6MjA4ODYzMDM5OH0.imFG8M-A73za3bVwwWfTLUkV_0n15N8kwx0tMqk53jo';

  if (!window.supabase) {
    console.error("Supabase no cargado.");
    return;
  }

  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  let carsDB = [];
  const carsGrid = document.getElementById('dynamicCarsGrid');
  let currentTab = 'Available';
  let currentSort = 'rec';
  const formatNum = (num) => new Intl.NumberFormat('es-ES').format(num);

  // --- Definición de Nodos de Filtros ---
  const filterGroups = [
    { allChk: 'chkAllMarca', chkClass: 'chk-marca', label: 'val-marca', defaultTxt: 'All Brands' },
    { allChk: 'chkAllYear', chkClass: 'chk-year', label: 'val-year', defaultTxt: 'All years' },
    { allChk: 'chkAllPrice', chkClass: 'chk-price', label: 'val-price', defaultTxt: 'All price options' },
    { allChk: 'chkAllTipo', chkClass: 'chk-tipo', label: 'val-tipo', defaultTxt: 'All body types' },
    { allChk: 'chkAllSpecs', chkClass: 'chk-specs', label: 'val-specs', defaultTxt: 'All specifications' }
  ];

  // ==========================================
  // 2. LÓGICA DE TEXTOS Y CHECKBOXES INTELIGENTES
  // ==========================================
  function updateFilterLabels() {
    filterGroups.forEach(group => {
      const chkAll = document.getElementById(group.allChk);
      const checkboxes = document.querySelectorAll(`.${group.chkClass}`);
      const labelEl = document.getElementById(group.label);
      if (!chkAll || !labelEl) return;

      const checkedVals = Array.from(checkboxes).filter(c => c.checked).map(c => c.parentElement.textContent.trim());

      if (chkAll.checked || checkedVals.length === 0) {
        labelEl.textContent = group.defaultTxt;
        chkAll.checked = true;
      } else if (checkedVals.length <= 2) {
        labelEl.textContent = checkedVals.join(', ');
      } else {
        // Si la categoría es Specs o Price, el texto suele ser largo, cortamos a 1
        let maxShow = group.chkClass === 'chk-marca' ? 2 : 1;
        if (checkedVals.length <= maxShow) {
          labelEl.textContent = checkedVals.join(', ');
        } else {
          labelEl.textContent = `${checkedVals[0]} +${checkedVals.length - 1}`;
        }
      }
    });
  }

  // Configurar listeners cruzados para "Todos" vs "Individuales"
  filterGroups.forEach(group => {
    const chkAll = document.getElementById(group.allChk);
    const checkboxes = document.querySelectorAll(`.${group.chkClass}`);

    if (chkAll) {
      chkAll.addEventListener('change', function () {
        if (this.checked) checkboxes.forEach(c => c.checked = false);
        updateFilterLabels();
        filterCars();
      });
    }

    checkboxes.forEach(chk => {
      chk.addEventListener('change', function () {
        if (this.checked && chkAll) chkAll.checked = false;
        updateFilterLabels();
        filterCars();
      });
    });
  });


  // ==========================================
  // 3. FETCH DATOS DE SUPABASE
  // ==========================================
  async function fetchCars() {
    try {
      const { data, error } = await supabase.from('vehiculos').select('*').eq('activo', true);
      if (error) throw error;
      carsDB = data || [];

      const urlParams = new URLSearchParams(window.location.search);
      const menuMarca = urlParams.get('marca');

      if (menuMarca) {
        const chkMarcas = document.querySelectorAll('.chk-marca');
        const chkMarcaAll = document.getElementById('chkAllMarca');

        chkMarcas.forEach(chk => {
          if (chk.value.toLowerCase() === menuMarca.toLowerCase()) chk.checked = true;
        });
        if (chkMarcaAll) chkMarcaAll.checked = false;

        window.history.replaceState(null, null, window.location.pathname);
      }

      updateFilterLabels();
      filterCars();

    } catch (error) {
      console.error("Error cargando coches:", error);
      if (carsGrid) carsGrid.innerHTML = `<div class="text-danger w-100 text-center py-5" style="grid-column:1/-1;">Error conectando a la base de datos.</div>`;
    }
  }

  // ==========================================
  // 4. RENDERIZADO DE TARJETAS
  // ==========================================
  function renderCars(lista) {
    if (!carsGrid) return;
    carsGrid.innerHTML = '';

    if (lista.length === 0) {
      carsGrid.innerHTML = `<div class="col-12 text-center py-5 text-muted w-100" style="grid-column: 1 / -1;">No se encontraron vehículos con esta combinación de filtros.</div>`;
      return;
    }

    let htmlString = "";
    lista.forEach(car => {
      let imgs = [];
      try { imgs = typeof car.imagenes === 'string' ? JSON.parse(car.imagenes) : car.imagenes; } catch (e) { }

      let slidesHTML = '';
      let dotsHTML = '';
      if (imgs && imgs.length > 0) {
        imgs.forEach((imgObj, i) => {
          slidesHTML += `<div class="da1-carousel-slide"><img src="${imgObj.url}" data-pos="${imgObj.pos}" alt="${car.modelo}"></div>`;
          dotsHTML += `<span class="da1-dot-item ${i === 0 ? 'active' : ''}"></span>`;
        });
      } else {
        slidesHTML = `<div class="da1-carousel-slide"><div class="da1-slide-placeholder">${car.modelo}</div></div>`;
      }

      const eur = parseFloat(car.precio_eur);
      const usd = eur * 1.09;
      const aed = eur * 4.0;
      const isSold = car.estado === 'Sold';
      const badgeSold = isSold ? `<span class="da1-card-tag da1-tag-sold">Sold</span>` : `<span class="da1-card-tag">Available</span>`;
      const badgeDiscount = car.descuento ? `<span class="da1-card-badge da1-badge-new">${car.descuento}</span>` : '';

      htmlString += `
            <article class="da1-card" data-reveal>
              <div class="da1-card-carousel">
                <div class="da1-carousel-track">${slidesHTML}</div>
                <button class="da1-car-prev"><i class="bi bi-chevron-left"></i></button>
                <button class="da1-car-next"><i class="bi bi-chevron-right"></i></button>
                <div class="da1-dots">${dotsHTML}</div>
                ${badgeSold}
              </div>
              <div class="da1-card-body">
                <div class="da1-card-brand">
                  <i class="bi bi-shield-fill da1-brand-icon"></i>
                  <span>${car.marca}</span>
                  ${badgeDiscount}
                </div>
                <h3 class="da1-card-name">${car.modelo}</h3>
                <p class="da1-card-year">${car.ano}</p>
                <div class="da1-card-meta">
                  <span><i class="bi bi-speedometer2"></i> ${formatNum(car.kilometros)} km</span>
                  <span><i class="bi bi-fuel-pump"></i> ${car.combustible}</span>
                </div>
                <div class="da1-card-footer">
                  <div class="da1-card-price">
                    <span class="da1-currency" data-aed="AED" data-eur="€" data-usd="$">€</span>
                    <span class="da1-amount" data-aed="${formatNum(aed)}" data-eur="${formatNum(eur)}" data-usd="${formatNum(usd)}">${formatNum(eur)}</span>
                  </div>
                  <div class="da1-card-actions">
                    <button class="da1-card-cur" title="Cambiar moneda"><i class="bi bi-arrow-left-right"></i></button>
                    <button class="da1-card-buy">${isSold ? 'Ver Ficha' : 'Contactar'}</button>
                  </div>
                </div>
              </div>
            </article>`;
    });

    carsGrid.innerHTML = htmlString;
    initCardUI();
  }

  // ==========================================
  // 5. MOTOR DE FILTRADO AVANZADO
  // ==========================================
  function filterCars() {
    // Recoger valores de los arrays marcados
    const selBrands = Array.from(document.querySelectorAll('.chk-marca:checked')).map(cb => cb.value);
    const selTypes = Array.from(document.querySelectorAll('.chk-tipo:checked')).map(cb => cb.value);
    const selYears = Array.from(document.querySelectorAll('.chk-year:checked')).map(cb => cb.value);
    const selPrices = Array.from(document.querySelectorAll('.chk-price:checked')).map(cb => cb.value);
    const selSpecs = Array.from(document.querySelectorAll('.chk-specs:checked')).map(cb => cb.value);

    let filtered = carsDB.filter(car => {
      // 1. Pestaña Principal (Available / Sold)
      if (car.estado !== currentTab) return false;

      // 2. Filtro de Marca
      if (selBrands.length > 0 && !selBrands.includes(car.marca)) return false;

      // 3. Filtro de Tipo
      if (selTypes.length > 0 && !selTypes.includes(car.tipo)) return false;

      // 4. Filtro de Año (Rangos ej: '2020-2026')
      if (selYears.length > 0) {
        const isYearMatch = selYears.some(range => {
          const [minStr, maxStr] = range.split('-');
          const min = parseInt(minStr, 10);
          const max = parseInt(maxStr, 10);
          return car.ano >= min && car.ano <= max;
        });
        if (!isYearMatch) return false;
      }

      // 5. Filtro de Precio (Rangos ej: '0-500000')
      if (selPrices.length > 0) {
        const carPrice = parseFloat(car.precio_eur);
        const isPriceMatch = selPrices.some(range => {
          const [minStr, maxStr] = range.split('-');
          const min = parseFloat(minStr);
          const max = parseFloat(maxStr);
          return carPrice >= min && carPrice <= max;
        });
        if (!isPriceMatch) return false;
      }

      // 6. Filtro de Especificaciones (Buscar en el JSONB specs o en el campo combustible)
      if (selSpecs.length > 0) {
        let carSpecsArray = [];
        try {
          carSpecsArray = typeof car.specs === 'string' ? JSON.parse(car.specs) : car.specs;
          if (!Array.isArray(carSpecsArray)) carSpecsArray = [];
        } catch (e) { }

        // Incluir el combustible en las specs buscables por si marcan "Eléctrico" o "Híbrido"
        if (car.combustible) carSpecsArray.push(car.combustible);

        // Requerimos que el coche tenga AL MENOS UNA de las specs marcadas
        const isSpecMatch = selSpecs.some(spec => carSpecsArray.includes(spec));
        if (!isSpecMatch) return false;
      }

      return true; // Pasa todos los filtros
    });

    // Aplicar Ordenación
    if (currentSort === 'asc') filtered.sort((a, b) => parseFloat(a.precio_eur) - parseFloat(b.precio_eur));
    if (currentSort === 'desc') filtered.sort((a, b) => parseFloat(b.precio_eur) - parseFloat(a.precio_eur));
    if (currentSort === 'year') filtered.sort((a, b) => b.ano - a.ano);
    if (currentSort === 'km') filtered.sort((a, b) => a.kilometros - b.kilometros);

    renderCars(filtered);
  }


  // ==========================================
  // 6. LISTENERS GLOBALES RESTANTES
  // ==========================================

  // Pestañas (Available / Sold)
  document.querySelectorAll('.da1-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.da1-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentTab = e.target.getAttribute('data-tab');
      filterCars();
    });
  });

  // Ordenación (Recommended, Price low-high, etc.)
  const sortBtn = document.getElementById('sortBtn');
  const sortPanel = document.getElementById('sortPanel');
  if (sortBtn && sortPanel) {
    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sortPanel.classList.toggle('open');
    });

    document.querySelectorAll('.da1-sort-opt').forEach(opt => {
      opt.addEventListener('click', (e) => {
        document.querySelectorAll('.da1-sort-opt').forEach(o => o.classList.remove('active'));
        e.target.classList.add('active');
        sortBtn.innerHTML = `${e.target.textContent} <i class="bi bi-chevron-down"></i>`;
        currentSort = e.target.getAttribute('data-sort');
        filterCars();
      });
    });
    document.addEventListener('click', () => sortPanel.classList.remove('open'));
  }

  // Botón Reset General
  const resetBtn = document.getElementById('btnResetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      filterGroups.forEach(group => {
        const chkAll = document.getElementById(group.allChk);
        const checkboxes = document.querySelectorAll(`.${group.chkClass}`);
        checkboxes.forEach(c => c.checked = false);
        if (chkAll) chkAll.checked = true;
      });
      window.history.replaceState(null, null, window.location.pathname);
      updateFilterLabels();
      filterCars();
    });
  }

  // Lógica visual de abrir/cerrar menús superiores
  document.querySelectorAll(".da1-filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute("data-target");
      const panel = document.getElementById(targetId);
      const chevron = btn.querySelector(".da1-filter-chevron");
      const isOpen = panel.classList.contains("open");

      document.querySelectorAll(".da1-filter-panel").forEach(p => p.classList.remove("open"));
      document.querySelectorAll(".da1-filter-chevron").forEach(c => c.classList.remove("rotated"));

      if (!isOpen) {
        panel.classList.add("open");
        chevron.classList.add("rotated");
      }
    });
  });

  // Cerrar menús al hacer click fuera
  document.addEventListener("click", (e) => {
    // Evitamos que se cierre si el click fue dentro de un panel de filtro (para poder marcar checkboxes tranquilamente)
    if (!e.target.closest('.da1-filter-panel')) {
      document.querySelectorAll(".da1-filter-panel").forEach(p => p.classList.remove("open"));
      document.querySelectorAll(".da1-filter-chevron").forEach(c => c.classList.remove("rotated"));
    }
  });

  // ==========================================
  // 7. FUNCIONES VISUALES DE TARJETAS (Carruseles y Moneda)
  // ==========================================
  function initCardUI() {
    document.querySelectorAll('.da1-card').forEach(card => {
      const track = card.querySelector('.da1-carousel-track');
      const slides = card.querySelectorAll('.da1-carousel-slide');
      const dots = card.querySelectorAll('.da1-dot-item');
      const prev = card.querySelector('.da1-car-prev');
      const next = card.querySelector('.da1-car-next');
      let current = 0;

      if (slides.length <= 1) {
        if (prev) prev.style.display = 'none';
        if (next) next.style.display = 'none';
        if (dots) dots.forEach(d => d.style.display = 'none');
        return;
      }

      function goTo(n) {
        current = (n + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
      }

      if (prev) prev.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
      if (next) next.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });
      if (dots) dots.forEach((d, i) => d.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); }));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.style.opacity = '';
            entry.target.style.transform = '';
            entry.target.classList.add('revealed');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    const currencyOrder = ['eur', 'usd', 'aed'];
    document.querySelectorAll('.da1-card-cur').forEach(btn => {
      let idx = 0;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.da1-card');
        idx = (idx + 1) % currencyOrder.length;
        const cur = currencyOrder[idx];
        const amountEl = card.querySelector('.da1-amount');
        const symbolEl = card.querySelector('.da1-currency');

        amountEl.classList.add('switching');
        setTimeout(() => {
          amountEl.textContent = amountEl.getAttribute('data-' + cur);
          symbolEl.textContent = symbolEl.getAttribute('data-' + cur);
          amountEl.classList.remove('switching');
        }, 150);
      });
    });
  }

  // 🚀 ARRANCAR
  fetchCars();

});