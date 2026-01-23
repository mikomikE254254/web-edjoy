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
  {
    id: 4,
    name: 'Emily Davis',
    avatarUrl: 'https://picsum.photos/seed/rev4/40/40',
    rating: 5,
    date: '1 week ago',
    text: 'Perfect fit and the color is exactly as shown on the website. The fabric is thick and feels very premium. Highly recommended!',
  },
  {
    id: 5,
    name: 'David Wilson',
    avatarUrl: 'https://picsum.photos/seed/rev5/40/40',
    rating: 3,
    date: '1 month ago',
    text: 'It\'s a decent product, but the sizing runs a bit small. I\'d recommend sizing up. The material is good though.',
  },
  {
    id: 6,
    name: 'Jessica Miller',
    avatarUrl: 'https://picsum.photos/seed/rev6/40/40',
    rating: 4,
    date: '2 months ago',
    text: 'I\'ve been using this for a while now and it\'s holding up great. It\'s stylish and functional. Would buy again.',
  },
];

export default function ProductReviews() {
  const headerHeight = '6rem'; // Approx height of sticky header
  const topPosition = `calc(${headerHeight} + 2rem)`; // Where the card "sticks"

  return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Reviews ({reviews.length})</h3>
        </div>
        <div className="relative">
            {reviews.map((review, index) => (
                <div 
                    key={review.id}
                    className="bg-white p-6 shadow-lg border sticky"
                    style={{ 
                        top: topPosition, 
                        zIndex: index + 1,
                        // Add margin to the bottom of all but the last card to create scroll space
                        marginBottom: index < reviews.length - 1 ? '12rem' : '0' 
                    }}
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
            ))}
        </div>
    </div>
  )
}
