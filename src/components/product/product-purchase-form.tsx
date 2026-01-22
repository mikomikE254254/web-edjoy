'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, Star } from 'lucide-react';

// Mock data
const colors = ['#111827', '#f9fafb', '#4b5563', '#9ca3af'];
const sizes = ['S', 'M', 'L', 'XL'];
const availableSizes = ['S', 'M', 'L'];

export default function ProductPurchaseForm({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
      <div>
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full">
            <Heart className="w-6 h-6" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2 cursor-pointer">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-gray-500 hover:underline">(41 Reviews)</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>
        <div className="flex items-center gap-3 mt-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-gray-200'}`}
              style={{ backgroundColor: color }}
            >
              <span className="sr-only">{color}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Size</h3>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {sizes.map((size) => {
              const isAvailable = availableSizes.includes(size);
              return (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'default' : 'outline'}
                  disabled={!isAvailable}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full px-4 py-2 ${!isAvailable ? 'text-gray-400 line-through' : ''}`}
                >
                  {size}
                </Button>
              );
            })}
          </div>
        </div>
        <a href="#" className="text-sm text-primary hover:underline">Size Guide</a>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center border rounded-full">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-10 text-center font-semibold">{quantity}</span>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQuantity(q => q + 1)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6 space-y-4">
        <div className="flex justify-between items-center">
            <span className="text-lg text-gray-500">Total Price</span>
            <p className="text-3xl font-bold">${(product.price * quantity).toFixed(2)}</p>
        </div>
        <Button size="lg" className="w-full rounded-full h-12 text-base font-bold">Add to Cart</Button>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900">Description</h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}
