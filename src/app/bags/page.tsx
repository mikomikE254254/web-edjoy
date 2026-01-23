import Image from 'next/image';
import BagsCategoryTabs from '@/components/product/bags-category-tabs';
import ProductCard from "@/components/product/product-card";
import { getProductsByCategory } from "@/lib/data";

const newBagImages = [
    { src: 'https://i.postimg.cc/phDzBKWK/black-bag.jpg', alt: 'Black Bag' },
    { src: 'https://i.postimg.cc/KknB5tG8/broun-cheked-bag.jpg', alt: 'Brown Checked Bag' },
    { src: 'https://i.postimg.cc/YG1YxQr0/laggage-bag.jpg', alt: 'Luggage Bag' },
    { src: 'https://i.postimg.cc/Ny215WZV/perse-bag.jpg', alt: 'Purse Bag' },
    { src: 'https://i.postimg.cc/k6xKyWJR/Women-s-Bags-PRADA.jpg', alt: 'PRADA Bag' },
];

export default function BagsPage() {
  const bagProducts = getProductsByCategory('bags');

  return (
    <div className="space-y-12">
        <section className="my-12">
            <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-sm">
                <div className="grid grid-cols-6 grid-rows-2 gap-4" style={{ height: '600px' }}>
                    <div className="relative col-span-3 row-span-2 rounded-2xl overflow-hidden group">
                        <Image src={newBagImages[0].src} alt={newBagImages[0].alt} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden group">
                        <Image src={newBagImages[1].src} alt={newBagImages[1].alt} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 768px) 80vw, 33vw" />
                    </div>
                    <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden group">
                        <Image src={newBagImages[2].src} alt={newBagImages[2].alt} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 768px) 20vw, 17vw" />
                    </div>
                    <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden group">
                        <Image src={newBagImages[3].src} alt={newBagImages[3].alt} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 768px) 20vw, 17vw" />
                    </div>
                    <div className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden group">
                        <Image src={newBagImages[4].src} alt={newBagImages[4].alt} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 768px) 80vw, 33vw" />
                    </div>
                </div>
            </div>
        </section>

        <div className="border-t pt-6">
            <BagsCategoryTabs />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-6">
                {bagProducts.length > 0 ? (
                    bagProducts.map(product => (
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
