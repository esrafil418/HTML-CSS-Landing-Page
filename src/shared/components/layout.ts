import { getCartCount, subscribeCart } from '@/features/cart/cart-store';
import { href } from '@/shared/utils/paths';

function headerMarkup(): string {
  return `
    <header class="site-header">
      <div class="site-header__inner">
        <a class="logo" href="${href('home')}">VELORA</a>
        <nav class="nav" aria-label="Primary">
          <a href="${href('shop.html')}">Shop</a>
          <a href="${href('search.html')}">Search</a>
          <a href="${href('about.html')}">About</a>
          <a href="${href('blog.html')}">Journal</a>
          <a href="${href('contact.html')}">Contact</a>
        </nav>
        <div class="header-actions">
          <a href="${href('login.html')}">Account</a>
          <a class="cart-link" href="${href('cart.html')}">
            Bag <span class="cart-count" data-cart-count>${getCartCount()}</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

function footerMarkup(): string {
  return `
    <footer class="site-footer">
      <div class="wrap site-footer__grid">
        <div>
          <a class="logo" href="${href('home')}">VELORA</a>
          <p>Objects and garments made to last. A resume-scale storefront with real commerce architecture.</p>
        </div>
        <div>
          <h3>Shop</h3>
          <a href="${href('shop.html')}">All products</a>
          <a href="${href('wishlist.html')}">Wishlist</a>
          <a href="${href('cart.html')}">Bag</a>
        </div>
        <div>
          <h3>House</h3>
          <a href="${href('about.html')}">About</a>
          <a href="${href('faq.html')}">FAQ</a>
          <a href="${href('shipping.html')}">Shipping</a>
          <a href="${href('returns.html')}">Returns</a>
        </div>
        <div>
          <h3>Legal</h3>
          <a href="${href('privacy.html')}">Privacy</a>
          <a href="${href('terms.html')}">Terms</a>
          <a href="${href('admin/index.html')}">Admin</a>
        </div>
      </div>
      <div class="wrap site-footer__legal">© ${new Date().getFullYear()} Velora. Built with HTML, CSS, TypeScript, Supabase, and Cloudinary.</div>
    </footer>
  `;
}

export function mountLayout(): void {
  const headerHost = document.querySelector('#site-header');
  const footerHost = document.querySelector('#site-footer');
  if (headerHost) headerHost.innerHTML = headerMarkup();
  if (footerHost) footerHost.innerHTML = footerMarkup();

  const updateCount = () => {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = String(getCartCount());
    });
  };

  subscribeCart(updateCount);
  updateCount();
}
