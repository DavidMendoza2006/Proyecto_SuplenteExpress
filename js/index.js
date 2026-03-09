document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.da1-card').forEach(card => {
    const track = card.querySelector('.da1-carousel-track');
    const slides = card.querySelectorAll('.da1-carousel-slide');
    const dots = card.querySelectorAll('.da1-dot-item');
    const prev = card.querySelector('.da1-car-prev');
    const next = card.querySelector('.da1-car-next');
    let current = 0;

    function goTo(n) {
      current = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prev.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
    next.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  });

  const currencyOrder = ['eur', 'usd', 'aed'];
  document.querySelectorAll('.da1-card-cur').forEach(btn => {
    const card = btn.closest('.da1-card');
    let idx = 0;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
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

  const fsTrack = document.getElementById('fsTrack');
  const fsClip = document.querySelector('.fs-track-clip');
  const prevBtn = document.getElementById('fsPrev');
  const nextBtn = document.getElementById('fsNext');
  const indicators = document.getElementById('fsIndicators');

  if (!fsTrack || !fsClip || !prevBtn || !nextBtn || !indicators) return;

  const fsCards = Array.from(fsTrack.querySelectorAll('.fs-card'));
  let currentPage = 0;

  function getVisible() {
    const w = window.innerWidth;
    if (w <= 540) return 1;
    if (w <= 860) return 2;
    if (w <= 1200) return 3;
    return 4;
  }

  function totalPages() {
    return Math.ceil(fsCards.length / getVisible());
  }

  function buildIndicators() {
    indicators.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const btn = document.createElement('button');
      btn.className = 'fs-ind' + (i === currentPage ? ' active' : '');
      btn.setAttribute('aria-label', `Página ${i + 1}`);
      btn.addEventListener('click', () => goToPage(i));
      indicators.appendChild(btn);
    }
  }

  function goToPage(page) {
    const pages = totalPages();
    currentPage = Math.max(0, Math.min(page, pages - 1));
    const visible = getVisible();
    const gap = 20;
    const clipW = fsClip.offsetWidth;
    const cardW = (clipW - gap * (visible - 1)) / visible;
    const offset = currentPage * visible * (cardW + gap);

    fsTrack.style.transform = `translateX(-${offset}px)`;

    indicators.querySelectorAll('.fs-ind').forEach((b, i) =>
      b.classList.toggle('active', i === currentPage)
    );
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= pages - 1;
  }

  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { 
      currentPage = 0; 
      buildIndicators(); 
      goToPage(0); 
    }, 150);
  });

  buildIndicators();
  goToPage(0);
});