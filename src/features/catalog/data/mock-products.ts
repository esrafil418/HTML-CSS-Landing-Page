import type { Product } from '@/shared/types';

export const mockProducts: Product[] = [
  {
    id: 'prd_01',
    slug: 'linen-overshirt',
    name: 'Linen Overshirt',
    description: 'A structured overshirt in washed Belgian linen. Cut for layering through every season.',
    priceCents: 14800,
    compareAtCents: 17800,
    category: 'apparel',
    colors: ['Sand', 'Ink', 'Olive'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    imagePublicId: 'velora/linen-overshirt',
    featured: true,
    inStock: true,
  },
  {
    id: 'prd_02',
    slug: 'ceramic-pourer',
    name: 'Ceramic Pourer',
    description: 'Hand-thrown stoneware with a matte glaze. Made for daily rituals at the table.',
    priceCents: 6400,
    category: 'home',
    colors: ['Clay', 'Bone'],
    sizes: ['One size'],
    imagePublicId: 'velora/ceramic-pourer',
    featured: true,
    inStock: true,
  },
  {
    id: 'prd_03',
    slug: 'suede-slip-on',
    name: 'Suede Slip-On',
    description: 'Unlined suede with a flexible leather sole. Quiet luxury for city walking.',
    priceCents: 19200,
    category: 'footwear',
    colors: ['Taupe', 'Espresso'],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    imagePublicId: 'velora/suede-slip-on',
    featured: true,
    inStock: true,
  },
  {
    id: 'prd_04',
    slug: 'brass-cuff',
    name: 'Brass Cuff',
    description: 'A single piece of brushed brass, slightly irregular, meant to age with you.',
    priceCents: 8900,
    category: 'accessories',
    colors: ['Brass'],
    sizes: ['S/M', 'M/L'],
    imagePublicId: 'velora/brass-cuff',
    featured: false,
    inStock: true,
  },
  {
    id: 'prd_05',
    slug: 'vetiver-oil',
    name: 'Vetiver Oil',
    description: 'A dry, earthy scent composed around Haitian vetiver and sun-warmed cedar.',
    priceCents: 7200,
    category: 'fragrance',
    colors: ['Clear'],
    sizes: ['30ml'],
    imagePublicId: 'velora/vetiver-oil',
    featured: true,
    inStock: true,
  },
  {
    id: 'prd_06',
    slug: 'wool-throw',
    name: 'Wool Throw',
    description: 'Undyed merino, loosely woven. Heavy enough for evenings, light enough for travel.',
    priceCents: 15800,
    category: 'home',
    colors: ['Ivory', 'Charcoal'],
    sizes: ['140 × 200 cm'],
    imagePublicId: 'velora/wool-throw',
    featured: false,
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((product) => product.featured);
}
