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
(function () {

  const lineData = [
    { year: '2018', val: 120  },
    { year: '2019', val: 210  },
    { year: '2020', val: 175  },
    { year: '2021', val: 380  },
    { year: '2022', val: 590  },
    { year: '2023', val: 718  },
    { year: '2024', val: 1037 },
    { year: '2025', val: 1284 }
  ];

  const MAX_VAL = 1350;
  const X_START = 48, X_END = 390, Y_TOP = 20, Y_BOT = 180;
  const xStep = (X_END - X_START) / (lineData.length - 1);

  function toSVG(val) {
    return Y_BOT - ((val / MAX_VAL) * (Y_BOT - Y_TOP));
  }

  function buildPath() {
    return lineData.map((d, i) => {
      const x = X_START + i * xStep;
      const y = toSVG(d.val);
      return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
    }).join(' ');
  }

  function buildArea() {
    const pts = lineData.map((d, i) => {
      const x = X_START + i * xStep;
      const y = toSVG(d.val);
      return x.toFixed(1) + ' ' + y.toFixed(1);
    });
    const lastX = (X_START + (lineData.length - 1) * xStep).toFixed(1);
    return 'M ' + pts.join(' L ') +
           ' L ' + lastX + ' ' + Y_BOT +
           ' L ' + X_START.toFixed(1) + ' ' + Y_BOT + ' Z';
  }

  const lineEl  = document.getElementById('chartLine');
  const areaEl  = document.getElementById('chartArea');
  const dotsEl  = document.getElementById('chartDots');
  const tooltip = document.getElementById('chartTooltip');

  if (lineEl) {
    lineEl.setAttribute('d', buildPath());
    areaEl.setAttribute('d', buildArea());

    lineData.forEach((d, i) => {
      const x = X_START + i * xStep;
      const y = toSVG(d.val);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x.toFixed(1));
      circle.setAttribute('cy', y.toFixed(1));
      circle.setAttribute('r', '4');
      circle.classList.add('chart-dot');

      const wrap = document.querySelector('.line-chart-wrap');
      circle.addEventListener('mouseenter', () => {
        tooltip.innerHTML = '<strong>' + d.year + '</strong> — <strong>' + d.val + ' uds.</strong>';
        const pct = (x - X_START) / (X_END - X_START);
        tooltip.style.left = (pct * 100) + '%';
        tooltip.style.top  = '0px';
        tooltip.classList.add('visible');
      });
      circle.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });

      dotsEl.appendChild(circle);
    });
  }

  function animateCount(el) {
    const target   = parseFloat(el.getAttribute('data-target'));
    const prefix   = el.getAttribute('data-prefix') || '';
    const suffix   = el.getAttribute('data-suffix') || '';
    const isFloat  = target % 1 !== 0;
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease    = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function animateBars() {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-pct') + '%';
    });
  }

  function animateChart() {
    if (!lineEl) return;
    lineEl.classList.add('drawn');
    areaEl.classList.add('drawn');
    document.querySelectorAll('.chart-dot').forEach((dot, i) => {
      setTimeout(() => dot.classList.add('drawn'), 700 + i * 90);
    });
  }

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;

        document.querySelectorAll('.kpi-value[data-target]').forEach(el => {
          animateCount(el);
        });

        animateBars();
        animateChart();
        observer.disconnect();
      }
    });
  }, { threshold: 0.12 });

  const section = document.getElementById('stats-section');
  if (section) observer.observe(section);

})();