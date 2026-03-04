document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Theme Toggle (Coherencia con toda la web)
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

  // 2. Control del Formulario
  const form = document.getElementById('contactForm');
  const btnSubmit = document.querySelector('.da1-btn-submit');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita que la página recargue

      // Estado de carga visual
      const originalText = btnSubmit.innerHTML;
      btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando...';
      btnSubmit.style.pointerEvents = 'none';

      // Simulación de envío (API)
      setTimeout(() => {
        btnSubmit.innerHTML = '<i class="bi bi-check-circle-fill ms-2"></i> Mensaje Enviado';
        btnSubmit.style.background = '#00c87a'; // Verde de éxito (tomado de estadis.css)
        btnSubmit.style.boxShadow = '0 0 24px rgba(0, 200, 122, 0.45)';
        form.reset();

        // Restaurar botón después de 3 segundos
        setTimeout(() => {
          btnSubmit.innerHTML = originalText;
          btnSubmit.style.background = '';
          btnSubmit.style.boxShadow = '';
          btnSubmit.style.pointerEvents = 'auto';
        }, 3000);
      }, 1500);
    });
  }
});