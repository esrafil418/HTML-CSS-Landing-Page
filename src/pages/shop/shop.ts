import { bootPage } from '@/app';
import { listProducts } from '@/features/catalog';
import { productCard } from '@/shared/components/product-card';

bootPage(() => {
  void listProducts().then((products) => {
    const grid = document.querySelector('[data-product-grid]');
    if (grid) {
      grid.innerHTML = products.map(productCard).join('');
    }
  });
});
