'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUser, useCollection, useFirestore, useMemoFirebase, setDocumentNonBlocking, WithId } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Review } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const reviewSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50),
  rating: z.number().min(1, { message: 'Please select a rating.' }).max(5),
  comment: z.string().min(10, { message: 'Comment must be at least 10 characters.' }).max(1000),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const StarRatingInput = ({ field }: { field: any }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            onClick={() => field.onChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={cn(
                'w-7 h-7 cursor-pointer transition-colors',
                ratingValue <= (hover || field.value)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

const ReviewForm = ({ productId }: { productId: string }) => {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: '',
      rating: 0,
      comment: '',
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    if (!firestore || !user) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "You must be signed in to leave a review.",
      });
      return;
    }

    const reviewRef = doc(firestore, 'products', productId, 'reviews', user.uid);
    
    const reviewData = {
      userId: user.uid,
      userName: data.name,
      rating: data.rating,
      comment: data.comment,
      createdAt: serverTimestamp(),
    };

    // Using set with merge to allow users to update their review.
    setDocumentNonBlocking(reviewRef, reviewData, { merge: true });

    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback.",
    });
    form.reset();
  };

  if (isUserLoading) {
    return <Skeleton className="h-48 w-full rounded-lg" />;
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Jane Doe" {...field} />
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
                    <Textarea placeholder="Tell us what you think about the product..." rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!user}>Submit Review</Button>
            {!user && <p className="text-xs text-muted-foreground pt-2">You are browsing as a guest. Your review will be submitted anonymously.</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ReviewCard = ({ review }: { review: WithId<Review> }) => {
  const { rating, comment, userName, createdAt } = review;
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm border"
      variants={cardVariants}
    >
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarFallback>{userName ? userName.substring(0, 2).toUpperCase() : 'A'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{userName}</p>
            {createdAt && (
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(createdAt.toDate(), { addSuffix: true })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-0.5 my-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                )}
              />
            ))}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{comment}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductReviews({ productId }: { productId: string }) {
    const firestore = useFirestore();
    
    const reviewsQuery = useMemoFirebase(
        () => (firestore ? collection(firestore, 'products', productId, 'reviews') : null),
        [firestore, productId]
    );

    const { data: reviews, isLoading: isLoadingReviews } = useCollection<Review>(reviewsQuery);
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      };

    return (
        <div className="py-12 md:py-16 space-y-12">
            <Separator />
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
                <div className="md:col-span-1 space-y-2">
                    <h2 className="text-3xl font-bold">Customer Reviews</h2>
                    <p className="text-muted-foreground">See what others are saying about this product.</p>
                </div>
                <div className="md:col-span-2">
                    <ReviewForm productId={productId} />
                </div>
            </div>
            
            <div className="space-y-8">
                {isLoadingReviews && (
                    <div className="space-y-6">
                        <Skeleton className="h-24 w-full rounded-xl" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                )}
                
                {reviews && reviews.length > 0 ? (
                     <motion.div 
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {reviews.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()).map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </motion.div>
                ) : (
                    !isLoadingReviews && <p className="text-center text-muted-foreground py-8">Be the first to review this product!</p>
                )}
            </div>
        </div>
    );
}
