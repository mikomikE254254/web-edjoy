
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiRust,
  SiGo,
  SiPhp,
} from 'react-icons/si';

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center md:text-left">
    <p className="text-4xl font-bold font-serif text-black">{value}</p>
    <p className="text-sm uppercase tracking-widest text-zinc-500">{label}</p>
  </div>
);

const ServiceItem = ({ title, description }: { title: string; description: string }) => (
    <div>
        <h3 className="font-bold text-black">{title}</h3>
        <p className="text-zinc-600 mt-1">{description}</p>
    </div>
);


export default function ContactPage() {
  const devImage = PlaceHolderImages.find(p => p.id === 'developer-portrait');

  return (
    <div className="bg-white text-zinc-800 font-sans w-full py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Hero Section */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-black">
          Creative Developer
        </h1>
        <p className="mt-2 text-lg text-zinc-600">Based in Nairobi, Kenya</p>
        
        {devImage && (
             <div className="relative w-48 h-64 mt-8 overflow-hidden rounded-[100px]">
                <Image
                    src={devImage.imageUrl}
                    alt={devImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={devImage.imageHint}
                    sizes="192px"
                    priority
                />
            </div>
        )}

        {/* Content Columns */}
        <div className="grid md:grid-cols-2 gap-16 mt-16 w-full text-left">
            {/* Left Column */}
            <div className="space-y-12">
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Biography</h2>
                    <p className="text-zinc-600 leading-relaxed">
                        A passionate developer with a knack for creating elegant solutions in the least amount of time. I specialize in full-stack development, turning complex problems into beautiful, intuitive designs.
                    </p>
                </div>
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Contact</h2>
                     <div className="space-y-2">
                        <p className="text-zinc-600">Nairobi, Kenya</p>
                        <Link href="mailto:contact@eddjoys.ke" className="text-black font-medium hover:underline">contact@eddjoys.ke</Link>
                        <br/>
                        <Link href="tel:+254793832286" className="text-black font-medium hover:underline">+254 793 832286</Link>
                    </div>
                </div>
                 <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Services</h2>
                    <div className="space-y-6">
                        <ServiceItem title="Website Development" description="Creating responsive and high-performing websites from scratch." />
                        <ServiceItem title="UI/UX Design" description="Designing user-friendly interfaces that are both beautiful and functional." />
                        <ServiceItem title="E-commerce Solutions" description="Building online stores that drive sales and provide a seamless customer experience." />
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
                <StatItem value="5+" label="Years of Experience" />
                <StatItem value="99%" label="Client Satisfaction" />
                <StatItem value="100+" label="Projects Completed" />
            </div>
        </div>

        {/* Language Badges */}
        <div className="w-full border-t border-zinc-200 mt-24 pt-12">
            <div className="flex justify-center items-center gap-x-8 md:gap-x-12 text-zinc-400 grayscale hover:grayscale-0 transition-all duration-300">
                <SiJavascript size={32} title="JavaScript" className="hover:text-yellow-400" />
                <SiTypescript size={32} title="TypeScript" className="hover:text-blue-500" />
                <SiPython size={32} title="Python" className="hover:text-yellow-500" />
                <SiRust size={32} title="Rust" className="hover:text-orange-600" />
                <SiGo size={32} title="Go" className="hover:text-cyan-400" />
                <SiPhp size={32} title="PHP" className="hover:text-indigo-400" />
            </div>
        </div>

      </div>
    </div>
  );
}
