const BACKEND_URL = process.env.BACKEND_API_URL; // set in .env, points at the backend branch's deployed API

export async function persistInspection(payload: {
  barcode: string | null;
  fields: unknown;
  violations: unknown[];
  flaggedSubstances: unknown[];
  rawOcrText: string;
  officerToken?: string; // Firebase ID token, if the officer is logged in
}) {
  if (!BACKEND_URL) return { persisted: false, reason: "backend_not_configured" };

  try {
    const res = await fetch(`${BACKEND_URL}/api/inspections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(payload.officerToken ? { Authorization: `Bearer ${payload.officerToken}` } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { persisted: false, reason: `backend_${res.status}` };
    return { persisted: true, id: (await res.json()).id };
  } catch {
    return { persisted: false, reason: "backend_unreachable" };
  }
}
