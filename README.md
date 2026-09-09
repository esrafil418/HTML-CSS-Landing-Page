# Velora

A resume-scale **e-commerce storefront** built as a multi-page site: **HTML, CSS, TypeScript**, Vite as the bundler (not a UI framework), **Supabase** for the backend (Postgres, Auth, Row Level Security), and **Cloudinary** for product media.

Cloudinary is the **image CDN**, not the product database. Product records, users, carts, and orders live in Supabase. Each product stores a Cloudinary `public_id`.

We will complete this project **phase by phase**. Session progress is recorded in [`activeContext.md`](./activeContext.md) so the next session can continue without re-scanning the whole tree.

## Stack

| Layer | Choice |
| --- | --- |
| Pages | Multi-page HTML (`index.html` + `pages/`) |
| Language | TypeScript modules, compiled by Vite |
| Style | Plain CSS with design tokens |
| Bundler | Vite (aliases, multi-page build) |
| Backend | Supabase (Postgres + Auth + RLS) |
| Media | Cloudinary delivery URLs + unsigned upload later |
| Data now | Mock catalog in TS, then Supabase |

Libraries are added only when a phase needs them (`@supabase/supabase-js` is the first).

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Home is `/`, shop is `/pages/shop.html`.

```bash
npm run build
npm run preview
```

`.env.local` is gitignored. Copy `.env.example` and fill `VITE_*` keys. The Cloudinary API secret must **never** use a `VITE_` prefix.

The catalog still uses **mock products** until `supabase/migrations/001_init.sql` is applied in the Supabase SQL editor. Cart and wishlist stay in `localStorage` until auth lands.

Optional later: `npm run seed:cloudinary` uploads placeholder photos to Cloudinary folder `velora/` (uses the server-only API secret locally).

## Folder structure (feature-based)

This mix is the right default for a vanilla multi-page shop: **HTML by route**, **TypeScript by feature**, **shared UI and tokens in one place**.

```
Html-Css-Landing-Page/
├── index.html                 Home
├── pages/                     One HTML file per storefront / admin route
│   ├── shop.html
│   ├── product.html
│   ├── cart.html
│   ├── checkout.html
│   ├── login.html
│   ├── register.html
│   ├── account.html
│   ├── orders.html
│   ├── order-detail.html
│   ├── wishlist.html
│   ├── search.html
│   ├── about.html
│   ├── contact.html
│   ├── faq.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── privacy.html
│   ├── terms.html
│   ├── shipping.html
│   ├── returns.html
│   ├── 404.html
│   └── admin/
│       ├── index.html
│       ├── products.html
│       ├── product-edit.html
│       ├── orders.html
│       ├── customers.html
│       └── media.html
├── public/                    Static files copied as-is
├── supabase/
│   ├── migrations/            SQL schema
│   └── seed.sql
├── src/
│   ├── app.ts                 Boot: CSS + header/footer
│   ├── vite-env.d.ts
│   ├── assets/                Local images, icons, fonts (later)
│   ├── styles/                Tokens, reset, base, layout, page CSS
│   ├── lib/                   Third-party clients
│   │   ├── supabase/          Client + auth helpers
│   │   └── cloudinary/        Delivery URL builder
│   ├── shared/
│   │   ├── components/        Header/footer, product card
│   │   ├── types/
│   │   └── utils/
│   ├── features/              Domain modules (feature-based)
│   │   ├── auth/
│   │   ├── catalog/
│   │   ├── product/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── account/
│   │   ├── wishlist/
│   │   ├── reviews/
│   │   ├── search/
│   │   ├── newsletter/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── media/
│   │   └── admin/
│   └── pages/                 Page entry scripts (import features)
├── vite.config.ts             Aliases + multi-page inputs
├── tsconfig.json
├── package.json
├── .env.example
├── README.md                  This roadmap
└── activeContext.md           What is already done
```

### Why feature folders

A product page needs catalog data, cart actions, wishlist, and later reviews. Those should live in `features/*`, not inside one giant `pages/product.ts`. Page files stay thin: query the DOM, call feature APIs.

## Conventions

- New **page** → HTML in `pages/` + entry in `src/pages/<name>/` + add the HTML path to `vite.config.ts`.
- New **domain behavior** → `src/features/<name>/`.
- Shared chrome (header, money format, types) → `src/shared/`.
- After finishing a slice, update **both** this README (phase checkboxes) and `activeContext.md`.

