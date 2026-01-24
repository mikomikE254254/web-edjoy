'use client';

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
  <div className="text-right sm:text-left">
    <p className="text-4xl font-serif text-black">{value}</p>
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
  </div>
);

export default function ContactPage() {
  const devImage = PlaceHolderImages.find(p => p.id === 'developer-portrait-new');

  const services = ["Website Sorcery", "Pixel Perfecting", "Shopping Cart Herding", "Animation"];

  return (
    <div className="bg-white max-w-4xl mx-auto w-full rounded-3xl shadow-lg p-6 sm:p-12 relative">
      
      <header className="mb-16 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-serif mb-2 text-black">Michael Muchemi</h1>
        <p className="text-2xl md:text-3xl text-gray-700">Creative Developer</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="space-y-6 text-sm font-bold tracking-widest uppercase">
            <div className="border-b border-gray-100 pb-4">
                <h3 className="text-gray-400">Biography</h3>
                <p className="font-normal normal-case text-gray-600 mt-2 leading-relaxed">
                    A digital wizard who turns caffeine into code. I specialize in wrangling rogue semicolons and convincing computers to do my bidding.
                </p>
            </div>
            <div className="border-b border-gray-100 pb-4">
                <h3 className="text-gray-400">Contact</h3>
                <div className="space-y-1 mt-2 font-normal normal-case">
                    <p className="text-gray-600">Nairobi, Kenya</p>
                    <Link href="mailto:contact@eddjoys.ke" className="text-black font-medium hover:underline block">contact@eddjoys.ke</Link>
                    <Link href="tel:+254793832286" className="text-black font-medium hover:underline block">+254 793 832286</Link>
                </div>
            </div>
            <div>
                <h3>Services</h3>
                <ul className="text-gray-600 font-normal normal-case space-y-1 mt-2">
                  {services.map(service => <li key={service}>{service}</li>)}
                </ul>
            </div>
          </div>
          
          <div className="flex justify-center order-first md:order-none">
              <div className="w-64 h-80 rounded-full overflow-hidden flex items-end border-2 border-gray-100 shadow-inner">
                  {devImage ? (
                      <Image
                          src={devImage.imageUrl}
                          alt={devImage.description || 'Developer Portrait'}
                          width={256}
                          height={320}
                          className="w-full h-full object-cover object-top"
                          data-ai-hint={devImage.imageHint}
                          priority
                      />
                  ) : (
                      <div className="w-full h-full bg-gray-200" />
                  )}
              </div>
          </div>

          <div className="space-y-6">
              <StatItem value="5+" label="Years of Experience" />
              <StatItem value="99%" label="Satisfaction Clients" />
              <StatItem value="80+" label="Clients on Worldwide" />
              <StatItem value="100+" label="Projects Done" />
          </div>
      </div>

      <div className="mt-20 flex justify-center gap-x-8 md:gap-x-12 border-t border-gray-100 pt-10 text-zinc-400 grayscale hover:grayscale-0 transition-all duration-300">
          <SiJavascript size={32} title="JavaScript" className="hover:text-yellow-400" />
          <SiTypescript size={32} title="TypeScript" className="hover:text-blue-500" />
          <SiPython size={32} title="Python" className="hover:text-yellow-500" />
          <SiRust size={32} title="Rust" className="hover:text-orange-600" />
          <SiGo size={32} title="Go" className="hover:text-cyan-400" />
          <SiPhp size={32} title="PHP" className="hover:text-indigo-400" />
      </div>
    </div>
  );
}
