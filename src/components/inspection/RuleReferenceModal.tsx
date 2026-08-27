'use client';

import React, { useState, useEffect } from 'react';
import { LEGAL_METROLOGY_RULES_2011 } from '@/config/legalMetrologyRules';
import { LegalMetrologyRule } from '@/lib/types/compliance';
import { BookOpen, X, Search, Scale, Check, AlertOctagon } from 'lucide-react';

interface RuleReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRuleCode?: string;
}

export function RuleReferenceModal({
  isOpen,
  onClose,
  initialRuleCode
}: RuleReferenceModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    if (initialRuleCode) {
      const rule = LEGAL_METROLOGY_RULES_2011.find((r) => r.ruleCode === initialRuleCode);
      if (rule) {
        setSearchQuery(rule.ruleNumber);
      }
    } else {
      setSearchQuery('');
    }
  }, [initialRuleCode, isOpen]);

  if (!isOpen) return null;

  const filteredRules = LEGAL_METROLOGY_RULES_2011.filter((rule) => {
    const matchesCategory = selectedCategory === 'ALL' || rule.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      searchQuery === '' ||
      rule.ruleNumber.toLowerCase().includes(q) ||
      rule.ruleTitle.toLowerCase().includes(q) ||
      rule.officialDescription.toLowerCase().includes(q) ||
      rule.ruleCode.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border border-[#DBD6CA] rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#E5E2D9] bg-[#FAF8F4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-white border border-[#DBD6CA] flex items-center justify-center text-orange-600 shadow-2xs">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-neutral-900">Legal Metrology Rules, 2011 Reference</h2>
              <p className="text-[11px] text-neutral-500">
                Statutory handbook & penalty schedule for field officers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 border border-[#DBD6CA] shadow-2xs transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3.5 border-b border-[#E5E2D9] bg-white space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by rule clause, e.g. Rule 6, MRP, Font height, Net weight..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF8F4] border border-[#DBD6CA] rounded-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 shadow-2xs font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs font-bold">
            {['ALL', 'GENERAL_DECLARATIONS', 'NET_QUANTITY', 'MRP', 'CONSUMER_CARE', 'PRINCIPAL_DISPLAY_PANEL'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'bg-[#FAF8F4] text-neutral-600 hover:text-neutral-900 border border-[#DBD6CA]'
                  }`}
                >
                  {cat.replace(/_/g, ' ')}
                </button>
              )
            )}
          </div>
        </div>

        {/* Rules List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F7F5F0]">
          {filteredRules.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500 bg-white rounded-lg border border-[#DBD6CA]">
              No statutory clauses found matching &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredRules.map((rule) => (
              <div
                key={rule.ruleCode}
                className="p-4 rounded-lg bg-white border border-[#DBD6CA] shadow-2xs space-y-2.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200 text-xs">
                    {rule.ruleNumber}
                  </span>
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">
                    {rule.category.replace(/_/g, ' ')}
                  </span>
                </div>

                <h4 className="font-bold text-neutral-900 text-xs">{rule.ruleTitle}</h4>
                <p className="text-neutral-600 text-[11px] leading-relaxed bg-[#FAF8F4] p-2.5 rounded border border-[#E5E2D9]">
                  {rule.officialDescription}
                </p>

                {/* Mandatory Requirements */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Mandatory Requirements:
                  </span>
                  {rule.mandatedRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-neutral-800">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>

                {/* Minimum Font Table if present */}
                {rule.minimumFontRequirements && (
                  <div className="mt-2 p-2.5 rounded bg-[#FAF8F4] border border-[#DBD6CA] text-[11px]">
                    <span className="font-bold text-neutral-900 block mb-1.5">
                      Rule 7 Table 1: Minimum Font Heights by Package Area
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center">
                      {rule.minimumFontRequirements.map((f, i) => (
                        <div key={i} className="p-1.5 rounded bg-white border border-[#DBD6CA]">
                          <div className="text-[10px] text-neutral-500 font-medium">{f.packageArea}</div>
                          <div className="text-xs font-black text-neutral-900 font-mono mt-0.5">{f.minHeightMm} mm</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Penalty Citation */}
                <div className="p-2.5 rounded bg-red-50/70 border border-red-200 flex items-start gap-2 text-[11px]">
                  <AlertOctagon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-900 block text-[10px] uppercase">Statutory Penalty Reference:</span>
                    <span className="text-neutral-800">{rule.applicablePenaltySection}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E5E2D9] bg-[#FAF8F4] flex items-center justify-between text-xs text-neutral-600">
          <span className="text-[11px]">Ministry of Consumer Affairs, Food & Public Distribution</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
