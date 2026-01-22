import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shirt, Footprints, Crown } from "lucide-react";
import { collections, products } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import ProductCard from "@/components/product/product-card";

export default function Home() {
  const mainCollection = collections[0];
  const heroImage = PlaceHolderImages.find(p => p.id === 'collection-hero');

  const categories = [
    { name: "Hats", icon: Crown, href: "#" },
    { name: "T-Shirts", icon: Shirt, href: "#" },
    { name: "Trousers", icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 18H5.9a2 2 0 0 1-1.99-2.2l.2-2.4a2 2 0 0 1 2-1.8h11.2a2 2 0 0 1 2 1.8l.2 2.4a2 2 0 0 1-2 2.2h-1.82"/><path d="m6 18 1.1-10.4a2 2 0 0 1 2-1.95h5.8a2 2 0 0 1 2 1.95L18 18"/><path d="M12 2v2"/><path d="M12 11.5v-1.5"/></svg>, href: "#" },
    { name: "Shoes", icon: Footprints, href: "#" },
  ];

  const movingTiles = products.slice(0, 7).map(p => p.images[0]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" aria-hidden="true" />
        <div className="relative z-10 flex h-full items-end justify-center text-center md:items-center md:justify-start">
          <div className="container pb-20 md:pb-0">
            <div className="max-w-md rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none md:border-none">
              <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {mainCollection.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/90">
                {mainCollection.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/80">
                  <Link href="/women">
                    Shop Women <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                  <Link href="/men">
                    Shop Men
                  </Link>
                </Button>
                 <Button asChild variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                  <Link href="/unisex">
                    Shop Unisex
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Icon Navigation */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-2 justify-items-center gap-8 sm:grid-cols-4">
            {categories.map((category) => (
              <Link href={category.href} key={category.name} className="group flex flex-col items-center gap-3 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-secondary/70 backdrop-blur-sm border border-border/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:bg-accent/70">
                  <category.icon className="h-12 w-12 text-foreground/80" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Moving Display Tiles Section */}
      <section className="py-12 bg-secondary/30 w-full overflow-hidden">
        <div className="relative flex gap-8 whitespace-nowrap animate-marquee">
          {movingTiles.concat(movingTiles).map((tile, index) => (
            <div key={index} className="relative w-48 h-64 shrink-0 overflow-hidden rounded-lg shadow-md border border-border/20 backdrop-blur-sm bg-white/5">
                <Image
                  src={tile.url}
                  alt={tile.alt}
                  fill
                  className="object-cover"
                  sizes="20vw"
                  data-ai-hint={tile.hint}
                />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Products</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">Discover pieces that tell a story.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
