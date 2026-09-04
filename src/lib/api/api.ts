import type { ScanResult, LookupResult } from "./types";

export async function lookupBarcode(barcode: string): Promise<LookupResult> {
  const res = await fetch("/api/lookup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ barcode }),
  });
  if (!res.ok) throw new Error(`Lookup failed: ${res.status}`);
  return res.json();
}

export async function submitLabelScan(
  barcode: string | null,
  imageBlobs: Blob[]
): Promise<ScanResult> {
  const formData = new FormData();
  formData.append("barcode", barcode || "");
  imageBlobs.forEach((blob, i) => formData.append("images", blob, `label_${i}.jpg`));

  const res = await fetch("/api/scan", { method: "POST", body: formData });
  if (!res.ok) throw new Error(`Scan failed: ${res.status}`);
  return res.json();
}
