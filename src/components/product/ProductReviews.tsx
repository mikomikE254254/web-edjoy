'use client';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useCollection, useFirestore, useMemoFirebase, WithId } from '@/firebase';
import { collection, query, limit } from 'firebase/firestore';
import type { Review as ReviewType } from '@/lib/types';
import { Skeleton } from "@/components/ui/skeleton";

function ReviewCard({ review, index, totalReviews, containerRef }: { review: WithId<ReviewType>, index: number, totalReviews: number, containerRef: React.RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate timing for each card
  const start = index / totalReviews;
  const end = (index + 1) / totalReviews;

  // This handles the "Slide from bottom" animation
  const y = useTransform(scrollYProgress, [start, end], index === 0 ? ["0%", "0%"] : ["100%", "0%"]);

  return (
    <motion.div
      style={{ y, zIndex: index }}
      className="absolute inset-0 w-full h-screen border-t-2 border-black"
    >
      {/* Background Image Fix for Blur */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://i.postimg.cc/vTsyc37q/download_(11).jpg"
          alt="Product Background"
          fill
          priority={index < 2}
          sizes="100vw"
          className={`object-cover ${index === 0 ? 'hidden' : 'opacity-60'}`} // Hide img on first red card
          style={{ imageRendering: 'auto' }} 
        />
        {/* Dark overlay for readability */}
        <div className={`absolute inset-0 ${index === 0 ? 'bg-red-600' : 'bg-black/40'}`} />
      </div>

      {/* Content Container (Sharp Rectangles) */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="w-full max-w-5xl border-[4px] border-white p-10 md:p-20 text-white flex flex-col items-start gap-6">
           <span className="font-mono text-sm tracking-widest bg-white text-black px-2 py-1">
             VERIFIED REVIEW {index + 1}/{totalReviews}
           </span>
           <h2 className="text-4xl md:text-8xl font-serif uppercase leading-[0.9] tracking-tighter">
             "{review.comment}"
           </h2>
           <div className="w-full h-[2px] bg-white mt-4" />
           <p className="text-xl font-bold">— {review.userName}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductReviews({ productId }: { productId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firestore = useFirestore();

  const reviewsQuery = useMemoFirebase(
      () => (firestore ? query(collection(firestore, 'products', productId, 'reviews'), limit(11)) : null),
      [firestore, productId]
  );

  const { data: fetchedReviews, isLoading: isLoadingReviews } = useCollection<ReviewType>(reviewsQuery);

  if (isLoadingReviews) {
    return <div className="h-screen w-full flex items-center justify-center"><Skeleton className="h-96 w-full max-w-5xl" /></div>;
  }

  if (!fetchedReviews || fetchedReviews.length === 0) {
    return null; // Don't render the section if there are no reviews to show.
  }
  
  const anchorReview: WithId<ReviewType> = {
    id: 'anchor-0',
    userName: 'RUNWAY RETAIL',
    comment: 'THIS IS THE PRIMARY ANCHOR. RED BASE.',
    // Add dummy data for other required fields of ReviewType
    rating: 5,
    userId: 'system',
    createdAt: new Date() as any, // Not a firestore timestamp, but will work for typing.
  };
  
  const displayReviews = [anchorReview, ...fetchedReviews];

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {displayReviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} totalReviews={displayReviews.length} containerRef={containerRef} />
        ))}
      </div>
    </div>
  );
}
