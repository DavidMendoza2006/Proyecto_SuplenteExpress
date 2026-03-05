document.addEventListener('DOMContentLoaded', function () {

    // 1. Theme Toggle
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

    // 2. Lógica del Carrito (Marketplace)
    const cartBadge = document.getElementById('cartBadge');
    const addCartBtns = document.querySelectorAll('.btn-add-cart');
    let cartCount = 0;

    addCartBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            // Incrementar contador
            cartCount++;
            cartBadge.textContent = cartCount;

            // Animación del badge
            cartBadge.style.transform = 'scale(1.5) translate(-20%, -20%)';
            setTimeout(() => {
                cartBadge.style.transform = 'translate(-30%, -30%)';
            }, 200);

            // Feedback visual en el botón
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check2"></i> Añadido';
            this.style.background = '#00c87a'; // Verde éxito

            // Restaurar botón
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = ''; // Vuelve al rojo de CSS
            }, 2000);
        });
    });

});