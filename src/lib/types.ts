export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: 'women' | 'men' | 'children' | 'bags';
  images: {
    url: string;
    alt: string;
    hint: string;
  }[];
};
