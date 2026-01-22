export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  collection: string;
  category: 'women' | 'men' | 'unisex';
  images: {
    id: string;
    url: string;
    alt: string;
    hint: string;
  }[];
  fabricDetails: {
    id: string;
    url: string;
    alt: string;
    hint: string;
  }[];
  glbUrl: string;
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  heroImage: {
    id: string;
    url: string;
    alt: string;
    hint: string;
  };
};
