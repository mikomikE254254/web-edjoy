import Link from "next/link";
import { Heart, Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg tracking-wide">eddjoys.ke</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
            <Link href="/women" className="transition-colors hover:text-foreground/80 text-foreground/60">Women</Link>
            <Link href="/men" className="transition-colors hover:text-foreground/80 text-foreground/60">Men</Link>
            <Link href="/unisex" className="transition-colors hover:text-foreground/80 text-foreground/60">Unisex</Link>
          </nav>
        </div>
        
        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <Link href="/" className="ml-4">
              <span className="font-bold text-lg tracking-wide">eddjoys.ke</span>
            </Link>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5 text-foreground/70" />
              <span className="sr-only">Wishlist</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5 text-foreground/70" />
              <span className="sr-only">Cart</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