---

## Roadmap

### Phase 0 — Foundation (current)

- [x] Vite + TypeScript multi-page setup
- [x] Feature-based `src/` tree and storefront HTML routes
- [x] Design tokens and base layout (header/footer)
- [x] Mock catalog, localStorage cart and wishlist
- [x] Supabase client stub + draft SQL schema
- [x] Cloudinary URL helper
- [x] README + `activeContext.md`
- [x] `.env.local` wired (Supabase URL + publishable key, Cloudinary cloud name)

### Phase 1 — Design system and layout polish

- [ ] Mobile navigation (drawer)
- [ ] Button, field, badge, empty-state components
- [x] Product cards and PDP use Cloudinary delivery URLs
- [ ] Skip link, focus styles, color contrast pass
- [ ] 404 wired in Vite preview / host

### Phase 2 — Catalog

- [ ] Apply `supabase/migrations/001_init.sql` on a project
- [x] Map DB rows to `Product` types (used when `products` exists; otherwise mock)
- [ ] Shop filters (category, price, availability)
- [ ] Sort (newest, price)
- [ ] Pagination or “load more”
- [ ] Featured collection on home from Supabase

### Phase 3 — Product detail

- [ ] Gallery (Cloudinary transforms)
- [ ] Size / color pickers that affect cart line identity
- [ ] Related products
- [ ] Stock messaging
- [ ] JSON-LD product schema

### Phase 4 — Auth

- [ ] Copy `.env.local` keys
- [ ] Sign up, sign in, sign out
- [ ] `profiles` row on signup (trigger)
- [ ] Protected account / orders routes
- [ ] RLS policies for profiles

### Phase 5 — Cart, checkout, orders

- [ ] Sync cart to `cart_items` when logged in; keep guest cart in localStorage
- [ ] Merge guest cart on login
- [ ] Checkout validation and order insert
- [ ] Mock payment first (no real charges), optional Stripe later
- [ ] Order list + order detail
- [ ] Email confirmation via Supabase (optional)

### Phase 6 — Account extras

- [ ] Addresses
- [ ] Wishlist synced to Supabase
- [ ] Reviews (create + list on product)
- [ ] Newsletter signup table

### Phase 7 — Search and merchandising

- [ ] Debounced search
- [ ] Postgres `ilike` / full-text
- [ ] Collection landing pages
- [ ] Promo banners

### Phase 8 — Admin

- [ ] `role = admin` gate
- [ ] Product CRUD
- [ ] Order status updates
- [ ] Customer list
- [ ] Cloudinary unsigned upload from media page
- [ ] Basic dashboard counts

### Phase 9 — Cloudinary

- [x] Cloud name in client env; API secret only for local seed script
- [ ] Unsigned upload preset for admin
- [ ] Upload widget or `fetch` to Cloudinary API from admin
- [ ] Store `public_id` on `products.image_public_id` in Supabase
- [x] Responsive `w_` / `c_fill` URLs in cards and PDP

### Phase 10 — Content and trust pages

- [ ] Real about, FAQ, shipping, returns copy
- [ ] Journal list from a `posts` table
- [ ] Contact form → Supabase table or Edge Function
- [ ] Privacy / terms review

### Phase 11 — Quality for resume

- [ ] Lighthouse (performance, a11y, SEO)
- [ ] Empty, loading, and error states everywhere
- [ ] Seed script with realistic catalog
- [ ] Deploy (Netlify / Cloudflare Pages / GitHub Pages + Supabase)
- [ ] Short architecture note in this README for recruiters

## Suggested build order (next sessions)

1. Phase 1 mobile nav + product imagery  
2. Phase 4 env + Auth (unlocks everything else)  
3. Phase 2 catalog from Supabase  
4. Phase 5 checkout  
5. Phase 8 admin + Phase 9 uploads  

## Recruiter talking points (when finished)

- Multi-page vanilla architecture with TypeScript, not a SPA framework  
- Feature modules instead of a single script file  
- Auth and RLS on Postgres  
- Media pipeline split from relational data  
- Real commerce flows: catalog, bag, checkout, orders, admin
