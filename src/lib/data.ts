import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  if (!img) {
    return { url: 'https://placehold.co/600/800', alt: 'Placeholder', hint: 'placeholder' };
  }
  return { url: img.imageUrl, alt: img.description, hint: img.imageHint };
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'ethereal-trench-coat',
    name: 'Ethereal Trench Coat',
    description: 'A timeless silhouette reimagined with an iridescent, water-resistant fabric.',
    price: 450,
    category: 'women',
    images: [
      findImage('ethereal-trench-main'),
      findImage('ethereal-trench-side'),
    ],
  },
  {
    id: '2',
    slug: 'urban-nomad-jacket',
    name: 'Urban Nomad Jacket',
    description: 'A versatile jacket designed for the modern explorer.',
    price: 280,
    category: 'men',
    images: [findImage('urban-nomad-1')],
  },
  {
    id: '3',
    slug: 'silk-flow-blouse',
    name: 'Silk-Flow Blouse',
    description: 'A fluid blouse made from pure mulberry silk.',
    price: 190,
    category: 'women',
    images: [findImage('silk-blouse-1')],
  },
  {
    id: '4',
    slug: 'tailored-linen-trousers',
    name: 'Tailored Linen Trousers',
    description: 'Expertly tailored from fine Italian linen.',
    price: 220,
    category: 'men',
    images: [findImage('linen-trousers-1')],
  },
  {
    id: '5',
    slug: 'classic-leather-tote',
    name: 'Classic Leather Tote',
    description: 'A spacious and elegant tote bag crafted from genuine leather.',
    price: 320,
    category: 'bags',
    images: [findImage('leather-tote')],
  },
  {
    id: '6',
    slug: 'everyday-canvas-backpack',
    name: 'Everyday Canvas Backpack',
    description: 'A durable and stylish backpack for your daily adventures.',
    price: 150,
    category: 'bags',
    images: [findImage('canvas-backpack')],
  },
  {
    id: '7',
    slug: 'cozy-kids-hoodie',
    name: 'Cozy Kids Hoodie',
    description: 'A warm and comfortable hoodie for children.',
    price: 80,
    category: 'children',
    images: [findImage('kids-hoodie')],
  },
  {
    id: '8',
    slug: 'stylish-crossbody-bag',
    name: 'Stylish Crossbody Bag',
    description: 'A compact and chic crossbody bag for any occasion.',
    price: 180,
    category: 'bags',
    images: [findImage('stylish-crossbody-bag')],
  },
  {
    id: '9',
    slug: 'leather-duffle-bag',
    name: 'Leather Duffle Bag',
    description: 'A spacious and sophisticated leather duffle for weekend getaways.',
    price: 350,
    category: 'bags',
    images: [findImage('leather-duffle-bag')],
  },
  {
    id: '10',
    slug: 'minimalist-clutch',
    name: 'Minimalist Clutch',
    description: 'An elegant and minimalist clutch for evenings out.',
    price: 120,
    category: 'bags',
    images: [findImage('minimalist-clutch')],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: 'women' | 'men' | 'children' | 'bags'): Product[] => {
  return products.filter(p => p.category === category);
}
