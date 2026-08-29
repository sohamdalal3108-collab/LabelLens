'use client';

import React from 'react';
import Link from 'next/link';
import { InspectionRecord } from '@/lib/types/inspection';
import { useInspection } from '@/lib/context/InspectionContext';
import { ComplianceBadge } from '@/components/shared/ComplianceBadge';
import { formatDateTime } from '@/lib/utils/formatters';
import { ArrowRight, Eye, Camera, QrCode, UploadCloud } from 'lucide-react';

interface RecentInspectionsProps {
  inspections: InspectionRecord[];
}

export function RecentInspections({ inspections }: RecentInspectionsProps) {
  const { setActiveInspection } = useInspection();

  const getMethodLabel = (mode: string) => {
    switch (mode) {
      case 'QR_CODE':
        return { label: 'QR Scan', icon: <QrCode className="w-3.5 h-3.5 text-neutral-600" /> };
      case 'CAMERA_CAPTURE':
        return { label: 'Camera', icon: <Camera className="w-3.5 h-3.5 text-neutral-600" /> };
      default:
        return { label: 'Image Upload', icon: <UploadCloud className="w-3.5 h-3.5 text-neutral-600" /> };
    }
  };

  return (
    <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs overflow-hidden">
      <div className="p-4 border-b border-[#E5E2D9] bg-[#FAF8F4] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-neutral-900">Recent Field Inspections</h3>
          <p className="text-xs text-neutral-500">Packaged commodities evaluated under Legal Metrology Rules, 2011</p>
        </div>
        <Link
          href="/inspection/history"
          className="text-xs font-bold text-orange-700 hover:text-orange-800 inline-flex items-center gap-1"
        >
          <span>View Complete Log</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs data-table">
          <thead>
            <tr>
              <th className="px-4 py-3">Inspection ID</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Date / Time</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDE9E0]">
            {inspections.slice(0, 6).map((item) => {
              const method = getMethodLabel(item.inputMode);
              return (
                <tr key={item.id} className="hover:bg-[#FBF9F5] transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-neutral-900">
                    {item.inspectionNumber}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-neutral-100 border border-[#DBD6CA] overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.thumbnailUrl || item.imageUrl}
                          alt={item.brandName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 line-clamp-1">{item.brandName}</div>
                        <div className="text-[11px] text-neutral-500">{item.commodityCategory}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600 whitespace-nowrap font-mono text-[11px]">
                    {formatDateTime(item.timestamp)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#E5E2D9] text-[11px] text-neutral-700 font-medium">
                      {method.icon}
                      <span>{method.label}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <ComplianceBadge status={item.status} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/inspection/${item.id}`}
                      onClick={() => setActiveInspection(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

