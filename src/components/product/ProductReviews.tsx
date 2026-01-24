"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const REVIEWS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: `REVIEWER ${i + 1}`,
  text: i === 0 
    ? "THIS IS THE PRIMARY RED REVIEW ANCHOR." 
    : "THIS IS MOCK REVIEW DATA STACKING ON TOP.",
}));

export default function ProductReviews() {
  const containerRef = useRef(null);
  
  // This "height" controls how long the section stays pinned. 
  // 12 reviews * 50vh per review = 600vh total scroll length.
  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {REVIEWS.map((review, index) => (
          <ReviewCard 
            key={review.id} 
            review={review} 
            index={index} 
            containerRef={containerRef} 
          />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review, index, containerRef }: { review: any, index: number, containerRef: any }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Each card has a specific "start" point in the scroll
  const start = index / 12;
  const end = (index + 1) / 12;

  // Animate from bottom (100vh) to top (0)
  // Card 0 (Red) stays at 0 the whole time
  const y = useTransform(
    scrollYProgress, 
    [start, end], 
    index === 0 ? [0, 0] : ["100vh", "0vh"]
  );

  return (
    <motion.div
      style={{ y, zIndex: index }}
      className={`absolute inset-0 w-full h-screen flex items-center justify-center border-b-4 border-black
        ${index === 0 ? "bg-red-600 text-white" : "bg-white text-black"}`}
    >
      <div className="max-w-4xl px-10">
        <div className="border-2 border-current p-12"> {/* Sharp Rectangle Edges */}
          <span className="font-mono text-sm">NO. {index + 1} / 12</span>
          <h2 className="text-5xl md:text-7xl font-serif mt-4 uppercase italic">
            "{review.text}"
          </h2>
          <p className="mt-8 font-bold tracking-widest">— {review.name}</p>
        </div>
      </div>
    </motion.div>
  );
}