'use client';

import React from 'react';

export function SkeletonLoader({ className = 'h-6 w-full' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-slate-800/80 border border-slate-700/40 ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
      <div className="flex justify-between items-center">
        <SkeletonLoader className="h-5 w-32" />
        <SkeletonLoader className="h-6 w-20 rounded-full" />
      </div>
      <SkeletonLoader className="h-10 w-full" />
      <div className="space-y-2">
        <SkeletonLoader className="h-4 w-5/6" />
        <SkeletonLoader className="h-4 w-4/6" />
      </div>
    </div>
  );
}
