'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { useDemoMode } from '@/lib/context/DemoModeContext';
import {
  ShieldCheck,
  Plus,
  Camera,
  User,
  LogOut,
  ChevronDown,
  Info
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { officer, logout } = useAuth();
  const { isDemoMode, toggleDemoMode } = useDemoMode();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.replace('/login');
  };

  // Derive simple breadcrumb or section title
  const getSectionTitle = () => {
    if (pathname.startsWith('/inspection/new')) return 'New Inspection Intake';
    if (pathname.startsWith('/inspection/scan')) return 'Field Camera & Barcode Scanner';
    if (pathname.startsWith('/inspection/analyzing')) return 'AI Analysis Pipeline';
    if (pathname.startsWith('/inspection/results')) return 'Inspection Results & Officer Verification';
    if (pathname.startsWith('/inspection/history')) return 'Inspection History Log';
    if (pathname.startsWith('/inspection/')) return 'Inspection Record';
    if (pathname.startsWith('/reports')) return 'Reports & Statutory Notices';
    if (pathname.startsWith('/settings')) return 'System Settings & Statutory Rules';
    return 'Field Inspection Dashboard';
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#E5E2D9] bg-white px-4 sm:px-6">
      <div className="flex h-15 items-center justify-between">
        {/* Left: Brand & Current Section */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center font-bold shadow-xs transition-transform group-hover:scale-105">
              <span className="text-orange-500 text-base font-black">L</span>
              <span className="text-white text-sm font-extrabold">L</span>
            </div>
            <div>
              <div className="font-extrabold text-sm text-neutral-900 leading-none flex items-center gap-1">
                <span>LabelLens</span>
                <span className="text-[10px] text-orange-600 font-bold px-1 rounded bg-orange-50 border border-orange-200">
                  AI
                </span>
              </div>
              <div className="text-[10px] text-neutral-500 font-medium leading-tight hidden sm:block">
                Legal Metrology Inspection
              </div>
            </div>
          </Link>

          <div className="h-4 w-px bg-[#E5E2D9] hidden md:block" />

          <div className="text-xs font-bold text-neutral-700 hidden md:block">
            {getSectionTitle()}
          </div>
        </div>

        {/* Right: Quick actions & Officer profile */}
        <div className="flex items-center gap-3">
          {/* Demo Mode indicator */}
          <button
            onClick={toggleDemoMode}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-xs border font-semibold transition-colors ${
              isDemoMode
                ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                : 'bg-[#FAF8F4] border-[#DBD6CA] text-neutral-600 hover:text-neutral-900'
            }`}
            title="Toggle Demo Mock Mode vs Live API Mode"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isDemoMode ? 'bg-amber-600' : 'bg-neutral-400'}`} />
            <span>{isDemoMode ? 'Demo Data Mode' : 'Live API Mode'}</span>
          </button>

          {/* Quick New Inspection Button */}
          <Link
            href="/inspection/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-all hover:translate-y-[-0.5px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Inspection</span>
          </Link>

          {/* Officer profile dropdown */}
          {officer && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded hover:bg-[#FAF8F4] border border-transparent hover:border-[#E5E2D9] transition-colors"
              >
                <div className="w-7 h-7 rounded bg-neutral-900 text-orange-400 font-bold text-xs flex items-center justify-center">
                  {officer.name.charAt(0)}
                </div>
                <div className="text-left hidden lg:block text-xs">
                  <div className="font-bold text-neutral-900 leading-tight">{officer.name}</div>
                  <div className="text-[10px] text-neutral-500 leading-tight font-mono">{officer.badgeNumber}</div>
                </div>
                <ChevronDown className="w-3 h-3 text-neutral-500 hidden sm:block" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-64 rounded-lg bg-white border border-[#DBD6CA] shadow-lg z-50 p-1.5 text-xs animate-in fade-in"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#E5E2D9]">
                    <div className="font-bold text-neutral-900">{officer.name}</div>
                    <div className="text-[11px] text-neutral-600">{officer.designation}</div>
                    <div className="text-[10px] text-orange-700 font-mono font-semibold mt-0.5">{officer.circleZone}</div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-3 py-1.5 text-neutral-700 hover:bg-[#FAF8F4] rounded transition-colors font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Officer Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded transition-colors text-left font-medium cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

