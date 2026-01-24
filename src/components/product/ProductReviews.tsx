"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote } from 'lucide-react';

const REVIEWS = [
    { id: 0, name: "Sarah J.", text: "This piece is absolutely stunning. The craftsmanship is top-notch and it feels incredibly luxurious. A new favorite in my wardrobe." },
    { id: 1, name: "Michael B.", text: "Exceeded my expectations. It's versatile enough for both casual and formal occasions. I've been getting so many compliments." },
    { id: 2, name: "Emily K.", text: "The quality is amazing for the price. It looks even better in person than it does online. Highly recommend to anyone on the fence." },
    { id: 3, name: "David L.", text: "A truly timeless design. The materials feel durable and the fit is perfect. I'll definitely be a returning customer." },
    { id: 4, name: "Jessica P.", text: "I'm in love with the minimalist aesthetic. It's the perfect statement piece without being too loud. Very elegant and chic." },
    { id: 5, name: "Chris T.", text: "Solid construction and very comfortable to wear. It's clear that a lot of thought went into the design and functionality." },
];

export default function ProductReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Container height determines scroll duration. More cards = more height.
  const containerHeight = `${REVIEWS.length * 100}vh`;

  return (
    <div className="bg-background py-24">
        <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-4xl font-serif font-bold">From Our Customers</h2>
            <p className="text-lg text-gray-600 mt-2">Real reviews from satisfied shoppers.</p>
        </div>
        <div ref={containerRef} style={{ height: containerHeight }} className="relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {REVIEWS.map((review, index) => (
                    <ReviewCard 
                        key={review.id} 
                        review={review} 
                        index={index} 
                        totalCards={REVIEWS.length}
                        containerRef={containerRef} 
                    />
                ))}
            </div>
        </div>
    </div>
  );
}

function ReviewCard({ review, index, totalCards, containerRef }: { review: any, index: number, totalCards: number, containerRef: any }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Define the start and end points for this card's animation within the total scroll progress.
  const start = index / totalCards;
  const end = (index + 1) / totalCards;

  // The card starts off-screen at the bottom (y: "100%") and moves to its final stacked position (y: 0).
  // The first card (index 0) starts and stays at y: 0.
  const y = useTransform(
    scrollYProgress, 
    [start, end], 
    [index === 0 ? "0%" : "100%", "0%"]
  );

  // Each card has a slight vertical offset to create the stacking visual.
  const topOffset = index * 20;

  return (
    <motion.div
      style={{ 
        y, 
        top: topOffset, // Apply the stacking offset
        zIndex: index  // Lower index = further back in the stack
      }}
      className="absolute w-full max-w-2xl px-4"
    >
      <div className="relative flex h-[350px] w-full flex-col justify-between rounded-xl border-2 border-black bg-white p-8 shadow-[8px_8px_0px_#000]">
        <Quote className="absolute -top-5 -left-5 h-12 w-12 text-gray-200" fill="currentColor" strokeWidth={0} />
        <p className="z-10 font-serif text-xl leading-relaxed">{review.text}</p>
        <p className="z-10 self-end font-semibold">— {review.name}</p>
      </div>
    </motion.div>
  );
}
