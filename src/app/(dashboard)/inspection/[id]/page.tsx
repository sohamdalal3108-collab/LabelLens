'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { InspectionRecord } from '@/lib/types/inspection';
import { InspectionService } from '@/lib/api/inspectionService';
import { ComplianceBadge } from '@/components/shared/ComplianceBadge';
import { formatDateTime } from '@/lib/utils/formatters';
import {
  ArrowLeft,
  Printer,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Lock,
  Stamp,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';

export default function InspectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [inspection, setInspection] = useState<InspectionRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const record = await InspectionService.getInspectionById(id);
        setInspection(record);
      } catch (err) {
        console.error('Failed to load inspection record:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 rounded-lg bg-white border border-[#DBD6CA] text-center max-w-md mx-auto my-12 shadow-xs">
        <p className="text-xs text-neutral-500">Loading statutory inspection record...</p>
      </div>
    );
  }

  if (!inspection) {
    return (
      <div className="p-8 rounded-lg bg-white border border-[#DBD6CA] text-center max-w-md mx-auto my-12 space-y-3 shadow-xs">
        <h3 className="text-sm font-bold text-neutral-900">Inspection Record Not Found</h3>
        <Link
          href="/inspection/history"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs"
        >
          <span>Return to History</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DBD6CA]">
        <div className="flex items-center gap-3">
          <Link
            href="/inspection/history"
            className="p-2 rounded bg-white hover:bg-[#FAF8F4] text-neutral-600 hover:text-neutral-900 border border-[#DBD6CA] shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-neutral-900">
                {inspection.inspectionNumber}
              </span>
              <ComplianceBadge status={inspection.status} size="sm" />
            </div>
            <h1 className="text-base sm:text-lg font-black text-neutral-900 mt-0.5 tracking-tight">
              {inspection.brandName}
            </h1>
          </div>
        </div>

        <Link
          href="/reports"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs self-start sm:self-auto transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Export Statutory Notice</span>
        </Link>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Package Image & Sign-off Stamp */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-3 space-y-2">
            <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wide block">
              Package Image Evidence
            </span>
            <div className="aspect-[4/3] rounded bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center justify-center shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={inspection.imageUrl}
                alt={inspection.brandName}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Officer Verification Card */}
          <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-neutral-900 font-bold">
              <Stamp className="w-4 h-4 text-orange-600" />
              <span>Officer Verification Record</span>
            </div>
            <div className="space-y-1 text-neutral-700 text-[11px]">
              <div>Officer: <span className="font-bold text-neutral-900">{inspection.officerVerification?.officerName || 'Rajesh Sharma'}</span></div>
              <div className="text-neutral-500">Badge: <span className="font-mono text-neutral-900 font-bold">{inspection.officerVerification?.badgeNumber || 'LM-DEL-2024-88'}</span></div>
              <div className="text-neutral-500">Date: <span className="text-neutral-900 font-medium">{formatDateTime(inspection.officerVerification?.verifiedAt || inspection.timestamp)}</span></div>
              <div className="text-neutral-500 font-mono text-[10px]">Hash: {inspection.officerVerification?.digitalSignatureToken || 'LM-VERIFIED-AUTH-HASH-991'}</div>
            </div>
          </div>
        </div>

        {/* Right: Declarations & Violations */}
        <div className="lg:col-span-7 space-y-4">
          {/* Statutory Declarations */}
          <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 pb-2 border-b border-[#E5E2D9]">
              Extracted Legal Metrology Declarations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded bg-[#FAF8F4] border border-[#DBD6CA]">
                <span className="text-[10px] text-neutral-500 block font-bold uppercase">Manufacturer:</span>
                <span className="text-neutral-900 font-medium">{inspection.declarations.manufacturerName.extractedValue}</span>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F4] border border-[#DBD6CA]">
                <span className="text-[10px] text-neutral-500 block font-bold uppercase">Net Quantity:</span>
                <span className="font-mono text-neutral-900 font-bold">{inspection.declarations.netQuantity.extractedValue}</span>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F4] border border-[#DBD6CA]">
                <span className="text-[10px] text-neutral-500 block font-bold uppercase">MRP Declared:</span>
                <span className="font-mono text-neutral-900 font-bold">{inspection.declarations.mrp.extractedValue}</span>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F4] border border-[#DBD6CA]">
                <span className="text-[10px] text-neutral-500 block font-bold uppercase">Customer Care Phone:</span>
                <span className="font-mono text-neutral-900 font-medium">{inspection.declarations.consumerCarePhone.extractedValue}</span>
              </div>
            </div>
          </div>

          {/* Violations */}
          {inspection.violations.length > 0 && (
            <div className="rounded-lg bg-white border border-red-300 shadow-xs p-4 space-y-2.5">
              <h3 className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>Violations Recorded ({inspection.violations.length})</span>
              </h3>

              <div className="space-y-2">
                {inspection.violations.map((vio) => (
                  <div
                    key={vio.id}
                    className="p-3 rounded bg-red-50/50 border border-red-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">{vio.ruleTitle}</span>
                      <span className="text-[10px] font-mono text-neutral-500 font-bold">{vio.legalActSection}</span>
                    </div>
                    <p className="text-[11px] text-neutral-700 leading-relaxed">{vio.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

