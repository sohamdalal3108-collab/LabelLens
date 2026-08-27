'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PlusCircle,
  Camera,
  History,
  FileText,
  Settings,
  Scale,
  CheckCircle2,
  Info
} from 'lucide-react';

const NAV_ITEMS = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'New Inspection',
    href: '/inspection/new',
    icon: PlusCircle
  },
  {
    name: 'Field Scanner',
    href: '/inspection/scan',
    icon: Camera
  },
  {
    name: 'Current Results',
    href: '/inspection/results',
    icon: Scale
  },
  {
    name: 'Inspection History',
    href: '/inspection/history',
    icon: History
  },
  {
    name: 'Reports & Notices',
    href: '/reports',
    icon: FileText
  },
  {
    name: 'Settings & Rules',
    href: '/settings',
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-60 flex-col border-r border-[#E5E2D9] bg-white p-3 space-y-4 shrink-0">
      {/* Navigation section */}
      <nav className="space-y-1 flex-1">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
          INSPECTION SUITE
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-950 font-bold border-l-2 border-orange-600 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-[#FAF8F4] font-medium'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-neutral-500'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Official Legal Metrology Notice footer */}
      <div className="p-3 rounded-lg bg-[#FAF8F4] border border-[#E5E2D9] text-[11px] text-neutral-600 space-y-1.5">
        <div className="flex items-center gap-1.5 text-neutral-900 font-bold text-xs">
          <Info className="w-3.5 h-3.5 text-orange-600 shrink-0" />
          <span>Statutory Framework</span>
        </div>
        <p className="leading-relaxed text-[10px] text-neutral-600">
          Legal Metrology (Packaged Commodities) Rules, 2011. AI findings assist officers; human officer verification is mandatory.
        </p>
      </div>
    </aside>
  );
}

