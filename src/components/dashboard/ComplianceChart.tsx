'use client';

import React from 'react';
import { InspectionRecord } from '@/lib/types/inspection';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export function ComplianceChart({ inspections }: { inspections: InspectionRecord[] }) {
  const total = inspections.length || 1;
  const compliant = inspections.filter((i) => i.status === 'COMPLIANT').length;
  const violations = inspections.filter((i) => i.status === 'POTENTIAL_VIOLATION').length;
  const manual = inspections.filter((i) => i.status === 'MANUAL_REVIEW').length;

  const compliantPct = Math.round((compliant / total) * 100);
  const violationsPct = Math.round((violations / total) * 100);
  const manualPct = Math.round((manual / total) * 100);

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-100">Legal Compliance Distribution</h3>
        <p className="text-xs text-slate-400">Classification ratio under Packaged Commodities Rules 2011</p>
      </div>

      {/* Segmented progress bar */}
      <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 gap-0.5 border border-slate-700/60">
        <div
          className="bg-emerald-500 rounded-l-full transition-all duration-700 hover:opacity-90"
          style={{ width: `${compliantPct}%` }}
          title={`Compliant: ${compliantPct}%`}
        />
        <div
          className="bg-rose-500 transition-all duration-700 hover:opacity-90"
          style={{ width: `${violationsPct}%` }}
          title={`Violations: ${violationsPct}%`}
        />
        <div
          className="bg-amber-500 rounded-r-full transition-all duration-700 hover:opacity-90"
          style={{ width: `${manualPct}%` }}
          title={`Manual Review: ${manualPct}%`}
        />
      </div>

      {/* Legend stats */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
        <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Compliant</span>
          </div>
          <div className="text-lg font-bold text-slate-100 mt-1">{compliant}</div>
          <div className="text-[10px] text-slate-400">{compliantPct}% of total</div>
        </div>

        <div className="p-2 rounded-xl bg-rose-500/5 border border-rose-500/20">
          <div className="flex items-center justify-center gap-1 text-rose-400 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Violations</span>
          </div>
          <div className="text-lg font-bold text-slate-100 mt-1">{violations}</div>
          <div className="text-[10px] text-slate-400">{violationsPct}% of total</div>
        </div>

        <div className="p-2 rounded-xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Review Req.</span>
          </div>
          <div className="text-lg font-bold text-slate-100 mt-1">{manual}</div>
          <div className="text-[10px] text-slate-400">{manualPct}% of total</div>
        </div>
      </div>
    </div>
  );
}
