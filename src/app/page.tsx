import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import CategoryIcons from '@/components/layout/category-icons';
import ProductCard from '@/components/product/product-card';
import { products } from '@/lib/data';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'nextgen-hero');
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] max-h-[700px] bg-secondary/30">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative container max-w-7xl mx-auto h-full flex flex-col justify-end pb-16 sm:pb-24 text-white">
          <div className="max-w-xl p-8 rounded-lg bg-black/20 backdrop-blur-md border border-white/10">
            <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight tracking-tight">
              Sophisticated Styles, Redefined.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-white/90">
              Discover calm and confident fashion from Kenya. Premium apparel that reflects your unique elegance.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8">
                <Link href="/women">Shop Women</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 rounded-full px-8">
                <Link href="/men">Shop Men</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Icons */}
      <CategoryIcons />
      
      {/* Featured Products */}
      <section className="py-12 sm:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center">Featured Products</h2>
            <p className="mt-2 text-lg text-muted-foreground text-center">Handpicked styles, just for you.</p>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
