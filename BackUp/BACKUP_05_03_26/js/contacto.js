document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
      icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    });
  }

  const form = document.getElementById('contactForm');
  const btnSubmit = document.querySelector('.da1-btn-submit');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = btnSubmit.innerHTML;
      btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando...';
      btnSubmit.style.pointerEvents = 'none';

      setTimeout(() => {
        btnSubmit.innerHTML = '<i class="bi bi-check-circle-fill ms-2"></i> Mensaje Enviado';
        btnSubmit.style.background = '#00c87a';
        btnSubmit.style.boxShadow = '0 0 24px rgba(0, 200, 122, 0.45)';
        form.reset();

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