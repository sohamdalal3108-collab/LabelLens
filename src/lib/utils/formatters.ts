import { ComplianceStatus, ConfidenceLevel } from '@/lib/types/inspection';

export function formatDateTime(isoString?: string): string {
  if (!isoString) return 'N/A';
  try {
    const d = new Date(isoString);
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return isoString;
  }
}

export function formatDateOnly(isoString?: string): string {
  if (!isoString) return 'N/A';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return isoString;
  }
}

export function getConfidenceInfo(score: number): {
  level: ConfidenceLevel;
  percentage: number;
  label: string;
  badgeClass: string;
  barColor: string;
} {
  const percentage = Math.round(score * 100);
  if (score >= 0.85) {
    return {
      level: 'HIGH',
      percentage,
      label: 'High Confidence',
      badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      barColor: 'bg-emerald-500'
    };
  }
  if (score >= 0.6) {
    return {
      level: 'MEDIUM',
      percentage,
      label: 'Medium Confidence',
      badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      barColor: 'bg-amber-500'
    };
  }
  return {
    level: 'LOW',
    percentage,
    label: 'Low Confidence (Review Req.)',
    badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    barColor: 'bg-rose-500'
  };
}

export function getComplianceStatusInfo(status: ComplianceStatus): {
  label: string;
  shortLabel: string;
  badgeClass: string;
  bgGradient: string;
  iconName: string;
} {
  switch (status) {
    case 'COMPLIANT':
      return {
        label: 'VERIFIED COMPLIANT',
        shortLabel: 'Compliant',
        badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        bgGradient: 'from-emerald-500/20 to-teal-500/10',
        iconName: 'CheckCircle2'
      };
    case 'POTENTIAL_VIOLATION':
      return {
        label: 'POTENTIAL VIOLATIONS DETECTED',
        shortLabel: 'Violation',
        badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
        bgGradient: 'from-rose-500/20 to-red-500/10',
        iconName: 'AlertTriangle'
      };
    case 'MANUAL_REVIEW':
      return {
        label: 'MANUAL OFFICER REVIEW REQUIRED',
        shortLabel: 'Manual Review',
        badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
        bgGradient: 'from-amber-500/20 to-yellow-500/10',
        iconName: 'HelpCircle'
      };
    default:
      return {
        label: 'STATUS UNKNOWN',
        shortLabel: 'Unknown',
        badgeClass: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
        bgGradient: 'from-slate-500/20 to-slate-500/10',
        iconName: 'Info'
      };
  }
}
