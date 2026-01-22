import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-8 flex items-center space-x-2">
            <span className="font-display text-2xl font-bold tracking-wide">eddjoys.ke</span>
          </Link>
          <nav className="hidden items-center space-x-8 text-sm font-medium md:flex">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
            <Link href="/women" className="text-foreground/80 hover:text-primary transition-colors">Women</Link>
            <Link href="/men" className="text-foreground/80 hover:text-primary transition-colors">Men</Link>
            <Link href="/unisex" className="text-foreground/80 hover:text-primary transition-colors">Unisex</Link>
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping Bag</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
