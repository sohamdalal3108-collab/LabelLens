import { InspectionRecord, OfficerVerification } from './inspection';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  source: 'MOCK_DEMO_ENGINE' | 'LIVE_FASTAPI_BACKEND';
}

export interface ApiErrorResponse {
  success: false;
  errorCode: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface AnalyzeImageRequest {
  imageFile?: File;
  imageBase64?: string;
  commodityHint?: string;
  retailerName?: string;
  retailerAddress?: string;
  isDemoSample?: boolean;
  sampleId?: string;
}

export interface InspectionsFilterParams {
  query?: string;
  status?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  officerId?: string;
  page?: number;
  limit?: number;
}

export interface VerifyInspectionRequest {
  inspectionId: string;
  verification: OfficerVerification;
}
