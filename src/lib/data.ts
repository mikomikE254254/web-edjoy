import type { Product, Collection } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  if (!img) {
    return { id: 'not-found', url: 'https://picsum.photos/seed/notfound/600/800', alt: 'Placeholder', hint: 'placeholder' };
  }
  return { id: img.id, url: img.imageUrl, alt: img.description, hint: img.imageHint };
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'ethereal-trench-coat',
    name: 'Ethereal Trench Coat',
    description: 'A timeless silhouette reimagined with an iridescent, water-resistant fabric. This statement piece catches light and attention, shifting in color with every movement. Featuring classic storm flaps, a belted waist, and sharp tailoring for a modern edge.',
    price: 450,
    collection: 'aw24',
    category: 'women',
    images: [
      findImage('ethereal-trench-main'),
      findImage('ethereal-trench-side'),
      findImage('ethereal-trench-back'),
    ],
    fabricDetails: [
      findImage('fabric-detail-1'),
      findImage('fabric-detail-2'),
      findImage('fabric-detail-3'),
    ],
    glbUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-BINARY/DamagedHelmet.glb',
  },
  {
    id: '2',
    slug: 'urban-nomad-jacket',
    name: 'Urban Nomad Jacket',
    description: 'A versatile jacket designed for the modern explorer. Crafted from a durable, yet lightweight material, it offers protection against the elements without sacrificing style. Features multiple pockets and an adjustable hood.',
    price: 280,
    collection: 'aw24',
    category: 'men',
    images: [findImage('urban-nomad-1'), findImage('urban-nomad-2')],
    fabricDetails: [findImage('fabric-detail-1'), findImage('fabric-detail-2')],
    glbUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-BINARY/DamagedHelmet.glb',
  },
  {
    id: '3',
    slug: 'silk-flow-blouse',
    name: 'Silk-Flow Blouse',
    description: 'A fluid blouse made from pure mulberry silk. Its relaxed fit and elegant drape make it a perfect piece for both office and evening wear. The hidden placket and mother-of-pearl buttons add a touch of luxury.',
    price: 190,
    collection: 'aw24',
    category: 'women',
    images: [findImage('silk-blouse-1'), findImage('silk-blouse-2')],
    fabricDetails: [findImage('fabric-detail-1'), findImage('fabric-detail-2')],
    glbUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-BINARY/DamagedHelmet.glb',
  },
  {
    id: '4',
    slug: 'tailored-linen-trousers',
    name: 'Tailored Linen Trousers',
    description: 'Expertly tailored from fine Italian linen, these trousers offer a sharp yet breathable option for warmer days. The straight-leg cut and precise pleats create a flattering silhouette.',
    price: 220,
    collection: 'aw24',
    category: 'unisex',
    images: [findImage('linen-trousers-1'), findImage('linen-trousers-2')],
    fabricDetails: [findImage('fabric-detail-1'), findImage('fabric-detail-2')],
    glbUrl: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-BINARY/DamagedHelmet.glb',
  },
];

export const collections: Collection[] = [
    {
        id: '1',
        slug: 'aw24',
        name: 'Autumn/Winter \'24',
        description: 'A collection inspired by the interplay of light and shadow in urban landscapes. Structured forms meet fluid materials, creating a wardrobe that is both protective and expressive.',
        heroImage: findImage('collection-hero'),
    }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: 'women' | 'men' | 'unisex'): Product[] => {
  return products.filter(p => p.category === category);
}
