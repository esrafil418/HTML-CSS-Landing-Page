export type ProductCategory =
  | 'apparel'
  | 'footwear'
  | 'accessories'
  | 'home'
  | 'fragrance';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  compareAtCents?: number;
  category: ProductCategory;
  colors: string[];
  sizes: string[];
  imagePublicId: string;
  featured: boolean;
  inStock: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
};

export type UserProfile = {
  id: string;
  email: string;
  fullName: string | null;
  role: 'customer' | 'admin';
};

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type Order = {
  id: string;
  status: OrderStatus;
  totalCents: number;
  createdAt: string;
};
