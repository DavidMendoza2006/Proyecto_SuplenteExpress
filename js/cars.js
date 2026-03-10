document.addEventListener('DOMContentLoaded', async function () {

  // ==========================================
  // 1. SUPABASE SETUP
  // ==========================================
  const supabaseUrl = 'https://xqtxmceatjupoasnllot.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdHhtY2VhdGp1cG9hc25sbG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTQzOTgsImV4cCI6MjA4ODYzMDM5OH0.imFG8M-A73za3bVwwWfTLUkV_0n15N8kwx0tMqk53jo';

  if (!window.supabase) return console.error("Supabase no cargado.");
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  let carsDB = [];
  const carsGrid = document.getElementById('dynamicCarsGrid');
  let currentTab = 'Available';
  let currentSort = 'rec';
  const formatNum = (num) => new Intl.NumberFormat('es-ES').format(num);

  const filterGroups = [
    { allChk: 'chkAllMarca', chkClass: 'chk-marca', label: 'val-marca', defaultTxt: 'All Brands' },
    { allChk: 'chkAllYear', chkClass: 'chk-year', label: 'val-year', defaultTxt: 'All years' },
    { allChk: 'chkAllPrice', chkClass: 'chk-price', label: 'val-price', defaultTxt: 'All price options' },
    { allChk: 'chkAllTipo', chkClass: 'chk-tipo', label: 'val-tipo', defaultTxt: 'All body types' },
    { allChk: 'chkAllSpecs', chkClass: 'chk-specs', label: 'val-specs', defaultTxt: 'All specifications' }
  ];

  // ==========================================
  // 2. FETCH DATOS Y CONSTRUCCIÓN DE INTERFAZ 100% DINÁMICA
  // ==========================================
  async function fetchCars() {
    try {
      const { data, error } = await supabase.from('vehiculos').select('*').eq('activo', true);
      if (error) throw error;
      carsDB = data || [];

      // ⚡ Construimos TODAS las listas dinámicamente
      buildBrandFilters(carsDB);
      buildYearFilters(carsDB);
      buildTypeFilters(carsDB);
      buildSpecsFilters(carsDB);
      buildPriceFilters(); // El precio usa rangos fijos lógicos

      // Reconectar eventos después de crear el HTML
      attachFilterListeners();

      const urlParams = new URLSearchParams(window.location.search);
      const menuMarca = urlParams.get('marca');
      if (menuMarca) {
        document.querySelectorAll('.chk-marca').forEach(chk => {
          if (chk.value.toLowerCase() === menuMarca.toLowerCase()) chk.checked = true;
        });
        const chkAll = document.getElementById('chkAllMarca');
        if (chkAll) chkAll.checked = false;
        window.history.replaceState(null, null, window.location.pathname);
      }

      updateFilterLabels();
      filterCars();

    } catch (error) {
      console.error("Error de conexión:", error);
      if (carsGrid) carsGrid.innerHTML = `<div class="text-danger w-100 text-center py-5" style="grid-column:1/-1;">Error de red.</div>`;
    }
  }

<<<<<<< HEAD

  function renderCars(lista) {
    if (!carsGrid) return;
    carsGrid.innerHTML = '';
=======
  // --- FUNCIONES CONSTRUCTORAS DE FILTROS ---
  function buildBrandFilters(coches) {
    const container = document.getElementById('dynamicBrandList');
    if (!container) return;
    const unicas = [...new Set(coches.map(c => c.marca).filter(Boolean))].sort();
    container.innerHTML = unicas.map(m => `<label><input type="checkbox" class="chk-marca" value="${m}"> <span style="color: #fff;">${m}</span></label>`).join('');
  }
>>>>>>> 883c1499a15f182cc08d9235a54710488b0f2871

  function buildYearFilters(coches) {
    const container = document.getElementById('dynamicYearList');
    if (!container) return;
    // Extraemos años únicos y ordenamos de más nuevo a más viejo
    const unicos = [...new Set(coches.map(c => c.ano).filter(Boolean))].sort((a, b) => b - a);
    container.innerHTML = unicos.map(y => `<label><input type="checkbox" class="chk-year" value="${y}"> <span style="color: #fff;">${y}</span></label>`).join('');
  }

<<<<<<< HEAD
    // 1. RUTA BASE DE TU BÚNKER EN SUPABASE STORAGE
    // ¡IMPORTANTE! Cambia 'TU_BUCKET' por el nombre de tu bucket de imágenes
    const supabaseStorageBase = 'https://xqtxmceatjupoasnllot.supabase.co/storage/v1/object/public/TU_BUCKET/';

    let htmlString = "";
    lista.forEach(car => {
      let imgs = [];
      try { imgs = typeof car.imagenes === 'string' ? JSON.parse(car.imagenes) : car.imagenes; } catch (e) { }

      let slidesHTML = '';
      let dotsHTML = '';
      if (imgs && imgs.length > 0) {
        imgs.forEach((imgObj, i) => {
          // 2. CONSTRUCCIÓN INTELIGENTE DE LA URL DE LA IMAGEN
          let finalImgUrl = imgObj.url.startsWith('http') ? imgObj.url : supabaseStorageBase + imgObj.url;

          slidesHTML += `<div class="da1-carousel-slide"><img src="${finalImgUrl}" data-pos="${imgObj.pos}" alt="${car.modelo}"></div>`;
          dotsHTML += `<span class="da1-dot-item ${i === 0 ? 'active' : ''}"></span>`;
        });
      } else {
        slidesHTML = `<div class="da1-carousel-slide"><div class="da1-slide-placeholder">${car.modelo}</div></div>`;
=======
  function buildTypeFilters(coches) {
    const container = document.getElementById('dynamicTypeList');
    if (!container) return;
    const unicos = [...new Set(coches.map(c => c.tipo).filter(Boolean))].sort();
    container.innerHTML = unicos.map(t => `<label><input type="checkbox" class="chk-tipo" value="${t}"> <span style="color: #fff;">${t}</span></label>`).join('');
  }

  function buildSpecsFilters(coches) {
    const container = document.getElementById('dynamicSpecsList');
    if (!container) return;

    // Definimos los grupos fijos y lógicos que quieres mostrar
    const specsGroups = [
      {
        title: "POTENCIA",
        items: [
          { val: "+500 CV", label: "+500 CV" },
          { val: "+700 CV", label: "+700 CV" },
          { val: "+800 CV", label: "+800 CV" },
          { val: "+1000 CV", label: "+1000 CV" }
        ]
      },
      {
        title: "TRACCIÓN",
        items: [
          { val: "AWD", label: "AWD (Total)" },
          { val: "RWD", label: "RWD (Trasera)" },
          { val: "FWD", label: "FWD (Delantera)" }
        ]
      },
      {
        title: "COMBUSTIBLE",
        items: [
          { val: "Gasolina", label: "Gasolina" },
          { val: "Diesel", label: "Diesel" },
          { val: "Híbrido", label: "Híbrido" },
          { val: "Eléctrico", label: "Eléctrico" }
        ]
>>>>>>> 883c1499a15f182cc08d9235a54710488b0f2871
      }
    ];

    let html = '';

<<<<<<< HEAD
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
=======
    // Dibujamos cada grupo con un pequeño título separador
    specsGroups.forEach((group, index) => {
      // Añadimos un pequeño margen superior a todos menos al primero para que respire
      const marginTop = index === 0 ? '0' : '15px';

      html += `<div style="margin-top: ${marginTop}; margin-bottom: 6px; font-size: 0.7rem; font-weight: 700; color: #666; letter-spacing: 1px;">${group.title}</div>`;

      group.items.forEach(item => {
        html += `<label style="display:block; margin-bottom:4px;"><input type="checkbox" class="chk-specs" value="${item.val}"> <span style="color: #fff;">${item.label}</span></label>`;
      });
>>>>>>> 883c1499a15f182cc08d9235a54710488b0f2871
    });

    container.innerHTML = html;
  }

  function buildPriceFilters() {
    const container = document.getElementById('dynamicPriceList');
    if (!container) return;
    const ranges = [
      { val: "0-500000", label: "Hasta 500K" },
      { val: "500000-1000000", label: "500K - 1M" },
      { val: "1000000-3000000", label: "1M - 3M" },
      { val: "3000000-99999999", label: "+3M" }
    ];
    container.innerHTML = ranges.map(r => `<label><input type="checkbox" class="chk-price" value="${r.val}"> <span style="color: #fff;">${r.label}</span></label>`).join('');
  }

<<<<<<< HEAD

=======
  // ==========================================
  // 3. LÓGICA DE CLICS Y TEXTOS INTELIGENTES
  // ==========================================
  function attachFilterListeners() {
    filterGroups.forEach(group => {
      const chkAll = document.getElementById(group.allChk);
      if (chkAll) {
        const newChkAll = chkAll.cloneNode(true);
        chkAll.parentNode.replaceChild(newChkAll, chkAll);
        newChkAll.addEventListener('change', function () {
          if (this.checked) {
            document.querySelectorAll(`.${group.chkClass}`).forEach(c => c.checked = false);
          } else {
            this.checked = true;
          }
          updateFilterLabels();
          filterCars();
        });
      }

      document.querySelectorAll(`.${group.chkClass}`).forEach(chk => {
        chk.addEventListener('change', function () {
          const currentAll = document.getElementById(group.allChk);
          if (this.checked && currentAll) currentAll.checked = false;

          const anyChecked = Array.from(document.querySelectorAll(`.${group.chkClass}`)).some(c => c.checked);
          if (!anyChecked && currentAll) currentAll.checked = true;

          updateFilterLabels();
          filterCars();
        });
      });
    });
  }

  function updateFilterLabels() {
    filterGroups.forEach(group => {
      const chkAll = document.getElementById(group.allChk);
      const checkboxes = document.querySelectorAll(`.${group.chkClass}`);
      const labelEl = document.getElementById(group.label);
      if (!chkAll || !labelEl) return;

      let checkedVals = Array.from(checkboxes).filter(c => c.checked).map(c => {
        // Limpiar texto para el panel superior (ej. quitar etiquetas si las hubiera)
        return c.nextElementSibling ? c.nextElementSibling.textContent.trim() : c.value;
      });

      if (checkedVals.length === 0 || chkAll.checked) {
        labelEl.textContent = group.defaultTxt;
        chkAll.checked = true;
      } else if (checkedVals.length <= 2) {
        labelEl.textContent = checkedVals.join(', ');
      } else {
        labelEl.textContent = `${checkedVals[0]} + ${checkedVals.length - 1}`;
      }
    });
  }

  // ==========================================
  // 4. MOTOR DE FILTRADO AVANZADO (ACTUALIZADO)
  // ==========================================
  // ==========================================
  // 4. MOTOR DE FILTRADO AVANZADO (LÓGICA MATEMÁTICA Y COMBINADA)
  // ==========================================
>>>>>>> 883c1499a15f182cc08d9235a54710488b0f2871
  function filterCars() {
    const selBrands = Array.from(document.querySelectorAll('.chk-marca:checked')).map(cb => cb.value);
    const selTypes = Array.from(document.querySelectorAll('.chk-tipo:checked')).map(cb => cb.value);
    const selYears = Array.from(document.querySelectorAll('.chk-year:checked')).map(cb => cb.value);
    const selPrices = Array.from(document.querySelectorAll('.chk-price:checked')).map(cb => cb.value);
    const selSpecs = Array.from(document.querySelectorAll('.chk-specs:checked')).map(cb => cb.value);

    let filtered = carsDB.filter(car => {
      // 1. Filtros básicos
      if (car.estado !== currentTab) return false;
      if (selBrands.length > 0 && !selBrands.includes(car.marca)) return false;
      if (selTypes.length > 0 && !selTypes.includes(car.tipo)) return false;
      if (selYears.length > 0 && !selYears.includes(car.ano.toString())) return false;

      // 2. Filtro Precio
      if (selPrices.length > 0) {
        const price = parseFloat(car.precio_eur);
        const match = selPrices.some(range => {
          const [min, max] = range.split('-');
          return price >= parseFloat(min) && price <= parseFloat(max);
        });
        if (!match) return false;
      }

      // 3. Filtro Inteligente de Especificaciones
      if (selSpecs.length > 0) {
        let specsArr = [];
        try { specsArr = typeof car.specs === 'string' ? JSON.parse(car.specs) : car.specs; } catch (e) { }
        if (car.combustible) specsArr.push(car.combustible);

        // Separar los filtros que el usuario ha marcado en las 3 categorías
        const selPower = selSpecs.filter(s => s.includes('CV'));
        const selTraction = selSpecs.filter(s => ['AWD', 'RWD', 'FWD'].includes(s));
        const selFuel = selSpecs.filter(s => !s.includes('CV') && !['AWD', 'RWD', 'FWD'].includes(s));

        // A) POTENCIA: Lógica matemática "Mayor o igual que..."
        if (selPower.length > 0) {
          let carCV = 0;
          // Buscar en el array algo que tenga "CV" y sacar su número (el regex evita que "V12" nos engañe)
          const cvString = specsArr.find(s => s && /cv/i.test(s.toString()));
          if (cvString) {
            const matchNum = cvString.toString().match(/(\d+)\s*cv/i);
            if (matchNum) carCV = parseInt(matchNum[1], 10);
          }

          // Si el usuario marcó +500 y +700, le valen los coches de >= 500. 
          const minThreshold = Math.min(...selPower.map(p => parseInt(p.match(/(\d+)/)[1], 10)));

          if (carCV < minThreshold) return false;
        }

        // B) TRACCIÓN: Debe coincidir alguna de las marcadas
        if (selTraction.length > 0) {
          const matchTraction = selTraction.some(t => specsArr.some(s => s && s.toString().toLowerCase().includes(t.toLowerCase())));
          if (!matchTraction) return false;
        }

        // C) COMBUSTIBLE: Debe coincidir alguno de los marcados
        if (selFuel.length > 0) {
          const matchFuel = selFuel.some(f => specsArr.some(s => s && s.toString().toLowerCase().includes(f.toLowerCase())));
          if (!matchFuel) return false;
        }
      }

      return true; // Si ha superado todas las barreras matemáticas, se muestra
    });

    // Ordenación Final
    if (currentSort === 'asc') filtered.sort((a, b) => parseFloat(a.precio_eur) - parseFloat(b.precio_eur));
    if (currentSort === 'desc') filtered.sort((a, b) => parseFloat(b.precio_eur) - parseFloat(a.precio_eur));
    if (currentSort === 'year') filtered.sort((a, b) => b.ano - a.ano);
    if (currentSort === 'km') filtered.sort((a, b) => a.kilometros - b.kilometros);

    renderCars(filtered);
  }

  function renderCars(lista) {
    if (!carsGrid) return;
    carsGrid.innerHTML = '';

    if (lista.length === 0) {
      carsGrid.innerHTML = `<div class="col-12 text-center py-5 text-muted w-100" style="grid-column: 1 / -1;">No se encontraron vehículos.</div>`;
      return;
    }

    let html = "";
    lista.forEach(car => {
      let imgs = [];
      try { imgs = typeof car.imagenes === 'string' ? JSON.parse(car.imagenes) : car.imagenes; } catch (e) { }

      let slidesHTML = '';
      let dotsHTML = '';
      const maxPhotos = 2; // Full e Interior

      if (imgs && imgs.length > 0) {
        for (let i = 0; i < Math.min(imgs.length, maxPhotos); i++) {
          slidesHTML += `<div class="da1-carousel-slide"><img src="${imgs[i].url}?v=3" data-pos="${imgs[i].pos}" alt="${car.modelo}"></div>`;
          dotsHTML += `<span class="da1-dot-item ${i === 0 ? 'active' : ''}"></span>`;
        }
      } else {
        slidesHTML = `<div class="da1-carousel-slide"><div class="da1-slide-placeholder">${car.modelo}</div></div>`;
      }

      // Volvemos a generar los botones y puntos si hay más de 1 foto
      const showControls = imgs && imgs.length > 1;
      const prevBtnHTML = showControls ? `<button class="da1-car-prev" aria-label="prev"><i class="bi bi-chevron-left"></i></button>` : '';
      const nextBtnHTML = showControls ? `<button class="da1-car-next" aria-label="next"><i class="bi bi-chevron-right"></i></button>` : '';
      const dotsContainerHTML = showControls ? `<div class="da1-dots">${dotsHTML}</div>` : '';

      const eur = parseFloat(car.precio_eur);
      const usd = eur * 1.09;
      const aed = eur * 4.0;
      const isSold = car.estado === 'Sold';
      const badgeSold = isSold ? `<span class="da1-card-tag da1-tag-sold">Sold</span>` : `<span class="da1-card-tag">Available</span>`;
      const badgeDiscount = car.descuento ? `<span class="da1-card-badge da1-badge-new">${car.descuento}</span>` : '';

      html += `
          <article class="da1-card" data-reveal>
            <div class="da1-card-carousel">
              <div class="da1-carousel-track">${slidesHTML}</div>
              ${prevBtnHTML}
              ${nextBtnHTML}
              ${dotsContainerHTML}
              ${badgeSold}
            </div>
            <div class="da1-card-body">
              <div class="da1-card-brand">
                <i class="bi bi-shield-fill da1-brand-icon"></i> <span>${car.marca}</span> ${badgeDiscount}
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
    carsGrid.innerHTML = html;
    initCardUI();
  }

  // ==========================================
  // 5. INTERFAZ: VISUALES Y LISTENERS GLOBALES
  // ==========================================
  function initCardUI() {
    // 1. Lógica del carrusel manual recuperada
    document.querySelectorAll('.da1-card').forEach(card => {
      const track = card.querySelector('.da1-carousel-track');
      const slides = card.querySelectorAll('.da1-carousel-slide');
      const dots = card.querySelectorAll('.da1-dot-item');
      const prev = card.querySelector('.da1-car-prev');
      const next = card.querySelector('.da1-car-next');
      let current = 0;

      if (slides.length <= 1) return;

      function goTo(n) {
        current = (n + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
      }

      if (prev) prev.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
      if (next) next.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });
      if (dots) dots.forEach((d, i) => d.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); }));
    });

    // 2. Efecto aparición al hacer scroll
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

    // 3. Conversor de monedas
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

  document.querySelectorAll('.da1-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.da1-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentTab = e.target.getAttribute('data-tab');
      filterCars();
    });
  });

  const sortBtn = document.getElementById('sortBtn');
  const sortPanel = document.getElementById('sortPanel');
  if (sortBtn && sortPanel) {
    sortBtn.addEventListener('click', (e) => { e.stopPropagation(); sortPanel.classList.toggle('open'); });
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

  const resetBtn = document.getElementById('btnResetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      filterGroups.forEach(group => {
        const chkAll = document.getElementById(group.allChk);
        document.querySelectorAll(`.${group.chkClass}`).forEach(c => c.checked = false);
        if (chkAll) chkAll.checked = true;
      });
      window.history.replaceState(null, null, window.location.pathname);
      updateFilterLabels();
      filterCars();
    });
  }

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

  document.addEventListener("click", (e) => {
    if (!e.target.closest('.da1-filter-panel')) {
      document.querySelectorAll(".da1-filter-panel").forEach(p => p.classList.remove("open"));
      document.querySelectorAll(".da1-filter-chevron").forEach(c => c.classList.remove("rotated"));
    }
  });

  // 🚀 ARRANCAR
  fetchCars();
});

// ==========================================
// 6. ESTADÍSTICAS Y GRÁFICOS (Inferior)
// ==========================================
(function () {
  const lineData = [
    { year: '2018', val: 120 }, { year: '2019', val: 210 }, { year: '2020', val: 175 },
    { year: '2021', val: 380 }, { year: '2022', val: 590 }, { year: '2023', val: 718 },
    { year: '2024', val: 1037 }, { year: '2025', val: 1284 }
  ];

  const MAX_VAL = 1350;
  const X_START = 48, X_END = 390, Y_TOP = 20, Y_BOT = 180;
  const xStep = (X_END - X_START) / (lineData.length - 1);

  function toSVG(val) { return Y_BOT - ((val / MAX_VAL) * (Y_BOT - Y_TOP)); }

  function buildPath() {
    return lineData.map((d, i) => {
      const x = X_START + i * xStep;
      return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + toSVG(d.val).toFixed(1);
    }).join(' ');
  }

  function buildArea() {
    const pts = lineData.map((d, i) => (X_START + i * xStep).toFixed(1) + ' ' + toSVG(d.val).toFixed(1));
    return 'M ' + pts.join(' L ') + ' L ' + (X_START + (lineData.length - 1) * xStep).toFixed(1) + ' ' + Y_BOT + ' L ' + X_START.toFixed(1) + ' ' + Y_BOT + ' Z';
  }

  const lineEl = document.getElementById('chartLine');
  const areaEl = document.getElementById('chartArea');
  const dotsEl = document.getElementById('chartDots');
  const tooltip = document.getElementById('chartTooltip');

  if (lineEl) {
    lineEl.setAttribute('d', buildPath());
    areaEl.setAttribute('d', buildArea());

    lineData.forEach((d, i) => {
      const x = X_START + i * xStep;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x.toFixed(1));
      circle.setAttribute('cy', toSVG(d.val).toFixed(1));
      circle.setAttribute('r', '4');
      circle.classList.add('chart-dot');

      circle.addEventListener('mouseenter', () => {
        tooltip.innerHTML = '<strong>' + d.year + '</strong> — <strong>' + d.val + ' uds.</strong>';
        tooltip.style.left = ((x - X_START) / (X_END - X_START) * 100) + '%';
        tooltip.style.top = '0px';
        tooltip.classList.add('visible');
      });
      circle.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
      dotsEl.appendChild(circle);
    });
  }

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const duration = 1800, startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = target * (1 - Math.pow(1 - progress, 3));
      el.textContent = (el.getAttribute('data-prefix') || '') + (target % 1 !== 0 ? current.toFixed(1) : Math.floor(current)) + (el.getAttribute('data-suffix') || '');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        document.querySelectorAll('.kpi-value[data-target]').forEach(animateCount);
        document.querySelectorAll('.bar-fill').forEach(bar => bar.style.width = bar.getAttribute('data-pct') + '%');
        if (lineEl) {
          lineEl.classList.add('drawn');
          areaEl.classList.add('drawn');
          document.querySelectorAll('.chart-dot').forEach((dot, i) => setTimeout(() => dot.classList.add('drawn'), 700 + i * 90));
        }
        observer.disconnect();
      }
    });
  }, { threshold: 0.12 });

  const section = document.getElementById('stats-section');
  if (section) observer.observe(section);
})();