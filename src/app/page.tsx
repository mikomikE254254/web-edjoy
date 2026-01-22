import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shirt, Footprints, Crown, Drama } from "lucide-react";
import { collections } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const mainCollection = collections[0];
  const heroImage = PlaceHolderImages.find(p => p.id === 'collection-hero');

  const categories = [
    { name: "Hats", icon: Crown, href: "#" },
    { name: "T-Shirts", icon: Shirt, href: "#" },
    { name: "Trousers", icon: Drama, href: "#" }, // Using Drama as a visual placeholder
    { name: "Shoes", icon: Footprints, href: "#" },
  ];

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" aria-hidden="true" />
        <div className="relative z-10 flex h-full items-end justify-center text-center md:items-center md:justify-start">
          <div className="container pb-20 md:pb-0">
            <div className="max-w-md rounded-xl bg-black/25 p-6 backdrop-blur-md border border-white/10 md:bg-transparent md:p-0 md:backdrop-blur-none md:border-none">
              <h1 className="text-5xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
                {mainCollection.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/90">
                {mainCollection.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-white text-black hover:bg-neutral-200">
                  <Link href="/women">
                    Shop Women <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/men">
                    Shop Men
                  </Link>
                </Button>
                 <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
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
          <p className="text-center text-sm text-muted-foreground mt-8 px-4">Note: Placeholder icons from the library are used for categories where direct matches were unavailable.</p>
        </div>
      </section>
    </>
  );
}
