import type { Product, Collection } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  if (!img) {
    return { id: 'not-found', url: 'https://placehold.co/600x400', alt: 'Placeholder', hint: 'placeholder' };
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
