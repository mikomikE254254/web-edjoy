'use client';

import { useState, useMemo } from 'react';
import { useCollection, useFirestore, useUser, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { collection, doc, serverTimestamp, query, orderBy, where, limit } from 'firebase/firestore';
import type { Review, Product } from '@/lib/types';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '../ui/skeleton';

function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="flex gap-4 border-b py-6">
            <Avatar>
                <AvatarFallback>{review.userName ? review.userName.charAt(0).toUpperCase() : 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="font-semibold">{review.userName || 'Anonymous'}</p>
                    <p className="text-xs text-muted-foreground">
                        {review.createdAt ? new Date(review.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                    </p>
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-4 h-4", i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
                    ))}
                </div>
                <p className="mt-3 text-sm text-gray-700">{review.comment}</p>
            </div>
        </div>
    );
}

function ReviewForm({ productId, onReviewAdded }: { productId: string, onReviewAdded: () => void }) {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !firestore) {
            toast({ variant: "destructive", title: "You must be logged in to leave a review." });
            return;
        }
        if (rating === 0) {
            toast({ variant: "destructive", title: "Please select a star rating." });
            return;
        }
        if (comment.trim().length < 10) {
            toast({ variant: "destructive", title: "Comment must be at least 10 characters." });
            return;
        }

        setIsSubmitting(true);
        const reviewRef = doc(firestore, 'products', productId, 'reviews', user.uid);
        
        const reviewData = {
            userId: user.uid,
            userName: user.displayName || user.email || 'Anonymous',
            rating,
            comment,
            createdAt: serverTimestamp(),
        };

        setDocumentNonBlocking(reviewRef, reviewData, { merge: true });

        toast({ title: "Review submitted!", description: "Thank you for your feedback." });
        setRating(0);
        setComment('');
        onReviewAdded();
        setIsSubmitting(false);
    };
    
    if (isUserLoading) return <Skeleton className="h-48 w-full" />;
    if (!user) return <p className="text-center text-muted-foreground py-8">Please sign in to leave a review.</p>;

    return (
        <form onSubmit={handleSubmit} className="p-6 border rounded-lg bg-gray-50/50 space-y-4">
            <h3 className="text-lg font-semibold">Write a Review</h3>
            <div>
                <p className="text-sm font-medium mb-2">Your Rating</p>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => {
                        const value = i + 1;
                        return (
                            <Star
                                key={value}
                                className={cn("w-6 h-6 cursor-pointer transition-colors", value <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 hover:text-yellow-300")}
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHoverRating(value)}
                                onMouseLeave={() => setHoverRating(0)}
                            />
                        )
                    })}
                </div>
            </div>
            <div>
                <Textarea
                    placeholder="Share your thoughts on the product..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                />
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
        </form>
    );
}


export default function ProductReviews() {
    const { slug } = useParams<{ slug: string }>();
    const firestore = useFirestore();
    const [showForm, setShowForm] = useState(false);

    const productQuery = useMemoFirebase(
        () => firestore ? query(collection(firestore, 'products'), where('slug', '==', slug), limit(1)) : null,
        [firestore, slug]
    );
    const { data: products, isLoading: isLoadingProduct } = useCollection<Product>(productQuery);
    const productId = products?.[0]?.id;

    const reviewsQuery = useMemoFirebase(
        () => productId ? query(collection(firestore, 'products', productId, 'reviews'), orderBy('createdAt', 'desc')) : null,
        [firestore, productId]
    );

    const { data: reviews, isLoading: isLoadingReviews } = useCollection<Review>(reviewsQuery);
    
    if (isLoadingProduct) return <div className="py-12"><Skeleton className="h-64 w-full" /></div>;
    if (!productId) return null;

    return (
        <div className="py-12 md:py-16 space-y-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-bold">Customer Reviews ({reviews?.length || 0})</h2>
                <Button variant="outline" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Write a Review'}
                </Button>
            </div>

            {showForm && <ReviewForm productId={productId} onReviewAdded={() => setShowForm(false)} />}
            
            <div className="space-y-6">
                {isLoadingReviews && Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
                {!isLoadingReviews && reviews && reviews.length > 0 ? (
                    reviews.map(review => <ReviewCard key={review.id} review={review} />)
                ) : (
                    !isLoadingReviews && <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first!</p>
                )}
            </div>
        </div>
    );
}
