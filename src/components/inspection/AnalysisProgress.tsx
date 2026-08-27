'use client';

import React from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

interface AnalysisProgressProps {
  currentStep: number;
  logs?: string[];
}

const STAGES = [
  { step: 1, label: 'Image quality & perspective check' },
  { step: 2, label: 'OCR statutory text extraction' },
  { step: 3, label: 'Legal field identification' },
  { step: 4, label: 'Rules 6, 7 & 12 compliance evaluation' },
  { step: 5, label: 'Spatial evidence assembly' }
];

export function AnalysisProgress({ currentStep, logs = [] }: AnalysisProgressProps) {
  return (
    <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-sm p-6 sm:p-7 max-w-md mx-auto space-y-6">
      <div className="space-y-1">
        <div className="text-[11px] font-bold text-orange-600 font-mono uppercase tracking-wider">
          AI PIPELINE EXECUTION
        </div>
        <h2 className="text-lg font-black text-neutral-900 tracking-tight">
          Processing Label Evidence
        </h2>
        <p className="text-xs text-neutral-500">
          Evaluating declarations under Legal Metrology (Packaged Commodities) Rules, 2011.
        </p>
      </div>

      {/* Clean 5-Stage Checklist */}
      <div className="space-y-2">
        {STAGES.map((stage) => {
          const isDone = currentStep > stage.step;
          const isCurrent = currentStep === stage.step;

          return (
            <div
              key={stage.step}
              className={`flex items-center gap-3 p-2.5 rounded-md border text-xs font-semibold transition-colors ${
                isCurrent
                  ? 'bg-orange-50 border-orange-300 text-orange-950 shadow-2xs'
                  : isDone
                  ? 'bg-[#FAF8F4] border-[#E5E2D9] text-neutral-800'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-400'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-orange-600 animate-spin" />
                ) : (
                  <Circle className="w-4 h-4 text-neutral-300" />
                )}
              </div>
              <span className={isCurrent ? 'font-bold text-neutral-900' : isDone ? 'text-neutral-800' : 'text-neutral-400'}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Terminal log snippet if available */}
      {logs.length > 0 && (
        <div className="p-3 rounded-md bg-neutral-900 border border-neutral-800 font-mono text-[11px] text-neutral-300 space-y-1">
          <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider pb-1 border-b border-neutral-800">
            Pipeline Activity
          </div>
          <div className="space-y-1 pt-1 max-h-24 overflow-y-auto">
            {logs.slice(-3).map((log, idx) => (
              <div key={idx} className="text-neutral-200">
                <span className="text-orange-400 mr-1.5">&gt;</span>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

