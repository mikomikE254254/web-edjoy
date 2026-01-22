import ProductCard from "@/components/product/product-card";
import { getProductsByCategory } from "@/lib/data";
import CollectionMarquee from "@/components/home/collection-marquee";
import CategoryIcons from "@/components/layout/category-icons";

export default function MenPage() {
  const menProducts = getProductsByCategory('men');

  return (
    <div className="container py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Men's Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore our curated selection of sophisticated apparel for the modern man.
        </p>
      </div>

      <CategoryIcons />
      
      <CollectionMarquee />

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
