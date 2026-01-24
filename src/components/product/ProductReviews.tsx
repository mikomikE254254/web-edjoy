"use client";

const REVIEWS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: `CUSTOMER ${i + 1}`,
  text: "EXCEPTIONAL QUALITY. THE MINIMALIST DESIGN FITS PERFECTLY WITH MY AESTHETIC. SHARP EDGES AND PREMIUM FEEL.",
  rating: "5.0"
}));

export default function ProductReviews() {
  return (
    <div 
        className="relative w-screen -ml-[calc(50vw-50%)]" 
        style={{ height: `${REVIEWS.length * 50}vh` }}
    >
        {REVIEWS.map((review, index) => (
          <div 
            key={review.id} 
            className="sticky top-0 w-full h-screen flex flex-col items-center justify-center bg-white border-t-4 border-black px-10"
            style={{ zIndex: index + 1 }}
          >
            <div className="max-w-4xl w-full">
              <span className="text-sm font-mono mb-4 block">REVIEW {index + 1} / 12</span>
              <h2 className="text-6xl md:text-8xl font-serif leading-none tracking-tighter mb-8">
                "{review.text}"
              </h2>
              <div className="flex justify-between items-end border-t-2 border-black pt-6">
                <div>
                  <p className="text-2xl font-bold uppercase">{review.name}</p>
                  <p className="text-sm opacity-60">VERIFIED PURCHASE</p>
                </div>
                <p className="text-4xl font-mono">({review.rating})</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
