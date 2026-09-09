import { bootPage } from '@/app';
import { listProducts } from '@/features/catalog';
import { productCard } from '@/shared/components/product-card';

bootPage(() => {
  void listProducts().then((products) => {
    const form = document.querySelector<HTMLFormElement>('[data-search-form]');
    const grid = document.querySelector('[data-search-results]');

    const run = (query: string) => {
      const q = query.trim().toLowerCase();
      const matches = products.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q),
      );
      if (grid) {
        grid.innerHTML = matches.length
          ? matches.map(productCard).join('')
          : '<p class="notice">No matches. Try linen, suede, or home.</p>';
      }
    };

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input');
      run(input?.value ?? '');
    });
  });
});
