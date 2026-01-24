import type { Timestamp } from 'firebase/firestore';

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

export type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
};
