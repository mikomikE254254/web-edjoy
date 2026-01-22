
import Image from 'next/image';
import ProductCard from "@/components/product/product-card";
import { getProductsByCategory } from "@/lib/data";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function MenPage() {
  const menProducts = getProductsByCategory('men');
  const heroImage = PlaceHolderImages.find(p => p.id === 'men-editorial-hero');
  const thumb1 = PlaceHolderImages.find(p => p.id === 'men-editorial-thumb1');
  const thumb2 = PlaceHolderImages.find(p => p.id === 'men-editorial-thumb2');

  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="aspect-square relative rounded-2xl overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Featured</p>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mt-1">New arrivals and editor picks</h1>
          </div>
          <div className="flex gap-4">
            <div className="w-24 h-24 relative rounded-lg overflow-hidden shrink-0">
              {thumb1 && (
                <Image
                  src={thumb1.imageUrl}
                  alt={thumb1.description}
                  fill
                  className="object-cover"
                  data-ai-hint={thumb1.imageHint}
                  sizes="96px"
                />
              )}
            </div>
             <div className="w-24 h-24 relative rounded-lg overflow-hidden shrink-0 mt-4">
               {thumb2 && (
                <Image
                  src={thumb2.imageUrl}
                  alt={thumb2.description}
                  fill
                  className="object-cover"
                   data-ai-hint={thumb2.imageHint}
                   sizes="96px"
                />
              )}
            </div>
          </div>
          <p className="text-gray-600">
            Explore structured silhouettes and utility-driven designs. Carefully selected for smart fashion that endures.
          </p>
          <div className="flex items-center gap-4">
            <Button size="lg" className="rounded-full">Explore</Button>
            <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
              Scroll <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Men's Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {menProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
