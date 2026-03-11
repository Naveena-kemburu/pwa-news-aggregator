'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/newsApi';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export default function Navbar() {
  const pathname = usePathname();
  const isOnline = useOnlineStatus();

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            News PWA
          </Link>
          
          <div className="flex items-center gap-4">
            {!isOnline && (
              <span className="text-sm bg-red-600 px-3 py-1 rounded">
                Offline
              </span>
            )}
            <Link
              href="/bookmarks"
              className={`hover:text-gray-300 ${
                pathname === '/bookmarks' ? 'text-gray-300' : ''
              }`}
            >
              Bookmarks
            </Link>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className={`px-4 py-2 rounded whitespace-nowrap capitalize ${
                pathname === `/category/${category}`
                  ? 'bg-white text-black'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
