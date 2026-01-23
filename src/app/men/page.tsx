'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import ProductCard from "@/components/product/product-card";
import { getProductsByCategory } from "@/lib/data";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CategoryTabs from '@/components/product/category-tabs';

export default function MenPage() {
  const [activeTab, setActiveTab] = useState("All");
  const menProducts = getProductsByCategory('men');
  const heroImage = PlaceHolderImages.find(p => p.id === 'men-editorial-hero');

  const filteredProducts = useMemo(() => {
    if (activeTab === "All") {
      return menProducts;
    }
    return menProducts.filter(p => p.style && p.style.toLowerCase() === activeTab.toLowerCase());
  }, [activeTab, menProducts]);

  return (
    <div className="space-y-6">
      <section className="relative rounded-2xl overflow-hidden h-96 flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 flex flex-col gap-6 items-center text-white p-8">
            <div className="opacity-0 animate-float-in">
                <p className="text-sm font-medium text-gray-300">Featured</p>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight mt-1">New arrivals and editor picks</h1>
            </div>
            <p className="text-gray-200 opacity-0 animate-float-in [animation-delay:150ms] max-w-2xl">
                Explore structured silhouettes and utility-driven designs. Carefully selected for smart fashion that endures.
            </p>
            <div className="flex items-center gap-4 opacity-0 animate-float-in [animation-delay:300ms]">
                <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200">Explore</Button>
                <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
                    Scroll <ArrowRight size={16} />
                </Button>
            </div>
        </div>
      </section>

      <div className="border-t pt-6">
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}
