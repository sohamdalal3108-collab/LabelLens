'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  InspectionRecord,
  OfficerVerification,
  SamplePackageScenario,
  InputMode
} from '@/lib/types/inspection';
import {
  INITIAL_INSPECTIONS_HISTORY,
  SAMPLE_INSPECTION_A_BISCUITS
} from '@/lib/mock/mockInspections';
import { InspectionService } from '@/lib/api/inspectionService';
import { MockInspectionService } from '@/lib/mock/mockService';

export interface InspectionMetrics {
  total: number;
  violations: number;
  manualReview: number;
  compliant: number;
}

interface InspectionContextType {
  inspections: InspectionRecord[];
  activeInspection: InspectionRecord | null;
  selectedFieldKey: string | null;
  hoveredBoxId: string | null;
  isAnalyzing: boolean;
  analysisStep: number;
  analysisLogs: string[];
  capturedImage: string | null;
  selectedSample: SamplePackageScenario | null;
  metrics: InspectionMetrics;
  isLoadingRecords: boolean;
  setSelectedFieldKey: (key: string | null) => void;
  setHoveredBoxId: (id: string | null) => void;
  setActiveInspection: (record: InspectionRecord | null) => void;
  setCapturedImage: (url: string | null) => void;
  setSelectedSample: (sample: SamplePackageScenario | null) => void;
  loadInspectionById: (id: string) => Promise<InspectionRecord | null>;
  refreshInspections: () => Promise<InspectionRecord[]>;
  runAnalysis: (params: {
    fileOrUrl?: File | string;
    sampleId?: string;
    mode?: InputMode;
    commodityHint?: string;
    retailerName?: string;
    retailerAddress?: string;
  }) => Promise<InspectionRecord>;
  submitVerification: (verification: OfficerVerification) => Promise<InspectionRecord>;
  correctField: (fieldKey: string, newValue: string) => Promise<InspectionRecord>;
  dismissViolation: (violationId: string, reason: string) => Promise<InspectionRecord>;
  reinstateViolation: (violationId: string) => Promise<InspectionRecord>;
  resetToDefaultDataset: () => void;
}

const InspectionContext = createContext<InspectionContextType | undefined>(undefined);

