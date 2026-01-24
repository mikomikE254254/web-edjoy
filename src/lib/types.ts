export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  isFeatured?: boolean;
  category: string;
  style?: string;
  images: {
    url: string;
    alt: string;
    hint: string;
    colorName?: string;
  }[];
  availableColors?: {
    name: string;
    hex: string;
  }[];
  sizes?: string[];
};
