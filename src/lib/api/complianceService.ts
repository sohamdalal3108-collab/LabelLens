import { LegalMetrologyRule } from '@/lib/types/compliance';
import { LEGAL_METROLOGY_RULES_2011, PENALTY_REFERENCE_DICTIONARY } from '@/config/legalMetrologyRules';

export const ComplianceService = {
  getLegalRules(): LegalMetrologyRule[] {
    return LEGAL_METROLOGY_RULES_2011;
  },

  getRuleByCode(ruleCode: string): LegalMetrologyRule | undefined {
    return LEGAL_METROLOGY_RULES_2011.find((r) => r.ruleCode === ruleCode);
  },

  getPenaltyCitation(sectionCode: string): string {
    return PENALTY_REFERENCE_DICTIONARY[sectionCode] || 'Penalty under Section 36 of Legal Metrology Act, 2009.';
  },

  filterRules(searchQuery: string, category?: string): LegalMetrologyRule[] {
    let rules = LEGAL_METROLOGY_RULES_2011;
    if (category && category !== 'ALL') {
      rules = rules.filter((r) => r.category === category);
    }
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      rules = rules.filter(
        (r) =>
          r.ruleNumber.toLowerCase().includes(q) ||
          r.ruleTitle.toLowerCase().includes(q) ||
          r.officialDescription.toLowerCase().includes(q)
      );
    }
    return rules;
  }
};
