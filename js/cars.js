document.addEventListener('DOMContentLoaded', function() {
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

  document.addEventListener("click", () => {
    document.querySelectorAll(".da1-filter-panel").forEach(p => p.classList.remove("open"));
    document.querySelectorAll(".da1-filter-chevron").forEach(c => c.classList.remove("rotated"));
  });

  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  toggle.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
    icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  });

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

  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(48px)';
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
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  const sortBtn = document.getElementById('sortBtn');
  const sortPanel = document.getElementById('sortPanel');

  if (sortBtn) {
    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sortPanel.classList.toggle('open');
    });

    document.querySelectorAll('.da1-sort-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.da1-sort-opt').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        sortBtn.childNodes[0].textContent = opt.textContent + ' ';
        sortPanel.classList.remove('open');
      });
    });

    document.addEventListener('click', () => sortPanel.classList.remove('open'));
  }

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

  document.querySelectorAll('.da1-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.da1-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});