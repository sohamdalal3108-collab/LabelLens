'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { OfficerDecision, OfficerVerification, InspectionRecord } from '@/lib/types/inspection';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  RotateCcw,
  Lock,
  Stamp,
  ArrowRight,
  UserCheck,
  Scale,
  FileWarning
} from 'lucide-react';
import Link from 'next/link';

interface OfficerActionPanelProps {
  inspection: InspectionRecord;
  onFinalize: (verification: OfficerVerification) => Promise<void>;
}

export function OfficerActionPanel({ inspection, onFinalize }: OfficerActionPanelProps) {
  const { officer } = useAuth();
  const [decision, setDecision] = useState<OfficerDecision>('CONFIRMED');
  const [notes, setNotes] = useState('');
  const [seizureRecommended, setSeizureRecommended] = useState(false);
  const [noticeIssued, setNoticeIssued] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinalized, setIsFinalized] = useState(Boolean(inspection.officerVerification));

  const handleFinalize = async () => {
    if (!officer) return;

    setIsSubmitting(true);
    try {
      const signatureHash = `LM-SIG-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now()}`;

      const verification: OfficerVerification = {
        officerId: officer.id,
        officerName: officer.name,
        officerDesignation: officer.designation,
        badgeNumber: officer.badgeNumber,
        decision,
        confirmedViolations: inspection.violations.map((v) => v.id),
        dismissedViolations: [],
        officerNotes: notes || 'Verified in field compliance inspection under Legal Metrology Rules, 2011.',
        verifiedAt: new Date().toISOString(),
        digitalSignatureToken: signatureHash,
        seizureRecommended,
        noticeIssued
      };

      await onFinalize(verification);
      setIsFinalized(true);
    } catch (err) {
      console.error('Finalization error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E2D9]">
        <div>
          <div className="text-[11px] font-bold text-orange-600 font-mono uppercase tracking-wider">
            OFFICER DETERMINATION
          </div>
          <h3 className="text-sm font-black text-neutral-900 tracking-tight">
            Statutory Verification & Sign-off
          </h3>
          <p className="text-xs text-neutral-500">
            AI extracts data. Inspecting officers determine legal status under Legal Metrology Act, 2009.
          </p>
        </div>

        {officer && (
          <div className="text-left sm:text-right text-xs bg-[#FAF8F4] p-2 rounded border border-[#DBD6CA]">
            <span className="font-bold text-neutral-900">{officer.name}</span>
            <span className="text-[10px] text-neutral-500 font-mono block">{officer.badgeNumber}</span>
          </div>
        )}
      </div>

      {isFinalized ? (
        <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-300 space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Inspection Verified & Formally Recorded</span>
          </div>
          <div className="text-xs text-neutral-800 space-y-0.5">
            <div>Inspecting Officer: <span className="font-bold">{officer?.name}</span> ({officer?.badgeNumber})</div>
            <div className="text-neutral-500 text-[11px]">
              Verification Token: <span className="font-mono text-neutral-900 font-bold">{inspection.officerVerification?.digitalSignatureToken || 'VERIFIED-SIG-OK'}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/reports"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Statutory Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-xs">
          {/* Action Selector */}
          <div>
            <label className="font-bold text-neutral-800 uppercase tracking-wide block mb-1.5 text-xs">
              Officer Statutory Determination:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setDecision('CONFIRMED')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  decision === 'CONFIRMED'
                    ? 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-500 shadow-xs'
                    : 'bg-[#FAF8F4] border-[#DBD6CA] hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-neutral-900">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Confirm Findings</span>
                  </span>
                  {decision === 'CONFIRMED' && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">Endorse AI detected violations</div>
              </button>

              <button
                type="button"
                onClick={() => setDecision('REJECTED')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  decision === 'REJECTED'
                    ? 'bg-red-50/80 border-red-600 ring-1 ring-red-500 shadow-xs'
                    : 'bg-[#FAF8F4] border-[#DBD6CA] hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-neutral-900">
                  <span className="flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Overrule / Reject</span>
                  </span>
                  {decision === 'REJECTED' && <span className="w-2 h-2 rounded-full bg-red-600" />}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">Overrule and mark compliant</div>
              </button>

              <button
                type="button"
                onClick={() => setDecision('MODIFIED')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  decision === 'MODIFIED'
                    ? 'bg-amber-50/80 border-amber-600 ring-1 ring-amber-500 shadow-xs'
                    : 'bg-[#FAF8F4] border-[#DBD6CA] hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-neutral-900">
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-amber-600" />
                    <span>Request Recheck</span>
                  </span>
                  {decision === 'MODIFIED' && <span className="w-2 h-2 rounded-full bg-amber-600" />}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">Flag for secondary test</div>
              </button>
            </div>
          </div>

          {/* Statutory Directives */}
          <div className="p-3.5 rounded-lg bg-[#FAF8F4] border border-[#DBD6CA] space-y-2">
            <span className="font-bold text-neutral-900 block text-xs uppercase tracking-wide">
              Enforcement Directives:
            </span>
            <div className="space-y-2 text-xs text-neutral-700">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={noticeIssued}
                  onChange={(e) => setNoticeIssued(e.target.checked)}
                  className="rounded border-[#DBD6CA] text-orange-600 focus:ring-orange-500"
                />
                <span>Issue Statutory Notice under Section 36 of Legal Metrology Act, 2009</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={seizureRecommended}
                  onChange={(e) => setSeizureRecommended(e.target.checked)}
                  className="rounded border-[#DBD6CA] text-red-600 focus:ring-red-500"
                />
                <span className="text-red-700">Recommend seizure of non-standard commodity packages</span>
              </label>
            </div>
          </div>

          {/* Officer Field Notes */}
          <div>
            <label className="font-bold text-neutral-800 uppercase tracking-wide block mb-1 text-xs">
              Inspecting Officer Notes / Verification Remarks:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Physical sample inspected at retail shelf. Verified font height and MRP sticker."
              className="w-full p-2.5 text-xs bg-[#FAF8F4] border border-[#DBD6CA] rounded text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 shadow-2xs font-sans"
            />
          </div>

          {/* Finalize Button */}
          <button
            onClick={handleFinalize}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs shadow-xs transition-all hover:translate-y-[-0.5px] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            <span>
              {isSubmitting ? 'Recording Verification...' : 'Sign & Finalize Statutory Record'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

