document.addEventListener('DOMContentLoaded', async function () {
  const supabaseUrl = window.DA1_ENV.SUPABASE_URL;
  const supabaseKey = window.DA1_ENV.SUPABASE_ANON_KEY;

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

  async function fetchCars() {
    try {
      const { data, error } = await supabase.from('vehiculos').select('*').eq('activo', true);
      if (error) throw error;
      carsDB = data || [];


      buildBrandFilters(carsDB);
      buildYearFilters(carsDB);
      buildTypeFilters(carsDB);
      buildSpecsFilters(carsDB);
      buildPriceFilters();

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

  function buildBrandFilters(coches) {
    const container = document.getElementById('dynamicBrandList');
    if (!container) return;
    const unicas = [...new Set(coches.map(c => c.marca).filter(Boolean))].sort();
    container.innerHTML = unicas.map(m => `<label><input type="checkbox" class="chk-marca" value="${m}"> <span style="color: #fff;">${m}</span></label>`).join('');
  }

  function buildYearFilters(coches) {
    const container = document.getElementById('dynamicYearList');
    if (!container) return;
    const unicos = [...new Set(coches.map(c => c.ano).filter(Boolean))].sort((a, b) => b - a);
    container.innerHTML = unicos.map(y => `<label><input type="checkbox" class="chk-year" value="${y}"> <span style="color: #fff;">${y}</span></label>`).join('');
  }

  function buildTypeFilters(coches) {
    const container = document.getElementById('dynamicTypeList');
    if (!container) return;
    const unicos = [...new Set(coches.map(c => c.tipo).filter(Boolean))].sort();
    container.innerHTML = unicos.map(t => `<label><input type="checkbox" class="chk-tipo" value="${t}"> <span style="color: #fff;">${t}</span></label>`).join('');
  }

  function buildSpecsFilters(coches) {
    const container = document.getElementById('dynamicSpecsList');
    if (!container) return;

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
      }
    ];

    let html = '';
    specsGroups.forEach((group, index) => {
      const marginTop = index === 0 ? '0' : '15px';
      html += `<div style="margin-top: ${marginTop}; margin-bottom: 6px; font-size: 0.7rem; font-weight: 700; color: #666; letter-spacing: 1px;">${group.title}</div>`;
      group.items.forEach(item => {
        html += `<label style="display:block; margin-bottom:4px;"><input type="checkbox" class="chk-specs" value="${item.val}"> <span style="color: #fff;">${item.label}</span></label>`;
      });
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

  function filterCars() {
    const selBrands = Array.from(document.querySelectorAll('.chk-marca:checked')).map(cb => cb.value);
    const selTypes = Array.from(document.querySelectorAll('.chk-tipo:checked')).map(cb => cb.value);
    const selYears = Array.from(document.querySelectorAll('.chk-year:checked')).map(cb => cb.value);
    const selPrices = Array.from(document.querySelectorAll('.chk-price:checked')).map(cb => cb.value);
    const selSpecs = Array.from(document.querySelectorAll('.chk-specs:checked')).map(cb => cb.value);

    let filtered = carsDB.filter(car => {
      if (car.estado !== currentTab) return false;
      if (selBrands.length > 0 && !selBrands.includes(car.marca)) return false;
      if (selTypes.length > 0 && !selTypes.includes(car.tipo)) return false;
      if (selYears.length > 0 && !selYears.includes(car.ano.toString())) return false;

      if (selPrices.length > 0) {
        const price = parseFloat(car.precio_eur);
        const match = selPrices.some(range => {
          const [min, max] = range.split('-');
          return price >= parseFloat(min) && price <= parseFloat(max);
        });
        if (!match) return false;
      }

      if (selSpecs.length > 0) {
        let specsArr = [];
        try { specsArr = typeof car.specs === 'string' ? JSON.parse(car.specs) : car.specs; } catch (e) { }
        if (car.combustible) specsArr.push(car.combustible);

        const selPower = selSpecs.filter(s => s.includes('CV'));
        const selTraction = selSpecs.filter(s => ['AWD', 'RWD', 'FWD'].includes(s));
        const selFuel = selSpecs.filter(s => !s.includes('CV') && !['AWD', 'RWD', 'FWD'].includes(s));

        if (selPower.length > 0) {
          let carCV = 0;
          const cvString = specsArr.find(s => s && /cv/i.test(s.toString()));
          if (cvString) {
            const matchNum = cvString.toString().match(/(\d+)\s*cv/i);
            if (matchNum) carCV = parseInt(matchNum[1], 10);
          }
          const minThreshold = Math.min(...selPower.map(p => parseInt(p.match(/(\d+)/)[1], 10)));
          if (carCV < minThreshold) return false;
        }

        if (selTraction.length > 0) {
          const matchTraction = selTraction.some(t => specsArr.some(s => s && s.toString().toLowerCase().includes(t.toLowerCase())));
          if (!matchTraction) return false;
        }

        if (selFuel.length > 0) {
          const matchFuel = selFuel.some(f => specsArr.some(s => s && s.toString().toLowerCase().includes(f.toLowerCase())));
          if (!matchFuel) return false;
        }
      }

      return true;
    });

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
      const maxPhotos = 2;
      if (imgs && imgs.length > 0) {
        for (let i = 0; i < Math.min(imgs.length, maxPhotos); i++) {
          slidesHTML += `<div class="da1-carousel-slide"><img src="${imgs[i].url}?v=3" data-pos="${imgs[i].pos}" alt="${car.modelo}"></div>`;
          dotsHTML += `<span class="da1-dot-item ${i === 0 ? 'active' : ''}"></span>`;
        }
      } else {
        slidesHTML = `<div class="da1-carousel-slide"><div class="da1-slide-placeholder">${car.modelo}</div></div>`;
      }

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
                <div class="da1-card-actions d-flex align-items-center gap-2">
                  <button class="da1-card-cur" title="Cambiar moneda"><i class="bi bi-arrow-left-right"></i></button>
                  
                  <button class="btn btn-outline-secondary btn-sm text-white btn-descargar-ficha" 
                          data-marca="${car.marca}" 
                          data-modelo="${car.modelo}" 
                          data-ano="${car.ano}" 
                          data-precio="${formatNum(eur)}" 
                          data-km="${formatNum(car.kilometros)}" 
                          data-motor="${car.combustible}">
                    <i class="bi bi-file-earmark-pdf text-danger"></i> Ficha
                  </button>

                  <button class="da1-card-buy">${isSold ? 'Ver Ficha' : 'Contactar'}</button>
                </div>
              </div>
            </div>
          </article>`;
    });
    carsGrid.innerHTML = html;
    initCardUI();
  }

  function initCardUI() {
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
    document.querySelectorAll('.btn-descargar-ficha').forEach(btn => {
      if(btn.dataset.listener) return; 
      btn.dataset.listener = "true";

      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const targetBtn = e.currentTarget;
        const { jsPDF } = window.jspdf;

        const coche = {
          marca: targetBtn.dataset.marca,
          modelo: targetBtn.dataset.modelo,
          ano: targetBtn.dataset.ano,
          precio: targetBtn.dataset.precio,
          km: targetBtn.dataset.km,
          motor: targetBtn.dataset.motor
        };

        const htmlOriginal = targetBtn.innerHTML;
        targetBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>';
        targetBtn.disabled = true;

        try {
          const promptIA = `Actúa como el director técnico de DA1MOTORS. Escribe una ficha técnica breve, profesional y lujosa (SIN formato markdown, SIN asteriscos, solo texto plano) para el siguiente vehículo: ${coche.marca} ${coche.modelo} (Año: ${coche.ano}, Motor: ${coche.motor}, Kilómetros: ${coche.km} km, Precio: ${coche.precio}€). Incluye una breve introducción persuasiva y lista sus prestaciones técnicas. Máximo 150 palabras.`;

          const response = await fetch('./api_chatbot.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              historial: [{ role: 'user', text: promptIA }]
            })
          });

          const data = await response.json();

          if (!data.candidates || !data.candidates[0].content.parts[0].text) {
            throw new Error("Respuesta inválida de la IA");
          }

          let textoFicha = data.candidates[0].content.parts[0].text.replace(/\*/g, '');

          const doc = new jsPDF();
          const margen = 20;

          doc.setFont("helvetica", "bold");
          doc.setFontSize(22);
          doc.setTextColor(220, 53, 69); 
          doc.text("DA1MOTORS", margen, 20);

          doc.setFontSize(16);
          doc.setTextColor(40, 40, 40);
          doc.text(`Ficha Técnica: ${coche.marca} ${coche.modelo}`, margen, 30);

          doc.setLineWidth(0.5);
          doc.setDrawColor(200, 200, 200);
          doc.line(margen, 35, 190, 35);

          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(60, 60, 60);
          
          const lineasTexto = doc.splitTextToSize(textoFicha, 170);
          doc.text(lineasTexto, margen, 45);

          doc.setFontSize(9);
          doc.setTextColor(150, 150, 150);
          doc.text(`Generado automáticamente - DA1MOTORS VIP Assistant - ${new Date().toLocaleDateString()}`, margen, doc.internal.pageSize.height - 10);

          doc.save(`Ficha_${coche.marca}_${coche.modelo.replace(/\s+/g, '_')}.pdf`);

        } catch (error) {
          console.error("Error al generar PDF:", error);
          alert("DA1 Control: Los servidores satélite están ocupados. Intente generar la ficha más tarde.");
        } finally {
          targetBtn.innerHTML = htmlOriginal;
          targetBtn.disabled = false;
        }
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

  fetchCars();
});

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