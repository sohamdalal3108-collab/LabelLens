'use client';

import React, { useState, useEffect } from 'react';
import { useInspection } from '@/lib/context/InspectionContext';
import { ReportPreview } from '@/components/reports/ReportPreview';
import { Scale } from 'lucide-react';

export default function ReportsPage() {
  const { inspections, activeInspection, setActiveInspection } = useInspection();
  const [selectedId, setSelectedId] = useState<string>(activeInspection?.id || '');

  useEffect(() => {
    if (activeInspection?.id) {
      setSelectedId(activeInspection.id);
    } else if (inspections.length > 0) {
      setSelectedId(inspections[0].id);
      setActiveInspection(inspections[0]);
    }
  }, [activeInspection, inspections, setActiveInspection]);

  const handleSelectRecord = (id: string) => {
    setSelectedId(id);
    const found = inspections.find((r) => r.id === id);
    if (found) {
      setActiveInspection(found);
    }
  };

  const currentRecord = inspections.find((r) => r.id === selectedId) || activeInspection || (inspections.length > 0 ? inspections[0] : null);

  return (
    <div className="space-y-6">
      {/* Switcher Bar */}
      <div className="no-print p-4 rounded-lg bg-white border border-[#DBD6CA] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#FAF8F4] border border-[#DBD6CA] flex items-center justify-center text-orange-600">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
              Select Inspection Record for Statutory Notice Preview
            </h2>
            <p className="text-[11px] text-neutral-500">Legal Metrology (Packaged Commodities) Rules, 2011</p>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedId}
            onChange={(e) => handleSelectRecord(e.target.value)}
            className="w-full sm:w-80 px-3 py-2 text-xs bg-[#FAF8F4] border border-[#DBD6CA] rounded text-neutral-900 focus:outline-none focus:border-orange-500 font-medium shadow-2xs"
          >
            {inspections.map((item) => (
              <option key={item.id} value={item.id}>
                {item.inspectionNumber} — {item.brandName} ({item.status.replace(/_/g, ' ')})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Report Sheet */}
      {currentRecord ? (
        <ReportPreview inspection={currentRecord} />
      ) : (
        <div className="p-8 text-center text-neutral-500 text-xs rounded-lg bg-white border border-[#DBD6CA] shadow-xs">
          Loading report preview...
        </div>
      )}
    </div>
  );
}

