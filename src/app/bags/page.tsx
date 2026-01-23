import BagsCategoryTabs from '@/components/product/bags-category-tabs';
import ProductCard from "@/components/product/product-card";
import { getProductsByCategory } from "@/lib/data";
import BagsEditorialHighlight from '@/components/product/bags-editorial-highlight';

export default function BagsPage() {
  const bagProducts = getProductsByCategory('bags');

  return (
    <div className="space-y-6">
      <BagsEditorialHighlight />

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
