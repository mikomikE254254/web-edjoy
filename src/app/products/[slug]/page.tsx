import { getProductBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductPurchaseForm from '@/components/product/product-purchase-form';
import ProductReviews from '@/components/product/product-reviews';

export default async function ProductPage({ params }: { params: Promise<{ slug:string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const primaryImage = product.images[0] ?? {
    url: 'https://placehold.co/600x800',
    alt: 'Placeholder image',
    hint: 'placeholder',
  };

  const thumbnailImages = product.images.slice(0, 4); // Show up to 4 thumbnails

  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Image Gallery */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="aspect-square relative rounded-2xl bg-gray-100 overflow-hidden shadow-lg">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            data-ai-hint={primaryImage.hint}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          {thumbnailImages.slice(1,5).map((image, index) => (
             <div key={index} className="aspect-square relative rounded-2xl bg-gray-100 overflow-hidden shadow-lg">
                <Image 
                  src={image.url} 
                  alt={image.alt} 
                  fill className="object-cover" 
                  sizes="25vw"
                  data-ai-hint={image.hint}
                />
              </div>
          ))}
        </div>
      </div>

      {/* Info & Reviews */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="bg-gray-50/50 p-2 rounded-2xl">
          <ProductPurchaseForm product={product} />
        </div>
        <div className="bg-gray-50/50 p-2 rounded-2xl">
          <ProductReviews />
        </div>
      </div>
    </div>
  );
}
