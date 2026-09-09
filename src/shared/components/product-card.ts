import type { Product } from '@/shared/types';
import { productImageSrc } from '@/features/media';
import { formatMoney } from '@/shared/utils/dom';
import { href } from '@/shared/utils/paths';

export function productCard(product: Product): string {
  const price = formatMoney(product.priceCents);
  const compare = product.compareAtCents
    ? `<s>${formatMoney(product.compareAtCents)}</s>`
    : '';
  const src = productImageSrc(product.imagePublicId, 720);

  return `
    <article class="card">
      <a href="${href('product.html')}?id=${product.id}">
        <img class="card__media" src="${src}" alt="${product.name}" width="720" height="900" />
        <div class="card__body">
          <h3 class="card__name">${product.name}</h3>
          <p class="card__price">${compare}${price}</p>
        </div>
      </a>
    </article>
  `;
}
