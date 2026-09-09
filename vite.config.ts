import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: `${root}/index.html`,
        shop: `${root}/pages/shop.html`,
        product: `${root}/pages/product.html`,
        cart: `${root}/pages/cart.html`,
        checkout: `${root}/pages/checkout.html`,
        login: `${root}/pages/login.html`,
        register: `${root}/pages/register.html`,
        account: `${root}/pages/account.html`,
        orders: `${root}/pages/orders.html`,
        orderDetail: `${root}/pages/order-detail.html`,
        wishlist: `${root}/pages/wishlist.html`,
        search: `${root}/pages/search.html`,
        about: `${root}/pages/about.html`,
        contact: `${root}/pages/contact.html`,
        faq: `${root}/pages/faq.html`,
        blog: `${root}/pages/blog.html`,
        blogPost: `${root}/pages/blog-post.html`,
        privacy: `${root}/pages/privacy.html`,
        terms: `${root}/pages/terms.html`,
        shipping: `${root}/pages/shipping.html`,
        returns: `${root}/pages/returns.html`,
        notFound: `${root}/pages/404.html`,
        admin: `${root}/pages/admin/index.html`,
        adminProducts: `${root}/pages/admin/products.html`,
        adminProductEdit: `${root}/pages/admin/product-edit.html`,
        adminOrders: `${root}/pages/admin/orders.html`,
        adminCustomers: `${root}/pages/admin/customers.html`,
        adminMedia: `${root}/pages/admin/media.html`,
      },
    },
  },
});
