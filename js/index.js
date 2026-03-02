document.addEventListener('DOMContentLoaded', function () {

    // ── Theme Toggle ──────────────────────────────────────────────
    const toggle = document.getElementById('themeToggle');
    const icon   = document.getElementById('themeIcon');
    const htmlEl = document.documentElement;

    if (toggle) {
        toggle.addEventListener('click', () => {
            const isDark = htmlEl.getAttribute('data-theme') === 'dark';
            htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
            icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        });
    }

    // ── Cards: carrusel interno de imágenes (igual que cars.js) ──
    document.querySelectorAll('.da1-card').forEach(card => {
        const track  = card.querySelector('.da1-carousel-track');
        const slides = card.querySelectorAll('.da1-carousel-slide');
        const dots   = card.querySelectorAll('.da1-dot-item');
        const prev   = card.querySelector('.da1-car-prev');
        const next   = card.querySelector('.da1-car-next');
        let current  = 0;

        function goTo(n) {
            current = (n + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        if (prev) prev.addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
        if (next) next.addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });
        dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    });

    // ── Cards: cambio de divisa ───────────────────────────────────
    const currencyOrder = ['eur', 'usd', 'aed'];

    document.querySelectorAll('.da1-card-cur').forEach(btn => {
        const card = btn.closest('.da1-card');
        let idx = 0;

        btn.addEventListener('click', e => {
            e.stopPropagation();
            idx = (idx + 1) % currencyOrder.length;
            const cur      = currencyOrder[idx];
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

    // ── Reveal on scroll ─────────────────────────────────────────
    document.querySelectorAll('[data-reveal]').forEach(el => {
        el.style.opacity  = '0';
        el.style.transform = 'translateY(48px)';
    });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.opacity   = '';
                    entry.target.style.transform = '';
                    entry.target.classList.add('revealed');
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

    // ── Featured Stock: carrusel externo ─────────────────────────
    const track      = document.getElementById('fsTrack');
    const prevBtn    = document.getElementById('fsPrev');
    const nextBtn    = document.getElementById('fsNext');
    const indicators = document.getElementById('fsIndicators');

    if (!track) return;

    const cards         = Array.from(track.querySelectorAll('.fs-card'));
    let   currentPage   = 0;

    // Calcula cuántas cards caben visibles según el ancho
    function getVisible() {
        const w = window.innerWidth;
        if (w <= 540)  return 1;
        if (w <= 860)  return 2;
        if (w <= 1200) return 3;
        return 4;
    }

    function totalPages() {
        return Math.ceil(cards.length / getVisible());
    }

    // Construye los indicadores (puntos/barras)
    function buildIndicators() {
        indicators.innerHTML = '';
        const pages = totalPages();
        for (let i = 0; i < pages; i++) {
            const btn = document.createElement('button');
            btn.className = 'fs-ind' + (i === currentPage ? ' active' : '');
            btn.setAttribute('aria-label', `Página ${i + 1}`);
            btn.addEventListener('click', () => goToPage(i));
            indicators.appendChild(btn);
        }
    }

    function goToPage(page) {
        const pages   = totalPages();
        currentPage   = Math.max(0, Math.min(page, pages - 1));
        const visible = getVisible();
        const cardW   = cards[0].offsetWidth;
        const gap     = 20;
        const offset  = currentPage * visible * (cardW + gap);

        track.style.transform = `translateX(-${offset}px)`;

        // Actualiza indicadores
        indicators.querySelectorAll('.fs-ind').forEach((btn, i) => {
            btn.classList.toggle('active', i === currentPage);
        });

        // Botones disabled en extremos
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= pages - 1;
    }

    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

    // Recalcula al cambiar tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            currentPage = 0;
            buildIndicators();
            goToPage(0);
        }, 150);
    });

    // Init
    buildIndicators();
    goToPage(0);
});