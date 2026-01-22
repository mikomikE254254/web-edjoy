import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const collections = [
  {
    title: 'WOMEN',
    items: ['Dresses', 'Two-Piece Sets', 'Tops', 'Sweaters'],
    href: '/women',
    style: { background: 'linear-gradient(180deg, #8a5a44, #3c2a1e)' },
    isImage: false,
    imageHint: '',
  },
  {
    title: 'UNISEX',
    items: ['Sweaters', 'Accessories', 'Casual Wear', 'Outerwear'],
    href: '/unisex',
    style: {},
    imageHint: 'cat-bag',
    isImage: true,
  },
  {
    title: 'MEN',
    items: ['T-Shirts & Polos', 'Official Shirts', 'Casual Shirts', 'Suits & Blazers'],
    href: '/men',
    style: { background: 'linear-gradient(180deg, #58504a, #1f1c1a)' },
    isImage: false,
    imageHint: '',
  },
];

type CollectionCardProps = (typeof collections)[0];

const CollectionCard = ({ title, items, href, style, imageHint, isImage }: CollectionCardProps) => {
  const bgImage = PlaceHolderImages.find(p => p.id === imageHint);
  const cardStyle = isImage && bgImage
    ? { backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.4), rgba(0,0,0,.9)), url(${bgImage.imageUrl})` }
    : style;

  return (
    <div
      style={cardStyle}
      className="w-[300px] h-[380px] rounded-[28px] p-8 text-white flex flex-col justify-between shrink-0 bg-center bg-cover"
    >
      <div>
        <h3 className="text-[22px] tracking-wider font-semibold">{title}</h3>
        <ul className="list-none p-0 my-4 space-y-1">
          {items.map(item => <li key={item} className="opacity-90 text-sm">{item}</li>)}
        </ul>
      </div>
      <Link href={href} passHref>
        <button className="bg-white text-black border-none rounded-full py-3.5 px-6 font-semibold cursor-pointer w-full text-center hover:bg-gray-200 transition-colors">
          Explore {title}
        </button>
      </Link>
    </div>
  );
};


export default function CollectionMarquee() {
  const allCards = [...collections, ...collections]; // Duplicate for seamless loop

  return (
    <section className="py-12 bg-transparent overflow-hidden">
      <div className="overflow-hidden w-full">
        <div className="flex gap-8 w-max animate-scroll">
          {allCards.map((collection, index) => (
            <CollectionCard key={`${collection.title}-${index}`} {...collection} />
          ))}
        </div>
      </div>
    </section>
  );
}
