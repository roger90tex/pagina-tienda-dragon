document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const menuOpenIcon = document.getElementById('menuOpenIcon');
    const menuCloseIcon = document.getElementById('menuCloseIcon');
    const cartOpenIcon = document.getElementById('cartOpenIcon');
    const cartCloseIcon = document.getElementById('cartCloseIcon');
    const navSection = document.getElementById('navSection');
    const cart = document.querySelector('.cart');
    const cartItemsContainer = document.querySelector('.cart__items');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.getElementById('cartCount');
    const cartCountBadge = document.getElementById('cartBadge');
    const addToCartButtons = document.querySelectorAll('.btn-buy');

    // Variables para llevar el conteo y total del carrito
    let total = 0;
    let itemCount = 0;

    // 1. Abrir y cerrar el menú de navegación
    menuOpenIcon.addEventListener('click', () => {
        navSection.classList.remove('hidden');
        navSection.setAttribute('aria-hidden', 'false');
    });

    menuCloseIcon.addEventListener('click', () => {
        navSection.classList.add('hidden');
        navSection.setAttribute('aria-hidden', 'true');
    });

    // 2. Abrir y cerrar el carrito
    cartOpenIcon.addEventListener('click', () => {
        cart.classList.remove('hidden');
        cart.setAttribute('aria-hidden', 'false');
    });

    cartCloseIcon.addEventListener('click', () => {
        cart.classList.add('hidden');
        cart.setAttribute('aria-hidden', 'true');
    });

    // 3. Función para actualizar el total del carrito
    function updateTotal(price) {
        total += price;
        cartTotalElement.innerText = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }

    // 4. Función para actualizar el conteo de artículos en el carrito
    function updateItemCount(count) {
        itemCount = Math.max(0, itemCount + count);  // Evitar que sea negativo
        cartCountElement.innerText = itemCount;
        cartCountBadge.innerText = itemCount;
    }

    // 5. Función para agregar productos al carrito
    function addToCart(event) {
        const productItem = event.target.closest('.products__item');
        if (!productItem) {
            console.error('Producto no encontrado');
            return;
        }

        // Crear un nuevo elemento para el artículo del carrito
        const cartItem = document.createElement('section');
        cartItem.classList.add('cart__item');

        // Extraer información del producto
        const productImageSrc = productItem.querySelector('.products__img')?.src;
        const productTitle = productItem.querySelector('.products__title')?.innerText;
        const productPriceText = productItem.querySelector('.products_price')?.innerText;
        const productPrice = parseFloat(productPriceText.replace('$', '').replace(',', ''));

        if (!productImageSrc || !productTitle || isNaN(productPrice)) {
            console.error('Detalles del producto incompletos.');
            return;
        }

        // Rellenar el HTML del nuevo artículo
        cartItem.innerHTML = `
            <img src="${productImageSrc}" alt="${productTitle}" class="cart__item-image">
            <h3 class="cart__item-title">${productTitle}</h3>
            <p class="cart__item-price">${productPriceText}</p>
            <span class="cart__item-remove">
                <img src="img/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="Eliminar artículo" class="cart__item-remove-icon">
            </span>
        `;

        // Añadir el nuevo artículo al contenedor del carrito
        cartItemsContainer.appendChild(cartItem);

        // Actualizar total y conteo
        updateTotal(productPrice);
        updateItemCount(1);

        // Función para eliminar productos del carrito
        cartItem.querySelector('.cart__item-remove').addEventListener('click', () => {
            cartItem.remove();
            updateTotal(-productPrice);
            updateItemCount(-1);
        });
    }

    // 6. Asignar el evento a cada botón de "Agregar al carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});
