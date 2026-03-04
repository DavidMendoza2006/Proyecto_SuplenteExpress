/* ══════════════════════════════════════════════════
   DA1MOTORS — nosotros.js
══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. GESTIÓN DEL TEMA (CLARO / OSCURO) ──
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
      themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    });
  }

  // ── 2. EFECTO PARALLAX EN EL HERO ──
  // Al hacer scroll, la imagen de fondo se mueve ligeramente más lento que la página
  const heroImg = document.querySelector('.da1-parallax-img');
  window.addEventListener('scroll', () => {
    if(heroImg) {
      let scrollPos = window.scrollY;
      // Solo aplicamos parallax si estamos arriba (para ahorrar recursos)
      if (scrollPos < 800) {
        heroImg.style.transform = `translateY(${scrollPos * 0.3}px) scale(1.05)`;
      }
    }
  });

  // ── 3. ANIMACIONES AL HACER SCROLL (REVEAL) ──
  // Seleccionamos todos los elementos que tienen clases de animación
  const revealElements = document.querySelectorAll('.fade-up, .reveal-left, .reveal-right, .reveal-up');

  // Opciones del observador
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // Se activa cuando el elemento entra al 90% de la pantalla
    threshold: 0.1
  };

  // Creamos el observador
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añadimos la clase que quita la transparencia y el movimiento
        entry.target.classList.add('is-visible');
        // Dejamos de observar el elemento para que la animación solo ocurra una vez
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Activamos el observador en cada elemento
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Disparamos manualmente los elementos del hero para que aparezcan al cargar la página
  setTimeout(() => {
    document.querySelectorAll('.da1-about-hero-content .fade-up').forEach(el => {
      el.classList.add('is-visible');
    });
  }, 100);

});