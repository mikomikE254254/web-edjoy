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

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => {
    return (
        <div className="flex gap-4 py-6">
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
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{review.text}</p>
            </div>
        </div>
    )
}


export default function ProductReviews() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm h-full">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold">Reviews ({reviews.length})</h3>
            {/* Sort Dropdown can go here */}
        </div>
        <div className="max-h-[600px] overflow-y-auto -mx-8 px-8 divide-y divide-gray-100">
            {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    </div>
  )
}
