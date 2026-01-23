import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: 'Alexander Stewart',
    avatarUrl: 'https://picsum.photos/seed/rev1/40/40',
    rating: 5,
    date: '2 weeks ago',
    text: 'Super comfortable and warm, the material is top-notch. It has a slightly oversized fit which is perfect for layering. I got the black one in M and it’s my new favorite hoodie.',
  },
  {
    id: 2,
    name: 'Sophia Chen',
    avatarUrl: 'https://picsum.photos/seed/rev2/40/40',
    rating: 4,
    date: '1 month ago',
    text: 'Great hoodie, very soft. Only reason for 4 stars is that it pills a little after a few washes. Otherwise, love the design.',
  },
    {
    id: 3,
    name: 'Michael Rodriguez',
    avatarUrl: 'https://picsum.photos/seed/rev3/40/40',
    rating: 5,
    date: '3 days ago',
    text: 'Absolutely love it! The quality is amazing and it looks even better in person. Will be buying another color.',
  },
];

const ReviewCard = ({ review, index }: { review: (typeof reviews)[0]; index: number }) => {
    // The header is sticky at top-0, and its height is approx 5rem.
    // We add a little margin.
    const headerHeight = '6rem';
    const stackingOffset = '2.5rem';
    const topPosition = `calc(${headerHeight} + ${index} * ${stackingOffset})`;

    return (
        <div 
          className="bg-white p-6 rounded-2xl shadow-lg border sticky transition-all"
          style={{ top: topPosition, zIndex: index }}
        >
            <div className="flex gap-4">
                <Avatar>
                    <AvatarImage src={review.avatarUrl} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                         {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                    </div>
                </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">{review.text}</p>
        </div>
    )
}


export default function ProductReviews() {
  // Calculate padding-bottom to ensure the last review can be fully seen when it's at the top.
  // (Number of cards - 1) * stackingOffset + cardHeight (approx)
  const paddingBottom = `calc((${reviews.length - 1} * 2.5rem) + 200px)`;

  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Reviews ({reviews.length})</h3>
        </div>
        <div className="relative" style={{ paddingBottom }}>
            {/* We add a spacer div for each card except the first one to create the initial separation before they become sticky */}
            {reviews.map((review, index) => (
                <div key={review.id} style={{ height: index > 0 ? '6rem' : undefined }}>
                    <ReviewCard review={review} index={index} />
                </div>
            ))}
        </div>
    </div>
  )
}
