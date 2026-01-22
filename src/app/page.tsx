import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import CollectionMarquee from '@/components/home/collection-marquee';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'nextgen-hero');
  const categories = [
    { name: 'Shoes', imageId: 'cat-shoes' },
    { name: 'Brush', imageId: 'cat-brush' },
    { name: 'Bag', imageId: 'cat-bag' },
    { name: 'T-shirt', imageId: 'cat-tshirt' }
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <section className="relative rounded-2xl overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              width={1280}
              height={384}
              className="w-full h-auto md:h-96 object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute left-8 top-8 text-white drop-shadow-lg max-w-md">
            <h1 className="text-4xl font-extrabold">Summer Arrival of Outfit</h1>
            <p className="mt-2 text-lg">
              Discover quality fashion that reflects your style and makes everyday enjoyable.
            </p>
            <Button asChild className="mt-4 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200">
              <Link href="/products/ethereal-trench-coat">Explore Product</Link>
            </Button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-beige p-6 rounded-xl flex items-center justify-between font-medium">
            Where dreams meet couture
            <Button asChild className="bg-white text-black rounded-full hover:bg-gray-200">
                <Link href="#">Shop Now</Link>
            </Button>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl flex items-center justify-between font-medium">
            Enchanting styles for every woman
            <Button asChild className="bg-white text-black rounded-full hover:bg-gray-200">
                <Link href="#">Shop Now</Link>
            </Button>
          </div>
        </div>

        <h2 className="mt-8 mb-4 text-xl font-semibold">Browse by categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((c) => {
            const catImage = PlaceHolderImages.find(p => p.id === c.imageId);
            return (
              <div key={c.name} className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="h-28 bg-gray-200 rounded-md mb-2 relative overflow-hidden">
                  {catImage && (
                     <Image
                        src={catImage.imageUrl}
                        alt={catImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={catImage.imageHint}
                      />
                  )}
                </div>
                <div className="font-medium">{c.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <CollectionMarquee />
    </>
  );
}
