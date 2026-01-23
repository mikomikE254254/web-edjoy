'use client';

import { getProductBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductPurchaseForm from '@/components/product/product-purchase-form';
import ProductReviews from '@/components/product/product-reviews';
import { useState, use, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

type ImageType = Product['images'][0];

export default function ProductPage({ params }: { params: { slug:string } }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [primaryImage, setPrimaryImage] = useState<ImageType | undefined>(
    product?.images[0]
  );
  const [isImageFading, setIsImageFading] = useState(false);
  const [selectedColorHex, setSelectedColorHex] = useState<string | undefined>(
    product?.availableColors?.[0]?.hex
  );

  useEffect(() => {
    if (product && product.availableColors && selectedColorHex) {
      const selectedColorName = product.availableColors.find(c => c.hex === selectedColorHex)?.name;
      const newImage = product.images.find(img => img.colorName === selectedColorName);
      
      if (newImage && newImage.url !== primaryImage?.url) {
        setIsImageFading(true);
        setTimeout(() => {
          setPrimaryImage(newImage);
          setIsImageFading(false);
        }, 1500);
      } else if (!newImage && product.images[0] && primaryImage?.url !== product.images[0].url) {
        setIsImageFading(true);
        setTimeout(() => {
          setPrimaryImage(product.images[0]);
          setIsImageFading(false);
        }, 1500);
      }
    } else if (product && !primaryImage && product.images[0]) {
      setPrimaryImage(product.images[0]);
    }
  }, [selectedColorHex, product, primaryImage]);

  const handleThumbnailClick = (image: ImageType) => {
    if (primaryImage?.url === image.url) return;
    
    setIsImageFading(true);
    setTimeout(() => {
        setPrimaryImage(image);
        if (image.colorName && product?.availableColors) {
          const newColor = product.availableColors.find(c => c.name === image.colorName);
          if (newColor && newColor.hex !== selectedColorHex) {
            setSelectedColorHex(newColor.hex);
          }
        }
        setIsImageFading(false);
    }, 1500);
  };
  
  if (!product) {
    notFound();
  }
  
  const thumbnailSlots: (ImageType | null)[] = new Array(4).fill(null);
  if (product && product.images) {
    const uniqueImages = product.images.reduce((acc, current) => {
      if (!acc.find(item => item.url === current.url)) {
        acc.push(current);
      }
      return acc;
    }, [] as ImageType[]);

    uniqueImages.slice(0, 4).forEach((image, index) => {
      thumbnailSlots[index] = image;
    });
  }

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
                className={cn(
                  "object-cover transition-opacity ease-in-out duration-[1500ms]",
                  isImageFading ? "opacity-0" : "opacity-100"
                )}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                data-ai-hint={primaryImage.hint}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-muted-foreground">No Image</div>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {thumbnailSlots.map((image, index) =>
              image ? (
                <div
                  key={index}
                  className={cn(
                    'aspect-square relative rounded-lg bg-black overflow-hidden cursor-pointer transition-all',
                    primaryImage?.url === image.url
                      ? 'ring-2 ring-primary ring-offset-2'
                      : 'hover:opacity-75'
                  )}
                  onClick={() => handleThumbnailClick(image)}
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
              ) : (
                <div
                  key={`placeholder-${index}`}
                  className="aspect-square rounded-lg bg-gray-100 border-2 border-dashed border-gray-300"
                />
              )
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-transparent lg:bg-gray-50/50 p-0 lg:p-2 rounded-2xl mt-6 lg:mt-0">
          <ProductPurchaseForm 
            product={product} 
            selectedColor={selectedColorHex} 
            setSelectedColor={setSelectedColorHex}
          />
        </div>
      </div>

      {/* Reviews */}
      <div className="pt-12 border-t">
        <ProductReviews />
      </div>
    </div>
  );
}
