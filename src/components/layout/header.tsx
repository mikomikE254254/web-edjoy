'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import CartSidebar from '@/components/cart/CartSidebar';

export default function Header() {
  const path = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/men', label: 'Men' },
    { href: '/women', label: 'Women' },
    { href: '/children', label: 'Unisex' },
    { href: '/bags', label: 'Bags' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
      }`}
    >
      <div className="w-auto flex items-center gap-2 bg-gray-100/80 backdrop-blur-sm p-1 rounded-full shadow-lg ring-1 ring-black ring-opacity-5 mx-4">
        <div className="flex-grow overflow-x-auto no-scrollbar">
          <nav className="flex gap-2 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  path === item.href
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="pr-2">
            <CartSidebar />
        </div>
      </div>
    </header>
  );
}
