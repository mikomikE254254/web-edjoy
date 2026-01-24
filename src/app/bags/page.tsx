'use client';

import BagsCategoryTabs from '@/components/product/bags-category-tabs';
import ProductCard from "@/components/product/product-card";
import BagsEditorialHighlight from '@/components/product/bags-editorial-highlight';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Product } from '@/lib/types';
import { collection, query, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export default function BagsPage() {
  const firestore = useFirestore();
  const router = useRouter();

  const productsQuery = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'products'), where('category', '==', 'bags')) : null,
    [firestore]
  );
  const { data: bagProducts, isLoading } = useCollection<Product>(productsQuery);

  const handleAdminClick = () => {
    const access = prompt("Enter Admin Password:");
    if (access === "Mmm@29315122") {
      router.push("/admin-dashboard");
    } else {
      alert("Access Denied");
    }
  };

  return (
    <div className="space-y-6">
      <BagsEditorialHighlight />

      <div className="border-t pt-6">
        <BagsCategoryTabs />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-6">
          {isLoading && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />)}
          {!isLoading && bagProducts && bagProducts.length > 0 ? (
            bagProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
             !isLoading && <p>No products found in this category.</p>
          )}
        </div>
      </div>
      <button 
        id="admin-entry"
        onClick={handleAdminClick} 
        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        Admin
      </button>
    </div>
  );
}
