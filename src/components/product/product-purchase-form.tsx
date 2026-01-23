'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart, Minus, Plus, Star } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

// Mock data
const colors = ['#111827', '#f9fafb', '#4b5563', '#9ca3af'];
const sizes = ['S', 'M', 'L', 'XL'];
const availableSizes = ['S', 'M', 'L'];

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 .2c54.9 0 105.8 21.2 144.2 59.5 38.2 38.3 59.5 89.4 59.5 144.2 0 112.2-91.5 203.7-203.7 203.7-35.1 0-69.2-9-98.7-25.9l-7.1-4.2-73.3 19.3 19.7-71.5-4.5-7.4c-18.4-30.6-28.2-66.2-28.2-103.5 0-112.2 91.5-203.7 203.7-203.7zM223.9 150.1c-12.2 0-22.1 9.9-22.1 22.1v.1c0 12.2 9.9 22.1 22.1 22.1 6.1 0 11.6-2.5 15.6-6.5 3.9-3.9 6.5-9.4 6.5-15.6-.1-12.2-10-22.1-22.1-22.1zm53.8 141.2c-4.4-2.2-26.2-12.9-30.3-14.4-4.1-1.5-7.1-2.2-10.1 2.2s-11.4 14.4-14 17.3c-2.6 3-5.2 3.3-9.6 1.1-4.4-2.2-18.6-6.9-35.4-21.8-13-11.7-21.8-26.2-24.4-30.6-2.6-4.4-.3-6.9 1.9-9.1 2-2 4.4-5.2 6.6-7.8 2.2-2.6 3-4.4 1.5-7.4-1.5-3-10.1-24.3-13.8-33.3-3.7-8.9-7.5-7.7-10.1-7.8h-9.1c-2.6 0-7.1.3-10.9 4.4-3.8 4.1-14.6 14.3-14.6 34.9 0 20.6 15 40.5 17.1 43.5 2.1 3 29.5 44.9 71.9 62.8 10.4 4.4 18.5 7.1 24.8 9.1 6.3 2 12.1 1.7 16.7.7 5.2-.9 26.2-10.7 29.9-21.1 3.7-10.4 3.7-19.3 2.6-21.1-1.1-1.9-4.1-3-8.5-5.2z" />
    </svg>
  );

export default function ProductPurchaseForm({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isProductInWishlist } = useAppContext();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const isInWishlist = isProductInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
  };
  
  const handleBuyViaWhatsApp = () => {
    const message = `Hi Eddjoys, I would like to order the ${product.name} in Size ${selectedSize}. Price: $${(product.price * quantity).toFixed(2)}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254740685488?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };


  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
      <div>
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <Button variant="ghost" size="icon" className={cn("text-gray-500 hover:bg-red-50 rounded-full", isInWishlist ? "text-red-500" : "hover:text-red-500")} onClick={handleToggleWishlist}>
            <Heart className={cn("w-6 h-6", isInWishlist && "fill-current")} />
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
        <div className="grid grid-cols-1 gap-2">
            <Button size="lg" className="w-full rounded-full h-12 text-base font-bold" onClick={handleAddToCart}>Add to Cart</Button>
            <Button size="lg" className="w-full rounded-full h-12 text-base font-bold bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={handleBuyViaWhatsApp}>
                <WhatsAppIcon />
                Buy via WhatsApp
            </Button>
        </div>
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
