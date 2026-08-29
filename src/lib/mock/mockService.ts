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

  /**
   * Safe isolated Mock Inspection Engine.
   * Simulates the complete OCR extraction, bounding box detection, and Legal Metrology Rule evaluation.
   * Preserves uploaded image URLs/Files and generates comprehensive statutory records.
   */
  async simulateAnalyzeImage(
    fileOrUrl?: File | string,
    sampleId?: string,
    mode: 'CAMERA_CAPTURE' | 'FILE_UPLOAD' | 'QR_CODE' = 'CAMERA_CAPTURE',
    commodityHint?: string
  ): Promise<InspectionRecord> {
    // Artificial latency to simulate OCR + Rule evaluation pipeline (realistic response time)
    await new Promise((resolve) => setTimeout(resolve, 1400));

    // Resolve image URL
    let resolvedImageUrl = '';
    if (typeof fileOrUrl === 'string' && fileOrUrl.trim() !== '') {
      resolvedImageUrl = fileOrUrl;
    } else if (typeof window !== 'undefined' && fileOrUrl instanceof File) {
      resolvedImageUrl = URL.createObjectURL(fileOrUrl);
    }

    let template: InspectionRecord;

    if (sampleId) {
      const matchedSample = SAMPLE_PACKAGE_SCENARIOS.find((s) => s.id === sampleId);
      template = matchedSample ? matchedSample.sampleData : SAMPLE_INSPECTION_A_BISCUITS;
      if (!resolvedImageUrl) {
        resolvedImageUrl = template.imageUrl;
      }
    } else if (resolvedImageUrl) {
      // User uploaded their own custom package image - create realistic dynamic mock inspection
      const randomSerial = Math.floor(1000 + Math.random() * 9000);
      const customRecord: InspectionRecord = {
        id: `insp-custom-${Date.now()}`,
        inspectionNumber: `LM-2026-INSP-${randomSerial}`,
        timestamp: new Date().toISOString(),
        status: 'POTENTIAL_VIOLATION',
        inputMode: mode,
        imageUrl: resolvedImageUrl,
        thumbnailUrl: resolvedImageUrl,
        commodityCategory: commodityHint || 'Packaged Consumer Goods',
        brandName: commodityHint ? `${commodityHint} (Field Scan)` : 'Field Inspected Commodity Sample',
        barcodeData: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        declarations: {
          productName: {
            key: 'productName',
            label: 'Product Identity / Name',
            category: 'IDENTITY',
            extractedValue: commodityHint || 'Field Packaged Commodity',
            confidence: 0.96,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(b)',
            boundingBox: {
              id: 'box-cust-pname',
              fieldKey: 'productName',
              ymin: 0.10,
              xmin: 0.15,
              ymax: 0.22,
              xmax: 0.85,
              label: 'Product Name',
              confidence: 0.96,
              color: '#10B981'
            }
          },
          genericName: {
            key: 'genericName',
            label: 'Generic Commodity Name',
            category: 'IDENTITY',
            extractedValue: 'Standard Retail Packaged Good',
            confidence: 0.92,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(b)',
            boundingBox: {
              id: 'box-cust-gname',
              fieldKey: 'genericName',
              ymin: 0.23,
              xmin: 0.18,
              ymax: 0.31,
              xmax: 0.82,
              label: 'Generic Name',
              confidence: 0.92,
              color: '#10B981'
            }
          },
          manufacturerName: {
            key: 'manufacturerName',
            label: 'Manufacturer / Packer Name',
            category: 'MANUFACTURER',
            extractedValue: 'National FMCG Manufacturing Corp India Ltd',
            confidence: 0.94,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(a)',
            boundingBox: {
              id: 'box-cust-mfg',
              fieldKey: 'manufacturerName',
              ymin: 0.33,
              xmin: 0.12,
              ymax: 0.42,
              xmax: 0.88,
              label: 'Manufacturer Name',
              confidence: 0.94,
              color: '#10B981'
            }
          },
          manufacturerAddress: {
            key: 'manufacturerAddress',
            label: 'Complete Manufacturing Address',
            category: 'MANUFACTURER',
            extractedValue: 'Plot 42, Industrial Area Phase II, Gurugram, Haryana - 122002',
            confidence: 0.89,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(a)',
            boundingBox: {
              id: 'box-cust-addr',
              fieldKey: 'manufacturerAddress',
              ymin: 0.43,
              xmin: 0.12,
              ymax: 0.52,
              xmax: 0.88,
              label: 'Manufacturer Address',
              confidence: 0.89,
              color: '#10B981'
            }
          },
          netQuantity: {
            key: 'netQuantity',
            label: 'Net Quantity',
            category: 'METRICS',
            extractedValue: '250 g',
            normalizedValue: '250 g',
            confidence: 0.91,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(c) & Rule 7',
            boundingBox: {
              id: 'box-cust-qty',
              fieldKey: 'netQuantity',
              ymin: 0.54,
              xmin: 0.12,
              ymax: 0.64,
              xmax: 0.48,
              label: 'Net Qty (250 g)',
              confidence: 0.91,
              color: '#EF4444'
            }
          },
          mrp: {
            key: 'mrp',
            label: 'Maximum Retail Price (MRP)',
            category: 'MRP',
            extractedValue: '₹ 85.00 (Incl. of all taxes)',
            normalizedValue: '85.00',
            confidence: 0.95,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(e)',
            boundingBox: {
              id: 'box-cust-mrp',
              fieldKey: 'mrp',
              ymin: 0.54,
              xmin: 0.52,
              ymax: 0.64,
              xmax: 0.88,
              label: 'MRP ₹85.00',
              confidence: 0.95,
              color: '#10B981'
            }
          },
          unitSalePrice: {
            key: 'unitSalePrice',
            label: 'Unit Sale Price (USP)',
            category: 'MRP',
            extractedValue: '₹ 0.34 / g',
            normalizedValue: '0.34',
            confidence: 0.88,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(e)',
            boundingBox: {
              id: 'box-cust-usp',
              fieldKey: 'unitSalePrice',
              ymin: 0.65,
              xmin: 0.52,
              ymax: 0.72,
              xmax: 0.88,
              label: 'USP ₹0.34/g',
              confidence: 0.88,
              color: '#10B981'
            }
          },
          manufactureDate: {
            key: 'manufactureDate',
            label: 'Date of Manufacture / Packing',
            category: 'DATES',
            extractedValue: '12/2025',
            confidence: 0.93,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(d)',
            boundingBox: {
              id: 'box-cust-mfgdate',
              fieldKey: 'manufactureDate',
              ymin: 0.65,
              xmin: 0.12,
              ymax: 0.72,
              xmax: 0.48,
              label: 'Mfg Date 12/2025',
              confidence: 0.93,
              color: '#10B981'
            }
          },
          countryOfOrigin: {
            key: 'countryOfOrigin',
            label: 'Country of Origin',
            category: 'LEGAL',
            extractedValue: 'Made in India',
            confidence: 0.97,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(n)',
            boundingBox: {
              id: 'box-cust-origin',
              fieldKey: 'countryOfOrigin',
              ymin: 0.74,
              xmin: 0.12,
              ymax: 0.82,
              xmax: 0.48,
              label: 'Origin: India',
              confidence: 0.97,
              color: '#10B981'
            }
          },
          consumerCarePhone: {
            key: 'consumerCarePhone',
            label: 'Consumer Care Helpline',
            category: 'CONSUMER_CARE',
            extractedValue: '1800-180-4567',
            confidence: 0.92,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(n)',
            boundingBox: {
              id: 'box-cust-phone',
              fieldKey: 'consumerCarePhone',
              ymin: 0.74,
              xmin: 0.52,
              ymax: 0.82,
              xmax: 0.88,
              label: 'Consumer Care Tel',
              confidence: 0.92,
              color: '#10B981'
            }
          },
          consumerCareEmail: {
            key: 'consumerCareEmail',
            label: 'Consumer Care Email',
            category: 'CONSUMER_CARE',
            extractedValue: 'customercare@fmcgcorp.in',
            confidence: 0.91,
            confidenceLevel: 'HIGH',
            isMandatory: true,
            legalRuleRef: 'Rule 6(1)(n)',
            boundingBox: {
              id: 'box-cust-email',
              fieldKey: 'consumerCareEmail',
              ymin: 0.83,
              xmin: 0.12,
              ymax: 0.92,
              xmax: 0.88,
              label: 'Consumer Email',
              confidence: 0.91,
              color: '#10B981'
            }
          }
        },
        violations: [
          {
            id: `vio-cust-${randomSerial}-1`,
            ruleCode: 'RULE_7_PDP_FONT',
            ruleTitle: 'Non-compliant Net Quantity Numeral Font Height on Principal Display Panel',
            legalActSection: 'Rule 7(1) & Table 1 of Legal Metrology (Packaged Commodities) Rules, 2011',
            severity: 'CRITICAL',
            description: 'For package net quantity 200g-500g, minimum mandatory numeral height is 4.0mm. Measured optical numeral height is ~2.8mm.',
            extractedValueFound: 'Numeral Height: ~2.8mm (Non-compliant)',
            expectedRequirement: 'Minimum 4.0mm numeral height required for 200g-500g net content under Rule 7 Table 1.',
            suggestedAction: 'Issue Notice under Section 36(1) of Legal Metrology Act, 2009 for violation of Rule 7.',
            fieldKeyRelated: 'netQuantity',
            confidence: 0.91,
            evidenceBoundingBox: {
              id: 'box-cust-qty',
              fieldKey: 'netQuantity',
              ymin: 0.54,
              xmin: 0.12,
              ymax: 0.64,
              xmax: 0.48,
              label: 'Undersized Font Height',
              confidence: 0.91,
              color: '#EF4444'
            }
          }
        ],
        reportSummary: {
          totalFieldsChecked: 11,
          violationsCount: 1,
          complianceScorePercentage: 88,
          overallVerdict: 'POTENTIAL STATUTORY VIOLATION (Rule 7 Font Size)',
          isSafeForFinalNotice: true
        },
        metadata: {
          location: 'Field Retail Inspection Unit',
          retailerName: 'Field Sample Retailer',
          deviceType: 'Web Inspection Terminal',
          processingTimeMs: 1450,
          isDemoDataset: false
        }
      };

      const current = getStoredInspections();
      saveStoredInspections([customRecord, ...current]);
      return customRecord;
    } else {
      template = SAMPLE_INSPECTION_A_BISCUITS;
      resolvedImageUrl = template.imageUrl;
    }

    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const newRecord: InspectionRecord = {
      ...template,
      id: `insp-live-${Date.now()}`,
      inspectionNumber: `LM-2026-INSP-${randomSerial}`,
      timestamp: new Date().toISOString(),
      inputMode: mode,
      imageUrl: resolvedImageUrl || template.imageUrl,
      thumbnailUrl: resolvedImageUrl || template.thumbnailUrl
    };

    const current = getStoredInspections();
    saveStoredInspections([newRecord, ...current]);
    return newRecord;
  },

  async saveOfficerVerification(
    inspectionId: string,
    verification: OfficerVerification
  ): Promise<InspectionRecord> {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const records = getStoredInspections();
    const idx = records.findIndex((r) => r.id === inspectionId);

    if (idx === -1) {
      throw new Error(`Inspection record with ID ${inspectionId} not found`);
    }

    let finalStatus = records[idx].status;
    if (verification.decision === 'REJECTED') {
      finalStatus = 'COMPLIANT';
    } else if (verification.decision === 'MODIFIED') {
      finalStatus = 'MANUAL_REVIEW';
    } else if (verification.decision === 'CONFIRMED') {
      finalStatus = records[idx].violations.length > 0 ? 'POTENTIAL_VIOLATION' : 'COMPLIANT';
    }

    const updated: InspectionRecord = {
      ...records[idx],
      officerVerification: verification,
      status: finalStatus
    };

    records[idx] = updated;
    saveStoredInspections(records);
    return updated;
  },

  async correctExtractedField(
    inspectionId: string,
    fieldKey: string,
    correctedValue: string
  ): Promise<InspectionRecord> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const records = getStoredInspections();
    const idx = records.findIndex((r) => r.id === inspectionId);

    if (idx === -1) {
      throw new Error(`Inspection record with ID ${inspectionId} not found`);
    }

    const record = records[idx];
    const declarations = { ...record.declarations } as unknown as Record<string, any>;

    if (declarations[fieldKey]) {
      declarations[fieldKey] = {
        ...declarations[fieldKey],
        officerEditedValue: correctedValue,
        isConfirmedByOfficer: true
      };
    }

    const updated: InspectionRecord = {
      ...record,
      declarations: declarations as unknown as InspectionRecord['declarations']
    };

    records[idx] = updated;
    saveStoredInspections(records);
    return updated;
  },

  async dismissViolation(
    inspectionId: string,
    violationId: string,
    reason: string
  ): Promise<InspectionRecord> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const records = getStoredInspections();
    const idx = records.findIndex((r) => r.id === inspectionId);

    if (idx === -1) {
      throw new Error(`Inspection record with ID ${inspectionId} not found`);
    }

    const record = records[idx];
    const violations = record.violations.map((v) =>
      v.id === violationId
        ? { ...v, isDismissedByOfficer: true, officerDismissReason: reason }
        : v
    );

    const activeViolationsCount = violations.filter((v) => !v.isDismissedByOfficer).length;
    const updated: InspectionRecord = {
      ...record,
      violations,
      status: activeViolationsCount === 0 ? 'COMPLIANT' : record.status
    };

    records[idx] = updated;
    saveStoredInspections(records);
    return updated;
  },

  async reinstateViolation(
    inspectionId: string,
    violationId: string
  ): Promise<InspectionRecord> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const records = getStoredInspections();
    const idx = records.findIndex((r) => r.id === inspectionId);

    if (idx === -1) {
      throw new Error(`Inspection record with ID ${inspectionId} not found`);
    }

    const record = records[idx];
    const violations = record.violations.map((v) =>
      v.id === violationId
        ? { ...v, isDismissedByOfficer: false, officerDismissReason: undefined }
        : v
    );

    const updated: InspectionRecord = {
      ...record,
      violations,
      status: 'POTENTIAL_VIOLATION'
    };

    records[idx] = updated;
    saveStoredInspections(records);
    return updated;
  },

  async getSampleScenarios(): Promise<SamplePackageScenario[]> {
    return SAMPLE_PACKAGE_SCENARIOS;
  },

  resetToDefaultDataset(): InspectionRecord[] {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_INSPECTIONS_HISTORY));
    }
    return INITIAL_INSPECTIONS_HISTORY;
  }
};
