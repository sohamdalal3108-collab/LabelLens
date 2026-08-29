import {
  InspectionRecord,
  OfficerVerification,
  InputMode,
  SamplePackageScenario
} from '@/lib/types/inspection';
import { MockInspectionService } from '@/lib/mock/mockService';
import { requestApi } from './client';

function isDemoModeActive(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('labellens_demo_mode');
  // Default to true during early hackathon / prototype phase
  return stored !== null ? stored === 'true' : true;
}

export const InspectionService = {
  async getInspections(query?: string, status?: string): Promise<InspectionRecord[]> {
    if (isDemoModeActive()) {
      return MockInspectionService.getInspections(query, status);
    }

    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (status) params.append('status', status);

      const response = await requestApi<InspectionRecord[]>(`/inspections?${params.toString()}`);
      return response.data;
    } catch (err) {
      console.warn('Live API unavailable, falling back to mock dataset:', err);
      return MockInspectionService.getInspections(query, status);
    }
  },

  async getInspectionById(id: string): Promise<InspectionRecord | null> {
    if (isDemoModeActive()) {
      return MockInspectionService.getInspectionById(id);
    }

    try {
      const response = await requestApi<InspectionRecord>(`/inspections/${id}`);
      return response.data;
    } catch (err) {
      console.warn(`Live API error for ${id}, falling back to mock:`, err);
      return MockInspectionService.getInspectionById(id);
    }
  },

  /**
   * =========================================================================
   * INSPECTION ANALYSIS PIPELINE
   * =========================================================================
   * Currently routes to the isolated frontend MockInspectionService engine.
   * 
   * FUTURE FASTAPI OCR INTEGRATION POINT:
   * When the FastAPI backend (e.g., Python EasyOCR / PaddleOCR + Rules Engine)
   * is connected, replace the mock call below with:
   * 
   * ```ts
   * const formData = new FormData();
   * if (fileOrUrl instanceof File) formData.append('image', fileOrUrl);
   * else if (typeof fileOrUrl === 'string') formData.append('image_url', fileOrUrl);
   * formData.append('input_mode', mode);
   * const response = await requestApi<InspectionRecord>('/inspection/analyze', { method: 'POST', body: formData });
   * return response.data;
   * ```
   */
  async analyzePackage(params: {
    fileOrUrl?: File | string;
    sampleId?: string;
    mode?: InputMode;
    commodityHint?: string;
    retailerName?: string;
    retailerAddress?: string;
  }): Promise<InspectionRecord> {
    const { fileOrUrl, sampleId, mode = 'CAMERA_CAPTURE', commodityHint } = params;

    try {
      // Safe, isolated frontend mock analysis (no live backend required)
      return await MockInspectionService.simulateAnalyzeImage(
        fileOrUrl,
        sampleId,
        mode === 'DEMO_SAMPLE' ? 'FILE_UPLOAD' : mode,
        commodityHint
      );
    } catch (err) {
      console.warn('Analysis execution encountered an error, using safe fallback:', err);
      return MockInspectionService.simulateAnalyzeImage(
        fileOrUrl,
        'sample-biscuit',
        mode === 'DEMO_SAMPLE' ? 'FILE_UPLOAD' : mode,
        commodityHint
      );
    }
  },

  async submitOfficerVerification(
    inspectionId: string,
    verification: OfficerVerification
  ): Promise<InspectionRecord> {
    if (isDemoModeActive()) {
      return MockInspectionService.saveOfficerVerification(inspectionId, verification);
    }

    try {
      const response = await requestApi<InspectionRecord>(
        `/inspections/${inspectionId}/verify`,
        {
          method: 'POST',
          body: JSON.stringify({ verification })
        }
      );
      return response.data;
    } catch (err) {
      console.warn('Failed to submit verification to live backend, saving locally:', err);
      return MockInspectionService.saveOfficerVerification(inspectionId, verification);
    }
  },

  async correctExtractedField(
    inspectionId: string,
    fieldKey: string,
    correctedValue: string
  ): Promise<InspectionRecord> {
    return MockInspectionService.correctExtractedField(inspectionId, fieldKey, correctedValue);
  },

  async dismissViolation(
    inspectionId: string,
    violationId: string,
    reason: string
  ): Promise<InspectionRecord> {
    return MockInspectionService.dismissViolation(inspectionId, violationId, reason);
  },

  async reinstateViolation(
    inspectionId: string,
    violationId: string
  ): Promise<InspectionRecord> {
    return MockInspectionService.reinstateViolation(inspectionId, violationId);
  },

  async getSampleScenarios(): Promise<SamplePackageScenario[]> {
    return MockInspectionService.getSampleScenarios();
  },

  resetToDefaultDataset(): InspectionRecord[] {
    return MockInspectionService.resetToDefaultDataset();
  }
};
