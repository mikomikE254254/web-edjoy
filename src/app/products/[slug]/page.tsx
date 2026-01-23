'use client';

import { getProductBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductPurchaseForm from '@/components/product/product-purchase-form';
import ProductReviews from '@/components/product/product-reviews';
import { useState, use } from 'react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

type ImageType = Product['images'][0];

export default function ProductPage({ params }: { params: { slug:string } }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [primaryImage, setPrimaryImage] = useState<ImageType | undefined>(
    product?.images[0]
  );

  if (!product) {
    notFound();
  }
  
  const thumbnailImages = product.images.slice(0, 5);

  return (
    <div className="py-2 md:py-8 lg:py-12 space-y-12">
      <div className="grid lg:grid-cols-2 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4 lg:sticky lg:top-24">
          <div className="aspect-square relative rounded-2xl bg-gray-100 overflow-hidden shadow-lg">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                data-ai-hint={primaryImage.hint}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-muted-foreground">No Image</div>
            )}
          </div>
          {thumbnailImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {thumbnailImages.map((image, index) => (
                 <div 
                  key={index} 
                  className={cn(
                    "aspect-square relative rounded-lg bg-gray-100 overflow-hidden cursor-pointer transition-all",
                    primaryImage?.url === image.url ? "ring-2 ring-primary ring-offset-2" : "hover:opacity-75"
                  )}
                  onClick={() => setPrimaryImage(image)}
                >
                  <Image 
                    src={image.url} 
                    alt={image.alt} 
                    fill 
                    className="object-cover" 
                    sizes="20vw"
                    data-ai-hint={image.hint}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="bg-transparent lg:bg-gray-50/50 p-0 lg:p-2 rounded-2xl mt-6 lg:mt-0">
          <ProductPurchaseForm product={product} />
        </div>
      </div>

      {/* Reviews */}
      <div className="pt-12 border-t">
        <ProductReviews />
      </div>
    </div>
  );
}
