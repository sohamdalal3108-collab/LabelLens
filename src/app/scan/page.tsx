"use client";

import { useCallback, useState } from "react";
import BarcodeScanner from "@/components/BarcodeScanner";
import LabelCapture from "@/components/LabelCapture";
import ResultsDisplay from "@/components/ResultsDisplay";
import { lookupBarcode } from "@/lib/api";
import type { LookupResult, ScanResult } from "@/lib/types";

type Stage = "idle" | "looking_up" | "off_hit" | "needs_ocr" | "done";

/**
 * Flow:
 *   idle       -> live barcode scan
 *   looking_up -> querying Open Food Facts
 *   off_hit    -> found in OFF, show product data
 *   needs_ocr  -> OFF miss, show label capture fallback
 *   done       -> OCR scan submitted, show compliance report
 */
export default function ScanPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [barcode, setBarcode] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDetected = useCallback(async (rawValue: string) => {
    setBarcode(rawValue);
    setStage("looking_up");
    setError(null);

    try {
      const res = await lookupBarcode(rawValue);
      setResult(res);
      setStage(res.found ? "off_hit" : "needs_ocr");
    } catch {
      setError("Lookup failed — check your connection and try again.");
      setStage("idle");
    }
  }, []);

  const handleOcrResult = useCallback((ocrResult: ScanResult) => {
    setResult(ocrResult);
    setStage("done");
  }, []);

  function reset() {
    setStage("idle");
    setBarcode(null);
    setResult(null);
    setError(null);
  }

  return (
    <main className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">LabelLens</h1>

      {error && <p className="bg-red-950 rounded-lg p-3">{error}</p>}

      {stage === "idle" && <BarcodeScanner onDetected={handleDetected} />}

      {stage === "looking_up" && <p>Checking product database...</p>}

      {stage === "needs_ocr" && (
        <>
          <p>Not found in our database — let&apos;s scan the label directly.</p>
          <LabelCapture barcode={barcode} onResult={handleOcrResult} />
        </>
      )}

      {(stage === "off_hit" || stage === "done") && (
        <>
          <ResultsDisplay result={result} />
          <button onClick={reset}>Scan another product</button>
        </>
      )}
    </main>
  );
}
