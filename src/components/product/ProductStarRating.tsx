'use client';

import { useState, useMemo, useEffect } from 'react';
import { useCollection, useFirestore, useUser, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductStarRatingProps {
  productId: string;
}

interface Review {
  userId: string;
  rating: number;
}

export default function ProductStarRating({ productId }: ProductStarRatingProps) {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const reviewsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'products', productId, 'reviews') : null),
    [firestore, productId]
  );
  const { data: reviews, isLoading: isLoadingReviews } = useCollection<Review>(reviewsQuery);

  const { averageRating, reviewCount } = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return { averageRating: 0, reviewCount: 0 };
    }
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return {
      averageRating: totalRating / reviews.length,
      reviewCount: reviews.length,
    };
  }, [reviews]);

  const [currentUserRating, setCurrentUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  useEffect(() => {
    if (user && reviews) {
      const userReview = reviews.find(r => r.userId === user.uid);
      if (userReview) {
        setCurrentUserRating(userReview.rating);
      }
    }
  }, [reviews, user]);

  const handleSetRating = (rating: number) => {
    if (isUserLoading) return;
    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'You must be logged in to leave a review.',
      });
      return;
    }

    const reviewRef = doc(firestore, 'products', productId, 'reviews', user.uid);
    const reviewData = {
      userId: user.uid,
      rating: rating,
      updatedAt: serverTimestamp(),
    };

    setDocumentNonBlocking(reviewRef, reviewData, { merge: true });

    setCurrentUserRating(rating);
    toast({
      title: 'Review Submitted!',
      description: `You rated this product ${rating} out of 5 stars.`,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <Star
                key={ratingValue}
                className={cn(
                  'w-5 h-5 cursor-pointer transition-colors',
                  ratingValue <= (hoverRating || currentUserRating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                )}
                onMouseEnter={() => setHoverRating(ratingValue)}
                onClick={() => handleSetRating(ratingValue)}
              />
            );
          })}
        </div>
        {!isLoadingReviews && (
          <span className="text-sm text-gray-500 hover:underline">
            {reviewCount > 0 ? `(${reviewCount} Reviews)` : '(No reviews yet)'}
          </span>
        )}
         {isLoadingReviews && (
            <span className="text-sm text-gray-400 animate-pulse">Loading reviews...</span>
         )}
      </div>
      {averageRating > 0 && !isLoadingReviews && (
        <p className="text-sm font-medium text-gray-700">
          Average: {averageRating.toFixed(1)} / 5
        </p>
      )}
    </div>
  );
}
