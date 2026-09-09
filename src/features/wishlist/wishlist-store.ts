const WISHLIST_KEY = 'velora.wishlist.v1';

export function getWishlistIds(): string[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleWishlist(productId: string): boolean {
  const ids = new Set(getWishlistIds());
  if (ids.has(productId)) {
    ids.delete(productId);
  } else {
    ids.add(productId);
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify([...ids]));
  return ids.has(productId);
}

export function isInWishlist(productId: string): boolean {
  return getWishlistIds().includes(productId);
}
