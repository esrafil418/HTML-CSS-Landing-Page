import { getSupabase } from '@/lib/supabase/client';
import type { Product, ProductCategory } from '@/shared/types';
import { mockProducts } from '@/features/catalog/data/mock-products';

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_cents: number;
  compare_at_cents: number | null;
  category: ProductCategory;
  colors: string[];
  sizes: string[];
  image_public_id: string | null;
  featured: boolean;
  in_stock: boolean;
};

let cache: Product[] | null = null;

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    priceCents: row.price_cents,
    compareAtCents: row.compare_at_cents ?? undefined,
    category: row.category,
    colors: row.colors ?? [],
    sizes: row.sizes ?? [],
    imagePublicId: row.image_public_id ?? 'sample',
    featured: row.featured,
    inStock: row.in_stock,
  };
}

export async function listProducts(): Promise<Product[]> {
  if (cache) {
    return cache;
  }

  const supabase = getSupabase();
  if (!supabase) {
    cache = mockProducts;
    return cache;
  }

  const { data, error } = await supabase.from('products').select('*');

  if (error || !data?.length) {
    cache = mockProducts;
    return cache;
  }

  cache = (data as ProductRow[]).map(mapRow);
  return cache;
}

export async function findProductById(id: string): Promise<Product | undefined> {
  const products = await listProducts();
  return products.find((product) => product.id === id);
}

export async function listFeaturedProducts(): Promise<Product[]> {
  const products = await listProducts();
  return products.filter((product) => product.featured);
}
