import { getProductBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/components/product/add-to-cart-button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square w-full relative rounded-lg bg-gray-100 shadow-sm overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    data-ai-hint={image.hint}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>


        <div className="flex flex-col pt-8">
          <h1 className="text-4xl font-bold lg:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-gray-800">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-base leading-relaxed text-gray-600">{product.description}</p>
          
          <div className="mt-8">
            <AddToCartButton />
          </div>

          <div className="mt-12 w-full text-sm text-gray-500">
             <p>Free standard shipping on all orders. Express shipping available. We accept returns within 30 days of delivery. The item must be in its original condition, with all tags attached.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
