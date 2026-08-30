import type { ExtractedFields, ExtractedField } from "../types";

/**
 * Extracts Legal Metrology / FSSAI mandatory fields from raw OCR text.
 * Each field gets a confidence score — low-confidence fields should be
 * flagged for user confirmation on the client rather than trusted silently.
 */

const PATTERNS = {
  mrp: /(?:MRP|M\.R\.P|Maximum Retail Price)[:\s₹Rs.]*(\d+(?:\.\d{1,2})?)/i,
  inclusiveTaxes: /inclusive of all taxes/i,
  netQuantity: /(?:Net\s?(?:Qty|Quantity|Wt|Weight))[:\s]*(\d+(?:\.\d+)?)\s*(g|kg|ml|l|gm|gms)/i,
  fssaiLicense: /FSSAI\s*(?:Lic(?:ense)?\.?\s*No\.?)?[:\s]*(\d{14})/i,
  mfgDate:
    /(?:Mfg|Manufactured|Pkd|Packed)[.\s]*(?:Date|On|Dt)?[:\s]*(\d{1,2}[/-]\d{4}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i,
  bestBefore:
    /(?:Best Before|Use By|Expiry)[:\s]*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d+\s*(?:months|days))/i,
  batchNumber: /(?:Batch|Lot)\s*(?:No\.?)?[:\s]*([A-Z0-9]+)/i,
  consumerCare: /(?:Consumer Care|Customer Care|For queries)[:\s]*([\d\s+()-]{8,})/i,
};

function extractField(text: string, pattern: RegExp): ExtractedField<string | null> {
  const match = text.match(pattern);
  if (!match) return { value: null, confidence: 0 };
  return { value: (match[1] ?? "").trim() || null, confidence: 0.85 };
}

/**
 * Ingredients list needs order preserved (regulation cares about
 * descending order by proportion), so this is a dedicated block extractor
 * rather than a single regex.
 */
function extractIngredients(text: string): ExtractedField<string[]> {
  const match = text.match(/Ingredients?[:\s]*(.+?)(?:\n\n|Nutritional|Nutrition Facts|$)/is);
  if (!match) return { value: [], confidence: 0 };

  const list = match[1]
    .split(/,|;/)
    .map((s) => s.trim())
    .filter(Boolean);

  return { value: list, confidence: list.length > 0 ? 0.75 : 0.2 };
}

/**
 * Manufacturer/packer/importer address block — free text, lower confidence
 * since format varies widely.
 */
function extractAddress(text: string): ExtractedField<string | null> {
  const match = text.match(
    /(?:Manufactured by|Marketed by|Packed by|Mfd\.? by)[:\s]*(.+?)(?:\n\n|FSSAI|Consumer Care|$)/is
  );
  if (!match) return { value: null, confidence: 0 };
  return { value: match[1].trim(), confidence: 0.6 };
}

/**
 * Main entry point: raw OCR text -> structured field object
 * matching the output contract handed to the rules engine.
 */
export function extractFields(rawText: string): ExtractedFields {
  const netQtyMatch = rawText.match(PATTERNS.netQuantity);

  return {
    mrp: extractField(rawText, PATTERNS.mrp),
    mrp_inclusive_taxes_stated: {
      value: PATTERNS.inclusiveTaxes.test(rawText),
      confidence: 0.9,
    },
    net_quantity: netQtyMatch
      ? { value: `${netQtyMatch[1]}${netQtyMatch[2]}`, confidence: 0.85 }
      : { value: null, confidence: 0 },
    fssai_license: extractField(rawText, PATTERNS.fssaiLicense),
    mfg_date: extractField(rawText, PATTERNS.mfgDate),
    best_before: extractField(rawText, PATTERNS.bestBefore),
    batch_number: extractField(rawText, PATTERNS.batchNumber),
    consumer_care: extractField(rawText, PATTERNS.consumerCare),
    ingredients: extractIngredients(rawText),
    manufacturer_address: extractAddress(rawText),
  };
}