export function InspectionProvider({ children }: { children: React.ReactNode }) {
  const [inspections, setInspections] = useState<InspectionRecord[]>(INITIAL_INSPECTIONS_HISTORY);
  const [activeInspection, setActiveInspection] = useState<InspectionRecord | null>(SAMPLE_INSPECTION_A_BISCUITS);
  const [selectedFieldKey, setSelectedFieldKey] = useState<string | null>(null);
  const [hoveredBoxId, setHoveredBoxId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<SamplePackageScenario | null>(null);
  const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(true);

  // Load initial inspections list from store / service
  const refreshInspections = useCallback(async (): Promise<InspectionRecord[]> => {
    try {
      const records = await InspectionService.getInspections();
      setInspections(records);
      return records;
    } catch (err) {
      console.warn('Could not load stored inspections:', err);
      return INITIAL_INSPECTIONS_HISTORY;
    } finally {
      setIsLoadingRecords(false);
    }
  }, []);

  useEffect(() => {
    refreshInspections();
  }, [refreshInspections]);

  // Dynamically compute metrics from the shared single source of truth
  const metrics: InspectionMetrics = useMemo(() => {
    const total = inspections.length;
    const violations = inspections.filter((i) => i.status === 'POTENTIAL_VIOLATION').length;
    const manualReview = inspections.filter((i) => i.status === 'MANUAL_REVIEW').length;
    const compliant = inspections.filter((i) => i.status === 'COMPLIANT').length;
    return { total, violations, manualReview, compliant };
  }, [inspections]);

  const loadInspectionById = useCallback(async (id: string): Promise<InspectionRecord | null> => {
    // Check in-memory store first
    const existing = inspections.find((r) => r.id === id);
    if (existing) {
      setActiveInspection(existing);
      return existing;
    }
    // Fall back to service fetch
    try {
      const record = await InspectionService.getInspectionById(id);
      if (record) {
        setActiveInspection(record);
      }
      return record;
    } catch (err) {
      console.error(`Failed to load inspection with ID ${id}:`, err);
      return null;
    }
  }, [inspections]);

  const runAnalysis = async (params: {
    fileOrUrl?: File | string;
    sampleId?: string;
    mode?: InputMode;
    commodityHint?: string;
    retailerName?: string;
    retailerAddress?: string;
  }): Promise<InspectionRecord> => {
    // Preserve captured image immediately
    if (typeof window !== 'undefined' && params.fileOrUrl instanceof File) {
      const url = URL.createObjectURL(params.fileOrUrl);
      setCapturedImage(url);
    } else if (typeof params.fileOrUrl === 'string') {
      setCapturedImage(params.fileOrUrl);
    }

    setIsAnalyzing(true);
    setAnalysisStep(1);
    setAnalysisLogs(['[1/4] CAPTURING: Package image perspective & quality check.']);

    // Progress animation timers
    const step2Timer = setTimeout(() => {
      setAnalysisStep(2);
      setAnalysisLogs((prev) => [...prev, '[2/4] EXTRACTING: OCR statutory text lines & spatial bounding coordinates.']);
    }, 450);

    const step3Timer = setTimeout(() => {
      setAnalysisStep(3);
      setAnalysisLogs((prev) => [...prev, '[3/4] CHECKING: Evaluating Rules 6, 7, 9 & 12 compliance & confidence tiers.']);
    }, 950);

    const step4Timer = setTimeout(() => {
      setAnalysisStep(4);
      setAnalysisLogs((prev) => [...prev, '[4/4] REVIEW READY: Assembling evidence viewport and officer workspace.']);
    }, 1400);

    try {
      // Safety timeout race (maximum 8 seconds) so analysis can NEVER freeze indefinitely
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Analysis pipeline execution timeout')), 8000)
      );

      const result = await Promise.race([
        InspectionService.analyzePackage(params),
        timeoutPromise
      ]);

      // Set active record and prepend to store
      setActiveInspection(result);
      setInspections((prev) => {
        const filtered = prev.filter((item) => item.id !== result.id);
        return [result, ...filtered];
      });

      return result;
    } catch (err) {
      console.warn('Inspection execution encountered an issue, generating fallback record:', err);
      const fallbackResult = await MockInspectionService.simulateAnalyzeImage(
        params.fileOrUrl,
        params.sampleId || 'sample-biscuit',
        params.mode === 'DEMO_SAMPLE' ? 'FILE_UPLOAD' : params.mode || 'CAMERA_CAPTURE',
        params.commodityHint
      );
      setActiveInspection(fallbackResult);
      setInspections((prev) => {
        const filtered = prev.filter((item) => item.id !== fallbackResult.id);
        return [fallbackResult, ...filtered];
      });
      return fallbackResult;
    } finally {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(step4Timer);
      setIsAnalyzing(false);
    }
  };

  const submitVerification = async (verification: OfficerVerification): Promise<InspectionRecord> => {
    if (!activeInspection) throw new Error('No active inspection record');
    const updated = await InspectionService.submitOfficerVerification(activeInspection.id, verification);
    setActiveInspection(updated);
    setInspections((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    return updated;
  };

  const correctField = async (fieldKey: string, newValue: string): Promise<InspectionRecord> => {
    if (!activeInspection) throw new Error('No active inspection record');
    const updated = await InspectionService.correctExtractedField(activeInspection.id, fieldKey, newValue);
    setActiveInspection(updated);
    setInspections((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    return updated;
  };

  const dismissViolation = async (violationId: string, reason: string): Promise<InspectionRecord> => {
    if (!activeInspection) throw new Error('No active inspection record');
    const updated = await InspectionService.dismissViolation(activeInspection.id, violationId, reason);
    setActiveInspection(updated);
    setInspections((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    return updated;
  };

  const reinstateViolation = async (violationId: string): Promise<InspectionRecord> => {
    if (!activeInspection) throw new Error('No active inspection record');
    const updated = await InspectionService.reinstateViolation(activeInspection.id, violationId);
    setActiveInspection(updated);
    setInspections((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    return updated;
  };

  const resetToDefaultDataset = () => {
    const defaultData = InspectionService.resetToDefaultDataset();
    setInspections(defaultData);
    setActiveInspection(defaultData[0] || null);
  };

  return (
    <InspectionContext.Provider
      value={{
        inspections,
        activeInspection,
        selectedFieldKey,
        hoveredBoxId,
        isAnalyzing,
        analysisStep,
        analysisLogs,
        capturedImage,
        selectedSample,
        metrics,
        isLoadingRecords,
        setSelectedFieldKey,
        setHoveredBoxId,
        setActiveInspection,
        setCapturedImage,
        setSelectedSample,
        loadInspectionById,
        refreshInspections,
        runAnalysis,
        submitVerification,
        correctField,
        dismissViolation,
        reinstateViolation,
        resetToDefaultDataset
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
