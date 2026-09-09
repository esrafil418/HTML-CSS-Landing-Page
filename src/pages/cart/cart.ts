import { bootPage } from '@/app';
import { getCartItems, updateQuantity } from '@/features/cart/cart-store';
import { listProducts } from '@/features/catalog';
import { formatMoney } from '@/shared/utils/dom';
import { href } from '@/shared/utils/paths';

async function renderCart(): Promise<void> {
  const root = document.querySelector('[data-cart]');
  if (!root) return;

  const items = getCartItems();
  if (!items.length) {
    root.innerHTML = `<p class="notice">Your bag is empty. <a href="${href('shop.html')}">Continue shopping</a>.</p>`;
    return;
  }

  const products = await listProducts();
  const byId = new Map(products.map((product) => [product.id, product]));
  let total = 0;
  const rows = items
    .map((item) => {
      const product = byId.get(item.productId);
      if (!product) return '';
      total += product.priceCents * item.quantity;
      return `
        <article class="card" style="padding:1rem;margin-bottom:1rem;">
          <h3 class="card__name">${product.name}</h3>
          <p>${item.color ?? ''} ${item.size ?? ''}</p>
          <p>${formatMoney(product.priceCents)} × ${item.quantity}</p>
          <button class="btn btn--ghost" type="button" data-remove="${item.productId}" data-size="${item.size ?? ''}" data-color="${item.color ?? ''}">Remove</button>
        </article>
      `;
    })
    .join('');

  root.innerHTML = `
    ${rows}
    <p><strong>Total ${formatMoney(total)}</strong></p>
    <a class="btn" href="${href('checkout.html')}">Checkout</a>
  `;

  root.querySelectorAll<HTMLButtonElement>('[data-remove]').forEach((button) => {
    button.addEventListener('click', () => {
      updateQuantity(button.dataset.remove ?? '', 0, button.dataset.size, button.dataset.color);
      void renderCart();
    });
  });
}

bootPage(() => {
  void renderCart();
});
