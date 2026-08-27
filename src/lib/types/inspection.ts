export type ComplianceStatus = 'COMPLIANT' | 'POTENTIAL_VIOLATION' | 'MANUAL_REVIEW';
export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type OfficerDecision = 'CONFIRMED' | 'REJECTED' | 'MODIFIED' | 'PENDING';
export type InputMode = 'QR_CODE' | 'CAMERA_CAPTURE' | 'FILE_UPLOAD' | 'DEMO_SAMPLE';

/**
 * Geometric bounding box representation on the physical package evidence
 */
export interface BoundingBox {
  id: string;
  fieldKey: string;
  // Normalized coordinates (0.0 to 1.0)
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
  label: string;
  confidence: number;
  color?: string;
  isSimulatedDemo?: boolean;
}

// Alias for API consistency
export type Evidence = BoundingBox;

/**
 * Structured declaration extracted via OCR & field parser
 */
export interface ExtractedField {
  key: string;
  label: string;
  category: 'IDENTITY' | 'MANUFACTURER' | 'METRICS' | 'DATES' | 'CONSUMER_CARE' | 'LEGAL' | 'MRP';
  extractedValue: string;
  normalizedValue?: string | number;
  confidence: number; // 0.0 to 1.0
  confidenceLevel: ConfidenceLevel;
  boundingBox?: BoundingBox;
  isMandatory: boolean;
  legalRuleRef?: string;
  officerEditedValue?: string;
  isConfirmedByOfficer?: boolean;
}

/**
 * Mandatory declarations under Legal Metrology Rules, 2011
 */
export interface StatutoryDeclarations {
  productName: ExtractedField;
  genericName?: ExtractedField;
  manufacturerName: ExtractedField;
  manufacturerAddress: ExtractedField;
  mrp: ExtractedField;
  netQuantity: ExtractedField;
  unitSalePrice?: ExtractedField;
  manufactureDate?: ExtractedField;
  expiryDate?: ExtractedField;
  bestBefore?: ExtractedField;
  consumerCareEmail: ExtractedField;
  consumerCarePhone: ExtractedField;
  consumerCareAddress?: ExtractedField;
  countryOfOrigin?: ExtractedField;
  fssaiLicense?: ExtractedField;
  importerDetails?: ExtractedField;
  batchNumber?: ExtractedField;
  additionalDeclarations?: Record<string, ExtractedField>;
}

/**
 * Rule compliance finding evaluated by the engine
 */
export interface RuleViolation {
  id: string;
  ruleCode: string; // e.g. "RULE_6_1_A", "RULE_7_PDP_FONT", "RULE_12_EDIBLE_OIL"
  ruleTitle: string;
  legalActSection: string; // e.g. "Rule 6(1)(n) - Legal Metrology (Packaged Commodities) Rules, 2011"
  severity: 'CRITICAL' | 'MODERATE' | 'ADVISORY';
  description: string;
  extractedValueFound: string;
  expectedRequirement: string;
  suggestedAction: string;
  fieldKeyRelated?: string;
  confidence: number;
  evidenceBoundingBox?: BoundingBox;
  isDismissedByOfficer?: boolean;
  officerDismissReason?: string;
  isConfirmedByOfficer?: boolean;
}

// Alias for API consistency
export type ComplianceFinding = RuleViolation;

/**
 * Final statutory determination recorded by the field officer
 */
export interface OfficerVerification {
  officerId: string;
  officerName: string;
  officerDesignation: string;
  badgeNumber: string;
  decision: OfficerDecision;
  fieldModifications?: Record<string, string>;
  confirmedViolations: string[];
  dismissedViolations: string[];
  officerNotes: string;
  verifiedAt: string;
  digitalSignatureToken?: string;
  seizureRecommended?: boolean;
  noticeIssued?: boolean;
}

/**
 * Complete inspection record returned by the backend pipeline
 */
export interface InspectionRecord {
  id: string;
  inspectionNumber: string; // e.g. "LM-2026-INSP-0482"
  timestamp: string;
  status: ComplianceStatus;
  inputMode: InputMode;
  imageUrl: string;
  thumbnailUrl?: string;
  commodityCategory: string; // e.g. "Food / Confectionery", "Spices", "Cosmetics", "Edible Oil"
  brandName: string;
  barcodeData?: string;
  declarations: StatutoryDeclarations;
  violations: RuleViolation[];
  manualReviewReasons?: string[];
  officerVerification?: OfficerVerification;
  reportSummary: {
    totalFieldsChecked: number;
    violationsCount: number;
    complianceScorePercentage: number;
    overallVerdict: string;
    isSafeForFinalNotice: boolean;
  };
  metadata?: {
    location?: string;
    retailerName?: string;
    retailerAddress?: string;
    deviceType?: string;
    processingTimeMs?: number;
    isDemoDataset?: boolean;
  };
}

// Backend API Request & Response Contracts
export interface InspectionRequest {
  image?: File | Blob | string;
  imageUrl?: string;
  inputMode: InputMode;
  commodityHint?: string;
  retailerName?: string;
  retailerAddress?: string;
  barcodeData?: string;
}

export type InspectionResponse = InspectionRecord;

export interface SamplePackageScenario {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badgeStatus: ComplianceStatus;
  thumbnailUrl: string;
  description: string;
  sampleData: InspectionRecord;
}

/**
 * Helper to compute confidence level tier
 */
export function getConfidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence >= 0.85) return 'HIGH';
  if (confidence >= 0.60) return 'MEDIUM';
  return 'LOW';
}
