
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/product/product-card';
import { products } from '@/lib/data';
import CollectionMarquee from '@/components/home/collection-marquee';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import EditorialHighlight from '@/components/home/editorial-highlight';
import { homepageCategories } from '@/lib/homepage-data';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'nextgen-hero');
  const categories = homepageCategories;
  const promoImage1 = PlaceHolderImages.find(p => p.id === 'cat-bag');
  const promoImage2 = PlaceHolderImages.find(p => p.id === 'ethereal-trench-side');

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
          <Link href="/men">
            <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-semibold">Explore Product</button>
          </Link>
        </div>
        <div className="absolute bottom-8 right-8 text-white drop-shadow-lg text-right max-w-xs text-sm hidden md:block">
          <p>
            Discover curated fashion that blends timeless elegance with modern simplicity.
            Each piece is thoughtfully designed to empower your personal style.
            Experience quality craftsmanship and sustainable materials in every collection.
            Join us in celebrating the art of everyday dressing.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Link href="/women" className="relative rounded-xl overflow-hidden group h-full min-h-[140px]">
          {promoImage1 && (
            <Image
              src={promoImage1.imageUrl}
              alt={promoImage1.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={promoImage1.imageHint}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent p-6 flex items-center">
            <div>
              <h3 className="text-white font-medium text-lg">Where dreams meet couture</h3>
              <button className="mt-2 bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold w-fit backdrop-blur-sm">Shop Now</button>
            </div>
          </div>
        </Link>
        <Link href="/men" className="relative rounded-xl overflow-hidden group h-full min-h-[140px]">
          {promoImage2 && (
            <Image
              src={promoImage2.imageUrl}
              alt={promoImage2.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={promoImage2.imageHint}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent p-6 flex items-center">
            <div>
              <h3 className="text-white font-medium text-lg">Enchanting styles for every woman</h3>
              <button className="mt-2 bg-white/90 text-black px-4 py-2 rounded-full text-sm font-semibold w-fit backdrop-blur-sm">Shop Now</button>
            </div>
          </div>
        </Link>
      </div>

      <h2 className="mt-8 mb-4 text-xl font-semibold">Browse by categories</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {categories.map((category) => {
            const img = PlaceHolderImages.find(p => p.id === category.imageId);
            return (
              <Link key={category.name} href={category.href}>
                <div className="relative shrink-0 w-48 aspect-[3/2] rounded-2xl overflow-hidden group cursor-pointer">
                  {img ? (
                    <Image
                      src={img.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                      data-ai-hint={img.imageHint}
                      sizes="200px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  <span className="absolute bottom-2.5 left-2.5 bg-white text-black text-xs font-medium px-3 py-1 rounded-full uppercase">
                    {category.name}
                  </span>
                </div>
              </Link>
            );
        })}
      </div>

      <CollectionMarquee />
      
      <EditorialHighlight />

      <h2 className="mt-8 mb-4 text-xl font-semibold">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6">
        {products.slice(0, 7).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
