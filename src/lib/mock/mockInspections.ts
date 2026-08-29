import { InspectionRecord, SamplePackageScenario } from '@/lib/types/inspection';

export const SAMPLE_INSPECTION_A_BISCUITS: InspectionRecord = {
  id: 'insp-mock-001',
  inspectionNumber: 'LM-2026-DL-0891',
  timestamp: '2026-08-27T10:30:00.000Z',
  status: 'POTENTIAL_VIOLATION',
  inputMode: 'CAMERA_CAPTURE',
  commodityCategory: 'Packaged Food & Confectionery',
  brandName: 'Britannia Good Day Butter Cookies 200g',
  imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80',
  thumbnailUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=300&q=80',
  barcodeData: '8901063012485',
  declarations: {
    productName: {
      key: 'productName',
      label: 'Product Identity / Trade Name',
      category: 'IDENTITY',
      extractedValue: 'Britannia Good Day Butter Cookies',
      confidence: 0.98,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(b)',
      boundingBox: {
        id: 'box-pname',
        fieldKey: 'productName',
        ymin: 0.08,
        xmin: 0.12,
        ymax: 0.22,
        xmax: 0.88,
        label: 'Product Name',
        confidence: 0.98,
        color: '#10B981'
      }
    },
    genericName: {
      key: 'genericName',
      label: 'Generic Name of Commodity',
      category: 'IDENTITY',
      extractedValue: 'Butter Cookies (Biscuits)',
      confidence: 0.94,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(b)',
      boundingBox: {
        id: 'box-gname',
        fieldKey: 'genericName',
        ymin: 0.23,
        xmin: 0.20,
        ymax: 0.31,
        xmax: 0.80,
        label: 'Generic Name',
        confidence: 0.94,
        color: '#10B981'
      }
    },
    manufacturerName: {
      key: 'manufacturerName',
      label: 'Manufacturer / Packer Name',
      category: 'MANUFACTURER',
      extractedValue: 'Britannia Industries Limited',
      confidence: 0.96,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)',
      boundingBox: {
        id: 'box-mfg-name',
        fieldKey: 'manufacturerName',
        ymin: 0.34,
        xmin: 0.10,
        ymax: 0.44,
        xmax: 0.90,
        label: 'Manufacturer Name',
        confidence: 0.96,
        color: '#10B981'
      }
    },
    manufacturerAddress: {
      key: 'manufacturerAddress',
      label: 'Complete Postal Address',
      category: 'MANUFACTURER',
      extractedValue: '5/1A Hungerford Street, Kolkata, West Bengal - 700017',
      confidence: 0.91,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)',
      boundingBox: {
        id: 'box-mfg-addr',
        fieldKey: 'manufacturerAddress',
        ymin: 0.45,
        xmin: 0.10,
        ymax: 0.56,
        xmax: 0.90,
        label: 'Manufacturer Address',
        confidence: 0.91,
        color: '#10B981'
      }
    },
    netQuantity: {
      key: 'netQuantity',
      label: 'Net Quantity',
      category: 'METRICS',
      extractedValue: '200 g (Extra 20g Free)',
      normalizedValue: '200 g',
      confidence: 0.94,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(c) & Rule 7',
      boundingBox: {
        id: 'box-net-qty',
        fieldKey: 'netQuantity',
        ymin: 0.58,
        xmin: 0.12,
        ymax: 0.69,
        xmax: 0.48,
        label: 'Net Quantity (200 g)',
        confidence: 0.94,
        color: '#F59E0B'
      }
    },
    mrp: {
      key: 'mrp',
      label: 'Maximum Retail Price (MRP)',
      category: 'MRP',
      extractedValue: '₹ 40.00 (incl. of all taxes)',
      normalizedValue: 40.0,
      confidence: 0.97,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(e)',
      boundingBox: {
        id: 'box-mrp',
        fieldKey: 'mrp',
        ymin: 0.58,
        xmin: 0.52,
        ymax: 0.69,
        xmax: 0.90,
        label: 'MRP ₹ 40.00',
        confidence: 0.97,
        color: '#10B981'
      }
    },
    unitSalePrice: {
      key: 'unitSalePrice',
      label: 'Unit Sale Price (USP)',
      category: 'MRP',
      extractedValue: '₹ 0.20 / g',
      normalizedValue: 0.20,
      confidence: 0.89,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(e)'
    },
    manufactureDate: {
      key: 'manufactureDate',
      label: 'Date of Packing / Mfg',
      category: 'DATES',
      extractedValue: '06/2026',
      confidence: 0.92,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(d)',
      boundingBox: {
        id: 'box-mfg-date',
        fieldKey: 'manufactureDate',
        ymin: 0.71,
        xmin: 0.10,
        ymax: 0.79,
        xmax: 0.48,
        label: 'Mfg Date: 06/2026',
        confidence: 0.92,
        color: '#10B981'
      }
    },
    bestBefore: {
      key: 'bestBefore',
      label: 'Best Before / Expiry',
      category: 'DATES',
      extractedValue: '9 MONTHS FROM PACKAGING',
      confidence: 0.90,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(d)',
      boundingBox: {
        id: 'box-exp-date',
        fieldKey: 'bestBefore',
        ymin: 0.71,
        xmin: 0.52,
        ymax: 0.79,
        xmax: 0.90,
        label: 'Best Before 9 Months',
        confidence: 0.90,
        color: '#10B981'
      }
    },
    consumerCarePhone: {
      key: 'consumerCarePhone',
      label: 'Consumer Care Helpline',
      category: 'CONSUMER_CARE',
      extractedValue: '1800-425-4449 (Toll Free)',
      confidence: 0.93,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(n)',
      boundingBox: {
        id: 'box-cc-phone',
        fieldKey: 'consumerCarePhone',
        ymin: 0.81,
        xmin: 0.10,
        ymax: 0.88,
        xmax: 0.55,
        label: 'Helpline: 1800-425-4449',
        confidence: 0.93,
        color: '#10B981'
      }
    },
    consumerCareEmail: {
      key: 'consumerCareEmail',
      label: 'Consumer Care Email Address',
      category: 'CONSUMER_CARE',
      extractedValue: '[NOT FOUND ON PACKAGE]',
      confidence: 0.95,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(n)',
      boundingBox: {
        id: 'box-cc-email-missing',
        fieldKey: 'consumerCareEmail',
        ymin: 0.81,
        xmin: 0.58,
        ymax: 0.88,
        xmax: 0.92,
        label: 'Missing Email Declaration Area',
        confidence: 0.95,
        color: '#EF4444'
      }
    },
    countryOfOrigin: {
      key: 'countryOfOrigin',
      label: 'Country of Origin',
      category: 'LEGAL',
      extractedValue: 'India',
      confidence: 0.96,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)'
    },
    fssaiLicense: {
      key: 'fssaiLicense',
      label: 'FSSAI License No.',
      category: 'LEGAL',
      extractedValue: '10015043001129',
      confidence: 0.93,
      confidenceLevel: 'HIGH',
      isMandatory: false
    }
  },
  violations: [
    {
      id: 'vio-001',
      ruleCode: 'RULE_6_1_N',
      ruleTitle: 'Mandatory Consumer Care Email ID Missing',
      legalActSection: 'Rule 6(1)(n) of Legal Metrology (Packaged Commodities) Rules, 2011',
      severity: 'CRITICAL',
      description: 'The package declares a customer phone helpline but completely omits the statutory e-mail address mandated under Rule 6(1)(n).',
      extractedValueFound: 'Phone: 1800-425-4449 (Email ID Absent)',
      expectedRequirement: 'Every package must bear the name, address, telephone number, and e-mail address of the consumer grievance cell.',
      suggestedAction: 'Issue Statutory Notice under Section 36(1) of Legal Metrology Act, 2009 for compoundable offence or rectification.',
      fieldKeyRelated: 'consumerCareEmail',
      confidence: 0.95,
      evidenceBoundingBox: {
        id: 'box-cc-email-missing',
        fieldKey: 'consumerCareEmail',
        ymin: 0.81,
        xmin: 0.58,
        ymax: 0.88,
        xmax: 0.92,
        label: 'Missing Email Area',
        confidence: 0.95,
        color: '#EF4444'
      }
    },
    {
      id: 'vio-002',
      ruleCode: 'RULE_7_PDP',
      ruleTitle: 'Net Quantity Font Height Below Minimum Statutory Size',
      legalActSection: 'Rule 7 & Table 1 of Legal Metrology (Packaged Commodities) Rules, 2011',
      severity: 'MODERATE',
      description: 'For package surface area of ~280 cm² (200g wrapper), the declared net quantity numeral height is ~2.7 mm, which fails the statutory minimum 4.0 mm threshold.',
      extractedValueFound: 'Numeral height ~ 2.7 mm',
      expectedRequirement: 'Minimum numeral height of 4.0 mm for package area between 200 cm² and 1000 cm².',
      suggestedAction: 'Require packer to resize Principal Display Panel numerals in subsequent production batches.',
      fieldKeyRelated: 'netQuantity',
      confidence: 0.88,
      evidenceBoundingBox: {
        id: 'box-net-qty',
        fieldKey: 'netQuantity',
        ymin: 0.58,
        xmin: 0.12,
        ymax: 0.69,
        xmax: 0.48,
        label: 'Undersized Font (2.7mm)',
        confidence: 0.88,
        color: '#F59E0B'
      }
    }
  ],
  reportSummary: {
    totalFieldsChecked: 12,
    violationsCount: 2,
    complianceScorePercentage: 78,
    overallVerdict: 'POTENTIAL VIOLATIONS DETECTED (Rule 6(1)(n) & Rule 7)',
    isSafeForFinalNotice: true
  },
  metadata: {
    location: 'Reliance Fresh Supermarket, Connaught Place, New Delhi',
    retailerName: 'Reliance Retail Ltd. Store #402',
    retailerAddress: 'Connaught Circus, New Delhi - 110001',
    deviceType: 'Field Tablet Android (Model LM-TAB-09)',
    processingTimeMs: 1420
  }
};

