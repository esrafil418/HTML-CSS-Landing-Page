# Active context — Velora

Read this file at the start of a session, then the roadmap in `README.md`. Do not re-derive architecture from a full-tree scan unless this file is stale.

## Project

**Velora** is a multi-page e-commerce storefront for a resume. Stack: HTML, CSS, TypeScript, Vite, Supabase (database + auth), Cloudinary (images only).

## Decisions already made

- **Not a React/Vue app.** Vite bundles TypeScript into a multi-page site.
- **Feature-based `src/features/*`** plus **route HTML in `pages/`**. Page scripts stay thin.
- **Brand:** Velora. Palette: cream `#f4efe6`, ink `#1c1916`, rust accent `#9c4a2b`. Fonts: Fraunces + Outfit.
- **Supabase** holds products, users, carts, orders. **Cloudinary** holds files; DB stores `image_public_id`.
- **Client env is `VITE_*` only.** Cloudinary API key/secret stay unprefixed in `.env.local` so Vite never ships them to the browser.
- **Catalog:** `listProducts()` talks to Supabase `products`. If the table is missing or empty, mock data in `src/features/catalog/data/mock-products.ts` is used. Cart/wishlist still use `localStorage`.

## Works done (Phase 0 + env)

- Vite, TypeScript, path alias `@/` → `src/`
- Multi-page `vite.config.ts` inputs for all storefront and admin HTML files
- Design tokens, reset, base, layout, home hero CSS
- Shared header/footer (`src/shared/components/layout.ts`) with working relative links
- Product cards, mock catalog (6 products), featured grid on home
- Shop grid, product detail (`?id=`), add to bag, wishlist toggle
- Cart page (localStorage), search page (client-side filter)
- Scaffolded HTML for checkout, auth, account, orders, journal, legal, FAQ, contact, 404, admin
- Feature stubs: auth, checkout, orders, account, reviews, search, newsletter, blog, contact, admin, media, product
- `src/lib/supabase/client.ts`, `auth.ts` helpers
- `src/lib/cloudinary/url.ts` + product card/PDP `<img>` tags
- Draft SQL: `supabase/migrations/001_init.sql`
- `.env.example`, `.gitignore`, README roadmap
- **2026-09-09:** `.env.local` filled with this Supabase project (`lhocnxrjzhjefdsvzejk`) and Cloudinary cloud `ab9khnpv`. REST check: publishable key works; `products` table does not exist yet (PGRST205).

## What works in the browser now

- Home, shop, product, bag, search, wishlist
- Adding items updates the bag count in the header
- Product images load from Cloudinary when `velora/*` public IDs exist (run `npm run seed:cloudinary`)
- All other routes render layout + placeholder copy

## Not done

- SQL migration not applied on the live Supabase project (need SQL editor or DB password / service role)
- Auth forms do not submit
- Checkout does not create orders
- Admin is not protected
- No mobile nav
- No unsigned Cloudinary upload preset yet

## Secrets

- `.env.local` is gitignored. Do not commit it.
- Cloudinary **API secret was pasted in chat** — rotate it in the Cloudinary console when you can, then update `.env.local`.

## Next recommended slice

Apply `supabase/migrations/001_init.sql` in the Supabase SQL editor, then Phase 4 Auth.

## How to continue

1. Restart `npm run dev` after any `.env.local` change.
2. Tick the matching Phase checkbox in `README.md` when a slice ships.
3. Append a dated note under **Session log** below.

## Session log

- **2026-09-09:** Created folder structure, base storefront, mock commerce, roadmap, and this file.
- **2026-09-09:** Wired Supabase + Cloudinary env. Catalog fetches Supabase then falls back to mock. Cloudinary seed script added. API secret kept off `VITE_`.
