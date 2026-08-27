'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PlusCircle, Camera, History, FileText } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();

  const NAV_LINKS = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/inspection/scan', label: 'Scanner', icon: Camera },
    { href: '/inspection/new', label: 'New', icon: PlusCircle, isCenter: true },
    { href: '/inspection/results', label: 'Results', icon: FileText },
    { href: '/inspection/history', label: 'History', icon: History }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E2D9] px-2 py-1 shadow-md">
      <div className="flex items-center justify-around">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
          const Icon = link.icon;

          if (link.isCenter) {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center -mt-4"
              >
                <div className="w-11 h-11 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md border-2 border-white hover:bg-orange-700 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-orange-600 font-bold mt-0.5">{link.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center py-1 px-3 rounded text-[10px] font-medium transition-colors ${
                isActive ? 'text-orange-600 font-bold' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

