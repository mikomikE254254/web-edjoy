import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections, products } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredProduct = products[0];
  const mainCollection = collections[0];
  const heroImage = PlaceHolderImages.find(p => p.id === 'collection-hero');

  return (
    <div className="container py-12 md:py-20">
      <section className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
        <div className="absolute -left-1/4 top-1/2 -z-10 h-2/3 w-2/3 -translate-y-1/2 rounded-full bg-accent/50 blur-3xl" aria-hidden="true" />
        
        <div className="order-2 md:order-1">
          <h1 className="font-headline text-5xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
            {mainCollection.name}: {featuredProduct.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {mainCollection.description}
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link href={`/products/${featuredProduct.slug}`}>
                Explore the Piece <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#">
                Shop the Collection
              </Link>
            </Button>
          </div>
        </div>

        <div className="order-1 md:order-2">
          {heroImage && (
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
