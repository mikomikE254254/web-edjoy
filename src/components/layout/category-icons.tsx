import { Drama, Shirt, Footprints } from 'lucide-react';
import React from 'react';

const iconCategories = [
    { name: 'Hats', icon: <Drama className="w-8 h-8" /> },
    { name: 'T-Shirts', icon: <Shirt className="w-8 h-8" /> },
    { name: 'Trousers', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 22L14 14.5M8 22L10 14.5M10 14.5L12 3L14 14.5M10 14.5H14"></path></svg> },
    { name: 'Shoes', icon: <Footprints className="w-8 h-8" /> },
];


export default function CategoryIcons() {
    return (
        <section className="py-8 sm:py-12 bg-background">
            <div className="container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-around items-center divide-x divide-border">
                    {iconCategories.map((category) => (
                        <div key={category.name} className="flex-1 flex justify-center">
                            <div className="flex flex-col items-center gap-3 text-center group cursor-pointer">
                                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center transition-colors group-hover:bg-accent">
                                    <div className="text-muted-foreground transition-colors group-hover:text-accent-foreground">
                                        {category.icon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
