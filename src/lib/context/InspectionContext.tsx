'use client';

import React, { createContext, useContext, useState } from 'react';
import { InspectionRecord, OfficerVerification, SamplePackageScenario } from '@/lib/types/inspection';
import { SAMPLE_INSPECTION_A_BISCUITS } from '@/lib/mock/mockInspections';
import { InspectionService } from '@/lib/api/inspectionService';

interface InspectionContextType {
  activeInspection: InspectionRecord | null;
  selectedFieldKey: string | null;
  hoveredBoxId: string | null;
  isAnalyzing: boolean;
  analysisStep: number;
  analysisLogs: string[];
  capturedImage: string | null;
  selectedSample: SamplePackageScenario | null;
  setSelectedFieldKey: (key: string | null) => void;
  setHoveredBoxId: (id: string | null) => void;
  setActiveInspection: (record: InspectionRecord | null) => void;
  setCapturedImage: (url: string | null) => void;
  setSelectedSample: (sample: SamplePackageScenario | null) => void;
  runAnalysis: (params: {
    fileOrUrl?: File | string;
    sampleId?: string;
    mode?: 'CAMERA_CAPTURE' | 'FILE_UPLOAD' | 'QR_CODE' | 'DEMO_SAMPLE';
  }) => Promise<InspectionRecord>;
  submitVerification: (verification: OfficerVerification) => Promise<InspectionRecord>;
}

const InspectionContext = createContext<InspectionContextType | undefined>(undefined);

export function InspectionProvider({ children }: { children: React.ReactNode }) {
  const [activeInspection, setActiveInspection] = useState<InspectionRecord | null>(SAMPLE_INSPECTION_A_BISCUITS);
  const [selectedFieldKey, setSelectedFieldKey] = useState<string | null>(null);
  const [hoveredBoxId, setHoveredBoxId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<SamplePackageScenario | null>(null);

  const runAnalysis = async (params: {
    fileOrUrl?: File | string;
    sampleId?: string;
    mode?: 'CAMERA_CAPTURE' | 'FILE_UPLOAD' | 'QR_CODE' | 'DEMO_SAMPLE';
  }): Promise<InspectionRecord> => {
    setIsAnalyzing(true);
    setAnalysisStep(1);
    setAnalysisLogs(['[1/4] CAPTURING: Package image perspective & quality check.']);

    await new Promise((r) => setTimeout(r, 450));
    setAnalysisStep(2);
    setAnalysisLogs((prev) => [...prev, '[2/4] EXTRACTING: OCR statutory text lines & spatial bounding coordinates.']);

    await new Promise((r) => setTimeout(r, 500));
    setAnalysisStep(3);
    setAnalysisLogs((prev) => [...prev, '[3/4] CHECKING: Evaluating Rules 6, 7, 9 & 12 compliance & confidence tiers.']);

    await new Promise((r) => setTimeout(r, 450));
    setAnalysisStep(4);
    setAnalysisLogs((prev) => [...prev, '[4/4] REVIEW READY: Assembling evidence viewport and officer workspace.']);

    try {
      const result = await InspectionService.analyzePackage({
        fileOrUrl: params.fileOrUrl,
        sampleId: params.sampleId,
        mode: params.mode === 'DEMO_SAMPLE' ? 'CAMERA_CAPTURE' : params.mode
      });

      setActiveInspection(result);
      setIsAnalyzing(false);
      return result;
    } catch (err) {
      setIsAnalyzing(false);
      throw err;
    }
  };

  const submitVerification = async (verification: OfficerVerification): Promise<InspectionRecord> => {
    if (!activeInspection) throw new Error('No active inspection');
    const updated = await InspectionService.submitOfficerVerification(activeInspection.id, verification);
    setActiveInspection(updated);
    return updated;
  };

  return (
    <InspectionContext.Provider
      value={{
        activeInspection,
        selectedFieldKey,
        hoveredBoxId,
        isAnalyzing,
        analysisStep,
        analysisLogs,
        capturedImage,
        selectedSample,
        setSelectedFieldKey,
        setHoveredBoxId,
        setActiveInspection,
        setCapturedImage,
        setSelectedSample,
        runAnalysis,
        submitVerification
      }}
    >
      {children}
    </InspectionContext.Provider>
  );
}

export function useInspection() {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspection must be used within an InspectionProvider');
  }
  return context;
}
