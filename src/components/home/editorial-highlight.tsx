import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function EditorialHighlight() {
  const wideImage = PlaceHolderImages.find(p => p.id === 'editorial-wide');

  return (
    <section className="my-12">
      <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Large Image (top-left) */}
          <div className="md:col-span-2 relative h-64 md:h-auto md:aspect-[1.7/1] rounded-2xl overflow-hidden group">
            <video
              src="https://videos.pexels.com/video-files/5985293/5985293-hd_1280_720_25fps.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Tall Image (top-right, spans 2 rows on md) */}
          <div className="md:row-span-2 relative h-96 md:h-auto rounded-2xl overflow-hidden group">
            <video
              src="https://videos.pexels.com/video-files/8061114/8061114-sd_540_960_30fps.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Container for Small Image & Text (second row, left) */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative aspect-square w-full sm:w-48 sm:h-48 shrink-0 rounded-2xl overflow-hidden group">
              <video
                src="https://videos.pexels.com/video-files/4434230/4434230-sd_640_640_25fps.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-semibold mb-2">Season Highlight</h2>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Carefully curated fashion pieces designed with elegance,
                simplicity, and modern style in mind.
              </p>
            </div>
          </div>

          {/* Wide Image (bottom) */}
          <div className="md:col-span-3 relative h-56 rounded-2xl overflow-hidden group">
            {wideImage && (
              <Image
                src={wideImage.imageUrl}
                alt={wideImage.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={wideImage.imageHint}
                sizes="100vw"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
