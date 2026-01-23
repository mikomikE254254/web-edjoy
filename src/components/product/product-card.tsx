'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Heart } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isProductInWishlist } = useAppContext();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    <div 
      ref={cardRef}
      className="minimal-glow-card relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 bg-gray-100"
      style={{ '--glow-card-radius': '1rem' } as React.CSSProperties}
    >
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={product.name}/>
      <div className="aspect-[3/4]">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={primaryImage.hint}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div 
        className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md rounded-xl p-2 flex items-center justify-between border-2 border-white"
      >
        <div>
          <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
          <p className="text-lg font-extrabold text-gray-900">Ksh {product.price.toFixed(2)}</p>
        </div>
        <Button 
          size="lg"
          className="z-20 rounded-full"
          onClick={handleAddToCartClick}
        >
          Add to Cart
        </Button>
      </div>
       <button
            onClick={handleWishlistClick}
            className={cn(
              "absolute top-4 right-4 z-20 bg-black/20 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors hover:bg-black/40 hover:scale-110 flex-shrink-0",
              isInWishlist && "bg-red-500 text-white"
            )}
          >
            <Heart size={16} className={cn(isInWishlist && "fill-current")}/>
          </button>
      
       {product.style && 
        <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-md border-white/90 text-black text-xs font-semibold px-3 py-1 rounded-full">{product.style.charAt(0).toUpperCase() + product.style.slice(1)}</div>
      }
    </div>
  );
}
