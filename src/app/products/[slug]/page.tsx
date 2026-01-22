import { getProductBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const primaryImage = product.images[0] ?? {
    url: 'https://placehold.co/600x800',
    alt: 'Placeholder image'
  };

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square relative rounded-lg bg-gray-100">
             <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                fill
                className="object-cover rounded-lg"
              />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl mt-4">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-gray-600">{product.description}</p>
          <button className="mt-8 bg-black text-white px-8 py-3 rounded-full font-semibold">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
