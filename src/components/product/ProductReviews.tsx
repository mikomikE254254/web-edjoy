"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const REVIEWS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: `CUSTOMER ${i + 1}`,
  text: "EXCEPTIONAL QUALITY. THE MINIMALIST DESIGN FITS PERFECTLY WITH MY AESTHETIC. SHARP EDGES AND PREMIUM FEEL.",
  rating: "5.0"
}));

export default function ProductReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <>
      <div className="max-w-4xl mx-auto text-center my-20">
          <h2 className="text-4xl font-serif font-bold">Customer Reviews</h2>
          <p className="text-lg text-gray-600 mt-2">What our clients are saying about this product.</p>
      </div>
      <div ref={containerRef} className="relative" style={{ height: `${REVIEWS.length * 60}vh` }}>
        <div className="sticky top-24 flex h-screen items-start justify-center overflow-hidden">
          {REVIEWS.map((review, i) => {
            const targetScale = 1 - ((REVIEWS.length - i - 1) * 0.05);
            const scale = useTransform(scrollYProgress, [i / REVIEWS.length, 1], [1, targetScale]);
            
            return (
              <motion.div
                key={review.id}
                style={{
                  scale,
                  top: `calc(${i * 30}px)`
                }}
                className="absolute flex w-full h-full items-start justify-center"
              >
                <div
                  className={cn(
                    "flex h-[400px] w-full max-w-4xl flex-col justify-between border-2 border-black bg-white p-8 shadow-[10px_10px_0px_#000]"
                  )}
                >
                    <div className="flex justify-between items-end border-b-2 border-black pb-4">
                      <div>
                        <p className="text-xl font-bold uppercase">{review.name}</p>
                        <p className="text-xs opacity-60">VERIFIED PURCHASE</p>
                      </div>
                      <p className="text-3xl font-mono">({review.rating})</p>
                    </div>
                     <h2 className="text-3xl md:text-4xl font-serif leading-tight tracking-tight my-auto text-center">
                      "{review.text}"
                    </h2>
                     <span className="text-xs font-mono self-start">REVIEW {i + 1} / {REVIEWS.length}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}