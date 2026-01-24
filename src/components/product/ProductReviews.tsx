'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCollection, useFirestore, useUser, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { Review } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating'),
  comment: z.string().min(10, 'Comment must be at least 10 characters long.').max(1000, 'Comment must be 1000 characters or less.'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ProductReviewsProps {
  productId: string;
}

const StarRatingInput = ({ field }: { field: any }) => {
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <Star
            key={ratingValue}
            className={cn(
              'w-6 h-6 cursor-pointer transition-colors',
              ratingValue <= (hoverRating || field.value)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            )}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onClick={() => field.onChange(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const reviewsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'products', productId, 'reviews') : null),
    [firestore, productId]
  );
  const { data: reviews, isLoading: isLoadingReviews } = useCollection<Review>(reviewsQuery);
  
  const sortedReviews = React.useMemo(() => {
    if (!reviews) return [];
    // The toDate() method might fail if createdAt is not a Timestamp yet (e.g. during optimistic update)
    return [...reviews].sort((a, b) => (b.createdAt?.toMillis() ?? 0) - (a.createdAt?.toMillis() ?? 0));
  }, [reviews]);

  const userReview = React.useMemo(() => {
    return reviews?.find(r => r.userId === user?.uid);
  }, [reviews, user]);


  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  React.useEffect(() => {
    if (userReview) {
      form.reset({
        rating: userReview.rating,
        comment: userReview.comment,
      });
    } else {
      form.reset({
        rating: 0,
        comment: '',
      });
    }
  }, [userReview, form]);

  const onSubmit = (data: ReviewFormData) => {
    if (!firestore || !user) return;

    if (user.isAnonymous) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in with an email or social account to leave a review.',
      });
      return;
    }

    const reviewRef = doc(firestore, 'products', productId, 'reviews', user.uid);
    const reviewData = {
      ...data,
      userId: user.uid,
      userName: user.displayName || 'Valued Customer',
      createdAt: serverTimestamp(),
    };

    setDocumentNonBlocking(reviewRef, reviewData, { merge: true });
    toast({
      title: 'Review Submitted!',
      description: 'Thank you for your feedback.',
    });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>
      <Separator className="my-4" />
      
      {isUserLoading ? (
         <div className="h-24 w-full animate-pulse bg-gray-200 rounded-lg"></div>
      ) : user && !user.isAnonymous ? (
        <div className="my-6 p-6 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">{userReview ? 'Edit Your Review' : 'Write a Review'}</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Rating</FormLabel>
                    <FormControl>
                      <StarRatingInput field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Share your thoughts on the product..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>Submit Review</Button>
            </form>
          </Form>
        </div>
      ) : null }

      <div className="space-y-8">
        {isLoadingReviews && <p>Loading reviews...</p>}
        {!isLoadingReviews && sortedReviews.length === 0 && <p className="text-muted-foreground">No reviews yet. Be the first to write one!</p>}
        {sortedReviews.map(review => (
          <div key={review.id} className="flex gap-4">
            <Avatar>
              <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.userName}</p>
                {review.createdAt && (
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(review.createdAt.toDate(), { addSuffix: true })}
                  </p>
                )}
              </div>
              <div className="flex items-center my-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn('w-4 h-4', i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
