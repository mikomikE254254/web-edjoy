import Image from 'next/image';
import ProductCard from '@/components/product/product-card';
import { products } from '@/lib/data';
import CollectionMarquee from '@/components/home/collection-marquee';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'nextgen-hero');
  const categoryImages = {
    'Shoes': PlaceHolderImages.find(p => p.id === 'cat-shoes'),
    'Brush': PlaceHolderImages.find(p => p.id === 'cat-brush'),
    'Bag': PlaceHolderImages.find(p => p.id === 'cat-bag'),
    'T-shirt': PlaceHolderImages.find(p => p.id === 'cat-tshirt'),
  };

  return (
    <>
      <section className="relative rounded-2xl overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="hero"
            width={1200}
            height={384}
            className="w-full h-96 object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute left-8 top-8 text-white drop-shadow-lg">
          <h1 className="text-4xl font-extrabold">Summer Arrival of Outfit</h1>
          <p className="mt-2 max-w-md">Discover quality fashion that reflects your style and makes everyday enjoyable.</p>
          <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold">Explore Product</button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-beige p-6 rounded-xl flex items-center justify-between">
          <span className="font-medium">Where dreams meet couture</span>
          <button className="bg-white/50 text-black px-4 py-2 rounded-full text-sm font-semibold">Shop Now</button>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl flex items-center justify-between">
          <span className="font-medium">Enchanting styles for every woman</span>
          <button className="bg-white/50 text-black px-4 py-2 rounded-full text-sm font-semibold">Shop Now</button>
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold">Browse by categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(categoryImages).map(([c, img]) => (
          <div key={c} className="bg-white p-4 rounded-lg shadow-sm text-center">
            {img ? (
              <Image
                src={img.imageUrl}
                alt={c}
                width={160}
                height={112}
                className="h-28 w-full object-cover rounded-md mb-2"
                data-ai-hint={img.imageHint}
              />
            ) : (
              <div className="h-28 bg-gray-200 rounded-md mb-2" />
            )}
            <div className="font-medium">{c}</div>
          </div>
        ))}
      </div>

      <CollectionMarquee />

      <h2 className="mt-8 mb-4 text-xl font-semibold">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
