import { bootPage } from '@/app';
import { listProducts } from '@/features/catalog';
import { getWishlistIds } from '@/features/wishlist/wishlist-store';
import { productCard } from '@/shared/components/product-card';

bootPage(() => {
  void listProducts().then((products) => {
    const grid = document.querySelector('[data-wishlist]');
    if (!grid) return;
    const ids = new Set(getWishlistIds());
    const saved = products.filter((product) => ids.has(product.id));
    grid.innerHTML = saved.length
      ? saved.map(productCard).join('')
      : '<p class="notice">Nothing saved yet.</p>';
  });
});
