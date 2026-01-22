import ProductCard from "@/components/product/product-card";
import { getProductsByCategory } from "@/lib/data";

export default function WomenPage() {
  const womenProducts = getProductsByCategory('women');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Women's Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {womenProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
