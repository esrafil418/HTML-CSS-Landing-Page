import { bootPage } from '@/app';
import { addToCart } from '@/features/cart/cart-store';
import { findProductById } from '@/features/catalog';
import { productImageSrc } from '@/features/media';
import { toggleWishlist, isInWishlist } from '@/features/wishlist/wishlist-store';
import { formatMoney } from '@/shared/utils/dom';

bootPage(() => {
  void (async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') ?? 'prd_01';
    const product = await findProductById(id);
    const root = document.querySelector('[data-product]');

    if (!root || !product) {
      if (root) root.innerHTML = '<p class="notice">Product not found.</p>';
      return;
    }

    root.innerHTML = `
      <img class="card__media" src="${productImageSrc(product.imagePublicId, 1100)}" alt="${product.name}" />
      <div>
        <span class="eyebrow">${product.category}</span>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <p class="card__price">${formatMoney(product.priceCents)}</p>
        <div class="hero__actions">
          <button class="btn" type="button" data-add>Add to bag</button>
          <button class="btn btn--ghost" type="button" data-wish>${isInWishlist(product.id) ? 'Saved' : 'Save'}</button>
        </div>
      </div>
    `;

    root.querySelector('[data-add]')?.addEventListener('click', () => {
      addToCart({
        productId: product.id,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0],
      });
    });

    root.querySelector('[data-wish]')?.addEventListener('click', (event) => {
      const saved = toggleWishlist(product.id);
      (event.currentTarget as HTMLButtonElement).textContent = saved ? 'Saved' : 'Save';
    });
  })();
});
