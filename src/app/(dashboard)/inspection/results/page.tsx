'use client';

import React, { useState } from 'react';
import { useInspection } from '@/lib/context/InspectionContext';
import { EvidenceViewer } from '@/components/inspection/EvidenceViewer';
import { ProductInfoCard } from '@/components/inspection/ProductInfoCard';
import { ViolationCard } from '@/components/inspection/ViolationCard';
import { OfficerActionPanel } from '@/components/inspection/OfficerActionPanel';
import { RuleReferenceModal } from '@/components/inspection/RuleReferenceModal';
import { ComplianceBadge } from '@/components/shared/ComplianceBadge';
import { BoundingBox, ExtractedField, OfficerVerification } from '@/lib/types/inspection';
import {
  FileText,
  AlertTriangle,
  Stamp,
  BookOpen,
  ArrowLeft,
  Printer,
  HelpCircle,
  CheckCircle2,
  Scale,
  RefreshCw,
  Camera,
  Edit3,
  Check,
  X,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function ResultsPage() {
  const {
    activeInspection,
    selectedFieldKey,
    hoveredBoxId,
    setSelectedFieldKey,
    setHoveredBoxId,
    submitVerification,
    correctField,
    dismissViolation,
    reinstateViolation
  } = useInspection();

  const [activeTab, setActiveTab] = useState<'DECLARATIONS' | 'VIOLATIONS' | 'SIGN_OFF'>('DECLARATIONS');
  const [mobileView, setMobileView] = useState<'EVIDENCE' | 'FINDINGS'>('FINDINGS');
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [activeRuleCode, setActiveRuleCode] = useState<string | undefined>();

  if (!activeInspection) {
    return (
      <div className="rounded-lg bg-white border border-[#DBD6CA] p-8 text-center max-w-md mx-auto my-12 space-y-3 shadow-xs">
        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto font-bold">
          <Scale className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-neutral-900">No Active Inspection Record</h3>
        <p className="text-xs text-neutral-500">
          Capture a package image or select a benchmark scenario to inspect declarations.
        </p>
        <Link
          href="/inspection/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <span>Start New Inspection</span>
        </Link>
      </div>
    );
  }

  // Extract all bounding boxes
  const boundingBoxes: BoundingBox[] = [];
  const declarationsDict: Record<string, ExtractedField | undefined> = {};

  Object.values(activeInspection.declarations).forEach((field) => {
    if (field && typeof field === 'object' && 'key' in field) {
      declarationsDict[field.key] = field;
      if (field.boundingBox) {
        boundingBoxes.push(field.boundingBox);
      }
    }
  });

  const handleSelectField = (fieldKey: string) => {
    setSelectedFieldKey(selectedFieldKey === fieldKey ? null : fieldKey);
  };

  const handleFieldEdit = async (fieldKey: string, newValue: string) => {
    await correctField(fieldKey, newValue);
  };

  const handleDismissViolation = async (violationId: string, reason: string) => {
    await dismissViolation(violationId, reason);
  };

  const handleReinstateViolation = async (violationId: string) => {
    await reinstateViolation(violationId);
  };

  const handleOpenRuleModal = (ruleCode?: string) => {
    setActiveRuleCode(ruleCode);
    setIsRuleModalOpen(true);
  };

  const handleFinalizeSignOff = async (verification: OfficerVerification) => {
    await submitVerification(verification);
  };

  const violationsCount = activeInspection.violations.filter((v) => !v.isDismissedByOfficer).length;
  const isManualReview = activeInspection.status === 'MANUAL_REVIEW';

  return (
    <div className="space-y-4">
      {/* 1. PIPELINE EXECUTION BREADCRUMB BAR (Judge Evidence Chain) */}
      <div className="bg-white border border-[#DBD6CA] rounded-lg p-3 shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto pb-1 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-800 font-bold whitespace-nowrap">
            <span className="px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[10px]">01</span>
            <span>PACKAGE IMAGE</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          <div className="flex items-center gap-1.5 text-neutral-800 font-bold whitespace-nowrap">
            <span className="px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[10px]">02</span>
            <span>OCR EXTRACTION</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          <div className="flex items-center gap-1.5 text-neutral-800 font-bold whitespace-nowrap">
            <span className="px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[10px]">03</span>
            <span>CONFIDENCE</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          <div className="flex items-center gap-1.5 text-neutral-800 font-bold whitespace-nowrap">
            <span className="px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[10px]">04</span>
            <span>COMPLIANCE CHECK</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          <div className="flex items-center gap-1.5 text-neutral-800 font-bold whitespace-nowrap">
            <span className="px-2 py-0.5 rounded bg-orange-600 text-white font-mono text-[10px]">05</span>
            <span className="text-orange-950 font-black">FINDINGS</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          <div className="flex items-center gap-1.5 text-neutral-800 font-bold whitespace-nowrap">
            <span className="px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[10px]">06</span>
            <span>OFFICER VERIFICATION</span>
          </div>
        </div>
      </div>

      {/* 2. Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DBD6CA]">
        <div className="flex items-center gap-3">
          <Link
            href="/inspection/new"
            className="p-2 rounded bg-white hover:bg-[#FAF8F4] text-neutral-600 hover:text-neutral-900 border border-[#DBD6CA] shadow-2xs transition-colors"
            title="Back to Intake"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-neutral-900">
                {activeInspection.inspectionNumber}
              </span>
              <ComplianceBadge status={activeInspection.status} size="sm" />
              <span className="text-xs text-neutral-500 font-medium">
                {activeInspection.commodityCategory}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-neutral-900 mt-0.5 tracking-tight">
              {activeInspection.brandName}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenRuleModal()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-[#FAF8F4] text-neutral-700 border border-[#DBD6CA] text-xs font-bold shadow-2xs transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-neutral-600" />
            <span>Rules Reference</span>
          </button>

          <Link
            href="/reports"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate Statutory Notice</span>
          </Link>
        </div>
      </div>

      {/* 3. Manual Review Required Banner (if low OCR confidence or surface glare) */}
      {isManualReview && (
        <div className="rounded-lg bg-amber-50 border border-amber-300 p-4 space-y-3 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded bg-amber-100 text-amber-800 border border-amber-300 mt-0.5">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black text-amber-950 uppercase tracking-wide">
                  MANUAL REVIEW REQUIRED — Low OCR Confidence / Insufficient Evidence
                </h3>
                <p className="text-xs text-amber-900/90 mt-0.5 leading-normal">
                  {activeInspection.manualReviewReasons?.[0] ||
                    'Package curved surface or reflection glare resulted in low character recognition confidence. Uncertain data is not automatically classified as a violation.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200/80 text-xs font-bold">
            <span className="text-[11px] text-amber-950 uppercase tracking-wider">Required Officer Actions:</span>
            <Link
              href="/inspection/new"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-800 border border-[#DBD6CA] shadow-2xs"
            >
              <Camera className="w-3.5 h-3.5 text-orange-600" />
              <span>Retake Image</span>
            </Link>

            <button
              onClick={() => setActiveTab('DECLARATIONS')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-800 border border-[#DBD6CA] shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-orange-600" />
              <span>Correct Extracted Field</span>
            </button>

            <button
              onClick={() => setActiveTab('SIGN_OFF')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-amber-700 hover:bg-amber-800 text-white shadow-2xs"
            >
              <span>Record Officer Physical Verification</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Mobile View Switcher */}
      <div className="lg:hidden flex p-1 bg-white rounded-md border border-[#DBD6CA] text-xs font-bold shadow-2xs">
        <button
          onClick={() => setMobileView('EVIDENCE')}
          className={`flex-1 py-1.5 rounded transition-colors ${
            mobileView === 'EVIDENCE' ? 'bg-neutral-900 text-white shadow-2xs' : 'text-neutral-600'
          }`}
        >
          Package Evidence ({boundingBoxes.length})
        </button>
        <button
          onClick={() => setMobileView('FINDINGS')}
          className={`flex-1 py-1.5 rounded transition-colors ${
            mobileView === 'FINDINGS' ? 'bg-neutral-900 text-white shadow-2xs' : 'text-neutral-600'
          }`}
        >
          Compliance Findings ({violationsCount})
        </button>
      </div>

      {/* 5. Dual-Pane Inspection Results Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Package Image with Spatial Bounding Box Overlays */}
        <div
          className={`lg:col-span-5 ${
            mobileView === 'FINDINGS' ? 'hidden lg:block' : 'block'
          } h-full min-h-[480px]`}
        >
          <EvidenceViewer
            imageUrl={activeInspection.imageUrl}
            boundingBoxes={boundingBoxes}
            selectedFieldKey={selectedFieldKey}
            hoveredBoxId={hoveredBoxId}
            onSelectBox={handleSelectField}
            onHoverBox={setHoveredBoxId}
            violationsCount={violationsCount}
            declarations={declarationsDict}
          />
        </div>

        {/* Right: Tabbed Structured Findings */}
        <div
          className={`lg:col-span-7 space-y-4 ${
            mobileView === 'EVIDENCE' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Workspace Tabs */}
          <div className="flex p-1 bg-white rounded-md border border-[#DBD6CA] text-xs font-bold shadow-2xs">
            <button
              onClick={() => setActiveTab('DECLARATIONS')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded transition-colors ${
                activeTab === 'DECLARATIONS'
                  ? 'bg-orange-50 text-orange-950 border border-orange-200 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-neutral-600" />
              <span>Extracted Declarations</span>
            </button>

            <button
              onClick={() => setActiveTab('VIOLATIONS')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded transition-colors ${
                activeTab === 'VIOLATIONS'
                  ? 'bg-red-50 text-red-950 border border-red-200 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Compliance Findings ({violationsCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('SIGN_OFF')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded transition-colors ${
                activeTab === 'SIGN_OFF'
                  ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Stamp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Officer Verification</span>
            </button>
          </div>

          {/* Tab 1: Extracted Declarations */}
          {activeTab === 'DECLARATIONS' && (
            <ProductInfoCard
              declarations={activeInspection.declarations}
              selectedFieldKey={selectedFieldKey}
              onSelectField={handleSelectField}
              onFieldEdit={handleFieldEdit}
            />
          )}

          {/* Tab 2: Compliance Findings */}
          {activeTab === 'VIOLATIONS' && (
            <div className="space-y-3">
              {activeInspection.violations.length === 0 ? (
                <div className="rounded-lg bg-white border border-[#DBD6CA] p-8 text-center space-y-1.5 shadow-xs">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-neutral-900">
                    All Mandatory Declarations Satisfied
                  </h4>
                  <p className="text-xs text-neutral-500">
                    No statutory violations detected under Rules 6, 7 & 9 of Legal Metrology (Packaged Commodities) Rules, 2011.
                  </p>
                </div>
              ) : (
                activeInspection.violations.map((violation) => (
                  <ViolationCard
                    key={violation.id}
                    violation={violation}
                    isSelected={selectedFieldKey === violation.fieldKeyRelated}
                    onSelect={() => violation.fieldKeyRelated && handleSelectField(violation.fieldKeyRelated)}
                    onDismissViolation={handleDismissViolation}
                    onReinstateViolation={handleReinstateViolation}
                    onOpenRuleDetails={handleOpenRuleModal}
                  />
                ))
              )}
            </div>
          )}

          {/* Tab 3: Officer Sign-Off */}
          {activeTab === 'SIGN_OFF' && (
            <OfficerActionPanel
              inspection={activeInspection}
              onFinalize={handleFinalizeSignOff}
            />
          )}
        </div>
      </div>

      {/* Rule Reference Modal */}
      <RuleReferenceModal
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
        initialRuleCode={activeRuleCode}
      />
    </div>
  );
}