export const SAMPLE_INSPECTION_B_SPICES: InspectionRecord = {
  id: 'insp-mock-002',
  inspectionNumber: 'LM-2026-MH-1044',
  timestamp: '2026-08-27T11:15:00.000Z',
  status: 'COMPLIANT',
  inputMode: 'QR_CODE',
  commodityCategory: 'Ground Spices & Condiments',
  brandName: 'MDH Deggi Mirch Red Chilli Powder 100g',
  imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
  thumbnailUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80',
  barcodeData: '8901234567890',
  declarations: {
    productName: {
      key: 'productName',
      label: 'Product Identity / Brand Name',
      category: 'IDENTITY',
      extractedValue: 'MDH Deggi Mirch',
      confidence: 0.99,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(b)',
      boundingBox: {
        id: 'box-b-pname',
        fieldKey: 'productName',
        ymin: 0.08,
        xmin: 0.15,
        ymax: 0.22,
        xmax: 0.85,
        label: 'MDH Deggi Mirch',
        confidence: 0.99,
        color: '#10B981'
      }
    },
    genericName: {
      key: 'genericName',
      label: 'Generic Name of Commodity',
      category: 'IDENTITY',
      extractedValue: 'Ground Red Pepper / Chilli Powder',
      confidence: 0.97,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(b)',
      boundingBox: {
        id: 'box-b-gname',
        fieldKey: 'genericName',
        ymin: 0.23,
        xmin: 0.20,
        ymax: 0.32,
        xmax: 0.80,
        label: 'Generic Name',
        confidence: 0.97,
        color: '#10B981'
      }
    },
    manufacturerName: {
      key: 'manufacturerName',
      label: 'Manufacturer / Packer Name',
      category: 'MANUFACTURER',
      extractedValue: 'Mahashian Di Hatti Pvt. Ltd.',
      confidence: 0.98,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)',
      boundingBox: {
        id: 'box-b-mfg',
        fieldKey: 'manufacturerName',
        ymin: 0.35,
        xmin: 0.12,
        ymax: 0.44,
        xmax: 0.88,
        label: 'Manufacturer',
        confidence: 0.98,
        color: '#10B981'
      }
    },
    manufacturerAddress: {
      key: 'manufacturerAddress',
      label: 'Complete Postal Address',
      category: 'MANUFACTURER',
      extractedValue: '9/44 Kirti Nagar Industrial Area, New Delhi - 110015',
      confidence: 0.96,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)',
      boundingBox: {
        id: 'box-b-addr',
        fieldKey: 'manufacturerAddress',
        ymin: 0.45,
        xmin: 0.12,
        ymax: 0.55,
        xmax: 0.88,
        label: 'Address & Pin Code',
        confidence: 0.96,
        color: '#10B981'
      }
    },
    netQuantity: {
      key: 'netQuantity',
      label: 'Net Quantity',
      category: 'METRICS',
      extractedValue: '100 g',
      normalizedValue: '100 g',
      confidence: 0.99,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(c) & Rule 7',
      boundingBox: {
        id: 'box-b-qty',
        fieldKey: 'netQuantity',
        ymin: 0.57,
        xmin: 0.15,
        ymax: 0.67,
        xmax: 0.48,
        label: 'Net Qty: 100 g (4.2mm font)',
        confidence: 0.99,
        color: '#10B981'
      }
    },
    mrp: {
      key: 'mrp',
      label: 'Maximum Retail Price (MRP)',
      category: 'MRP',
      extractedValue: '₹ 82.00 (inclusive of all taxes)',
      normalizedValue: 82.0,
      confidence: 0.98,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(e)',
      boundingBox: {
        id: 'box-b-mrp',
        fieldKey: 'mrp',
        ymin: 0.57,
        xmin: 0.52,
        ymax: 0.67,
        xmax: 0.88,
        label: 'MRP ₹ 82.00 incl taxes',
        confidence: 0.98,
        color: '#10B981'
      }
    },
    unitSalePrice: {
      key: 'unitSalePrice',
      label: 'Unit Sale Price',
      category: 'MRP',
      extractedValue: '₹ 0.82 / g',
      confidence: 0.95,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(e)'
    },
    manufactureDate: {
      key: 'manufactureDate',
      label: 'Date of Packing',
      category: 'DATES',
      extractedValue: '05/2026',
      confidence: 0.96,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(d)',
      boundingBox: {
        id: 'box-b-mfgd',
        fieldKey: 'manufactureDate',
        ymin: 0.69,
        xmin: 0.12,
        ymax: 0.77,
        xmax: 0.48,
        label: 'Mfg: 05/2026',
        confidence: 0.96,
        color: '#10B981'
      }
    },
    bestBefore: {
      key: 'bestBefore',
      label: 'Best Before',
      category: 'DATES',
      extractedValue: '12 MONTHS FROM PACKAGING',
      confidence: 0.96,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(d)',
      boundingBox: {
        id: 'box-b-exp',
        fieldKey: 'bestBefore',
        ymin: 0.69,
        xmin: 0.52,
        ymax: 0.77,
        xmax: 0.88,
        label: 'Best Before 12M',
        confidence: 0.96,
        color: '#10B981'
      }
    },
    consumerCarePhone: {
      key: 'consumerCarePhone',
      label: 'Consumer Care Phone',
      category: 'CONSUMER_CARE',
      extractedValue: '011-41425106',
      confidence: 0.96,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(n)',
      boundingBox: {
        id: 'box-b-ccp',
        fieldKey: 'consumerCarePhone',
        ymin: 0.79,
        xmin: 0.12,
        ymax: 0.87,
        xmax: 0.48,
        label: 'Phone: 011-41425106',
        confidence: 0.96,
        color: '#10B981'
      }
    },
    consumerCareEmail: {
      key: 'consumerCareEmail',
      label: 'Consumer Care Email',
      category: 'CONSUMER_CARE',
      extractedValue: 'customercare@mdhspices.in',
      confidence: 0.97,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(n)',
      boundingBox: {
        id: 'box-b-cce',
        fieldKey: 'consumerCareEmail',
        ymin: 0.79,
        xmin: 0.52,
        ymax: 0.87,
        xmax: 0.88,
        label: 'Email: customercare@mdhspices.in',
        confidence: 0.97,
        color: '#10B981'
      }
    },
    countryOfOrigin: {
      key: 'countryOfOrigin',
      label: 'Country of Origin',
      category: 'LEGAL',
      extractedValue: 'India',
      confidence: 0.98,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)'
    },
    fssaiLicense: {
      key: 'fssaiLicense',
      label: 'FSSAI License No.',
      category: 'LEGAL',
      extractedValue: '10012011000429',
      confidence: 0.96,
      confidenceLevel: 'HIGH',
      isMandatory: false
    }
  },
  violations: [],
  reportSummary: {
    totalFieldsChecked: 12,
    violationsCount: 0,
    complianceScorePercentage: 100,
    overallVerdict: 'FULLY COMPLIANT WITH LEGAL METROLOGY RULES, 2011',
    isSafeForFinalNotice: true
  },
  metadata: {
    location: 'APMC Market Yard, Vashi, Navi Mumbai',
    retailerName: 'Shree Ganesh Traders',
    retailerAddress: 'Shop 12, Sector 19, Vashi - 400703',
    deviceType: 'Field Tablet iOS',
    processingTimeMs: 1180
  }
};

