import { getProductBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductViewer3D from '@/components/product/product-viewer-3d';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AIStyleGuide from '@/components/product/ai-style-guide';
import AddToCartButton from '@/components/product/add-to-cart-button';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="aspect-square w-full rounded-lg bg-accent/30 shadow-lg">
           <ProductViewer3D glbUrl={product.glbUrl} />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-bold lg:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>
          
          <div className="mt-8">
            <AddToCartButton />
          </div>

          <div className="mt-12 w-full">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">Fabric & Details</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-3">
                    {product.fabricDetails.map((detail) => (
                      <div key={detail.id} className="group relative aspect-square overflow-hidden rounded-md">
                        <Image
                          src={detail.url}
                          alt={detail.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 33vw"
                          data-ai-hint={detail.hint}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">AI Style Guide</AccordionTrigger>
                <AccordionContent>
                  <AIStyleGuide product={product} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <p>Free standard shipping on all orders. Express shipping available. We accept returns within 30 days of delivery. The item must be in its original condition, with all tags attached.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
