'use client';

import React from 'react';
import { getConfidenceInfo } from '@/lib/utils/formatters';

interface ConfidenceBadgeProps {
  score: number;
  showBar?: boolean;
  size?: 'sm' | 'md';
}

export function ConfidenceBadge({ score, showBar = false, size = 'md' }: ConfidenceBadgeProps) {
  const percentage = Math.round(score * 100);
  const isHigh = score >= 0.85;
  const isMedium = score >= 0.60;

  const colorStyle = isHigh
    ? 'text-emerald-800 bg-emerald-50 border-emerald-300'
    : isMedium
    ? 'text-amber-800 bg-amber-50 border-amber-300'
    : 'text-red-800 bg-red-50 border-red-300';

  const dotColor = isHigh ? 'bg-emerald-600' : isMedium ? 'bg-amber-600' : 'bg-red-600';

  return (
    <div className="inline-flex items-center gap-1.5 font-mono">
      <span
        className={`inline-flex items-center gap-1.5 rounded-sm border font-bold ${colorStyle} ${
          size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'
        }`}
        title={`${percentage}% OCR extraction confidence (Subject to officer verification)`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
        <span>{percentage}% OCR</span>
      </span>

      {showBar && (
        <div className="w-10 h-1 bg-[#E5E2D9] rounded-full overflow-hidden">
          <div
            className={`h-full ${dotColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

