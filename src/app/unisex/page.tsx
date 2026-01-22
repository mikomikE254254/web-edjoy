import ProductCard from "@/components/product/product-card";
import { products } from "@/lib/data";

export default function UnisexPage() {
  const unisexProducts = products.slice(0, 4); // Placeholder

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Unisex Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Styles that transcend boundaries. Made for everyone.
        </p>
      </div>

      <hr className="my-12 border-border/50" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {unisexProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
