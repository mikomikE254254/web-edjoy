'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const REVIEWS = [
    { id: 1, name: 'Alex M.', initials: 'AM', rating: 5, text: "The craftsmanship is impeccable. It feels substantial and looks even better in person. A new favorite." },
    { id: 2, name: 'Jordan S.', initials: 'JS', rating: 5, text: "Absolutely stunning. The minimalist design is exactly what I was looking for. Worth every penny." },
    { id: 3, name: 'Casey L.', initials: 'CL', rating: 5, text: "I've received so many compliments. It's versatile enough for both casual and formal occasions." },
    { id: 4, name: 'Taylor B.', initials: 'TB', rating: 4, text: "Great product, very stylish. The color was slightly different than expected, but it's grown on me." },
    { id: 5, name: 'Morgan P.', initials: 'MP', rating: 5, text: "Exceeded all my expectations. The quality of the materials is top-notch. Highly recommend." },
    { id: 6, name: 'Riley J.', initials: 'RJ', rating: 5, text: "A truly timeless piece. It’s a staple in my wardrobe now. I'm considering buying another color." },
    { id: 7, name: 'Jamie K.', initials: 'JK', rating: 5, text: "The attention to detail is remarkable. From the stitching to the hardware, everything is perfect." },
    { id: 8, name: 'Drew W.', initials: 'DW', rating: 5, text: "So elegant and functional. It holds everything I need without looking bulky. The perfect everyday item." },
    { id: 9, name: 'Cameron T.', initials: 'CT', rating: 4, text: "Love the design and feel. My only wish is that it came in more sizes. Still, a fantastic purchase." },
    { id: 10, name: 'Avery G.', initials: 'AG', rating: 5, text: "This was a gift, and it was a huge hit. The packaging was as beautiful as the product itself." },
    { id: 11, name: 'Skyler H.', initials: 'SH', rating: 5, text: "It's rare to find something this well-made. Feels like a luxury item that will last for years." },
    { id: 12, name: 'Quinn R.', initials: 'QR', rating: 5, text: "Simple, elegant, and beautifully executed. A masterclass in minimalist design. I'm beyond impressed." },
];

export default function ProductReviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-background py-20">
      <div className="sticky top-0 mx-auto flex h-screen max-w-5xl items-center justify-center px-4">
        <div className="flex flex-col items-center gap-6">
          <h2 className={cn("text-4xl md:text-5xl font-bold text-center", playfair.className)}>
            Customer Reviews
          </h2>
          <p className="text-muted-foreground text-center max-w-lg">
            What our clients are saying about this product.
          </p>
          <div className="relative h-[450px] w-full max-w-lg">
            {REVIEWS.map((review, index) => (
              <Card key={review.id} review={review} index={index} containerRef={containerRef} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Card = ({ review, index, containerRef }: { review: (typeof REVIEWS)[0], index: number, containerRef: React.RefObject<HTMLDivElement> }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const start = index * 0.05;
  const end = 1;
  
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.5 + index * 0.025]);
  const top = useTransform(scrollYProgress, [start, end], [0, -40 * (REVIEWS.length - index)]);

  return (
    <motion.div
      style={{
        scale,
        top,
        zIndex: REVIEWS.length - index,
      }}
      className="absolute left-0 top-0 flex h-[450px] w-full max-w-lg flex-col justify-between rounded-2xl border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
    >
      <Quote className="h-10 w-10 text-gray-300" />
      <p className={cn("text-2xl font-semibold italic text-center", playfair.className)}>
        "{review.text}"
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarFallback>{review.initials}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold">{review.name}</p>
                 <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};
