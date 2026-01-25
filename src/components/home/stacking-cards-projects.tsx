'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const productsData = [
    { id: 1, title: 'Leather Tote', category: 'Bags', imageId: 'leather-tote' },
    { id: 2, title: 'Ethereal Trench', category: 'Women', imageId: 'ethereal-trench-main' },
    { id: 3, title: 'Urban Nomad Jacket', category: 'Men', imageId: 'urban-nomad-1' },
    { id: 4, title: 'Silk-Flow Blouse', category: 'Women', imageId: 'silk-blouse-1' },
    { id: 5, title: 'Stylish Crossbody', category: 'Bags', imageId: 'stylish-crossbody-bag' },
    { id: 6, title: 'Leather Duffle', category: 'Bags', imageId: 'leather-duffle-bag' },
    { id: 7, title: 'Formal Suit', category: 'Men', imageId: 'men-formal-suit' },
    { id: 8, title: 'Street Jeans', category: 'Women', imageId: 'women-street-jeans' },
    { id: 9, title: 'Vintage Blazer', category: 'Men', imageId: 'men-vintage-blazer' },
    { id: 10, title: 'Canvas Backpack', category: 'Bags', imageId: 'canvas-backpack' },
    { id: 11, title: 'Brown Backpack', category: 'Bags', imageId: 'bag-editorial-large-replace' },
    { id: 12, title: 'Minimalist Clutch', category: 'Bags', imageId: 'minimalist-clutch' },
];

export default function StackingCardsProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div className="mt-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-serif font-bold">Featured Products</h2>
            <p className="text-lg text-gray-600 mt-2">A selection of our finest products.</p>
        </div>
        <div ref={containerRef} className="relative h-[800vh]">
            <div className="sticky top-0 h-screen">
                {productsData.map((product, i) => {
                    const cardImage = PlaceHolderImages.find(p => p.id === product.imageId);
                    const targetScale = 1 - (productsData.length - i - 1) * 0.05;
                    const inputRange = [i / productsData.length, (i + 0.5) / productsData.length];
                    const scale = useTransform(scrollYProgress, inputRange, [1, targetScale]);
                    
                    return (
                        <motion.div
                            key={product.id}
                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                            style={{
                                scale: scale,
                                top: `calc(-1% + ${i * 20}px)`
                            }}
                        >
                            <div className="w-[90%] max-w-4xl h-[75vh] bg-white border border-gray-200 p-8 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-serif text-4xl md:text-5xl font-bold">{product.title}</h3>
                                        <p className="font-sans text-sm uppercase tracking-widest text-gray-500 mt-2">{product.category}</p>
                                    </div>
                                </div>
                                <div className="relative w-full h-3/4 mt-4">
                                    {cardImage && (
                                        <Image
                                            src={cardImage.imageUrl}
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 90vw, 1000px"
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};