export const SAMPLE_INSPECTION_C_COSMETICS: InspectionRecord = {
  id: 'insp-mock-003',
  inspectionNumber: 'LM-2026-KA-2098',
  timestamp: '2026-08-27T11:45:00.000Z',
  status: 'MANUAL_REVIEW',
  inputMode: 'FILE_UPLOAD',
  commodityCategory: 'Personal Care & Cosmetics',
  brandName: 'Dove Deep Moisture Hair Shampoo 180ml',
  imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=900&q=80',
  thumbnailUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=300&q=80',
  barcodeData: '8901030789012',
  declarations: {
    productName: {
      key: 'productName',
      label: 'Product Brand Name',
      category: 'IDENTITY',
      extractedValue: 'Dove Deep Moisture Shampoo',
      confidence: 0.97,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(b)',
      boundingBox: {
        id: 'box-c-pname',
        fieldKey: 'productName',
        ymin: 0.10,
        xmin: 0.15,
        ymax: 0.24,
        xmax: 0.85,
        label: 'Dove Shampoo',
        confidence: 0.97,
        color: '#10B981'
      }
    },
    manufacturerName: {
      key: 'manufacturerName',
      label: 'Manufacturer / Packer Name',
      category: 'MANUFACTURER',
      extractedValue: 'Hindustan Unilever Limited',
      confidence: 0.95,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)',
      boundingBox: {
        id: 'box-c-mfg',
        fieldKey: 'manufacturerName',
        ymin: 0.32,
        xmin: 0.12,
        ymax: 0.42,
        xmax: 0.88,
        label: 'Hindustan Unilever',
        confidence: 0.95,
        color: '#10B981'
      }
    },
    manufacturerAddress: {
      key: 'manufacturerAddress',
      label: 'Manufacturer Address',
      category: 'MANUFACTURER',
      extractedValue: 'Unilever House, B.D. Sawant Marg, Chakala, Andheri (E), Mumbai - 400099',
      confidence: 0.92,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)',
      boundingBox: {
        id: 'box-c-addr',
        fieldKey: 'manufacturerAddress',
        ymin: 0.43,
        xmin: 0.12,
        ymax: 0.54,
        xmax: 0.88,
        label: 'Complete Address',
        confidence: 0.92,
        color: '#10B981'
      }
    },
    netQuantity: {
      key: 'netQuantity',
      label: 'Net Quantity (Volume)',
      category: 'METRICS',
      extractedValue: '180 ml',
      normalizedValue: '180 ml',
      confidence: 0.96,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(c) & Rule 7',
      boundingBox: {
        id: 'box-c-qty',
        fieldKey: 'netQuantity',
        ymin: 0.56,
        xmin: 0.15,
        ymax: 0.66,
        xmax: 0.48,
        label: 'Net Volume: 180 ml',
        confidence: 0.96,
        color: '#10B981'
      }
    },
    mrp: {
      key: 'mrp',
      label: 'Maximum Retail Price (MRP)',
      category: 'MRP',
      extractedValue: '₹ 165.00 (incl. of all taxes)',
      normalizedValue: 165.0,
      confidence: 0.94,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(e)',
      boundingBox: {
        id: 'box-c-mrp',
        fieldKey: 'mrp',
        ymin: 0.56,
        xmin: 0.52,
        ymax: 0.66,
        xmax: 0.88,
        label: 'MRP ₹ 165.00',
        confidence: 0.94,
        color: '#10B981'
      }
    },
    manufactureDate: {
      key: 'manufactureDate',
      label: 'Batch & Mfg Date (Glared Region)',
      category: 'DATES',
      extractedValue: 'B.No: B40?2 Mfg: 0?/2026',
      confidence: 0.48,
      confidenceLevel: 'LOW',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(d)',
      boundingBox: {
        id: 'box-c-mfgd-glare',
        fieldKey: 'manufactureDate',
        ymin: 0.68,
        xmin: 0.12,
        ymax: 0.78,
        xmax: 0.50,
        label: 'Glared Mfg Stamp (Conf 48%)',
        confidence: 0.48,
        color: '#F59E0B'
      }
    },
    bestBefore: {
      key: 'bestBefore',
      label: 'Use Before Declaration',
      category: 'DATES',
      extractedValue: '24 MONTHS FROM PACKING',
      confidence: 0.88,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(d)',
      boundingBox: {
        id: 'box-c-exp',
        fieldKey: 'bestBefore',
        ymin: 0.68,
        xmin: 0.52,
        ymax: 0.78,
        xmax: 0.88,
        label: 'Best Before 24M',
        confidence: 0.88,
        color: '#10B981'
      }
    },
    consumerCarePhone: {
      key: 'consumerCarePhone',
      label: 'Consumer Care Toll-Free',
      category: 'CONSUMER_CARE',
      extractedValue: '1800-10-22-221',
      confidence: 0.94,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(n)',
      boundingBox: {
        id: 'box-c-ccp',
        fieldKey: 'consumerCarePhone',
        ymin: 0.80,
        xmin: 0.12,
        ymax: 0.88,
        xmax: 0.50,
        label: '1800-10-22-221',
        confidence: 0.94,
        color: '#10B981'
      }
    },
    consumerCareEmail: {
      key: 'consumerCareEmail',
      label: 'Consumer Care Email',
      category: 'CONSUMER_CARE',
      extractedValue: 'lever.care@unilever.com',
      confidence: 0.95,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(n)',
      boundingBox: {
        id: 'box-c-cce',
        fieldKey: 'consumerCareEmail',
        ymin: 0.80,
        xmin: 0.52,
        ymax: 0.88,
        xmax: 0.88,
        label: 'lever.care@unilever.com',
        confidence: 0.95,
        color: '#10B981'
      }
    },
    countryOfOrigin: {
      key: 'countryOfOrigin',
      label: 'Country of Origin',
      category: 'LEGAL',
      extractedValue: 'India',
      confidence: 0.95,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)'
    }
  },
  violations: [],
  manualReviewReasons: [
    'OCR confidence for Manufacturing Date is 48% due to curved bottle surface reflection.',
    'Batch number contains unreadable dot-matrix characters (B40?2).',
    'Human Officer verification is required to visually confirm date stamp on physical sample.'
  ],
  reportSummary: {
    totalFieldsChecked: 10,
    violationsCount: 0,
    complianceScorePercentage: 85,
    overallVerdict: 'MANUAL OFFICER REVIEW REQUIRED (Low OCR Confidence on Mfg Date Stamp)',
    isSafeForFinalNotice: false
  },
  metadata: {
    location: 'Health & Glow Pharmacy, Indiranagar, Bengaluru',
    retailerName: 'Health & Glow Store #18',
    retailerAddress: '100ft Road, Indiranagar, Bengaluru - 560038',
    deviceType: 'High-Res Optical Camera Scanner',
    processingTimeMs: 1650
  }
};

