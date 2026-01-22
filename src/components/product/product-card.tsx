'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Heart, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images[0] ?? {
    url: 'https://placehold.co/600x800',
    alt: 'Placeholder image',
    hint: 'placeholder',
  };
  
  const oldPrice = product.price * 1.2;

  return (
    <div className="w-full rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden group transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block cursor-pointer">
        <div className="relative">
          {/* Category Tag */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800 z-10">
            Casual
          </div>

          {/* Image with Gradient Fade */}
          <div className="aspect-[3/4] w-full relative">
            <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                fill
                className="w-full h-full object-cover"
                data-ai-hint={primaryImage.hint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* The gradient mask effect */}
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Info Panel below the image */}
        <div className="p-4 pt-0 bg-white relative -mt-6">
          <h3 className="text-base font-medium text-black truncate mb-2">
            {product.name}
          </h3>
          <div className="flex justify-between items-end">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-black">${product.price.toFixed(2)}</span>
              <span className="line-through text-sm text-gray-400">${oldPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" onClick={(e) => { e.preventDefault(); console.log('Add to wishlist'); }}>
                <Heart size={18} className="text-gray-700" />
              </button>
              <button className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors" onClick={(e) => { e.preventDefault(); console.log('Add to cart'); }}>
                <ShoppingBag size={18} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
