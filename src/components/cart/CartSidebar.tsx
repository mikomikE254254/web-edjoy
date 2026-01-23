'use client';

import * as React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart } = useAppContext();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    {cartCount}
                </span>
            )}
            <span className="sr-only">Open shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        {cart.length > 0 ? (
          <>
            <div className="flex-grow overflow-y-auto -mx-6 px-6 divide-y">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden">
                    <Image
                      src={item.images[0]?.url || ''}
                      alt={item.images[0]?.alt || item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-grow">
                    <Link href={`/products/${item.slug}`} className="font-semibold hover:underline" onClick={() => setOpen(false)}>{item.name}</Link>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeFromCart(item.id)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
            <SheetFooter className="mt-auto border-t pt-4 space-y-4">
                <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg">Checkout</Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="mt-4 font-semibold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add some products to get started.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
