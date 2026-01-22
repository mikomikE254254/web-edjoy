import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative text-left">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-secondary">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">View Product</span>
        </Link>
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          data-ai-hint={product.images[0].hint}
        />
        <Button variant="secondary" size="icon" className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70">
          <Heart className="h-4 w-4"/>
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <h3 className="font-semibold tracking-tight text-foreground">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
      
        <div className="mt-2 flex items-center gap-2">
           <Select defaultValue="m">
            <SelectTrigger className="w-[80px] h-9">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xs">XS</SelectItem>
              <SelectItem value="s">S</SelectItem>
              <SelectItem value="m">M</SelectItem>
              <SelectItem value="l">L</SelectItem>
              <SelectItem value="xl">XL</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex-1 h-9">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Buy on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
