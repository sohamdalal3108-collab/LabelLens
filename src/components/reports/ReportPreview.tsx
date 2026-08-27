'use client';

import React from 'react';
import { InspectionRecord } from '@/lib/types/inspection';
import { formatDateTime } from '@/lib/utils/formatters';
import { Printer, ShieldCheck, Scale, AlertTriangle, CheckCircle2, FileText, Stamp } from 'lucide-react';

interface ReportPreviewProps {
  inspection: InspectionRecord;
}

export function ReportPreview({ inspection }: ReportPreviewProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const hasViolations = inspection.violations.length > 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="no-print p-4 rounded-lg bg-white border border-[#DBD6CA] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-black text-neutral-900">Legal Metrology Statutory Notice / Report</h2>
          <p className="text-xs text-neutral-500">Formal inspection record evaluated under Legal Metrology Rules, 2011</p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-bold shadow-xs transition-all hover:translate-y-[-0.5px]"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export Statutory Notice</span>
        </button>
      </div>

      {/* Printable Report Sheet */}
      <div className="p-8 sm:p-10 rounded-lg bg-white border border-[#DBD6CA] text-neutral-900 shadow-sm space-y-6 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Report Header */}
        <div className="text-center pb-5 border-b border-[#DBD6CA] print:border-neutral-900 space-y-1">
          <div className="text-[10px] font-bold text-orange-600 font-mono uppercase tracking-widest print:text-neutral-700">
            DEPARTMENT OF CONSUMER AFFAIRS // LEGAL METROLOGY DIVISION
          </div>
          <div className="font-black text-xl tracking-tight text-neutral-900 print:text-black">
            FIELD INSPECTION & STATUTORY COMPLIANCE REPORT
          </div>
          <p className="text-xs text-neutral-600 print:text-neutral-700 max-w-xl mx-auto">
            Evaluation under Legal Metrology Act, 2009 read with Legal Metrology (Packaged Commodities) Rules, 2011
          </p>
        </div>

        {/* Metadata Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-md bg-[#FAF8F4] print:bg-neutral-100 border border-[#DBD6CA] print:border-neutral-300 text-xs">
          <div>
            <span className="text-neutral-500 print:text-neutral-600 block text-[10px] uppercase font-bold">Case Record ID</span>
            <span className="font-mono font-bold text-neutral-900 print:text-black">{inspection.inspectionNumber}</span>
          </div>
          <div>
            <span className="text-neutral-500 print:text-neutral-600 block text-[10px] uppercase font-bold">Inspection Date & Time</span>
            <span className="font-medium text-neutral-900 print:text-black">{formatDateTime(inspection.timestamp)}</span>
          </div>
          <div>
            <span className="text-neutral-500 print:text-neutral-600 block text-[10px] uppercase font-bold">Inspecting Officer</span>
            <span className="font-bold text-neutral-900 print:text-black">
              {inspection.officerVerification?.officerName || 'Rajesh Sharma'}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 print:text-neutral-600 block text-[10px] uppercase font-bold">Compliance Verdict</span>
            <span className={`font-black ${hasViolations ? 'text-red-700 print:text-red-800' : 'text-emerald-700 print:text-green-800'}`}>
              {inspection.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        {/* Section 1: Inspected Commodity & Package Image */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-800 print:text-black pb-1 border-b border-[#E5E2D9] print:border-neutral-300">
            1. Inspected Commodity Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2 space-y-2">
              <div className="p-3 rounded bg-[#FAF8F4] print:bg-white border border-[#DBD6CA] print:border-neutral-300">
                <span className="text-neutral-500 print:text-neutral-600 block text-[10px] font-bold uppercase">Commodity / Brand:</span>
                <span className="font-bold text-neutral-900 print:text-black text-sm">{inspection.declarations.productName.extractedValue}</span>
              </div>
              <div className="p-3 rounded bg-[#FAF8F4] print:bg-white border border-[#DBD6CA] print:border-neutral-300">
                <span className="text-neutral-500 print:text-neutral-600 block text-[10px] font-bold uppercase">Manufacturer / Packer Declaration:</span>
                <span className="text-neutral-900 print:text-black font-medium">{inspection.declarations.manufacturerName.extractedValue}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded bg-[#FAF8F4] print:bg-white border border-[#DBD6CA] print:border-neutral-300">
                  <span className="text-neutral-500 print:text-neutral-600 block text-[10px] font-bold uppercase">Net Quantity:</span>
                  <span className="font-mono font-bold text-neutral-900 print:text-black">{inspection.declarations.netQuantity.extractedValue}</span>
                </div>
                <div className="p-2.5 rounded bg-[#FAF8F4] print:bg-white border border-[#DBD6CA] print:border-neutral-300">
                  <span className="text-neutral-500 print:text-neutral-600 block text-[10px] font-bold uppercase">MRP Declared:</span>
                  <span className="font-mono font-bold text-neutral-900 print:text-black">{inspection.declarations.mrp.extractedValue}</span>
                </div>
              </div>
            </div>

            {/* Package Image thumbnail in report */}
            <div className="rounded bg-[#FAF8F4] print:bg-white border border-[#DBD6CA] print:border-neutral-300 p-2.5 flex flex-col items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={inspection.imageUrl}
                alt="Package Evidence"
                className="max-h-36 object-contain rounded"
              />
              <span className="text-[10px] text-neutral-500 print:text-neutral-600 mt-1 font-mono">Physical Label Evidence</span>
            </div>
          </div>
        </div>

        {/* Section 2: Extracted Declarations Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-800 print:text-black pb-1 border-b border-[#E5E2D9] print:border-neutral-300">
            2. Mandatory Statutory Declarations (Legal Metrology Rules, 2011)
          </h3>
          <table className="w-full text-left text-xs data-table">
            <thead>
              <tr>
                <th className="px-3.5 py-2.5">Declaration Field</th>
                <th className="px-3.5 py-2.5">Declared Value on Physical Label</th>
                <th className="px-3.5 py-2.5 text-right">OCR Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE9E0] print:divide-neutral-300 text-neutral-900 print:text-black">
              {Object.values(inspection.declarations).map((field) => (
                <tr key={field.key}>
                  <td className="px-3.5 py-2 font-bold text-neutral-900 print:text-black">{field.label}</td>
                  <td className="px-3.5 py-2 font-mono text-neutral-800 print:text-black">
                    {field.officerEditedValue ? (
                      <span className="text-orange-950 font-bold">
                        {field.officerEditedValue} (Officer Corrected)
                      </span>
                    ) : (
                      field.extractedValue
                    )}
                  </td>
                  <td className="px-3.5 py-2 text-right font-mono font-medium">{Math.round(field.confidence * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Compliance Findings */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-800 print:text-black pb-1 border-b border-[#E5E2D9] print:border-neutral-300">
            3. Observed Legal Findings & Statutory Citations
          </h3>
          {hasViolations ? (
            <div className="space-y-2.5">
              {inspection.violations.map((vio, idx) => (
                <div
                  key={vio.id}
                  className="p-3.5 rounded bg-red-50/60 print:bg-neutral-50 border border-red-200 print:border-neutral-300 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-800 print:text-red-900">
                      Finding #{idx + 1}: {vio.ruleTitle}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-600 print:text-black font-bold">
                      {vio.legalActSection}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-800 print:text-neutral-900 leading-relaxed">{vio.description}</p>
                  <div className="text-[11px] text-red-900 print:text-red-900 bg-white p-2 rounded border border-red-200 font-medium">
                    <span className="font-bold">Statutory Remedy:</span> {vio.suggestedAction}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded bg-emerald-50 print:bg-neutral-50 border border-emerald-200 print:border-neutral-300 text-xs text-emerald-800 print:text-green-900 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All mandatory package declarations satisfy Rules 6, 7 & 9 of Legal Metrology (Packaged Commodities) Rules, 2011.</span>
            </div>
          )}
        </div>

        {/* Section 4: Officer Determination & Signature */}
        <div className="pt-6 border-t-2 border-[#DBD6CA] print:border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-neutral-900 print:text-black uppercase tracking-wide">
              Official Verification & Seal
            </div>
            <div className="text-neutral-600 print:text-neutral-700 text-[11px]">
              Inspecting Officer: <span className="font-bold text-neutral-900">{inspection.officerVerification?.officerName || 'Rajesh Sharma'}</span>
            </div>
            <div className="text-neutral-600 print:text-neutral-700 text-[11px]">
              Designation: {inspection.officerVerification?.officerDesignation || 'Senior Legal Metrology Inspector'}
            </div>
            <div className="text-[10px] text-orange-700 print:text-black font-mono">
              Digital Signature Token: {inspection.officerVerification?.digitalSignatureToken || 'LM-VERIFIED-AUTH-TOKEN-991'}
            </div>
          </div>

          <div className="p-4 rounded-md border-2 border-dashed border-[#DBD6CA] print:border-neutral-900 text-center min-w-[200px] bg-[#FAF8F4] print:bg-white space-y-1">
            <Stamp className="w-5 h-5 text-orange-600 mx-auto print:text-black" />
            <span className="text-[10px] uppercase font-black text-neutral-900 print:text-black block tracking-wider">
              OFFICIAL FIELD SEAL
            </span>
            <span className="text-[9px] text-neutral-500 print:text-neutral-600 font-mono block">
              Legal Metrology Division
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

