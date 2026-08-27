'use client';

import React, { useState } from 'react';
import { StatutoryDeclarations, ExtractedField, getConfidenceLevel, ConfidenceLevel } from '@/lib/types/inspection';
import { Edit2, Check, X, AlertCircle, Info, CheckCircle2, HelpCircle } from 'lucide-react';

interface ProductInfoCardProps {
  declarations: StatutoryDeclarations;
  selectedFieldKey: string | null;
  onSelectField: (fieldKey: string) => void;
  onFieldEdit?: (fieldKey: string, newValue: string) => void;
}

export function ProductInfoCard({
  declarations,
  selectedFieldKey,
  onSelectField,
  onFieldEdit
}: ProductInfoCardProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const fieldsList: ExtractedField[] = Object.values(declarations).filter(
    (f): f is ExtractedField => Boolean(f && typeof f === 'object' && 'key' in f)
  );

  const handleStartEdit = (field: ExtractedField, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingKey(field.key);
    setEditValue(field.officerEditedValue || field.extractedValue);
  };

  const handleSaveEdit = (fieldKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onFieldEdit?.(fieldKey, editValue);
    setEditingKey(null);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingKey(null);
  };

  return (
    <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs overflow-hidden space-y-0">
      <div className="p-3.5 border-b border-[#E5E2D9] bg-[#FAF8F4] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            OCR Extracted Statutory Declarations
          </h3>
          <p className="text-[11px] text-neutral-500">
            Raw text parsed by OCR & structured for Legal Metrology compliance verification
          </p>
        </div>

        {/* Confidence Tier Legend */}
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
            HIGH ≥85%
          </span>
          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300 font-bold">
            MED 60-84%
          </span>
          <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-800 border border-red-300 font-bold">
            LOW &lt;60%
          </span>
        </div>
      </div>

      {/* Structured Clean Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs data-table">
          <thead>
            <tr>
              <th className="px-3.5 py-2.5 w-1/4">Declaration Field</th>
              <th className="px-3.5 py-2.5 w-1/2">Declared / Extracted Value</th>
              <th className="px-3.5 py-2.5 w-1/4 text-right">OCR Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDE9E0]">
            {fieldsList.map((field) => {
              const isSelected = selectedFieldKey === field.key;
              const isEditing = editingKey === field.key;
              const isMissing = field.extractedValue.includes('[NOT FOUND');
              const tier: ConfidenceLevel = getConfidenceLevel(field.confidence);
              const percentage = Math.round(field.confidence * 100);

              const tierBadgeClass =
                tier === 'HIGH'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : tier === 'MEDIUM'
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-red-50 text-red-800 border-red-300';

              return (
                <tr
                  key={field.key}
                  onClick={() => onSelectField(field.key)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-orange-50/80 font-semibold'
                      : isMissing
                      ? 'bg-red-50/50'
                      : tier === 'LOW'
                      ? 'bg-amber-50/40'
                      : 'hover:bg-[#FBF9F5]'
                  }`}
                >
                  {/* Field Name & Rule */}
                  <td className="px-3.5 py-2.5 align-top">
                    <div className="font-bold text-neutral-900">{field.label}</div>
                    {field.legalRuleRef && (
                      <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                        {field.legalRuleRef}
                      </div>
                    )}
                  </td>

                  {/* Value / Inline Edit */}
                  <td className="px-3.5 py-2.5 align-top">
                    {isEditing ? (
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 px-2.5 py-1 text-xs bg-white border border-orange-500 rounded text-neutral-900 focus:outline-none font-mono shadow-xs"
                          autoFocus
                        />
                        <button
                          onClick={(e) => handleSaveEdit(field.key, e)}
                          className="p-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                          title="Save correction"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1 rounded bg-neutral-200 hover:bg-neutral-300 text-neutral-700 shadow-2xs"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-mono">
                          {field.officerEditedValue ? (
                            <span className="text-orange-950 font-bold">
                              {field.officerEditedValue}{' '}
                              <span className="text-[10px] text-orange-700 font-semibold italic">(Officer Corrected)</span>
                            </span>
                          ) : (
                            <span className={isMissing ? 'text-red-700 font-bold' : 'text-neutral-900 font-medium'}>
                              {field.extractedValue}
                            </span>
                          )}

                          {tier === 'LOW' && !isMissing && (
                            <div className="text-[10px] text-amber-800 font-medium flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3 h-3 shrink-0 text-amber-600" />
                              <span>Manual officer verification advised (surface glare or reflection)</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={(e) => handleStartEdit(field, e)}
                          className="text-neutral-400 hover:text-neutral-900 p-1 shrink-0 transition-colors"
                          title="Officer Manual Correction"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* OCR Confidence with explicit tier */}
                  <td className="px-3.5 py-2.5 align-top text-right whitespace-nowrap">
                    <div className="inline-flex flex-col items-end gap-0.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${tierBadgeClass}`}>
                        {tier} ({percentage}%)
                      </span>
                    </div>
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
