"use client";

import { useState } from "react";
import { useCamera } from "@/hooks/useCamera";
import ImageQualityCheck, { checkFrameQuality } from "./ImageQualityCheck";
import { submitLabelScan } from "@/lib/api";
import type { ScanResult } from "@/lib/types";

interface Props {
  barcode: string | null;
  onResult: (result: ScanResult) => void;
}

/**
 * Fallback flow when barcode lookup misses in Open Food Facts.
 * User captures 1-3 label photos; each is validated client-side before
 * being accepted into the upload batch.
 */
export default function LabelCapture({ barcode, onResult }: Props) {
  const { videoRef, ready } = useCamera();
  const [issues, setIssues] = useState<string[]>([]);
  const [acceptedBlobs, setAcceptedBlobs] = useState<Blob[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function handleCapture() {
    const video = videoRef.current;
    if (!video) return;
    const { ok, issues: foundIssues, canvasFullRes } = checkFrameQuality(video);

    if (!ok) {
      setIssues(foundIssues);
      return;
    }

    setIssues([]);
    canvasFullRes.toBlob(
      (blob) => {
        if (blob) setAcceptedBlobs((prev) => [...prev, blob]);
      },
      "image/jpeg",
      0.9
    );
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const result = await submitLabelScan(barcode, acceptedBlobs);
      onResult(result);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-3">
      <video ref={videoRef} playsInline muted className="w-full rounded-xl" />
      <button onClick={handleCapture} disabled={!ready}>
        Capture label ({acceptedBlobs.length}/3)
      </button>
      <ImageQualityCheck issues={issues} onRetry={() => setIssues([])} />
      {acceptedBlobs.length > 0 && (
        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Analyzing..." : "Submit for compliance check"}
        </button>
      )}
    </div>
  );
}
