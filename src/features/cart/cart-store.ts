import type { CartItem } from '@/shared/types';
import { CART_STORAGE_KEY } from '@/features/cart/constants';

const listeners = new Set<() => void>();

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((fn) => fn());
}

export function getCartItems(): CartItem[] {
  return read();
}

export function getCartCount(): number {
  return read().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(item: CartItem): void {
  const items = read();
  const existing = items.find(
    (entry) =>
      entry.productId === item.productId &&
      entry.size === item.size &&
      entry.color === item.color,
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    items.push(item);
  }

  write(items);
}

export function updateQuantity(productId: string, quantity: number, size?: string, color?: string): void {
  const items = read()
    .map((entry) => {
      if (entry.productId === productId && entry.size === size && entry.color === color) {
        return { ...entry, quantity };
      }
      return entry;
    })
    .filter((entry) => entry.quantity > 0);

  write(items);
}

export function clearCart(): void {
  write([]);
}

export function subscribeCart(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
