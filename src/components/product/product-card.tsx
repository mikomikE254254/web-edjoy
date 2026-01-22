import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images[0] ?? {
    url: 'https://placehold.co/600x800',
    alt: 'Placeholder image',
    hint: 'placeholder',
  };
  
  // Create a mock old price for display
  const oldPrice = product.price * 1.2;

  return (
    <div className="relative w-full rounded-[22px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden group">
      
      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 text-white z-20 flex items-center justify-center text-xl hover:bg-red-600 transition-colors">
        ❤
      </button>

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block aspect-[3/4] w-full">
        <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={primaryImage.hint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-lg rounded-[18px] p-4 z-10">
        <h3 className="text-sm font-semibold text-black truncate">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <div className="flex gap-2 text-sm mt-1">
          <span className="font-bold text-black">${product.price.toFixed(2)}</span>
          {/* Mock old price */}
          <span className="line-through text-gray-400">${oldPrice.toFixed(2)}</span>
        </div>

        {/* Cart Button */}
        <button className="absolute right-4 bottom-4 w-11 h-11 rounded-full bg-black text-white z-20 flex items-center justify-center text-xl hover:bg-gray-800 transition-colors">
          🛍️
        </button>
      </div>
    </div>
  );
}