export const SAMPLE_INSPECTION_D_EDIBLE_OIL: InspectionRecord = {
  id: 'insp-mock-004',
  inspectionNumber: 'LM-2026-GJ-3310',
  timestamp: '2026-08-27T12:00:00.000Z',
  status: 'POTENTIAL_VIOLATION',
  inputMode: 'CAMERA_CAPTURE',
  commodityCategory: 'Edible Vegetable Oils',
  brandName: 'Fortune Sunlite Refined Sunflower Oil 1 Litre Pouch',
  imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
  thumbnailUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80',
  barcodeData: '8906007281015',
  declarations: {
    productName: {
      key: 'productName',
      label: 'Product Trade Name',
      category: 'IDENTITY',
      extractedValue: 'Fortune Sunlite Refined Sunflower Oil',
      confidence: 0.98,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(b)',
      boundingBox: {
        id: 'box-d-pname',
        fieldKey: 'productName',
        ymin: 0.08,
        xmin: 0.12,
        ymax: 0.22,
        xmax: 0.88,
        label: 'Fortune Sunflower Oil',
        confidence: 0.98,
        color: '#10B981'
      }
    },
    manufacturerName: {
      key: 'manufacturerName',
      label: 'Manufacturer & Packer',
      category: 'MANUFACTURER',
      extractedValue: 'Adani Wilmar Limited',
      confidence: 0.97,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)',
      boundingBox: {
        id: 'box-d-mfg',
        fieldKey: 'manufacturerName',
        ymin: 0.32,
        xmin: 0.12,
        ymax: 0.42,
        xmax: 0.88,
        label: 'Adani Wilmar Ltd',
        confidence: 0.97,
        color: '#10B981'
      }
    },
    manufacturerAddress: {
      key: 'manufacturerAddress',
      label: 'Manufacturer Address',
      category: 'MANUFACTURER',
      extractedValue: 'Fortune House, Near Navrangpura Railway Crossing, Ahmedabad, Gujarat - 380009',
      confidence: 0.94,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(a)',
      boundingBox: {
        id: 'box-d-addr',
        fieldKey: 'manufacturerAddress',
        ymin: 0.43,
        xmin: 0.12,
        ymax: 0.54,
        xmax: 0.88,
        label: 'Registered Office Ahmedabad',
        confidence: 0.94,
        color: '#10B981'
      }
    },
    netQuantity: {
      key: 'netQuantity',
      label: 'Net Quantity Declaration',
      category: 'METRICS',
      extractedValue: '1 Litre (Mass Equivalent Missing)',
      normalizedValue: '1 L',
      confidence: 0.95,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 12(2) & Rule 6(1)(c)',
      boundingBox: {
        id: 'box-d-qty',
        fieldKey: 'netQuantity',
        ymin: 0.56,
        xmin: 0.12,
        ymax: 0.68,
        xmax: 0.50,
        label: 'Net Qty: 1 L (Missing 910g equiv)',
        confidence: 0.95,
        color: '#EF4444'
      }
    },
    mrp: {
      key: 'mrp',
      label: 'Maximum Retail Price',
      category: 'MRP',
      extractedValue: '₹ 145.00 (incl. of all taxes)',
      normalizedValue: 145.0,
      confidence: 0.96,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(e)',
      boundingBox: {
        id: 'box-d-mrp',
        fieldKey: 'mrp',
        ymin: 0.56,
        xmin: 0.52,
        ymax: 0.68,
        xmax: 0.88,
        label: 'MRP ₹ 145.00',
        confidence: 0.96,
        color: '#10B981'
      }
    },
    consumerCarePhone: {
      key: 'consumerCarePhone',
      label: 'Consumer Care Phone',
      category: 'CONSUMER_CARE',
      extractedValue: '1800-233-9999',
      confidence: 0.95,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(n)'
    },
    consumerCareEmail: {
      key: 'consumerCareEmail',
      label: 'Consumer Care Email',
      category: 'CONSUMER_CARE',
      extractedValue: 'customercare@adaniwilmar.in',
      confidence: 0.95,
      confidenceLevel: 'HIGH',
      isMandatory: true,
      legalRuleRef: 'Rule 6(1)(n)'
    }
  },
  violations: [
    {
      id: 'vio-004-a',
      ruleCode: 'RULE_12_EDIBLE_OIL',
      ruleTitle: 'Omission of Mandatory Net Weight / Mass Equivalence for Edible Oil',
      legalActSection: 'Rule 12(2) of Legal Metrology (Packaged Commodities) Rules, 2011',
      severity: 'CRITICAL',
      description: 'The edible oil pouch declares quantity in Volume (1 Litre) without stating the mandatory equivalent Net Weight in Grams/Kilograms (910 g) at packing temperature.',
      extractedValueFound: '1 Litre (no weight equivalence)',
      expectedRequirement: 'Packages of edible oil containing volume declaration must also declare net quantity in terms of mass (grams / kilograms).',
      suggestedAction: 'Issue Notice under Section 36(1) for violation of Rule 12(2).',
      fieldKeyRelated: 'netQuantity',
      confidence: 0.95,
      evidenceBoundingBox: {
        id: 'box-d-qty',
        fieldKey: 'netQuantity',
        ymin: 0.56,
        xmin: 0.12,
        ymax: 0.68,
        xmax: 0.50,
        label: 'Missing Mass Equiv',
        confidence: 0.95,
        color: '#EF4444',
        isSimulatedDemo: true
      }
    },
    {
      id: 'vio-004-b',
      ruleCode: 'RULE_6_1_E_USP',
      ruleTitle: 'Mandatory Unit Sale Price (USP) Omitted on Retail Pouch',
      legalActSection: 'Rule 6(1)(e) of Legal Metrology (Packaged Commodities) Rules, 2011',
      severity: 'MODERATE',
      description: 'Retail package exceeding 100ml net volume must declare Unit Sale Price (₹ per ml / litre) alongside the MRP.',
      extractedValueFound: 'MRP ₹145.00 (USP Absent)',
      expectedRequirement: 'Unit Sale Price in rupees per ml or litre must be prominently indicated in proximity to the MRP.',
      suggestedAction: 'Mandate correction of packaging artwork to include USP on all retail pouches.',
      fieldKeyRelated: 'mrp',
      confidence: 0.92,
      evidenceBoundingBox: {
        id: 'box-d-mrp',
        fieldKey: 'mrp',
        ymin: 0.56,
        xmin: 0.52,
        ymax: 0.68,
        xmax: 0.88,
        label: 'MRP without USP',
        confidence: 0.92,
        color: '#F59E0B',
        isSimulatedDemo: true
      }
    }
  ],
  reportSummary: {
    totalFieldsChecked: 10,
    violationsCount: 2,
    complianceScorePercentage: 74,
    overallVerdict: 'MULTIPLE POTENTIAL VIOLATIONS DETECTED (Rules 12(2) & 6(1)(e))',
    isSafeForFinalNotice: true
  },
  metadata: {
    location: 'Kalupur Wholesale Grains Market, Ahmedabad',
    retailerName: 'Mahavir Provision Store',
    retailerAddress: 'Kalupur Kotni Rang, Ahmedabad - 380001',
    deviceType: 'Field Tablet Android',
    processingTimeMs: 1390
  }
};

