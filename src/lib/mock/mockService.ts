import {
  InspectionRecord,
  OfficerVerification,
  SamplePackageScenario
} from '@/lib/types/inspection';
import {
  INITIAL_INSPECTIONS_HISTORY,
  SAMPLE_PACKAGE_SCENARIOS,
  SAMPLE_INSPECTION_A_BISCUITS,
  SAMPLE_INSPECTION_B_SPICES,
  SAMPLE_INSPECTION_C_COSMETICS,
  SAMPLE_INSPECTION_D_EDIBLE_OIL
} from './mockInspections';

const LOCAL_STORAGE_KEY = 'labellens_inspections_store_v1';

function getStoredInspections(): InspectionRecord[] {
  if (typeof window === 'undefined') {
    return INITIAL_INSPECTIONS_HISTORY;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_INSPECTIONS_HISTORY));
      return INITIAL_INSPECTIONS_HISTORY;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INSPECTIONS_HISTORY;
  }
}

function saveStoredInspections(records: InspectionRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save inspections in localStorage:', err);
  }
}

export const MockInspectionService = {
  async getInspections(query?: string, status?: string): Promise<InspectionRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 350));
    let records = getStoredInspections();

    if (status && status !== 'ALL') {
      records = records.filter((r) => r.status === status);
    }

    if (query && query.trim() !== '') {
      const q = query.toLowerCase();
      records = records.filter(
        (r) =>
          r.inspectionNumber.toLowerCase().includes(q) ||
          r.brandName.toLowerCase().includes(q) ||
          r.commodityCategory.toLowerCase().includes(q) ||
          (r.metadata?.retailerName && r.metadata.retailerName.toLowerCase().includes(q))
      );
    }

    return records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  async getInspectionById(id: string): Promise<InspectionRecord | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const records = getStoredInspections();
    const found = records.find((r) => r.id === id);
    return found || null;
  },

  async simulateAnalyzeImage(
    fileOrUrl?: File | string,
    sampleId?: string,
    mode: 'CAMERA_CAPTURE' | 'FILE_UPLOAD' | 'QR_CODE' = 'CAMERA_CAPTURE'
  ): Promise<InspectionRecord> {
    // Artificial latency to simulate OCR + Rule evaluation pipeline
    await new Promise((resolve) => setTimeout(resolve, 2200));

    let template: InspectionRecord;

    if (sampleId) {
      const matchedSample = SAMPLE_PACKAGE_SCENARIOS.find((s) => s.id === sampleId);
      template = matchedSample ? matchedSample.sampleData : SAMPLE_INSPECTION_A_BISCUITS;
    } else {
      // Pick a realistic scenario
      template = SAMPLE_INSPECTION_A_BISCUITS;
    }

    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const newRecord: InspectionRecord = {
      ...template,
      id: `insp-live-${Date.now()}`,
      inspectionNumber: `LM-2026-INSP-${randomSerial}`,
      timestamp: new Date().toISOString(),
      inputMode: mode,
      imageUrl:
        typeof fileOrUrl === 'string'
          ? fileOrUrl
          : template.imageUrl,
      thumbnailUrl: template.thumbnailUrl
    };

    const current = getStoredInspections();
    saveStoredInspections([newRecord, ...current]);
    return newRecord;
  },

  async saveOfficerVerification(
    inspectionId: string,
    verification: OfficerVerification
  ): Promise<InspectionRecord> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const records = getStoredInspections();
    const idx = records.findIndex((r) => r.id === inspectionId);

    if (idx === -1) {
      throw new Error(`Inspection record with ID ${inspectionId} not found`);
    }

    const updated = {
      ...records[idx],
      officerVerification: verification,
      status: verification.decision === 'REJECTED' ? ('COMPLIANT' as const) : records[idx].status
    };

    records[idx] = updated;
    saveStoredInspections(records);
    return updated;
  },

  async getSampleScenarios(): Promise<SamplePackageScenario[]> {
    return SAMPLE_PACKAGE_SCENARIOS;
  },

  resetToDefaultDataset(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_INSPECTIONS_HISTORY));
  }
};
