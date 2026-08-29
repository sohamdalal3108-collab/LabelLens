'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { useDemoMode } from '@/lib/context/DemoModeContext';
import { useInspection } from '@/lib/context/InspectionContext';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RecentInspections } from '@/components/dashboard/RecentInspections';
import {
  Plus,
  Camera,
  FileCheck2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  QrCode,
  Info,
  Scale
} from 'lucide-react';

export default function DashboardPage() {
  const { officer } = useAuth();
  const { isDemoMode } = useDemoMode();
  const { inspections, metrics, isLoadingRecords } = useInspection();

  const totalInspections = metrics.total;
  const violations = metrics.violations;
  const verifiedCompliant = metrics.compliant;
  const pendingManualReview = metrics.manualReview;

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DBD6CA]">
        <div>
          <div className="text-[11px] font-bold text-orange-600 font-mono uppercase tracking-wider mb-0.5">
            LEGAL METROLOGY DIVISION // FIELD OPERATIONAL UNIT
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
            Field Inspection Dashboard
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Review packaged commodity inspections and verify AI-assisted statutory findings.
          </p>
        </div>

        {/* Primary and Secondary Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/inspection/scan"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white hover:bg-[#FAF8F4] text-neutral-800 border border-[#DBD6CA] text-xs font-bold transition-colors shadow-xs"
          >
            <Camera className="w-4 h-4 text-neutral-600" />
            <span>Scan Package</span>
          </Link>

          <Link
            href="/inspection/new"
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-all hover:translate-y-[-0.5px]"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Inspection</span>
          </Link>
        </div>
      </div>

      {/* Summary Statistics Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
            Operational Summary
          </span>
          {isDemoMode && (
            <span className="text-[11px] text-amber-800 font-mono font-bold">
              Prototype Demo Data
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard
            title="Total Inspections"
            value={totalInspections}
            subtitle="Logged inspection records"
            icon={FileCheck2}
            variant="default"
          />

          <MetricCard
            title="Potential Violations"
            value={violations}
            subtitle="Flagged non-compliances"
            icon={AlertTriangle}
            variant="violation"
          />

          <MetricCard
            title="Pending Manual Review"
            value={pendingManualReview}
            subtitle="Uncertain OCR / Field glare"
            icon={HelpCircle}
            variant="review"
          />

          <MetricCard
            title="Verified Compliant"
            value={verifiedCompliant}
            subtitle="Fully compliant labels"
            icon={ShieldCheck}
            variant="compliant"
          />
        </div>
      </div>

      {/* Main Section: Recent Inspections Table */}
      <RecentInspections inspections={inspections} />

      {/* Quick statutory guidance banner */}
      <div className="p-4 rounded-lg bg-white border border-[#DBD6CA] shadow-xs flex items-start gap-3 text-xs text-neutral-600">
        <Scale className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-neutral-900 block text-xs uppercase tracking-wide">
            Officer Verification & Legal Authority Notice
          </span>
          <p className="text-[11px] text-neutral-600 leading-relaxed">
            LabelLens AI extracts declarations and checks Legal Metrology (Packaged Commodities) Rules, 2011 clauses as an assistive tool. Inspecting officers must verify physical evidence before issuing notices under Section 36 of the Legal Metrology Act, 2009.
          </p>
        </div>
      </div>
    </div>
  );
}

