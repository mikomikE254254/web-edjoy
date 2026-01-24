
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const devImage = PlaceHolderImages.find(p => p.id === 'developer-portrait');

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-sm overflow-hidden shadow-lg rounded-2xl border-2 border-black">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full">
            {devImage ? (
              <Image
                src={devImage.imageUrl}
                alt={devImage.description}
                fill
                className="object-cover"
                data-ai-hint={devImage.imageHint}
                sizes="(max-width: 640px) 100vw, 384px"
              />
            ) : (
              <div className="bg-gray-200 h-full w-full" />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-4">
            <CardTitle className="text-2xl">Meet The Developer</CardTitle>
            <p className="text-muted-foreground">
                Have a project in mind? Let's talk.
            </p>
            <Button asChild className="w-full" size="lg">
                <Link href="tel:+254793832286">
                    <Phone className="mr-2 h-5 w-5" />
                    +254 793 832286
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
