'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { InspectionRecord, ComplianceStatus } from '@/lib/types/inspection';
import { InspectionService } from '@/lib/api/inspectionService';
import { ComplianceBadge } from '@/components/shared/ComplianceBadge';
import { formatDateTime } from '@/lib/utils/formatters';
import { Search, Eye, Filter, Download, Plus, Camera } from 'lucide-react';

export default function HistoryPage() {
  const [inspections, setInspections] = useState<InspectionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  useEffect(() => {
    async function loadData() {
      try {
        const records = await InspectionService.getInspections();
        setInspections(records);
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = inspections.filter((item) => {
    const matchesSearch =
      item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inspectionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.commodityCategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DBD6CA]">
        <div>
          <div className="text-[11px] font-bold text-orange-600 font-mono uppercase tracking-wider mb-0.5">
            CASE AUDIT TRAIL
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
            Inspection Case History Log
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Permanent records of field verifications conducted under Legal Metrology Rules, 2011
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/inspection/scan"
            className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-white hover:bg-[#FAF8F4] text-neutral-800 border border-[#DBD6CA] text-xs font-bold transition-colors shadow-xs"
          >
            <Camera className="w-3.5 h-3.5 text-neutral-600" />
            <span>Scan Package</span>
          </Link>
          <Link
            href="/inspection/new"
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Inspection</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-lg bg-white border border-[#DBD6CA] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by ID, Brand or Commodity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F4] border border-[#DBD6CA] rounded text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 font-mono shadow-2xs"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs font-bold">
          {[
            { key: 'ALL', label: 'All Cases' },
            { key: 'POTENTIAL_VIOLATION', label: 'Violations' },
            { key: 'MANUAL_REVIEW', label: 'Manual Review' },
            { key: 'COMPLIANT', label: 'Compliant' }
          ].map((status) => (
            <button
              key={status.key}
              onClick={() => setSelectedStatus(status.key)}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap text-xs ${
                selectedStatus === status.key
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-[#FAF8F4] text-neutral-600 hover:text-neutral-900 border border-[#DBD6CA]'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs data-table">
            <thead>
              <tr>
                <th className="px-4 py-3">Inspection ID</th>
                <th className="px-4 py-3">Commodity & Brand</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Legal Findings</th>
                <th className="px-4 py-3">Officer Sign-Off</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE9E0]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                    No inspection cases found matching the search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FBF9F5] transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-neutral-900 whitespace-nowrap">
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
                          <div className="font-bold text-neutral-900">{item.brandName}</div>
                          <div className="text-[11px] text-neutral-500">{item.commodityCategory}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 whitespace-nowrap font-mono text-[11px]">
                      {formatDateTime(item.timestamp)}
                    </td>
                    <td className="px-4 py-3">
                      {item.violations.length > 0 ? (
                        <span className="text-red-700 font-bold">
                          {item.violations.length} violation{item.violations.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium">All clauses passed</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-neutral-700 text-[11px]">
                      {item.officerVerification ? (
                        <span className="font-mono text-neutral-900 font-semibold">
                          {item.officerVerification.officerName}
                        </span>
                      ) : (
                        <span className="text-amber-700 font-semibold italic">Pending Sign-off</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <ComplianceBadge status={item.status} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Link
                        href={`/inspection/${item.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
