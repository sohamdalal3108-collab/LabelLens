"use client";

import { useEffect, useRef, useState } from "react";
import { useCamera } from "@/hooks/useCamera";
import { detectBarcodeFrame } from "@/lib/barcodeDetector";

interface Props {
  onDetected: (rawValue: string, format: string) => void;
}

/**
 * Renders the live rear-camera feed and continuously scans for a barcode/QR.
 * Calls onDetected once, then pauses scanning (freeze-frame UX).
 */
export default function BarcodeScanner({ onDetected }: Props) {
  const { videoRef, ready, error } = useCamera();
  const [locked, setLocked] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!ready || locked) return;
    let cancelled = false;

    async function scanLoop() {
      if (cancelled || locked) return;
      const video = videoRef.current;
      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        const result = await detectBarcodeFrame(video);
        if (result) {
          setLocked(true);
          onDetected(result.rawValue, result.format);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(scanLoop);
    }

    scanLoop();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, locked, videoRef, onDetected]);

  return (
    <div className="scanner-container">
      {error && <p className="text-red-400">Camera error: {error}</p>}
      <video
        ref={videoRef}
        playsInline
        muted
        className="w-full rounded-xl bg-black"
      />
      {locked && <div className="text-green-400 text-center py-2">Code locked ✓</div>}
    </div>
  );
}
