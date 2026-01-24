'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const REVIEWS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: `Verified Customer ${i + 1}`,
  date: 'Jan 2026',
  rating: 5,
  comment:
    'The quality of this product is exactly what I expected. Minimalist, sharp, and functional.',
}));

const Card = ({
  review,
  index,
  progress,
  range,
  targetScale,
}: {
  review: (typeof REVIEWS)[0];
  index: number;
  progress: any;
  range: [number, number];
  targetScale: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <motion.div
      ref={containerRef}
      className="sticky top-24 flex h-screen items-start justify-center"
    >
      <motion.div
        style={{
          scale: scale,
          top: `calc(-5% + ${index * 25}px)`,
        }}
        className="w-full max-w-2xl origin-top"
      >
        <div className="w-full max-w-2xl bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-lg uppercase">{review.name}</p>
              <p className="text-xs text-gray-500">{review.date}</p>
            </div>
            <div className="flex">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={16} fill="black" stroke="black" />
              ))}
            </div>
          </div>
          <p className="text-sm leading-relaxed border-t border-black pt-4">
            "{review.comment}"
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ProductReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div className="bg-white py-20">
      <h2 className="text-4xl font-serif text-center mb-20 uppercase tracking-tighter">
        Reviews
      </h2>
      <div ref={containerRef} className="relative h-[250vh]">
        {REVIEWS.map((review, i) => {
          const targetScale = 1 - (REVIEWS.length - i) * 0.05;
          return (
            <Card
              key={review.id}
              index={i}
              review={review}
              progress={scrollYProgress}
              range={[i / REVIEWS.length, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
}
