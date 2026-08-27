'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'compliant' | 'violation' | 'review';
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default'
}: MetricCardProps) {
  const variantStyles = {
    default: {
      border: 'border-[#DBD6CA] hover:border-neutral-400',
      iconColor: 'text-neutral-700 bg-neutral-100 border-neutral-300'
    },
    compliant: {
      border: 'border-emerald-200 hover:border-emerald-400',
      iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    violation: {
      border: 'border-red-200 hover:border-red-400',
      iconColor: 'text-red-700 bg-red-50 border-red-200'
    },
    review: {
      border: 'border-amber-200 hover:border-amber-400',
      iconColor: 'text-amber-700 bg-amber-50 border-amber-200'
    }
  };

  const style = variantStyles[variant];

  return (
    <div className={`p-4 rounded-lg bg-white border ${style.border} shadow-xs transition-colors space-y-2`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">{title}</span>
        <div className={`w-8 h-8 rounded border flex items-center justify-center ${style.iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-mono tracking-tight">{value}</div>
        {subtitle && <div className="text-[11px] text-neutral-500 font-medium mt-0.5">{subtitle}</div>}
      </div>
    </div>
  );
}

