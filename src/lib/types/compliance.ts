export interface LegalMetrologyRule {
  ruleCode: string;
  ruleNumber: string;
  ruleTitle: string;
  subRule?: string;
  category: 'GENERAL_DECLARATIONS' | 'PRINCIPAL_DISPLAY_PANEL' | 'NET_QUANTITY' | 'MRP' | 'CONSUMER_CARE' | 'DATES' | 'EXEMPTIONS';
  officialDescription: string;
  mandatedRequirements: string[];
  mandatoryFor: string[];
  applicablePenaltySection: string; // e.g. "Section 36(1) of Legal Metrology Act, 2009 (Fine up to ₹25,000 / ₹50,000 / 1 year imprisonment)"
  minimumFontRequirements?: {
    packageArea: string;
    minHeightMm: number;
    blownMouldedMinHeightMm?: number;
  }[];
  guidelines: string;
}

export interface RuleEvaluationResult {
  ruleCode: string;
  isCompliant: boolean;
  status: 'PASS' | 'FAIL' | 'UNCERTAIN';
  extractedText: string;
  expectedText: string;
  violationMessage?: string;
  penaltyCitation?: string;
  suggestedAction?: string;
}
