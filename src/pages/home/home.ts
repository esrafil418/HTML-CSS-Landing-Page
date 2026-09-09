import { bootPage } from '@/app';
import { listFeaturedProducts } from '@/features/catalog';
import { productCard } from '@/shared/components/product-card';
import { href } from '@/shared/utils/paths';

bootPage(() => {
  document.querySelectorAll('[data-shop-link]').forEach((el) => {
    el.setAttribute('href', href('shop.html'));
  });

  void listFeaturedProducts().then((products) => {
    const grid = document.querySelector('[data-featured-grid]');
    if (grid) {
      grid.innerHTML = products.map(productCard).join('');
    }
  });
});
