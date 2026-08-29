'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { QrCode, Camera, AlertCircle, Search, ArrowRight, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface QRScannerProps {
  onScanSuccess: (decodedText: string, format?: string) => void;
  onScanError?: (errorMessage: string) => void;
}

export function QRScanner({ onScanSuccess }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrRegionId = 'html5qr-code-viewport-region';

  useEffect(() => {
    let isMounted = true;

    async function startScanner() {
      try {
        const scanner = new Html5Qrcode(qrRegionId, {
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.DATA_MATRIX
          ],
          verbose: false
        });

        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 260, height: 260 }
          },
          (decodedText, decodedResult) => {
            if (isMounted) {
              onScanSuccess(decodedText, decodedResult?.result?.format?.formatName);
            }
          },
          () => {}
        );

        if (isMounted) {
          setIsScanning(true);
          setCameraError(null);
        }
      } catch (err: unknown) {
        console.warn('QR camera error:', err);
        const e = err as { message?: string };
        if (isMounted) {
          setCameraError(e.message || 'Camera device unavailable or permission denied.');
          setIsScanning(false);
        }
      }
    }

    startScanner();

    return () => {
      isMounted = false;
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [onScanSuccess]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      onScanSuccess(manualCode.trim(), 'MANUAL_ENTRY');
    }
  };

  return (
    <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-6 flex flex-col items-center max-w-xl mx-auto space-y-5">
      <div className="text-center space-y-1">
        <h2 className="text-sm font-bold text-neutral-900">QR & Barcode Optical Scanner</h2>
        <p className="text-xs text-neutral-500">
          Position the package barcode or QR code inside the frame.
        </p>
      </div>

      {/* Camera Viewport with simple, clean frame */}
      <div className="relative w-full aspect-square max-w-sm rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-inner">
        <div id={qrRegionId} className="w-full h-full" />

        {isScanning && !cameraError && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* Simple orange targeting reticle */}
            <div className="w-56 h-56 border-2 border-orange-500/80 rounded relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-500 animate-scan-sweep" />
              {/* Corner tick marks */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-orange-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-orange-400" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-orange-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-orange-400" />
            </div>
          </div>
        )}

        {cameraError && (
          <div className="absolute inset-0 bg-[#FAF8F4] p-5 flex flex-col items-center justify-center text-center space-y-3 border border-[#DBD6CA]">
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-300 text-amber-700 flex items-center justify-center shadow-2xs">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-black text-amber-950 uppercase tracking-wide">
                CAMERA UNAVAILABLE
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-xs">
                Camera access is unavailable. You can enter the barcode manually below, upload a package image, or use a demo scenario.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Link
                href="/inspection/new"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload Image</span>
              </Link>
              <Link
                href="/inspection/new"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-800 border border-[#DBD6CA] text-xs font-bold shadow-2xs transition-colors"
              >
                <span>Demo Case</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Manual Code Entry Form */}
      <form onSubmit={handleManualSubmit} className="w-full max-w-sm space-y-2">
        <label className="text-xs font-bold text-neutral-700 block">
          Enter Barcode / EAN-13 Code Manually:
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
            <input
              type="text"
              placeholder="e.g. 8901063012485"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF8F4] border border-[#DBD6CA] rounded text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={!manualCode.trim()}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 text-white text-xs font-bold rounded shadow-xs transition-colors"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Fallback Option */}
      <div className="pt-2 border-t border-[#E5E2D9] w-full text-center">
        <Link
          href="/inspection/new"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 font-bold"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Use Package Image / Demo Scenarios</span>
        </Link>
      </div>
    </div>
  );
}

