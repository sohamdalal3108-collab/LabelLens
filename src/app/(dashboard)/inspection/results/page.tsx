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
  Scale
} from 'lucide-react';
import Link from 'next/link';

export default function ResultsPage() {
  const {
    activeInspection,
    selectedFieldKey,
    hoveredBoxId,
    setSelectedFieldKey,
    setHoveredBoxId,
    submitVerification
  } = useInspection();

  const [activeTab, setActiveTab] = useState<'DECLARATIONS' | 'VIOLATIONS' | 'SIGN_OFF'>('DECLARATIONS');
  const [mobileView, setMobileView] = useState<'EVIDENCE' | 'FINDINGS'>('FINDINGS');
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [activeRuleCode, setActiveRuleCode] = useState<string | undefined>();

  if (!activeInspection) {
    return (
      <div className="rounded-lg bg-white border border-[#DBD6CA] p-8 text-center max-w-md mx-auto my-12 space-y-3 shadow-xs">
        <h3 className="text-sm font-bold text-neutral-900">No Active Inspection Record</h3>
        <p className="text-xs text-neutral-500">
          Capture a package image or select a demo test case to view findings.
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
  Object.values(activeInspection.declarations).forEach((field) => {
    if (field && typeof field === 'object' && 'boundingBox' in field && field.boundingBox) {
      boundingBoxes.push(field.boundingBox);
    }
  });

  const handleSelectField = (fieldKey: string) => {
    setSelectedFieldKey(selectedFieldKey === fieldKey ? null : fieldKey);
  };

  const handleFieldEdit = (fieldKey: string, newValue: string) => {
    const decs = activeInspection.declarations as unknown as Record<string, ExtractedField | undefined>;
    if (decs[fieldKey]) {
      decs[fieldKey]!.officerEditedValue = newValue;
    }
  };

  const handleDismissViolation = (violationId: string, reason: string) => {
    const vio = activeInspection.violations.find((v) => v.id === violationId);
    if (vio) {
      vio.isDismissedByOfficer = true;
      vio.officerDismissReason = reason;
    }
  };

  const handleReinstateViolation = (violationId: string) => {
    const vio = activeInspection.violations.find((v) => v.id === violationId);
    if (vio) {
      vio.isDismissedByOfficer = false;
      vio.officerDismissReason = undefined;
    }
  };

  const handleOpenRuleModal = (ruleCode?: string) => {
    setActiveRuleCode(ruleCode);
    setIsRuleModalOpen(true);
  };

  const handleFinalizeSignOff = async (verification: OfficerVerification) => {
    await submitVerification(verification);
  };

  const violationsCount = activeInspection.violations.filter((v) => !v.isDismissedByOfficer).length;

  return (
    <div className="space-y-4">
      {/* Top Header */}
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
            <span>Generate Notice</span>
          </Link>
        </div>
      </div>

      {/* Mobile Switcher */}
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

      {/* Dual-Pane Layout */}
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
              <span>Officer Sign-off</span>
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
              {/* Manual Review Clarification if active */}
              {activeInspection.status === 'MANUAL_REVIEW' && (
                <div className="rounded-lg bg-amber-50 border border-amber-300 p-4 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span>Manual Review Required (Uncertain OCR)</span>
                  </div>
                  <p className="text-xs text-amber-900/90 leading-normal">
                    {activeInspection.manualReviewReasons?.[0] ||
                      'OCR confidence is low because of package surface glare or reflection.'}
                  </p>
                  <div className="text-[11px] text-amber-800 bg-white p-2 rounded border border-amber-200">
                    <span className="font-bold text-amber-950">Recommended Action:</span> Capture a clearer image or verify the declaration manually on the physical sample. Low confidence is not automatically classified as a legal violation.
                  </div>
                </div>
              )}

              {activeInspection.violations.length === 0 ? (
                <div className="rounded-lg bg-white border border-[#DBD6CA] p-8 text-center space-y-1.5 shadow-xs">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-neutral-900">
                    All Statutory Declarations Satisfied
                  </h4>
                  <p className="text-xs text-neutral-500">
                    No violations detected under Rules 6, 7 & 9 of Legal Metrology (Packaged Commodities) Rules, 2011.
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

