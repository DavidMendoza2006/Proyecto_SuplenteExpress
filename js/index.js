document.addEventListener('DOMContentLoaded', function () {

    // ── Theme Toggle ──────────────────────────────────────────────
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

});