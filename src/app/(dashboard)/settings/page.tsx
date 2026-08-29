'use client';

import React, { useState } from 'react';
import { useDemoMode } from '@/lib/context/DemoModeContext';
import { useAuth } from '@/lib/context/AuthContext';
import { useInspection } from '@/lib/context/InspectionContext';
import { LEGAL_METROLOGY_RULES_2011 } from '@/config/legalMetrologyRules';
import {
  User,
  Database,
  Server,
  Scale,
  RefreshCw,
  Info,
  CheckCircle2
} from 'lucide-react';

export default function SettingsPage() {
  const { isDemoMode, toggleDemoMode } = useDemoMode();
  const { officer } = useAuth();
  const { resetToDefaultDataset } = useInspection();
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api/v1');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetData = () => {
    resetToDefaultDataset();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-3 border-b border-[#DBD6CA]">
        <div className="text-[11px] font-bold text-orange-600 font-mono uppercase tracking-wider mb-0.5">
          SYSTEM CONFIGURATION
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
          Settings & Statutory Rules Catalog
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Officer credentials, API connectivity, prototype demo mode, and Legal Metrology Rules, 2011 handbook
        </p>
      </div>

      {/* 1. Officer Profile Section */}
      <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-5 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E5E2D9]">
          <User className="w-4 h-4 text-orange-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            Field Officer Profile & Verification Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded bg-[#FAF8F4] border border-[#DBD6CA]">
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">Officer Name</span>
            <span className="font-bold text-neutral-900 text-sm mt-0.5 block">{officer?.name || 'Rajesh Sharma'}</span>
          </div>
          <div className="p-3.5 rounded bg-[#FAF8F4] border border-[#DBD6CA]">
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">Authorized Inspector Email</span>
            <span className="font-mono font-bold text-neutral-900 text-sm mt-0.5 block truncate">{officer?.email || 'inspector@example.com'}</span>
          </div>
          <div className="p-3.5 rounded bg-[#FAF8F4] border border-[#DBD6CA]">
            <span className="text-[10px] text-neutral-500 block uppercase font-bold">Designation & Badge</span>
            <span className="font-medium text-neutral-900 text-sm mt-0.5 block">{officer?.designation || 'Senior Legal Metrology Inspector'} ({officer?.badgeNumber || 'LM-DEL-2024-88'})</span>
          </div>
        </div>
      </div>

      {/* 2. Demo Mode & Backend API Status */}
      <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5E2D9]">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-orange-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              API Connection & Prototype Demo Mode
            </h2>
          </div>

          <button
            onClick={toggleDemoMode}
            className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors shadow-2xs ${
              isDemoMode
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-[#DBD6CA] text-neutral-700 hover:bg-[#FAF8F4]'
            }`}
          >
            <span>{isDemoMode ? 'Demo Mode Active' : 'Live API Active'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded bg-[#FAF8F4] border border-[#DBD6CA] space-y-2">
            <span className="font-bold text-neutral-900 block">FastAPI Backend Pipeline URL:</span>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-white border border-[#DBD6CA] rounded text-neutral-900 font-mono focus:outline-none focus:border-orange-500 shadow-2xs"
            />
            <span className="text-[10px] text-neutral-500 block">
              REST endpoint for OCR extraction and rule evaluation pipeline.
            </span>
          </div>

          <div className="p-4 rounded bg-[#FAF8F4] border border-[#DBD6CA] space-y-2">
            <span className="font-bold text-neutral-900 block">Database Reset:</span>
            <p className="text-[11px] text-neutral-600">
              Reset inspection records to the default 4 sample commodity cases.
            </p>
            <button
              onClick={handleResetData}
              className="px-3.5 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold border border-[#DBD6CA] shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{resetSuccess ? 'Reset Complete!' : 'Reset Demo Records'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Statutory Rules Reference Browser */}
      <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-5 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E5E2D9]">
          <Scale className="w-4 h-4 text-orange-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            Legal Metrology (Packaged Commodities) Rules, 2011 Schedule
          </h2>
        </div>

        <div className="space-y-3">
          {LEGAL_METROLOGY_RULES_2011.map((rule) => (
            <div key={rule.ruleCode} className="p-3.5 rounded bg-[#FAF8F4] border border-[#DBD6CA] text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-orange-700 font-mono text-xs bg-orange-50 px-2 py-0.5 rounded border border-orange-200">{rule.ruleNumber}</span>
                <span className="text-[10px] text-neutral-500 uppercase font-mono">{rule.category}</span>
              </div>
              <h3 className="font-bold text-neutral-900 text-xs">{rule.ruleTitle}</h3>
              <p className="text-[11px] text-neutral-600 leading-relaxed">{rule.officialDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

