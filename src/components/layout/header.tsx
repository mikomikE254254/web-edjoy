'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/men', label: 'Men' },
    { href: '/women', label: 'Women' },
    { href: '/children', label: 'Children' },
  ];

  return (
    <header className="sticky top-0 z-50 flex justify-center py-4">
      <nav className="flex gap-2 bg-gray-100 p-1 rounded-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              path === item.href
                ? 'bg-black text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
