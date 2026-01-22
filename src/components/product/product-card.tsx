'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Heart, ShoppingBag, Dot } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images[0] ?? {
    url: 'https://placehold.co/600x800',
    alt: 'Placeholder image',
    hint: 'placeholder',
  };
  
  const oldPrice = product.price * 1.2;

  return (
    <div className="relative group overflow-hidden rounded-[24px] shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 bg-white">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="aspect-[3/4] w-full relative">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="w-full h-full object-cover"
            data-ai-hint={primaryImage.hint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Category Badge (Top-left) */}
        <div className="absolute top-4 left-4 bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <Dot className="w-3 h-3 -ml-1 text-gray-500" />
          <span>Casual</span>
        </div>

        {/* Wishlist Icon (Top-right) */}
        <button
          onClick={(e) => { e.preventDefault(); console.log('Add to wishlist'); }}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform hover:scale-110"
        >
          <Heart size={16} fill="white" />
        </button>

        {/* Glassmorphism Info Panel */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/60 backdrop-blur-md rounded-xl p-3 flex items-center justify-between">
          <div className="flex-1 truncate">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="font-bold text-base text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-xs text-red-500 line-through">${oldPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); console.log('Add to cart'); }}
            className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 ml-3 transition-transform hover:scale-110"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </Link>
    </div>
  );
}
