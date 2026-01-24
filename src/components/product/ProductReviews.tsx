"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const REVIEWS = [
  { id: 0, name: 'Alex M.', date: "Jan 2026", rating: 5, text: "The quality of this product is exceptional. It's minimalist, sharp, and incredibly functional. A perfect addition." },
  { id: 1, name: 'Jordan S.', date: "Jan 2026", rating: 5, text: "Absolutely in love with the design. It feels premium and looks even better in person than online. Highly recommended." },
  { id: 2, name: 'Taylor B.', date: "Dec 2025", rating: 4, text: "Great product overall. The material is top-notch, though it was slightly smaller than I anticipated. Still, a fantastic piece." },
  { id: 3, name: 'Casey L.', date: "Dec 2025", rating: 5, text: "Exceeded all my expectations. The craftsmanship is evident in every detail. I've received so many compliments." },
  { id: 4, name: 'Morgan P.', date: "Nov 2025", rating: 5, text: "A truly timeless item. It's versatile enough for both casual and formal occasions. A staple in my collection now." },
  { id: 5, name: 'Riley K.', date: "Nov 2025", rating: 3, text: "It's a nice product, but the color seemed a bit off from the photos. The quality is good, just not a perfect match for me." },
  { id: 6, name: 'Jamie W.', date: "Oct 2025", rating: 5, text: "Couldn't be happier with my purchase. The packaging was beautiful and the item itself is flawless. 10/10." },
  { id: 7, name: 'Drew H.', date: "Oct 2025", rating: 5, text: "This is the definition of quiet luxury. Understated, elegant, and built to last. I'll be a returning customer." },
  { id: 8, name: 'Cameron F.', date: "Sep 2025", rating: 4, text: "Very solid product. The only reason it's not 5 stars is the shipping took longer than expected. The item itself is perfect." },
  { id: 9, name: 'Parker D.', date: "Sep 2025", rating: 5, text: "From the moment I unboxed it, I knew it was special. The attention to detail is second to none." },
  { id: 10, name: 'Quinn E.', date: "Aug 2025", rating: 5, text: "A stunning piece that has quickly become my favorite. Functional art. I'm already saving up for another one." },
  { id: 11, name: 'Rowan G.', date: "Aug 2025", rating: 4, text: "I really like it. It's stylish and practical. I wish it had one more pocket, but that's a minor critique on an excellent item." }
];

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
      <div ref={containerRef} className="relative" style={{ height: `${REVIEWS.length * 50}vh` }}>
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
                    "flex h-[450px] w-full max-w-3xl flex-col justify-center items-center rounded-2xl bg-card p-12 text-center shadow-2xl"
                  )}
                >
                    <div className="flex mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "h-6 w-6",
                                    i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                )}
                            />
                        ))}
                    </div>
                    <p className="mb-8 font-serif text-2xl leading-snug text-foreground">
                        “{review.text}”
                    </p>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-foreground">{review.name}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
