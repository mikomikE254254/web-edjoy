'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Heart, Dot } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isProductInWishlist } = useAppContext();

  const primaryImage = product.images[0] ?? {
    url: 'https://placehold.co/600x800',
    alt: 'Placeholder image',
    hint: 'placeholder',
  };
  
  const isInWishlist = isProductInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  }

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 pastel-gradient-dots">
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0" aria-label={product.name}/>
      <div className="relative z-10 flex flex-col p-4 aspect-[3/4]">
        
        {/* Top Row: Category & Wishlist */}
        <div className="flex justify-between items-center flex-shrink-0">
          <div className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Dot className="w-3 h-3 -ml-1" />
            <span>{product.style ? product.style.charAt(0).toUpperCase() + product.style.slice(1) : 'Casual'}</span>
          </div>
          <button
            onClick={handleWishlistClick}
            className={cn(
              "bg-black/20 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors hover:bg-black/40 hover:scale-110 flex-shrink-0",
              isInWishlist && "bg-red-500 text-white"
            )}
          >
            <Heart size={16} className={cn(isInWishlist && "fill-current")}/>
          </button>
        </div>

        {/* Image */}
        <div className="relative flex-grow flex items-center justify-center my-2">
            <div className="relative w-full h-full">
                <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt}
                    fill
                    className="w-full h-full object-contain drop-shadow-lg"
                    data-ai-hint={primaryImage.hint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        </div>

        {/* Bottom Content */}
        <div className="flex-shrink-0">
          <h3 className="font-bold text-white truncate text-lg">{product.name}</h3>
          <p className="text-sm text-white/80 mt-1 line-clamp-2 h-10">{product.description}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xl font-bold text-white">Ksh {product.price.toFixed(2)}</p>
          </div>
          <button
            onClick={handleAddToCartClick}
            className="w-full mt-3 rounded-full bg-white text-black py-2.5 text-sm font-bold transition-all hover:scale-105 active:scale-100"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
