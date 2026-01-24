'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projectsData = [
    { id: 1, title: 'Project 01', category: 'E-COMMERCE', imageId: 'bag-editorial-large-replace' },
    { id: 2, title: 'Project 02', category: 'BRANDING', imageId: 'leather-tote' },
    { id: 3, title: 'Project 03', category: 'WEB DESIGN', imageId: 'ethereal-trench-main' },
    { id: 4, title: 'Project 04', category: 'MOBILE APP', imageId: 'urban-nomad-1' },
    { id: 5, title: 'Project 05', category: 'UI/UX', imageId: 'silk-blouse-1' },
    { id: 6, title: 'Project 06', category: 'E-COMMERCE', imageId: 'stylish-crossbody-bag' },
    { id: 7, title: 'Project 07', category: 'WEB DESIGN', imageId: 'leather-duffle-bag' },
    { id: 8, title: 'Project 08', category: 'BRANDING', imageId: 'men-formal-suit' },
    { id: 9, title: 'Project 09', category: 'UI/UX', imageId: 'women-street-jeans' },
    { id: 10, title: 'Project 10', category: 'MOBILE APP', imageId: 'men-vintage-blazer' },
    { id: 11, title: 'Project 11', category: 'WEB DESIGN', imageId: 'ethereal-trench-side' },
    { id: 12, title: 'Project 12', category: 'E-COMMERCE', imageId: 'canvas-backpack' },
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
            <h2 className="text-4xl font-serif font-bold">Our Work</h2>
            <p className="text-lg text-gray-600 mt-2">A selection of projects that showcase our passion.</p>
        </div>
        <div ref={containerRef} className="relative h-[800vh]">
            <div className="sticky top-0 h-screen">
                {projectsData.map((project, i) => {
                    const cardImage = PlaceHolderImages.find(p => p.id === project.imageId);
                    const targetScale = 1 - (projectsData.length - i - 1) * 0.05;
                    const inputRange = [i / projectsData.length, (i + 0.5) / projectsData.length];
                    const scale = useTransform(scrollYProgress, inputRange, [1, targetScale]);
                    
                    return (
                        <motion.div
                            key={project.id}
                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                            style={{
                                scale: scale,
                                top: `calc(-1% + ${i * 20}px)`
                            }}
                        >
                            <div className="w-[90%] max-w-4xl h-[75vh] bg-white border border-gray-200 p-8 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-serif text-4xl md:text-5xl font-bold">{project.title}</h3>
                                        <p className="font-sans text-sm uppercase tracking-widest text-gray-500 mt-2">{project.category}</p>
                                    </div>
                                </div>
                                <div className="relative w-full h-3/4 mt-4">
                                    {cardImage && (
                                        <Image
                                            src={cardImage.imageUrl}
                                            alt={project.title}
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
