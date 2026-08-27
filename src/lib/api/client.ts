import { ApiResponse } from '@/lib/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export class ApiClientError extends Error {
  errorCode: string;
  details?: unknown;

  constructor(message: string, errorCode = 'API_ERROR', details?: unknown) {
    super(message);
    this.name = 'ApiClientError';
    this.errorCode = errorCode;
    this.details = details;
  }
}

export async function requestApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject token if available from localStorage or session
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('labellens_auth_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({ message: response.statusText }));
      throw new ApiClientError(
        errorJson.message || `HTTP ${response.status}: Request failed`,
        errorJson.errorCode || `HTTP_${response.status}`,
        errorJson
      );
    }

    const data = await response.json();
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
      source: 'LIVE_FASTAPI_BACKEND'
    };
  } catch (error: unknown) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    const err = error as { name?: string; message?: string };
    if (err.name === 'AbortError') {
      throw new ApiClientError('Request timed out while waiting for AI analysis', 'TIMEOUT');
    }
    throw new ApiClientError(err.message || 'Network connection failed', 'NETWORK_ERROR');
  }
}
