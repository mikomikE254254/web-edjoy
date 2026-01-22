"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check } from "lucide-react";

export default function AddToCartButton() {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      size="lg"
      className="w-full transition-all duration-300"
      onClick={handleClick}
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-5 w-5 animate-cart-add" />
          Added to Bag
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Bag
        </>
      )}
    </Button>
  );
}
