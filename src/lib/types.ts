export interface OFFProduct {
  barcode: string;
  name: string | null;
  brand: string | null;
  quantity: string | null;
  ingredients_text: string | null;
  additives_tags: string[];
  nutriments: Record<string, unknown>;
  image_url: string | null;
}

export type LookupResult =
  | { found: true; source: "openfoodfacts"; product: OFFProduct }
  | { found: false; reason: "not_in_database" };

export interface ExtractedField<T = string | boolean | string[] | null> {
  value: T;
  confidence: number;
}

export interface ExtractedFields {
  mrp: ExtractedField<string | null>;
  mrp_inclusive_taxes_stated: ExtractedField<boolean>;
  net_quantity: ExtractedField<string | null>;
  fssai_license: ExtractedField<string | null>;
  mfg_date: ExtractedField<string | null>;
  best_before: ExtractedField<string | null>;
  batch_number: ExtractedField<string | null>;
  consumer_care: ExtractedField<string | null>;
  ingredients: ExtractedField<string[]>;
  manufacturer_address: ExtractedField<string | null>;
}

export interface Violation {
  ruleId: string;
  field: string;
  requirement: string;
  section: string;
  recommendedAction: string;
}

export interface UnverifiedField {
  ruleId: string;
  field: string;
  reason: string;
}

export interface FlaggedSubstance {
  ingredient: string;
  substance: string;
  status: string;
  regulation: string;
  note?: string;
}

export interface ComplianceReport {
  violations: Violation[];
  unverified_fields: UnverifiedField[];
  flagged_substances: FlaggedSubstance[];
  summary: { violation_count: number; flagged_substance_count: number };
}

export interface ScanResult extends ComplianceReport {
  barcode: string | null;
  source: "ocr";
  fields: ExtractedFields;
  raw_ocr_text: string;
  ocr_block_count: number;
}
