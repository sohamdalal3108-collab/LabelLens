'use client';

import React from 'react';
import { ComplianceStatus } from '@/lib/types/inspection';
import { CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck } from 'lucide-react';

interface ComplianceBadgeProps {
  status: ComplianceStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function ComplianceBadge({ status, size = 'md', showIcon = true }: ComplianceBadgeProps) {
  let label = 'Status Unknown';
  let shortLabel = 'Unknown';
  let badgeClass = 'bg-neutral-100 text-neutral-700 border-neutral-300';
  let icon = <HelpCircle className="w-3.5 h-3.5" />;

  switch (status) {
    case 'COMPLIANT':
      label = 'Verified Compliant';
      shortLabel = 'Compliant';
      badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold';
      icon = <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5 text-emerald-600'} />;
      break;
    case 'POTENTIAL_VIOLATION':
      label = 'Potential Violation';
      shortLabel = 'Violation';
      badgeClass = 'bg-red-50 text-red-800 border-red-300 font-bold';
      icon = <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5 text-red-600'} />;
      break;
    case 'MANUAL_REVIEW':
      label = 'Manual Review Required';
      shortLabel = 'Manual Review';
      badgeClass = 'bg-amber-50 text-amber-800 border-amber-300 font-bold';
      icon = <HelpCircle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5 text-amber-600'} />;
      break;
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] font-bold',
    md: 'px-2.5 py-1 text-xs font-bold',
    lg: 'px-3 py-1.5 text-sm font-bold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border ${badgeClass} ${sizeClasses[size]}`}
    >
      {showIcon && icon}
      <span>{size === 'sm' ? shortLabel : label}</span>
    </span>
  );
}

