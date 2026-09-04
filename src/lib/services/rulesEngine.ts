import legalMetrologyRules from "../../data/legalMetrologyRules.json";
import bannedSubstances from "../../data/bannedSubstances.json";
import type {
  ExtractedFields,
  Violation,
  UnverifiedField,
  FlaggedSubstance,
  ComplianceReport,
} from "../types";

interface Rule {
  id: string;
  field: keyof ExtractedFields;
  requirement: string;
  section: string;
  check: "field_present" | "field_true" | "field_present_nonempty";
}

/**
 * Checks structured fields against Legal Metrology / FSSAI mandatory-field rules.
 * Only checks fields with confidence above a minimum threshold — low-confidence
 * fields are treated as "unverified", not "missing", to avoid false violations.
 */
function checkMandatoryFields(
  fields: ExtractedFields,
  minConfidence = 0.5
): { violations: Violation[]; unverified: UnverifiedField[] } {
  const violations: Violation[] = [];
  const unverified: UnverifiedField[] = [];

  for (const rule of legalMetrologyRules as Rule[]) {
    const field = fields[rule.field];

    if (!field || field.confidence < minConfidence) {
      unverified.push({ ruleId: rule.id, field: rule.field, reason: "low_ocr_confidence" });
      continue;
    }

    let passed = true;
    if (rule.check === "field_present") passed = !!field.value;
    if (rule.check === "field_true") passed = field.value === true;
    if (rule.check === "field_present_nonempty")
      passed = Array.isArray(field.value) && field.value.length > 0;

    if (!passed) {
      violations.push({
        ruleId: rule.id,
        field: rule.field,
        requirement: rule.requirement,
        section: rule.section,
        recommendedAction:
          `This appears to violate ${rule.section}. ` +
          `Consumers can report this to the Legal Metrology Department / FSSAI via the ` +
          `National Consumer Helpline or the FSSAI Food Safety Connect portal.`,
      });
    }
  }

  return { violations, unverified };
}

/**
 * Cross-checks the extracted ingredients list against the banned/restricted
 * substances reference data. Simple substring match for v1 — swap for
 * fuzzy matching if OCR misspells ingredient names often in testing.
 */
function checkIngredientSafety(fields: ExtractedFields): FlaggedSubstance[] {
  const ingredients = fields.ingredients.value || [];
  const flagged: FlaggedSubstance[] = [];

  for (const ingredient of ingredients) {
    const lower = ingredient.toLowerCase();
    for (const substance of bannedSubstances) {
      const match = substance.aliases.some((alias) => lower.includes(alias.toLowerCase()));
      if (match) {
        flagged.push({
          ingredient,
          substance: substance.name,
          status: substance.status,
          regulation: substance.regulation,
          note: substance.note,
        });
      }
    }
  }

  return flagged;
}

/**
 * Main entry point: structured fields -> full compliance report.
 */
export function evaluate(fields: ExtractedFields): ComplianceReport {
  const { violations, unverified } = checkMandatoryFields(fields);
  const flagged_substances = checkIngredientSafety(fields);

  return {
    violations,
    unverified_fields: unverified,
    flagged_substances,
    summary: {
      violation_count: violations.length,
      flagged_substance_count: flagged_substances.length,
    },
  };
}
