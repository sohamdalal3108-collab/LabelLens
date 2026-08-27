import { LegalMetrologyRule } from '@/lib/types/compliance';

export const LEGAL_METROLOGY_RULES_2011: LegalMetrologyRule[] = [
  {
    ruleCode: 'RULE_6_1_A',
    ruleNumber: 'Rule 6(1)(a)',
    ruleTitle: 'Name and Complete Address of Manufacturer / Packer / Importer',
    subRule: 'Clause (a)',
    category: 'GENERAL_DECLARATIONS',
    officialDescription:
      'Every package shall bear the name and complete address of the manufacturer, or where the manufacturer is not the packer, the name and address of the manufacturer and packer, or in case of imported packages, the name and address of the importer with country of origin.',
    mandatedRequirements: [
      'Must contain complete postal address including premises number, street, city, state, and pin code.',
      'For imported items, "Country of Origin" must be prominently declared alongside importer name and address.',
      'Qualifying words like "Manufactured by", "Packed by", or "Imported by" must precede the declaration.'
    ],
    mandatoryFor: ['All packaged commodities without exception'],
    applicablePenaltySection: 'Section 36(1) of Legal Metrology Act, 2009 — Fine up to ₹25,000 (1st offence), ₹50,000 (2nd offence), up to ₹1,00,000 or 1 year imprisonment.',
    guidelines: 'Inspect whether the address is full and identifiable or merely a website/brand name. Website URL alone is non-compliant.'
  },
  {
    ruleCode: 'RULE_6_1_B',
    ruleNumber: 'Rule 6(1)(b)',
    ruleTitle: 'Common or Generic Name of Commodity',
    subRule: 'Clause (b)',
    category: 'GENERAL_DECLARATIONS',
    officialDescription:
      'Every package shall state the common or generic names of the commodity contained in the package, and in case of packages with more than one product, the name and number or quantity of each.',
    mandatedRequirements: [
      'Generic product identity must be explicit (e.g., "Biscuits", "Ground Spices", "Sunflower Oil").',
      'Brand fantasy names alone without generic classification violate Rule 6(1)(b).'
    ],
    mandatoryFor: ['All packaged commodities'],
    applicablePenaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    guidelines: 'Check if fantasy brand names are accompanied by clear standard generic names in readable font.'
  },
  {
    ruleCode: 'RULE_6_1_C',
    ruleNumber: 'Rule 6(1)(c)',
    ruleTitle: 'Net Quantity in Standard Metric Units',
    subRule: 'Clause (c)',
    category: 'NET_QUANTITY',
    officialDescription:
      'Every package shall declare the net quantity in terms of the standard unit of weight or measure (metric system) or number where the commodity is sold by number.',
    mandatedRequirements: [
      'Must use standard metric symbols: g, kg, ml, l, m, cm, or "N" / "U" for numbers.',
      'Non-standard symbols (e.g., "gms", "Kgs", "ltrs", "ml.") are strictly prohibited.',
      'No misleading words like "Approx.", "When packed", "Jumbo", or "Net weight when dry" are permitted.'
    ],
    mandatoryFor: ['All packaged commodities'],
    applicablePenaltySection: 'Section 36(1) & Section 39 of Legal Metrology Act, 2009',
    guidelines: 'Verify strict adherence to International System of Units (SI). Verify font height complies with Rule 7.'
  },
  {
    ruleCode: 'RULE_6_1_D',
    ruleNumber: 'Rule 6(1)(d)',
    ruleTitle: 'Date of Manufacture / Pre-packing / Import',
    subRule: 'Clause (d)',
    category: 'DATES',
    officialDescription:
      'Every package shall bear the month and year in which the commodity is manufactured or pre-packed or imported.',
    mandatedRequirements: [
      'Must be clearly declared in words or numerals (e.g., "Mfg Date: 04/2026" or "Packed: April 2026").',
      'For commodities having limited shelf-life or food items, Best Before / Use By date must also be clearly stated as per FSSAI / Legal Metrology alignment.'
    ],
    mandatoryFor: ['All packaged commodities'],
    applicablePenaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    guidelines: 'Check for illegible dot-matrix stamps or missing month/year declarations.'
  },
  {
    ruleCode: 'RULE_6_1_E',
    ruleNumber: 'Rule 6(1)(e)',
    ruleTitle: 'Retail Sale Price (MRP) & Unit Sale Price (USP)',
    subRule: 'Clause (e)',
    category: 'MRP',
    officialDescription:
      'The retail sale price of the package shall clearly declare "Maximum or Max. Retail Price ₹ ... inclusive of all taxes" or "MRP ₹ ... incl. of all taxes". Packages containing more than 1 unit must also state the Unit Sale Price (₹/g, ₹/ml, ₹/piece).',
    mandatedRequirements: [
      'Must explicitly state "inclusive of all taxes" or "incl. of all taxes".',
      'Smudging, overwriting, or sticking price tags over printed MRP is an offence.',
      'Unit Sale Price (USP) must be displayed up to two decimal places where mandatory.'
    ],
    mandatoryFor: ['All commercial retail packages'],
    applicablePenaltySection: 'Section 36(1) of Legal Metrology Act, 2009 — Mandatory fine and notice.',
    guidelines: 'Ensure currency symbol (₹ or Rs.) is accompanied by tax inclusion declaration and USP where required.'
  },
  {
    ruleCode: 'RULE_6_1_N',
    ruleNumber: 'Rule 6(1)(n)',
    ruleTitle: 'Consumer Care Details (Phone, Email, Postal Address)',
    subRule: 'Clause (n)',
    category: 'CONSUMER_CARE',
    officialDescription:
      'Every package shall bear the name, address, telephone number, and e-mail address of the person or office which can be contacted by the consumer in case of consumer complaints or queries.',
    mandatedRequirements: [
      'Mandatory 4 elements: Contact Person/Designation, Complete Address, Working Phone/Toll-free number, and Valid Email ID.',
      'Omission of Email ID or Phone number is a direct statutory non-compliance.'
    ],
    mandatoryFor: ['All packaged commodities'],
    applicablePenaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    guidelines: 'Inspect for presence of all four contact elements. Missing email address is one of the most common field violations.'
  },
  {
    ruleCode: 'RULE_7_PDP',
    ruleNumber: 'Rule 7 & Table 1',
    ruleTitle: 'Principal Display Panel (PDP) Dimensions & Minimum Font Height',
    category: 'PRINCIPAL_DISPLAY_PANEL',
    officialDescription:
      'The Principal Display Panel must occupy the required percentage of package area and all numeral/letter declarations (especially Net Quantity and MRP) must meet the statutory minimum font height based on package area.',
    mandatedRequirements: [
      'Package Area ≤ 50 cm²: Min font height = 1.0 mm (Blown/Moulded: 2.0 mm)',
      'Package Area 50 to 200 cm²: Min font height = 2.0 mm (Blown/Moulded: 4.0 mm)',
      'Package Area 200 to 1000 cm²: Min font height = 4.0 mm (Blown/Moulded: 6.0 mm)',
      'Package Area > 1000 cm²: Min font height = 6.0 mm (Blown/Moulded: 8.0 mm)'
    ],
    mandatoryFor: ['All packaged commodities'],
    applicablePenaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    minimumFontRequirements: [
      { packageArea: '≤ 50 cm²', minHeightMm: 1.0, blownMouldedMinHeightMm: 2.0 },
      { packageArea: '50 cm² to 200 cm²', minHeightMm: 2.0, blownMouldedMinHeightMm: 4.0 },
      { packageArea: '200 cm² to 1000 cm²', minHeightMm: 4.0, blownMouldedMinHeightMm: 6.0 },
      { packageArea: '> 1000 cm²', minHeightMm: 6.0, blownMouldedMinHeightMm: 8.0 }
    ],
    guidelines: 'Check if font size on package is undersized relative to the surface area of the carton/pouch/bottle.'
  },
  {
    ruleCode: 'RULE_9_MANNER',
    ruleNumber: 'Rule 9',
    ruleTitle: 'Manner of Declaration and Contrast',
    category: 'GENERAL_DECLARATIONS',
    officialDescription:
      'Every declaration which is required to be made on a package shall be legible, prominent, definite, plain and unambiguous. Declarations must have a conspicuous background with high visual contrast.',
    mandatedRequirements: [
      'Declarations shall not be printed on transparent portions where background interferes with legibility.',
      'Dark letters on light background or light letters on dark background required.'
    ],
    mandatoryFor: ['All packaged commodities'],
    applicablePenaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    guidelines: 'Check for camouflaged text, low contrast backgrounds, or micro-text hidden in folds.'
  },
  {
    ruleCode: 'RULE_12_EDIBLE_OIL',
    ruleNumber: 'Rule 12(2)',
    ruleTitle: 'Specific Commodities — Edible Oils & Volume/Mass Declarations',
    category: 'NET_QUANTITY',
    officialDescription:
      'For edible oils and certain vanaspati packages, declaration of quantity shall be made in terms of mass (weight) or volume with temperature declaration at packing time.',
    mandatedRequirements: [
      'Edible oil declared in volume (litres/ml) must specify corresponding net mass in grams/kg or density temperature.',
      'Must avoid deceptive pouch slack fill.'
    ],
    mandatoryFor: ['Edible vegetable oils, mustard oil, refined oils'],
    applicablePenaltySection: 'Section 36(1) of Legal Metrology Act, 2009',
    guidelines: 'Verify dual mass/volume declaration on edible oil pouches.'
  }
];

export const PENALTY_REFERENCE_DICTIONARY: Record<string, string> = {
  'SECTION_36_1': 'Section 36(1) of Legal Metrology Act, 2009: Non-standard package declarations. Penalty: ₹25,000 for 1st offence, ₹50,000 for 2nd offence, up to ₹1,00,000 or imprisonment for subsequent offences.',
  'SECTION_36_2': 'Section 36(2) of Legal Metrology Act, 2009: Manufacture or sale of non-standard packages. Penalty: Fine up to ₹50,000 or imprisonment.',
  'SECTION_39': 'Section 39 of Legal Metrology Act, 2009: Penalty for quoting or publishing non-metric units.'
};
