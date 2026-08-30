/**
 * Wraps the native BarcodeDetector API where available,
 * falls back to ZXing.js (npm: @zxing/browser) on unsupported browsers (notably Safari/iOS).
 *
 * Requires: npm install @zxing/browser
 */

export interface DetectedCode {
  rawValue: string;
  format: string;
}

let zxingReaderPromise: Promise<import("@zxing/browser").BrowserMultiFormatReader> | null = null;

function isNativeSupported(): boolean {
  return typeof window !== "undefined" && "BarcodeDetector" in window;
}

async function getZXingReader() {
  if (!zxingReaderPromise) {
    zxingReaderPromise = import("@zxing/browser").then(
      ({ BrowserMultiFormatReader }) => new BrowserMultiFormatReader()
    );
  }
  return zxingReaderPromise;
}

/**
 * Detect a barcode/QR in a single video frame.
 */
export async function detectBarcodeFrame(
  videoEl: HTMLVideoElement
): Promise<DetectedCode | null> {
  if (isNativeSupported()) {
    // @ts-expect-error - BarcodeDetector not yet in default TS lib types
    const detector = new window.BarcodeDetector({
      formats: ["ean_13", "upc_a", "qr_code", "code_128"],
    });
    const results = await detector.detect(videoEl);
    if (results.length > 0) {
      return { rawValue: results[0].rawValue, format: results[0].format };
    }
    return null;
  }

  // ZXing fallback — decodeOnceFromVideoElement resolves on first successful read
  const reader = await getZXingReader();
  try {
    const result = await reader.decodeOnceFromVideoElement(videoEl);
    return { rawValue: result.getText(), format: result.getBarcodeFormat().toString() };
  } catch {
    return null; // no code found in this attempt
  }
}
