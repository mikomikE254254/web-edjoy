'use client';

import { useState, useEffect } from 'react';
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
import { cn } from '@/lib/utils';

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
  
  const line1Text = "Creative Developer";
  const line2Text = "MICHAEL MUCHEMI";
  const colors = [
    'text-blue-500', 
    'text-green-500', 
    'text-purple-500', 
    'text-pink-500', 
    'text-orange-500'
  ];

  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [nameColorClass, setNameColorClass] = useState('text-black');

  useEffect(() => {
    let isMounted = true;
    const typeDelay = 100;
    const eraseDelay = 50;
    const pauseDelay = 2000;

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const runAnimation = async () => {
      while (isMounted) {
        // Typing phase
        setShowCursor1(true);
        setShowCursor2(false);
        setTypedText2('');
        setNameColorClass('text-black');

        for (let i = 0; i <= line1Text.length; i++) {
          if (!isMounted) return;
          setTypedText1(line1Text.substring(0, i));
          await delay(typeDelay);
        }

        setShowCursor1(false);
        setShowCursor2(true);

        for (let i = 0; i <= line2Text.length; i++) {
          if (!isMounted) return;
          setTypedText2(line2Text.substring(0, i));
          await delay(typeDelay + 20);
        }
        
        let colorInterval: NodeJS.Timeout | undefined;
        if (isMounted) {
            let colorIndex = 0;
            colorInterval = setInterval(() => {
                if (!isMounted) {
                    if (colorInterval) clearInterval(colorInterval);
                    return;
                }
                setNameColorClass(colors[colorIndex % colors.length]);
                colorIndex++;
            }, 500);
        }

        await delay(pauseDelay);
        if (isMounted && colorInterval) clearInterval(colorInterval);

        // Erasing phase
        if (!isMounted) return;
        for (let i = line2Text.length; i >= 0; i--) {
          if (!isMounted) return;
          setTypedText2(line2Text.substring(0, i));
          await delay(eraseDelay);
        }
        
        if (!isMounted) return;
        setShowCursor1(true);
        setShowCursor2(false);
        
        for (let i = line1Text.length; i >= 0; i--) {
          if (!isMounted) return;
          setTypedText1(line1Text.substring(0, i));
          await delay(eraseDelay);
        }

        if (!isMounted) return;
        await delay(500);
      }
    };

    runAnimation();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white text-zinc-800 font-sans w-full py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Hero Section */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-black min-h-[48px] md:min-h-[72px]">
          {typedText1}
          {showCursor1 && <span className="typing-cursor">|</span>}
        </h1>
        <h2 className={cn(
            "text-4xl md:text-6xl font-serif font-bold min-h-[40px] md:min-h-[64px] mt-2 transition-colors duration-300", 
            nameColorClass
        )}>
          {typedText2}
          {showCursor2 && <span className="typing-cursor">|</span>}
        </h2>
        
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
                        A digital wizard who turns caffeine into code. I specialize in wrangling rogue semicolons and convincing computers to do my bidding. When I'm not building beautiful websites, I'm probably arguing with my linter or searching for the perfect GIF.
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
                        <ServiceItem title="Website Sorcery" description="Summoning responsive and blazing-fast websites out of thin air (and a lot of code)." />
                        <ServiceItem title="Pixel Perfecting" description="Obsessively aligning pixels until your UI is so beautiful it makes grown designers weep." />
                        <ServiceItem title="Shopping Cart Herding" description="Taming wild e-commerce platforms to boost sales and make checkout a breeze." />
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
