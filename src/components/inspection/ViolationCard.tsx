'use client';

import React, { useState } from 'react';
import { RuleViolation } from '@/lib/types/inspection';
import { AlertTriangle, Scale, Check, X, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface ViolationCardProps {
  violation: RuleViolation;
  isSelected?: boolean;
  onSelect?: () => void;
  onDismissViolation?: (violationId: string, reason: string) => void;
  onReinstateViolation?: (violationId: string) => void;
  onOpenRuleDetails?: (ruleCode: string) => void;
}

export function ViolationCard({
  violation,
  isSelected = false,
  onSelect,
  onDismissViolation,
  onReinstateViolation,
  onOpenRuleDetails
}: ViolationCardProps) {
  const [showDismissInput, setShowDismissInput] = useState(false);
  const [dismissReason, setDismissReason] = useState('');
  const [expanded, setExpanded] = useState(true);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (dismissReason.trim()) {
      onDismissViolation?.(violation.id, dismissReason);
      setShowDismissInput(false);
    }
  };

  const isDismissed = violation.isDismissedByOfficer;

  return (
    <div
      onClick={onSelect}
      className={`rounded-lg border transition-all cursor-pointer p-4.5 ${
        isDismissed
          ? 'bg-neutral-100 border-neutral-300 opacity-60'
          : isSelected
          ? 'bg-red-50/60 border-red-500 ring-1 ring-red-400 shadow-xs'
          : 'bg-white border-red-200 hover:border-red-400 shadow-2xs'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div
            className={`p-1.5 rounded border mt-0.5 ${
              isDismissed
                ? 'bg-neutral-200 text-neutral-500 border-neutral-300'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs font-bold ${
                  isDismissed ? 'line-through text-neutral-500' : 'text-neutral-900'
                }`}
              >
                {violation.ruleTitle}
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase border ${
                  violation.severity === 'CRITICAL'
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}
              >
                {violation.severity}
              </span>
            </div>
            <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
              {violation.legalActSection}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="text-neutral-500 hover:text-neutral-900"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-2.5 text-xs">
          <p className="text-neutral-700 leading-relaxed bg-[#FAF8F4] p-3 rounded-md border border-[#E5E2D9] text-[11px]">
            {violation.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded bg-white border border-red-200">
              <span className="text-neutral-500 block font-bold text-[10px] uppercase">Detected Observation:</span>
              <span className="text-red-700 font-mono font-bold">
                {violation.extractedValueFound}
              </span>
            </div>
            <div className="p-2.5 rounded bg-white border border-emerald-200">
              <span className="text-neutral-500 block font-bold text-[10px] uppercase">Statutory Requirement:</span>
              <span className="text-emerald-700 font-mono font-bold">
                {violation.expectedRequirement}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-[#FAF8F4] border border-[#E5E2D9] flex items-start gap-2 text-[11px]">
            <Scale className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block text-[10px] uppercase">Recommended Officer Action:</span>
              <span className="text-neutral-700 font-medium">{violation.suggestedAction}</span>
            </div>
          </div>

          {/* Officer Dismissal State / Actions */}
          {isDismissed ? (
            <div className="p-2.5 rounded bg-neutral-50 border border-neutral-300 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-amber-800 font-bold block uppercase">Dismissed by Officer</span>
                <span className="text-[11px] text-neutral-600 italic">
                  Reason: {violation.officerDismissReason || 'Manual override'}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReinstateViolation?.(violation.id);
                }}
                className="px-2.5 py-1 text-xs rounded bg-white hover:bg-neutral-100 text-neutral-800 border border-[#DBD6CA] font-semibold shadow-2xs"
              >
                Reinstate Finding
              </button>
            </div>
          ) : showDismissInput ? (
            <div className="p-3 rounded bg-amber-50 border border-amber-300 space-y-2" onClick={(e) => e.stopPropagation()}>
              <span className="text-[11px] font-bold text-amber-900 block">Officer Reason for Dismissal:</span>
              <input
                type="text"
                placeholder="e.g. Visual verification confirms exemption under Rule 26"
                value={dismissReason}
                onChange={(e) => setDismissReason(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-amber-300 rounded text-neutral-900 focus:outline-none focus:border-orange-500 shadow-2xs"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setShowDismissInput(false)}
                  className="px-2.5 py-1 rounded text-xs text-neutral-600 hover:text-neutral-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDismiss}
                  disabled={!dismissReason.trim()}
                  className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold shadow-2xs"
                >
                  Confirm Dismissal
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-1 text-[11px]">
              {onOpenRuleDetails && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenRuleDetails(violation.ruleCode);
                  }}
                  className="text-orange-700 hover:text-orange-800 flex items-center gap-1 font-bold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Rule Reference</span>
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDismissInput(true);
                }}
                className="text-neutral-500 hover:text-neutral-900 underline ml-auto font-medium"
              >
                Dismiss Finding (Officer Override)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