export const SAMPLE_PACKAGE_SCENARIOS: SamplePackageScenario[] = [
  {
    id: 'sample-biscuit',
    title: 'Butter Cookies Pack (200g)',
    subtitle: 'Confectionery / FMCG',
    category: 'Packaged Food',
    badgeStatus: 'POTENTIAL_VIOLATION',
    thumbnailUrl: SAMPLE_INSPECTION_A_BISCUITS.thumbnailUrl!,
    description: 'Statutory non-compliance: Missing consumer care email ID under Rule 6(1)(n) and undersized Net Qty font on PDP.',
    sampleData: SAMPLE_INSPECTION_A_BISCUITS
  },
  {
    id: 'sample-spices',
    title: 'Red Chilli Powder (100g)',
    subtitle: 'Ground Spices & Condiments',
    category: 'Spices',
    badgeStatus: 'COMPLIANT',
    thumbnailUrl: SAMPLE_INSPECTION_B_SPICES.thumbnailUrl!,
    description: 'Fully compliant packaging: All 12 mandatory statutory declarations verified under Rules 6, 7 & 9.',
    sampleData: SAMPLE_INSPECTION_B_SPICES
  },
  {
    id: 'sample-cosmetic',
    title: 'Shampoo Bottle (180ml)',
    subtitle: 'Personal Care & Cosmetics',
    category: 'Cosmetics',
    badgeStatus: 'MANUAL_REVIEW',
    thumbnailUrl: SAMPLE_INSPECTION_C_COSMETICS.thumbnailUrl!,
    description: 'Glared dot-matrix manufacturing date stamp (confidence 48%). Flagged for mandatory officer manual verification.',
    sampleData: SAMPLE_INSPECTION_C_COSMETICS
  },
  {
    id: 'sample-edible-oil',
    title: 'Sunflower Oil Pouch (1 Litre)',
    subtitle: 'Edible Vegetable Oils',
    category: 'Edible Oils',
    badgeStatus: 'POTENTIAL_VIOLATION',
    thumbnailUrl: SAMPLE_INSPECTION_D_EDIBLE_OIL.thumbnailUrl!,
    description: 'Multiple statutory non-compliances: Volume declared without mandatory net mass equivalent under Rule 12(2) & omitted Unit Sale Price (USP).',
    sampleData: SAMPLE_INSPECTION_D_EDIBLE_OIL
  }
];

export const INITIAL_INSPECTIONS_HISTORY: InspectionRecord[] = [
  SAMPLE_INSPECTION_A_BISCUITS,
  SAMPLE_INSPECTION_B_SPICES,
  SAMPLE_INSPECTION_C_COSMETICS,
  SAMPLE_INSPECTION_D_EDIBLE_OIL
];
