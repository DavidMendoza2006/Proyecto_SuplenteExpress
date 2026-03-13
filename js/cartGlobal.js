let da1_cart = []; 

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadgeUI();
});

window.addToCartGlobal = function(product) {
    da1_cart.push(product);
    
    updateCartBadgeUI();
};

function updateCartBadgeUI() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;

    const totalItems = da1_cart.length;
    badge.textContent = totalItems;

    if (totalItems === 0) {
        badge.style.display = 'none';
    } else {
        badge.style.display = 'inline-block';
        
        badge.style.transform = 'scale(1.2)';
        setTimeout(() => {
            badge.style.transform = 'scale(1)';
        }, 200);
    }
}