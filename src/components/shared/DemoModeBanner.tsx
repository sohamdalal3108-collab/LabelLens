'use client';

import React from 'react';
import { useDemoMode } from '@/lib/context/DemoModeContext';
import { Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function DemoModeBanner() {
  const { isDemoMode, toggleDemoMode } = useDemoMode();

  if (!isDemoMode) {
    return null;
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-900">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-300 text-[11px]">
            <Info className="w-3 h-3 text-amber-700 shrink-0" />
            Prototype Demo Data
          </span>
          <span className="text-amber-800/90 text-xs hidden md:inline font-medium">
            Active inspection profiles are pre-configured sample commodities for SIH evaluation.
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/inspection/new"
            className="text-orange-700 hover:text-orange-800 font-bold inline-flex items-center gap-1"
          >
            <span>Load Demo Packages</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={toggleDemoMode}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold"
            title="Toggle between Live API and Demo Mode"
          >
            <span className="text-[11px]">Demo Mode: ON</span>
          </button>
        </div>
      </div>
    </div>
  );
}

